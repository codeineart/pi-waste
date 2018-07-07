<template>
  <div>
    <!-- HTML TEMPLATE HERE -->
  </div>
</template>

<script>
export default {
  data: () => ({}),
  components: {},
  props: ['prop1', 'prop2'],
  watch: {
    // foo: function() {
    //   // Do something when foo changes
    // },
    // bar: {
    //   handler(fetchedData) {
    //     // do something with handler
    //   },
    // },
  },
  events: {},
  computed: {},
  methods: {},
  directives: {},
  filters: {},
  //                        <- CREATION HOOKS ->
  // perform actions before your component has even been added
  // to the DOM. Unlike any of the other hooks, creation hooks are also run
  // during server-side rendering.
  // Use creation hooks if you need to set things up in your component
  // both during client rendering and server rendering. You will not
  // have access to the DOM or the target mounting element (this.$el)
  // inside of creation hooks.
  beforeCreate() {
    // runs at the very initialization of your component. Data has not been
    // made reactive, and events have not been set up yet.
  },
  created() {
    // In the created hook, you will be able to access reactive data and events
    // are active. Templates and Virtual DOM have not yet been mounted or rendered.
  },
  //                        <- MOUNTING HOOKS ->
  // Use if: You need to access or modify the DOM of your component
  // immediately before or after the initial render.
  // Do not use if: You need to fetch some data for your component on initialization.
  // Use created (or created + activated for keep-alive components) for this instead,
  // especially if you need that data during server-side rendering.
  beforeMount() {
    // runs right before the initial render happens and after the template
    // or render functions have been compiled. Most likely you’ll never need
    // to use this hook. Remember, it doesn’t get called when doing server-side rendering.
  },
  mounted() {
    // In the mounted hook, you will have full access to the reactive component,
    // templates, and rendered DOM (via. this.$el). Mounted is the most-often
    // used lifecycle hook. The most frequently used patterns are fetching data
    // for your component (use created for this instead,) and modifying the DOM,
    // often to integrate non-Vue libraries.
  },
  //                         <- UPDATING HOOKS ->
  // called whenever a reactive property used by your component changes,
  // or something else causes it to re-render. They allow you to hook
  // into the watch-compute-render cycle for your component.
  // Use if: You need to know when your component re-renders,
  // perhaps for debugging or profiling.
  // Do not use if: You need to know when a reactive property
  // on your component changes. Use computed properties or watchers for that instead.
  beforeUpdate() {
    // The beforeUpdate hook runs after data changes on your component and
    // the update cycle begins, right before the DOM is patched and re-rendered.
    // It allows you to get the new state of any reactive data on your component
    // before it actually gets rendered.
  },
  updated() {
    // The updated hook runs after data changes on your component and the DOM
    // re-renders. If you need to access the DOM after a property change,
    // here is probably the safest place to do it.
  },
  //                      <- DESTROY (TEARDOWN) HOOKS ->
  // Destruction hooks allow you to perform actions when your component
  // is destroyed, such as cleanup or analytics sending. They fire when
  // your component is being torn down and removed from the DOM.
  beforeDestroy() {
    // fired right before teardown. Your component will still be fully
    // present and functional. If you need to cleanup events or reactive
    // subscriptions, beforeDestroy would probably be the time to do it.
  },
  destroyed() {
    // By the time you reach the destroyed hook, there’s pretty much
    // nothing left on your component. Everything that was attached to
    // it has been destroyed. You might use the destroyed hook to do any
    // last-minute cleanup or inform a remote server that the component
    // was destroyed like a sneaky snitch
  },
  //                      <- OTHER HOOKS ->
  // There are two other hooks, activated and deactivated. These are for
  // keep-alive components, a topic that is outside the scope of this article.
  // Suffice it to say that they allow you to detect when a component that
  // is wrapped in a <keep-alive></keep-alive> tag is toggled on or off.
  // You might use them to fetch data for your component or handle state
  // changes, effectively behaving as created and beforeDestroy without
  // the need to do a full component rebuild.
  activated() {},
  deactivated() {},
  beforeRouteEnter(to, from, next) {
    // called before the route that renders this component is confirmed.
    // does NOT have access to `this` component instance,
    // because it has not been created yet when this guard is called!
  },
  beforeRouteUpdate(to, from, next) {
    // called when the route that renders this component has changed,
    // but this component is reused in the new route.
    // For example, for a route with dynamic params `/foo/:id`, when we
    // navigate between `/foo/1` and `/foo/2`, the same `Foo` component instance
    // will be reused, and this hook will be called when that happens.
    // has access to `this` component instance.
  },
  beforeRouteLeave(to, from, next) {
    // called when the route that renders this component is about to
    // be navigated away from.
    // has access to `this` component instance.
  },
};
</script>

<style lang="scss" scoped>
.component-name__ {
  color: white;
  &element-one {
    color: black;
  }
  &element-one--modifier {
    color: red;
  }
}
</style>
