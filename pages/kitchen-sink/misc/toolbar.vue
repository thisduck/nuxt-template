<script setup lang="ts">
import { ref } from 'vue';

const saveMenuItems = ref([
  {
    label: 'Save',
    icon: 'pi pi-save'
  },
  {
    label: 'Save As',
    icon: 'pi pi-copy'
  },
  {
    label: 'Export',
    icon: 'pi pi-download'
  }
]);

const fileMenuItems = ref([
  {
    label: 'New',
    icon: 'pi pi-plus',
    items: [
      { label: 'Document', icon: 'pi pi-file' },
      { label: 'Folder', icon: 'pi pi-folder' },
      { label: 'Project', icon: 'pi pi-briefcase' }
    ]
  },
  {
    label: 'Open',
    icon: 'pi pi-folder-open'
  },
  {
    separator: true
  },
  {
    label: 'Save',
    icon: 'pi pi-save'
  },
  {
    label: 'Save As',
    icon: 'pi pi-copy'
  }
]);

const editMenuItems = ref([
  {
    label: 'Undo',
    icon: 'pi pi-undo'
  },
  {
    label: 'Redo', 
    icon: 'pi pi-refresh'
  },
  {
    separator: true
  },
  {
    label: 'Cut',
    icon: 'pi pi-scissors'
  },
  {
    label: 'Copy',
    icon: 'pi pi-copy'
  },
  {
    label: 'Paste',
    icon: 'pi pi-file'
  }
]);

const viewMenuItems = ref([
  {
    label: 'Zoom In',
    icon: 'pi pi-search-plus'
  },
  {
    label: 'Zoom Out',
    icon: 'pi pi-search-minus'
  },
  {
    separator: true
  },
  {
    label: 'Fullscreen',
    icon: 'pi pi-window-maximize'
  }
]);

const volume = ref(50);
const rowsPerPage = ref('25');
</script>

