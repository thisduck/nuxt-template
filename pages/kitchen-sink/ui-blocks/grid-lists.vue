<script setup lang="ts">
import { ref } from 'vue';

const teamMembers = ref([
  {
    id: 1,
    name: 'Robert Fox',
    role: 'Product Designer',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    followers: 1250,
    following: 890
  },
  {
    id: 2,
    name: 'Jenny Wilson',
    role: 'Frontend Developer',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    followers: 980,
    following: 654
  },
  {
    id: 3,
    name: 'Albert Flores',
    role: 'UI/UX Designer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    followers: 1540,
    following: 732
  },
  {
    id: 4,
    name: 'Ronald Richards',
    role: 'Backend Developer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    followers: 820,
    following: 412
  },
  {
    id: 5,
    name: 'Regina Miles',
    role: 'Project Manager',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    followers: 2100,
    following: 1180
  },
  {
    id: 6,
    name: 'Gloria Richards',
    role: 'Marketing Specialist',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    followers: 1680,
    following: 923
  }
]);

const products = ref([
  {
    id: 1,
    name: 'Wireless Headphones',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
    price: 129.99,
    rating: 4.5,
    category: 'Electronics'
  },
  {
    id: 2,
    name: 'Smart Watch',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
    price: 299.99,
    rating: 4.8,
    category: 'Wearables'
  },
  {
    id: 3,
    name: 'Laptop Backpack',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop',
    price: 79.99,
    rating: 4.3,
    category: 'Accessories'
  },
  {
    id: 4,
    name: 'Bluetooth Speaker',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop',
    price: 89.99,
    rating: 4.6,
    category: 'Audio'
  },
  {
    id: 5,
    name: 'Gaming Mouse',
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=300&fit=crop',
    price: 59.99,
    rating: 4.7,
    category: 'Gaming'
  },
  {
    id: 6,
    name: 'USB-C Hub',
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&h=300&fit=crop',
    price: 49.99,
    rating: 4.2,
    category: 'Accessories'
  }
]);

const galleryImages = ref([
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    title: 'Mountain Landscape',
    category: 'Nature'
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop',
    title: 'Forest Path',
    category: 'Nature'
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop',
    title: 'City Skyline',
    category: 'Urban'
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=300&fit=crop',
    title: 'Ocean Waves',
    category: 'Nature'
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop',
    title: 'Beach Sunset',
    category: 'Nature'
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=300&fit=crop',
    title: 'City Lights',
    category: 'Urban'
  }
]);

const services = ref([
  {
    id: 1,
    title: 'Web Development',
    description: 'Modern responsive websites built with latest technologies',
    icon: 'pi-globe',
    color: 'text-blue-500',
    bgColor: 'bg-blue-100 dark:bg-blue-900/20'
  },
  {
    id: 2,
    title: 'Mobile Apps',
    description: 'Native and cross-platform mobile applications',
    icon: 'pi-mobile',
    color: 'text-green-500',
    bgColor: 'bg-green-100 dark:bg-green-900/20'
  },
  {
    id: 3,
    title: 'UI/UX Design',
    description: 'User-centered design for optimal user experience',
    icon: 'pi-palette',
    color: 'text-purple-500',
    bgColor: 'bg-purple-100 dark:bg-purple-900/20'
  },
  {
    id: 4,
    title: 'Cloud Solutions',
    description: 'Scalable cloud infrastructure and deployment',
    icon: 'pi-cloud',
    color: 'text-orange-500',
    bgColor: 'bg-orange-100 dark:bg-orange-900/20'
  },
  {
    id: 5,
    title: 'Data Analytics',
    description: 'Business intelligence and data visualization',
    icon: 'pi-chart-bar',
    color: 'text-teal-500',
    bgColor: 'bg-teal-100 dark:bg-teal-900/20'
  },
  {
    id: 6,
    title: 'SEO Optimization',
    description: 'Search engine optimization for better visibility',
    icon: 'pi-search',
    color: 'text-pink-500',
    bgColor: 'bg-pink-100 dark:bg-pink-900/20'
  }
]);

const articles = ref([
  {
    id: 1,
    title: 'Getting Started with Vue 3 Composition API',
    excerpt: 'Learn the fundamentals of Vue 3\'s Composition API and how it improves your development workflow.',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop',
    author: 'John Smith',
    date: '2024-01-15',
    readTime: '5 min read',
    tags: ['Vue.js', 'JavaScript', 'Frontend']
  },
  {
    id: 2,
    title: 'Building Responsive Layouts with CSS Grid',
    excerpt: 'Master CSS Grid to create flexible and responsive web layouts that work on all devices.',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=200&fit=crop',
    author: 'Sarah Johnson',
    date: '2024-01-12',
    readTime: '8 min read',
    tags: ['CSS', 'Web Design', 'Responsive']
  },
  {
    id: 3,
    title: 'Modern JavaScript ES2024 Features',
    excerpt: 'Explore the latest JavaScript features and how they can improve your coding efficiency.',
    image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=200&fit=crop',
    author: 'Mike Chen',
    date: '2024-01-10',
    readTime: '6 min read',
    tags: ['JavaScript', 'ES2024', 'Programming']
  }
]);

