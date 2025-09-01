<script setup lang="ts">
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';

const toast = useToast();

// Basic menubar items
const basicItems = ref([
  {
    label: 'Home',
    icon: 'pi pi-home',
    command: () => {
      toast.add({ severity: 'success', summary: 'Navigation', detail: 'Home selected', life: 3000 });
    }
  },
  {
    label: 'Features',
    icon: 'pi pi-star',
    items: [
      {
        label: 'Core',
        icon: 'pi pi-bolt',
        command: () => {
          toast.add({ severity: 'info', summary: 'Features', detail: 'Core features', life: 3000 });
        }
      },
      {
        label: 'Blocks',
        icon: 'pi pi-server',
        command: () => {
          toast.add({ severity: 'info', summary: 'Features', detail: 'UI Blocks', life: 3000 });
        }
      },
      {
        label: 'UI Kit',
        icon: 'pi pi-pencil',
        command: () => {
          toast.add({ severity: 'info', summary: 'Features', detail: 'UI Kit', life: 3000 });
        }
      }
    ]
  },
  {
    label: 'Projects',
    icon: 'pi pi-search',
    items: [
      {
        label: 'Components',
        icon: 'pi pi-bolt',
        command: () => {
          toast.add({ severity: 'info', summary: 'Projects', detail: 'Components project', life: 3000 });
        }
      },
      {
        label: 'Blocks',
        icon: 'pi pi-server',
        items: [
          {
            label: 'Layout Blocks',
            icon: 'pi pi-eye',
            command: () => {
              toast.add({ severity: 'info', summary: 'Blocks', detail: 'Layout blocks', life: 3000 });
            }
          },
          {
            label: 'Page Blocks',
            icon: 'pi pi-search',
            command: () => {
              toast.add({ severity: 'info', summary: 'Blocks', detail: 'Page blocks', life: 3000 });
            }
          }
        ]
      },
      {
        label: 'UI Kit',
        icon: 'pi pi-pencil',
        command: () => {
          toast.add({ severity: 'info', summary: 'Projects', detail: 'UI Kit project', life: 3000 });
        }
      },
      {
        label: 'Templates',
        icon: 'pi pi-palette',
        items: [
          {
            label: 'Apollo',
            icon: 'pi pi-palette',
            command: () => {
              toast.add({ severity: 'info', summary: 'Templates', detail: 'Apollo template', life: 3000 });
            }
          },
          {
            label: 'Ultima',
            icon: 'pi pi-palette',
            command: () => {
              toast.add({ severity: 'info', summary: 'Templates', detail: 'Ultima template', life: 3000 });
            }
          }
        ]
      }
    ]
  },
  {
    label: 'Contact',
    icon: 'pi pi-envelope',
    command: () => {
      toast.add({ severity: 'info', summary: 'Navigation', detail: 'Contact page', life: 3000 });
    }
  }
]);

// Template menubar items with badges and shortcuts
const templateItems = ref([
  {
    label: 'Home',
    icon: 'pi pi-home',
    command: () => {
      toast.add({ severity: 'success', summary: 'Template Menu', detail: 'Home selected', life: 3000 });
    }
  },
  {
    label: 'Projects',
    icon: 'pi pi-folder',
    badge: 3,
    items: [
      {
        label: 'Core',
        icon: 'pi pi-bolt',
        shortcut: '⌘+S',
        command: () => {
          toast.add({ severity: 'info', summary: 'Projects', detail: 'Core project', life: 3000 });
        }
      },
      {
        label: 'Blocks',
        icon: 'pi pi-server',
        shortcut: '⌘+B',
        command: () => {
          toast.add({ severity: 'info', summary: 'Projects', detail: 'Blocks project', life: 3000 });
        }
      },
      {
        label: 'UI Kit',
        icon: 'pi pi-pencil',
        shortcut: '⌘+U',
        command: () => {
          toast.add({ severity: 'info', summary: 'Projects', detail: 'UI Kit project', life: 3000 });
        }
      }
    ]
  }
]);

