<script setup lang="ts">
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

const confirm = useConfirm();
const toast = useToast();

// Basic confirmations
const confirmSave = () => {
  confirm.require({
    message: 'Do you want to save your changes?',
    header: 'Save Confirmation',
    icon: 'pi pi-info-circle',
    rejectProps: {
      label: 'Cancel',
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: 'Save'
    },
    accept: () => {
      toast.add({ severity: 'info', summary: 'Confirmed', detail: 'Changes have been saved', life: 3000 });
    },
    reject: () => {
      toast.add({ severity: 'error', summary: 'Rejected', detail: 'Changes were not saved', life: 3000 });
    }
  });
};

const confirmDelete = () => {
  confirm.require({
    message: 'Are you sure you want to delete this item? This action cannot be undone.',
    header: 'Delete Confirmation',
    icon: 'pi pi-exclamation-triangle',
    rejectProps: {
      label: 'Cancel',
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: 'Delete',
      severity: 'danger'
    },
    accept: () => {
      toast.add({ severity: 'info', summary: 'Confirmed', detail: 'Item has been deleted', life: 3000 });
    },
    reject: () => {
      toast.add({ severity: 'error', summary: 'Rejected', detail: 'Delete operation cancelled', life: 3000 });
    }
  });
};

// Position confirmations
const confirmPosition = (position: string) => {
  confirm.require({
    group: 'positioned',
    message: `This dialog appears at the ${position} position`,
    header: 'Position Demo',
    icon: 'pi pi-question-circle',
    position: position,
    accept: () => {
      toast.add({ severity: 'success', summary: 'Accepted', detail: `${position} position confirmed`, life: 3000 });
    },
    reject: () => {
      toast.add({ severity: 'warn', summary: 'Rejected', detail: `${position} position rejected`, life: 3000 });
    }
  });
};

// Template confirmation
const showTemplate = () => {
  confirm.require({
    group: 'templating',
    message: 'Your document contains unsaved changes.',
    header: 'Save Document',
    icon: 'pi pi-file-edit',
    accept: () => {
      toast.add({ severity: 'info', summary: 'Accepted', detail: 'Document saved successfully', life: 3000 });
    },
    reject: () => {
      toast.add({ severity: 'warn', summary: 'Rejected', detail: 'Document not saved', life: 3000 });
    }
  });
};

// Headless confirmation
const requireConfirmation = () => {
  confirm.require({
    group: 'headless',
    header: 'Are you sure?',
    message: 'Please confirm to proceed with the action.',
    accept: () => {
      toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted the action', life: 3000 });
    },
    reject: () => {
      toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected the action', life: 3000 });
    }
  });
};

// Custom confirmations
const confirmLogout = () => {
  confirm.require({
    message: 'You will be logged out of your account. Any unsaved changes will be lost.',
    header: 'Logout Confirmation',
    icon: 'pi pi-sign-out',
    rejectProps: {
      label: 'Stay',
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: 'Logout',
      severity: 'danger'
    },
    accept: () => {
      toast.add({ severity: 'info', summary: 'Logged Out', detail: 'You have been logged out successfully', life: 3000 });
    }
  });
};

const confirmPurchase = () => {
  confirm.require({
    message: 'Complete your purchase of Premium Plan ($29.99/month)?',
    header: 'Confirm Purchase',
    icon: 'pi pi-shopping-cart',
    rejectProps: {
      label: 'Cancel',
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: 'Purchase',
      severity: 'success'
    },
    accept: () => {
      toast.add({ severity: 'success', summary: 'Purchase Complete', detail: 'Thank you for your purchase!', life: 3000 });
    }
  });
};

const confirmResetSettings = () => {
  confirm.require({
    message: 'This will reset all your settings to default values. This action cannot be undone.',
    header: 'Reset Settings',
    icon: 'pi pi-refresh',
    rejectProps: {
      label: 'Keep Settings',
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: 'Reset',
      severity: 'warning'
    },
    accept: () => {
      toast.add({ severity: 'warn', summary: 'Settings Reset', detail: 'All settings have been reset to defaults', life: 3000 });
    }
  });
};
</script>

