<script setup lang="ts">
// no layout
definePageMeta({ layout: false });

const updates = ref([
  {
    title: 'New Telemedicine System',
    description: 'Integrated telemedicine platform improves remote patient consultations by 30%.',
    date: 'February 20, 2026',
  },
  {
    title: 'Electronic Health Record (EHR) Upgrade',
    description: 'Increased EHR capacity by 500TB, reducing data retrieval latency for patient records.',
    date: 'Implemented March 5, 2025',
  },
  {
    title: 'Staff Training Module Launch',
    description: 'New training module for staff improves protocol compliance by 20%.',
    date: 'Launched February 15, 2026',
  },
]);
const teamMembers = ref([
  {
    name: 'Dr. Robert Fox',
    role: 'Cardiologist',
    avatar: 'https://fqjltiegiezfetthbags.supabase.co/storage/v1/object/public/block.images/blocks/stackedlist/jacob.png',
    isOnline: true,
    lastActive: '',
  },
  {
    name: 'Dr. Theresa Webb',
    role: 'Neurologist',
    avatar: 'https://fqjltiegiezfetthbags.supabase.co/storage/v1/object/public/block.images/blocks/stackedlist/theresa.png',
    isOnline: true,
    lastActive: '',
  },
  {
    name: 'Nurse Arlene McCoy',
    role: 'Head Nurse',
    avatar: 'https://fqjltiegiezfetthbags.supabase.co/storage/v1/object/public/block.images/blocks/stackedlist/arlene.png',
    isOnline: false,
    lastActive: '2 hours ago',
  },
  {
    name: 'Dr. Jacob Jones',
    role: 'Surgeon',
    avatar: 'https://fqjltiegiezfetthbags.supabase.co/storage/v1/object/public/block.images/blocks/stackedlist/jacob.png',
    isOnline: false,
    lastActive: '7 hours ago',
  },
  {
    name: 'Dr. Jane Cooper',
    role: 'Chief of Staff',
    avatar: 'https://fqjltiegiezfetthbags.supabase.co/storage/v1/object/public/block.images/blocks/stackedlist/jane.png',
    isOnline: false,
    lastActive: '1 day ago',
  },
]);
</script>

