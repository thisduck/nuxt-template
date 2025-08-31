#!/usr/bin/env node

/**
 * PrimeVue Documentation Extractor
 *
 * This script extracts the main content, sections, and examples from PrimeVue component documentation pages.
 * Use this when creating new component showcase pages to get accurate examples and documentation.
 *
 * Usage:
 *   node scripts/extract-primevue-docs.js https://primevue.org/checkbox/
 *   npm run extract-docs https://primevue.org/checkbox/
 *
 * Returns structured JSON with sections, examples, and descriptions.
 */

import https from 'node:https';
import { JSDOM } from 'jsdom';

async function fetchPage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function extractMainContent(html) {
  const dom = new JSDOM(html);
  const document = dom.window.document;

  // Try different selectors for the main content area
  const selectors = [
    'main',
    '[role="main"]',
    '.doc-main',
    '.documentation',
    'article',
    '.content',
    '#content',
  ];

  let mainContent = null;
  for (const selector of selectors) {
    mainContent = document.querySelector(selector);
    if (mainContent)
      break;
  }

  if (!mainContent) {
    // Fallback: try to find the largest content area
    const possibleContainers = document.querySelectorAll('div');
    let largest = null;
    let maxLength = 0;

    possibleContainers.forEach((div) => {
      const text = div.textContent || '';
      if (text.length > maxLength && text.includes('component')) {
        maxLength = text.length;
        largest = div;
      }
    });

    mainContent = largest;
  }

  return mainContent;
}

function extractExamples(contentElement) {
  if (!contentElement)
    return [];

  const examples = [];

  // Look for code blocks
  const codeBlocks = contentElement.querySelectorAll('pre, code, .code-block, .example');

  codeBlocks.forEach((block, index) => {
    const code = block.textContent || block.innerHTML;
    if (code.trim().length > 0) {
      examples.push({
        type: 'code',
        index,
        content: code.trim(),
        language: block.className.includes('vue')
          ? 'vue'
          : block.className.includes('javascript') ? 'javascript' : 'unknown',
      });
    }
  });

  return examples;
}

function extractSections(contentElement) {
  if (!contentElement)
    return [];

  const sections = [];
  const headings = contentElement.querySelectorAll('h1, h2, h3, h4');

  headings.forEach((heading) => {
    const title = heading.textContent.trim();
    let content = '';

    // Get content until next heading
    let nextSibling = heading.nextElementSibling;
    while (nextSibling && !['H1', 'H2', 'H3', 'H4'].includes(nextSibling.tagName)) {
      content += `${nextSibling.textContent}\n`;
      nextSibling = nextSibling.nextElementSibling;
    }

    sections.push({
      title,
      level: Number.parseInt(heading.tagName[1]),
      content: content.trim(),
    });
  });

  return sections;
}

async function extractPrimeVueDocs(url) {
  try {
    console.log(`Fetching: ${url}`);
    const html = await fetchPage(url);

    const mainContent = extractMainContent(html);

    if (!mainContent) {
      throw new Error('Could not find main content area');
    }

    const examples = extractExamples(mainContent);
    const sections = extractSections(mainContent);

    const result = {
      url,
      title: mainContent.querySelector('h1')?.textContent?.trim() || 'Unknown',
      description: mainContent.querySelector('p')?.textContent?.trim() || '',
      sections,
      examples,
      rawContent: mainContent.textContent.substring(0, 2000), // First 2000 chars for context
    };

    return result;
  } catch (error) {
    console.error('Error extracting docs:', error.message);
    return {
      url,
      error: error.message,
    };
  }
}

// CLI usage
const nodeProcess = await import('node:process');

if (nodeProcess.default.argv[1] === new URL(import.meta.url).pathname) {
  const url = nodeProcess.default.argv[2];
  if (!url) {
    console.error('Usage: node extract-primevue-docs.js <url>');
    nodeProcess.default.exit(1);
  }

  extractPrimeVueDocs(url).then((result) => {
    console.log(JSON.stringify(result, null, 2));
  });
}

export { extractPrimeVueDocs };
