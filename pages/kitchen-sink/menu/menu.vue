<script setup lang="ts">
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';

const toast = useToast();

// Basic menu items
const basicItems = ref([
  {
    label: 'New',
    icon: 'pi pi-plus',
    command: () => {
      toast.add({ severity: 'success', summary: 'Menu Action', detail: 'New item selected', life: 3000 });
    }
  },
  {
    label: 'Search',
    icon: 'pi pi-search',
    command: () => {
      toast.add({ severity: 'info', summary: 'Menu Action', detail: 'Search initiated', life: 3000 });
    }
  },
  {
    label: 'Delete',
    icon: 'pi pi-trash',
    command: () => {
      toast.add({ severity: 'warn', summary: 'Menu Action', detail: 'Delete action', life: 3000 });
    }
  }
]);

// Grouped menu items
const groupedItems = ref([
  {
    separator: true
  },
  {
    label: 'Documents',
    items: [
      {
        label: 'New',
        icon: 'pi pi-file',
        shortcut: '⌘+N',
        command: () => {
          toast.add({ severity: 'success', summary: 'Documents', detail: 'New document created', life: 3000 });
        }
      },
      {
        label: 'Search',
        icon: 'pi pi-search',
        shortcut: '⌘+S',
        command: () => {
          toast.add({ severity: 'info', summary: 'Documents', detail: 'Search documents', life: 3000 });
        }
      }
    ]
  },
  {
    label: 'Profile',
    items: [
      {
        label: 'Settings',
        icon: 'pi pi-cog',
        shortcut: '⌘+O',
        command: () => {
          toast.add({ severity: 'info', summary: 'Profile', detail: 'Settings opened', life: 3000 });
        }
      },
      {
        label: 'Messages',
        icon: 'pi pi-inbox',
        badge: 2,
        command: () => {
          toast.add({ severity: 'info', summary: 'Profile', detail: 'Messages opened', life: 3000 });
        }
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        shortcut: '⌘+Q',
        command: () => {
          toast.add({ severity: 'warn', summary: 'Profile', detail: 'Logged out', life: 3000 });
        }
      }
    ]
  }
]);

// Popup menu
const menu = ref();
const popupItems = ref([
  {
    label: 'Save',
    icon: 'pi pi-save',
    command: () => {
      toast.add({ severity: 'success', summary: 'File', detail: 'File saved', life: 3000 });
    }
  },
  {
    label: 'Update',
    icon: 'pi pi-refresh',
    command: () => {
      toast.add({ severity: 'info', summary: 'File', detail: 'File updated', life: 3000 });
    }
  },
  {
    label: 'Delete',
    icon: 'pi pi-trash',
    command: () => {
      toast.add({ severity: 'error', summary: 'File', detail: 'File deleted', life: 3000 });
    }
  }
]);

const toggleMenu = (event: Event) => {
  menu.value.toggle(event);
};

// Template menu items
const templateItems = ref([
  {
    separator: true
  },
  {
    label: 'Documents',
    items: [
      {
        label: 'New',
        icon: 'pi pi-file',
        shortcut: '⌘+N',
        command: () => {
          toast.add({ severity: 'success', summary: 'Template Menu', detail: 'New document', life: 3000 });
        }
      },
      {
        label: 'Search',
        icon: 'pi pi-search',
        shortcut: '⌘+S',
        command: () => {
          toast.add({ severity: 'info', summary: 'Template Menu', detail: 'Search documents', life: 3000 });
        }
      }
    ]
  },
  {
    label: 'Profile',
    items: [
      {
        label: 'Settings',
        icon: 'pi pi-cog',
        shortcut: '⌘+O',
        command: () => {
          toast.add({ severity: 'info', summary: 'Template Menu', detail: 'Settings', life: 3000 });
        }
      },
      {
        label: 'Messages',
        icon: 'pi pi-inbox',
        badge: 2,
        command: () => {
          toast.add({ severity: 'info', summary: 'Template Menu', detail: 'Messages', life: 3000 });
        }
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        shortcut: '⌘+Q',
        command: () => {
          toast.add({ severity: 'warn', summary: 'Template Menu', detail: 'Logout', life: 3000 });
        }
      }
    ]
  }
]);