// Command menubar items
const commandItems = ref([
  {
    label: 'File',
    icon: 'pi pi-file',
    items: [
      {
        label: 'New',
        icon: 'pi pi-plus',
        command: () => {
          toast.add({ severity: 'success', summary: 'File', detail: 'New file created', life: 3000 });
        }
      },
      {
        label: 'Print',
        icon: 'pi pi-print',
        command: () => {
          toast.add({ severity: 'info', summary: 'File', detail: 'Print document', life: 3000 });
        }
      }
    ]
  },
  {
    label: 'Search',
    icon: 'pi pi-search',
    command: () => {
      toast.add({ severity: 'info', summary: 'Command', detail: 'Search executed', life: 3000 });
    }
  },
  {
    label: 'Sync',
    icon: 'pi pi-refresh',
    command: () => {
      toast.add({ severity: 'success', summary: 'Command', detail: 'Sync completed', life: 3000 });
    }
  },
  {
    label: 'Import',
    icon: 'pi pi-upload',
    command: () => {
      toast.add({ severity: 'info', summary: 'Command', detail: 'Import started', life: 3000 });
    }
  },
  {
    label: 'Export',
    icon: 'pi pi-download',
    command: () => {
      toast.add({ severity: 'info', summary: 'Command', detail: 'Export started', life: 3000 });
    }
  }
]);

// Router menubar items
const routerItems = ref([
  {
    label: 'Router',
    items: [
      {
        label: 'Styled',
        route: '/kitchen-sink/form/button'
      },
      {
        label: 'Unstyled',
        route: '/kitchen-sink/form/input-text'
      }
    ]
  },
  {
    label: 'Programmatic',
    icon: 'pi pi-upload',
    command: () => {
      navigateTo('/kitchen-sink/menu/menu');
      toast.add({ severity: 'info', summary: 'Navigation', detail: 'Programmatic navigation', life: 3000 });
    }
  },
  {
    label: 'External',
    icon: 'pi pi-external-link',
    items: [
      {
        label: 'Vue.js',
        icon: 'pi pi-external-link',
        url: 'https://vuejs.org',
        target: '_blank'
      },
      {
        label: 'Vite.js',
        icon: 'pi pi-external-link',
        url: 'https://vitejs.dev',
        target: '_blank'
      }
    ]
  }
]);

