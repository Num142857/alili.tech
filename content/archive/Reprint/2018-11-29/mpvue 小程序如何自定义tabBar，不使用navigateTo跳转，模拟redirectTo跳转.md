---
title: 'mpvue 小程序如何自定义tabBar，不使用navigateTo跳转，模拟redirectTo跳转' 
date: 2018-11-29 9:33:05
hidden: true
slug: gyq7qdx692c
categories: [reprint]
---

{{< raw >}}

                    
<h4>&#x539F;&#x751F;tabBar</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="tabBar: {
  &quot;list&quot;: [
    {
      pagePath: &quot;pages/index/main&quot;,
      iconPath: &quot;/static/images/index-default.png&quot;,
      selectedIconPath: &quot;/static/images/index-active.png&quot;,
      text: &quot;&#x9996;&#x9875;&quot;
    },
    {
      pagePath: &quot;pages/orderList/main&quot;,
      iconPath: &quot;/static/images/order-default.png&quot;,
      selectedIconPath: &quot;/static/images/order-active.png&quot;,
      text: &quot;&#x8BA2;&#x5355;&quot;
    },
    {
      pagePath: &quot;pages/notice/main&quot;,
      iconPath: &quot;/static/images/icon-notice-default.png&quot;,
      selectedIconPath: &quot;/static/images/icon-notice-active.png&quot;,
      text: &quot;&#x9884;&#x544A;&quot;
    },
    {
      pagePath: &quot;pages/user/main&quot;,
      iconPath: &quot;/static/images/person-default.png&quot;,
      selectedIconPath: &quot;/static/images/person-active.png&quot;,
      text: &quot;&#x4E2A;&#x4EBA;&quot;
    }
  ],
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">tabBar: {
  <span class="hljs-string">&quot;list&quot;</span>: [
    {
      <span class="hljs-attr">pagePath</span>: <span class="hljs-string">&quot;pages/index/main&quot;</span>,
      <span class="hljs-attr">iconPath</span>: <span class="hljs-string">&quot;/static/images/index-default.png&quot;</span>,
      <span class="hljs-attr">selectedIconPath</span>: <span class="hljs-string">&quot;/static/images/index-active.png&quot;</span>,
      <span class="hljs-attr">text</span>: <span class="hljs-string">&quot;&#x9996;&#x9875;&quot;</span>
    },
    {
      <span class="hljs-attr">pagePath</span>: <span class="hljs-string">&quot;pages/orderList/main&quot;</span>,
      <span class="hljs-attr">iconPath</span>: <span class="hljs-string">&quot;/static/images/order-default.png&quot;</span>,
      <span class="hljs-attr">selectedIconPath</span>: <span class="hljs-string">&quot;/static/images/order-active.png&quot;</span>,
      <span class="hljs-attr">text</span>: <span class="hljs-string">&quot;&#x8BA2;&#x5355;&quot;</span>
    },
    {
      <span class="hljs-attr">pagePath</span>: <span class="hljs-string">&quot;pages/notice/main&quot;</span>,
      <span class="hljs-attr">iconPath</span>: <span class="hljs-string">&quot;/static/images/icon-notice-default.png&quot;</span>,
      <span class="hljs-attr">selectedIconPath</span>: <span class="hljs-string">&quot;/static/images/icon-notice-active.png&quot;</span>,
      <span class="hljs-attr">text</span>: <span class="hljs-string">&quot;&#x9884;&#x544A;&quot;</span>
    },
    {
      <span class="hljs-attr">pagePath</span>: <span class="hljs-string">&quot;pages/user/main&quot;</span>,
      <span class="hljs-attr">iconPath</span>: <span class="hljs-string">&quot;/static/images/person-default.png&quot;</span>,
      <span class="hljs-attr">selectedIconPath</span>: <span class="hljs-string">&quot;/static/images/person-active.png&quot;</span>,
      <span class="hljs-attr">text</span>: <span class="hljs-string">&quot;&#x4E2A;&#x4EBA;&quot;</span>
    }
  ],
}</code></pre>
<h4>&#x81EA;&#x5B9A;&#x4E49;tabBar</h4>
<p>&#x6548;&#x679C;&#x56FE;1&#xFF1A;&#x5982;&#x679C;&#x9700;&#x8981;&#x6DFB;&#x52A0;&#x6309;&#x94AE;</p>
<p><span class="img-wrap"><img data-src="/img/bVbbdAz?w=344&amp;h=89" src="https://static.alili.tech/img/bVbbdAz?w=344&amp;h=89" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor: pointer; display: inline;"></span></p>
<p>&#x6548;&#x679C;2 &#x5982;&#x679C;&#x4E0D;&#x9700;&#x8981;&#x6309;&#x94AE;</p>
<p><span class="img-wrap"><img data-src="/img/bVbbdAB?w=336&amp;h=95" src="https://static.alili.tech/img/bVbbdAB?w=336&amp;h=95" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor: pointer; display: inline;"></span></p>
<p>&#x5728;&#x7EC4;&#x4EF6;&#x6587;&#x4EF6;&#x65B0;&#x5EFA;&#x4E00;&#x4E2A;vueTabBar.vue</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
  &lt;section class=&quot;tabBar-wrap&quot;&gt;
    &lt;article class=&quot;tabBar-box&quot;&gt;
      &lt;ul class=&quot;tabBar-nav&quot; v-if=&quot;navList.length &gt; 0&quot;&gt;
        &lt;li class=&quot;item&quot; v-for=&quot;(item, index) in navList&quot;
            @click=&quot;selectNavItem(index,item.pagePath)&quot;
            :key=&quot;index&quot;&gt;
          &lt;p class=&quot;item-images&quot;&gt;
            &lt;img :src=&quot;selectNavIndex === index ? item.selectedIconPath : item.iconPath&quot; alt=&quot;iconPath&quot;&gt;
          &lt;/p&gt;
          &lt;p :class=&quot;selectNavIndex === index ? &apos;item-text item-text-active&apos; : &apos;item-text&apos; &quot;&gt;
            "{{"item.text"}}"
          &lt;/p&gt;
        &lt;/li&gt;
        &lt;li v-if=&quot;needButton&quot; style=&quot;flex: 3&quot;&gt;
          &lt;div class=&quot;submit-box&quot;&gt;
            &lt;button :disabled=&quot;!handButton&quot;
                    @click=&quot;bindNavigateTo(&apos;../order/main&apos;)&quot;
                    :class=&quot;handButton ? &apos;submit-box-btn submit-box-btn-active&apos; : &apos;submit-box-btn&apos; &quot;&gt;
              "{{" btnText "}}"
            &lt;/button&gt;
          &lt;/div&gt;
        &lt;/li&gt;
      &lt;/ul&gt;
    &lt;/article&gt;
  &lt;/section&gt;
