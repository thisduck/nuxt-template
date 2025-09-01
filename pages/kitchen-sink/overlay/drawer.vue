<script setup lang="ts">
import { ref } from 'vue';

const basicVisible = ref(false);
const positionVisible = ref(false);
const visibleLeft = ref(false);
const visibleRight = ref(false);
const visibleTop = ref(false);
const visibleBottom = ref(false);
const sizeVisible = ref(false);
const fullscreenVisible = ref(false);
const templateVisible = ref(false);
const headlessVisible = ref(false);

const position = ref('left');

function openPosition(pos: string) {
  position.value = pos;
  if (pos === 'left') visibleLeft.value = true;
  if (pos === 'right') visibleRight.value = true;
  if (pos === 'top') visibleTop.value = true;
  if (pos === 'bottom') visibleBottom.value = true;
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
            Drawer
          </h1>
          <p class="text-surface-600 dark:text-surface-300">
            Drawer is a container component displayed as an overlay.
          </p>
        </div>
      </div>
    </div>

    <!-- Basic Drawer -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Basic Usage
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Drawer is used as a container and visibility is controlled with a binding to visible.
      </p>
      
      <div class="card flex justify-center">
        <Drawer v-model:visible="basicVisible" header="Basic Drawer">
          <p class="text-surface-700 dark:text-surface-300 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p class="text-surface-700 dark:text-surface-300 leading-relaxed mt-4">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </Drawer>
        <Button icon="pi pi-arrow-right" label="Show Drawer" @click="basicVisible = true" />
      </div>
    </div>

    <!-- Position -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Position Options
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Drawer location is configured with the position property that can take left, right, top and bottom as valid values.
      </p>
      
      <div class="card">
        <div class="flex gap-2 justify-center mb-6">
          <Button icon="pi pi-arrow-right" label="Left" @click="openPosition('left')" />
          <Button icon="pi pi-arrow-left" label="Right" @click="openPosition('right')" />
          <Button icon="pi pi-arrow-down" label="Top" @click="openPosition('top')" />
          <Button icon="pi pi-arrow-up" label="Bottom" @click="openPosition('bottom')" />
        </div>

        <Drawer v-model:visible="visibleLeft" header="Left Drawer">
          <p class="text-surface-700 dark:text-surface-300 leading-relaxed">
            This drawer slides in from the left side. Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </Drawer>

        <Drawer v-model:visible="visibleRight" header="Right Drawer" position="right">
          <p class="text-surface-700 dark:text-surface-300 leading-relaxed">
            This drawer slides in from the right side. Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </Drawer>

        <Drawer v-model:visible="visibleTop" header="Top Drawer" position="top" style="height: auto">
          <p class="text-surface-700 dark:text-surface-300 leading-relaxed">
            This drawer slides in from the top. Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </Drawer>

        <Drawer v-model:visible="visibleBottom" header="Bottom Drawer" position="bottom" style="height: auto">
          <p class="text-surface-700 dark:text-surface-300 leading-relaxed">
            This drawer slides in from the bottom. Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </Drawer>
      </div>
    </div>

    <!-- Size Configuration -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Responsive Sizing
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Drawer dimension can be defined with style or class properties, this responsive example utilizes Tailwind.
      </p>
      
      <div class="card flex justify-center">
        <Drawer v-model:visible="sizeVisible" header="Responsive Drawer" class="!w-full md:!w-80 lg:!w-[30rem]">
          <p class="text-surface-700 dark:text-surface-300 leading-relaxed">
            This drawer has responsive sizing:
          </p>
          <ul class="list-disc list-inside mt-4 space-y-2 text-surface-700 dark:text-surface-300">
            <li>Full width on mobile devices</li>
            <li>320px width (w-80) on medium screens and up</li>
            <li>480px width (30rem) on large screens and up</li>
          </ul>
          <p class="text-surface-700 dark:text-surface-300 leading-relaxed mt-4">
            Resize your browser window to see the responsive behavior in action.
          </p>
        </Drawer>
        <Button icon="pi pi-arrow-right" label="Show Responsive Drawer" @click="sizeVisible = true" />
      </div>
    </div>

    <!-- Full Screen -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Full Screen Mode
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        The full screen mode is enabled when position property is set as 'full'.
      </p>
      
      <div class="card flex justify-center">
        <Drawer v-model:visible="fullscreenVisible" header="Full Screen Drawer" position="full">
          <div class="space-y-6">
            <p class="text-surface-700 dark:text-surface-300 leading-relaxed text-lg">
              This drawer takes up the entire screen, providing a full overlay experience.
            </p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-4">
                <h3 class="text-xl font-semibold text-surface-800 dark:text-surface-100">Features</h3>
                <ul class="list-disc list-inside space-y-2 text-surface-700 dark:text-surface-300">
                  <li>Complete screen coverage</li>
                  <li>Perfect for detailed forms</li>
                  <li>Ideal for complex workflows</li>
                  <li>Maximum content visibility</li>
                </ul>
              </div>
              
              <div class="space-y-4">
                <h3 class="text-xl font-semibold text-surface-800 dark:text-surface-100">Use Cases</h3>
                <ul class="list-disc list-inside space-y-2 text-surface-700 dark:text-surface-300">
                  <li>Settings panels</li>
                  <li>Data entry forms</li>
                  <li>Document editors</li>
                  <li>Media viewers</li>
                </ul>
              </div>
            </div>

            <div class="flex gap-2 pt-4">
              <Button label="Save Changes" icon="pi pi-check" />
              <Button label="Cancel" icon="pi pi-times" severity="secondary" @click="fullscreenVisible = false" />
            </div>
          </div>
        </Drawer>
        <Button icon="pi pi-window-maximize" label="Show Full Screen" @click="fullscreenVisible = true" />
      </div>
    </div>

    <!-- Custom Template -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Custom Header & Footer Templates
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Custom content at the header and footer sections is displayed with templating.
      </p>
      
      <div class="card flex justify-center">
        <Drawer v-model:visible="templateVisible">
          <template #header>
            <div class="flex items-center gap-3">
              <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
              <div>
                <div class="font-bold text-surface-900 dark:text-surface-0">Amy Elsner</div>
                <div class="text-sm text-surface-600 dark:text-surface-400">Product Manager</div>
              </div>
            </div>
          </template>
          
          <div class="space-y-4">
            <p class="text-surface-700 dark:text-surface-300 leading-relaxed">
              Welcome to your personalized dashboard. Here you can manage your account settings, 
              view your activity, and access important features.
            </p>
            
            <div class="space-y-3">
              <div class="flex items-center gap-3 p-3 bg-surface-50 dark:bg-surface-800 rounded-lg">
                <i class="pi pi-bell text-primary-500"></i>
                <div>
                  <div class="font-medium text-surface-900 dark:text-surface-0">Notifications</div>
                  <div class="text-sm text-surface-600 dark:text-surface-400">3 unread messages</div>
                </div>
              </div>
              
              <div class="flex items-center gap-3 p-3 bg-surface-50 dark:bg-surface-800 rounded-lg">
                <i class="pi pi-chart-line text-success-500"></i>
                <div>
                  <div class="font-medium text-surface-900 dark:text-surface-0">Analytics</div>
                  <div class="text-sm text-surface-600 dark:text-surface-400">View your performance data</div>
                </div>
              </div>
            </div>
          </div>
          
          <template #footer>
            <div class="flex gap-2">
              <Button label="Account Settings" icon="pi pi-user" class="flex-1" severity="secondary" />
              <Button label="Sign Out" icon="pi pi-sign-out" class="flex-1" severity="danger" text />
            </div>
          </template>
        </Drawer>
        <Button icon="pi pi-user" label="Show User Panel" @click="templateVisible = true" />
      </div>
    </div>

    <!-- Headless Mode -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Headless Mode
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Headless mode is enabled by defining a container slot that lets you implement entire UI instead of the default elements.
      </p>
      
      <div class="card flex justify-center">
        <Drawer v-model:visible="headlessVisible">
          <template #container="{ closeCallback }">
            <div class="flex flex-col h-full bg-gradient-to-br from-primary-50 to-primary-100 dark:from-surface-900 dark:to-surface-800">
              <!-- Custom Header -->
              <div class="flex items-center justify-between p-6 border-b border-surface-200 dark:border-surface-700">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                    <Icon name="lucide:bolt" size="20" class="text-white" />
                  </div>
                  <div>
                    <div class="font-bold text-lg text-surface-900 dark:text-surface-0">Navigation Menu</div>
                    <div class="text-sm text-surface-600 dark:text-surface-400">Custom sidebar design</div>
                  </div>
                </div>
                <Button 
                  type="button" 
                  @click="closeCallback" 
                  icon="pi pi-times" 
                  rounded 
                  text
                  class="w-8 h-8"
                />
              </div>
              
              <!-- Navigation Content -->
              <div class="flex-1 overflow-y-auto p-4">
                <div class="space-y-6">
                  <!-- Primary Navigation -->
                  <div>
                    <h3 class="text-xs font-semibold text-surface-500 dark:text-surface-400 uppercase tracking-wider mb-3">Main</h3>
                    <div class="space-y-1">
                      <a class="flex items-center gap-3 p-3 rounded-lg text-surface-700 hover:bg-surface-100 dark:text-surface-300 dark:hover:bg-surface-700 transition-colors cursor-pointer">
                        <i class="pi pi-home w-5"></i>
                        <span class="font-medium">Dashboard</span>
                      </a>
                      <a class="flex items-center gap-3 p-3 rounded-lg text-surface-700 hover:bg-surface-100 dark:text-surface-300 dark:hover:bg-surface-700 transition-colors cursor-pointer">
                        <i class="pi pi-chart-line w-5"></i>
                        <span class="font-medium">Analytics</span>
                        <Badge value="New" severity="success" class="ml-auto" />
                      </a>
                      <a class="flex items-center gap-3 p-3 rounded-lg text-surface-700 hover:bg-surface-100 dark:text-surface-300 dark:hover:bg-surface-700 transition-colors cursor-pointer">
                        <i class="pi pi-users w-5"></i>
                        <span class="font-medium">Team</span>
                      </a>
                      <a class="flex items-center gap-3 p-3 rounded-lg text-surface-700 hover:bg-surface-100 dark:text-surface-300 dark:hover:bg-surface-700 transition-colors cursor-pointer">
                        <i class="pi pi-folder w-5"></i>
                        <span class="font-medium">Projects</span>
                        <span class="ml-auto text-sm text-surface-500">12</span>
                      </a>
                    </div>
                  </div>
                  
                  <!-- Secondary Navigation -->
                  <div>
                    <h3 class="text-xs font-semibold text-surface-500 dark:text-surface-400 uppercase tracking-wider mb-3">Tools</h3>
                    <div class="space-y-1">
                      <a class="flex items-center gap-3 p-3 rounded-lg text-surface-700 hover:bg-surface-100 dark:text-surface-300 dark:hover:bg-surface-700 transition-colors cursor-pointer">
                        <i class="pi pi-calendar w-5"></i>
                        <span class="font-medium">Calendar</span>
                      </a>
                      <a class="flex items-center gap-3 p-3 rounded-lg text-surface-700 hover:bg-surface-100 dark:text-surface-300 dark:hover:bg-surface-700 transition-colors cursor-pointer">
                        <i class="pi pi-envelope w-5"></i>
                        <span class="font-medium">Messages</span>
                        <Badge value="5" severity="danger" class="ml-auto" />
                      </a>
                      <a class="flex items-center gap-3 p-3 rounded-lg text-surface-700 hover:bg-surface-100 dark:text-surface-300 dark:hover:bg-surface-700 transition-colors cursor-pointer">
                        <i class="pi pi-cog w-5"></i>
                        <span class="font-medium">Settings</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Custom Footer -->
              <div class="p-4 border-t border-surface-200 dark:border-surface-700">
                <div class="flex items-center gap-3 p-3 rounded-lg bg-surface-100 dark:bg-surface-700">
                  <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" size="small" />
                  <div class="flex-1">
                    <div class="text-sm font-medium text-surface-900 dark:text-surface-0">Amy Elsner</div>
                    <div class="text-xs text-surface-600 dark:text-surface-400">amy@example.com</div>
                  </div>
                  <Button icon="pi pi-sign-out" text rounded size="small" />
                </div>
              </div>
            </div>
          </template>
        </Drawer>
        <Button icon="pi pi-bars" label="Show Custom Navigation" @click="headlessVisible = true" />
      </div>
    </div>
  </div>
</template>