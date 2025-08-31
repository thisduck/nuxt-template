<script setup lang="ts">
// Basic
const checked = ref(false);

// Multiple Values (Array)
const selectedCategories = ref([]);
const categories = ref([
  { name: 'Technology', key: 'tech' },
  { name: 'Sports', key: 'sports' },
  { name: 'Music', key: 'music' },
  { name: 'Travel', key: 'travel' },
  { name: 'Food', key: 'food' }
]);

// Binary (True/False values)
const binaryValue = ref(null);

// States
const disabledChecked = ref(true);
const invalidValue = ref(false);
const readonlyValue = ref(true);

// Indeterminate State
const indeterminateValue = ref(null);

// Dynamic
const dynamicOptions = ref([
  { label: 'Option 1', value: 'opt1' },
  { label: 'Option 2', value: 'opt2' },
  { label: 'Option 3', value: 'opt3' },
  { label: 'Option 4', value: 'opt4' }
]);
const selectedDynamic = ref([]);

// Custom Icons
const customIconValue = ref(false);

// Grouped Checkboxes
const permissions = ref({
  read: false,
  write: false,
  execute: false
});

const allPermissions = computed({
  get() {
    return permissions.value.read && permissions.value.write && permissions.value.execute;
  },
  set(value) {
    permissions.value.read = value;
    permissions.value.write = value;
    permissions.value.execute = value;
  }
});

// Form Validation Example
const formData = ref({
  newsletter: false,
  terms: false,
  privacy: false
});

const isFormValid = computed(() => {
  return formData.value.terms && formData.value.privacy;
});
</script>