<template>
  <div class="p-6 space-y-8">
    <!-- Header -->
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-4">
        <Icon name="pi:bars" size="32" class="text-primary-500" />
        <div class="flex flex-col">
          <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0">
            Toolbar
          </h1>
          <p class="text-surface-600 dark:text-surface-300">
            Toolbar is a grouping component for buttons and other content.
          </p>
        </div>
      </div>
    </div>

    <!-- Basic Toolbar -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Basic Toolbar
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Toolbar provides start, center and end properties to place content at these sections.
      </p>
      
      <div class="card">
        <Toolbar>
          <template #start>
            <Button icon="pi pi-plus" class="mr-2" severity="secondary" text />
            <Button icon="pi pi-print" class="mr-2" severity="secondary" text />
            <Button icon="pi pi-upload" severity="secondary" text />
          </template>

          <template #center>
            <IconField>
              <InputIcon>
                <i class="pi pi-search" />
              </InputIcon>
              <InputText placeholder="Search" />
            </IconField>
          </template>

          <template #end>
            <SplitButton label="Save" :model="saveMenuItems" />
          </template>
        </Toolbar>
      </div>
    </div>

    <!-- Custom Styled Toolbar -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Custom Styled Toolbar
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        A customized toolbar with navigation bar functionality and rounded corners.
      </p>
      
      <div class="card">
        <Toolbar style="border-radius: 3rem; padding: 1rem 1rem 1rem 1.5rem">
          <template #start>
            <div class="flex items-center gap-2">
              <Icon name="lucide:bolt" size="28" class="text-primary-500" />
              <Button label="Files" text plain />
              <Button label="Edit" text plain />
              <Button label="View" text plain />
            </div>
          </template>

          <template #end>
            <div class="flex items-center gap-2">
              <Button label="Share" severity="contrast" size="small" />
              <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" style="width: 32px; height: 32px" />
            </div>
          </template>
        </Toolbar>
      </div>
    </div>

    <!-- Application Toolbar -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Application Toolbar
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        A comprehensive toolbar example resembling a typical application interface.
      </p>
      
      <div class="card">
        <Toolbar class="mb-4">
          <template #start>
            <div class="flex items-center gap-2">
              <Icon name="lucide:file-text" size="24" class="text-primary-500" />
              <span class="font-semibold text-lg">Document Editor</span>
            </div>
          </template>

          <template #center>
            <div class="flex items-center gap-2">
              <Button icon="pi pi-file" v-tooltip="'New Document'" text />
              <Button icon="pi pi-folder-open" v-tooltip="'Open'" text />
              <Button icon="pi pi-save" v-tooltip="'Save'" text />
              <Divider layout="vertical" />
              <Button icon="pi pi-undo" v-tooltip="'Undo'" text />
              <Button icon="pi pi-refresh" v-tooltip="'Redo'" text />
              <Divider layout="vertical" />
              <Button icon="pi pi-bold" v-tooltip="'Bold'" text />
              <Button icon="pi pi-italic" v-tooltip="'Italic'" text />
              <Button icon="pi pi-underline" v-tooltip="'Underline'" text />
            </div>
          </template>

          <template #end>
            <div class="flex items-center gap-2">
              <Badge value="3" severity="danger">
                <Button icon="pi pi-bell" text />
              </Badge>
              <Button icon="pi pi-cog" v-tooltip="'Settings'" text />
            </div>
          </template>
        </Toolbar>
      </div>
    </div>

    <!-- Menu Bar Toolbar -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Menu Bar Style
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Toolbar configured as a traditional menu bar with dropdown menus.
      </p>
      
      <div class="card">
        <Toolbar>
          <template #start>
            <div class="flex items-center gap-1">
              <Menu :model="fileMenuItems">
                <template #item="{ item, props }">
                  <a v-bind="props.action" class="flex items-center gap-2">
                    <span :class="item.icon" />
                    <span>{{ item.label }}</span>
                  </a>
                </template>
              </Menu>
              
              <Button label="File" text plain class="p-2" />
              <Button label="Edit" text plain class="p-2" />
              <Button label="View" text plain class="p-2" />
              <Button label="Insert" text plain class="p-2" />
              <Button label="Format" text plain class="p-2" />
              <Button label="Tools" text plain class="p-2" />
              <Button label="Help" text plain class="p-2" />
            </div>
          </template>

          <template #end>
            <div class="flex items-center gap-2">
              <Button icon="pi pi-question-circle" v-tooltip="'Help'" text size="small" />
              <Button icon="pi pi-times" v-tooltip="'Close'" text size="small" />
            </div>
          </template>
        </Toolbar>
      </div>
    </div>

    <!-- Media Player Toolbar -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Media Player Controls
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Toolbar designed for media player functionality with playback controls.
      </p>
      
      <div class="card">
        <Toolbar class="bg-surface-900 text-surface-0" style="border-radius: 1rem;">
          <template #start>
            <div class="flex items-center gap-2">
              <Icon name="lucide:music" size="24" class="text-primary-400" />
              <div>
                <div class="text-sm font-medium">Now Playing</div>
                <div class="text-xs text-surface-300">Song Title - Artist Name</div>
              </div>
            </div>
          </template>

          <template #center>
            <div class="flex items-center gap-4">
              <Button icon="pi pi-step-backward" text size="small" class="text-surface-0 hover:text-primary-400" />
              <Button icon="pi pi-play" text size="large" class="text-surface-0 hover:text-primary-400" />
              <Button icon="pi pi-step-forward" text size="small" class="text-surface-0 hover:text-primary-400" />
            </div>
          </template>

          <template #end>
            <div class="flex items-center gap-2">
              <Button icon="pi pi-volume-up" text size="small" class="text-surface-0" />
              <Slider v-model="volume" class="w-20" />
              <Button icon="pi pi-list" v-tooltip="'Playlist'" text size="small" class="text-surface-0" />
            </div>
          </template>
        </Toolbar>
      </div>
    </div>

    <!-- Mobile-Responsive Toolbar -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Mobile Responsive
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Toolbar that adapts to different screen sizes with collapsible content.
      </p>
      
      <div class="card">
        <Toolbar>
          <template #start>
            <div class="flex items-center gap-2">
              <Button icon="pi pi-bars" class="lg:hidden" text />
              <Icon name="lucide:smartphone" size="24" class="text-primary-500" />
              <span class="font-semibold hidden md:block">Mobile App</span>
            </div>
          </template>

          <template #center>
            <div class="hidden lg:flex items-center gap-2">
              <Button icon="pi pi-home" label="Home" text />
              <Button icon="pi pi-user" label="Profile" text />
              <Button icon="pi pi-cog" label="Settings" text />
            </div>
          </template>

          <template #end>
            <div class="flex items-center gap-2">
              <Button icon="pi pi-search" class="md:hidden" text />
              <IconField class="hidden md:block">
                <InputIcon>
                  <i class="pi pi-search" />
                </InputIcon>
                <InputText placeholder="Search..." size="small" />
              </IconField>
              <Button icon="pi pi-user" text />
            </div>
          </template>
        </Toolbar>
      </div>
    </div>

    <!-- Data Table Actions Toolbar -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Data Table Actions
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Toolbar commonly used above data tables for bulk actions and filters.
      </p>
      
      <div class="card">
        <Toolbar class="mb-4">
          <template #start>
            <div class="flex items-center gap-2">
              <Button icon="pi pi-plus" label="New" />
              <Button icon="pi pi-upload" label="Import" severity="secondary" />
              <Button icon="pi pi-download" label="Export" severity="secondary" />
            </div>
          </template>

          <template #center>
            <div class="flex items-center gap-2">
              <span class="text-sm text-surface-600 dark:text-surface-300">Show:</span>
              <Select :options="['10', '25', '50', '100']" v-model="rowsPerPage" placeholder="Rows" class="w-20" />
              <Divider layout="vertical" />
              <MultiSelect :options="['Active', 'Inactive', 'Pending']" placeholder="Status" class="w-40" />
            </div>
          </template>

          <template #end>
            <div class="flex items-center gap-2">
              <IconField>
                <InputIcon>
                  <i class="pi pi-search" />
                </InputIcon>
                <InputText placeholder="Global Search" />
              </IconField>
              <Button icon="pi pi-filter" v-tooltip="'Advanced Filters'" text />
              <Button icon="pi pi-refresh" v-tooltip="'Refresh'" text />
            </div>
          </template>
        </Toolbar>

        <!-- Sample table to show context -->
        <div class="bg-surface-50 dark:bg-surface-800 p-4 rounded text-center">
          <span class="text-surface-600 dark:text-surface-300">Data Table would appear here</span>
        </div>
      </div>
    </div>

    <!-- Vertical Toolbar -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Vertical Layout
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Toolbar can be oriented vertically using CSS flex-direction.
      </p>
      
      <div class="card">
        <div class="flex gap-4">
          <Toolbar class="flex-col h-96 w-16" style="flex-direction: column;">
            <template #start>
              <div class="flex flex-col gap-2">
                <Button icon="pi pi-file" v-tooltip.right="'New File'" text />
                <Button icon="pi pi-folder" v-tooltip.right="'Open Folder'" text />
                <Button icon="pi pi-save" v-tooltip.right="'Save'" text />
              </div>
            </template>

            <template #center>
              <div class="flex flex-col gap-2">
                <Divider />
                <Button icon="pi pi-copy" v-tooltip.right="'Copy'" text />
                <Button icon="pi pi-scissors" v-tooltip.right="'Cut'" text />
                <Button icon="pi pi-file" v-tooltip.right="'Paste'" text />
              </div>
            </template>

            <template #end>
              <div class="flex flex-col gap-2">
                <Button icon="pi pi-cog" v-tooltip.right="'Settings'" text />
                <Button icon="pi pi-question-circle" v-tooltip.right="'Help'" text />
              </div>
            </template>
          </Toolbar>

          <div class="flex-1 bg-surface-50 dark:bg-surface-800 rounded-lg p-8 flex items-center justify-center">
            <span class="text-surface-600 dark:text-surface-300">Main content area with vertical toolbar on the left</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>