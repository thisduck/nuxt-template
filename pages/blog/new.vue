<script setup lang="ts">
import { Form } from '@primevue/forms';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import * as z from 'zod';

const router = useRouter();

// Form schema
const blogPostSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  body: z.string().min(1, 'Body is required'),
});

// Form initial values
const initialValues = {
  title: '',
  body: '',
};

function onSubmit(event: any) {
  if (!event.valid) {
    return;
  }
  
  console.log('Form submitted:', event.values);
  // TODO: Handle form submission
}
</script>

<template>
  <div class="max-w-4xl mx-auto p-6">
    <div class="flex items-center gap-4 mb-8">
      <Button 
        icon="pi pi-arrow-left" 
        text 
        @click="$router.push('/blog')"
      />
      <h1 class="text-3xl font-bold">New Post</h1>
    </div>

    <Card>
      <template #content>
        <Form 
          :resolver="zodResolver(blogPostSchema)" 
          :initial-values="initialValues"
          @submit="onSubmit"
          v-slot="$form"
        >
          <div class="space-y-6">
            <!-- Title Field -->
            <div>
              <label class="font-medium text-sm">Title</label>
              <InputText 
                name="title"
                type="text"
                placeholder="Enter post title"
                fluid
              />
              <Message v-if="$form.title?.invalid" severity="error" size="small" variant="simple">
                {{ $form.title.error?.message }}
              </Message>
            </div>

            <!-- Body Field -->
            <div>
              <label class="font-medium text-sm">Body</label>
              <Textarea 
                name="body"
                placeholder="Write your post content here..."
                rows="10"
                fluid
              />
              <Message v-if="$form.body?.invalid" severity="error" size="small" variant="simple">
                {{ $form.body.error?.message }}
              </Message>
            </div>

            <!-- Submit Button -->
            <div class="flex justify-between gap-4">
              <Button 
                type="button"
                label="Cancel" 
                severity="secondary"
                @click="$router.push('/blog')"
              />
              <Button 
                type="submit" 
                label="Publish Post" 
                icon="pi pi-send"
              />
            </div>
          </div>
        </Form>
      </template>
    </Card>
  </div>
</template>