<template>
  <div class="p-6 lg:p-8 flex flex-col gap-8">
    <!-- Header -->
    <div class="flex flex-col gap-3 border-b border-surface-200 dark:border-surface-700 pb-6">
      <div class="flex items-center gap-3">
        <i class="pi pi-check text-3xl text-primary-500" />
        <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0">Checkbox</h1>
      </div>
      <p class="text-surface-600 dark:text-surface-300 max-w-3xl">
        Checkbox is an extension to standard checkbox element with theming capabilities and advanced features like indeterminate state.
        It supports binary values, arrays of values, and custom styling options.
      </p>
    </div>

    <!-- Basic -->
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-2">
        <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">Basic</h2>
        <Tag value="Most Common" severity="success" />
      </div>
      <p class="text-surface-600 dark:text-surface-300">Checkbox is used with the v-model property for two-way data binding.</p>
      
      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-3">
            <Checkbox id="basic-checkbox" v-model="checked" />
            <label for="basic-checkbox" class="font-medium text-surface-900 dark:text-surface-0 cursor-pointer">
              I agree to the terms and conditions
            </label>
          </div>
          <small class="text-surface-600 dark:text-surface-300">
            Checked: {{ checked }}
          </small>
        </div>
      </div>
    </div>

    <!-- Multiple Values -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">Multiple Values</h2>
      <p class="text-surface-600 dark:text-surface-300">Multiple checkboxes can be grouped together to work with an array of values.</p>
      
      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <h3 class="font-semibold text-surface-900 dark:text-surface-0 mb-2">Select your interests:</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div v-for="category in categories" :key="category.key" class="flex items-center gap-3">
              <Checkbox 
                :id="category.key" 
                v-model="selectedCategories" 
                :value="category.key" 
              />
              <label :for="category.key" class="font-medium text-surface-900 dark:text-surface-0 cursor-pointer">
                {{ category.name }}
              </label>
            </div>
          </div>
          <small class="text-surface-600 dark:text-surface-300">
            Selected: {{ selectedCategories.length ? selectedCategories.join(', ') : 'None' }}
          </small>
        </div>
      </div>
    </div>

    <!-- Binary Values -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">Binary Values</h2>
      <p class="text-surface-600 dark:text-surface-300">Checkbox can use custom values instead of boolean with binary-value mode.</p>
      
      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-3">
            <Checkbox 
              id="binary-checkbox" 
              v-model="binaryValue" 
              binary 
              trueValue="Yes" 
              falseValue="No"
            />
            <label for="binary-checkbox" class="font-medium text-surface-900 dark:text-surface-0 cursor-pointer">
              Subscribe to newsletter
            </label>
          </div>
          <small class="text-surface-600 dark:text-surface-300">
            Value: {{ binaryValue || 'No' }}
          </small>
        </div>
      </div>
    </div>

    <!-- Indeterminate State -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">Indeterminate State</h2>
      <p class="text-surface-600 dark:text-surface-300">Checkbox supports an indeterminate state when the value is neither true nor false.</p>
      
      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-3">
            <Checkbox 
              id="indeterminate-checkbox" 
              v-model="indeterminateValue" 
              :indeterminate="indeterminateValue === null"
            />
            <label for="indeterminate-checkbox" class="font-medium text-surface-900 dark:text-surface-0 cursor-pointer">
              Partial selection
            </label>
          </div>
          <div class="flex gap-2">
            <Button @click="indeterminateValue = true" size="small" outlined>Set True</Button>
            <Button @click="indeterminateValue = false" size="small" outlined>Set False</Button>
            <Button @click="indeterminateValue = null" size="small" outlined>Set Indeterminate</Button>
          </div>
          <small class="text-surface-600 dark:text-surface-300">
            State: {{ indeterminateValue === null ? 'Indeterminate' : String(indeterminateValue) }}
          </small>
        </div>
      </div>
    </div>

    <!-- Grouped Checkboxes -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">Grouped Checkboxes</h2>
      <p class="text-surface-600 dark:text-surface-300">Example of grouped checkboxes with a master checkbox that controls all others.</p>
      
      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-3 pb-3 border-b border-surface-200 dark:border-surface-700">
            <Checkbox 
              id="all-permissions" 
              v-model="allPermissions"
            />
            <label for="all-permissions" class="font-semibold text-surface-900 dark:text-surface-0 cursor-pointer">
              All Permissions
            </label>
          </div>
          
          <div class="flex flex-col gap-3 ml-6">
            <div class="flex items-center gap-3">
              <Checkbox id="read-permission" v-model="permissions.read" />
              <label for="read-permission" class="font-medium text-surface-900 dark:text-surface-0 cursor-pointer">
                Read Permission
              </label>
            </div>
            
            <div class="flex items-center gap-3">
              <Checkbox id="write-permission" v-model="permissions.write" />
              <label for="write-permission" class="font-medium text-surface-900 dark:text-surface-0 cursor-pointer">
                Write Permission
              </label>
            </div>
            
            <div class="flex items-center gap-3">
              <Checkbox id="execute-permission" v-model="permissions.execute" />
              <label for="execute-permission" class="font-medium text-surface-900 dark:text-surface-0 cursor-pointer">
                Execute Permission
              </label>
            </div>
          </div>
          
          <small class="text-surface-600 dark:text-surface-300">
            Selected permissions: {{ Object.entries(permissions).filter(([key, value]) => value).map(([key]) => key).join(', ') || 'None' }}
          </small>
        </div>
      </div>
    </div>

    <!-- Dynamic Options -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">Dynamic Options</h2>
      <p class="text-surface-600 dark:text-surface-300">Checkboxes can be generated dynamically from data arrays.</p>
      
      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <h3 class="font-semibold text-surface-900 dark:text-surface-0 mb-2">Available Options:</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div v-for="option in dynamicOptions" :key="option.value" class="flex items-center gap-3">
              <Checkbox 
                :id="option.value" 
                v-model="selectedDynamic" 
                :value="option.value" 
              />
              <label :for="option.value" class="font-medium text-surface-900 dark:text-surface-0 cursor-pointer">
                {{ option.label }}
              </label>
            </div>
          </div>
          <div class="flex gap-2 pt-2">
            <Button @click="selectedDynamic = []" size="small" outlined>Clear All</Button>
            <Button @click="selectedDynamic = dynamicOptions.map(o => o.value)" size="small" outlined>Select All</Button>
          </div>
          <small class="text-surface-600 dark:text-surface-300">
            Selected: {{ selectedDynamic.length }} of {{ dynamicOptions.length }} options
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
            <div class="flex items-center gap-3">
              <Checkbox id="invalid-checkbox" v-model="invalidValue" invalid />
              <label for="invalid-checkbox" class="font-medium text-surface-900 dark:text-surface-0 cursor-pointer">
                Invalid checkbox
              </label>
            </div>
            <small class="text-red-500">This field has an error.</small>
          </div>
        </div>
        
        <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
          <div class="flex flex-col gap-4">
            <h3 class="font-semibold text-surface-900 dark:text-surface-0">Disabled</h3>
            <div class="flex items-center gap-3">
              <Checkbox id="disabled-checkbox" v-model="disabledChecked" disabled />
              <label for="disabled-checkbox" class="font-medium text-surface-600 dark:text-surface-400">
                Disabled checkbox
              </label>
            </div>
            <small class="text-surface-600 dark:text-surface-300">This field is disabled.</small>
          </div>
        </div>
        
        <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
          <div class="flex flex-col gap-4">
            <h3 class="font-semibold text-surface-900 dark:text-surface-0">Readonly</h3>
            <div class="flex items-center gap-3">
              <Checkbox id="readonly-checkbox" v-model="readonlyValue" readonly />
              <label for="readonly-checkbox" class="font-medium text-surface-900 dark:text-surface-0">
                Readonly checkbox
              </label>
            </div>
            <small class="text-surface-600 dark:text-surface-300">This field is readonly.</small>
          </div>
        </div>
      </div>
    </div>

    <!-- Form Validation -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">Form Validation</h2>
      <p class="text-surface-600 dark:text-surface-300">Example of using checkboxes in form validation scenarios.</p>
      
      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-3">
            <Checkbox id="newsletter-checkbox" v-model="formData.newsletter" />
            <label for="newsletter-checkbox" class="font-medium text-surface-900 dark:text-surface-0 cursor-pointer">
              Subscribe to our newsletter (optional)
            </label>
          </div>
          
          <div class="flex items-center gap-3">
            <Checkbox 
              id="terms-checkbox" 
              v-model="formData.terms" 
              :invalid="!formData.terms"
            />
            <label for="terms-checkbox" class="font-medium text-surface-900 dark:text-surface-0 cursor-pointer">
              I agree to the Terms of Service *
            </label>
          </div>
          
          <div class="flex items-center gap-3">
            <Checkbox 
              id="privacy-checkbox" 
              v-model="formData.privacy" 
              :invalid="!formData.privacy"
            />
            <label for="privacy-checkbox" class="font-medium text-surface-900 dark:text-surface-0 cursor-pointer">
              I agree to the Privacy Policy *
            </label>
          </div>
          
          <div class="flex items-center gap-3 pt-3">
            <Button 
              :disabled="!isFormValid" 
              :severity="isFormValid ? 'primary' : 'secondary'"
            >
              Submit Form
            </Button>
            <small :class="isFormValid ? 'text-green-600' : 'text-red-500'">
              {{ isFormValid ? 'Form is valid' : 'Please accept required terms' }}
            </small>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>