<script setup lang="ts">
// Basic events data
const basicEvents = ref([
  { status: 'Ordered', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0' },
  { status: 'Processing', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' },
  { status: 'Shipped', date: '15/10/2020 16:15', icon: 'pi pi-truck', color: '#FF9800' },
  { status: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' },
]);

// Template events with more details
const templateEvents = ref([
  {
    status: 'Ordered',
    date: '15/10/2020 10:30',
    icon: 'pi pi-shopping-cart',
    color: '#9C27B0',
    image: 'bamboo-watch.jpg',
    description: 'Your order has been placed and is being processed.',
  },
  {
    status: 'Processing',
    date: '15/10/2020 14:00',
    icon: 'pi pi-cog',
    color: '#673AB7',
    image: 'game-controller.jpg',
    description: 'Your order is being prepared for shipment.',
  },
  {
    status: 'Shipped',
    date: '15/10/2020 16:15',
    icon: 'pi pi-truck',
    color: '#FF9800',
    image: 'headphones.jpg',
    description: 'Your package has been shipped and is on its way.',
  },
  {
    status: 'Delivered',
    date: '16/10/2020 10:00',
    icon: 'pi pi-check',
    color: '#607D8B',
    image: 'shoes.jpg',
    description: 'Your package has been delivered successfully.',
  },
]);

// Horizontal timeline events
const yearEvents = ref(['2020', '2021', '2022', '2023', '2024']);

// Project timeline events
const projectEvents = ref([
  {
    status: 'Project Kickoff',
    date: 'Q1 2024',
    icon: 'pi pi-flag',
    color: '#4CAF50',
    team: 'All Teams',
    milestone: 'Initial planning and resource allocation',
    tasks: ['Requirements gathering', 'Team formation', 'Budget approval'],
  },
  {
    status: 'Design Phase',
    date: 'Q2 2024',
    icon: 'pi pi-palette',
    color: '#2196F3',
    team: 'Design Team',
    milestone: 'UI/UX design and prototyping',
    tasks: ['Wireframes', 'Mockups', 'User testing'],
  },
  {
    status: 'Development',
    date: 'Q3 2024',
    icon: 'pi pi-code',
    color: '#FF5722',
    team: 'Development Team',
    milestone: 'Core feature implementation',
    tasks: ['Backend APIs', 'Frontend components', 'Database setup'],
  },
  {
    status: 'Testing',
    date: 'Q4 2024',
    icon: 'pi pi-shield',
    color: '#9C27B0',
    team: 'QA Team',
    milestone: 'Quality assurance and bug fixes',
    tasks: ['Unit testing', 'Integration testing', 'UAT'],
  },
  {
    status: 'Deployment',
    date: 'Q1 2025',
    icon: 'pi pi-cloud-upload',
    color: '#00BCD4',
    team: 'DevOps Team',
    milestone: 'Production deployment',
    tasks: ['Server setup', 'CI/CD pipeline', 'Monitoring'],
  },
]);

// Activity timeline
const activityEvents = ref([
  {
    user: 'John Doe',
    action: 'created a new task',
    time: '2 hours ago',
    icon: 'pi pi-plus',
    color: '#4CAF50',
    details: 'Task: Implement user authentication',
  },
  {
    user: 'Jane Smith',
    action: 'commented on PR #42',
    time: '4 hours ago',
    icon: 'pi pi-comment',
    color: '#2196F3',
    details: 'Looks good to me! Ready to merge.',
  },
  {
    user: 'Bob Johnson',
    action: 'merged pull request',
    time: '6 hours ago',
    icon: 'pi pi-check-circle',
    color: '#9C27B0',
    details: 'PR #41: Add dark mode support',
  },
  {
    user: 'Alice Brown',
    action: 'deployed to production',
    time: '1 day ago',
    icon: 'pi pi-cloud-upload',
    color: '#FF9800',
    details: 'Version 2.1.0 released',
  },
]);
</script>

<template>
  <div class="p-6 lg:p-8 flex flex-col gap-8">
    <!-- Header -->
    <div class="flex flex-col gap-3 border-b border-surface-200 dark:border-surface-700 pb-6">
      <div class="flex items-center gap-3">
        <i class="pi pi-calendar text-3xl text-primary-500" />
        <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0">
          Timeline
        </h1>
      </div>
      <p class="text-surface-600 dark:text-surface-300 max-w-3xl">
        Timeline visualizes a series of chained events. It provides various alignment options, horizontal/vertical layouts, and customizable templates for markers and content.
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
        Timeline requires a value for the collection of events and content slot that receives an object as a parameter.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <Timeline :value="basicEvents">
          <template #content="slotProps">
            {{ slotProps.item.status }}
          </template>
        </Timeline>
      </div>
    </div>

    <!-- Alignment -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Alignment
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Content location relative to the line is defined with the align property.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Left Aligned -->
          <div>
            <h4 class="font-semibold text-surface-900 dark:text-surface-0 mb-4">
              Left (Default)
            </h4>
            <Timeline :value="basicEvents" class="w-full">
              <template #content="slotProps">
                <div class="text-sm">
                  {{ slotProps.item.status }}
                </div>
              </template>
            </Timeline>
          </div>

          <!-- Right Aligned -->
          <div>
            <h4 class="font-semibold text-surface-900 dark:text-surface-0 mb-4">
              Right
            </h4>
            <Timeline :value="basicEvents" align="right" class="w-full">
              <template #content="slotProps">
                <div class="text-sm">
                  {{ slotProps.item.status }}
                </div>
              </template>
            </Timeline>
          </div>

          <!-- Alternate -->
          <div>
            <h4 class="font-semibold text-surface-900 dark:text-surface-0 mb-4">
              Alternate
            </h4>
            <Timeline :value="basicEvents" align="alternate" class="w-full">
              <template #content="slotProps">
                <div class="text-sm">
                  {{ slotProps.item.status }}
                </div>
              </template>
            </Timeline>
          </div>
        </div>
      </div>
    </div>

    <!-- Opposite -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Opposite Content
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Additional content at the other side of the line can be provided with the opposite slot.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <Timeline :value="basicEvents" class="max-w-2xl mx-auto">
          <template #opposite="slotProps">
            <small class="text-surface-500 dark:text-surface-400">{{ slotProps.item.date }}</small>
          </template>
          <template #content="slotProps">
            <div class="font-medium">
              {{ slotProps.item.status }}
            </div>
          </template>
        </Timeline>
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
        Sample implementation with custom content, styled markers, and rich content cards.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <Timeline :value="templateEvents" align="alternate" class="customized-timeline">
          <template #marker="slotProps">
            <span
              class="flex w-12 h-12 items-center justify-center text-white rounded-full z-10 shadow-lg border-4 border-surface-0 dark:border-surface-900"
              :style="{ backgroundColor: slotProps.item.color }"
            >
              <i :class="slotProps.item.icon" />
            </span>
          </template>
          <template #content="slotProps">
            <Card class="mt-4">
              <template #title>
                <div class="flex items-center justify-between">
                  <span>{{ slotProps.item.status }}</span>
                  <Tag
                    :value="slotProps.index === 0 ? 'New' : slotProps.index === templateEvents.length - 1 ? 'Complete' : 'In Progress'"
                    :severity="slotProps.index === 0 ? 'success' : slotProps.index === templateEvents.length - 1 ? 'info' : 'warn'"
                  />
                </div>
              </template>
              <template #subtitle>
                <div class="flex items-center gap-2 text-surface-500 dark:text-surface-400">
                  <i class="pi pi-calendar text-sm" />
                  {{ slotProps.item.date }}
                </div>
              </template>
              <template #content>
                <div class="flex items-center justify-center w-full h-32 bg-surface-100 dark:bg-surface-700 rounded-lg mb-4">
                  <i class="pi pi-image text-4xl text-surface-400" />
                </div>
                <p class="text-surface-600 dark:text-surface-300">
                  {{ slotProps.item.description }}
                </p>
                <div class="mt-4 flex gap-2">
                  <Button label="View Details" size="small" />
                  <Button label="Track Package" variant="outlined" size="small" />
                </div>
              </template>
            </Card>
          </template>
        </Timeline>
      </div>
    </div>

    <!-- Horizontal -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Horizontal Layout
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Timeline orientation is controlled with the layout property. Horizontal timelines work well for year/month progression.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-8">
          <!-- Top Aligned -->
          <div>
            <h4 class="font-semibold text-surface-900 dark:text-surface-0 mb-4">
              Top Aligned
            </h4>
            <Timeline :value="yearEvents" layout="horizontal" align="top">
              <template #content="slotProps">
                <div class="px-3 py-2 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
                  <span class="font-semibold text-primary-700 dark:text-primary-300">{{ slotProps.item }}</span>
                </div>
              </template>
            </Timeline>
          </div>

          <!-- Bottom Aligned -->
          <div>
            <h4 class="font-semibold text-surface-900 dark:text-surface-0 mb-4">
              Bottom Aligned
            </h4>
            <Timeline :value="yearEvents" layout="horizontal" align="bottom">
              <template #content="slotProps">
                <div class="px-3 py-2 bg-surface-100 dark:bg-surface-800 rounded-lg">
                  <span class="font-medium">{{ slotProps.item }}</span>
                </div>
              </template>
            </Timeline>
          </div>

          <!-- Alternate -->
          <div>
            <h4 class="font-semibold text-surface-900 dark:text-surface-0 mb-4">
              Alternate
            </h4>
            <Timeline :value="yearEvents" layout="horizontal" align="alternate">
              <template #opposite>
                &nbsp;
              </template>
              <template #content="slotProps">
                <div class="px-4 py-2 rounded-lg" :class="slotProps.index % 2 === 0 ? 'bg-blue-100 dark:bg-blue-900/20' : 'bg-green-100 dark:bg-green-900/20'">
                  <span class="font-semibold" :class="slotProps.index % 2 === 0 ? 'text-blue-700 dark:text-blue-300' : 'text-green-700 dark:text-green-300'">
                    {{ slotProps.item }}
                  </span>
                </div>
              </template>
            </Timeline>
          </div>
        </div>
      </div>
    </div>

    <!-- Project Timeline Example -->
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-2">
        <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
          Project Timeline
        </h2>
        <Tag value="Real Example" severity="warn" />
      </div>
      <p class="text-surface-600 dark:text-surface-300">
        Real-world example showing project milestones with detailed information.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <Timeline :value="projectEvents" align="alternate">
          <template #marker="slotProps">
            <span
              class="flex w-14 h-14 items-center justify-center text-white rounded-full z-10 shadow-xl border-4 border-surface-0 dark:border-surface-900"
              :style="{ backgroundColor: slotProps.item.color }"
            >
              <i :class="slotProps.item.icon" class="text-xl" />
            </span>
          </template>
          <template #opposite="slotProps">
            <div class="text-right">
              <div class="font-bold text-lg text-surface-900 dark:text-surface-0">
                {{ slotProps.item.date }}
              </div>
              <div class="text-sm text-surface-500 dark:text-surface-400">
                {{ slotProps.item.team }}
              </div>
            </div>
          </template>
          <template #content="slotProps">
            <Card>
              <template #title>
                {{ slotProps.item.status }}
              </template>
              <template #content>
                <p class="mb-4 text-surface-600 dark:text-surface-300">
                  <strong>Milestone:</strong> {{ slotProps.item.milestone }}
                </p>
                <div class="mb-3">
                  <strong class="block mb-2 text-surface-700 dark:text-surface-200">Key Tasks:</strong>
                  <ul class="list-disc list-inside space-y-1">
                    <li v-for="task in slotProps.item.tasks" :key="task" class="text-sm text-surface-600 dark:text-surface-300">
                      {{ task }}
                    </li>
                  </ul>
                </div>
                <ProgressBar :value="(slotProps.index + 1) * 20" :show-value="false" style="height: 6px" />
              </template>
            </Card>
          </template>
        </Timeline>
      </div>
    </div>

    <!-- Activity Feed Example -->
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-2">
        <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
          Activity Feed
        </h2>
        <Tag value="Interactive" severity="danger" />
      </div>
      <p class="text-surface-600 dark:text-surface-300">
        Timeline used as an activity feed showing user actions and updates.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <Timeline :value="activityEvents">
          <template #marker="slotProps">
            <span
              class="flex w-10 h-10 items-center justify-center text-white rounded-full z-10 shadow-md"
              :style="{ backgroundColor: slotProps.item.color }"
            >
              <i :class="slotProps.item.icon" class="text-sm" />
            </span>
          </template>
          <template #content="slotProps">
            <div class="flex flex-col gap-2 pb-4">
              <div class="flex items-center gap-2">
                <Avatar :label="slotProps.item.user.split(' ').map(n => n[0]).join('')" shape="circle" size="small" />
                <div class="flex-1">
                  <div class="flex items-center gap-2 flex-wrap">
                    <span class="font-semibold text-surface-900 dark:text-surface-0">{{ slotProps.item.user }}</span>
                    <span class="text-surface-600 dark:text-surface-300">{{ slotProps.item.action }}</span>
                  </div>
                  <small class="text-surface-500 dark:text-surface-400">{{ slotProps.item.time }}</small>
                </div>
              </div>
              <div class="ml-10 p-3 bg-surface-50 dark:bg-surface-800 rounded-lg">
                <p class="text-sm text-surface-700 dark:text-surface-200">
                  {{ slotProps.item.details }}
                </p>
              </div>
            </div>
          </template>
        </Timeline>
      </div>
    </div>

    <!-- Connector Styles -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Connector Styles
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Different connector line styles can be achieved with CSS customization.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Dashed Line -->
          <div>
            <h4 class="font-semibold text-surface-900 dark:text-surface-0 mb-4">
              Dashed Connector
            </h4>
            <Timeline :value="basicEvents.slice(0, 3)" class="timeline-dashed">
              <template #content="slotProps">
                {{ slotProps.item.status }}
              </template>
            </Timeline>
          </div>

          <!-- Thick Line -->
          <div>
            <h4 class="font-semibold text-surface-900 dark:text-surface-0 mb-4">
              Thick Connector
            </h4>
            <Timeline :value="basicEvents.slice(0, 3)" class="timeline-thick">
              <template #content="slotProps">
                {{ slotProps.item.status }}
              </template>
            </Timeline>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* Custom timeline styles */
.customized-timeline .p-timeline-event-opposite {
  flex: 0 0 auto;
}

.customized-timeline .p-timeline-event-content {
  flex: 1;
}

/* Dashed connector style */
.timeline-dashed .p-timeline-event-connector {
  border-left-style: dashed !important;
}

/* Thick connector style */
.timeline-thick .p-timeline-event-connector {
  border-left-width: 4px !important;
}

/* Horizontal timeline adjustments */
.p-timeline-horizontal .p-timeline-event-content {
  text-align: center;
}
</style>
