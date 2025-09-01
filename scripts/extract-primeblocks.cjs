#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

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
      /<!--[\s\S]*?-->/gi,
      
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
      /<section[^>]*class="[^"]*block[^"]*"[^>]*>([\s\S]*?)<\/section>/gi
    ];
    
    let blocks = [];
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
            content: match[1].substring(0, 1000) + '...' // First 1000 chars for preview
          });
        });
        break;
      }
    }
    
    // Look for PrimeBlocks example sections pattern
    console.log('Searching for PrimeBlocks example sections...');
    
    // Since this appears to be a client-side rendered app with obfuscated classes,
    // let's look for text patterns and structured content instead
    
    // First, try to find any visible text content that might be example titles
    const textContentMatches = htmlContent.match(/>([^<]*(?:title|subtitle|dropdown|icon|heading|card|example)[^<]*)</gi) || [];
    console.log(`Found ${textContentMatches.length} potential text matches with keywords`);
    if (textContentMatches.length > 0) {
      textContentMatches.slice(0, 10).forEach((match, i) => {
        const cleanText = match.replace(/^>|<.*$/g, '').trim();
        if (cleanText.length > 2) {
          console.log(`  ${i+1}. "${cleanText}"`);
        }
      });
    }
    
    // Look for any structured JSON data that might contain example information
    const jsonMatches = htmlContent.match(/\{[^}]*(?:"title"|"name"|"label")[^}]*\}/gi) || [];
    console.log(`Found ${jsonMatches.length} JSON-like structures`);
    if (jsonMatches.length > 0) {
      jsonMatches.slice(0, 5).forEach((match, i) => {
        console.log(`  ${i+1}. ${match.substring(0, 100)}...`);
      });
    }
    
    // Look for Vue/Nuxt component patterns or data
    const vueDataMatches = htmlContent.match(/__NUXT__\s*=\s*(\{[\s\S]*?\});?/gi) || [];
    if (vueDataMatches.length > 0) {
      console.log('Found Nuxt data, analyzing...');
      try {
        // Try to extract and parse Nuxt data
        const nuxtDataString = vueDataMatches[0].replace('__NUXT__=', '').replace(/;$/, '');
        console.log('Nuxt data preview:', nuxtDataString.substring(0, 500) + '...');
      } catch (e) {
        console.log('Could not parse Nuxt data');
      }
    }
    
    // PrimeBlocks typical patterns (keeping original as fallback)
    const primeBlocksPatterns = [
      // Look for any div that might contain content with certain text patterns
      {
        name: 'Potential Example',
        pattern: /<div[^>]*>[\s\S]*?(title|subtitle|dropdown|icon|heading)[\s\S]*?<\/div>/gi
      },
      // Look for button or interactive elements that might be examples
      {
        name: 'Interactive Element',
        pattern: /<(?:button|a)[^>]*>[\s\S]*?<\/(?:button|a)>/gi
      },
      // Look for any semantic structure
      {
        name: 'Content Block',
        pattern: /<(?:section|article|div)[^>]*>[\s\S]{50,500}?<\/(?:section|article|div)>/gi
      }
    ];
    
    primeBlocksPatterns.forEach(({name, pattern}) => {
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
            title: title,
            name: title || `${name} ${index + 1}`,
            preview: content.substring(0, 300).replace(/\s+/g, ' ').trim() + '...',
            fullContent: match[0],
            index: index + 1
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
      { name: 'Toolbar', pattern: /p-toolbar|Toolbar/gi }
    ];
    
    let componentCounts = {};
    componentPatterns.forEach(({name, pattern}) => {
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
    
    // Save detailed results to JSON
    const outputFile = htmlFilePath.replace('.html', '_blocks.json');
    const results = {
      sourceFile: htmlFilePath,
      extractedAt: new Date().toISOString(),
      blocks: blocks,
      componentCounts: componentCounts,
      codeBlocks: codeBlocks.map(match => match[1]),
      preBlocks: preBlocks.map(match => match[1])
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