<script setup lang="ts">
// Basic
const selectedCountry = ref('');
const countries = ref([
  'Argentina',
  'Australia',
  'Brazil',
  'Canada',
  'China',
  'Egypt',
  'France',
  'Germany',
  'India',
  'Italy',
  'Japan',
  'Mexico',
  'Netherlands',
  'Russia',
  'Spain',
  'Turkey',
  'United Kingdom',
  'United States',
]);
const filteredCountries = ref([]);

// Object Values
const selectedCity = ref(null);

// Group
const selectedGroupCity = ref(null);
const groupedCities = ref([
  {
    label: 'United States',
    code: 'us',
    items: [
      { label: 'New York', value: 'New York' },
      { label: 'Los Angeles', value: 'Los Angeles' },
      { label: 'Chicago', value: 'Chicago' },
    ],
  },
  {
    label: 'United Kingdom',
    code: 'gb',
    items: [
      { label: 'London', value: 'London' },
      { label: 'Manchester', value: 'Manchester' },
      { label: 'Birmingham', value: 'Birmingham' },
    ],
  },
  {
    label: 'Australia',
    code: 'au',
    items: [
      { label: 'Sydney', value: 'Sydney' },
      { label: 'Melbourne', value: 'Melbourne' },
      { label: 'Brisbane', value: 'Brisbane' },
    ],
  },
]);
const filteredGroupedCities = ref([]);

// Forms
const selectedFormCountry = ref(null);
const filteredFormCountries = ref([]);

// Sizes
const selectedSmall = ref('');
const selectedNormal = ref('');
const selectedLarge = ref('');
const filteredSizeCountries = ref([]);

// Multiple with typeahead control
const selectedWithTypeahead = ref([]);
const selectedWithoutTypeahead = ref([]);
const filteredTypeaheadItems = ref([]);

// Variant filled
const selectedFilled = ref('');
const filteredFilledCountries = ref([]);

// tRPC Backend
const { $trpc } = useNuxtApp();
const selectedProduct = ref(null);
const productSuggestions = ref([]);
const cities = ref([
  { name: 'New York', code: 'NY', country: 'USA' },
  { name: 'Rome', code: 'RM', country: 'Italy' },
  { name: 'London', code: 'LDN', country: 'UK' },
  { name: 'Istanbul', code: 'IST', country: 'Turkey' },
  { name: 'Paris', code: 'PRS', country: 'France' },
  { name: 'Tokyo', code: 'TKY', country: 'Japan' },
  { name: 'Berlin', code: 'BRL', country: 'Germany' },
  { name: 'Sydney', code: 'SYD', country: 'Australia' },
  { name: 'Barcelona', code: 'BCN', country: 'Spain' },
  { name: 'Amsterdam', code: 'AMS', country: 'Netherlands' },
]);
const filteredCities = ref([]);

// Multiple Selection
const selectedItems = ref([]);
const filteredItems = ref([]);

// Custom Template
const selectedUser = ref(null);
const users = ref([
  { name: 'John Doe', email: 'john@example.com', avatar: 'https://i.pravatar.cc/150?img=1' },
  { name: 'Jane Smith', email: 'jane@example.com', avatar: 'https://i.pravatar.cc/150?img=2' },
  { name: 'Bob Johnson', email: 'bob@example.com', avatar: 'https://i.pravatar.cc/150?img=3' },
  { name: 'Alice Brown', email: 'alice@example.com', avatar: 'https://i.pravatar.cc/150?img=4' },
  { name: 'Charlie Wilson', email: 'charlie@example.com', avatar: 'https://i.pravatar.cc/150?img=5' },
  { name: 'Diana Davis', email: 'diana@example.com', avatar: 'https://i.pravatar.cc/150?img=6' },
]);
const filteredUsers = ref([]);

// Force Selection
const selectedForceCountry = ref(null);
const filteredForceCountries = ref([]);

// Dropdown
const selectedDropdownCountry = ref('');
const filteredDropdownCountries = ref([]);

// States
const selectedDisabled = ref('Disabled AutoComplete');
const selectedInvalid = ref('');
const selectedReadonly = ref('Readonly AutoComplete');

// Virtual Scrolling
const lazyItems = ref(Array.from({ length: 100000 }, (_, i) => `Item ${i}`));
const selectedLazyItem = ref('');
const filteredLazyItems = ref([]);

