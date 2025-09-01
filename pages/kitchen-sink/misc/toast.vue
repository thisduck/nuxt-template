<script setup lang="ts">
import { useToast } from 'primevue/usetoast';

const toast = useToast();

// Basic toast
function show() {
  toast.add({
    severity: 'info',
    summary: 'Info Message',
    detail: 'This is a basic toast message.',
    life: 3000,
  });
}

// Severity examples
function showSuccess() {
  toast.add({
    severity: 'success',
    summary: 'Success Message',
    detail: 'Operation completed successfully.',
    life: 3000,
  });
}

function showInfo() {
  toast.add({
    severity: 'info',
    summary: 'Info Message',
    detail: 'Here is some information.',
    life: 3000,
  });
}

function showWarn() {
  toast.add({
    severity: 'warn',
    summary: 'Warning Message',
    detail: 'Please be careful about this action.',
    life: 3000,
  });
}

function showError() {
  toast.add({
    severity: 'error',
    summary: 'Error Message',
    detail: 'Something went wrong.',
    life: 3000,
  });
}

function showSecondary() {
  toast.add({
    severity: 'secondary',
    summary: 'Secondary Message',
    detail: 'This is a secondary message.',
    life: 3000,
  });
}

function showContrast() {
  toast.add({
    severity: 'contrast',
    summary: 'Contrast Message',
    detail: 'High contrast message for better visibility.',
    life: 3000,
  });
}

// Position examples
function showTopLeft() {
  toast.add({
    severity: 'info',
    summary: 'Top Left',
    detail: 'This message appears on top left.',
    group: 'tl',
    life: 3000,
  });
}

function showBottomLeft() {
  toast.add({
    severity: 'info',
    summary: 'Bottom Left',
    detail: 'This message appears on bottom left.',
    group: 'bl',
    life: 3000,
  });
}

function showBottomRight() {
  toast.add({
    severity: 'info',
    summary: 'Bottom Right',
    detail: 'This message appears on bottom right.',
    group: 'br',
    life: 3000,
  });
}

// Multiple messages
function showMultiple() {
  toast.add({
    severity: 'info',
    summary: 'Message 1',
    detail: 'First message',
    life: 3000,
  });

  toast.add({
    severity: 'success',
    summary: 'Message 2',
    detail: 'Second message',
    life: 3000,
  });

  toast.add({
    severity: 'warn',
    summary: 'Message 3',
    detail: 'Third message',
    life: 3000,
  });
}

// Sticky message (no auto dismiss)
function showSticky() {
  toast.add({
    severity: 'info',
    summary: 'Sticky Message',
    detail: 'This message will not disappear automatically. Click the close button to dismiss.',
  });
}

// Clear all toasts
function clear() {
  toast.removeAllGroups();
}

// Template example
function showTemplate() {
  toast.add({
    severity: 'success',
    summary: 'New Message from Amy',
    detail: 'Hey there! Thanks for your message. I will get back to you as soon as possible.',
    group: 'bc',
    life: 5000,
  });
}

function onReply() {
  toast.removeGroup('bc');
  toast.add({
    severity: 'success',
    summary: 'Reply Sent',
    detail: 'Your reply has been sent successfully.',
    life: 3000,
  });
}

// Headless example with progress
const progress = ref(0);
const visible = ref(false);

function showHeadless() {
  if (visible.value)
    return;

  progress.value = 0;
  visible.value = true;

  toast.add({
    severity: 'info',
    summary: 'File Upload',
    detail: 'Uploading your file...',
    group: 'headless',
  });

  // Simulate progress
  const interval = setInterval(() => {
    progress.value += 10;
    if (progress.value >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        visible.value = false;
        toast.removeGroup('headless');
      }, 1000);
    }
  }, 200);
}

function onClose() {
  visible.value = false;
}

// Interactive toast builder
const customSeverity = ref('info');
const customSummary = ref('Custom Toast');
const customDetail = ref('This is a custom toast message');
const customLife = ref(3000);
const customClosable = ref(true);

const severityOptions = ['success', 'info', 'warn', 'error', 'secondary', 'contrast'];

function showCustom() {
  toast.add({
    severity: customSeverity.value,
    summary: customSummary.value,
    detail: customDetail.value,
    life: customClosable.value ? customLife.value : undefined,
  });
}

// Real-world examples
function showNotification() {
  toast.add({
    severity: 'info',
    summary: 'New Notification',
    detail: 'You have 3 unread messages',
    life: 5000,
  });
}

