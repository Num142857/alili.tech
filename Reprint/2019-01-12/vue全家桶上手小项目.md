---
title: 'vue全家桶上手小项目' 
date: 2019-01-12 2:30:24
hidden: true
slug: wkeos96quta
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">vue全家桶上手小项目</h1>
<p><a href="https://github.com/gjincai/vue-proj-demo" rel="nofollow noreferrer" target="_blank">本文源码</a></p>
<h2 id="articleHeader1">实现功能</h2>
<p><strong>主要用到的技术：</strong><br><code>vue-cli + vue2 + vue-router2 + vuex2 + axios + es6 + sass + eslint</code></p>
<p><strong>主要实现的功能：</strong><br>页面的数据通过 axios 模拟请求本地的 json 文件获得；<br>vue-router2 实现各页面的相互跳转；<br>vuex2 全局状态的管理，如头部导航的标题内容，侧栏的显示状态；<br>简易购物车功能，详情页加入购物车的商品，随机生成单价、商品名字；<br>购物车的信息通过localstorage存储在本地；<br>注册登录的信息也是通过localstorage存储在本地。</p>
<h2 id="articleHeader2">项目目录结构</h2>
<p>proj5-shop 目录结构，主要看src目录和static目录的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="│--build
|--config
|--dist
|--src
    |--assets
        |--logo.png
    |--components
        |--cart                 购物车页
        |--cate                 商品列表页，商品详情页
        |--center               个人中心，注册登录
        |--com                  公共模块
            |--header.vue       头部
            |--loading.vue      加载
            |--sidebar.vue      导航侧栏
            |--swiper.vue       轮播
            |--jam.js           公共功能函数
            |--localDB.js       localStorage本地存储
        |--page                 首页
        |--Hello.vue
|--static                       本地数据模拟请求（需放static目录下）
    |--data
        |--cart.json
        |--cate.json
        |--index.json
    |  .gitkeep
|--test
│  .babelrc
│  .editorconfig
│  .eslintignore
│  .eslintrc.js
│  .gitignore
│  index.html
│  package.json
│  README.md" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>│<span class="hljs-comment">--build</span>
|<span class="hljs-comment">--config</span>
|<span class="hljs-comment">--dist</span>
|<span class="hljs-comment">--src</span>
    |<span class="hljs-comment">--assets</span>
        |<span class="hljs-comment">--logo.png</span>
    |<span class="hljs-comment">--components</span>
        |<span class="hljs-comment">--cart                 购物车页</span>
        |<span class="hljs-comment">--cate                 商品列表页，商品详情页</span>
        |<span class="hljs-comment">--center               个人中心，注册登录</span>
        |<span class="hljs-comment">--com                  公共模块</span>
            |<span class="hljs-comment">--header.vue       头部</span>
            |<span class="hljs-comment">--loading.vue      加载</span>
            |<span class="hljs-comment">--sidebar.vue      导航侧栏</span>
            |<span class="hljs-comment">--swiper.vue       轮播</span>
            |<span class="hljs-comment">--jam.js           公共功能函数</span>
            |<span class="hljs-comment">--localDB.js       localStorage本地存储</span>
        |<span class="hljs-comment">--page                 首页</span>
        |<span class="hljs-comment">--Hello.vue</span>
|<span class="hljs-comment">--static                       本地数据模拟请求（需放static目录下）</span>
    |<span class="hljs-comment">--data</span>
        |<span class="hljs-comment">--cart.json</span>
        |<span class="hljs-comment">--cate.json</span>
        |<span class="hljs-comment">--index.json</span>
    |  .gitkeep
