<script setup lang="ts">
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const fileUploadBasic = ref();
const customUploadSrc = ref('');
const totalSize = ref(0);
const totalSizePercent = ref(0);
const files = ref([]);

const onUpload = (event) => {
  toast.add({ severity: 'info', summary: 'File Uploaded', detail: 'File uploaded successfully', life: 3000 });
};

const onAdvancedUpload = (event) => {
  toast.add({ severity: 'info', summary: 'Files Uploaded', detail: `${event.files.length} file(s) uploaded successfully`, life: 3000 });
};

const onTemplatedUpload = (event) => {
  toast.add({ severity: 'info', summary: 'Files Uploaded', detail: `${event.files.length} file(s) uploaded successfully`, life: 3000 });
};

const onSelectedFiles = (event) => {
  files.value = event.files;
  files.value.forEach((file) => {
    file.objectURL = URL.createObjectURL(file);
  });
  
  totalSize.value = files.value.reduce((sum, file) => sum + file.size, 0);
  totalSizePercent.value = totalSize.value > 1000000 ? 100 : (totalSize.value / 1000000) * 100;
};

const uploadEvent = (callback) => {
  callback();
};

const onRemoveTemplatingFile = (file, removeFileCallback, index) => {
  removeFileCallback(index);
  totalSize.value -= file.size;
  totalSizePercent.value = totalSize.value > 1000000 ? 100 : (totalSize.value / 1000000) * 100;
};

