<template>
  <div class="max-w-6xl mx-auto p-6">
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-3xl font-bold">Blog</h1>
      <Button 
        label="New Post" 
        icon="pi pi-plus" 
        @click="$router.push('/blog/new')"
      />
    </div>
    <p class="text-lg">Blog posts will appear here...</p>
  </div>
</template>