&lt;/template&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">section</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;tabBar-wrap&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">article</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;tabBar-box&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;tabBar-nav&quot;</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">&quot;navList.length &gt; 0&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;item&quot;</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">&quot;(item, index) in navList&quot;</span>
            @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;selectNavItem(index,item.pagePath)&quot;</span>
            <span class="hljs-attr">:key</span>=<span class="hljs-string">&quot;index&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;item-images&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">&quot;selectNavIndex === index ? item.selectedIconPath : item.iconPath&quot;</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">&quot;iconPath&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">&quot;selectNavIndex === index ? &apos;item-text item-text-active&apos; : &apos;item-text&apos; &quot;</span>&gt;</span>
            </span><span class="hljs-template-variable">"{{"item.text"}}"</span><span class="xml">
          <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">&quot;needButton&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;flex: 3&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;submit-box&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">:disabled</span>=<span class="hljs-string">&quot;!handButton&quot;</span>
                    @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;bindNavigateTo(&apos;../order/main&apos;)&quot;</span>
                    <span class="hljs-attr">:class</span>=<span class="hljs-string">&quot;handButton ? &apos;submit-box-btn submit-box-btn-active&apos; : &apos;submit-box-btn&apos; &quot;</span>&gt;</span>
              </span><span class="hljs-template-variable">"{{" btnText "}}"</span><span class="xml">
            <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">article</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></span></code></pre>
