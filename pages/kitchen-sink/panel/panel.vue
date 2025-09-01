<script setup lang="ts">
import { ref } from 'vue';

const menu = ref();

const items = ref([
  {
    label: 'Update',
    icon: 'pi pi-refresh',
  },
  {
    label: 'Delete',
    icon: 'pi pi-times',
  },
  {
    label: 'Settings',
    icon: 'pi pi-cog',
  }
]);

function toggle(event: Event) {
  menu.value.toggle(event);
}
</script>

<template>
  <div class="p-6 space-y-8">
    <!-- Header -->
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-4">
        <Icon name="pi:window-maximize" size="32" class="text-primary-500" />
        <div class="flex flex-col">
          <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0">
            Panel
          </h1>
          <p class="text-surface-600 dark:text-surface-300">
            Panel is a grouping component providing with content toggle feature.
          </p>
        </div>
      </div>
    </div>

    <!-- Basic Panel -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Basic Panel
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        A simple Panel is created with a header property along with the content as children.
      </p>
      
      <div class="card">
        <Panel header="Header">
          <p class="m-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </Panel>
      </div>

      <div class="bg-surface-50 dark:bg-surface-800 rounded-lg p-4">
        <pre class="text-sm"><code>&lt;Panel header="Header"&gt;
  &lt;p class="m-0"&gt;
    Lorem ipsum dolor sit amet, consectetur adipiscing elit...
  &lt;/p&gt;
&lt;/Panel&gt;</code></pre>
      </div>
    </div>

    <!-- Toggleable Panel -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Toggleable Panel
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Content of the panel can be expanded and collapsed using toggleable option.
      </p>
      
      <div class="card">
        <Panel header="Header" toggleable>
          <p class="m-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </Panel>
      </div>

      <div class="bg-surface-50 dark:bg-surface-800 rounded-lg p-4">
        <pre class="text-sm"><code>&lt;Panel header="Header" toggleable&gt;
  &lt;p class="m-0"&gt;
    Lorem ipsum dolor sit amet, consectetur adipiscing elit...
  &lt;/p&gt;
&lt;/Panel&gt;</code></pre>
      </div>
    </div>

    <!-- Custom Template Panel -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Custom Templates
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Header, icons and footer sections of the panel are customizable via templating.
      </p>
      
      <div class="card">
        <Panel toggleable>
          <template #header>
            <div class="flex items-center gap-2">
              <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
              <span class="font-bold">Amy Elsner</span>
            </div>
          </template>
          <template #footer>
            <div class="flex flex-wrap items-center justify-between gap-4">
              <div class="flex items-center gap-2">
                <Button icon="pi pi-user" rounded text />
                <Button icon="pi pi-bookmark" severity="secondary" rounded text />
              </div>
              <span class="text-surface-500 dark:text-surface-400">Updated 2 hours ago</span>
            </div>
          </template>
          <template #icons>
            <Button icon="pi pi-cog" severity="secondary" rounded text @click="toggle" />
            <Menu ref="menu" id="config_menu" :model="items" popup />
          </template>
          <p class="m-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </Panel>
      </div>

      <div class="bg-surface-50 dark:bg-surface-800 rounded-lg p-4">
        <pre class="text-sm"><code>&lt;Panel toggleable&gt;
  &lt;template #header&gt;
    &lt;div class="flex items-center gap-2"&gt;
      &lt;Avatar image="..." shape="circle" /&gt;
      &lt;span class="font-bold"&gt;Amy Elsner&lt;/span&gt;
    &lt;/div&gt;
  &lt;/template&gt;
  &lt;template #footer&gt;
    &lt;div class="flex flex-wrap items-center justify-between gap-4"&gt;
      &lt;div class="flex items-center gap-2"&gt;
        &lt;Button icon="pi pi-user" rounded text /&gt;
        &lt;Button icon="pi pi-bookmark" severity="secondary" rounded text /&gt;
      &lt;/div&gt;
      &lt;span class="text-surface-500 dark:text-surface-400"&gt;Updated 2 hours ago&lt;/span&gt;
    &lt;/div&gt;
  &lt;/template&gt;
  &lt;template #icons&gt;
    &lt;Button icon="pi pi-cog" severity="secondary" rounded text @click="toggle" /&gt;
    &lt;Menu ref="menu" :model="items" popup /&gt;
  &lt;/template&gt;
  &lt;p class="m-0"&gt;Content...&lt;/p&gt;
