<template>
  <div>
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
          <th v-for="column in columns" :key="'search_' + column" scope="col">
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
      limit: 10,
      currentPage: 0,
      sort: undefined,
      ascending: true, // false = descending
      search: {},
      i18n: {
        countPagedN: 'Showing {from} to {to} of {count} records',
        countN: '{count} records',
        count1: 'One record',
        count0: 'No records',
        filterBy: 'Filter by {column}'
      }
    }),
    computed: {
      totalPages: function () {
        return Math.ceil(this.total / this.limit)
      },
      lowerCaseSearch: function () {
        const keys = Object.keys(this.search)
        let result = {}
        keys.forEach(key => {
          const val = this.search[key].toLowerCase()
          if (val) result[key] = val
        });
        return result
      },
      filteredData: function() {
        const lowerCaseSearch = this.lowerCaseSearch
        const colMatch = (row, colName) => {
          const colVal = row[colName].toLowerCase()
          const searchVal = lowerCaseSearch[colName]
          return colVal.includes(searchVal)
        }
        const searchedCols = Object.keys(lowerCaseSearch)
        const rowMatch = (row) => (
          !searchedCols.some(col => !colMatch(row, col))
        )
        return this.data.filter(row => rowMatch(row))
      },
      filteredAndSortedData: function() {
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
      rows: function () {
        const all = this.filteredAndSortedData
        return all.slice(this.offset, this.offset + this.limit)
      },
      total: function () {
        return this.filteredData.length
      },
      offset: function () {
        return this.limit * this.currentPage
      },
      countText: function() {
        if (this.totalPages === 1) {
          if (this.total === 0) return this.i18n.count0
          if (this.total === 1) return this.i18n.count1
          return this.i18n.countN.replace('{count}', this.total)
        }
        return this.i18n.countPagedN.replace('{from}', this.offset + 1)
                                    .replace('{to}', this.offset + this.limit)
                                    .replace('{count}', this.total)
      }
    },
    watch: {
      filteredData: function() {
        this.currentPage = 0
      }
    },
    methods: {
      selectPage: function (page) {
        this.currentPage = page
      },
      sortBy: function (column, event) {
        event.preventDefault();
        if (this.sort === column) {
          this.ascending = !this.ascending
        } else {
          this.sort = column
          this.ascending = true
        }
      },
      sortIconClasses: function (column) {
        if (this.sort !== column) return ['fa', 'fa-sort']
        if (this.ascending === true) return ['fa', 'fa-sort-up']
        return ['fa', 'fa-sort-down']
      },
      filterByText: function(column) {
        return this.i18n.filterBy.replace('{column}', column)
      }
    }
  }
</script>