// Search methods
function search(event) {
  setTimeout(() => {
    if (!event.query.trim().length) {
      filteredCountries.value = [...countries.value];
    } else {
      filteredCountries.value = countries.value.filter((country) => {
        return country.toLowerCase().startsWith(event.query.toLowerCase());
      });
    }
  }, 250);
}

function searchCities(event) {
  setTimeout(() => {
    if (!event.query.trim().length) {
      filteredCities.value = [...cities.value];
    } else {
      filteredCities.value = cities.value.filter((city) => {
        return city.name.toLowerCase().includes(event.query.toLowerCase());
      });
    }
  }, 250);
}

function searchItems(event) {
  setTimeout(() => {
    if (!event.query.trim().length) {
      filteredItems.value = [...countries.value];
    } else {
      filteredItems.value = countries.value.filter((country) => {
        return country.toLowerCase().includes(event.query.toLowerCase());
      });
    }
  }, 250);
}

function searchUsers(event) {
  setTimeout(() => {
    if (!event.query.trim().length) {
      filteredUsers.value = [...users.value];
    } else {
      filteredUsers.value = users.value.filter((user) => {
        return user.name.toLowerCase().includes(event.query.toLowerCase())
          || user.email.toLowerCase().includes(event.query.toLowerCase());
      });
    }
  }, 250);
}

function searchForceCountries(event) {
  setTimeout(() => {
    if (!event.query.trim().length) {
      filteredForceCountries.value = [...cities.value];
    } else {
      filteredForceCountries.value = cities.value.filter((city) => {
        return city.name.toLowerCase().includes(event.query.toLowerCase());
      });
    }
  }, 250);
}

function searchDropdownCountries(event) {
  setTimeout(() => {
    if (!event.query.trim().length) {
      filteredDropdownCountries.value = [...countries.value];
    } else {
      filteredDropdownCountries.value = countries.value.filter((country) => {
        return country.toLowerCase().includes(event.query.toLowerCase());
      });
    }
  }, 250);
}

function searchLazyItems(event) {
  setTimeout(() => {
    if (!event.query.trim().length) {
      filteredLazyItems.value = lazyItems.value.slice(0, 1000);
    } else {
      filteredLazyItems.value = lazyItems.value
        .filter(item => item.toLowerCase().includes(event.query.toLowerCase()))
        .slice(0, 1000);
    }
  }, 250);
}

function searchGroupedCities(event) {
  setTimeout(() => {
    if (!event.query.trim().length) {
      filteredGroupedCities.value = [...groupedCities.value];
    } else {
      filteredGroupedCities.value = groupedCities.value.map(group => ({
        ...group,
        items: group.items.filter(city =>
          city.label.toLowerCase().includes(event.query.toLowerCase()),
        ),
      })).filter(group => group.items.length > 0);
    }
  }, 250);
}

function searchFormCountries(event) {
  setTimeout(() => {
    if (!event.query.trim().length) {
      filteredFormCountries.value = [...cities.value];
    } else {
      filteredFormCountries.value = cities.value.filter((city) => {
        return city.name.toLowerCase().includes(event.query.toLowerCase());
      });
    }
  }, 250);
}

function searchSizeCountries(event) {
  setTimeout(() => {
    if (!event.query.trim().length) {
      filteredSizeCountries.value = [...countries.value];
    } else {
      filteredSizeCountries.value = countries.value.filter((country) => {
        return country.toLowerCase().includes(event.query.toLowerCase());
      });
    }
  }, 250);
}

function searchTypeaheadItems(event) {
  setTimeout(() => {
    if (!event.query.trim().length) {
      filteredTypeaheadItems.value = [...countries.value];
    } else {
      filteredTypeaheadItems.value = countries.value.filter((country) => {
        return country.toLowerCase().includes(event.query.toLowerCase());
      });
    }
  }, 250);
}

function searchFilledCountries(event) {
  setTimeout(() => {
    if (!event.query.trim().length) {
      filteredFilledCountries.value = [...countries.value];
    } else {
      filteredFilledCountries.value = countries.value.filter((country) => {
        return country.toLowerCase().includes(event.query.toLowerCase());
      });
    }
  }, 250);
}

async function searchProducts(event) {
  try {
    const results = await $trpc.searchProducts.query({ query: event.query });
    productSuggestions.value = results;
  } catch (error) {
    console.error('Failed to search products:', error);
    productSuggestions.value = [];
  }
}
</script>

