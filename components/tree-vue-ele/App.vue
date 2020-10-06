<template>
  <div></div>
</template>

<script>
import {getTreeList} from './api'
export default {
  data() {
    return {};
  },
  async mounted() {
    let {data} = await getTreeList()
    console.log(data)
  },
  methods: {}
};
</script>