<h4>js&#x5904;&#x7406;</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script&gt;
  import store from &apos;../vuex/index&apos;

  export default {
    props: [&apos;selectNavIndex&apos;, &apos;needButton&apos;, &apos;handButton&apos;, &apos;btnText&apos;],
    data() {
      return {
        navList: [
          {
            pagePath: &quot;../index/main&quot;,
            iconPath: &quot;/static/images/index-default.png&quot;,
            selectedIconPath: &quot;/static/images/index-active.png&quot;,
            text: &quot;&#x9996;&#x9875;&quot;
          },
          {
            pagePath: &quot;../orderList/main&quot;,
            iconPath: &quot;/static/images/order-default.png&quot;,
            selectedIconPath: &quot;/static/images/order-active.png&quot;,
            text: &quot;&#x8BA2;&#x5355;&quot;
          },
          {
            pagePath: &quot;../notice/main&quot;,
            iconPath: &quot;/static/images/icon-notice-default.png&quot;,
            selectedIconPath: &quot;/static/images/icon-notice-active.png&quot;,
            text: &quot;&#x9884;&#x544A;&quot;
          },
          {
            pagePath: &quot;../user/main&quot;,
            iconPath: &quot;/static/images/person-default.png&quot;,
            selectedIconPath: &quot;/static/images/person-active.png&quot;,
            text: &quot;&#x4E2A;&#x4EBA;&quot;
          }
        ],
      }
    },
    created() {
    },
    methods: {
      /**
       * &#x70B9;&#x51FB;&#x5BFC;&#x822A;&#x680F;
       * @param index
       */
      selectNavItem(index, pagePath) {
        console.log(this.selectNavIndex)

        if (index === this.selectNavIndex) {
          return false;
        }


        if (index == 0 &amp;&amp; this.selectNavIndex == -1) {
          this.$emit(&quot;fetch-index&quot;);
        }
        this.bindViewTap(pagePath);
      },

      /**
       * &#x8DEF;&#x7531;&#x8DF3;&#x8F6C;
       */
      bindNavigateTo(url) {
        wx.navigateTo({
          url
        })
      },

      /**
       * tabBar&#x8DEF;&#x7531;&#x8DF3;&#x8F6C;
       */
      bindViewTap(url) {
        // &#x56DE;&#x5230;&#x9876;&#x90E8;
        if (url === &apos;../index/main&apos;) {
          store.commit(&apos;setGroupsID&apos;, &apos;&apos;);
        }
        wx.switchTab({
          url,
        })
      },
    }
  }
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;script&gt;
  <span class="hljs-keyword">import</span> store <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;../vuex/index&apos;</span>

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">props</span>: [<span class="hljs-string">&apos;selectNavIndex&apos;</span>, <span class="hljs-string">&apos;needButton&apos;</span>, <span class="hljs-string">&apos;handButton&apos;</span>, <span class="hljs-string">&apos;btnText&apos;</span>],
    data() {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">navList</span>: [
          {
            <span class="hljs-attr">pagePath</span>: <span class="hljs-string">&quot;../index/main&quot;</span>,
            <span class="hljs-attr">iconPath</span>: <span class="hljs-string">&quot;/static/images/index-default.png&quot;</span>,
            <span class="hljs-attr">selectedIconPath</span>: <span class="hljs-string">&quot;/static/images/index-active.png&quot;</span>,
            <span class="hljs-attr">text</span>: <span class="hljs-string">&quot;&#x9996;&#x9875;&quot;</span>
          },
          {
            <span class="hljs-attr">pagePath</span>: <span class="hljs-string">&quot;../orderList/main&quot;</span>,
            <span class="hljs-attr">iconPath</span>: <span class="hljs-string">&quot;/static/images/order-default.png&quot;</span>,
            <span class="hljs-attr">selectedIconPath</span>: <span class="hljs-string">&quot;/static/images/order-active.png&quot;</span>,
            <span class="hljs-attr">text</span>: <span class="hljs-string">&quot;&#x8BA2;&#x5355;&quot;</span>
          },
          {
            <span class="hljs-attr">pagePath</span>: <span class="hljs-string">&quot;../notice/main&quot;</span>,
            <span class="hljs-attr">iconPath</span>: <span class="hljs-string">&quot;/static/images/icon-notice-default.png&quot;</span>,
            <span class="hljs-attr">selectedIconPath</span>: <span class="hljs-string">&quot;/static/images/icon-notice-active.png&quot;</span>,
            <span class="hljs-attr">text</span>: <span class="hljs-string">&quot;&#x9884;&#x544A;&quot;</span>
          },
          {
            <span class="hljs-attr">pagePath</span>: <span class="hljs-string">&quot;../user/main&quot;</span>,
            <span class="hljs-attr">iconPath</span>: <span class="hljs-string">&quot;/static/images/person-default.png&quot;</span>,
            <span class="hljs-attr">selectedIconPath</span>: <span class="hljs-string">&quot;/static/images/person-active.png&quot;</span>,
            <span class="hljs-attr">text</span>: <span class="hljs-string">&quot;&#x4E2A;&#x4EBA;&quot;</span>
          }
        ],
      }
    },
    created() {
    },
    <span class="hljs-attr">methods</span>: {
      <span class="hljs-comment">/**
       * &#x70B9;&#x51FB;&#x5BFC;&#x822A;&#x680F;
       * @param index
       */</span>
      selectNavItem(index, pagePath) {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.selectNavIndex)

        <span class="hljs-keyword">if</span> (index === <span class="hljs-keyword">this</span>.selectNavIndex) {
          <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
        }


        <span class="hljs-keyword">if</span> (index == <span class="hljs-number">0</span> &amp;&amp; <span class="hljs-keyword">this</span>.selectNavIndex == <span class="hljs-number">-1</span>) {
          <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">&quot;fetch-index&quot;</span>);
        }
        <span class="hljs-keyword">this</span>.bindViewTap(pagePath);
      },

      <span class="hljs-comment">/**
       * &#x8DEF;&#x7531;&#x8DF3;&#x8F6C;
       */</span>
      bindNavigateTo(url) {
        wx.navigateTo({
          url
        })
      },

      <span class="hljs-comment">/**
       * tabBar&#x8DEF;&#x7531;&#x8DF3;&#x8F6C;
       */</span>
      bindViewTap(url) {
        <span class="hljs-comment">// &#x56DE;&#x5230;&#x9876;&#x90E8;</span>
        <span class="hljs-keyword">if</span> (url === <span class="hljs-string">&apos;../index/main&apos;</span>) {
          store.commit(<span class="hljs-string">&apos;setGroupsID&apos;</span>, <span class="hljs-string">&apos;&apos;</span>);
        }
        wx.switchTab({
          url,
        })
      },
    }
  }