<template>
  <div class="p-6 space-y-8">
    <!-- Header -->
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-4">
        <Icon name="pi:question-circle" size="32" class="text-primary-500" />
        <div class="flex flex-col">
          <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0">
            ConfirmDialog
          </h1>
          <p class="text-surface-600 dark:text-surface-300">
            ConfirmDialog uses a Dialog UI that is integrated with the Confirmation API.
          </p>
        </div>
      </div>
    </div>

    <!-- Toast for feedback -->
    <Toast />

    <!-- Basic ConfirmDialog -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Basic Usage
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        ConfirmDialog is displayed by calling the require method with options to customize the dialog.
      </p>
      
      <div class="card">
        <ConfirmDialog />
        <div class="flex gap-2">
          <Button @click="confirmSave" label="Save" outlined />
          <Button @click="confirmDelete" label="Delete" severity="danger" outlined />
        </div>
      </div>
    </div>

    <!-- Position Examples -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Position Variants
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        The position property specifies the location where the dialog appears.
      </p>
      
      <div class="card">
        <ConfirmDialog group="positioned" />
        <div class="flex flex-wrap justify-center gap-2 mb-4">
          <Button @click="confirmPosition('left')" icon="pi pi-arrow-right" label="Left" severity="secondary" style="min-width: 10rem" />
          <Button @click="confirmPosition('right')" icon="pi pi-arrow-left" label="Right" severity="secondary" style="min-width: 10rem" />
        </div>
        <div class="flex flex-wrap justify-center gap-2 mb-4">
          <Button @click="confirmPosition('topleft')" icon="pi pi-arrow-down-right" label="TopLeft" severity="secondary" style="min-width: 10rem" />
          <Button @click="confirmPosition('top')" icon="pi pi-arrow-down" label="Top" severity="secondary" style="min-width: 10rem" />
          <Button @click="confirmPosition('topright')" icon="pi pi-arrow-down-left" label="TopRight" severity="secondary" style="min-width: 10rem" />
        </div>
        <div class="flex flex-wrap justify-center gap-2">
          <Button @click="confirmPosition('bottomleft')" icon="pi pi-arrow-up-right" label="BottomLeft" severity="secondary" style="min-width: 10rem" />
          <Button @click="confirmPosition('bottom')" icon="pi pi-arrow-up" label="Bottom" severity="secondary" style="min-width: 10rem" />
          <Button @click="confirmPosition('bottomright')" icon="pi pi-arrow-up-left" label="BottomRight" severity="secondary" style="min-width: 10rem" />
        </div>
      </div>
    </div>

    <!-- Template Customization -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Template Customization
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Custom message template allows you to customize the content display.
      </p>
      
      <div class="card">
        <ConfirmDialog group="templating">
          <template #message="slotProps">
            <div class="flex flex-col items-center w-full gap-4 border-b border-surface-200 dark:border-surface-700 pb-4">
              <i :class="slotProps.message.icon" class="!text-6xl text-primary-500" />
              <div class="text-center">
                <h3 class="text-xl font-semibold mb-2">{{ slotProps.message.header }}</h3>
                <p class="text-surface-600 dark:text-surface-300">{{ slotProps.message.message }}</p>
              </div>
            </div>
          </template>
        </ConfirmDialog>
        <Button @click="showTemplate" label="Show Template Dialog" />
      </div>
    </div>

    <!-- Headless Mode -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Headless Mode
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Headless mode allows complete customization of the confirmation UI.
      </p>
      
      <div class="card">
        <ConfirmDialog group="headless">
          <template #container="{ message, acceptCallback, rejectCallback }">
            <div class="flex flex-col items-center p-8 bg-surface-0 dark:bg-surface-900 rounded-lg shadow-lg">
              <div class="rounded-full bg-primary text-primary-contrast inline-flex justify-center items-center h-24 w-24 -mt-20 shadow-lg">
                <i class="pi pi-question !text-4xl" />
              </div>
              <span class="font-bold text-2xl block mb-2 mt-6 text-surface-900 dark:text-surface-0">{{ message.header }}</span>
              <p class="mb-0 text-center text-surface-600 dark:text-surface-300">{{ message.message }}</p>
              <div class="flex items-center gap-2 mt-6">
                <Button label="Confirm" @click="acceptCallback" class="w-32" />
                <Button label="Cancel" outlined @click="rejectCallback" class="w-32" />
              </div>
            </div>
          </template>
        </ConfirmDialog>
        <Button @click="requireConfirmation" label="Show Headless Dialog" />
      </div>
    </div>

    <!-- Real-World Examples -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Real-World Examples
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Common confirmation scenarios in applications.
      </p>
      
      <div class="card">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div class="flex flex-col gap-3 p-4 border border-surface-200 dark:border-surface-700 rounded-lg">
            <div class="flex items-center gap-3">
              <i class="pi pi-sign-out text-orange-500 text-xl" />
              <div>
                <h4 class="text-lg font-semibold mb-1">Logout</h4>
                <p class="text-sm text-surface-600 dark:text-surface-300">Confirm before logging out</p>
              </div>
            </div>
            <Button @click="confirmLogout" label="Logout" severity="warning" outlined size="small" />
          </div>

          <div class="flex flex-col gap-3 p-4 border border-surface-200 dark:border-surface-700 rounded-lg">
            <div class="flex items-center gap-3">
              <i class="pi pi-shopping-cart text-green-500 text-xl" />
              <div>
                <h4 class="text-lg font-semibold mb-1">Purchase</h4>
                <p class="text-sm text-surface-600 dark:text-surface-300">Confirm purchase transaction</p>
              </div>
            </div>
            <Button @click="confirmPurchase" label="Buy Now" severity="success" outlined size="small" />
          </div>

          <div class="flex flex-col gap-3 p-4 border border-surface-200 dark:border-surface-700 rounded-lg">
            <div class="flex items-center gap-3">
              <i class="pi pi-refresh text-blue-500 text-xl" />
              <div>
                <h4 class="text-lg font-semibold mb-1">Reset Settings</h4>
                <p class="text-sm text-surface-600 dark:text-surface-300">Reset to default values</p>
              </div>
            </div>
            <Button @click="confirmResetSettings" label="Reset" severity="secondary" outlined size="small" />
          </div>
        </div>
      </div>
    </div>

    <!-- Advanced Scenarios -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Advanced Scenarios
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        More complex confirmation scenarios with different styling and behavior.
      </p>
      
      <div class="card">
        <div class="space-y-4">
          <!-- File Operations -->
          <div class="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
            <h4 class="text-red-800 dark:text-red-200 font-semibold mb-2">Destructive Actions</h4>
            <p class="text-red-600 dark:text-red-300 text-sm mb-3">Actions that cannot be undone require strong confirmation.</p>
            <div class="flex gap-2">
              <Button 
                @click="() => confirm.require({
                  message: 'This will permanently delete all your data. Type DELETE to confirm.',
                  header: 'Permanent Deletion',
                  icon: 'pi pi-trash',
                  acceptProps: { label: 'Delete Forever', severity: 'danger' },
                  rejectProps: { label: 'Cancel', severity: 'secondary', outlined: true },
                  accept: () => toast.add({ severity: 'error', summary: 'Deleted', detail: 'All data permanently deleted', life: 3000 })
                })"
                label="Delete All Data" 
                severity="danger" 
                size="small"
              />
              <Button 
                @click="() => confirm.require({
                  message: 'Format drive C:? All files will be lost.',
                  header: 'Format Drive',
                  icon: 'pi pi-desktop',
                  acceptProps: { label: 'Format', severity: 'danger' },
                  rejectProps: { label: 'Cancel', severity: 'secondary', outlined: true },
                  accept: () => toast.add({ severity: 'error', summary: 'Formatted', detail: 'Drive formatted successfully', life: 3000 })
                })"
                label="Format Drive" 
                severity="danger" 
                size="small" 
                outlined
              />
            </div>
          </div>

          <!-- Success Actions -->
          <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
            <h4 class="text-green-800 dark:text-green-200 font-semibold mb-2">Positive Actions</h4>
            <p class="text-green-600 dark:text-green-300 text-sm mb-3">Confirmations for positive actions and achievements.</p>
            <div class="flex gap-2">
              <Button 
                @click="() => confirm.require({
                  message: 'Publish your post to all followers?',
                  header: 'Publish Post',
                  icon: 'pi pi-send',
                  acceptProps: { label: 'Publish', severity: 'success' },
                  rejectProps: { label: 'Save Draft', severity: 'secondary', outlined: true },
                  accept: () => toast.add({ severity: 'success', summary: 'Published', detail: 'Post published successfully', life: 3000 })
                })"
                label="Publish Post" 
                severity="success" 
                size="small"
              />
              <Button 
                @click="() => confirm.require({
                  message: 'Send invitation to join your team?',
                  header: 'Team Invitation',
                  icon: 'pi pi-users',
                  acceptProps: { label: 'Send Invite', severity: 'success' },
                  rejectProps: { label: 'Cancel', severity: 'secondary', outlined: true },
                  accept: () => toast.add({ severity: 'success', summary: 'Invited', detail: 'Invitation sent successfully', life: 3000 })
                })"
                label="Invite User" 
                severity="success" 
                size="small" 
                outlined
              />
            </div>
          </div>

          <!-- Info Actions -->
          <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 class="text-blue-800 dark:text-blue-200 font-semibold mb-2">Information Actions</h4>
            <p class="text-blue-600 dark:text-blue-300 text-sm mb-3">Confirmations that provide additional information.</p>
            <div class="flex gap-2">
              <Button 
                @click="() => confirm.require({
                  message: 'Download will start immediately. File size: 250MB',
                  header: 'Download Confirmation',
                  icon: 'pi pi-download',
                  acceptProps: { label: 'Download', severity: 'info' },
                  rejectProps: { label: 'Cancel', severity: 'secondary', outlined: true },
                  accept: () => toast.add({ severity: 'info', summary: 'Downloading', detail: 'Download started', life: 3000 })
                })"
                label="Download File" 
                severity="info" 
                size="small"
              />
              <Button 
                @click="() => confirm.require({
                  message: 'You will receive a notification when backup is complete.',
                  header: 'Backup Data',
                  icon: 'pi pi-cloud-upload',
                  acceptProps: { label: 'Backup Now', severity: 'info' },
                  rejectProps: { label: 'Later', severity: 'secondary', outlined: true },
                  accept: () => toast.add({ severity: 'info', summary: 'Backup Started', detail: 'Backup process initiated', life: 3000 })
                })"
                label="Backup Data" 
                severity="info" 
                size="small" 
                outlined
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>