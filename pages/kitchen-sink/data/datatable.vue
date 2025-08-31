<script setup lang="ts">
// tRPC Backend Integration
const { $trpc } = useNuxtApp();

// Basic products data
const basicProducts = ref([
  { code: 'P001', name: 'Wireless Headphones', category: 'Electronics', quantity: 45, price: 129.99, status: 'In Stock' },
  { code: 'P002', name: 'Bluetooth Speaker', category: 'Electronics', quantity: 23, price: 89.99, status: 'Low Stock' },
  { code: 'P003', name: 'USB-C Cable', category: 'Accessories', quantity: 156, price: 19.99, status: 'In Stock' },
  { code: 'P004', name: 'Laptop Stand', category: 'Accessories', quantity: 67, price: 49.99, status: 'In Stock' },
  { code: 'P005', name: 'Mechanical Keyboard', category: 'Electronics', quantity: 12, price: 199.99, status: 'Low Stock' }
]);

// Dynamic columns
const dynamicColumns = ref([
  { field: 'code', header: 'Product Code' },
  { field: 'name', header: 'Product Name' },
  { field: 'category', header: 'Category' },
  { field: 'quantity', header: 'Stock' }
]);

// Template products with more data
const templateProducts = ref([
  { 
    id: 1, 
    name: 'iPhone 15 Pro', 
    image: 'iphone-15-pro.jpg',
    price: 999, 
    category: 'Smartphone', 
    rating: 4.8, 
    inventoryStatus: 'In Stock',
    description: 'Latest iPhone with advanced camera system'
  },
  { 
    id: 2, 
    name: 'MacBook Pro', 
    image: 'macbook-pro.jpg',
    price: 2499, 
    category: 'Laptop', 
    rating: 4.9, 
    inventoryStatus: 'In Stock',
    description: 'Powerful laptop for professional work'
  },
  { 
    id: 3, 
    name: 'AirPods Pro', 
    image: 'airpods-pro.jpg',
    price: 249, 
    category: 'Audio', 
    rating: 4.5, 
    inventoryStatus: 'Low Stock',
    description: 'Noise-cancelling wireless earbuds'
  },
  { 
    id: 4, 
    name: 'iPad Air', 
    image: 'ipad-air.jpg',
    price: 599, 
    category: 'Tablet', 
    rating: 4.6, 
    inventoryStatus: 'Out of Stock',
    description: 'Versatile tablet for creativity'
  }
]);

// Size options
const sizeOptions = ref([
  { label: 'Small', value: 'small' },
  { label: 'Normal', value: null },
  { label: 'Large', value: 'large' }
]);
const selectedSize = ref({ label: 'Normal', value: null });

// Pagination data
const paginationCustomers = ref([]);
const isLoadingCustomers = ref(true);

// Filter data - initialize immediately
const filters = ref({
  global: { value: null, matchMode: 'contains' },
  name: { value: null, matchMode: 'contains' },
  category: { value: null, matchMode: 'contains' },
  status: { value: null, matchMode: 'equals' },
  price: { value: null, matchMode: 'equals' }
});

// Safe access to global filter
const globalFilterValue = computed({
  get: () => filters.value?.global?.value || null,
  set: (value) => {
    if (filters.value?.global) {
      filters.value.global.value = value;
    }
  }
});

const statuses = ['In Stock', 'Low Stock', 'Out of Stock'];

// Selection
const selectedProduct = ref(null);
const selectedProducts = ref([]);
const metaKeySelection = ref(true);

// Row expansion
const expandedRows = ref({});
const expandedProducts = ref([
  {
    id: 1,
    name: 'iPhone 15 Pro',
    image: 'iphone-15-pro.jpg',
    price: 999,
    category: 'Smartphone',
    rating: 4.8,
    inventoryStatus: 'In Stock',
    orders: [
      { id: 'ORD-001', customer: 'John Doe', date: '2024-01-15', status: 'Delivered', amount: 999 },
      { id: 'ORD-002', customer: 'Jane Smith', date: '2024-01-20', status: 'Processing', amount: 1998 }
    ]
  },
  {
    id: 2,
    name: 'MacBook Pro',
    image: 'macbook-pro.jpg',
    price: 2499,
    category: 'Laptop',
    rating: 4.9,
    inventoryStatus: 'In Stock',
    orders: [
      { id: 'ORD-003', customer: 'Bob Johnson', date: '2024-01-18', status: 'Shipped', amount: 2499 }
    ]
  }
]);

