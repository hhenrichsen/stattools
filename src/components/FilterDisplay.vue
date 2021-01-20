<template>
  <div>
    <h3 class="font-semibold text-sm text-gray-600 pb-3 pt-3 block text-center">
      {{ filter.name }}
    </h3>
    <form @change="setDirty">
      <div class="grid grid-cols-2 gap-1">
        <label class="font-semibold text-sm text-gray-600 pb-1 block"
          >Type</label
        >
        <select
          v-model="type"
          class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm"
          @change="changeType"
        >
          <option value="empty">Empty</option>
          <option value="countlt">Count Less Than</option>
          <option value="countgt">Count Greater Than</option>
          <option value="counteq">Count Equal To</option>
        </select>
      </div>
      <component
        v-bind:outcomes="outcomes"
        v-bind:setDirty="setDirty"
        v-bind:update="update"
        v-bind:filter="filter"
        v-bind:is="componentName"
      >
      </component>
    </form>
    <div v-if="changed">
      <button
        class="text-sm text-blue-500 text-center inline-block w-full"
        @click="update"
      >
        Apply Changes
      </button>
    </div>
    <button
      class="text-sm text-blue-500 text-center inline-block w-full"
      @click="remove(id)"
    >
      Remove Filter
    </button>
  </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import FilterRelative from './FilterRelative.vue'
    import FilterEmpty from './FilterEmpty.vue'
    import { factory, Filter } from '../filter'
    import { allString } from '../validator'

    export default defineComponent({
        components: {
            FilterRelative, FilterEmpty
        },
        props: {
            componentName: {
                type: String,
                required: true
            },
            remove: {
                type: Function,
                required: true,
            },
            addFilter: {
                type: Function,
                required: true,
            },
            updateFilter: {
                type: Function,
                required: true,
            },
            initFilter: {
                type: Object,
                required: true,
            },
            outcomes: {
                type: Array,
                required: true,
                validator: allString
            }
        },
        data: function () {
            return {
                type: this.initFilter.type,
                changed: false,
                filter: this.initFilter as Filter,
                oldId: null as string | null
            }
        },
        computed: {
            id() : string {
                return this.filter.id
            }
        },
        methods: {
            setDirty: function () {
                this.changed = true;
            },
            changeType: function() {
                if (!this.changed) {
                    this.oldId = this.filter.id;
                }
                this.changed = true;
                this.filter = factory.make(this.type, this.outcomes as Array<string>);
                console.log(this.filter);
            },
            update: function () {
                if (this.oldId !== null) {
                    // Theoretically this should remove the old one...
                    this.remove(this.oldId);
                    this.addFilter(this.filter);
                }
                else {
                    this.changed = false
                    this.updateFilter(this.filter);
                }
            }
        }
    })
</script>