function showSaved() {
  toast.add({
    severity: 'success',
    summary: 'Document Saved',
    detail: 'Your changes have been saved successfully',
    life: 3000,
  });
}

function showNetworkError() {
  toast.add({
    severity: 'error',
    summary: 'Network Error',
    detail: 'Failed to connect to the server. Please check your connection.',
    life: 5000,
  });
}

function showMaintenance() {
  toast.add({
    severity: 'warn',
    summary: 'Maintenance Notice',
    detail: 'Scheduled maintenance will begin at 2:00 AM. Service may be temporarily unavailable.',
  });
}
</script>

<template>
  <div class="p-6 space-y-8">
    <!-- Toast Components for different positions -->
    <Toast />
    <Toast position="top-left" group="tl" />
    <Toast position="bottom-left" group="bl" />
    <Toast position="bottom-right" group="br" />

    <!-- Template Toast -->
    <Toast position="bottom-center" group="bc" @close="onClose">
      <template #message="slotProps">
        <div class="flex flex-col items-start flex-auto">
          <div class="flex items-center gap-2">
            <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
            <span class="font-bold">Amy Elsner</span>
          </div>
          <div class="font-medium text-lg my-4">
            {{ slotProps.message.summary }}
          </div>
          <Button size="small" label="Reply" severity="success" @click="onReply()" />
        </div>
      </template>
    </Toast>

    <!-- Headless Toast -->
    <Toast position="top-center" group="headless" @close="visible = false">
      <template #container="{ message, closeCallback }">
        <section class="flex flex-col p-4 gap-4 w-full bg-primary/70 rounded-xl">
          <div class="flex items-center gap-5">
            <i class="pi pi-cloud-upload text-white dark:text-black text-2xl" />
            <span class="font-bold text-base text-white dark:text-black">{{ message.summary }}</span>
          </div>
          <div class="flex flex-col gap-2">
            <ProgressBar :value="progress" :show-value="false" :style="{ height: '4px' }" pt:value:class="!bg-primary-50 dark:!bg-primary-900" class="!bg-primary/80" />
            <label class="text-sm font-bold text-white dark:text-black">{{ progress }}% uploaded</label>
          </div>
          <div class="flex gap-4 mb-4 justify-end">
            <Button label="Another Upload?" size="small" @click="closeCallback" />
            <Button label="Cancel" size="small" @click="closeCallback" />
          </div>
        </section>
      </template>
    </Toast>

    <!-- Header -->
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-4">
        <Icon name="pi:comment" size="32" class="text-primary-500" />
        <div class="flex flex-col">
          <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0">
            Toast
          </h1>
          <p class="text-surface-600 dark:text-surface-300">
            Toast is used to display messages in an overlay.
          </p>
        </div>
      </div>
    </div>

    <!-- Basic Usage -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Basic Usage
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Toast component requires the ToastService to be installed. Messages are added using the toast.add() method.
      </p>

      <div class="card">
        <Button label="Show" @click="show()" />
      </div>
    </div>

    <!-- Severity Levels -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Severity Levels
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        The severity option specifies the type of the message.
      </p>

      <div class="card flex flex-wrap gap-2">
        <Button label="Success" severity="success" @click="showSuccess" />
        <Button label="Info" severity="info" @click="showInfo" />
        <Button label="Warn" severity="warn" @click="showWarn" />
        <Button label="Error" severity="danger" @click="showError" />
        <Button label="Secondary" severity="secondary" @click="showSecondary" />
        <Button label="Contrast" severity="contrast" @click="showContrast" />
      </div>
    </div>

    <!-- Position -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Position
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Messages can be targeted to specific Toast components using group keys and positioned with the position property.
      </p>

      <div class="card flex flex-wrap gap-2">
        <Button label="Top Left" @click="showTopLeft" />
        <Button label="Bottom Left" @click="showBottomLeft" />
        <Button label="Bottom Right" @click="showBottomRight" />
      </div>
    </div>

    <!-- Multiple Messages -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Multiple Messages
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Multiple messages can be displayed by calling toast.add() multiple times.
      </p>

      <div class="card">
        <Button label="Multiple" @click="showMultiple()" />
      </div>
    </div>

    <!-- Sticky Messages -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Sticky Messages
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Messages can be made sticky by omitting the life property. Use clear() to remove all messages.
      </p>

      <div class="card flex gap-2">
        <Button label="Sticky" @click="showSticky" />
        <Button label="Clear" severity="secondary" @click="clear()" />
      </div>
    </div>

    <!-- Template Customization -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Template Customization
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Custom content inside a message is defined with the message template slot.
      </p>

      <div class="card">
        <Button label="View" @click="showTemplate" />
      </div>
    </div>

    <!-- Headless Mode -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Headless Mode
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Headless mode lets you implement the entire toast UI using the container slot.
      </p>

      <div class="card">
        <Button label="View" :disabled="visible" @click="showHeadless" />
      </div>
    </div>

    <!-- Interactive Toast Builder -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Interactive Toast Builder
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Customize toast properties to see different combinations.
      </p>

      <div class="card">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium text-surface-700 dark:text-surface-300">Severity</label>
            <Select v-model="customSeverity" :options="severityOptions" />
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium text-surface-700 dark:text-surface-300">Summary</label>
            <InputText v-model="customSummary" />
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium text-surface-700 dark:text-surface-300">Detail</label>
            <InputText v-model="customDetail" />
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium text-surface-700 dark:text-surface-300">Life (ms)</label>
            <InputNumber v-model="customLife" :min="0" :max="10000" :step="500" />
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium text-surface-700 dark:text-surface-300">Auto Dismiss</label>
            <div class="flex items-center mt-2">
              <Checkbox v-model="customClosable" input-id="autoclose" :binary="true" />
              <label for="autoclose" class="ml-2">Enable auto close</label>
            </div>
          </div>
        </div>

        <Button label="Show Custom Toast" @click="showCustom" />
      </div>
    </div>

    <!-- Real-world Examples -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Real-world Examples
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Common use cases for toast notifications in applications.
      </p>

      <div class="card space-y-6">
        <!-- User Actions -->
        <div>
          <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">
            User Actions
          </h3>
          <div class="flex flex-wrap gap-2">
            <Button label="Document Saved" icon="pi pi-check" severity="success" @click="showSaved" />
            <Button label="New Notification" icon="pi pi-bell" severity="info" @click="showNotification" />
          </div>
        </div>

        <!-- System Messages -->
        <div>
          <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">
            System Messages
          </h3>
          <div class="flex flex-wrap gap-2">
            <Button label="Network Error" icon="pi pi-exclamation-triangle" severity="danger" @click="showNetworkError" />
            <Button label="Maintenance Notice" icon="pi pi-cog" severity="warn" @click="showMaintenance" />
          </div>
        </div>
      </div>
    </div>

    <!-- Service Configuration -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Service Configuration
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Toast requires ToastService to be installed as an application plugin.
      </p>

      <div class="card">
        <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
          <div class="flex items-start gap-3">
            <Icon name="pi:info-circle" class="text-blue-600 dark:text-blue-400 mt-1" />
            <div>
              <h3 class="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Setup Instructions
              </h3>
              <div class="space-y-3 text-blue-800 dark:text-blue-200 text-sm">
                <div>
                  <p class="font-medium mb-2">
                    1. Install ToastService in main.ts/js:
                  </p>
                  <code class="block bg-blue-100 dark:bg-blue-800 p-2 rounded text-xs">
                    import ToastService from 'primevue/toastservice'<br>
                    app.use(ToastService)
                  </code>
                </div>
                <div>
                  <p class="font-medium mb-2">
                    2. Use in components:
                  </p>
                  <code class="block bg-blue-100 dark:bg-blue-800 p-2 rounded text-xs">
                    import { useToast } from 'primevue/usetoast'<br>
                    const toast = useToast()
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Accessibility -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Accessibility Features
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Toast component uses alert role and supports screen readers with proper ARIA attributes.
      </p>

      <div class="card">
        <div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-4">
          <div class="flex items-start gap-3">
            <Icon name="pi:check-circle" class="text-green-600 dark:text-green-400 mt-1" />
            <div>
              <h3 class="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
                Accessibility Features
              </h3>
              <ul class="space-y-2 text-green-800 dark:text-green-200 text-sm">
                <li>• Uses <code class="bg-green-100 dark:bg-green-800 px-1 rounded">alert</code> role with implicit <code class="bg-green-100 dark:bg-green-800 px-1 rounded">aria-live="assertive"</code></li>
                <li>• Supports <code class="bg-green-100 dark:bg-green-800 px-1 rounded">aria-atomic="true"</code> for complete message reading</li>
                <li>• Close button is keyboard accessible (Enter/Space)</li>
                <li>• Proper focus management for better navigation</li>
                <li>• Screen reader announces toast messages immediately</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
