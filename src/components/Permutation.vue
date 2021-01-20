<template>
  <div>
  <div id="generator" class="mt-5 p-5">
    <h2 class="font-semibold text-md text-gray-600 pb-5 block text-center">
      Generator Settings
    </h2>
    <label class="font-semibold text-sm text-gray-600 pb-1 block"
      >Outcomes</label
    >
    <input
      v-model="outcomes"
      placeholder="a, b, c"
      class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
    />
    <label class="font-semibold text-sm text-gray-600 pb-1 block">Count</label>
    <input
      v-model.number="length"
      type="number"
      class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
    />
    <button
      @click="generate"
      class="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
    >
      <span class="inline-block mr-2">Generate</span>
    </button>
  </div>
  <div id="filters" class="p-5">
    <h2 class="font-semibold text-md text-gray-600 mb-3 block text-center">
      Filters
    </h2>
    <div class="filters divide-y divide-gray-100">
      <FilterDisplay
        class="pb-3"
        v-for="filter of filters"
        :key="filter.id"
        :initFilter="filter"
        :addFilter="applyFilter"
        :updateFilter="updateFilter"
        :remove="removeFilter"
        :outcomes="outcomeOptions"
        :componentName="'filter-' + filter.componentType"
      >
      </FilterDisplay>
    </div>
    <button
      @click="addFilter"
      class="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
    >
      <span class="inline-block mr-2">Add Filter</span>
    </button>
  </div>
  <div v-if="output" class="p-5">
    <h2 class="font-semibold text-md text-gray-600 pb-5 block text-center">
      Results
    </h2>
    <div :key="index" v-for="(res, index) of output">
      {{ res.join(' ') }}
    </div>
  </div>
  </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import FilterDisplay from './FilterDisplay.vue';
    import { outcomesFromString, applyFilters, generate } from '../sequence';
    import { EmptyFilter } from '../filter';
    import type { Filter } from '../filter';

    export default defineComponent({
        components: {
            FilterDisplay
        },
        data() {
            return {
                outcomes: "a, b, c",
                length: 3,
                output: null as Array<Array<string>> | null,
                filters: [] as Array<Filter>
            }
        },
        computed: {
            outcomeOptions() {
                // @ts-ignore
                return outcomesFromString(this.outcomes);
            }
        },
        methods: {
            generate() {
                let output = applyFilters(generate({ outcomes: this.outcomeOptions, length: this.length }), this.filters.map((it : Filter) => it.compile()));
                console.log(output);
                this.output = output;
            },
            addFilter() {
                this.filters.push(new EmptyFilter());
                this.generate();
            },
            applyFilter(filter: Filter) {
                this.filters = [...this.filters, filter];
                this.generate();
            },
            updateFilter(filter: Filter) {
                for (let i = 0; i < this.filters.length; i++) {
                    if (this.filters[i].id === filter.id) {
                        this.filters[i] = filter;
                    }
                }
                this.generate();
            },
            removeFilter(id: String) {
                this.filters = this.filters.filter(it => it.id !== id);
                this.generate();
            }
        }

    })
</script>
