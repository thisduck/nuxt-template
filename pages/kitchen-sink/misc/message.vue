<script setup lang="ts">
import { ref } from 'vue';

// Form validation example
const username = ref('');
const email = ref('');

// Dynamic messages example
let messageId = 0;
const messages = ref([]);

const severityOptions = ['success', 'info', 'warn', 'error'];

const addMessages = () => {
  messages.value.push(
    {
      id: ++messageId,
      severity: 'success',
      content: 'Message added successfully!'
    },
    {
      id: ++messageId,
      severity: 'info',
      content: 'This is an informational message.'
    },
    {
      id: ++messageId,
      severity: 'warn',
      content: 'Warning: Please review your settings.'
    }
  );
};

const clearMessages = () => {
  messages.value = [];
};

// Auto-disappearing message example
const visible = ref(false);

const showMessage = () => {
  visible.value = true;
  setTimeout(() => {
    visible.value = false;
  }, 3000);
};

// Interactive message creator
const customSeverity = ref('info');
const customVariant = ref('filled');
const customSize = ref('normal');
const customContent = ref('Custom message content');
const customIcon = ref('');
const customClosable = ref(false);

const variantOptions = [
  { label: 'Filled', value: 'filled' },
  { label: 'Outlined', value: 'outlined' },
  { label: 'Simple', value: 'simple' }
];

const sizeOptions = [
  { label: 'Small', value: 'small' },
  { label: 'Normal', value: 'normal' },
  { label: 'Large', value: 'large' }
];
</script>