function getRatingStars(rating: number) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  for (let i = 0; i < fullStars; i++) {
    stars.push('pi-star-fill');
  }
  
  if (hasHalfStar) {
    stars.push('pi-star-half-fill');
  }
  
  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    stars.push('pi-star');
  }
  
  return stars;
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}
</script>

<template>
  <div class="p-6 max-w-7xl mx-auto space-y-12">
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0 mb-4">
        Grid List Examples
      </h1>
      <p class="text-surface-600 dark:text-surface-400">
        Various grid and list layout patterns from PrimeBlocks
      </p>
    </div>

    <!-- Example 1: Cards with Actions -->
    <section>
      <Card class="p-6">
        <template #title>
          <h2 class="text-xl font-semibold">Cards with Actions</h2>
        </template>
        
        <template #content>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card v-for="member in teamMembers" :key="member.id" class="text-center">
              <template #content>
                <div class="space-y-4">
                  <Avatar :image="member.avatar" size="xlarge" shape="circle" class="mx-auto shadow-md" />
                  <div>
                    <h3 class="text-lg font-semibold text-surface-900 dark:text-surface-0 mb-1">
                      {{ member.name }}
                    </h3>
                    <p class="text-surface-600 dark:text-surface-400 text-sm">{{ member.role }}</p>
                  </div>
                  <div class="flex justify-center gap-6 text-sm">
                    <div class="text-center">
                      <div class="font-semibold text-surface-900 dark:text-surface-0">{{ member.followers.toLocaleString() }}</div>
                      <div class="text-surface-500 dark:text-surface-400">Followers</div>
                    </div>
                    <div class="text-center">
                      <div class="font-semibold text-surface-900 dark:text-surface-0">{{ member.following.toLocaleString() }}</div>
                      <div class="text-surface-500 dark:text-surface-400">Following</div>
                    </div>
                  </div>
                  <div class="flex gap-2 justify-center">
                    <Button label="View" size="small" outlined />
                    <Button label="Follow" size="small" />
                  </div>
                </div>
              </template>
            </Card>
          </div>
        </template>
      </Card>
    </section>

    <!-- Example 2: Centered and Condensed -->
    <section>
      <Card class="p-6">
        <template #title>
          <h2 class="text-xl font-semibold">Centered and Condensed</h2>
        </template>
        
        <template #content>
          <div class="max-w-4xl mx-auto">
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div v-for="member in teamMembers" :key="member.id" class="text-center p-4 rounded-lg border border-surface-200 dark:border-surface-700 hover:shadow-md transition-shadow">
                <Avatar :image="member.avatar" size="large" shape="circle" class="mx-auto mb-3" />
                <h4 class="font-medium text-surface-900 dark:text-surface-0 text-sm mb-1">{{ member.name }}</h4>
                <p class="text-surface-600 dark:text-surface-400 text-xs">{{ member.role }}</p>
              </div>
            </div>
          </div>
        </template>
      </Card>
    </section>

    <!-- Example 3: Image, Rating and Actions -->
    <section>
      <Card class="p-6">
        <template #title>
          <h2 class="text-xl font-semibold">Image, Rating and Actions</h2>
        </template>
        
        <template #content>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card v-for="product in products" :key="product.id">
              <template #content>
                <div class="space-y-4">
                  <div class="relative">
                    <img :src="product.image" :alt="product.name" class="w-full h-48 object-cover rounded-lg" />
                    <Badge :value="product.category" class="absolute top-2 right-2" />
                  </div>
                  
                  <div>
                    <h3 class="text-lg font-semibold text-surface-900 dark:text-surface-0 mb-2">
                      {{ product.name }}
                    </h3>
                    
                    <div class="flex items-center gap-2 mb-2">
                      <div class="flex items-center">
                        <i v-for="star in getRatingStars(product.rating)" :key="star" :class="['pi', star, 'text-yellow-500 text-sm']"></i>
                      </div>
                      <span class="text-sm text-surface-600 dark:text-surface-400">({{ product.rating }})</span>
                    </div>
                    
                    <div class="text-2xl font-bold text-primary-500 mb-4">
                      ${{ product.price }}
                    </div>
                    
                    <div class="flex gap-2">
                      <Button label="Add to Cart" size="small" outlined class="flex-1" />
                      <Button label="Buy Now" size="small" class="flex-1" />
                    </div>
                  </div>
                </div>
              </template>
            </Card>
          </div>
        </template>
      </Card>
    </section>

    <!-- Example 4: Images -->
    <section>
      <Card class="p-6">
        <template #title>
          <h2 class="text-xl font-semibold">Images</h2>
        </template>
        
        <template #content>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div v-for="image in galleryImages" :key="image.id" class="group cursor-pointer">
              <div class="relative overflow-hidden rounded-lg">
                <img :src="image.src" :alt="image.title" class="w-full h-32 object-cover transition-transform group-hover:scale-105" />
                <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center">
                  <div class="text-white opacity-0 group-hover:opacity-100 transition-opacity text-center">
                    <i class="pi pi-eye text-2xl mb-2"></i>
                    <div class="text-sm font-medium">{{ image.title }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </Card>
    </section>

    <!-- Example 5: In Card -->
    <section>
      <Card class="p-6">
        <template #title>
          <h2 class="text-xl font-semibold">In Card</h2>
        </template>
        
        <template #content>
          <Card class="p-4">
            <template #content>
              <div class="space-y-4">
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-lg font-semibold text-surface-900 dark:text-surface-0">Team Members</h3>
                  <Button icon="pi pi-plus" label="Add Member" size="small" />
                </div>
                
                <div class="space-y-3">
                  <div v-for="member in teamMembers.slice(0, 4)" :key="member.id" class="flex items-center gap-3 p-3 rounded-lg border border-surface-200 dark:border-surface-700">
                    <Avatar :image="member.avatar" shape="circle" />
                    <div class="flex-1">
                      <div class="font-medium text-surface-900 dark:text-surface-0">{{ member.name }}</div>
                      <div class="text-sm text-surface-600 dark:text-surface-400">{{ member.role }}</div>
                    </div>
                    <Button icon="pi pi-ellipsis-v" text rounded size="small" />
                  </div>
                </div>
              </div>
            </template>
          </Card>
        </template>
      </Card>
    </section>

    <!-- Example 6: Listing Cards -->
    <section>
      <Card class="p-6">
        <template #title>
          <h2 class="text-xl font-semibold">Listing Cards</h2>
        </template>
        
        <template #content>
          <div class="space-y-4">
            <Card v-for="article in articles" :key="article.id" class="p-4">
              <template #content>
                <div class="flex gap-4">
                  <img :src="article.image" :alt="article.title" class="w-32 h-24 object-cover rounded-lg flex-shrink-0" />
                  <div class="flex-1 space-y-2">
                    <h3 class="text-lg font-semibold text-surface-900 dark:text-surface-0">
                      {{ article.title }}
                    </h3>
                    <p class="text-surface-600 dark:text-surface-400 text-sm">
                      {{ article.excerpt }}
                    </p>
                    <div class="flex items-center gap-4 text-sm text-surface-500 dark:text-surface-400">
                      <span>{{ article.author }}</span>
                      <span>{{ formatDate(article.date) }}</span>
                      <span>{{ article.readTime }}</span>
                    </div>
                    <div class="flex gap-1">
                      <Tag v-for="tag in article.tags" :key="tag" :value="tag" size="small" />
                    </div>
                  </div>
                  <div class="flex-shrink-0">
                    <Button icon="pi pi-bookmark" text rounded />
                  </div>
                </div>
              </template>
            </Card>
          </div>
        </template>
      </Card>
    </section>

    <!-- Example 7: Shared Borders -->
    <section>
      <Card class="p-6">
        <template #title>
          <h2 class="text-xl font-semibold">Shared Borders</h2>
        </template>
        
        <template #content>
          <div class="border border-surface-200 dark:border-surface-700 rounded-lg overflow-hidden">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-x divide-y divide-surface-200 dark:divide-surface-700">
              <div v-for="(member, index) in teamMembers" :key="member.id" class="p-6 hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors">
                <div class="text-center space-y-3">
                  <Avatar :image="member.avatar" size="large" shape="circle" class="mx-auto" />
                  <div>
                    <h4 class="font-semibold text-surface-900 dark:text-surface-0">{{ member.name }}</h4>
                    <p class="text-sm text-surface-600 dark:text-surface-400">{{ member.role }}</p>
                  </div>
                  <div class="flex justify-center gap-4 text-xs">
                    <span class="text-surface-500 dark:text-surface-400">{{ member.followers }} followers</span>
                    <span class="text-surface-500 dark:text-surface-400">{{ member.following }} following</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </Card>
    </section>

    <!-- Example 8: With Icons -->
    <section>
      <Card class="p-6">
        <template #title>
          <h2 class="text-xl font-semibold">With Icons</h2>
        </template>
        
        <template #content>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="service in services" :key="service.id" class="text-center p-6 rounded-lg border border-surface-200 dark:border-surface-700 hover:shadow-lg transition-shadow">
              <div :class="['w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center', service.bgColor]">
                <i :class="['pi', service.icon, 'text-2xl', service.color]"></i>
              </div>
              <h3 class="text-lg font-semibold text-surface-900 dark:text-surface-0 mb-2">
                {{ service.title }}
              </h3>
              <p class="text-surface-600 dark:text-surface-400 text-sm">
                {{ service.description }}
              </p>
            </div>
          </div>
        </template>
      </Card>
    </section>
  </div>
</template>