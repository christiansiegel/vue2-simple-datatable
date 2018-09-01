<template>
  <div class="vue2-simple-datatable">
    <div v-if="config.limits" class="row mb-2">
        <div class="col-lg-12">
            <div class="dropdown float-right">
              <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {{ config.limit }}
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" v-for="limitElement in config.limits" :key="limitElement" href="#" v-on:click="setLimit(limitElement, $event)">
                  {{ limitElement }}
                </a>
              </div>
            </div>
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
          <td v-for="column in columns" :key="column+index">{{ row[column] }}</td>
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

  export default {
    components: {
      'paginator': Paginator
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
      }
    },
    data: () => ({
      currentPage: 0,
      sort: undefined,
      ascending: true, // false = descending
      search: {},
      config: {
        limit: 10,
        limits: [10, 25, 50, 100],
      },
      i18n: {
        countPagedN: 'Showing {from} to {to} of {count} records',
        countN: '{count} records',
        count1: 'One record',
        count0: 'No records',
        filterBy: 'Filter by {column}'
      }
    }),
    computed: {
      totalPages() {
        return Math.ceil(this.total / this.config.limit)
      },
      lowerCaseSearch() {
        const keys = Object.keys(this.search)
        let result = {}
        keys.forEach(key => {
          const val = this.search[key]
          if (val) result[key] = val.toLowerCase()
        });
        return result
      },
      filteredData() {
        const lowerCaseSearch = this.lowerCaseSearch
        const colMatch = (row, colName) => {
          const colVal = row[colName]
          if (!colVal) return false
          const searchVal = lowerCaseSearch[colName]
          return colVal.toLowerCase().includes(searchVal)
        }
        const searchedCols = Object.keys(lowerCaseSearch)
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
        handler(oldVal, newVal) {
          this.resetData()
        },
        deep: true
      },
      columns: {
        handler(oldVal, newVal) {
          this.resetData()
        },
        deep: true
      },
      filteredData() {
        this.currentPage = 0
      }
    },
    created() {
      this.resetData()
    },
    methods: {
      resetData() {
        Object.assign(this.$data, this.$options.data.call(this));
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
      setLimit(limit, event) {
        event.preventDefault()
        this.currentPage = 0
        this.config.limit = limit
      },
      sortIconClasses(column) {
        if (this.sort !== column) return ['fa', 'fa-sort']
        if (this.ascending === true) return ['fa', 'fa-sort-up']
        return ['fa', 'fa-sort-down']
      },
      filterByText(column) {
        return this.i18n.filterBy.replace('{column}', column)
      }
    }
  }
</script>
