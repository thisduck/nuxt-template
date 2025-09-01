<script setup lang="ts">
// Loading state
const isLoading = ref(false);

function handleLoadingClick() {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
  }, 2000);
}

// Badge counters
const emailCount = ref(2);
const messageCount = ref(5);

// tRPC Backend - Action buttons with API integration
const { $trpc } = useNuxtApp();
const isProcessing = ref(false);
const lastAction = ref('');
const actionResult = ref('');

async function handleApiAction(action: string) {
  isProcessing.value = true;
  lastAction.value = action;
  actionResult.value = '';

  try {
    // Simulate API call using existing hello endpoint
    const result = await $trpc.hello.query({ text: action });
    actionResult.value = result.greeting;
  } catch (error) {
    console.error('API call failed:', error);
    actionResult.value = `Failed to ${action.toLowerCase()}`;
  } finally {
    isProcessing.value = false;
  }
}

// Notification actions
const notifications = ref([
  { id: 1, message: 'System update completed', type: 'success' },
  { id: 2, message: 'New user registered', type: 'info' },
  { id: 3, message: 'Server maintenance scheduled', type: 'warn' },
]);

function dismissNotification(id: number) {
  notifications.value = notifications.value.filter(n => n.id !== id);
}

function dismissAllNotifications() {
  notifications.value = [];
}

// File operations
const uploadProgress = ref(0);
const isUploading = ref(false);

function simulateUpload() {
  isUploading.value = true;
  uploadProgress.value = 0;

  const interval = setInterval(() => {
    uploadProgress.value += 10;
    if (uploadProgress.value >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        isUploading.value = false;
        uploadProgress.value = 0;
      }, 500);
    }
  }, 200);
}
</script>