// Editing
const editingRows = ref([]);

// tRPC Data with server-side pagination and sorting
const apiProducts = ref([]);
const isLoadingApi = ref(false);
const lastApiAction = ref('');
const totalRecords = ref(0);

// Pagination state
const currentPage = ref(0);
const pageSize = ref(10);

// Sorting state
const sortField = ref('');
const sortOrder = ref(0);

// Search state
const searchQuery = ref('');

// Utility functions
function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value);
}

function getSeverity(status) {
  switch (status) {
    case 'In Stock': return 'success';
    case 'Low Stock': return 'warn';
    case 'Out of Stock': return 'danger';
    default: return null;
  }
}

function getSeverityForInventory(product) {
  return getSeverity(product.inventoryStatus);
}

// Row selection handlers
function onRowSelect(event) {
  console.log('Row selected:', event.data);
}

function onRowUnselect(event) {
  console.log('Row unselected:', event.data);
}

function selectRow(data) {
  selectedProduct.value = data;
  console.log('Selected product:', data);
}

// Row expansion handlers
function onRowExpand(event) {
  console.log('Row expanded:', event.data.name);
}

function onRowCollapse(event) {
  console.log('Row collapsed:', event.data.name);
}

function expandAll() {
  expandedRows.value = expandedProducts.value.reduce((acc, product) => {
    acc[product.id] = true;
    return acc;
  }, {});
}

function collapseAll() {
  expandedRows.value = {};
}

// Editing handlers
function onRowEditSave(event) {
  const { newData, index } = event;
  templateProducts.value[index] = newData;
  console.log('Product updated:', newData);
}

function onRowEditCancel(event) {
  console.log('Edit cancelled for:', event.data.name);
}

// Clear filter
function clearFilter() {
  filters.value = {
    global: { value: null, matchMode: 'contains' },
    name: { value: null, matchMode: 'contains' },
    category: { value: null, matchMode: 'contains' },
    status: { value: null, matchMode: 'equals' },
    price: { value: null, matchMode: 'equals' }
  };
}

// Load API data with server-side pagination and sorting
async function loadApiProducts() {
  isLoadingApi.value = true;
  lastApiAction.value = 'Loading products...';
  
  try {
    const result = await $trpc.getFilteredProducts.query({
      filter: searchQuery.value || undefined,
      page: currentPage.value,
      size: pageSize.value,
      sortField: sortField.value || undefined,
      sortOrder: sortOrder.value || undefined
    });
    
    apiProducts.value = result.data.map(product => ({
      ...product,
      status: product.stock > 50 ? 'In Stock' : product.stock > 20 ? 'Low Stock' : 'Out of Stock'
    }));
    
    totalRecords.value = result.totalRecords;
    lastApiAction.value = `Loaded ${result.data.length} of ${result.totalRecords} products (Page ${result.page + 1})`;
  } catch (error) {
    console.error('Failed to load products:', error);
    lastApiAction.value = 'Failed to load products';
  } finally {
    isLoadingApi.value = false;
  }
}

async function refreshApiProducts() {
  await loadApiProducts();
}

// Pagination event handler
function onPage(event) {
  currentPage.value = event.page;
  pageSize.value = event.rows;
  loadApiProducts();
}

// Sort event handler
function onSort(event) {
  sortField.value = event.sortField;
  sortOrder.value = event.sortOrder;
  loadApiProducts();
}

// Search handler
function onSearch() {
  currentPage.value = 0; // Reset to first page when searching
  loadApiProducts();
}

async function addNewProduct() {
  isLoadingApi.value = true;
  lastApiAction.value = 'Adding new product...';
  
  try {
    // Simulate adding a product
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newProduct = {
      id: apiProducts.value.length + 1,
      name: `New Product ${Date.now()}`,
      category: 'Electronics',
      price: Math.floor(Math.random() * 500) + 100,
      stock: Math.floor(Math.random() * 200) + 10,
      status: 'In Stock'
    };
    apiProducts.value.unshift(newProduct);
    lastApiAction.value = 'Product added successfully';
  } catch (error) {
    lastApiAction.value = 'Failed to add product';
  } finally {
    isLoadingApi.value = false;
  }
}

