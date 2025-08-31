<script setup lang="ts">
const route = useRoute();

const navs = ref([
  {
    label: 'Home',
    icon: 'pi pi-th-large',
    to: '/',
  },
  {
    label: 'Messages',
    icon: 'pi pi-comments',
    badge: '8',
    to: '',
  },
  {
    label: 'Kitchen Sink',
    icon: 'pi pi-bookmark',
    to: '/kitchen-sink',
  },
  {
    label: 'Examples',
    icon: 'pi pi-code',
    to: '/examples',
  },
]);

// Determine which nav item is active based on the current route
function isNavActive(item: any) {
  if (!item.to)
    return false;

  // For home, check exact match
  if (item.to === '/') {
    return route.path === '/';
  }

  // For other routes, check if current path starts with the nav item's path
  return route.path.startsWith(item.to);
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-surface-50 dark:bg-surface-950">
    <div class="relative bg-surface-0 dark:bg-surface-950">
      <nav class="h-16 relative flex items-center justify-between gap-8 px-8 lg:px-20 bg-surface-0 dark:bg-surface-900 border-b border-surface-200 dark:border-surface-700">
        <div class="flex items-center gap-4">
          <Icon name="lucide:layout-dashboard" size="24" />
          <div class="text-surface-900 dark:text-surface-0 font-semibold text-lg">
            Template
          </div>
        </div>
        <a
          v-styleclass="{
            selector: '@next',
            enterFromClass: 'hidden',
            leaveToClass: 'hidden',
            hideOnOutsideClick: true,
          }"
          class="cursor-pointer block lg:hidden text-surface-700 dark:text-surface-0"
        >
          <i class="pi pi-bars text-xl! leading-normal!" />
        </a>
        <div class="hidden bg-surface-0 dark:bg-surface-900 shadow-md absolute left-0 right-0 top-16 z-20">
          <div class="flex-1 flex flex-col gap-0 px-0 py-4">
            <NuxtLink
              v-for="(item, i) in navs"
              :key="i"
              :to="item.to"
              class="flex items-center gap-2 px-6 py-3 cursor-pointer transition-colors duration-150" :class="[
                isNavActive(item) ? 'border-l-2 border-primary-500 dark:border-primary-400' : 'border-l-2 border-transparent hover:border-primary-500 dark:hover:border-primary-400',
              ]"
            >
              <i :class="[`${item.icon} text-base! leading-normal!`, isNavActive(item) ? 'text-surface-900 dark:text-surface-0' : 'text-surface-500 dark:text-surface-400']" />
              <span class="font-medium" :class="[isNavActive(item) ? 'text-surface-900 dark:text-surface-0' : 'text-surface-600 dark:text-surface-300']">{{ item.label }}</span>
              <Badge v-if="item.badge" :value="item.badge" severity="primary" class="ml-auto" />
            </NuxtLink>
          </div>
          <div class="flex items-center justify-between px-6 py-4 border-t border-surface-200 dark:border-surface-700">
            <a class="cursor-pointer">
              <i class="pi pi-bell text-xl! leading-normal! text-surface-600 dark:text-surface-300" />
            </a>
            <div class="flex items-center gap-3">
              <img src="https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/avatars/circle/avatar-m-1.png" class="w-8 h-8 rounded-full">
              <div class="text-surface-900 dark:text-surface-0 font-medium">
                Robert Fox
              </div>
            </div>
          </div>
        </div>
        <div class="flex-1 h-full items-end justify-between hidden lg:flex absolute lg:static w-full left-0 top-full shadow-md lg:shadow-none z-10">
          <div class="flex-1 flex items-end gap-2 bg-surface-0 dark:bg-surface-900 h-full">
            <NuxtLink
              v-for="(item, i) in navs"
              :key="i"
              :to="item.to"
              class="flex items-center gap-2 h-full px-4 rounded-t-md cursor-pointer transition-colors duration-150" :class="[
                isNavActive(item) ? 'border-b-2 border-primary-500 dark:border-primary-400' : 'border-b-2 border-transparent hover:border-primary-500 dark:hover:border-primary-400',
              ]"
            >
              <i :class="[`${item.icon} text-base! leading-normal!`, isNavActive(item) ? 'text-surface-900 dark:text-surface-0' : 'text-surface-500 dark:text-surface-400']" />
              <span class="font-medium" :class="[isNavActive(item) ? 'text-surface-900 dark:text-surface-0' : 'text-surface-600 dark:text-surface-300']">{{ item.label }}</span>
              <Badge v-if="item.badge" :value="item.badge" severity="primary" />
            </NuxtLink>
          </div>
          <div class="flex items-center self-center gap-8">
            <a class="cursor-pointer">
              <i class="pi pi-bell text-xl! leading-normal! text-surface-600 dark:text-surface-300 hover:text-surface-600 dark:hover:text-surface-300" />
            </a>
            <img src="https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/avatars/circle/avatar-m-1.png" class="w-8 h-8 rounded-full cursor-pointer">
          </div>
        </div>
      </nav>
    </div>

    <div class="p-7 flex flex-col flex-auto">
      <NuxtPage />
    </div>
  </div>
</template>
