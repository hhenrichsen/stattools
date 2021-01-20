<template>
  <div class="mt-10 md:mt-0 md:w-96">
    <h1 class="tool-title">{{ name }}</h1>
    <h2 class="tool-subtitle" v-if="subtitle !== ''">{{ subtitle }}</h2>
    <div class="tool-container">
      <component v-bind:is="componentName"></component>
    </div>
  </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import Permutation from './Permutation.vue'
    import Random from './Random.vue'

    export default defineComponent({
        components: {
            Permutation,
            Random,
        },
        name: 'ToolContainer',
        props: {
            name: {
                type: String,
                required: true
            },
            subtitle: {
                type: String,
                required: false,
                default: ''
            },
            componentName: {
                type: String,
                required: true
            }
        }
    })
</script>

<style scoped>
.tool-subtitle {
  @apply font-semibold text-center text-lg mb-5 text-gray-600 dark:text-gray-300;
}

.tool-title {
  @apply font-bold text-center text-2xl mb-2 text-gray-900 dark:text-gray-100;
}

.tool-container {
  @apply p-10 bg-white shadow w-full rounded-lg divide-y divide-gray-200 dark:divide-blue-100 dark:bg-gray-700;
}
</style>
