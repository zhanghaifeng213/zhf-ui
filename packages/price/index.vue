<template>
  <div class="price-container" :class="[customClass,{
    'price-del':deleted
  }]" :style="{'color': delColor?delColor:color}">
    <span :class="[unitClass]" :style="{'color': unitColor?unitColor:color, 'font-size': (unitSize?unitSize:size)+'px','font-weight': unitBold?unitBold:bold}">{{unit}}</span>
    <span :class="[valueClass]" :style="{color: valueColor?valueColor:color,'font-size': (valueSize?valueSize:size)+'px','font-weight': valueBold?valueBold:bold}">{{result}}</span>
  </div>
</template>
<script>
export default {
  name: 'Price',
  props: {
    unit: { type: String, default: '￥' },
    size: { type: String, default: '14' },
    color: { type: String, default: '#3963BC' },
    bold: { type: String, default: '500' },
    unitColor: String,
    unitSize: String,
    unitBold: String,
    value: { type: String, default: '0.00' },
    mode: { type: String, default: 'number', options: ['number', 'text'] },
    valueColor: String,
    valueSize: String,
    valueBold: String,
    deleted: Boolean,
    delColor: String,
    reserveDigit: { type: Number, default: 2 },
    autofix: Boolean,
    customClass: String,
    unitClass: String,
    valueClass: String,
    deletedClass: String
  },
  data() {
    return {
      result: ''
    }
  },
  watch: {
    value: {
      handler() {
        this.reserveNumber()
      },
      immediate: true
    }
  },
  methods: {
    reserveNumber() {
      const e = Number(this.value)
      if (
        !(isNaN(Number(e)) || this.mode === 'text') &&
        this.autofix
      ) {
        const t = e.toFixed(this.reserveDigit)
        this.result = t
      } else { this.result = this.value }
    }
  }
}
</script>
<style lang="scss">
.price-del {
  text-decoration: line-through !important;
}
.price-container {
  display: inline-block;
  text-align: center;
  color: #3963bc;
  font-size: 14px;
}
</style>

