<script setup lang="ts">
// Basic menu items
const basicItems = ref([
  { label: 'Update', icon: 'pi pi-refresh' },
  { label: 'Delete', icon: 'pi pi-times' },
  { label: 'Vue Website', icon: 'pi pi-external-link', url: 'https://vuejs.org/' },
  { label: 'Upload', icon: 'pi pi-upload', to: '/fileupload' },
]);

// Menu items with icons
const iconItems = ref([
  { label: 'Update', icon: 'pi pi-refresh' },
  { label: 'Delete', icon: 'pi pi-times' },
  { label: 'Archive', icon: 'pi pi-folder' },
  { label: 'Export', icon: 'pi pi-download' },
]);

// Nested menu items
const nestedItems = ref([
  {
    label: 'File',
    icon: 'pi pi-file',
    items: [
      { label: 'New', icon: 'pi pi-plus' },
      { label: 'Open', icon: 'pi pi-folder-open' },
      { label: 'Save', icon: 'pi pi-save' },
    ],
  },
  {
    label: 'Edit',
    icon: 'pi pi-pencil',
    items: [
      { label: 'Copy', icon: 'pi pi-copy' },
      { label: 'Paste', icon: 'pi pi-clone' },
      { label: 'Undo', icon: 'pi pi-undo' },
    ],
  },
  {
    label: 'Tools',
    icon: 'pi pi-cog',
    items: [
      { label: 'Settings', icon: 'pi pi-cog' },
      { label: 'Preferences', icon: 'pi pi-sliders-h' },
    ],
  },
]);

// Action handlers
const lastAction = ref('');

function handleSave() {
  lastAction.value = 'Main Save button clicked';
  // Save action triggered
}

function handleExport() {
  lastAction.value = 'Export action triggered';
  // Export action triggered
}

function handlePublish() {
  lastAction.value = 'Publish action triggered';
  // Publish action triggered
}

function handleSubmit() {
  lastAction.value = 'Submit action triggered';
  // Submit action triggered
}

// tRPC Backend Integration
const { $trpc } = useNuxtApp();
const isProcessing = ref(false);
const apiResult = ref('');

// Document actions with API integration
const documentItems = ref([
  { label: 'Save Draft', icon: 'pi pi-save', command: () => handleDocumentAction('draft') },
  { label: 'Save as Template', icon: 'pi pi-bookmark', command: () => handleDocumentAction('template') },
  { label: 'Export PDF', icon: 'pi pi-file-pdf', command: () => handleDocumentAction('pdf') },
  { label: 'Send Email', icon: 'pi pi-envelope', command: () => handleDocumentAction('email') },
  { separator: true },
  { label: 'Delete', icon: 'pi pi-trash', command: () => handleDocumentAction('delete') },
]);

async function handleDocumentSave() {
  await handleDocumentAction('save');
}

async function handleDocumentAction(action: string) {
  isProcessing.value = true;
  apiResult.value = '';

  try {
    // Simulate API call using existing hello endpoint
    const result = await $trpc.hello.query({ text: `document ${action}` });
    apiResult.value = result.greeting;
    lastAction.value = `Document ${action} completed`;
  } catch (error) {
    console.error('API call failed:', error);
    apiResult.value = `Failed to ${action} document`;
    lastAction.value = `Document ${action} failed`;
  } finally {
    isProcessing.value = false;
  }
}

// User management actions
const userItems = ref([
  { label: 'View Profile', icon: 'pi pi-user', command: () => handleUserAction('profile') },
  { label: 'Edit Settings', icon: 'pi pi-cog', command: () => handleUserAction('settings') },
  { label: 'Change Password', icon: 'pi pi-key', command: () => handleUserAction('password') },
  { separator: true },
  { label: 'Logout', icon: 'pi pi-sign-out', command: () => handleUserAction('logout') },
]);

async function handleCreateUser() {
  await handleUserAction('create');
}

async function handleUserAction(action: string) {
  isProcessing.value = true;
  lastAction.value = `Processing user ${action}...`;

  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    lastAction.value = `User ${action} completed successfully`;
  } catch (error) {
    lastAction.value = `User ${action} failed`;
  } finally {
    isProcessing.value = false;
  }
}

