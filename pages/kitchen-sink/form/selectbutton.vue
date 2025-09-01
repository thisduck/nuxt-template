<script setup lang="ts">
// Basic Selection
const selectedValue = ref('');
const basicOptions = ['One-Way', 'Return'];

// Forms Integration
const selectedFormValue = ref('');

// Multiple Selection
const selectedMultiple = ref([]);
const multipleOptions = [
  { name: 'Option 1', value: 'opt1' },
  { name: 'Option 2', value: 'opt2' },
  { name: 'Option 3', value: 'opt3' },
];

// Template with Icons
const selectedTemplate = ref('');
const templateOptions = [
  { value: 'left', icon: 'pi pi-align-left' },
  { value: 'center', icon: 'pi pi-align-center' },
  { value: 'right', icon: 'pi pi-align-right' },
  { value: 'justify', icon: 'pi pi-align-justify' },
];

// Sizes
const selectedSmall = ref('');
const selectedNormal = ref('');
const selectedLarge = ref('');
const sizeOptions = ['Beginner', 'Expert'];

// States
const selectedInvalid = ref(null);
const selectedDisabled = ref('Return');
const disabledOptions = ['Off', 'On'];
const partiallyDisabledOptions = [
  { name: 'Option 1', value: 'opt1', constant: false },
  { name: 'Option 2', value: 'opt2', constant: true },
];

// Custom Examples
const selectedView = ref('list');
const viewOptions = [
  { label: 'List', value: 'list', icon: 'pi pi-bars' },
  { label: 'Grid', value: 'grid', icon: 'pi pi-th-large' },
  { label: 'Card', value: 'card', icon: 'pi pi-id-card' },
];

const selectedTheme = ref('');
const themeOptions = [
  { label: 'Light', value: 'light', icon: 'pi pi-sun' },
  { label: 'Dark', value: 'dark', icon: 'pi pi-moon' },
  { label: 'Auto', value: 'auto', icon: 'pi pi-cog' },
];

// tRPC Backend
const { $trpc } = useNuxtApp();
const selectedLanguages = ref([]);
const availableLanguages = ref([]);

// Load programming languages from backend
onMounted(async () => {
  try {
    const languages = await $trpc.getProgrammingLanguages.query();
    availableLanguages.value = languages;
  } catch (error) {
    console.error('Failed to load languages:', error);
    // Fallback data
    availableLanguages.value = [
      { id: 1, name: 'JavaScript', category: 'Frontend', popularity: 95, icon: 'pi pi-code' },
      { id: 2, name: 'TypeScript', category: 'Frontend', popularity: 85, icon: 'pi pi-code' },
      { id: 3, name: 'Python', category: 'Backend', popularity: 90, icon: 'pi pi-server' },
      { id: 4, name: 'Java', category: 'Backend', popularity: 80, icon: 'pi pi-server' },
      { id: 5, name: 'Go', category: 'Backend', popularity: 70, icon: 'pi pi-server' },
      { id: 6, name: 'Rust', category: 'Systems', popularity: 65, icon: 'pi pi-cog' },
    ];
  }
});
</script>

