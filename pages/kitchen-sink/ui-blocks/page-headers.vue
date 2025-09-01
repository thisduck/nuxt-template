<script setup lang="ts">
useSeoMeta({
  title: 'Page Headers - UI Blocks',
  description: 'Collection of page header UI blocks based on PrimeBlocks examples.',
});

const breadcrumbHome = ref({ icon: 'pi pi-home', to: '/' });
const breadcrumbItems = ref([
  { label: 'Application' },
  { label: 'Customer Management' }
]);

const searchValue = ref('');
const filterOptions = ref([
  { label: 'All Projects', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
  { label: 'On Hold', value: 'hold' }
]);

const selectedFilter = ref('all');

const teamMembers = ref([
  { name: 'John Doe', avatar: 'JD', color: 'bg-blue-500' },
  { name: 'Jane Smith', avatar: 'JS', color: 'bg-purple-500' },
  { name: 'Mike Johnson', avatar: 'MJ', color: 'bg-green-500' }
]);

const tags = ref([
  { label: 'Frontend', severity: 'info' },
  { label: 'React', severity: 'success' },
  { label: 'TypeScript', severity: 'warning' }
]);

const userStats = ref([
  { label: 'Followers', value: 2847 },
  { label: 'Projects', value: 42 },
  { label: 'Contributions', value: 1256 }
]);
</script>

<template>
  <div class="p-6 space-y-8">
    <div class="space-y-4">
      <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0">
        Page Headers
      </h1>
      <p class="text-surface-600 dark:text-surface-300">
        Collection of page header UI blocks based on PrimeBlocks examples
      </p>
    </div>

    <!-- 1. With Avatar, Meta and Actions -->
    <div class="space-y-4">
      <h2 class="text-xl font-semibold text-surface-900 dark:text-surface-0 mb-6">
        With Avatar, Meta and Actions
      </h2>
      
      <Card class="shadow-lg">
        <template #content>
          <div class="p-6">
            <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div class="flex items-center gap-4">
                <Avatar 
                  image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" 
                  size="xlarge" 
                  shape="circle"
                  class="shadow-md"
                />
                <div>
                  <h3 class="text-2xl font-bold text-surface-900 dark:text-surface-0 mb-1">
                    Alex Rivera
                  </h3>
                  <p class="text-surface-600 dark:text-surface-400 mb-3">
                    Senior Product Manager • San Francisco, CA
                  </p>
                  <div class="flex items-center gap-6 text-sm">
                    <div v-for="stat in userStats" :key="stat.label" class="text-center">
                      <div class="font-bold text-surface-900 dark:text-surface-0">{{ stat.value.toLocaleString() }}</div>
                      <div class="text-surface-500 dark:text-surface-400">{{ stat.label }}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="flex items-center gap-2">
                <Button label="Message" icon="pi pi-envelope" severity="secondary" />
                <Button label="Follow" icon="pi pi-plus" />
                <Button icon="pi pi-ellipsis-v" severity="secondary" text />
              </div>
            </div>
          </div>
        </template>
      </Card>
    </div>

    <!-- 2. With Breadcrumb, Meta and Actions -->
    <div class="space-y-4">
      <h2 class="text-xl font-semibold text-surface-900 dark:text-surface-0 mb-6">
        With Breadcrumb, Meta and Actions
      </h2>
      
      <Card class="shadow-lg">
        <template #content>
          <div class="p-6 space-y-4">
            <Breadcrumb :home="breadcrumbHome" :model="breadcrumbItems" />
            
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 class="text-2xl font-bold text-surface-900 dark:text-surface-0 mb-2">
                  Customer Management
                </h1>
                <p class="text-surface-600 dark:text-surface-400 mb-3">
                  Manage customer relationships, orders, and support tickets
                </p>
                <div class="flex items-center gap-2">
                  <Tag value="Active" severity="success" />
                  <span class="text-sm text-surface-500 dark:text-surface-400">247 customers</span>
                  <span class="text-sm text-surface-500 dark:text-surface-400">•</span>
                  <span class="text-sm text-surface-500 dark:text-surface-400">Last updated 10 minutes ago</span>
                </div>
              </div>
              
              <div class="flex items-center gap-2">
                <Button label="Export" icon="pi pi-download" severity="secondary" outlined />
                <Button label="Add Customer" icon="pi pi-plus" />
              </div>
            </div>
          </div>
        </template>
      </Card>
    </div>

    <!-- 3. Advanced Filter -->
    <div class="space-y-4">
      <h2 class="text-xl font-semibold text-surface-900 dark:text-surface-0 mb-6">
        Advanced Filter
      </h2>
      
      <Card class="shadow-lg">
        <template #content>
          <div class="p-6 space-y-4">
            <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 class="text-2xl font-bold text-surface-900 dark:text-surface-0 mb-2">
                  Project Dashboard
                </h1>
                <p class="text-surface-600 dark:text-surface-400">
                  Monitor and manage all your active projects
                </p>
              </div>
              
              <div class="flex items-center gap-2">
                <Button icon="pi pi-calendar" severity="secondary" text />
                <Button icon="pi pi-cog" severity="secondary" text />
                <Button label="New Project" icon="pi pi-plus" />
              </div>
            </div>
            
            <div class="flex flex-col sm:flex-row gap-4">
              <div class="flex-1">
                <InputText 
                  v-model="searchValue" 
                  placeholder="Search projects..." 
                  class="w-full"
                >
                  <template #prefix>
                    <Icon name="lucide:search" size="16" />
                  </template>
                </InputText>
              </div>
              
              <div class="flex items-center gap-2">
                <Dropdown 
                  v-model="selectedFilter"
                  :options="filterOptions"
                  optionLabel="label"
                  optionValue="value"
                  placeholder="Filter by status"
                  class="min-w-[160px]"
                />
                <Button label="Advanced" icon="pi pi-sliders-h" severity="secondary" outlined />
              </div>
            </div>
            
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-4">
                <span class="text-sm text-surface-500 dark:text-surface-400">24 projects found</span>
                <div class="flex items-center gap-2">
                  <span class="text-sm text-surface-500 dark:text-surface-400">Sort by:</span>
                  <Button label="Recent" severity="secondary" text size="small" />
                </div>
              </div>
              
              <div class="flex items-center gap-1">
                <Button icon="pi pi-th-large" severity="secondary" text size="small" />
                <Button icon="pi pi-list" severity="secondary" outlined size="small" />
              </div>
            </div>
          </div>
        </template>
      </Card>
    </div>

    <!-- 4. Breadcrumb with Search -->
    <div class="space-y-4">
      <h2 class="text-xl font-semibold text-surface-900 dark:text-surface-0 mb-6">
        Breadcrumb with Search
      </h2>
      
      <Card class="shadow-lg">
        <template #content>
          <div class="p-6 space-y-4">
            <Breadcrumb :home="breadcrumbHome" :model="breadcrumbItems" />
            
            <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 class="text-2xl font-bold text-surface-900 dark:text-surface-0 mb-1">
                  Documentation
                </h1>
                <p class="text-surface-600 dark:text-surface-400">
                  Browse through our comprehensive documentation
                </p>
              </div>
              
              <div class="flex items-center gap-2">
                <InputText 
                  placeholder="Search docs..." 
                  class="min-w-[250px]"
                >
                  <template #prefix>
                    <Icon name="lucide:search" size="16" />
                  </template>
                </InputText>
                <Button icon="pi pi-filter" severity="secondary" outlined />
              </div>
            </div>
            
            <div class="flex items-center gap-2">
              <Tag label="Getting Started" severity="info" />
              <Tag label="API Reference" severity="success" />
              <Tag label="Examples" severity="warning" />
              <span class="text-sm text-surface-500 dark:text-surface-400">•</span>
              <span class="text-sm text-surface-500 dark:text-surface-400">127 articles</span>
            </div>
          </div>
        </template>
      </Card>
    </div>

    <!-- 5. Card with Avatar and Stats -->
    <div class="space-y-4">
      <h2 class="text-xl font-semibold text-surface-900 dark:text-surface-0 mb-6">
        Card with Avatar and Stats
      </h2>
      
      <Card class="shadow-lg">
        <template #content>
          <div class="p-6">
            <div class="flex flex-col md:flex-row gap-6">
              <div class="flex items-center gap-4">
                <Avatar 
                  image="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face" 
                  size="xlarge" 
                  shape="circle"
                  class="shadow-md"
                />
                <div>
                  <h3 class="text-xl font-bold text-surface-900 dark:text-surface-0 mb-1">
                    Sarah Wilson
                  </h3>
                  <p class="text-surface-600 dark:text-surface-400 mb-2">
                    UX Designer & Frontend Developer
                  </p>
                  <div class="flex items-center gap-2">
                    <Tag v-for="tag in tags" :key="tag.label" :label="tag.label" :severity="tag.severity" />
                  </div>
                </div>
              </div>
              
              <div class="flex-1">
                <div class="grid grid-cols-3 gap-4 mb-4">
                  <div class="text-center p-4 bg-surface-50 dark:bg-surface-800 rounded-lg">
                    <div class="text-2xl font-bold text-primary-500 mb-1">156</div>
                    <div class="text-sm text-surface-500 dark:text-surface-400">Projects</div>
                  </div>
                  <div class="text-center p-4 bg-surface-50 dark:bg-surface-800 rounded-lg">
                    <div class="text-2xl font-bold text-green-500 mb-1">2.4K</div>
                    <div class="text-sm text-surface-500 dark:text-surface-400">Followers</div>
                  </div>
                  <div class="text-center p-4 bg-surface-50 dark:bg-surface-800 rounded-lg">
                    <div class="text-2xl font-bold text-orange-500 mb-1">98%</div>
                    <div class="text-sm text-surface-500 dark:text-surface-400">Rating</div>
                  </div>
                </div>
                
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <div class="flex -space-x-2" v-for="member in teamMembers.slice(0, 3)" :key="member.name">
                      <Avatar :label="member.avatar" :class="member.color" size="small" />
                    </div>
                    <span class="text-sm text-surface-500 dark:text-surface-400 ml-2">+12 team members</span>
                  </div>
                  
                  <div class="flex items-center gap-2">
                    <Button label="View Profile" severity="secondary" outlined size="small" />
                    <Button label="Contact" size="small" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </Card>
    </div>

    <!-- 9. Search and Filter -->
    <div class="space-y-4">
      <h2 class="text-xl font-semibold text-surface-900 dark:text-surface-0 mb-6">
        Search and Filter
      </h2>
      
      <Card class="shadow-lg">
        <template #content>
          <div class="p-6 space-y-4">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 class="text-2xl font-bold text-surface-900 dark:text-surface-0 mb-1">
                  Team Directory
                </h1>
                <p class="text-surface-600 dark:text-surface-400">
                  Find and connect with team members across the organization
                </p>
              </div>
              
              <Button label="Invite Member" icon="pi pi-user-plus" />
            </div>
            
            <div class="flex flex-col lg:flex-row gap-4">
              <div class="flex-1">
                <InputText 
                  v-model="searchValue" 
                  placeholder="Search by name, role, or department..." 
                  class="w-full"
                >
                  <template #prefix>
                    <Icon name="lucide:search" size="16" />
                  </template>
                </InputText>
              </div>
              
              <div class="flex items-center gap-2">
                <Dropdown 
                  :options="[
                    { label: 'All Departments', value: 'all' },
                    { label: 'Engineering', value: 'eng' },
                    { label: 'Design', value: 'design' },
                    { label: 'Marketing', value: 'marketing' }
                  ]"
                  optionLabel="label"
                  placeholder="Department"
                  class="min-w-[150px]"
                />
                <Dropdown 
                  :options="[
                    { label: 'All Locations', value: 'all' },
                    { label: 'Remote', value: 'remote' },
                    { label: 'San Francisco', value: 'sf' },
                    { label: 'New York', value: 'ny' }
                  ]"
                  optionLabel="label"
                  placeholder="Location"
                  class="min-w-[150px]"
                />
                <Button icon="pi pi-filter" severity="secondary" outlined />
              </div>
            </div>
            
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div class="flex items-center gap-4">
                <span class="text-sm text-surface-500 dark:text-surface-400">247 members found</span>
                <div class="flex items-center gap-2">
                  <span class="text-sm text-surface-500 dark:text-surface-400">Active filters:</span>
                  <Tag label="Engineering" severity="info" removable />
                  <Tag label="San Francisco" severity="success" removable />
                </div>
              </div>
              
              <div class="flex items-center gap-2">
                <Button icon="pi pi-download" severity="secondary" text size="small" />
                <Button icon="pi pi-th-large" severity="secondary" outlined size="small" />
                <Button icon="pi pi-list" severity="secondary" text size="small" />
              </div>
            </div>
          </div>
        </template>
      </Card>
    </div>

    <!-- 11. With Actions -->
    <div class="space-y-4">
      <h2 class="text-xl font-semibold text-surface-900 dark:text-surface-0 mb-6">
        With Actions
      </h2>
      
      <Card class="shadow-lg">
        <template #content>
          <div class="p-6 space-y-4">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 class="text-2xl font-bold text-surface-900 dark:text-surface-0 mb-2">
                  Analytics Dashboard
                </h1>
                <p class="text-surface-600 dark:text-surface-400 mb-3">
                  Track your application's performance and user engagement
                </p>
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span class="text-sm text-surface-500 dark:text-surface-400">All systems operational</span>
                  <span class="text-sm text-surface-500 dark:text-surface-400">•</span>
                  <span class="text-sm text-surface-500 dark:text-surface-400">Last updated: 2 min ago</span>
                </div>
              </div>
              
              <div class="flex items-center gap-2">
                <Button icon="pi pi-refresh" severity="secondary" outlined />
                <Button icon="pi pi-cog" severity="secondary" text />
                <Button label="Export Report" icon="pi pi-download" severity="secondary" />
                <Button label="Share" icon="pi pi-share-alt" />
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div class="text-center p-4 border border-surface-200 dark:border-surface-700 rounded-lg">
                <div class="text-2xl font-bold text-primary-500 mb-1">24.5K</div>
                <div class="text-sm text-surface-500 dark:text-surface-400">Total Users</div>
                <div class="text-xs text-green-500 mt-1">↑ 12%</div>
              </div>
              <div class="text-center p-4 border border-surface-200 dark:border-surface-700 rounded-lg">
                <div class="text-2xl font-bold text-green-500 mb-1">1.2M</div>
                <div class="text-sm text-surface-500 dark:text-surface-400">Page Views</div>
                <div class="text-xs text-green-500 mt-1">↑ 8%</div>
              </div>
              <div class="text-center p-4 border border-surface-200 dark:border-surface-700 rounded-lg">
                <div class="text-2xl font-bold text-orange-500 mb-1">4.2%</div>
                <div class="text-sm text-surface-500 dark:text-surface-400">Bounce Rate</div>
                <div class="text-xs text-red-500 mt-1">↓ 2%</div>
              </div>
              <div class="text-center p-4 border border-surface-200 dark:border-surface-700 rounded-lg">
                <div class="text-2xl font-bold text-blue-500 mb-1">2:45</div>
                <div class="text-sm text-surface-500 dark:text-surface-400">Avg. Session</div>
                <div class="text-xs text-green-500 mt-1">↑ 15%</div>
              </div>
            </div>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>