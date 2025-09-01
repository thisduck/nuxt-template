<script setup lang="ts">
// Basic items
const basicItems = ref([
  { label: 'Add', icon: 'pi pi-plus', command: () => handleAction('Add') },
  { label: 'Update', icon: 'pi pi-refresh', command: () => handleAction('Update') },
  { label: 'Delete', icon: 'pi pi-times', command: () => handleAction('Delete') },
  { label: 'Upload', icon: 'pi pi-upload', command: () => handleAction('Upload') },
  { label: 'Website', icon: 'pi pi-external-link', url: 'https://vuejs.org/' },
]);

// Tooltip items
const tooltipItems = ref([
  { label: 'Save', icon: 'pi pi-save', command: () => handleAction('Save') },
  { label: 'Export', icon: 'pi pi-download', command: () => handleAction('Export') },
  { label: 'Share', icon: 'pi pi-share-alt', command: () => handleAction('Share') },
  { label: 'Print', icon: 'pi pi-print', command: () => handleAction('Print') },
]);

// Template items
const templateItems = ref([
  { label: 'Add', icon: 'pi pi-plus', command: () => handleAction('Add') },
  { label: 'Update', icon: 'pi pi-refresh', command: () => handleAction('Update') },
  { label: 'Delete', icon: 'pi pi-times', command: () => handleAction('Delete') },
  { label: 'Upload', icon: 'pi pi-upload', command: () => handleAction('Upload') },
  { label: 'Website', icon: 'pi pi-external-link', command: () => handleAction('Website') },
]);

// Action tracking
const lastAction = ref('');
const actionHistory = ref([]);

function handleAction(action: string) {
  lastAction.value = `${action} action triggered`;
  actionHistory.value.unshift({
    action,
    timestamp: new Date().toLocaleTimeString(),
  });
  if (actionHistory.value.length > 5) {
    actionHistory.value = actionHistory.value.slice(0, 5);
  }
}

// tRPC Backend Integration
const { $trpc } = useNuxtApp();
const isProcessing = ref(false);
const apiResult = ref('');

// Document management actions
const documentItems = ref([
  { label: 'Create New', icon: 'pi pi-plus', command: () => handleDocumentAction('create') },
  { label: 'Save Draft', icon: 'pi pi-save', command: () => handleDocumentAction('save') },
  { label: 'Export PDF', icon: 'pi pi-file-pdf', command: () => handleDocumentAction('export') },
  { label: 'Share Link', icon: 'pi pi-share-alt', command: () => handleDocumentAction('share') },
  { label: 'Archive', icon: 'pi pi-archive', command: () => handleDocumentAction('archive') },
]);

async function handleDocumentAction(action: string) {
  isProcessing.value = true;
  apiResult.value = '';
  lastAction.value = `Processing ${action}...`;

  try {
    // Simulate API call using existing hello endpoint
    const result = await $trpc.hello.query({ text: `document ${action}` });
    apiResult.value = result.greeting;
    lastAction.value = `Document ${action} completed`;

    // Add to history
    actionHistory.value.unshift({
      action: `Document ${action}`,
      timestamp: new Date().toLocaleTimeString(),
      result: 'Success',
    });
  } catch (error) {
    console.error('API call failed:', error);
    apiResult.value = `Failed to ${action} document`;
    lastAction.value = `Document ${action} failed`;

    actionHistory.value.unshift({
      action: `Document ${action}`,
      timestamp: new Date().toLocaleTimeString(),
      result: 'Failed',
    });
  } finally {
    isProcessing.value = false;
    if (actionHistory.value.length > 5) {
      actionHistory.value = actionHistory.value.slice(0, 5);
    }
  }
}

// Quick actions for different scenarios
const projectItems = ref([
  { label: 'Deploy', icon: 'pi pi-cloud-upload', command: () => handleProjectAction('deploy') },
  { label: 'Build', icon: 'pi pi-cog', command: () => handleProjectAction('build') },
  { label: 'Test', icon: 'pi pi-check-circle', command: () => handleProjectAction('test') },
  { label: 'Backup', icon: 'pi pi-copy', command: () => handleProjectAction('backup') },
]);

async function handleProjectAction(action: string) {
  isProcessing.value = true;
  lastAction.value = `Running ${action}...`;

  try {
    // Simulate longer operation
    await new Promise(resolve => setTimeout(resolve, 2000));
    lastAction.value = `Project ${action} completed successfully`;

    actionHistory.value.unshift({
      action: `Project ${action}`,
      timestamp: new Date().toLocaleTimeString(),
      result: 'Success',
    });
  } catch (error) {
    lastAction.value = `Project ${action} failed`;
    actionHistory.value.unshift({
      action: `Project ${action}`,
      timestamp: new Date().toLocaleTimeString(),
      result: 'Failed',
    });
  } finally {
    isProcessing.value = false;
    if (actionHistory.value.length > 5) {
      actionHistory.value = actionHistory.value.slice(0, 5);
    }
  }
}

