<script setup lang="ts">
const inputValue = ref('');
const disabledValue = ref('Disabled input');
const floatLabelValue = ref('');
const invalidValue = ref('');
const helpValue = ref('');
</script>

<template>
  <div class="p-6 lg:p-8 flex flex-col gap-8">
    <!-- Header -->
    <div class="flex items-center gap-3 border-b border-surface-200 dark:border-surface-700 pb-4">
      <i class="pi pi-pencil text-3xl text-primary-500" />
      <div>
        <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0 mb-2">
          InputText
        </h1>
        <p class="text-surface-600 dark:text-surface-300">
          InputText is an extension to standard input element with theming and sizing options.
        </p>
      </div>
    </div>

    <!-- Basic Usage -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Basic Usage
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
          <div class="flex flex-col gap-4">
            <h3 class="font-semibold text-surface-900 dark:text-surface-0">
              Basic Input
            </h3>
            <InputText v-model="inputValue" placeholder="Enter text" />
            <div class="text-sm text-surface-600 dark:text-surface-300">
              Value: "{{ inputValue }}"
            </div>
          </div>
        </div>

        <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
          <div class="flex flex-col gap-4">
            <h3 class="font-semibold text-surface-900 dark:text-surface-0">
              Disabled
            </h3>
            <InputText v-model="disabledValue" disabled />
            <div class="text-sm text-surface-600 dark:text-surface-300">
              Disabled input field
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- With Icons -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        With Icons
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
          <div class="flex flex-col gap-4">
            <h3 class="font-semibold text-surface-900 dark:text-surface-0">
              Left Icon
            </h3>
            <IconField icon-position="left">
              <InputIcon class="pi pi-user" />
              <InputText placeholder="Username" />
            </IconField>
          </div>
        </div>

        <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
          <div class="flex flex-col gap-4">
            <h3 class="font-semibold text-surface-900 dark:text-surface-0">
              Right Icon
            </h3>
            <IconField icon-position="right">
              <InputIcon class="pi pi-search" />
              <InputText placeholder="Search" />
            </IconField>
          </div>
        </div>
      </div>
    </div>

    <!-- Sizes -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Sizes
      </h2>
      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-2">
            <label class="font-semibold text-surface-900 dark:text-surface-0">Small</label>
            <InputText placeholder="Small" size="small" />
          </div>
          <div class="flex flex-col gap-2">
            <label class="font-semibold text-surface-900 dark:text-surface-0">Normal</label>
            <InputText placeholder="Normal" />
          </div>
          <div class="flex flex-col gap-2">
            <label class="font-semibold text-surface-900 dark:text-surface-0">Large</label>
            <InputText placeholder="Large" size="large" />
          </div>
        </div>
      </div>
    </div>

    <!-- Float Label -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Float Label
      </h2>
      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700 max-w-md">
        <div class="flex flex-col gap-4">
          <FloatLabel>
            <InputText v-model="floatLabelValue" input-id="float-input" />
            <label for="float-input">Float Label</label>
          </FloatLabel>
        </div>
      </div>
    </div>

    <!-- Validation States -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Validation States
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
          <div class="flex flex-col gap-4">
            <h3 class="font-semibold text-surface-900 dark:text-surface-0">
              Invalid
            </h3>
            <InputText v-model="invalidValue" invalid placeholder="Invalid input" />
            <small class="text-red-500">This field is required.</small>
          </div>
        </div>

        <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
          <div class="flex flex-col gap-4">
            <h3 class="font-semibold text-surface-900 dark:text-surface-0">
              With Help Text
            </h3>
            <InputText v-model="helpValue" placeholder="Enter your email" />
            <small class="text-surface-600 dark:text-surface-300">We'll never share your email with anyone.</small>
          </div>
        </div>
      </div>
    </div>

    <!-- Code Example -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Code Example
      </h2>
      <div class="bg-surface-900 dark:bg-surface-800 p-6 rounded-2xl border border-surface-200 dark:border-surface-700 overflow-x-auto">
        <pre class="text-green-400 text-sm"><code>&lt;script setup&gt;
const value = ref('');
&lt;/script&gt;

&lt;template&gt;
  &lt;InputText v-model="value" placeholder="Enter text" /&gt;
&lt;/template&gt;</code></pre>
      </div>
    </div>
  </div>
</template>