<template>
  <div class="p-6 space-y-8">
    <!-- Header -->
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-4">
        <Icon name="pi:info-circle" size="32" class="text-primary-500" />
        <div class="flex flex-col">
          <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0">
            Message
          </h1>
          <p class="text-surface-600 dark:text-surface-300">
            Message component is used to display inline messages.
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
        Message component requires a content to display.
      </p>
      
      <div class="card">
        <Message>Message Content</Message>
      </div>
    </div>

    <!-- Severity Levels -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Severity Levels
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        The severity option specifies the type of the message.
      </p>
      
      <div class="card space-y-4">
        <Message severity="success">Success Message</Message>
        <Message severity="info">Info Message</Message>
        <Message severity="warn">Warn Message</Message>
        <Message severity="error">Error Message</Message>
        <Message severity="secondary">Secondary Message</Message>
        <Message severity="contrast">Contrast Message</Message>
      </div>
    </div>

    <!-- Icon Customization -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Icon Customization
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Icon property and the icon slots are available to customize the icon of the message.
      </p>
      
      <div class="card space-y-4">
        <Message severity="info" icon="pi pi-send">Info Message with Custom Icon</Message>
        <Message severity="success" icon="pi pi-check">Success with Check Icon</Message>
        <Message severity="warn" icon="pi pi-exclamation-triangle">Warning with Triangle Icon</Message>
        <Message severity="error" icon="pi pi-times-circle">Error with Times Icon</Message>
        
        <Message severity="success">
          <template #icon>
            <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" size="small" />
          </template>
          <span class="ml-2">How may I help you?</span>
        </Message>
      </div>
    </div>

    <!-- Variants -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Message Variants
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Configure different variants for messages with borders, backgrounds, and paddings.
      </p>
      
      <div class="card space-y-6">
        <!-- Outlined Variant -->
        <div>
          <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">Outlined</h3>
          <div class="space-y-3">
            <Message severity="success" variant="outlined">Outlined Success Message</Message>
            <Message severity="info" variant="outlined">Outlined Info Message</Message>
            <Message severity="warn" variant="outlined">Outlined Warn Message</Message>
            <Message severity="error" variant="outlined">Outlined Error Message</Message>
            <Message severity="secondary" variant="outlined">Outlined Secondary Message</Message>
            <Message severity="contrast" variant="outlined">Outlined Contrast Message</Message>
          </div>
        </div>

        <!-- Simple Variant -->
        <div>
          <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">Simple</h3>
          <div class="space-y-3">
            <Message severity="success" variant="simple">Simple Success Message</Message>
            <Message severity="info" variant="simple">Simple Info Message</Message>
            <Message severity="warn" variant="simple">Simple Warn Message</Message>
            <Message severity="error" variant="simple">Simple Error Message</Message>
            <Message severity="secondary" variant="simple">Simple Secondary Message</Message>
            <Message severity="contrast" variant="simple">Simple Contrast Message</Message>
          </div>
        </div>
      </div>
    </div>

    <!-- Sizes -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Message Sizes
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Message provides small and large sizes as alternatives to the base.
      </p>
      
      <div class="card space-y-4">
        <Message size="small" icon="pi pi-send">Small Message</Message>
        <Message icon="pi pi-user">Normal Message</Message>
        <Message size="large" icon="pi pi-check">Large Message</Message>
      </div>
    </div>

    <!-- Form Validation -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Form Validation
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Validation errors in a form are displayed with the error severity.
      </p>
      
      <div class="card">
        <div class="space-y-4">
          <Message v-if="!username || !email" severity="error" icon="pi pi-times-circle" class="mb-2">
            Please fill in all required fields
          </Message>
          <Message v-if="username && email" severity="success" icon="pi pi-check-circle" class="mb-2">
            Form is valid
          </Message>
          
          <div class="flex flex-col gap-1">
            <label class="text-sm font-medium text-surface-700 dark:text-surface-300">Username</label>
            <InputText v-model="username" placeholder="Username" aria-label="username" :invalid="!username" />
            <Message v-if="!username" severity="error" variant="simple" size="small">Username is required</Message>
          </div>
          
          <div class="flex flex-col gap-1">
            <label class="text-sm font-medium text-surface-700 dark:text-surface-300">Email</label>
            <InputText v-model="email" placeholder="Email" aria-label="email" type="email" :invalid="!email" />
            <Message v-if="!email" severity="error" variant="simple" size="small">Email is required</Message>
          </div>
        </div>
      </div>
    </div>

    <!-- Dynamic Messages -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Dynamic Messages
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Multiple messages can be displayed using the standard v-for directive.
      </p>
      
      <div class="card">
        <div class="flex gap-2 mb-4">
          <Button label="Show" @click="addMessages()" />
          <Button label="Clear" severity="secondary" @click="clearMessages()" />
        </div>
        
        <TransitionGroup name="p-message" tag="div" class="flex flex-col gap-2">
          <Message v-for="msg of messages" :key="msg.id" :severity="msg.severity">
            {{ msg.content }}
          </Message>
        </TransitionGroup>
      </div>
    </div>

    <!-- Closable Messages -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Closable Messages
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Enable closable option to display an icon to remove a message.
      </p>
      
      <div class="card space-y-4">
        <Message closable severity="info">This message can be closed</Message>
        <Message closable severity="success">Success message with close button</Message>
        <Message closable severity="warn">Warning message with close functionality</Message>
        <Message closable severity="error">Error message that can be dismissed</Message>
      </div>
    </div>

    <!-- Auto-disappearing Message -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Auto-disappearing Message
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Messages can disappear automatically by defining the life in milliseconds.
      </p>
      
      <div class="card">
        <Button label="Show" @click="showMessage" :disabled="visible" class="mb-4" />
        <Message v-if="visible" severity="success" :life="3000">
          This message will disappear in 3 seconds
        </Message>
      </div>
    </div>

    <!-- Interactive Message Builder -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Interactive Message Builder
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Customize message properties to see different combinations.
      </p>
      
      <div class="card">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium text-surface-700 dark:text-surface-300">Severity</label>
            <Select v-model="customSeverity" :options="severityOptions" />
          </div>
          
          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium text-surface-700 dark:text-surface-300">Variant</label>
            <Select v-model="customVariant" :options="variantOptions" option-label="label" option-value="value" />
          </div>
          
          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium text-surface-700 dark:text-surface-300">Size</label>
            <Select v-model="customSize" :options="sizeOptions" option-label="label" option-value="value" />
          </div>
          
          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium text-surface-700 dark:text-surface-300">Content</label>
            <InputText v-model="customContent" />
          </div>
          
          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium text-surface-700 dark:text-surface-300">Icon (optional)</label>
            <InputText v-model="customIcon" placeholder="pi pi-info" />
          </div>
          
          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium text-surface-700 dark:text-surface-300">Closable</label>
            <div class="flex items-center mt-2">
              <Checkbox v-model="customClosable" input-id="closable" :binary="true" />
              <label for="closable" class="ml-2">Enable close button</label>
            </div>
          </div>
        </div>
        
        <div class="bg-surface-50 dark:bg-surface-800 p-4 rounded-lg">
          <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">Preview</h3>
          <Message 
            :severity="customSeverity"
            :variant="customVariant !== 'filled' ? customVariant : undefined"
            :size="customSize !== 'normal' ? customSize : undefined"
            :icon="customIcon || undefined"
            :closable="customClosable"
          >
            {{ customContent }}
          </Message>
        </div>
      </div>
    </div>

    <!-- Real-world Examples -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Real-world Examples
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Common use cases for message components in applications.
      </p>
      
      <div class="card space-y-6">
        <!-- System Status -->
        <div>
          <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">System Status</h3>
          <div class="space-y-3">
            <Message severity="success" icon="pi pi-check-circle" variant="outlined">
              System is operating normally
            </Message>
            <Message severity="warn" icon="pi pi-exclamation-triangle" variant="outlined">
              Scheduled maintenance in 2 hours
            </Message>
            <Message severity="error" icon="pi pi-times-circle" variant="outlined">
              Service temporarily unavailable
            </Message>
          </div>
        </div>

        <!-- User Notifications -->
        <div>
          <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">User Notifications</h3>
          <div class="space-y-3">
            <Message severity="info" icon="pi pi-envelope" closable>
              You have 3 new messages
            </Message>
            <Message severity="success" icon="pi pi-upload" closable>
              Profile updated successfully
            </Message>
            <Message severity="warn" icon="pi pi-exclamation-triangle" closable>
              Your trial expires in 5 days
            </Message>
          </div>
        </div>

        <!-- Data Processing -->
        <div>
          <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">Data Processing</h3>
          <div class="space-y-3">
            <Message severity="info" icon="pi pi-spin pi-spinner" variant="simple">
              Processing your request...
            </Message>
            <Message severity="success" icon="pi pi-check" variant="simple">
              Data imported successfully (1,250 records)
            </Message>
            <Message severity="error" icon="pi pi-times" variant="simple">
              Import failed: Invalid file format
            </Message>
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
        Message component uses alert role and supports screen readers with proper ARIA attributes.
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
                <li>• Uses <code class="bg-blue-100 dark:bg-blue-800 px-1 rounded">alert</code> role with implicit <code class="bg-blue-100 dark:bg-blue-800 px-1 rounded">aria-live="assertive"</code></li>
                <li>• Supports <code class="bg-blue-100 dark:bg-blue-800 px-1 rounded">aria-labelledby</code> and <code class="bg-blue-100 dark:bg-blue-800 px-1 rounded">aria-label</code> attributes</li>
                <li>• Close button is keyboard accessible (Enter/Space)</li>
                <li>• Proper color contrast for all severity levels</li>
                <li>• Screen reader friendly content structure</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.p-message-enter-active,
.p-message-leave-active {
  transition: all 0.3s ease;
}

.p-message-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.p-message-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>