<script setup lang="ts">
const { $trpc } = useNuxtApp();
const route = useRoute();
const router = useRouter();

// Get initial values from URL query parameters
const pageSize = 8;
const urlPage = Number(route.query.page) || 1;
const currentPage = ref(urlPage - 1); // Convert to 0-based for internal use
const searchQuery = ref((route.query.search as string) || '');

// Computed property for Paginator's first prop (0-based first record index)
const paginatorFirst = computed(() => currentPage.value * pageSize);

// Determine if we're in search mode
const isSearchMode = computed(() => searchQuery.value.trim().length > 0);

// Reactive query params for data fetching
const queryParams = computed(() => ({
  page: currentPage.value,
  pageSize,
  ...(isSearchMode.value ? { query: searchQuery.value.trim() } : {}),
}));

// Fetch blog posts (either search or regular)
const { data: blogData, pending: loading, error, refresh } = await $trpc.blog[
  isSearchMode.value ? 'searchPosts' : 'getPosts'
].useQuery(queryParams);

// Search functionality
const searchTimeout = ref<NodeJS.Timeout | null>(null);

function handleSearch(event: Event) {
  const target = event.target as HTMLInputElement;
  const query = target.value;

  // Clear existing timeout
  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value);
  }

  // Debounce search to avoid too many API calls
  searchTimeout.value = setTimeout(() => {
    searchQuery.value = query;
    currentPage.value = 0; // Reset to first page on new search
    updateURL();
  }, 300);
}

function clearSearch() {
  searchQuery.value = '';
  currentPage.value = 0;
  updateURL();
}

// Update URL with current state
async function updateURL() {
  const query: Record<string, string | undefined> = {};

  // Add search query if exists
  if (searchQuery.value.trim()) {
    query.search = searchQuery.value.trim();
  }

  // Add page if not first page
  const urlPageNumber = currentPage.value + 1;
  if (urlPageNumber > 1) {
    query.page = String(urlPageNumber);
  }

  await router.push({ query });
  await refresh();
}

// Watch for page changes
watch(currentPage, async () => {
  await updateURL();
});

// Watch for URL changes (like back/forward buttons)
watch(() => route.query, (newQuery) => {
  const newSearch = (newQuery.search as string) || '';
  const urlPageNumber = Number(newQuery.page) || 1;
  const zeroBasedPage = urlPageNumber - 1;

  if (newSearch !== searchQuery.value) {
    searchQuery.value = newSearch;
  }

  if (zeroBasedPage !== currentPage.value) {
    currentPage.value = zeroBasedPage;
  }
}, { deep: true });

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
</script>

<template>
  <div class="w-full max-w-6xl mx-auto p-6">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-3xl font-bold">
        Blog
      </h1>
      <Button
        label="New Post"
        icon="pi pi-plus"
        @click="$router.push('/blog/new')"
      />
    </div>

    <!-- Search Section -->
    <div class="mb-8">
      <Card>
        <template #content>
          <div class="p-6">
            <div class="flex flex-col sm:flex-row gap-4">
              <div class="flex-1">
                <div class="relative">
                  <InputText
                    :model-value="searchQuery"
                    placeholder="Search blog posts..."
                    class="w-full pl-10"
                    @input="handleSearch"
                  />
                  <i class="pi pi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              <Button
                v-if="isSearchMode"
                label="Clear Search"
                icon="pi pi-times"
                variant="outlined"
                @click="clearSearch"
              />
            </div>

            <!-- Search Results Info -->
            <div v-if="isSearchMode && blogData" class="mt-4 text-sm text-gray-600">
              <span v-if="loading">Searching...</span>
              <span v-else>
                Found {{ blogData.pagination.total }} result{{ blogData.pagination.total === 1 ? '' : 's' }} for "{{ searchQuery }}"
              </span>
            </div>
          </div>
        </template>
      </Card>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="space-y-6">
      <Card v-for="i in 3" :key="i" class="animate-pulse">
        <template #content>
          <div class="space-y-4">
            <div class="h-6 bg-gray-200 rounded w-3/4" />
            <div class="h-4 bg-gray-200 rounded w-1/2" />
            <div class="h-4 bg-gray-200 rounded" />
            <div class="h-4 bg-gray-200 rounded" />
            <div class="h-4 bg-gray-200 rounded w-2/3" />
          </div>
        </template>
      </Card>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-16">
      <i class="pi pi-exclamation-triangle text-6xl text-red-500 mb-4" />
      <h3 class="text-xl font-semibold mb-2">
        Failed to load blog posts
      </h3>
      <p class="mb-6">
        {{ error.message }}
      </p>
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
                <p class="text-sm mb-4">
                  {{ formatDate(post.created_at) }}
                </p>
                <div class="prose max-w-none">
                  <p>{{ post.body.substring(0, 300) }}{{ post.body.length > 300 ? '...' : '' }}</p>
                </div>
                <div class="mt-4">
                  <Button
                    label="Read More"
                    variant="text"
                    size="small"
                    class="text-primary hover:text-primary-600"
                    @click="$router.push(`/blog/${post.id}`)"
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
        <template v-if="isSearchMode">
          <!-- No Search Results -->
          <i class="pi pi-search text-6xl mb-4 text-gray-400" />
          <h3 class="text-xl font-semibold mb-2">
            No results found
          </h3>
          <p class="mb-6 text-gray-600">
            No blog posts match your search for "{{ searchQuery }}". Try different keywords or browse all posts.
          </p>
          <Button
            label="Clear Search"
            icon="pi pi-times"
            variant="outlined"
            @click="clearSearch"
          />
        </template>
        <template v-else>
          <!-- No Posts at All -->
          <i class="pi pi-file-edit text-6xl mb-4" />
          <h3 class="text-xl font-semibold mb-2">
            No blog posts yet
          </h3>
          <p class="mb-6">
            Get started by creating your first blog post
          </p>
          <Button
            label="Create Your First Post"
            icon="pi pi-plus"
            @click="$router.push('/blog/new')"
          />
        </template>
      </div>
    </div>
  </div>
</template>
