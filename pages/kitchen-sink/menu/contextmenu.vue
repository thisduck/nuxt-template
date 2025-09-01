<script setup lang="ts">
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const menu = ref();
const globalMenu = ref();
const productMenu = ref();
const userMenu = ref();
const routerMenu = ref();
const dataTableMenu = ref();

const selectedId = ref(null);
const selectedUser = ref(null);
const selectedProduct = ref(null);

// Basic menu items
const basicItems = ref([
  {
    label: 'View',
    icon: 'pi pi-search'
  },
  {
    label: 'Delete',
    icon: 'pi pi-times'
  },
  {
    separator: true
  },
  {
    label: 'Edit',
    icon: 'pi pi-pencil',
    items: [
      {
        label: 'Properties',
        icon: 'pi pi-cog'
      },
      {
        label: 'Permissions',
        icon: 'pi pi-lock'
      }
    ]
  }
]);

// Global menu items
const globalItems = ref([
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
            icon: 'pi pi-file'
          },
          {
            label: 'Folder',
            icon: 'pi pi-folder'
          }
        ]
      },
      {
        label: 'Open',
        icon: 'pi pi-folder-open'
      },
      {
        label: 'Save',
        icon: 'pi pi-save'
      },
      {
        separator: true
      },
      {
        label: 'Exit',
        icon: 'pi pi-sign-out'
      }
    ]
  },
  {
    label: 'Edit',
    icon: 'pi pi-pencil',
    items: [
      {
        label: 'Copy',
        icon: 'pi pi-copy'
      },
      {
        label: 'Paste',
        icon: 'pi pi-clipboard'
      },
      {
        label: 'Cut',
        icon: 'pi pi-scissors'
      }
    ]
  },
  {
    label: 'View',
    icon: 'pi pi-eye',
    items: [
      {
        label: 'Zoom In',
        icon: 'pi pi-search-plus'
      },
      {
        label: 'Zoom Out',
        icon: 'pi pi-search-minus'
      },
      {
        label: 'Full Screen',
        icon: 'pi pi-window-maximize'
      }
    ]
  },
  {
    label: 'Help',
    icon: 'pi pi-question-circle'
  }
]);

// Product menu items with templates
const productItems = ref([
  {
    label: 'View Details',
    icon: 'pi pi-search',
    command: () => {
      toast.add({ severity: 'info', summary: 'Product Details', detail: 'Viewing product details...', life: 3000 });
    }
  },
  {
    label: 'Edit',
    icon: 'pi pi-pencil',
    command: () => {
      toast.add({ severity: 'success', summary: 'Edit Product', detail: 'Opening edit dialog...', life: 3000 });
    }
  },
  {
    label: 'Add to Cart',
    icon: 'pi pi-shopping-cart',
    badge: 'NEW',
    command: () => {
      toast.add({ severity: 'success', summary: 'Added to Cart', detail: 'Product added to cart', life: 3000 });
    }
  },
  {
    separator: true
  },
  {
    label: 'Share',
    icon: 'pi pi-share-alt',
    items: [
      {
        label: 'Facebook',
        icon: 'pi pi-facebook',
        command: () => {
          toast.add({ severity: 'info', summary: 'Shared', detail: 'Shared on Facebook', life: 3000 });
        }
      },
      {
        label: 'Twitter',
        icon: 'pi pi-twitter',
        command: () => {
          toast.add({ severity: 'info', summary: 'Shared', detail: 'Shared on Twitter', life: 3000 });
        }
      }
    ]
  },
  {
    label: 'Delete',
    icon: 'pi pi-trash',
    shortcut: 'Del',
    command: () => {
      toast.add({ severity: 'warn', summary: 'Delete Product', detail: 'Product would be deleted', life: 3000 });
    }
  }
]);

