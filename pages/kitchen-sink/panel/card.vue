<script setup lang="ts">
// Product data for cards
const products = ref([
  {
    id: 1,
    name: 'MacBook Pro',
    price: 2499,
    category: 'Laptop',
    rating: 4.9,
    image: 'macbook.jpg',
    description: 'Powerful laptop for professional work and creative tasks.',
    status: 'In Stock',
    features: ['M3 Pro Chip', '18-hour battery', 'Liquid Retina XDR display'],
  },
  {
    id: 2,
    name: 'iPhone 15 Pro',
    price: 999,
    category: 'Smartphone',
    rating: 4.8,
    image: 'iphone.jpg',
    description: 'Latest iPhone with advanced camera system and titanium design.',
    status: 'Pre-order',
    features: ['A17 Pro Chip', 'Titanium Design', 'Pro Camera System'],
  },
  {
    id: 3,
    name: 'AirPods Pro',
    price: 249,
    category: 'Audio',
    rating: 4.5,
    image: 'airpods.jpg',
    description: 'Noise-cancelling wireless earbuds with spatial audio.',
    status: 'Limited Stock',
    features: ['Active Noise Cancellation', 'Spatial Audio', 'MagSafe Charging'],
  },
]);

// Team members for profile cards
const teamMembers = ref([
  {
    id: 1,
    name: 'Amy Elsner',
    role: 'Frontend Developer',
    avatar: 'amyelsner.png',
    email: 'amy@company.com',
    skills: ['Vue.js', 'React', 'TypeScript'],
    projects: 12,
    location: 'San Francisco, CA',
  },
  {
    id: 2,
    name: 'Onyama Limba',
    role: 'Backend Developer',
    avatar: 'onyamalimba.png',
    email: 'onyama@company.com',
    skills: ['Node.js', 'Python', 'PostgreSQL'],
    projects: 8,
    location: 'New York, NY',
  },
  {
    id: 3,
    name: 'Ioni Bowcher',
    role: 'UI/UX Designer',
    avatar: 'ionibowcher.png',
    email: 'ioni@company.com',
    skills: ['Figma', 'Adobe XD', 'Sketch'],
    projects: 15,
    location: 'Austin, TX',
  },
]);

// Blog posts for content cards
const blogPosts = ref([
  {
    id: 1,
    title: 'Getting Started with PrimeVue',
    excerpt: 'Learn how to set up and use PrimeVue components in your Vue.js applications.',
    author: 'John Doe',
    date: '2024-01-15',
    readTime: '5 min read',
    category: 'Tutorial',
    tags: ['Vue.js', 'PrimeVue', 'Tutorial'],
    likes: 42,
    comments: 8,
  },
  {
    id: 2,
    title: 'Advanced DataTable Features',
    excerpt: 'Explore advanced features of PrimeVue DataTable including sorting, filtering, and pagination.',
    author: 'Jane Smith',
    date: '2024-01-20',
    readTime: '8 min read',
    category: 'Guide',
    tags: ['DataTable', 'Components', 'Advanced'],
    likes: 38,
    comments: 12,
  },
  {
    id: 3,
    title: 'Theming Your Application',
    excerpt: 'Complete guide to customizing themes and styling your PrimeVue application.',
    author: 'Bob Johnson',
    date: '2024-01-25',
    readTime: '6 min read',
    category: 'Design',
    tags: ['Theming', 'CSS', 'Customization'],
    likes: 29,
    comments: 5,
  },
]);

// Statistics for dashboard cards
const stats = ref([
  { label: 'Total Users', value: '12,456', icon: 'pi-users', color: '#3B82F6', change: '+12%' },
  { label: 'Revenue', value: '$45,678', icon: 'pi-dollar', color: '#10B981', change: '+8%' },
  { label: 'Orders', value: '1,234', icon: 'pi-shopping-cart', color: '#F59E0B', change: '+15%' },
  { label: 'Bounce Rate', value: '2.4%', icon: 'pi-chart-line', color: '#EF4444', change: '-3%' },
]);

// Utility functions
function getSeverity(status) {
  switch (status) {
    case 'In Stock':
      return 'success';
    case 'Limited Stock':
      return 'warn';
    case 'Pre-order':
      return 'info';
    case 'Out of Stock':
      return 'danger';
    default:
      return 'secondary';
  }
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('');
}
</script>

