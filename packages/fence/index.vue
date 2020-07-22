<template>
  <div class="fence-container">
    <div class="title">{{fence.title}}</div>
    <div class="row-container">
      <div v-for="(item,index) in fence.cells" :key="index">
        <cell :x="x" :y="index" class="cell" :cell="item" @celltap="celltap"></cell>
      </div>
      <div class="hr"></div>
    </div>
  </div>
</template>
<script>
import Cell from '../cell/index.vue'
export default {
  name: 'Fence',
  props: {
    fence: Object,
    x: Number
  },
  components: {
    Cell
  },
  methods: {
    celltap(obj) {
      this.$emit('celltap', obj)
    }
  }
}
</script>

<style lang="scss" scoped>
.row-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
}

.title {
  color: #555555;
  font-size: 12px;
  margin-top: 14px;
  margin-bottom: 14px;
}

.cell {
  margin-bottom: 15px;
  margin-right: 10px;
}

.hr {
  width: 100%;
  height: 1px;
  background-color: #e9e9e9;
}
</style>
