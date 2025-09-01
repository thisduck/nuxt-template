<script setup lang="ts">
import { ref } from 'vue';

const sharePopover = ref();
const selectPopover = ref();
const dataTablePopover = ref();

const selectedMember = ref(null);
const selectedProduct = ref(null);

const members = ref([
  { name: 'Amy Elsner', email: 'amy@primetek.com.tr', role: 'Owner', image: 'amyelsner.png' },
  { name: 'Anna Fali', email: 'anna@primetek.com.tr', role: 'Member', image: 'annafali.png' },
  { name: 'Asiya Javayant', email: 'asiya@primetek.com.tr', role: 'Member', image: 'asiyajavayant.png' },
  { name: 'Bernardo Dominic', email: 'bernardo@primetek.com.tr', role: 'Guest', image: 'bernardodominic.png' },
  { name: 'Elwin Sharvill', email: 'elwin@primetek.com.tr', role: 'Member', image: 'elwinsharvill.png' },
]);

const products = ref([
  { id: '1000', code: 'f230fh0g3', name: 'Bamboo Watch', price: 65, category: 'Accessories', image: 'bamboo-watch.jpg', inventoryStatus: 'INSTOCK', rating: 4.3 },
  { id: '1001', code: 'nvklal433', name: 'Black Watch', price: 72, category: 'Accessories', image: 'black-watch.jpg', inventoryStatus: 'INSTOCK', rating: 4.1 },
  { id: '1002', code: 'zz21cz3c1', name: 'Blue Band', price: 79, category: 'Fitness', image: 'blue-band.jpg', inventoryStatus: 'LOWSTOCK', rating: 4.4 },
  { id: '1003', code: '244wgerg2', name: 'Blue T-Shirt', price: 29, category: 'Clothing', image: 'blue-t-shirt.jpg', inventoryStatus: 'INSTOCK', rating: 4.2 },
  { id: '1004', code: 'h456wer53', name: 'Bracelet', price: 15, category: 'Accessories', image: 'bracelet.jpg', inventoryStatus: 'INSTOCK', rating: 4.0 },
  { id: '1005', code: 'av2231fwg', name: 'Brown Purse', price: 120, category: 'Accessories', image: 'brown-purse.jpg', inventoryStatus: 'OUTOFSTOCK', rating: 4.5 },
  { id: '1006', code: 'bib36pfvm', name: 'Chakra Bracelet', price: 32, category: 'Accessories', image: 'chakra-bracelet.jpg', inventoryStatus: 'LOWSTOCK', rating: 3.9 },
  { id: '1007', code: 'mbvjkgip5', name: 'Galaxy Earrings', price: 34, category: 'Accessories', image: 'galaxy-earrings.jpg', inventoryStatus: 'INSTOCK', rating: 4.6 },
  { id: '1008', code: 'vbb124btr', name: 'Game Controller', price: 99, category: 'Electronics', image: 'game-controller.jpg', inventoryStatus: 'LOWSTOCK', rating: 4.1 },
  { id: '1009', code: 'cm230f032', name: 'Gaming Set', price: 299, category: 'Electronics', image: 'gaming-set.jpg', inventoryStatus: 'INSTOCK', rating: 4.7 },
]);

function toggleShare(event) {
  sharePopover.value.toggle(event);
}

function toggleSelect(event) {
  selectPopover.value.toggle(event);
}

function selectMember(member) {
  selectedMember.value = member;
  selectPopover.value.hide();
}

function displayProduct(event, product) {
  selectedProduct.value = product;
  dataTablePopover.value.toggle(event);
}

function hidePopover() {
  dataTablePopover.value.hide();
}

function getSeverity(product) {
  switch (product.inventoryStatus) {
    case 'INSTOCK':
      return 'success';
    case 'LOWSTOCK':
      return 'warn';
    case 'OUTOFSTOCK':
      return 'danger';
    default:
      return null;
  }
}

