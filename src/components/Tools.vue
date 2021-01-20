<template>
  <div class="p-10 xs:p-0 mx-auto sm:py-12 md:w-full md:max-w-lg flex-grow">
    <tool-container
      v-bind:name="'PermGen'"
      v-bind:subtitle="'A simple permutation generator'"
      :componentName="'Permutation'"
    ></tool-container>
  </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import ToolContainer from './ToolContainer.vue'

    export default defineComponent({
        components: { ToolContainer },
        name: 'Tools'
    })
</script>