&lt;<span class="hljs-regexp">/script&gt;</span></code></pre>
<h4>css</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;style lang=&quot;less&quot; scoped&gt;
  .tabBar-box {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 80px;
    padding: 20px 0;
    border-top: 1px solid #eee;
    background-color: #f8f8f8;
  }

  .tabBar-nav {
    width: 100%;
    display: flex;

    .item {
      flex: 1;
      text-align: center;
    }
    .item-text {
      color: #666;
      font-size: 28px;
      transition: .24s linear;
    }
    .item-text-active {
      color: #27a79a;
    }

    .item-images {
      width: 48px;
      height: 48px;
      margin: 0 auto;
      text-align: center;
      transition: .24s linear;

      &amp; img {
        display: inline;
        width: 100%;
        height: 100%;
      }
    }
  }

  .submit-box-btn {
    position: relative;
    z-index: 999;
    width: 85%;
    height: 90px;
    line-height: 90px;
    border-radius: 10px;
    color: #404040;
    font-size: 36px;
    border: none;
    background-color: #eee;
    text-align: center;
    border: 1px solid #eee;
  }

  .submit-box-btn-active {
    color: #fff;
    border: none;
    border: 1px solid #ff6c00;
    background-color: #ff6c00;
  }

  button {
    border: none;
    outline: none;
  }
