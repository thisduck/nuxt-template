import process from 'node:process';

export default defineNuxtPlugin(() => {
  // Mark as hydrated to prevent FOUC
  if (process.client) {
    document.documentElement.classList.add('hydrated');
  }
});