<template>
  <div class="min-h-screen flex relative lg:static bg-surface-50 dark:bg-surface-950">
    <div
      id="app-sidebar-1"
      class="bg-surface-0 dark:bg-surface-900 min-h-screen hidden lg:block shrink-0 absolute lg:static left-0 top-0 z-10 border-r border-surface-200 dark:border-surface-700 select-none w-[280px]"
    >
      <div class="flex flex-col h-full">
        <div class="p-4 flex items-center gap-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="43" height="43" viewBox="0 0 43 43" fill="none" class="w-10 h-10">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M21.5 42.0498C33.098 42.0498 42.5 32.6477 42.5 21.0498C42.5 9.45183 33.098 0.0498047 21.5 0.0498047C9.902 0.0498047 0.5 9.45183 0.5 21.0498C0.5 32.6477 9.902 42.0498 21.5 42.0498ZM28.0513 9.83248C28.3702 8.69975 27.2709 8.02994 26.267 8.74516L12.2528 18.7288C11.164 19.5045 11.3353 21.0498 12.51 21.0498H16.2003V21.0212H23.3926L17.5323 23.089L14.9487 32.2671C14.6299 33.3999 15.729 34.0697 16.733 33.3544L30.7472 23.3708C31.836 22.5951 31.6646 21.0498 30.49 21.0498H24.8937L28.0513 9.83248Z"
              class="fill-surface-900 dark:fill-surface-0"
            />
          </svg>
          <span class="text-lg font-semibold leading-tight text-surface-900 dark:text-surface-0">MediCore</span>
        </div>
        <div class="overflow-y-auto flex-1 p-2 flex flex-col gap-4">
          <ul class="list-none m-0 flex flex-col gap-1">
            <li>
              <div
                v-styleclass="{
                  selector: '@next',
                  enterFromClass: 'hidden',
                  enterActiveClass: 'animate-slidedown',
                  leaveToClass: 'hidden',
                  leaveActiveClass: 'animate-slideup',
                }"
                class="flex items-center cursor-pointer p-3 gap-4 rounded-lg text-surface-900 dark:text-surface-0 hover:bg-surface-50 dark:hover:bg-surface-800 border border-transparent hover:border-surface-100 dark:hover:border-surface-700 transition-colors duration-150"
              >
                <span class="font-semibold text-base leading-tight">Home</span>
                <i class="pi pi-angle-down text-base! leading-none! text-surface-500 dark:text-surface-400 ml-auto" />
              </div>
              <ul class="list-none m-0 overflow-hidden flex flex-col gap-1 mt-1">
                <li>
                  <a
                    class="flex items-center cursor-pointer p-3 gap-2 rounded-lg text-surface-700 dark:text-surface-200 hover:bg-surface-50 dark:hover:bg-surface-800 border border-transparent hover:border-surface-100 dark:hover:border-surface-700 transition-colors duration-150 hover:text-surface-900 dark:hover:text-surface-50"
                  >
                    <i class="pi pi-chart-pie text-base! leading-none! text-surface-500 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-50" />
                    <span class="font-medium text-base leading-tight">Dashboard</span>
                  </a>
                </li>
                <li>
                  <a
                    class="flex items-center cursor-pointer p-3 gap-2 rounded-lg text-surface-700 dark:text-surface-200 hover:bg-surface-50 dark:hover:bg-surface-800 border border-transparent hover:border-surface-100 dark:hover:border-surface-700 transition-colors duration-150 hover:text-surface-900 dark:hover:text-surface-50"
                  >
                    <i class="pi pi-clipboard text-base! leading-none! text-surface-500 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-50" />
                    <span class="font-medium text-base leading-tight">Patient Records</span>
                    <Badge value="8" severity="contrast" class="ml-auto h-5! min-w-5! text-xs! font-bold! leading-tight! rounded-xl!" />
                  </a>
                </li>
                <li>
                  <a
                    class="flex items-center cursor-pointer p-3 gap-2 rounded-lg text-surface-700 dark:text-surface-200 hover:bg-surface-50 dark:hover:bg-surface-800 border border-transparent hover:border-surface-100 dark:hover:border-surface-700 transition-colors duration-150 hover:text-surface-900 dark:hover:text-surface-50"
                  >
                    <i class="pi pi-users text-base! leading-none! text-surface-500 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-50" />
                    <span class="font-medium text-base leading-tight">Staff Directory</span>
                  </a>
                </li>
                <li>
                  <a
                    class="flex items-center cursor-pointer p-3 gap-2 rounded-lg text-surface-700 dark:text-surface-200 hover:bg-surface-50 dark:hover:bg-surface-800 border border-transparent hover:border-surface-100 dark:hover:border-surface-700 transition-colors duration-150 hover:text-surface-900 dark:hover:text-surface-50"
                  >
                    <i class="pi pi-inbox text-base! leading-none! text-surface-500 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-50" />
                    <span class="font-medium text-base leading-tight">Messages</span>
                    <Badge value="2" severity="secondary" class="ml-auto h-5! min-w-5! text-xs! font-bold! leading-tight! rounded-xl!" />
                  </a>
                </li>
                <li>
                  <a
                    class="flex items-center cursor-pointer p-3 gap-2 rounded-lg text-surface-700 dark:text-surface-200 hover:bg-surface-50 dark:hover:bg-surface-800 border border-transparent hover:border-surface-100 dark:hover:border-surface-700 transition-colors duration-150 hover:text-surface-900 dark:hover:text-surface-50"
                  >
                    <i class="pi pi-calendar text-base! leading-none! text-surface-500 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-50" />
                    <span class="font-medium text-base leading-tight">Schedule</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>

          <hr class="border-t border-surface-200 dark:border-surface-800 my-0">

          <ul class="list-none m-0 flex flex-col gap-1">
            <li>
              <div
                v-styleclass="{
                  selector: '@next',
                  enterFromClass: 'hidden',
                  enterActiveClass: 'animate-slidedown',
                  leaveToClass: 'hidden',
                  leaveActiveClass: 'animate-slideup',
                }"
                class="flex items-center cursor-pointer p-3 gap-4 rounded-lg text-surface-900 dark:text-surface-0 hover:bg-surface-50 dark:hover:bg-surface-800 border border-transparent hover:border-surface-100 dark:hover:border-surface-700 transition-colors duration-150"
              >
                <span class="font-semibold text-base leading-tight">Hospital Departments</span>
                <i class="pi pi-angle-down text-base! leading-none! text-surface-500 dark:text-surface-400 ml-auto" />
              </div>
              <ul class="list-none m-0 overflow-hidden flex flex-col gap-1 mt-1">
                <li>
                  <a
                    class="flex items-center cursor-pointer p-3 gap-2 rounded-lg text-surface-700 dark:text-surface-200 hover:bg-surface-50 dark:hover:bg-surface-800 border border-transparent hover:border-surface-100 dark:hover:border-surface-700 transition-colors duration-150 hover:text-surface-900 dark:hover:text-surface-50"
                  >
                    <span class="inline-flex items-center justify-center p-1 bg-violet-100 dark:bg-violet-500/20 rounded-md border border-violet-200 dark:border-violet-500/30">
                      <i class="pi pi-wave-pulse text-xs! leading-none! text-violet-600 dark:text-violet-300" />
                    </span>
                    <span class="font-medium text-base leading-tight">Emergency Department</span>
                  </a>
                </li>
                <li>
                  <a
                    class="flex items-center cursor-pointer p-3 gap-2 rounded-lg text-surface-700 dark:text-surface-200 hover:bg-surface-50 dark:hover:bg-surface-800 border border-transparent hover:border-surface-100 dark:hover:border-surface-700 transition-colors duration-150 hover:text-surface-900 dark:hover:text-surface-50"
                  >
                    <span class="inline-flex items-center justify-center p-1 bg-amber-100 dark:bg-amber-500/20 rounded-md border border-amber-200 dark:border-amber-500/30">
                      <i class="pi pi-heart text-xs! leading-none! text-amber-600 dark:text-amber-300" />
                    </span>
                    <span class="font-medium text-base leading-tight">Intensive Care Unit</span>
                  </a>
                </li>
                <li>
                  <a
                    class="flex items-center cursor-pointer p-3 gap-2 rounded-lg text-surface-700 dark:text-surface-200 hover:bg-surface-50 dark:hover:bg-surface-800 border border-transparent hover:border-surface-100 dark:hover:border-surface-700 transition-colors duration-150 hover:text-surface-900 dark:hover:text-surface-50"
                  >
                    <span class="inline-flex items-center justify-center p-1 bg-lime-100 dark:bg-lime-500/20 rounded-md border border-lime-200 dark:border-lime-500/30">
                      <i class="pi pi-bullseye text-xs! leading-none! text-lime-600 dark:text-lime-300" />
                    </span>
                    <span class="font-medium text-base leading-tight">Surgical Unit</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <div class="p-2 mt-autoborder-surface-200 dark:border-surface-800 has-[ul.hidden]:border-t">
          <ul class="list-none p-2 m-0 hidden origin-bottom animate-duration-150 border-t border-surface-200 dark:border-surface-800">
            <li>
              <a
                class="flex items-center cursor-pointer p-3 gap-2 rounded-lg text-surface-700 dark:text-surface-200 hover:bg-surface-50 dark:hover:bg-surface-800 border border-transparent hover:border-surface-200 dark:hover:border-surface-700 transition-colors duration-150 hover:text-surface-900 dark:hover:text-surface-50"
              >
                <i class="pi pi-user text-base! leading-none!" />
                <span class="font-medium text-base leading-tight">Profile</span>
              </a>
            </li>
            <li>
              <a
                class="flex items-center cursor-pointer p-3 gap-2 rounded-lg text-surface-700 dark:text-surface-200 hover:bg-surface-50 dark:hover:bg-surface-800 border border-transparent hover:border-surface-200 dark:hover:border-surface-700 transition-colors duration-150 hover:text-surface-900 dark:hover:text-surface-50"
              >
                <i class="pi pi-cog text-base! leading-none!" />
                <span class="font-medium text-base leading-tight">Settings</span>
              </a>
            </li>
            <li>
              <a
                class="flex items-center cursor-pointer p-3 gap-2 rounded-lg text-surface-700 dark:text-surface-200 hover:bg-surface-50 dark:hover:bg-surface-800 border border-transparent hover:border-surface-200 dark:hover:border-surface-700 transition-colors duration-150 hover:text-surface-900 dark:hover:text-surface-50"
              >
                <i class="pi pi-sign-out text-base! leading-none!" />
                <span class="font-medium text-base leading-tight">Sign Out</span>
              </a>
            </li>
          </ul>
          <a
            v-styleclass="{
              selector: '@prev',
              enterFromClass: 'hidden',
              enterActiveClass: 'animate-scalein',
              leaveToClass: 'hidden',
              leaveActiveClass: 'animate-fadeout',
            }"
            class="flex items-center cursor-pointer p-2 gap-2 text-surface-900 dark:text-surface-0 hover: transition-colors duration-150"
          >
            <img src="https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/avatars/avatar-amyels.png" class="w-8 h-8 rounded-full">
            <span class="font-medium text-base leading-tight">Amy Elsner</span>
            <i class="pi pi-angle-up text-base! leading-none! text-surface-500 dark:text-surface-400 ml-auto" />
          </a>
        </div>
      </div>
    </div>
    <div class="min-h-screen flex flex-col relative flex-auto">
      <div class="flex justify-between items-center py-4 px-8 bg-surface-0 dark:bg-surface-900 border-b border-surface-200 dark:border-surface-700 relative lg:static">
        <div class="flex items-center">
          <a
            v-styleclass="{
              selector: '#app-sidebar-1',
              enterFromClass: 'hidden',
              enterActiveClass: 'animate-fadeinleft',
              leaveToClass: 'hidden',
              leaveActiveClass: 'animate-fadeoutleft',
              hideOnOutsideClick: true,
            }"
            class="cursor-pointer block lg:hidden text-surface-700 dark:text-surface-100 mr-4"
          >
            <i class="pi pi-bars text-2xl" />
          </a>
        </div>
        <div class="flex items-center gap-8">
          <i class="pi pi-bell text-lg! leading-none! text-surface-500 dark:text-surface-400 cursor-pointer" />
          <img src="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" class="w-8 h-8 rounded-full cursor-pointer">
        </div>
      </div>
      <div class="p-8 flex flex-col flex-auto gap-8">
        <div class="flex flex-col gap-4">
          <ul class="list-none p-0 m-0 flex flex-wrap items-center font-medium">
            <li class="flex items-center">
              <a class="text-surface-500 dark:text-surface-300 no-underline leading-normal cursor-pointer">Application</a>
            </li>
            <li class="px-2">
              <i class="pi pi-angle-right text-surface-500 dark:text-surface-300 leading-normal!" />
            </li>
            <li class="flex items-center">
              <a class="text-surface-500 dark:text-surface-300 no-underline leading-normal cursor-pointer truncate sm:max-w-none max-w-[120px]">Patient Management</a>
            </li>
            <li class="px-2">
              <i class="pi pi-angle-right text-surface-500 dark:text-surface-300 leading-normal!" />
            </li>
            <li>
              <span class="text-surface-900 dark:text-surface-0 leading-normal">Admissions</span>
            </li>
          </ul>
          <div class="flex flex-col md:flex-row md:justify-between gap-4">
            <span class="text-3xl font-bold text-surface-900 dark:text-surface-0">Admissions</span>
            <div class="flex items-center">
              <IconField icon-position="left">
                <InputIcon class="pi pi-search text-surface-700 dark:text-surface-100" />
                <InputText type="text" placeholder="Search" />
              </IconField>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 pt-8">
          <div class="bg-surface-0 dark:bg-surface-900 shadow-sm p-5 rounded-2xl flex flex-col gap-4">
            <div class="flex justify-between gap-4">
              <div class="flex flex-col gap-2">
                <span class="text-surface-700 dark:text-surface-300 font-normal leading-tight">Emergency Alerts</span>
                <div class="text-surface-900 dark:text-surface-0 font-semibold text-2xl! leading-tight!">
                  24
                </div>
              </div>
              <div class="flex items-center justify-center bg-linear-to-b from-cyan-400 dark:from-cyan-300 to-cyan-600 dark:to-cyan-500 rounded-lg w-10 h-10">
                <i class="pi pi-exclamation-circle text-surface-0 dark:text-surface-900 text-xl! leading-none!" />
              </div>
            </div>
            <div class="flex-1 flex items-end gap-1">
              <span class="text-surface-600 dark:text-surface-300 leading-tight"><b>12</b> new since last shift</span>
            </div>
          </div>

          <div class="bg-surface-0 dark:bg-surface-900 shadow-sm p-5 rounded-2xl flex flex-col gap-4">
            <div class="flex justify-between gap-4">
              <div class="flex flex-col gap-2">
                <span class="text-surface-700 dark:text-surface-300 font-normal leading-tight">Patient Admissions</span>
                <div class="text-surface-900 dark:text-surface-0 font-semibold text-2xl! leading-tight!">
                  48
                </div>
              </div>
              <div class="flex items-center justify-center bg-linear-to-b from-orange-400 dark:from-orange-300 to-orange-600 dark:to-orange-500 rounded-lg w-10 h-10">
                <i class="pi pi-user-plus text-surface-0 dark:text-surface-900 text-xl! leading-none!" />
              </div>
            </div>
            <div class="flex-1 flex items-end">
              <span class="text-surface-600 dark:text-surface-300 leading-tight"><b>25</b> new since last shift</span>
            </div>
          </div>

          <div class="bg-surface-0 dark:bg-surface-900 shadow-sm p-5 rounded-2xl flex flex-col gap-4">
            <div class="flex justify-between gap-4">
              <div class="flex flex-col gap-2">
                <span class="text-surface-700 dark:text-surface-300 font-normal leading-tight">Medical Records</span>
                <div class="text-surface-900 dark:text-surface-0 font-semibold text-2xl! leading-tight!">
                  15,320
                </div>
              </div>
              <div class="flex items-center justify-center bg-linear-to-b from-slate-400 dark:from-slate-300 to-slate-600 dark:to-slate-500 rounded-lg w-10 h-10">
                <i class="pi pi-clipboard text-surface-0 dark:text-surface-900 text-xl! leading-none!" />
              </div>
            </div>
            <div class="flex-1 flex items-end gap-1">
              <span class="text-surface-600 dark:text-surface-300 leading-tight"><b>2,985</b> records updated</span>
            </div>
          </div>

          <div class="bg-surface-0 dark:bg-surface-900 shadow-sm p-5 rounded-2xl flex flex-col gap-4">
            <div class="flex justify-between gap-4">
              <div class="flex flex-col gap-2">
                <span class="text-surface-700 dark:text-surface-300 font-normal leading-tight">Staff On Duty</span>
                <div class="text-surface-900 dark:text-surface-0 font-semibold text-2xl! leading-tight!">
                  2,566
                </div>
              </div>
              <div class="flex items-center justify-center bg-linear-to-b from-violet-400 dark:from-violet-300 to-violet-600 dark:to-violet-500 rounded-lg w-10 h-10">
                <i class="pi pi-user text-surface-0 dark:text-surface-900 text-xl! leading-none!" />
              </div>
            </div>
            <div class="flex-1 flex items-end">
              <span class="text-surface-600 dark:text-surface-300 leading-tight"><b>320</b> on duty this shift </span>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div class="bg-surface-0 dark:bg-surface-900 p-6 shadow-sm rounded-2xl flex flex-col gap-8">
            <div class="flex justify-between items-start sm:flex-row flex-col gap-2">
              <div class="text-xl font-medium text-surface-900 dark:text-surface-0 leading-tight">
                Recent Hospital Updates
              </div>
              <Tag icon="pi pi-calendar" value="Q1 2025" />
            </div>

            <div class="flex flex-col gap-4">
              <div v-for="(update, index) in updates" :key="index" class="flex flex-col gap-2">
                <div class="font-medium text-base text-surface-900 dark:text-surface-0 leading-tight">
                  {{ update.title }}
                </div>
                <div class="flex flex-col">
                  <p class="text-base leading-normal text-zinc-500 dark:text-zinc-400">
                    {{ update.description }}
                  </p>
                  <span class="text-zinc-500 dark:text-zinc-400 leading-normal">{{ update.date }}</span>
                </div>

                <div v-if="index < updates.length - 1" class="h-px bg-zinc-200 dark:bg-zinc-700 mt-2" />
              </div>
            </div>

            <div class="flex flex-col md:flex-row items-center md:gap-6 gap-4 w-full">
              <Button label="Clear All" class="flex-1 w-full md:w-auto" severity="secondary" />
              <Button label="New Entry" class="flex-1 w-full md:w-auto" />
            </div>
          </div>
          <div class="bg-surface-0 dark:bg-surface-900 p-6 shadow-sm rounded-2xl flex flex-col gap-8">
            <div class="font-medium text-xl text-surface-900 dark:text-surface-0 leading-tight">
              Medical Team
            </div>

            <div class="flex flex-col gap-6">
              <div v-for="(member, index) in teamMembers" :key="index" class="flex items-center gap-4">
                <div class="flex flex-1 items-center gap-4">
                  <img :src="member.avatar" class="w-[45px] h-[45px] rounded-full">
                  <div class="flex flex-col gap-2 flex-1">
                    <div class="font-medium text-base text-surface-900 dark:text-surface-0 leading-tight">
                      {{ member.name }}
                    </div>
                    <div class="text-sm text-surface-500 dark:text-surface-400 leading-tight">
                      {{ member.role }}
                    </div>
                  </div>
                </div>
                <div class="flex flex-col items-end gap-2">
                  <div class="text-sm font-medium text-surface-900 dark:text-surface-0 leading-tight">
                    Last Active
                  </div>
                  <div v-if="member.isOnline" class="flex items-center gap-1">
                    <span class="w-[7px] h-[7px] rounded-full bg-primary" />
                    <span class="text-sm text-primary leading-tight">Online</span>
                  </div>
                  <div v-else class="text-sm text-surface-500 dark:text-surface-400 leading-tight">
                    {{ member.lastActive }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-surface-0 dark:bg-surface-900 p-6 shadow-sm rounded-2xl flex flex-col gap-8">
          <div class="font-medium text-xl text-surface-900 dark:text-surface-0 leading-tight">
            Critical Activity Log
          </div>
          <div class="flex flex-col gap-4">
            <div class="flex gap-4">
              <div class="flex flex-col items-center">
                <img src="https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/avatars/circle/avatar-m-1.png" alt="Dr. Jacob Jones" class="w-10 h-10 rounded-full object-cover">
                <div class="flex-1 w-px bg-surface-200 dark:bg-surface-700" />
              </div>
              <div class="flex-1 pb-4 flex flex-col gap-2">
                <div class="flex items-center gap-2">
                  <span class="text-surface-900 dark:text-surface-0 font-medium leading-tight">Dr. Jacob Jones</span>
                  <span class="text-surface-500 dark:text-surface-400 leading-tight">·</span>
                  <span class="text-surface-500 dark:text-surface-400 text-sm leading-tight">1 minute ago</span>
                </div>
                <p class="text-surface-700 dark:text-surface-200 leading-normal">
                  Scheduled an emergency surgery for Patient ID #4582 in OR-3, aiming to address a critical cardiac issue.
                </p>
              </div>
            </div>

            <div class="flex gap-4">
              <div class="flex flex-col items-center">
                <div class="w-10 h-10 rounded-full bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 flex items-center justify-center">
                  <i class="pi pi-asterisk text-lg! leading-none! text-surface-500 dark:text-surface-400" />
                </div>
                <div class="flex-1 w-px bg-surface-200 dark:bg-surface-700" />
              </div>
              <div class="flex-1 pb-4 flex flex-col gap-2">
                <div class="flex items-center gap-2">
                  <span class="text-surface-900 dark:text-surface-0 font-medium leading-tight">Nurse Daniel Ortiz</span>
                  <span class="text-surface-500 dark:text-surface-400 leading-tight">·</span>
                  <span class="text-surface-500 dark:text-surface-400 text-sm leading-tight">4 minutes ago</span>
                </div>
                <p class="text-surface-700 dark:text-surface-200 leading-normal">
                  Completed triage for 10 patients in the ER.
                </p>
              </div>
            </div>

            <div class="flex gap-4">
              <div class="flex flex-col items-center">
                <div class="w-10 h-10 rounded-full bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 flex items-center justify-center">
                  <i class="pi pi-tags text-lg! leading-none! text-surface-500 dark:text-surface-400" />
                </div>
                <div class="flex-1 w-px bg-surface-200 dark:bg-surface-700" />
              </div>
              <div class="flex-1 pb-4 flex flex-col gap-2">
                <div class="flex items-center gap-2">
                  <span class="text-surface-900 dark:text-surface-0 font-medium leading-tight">Dr. Olivia Nguyen</span>
                  <span class="text-surface-500 dark:text-surface-400 leading-tight">·</span>
                  <span class="text-surface-500 dark:text-surface-400 text-sm leading-tight">10 minutes ago</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-surface-700 dark:text-surface-200 leading-normal">Added tags</span>
                  <Tag value="Critical Care" severity="secondary" />
                  <Tag value="ICU" severity="secondary" />
                </div>
              </div>
            </div>

            <div class="flex gap-4">
              <div class="flex flex-col items-center">
                <img src="https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/avatars/circle/avatar-f-1.png" alt="Nurse Arlene McCoy" class="w-10 h-10 rounded-full object-cover">
              </div>
              <div class="flex-1 flex flex-col gap-2">
                <div class="flex items-center gap-2">
                  <span class="text-surface-900 dark:text-surface-0 font-medium leading-tight">Nurse Arlene McCoy</span>
                  <span class="text-surface-500 dark:text-surface-400 leading-tight">·</span>
                  <span class="text-surface-500 dark:text-surface-400 text-sm leading-tight">1 hour ago</span>
                </div>
                <p class="text-surface-700 dark:text-surface-200 leading-normal">
                  Reported a potential issue in the ICU ventilator system during peak patient load, suggesting immediate maintenance to avoid downtime.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
