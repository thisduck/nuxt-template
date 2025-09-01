<script setup lang="ts">
import { ref } from 'vue';

// Basic breadcrumb
const home = ref({
  icon: 'pi pi-home',
  route: '/',
});

const items = ref([
  { label: 'Electronics', url: '#' },
  { label: 'Computer', url: '#' },
  { label: 'Accessories', url: '#' },
  { label: 'Keyboard', url: '#' },
  { label: 'Wireless' },
]);

// Template breadcrumb with icons
const homeWithIcon = ref({
  icon: 'pi pi-home',
  url: '#',
});

const templateItems = ref([
  { label: 'Components', icon: 'pi pi-desktop', url: '#' },
  { label: 'Form', icon: 'pi pi-file-edit', url: '#' },
  { label: 'Input', icon: 'pi pi-pencil', url: '#' },
  { label: 'InputText', icon: 'pi pi-file' },
]);

// Router breadcrumb
const routerHome = ref({
  icon: 'pi pi-home',
  route: '/',
});

const routerItems = ref([
  { label: 'Components', icon: 'pi pi-desktop', route: '/kitchen-sink' },
  { label: 'Form', icon: 'pi pi-file-edit', route: '/kitchen-sink/form' },
  { label: 'InputText', route: '/kitchen-sink/form/input-text' },
]);

// File system breadcrumb
const fileSystemHome = ref({
  icon: 'pi pi-folder',
  url: '#',
});

const fileSystemItems = ref([
  { label: 'Documents', icon: 'pi pi-folder-open', url: '#' },
  { label: 'Projects', icon: 'pi pi-folder-open', url: '#' },
  { label: 'Vue Apps', icon: 'pi pi-folder-open', url: '#' },
  { label: 'my-project', icon: 'pi pi-folder', url: '#' },
  { label: 'src', icon: 'pi pi-folder', url: '#' },
  { label: 'components', icon: 'pi pi-folder', url: '#' },
  { label: 'Header.vue', icon: 'pi pi-file' },
]);

// E-commerce breadcrumb
const ecommerceHome = ref({
  icon: 'pi pi-home',
  url: '#',
});

const ecommerceItems = ref([
  { label: 'Men', url: '#' },
  { label: 'Clothing', url: '#' },
  { label: 'Shirts', url: '#' },
  { label: 'Casual Shirts' },
]);

// Admin panel breadcrumb
const adminHome = ref({
  icon: 'pi pi-home',
  url: '#',
});

const adminItems = ref([
  { label: 'Dashboard', icon: 'pi pi-chart-line', url: '#' },
  { label: 'Users', icon: 'pi pi-users', url: '#' },
  { label: 'Management', icon: 'pi pi-cog', url: '#' },
  { label: 'Edit Profile', icon: 'pi pi-user-edit' },
]);

// Dynamic breadcrumb
const dynamicHome = ref({
  icon: 'pi pi-home',
  url: '#',
});

const dynamicItems = ref([
  { label: 'Level 1', url: '#' },
]);

function addLevel() {
  const level = dynamicItems.value.length + 1;
  dynamicItems.value.push({
    label: `Level ${level}`,
    url: '#',
  });
}

function removeLevel() {
  if (dynamicItems.value.length > 1) {
    dynamicItems.value.pop();
  }
}

function resetBreadcrumb() {
  dynamicItems.value = [{ label: 'Level 1', url: '#' }];
}
</script>

