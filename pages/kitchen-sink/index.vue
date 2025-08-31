<script setup lang="ts">
const router = useRouter();

function _navigateToForm() {
  router.push('/kitchen-sink/form');
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-surface-50 via-surface-100 to-surface-50 dark:from-surface-900 dark:via-surface-950 dark:to-surface-900">
    <!-- Hero Section -->
    <div class="px-6 py-12 lg:px-8 lg:py-16">
      <div class="max-w-4xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-16">
          <div class="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-primary-400 to-primary-600 dark:from-primary-500 dark:to-primary-700 mb-8 shadow-2xl">
            <Icon name="lucide:bolt" size="48" class="text-white" />
          </div>
          <h1 class="text-6xl font-bold text-surface-900 dark:text-surface-0 mb-6">
            Kitchen Sink
          </h1>
          <p class="text-xl text-surface-600 dark:text-surface-300 max-w-2xl mx-auto leading-relaxed">
            Explore our comprehensive component library. Interactive examples, live demos, and ready-to-use code snippets.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
