<script setup lang="ts">
useSeoMeta({
  title: 'ProgressSpinner - Kitchen Sink',
  description: 'ProgressSpinner is a process status indicator.',
});

const isLoading = ref(false);
const isProcessing = ref(false);
const isSaving = ref(false);

function simulateLoading() {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
  }, 3000);
}

function simulateProcessing() {
  isProcessing.value = true;
  setTimeout(() => {
    isProcessing.value = false;
  }, 4000);
}

function simulateSaving() {
  isSaving.value = true;
  setTimeout(() => {
    isSaving.value = false;
  }, 2000);
}
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <div class="p-6 bg-surface-0 dark:bg-surface-900 border-b border-surface-200 dark:border-surface-700">
      <div class="max-w-4xl mx-auto">
        <div class="flex items-center gap-4 mb-4">
          <Icon name="lucide:loader" size="32" class="text-primary-500" />
          <div>
            <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0 mb-2">
              ProgressSpinner
            </h1>
            <p class="text-surface-600 dark:text-surface-300">
              ProgressSpinner is a process status indicator.
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
            An infinite spin animation is displayed by default.
          </p>
          <div class="border border-surface-200 dark:border-surface-700 rounded-lg p-6">
            <div class="flex items-center justify-center">
              <ProgressSpinner />
            </div>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4 text-surface-900 dark:text-surface-0">
            Custom
          </h2>
          <p class="text-surface-600 dark:text-surface-400 mb-4">
            ProgressSpinner can be customized with styling properties like style, strokeWidth, fill and animationDuration.
          </p>
          <div class="border border-surface-200 dark:border-surface-700 rounded-lg p-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div class="flex flex-col items-center gap-4">
                <ProgressSpinner
                  style="width: 50px; height: 50px"
                  stroke-width="8"
                  fill="transparent"
                  animation-duration=".5s"
                  aria-label="Fast spinner"
                />
                <div>
                  <p class="font-medium">
                    Fast (0.5s)
                  </p>
                  <p class="text-sm text-surface-500 dark:text-surface-400">
                    Thick stroke
                  </p>
                </div>
              </div>
              <div class="flex flex-col items-center gap-4">
                <ProgressSpinner
                  style="width: 60px; height: 60px"
                  stroke-width="4"
                  fill="var(--p-surface-200)"
                  animation-duration="1s"
                  aria-label="Medium spinner"
                />
                <div>
                  <p class="font-medium">
                    Medium (1s)
                  </p>
                  <p class="text-sm text-surface-500 dark:text-surface-400">
                    With background
                  </p>
                </div>
              </div>
              <div class="flex flex-col items-center gap-4">
                <ProgressSpinner
                  style="width: 40px; height: 40px"
                  stroke-width="2"
                  fill="transparent"
                  animation-duration="2s"
                  aria-label="Slow spinner"
                />
                <div>
                  <p class="font-medium">
                    Slow (2s)
                  </p>
                  <p class="text-sm text-surface-500 dark:text-surface-400">
                    Thin stroke
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4 text-surface-900 dark:text-surface-0">
            Sizes
          </h2>
          <p class="text-surface-600 dark:text-surface-400 mb-4">
            Different sizes for various use cases.
          </p>
          <div class="border border-surface-200 dark:border-surface-700 rounded-lg p-6">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div class="flex flex-col items-center gap-4">
                <ProgressSpinner
                  style="width: 20px; height: 20px"
                  stroke-width="3"
                  aria-label="Small spinner"
                />
                <p class="font-medium">
                  Small
                </p>
              </div>
              <div class="flex flex-col items-center gap-4">
                <ProgressSpinner
                  style="width: 32px; height: 32px"
                  stroke-width="4"
                  aria-label="Default spinner"
                />
                <p class="font-medium">
                  Default
                </p>
              </div>
              <div class="flex flex-col items-center gap-4">
                <ProgressSpinner
                  style="width: 48px; height: 48px"
                  stroke-width="4"
                  aria-label="Large spinner"
                />
                <p class="font-medium">
                  Large
                </p>
              </div>
              <div class="flex flex-col items-center gap-4">
                <ProgressSpinner
                  style="width: 64px; height: 64px"
                  stroke-width="5"
                  aria-label="Extra large spinner"
                />
                <p class="font-medium">
                  Extra Large
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4 text-surface-900 dark:text-surface-0">
            Real-World Examples
          </h2>

          <div class="space-y-6">
            <div>
              <h3 class="text-xl font-semibold mb-3 text-surface-800 dark:text-surface-200">
                Loading Content
              </h3>
              <Card>
                <template #content>
                  <div class="space-y-4">
                    <div class="flex items-center justify-between">
                      <div>
                        <h4 class="font-medium">
                          Fetch Data
                        </h4>
                        <p class="text-sm text-surface-500 dark:text-surface-400">
                          Load content from server
                        </p>
                      </div>
                      <Button :disabled="isLoading" @click="simulateLoading">
                        Load Data
                      </Button>
                    </div>
                    <div v-if="isLoading" class="flex items-center justify-center py-8">
                      <div class="flex items-center gap-3">
                        <ProgressSpinner style="width: 24px; height: 24px" />
                        <span class="text-surface-600 dark:text-surface-400">Loading data...</span>
                      </div>
                    </div>
                    <div v-else class="text-center py-4 text-surface-500 dark:text-surface-400">
                      Click "Load Data" to see spinner
                    </div>
                  </div>
                </template>
              </Card>
            </div>

            <div>
              <h3 class="text-xl font-semibold mb-3 text-surface-800 dark:text-surface-200">
                Processing Task
              </h3>
              <Card>
                <template #content>
                  <div class="space-y-4">
                    <div class="flex items-center justify-between">
                      <div>
                        <h4 class="font-medium">
                          Process Images
                        </h4>
                        <p class="text-sm text-surface-500 dark:text-surface-400">
                          Compress and optimize images
                        </p>
                      </div>
                      <Button :disabled="isProcessing" severity="secondary" @click="simulateProcessing">
                        Start Processing
                      </Button>
                    </div>
                    <div v-if="isProcessing" class="flex items-center justify-center py-8">
                      <div class="flex items-center gap-3">
                        <ProgressSpinner
                          style="width: 32px; height: 32px"
                          stroke-width="4"
                          fill="transparent"
                          animation-duration="1.5s"
                        />
                        <span class="text-surface-600 dark:text-surface-400">Processing images...</span>
                      </div>
                    </div>
                    <div v-else class="text-center py-4 text-surface-500 dark:text-surface-400">
                      Click "Start Processing" to see spinner
                    </div>
                  </div>
                </template>
              </Card>
            </div>

            <div>
              <h3 class="text-xl font-semibold mb-3 text-surface-800 dark:text-surface-200">
                Saving Form
              </h3>
              <Card>
                <template #content>
                  <div class="space-y-4">
                    <div class="space-y-3">
                      <div>
                        <label class="block text-sm font-medium mb-1">Name</label>
                        <InputText placeholder="Enter your name" class="w-full" />
                      </div>
                      <div>
                        <label class="block text-sm font-medium mb-1">Email</label>
                        <InputText placeholder="Enter your email" class="w-full" />
                      </div>
                    </div>
                    <div class="flex items-center justify-between pt-4">
                      <div class="flex items-center gap-3">
                        <ProgressSpinner
                          v-if="isSaving"
                          style="width: 20px; height: 20px"
                          stroke-width="3"
                        />
                        <span v-if="isSaving" class="text-sm text-surface-600 dark:text-surface-400">
                          Saving...
                        </span>
                      </div>
                      <Button :disabled="isSaving" @click="simulateSaving">
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </template>
              </Card>
            </div>

            <div>
              <h3 class="text-xl font-semibold mb-3 text-surface-800 dark:text-surface-200">
                Loading States
              </h3>
              <Card>
                <template #content>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-3">
                      <h4 class="font-medium flex items-center gap-2">
                        <Icon name="lucide:database" size="16" />
                        Database Query
                      </h4>
                      <div class="flex items-center justify-center h-24 bg-surface-50 dark:bg-surface-800 rounded-lg">
                        <div class="flex items-center gap-2">
                          <ProgressSpinner style="width: 16px; height: 16px" stroke-width="3" />
                          <span class="text-sm">Querying...</span>
                        </div>
                      </div>
                    </div>
                    <div class="space-y-3">
                      <h4 class="font-medium flex items-center gap-2">
                        <Icon name="lucide:cloud" size="16" />
                        API Request
                      </h4>
                      <div class="flex items-center justify-center h-24 bg-surface-50 dark:bg-surface-800 rounded-lg">
                        <div class="flex items-center gap-2">
                          <ProgressSpinner
                            style="width: 18px; height: 18px"
                            stroke-width="2"
                            animation-duration="0.8s"
                          />
                          <span class="text-sm">Fetching...</span>
                        </div>
                      </div>
                    </div>
                    <div class="space-y-3">
                      <h4 class="font-medium flex items-center gap-2">
                        <Icon name="lucide:file" size="16" />
                        File Upload
                      </h4>
                      <div class="flex items-center justify-center h-24 bg-surface-50 dark:bg-surface-800 rounded-lg">
                        <div class="flex items-center gap-2">
                          <ProgressSpinner
                            style="width: 20px; height: 20px"
                            stroke-width="4"
                            animation-duration="1.2s"
                          />
                          <span class="text-sm">Uploading...</span>
                        </div>
                      </div>
                    </div>
                    <div class="space-y-3">
                      <h4 class="font-medium flex items-center gap-2">
                        <Icon name="lucide-cog" size="16" />
                        Background Task
                      </h4>
                      <div class="flex items-center justify-center h-24 bg-surface-50 dark:bg-surface-800 rounded-lg">
                        <div class="flex items-center gap-2">
                          <ProgressSpinner
                            style="width: 22px; height: 22px"
                            stroke-width="3"
                            animation-duration="2s"
                          />
                          <span class="text-sm">Processing...</span>
                        </div>
                      </div>
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
