<script setup lang="ts">
const examples = ref([
  {
    title: 'Dashboard',
    description: 'A comprehensive hospital management dashboard with patient admissions, medical records, team management, and activity logging.',
    route: '/examples/pages/dashboard',
  },
]);
</script>

<template>
  <div class="flex flex-col gap-8">
    <!-- Header -->
    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-2">
        <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0">
          Example Pages
        </h1>
        <p class="text-surface-600 dark:text-surface-300 leading-relaxed">
          Explore our collection of example pages and layouts to kickstart your project development.
        </p>
      </div>
    </div>

    <!-- Examples Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="example in examples"
        :key="example.title"
        class="bg-surface-0 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-200"
      >
        <!-- Content -->
        <div class="p-6 flex flex-col gap-4">
          <div class="flex flex-col gap-2">
            <div class="flex items-start justify-between gap-2">
              <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-0">
                {{ example.title }}
              </h3>
            </div>
            <p class="text-surface-600 dark:text-surface-300 leading-relaxed">
              {{ example.description }}
            </p>
          </div>

          <!-- Actions -->
          <div class="flex gap-2 mt-auto pt-4">
            <NuxtLink :to="example.route" target="_blank" class="flex-1">
              <Button
                label="View Example"
                class="w-full"
                icon="pi pi-eye"
              />
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Add More Card -->
      <div class="bg-surface-0 dark:bg-surface-900 border-2 border-dashed border-surface-200 dark:border-surface-700 rounded-xl flex items-center justify-center p-8 hover:border-primary-300 dark:hover:border-primary-600 transition-colors duration-200">
        <div class="text-center flex flex-col items-center gap-4">
          <div class="w-16 h-16 rounded-full bg-surface-100 dark:bg-surface-800 flex items-center justify-center">
            <Icon name="lucide:plus" size="24" class="text-surface-500 dark:text-surface-400" />
          </div>
          <div class="flex flex-col gap-2">
            <h3 class="text-lg font-semibold text-surface-900 dark:text-surface-0">
              More Examples Coming Soon
            </h3>
            <p class="text-surface-600 dark:text-surface-300 text-sm">
              We're working on adding more example pages and layouts
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

