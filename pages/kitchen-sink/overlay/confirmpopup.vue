<script setup lang="ts">
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';

const confirm = useConfirm();
const toast = useToast();

// Basic confirmations
function confirmSave(event: Event) {
  confirm.require({
    target: event.currentTarget,
    message: 'Do you want to save your changes?',
    header: 'Save Confirmation',
    icon: 'pi pi-info-circle',
    rejectProps: {
      label: 'Cancel',
      severity: 'secondary',
      outlined: true,
    },
    acceptProps: {
      label: 'Save',
    },
    accept: () => {
      toast.add({ severity: 'info', summary: 'Confirmed', detail: 'Changes have been saved', life: 3000 });
    },
    reject: () => {
      toast.add({ severity: 'error', summary: 'Rejected', detail: 'Changes were not saved', life: 3000 });
    },
  });
}

function confirmDelete(event: Event) {
  confirm.require({
    target: event.currentTarget,
    message: 'Are you sure you want to delete this item?',
    header: 'Delete Confirmation',
    icon: 'pi pi-exclamation-triangle',
    rejectProps: {
      label: 'Cancel',
      severity: 'secondary',
      outlined: true,
    },
    acceptProps: {
      label: 'Delete',
      severity: 'danger',
    },
    accept: () => {
      toast.add({ severity: 'info', summary: 'Confirmed', detail: 'Item has been deleted', life: 3000 });
    },
    reject: () => {
      toast.add({ severity: 'error', summary: 'Rejected', detail: 'Delete operation cancelled', life: 3000 });
    },
  });
}

// Template confirmation
function showTemplate(event: Event) {
  confirm.require({
    target: event.currentTarget,
    group: 'templating',
    message: 'Your document contains unsaved changes.',
    header: 'Save Document',
    icon: 'pi pi-file-edit',
    accept: () => {
      toast.add({ severity: 'info', summary: 'Accepted', detail: 'Document saved successfully', life: 3000 });
    },
    reject: () => {
      toast.add({ severity: 'warn', summary: 'Rejected', detail: 'Document not saved', life: 3000 });
    },
  });
}

// Headless confirmation
function requireConfirmation(event: Event) {
  confirm.require({
    target: event.currentTarget,
    group: 'headless',
    message: 'Please confirm to proceed.',
    accept: () => {
      toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted the action', life: 3000 });
    },
    reject: () => {
      toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected the action', life: 3000 });
    },
  });
}

// Context menu confirmations
function showContextActions(event: Event) {
  confirm.require({
    target: event.currentTarget,
    message: 'Remove this item from your favorites?',
    header: 'Remove Favorite',
    icon: 'pi pi-heart-fill',
    position: 'top',
    rejectProps: {
      label: 'No',
      severity: 'secondary',
      outlined: true,
      size: 'small',
    },
    acceptProps: {
      label: 'Remove',
      severity: 'danger',
      size: 'small',
    },
    accept: () => {
      toast.add({ severity: 'success', summary: 'Removed', detail: 'Item removed from favorites', life: 3000 });
    },
  });
}

function showQuickAction(event: Event) {
  confirm.require({
    target: event.currentTarget,
    message: 'Mark this task as completed?',
    header: 'Complete Task',
    icon: 'pi pi-check-circle',
    position: 'bottom',
    rejectProps: {
      label: 'Cancel',
      severity: 'secondary',
      outlined: true,
      size: 'small',
    },
    acceptProps: {
      label: 'Complete',
      severity: 'success',
      size: 'small',
    },
    accept: () => {
      toast.add({ severity: 'success', summary: 'Completed', detail: 'Task marked as completed', life: 3000 });
    },
  });
}
</script>