<template>
  <div class="p-6 space-y-8">
    <!-- Header -->
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-4">
        <Icon name="pi:angle-right" size="32" class="text-primary-500" />
        <div class="flex flex-col">
          <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0">
            Breadcrumb
          </h1>
          <p class="text-surface-600 dark:text-surface-300">
            Breadcrumb provides contextual information about page hierarchy.
          </p>
        </div>
      </div>
    </div>

    <!-- Basic Breadcrumb -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Basic Usage
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Breadcrumb requires a collection of menuitems as its model, the root item is defined with the home property.
      </p>

      <div class="card">
        <Breadcrumb :home="home" :model="items" />
      </div>
    </div>

    <!-- Template Breadcrumb -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Custom Template
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Custom content can be placed inside the items using the item template. The divider between the items has its own separator template.
      </p>

      <div class="card">
        <Breadcrumb :home="homeWithIcon" :model="templateItems">
          <template #item="{ item }">
            <a class="flex items-center cursor-pointer" :href="item.url">
              <span :class="item.icon" />
              <span class="ml-2">{{ item.label }}</span>
            </a>
          </template>
          <template #separator>
            <span class="mx-2 text-surface-400">/</span>
          </template>
        </Breadcrumb>
      </div>
    </div>

    <!-- Router Integration -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Router Integration
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Items with navigation are defined with templating to be able to use a router link component.
      </p>

      <div class="card">
        <Breadcrumb :home="routerHome" :model="routerItems">
          <template #item="{ item, props }">
            <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
              <a :href="href" v-bind="props.action" class="flex items-center" @click="navigate">
                <span v-if="item.icon" class="text-primary-500" :class="[item.icon]" />
                <span class="text-primary-600 hover:text-primary-700 font-medium ml-2">{{ item.label }}</span>
              </a>
            </router-link>
            <a v-else :href="item.url" :target="item.target" v-bind="props.action" class="flex items-center">
              <span v-if="item.icon" :class="item.icon" />
              <span class="text-surface-700 dark:text-surface-200 ml-2">{{ item.label }}</span>
            </a>
          </template>
        </Breadcrumb>
      </div>
    </div>

    <!-- File System Navigation -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        File System Navigation
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Example of breadcrumb used for file system navigation with folder and file icons.
      </p>

      <div class="card">
        <Breadcrumb :home="fileSystemHome" :model="fileSystemItems">
          <template #item="{ item }">
            <a class="flex items-center cursor-pointer text-surface-700 hover:text-surface-900 dark:text-surface-200 dark:hover:text-surface-0 transition-colors" :href="item.url">
              <span :class="[item.icon, item.icon === 'pi pi-file' ? 'text-blue-500' : 'text-yellow-600']" />
              <span class="ml-2 text-sm">{{ item.label }}</span>
            </a>
          </template>
          <template #separator>
            <span class="mx-2 text-surface-300">/</span>
          </template>
        </Breadcrumb>
      </div>
    </div>

    <!-- E-commerce Navigation -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        E-commerce Navigation
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Breadcrumb navigation for e-commerce category hierarchy.
      </p>

      <div class="card">
        <Breadcrumb :home="ecommerceHome" :model="ecommerceItems">
          <template #item="{ item }">
            <a class="cursor-pointer text-surface-600 hover:text-primary-600 transition-colors" :href="item.url">
              {{ item.label }}
            </a>
          </template>
          <template #separator>
            <i class="pi pi-angle-right mx-2 text-surface-400" />
          </template>
        </Breadcrumb>
      </div>
    </div>

    <!-- Admin Panel Navigation -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Admin Panel Navigation
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Breadcrumb for admin dashboard with colored icons and enhanced styling.
      </p>

      <div class="card">
        <div class="bg-surface-50 dark:bg-surface-800 p-4 rounded-lg">
          <Breadcrumb :home="adminHome" :model="adminItems">
            <template #item="{ item }">
              <a class="flex items-center cursor-pointer p-2 rounded hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors" :href="item.url">
                <span
                  v-if="item.icon" :class="[
                    item.icon,
                    item.icon === 'pi pi-chart-line' ? 'text-green-500'
                    : item.icon === 'pi pi-users' ? 'text-blue-500'
                      : item.icon === 'pi pi-cog' ? 'text-orange-500'
                        : item.icon === 'pi pi-user-edit' ? 'text-purple-500' : 'text-surface-600',
                  ]"
                />
                <span class="ml-2 text-surface-800 dark:text-surface-100 font-medium">{{ item.label }}</span>
              </a>
            </template>
            <template #separator>
              <i class="pi pi-chevron-right mx-2 text-surface-300" />
            </template>
          </Breadcrumb>
        </div>
      </div>
    </div>

    <!-- Dynamic Breadcrumb -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Dynamic Breadcrumb
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Interactive example showing how to dynamically add and remove breadcrumb items.
      </p>

      <div class="card">
        <div class="flex flex-col gap-4">
          <div class="flex gap-2">
            <Button
              label="Add Level"
              icon="pi pi-plus"
              size="small"
              @click="addLevel"
            />
            <Button
              label="Remove Level"
              icon="pi pi-minus"
              severity="secondary"
              size="small"
              :disabled="dynamicItems.length <= 1"
              @click="removeLevel"
            />
            <Button
              label="Reset"
              icon="pi pi-refresh"
              severity="warn"
              size="small"
              @click="resetBreadcrumb"
            />
          </div>

          <Breadcrumb :home="dynamicHome" :model="dynamicItems">
            <template #item="{ item }">
              <a class="cursor-pointer text-surface-700 hover:text-primary-600 transition-colors" :href="item.url">
                {{ item.label }}
              </a>
            </template>
          </Breadcrumb>

          <div class="text-sm text-surface-500 dark:text-surface-400">
            Current depth: {{ dynamicItems.length }} level{{ dynamicItems.length !== 1 ? 's' : '' }}
          </div>
        </div>
      </div>
    </div>

    <!-- Responsive Breadcrumb -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Responsive Design
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Breadcrumb with responsive behavior that collapses on smaller screens.
      </p>

      <div class="card">
        <div class="overflow-x-auto">
          <Breadcrumb :home="fileSystemHome" :model="fileSystemItems">
            <template #item="{ item }">
              <a class="flex items-center cursor-pointer whitespace-nowrap" :href="item.url">
                <span class="hidden sm:inline" :class="[item.icon]" />
                <span class="ml-0 sm:ml-2 text-sm">{{ item.label }}</span>
              </a>
            </template>
            <template #separator>
              <span class="mx-1 sm:mx-2 text-surface-400">/</span>
            </template>
          </Breadcrumb>
        </div>
        <div class="mt-4 text-sm text-surface-500 dark:text-surface-400">
          <i class="pi pi-info-circle mr-1" />
          Icons are hidden on small screens, and the breadcrumb scrolls horizontally if needed.
        </div>
      </div>
    </div>

    <!-- Different Separators -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Custom Separators
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Examples of different separator styles for breadcrumb navigation.
      </p>

      <div class="card space-y-6">
        <!-- Arrow Separators -->
        <div>
          <h3 class="text-lg font-medium text-surface-800 dark:text-surface-100 mb-3">
            Arrow Separators
          </h3>
          <Breadcrumb :home="ecommerceHome" :model="ecommerceItems.slice(0, 3)">
            <template #separator>
              <i class="pi pi-arrow-right mx-2 text-primary-500" />
            </template>
          </Breadcrumb>
        </div>

        <!-- Dot Separators -->
        <div>
          <h3 class="text-lg font-medium text-surface-800 dark:text-surface-100 mb-3">
            Dot Separators
          </h3>
          <Breadcrumb :home="adminHome" :model="adminItems.slice(0, 3)">
            <template #separator>
              <span class="mx-3 text-surface-400">•</span>
            </template>
          </Breadcrumb>
        </div>

        <!-- Custom Icon Separators -->
        <div>
          <h3 class="text-lg font-medium text-surface-800 dark:text-surface-100 mb-3">
            Custom Icon Separators
          </h3>
          <Breadcrumb :home="routerHome" :model="routerItems.slice(0, 2)">
            <template #separator>
              <i class="pi pi-bookmark mx-2 text-orange-400" />
            </template>
          </Breadcrumb>
        </div>
      </div>
    </div>
  </div>
</template>