|<span class="hljs-comment">--test</span>
│  .babelrc
│  .editorconfig
│  .eslintignore
│  .eslintrc.js
│  .gitignore
│  index.html
│  <span class="hljs-keyword">package</span>.json
│  README.md</code></pre>
<h2 id="articleHeader3">vue-cli 初始化及配置修改</h2>
<p>vue-cli 脚手架官方安装：<a href="https://github.com/vuejs-templates/webpack" rel="nofollow noreferrer" target="_blank">https://github.com/vuejs-templates/webpack</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install -g vue-cli
$ vue init webpack proj5-shop
$ cd proj5-shop
$ npm install
$ npm run dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code><span class="hljs-variable">$ </span>npm install -g vue-cli
<span class="hljs-variable">$ </span>vue init webpack proj5-shop
<span class="hljs-variable">$ </span>cd proj5-shop
<span class="hljs-variable">$ </span>npm install
<span class="hljs-variable">$ </span>npm run dev</code></pre>
<p>vue-cli初始化完成后，继续新增安装以下依赖：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cnpm install axios node-sass vuex sass-loader vue-swipe --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code style="word-break: break-word; white-space: initial;">cnpm install axios <span class="hljs-keyword">node</span><span class="hljs-title">-sass</span> vuex sass-loader vue-swipe --save-dev</code></pre>
<p>修改 <code>build/webpack.base.conf.js</code>，使其对import引入的sass支持：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  test: /\.vue$/,
  loader: 'vue-loader',
  options: vueLoaderConfig
}
// 将上面的修改成下面的：
{
  test: /\.vue$/,
  loader: 'vue-loader',
  options: {
    loaders: {
      'scss': 'vue-style-loader!css-loader!sass-loader',
      'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
  <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.vue$/</span>,
  <span class="hljs-attr">loader</span>: <span class="hljs-string">'vue-loader'</span>,
  <span class="hljs-attr">options</span>: vueLoaderConfig
}
<span class="hljs-comment">// 将上面的修改成下面的：</span>
{
  <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.vue$/</span>,
  <span class="hljs-attr">loader</span>: <span class="hljs-string">'vue-loader'</span>,
  <span class="hljs-attr">options</span>: {
    <span class="hljs-attr">loaders</span>: {
      <span class="hljs-string">'scss'</span>: <span class="hljs-string">'vue-style-loader!css-loader!sass-loader'</span>,
      <span class="hljs-string">'sass'</span>: <span class="hljs-string">'vue-style-loader!css-loader!sass-loader?indentedSyntax'</span>
    }
  }
}</code></pre>
<h2 id="articleHeader4">关键功能技术点剖析</h2>
<h3 id="articleHeader5">template 与指令</h3>
<p>商品分类页 <code>src/components/cate/cate.vue</code> 的 template:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div class=&quot;s-cate&quot;>
    <div class=&quot;cate-nav&quot;>
      <div class=&quot;nav-out&quot;>
        <div class=&quot;nav&quot;>
          <a class=&quot;nav-a&quot; href=&quot;javascript:;&quot;
              v-for=&quot;(type, index) in types&quot;
              :class=&quot;{'nav-a-act': index==nowIndex}&quot;
              @click=&quot;clickType(type.type_now, index)&quot;>
              "{{"type.type_name"}}"
          </a>
        </div>
      </div>
    </div>
    <div class=&quot;cate-cont&quot;>
      <ul>
        <li v-for=&quot;brand in allBrand&quot; v-if=&quot;nowType==brand.type || nowType=='type_all'&quot;>
          <router-link to=&quot;detail&quot; class=&quot;cont-li&quot; href=&quot;javascript:;&quot;>
            <img class=&quot;pic&quot; :src=&quot;brand.brand_pic_url&quot;/>
            <span class=&quot;name&quot;>"{{"brand.brand_name"}}"</span>
            <span class=&quot;price&quot;>"{{"brand.brand_price"}}"</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"s-cate"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"cate-nav"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"nav-out"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"nav"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"nav-a"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:;"</span>
              <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(type, index) in types"</span>
              <span class="hljs-attr">:class</span>=<span class="hljs-string">"{'nav-a-act': index==nowIndex}"</span>
              @<span class="hljs-attr">click</span>=<span class="hljs-string">"clickType(type.type_now, index)"</span>&gt;</span>
              "{{"type.type_name"}}"
          <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"cate-cont"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"brand in allBrand"</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"nowType==brand.type || nowType=='type_all'"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"detail"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"cont-li"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:;"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pic"</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">"brand.brand_pic_url"</span>/&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"name"</span>&gt;</span>"{{"brand.brand_name"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"price"</span>&gt;</span>"{{"brand.brand_price"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<p>商品详情页 <code>src/components/cate/detail.vue</code> 的 template:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div class=&quot;s-detail&quot;>
    <comSwiper></comSwiper>
    <div class=&quot;cont&quot;>
      <p class=&quot;name&quot;>"{{"detailData.cart_name"}}"</p>
      <span class=&quot;price&quot;>￥"{{"detailData.cart_price"}}"</span>
      <div class=&quot;goods-counter&quot;>
        <a href=&quot;javascript:;&quot; class=&quot;btn-sub&quot; @click=&quot;changeNum(-1, detailData)&quot;> - </a>
        <input type=&quot;text&quot; class=&quot;goods-num&quot; readonly=&quot;readonly&quot; v-model=&quot;detailData.cart_num&quot;>
        <a href=&quot;javascript:;&quot; class=&quot;btn-add&quot; @click=&quot;changeNum(1, detailData)&quot;> + </a>
      </div>
    </div>
    <div class=&quot;bot&quot;>
      <!-- <router-link class=&quot;add-cart&quot; v-on:click.native=&quot;addCart&quot; to=&quot;/cart&quot;>加入购物车</router-link> -->
      <a class=&quot;add-cart&quot; href=&quot;javascript:;&quot; @click=&quot;addCart&quot;>加入购物车</a>
    </div>
  </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"s-detail"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">comSwiper</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">comSwiper</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"cont"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"name"</span>&gt;</span>"{{"detailData.cart_name"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"price"</span>&gt;</span>￥"{{"detailData.cart_price"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"goods-counter"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:;"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn-sub"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"changeNum(-1, detailData)"</span>&gt;</span> - <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"goods-num"</span> <span class="hljs-attr">readonly</span>=<span class="hljs-string">"readonly"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"detailData.cart_num"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:;"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn-add"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"changeNum(1, detailData)"</span>&gt;</span> + <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"bot"</span>&gt;</span>
      <span class="hljs-comment">&lt;!-- &lt;router-link class="add-cart" v-on:click.native="addCart" to="/cart"&gt;加入购物车&lt;/router-link&gt; --&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"add-cart"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:;"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"addCart"</span>&gt;</span>加入购物车<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<h3 id="articleHeader6">axios 数据请求</h3>
<p>首页的数据请求：<br>首先在入口文件 <code>main.js</code> 引入 axios，并将其挂在到 Vue 全局方法下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// main.js
import axios from 'axios'
Vue.prototype.$http = axios" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// main.js</span>
<span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">'axios'</span>
Vue.prototype.$http = axios</code></pre>
<p>在首页 <code>page/index.vue</code> 使用 axios：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>
  import comSwiper from '../com/swiper'
  import '../../css/index.scss'

  export default {
  // 首先声明一些页面数据变量
    data () {
      return {
        dataIndex: {},
        temai: {},
        rexiao: {},
        jingpin: {}
      }
    },
    created () {
    // created的时候请求数据
      this.getDataIndex()
    },
    methods: {
    // 请求到数据并赋值给data里声明的变量
      getDataIndex () {
        this.$http.get('../../static/data/index.json').then((response) => {
          this.dataIndex = response.data
          this.temai = this.dataIndex.data.temai
          this.rexiao = this.dataIndex.data.rexiao
          this.jingpin = this.dataIndex.data.jingpin
        }, (response) => {
          // error
        })
      }
    }
  }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">import</span> comSwiper <span class="hljs-keyword">from</span> <span class="hljs-string">'../com/swiper'</span>
  <span class="hljs-keyword">import</span> <span class="hljs-string">'../../css/index.scss'</span>

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-comment">// 首先声明一些页面数据变量</span>
    data () {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">dataIndex</span>: {},
        <span class="hljs-attr">temai</span>: {},
        <span class="hljs-attr">rexiao</span>: {},
        <span class="hljs-attr">jingpin</span>: {}
      }
    },
    created () {
    <span class="hljs-comment">// created的时候请求数据</span>
      <span class="hljs-keyword">this</span>.getDataIndex()
    },
    <span class="hljs-attr">methods</span>: {
    <span class="hljs-comment">// 请求到数据并赋值给data里声明的变量</span>
      getDataIndex () {
        <span class="hljs-keyword">this</span>.$http.get(<span class="hljs-string">'../../static/data/index.json'</span>).then(<span class="hljs-function">(<span class="hljs-params">response</span>) =&gt;</span> {
          <span class="hljs-keyword">this</span>.dataIndex = response.data
          <span class="hljs-keyword">this</span>.temai = <span class="hljs-keyword">this</span>.dataIndex.data.temai
          <span class="hljs-keyword">this</span>.rexiao = <span class="hljs-keyword">this</span>.dataIndex.data.rexiao
          <span class="hljs-keyword">this</span>.jingpin = <span class="hljs-keyword">this</span>.dataIndex.data.jingpin
        }, (response) =&gt; {
          <span class="hljs-comment">// error</span>
        })
      }
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>最终将数据渲染在 template 上：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;cont-main cont-rexiao&quot;>
  <router-link to=&quot;/detail&quot; class=&quot;cont-left&quot; href=&quot;javascript:;&quot;
      v-for=&quot;(brand, key, index) in rexiao&quot;
      v-if=&quot;key==0&quot;
      :key=&quot;brand.id&quot;>
    <span class=&quot;name&quot;>"{{"brand.brand_name"}}"</span>
    <span class=&quot;desc&quot;>"{{"brand.brand_desc"}}"</span>
    <img class=&quot;pic&quot; :src=&quot;brand.brand_pic_url&quot;/>
  </router-link>
  <div class=&quot;cont-right&quot;>
    <router-link to=&quot;/detail&quot; class=&quot;cont-right-one&quot; href=&quot;javascript:;&quot;
        v-for=&quot;(brand, key, index) in rexiao&quot;
        v-if=&quot;key>=1&quot;
        :key=&quot;brand.id&quot;>
      <p class=&quot;text&quot;>
        <span class=&quot;name&quot;>"{{"brand.brand_name"}}"</span>
        <span class=&quot;desc&quot;>"{{"brand.brand_desc"}}"</span>
      </p>
      <img class=&quot;pic&quot; :src=&quot;brand.brand_pic_url&quot;/>
    </router-link>
  </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"cont-main cont-rexiao"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/detail"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"cont-left"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:;"</span>
      <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(brand, key, index) in rexiao"</span>
      <span class="hljs-attr">v-if</span>=<span class="hljs-string">"key==0"</span>
      <span class="hljs-attr">:key</span>=<span class="hljs-string">"brand.id"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"name"</span>&gt;</span>"{{"brand.brand_name"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"desc"</span>&gt;</span>"{{"brand.brand_desc"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pic"</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">"brand.brand_pic_url"</span>/&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"cont-right"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/detail"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"cont-right-one"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:;"</span>
        <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(brand, key, index) in rexiao"</span>
        <span class="hljs-attr">v-if</span>=<span class="hljs-string">"key&gt;=1"</span>
        <span class="hljs-attr">:key</span>=<span class="hljs-string">"brand.id"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"text"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"name"</span>&gt;</span>"{{"brand.brand_name"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"desc"</span>&gt;</span>"{{"brand.brand_desc"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pic"</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">"brand.brand_pic_url"</span>/&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<h3 id="articleHeader7">router 的跳转</h3>
<p><code>router/router.js</code> 路由：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import App from '../App.vue'
import Index from '../components/page/index.vue'
import Cate from '../components/cate/cate.vue'
import Detail from '../components/cate/detail.vue'
import Center from '../components/center/center.vue'
import Cart from '../components/cart/cart.vue'

export default new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/index',
      component: App,
      children: [
        {path: 'index', name: 'index', component: Index},
        {path: 'cate', name: 'cate', component: Cate},
        {path: 'detail', name: 'detail', component: Detail},
        {path: 'center', name: 'center', component: Center},
        {path: 'cart', name: 'cart', component: Cart}
      ]
    }
  ],
  linkActiveClass: 'footer-act'
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> VueRouter <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>
Vue.use(VueRouter)

<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'../App.vue'</span>
<span class="hljs-keyword">import</span> Index <span class="hljs-keyword">from</span> <span class="hljs-string">'../components/page/index.vue'</span>
<span class="hljs-keyword">import</span> Cate <span class="hljs-keyword">from</span> <span class="hljs-string">'../components/cate/cate.vue'</span>
<span class="hljs-keyword">import</span> Detail <span class="hljs-keyword">from</span> <span class="hljs-string">'../components/cate/detail.vue'</span>
<span class="hljs-keyword">import</span> Center <span class="hljs-keyword">from</span> <span class="hljs-string">'../components/center/center.vue'</span>
<span class="hljs-keyword">import</span> Cart <span class="hljs-keyword">from</span> <span class="hljs-string">'../components/cart/cart.vue'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> VueRouter({
  <span class="hljs-attr">routes</span>: [
    {
      <span class="hljs-attr">path</span>: <span class="hljs-string">'/'</span>,
      <span class="hljs-attr">redirect</span>: <span class="hljs-string">'/index'</span>,
      <span class="hljs-attr">component</span>: App,
      <span class="hljs-attr">children</span>: [
        {<span class="hljs-attr">path</span>: <span class="hljs-string">'index'</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">'index'</span>, <span class="hljs-attr">component</span>: Index},
        {<span class="hljs-attr">path</span>: <span class="hljs-string">'cate'</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">'cate'</span>, <span class="hljs-attr">component</span>: Cate},
        {<span class="hljs-attr">path</span>: <span class="hljs-string">'detail'</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">'detail'</span>, <span class="hljs-attr">component</span>: Detail},
        {<span class="hljs-attr">path</span>: <span class="hljs-string">'center'</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">'center'</span>, <span class="hljs-attr">component</span>: Center},
        {<span class="hljs-attr">path</span>: <span class="hljs-string">'cart'</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">'cart'</span>, <span class="hljs-attr">component</span>: Cart}
      ]
    }
  ],
  <span class="hljs-attr">linkActiveClass</span>: <span class="hljs-string">'footer-act'</span>
})</code></pre>
<p>主要是通过 <code>router-link</code> 来跳转，比如导航栏 <code>com/sidebar.vue</code> 的跳转：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul class=&quot;ul-nav&quot; v-show=&quot;show&quot;>
  <li><router-link to=&quot;/index&quot;><span>首页</span><i>></i></router-link></li>
  <li><router-link to=&quot;/cate&quot;><span>分类</span><i>></i></router-link></li>
  <li><router-link to=&quot;/center&quot;><span>我的</span><i>></i></router-link></li>
  <li><router-link to=&quot;/cart&quot;><span>购物车</span><i>></i></router-link></li>
</ul>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ul-nav"</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"show"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/index"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>首页<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">i</span>&gt;</span>&gt;<span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/cate"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>分类<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">i</span>&gt;</span>&gt;<span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/center"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>我的<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">i</span>&gt;</span>&gt;<span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/cart"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>购物车<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">i</span>&gt;</span>&gt;<span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></code></pre>
<p>当然，在 <code>加入购物车</code> 的时候，采用的编程式导航跳转路由：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- <router-link class=&quot;add-cart&quot; v-on:click.native=&quot;addCart&quot; to=&quot;/cart&quot;>加入购物车</router-link> -->
<a class=&quot;add-cart&quot; href=&quot;javascript:;&quot; @click=&quot;addCart&quot;>加入购物车</a>

// 编程式导航，点击时触发路由跳转
router.push({ path: 'cart' })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;!-- <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"add-cart"</span> <span class="hljs-attr">v-on:click.native</span>=<span class="hljs-string">"addCart"</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/cart"</span>&gt;</span>加入购物车<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span> --&gt;
<span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"add-cart"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:;"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"addCart"</span>&gt;</span>加入购物车<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>

// 编程式导航，点击时触发路由跳转
router.push({ path: 'cart' })</span></code></pre>
<h3 id="articleHeader8">vuex 状态管理</h3>
<p>vuex 状态管理主要是头部的显示信息、导航栏的显示隐藏状态：<br>先来看 <code>store/store.js</code> ：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    sideBarState: false,            //导航侧栏的显示状态
    headerTitle: '默认的头部标题'   //不同页面头部标题的变更
  },
  mutations: {
    changeSideBarState (state, boolean) {
      state.sideBarState = boolean
    },
    changeHeaderTitle (state, str) {
      state.headerTitle = str
    }
  },
  actions: {
    // changeSideBarState (context, status) {
    //   context.commit('changeSideBarState', status)
    // }
    // es6解构写法
    changeSideBarState ({commit}, status) {
      commit('changeSideBarState', status)
    },
    changeHeaderTitle ({commit}, str) {
      commit('changeHeaderTitle', str)
    }
  },
  getters: {
    getSideBarState (state) {
      return state.sideBarState
    },
    getHeaderTitle (state) {
      return state.headerTitle
    }
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Vuex <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>
Vue.use(Vuex)
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Vuex.Store({
  <span class="hljs-attr">state</span>: {
    <span class="hljs-attr">sideBarState</span>: <span class="hljs-literal">false</span>,            <span class="hljs-comment">//导航侧栏的显示状态</span>
    headerTitle: <span class="hljs-string">'默认的头部标题'</span>   <span class="hljs-comment">//不同页面头部标题的变更</span>
  },
  <span class="hljs-attr">mutations</span>: {
    changeSideBarState (state, boolean) {
      state.sideBarState = boolean
    },
    changeHeaderTitle (state, str) {
      state.headerTitle = str
    }
  },
  <span class="hljs-attr">actions</span>: {
    <span class="hljs-comment">// changeSideBarState (context, status) {</span>
    <span class="hljs-comment">//   context.commit('changeSideBarState', status)</span>
    <span class="hljs-comment">// }</span>
    <span class="hljs-comment">// es6解构写法</span>
    changeSideBarState ({commit}, status) {
      commit(<span class="hljs-string">'changeSideBarState'</span>, status)
    },
    changeHeaderTitle ({commit}, str) {
      commit(<span class="hljs-string">'changeHeaderTitle'</span>, str)
    }
  },
  <span class="hljs-attr">getters</span>: {
    getSideBarState (state) {
      <span class="hljs-keyword">return</span> state.sideBarState
    },
    getHeaderTitle (state) {
      <span class="hljs-keyword">return</span> state.headerTitle
    }
  }
})</code></pre>
<p>例如，在进入分类页 <code>cate/cate.vue</code> 时，会在 <code>created</code> 的时候触发头部标题的变更；<br>当点击头部 <code>导航</code> 时，又会触发导航侧栏的显示状态的变更：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="created () {
  this.$store.dispatch('changeHeaderTitle', '分类')
},
methods: {
  showSideBar () {
    return this.$store.dispatch('changeSideBarState', true)
    // return this.$store.commit('changeSideBarState', true)
  },
  hideSideBar () {
    return this.$store.dispatch('changeSideBarState', false)
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">created () {
  <span class="hljs-keyword">this</span>.$store.dispatch(<span class="hljs-string">'changeHeaderTitle'</span>, <span class="hljs-string">'分类'</span>)
},
<span class="hljs-attr">methods</span>: {
  showSideBar () {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$store.dispatch(<span class="hljs-string">'changeSideBarState'</span>, <span class="hljs-literal">true</span>)
    <span class="hljs-comment">// return this.$store.commit('changeSideBarState', true)</span>
  },
  hideSideBar () {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$store.dispatch(<span class="hljs-string">'changeSideBarState'</span>, <span class="hljs-literal">false</span>)
  }
}</code></pre>
<h3 id="articleHeader9">购物车</h3>
<p>在进入商品详情页的时，会随机生成商品的名称和价格，使得 <code>加入购物车</code> 时能在购物车页面区分开个商品（主要是还没做后端node+mongodb的数据）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// cate/detail.vue
data () {
  return {
    detailData: {
      id: 100048,
      type: 'type_man',
      isSelect: true,
      cart_img: 'http://ohe5avf3y.bkt.clouddn.com/pro/vue/vue-shop/vue-proj-goods.jpg',
      cart_name: '商品名字' + this.getRandom(10, 100),
      cart_num: 1,
      cart_price: this.getRandom(10, 100)
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// cate/detail.vue</span>
data () {
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">detailData</span>: {
      <span class="hljs-attr">id</span>: <span class="hljs-number">100048</span>,
      <span class="hljs-attr">type</span>: <span class="hljs-string">'type_man'</span>,
      <span class="hljs-attr">isSelect</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">cart_img</span>: <span class="hljs-string">'http://ohe5avf3y.bkt.clouddn.com/pro/vue/vue-shop/vue-proj-goods.jpg'</span>,
      <span class="hljs-attr">cart_name</span>: <span class="hljs-string">'商品名字'</span> + <span class="hljs-keyword">this</span>.getRandom(<span class="hljs-number">10</span>, <span class="hljs-number">100</span>),
      <span class="hljs-attr">cart_num</span>: <span class="hljs-number">1</span>,
      <span class="hljs-attr">cart_price</span>: <span class="hljs-keyword">this</span>.getRandom(<span class="hljs-number">10</span>, <span class="hljs-number">100</span>)
    }
  }
}</code></pre>
<p>点击 <code>加入购物车</code>，实际就是将该商品的 data 信息加入到 localStorage 的本地存储中；这里主要用到一个自己定义的 <code>localDB.js</code> ：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default class todoDb {
  constructor (name) {
    this.name = name
    if (JSON.stringify(this.get(this.name)) === '{}') {
      this.set([])
    }
  }
  set (val) {
    window.localStorage.setItem(this.name, JSON.stringify(val))
  }
  get () {
    return JSON.parse(window.localStorage.getItem(this.name)) || {}
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">todoDb</span> </span>{
  <span class="hljs-keyword">constructor</span> (name) {
    <span class="hljs-keyword">this</span>.name = name
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">JSON</span>.stringify(<span class="hljs-keyword">this</span>.get(<span class="hljs-keyword">this</span>.name)) === <span class="hljs-string">'{}'</span>) {
      <span class="hljs-keyword">this</span>.set([])
    }
  }
  set (val) {
    <span class="hljs-built_in">window</span>.localStorage.setItem(<span class="hljs-keyword">this</span>.name, <span class="hljs-built_in">JSON</span>.stringify(val))
  }
  get () {
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">JSON</span>.parse(<span class="hljs-built_in">window</span>.localStorage.getItem(<span class="hljs-keyword">this</span>.name)) || {}
  }
}</code></pre>
<p>购物车 <code>cart/cart.vue</code> 主要思路就是：读取本地存储购物车中的localStorage 所有产品信息并显示出来；根据用户增删操作、来更新本地购物车存储的产品信息。<br>具体的实现直接看 <a href="https://github.com/gjincai/vue-proj-demo/blob/master/proj5-shop/src/components/cart/cart.vue" rel="nofollow noreferrer" target="_blank">购物车源码</a>。</p>
<h3 id="articleHeader10">注册登录</h3>
<p>注册登录的用户中心页面 <code>center/center.vue</code>，主要是控制三种状态的显示与隐藏：登录、注册、登录成功后的用户中心，主要是data里面的 showState ；<br>还有就是表单数据的一些绑定验证，主要是data里面的 dataLogin 。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input name=&quot;mobile&quot; type=&quot;tel&quot; placeholder=&quot;请输入手机号&quot; maxlength=&quot;11&quot; v-model=&quot;dataLogin.name&quot;>
<input name=&quot;password&quot; type=&quot;tel&quot; placeholder=&quot;请输入密码&quot; maxlength=&quot;6&quot; v-model=&quot;dataLogin.pass&quot;>
<script>
data () {
  return {
    tips: '',
    showState: 'logined',
    dataLogin: {
      name: '',
      pass: '',
      code: ''
    },
    // showState: 'register'
    // showState: 'logining'
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"mobile"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"tel"</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"请输入手机号"</span> <span class="hljs-attr">maxlength</span>=<span class="hljs-string">"11"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"dataLogin.name"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"password"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"tel"</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"请输入密码"</span> <span class="hljs-attr">maxlength</span>=<span class="hljs-string">"6"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"dataLogin.pass"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
data () {
  <span class="hljs-keyword">return</span> {
    tips: <span class="hljs-string">''</span>,
    showState: <span class="hljs-string">'logined'</span>,
    dataLogin: {
      name: <span class="hljs-string">''</span>,
      pass: <span class="hljs-string">''</span>,
      code: <span class="hljs-string">''</span>
    },
    <span class="hljs-comment">// showState: 'register'</span>
    <span class="hljs-comment">// showState: 'logining'</span>
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>详情看github源码中的 <code>center/center.vue</code>。</p>
<h2 id="articleHeader11">新手的小坑总结</h2>
<p><strong>build 后需在服务器打开访问</strong><br>执行 <code>npm run build</code> 后生成的dist，直接在浏览器以本地文件 file:// ... 打开里面的index.html 、是访问不了的；需要放在服务器上才能访问；或者自己在本地开启一个服务器。</p>
<p><strong>引入的component,外层要有容器</strong><br>如下面的 &lt;comHeader&gt;&lt;/comHeader&gt; ，它外层一定要有容器、把它包裹着：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  <div class=&quot;shop&quot;>
    <comHeader></comHeader>
  </div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"shop"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">comHeader</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">comHeader</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p><strong>v-for key</strong><br>component lists rendered with v-for should have explicit keys:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<router-link to=&quot;/detail&quot; class=&quot;cont-one&quot; v-for=&quot;brand in temai&quot; :key=&quot;brand.id&quot;>
// ...
</router-link>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/detail"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"cont-one"</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"brand in temai"</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">"brand.id"</span>&gt;</span>
// ...
<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span></code></pre>
<p>详见：<a href="https://cn.vuejs.org/v2/guide/list.html#key" rel="nofollow noreferrer" target="_blank">https://cn.vuejs.org/v2/guide/list.html#key</a></p>
<p><strong>原生html报waring</strong><br>当我们引入的component命名成原生的html时，会报warning，于是把</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<hearder></header>      // 报 warning
<comHearder></comHeader>

import comHeader from './components/com/header.vue'

components: {
  // hearder: hearder
  comHeader: comHeader
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;hearder&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span></span>      <span class="hljs-comment">// 报 warning</span>
&lt;comHearder&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">comHeader</span>&gt;</span></span>

<span class="hljs-keyword">import</span> comHeader <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/com/header.vue'</span>

components: {
  <span class="hljs-comment">// hearder: hearder</span>
  comHeader: comHeader
}</code></pre>
<p><strong>判断对象为空</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (typeof myObj == &quot;undefined&quot;) {
　var myObj = {};
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> myObj == <span class="hljs-string">"undefined"</span>) {
　<span class="hljs-keyword">var</span> myObj = {};
}</code></pre>
<p><strong>webstorm卡顿</strong><br>webstorm 需要把 node_models 文件夹排除掉（exclued），不然很卡顿。</p>
<p>目前正学习node+mongodb，准备以此取代该项目中模拟的本地数据请求和localStorage，项目代码：<a href="https://github.com/gjincai/vue-node-proj" rel="nofollow noreferrer" target="_blank">https://github.com/gjincai/vue-node-proj</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue全家桶上手小项目

## 原文链接
[https://segmentfault.com/a/1190000009820725](https://segmentfault.com/a/1190000009820725)

