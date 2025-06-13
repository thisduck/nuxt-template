<script setup lang="ts">
const { $trpc } = useNuxtApp();

const { data: hello } = await $trpc.hello.useQuery({ text: 'client' });
const visible = ref(false);
</script>

<template>
  <div class="p-4 space-y-4">
    <h1 class="text-3xl font-semibold">
      <div>{{ hello?.greeting }}</div>
    </h1>

    <div class="card flex">
      <Button label="Show" @click="visible = true" />
      <Dialog v-model:visible="visible" modal header="Edit Profile" :style="{ width: '25rem' }">
        <span class="text-surface-500 dark:text-surface-400 block mb-8">Update your information.</span>
        <div class="flex items-center gap-4 mb-4">
          <label for="username" class="font-semibold w-24">Username</label>
          <InputText id="username" class="flex-auto" autocomplete="off" />
        </div>
        <div class="flex items-center gap-4 mb-8">
          <label for="email" class="font-semibold w-24">Email</label>
          <InputText id="email" class="flex-auto" autocomplete="off" />
        </div>
        <div class="flex justify-end gap-2">
          <Button type="button" label="Cancel" severity="secondary" @click="visible = false" />
          <Button type="button" label="Save" @click="visible = false" />
        </div>
      </Dialog>
    </div>

    <div class="card flex flex-col gap-4">
      <div class="flex flex-wrap gap-4">
        <Button icon="pi pi-home" aria-label="Save" />
        <Button label="Profile" icon="pi pi-user" />
        <Button label="Save" icon="pi pi-check" icon-pos="right" />
      </div>
      <div class="flex flex-wrap gap-4">
        <Button label="Search" icon="pi pi-search" icon-pos="top" />
        <Button label="Update" icon="pi pi-refresh" icon-pos="bottom" />
      </div>
    </div>

    <div class="card flex flex-wrap gap-4">
      <Message severity="success">
        Success Message
      </Message>
      <Message severity="info">
        Info Message
      </Message>
      <Message severity="warn">
        Warn Message
      </Message>
      <Message severity="error">
        Error Message
      </Message>
      <Message severity="secondary">
        Secondary Message
      </Message>
      <Message severity="contrast">
        Contrast Message
      </Message>
    </div>
  </div>
</template>