<template>
  <div class="p-6 lg:p-8 flex flex-col gap-8">
    <!-- Header -->
    <div class="flex flex-col gap-3 border-b border-surface-200 dark:border-surface-700 pb-6">
      <div class="flex items-center gap-3">
        <i class="pi pi-play text-3xl text-primary-500" />
        <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0">
          Button
        </h1>
      </div>
      <p class="text-surface-600 dark:text-surface-300 max-w-3xl">
        Button is an extension to standard input element with icons and theming. It provides extensive customization options including variants, severities, sizes, and loading states for comprehensive user interaction design.
      </p>
    </div>

    <!-- Basic Button -->
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-2">
        <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
          Basic Button
        </h2>
        <Tag value="Most Common" severity="success" />
      </div>
      <p class="text-surface-600 dark:text-surface-300">
        Text to display on a button is defined with the label property. This is the most basic form of a button.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <div class="flex flex-wrap gap-3">
            <Button label="Submit" />
            <Button label="Cancel" />
            <Button label="Save" />
          </div>
          <small class="text-surface-600 dark:text-surface-300">
            Simple buttons with text labels
          </small>
        </div>
      </div>
    </div>

    <!-- Icons -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Icons
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Icon of a button is specified with icon property and position is configured using iconPos attribute.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-6">
          <!-- Icon Only -->
          <div class="flex flex-col gap-3">
            <h4 class="font-semibold text-surface-900 dark:text-surface-0">
              Icon Only
            </h4>
            <div class="flex flex-wrap gap-3">
              <Button icon="pi pi-home" aria-label="Home" />
              <Button icon="pi pi-user" aria-label="Profile" />
              <Button icon="pi pi-settings" aria-label="Settings" />
            </div>
          </div>

          <!-- Icon with Label -->
          <div class="flex flex-col gap-3">
            <h4 class="font-semibold text-surface-900 dark:text-surface-0">
              Icon with Label
            </h4>
            <div class="flex flex-wrap gap-3">
              <Button label="Profile" icon="pi pi-user" />
              <Button label="Save" icon="pi pi-check" icon-pos="right" />
              <Button label="Search" icon="pi pi-search" icon-pos="top" />
              <Button label="Update" icon="pi pi-refresh" icon-pos="bottom" />
            </div>
          </div>

          <small class="text-surface-600 dark:text-surface-300">
            Icons can be positioned left (default), right, top, or bottom relative to the label
          </small>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Loading State
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Busy state is controlled with the loading property. Perfect for async operations and API calls.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <div class="flex flex-wrap gap-3">
            <Button
              label="Search"
              icon="pi pi-search"
              :loading="isLoading"
              @click="handleLoadingClick"
            />
            <Button
              label="Process"
              icon="pi pi-cog"
              :loading="isLoading"
              severity="secondary"
              @click="handleLoadingClick"
            />
          </div>
          <small class="text-surface-600 dark:text-surface-300">
            Click to see loading state with spinner animation
          </small>
        </div>
      </div>
    </div>

    <!-- Link Buttons -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Link Buttons
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Buttons can be rendered as links visually or functionally using variant="link" or as properties.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <div class="flex flex-wrap gap-3">
            <Button label="Link Style" variant="link" />
            <Button as="a" label="External Link" href="https://vuejs.org/" target="_blank" rel="noopener" />
            <Button as-child>
              <NuxtLink to="/" class="px-3 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors">
                Router Link
              </NuxtLink>
            </Button>
          </div>
          <small class="text-surface-600 dark:text-surface-300">
            Different approaches to create link-style buttons
          </small>
        </div>
      </div>
    </div>

    <!-- Severity -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Severity
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        The severity property defines the variant of a button with different color schemes for various actions.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <div class="flex flex-wrap gap-3">
            <Button label="Primary" />
            <Button label="Secondary" severity="secondary" />
            <Button label="Success" severity="success" />
            <Button label="Info" severity="info" />
            <Button label="Warn" severity="warn" />
            <Button label="Help" severity="help" />
            <Button label="Danger" severity="danger" />
            <Button label="Contrast" severity="contrast" />
          </div>
          <small class="text-surface-600 dark:text-surface-300">
            Eight different severity levels for various use cases
          </small>
        </div>
      </div>
    </div>

    <!-- Disabled State -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Disabled State
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        When disabled is present, the element cannot be used and appears visually dimmed.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <div class="flex flex-wrap gap-3">
            <Button label="Enabled" />
            <Button label="Disabled" disabled />
            <Button label="Disabled with Icon" icon="pi pi-lock" disabled />
          </div>
          <small class="text-surface-600 dark:text-surface-300">
            Disabled buttons are not interactive and have reduced opacity
          </small>
        </div>
      </div>
    </div>

    <!-- Raised -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Raised
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Raised buttons display a shadow to indicate elevation and provide more visual emphasis.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <div class="flex flex-wrap gap-3">
            <Button label="Primary" raised />
            <Button label="Secondary" severity="secondary" raised />
            <Button label="Success" severity="success" raised />
            <Button label="Info" severity="info" raised />
            <Button label="Warn" severity="warn" raised />
            <Button label="Danger" severity="danger" raised />
          </div>
          <small class="text-surface-600 dark:text-surface-300">
            Elevated appearance with drop shadow effect
          </small>
        </div>
      </div>
    </div>

    <!-- Rounded -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Rounded
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Rounded buttons have a circular border radius for a softer, modern appearance.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <div class="flex flex-wrap gap-3">
            <Button label="Primary" rounded />
            <Button label="Secondary" severity="secondary" rounded />
            <Button label="Success" severity="success" rounded />
            <Button label="Info" severity="info" rounded />
            <Button label="Warn" severity="warn" rounded />
            <Button label="Danger" severity="danger" rounded />
          </div>
          <small class="text-surface-600 dark:text-surface-300">
            Fully rounded corners for a pill-shaped appearance
          </small>
        </div>
      </div>
    </div>

    <!-- Text Variant -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Text Variant
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Text buttons are displayed as textual elements with minimal visual weight.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-6">
          <!-- Regular Text -->
          <div class="flex flex-col gap-3">
            <h4 class="font-semibold text-surface-900 dark:text-surface-0">
              Text Buttons
            </h4>
            <div class="flex flex-wrap gap-3">
              <Button label="Primary" variant="text" />
              <Button label="Secondary" severity="secondary" variant="text" />
              <Button label="Success" severity="success" variant="text" />
              <Button label="Danger" severity="danger" variant="text" />
            </div>
          </div>

          <!-- Raised Text -->
          <div class="flex flex-col gap-3">
            <h4 class="font-semibold text-surface-900 dark:text-surface-0">
              Raised Text Buttons
            </h4>
            <div class="flex flex-wrap gap-3">
              <Button label="Primary" variant="text" raised />
              <Button label="Secondary" severity="secondary" variant="text" raised />
              <Button label="Success" severity="success" variant="text" raised />
              <Button label="Danger" severity="danger" variant="text" raised />
            </div>
          </div>

          <small class="text-surface-600 dark:text-surface-300">
            Text buttons with optional elevation for subtle emphasis
          </small>
        </div>
      </div>
    </div>

    <!-- Outlined Variant -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Outlined Variant
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Outlined buttons display a border without a background for secondary actions.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <div class="flex flex-wrap gap-3">
            <Button label="Primary" variant="outlined" />
            <Button label="Secondary" severity="secondary" variant="outlined" />
            <Button label="Success" severity="success" variant="outlined" />
            <Button label="Info" severity="info" variant="outlined" />
            <Button label="Warn" severity="warn" variant="outlined" />
            <Button label="Danger" severity="danger" variant="outlined" />
          </div>
          <small class="text-surface-600 dark:text-surface-300">
            Border-only style for secondary or alternative actions
          </small>
        </div>
      </div>
    </div>

    <!-- Icon Only Buttons -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Icon Only Buttons
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Buttons can have icons without labels. Always include aria-label for accessibility.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-6">
          <!-- Standard Icon Buttons -->
          <div class="flex flex-col gap-3">
            <h4 class="font-semibold text-surface-900 dark:text-surface-0">
              Standard
            </h4>
            <div class="flex flex-wrap gap-3">
              <Button icon="pi pi-check" aria-label="Confirm" />
              <Button icon="pi pi-bookmark" severity="secondary" aria-label="Bookmark" />
              <Button icon="pi pi-search" severity="success" aria-label="Search" />
              <Button icon="pi pi-user" severity="info" aria-label="User" />
              <Button icon="pi pi-bell" severity="warn" aria-label="Notification" />
              <Button icon="pi pi-heart" severity="help" aria-label="Favorite" />
              <Button icon="pi pi-times" severity="danger" aria-label="Cancel" />
            </div>
          </div>

          <!-- Rounded Icon Buttons -->
          <div class="flex flex-col gap-3">
            <h4 class="font-semibold text-surface-900 dark:text-surface-0">
              Rounded
            </h4>
            <div class="flex flex-wrap gap-3">
              <Button icon="pi pi-check" rounded aria-label="Confirm" />
              <Button icon="pi pi-bookmark" severity="secondary" rounded aria-label="Bookmark" />
              <Button icon="pi pi-search" severity="success" rounded aria-label="Search" />
              <Button icon="pi pi-user" severity="info" rounded aria-label="User" />
              <Button icon="pi pi-bell" severity="warn" rounded aria-label="Notification" />
              <Button icon="pi pi-heart" severity="help" rounded aria-label="Favorite" />
              <Button icon="pi pi-times" severity="danger" rounded aria-label="Cancel" />
            </div>
          </div>

          <!-- Outlined Icon Buttons -->
          <div class="flex flex-col gap-3">
            <h4 class="font-semibold text-surface-900 dark:text-surface-0">
              Outlined
            </h4>
            <div class="flex flex-wrap gap-3">
              <Button icon="pi pi-check" rounded variant="outlined" aria-label="Confirm" />
              <Button icon="pi pi-bookmark" severity="secondary" rounded variant="outlined" aria-label="Bookmark" />
              <Button icon="pi pi-search" severity="success" rounded variant="outlined" aria-label="Search" />
              <Button icon="pi pi-user" severity="info" rounded variant="outlined" aria-label="User" />
              <Button icon="pi pi-times" severity="danger" rounded variant="outlined" aria-label="Cancel" />
            </div>
          </div>

          <!-- Text Icon Buttons -->
          <div class="flex flex-col gap-3">
            <h4 class="font-semibold text-surface-900 dark:text-surface-0">
              Text
            </h4>
            <div class="flex flex-wrap gap-3">
              <Button icon="pi pi-check" variant="text" rounded aria-label="Confirm" />
              <Button icon="pi pi-bookmark" severity="secondary" variant="text" rounded aria-label="Bookmark" />
              <Button icon="pi pi-search" severity="success" variant="text" rounded aria-label="Search" />
              <Button icon="pi pi-user" severity="info" variant="text" rounded aria-label="User" />
              <Button icon="pi pi-times" severity="danger" variant="text" rounded aria-label="Cancel" />
            </div>
          </div>

          <small class="text-surface-600 dark:text-surface-300">
            Icon-only buttons in various styles - perfect for toolbars and compact interfaces
          </small>
        </div>
      </div>
    </div>

    <!-- Badge -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Badge
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Buttons have built-in badge support with badge and badgeSeverity properties.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <div class="flex flex-wrap gap-3">
            <Button label="Emails" :badge="emailCount.toString()" />
            <Button label="Messages" icon="pi pi-users" :badge="messageCount.toString()" badge-severity="contrast" variant="outlined" />
            <Button label="Notifications" icon="pi pi-bell" badge="3" badge-severity="danger" severity="secondary" />
          </div>
          <small class="text-surface-600 dark:text-surface-300">
            Badges display counters or status indicators on buttons
          </small>
        </div>
      </div>
    </div>

    <!-- Button Group -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Button Group
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Multiple buttons are grouped when wrapped inside a ButtonGroup component.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <ButtonGroup>
            <Button label="Save" icon="pi pi-check" />
            <Button label="Delete" icon="pi pi-trash" severity="danger" />
            <Button label="Cancel" icon="pi pi-times" severity="secondary" />
          </ButtonGroup>
          <small class="text-surface-600 dark:text-surface-300">
            Related buttons grouped together with connected borders
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
        Button provides small and large sizes as alternatives to the base size.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <div class="flex flex-wrap items-center gap-3">
            <Button label="Small" icon="pi pi-check" size="small" />
            <Button label="Normal" icon="pi pi-check" />
            <Button label="Large" icon="pi pi-check" size="large" />
          </div>
          <small class="text-surface-600 dark:text-surface-300">
            Three different sizes for various UI density requirements
          </small>
        </div>
      </div>
    </div>

    <!-- Custom Template -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Custom Template
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Custom content inside a button is defined as children for complete control over appearance.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <div class="flex flex-wrap gap-3">
            <Button variant="outlined" class="!border-2">
              <div class="flex items-center gap-2">
                <Icon name="lucide:star" size="20" class="text-yellow-500" />
                <span class="font-bold">Star Me!</span>
              </div>
            </Button>

            <Button variant="outlined">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 bg-green-500 rounded-full" />
                <span>Online Status</span>
              </div>
            </Button>

            <Button severity="success">
              <div class="flex items-center gap-2">
                <Icon name="lucide:download" size="16" />
                <span>Download</span>
                <span class="text-xs bg-white/20 px-1 rounded">v2.1</span>
              </div>
            </Button>
          </div>
          <small class="text-surface-600 dark:text-surface-300">
            Complete customization with custom HTML content inside buttons
          </small>
        </div>
      </div>
    </div>

    <!-- tRPC Backend Integration -->
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-2">
        <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
          Action Buttons with API
        </h2>
        <Tag value="Real API" severity="info" />
      </div>
      <p class="text-surface-600 dark:text-surface-300">
        Buttons integrated with tRPC backend for real API interactions and state management.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-6">
          <!-- API Action Buttons -->
          <div class="flex flex-col gap-4">
            <h4 class="font-semibold text-surface-900 dark:text-surface-0">
              API Actions
            </h4>
            <div class="flex flex-wrap gap-3">
              <Button
                label="Save Data"
                icon="pi pi-save"
                severity="success"
                :loading="isProcessing && lastAction === 'save'"
                @click="handleApiAction('save')"
              />
              <Button
                label="Delete Record"
                icon="pi pi-trash"
                severity="danger"
                :loading="isProcessing && lastAction === 'delete'"
                @click="handleApiAction('delete')"
              />
              <Button
                label="Sync Data"
                icon="pi pi-sync"
                severity="info"
                :loading="isProcessing && lastAction === 'sync'"
                @click="handleApiAction('sync')"
              />
            </div>

            <div v-if="actionResult" class="p-3 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-lg">
              <small class="text-green-800 dark:text-green-200">
                <strong>API Response:</strong> {{ actionResult }}
              </small>
            </div>
          </div>

          <!-- Notification Management -->
          <div class="flex flex-col gap-4">
            <h4 class="font-semibold text-surface-900 dark:text-surface-0">
              Notification Actions
            </h4>
            <div class="space-y-3">
              <div v-for="notification in notifications" :key="notification.id" class="flex items-center justify-between p-3 border border-surface-200 dark:border-surface-700 rounded-lg">
                <div class="flex items-center gap-3">
                  <i
                    :class="{
                      'pi pi-check-circle text-green-500': notification.type === 'success',
                      'pi pi-info-circle text-blue-500': notification.type === 'info',
                      'pi pi-exclamation-triangle text-yellow-500': notification.type === 'warn',
                    }"
                  />
                  <span class="text-sm">{{ notification.message }}</span>
                </div>
                <Button
                  icon="pi pi-times"
                  variant="text"
                  size="small"
                  aria-label="Dismiss"
                  @click="dismissNotification(notification.id)"
                />
              </div>

              <div v-if="notifications.length === 0" class="text-center py-4 text-surface-500">
                All notifications cleared!
              </div>

              <div class="flex justify-end">
                <Button
                  label="Clear All"
                  icon="pi pi-times"
                  severity="secondary"
                  size="small"
                  :disabled="notifications.length === 0"
                  @click="dismissAllNotifications"
                />
              </div>
            </div>
          </div>

          <!-- File Upload Simulation -->
          <div class="flex flex-col gap-4">
            <h4 class="font-semibold text-surface-900 dark:text-surface-0">
              File Operations
            </h4>
            <div class="flex items-center gap-4">
              <Button
                label="Upload File"
                icon="pi pi-upload"
                severity="info"
                :loading="isUploading"
                :disabled="isUploading"
                @click="simulateUpload"
              />

              <div v-if="isUploading" class="flex-1">
                <div class="text-sm text-surface-600 dark:text-surface-300 mb-1">
                  Uploading... {{ uploadProgress }}%
                </div>
                <div class="w-full bg-surface-200 dark:bg-surface-700 rounded-full h-2">
                  <div
                    class="bg-primary-500 h-2 rounded-full transition-all duration-300"
                    :style="{ width: `${uploadProgress}%` }"
                  />
                </div>
              </div>
            </div>
          </div>

          <small class="text-surface-600 dark:text-surface-300">
            Real-world button examples with API integration, state management, and user feedback
          </small>
        </div>
      </div>
    </div>
  </div>
</template>