// Application menubar items
const appMenuItems = ref([
  {
    label: 'File',
    icon: 'pi pi-file',
    items: [
      {
        label: 'New',
        icon: 'pi pi-plus',
        items: [
          {
            label: 'Document',
            icon: 'pi pi-file',
            command: () => {
              toast.add({ severity: 'success', summary: 'File', detail: 'New document created', life: 3000 });
            }
          },
          {
            label: 'Image',
            icon: 'pi pi-image',
            command: () => {
              toast.add({ severity: 'success', summary: 'File', detail: 'New image created', life: 3000 });
            }
          }
        ]
      },
      {
        label: 'Open',
        icon: 'pi pi-folder-open',
        command: () => {
          toast.add({ severity: 'info', summary: 'File', detail: 'File opened', life: 3000 });
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
            label: 'Document 1.pdf',
            icon: 'pi pi-file-pdf',
            command: () => {
              toast.add({ severity: 'info', summary: 'Recent Files', detail: 'Document 1 opened', life: 3000 });
            }
          },
          {
            label: 'Spreadsheet.xlsx',
            icon: 'pi pi-file-excel',
            command: () => {
              toast.add({ severity: 'info', summary: 'Recent Files', detail: 'Spreadsheet opened', life: 3000 });
            }
          }
        ]
      },
      {
        separator: true
      },
      {
        label: 'Exit',
        icon: 'pi pi-power-off',
        command: () => {
          toast.add({ severity: 'warn', summary: 'File', detail: 'Application exit', life: 3000 });
        }
      }
    ]
  },
  {
    label: 'Edit',
    icon: 'pi pi-pencil',
    items: [
      {
        label: 'Undo',
        icon: 'pi pi-undo',
        command: () => {
          toast.add({ severity: 'info', summary: 'Edit', detail: 'Undo action', life: 3000 });
        }
      },
      {
        label: 'Redo',
        icon: 'pi pi-refresh',
        command: () => {
          toast.add({ severity: 'info', summary: 'Edit', detail: 'Redo action', life: 3000 });
        }
      },
      {
        separator: true
      },
      {
        label: 'Copy',
        icon: 'pi pi-copy',
        command: () => {
          toast.add({ severity: 'info', summary: 'Edit', detail: 'Text copied', life: 3000 });
        }
      },
      {
        label: 'Paste',
        icon: 'pi pi-paste',
        command: () => {
          toast.add({ severity: 'info', summary: 'Edit', detail: 'Text pasted', life: 3000 });
        }
      }
    ]
  },
  {
    label: 'View',
    icon: 'pi pi-eye',
    items: [
      {
        label: 'Zoom',
        icon: 'pi pi-search',
        items: [
          {
            label: 'Zoom In',
            icon: 'pi pi-search-plus',
            command: () => {
              toast.add({ severity: 'info', summary: 'View', detail: 'Zoomed in', life: 3000 });
            }
          },
          {
            label: 'Zoom Out',
            icon: 'pi pi-search-minus',
            command: () => {
              toast.add({ severity: 'info', summary: 'View', detail: 'Zoomed out', life: 3000 });
            }
          }
        ]
      },
      {
        label: 'Full Screen',
        icon: 'pi pi-window-maximize',
        command: () => {
          toast.add({ severity: 'info', summary: 'View', detail: 'Full screen mode', life: 3000 });
        }
      }
    ]
  },
  {
    label: 'Help',
    icon: 'pi pi-question-circle',
    items: [
      {
        label: 'Documentation',
        icon: 'pi pi-book',
        command: () => {
          toast.add({ severity: 'info', summary: 'Help', detail: 'Documentation opened', life: 3000 });
        }
      },
      {
        label: 'Support',
        icon: 'pi pi-phone',
        command: () => {
          toast.add({ severity: 'info', summary: 'Help', detail: 'Support contacted', life: 3000 });
        }
      },
      {
        separator: true
      },
      {
        label: 'About',
        icon: 'pi pi-info-circle',
        command: () => {
          toast.add({ severity: 'info', summary: 'Help', detail: 'About dialog', life: 3000 });
        }
      }
    ]
  }
]);

// E-commerce menubar
const ecommerceItems = ref([
  {
    label: 'Shop',
    icon: 'pi pi-shopping-cart',
    items: [
      {
        label: 'Categories',
        icon: 'pi pi-th-large',
        items: [
          {
            label: 'Electronics',
            icon: 'pi pi-mobile',
            command: () => {
              toast.add({ severity: 'info', summary: 'Shop', detail: 'Electronics category', life: 3000 });
            }
          },
          {
            label: 'Fashion',
            icon: 'pi pi-user',
            command: () => {
              toast.add({ severity: 'info', summary: 'Shop', detail: 'Fashion category', life: 3000 });
            }
          },
          {
            label: 'Home & Garden',
            icon: 'pi pi-home',
            command: () => {
              toast.add({ severity: 'info', summary: 'Shop', detail: 'Home & Garden category', life: 3000 });
            }
          }
        ]
      },
      {
        label: 'Deals',
        icon: 'pi pi-tag',
        badge: 'NEW',
        command: () => {
          toast.add({ severity: 'success', summary: 'Shop', detail: 'Special deals', life: 3000 });
        }
      }
    ]
  },
  {
    label: 'Account',
    icon: 'pi pi-user',
    items: [
      {
        label: 'Profile',
        icon: 'pi pi-user-edit',
        command: () => {
          toast.add({ severity: 'info', summary: 'Account', detail: 'Profile settings', life: 3000 });
        }
      },
      {
        label: 'Orders',
        icon: 'pi pi-list',
        badge: 5,
        command: () => {
          toast.add({ severity: 'info', summary: 'Account', detail: 'Order history', life: 3000 });
        }
      },
      {
        label: 'Wishlist',
        icon: 'pi pi-heart',
        command: () => {
          toast.add({ severity: 'info', summary: 'Account', detail: 'Wishlist items', life: 3000 });
        }
      }
    ]
  },
  {
    label: 'Support',
    icon: 'pi pi-question-circle',
    items: [
      {
        label: 'Help Center',
        icon: 'pi pi-book',
        command: () => {
          toast.add({ severity: 'info', summary: 'Support', detail: 'Help center', life: 3000 });
        }
      },
      {
        label: 'Contact Us',
        icon: 'pi pi-envelope',
        command: () => {
          toast.add({ severity: 'info', summary: 'Support', detail: 'Contact form', life: 3000 });
        }
      }
    ]
  }
]);

