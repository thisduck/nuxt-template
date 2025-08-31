<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const sidebarVisible = ref(false);

const navigationItems = ref([
  {
    title: 'Form Components',
    icon: 'pi pi-file-edit',
    expanded: true,
    items: [
      { label: 'Input Text', path: '/kitchen-sink/form/input-text', icon: 'pi pi-pencil' },
      { label: 'Textarea', path: '/kitchen-sink/form/textarea', icon: 'pi pi-align-left' },
      { label: 'Password', path: '/kitchen-sink/form/password', icon: 'pi pi-key' },
      { label: 'Dropdown', path: '/kitchen-sink/form/dropdown', icon: 'pi pi-chevron-down' },
      { label: 'MultiSelect', path: '/kitchen-sink/form/multiselect', icon: 'pi pi-check-square' },
      { label: 'Calendar', path: '/kitchen-sink/form/calendar', icon: 'pi pi-calendar' },
      { label: 'Checkbox', path: '/kitchen-sink/form/checkbox', icon: 'pi pi-check' },
      { label: 'RadioButton', path: '/kitchen-sink/form/radiobutton', icon: 'pi pi-circle' },
      { label: 'Slider', path: '/kitchen-sink/form/slider', icon: 'pi pi-sliders-h' },
      { label: 'Button', path: '/kitchen-sink/form/button', icon: 'pi pi-play' },
    ],
  },
  {
    title: 'Data Components',
    icon: 'pi pi-table',
    expanded: true,
    items: [
      { label: 'DataTable', path: '/kitchen-sink/data/datatable', icon: 'pi pi-table' },
      { label: 'DataView', path: '/kitchen-sink/data/dataview', icon: 'pi pi-list' },
      { label: 'TreeTable', path: '/kitchen-sink/data/treetable', icon: 'pi pi-sitemap' },
    ],
  },
  {
    title: 'Panel Components',
    icon: 'pi pi-window-maximize',
    expanded: true,
    items: [
      { label: 'Panel', path: '/kitchen-sink/panel/panel', icon: 'pi pi-window-maximize' },
      { label: 'Card', path: '/kitchen-sink/panel/card', icon: 'pi pi-id-card' },
      { label: 'Accordion', path: '/kitchen-sink/panel/accordion', icon: 'pi pi-bars' },
      { label: 'TabView', path: '/kitchen-sink/panel/tabview', icon: 'pi pi-clone' },
    ],
  },
]);

function toggleSection(section: any) {
  section.expanded = !section.expanded;
}

function navigateToComponent(path: string) {
  router.push(path);
  sidebarVisible.value = false;
}

function isActive(path: string) {
  return route.path === path;
}

// Check if we're on the main kitchen sink page (no sub-route)
const isMainPage = computed(() => {
  return route.path === '/kitchen-sink' || route.path === '/kitchen-sink/';
});
</script>

<template>
  <div class="flex items-center gap-4 p-6 bg-surface-0 dark:bg-surface-900 border-b border-surface-200 dark:border-surface-700 lg:ml-0 z-5">
    <div class="flex items-center gap-4">
      <Icon name="lucide:bolt" size="32" class="text-primary-500" />
      <div class="flex flex-col">
        <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0">
          Kitchen Sink
        </h1>
        <p class="text-surface-600 dark:text-surface-300">
          Explore PrimeVue components and examples
        </p>
      </div>
    </div>
  </div>
  <div class="flex relative h-full">
    <!-- Sidebar -->
    <div
      class="bg-surface-0 dark:bg-surface-900 shrink-0 absolute lg:static left-0 top-0 z-10 border-r border-surface-200 dark:border-surface-700 select-none w-[280px] transition-transform duration-300 h-full" :class="[
        sidebarVisible ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
      ]"
    >
      <div class="flex flex-col h-full">
        <!-- Header -->
        <div class="p-4 flex items-center justify-between gap-4 border-b border-surface-200 dark:border-surface-700">
          <div class="flex items-center gap-3">
            <Icon name="lucide:bolt" size="24" class="text-primary-500" />
            <span class="text-lg font-semibold leading-tight text-surface-900 dark:text-surface-0">Components</span>
          </div>
        </div>

        <!-- Navigation -->
        <div class="overflow-y-auto flex-1 p-2 flex flex-col gap-2">
          <div v-for="section in navigationItems" :key="section.title" class="flex flex-col">
            <!-- Section Header -->
            <div
              class="flex items-center cursor-pointer p-3 gap-3 rounded-lg text-surface-900 dark:text-surface-0 hover:bg-surface-50 dark:hover:bg-surface-800 border border-transparent hover:border-surface-100 dark:hover:border-surface-700 transition-colors duration-150"
              @click="toggleSection(section)"
            >
              <i :class="`${section.icon} text-base! leading-none!`" />
              <span class="font-semibold text-base leading-tight flex-1">{{ section.title }}</span>
              <i class="pi pi-angle-down text-base! leading-none! text-surface-500 dark:text-surface-400 transition-transform duration-150" :class="[section.expanded ? 'rotate-180' : '']" />
            </div>

            <!-- Section Items -->
            <div v-if="section.expanded" class="flex flex-col gap-1 ml-2 mt-1">
              <div
                v-for="item in section.items"
                :key="item.path"
                class="flex items-center cursor-pointer p-3 gap-2 rounded-lg border border-transparent transition-colors duration-150" :class="[
                  isActive(item.path)
                    ? 'bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 border-primary-200 dark:border-primary-500/20'
                    : 'text-surface-700 dark:text-surface-200 hover:bg-surface-50 dark:hover:bg-surface-800 hover:border-surface-100 dark:hover:border-surface-700 hover:text-surface-900 dark:hover:text-surface-50',
                ]"
                @click="navigateToComponent(item.path)"
              >
                <i :class="[`${item.icon} text-base! leading-none!`]" />
                <span class="font-medium text-base leading-tight">{{ item.label }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 min-h-0">
      <!-- Top Bar -->

      <!-- Content -->
      <div class="flex-1 overflow-auto">
        <NuxtPage />
      </div>
    </div>

    <!-- Mobile Overlay -->
    <div
      v-if="sidebarVisible"
      class="fixed inset-0 bg-black bg-opacity-50 z-5 lg:hidden"
      @click="sidebarVisible = false"
    />
  </div>
</template>
