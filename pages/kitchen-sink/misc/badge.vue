<script setup lang="ts">
// Interactive badge builder
const customValue = ref('5');
const customSeverity = ref('primary');
const customSize = ref('normal');
const customUseSlot = ref(false);

const severityOptions = [
  { label: 'Primary', value: 'primary' },
  { label: 'Secondary', value: 'secondary' },
  { label: 'Success', value: 'success' },
  { label: 'Info', value: 'info' },
  { label: 'Warning', value: 'warn' },
  { label: 'Danger', value: 'danger' },
  { label: 'Contrast', value: 'contrast' }
];

const sizeOptions = [
  { label: 'Small', value: 'small' },
  { label: 'Normal', value: 'normal' },
  { label: 'Large', value: 'large' },
  { label: 'X-Large', value: 'xlarge' }
];

// Notification counters for demo
const notificationCount = ref(3);
const messageCount = ref(8);
const calendarEvents = ref(12);
const cartItems = ref(0);

const incrementCounter = (counter: string) => {
  switch (counter) {
    case 'notifications':
      notificationCount.value++;
      break;
    case 'messages':
      messageCount.value++;
      break;
    case 'calendar':
      calendarEvents.value++;
      break;
    case 'cart':
      cartItems.value++;
      break;
  }
};

const resetCounters = () => {
  notificationCount.value = 0;
  messageCount.value = 0;
  calendarEvents.value = 0;
  cartItems.value = 0;
};
</script>

