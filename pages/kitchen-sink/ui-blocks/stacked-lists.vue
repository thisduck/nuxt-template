<script setup lang="ts">
import { ref } from 'vue';

const searchQuery = ref('');

const projects = ref([
  {
    id: 1,
    name: 'Portal to Eternity',
    description: 'Immersive experience featuring stunning visuals and interactive elements.',
    image: 'https://images.unsplash.com/photo-1558618047-fde30c2afed2?w=400&h=200&fit=crop',
    status: 'Published',
    statusColor: 'success',
    tags: ['Design', 'Interactive', 'Visual'],
    link: 'https://example.com/portal',
    updatedAt: '2 hours ago',
  },
  {
    id: 2,
    name: 'Pathway Beyond The Cube',
    description: 'Revolutionary navigation system with 3D spatial awareness.',
    image: 'https://images.unsplash.com/photo-1519338381761-c7523edc1f46?w=400&h=200&fit=crop',
    status: 'Published',
    statusColor: 'success',
    tags: ['3D', 'Navigation', 'Innovation'],
    link: 'https://example.com/pathway',
    updatedAt: '5 hours ago',
  },
  {
    id: 3,
    name: 'Gateway to Infinity',
    description: 'Cutting-edge portal system for seamless dimensional transitions.',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=200&fit=crop',
    status: 'Draft',
    statusColor: 'secondary',
    tags: ['Portal', 'Dimensions', 'Tech'],
    link: 'https://example.com/gateway',
    updatedAt: '1 day ago',
  },
]);

const repositories = ref([
  {
    id: 1,
    icon: 'pi-github',
    owner: 'TechCorp',
    name: 'budget-tracker',
    description: 'Tool for tracking budgets and financial planning.',
    status: 'Deployed',
    statusColor: 'success',
    lastUpdate: '1 hour ago',
  },
  {
    id: 2,
    icon: 'pi-github',
    owner: 'Trimzales',
    name: 'investment-dashboard',
    description: 'Advanced dashboard to monitor and analyze investments.',
    status: 'In Progress',
    statusColor: 'warning',
    lastUpdate: '30 minutes ago',
  },
  {
    id: 3,
    icon: 'pi-github',
    owner: 'FinanceHub',
    name: 'loan-calculator',
    description: 'Tool for calculating loan repayment plans.',
    status: 'In Progress',
    statusColor: 'warning',
    lastUpdate: '2 hours ago',
  },
  {
    id: 4,
    icon: 'pi-github',
    owner: 'DataTech',
    name: 'expense-tracker',
    description: 'Comprehensive expense tracking solution.',
    status: 'Review',
    statusColor: 'info',
    lastUpdate: '6 hours ago',
  },
]);

const users = ref([
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    role: 'Product Manager',
    department: 'Product',
    status: 'Active',
    lastSeen: '2 minutes ago',
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'michael@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    role: 'Senior Developer',
    department: 'Engineering',
    status: 'Active',
    lastSeen: '5 minutes ago',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    email: 'emily@example.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    role: 'UI/UX Designer',
    department: 'Design',
    status: 'Away',
    lastSeen: '1 hour ago',
  },
  {
    id: 4,
    name: 'David Kim',
    email: 'david@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    role: 'Data Analyst',
    department: 'Analytics',
    status: 'Offline',
    lastSeen: '2 days ago',
  },
]);

const activities = ref([
  {
    id: 1,
    type: 'deployment',
    title: 'Application Deployed',
    description: 'E-commerce platform v2.1.0 successfully deployed to production',
    timestamp: '5 minutes ago',
    color: 'bg-green-100 dark:bg-green-900/20',
    iconColor: 'text-green-500',
  },
  {
    id: 2,
    type: 'update',
    title: 'Database Updated',
    description: 'Customer records synchronized with external CRM system',
    timestamp: '15 minutes ago',
    color: 'bg-blue-100 dark:bg-blue-900/20',
    iconColor: 'text-blue-500',
  },
  {
    id: 3,
    type: 'warning',
    title: 'High CPU Usage',
    description: 'Server load exceeded 85% threshold, auto-scaling triggered',
    timestamp: '1 hour ago',
    color: 'bg-orange-100 dark:bg-orange-900/20',
    iconColor: 'text-orange-500',
  },
  {
    id: 4,
    type: 'backup',
    title: 'Backup Completed',
    description: 'Daily database backup completed successfully',
    timestamp: '2 hours ago',
    color: 'bg-purple-100 dark:bg-purple-900/20',
    iconColor: 'text-purple-500',
  },
]);

