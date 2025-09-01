<script setup lang="ts">
// Content sections for demonstration
const sampleContent = {
  section1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  section2: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
  section3: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
  section4: "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus."
};

// Form data for login example
const loginForm = ref({
  username: '',
  password: ''
});

// Features list for showcase
const features = ref([
  { title: 'Performance', description: 'Optimized for speed and efficiency', icon: 'pi-bolt' },
  { title: 'Security', description: 'Enterprise-grade security features', icon: 'pi-shield' },
  { title: 'Scalability', description: 'Grows with your business needs', icon: 'pi-chart-line' }
]);

// Stats for dashboard
const stats = ref([
  { label: 'Users', value: '2.5K', trend: '+12%' },
  { label: 'Revenue', value: '$45K', trend: '+8%' },
  { label: 'Orders', value: '1.2K', trend: '+15%' }
]);
</script>

<template>
  <div class="p-6 lg:p-8 flex flex-col gap-8">
    <!-- Header -->
    <div class="flex flex-col gap-3 border-b border-surface-200 dark:border-surface-700 pb-6">
      <div class="flex items-center gap-3">
        <i class="pi pi-minus text-3xl text-primary-500" />
        <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0">
          Divider
        </h1>
      </div>
      <p class="text-surface-600 dark:text-surface-300 max-w-3xl">
        Divider is used to separate contents. It supports horizontal and vertical layouts with different types, alignments, and can include custom content.
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
        Divider is basically placed between items to separate content sections.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <p class="m-0 text-surface-600 dark:text-surface-300">
          {{ sampleContent.section1 }}
        </p>

        <Divider />

        <p class="m-0 text-surface-600 dark:text-surface-300">
          {{ sampleContent.section2 }}
        </p>

        <Divider />

        <p class="m-0 text-surface-600 dark:text-surface-300">
          {{ sampleContent.section3 }}
        </p>

        <Divider />

        <p class="m-0 text-surface-600 dark:text-surface-300">
          {{ sampleContent.section4 }}
        </p>
      </div>
    </div>

    <!-- Types -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Types
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Style of the border is configured with the type property: solid, dotted, or dashed.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <p class="m-0 text-surface-600 dark:text-surface-300">
          First section with solid divider below.
        </p>

        <Divider type="solid" />

        <p class="m-0 text-surface-600 dark:text-surface-300">
          Second section with dotted divider below.
        </p>

        <Divider type="dotted" />

        <p class="m-0 text-surface-600 dark:text-surface-300">
          Third section with dashed divider below.
        </p>

        <Divider type="dashed" />

        <p class="m-0 text-surface-600 dark:text-surface-300">
          Final section without divider.
        </p>
      </div>
    </div>

    <!-- Vertical -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Vertical
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Vertical divider is enabled by setting the layout property as vertical.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-row min-h-[200px]">
          <div class="flex-1 flex items-center justify-center p-4">
            <p class="text-center text-surface-600 dark:text-surface-300">
              Left content section with vertical divider.
            </p>
          </div>

          <Divider layout="vertical" />

          <div class="flex-1 flex items-center justify-center p-4">
            <p class="text-center text-surface-600 dark:text-surface-300">
              Middle content section with another vertical divider.
            </p>
          </div>

          <Divider layout="vertical" />

          <div class="flex-1 flex items-center justify-center p-4">
            <p class="text-center text-surface-600 dark:text-surface-300">
              Right content section without further dividers.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Content
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Children are rendered within the divider boundaries with configurable alignment.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <p class="m-0 text-surface-600 dark:text-surface-300">
          Content before left-aligned divider.
        </p>

        <Divider align="left" type="solid">
          <b>Left</b>
        </Divider>

        <p class="m-0 text-surface-600 dark:text-surface-300">
          Content before center-aligned divider.
        </p>

        <Divider align="center" type="dotted">
          <b>Center</b>
        </Divider>

        <p class="m-0 text-surface-600 dark:text-surface-300">
          Content before right-aligned divider.
        </p>

        <Divider align="right" type="dashed">
          <b>Right</b>
        </Divider>

        <p class="m-0 text-surface-600 dark:text-surface-300">
          Final content section.
        </p>
      </div>
    </div>

    <!-- Advanced Content -->
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-2">
        <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
          Advanced Content
        </h2>
        <Tag value="Rich Content" severity="info" />
      </div>
      <p class="text-surface-600 dark:text-surface-300">
        Dividers can contain rich content including icons, buttons, and badges.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <h3 class="text-lg font-semibold text-surface-900 dark:text-surface-0">User Profile</h3>
        <p class="text-surface-600 dark:text-surface-300">Personal information and preferences.</p>

        <Divider align="center">
          <div class="flex items-center gap-2 px-3 py-1 bg-surface-100 dark:bg-surface-800 rounded-full">
            <i class="pi pi-user text-primary-500" />
            <span class="font-semibold">Account Details</span>
          </div>
        </Divider>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div>
            <label class="font-medium text-surface-700 dark:text-surface-200">Full Name</label>
            <p class="text-surface-600 dark:text-surface-300">John Doe</p>
          </div>
          <div>
            <label class="font-medium text-surface-700 dark:text-surface-200">Email</label>
            <p class="text-surface-600 dark:text-surface-300">john@example.com</p>
          </div>
        </div>

        <Divider align="center">
          <div class="flex items-center gap-2 px-3 py-1 bg-surface-100 dark:bg-surface-800 rounded-full">
            <i class="pi pi-cog text-primary-500" />
            <span class="font-semibold">Preferences</span>
            <Badge value="3" severity="warn" />
          </div>
        </Divider>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          <div class="flex items-center justify-between">
            <span class="text-surface-700 dark:text-surface-200">Dark Mode</span>
            <ToggleSwitch />
          </div>
          <div class="flex items-center justify-between">
            <span class="text-surface-700 dark:text-surface-200">Notifications</span>
            <ToggleSwitch />
          </div>
          <div class="flex items-center justify-between">
            <span class="text-surface-700 dark:text-surface-200">Auto Save</span>
            <ToggleSwitch />
          </div>
        </div>

        <Divider align="right">
          <Button icon="pi pi-save" label="Save Changes" size="small" />
        </Divider>
      </div>
    </div>

    <!-- Login Form Example -->
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-2">
        <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
          Login Form
        </h2>
        <Tag value="Real Example" severity="warn" />
      </div>
      <p class="text-surface-600 dark:text-surface-300">
        Sample implementation of a login form using dividers with content for layout separation.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col md:flex-row max-w-4xl mx-auto">
          <div class="w-full md:w-5/12 flex flex-col items-center justify-center gap-4 py-8">
            <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-0 mb-4">Sign In</h3>
            <div class="flex flex-col gap-2 w-full max-w-sm">
              <label for="username" class="font-medium text-surface-700 dark:text-surface-200">Username</label>
              <InputText 
                id="username" 
                v-model="loginForm.username"
                type="text" 
                placeholder="Enter your username"
              />
            </div>
            <div class="flex flex-col gap-2 w-full max-w-sm">
              <label for="password" class="font-medium text-surface-700 dark:text-surface-200">Password</label>
              <InputText 
                id="password" 
                v-model="loginForm.password"
                type="password" 
                placeholder="Enter your password"
              />
            </div>
            <div class="flex w-full max-w-sm">
              <Button 
                label="Login" 
                icon="pi pi-sign-in" 
                class="w-full"
              />
            </div>
          </div>

          <div class="w-full md:w-2/12 flex items-center justify-center">
            <Divider layout="vertical" class="hidden md:flex">
              <b>OR</b>
            </Divider>
            <Divider layout="horizontal" class="flex md:hidden" align="center">
              <b>OR</b>
            </Divider>
          </div>

          <div class="w-full md:w-5/12 flex flex-col items-center justify-center py-8">
            <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-0 mb-6">New User?</h3>
            <p class="text-center text-surface-600 dark:text-surface-300 mb-6 max-w-sm">
              Create an account to access all features and personalize your experience.
            </p>
            <Button 
              label="Sign Up" 
              icon="pi pi-user-plus" 
              severity="secondary" 
              class="w-full max-w-sm"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Feature Showcase -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibent text-surface-900 dark:text-surface-0">
        Feature Showcase
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Using dividers to separate feature sections in a marketing layout.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="text-center mb-8">
          <h3 class="text-2xl font-bold text-surface-900 dark:text-surface-0">Why Choose Us?</h3>
          <p class="text-surface-600 dark:text-surface-300 mt-2">Discover the key features that make us stand out</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="(feature, index) in features" :key="feature.title" class="text-center">
            <div class="flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900/20 rounded-full mx-auto mb-4">
              <i :class="`pi ${feature.icon} text-2xl text-primary-600 dark:text-primary-400`" />
            </div>
            <h4 class="text-lg font-semibold text-surface-900 dark:text-surface-0 mb-2">{{ feature.title }}</h4>
            <p class="text-surface-600 dark:text-surface-300">{{ feature.description }}</p>
          </div>
        </div>

        <Divider align="center" class="my-8">
          <div class="flex items-center gap-2 px-4 py-2 bg-primary-50 dark:bg-primary-900/20 rounded-full">
            <i class="pi pi-star text-primary-600 dark:text-primary-400" />
            <span class="font-semibold text-primary-700 dark:text-primary-300">Trusted by 10,000+ users</span>
            <i class="pi pi-star text-primary-600 dark:text-primary-400" />
          </div>
        </Divider>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div v-for="stat in stats" :key="stat.label" class="p-4">
            <div class="text-3xl font-bold text-surface-900 dark:text-surface-0">{{ stat.value }}</div>
            <div class="text-surface-500 dark:text-surface-400">{{ stat.label }}</div>
            <div class="text-green-600 text-sm font-medium">{{ stat.trend }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Vertical Content -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Vertical Content
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Vertical dividers with content aligned at different positions.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-row min-h-[300px]">
          <div class="flex-1 flex items-center justify-center p-6 bg-surface-50 dark:bg-surface-800 rounded-l-lg">
            <div class="text-center">
              <i class="pi pi-desktop text-4xl text-primary-500 mb-4" />
              <h4 class="font-semibold text-surface-900 dark:text-surface-0">Desktop App</h4>
              <p class="text-surface-600 dark:text-surface-300">Full-featured desktop application</p>
            </div>
          </div>

          <Divider layout="vertical" align="top">
            <div class="bg-surface-0 dark:bg-surface-900 px-2 py-1 rounded">
              <i class="pi pi-arrow-up text-primary-500" />
            </div>
          </Divider>

          <div class="flex-1 flex items-center justify-center p-6">
            <div class="text-center">
              <i class="pi pi-mobile text-4xl text-secondary-500 mb-4" />
              <h4 class="font-semibold text-surface-900 dark:text-surface-0">Mobile App</h4>
              <p class="text-surface-600 dark:text-surface-300">Native mobile experience</p>
            </div>
          </div>

          <Divider layout="vertical" align="bottom">
            <div class="bg-surface-0 dark:bg-surface-900 px-2 py-1 rounded">
              <i class="pi pi-arrow-down text-primary-500" />
            </div>
          </Divider>

          <div class="flex-1 flex items-center justify-center p-6 bg-surface-50 dark:bg-surface-800 rounded-r-lg">
            <div class="text-center">
              <i class="pi pi-globe text-4xl text-green-500 mb-4" />
              <h4 class="font-semibold text-surface-900 dark:text-surface-0">Web App</h4>
              <p class="text-surface-600 dark:text-surface-300">Browser-based solution</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Custom Styling -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Custom Styling
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Dividers with custom colors and enhanced visual effects.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <p class="m-0 text-surface-600 dark:text-surface-300">Content with colorful dividers below.</p>

        <Divider class="custom-divider-primary">
          <span class="bg-primary text-primary-contrast px-3 py-1 rounded-full text-sm font-semibold">
            Primary
          </span>
        </Divider>

        <p class="m-0 text-surface-600 dark:text-surface-300">Another section with different styling.</p>

        <Divider class="custom-divider-secondary">
          <span class="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Success
          </span>
        </Divider>

        <p class="m-0 text-surface-600 dark:text-surface-300">Final section with warning styling.</p>

        <Divider class="custom-divider-warning">
          <span class="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Warning
          </span>
        </Divider>

        <p class="m-0 text-surface-600 dark:text-surface-300">End of custom styled content.</p>
      </div>
    </div>
  </div>
</template>

<style>
/* Custom divider styling */
.custom-divider-primary {
  --p-divider-border-color: var(--p-primary-color);
}

.custom-divider-secondary {
  --p-divider-border-color: #10b981;
}

.custom-divider-warning {
  --p-divider-border-color: #f59e0b;
}
</style>