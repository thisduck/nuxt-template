<script setup lang="ts">
// tRPC Backend Integration
const { $trpc } = useNuxtApp();

// Basic products data for examples
const basicProducts = ref([
  { 
    id: 1, 
    name: 'iPhone 15 Pro', 
    category: 'Smartphone', 
    price: 999, 
    rating: 4.8, 
    inventoryStatus: 'INSTOCK',
    image: 'iphone-15-pro.jpg',
    description: 'Latest iPhone with advanced camera system and titanium design'
  },
  { 
    id: 2, 
    name: 'MacBook Pro', 
    category: 'Laptop', 
    price: 2499, 
    rating: 4.9, 
    inventoryStatus: 'INSTOCK',
    image: 'macbook-pro.jpg',
    description: 'Powerful laptop for professional work and creative tasks'
  },
  { 
    id: 3, 
    name: 'AirPods Pro', 
    category: 'Audio', 
    price: 249, 
    rating: 4.5, 
    inventoryStatus: 'LOWSTOCK',
    image: 'airpods-pro.jpg',
    description: 'Noise-cancelling wireless earbuds with spatial audio'
  },
  { 
    id: 4, 
    name: 'iPad Air', 
    category: 'Tablet', 
    price: 599, 
    rating: 4.6, 
    inventoryStatus: 'OUTOFSTOCK',
    image: 'ipad-air.jpg',
    description: 'Versatile tablet for creativity and productivity'
  },
  { 
    id: 5, 
    name: 'Apple Watch', 
    category: 'Wearable', 
    price: 399, 
    rating: 4.4, 
    inventoryStatus: 'INSTOCK',
    image: 'apple-watch.jpg',
    description: 'Advanced health and fitness tracking with smart features'
  },
  { 
    id: 6, 
    name: 'Sony Headphones', 
    category: 'Audio', 
    price: 299, 
    rating: 4.7, 
    inventoryStatus: 'INSTOCK',
    image: 'sony-headphones.jpg',
    description: 'Premium noise-cancelling over-ear headphones'
  }
]);

// Layout options
const layout = ref('list');
const layoutOptions = ref(['list', 'grid']);

// Sorting
const sortKey = ref();
const sortOrder = ref();
const sortField = ref();
const sortOptions = ref([
  { label: 'Price High to Low', value: '!price' },
  { label: 'Price Low to High', value: 'price' },
  { label: 'Name A-Z', value: 'name' },
  { label: 'Name Z-A', value: '!name' }
]);

// Loading state
const isLoading = ref(false);
const showSkeleton = ref(false);

// API Products with server-side pagination
const apiProducts = ref([]);
const isLoadingApi = ref(false);
const totalRecords = ref(0);
const currentPage = ref(0);
const pageSize = ref(6);
const apiSortField = ref('');
const apiSortOrder = ref(0);
const searchQuery = ref('');

// Utility functions
function getSeverity(product) {
  switch (product.inventoryStatus) {
    case 'INSTOCK':
      return 'success';
    case 'LOWSTOCK':
      return 'warn';
    case 'OUTOFSTOCK':
      return 'danger';
    default:
      return null;
  }
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value);
}

// Sort change handler
function onSortChange(event) {
  const value = event.value.value;
  const sortValue = event.value;

  if (value.indexOf('!') === 0) {
    sortOrder.value = -1;
    sortField.value = value.substring(1, value.length);
    sortKey.value = sortValue;
  } else {
    sortOrder.value = 1;
    sortField.value = value;
    sortKey.value = sortValue;
  }
}

// Toggle skeleton loading
function toggleSkeleton() {
  showSkeleton.value = !showSkeleton.value;
}

// Load API products with server-side pagination
async function loadApiProducts() {
  isLoadingApi.value = true;
  try {
    const result = await $trpc.getFilteredProducts.query({
      filter: searchQuery.value || undefined,
      page: currentPage.value,
      size: pageSize.value,
      sortField: apiSortField.value || undefined,
      sortOrder: apiSortOrder.value || undefined
    });
    
    apiProducts.value = result.data.map(product => ({
      ...product,
      inventoryStatus: product.stock > 50 ? 'INSTOCK' : product.stock > 20 ? 'LOWSTOCK' : 'OUTOFSTOCK',
      image: `${product.category.toLowerCase()}-${product.id}.jpg`,
      rating: (Math.random() * 2 + 3).toFixed(1), // Random rating between 3-5
      description: `Premium ${product.name} in ${product.category} category`
    }));
    
    totalRecords.value = result.totalRecords;
  } catch (error) {
    console.error('Failed to load products:', error);
  } finally {
    isLoadingApi.value = false;
  }
}

