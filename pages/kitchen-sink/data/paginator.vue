<script setup lang="ts">
// Basic pagination state
const basicFirst = ref(0);
const basicRows = ref(10);
const basicTotal = ref(120);

// Template example state  
const templateFirst = ref(0);
const templateRows = ref(1);
const templateTotal = ref(12);

// Current page report state
const reportFirst = ref(0);
const reportRows = ref(10);
const reportTotal = ref(120);

// Responsive state
const responsiveFirst = ref(0);
const responsiveRows = ref(10);
const responsiveTotal = ref(120);

// Custom content state
const customFirst = ref(0);
const customRows = ref(10);
const customTotal = ref(120);

// Headless state
const headlessFirst = ref(0);
const headlessRows = ref(10);
const headlessTotal = ref(120);

// Data simulation state
const dataFirst = ref(0);
const dataRows = ref(5);
const dataTotal = ref(50);

// Simulated data for pagination example
const allData = ref(Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
  description: `Description for item ${i + 1}`,
  category: ['Electronics', 'Books', 'Clothing', 'Sports', 'Home'][i % 5],
  price: Math.floor(Math.random() * 500) + 50,
  status: ['Active', 'Inactive', 'Pending'][i % 3]
})));

// Computed data for current page
const currentPageData = computed(() => {
  const start = dataFirst.value;
  const end = start + dataRows.value;
  return allData.value.slice(start, end);
});

// Event handlers
function onPageChange(event) {
  dataFirst.value = event.first;
  dataRows.value = event.rows;
}

function onBasicPageChange(event) {
  basicFirst.value = event.first;
  basicRows.value = event.rows;
}

function onTemplatePageChange(event) {
  templateFirst.value = event.first;
  templateRows.value = event.rows;
}

function onReportPageChange(event) {
  reportFirst.value = event.first;
  reportRows.value = event.rows;
}

function onResponsivePageChange(event) {
  responsiveFirst.value = event.first;
  responsiveRows.value = event.rows;
}

function onCustomPageChange(event) {
  customFirst.value = event.first;
  customRows.value = event.rows;
}

function onHeadlessPageChange(event) {
  headlessFirst.value = event.first;
  headlessRows.value = event.rows;
}

// Utility functions
function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value);
}

function getSeverity(status) {
  switch (status) {
    case 'Active':
      return 'success';
    case 'Inactive':
      return 'danger';
    case 'Pending':
      return 'warn';
    default:
      return null;
  }
}
</script>

