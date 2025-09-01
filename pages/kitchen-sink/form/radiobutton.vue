<script setup lang="ts">
// Basic Group
const selectedIngredient = ref('');
const ingredients = [
  { label: 'Cheese', value: 'Cheese' },
  { label: 'Mushroom', value: 'Mushroom' },
  { label: 'Pepper', value: 'Pepper' },
  { label: 'Onion', value: 'Onion' },
];

// Forms Integration
const selectedFormIngredient = ref('');

// Dynamic Generation
const selectedCategory = ref('');
const categories = [
  { key: 'accounting', name: 'Accounting' },
  { key: 'marketing', name: 'Marketing' },
  { key: 'production', name: 'Production' },
  { key: 'research', name: 'Research' },
];

// Sizes
const selectedSize = ref('');

// States
const selectedValid = ref('');
const selectedInvalid = ref('');
const selectedDisabled = ref('Option1');

// Filled Variant
const selectedFilled = ref('');

// tRPC Backend
const { $trpc } = useNuxtApp();
const selectedPriority = ref('');
const priorities = ref([]);

// Load priorities from backend
onMounted(async () => {
  try {
    priorities.value = await $trpc.getPriorities.query();
  } catch (error) {
    console.error('Failed to load priorities:', error);
    // Fallback data
    priorities.value = [
      { id: 1, name: 'Low', description: 'Not urgent, can be done later', color: '#10B981' },
      { id: 2, name: 'Medium', description: 'Important but not critical', color: '#F59E0B' },
      { id: 3, name: 'High', description: 'Needs attention soon', color: '#EF4444' },
      { id: 4, name: 'Critical', description: 'Urgent and important', color: '#DC2626' },
    ];
  }
});
</script>