// Pagination event handler
async function onApiPageChange(event) {
  currentPage.value = event.page;
  pageSize.value = event.rows;
  await loadApiProducts();
}

// Search handler
async function onApiSearch() {
  currentPage.value = 0; // Reset to first page when searching
  await loadApiProducts();
}

// Sort handler for API products
async function onApiSortChange(event) {
  const value = event.value.value;
  
  if (value.indexOf('!') === 0) {
    apiSortOrder.value = -1;
    apiSortField.value = value.substring(1, value.length);
  } else {
    apiSortOrder.value = 1;
    apiSortField.value = value;
  }
  
  currentPage.value = 0; // Reset to first page when sorting
  await loadApiProducts();
}

// Add to wishlist
function addToWishlist(product) {
  console.log('Added to wishlist:', product.name);
}

// Buy product
function buyProduct(product) {
  console.log('Buying product:', product.name);
}

// Load API data on mount
onMounted(() => {
  loadApiProducts();
});
</script>

<template>
  <div class="p-6 lg:p-8 flex flex-col gap-8">
    <!-- Header -->
    <div class="flex flex-col gap-3 border-b border-surface-200 dark:border-surface-700 pb-6">
      <div class="flex items-center gap-3">
        <i class="pi pi-list text-3xl text-primary-500" />
        <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0">
          DataView
        </h1>
      </div>
      <p class="text-surface-600 dark:text-surface-300 max-w-3xl">
        DataView displays data in grid or list layout with pagination and sorting features. It provides flexible content presentation with customizable templates for different display modes.
      </p>
    </div>

    <!-- Basic -->
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-2">
        <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
          Basic
        </h2>
        <Tag value="Most Common" severity="success" />
      </div>
      <p class="text-surface-600 dark:text-surface-300">
        DataView requires a value as data to display along with a list slot for item content.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <DataView :value="basicProducts.slice(0, 3)">
          <template #list="slotProps">
            <div class="flex flex-col">
              <div v-for="(item, index) in slotProps.items" :key="index">
                <div class="flex flex-col sm:flex-row sm:items-center p-6 gap-4" :class="{ 'border-t border-surface-200 dark:border-surface-700': index !== 0 }">
                  <div class="md:w-40 relative">
                    <div class="flex items-center justify-center w-full h-32 bg-surface-100 dark:bg-surface-700 rounded-lg">
                      <i class="pi pi-image text-4xl text-surface-400" />
                    </div>
                    <div class="absolute bg-black/70 rounded-border" style="left: 4px; top: 4px">
                      <Tag :value="item.inventoryStatus" :severity="getSeverity(item)" />
                    </div>
                  </div>
                  <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
                    <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                      <div>
                        <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{ item.category }}</span>
                        <div class="text-lg font-medium mt-2">{{ item.name }}</div>
                      </div>
                      <div class="bg-surface-100 p-1" style="border-radius: 30px">
                        <div class="bg-surface-0 flex items-center gap-2 justify-center py-1 px-2" style="border-radius: 30px; box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)">
                          <span class="text-surface-900 font-medium text-sm">{{ item.rating }}</span>
                          <i class="pi pi-star-fill text-yellow-500" />
                        </div>
                      </div>
                    </div>
                    <div class="flex flex-col md:items-end gap-8">
                      <span class="text-xl font-semibold">{{ formatCurrency(item.price) }}</span>
                      <div class="flex flex-row-reverse md:flex-row gap-2">
                        <Button icon="pi pi-heart" variant="outlined" @click="addToWishlist(item)" />
                        <Button 
                          icon="pi pi-shopping-cart" 
                          label="Buy Now" 
                          :disabled="item.inventoryStatus === 'OUTOFSTOCK'" 
                          class="flex-auto md:flex-initial whitespace-nowrap"
                          @click="buyProduct(item)"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </DataView>
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Pagination
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Pagination is enabled with the paginator and rows properties for handling large datasets.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <DataView :value="basicProducts" paginator :rows="3">
          <template #list="slotProps">
            <div class="flex flex-col">
              <div v-for="(item, index) in slotProps.items" :key="index">
                <div class="flex flex-col sm:flex-row sm:items-center p-6 gap-4" :class="{ 'border-t border-surface-200 dark:border-surface-700': index !== 0 }">
                  <div class="md:w-40 relative">
                    <div class="flex items-center justify-center w-full h-32 bg-surface-100 dark:bg-surface-700 rounded-lg">
                      <i class="pi pi-image text-4xl text-surface-400" />
                    </div>
                    <div class="absolute bg-black/70 rounded-border" style="left: 4px; top: 4px">
                      <Tag :value="item.inventoryStatus" :severity="getSeverity(item)" />
                    </div>
                  </div>
                  <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
                    <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                      <div>
                        <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{ item.category }}</span>
                        <div class="text-lg font-medium mt-2">{{ item.name }}</div>
                      </div>
                      <div class="bg-surface-100 p-1" style="border-radius: 30px">
                        <div class="bg-surface-0 flex items-center gap-2 justify-center py-1 px-2" style="border-radius: 30px; box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)">
                          <span class="text-surface-900 font-medium text-sm">{{ item.rating }}</span>
                          <i class="pi pi-star-fill text-yellow-500" />
                        </div>
                      </div>
                    </div>
                    <div class="flex flex-col md:items-end gap-8">
                      <span class="text-xl font-semibold">{{ formatCurrency(item.price) }}</span>
                      <div class="flex flex-row-reverse md:flex-row gap-2">
                        <Button icon="pi pi-heart" variant="outlined" @click="addToWishlist(item)" />
                        <Button 
                          icon="pi pi-shopping-cart" 
                          label="Buy Now" 
                          :disabled="item.inventoryStatus === 'OUTOFSTOCK'" 
                          class="flex-auto md:flex-initial whitespace-nowrap"
                          @click="buyProduct(item)"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </DataView>
      </div>
    </div>

    <!-- Sorting -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Sorting
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Built-in sorting is controlled by sortField and sortOrder properties with custom sorting UI.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <DataView :value="basicProducts" :sortOrder="sortOrder" :sortField="sortField">
          <template #header>
            <div class="flex justify-end">
              <Select v-model="sortKey" :options="sortOptions" option-label="label" placeholder="Sort By Price" @change="onSortChange($event)" />
            </div>
          </template>
          <template #list="slotProps">
            <div class="flex flex-col">
              <div v-for="(item, index) in slotProps.items" :key="index">
                <div class="flex flex-col sm:flex-row sm:items-center p-6 gap-4" :class="{ 'border-t border-surface-200 dark:border-surface-700': index !== 0 }">
                  <div class="md:w-40 relative">
                    <div class="flex items-center justify-center w-full h-32 bg-surface-100 dark:bg-surface-700 rounded-lg">
                      <i class="pi pi-image text-4xl text-surface-400" />
                    </div>
                    <div class="absolute bg-black/70 rounded-border" style="left: 4px; top: 4px">
                      <Tag :value="item.inventoryStatus" :severity="getSeverity(item)" />
                    </div>
                  </div>
                  <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
                    <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                      <div>
                        <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{ item.category }}</span>
                        <div class="text-lg font-medium mt-2">{{ item.name }}</div>
                      </div>
                      <div class="bg-surface-100 p-1" style="border-radius: 30px">
                        <div class="bg-surface-0 flex items-center gap-2 justify-center py-1 px-2" style="border-radius: 30px; box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)">
                          <span class="text-surface-900 font-medium text-sm">{{ item.rating }}</span>
                          <i class="pi pi-star-fill text-yellow-500" />
                        </div>
                      </div>
                    </div>
                    <div class="flex flex-col md:items-end gap-8">
                      <span class="text-xl font-semibold">{{ formatCurrency(item.price) }}</span>
                      <div class="flex flex-row-reverse md:flex-row gap-2">
                        <Button icon="pi pi-heart" variant="outlined" @click="addToWishlist(item)" />
                        <Button 
                          icon="pi pi-shopping-cart" 
                          label="Buy Now" 
                          :disabled="item.inventoryStatus === 'OUTOFSTOCK'" 
                          class="flex-auto md:flex-initial whitespace-nowrap"
                          @click="buyProduct(item)"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </DataView>
      </div>
    </div>

    <!-- Layout -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Layout
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        DataView supports list and grid display modes defined with the layout property.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <DataView :value="basicProducts" :layout="layout">
          <template #header>
            <div class="flex justify-end">
              <SelectButton v-model="layout" :options="layoutOptions" :allowEmpty="false">
                <template #option="{ option }">
                  <i :class="[option === 'list' ? 'pi pi-bars' : 'pi pi-table']" />
                </template>
              </SelectButton>
            </div>
          </template>

          <template #list="slotProps">
            <div class="flex flex-col">
              <div v-for="(item, index) in slotProps.items" :key="index">
                <div class="flex flex-col sm:flex-row sm:items-center p-6 gap-4" :class="{ 'border-t border-surface-200 dark:border-surface-700': index !== 0 }">
                  <div class="md:w-40 relative">
                    <div class="flex items-center justify-center w-full h-32 bg-surface-100 dark:bg-surface-700 rounded-lg">
                      <i class="pi pi-image text-4xl text-surface-400" />
                    </div>
                    <div class="absolute bg-black/70 rounded-border" style="left: 4px; top: 4px">
                      <Tag :value="item.inventoryStatus" :severity="getSeverity(item)" />
                    </div>
                  </div>
                  <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
                    <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                      <div>
                        <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{ item.category }}</span>
                        <div class="text-lg font-medium mt-2">{{ item.name }}</div>
                      </div>
                      <div class="bg-surface-100 p-1" style="border-radius: 30px">
                        <div class="bg-surface-0 flex items-center gap-2 justify-center py-1 px-2" style="border-radius: 30px; box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)">
                          <span class="text-surface-900 font-medium text-sm">{{ item.rating }}</span>
                          <i class="pi pi-star-fill text-yellow-500" />
                        </div>
                      </div>
                    </div>
                    <div class="flex flex-col md:items-end gap-8">
                      <span class="text-xl font-semibold">{{ formatCurrency(item.price) }}</span>
                      <div class="flex flex-row-reverse md:flex-row gap-2">
                        <Button icon="pi pi-heart" variant="outlined" @click="addToWishlist(item)" />
                        <Button 
                          icon="pi pi-shopping-cart" 
                          label="Buy Now" 
                          :disabled="item.inventoryStatus === 'OUTOFSTOCK'" 
                          class="flex-auto md:flex-initial whitespace-nowrap"
                          @click="buyProduct(item)"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>

          <template #grid="slotProps">
            <div class="grid grid-cols-12 gap-4">
              <div v-for="(item, index) in slotProps.items" :key="index" class="col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-6 p-2">
                <div class="p-6 border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 rounded flex flex-col">
                  <div class="bg-surface-50 flex justify-center rounded p-4">
                    <div class="relative mx-auto">
                      <div class="flex items-center justify-center w-full h-48 bg-surface-100 dark:bg-surface-700 rounded-lg">
                        <i class="pi pi-image text-6xl text-surface-400" />
                      </div>
                      <div class="absolute bg-black/70 rounded-border" style="left: 4px; top: 4px">
                        <Tag :value="item.inventoryStatus" :severity="getSeverity(item)" />
                      </div>
                    </div>
                  </div>
                  <div class="pt-6">
                    <div class="flex flex-row justify-between items-start gap-2">
                      <div>
                        <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{ item.category }}</span>
                        <div class="text-lg font-medium mt-1">{{ item.name }}</div>
                      </div>
                      <div class="bg-surface-100 p-1" style="border-radius: 30px">
                        <div class="bg-surface-0 flex items-center gap-2 justify-center py-1 px-2" style="border-radius: 30px; box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)">
                          <span class="text-surface-900 font-medium text-sm">{{ item.rating }}</span>
                          <i class="pi pi-star-fill text-yellow-500" />
                        </div>
                      </div>
                    </div>
                    <div class="flex flex-col gap-6 mt-6">
                      <span class="text-2xl font-semibold">{{ formatCurrency(item.price) }}</span>
                      <div class="flex gap-2">
                        <Button 
                          icon="pi pi-shopping-cart" 
                          label="Buy Now" 
                          :disabled="item.inventoryStatus === 'OUTOFSTOCK'" 
                          class="flex-auto whitespace-nowrap"
                          @click="buyProduct(item)"
                        />
                        <Button icon="pi pi-heart" variant="outlined" @click="addToWishlist(item)" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </DataView>
      </div>
    </div>

    <!-- Loading -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Loading States
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        While data is being loaded, Skeleton components and loading spinners are used to indicate the busy state.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-6">
          <!-- Controls -->
          <div class="flex items-center gap-3">
            <Button 
              :label="showSkeleton ? 'Show Data' : 'Show Loading State'" 
              @click="toggleSkeleton"
              icon="pi pi-sync"
            />
            <span class="text-sm text-surface-600 dark:text-surface-300">
              {{ showSkeleton ? 'Currently showing skeleton loading state' : 'Currently showing data' }}
            </span>
          </div>

          <!-- DataView with Loading State -->
          <div class="relative">
            <!-- Loading Overlay -->
            <div v-if="showSkeleton" class="absolute inset-0 bg-surface-0/80 dark:bg-surface-900/80 z-10 flex items-center justify-center rounded-lg">
              <div class="flex flex-col items-center gap-3">
                <i class="pi pi-spin pi-spinner text-4xl text-primary-500" />
                <span class="text-lg font-medium text-surface-700 dark:text-surface-200">Loading products...</span>
              </div>
            </div>

            <!-- DataView Content -->
            <DataView :value="basicProducts.slice(0, 3)" :layout="layout">
              <template #header>
                <div class="flex justify-end">
                  <SelectButton v-model="layout" :options="layoutOptions" :allowEmpty="false">
                    <template #option="{ option }">
                      <i :class="[option === 'list' ? 'pi pi-bars' : 'pi pi-table']" />
                    </template>
                  </SelectButton>
                </div>
              </template>

              <template #list="slotProps">
                <div class="flex flex-col">
                  <!-- Show skeletons when loading -->
                  <template v-if="showSkeleton">
                    <div v-for="i in 3" :key="`skeleton-${i}`">
                      <div class="flex flex-col sm:flex-row sm:items-center p-6 gap-4" :class="{ 'border-t border-surface-200 dark:border-surface-700': i !== 1 }">
                        <!-- Image Skeleton -->
                        <Skeleton class="w-40 h-32 rounded-lg" />
                        
                        <!-- Content Skeleton -->
                        <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
                          <div class="flex flex-col gap-3">
                            <Skeleton width="6rem" height="0.875rem" />
                            <Skeleton width="12rem" height="1.5rem" />
                            <div class="flex items-center gap-2">
                              <Skeleton width="2rem" height="2rem" shape="circle" />
                              <Skeleton width="3rem" height="1rem" />
                            </div>
                          </div>
                          <div class="flex flex-col md:items-end gap-4">
                            <Skeleton width="5rem" height="1.5rem" />
                            <div class="flex gap-2">
                              <Skeleton width="2.5rem" height="2.5rem" shape="circle" />
                              <Skeleton width="7rem" height="2.5rem" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>

                  <!-- Show actual data when not loading -->
                  <template v-else>
                    <div v-for="(item, index) in slotProps.items" :key="index">
                      <div class="flex flex-col sm:flex-row sm:items-center p-6 gap-4" :class="{ 'border-t border-surface-200 dark:border-surface-700': index !== 0 }">
                        <div class="md:w-40 relative">
                          <div class="flex items-center justify-center w-full h-32 bg-surface-100 dark:bg-surface-700 rounded-lg">
                            <i class="pi pi-image text-4xl text-surface-400" />
                          </div>
                          <div class="absolute bg-black/70 rounded-border" style="left: 4px; top: 4px">
                            <Tag :value="item.inventoryStatus" :severity="getSeverity(item)" />
                          </div>
                        </div>
                        <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
                          <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                            <div>
                              <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{ item.category }}</span>
                              <div class="text-lg font-medium mt-2">{{ item.name }}</div>
                            </div>
                            <div class="bg-surface-100 p-1" style="border-radius: 30px">
                              <div class="bg-surface-0 flex items-center gap-2 justify-center py-1 px-2" style="border-radius: 30px; box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)">
                                <span class="text-surface-900 font-medium text-sm">{{ item.rating }}</span>
                                <i class="pi pi-star-fill text-yellow-500" />
                              </div>
                            </div>
                          </div>
                          <div class="flex flex-col md:items-end gap-8">
                            <span class="text-xl font-semibold">{{ formatCurrency(item.price) }}</span>
                            <div class="flex flex-row-reverse md:flex-row gap-2">
                              <Button icon="pi pi-heart" variant="outlined" @click="addToWishlist(item)" />
                              <Button 
                                icon="pi pi-shopping-cart" 
                                label="Buy Now" 
                                :disabled="item.inventoryStatus === 'OUTOFSTOCK'" 
                                class="flex-auto md:flex-initial whitespace-nowrap"
                                @click="buyProduct(item)"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                </div>
              </template>

              <template #grid="slotProps">
                <div class="grid grid-cols-12 gap-4">
                  <!-- Show skeletons when loading -->
                  <template v-if="showSkeleton">
                    <div v-for="i in 3" :key="`skeleton-${i}`" class="col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-6 p-2">
                      <div class="p-6 border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 rounded flex flex-col">
                        <!-- Header Skeleton -->
                        <div class="flex justify-between items-start gap-2 mb-4">
                          <Skeleton width="5rem" height="0.875rem" />
                          <Skeleton width="2rem" height="2rem" shape="circle" />
                        </div>
                        
                        <!-- Image Skeleton -->
                        <div class="bg-surface-50 flex justify-center rounded p-4 mb-4">
                          <Skeleton class="w-full h-48 rounded-lg" />
                        </div>
                        
                        <!-- Content Skeleton -->
                        <div class="flex flex-col gap-3">
                          <Skeleton width="8rem" height="1.25rem" />
                          <Skeleton width="100%" height="0.875rem" />
                          <Skeleton width="75%" height="0.875rem" />
                        </div>
                        
                        <!-- Footer Skeleton -->
                        <div class="mt-6 flex items-center justify-between">
                          <Skeleton width="4rem" height="1.5rem" />
                          <Skeleton width="3rem" height="0.875rem" />
                        </div>
                        
                        <!-- Buttons Skeleton -->
                        <div class="mt-4 flex gap-2">
                          <Skeleton width="100%" height="2.5rem" />
                          <Skeleton width="2.5rem" height="2.5rem" />
                        </div>
                      </div>
                    </div>
                  </template>

                  <!-- Show actual data when not loading -->
                  <template v-else>
                    <div v-for="(item, index) in slotProps.items" :key="index" class="col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-6 p-2">
                      <div class="p-6 border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 rounded flex flex-col">
                        <div class="bg-surface-50 flex justify-center rounded p-4">
                          <div class="relative mx-auto">
                            <div class="flex items-center justify-center w-full h-48 bg-surface-100 dark:bg-surface-700 rounded-lg">
                              <i class="pi pi-image text-6xl text-surface-400" />
                            </div>
                            <div class="absolute bg-black/70 rounded-border" style="left: 4px; top: 4px">
                              <Tag :value="item.inventoryStatus" :severity="getSeverity(item)" />
                            </div>
                          </div>
                        </div>
                        <div class="pt-6">
                          <div class="flex flex-row justify-between items-start gap-2">
                            <div>
                              <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{ item.category }}</span>
                              <div class="text-lg font-medium mt-1">{{ item.name }}</div>
                            </div>
                            <div class="bg-surface-100 p-1" style="border-radius: 30px">
                              <div class="bg-surface-0 flex items-center gap-2 justify-center py-1 px-2" style="border-radius: 30px; box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)">
                                <span class="text-surface-900 font-medium text-sm">{{ item.rating }}</span>
                                <i class="pi pi-star-fill text-yellow-500" />
                              </div>
                            </div>
                          </div>
                          <div class="flex flex-col gap-6 mt-6">
                            <span class="text-2xl font-semibold">{{ formatCurrency(item.price) }}</span>
                            <div class="flex gap-2">
                              <Button 
                                icon="pi pi-shopping-cart" 
                                label="Buy Now" 
                                :disabled="item.inventoryStatus === 'OUTOFSTOCK'" 
                                class="flex-auto whitespace-nowrap"
                                @click="buyProduct(item)"
                              />
                              <Button icon="pi pi-heart" variant="outlined" @click="addToWishlist(item)" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                </div>
              </template>
            </DataView>
          </div>

          <!-- Loading State Examples -->
          <div class="mt-6 p-4 bg-surface-50 dark:bg-surface-800 rounded-lg">
            <h4 class="font-semibold text-surface-900 dark:text-surface-0 mb-3">Additional Loading Patterns</h4>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <!-- Spinner Pattern -->
              <div class="p-4 bg-surface-0 dark:bg-surface-900 rounded-lg border border-surface-200 dark:border-surface-700">
                <h5 class="font-medium mb-3">Spinner</h5>
                <div class="flex items-center justify-center h-20">
                  <i class="pi pi-spin pi-spinner text-3xl text-primary-500" />
                </div>
              </div>

              <!-- Progress Bar Pattern -->
              <div class="p-4 bg-surface-0 dark:bg-surface-900 rounded-lg border border-surface-200 dark:border-surface-700">
                <h5 class="font-medium mb-3">Progress Bar</h5>
                <div class="flex items-center justify-center h-20">
                  <ProgressBar mode="indeterminate" style="height: 6px; width: 100%" />
                </div>
              </div>

              <!-- Pulse Animation -->
              <div class="p-4 bg-surface-0 dark:bg-surface-900 rounded-lg border border-surface-200 dark:border-surface-700">
                <h5 class="font-medium mb-3">Pulse Animation</h5>
                <div class="flex flex-col gap-2">
                  <div class="h-4 bg-surface-200 dark:bg-surface-700 rounded animate-pulse" />
                  <div class="h-4 bg-surface-200 dark:bg-surface-700 rounded animate-pulse w-3/4" />
                  <div class="h-4 bg-surface-200 dark:bg-surface-700 rounded animate-pulse w-1/2" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- tRPC Integration -->
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-2">
        <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
          Real API Integration
        </h2>
        <Tag value="Live Data" severity="info" />
      </div>
      <p class="text-surface-600 dark:text-surface-300">
        DataView with real backend data integration showing products from the tRPC API.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4 mb-6">
          <!-- Header -->
          <div class="flex items-center justify-between">
            <h4 class="font-semibold text-surface-900 dark:text-surface-0">Product Catalog</h4>
            <div class="flex items-center gap-3">
              <div v-if="isLoadingApi" class="flex items-center gap-2">
                <i class="pi pi-spin pi-spinner text-primary-500" />
                <span class="text-sm text-primary-600">Loading...</span>
              </div>
              <Button 
                icon="pi pi-refresh" 
                label="Refresh" 
                severity="secondary" 
                @click="loadApiProducts"
                :loading="isLoadingApi"
              />
            </div>
          </div>
          
          <!-- Search and Sort Controls -->
          <div class="flex flex-col sm:flex-row gap-4">
            <div class="relative flex-1 max-w-sm">
              <i class="pi pi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400" />
              <InputText 
                v-model="searchQuery" 
                placeholder="Search products..." 
                class="pl-10 w-full"
                @keyup.enter="onApiSearch"
              />
            </div>
            <div class="flex gap-2">
              <Button 
                icon="pi pi-search" 
                label="Search" 
                @click="onApiSearch"
                :loading="isLoadingApi"
              />
              <Select 
                v-model="sortKey" 
                :options="sortOptions" 
                option-label="label" 
                placeholder="Sort By..." 
                @change="onApiSortChange($event)" 
                class="min-w-[150px]"
              />
            </div>
          </div>
        </div>

        <DataView 
          :value="apiProducts" 
          :layout="layout" 
          lazy
          paginator 
          :rows="pageSize" 
          :total-records="totalRecords"
          :rows-per-page-options="[3, 6, 9, 12]"
          @page="onApiPageChange">
          <template #header>
            <div class="flex justify-end">
              <SelectButton v-model="layout" :options="layoutOptions" :allowEmpty="false">
                <template #option="{ option }">
                  <i :class="[option === 'list' ? 'pi pi-bars' : 'pi pi-table']" />
                </template>
              </SelectButton>
            </div>
          </template>

          <template #empty>
            <div class="text-center py-8">
              <i class="pi pi-inbox text-4xl text-surface-400 mb-4" />
              <p class="text-surface-500">No products available.</p>
              <Button label="Load Products" icon="pi pi-refresh" @click="loadApiProducts" class="mt-3" />
            </div>
          </template>

          <template #list="slotProps">
            <div class="flex flex-col">
              <div v-for="(item, index) in slotProps.items" :key="index">
                <div class="flex flex-col sm:flex-row sm:items-center p-6 gap-4" :class="{ 'border-t border-surface-200 dark:border-surface-700': index !== 0 }">
                  <div class="md:w-40 relative">
                    <div class="flex items-center justify-center w-full h-32 bg-surface-100 dark:bg-surface-700 rounded-lg">
                      <i class="pi pi-image text-4xl text-surface-400" />
                    </div>
                    <div class="absolute bg-black/70 rounded-border" style="left: 4px; top: 4px">
                      <Tag :value="item.inventoryStatus" :severity="getSeverity(item)" />
                    </div>
                  </div>
                  <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
                    <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                      <div>
                        <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{ item.category }}</span>
                        <div class="text-lg font-medium mt-2">{{ item.name }}</div>
                        <p class="text-sm text-surface-600 dark:text-surface-300 mt-1">{{ item.description }}</p>
                      </div>
                      <div class="bg-surface-100 p-1" style="border-radius: 30px">
                        <div class="bg-surface-0 flex items-center gap-2 justify-center py-1 px-2" style="border-radius: 30px; box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)">
                          <span class="text-surface-900 font-medium text-sm">{{ item.rating }}</span>
                          <i class="pi pi-star-fill text-yellow-500" />
                        </div>
                      </div>
                    </div>
                    <div class="flex flex-col md:items-end gap-8">
                      <span class="text-xl font-semibold">{{ formatCurrency(item.price) }}</span>
                      <div class="flex items-center gap-2 text-sm text-surface-600">
                        <span>Stock: {{ item.stock }}</span>
                      </div>
                      <div class="flex flex-row-reverse md:flex-row gap-2">
                        <Button icon="pi pi-heart" variant="outlined" @click="addToWishlist(item)" />
                        <Button 
                          icon="pi pi-shopping-cart" 
                          label="Buy Now" 
                          :disabled="item.inventoryStatus === 'OUTOFSTOCK'" 
                          class="flex-auto md:flex-initial whitespace-nowrap"
                          @click="buyProduct(item)"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>

          <template #grid="slotProps">
            <div class="grid grid-cols-12 gap-4">
              <div v-for="(item, index) in slotProps.items" :key="index" class="col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-6 p-2">
                <div class="p-6 border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 rounded flex flex-col h-full">
                  <div class="bg-surface-50 flex justify-center rounded p-4 mb-4">
                    <div class="relative mx-auto">
                      <div class="flex items-center justify-center w-full h-48 bg-surface-100 dark:bg-surface-700 rounded-lg">
                        <i class="pi pi-image text-6xl text-surface-400" />
                      </div>
                      <div class="absolute bg-black/70 rounded-border" style="left: 4px; top: 4px">
                        <Tag :value="item.inventoryStatus" :severity="getSeverity(item)" />
                      </div>
                    </div>
                  </div>
                  <div class="flex-1 flex flex-col">
                    <div class="flex flex-row justify-between items-start gap-2 mb-4">
                      <div class="flex-1">
                        <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{ item.category }}</span>
                        <div class="text-lg font-medium mt-1">{{ item.name }}</div>
                        <p class="text-sm text-surface-600 dark:text-surface-300 mt-2">{{ item.description }}</p>
                      </div>
                      <div class="bg-surface-100 p-1" style="border-radius: 30px">
                        <div class="bg-surface-0 flex items-center gap-2 justify-center py-1 px-2" style="border-radius: 30px; box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)">
                          <span class="text-surface-900 font-medium text-sm">{{ item.rating }}</span>
                          <i class="pi pi-star-fill text-yellow-500" />
                        </div>
                      </div>
                    </div>
                    <div class="mt-auto">
                      <div class="flex items-center justify-between mb-4">
                        <span class="text-2xl font-semibold">{{ formatCurrency(item.price) }}</span>
                        <span class="text-sm text-surface-600">Stock: {{ item.stock }}</span>
                      </div>
                      <div class="flex gap-2">
                        <Button 
                          icon="pi pi-shopping-cart" 
                          label="Buy Now" 
                          :disabled="item.inventoryStatus === 'OUTOFSTOCK'" 
                          class="flex-auto whitespace-nowrap"
                          @click="buyProduct(item)"
                        />
                        <Button icon="pi pi-heart" variant="outlined" @click="addToWishlist(item)" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </DataView>

        <!-- Server-side Pagination Status -->
        <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-lg">
          <h5 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">Server-side Pagination Status</h5>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span class="text-blue-800 dark:text-blue-200 font-medium">Current Page:</span>
              <span class="text-blue-600 dark:text-blue-300 ml-1">{{ currentPage + 1 }}</span>
            </div>
            <div>
              <span class="text-blue-800 dark:text-blue-200 font-medium">Page Size:</span>
              <span class="text-blue-600 dark:text-blue-300 ml-1">{{ pageSize }}</span>
            </div>
            <div>
              <span class="text-blue-800 dark:text-blue-200 font-medium">Total Records:</span>
              <span class="text-blue-600 dark:text-blue-300 ml-1">{{ totalRecords }}</span>
            </div>
            <div>
              <span class="text-blue-800 dark:text-blue-200 font-medium">Total Pages:</span>
              <span class="text-blue-600 dark:text-blue-300 ml-1">{{ Math.ceil(totalRecords / pageSize) }}</span>
            </div>
          </div>
          <div class="mt-2 text-xs text-blue-700 dark:text-blue-200">
            <strong>Note:</strong> This DataView uses server-side pagination - each page change triggers a new tRPC network request.
            Open browser DevTools Network tab to see the API calls!
          </div>
        </div>
      </div>
    </div>
  </div>
</template>