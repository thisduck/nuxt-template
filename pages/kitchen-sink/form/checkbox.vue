<script setup lang="ts">
// Basic - Binary checkbox
const checked = ref(false);

// Group - Multiple checkboxes
const pizza = ref([]);

// Dynamic - Generated from list
const categories = ref([
  { key: 'accounting', name: 'Accounting' },
  { key: 'marketing', name: 'Marketing' },
  { key: 'production', name: 'Production' },
  { key: 'research', name: 'Research' },
]);
const selectedCategories = ref([]);

// Indeterminate
const indeterminateChecked = ref(false);

// Filled variant
const filledChecked = ref(true);

// Sizes
const size = ref([]);

// Invalid state
const invalidChecked = ref(false);

// Disabled states
const disabledChecked1 = ref(false);
const disabledChecked2 = ref(true);

// Form validation example
const formData = ref({
  terms: false,
  newsletter: false,
  privacy: false,
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
        <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0">
          Checkbox
        </h1>
      </div>
      <p class="text-surface-600 dark:text-surface-300 max-w-3xl">
        Checkbox is an extension to standard checkbox element with theming.
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
        Binary checkbox is used with the v-model for two-way value binding and the binary property.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-3">
            <Checkbox v-model="checked" input-id="basic-checkbox" binary />
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

    <!-- Group -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Group
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Multiple checkboxes can be grouped together.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <h3 class="font-semibold text-surface-900 dark:text-surface-0 mb-2">
            Pizza Toppings:
          </h3>
          <div class="flex flex-wrap justify-center gap-4">
            <div class="flex items-center gap-2">
              <Checkbox v-model="pizza" input-id="ingredient1" name="pizza" value="Cheese" />
              <label for="ingredient1" class="font-medium text-surface-900 dark:text-surface-0 cursor-pointer">
                Cheese
              </label>
            </div>
            <div class="flex items-center gap-2">
              <Checkbox v-model="pizza" input-id="ingredient2" name="pizza" value="Mushroom" />
              <label for="ingredient2" class="font-medium text-surface-900 dark:text-surface-0 cursor-pointer">
                Mushroom
              </label>
            </div>
            <div class="flex items-center gap-2">
              <Checkbox v-model="pizza" input-id="ingredient3" name="pizza" value="Pepper" />
              <label for="ingredient3" class="font-medium text-surface-900 dark:text-surface-0 cursor-pointer">
                Pepper
              </label>
            </div>
            <div class="flex items-center gap-2">
              <Checkbox v-model="pizza" input-id="ingredient4" name="pizza" value="Onion" />
              <label for="ingredient4" class="font-medium text-surface-900 dark:text-surface-0 cursor-pointer">
                Onion
              </label>
            </div>
          </div>
          <small class="text-surface-600 dark:text-surface-300">
            Selected: {{ pizza.length ? pizza.join(', ') : 'None' }}
          </small>
        </div>
      </div>
    </div>

    <!-- Dynamic -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Dynamic
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Checkboxes can be generated using a list of values.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <h3 class="font-semibold text-surface-900 dark:text-surface-0 mb-2">
            Departments:
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div v-for="category of categories" :key="category.key" class="flex items-center gap-2">
              <Checkbox
                v-model="selectedCategories"
                :input-id="category.key"
                name="category"
                :value="category.name"
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

    <!-- Indeterminate -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Indeterminate
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        When indeterminate is present, the checkbox masks the actual value visually.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-3">
            <Checkbox v-model="indeterminateChecked" input-id="indeterminate-checkbox" indeterminate binary />
            <label for="indeterminate-checkbox" class="font-medium text-surface-900 dark:text-surface-0 cursor-pointer">
              Partial selection state
            </label>
          </div>
          <div class="flex gap-2">
            <Button size="small" outlined @click="indeterminateChecked = true">
              Check
            </Button>
            <Button size="small" outlined @click="indeterminateChecked = false">
              Uncheck
            </Button>
          </div>
          <small class="text-surface-600 dark:text-surface-300">
            Value: {{ indeterminateChecked }}
          </small>
        </div>
      </div>
    </div>

    <!-- Filled -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Filled
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Specify the variant property as filled to display the component with a higher visual emphasis than the default outlined style.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-3">
            <Checkbox v-model="filledChecked" input-id="filled-checkbox" binary variant="filled" />
            <label for="filled-checkbox" class="font-medium text-surface-900 dark:text-surface-0 cursor-pointer">
              Filled variant checkbox
            </label>
          </div>
          <small class="text-surface-600 dark:text-surface-300">
            Enhanced visual emphasis with filled styling
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
        Checkbox provides small and large sizes as alternatives to the base.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-wrap justify-center gap-4">
          <div class="flex items-center gap-2">
            <Checkbox v-model="size" input-id="size_small" name="size" value="Small" size="small" />
            <label for="size_small" class="text-sm font-medium text-surface-900 dark:text-surface-0 cursor-pointer">
              Small
            </label>
          </div>
          <div class="flex items-center gap-2">
            <Checkbox v-model="size" input-id="size_normal" name="size" value="Normal" />
            <label for="size_normal" class="font-medium text-surface-900 dark:text-surface-0 cursor-pointer">
              Normal
            </label>
          </div>
          <div class="flex items-center gap-2">
            <Checkbox v-model="size" input-id="size_large" name="size" value="Large" size="large" />
            <label for="size_large" class="text-lg font-medium text-surface-900 dark:text-surface-0 cursor-pointer">
              Large
            </label>
          </div>
        </div>
        <small class="text-surface-600 dark:text-surface-300 mt-4">
          Selected sizes: {{ size.length ? size.join(', ') : 'None' }}
        </small>
      </div>
    </div>

    <!-- Invalid -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Invalid
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Invalid state is displayed using the invalid prop to indicate a failed validation. You can use this style when integrating with form validation libraries.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-3">
            <Checkbox v-model="invalidChecked" input-id="invalid-checkbox" :invalid="!invalidChecked" binary />
            <label for="invalid-checkbox" class="font-medium text-surface-900 dark:text-surface-0 cursor-pointer">
              Required checkbox
            </label>
          </div>
          <small :class="!invalidChecked ? 'text-red-500' : 'text-surface-600 dark:text-surface-300'">
            {{ !invalidChecked ? 'This field is required.' : 'Validation passed.' }}
          </small>
        </div>
      </div>
    </div>

    <!-- Disabled -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Disabled
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        When disabled is present, the element cannot be edited and focused.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-3">
            <Checkbox v-model="disabledChecked1" input-id="disabled-checkbox1" binary disabled />
            <label for="disabled-checkbox1" class="font-medium text-surface-600 dark:text-surface-400">
              Disabled unchecked
            </label>
          </div>
          <div class="flex items-center gap-3">
            <Checkbox v-model="disabledChecked2" input-id="disabled-checkbox2" binary disabled />
            <label for="disabled-checkbox2" class="font-medium text-surface-600 dark:text-surface-400">
              Disabled checked
            </label>
          </div>
          <small class="text-surface-600 dark:text-surface-300">
            These checkboxes cannot be modified
          </small>
        </div>
      </div>
    </div>

    <!-- Accessibility -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Accessibility
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Proper labeling techniques for screen readers and keyboard navigation support.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-3">
            <label for="chkbox1" class="font-medium text-surface-900 dark:text-surface-0 cursor-pointer">
              Remember Me (with inputId)
            </label>
            <Checkbox input-id="chkbox1" binary />
          </div>

          <div class="flex items-center gap-3">
            <span id="chkbox2" class="font-medium text-surface-900 dark:text-surface-0">
              Subscribe (with aria-labelledby)
            </span>
            <Checkbox aria-labelledby="chkbox2" binary />
          </div>

          <div class="flex items-center gap-3">
            <Checkbox aria-label="Accept Terms (with aria-label)" binary />
            <span class="font-medium text-surface-900 dark:text-surface-0">
              Accept Terms (with aria-label)
            </span>
          </div>

          <small class="text-surface-600 dark:text-surface-300">
            Keyboard Support: Tab to focus • Space to toggle
          </small>
        </div>
      </div>
    </div>

    <!-- Form Integration -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Form Integration
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Example of checkboxes used in form validation scenarios.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-3">
            <Checkbox v-model="formData.newsletter" input-id="form-newsletter" binary />
            <label for="form-newsletter" class="font-medium text-surface-900 dark:text-surface-0 cursor-pointer">
              Subscribe to newsletter (optional)
            </label>
          </div>

          <div class="flex items-center gap-3">
            <Checkbox
              v-model="formData.terms"
              input-id="form-terms"
              :invalid="!formData.terms"
              binary
            />
            <label for="form-terms" class="font-medium text-surface-900 dark:text-surface-0 cursor-pointer">
              I agree to the Terms of Service *
            </label>
          </div>

          <div class="flex items-center gap-3">
            <Checkbox
              v-model="formData.privacy"
              input-id="form-privacy"
              :invalid="!formData.privacy"
              binary
            />
            <label for="form-privacy" class="font-medium text-surface-900 dark:text-surface-0 cursor-pointer">
              I agree to the Privacy Policy *
            </label>
          </div>

          <div class="flex items-center gap-3 pt-3 border-t border-surface-200 dark:border-surface-700">
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
