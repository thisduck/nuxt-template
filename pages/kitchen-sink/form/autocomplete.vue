<script setup lang="ts">
// Basic
const selectedCountry = ref('');
const countries = ref([
  'Argentina', 'Australia', 'Brazil', 'Canada', 'China', 'Egypt', 'France', 
  'Germany', 'India', 'Italy', 'Japan', 'Mexico', 'Netherlands', 'Russia', 
  'Spain', 'Turkey', 'United Kingdom', 'United States'
]);
const filteredCountries = ref([]);

// Object Values
const selectedCity = ref(null);
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
  { name: 'Amsterdam', code: 'AMS', country: 'Netherlands' }
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
  { name: 'Diana Davis', email: 'diana@example.com', avatar: 'https://i.pravatar.cc/150?img=6' }
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
const search = (event) => {
  setTimeout(() => {
    if (!event.query.trim().length) {
      filteredCountries.value = [...countries.value];
    } else {
      filteredCountries.value = countries.value.filter((country) => {
        return country.toLowerCase().startsWith(event.query.toLowerCase());
      });
    }
  }, 250);
};

const searchCities = (event) => {
  setTimeout(() => {
    if (!event.query.trim().length) {
      filteredCities.value = [...cities.value];
    } else {
      filteredCities.value = cities.value.filter((city) => {
        return city.name.toLowerCase().includes(event.query.toLowerCase());
      });
    }
  }, 250);
};

const searchItems = (event) => {
  setTimeout(() => {
    if (!event.query.trim().length) {
      filteredItems.value = [...countries.value];
    } else {
      filteredItems.value = countries.value.filter((country) => {
        return country.toLowerCase().includes(event.query.toLowerCase());
      });
    }
  }, 250);
};

const searchUsers = (event) => {
  setTimeout(() => {
    if (!event.query.trim().length) {
      filteredUsers.value = [...users.value];
    } else {
      filteredUsers.value = users.value.filter((user) => {
        return user.name.toLowerCase().includes(event.query.toLowerCase()) ||
               user.email.toLowerCase().includes(event.query.toLowerCase());
      });
    }
  }, 250);
};

const searchForceCountries = (event) => {
  setTimeout(() => {
    if (!event.query.trim().length) {
      filteredForceCountries.value = [...cities.value];
    } else {
      filteredForceCountries.value = cities.value.filter((city) => {
        return city.name.toLowerCase().includes(event.query.toLowerCase());
      });
    }
  }, 250);
};

const searchDropdownCountries = (event) => {
  setTimeout(() => {
    if (!event.query.trim().length) {
      filteredDropdownCountries.value = [...countries.value];
    } else {
      filteredDropdownCountries.value = countries.value.filter((country) => {
        return country.toLowerCase().includes(event.query.toLowerCase());
      });
    }
  }, 250);
};

const searchLazyItems = (event) => {
  setTimeout(() => {
    if (!event.query.trim().length) {
      filteredLazyItems.value = lazyItems.value.slice(0, 1000);
    } else {
      filteredLazyItems.value = lazyItems.value
        .filter((item) => item.toLowerCase().includes(event.query.toLowerCase()))
        .slice(0, 1000);
    }
  }, 250);
};
</script>

