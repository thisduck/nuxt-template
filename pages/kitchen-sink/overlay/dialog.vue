<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
import { ref } from 'vue';

const toast = useToast();

// Basic dialog
const basicVisible = ref(false);

// Template dialog
const templateVisible = ref(false);

// Position dialog
const positionVisible = ref(false);
const position = ref('center');

// Maximizable dialog
const maximizableVisible = ref(false);

// Long content dialog
const longContentVisible = ref(false);

// Non-modal dialog
const nonModalVisible = ref(false);

// Responsive dialog
const responsiveVisible = ref(false);

// Headless dialog
const headlessVisible = ref(false);

// Custom dialogs
const settingsVisible = ref(false);
const imageGalleryVisible = ref(false);
const _confirmationVisible = ref(false);
const wizardVisible = ref(false);
const wizardStep = ref(1);

// Form data
const username = ref('');
const email = ref('');
const _password = ref('');
const firstName = ref('');
const lastName = ref('');
const phone = ref('');
const address = ref('');
const company = ref('');

function openPosition(pos: string) {
  position.value = pos;
  positionVisible.value = true;
}

function saveProfile() {
  toast.add({ severity: 'success', summary: 'Success', detail: 'Profile updated successfully', life: 3000 });
  basicVisible.value = false;
  templateVisible.value = false;
}

function nextStep() {
  if (wizardStep.value < 3) {
    wizardStep.value++;
  } else {
    toast.add({ severity: 'success', summary: 'Complete', detail: 'Wizard completed successfully', life: 3000 });
    wizardVisible.value = false;
    wizardStep.value = 1;
  }
}

function previousStep() {
  if (wizardStep.value > 1) {
    wizardStep.value--;
  }
}

function resetForm() {
  firstName.value = '';
  lastName.value = '';
  email.value = '';
  phone.value = '';
  address.value = '';
  company.value = '';
  wizardStep.value = 1;
}
</script>

