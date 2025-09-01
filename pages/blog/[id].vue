<script setup lang="ts">
const route = useRoute();
const { $trpc } = useNuxtApp();

// Get the post ID from the route parameter
const postId = Number(route.params.id);

// Fetch the blog post
const { data: post, pending: loading, error } = await $trpc.blog.getPost.useQuery({
  id: postId,
});

// Format date helper
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
    <!-- Back to Blog Button -->
    <div class="mb-6">
      <Button 
        label="← Back to Blog" 
        variant="text" 
        @click="$router.push('/blog')"
        class="text-primary hover:text-primary-600"
      />
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="animate-pulse">
      <Card>
        <template #content>
          <div class="p-6 space-y-4">
            <div class="h-8 bg-gray-200 rounded w-3/4"></div>
            <div class="h-4 bg-gray-200 rounded w-1/3"></div>
            <div class="space-y-3 mt-8">
              <div class="h-4 bg-gray-200 rounded"></div>
              <div class="h-4 bg-gray-200 rounded"></div>
              <div class="h-4 bg-gray-200 rounded w-5/6"></div>
              <div class="h-4 bg-gray-200 rounded"></div>
              <div class="h-4 bg-gray-200 rounded w-4/5"></div>
            </div>
          </div>
        </template>
      </Card>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-16">
      <Card>
        <template #content>
          <div class="p-6">
            <i class="pi pi-exclamation-triangle text-6xl text-red-500 mb-4"></i>
            <h3 class="text-xl font-semibold mb-2">Post not found</h3>
            <p class="mb-6">{{ error.message }}</p>
            <Button 
              label="Back to Blog" 
              icon="pi pi-arrow-left" 
              @click="$router.push('/blog')"
            />
          </div>
        </template>
      </Card>
    </div>

    <!-- Blog Post Content -->
    <article v-else-if="post">
      <Card>
        <template #content>
          <div class="p-6">
            <!-- Post Header -->
            <header class="mb-8">
              <h1 class="text-4xl font-bold mb-4">{{ post.title }}</h1>
              <div class="text-sm text-gray-600">
                <time :datetime="post.created_at">
                  Published on {{ formatDate(post.created_at) }}
                </time>
                <span v-if="post.updated_at !== post.created_at" class="ml-4">
                  • Updated {{ formatDate(post.updated_at) }}
                </span>
              </div>
            </header>

            <!-- Post Body -->
            <div class="prose max-w-none">
              <div class="whitespace-pre-wrap">{{ post.body }}</div>
            </div>
          </div>
        </template>
      </Card>
    </article>
  </div>
</template>