<template>
  <div>
  <div id="generator" class="mt-5 p-5">
    <h2 class="section-label">
      Generator Settings
    </h2>
    <label class="input-label"
      >Outcomes</label
    >
    <input
      v-model="outcomes"
      placeholder="a, b, c"
      class="input"
    />
    <label class="input-label">Count</label>
    <input
      v-model.number="length"
      type="number"
      class="input"
    />
    <p class="text-sm text-center p-2">Items to Generate: {{ estimate }}</p>
    <button
      @click="generate"
      class="button"
    >
      <span class="inline-block mr-2">Generate</span>
    </button>
  </div>
  <div id="filters" class="p-5">
    <h2 class="section-label">
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
      class="button"
    >
      <span class="inline-block mr-2">Add Filter</span>
    </button>
  </div>
  <div class="p-5">
    <h2 class="section-label">
      Results <span v-if="this.currentCount > 0">({{ this.currentCount }})</span>
    </h2>
    <div v-if="output" class="results">
      <div :key="index" v-for="(res, index) of output">
        {{ res.join(' ') }}
      </div>
    </div>
    <div v-else class="text-gray-600 dark:text-gray-200 flex flex-col m-auto">
        <svg class="animate-spin h-8 w-8 block m-auto"  viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
            <g fill="none" fill-rule="evenodd">
                <g transform="translate(1 1)" stroke-width="2">
                    <circle stroke-opacity=".5" cx="18" cy="18" r="18"/>
                    <path d="M36 18c0-9.94-8.06-18-18-18">
                    </path>
                </g>
            </g>
        </svg>
    </div>
  </div>
  </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import FilterDisplay from './FilterDisplay.vue';
    import { outcomesFromString, generateAsync } from '../sequence';
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
                output: [] as Array<Array<string>> | null,
                filters: [] as Array<Filter>,
                currentCount: 0,
                loading: false
            }
        },
        computed: {
            outcomeOptions() {
                // @ts-ignore
                return outcomesFromString(this.outcomes);
            },
            estimate() {
                return Math.pow(this.outcomeOptions.length, this.length);
            }
        },
        methods: {
            generate() {
                this.output = null;
                this.currentCount = 0;
                generateAsync({ outcomes: this.outcomeOptions, length: this.length, filters: this.filters.map((it : Filter) => it.compile())}, (res : Array<Array<string>>) => {
                    this.output = res; }, (res : number) => { this.currentCount = res});
            },
            addFilter() {
                this.filters.push(new EmptyFilter());
            },
            applyFilter(filter: Filter) {
                this.filters = [...this.filters, filter];
            },
            updateFilter(filter: Filter) {
                for (let i = 0; i < this.filters.length; i++) {
                    if (this.filters[i].id === filter.id) {
                        this.filters[i] = filter;
                    }
                }
            },
            removeFilter(id: String) {
                this.filters = this.filters.filter(it => it.id !== id);
            }
        }

    })
</script>

<style>
</style>