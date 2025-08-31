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
const multipleIconValue = ref('');
const templateIconValue = ref('');
const emailIconValue = ref('');
const phoneIconValue = ref('');
const searchIconValue = ref('');
const passwordIconValue = ref('');
const locationIconValue = ref('');
const calendarIconValue = ref('');
const linkIconValue = ref('');
const tagIconValue = ref('');
const clearIconValue = ref('');
const copyIconValue = ref('');
const editIconValue = ref('');
const validateIconValue = ref('');
const infoIconValue = ref('');
const sendIconValue = ref('');

// Float Label
const floatLabelValue = ref('');

// Fluid
const fluidValue = ref('');

// Help Text
const helpTextValue = ref('');

// InputGroup
const addonValue = ref('');
const buttonValue = ref('');
const multipleAddonsValue = ref('');
const checkboxValue = ref('');
const dropdownValue = ref('Website');
const urlValue = ref('');
</script>

<template>
  <div class="p-6 lg:p-8 flex flex-col gap-8">
    <!-- Header -->
    <div class="flex flex-col gap-3 border-b border-surface-200 dark:border-surface-700 pb-6">
      <div class="flex items-center gap-3">
        <i class="pi pi-pencil text-3xl text-primary-500" />
        <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0">
          InputText
        </h1>
      </div>
      <p class="text-surface-600 dark:text-surface-300 max-w-3xl">
        InputText is an extension to standard HTML input element with theming and enhanced features.
        It integrates seamlessly with v-model for two-way data binding.
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
        InputText is used with the v-model property for two-way value binding.
      </p>

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
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Variants
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        InputText supports outlined and filled styling variants.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
          <div class="flex flex-col gap-4">
            <h3 class="font-semibold text-surface-900 dark:text-surface-0">
              Outlined (Default)
            </h3>
            <InputText v-model="outlinedValue" placeholder="Outlined input" />
          </div>
        </div>

        <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
          <div class="flex flex-col gap-4">
            <h3 class="font-semibold text-surface-900 dark:text-surface-0">
              Filled
            </h3>
            <InputText v-model="filledValue" variant="filled" placeholder="Filled input" />
          </div>
        </div>
      </div>
    </div>

    <!-- Sizes -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Sizes
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        InputText provides small and large sizes as alternatives to the regular size.
      </p>

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

    <!-- IconField -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        IconField
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        IconField wraps an input and an icon component to display icons inside input fields using IconField and InputIcon components.
      </p>

      <!-- Basic Icon Positioning -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
          <div class="flex flex-col gap-4">
            <h3 class="font-semibold text-surface-900 dark:text-surface-0">
              Left Icon
            </h3>
            <IconField icon-position="left">
              <InputIcon class="pi pi-user" />
              <InputText v-model="leftIconValue" placeholder="Username" fluid />
            </IconField>
          </div>
        </div>

        <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
          <div class="flex flex-col gap-4">
            <h3 class="font-semibold text-surface-900 dark:text-surface-0">
              Right Icon
            </h3>
            <IconField icon-position="right">
              <InputText v-model="rightIconValue" placeholder="Search" fluid />
              <InputIcon class="pi pi-search" />
            </IconField>
          </div>
        </div>
        <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
          <div class="flex flex-col gap-4">
            <h3 class="font-semibold text-surface-900 dark:text-surface-0">
              Multiple Icons
            </h3>
            <p class="text-surface-600 dark:text-surface-300 text-sm">
              Multiple icons can be displayed by wrapping the input in multiple IconField components.
            </p>
            <IconField icon-position="left">
              <InputIcon class="pi pi-user" />
              <IconField icon-position="right">
                <InputIcon class="pi pi-search" />
                <InputText v-model="multipleIconValue" placeholder="Search users" />
              </IconField>
            </IconField>
          </div>
        </div>

        <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
          <div class="flex flex-col gap-4">
            <h3 class="font-semibold text-surface-900 dark:text-surface-0">
              Clear Field
            </h3>
            <IconField>
              <InputText v-model="clearIconValue" placeholder="Text with clear" fluid />
              <InputIcon class="pi pi-times cursor-pointer hover:text-red-500 transition-colors" />
            </IconField>
          </div>
        </div>
      </div>

      <!-- Template Icons -->
      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <h3 class="font-semibold text-surface-900 dark:text-surface-0">
            Template Icons
          </h3>
          <p class="text-surface-600 dark:text-surface-300 text-sm">
            Custom icon content can be templated for more complex use cases.
          </p>
          <IconField icon-position="left">
            <InputIcon>
              <i class="pi pi-spin pi-spinner text-primary-500" />
            </InputIcon>
            <InputText v-model="templateIconValue" placeholder="Loading..." disabled />
          </IconField>
        </div>
      </div>
    </div>

    <!-- Float Label -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Float Label
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        FloatLabel creates a floating label effect when the input is focused or has a value.
      </p>

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
            <InputText v-model="invalidValue" invalid placeholder="Invalid state" />
            <small class="text-red-500">This field has an error.</small>
          </div>
        </div>

        <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
          <div class="flex flex-col gap-4">
            <h3 class="font-semibold text-surface-900 dark:text-surface-0">
              Disabled
            </h3>
            <InputText v-model="disabledValue" disabled />
            <small class="text-surface-600 dark:text-surface-300">This field is disabled.</small>
          </div>
        </div>

        <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
          <div class="flex flex-col gap-4">
            <h3 class="font-semibold text-surface-900 dark:text-surface-0">
              Readonly
            </h3>
            <InputText v-model="readonlyValue" readonly />
            <small class="text-surface-600 dark:text-surface-300">This field is readonly.</small>
          </div>
        </div>
      </div>
    </div>

    <!-- Fluid -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Fluid
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Fluid property spans the input to 100% width of its container.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <InputText v-model="fluidValue" fluid placeholder="Fluid input spans full width" />
        </div>
      </div>
    </div>

    <!-- Help Text -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Help Text
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Advisory information can be displayed with validation messages or helper text.
      </p>

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

    <!-- InputGroup -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        InputGroup
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        InputGroup is used to add text, buttons, or other content as addons to an input field for enhanced user interaction.
      </p>

      <!-- Basic Addons -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
          <div class="flex flex-col gap-4">
            <h3 class="font-semibold text-surface-900 dark:text-surface-0">
              Left Addon
            </h3>
            <InputGroup>
              <InputGroupAddon>
                <i class="pi pi-user" />
              </InputGroupAddon>
              <InputText v-model="addonValue" placeholder="Username" />
            </InputGroup>
          </div>
        </div>

        <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
          <div class="flex flex-col gap-4">
            <h3 class="font-semibold text-surface-900 dark:text-surface-0">
              Right Addon
            </h3>
            <InputGroup>
              <InputText v-model="urlValue" placeholder="yoursite" />
              <InputGroupAddon>.com</InputGroupAddon>
            </InputGroup>
          </div>
        </div>
      </div>

      <!-- Button Addons -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
          <div class="flex flex-col gap-4">
            <h3 class="font-semibold text-surface-900 dark:text-surface-0">
              Button Addon
            </h3>
            <InputGroup>
              <InputText v-model="buttonValue" placeholder="Search..." />
              <Button icon="pi pi-search" aria-label="Search" />
            </InputGroup>
          </div>
        </div>

        <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
          <div class="flex flex-col gap-4">
            <h3 class="font-semibold text-surface-900 dark:text-surface-0">
              Multiple Buttons
            </h3>
            <InputGroup>
              <Button icon="pi pi-check" aria-label="Confirm" />
              <Button icon="pi pi-times" aria-label="Cancel" />
              <InputText placeholder="Enter text" />
            </InputGroup>
          </div>
        </div>
      </div>

      <!-- Advanced Examples -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
          <div class="flex flex-col gap-4">
            <h3 class="font-semibold text-surface-900 dark:text-surface-0">
              Multiple Addons
            </h3>
            <InputGroup>
              <InputGroupAddon>$</InputGroupAddon>
              <InputText v-model="multipleAddonsValue" placeholder="Price" />
              <InputGroupAddon>.00</InputGroupAddon>
            </InputGroup>
          </div>
        </div>

        <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
          <div class="flex flex-col gap-4">
            <h3 class="font-semibold text-surface-900 dark:text-surface-0">
              Checkbox Addon
            </h3>
            <InputGroup>
              <InputGroupAddon>
                <Checkbox v-model="checkboxValue" binary />
              </InputGroupAddon>
              <InputText placeholder="Agreement text" />
            </InputGroup>
          </div>
        </div>
      </div>

      <!-- Complex Example -->
      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <h3 class="font-semibold text-surface-900 dark:text-surface-0">
            Dropdown with Input
          </h3>
          <InputGroup>
            <Dropdown v-model="dropdownValue" :options="['Website', 'Email', 'Phone']" placeholder="Select type" class="w-32" />
            <InputText placeholder="Enter value" />
            <Button icon="pi pi-search" aria-label="Search" />
          </InputGroup>
        </div>
      </div>

      <!-- Size Variants -->
      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <h3 class="font-semibold text-surface-900 dark:text-surface-0">
            Size Variants
          </h3>
          <div class="flex flex-col gap-3">
            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium text-surface-900 dark:text-surface-0">Small</label>
              <InputGroup>
                <InputGroupAddon>
                  <i class="pi pi-envelope text-sm" />
                </InputGroupAddon>
                <InputText placeholder="Small size" size="small" />
                <Button icon="pi pi-send" size="small" aria-label="Send" />
              </InputGroup>
            </div>

            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium text-surface-900 dark:text-surface-0">Large</label>
              <InputGroup>
                <InputGroupAddon>
                  <i class="pi pi-envelope" />
                </InputGroupAddon>
                <InputText placeholder="Large size" size="large" />
                <Button icon="pi pi-send" size="large" aria-label="Send" />
              </InputGroup>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
