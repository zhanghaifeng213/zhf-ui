<template>
  <div @click="onTap" class="container" :class="[statusStyle(cell.status).outer]">
    <div class="inner-container" :class="[statusStyle(cell.status).inner]">
      <img :src="cell.skuImg" mode="aspectFit" class="img" v-if="cell.skuImg" />
      <span>{{cell.title}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Cell',
  props: {
    cell: Object,
    y: Number,
    x: Number
  },

  /**
   * 组件的初始数据
   */
  data() {
    return {

    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap() {
      this.$emit('celltap',
        {
          cell: this.cell,
          x: this.x,
          y: this.y
        })
    },
    statusStyle(status) {
      if (status === 'forbidden') {
        return {
          outer: 'forbidden',
          inner: ''
        }
      }
      if (status === 'selected') {
        return {
          outer: 's-outer',
          inner: 's-inner'
        }
      }
      return {
        outer: '',
        inner: ''
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  height: 30px;
  border: 1px solid #333333;
  padding: 1px;
  box-sizing: border-box;
}

.inner-container {
  height: 100%;
  padding-left: 8px;
  padding-right: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #ffffff;
  font-size: 12px;
}

.forbidden {
  border: 1px dashed #bbbbbb;
  color: #bbbbbb;
}

.s-outer {
  border: 1px solid #157658;
  color: #ffffff;
}

.s-inner {
  background-color: #157658;
}

.img {
  display: flex;
  width: 22px;
  height: 22px;
  margin-right: 5px;
}

.selected {
}
</style>
