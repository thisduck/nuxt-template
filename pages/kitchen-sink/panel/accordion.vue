<script setup lang="ts">
// Basic accordion state
const basicValue = ref('0');

// Dynamic tabs data
const dynamicTabs = ref([
  { 
    title: 'Title 1', 
    value: '0', 
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' 
  },
  { 
    title: 'Title 2', 
    value: '1', 
    content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.' 
  },
  { 
    title: 'Title 3', 
    value: '2', 
    content: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti.' 
  }
]);

// Multiple selection state
const multipleValue = ref(['0']);

// Controlled accordion state
const controlledValue = ref('0');

// Custom template data
const customPanels = ref([
  {
    value: '0',
    name: 'Amy Elsner',
    avatar: 'amyelsner.png',
    badge: 3,
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    value: '1',
    name: 'Onyama Limba',
    avatar: 'onyamalimba.png',
    badge: 4,
    content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.'
  },
  {
    value: '2',
    name: 'Ioni Bowcher',
    avatar: 'ionibowcher.png',
    badge: 2,
    content: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti.'
  }
]);

// FAQ data for real-world example
const faqItems = ref([
  {
    value: '0',
    question: 'What is PrimeVue?',
    answer: 'PrimeVue is a comprehensive UI component library for Vue.js applications. It offers 90+ components, 50+ themes, and various templates to accelerate development.',
    category: 'General'
  },
  {
    value: '1',
    question: 'Is PrimeVue free to use?',
    answer: 'Yes, PrimeVue is open source and free to use under the MIT license. There are also premium templates and themes available for purchase.',
    category: 'Licensing'
  },
  {
    value: '2',
    question: 'Does PrimeVue support TypeScript?',
    answer: 'Yes, PrimeVue has full TypeScript support with type definitions for all components, making it ideal for TypeScript projects.',
    category: 'Technical'
  },
  {
    value: '3',
    question: 'Can I use PrimeVue with Nuxt?',
    answer: 'Absolutely! PrimeVue has excellent integration with Nuxt through the official @primevue/nuxt-module, providing auto-imports and SSR support.',
    category: 'Integration'
  },
  {
    value: '4',
    question: 'How can I customize PrimeVue themes?',
    answer: 'PrimeVue offers multiple theming options including built-in themes, a Theme Designer tool, and CSS variables for easy customization.',
    category: 'Styling'
  }
]);
</script>

