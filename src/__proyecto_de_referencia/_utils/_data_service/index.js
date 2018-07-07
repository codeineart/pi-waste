import moment from 'moment'
import uniq from 'lodash/uniq'
import orderBy from 'lodash/orderBy'
// import { service, endpoints } from 'src/services/general_service'
// import files from './dataSource' // ----> replace by fetched data

const typeOf = o =>
  Object.prototype.toString
    .call(o)
    .slice(8, -1)
    .toLowerCase()
const purify = o => JSON.parse(JSON.stringify(o)) // purify data

/**
 * mockData - simulate Ajax request and respond
 * @param   {Object} query
 * @param   {Array} files
 * @resolve {Object}
 */
export default function mockData (query, files) {
  /**
   * Query construction. Expands Query into different
   * variables for later use in method
   */
  query = purify(query)
  const { limit = 10, offset = 0, sort = '', order = '' } = query

  /** #TODO
   * Loads data. This should be done via request to the API
   * In the meantime, it grabs the actual loaded data(rows)
   * on parent.
   */

  let rows = files

  /**
   * Custom query conditions.
   * Filter rows data base on query stuff
   */

  // Walks every row field
  ;['file_name', 'file_visibility', 'file_owner', 'file_last_modified', 'file_size'].forEach(field => {
    /**
     * Check type of value in query field.
     */
    switch (typeOf(query[field])) {
      case 'array':
        // return
        rows = rows.filter(row => query[field].includes(row[field]))
        break
      case 'string':
        rows = rows.filter(row => row[field].toLowerCase().includes(query[field].toLowerCase()))
        break
      default:
        // nothing to do
        break
    }
  })

  /**
   * If sort is set
   */

  if (sort) {
    rows = orderBy(rows, sort, order)
  }

  const res = {
    rows: rows.slice(offset, offset + limit),
    total: rows.length,
    summary: {
      uid: rows.length,
      age: rows.length && ~~(rows.map(({ age }) => age).reduce((sum, cur) => sum + cur) / rows.length), // average age
      country: uniq(rows.map(({ country }) => country)).length
    }
  }

  const consoleGroupName = 'Mock data - ' + moment().format('YYYY-MM-DD HH:mm:ss')

  setTimeout(() => {
    // console.group(consoleGroupName)
    // console.info('Receive:', query)
    // console.info('Respond:', res)
    // console.groupEnd(consoleGroupName)
  }, 0)

  return Promise.resolve(purify(res))
}