// Load data on mount
onMounted(async () => {
  await loadApiProducts();
  
  // Load pagination customers
  setTimeout(() => {
    paginationCustomers.value = Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      name: `Customer ${i + 1}`,
      country: { name: ['USA', 'Canada', 'UK', 'Germany', 'France'][i % 5] },
      company: `Company ${i + 1}`,
      representative: { name: `Rep ${i % 10 + 1}` },
      status: ['Active', 'Inactive', 'Pending'][i % 3]
    }));
    isLoadingCustomers.value = false;
  }, 1000);
});
</script>

<template>
  <div class="p-6 lg:p-8 flex flex-col gap-8">
    <!-- Header -->
    <div class="flex flex-col gap-3 border-b border-surface-200 dark:border-surface-700 pb-6">
      <div class="flex items-center gap-3">
        <i class="pi pi-table text-3xl text-primary-500" />
        <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0">
          DataTable
        </h1>
      </div>
      <p class="text-surface-600 dark:text-surface-300 max-w-3xl">
        DataTable displays data in tabular format with extensive features including sorting, filtering, pagination, row selection, row expansion, and inline editing. It provides a comprehensive solution for data presentation and manipulation.
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
        DataTable requires a value as data to display and Column components as children for the representation.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <DataTable :value="basicProducts" table-style="min-width: 50rem">
          <Column field="code" header="Code" />
          <Column field="name" header="Name" />
          <Column field="category" header="Category" />
          <Column field="quantity" header="Quantity" />
        </DataTable>
      </div>
    </div>

    <!-- Dynamic Columns -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Dynamic Columns
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Columns can be created programmatically using v-for directive for flexible table structures.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <DataTable :value="basicProducts" table-style="min-width: 50rem">
          <Column v-for="col in dynamicColumns" :key="col.field" :field="col.field" :header="col.header" />
        </DataTable>
      </div>
    </div>

    <!-- Template -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Templates
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Custom content at header, body, and footer sections are supported via templating.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <DataTable :value="templateProducts" table-style="min-width: 50rem">
          <template #header>
            <div class="flex flex-wrap items-center justify-between gap-2">
              <span class="text-xl font-bold">Products</span>
              <Button icon="pi pi-refresh" rounded raised @click="() => {}" />
            </div>
          </template>
          
          <Column field="name" header="Name" />
          
          <Column header="Image">
            <template #body="slotProps">
              <div class="flex items-center justify-center w-16 h-16 bg-surface-100 dark:bg-surface-700 rounded-lg">
                <i class="pi pi-image text-2xl text-surface-400" />
              </div>
            </template>
          </Column>
          
          <Column field="price" header="Price">
            <template #body="slotProps">
              {{ formatCurrency(slotProps.data.price) }}
            </template>
          </Column>
          
          <Column field="category" header="Category" />
          
          <Column field="rating" header="Reviews">
            <template #body="slotProps">
              <Rating :model-value="slotProps.data.rating" readonly />
            </template>
          </Column>
          
          <Column header="Status">
            <template #body="slotProps">
              <Tag :value="slotProps.data.inventoryStatus" :severity="getSeverityForInventory(slotProps.data)" />
            </template>
          </Column>
          
          <template #footer>
            In total there are {{ templateProducts ? templateProducts.length : 0 }} products.
          </template>
        </DataTable>
      </div>
    </div>

    <!-- Size -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Size
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        DataTable provides small and large alternatives to the default size for different content densities.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-3">
            <label class="font-semibold">Size:</label>
            <SelectButton v-model="selectedSize" :options="sizeOptions" option-label="label" />
          </div>
          
          <DataTable :value="basicProducts" :size="selectedSize.value" table-style="min-width: 50rem">
            <Column field="code" header="Code" />
            <Column field="name" header="Name" />
            <Column field="category" header="Category" />
            <Column field="quantity" header="Quantity" />
          </DataTable>
        </div>
      </div>
    </div>

    <!-- Grid Lines -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Grid Lines
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Enabling showGridlines displays borders between cells for better visual separation.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <DataTable :value="basicProducts" show-gridlines table-style="min-width: 50rem">
          <Column field="code" header="Code" />
          <Column field="name" header="Name" />
          <Column field="category" header="Category" />
          <Column field="quantity" header="Quantity" />
        </DataTable>
      </div>
    </div>

    <!-- Striped Rows -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Striped Rows
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Alternating rows are displayed when stripedRows property is present for better readability.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <DataTable :value="basicProducts" striped-rows table-style="min-width: 50rem">
          <Column field="code" header="Code" />
          <Column field="name" header="Name" />
          <Column field="category" header="Category" />
          <Column field="quantity" header="Quantity" />
        </DataTable>
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Pagination
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Large datasets can be paginated with customizable page sizes and navigation controls.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-6">
          <!-- Basic Pagination -->
          <div>
            <h4 class="font-semibold text-surface-900 dark:text-surface-0 mb-3">Basic Pagination</h4>
            <DataTable 
              :value="paginationCustomers" 
              paginator 
              :rows="5" 
              :rows-per-page-options="[5, 10, 20, 50]" 
              table-style="min-width: 50rem"
              :loading="isLoadingCustomers"
            >
              <Column field="name" header="Name" style="width: 25%" />
              <Column field="country.name" header="Country" style="width: 25%" />
              <Column field="company" header="Company" style="width: 25%" />
              <Column field="representative.name" header="Representative" style="width: 25%" />
            </DataTable>
          </div>

          <!-- Custom Paginator Template -->
          <div>
            <h4 class="font-semibold text-surface-900 dark:text-surface-0 mb-3">Custom Paginator Template</h4>
            <DataTable 
              :value="paginationCustomers" 
              paginator 
              :rows="5" 
              :rows-per-page-options="[5, 10, 20, 50]" 
              table-style="min-width: 50rem"
              paginator-template="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
              current-page-report-template="{first} to {last} of {totalRecords}"
            >
              <template #paginatorstart>
                <Button type="button" icon="pi pi-refresh" text />
              </template>
              <template #paginatorend>
                <Button type="button" icon="pi pi-download" text />
              </template>
              
              <Column field="name" header="Name" style="width: 25%" />
              <Column field="country.name" header="Country" style="width: 25%" />
              <Column field="company" header="Company" style="width: 25%" />
              <Column field="status" header="Status" style="width: 25%" />
            </DataTable>
          </div>
        </div>
      </div>
    </div>

    <!-- Sorting -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Sorting
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Columns can be sorted in ascending/descending order with support for single and multiple column sorting.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-6">
          <!-- Single Column Sorting -->
          <div>
            <h4 class="font-semibold text-surface-900 dark:text-surface-0 mb-3">Single Column Sorting</h4>
            <DataTable :value="basicProducts" table-style="min-width: 50rem">
              <Column field="code" header="Code" sortable style="width: 25%" />
              <Column field="name" header="Name" sortable style="width: 25%" />
              <Column field="category" header="Category" sortable style="width: 25%" />
              <Column field="quantity" header="Quantity" sortable style="width: 25%" />
            </DataTable>
          </div>

          <!-- Multiple Column Sorting -->
          <div>
            <h4 class="font-semibold text-surface-900 dark:text-surface-0 mb-3">Multiple Column Sorting (Hold Cmd/Ctrl)</h4>
            <DataTable :value="basicProducts" sort-mode="multiple" table-style="min-width: 50rem">
              <Column field="code" header="Code" sortable style="width: 25%" />
              <Column field="name" header="Name" sortable style="width: 25%" />
              <Column field="category" header="Category" sortable style="width: 25%" />
              <Column field="quantity" header="Quantity" sortable style="width: 25%" />
            </DataTable>
          </div>

          <!-- Removable Sort -->
          <div>
            <h4 class="font-semibold text-surface-900 dark:text-surface-0 mb-3">Removable Sort (Third click removes sort)</h4>
            <DataTable :value="basicProducts" removable-sort table-style="min-width: 50rem">
              <Column field="code" header="Code" sortable style="width: 25%" />
              <Column field="name" header="Name" sortable style="width: 25%" />
              <Column field="category" header="Category" sortable style="width: 25%" />
              <Column field="quantity" header="Quantity" sortable style="width: 25%" />
            </DataTable>
          </div>
        </div>
      </div>
    </div>

    <!-- Basic Filtering -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Filtering
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Data filtering with global search for precise data discovery.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <DataTable 
          v-model:filters="filters" 
          :value="basicProducts" 
          paginator 
          :rows="10" 
          data-key="code" 
          :global-filter-fields="['name', 'category', 'code']"
        >
          <template #header>
            <div class="flex justify-end">
              <div class="relative">
                <i class="pi pi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400" />
                <InputText v-model="globalFilterValue" placeholder="Keyword Search" class="pl-10" />
              </div>
            </div>
          </template>
          
          <template #empty>
            No products found.
          </template>
          
          <Column field="code" header="Code" style="min-width: 12rem" />
          <Column field="name" header="Name" style="min-width: 12rem" />
          <Column field="category" header="Category" style="min-width: 12rem" />
          <Column field="status" header="Status" style="min-width: 12rem">
            <template #body="{ data }">
              <Tag :value="data.status" :severity="getSeverity(data.status)" />
            </template>
          </Column>
        </DataTable>
      </div>
    </div>

    <!-- Row Selection -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Row Selection
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Single and multiple row selection with various interaction modes and event handling.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-6">
          <!-- Single Selection -->
          <div>
            <h4 class="font-semibold text-surface-900 dark:text-surface-0 mb-3">Single Selection</h4>
            <div class="flex items-center gap-3 mb-3">
              <label>Meta Key Selection:</label>
              <ToggleSwitch v-model="metaKeySelection" input-id="meta-key" />
            </div>
            <DataTable 
              v-model:selection="selectedProduct" 
              :value="basicProducts" 
              selection-mode="single" 
              :meta-key-selection="metaKeySelection"
              data-key="code" 
              table-style="min-width: 50rem"
              @row-select="onRowSelect"
              @row-unselect="onRowUnselect"
            >
              <Column field="code" header="Code" />
              <Column field="name" header="Name" />
              <Column field="category" header="Category" />
              <Column field="quantity" header="Quantity" />
            </DataTable>
            
            <div v-if="selectedProduct" class="mt-3 p-3 bg-blue-50 dark:bg-blue-500/10 rounded-lg">
              <small class="text-blue-800 dark:text-blue-200">
                <strong>Selected:</strong> {{ selectedProduct.name }} ({{ selectedProduct.code }})
              </small>
            </div>
          </div>

          <!-- Multiple Selection -->
          <div>
            <h4 class="font-semibold text-surface-900 dark:text-surface-0 mb-3">Multiple Selection</h4>
            <DataTable 
              v-model:selection="selectedProducts" 
              :value="basicProducts" 
              selection-mode="multiple" 
              data-key="code" 
              table-style="min-width: 50rem"
            >
              <Column field="code" header="Code" />
              <Column field="name" header="Name" />
              <Column field="category" header="Category" />
              <Column field="quantity" header="Quantity" />
            </DataTable>
            
            <div v-if="selectedProducts.length > 0" class="mt-3 p-3 bg-green-50 dark:bg-green-500/10 rounded-lg">
              <small class="text-green-800 dark:text-green-200">
                <strong>Selected:</strong> {{ selectedProducts.length }} products
              </small>
            </div>
          </div>

          <!-- Checkbox Selection -->
          <div>
            <h4 class="font-semibold text-surface-900 dark:text-surface-0 mb-3">Checkbox Selection</h4>
            <DataTable 
              v-model:selection="selectedProducts" 
              :value="basicProducts" 
              data-key="code" 
              table-style="min-width: 50rem"
            >
              <Column selection-mode="multiple" header-style="width: 3rem" />
              <Column field="code" header="Code" />
              <Column field="name" header="Name" />
              <Column field="category" header="Category" />
              <Column field="quantity" header="Quantity" />
            </DataTable>
          </div>
        </div>
      </div>
    </div>

    <!-- Row Expansion -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Row Expansion
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Expandable rows to show additional details with nested data tables and custom content.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <DataTable 
          v-model:expanded-rows="expandedRows" 
          :value="expandedProducts" 
          data-key="id"
          @row-expand="onRowExpand" 
          @row-collapse="onRowCollapse" 
          table-style="min-width: 60rem"
        >
          <template #header>
            <div class="flex flex-wrap justify-end gap-2">
              <Button variant="text" icon="pi pi-plus" label="Expand All" @click="expandAll" />
              <Button variant="text" icon="pi pi-minus" label="Collapse All" @click="collapseAll" />
            </div>
          </template>
          
          <Column expander style="width: 5rem" />
          <Column field="name" header="Name" />
          
          <Column header="Image">
            <template #body="slotProps">
              <div class="flex items-center justify-center w-16 h-16 bg-surface-100 dark:bg-surface-700 rounded-lg">
                <i class="pi pi-image text-2xl text-surface-400" />
              </div>
            </template>
          </Column>
          
          <Column field="price" header="Price">
            <template #body="slotProps">
              {{ formatCurrency(slotProps.data.price) }}
            </template>
          </Column>
          
          <Column field="category" header="Category" />
          
          <Column field="rating" header="Reviews">
            <template #body="slotProps">
              <Rating :model-value="slotProps.data.rating" readonly />
            </template>
          </Column>
          
          <Column header="Status">
            <template #body="slotProps">
              <Tag :value="slotProps.data.inventoryStatus" :severity="getSeverityForInventory(slotProps.data)" />
            </template>
          </Column>
          
          <template #expansion="slotProps">
            <div class="p-4">
              <h5 class="font-semibold mb-3">Orders for {{ slotProps.data.name }}</h5>
              <DataTable :value="slotProps.data.orders">
                <Column field="id" header="Order ID" sortable />
                <Column field="customer" header="Customer" sortable />
                <Column field="date" header="Date" sortable />
                <Column field="amount" header="Amount" sortable>
                  <template #body="orderSlot">
                    {{ formatCurrency(orderSlot.data.amount) }}
                  </template>
                </Column>
                <Column field="status" header="Status">
                  <template #body="orderSlot">
                    <Tag :value="orderSlot.data.status" :severity="orderSlot.data.status === 'Delivered' ? 'success' : orderSlot.data.status === 'Processing' ? 'warn' : 'info'" />
                  </template>
                </Column>
              </DataTable>
            </div>
          </template>
        </DataTable>
      </div>
    </div>

    <!-- Inline Editing -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Inline Editing
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Edit data directly within the table with validation and save/cancel operations.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <DataTable 
          :value="templateProducts" 
          edit-mode="row" 
          v-model:editing-rows="editingRows"
          @row-edit-save="onRowEditSave"
          @row-edit-cancel="onRowEditCancel"
          table-style="min-width: 50rem"
        >
          <Column field="name" header="Name">
            <template #editor="{ data, field }">
              <InputText v-model="data[field]" autofocus />
            </template>
          </Column>
          
          <Column field="price" header="Price">
            <template #body="{ data }">
              {{ formatCurrency(data.price) }}
            </template>
            <template #editor="{ data, field }">
              <InputNumber v-model="data[field]" mode="currency" currency="USD" locale="en-US" autofocus />
            </template>
          </Column>
          
          <Column field="category" header="Category">
            <template #editor="{ data, field }">
              <Select v-model="data[field]" :options="['Smartphone', 'Laptop', 'Audio', 'Tablet']" placeholder="Select Category" />
            </template>
          </Column>
          
          <Column field="rating" header="Rating">
            <template #body="{ data }">
              <Rating :model-value="data.rating" readonly />
            </template>
            <template #editor="{ data, field }">
              <Rating v-model="data[field]" />
            </template>
          </Column>
          
          <Column :row-editor="true" style="width: 10%; min-width: 8rem" body-style="text-center" />
        </DataTable>
      </div>
    </div>

    <!-- tRPC Backend Integration -->
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-2">
        <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
          Real-World Data Management
        </h2>
        <Tag value="Real API" severity="info" />
      </div>
      <p class="text-surface-600 dark:text-surface-300">
        DataTable with full CRUD operations, real API integration, and comprehensive data management features.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-6">
          <!-- Actions -->
          <div class="flex flex-wrap items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <h4 class="font-semibold text-surface-900 dark:text-surface-0">Product Management</h4>
              <div v-if="isLoadingApi" class="flex items-center gap-2">
                <i class="pi pi-spin pi-spinner text-primary-500" />
                <span class="text-sm text-primary-600">Loading...</span>
              </div>
            </div>
            <div class="flex gap-2">
              <Button 
                icon="pi pi-refresh" 
                label="Refresh" 
                severity="secondary" 
                @click="refreshApiProducts"
                :loading="isLoadingApi"
              />
              <Button 
                icon="pi pi-plus" 
                label="Add Product" 
                @click="addNewProduct"
                :loading="isLoadingApi"
              />
            </div>
          </div>

          <!-- Search Bar -->
          <div class="flex items-center gap-3 mb-4">
            <div class="relative flex-1 max-w-sm">
              <i class="pi pi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400" />
              <InputText 
                v-model="searchQuery" 
                placeholder="Search products..." 
                class="pl-10 w-full"
                @keyup.enter="onSearch"
              />
            </div>
            <Button 
              icon="pi pi-search" 
              label="Search" 
              @click="onSearch"
            />
            <Button 
              icon="pi pi-times" 
              label="Clear" 
              severity="secondary" 
              @click="() => { searchQuery = ''; onSearch(); }"
            />
          </div>

          <!-- API DataTable with Server-side Operations -->
          <DataTable 
            :value="apiProducts" 
            lazy
            paginator 
            :rows="pageSize" 
            :total-records="totalRecords"
            :loading="isLoadingApi"
            table-style="min-width: 50rem"
            :rows-per-page-options="[5, 10, 20, 50]"
            paginator-template="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            current-page-report-template="Showing {first} to {last} of {totalRecords} products"
            @page="onPage"
            @sort="onSort"
          >
            <template #loading>
              Loading product data. Please wait.
            </template>
            
            <template #empty>
              <div class="text-center py-8">
                <i class="pi pi-inbox text-4xl text-surface-400 mb-4" />
                <p class="text-surface-500">No products found.</p>
                <Button label="Add First Product" icon="pi pi-plus" @click="addNewProduct" class="mt-3" />
              </div>
            </template>

            <Column field="id" header="ID" sortable style="width: 8rem" />
            <Column field="name" header="Product Name" sortable />
            <Column field="category" header="Category" sortable />
            
            <Column field="price" header="Price" sortable>
              <template #body="{ data }">
                {{ formatCurrency(data.price) }}
              </template>
            </Column>
            
            <Column field="stock" header="Stock" sortable>
              <template #body="{ data }">
                <div class="flex items-center gap-2">
                  <span>{{ data.stock }}</span>
                  <Tag 
                    :value="data.stock > 50 ? 'High' : data.stock > 20 ? 'Medium' : 'Low'" 
                    :severity="data.stock > 50 ? 'success' : data.stock > 20 ? 'warn' : 'danger'"
                    size="small"
                  />
                </div>
              </template>
            </Column>
            
            <Column field="status" header="Status">
              <template #body="{ data }">
                <Tag :value="data.status" :severity="getSeverity(data.status)" />
              </template>
            </Column>

            <Column header="Actions" style="width: 10rem">
              <template #body="{ data }">
                <div class="flex gap-2">
                  <Button icon="pi pi-pencil" severity="info" text rounded @click="() => {}" />
                  <Button icon="pi pi-trash" severity="danger" text rounded @click="() => {}" />
                </div>
              </template>
            </Column>
          </DataTable>

          <!-- Status -->
          <div v-if="lastApiAction" class="p-3 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-lg">
            <small class="text-blue-800 dark:text-blue-200">
              <strong>Status:</strong> {{ lastApiAction }}
            </small>
          </div>

          <!-- Summary Stats -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div class="text-center p-4 bg-surface-50 dark:bg-surface-800 rounded-lg">
              <div class="text-2xl font-bold text-surface-900 dark:text-surface-0">{{ apiProducts.length }}</div>
              <div class="text-sm text-surface-600 dark:text-surface-300">Total Products</div>
            </div>
            <div class="text-center p-4 bg-green-50 dark:bg-green-500/10 rounded-lg">
              <div class="text-2xl font-bold text-green-700 dark:text-green-400">
                {{ apiProducts.filter(p => p.status === 'In Stock').length }}
              </div>
              <div class="text-sm text-green-600 dark:text-green-300">In Stock</div>
            </div>
            <div class="text-center p-4 bg-yellow-50 dark:bg-yellow-500/10 rounded-lg">
              <div class="text-2xl font-bold text-yellow-700 dark:text-yellow-400">
                {{ apiProducts.filter(p => p.status === 'Low Stock').length }}
              </div>
              <div class="text-sm text-yellow-600 dark:text-yellow-300">Low Stock</div>
            </div>
            <div class="text-center p-4 bg-red-50 dark:bg-red-500/10 rounded-lg">
              <div class="text-2xl font-bold text-red-700 dark:text-red-400">
                {{ apiProducts.filter(p => p.status === 'Out of Stock').length }}
              </div>
              <div class="text-sm text-red-600 dark:text-red-300">Out of Stock</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>