// Communication actions
const communicationItems = ref([
  { label: 'Email Team', icon: 'pi pi-envelope', command: () => handleCommunicationAction('email') },
  { label: 'Send Message', icon: 'pi pi-comment', command: () => handleCommunicationAction('message') },
  { label: 'Schedule Call', icon: 'pi pi-phone', command: () => handleCommunicationAction('call') },
  { label: 'Create Event', icon: 'pi pi-calendar', command: () => handleCommunicationAction('event') },
]);

async function handleCommunicationAction(action: string) {
  isProcessing.value = true;
  lastAction.value = `Initiating ${action}...`;

  try {
    await new Promise(resolve => setTimeout(resolve, 1500));
    lastAction.value = `${action} initiated successfully`;

    actionHistory.value.unshift({
      action: `Communication ${action}`,
      timestamp: new Date().toLocaleTimeString(),
      result: 'Success',
    });
  } catch (error) {
    lastAction.value = `${action} failed to initiate`;
    actionHistory.value.unshift({
      action: `Communication ${action}`,
      timestamp: new Date().toLocaleTimeString(),
      result: 'Failed',
    });
  } finally {
    isProcessing.value = false;
    if (actionHistory.value.length > 5) {
      actionHistory.value = actionHistory.value.slice(0, 5);
    }
  }
}
</script>

