<script setup lang="ts">
useSeoMeta({
  title: 'Card Headers - UI Blocks',
  description: 'Collection of card header UI blocks based on PrimeBlocks examples.',
});

const dropdownItems = ref([
  { label: 'Settings', icon: 'pi pi-cog' },
  { label: 'Export', icon: 'pi pi-download' },
  { label: 'Archive', icon: 'pi pi-archive' },
]);

const iconDropdownItems = ref([
  { label: 'View', icon: 'pi pi-eye' },
  { label: 'Edit', icon: 'pi pi-pencil' },
  { label: 'Share', icon: 'pi pi-share-alt' },
  { separator: true },
  { label: 'Delete', icon: 'pi pi-trash', severity: 'danger' },
]);

const frameworkOptions = ref([
  { label: 'Vue', value: 'vue' },
  { label: 'React', value: 'react' },
  { label: 'Angular', value: 'angular' },
]);

const selectedFramework = ref('vue');
</script>

<template>
  <div class="p-6 space-y-8">
    <div class="space-y-4">
      <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0">
        Card Headers
      </h1>
      <p class="text-surface-600 dark:text-surface-300">
        Collection of card header UI blocks based on PrimeBlocks examples
      </p>
    </div>

    <!-- 1. Title with Subtitle -->
    <div class="space-y-4">
      <h2 class="text-xl font-semibold text-surface-900 dark:text-surface-0 mb-6">
        Title with Subtitle
      </h2>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card class="shadow-lg">
          <template #header>
            <div class="p-6 pb-0">
              <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-0 mb-2">
                Recent Activity
              </h3>
              <p class="text-surface-600 dark:text-surface-400 text-sm">
                Keep track of your latest actions and updates
              </p>
            </div>
          </template>
          <template #content>
            <div class="px-6 pb-6">
              <div class="space-y-4">
                <div class="flex items-center gap-3 p-3 rounded-lg bg-surface-50 dark:bg-surface-800">
                  <div class="w-2 h-2 bg-green-500 rounded-full" />
                  <span class="text-sm flex-1">Task completed successfully</span>
                  <span class="text-xs text-surface-500">2m ago</span>
                </div>
                <div class="flex items-center gap-3 p-3 rounded-lg bg-surface-50 dark:bg-surface-800">
                  <div class="w-2 h-2 bg-blue-500 rounded-full" />
                  <span class="text-sm flex-1">New comment added</span>
                  <span class="text-xs text-surface-500">15m ago</span>
                </div>
                <div class="flex items-center gap-3 p-3 rounded-lg bg-surface-50 dark:bg-surface-800">
                  <div class="w-2 h-2 bg-orange-500 rounded-full" />
                  <span class="text-sm flex-1">File uploaded to project</span>
                  <span class="text-xs text-surface-500">1h ago</span>
                </div>
              </div>
            </div>
          </template>
        </Card>

        <Card class="shadow-lg">
          <template #header>
            <div class="p-6 pb-0">
              <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-0 mb-2">
                Project Statistics
              </h3>
              <p class="text-surface-600 dark:text-surface-400 text-sm">
                Overview of your project's key performance metrics
              </p>
            </div>
          </template>
          <template #content>
            <div class="px-6 pb-6">
              <div class="grid grid-cols-3 gap-4">
                <div class="text-center">
                  <div class="text-2xl font-bold text-primary-500 mb-1">
                    24
                  </div>
                  <div class="text-sm text-surface-500 dark:text-surface-400">
                    Tasks
                  </div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-green-500 mb-1">
                    87%
                  </div>
                  <div class="text-sm text-surface-500 dark:text-surface-400">
                    Complete
                  </div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-orange-500 mb-1">
                    3
                  </div>
                  <div class="text-sm text-surface-500 dark:text-surface-400">
                    Issues
                  </div>
                </div>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </div>

    <!-- 2. Dropdown, Icon and Subtitle -->
    <div class="space-y-4">
      <h2 class="text-xl font-semibold text-surface-900 dark:text-surface-0 mb-6">
        Dropdown, Icon and Subtitle
      </h2>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card class="shadow-lg">
          <template #header>
            <div class="p-6 pb-0 flex justify-between items-start">
              <div class="flex items-start gap-3">
                <div class="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/20">
                  <Icon name="lucide:bar-chart-3" class="text-primary-500" size="20" />
                </div>
                <div>
                  <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-0 mb-1">
                    Analytics Dashboard
                  </h3>
                  <p class="text-surface-600 dark:text-surface-400 text-sm">
                    Real-time performance insights
                  </p>
                </div>
              </div>
              <Button icon="pi pi-ellipsis-v" severity="secondary" text @click="(event) => $refs.menu1.toggle(event)" />
              <Menu ref="menu1" :model="iconDropdownItems" popup />
            </div>
          </template>
          <template #content>
            <div class="px-6 pb-6">
              <div class="grid grid-cols-2 gap-4">
                <div class="text-center p-4 rounded-lg bg-green-50 dark:bg-green-900/10">
                  <div class="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                    $12.4K
                  </div>
                  <div class="text-sm text-surface-600 dark:text-surface-400">
                    Revenue
                  </div>
                </div>
                <div class="text-center p-4 rounded-lg bg-blue-50 dark:bg-blue-900/10">
                  <div class="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                    248
                  </div>
                  <div class="text-sm text-surface-600 dark:text-surface-400">
                    Visitors
                  </div>
                </div>
              </div>
            </div>
          </template>
        </Card>

        <Card class="shadow-lg">
          <template #header>
            <div class="p-6 pb-0 flex justify-between items-start">
              <div class="flex items-start gap-3">
                <div class="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/20">
                  <Icon name="lucide:users" class="text-orange-500" size="20" />
                </div>
                <div>
                  <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-0 mb-1">
                    Team Management
                  </h3>
                  <p class="text-surface-600 dark:text-surface-400 text-sm">
                    Manage team members and roles
                  </p>
                </div>
              </div>
              <Dropdown
                v-model="selectedFramework"
                :options="frameworkOptions"
                option-label="label"
                option-value="value"
                placeholder="Framework"
                class="min-w-[140px]"
              />
            </div>
          </template>
          <template #content>
            <div class="px-6 pb-6">
              <div class="space-y-3">
                <div class="flex items-center gap-3 p-3 rounded-lg border border-surface-200 dark:border-surface-700">
                  <Avatar label="JD" class="bg-blue-500" size="small" />
                  <div class="flex-1">
                    <div class="font-medium text-surface-900 dark:text-surface-0">
                      John Doe
                    </div>
                    <div class="text-sm text-surface-500 dark:text-surface-400">
                      Lead Developer
                    </div>
                  </div>
                  <Tag value="Active" severity="success" />
                </div>
                <div class="flex items-center gap-3 p-3 rounded-lg border border-surface-200 dark:border-surface-700">
                  <Avatar label="JS" class="bg-purple-500" size="small" />
                  <div class="flex-1">
                    <div class="font-medium text-surface-900 dark:text-surface-0">
                      Jane Smith
                    </div>
                    <div class="text-sm text-surface-500 dark:text-surface-400">
                      UI Designer
                    </div>
                  </div>
                  <Tag value="Busy" severity="warning" />
                </div>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </div>

    <!-- 4. With Action -->
    <div class="space-y-4">
      <h2 class="text-xl font-semibold text-surface-900 dark:text-surface-0 mb-6">
        With Action
      </h2>

      <div class="space-y-6">
        <Card class="shadow-lg">
          <template #header>
            <div class="p-6 pb-0 flex justify-between items-center">
              <div>
                <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-0 mb-2">
                  Project Dashboard
                </h3>
                <div class="flex items-center gap-2">
                  <Tag value="Active" severity="success" />
                  <span class="text-sm text-surface-500 dark:text-surface-400">Last updated 2 hours ago</span>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <Button label="Export" icon="pi pi-download" severity="secondary" />
                <Button label="Settings" icon="pi pi-cog" />
              </div>
            </div>
          </template>
          <template #content>
            <div class="px-6 pb-6">
              <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div class="text-center p-4 bg-surface-50 dark:bg-surface-800 rounded-lg">
                  <div class="text-2xl font-bold text-primary-500 mb-1">
                    24
                  </div>
                  <div class="text-sm text-surface-500 dark:text-surface-400">
                    Total Tasks
                  </div>
                </div>
                <div class="text-center p-4 bg-surface-50 dark:bg-surface-800 rounded-lg">
                  <div class="text-2xl font-bold text-green-500 mb-1">
                    18
                  </div>
                  <div class="text-sm text-surface-500 dark:text-surface-400">
                    Completed
                  </div>
                </div>
                <div class="text-center p-4 bg-surface-50 dark:bg-surface-800 rounded-lg">
                  <div class="text-2xl font-bold text-orange-500 mb-1">
                    4
                  </div>
                  <div class="text-sm text-surface-500 dark:text-surface-400">
                    In Progress
                  </div>
                </div>
                <div class="text-center p-4 bg-surface-50 dark:bg-surface-800 rounded-lg">
                  <div class="text-2xl font-bold text-red-500 mb-1">
                    2
                  </div>
                  <div class="text-sm text-surface-500 dark:text-surface-400">
                    Overdue
                  </div>
                </div>
              </div>
              <ProgressBar :value="75" class="mb-2" />
              <div class="text-sm text-surface-500 dark:text-surface-400 text-center">
                75% Complete
              </div>
            </div>
          </template>
        </Card>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card class="shadow-lg">
            <template #header>
              <div class="p-6 pb-0 flex justify-between items-center">
                <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-0">
                  Quick Actions
                </h3>
                <Button icon="pi pi-plus" label="Add" size="small" />
              </div>
            </template>
            <template #content>
              <div class="px-6 pb-6">
                <div class="grid grid-cols-2 gap-3">
                  <Button label="Create Task" icon="pi pi-plus" severity="secondary" outlined />
                  <Button label="View Reports" icon="pi pi-chart-bar" severity="secondary" outlined />
                  <Button label="Team Chat" icon="pi pi-comments" severity="secondary" outlined />
                  <Button label="Settings" icon="pi pi-cog" severity="secondary" outlined />
                </div>
              </div>
            </template>
          </Card>

          <Card class="shadow-lg">
            <template #header>
              <div class="p-6 pb-0 flex justify-between items-center">
                <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-0">
                  Recent Files
                </h3>
                <Button label="View All" text />
              </div>
            </template>
            <template #content>
              <div class="px-6 pb-6">
                <div class="space-y-3">
                  <div class="flex items-center gap-3 p-2 rounded-lg hover:bg-surface-50 dark:hover:bg-surface-800">
                    <Icon name="lucide:file-text" class="text-blue-500" />
                    <div class="flex-1">
                      <div class="font-medium text-sm">
                        Project Requirements.pdf
                      </div>
                      <div class="text-xs text-surface-500 dark:text-surface-400">
                        2 hours ago
                      </div>
                    </div>
                    <Button icon="pi pi-download" severity="secondary" text size="small" />
                  </div>
                  <div class="flex items-center gap-3 p-2 rounded-lg hover:bg-surface-50 dark:hover:bg-surface-800">
                    <Icon name="lucide:image" class="text-green-500" />
                    <div class="flex-1">
                      <div class="font-medium text-sm">
                        Design Mockups.png
                      </div>
                      <div class="text-xs text-surface-500 dark:text-surface-400">
                        5 hours ago
                      </div>
                    </div>
                    <Button icon="pi pi-download" severity="secondary" text size="small" />
                  </div>
                </div>
              </div>
            </template>
          </Card>
        </div>
      </div>
    </div>

    <!-- 6. With Dropdown -->
    <div class="space-y-4">
      <h2 class="text-xl font-semibold text-surface-900 dark:text-surface-0 mb-6">
        With Dropdown
      </h2>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card class="shadow-lg">
          <template #header>
            <div class="p-6 pb-0 flex justify-between items-center">
              <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-0">
                Sales Overview
              </h3>
              <Button icon="pi pi-ellipsis-v" severity="secondary" text @click="(event) => $refs.menu2.toggle(event)" />
              <Menu ref="menu2" :model="dropdownItems" popup />
            </div>
          </template>
          <template #content>
            <div class="px-6 pb-6">
              <div class="grid grid-cols-2 gap-4 mb-4">
                <div class="text-center">
                  <div class="text-2xl font-bold text-primary-500 mb-1">
                    $24.5K
                  </div>
                  <div class="text-sm text-surface-500 dark:text-surface-400">
                    This Month
                  </div>
                  <div class="text-xs text-green-500 mt-1">
                    ↑ 12%
                  </div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-surface-700 dark:text-surface-300 mb-1">
                    1,247
                  </div>
                  <div class="text-sm text-surface-500 dark:text-surface-400">
                    Orders
                  </div>
                  <div class="text-xs text-green-500 mt-1">
                    ↑ 8%
                  </div>
                </div>
              </div>
              <div class="h-2 bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden">
                <div class="h-full bg-gradient-to-r from-primary-500 to-primary-600" style="width: 68%" />
              </div>
              <div class="text-center text-sm text-surface-500 dark:text-surface-400 mt-2">
                68% of monthly goal
              </div>
            </div>
          </template>
        </Card>

        <Card class="shadow-lg">
          <template #header>
            <div class="p-6 pb-0 flex justify-between items-center">
              <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-0">
                Performance
              </h3>
              <Dropdown
                :options="[
                  { label: 'Last 7 days', value: '7d' },
                  { label: 'Last 30 days', value: '30d' },
                  { label: 'Last 90 days', value: '90d' },
                ]"
                option-label="label"
                placeholder="Period"
                class="min-w-[120px]"
              />
            </div>
          </template>
          <template #content>
            <div class="px-6 pb-6">
              <div class="space-y-4">
                <div class="flex justify-between items-center">
                  <span class="text-surface-700 dark:text-surface-300">Page Views</span>
                  <div class="text-right">
                    <div class="font-semibold">
                      12,450
                    </div>
                    <div class="text-xs text-green-500">
                      +5.2%
                    </div>
                  </div>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-surface-700 dark:text-surface-300">Unique Visitors</span>
                  <div class="text-right">
                    <div class="font-semibold">
                      3,240
                    </div>
                    <div class="text-xs text-green-500">
                      +12.1%
                    </div>
                  </div>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-surface-700 dark:text-surface-300">Bounce Rate</span>
                  <div class="text-right">
                    <div class="font-semibold">
                      24.5%
                    </div>
                    <div class="text-xs text-red-500">
                      -2.3%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </div>

    <!-- 7. With Subtitle and Action -->
    <div class="space-y-4">
      <h2 class="text-xl font-semibold text-surface-900 dark:text-surface-0 mb-6">
        With Subtitle and Action
      </h2>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card class="shadow-lg">
          <template #header>
            <div class="p-6 pb-0 flex justify-between items-start">
              <div>
                <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-0 mb-2">
                  Project Timeline
                </h3>
                <p class="text-surface-600 dark:text-surface-400 text-sm">
                  Track milestones and upcoming deadlines
                </p>
              </div>
              <Button label="Add Task" icon="pi pi-plus" size="small" />
            </div>
          </template>
          <template #content>
            <div class="px-6 pb-6">
              <div class="space-y-4">
                <div class="flex items-center gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-900/10">
                  <div class="w-3 h-3 bg-green-500 rounded-full" />
                  <div class="flex-1">
                    <div class="font-medium text-sm">
                      Design Phase
                    </div>
                    <div class="text-xs text-surface-500 dark:text-surface-400">
                      Completed on Dec 10
                    </div>
                  </div>
                  <Tag value="Done" severity="success" />
                </div>
                <div class="flex items-center gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/10">
                  <div class="w-3 h-3 bg-blue-500 rounded-full" />
                  <div class="flex-1">
                    <div class="font-medium text-sm">
                      Development
                    </div>
                    <div class="text-xs text-surface-500 dark:text-surface-400">
                      In progress
                    </div>
                  </div>
                  <Tag value="Active" severity="info" />
                </div>
                <div class="flex items-center gap-3 p-3 rounded-lg bg-surface-50 dark:bg-surface-800">
                  <div class="w-3 h-3 bg-surface-400 rounded-full" />
                  <div class="flex-1">
                    <div class="font-medium text-sm">
                      Testing
                    </div>
                    <div class="text-xs text-surface-500 dark:text-surface-400">
                      Starts Dec 20
                    </div>
                  </div>
                  <Tag value="Pending" severity="secondary" />
                </div>
              </div>
            </div>
          </template>
        </Card>

        <Card class="shadow-lg">
          <template #header>
            <div class="p-6 pb-0 flex justify-between items-start">
              <div>
                <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-0 mb-2">
                  Resource Usage
                </h3>
                <p class="text-surface-600 dark:text-surface-400 text-sm">
                  Monitor system resources and performance
                </p>
              </div>
              <div class="flex items-center gap-2">
                <Button icon="pi pi-refresh" severity="secondary" text size="small" />
                <Button label="Details" severity="secondary" outlined size="small" />
              </div>
            </div>
          </template>
          <template #content>
            <div class="px-6 pb-6">
              <div class="space-y-4">
                <div>
                  <div class="flex justify-between items-center mb-2">
                    <span class="text-sm font-medium">CPU Usage</span>
                    <span class="text-sm text-surface-500 dark:text-surface-400">67%</span>
                  </div>
                  <ProgressBar :value="67" class="h-2" />
                </div>
                <div>
                  <div class="flex justify-between items-center mb-2">
                    <span class="text-sm font-medium">Memory</span>
                    <span class="text-sm text-surface-500 dark:text-surface-400">4.2GB / 8GB</span>
                  </div>
                  <ProgressBar :value="52" class="h-2" />
                </div>
                <div>
                  <div class="flex justify-between items-center mb-2">
                    <span class="text-sm font-medium">Storage</span>
                    <span class="text-sm text-surface-500 dark:text-surface-400">156GB / 500GB</span>
                  </div>
                  <ProgressBar :value="31" class="h-2" />
                </div>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>
