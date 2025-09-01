<script setup lang="ts">
import { ref } from 'vue';

const _severity = ref('info');
const _tooltipValue = ref('Enter your username');
const showDelayValue = ref(1000);
const hideDelayValue = ref(300);
const _customTooltip = ref('PrimeVue Rocks');

const _severityOptions = ['info', 'success', 'warn', 'danger', 'secondary', 'contrast'];
</script>

<template>
  <div class="p-6 space-y-8">
    <!-- Header -->
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-4">
        <Icon name="pi:info-circle" size="32" class="text-primary-500" />
        <div class="flex flex-col">
          <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0">
            Tooltip
          </h1>
          <p class="text-surface-600 dark:text-surface-300">
            Tooltip directive provides advisory information for a component.
          </p>
        </div>
      </div>
    </div>

    <!-- Position Options -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Position Options
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        There are four choices to position the tooltip: right (default), top, bottom, and left.
      </p>

      <div class="card">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium text-surface-700 dark:text-surface-300">Right (Default)</label>
            <InputText v-tooltip="'Enter your username'" type="text" placeholder="Hover me" />
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium text-surface-700 dark:text-surface-300">Top</label>
            <InputText v-tooltip.top="'Enter your username'" type="text" placeholder="Hover me" />
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium text-surface-700 dark:text-surface-300">Bottom</label>
            <InputText v-tooltip.bottom="'Enter your username'" type="text" placeholder="Hover me" />
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium text-surface-700 dark:text-surface-300">Left</label>
            <InputText v-tooltip.left="'Enter your username'" type="text" placeholder="Hover me" />
          </div>
        </div>
      </div>
    </div>

    <!-- Event Triggers -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Event Triggers
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Event to display the tooltip is defined as a modifier. Default event is hover, alternative is focus.
      </p>

      <div class="card">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium text-surface-700 dark:text-surface-300">Hover (Default)</label>
            <InputText v-tooltip.top="'Shown on hover'" type="text" placeholder="Hover over me" />
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium text-surface-700 dark:text-surface-300">Focus</label>
            <InputText v-tooltip.focus.top="'Shown on focus'" type="text" placeholder="Focus on me" />
          </div>
        </div>

        <div class="mt-6">
          <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">
            Button Examples
          </h3>
          <div class="flex flex-wrap gap-3">
            <Button v-tooltip.top="'Save your work'" label="Save" icon="pi pi-save" />
            <Button v-tooltip.right="'Cancel current action'" label="Cancel" icon="pi pi-times" severity="secondary" />
            <Button v-tooltip.bottom="'Delete permanently'" label="Delete" icon="pi pi-trash" severity="danger" />
            <Button v-tooltip.left="'Edit this item'" label="Edit" icon="pi pi-pencil" severity="success" />
          </div>
        </div>
      </div>
    </div>

    <!-- Auto Hide Behavior -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Auto Hide Behavior
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Tooltip gets hidden when mouse leaves the target element by default. Set autoHide to false to keep the tooltip visible when hovering over it.
      </p>

      <div class="card">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium text-surface-700 dark:text-surface-300">Auto Hide: False</label>
            <InputText v-tooltip.bottom="{ value: 'This tooltip stays visible when you hover over it', autoHide: false }" type="text" placeholder="Hover and move to tooltip" />
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium text-surface-700 dark:text-surface-300">Auto Hide: True (Default)</label>
            <InputText v-tooltip.bottom="'This tooltip hides when you leave the input'" type="text" placeholder="Standard behavior" />
          </div>
        </div>
      </div>
    </div>

    <!-- Delay Configuration -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Delay Configuration
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Configure show and hide delays to control when tooltips appear and disappear.
      </p>

      <div class="card">
        <div class="flex flex-col gap-4 mb-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium text-surface-700 dark:text-surface-300">Show Delay (ms)</label>
              <InputNumber v-model="showDelayValue" :min="0" :max="5000" :step="100" />
            </div>
            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium text-surface-700 dark:text-surface-300">Hide Delay (ms)</label>
              <InputNumber v-model="hideDelayValue" :min="0" :max="5000" :step="100" />
            </div>
          </div>
        </div>

        <div class="flex flex-wrap gap-3">
          <Button
            v-tooltip="{ value: 'Confirm to proceed with custom delays', showDelay: showDelayValue, hideDelay: hideDelayValue }"
            label="Custom Delay"
            icon="pi pi-clock"
          />
          <Button
            v-tooltip="{ value: 'Quick tooltip (no delay)', showDelay: 0, hideDelay: 0 }"
            label="No Delay"
            severity="secondary"
          />
          <Button
            v-tooltip="{ value: 'Slow tooltip (2s delay)', showDelay: 2000, hideDelay: 500 }"
            label="Slow Show"
            severity="success"
          />
        </div>
      </div>
    </div>

    <!-- Custom Styling -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Custom Styling
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Customize tooltip appearance using the pt (pass through) option to apply custom styles.
      </p>

      <div class="card">
        <div class="flex flex-wrap gap-3 mb-6">
          <Button
            v-tooltip.bottom="{
              value: 'PrimeVue Rocks',
              pt: {
                arrow: {
                  style: {
                    borderBottomColor: 'var(--p-primary-color)',
                  },
                },
                text: '!bg-primary !text-primary-contrast !font-medium',
              },
            }"
            label="Custom Primary"
            severity="primary"
          />

          <Button
            v-tooltip.top="{
              value: 'Success Message',
              pt: {
                arrow: {
                  style: {
                    borderTopColor: '#10b981',
                  },
                },
                text: '!bg-green-500 !text-white !font-bold !px-3 !py-2 !rounded-lg !shadow-lg',
              },
            }"
            label="Custom Success"
            severity="success"
          />

          <Button
            v-tooltip.right="{
              value: 'Warning Alert',
              pt: {
                arrow: {
                  style: {
                    borderRightColor: '#f59e0b',
                  },
                },
                text: '!bg-yellow-500 !text-black !font-semibold !border-2 !border-yellow-600',
              },
            }"
            label="Custom Warning"
            severity="warn"
          />

          <Button
            v-tooltip.left="{
              value: 'Danger Zone',
              pt: {
                arrow: {
                  style: {
                    borderLeftColor: '#ef4444',
                  },
                },
                text: '!bg-red-500 !text-white !font-bold !text-sm !uppercase !tracking-wide',
              },
            }"
            label="Custom Danger"
            severity="danger"
          />
        </div>

        <div class="bg-surface-50 dark:bg-surface-800 p-4 rounded-lg">
          <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">
            Icon Examples
          </h3>
          <div class="flex flex-wrap gap-4">
            <i
              v-tooltip.top="'Home Page'"
              class="pi pi-home text-2xl text-primary-500 cursor-pointer hover:text-primary-600 transition-colors"
            />
            <i
              v-tooltip.top="'Settings'"
              class="pi pi-cog text-2xl text-surface-600 dark:text-surface-300 cursor-pointer hover:text-surface-800 dark:hover:text-surface-100 transition-colors"
            />
            <i
              v-tooltip.top="'Notifications'"
              class="pi pi-bell text-2xl text-yellow-500 cursor-pointer hover:text-yellow-600 transition-colors"
            />
            <i
              v-tooltip.top="'User Profile'"
              class="pi pi-user text-2xl text-blue-500 cursor-pointer hover:text-blue-600 transition-colors"
            />
            <i
              v-tooltip.top="'Search'"
              class="pi pi-search text-2xl text-green-500 cursor-pointer hover:text-green-600 transition-colors"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Interactive Examples -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Interactive Examples
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Real-world examples showing tooltips in various UI contexts.
      </p>

      <div class="card">
        <!-- Toolbar with Tooltips -->
        <div class="mb-6">
          <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">
            Toolbar Example
          </h3>
          <Toolbar>
            <template #start>
              <div class="flex items-center gap-2">
                <Button
                  v-tooltip.bottom="'Create new document'"
                  icon="pi pi-file"
                  text
                />
                <Button
                  v-tooltip.bottom="'Open existing file'"
                  icon="pi pi-folder-open"
                  text
                />
                <Button
                  v-tooltip.bottom="'Save current document'"
                  icon="pi pi-save"
                  text
                />
                <Divider layout="vertical" />
                <Button
                  v-tooltip.bottom="'Undo last action'"
                  icon="pi pi-undo"
                  text
                />
                <Button
                  v-tooltip.bottom="'Redo last action'"
                  icon="pi pi-refresh"
                  text
                />
              </div>
            </template>

            <template #end>
              <div class="flex items-center gap-2">
                <Button
                  v-tooltip.bottom="'Application settings'"
                  icon="pi pi-cog"
                  text
                />
                <Button
                  v-tooltip.bottom="'Help and support'"
                  icon="pi pi-question-circle"
                  text
                />
              </div>
            </template>
          </Toolbar>
        </div>

        <!-- Form with Tooltips -->
        <div class="mb-6">
          <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">
            Form Example
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium text-surface-700 dark:text-surface-300">
                Username
                <i v-tooltip.right="'Username must be 3-20 characters long'" class="pi pi-question-circle text-surface-500 ml-1" />
              </label>
              <InputText
                v-tooltip.bottom="'Enter a unique username'"
                placeholder="Enter username"
              />
            </div>

            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium text-surface-700 dark:text-surface-300">
                Email
                <i v-tooltip.right="'We will never share your email address'" class="pi pi-info-circle text-primary-500 ml-1" />
              </label>
              <InputText
                v-tooltip.bottom="'Enter a valid email address'"
                placeholder="Enter email"
                type="email"
              />
            </div>

            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium text-surface-700 dark:text-surface-300">
                Password
                <i v-tooltip.right="'Password must contain at least 8 characters with one uppercase, one lowercase, and one number'" class="pi pi-shield text-orange-500 ml-1" />
              </label>
              <Password
                v-tooltip.bottom="'Choose a strong password'"
                placeholder="Enter password"
                toggle-mask
              />
            </div>

            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium text-surface-700 dark:text-surface-300">
                Country
                <i v-tooltip.right="'Select your country for localized experience'" class="pi pi-globe text-blue-500 ml-1" />
              </label>
              <Select
                v-tooltip.bottom="'Choose your country'"
                :options="['United States', 'Canada', 'United Kingdom', 'Germany', 'France']"
                placeholder="Select country"
              />
            </div>
          </div>
        </div>

        <!-- Status Indicators -->
        <div>
          <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">
            Status Indicators
          </h3>
          <div class="flex flex-wrap gap-4">
            <div class="flex items-center gap-2">
              <div
                v-tooltip.top="'System is running normally'"
                class="w-3 h-3 bg-green-500 rounded-full cursor-pointer"
              />
              <span class="text-sm">System Status</span>
            </div>

            <div class="flex items-center gap-2">
              <div
                v-tooltip.top="'Database connection established'"
                class="w-3 h-3 bg-green-500 rounded-full cursor-pointer"
              />
              <span class="text-sm">Database</span>
            </div>

            <div class="flex items-center gap-2">
              <div
                v-tooltip.top="'API response time: 120ms'"
                class="w-3 h-3 bg-yellow-500 rounded-full cursor-pointer"
              />
              <span class="text-sm">API</span>
            </div>

            <div class="flex items-center gap-2">
              <div
                v-tooltip.top="'Cache service temporarily unavailable'"
                class="w-3 h-3 bg-red-500 rounded-full cursor-pointer"
              />
              <span class="text-sm">Cache</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