<template>
  <div class="p-6 lg:p-8 flex flex-col gap-8">
    <!-- Header -->
    <div class="flex flex-col gap-3 border-b border-surface-200 dark:border-surface-700 pb-6">
      <div class="flex items-center gap-3">
        <i class="pi pi-angle-double-right text-3xl text-primary-500" />
        <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0">
          Paginator
        </h1>
      </div>
      <p class="text-surface-600 dark:text-surface-300 max-w-3xl">
        Paginator displays data in paged format and provides navigation between pages. It offers extensive customization options including templates, responsive behavior, and accessibility features.
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
        Paginator is used as a controlled component with first and rows properties to manage the first index and number of records to display per page.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <div class="text-sm text-surface-600 dark:text-surface-300">
            Current state: First = {{ basicFirst }}, Rows = {{ basicRows }}, Total = {{ basicTotal }}
          </div>
          <Paginator 
            v-model:first="basicFirst"
            :rows="basicRows" 
            :totalRecords="basicTotal" 
            :rowsPerPageOptions="[5, 10, 20, 30]"
            @page="onBasicPageChange"
          />
        </div>
      </div>
    </div>

    <!-- Template -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Template
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Paginator elements can be customized using the template property with predefined keys for different elements.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <Paginator 
            v-model:first="templateFirst" 
            :rows="templateRows" 
            :totalRecords="templateTotal" 
            template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            @page="onTemplatePageChange"
          />
          
          <div class="p-4 text-center border border-surface-200 dark:border-surface-700 rounded-lg">
            <div class="flex items-center justify-center w-full h-48 bg-surface-100 dark:bg-surface-700 rounded-lg">
              <div class="text-center">
                <i class="pi pi-image text-6xl text-surface-400 mb-4" />
                <div class="text-xl font-semibold text-surface-600 dark:text-surface-300">
                  Image {{ templateFirst + 1 }} of {{ templateTotal }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Current Page Report -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Current Page Report
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Current page report displays information about the pagination state with customizable placeholders.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-6">
          <!-- Default Report -->
          <div>
            <h4 class="font-semibold text-surface-900 dark:text-surface-0 mb-3">Default Report Template</h4>
            <Paginator 
              v-model:first="reportFirst"
              :rows="reportRows" 
              :totalRecords="reportTotal" 
              template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
              @page="onReportPageChange"
            />
          </div>

          <!-- Custom Report -->
          <div>
            <h4 class="font-semibold text-surface-900 dark:text-surface-0 mb-3">Custom Report Template</h4>
            <Paginator 
              v-model:first="reportFirst"
              :rows="reportRows" 
              :totalRecords="reportTotal" 
              template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
              @page="onReportPageChange"
            />
          </div>

          <!-- Extended Report -->
          <div>
            <h4 class="font-semibold text-surface-900 dark:text-surface-0 mb-3">Extended Report Template</h4>
            <Paginator 
              v-model:first="reportFirst"
              :rows="reportRows" 
              :totalRecords="reportTotal" 
              template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
              currentPageReportTemplate="Page {currentPage} of {totalPages} | {first}-{last} of {totalRecords} records | {rows} per page"
              @page="onReportPageChange"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Responsive -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Responsive
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Paginator elements can be customized per screen size by defining templates per breakpoint.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <div class="text-sm text-surface-600 dark:text-surface-300">
            Resize your browser to see different templates:
            <ul class="list-disc list-inside mt-2 ml-4">
              <li>Mobile (≤640px): Previous, Current Report, Next</li>
              <li>Tablet (≤960px): First, Previous, Current Report, Next, Last</li>
              <li>Desktop (≤1300px): First, Previous, Page Links, Next, Last</li>
              <li>Large (>1300px): Full template with Jump controls</li>
            </ul>
          </div>
          
          <Paginator
            v-model:first="responsiveFirst"
            :template="{
              '640px': 'PrevPageLink CurrentPageReport NextPageLink',
              '960px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
              '1300px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
              default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageDropdown JumpToPageInput'
            }"
            :rows="responsiveRows"
            :totalRecords="responsiveTotal"
            @page="onResponsivePageChange"
          />
        </div>
      </div>
    </div>

    <!-- Custom Content -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Custom Content
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Custom content can be added to the start and end of the paginator using slots.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <Paginator 
          v-model:first="customFirst"
          :rows="customRows" 
          :totalRecords="customTotal" 
          :rowsPerPageOptions="[5, 10, 20, 30]"
          @page="onCustomPageChange"
        >
          <template #start="slotProps">
            <div class="flex items-center gap-3 text-sm text-surface-600 dark:text-surface-300">
              <span>Page: {{ slotProps.state.page + 1 }}</span>
              <span>First: {{ slotProps.state.first }}</span>
              <span>Rows: {{ slotProps.state.rows }}</span>
            </div>
          </template>
          <template #end>
            <div class="flex items-center gap-2">
              <Button icon="pi pi-search" variant="text" size="small" />
              <Button icon="pi pi-download" variant="text" size="small" />
              <Button icon="pi pi-refresh" variant="text" size="small" />
            </div>
          </template>
        </Paginator>
      </div>
    </div>

    <!-- Headless -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Headless
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Headless mode allows you to implement the entire UI using the container slot for complete customization.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-6">
          <!-- Custom Rounded Design -->
          <div>
            <h4 class="font-semibold text-surface-900 dark:text-surface-0 mb-3">Custom Rounded Design</h4>
            <Paginator 
              v-model:first="headlessFirst"
              :rows="headlessRows" 
              :totalRecords="headlessTotal"
              @page="onHeadlessPageChange"
            >
              <template #container="{ first, last, page, pageCount, prevPageCallback, nextPageCallback, totalRecords }">
                <div class="flex items-center gap-4 border border-primary bg-transparent rounded-full w-full py-1 px-2 justify-between">
                  <Button 
                    icon="pi pi-chevron-left" 
                    rounded 
                    variant="text" 
                    @click="prevPageCallback" 
                    :disabled="page === 0" 
                  />
                  <div class="text-color font-medium">
                    <span class="hidden sm:block">Showing {{ first + 1 }} to {{ last }} of {{ totalRecords }}</span>
                    <span class="block sm:hidden">Page {{ page + 1 }} of {{ pageCount }}</span>
                  </div>
                  <Button 
                    icon="pi pi-chevron-right" 
                    rounded 
                    variant="text" 
                    @click="nextPageCallback" 
                    :disabled="page === pageCount - 1" 
                  />
                </div>
              </template>
            </Paginator>
          </div>

          <!-- Card Style Design -->
          <div>
            <h4 class="font-semibold text-surface-900 dark:text-surface-0 mb-3">Card Style Design</h4>
            <Paginator 
              v-model:first="headlessFirst"
              :rows="headlessRows" 
              :totalRecords="headlessTotal"
              @page="onHeadlessPageChange"
            >
              <template #container="{ first, last, page, pageCount, prevPageCallback, nextPageCallback, firstPageCallback, lastPageCallback, totalRecords }">
                <div class="bg-surface-50 dark:bg-surface-800 rounded-lg p-4">
                  <div class="flex items-center justify-between mb-3">
                    <div class="text-sm font-medium text-surface-900 dark:text-surface-0">
                      Page {{ page + 1 }} of {{ pageCount }}
                    </div>
                    <div class="text-sm text-surface-600 dark:text-surface-300">
                      {{ totalRecords }} total records
                    </div>
                  </div>
                  <div class="flex items-center justify-center gap-2">
                    <Button 
                      icon="pi pi-angle-double-left" 
                      variant="outlined" 
                      size="small"
                      @click="firstPageCallback" 
                      :disabled="page === 0" 
                    />
                    <Button 
                      icon="pi pi-angle-left" 
                      variant="outlined" 
                      size="small"
                      @click="prevPageCallback" 
                      :disabled="page === 0" 
                    />
                    <div class="px-4 py-2 bg-primary text-primary-contrast rounded font-medium text-sm">
                      {{ page + 1 }}
                    </div>
                    <Button 
                      icon="pi pi-angle-right" 
                      variant="outlined" 
                      size="small"
                      @click="nextPageCallback" 
                      :disabled="page === pageCount - 1" 
                    />
                    <Button 
                      icon="pi pi-angle-double-right" 
                      variant="outlined" 
                      size="small"
                      @click="lastPageCallback" 
                      :disabled="page === pageCount - 1" 
                    />
                  </div>
                  <div class="flex items-center justify-center mt-3">
                    <div class="text-xs text-surface-500 dark:text-surface-400">
                      Showing {{ first + 1 }} to {{ Math.min(first + headlessRows, totalRecords) }} of {{ totalRecords }}
                    </div>
                  </div>
                </div>
              </template>
            </Paginator>
          </div>
        </div>
      </div>
    </div>

    <!-- Data Integration Example -->
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-2">
        <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
          Data Integration
        </h2>
        <Tag value="Real Example" severity="info" />
      </div>
      <p class="text-surface-600 dark:text-surface-300">
        Complete example showing paginator working with actual data display and navigation.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-6">
          <!-- Data Display -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            <div 
              v-for="item in currentPageData" 
              :key="item.id"
              class="p-4 border border-surface-200 dark:border-surface-700 rounded-lg bg-surface-0 dark:bg-surface-900"
            >
              <div class="flex items-start justify-between mb-3">
                <div class="font-medium text-surface-900 dark:text-surface-0">
                  {{ item.name }}
                </div>
                <Tag :value="item.status" :severity="getSeverity(item.status)" size="small" />
              </div>
              <div class="text-sm text-surface-600 dark:text-surface-300 mb-2">
                {{ item.description }}
              </div>
              <div class="flex items-center justify-between">
                <span class="text-xs text-surface-500 dark:text-surface-400">
                  {{ item.category }}
                </span>
                <span class="font-semibold text-primary-600 dark:text-primary-400">
                  {{ formatCurrency(item.price) }}
                </span>
              </div>
            </div>
          </div>

          <!-- Paginator -->
          <div class="border-t border-surface-200 dark:border-surface-700 pt-4">
            <Paginator 
              v-model:first="dataFirst"
              :rows="dataRows" 
              :totalRecords="dataTotal" 
              :rowsPerPageOptions="[5, 10, 15, 20]"
              template="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords} items"
              @page="onPageChange"
            />
          </div>

          <!-- Statistics -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-surface-200 dark:border-surface-700">
            <div class="text-center p-3 bg-surface-50 dark:bg-surface-800 rounded-lg">
              <div class="text-lg font-bold text-surface-900 dark:text-surface-0">{{ dataTotal }}</div>
              <div class="text-xs text-surface-600 dark:text-surface-300">Total Items</div>
            </div>
            <div class="text-center p-3 bg-surface-50 dark:bg-surface-800 rounded-lg">
              <div class="text-lg font-bold text-surface-900 dark:text-surface-0">{{ Math.ceil(dataTotal / dataRows) }}</div>
              <div class="text-xs text-surface-600 dark:text-surface-300">Total Pages</div>
            </div>
            <div class="text-center p-3 bg-surface-50 dark:bg-surface-800 rounded-lg">
              <div class="text-lg font-bold text-surface-900 dark:text-surface-0">{{ Math.floor(dataFirst / dataRows) + 1 }}</div>
              <div class="text-xs text-surface-600 dark:text-surface-300">Current Page</div>
            </div>
            <div class="text-center p-3 bg-surface-50 dark:bg-surface-800 rounded-lg">
              <div class="text-lg font-bold text-surface-900 dark:text-surface-0">{{ dataRows }}</div>
              <div class="text-xs text-surface-600 dark:text-surface-300">Items Per Page</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Template Elements Reference -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Template Elements Reference
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Available template elements that can be used in any order to customize the paginator.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 class="font-semibold text-surface-900 dark:text-surface-0 mb-3">Navigation Elements</h4>
            <ul class="space-y-2 text-sm">
              <li class="flex items-center gap-2">
                <code class="px-2 py-1 bg-surface-100 dark:bg-surface-800 rounded text-xs">FirstPageLink</code>
                <span class="text-surface-600 dark:text-surface-300">First page navigation</span>
              </li>
              <li class="flex items-center gap-2">
                <code class="px-2 py-1 bg-surface-100 dark:bg-surface-800 rounded text-xs">PrevPageLink</code>
                <span class="text-surface-600 dark:text-surface-300">Previous page navigation</span>
              </li>
              <li class="flex items-center gap-2">
                <code class="px-2 py-1 bg-surface-100 dark:bg-surface-800 rounded text-xs">PageLinks</code>
                <span class="text-surface-600 dark:text-surface-300">Page number links</span>
              </li>
              <li class="flex items-center gap-2">
                <code class="px-2 py-1 bg-surface-100 dark:bg-surface-800 rounded text-xs">NextPageLink</code>
                <span class="text-surface-600 dark:text-surface-300">Next page navigation</span>
              </li>
              <li class="flex items-center gap-2">
                <code class="px-2 py-1 bg-surface-100 dark:bg-surface-800 rounded text-xs">LastPageLink</code>
                <span class="text-surface-600 dark:text-surface-300">Last page navigation</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 class="font-semibold text-surface-900 dark:text-surface-0 mb-3">Control Elements</h4>
            <ul class="space-y-2 text-sm">
              <li class="flex items-center gap-2">
                <code class="px-2 py-1 bg-surface-100 dark:bg-surface-800 rounded text-xs">RowsPerPageDropdown</code>
                <span class="text-surface-600 dark:text-surface-300">Rows per page selector</span>
              </li>
              <li class="flex items-center gap-2">
                <code class="px-2 py-1 bg-surface-100 dark:bg-surface-800 rounded text-xs">JumpToPageDropdown</code>
                <span class="text-surface-600 dark:text-surface-300">Jump to page selector</span>
              </li>
              <li class="flex items-center gap-2">
                <code class="px-2 py-1 bg-surface-100 dark:bg-surface-800 rounded text-xs">JumpToPageInput</code>
                <span class="text-surface-600 dark:text-surface-300">Jump to page input</span>
              </li>
              <li class="flex items-center gap-2">
                <code class="px-2 py-1 bg-surface-100 dark:bg-surface-800 rounded text-xs">CurrentPageReport</code>
                <span class="text-surface-600 dark:text-surface-300">Current page information</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-lg">
          <h5 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">Default Template</h5>
          <code class="text-sm text-blue-800 dark:text-blue-200">
            "FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          </code>
        </div>
      </div>
    </div>
  </div>
</template>