<template>
  <div class="p-6 lg:p-8 flex flex-col gap-8">
    <!-- Header -->
    <div class="flex flex-col gap-3 border-b border-surface-200 dark:border-surface-700 pb-6">
      <div class="flex items-center gap-3">
        <i class="pi pi-id-card text-3xl text-primary-500" />
        <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0">
          Card
        </h1>
      </div>
      <p class="text-surface-600 dark:text-surface-300 max-w-3xl">
        Card is a flexible container component. It provides header, title, subtitle, content and footer templates to organize content in a structured way.
      </p>
    </div>

    <!-- Basic -->
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-2">
        <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
          Basic
        </h2>
        <Tag value="Most Common" severity="success" />
      </div>
      <p class="text-surface-600 dark:text-surface-300">
        A simple Card is created with a title template along with the content as children.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex justify-center">
          <Card class="w-full max-w-md">
            <template #title>
              Simple Card
            </template>
            <template #content>
              <p class="m-0 text-surface-600 dark:text-surface-300">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae
                numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse,
                cupiditate neque quas!
              </p>
            </template>
          </Card>
        </div>
      </div>
    </div>

    <!-- Advanced -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Advanced
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Card provides header, title, subtitle, content and footer as the named templates to place content.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex justify-center">
          <Card class="w-full max-w-md overflow-hidden">
            <template #header>
              <div class="flex items-center justify-center h-48 bg-gradient-to-r from-blue-400 to-purple-500">
                <i class="pi pi-user text-6xl text-white" />
              </div>
            </template>
            <template #title>
              Advanced Card
            </template>
            <template #subtitle>
              Card subtitle
            </template>
            <template #content>
              <p class="m-0 text-surface-600 dark:text-surface-300">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae
                numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse,
                cupiditate neque quas!
              </p>
            </template>
            <template #footer>
              <div class="flex gap-2">
                <Button label="Cancel" severity="secondary" variant="outlined" class="flex-1" />
                <Button label="Save" class="flex-1" />
              </div>
            </template>
          </Card>
        </div>
      </div>
    </div>

    <!-- Product Cards -->
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-2">
        <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
          Product Cards
        </h2>
        <Tag value="E-commerce" severity="info" />
      </div>
      <p class="text-surface-600 dark:text-surface-300">
        Product showcase cards with images, pricing, ratings, and action buttons.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card v-for="product in products" :key="product.id" class="overflow-hidden">
            <template #header>
              <div class="flex items-center justify-center h-48 bg-surface-100 dark:bg-surface-700">
                <i class="pi pi-image text-6xl text-surface-400" />
              </div>
            </template>
            <template #title>
              <div class="flex items-center justify-between">
                <span>{{ product.name }}</span>
                <Tag :value="product.status" :severity="getSeverity(product.status)" />
              </div>
            </template>
            <template #subtitle>
              <div class="flex items-center justify-between">
                <span class="text-surface-500 dark:text-surface-400">{{ product.category }}</span>
                <div class="flex items-center gap-1">
                  <i class="pi pi-star-fill text-yellow-500" />
                  <span class="font-semibold">{{ product.rating }}</span>
                </div>
              </div>
            </template>
            <template #content>
              <p class="text-surface-600 dark:text-surface-300 mb-4">
                {{ product.description }}
              </p>
              <div class="mb-4">
                <h5 class="font-semibold text-surface-900 dark:text-surface-0 mb-2">
                  Features:
                </h5>
                <ul class="list-disc list-inside space-y-1">
                  <li v-for="feature in product.features" :key="feature" class="text-sm text-surface-600 dark:text-surface-300">
                    {{ feature }}
                  </li>
                </ul>
              </div>
            </template>
            <template #footer>
              <div class="flex items-center justify-between">
                <span class="text-2xl font-bold text-primary-600 dark:text-primary-400">{{ formatCurrency(product.price) }}</span>
                <div class="flex gap-2">
                  <Button icon="pi pi-heart" variant="outlined" />
                  <Button icon="pi pi-shopping-cart" label="Add to Cart" />
                </div>
              </div>
            </template>
          </Card>
        </div>
      </div>
    </div>

    <!-- Team Profile Cards -->
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-2">
        <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
          Profile Cards
        </h2>
        <Tag value="Team" severity="warn" />
      </div>
      <p class="text-surface-600 dark:text-surface-300">
        Team member profile cards with contact information and skills.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card v-for="member in teamMembers" :key="member.id">
            <template #header>
              <div class="flex flex-col items-center pt-6 pb-4">
                <Avatar
                  :label="getInitials(member.name)"
                  size="xlarge"
                  shape="circle"
                  :style="{ backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}` }"
                />
                <div class="mt-4 text-center">
                  <h3 class="font-bold text-xl text-surface-900 dark:text-surface-0">
                    {{ member.name }}
                  </h3>
                  <p class="text-surface-500 dark:text-surface-400">
                    {{ member.role }}
                  </p>
                </div>
              </div>
            </template>
            <template #content>
              <div class="space-y-4">
                <div class="flex items-center gap-2">
                  <i class="pi pi-envelope text-surface-500" />
                  <span class="text-sm text-surface-600 dark:text-surface-300">{{ member.email }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <i class="pi pi-map-marker text-surface-500" />
                  <span class="text-sm text-surface-600 dark:text-surface-300">{{ member.location }}</span>
                </div>
                <div>
                  <h5 class="font-semibold text-surface-900 dark:text-surface-0 mb-2">
                    Skills:
                  </h5>
                  <div class="flex flex-wrap gap-1">
                    <Tag v-for="skill in member.skills" :key="skill" :value="skill" severity="secondary" />
                  </div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-primary-600 dark:text-primary-400">
                    {{ member.projects }}
                  </div>
                  <div class="text-sm text-surface-500 dark:text-surface-400">
                    Projects Completed
                  </div>
                </div>
              </div>
            </template>
            <template #footer>
              <div class="flex gap-2">
                <Button label="Message" icon="pi pi-comment" variant="outlined" class="flex-1" />
                <Button label="Connect" icon="pi pi-user-plus" class="flex-1" />
              </div>
            </template>
          </Card>
        </div>
      </div>
    </div>

    <!-- Blog Cards -->
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-2">
        <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
          Content Cards
        </h2>
        <Tag value="Blog" severity="danger" />
      </div>
      <p class="text-surface-600 dark:text-surface-300">
        Blog post cards with metadata, engagement metrics, and content preview.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card v-for="post in blogPosts" :key="post.id">
            <template #header>
              <div class="flex items-center justify-center h-32 bg-gradient-to-r from-purple-400 to-pink-400">
                <i class="pi pi-file-edit text-4xl text-white" />
              </div>
            </template>
            <template #title>
              {{ post.title }}
            </template>
            <template #subtitle>
              <div class="flex items-center justify-between text-sm">
                <span>By {{ post.author }}</span>
                <Tag :value="post.category" severity="info" />
              </div>
            </template>
            <template #content>
              <p class="text-surface-600 dark:text-surface-300 mb-4">
                {{ post.excerpt }}
              </p>
              <div class="flex flex-wrap gap-1 mb-4">
                <Tag v-for="tag in post.tags" :key="tag" :value="tag" severity="secondary" />
              </div>
              <div class="flex items-center justify-between text-sm text-surface-500 dark:text-surface-400">
                <span>{{ post.date }}</span>
                <span>{{ post.readTime }}</span>
              </div>
            </template>
            <template #footer>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-4 text-sm text-surface-500 dark:text-surface-400">
                  <div class="flex items-center gap-1">
                    <i class="pi pi-heart" />
                    <span>{{ post.likes }}</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <i class="pi pi-comment" />
                    <span>{{ post.comments }}</span>
                  </div>
                </div>
                <Button label="Read More" variant="text" />
              </div>
            </template>
          </Card>
        </div>
      </div>
    </div>

    <!-- Dashboard Stats Cards -->
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-2">
        <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
          Dashboard Cards
        </h2>
        <Tag value="Analytics" severity="success" />
      </div>
      <p class="text-surface-600 dark:text-surface-300">
        Statistics cards for dashboards with icons, metrics, and trend indicators.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card v-for="stat in stats" :key="stat.label" class="text-center">
            <template #content>
              <div class="flex flex-col items-center gap-4">
                <div class="flex items-center justify-center w-16 h-16 rounded-full" :style="{ backgroundColor: `${stat.color}20` }">
                  <i :class="`pi ${stat.icon} text-2xl`" :style="{ color: stat.color }" />
                </div>
                <div>
                  <div class="text-2xl font-bold text-surface-900 dark:text-surface-0">
                    {{ stat.value }}
                  </div>
                  <div class="text-surface-500 dark:text-surface-400">
                    {{ stat.label }}
                  </div>
                </div>
                <div class="flex items-center gap-1 text-sm" :class="stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'">
                  <i :class="stat.change.startsWith('+') ? 'pi pi-arrow-up' : 'pi pi-arrow-down'" />
                  <span>{{ stat.change }}</span>
                </div>
              </div>
            </template>
          </Card>
        </div>
      </div>
    </div>

    <!-- Interactive Card -->
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-2">
        <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
          Interactive Card
        </h2>
        <Tag value="Forms" severity="info" />
      </div>
      <p class="text-surface-600 dark:text-surface-300">
        Cards with form controls and interactive elements for user input.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex justify-center">
          <Card class="w-full max-w-md">
            <template #title>
              <div class="flex items-center gap-2">
                <i class="pi pi-cog text-primary-500" />
                <span>Settings</span>
              </div>
            </template>
            <template #subtitle>
              Configure your preferences
            </template>
            <template #content>
              <div class="space-y-4">
                <div class="flex flex-col gap-2">
                  <label class="font-medium text-surface-700 dark:text-surface-200">Display Name</label>
                  <InputText placeholder="Enter your name" />
                </div>
                <div class="flex flex-col gap-2">
                  <label class="font-medium text-surface-700 dark:text-surface-200">Theme</label>
                  <Select :options="['Light', 'Dark', 'Auto']" placeholder="Select theme" />
                </div>
                <div class="flex items-center justify-between">
                  <label class="font-medium text-surface-700 dark:text-surface-200">Email Notifications</label>
                  <ToggleSwitch />
                </div>
                <div class="flex items-center justify-between">
                  <label class="font-medium text-surface-700 dark:text-surface-200">Two-Factor Auth</label>
                  <ToggleSwitch />
                </div>
              </div>
            </template>
            <template #footer>
              <div class="flex gap-2">
                <Button label="Reset" severity="secondary" variant="outlined" class="flex-1" />
                <Button label="Save Changes" class="flex-1" />
              </div>
            </template>
          </Card>
        </div>
      </div>
    </div>

    <!-- Card Variants -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Card Variants
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Different visual styles and layouts for various use cases.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Minimal Card -->
          <Card class="border-l-4 border-blue-500">
            <template #content>
              <div class="flex items-center gap-4">
                <div class="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <i class="pi pi-info-circle text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 class="font-semibold text-surface-900 dark:text-surface-0">
                    Information
                  </h4>
                  <p class="text-surface-600 dark:text-surface-300 m-0">
                    This is a minimal card design.
                  </p>
                </div>
              </div>
            </template>
          </Card>

          <!-- Success Card -->
          <Card class="border-l-4 border-green-500">
            <template #content>
              <div class="flex items-center gap-4">
                <div class="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <i class="pi pi-check-circle text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h4 class="font-semibold text-surface-900 dark:text-surface-0">
                    Success
                  </h4>
                  <p class="text-surface-600 dark:text-surface-300 m-0">
                    Operation completed successfully.
                  </p>
                </div>
              </div>
            </template>
          </Card>

          <!-- Warning Card -->
          <Card class="border-l-4 border-orange-500">
            <template #content>
              <div class="flex items-center gap-4">
                <div class="flex items-center justify-center w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                  <i class="pi pi-exclamation-triangle text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <h4 class="font-semibold text-surface-900 dark:text-surface-0">
                    Warning
                  </h4>
                  <p class="text-surface-600 dark:text-surface-300 m-0">
                    Please review this information.
                  </p>
                </div>
              </div>
            </template>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>
