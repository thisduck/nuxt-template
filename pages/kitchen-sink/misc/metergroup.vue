<script setup lang="ts">
useSeoMeta({
  title: 'MeterGroup - Kitchen Sink',
  description: 'MeterGroup displays scalar measurements within a known range.',
});

const basicMeter = ref([
  { label: 'Space used', value: 15, color: '#34d399' },
]);

const multipleMeters = ref([
  { label: 'Apps', value: 16, color: '#60a5fa' },
  { label: 'Messages', value: 8, color: '#34d399' },
  { label: 'Media', value: 24, color: '#fbbf24' },
  { label: 'System', value: 10, color: '#f87171' },
]);

const iconMeters = ref([
  { label: 'Apps', value: 16, color: '#60a5fa', icon: 'pi pi-table' },
  { label: 'Messages', value: 8, color: '#34d399', icon: 'pi pi-inbox' },
  { label: 'Media', value: 24, color: '#fbbf24', icon: 'pi pi-image' },
  { label: 'System', value: 10, color: '#f87171', icon: 'pi pi-cog' },
]);

const verticalMeters = ref([
  { label: 'Apps', value: 24, color: '#60a5fa' },
  { label: 'Messages', value: 16, color: '#34d399' },
  { label: 'Media', value: 24, color: '#fbbf24' },
  { label: 'System', value: 12, color: '#f87171' },
]);

const minMaxMeters = ref([
  { label: 'Apps', value: 8, color: '#60a5fa' },
  { label: 'Messages', value: 4, color: '#34d399' },
  { label: 'Media', value: 12, color: '#fbbf24' },
  { label: 'System', value: 5, color: '#f87171' },
]);

const templateMeters = ref([
  {
    label: 'Apps',
    value: 25,
    color1: '#60a5fa',
    color2: '#3b82f6',
    icon: 'pi pi-table',
  },
  {
    label: 'Messages',
    value: 15,
    color1: '#34d399',
    color2: '#10b981',
    icon: 'pi pi-inbox',
  },
  {
    label: 'Media',
    value: 20,
    color1: '#fbbf24',
    color2: '#f59e0b',
    icon: 'pi pi-image',
  },
  {
    label: 'System',
    value: 10,
    color1: '#f87171',
    color2: '#ef4444',
    icon: 'pi pi-cog',
  },
]);

const serverMetrics = ref([
  { label: 'CPU Usage', value: 65, color: '#ef4444' },
  { label: 'Memory', value: 45, color: '#f59e0b' },
  { label: 'Disk I/O', value: 25, color: '#10b981' },
]);

const projectProgress = ref([
  { label: 'Design', value: 100, color: '#10b981' },
  { label: 'Development', value: 75, color: '#3b82f6' },
  { label: 'Testing', value: 30, color: '#f59e0b' },
  { label: 'Deployment', value: 5, color: '#ef4444' },
]);

const salesData = ref([
  { label: 'Q1', value: 85, color: '#10b981' },
  { label: 'Q2', value: 92, color: '#3b82f6' },
  { label: 'Q3', value: 78, color: '#f59e0b' },
  { label: 'Q4', value: 95, color: '#8b5cf6' },
]);

