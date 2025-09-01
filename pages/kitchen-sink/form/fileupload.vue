<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
import { ref } from 'vue';

const toast = useToast();
const fileUploadBasic = ref();
const customUploadSrc = ref('');
const totalSize = ref(0);
const totalSizePercent = ref(0);
const files = ref([]);

function onUpload(_event) {
  toast.add({ severity: 'info', summary: 'File Uploaded', detail: 'File uploaded successfully', life: 3000 });
}

function onAdvancedUpload(event) {
  toast.add({ severity: 'info', summary: 'Files Uploaded', detail: `${event.files.length} file(s) uploaded successfully`, life: 3000 });
}

function onTemplatedUpload(event) {
  toast.add({ severity: 'info', summary: 'Files Uploaded', detail: `${event.files.length} file(s) uploaded successfully`, life: 3000 });
}

function onSelectedFiles(event) {
  files.value = event.files;
  files.value.forEach((file) => {
    file.objectURL = URL.createObjectURL(file);
  });

  totalSize.value = files.value.reduce((sum, file) => sum + file.size, 0);
  totalSizePercent.value = totalSize.value > 1000000 ? 100 : (totalSize.value / 1000000) * 100;
}

function uploadEvent(callback) {
  callback();
}

function onRemoveTemplatingFile(file, removeFileCallback, index) {
  removeFileCallback(index);
  totalSize.value -= file.size;
  totalSizePercent.value = totalSize.value > 1000000 ? 100 : (totalSize.value / 1000000) * 100;
}

