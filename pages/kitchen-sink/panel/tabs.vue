<script setup lang="ts">
import { ref } from 'vue';

const value = ref('0');

const tabs = ref([
  { title: 'Tab 1', value: '0', content: 'Tab 1 Content' },
  { title: 'Tab 2', value: '1', content: 'Tab 2 Content' },
  { title: 'Tab 3', value: '2', content: 'Tab 3 Content' }
]);

const scrollableTabs = ref(
  Array.from({ length: 50 }, (_, i) => ({
    title: `Tab ${i + 1}`,
    value: String(i),
    content: `Tab ${i + 1} Content`
  }))
);

const items = ref([
  { label: 'Dashboard', route: '/dashboard', icon: 'pi pi-chart-bar' },
  { label: 'Transactions', route: '/transactions', icon: 'pi pi-credit-card' },
  { label: 'Products', route: '/products', icon: 'pi pi-box' },
  { label: 'Messages', route: '/messages', icon: 'pi pi-envelope' }
]);
</script>

<template>
  <div class="p-6 space-y-8">
    <!-- Header -->
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-4">
        <Icon name="pi:clone" size="32" class="text-primary-500" />
        <div class="flex flex-col">
          <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0">
            Tabs
          </h1>
          <p class="text-surface-600 dark:text-surface-300">
            Tabs facilitates seamless switching between different views.
          </p>
        </div>
      </div>
    </div>

    <!-- Basic Tabs -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Basic Tabs
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Tabs is defined using TabList, Tab, TabPanels and TabPanel components.
      </p>
      
      <div class="card">
        <Tabs value="0">
          <TabList>
            <Tab value="0">Header I</Tab>
            <Tab value="1">Header II</Tab>
            <Tab value="2">Header III</Tab>
          </TabList>
          <TabPanels>
            <TabPanel value="0">
              <p class="m-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </TabPanel>
            <TabPanel value="1">
              <p class="m-0">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
                ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
              </p>
            </TabPanel>
            <TabPanel value="2">
              <p class="m-0">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa
                qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
              </p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>

    <!-- Dynamic Tabs -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Dynamic Tabs
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Tabs can be generated dynamically using the standard v-for directive.
      </p>
      
      <div class="card">
        <Tabs value="0">
          <TabList>
            <Tab v-for="tab in tabs" :key="tab.title" :value="tab.value">{{ tab.title }}</Tab>
          </TabList>
          <TabPanels>
            <TabPanel v-for="tab in tabs" :key="tab.content" :value="tab.value">
              <p class="m-0">{{ tab.content }}</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>

    <!-- Controlled Tabs -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Controlled Tabs
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Tabs can be controlled programmatically using value property as a model.
      </p>
      
      <div class="card">
        <div class="flex mb-2 gap-2 justify-end">
          <Button @click="value = '0'" rounded label="1" class="w-8 h-8 p-0" :outlined="value !== '0'" />
          <Button @click="value = '1'" rounded label="2" class="w-8 h-8 p-0" :outlined="value !== '1'" />
          <Button @click="value = '2'" rounded label="3" class="w-8 h-8 p-0" :outlined="value !== '2'" />
        </div>

        <Tabs v-model:value="value">
          <TabList>
            <Tab value="0">Header I</Tab>
            <Tab value="1">Header II</Tab>
            <Tab value="2">Header III</Tab>
          </TabList>
          <TabPanels>
            <TabPanel value="0">
              <p class="m-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </TabPanel>
            <TabPanel value="1">
              <p class="m-0">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
                ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
              </p>
            </TabPanel>
            <TabPanel value="2">
              <p class="m-0">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa
                qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
              </p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>

    <!-- Scrollable Tabs -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Scrollable Tabs
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Adding scrollable property displays navigational buttons at each side to scroll between tabs.
      </p>
      
      <div class="card">
        <Tabs value="0" scrollable class="w-full max-w-2xl">
          <TabList>
            <Tab v-for="tab in scrollableTabs" :key="tab.title" :value="tab.value">
              {{ tab.title }}
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel v-for="tab in scrollableTabs" :key="tab.content" :value="tab.value">
              <p class="m-0">{{ tab.content }}</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>

    <!-- Disabled Tabs -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Disabled Tabs
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Enabling disabled property of a Tab prevents user interaction.
      </p>
      
      <div class="card">
        <Tabs value="0">
          <TabList>
            <Tab value="0">Header I</Tab>
            <Tab value="1">Header II</Tab>
            <Tab value="2">Header III</Tab>
            <Tab disabled>Header IV</Tab>
          </TabList>
          <TabPanels>
            <TabPanel value="0">
              <p class="m-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </TabPanel>
            <TabPanel value="1">
              <p class="m-0">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
                ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
              </p>
            </TabPanel>
            <TabPanel value="2">
              <p class="m-0">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa
                qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
              </p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>

    <!-- Custom Template -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Custom Template
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Custom content for a tab is defined with the default slot using as and asChild properties.
      </p>
      
      <div class="card">
        <Tabs value="0">
          <TabList>
            <Tab value="0" as="div" class="flex items-center gap-2">
              <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
              <span class="font-bold whitespace-nowrap">Amy Elsner</span>
            </Tab>
            <Tab value="1" as="div" class="flex items-center gap-2">
              <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png" shape="circle" />
              <span class="font-bold whitespace-nowrap">Onyama Limba</span>
            </Tab>
            <Tab v-slot="slotProps" value="2" asChild>
              <div :class="['flex items-center gap-2', slotProps.class]" @click="slotProps.onClick" v-bind="slotProps.a11yAttrs">
                <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/ionibowcher.png" shape="circle" />
                <span class="font-bold whitespace-nowrap">Ioni Bowcher</span>
                <Badge value="2" />
              </div>
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel value="0" as="p" class="m-0">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </TabPanel>
            <TabPanel value="1" as="p" class="m-0">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
              ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
            </TabPanel>
            <TabPanel v-slot="slotProps" value="2" asChild>
              <div v-show="slotProps.active" :class="slotProps.class" v-bind="slotProps.a11yAttrs">
                <p class="m-0">
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in
                  culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
                </p>
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>

    <!-- Tab Menu -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Tab Menu
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        A navigation menu is implemented using tabs without the panels for routing purposes.
      </p>
      
      <div class="card">
        <Tabs value="/dashboard">
          <TabList>
            <Tab v-for="tab in items" :key="tab.label" :value="tab.route">
              <div class="flex items-center gap-2 text-inherit">
                <i :class="tab.icon" />
                <span>{{ tab.label }}</span>
              </div>
            </Tab>
          </TabList>
        </Tabs>
      </div>
    </div>

    <!-- Practical Example -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Practical Example
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        A real-world example showing different content types in tabs.
      </p>
      
      <div class="card">
        <Tabs value="profile">
          <TabList>
            <Tab value="profile">
              <div class="flex items-center gap-2">
                <i class="pi pi-user" />
                <span>Profile</span>
              </div>
            </Tab>
            <Tab value="settings">
              <div class="flex items-center gap-2">
                <i class="pi pi-cog" />
                <span>Settings</span>
              </div>
            </Tab>
            <Tab value="notifications">
              <div class="flex items-center gap-2">
                <i class="pi pi-bell" />
                <span>Notifications</span>
                <Badge value="3" severity="danger" />
              </div>
            </Tab>
            <Tab value="security">
              <div class="flex items-center gap-2">
                <i class="pi pi-shield" />
                <span>Security</span>
              </div>
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel value="profile">
              <div class="space-y-4">
                <div class="flex items-center gap-4">
                  <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" size="large" shape="circle" />
                  <div>
                    <h3 class="text-xl font-semibold mb-2">Amy Elsner</h3>
                    <p class="text-surface-600 dark:text-surface-300">Software Engineer</p>
                  </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium mb-2">Email</label>
                    <InputText value="amy@example.com" fluid />
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-2">Phone</label>
                    <InputText value="+1 234 567 8900" fluid />
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-2">Location</label>
                    <InputText value="New York, NY" fluid />
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-2">Website</label>
                    <InputText value="https://amy.dev" fluid />
                  </div>
                </div>
              </div>
            </TabPanel>
            
            <TabPanel value="settings">
              <div class="space-y-6">
                <div>
                  <h4 class="text-lg font-semibold mb-4">General Settings</h4>
                  <div class="space-y-4">
                    <div class="flex items-center justify-between">
                      <label class="font-medium">Email Notifications</label>
                      <ToggleSwitch />
                    </div>
                    <div class="flex items-center justify-between">
                      <label class="font-medium">Dark Mode</label>
                      <ToggleSwitch />
                    </div>
                    <div class="flex items-center justify-between">
                      <label class="font-medium">Auto-save</label>
                      <ToggleSwitch />
                    </div>
                  </div>
                </div>
                <div>
                  <h4 class="text-lg font-semibold mb-4">Privacy</h4>
                  <div class="space-y-4">
                    <div class="flex items-center justify-between">
                      <label class="font-medium">Public Profile</label>
                      <ToggleSwitch />
                    </div>
                    <div class="flex items-center justify-between">
                      <label class="font-medium">Show Activity Status</label>
                      <ToggleSwitch />
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>
            
            <TabPanel value="notifications">
              <div class="space-y-4">
                <div class="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <i class="pi pi-info-circle text-blue-500 mt-1" />
                  <div class="flex-1">
                    <h5 class="font-medium text-blue-900 dark:text-blue-100">Profile Update</h5>
                    <p class="text-sm text-blue-700 dark:text-blue-200 mt-1">Your profile has been successfully updated.</p>
                    <span class="text-xs text-blue-600 dark:text-blue-300">2 minutes ago</span>
                  </div>
                </div>
                
                <div class="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <i class="pi pi-check-circle text-green-500 mt-1" />
                  <div class="flex-1">
                    <h5 class="font-medium text-green-900 dark:text-green-100">Security Alert</h5>
                    <p class="text-sm text-green-700 dark:text-green-200 mt-1">Your password was changed successfully.</p>
                    <span class="text-xs text-green-600 dark:text-green-300">1 hour ago</span>
                  </div>
                </div>
                
                <div class="flex items-start gap-3 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <i class="pi pi-exclamation-triangle text-orange-500 mt-1" />
                  <div class="flex-1">
                    <h5 class="font-medium text-orange-900 dark:text-orange-100">Payment Due</h5>
                    <p class="text-sm text-orange-700 dark:text-orange-200 mt-1">Your subscription payment is due in 3 days.</p>
                    <span class="text-xs text-orange-600 dark:text-orange-300">Yesterday</span>
                  </div>
                </div>
              </div>
            </TabPanel>
            
            <TabPanel value="security">
              <div class="space-y-6">
                <div>
                  <h4 class="text-lg font-semibold mb-4">Password</h4>
                  <div class="space-y-4">
                    <div>
                      <label class="block text-sm font-medium mb-2">Current Password</label>
                      <Password placeholder="Enter current password" fluid />
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-2">New Password</label>
                      <Password placeholder="Enter new password" fluid />
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-2">Confirm Password</label>
                      <Password placeholder="Confirm new password" fluid />
                    </div>
                    <Button label="Update Password" />
                  </div>
                </div>
                
                <div>
                  <h4 class="text-lg font-semibold mb-4">Two-Factor Authentication</h4>
                  <div class="flex items-center justify-between p-4 border border-surface-200 dark:border-surface-700 rounded-lg">
                    <div>
                      <p class="font-medium">Authenticator App</p>
                      <p class="text-sm text-surface-600 dark:text-surface-300">Use an authenticator app to generate codes</p>
                    </div>
                    <Button label="Enable" outlined />
                  </div>
                </div>
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  </div>
</template>