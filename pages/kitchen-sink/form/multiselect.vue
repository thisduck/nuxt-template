<script setup lang="ts">
// Basic
const selectedCities = ref([]);
const cities = ref([
  { name: 'New York', code: 'NY' },
  { name: 'Rome', code: 'RM' },
  { name: 'London', code: 'LDN' },
  { name: 'Istanbul', code: 'IST' },
  { name: 'Paris', code: 'PRS' },
  { name: 'Tokyo', code: 'TKY' },
  { name: 'Berlin', code: 'BRL' },
  { name: 'Sydney', code: 'SYD' },
  { name: 'Barcelona', code: 'BCN' },
  { name: 'Amsterdam', code: 'AMS' }
]);

// Chips Display
const selectedChipCities = ref([]);

// Filtering
const selectedFilterCities = ref([]);

// Grouped
const selectedGroupedCities = ref([]);
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

// Custom Templates
const selectedTemplateCities = ref([]);
const countries = ref([
  { name: 'Australia', code: 'AU', flag: 'au' },
  { name: 'Brazil', code: 'BR', flag: 'br' },
  { name: 'China', code: 'CN', flag: 'cn' },
  { name: 'Egypt', code: 'EG', flag: 'eg' },
  { name: 'France', code: 'FR', flag: 'fr' },
  { name: 'Germany', code: 'DE', flag: 'de' },
  { name: 'India', code: 'IN', flag: 'in' },
  { name: 'Japan', code: 'JP', flag: 'jp' },
  { name: 'Spain', code: 'ES', flag: 'es' },
  { name: 'United States', code: 'US', flag: 'us' }
]);

// Selection Limit
const selectedLimitCities = ref([]);

// Virtual Scrolling
const lazyItems = ref(Array.from({ length: 100000 }, (_, i) => ({ 
  label: `Item ${i}`, 
  value: i,
  category: `Category ${Math.floor(i / 1000)}`
})));
const selectedLazyItems = ref([]);

// States
const selectedDisabled = ref([{ name: 'Paris', code: 'PRS' }, { name: 'London', code: 'LDN' }]);
const selectedInvalid = ref([]);
const selectedReadonly = ref([{ name: 'Tokyo', code: 'TKY' }]);

// Sizes
const selectedSmall = ref([]);
const selectedNormal = ref([]);
const selectedLarge = ref([]);

// Select All
const selectedAllCities = ref([]);

// Custom Header/Footer
const selectedHeaderCities = ref([]);
</script>

