#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');

function extractPrimeBlocks(htmlFilePath) {
  try {
    console.log(`Processing: ${htmlFilePath}`);

    // Read the HTML file
    let htmlContent = fs.readFileSync(htmlFilePath, 'utf8');
    const originalSize = htmlContent.length;

    console.log(`Original file size: ${Math.round(originalSize / 1024)}KB`);

    // Remove common layout elements to reduce size and focus on content
    const layoutElementsToRemove = [
      // Navigation and header elements
      /<nav[^>]*>[\s\S]*?<\/nav>/gi,
      /<header[^>]*>[\s\S]*?<\/header>/gi,
      /<footer[^>]*>[\s\S]*?<\/footer>/gi,

      // Sidebar and menu elements
      /<aside[^>]*>[\s\S]*?<\/aside>/gi,
      /<div[^>]*class="[^"]*sidebar[^"]*"[^>]*>[\s\S]*?<\/div>/gi,
      /<div[^>]*class="[^"]*menu[^"]*"[^>]*>[\s\S]*?<\/div>/gi,
      /<div[^>]*class="[^"]*topbar[^"]*"[^>]*>[\s\S]*?<\/div>/gi,

      // Scripts and styles (keep minimal)
      /<script[^>]*>[\s\S]*?<\/script>/gi,
      /<style[^>]*>[\s\S]*?<\/style>/gi,
      /<link[^>]*>/gi,

      // Meta and head elements
      /<head[^>]*>[\s\S]*?<\/head>/gi,
      /<meta[^>]*>/gi,
      /<title[^>]*>[\s\S]*?<\/title>/gi,

      // Comments
      /<!--[\s\S]*?-->/g,

      // Common layout containers that might not contain content
      /<div[^>]*class="[^"]*layout[^"]*"[^>]*>[\s\S]*?<\/div>/gi,
      /<div[^>]*class="[^"]*wrapper[^"]*"[^>]*>[\s\S]*?<\/div>/gi,
    ];

    // Remove layout elements
    layoutElementsToRemove.forEach((pattern, index) => {
      const beforeLength = htmlContent.length;
      htmlContent = htmlContent.replace(pattern, '');
      const removed = beforeLength - htmlContent.length;
      if (removed > 0) {
        console.log(`Removed ${Math.round(removed / 1024)}KB from pattern ${index + 1}`);
      }
    });

    // Clean up extra whitespace
    htmlContent = htmlContent.replace(/\s+/g, ' ').trim();

    const cleanedSize = htmlContent.length;
    console.log(`Cleaned file size: ${Math.round(cleanedSize / 1024)}KB (reduced by ${Math.round((originalSize - cleanedSize) / 1024)}KB)`);

    // Find the main content area - could be article, main, or specific class
    const patterns = [
      /<article[^>]*>([\s\S]*?)<\/article>/gi,
      /<main[^>]*>([\s\S]*?)<\/main>/gi,
      /<div[^>]*class="[^"]*content[^"]*"[^>]*>([\s\S]*?)<\/div>/gi,
      /<div[^>]*class="[^"]*blocks[^"]*"[^>]*>([\s\S]*?)<\/div>/gi,
      /<section[^>]*class="[^"]*block[^"]*"[^>]*>([\s\S]*?)<\/section>/gi,
    ];

    const blocks = [];
    let foundContent = false;

    // Try each pattern to find content
    for (const pattern of patterns) {
      const matches = [...htmlContent.matchAll(pattern)];
      if (matches.length > 0) {
        console.log(`Found ${matches.length} matches with pattern: ${pattern.source}`);
        foundContent = true;

        matches.forEach((match, index) => {
          blocks.push({
            type: 'content_section',
            index: index + 1,
            content: `${match[1].substring(0, 1000)}...`, // First 1000 chars for preview
          });
        });
        break;
      }
    }

    // Look for PrimeBlocks example sections pattern
    console.log('Searching for PrimeBlocks example sections...');

    // Look for the specific pattern used in PrimeBlocks for example titles
    // Pattern: <span class="QN9bKy X1m7me">Example Title</span>
    const exampleTitlePattern = /<span[^>]*class="[^"]*QN9bKy[^"]*X1m7me[^"]*"[^>]*>([^<]+)<\/span>/gi;
    const exampleTitles = [];
    let titleMatch;
    while ((titleMatch = exampleTitlePattern.exec(htmlContent)) !== null) {
      const title = titleMatch[1].trim();
      if (title && !title.includes('Free') && !title.includes('Pro')) {
        exampleTitles.push(title);
      }
    }

    console.log(`Found ${exampleTitles.length} example titles:`);
    exampleTitles.forEach((title, i) => {
      console.log(`  ${i + 1}. "${title}"`);
    });

    // Now find the actual example blocks that contain these titles
    // Look for the container structure that wraps each example
    const exampleBlockPattern = /<div[^>]*class="[^"]*LgzVqE[^"]*P6au9E[^"]*WrTFgT[^"]*"[^>]*>([\s\S]*?)<\/div>/gi;
    const exampleBlocks = [];
    let blockMatch;
    while ((blockMatch = exampleBlockPattern.exec(htmlContent)) !== null) {
      const blockContent = blockMatch[0];

      // Extract title from this block
      const titleInBlock = blockContent.match(/<span[^>]*class="[^"]*QN9bKy[^"]*X1m7me[^"]*"[^>]*>([^<]+)<\/span>/i);
      if (titleInBlock) {
        const title = titleInBlock[1].trim();
        if (title && !title.includes('Free') && !title.includes('Pro')) {
          exampleBlocks.push({
            title,
            content: blockContent,
            // Try to extract the actual example HTML (the preview/demo part)
            exampleHtml: extractExampleHtml(blockContent),
          });
        }
      }
    }

    console.log(`Found ${exampleBlocks.length} example blocks with content`);

    function extractExampleHtml(blockContent) {
      // Look for the preview container - this varies but often contains the actual demo
      // Pattern may include viewport selectors (desktop, tablet, mobile icons)
      const previewPattern = /<div[^>]*class="[^"]*(?:preview|demo|example)[^"]*"[^>]*>([\s\S]*?)<\/div>/gi;
      const previewMatch = previewPattern.exec(blockContent);
      if (previewMatch) {
        return previewMatch[1];
      }

      // Fallback: look for content after the title and badge
      const afterTitlePattern = /<span[^>]*class="[^"]*QN9bKy[^"]*X1m7me[^"]*"[^>]*>[^<]+<\/span>[\s\S]*?<span[^>]*Free<\/span>[\s\S]*?(<div[\s\S]*)/i;
      const afterTitleMatch = afterTitlePattern.exec(blockContent);
      if (afterTitleMatch) {
        // Take a reasonable chunk after the title/badge
        const remainingHtml = afterTitleMatch[1];
        // Try to find a logical stopping point
        const chunks = remainingHtml.split(/<\/div>/);
        if (chunks.length > 2) {
          return `${chunks.slice(0, 3).join('</div>')}</div>`;
        }
        return remainingHtml.substring(0, 1000);
      }

      return blockContent.substring(0, 500);
    }

    // Add the parsed examples to blocks
    exampleBlocks.forEach((example, index) => {
      blocks.push({
        type: 'primeblocks_example',
        title: example.title,
        name: example.title,
        preview: `${example.exampleHtml.substring(0, 300).replace(/\s+/g, ' ').trim()}...`,
        fullContent: example.content,
        exampleHtml: example.exampleHtml,
        index: index + 1,
      });
    });

    // PrimeBlocks typical patterns (keeping original as fallback)
    const primeBlocksPatterns = [
      // Look for any div that might contain content with certain text patterns
      {
        name: 'Potential Example',
        pattern: /<div[^>]*>[\s\S]*?(title|subtitle|dropdown|icon|heading)[\s\S]*?<\/div>/gi,
      },
      // Look for button or interactive elements that might be examples
      {
        name: 'Interactive Element',
        pattern: /<(?:button|a)[^>]*>[\s\S]*?<\/(?:button|a)>/gi,
      },
      // Look for any semantic structure
      {
        name: 'Content Block',
        pattern: /<(?:section|article|div)[^>]*>[\s\S]{50,500}?<\/(?:section|article|div)>/gi,
      },
    ];

    primeBlocksPatterns.forEach(({ name, pattern }) => {
      const matches = [...htmlContent.matchAll(pattern)];
      if (matches.length > 0) {
        console.log(`Found ${matches.length} ${name} sections`);
        matches.forEach((match, index) => {
          let title = '';
          let content = '';

          if (name === 'Example Section') {
            title = match[1].replace(/<[^>]*>/g, '').trim(); // Clean HTML tags from title
            content = match[0];
          } else if (name === 'Titled Section') {
            title = match[1].trim();
            content = match[2];
          } else {
            title = `${name} ${index + 1}`;
            content = match[1] || match[0];
          }

          blocks.push({
            type: name.toLowerCase().replace(' ', '_'),
            title,
            name: title || `${name} ${index + 1}`,
            preview: `${content.substring(0, 300).replace(/\s+/g, ' ').trim()}...`,
            fullContent: match[0],
            index: index + 1,
          });
        });
      }
    });

    // Look for specific PrimeVue/PrimeBlocks components
    const componentPatterns = [
      { name: 'Button', pattern: /p-button|Button/gi },
      { name: 'Card', pattern: /p-card|Card/gi },
      { name: 'DataTable', pattern: /p-datatable|DataTable/gi },
      { name: 'Dialog', pattern: /p-dialog|Dialog/gi },
      { name: 'Menu', pattern: /p-menu|Menu/gi },
      { name: 'Panel', pattern: /p-panel|Panel/gi },
      { name: 'Toolbar', pattern: /p-toolbar|Toolbar/gi },
    ];

    const componentCounts = {};
    componentPatterns.forEach(({ name, pattern }) => {
      const matches = htmlContent.match(pattern);
      if (matches) {
        componentCounts[name] = matches.length;
      }
    });

    // Extract any code blocks or examples
    const codeBlocks = [...htmlContent.matchAll(/<code[^>]*>([\s\S]*?)<\/code>/gi)];
    const preBlocks = [...htmlContent.matchAll(/<pre[^>]*>([\s\S]*?)<\/pre>/gi)];

    // Generate summary
    console.log('\n=== PRIMEBLOCKS EXTRACTION SUMMARY ===');
    console.log(`File: ${path.basename(htmlFilePath)}`);
    console.log(`File size: ${Math.round(fs.statSync(htmlFilePath).size / 1024)}KB`);
    console.log(`Total blocks found: ${blocks.length}`);

    if (Object.keys(componentCounts).length > 0) {
      console.log('\nComponents detected:');
      Object.entries(componentCounts).forEach(([name, count]) => {
        console.log(`  - ${name}: ${count}`);
      });
    }

    if (codeBlocks.length > 0) {
      console.log(`\nCode blocks found: ${codeBlocks.length}`);
    }

    if (preBlocks.length > 0) {
      console.log(`Pre-formatted blocks found: ${preBlocks.length}`);
    }

    console.log('\n=== AVAILABLE BLOCKS ===');
    blocks.forEach((block, index) => {
      console.log(`\n${index + 1}. ${block.name || block.type}`);
      if (block.preview) {
        console.log(`   Preview: ${block.preview.substring(0, 200).replace(/\s+/g, ' ')}...`);
      }
    });

    // Save detailed results to JSON in current working directory
    const outputFile = path.join(process.cwd(), `${path.basename(htmlFilePath, '.html')}_blocks.json`);
    const results = {
      sourceFile: htmlFilePath,
      extractedAt: new Date().toISOString(),
      blocks,
      componentCounts,
      codeBlocks: codeBlocks.map(match => match[1]),
      preBlocks: preBlocks.map(match => match[1]),
    };

    fs.writeFileSync(outputFile, JSON.stringify(results, null, 2));
    console.log(`\nDetailed results saved to: ${outputFile}`);

    return results;
  } catch (error) {
    console.error('Error processing HTML file:', error.message);
    return null;
  }
}

// Run the script
if (require.main === module) {
  const htmlFile = process.argv[2];
  if (!htmlFile) {
    console.log('Usage: node extract-primeblocks.js <path-to-html-file>');
    process.exit(1);
  }

  if (!fs.existsSync(htmlFile)) {
    console.error(`File not found: ${htmlFile}`);
    process.exit(1);
  }

  extractPrimeBlocks(htmlFile);
}

module.exports = { extractPrimeBlocks };
