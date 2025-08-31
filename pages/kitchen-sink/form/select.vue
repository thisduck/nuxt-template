<script setup lang="ts">
// Basic
const selectedCity = ref(null);
const cities = ref([
  { name: 'New York', code: 'NY' },
  { name: 'Rome', code: 'RM' },
  { name: 'London', code: 'LDN' },
  { name: 'Istanbul', code: 'IST' },
  { name: 'Paris', code: 'PRS' }
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
  { name: 'United States', code: 'US' }
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
      { label: 'Munich', value: 'Munich' }
    ]
  },
  {
    label: 'USA',
    code: 'US',
    items: [
      { label: 'Chicago', value: 'Chicago' },
      { label: 'Los Angeles', value: 'Los Angeles' },
      { label: 'New York', value: 'New York' },
      { label: 'San Francisco', value: 'San Francisco' }
    ]
  },
  {
    label: 'Japan',
    code: 'JP',
    items: [
      { label: 'Kyoto', value: 'Kyoto' },
      { label: 'Osaka', value: 'Osaka' },
      { label: 'Tokyo', value: 'Tokyo' },
      { label: 'Yokohama', value: 'Yokohama' }
    ]
  }
]);

// Multiple
const selectedCities = ref([]);

// Filter
const selectedFilteredCountry = ref(null);

// Custom Template
const selectedTemplateCountry = ref(null);

// States
const selectedDisabled = ref({ name: 'Paris', code: 'PRS' });
const selectedInvalid = ref(null);
const selectedReadonly = ref({ name: 'London', code: 'LDN' });

// Sizes
const selectedSmall = ref(null);
const selectedNormal = ref(null);
const selectedLarge = ref(null);

// Virtual Scrolling (for large datasets)
const lazyItems = ref(Array.from({ length: 100000 }, (_, i) => ({ label: `Item ${i}`, value: i })));
const selectedLazyItem = ref(null);
</script>

