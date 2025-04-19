<script setup lang="ts">
const { $trpc } = useNuxtApp()

const { data: hello } = await $trpc.hello.useQuery({ text: 'client'  })
</script>

<template>
  <div>
    <div>{{ hello?.greeting }}</div>
  </div>
</template>
