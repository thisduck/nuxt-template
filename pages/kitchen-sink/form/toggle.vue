<script setup lang="ts">
// ToggleSwitch Examples
const basicSwitchChecked = ref(false);
const preselectedSwitchChecked = ref(true);
const formSwitchChecked = ref(false);
const invalidSwitchChecked = ref(false);
const templateSwitchChecked = ref(false);
const disabledSwitchChecked = ref(true);

// ToggleButton Examples
const basicButtonChecked = ref(false);
const formButtonChecked = ref(false);
const customButtonChecked = ref(false);
const smallButtonChecked = ref(false);
const normalButtonChecked = ref(false);
const largeButtonChecked = ref(false);
const invalidButtonChecked = ref(false);
const disabledButtonChecked = ref(true);

// tRPC Backend
const { $trpc } = useNuxtApp();
const settingsLoading = ref(false);
const userSettings = ref({
  notifications: false,
  darkMode: false,
  autoSave: false,
  emailAlerts: false,
  soundEffects: false,
});

// Load user settings from backend
onMounted(async () => {
  try {
    settingsLoading.value = true;
    const settings = await $trpc.getUserSettings.query();
    userSettings.value = { ...userSettings.value, ...settings };
  } catch (error) {
    console.error('Failed to load user settings:', error);
  } finally {
    settingsLoading.value = false;
  }
});

// Save settings to backend
async function saveSettings() {
  try {
    settingsLoading.value = true;
    await $trpc.updateUserSettings.mutate(userSettings.value);
    console.log('Settings saved successfully');
  } catch (error) {
    console.error('Failed to save settings:', error);
  } finally {
    settingsLoading.value = false;
  }
}

// Watch for changes and auto-save
watch(userSettings, async (newSettings) => {
  if (!settingsLoading.value) {
    await saveSettings();
  }
}, { deep: true });
</script>