<template>
  <div class="p-6 lg:p-8 flex flex-col gap-8">
    <!-- Header -->
    <div class="flex flex-col gap-3 border-b border-surface-200 dark:border-surface-700 pb-6">
      <div class="flex items-center gap-3">
        <i class="pi pi-search text-3xl text-primary-500" />
        <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0">AutoComplete</h1>
      </div>
      <p class="text-surface-600 dark:text-surface-300 max-w-3xl">
        AutoComplete provides suggestions while typing in the input field. It supports single and multiple selection modes, custom templates, and various data sources for flexible auto-completion functionality.
      </p>
    </div>

    <!-- Basic -->
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-2">
        <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">Basic</h2>
        <Tag value="Most Common" severity="success" />
      </div>
      <p class="text-surface-600 dark:text-surface-300">Basic AutoComplete with string values and custom search logic.</p>
      
      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <label for="basic-autocomplete" class="font-semibold text-surface-900 dark:text-surface-0">Country</label>
          <AutoComplete 
            id="basic-autocomplete" 
            v-model="selectedCountry" 
            :suggestions="filteredCountries"
            @complete="search"
            placeholder="Start typing a country name" 
            class="w-full"
          />
          <small class="text-surface-600 dark:text-surface-300">
            Selected: {{ selectedCountry || 'None' }}
          </small>
        </div>
      </div>
    </div>

    <!-- Object Values -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">Object Values</h2>
      <p class="text-surface-600 dark:text-surface-300">AutoComplete can work with object values using the optionLabel property.</p>
      
      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <label for="object-autocomplete" class="font-semibold text-surface-900 dark:text-surface-0">City</label>
          <AutoComplete 
            id="object-autocomplete" 
            v-model="selectedCity" 
            :suggestions="filteredCities"
            @complete="searchCities"
            optionLabel="name"
            placeholder="Search for a city" 
            class="w-full"
          />
          <small class="text-surface-600 dark:text-surface-300">
            Selected: {{ selectedCity ? `${selectedCity.name} (${selectedCity.country})` : 'None' }}
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
          <label for="multiple-autocomplete" class="font-semibold text-surface-900 dark:text-surface-0">Countries</label>
          <AutoComplete 
            id="multiple-autocomplete" 
            v-model="selectedItems" 
            :suggestions="filteredItems"
            @complete="searchItems"
            multiple
            placeholder="Select multiple countries" 
            class="w-full"
          />
          <small class="text-surface-600 dark:text-surface-300">
            Selected: {{ selectedItems.length }} countries
          </small>
        </div>
      </div>
    </div>

    <!-- Custom Templates -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">Custom Templates</h2>
      <p class="text-surface-600 dark:text-surface-300">Suggestions can be customized using templates for richer presentation.</p>
      
      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <label for="template-autocomplete" class="font-semibold text-surface-900 dark:text-surface-0">User Search</label>
          <AutoComplete 
            id="template-autocomplete" 
            v-model="selectedUser" 
            :suggestions="filteredUsers"
            @complete="searchUsers"
            optionLabel="name"
            placeholder="Search for users by name or email" 
            class="w-full"
          >
            <template #item="slotProps">
              <div class="flex items-center gap-3 p-2">
                <img 
                  :alt="slotProps.item.name" 
                  :src="slotProps.item.avatar" 
                  class="w-8 h-8 rounded-full" 
                />
                <div class="flex flex-col">
                  <span class="font-medium">{{ slotProps.item.name }}</span>
                  <small class="text-surface-500">{{ slotProps.item.email }}</small>
                </div>
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
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">Force Selection</h2>
      <p class="text-surface-600 dark:text-surface-300">When forceSelection is enabled, only values from suggestions are accepted.</p>
      
      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <label for="force-autocomplete" class="font-semibold text-surface-900 dark:text-surface-0">City (Force Selection)</label>
          <AutoComplete 
            id="force-autocomplete" 
            v-model="selectedForceCountry" 
            :suggestions="filteredForceCountries"
            @complete="searchForceCountries"
            optionLabel="name"
            forceSelection
            placeholder="Only suggested cities are accepted" 
            class="w-full"
          />
          <small class="text-surface-600 dark:text-surface-300">
            Only values from the suggestion list are allowed
          </small>
        </div>
      </div>
    </div>

    <!-- Dropdown -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">Dropdown</h2>
      <p class="text-surface-600 dark:text-surface-300">AutoComplete can display a dropdown button to show all available suggestions.</p>
      
      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <label for="dropdown-autocomplete" class="font-semibold text-surface-900 dark:text-surface-0">Country with Dropdown</label>
          <AutoComplete 
            id="dropdown-autocomplete" 
            v-model="selectedDropdownCountry" 
            :suggestions="filteredDropdownCountries"
            @complete="searchDropdownCountries"
            dropdown
            placeholder="Type or click dropdown" 
            class="w-full"
          />
          <small class="text-surface-600 dark:text-surface-300">
            Click the dropdown arrow to see all options
          </small>
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
            <AutoComplete 
              v-model="selectedInvalid" 
              :suggestions="filteredCountries"
              @complete="search"
              invalid
              placeholder="Invalid state" 
              class="w-full"
            />
            <small class="text-red-500">This field has an error.</small>
          </div>
        </div>
        
        <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
          <div class="flex flex-col gap-4">
            <h3 class="font-semibold text-surface-900 dark:text-surface-0">Disabled</h3>
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
            <h3 class="font-semibold text-surface-900 dark:text-surface-0">Readonly</h3>
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

    <!-- Virtual Scrolling -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">Virtual Scrolling</h2>
      <p class="text-surface-600 dark:text-surface-300">Virtual scrolling efficiently renders large suggestion lists without performance issues.</p>
      
      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <label for="virtual-autocomplete" class="font-semibold text-surface-900 dark:text-surface-0">Large Dataset (100k items)</label>
          <AutoComplete 
            id="virtual-autocomplete" 
            v-model="selectedLazyItem" 
            :suggestions="filteredLazyItems"
            @complete="searchLazyItems"
            :virtualScrollerOptions="{ itemSize: 38 }"
            placeholder="Search from 100k items" 
            class="w-full"
          />
          <small class="text-surface-600 dark:text-surface-300">
            Efficiently handles large datasets with virtual scrolling
          </small>
        </div>
      </div>
    </div>

    <!-- Method Suggestions -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">Method Configuration</h2>
      <p class="text-surface-600 dark:text-surface-300">AutoComplete supports different search methods and suggestion timing configurations.</p>
      
      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex flex-col gap-2">
            <h3 class="font-semibold text-surface-900 dark:text-surface-0">Minimum Query Length</h3>
            <AutoComplete 
              v-model="selectedCountry" 
              :suggestions="filteredCountries"
              @complete="search"
              :minLength="3"
              placeholder="Start typing (min 3 chars)" 
              class="w-full"
            />
            <small class="text-surface-600 dark:text-surface-300">
              Suggestions appear after 3 characters
            </small>
          </div>
          
          <div class="flex flex-col gap-2">
            <h3 class="font-semibold text-surface-900 dark:text-surface-0">Delay</h3>
            <AutoComplete 
              v-model="selectedCountry" 
              :suggestions="filteredCountries"
              @complete="search"
              :delay="1000"
              placeholder="Delayed suggestions (1s)" 
              class="w-full"
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