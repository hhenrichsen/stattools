<script>
    import { defineComponent } from 'vue'

    export default defineComponent({
        props: {
            outcomes: {
                type: [String],
                required: true
            },
            filter: {
                type: Object,
                required: true
            }
        },
        data: function () {
            return {
                count: this.filter.number,
                outcome: this.filter.outcome
            }
        },
        methods: {
            cleanData: function () {
                let filter = { number: this.count, outcome: this.outcome }
                this.update(filter)
            },
            updateFilter: function () {
                // eslint-disable-next-line vue/no-mutating-props
                this.filter.number = this.count
                // eslint-disable-next-line vue/no-mutating-props
                this.filter.outcome = this.outcome
            }
        }
    })
</script>

<template>
  <div>
    <div class="grid grid-cols-2 gap-1">
      <label class="font-semibold text-sm text-gray-600 pb-1 block"
        >Outcome</label
      >
      <select
        v-model="outcome"
        @change="updateFilter"
        class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm"
      >
        <option v-bind:key="outcome" v-for="outcome of outcomes">{{ outcome }}</option>
      </select>
    </div>
    <div class="grid grid-cols-2 gap-1">
      <label class="font-semibold text-sm text-gray-600 pb-1 block"
        >Count</label
      >
      <input
        @change="updateFilter"
        v-model.number="count"
        type="number"
        class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm"
      />
    </div>
  </div>
</template>
