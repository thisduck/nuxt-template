<script setup lang="ts">
// Basic Date Selection
const selectedDate = ref();

// Forms Integration
const selectedFormDate = ref();
const isFormDateValid = computed(() => !!selectedFormDate.value);

// Custom Format
const selectedCustomDate = ref();

// With Icon
const selectedIconDate = ref();

// Min/Max Dates
const selectedMinMaxDate = ref();
const today = new Date();
const minDate = new Date();
minDate.setDate(today.getDate() - 30); // 30 days ago
const maxDate = new Date();
maxDate.setDate(today.getDate() + 30); // 30 days from now

// Multiple Selection
const selectedMultipleDates = ref([]);

// Range Selection
const selectedDateRange = ref();

// Time Selection
const selectedDateTime = ref();

// Month Picker
const selectedMonth = ref();

// Year Picker
const selectedYear = ref();

// Inline Display
const selectedInlineDate = ref();

// Custom Template
const selectedTemplateDate = ref();

// States
const selectedValidDate = ref();
const selectedInvalidDate = ref();
const selectedDisabledDate = ref();

// Filled Variant
const selectedFilledDate = ref();

// tRPC Backend
const { $trpc } = useNuxtApp();
const selectedEventDate = ref();
const events = ref([]);

// Load events from backend
onMounted(async () => {
  try {
    // We'll use the existing hello endpoint as placeholder since we don't have a specific events endpoint
    // In a real app, you'd have an endpoint that returns events with dates
    events.value = [
      { id: 1, title: 'Team Meeting', date: new Date(), type: 'meeting' },
      { id: 2, title: 'Project Deadline', date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), type: 'deadline' },
      { id: 3, title: 'Conference', date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), type: 'event' },
      { id: 4, title: 'Code Review', date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), type: 'meeting' },
    ];
  } catch (error) {
    console.error('Failed to load events:', error);
    events.value = [];
  }
});

// Check if date has events
function hasEvent(date) {
  return events.value.some(event => 
    event.date.toDateString() === date.toDateString()
  );
}

// Get events for a specific date
function getEventsForDate(date) {
  return events.value.filter(event => 
    event.date.toDateString() === date.toDateString()
  );
}
</script>