// User menu items with commands
const userItems = ref([
  {
    label: 'View Profile',
    icon: 'pi pi-user',
    command: () => {
      toast.add({ severity: 'info', summary: 'Profile', detail: `Viewing ${selectedUser.value?.name}'s profile`, life: 3000 });
    }
  },
  {
    label: 'Send Message',
    icon: 'pi pi-envelope',
    command: () => {
      toast.add({ severity: 'info', summary: 'Message', detail: `Sending message to ${selectedUser.value?.name}`, life: 3000 });
    }
  },
  {
    separator: true
  },
  {
    label: 'Admin',
    icon: 'pi pi-cog',
    items: [
      {
        label: 'Change Role',
        icon: 'pi pi-user-edit',
        command: () => {
          toast.add({ severity: 'warn', summary: 'Role Change', detail: `Changing ${selectedUser.value?.name}'s role`, life: 3000 });
        }
      },
      {
        label: 'Remove User',
        icon: 'pi pi-user-minus',
        command: () => {
          toast.add({ severity: 'error', summary: 'Remove User', detail: `${selectedUser.value?.name} would be removed`, life: 3000 });
        }
      }
    ]
  }
]);

// Router menu items
const routerItems = ref([
  {
    label: 'Home',
    icon: 'pi pi-home',
    route: '/'
  },
  {
    label: 'Components',
    icon: 'pi pi-desktop',
    route: '/kitchen-sink'
  },
  {
    separator: true
  },
  {
    label: 'Form Components',
    icon: 'pi pi-file-edit',
    items: [
      {
        label: 'Input Text',
        icon: 'pi pi-pencil',
        route: '/kitchen-sink/form/input-text'
      },
      {
        label: 'Button',
        icon: 'pi pi-play',
        route: '/kitchen-sink/form/button'
      }
    ]
  },
  {
    label: 'External',
    icon: 'pi pi-external-link',
    url: 'https://primevue.org',
    target: '_blank'
  }
]);

// Sample data
const products = ref([
  {
    id: '1',
    name: 'Bamboo Watch',
    category: 'Accessories',
    price: 65,
    image: 'bamboo-watch.jpg'
  },
  {
    id: '2',
    name: 'Black Watch',
    category: 'Accessories',
    price: 72,
    image: 'black-watch.jpg'
  },
  {
    id: '3',
    name: 'Blue Band',
    category: 'Fitness',
    price: 79,
    image: 'blue-band.jpg'
  }
]);

const users = ref([
  {
    id: 1,
    name: 'Amy Elsner',
    role: 'Admin',
    image: 'amyelsner.png'
  },
  {
    id: 2,
    name: 'Anna Fali',
    role: 'Member',
    image: 'annafali.png'
  },
  {
    id: 3,
    name: 'Asiya Javayant',
    role: 'Member',
    image: 'asiyajavayant.png'
  },
  {
    id: 4,
    name: 'Bernardo Dominic',
    role: 'Guest',
    image: 'bernardodominic.png'
  }
]);

const dataTableProducts = ref([
  { id: 1, name: 'Laptop', category: 'Electronics', price: 999, status: 'INSTOCK' },
  { id: 2, name: 'Mouse', category: 'Electronics', price: 25, status: 'LOWSTOCK' },
  { id: 3, name: 'Keyboard', category: 'Electronics', price: 75, status: 'OUTOFSTOCK' },
  { id: 4, name: 'Monitor', category: 'Electronics', price: 299, status: 'INSTOCK' },
  { id: 5, name: 'Headphones', category: 'Electronics', price: 199, status: 'INSTOCK' }
]);

// Event handlers
const onImageRightClick = (event) => {
  menu.value.show(event);
};

const onProductRightClick = (event, productId) => {
  selectedId.value = productId;
  productMenu.value.show(event);
};

const onUserRightClick = (event, user) => {
  selectedUser.value = user;
  userMenu.value.show(event);
};

const onRouterRightClick = (event) => {
  routerMenu.value.show(event);
};

const onDataTableRightClick = (event, product) => {
  selectedProduct.value = product;
  dataTableMenu.value.show(event);
};

const getBadge = (user) => {
  switch (user.role) {
    case 'Admin':
      return 'danger';
    case 'Member':
      return 'success';
    case 'Guest':
      return 'warn';
    default:
      return null;
  }
};

const getStatusSeverity = (status) => {
  switch (status) {
    case 'INSTOCK':
      return 'success';
    case 'LOWSTOCK':
      return 'warn';
    case 'OUTOFSTOCK':
      return 'danger';
    default:
      return null;
  }
};

