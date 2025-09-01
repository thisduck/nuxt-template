<script setup lang="ts">
useSeoMeta({
  title: 'Card Headers - UI Blocks',
  description: 'Collection of card header UI blocks with various layouts and elements.',
});

const dropdownItems = ref([
  { label: 'Edit', icon: 'pi pi-pencil', command: () => {} },
  { label: 'Share', icon: 'pi pi-share-alt', command: () => {} },
  { label: 'Delete', icon: 'pi pi-trash', command: () => {} },
]);

const actionDropdownItems = ref([
  { label: 'View Details', icon: 'pi pi-eye', command: () => {} },
  { label: 'Edit Project', icon: 'pi pi-pencil', command: () => {} },
  { label: 'Duplicate', icon: 'pi pi-copy', command: () => {} },
  { separator: true },
  { label: 'Archive', icon: 'pi pi-archive', command: () => {} },
  { label: 'Delete', icon: 'pi pi-trash', severity: 'danger', command: () => {} },
]);

function handleAction(action: string) {
  // Handle action
}

function handleShare() {
  // Handle share action
}

function handleEdit() {
  // Handle edit action
}

function handleSettings() {
  // Handle settings action
}
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <div class="p-6 bg-surface-0 dark:bg-surface-900 border-b border-surface-200 dark:border-surface-700">
      <div class="max-w-6xl mx-auto">
        <div class="flex items-center gap-4 mb-4">
          <Icon name="lucide:layout-template" size="32" class="text-primary-500" />
          <div>
            <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0 mb-2">
              Card Headers
            </h1>
            <p class="text-surface-600 dark:text-surface-300">
              Collection of card header UI blocks with various layouts, actions, and interactive elements.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="flex-1 overflow-auto">
      <div class="max-w-6xl mx-auto p-6 space-y-12">
        <!-- Title with Subtitle -->
        <section>
          <h2 class="text-2xl font-bold mb-6 text-surface-900 dark:text-surface-0">
            Title with Subtitle
          </h2>
          <p class="text-surface-600 dark:text-surface-400 mb-6">
            Simple and clean card headers with title and descriptive subtitle text.
          </p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <template #header>
                <div class="p-6 pb-0">
                  <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-0 mb-2">
                    Project Overview
                  </h3>
                  <p class="text-surface-500 dark:text-surface-400 text-sm">
                    Track your project's progress and key metrics
                  </p>
                </div>
              </template>
              <template #content>
                <div class="px-6 pb-6">
                  <div class="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div class="text-2xl font-bold text-primary-500">24</div>
                      <div class="text-sm text-surface-500 dark:text-surface-400">Tasks</div>
                    </div>
                    <div>
                      <div class="text-2xl font-bold text-green-500">87%</div>
                      <div class="text-sm text-surface-500 dark:text-surface-400">Complete</div>
                    </div>
                    <div>
                      <div class="text-2xl font-bold text-orange-500">3</div>
                      <div class="text-sm text-surface-500 dark:text-surface-400">Issues</div>
                    </div>
                  </div>
                </div>
              </template>
            </Card>

            <Card>
              <template #header>
                <div class="p-6 pb-0">
                  <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-0 mb-2">
                    Team Analytics
                  </h3>
                  <p class="text-surface-500 dark:text-surface-400 text-sm">
                    Monitor team performance and collaboration metrics
                  </p>
                </div>
              </template>
              <template #content>
                <div class="px-6 pb-6">
                  <div class="space-y-4">
                    <div class="flex justify-between items-center">
                      <span class="text-surface-700 dark:text-surface-300">Active Members</span>
                      <span class="font-semibold">12</span>
                    </div>
                    <div class="flex justify-between items-center">
                      <span class="text-surface-700 dark:text-surface-300">This Week</span>
                      <span class="font-semibold text-green-500">+2</span>
                    </div>
                    <div class="flex justify-between items-center">
                      <span class="text-surface-700 dark:text-surface-300">Productivity</span>
                      <span class="font-semibold">94%</span>
                    </div>
                  </div>
                </div>
              </template>
            </Card>
          </div>
        </section>

        <!-- With Dropdown -->
        <section>
          <h2 class="text-2xl font-bold mb-6 text-surface-900 dark:text-surface-0">
            With Dropdown
          </h2>
          <p class="text-surface-600 dark:text-surface-400 mb-6">
            Card headers featuring dropdown menus for additional actions and options.
          </p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <template #header>
                <div class="p-6 pb-0 flex justify-between items-start">
                  <div>
                    <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-0 mb-2">
                      Recent Activity
                    </h3>
                  </div>
                  <Button icon="pi pi-ellipsis-v" severity="secondary" text @click="(event) => $refs.menu1.toggle(event)" />
                  <Menu ref="menu1" :model="dropdownItems" popup />
                </div>
              </template>
              <template #content>
                <div class="px-6 pb-6">
                  <div class="space-y-3">
                    <div class="flex items-center gap-3">
                      <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span class="text-sm">Task completed by John</span>
                      <span class="text-xs text-surface-500 dark:text-surface-400 ml-auto">2m ago</span>
                    </div>
                    <div class="flex items-center gap-3">
                      <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span class="text-sm">New comment added</span>
                      <span class="text-xs text-surface-500 dark:text-surface-400 ml-auto">1h ago</span>
                    </div>
                    <div class="flex items-center gap-3">
                      <div class="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span class="text-sm">File uploaded</span>
                      <span class="text-xs text-surface-500 dark:text-surface-400 ml-auto">3h ago</span>
                    </div>
                  </div>
                </div>
              </template>
            </Card>

            <Card>
              <template #header>
                <div class="p-6 pb-0 flex justify-between items-start">
                  <div>
                    <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-0 mb-1">
                      Sales Report
                    </h3>
                    <p class="text-surface-500 dark:text-surface-400 text-sm">
                      Q4 2024 Performance
                    </p>
                  </div>
                  <Dropdown :options="[
                    { label: 'This Week', value: 'week' },
                    { label: 'This Month', value: 'month' },
                    { label: 'This Quarter', value: 'quarter' }
                  ]" optionLabel="label" placeholder="Period" class="text-sm" />
                </div>
              </template>
              <template #content>
                <div class="px-6 pb-6">
                  <div class="grid grid-cols-2 gap-6">
                    <div class="text-center">
                      <div class="text-3xl font-bold text-primary-500 mb-1">$24.5K</div>
                      <div class="text-sm text-surface-500 dark:text-surface-400">Revenue</div>
                      <div class="text-xs text-green-500 mt-1">↑ 12.5%</div>
                    </div>
                    <div class="text-center">
                      <div class="text-3xl font-bold text-surface-700 dark:text-surface-300 mb-1">156</div>
                      <div class="text-sm text-surface-500 dark:text-surface-400">Orders</div>
                      <div class="text-xs text-green-500 mt-1">↑ 8.2%</div>
                    </div>
                  </div>
                </div>
              </template>
            </Card>
          </div>
        </section>

        <!-- Card Header Title -->
        <section>
          <h2 class="text-2xl font-bold mb-6 text-surface-900 dark:text-surface-0">
            Card Header Title
          </h2>
          <p class="text-surface-600 dark:text-surface-400 mb-6">
            Minimal card headers with clean title styling and optional status indicators.
          </p>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <template #header>
                <div class="p-6 pb-0">
                  <h3 class="text-lg font-semibold text-surface-900 dark:text-surface-0">
                    Dashboard
                  </h3>
                </div>
              </template>
              <template #content>
                <div class="px-6 pb-6">
                  <p class="text-surface-600 dark:text-surface-400 text-sm mb-4">
                    View your key metrics and performance indicators.
                  </p>
                  <Button label="Open Dashboard" size="small" />
                </div>
              </template>
            </Card>

            <Card>
              <template #header>
                <div class="p-6 pb-0 flex items-center gap-2">
                  <h3 class="text-lg font-semibold text-surface-900 dark:text-surface-0">
                    Notifications
                  </h3>
                  <Badge value="3" severity="danger" />
                </div>
              </template>
              <template #content>
                <div class="px-6 pb-6">
                  <p class="text-surface-600 dark:text-surface-400 text-sm mb-4">
                    You have unread notifications waiting for your attention.
                  </p>
                  <Button label="View All" severity="secondary" size="small" />
                </div>
              </template>
            </Card>

            <Card>
              <template #header>
                <div class="p-6 pb-0 flex items-center gap-2">
                  <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                  <h3 class="text-lg font-semibold text-surface-900 dark:text-surface-0">
                    System Status
                  </h3>
                </div>
              </template>
              <template #content>
                <div class="px-6 pb-6">
                  <p class="text-surface-600 dark:text-surface-400 text-sm mb-4">
                    All systems are operational and running smoothly.
                  </p>
                  <Button label="View Details" text size="small" />
                </div>
              </template>
            </Card>
          </div>
        </section>

        <!-- With Action -->
        <section>
          <h2 class="text-2xl font-bold mb-6 text-surface-900 dark:text-surface-0">
            With Action
          </h2>
          <p class="text-surface-600 dark:text-surface-400 mb-6">
            Card headers with integrated action buttons and controls for immediate interaction.
          </p>
          
          <div class="space-y-6">
            <Card>
              <template #header>
                <div class="p-6 pb-0 flex justify-between items-start">
                  <div>
                    <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-0 mb-2">
                      Project: Website Redesign
                    </h3>
                    <div class="flex items-center gap-2">
                      <Tag value="In Progress" severity="info" />
                      <span class="text-sm text-surface-500 dark:text-surface-400">Due: Dec 15, 2024</span>
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <Button icon="pi pi-share-alt" severity="secondary" text @click="handleShare" />
                    <Button icon="pi pi-pencil" severity="secondary" text @click="handleEdit" />
                    <Button icon="pi pi-ellipsis-v" severity="secondary" text @click="(event) => $refs.actionMenu1.toggle(event)" />
                    <Menu ref="actionMenu1" :model="actionDropdownItems" popup />
                  </div>
                </div>
              </template>
              <template #content>
                <div class="px-6 pb-6">
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div class="text-center p-4 border border-surface-200 dark:border-surface-700 rounded-lg">
                      <div class="text-2xl font-bold text-blue-500 mb-1">12</div>
                      <div class="text-sm text-surface-500 dark:text-surface-400">Total Tasks</div>
                    </div>
                    <div class="text-center p-4 border border-surface-200 dark:border-surface-700 rounded-lg">
                      <div class="text-2xl font-bold text-green-500 mb-1">8</div>
                      <div class="text-sm text-surface-500 dark:text-surface-400">Completed</div>
                    </div>
                    <div class="text-center p-4 border border-surface-200 dark:border-surface-700 rounded-lg">
                      <div class="text-2xl font-bold text-orange-500 mb-1">4</div>
                      <div class="text-sm text-surface-500 dark:text-surface-400">Remaining</div>
                    </div>
                  </div>
                  <ProgressBar :value="67" class="mb-2" />
                  <div class="text-sm text-surface-500 dark:text-surface-400">67% Complete</div>
                </div>
              </template>
            </Card>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <template #header>
                  <div class="p-6 pb-0 flex justify-between items-start">
                    <div>
                      <h3 class="text-lg font-semibold text-surface-900 dark:text-surface-0 mb-1">
                        Team Members
                      </h3>
                      <p class="text-surface-500 dark:text-surface-400 text-sm">
                        Manage your team
                      </p>
                    </div>
                    <Button label="Add Member" size="small" @click="handleAction('add-member')" />
                  </div>
                </template>
                <template #content>
                  <div class="px-6 pb-6">
                    <div class="space-y-3">
                      <div class="flex items-center gap-3">
                        <Avatar label="JD" class="bg-blue-500" />
                        <div class="flex-1">
                          <div class="font-medium">John Doe</div>
                          <div class="text-sm text-surface-500 dark:text-surface-400">Developer</div>
                        </div>
                        <Button icon="pi pi-cog" severity="secondary" text size="small" @click="handleSettings" />
                      </div>
                      <div class="flex items-center gap-3">
                        <Avatar label="JS" class="bg-green-500" />
                        <div class="flex-1">
                          <div class="font-medium">Jane Smith</div>
                          <div class="text-sm text-surface-500 dark:text-surface-400">Designer</div>
                        </div>
                        <Button icon="pi pi-cog" severity="secondary" text size="small" @click="handleSettings" />
                      </div>
                    </div>
                  </div>
                </template>
              </Card>

              <Card>
                <template #header>
                  <div class="p-6 pb-0 flex justify-between items-center">
                    <h3 class="text-lg font-semibold text-surface-900 dark:text-surface-0">
                      Quick Actions
                    </h3>
                    <div class="flex items-center gap-2">
                      <Button icon="pi pi-refresh" severity="secondary" text size="small" @click="handleAction('refresh')" />
                      <Button icon="pi pi-cog" severity="secondary" text size="small" @click="handleAction('settings')" />
                    </div>
                  </div>
                </template>
                <template #content>
                  <div class="px-6 pb-6">
                    <div class="grid grid-cols-2 gap-3">
                      <Button label="Create Task" icon="pi pi-plus" severity="secondary" @click="handleAction('create-task')" />
                      <Button label="View Reports" icon="pi pi-chart-bar" severity="secondary" @click="handleAction('view-reports')" />
                      <Button label="Export Data" icon="pi pi-download" severity="secondary" @click="handleAction('export')" />
                      <Button label="Settings" icon="pi pi-cog" severity="secondary" @click="handleAction('settings')" />
                    </div>
                  </div>
                </template>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>