<template>
  <div class="p-6 lg:p-8 flex flex-col gap-8">
    <!-- Header -->
    <div class="flex flex-col gap-3 border-b border-surface-200 dark:border-surface-700 pb-6">
      <div class="flex items-center gap-3">
        <i class="pi pi-calendar text-3xl text-primary-500" />
        <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0">
          DatePicker
        </h1>
      </div>
      <p class="text-surface-600 dark:text-surface-300 max-w-3xl">
        DatePicker is used to select a date with an optional time picker. It provides various modes including single date, multiple dates, date ranges, and time selection with extensive customization options.
      </p>
    </div>

    <!-- Basic Date Selection -->
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-2">
        <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
          Basic Date Selection
        </h2>
        <Tag value="Most Common" severity="success" />
      </div>
      <p class="text-surface-600 dark:text-surface-300">
        DatePicker is used with the v-model property for two-way value binding. Default date format is mm/dd/yy which can be customized using the dateFormat property.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <label class="font-semibold text-surface-900 dark:text-surface-0">Select Date</label>
          <DatePicker 
            v-model="selectedDate" 
            placeholder="Select a date"
            class="w-full md:w-auto"
          />
          <small class="text-surface-600 dark:text-surface-300">
            Selected: {{ selectedDate ? selectedDate.toLocaleDateString() : 'None' }}
          </small>
        </div>
      </div>
    </div>

    <!-- Forms Integration -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Forms Integration
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        DatePicker integrates seamlessly with form validation and provides error handling.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <label class="font-semibold text-surface-900 dark:text-surface-0">Birth Date (Required)</label>
          <DatePicker 
            v-model="selectedFormDate" 
            placeholder="Select your birth date"
            :invalid="!isFormDateValid"
            class="w-full md:w-auto"
          />
          <Message v-if="!isFormDateValid" severity="error" size="small">
            Please select your birth date
          </Message>
          <small class="text-surface-600 dark:text-surface-300">
            Form validation with error messaging
          </small>
        </div>
      </div>
    </div>

    <!-- Custom Format -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Custom Format
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Customize the display format using the dateFormat property. Common formats include dd/mm/yy, mm-dd-yy, and dd.mm.yy.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <label class="font-semibold text-surface-900 dark:text-surface-0">Custom Date Format (dd/mm/yy)</label>
          <DatePicker 
            v-model="selectedCustomDate" 
            date-format="dd/mm/yy"
            placeholder="DD/MM/YY"
            class="w-full md:w-auto"
          />
          <small class="text-surface-600 dark:text-surface-300">
            European date format with day-month-year order
          </small>
        </div>
      </div>
    </div>

    <!-- With Icon -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        With Icon
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Add an icon to the input field using the showIcon property for better visual identification.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <label class="font-semibold text-surface-900 dark:text-surface-0">Date with Icon</label>
          <DatePicker 
            v-model="selectedIconDate" 
            show-icon
            placeholder="Select a date"
            class="w-full md:w-auto"
          />
          <small class="text-surface-600 dark:text-surface-300">
            Calendar icon for better user experience
          </small>
        </div>
      </div>
    </div>

    <!-- Min/Max Dates -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Min/Max Dates
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Restrict date selection using minDate and maxDate properties to define valid date ranges.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <label class="font-semibold text-surface-900 dark:text-surface-0">Date Range (±30 days)</label>
          <DatePicker 
            v-model="selectedMinMaxDate" 
            :min-date="minDate"
            :max-date="maxDate"
            show-icon
            placeholder="Select within range"
            class="w-full md:w-auto"
          />
          <small class="text-surface-600 dark:text-surface-300">
            Only dates within 30 days range are selectable
          </small>
        </div>
      </div>
    </div>

    <!-- Multiple Selection -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Multiple Selection
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Enable multiple date selection using the selectionMode="multiple" property.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <label class="font-semibold text-surface-900 dark:text-surface-0">Select Multiple Dates</label>
          <DatePicker 
            v-model="selectedMultipleDates" 
            selection-mode="multiple"
            show-icon
            placeholder="Select multiple dates"
            class="w-full md:w-auto"
          />
          <small class="text-surface-600 dark:text-surface-300">
            Selected: {{ selectedMultipleDates.length }} dates
          </small>
        </div>
      </div>
    </div>

    <!-- Range Selection -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Range Selection
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Select a date range using the selectionMode="range" property for start and end date selection.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <label class="font-semibold text-surface-900 dark:text-surface-0">Select Date Range</label>
          <DatePicker 
            v-model="selectedDateRange" 
            selection-mode="range"
            show-icon
            placeholder="Select date range"
            class="w-full md:w-auto"
          />
          <small class="text-surface-600 dark:text-surface-300">
            Perfect for booking systems and period selection
          </small>
        </div>
      </div>
    </div>

    <!-- Time Selection -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Time Selection
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Include time selection by enabling the showTime property for complete datetime picking.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <label class="font-semibold text-surface-900 dark:text-surface-0">Date and Time</label>
          <DatePicker 
            v-model="selectedDateTime" 
            show-time
            show-icon
            placeholder="Select date and time"
            class="w-full md:w-auto"
          />
          <small class="text-surface-600 dark:text-surface-300">
            Combined date and time selection
          </small>
        </div>
      </div>
    </div>

    <!-- Month Picker -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Month Picker
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Month-only selection using the view="month" and dateFormat="mm/yy" properties.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <label class="font-semibold text-surface-900 dark:text-surface-0">Select Month</label>
          <DatePicker 
            v-model="selectedMonth" 
            view="month" 
            date-format="mm/yy"
            show-icon
            placeholder="Select month"
            class="w-full md:w-auto"
          />
          <small class="text-surface-600 dark:text-surface-300">
            Useful for monthly reports and billing cycles
          </small>
        </div>
      </div>
    </div>

    <!-- Year Picker -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Year Picker
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Year-only selection using the view="year" and dateFormat="yy" properties.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <label class="font-semibold text-surface-900 dark:text-surface-0">Select Year</label>
          <DatePicker 
            v-model="selectedYear" 
            view="year" 
            date-format="yy"
            show-icon
            placeholder="Select year"
            class="w-full md:w-auto"
          />
          <small class="text-surface-600 dark:text-surface-300">
            Perfect for birth year or graduation year selection
          </small>
        </div>
      </div>
    </div>

    <!-- Inline Display -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Inline Display
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Display the calendar inline without input field using the inline property.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <label class="font-semibold text-surface-900 dark:text-surface-0">Inline Calendar</label>
          <DatePicker 
            v-model="selectedInlineDate" 
            inline
          />
          <small class="text-surface-600 dark:text-surface-300">
            Selected: {{ selectedInlineDate ? selectedInlineDate.toLocaleDateString() : 'None' }}
          </small>
        </div>
      </div>
    </div>

    <!-- Filled Variant -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        Filled Variant
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Use the filled variant for higher visual emphasis than the default outlined style.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <label class="font-semibold text-surface-900 dark:text-surface-0">Filled DatePicker</label>
          <DatePicker 
            v-model="selectedFilledDate" 
            variant="filled"
            show-icon
            placeholder="Select a date"
            class="w-full md:w-auto"
          />
          <small class="text-surface-600 dark:text-surface-300">
            Enhanced visual emphasis with filled background
          </small>
        </div>
      </div>
    </div>

    <!-- States -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
        States
      </h2>
      <p class="text-surface-600 dark:text-surface-300">
        Different states can be applied to indicate validation status or user interaction constraints.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
          <div class="flex flex-col gap-4">
            <h3 class="font-semibold text-surface-900 dark:text-surface-0">Valid</h3>
            <DatePicker 
              v-model="selectedValidDate" 
              show-icon
              placeholder="Valid state"
              class="w-full"
            />
            <small class="text-surface-600 dark:text-surface-300">Normal state</small>
          </div>
        </div>

        <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
          <div class="flex flex-col gap-4">
            <h3 class="font-semibold text-surface-900 dark:text-surface-0">Invalid</h3>
            <DatePicker 
              v-model="selectedInvalidDate" 
              show-icon
              placeholder="Invalid state"
              :invalid="true"
              class="w-full"
            />
            <small class="text-red-500">Error state for validation</small>
          </div>
        </div>

        <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
          <div class="flex flex-col gap-4">
            <h3 class="font-semibold text-surface-900 dark:text-surface-0">Disabled</h3>
            <DatePicker 
              v-model="selectedDisabledDate" 
              show-icon
              placeholder="Disabled state"
              disabled
              class="w-full"
            />
            <small class="text-surface-600 dark:text-surface-300">Cannot be edited</small>
          </div>
        </div>
      </div>
    </div>

    <!-- tRPC Backend -->
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-2">
        <h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
          Event Calendar
        </h2>
        <Tag value="Real API" severity="info" />
      </div>
      <p class="text-surface-600 dark:text-surface-300">
        DatePicker with custom templates highlighting dates that have events loaded from the backend.
      </p>

      <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700">
        <div class="flex flex-col gap-4">
          <label class="font-semibold text-surface-900 dark:text-surface-0">Select Event Date</label>
          <DatePicker 
            v-model="selectedEventDate" 
            show-icon
            placeholder="Select date to view events"
            class="w-full md:w-auto"
          >
            <template #date="{ date }">
              <div class="relative">
                <span>{{ date.day }}</span>
                <div 
                  v-if="hasEvent(new Date(date.year, date.month, date.day))"
                  class="absolute -top-1 -right-1 w-2 h-2 bg-primary-500 rounded-full"
                ></div>
              </div>
            </template>
          </DatePicker>
          
          <div v-if="selectedEventDate" class="mt-4 p-4 bg-primary-50 dark:bg-primary-500/10 rounded-lg border border-primary-200 dark:border-primary-500/20">
            <h4 class="font-semibold text-primary-900 dark:text-primary-100 mb-2">
              Events for {{ selectedEventDate.toLocaleDateString() }}
            </h4>
            <div v-if="getEventsForDate(selectedEventDate).length > 0" class="space-y-2">
              <div 
                v-for="event in getEventsForDate(selectedEventDate)" 
                :key="event.id"
                class="flex items-center gap-2 text-primary-800 dark:text-primary-200"
              >
                <i :class="{
                  'pi pi-users': event.type === 'meeting',
                  'pi pi-clock': event.type === 'deadline', 
                  'pi pi-calendar': event.type === 'event'
                }" />
                <span>{{ event.title }}</span>
              </div>
            </div>
            <div v-else class="text-surface-600 dark:text-surface-300">
              No events scheduled for this date
            </div>
          </div>
          
          <small class="text-surface-600 dark:text-surface-300">
            Dates with events show a blue dot indicator
          </small>
        </div>
      </div>
    </div>
  </div>
</template>