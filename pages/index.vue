<script setup lang="ts">
const { $trpc } = useNuxtApp();

const { data: hello } = await $trpc.hello.useQuery({ text: 'client' });
</script>

<template>
  <div class="p-4 space-y-4">
    <h1 class="text-3xl font-semibold">
      <div>{{ hello?.greeting }}</div>
    </h1>

    <UButton>
      Call Hello
    </UButton>

    <UAlert
      color="neutral"
      title="Heads up!"
      description="You can change the primary color in your app config."
      icon="i-lucide-terminal"
    />
  </div>
</template>