// Command menu items
const commandItems = ref([
  {
    label: 'New',
    icon: 'pi pi-plus',
    command: () => {
      toast.add({ severity: 'success', summary: 'Command', detail: 'New item created', life: 3000 });
    }
  },
  {
    label: 'Search',
    icon: 'pi pi-search',
    command: () => {
      toast.add({ severity: 'info', summary: 'Command', detail: 'Search executed', life: 3000 });
    }
  },
  {
    label: 'Print',
    icon: 'pi pi-print',
    command: () => {
      toast.add({ severity: 'info', summary: 'Command', detail: 'Print started', life: 3000 });
    }
  },
  {
    separator: true
  },
  {
    label: 'Archive',
    icon: 'pi pi-archive',
    command: () => {
      toast.add({ severity: 'warn', summary: 'Command', detail: 'Item archived', life: 3000 });
    }
  },
  {
    label: 'Delete',
    icon: 'pi pi-trash',
    command: () => {
      toast.add({ severity: 'error', summary: 'Command', detail: 'Item deleted', life: 3000 });
    }
  }
]);

// Router menu items
const routerItems = ref([
  {
    label: 'Navigate',
    items: [
      {
        label: 'Router Link',
        icon: 'pi pi-external-link',
        route: '/kitchen-sink'
      },
      {
        label: 'Programmatic',
        icon: 'pi pi-upload',
        command: () => {
          navigateTo('/kitchen-sink/form');
        }
      }
    ]
  },
  {
    separator: true
  },
  {
    label: 'External',
    icon: 'pi pi-globe',
    url: 'https://primevue.org',
    target: '_blank'
  }
]);

// Navigation menu items for different categories
const fileMenuItems = ref([
  {
    label: 'New File',
    icon: 'pi pi-file',
    shortcut: 'Ctrl+N',
    command: () => {
      toast.add({ severity: 'success', summary: 'File', detail: 'New file created', life: 3000 });
    }
  },
  {
    label: 'Open File',
    icon: 'pi pi-folder-open',
    shortcut: 'Ctrl+O',
    command: () => {
      toast.add({ severity: 'info', summary: 'File', detail: 'File opened', life: 3000 });
    }
  },
  {
    label: 'Save',
    icon: 'pi pi-save',
    shortcut: 'Ctrl+S',
    command: () => {
      toast.add({ severity: 'success', summary: 'File', detail: 'File saved', life: 3000 });
    }
  },
  {
    separator: true
  },
  {
    label: 'Recent Files',
    icon: 'pi pi-clock',
    items: [
      {
        label: 'Document.pdf',
        icon: 'pi pi-file-pdf',
        command: () => {
          toast.add({ severity: 'info', summary: 'Recent Files', detail: 'Document.pdf opened', life: 3000 });
        }
      },
      {
        label: 'Spreadsheet.xlsx',
        icon: 'pi pi-file-excel',
        command: () => {
          toast.add({ severity: 'info', summary: 'Recent Files', detail: 'Spreadsheet.xlsx opened', life: 3000 });
        }
      },
      {
        label: 'Presentation.pptx',
        icon: 'pi pi-file',
        command: () => {
          toast.add({ severity: 'info', summary: 'Recent Files', detail: 'Presentation.pptx opened', life: 3000 });
        }
      }
    ]
  },
  {
    separator: true
  },
  {
    label: 'Exit',
    icon: 'pi pi-times',
    shortcut: 'Alt+F4',
    command: () => {
      toast.add({ severity: 'warn', summary: 'File', detail: 'Application exit', life: 3000 });
    }
  }
]);

const editMenuItems = ref([
  {
    label: 'Undo',
    icon: 'pi pi-undo',
    shortcut: 'Ctrl+Z',
    command: () => {
      toast.add({ severity: 'info', summary: 'Edit', detail: 'Undo action', life: 3000 });
    }
  },
  {
    label: 'Redo',
    icon: 'pi pi-refresh',
    shortcut: 'Ctrl+Y',
    command: () => {
      toast.add({ severity: 'info', summary: 'Edit', detail: 'Redo action', life: 3000 });
    }
  },
  {
    separator: true
  },
  {
    label: 'Cut',
    icon: 'pi pi-scissors',
    shortcut: 'Ctrl+X',
    command: () => {
      toast.add({ severity: 'info', summary: 'Edit', detail: 'Cut text', life: 3000 });
    }
  },
  {
    label: 'Copy',
    icon: 'pi pi-copy',
    shortcut: 'Ctrl+C',
    command: () => {
      toast.add({ severity: 'info', summary: 'Edit', detail: 'Copy text', life: 3000 });
    }
  },
  {
    label: 'Paste',
    icon: 'pi pi-paste',
    shortcut: 'Ctrl+V',
    command: () => {
      toast.add({ severity: 'info', summary: 'Edit', detail: 'Paste text', life: 3000 });
    }
  },
  {
    separator: true
  },
  {
    label: 'Find',
    icon: 'pi pi-search',
    shortcut: 'Ctrl+F',
    command: () => {
      toast.add({ severity: 'info', summary: 'Edit', detail: 'Find dialog opened', life: 3000 });
    }
  },
  {
    label: 'Replace',
    icon: 'pi pi-replay',
    shortcut: 'Ctrl+H',
    command: () => {
      toast.add({ severity: 'info', summary: 'Edit', detail: 'Replace dialog opened', life: 3000 });
    }
  }
]);

