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
              <input type="text" class="form-control" v-model.lazy="search[column]" v-debounce="500" v-bind:placeholder="'Suche in \'' + column + '\''">
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
    <p class="small text-center">{{ showingText }}</p>
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
      data: Array,
      columns: Array
    },
    data: () => ({
      limit: 10,
      currentPage: 0,
      sort: undefined,
      ascending: true, // false = descending
      search: {}
    }),
    computed: {
      totalPages: function () {
        return Math.ceil(this.total / this.limit)
      },
      filteredData: function() {
        const that = this
        const searchedCols = Object.keys(this.search)
        let colMatch = function(row, colName) {
          const colVal = row[colName].toLowerCase()
          const searchVal = that.search[colName].toLowerCase()
          return !searchVal || colVal.includes(searchVal);
        }
        let rowMatch = function(row) {
          return searchedCols.map(col => colMatch(row, col))
                             .every(found => found === true)
        }
        return this.data.filter(row => rowMatch(row))
      },
      filteredAndSortedData: function() {
        let rows = this.filteredData
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
        return this.filteredAndSortedData.slice(this.offset, this.offset + this.limit)
      },
      total: function () {
        return this.filteredData.length
      },
      offset: function () {
        return this.limit * this.currentPage
      },
      showingText: function() {
        if (this.totalPages === 1) {
          if (this.total === 0) return 'Keine Einträge'
          if (this.total === 1) return '1 Eintrag'
          return this.total + ' Einträge'
        }
        return (this.offset + 1) + ' bis ' + (this.offset + this.limit) + ' von ' + this.total + ' Einträgen'
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
      }
    }
  }
</script>