<template>
  <div class="p-6 space-y-8">
    <!-- Header -->
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-4">
        <Icon name="pi:comment" size="32" class="text-primary-500" />
        <div class="flex flex-col">
          <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0">
            ConfirmPopup
          </h1>
          <p class="text-surface-600 dark:text-surface-300">
            ConfirmPopup displays a confirmation overlay displayed relatively to its target.
          </p>
        </div>
      </div>
    </div>

    <!-- Toast for feedback -->
    <Toast />

    <!-- Basic ConfirmPopup -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Basic Usage
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        ConfirmPopup is displayed by calling the require method with a target element to position the popup.
      </p>

      <div class="card">
        <ConfirmPopup />
        <div class="flex gap-2">
          <Button label="Save" outlined @click="confirmSave" />
          <Button label="Delete" severity="danger" outlined @click="confirmDelete" />
        </div>
      </div>
    </div>

    <!-- Template Customization -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Template Customization
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Custom message template allows you to customize the popup content display.
      </p>

      <div class="card">
        <ConfirmPopup group="templating">
          <template #message="slotProps">
            <div class="flex flex-col items-center w-full gap-4 border-b border-surface-200 dark:border-surface-700 p-4 mb-4 pb-0">
              <i :class="slotProps.message.icon" class="!text-6xl text-primary-500" />
              <div class="text-center">
                <h4 class="text-lg font-semibold mb-2">
                  {{ slotProps.message.header }}
                </h4>
                <p class="text-surface-600 dark:text-surface-300">
                  {{ slotProps.message.message }}
                </p>
              </div>
            </div>
          </template>
        </ConfirmPopup>
        <Button label="Show Template Popup" @click="showTemplate" />
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
        <ConfirmPopup group="headless">
          <template #container="{ message, acceptCallback, rejectCallback }">
            <div class="bg-surface-0 dark:bg-surface-900 rounded-lg p-6 shadow-lg border border-surface-200 dark:border-surface-700">
              <div class="flex items-start gap-4">
                <div class="rounded-full bg-primary-100 dark:bg-primary-900/20 p-3">
                  <i class="pi pi-question text-primary-600 dark:text-primary-400 text-xl" />
                </div>
                <div class="flex-1">
                  <h4 class="font-semibold text-surface-900 dark:text-surface-0 mb-2">
                    Confirmation Required
                  </h4>
                  <p class="text-surface-600 dark:text-surface-300 mb-4">
                    {{ message.message }}
                  </p>
                  <div class="flex gap-2">
                    <Button label="Confirm" size="small" @click="acceptCallback" />
                    <Button label="Cancel" outlined severity="secondary" size="small" @click="rejectCallback" />
                  </div>
                </div>
              </div>
            </div>
          </template>
        </ConfirmPopup>
        <Button label="Show Headless Popup" @click="requireConfirmation" />
      </div>
    </div>

    <!-- Interactive Examples -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Interactive Examples
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Real-world scenarios where ConfirmPopup provides contextual confirmation.
      </p>

      <div class="card">
        <div class="space-y-6">
          <!-- Card Actions -->
          <div class="bg-surface-50 dark:bg-surface-800 p-4 rounded-lg">
            <h4 class="font-semibold mb-3">
              Card Actions
            </h4>
            <div class="flex items-center justify-between p-4 border border-surface-200 dark:border-surface-700 rounded">
              <div class="flex items-center gap-3">
                <Avatar icon="pi pi-user" />
                <div>
                  <div class="font-medium">
                    John Doe
                  </div>
                  <div class="text-sm text-surface-600 dark:text-surface-300">
                    Software Engineer
                  </div>
                </div>
              </div>
              <div class="flex gap-2">
                <Button v-tooltip="'Remove from favorites'" icon="pi pi-heart" severity="danger" text @click="showContextActions" />
                <Button v-tooltip="'Edit'" icon="pi pi-pencil" text />
                <Button v-tooltip="'Delete'" icon="pi pi-trash" text severity="danger" />
              </div>
            </div>
          </div>

          <!-- Task List -->
          <div class="bg-surface-50 dark:bg-surface-800 p-4 rounded-lg">
            <h4 class="font-semibold mb-3">
              Task Management
            </h4>
            <div class="space-y-2">
              <div class="flex items-center justify-between p-3 border border-surface-200 dark:border-surface-700 rounded">
                <div class="flex items-center gap-3">
                  <Checkbox />
                  <span>Review project documentation</span>
                </div>
                <Button v-tooltip="'Mark as completed'" icon="pi pi-check" size="small" text @click="showQuickAction" />
              </div>
              <div class="flex items-center justify-between p-3 border border-surface-200 dark:border-surface-700 rounded">
                <div class="flex items-center gap-3">
                  <Checkbox />
                  <span>Update user interface components</span>
                </div>
                <Button v-tooltip="'Mark as completed'" icon="pi pi-check" size="small" text @click="showQuickAction" />
              </div>
            </div>
          </div>

          <!-- Data Table Actions -->
          <div class="bg-surface-50 dark:bg-surface-800 p-4 rounded-lg">
            <h4 class="font-semibold mb-3">
              Table Row Actions
            </h4>
            <div class="space-y-2">
              <div class="flex items-center justify-between p-3 border border-surface-200 dark:border-surface-700 rounded">
                <div class="flex items-center gap-3">
                  <Icon name="pi:file" class="text-blue-500" />
                  <div>
                    <div class="font-medium">
                      Project Report.pdf
                    </div>
                    <div class="text-sm text-surface-600 dark:text-surface-300">
                      2.4 MB • Modified 2 hours ago
                    </div>
                  </div>
                </div>
                <div class="flex gap-1">
                  <Button
                    v-tooltip="'Download'"
                    icon="pi pi-download"
                    text
                    size="small"
                    @click="(e) => confirm.require({
                      target: e.currentTarget,
                      message: 'Download Project Report.pdf?',
                      header: 'Download File',
                      icon: 'pi pi-download',
                      acceptProps: { label: 'Download', severity: 'info' },
                      rejectProps: { label: 'Cancel', severity: 'secondary', outlined: true },
                      accept: () => toast.add({ severity: 'info', summary: 'Download Started', detail: 'File download initiated', life: 3000 }),
                    })"
                  />
                  <Button
                    v-tooltip="'Share'"
                    icon="pi pi-share-alt"
                    text
                    size="small"
                    @click="(e) => confirm.require({
                      target: e.currentTarget,
                      message: 'Share this file with team members?',
                      header: 'Share File',
                      icon: 'pi pi-share-alt',
                      position: 'top',
                      acceptProps: { label: 'Share', severity: 'success' },
                      rejectProps: { label: 'Cancel', severity: 'secondary', outlined: true },
                      accept: () => toast.add({ severity: 'success', summary: 'Shared', detail: 'File shared successfully', life: 3000 }),
                    })"
                  />
                  <Button
                    v-tooltip="'Move to trash'"
                    icon="pi pi-trash"
                    text
                    size="small"
                    severity="danger"
                    @click="(e) => confirm.require({
                      target: e.currentTarget,
                      message: 'Move to trash? You can restore it later.',
                      header: 'Move to Trash',
                      icon: 'pi pi-trash',
                      position: 'topleft',
                      acceptProps: { label: 'Move to Trash', severity: 'danger' },
                      rejectProps: { label: 'Keep', severity: 'secondary', outlined: true },
                      accept: () => toast.add({ severity: 'warn', summary: 'Moved to Trash', detail: 'File moved to trash', life: 3000 }),
                    })"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Position Examples -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Position Examples
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        ConfirmPopup can be positioned relative to its trigger using different alignment options.
      </p>

      <div class="card">
        <div class="flex flex-wrap justify-center gap-4">
          <Button
            label="Top"
            size="small"
            @click="(e) => confirm.require({
              target: e.currentTarget,
              message: 'Popup positioned at top',
              header: 'Top Position',
              position: 'top',
              accept: () => toast.add({ severity: 'success', summary: 'Top', detail: 'Confirmed from top position', life: 3000 }),
            })"
          />
          <Button
            label="Bottom"
            size="small"
            @click="(e) => confirm.require({
              target: e.currentTarget,
              message: 'Popup positioned at bottom',
              header: 'Bottom Position',
              position: 'bottom',
              accept: () => toast.add({ severity: 'success', summary: 'Bottom', detail: 'Confirmed from bottom position', life: 3000 }),
            })"
          />
          <Button
            label="Left"
            size="small"
            @click="(e) => confirm.require({
              target: e.currentTarget,
              message: 'Popup positioned at left',
              header: 'Left Position',
              position: 'left',
              accept: () => toast.add({ severity: 'success', summary: 'Left', detail: 'Confirmed from left position', life: 3000 }),
            })"
          />
          <Button
            label="Right"
            size="small"
            @click="(e) => confirm.require({
              target: e.currentTarget,
              message: 'Popup positioned at right',
              header: 'Right Position',
              position: 'right',
              accept: () => toast.add({ severity: 'success', summary: 'Right', detail: 'Confirmed from right position', life: 3000 }),
            })"
          />
        </div>
      </div>
    </div>

    <!-- Form Integration -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Form Integration
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        ConfirmPopup integrated with form controls for contextual confirmations.
      </p>

      <div class="card">
        <div class="space-y-4 max-w-md">
          <div>
            <label class="block text-sm font-medium mb-2">Email Address</label>
            <InputText placeholder="Enter your email" fluid />
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">Password</label>
            <div class="flex gap-2">
              <Password placeholder="Enter password" fluid />
              <Button
                v-tooltip="'Generate password'"
                icon="pi pi-key"
                outlined
                @click="(e) => confirm.require({
                  target: e.currentTarget,
                  message: 'Generate a secure password automatically?',
                  header: 'Generate Password',
                  icon: 'pi pi-key',
                  position: 'left',
                  acceptProps: { label: 'Generate', severity: 'info' },
                  rejectProps: { label: 'Cancel', severity: 'secondary', outlined: true },
                  accept: () => toast.add({ severity: 'info', summary: 'Generated', detail: 'Secure password generated', life: 3000 }),
                })"
              />
            </div>
          </div>
          <div class="flex justify-between">
            <Button
              label="Reset Form"
              severity="secondary"
              outlined
              @click="(e) => confirm.require({
                target: e.currentTarget,
                message: 'Clear all form data?',
                header: 'Reset Form',
                icon: 'pi pi-refresh',
                position: 'top',
                acceptProps: { label: 'Reset', severity: 'warning' },
                rejectProps: { label: 'Cancel', severity: 'secondary', outlined: true },
                accept: () => toast.add({ severity: 'warn', summary: 'Reset', detail: 'Form has been reset', life: 3000 }),
              })"
            />
            <Button
              label="Submit"
              @click="(e) => confirm.require({
                target: e.currentTarget,
                message: 'Submit form with current data?',
                header: 'Submit Form',
                icon: 'pi pi-check',
                position: 'topleft',
                acceptProps: { label: 'Submit', severity: 'success' },
                rejectProps: { label: 'Review', severity: 'secondary', outlined: true },
                accept: () => toast.add({ severity: 'success', summary: 'Submitted', detail: 'Form submitted successfully', life: 3000 }),
              })"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
