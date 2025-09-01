<script setup lang="ts">
// Interactive avatar builder
const customType = ref('label');
const customLabel = ref('JD');
const customIcon = ref('pi pi-user');
const customImage = ref('https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png');
const customSize = ref('normal');
const customShape = ref('square');
const customBadge = ref(false);
const customBadgeValue = ref('4');
const customBackgroundColor = ref('#6366f1');
const customTextColor = ref('#ffffff');

const typeOptions = [
  { label: 'Label', value: 'label' },
  { label: 'Icon', value: 'icon' },
  { label: 'Image', value: 'image' }
];

const sizeOptions = [
  { label: 'Small', value: 'small' },
  { label: 'Normal', value: 'normal' },
  { label: 'Large', value: 'large' },
  { label: 'X-Large', value: 'xlarge' }
];

const shapeOptions = [
  { label: 'Square', value: 'square' },
  { label: 'Circle', value: 'circle' }
];

// Avatar gallery data
const users = ref([
  {
    name: 'Amy Elsner',
    role: 'Designer',
    image: 'https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png',
    initials: 'AE',
    status: 'online'
  },
  {
    name: 'Anna Fali',
    role: 'Developer',
    image: 'https://primefaces.org/cdn/primevue/images/avatar/annafali.png',
    initials: 'AF',
    status: 'away'
  },
  {
    name: 'Asiya Javayant',
    role: 'Manager',
    image: 'https://primefaces.org/cdn/primevue/images/avatar/asiyajavayant.png',
    initials: 'AJ',
    status: 'online'
  },
  {
    name: 'Bernardo Dominic',
    role: 'Lead Developer',
    image: 'https://primefaces.org/cdn/primevue/images/avatar/bernardodominic.png',
    initials: 'BD',
    status: 'busy'
  },
  {
    name: 'Elwin Sharvill',
    role: 'Architect',
    image: 'https://primefaces.org/cdn/primevue/images/avatar/elwinsharvill.png',
    initials: 'ES',
    status: 'offline'
  },
  {
    name: 'Ioni Bowcher',
    role: 'QA Engineer',
    image: 'https://primefaces.org/cdn/primevue/images/avatar/ionibowcher.png',
    initials: 'IB',
    status: 'online'
  }
]);

const getStatusColor = (status: string) => {
  switch (status) {
    case 'online': return 'bg-green-500';
    case 'away': return 'bg-yellow-500';
    case 'busy': return 'bg-red-500';
    case 'offline': return 'bg-gray-400';
    default: return 'bg-gray-400';
  }
};

