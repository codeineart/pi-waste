<template>
  <div>
    <code>query: {{ query }}</code>
    <datatable v-bind="$data" :HeaderSettings="false" />
  </div>
</template>

<script>
import mockData from '../_mockData';

export default {
  data: () => ({
    columns: [{ title: 'User ID', field: 'uid', sortable: true }, { title: 'Username', field: 'name' }, { title: 'Age', field: 'age', sortable: true }, { title: 'Email', field: 'email' }, { title: 'Country', field: 'country' }],
    data: [],
    total: 0,
    query: {},
  }),
  watch: {
    query: {
      handler(query) {
        console.log(query);
        mockData(query).then(({ rows, total }) => {
          this.data = rows;
          this.total = total;
        });
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/style.scss';
/*
  REMOVE UNNECESARY STUFF
*/
code {
  // display: none;
  width: 100%;
}
// [name='HeaderSettings'] {
//   display: none;
// }
[name='Datatable'] {
  thead {
    background-color: $orange-color;
    color: #ffffff;
    tr > th {
      font-size: 16px;
    }
    i.fa {
      &.fa-sort,
      &.fa-sort-up,
      &.fa-sort-down {
        color: #ffffff;
        opacity: 0.5;
        transition: all 0.4s ease;
        &:hover {
          opacity: 1;
        }
      }
      &.fa-sort-up,
      &.fa-sort-down {
        opacity: 1;
      }
    }
  }
  tbody {
    tr {
      transition: all 0.3s ease !important;
      td {
        color: $text-simple-gray;
        text-align: center;
      }
      &:nth-child(odd) {
        background-color: #f5f5f5;
      }
    }
  }
  & div:last-child {
    // pagination
    .col-sm-6 {
      width: 50%;
      display: block;
      float: left;
    }
    .pull-right {
      float: right;
    }
    select {
      border: 1px solid $text-simple-gray;
      padding: 0 5px;
      text-align: center;
    }
    .pagination {
      margin-top: 10px;
      li {
        a {
          display: block;
          background-color: #f5f5f5;
          text-align: center;
          padding: 7px;
          box-sizing: border-box;
          width: 32px;
          height: 32px;
          margin-left: 10px;
          border-radius: 50%;
          text-decoration: none;
          font-weight: 600;
          color: $text-simple-gray;
        }
        &.active a {
          background-color: $orange-color;
          color: #ffffff;
        }
        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
}
</style>
