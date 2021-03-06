<h1 align="center">zhf-ui</h1>

<div class="row" />

<div align="center">
  <span class="desc" >移动端 Vue 组件库</span>
</div>

<div align="center">

⚡️ 文档网站: https://zhanghaifeng213.github.io/zhf-ui-docs

</div>
<br/>

# 简介

zhf-ui 是基于 **Vue 2.0** 实现的移动端组件库。组件样式与交互参考了微信小程序组件库 [Lin UI](https://doc.mini.talelin.com)。

## 讨论交流

<table>
  <tbody>
    <tr>
      <td align="center" valign="middle">
        <p style="font-size:12px;">QQ群：560391017</p>
        <p>
          <img
            width="140"
            src="https://raw.githubusercontent.com/zhanghaifeng213/zhf-ui/master/public/qq.jpg">
        </p>
      </td>
    </tr>
  </tbody>
</table>

## 安装

```bash
# 通过 npm 安装
npm install zhf-ui -S

# 通过 yarn 安装
yarn add zhf-ui
```

## 快速上手

```js
import Vue from 'vue'
import Zhf from 'zhf-ui'
import 'zhf-ui/dist/zhf-ui.css'

Vue.use(Zhf)
```

## 使用组件

> 下文会简单介绍一个`zhf-ui` 组件的使用。

使用前，确保`zhf-ui`已经在你的项目里引入。
<br />
以 `Sku` 组件为例，只需要在页面中引入 `realm` 标签,按文档传入 `spu` 数据和其他的属性和事件。
<br />

```vue
<template>
  <realm
    :spu="spu"
    :minCount="minCount"
    :order-way="orderWay"
    @shopping="onShopping"
    @specchange="onSpecChange"
  >
  </realm>
</template>
<script>
export default {
  data(){
    return {
      spu: {...}, // 商品的spu数据
      minCount: 2, // sku最小数量
      orderWay: 'cart' // 底部按钮类型
    }
  },
  methods: {
    onShopping(val) {
      console.log(val)
    },
    onSpecChange(val) {
      console.log(val)
    }
  }
}
</script>
```

## Sku 组件效果图

<p>
    <img
       src="https://raw.githubusercontent.com/zhanghaifeng213/zhf-ui/master/public/sku.png">
</p>

[点击预览](http://zhang_hf.gitee.io/spu-work)

> 您也可以下载到本地查看运行。步骤如下:

下载源码

```bash
git clone https://github.com/zhanghaifeng213/zhf-ui.git
```

安装相关依赖

```bash
# 通过 npm 安装
npm install

# 通过 yarn 安装
yarn install
```

运行

```bash
npm run serve
```

启动好之后,在浏览器中输入 localhost:8080 进行查看
