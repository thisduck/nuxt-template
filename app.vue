<script setup lang="ts">
const { $trpc } = useNuxtApp()

const { data: hello } = await $trpc.hello.useQuery({ text: 'client'  })
</script>

<template>
  <h1 class="text-3xl font-semibold p-5">
    <div>{{ hello?.greeting }}</div>
  </h1>
</template>