const budgetAllocation = ref([
  { label: 'Marketing', value: 30, color: '#3b82f6', icon: 'pi pi-megaphone' },
  { label: 'Development', value: 25, color: '#10b981', icon: 'pi pi-code' },
  { label: 'Operations', value: 20, color: '#f59e0b', icon: 'pi pi-cog' },
  { label: 'Support', value: 15, color: '#8b5cf6', icon: 'pi pi-question-circle' },
  { label: 'Other', value: 10, color: '#6b7280', icon: 'pi pi-ellipsis-h' },
]);
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <div class="p-6 bg-surface-0 dark:bg-surface-900 border-b border-surface-200 dark:border-surface-700">
      <div class="max-w-4xl mx-auto">
        <div class="flex items-center gap-4 mb-4">
          <Icon name="lucide:bar-chart" size="32" class="text-primary-500" />
          <div>
            <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0 mb-2">
              MeterGroup
            </h1>
            <p class="text-surface-600 dark:text-surface-300">
              MeterGroup displays scalar measurements within a known range.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="flex-1 overflow-auto">
      <div class="max-w-4xl mx-auto p-6 space-y-8">
        <section>
          <h2 class="text-2xl font-bold mb-4 text-surface-900 dark:text-surface-0">
            Basic
          </h2>
          <p class="text-surface-600 dark:text-surface-400 mb-4">
            MeterGroup requires a value as the data to display where each item should be a MeterItem.
          </p>
          <div class="border border-surface-200 dark:border-surface-700 rounded-lg p-6">
            <MeterGroup :value="basicMeter" />
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4 text-surface-900 dark:text-surface-0">
            Multiple
          </h2>
          <p class="text-surface-600 dark:text-surface-400 mb-4">
            Adding more items to the array displays the meters in a group.
          </p>
          <div class="border border-surface-200 dark:border-surface-700 rounded-lg p-6">
            <MeterGroup :value="multipleMeters" />
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4 text-surface-900 dark:text-surface-0">
            Icon
          </h2>
          <p class="text-surface-600 dark:text-surface-400 mb-4">
            Icons can be displayed next to the labels instead of the default marker.
          </p>
          <div class="border border-surface-200 dark:border-surface-700 rounded-lg p-6">
            <MeterGroup :value="iconMeters" />
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4 text-surface-900 dark:text-surface-0">
            Label Position
          </h2>
          <p class="text-surface-600 dark:text-surface-400 mb-4">
            The position of the labels relative to the meters is defined using the labelPosition property.
            The labelOrientation option controls horizontal or vertical layout.
          </p>
          <div class="border border-surface-200 dark:border-surface-700 rounded-lg p-6">
            <MeterGroup :value="iconMeters" label-position="start" label-orientation="vertical" />
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4 text-surface-900 dark:text-surface-0">
            Vertical
          </h2>
          <p class="text-surface-600 dark:text-surface-400 mb-4">
            Layout of the MeterGroup is configured with the orientation property that accepts either horizontal or vertical.
          </p>
          <div class="border border-surface-200 dark:border-surface-700 rounded-lg p-6 flex justify-center">
            <MeterGroup :value="verticalMeters" orientation="vertical" label-orientation="vertical" />
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4 text-surface-900 dark:text-surface-0">
            Min-Max
          </h2>
          <p class="text-surface-600 dark:text-surface-400 mb-4">
            Boundaries are configured with the min and max values whose defaults are 0 and 100 respectively.
          </p>
          <div class="border border-surface-200 dark:border-surface-700 rounded-lg p-6">
            <p class="text-sm text-surface-600 dark:text-surface-400 mb-4">
              Max value set to 200
            </p>
            <MeterGroup :value="minMaxMeters" :max="200" />
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4 text-surface-900 dark:text-surface-0">
            Template
          </h2>
          <p class="text-surface-600 dark:text-surface-400 mb-4">
            MeterGroup provides templating support for labels, meter items, and content around the meters.
          </p>
          <div class="border border-surface-200 dark:border-surface-700 rounded-lg p-6">
            <MeterGroup :value="templateMeters" label-position="start">
              <template #label="{ value }">
                <div class="flex flex-wrap gap-4">
                  <div v-for="val of value" :key="val.label" class="flex-1 min-w-[200px]">
                    <Card class="border border-surface-200 dark:border-surface-700 shadow-none">
                      <template #content>
                        <div class="flex justify-between gap-4 items-center">
                          <div class="flex flex-col gap-1">
                            <span class="text-surface-500 dark:text-surface-400 text-sm">{{ val.label }}</span>
                            <span class="font-bold text-lg">{{ val.value }}%</span>
                          </div>
                          <span
                            class="w-8 h-8 rounded-full inline-flex justify-center items-center text-white text-sm"
                            :style="{ backgroundColor: val.color1 }"
                          >
                            <i :class="val.icon" />
                          </span>
                        </div>
                      </template>
                    </Card>
                  </div>
                </div>
              </template>
              <template #meter="slotProps">
                <span
                  :class="slotProps.class"
                  :style="{
                    background: `linear-gradient(to right, ${slotProps.value.color1}, ${slotProps.value.color2})`,
                    width: slotProps.size,
                  }"
                />
              </template>
              <template #start="{ totalPercent }">
                <div class="flex justify-between mt-4 mb-2 relative">
                  <span>Storage</span>
                  <span :style="{ width: `${totalPercent}%` }" class="absolute text-right">{{ totalPercent }}%</span>
                  <span class="font-medium">1TB</span>
                </div>
              </template>
              <template #end>
                <div class="flex justify-between mt-4">
                  <Button label="Manage Storage" variant="outlined" size="small" />
                  <Button label="Update Plan" size="small" />
                </div>
              </template>
            </MeterGroup>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4 text-surface-900 dark:text-surface-0">
            Real-World Examples
          </h2>

          <div class="space-y-6">
            <div>
              <h3 class="text-xl font-semibold mb-3 text-surface-800 dark:text-surface-200">
                Server Metrics
              </h3>
              <Card>
                <template #content>
                  <div class="space-y-4">
                    <div class="flex items-center gap-2">
                      <Icon name="lucide:server" size="20" class="text-primary-500" />
                      <span class="font-medium">Server Performance</span>
                    </div>
                    <MeterGroup :value="serverMetrics" />
                  </div>
                </template>
              </Card>
            </div>

            <div>
              <h3 class="text-xl font-semibold mb-3 text-surface-800 dark:text-surface-200">
                Project Progress
              </h3>
              <Card>
                <template #content>
                  <div class="space-y-4">
                    <div class="flex items-center gap-2">
                      <Icon name="lucide:trending-up" size="20" class="text-primary-500" />
                      <span class="font-medium">Development Phases</span>
                    </div>
                    <MeterGroup :value="projectProgress" label-position="start" label-orientation="vertical" />
                  </div>
                </template>
              </Card>
            </div>

            <div>
              <h3 class="text-xl font-semibold mb-3 text-surface-800 dark:text-surface-200">
                Sales Performance
              </h3>
              <Card>
                <template #content>
                  <div class="space-y-4">
                    <div class="flex items-center gap-2">
                      <Icon name="lucide:bar-chart-3" size="20" class="text-primary-500" />
                      <span class="font-medium">Quarterly Results</span>
                    </div>
                    <MeterGroup :value="salesData" orientation="vertical" label-orientation="vertical" class="flex justify-center" />
                  </div>
                </template>
              </Card>
            </div>

            <div>
              <h3 class="text-xl font-semibold mb-3 text-surface-800 dark:text-surface-200">
                Budget Allocation
              </h3>
              <Card>
                <template #content>
                  <div class="space-y-4">
                    <div class="flex items-center gap-2">
                      <Icon name="lucide:pie-chart" size="20" class="text-primary-500" />
                      <span class="font-medium">Department Budget</span>
                    </div>
                    <MeterGroup :value="budgetAllocation">
                      <template #start>
                        <div class="text-sm text-surface-600 dark:text-surface-400 mb-2">
                          Total Budget: $500,000
                        </div>
                      </template>
                      <template #end>
                        <div class="text-sm text-surface-600 dark:text-surface-400 mt-2 text-right">
                          Allocated: {{ budgetAllocation.reduce((sum, item) => sum + item.value, 0) }}%
                        </div>
                      </template>
                    </MeterGroup>
                  </div>
                </template>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