<template>
  <div class="p-6 lg:p-8 flex flex-col gap-8">
    <!-- Header -->
    <div class="flex flex-col gap-3 border-b border-surface-200 dark:border-surface-700 pb-6">
      <div class="flex items-center gap-3">
        <i class="pi pi-chevron-down text-3xl text-primary-500" />
        <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0">Select</h1>
      </div>
      <p class="text-surface-600 dark:text-surface-300 max-w-3xl">
        Select is used to choose a single or multiple items from a collection of options with enhanced features like filtering, grouping, and custom templates.
        It provides a user-friendly dropdown interface for option selection.
      </p>
    </div>

    <!-- Basic -->
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-2">
        <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">Basic</h2>
        <Tag value="Most Common" severity="success" />
      </div>
      <p class="text-surface-600 dark:text-surface-300">Select is used with the v-model property for two-way data binding.</p>
      
      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <label for="basic-select" class="font-semibold text-surface-900 dark:text-surface-0">City</label>
          <Select 
            id="basic-select" 
            v-model="selectedCity" 
            :options="cities" 
            optionLabel="name" 
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
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">Editable</h2>
      <p class="text-surface-600 dark:text-surface-300">Select can be made editable to allow custom values in addition to predefined options.</p>
      
      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <label for="editable-select" class="font-semibold text-surface-900 dark:text-surface-0">Country</label>
          <Select 
            id="editable-select" 
            v-model="selectedCountry" 
            :options="countries" 
            optionLabel="name" 
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
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">Grouped Options</h2>
      <p class="text-surface-600 dark:text-surface-300">Options can be grouped for better organization using nested data structure.</p>
      
      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <label for="grouped-select" class="font-semibold text-surface-900 dark:text-surface-0">City by Country</label>
          <Select 
            id="grouped-select" 
            v-model="selectedGroupedCity" 
            :options="groupedCities" 
            optionLabel="label" 
            optionValue="value"
            optionGroupLabel="label" 
            optionGroupChildren="items"
            placeholder="Select a City" 
            class="w-full"
          />
          <small class="text-surface-600 dark:text-surface-300">
            Cities are grouped by country
          </small>
        </div>
      </div>
    </div>

    <!-- Multiple Selection -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">Multiple Selection</h2>
      <p class="text-surface-600 dark:text-surface-300">Multiple items can be selected using the multiple property.</p>
      
      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <label for="multiple-select" class="font-semibold text-surface-900 dark:text-surface-0">Cities</label>
          <Select 
            id="multiple-select" 
            v-model="selectedCities" 
            :options="cities" 
            optionLabel="name" 
            placeholder="Select Cities" 
            multiple
            class="w-full"
          />
          <small class="text-surface-600 dark:text-surface-300">
            Selected: {{ selectedCities.length }} cities
          </small>
        </div>
      </div>
    </div>

    <!-- Filtering -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">Filtering</h2>
      <p class="text-surface-600 dark:text-surface-300">Select provides built-in filtering to search through options.</p>
      
      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <label for="filter-select" class="font-semibold text-surface-900 dark:text-surface-0">Country (Filterable)</label>
          <Select 
            id="filter-select" 
            v-model="selectedFilteredCountry" 
            :options="countries" 
            optionLabel="name" 
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
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">Custom Templates</h2>
      <p class="text-surface-600 dark:text-surface-300">Options can be customized using templates for richer presentation.</p>
      
      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <label for="template-select" class="font-semibold text-surface-900 dark:text-surface-0">Country with Flag</label>
          <Select 
            id="template-select" 
            v-model="selectedTemplateCountry" 
            :options="countries" 
            optionLabel="name" 
            placeholder="Select a Country" 
            class="w-full"
          >
            <template #value="slotProps">
              <div v-if="slotProps.value" class="flex items-center gap-2">
                <img 
                  :alt="slotProps.value.name" 
                  src="https://flagicons.lipis.dev/flags/4x3/us.svg" 
                  class="w-5 h-4" 
                />
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
                />
                <span>{{ slotProps.option.name }}</span>
              </div>
            </template>
          </Select>
          <small class="text-surface-600 dark:text-surface-300">
            Options with custom flag icons
          </small>
        </div>
      </div>
    </div>

    <!-- Sizes -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">Sizes</h2>
      <p class="text-surface-600 dark:text-surface-300">Select provides small and large sizes as alternatives to the regular size.</p>
      
      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-2">
            <label class="font-semibold text-surface-900 dark:text-surface-0">Small</label>
            <Select 
              v-model="selectedSmall" 
              :options="cities" 
              optionLabel="name" 
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
              optionLabel="name" 
              placeholder="Normal size" 
              class="w-full"
            />
          </div>
          
          <div class="flex flex-col gap-2">
            <label class="font-semibold text-surface-900 dark:text-surface-0">Large</label>
            <Select 
              v-model="selectedLarge" 
              :options="cities" 
              optionLabel="name" 
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
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">States</h2>
      <p class="text-surface-600 dark:text-surface-300">Different states can be applied to indicate validation status or user interaction constraints.</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
          <div class="flex flex-col gap-4">
            <h3 class="font-semibold text-surface-900 dark:text-surface-0">Invalid</h3>
            <Select 
              v-model="selectedInvalid" 
              :options="cities" 
              optionLabel="name" 
              placeholder="Invalid state" 
              invalid
              class="w-full"
            />
            <small class="text-red-500">This field has an error.</small>
          </div>
        </div>
        
        <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
          <div class="flex flex-col gap-4">
            <h3 class="font-semibold text-surface-900 dark:text-surface-0">Disabled</h3>
            <Select 
              v-model="selectedDisabled" 
              :options="cities" 
              optionLabel="name" 
              disabled
              class="w-full"
            />
            <small class="text-surface-600 dark:text-surface-300">This field is disabled.</small>
          </div>
        </div>
        
        <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
          <div class="flex flex-col gap-4">
            <h3 class="font-semibold text-surface-900 dark:text-surface-0">Readonly</h3>
            <Select 
              v-model="selectedReadonly" 
              :options="cities" 
              optionLabel="name" 
              readonly
              class="w-full"
            />
            <small class="text-surface-600 dark:text-surface-300">This field is readonly.</small>
          </div>
        </div>
      </div>
    </div>

    <!-- Virtual Scrolling -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">Virtual Scrolling</h2>
      <p class="text-surface-600 dark:text-surface-300">Virtual scrolling is used to render large datasets efficiently without performance issues.</p>
      
      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <label for="virtual-select" class="font-semibold text-surface-900 dark:text-surface-0">Large Dataset (100k items)</label>
          <Select 
            id="virtual-select" 
            v-model="selectedLazyItem" 
            :options="lazyItems" 
            optionLabel="label" 
            placeholder="Select from 100k items" 
            filter
            virtualScrollerOptions="{ itemSize: 38 }"
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