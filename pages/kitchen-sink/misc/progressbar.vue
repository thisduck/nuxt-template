<script setup lang="ts">
useSeoMeta({
  title: 'ProgressBar - Kitchen Sink',
  description: 'ProgressBar is a process status indicator.'
});

const dynamicValue = ref(0);
const templateValue = ref(40);
const fileUploadProgress = ref(67);
const taskProgress = ref(85);
const downloadProgress = ref(23);

const intervalId = ref(null);

onMounted(() => {
  intervalId.value = setInterval(() => {
    dynamicValue.value = dynamicValue.value >= 100 ? 0 : dynamicValue.value + 10;
  }, 1000);
});

onUnmounted(() => {
  if (intervalId.value) {
    clearInterval(intervalId.value);
  }
});

function simulateUpload() {
  const uploadInterval = setInterval(() => {
    if (fileUploadProgress.value >= 100) {
      clearInterval(uploadInterval);
      setTimeout(() => {
        fileUploadProgress.value = 0;
      }, 1000);
    } else {
      fileUploadProgress.value += Math.random() * 15;
    }
  }, 300);
}

function simulateTask() {
  taskProgress.value = 0;
  const taskInterval = setInterval(() => {
    if (taskProgress.value >= 100) {
      clearInterval(taskInterval);
      setTimeout(() => {
        taskProgress.value = 85;
      }, 1000);
    } else {
      taskProgress.value += Math.random() * 10;
    }
  }, 200);
}