&lt;/style&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css">&lt;<span class="hljs-selector-tag">style</span> <span class="hljs-selector-tag">lang</span>=&quot;<span class="hljs-selector-tag">less</span>&quot; <span class="hljs-selector-tag">scoped</span>&gt;
  <span class="hljs-selector-class">.tabBar-box</span> {
    <span class="hljs-attribute">position</span>: fixed;
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">80px</span>;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">20px</span> <span class="hljs-number">0</span>;
    <span class="hljs-attribute">border-top</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#eee</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#f8f8f8</span>;
  }

  <span class="hljs-selector-class">.tabBar-nav</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">display</span>: flex;

    .item {
      <span class="hljs-attribute">flex</span>: <span class="hljs-number">1</span>;
      <span class="hljs-attribute">text-align</span>: center;
    }
    <span class="hljs-selector-class">.item-text</span> {
      <span class="hljs-attribute">color</span>: <span class="hljs-number">#666</span>;
      <span class="hljs-attribute">font-size</span>: <span class="hljs-number">28px</span>;
      <span class="hljs-attribute">transition</span>: .<span class="hljs-number">24s</span> linear;
    }
    <span class="hljs-selector-class">.item-text-active</span> {
      <span class="hljs-attribute">color</span>: <span class="hljs-number">#27a79a</span>;
    }

    <span class="hljs-selector-class">.item-images</span> {
      <span class="hljs-attribute">width</span>: <span class="hljs-number">48px</span>;
      <span class="hljs-attribute">height</span>: <span class="hljs-number">48px</span>;
      <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
      <span class="hljs-attribute">text-align</span>: center;
      <span class="hljs-attribute">transition</span>: .<span class="hljs-number">24s</span> linear;

      &amp; img {
        <span class="hljs-attribute">display</span>: inline;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
      }
    }
  }

  <span class="hljs-selector-class">.submit-box-btn</span> {
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">z-index</span>: <span class="hljs-number">999</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">85%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">90px</span>;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">90px</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#404040</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">36px</span>;
    <span class="hljs-attribute">border</span>: none;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#eee</span>;
    <span class="hljs-attribute">text-align</span>: center;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#eee</span>;
  }

  <span class="hljs-selector-class">.submit-box-btn-active</span> {
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
    <span class="hljs-attribute">border</span>: none;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#ff6c00</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#ff6c00</span>;
  }

  <span class="hljs-selector-tag">button</span> {
    <span class="hljs-attribute">border</span>: none;
    <span class="hljs-attribute">outline</span>: none;
  }
&lt;/<span class="hljs-selector-tag">style</span>&gt;</code></pre>
<h4>&#x7279;&#x522B;&#x8BF4;&#x660E;&#xFF1A;&#x4F60;copy&#x4E0B;&#x62C9;&#xFF0C;icon&#x56FE;&#x7247;&#x4F60;&#x786E;&#x5B9A;&#x8DEF;&#x5F84;&#x5BF9;&#xFF0C;&#x5EFA;&#x8BAE; 81 * 81&#xFF0C;&#x5FAE;&#x4FE1;&#x5C0F;&#x7A0B;&#x5E8F;&#x63A8;&#x8350;&#x7684;&#xFF0C;</h4>
<h4>&#x7B2C;&#x4E8C;&#xFF1A; &#x4F60;&#x5F15;&#x5165;&#x7EC4;&#x4EF6;&#x5C31;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import vueTabBar from &apos;../../components/vueTabBar&apos;

components: {
  vueTabBar
},

&lt;vue-tab-bar
  @fetch-index=&quot;clickIndexNav&quot;
  :selectNavIndex=selectNavIndex
  :needButton=&quot;needButton&quot;
  :handButton=&quot;handButton&quot;
  :btnText=&quot;btnText&quot;&gt;
&lt;/vue-tab-bar&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> vueTabBar <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;../../components/vueTabBar&apos;</span>

components: {
  vueTabBar
},

