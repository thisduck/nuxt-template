<script setup lang="ts">
// Basic
const basicValue = ref('');

// Auto Resize
const autoResizeValue = ref('');

// Filled variant
const filledValue = ref('');

// Sizes
const smallValue = ref('');
const normalValue = ref('');
const largeValue = ref('');

// Invalid state
const invalidValue = ref('');

// Disabled state
const disabledValue = ref('Disabled textarea content');

// Accessibility examples
const accessibilityValue1 = ref('');
const accessibilityValue2 = ref('');
const accessibilityValue3 = ref('');
</script>

<template>
  <div class="p-6 lg:p-8 flex flex-col gap-8">
    <!-- Header -->
    <div class="flex flex-col gap-3 border-b border-surface-200 dark:border-surface-700 pb-6">
      <div class="flex items-center gap-3">
        <i class="pi pi-align-left text-3xl text-primary-500" />
        <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0">
          Textarea
        </h1>
      </div>
      <p class="text-surface-600 dark:text-surface-300 max-w-3xl">
        Textarea adds styling and autoResize functionality to standard textarea element.
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
        Textarea is used with the v-model property for two-way value binding.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <label for="basic-textarea" class="font-semibold text-surface-900 dark:text-surface-0">Message</label>
          <Textarea id="basic-textarea" v-model="basicValue" rows="5" cols="30" />
          <small class="text-surface-600 dark:text-surface-300">Character count: {{ basicValue.length }}</small>
        </div>
      </div>
    </div>

    <!-- Auto Resize -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Auto Resize
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        When autoResize is enabled, textarea grows instead of displaying a scrollbar.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <label for="auto-resize-textarea" class="font-semibold text-surface-900 dark:text-surface-0">Auto Resize Textarea</label>
          <Textarea
            id="auto-resize-textarea"
            v-model="autoResizeValue"
            auto-resize
            rows="5"
            cols="30"
          />
          <small class="text-surface-600 dark:text-surface-300">This textarea expands as you type</small>
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
          <label for="filled-textarea" class="font-semibold text-surface-900 dark:text-surface-0">Filled Variant</label>
          <Textarea id="filled-textarea" v-model="filledValue" variant="filled" rows="5" cols="30" />
          <small class="text-surface-600 dark:text-surface-300">Enhanced visual emphasis with filled styling</small>
        </div>
      </div>
    </div>

    <!-- Sizes -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Sizes
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Textarea provides small and large sizes as alternatives to the base.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-2">
            <label for="small-textarea" class="font-semibold text-surface-900 dark:text-surface-0">Small</label>
            <Textarea id="small-textarea" v-model="smallValue" size="small" placeholder="Small" rows="3" />
          </div>

          <div class="flex flex-col gap-2">
            <label for="normal-textarea" class="font-semibold text-surface-900 dark:text-surface-0">Normal</label>
            <Textarea id="normal-textarea" v-model="normalValue" placeholder="Normal" rows="3" />
          </div>

          <div class="flex flex-col gap-2">
            <label for="large-textarea" class="font-semibold text-surface-900 dark:text-surface-0">Large</label>
            <Textarea id="large-textarea" v-model="largeValue" size="large" placeholder="Large" rows="3" />
          </div>
        </div>
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
          <label for="invalid-textarea" class="font-semibold text-surface-900 dark:text-surface-0">Address</label>
          <Textarea
            id="invalid-textarea"
            v-model="invalidValue"
            rows="5"
            cols="30"
            :invalid="!invalidValue"
            style="resize: none"
            placeholder="Address"
          />
          <small :class="!invalidValue ? 'text-red-500' : 'text-surface-600 dark:text-surface-300'">
            {{ !invalidValue ? 'Address is required.' : 'Validation passed.' }}
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
          <label for="disabled-textarea" class="font-semibold text-surface-600 dark:text-surface-400">Disabled</label>
          <Textarea id="disabled-textarea" v-model="disabledValue" rows="5" cols="30" disabled />
          <small class="text-surface-600 dark:text-surface-300">This textarea cannot be modified</small>
        </div>
      </div>
    </div>

    <!-- Accessibility -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Accessibility
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Textarea component renders a native textarea element that implicitly includes any passed prop. Value to describe the component can either be provided via label tag combined with id prop or using aria-labelledby, aria-label props.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-2">
            <label for="address1" class="font-semibold text-surface-900 dark:text-surface-0">Address 1</label>
            <Textarea id="address1" v-model="accessibilityValue1" rows="3" cols="30" />
          </div>

          <div class="flex flex-col gap-2">
            <span id="address2" class="font-semibold text-surface-900 dark:text-surface-0">Address 2</span>
            <Textarea v-model="accessibilityValue2" aria-labelledby="address2" rows="3" cols="30" />
          </div>

          <div class="flex flex-col gap-2">
            <span class="font-semibold text-surface-900 dark:text-surface-0">Address Details (aria-label)</span>
            <Textarea v-model="accessibilityValue3" aria-label="Address Details" rows="3" cols="30" />
          </div>

          <small class="text-surface-600 dark:text-surface-300">
            Keyboard Support: Tab to focus
          </small>
        </div>
      </div>
    </div>
  </div>
</template>
