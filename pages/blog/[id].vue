<script setup lang="ts">
import { Form } from '@primevue/forms';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import * as z from 'zod';

const route = useRoute();
const { $trpc } = useNuxtApp();
const toast = useToast();

// Get the post ID from the route parameter
const postId = Number(route.params.id);

// Fetch the blog post
const { data: post, pending: loading, error } = await $trpc.blog.getPost.useQuery({
  id: postId,
});

// Fetch comments for this post
const { data: comments, pending: commentsLoading, refresh: refreshComments } = await $trpc.comments.getByPostId.useQuery({
  blogPostId: postId,
});

// Comment form setup
const commentSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  body: z.string().min(1, 'Comment is required').max(2000, 'Comment too long'),
});

const commentForm = {
  name: '',
  body: '',
};

const isSubmittingComment = ref(false);

// Submit comment
async function onCommentSubmit(event: any) {
  if (!event.valid) return;

  isSubmittingComment.value = true;

  try {
    await $trpc.comments.create.mutate({
      blogPostId: postId,
      name: event.values.name,
      body: event.values.body,
    });

    toast.add({
      severity: 'success',
      summary: 'Comment Added',
      detail: 'Your comment has been posted successfully!',
      life: 3000,
    });

    // Reset form
    event.values.name = '';
    event.values.body = '';

    // Refresh comments
    await refreshComments();
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to post comment. Please try again.',
      life: 5000,
    });
  } finally {
    isSubmittingComment.value = false;
  }
}

// Format date helper
function formatDate(date: Date | string) {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(dateObj);
}
</script>

<template>
  <div class="w-full max-w-6xl mx-auto p-6">
    <!-- Back to Blog Button -->
    <div class="mb-6">
      <Button
        label="← Back to Blog"
        variant="text"
        class="text-primary hover:text-primary-600"
        @click="$router.push('/blog')"
      />
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="animate-pulse">
      <Card>
        <template #content>
          <div class="p-6 space-y-4">
            <div class="h-8 bg-gray-200 rounded w-3/4" />
            <div class="h-4 bg-gray-200 rounded w-1/3" />
            <div class="space-y-3 mt-8">
              <div class="h-4 bg-gray-200 rounded" />
              <div class="h-4 bg-gray-200 rounded" />
              <div class="h-4 bg-gray-200 rounded w-5/6" />
              <div class="h-4 bg-gray-200 rounded" />
              <div class="h-4 bg-gray-200 rounded w-4/5" />
            </div>
          </div>
        </template>
      </Card>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-16">
      <Card>
        <template #content>
          <div class="p-6">
            <i class="pi pi-exclamation-triangle text-6xl text-red-500 mb-4" />
            <h3 class="text-xl font-semibold mb-2">
              Post not found
            </h3>
            <p class="mb-6">
              {{ error.message }}
            </p>
            <Button
              label="Back to Blog"
              icon="pi pi-arrow-left"
              @click="$router.push('/blog')"
            />
          </div>
        </template>
      </Card>
    </div>

    <!-- Blog Post Content -->
    <article v-else-if="post">
      <Card>
        <template #content>
          <div class="p-6">
            <!-- Post Header -->
            <header class="mb-8">
              <h1 class="text-4xl font-bold mb-4">
                {{ post.title }}
              </h1>
              <div class="text-sm text-gray-600">
                <time :datetime="post.created_at">
                  Published on {{ formatDate(post.created_at) }}
                </time>
                <span v-if="post.updated_at !== post.created_at" class="ml-4">
                  • Updated {{ formatDate(post.updated_at) }}
                </span>
              </div>
            </header>

            <!-- Post Body -->
            <div class="prose max-w-none">
              <div class="whitespace-pre-wrap">
                {{ post.body }}
              </div>
            </div>
          </div>
        </template>
      </Card>

      <!-- Comments Section -->
      <div class="mt-8 space-y-6">
        <!-- Comments Header -->
        <Card>
          <template #content>
            <div class="p-6">
              <h2 class="text-2xl font-semibold mb-4 flex items-center gap-2">
                <i class="pi pi-comments" />
                Comments
                <span v-if="comments" class="text-lg font-normal text-gray-600">
                  ({{ comments.length }})
                </span>
              </h2>

              <!-- Add Comment Form -->
              <Form 
                :resolver="zodResolver(commentSchema)" 
                :initial-values="commentForm"
                @submit="onCommentSubmit"
                class="space-y-4"
              >
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="space-y-2">
                    <label for="name" class="block text-sm font-medium">Your Name</label>
                    <InputText 
                      name="name"
                      placeholder="Enter your name"
                      class="w-full"
                      :disabled="isSubmittingComment"
                    />
                  </div>
                </div>
                
                <div class="space-y-2">
                  <label for="body" class="block text-sm font-medium">Your Comment</label>
                  <Textarea 
                    name="body"
                    placeholder="Write your comment here..."
                    rows="4"
                    class="w-full"
                    :disabled="isSubmittingComment"
                  />
                </div>

                <div class="flex justify-end">
                  <Button 
                    type="submit"
                    label="Post Comment"
                    icon="pi pi-send"
                    :loading="isSubmittingComment"
                    :disabled="isSubmittingComment"
                  />
                </div>
              </Form>
            </div>
          </template>
        </Card>

        <!-- Comments List -->
        <Card v-if="commentsLoading">
          <template #content>
            <div class="p-6">
              <div class="animate-pulse space-y-4">
                <div v-for="i in 3" :key="i" class="border-b pb-4">
                  <div class="flex items-center gap-3 mb-2">
                    <div class="w-8 h-8 bg-gray-200 rounded-full" />
                    <div class="h-4 bg-gray-200 rounded w-24" />
                    <div class="h-3 bg-gray-200 rounded w-20" />
                  </div>
                  <div class="space-y-2">
                    <div class="h-4 bg-gray-200 rounded" />
                    <div class="h-4 bg-gray-200 rounded w-3/4" />
                  </div>
                </div>
              </div>
            </div>
          </template>
        </Card>

        <Card v-else-if="comments && comments.length > 0">
          <template #content>
            <div class="p-6">
              <div class="space-y-6">
                <div 
                  v-for="comment in comments" 
                  :key="comment.id"
                  class="border-b border-gray-200 last:border-b-0 pb-6 last:pb-0"
                >
                  <div class="flex items-start gap-3">
                    <Avatar 
                      :label="comment.name.charAt(0).toUpperCase()"
                      size="normal"
                      shape="circle"
                      class="bg-primary text-primary-contrast"
                    />
                    <div class="flex-1">
                      <div class="flex items-center gap-2 mb-2">
                        <h4 class="font-semibold text-gray-900">{{ comment.name }}</h4>
                        <span class="text-sm text-gray-500">
                          {{ formatDate(comment.created_at) }}
                        </span>
                      </div>
                      <div class="prose max-w-none">
                        <p class="whitespace-pre-wrap text-gray-700">{{ comment.body }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </Card>

        <Card v-else>
          <template #content>
            <div class="p-6 text-center text-gray-500">
              <i class="pi pi-comment text-4xl mb-3" />
              <p class="text-lg">No comments yet</p>
              <p class="text-sm">Be the first to share your thoughts!</p>
            </div>
          </template>
        </Card>
      </div>
    </article>
  </div>
</template>
