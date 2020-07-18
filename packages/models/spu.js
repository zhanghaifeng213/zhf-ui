class Spu {
  static isNoSpec(spu) {
    if (spu.sku_list.length === 1 && spu.sku_list[0].specs.length === 0) {
      return true
    }
    return false
  }
}

export { Spu }