// Project management with dynamic menu
const _projectActions = ref([]);
const selectedProject = ref('Project Alpha');

const projectItems = computed(() => [
  { label: 'Clone Project', icon: 'pi pi-copy', command: () => handleProjectAction('clone') },
  { label: 'Archive Project', icon: 'pi pi-archive', command: () => handleProjectAction('archive') },
  { label: 'Export Data', icon: 'pi pi-download', command: () => handleProjectAction('export') },
  { separator: true },
  {
    label: 'Switch Project',
    icon: 'pi pi-refresh',
    items: [
      { label: 'Project Alpha', command: () => switchProject('Project Alpha') },
      { label: 'Project Beta', command: () => switchProject('Project Beta') },
      { label: 'Project Gamma', command: () => switchProject('Project Gamma') },
    ],
  },
]);

function switchProject(project: string) {
  selectedProject.value = project;
  lastAction.value = `Switched to ${project}`;
}

async function handleDeployProject() {
  await handleProjectAction('deploy');
}

async function handleProjectAction(action: string) {
  isProcessing.value = true;
  lastAction.value = `${action} ${selectedProject.value}...`;

  try {
    await new Promise(resolve => setTimeout(resolve, 2000));
    lastAction.value = `${selectedProject.value} ${action} completed`;
  } catch (error) {
    lastAction.value = `${selectedProject.value} ${action} failed`;
  } finally {
    isProcessing.value = false;
  }
}
</script>

