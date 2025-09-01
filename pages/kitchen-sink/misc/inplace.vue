<script setup lang="ts">
// Basic text editing
const basicText = ref('');

// Profile editing
const profile = ref({
  name: 'John Doe',
  email: 'john@example.com',
  bio: 'Software Developer passionate about Vue.js and modern web technologies.',
});

// Lazy loading data
const products = ref([]);
const dataLoaded = ref(false);

function loadData() {
  if (!dataLoaded.value) {
    // Simulate API call
    setTimeout(() => {
      products.value = [
        { code: 'P001', name: 'Laptop', category: 'Electronics', quantity: 50 },
        { code: 'P002', name: 'Mouse', category: 'Electronics', quantity: 200 },
        { code: 'P003', name: 'Keyboard', category: 'Electronics', quantity: 150 },
        { code: 'P004', name: 'Monitor', category: 'Electronics', quantity: 75 },
      ];
      dataLoaded.value = true;
    }, 1000);
  }
}

// Settings management
const settings = ref({
  notifications: true,
  theme: 'dark',
  language: 'en',
});

const themeOptions = [
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' },
  { label: 'Auto', value: 'auto' },
];

const languageOptions = [
  { label: 'English', value: 'en' },
  { label: 'Spanish', value: 'es' },
  { label: 'French', value: 'fr' },
  { label: 'German', value: 'de' },
];

// Editable list
const tasks = ref([
  { id: 1, title: 'Complete project documentation', completed: false },
  { id: 2, title: 'Review pull requests', completed: true },
  { id: 3, title: 'Update dependencies', completed: false },
]);

function updateTask(id: number, newTitle: string) {
  const task = tasks.value.find(t => t.id === id);
  if (task) {
    task.title = newTitle;
  }
}

// Rich content editing
const richContent = ref({
  title: 'Welcome to our platform',
  description: 'Discover amazing features and capabilities',
  content: 'This is a comprehensive platform designed to help you achieve your goals with ease and efficiency.',
});

// Price editing
const pricing = ref({
  basic: 9.99,
  pro: 19.99,
  enterprise: 49.99,
});

// Comments system
const comments = ref([
  {
    id: 1,
    author: 'Alice Johnson',
    text: 'This is a great feature!',
    timestamp: '2 hours ago',
    avatar: 'https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png',
  },
  {
    id: 2,
    author: 'Bob Smith',
    text: 'Very intuitive and easy to use.',
    timestamp: '4 hours ago',
    avatar: 'https://primefaces.org/cdn/primevue/images/avatar/asiyajavayant.png',
  },
]);

function updateComment(id: number, newText: string) {
  const comment = comments.value.find(c => c.id === id);
  if (comment) {
    comment.text = newText;
  }
}
</script>

