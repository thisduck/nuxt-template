<script setup lang="ts">
useSeoMeta({
  title: 'Section Headers - UI Blocks',
  description: 'Collection of section header UI blocks based on PrimeBlocks examples.',
});

const searchValue = ref('');
const activeTab = ref(0);

const tabItems = ref([
  { label: 'Dashboard', value: '/dashboard' },
  { label: 'Customers', value: '/customers' },
  { label: 'Projects', value: '/projects' },
  { label: 'Messages', value: '/messages' },
  { label: 'Settings', value: '/settings' }
]);

const pillItems = ref([
  { label: 'All', value: 'all', active: true },
  { label: 'Active', value: 'active', active: false },
  { label: 'Completed', value: 'completed', active: false },
  { label: 'Archived', value: 'archived', active: false }
]);

const dropdownItems = ref([
  { label: 'Edit', icon: 'pi pi-pencil' },
  { label: 'Export', icon: 'pi pi-download' },
  { label: 'Settings', icon: 'pi pi-cog' },
  { separator: true },
  { label: 'Delete', icon: 'pi pi-trash', severity: 'danger' }
]);

function selectPill(index: number) {
  pillItems.value.forEach((item, i) => {
    item.active = i === index;
  });
}
</script>

<template>
  <div class="p-6 space-y-8">
    <div class="space-y-4">
      <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0">
        Section Headers
      </h1>
      <p class="text-surface-600 dark:text-surface-300">
        Collection of section header UI blocks based on PrimeBlocks examples
      </p>
    </div>

    <!-- 1. Border, Badge and Actions -->
    <div class="space-y-4">
      <h2 class="text-xl font-semibold text-surface-900 dark:text-surface-0 mb-6">
        Border, Badge and Actions
      </h2>
      
      <div class="space-y-6">
        <div class="p-6 border border-surface-200 dark:border-surface-700 rounded-lg bg-surface-0 dark:bg-surface-900">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div class="flex items-center gap-3">
              <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-0">
                Team Performance
              </h3>
              <Badge value="12 Active" severity="success" />
              <Badge value="New" severity="info" />
            </div>
            
            <div class="flex items-center gap-2">
              <Button icon="pi pi-refresh" severity="secondary" outlined size="small" />
              <Button icon="pi pi-download" severity="secondary" outlined size="small" />
              <Button label="View All" />
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="text-center p-4 bg-surface-50 dark:bg-surface-800 rounded-lg">
              <div class="text-2xl font-bold text-primary-500 mb-1">94%</div>
              <div class="text-sm text-surface-500 dark:text-surface-400">Completion Rate</div>
            </div>
            <div class="text-center p-4 bg-surface-50 dark:bg-surface-800 rounded-lg">
              <div class="text-2xl font-bold text-green-500 mb-1">127</div>
              <div class="text-sm text-surface-500 dark:text-surface-400">Tasks Done</div>
            </div>
            <div class="text-center p-4 bg-surface-50 dark:bg-surface-800 rounded-lg">
              <div class="text-2xl font-bold text-orange-500 mb-1">8</div>
              <div class="text-sm text-surface-500 dark:text-surface-400">In Progress</div>
            </div>
          </div>
        </div>
        
        <div class="p-6 border border-surface-200 dark:border-surface-700 rounded-lg bg-surface-0 dark:bg-surface-900">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div class="flex items-center gap-3">
              <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-0">
                Project Status
              </h3>
              <Badge value="Critical" severity="danger" />
              <Badge value="3 Issues" severity="warning" />
            </div>
            
            <div class="flex items-center gap-2">
              <Button icon="pi pi-bell" severity="secondary" text size="small" />
              <Button icon="pi pi-ellipsis-v" severity="secondary" text @click="(event) => $refs.menu1.toggle(event)" />
              <Menu ref="menu1" :model="dropdownItems" popup />
            </div>
          </div>
          
          <p class="text-surface-600 dark:text-surface-400 mb-4">
            Monitor project progress and address critical issues that require immediate attention.
          </p>
          
          <div class="flex items-center gap-4">
            <ProgressBar :value="67" class="flex-1" />
            <span class="text-sm font-medium">67% Complete</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 2. Icon And Actions -->
    <div class="space-y-4">
      <h2 class="text-xl font-semibold text-surface-900 dark:text-surface-0 mb-6">
        Icon And Actions
      </h2>
      
      <div class="space-y-6">
        <div class="p-6 bg-surface-0 dark:bg-surface-900 rounded-lg shadow-sm">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div class="flex items-center gap-3">
              <div class="p-2 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
                <Icon name="lucide:users" class="text-primary-500" size="24" />
              </div>
              <div>
                <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-0">
                  Team Members
                </h3>
                <p class="text-sm text-surface-500 dark:text-surface-400">Manage your team and permissions</p>
              </div>
            </div>
            
            <div class="flex items-center gap-2">
              <Button label="Invite" icon="pi pi-user-plus" severity="secondary" outlined />
              <Button label="Settings" icon="pi pi-cog" />
            </div>
          </div>
          
          <div class="space-y-3">
            <div class="flex items-center gap-3 p-3 rounded-lg bg-surface-50 dark:bg-surface-800">
              <Avatar label="JD" class="bg-blue-500" />
              <div class="flex-1">
                <div class="font-medium">John Doe</div>
                <div class="text-sm text-surface-500 dark:text-surface-400">Administrator</div>
              </div>
              <Tag value="Online" severity="success" />
            </div>
            <div class="flex items-center gap-3 p-3 rounded-lg bg-surface-50 dark:bg-surface-800">
              <Avatar label="JS" class="bg-purple-500" />
              <div class="flex-1">
                <div class="font-medium">Jane Smith</div>
                <div class="text-sm text-surface-500 dark:text-surface-400">Developer</div>
              </div>
              <Tag value="Away" severity="warning" />
            </div>
          </div>
        </div>
        
        <div class="p-6 bg-surface-0 dark:bg-surface-900 rounded-lg shadow-sm">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div class="flex items-center gap-3">
              <div class="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <Icon name="lucide:bar-chart-3" class="text-green-500" size="24" />
              </div>
              <div>
                <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-0">
                  Analytics Overview
                </h3>
                <p class="text-sm text-surface-500 dark:text-surface-400">Key performance indicators</p>
              </div>
            </div>
            
            <div class="flex items-center gap-2">
              <Button icon="pi pi-calendar" severity="secondary" text />
              <Button icon="pi pi-download" severity="secondary" outlined />
              <Button label="Generate Report" />
            </div>
          </div>
          
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="text-center">
              <div class="text-2xl font-bold text-primary-500">24.5K</div>
              <div class="text-sm text-surface-500 dark:text-surface-400">Visitors</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-green-500">$12.4K</div>
              <div class="text-sm text-surface-500 dark:text-surface-400">Revenue</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-orange-500">3.2%</div>
              <div class="text-sm text-surface-500 dark:text-surface-400">Conversion</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-blue-500">2:45</div>
              <div class="text-sm text-surface-500 dark:text-surface-400">Avg. Session</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 3. Inline Tabs -->
    <div class="space-y-4">
      <h2 class="text-xl font-semibold text-surface-900 dark:text-surface-0 mb-6">
        Inline Tabs
      </h2>
      
      <div class="p-6 bg-surface-0 dark:bg-surface-900 rounded-lg shadow-sm">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-0 mb-2">
              Project Dashboard
            </h3>
            <p class="text-surface-600 dark:text-surface-400">
              Comprehensive overview of your project's progress and metrics
            </p>
          </div>
          
          <div class="flex items-center gap-2">
            <Button icon="pi pi-refresh" severity="secondary" outlined size="small" />
            <Button label="Export" icon="pi pi-download" severity="secondary" />
          </div>
        </div>
        
        <TabView v-model:activeIndex="activeTab" class="mb-4">
          <TabPanel v-for="tab in tabItems" :key="tab.value" :header="tab.label">
            <div class="py-4">
              <div v-if="tab.value === '/dashboard'" class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div class="text-center p-4 bg-surface-50 dark:bg-surface-800 rounded-lg">
                    <div class="text-xl font-bold text-primary-500">42</div>
                    <div class="text-sm text-surface-500 dark:text-surface-400">Active Tasks</div>
                  </div>
                  <div class="text-center p-4 bg-surface-50 dark:bg-surface-800 rounded-lg">
                    <div class="text-xl font-bold text-green-500">86%</div>
                    <div class="text-sm text-surface-500 dark:text-surface-400">Completion</div>
                  </div>
                  <div class="text-center p-4 bg-surface-50 dark:bg-surface-800 rounded-lg">
                    <div class="text-xl font-bold text-orange-500">12</div>
                    <div class="text-sm text-surface-500 dark:text-surface-400">Team Members</div>
                  </div>
                </div>
              </div>
              <div v-else class="text-center py-8">
                <p class="text-surface-500 dark:text-surface-400">Content for {{ tab.label }} tab</p>
              </div>
            </div>
          </TabPanel>
        </TabView>
      </div>
    </div>

    <!-- 4. Pills and Actions -->
    <div class="space-y-4">
      <h2 class="text-xl font-semibold text-surface-900 dark:text-surface-0 mb-6">
        Pills and Actions
      </h2>
      
      <div class="p-6 bg-surface-0 dark:bg-surface-900 rounded-lg shadow-sm">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-0 mb-2">
              Task Management
            </h3>
            <p class="text-surface-600 dark:text-surface-400">
              Organize and track your tasks with different status filters
            </p>
          </div>
          
          <div class="flex items-center gap-2">
            <Button label="New Task" icon="pi pi-plus" />
            <Button icon="pi pi-cog" severity="secondary" text />
          </div>
        </div>
        
        <div class="flex flex-wrap items-center gap-2 mb-6">
          <button
            v-for="(pill, index) in pillItems"
            :key="pill.value"
            @click="selectPill(index)"
            :class="[
              'px-4 py-2 rounded-full text-sm font-medium transition-colors',
              pill.active
                ? 'bg-primary-500 text-white'
                : 'bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-700'
            ]"
          >
            {{ pill.label }}
          </button>
        </div>
        
        <div class="space-y-3">
          <div class="flex items-center gap-3 p-3 rounded-lg border border-surface-200 dark:border-surface-700">
            <div class="w-2 h-2 bg-green-500 rounded-full"></div>
            <div class="flex-1">
              <div class="font-medium">Complete project documentation</div>
              <div class="text-sm text-surface-500 dark:text-surface-400">Due: Tomorrow</div>
            </div>
            <Tag value="High Priority" severity="danger" />
          </div>
          <div class="flex items-center gap-3 p-3 rounded-lg border border-surface-200 dark:border-surface-700">
            <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div class="flex-1">
              <div class="font-medium">Review pull requests</div>
              <div class="text-sm text-surface-500 dark:text-surface-400">Due: This week</div>
            </div>
            <Tag value="Medium" severity="warning" />
          </div>
          <div class="flex items-center gap-3 p-3 rounded-lg border border-surface-200 dark:border-surface-700">
            <div class="w-2 h-2 bg-orange-500 rounded-full"></div>
            <div class="flex-1">
              <div class="font-medium">Update team calendar</div>
              <div class="text-sm text-surface-500 dark:text-surface-400">Due: Next week</div>
            </div>
            <Tag value="Low" severity="success" />
          </div>
        </div>
      </div>
    </div>

    <!-- 5. Simple -->
    <div class="space-y-4">
      <h2 class="text-xl font-semibold text-surface-900 dark:text-surface-0 mb-6">
        Simple
      </h2>
      
      <div class="space-y-6">
        <div class="pb-4 border-b border-surface-200 dark:border-surface-700">
          <h3 class="text-2xl font-bold text-surface-900 dark:text-surface-0 mb-2">
            Recent Activity
          </h3>
          <p class="text-surface-600 dark:text-surface-400">
            Latest updates and changes in your workspace
          </p>
        </div>
        
        <div class="space-y-4">
          <div class="flex items-center gap-3 p-3 rounded-lg bg-surface-50 dark:bg-surface-800">
            <div class="w-2 h-2 bg-green-500 rounded-full"></div>
            <div class="flex-1">
              <span class="font-medium">Task completed:</span> Website redesign mockups
              <div class="text-sm text-surface-500 dark:text-surface-400">2 hours ago</div>
            </div>
          </div>
          <div class="flex items-center gap-3 p-3 rounded-lg bg-surface-50 dark:bg-surface-800">
            <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div class="flex-1">
              <span class="font-medium">New comment:</span> Project requirements updated
              <div class="text-sm text-surface-500 dark:text-surface-400">5 hours ago</div>
            </div>
          </div>
        </div>
        
        <div class="pb-4 border-b border-surface-200 dark:border-surface-700">
          <h3 class="text-2xl font-bold text-surface-900 dark:text-surface-0">
            Project Overview
          </h3>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="text-center p-4">
            <div class="text-3xl font-bold text-primary-500 mb-2">24</div>
            <div class="text-surface-600 dark:text-surface-400">Active Projects</div>
          </div>
          <div class="text-center p-4">
            <div class="text-3xl font-bold text-green-500 mb-2">156</div>
            <div class="text-surface-600 dark:text-surface-400">Completed Tasks</div>
          </div>
          <div class="text-center p-4">
            <div class="text-3xl font-bold text-orange-500 mb-2">12</div>
            <div class="text-surface-600 dark:text-surface-400">Team Members</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 6. Subtitle and Search -->
    <div class="space-y-4">
      <h2 class="text-xl font-semibold text-surface-900 dark:text-surface-0 mb-6">
        Subtitle and Search
      </h2>
      
      <div class="p-6 bg-surface-0 dark:bg-surface-900 rounded-lg shadow-sm">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <h3 class="text-2xl font-bold text-surface-900 dark:text-surface-0 mb-2">
              Knowledge Base
            </h3>
            <p class="text-surface-600 dark:text-surface-400">
              Search through our comprehensive collection of articles and tutorials
            </p>
          </div>
          
          <div class="flex items-center gap-2 min-w-[300px]">
            <InputText 
              v-model="searchValue"
              placeholder="Search articles..." 
              class="flex-1"
            >
              <template #prefix>
                <Icon name="lucide:search" size="16" />
              </template>
            </InputText>
            <Button icon="pi pi-filter" severity="secondary" outlined />
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div class="p-4 border border-surface-200 dark:border-surface-700 rounded-lg hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors">
            <div class="flex items-start gap-3">
              <Icon name="lucide:book-open" class="text-primary-500 mt-1" />
              <div>
                <h4 class="font-medium text-surface-900 dark:text-surface-0 mb-1">Getting Started Guide</h4>
                <p class="text-sm text-surface-600 dark:text-surface-400">Learn the basics of our platform</p>
              </div>
            </div>
          </div>
          <div class="p-4 border border-surface-200 dark:border-surface-700 rounded-lg hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors">
            <div class="flex items-start gap-3">
              <Icon name="lucide:code" class="text-green-500 mt-1" />
              <div>
                <h4 class="font-medium text-surface-900 dark:text-surface-0 mb-1">API Documentation</h4>
                <p class="text-sm text-surface-600 dark:text-surface-400">Comprehensive API reference</p>
              </div>
            </div>
          </div>
          <div class="p-4 border border-surface-200 dark:border-surface-700 rounded-lg hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors">
            <div class="flex items-start gap-3">
              <Icon name="lucide:help-circle" class="text-orange-500 mt-1" />
              <div>
                <h4 class="font-medium text-surface-900 dark:text-surface-0 mb-1">FAQ</h4>
                <p class="text-sm text-surface-600 dark:text-surface-400">Frequently asked questions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 7. With Label -->
    <div class="space-y-4">
      <h2 class="text-xl font-semibold text-surface-900 dark:text-surface-0 mb-6">
        With Label
      </h2>
      
      <div class="space-y-6">
        <div class="p-6 bg-surface-0 dark:bg-surface-900 rounded-lg shadow-sm">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div class="flex items-center gap-3">
              <div class="px-3 py-1 bg-primary-100 dark:bg-primary-900/20 rounded-full">
                <span class="text-xs font-medium text-primary-700 dark:text-primary-300">DASHBOARD</span>
              </div>
              <div>
                <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-0">
                  System Status
                </h3>
                <p class="text-sm text-surface-600 dark:text-surface-400">Real-time monitoring</p>
              </div>
            </div>
            
            <div class="flex items-center gap-2">
              <Button icon="pi pi-refresh" severity="secondary" text />
              <Button label="View Logs" severity="secondary" outlined />
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/10 rounded-lg">
              <div class="w-3 h-3 bg-green-500 rounded-full"></div>
              <div>
                <div class="font-medium text-green-700 dark:text-green-300">API Server</div>
                <div class="text-sm text-green-600 dark:text-green-400">Operational</div>
              </div>
            </div>
            <div class="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/10 rounded-lg">
              <div class="w-3 h-3 bg-green-500 rounded-full"></div>
              <div>
                <div class="font-medium text-green-700 dark:text-green-300">Database</div>
                <div class="text-sm text-green-600 dark:text-green-400">Operational</div>
              </div>
            </div>
            <div class="flex items-center gap-3 p-4 bg-yellow-50 dark:bg-yellow-900/10 rounded-lg">
              <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div>
                <div class="font-medium text-yellow-700 dark:text-yellow-300">Cache</div>
                <div class="text-sm text-yellow-600 dark:text-yellow-400">Degraded</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="p-6 bg-surface-0 dark:bg-surface-900 rounded-lg shadow-sm">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div class="flex items-center gap-3">
              <div class="px-3 py-1 bg-purple-100 dark:bg-purple-900/20 rounded-full">
                <span class="text-xs font-medium text-purple-700 dark:text-purple-300">ANALYTICS</span>
              </div>
              <div>
                <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-0">
                  User Engagement
                </h3>
                <p class="text-sm text-surface-600 dark:text-surface-400">Last 30 days</p>
              </div>
            </div>
            
            <div class="flex items-center gap-2">
              <Button label="Generate Report" />
            </div>
          </div>
          
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="text-center">
              <div class="text-2xl font-bold text-surface-900 dark:text-surface-0">15.2K</div>
              <div class="text-sm text-surface-500 dark:text-surface-400">Active Users</div>
              <div class="text-xs text-green-500 mt-1">+12.5%</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-surface-900 dark:text-surface-0">2.4M</div>
              <div class="text-sm text-surface-500 dark:text-surface-400">Page Views</div>
              <div class="text-xs text-green-500 mt-1">+8.3%</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-surface-900 dark:text-surface-0">3:42</div>
              <div class="text-sm text-surface-500 dark:text-surface-400">Avg. Session</div>
              <div class="text-xs text-green-500 mt-1">+5.2%</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-surface-900 dark:text-surface-0">24.8%</div>
              <div class="text-sm text-surface-500 dark:text-surface-400">Bounce Rate</div>
              <div class="text-xs text-red-500 mt-1">-2.1%</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 8. With Tabs -->
    <div class="space-y-4">
      <h2 class="text-xl font-semibold text-surface-900 dark:text-surface-0 mb-6">
        With Tabs
      </h2>
      
      <div class="p-6 bg-surface-0 dark:bg-surface-900 rounded-lg shadow-sm">
        <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
          <div>
            <h3 class="text-2xl font-bold text-surface-900 dark:text-surface-0 mb-2">
              Account Settings
            </h3>
            <p class="text-surface-600 dark:text-surface-400">
              Manage your account preferences and security settings
            </p>
          </div>
          
          <div class="flex items-center gap-2">
            <Button label="Save Changes" />
            <Button icon="pi pi-cog" severity="secondary" text />
          </div>
        </div>
        
        <TabView>
          <TabPanel header="Profile">
            <div class="space-y-4">
              <div class="flex items-center gap-4 p-4 bg-surface-50 dark:bg-surface-800 rounded-lg">
                <Avatar image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face" size="large" shape="circle" />
                <div class="flex-1">
                  <h4 class="font-medium text-surface-900 dark:text-surface-0">John Anderson</h4>
                  <p class="text-sm text-surface-500 dark:text-surface-400">john@example.com</p>
                </div>
                <Button label="Change Photo" severity="secondary" outlined size="small" />
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium mb-2">First Name</label>
                  <InputText value="John" class="w-full" />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-2">Last Name</label>
                  <InputText value="Anderson" class="w-full" />
                </div>
              </div>
            </div>
          </TabPanel>
          
          <TabPanel header="Website">
            <div class="space-y-4">
              <p class="text-surface-600 dark:text-surface-400">Website and social media settings</p>
              <div>
                <label class="block text-sm font-medium mb-2">Website URL</label>
                <InputText placeholder="https://example.com" class="w-full" />
              </div>
              <div>
                <label class="block text-sm font-medium mb-2">Bio</label>
                <Textarea placeholder="Tell us about yourself..." rows="3" class="w-full" />
              </div>
            </div>
          </TabPanel>
          
          <TabPanel header="Privacy">
            <div class="space-y-4">
              <p class="text-surface-600 dark:text-surface-400">Control your privacy and data settings</p>
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <div>
                    <div class="font-medium">Profile Visibility</div>
                    <div class="text-sm text-surface-500 dark:text-surface-400">Make your profile visible to others</div>
                  </div>
                  <ToggleSwitch />
                </div>
                <div class="flex items-center justify-between">
                  <div>
                    <div class="font-medium">Email Notifications</div>
                    <div class="text-sm text-surface-500 dark:text-surface-400">Receive notifications via email</div>
                  </div>
                  <ToggleSwitch />
                </div>
              </div>
            </div>
          </TabPanel>
          
          <TabPanel header="Applications">
            <div class="space-y-4">
              <p class="text-surface-600 dark:text-surface-400">Manage connected applications</p>
              <div class="space-y-3">
                <div class="flex items-center justify-between p-3 border border-surface-200 dark:border-surface-700 rounded-lg">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                      <Icon name="lucide:github" class="text-blue-600 dark:text-blue-400" size="16" />
                    </div>
                    <div>
                      <div class="font-medium">GitHub</div>
                      <div class="text-sm text-surface-500 dark:text-surface-400">Connected</div>
                    </div>
                  </div>
                  <Button label="Disconnect" severity="secondary" outlined size="small" />
                </div>
                <div class="flex items-center justify-between p-3 border border-surface-200 dark:border-surface-700 rounded-lg">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                      <Icon name="lucide:mail" class="text-red-600 dark:text-red-400" size="16" />
                    </div>
                    <div>
                      <div class="font-medium">Google</div>
                      <div class="text-sm text-surface-500 dark:text-surface-400">Not connected</div>
                    </div>
                  </div>
                  <Button label="Connect" size="small" />
                </div>
              </div>
            </div>
          </TabPanel>
        </TabView>
      </div>
    </div>
  </div>
</template>