const viewMenuItems = ref([
  {
    label: 'Zoom In',
    icon: 'pi pi-search-plus',
    shortcut: 'Ctrl++',
    command: () => {
      toast.add({ severity: 'info', summary: 'View', detail: 'Zoomed in', life: 3000 });
    }
  },
  {
    label: 'Zoom Out',
    icon: 'pi pi-search-minus',
    shortcut: 'Ctrl+-',
    command: () => {
      toast.add({ severity: 'info', summary: 'View', detail: 'Zoomed out', life: 3000 });
    }
  },
  {
    label: 'Reset Zoom',
    icon: 'pi pi-refresh',
    shortcut: 'Ctrl+0',
    command: () => {
      toast.add({ severity: 'info', summary: 'View', detail: 'Zoom reset', life: 3000 });
    }
  },
  {
    separator: true
  },
  {
    label: 'Full Screen',
    icon: 'pi pi-window-maximize',
    shortcut: 'F11',
    command: () => {
      toast.add({ severity: 'info', summary: 'View', detail: 'Full screen mode', life: 3000 });
    }
  },
  {
    separator: true
  },
  {
    label: 'Layout',
    icon: 'pi pi-th-large',
    items: [
      {
        label: 'Sidebar',
        icon: 'pi pi-bars',
        command: () => {
          toast.add({ severity: 'info', summary: 'Layout', detail: 'Sidebar toggled', life: 3000 });
        }
      },
      {
        label: 'Toolbar',
        icon: 'pi pi-wrench',
        command: () => {
          toast.add({ severity: 'info', summary: 'Layout', detail: 'Toolbar toggled', life: 3000 });
        }
      },
      {
        label: 'Status Bar',
        icon: 'pi pi-info',
        command: () => {
          toast.add({ severity: 'info', summary: 'Layout', detail: 'Status bar toggled', life: 3000 });
        }
      }
    ]
  }
]);
</script>