<template>
  <div class="p-6 lg:p-8 flex flex-col gap-8">
    <!-- Header -->
    <div class="flex flex-col gap-3 border-b border-surface-200 dark:border-surface-700 pb-6">
      <div class="flex items-center gap-3">
        <i class="pi pi-check-square text-3xl text-primary-500" />
        <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0">MultiSelect</h1>
      </div>
      <p class="text-surface-600 dark:text-surface-300 max-w-3xl">
        MultiSelect is used to select multiple items from a collection of options. It provides features like filtering, grouping, custom templates, and virtual scrolling for enhanced user experience.
      </p>
    </div>

    <!-- Basic -->
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-2">
        <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">Basic</h2>
        <Tag value="Most Common" severity="success" />
      </div>
      <p class="text-surface-600 dark:text-surface-300">MultiSelect is used with the v-model property for two-way data binding.</p>
      
      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <label for="basic-multiselect" class="font-semibold text-surface-900 dark:text-surface-0">Cities</label>
          <MultiSelect 
            id="basic-multiselect" 
            v-model="selectedCities" 
            :options="cities" 
            optionLabel="name" 
            placeholder="Select Cities" 
            class="w-full"
          />
          <small class="text-surface-600 dark:text-surface-300">
            Selected: {{ selectedCities.length }} cities
          </small>
        </div>
      </div>
    </div>

    <!-- Chips Display -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">Chips Display</h2>
      <p class="text-surface-600 dark:text-surface-300">Selected items can be displayed as chips for better visual feedback.</p>
      
      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <label for="chips-multiselect" class="font-semibold text-surface-900 dark:text-surface-0">Cities (Chips)</label>
          <MultiSelect 
            id="chips-multiselect" 
            v-model="selectedChipCities" 
            :options="cities" 
            optionLabel="name" 
            placeholder="Select Cities" 
            display="chip"
            class="w-full"
          />
          <small class="text-surface-600 dark:text-surface-300">
            Selected items displayed as removable chips
          </small>
        </div>
      </div>
    </div>

    <!-- Filtering -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">Filtering</h2>
      <p class="text-surface-600 dark:text-surface-300">Built-in filtering allows users to search through available options.</p>
      
      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <label for="filter-multiselect" class="font-semibold text-surface-900 dark:text-surface-0">Cities (Filterable)</label>
          <MultiSelect 
            id="filter-multiselect" 
            v-model="selectedFilterCities" 
            :options="cities" 
            optionLabel="name" 
            placeholder="Search and select cities" 
            filter
            class="w-full"
          />
          <small class="text-surface-600 dark:text-surface-300">
            Start typing to filter available options
          </small>
        </div>
      </div>
    </div>

    <!-- Grouped Options -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">Grouped Options</h2>
      <p class="text-surface-600 dark:text-surface-300">Options can be grouped for better organization and navigation.</p>
      
      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <label for="grouped-multiselect" class="font-semibold text-surface-900 dark:text-surface-0">Cities by Country</label>
          <MultiSelect 
            id="grouped-multiselect" 
            v-model="selectedGroupedCities" 
            :options="groupedCities" 
            optionLabel="label" 
            optionValue="value"
            optionGroupLabel="label" 
            optionGroupChildren="items"
            placeholder="Select Cities by Country" 
            class="w-full"
          />
          <small class="text-surface-600 dark:text-surface-300">
            Options grouped by country for easier selection
          </small>
        </div>
      </div>
    </div>

    <!-- Selection Limit -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">Selection Limit</h2>
      <p class="text-surface-600 dark:text-surface-300">The number of selections can be limited using the selectionLimit property.</p>
      
      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <label for="limit-multiselect" class="font-semibold text-surface-900 dark:text-surface-0">Cities (Max 3)</label>
          <MultiSelect 
            id="limit-multiselect" 
            v-model="selectedLimitCities" 
            :options="cities" 
            optionLabel="name" 
            placeholder="Select up to 3 cities" 
            :selectionLimit="3"
            class="w-full"
          />
          <small class="text-surface-600 dark:text-surface-300">
            Maximum 3 selections allowed: {{ selectedLimitCities.length }}/3 selected
          </small>
        </div>
      </div>
    </div>

    <!-- Custom Templates -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">Custom Templates</h2>
      <p class="text-surface-600 dark:text-surface-300">Options and selected items can be customized using templates for richer presentation.</p>
      
      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <label for="template-multiselect" class="font-semibold text-surface-900 dark:text-surface-0">Countries with Flags</label>
          <MultiSelect 
            id="template-multiselect" 
            v-model="selectedTemplateCities" 
            :options="countries" 
            optionLabel="name" 
            placeholder="Select Countries" 
            class="w-full"
          >
            <template #value="slotProps">
              <div class="flex flex-wrap gap-1">
                <div v-for="option of slotProps.value" :key="option.code" class="flex items-center gap-1 bg-primary-100 dark:bg-primary-900 px-2 py-1 rounded text-sm">
                  <img 
                    :alt="option.name" 
                    src="https://flagicons.lipis.dev/flags/4x3/us.svg" 
                    class="w-4 h-3" 
                  />
                  <span>{{ option.name }}</span>
                </div>
                <span v-if="!slotProps.value || slotProps.value.length === 0" class="text-surface-500">{{ slotProps.placeholder }}</span>
              </div>
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
          </MultiSelect>
          <small class="text-surface-600 dark:text-surface-300">
            Custom templates with flag icons
          </small>
        </div>
      </div>
    </div>

    <!-- Select All -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">Select All</h2>
      <p class="text-surface-600 dark:text-surface-300">Select All functionality allows users to quickly select or deselect all available options.</p>
      
      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <label for="selectall-multiselect" class="font-semibold text-surface-900 dark:text-surface-0">Cities (Select All)</label>
          <MultiSelect 
            id="selectall-multiselect" 
            v-model="selectedAllCities" 
            :options="cities" 
            optionLabel="name" 
            placeholder="Select Cities" 
            :selectAll="true"
            class="w-full"
          />
          <small class="text-surface-600 dark:text-surface-300">
            Use the header checkbox to select/deselect all options
          </small>
        </div>
      </div>
    </div>

    <!-- Sizes -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">Sizes</h2>
      <p class="text-surface-600 dark:text-surface-300">MultiSelect provides small and large sizes as alternatives to the regular size.</p>
      
      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-2">
            <label class="font-semibold text-surface-900 dark:text-surface-0">Small</label>
            <MultiSelect 
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
            <MultiSelect 
              v-model="selectedNormal" 
              :options="cities" 
              optionLabel="name" 
              placeholder="Normal size" 
              class="w-full"
            />
          </div>
          
          <div class="flex flex-col gap-2">
            <label class="font-semibold text-surface-900 dark:text-surface-0">Large</label>
            <MultiSelect 
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
            <MultiSelect 
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
            <MultiSelect 
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
            <MultiSelect 
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
      <p class="text-surface-600 dark:text-surface-300">Virtual scrolling efficiently renders large datasets without performance degradation.</p>
      
      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <label for="virtual-multiselect" class="font-semibold text-surface-900 dark:text-surface-0">Large Dataset (100k items)</label>
          <MultiSelect 
            id="virtual-multiselect" 
            v-model="selectedLazyItems" 
            :options="lazyItems" 
            optionLabel="label" 
            placeholder="Select from 100k items" 
            filter
            virtualScrollerOptions="{ itemSize: 38 }"
            :selectionLimit="10"
            class="w-full"
          />
          <small class="text-surface-600 dark:text-surface-300">
            Efficiently handles large datasets with virtual scrolling (max 10 selections)
          </small>
        </div>
      </div>
    </div>

  </div>
</template>