<template>
  <div class="p-6 lg:p-8 flex flex-col gap-8">
    <!-- Header -->
    <div class="flex flex-col gap-3 border-b border-surface-200 dark:border-surface-700 pb-6">
      <div class="flex items-center gap-3">
        <i class="pi pi-plus-circle text-3xl text-primary-500" />
        <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0">
          SpeedDial
        </h1>
      </div>
      <p class="text-surface-600 dark:text-surface-300 max-w-3xl">
        When pressed, a floating action button can display multiple primary actions that can be performed on a page. SpeedDial provides an elegant way to present contextual actions with various layout options including linear, circular, and custom templates.
      </p>
    </div>

    <!-- Linear -->
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-2">
        <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
          Linear
        </h2>
        <Tag value="Most Common" severity="success" />
      </div>
      <p class="text-surface-600 dark:text-surface-300">
        Default orientation of the items is linear and direction property is used to define the position of the items related to the button.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <!-- Up Direction -->
            <div class="flex flex-col items-center gap-4">
              <h4 class="font-semibold text-surface-900 dark:text-surface-0">
                Direction: Up
              </h4>
              <div class="relative h-64 w-full flex items-end justify-center bg-surface-100 dark:bg-surface-800 rounded-lg">
                <SpeedDial
                  :model="basicItems"
                  direction="up"
                  style="position: absolute; left: calc(50% - 2rem); bottom: 1rem"
                />
              </div>
            </div>

            <!-- Down Direction -->
            <div class="flex flex-col items-center gap-4">
              <h4 class="font-semibold text-surface-900 dark:text-surface-0">
                Direction: Down
              </h4>
              <div class="relative h-64 w-full flex items-start justify-center bg-surface-100 dark:bg-surface-800 rounded-lg">
                <SpeedDial
                  :model="basicItems"
                  direction="down"
                  style="position: absolute; left: calc(50% - 2rem); top: 1rem"
                />
              </div>
            </div>

            <!-- Left Direction -->
            <div class="flex flex-col items-center gap-4">
              <h4 class="font-semibold text-surface-900 dark:text-surface-0">
                Direction: Left
              </h4>
              <div class="relative h-64 w-full flex items-center justify-end bg-surface-100 dark:bg-surface-800 rounded-lg">
                <SpeedDial
                  :model="basicItems"
                  direction="left"
                  style="position: absolute; top: calc(50% - 2rem); right: 1rem"
                />
              </div>
            </div>

            <!-- Right Direction -->
            <div class="flex flex-col items-center gap-4">
              <h4 class="font-semibold text-surface-900 dark:text-surface-0">
                Direction: Right
              </h4>
              <div class="relative h-64 w-full flex items-center justify-start bg-surface-100 dark:bg-surface-800 rounded-lg">
                <SpeedDial
                  :model="basicItems"
                  direction="right"
                  style="position: absolute; top: calc(50% - 2rem); left: 1rem"
                />
              </div>
            </div>
          </div>

          <small class="text-surface-600 dark:text-surface-300">
            Linear layout with items arranged in a straight line from the button
          </small>
        </div>
      </div>
    </div>

    <!-- Circle -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Circle
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Items can be displayed around the button when type is set to circle. Additional radius property defines the radius of the circle.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <div class="flex justify-center">
            <div class="relative h-80 w-80 flex items-center justify-center bg-surface-100 dark:bg-surface-800 rounded-lg">
              <SpeedDial
                :model="basicItems"
                :radius="80"
                type="circle"
                :style="{ position: 'absolute' }"
                :button-props="{ severity: 'warn', rounded: true }"
              />
            </div>
          </div>
          <small class="text-surface-600 dark:text-surface-300">
            Circular layout with items distributed evenly around the button
          </small>
        </div>
      </div>
    </div>

    <!-- Semi Circle -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Semi Circle
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        When type is defined as semi-circle, items are displayed in a half-circle around the button.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <!-- Semi Up -->
            <div class="flex flex-col items-center gap-4">
              <h4 class="font-semibold text-surface-900 dark:text-surface-0">
                Direction: Up
              </h4>
              <div class="relative h-64 w-full flex items-end justify-center bg-surface-100 dark:bg-surface-800 rounded-lg">
                <SpeedDial
                  :model="basicItems"
                  :radius="80"
                  type="semi-circle"
                  direction="up"
                  style="position: absolute; left: calc(50% - 2rem); bottom: 1rem"
                />
              </div>
            </div>

            <!-- Semi Down -->
            <div class="flex flex-col items-center gap-4">
              <h4 class="font-semibold text-surface-900 dark:text-surface-0">
                Direction: Down
              </h4>
              <div class="relative h-64 w-full flex items-start justify-center bg-surface-100 dark:bg-surface-800 rounded-lg">
                <SpeedDial
                  :model="basicItems"
                  :radius="80"
                  type="semi-circle"
                  direction="down"
                  style="position: absolute; left: calc(50% - 2rem); top: 1rem"
                />
              </div>
            </div>

            <!-- Semi Left -->
            <div class="flex flex-col items-center gap-4">
              <h4 class="font-semibold text-surface-900 dark:text-surface-0">
                Direction: Left
              </h4>
              <div class="relative h-64 w-full flex items-center justify-end bg-surface-100 dark:bg-surface-800 rounded-lg">
                <SpeedDial
                  :model="basicItems"
                  :radius="80"
                  type="semi-circle"
                  direction="left"
                  style="position: absolute; top: calc(50% - 2rem); right: 1rem"
                />
              </div>
            </div>

            <!-- Semi Right -->
            <div class="flex flex-col items-center gap-4">
              <h4 class="font-semibold text-surface-900 dark:text-surface-0">
                Direction: Right
              </h4>
              <div class="relative h-64 w-full flex items-center justify-start bg-surface-100 dark:bg-surface-800 rounded-lg">
                <SpeedDial
                  :model="basicItems"
                  :radius="80"
                  type="semi-circle"
                  direction="right"
                  style="position: absolute; top: calc(50% - 2rem); left: 1rem"
                />
              </div>
            </div>
          </div>

          <small class="text-surface-600 dark:text-surface-300">
            Semi-circular layout with items arranged in a half-circle
          </small>
        </div>
      </div>
    </div>

    <!-- Quarter Circle -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Quarter Circle
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Setting type as quarter-circle displays the items at one of four corners of a button based on the direction.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <!-- Quarter Up-Left -->
            <div class="flex flex-col items-center gap-4">
              <h4 class="font-semibold text-surface-900 dark:text-surface-0">
                Direction: Up-Left
              </h4>
              <div class="relative h-64 w-full bg-surface-100 dark:bg-surface-800 rounded-lg">
                <SpeedDial
                  :model="basicItems"
                  :radius="120"
                  type="quarter-circle"
                  direction="up-left"
                  :style="{ position: 'absolute', right: '1rem', bottom: '1rem' }"
                />
              </div>
            </div>

            <!-- Quarter Up-Right -->
            <div class="flex flex-col items-center gap-4">
              <h4 class="font-semibold text-surface-900 dark:text-surface-0">
                Direction: Up-Right
              </h4>
              <div class="relative h-64 w-full bg-surface-100 dark:bg-surface-800 rounded-lg">
                <SpeedDial
                  :model="basicItems"
                  :radius="120"
                  type="quarter-circle"
                  direction="up-right"
                  :style="{ position: 'absolute', left: '1rem', bottom: '1rem' }"
                />
              </div>
            </div>

            <!-- Quarter Down-Left -->
            <div class="flex flex-col items-center gap-4">
              <h4 class="font-semibold text-surface-900 dark:text-surface-0">
                Direction: Down-Left
              </h4>
              <div class="relative h-64 w-full bg-surface-100 dark:bg-surface-800 rounded-lg">
                <SpeedDial
                  :model="basicItems"
                  :radius="120"
                  type="quarter-circle"
                  direction="down-left"
                  :style="{ position: 'absolute', right: '1rem', top: '1rem' }"
                />
              </div>
            </div>

            <!-- Quarter Down-Right -->
            <div class="flex flex-col items-center gap-4">
              <h4 class="font-semibold text-surface-900 dark:text-surface-0">
                Direction: Down-Right
              </h4>
              <div class="relative h-64 w-full bg-surface-100 dark:bg-surface-800 rounded-lg">
                <SpeedDial
                  :model="basicItems"
                  :radius="120"
                  type="quarter-circle"
                  direction="down-right"
                  :style="{ position: 'absolute', left: '1rem', top: '1rem' }"
                />
              </div>
            </div>
          </div>

          <small class="text-surface-600 dark:text-surface-300">
            Quarter-circle layout with items arranged in a 90-degree arc
          </small>
        </div>
      </div>
    </div>

    <!-- Tooltip -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Tooltip
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Items display a tooltip on hover with helpful information about each action.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <div class="flex justify-center gap-8">
            <div class="relative h-64 w-32 bg-surface-100 dark:bg-surface-800 rounded-lg">
              <SpeedDial
                :model="tooltipItems"
                direction="up"
                :style="{ position: 'absolute', right: 0, bottom: 0 }"
                :button-props="{ severity: 'help', rounded: true }"
                :tooltip-options="{ position: 'left' }"
              />
            </div>
            <div class="relative h-64 w-32 bg-surface-100 dark:bg-surface-800 rounded-lg">
              <SpeedDial
                :model="tooltipItems"
                direction="up"
                :style="{ position: 'absolute', left: 0, bottom: 0 }"
                :button-props="{ severity: 'danger', rounded: true }"
                :tooltip-options="{ position: 'right' }"
              />
            </div>
          </div>
          <small class="text-surface-600 dark:text-surface-300">
            Hover over the action items to see tooltips with contextual information
          </small>
        </div>
      </div>
    </div>

    <!-- Mask -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Mask
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Adding mask property displays a modal layer behind the popup items for better focus.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <div class="relative h-64 w-full bg-surface-100 dark:bg-surface-800 rounded-lg">
            <SpeedDial
              :model="basicItems"
              direction="up"
              mask
              :style="{ position: 'absolute', right: '1rem', bottom: '1rem' }"
            />
          </div>
          <small class="text-surface-600 dark:text-surface-300">
            Click the speed dial to see the modal overlay behind the menu items
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
        SpeedDial offers item customization with templates for both the button and menu items.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <div class="relative h-96 w-full bg-surface-100 dark:bg-surface-800 rounded-lg">
            <SpeedDial
              :model="templateItems"
              direction="up"
              :transition-delay="80"
              :style="{ position: 'absolute', right: '2rem', bottom: '2rem' }"
            >
              <template #button="{ toggleCallback }">
                <Button
                  variant="outlined"
                  class="!border-2 !border-primary-500 !bg-primary-50 dark:!bg-primary-500/10"
                  @click="toggleCallback"
                >
                  <div class="flex items-center gap-2">
                    <Icon name="lucide:zap" size="20" class="text-primary-600" />
                    <span class="font-bold text-primary-700">Actions</span>
                  </div>
                </Button>
              </template>

              <template #item="{ item, toggleCallback }">
                <div
                  class="flex flex-col items-center justify-between gap-2 p-3 border-2 rounded-lg border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 w-20 cursor-pointer hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors shadow-lg"
                  @click="toggleCallback"
                >
                  <span class="text-primary-500" :class="[item.icon]" />
                  <span class="text-xs font-medium text-surface-700 dark:text-surface-300">
                    {{ item.label }}
                  </span>
                </div>
              </template>
            </SpeedDial>
          </div>
          <small class="text-surface-600 dark:text-surface-300">
            Custom templates for both the trigger button and individual menu items
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
        SpeedDial components integrated with tRPC backend for real API interactions and comprehensive action management.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-8">
          <!-- Document Management -->
          <div class="flex flex-col gap-4">
            <h4 class="font-semibold text-surface-900 dark:text-surface-0">
              Document Management
            </h4>
            <div class="flex gap-6">
              <div class="relative h-80 w-64 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-500/10 dark:to-blue-600/10 rounded-lg border border-blue-200 dark:border-blue-500/20">
                <div class="p-4">
                  <h5 class="font-semibold text-blue-800 dark:text-blue-200">
                    Document Actions
                  </h5>
                  <p class="text-sm text-blue-600 dark:text-blue-300 mt-2">
                    Manage your documents with quick actions
                  </p>
                </div>
                <SpeedDial
                  :model="documentItems"
                  direction="up"
                  :style="{ position: 'absolute', right: '1rem', bottom: '1rem' }"
                  :button-props="{ severity: 'info', rounded: true }"
                  :loading="isProcessing"
                />
              </div>

              <div class="flex-1">
                <div v-if="apiResult" class="p-4 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-lg mb-4">
                  <h5 class="font-semibold text-green-800 dark:text-green-200">
                    API Response
                  </h5>
                  <p class="text-sm text-green-700 dark:text-green-300 mt-1">
                    {{ apiResult }}
                  </p>
                </div>

                <div class="p-4 bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-lg">
                  <h5 class="font-semibold text-surface-800 dark:text-surface-200 mb-2">
                    Action Status
                  </h5>
                  <p class="text-sm text-surface-600 dark:text-surface-300">
                    {{ isProcessing ? 'Processing...' : (lastAction || 'No actions performed yet') }}
                  </p>
                  <div v-if="isProcessing" class="flex items-center gap-2 mt-2">
                    <i class="pi pi-spin pi-spinner text-primary-500" />
                    <span class="text-xs text-primary-600">Working...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Project Management -->
          <div class="flex flex-col gap-4">
            <h4 class="font-semibold text-surface-900 dark:text-surface-0">
              Project Operations
            </h4>
            <div class="flex gap-6">
              <div class="relative h-80 w-64 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-500/10 dark:to-orange-600/10 rounded-lg border border-orange-200 dark:border-orange-500/20">
                <div class="p-4">
                  <h5 class="font-semibold text-orange-800 dark:text-orange-200">
                    Project Tools
                  </h5>
                  <p class="text-sm text-orange-600 dark:text-orange-300 mt-2">
                    Deploy, build, test and backup your projects
                  </p>
                </div>
                <SpeedDial
                  :model="projectItems"
                  direction="up"
                  type="semi-circle"
                  :radius="60"
                  :style="{ position: 'absolute', left: 'calc(50% - 2rem)', bottom: '1rem' }"
                  :button-props="{ severity: 'warn', rounded: true }"
                  :loading="isProcessing"
                />
              </div>

              <div class="relative h-80 w-64 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-500/10 dark:to-purple-600/10 rounded-lg border border-purple-200 dark:border-purple-500/20">
                <div class="p-4">
                  <h5 class="font-semibold text-purple-800 dark:text-purple-200">
                    Communication
                  </h5>
                  <p class="text-sm text-purple-600 dark:text-purple-300 mt-2">
                    Connect with your team quickly
                  </p>
                </div>
                <SpeedDial
                  :model="communicationItems"
                  type="quarter-circle"
                  direction="up-left"
                  :radius="80"
                  :style="{ position: 'absolute', right: '1rem', bottom: '1rem' }"
                  :button-props="{ severity: 'help', rounded: true }"
                  :loading="isProcessing"
                />
              </div>
            </div>
          </div>

          <!-- Action History -->
          <div v-if="actionHistory.length > 0" class="flex flex-col gap-4">
            <h4 class="font-semibold text-surface-900 dark:text-surface-0">
              Recent Actions
            </h4>
            <div class="space-y-2">
              <div
                v-for="(action, index) in actionHistory"
                :key="index"
                class="flex items-center justify-between p-3 bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-lg"
              >
                <div class="flex items-center gap-3">
                  <i
                    :class="{
                      'pi pi-check-circle text-green-500': action.result === 'Success',
                      'pi pi-times-circle text-red-500': action.result === 'Failed',
                      'pi pi-info-circle text-blue-500': !action.result,
                    }"
                  />
                  <span class="font-medium text-surface-800 dark:text-surface-200">{{ action.action }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <span
                    v-if="action.result" :class="{
                      'text-green-600 dark:text-green-400': action.result === 'Success',
                      'text-red-600 dark:text-red-400': action.result === 'Failed',
                    }" class="text-xs font-medium"
                  >{{ action.result }}</span>
                  <span class="text-xs text-surface-500">{{ action.timestamp }}</span>
                </div>
              </div>
            </div>
          </div>

          <small class="text-surface-600 dark:text-surface-300">
            Real-world SpeedDial examples with API integration, loading states, and comprehensive action management
          </small>
        </div>
      </div>
    </div>
  </div>
</template>
