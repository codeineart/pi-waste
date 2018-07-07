// if some dynamic components are used frequently, a better way is to register them globally
export default {
  DisplayRow: require('./nested-DisplayRow').default,
  Color: require('./td-Color').default,
  CreatetimeTd: require('./td-Createtime').default,
  CreatetimeTh: require('./th-Createtime').default,
  Email: require('./td-Email').default,
  IP: require('./td-IP').default,
  Opt: require('./td-Opt').default,
  FilterTh: require('./th-Filter').default
  // [Vue warn]: Do not use built-in or reserved HTML elements as component id: Filter
  // Filter: require('./th-Filter')
}