function formatSize(bytes) {
  const k = 1024;
  const dm = 2;
  const sizes = ['B', 'KB', 'MB', 'GB'];

  if (bytes === 0) {
    return '0 B';
  }

  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${Number.parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
}

function onFileSelect(event) {
  const file = event.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      customUploadSrc.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

function upload() {
  fileUploadBasic.value.upload();
}

function onError(_event) {
  toast.add({ severity: 'error', summary: 'Upload Error', detail: 'Failed to upload file', life: 3000 });
}
</script>

<template>
  <div class="p-6 space-y-8">
    <!-- Header -->
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-4">
        <Icon name="pi:upload" size="32" class="text-primary-500" />
        <div class="flex flex-col">
          <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0">
            File Upload
          </h1>
          <p class="text-surface-600 dark:text-surface-300">
            FileUpload is an advanced uploader with dragdrop support, multi file uploads, auto uploading, progress tracking and validations.
          </p>
        </div>
      </div>
    </div>

    <!-- Basic Mode -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Basic Mode
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        FileUpload basic mode provides a simpler UI as an alternative to default advanced mode.
      </p>

      <div class="card">
        <div class="flex flex-col gap-4">
          <FileUpload
            ref="fileUploadBasic"
            mode="basic"
            name="demo[]"
            url="/api/upload"
            accept="image/*"
            :max-file-size="1000000"
            @upload="onUpload"
            @error="onError"
          />
          <Button label="Upload" severity="secondary" @click="upload" />
        </div>
      </div>
    </div>

    <!-- Auto Upload -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Auto Upload
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        When auto property is enabled, a file gets uploaded instantly after selection.
      </p>

      <div class="card">
        <FileUpload
          mode="basic"
          name="demo[]"
          url="/api/upload"
          accept="image/*"
          :max-file-size="1000000"
          :auto="true"
          choose-label="Browse"
          @upload="onUpload"
          @error="onError"
        />
      </div>
    </div>

    <!-- Advanced Mode -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Advanced Mode
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Advanced uploader provides dragdrop support, multi file uploads, auto uploading, progress tracking and validations.
      </p>

      <div class="card">
        <FileUpload
          name="demo[]"
          url="/api/upload"
          :multiple="true"
          accept="image/*"
          :max-file-size="1000000"
          @upload="onAdvancedUpload"
          @error="onError"
        >
          <template #empty>
            <div class="flex items-center justify-center flex-col">
              <i class="pi pi-cloud-upload border-2 rounded-full p-8 text-4xl text-surface-400 border-surface-400" />
              <p class="mt-6 mb-0 text-surface-600 dark:text-surface-300">
                Drag and drop files to here to upload.
              </p>
            </div>
          </template>
        </FileUpload>
      </div>
    </div>

    <!-- Template Mode -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Custom Template
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Uploader UI can be customized with templating for complete control over the interface.
      </p>

      <div class="card">
        <FileUpload
          name="demo[]"
          url="/api/upload"
          :multiple="true"
          accept="image/*"
          :max-file-size="1000000"
          @upload="onTemplatedUpload"
          @error="onError"
          @select="onSelectedFiles"
        >
          <template #header="{ chooseCallback, uploadCallback, clearCallback, files: headerFiles }">
            <div class="flex flex-wrap justify-between items-center flex-1 gap-4">
              <div class="flex gap-2">
                <Button
                  icon="pi pi-images"
                  rounded
                  severity="secondary"
                  @click="chooseCallback()"
                />
                <Button
                  icon="pi pi-cloud-upload"
                  rounded
                  severity="success"
                  :disabled="!headerFiles || headerFiles.length === 0"
                  @click="uploadEvent(uploadCallback)"
                />
                <Button
                  icon="pi pi-times"
                  rounded
                  severity="danger"
                  :disabled="!headerFiles || headerFiles.length === 0"
                  @click="clearCallback()"
                />
              </div>
              <ProgressBar
                :value="totalSizePercent"
                :show-value="false"
                class="md:w-20rem h-1 w-full md:ml-auto"
              >
                <span class="whitespace-nowrap">{{ formatSize(totalSize) }} / 1MB</span>
              </ProgressBar>
            </div>
          </template>

          <template #content="{ files: contentFiles, uploadedFiles, removeUploadedFileCallback, removeFileCallback, messages }">
            <div class="flex flex-col gap-8 pt-4">
              <Message
                v-for="message of messages"
                :key="message"
                :class="{ 'mb-8': !contentFiles.length && !uploadedFiles.length }"
                severity="error"
              >
                {{ message }}
              </Message>

              <div v-if="contentFiles.length > 0">
                <h5 class="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-4">
                  Pending
                </h5>
                <div class="flex flex-wrap gap-4">
                  <div
                    v-for="(file, index) of contentFiles"
                    :key="file.name + file.type + file.size"
                    class="p-8 rounded-lg flex flex-col border border-surface-200 dark:border-surface-700 items-center gap-4"
                  >
                    <div>
                      <img
                        role="presentation"
                        :alt="file.name"
                        :src="file.objectURL"
                        width="100"
                        height="50"
                        class="rounded shadow-sm object-cover"
                      >
                    </div>
                    <span class="font-semibold text-ellipsis max-w-60 whitespace-nowrap overflow-hidden text-surface-900 dark:text-surface-0">
                      {{ file.name }}
                    </span>
                    <div class="text-surface-600 dark:text-surface-400">
                      {{ formatSize(file.size) }}
                    </div>
                    <Badge value="Pending" severity="warn" />
                    <Button
                      icon="pi pi-times"
                      rounded
                      severity="danger"
                      size="small"
                      @click="onRemoveTemplatingFile(file, removeFileCallback, index)"
                    />
                  </div>
                </div>
              </div>

              <div v-if="uploadedFiles.length > 0">
                <h5 class="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-4">
                  Completed
                </h5>
                <div class="flex flex-wrap gap-4">
                  <div
                    v-for="(file, index) of uploadedFiles"
                    :key="file.name + file.type + file.size"
                    class="p-8 rounded-lg flex flex-col border border-surface-200 dark:border-surface-700 items-center gap-4"
                  >
                    <div>
                      <img
                        role="presentation"
                        :alt="file.name"
                        :src="file.objectURL"
                        width="100"
                        height="50"
                        class="rounded shadow-sm object-cover"
                      >
                    </div>
                    <span class="font-semibold text-ellipsis max-w-60 whitespace-nowrap overflow-hidden text-surface-900 dark:text-surface-0">
                      {{ file.name }}
                    </span>
                    <div class="text-surface-600 dark:text-surface-400">
                      {{ formatSize(file.size) }}
                    </div>
                    <Badge value="Completed" severity="success" />
                    <Button
                      icon="pi pi-times"
                      rounded
                      severity="danger"
                      size="small"
                      @click="removeUploadedFileCallback(index)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </template>

          <template #empty>
            <div class="flex items-center justify-center flex-col">
              <i class="pi pi-cloud-upload border-2 rounded-full p-8 text-4xl text-surface-400 border-surface-400" />
              <p class="mt-6 mb-0 text-surface-600 dark:text-surface-300">
                Drag and drop files to here to upload.
              </p>
            </div>
          </template>
        </FileUpload>
      </div>
    </div>

    <!-- Custom Upload -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Custom Upload
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Uploading implementation can be overridden by enabling customUpload property. This example displays the image with a preview.
      </p>

      <div class="card">
        <div class="flex flex-col gap-4">
          <FileUpload
            mode="basic"
            :custom-upload="true"
            :auto="true"
            severity="secondary"
            accept="image/*"
            choose-label="Choose Image"
            @select="onFileSelect"
          />
          <div v-if="customUploadSrc" class="mt-4">
            <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-2">
              Preview
            </h3>
            <img
              :src="customUploadSrc"
              alt="Uploaded Image"
              class="shadow-lg rounded-xl w-full max-w-sm border border-surface-200 dark:border-surface-700"
            >
          </div>
        </div>
      </div>
    </div>

    <!-- Different File Types -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        File Type Examples
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Different file type restrictions and validation examples.
      </p>

      <div class="card">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="flex flex-col gap-4">
            <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100">
              Images Only
            </h3>
            <FileUpload
              mode="basic"
              name="images[]"
              url="/api/upload"
              accept="image/*"
              :max-file-size="2000000"
              choose-label="Select Images"
              @upload="onUpload"
              @error="onError"
            />
            <small class="text-surface-500">Max file size: 2MB</small>
          </div>

          <div class="flex flex-col gap-4">
            <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100">
              Documents Only
            </h3>
            <FileUpload
              mode="basic"
              name="documents[]"
              url="/api/upload"
              accept=".pdf,.doc,.docx,.txt"
              :max-file-size="10000000"
              choose-label="Select Documents"
              @upload="onUpload"
              @error="onError"
            />
            <small class="text-surface-500">Max file size: 10MB</small>
          </div>

          <div class="flex flex-col gap-4">
            <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100">
              Videos Only
            </h3>
            <FileUpload
              mode="basic"
              name="videos[]"
              url="/api/upload"
              accept="video/*"
              :max-file-size="50000000"
              choose-label="Select Videos"
              @upload="onUpload"
              @error="onError"
            />
            <small class="text-surface-500">Max file size: 50MB</small>
          </div>

          <div class="flex flex-col gap-4">
            <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100">
              Any File
            </h3>
            <FileUpload
              mode="basic"
              name="files[]"
              url="/api/upload"
              :max-file-size="25000000"
              choose-label="Select Any File"
              @upload="onUpload"
              @error="onError"
            />
            <small class="text-surface-500">Max file size: 25MB</small>
          </div>
        </div>
      </div>
    </div>

    <!-- Multiple Files with Different Configurations -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Advanced Configurations
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Various upload configurations for different use cases.
      </p>

      <div class="card">
        <div class="space-y-6">
          <!-- Multiple Files -->
          <div>
            <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">
              Multiple Files
            </h3>
            <FileUpload
              name="multiple[]"
              url="/api/upload"
              :multiple="true"
              accept="image/*,application/pdf"
              :max-file-size="5000000"
              :file-limit="5"
              @upload="onAdvancedUpload"
              @error="onError"
            >
              <template #empty>
                <div class="flex items-center justify-center flex-col">
                  <i class="pi pi-cloud-upload border-2 rounded-full p-6 text-3xl text-surface-400 border-surface-400" />
                  <p class="mt-4 mb-0 text-surface-600 dark:text-surface-300">
                    Upload up to 5 files (images or PDFs, max 5MB each)
                  </p>
                </div>
              </template>
            </FileUpload>
          </div>

          <!-- Auto Upload with Progress -->
          <div>
            <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">
              Auto Upload with Progress
            </h3>
            <FileUpload
              name="auto[]"
              url="/api/upload"
              :auto="true"
              :multiple="true"
              accept="image/*"
              :max-file-size="3000000"
              @upload="onAdvancedUpload"
              @error="onError"
            >
              <template #empty>
                <div class="flex items-center justify-center flex-col">
                  <i class="pi pi-images border-2 rounded-full p-6 text-3xl text-primary-500 border-primary-500" />
                  <p class="mt-4 mb-0 text-surface-600 dark:text-surface-300">
                    Select images to upload automatically (max 3MB each)
                  </p>
                </div>
              </template>
            </FileUpload>
          </div>

          <!-- Disabled State -->
          <div>
            <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">
              Disabled Upload
            </h3>
            <FileUpload
              name="disabled[]"
              url="/api/upload"
              :disabled="true"
              accept="image/*"
            >
              <template #empty>
                <div class="flex items-center justify-center flex-col">
                  <i class="pi pi-ban border-2 rounded-full p-6 text-3xl text-surface-300 border-surface-300" />
                  <p class="mt-4 mb-0 text-surface-400">
                    File upload is currently disabled
                  </p>
                </div>
              </template>
            </FileUpload>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