&lt;vue-tab-bar
  @fetch-index=<span class="hljs-string">&quot;clickIndexNav&quot;</span>
  :selectNavIndex=selectNavIndex
  :needButton=<span class="hljs-string">&quot;needButton&quot;</span>
  :handButton=<span class="hljs-string">&quot;handButton&quot;</span>
  :btnText=<span class="hljs-string">&quot;btnText&quot;</span>&gt;
<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">vue-tab-bar</span>&gt;</span></span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="selectNavIndex: &#x662F;&#x9700;&#x8981;&#x9AD8;&#x4EAE;&#x7684;&#x4E0B;&#x6807;
needButton&#xFF1A; &#x662F;&#x5426;&#x663E;&#x793A;&#x6DFB;&#x52A0;&#x7684;&#x6309;&#x94AE;&#xFF08;&#x770B;&#x6548;&#x679C;&#x56FE;&#xFF0C;&#x5C31;&#x662F;&#x6709;&#x989C;&#x8272;&#x7684;&#x6309;&#x94AE;&#xFF09;
handButton&#xFF1A;&#x63A7;&#x5236;&#x6709;&#x989C;&#x8272;&#x7684;&#x6309;&#x94AE;&#x65B9;&#x6CD5;
btnText&#xFF1A; &#x6309;&#x94AE;&#x6587;&#x5B57;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">selectNavIndex: &#x662F;&#x9700;&#x8981;&#x9AD8;&#x4EAE;&#x7684;&#x4E0B;&#x6807;
needButton&#xFF1A; &#x662F;&#x5426;&#x663E;&#x793A;&#x6DFB;&#x52A0;&#x7684;&#x6309;&#x94AE;&#xFF08;&#x770B;&#x6548;&#x679C;&#x56FE;&#xFF0C;&#x5C31;&#x662F;&#x6709;&#x989C;&#x8272;&#x7684;&#x6309;&#x94AE;&#xFF09;
handButton&#xFF1A;&#x63A7;&#x5236;&#x6709;&#x989C;&#x8272;&#x7684;&#x6309;&#x94AE;&#x65B9;&#x6CD5;
btnText&#xFF1A; &#x6309;&#x94AE;&#x6587;&#x5B57;</code></pre>
<h4>&#x7B2C;&#x4E09;&#x4E2A;: &#x56E0;&#x4E3A;tabBar&#x4F7F;&#x7528;&#x8DF3;&#x8F6C;&#x7684;&#x65B9;&#x6CD5;&#x662F;</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="wx.switchTab({
  url,
})" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">wx.switchTab({
  url,
})</code></pre>
<h4>&#x6211;&#x5728;&#x5168;&#x90E8;&#x7684;main.js windo&#x4E00;&#x6837;&#x662F;&#x914D;&#x7F6E;tabBar&#x7684;</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="tabBar: {
  &quot;list&quot;: [
    {
      pagePath: &quot;pages/index/main&quot;,
      iconPath: &quot;/static/images/index-default.png&quot;,
      selectedIconPath: &quot;/static/images/index-active.png&quot;,
      text: &quot;&#x9996;&#x9875;&quot;
    },
    {
      pagePath: &quot;pages/orderList/main&quot;,
      iconPath: &quot;/static/images/order-default.png&quot;,
      selectedIconPath: &quot;/static/images/order-active.png&quot;,
      text: &quot;&#x8BA2;&#x5355;&quot;
    },
    {
      pagePath: &quot;pages/notice/main&quot;,
      iconPath: &quot;/static/images/icon-notice-default.png&quot;,
      selectedIconPath: &quot;/static/images/icon-notice-active.png&quot;,
      text: &quot;&#x9884;&#x544A;&quot;
    },
    {
      pagePath: &quot;pages/user/main&quot;,
      iconPath: &quot;/static/images/person-default.png&quot;,
      selectedIconPath: &quot;/static/images/person-active.png&quot;,
      text: &quot;&#x4E2A;&#x4EBA;&quot;
    }
  ],
}
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-symbol">tabBar:</span> {
  <span class="hljs-string">&quot;list&quot;</span>: [
    {
<span class="hljs-symbol">      pagePath:</span> <span class="hljs-string">&quot;pages/index/main&quot;</span>,
<span class="hljs-symbol">      iconPath:</span> <span class="hljs-string">&quot;/static/images/index-default.png&quot;</span>,
<span class="hljs-symbol">      selectedIconPath:</span> <span class="hljs-string">&quot;/static/images/index-active.png&quot;</span>,
<span class="hljs-symbol">      text:</span> <span class="hljs-string">&quot;&#x9996;&#x9875;&quot;</span>
    },
    {
<span class="hljs-symbol">      pagePath:</span> <span class="hljs-string">&quot;pages/orderList/main&quot;</span>,
<span class="hljs-symbol">      iconPath:</span> <span class="hljs-string">&quot;/static/images/order-default.png&quot;</span>,
<span class="hljs-symbol">      selectedIconPath:</span> <span class="hljs-string">&quot;/static/images/order-active.png&quot;</span>,
<span class="hljs-symbol">      text:</span> <span class="hljs-string">&quot;&#x8BA2;&#x5355;&quot;</span>
    },
    {
<span class="hljs-symbol">      pagePath:</span> <span class="hljs-string">&quot;pages/notice/main&quot;</span>,
<span class="hljs-symbol">      iconPath:</span> <span class="hljs-string">&quot;/static/images/icon-notice-default.png&quot;</span>,
<span class="hljs-symbol">      selectedIconPath:</span> <span class="hljs-string">&quot;/static/images/icon-notice-active.png&quot;</span>,
<span class="hljs-symbol">      text:</span> <span class="hljs-string">&quot;&#x9884;&#x544A;&quot;</span>
    },
    {
<span class="hljs-symbol">      pagePath:</span> <span class="hljs-string">&quot;pages/user/main&quot;</span>,
<span class="hljs-symbol">      iconPath:</span> <span class="hljs-string">&quot;/static/images/person-default.png&quot;</span>,
<span class="hljs-symbol">      selectedIconPath:</span> <span class="hljs-string">&quot;/static/images/person-active.png&quot;</span>,
<span class="hljs-symbol">      text:</span> <span class="hljs-string">&quot;&#x4E2A;&#x4EBA;&quot;</span>
    }
  ],
}
</code></pre>
<h4>&#x4E00;&#x5B9A;&#x8981;&#x8BB0;&#x4F4F;&#x5728;onSow&#x7684;&#x65B9;&#x6CD5;&#x8981;&#x9690;&#x85CF;&#x6389;&#x539F;&#x751F;&#x7684;tabBar,</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="wx.hideTabBar()" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">wx.hideTabBar()</code></pre>
<h4>&#x8FD9;&#x6837;&#x53EF;&#x4EE5;&#x8FBE;&#x5230;&#x539F;&#x751F;&#x7684;99%&#xFF0C;&#x81F3;&#x5C11;&#x4E0D;&#x7528;navigateTo&#xFF0C;&#x6709;&#x8FD4;&#x56DE;&#x952E;&#xFF0C;&#x4F53;&#x9A8C;&#x5EA6;&#x5F88;&#x5DEE;&#xFF0C;&#x559C;&#x6B22;&#x7684;&#x53BB;&#x6211;&#x7684;GitHub&#xFF0C;thanks!</h4>
<p>&#x6211;&#x7684;GitHub&#x535A;&#x5BA2;&#xFF0C;&#x5F88;&#x591A;&#x5185;&#x5BB9;&#x53EF;&#x4EE5;&#x770B;&#xFF0C;&#x559C;&#x6B22;&#x7684;&#x7ED9;&#x661F;&#x661F;&#x54E6; <a href="https://github.com/liangfengbo/frontend" rel="nofollow noreferrer" target="_blank">https://github.com/liangfengbo/frontend</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
mpvue 小程序如何自定义tabBar，不使用navigateTo跳转，模拟redirectTo跳转

## 原文链接
[https://segmentfault.com/a/1190000015027980](https://segmentfault.com/a/1190000015027980)