const products = ref([
  {
    id: 1,
    name: 'Wireless Earbuds Pro',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=150&h=150&fit=crop',
    price: 149.99,
    rating: 4.8,
    reviews: 2547,
    category: 'Electronics',
    inStock: true,
    brand: 'AudioTech',
  },
  {
    id: 2,
    name: 'Smart Fitness Watch',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150&h=150&fit=crop',
    price: 299.99,
    rating: 4.6,
    reviews: 1834,
    category: 'Wearables',
    inStock: true,
    brand: 'FitTech',
  },
  {
    id: 3,
    name: 'Premium Coffee Maker',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=150&h=150&fit=crop',
    price: 89.99,
    rating: 4.4,
    reviews: 967,
    category: 'Kitchen',
    inStock: false,
    brand: 'BrewMaster',
  },
  {
    id: 4,
    name: 'Ergonomic Office Chair',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=150&h=150&fit=crop',
    price: 399.99,
    rating: 4.7,
    reviews: 1256,
    category: 'Furniture',
    inStock: true,
    brand: 'ComfortZone',
  },
]);

const metrics = ref([
  {
    id: 1,
    title: 'Total Revenue',
    value: '$284,590',
    change: '+12.5%',
    trend: 'up',
    chartData: [65, 78, 85, 92, 98, 115, 120],
    color: 'text-green-500',
  },
  {
    id: 2,
    title: 'Active Users',
    value: '15,847',
    change: '+8.2%',
    trend: 'up',
    chartData: [45, 52, 48, 61, 75, 82, 89],
    color: 'text-blue-500',
  },
  {
    id: 3,
    title: 'Conversion Rate',
    value: '3.24%',
    change: '-2.1%',
    trend: 'down',
    chartData: [85, 78, 82, 75, 68, 72, 65],
    color: 'text-orange-500',
  },
  {
    id: 4,
    title: 'Customer Satisfaction',
    value: '94.8%',
    change: '+5.3%',
    trend: 'up',
    chartData: [88, 90, 87, 91, 93, 92, 95],
    color: 'text-purple-500',
  },
]);

function getStatusColor(status: string) {
  const colors = {
    'Published': 'success',
    'Draft': 'secondary',
    'Deployed': 'success',
    'In Progress': 'warning',
    'Review': 'info',
    'Active': 'success',
    'Away': 'warning',
    'Offline': 'secondary',
  };
  return colors[status] || 'secondary';
}

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

function getActivityIcon(type: string) {
  const icons = {
    deployment: 'pi-cloud-upload',
    update: 'pi-refresh',
    warning: 'pi-exclamation-triangle',
    backup: 'pi-database',
  };
  return icons[type] || 'pi-info-circle';
}
</script>

