<script setup lang="ts">
// Basic
const selectedCity = ref(null);
const cities = ref([
  { name: 'New York', code: 'NY' },
  { name: 'Rome', code: 'RM' },
  { name: 'London', code: 'LDN' },
  { name: 'Istanbul', code: 'IST' },
  { name: 'Paris', code: 'PRS' },
]);

// Editable
const selectedCountry = ref(null);
const countries = ref([
  { name: 'Australia', code: 'AU' },
  { name: 'Brazil', code: 'BR' },
  { name: 'China', code: 'CN' },
  { name: 'Egypt', code: 'EG' },
  { name: 'France', code: 'FR' },
  { name: 'Germany', code: 'DE' },
  { name: 'India', code: 'IN' },
  { name: 'Japan', code: 'JP' },
  { name: 'Spain', code: 'ES' },
  { name: 'United States', code: 'US' },
]);

// Grouped
const selectedGroupedCity = ref(null);
const groupedCities = ref([
  {
    label: 'Germany',
    code: 'DE',
    items: [
      { label: 'Berlin', value: 'Berlin' },
      { label: 'Frankfurt', value: 'Frankfurt' },
      { label: 'Hamburg', value: 'Hamburg' },
      { label: 'Munich', value: 'Munich' },
    ],
  },
  {
    label: 'USA',
    code: 'US',
    items: [
      { label: 'Chicago', value: 'Chicago' },
      { label: 'Los Angeles', value: 'Los Angeles' },
      { label: 'New York', value: 'New York' },
      { label: 'San Francisco', value: 'San Francisco' },
    ],
  },
  {
    label: 'Japan',
    code: 'JP',
    items: [
      { label: 'Kyoto', value: 'Kyoto' },
      { label: 'Osaka', value: 'Osaka' },
      { label: 'Tokyo', value: 'Tokyo' },
      { label: 'Yokohama', value: 'Yokohama' },
    ],
  },
]);

// Filter
const selectedFilteredCountry = ref(null);

// Custom Template
const selectedTemplateCountry = ref(null);

// States
const selectedDisabled = ref({ name: 'Paris', code: 'PRS' });
const selectedInvalid = ref(null);

// Sizes
const selectedSmall = ref(null);
const selectedNormal = ref(null);
const selectedLarge = ref(null);

// Virtual Scrolling (for large datasets)
const lazyItems = ref(Array.from({ length: 100000 }, (_, i) => ({ label: `Item ${i}`, value: i })));
const selectedLazyItem = ref(null);

// Forms
const selectedFormCity = ref(null);

// Checkmark
const selectedCheckmarkCity = ref(null);

// Clear icon
const selectedClearCity = ref(null);

// Loading state
const isLoading = ref(false);
const selectedLoadingCity = ref(null);

// Filled variant
const selectedFilledCity = ref(null);

// tRPC Backend
const { $trpc } = useNuxtApp();
const selectedCategory = ref(null);
const categories = ref([]);

// tRPC Filterable Products
const selectedFilteredProduct = ref(null);
const filteredProducts = ref([]);
const filterDebounceTimeout = ref(null);

// Load categories on mount
onMounted(async () => {
  try {
    categories.value = await $trpc.getCategories.query();
    // Load initial products
    const result = await $trpc.getFilteredProducts.query({ filter: '' });
    filteredProducts.value = Array.isArray(result) ? result : [];
  } catch (error) {
    console.error('Failed to load data:', error);
    filteredProducts.value = [];
  }
});

// Custom filter function for tRPC backend
async function onFilterProducts(event) {
  // Clear existing timeout
  if (filterDebounceTimeout.value) {
    clearTimeout(filterDebounceTimeout.value);
  }

  // Debounce the API call
  filterDebounceTimeout.value = setTimeout(async () => {
    try {
      const result = await $trpc.getFilteredProducts.query({
        filter: event.value || '',
      });
      filteredProducts.value = Array.isArray(result) ? result : [];
    } catch (error) {
      console.error('Failed to filter products:', error);
      filteredProducts.value = [];
    }
  }, 300);
}
</script>

