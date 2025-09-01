<script setup lang="ts">
const { $trpc } = useNuxtApp();

// Fetch blog posts from tRPC
const { data: blogPosts, pending: loading, error, refresh } = await $trpc.blog.getPosts.useQuery();

function formatDate(date: Date | string) {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(dateObj);
}
</script>

<template>
  <div class="w-full max-w-6xl mx-auto p-6">
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-3xl font-bold">Blog</h1>
      <Button 
        label="New Post" 
        icon="pi pi-plus" 
        @click="$router.push('/blog/new')"
      />
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="space-y-6">
      <Card v-for="i in 3" :key="i" class="animate-pulse">
        <template #content>
          <div class="space-y-4">
            <div class="h-6 bg-gray-200 rounded w-3/4"></div>
            <div class="h-4 bg-gray-200 rounded w-1/2"></div>
            <div class="h-4 bg-gray-200 rounded"></div>
            <div class="h-4 bg-gray-200 rounded"></div>
            <div class="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </template>
      </Card>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-16">
      <i class="pi pi-exclamation-triangle text-6xl text-red-500 mb-4"></i>
      <h3 class="text-xl font-semibold mb-2">Failed to load blog posts</h3>
      <p class="mb-6">{{ error.message }}</p>
      <Button label="Try Again" icon="pi pi-refresh" @click="refresh()" />
    </div>

    <!-- Blog Posts List -->
    <div v-else>
      <div v-if="blogPosts && blogPosts.length > 0" class="space-y-6">
        <Card v-for="post in blogPosts" :key="post.id" class="hover:shadow-lg transition-shadow">
          <template #content>
            <div class="p-6">
              <h2 class="text-2xl font-semibold mb-2">{{ post.title }}</h2>
              <p class="text-sm mb-4">{{ formatDate(post.created_at) }}</p>
              <div class="prose max-w-none">
                <p>{{ post.body.substring(0, 300) }}{{ post.body.length > 300 ? '...' : '' }}</p>
              </div>
            </div>
          </template>
        </Card>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-16">
        <i class="pi pi-file-edit text-6xl mb-4"></i>
        <h3 class="text-xl font-semibold mb-2">No blog posts yet</h3>
        <p class="mb-6">Get started by creating your first blog post</p>
        <Button 
          label="Create Your First Post" 
          icon="pi pi-plus" 
          @click="$router.push('/blog/new')"
        />
      </div>
    </div>
  </div>
</template>