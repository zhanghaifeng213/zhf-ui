<div align="center"> <span class="logo" > zhf-ui </span> </div>

<div class="row" />

<div align="center">
  <span class="desc" >移动端 Vue 组件库</span>
</div>

<div align="center">

⚡️ 文档网站: http://zhang_hf.gitee.io/zhf-ui

</div>
<br/>

# 简介

zhf-ui 是基于 **Vue 2.0** 实现的移动端组件库

## 讨论交流

<table>
  <tbody>
    <tr>
      <td align="center" valign="middle">
        <p style="font-size:12px;">QQ号：751434992</p>
      </td>
    </tr>
  </tbody>
</table>

## 安装

```sh
npm install zhf-ui -S
```

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

> 下文会简单介绍一个`zhf-ui` 组件的和使用。

使用前，确保`zhf-ui`已经在你的项目里引入。然后在 Vue 文件 中直接使用相应的组件。
<br />
以 Sku 组件为例，只需要在页面中引入 <realm></realm>,按文档传入 spu 数据和其他的属性和事件。
<br />

```html
<template>
  <div id="app">
    <div class="sku-container">
      <div class="sku-wrap">
        <realm
          :spu="spu"
          @shopping="onShopping"
          @specchange="onSpecChange"
        ></realm>
      </div>
    </div>
  </div>
</template>
```

## Sku 组件效果图

<p>
    <img
       src="https://raw.githubusercontent.com/zhanghaifeng213/zhf-ui/master/public/sku.png">
</p>