&lt;/Panel&gt;</code></pre>
      </div>
    </div>

    <!-- Multiple Panels Grid -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Panel Grid Layout
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Multiple panels can be arranged in different layouts for complex interfaces.
      </p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Panel header="Statistics" toggleable>
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-surface-700 dark:text-surface-300">Total Users</span>
              <span class="font-bold text-primary-600 dark:text-primary-400">12,543</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-surface-700 dark:text-surface-300">Active Sessions</span>
              <span class="font-bold text-primary-600 dark:text-primary-400">1,234</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-surface-700 dark:text-surface-300">Revenue</span>
              <span class="font-bold text-primary-600 dark:text-primary-400">$54,321</span>
            </div>
          </div>
        </Panel>
        
        <Panel header="Recent Activity" toggleable>
          <div class="space-y-3">
            <div class="flex items-center gap-3">
              <Avatar icon="pi pi-user" size="small" />
              <div class="flex-1">
                <div class="text-sm font-medium text-surface-900 dark:text-surface-0">John Doe</div>
                <div class="text-xs text-surface-500 dark:text-surface-400">Logged in 5 minutes ago</div>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <Avatar icon="pi pi-file" size="small" />
              <div class="flex-1">
                <div class="text-sm font-medium text-surface-900 dark:text-surface-0">New file uploaded</div>
                <div class="text-xs text-surface-500 dark:text-surface-400">document.pdf - 15 minutes ago</div>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <Avatar icon="pi pi-comment" size="small" />
              <div class="flex-1">
                <div class="text-sm font-medium text-surface-900 dark:text-surface-0">New comment</div>
                <div class="text-xs text-surface-500 dark:text-surface-400">On project Alpha - 1 hour ago</div>
              </div>
            </div>
          </div>
        </Panel>
      </div>
    </div>

    <!-- Nested Panels -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Nested Panels
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Panels can be nested to create hierarchical content structures.
      </p>
      
      <div class="card">
        <Panel header="Project Management" toggleable>
          <div class="space-y-4">
            <Panel header="Development Team" toggleable>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="flex items-center gap-3">
                  <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
                  <div>
                    <div class="font-medium text-surface-900 dark:text-surface-0">Amy Elsner</div>
                    <div class="text-sm text-surface-500 dark:text-surface-400">Frontend Developer</div>
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/annafali.png" shape="circle" />
                  <div>
                    <div class="font-medium text-surface-900 dark:text-surface-0">Anna Fali</div>
                    <div class="text-sm text-surface-500 dark:text-surface-400">Backend Developer</div>
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/asiyajavayant.png" shape="circle" />
                  <div>
                    <div class="font-medium text-surface-900 dark:text-surface-0">Asiya Javayant</div>
                    <div class="text-sm text-surface-500 dark:text-surface-400">UI/UX Designer</div>
                  </div>
                </div>
              </div>
            </Panel>
            
            <Panel header="Project Timeline" toggleable>
              <div class="space-y-3">
                <div class="flex items-center justify-between p-3 bg-surface-50 dark:bg-surface-800 rounded">
                  <span class="font-medium">Phase 1: Planning</span>
                  <Badge value="Completed" severity="success" />
                </div>
                <div class="flex items-center justify-between p-3 bg-surface-50 dark:bg-surface-800 rounded">
                  <span class="font-medium">Phase 2: Development</span>
                  <Badge value="In Progress" severity="info" />
                </div>
                <div class="flex items-center justify-between p-3 bg-surface-50 dark:bg-surface-800 rounded">
                  <span class="font-medium">Phase 3: Testing</span>
                  <Badge value="Pending" severity="secondary" />
                </div>
              </div>
            </Panel>
          </div>
        </Panel>
      </div>
    </div>

    <!-- Panel with Actions -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Panel with Action Buttons
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Panels can include action buttons in the header for common operations.
      </p>
      
      <div class="card">
        <Panel toggleable>
          <template #header>
            <div class="flex items-center gap-2">
              <Icon name="pi:chart-line" class="text-primary-500" />
              <span class="font-bold">Sales Report</span>
            </div>
          </template>
          <template #icons>
            <Button icon="pi pi-download" severity="secondary" text rounded v-tooltip="'Download Report'" />
            <Button icon="pi pi-refresh" severity="secondary" text rounded v-tooltip="'Refresh Data'" />
            <Button icon="pi pi-ellipsis-v" severity="secondary" text rounded />
          </template>
          
          <div class="space-y-4">
            <div class="flex justify-between items-center border-b border-surface-200 dark:border-surface-700 pb-2">
              <span class="text-surface-700 dark:text-surface-300">Q1 Sales</span>
              <span class="font-bold text-green-600">$125,000</span>
            </div>
            <div class="flex justify-between items-center border-b border-surface-200 dark:border-surface-700 pb-2">
              <span class="text-surface-700 dark:text-surface-300">Q2 Sales</span>
              <span class="font-bold text-green-600">$150,000</span>
            </div>
            <div class="flex justify-between items-center border-b border-surface-200 dark:border-surface-700 pb-2">
              <span class="text-surface-700 dark:text-surface-300">Q3 Sales</span>
              <span class="font-bold text-green-600">$175,000</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-surface-700 dark:text-surface-300">Q4 Projected</span>
              <span class="font-bold text-blue-600">$200,000</span>
            </div>
          </div>
        </Panel>
      </div>
    </div>

    <!-- Panel States -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Panel States
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Different panel states and configurations for various use cases.
      </p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <!-- Collapsed by default -->
        <Panel header="Collapsed Panel" toggleable collapsed>
          <p class="m-0">This panel starts collapsed and can be expanded by clicking the toggle button.</p>
        </Panel>
        
        <!-- Non-toggleable with custom styling -->
        <Panel>
          <template #header>
            <div class="flex items-center gap-2">
              <Badge value="New" severity="info" />
              <span class="font-bold">Information Panel</span>
            </div>
          </template>
          <p class="m-0">This panel cannot be collapsed and shows important information that should always be visible.</p>
        </Panel>
        
        <!-- Panel with loading state -->
        <Panel header="Loading Panel" toggleable>
          <div class="flex flex-col items-center gap-4 py-8">
            <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="4" />
            <span class="text-surface-600 dark:text-surface-300">Loading content...</span>
          </div>
        </Panel>
      </div>
    </div>
  </div>
</template>