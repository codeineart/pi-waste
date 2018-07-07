import uniq from 'lodash/uniq'
import without from 'lodash/without'
import camelCase from 'lodash/camelCase'
const Random = require('mockjs').Random

const total = 20 // how many rows to generate
const getRandomUid = () => Random.integer(1, total)

const users = Array(total)
  .fill()
  .map((item, idx) => {
    // let name = Random.name()
    let file_name = Random.word(4, 8)
    return {
      file_name: file_name + Random.pick(['.pdf', '.docx', '.pptx', '.png']),
      file_visibility: Random.pick(['Público', 'Inter-Departamento']),
      file_owner: Random.pick(['HSEC', 'Calidad', 'Compras', 'Maquinarias']),
      file_last_modified: +new Date(Random.datetime('yyyy/MM/dd HH:mm:ss')),
      file_url: "http://r.ddmcdn.com/w_624/s_f/o_1/cx_0/cy_17/cw_624/ch_416/APL/uploads/2014/10/nyan-cat-01-625x450.jpg",
      file_size: Random.integer(1, 20)

      // country: Random.pick(['US', 'UK', 'China', 'Russia', 'Germany', 'France', 'Japan']),
      // lang: Random.pick(['English', 'Chinese', 'Russian', 'German', 'French', 'Japanese']),
      // programLang: Random.pick(['C', 'C++', 'Java', 'C#', 'Python', 'Ruby', 'PHP', 'JavaScript', 'Go']),
      // ip: Random.ip(),
      // color: Random.color(),
      // createTime: +new Date(Random.datetime('yyyy/MM/dd HH:mm:ss')) // to timestamp
    }
  })

export default users