<template>
  <div class="p-6 lg:p-8 flex flex-col gap-8">
    <!-- Header -->
    <div class="flex flex-col gap-3 border-b border-surface-200 dark:border-surface-700 pb-6">
      <div class="flex items-center gap-3">
        <i class="pi pi-toggle-on text-3xl text-primary-500" />
        <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0">
          Toggle Components
        </h1>
      </div>
      <p class="text-surface-600 dark:text-surface-300 max-w-3xl">
        Toggle components provide boolean selection controls. ToggleSwitch offers a sleek switch interface, while ToggleButton provides a button-based toggle with customizable labels and icons.
      </p>
    </div>

    <!-- ToggleSwitch Section -->
    <div class="flex flex-col gap-8">
      <div class="flex items-center gap-2">
        <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
          ToggleSwitch
        </h2>
        <Tag value="Boolean Selection" severity="info" />
      </div>

      <!-- Basic ToggleSwitch -->
      <div class="flex flex-col gap-4">
        <div class="flex items-center gap-2">
          <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-0">
            Basic
          </h3>
          <Tag value="Most Common" severity="success" />
        </div>
        <p class="text-surface-600 dark:text-surface-300">
          ToggleSwitch is used with the v-model property for two-way value binding.
        </p>

        <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
          <div class="flex flex-col gap-4">
            <div class="flex items-center gap-3">
              <ToggleSwitch v-model="basicSwitchChecked" input-id="basic-switch" />
              <label for="basic-switch" class="font-semibold text-surface-900 dark:text-surface-0">
                Enable Feature
              </label>
            </div>
            <small class="text-surface-600 dark:text-surface-300">
              Status: {{ basicSwitchChecked ? 'Enabled' : 'Disabled' }}
            </small>
          </div>
        </div>
      </div>

      <!-- Preselection -->
      <div class="flex flex-col gap-4">
        <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-0">
          Preselection
        </h3>
        <p class="text-surface-600 dark:text-surface-300">
          ToggleSwitch can be preselected by setting the initial value to true.
        </p>

        <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
          <div class="flex flex-col gap-4">
            <div class="flex items-center gap-3">
              <ToggleSwitch v-model="preselectedSwitchChecked" input-id="preselected-switch" />
              <label for="preselected-switch" class="font-semibold text-surface-900 dark:text-surface-0">
                Remember Me
              </label>
            </div>
            <small class="text-surface-600 dark:text-surface-300">
              Initially set to active state
            </small>
          </div>
        </div>
      </div>

      <!-- Forms Integration -->
      <div class="flex flex-col gap-4">
        <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-0">
          Forms Integration
        </h3>
        <p class="text-surface-600 dark:text-surface-300">
          ToggleSwitch integrates with form validation and provides error handling.
        </p>

        <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
          <div class="flex flex-col gap-4">
            <div class="flex items-center gap-3">
              <ToggleSwitch 
                v-model="formSwitchChecked" 
                input-id="form-switch" 
                :invalid="!formSwitchChecked"
              />
              <label for="form-switch" class="font-semibold text-surface-900 dark:text-surface-0">
                Accept Terms (Required)
              </label>
            </div>
            <Message v-if="!formSwitchChecked" severity="error" size="small">
              You must accept the terms and conditions
            </Message>
            <small class="text-surface-600 dark:text-surface-300">
              Form validation with error messaging
            </small>
          </div>
        </div>
      </div>

      <!-- Custom Template -->
      <div class="flex flex-col gap-4">
        <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-0">
          Custom Template
        </h3>
        <p class="text-surface-600 dark:text-surface-300">
          The handle slot allows custom content to be displayed inside the switch handle.
        </p>

        <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
          <div class="flex flex-col gap-4">
            <div class="flex items-center gap-3">
              <ToggleSwitch v-model="templateSwitchChecked" input-id="template-switch">
                <template #handle="{ checked }">
                  <i :class="['!text-xs pi', { 'pi-check': checked, 'pi-times': !checked }]" />
                </template>
              </ToggleSwitch>
              <label for="template-switch" class="font-semibold text-surface-900 dark:text-surface-0">
                Custom Handle Icons
              </label>
            </div>
            <small class="text-surface-600 dark:text-surface-300">
              Check/X icons in the handle based on state
            </small>
          </div>
        </div>
      </div>

      <!-- States -->
      <div class="flex flex-col gap-4">
        <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-0">
          States
        </h3>
        <p class="text-surface-600 dark:text-surface-300">
          Different states can be applied to indicate validation or interaction constraints.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
            <div class="flex flex-col gap-4">
              <h4 class="font-semibold text-surface-900 dark:text-surface-0">Invalid</h4>
              <div class="flex items-center gap-3">
                <ToggleSwitch 
                  v-model="invalidSwitchChecked" 
                  input-id="invalid-switch"
                  :invalid="!invalidSwitchChecked"
                />
                <label for="invalid-switch">Required Setting</label>
              </div>
              <small class="text-red-500">Error state for validation</small>
            </div>
          </div>

          <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
            <div class="flex flex-col gap-4">
              <h4 class="font-semibold text-surface-900 dark:text-surface-0">Disabled</h4>
              <div class="flex items-center gap-3">
                <ToggleSwitch 
                  v-model="disabledSwitchChecked" 
                  input-id="disabled-switch"
                  disabled
                />
                <label for="disabled-switch">Locked Setting</label>
              </div>
              <small class="text-surface-600 dark:text-surface-300">Cannot be changed</small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ToggleButton Section -->
    <div class="flex flex-col gap-8">
      <div class="flex items-center gap-2">
        <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
          ToggleButton
        </h2>
        <Tag value="Button Toggle" severity="info" />
      </div>

      <!-- Basic ToggleButton -->
      <div class="flex flex-col gap-4">
        <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-0">
          Basic
        </h3>
        <p class="text-surface-600 dark:text-surface-300">
          ToggleButton provides button-based boolean selection with customizable labels.
        </p>

        <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
          <div class="flex flex-col gap-4">
            <div class="flex items-center gap-3">
              <ToggleButton 
                v-model="basicButtonChecked" 
                on-label="On" 
                off-label="Off"
                class="min-w-20"
              />
              <span class="font-semibold text-surface-900 dark:text-surface-0">Power Mode</span>
            </div>
            <small class="text-surface-600 dark:text-surface-300">
              Status: {{ basicButtonChecked ? 'On' : 'Off' }}
            </small>
          </div>
        </div>
      </div>

      <!-- Customized -->
      <div class="flex flex-col gap-4">
        <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-0">
          Customized
        </h3>
        <p class="text-surface-600 dark:text-surface-300">
          Icons and labels can be customized using onLabel, offLabel, onIcon and offIcon properties.
        </p>

        <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
          <div class="flex flex-col gap-4">
            <div class="flex items-center gap-3">
              <ToggleButton 
                v-model="customButtonChecked" 
                on-label="Locked" 
                off-label="Unlocked"
                on-icon="pi pi-lock"
                off-icon="pi pi-lock-open"
                class="w-36"
                aria-label="Security Status"
              />
              <span class="font-semibold text-surface-900 dark:text-surface-0">Security</span>
            </div>
            <small class="text-surface-600 dark:text-surface-300">
              Custom icons and labels based on state
            </small>
          </div>
        </div>
      </div>

      <!-- Sizes -->
      <div class="flex flex-col gap-4">
        <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-0">
          Sizes
        </h3>
        <p class="text-surface-600 dark:text-surface-300">
          ToggleButton provides small and large sizes as alternatives to the base.
        </p>

        <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
          <div class="flex flex-col gap-4">
            <div class="flex flex-wrap items-center gap-4">
              <div class="flex flex-col items-center gap-2">
                <ToggleButton 
                  v-model="smallButtonChecked" 
                  on-label="On" 
                  off-label="Off"
                  size="small"
                  class="min-w-16"
                />
                <small class="text-surface-600 dark:text-surface-300">Small</small>
              </div>
              <div class="flex flex-col items-center gap-2">
                <ToggleButton 
                  v-model="normalButtonChecked" 
                  on-label="On" 
                  off-label="Off"
                  class="min-w-20"
                />
                <small class="text-surface-600 dark:text-surface-300">Normal</small>
              </div>
              <div class="flex flex-col items-center gap-2">
                <ToggleButton 
                  v-model="largeButtonChecked" 
                  on-label="On" 
                  off-label="Off"
                  size="large"
                  class="min-w-24"
                />
                <small class="text-surface-600 dark:text-surface-300">Large</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Forms Integration -->
      <div class="flex flex-col gap-4">
        <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-0">
          Forms Integration
        </h3>
        <p class="text-surface-600 dark:text-surface-300">
          ToggleButton integrates with form validation and provides error handling.
        </p>

        <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
          <div class="flex flex-col gap-4">
            <div class="flex items-center gap-3">
              <ToggleButton 
                v-model="formButtonChecked" 
                on-label="Accept All" 
                off-label="Reject All"
                :invalid="!formButtonChecked"
                class="w-48"
              />
            </div>
            <Message v-if="!formButtonChecked" severity="error" size="small">
              You must accept all terms to continue
            </Message>
            <small class="text-surface-600 dark:text-surface-300">
              Form validation with consent requirement
            </small>
          </div>
        </div>
      </div>

      <!-- States -->
      <div class="flex flex-col gap-4">
        <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-0">
          States
        </h3>
        <p class="text-surface-600 dark:text-surface-300">
          Different states for validation and interaction control.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
            <div class="flex flex-col gap-4">
              <h4 class="font-semibold text-surface-900 dark:text-surface-0">Invalid</h4>
              <div class="flex items-center gap-3">
                <ToggleButton 
                  v-model="invalidButtonChecked" 
                  on-icon="pi pi-check" 
                  off-icon="pi pi-times"
                  :invalid="!invalidButtonChecked"
                  class="w-40"
                  aria-label="Confirmation"
                />
              </div>
              <small class="text-red-500">Error state for validation</small>
            </div>
          </div>

          <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
            <div class="flex flex-col gap-4">
              <h4 class="font-semibold text-surface-900 dark:text-surface-0">Disabled</h4>
              <div class="flex items-center gap-3">
                <ToggleButton 
                  v-model="disabledButtonChecked" 
                  on-icon="pi pi-check" 
                  off-icon="pi pi-times"
                  disabled
                  class="w-40"
                  aria-label="Confirmation"
                />
              </div>
              <small class="text-surface-600 dark:text-surface-300">Cannot be changed</small>
            </div>
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
        Toggle components with real-time backend synchronization using tRPC for type-safe API integration.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-6">
          <div class="flex items-center gap-2">
            <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-0">User Settings</h3>
            <div v-if="settingsLoading" class="flex items-center gap-2">
              <i class="pi pi-spin pi-spinner text-primary-500" />
              <small class="text-surface-500">Syncing...</small>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- ToggleSwitch Settings -->
            <div class="flex flex-col gap-4">
              <h4 class="font-medium text-surface-900 dark:text-surface-0">Switch Controls</h4>
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <label class="font-medium text-surface-900 dark:text-surface-0">
                    Push Notifications
                  </label>
                  <ToggleSwitch 
                    v-model="userSettings.notifications" 
                    :disabled="settingsLoading"
                  />
                </div>
                <div class="flex items-center justify-between">
                  <label class="font-medium text-surface-900 dark:text-surface-0">
                    Dark Mode
                  </label>
                  <ToggleSwitch 
                    v-model="userSettings.darkMode" 
                    :disabled="settingsLoading"
                  >
                    <template #handle="{ checked }">
                      <i :class="['!text-xs pi', { 'pi-moon': checked, 'pi-sun': !checked }]" />
                    </template>
                  </ToggleSwitch>
                </div>
                <div class="flex items-center justify-between">
                  <label class="font-medium text-surface-900 dark:text-surface-0">
                    Auto Save
                  </label>
                  <ToggleSwitch 
                    v-model="userSettings.autoSave" 
                    :disabled="settingsLoading"
                  />
                </div>
              </div>
            </div>

            <!-- ToggleButton Settings -->
            <div class="flex flex-col gap-4">
              <h4 class="font-medium text-surface-900 dark:text-surface-0">Button Controls</h4>
              <div class="space-y-4">
                <div class="flex flex-col gap-2">
                  <label class="font-medium text-surface-900 dark:text-surface-0">
                    Email Alerts
                  </label>
                  <ToggleButton 
                    v-model="userSettings.emailAlerts" 
                    on-label="Enabled" 
                    off-label="Disabled"
                    on-icon="pi pi-envelope"
                    off-icon="pi pi-envelope-open"
                    :disabled="settingsLoading"
                    class="w-32"
                  />
                </div>
                <div class="flex flex-col gap-2">
                  <label class="font-medium text-surface-900 dark:text-surface-0">
                    Sound Effects
                  </label>
                  <ToggleButton 
                    v-model="userSettings.soundEffects" 
                    on-label="On" 
                    off-label="Off"
                    on-icon="pi pi-volume-up"
                    off-icon="pi pi-volume-off"
                    :disabled="settingsLoading"
                    class="w-24"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="pt-4 border-t border-surface-200 dark:border-surface-700">
            <small class="text-surface-500 dark:text-surface-400">
              Settings are automatically saved to the backend when changed. Changes sync in real-time across all devices.
            </small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>