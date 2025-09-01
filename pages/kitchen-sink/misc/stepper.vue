<script setup lang="ts">
import { ref } from 'vue';

const activeStep = ref(1);
const name = ref('');
const email = ref('');
const password = ref('');
const option1 = ref(false);
const option2 = ref(false);
const option3 = ref(false);
const option4 = ref(false);
const option5 = ref(false);
const option6 = ref(false);
const option7 = ref(false);
const option8 = ref(false);
const option9 = ref(false);
const option10 = ref(false);
</script>

<template>
  <div class="p-6 space-y-8">
    <!-- Header -->
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-4">
        <Icon name="pi:list-check" size="32" class="text-primary-500" />
        <div class="flex flex-col">
          <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0">
            Stepper
          </h1>
          <p class="text-surface-600 dark:text-surface-300">
            The Stepper component displays a wizard-like workflow by guiding users through the multi-step progression.
          </p>
        </div>
      </div>
    </div>

    <!-- Horizontal Stepper -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Horizontal Stepper
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Stepper consists of a combination of StepList, Step, StepPanels and StepPanel components.
      </p>

      <div class="card">
        <Stepper value="1">
          <StepList>
            <Step value="1">
              Header I
            </Step>
            <Step value="2">
              Header II
            </Step>
            <Step value="3">
              Header III
            </Step>
          </StepList>
          <StepPanels>
            <StepPanel v-slot="{ activateCallback }" value="1">
              <div class="flex flex-col h-48">
                <div class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">
                  Content I
                </div>
              </div>
              <div class="flex pt-6 justify-end">
                <Button label="Next" icon="pi pi-arrow-right" icon-pos="right" @click="activateCallback('2')" />
              </div>
            </StepPanel>
            <StepPanel v-slot="{ activateCallback }" value="2">
              <div class="flex flex-col h-48">
                <div class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">
                  Content II
                </div>
              </div>
              <div class="flex pt-6 justify-between">
                <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="activateCallback('1')" />
                <Button label="Next" icon="pi pi-arrow-right" icon-pos="right" @click="activateCallback('3')" />
              </div>
            </StepPanel>
            <StepPanel v-slot="{ activateCallback }" value="3">
              <div class="flex flex-col h-48">
                <div class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">
                  Content III
                </div>
              </div>
              <div class="pt-6">
                <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="activateCallback('2')" />
              </div>
            </StepPanel>
          </StepPanels>
        </Stepper>
      </div>
    </div>

    <!-- Vertical Stepper -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Vertical Stepper
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Vertical layout requires StepItem as a wrapper of Step and StepPanel components.
      </p>

      <div class="card">
        <Stepper value="1">
          <StepItem value="1">
            <Step>Header I</Step>
            <StepPanel v-slot="{ activateCallback }">
              <div class="flex flex-col h-48">
                <div class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">
                  Content I
                </div>
              </div>
              <div class="py-6">
                <Button label="Next" @click="activateCallback('2')" />
              </div>
            </StepPanel>
          </StepItem>
          <StepItem value="2">
            <Step>Header II</Step>
            <StepPanel v-slot="{ activateCallback }">
              <div class="flex flex-col h-48">
                <div class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">
                  Content II
                </div>
              </div>
              <div class="flex py-6 gap-2">
                <Button label="Back" severity="secondary" @click="activateCallback('1')" />
                <Button label="Next" @click="activateCallback('3')" />
              </div>
            </StepPanel>
          </StepItem>
          <StepItem value="3">
            <Step>Header III</Step>
            <StepPanel v-slot="{ activateCallback }">
              <div class="flex flex-col h-48">
                <div class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">
                  Content III
                </div>
              </div>
              <div class="py-6">
                <Button label="Back" severity="secondary" @click="activateCallback('2')" />
              </div>
            </StepPanel>
          </StepItem>
        </Stepper>
      </div>
    </div>

    <!-- Linear Stepper -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Linear Stepper
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        When linear property is present, current step must be completed in order to move to the next step.
      </p>

      <div class="card">
        <Stepper value="1" linear>
          <StepList>
            <Step value="1">
              Header I
            </Step>
            <Step value="2">
              Header II
            </Step>
            <Step value="3">
              Header III
            </Step>
          </StepList>
          <StepPanels>
            <StepPanel v-slot="{ activateCallback }" value="1">
              <div class="flex flex-col h-48">
                <div class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">
                  Content I
                </div>
              </div>
              <div class="flex pt-6 justify-end">
                <Button label="Next" icon="pi pi-arrow-right" @click="activateCallback('2')" />
              </div>
            </StepPanel>
            <StepPanel v-slot="{ activateCallback }" value="2">
              <div class="flex flex-col h-48">
                <div class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">
                  Content II
                </div>
              </div>
              <div class="flex pt-6 justify-between">
                <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="activateCallback('1')" />
                <Button label="Next" icon="pi pi-arrow-right" icon-pos="right" @click="activateCallback('3')" />
              </div>
            </StepPanel>
            <StepPanel v-slot="{ activateCallback }" value="3">
              <div class="flex flex-col h-48">
                <div class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">
                  Content III
                </div>
              </div>
              <div class="pt-6">
                <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="activateCallback('2')" />
              </div>
            </StepPanel>
          </StepPanels>
        </Stepper>
      </div>
    </div>

    <!-- Steps Only -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Steps Only
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Use Stepper with a StepList only for custom requirements where a progress indicator is needed.
      </p>

      <div class="card">
        <Stepper value="2" class="basis-[50rem]">
          <StepList>
            <Step value="1">
              Design
            </Step>
            <Step value="2">
              Development
            </Step>
            <Step value="3">
              QA
            </Step>
          </StepList>
        </Stepper>
      </div>
    </div>

    <!-- Custom Template -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Custom Template
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        Custom content for a step is defined with the default slot. Use the asChild property for complete customization.
      </p>

      <div class="card">
        <Stepper v-model:value="activeStep" class="basis-[40rem]">
          <StepList>
            <Step v-slot="{ activateCallback, value, a11yAttrs }" as-child :value="1">
              <div class="flex flex-row flex-auto gap-2" v-bind="a11yAttrs.root">
                <button class="bg-transparent border-0 inline-flex flex-col gap-2" v-bind="a11yAttrs.header" @click="activateCallback">
                  <span
                    class="rounded-full border-2 w-12 h-12 inline-flex items-center justify-center" :class="[
                      { 'bg-primary text-primary-contrast border-primary': value <= activeStep, 'border-surface-200 dark:border-surface-700': value > activeStep },
                    ]"
                  >
                    <i class="pi pi-user" />
                  </span>
                </button>
                <Divider />
              </div>
            </Step>
            <Step v-slot="{ activateCallback, value, a11yAttrs }" as-child :value="2">
              <div class="flex flex-row flex-auto gap-2 pl-2" v-bind="a11yAttrs.root">
                <button class="bg-transparent border-0 inline-flex flex-col gap-2" v-bind="a11yAttrs.header" @click="activateCallback">
                  <span
                    class="rounded-full border-2 w-12 h-12 inline-flex items-center justify-center" :class="[
                      { 'bg-primary text-primary-contrast border-primary': value <= activeStep, 'border-surface-200 dark:border-surface-700': value > activeStep },
                    ]"
                  >
                    <i class="pi pi-star" />
                  </span>
                </button>
                <Divider />
              </div>
            </Step>
            <Step v-slot="{ activateCallback, value, a11yAttrs }" as-child :value="3">
              <div class="flex flex-row pl-2" v-bind="a11yAttrs.root">
                <button class="bg-transparent border-0 inline-flex flex-col gap-2" v-bind="a11yAttrs.header" @click="activateCallback">
                  <span
                    class="rounded-full border-2 w-12 h-12 inline-flex items-center justify-center" :class="[
                      { 'bg-primary text-primary-contrast border-primary': value <= activeStep, 'border-surface-200 dark:border-surface-700': value > activeStep },
                    ]"
                  >
                    <i class="pi pi-id-card" />
                  </span>
                </button>
              </div>
            </Step>
          </StepList>
          <StepPanels>
            <StepPanel v-slot="{ activateCallback }" :value="1">
              <div class="flex flex-col gap-2 mx-auto" style="min-height: 16rem; max-width: 20rem">
                <div class="text-center mt-4 mb-4 text-xl font-semibold">
                  Create your account
                </div>
                <div class="field">
                  <InputText id="input" v-model="name" type="text" placeholder="Name" fluid />
                </div>
                <div class="field">
                  <InputText id="email" v-model="email" type="email" placeholder="Email" fluid />
                </div>
                <div class="field">
                  <Password v-model="password" placeholder="Password" fluid />
                </div>
              </div>
              <div class="flex pt-6 justify-end">
                <Button label="Next" icon="pi pi-arrow-right" icon-pos="right" @click="activateCallback(2)" />
              </div>
            </StepPanel>
            <StepPanel v-slot="{ activateCallback }" :value="2">
              <div class="flex flex-col gap-2 mx-auto" style="min-height: 16rem; max-width: 24rem">
                <div class="text-center mt-4 mb-4 text-xl font-semibold">
                  Choose your interests
                </div>
                <div class="flex flex-wrap justify-center gap-4">
                  <ToggleButton v-model="option1" on-label="Nature" off-label="Nature" />
                  <ToggleButton v-model="option2" on-label="Art" off-label="Art" />
                  <ToggleButton v-model="option3" on-label="Music" off-label="Music" />
                  <ToggleButton v-model="option4" on-label="Design" off-label="Design" />
                  <ToggleButton v-model="option5" on-label="Photography" off-label="Photography" />
                  <ToggleButton v-model="option6" on-label="Movies" off-label="Movies" />
                  <ToggleButton v-model="option7" on-label="Sports" off-label="Sports" />
                  <ToggleButton v-model="option8" on-label="Gaming" off-label="Gaming" />
                  <ToggleButton v-model="option9" on-label="Traveling" off-label="Traveling" />
                  <ToggleButton v-model="option10" on-label="Dancing" off-label="Dancing" />
                </div>
              </div>
              <div class="flex pt-6 justify-between">
                <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="activateCallback(1)" />
                <Button label="Next" icon="pi pi-arrow-right" icon-pos="right" @click="activateCallback(3)" />
              </div>
            </StepPanel>
            <StepPanel v-slot="{ activateCallback }" :value="3">
              <div class="flex flex-col gap-2 mx-auto" style="min-height: 16rem; max-width: 24rem">
                <div class="text-center mt-4 mb-4 text-xl font-semibold">
                  Account created successfully
                </div>
                <div class="flex justify-center">
                  <img alt="logo" src="https://primefaces.org/cdn/primevue/images/stepper/content.svg">
                </div>
              </div>
              <div class="flex pt-6 justify-start">
                <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="activateCallback(2)" />
              </div>
            </StepPanel>
          </StepPanels>
        </Stepper>
      </div>
    </div>

    <!-- Multi-Step Form Example -->
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-surface-800 dark:text-surface-100">
        Multi-Step Form Example
      </h2>
      <p class="text-surface-600 dark:text-surface-300 mb-4">
        A practical example of using Stepper for a multi-step form with validation and data collection.
      </p>

      <div class="card">
        <Stepper value="1" linear>
          <StepList>
            <Step value="1">
              Personal Info
            </Step>
            <Step value="2">
              Contact Details
            </Step>
            <Step value="3">
              Preferences
            </Step>
            <Step value="4">
              Review
            </Step>
          </StepList>
          <StepPanels>
            <StepPanel v-slot="{ activateCallback }" value="1">
              <div class="flex flex-col gap-4 mx-auto" style="min-height: 20rem; max-width: 24rem">
                <div class="text-center mb-4 text-xl font-semibold">
                  Personal Information
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="field">
                    <label for="firstName" class="block text-sm font-medium mb-2">First Name</label>
                    <InputText id="firstName" placeholder="John" fluid />
                  </div>
                  <div class="field">
                    <label for="lastName" class="block text-sm font-medium mb-2">Last Name</label>
                    <InputText id="lastName" placeholder="Doe" fluid />
                  </div>
                </div>
                <div class="field">
                  <label for="birthDate" class="block text-sm font-medium mb-2">Date of Birth</label>
                  <DatePicker id="birthDate" placeholder="Select date" fluid />
                </div>
                <div class="field">
                  <label for="gender" class="block text-sm font-medium mb-2">Gender</label>
                  <Select id="gender" :options="['Male', 'Female', 'Other']" placeholder="Select gender" fluid />
                </div>
              </div>
              <div class="flex pt-6 justify-end">
                <Button label="Next" icon="pi pi-arrow-right" icon-pos="right" @click="activateCallback('2')" />
              </div>
            </StepPanel>

            <StepPanel v-slot="{ activateCallback }" value="2">
              <div class="flex flex-col gap-4 mx-auto" style="min-height: 20rem; max-width: 24rem">
                <div class="text-center mb-4 text-xl font-semibold">
                  Contact Details
                </div>
                <div class="field">
                  <label for="contactEmail" class="block text-sm font-medium mb-2">Email Address</label>
                  <InputText id="contactEmail" type="email" placeholder="john@example.com" fluid />
                </div>
                <div class="field">
                  <label for="phone" class="block text-sm font-medium mb-2">Phone Number</label>
                  <InputText id="phone" placeholder="+1 (555) 123-4567" fluid />
                </div>
                <div class="field">
                  <label for="address" class="block text-sm font-medium mb-2">Address</label>
                  <Textarea id="address" rows="3" placeholder="123 Main St, City, State, ZIP" fluid />
                </div>
                <div class="field">
                  <label for="country" class="block text-sm font-medium mb-2">Country</label>
                  <Select id="country" :options="['United States', 'Canada', 'United Kingdom', 'Australia', 'Germany']" placeholder="Select country" fluid />
                </div>
              </div>
              <div class="flex pt-6 justify-between">
                <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="activateCallback('1')" />
                <Button label="Next" icon="pi pi-arrow-right" icon-pos="right" @click="activateCallback('3')" />
              </div>
            </StepPanel>

            <StepPanel v-slot="{ activateCallback }" value="3">
              <div class="flex flex-col gap-4 mx-auto" style="min-height: 20rem; max-width: 24rem">
                <div class="text-center mb-4 text-xl font-semibold">
                  Preferences
                </div>
                <div class="field">
                  <label class="block text-sm font-medium mb-2">Notification Preferences</label>
                  <div class="flex flex-col gap-2">
                    <div class="flex items-center">
                      <Checkbox input-id="emailNotif" />
                      <label for="emailNotif" class="ml-2">Email notifications</label>
                    </div>
                    <div class="flex items-center">
                      <Checkbox input-id="smsNotif" />
                      <label for="smsNotif" class="ml-2">SMS notifications</label>
                    </div>
                    <div class="flex items-center">
                      <Checkbox input-id="pushNotif" />
                      <label for="pushNotif" class="ml-2">Push notifications</label>
                    </div>
                  </div>
                </div>
                <div class="field">
                  <label for="language" class="block text-sm font-medium mb-2">Preferred Language</label>
                  <Select id="language" :options="['English', 'Spanish', 'French', 'German', 'Italian']" placeholder="Select language" fluid />
                </div>
                <div class="field">
                  <label for="timezone" class="block text-sm font-medium mb-2">Timezone</label>
                  <Select id="timezone" :options="['UTC-8 (PST)', 'UTC-5 (EST)', 'UTC+0 (GMT)', 'UTC+1 (CET)']" placeholder="Select timezone" fluid />
                </div>
              </div>
              <div class="flex pt-6 justify-between">
                <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="activateCallback('2')" />
                <Button label="Next" icon="pi pi-arrow-right" icon-pos="right" @click="activateCallback('4')" />
              </div>
            </StepPanel>

            <StepPanel v-slot="{ activateCallback }" value="4">
              <div class="flex flex-col gap-4 mx-auto" style="min-height: 20rem; max-width: 24rem">
                <div class="text-center mb-4 text-xl font-semibold">
                  Review & Submit
                </div>
                <div class="bg-surface-50 dark:bg-surface-800 p-4 rounded-lg">
                  <h4 class="font-semibold mb-2">
                    Personal Information
                  </h4>
                  <p class="text-sm text-surface-600 dark:text-surface-300">
                    John Doe
                  </p>
                  <p class="text-sm text-surface-600 dark:text-surface-300">
                    Born: January 1, 1990
                  </p>

                  <h4 class="font-semibold mb-2 mt-4">
                    Contact Details
                  </h4>
                  <p class="text-sm text-surface-600 dark:text-surface-300">
                    john@example.com
                  </p>
                  <p class="text-sm text-surface-600 dark:text-surface-300">
                    +1 (555) 123-4567
                  </p>

                  <h4 class="font-semibold mb-2 mt-4">
                    Preferences
                  </h4>
                  <p class="text-sm text-surface-600 dark:text-surface-300">
                    Email notifications: Yes
                  </p>
                  <p class="text-sm text-surface-600 dark:text-surface-300">
                    Language: English
                  </p>
                </div>
                <div class="flex items-center gap-2 mt-4">
                  <Checkbox input-id="terms" />
                  <label for="terms" class="text-sm">I agree to the Terms and Conditions</label>
                </div>
              </div>
              <div class="flex pt-6 justify-between">
                <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="activateCallback('3')" />
                <Button label="Submit" icon="pi pi-check" icon-pos="right" />
              </div>
            </StepPanel>
          </StepPanels>
        </Stepper>
      </div>
    </div>
  </div>
</template>