// Search functionality
const searchQuery = ref('');

const performSearch = () => {
  if (searchQuery.value) {
    toast.add({ 
      severity: 'info', 
      summary: 'Search', 
      detail: `Searching for: ${searchQuery.value}`, 
      life: 3000 
    });
  }
};
</script>

<template>
  <div class="p-6 space-y-8">
    <!-- Header -->
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-4">
        <Icon name="pi:window-maximize" size="32" class="text-primary-500" />
        <div class="flex flex-col">
          <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0">
            MenuBar
          </h1>
          <p class="text-surface-600 dark:text-surface-300">
            MenuBar also known as Navbar, is a horizontal menu component.
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
        MenuBar requires a collection of menuitems as its model.
      </p>
      
      <div class="card">
        <Menubar :model="basicItems" />
      </div>
    </div>

    <!-- Template Customization -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Template Customization
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        MenuBar offers item customization with the item template. Additional slots named start and end are provided to embed content before or after the menu.
      </p>
      
      <div class="card">
        <Menubar :model="templateItems">
          <template #start>
            <div class="flex items-center gap-2">
              <Icon name="lucide:bolt" size="24" class="text-primary-500" />
              <span class="text-xl font-semibold">PRIME<span class="text-primary-500">APP</span></span>
            </div>
          </template>
          <template #item="{ item, props, hasSubmenu, root }">
            <a v-ripple class="flex items-center" v-bind="props.action">
              <span :class="item.icon" />
              <span class="ml-2">{{ item.label }}</span>
              <Badge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }" :value="item.badge" />
              <span v-if="item.shortcut" class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{ item.shortcut }}</span>
              <i v-if="hasSubmenu" :class="['pi ml-auto', { 'pi-angle-down': root, 'pi-angle-right': !root }]"></i>
            </a>
          </template>
          <template #end>
            <div class="flex items-center gap-2">
              <InputText 
                v-model="searchQuery" 
                placeholder="Search" 
                type="text" 
                class="w-32 sm:w-auto"
                @keydown.enter="performSearch"
              />
              <Button 
                icon="pi pi-search" 
                text 
                @click="performSearch"
              />
              <Avatar 
                image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" 
                shape="circle" 
                size="small"
              />
            </div>
          </template>
        </Menubar>
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
        <Menubar :model="commandItems" />
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
        <Menubar :model="routerItems">
          <template #item="{ item, props, hasSubmenu }">
            <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
              <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                <span :class="item.icon" />
                <span class="ml-2">{{ item.label }}</span>
              </a>
            </router-link>
            <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
              <span :class="item.icon" />
              <span class="ml-2">{{ item.label }}</span>
              <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down ml-auto" />
            </a>
          </template>
        </Menubar>
      </div>
    </div>

    <!-- Application MenuBar -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Application MenuBar
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Complete application menu with File, Edit, View, and Help menus including nested submenus and separators.
      </p>
      
      <div class="card">
        <Menubar :model="appMenuItems" />
      </div>
    </div>

    <!-- E-commerce MenuBar -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        E-commerce MenuBar
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        E-commerce focused menu with shop categories, account options, and support features.
      </p>
      
      <div class="card">
        <Menubar :model="ecommerceItems">
          <template #start>
            <div class="flex items-center gap-2">
              <Icon name="pi:shopping-cart" size="24" class="text-primary-500" />
              <span class="text-lg font-bold text-primary-500">ShopApp</span>
            </div>
          </template>
          <template #item="{ item, props, hasSubmenu, root }">
            <a v-ripple class="flex items-center" v-bind="props.action">
              <span :class="item.icon" />
              <span class="ml-2">{{ item.label }}</span>
              <Badge 
                v-if="item.badge" 
                :class="{ 'ml-auto': !root, 'ml-2': root }" 
                :value="item.badge"
                :severity="item.badge === 'NEW' ? 'success' : 'info'"
              />
              <i v-if="hasSubmenu" :class="['pi ml-auto', { 'pi-angle-down': root, 'pi-angle-right': !root }]"></i>
            </a>
          </template>
          <template #end>
            <div class="flex items-center gap-2">
              <Button icon="pi pi-heart" text severity="secondary" />
              <Button icon="pi pi-shopping-cart" severity="primary" badge="3" />
            </div>
          </template>
        </Menubar>
      </div>
    </div>

    <!-- Mobile Responsive -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Mobile Responsive
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        MenuBar automatically adapts to mobile viewports with a hamburger menu icon.
      </p>
      
      <div class="card">
        <div class="max-w-sm mx-auto border border-surface-200 dark:border-surface-700 rounded-lg overflow-hidden">
          <Menubar :model="basicItems">
            <template #start>
              <div class="flex items-center gap-2">
                <Icon name="pi:mobile" size="20" class="text-primary-500" />
                <span class="text-lg font-semibold">Mobile</span>
              </div>
            </template>
            <template #end>
              <Button icon="pi pi-user" text size="small" />
            </template>
          </Menubar>
        </div>
        <div class="mt-4 text-sm text-surface-500 dark:text-surface-400">
          <i class="pi pi-info-circle mr-1" />
          Resize your browser or view on mobile to see the hamburger menu behavior.
        </div>
      </div>
    </div>

    <!-- Different Styles -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Style Variations
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Different styling approaches for MenuBar in various contexts.
      </p>
      
      <div class="card space-y-6">
        <!-- Dark Theme -->
        <div>
          <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">Dark Theme</h3>
          <div class="bg-surface-900 dark:bg-surface-950 rounded-lg overflow-hidden">
            <Menubar :model="basicItems.slice(0, 3)" class="border-0 bg-surface-900 dark:bg-surface-950">
              <template #start>
                <div class="flex items-center gap-2">
                  <Icon name="pi:moon" size="20" class="text-yellow-400" />
                  <span class="text-lg font-semibold text-white">DarkApp</span>
                </div>
              </template>
            </Menubar>
          </div>
        </div>

        <!-- Bordered Style -->
        <div>
          <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">Bordered Style</h3>
          <div class="border-2 border-primary-200 dark:border-primary-700 rounded-lg overflow-hidden">
            <Menubar :model="basicItems.slice(0, 3)" class="border-0 bg-primary-50 dark:bg-primary-900/20">
              <template #start>
                <div class="flex items-center gap-2">
                  <Icon name="pi:bookmark" size="20" class="text-primary-600" />
                  <span class="text-lg font-semibold text-primary-700 dark:text-primary-200">BorderApp</span>
                </div>
              </template>
            </Menubar>
          </div>
        </div>
      </div>
    </div>

    <Toast />
  </div>
</template>