<template>
  <div class="p-6 lg:p-8 flex flex-col gap-8">
    <!-- Header -->
    <div class="flex flex-col gap-3 border-b border-surface-200 dark:border-surface-700 pb-6">
      <div class="flex items-center gap-3">
        <i class="pi pi-search text-3xl text-primary-500" />
        <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0">
          AutoComplete
        </h1>
      </div>
      <p class="text-surface-600 dark:text-surface-300 max-w-3xl">
        AutoComplete provides suggestions while typing in the input field. It supports single and multiple selection modes, custom templates, and various data sources for flexible auto-completion functionality.
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
        Basic AutoComplete with string values and custom search logic.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <label for="basic-autocomplete" class="font-semibold text-surface-900 dark:text-surface-0">Country</label>
          <AutoComplete
            id="basic-autocomplete"
            v-model="selectedCountry"
            :suggestions="filteredCountries"
            placeholder="Start typing a country name"
            class="w-full"
            @complete="search"
          />
          <small class="text-surface-600 dark:text-surface-300">
            Selected: {{ selectedCountry || 'None' }}
          </small>
        </div>
      </div>
    </div>

    <!-- Object Values -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Object Values
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        AutoComplete can work with object values using the optionLabel property.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <label for="object-autocomplete" class="font-semibold text-surface-900 dark:text-surface-0">City</label>
          <AutoComplete
            id="object-autocomplete"
            v-model="selectedCity"
            :suggestions="filteredCities"
            option-label="name"
            placeholder="Search for a city"
            class="w-full"
            @complete="searchCities"
          />
          <small class="text-surface-600 dark:text-surface-300">
            Selected: {{ selectedCity ? `${selectedCity.name} (${selectedCity.country})` : 'None' }}
          </small>
        </div>
      </div>
    </div>

    <!-- Multiple Selection -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Multiple Selection
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Multiple items can be selected using the multiple property.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <label for="multiple-autocomplete" class="font-semibold text-surface-900 dark:text-surface-0">Countries</label>
          <AutoComplete
            id="multiple-autocomplete"
            v-model="selectedItems"
            :suggestions="filteredItems"
            multiple
            placeholder="Select multiple countries"
            class="w-full"
            @complete="searchItems"
          />
          <small class="text-surface-600 dark:text-surface-300">
            Selected: {{ selectedItems.length }} countries
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
        Suggestions can be customized using templates for richer presentation.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <label for="template-autocomplete" class="font-semibold text-surface-900 dark:text-surface-0">User Search</label>
          <AutoComplete
            id="template-autocomplete"
            v-model="selectedUser"
            :suggestions="filteredUsers"
            option-label="name"
            placeholder="Search for users by name or email"
            class="w-full"
            @complete="searchUsers"
          >
            <template #option="slotProps">
              <div class="flex items-center gap-3 p-2">
                <img
                  :alt="slotProps.option.name"
                  :src="slotProps.option.avatar"
                  class="w-8 h-8 rounded-full"
                >
                <div class="flex flex-col">
                  <span class="font-medium">{{ slotProps.option.name }}</span>
                  <small class="text-surface-500">{{ slotProps.option.email }}</small>
                </div>
              </div>
            </template>
            <template #header>
              <div class="font-medium px-3 py-2 border-b border-surface-200 dark:border-surface-700">
                Available Users
              </div>
            </template>
            <template #footer>
              <div class="px-3 py-3 border-t border-surface-200 dark:border-surface-700">
                <Button label="Add New User" fluid severity="secondary" text size="small" icon="pi pi-plus" />
              </div>
            </template>
          </AutoComplete>
          <small class="text-surface-600 dark:text-surface-300">
            Search by name or email with custom suggestion display
          </small>
        </div>
      </div>
    </div>

    <!-- Force Selection -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Force Selection
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        When forceSelection is enabled, only values from suggestions are accepted.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <label for="force-autocomplete" class="font-semibold text-surface-900 dark:text-surface-0">City (Force Selection)</label>
          <AutoComplete
            id="force-autocomplete"
            v-model="selectedForceCountry"
            :suggestions="filteredForceCountries"
            option-label="name"
            force-selection
            placeholder="Only suggested cities are accepted"
            class="w-full"
            @complete="searchForceCountries"
          />
          <small class="text-surface-600 dark:text-surface-300">
            Only values from the suggestion list are allowed
          </small>
        </div>
      </div>
    </div>

    <!-- Dropdown -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Dropdown
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        AutoComplete can display a dropdown button to show all available suggestions.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <label for="dropdown-autocomplete" class="font-semibold text-surface-900 dark:text-surface-0">Country with Dropdown</label>
          <AutoComplete
            id="dropdown-autocomplete"
            v-model="selectedDropdownCountry"
            :suggestions="filteredDropdownCountries"
            dropdown
            placeholder="Type or click dropdown"
            class="w-full"
            @complete="searchDropdownCountries"
          />
          <small class="text-surface-600 dark:text-surface-300">
            Click the dropdown arrow to see all options
          </small>
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

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
          <div class="flex flex-col gap-4">
            <h3 class="font-semibold text-surface-900 dark:text-surface-0">
              Invalid
            </h3>
            <AutoComplete
              v-model="selectedInvalid"
              :suggestions="filteredCountries"
              invalid
              placeholder="Invalid state"
              class="w-full"
              @complete="search"
            />
            <small class="text-red-500">This field has an error.</small>
          </div>
        </div>

        <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
          <div class="flex flex-col gap-4">
            <h3 class="font-semibold text-surface-900 dark:text-surface-0">
              Disabled
            </h3>
            <AutoComplete
              v-model="selectedDisabled"
              :suggestions="[]"
              disabled
              class="w-full"
            />
            <small class="text-surface-600 dark:text-surface-300">This field is disabled.</small>
          </div>
        </div>

        <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
          <div class="flex flex-col gap-4">
            <h3 class="font-semibold text-surface-900 dark:text-surface-0">
              Readonly
            </h3>
            <AutoComplete
              v-model="selectedReadonly"
              :suggestions="[]"
              readonly
              class="w-full"
            />
            <small class="text-surface-600 dark:text-surface-300">This field is readonly.</small>
          </div>
        </div>
      </div>
    </div>

    <!-- Group Support -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Group Support
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Options can be grouped using option-group-label and option-group-children properties.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <label for="group-autocomplete" class="font-semibold text-surface-900 dark:text-surface-0">Cities by Country</label>
          <AutoComplete
            id="group-autocomplete"
            v-model="selectedGroupCity"
            :suggestions="filteredGroupedCities"
            option-label="label"
            option-group-label="label"
            option-group-children="items"
            placeholder="Type 'a' to see groups"
            class="w-full"
            @complete="searchGroupedCities"
          >
            <template #optiongroup="slotProps">
              <div class="flex items-center gap-2 p-2 font-medium">
                <i class="pi pi-globe text-primary-500" />
                <span>{{ slotProps.option.label }}</span>
              </div>
            </template>
          </AutoComplete>
          <small class="text-surface-600 dark:text-surface-300">
            Options grouped by country with custom group template
          </small>
        </div>
      </div>
    </div>

    <!-- Forms Integration -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Forms Integration
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        AutoComplete integrates with form validation and provides error handling.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <label for="form-autocomplete" class="font-semibold text-surface-900 dark:text-surface-0">City (Required)</label>
          <AutoComplete
            id="form-autocomplete"
            v-model="selectedFormCountry"
            :suggestions="filteredFormCountries"
            option-label="name"
            :invalid="!selectedFormCountry"
            fluid
            placeholder="Select a city"
            @complete="searchFormCountries"
          />
          <Message v-if="!selectedFormCountry" severity="error" size="small">
            City selection is required
          </Message>
          <small class="text-surface-600 dark:text-surface-300">
            Form integration with validation and error messages
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
        AutoComplete supports small and large sizes as alternatives to the default.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="flex flex-col gap-2">
            <label class="font-semibold text-surface-900 dark:text-surface-0">Small</label>
            <AutoComplete
              v-model="selectedSmall"
              :suggestions="filteredSizeCountries"
              size="small"
              dropdown
              placeholder="Small"
              @complete="searchSizeCountries"
            />
          </div>
          <div class="flex flex-col gap-2">
            <label class="font-semibold text-surface-900 dark:text-surface-0">Normal</label>
            <AutoComplete
              v-model="selectedNormal"
              :suggestions="filteredSizeCountries"
              dropdown
              placeholder="Normal"
              @complete="searchSizeCountries"
            />
          </div>
          <div class="flex flex-col gap-2">
            <label class="font-semibold text-surface-900 dark:text-surface-0">Large</label>
            <AutoComplete
              v-model="selectedLarge"
              :suggestions="filteredSizeCountries"
              size="large"
              dropdown
              placeholder="Large"
              @complete="searchSizeCountries"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Multiple with Typeahead Control -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Multiple with Typeahead Control
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Control typeahead behavior in multiple selection mode.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="flex flex-col gap-4">
            <label for="with-typeahead" class="font-semibold text-surface-900 dark:text-surface-0">With Typeahead</label>
            <AutoComplete
              id="with-typeahead"
              v-model="selectedWithTypeahead"
              :suggestions="filteredTypeaheadItems"
              multiple
              fluid
              placeholder="Type to search"
              @complete="searchTypeaheadItems"
            />
          </div>
          <div class="flex flex-col gap-4">
            <label for="without-typeahead" class="font-semibold text-surface-900 dark:text-surface-0">Without Typeahead</label>
            <AutoComplete
              id="without-typeahead"
              v-model="selectedWithoutTypeahead"
              :suggestions="filteredTypeaheadItems"
              multiple
              fluid
              :typeahead="false"
              placeholder="Select from dropdown"
              @complete="searchTypeaheadItems"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Variant Filled -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Filled Variant
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Use the filled variant for higher visual emphasis.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <label for="filled-autocomplete" class="font-semibold text-surface-900 dark:text-surface-0">Country (Filled)</label>
          <AutoComplete
            id="filled-autocomplete"
            v-model="selectedFilled"
            :suggestions="filteredFilledCountries"
            variant="filled"
            placeholder="Filled variant style"
            class="w-full"
            @complete="searchFilledCountries"
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
        AutoComplete with real-time backend search using tRPC for type-safe API calls.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <label for="trpc-autocomplete" class="font-semibold text-surface-900 dark:text-surface-0">Product Search</label>
          <AutoComplete
            id="trpc-autocomplete"
            v-model="selectedProduct"
            :suggestions="productSuggestions"
            option-label="name"
            placeholder="Search products (e.g., iPhone, Nike, etc.)"
            class="w-full"
            @complete="searchProducts"
          >
            <template #option="slotProps">
              <div class="flex items-center justify-between p-2 w-full">
                <div class="flex flex-col">
                  <span class="font-medium">{{ slotProps.option.name }}</span>
                  <small class="text-surface-500">{{ slotProps.option.category }}</small>
                </div>
                <span class="font-semibold text-primary-500">${{ slotProps.option.price }}</span>
              </div>
            </template>
          </AutoComplete>
          <small class="text-surface-600 dark:text-surface-300">
            Selected: {{ selectedProduct ? `${selectedProduct.name} - $${selectedProduct.price}` : 'None' }}
          </small>
          <small class="text-surface-500 dark:text-surface-400">
            Real-time search using tRPC backend with type safety
          </small>
        </div>
      </div>
    </div>

    <!-- Virtual Scrolling -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Virtual Scrolling
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Virtual scrolling efficiently renders large suggestion lists without performance issues.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <label for="virtual-autocomplete" class="font-semibold text-surface-900 dark:text-surface-0">Large Dataset (100k items)</label>
          <AutoComplete
            id="virtual-autocomplete"
            v-model="selectedLazyItem"
            :suggestions="filteredLazyItems"
            :virtual-scroller-options="{ itemSize: 38 }"
            placeholder="Search from 100k items"
            class="w-full"
            @complete="searchLazyItems"
          />
          <small class="text-surface-600 dark:text-surface-300">
            Efficiently handles large datasets with virtual scrolling
          </small>
        </div>
      </div>
    </div>

    <!-- Method Suggestions -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Method Configuration
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        AutoComplete supports different search methods and suggestion timing configurations.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex flex-col gap-2">
            <h3 class="font-semibold text-surface-900 dark:text-surface-0">
              Minimum Query Length
            </h3>
            <AutoComplete
              v-model="selectedCountry"
              :suggestions="filteredCountries"
              :min-length="3"
              placeholder="Start typing (min 3 chars)"
              class="w-full"
              @complete="search"
            />
            <small class="text-surface-600 dark:text-surface-300">
              Suggestions appear after 3 characters
            </small>
          </div>

          <div class="flex flex-col gap-2">
            <h3 class="font-semibold text-surface-900 dark:text-surface-0">
              Delay
            </h3>
            <AutoComplete
              v-model="selectedCountry"
              :suggestions="filteredCountries"
              :delay="1000"
              placeholder="Delayed suggestions (1s)"
              class="w-full"
              @complete="search"
            />
            <small class="text-surface-600 dark:text-surface-300">
              1 second delay before showing suggestions
            </small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
