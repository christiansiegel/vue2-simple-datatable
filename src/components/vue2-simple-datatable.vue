<template>
  <div class="vue2-simple-datatable">
    <div v-if="config.limits || config.exportButton" class="row mb-2">
      <div class="col-lg-12">
        <dropdown v-if="config.limits" class="float-right ml-2" :items="config.limits" :current="config.limit" v-on:select="setLimit">
        </dropdown>
        <button v-if="config.exportButton" class="btn btn-secondary float-right" type="button" v-on:click="exportData">
          <i class="fas fa-file-download"></i>
        </button>
      </div>
    </div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th v-for="column in columns" :key="column" scope="col">
            <a class="text-dark btn" href="#" v-on:click="sortBy(column, $event)">
              {{ column }}
              <i v-bind:class="sortIconClasses(column)"></i>
            </a>
          </th>
        </tr>
        <tr>
          <th v-for="column in columns" :key="column" scope="col">
            <div class="input-group">
              <input type="text" class="form-control" v-model.lazy="search[column]" v-debounce="500" v-bind:placeholder="filterByText(column)">
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in rows" :key="index">
          <td v-for="column in columns" :key="column+index">
            <slot :name="column" :value="row[column]">
              {{ row[column] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
    <paginator :total="totalPages" :current="currentPage" v-on:select="selectPage"></paginator>
    <p class="small text-center">{{ countText }}</p>
  </div>
</template>

<script>
  import debounce from 'v-debounce'
  import Paginator from './paginator.vue'
  import Dropdown from './dropdown.vue'

  export default {
    components: {
      'paginator': Paginator,
      'dropdown': Dropdown
    },
    directives: {
      debounce
    },
    props: {
      data: {
        type: Array,
        default: []
      },
      columns: {
        type: Array,
        default: []
      },
      initialSearch: Object
    },
    data() {
      return {
        currentPage: 0,
        sort: undefined,
        ascending: true, // false = descending
        search: this.initialSearch,
        config: {
          limit: 10,
          limits: [10, 25, 50, 100],
          regexSearch: false,
          exportButton: false
        },
        i18n: {
          countPagedN: 'Showing {from} to {to} of {count} records',
          countN: '{count} records',
          count1: 'One record',
          count0: 'No records',
          filterBy: 'Filter by {column}'
        }
      }
    },
    computed: {
      totalPages() {
        return Math.ceil(this.total / this.config.limit)
      },
      searchFuncs() {
        const keys = Object.keys(this.search)
        let result = {}
        keys.forEach(key => {
          const searchString = this.search[key]
          if (!searchString) return
          result[key] = this.createSearcFuncs(searchString)
        });
        return result
      },
      filteredData() {
        const search = this.searchFuncs
        const searchedCols = Object.keys(search)
        const colMatch = (row, colName) => {
          const colVal = row[colName]
          return search[colName](colVal)
        }
        const rowMatch = (row) => (
          !searchedCols.some(col => !colMatch(row, col))
        )
        return this.data.filter(row => rowMatch(row))
      },
      filteredAndSortedData() {
        const rows = this.filteredData
        if(this.sort) {
          const col = this.sort
          if(this.ascending) {
            rows.sort((a, b) => (a[col] > b[col]) - (a[col] < b[col]))
          } else {
            rows.sort((b, a) => (a[col] > b[col]) - (a[col] < b[col]))
          }
        }
        return rows
      },
      rows() {
        const all = this.filteredAndSortedData
        return all.slice(this.offset, this.offset + this.config.limit)
      },
      total() {
        return this.filteredData.length
      },
      offset() {
        return this.config.limit * this.currentPage
      },
      countText() {
        if (this.totalPages === 1) {
          if (this.total === 0) return this.i18n.count0
          if (this.total === 1) return this.i18n.count1
          return this.i18n.countN.replace('{count}', this.total)
        }
        return this.i18n.countPagedN.replace('{from}', this.offset + 1)
                                    .replace('{to}', this.offset + this.config.limit)
                                    .replace('{count}', this.total)
      }
    },
    watch: {
      data: {
        handler() {
          this.resetState()
        },
        deep: true
      },
      columns: {
        handler() {
          this.resetState()
        },
        deep: true
      },
      initialSearch: {
        handler(newVal) {
          this.search = Object.assign({}, newVal)
        },
        deep: true,
        immediate: true
      },
      filteredData() {
        this.currentPage = 0
      }
    },
    methods: {
      resetState() {
        const initialData = this.$options.data()

        this.currentPage = initialData.currentPage
        this.sort = initialData.sort
        this.ascending = initialData.ascending

        this.search = Object.assign({}, this.initialSearch)
      },
      selectPage(page) {
        this.currentPage = page
      },
      sortBy(column, event) {
        event.preventDefault()
        if (this.sort === column) {
          this.ascending = !this.ascending
        } else {
          this.sort = column
          this.ascending = true
        }
      },
      setLimit(limit) {
        this.currentPage = 0
        this.config.limit = limit
      },
      sortIconClasses(column) {
        if (this.sort !== column) return ['fas', 'fa-sort']
        if (this.ascending === true) return ['fas', 'fa-sort-up']
        return ['fas', 'fa-sort-down']
      },
      filterByText(column) {
        return this.i18n.filterBy.replace('{column}', column)
      },
      createSearcFuncs(search) {
        const val = search.toLowerCase()
        if(this.config.regexSearch === true) {
          const regex = new RegExp(val, 'g')
          return (input) => (input ? input.toString().toLowerCase().match(regex) : false)
        } else {
          return (input) => (input ? input.toString().toLowerCase().includes(val) : false)
        }
      },
      exportData() {
        this.$emit('export', this.filteredAndSortedData)
      }
    }
  }
</script>
