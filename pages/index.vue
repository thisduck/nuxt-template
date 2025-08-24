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
        <Button aria-label="Home">
          <Icon name="lucide:home" size="16" />
        </Button>
        <Button label="Profile">
          <template #icon>
            <Icon name="lucide:user" size="16" />
          </template>
        </Button>
        <Button label="Save">
          <template #icon>
            <Icon name="lucide:check" size="16" />
          </template>
        </Button>
      </div>
      <div class="flex flex-wrap gap-4">
        <Button label="Search">
          <template #icon>
            <Icon name="lucide:search" size="16" />
          </template>
        </Button>
        <Button label="Update">
          <template #icon>
            <Icon name="lucide:refresh-cw" size="16" />
          </template>
        </Button>
      </div>
    </div>

    <div class="card flex flex-col gap-4">
      <h2 class="text-xl font-semibold">Lucide Icon Examples</h2>
      <div class="flex flex-wrap gap-4 items-center">
        <Icon name="lucide:github" class="text-2xl" />
        <Icon name="lucide:twitter" class="text-2xl text-blue-500" />
        <Icon name="lucide:heart" class="text-2xl text-red-500" />
        <Icon name="lucide:star" class="text-2xl text-yellow-500" />
        <Icon name="lucide:home" class="text-2xl text-green-500" />
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