<template>
  <div class="p-6 space-y-8">
    <!-- Header -->
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-4">
        <Icon name="pi:bookmark" size="32" class="text-primary-500" />
        <div class="flex flex-col">
          <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0">
            Badge
          </h1>
          <p class="text-surface-600 dark:text-surface-300">
            Badge is a small status indicator for another element.
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
        Content to display is defined with the value property or the default slot.
      </p>
      
      <div class="card">
        <div class="flex items-center gap-4 flex-wrap">
          <Badge value="2" />
          <Badge>10</Badge>
          <Badge value="NEW" />
          <Badge>HOT</Badge>
        </div>
      </div>
    </div>

    <!-- Severity Levels -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Severity Levels
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Severity defines the variant of a badge with different color schemes.
      </p>
      
      <div class="card">
        <div class="flex items-center gap-4 flex-wrap">
          <Badge value="2" />
          <Badge value="6" severity="secondary" />
          <Badge value="8" severity="success" />
          <Badge value="4" severity="info" />
          <Badge value="9" severity="warn" />
          <Badge value="3" severity="danger" />
          <Badge value="5" severity="contrast" />
        </div>
      </div>
    </div>

    <!-- Sizes -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Badge Sizes
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Use the size property to customize the dimensions of a Badge.
      </p>
      
      <div class="card">
        <div class="flex items-center gap-4 flex-wrap">
          <Badge value="2" size="small" />
          <Badge value="4" />
          <Badge value="6" size="large" severity="warn" />
          <Badge value="8" size="xlarge" severity="success" />
        </div>
      </div>
    </div>

    <!-- Overlay Badges -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Overlay Badges
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        A badge can be added to any element by encapsulating the content with the OverlayBadge component.
      </p>
      
      <div class="card space-y-6">
        <!-- Basic Overlay -->
        <div>
          <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">Basic Overlay</h3>
          <div class="flex items-center gap-6 flex-wrap">
            <OverlayBadge value="2">
              <i class="pi pi-bell" style="font-size: 2rem" />
            </OverlayBadge>
            <OverlayBadge value="4" severity="danger">
              <i class="pi pi-calendar" style="font-size: 2rem" />
            </OverlayBadge>
            <OverlayBadge severity="danger">
              <i class="pi pi-envelope" style="font-size: 2rem" />
            </OverlayBadge>
          </div>
        </div>

        <!-- Icons with Different Severities -->
        <div>
          <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">Different Severities</h3>
          <div class="flex items-center gap-6 flex-wrap">
            <OverlayBadge value="3" severity="success">
              <i class="pi pi-check-circle" style="font-size: 2rem; color: var(--p-green-500)" />
            </OverlayBadge>
            <OverlayBadge value="7" severity="info">
              <i class="pi pi-info-circle" style="font-size: 2rem; color: var(--p-blue-500)" />
            </OverlayBadge>
            <OverlayBadge value="12" severity="warn">
              <i class="pi pi-exclamation-triangle" style="font-size: 2rem; color: var(--p-yellow-500)" />
            </OverlayBadge>
            <OverlayBadge value="99+" severity="danger">
              <i class="pi pi-times-circle" style="font-size: 2rem; color: var(--p-red-500)" />
            </OverlayBadge>
          </div>
        </div>

        <!-- Avatars with Badges -->
        <div>
          <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">Avatar with Badges</h3>
          <div class="flex items-center gap-6 flex-wrap">
            <OverlayBadge value="5" severity="danger">
              <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" size="large" shape="circle" />
            </OverlayBadge>
            <OverlayBadge severity="success">
              <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/asiyajavayant.png" size="large" shape="circle" />
            </OverlayBadge>
            <OverlayBadge value="NEW" severity="info">
              <Avatar label="JD" size="large" shape="circle" style="background-color: #6366f1; color: white" />
            </OverlayBadge>
          </div>
        </div>
      </div>
    </div>

    <!-- Button Badges -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Button Badges
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Buttons have built-in support for badges to display inline badges.
      </p>
      
      <div class="card space-y-6">
        <!-- Basic Button Badges -->
        <div>
          <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">Basic Button Badges</h3>
          <div class="flex items-center gap-4 flex-wrap">
            <Button label="Notifications" icon="pi pi-bell" badge="2" />
            <Button label="Inbox" icon="pi pi-inbox" badge="8" badgeSeverity="contrast" variant="outlined" />
            <Button label="Messages" icon="pi pi-envelope" badge="5" badgeSeverity="danger" />
          </div>
        </div>

        <!-- Different Badge Severities -->
        <div>
          <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">Different Severities</h3>
          <div class="flex items-center gap-4 flex-wrap">
            <Button label="Tasks" icon="pi pi-check" badge="3" badgeSeverity="success" severity="success" />
            <Button label="Warnings" icon="pi pi-exclamation-triangle" badge="7" badgeSeverity="warn" severity="warn" />
            <Button label="Errors" icon="pi pi-times" badge="12" badgeSeverity="danger" severity="danger" />
            <Button label="Info" icon="pi pi-info-circle" badge="4" badgeSeverity="info" severity="info" />
          </div>
        </div>

        <!-- Secondary Buttons with Badges -->
        <div>
          <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">Secondary Variants</h3>
          <div class="flex items-center gap-4 flex-wrap">
            <Button label="Cart" icon="pi pi-shopping-cart" badge="3" variant="outlined" />
            <Button label="Downloads" icon="pi pi-download" badge="NEW" badgeSeverity="success" variant="text" />
            <Button label="Updates" icon="pi pi-refresh" badge="!" badgeSeverity="warn" variant="outlined" severity="secondary" />
          </div>
        </div>
      </div>
    </div>

    <!-- Interactive Demo -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Interactive Demo
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Live demo with dynamic counters and interactive elements.
      </p>
      
      <div class="card">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100">Notification Center</h3>
          <Button label="Reset All" severity="secondary" size="small" @click="resetCounters" />
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="flex flex-col items-center gap-3 p-4 border border-surface-200 dark:border-surface-700 rounded-lg">
            <OverlayBadge :value="notificationCount" severity="danger">
              <i class="pi pi-bell" style="font-size: 2.5rem; color: var(--p-blue-500)" />
            </OverlayBadge>
            <span class="text-sm font-medium text-surface-700 dark:text-surface-300">Notifications</span>
            <Button label="Add" size="small" @click="incrementCounter('notifications')" />
          </div>
          
          <div class="flex flex-col items-center gap-3 p-4 border border-surface-200 dark:border-surface-700 rounded-lg">
            <OverlayBadge :value="messageCount" severity="info">
              <i class="pi pi-envelope" style="font-size: 2.5rem; color: var(--p-green-500)" />
            </OverlayBadge>
            <span class="text-sm font-medium text-surface-700 dark:text-surface-300">Messages</span>
            <Button label="Add" size="small" severity="info" @click="incrementCounter('messages')" />
          </div>
          
          <div class="flex flex-col items-center gap-3 p-4 border border-surface-200 dark:border-surface-700 rounded-lg">
            <OverlayBadge :value="calendarEvents" severity="warn">
              <i class="pi pi-calendar" style="font-size: 2.5rem; color: var(--p-orange-500)" />
            </OverlayBadge>
            <span class="text-sm font-medium text-surface-700 dark:text-surface-300">Events</span>
            <Button label="Add" size="small" severity="warn" @click="incrementCounter('calendar')" />
          </div>
          
          <div class="flex flex-col items-center gap-3 p-4 border border-surface-200 dark:border-surface-700 rounded-lg">
            <OverlayBadge v-if="cartItems > 0" :value="cartItems" severity="success">
              <i class="pi pi-shopping-cart" style="font-size: 2.5rem; color: var(--p-purple-500)" />
            </OverlayBadge>
            <i v-else class="pi pi-shopping-cart" style="font-size: 2.5rem; color: var(--p-purple-500)" />
            <span class="text-sm font-medium text-surface-700 dark:text-surface-300">Cart Items</span>
            <Button label="Add" size="small" severity="success" @click="incrementCounter('cart')" />
          </div>
        </div>
      </div>
    </div>

    <!-- Interactive Badge Builder -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Interactive Badge Builder
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Customize badge properties to see different combinations.
      </p>
      
      <div class="card">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium text-surface-700 dark:text-surface-300">Value/Content</label>
            <InputText v-model="customValue" placeholder="Badge content" />
          </div>
          
          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium text-surface-700 dark:text-surface-300">Severity</label>
            <Select v-model="customSeverity" :options="severityOptions" option-label="label" option-value="value" />
          </div>
          
          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium text-surface-700 dark:text-surface-300">Size</label>
            <Select v-model="customSize" :options="sizeOptions" option-label="label" option-value="value" />
          </div>
          
          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium text-surface-700 dark:text-surface-300">Use Slot</label>
            <div class="flex items-center mt-2">
              <Checkbox v-model="customUseSlot" input-id="slot" :binary="true" />
              <label for="slot" class="ml-2">Use slot content</label>
            </div>
          </div>
        </div>
        
        <div class="bg-surface-50 dark:bg-surface-800 p-4 rounded-lg">
          <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">Preview</h3>
          <div class="flex justify-center">
            <Badge 
              v-if="!customUseSlot"
              :value="customValue"
              :severity="customSeverity !== 'primary' ? customSeverity : undefined"
              :size="customSize !== 'normal' ? customSize : undefined"
            />
            <Badge 
              v-else
              :severity="customSeverity !== 'primary' ? customSeverity : undefined"
              :size="customSize !== 'normal' ? customSize : undefined"
            >
              {{ customValue }}
            </Badge>
          </div>
        </div>
      </div>
    </div>

    <!-- Real-world Examples -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Real-world Examples
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Common use cases for badges in applications.
      </p>
      
      <div class="card space-y-6">
        <!-- Status Indicators -->
        <div>
          <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">Status Indicators</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div class="flex items-center gap-3 p-3 border border-surface-200 dark:border-surface-700 rounded">
              <span>Server Status</span>
              <Badge value="ONLINE" severity="success" />
            </div>
            <div class="flex items-center gap-3 p-3 border border-surface-200 dark:border-surface-700 rounded">
              <span>Maintenance</span>
              <Badge value="SCHEDULED" severity="warn" />
            </div>
            <div class="flex items-center gap-3 p-3 border border-surface-200 dark:border-surface-700 rounded">
              <span>Service</span>
              <Badge value="OFFLINE" severity="danger" />
            </div>
          </div>
        </div>

        <!-- Version Tags -->
        <div>
          <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">Version Tags</h3>
          <div class="flex items-center gap-4 flex-wrap">
            <div class="flex items-center gap-2">
              <span>API v1.2.3</span>
              <Badge value="STABLE" severity="success" />
            </div>
            <div class="flex items-center gap-2">
              <span>API v2.0.0</span>
              <Badge value="BETA" severity="warn" />
            </div>
            <div class="flex items-center gap-2">
              <span>API v3.0.0</span>
              <Badge value="ALPHA" severity="danger" />
            </div>
            <div class="flex items-center gap-2">
              <span>Framework</span>
              <Badge value="NEW" severity="info" />
            </div>
          </div>
        </div>

        <!-- Navigation with Counters -->
        <div>
          <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">Navigation Menu</h3>
          <div class="bg-surface-100 dark:bg-surface-800 rounded-lg p-4">
            <div class="space-y-2">
              <div class="flex items-center justify-between p-2 rounded hover:bg-surface-200 dark:hover:bg-surface-700 cursor-pointer">
                <div class="flex items-center gap-3">
                  <i class="pi pi-home"></i>
                  <span>Dashboard</span>
                </div>
              </div>
              <div class="flex items-center justify-between p-2 rounded hover:bg-surface-200 dark:hover:bg-surface-700 cursor-pointer">
                <div class="flex items-center gap-3">
                  <i class="pi pi-envelope"></i>
                  <span>Messages</span>
                </div>
                <Badge value="12" severity="danger" size="small" />
              </div>
              <div class="flex items-center justify-between p-2 rounded hover:bg-surface-200 dark:hover:bg-surface-700 cursor-pointer">
                <div class="flex items-center gap-3">
                  <i class="pi pi-bell"></i>
                  <span>Notifications</span>
                </div>
                <Badge value="3" severity="info" size="small" />
              </div>
              <div class="flex items-center justify-between p-2 rounded hover:bg-surface-200 dark:hover:bg-surface-700 cursor-pointer">
                <div class="flex items-center gap-3">
                  <i class="pi pi-cog"></i>
                  <span>Settings</span>
                </div>
                <Badge value="!" severity="warn" size="small" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Custom Badge Styles -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Custom Badge Styles
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Examples of custom styled badges for different use cases.
      </p>
      
      <div class="card space-y-6">
        <!-- Rounded Badges -->
        <div>
          <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">Custom Shapes</h3>
          <div class="flex items-center gap-4 flex-wrap">
            <Badge value="HOT" severity="danger" style="border-radius: 0" />
            <Badge value="NEW" severity="success" style="border-radius: 4px" />
            <Badge value="SALE" severity="warn" style="border-radius: 12px" />
            <Badge value="VIP" severity="info" style="border-radius: 20px" />
          </div>
        </div>

        <!-- Dot Badges -->
        <div>
          <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">Dot Indicators</h3>
          <div class="flex items-center gap-6 flex-wrap">
            <div class="flex items-center gap-2">
              <Badge severity="success" style="width: 12px; height: 12px; border-radius: 50%; min-width: auto" />
              <span>Online</span>
            </div>
            <div class="flex items-center gap-2">
              <Badge severity="warn" style="width: 12px; height: 12px; border-radius: 50%; min-width: auto" />
              <span>Away</span>
            </div>
            <div class="flex items-center gap-2">
              <Badge severity="danger" style="width: 12px; height: 12px; border-radius: 50%; min-width: auto" />
              <span>Busy</span>
            </div>
            <div class="flex items-center gap-2">
              <Badge severity="secondary" style="width: 12px; height: 12px; border-radius: 50%; min-width: auto" />
              <span>Offline</span>
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
        Badge component accessibility considerations and best practices.
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
                <li>• No default roles - all attributes pass to root element</li>
                <li>• Add <code class="bg-green-100 dark:bg-green-800 px-1 rounded">aria-label</code> for screen readers when needed</li>
                <li>• Use <code class="bg-green-100 dark:bg-green-800 px-1 rounded">aria-live</code> for dynamic badges</li>
                <li>• Add <code class="bg-green-100 dark:bg-green-800 px-1 rounded">tabindex</code> for keyboard interaction if needed</li>
                <li>• Ensure sufficient color contrast for all severity levels</li>
                <li>• Consider providing text alternatives for icon-only badges</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>