const getRandomColor = () => {
  const colors = [
    '#6366f1', '#8b5cf6', '#ec4899', '#ef4444', '#f59e0b', '#10b981', '#06b6d4', '#3b82f6'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};
</script>

<template>
  <div class="p-6 space-y-8">
    <!-- Header -->
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-4">
        <Icon name="pi:user" size="32" class="text-primary-500" />
        <div class="flex flex-col">
          <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0">
            Avatar
          </h1>
          <p class="text-surface-600 dark:text-surface-300">
            Avatar represents people using icons, labels and images.
          </p>
        </div>
      </div>
    </div>

    <!-- Label Avatars -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Label Avatars
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        A letter Avatar is defined with the label property and can be customized with different sizes, shapes, and colors.
      </p>
      
      <div class="card space-y-6">
        <!-- Square Label Avatars -->
        <div>
          <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">Square</h3>
          <div class="flex items-center gap-4 flex-wrap">
            <Avatar label="P" size="xlarge" />
            <Avatar label="V" size="large" style="background-color: #ece9fc; color: #2a1261" />
            <Avatar label="U" style="background-color: #dee9fc; color: #1a2551" />
            <OverlayBadge value="4" severity="danger" class="inline-flex">
              <Avatar label="U" size="xlarge" />
            </OverlayBadge>
          </div>
        </div>

        <!-- Circle Label Avatars -->
        <div>
          <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">Circle</h3>
          <div class="flex items-center gap-4 flex-wrap">
            <Avatar label="P" size="xlarge" shape="circle" />
            <Avatar label="V" size="large" style="background-color: #ece9fc; color: #2a1261" shape="circle" />
            <Avatar label="U" style="background-color: #dee9fc; color: #1a2551" shape="circle" />
            <OverlayBadge value="4" severity="danger" class="inline-flex">
              <Avatar label="U" size="xlarge" shape="circle" />
            </OverlayBadge>
          </div>
        </div>
      </div>
    </div>

    <!-- Icon Avatars -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Icon Avatars
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        A font icon is displayed as an Avatar with the icon property.
      </p>
      
      <div class="card space-y-6">
        <!-- Square Icon Avatars -->
        <div>
          <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">Square</h3>
          <div class="flex items-center gap-4 flex-wrap">
            <Avatar icon="pi pi-user" size="xlarge" />
            <Avatar icon="pi pi-user" size="large" style="background-color: #ece9fc; color: #2a1261" />
            <Avatar icon="pi pi-user" style="background-color: #dee9fc; color: #1a2551" />
            <OverlayBadge value="4" severity="danger" class="inline-flex">
              <Avatar icon="pi pi-user" size="xlarge" />
            </OverlayBadge>
          </div>
        </div>

        <!-- Circle Icon Avatars -->
        <div>
          <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">Circle</h3>
          <div class="flex items-center gap-4 flex-wrap">
            <Avatar icon="pi pi-user" size="xlarge" shape="circle" />
            <Avatar icon="pi pi-user" size="large" style="background-color: #ece9fc; color: #2a1261" shape="circle" />
            <Avatar icon="pi pi-user" style="background-color: #dee9fc; color: #1a2551" shape="circle" />
            <OverlayBadge value="4" severity="danger" class="inline-flex">
              <Avatar icon="pi pi-user" size="xlarge" shape="circle" />
            </OverlayBadge>
          </div>
        </div>

        <!-- Different Icons -->
        <div>
          <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">Different Icons</h3>
          <div class="flex items-center gap-4 flex-wrap">
            <Avatar icon="pi pi-user" size="large" shape="circle" />
            <Avatar icon="pi pi-cog" size="large" shape="circle" style="background-color: #f59e0b; color: white" />
            <Avatar icon="pi pi-heart" size="large" shape="circle" style="background-color: #ec4899; color: white" />
            <Avatar icon="pi pi-star" size="large" shape="circle" style="background-color: #8b5cf6; color: white" />
            <Avatar icon="pi pi-shield" size="large" shape="circle" style="background-color: #10b981; color: white" />
          </div>
        </div>
      </div>
    </div>

    <!-- Image Avatars -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Image Avatars
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Use the image property to display an image as an Avatar.
      </p>
      
      <div class="card space-y-6">
        <!-- Basic Image Avatars -->
        <div>
          <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">Basic</h3>
          <div class="flex items-center gap-4 flex-wrap">
            <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" size="xlarge" shape="circle" />
            <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/asiyajavayant.png" size="large" shape="circle" />
            <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png" shape="circle" />
          </div>
        </div>

        <!-- Image with Badge -->
        <div>
          <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">With Badge</h3>
          <div class="flex items-center gap-4 flex-wrap">
            <OverlayBadge value="4" severity="danger" class="inline-flex">
              <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/walter.jpg" size="xlarge" shape="circle" />
            </OverlayBadge>
            <OverlayBadge value="2" severity="success" class="inline-flex">
              <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" size="large" shape="circle" />
            </OverlayBadge>
          </div>
        </div>

        <!-- Fallback with Gravatar -->
        <div>
          <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">External Images</h3>
          <div class="flex items-center gap-4 flex-wrap">
            <Avatar image="https://www.gravatar.com/avatar/05dfd4b41340d09cae045235eb0893c3?d=mp" size="xlarge" shape="circle" />
            <Avatar image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" size="large" shape="circle" />
            <Avatar image="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face" shape="circle" />
          </div>
        </div>
      </div>
    </div>

    <!-- Avatar Group -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Avatar Group
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Grouping is available by wrapping multiple Avatar components inside an AvatarGroup.
      </p>
      
      <div class="card space-y-6">
        <!-- Basic Group -->
        <div>
          <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">Basic Group</h3>
          <AvatarGroup>
            <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
            <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/asiyajavayant.png" shape="circle" />
            <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png" shape="circle" />
            <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/ionibowcher.png" shape="circle" />
            <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/xuxuefeng.png" shape="circle" />
            <Avatar label="+2" shape="circle" />
          </AvatarGroup>
        </div>

        <!-- Large Group -->
        <div>
          <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">Large Group</h3>
          <AvatarGroup>
            <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" size="large" />
            <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/asiyajavayant.png" shape="circle" size="large" />
            <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png" shape="circle" size="large" />
            <Avatar label="+5" shape="circle" size="large" />
          </AvatarGroup>
        </div>

        <!-- Mixed Content Group -->
        <div>
          <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">Mixed Content</h3>
          <AvatarGroup>
            <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
            <Avatar label="JD" shape="circle" style="background-color: #6366f1; color: white" />
            <Avatar icon="pi pi-user" shape="circle" style="background-color: #10b981; color: white" />
            <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/asiyajavayant.png" shape="circle" />
            <Avatar label="+3" shape="circle" style="background-color: #6b7280; color: white" />
          </AvatarGroup>
        </div>
      </div>
    </div>

    <!-- Sizes -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Avatar Sizes
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Avatar provides different size options: small, normal, large, and xlarge.
      </p>
      
      <div class="card space-y-6">
        <!-- Label Sizes -->
        <div>
          <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">Label Sizes</h3>
          <div class="flex items-center gap-4 flex-wrap">
            <Avatar label="S" size="small" shape="circle" />
            <Avatar label="N" size="normal" shape="circle" />
            <Avatar label="L" size="large" shape="circle" />
            <Avatar label="XL" size="xlarge" shape="circle" />
          </div>
        </div>

        <!-- Icon Sizes -->
        <div>
          <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">Icon Sizes</h3>
          <div class="flex items-center gap-4 flex-wrap">
            <Avatar icon="pi pi-user" size="small" shape="circle" />
            <Avatar icon="pi pi-user" size="normal" shape="circle" />
            <Avatar icon="pi pi-user" size="large" shape="circle" />
            <Avatar icon="pi pi-user" size="xlarge" shape="circle" />
          </div>
        </div>

        <!-- Image Sizes -->
        <div>
          <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">Image Sizes</h3>
          <div class="flex items-center gap-4 flex-wrap">
            <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" size="small" shape="circle" />
            <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" size="normal" shape="circle" />
            <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" size="large" shape="circle" />
            <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" size="xlarge" shape="circle" />
          </div>
        </div>
      </div>
    </div>

    <!-- Interactive Avatar Builder -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Interactive Avatar Builder
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Customize avatar properties to see different combinations.
      </p>
      
      <div class="card">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium text-surface-700 dark:text-surface-300">Type</label>
            <Select v-model="customType" :options="typeOptions" option-label="label" option-value="value" />
          </div>
          
          <div v-if="customType === 'label'" class="flex flex-col gap-2">
            <label class="text-sm font-medium text-surface-700 dark:text-surface-300">Label</label>
            <InputText v-model="customLabel" />
          </div>
          
          <div v-if="customType === 'icon'" class="flex flex-col gap-2">
            <label class="text-sm font-medium text-surface-700 dark:text-surface-300">Icon</label>
            <InputText v-model="customIcon" placeholder="pi pi-user" />
          </div>
          
          <div v-if="customType === 'image'" class="flex flex-col gap-2">
            <label class="text-sm font-medium text-surface-700 dark:text-surface-300">Image URL</label>
            <InputText v-model="customImage" />
          </div>
          
          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium text-surface-700 dark:text-surface-300">Size</label>
            <Select v-model="customSize" :options="sizeOptions" option-label="label" option-value="value" />
          </div>
          
          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium text-surface-700 dark:text-surface-300">Shape</label>
            <Select v-model="customShape" :options="shapeOptions" option-label="label" option-value="value" />
          </div>
          
          <div v-if="customType !== 'image'" class="flex flex-col gap-2">
            <label class="text-sm font-medium text-surface-700 dark:text-surface-300">Background Color</label>
            <InputText v-model="customBackgroundColor" />
          </div>
          
          <div v-if="customType !== 'image'" class="flex flex-col gap-2">
            <label class="text-sm font-medium text-surface-700 dark:text-surface-300">Text Color</label>
            <InputText v-model="customTextColor" />
          </div>
          
          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium text-surface-700 dark:text-surface-300">Badge</label>
            <div class="flex items-center mt-2">
              <Checkbox v-model="customBadge" input-id="badge" :binary="true" />
              <label for="badge" class="ml-2">Enable badge</label>
            </div>
          </div>
          
          <div v-if="customBadge" class="flex flex-col gap-2">
            <label class="text-sm font-medium text-surface-700 dark:text-surface-300">Badge Value</label>
            <InputText v-model="customBadgeValue" />
          </div>
        </div>
        
        <div class="bg-surface-50 dark:bg-surface-800 p-4 rounded-lg">
          <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">Preview</h3>
          <div class="flex justify-center">
            <OverlayBadge v-if="customBadge" :value="customBadgeValue" severity="danger" class="inline-flex">
              <Avatar 
                v-if="customType === 'label'"
                :label="customLabel"
                :size="customSize !== 'normal' ? customSize : undefined"
                :shape="customShape !== 'square' ? customShape : undefined"
                :style="{ 
                  backgroundColor: customBackgroundColor, 
                  color: customTextColor 
                }"
              />
              <Avatar 
                v-else-if="customType === 'icon'"
                :icon="customIcon"
                :size="customSize !== 'normal' ? customSize : undefined"
                :shape="customShape !== 'square' ? customShape : undefined"
                :style="{ 
                  backgroundColor: customBackgroundColor, 
                  color: customTextColor 
                }"
              />
              <Avatar 
                v-else
                :image="customImage"
                :size="customSize !== 'normal' ? customSize : undefined"
                :shape="customShape !== 'square' ? customShape : undefined"
              />
            </OverlayBadge>
            <Avatar 
              v-else-if="customType === 'label'"
              :label="customLabel"
              :size="customSize !== 'normal' ? customSize : undefined"
              :shape="customShape !== 'square' ? customShape : undefined"
              :style="{ 
                backgroundColor: customBackgroundColor, 
                color: customTextColor 
              }"
            />
            <Avatar 
              v-else-if="customType === 'icon'"
              :icon="customIcon"
              :size="customSize !== 'normal' ? customSize : undefined"
              :shape="customShape !== 'square' ? customShape : undefined"
              :style="{ 
                backgroundColor: customBackgroundColor, 
                color: customTextColor 
              }"
            />
            <Avatar 
              v-else
              :image="customImage"
              :size="customSize !== 'normal' ? customSize : undefined"
              :shape="customShape !== 'square' ? customShape : undefined"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- User Gallery -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        User Gallery
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Real-world examples of avatars in user interfaces with status indicators.
      </p>
      
      <div class="card">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="user in users" :key="user.name" class="flex items-center gap-4 p-4 border border-surface-200 dark:border-surface-700 rounded-lg">
            <div class="relative">
              <Avatar :image="user.image" size="large" shape="circle" />
              <div class="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-surface-800" :class="getStatusColor(user.status)"></div>
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="font-semibold text-surface-900 dark:text-surface-0 truncate">{{ user.name }}</h3>
              <p class="text-surface-600 dark:text-surface-300 text-sm truncate">{{ user.role }}</p>
              <p class="text-xs capitalize" :class="`text-${user.status === 'online' ? 'green' : user.status === 'away' ? 'yellow' : user.status === 'busy' ? 'red' : 'gray'}-600`">{{ user.status }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Random Avatar Generator -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Random Avatar Generator
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Generate random avatars with different styles and colors.
      </p>
      
      <div class="card">
        <div class="flex justify-center mb-6">
          <Button label="Generate Random Avatars" @click="$forceUpdate()" />
        </div>
        
        <div class="flex justify-center gap-4 flex-wrap">
          <Avatar 
            v-for="i in 8" 
            :key="`random-${i}`"
            :label="String.fromCharCode(65 + Math.floor(Math.random() * 26))"
            size="large"
            shape="circle"
            :style="{ 
              backgroundColor: getRandomColor(), 
              color: 'white' 
            }"
          />
        </div>
      </div>
    </div>

    <!-- Accessibility -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Accessibility Features
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Avatar component supports screen readers and keyboard navigation when needed.
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
                <li>• No default roles or attributes - customizable via props</li>
                <li>• Add <code class="bg-blue-100 dark:bg-blue-800 px-1 rounded">role="img"</code> with <code class="bg-blue-100 dark:bg-blue-800 px-1 rounded">aria-label</code> for screen readers</li>
                <li>• Use <code class="bg-blue-100 dark:bg-blue-800 px-1 rounded">tabindex</code> for keyboard navigation when interactive</li>
                <li>• All attributes pass through to the root element</li>
                <li>• Consider color contrast when customizing colors</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>