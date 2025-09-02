import { db } from '~/server/environment/kysely';
import type { Database } from '~/server/db/types';
import type { Kysely } from 'kysely';

const sampleTitles = [
  'Getting Started with Vue 3 Composition API',
  'Building Type-Safe APIs with tRPC',
  'Mastering Tailwind CSS Grid Layouts',
  'Database Migrations with Kysely',
  'Authentication Patterns in Nuxt',
  'Performance Optimization Tips',
  'Understanding Server-Side Rendering',
  'Modern State Management Solutions',
  'Testing Strategies for Vue Applications',
  'Deploying Nuxt Apps to Production',
];

const bodyTemplates = [
  `## Introduction\n\nThis comprehensive guide explores the fundamentals and advanced concepts of modern web development. We'll dive deep into practical examples and real-world applications.\n\n### Key Concepts\n\nUnderstanding the core principles is essential for building robust applications. Let's explore the main concepts:\n\n1. **Architecture Patterns** - Learn about different architectural approaches and when to use them\n2. **Best Practices** - Industry-standard practices that ensure code quality\n3. **Performance Considerations** - Optimize your application for speed and efficiency\n\n### Getting Started\n\nTo begin, make sure you have the necessary tools installed. Follow these steps:\n\n\`\`\`bash\nnpm install\nnpm run dev\n\`\`\`\n\n### Implementation Details\n\nThe implementation involves several key components working together. Each component has a specific responsibility and communicates through well-defined interfaces.\n\n### Conclusion\n\nBy following this guide, you'll have a solid foundation for building modern web applications.`,
  
  `## Overview\n\nIn this article, we explore cutting-edge techniques for modern development workflows. These approaches will significantly improve your productivity.\n\n### The Problem\n\nMany developers face challenges when scaling their applications. Common issues include:\n\n- Complex state management\n- Performance bottlenecks\n- Maintenance difficulties\n- Testing challenges\n\n### The Solution\n\nOur approach addresses these challenges through:\n\n1. **Modular Architecture** - Break down complex systems into manageable pieces\n2. **Automated Testing** - Ensure reliability through comprehensive test coverage\n3. **Continuous Integration** - Streamline your deployment process\n\n### Code Examples\n\nHere's a practical example of implementing these concepts:\n\n\`\`\`typescript\nconst config = {\n  optimization: true,\n  caching: 'aggressive',\n  monitoring: 'enabled'\n};\n\`\`\`\n\n### Results\n\nImplementing these strategies resulted in 40% performance improvement and 60% reduction in bug reports.`,
  
  `## Deep Dive\n\nLet's explore advanced patterns and techniques that professional developers use to build scalable applications.\n\n### Background\n\nModern web development has evolved significantly over the past decade. New tools and frameworks have emerged, changing how we approach common problems.\n\n### Technical Implementation\n\nThe technical stack consists of:\n\n- **Frontend Framework** - Vue 3 with Composition API\n- **Backend Services** - Node.js with tRPC\n- **Database Layer** - PostgreSQL with Kysely\n- **Deployment** - Containerized with Docker\n\n### Architecture Decisions\n\nKey architectural decisions include:\n\n1. Separation of concerns\n2. Event-driven communication\n3. Microservices where appropriate\n4. Caching strategies\n\n### Monitoring and Observability\n\nProper monitoring ensures system health:\n\n\`\`\`javascript\nconst metrics = {\n  responseTime: monitor.timing(),\n  errorRate: monitor.errors(),\n  throughput: monitor.requests()\n};\n\`\`\`\n\n### Future Improvements\n\nPotential areas for enhancement include AI-powered optimizations and improved real-time capabilities.`,
];

export async function seed(database: Kysely<Database>) {
  // Check if posts already exist
  const existingPosts = await database
    .selectFrom('blog_posts')
    .select('id')
    .limit(1)
    .execute();

  if (existingPosts.length > 0) {
    console.warn('⚠️  Blog posts already exist, skipping seed');
    return { skipped: true, count: 0 };
  }

  const posts = [];

  for (let i = 0; i < 50; i++) {
    const title = sampleTitles[i % sampleTitles.length];
    const body = bodyTemplates[i % bodyTemplates.length];

    // Create variation in creation dates (spread over last 6 months)
    const baseDate = new Date();
    const daysAgo = Math.floor(Math.random() * 180); // 0-180 days ago
    const createdAt = new Date(baseDate.getTime() - (daysAgo * 24 * 60 * 60 * 1000));

    posts.push({
      title: `${title} ${i > sampleTitles.length - 1 ? `(Part ${Math.floor(i / sampleTitles.length) + 1})` : ''}`,
      body,
      created_at: createdAt.toISOString(),
      updated_at: createdAt.toISOString(),
    });
  }

  // Insert all posts
  await database.insertInto('blog_posts').values(posts).execute();

  return { skipped: false, count: posts.length };
}

export const metadata = {
  name: 'Blog Posts',
  description: 'Seeds sample blog posts with rich content',
  order: 1,
};