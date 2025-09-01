<script setup lang="ts">
const { $trpc } = useNuxtApp();
const route = useRoute();
const router = useRouter();

// Get initial page from URL query parameter (1-based in URL, convert to 0-based internally)
const pageSize = 8;
const urlPage = Number(route.query.page) || 1;
const currentPage = ref(urlPage - 1); // Convert to 0-based for internal use

// Computed property for Paginator's first prop (0-based first record index)
const paginatorFirst = computed(() => currentPage.value * pageSize);

// Fetch blog posts from tRPC with pagination
const { data: blogData, pending: loading, error, refresh } = await $trpc.blog.getPosts.useQuery({
  page: currentPage.value,
  pageSize,
});

// Watch for page changes and update URL + refetch
watch(currentPage, async (newPage) => {
  // Convert 0-based page to 1-based for URL
  const urlPageNumber = newPage + 1;
  await router.push({
    query: { 
      ...route.query, 
      page: urlPageNumber === 1 ? undefined : urlPageNumber 
    }
  });
  
  // Refetch data
  await refresh();
});

// Watch for URL changes (like back/forward buttons)
watch(() => route.query.page, (newPage) => {
  const urlPageNumber = Number(newPage) || 1;
  const zeroBasedPage = urlPageNumber - 1;
  if (zeroBasedPage !== currentPage.value) {
    currentPage.value = zeroBasedPage;
  }
});

function formatDate(date: Date | string) {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(dateObj);
}

function onPaginatorChange(newFirst: number) {
  // Convert from first record index to 0-based page number
  const newPage = Math.floor(newFirst / pageSize);
  currentPage.value = newPage;
}

function nextPage() {
  if (blogData.value && currentPage.value < blogData.value.pagination.totalPages - 1) {
    currentPage.value++;
  }
}

function prevPage() {
  if (currentPage.value > 0) {
    currentPage.value--;
  }
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
      <div v-if="blogData?.posts && blogData.posts.length > 0">
        <!-- Posts Grid -->
        <div class="space-y-6 mb-8">
          <Card v-for="post in blogData.posts" :key="post.id" class="hover:shadow-lg transition-shadow">
            <template #content>
              <div class="p-6">
                <h2 class="text-2xl font-semibold mb-2">
                  <NuxtLink 
                    :to="`/blog/${post.id}`" 
                    class="text-inherit hover:text-primary transition-colors cursor-pointer"
                  >
                    {{ post.title }}
                  </NuxtLink>
                </h2>
                <p class="text-sm mb-4">{{ formatDate(post.created_at) }}</p>
                <div class="prose max-w-none">
                  <p>{{ post.body.substring(0, 300) }}{{ post.body.length > 300 ? '...' : '' }}</p>
                </div>
                <div class="mt-4">
                  <Button 
                    label="Read More" 
                    variant="text" 
                    size="small"
                    @click="$router.push(`/blog/${post.id}`)"
                    class="text-primary hover:text-primary-600"
                  />
                </div>
              </div>
            </template>
          </Card>
        </div>

        <!-- Pagination Controls -->
        <div class="flex items-center justify-between">
          <div class="text-sm">
            Showing {{ currentPage * pageSize + 1 }} to 
            {{ Math.min((currentPage + 1) * pageSize, blogData.pagination.total) }} 
            of {{ blogData.pagination.total }} posts
          </div>
          
          <Paginator
            v-model:first="paginatorFirst"
            :rows="pageSize"
            :total-records="blogData.pagination.total"
            @update:first="onPaginatorChange"
          />
        </div>
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