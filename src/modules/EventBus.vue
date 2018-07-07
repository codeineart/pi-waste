<template>
  <div class="_event-bus">
    <slot>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'eventBus',
  props: {
    msg: String,
  },
};
</script>