<template>
  <div class="p-6 lg:p-8 flex flex-col gap-8">
    <!-- Header -->
    <div class="flex flex-col gap-3 border-b border-surface-200 dark:border-surface-700 pb-6">
      <div class="flex items-center gap-3">
        <i class="pi pi-bars text-3xl text-primary-500" />
        <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0">
          Accordion
        </h1>
      </div>
      <p class="text-surface-600 dark:text-surface-300 max-w-3xl">
        Accordion groups a collection of contents in panels. It provides expandable/collapsible sections for organizing content in a compact way.
      </p>
    </div>

    <!-- Basic -->
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-2">
        <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
          Basic
        </h2>
        <Tag value="Most Common" severity="success" />
      </div>
      <p class="text-surface-600 dark:text-surface-300">
        Accordion is defined using AccordionPanel, AccordionHeader and AccordionContent components.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <Accordion v-model:value="basicValue">
          <AccordionPanel value="0">
            <AccordionHeader>Header I</AccordionHeader>
            <AccordionContent>
              <p class="m-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
            </AccordionContent>
          </AccordionPanel>
          <AccordionPanel value="1">
            <AccordionHeader>Header II</AccordionHeader>
            <AccordionContent>
              <p class="m-0">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, 
                eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. 
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.
              </p>
            </AccordionContent>
          </AccordionPanel>
          <AccordionPanel value="2">
            <AccordionHeader>Header III</AccordionHeader>
            <AccordionContent>
              <p class="m-0">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti 
                quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia 
                deserunt mollitia animi, id est laborum et dolorum fuga.
              </p>
            </AccordionContent>
          </AccordionPanel>
        </Accordion>
      </div>
    </div>

    <!-- Dynamic -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Dynamic
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        AccordionPanel can be generated dynamically using the standard v-for directive.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <Accordion value="0">
          <AccordionPanel v-for="tab in dynamicTabs" :key="tab.title" :value="tab.value">
            <AccordionHeader>{{ tab.title }}</AccordionHeader>
            <AccordionContent>
              <p class="m-0">{{ tab.content }}</p>
            </AccordionContent>
          </AccordionPanel>
        </Accordion>
      </div>
    </div>

    <!-- Multiple -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Multiple
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Multiple panels can be expanded at the same time by enabling the multiple property.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="mb-4 p-3 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-lg">
          <span class="text-sm text-blue-700 dark:text-blue-200">
            Multiple panels can be open. Currently open: {{ multipleValue.join(', ') }}
          </span>
        </div>
        
        <Accordion v-model:value="multipleValue" multiple>
          <AccordionPanel value="0">
            <AccordionHeader>Header I</AccordionHeader>
            <AccordionContent>
              <p class="m-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </AccordionContent>
          </AccordionPanel>
          <AccordionPanel value="1">
            <AccordionHeader>Header II</AccordionHeader>
            <AccordionContent>
              <p class="m-0">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.
              </p>
            </AccordionContent>
          </AccordionPanel>
          <AccordionPanel value="2">
            <AccordionHeader>Header III</AccordionHeader>
            <AccordionContent>
              <p class="m-0">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti.
              </p>
            </AccordionContent>
          </AccordionPanel>
        </Accordion>
      </div>
    </div>

    <!-- Disabled -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Disabled
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Individual panels can be disabled to prevent user interaction.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <Accordion :value="['0']" multiple>
          <AccordionPanel value="0">
            <AccordionHeader>Header I (Enabled)</AccordionHeader>
            <AccordionContent>
              <p class="m-0">
                This panel is enabled and can be toggled normally.
              </p>
            </AccordionContent>
          </AccordionPanel>
          <AccordionPanel value="1">
            <AccordionHeader>Header II (Enabled)</AccordionHeader>
            <AccordionContent>
              <p class="m-0">
                This panel is also enabled and functional.
              </p>
            </AccordionContent>
          </AccordionPanel>
          <AccordionPanel value="2" disabled>
            <AccordionHeader>Header III (Disabled)</AccordionHeader>
            <AccordionContent>
              <p class="m-0">
                This content cannot be accessed.
              </p>
            </AccordionContent>
          </AccordionPanel>
          <AccordionPanel value="3" disabled>
            <AccordionHeader>Header IV (Disabled)</AccordionHeader>
            <AccordionContent>
              <p class="m-0">
                This content is also inaccessible.
              </p>
            </AccordionContent>
          </AccordionPanel>
        </Accordion>
      </div>
    </div>

    <!-- Controlled -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Controlled
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Panels can be controlled programmatically using the value property as a model.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex mb-4 gap-2 justify-end">
          <Button 
            @click="controlledValue = '0'" 
            rounded 
            label="1" 
            class="w-10 h-10 p-0" 
            :variant="controlledValue !== '0' ? 'outlined' : undefined"
          />
          <Button 
            @click="controlledValue = '1'" 
            rounded 
            label="2" 
            class="w-10 h-10 p-0" 
            :variant="controlledValue !== '1' ? 'outlined' : undefined"
          />
          <Button 
            @click="controlledValue = '2'" 
            rounded 
            label="3" 
            class="w-10 h-10 p-0" 
            :variant="controlledValue !== '2' ? 'outlined' : undefined"
          />
        </div>

        <Accordion v-model:value="controlledValue">
          <AccordionPanel value="0">
            <AccordionHeader>Panel 1</AccordionHeader>
            <AccordionContent>
              <p class="m-0">
                Content for panel 1. Use the buttons above to switch between panels programmatically.
              </p>
            </AccordionContent>
          </AccordionPanel>
          <AccordionPanel value="1">
            <AccordionHeader>Panel 2</AccordionHeader>
            <AccordionContent>
              <p class="m-0">
                Content for panel 2. The active panel is controlled by the value model.
              </p>
            </AccordionContent>
          </AccordionPanel>
          <AccordionPanel value="2">
            <AccordionHeader>Panel 3</AccordionHeader>
            <AccordionContent>
              <p class="m-0">
                Content for panel 3. Only one panel can be active at a time in this mode.
              </p>
            </AccordionContent>
          </AccordionPanel>
        </Accordion>
      </div>
    </div>

    <!-- Custom Template -->
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-2">
        <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
          Custom Template
        </h2>
        <Tag value="Advanced" severity="info" />
      </div>
      <p class="text-surface-600 dark:text-surface-300">
        Custom content for headers with avatars, badges, and custom expand/collapse icons.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <Accordion value="0" expandIcon="pi pi-plus" collapseIcon="pi pi-minus">
          <AccordionPanel v-for="panel in customPanels" :key="panel.value" :value="panel.value">
            <AccordionHeader>
              <span class="flex items-center gap-2 w-full">
                <Avatar 
                  :label="panel.name.split(' ').map(n => n[0]).join('')" 
                  shape="circle" 
                  :style="{ backgroundColor: '#' + Math.floor(Math.random()*16777215).toString(16) }"
                />
                <span class="font-bold whitespace-nowrap">{{ panel.name }}</span>
                <Badge :value="panel.badge" class="ml-auto mr-2" />
              </span>
            </AccordionHeader>
            <AccordionContent>
              <p class="m-0">{{ panel.content }}</p>
            </AccordionContent>
          </AccordionPanel>
        </Accordion>
      </div>
    </div>

    <!-- FAQ Example -->
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-2">
        <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
          FAQ Example
        </h2>
        <Tag value="Real World" severity="warn" />
      </div>
      <p class="text-surface-600 dark:text-surface-300">
        Real-world example of an FAQ section using accordions with categories and rich content.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="mb-6">
          <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-0 mb-2">
            Frequently Asked Questions
          </h3>
          <p class="text-surface-600 dark:text-surface-300">
            Find answers to common questions about PrimeVue
          </p>
        </div>

        <Accordion value="0">
          <AccordionPanel v-for="item in faqItems" :key="item.value" :value="item.value">
            <AccordionHeader>
              <div class="flex items-center gap-3 w-full">
                <i class="pi pi-question-circle text-primary-500" />
                <div class="flex-1">
                  <div class="font-semibold">{{ item.question }}</div>
                  <div class="text-sm text-surface-500 dark:text-surface-400 mt-1">{{ item.category }}</div>
                </div>
              </div>
            </AccordionHeader>
            <AccordionContent>
              <div class="pl-9">
                <p class="text-surface-700 dark:text-surface-200">{{ item.answer }}</p>
                <div class="mt-4 flex gap-2">
                  <Button label="Helpful" icon="pi pi-thumbs-up" size="small" variant="outlined" />
                  <Button label="Not Helpful" icon="pi pi-thumbs-down" size="small" variant="outlined" />
                </div>
              </div>
            </AccordionContent>
          </AccordionPanel>
        </Accordion>
      </div>
    </div>

    <!-- Settings Example -->
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-2">
        <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
          Settings Panel
        </h2>
        <Tag value="Interactive" severity="danger" />
      </div>
      <p class="text-surface-600 dark:text-surface-300">
        Complex example with form controls inside accordion panels.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <Accordion :value="['0']" multiple>
          <AccordionPanel value="0">
            <AccordionHeader>
              <span class="flex items-center gap-2">
                <i class="pi pi-user text-primary-500" />
                <span class="font-semibold">Account Settings</span>
              </span>
            </AccordionHeader>
            <AccordionContent>
              <div class="flex flex-col gap-4 p-2">
                <div class="flex flex-col gap-2">
                  <label class="font-medium text-surface-700 dark:text-surface-200">Display Name</label>
                  <InputText placeholder="Enter your display name" />
                </div>
                <div class="flex flex-col gap-2">
                  <label class="font-medium text-surface-700 dark:text-surface-200">Email</label>
                  <InputText type="email" placeholder="your@email.com" />
                </div>
                <div class="flex items-center gap-2">
                  <Checkbox inputId="newsletter" />
                  <label for="newsletter">Subscribe to newsletter</label>
                </div>
              </div>
            </AccordionContent>
          </AccordionPanel>

          <AccordionPanel value="1">
            <AccordionHeader>
              <span class="flex items-center gap-2">
                <i class="pi pi-bell text-primary-500" />
                <span class="font-semibold">Notifications</span>
              </span>
            </AccordionHeader>
            <AccordionContent>
              <div class="flex flex-col gap-4 p-2">
                <div class="flex items-center justify-between">
                  <span>Email Notifications</span>
                  <ToggleSwitch />
                </div>
                <div class="flex items-center justify-between">
                  <span>Push Notifications</span>
                  <ToggleSwitch />
                </div>
                <div class="flex items-center justify-between">
                  <span>SMS Notifications</span>
                  <ToggleSwitch />
                </div>
              </div>
            </AccordionContent>
          </AccordionPanel>

          <AccordionPanel value="2">
            <AccordionHeader>
              <span class="flex items-center gap-2">
                <i class="pi pi-lock text-primary-500" />
                <span class="font-semibold">Privacy & Security</span>
              </span>
            </AccordionHeader>
            <AccordionContent>
              <div class="flex flex-col gap-4 p-2">
                <div class="flex items-center justify-between">
                  <span>Two-Factor Authentication</span>
                  <Button label="Enable" size="small" />
                </div>
                <div class="flex items-center justify-between">
                  <span>Session Timeout</span>
                  <Select :options="['15 minutes', '30 minutes', '1 hour', 'Never']" placeholder="Select" />
                </div>
                <div class="flex items-center gap-2">
                  <Checkbox inputId="public-profile" />
                  <label for="public-profile">Make profile public</label>
                </div>
              </div>
            </AccordionContent>
          </AccordionPanel>
        </Accordion>
      </div>
    </div>

    <!-- Styled Variants -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Styled Variants
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Different visual styles achieved through custom CSS classes.
      </p>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Bordered Style -->
        <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
          <h4 class="font-semibold text-surface-900 dark:text-surface-0 mb-4">Bordered Style</h4>
          <Accordion value="0" class="accordion-bordered">
            <AccordionPanel value="0">
              <AccordionHeader>Section 1</AccordionHeader>
              <AccordionContent>
                <p class="m-0">Content with bordered style</p>
              </AccordionContent>
            </AccordionPanel>
            <AccordionPanel value="1">
              <AccordionHeader>Section 2</AccordionHeader>
              <AccordionContent>
                <p class="m-0">Another section with borders</p>
              </AccordionContent>
            </AccordionPanel>
          </Accordion>
        </div>

        <!-- Filled Style -->
        <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
          <h4 class="font-semibold text-surface-900 dark:text-surface-0 mb-4">Filled Style</h4>
          <Accordion value="0" class="accordion-filled">
            <AccordionPanel value="0">
              <AccordionHeader>Section 1</AccordionHeader>
              <AccordionContent>
                <p class="m-0">Content with filled background</p>
              </AccordionContent>
            </AccordionPanel>
            <AccordionPanel value="1">
              <AccordionHeader>Section 2</AccordionHeader>
              <AccordionContent>
                <p class="m-0">Another section with background</p>
              </AccordionContent>
            </AccordionPanel>
          </Accordion>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* Bordered accordion style */
.accordion-bordered .p-accordionpanel {
  border: 1px solid var(--p-accordion-panel-border-color);
  border-radius: 8px;
  margin-bottom: 0.5rem;
}

/* Filled accordion style */
.accordion-filled .p-accordionheader-toggle {
  background-color: var(--p-surface-100);
}

.dark .accordion-filled .p-accordionheader-toggle {
  background-color: var(--p-surface-800);
}

.accordion-filled .p-accordionheader-toggle:not(.p-disabled):hover {
  background-color: var(--p-surface-200);
}

.dark .accordion-filled .p-accordionheader-toggle:not(.p-disabled):hover {
  background-color: var(--p-surface-700);
}
</style>