<template>
  <div class="p-6 space-y-8">
    <!-- Header -->
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-4">
        <Icon name="pi:pencil" size="32" class="text-primary-500" />
        <div class="flex flex-col">
          <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0">
            Inplace
          </h1>
          <p class="text-surface-600 dark:text-surface-300">
            Inplace provides an easy to do editing and display at the same time where clicking the output displays the actual content.
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
        Inplace component requires display and content templates to define the content of each state.
      </p>

      <div class="card">
        <Inplace>
          <template #display>
            <span class="cursor-pointer hover:text-primary-500 transition-colors">View Content</span>
          </template>
          <template #content>
            <p class="m-0">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </template>
        </Inplace>
      </div>
    </div>

    <!-- Input Editing -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Input Editing
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        The closeCallback switches the state back to display mode when called from an event.
      </p>

      <div class="card">
        <Inplace>
          <template #display>
            <span class="cursor-pointer hover:text-primary-500 transition-colors">
              {{ basicText || 'Click to Edit' }}
            </span>
          </template>
          <template #content="{ closeCallback }">
            <div class="inline-flex items-center gap-2">
              <InputText v-model="basicText" autofocus @keyup.enter="closeCallback" />
              <Button icon="pi pi-check" severity="success" size="small" @click="closeCallback" />
              <Button icon="pi pi-times" severity="danger" size="small" @click="closeCallback" />
            </div>
          </template>
        </Inplace>
      </div>
    </div>

    <!-- Image Display -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Image Display
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Any content such as an image can be placed inside an Inplace.
      </p>

      <div class="card">
        <Inplace>
          <template #display>
            <span class="inline-flex items-center gap-2 cursor-pointer hover:text-primary-500 transition-colors">
              <i class="pi pi-image" />
              <span>View Photo</span>
            </span>
          </template>
          <template #content>
            <img class="w-full sm:w-80 shadow-md rounded-lg" alt="Nature" src="https://primefaces.org/cdn/primevue/images/nature/nature8.jpg">
          </template>
        </Inplace>
      </div>
    </div>

    <!-- Lazy Loading -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Lazy Loading
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        The open event is used to initialize content such as loading data in a lazy manner.
      </p>

      <div class="card">
        <Inplace @open="loadData">
          <template #display>
            <span class="cursor-pointer hover:text-primary-500 transition-colors">View Data</span>
          </template>
          <template #content>
            <div v-if="!dataLoaded" class="flex items-center gap-2 p-4">
              <ProgressSpinner style="width: 20px; height: 20px" stroke-width="4" />
              <span>Loading data...</span>
            </div>
            <DataTable v-else :value="products" class="p-datatable-sm">
              <Column field="code" header="Code" />
              <Column field="name" header="Name" />
              <Column field="category" header="Category" />
              <Column field="quantity" header="Quantity" />
            </DataTable>
          </template>
        </Inplace>
      </div>
    </div>

    <!-- Profile Editing -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Profile Editing
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Real-world example of inline profile editing with multiple fields.
      </p>

      <div class="card space-y-4">
        <div class="flex items-center gap-4">
          <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" size="large" shape="circle" />
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <span class="text-sm font-medium text-surface-600 dark:text-surface-400">Name:</span>
              <Inplace>
                <template #display>
                  <span class="cursor-pointer hover:text-primary-500 transition-colors font-medium">
                    {{ profile.name }}
                  </span>
                </template>
                <template #content="{ closeCallback }">
                  <div class="inline-flex items-center gap-2">
                    <InputText v-model="profile.name" autofocus @keyup.enter="closeCallback" />
                    <Button icon="pi pi-check" severity="success" size="small" @click="closeCallback" />
                  </div>
                </template>
              </Inplace>
            </div>

            <div class="flex items-center gap-2">
              <span class="text-sm font-medium text-surface-600 dark:text-surface-400">Email:</span>
              <Inplace>
                <template #display>
                  <span class="cursor-pointer hover:text-primary-500 transition-colors">
                    {{ profile.email }}
                  </span>
                </template>
                <template #content="{ closeCallback }">
                  <div class="inline-flex items-center gap-2">
                    <InputText v-model="profile.email" type="email" autofocus @keyup.enter="closeCallback" />
                    <Button icon="pi pi-check" severity="success" size="small" @click="closeCallback" />
                  </div>
                </template>
              </Inplace>
            </div>

            <div class="flex items-start gap-2">
              <span class="text-sm font-medium text-surface-600 dark:text-surface-400 mt-1">Bio:</span>
              <Inplace>
                <template #display>
                  <span class="cursor-pointer hover:text-primary-500 transition-colors text-sm">
                    {{ profile.bio }}
                  </span>
                </template>
                <template #content="{ closeCallback }">
                  <div class="flex flex-col gap-2">
                    <Textarea v-model="profile.bio" rows="3" autofocus class="w-80" />
                    <div class="flex gap-2">
                      <Button label="Save" severity="success" size="small" @click="closeCallback" />
                      <Button label="Cancel" severity="secondary" size="small" @click="closeCallback" />
                    </div>
                  </div>
                </template>
              </Inplace>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Settings Panel -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Settings Panel
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Inline editing of application settings with different input types.
      </p>

      <div class="card space-y-4">
        <div class="flex items-center justify-between">
          <span class="font-medium">Notifications</span>
          <Inplace>
            <template #display>
              <Badge
                :value="settings.notifications ? 'Enabled' : 'Disabled'"
                :severity="settings.notifications ? 'success' : 'secondary'"
              />
            </template>
            <template #content="{ closeCallback }">
              <div class="inline-flex items-center gap-2">
                <ToggleSwitch v-model="settings.notifications" />
                <Button icon="pi pi-check" severity="success" size="small" @click="closeCallback" />
              </div>
            </template>
          </Inplace>
        </div>

        <div class="flex items-center justify-between">
          <span class="font-medium">Theme</span>
          <Inplace>
            <template #display>
              <Chip :label="settings.theme" class="cursor-pointer hover:bg-primary hover:text-primary-contrast transition-colors" />
            </template>
            <template #content="{ closeCallback }">
              <div class="inline-flex items-center gap-2">
                <Select v-model="settings.theme" :options="themeOptions" option-label="label" option-value="value" />
                <Button icon="pi pi-check" severity="success" size="small" @click="closeCallback" />
              </div>
            </template>
          </Inplace>
        </div>

        <div class="flex items-center justify-between">
          <span class="font-medium">Language</span>
          <Inplace>
            <template #display>
              <Chip
                :label="languageOptions.find(l => l.value === settings.language)?.label"
                class="cursor-pointer hover:bg-primary hover:text-primary-contrast transition-colors"
              />
            </template>
            <template #content="{ closeCallback }">
              <div class="inline-flex items-center gap-2">
                <Select v-model="settings.language" :options="languageOptions" option-label="label" option-value="value" />
                <Button icon="pi pi-check" severity="success" size="small" @click="closeCallback" />
              </div>
            </template>
          </Inplace>
        </div>
      </div>
    </div>

    <!-- Editable Task List -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Editable Task List
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Inline editing of task items with completion status.
      </p>

      <div class="card">
        <div class="space-y-3">
          <div v-for="task in tasks" :key="task.id" class="flex items-center gap-3 p-3 border border-surface-200 dark:border-surface-700 rounded">
            <Checkbox v-model="task.completed" :binary="true" />
            <div class="flex-1">
              <Inplace>
                <template #display>
                  <span
                    class="cursor-pointer hover:text-primary-500 transition-colors"
                    :class="{ 'line-through text-surface-400': task.completed }"
                  >
                    {{ task.title }}
                  </span>
                </template>
                <template #content="{ closeCallback }">
                  <div class="inline-flex items-center gap-2 w-full">
                    <InputText
                      v-model="task.title" autofocus class="flex-1"
                      @keyup.enter="() => { updateTask(task.id, task.title); closeCallback(); }"
                    />
                    <Button
                      icon="pi pi-check" severity="success" size="small"
                      @click="() => { updateTask(task.id, task.title); closeCallback(); }"
                    />
                  </div>
                </template>
              </Inplace>
            </div>
            <div class="text-xs text-surface-500">
              <i class="pi pi-clock mr-1" />
              Task {{ task.id }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pricing Table -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Pricing Table
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Inline price editing for different plan tiers.
      </p>

      <div class="card">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="border border-surface-200 dark:border-surface-700 rounded-lg p-6 text-center">
            <h3 class="text-xl font-semibold mb-4">
              Basic
            </h3>
            <div class="text-3xl font-bold text-primary-600 mb-4">
              <Inplace>
                <template #display>
                  <span class="cursor-pointer hover:text-primary-500 transition-colors">
                    ${{ pricing.basic }}
                  </span>
                </template>
                <template #content="{ closeCallback }">
                  <div class="inline-flex items-center gap-2">
                    <InputNumber
                      v-model="pricing.basic" mode="currency" currency="USD" locale="en-US"
                      autofocus @keyup.enter="closeCallback"
                    />
                    <Button icon="pi pi-check" severity="success" size="small" @click="closeCallback" />
                  </div>
                </template>
              </Inplace>
              <span class="text-sm text-surface-500">/month</span>
            </div>
            <Button label="Choose Plan" class="w-full" />
          </div>

          <div class="border-2 border-primary-500 rounded-lg p-6 text-center relative">
            <div class="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge value="Popular" severity="info" />
            </div>
            <h3 class="text-xl font-semibold mb-4">
              Pro
            </h3>
            <div class="text-3xl font-bold text-primary-600 mb-4">
              <Inplace>
                <template #display>
                  <span class="cursor-pointer hover:text-primary-500 transition-colors">
                    ${{ pricing.pro }}
                  </span>
                </template>
                <template #content="{ closeCallback }">
                  <div class="inline-flex items-center gap-2">
                    <InputNumber
                      v-model="pricing.pro" mode="currency" currency="USD" locale="en-US"
                      autofocus @keyup.enter="closeCallback"
                    />
                    <Button icon="pi pi-check" severity="success" size="small" @click="closeCallback" />
                  </div>
                </template>
              </Inplace>
              <span class="text-sm text-surface-500">/month</span>
            </div>
            <Button label="Choose Plan" class="w-full" />
          </div>

          <div class="border border-surface-200 dark:border-surface-700 rounded-lg p-6 text-center">
            <h3 class="text-xl font-semibold mb-4">
              Enterprise
            </h3>
            <div class="text-3xl font-bold text-primary-600 mb-4">
              <Inplace>
                <template #display>
                  <span class="cursor-pointer hover:text-primary-500 transition-colors">
                    ${{ pricing.enterprise }}
                  </span>
                </template>
                <template #content="{ closeCallback }">
                  <div class="inline-flex items-center gap-2">
                    <InputNumber
                      v-model="pricing.enterprise" mode="currency" currency="USD" locale="en-US"
                      autofocus @keyup.enter="closeCallback"
                    />
                    <Button icon="pi pi-check" severity="success" size="small" @click="closeCallback" />
                  </div>
                </template>
              </Inplace>
              <span class="text-sm text-surface-500">/month</span>
            </div>
            <Button label="Choose Plan" class="w-full" />
          </div>
        </div>
      </div>
    </div>

    <!-- Comments System -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Comments System
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Inline comment editing with user avatars and timestamps.
      </p>

      <div class="card">
        <div class="space-y-4">
          <div
            v-for="comment in comments" :key="comment.id"
            class="flex gap-3 p-4 border border-surface-200 dark:border-surface-700 rounded-lg"
          >
            <Avatar :image="comment.avatar" shape="circle" />
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-2">
                <span class="font-semibold">{{ comment.author }}</span>
                <span class="text-xs text-surface-500">{{ comment.timestamp }}</span>
              </div>
              <Inplace>
                <template #display>
                  <p class="cursor-pointer hover:text-primary-500 transition-colors m-0">
                    {{ comment.text }}
                  </p>
                </template>
                <template #content="{ closeCallback }">
                  <div class="space-y-2">
                    <Textarea v-model="comment.text" rows="3" autofocus class="w-full" />
                    <div class="flex gap-2">
                      <Button
                        label="Save" severity="success" size="small"
                        @click="() => { updateComment(comment.id, comment.text); closeCallback(); }"
                      />
                      <Button label="Cancel" severity="secondary" size="small" @click="closeCallback" />
                    </div>
                  </div>
                </template>
              </Inplace>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Rich Content Editing -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Rich Content Editing
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Inline editing of structured content with multiple text fields.
      </p>

      <div class="card">
        <div class="space-y-6">
          <div>
            <h3 class="text-2xl font-bold mb-2">
              <Inplace>
                <template #display>
                  <span class="cursor-pointer hover:text-primary-500 transition-colors">
                    {{ richContent.title }}
                  </span>
                </template>
                <template #content="{ closeCallback }">
                  <div class="flex items-center gap-2">
                    <InputText
                      v-model="richContent.title" autofocus class="text-2xl font-bold w-96"
                      @keyup.enter="closeCallback"
                    />
                    <Button icon="pi pi-check" severity="success" size="small" @click="closeCallback" />
                  </div>
                </template>
              </Inplace>
            </h3>

            <p class="text-lg text-surface-600 dark:text-surface-300 mb-4">
              <Inplace>
                <template #display>
                  <span class="cursor-pointer hover:text-primary-500 transition-colors">
                    {{ richContent.description }}
                  </span>
                </template>
                <template #content="{ closeCallback }">
                  <div class="flex items-center gap-2">
                    <InputText
                      v-model="richContent.description" autofocus class="w-96"
                      @keyup.enter="closeCallback"
                    />
                    <Button icon="pi pi-check" severity="success" size="small" @click="closeCallback" />
                  </div>
                </template>
              </Inplace>
            </p>

            <p class="text-surface-700 dark:text-surface-200">
              <Inplace>
                <template #display>
                  <span class="cursor-pointer hover:text-primary-500 transition-colors">
                    {{ richContent.content }}
                  </span>
                </template>
                <template #content="{ closeCallback }">
                  <div class="space-y-2">
                    <Textarea v-model="richContent.content" rows="4" autofocus class="w-full" />
                    <div class="flex gap-2">
                      <Button label="Save" severity="success" size="small" @click="closeCallback" />
                      <Button label="Cancel" severity="secondary" size="small" @click="closeCallback" />
                    </div>
                  </div>
                </template>
              </Inplace>
            </p>
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
        Inplace component accessibility considerations and keyboard support.
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
                <li>• Defines <code class="bg-green-100 dark:bg-green-800 px-1 rounded">aria-live="polite"</code> by default</li>
                <li>• All attributes pass through to main container</li>
                <li>• <code class="bg-green-100 dark:bg-green-800 px-1 rounded">Enter</code> key switches to content mode</li>
                <li>• Custom aria roles and attributes can be added easily</li>
                <li>• Screen readers announce content changes</li>
                <li>• Focus management handled automatically</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
