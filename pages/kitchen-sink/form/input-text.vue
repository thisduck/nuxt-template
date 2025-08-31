<script setup lang="ts">
// Basic
const basicValue = ref('');

// Variants
const outlinedValue = ref('');
const filledValue = ref('');

// Sizes
const smallValue = ref('');
const normalValue = ref('');
const largeValue = ref('');

// States
const disabledValue = ref('Disabled text');
const invalidValue = ref('');
const readonlyValue = ref('Readonly text');

// Icons
const leftIconValue = ref('');
const rightIconValue = ref('');

// Float Label
const floatLabelValue = ref('');

// Fluid
const fluidValue = ref('');

// Help Text
const helpTextValue = ref('');
</script>

<template>
  <div class="p-6 lg:p-8 flex flex-col gap-8">
    <!-- Header -->
    <div class="flex flex-col gap-3 border-b border-surface-200 dark:border-surface-700 pb-6">
      <div class="flex items-center gap-3">
        <i class="pi pi-pencil text-3xl text-primary-500" />
        <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0">InputText</h1>
      </div>
      <p class="text-surface-600 dark:text-surface-300 max-w-3xl">
        InputText is an extension to standard HTML input element with theming and enhanced features. 
        It integrates seamlessly with v-model for two-way data binding.
      </p>
    </div>

    <!-- Basic -->
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-2">
        <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">Basic</h2>
        <Tag value="Most Common" severity="success" />
      </div>
      <p class="text-surface-600 dark:text-surface-300">InputText is used with the v-model property for two-way value binding.</p>
      
      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <label for="basic-input" class="font-semibold text-surface-900 dark:text-surface-0">Username</label>
          <InputText id="basic-input" v-model="basicValue" placeholder="Enter username" />
          <small class="text-surface-600 dark:text-surface-300">Current value: {{ basicValue || 'empty' }}</small>
        </div>
      </div>

    </div>

    <!-- Variants -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">Variants</h2>
      <p class="text-surface-600 dark:text-surface-300">InputText supports outlined and filled styling variants.</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
          <div class="flex flex-col gap-4">
            <h3 class="font-semibold text-surface-900 dark:text-surface-0">Outlined (Default)</h3>
            <InputText v-model="outlinedValue" placeholder="Outlined input" />
          </div>
        </div>
        
        <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
          <div class="flex flex-col gap-4">
            <h3 class="font-semibold text-surface-900 dark:text-surface-0">Filled</h3>
            <InputText v-model="filledValue" variant="filled" placeholder="Filled input" />
          </div>
        </div>
      </div>

    </div>

    <!-- Sizes -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">Sizes</h2>
      <p class="text-surface-600 dark:text-surface-300">InputText provides small and large sizes as alternatives to the regular size.</p>
      
      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-2">
            <label class="font-semibold text-surface-900 dark:text-surface-0">Small</label>
            <InputText v-model="smallValue" size="small" placeholder="Small size" />
          </div>
          
          <div class="flex flex-col gap-2">
            <label class="font-semibold text-surface-900 dark:text-surface-0">Normal</label>
            <InputText v-model="normalValue" placeholder="Normal size" />
          </div>
          
          <div class="flex flex-col gap-2">
            <label class="font-semibold text-surface-900 dark:text-surface-0">Large</label>
            <InputText v-model="largeValue" size="large" placeholder="Large size" />
          </div>
        </div>
      </div>

    </div>

    <!-- Icons -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">Icons</h2>
      <p class="text-surface-600 dark:text-surface-300">Icons can be placed inside an input field with IconField and InputIcon components.</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
          <div class="flex flex-col gap-4">
            <h3 class="font-semibold text-surface-900 dark:text-surface-0">Left Icon</h3>
            <IconField icon-position="left">
              <InputIcon class="pi pi-user" />
              <InputText v-model="leftIconValue" placeholder="Username" />
            </IconField>
          </div>
        </div>
        
        <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
          <div class="flex flex-col gap-4">
            <h3 class="font-semibold text-surface-900 dark:text-surface-0">Right Icon</h3>
            <IconField icon-position="right">
              <InputIcon class="pi pi-search" />
              <InputText v-model="rightIconValue" placeholder="Search" />
            </IconField>
          </div>
        </div>
      </div>

    </div>

    <!-- Float Label -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">Float Label</h2>
      <p class="text-surface-600 dark:text-surface-300">FloatLabel creates a floating label effect when the input is focused or has a value.</p>
      
      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-6">
          <FloatLabel>
            <InputText id="float-input" v-model="floatLabelValue" />
            <label for="float-input">Email Address</label>
          </FloatLabel>
          
          <FloatLabel variant="on">
            <InputText id="float-on-input" />
            <label for="float-on-input">On Top Label</label>
          </FloatLabel>
          
          <FloatLabel variant="in">
            <InputText id="float-in-input" />
            <label for="float-in-input">In Label</label>
          </FloatLabel>
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
            <InputText v-model="invalidValue" invalid placeholder="Invalid state" />
            <small class="text-red-500">This field has an error.</small>
          </div>
        </div>
        
        <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
          <div class="flex flex-col gap-4">
            <h3 class="font-semibold text-surface-900 dark:text-surface-0">Disabled</h3>
            <InputText v-model="disabledValue" disabled />
            <small class="text-surface-600 dark:text-surface-300">This field is disabled.</small>
          </div>
        </div>
        
        <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
          <div class="flex flex-col gap-4">
            <h3 class="font-semibold text-surface-900 dark:text-surface-0">Readonly</h3>
            <InputText v-model="readonlyValue" readonly />
            <small class="text-surface-600 dark:text-surface-300">This field is readonly.</small>
          </div>
        </div>
      </div>

    </div>

    <!-- Fluid -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">Fluid</h2>
      <p class="text-surface-600 dark:text-surface-300">Fluid property spans the input to 100% width of its container.</p>
      
      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <InputText v-model="fluidValue" fluid placeholder="Fluid input spans full width" />
        </div>
      </div>

    </div>

    <!-- Help Text -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">Help Text</h2>
      <p class="text-surface-600 dark:text-surface-300">Advisory information can be displayed with validation messages or helper text.</p>
      
      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-2">
          <label for="help-input" class="font-semibold text-surface-900 dark:text-surface-0">Email</label>
          <InputText id="help-input" v-model="helpTextValue" placeholder="Enter your email" />
          <small class="text-surface-600 dark:text-surface-300">
            Enter the email address associated with your account.
          </small>
        </div>
      </div>

    </div>

  </div>
</template>