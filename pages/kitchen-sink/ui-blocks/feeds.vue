<script setup lang="ts">
import { ref } from 'vue';

const activeTab = ref('inbox');
const tabs = [
  { id: 'inbox', label: 'Inbox', count: 12 },
  { id: 'following', label: 'Following', count: 4 },
  { id: 'all', label: 'All', count: 28 },
  { id: 'archived', label: 'Archived', count: 0 }
];

const feedPosts = ref([
  {
    id: 1,
    author: 'Jane Cooper',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    timestamp: 'Oct 11 at 06:35 PM',
    type: 'post'
  },
  {
    id: 2,
    author: 'Robert Fox',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    timestamp: 'Oct 11 at 02:40 PM',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=200&fit=crop',
    type: 'post'
  },
  {
    id: 3,
    author: 'Kristin Watson',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    content: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    timestamp: 'Oct 10 at 11:58 PM',
    type: 'post'
  }
]);

const timelineEvents = ref([
  {
    id: 1,
    author: 'Amy Elsner',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    action: 'responded to an issue',
    attachment: { icon: 'pi-github', name: 'Issue #1185' },
    timestamp: '14 mins ago'
  },
  {
    id: 2,
    author: 'Asiya Javayant',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    action: 'changed team size from 5 to 6',
    timestamp: '20 mins ago'
  },
  {
    id: 3,
    author: 'Onyama Limba',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    action: 'created a Q4 presentation',
    attachment: { icon: 'pi-file-pdf', name: 'Q4_Presentation.pdf' },
    timestamp: '38 mins ago'
  },
  {
    id: 4,
    author: 'Xuxue Feng',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    action: 'added Nico Greenberg to Watchlist Tier-1',
    timestamp: '1 day ago'
  },
  {
    id: 5,
    author: 'Richard Jones',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    action: 'has purchased a blue t-shirt for $79',
    timestamp: '4 days ago'
  }
]);

const notifications = ref([
  {
    id: 1,
    icon: 'pi-dollar',
    iconColor: 'text-green-500',
    iconBg: 'bg-green-100 dark:bg-green-900/20',
    title: 'Richard Jones',
    description: 'has purchased a blue t-shirt for $79',
    time: '6 mins'
  },
  {
    id: 2,
    icon: 'pi-download',
    iconColor: 'text-blue-500',
    iconBg: 'bg-blue-100 dark:bg-blue-900/20',
    description: 'Your request for withdrawal of $2500 has been initiated.',
    time: '13 mins'
  },
  {
    id: 3,
    icon: 'pi-dollar',
    iconColor: 'text-green-500',
    iconBg: 'bg-green-100 dark:bg-green-900/20',
    title: 'Keyser Wick',
    description: 'has purchased a blue t-shirt for $59',
    time: '1 day'
  },
  {
    id: 4,
    icon: 'pi-question',
    iconColor: 'text-orange-500',
    iconBg: 'bg-orange-100 dark:bg-orange-900/20',
    title: 'Jane Davis',
    description: 'has posted a new question about your product.',
    time: '2 days'
  }
]);

function selectTab(tabId: string) {
  activeTab.value = tabId;
}
</script>

