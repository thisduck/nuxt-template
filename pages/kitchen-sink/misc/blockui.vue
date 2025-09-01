<script setup lang="ts">
// Basic blocking states
const basicBlocked = ref(false);
const documentBlocked = ref(false);
const panelBlocked = ref(false);
const formBlocked = ref(false);
const imageBlocked = ref(false);

// Auto timeout demo
const autoBlocked = ref(false);

// Loading simulation
const loadingBlocked = ref(false);
const progressBlocked = ref(false);
const progress = ref(0);

// Multiple elements
const multiBlocked = ref({
  panel1: false,
  panel2: false,
  panel3: false
});

// Form data for demo
const formData = ref({
  name: '',
  email: '',
  message: ''
});

// Simulate a long-running operation
const simulateLoading = () => {
  loadingBlocked.value = true;
  setTimeout(() => {
    loadingBlocked.value = false;
  }, 3000);
};

// Simulate progress
const simulateProgress = () => {
  progressBlocked.value = true;
  progress.value = 0;
  
  const interval = setInterval(() => {
    progress.value += 10;
    if (progress.value >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        progressBlocked.value = false;
        progress.value = 0;
      }, 500);
    }
  }, 200);
};

// Auto timeout blocking
const blockWithTimeout = () => {
  autoBlocked.value = true;
  setTimeout(() => {
    autoBlocked.value = false;
  }, 2000);
};

// Form submission simulation
const submitForm = () => {
  formBlocked.value = true;
  setTimeout(() => {
    formBlocked.value = false;
    // Reset form
    formData.value = { name: '', email: '', message: '' };
  }, 2000);
};

// Block all panels
const blockAllPanels = () => {
  multiBlocked.value.panel1 = true;
  multiBlocked.value.panel2 = true;
  multiBlocked.value.panel3 = true;
};

// Unblock all panels
const unblockAllPanels = () => {
  multiBlocked.value.panel1 = false;
  multiBlocked.value.panel2 = false;
  multiBlocked.value.panel3 = false;
};

// Image blocking demo
const blockImage = () => {
  imageBlocked.value = true;
  setTimeout(() => {
    imageBlocked.value = false;
  }, 3000);
};
</script>