// DataTable context menu items
const dataTableItems = ref([
  {
    label: 'View Details',
    icon: 'pi pi-search',
    command: () => {
      toast.add({ severity: 'info', summary: 'Product Details', detail: `Viewing ${selectedProduct.value?.name} details`, life: 3000 });
    }
  },
  {
    label: 'Edit',
    icon: 'pi pi-pencil',
    command: () => {
      toast.add({ severity: 'success', summary: 'Edit', detail: `Editing ${selectedProduct.value?.name}`, life: 3000 });
    }
  },
  {
    label: 'Duplicate',
    icon: 'pi pi-copy',
    command: () => {
      toast.add({ severity: 'info', summary: 'Duplicate', detail: `Duplicating ${selectedProduct.value?.name}`, life: 3000 });
    }
  },
  {
    separator: true
  },
  {
    label: 'Delete',
    icon: 'pi pi-trash',
    command: () => {
      toast.add({ severity: 'error', summary: 'Delete', detail: `${selectedProduct.value?.name} would be deleted`, life: 3000 });
    }
  }
]);
</script>

<template>
  <div class="p-6 space-y-8">
    <!-- Header -->
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-4">
        <Icon name="pi:th-list" size="32" class="text-primary-500" />
        <div class="flex flex-col">
          <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0">
            ContextMenu
          </h1>
          <p class="text-surface-600 dark:text-surface-300">
            ContextMenu displays an overlay menu to display actions related to an element.
          </p>
        </div>
      </div>
    </div>

    <!-- Basic Context Menu -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Basic Usage
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        ContextMenu requires a collection of menuitems as its model and the show method needs to be called explicitly using an event of the target.
      </p>
      
      <div class="card flex justify-center">
        <div class="flex flex-col items-center gap-4">
          <img 
            src="https://primefaces.org/cdn/primevue/images/nature/nature2.jpg" 
            alt="Nature" 
            class="w-full max-w-md rounded shadow-lg cursor-pointer" 
            @contextmenu="onImageRightClick"
            aria-haspopup="true" 
          />
          <p class="text-surface-500 dark:text-surface-400 text-sm">Right-click on the image to open context menu</p>
        </div>

        <ContextMenu ref="menu" :model="basicItems" />
      </div>
    </div>

    <!-- Global Context Menu -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Document Context Menu
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Setting global property attaches the context menu to the document.
      </p>
      
      <div class="card">
        <div class="bg-surface-50 dark:bg-surface-800 p-8 rounded-lg text-center">
          <p class="text-surface-700 dark:text-surface-200 text-lg">
            <i class="pi pi-info-circle mr-2" />
            Right-click anywhere in this area to view the global ContextMenu
          </p>
        </div>

        <ContextMenu global :model="globalItems" />
      </div>
    </div>

    <!-- Template Context Menu -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Custom Template
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        ContextMenu offers item customization with the item template that receives the menuitem instance from the model as a parameter.
      </p>
      
      <div class="card">
        <ul class="m-0 p-0 list-none border border-surface-200 dark:border-surface-700 rounded p-4 flex flex-col gap-2 w-full max-w-2xl">
          <li
            v-for="product in products"
            :key="product.id"
            :class="[
              'p-2 hover:bg-surface-100 dark:hover:bg-surface-800 rounded border border-transparent transition-all duration-200 cursor-pointer',
              { 'border-primary-500': selectedId === product.id }
            ]"
            @contextmenu="onProductRightClick($event, product.id)"
          >
            <div class="flex flex-wrap p-2 items-center gap-4">
              <img 
                class="w-16 shrink-0 rounded" 
                :src="`https://primefaces.org/cdn/primevue/images/product/${product.image}`" 
                :alt="product.name" 
              />
              <div class="flex-1 flex flex-col gap-1">
                <span class="font-bold text-surface-900 dark:text-surface-0">{{ product.name }}</span>
                <div class="flex items-center gap-2">
                  <i class="pi pi-tag text-sm text-surface-500" />
                  <span class="text-surface-600 dark:text-surface-400">{{ product.category }}</span>
                </div>
              </div>
              <span class="font-bold ml-8 text-surface-900 dark:text-surface-0">${{ product.price }}</span>
            </div>
          </li>
        </ul>

        <ContextMenu ref="productMenu" :model="productItems" @hide="selectedId = null">
          <template #item="{ item, props }">
            <a class="flex items-center" v-bind="props.action">
              <span :class="item.icon" />
              <span class="ml-2">{{ item.label }}</span>
              <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
              <span 
                v-if="item.shortcut" 
                class="ml-auto border border-surface-200 dark:border-surface-700 rounded bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300 text-xs px-2 py-1"
              >
                {{ item.shortcut }}
              </span>
              <i v-if="item.items" class="pi pi-angle-right ml-auto" />
            </a>
          </template>
        </ContextMenu>
      </div>
    </div>

    <!-- Command Context Menu -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Command Integration
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        The command property defines the callback to run when an item is activated by click or a key event.
      </p>
      
      <div class="card">
        <ul class="m-0 list-none border border-surface-200 dark:border-surface-700 rounded p-4 flex flex-col gap-2 w-full max-w-md">
          <li
            v-for="user in users"
            :key="user.id"
            :class="[
              'p-2 hover:bg-surface-50 dark:hover:bg-surface-800 rounded border border-transparent transition-all duration-200 flex items-center justify-between cursor-pointer',
              { 'border-primary-500': selectedUser?.id === user.id }
            ]"
            @contextmenu="onUserRightClick($event, user)"
          >
            <div class="flex flex-1 items-center gap-2">
              <img 
                :alt="user.name" 
                :src="`https://primefaces.org/cdn/primevue/images/avatar/${user.image}`" 
                class="w-8 h-8 rounded-full" 
              />
              <span class="font-bold text-surface-900 dark:text-surface-0">{{ user.name }}</span>
            </div>
            <Tag :value="user.role" :severity="getBadge(user)" />
          </li>
        </ul>

        <ContextMenu ref="userMenu" :model="userItems" @hide="selectedUser = null" />
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
      
      <div class="card flex justify-center">
        <div class="flex flex-col items-center gap-4">
          <div 
            class="inline-flex items-center justify-center border-2 border-primary-500 rounded w-16 h-16 cursor-pointer hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors" 
            @contextmenu="onRouterRightClick" 
            aria-haspopup="true"
          >
            <Icon name="lucide:menu" size="24" class="text-primary-500" />
          </div>
          <p class="text-surface-500 dark:text-surface-400 text-sm">Right-click on the icon for navigation menu</p>
        </div>

        <ContextMenu ref="routerMenu" :model="routerItems">
          <template #item="{ item, props }">
            <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
              <a :href="href" v-bind="props.action" @click="navigate" class="flex items-center">
                <span :class="item.icon" />
                <span class="ml-2">{{ item.label }}</span>
              </a>
            </router-link>
            <a v-else :href="item.url" :target="item.target" v-bind="props.action" class="flex items-center">
              <span :class="item.icon" />
              <span class="ml-2">{{ item.label }}</span>
            </a>
          </template>
        </ContextMenu>
      </div>
    </div>

    <!-- DataTable Integration -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        DataTable Integration
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        ContextMenu can be integrated with DataTable for row-specific actions.
      </p>
      
      <div class="card">
        <DataTable 
          :value="dataTableProducts" 
          selectionMode="single" 
          v-model:selection="selectedProduct"
          @row-contextmenu="onDataTableRightClick"
          contextMenu
          tableStyle="min-width: 50rem"
        >
          <Column field="name" header="Name" />
          <Column field="category" header="Category" />
          <Column field="price" header="Price">
            <template #body="{ data }">
              ${{ data.price }}
            </template>
          </Column>
          <Column field="status" header="Status">
            <template #body="{ data }">
              <Tag :value="data.status" :severity="getStatusSeverity(data.status)" />
            </template>
          </Column>
        </DataTable>

        <ContextMenu ref="dataTableMenu" :model="dataTableItems" />
        
        <div class="mt-4 text-sm text-surface-500 dark:text-surface-400">
          <i class="pi pi-info-circle mr-1" />
          Right-click on any table row to see context menu options
        </div>
      </div>
    </div>

    <!-- Multiple Context Menus -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Multiple Context Areas
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Different areas can have their own context menus with specific actions.
      </p>
      
      <div class="card">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- File Area -->
          <div 
            class="border border-surface-200 dark:border-surface-700 rounded-lg p-6 text-center cursor-pointer hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors"
            @contextmenu="$refs.fileMenu.show($event)"
          >
            <i class="pi pi-file text-4xl text-blue-500 mb-3" />
            <h3 class="text-lg font-semibold text-surface-900 dark:text-surface-0">File Area</h3>
            <p class="text-surface-600 dark:text-surface-400 text-sm">Right-click for file operations</p>
          </div>

          <!-- Folder Area -->
          <div 
            class="border border-surface-200 dark:border-surface-700 rounded-lg p-6 text-center cursor-pointer hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors"
            @contextmenu="$refs.folderMenu.show($event)"
          >
            <i class="pi pi-folder text-4xl text-yellow-500 mb-3" />
            <h3 class="text-lg font-semibold text-surface-900 dark:text-surface-0">Folder Area</h3>
            <p class="text-surface-600 dark:text-surface-400 text-sm">Right-click for folder operations</p>
          </div>

          <!-- Image Area -->
          <div 
            class="border border-surface-200 dark:border-surface-700 rounded-lg p-6 text-center cursor-pointer hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors"
            @contextmenu="$refs.imageMenu.show($event)"
          >
            <i class="pi pi-image text-4xl text-green-500 mb-3" />
            <h3 class="text-lg font-semibold text-surface-900 dark:text-surface-0">Image Area</h3>
            <p class="text-surface-600 dark:text-surface-400 text-sm">Right-click for image operations</p>
          </div>
        </div>

        <!-- File Context Menu -->
        <ContextMenu ref="fileMenu" :model="[
          { label: 'Open', icon: 'pi pi-folder-open', command: () => toast.add({ severity: 'info', summary: 'File', detail: 'Opening file...', life: 3000 }) },
          { label: 'Rename', icon: 'pi pi-pencil', command: () => toast.add({ severity: 'info', summary: 'File', detail: 'Renaming file...', life: 3000 }) },
          { label: 'Copy', icon: 'pi pi-copy', command: () => toast.add({ severity: 'info', summary: 'File', detail: 'Copying file...', life: 3000 }) },
          { separator: true },
          { label: 'Delete', icon: 'pi pi-trash', command: () => toast.add({ severity: 'warn', summary: 'File', detail: 'Deleting file...', life: 3000 }) }
        ]" />

        <!-- Folder Context Menu -->
        <ContextMenu ref="folderMenu" :model="[
          { label: 'Open', icon: 'pi pi-folder-open', command: () => toast.add({ severity: 'info', summary: 'Folder', detail: 'Opening folder...', life: 3000 }) },
          { label: 'New Folder', icon: 'pi pi-plus', command: () => toast.add({ severity: 'success', summary: 'Folder', detail: 'Creating new folder...', life: 3000 }) },
          { label: 'Properties', icon: 'pi pi-cog', command: () => toast.add({ severity: 'info', summary: 'Folder', detail: 'Viewing properties...', life: 3000 }) },
          { separator: true },
          { label: 'Delete', icon: 'pi pi-trash', command: () => toast.add({ severity: 'warn', summary: 'Folder', detail: 'Deleting folder...', life: 3000 }) }
        ]" />

        <!-- Image Context Menu -->
        <ContextMenu ref="imageMenu" :model="[
          { label: 'View', icon: 'pi pi-search', command: () => toast.add({ severity: 'info', summary: 'Image', detail: 'Viewing image...', life: 3000 }) },
          { label: 'Edit', icon: 'pi pi-pencil', command: () => toast.add({ severity: 'info', summary: 'Image', detail: 'Editing image...', life: 3000 }) },
          { label: 'Set as Wallpaper', icon: 'pi pi-image', command: () => toast.add({ severity: 'success', summary: 'Image', detail: 'Setting as wallpaper...', life: 3000 }) },
          { separator: true },
          { label: 'Share', icon: 'pi pi-share-alt', items: [
            { label: 'Email', icon: 'pi pi-envelope', command: () => toast.add({ severity: 'info', summary: 'Share', detail: 'Sharing via email...', life: 3000 }) },
            { label: 'Social', icon: 'pi pi-globe', command: () => toast.add({ severity: 'info', summary: 'Share', detail: 'Sharing on social media...', life: 3000 }) }
          ]}
        ]" />
      </div>
    </div>

    <Toast />
  </div>
</template>