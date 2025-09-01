<script setup lang="ts">
// Dynamic chips management
const dynamicChips = ref([
  { id: 1, label: 'Vue.js', icon: 'pi pi-star' },
  { id: 2, label: 'React', icon: 'pi pi-star' },
  { id: 3, label: 'Angular', icon: 'pi pi-star' },
  { id: 4, label: 'Nuxt', icon: 'pi pi-star', removable: true }
]);

const removeChip = (id: number) => {
  dynamicChips.value = dynamicChips.value.filter(chip => chip.id !== id);
};

// Interactive chip builder
const chipBuilder = ref({
  label: 'Sample Chip',
  icon: '',
  image: '',
  removable: false,
  type: 'label'
});

const typeOptions = [
  { label: 'Label Only', value: 'label' },
  { label: 'With Icon', value: 'icon' },
  { label: 'With Image', value: 'image' },
  { label: 'Custom Template', value: 'template' }
];

// Chip categories for filtering demo
const categories = ref([
  { name: 'Frontend', chips: ['Vue.js', 'React', 'Angular', 'Svelte'], active: [] },
  { name: 'Backend', chips: ['Node.js', 'Python', 'Java', 'PHP'], active: [] },
  { name: 'Database', chips: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis'], active: [] }
]);

const toggleCategoryChip = (categoryName: string, chipName: string) => {
  const category = categories.value.find(c => c.name === categoryName);
  if (category) {
    const index = category.active.indexOf(chipName);
    if (index > -1) {
      category.active.splice(index, 1);
    } else {
      category.active.push(chipName);
    }
  }
};

const isChipActive = (categoryName: string, chipName: string) => {
  const category = categories.value.find(c => c.name === categoryName);
  return category ? category.active.includes(chipName) : false;
};

// Tag input simulation
const tagInput = ref('');
const tags = ref(['JavaScript', 'TypeScript', 'CSS']);

const addTag = () => {
  if (tagInput.value.trim() && !tags.value.includes(tagInput.value.trim())) {
    tags.value.push(tagInput.value.trim());
    tagInput.value = '';
  }
};

const removeTag = (tag: string) => {
  const index = tags.value.indexOf(tag);
  if (index > -1) {
    tags.value.splice(index, 1);
  }
};

// Status chips
const userStatuses = ref([
  { name: 'John Doe', status: 'online', avatar: 'https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png' },
  { name: 'Jane Smith', status: 'busy', avatar: 'https://primefaces.org/cdn/primevue/images/avatar/asiyajavayant.png' },
  { name: 'Bob Johnson', status: 'away', avatar: 'https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png' },
  { name: 'Alice Brown', status: 'offline', avatar: 'https://primefaces.org/cdn/primevue/images/avatar/xuxuefeng.png' }
]);

const getStatusColor = (status: string) => {
  switch (status) {
    case 'online': return 'bg-green-500';
    case 'busy': return 'bg-red-500';
    case 'away': return 'bg-yellow-500';
    case 'offline': return 'bg-gray-400';
    default: return 'bg-gray-400';
  }
};
</script>

<template>
  <div class="p-6 space-y-8">
    <!-- Header -->
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-4">
        <Icon name="pi:tag" size="32" class="text-primary-500" />
        <div class="flex flex-col">
          <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0">
            Chip
          </h1>
          <p class="text-surface-600 dark:text-surface-300">
            Chip represents entities using icons, labels and images.
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
        A basic chip with a text is created with the label property. When removable is added, a delete icon is displayed.
      </p>
      
      <div class="card">
        <div class="flex items-center gap-2 flex-wrap">
          <Chip label="Action" />
          <Chip label="Comedy" />
          <Chip label="Mystery" />
          <Chip label="Thriller" removable />
          <Chip label="Drama" removable />
        </div>
      </div>
    </div>

    <!-- Icon Chips -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Icon Chips
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        A font icon next to the label can be displayed with the icon property.
      </p>
      
      <div class="card space-y-4">
        <!-- Basic Icon Chips -->
        <div>
          <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">Basic Icons</h3>
          <div class="flex items-center gap-2 flex-wrap">
            <Chip label="Apple" icon="pi pi-apple" />
            <Chip label="Facebook" icon="pi pi-facebook" />
            <Chip label="Google" icon="pi pi-google" />
            <Chip label="Microsoft" icon="pi pi-microsoft" removable />
          </div>
        </div>

        <!-- Custom Remove Icon -->
        <div>
          <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">Custom Remove Icon</h3>
          <div class="flex items-center gap-2 flex-wrap">
            <Chip label="GitHub" icon="pi pi-github" removable>
              <template #removeicon="{ removeCallback, keydownCallback }">
                <i class="pi pi-minus-circle" @click="removeCallback" @keydown="keydownCallback" />
              </template>
            </Chip>
            <Chip label="GitLab" icon="pi pi-bookmark" removable>
              <template #removeicon="{ removeCallback, keydownCallback }">
                <i class="pi pi-times" @click="removeCallback" @keydown="keydownCallback" />
              </template>
            </Chip>
          </div>
        </div>

        <!-- Different Icon Categories -->
        <div>
          <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">Different Categories</h3>
          <div class="space-y-3">
            <div>
              <p class="text-sm font-medium text-surface-600 dark:text-surface-400 mb-2">Social Media</p>
              <div class="flex items-center gap-2 flex-wrap">
                <Chip label="Twitter" icon="pi pi-twitter" />
                <Chip label="Instagram" icon="pi pi-image" />
                <Chip label="LinkedIn" icon="pi pi-users" />
              </div>
            </div>
            <div>
              <p class="text-sm font-medium text-surface-600 dark:text-surface-400 mb-2">Development</p>
              <div class="flex items-center gap-2 flex-wrap">
                <Chip label="Code" icon="pi pi-code" />
                <Chip label="Terminal" icon="pi pi-desktop" />
                <Chip label="Database" icon="pi pi-database" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Image Chips -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Image Chips
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        The image property is used to display an image like an avatar.
      </p>
      
      <div class="card">
        <div class="flex items-center gap-2 flex-wrap">
          <Chip label="Amy Elsner" image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" />
          <Chip label="Asiya Javayant" image="https://primefaces.org/cdn/primevue/images/avatar/asiyajavayant.png" />
          <Chip label="Onyama Limba" image="https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png" />
          <Chip label="Xuxue Feng" image="https://primefaces.org/cdn/primevue/images/avatar/xuxuefeng.png" removable />
        </div>
      </div>
    </div>

    <!-- Template Chips -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Template Chips
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        The default slot allows displaying custom content inside a chip.
      </p>
      
      <div class="card">
        <div class="flex items-center gap-2 flex-wrap">
          <Chip class="py-0 pl-0 pr-4">
            <span class="bg-primary text-primary-contrast rounded-full w-8 h-8 flex items-center justify-center">P</span>
            <span class="ml-2 font-medium">PRIME</span>
          </Chip>
          
          <Chip class="py-0 pl-0 pr-4">
            <div class="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
              <i class="pi pi-check text-sm"></i>
            </div>
            <span class="ml-2 font-medium">VERIFIED</span>
          </Chip>
          
          <Chip class="py-0 pl-0 pr-4">
            <div class="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">
              99+
            </div>
            <span class="ml-2 font-medium">NOTIFICATIONS</span>
          </Chip>
        </div>
      </div>
    </div>

    <!-- Dynamic Chips -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Dynamic Chips
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Interactive example showing chips that can be dynamically added and removed.
      </p>
      
      <div class="card">
        <div class="flex items-center gap-2 flex-wrap">
          <Chip 
            v-for="chip in dynamicChips" 
            :key="chip.id"
            :label="chip.label" 
            :icon="chip.icon"
            :removable="chip.removable"
            @remove="removeChip(chip.id)"
          />
        </div>
      </div>
    </div>

    <!-- Tag Input Simulation -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Tag Input
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Simulate a tag input field where chips represent tags that can be added and removed.
      </p>
      
      <div class="card">
        <div class="flex flex-col gap-4">
          <div class="flex gap-2">
            <InputText 
              v-model="tagInput" 
              placeholder="Add a tag..." 
              @keyup.enter="addTag"
              class="flex-1"
            />
            <Button label="Add" @click="addTag" :disabled="!tagInput.trim()" />
          </div>
          
          <div class="flex items-center gap-2 flex-wrap">
            <Chip 
              v-for="tag in tags" 
              :key="tag"
              :label="tag" 
              removable
              @remove="removeTag(tag)"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Filter Chips -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Filter Chips
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Use chips as toggleable filters for different categories.
      </p>
      
      <div class="card">
        <div class="space-y-4">
          <div v-for="category in categories" :key="category.name">
            <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-2">{{ category.name }}</h3>
            <div class="flex items-center gap-2 flex-wrap">
              <Chip
                v-for="chip in category.chips"
                :key="chip"
                :label="chip"
                :class="[
                  'cursor-pointer transition-all',
                  isChipActive(category.name, chip) 
                    ? 'bg-primary text-primary-contrast' 
                    : 'hover:bg-surface-100 dark:hover:bg-surface-700'
                ]"
                @click="toggleCategoryChip(category.name, chip)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Status Chips -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Status Chips
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Display user status with avatar chips and status indicators.
      </p>
      
      <div class="card">
        <div class="space-y-3">
          <div v-for="user in userStatuses" :key="user.name" class="flex items-center gap-3">
            <div class="relative">
              <Chip :label="user.name" :image="user.avatar" />
              <div class="absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-surface-800" :class="getStatusColor(user.status)"></div>
            </div>
            <Badge :value="user.status" :severity="user.status === 'online' ? 'success' : user.status === 'busy' ? 'danger' : user.status === 'away' ? 'warn' : 'secondary'" />
          </div>
        </div>
      </div>
    </div>

    <!-- Interactive Chip Builder -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Interactive Chip Builder
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Customize chip properties to see different combinations.
      </p>
      
      <div class="card">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium text-surface-700 dark:text-surface-300">Type</label>
            <Select v-model="chipBuilder.type" :options="typeOptions" option-label="label" option-value="value" />
          </div>
          
          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium text-surface-700 dark:text-surface-300">Label</label>
            <InputText v-model="chipBuilder.label" />
          </div>
          
          <div v-if="chipBuilder.type === 'icon'" class="flex flex-col gap-2">
            <label class="text-sm font-medium text-surface-700 dark:text-surface-300">Icon</label>
            <InputText v-model="chipBuilder.icon" placeholder="pi pi-star" />
          </div>
          
          <div v-if="chipBuilder.type === 'image'" class="flex flex-col gap-2">
            <label class="text-sm font-medium text-surface-700 dark:text-surface-300">Image URL</label>
            <InputText v-model="chipBuilder.image" placeholder="Image URL" />
          </div>
          
          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium text-surface-700 dark:text-surface-300">Removable</label>
            <div class="flex items-center mt-2">
              <Checkbox v-model="chipBuilder.removable" input-id="removable" :binary="true" />
              <label for="removable" class="ml-2">Enable remove button</label>
            </div>
          </div>
        </div>
        
        <div class="bg-surface-50 dark:bg-surface-800 p-4 rounded-lg">
          <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">Preview</h3>
          <div class="flex justify-center">
            <Chip
              v-if="chipBuilder.type === 'template'"
              class="py-0 pl-0 pr-4"
            >
              <span class="bg-primary text-primary-contrast rounded-full w-8 h-8 flex items-center justify-center">
                {{ chipBuilder.label.charAt(0).toUpperCase() }}
              </span>
              <span class="ml-2 font-medium">{{ chipBuilder.label.toUpperCase() }}</span>
            </Chip>
            <Chip
              v-else
              :label="chipBuilder.label"
              :icon="chipBuilder.type === 'icon' ? chipBuilder.icon : undefined"
              :image="chipBuilder.type === 'image' ? chipBuilder.image : undefined"
              :removable="chipBuilder.removable"
            />
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
        Common use cases for chips in applications.
      </p>
      
      <div class="card space-y-6">
        <!-- Product Tags -->
        <div>
          <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">Product Tags</h3>
          <div class="border border-surface-200 dark:border-surface-700 rounded-lg p-4">
            <h4 class="font-semibold mb-2">MacBook Pro 14"</h4>
            <p class="text-sm text-surface-600 dark:text-surface-300 mb-3">Professional laptop for developers and creators</p>
            <div class="flex items-center gap-2 flex-wrap">
              <Chip label="Apple" icon="pi pi-apple" />
              <Chip label="Laptop" />
              <Chip label="Professional" />
              <Chip label="M2 Chip" />
              <Chip label="14-inch" />
            </div>
          </div>
        </div>

        <!-- User Skills -->
        <div>
          <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">User Skills</h3>
          <div class="border border-surface-200 dark:border-surface-700 rounded-lg p-4">
            <div class="flex items-center gap-3 mb-3">
              <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
              <div>
                <h4 class="font-semibold">Amy Elsner</h4>
                <p class="text-sm text-surface-600 dark:text-surface-300">Senior Frontend Developer</p>
              </div>
            </div>
            <div class="flex items-center gap-2 flex-wrap">
              <Chip label="Vue.js" icon="pi pi-star" />
              <Chip label="TypeScript" icon="pi pi-code" />
              <Chip label="UI/UX" icon="pi pi-palette" />
              <Chip label="Node.js" icon="pi pi-server" />
              <Chip label="AWS" icon="pi pi-cloud" />
            </div>
          </div>
        </div>

        <!-- Content Categories -->
        <div>
          <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">Content Categories</h3>
          <div class="space-y-3">
            <div class="border border-surface-200 dark:border-surface-700 rounded-lg p-4">
              <h4 class="font-semibold mb-2">Getting Started with Vue 3</h4>
              <p class="text-sm text-surface-600 dark:text-surface-300 mb-3">Learn the fundamentals of Vue 3 and build your first application</p>
              <div class="flex items-center gap-2 flex-wrap">
                <Chip label="Tutorial" />
                <Chip label="Beginner" />
                <Chip label="Vue.js" />
                <Chip label="JavaScript" />
              </div>
            </div>
            <div class="border border-surface-200 dark:border-surface-700 rounded-lg p-4">
              <h4 class="font-semibold mb-2">Advanced TypeScript Patterns</h4>
              <p class="text-sm text-surface-600 dark:text-surface-300 mb-3">Deep dive into advanced TypeScript concepts and patterns</p>
              <div class="flex items-center gap-2 flex-wrap">
                <Chip label="Advanced" />
                <Chip label="TypeScript" />
                <Chip label="Patterns" />
                <Chip label="Best Practices" />
              </div>
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
        Chip component accessibility considerations and keyboard support.
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
                <li>• Uses label property as default <code class="bg-green-100 dark:bg-green-800 px-1 rounded">aria-label</code></li>
                <li>• All attributes pass through to root element</li>
                <li>• Removable chips are focusable with Tab key</li>
                <li>• <code class="bg-green-100 dark:bg-green-800 px-1 rounded">Backspace</code> and <code class="bg-green-100 dark:bg-green-800 px-1 rounded">Enter</code> keys remove chips</li>
                <li>• Custom <code class="bg-green-100 dark:bg-green-800 px-1 rounded">aria-labelledby</code> or <code class="bg-green-100 dark:bg-green-800 px-1 rounded">aria-label</code> can override defaults</li>
                <li>• Proper keyboard navigation support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>