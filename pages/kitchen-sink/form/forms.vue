<script setup lang="ts">
import { Form, FormField } from '@primevue/forms';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import * as z from 'zod';

useSeoMeta({
  title: 'Forms - Kitchen Sink',
  description: 'The PrimeVue Forms library provides comprehensive form state management with built-in validation support.',
});

// Basic example
const basicInitialValues = { username: '' };
const basicSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
});

// States example
const statesInitialValues = { username: '', email: '' };
const statesSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
});

// Validation triggers example
const validationInitialValues = {
  username: '',
  firstName: 'John',
  lastName: '',
};
const validationSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
});

// Complex form example
const complexInitialValues = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  firstName: '',
  lastName: '',
  age: null,
  country: null,
  acceptTerms: false,
  newsletter: false,
  bio: '',
};

const countries = ref([
  { name: 'United States', code: 'US' },
  { name: 'Canada', code: 'CA' },
  { name: 'United Kingdom', code: 'UK' },
  { name: 'Germany', code: 'DE' },
  { name: 'France', code: 'FR' },
  { name: 'Japan', code: 'JP' },
  { name: 'Australia', code: 'AU' },
]);

const complexSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters').max(20, 'Username must be less than 20 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/\d/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  age: z.number().min(18, 'Must be at least 18 years old').max(120, 'Invalid age'),
  country: z.object({
    name: z.string(),
    code: z.string(),
  }, { message: 'Please select a country' }),
  acceptTerms: z.boolean().refine(val => val === true, 'You must accept the terms and conditions'),
  newsletter: z.boolean().optional(),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords don\'t match',
  path: ['confirmPassword'],
});

// Login form example
const loginInitialValues = { username: '', password: '', remember: false };
const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
  remember: z.boolean().optional(),
});

// Contact form example
const contactInitialValues = {
  name: '',
  email: '',
  subject: '',
  message: '',
};
const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message is too long'),
});

// Profile form example
const profileInitialValues = {
  avatar: null,
  displayName: '',
  email: '',
  phone: '',
  birthDate: null,
  website: '',
  twitter: '',
  linkedin: '',
  github: '',
};

const profileSchema = z.object({
  displayName: z.string().min(2, 'Display name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number').optional().or(z.literal('')),
  birthDate: z.date().optional().nullable(),
  website: z.string().url('Invalid URL').optional().or(z.literal('')),
  twitter: z.string().regex(/^@?\w{1,15}$/, 'Invalid Twitter handle').optional().or(z.literal('')),
  linkedin: z.string().optional(),
  github: z.string().optional(),
});

// Form submission handlers
const submissionResult = ref(null);

function onFormSubmit(formName: string, event: any) {
  // Form submitted: ${formName}, event
  submissionResult.value = {
    formName,
    valid: event.valid,
    values: event.values,
    errors: event.errors,
  };

  // Simulate API call
  setTimeout(() => {
    submissionResult.value = null;
  }, 3000);
}

// Custom resolver example
function customResolver(values: any) {
  const errors: any = {};

  if (!values.customField || values.customField.length < 5) {
    errors.customField = [{ message: 'Custom field must be at least 5 characters' }];
  }

  if (values.customField && values.customField.includes('test')) {
    errors.customField = [{ message: 'Custom field cannot contain "test"' }];
  }

  return { errors };
}