<template>
  <div class="p-6 lg:p-8 flex flex-col gap-8">
    <!-- Header -->
    <div class="flex flex-col gap-3 border-b border-surface-200 dark:border-surface-700 pb-6">
      <div class="flex items-center gap-3">
        <i class="pi pi-circle text-3xl text-primary-500" />
        <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0">
          RadioButton
        </h1>
      </div>
      <p class="text-surface-600 dark:text-surface-300 max-w-3xl">
        RadioButton is an extension to standard radio button element with theming. It provides exclusive selection within a group of options, allowing users to choose only one option from multiple choices.
      </p>
    </div>

    <!-- Basic Group -->
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-2">
        <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
          Basic Group
        </h2>
        <Tag value="Most Common" severity="success" />
      </div>
      <p class="text-surface-600 dark:text-surface-300">
        RadioButton is used with the v-model property for two-way value binding. All radio buttons in a group must share the same name attribute.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <label class="font-semibold text-surface-900 dark:text-surface-0">Pizza Ingredients</label>
          <div class="flex flex-wrap gap-4">
            <div v-for="ingredient in ingredients" :key="ingredient.value" class="flex items-center gap-2">
              <RadioButton
                v-model="selectedIngredient"
                :input-id="ingredient.value.toLowerCase()"
                name="pizza"
                :value="ingredient.value"
              />
              <label :for="ingredient.value.toLowerCase()">{{ ingredient.label }}</label>
            </div>
          </div>
          <small class="text-surface-600 dark:text-surface-300">
            Selected: {{ selectedIngredient || 'None' }}
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
        RadioButton integrates seamlessly with form validation and provides error handling.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <label class="font-semibold text-surface-900 dark:text-surface-0">Pizza Ingredients (Required)</label>
          <div class="flex flex-wrap gap-4">
            <div v-for="ingredient in ingredients" :key="ingredient.value" class="flex items-center gap-2">
              <RadioButton
                v-model="selectedFormIngredient"
                :input-id="`form-${ingredient.value.toLowerCase()}`"
                name="form-pizza"
                :value="ingredient.value"
                :invalid="!selectedFormIngredient"
              />
              <label :for="`form-${ingredient.value.toLowerCase()}`">{{ ingredient.label }}</label>
            </div>
          </div>
          <Message v-if="!selectedFormIngredient" severity="error" size="small">
            Please select a pizza ingredient
          </Message>
          <small class="text-surface-600 dark:text-surface-300">
            Form validation with error messaging
          </small>
        </div>
      </div>
    </div>

    <!-- Dynamic Generation -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Dynamic Generation
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        RadioButtons can be generated dynamically using a list of values with v-for directive.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <label class="font-semibold text-surface-900 dark:text-surface-0">Department</label>
          <div class="flex flex-wrap gap-4">
            <div v-for="category in categories" :key="category.key" class="flex items-center gap-2">
              <RadioButton
                v-model="selectedCategory"
                :input-id="category.key"
                name="dynamic"
                :value="category.name"
              />
              <label :for="category.key">{{ category.name }}</label>
            </div>
          </div>
          <small class="text-surface-600 dark:text-surface-300">
            Selected: {{ selectedCategory || 'None' }}
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
        RadioButton provides small and large sizes as alternatives to the base size.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <label class="font-semibold text-surface-900 dark:text-surface-0">Size Preference</label>
          <div class="flex flex-wrap gap-4 items-center">
            <div class="flex items-center gap-2">
              <RadioButton
                v-model="selectedSize"
                input-id="size_small"
                name="size"
                value="Small"
                size="small"
              />
              <label for="size_small" class="text-sm">Small</label>
            </div>
            <div class="flex items-center gap-2">
              <RadioButton
                v-model="selectedSize"
                input-id="size_normal"
                name="size"
                value="Normal"
              />
              <label for="size_normal">Normal</label>
            </div>
            <div class="flex items-center gap-2">
              <RadioButton
                v-model="selectedSize"
                input-id="size_large"
                name="size"
                value="Large"
                size="large"
              />
              <label for="size_large" class="text-lg">Large</label>
            </div>
          </div>
          <small class="text-surface-600 dark:text-surface-300">
            Selected: {{ selectedSize || 'None' }}
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
        Use the filled variant for higher visual emphasis than the default outlined style.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <label class="font-semibold text-surface-900 dark:text-surface-0">Theme Preference</label>
          <div class="flex flex-wrap gap-4">
            <div class="flex items-center gap-2">
              <RadioButton
                v-model="selectedFilled"
                input-id="theme_light"
                name="theme"
                value="Light"
                variant="filled"
              />
              <label for="theme_light">Light Theme</label>
            </div>
            <div class="flex items-center gap-2">
              <RadioButton
                v-model="selectedFilled"
                input-id="theme_dark"
                name="theme"
                value="Dark"
                variant="filled"
              />
              <label for="theme_dark">Dark Theme</label>
            </div>
            <div class="flex items-center gap-2">
              <RadioButton
                v-model="selectedFilled"
                input-id="theme_auto"
                name="theme"
                value="Auto"
                variant="filled"
              />
              <label for="theme_auto">Auto Theme</label>
            </div>
          </div>
          <small class="text-surface-600 dark:text-surface-300">
            Enhanced visual emphasis with filled background
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

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
          <div class="flex flex-col gap-4">
            <h3 class="font-semibold text-surface-900 dark:text-surface-0">
              Valid
            </h3>
            <div class="flex flex-col gap-3">
              <div class="flex items-center gap-2">
                <RadioButton v-model="selectedValid" input-id="valid1" name="valid" value="Option1" />
                <label for="valid1">Option 1</label>
              </div>
              <div class="flex items-center gap-2">
                <RadioButton v-model="selectedValid" input-id="valid2" name="valid" value="Option2" />
                <label for="valid2">Option 2</label>
              </div>
            </div>
            <small class="text-surface-600 dark:text-surface-300">Normal state</small>
          </div>
        </div>

        <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
          <div class="flex flex-col gap-4">
            <h3 class="font-semibold text-surface-900 dark:text-surface-0">
              Invalid
            </h3>
            <div class="flex flex-col gap-3">
              <div class="flex items-center gap-2">
                <RadioButton v-model="selectedInvalid" input-id="invalid1" name="invalid" value="Option1" :invalid="!selectedInvalid" />
                <label for="invalid1">Option 1</label>
              </div>
              <div class="flex items-center gap-2">
                <RadioButton v-model="selectedInvalid" input-id="invalid2" name="invalid" value="Option2" :invalid="!selectedInvalid" />
                <label for="invalid2">Option 2</label>
              </div>
            </div>
            <small class="text-red-500">Error state for validation</small>
          </div>
        </div>

        <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
          <div class="flex flex-col gap-4">
            <h3 class="font-semibold text-surface-900 dark:text-surface-0">
              Disabled
            </h3>
            <div class="flex flex-col gap-3">
              <div class="flex items-center gap-2">
                <RadioButton v-model="selectedDisabled" input-id="disabled1" name="disabled" value="Option1" disabled />
                <label for="disabled1">Option 1</label>
              </div>
              <div class="flex items-center gap-2">
                <RadioButton v-model="selectedDisabled" input-id="disabled2" name="disabled" value="Option2" disabled />
                <label for="disabled2">Option 2</label>
              </div>
            </div>
            <small class="text-surface-600 dark:text-surface-300">Cannot be edited</small>
          </div>
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
        RadioButton with data loaded from tRPC backend for type-safe API integration.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <label class="font-semibold text-surface-900 dark:text-surface-0">Task Priority</label>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="priority in priorities" :key="priority.id" class="flex items-center gap-3 p-3 border border-surface-200 dark:border-surface-700 rounded-lg hover:bg-surface-50 dark:hover:bg-surface-800">
              <RadioButton
                v-model="selectedPriority"
                :input-id="`priority-${priority.id}`"
                name="priority"
                :value="priority.name"
              />
              <div class="flex-1">
                <label :for="`priority-${priority.id}`" class="flex items-center gap-2 cursor-pointer">
                  <div
                    class="w-3 h-3 rounded"
                    :style="{ backgroundColor: priority.color }"
                  />
                  <div class="flex flex-col">
                    <span class="font-medium">{{ priority.name }}</span>
                    <small class="text-surface-500">{{ priority.description }}</small>
                  </div>
                </label>
              </div>
            </div>
          </div>
          <small class="text-surface-600 dark:text-surface-300">
            Selected: {{ selectedPriority || 'None' }}
          </small>
          <small class="text-surface-500 dark:text-surface-400">
            Priority options loaded from tRPC backend with type safety
          </small>
        </div>
      </div>
    </div>
  </div>
</template>
