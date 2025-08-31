<script setup lang="ts">
// Basic
const basicValue = ref('');

// Auto Resize
const autoResizeValue = ref('');

// Variants
const outlinedValue = ref('');
const filledValue = ref('');

// Sizes
const smallValue = ref('');
const normalValue = ref('');
const largeValue = ref('');

// States
const disabledValue = ref('This textarea is disabled and cannot be edited.');
const invalidValue = ref('');
const readonlyValue = ref('This is readonly content that cannot be modified.');

// Rows and Columns
const customSizeValue = ref('');

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
        <i class="pi pi-align-left text-3xl text-primary-500" />
        <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0">Textarea</h1>
      </div>
      <p class="text-surface-600 dark:text-surface-300 max-w-3xl">
        Textarea is a multi-line text input component that extends the standard HTML textarea element with theming and enhanced features.
        It supports auto-resizing, validation states, and fluid layouts.
      </p>
    </div>

    <!-- Basic -->
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-2">
        <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">Basic</h2>
        <Tag value="Most Common" severity="success" />
      </div>
      <p class="text-surface-600 dark:text-surface-300">Textarea is used with the v-model property for two-way data binding.</p>
      
      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <label for="basic-textarea" class="font-semibold text-surface-900 dark:text-surface-0">Message</label>
          <Textarea id="basic-textarea" v-model="basicValue" placeholder="Enter your message" rows="4" />
          <small class="text-surface-600 dark:text-surface-300">Character count: {{ basicValue.length }}</small>
        </div>
      </div>
    </div>

    <!-- Auto Resize -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">Auto Resize</h2>
      <p class="text-surface-600 dark:text-surface-300">Textarea can automatically adjust its height based on content with the autoResize property.</p>
      
      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <label for="auto-resize-textarea" class="font-semibold text-surface-900 dark:text-surface-0">Auto Resize Textarea</label>
          <Textarea 
            id="auto-resize-textarea" 
            v-model="autoResizeValue" 
            autoResize 
            placeholder="Start typing... This textarea will grow automatically" 
            rows="2"
          />
          <small class="text-surface-600 dark:text-surface-300">This textarea expands as you type</small>
        </div>
      </div>
    </div>

    <!-- Variants -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">Variants</h2>
      <p class="text-surface-600 dark:text-surface-300">Textarea supports outlined and filled styling variants.</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
          <div class="flex flex-col gap-4">
            <h3 class="font-semibold text-surface-900 dark:text-surface-0">Outlined (Default)</h3>
            <Textarea v-model="outlinedValue" placeholder="Outlined textarea" rows="3" />
          </div>
        </div>
        
        <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
          <div class="flex flex-col gap-4">
            <h3 class="font-semibold text-surface-900 dark:text-surface-0">Filled</h3>
            <Textarea v-model="filledValue" variant="filled" placeholder="Filled textarea" rows="3" />
          </div>
        </div>
      </div>
    </div>

    <!-- Sizes -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">Sizes</h2>
      <p class="text-surface-600 dark:text-surface-300">Textarea provides small and large sizes as alternatives to the regular size.</p>
      
      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-2">
            <label class="font-semibold text-surface-900 dark:text-surface-0">Small</label>
            <Textarea v-model="smallValue" size="small" placeholder="Small textarea" rows="2" />
          </div>
          
          <div class="flex flex-col gap-2">
            <label class="font-semibold text-surface-900 dark:text-surface-0">Normal</label>
            <Textarea v-model="normalValue" placeholder="Normal textarea" rows="3" />
          </div>
          
          <div class="flex flex-col gap-2">
            <label class="font-semibold text-surface-900 dark:text-surface-0">Large</label>
            <Textarea v-model="largeValue" size="large" placeholder="Large textarea" rows="4" />
          </div>
        </div>
      </div>
    </div>

    <!-- Rows and Columns -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">Rows and Columns</h2>
      <p class="text-surface-600 dark:text-surface-300">The number of rows and columns can be customized to control the textarea dimensions.</p>
      
      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <label for="custom-size-textarea" class="font-semibold text-surface-900 dark:text-surface-0">Custom Size (6 rows)</label>
          <Textarea 
            id="custom-size-textarea" 
            v-model="customSizeValue" 
            placeholder="This textarea has 6 rows" 
            rows="6" 
          />
          <small class="text-surface-600 dark:text-surface-300">6 rows for longer content</small>
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
            <Textarea v-model="invalidValue" invalid placeholder="Invalid textarea" rows="3" />
            <small class="text-red-500">This field has an error.</small>
          </div>
        </div>
        
        <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
          <div class="flex flex-col gap-4">
            <h3 class="font-semibold text-surface-900 dark:text-surface-0">Disabled</h3>
            <Textarea v-model="disabledValue" disabled rows="3" />
            <small class="text-surface-600 dark:text-surface-300">This field is disabled.</small>
          </div>
        </div>
        
        <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
          <div class="flex flex-col gap-4">
            <h3 class="font-semibold text-surface-900 dark:text-surface-0">Readonly</h3>
            <Textarea v-model="readonlyValue" readonly rows="3" />
            <small class="text-surface-600 dark:text-surface-300">This field is readonly.</small>
          </div>
        </div>
      </div>
    </div>

    <!-- Fluid -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">Fluid</h2>
      <p class="text-surface-600 dark:text-surface-300">Fluid property spans the textarea to 100% width of its container.</p>
      
      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <Textarea v-model="fluidValue" fluid placeholder="Fluid textarea spans full width" rows="4" />
        </div>
      </div>
    </div>

    <!-- Help Text -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">Help Text</h2>
      <p class="text-surface-600 dark:text-surface-300">Advisory information can be displayed with validation messages or helper text.</p>
      
      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-2">
          <label for="help-textarea" class="font-semibold text-surface-900 dark:text-surface-0">Comments</label>
          <Textarea id="help-textarea" v-model="helpTextValue" placeholder="Enter your comments" rows="4" />
          <small class="text-surface-600 dark:text-surface-300">
            Please provide detailed comments about your experience. Maximum 500 characters.
          </small>
        </div>
      </div>
    </div>

  </div>
</template>