<template>
  <div class="p-6 max-w-6xl mx-auto space-y-8">
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0 mb-4">
        Feed Examples
      </h1>
      <p class="text-surface-600 dark:text-surface-400">
        Various feed and activity timeline patterns from PrimeBlocks
      </p>
    </div>

    <!-- Example 1: Tabs and Actions -->
    <Card class="p-6">
      <template #title>
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-semibold">Tabs and Actions</h2>
          <Button icon="pi pi-ellipsis-h" text rounded />
        </div>
      </template>
      
      <template #content>
        <div class="space-y-4">
          <!-- Tab Navigation -->
          <div class="flex items-center gap-1 bg-surface-100 dark:bg-surface-800 p-1 rounded-lg">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="selectTab(tab.id)"
              :class="[
                'px-4 py-2 rounded-md text-sm font-medium transition-all duration-150 flex items-center gap-2',
                activeTab === tab.id
                  ? 'bg-white dark:bg-surface-700 text-surface-900 dark:text-surface-0 shadow-sm'
                  : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-0'
              ]"
            >
              <span>{{ tab.label }}</span>
              <Badge v-if="tab.count > 0" :value="tab.count" size="small" />
            </button>
          </div>

          <!-- Action Buttons -->
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <Button label="Mark as Read" size="small" outlined />
              <Button label="Archive All" size="small" outlined />
            </div>
            <Button icon="pi pi-refresh" text rounded size="small" />
          </div>

          <!-- Feed Content -->
          <div class="space-y-4">
            <div v-for="post in feedPosts.slice(0, 2)" :key="post.id" class="flex items-start gap-3 p-4 border border-surface-200 dark:border-surface-700 rounded-lg">
              <Avatar :image="post.avatar" size="large" shape="circle" />
              <div class="flex-1">
                <div class="flex items-center justify-between mb-2">
                  <h4 class="font-semibold text-surface-900 dark:text-surface-0">{{ post.author }}</h4>
                  <span class="text-xs text-surface-500 dark:text-surface-400">{{ post.timestamp }}</span>
                </div>
                <p class="text-surface-700 dark:text-surface-300 text-sm">{{ post.content }}</p>
              </div>
            </div>
          </div>
        </div>
      </template>
    </Card>

    <!-- Example 2: Avatars and Timestamps -->
    <Card class="p-6">
      <template #title>
        <h2 class="text-xl font-semibold">Avatars and Timestamps</h2>
      </template>
      
      <template #content>
        <div class="space-y-6">
          <!-- Date Separator -->
          <div class="flex items-center">
            <div class="flex-1 h-px bg-surface-200 dark:bg-surface-700"></div>
            <span class="px-3 text-xs font-medium text-surface-500 dark:text-surface-400 bg-surface-0 dark:bg-surface-900">
              TODAY
            </span>
            <div class="flex-1 h-px bg-surface-200 dark:bg-surface-700"></div>
          </div>

          <!-- Feed Posts -->
          <div class="space-y-6">
            <div v-for="post in feedPosts" :key="post.id" class="flex items-start gap-4">
              <Avatar :image="post.avatar" size="xlarge" shape="circle" class="shadow-sm" />
              <div class="flex-1 space-y-2">
                <div class="flex items-center justify-between">
                  <h3 class="font-semibold text-surface-900 dark:text-surface-0">{{ post.author }}</h3>
                  <Button icon="pi pi-ellipsis-h" text rounded size="small" />
                </div>
                <p class="text-surface-700 dark:text-surface-300">{{ post.content }}</p>
                <div v-if="post.image" class="mt-3">
                  <img :src="post.image" alt="Post image" class="rounded-lg max-w-md w-full h-48 object-cover" />
                </div>
                <div class="flex items-center justify-between pt-2">
                  <span class="text-xs text-surface-500 dark:text-surface-400">{{ post.timestamp }}</span>
                  <div class="flex items-center gap-2">
                    <Button icon="pi pi-heart" text size="small" />
                    <Button icon="pi pi-comment" text size="small" />
                    <Button icon="pi pi-share-alt" text size="small" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </Card>

    <!-- Example 3: Single Card -->
    <Card class="p-6">
      <template #title>
        <h2 class="text-xl font-semibold">Single Card</h2>
      </template>
      
      <template #content>
        <div class="max-w-md mx-auto">
          <Card class="shadow-lg">
            <template #content>
              <div class="space-y-4">
                <div class="flex items-start gap-3">
                  <Avatar 
                    image="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face" 
                    size="large" 
                    shape="circle" 
                  />
                  <div class="flex-1">
                    <div class="flex items-center justify-between mb-1">
                      <h4 class="font-semibold text-surface-900 dark:text-surface-0">Sarah Wilson</h4>
                      <Button icon="pi pi-ellipsis-h" text rounded size="small" />
                    </div>
                    <span class="text-xs text-surface-500 dark:text-surface-400">2 hours ago</span>
                  </div>
                </div>
                
                <p class="text-surface-700 dark:text-surface-300">
                  Just finished an amazing hiking trip! The views were absolutely breathtaking. 
                  Nature has a way of putting everything in perspective. 🏔️
                </p>
                
                <img 
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop" 
                  alt="Hiking view" 
                  class="w-full h-48 object-cover rounded-lg"
                />
                
                <Divider />
                
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-4">
                    <Button icon="pi pi-heart" label="24" text size="small" class="text-surface-600 dark:text-surface-400" />
                    <Button icon="pi pi-comment" label="8" text size="small" class="text-surface-600 dark:text-surface-400" />
                  </div>
                  <Button icon="pi pi-share-alt" text size="small" class="text-surface-600 dark:text-surface-400" />
                </div>
              </div>
            </template>
          </Card>
        </div>
      </template>
    </Card>

    <!-- Example 4: Timeline -->
    <Card class="p-6">
      <template #title>
        <h2 class="text-xl font-semibold">Timeline</h2>
      </template>
      
      <template #content>
        <div class="space-y-6">
          <!-- Activity Timeline -->
          <div class="space-y-4">
            <div v-for="event in timelineEvents" :key="event.id" class="flex items-start gap-3">
              <Avatar :image="event.avatar" size="large" shape="circle" class="shadow-sm" />
              <div class="flex-1 space-y-1">
                <div class="flex items-center gap-2">
                  <span class="font-semibold text-surface-900 dark:text-surface-0">{{ event.author }}</span>
                  <span class="text-surface-700 dark:text-surface-300">{{ event.action }}</span>
                </div>
                <div v-if="event.attachment" class="flex items-center gap-2 mt-2">
                  <div class="flex items-center gap-2 px-3 py-2 bg-surface-100 dark:bg-surface-800 rounded-lg text-sm">
                    <i :class="[event.attachment.icon, 'text-surface-600 dark:text-surface-400']"></i>
                    <span class="text-surface-700 dark:text-surface-300">{{ event.attachment.name }}</span>
                  </div>
                </div>
                <span class="text-xs text-surface-500 dark:text-surface-400">{{ event.timestamp }}</span>
              </div>
              <Button icon="pi pi-ellipsis-h" text rounded size="small" />
            </div>
          </div>

          <Divider />

          <!-- Notification Style Timeline -->
          <div class="space-y-4">
            <h3 class="font-medium text-surface-900 dark:text-surface-0 mb-3">Today</h3>
            <div v-for="notification in notifications.slice(0, 2)" :key="notification.id" class="flex items-start gap-3">
              <div :class="['p-3 rounded-lg', notification.iconBg]">
                <i :class="[notification.icon, notification.iconColor, 'text-lg']"></i>
              </div>
              <div class="flex-1">
                <p class="text-surface-700 dark:text-surface-300">
                  <span v-if="notification.title" class="font-semibold text-surface-900 dark:text-surface-0">
                    {{ notification.title }}
                  </span>
                  {{ notification.description }}
                </p>
                <span class="text-xs text-surface-500 dark:text-surface-400">{{ notification.time }} ago</span>
              </div>
            </div>

            <h3 class="font-medium text-surface-900 dark:text-surface-0 mb-3 mt-6">Yesterday</h3>
            <div v-for="notification in notifications.slice(2)" :key="notification.id" class="flex items-start gap-3">
              <div :class="['p-3 rounded-lg', notification.iconBg]">
                <i :class="[notification.icon, notification.iconColor, 'text-lg']"></i>
              </div>
              <div class="flex-1">
                <p class="text-surface-700 dark:text-surface-300">
                  <span v-if="notification.title" class="font-semibold text-surface-900 dark:text-surface-0">
                    {{ notification.title }}
                  </span>
                  {{ notification.description }}
                </p>
                <span class="text-xs text-surface-500 dark:text-surface-400">{{ notification.time }} ago</span>
              </div>
            </div>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>