<template>
  <div class="p-6 lg:p-8 flex flex-col gap-8">
    <!-- Header -->
    <div class="flex flex-col gap-3 border-b border-surface-200 dark:border-surface-700 pb-6">
      <div class="flex items-center gap-3">
        <i class="pi pi-stop text-3xl text-primary-500" />
        <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0">
          SelectButton
        </h1>
      </div>
      <p class="text-surface-600 dark:text-surface-300 max-w-3xl">
        SelectButton is used to choose single or multiple items from a list using buttons. It provides an alternative to dropdowns and checkboxes with a more visual button-based interface.
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
        SelectButton is used with the v-model property for two-way value binding along with the options collection.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <label class="font-semibold text-surface-900 dark:text-surface-0">Trip Type</label>
          <SelectButton v-model="selectedValue" :options="basicOptions" />
          <small class="text-surface-600 dark:text-surface-300">
            Selected: {{ selectedValue || 'None' }}
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
        SelectButton integrates with form validation and provides error handling.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <label class="font-semibold text-surface-900 dark:text-surface-0">Trip Type (Required)</label>
          <SelectButton
            v-model="selectedFormValue"
            :options="basicOptions"
            :invalid="!selectedFormValue"
          />
          <Message v-if="!selectedFormValue" severity="error" size="small">
            Please select a trip type
          </Message>
          <small class="text-surface-600 dark:text-surface-300">
            Form validation with error messaging
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
        SelectButton allows selecting multiple items when the multiple option is enabled. The model property should be an array.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <label class="font-semibold text-surface-900 dark:text-surface-0">Features</label>
          <SelectButton
            v-model="selectedMultiple"
            :options="multipleOptions"
            option-label="name"
            option-value="value"
            multiple
          />
          <small class="text-surface-600 dark:text-surface-300">
            Selected: {{ selectedMultiple.length > 0 ? selectedMultiple.join(', ') : 'None' }}
          </small>
        </div>
      </div>
    </div>

    <!-- Template with Icons -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Template with Icons
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Custom content can be displayed using option templates. Perfect for icon-based selections.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
          <div class="flex flex-col gap-4">
            <label class="font-semibold text-surface-900 dark:text-surface-0">Text Alignment</label>
            <SelectButton
              v-model="selectedTemplate"
              :options="templateOptions"
              option-label="value"
              data-key="value"
            >
              <template #option="slotProps">
                <i :class="slotProps.option.icon" />
              </template>
            </SelectButton>
            <small class="text-surface-600 dark:text-surface-300">
              Icon-only buttons for alignment
            </small>
          </div>
        </div>

        <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
          <div class="flex flex-col gap-4">
            <label class="font-semibold text-surface-900 dark:text-surface-0">View Mode</label>
            <SelectButton
              v-model="selectedView"
              :options="viewOptions"
              option-label="label"
              option-value="value"
              data-key="value"
            >
              <template #option="slotProps">
                <div class="flex items-center gap-2">
                  <i :class="slotProps.option.icon" />
                  <span>{{ slotProps.option.label }}</span>
                </div>
              </template>
            </SelectButton>
            <small class="text-surface-600 dark:text-surface-300">
              Icons with labels for better UX
            </small>
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
        SelectButton provides small and large sizes as alternatives to the base size.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <label class="font-semibold text-surface-900 dark:text-surface-0">Small</label>
            <SelectButton v-model="selectedSmall" :options="sizeOptions" size="small" />
          </div>
          <div class="flex flex-col gap-2">
            <label class="font-semibold text-surface-900 dark:text-surface-0">Normal</label>
            <SelectButton v-model="selectedNormal" :options="sizeOptions" />
          </div>
          <div class="flex flex-col gap-2">
            <label class="font-semibold text-surface-900 dark:text-surface-0">Large</label>
            <SelectButton v-model="selectedLarge" :options="sizeOptions" size="large" />
          </div>
        </div>
      </div>
    </div>

    <!-- Advanced Examples -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Advanced Examples
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Real-world examples showing practical usage patterns.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
          <div class="flex flex-col gap-4">
            <label class="font-semibold text-surface-900 dark:text-surface-0">Theme Selector</label>
            <SelectButton
              v-model="selectedTheme"
              :options="themeOptions"
              option-label="label"
              option-value="value"
              allow-empty
            >
              <template #option="slotProps">
                <div class="flex flex-col items-center gap-1 px-3 py-2">
                  <i :class="slotProps.option.icon" class="text-lg" />
                  <span class="text-sm">{{ slotProps.option.label }}</span>
                </div>
              </template>
            </SelectButton>
            <small class="text-surface-600 dark:text-surface-300">
              Vertical layout with allow-empty option
            </small>
          </div>
        </div>

        <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
          <div class="flex flex-col gap-4">
            <label class="font-semibold text-surface-900 dark:text-surface-0">Priority Level</label>
            <SelectButton
              v-model="selectedValue"
              :options="['Low', 'Medium', 'High', 'Critical']"
              class="priority-buttons"
            >
              <template #option="{ option }">
                <span
                  :class="{
                    'text-green-600': option === 'Low',
                    'text-yellow-600': option === 'Medium',
                    'text-orange-600': option === 'High',
                    'text-red-600': option === 'Critical',
                  }"
                >
                  {{ option }}
                </span>
              </template>
            </SelectButton>
            <small class="text-surface-600 dark:text-surface-300">
              Color-coded options for priority levels
            </small>
          </div>
        </div>
      </div>
    </div>

    <!-- States -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        States
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Different states can be applied to indicate validation or interaction constraints.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
          <div class="flex flex-col gap-4">
            <h3 class="font-semibold text-surface-900 dark:text-surface-0">
              Invalid
            </h3>
            <SelectButton
              v-model="selectedInvalid"
              :options="basicOptions"
              allow-empty
              :invalid="selectedInvalid === null"
            />
            <small class="text-red-500">Required selection missing</small>
          </div>
        </div>

        <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
          <div class="flex flex-col gap-4">
            <h3 class="font-semibold text-surface-900 dark:text-surface-0">
              Disabled
            </h3>
            <SelectButton
              v-model="selectedDisabled"
              :options="disabledOptions"
              disabled
            />
            <small class="text-surface-600 dark:text-surface-300">Entire component disabled</small>
          </div>
        </div>

        <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
          <div class="flex flex-col gap-4">
            <h3 class="font-semibold text-surface-900 dark:text-surface-0">
              Partial Disable
            </h3>
            <SelectButton
              v-model="selectedValue"
              :options="partiallyDisabledOptions"
              option-label="name"
              option-value="value"
              option-disabled="constant"
            />
            <small class="text-surface-600 dark:text-surface-300">Some options disabled</small>
          </div>
        </div>
      </div>
    </div>

    <!-- tRPC Backend Integration -->
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-2">
        <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
          tRPC Backend Integration
        </h2>
        <Tag value="Real API" severity="info" />
      </div>
      <p class="text-surface-600 dark:text-surface-300">
        SelectButton with data loaded from tRPC backend for type-safe API integration.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-6">
          <div class="flex items-center gap-2">
            <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-0">
              Programming Languages
            </h3>
            <Tag :value="`${availableLanguages.length} available`" severity="info" />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Single Selection -->
            <div class="flex flex-col gap-4">
              <label class="font-semibold text-surface-900 dark:text-surface-0">Primary Language</label>
              <SelectButton
                v-model="selectedValue"
                :options="availableLanguages.slice(0, 3)"
                option-label="name"
                option-value="name"
              >
                <template #option="slotProps">
                  <div class="flex flex-col items-center gap-1 px-2 py-3">
                    <i :class="slotProps.option.icon" />
                    <span class="text-sm font-medium">{{ slotProps.option.name }}</span>
                    <small class="text-surface-500">{{ slotProps.option.category }}</small>
                  </div>
                </template>
              </SelectButton>
              <small class="text-surface-600 dark:text-surface-300">
                Single selection with custom template
              </small>
            </div>

            <!-- Multiple Selection -->
            <div class="flex flex-col gap-4">
              <label class="font-semibold text-surface-900 dark:text-surface-0">Known Languages</label>
              <SelectButton
                v-model="selectedLanguages"
                :options="availableLanguages"
                option-label="name"
                option-value="name"
                multiple
                class="flex-wrap"
              >
                <template #option="slotProps">
                  <div class="flex items-center gap-2 px-3 py-2">
                    <i :class="slotProps.option.icon" />
                    <div class="flex flex-col">
                      <span class="font-medium">{{ slotProps.option.name }}</span>
                      <small class="text-surface-500">{{ slotProps.option.popularity }}%</small>
                    </div>
                  </div>
                </template>
              </SelectButton>
              <small class="text-surface-600 dark:text-surface-300">
                Selected: {{ selectedLanguages.length }} languages
              </small>
            </div>
          </div>

          <div class="pt-4 border-t border-surface-200 dark:border-surface-700">
            <small class="text-surface-500 dark:text-surface-400">
              Language data loaded from tRPC backend with popularity ratings and categorization
            </small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.priority-buttons :deep(.p-selectbutton .p-button) {
  min-width: 80px;
}
</style>
