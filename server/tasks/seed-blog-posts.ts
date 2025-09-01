import { db } from '../environment/kysely';

const sampleTitles = [
  'Getting Started with Vue 3 and TypeScript',
  'Building Modern Web Applications with Nuxt',
  'The Future of Frontend Development',
  'Understanding Database Design Patterns',
  'Creating Responsive Layouts with Tailwind CSS',
  'JavaScript Performance Optimization Techniques',
  'API Design Best Practices',
  'State Management in Modern Applications',
  'Testing Strategies for Web Applications',
  'Docker for Frontend Developers',
  'GraphQL vs REST: A Complete Guide',
  'Progressive Web Apps in 2024',
  'CSS Grid and Flexbox Mastery',
  'Authentication and Authorization Patterns',
  'Building Scalable Node.js Applications',
  'Component-Driven Development',
  'Web Security Fundamentals',
  'Performance Monitoring and Analytics',
  'Modern DevOps Practices',
  'Microservices Architecture Guide',
  'Database Migration Strategies',
  'Real-time Applications with WebSockets',
  'SEO Optimization for Modern Websites',
  'Accessibility in Web Development',
  'Cloud Infrastructure Essentials',
  'CI/CD Pipeline Best Practices',
  'Mobile-First Design Principles',
  'Advanced Git Workflows',
  'Monitoring and Logging Best Practices',
  'Event-Driven Architecture Patterns',
  'Caching Strategies for Web Applications',
  'Serverless Computing with Functions',
  'Container Orchestration with Kubernetes',
  'Load Balancing and High Availability',
  'Message Queues and Async Processing',
  'Code Quality and Linting Tools',
  'Design Systems and Component Libraries',
  'A/B Testing Implementation Guide',
  'Error Handling and Recovery Strategies',
  'Data Visualization Techniques',
  'Machine Learning for Web Developers',
  'Blockchain Development Basics',
  'IoT and Web Integration',
  'WebAssembly Performance Benefits',
  'Progressive Enhancement Strategies',
  'Web Standards and Future APIs',
  'Cross-Platform Development Approaches',
  'Open Source Contribution Guidelines',
  'Technical Writing and Documentation',
  'Career Growth for Developers'
];

const bodyTemplates = [
  'In this comprehensive guide, we\'ll explore the fundamentals and advanced concepts that every developer should know. We\'ll cover practical examples, best practices, and real-world applications that will help you master this technology.\n\nStarting with the basics, we\'ll build up your understanding step by step. You\'ll learn about the core principles, common patterns, and how to avoid typical pitfalls that many developers encounter.\n\nBy the end of this article, you\'ll have a solid foundation and practical knowledge that you can immediately apply to your own projects.',
  
  'Understanding this topic is crucial for modern web development. In today\'s fast-paced digital world, developers need to stay current with the latest trends and technologies.\n\nThis article covers everything from basic concepts to advanced techniques. We\'ll examine real-world use cases, performance considerations, and scalability challenges.\n\nWhether you\'re a beginner or an experienced developer, you\'ll find valuable insights and practical advice that will enhance your development workflow.',
  
  'Let\'s dive deep into this important subject that has been gaining significant traction in the developer community. We\'ll explore why it matters, how it works, and when to use it effectively.\n\nThroughout this guide, we\'ll provide code examples, architectural patterns, and implementation strategies. You\'ll learn about common challenges and proven solutions.\n\nThis knowledge will help you build more robust, maintainable, and scalable applications that can handle the demands of modern users.',
  
  'Modern development requires a thorough understanding of this concept. As applications become more complex, developers need efficient tools and methodologies to manage this complexity.\n\nWe\'ll start with foundational concepts and gradually move to more advanced topics. Each section builds upon the previous one, ensuring a comprehensive learning experience.\n\nThe practical examples and case studies included will help you understand how to apply these concepts in real-world scenarios.',
  
  'This comprehensive overview covers everything you need to know about implementing and optimizing this technology. We\'ll discuss the benefits, challenges, and best practices.\n\nFrom planning and design to deployment and maintenance, we\'ll walk through the entire process. You\'ll learn about common mistakes and how to avoid them.\n\nBy following the guidelines and recommendations in this article, you\'ll be able to create efficient, scalable solutions that meet your project requirements.'
];

const tasks = {
  seedBlogPosts: async () => {
    console.log('Seeding 50 blog posts...');
    
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
    await db.insertInto('blog_posts').values(posts).execute();
    
    console.log('Successfully seeded 50 blog posts!');
  }
};

export default tasks;