<template>
  <div class="p-6 space-y-8">
    <!-- Document BlockUI for full screen blocking -->
    <BlockUI :blocked="documentBlocked" fullScreen />
    
    <!-- Header -->
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-4">
        <Icon name="pi:lock" size="32" class="text-primary-500" />
        <div class="flex flex-col">
          <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0">
            BlockUI
          </h1>
          <p class="text-surface-600 dark:text-surface-300">
            BlockUI can either block other components or the whole page.
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
        The element to block should be placed as a child of BlockUI and blocked property is required to control the state.
      </p>
      
      <div class="card">
        <div class="flex gap-2 mb-4">
          <Button label="Block" @click="basicBlocked = true" />
          <Button label="Unblock" @click="basicBlocked = false" severity="secondary" />
        </div>
        
        <BlockUI :blocked="basicBlocked">
          <Panel header="Basic Panel">
            <p class="m-0">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </Panel>
        </BlockUI>
      </div>
    </div>

    <!-- Document Blocking -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Document Blocking
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Enabling fullScreen property blocks the entire document/page.
      </p>
      
      <div class="card">
        <div class="flex gap-2 mb-4">
          <Button label="Block Document" @click="documentBlocked = true" severity="warn" />
          <Button label="Unblock Document" @click="documentBlocked = false" severity="secondary" />
        </div>
        
        <div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4">
          <div class="flex items-center gap-2">
            <Icon name="pi:exclamation-triangle" class="text-yellow-600 dark:text-yellow-400" />
            <p class="text-yellow-800 dark:text-yellow-200 text-sm m-0">
              Click "Block Document" to see the full screen overlay in action. The entire page will be blocked until you click "Unblock Document".
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading Simulation -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Loading Simulation
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Common use case for blocking UI during loading operations.
      </p>
      
      <div class="card space-y-6">
        <!-- Simple Loading -->
        <div>
          <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">Simple Loading</h3>
          <Button label="Simulate Loading (3s)" @click="simulateLoading" :disabled="loadingBlocked" class="mb-4" />
          
          <BlockUI :blocked="loadingBlocked">
            <Panel header="Data Panel">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="border border-surface-200 dark:border-surface-700 rounded p-3">
                  <h4 class="font-semibold mb-2">Sales Data</h4>
                  <p class="text-sm text-surface-600 dark:text-surface-300 m-0">Revenue: $125,000</p>
                </div>
                <div class="border border-surface-200 dark:border-surface-700 rounded p-3">
                  <h4 class="font-semibold mb-2">User Analytics</h4>
                  <p class="text-sm text-surface-600 dark:text-surface-300 m-0">Active Users: 1,234</p>
                </div>
              </div>
            </Panel>
          </BlockUI>
        </div>

        <!-- Progress Loading -->
        <div>
          <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">Progress Loading</h3>
          <Button label="Simulate Progress" @click="simulateProgress" :disabled="progressBlocked" class="mb-4" />
          
          <BlockUI :blocked="progressBlocked">
            <template #default>
              <div class="flex flex-col items-center justify-center gap-3" style="min-height: 200px">
                <ProgressBar :value="progress" :showValue="true" style="width: 200px" />
                <span class="text-sm text-surface-600 dark:text-surface-300">Processing... {{ progress }}%</span>
              </div>
            </template>
          </BlockUI>
        </div>
      </div>
    </div>

    <!-- Auto Timeout -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Auto Timeout
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        BlockUI that automatically unblocks after a specified time.
      </p>
      
      <div class="card">
        <Button label="Block for 2 seconds" @click="blockWithTimeout" :disabled="autoBlocked" class="mb-4" />
        
        <BlockUI :blocked="autoBlocked">
          <Panel header="Auto Timeout Panel">
            <p class="m-0">
              This panel will be blocked for exactly 2 seconds and then automatically unblock.
              Perfect for showing brief loading states or temporary operations.
            </p>
          </Panel>
        </BlockUI>
      </div>
    </div>

    <!-- Form Blocking -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Form Blocking
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Block form during submission to prevent duplicate submissions.
      </p>
      
      <div class="card">
        <BlockUI :blocked="formBlocked">
          <form @submit.prevent="submitForm" class="space-y-4">
            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium text-surface-700 dark:text-surface-300">Name</label>
              <InputText v-model="formData.name" placeholder="Enter your name" />
            </div>
            
            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium text-surface-700 dark:text-surface-300">Email</label>
              <InputText v-model="formData.email" type="email" placeholder="Enter your email" />
            </div>
            
            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium text-surface-700 dark:text-surface-300">Message</label>
              <Textarea v-model="formData.message" placeholder="Enter your message" rows="4" />
            </div>
            
            <Button type="submit" label="Submit Form" :disabled="formBlocked" />
          </form>
        </BlockUI>
      </div>
    </div>

    <!-- Multiple Elements -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Multiple Elements
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Block multiple elements independently or together.
      </p>
      
      <div class="card">
        <div class="flex gap-2 mb-4 flex-wrap">
          <Button label="Block All" @click="blockAllPanels" size="small" />
          <Button label="Unblock All" @click="unblockAllPanels" severity="secondary" size="small" />
          <Button label="Block Panel 1" @click="multiBlocked.panel1 = !multiBlocked.panel1" severity="info" size="small" />
          <Button label="Block Panel 2" @click="multiBlocked.panel2 = !multiBlocked.panel2" severity="success" size="small" />
          <Button label="Block Panel 3" @click="multiBlocked.panel3 = !multiBlocked.panel3" severity="warn" size="small" />
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <BlockUI :blocked="multiBlocked.panel1">
            <Panel header="Panel 1">
              <p class="text-sm m-0">First panel content that can be blocked independently.</p>
            </Panel>
          </BlockUI>
          
          <BlockUI :blocked="multiBlocked.panel2">
            <Panel header="Panel 2">
              <p class="text-sm m-0">Second panel content that can be blocked independently.</p>
            </Panel>
          </BlockUI>
          
          <BlockUI :blocked="multiBlocked.panel3">
            <Panel header="Panel 3">
              <p class="text-sm m-0">Third panel content that can be blocked independently.</p>
            </Panel>
          </BlockUI>
        </div>
      </div>
    </div>

    <!-- Custom Content Blocking -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Custom Content Blocking
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Block various types of content including images, tables, and custom layouts.
      </p>
      
      <div class="card space-y-6">
        <!-- Image Blocking -->
        <div>
          <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">Image Gallery</h3>
          <Button label="Block Image Loading" @click="blockImage" :disabled="imageBlocked" class="mb-4" size="small" />
          
          <BlockUI :blocked="imageBlocked">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div v-for="i in 4" :key="i" class="aspect-square bg-surface-100 dark:bg-surface-800 rounded-lg flex items-center justify-center">
                <Icon name="pi:image" size="24" class="text-surface-400" />
              </div>
            </div>
          </BlockUI>
        </div>

        <!-- Table Blocking -->
        <div>
          <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">Data Table</h3>
          <div class="flex gap-2 mb-4">
            <Button label="Block Table" @click="panelBlocked = true" size="small" />
            <Button label="Unblock Table" @click="panelBlocked = false" severity="secondary" size="small" />
          </div>
          
          <BlockUI :blocked="panelBlocked">
            <div class="border border-surface-200 dark:border-surface-700 rounded">
              <table class="w-full">
                <thead class="bg-surface-50 dark:bg-surface-800">
                  <tr>
                    <th class="text-left p-3 border-b border-surface-200 dark:border-surface-700">Name</th>
                    <th class="text-left p-3 border-b border-surface-200 dark:border-surface-700">Email</th>
                    <th class="text-left p-3 border-b border-surface-200 dark:border-surface-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="i in 5" :key="i" class="border-b border-surface-200 dark:border-surface-700 last:border-b-0">
                    <td class="p-3">User {{ i }}</td>
                    <td class="p-3">user{{ i }}@example.com</td>
                    <td class="p-3">
                      <Badge :value="i % 2 === 0 ? 'Active' : 'Inactive'" :severity="i % 2 === 0 ? 'success' : 'secondary'" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </BlockUI>
        </div>
      </div>
    </div>

    <!-- Real-world Examples -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Real-world Examples
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Common scenarios where BlockUI provides excellent user experience.
      </p>
      
      <div class="card space-y-6">
        <!-- Dashboard Widget -->
        <div>
          <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">Dashboard Widget</h3>
          <div class="flex gap-2 mb-4">
            <Button label="Refresh Data" icon="pi pi-refresh" @click="blockWithTimeout" size="small" />
          </div>
          
          <BlockUI :blocked="autoBlocked">
            <div class="border border-surface-200 dark:border-surface-700 rounded-lg p-4">
              <div class="flex items-center justify-between mb-4">
                <h4 class="font-semibold">Sales Overview</h4>
                <i class="pi pi-chart-line text-primary-500"></i>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div class="text-center">
                  <div class="text-2xl font-bold text-primary-600">$1,234</div>
                  <div class="text-sm text-surface-600 dark:text-surface-300">Today</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-green-600">$8,567</div>
                  <div class="text-sm text-surface-600 dark:text-surface-300">This Week</div>
                </div>
              </div>
            </div>
          </BlockUI>
        </div>

        <!-- File Upload Area -->
        <div>
          <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">File Upload</h3>
          <Button label="Upload Files" icon="pi pi-upload" @click="simulateLoading" :disabled="loadingBlocked" class="mb-4" size="small" />
          
          <BlockUI :blocked="loadingBlocked">
            <div class="border-2 border-dashed border-surface-300 dark:border-surface-600 rounded-lg p-8 text-center">
              <div class="flex flex-col items-center gap-3">
                <i class="pi pi-cloud-upload text-4xl text-surface-400"></i>
                <div>
                  <p class="font-medium">Drop files here or click to browse</p>
                  <p class="text-sm text-surface-600 dark:text-surface-300">Supports PNG, JPG up to 10MB</p>
                </div>
              </div>
            </div>
          </BlockUI>
        </div>

        <!-- Settings Panel -->
        <div>
          <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">Settings Panel</h3>
          <Button label="Save Settings" icon="pi pi-save" @click="blockWithTimeout" class="mb-4" size="small" severity="success" />
          
          <BlockUI :blocked="autoBlocked">
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <span>Email Notifications</span>
                <ToggleSwitch :modelValue="true" />
              </div>
              <div class="flex items-center justify-between">
                <span>Dark Mode</span>
                <ToggleSwitch :modelValue="false" />
              </div>
              <div class="flex items-center justify-between">
                <span>Auto Backup</span>
                <ToggleSwitch :modelValue="true" />
              </div>
            </div>
          </BlockUI>
        </div>
      </div>
    </div>

    <!-- Accessibility -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Accessibility Features
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        BlockUI component accessibility considerations and ARIA support.
      </p>
      
      <div class="card">
        <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
          <div class="flex items-start gap-3">
            <Icon name="pi:info-circle" class="text-blue-600 dark:text-blue-400 mt-1" />
            <div>
              <h3 class="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Accessibility Features
              </h3>
              <ul class="space-y-2 text-blue-800 dark:text-blue-200 text-sm">
                <li>• Manages <code class="bg-blue-100 dark:bg-blue-800 px-1 rounded">aria-busy</code> state automatically</li>
                <li>• All attributes pass through to root element</li>
                <li>• Add <code class="bg-blue-100 dark:bg-blue-800 px-1 rounded">role</code> and <code class="bg-blue-100 dark:bg-blue-800 px-1 rounded">aria-live</code> for live regions</li>
                <li>• No interactive elements - purely visual blocking</li>
                <li>• Screen reader announces when UI becomes blocked/unblocked</li>
                <li>• Keyboard navigation is properly blocked within the component</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>