const formatSize = (bytes) => {
  const k = 1024;
  const dm = 2;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  
  if (bytes === 0) {
    return '0 B';
  }
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

const onFileSelect = (event) => {
  const file = event.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      customUploadSrc.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const upload = () => {
  fileUploadBasic.value.upload();
};

const onError = (event) => {
  toast.add({ severity: 'error', summary: 'Upload Error', detail: 'Failed to upload file', life: 3000 });
};
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
            :maxFileSize="1000000" 
            @upload="onUpload"
            @error="onError"
          />
          <Button label="Upload" @click="upload" severity="secondary" />
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
          :maxFileSize="1000000" 
          @upload="onUpload"
          @error="onError"
          :auto="true" 
          chooseLabel="Browse" 
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
          @upload="onAdvancedUpload" 
          @error="onError"
          :multiple="true" 
          accept="image/*" 
          :maxFileSize="1000000"
        >
          <template #empty>
            <div class="flex items-center justify-center flex-col">
              <i class="pi pi-cloud-upload border-2 rounded-full p-8 text-4xl text-surface-400 border-surface-400" />
              <p class="mt-6 mb-0 text-surface-600 dark:text-surface-300">Drag and drop files to here to upload.</p>
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
          @upload="onTemplatedUpload" 
          @error="onError"
          :multiple="true" 
          accept="image/*" 
          :maxFileSize="1000000" 
          @select="onSelectedFiles"
        >
          <template #header="{ chooseCallback, uploadCallback, clearCallback, files }">
            <div class="flex flex-wrap justify-between items-center flex-1 gap-4">
              <div class="flex gap-2">
                <Button 
                  @click="chooseCallback()" 
                  icon="pi pi-images" 
                  rounded 
                  severity="secondary" 
                />
                <Button 
                  @click="uploadEvent(uploadCallback)" 
                  icon="pi pi-cloud-upload" 
                  rounded 
                  severity="success" 
                  :disabled="!files || files.length === 0" 
                />
                <Button 
                  @click="clearCallback()" 
                  icon="pi pi-times" 
                  rounded 
                  severity="danger" 
                  :disabled="!files || files.length === 0" 
                />
              </div>
              <ProgressBar 
                :value="totalSizePercent" 
                :showValue="false" 
                class="md:w-20rem h-1 w-full md:ml-auto"
              >
                <span class="whitespace-nowrap">{{ formatSize(totalSize) }} / 1MB</span>
              </ProgressBar>
            </div>
          </template>

          <template #content="{ files, uploadedFiles, removeUploadedFileCallback, removeFileCallback, messages }">
            <div class="flex flex-col gap-8 pt-4">
              <Message 
                v-for="message of messages" 
                :key="message" 
                :class="{ 'mb-8': !files.length && !uploadedFiles.length}" 
                severity="error"
              >
                {{ message }}
              </Message>

              <div v-if="files.length > 0">
                <h5 class="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-4">Pending</h5>
                <div class="flex flex-wrap gap-4">
                  <div 
                    v-for="(file, index) of files" 
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
                      />
                    </div>
                    <span class="font-semibold text-ellipsis max-w-60 whitespace-nowrap overflow-hidden text-surface-900 dark:text-surface-0">
                      {{ file.name }}
                    </span>
                    <div class="text-surface-600 dark:text-surface-400">{{ formatSize(file.size) }}</div>
                    <Badge value="Pending" severity="warn" />
                    <Button 
                      icon="pi pi-times" 
                      @click="onRemoveTemplatingFile(file, removeFileCallback, index)" 
                      rounded 
                      severity="danger" 
                      size="small"
                    />
                  </div>
                </div>
              </div>

              <div v-if="uploadedFiles.length > 0">
                <h5 class="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-4">Completed</h5>
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
                      />
                    </div>
                    <span class="font-semibold text-ellipsis max-w-60 whitespace-nowrap overflow-hidden text-surface-900 dark:text-surface-0">
                      {{ file.name }}
                    </span>
                    <div class="text-surface-600 dark:text-surface-400">{{ formatSize(file.size) }}</div>
                    <Badge value="Completed" severity="success" />
                    <Button 
                      icon="pi pi-times" 
                      @click="removeUploadedFileCallback(index)" 
                      rounded 
                      severity="danger" 
                      size="small"
                    />
                  </div>
                </div>
              </div>
            </div>
          </template>

          <template #empty>
            <div class="flex items-center justify-center flex-col">
              <i class="pi pi-cloud-upload border-2 rounded-full p-8 text-4xl text-surface-400 border-surface-400" />
              <p class="mt-6 mb-0 text-surface-600 dark:text-surface-300">Drag and drop files to here to upload.</p>
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
            @select="onFileSelect" 
            :customUpload="true" 
            :auto="true" 
            severity="secondary" 
            accept="image/*"
            chooseLabel="Choose Image"
          />
          <div v-if="customUploadSrc" class="mt-4">
            <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-2">Preview</h3>
            <img 
              :src="customUploadSrc" 
              alt="Uploaded Image" 
              class="shadow-lg rounded-xl w-full max-w-sm border border-surface-200 dark:border-surface-700" 
            />
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
            <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100">Images Only</h3>
            <FileUpload 
              mode="basic" 
              name="images[]" 
              url="/api/upload" 
              accept="image/*" 
              :maxFileSize="2000000"
              @upload="onUpload"
              @error="onError"
              chooseLabel="Select Images"
            />
            <small class="text-surface-500">Max file size: 2MB</small>
          </div>
          
          <div class="flex flex-col gap-4">
            <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100">Documents Only</h3>
            <FileUpload 
              mode="basic" 
              name="documents[]" 
              url="/api/upload" 
              accept=".pdf,.doc,.docx,.txt" 
              :maxFileSize="10000000"
              @upload="onUpload"
              @error="onError"
              chooseLabel="Select Documents"
            />
            <small class="text-surface-500">Max file size: 10MB</small>
          </div>
          
          <div class="flex flex-col gap-4">
            <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100">Videos Only</h3>
            <FileUpload 
              mode="basic" 
              name="videos[]" 
              url="/api/upload" 
              accept="video/*" 
              :maxFileSize="50000000"
              @upload="onUpload"
              @error="onError"
              chooseLabel="Select Videos"
            />
            <small class="text-surface-500">Max file size: 50MB</small>
          </div>
          
          <div class="flex flex-col gap-4">
            <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100">Any File</h3>
            <FileUpload 
              mode="basic" 
              name="files[]" 
              url="/api/upload" 
              :maxFileSize="25000000"
              @upload="onUpload"
              @error="onError"
              chooseLabel="Select Any File"
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
            <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">Multiple Files</h3>
            <FileUpload 
              name="multiple[]" 
              url="/api/upload" 
              @upload="onAdvancedUpload"
              @error="onError"
              :multiple="true" 
              accept="image/*,application/pdf" 
              :maxFileSize="5000000"
              :fileLimit="5"
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
            <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">Auto Upload with Progress</h3>
            <FileUpload 
              name="auto[]" 
              url="/api/upload" 
              @upload="onAdvancedUpload"
              @error="onError"
              :auto="true"
              :multiple="true" 
              accept="image/*" 
              :maxFileSize="3000000"
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
            <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">Disabled Upload</h3>
            <FileUpload 
              name="disabled[]" 
              url="/api/upload"
              :disabled="true"
              accept="image/*"
            >
              <template #empty>
                <div class="flex items-center justify-center flex-col">
                  <i class="pi pi-ban border-2 rounded-full p-6 text-3xl text-surface-300 border-surface-300" />
                  <p class="mt-4 mb-0 text-surface-400">File upload is currently disabled</p>
                </div>
              </template>
            </FileUpload>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>