<template>
  <div class="p-6 space-y-8">
    <!-- Header -->
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-4">
        <Icon name="pi:bars" size="32" class="text-primary-500" />
        <div class="flex flex-col">
          <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0">
            Menu
          </h1>
          <p class="text-surface-600 dark:text-surface-300">
            Menu displays a list of items in vertical orientation.
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
        Menu requires a collection of menuitems as its model.
      </p>
      
      <div class="card">
        <Menu :model="basicItems" class="w-full md:w-48" />
      </div>
    </div>

    <!-- Grouped Menu -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Grouped Menu
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Menu supports single level of grouping by defining children with the items property.
      </p>
      
      <div class="card">
        <Menu :model="groupedItems" class="w-full md:w-60" />
      </div>
    </div>

    <!-- Popup Menu -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Popup Menu
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Overlay mode is enabled by adding popup property and calling toggle function of the menu ref with an event of the target.
      </p>
      
      <div class="card">
        <Button 
          type="button" 
          icon="pi pi-ellipsis-v" 
          label="Show Menu"
          @click="toggleMenu" 
          aria-haspopup="true" 
          aria-controls="popup_menu" 
        />
        <Menu 
          ref="menu" 
          id="popup_menu" 
          :model="popupItems" 
          :popup="true" 
          class="w-48"
        />
      </div>
    </div>

    <!-- Template Customization -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Template Customization
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Menu offers item customization with the item template. Additional slots named start and end are provided to embed content before or after the menu.
      </p>
      
      <div class="card">
        <Menu :model="templateItems" class="w-full md:w-60">
          <template #start>
            <span class="inline-flex items-center gap-1 px-2 py-2">
              <Icon name="lucide:bolt" size="20" class="text-primary-500" />
              <span class="text-xl font-semibold">PRIME<span class="text-primary-500">APP</span></span>
            </span>
          </template>
          <template #submenulabel="{ item }">
            <span class="text-primary-500 font-bold">{{ item.label }}</span>
          </template>
          <template #item="{ item, props }">
            <a v-ripple class="flex items-center" v-bind="props.action">
              <span :class="item.icon" />
              <span class="ml-2">{{ item.label }}</span>
              <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
              <span v-if="item.shortcut" class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{ item.shortcut }}</span>
            </a>
          </template>
          <template #end>
            <button v-ripple class="relative overflow-hidden w-full border-0 bg-transparent flex items-start p-2 pl-4 hover:bg-surface-100 dark:hover:bg-surface-800 rounded-none cursor-pointer transition-colors duration-200">
              <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" class="mr-2" shape="circle" />
              <span class="inline-flex flex-col items-start">
                <span class="font-bold">Amy Elsner</span>
                <span class="text-sm text-surface-600 dark:text-surface-300">Admin</span>
              </span>
            </button>
          </template>
        </Menu>
      </div>
    </div>

    <!-- Command Integration -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Command Integration
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        The command property defines the callback to run when an item is activated by click or a key event.
      </p>
      
      <div class="card">
        <Menu :model="commandItems" class="w-full md:w-48" />
      </div>
    </div>

    <!-- Router Integration -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Router Integration
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Items with navigation are defined with templating to be able to use a router link component, an external link or programmatic navigation.
      </p>
      
      <div class="card">
        <Menu :model="routerItems" class="w-full md:w-48">
          <template #item="{ item, props }">
            <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
              <a v-ripple :href="href" v-bind="props.action" @click="navigate" class="flex items-center">
                <span :class="item.icon" />
                <span class="ml-2">{{ item.label }}</span>
              </a>
            </router-link>
            <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action" class="flex items-center">
              <span :class="item.icon" />
              <span class="ml-2">{{ item.label }}</span>
            </a>
          </template>
        </Menu>
      </div>
    </div>

    <!-- Application Menu Example -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Application Menu Example
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Real-world example showing typical application menu structure with File, Edit, and View menus.
      </p>
      
      <div class="card">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- File Menu -->
          <div class="flex flex-col gap-3">
            <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100">File Menu</h3>
            <Menu :model="fileMenuItems" class="w-full" />
          </div>

          <!-- Edit Menu -->
          <div class="flex flex-col gap-3">
            <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100">Edit Menu</h3>
            <Menu :model="editMenuItems" class="w-full" />
          </div>

          <!-- View Menu -->
          <div class="flex flex-col gap-3">
            <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100">View Menu</h3>
            <Menu :model="viewMenuItems" class="w-full" />
          </div>
        </div>
      </div>
    </div>

    <!-- Styled Menus -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Styled Menu Variations
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Different styling approaches for menus in various contexts.
      </p>
      
      <div class="card">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Compact Menu -->
          <div class="flex flex-col gap-3">
            <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100">Compact Style</h3>
            <div class="border border-surface-200 dark:border-surface-700 rounded-lg p-2">
              <Menu :model="basicItems" class="w-full border-0">
                <template #item="{ item, props }">
                  <a v-ripple class="flex items-center p-2 text-sm hover:bg-surface-100 dark:hover:bg-surface-800 rounded" v-bind="props.action">
                    <span :class="[item.icon, 'text-xs']" />
                    <span class="ml-2">{{ item.label }}</span>
                  </a>
                </template>
              </Menu>
            </div>
          </div>

          <!-- Spacious Menu -->
          <div class="flex flex-col gap-3">
            <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100">Spacious Style</h3>
            <div class="bg-surface-50 dark:bg-surface-800 rounded-lg p-3">
              <Menu :model="basicItems" class="w-full border-0">
                <template #item="{ item, props }">
                  <a v-ripple class="flex items-center p-4 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg mb-1 transition-colors" v-bind="props.action">
                    <span :class="[item.icon, 'text-lg text-primary-500']" />
                    <span class="ml-3 font-medium">{{ item.label }}</span>
                  </a>
                </template>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Toast />
  </div>
</template>