<template>
  <div class="p-6 space-y-8">
    <!-- Header -->
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-4">
        <Icon name="pi:window-maximize" size="32" class="text-primary-500" />
        <div class="flex flex-col">
          <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0">
            Dialog
          </h1>
          <p class="text-surface-600 dark:text-surface-300">
            Dialog is a container to display content in an overlay window.
          </p>
        </div>
      </div>
    </div>

    <!-- Toast for feedback -->
    <Toast />

    <!-- Basic Dialog -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Basic Usage
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Dialog is used as a container and visibility is controlled with a binding to visible property.
      </p>

      <div class="card">
        <Button label="Show Basic Dialog" @click="basicVisible = true" />

        <Dialog v-model:visible="basicVisible" modal header="Edit Profile" :style="{ width: '25rem' }">
          <span class="text-surface-500 dark:text-surface-400 block mb-8">Update your information.</span>
          <div class="flex items-center gap-4 mb-4">
            <label for="username" class="font-semibold w-24">Username</label>
            <InputText id="username" v-model="username" class="flex-auto" autocomplete="off" />
          </div>
          <div class="flex items-center gap-4 mb-8">
            <label for="email" class="font-semibold w-24">Email</label>
            <InputText id="email" v-model="email" class="flex-auto" autocomplete="off" />
          </div>
          <div class="flex justify-end gap-2">
            <Button type="button" label="Cancel" severity="secondary" @click="basicVisible = false" />
            <Button type="button" label="Save" @click="saveProfile" />
          </div>
        </Dialog>
      </div>
    </div>

    <!-- Template Dialog -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Custom Template
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Header and Footer sections allow customization via templating.
      </p>

      <div class="card">
        <Button label="Show Template Dialog" @click="templateVisible = true" />

        <Dialog v-model:visible="templateVisible" modal header="Edit Profile" :style="{ width: '25rem' }">
          <template #header>
            <div class="inline-flex items-center justify-center gap-2">
              <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
              <span class="font-bold whitespace-nowrap">Amy Elsner</span>
            </div>
          </template>
          <span class="text-surface-500 dark:text-surface-400 block mb-8">Update your information.</span>
          <div class="flex items-center gap-4 mb-4">
            <label for="username2" class="font-semibold w-24">Username</label>
            <InputText id="username2" v-model="username" class="flex-auto" autocomplete="off" />
          </div>
          <div class="flex items-center gap-4 mb-2">
            <label for="email2" class="font-semibold w-24">Email</label>
            <InputText id="email2" v-model="email" class="flex-auto" autocomplete="off" />
          </div>
          <template #footer>
            <Button label="Cancel" text severity="secondary" autofocus @click="templateVisible = false" />
            <Button label="Save" outlined severity="secondary" autofocus @click="saveProfile" />
          </template>
        </Dialog>
      </div>
    </div>

    <!-- Position Dialog -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Position Options
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        The position property defines the location relative to the screen.
      </p>

      <div class="card">
        <div class="flex flex-wrap justify-center gap-2 mb-2">
          <Button label="Left" icon="pi pi-arrow-right" severity="secondary" style="min-width: 10rem" @click="openPosition('left')" />
          <Button label="Right" icon="pi pi-arrow-left" severity="secondary" style="min-width: 10rem" @click="openPosition('right')" />
        </div>
        <div class="flex flex-wrap justify-center gap-2 mb-2">
          <Button label="TopLeft" icon="pi pi-arrow-down-right" severity="secondary" style="min-width: 10rem" @click="openPosition('topleft')" />
          <Button label="Top" icon="pi pi-arrow-down" severity="secondary" style="min-width: 10rem" @click="openPosition('top')" />
          <Button label="TopRight" icon="pi pi-arrow-down-left" severity="secondary" style="min-width: 10rem" @click="openPosition('topright')" />
        </div>
        <div class="flex flex-wrap justify-center gap-2">
          <Button label="BottomLeft" icon="pi pi-arrow-up-right" severity="secondary" style="min-width: 10rem" @click="openPosition('bottomleft')" />
          <Button label="Bottom" icon="pi pi-arrow-up" severity="secondary" style="min-width: 10rem" @click="openPosition('bottom')" />
          <Button label="BottomRight" icon="pi pi-arrow-up-left" severity="secondary" style="min-width: 10rem" @click="openPosition('bottomright')" />
        </div>

        <Dialog v-model:visible="positionVisible" header="Edit Profile" :style="{ width: '25rem' }" :position="position" :modal="true" :draggable="false">
          <span class="text-surface-500 dark:text-surface-400 block mb-8">Position: {{ position }}</span>
          <div class="flex items-center gap-4 mb-4">
            <label for="username3" class="font-semibold w-24">Username</label>
            <InputText id="username3" class="flex-auto" autocomplete="off" />
          </div>
          <div class="flex items-center gap-4 mb-8">
            <label for="email3" class="font-semibold w-24">Email</label>
            <InputText id="email3" class="flex-auto" autocomplete="off" />
          </div>
          <div class="flex justify-end gap-2">
            <Button type="button" label="Cancel" severity="secondary" @click="positionVisible = false" />
            <Button type="button" label="Save" @click="positionVisible = false" />
          </div>
        </Dialog>
      </div>
    </div>

    <!-- Maximizable Dialog -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Maximizable Dialog
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Adding maximizable property enables the full screen mode.
      </p>

      <div class="card">
        <Button label="Show Maximizable Dialog" @click="maximizableVisible = true" />

        <Dialog v-model:visible="maximizableVisible" maximizable modal header="Document Viewer" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
          <p class="m-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <div class="mt-4">
            <h4 class="text-lg font-semibold mb-2">
              Features
            </h4>
            <ul class="list-disc list-inside space-y-1 text-surface-600 dark:text-surface-300">
              <li>Maximize to fullscreen for better viewing</li>
              <li>Responsive design with breakpoints</li>
              <li>Modal overlay with focus management</li>
              <li>Keyboard navigation support</li>
            </ul>
          </div>
        </Dialog>
      </div>
    </div>

    <!-- Long Content Dialog -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Long Content Dialog
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        When content exceeds viewport, Dialog automatically becomes scrollable.
      </p>

      <div class="card">
        <Button label="Show Long Content Dialog" @click="longContentVisible = true" />

        <Dialog v-model:visible="longContentVisible" modal header="Terms and Conditions" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
          <p class="mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p class="mb-8">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
            ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,
            adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
          </p>
          <p class="mb-8">
            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa
            qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod
            maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.
          </p>
          <p class="mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p class="mb-8">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
            ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,
            adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
          </p>
          <p>
            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa
            qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod
            maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.
          </p>
        </Dialog>
      </div>
    </div>

    <!-- Non-Modal Dialog -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Non-Modal Dialog
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Mask layer behind the Dialog is configured with the modal property. By default, no modal layer is added.
      </p>

      <div class="card">
        <Button label="Show Non-Modal Dialog" @click="nonModalVisible = true" />

        <Dialog v-model:visible="nonModalVisible" header="Settings" :style="{ width: '25rem' }">
          <span class="text-surface-500 dark:text-surface-400 block mb-8">Configure your preferences.</span>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <label class="font-semibold">Dark Mode</label>
              <ToggleSwitch />
            </div>
            <div class="flex items-center justify-between">
              <label class="font-semibold">Notifications</label>
              <ToggleSwitch />
            </div>
            <div class="flex items-center justify-between">
              <label class="font-semibold">Auto-save</label>
              <ToggleSwitch />
            </div>
          </div>
          <div class="flex justify-end gap-2 mt-8">
            <Button type="button" label="Close" @click="nonModalVisible = false" />
          </div>
        </Dialog>
      </div>
    </div>

    <!-- Responsive Dialog -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Responsive Dialog
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Dialog width can be adjusted per screen size with the breakpoints option.
      </p>

      <div class="card">
        <Button label="Show Responsive Dialog" @click="responsiveVisible = true" />

        <Dialog v-model:visible="responsiveVisible" modal header="Responsive Content" :style="{ width: '50vw' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
          <p class="m-0">
            This dialog adapts its width based on screen size. On desktop it uses 50% viewport width, on tablets 75%, and on mobile devices 90%.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <div class="mt-4 p-4 bg-surface-50 dark:bg-surface-800 rounded">
            <h4 class="font-semibold mb-2">
              Breakpoints:
            </h4>
            <ul class="text-sm text-surface-600 dark:text-surface-300 space-y-1">
              <li>• Desktop (1200px+): 50vw</li>
              <li>• Tablet (576px-1199px): 75vw</li>
              <li>• Mobile (575px and below): 90vw</li>
            </ul>
          </div>
        </Dialog>
      </div>
    </div>

    <!-- Headless Dialog -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Headless Dialog
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Headless mode allows implementing entire UI instead of the default elements.
      </p>

      <div class="card">
        <Button label="Login" icon="pi pi-user" @click="headlessVisible = true" />

        <Dialog v-model:visible="headlessVisible" pt:root:class="!border-0 !bg-transparent" pt:mask:class="backdrop-blur-sm">
          <template #container="{ closeCallback }">
            <div class="flex flex-col px-8 py-8 gap-6 rounded-2xl" style="background-image: radial-gradient(circle at left top, var(--p-primary-400), var(--p-primary-700))">
              <Icon name="lucide:bolt" size="40" class="block mx-auto text-primary-200" />

              <div class="inline-flex flex-col gap-2">
                <label for="username4" class="text-primary-50 font-semibold">Username</label>
                <InputText id="username4" class="!bg-white/20 !border-0 !p-4 !text-primary-50 w-80" />
              </div>
              <div class="inline-flex flex-col gap-2">
                <label for="password4" class="text-primary-50 font-semibold">Password</label>
                <InputText id="password4" class="!bg-white/20 !border-0 !p-4 !text-primary-50 w-80" type="password" />
              </div>
              <div class="flex items-center gap-4">
                <Button label="Cancel" text class="!p-4 w-full !text-primary-50 !border !border-white/30 hover:!bg-white/10" @click="closeCallback" />
                <Button label="Sign-In" text class="!p-4 w-full !text-primary-50 !border !border-white/30 hover:!bg-white/10" @click="closeCallback" />
              </div>
            </div>
          </template>
        </Dialog>
      </div>
    </div>

    <!-- Advanced Examples -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Advanced Examples
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Real-world dialog implementations for various use cases.
      </p>

      <div class="card">
        <div class="flex flex-wrap gap-2">
          <Button label="Settings Dialog" icon="pi pi-cog" @click="settingsVisible = true" />
          <Button label="Image Gallery" icon="pi pi-images" severity="secondary" @click="imageGalleryVisible = true" />
          <Button label="Multi-Step Wizard" icon="pi pi-forward" severity="info" @click="wizardVisible = true" />
        </div>

        <!-- Advanced Settings Dialog -->
        <Dialog v-model:visible="settingsVisible" modal header="Application Settings" :style="{ width: '40rem' }" :breakpoints="{ '960px': '75vw', '575px': '90vw' }">
          <Tabs value="general">
            <TabList>
              <Tab value="general">
                General
              </Tab>
              <Tab value="appearance">
                Appearance
              </Tab>
              <Tab value="privacy">
                Privacy
              </Tab>
              <Tab value="notifications">
                Notifications
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel value="general">
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium mb-2">Application Language</label>
                    <Select :options="['English', 'Spanish', 'French', 'German']" placeholder="Select Language" fluid />
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-2">Default View</label>
                    <Select :options="['List', 'Grid', 'Card']" placeholder="Select View" fluid />
                  </div>
                  <div class="flex items-center justify-between">
                    <label class="font-medium">Auto-save enabled</label>
                    <ToggleSwitch />
                  </div>
                </div>
              </TabPanel>
              <TabPanel value="appearance">
                <div class="space-y-4">
                  <div class="flex items-center justify-between">
                    <label class="font-medium">Dark mode</label>
                    <ToggleSwitch />
                  </div>
                  <div class="flex items-center justify-between">
                    <label class="font-medium">Compact view</label>
                    <ToggleSwitch />
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-2">Theme Color</label>
                    <div class="flex gap-2">
                      <div class="w-8 h-8 rounded bg-blue-500 cursor-pointer border-2 border-blue-600" />
                      <div class="w-8 h-8 rounded bg-green-500 cursor-pointer" />
                      <div class="w-8 h-8 rounded bg-purple-500 cursor-pointer" />
                      <div class="w-8 h-8 rounded bg-red-500 cursor-pointer" />
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value="privacy">
                <div class="space-y-4">
                  <div class="flex items-center justify-between">
                    <label class="font-medium">Share usage data</label>
                    <ToggleSwitch />
                  </div>
                  <div class="flex items-center justify-between">
                    <label class="font-medium">Allow cookies</label>
                    <ToggleSwitch />
                  </div>
                  <div class="flex items-center justify-between">
                    <label class="font-medium">Location services</label>
                    <ToggleSwitch />
                  </div>
                </div>
              </TabPanel>
              <TabPanel value="notifications">
                <div class="space-y-4">
                  <div class="flex items-center justify-between">
                    <label class="font-medium">Push notifications</label>
                    <ToggleSwitch />
                  </div>
                  <div class="flex items-center justify-between">
                    <label class="font-medium">Email notifications</label>
                    <ToggleSwitch />
                  </div>
                  <div class="flex items-center justify-between">
                    <label class="font-medium">Sound alerts</label>
                    <ToggleSwitch />
                  </div>
                </div>
              </TabPanel>
            </TabPanels>
          </Tabs>
          <template #footer>
            <Button label="Reset to Defaults" severity="secondary" text @click="toast.add({ severity: 'info', summary: 'Reset', detail: 'Settings reset to defaults', life: 3000 })" />
            <Button label="Apply Changes" @click="settingsVisible = false; toast.add({ severity: 'success', summary: 'Success', detail: 'Settings saved successfully', life: 3000 })" />
          </template>
        </Dialog>

        <!-- Image Gallery Dialog -->
        <Dialog v-model:visible="imageGalleryVisible" modal header="Image Gallery" maximizable :style="{ width: '60rem' }" :breakpoints="{ '960px': '90vw' }">
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div v-for="i in 9" :key="i" class="aspect-square bg-surface-100 dark:bg-surface-800 rounded-lg flex items-center justify-center">
              <Icon name="pi:image" class="text-4xl text-surface-400" />
            </div>
          </div>
          <template #footer>
            <Button label="Upload New" icon="pi pi-upload" severity="secondary" />
            <Button label="Close" @click="imageGalleryVisible = false" />
          </template>
        </Dialog>

        <!-- Multi-Step Wizard Dialog -->
        <Dialog v-model:visible="wizardVisible" modal :header="`Wizard - Step ${wizardStep} of 3`" :style="{ width: '35rem' }" :closable="false">
          <!-- Step 1: Personal Info -->
          <div v-if="wizardStep === 1" class="space-y-4">
            <h3 class="text-lg font-semibold mb-4">
              Personal Information
            </h3>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium mb-2">First Name</label>
                <InputText v-model="firstName" placeholder="Enter first name" fluid />
              </div>
              <div>
                <label class="block text-sm font-medium mb-2">Last Name</label>
                <InputText v-model="lastName" placeholder="Enter last name" fluid />
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">Email</label>
              <InputText v-model="email" type="email" placeholder="Enter email" fluid />
            </div>
          </div>

          <!-- Step 2: Contact Info -->
          <div v-if="wizardStep === 2" class="space-y-4">
            <h3 class="text-lg font-semibold mb-4">
              Contact Information
            </h3>
            <div>
              <label class="block text-sm font-medium mb-2">Phone</label>
              <InputText v-model="phone" placeholder="Enter phone number" fluid />
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">Address</label>
              <Textarea v-model="address" rows="3" placeholder="Enter address" fluid />
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">Company</label>
              <InputText v-model="company" placeholder="Enter company name" fluid />
            </div>
          </div>

          <!-- Step 3: Review -->
          <div v-if="wizardStep === 3" class="space-y-4">
            <h3 class="text-lg font-semibold mb-4">
              Review Information
            </h3>
            <div class="bg-surface-50 dark:bg-surface-800 p-4 rounded space-y-2">
              <div><strong>Name:</strong> {{ firstName }} {{ lastName }}</div>
              <div><strong>Email:</strong> {{ email }}</div>
              <div><strong>Phone:</strong> {{ phone }}</div>
              <div><strong>Address:</strong> {{ address }}</div>
              <div><strong>Company:</strong> {{ company }}</div>
            </div>
          </div>

          <template #footer>
            <div class="flex justify-between w-full">
              <div>
                <Button v-if="wizardStep > 1" label="Previous" icon="pi pi-angle-left" severity="secondary" @click="previousStep" />
              </div>
              <div class="flex gap-2">
                <Button label="Cancel" severity="secondary" text @click="wizardVisible = false; resetForm()" />
                <Button :label="wizardStep === 3 ? 'Complete' : 'Next'" :icon="wizardStep === 3 ? 'pi pi-check' : 'pi pi-angle-right'" icon-pos="right" @click="nextStep" />
              </div>
            </div>
          </template>
        </Dialog>
      </div>
    </div>
  </div>
</template>