function simulateDownload() {
  const downloadInterval = setInterval(() => {
    if (downloadProgress.value >= 100) {
      clearInterval(downloadInterval);
      setTimeout(() => {
        downloadProgress.value = 23;
      }, 1000);
    } else {
      downloadProgress.value += Math.random() * 8;
    }
  }, 250);
}
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <div class="p-6 bg-surface-0 dark:bg-surface-900 border-b border-surface-200 dark:border-surface-700">
      <div class="max-w-4xl mx-auto">
        <div class="flex items-center gap-4 mb-4">
          <Icon name="lucide:activity" size="32" class="text-primary-500" />
          <div>
            <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0 mb-2">ProgressBar</h1>
            <p class="text-surface-600 dark:text-surface-300">ProgressBar is a process status indicator.</p>
          </div>
        </div>
      </div>
    </div>

    <div class="flex-1 overflow-auto">
      <div class="max-w-4xl mx-auto p-6 space-y-8">
        <section>
          <h2 class="text-2xl font-bold mb-4 text-surface-900 dark:text-surface-0">Basic</h2>
          <p class="text-surface-600 dark:text-surface-400 mb-4">
            ProgressBar is used with the value property.
          </p>
          <div class="border border-surface-200 dark:border-surface-700 rounded-lg p-6 space-y-4">
            <div>
              <p class="mb-2 text-surface-700 dark:text-surface-300">50% Progress</p>
              <ProgressBar :value="50" />
            </div>
            <div>
              <p class="mb-2 text-surface-700 dark:text-surface-300">75% Progress</p>
              <ProgressBar :value="75" />
            </div>
            <div>
              <p class="mb-2 text-surface-700 dark:text-surface-300">100% Complete</p>
              <ProgressBar :value="100" />
            </div>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4 text-surface-900 dark:text-surface-0">Dynamic</h2>
          <p class="text-surface-600 dark:text-surface-400 mb-4">
            Value is reactive so updating it dynamically changes the bar as well.
          </p>
          <div class="border border-surface-200 dark:border-surface-700 rounded-lg p-6">
            <p class="mb-2 text-surface-700 dark:text-surface-300">Auto-incrementing progress</p>
            <ProgressBar :value="dynamicValue" />
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4 text-surface-900 dark:text-surface-0">Template</h2>
          <p class="text-surface-600 dark:text-surface-400 mb-4">
            Custom content inside the ProgressBar is defined with the default slot.
          </p>
          <div class="border border-surface-200 dark:border-surface-700 rounded-lg p-6 space-y-4">
            <div>
              <p class="mb-2 text-surface-700 dark:text-surface-300">Progress with value display</p>
              <ProgressBar :value="templateValue">
                {{ templateValue }}/100
              </ProgressBar>
            </div>
            <div>
              <p class="mb-2 text-surface-700 dark:text-surface-300">Progress with percentage</p>
              <ProgressBar :value="67">
                {{ Math.round(67) }}%
              </ProgressBar>
            </div>
            <div>
              <p class="mb-2 text-surface-700 dark:text-surface-300">Progress with status</p>
              <ProgressBar :value="85">
                <template v-if="85 < 50">
                  <span class="text-red-600">Needs Attention</span>
                </template>
                <template v-else-if="85 < 80">
                  <span class="text-yellow-600">In Progress</span>
                </template>
                <template v-else>
                  <span class="text-green-600">Almost Complete</span>
                </template>
              </ProgressBar>
            </div>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4 text-surface-900 dark:text-surface-0">Indeterminate</h2>
          <p class="text-surface-600 dark:text-surface-400 mb-4">
            For progresses with no value to track, set the mode property to indeterminate.
          </p>
          <div class="border border-surface-200 dark:border-surface-700 rounded-lg p-6 space-y-6">
            <div>
              <p class="mb-2 text-surface-700 dark:text-surface-300">Loading...</p>
              <ProgressBar mode="indeterminate" style="height: 6px" />
            </div>
            <div>
              <p class="mb-2 text-surface-700 dark:text-surface-300">Processing data...</p>
              <ProgressBar mode="indeterminate" style="height: 8px" />
            </div>
            <div>
              <p class="mb-2 text-surface-700 dark:text-surface-300">Synchronizing...</p>
              <ProgressBar mode="indeterminate" style="height: 10px" />
            </div>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4 text-surface-900 dark:text-surface-0">Real-World Examples</h2>
          
          <div class="space-y-6">
            <div>
              <h3 class="text-xl font-semibold mb-3 text-surface-800 dark:text-surface-200">File Upload</h3>
              <Card>
                <template #content>
                  <div class="space-y-4">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-3">
                        <Icon name="lucide:upload" size="20" class="text-primary-500" />
                        <div>
                          <p class="font-medium">document.pdf</p>
                          <p class="text-sm text-surface-500 dark:text-surface-400">2.4 MB</p>
                        </div>
                      </div>
                      <Button @click="simulateUpload" size="small" severity="secondary">
                        Start Upload
                      </Button>
                    </div>
                    <ProgressBar :value="fileUploadProgress">
                      {{ Math.round(fileUploadProgress) }}% uploaded
                    </ProgressBar>
                  </div>
                </template>
              </Card>
            </div>

            <div>
              <h3 class="text-xl font-semibold mb-3 text-surface-800 dark:text-surface-200">Task Completion</h3>
              <Card>
                <template #content>
                  <div class="space-y-4">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-3">
                        <Icon name="lucide:check-square" size="20" class="text-primary-500" />
                        <div>
                          <p class="font-medium">Project Milestone</p>
                          <p class="text-sm text-surface-500 dark:text-surface-400">Development Sprint #3</p>
                        </div>
                      </div>
                      <Button @click="simulateTask" size="small" severity="secondary">
                        Update Progress
                      </Button>
                    </div>
                    <ProgressBar :value="taskProgress">
                      <template v-if="taskProgress < 25">
                        <span class="text-red-600">Just Started</span>
                      </template>
                      <template v-else-if="taskProgress < 50">
                        <span class="text-orange-600">Getting There</span>
                      </template>
                      <template v-else-if="taskProgress < 75">
                        <span class="text-yellow-600">Half Way</span>
                      </template>
                      <template v-else-if="taskProgress < 100">
                        <span class="text-blue-600">Almost Done</span>
                      </template>
                      <template v-else>
                        <span class="text-green-600">Complete!</span>
                      </template>
                    </ProgressBar>
                  </div>
                </template>
              </Card>
            </div>

            <div>
              <h3 class="text-xl font-semibold mb-3 text-surface-800 dark:text-surface-200">Download Progress</h3>
              <Card>
                <template #content>
                  <div class="space-y-4">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-3">
                        <Icon name="lucide:download" size="20" class="text-primary-500" />
                        <div>
                          <p class="font-medium">software-update.zip</p>
                          <p class="text-sm text-surface-500 dark:text-surface-400">152.7 MB</p>
                        </div>
                      </div>
                      <Button @click="simulateDownload" size="small" severity="secondary">
                        Download
                      </Button>
                    </div>
                    <ProgressBar :value="downloadProgress" style="height: 8px">
                      {{ Math.round(downloadProgress) }}% - {{ Math.round((downloadProgress / 100) * 152.7) }} MB
                    </ProgressBar>
                  </div>
                </template>
              </Card>
            </div>

            <div>
              <h3 class="text-xl font-semibold mb-3 text-surface-800 dark:text-surface-200">System Status</h3>
              <Card>
                <template #content>
                  <div class="space-y-6">
                    <div>
                      <div class="flex items-center justify-between mb-2">
                        <span class="font-medium">CPU Usage</span>
                        <span class="text-sm text-surface-600 dark:text-surface-400">34%</span>
                      </div>
                      <ProgressBar :value="34" />
                    </div>
                    <div>
                      <div class="flex items-center justify-between mb-2">
                        <span class="font-medium">Memory Usage</span>
                        <span class="text-sm text-surface-600 dark:text-surface-400">67%</span>
                      </div>
                      <ProgressBar :value="67" />
                    </div>
                    <div>
                      <div class="flex items-center justify-between mb-2">
                        <span class="font-medium">Disk Usage</span>
                        <span class="text-sm text-surface-600 dark:text-surface-400">89%</span>
                      </div>
                      <ProgressBar :value="89" />
                    </div>
                    <div>
                      <div class="flex items-center justify-between mb-2">
                        <span class="font-medium">Network Activity</span>
                        <span class="text-sm text-surface-600 dark:text-surface-400">Loading...</span>
                      </div>
                      <ProgressBar mode="indeterminate" style="height: 6px" />
                    </div>
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