const _customInitialValues = { customField: '' };
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <div class="p-6 bg-surface-0 dark:bg-surface-900 border-b border-surface-200 dark:border-surface-700">
      <div class="max-w-6xl mx-auto">
        <div class="flex items-center gap-4 mb-4">
          <Icon name="lucide:file-text" size="32" class="text-primary-500" />
          <div>
            <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0 mb-2">
              Forms
            </h1>
            <p class="text-surface-600 dark:text-surface-300">
              The PrimeVue Forms library provides comprehensive form state management with built-in validation support.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="flex-1 overflow-auto">
      <div class="max-w-6xl mx-auto p-6 space-y-8">
        <!-- Submission Result Toast -->
        <Message v-if="submissionResult" severity="success">
          <strong>{{ submissionResult.formName }} Submitted Successfully!</strong>
          <pre class="mt-2 text-xs">{{ JSON.stringify(submissionResult.values, null, 2) }}</pre>
        </Message>

        <section>
          <h2 class="text-2xl font-bold mb-4 text-surface-900 dark:text-surface-0">
            Basic Form
          </h2>
          <p class="text-surface-600 dark:text-surface-400 mb-4">
            Simple form with validation using Zod schema resolver.
          </p>
          <div class="border border-surface-200 dark:border-surface-700 rounded-lg p-6">
            <Form
              v-slot="$form"
              :initial-values="basicInitialValues"
              :resolver="zodResolver(basicSchema)"
              class="flex flex-col gap-4 max-w-md"
              @submit="(e) => onFormSubmit('Basic Form', e)"
            >
              <div class="flex flex-col gap-1">
                <label class="font-medium text-sm">Username</label>
                <InputText name="username" type="text" placeholder="Enter username" fluid />
                <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">
                  {{ $form.username.error?.message }}
                </Message>
              </div>
              <Button type="submit" severity="secondary" label="Submit" />
            </Form>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4 text-surface-900 dark:text-surface-0">
            Form States
          </h2>
          <p class="text-surface-600 dark:text-surface-400 mb-4">
            View real-time form state management as you interact with the form.
          </p>
          <div class="border border-surface-200 dark:border-surface-700 rounded-lg p-6">
            <Form
              v-slot="$form"
              :initial-values="statesInitialValues"
              :resolver="zodResolver(statesSchema)"
              class="grid lg:grid-cols-2 gap-6"
              @submit="(e) => onFormSubmit('States Form', e)"
            >
              <div class="flex flex-col gap-4">
                <div class="flex flex-col gap-1">
                  <label class="font-medium text-sm">Username</label>
                  <InputText name="username" type="text" placeholder="Enter username" fluid />
                  <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">
                    {{ $form.username.error?.message }}
                  </Message>
                </div>
                <div class="flex flex-col gap-1">
                  <label class="font-medium text-sm">Email</label>
                  <InputText name="email" type="email" placeholder="Enter email" fluid />
                  <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">
                    {{ $form.email.error?.message }}
                  </Message>
                </div>
                <Button type="submit" severity="secondary" label="Submit" class="w-full" />
              </div>
              <Card>
                <template #title>
                  Form States
                </template>
                <template #content>
                  <pre class="text-xs overflow-auto">{{ JSON.stringify($form, null, 2) }}</pre>
                </template>
              </Card>
            </Form>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4 text-surface-900 dark:text-surface-0">
            Validation Triggers
          </h2>
          <p class="text-surface-600 dark:text-surface-400 mb-4">
            Control when validation occurs - on blur, on change, on mount, or on submit.
          </p>
          <div class="border border-surface-200 dark:border-surface-700 rounded-lg p-6">
            <Form
              v-slot="$form"
              :initial-values="validationInitialValues"
              :resolver="zodResolver(validationSchema)"
              :validate-on-value-update="false"
              :validate-on-blur="true"
              :validate-on-mount="['firstName']"
              class="flex flex-col gap-4 max-w-md"
              @submit="(e) => onFormSubmit('Validation Form', e)"
            >
              <div class="flex flex-col gap-1">
                <label class="font-medium text-sm">Username (validates on blur)</label>
                <InputText name="username" type="text" placeholder="Enter username" fluid />
                <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">
                  {{ $form.username.error?.message }}
                </Message>
              </div>
              <div class="flex flex-col gap-1">
                <label class="font-medium text-sm">First Name (validates on mount & change)</label>
                <InputText
                  name="firstName"
                  type="text"
                  placeholder="Enter first name"
                  fluid
                  :form-control="{ validateOnValueUpdate: true }"
                />
                <Message v-if="$form.firstName?.invalid" severity="error" size="small" variant="simple">
                  {{ $form.firstName.error?.message }}
                </Message>
              </div>
              <div class="flex flex-col gap-1">
                <label class="font-medium text-sm">Last Name (validates on blur)</label>
                <InputText name="lastName" type="text" placeholder="Enter last name" fluid />
                <Message v-if="$form.lastName?.invalid" severity="error" size="small" variant="simple">
                  {{ $form.lastName.error?.message }}
                </Message>
              </div>
              <Button type="submit" severity="secondary" label="Submit" />
            </Form>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4 text-surface-900 dark:text-surface-0">
            FormField Component
          </h2>
          <p class="text-surface-600 dark:text-surface-400 mb-4">
            Use FormField for more control over individual fields and custom components.
          </p>
          <div class="border border-surface-200 dark:border-surface-700 rounded-lg p-6">
            <Form
              :resolver="customResolver"
              class="flex flex-col gap-4 max-w-md"
              @submit="(e) => onFormSubmit('FormField Example', e)"
            >
              <FormField v-slot="$field" name="customField" initial-value="" class="flex flex-col gap-1">
                <label class="font-medium text-sm">Custom Field</label>
                <InputText type="text" placeholder="Enter custom value" fluid />
                <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
                  {{ $field.error?.message }}
                </Message>
              </FormField>
              <Button type="submit" severity="secondary" label="Submit" />
            </Form>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4 text-surface-900 dark:text-surface-0">
            Complex Registration Form
          </h2>
          <p class="text-surface-600 dark:text-surface-400 mb-4">
            Comprehensive form with multiple field types and complex validation rules.
          </p>
          <div class="border border-surface-200 dark:border-surface-700 rounded-lg p-6">
            <Form
              v-slot="$form"
              :initial-values="complexInitialValues"
              :resolver="zodResolver(complexSchema)"
              class="grid md:grid-cols-2 gap-6"
              @submit="(e) => onFormSubmit('Registration Form', e)"
            >
              <div class="flex flex-col gap-4">
                <h3 class="font-semibold">
                  Account Information
                </h3>

                <div class="flex flex-col gap-1">
                  <label class="font-medium text-sm">Username</label>
                  <InputText name="username" type="text" placeholder="Choose a username" fluid />
                  <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">
                    {{ $form.username.error?.message }}
                  </Message>
                </div>

                <div class="flex flex-col gap-1">
                  <label class="font-medium text-sm">Email</label>
                  <InputText name="email" type="email" placeholder="Enter your email" fluid />
                  <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">
                    {{ $form.email.error?.message }}
                  </Message>
                </div>

                <div class="flex flex-col gap-1">
                  <label class="font-medium text-sm">Password</label>
                  <Password name="password" placeholder="Create a password" toggle-mask fluid />
                  <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">
                    <ul class="list-disc pl-4">
                      <li v-for="(error, index) of $form.password.errors" :key="index">
                        {{ error.message }}
                      </li>
                    </ul>
                  </Message>
                </div>

                <div class="flex flex-col gap-1">
                  <label class="font-medium text-sm">Confirm Password</label>
                  <Password name="confirmPassword" placeholder="Confirm your password" :feedback="false" toggle-mask fluid />
                  <Message v-if="$form.confirmPassword?.invalid" severity="error" size="small" variant="simple">
                    {{ $form.confirmPassword.error?.message }}
                  </Message>
                </div>
              </div>

              <div class="flex flex-col gap-4">
                <h3 class="font-semibold">
                  Personal Information
                </h3>

                <div class="grid grid-cols-2 gap-4">
                  <div class="flex flex-col gap-1">
                    <label class="font-medium text-sm">First Name</label>
                    <InputText name="firstName" type="text" placeholder="First name" fluid />
                    <Message v-if="$form.firstName?.invalid" severity="error" size="small" variant="simple">
                      {{ $form.firstName.error?.message }}
                    </Message>
                  </div>

                  <div class="flex flex-col gap-1">
                    <label class="font-medium text-sm">Last Name</label>
                    <InputText name="lastName" type="text" placeholder="Last name" fluid />
                    <Message v-if="$form.lastName?.invalid" severity="error" size="small" variant="simple">
                      {{ $form.lastName.error?.message }}
                    </Message>
                  </div>
                </div>

                <div class="flex flex-col gap-1">
                  <label class="font-medium text-sm">Age</label>
                  <InputNumber name="age" placeholder="Your age" fluid />
                  <Message v-if="$form.age?.invalid" severity="error" size="small" variant="simple">
                    {{ $form.age.error?.message }}
                  </Message>
                </div>

                <div class="flex flex-col gap-1">
                  <label class="font-medium text-sm">Country</label>
                  <Select name="country" :options="countries" option-label="name" placeholder="Select your country" fluid />
                  <Message v-if="$form.country?.invalid" severity="error" size="small" variant="simple">
                    {{ $form.country.error?.message }}
                  </Message>
                </div>

                <div class="flex flex-col gap-1">
                  <label class="font-medium text-sm">Bio (optional)</label>
                  <Textarea name="bio" placeholder="Tell us about yourself" rows="3" fluid />
                  <Message v-if="$form.bio?.invalid" severity="error" size="small" variant="simple">
                    {{ $form.bio.error?.message }}
                  </Message>
                </div>

                <div class="flex flex-col gap-3">
                  <div class="flex items-center gap-2">
                    <Checkbox name="acceptTerms" input-id="terms" binary />
                    <label for="terms" class="text-sm">I accept the terms and conditions</label>
                  </div>
                  <Message v-if="$form.acceptTerms?.invalid" severity="error" size="small" variant="simple">
                    {{ $form.acceptTerms.error?.message }}
                  </Message>

                  <div class="flex items-center gap-2">
                    <Checkbox name="newsletter" input-id="newsletter" binary />
                    <label for="newsletter" class="text-sm">Subscribe to newsletter</label>
                  </div>
                </div>
              </div>

              <div class="md:col-span-2">
                <Button type="submit" severity="secondary" label="Create Account" class="w-full" />
              </div>
            </Form>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4 text-surface-900 dark:text-surface-0">
            Login Form
          </h2>
          <p class="text-surface-600 dark:text-surface-400 mb-4">
            Simple login form with remember me option.
          </p>
          <div class="border border-surface-200 dark:border-surface-700 rounded-lg p-6">
            <div class="max-w-md mx-auto">
              <Form
                v-slot="$form"
                :initial-values="loginInitialValues"
                :resolver="zodResolver(loginSchema)"
                class="flex flex-col gap-4"
                @submit="(e) => onFormSubmit('Login Form', e)"
              >
                <div class="flex flex-col gap-1">
                  <label class="font-medium text-sm">Username or Email</label>
                  <InputText name="username" type="text" placeholder="Enter username or email" fluid />
                  <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">
                    {{ $form.username.error?.message }}
                  </Message>
                </div>

                <div class="flex flex-col gap-1">
                  <label class="font-medium text-sm">Password</label>
                  <Password name="password" placeholder="Enter password" :feedback="false" toggle-mask fluid />
                  <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">
                    {{ $form.password.error?.message }}
                  </Message>
                </div>

                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <Checkbox name="remember" input-id="remember" binary />
                    <label for="remember" class="text-sm">Remember me</label>
                  </div>
                  <a href="#" class="text-sm text-primary-500 hover:underline">Forgot password?</a>
                </div>

                <Button type="submit" label="Sign In" class="w-full" />
              </Form>
            </div>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4 text-surface-900 dark:text-surface-0">
            Contact Form
          </h2>
          <p class="text-surface-600 dark:text-surface-400 mb-4">
            Contact form with message validation.
          </p>
          <div class="border border-surface-200 dark:border-surface-700 rounded-lg p-6">
            <div class="max-w-2xl mx-auto">
              <Form
                v-slot="$form"
                :initial-values="contactInitialValues"
                :resolver="zodResolver(contactSchema)"
                class="flex flex-col gap-4"
                @submit="(e) => onFormSubmit('Contact Form', e)"
              >
                <div class="grid md:grid-cols-2 gap-4">
                  <div class="flex flex-col gap-1">
                    <label class="font-medium text-sm">Name</label>
                    <InputText name="name" type="text" placeholder="Your name" fluid />
                    <Message v-if="$form.name?.invalid" severity="error" size="small" variant="simple">
                      {{ $form.name.error?.message }}
                    </Message>
                  </div>

                  <div class="flex flex-col gap-1">
                    <label class="font-medium text-sm">Email</label>
                    <InputText name="email" type="email" placeholder="Your email" fluid />
                    <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">
                      {{ $form.email.error?.message }}
                    </Message>
                  </div>
                </div>

                <div class="flex flex-col gap-1">
                  <label class="font-medium text-sm">Subject</label>
                  <InputText name="subject" type="text" placeholder="Message subject" fluid />
                  <Message v-if="$form.subject?.invalid" severity="error" size="small" variant="simple">
                    {{ $form.subject.error?.message }}
                  </Message>
                </div>

                <div class="flex flex-col gap-1">
                  <label class="font-medium text-sm">Message</label>
                  <Textarea name="message" placeholder="Your message" rows="5" fluid />
                  <div class="flex items-center justify-between mt-1">
                    <Message v-if="$form.message?.invalid" severity="error" size="small" variant="simple">
                      {{ $form.message.error?.message }}
                    </Message>
                    <span class="text-xs text-surface-500">
                      {{ $form.message?.value?.length || 0 }}/1000
                    </span>
                  </div>
                </div>

                <Button type="submit" label="Send Message" severity="secondary" class="w-full" />
              </Form>
            </div>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4 text-surface-900 dark:text-surface-0">
            Profile Form
          </h2>
          <p class="text-surface-600 dark:text-surface-400 mb-4">
            User profile form with social media links validation.
          </p>
          <div class="border border-surface-200 dark:border-surface-700 rounded-lg p-6">
            <div class="max-w-2xl mx-auto">
              <Form
                v-slot="$form"
                :initial-values="profileInitialValues"
                :resolver="zodResolver(profileSchema)"
                class="flex flex-col gap-6"
                @submit="(e) => onFormSubmit('Profile Form', e)"
              >
                <div>
                  <h3 class="font-semibold mb-4">
                    Basic Information
                  </h3>
                  <div class="grid md:grid-cols-2 gap-4">
                    <div class="flex flex-col gap-1">
                      <label class="font-medium text-sm">Display Name</label>
                      <InputText name="displayName" type="text" placeholder="How should we call you?" fluid />
                      <Message v-if="$form.displayName?.invalid" severity="error" size="small" variant="simple">
                        {{ $form.displayName.error?.message }}
                      </Message>
                    </div>

                    <div class="flex flex-col gap-1">
                      <label class="font-medium text-sm">Email</label>
                      <InputText name="email" type="email" placeholder="your@email.com" fluid />
                      <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">
                        {{ $form.email.error?.message }}
                      </Message>
                    </div>

                    <div class="flex flex-col gap-1">
                      <label class="font-medium text-sm">Phone</label>
                      <InputText name="phone" type="tel" placeholder="+1234567890" fluid />
                      <Message v-if="$form.phone?.invalid" severity="error" size="small" variant="simple">
                        {{ $form.phone.error?.message }}
                      </Message>
                    </div>

                    <div class="flex flex-col gap-1">
                      <label class="font-medium text-sm">Birth Date</label>
                      <DatePicker name="birthDate" placeholder="Select date" fluid />
                      <Message v-if="$form.birthDate?.invalid" severity="error" size="small" variant="simple">
                        {{ $form.birthDate.error?.message }}
                      </Message>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 class="font-semibold mb-4">
                    Social Links
                  </h3>
                  <div class="grid md:grid-cols-2 gap-4">
                    <div class="flex flex-col gap-1">
                      <label class="font-medium text-sm">Website</label>
                      <InputText name="website" type="url" placeholder="https://yourwebsite.com" fluid />
                      <Message v-if="$form.website?.invalid" severity="error" size="small" variant="simple">
                        {{ $form.website.error?.message }}
                      </Message>
                    </div>

                    <div class="flex flex-col gap-1">
                      <label class="font-medium text-sm">Twitter</label>
                      <InputText name="twitter" type="text" placeholder="@username" fluid />
                      <Message v-if="$form.twitter?.invalid" severity="error" size="small" variant="simple">
                        {{ $form.twitter.error?.message }}
                      </Message>
                    </div>

                    <div class="flex flex-col gap-1">
                      <label class="font-medium text-sm">LinkedIn</label>
                      <InputText name="linkedin" type="text" placeholder="linkedin.com/in/username" fluid />
                      <Message v-if="$form.linkedin?.invalid" severity="error" size="small" variant="simple">
                        {{ $form.linkedin.error?.message }}
                      </Message>
                    </div>

                    <div class="flex flex-col gap-1">
                      <label class="font-medium text-sm">GitHub</label>
                      <InputText name="github" type="text" placeholder="github.com/username" fluid />
                      <Message v-if="$form.github?.invalid" severity="error" size="small" variant="simple">
                        {{ $form.github.error?.message }}
                      </Message>
                    </div>
                  </div>
                </div>

                <Button type="submit" label="Update Profile" severity="secondary" class="w-full" />
              </Form>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