<template>
  <div class="p-6 lg:p-8 flex flex-col gap-8">
    <!-- Header -->
    <div class="flex flex-col gap-3 border-b border-surface-200 dark:border-surface-700 pb-6">
      <div class="flex items-center gap-3">
        <i class="pi pi-th-large text-3xl text-primary-500" />
        <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0">
          SplitButton
        </h1>
      </div>
      <p class="text-surface-600 dark:text-surface-300 max-w-3xl">
        SplitButton groups a set of commands in an overlay with a default command. It combines a primary action button with a dropdown menu containing additional related actions, providing an efficient way to organize multiple operations.
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
        SplitButton has a default command button and a collection of additional options defined by the model property.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <div class="flex flex-wrap gap-3">
            <SplitButton
              label="Save"
              :model="basicItems"
              @click="handleSave"
            />
          </div>
          <div v-if="lastAction" class="p-3 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-lg">
            <small class="text-blue-800 dark:text-blue-200">
              <strong>Action:</strong> {{ lastAction }}
            </small>
          </div>
          <small class="text-surface-600 dark:text-surface-300">
            Click the main button for the primary action, or use the dropdown for additional options
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
        Both the main button and menu items support icons. You can also customize the dropdown icon.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <div class="flex flex-wrap gap-3">
            <SplitButton
              label="Export"
              icon="pi pi-download"
              dropdown-icon="pi pi-cog"
              :model="iconItems"
              @click="handleExport"
            />
          </div>
          <small class="text-surface-600 dark:text-surface-300">
            Custom icons for both the main button and dropdown trigger
          </small>
        </div>
      </div>
    </div>

    <!-- Nested -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Nested Menus
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Multi-level menus are supported with a nested menu hierarchy for organizing complex actions.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <div class="flex flex-wrap gap-3">
            <SplitButton
              label="Actions"
              icon="pi pi-bars"
              :model="nestedItems"
              @click="() => lastAction = 'Default action clicked'"
            />
          </div>
          <small class="text-surface-600 dark:text-surface-300">
            Hierarchical menu structure with submenus for better organization
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
        The severity property defines the variant of the button with different color schemes.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <div class="flex flex-wrap gap-3">
            <SplitButton label="Primary" :model="basicItems" @click="() => lastAction = 'Primary clicked'" />
            <SplitButton label="Secondary" :model="basicItems" severity="secondary" @click="() => lastAction = 'Secondary clicked'" />
            <SplitButton label="Success" :model="basicItems" severity="success" @click="() => lastAction = 'Success clicked'" />
            <SplitButton label="Info" :model="basicItems" severity="info" @click="() => lastAction = 'Info clicked'" />
            <SplitButton label="Warn" :model="basicItems" severity="warn" @click="() => lastAction = 'Warn clicked'" />
            <SplitButton label="Help" :model="basicItems" severity="help" @click="() => lastAction = 'Help clicked'" />
            <SplitButton label="Danger" :model="basicItems" severity="danger" @click="() => lastAction = 'Danger clicked'" />
            <SplitButton label="Contrast" :model="basicItems" severity="contrast" @click="() => lastAction = 'Contrast clicked'" />
          </div>
          <small class="text-surface-600 dark:text-surface-300">
            Eight different severity levels for various action types
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
          <div class="flex flex-wrap gap-3">
            <SplitButton
              label="Disabled"
              :model="basicItems"
              disabled
            />
            <SplitButton
              label="Enabled"
              :model="basicItems"
              @click="() => lastAction = 'Enabled button clicked'"
            />
          </div>
          <small class="text-surface-600 dark:text-surface-300">
            Disabled split buttons are not interactive and have reduced opacity
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
            <SplitButton label="Primary" :model="basicItems" raised @click="handlePublish" />
            <SplitButton label="Secondary" :model="basicItems" raised severity="secondary" @click="handlePublish" />
            <SplitButton label="Success" :model="basicItems" raised severity="success" @click="handlePublish" />
            <SplitButton label="Info" :model="basicItems" raised severity="info" @click="handlePublish" />
            <SplitButton label="Warn" :model="basicItems" raised severity="warn" @click="handlePublish" />
            <SplitButton label="Danger" :model="basicItems" raised severity="danger" @click="handlePublish" />
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
            <SplitButton label="Primary" :model="basicItems" rounded @click="handleSubmit" />
            <SplitButton label="Secondary" :model="basicItems" rounded severity="secondary" @click="handleSubmit" />
            <SplitButton label="Success" :model="basicItems" rounded severity="success" @click="handleSubmit" />
            <SplitButton label="Info" :model="basicItems" rounded severity="info" @click="handleSubmit" />
            <SplitButton label="Warn" :model="basicItems" rounded severity="warn" @click="handleSubmit" />
            <SplitButton label="Danger" :model="basicItems" rounded severity="danger" @click="handleSubmit" />
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
              <SplitButton label="Primary" :model="basicItems" text @click="() => lastAction = 'Text Primary'" />
              <SplitButton label="Secondary" :model="basicItems" text severity="secondary" @click="() => lastAction = 'Text Secondary'" />
              <SplitButton label="Success" :model="basicItems" text severity="success" @click="() => lastAction = 'Text Success'" />
              <SplitButton label="Danger" :model="basicItems" text severity="danger" @click="() => lastAction = 'Text Danger'" />
            </div>
          </div>

          <!-- Raised Text -->
          <div class="flex flex-col gap-3">
            <h4 class="font-semibold text-surface-900 dark:text-surface-0">
              Raised Text Buttons
            </h4>
            <div class="flex flex-wrap gap-3">
              <SplitButton label="Primary" :model="basicItems" raised text @click="() => lastAction = 'Raised Text Primary'" />
              <SplitButton label="Secondary" :model="basicItems" raised text severity="secondary" @click="() => lastAction = 'Raised Text Secondary'" />
              <SplitButton label="Success" :model="basicItems" raised text severity="success" @click="() => lastAction = 'Raised Text Success'" />
              <SplitButton label="Danger" :model="basicItems" raised text severity="danger" @click="() => lastAction = 'Raised Text Danger'" />
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
            <SplitButton label="Primary" :model="basicItems" outlined @click="() => lastAction = 'Outlined Primary'" />
            <SplitButton label="Secondary" :model="basicItems" outlined severity="secondary" @click="() => lastAction = 'Outlined Secondary'" />
            <SplitButton label="Success" :model="basicItems" outlined severity="success" @click="() => lastAction = 'Outlined Success'" />
            <SplitButton label="Info" :model="basicItems" outlined severity="info" @click="() => lastAction = 'Outlined Info'" />
            <SplitButton label="Warn" :model="basicItems" outlined severity="warn" @click="() => lastAction = 'Outlined Warn'" />
            <SplitButton label="Danger" :model="basicItems" outlined severity="danger" @click="() => lastAction = 'Outlined Danger'" />
          </div>
          <small class="text-surface-600 dark:text-surface-300">
            Border-only style for secondary or alternative actions
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
        SplitButton provides small and large sizes as alternatives to the standard size.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <div class="flex flex-wrap items-center gap-3">
            <SplitButton
              label="Small"
              :model="basicItems"
              icon="pi pi-plus"
              size="small"
              @click="() => lastAction = 'Small size clicked'"
            />
            <SplitButton
              label="Normal"
              :model="basicItems"
              icon="pi pi-plus"
              @click="() => lastAction = 'Normal size clicked'"
            />
            <SplitButton
              label="Large"
              :model="basicItems"
              icon="pi pi-plus"
              size="large"
              @click="() => lastAction = 'Large size clicked'"
            />
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
        Custom content inside a split button is defined as children for complete control over appearance.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <div class="flex flex-wrap gap-3">
            <SplitButton
              :model="basicItems"
              severity="contrast"
              @click="() => lastAction = 'Custom template clicked'"
            >
              <span class="flex items-center font-bold gap-2">
                <Icon name="lucide:zap" size="16" class="text-yellow-500" />
                <span>Custom Action</span>
              </span>
            </SplitButton>

            <SplitButton
              :model="iconItems"
              severity="info"
              @click="() => lastAction = 'Brand template clicked'"
            >
              <div class="flex items-center gap-2">
                <div class="w-4 h-4 bg-gradient-to-br from-primary-400 to-primary-600 rounded" />
                <span class="font-semibold">Brand Action</span>
              </div>
            </SplitButton>
          </div>
          <small class="text-surface-600 dark:text-surface-300">
            Complete customization with custom HTML content inside split buttons
          </small>
        </div>
      </div>
    </div>

    <!-- tRPC Backend Integration -->
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-2">
        <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
          Real-World Examples
        </h2>
        <Tag value="Real API" severity="info" />
      </div>
      <p class="text-surface-600 dark:text-surface-300">
        SplitButton components integrated with tRPC backend for real API interactions and state management.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-8">
          <!-- Document Management -->
          <div class="flex flex-col gap-4">
            <h4 class="font-semibold text-surface-900 dark:text-surface-0">
              Document Management
            </h4>
            <div class="flex flex-wrap gap-3">
              <SplitButton
                label="Save Document"
                icon="pi pi-save"
                severity="success"
                :model="documentItems"
                :loading="isProcessing"
                @click="handleDocumentSave"
              />
            </div>

            <div v-if="apiResult" class="p-3 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-lg">
              <small class="text-green-800 dark:text-green-200">
                <strong>API Response:</strong> {{ apiResult }}
              </small>
            </div>
          </div>

          <!-- User Management -->
          <div class="flex flex-col gap-4">
            <h4 class="font-semibold text-surface-900 dark:text-surface-0">
              User Management
            </h4>
            <div class="flex flex-wrap gap-3">
              <SplitButton
                label="Create User"
                icon="pi pi-user-plus"
                severity="info"
                :model="userItems"
                :loading="isProcessing"
                @click="handleCreateUser"
              />
            </div>
          </div>

          <!-- Project Management -->
          <div class="flex flex-col gap-4">
            <h4 class="font-semibold text-surface-900 dark:text-surface-0">
              Project Management
            </h4>
            <div class="flex flex-wrap gap-3">
              <SplitButton
                :label="`Deploy ${selectedProject}`"
                icon="pi pi-cloud-upload"
                severity="warn"
                :model="projectItems"
                :loading="isProcessing"
                @click="handleDeployProject"
              />
            </div>

            <div class="p-3 bg-surface-100 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-lg">
              <small class="text-surface-700 dark:text-surface-300">
                <strong>Current Project:</strong> {{ selectedProject }}
              </small>
            </div>
          </div>

          <!-- Action Status -->
          <div v-if="lastAction" class="p-4 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-lg">
            <div class="flex items-center gap-2">
              <i v-if="isProcessing" class="pi pi-spin pi-spinner text-blue-500" />
              <i v-else class="pi pi-info-circle text-blue-500" />
              <small class="text-blue-800 dark:text-blue-200">
                <strong>Status:</strong> {{ lastAction }}
              </small>
            </div>
          </div>

          <small class="text-surface-600 dark:text-surface-300">
            Real-world split button examples with API integration, loading states, and comprehensive action menus
          </small>
        </div>
      </div>
    </div>
  </div>
</template>