<template>
  <div class="p-6 lg:p-8 flex flex-col gap-8">
    <!-- Header -->
    <div class="flex flex-col gap-3 border-b border-surface-200 dark:border-surface-700 pb-6">
      <div class="flex items-center gap-3">
        <i class="pi pi-chevron-down text-3xl text-primary-500" />
        <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0">
          Select
        </h1>
      </div>
      <p class="text-surface-600 dark:text-surface-300 max-w-3xl">
        Select is used to choose a single or multiple items from a collection of options with enhanced features like filtering, grouping, and custom templates.
        It provides a user-friendly dropdown interface for option selection.
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
        Select is used with the v-model property for two-way data binding.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <label for="basic-select" class="font-semibold text-surface-900 dark:text-surface-0">City</label>
          <Select
            id="basic-select"
            v-model="selectedCity"
            :options="cities"
            option-label="name"
            placeholder="Select a City"
            class="w-full"
          />
          <small class="text-surface-600 dark:text-surface-300">
            Selected: {{ selectedCity ? selectedCity.name : 'None' }}
          </small>
        </div>
      </div>
    </div>

    <!-- Editable -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Editable
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Select can be made editable to allow custom values in addition to predefined options.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <label for="editable-select" class="font-semibold text-surface-900 dark:text-surface-0">Country</label>
          <Select
            id="editable-select"
            v-model="selectedCountry"
            :options="countries"
            option-label="name"
            placeholder="Select or type a Country"
            editable
            class="w-full"
          />
          <small class="text-surface-600 dark:text-surface-300">
            You can select from options or type a custom value
          </small>
        </div>
      </div>
    </div>

    <!-- Grouped Options -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Grouped Options
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Options can be grouped for better organization using nested data structure.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <label for="grouped-select" class="font-semibold text-surface-900 dark:text-surface-0">City by Country</label>
          <Select
            id="grouped-select"
            v-model="selectedGroupedCity"
            :options="groupedCities"
            option-label="label"
            option-value="value"
            option-group-label="label"
            option-group-children="items"
            placeholder="Select a City"
            class="w-full"
          >
            <template #optiongroup="slotProps">
              <div class="flex items-center gap-2 p-2 font-medium">
                <i class="pi pi-globe text-primary-500" />
                <span>{{ slotProps.option.label }}</span>
              </div>
            </template>
          </Select>
          <small class="text-surface-600 dark:text-surface-300">
            Cities are grouped by country
          </small>
        </div>
      </div>
    </div>

    <!-- Filtering -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Filtering
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Select provides built-in filtering to search through options.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <label for="filter-select" class="font-semibold text-surface-900 dark:text-surface-0">Country (Filterable)</label>
          <Select
            id="filter-select"
            v-model="selectedFilteredCountry"
            :options="countries"
            option-label="name"
            placeholder="Search and select a Country"
            filter
            class="w-full"
          />
          <small class="text-surface-600 dark:text-surface-300">
            Start typing to filter options
          </small>
        </div>
      </div>
    </div>

    <!-- Custom Templates -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Custom Templates
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Options can be customized using templates for richer presentation.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <label for="template-select" class="font-semibold text-surface-900 dark:text-surface-0">Country with Flag</label>
          <Select
            id="template-select"
            v-model="selectedTemplateCountry"
            :options="countries"
            option-label="name"
            placeholder="Select a Country"
            class="w-full"
          >
            <template #value="slotProps">
              <div v-if="slotProps.value" class="flex items-center gap-2">
                <img
                  :alt="slotProps.value.name"
                  src="https://flagicons.lipis.dev/flags/4x3/us.svg"
                  class="w-5 h-4"
                >
                <span>{{ slotProps.value.name }}</span>
              </div>
              <span v-else>{{ slotProps.placeholder }}</span>
            </template>
            <template #option="slotProps">
              <div class="flex items-center gap-2">
                <img
                  :alt="slotProps.option.name"
                  src="https://flagicons.lipis.dev/flags/4x3/us.svg"
                  class="w-5 h-4"
                >
                <span>{{ slotProps.option.name }}</span>
              </div>
            </template>
            <template #header>
              <div class="font-medium p-3 border-b border-surface-200 dark:border-surface-700">
                Available Countries
              </div>
            </template>
            <template #footer>
              <div class="p-3 border-t border-surface-200 dark:border-surface-700">
                <Button label="Add New" fluid severity="secondary" text size="small" icon="pi pi-plus" />
              </div>
            </template>
            <template #dropdownicon>
              <i class="pi pi-map" />
            </template>
          </Select>
          <small class="text-surface-600 dark:text-surface-300">
            Custom templates for value, option, header, footer, and dropdown icon
          </small>
        </div>
      </div>
    </div>

    <!-- Sizes -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Sizes
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Select provides small and large sizes as alternatives to the regular size.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-2">
            <label class="font-semibold text-surface-900 dark:text-surface-0">Small</label>
            <Select
              v-model="selectedSmall"
              :options="cities"
              option-label="name"
              placeholder="Small size"
              size="small"
              class="w-full"
            />
          </div>

          <div class="flex flex-col gap-2">
            <label class="font-semibold text-surface-900 dark:text-surface-0">Normal</label>
            <Select
              v-model="selectedNormal"
              :options="cities"
              option-label="name"
              placeholder="Normal size"
              class="w-full"
            />
          </div>

          <div class="flex flex-col gap-2">
            <label class="font-semibold text-surface-900 dark:text-surface-0">Large</label>
            <Select
              v-model="selectedLarge"
              :options="cities"
              option-label="name"
              placeholder="Large size"
              size="large"
              class="w-full"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- States -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        States
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Different states can be applied to indicate validation status or user interaction constraints.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
          <div class="flex flex-col gap-4">
            <h3 class="font-semibold text-surface-900 dark:text-surface-0">
              Invalid
            </h3>
            <Select
              v-model="selectedInvalid"
              :options="cities"
              option-label="name"
              placeholder="Invalid state"
              invalid
              class="w-full"
            />
            <small class="text-red-500">This field has an error.</small>
          </div>
        </div>

        <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
          <div class="flex flex-col gap-4">
            <h3 class="font-semibold text-surface-900 dark:text-surface-0">
              Disabled
            </h3>
            <Select
              v-model="selectedDisabled"
              :options="cities"
              option-label="name"
              disabled
              class="w-full"
            />
            <small class="text-surface-600 dark:text-surface-300">This field is disabled.</small>
          </div>
        </div>
      </div>
    </div>

    <!-- Forms Integration -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Forms Integration
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Select integrates with form validation and provides error handling.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <label for="form-select" class="font-semibold text-surface-900 dark:text-surface-0">City (Required)</label>
          <Select
            id="form-select"
            v-model="selectedFormCity"
            :options="cities"
            option-label="name"
            :invalid="!selectedFormCity"
            fluid
            placeholder="Select a City"
          />
          <Message v-if="!selectedFormCity" severity="error" size="small">
            City selection is required
          </Message>
          <small class="text-surface-600 dark:text-surface-300">
            Form integration with validation and error messages
          </small>
        </div>
      </div>
    </div>

    <!-- Checkmark Mode -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Checkmark Mode
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Display checkmark for selected option instead of highlighting.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <label for="checkmark-select" class="font-semibold text-surface-900 dark:text-surface-0">City with Checkmark</label>
          <Select
            id="checkmark-select"
            v-model="selectedCheckmarkCity"
            :options="cities"
            option-label="name"
            placeholder="Select a City"
            checkmark
            :highlight-on-select="false"
            class="w-full"
          />
          <small class="text-surface-600 dark:text-surface-300">
            Selected option shows checkmark instead of highlight
          </small>
        </div>
      </div>
    </div>

    <!-- Clear Icon -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Clear Icon
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Add a clear icon to reset the selection.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <label for="clear-select" class="font-semibold text-surface-900 dark:text-surface-0">City with Clear</label>
          <Select
            id="clear-select"
            v-model="selectedClearCity"
            :options="cities"
            option-label="name"
            placeholder="Select a City"
            show-clear
            class="w-full"
          />
          <small class="text-surface-600 dark:text-surface-300">
            Click the X icon to clear selection
          </small>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Loading State
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Display loading indicator while data is being fetched.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-2">
            <label for="loading-select" class="font-semibold text-surface-900 dark:text-surface-0">Loading Example</label>
            <Button
              :label="isLoading ? 'Stop Loading' : 'Start Loading'"
              size="small"
              severity="secondary"
              @click="isLoading = !isLoading"
            />
          </div>
          <Select
            id="loading-select"
            v-model="selectedLoadingCity"
            :options="cities"
            option-label="name"
            placeholder="Loading..."
            :loading="isLoading"
            class="w-full"
          />
          <small class="text-surface-600 dark:text-surface-300">
            Toggle loading state with the button above
          </small>
        </div>
      </div>
    </div>

    <!-- Filled Variant -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Filled Variant
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Use the filled variant for higher visual emphasis.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <label for="filled-select" class="font-semibold text-surface-900 dark:text-surface-0">City (Filled)</label>
          <Select
            id="filled-select"
            v-model="selectedFilledCity"
            :options="cities"
            option-label="name"
            placeholder="Filled variant style"
            variant="filled"
            class="w-full"
          />
          <small class="text-surface-600 dark:text-surface-300">
            Enhanced visual emphasis with filled background
          </small>
        </div>
      </div>
    </div>

    <!-- tRPC Backend -->
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-2">
        <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
          tRPC Backend
        </h2>
        <Tag value="Real API" severity="info" />
      </div>
      <p class="text-surface-600 dark:text-surface-300">
        Select with data loaded from tRPC backend for type-safe API integration.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
          <div class="flex flex-col gap-4">
            <label for="trpc-select" class="font-semibold text-surface-900 dark:text-surface-0">Category</label>
            <Select
              id="trpc-select"
              v-model="selectedCategory"
              :options="categories"
              option-label="name"
              placeholder="Select a Category"
              class="w-full"
            >
              <template #option="slotProps">
                <div class="flex flex-col p-2">
                  <span class="font-medium">{{ slotProps.option.name }}</span>
                  <small class="text-surface-500">{{ slotProps.option.description }}</small>
                </div>
              </template>
            </Select>
            <small class="text-surface-600 dark:text-surface-300">
              Selected: {{ selectedCategory ? `${selectedCategory.name} - ${selectedCategory.description}` : 'None' }}
            </small>
            <small class="text-surface-500 dark:text-surface-400">
              Static data from tRPC backend
            </small>
          </div>
        </div>

        <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
          <div class="flex flex-col gap-4">
            <label for="trpc-filtered-select" class="font-semibold text-surface-900 dark:text-surface-0">Product (Filtered)</label>
            <Select
              id="trpc-filtered-select"
              v-model="selectedFilteredProduct"
              :options="filteredProducts"
              option-label="name"
              placeholder="Search products..."
              filter
              class="w-full"
              @filter="onFilterProducts"
            >
              <template #option="slotProps">
                <div class="flex items-center justify-between p-2 w-full">
                  <div class="flex flex-col">
                    <span class="font-medium">{{ slotProps.option.name }}</span>
                    <small class="text-surface-500">{{ slotProps.option.category }} • Stock: {{ slotProps.option.stock }}</small>
                  </div>
                  <span class="font-semibold text-primary-500">${{ slotProps.option.price }}</span>
                </div>
              </template>
            </Select>
            <small class="text-surface-600 dark:text-surface-300">
              Selected: {{ selectedFilteredProduct ? `${selectedFilteredProduct.name} - $${selectedFilteredProduct.price}` : 'None' }}
            </small>
            <small class="text-surface-500 dark:text-surface-400">
              Dynamic filtering via tRPC backend calls
            </small>
          </div>
        </div>
      </div>
    </div>

    <!-- Virtual Scrolling -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Virtual Scrolling
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Virtual scrolling is used to render large datasets efficiently without performance issues.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <label for="virtual-select" class="font-semibold text-surface-900 dark:text-surface-0">Large Dataset (100k items)</label>
          <Select
            id="virtual-select"
            v-model="selectedLazyItem"
            :options="lazyItems"
            option-label="label"
            placeholder="Select from 100k items"
            filter
            :virtual-scroller-options="{ itemSize: 38 }"
            class="w-full"
          />
          <small class="text-surface-600 dark:text-surface-300">
            Efficiently renders large datasets using virtual scrolling
          </small>
        </div>
      </div>
    </div>
  </div>
</template>