function copyToClipboard() {
  navigator.clipboard.writeText('https://primevue.org/12323ff26t2g243g423g234gg52hy25XADXAG3');
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
            Popover
          </h1>
          <p class="text-surface-600 dark:text-surface-300">
            Popover is a container component that can overlay other components on page.
          </p>
        </div>
      </div>
    </div>

    <!-- Basic Popover -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Basic Usage
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Popover is accessed via its ref and visibility is controlled using toggle, show and hide functions with an event of the target.
      </p>

      <div class="card flex justify-center">
        <Button type="button" icon="pi pi-share-alt" label="Share" @click="toggleShare" />

        <Popover ref="sharePopover">
          <div class="flex flex-col gap-4 w-[25rem]">
            <div>
              <span class="font-medium block mb-2 text-surface-900 dark:text-surface-0">Share this document</span>
              <InputGroup>
                <InputText value="https://primevue.org/12323ff26t2g243g423g234gg52hy25XADXAG3" readonly class="w-[25rem]" />
                <InputGroupAddon>
                  <i class="pi pi-copy cursor-pointer" @click="copyToClipboard" />
                </InputGroupAddon>
              </InputGroup>
            </div>
            <div>
              <span class="font-medium block mb-2 text-surface-900 dark:text-surface-0">Invite Member</span>
              <InputGroup>
                <InputText placeholder="Enter email address" />
                <Button label="Invite" icon="pi pi-users" />
              </InputGroup>
            </div>
            <div>
              <span class="font-medium block mb-2 text-surface-900 dark:text-surface-0">Team Members</span>
              <ul class="list-none p-0 m-0 flex flex-col gap-4">
                <li v-for="member in members" :key="member.name" class="flex items-center gap-2">
                  <img :src="`https://primefaces.org/cdn/primevue/images/avatar/${member.image}`" style="width: 32px" class="rounded-full">
                  <div>
                    <span class="font-medium text-surface-900 dark:text-surface-0">{{ member.name }}</span>
                    <div class="text-sm text-surface-500 dark:text-surface-400">
                      {{ member.email }}
                    </div>
                  </div>
                  <div class="flex items-center gap-2 text-surface-500 dark:text-surface-400 ml-auto text-sm">
                    <span>{{ member.role }}</span>
                    <i class="pi pi-angle-down" />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </Popover>
      </div>
    </div>

    <!-- Select Data Popover -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Data Selection
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        In this sample, data is retrieved from the content inside the popover.
      </p>

      <div class="card flex justify-center">
        <Button
          type="button"
          :label="selectedMember ? selectedMember.name : 'Select Member'"
          class="min-w-48"
          @click="toggleSelect"
        />

        <Popover ref="selectPopover">
          <div class="flex flex-col gap-4">
            <div>
              <span class="font-medium block mb-2 text-surface-900 dark:text-surface-0">Team Members</span>
              <ul class="list-none p-0 m-0 flex flex-col">
                <li
                  v-for="member in members"
                  :key="member.name"
                  class="flex items-center gap-2 px-2 py-3 hover:bg-surface-100 dark:hover:bg-surface-700 cursor-pointer rounded-lg transition-colors"
                  @click="selectMember(member)"
                >
                  <img :src="`https://primefaces.org/cdn/primevue/images/avatar/${member.image}`" style="width: 32px" class="rounded-full">
                  <div>
                    <span class="font-medium text-surface-900 dark:text-surface-0">{{ member.name }}</span>
                    <div class="text-sm text-surface-500 dark:text-surface-400">
                      {{ member.email }}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </Popover>
      </div>
    </div>

    <!-- DataTable with Popover -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        DataTable Integration
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Place the Popover outside of the data iteration components to avoid rendering it multiple times.
      </p>

      <div class="card">
        <DataTable :value="products" :rows="5" paginator table-style="min-width: 50rem">
          <Column field="id" header="Id" class="w-1/6" />
          <Column field="code" header="Code" class="w-1/6" />
          <Column field="name" header="Name" class="w-1/6" body-class="whitespace-nowrap" />
          <Column field="price" header="Price" sortable class="w-1/6">
            <template #body="slotProps">
              ${{ slotProps.data.price }}
            </template>
          </Column>
          <Column header="Image" class="w-1/6">
            <template #body="slotProps">
              <img
                :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.data.image}`"
                :alt="slotProps.data.image"
                class="w-16 shadow-sm rounded"
              >
            </template>
          </Column>
          <Column header="Details" class="w-1/6">
            <template #body="slotProps">
              <Button
                type="button"
                icon="pi pi-search"
                severity="secondary"
                rounded
                @click="displayProduct($event, slotProps.data)"
              />
            </template>
          </Column>
        </DataTable>

        <Popover ref="dataTablePopover">
          <div v-if="selectedProduct" class="rounded flex flex-col">
            <div class="flex justify-center rounded">
              <div class="relative mx-auto">
                <img
                  class="rounded w-44 sm:w-64"
                  :src="`https://primefaces.org/cdn/primevue/images/product/${selectedProduct.image}`"
                  :alt="selectedProduct.name"
                >
                <Tag
                  :value="selectedProduct.inventoryStatus"
                  :severity="getSeverity(selectedProduct)"
                  class="absolute dark:!bg-surface-900"
                  style="left: 4px; top: 4px"
                />
              </div>
            </div>
            <div class="pt-4">
              <div class="flex flex-row justify-between items-start gap-2 mb-4">
                <div>
                  <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{ selectedProduct.category }}</span>
                  <div class="text-lg font-medium mt-1 text-surface-900 dark:text-surface-0">
                    {{ selectedProduct.name }}
                  </div>
                </div>
                <div class="bg-surface-100 dark:bg-surface-700 p-1 rounded-full">
                  <div class="bg-surface-0 dark:bg-surface-800 flex items-center gap-2 justify-center py-1 px-2 rounded-full shadow-sm">
                    <span class="text-surface-900 dark:text-surface-0 font-medium text-sm">{{ selectedProduct.rating }}</span>
                    <i class="pi pi-star-fill text-yellow-500" />
                  </div>
                </div>
              </div>
              <div class="flex gap-2">
                <Button
                  icon="pi pi-shopping-cart"
                  :label="`Buy Now | $${selectedProduct.price}`"
                  :disabled="selectedProduct.inventoryStatus === 'OUTOFSTOCK'"
                  class="flex-auto whitespace-nowrap"
                  @click="hidePopover"
                />
                <Button icon="pi pi-heart" severity="secondary" @click="hidePopover" />
              </div>
            </div>
          </div>
        </Popover>
      </div>
    </div>

    <!-- Context Menu Style Popover -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Context Menu Style
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Popover can be used as a context menu with action items.
      </p>

      <div class="card flex justify-center">
        <Button type="button" icon="pi pi-ellipsis-v" label="Actions" @click="$refs.actionsPopover.toggle($event)" />

        <Popover ref="actionsPopover">
          <div class="flex flex-col gap-2 w-40">
            <Button icon="pi pi-pencil" label="Edit" text class="justify-start" />
            <Button icon="pi pi-copy" label="Duplicate" text class="justify-start" />
            <Button icon="pi pi-share-alt" label="Share" text class="justify-start" />
            <Divider />
            <Button icon="pi pi-trash" label="Delete" text severity="danger" class="justify-start" />
          </div>
        </Popover>
      </div>
    </div>

    <!-- Form Popover -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Form Integration
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Popover can contain interactive forms and input elements.
      </p>

      <div class="card flex justify-center">
        <Button type="button" icon="pi pi-user-plus" label="Add Contact" @click="$refs.formPopover.toggle($event)" />

        <Popover ref="formPopover">
          <div class="flex flex-col gap-4 w-80">
            <h3 class="text-lg font-semibold text-surface-900 dark:text-surface-0 mb-2">
              Add New Contact
            </h3>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium mb-2 text-surface-900 dark:text-surface-0">First Name</label>
                <InputText placeholder="John" class="w-full" />
              </div>
              <div>
                <label class="block text-sm font-medium mb-2 text-surface-900 dark:text-surface-0">Last Name</label>
                <InputText placeholder="Doe" class="w-full" />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium mb-2 text-surface-900 dark:text-surface-0">Email</label>
              <InputText placeholder="john.doe@example.com" class="w-full" />
            </div>

            <div>
              <label class="block text-sm font-medium mb-2 text-surface-900 dark:text-surface-0">Role</label>
              <Select :options="['Member', 'Admin', 'Guest']" placeholder="Select Role" class="w-full" />
            </div>

            <div class="flex gap-2 pt-2">
              <Button label="Add Contact" icon="pi pi-check" class="flex-1" @click="$refs.formPopover.hide()" />
              <Button label="Cancel" icon="pi pi-times" severity="secondary" class="flex-1" @click="$refs.formPopover.hide()" />
            </div>
          </div>
        </Popover>
      </div>
    </div>

    <!-- Notification Style Popover -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Notification Center
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Use Popover to create notification centers and activity feeds.
      </p>

      <div class="card flex justify-center">
        <Button type="button" class="relative" @click="$refs.notificationPopover.toggle($event)">
          <i class="pi pi-bell mr-2" />
          Notifications
          <Badge value="3" severity="danger" class="absolute -top-2 -right-2" />
        </Button>

        <Popover ref="notificationPopover">
          <div class="flex flex-col gap-4 w-80">
            <div class="flex items-center justify-between pb-2 border-b border-surface-200 dark:border-surface-700">
              <h3 class="text-lg font-semibold text-surface-900 dark:text-surface-0">
                Notifications
              </h3>
              <Button icon="pi pi-cog" text size="small" />
            </div>

            <div class="flex flex-col gap-3 max-h-64 overflow-auto">
              <div class="flex gap-3 p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                <Avatar icon="pi pi-user-plus" class="bg-primary-500 text-white" size="small" />
                <div class="flex-1">
                  <div class="text-sm font-medium text-surface-900 dark:text-surface-0">
                    New team member
                  </div>
                  <div class="text-xs text-surface-600 dark:text-surface-400 mt-1">
                    Amy Elsner joined your workspace
                  </div>
                  <div class="text-xs text-surface-500 dark:text-surface-400 mt-2">
                    2 minutes ago
                  </div>
                </div>
              </div>

              <div class="flex gap-3 p-3 hover:bg-surface-50 dark:hover:bg-surface-800 rounded-lg">
                <Avatar icon="pi pi-file" class="bg-green-500 text-white" size="small" />
                <div class="flex-1">
                  <div class="text-sm font-medium text-surface-900 dark:text-surface-0">
                    Document shared
                  </div>
                  <div class="text-xs text-surface-600 dark:text-surface-400 mt-1">
                    Project proposal.pdf was shared with you
                  </div>
                  <div class="text-xs text-surface-500 dark:text-surface-400 mt-2">
                    1 hour ago
                  </div>
                </div>
              </div>

              <div class="flex gap-3 p-3 hover:bg-surface-50 dark:hover:bg-surface-800 rounded-lg">
                <Avatar icon="pi pi-calendar" class="bg-blue-500 text-white" size="small" />
                <div class="flex-1">
                  <div class="text-sm font-medium text-surface-900 dark:text-surface-0">
                    Meeting reminder
                  </div>
                  <div class="text-xs text-surface-600 dark:text-surface-400 mt-1">
                    Team standup in 30 minutes
                  </div>
                  <div class="text-xs text-surface-500 dark:text-surface-400 mt-2">
                    3 hours ago
                  </div>
                </div>
              </div>
            </div>

            <div class="pt-2 border-t border-surface-200 dark:border-surface-700">
              <Button label="View All Notifications" text class="w-full justify-center" />
            </div>
          </div>
        </Popover>
      </div>
    </div>
  </div>
</template>
