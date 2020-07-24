<template>
  <div>
    <div class="container" :class="[`placement--${placement}`,`${customClass}`]">
      <div class="inner-container">
        <div class="sku-preview">
          <img :src="previewImg" class="sku-img" />
          <div class="sku-description">
            <div class="title">
              {{ title }}
            </div>
            <div>
              <div class="price-row">
                <price :unit="priceUnit" :value="mainPrice.price" color="#157658" value-size="14" autofix></price>
                <price :unit="priceUnit" v-if="slashedPrice.display" deleted color="#999999" value-size="12" class="discount-price" :value="slashedPrice.price">
                </price>
                <div v-if="stock && stock >= stockThreshold" class="stock">
                  库存：{{ stock }} 件
                </div>
                <div v-if="stock && stock < stockThreshold && stock !=0" class="stock-pinch">
                  仅剩：{{ stock }} 件
                </div>
              </div>
              <div v-if="!noSpec" class="sku-pending">
                <span v-if="!skuIntact">
                  请选择：
                </span>
                <span v-else>
                  已选：
                </span>
                <span v-if="!skuIntact">
                  {{ missingKeys.toString() }}
                </span>
                <span v-else>
                  {{ currentValues.toString() }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="hr"></div>

        <div v-for="(item,index) in fences" :key="index">
          <fence :x="index" @celltap="onCellTap" :fence="item"></fence>
        </div>
        <div class="counter-container">
          <div>{{counterText}}</div>
          <counter @lintap="onSelectCount" :count="minCount" :min="minCount" :max="maxCount"></counter>
        </div>
      </div>
    </div>

    <div v-if="!outStock" @click="onBuyOrCart" class="bottom-btn" :class="[{'not-intact':!skuIntact}]">
      <div v-if="orderWay==='cart'">
        {{addCartText}}
      </div>
      <div v-else>
        {{buyText}}
      </div>
    </div>

    <div v-else class="bottom-btn out-stock">
      <div>{{outStockText}}</div>
    </div>
  </div>
</template>
<script>
import { FenceGroup } from '../models/fence-group'
import { Judger } from '../models/judger'
import { Spu } from '../models/spu'
import { Cell } from '../models/cell'
import Price from '../price/index.vue'
import Fence from '../fence/index.vue'
import Counter from '../counter/index.vue'
export default {
  name: 'Realm',
  props: {
    spu: Object,
    orderWay: {
      type: String,
      default: 'cart'
    },
    placement: {
      type: String,
      default: 'top'
    },
    priceUnit: { type: String, default: '￥' },
    buyText: { type: String, default: '立即购买' },
    addCartText: { type: String, default: '加入购物车' },
    outStockText: { type: String, default: '暂时缺货' },
    counterText: { type: String, default: '购买数量' },
    stockThreshold: { type: Number, default: 10 },
    minCount: { type: Number, default: 1 },
    maxCount: { type: Number, default: 99 },
    customClass: String
  },
  components: {
    Price,
    Fence,
    Counter
  },
  data() {
    return {
      judger: Object,
      currentSkuCount: this.minCount,
      previewImg: '',
      title: '',
      price: '',
      discountPrice: '',
      stock: 0,
      fences: [],
      outStock: '',
      skuIntact: '',
      missingKeys: ''
    }
  },
  watch: {
    spu: {
      handler(spu) {
        if (!spu) {
          return
        }
        if (Spu.isNoSpec(spu)) {
          this.processNoSpec(spu)
        } else {
          this.processHasSpec(spu)
        }
        this.triggerSpecEvent()
      },
      // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
      deep: true,
      immediate: true
    }
  },
  computed: {
    mainPrice() {
      if (!this.discountPrice) {
        return {
          price: this.price + '',
          display: true
        }
      } else {
        return {
          display: true,
          price: this.discountPrice + ''
        }
      }
    },
    slashedPrice() {
      if (this.discountPrice) {
        return {
          display: true,
          price: this.price + ''
        }
      } else {
        return {
          display: false,
          price: null
        }
      }
    },
    noSpec: {
      get() {
        if (this.spu) {
          const spu = this.spu
          return Spu.isNoSpec(spu)
        } else {
          return ''
        }
      },
      set(val) {
        this.noSpec = val
      }
    }
  },

  methods: {
    processNoSpec(spu) {
      //   this.setData({
      // skuIntact:
      //   })
      this.skuIntact = true
      this.bindSkuData(spu.sku_list[0])

      this.setStockStatus(spu.sku_list[0].stock, this.currentSkuCount)
    },

    processHasSpec(spu) {
      const fenceGroup = new FenceGroup(spu)
      fenceGroup.initFences()
      const judger = new Judger(fenceGroup)
      this.judger = judger

      const defaultSku = fenceGroup.getDefaultSku()
      if (defaultSku) {
        this.bindSkuData(defaultSku)
        this.setStockStatus(defaultSku.stock, this.currentSkuCount)
      } else {
        this.bindSpuData()
      }
      this.bindTipData()
      this.bindFenceGroupData(fenceGroup)
    },

    triggerSpecEvent() {
      const noSpec = Spu.isNoSpec(this.spu)
      if (noSpec) {
        this.$emit('specchange', {
          noSpec
        })
      } else {
        this.$emit('specchange', {
          noSpec: Spu.isNoSpec(this.spu),
          skuIntact: this.judger.isSkuIntact(),
          currentValues: this.judger.getCurrentValues(),
          missingKeys: this.judger.getMissingKeys()
        })
      }
    },

    bindSpuData() {
      const spu = this.spu
      this.previewImg = spu.img
      this.title = spu.title
      this.price = spu.price
      this.discountPrice = spu.discount_price
    },

    bindSkuData(sku) {
      //   this.setData({
      this.previewImg = sku.img
      this.title = sku.title
      this.price = sku.price
      this.discountPrice = sku.discount_price
      this.stock = sku.stock

      //   })
    },

    bindTipData() {
      //   this.setData({
      this.skuIntact = this.judger.isSkuIntact()
      this.currentValues = this.judger.getCurrentValues()
      this.missingKeys = this.judger.getMissingKeys()
      //   })
    },

    bindFenceGroupData(fenceGroup) {
      //   this.setData({
      this.fences = fenceGroup.fences
      //   })
    },

    setStockStatus(stock, currentCount) {
      //   this.setData({
      this.outStock = this.isOutOfStock(stock, currentCount)
      //   })
    },

    isOutOfStock(stock, currentCount) {
      return stock < currentCount
    },

    onSelectCount(event) {
      const currentCount = event.count
      this.currentSkuCount = currentCount

      if (this.noSpec) {
        this.setStockStatus(this.getNoSpecSku().stock, currentCount)
      } else {
        if (this.judger.isSkuIntact()) {
          const sku = this.judger.getDeterminateSku()
          this.setStockStatus(sku.stock, currentCount)
        }
      }
    },

    onCellTap(obj) {

      const data = obj.cell
      const x = obj.x
      const y = obj.y

      const cell = new Cell(data.spec)
      cell.status = data.status

      const judger = this.judger
      judger.judge(cell, x, y)
      const skuIntact = judger.isSkuIntact()
      if (skuIntact) {
        const currentSku = judger.getDeterminateSku()
        this.bindSkuData(currentSku)
        this.setStockStatus(currentSku.stock, this.currentSkuCount)
      }
      this.bindTipData()
      this.bindFenceGroupData(judger.fenceGroup)
      this.triggerSpecEvent()
    },

    onBuyOrCart() {
      if (Spu.isNoSpec(this.spu)) {
        this.shoppingNoSpec()
      } else {
        this.shoppingVarious()
      }
    },

    shoppingVarious() {
      const intact = this.judger.isSkuIntact()
      if (!intact) {
        // const missKeys = this.judger.getMissingKeys()
        // wx.showToast({
        //   icon: 'none',
        //   title: `请选择：${missKeys.join('，')}`,
        //   duration: 3000
        // })
        return
      }
      this._triggerShoppingEvent(this.judger.getDeterminateSku())
    },

    shoppingNoSpec() {
      this._triggerShoppingEvent(this.getNoSpecSku())
    },

    getNoSpecSku() {
      return this.spu.sku_list[0]
    },

    _triggerShoppingEvent(sku) {
      this.$emit('shopping', {
        orderWay: this.orderWay,
        spuId: this.spu.id,
        sku: sku,
        skuCount: this.currentSkuCount
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  box-sizing: border-box;
  /*padding:30rpx;*/
  background-color: #ffffff;
  max-height: 500px;
  min-height: 350px;
  margin-bottom: 50px;
  width: 100%;
}

.container.placement--bottom {
  position: absolute;
  bottom: 0;
}

.inner-container {
  padding: 15px 15px 0 15px;
}

.sku-preview {
  display: flex;
  flex-direction: row;
}

.sku-img {
  width: 80px;
  height: 80px;
}

.sku-description {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 20px;
}

.discount-price {
  margin-left: 10px;
}

.price-row {
  display: flex;
  flex-direction: row;
  align-items: baseline;
}

.sku-pending {
  font-size: 10px;
}

.sku-pending > text:first-child {
  color: #999999;
}

.sku-pending > text:nth-child(2) {
  color: #666666;
}

.hr {
  margin-top: 15px;
  width: 100%;
  height: 1px;
  background-color: #e9e9e9;
}

.stock {
  margin-left: 15px;
  font-size: 12px;
  color: #999;
}

.stock-pinch {
  margin-left: 15px;
  font-size: 10px;
  color: #d20109;
}

.counter-container {
  margin-top: 17px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 50px;
}

.counter-container {
  color: #555555;
  font-size: 12px;
}

.bottom-btn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: #333333;
  position: absolute;
  bottom: 0;
}
.not-intact {
  background-color: #dcebe6;
}

.out-stock {
  background-color: #dcebe6;
}

.bottom-btn {
  color: #ffffff;
}
</style>
