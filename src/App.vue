<template>
  <div>
    <tools></tools>
  </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import Tools from './components/Tools.vue'
    import './index.css'

    export default defineComponent({
        name: 'App',
        components: {
            Tools
        }
    })
</script>