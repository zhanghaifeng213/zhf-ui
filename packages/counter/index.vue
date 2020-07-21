<template>
  <div class="container-count" :class="[customClass]">
    <div class="symbol" :class="[result<=min|| disabled?'disabled':'abled',
    {
      disabledClass:result<=min|| disabled
    },
    {
      symbolClass:!(result<=min|| disabled)
    }
    ]" @click="onReduce" data-type="overflow_min" :hover-class="isHover?'count-hover':''">
      <div class="l-icon l-icon-reduce" :style="{'font-size':iconSize,'color':iconColor}"></div>
    </div>
    <input v-if="focus" class="count" :class="[countClass]" :disabled="disabled" type="number" :focus="focus" v-model="result" @blur="onBlur" />
    <div v-else class="count" :class="[countClass]" @click="onCount">{{result}}</div>
    <div class="symbol" :class="[result>=max|| disabled?'disabled':'abled',{
      disabledClass:result>=max|| disabled
    },
    {
      symbolClass:!(result>=max|| disabled)
    }]" @click="onAdd" data-type="overflow_max" :hover-class="isHover?'count-hover':''">
      <div class="l-icon l-icon-add" :style="{'font-size':iconSize,'color':iconColor}"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Counter',
  props: {
    count: { type: Number, default: 1 },
    max: { type: Number, default: 9999 },
    min: { type: Number, default: 1 },
    step: { type: Number, default: 1 },
    disabled: Boolean,
    iconSize: String,
    iconColor: String,
    isHover: { type: Boolean, default: !0 },
    customClass: String,
    disabledClass: String,
    symbolClass: String,
    countClass: String
  },
  data() {
    return {
      focus: !1,
      result: 1
    }
  },
  watch: {
    count: {
      handler() {
        this.valueRange(this.count, 'parameter')
      },
      immediate: true
    },
    min: {
      handler() {
        this.valueRange(this.count, 'parameter')
      },
      immediate: true
    },
    max: {
      handler() {
        this.valueRange(this.count, 'parameter')
      },
      immediate: true
    }
  },
  methods: {
    doNothing(t) {
      const { type: e } = t
      this.$emit(
        'linout',
        { type: e, way: 'icon' }
      )
    },
    onCount() {
      this.focus = !0
    },
    onBlur() {
      this.focus = !1
      // let { value: e } = t.detail
      setTimeout(() => {
        this.blurCount(Number(this.result), () => {
          this.$emit(
            'lintap',
            { count: this.result, type: 'blur' }
          )
        })
      }, 50)
    },
    blurCount(t, e) {
      t ? this.valueRange(t) : this.result = this.count
      e && e()
    },
    valueRange(t, e = 'input') {
      t > this.max
        ? (() => {
          this.result = this.max
          this.$emit(
            'linout',
            { type: 'overflow_max', way: e }
          )
        })()
        : t < this.min
          ? (() => {
            this.result = this.min
            this.$emit(
              'linout',
              { type: 'overflow_min', way: e }
            )
          })()
          : this.result = t
    },
    reduceTap() {
      this.result - this.step <= this.min
        ? (this.result = this.min)
        : (() => {
          this.result -= this.step
          this.$emit(
            'lintap',
            { count: this.result, type: 'reduce' }
          )
        })()
    },
    addTap() {
      this.result + this.step >= this.max
        ? (this.result = this.max)
        : (() => {
          this.result += this.step
          this.$emit(
            'lintap',
            { count: this.result, type: 'add' }
          )
        })()

    },
    onAdd() {
      if (this.result >= this.max || this.disabled) {
        this.doNothing('overflow_max')
      } else {
        this.addTap()
      }
    },
    onReduce() {
      if (this.result <= this.min || this.disabled) {
        this.doNothing('overflow_min')
      } else {
        this.reduceTap()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.container-count {
  display: flex;
  flex-direction: row;
  width: 85px;
  height: 28px;
}
.symbol {
  height: 100%;
  width: 28px;
  font-size: 14px;
  color: #596c8e;
  display: flex;
  align-items: center;
  justify-content: center;
}
.disabled {
  background-color: #f3f3f3;
  color: #c4c9d2;
}
.abled {
  background-color: #ecf1f8;
  color: #596c8e;
}
.count {
  height: 100%;
  flex: 1;
  min-height: 28px;
  line-height: 28px;
  font-size: 12px;
  color: #596c8e;
  background: #f6f7f9;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  outline: none;
  border: none;
  padding: 0;
}
.count::-webkit-outer-spin-button,
.count::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
}
.count:focus {
  outline: none;
  border: none;
}
@font-face {
  font-family: iconfont;
  src: url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAALEAAsAAAAABqwAAAJ3AAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDBgqBFIEWATYCJAMMCwgABCAFhG0HNxvdBcgekiSBqhRCJKIogADMEYRr5GySu0dQoBAloETFRVKmqpWoK1wVG1th2Ij732n7N5fsqTh2xyneKfa2N3/anZKGvYXFohGGrUFIEA6JogD/fZ7L6U2gA7nGtyynNW3s8fyoF2AcUEBjbYqsRALxFtlF3ImLOE6g3ZheoYOxmRVIKtC4QLww9QYkCxFFMfKtQt2wtIjXKq3pZfrEq+j78d9qJEmqDE09fTTahoFf6deHfNxwgxOiBHl1hYx5oBC3GjMXIsLgItpN0e7yWhHSXPEmkcq31Dv94yWihmo7wbQcS/yiMoJf9yskkEFdzE0Diwo7eF2IkexeNr35cvtSjmQ/fjt5zeTy++93z1I4x8LHT3u9VVdH6SHr0r8+OjOTtCopyONe0uFsIlZDiaMZyTdAmzFfZzrm0+EOQPOcP/IeANGP4rNA8KN0+V8rbPwlMwX83P7UK0Wa5wJwS+sZvMEfUwMbiq9F1lxcFVWFvmwE4ErICtOvARTo9zPeMgROEVoL2hG+FqMeslbjZGHnUemwjlqrbbSbM766wwAuIkobZl1ICL0ekXT7jqzXF1nYb1SG/aLWGxG0O4uBLTtMhpne59gQ2CbNHWK2mEeJXaTj+iXUN5wGz2sjfg15YMaJJqvl/Dh6yOeYEWzqFSEooZy5ZEw6DR2HEZ8zC1tCNoTwq4pCm94kt5gLafs41CCgNqJpB2FqYTyUtxbSlc8vQboNjgbeIejJr0FcwOyc0MhUADlu8kCCe3klsElXIQgUQXGMixiTBiGHgyH85kEW1CLIjBEpX5WCm1GoSV7f4n7fNmiH9syRIkeR77bbiWdmwzMaDAAA')
    format('woff2');
}
.l-icon-add:before {
  content: '\e602';
}
.l-icon-reduce:before {
  content: '\e69c';
}
.l-icon {
  font-family: iconfont;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.l-icon::before {
  display: inline-flex;
}
.count-hover {
  opacity: 0.8;
}
</style>
