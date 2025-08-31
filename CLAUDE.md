# PrimeVue Documentation Extraction

When creating PrimeVue component showcase pages, use the documentation extraction script:

```bash
npm run extract-docs https://primevue.org/[component]/
```

This script extracts real documentation content, sections, and Vue component examples from PrimeVue docs instead of guessing or using generic patterns. The extracted JSON contains structured data with sections, examples, and proper component usage patterns.

## Usage Example

```bash
npm run extract-docs https://primevue.org/checkbox/
```

Returns structured JSON with:
- Component title and description
- Documentation sections (Basic, Advanced, States, etc.)
- Real Vue component examples from PrimeVue docs
- Code snippets and usage patterns