<template>
  <div class="p-6 max-w-7xl mx-auto space-y-12">
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0 mb-4">
        Stacked List Examples
      </h1>
      <p class="text-surface-600 dark:text-surface-400">
        Various stacked list layout patterns from PrimeBlocks
      </p>
    </div>

    <!-- Example 1: Images, Tags and Actions with Search -->
    <section>
      <Card class="p-6">
        <template #title>
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-semibold">
              Images, Tags and Actions with Search
            </h2>
            <span class="text-sm text-surface-600 dark:text-surface-400">
              Displaying {{ projects.length }} Landing Pages
            </span>
          </div>
        </template>

        <template #content>
          <div class="space-y-4">
            <!-- Search and Filter Bar -->
            <div class="flex items-center gap-4 mb-6">
              <div class="flex-1">
                <IconField>
                  <InputIcon class="pi pi-search" />
                  <InputText v-model="searchQuery" placeholder="Search projects..." class="w-full" />
                </IconField>
              </div>
              <Button icon="pi pi-filter" label="Filter" outlined />
              <Button icon="pi pi-sort" label="Sort" outlined />
            </div>

            <!-- Project List -->
            <div class="space-y-4">
              <div v-for="project in projects" :key="project.id" class="flex gap-4 p-4 border border-surface-200 dark:border-surface-700 rounded-lg hover:shadow-md transition-shadow">
                <img :src="project.image" :alt="project.name" class="w-32 h-20 object-cover rounded-lg flex-shrink-0">

                <div class="flex-1 space-y-2">
                  <div class="flex items-start justify-between">
                    <div>
                      <div class="flex items-center gap-2">
                        <h3 class="text-lg font-semibold text-surface-900 dark:text-surface-0">
                          {{ project.name }}
                        </h3>
                        <i class="pi pi-external-link text-surface-400 text-sm cursor-pointer hover:text-primary-500" />
                      </div>
                      <p class="text-surface-600 dark:text-surface-400 text-sm">
                        {{ project.description }}
                      </p>
                    </div>
                    <Button icon="pi pi-ellipsis-h" text rounded size="small" />
                  </div>

                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <Tag :value="project.status" :severity="getStatusColor(project.status)" size="small" />
                      <div class="flex gap-1">
                        <Tag v-for="tag in project.tags.slice(0, 2)" :key="tag" :value="tag" size="small" severity="info" />
                      </div>
                    </div>
                    <span class="text-xs text-surface-500 dark:text-surface-400">Updated {{ project.updatedAt }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </Card>
    </section>

    <!-- Example 2: Cards with Search, Filter and Sort -->
    <section>
      <Card class="p-6">
        <template #title>
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-semibold">
              Cards with Search, Filter and Sort
            </h2>
            <div class="flex items-center gap-2">
              <Button icon="pi pi-filter" outlined size="small" />
              <Button label="Sort" icon="pi pi-chevron-down" icon-pos="right" outlined size="small" />
            </div>
          </div>
        </template>

        <template #content>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card v-for="project in projects" :key="project.id">
              <template #content>
                <div class="space-y-3">
                  <img :src="project.image" :alt="project.name" class="w-full h-32 object-cover rounded-lg">

                  <div class="space-y-2">
                    <div class="flex items-center justify-between">
                      <h3 class="font-semibold text-surface-900 dark:text-surface-0">
                        {{ project.name }}
                      </h3>
                      <Button icon="pi pi-ellipsis-h" text rounded size="small" />
                    </div>

                    <p class="text-sm text-surface-600 dark:text-surface-400">
                      {{ project.description }}
                    </p>

                    <div class="flex items-center justify-between">
                      <Tag :value="project.status" :severity="getStatusColor(project.status)" size="small" />
                      <span class="text-xs text-surface-500 dark:text-surface-400">{{ project.updatedAt }}</span>
                    </div>

                    <div class="flex gap-1 flex-wrap">
                      <Tag v-for="tag in project.tags" :key="tag" :value="tag" size="small" severity="info" />
                    </div>
                  </div>
                </div>
              </template>
            </Card>
          </div>
        </template>
      </Card>
    </section>

    <!-- Example 3: Avatars with Links -->
    <section>
      <Card class="p-6">
        <template #title>
          <h2 class="text-xl font-semibold">
            Avatars with Links
          </h2>
        </template>

        <template #content>
          <div class="space-y-3">
            <div v-for="user in users" :key="user.id" class="flex items-center gap-3 p-3 rounded-lg hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors">
              <Avatar :image="user.avatar" shape="circle" size="large" />

              <div class="flex-1">
                <div class="flex items-center gap-2">
                  <h3 class="font-semibold text-surface-900 dark:text-surface-0 hover:text-primary-500 cursor-pointer">
                    {{ user.name }}
                  </h3>
                  <Tag :value="user.status" :severity="getStatusColor(user.status)" size="small" />
                </div>
                <p class="text-sm text-surface-600 dark:text-surface-400">
                  {{ user.email }}
                </p>
                <div class="flex items-center gap-2 text-xs text-surface-500 dark:text-surface-400">
                  <span>{{ user.role }}</span>
                  <span>•</span>
                  <span>{{ user.department }}</span>
                  <span>•</span>
                  <span>Last seen {{ user.lastSeen }}</span>
                </div>
              </div>

              <Button icon="pi pi-ellipsis-h" text rounded size="small" />
            </div>
          </div>
        </template>
      </Card>
    </section>

    <!-- Example 4: Colored Rows -->
    <section>
      <Card class="p-6">
        <template #title>
          <h2 class="text-xl font-semibold">
            Colored Rows
          </h2>
        </template>

        <template #content>
          <div class="space-y-2">
            <div
              v-for="repo in repositories" :key="repo.id" class="flex items-center gap-3 p-4 rounded-lg transition-colors" :class="[
                repo.status === 'Deployed' ? 'bg-green-50 dark:bg-green-900/10 border-l-4 border-green-500'
                : repo.status === 'In Progress' ? 'bg-orange-50 dark:bg-orange-900/10 border-l-4 border-orange-500'
                  : 'bg-blue-50 dark:bg-blue-900/10 border-l-4 border-blue-500',
              ]"
            >
              <div class="flex items-center gap-2">
                <i class="text-xl text-surface-600 dark:text-surface-400" :class="[repo.icon]" />
                <span class="font-medium text-surface-900 dark:text-surface-0">{{ repo.owner }}</span>
              </div>

              <div class="flex-1">
                <h3 class="font-semibold text-surface-900 dark:text-surface-0">
                  {{ repo.name }}
                </h3>
                <p class="text-sm text-surface-600 dark:text-surface-400">
                  {{ repo.description }}
                </p>
              </div>

              <div class="text-right">
                <div class="font-medium text-surface-900 dark:text-surface-0">
                  {{ repo.status }}
                </div>
                <div class="text-xs text-surface-500 dark:text-surface-400">
                  {{ repo.lastUpdate }}
                </div>
              </div>

              <Button icon="pi pi-ellipsis-h" text rounded size="small" />
            </div>
          </div>
        </template>
      </Card>
    </section>

    <!-- Example 5: Content Links with Actions -->
    <section>
      <Card class="p-6">
        <template #title>
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-semibold">
              Content Links with Actions
            </h2>
            <div class="flex gap-2">
              <Button label="View All Updates" outlined size="small" />
              <Button label="Subscribe to Updates" size="small" />
            </div>
          </div>
        </template>

        <template #content>
          <div class="space-y-4">
            <div v-for="activity in activities" :key="activity.id" class="flex items-start gap-3 p-3 rounded-lg hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors">
              <div class="w-10 h-10 rounded-full flex items-center justify-center" :class="[activity.color]">
                <i class="text-lg" :class="[getActivityIcon(activity.type), activity.iconColor]" />
              </div>

              <div class="flex-1">
                <h3 class="font-semibold text-surface-900 dark:text-surface-0 mb-1">
                  {{ activity.title }}
                </h3>
                <p class="text-sm text-surface-600 dark:text-surface-400 mb-2">
                  {{ activity.description }}
                </p>
                <span class="text-xs text-surface-500 dark:text-surface-400">{{ activity.timestamp }}</span>
              </div>

              <Button icon="pi pi-ellipsis-h" text rounded size="small" />
            </div>
          </div>
        </template>
      </Card>
    </section>

    <!-- Example 6: Image, Meta and Rating -->
    <section>
      <Card class="p-6">
        <template #title>
          <h2 class="text-xl font-semibold">
            Image, Meta and Rating
          </h2>
        </template>

        <template #content>
          <div class="space-y-4">
            <div v-for="product in products" :key="product.id" class="flex items-center gap-4 p-4 border border-surface-200 dark:border-surface-700 rounded-lg hover:shadow-md transition-shadow">
              <img :src="product.image" :alt="product.name" class="w-16 h-16 object-cover rounded-lg flex-shrink-0">

              <div class="flex-1">
                <div class="flex items-start justify-between mb-2">
                  <div>
                    <h3 class="font-semibold text-surface-900 dark:text-surface-0">
                      {{ product.name }}
                    </h3>
                    <p class="text-sm text-surface-600 dark:text-surface-400">
                      {{ product.brand }} • {{ product.category }}
                    </p>
                  </div>
                  <div class="text-right">
                    <div class="text-lg font-bold text-surface-900 dark:text-surface-0">
                      ${{ product.price }}
                    </div>
                    <Badge v-if="product.inStock" value="In Stock" severity="success" size="small" />
                    <Badge v-else value="Out of Stock" severity="danger" size="small" />
                  </div>
                </div>

                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <div class="flex items-center">
                      <i v-for="star in getRatingStars(product.rating)" :key="star" class="pi text-yellow-500 text-sm" :class="[star]" />
                    </div>
                    <span class="text-sm text-surface-600 dark:text-surface-400">({{ product.reviews.toLocaleString() }})</span>
                  </div>

                  <Button icon="pi pi-shopping-cart" text rounded size="small" :disabled="!product.inStock" />
                </div>
              </div>
            </div>
          </div>
        </template>
      </Card>
    </section>

    <!-- Example 7: With Graph -->
    <section>
      <Card class="p-6">
        <template #title>
          <h2 class="text-xl font-semibold">
            With Graph
          </h2>
        </template>

        <template #content>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="metric in metrics" :key="metric.id" class="p-4 border border-surface-200 dark:border-surface-700 rounded-lg">
              <div class="flex items-start justify-between mb-3">
                <div>
                  <h3 class="text-sm font-medium text-surface-600 dark:text-surface-400">
                    {{ metric.title }}
                  </h3>
                  <div class="text-2xl font-bold text-surface-900 dark:text-surface-0">
                    {{ metric.value }}
                  </div>
                </div>
                <div class="text-right">
                  <div class="text-sm font-medium" :class="[metric.color]">
                    {{ metric.change }}
                  </div>
                  <i class="pi text-xs" :class="[metric.trend === 'up' ? 'pi-arrow-up' : 'pi-arrow-down', metric.color]" />
                </div>
              </div>

              <!-- Simple Chart Visualization -->
              <div class="flex items-end gap-1 h-16">
                <div
                  v-for="(value, index) in metric.chartData" :key="index"
                  class="flex-1 rounded-t transition-all hover:opacity-75"
                  :class="[metric.color.replace('text-', 'bg-')]"
                  :style="{ height: `${(value / Math.max(...metric.chartData)) * 100}%` }"
                />
              </div>
            </div>
          </div>
        </template>
      </Card>
    </section>
  </div>
</template>
