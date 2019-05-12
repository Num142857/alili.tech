---
title: '1-vuejs2.0实战：仿豆瓣app项目，创建自定义组件tabbar' 
date: 2019-01-26 2:30:18
hidden: true
slug: t61hviqrk8g
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>大家好，我给大家分享一下仿豆瓣app的教程。当然了，我们不是用原生去实现，而是用前端框架vuejs来实现豆瓣app。————第一次写文章，写得不好请见谅。</p></blockquote>
<p><strong>为什么我们选择豆瓣app 来做这样一个教程？</strong></p>
<blockquote><p>是因为我很早就接触豆瓣这个网站，我比较喜欢看豆瓣里面电影和文章的点评。并且豆瓣提供了非常丰富的一个api接口供我们使用。也就是说我们可以不通过后端，直接通过前端ajax来获取电影和图书的数据，来组装我们app。</p></blockquote>
<p>我们可以看一下豆瓣app首页是一个什么样子   gif</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008473747" src="https://static.alili.tech/img/remote/1460000008473747" alt="Paste_Image.png" title="Paste_Image.png" style="cursor: pointer; display: inline;"></span></p>
<p>以上就是豆瓣app的一个截图。</p>
<p><strong>我们先来分析一下</strong></p>
<blockquote><p>首页分为四个部分。第一个就是顶部的搜索框。搜索框下面就是一个banner图切换。在下面就是一些热点的文章列表。最底部就是一个tab切换。在这篇教程中，我们通过vue的组件来实现这样一个首页的布局。</p></blockquote>
<ul><li><ul><li><ul><li><ul><li><p>*<br><strong>创建豆瓣项目</strong></p></li></ul></li></ul></li></ul></li></ul>
<p>我们可以通过官方vue-cli初始化项目,这里我们采用webpack示例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vue init webpack douban" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">vue init webpack douban</span></code></pre>
<p>填写项目描述，作者，安装vue-router</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="? Project name douban
? Project description douban
? Author afei
? Vue build standalone
? Install vue-router? Yes
? Use ESLint to lint your code? No
? Setup unit tests with Karma + Mocha? No
? Setup e2e tests with Nightwatch? No

   vue-cli · Generated &quot;douban&quot;.

   To get started:

     cd douban
     npm install
     npm run dev

   Documentation can be found at https://vuejs-templates.github.io/webpack" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>? Project name douban
? Project description douban
? Author afei
? Vue build standalone
? <span class="hljs-keyword">Install</span> vue-router? Yes
? <span class="hljs-keyword">Use</span> ESLint <span class="hljs-keyword">to</span> lint your code? <span class="hljs-keyword">No</span>
? Setup unit tests <span class="hljs-keyword">with</span> Karma + Mocha? <span class="hljs-keyword">No</span>
? Setup e2e tests <span class="hljs-keyword">with</span> Nightwatch? <span class="hljs-keyword">No</span>

   vue-cli · <span class="hljs-keyword">Generated</span> <span class="hljs-string">"douban"</span>.

   <span class="hljs-keyword">To</span> <span class="hljs-keyword">get</span> started:

     cd douban
     npm <span class="hljs-keyword">install</span>
     npm run dev

   Documentation can be <span class="hljs-keyword">found</span> <span class="hljs-keyword">at</span> https://vuejs-templates.github.io/webpack</code></pre>
<p>初始化后，通过npm install安装依赖</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd douban
npm install" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code><span class="hljs-built_in">cd</span> douban
npm install</code></pre>
<p>运行项目,可以看到基于官方vue-cli的模版就创建好了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">run</span><span class="bash"> dev</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008473748" src="https://static.alili.tech/img/remote/1460000008473748" alt="Paste_Image.png" title="Paste_Image.png" style="cursor: pointer;"></span></p>
<p>将所需要用的资源，拷贝到项目中，这里我通过解压豆瓣app获得他的一些图片素材，拷入到src/assets/images目录里。</p>
<p>css这里我用到了normaliz.css</p>
<p>在src下，新建了一个pages目录，存放每一个页面组件，可以看一下我们的目录</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008473749" src="https://static.alili.tech/img/remote/1460000008473749" alt="Paste_Image.png" title="Paste_Image.png" style="cursor: pointer;"></span></p>
<p>由于我们的首页更改了位置，所以在router里面的index.js需要更改为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import Router from 'vue-router'
import Index from '../pages/Index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    }
  ]
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Router <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>
<span class="hljs-keyword">import</span> Index <span class="hljs-keyword">from</span> <span class="hljs-string">'../pages/Index'</span>

Vue.use(Router)

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Router({
  routes: [
    {
      path: <span class="hljs-string">'/'</span>,
      name: <span class="hljs-string">'Index'</span>,
      component: Index
    }
  ]
})
</code></pre>
<p>每一个组件的css我们通过less来编写，所有需要通过npm安装less插件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install less less-loader --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> <span class="hljs-keyword">less</span> <span class="hljs-keyword">less</span>-loader <span class="hljs-comment">--save</span></code></pre>
<p>使用less预处理器需要在页面添加 lang='less'</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style scoped lang=&quot;less&quot;>
    
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"less"</span>&gt;</span><span class="undefined">
    
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p><strong>第一个组件 tabbar</strong></p>
<p>如何创建自定义组件tabbar，也就是豆瓣app底部的工具栏。这里的结构我们参考了<a href="https://github.com/ElemeFE/mint-ui" rel="nofollow noreferrer" target="_blank">mint-ui</a></p>
<p>这是我们将要实现的效果图。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008473750" src="https://static.alili.tech/img/remote/1460000008473750" alt="Paste_Image.png" title="Paste_Image.png" style="cursor: pointer; display: inline;"></span></p>
<p>我们先来分析一下这个组件的结构。</p>
<p>这个组件分为两部分：第一个是组件的外层容器，第二个是组件的子容器item，子组件里面又分为图片和文字组合。子组件有2个状态，一个默认灰色的状态，一个选中状态，我们来实现一下这个组件的布局。在index.vue里面</p>
<p>template</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;m-tabbar&quot;>
  <a class=&quot;m-tabbar-item is-active&quot;>
    <span class=&quot;m-tabbar-item-icon&quot;>
       < img src=&quot;../assets/images/ic_tab_home_normal.png&quot; alt=&quot;&quot;>
    </span> 
    <span class=&quot;m-tabbar-item-text&quot;>  
          首页
    </span>
  </a> 
  <a class=&quot;m-tabbar-item&quot;>
    <span class=&quot;m-tabbar-item-icon&quot;>
       < img src=&quot;../assets/images/ic_tab_subject_normal.png&quot; alt=&quot;&quot;>
    </span> 
    <span class=&quot;m-tabbar-item-text&quot;>  
          书影音
    </span>
  </a> 
  <a class=&quot;m-tabbar-item&quot;>
    <span class=&quot;m-tabbar-item-icon&quot;>
       < img src=&quot;../assets/images/ic_tab_status_normal.png&quot; alt=&quot;&quot;>
    </span> 
    <span class=&quot;m-tabbar-item-text&quot;>  
          广播
    </span>
  </a> 
  <a class=&quot;m-tabbar-item&quot;>
    <span class=&quot;m-tabbar-item-icon&quot;>
       < img src=&quot;../assets/images/ic_tab_group_normal.png&quot; alt=&quot;&quot;>
    </span> 
    <span class=&quot;m-tabbar-item-text&quot;>  
          小组
    </span>
  </a> 
  <a class=&quot;m-tabbar-item&quot;>
    <span class=&quot;m-tabbar-item-icon&quot;>
       < img src=&quot;../assets/images/ic_tab_profile_normal.png&quot; alt=&quot;&quot;>
    </span> 
    <span class=&quot;m-tabbar-item-text&quot;>  
          我的
    </span>
  </a> 
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"m-tabbar"</span>&gt;
  &lt;<span class="hljs-selector-tag">a</span> class=<span class="hljs-string">"m-tabbar-item is-active"</span>&gt;
    &lt;<span class="hljs-selector-tag">span</span> class=<span class="hljs-string">"m-tabbar-item-icon"</span>&gt;
       &lt; <span class="hljs-selector-tag">img</span> src=<span class="hljs-string">"../assets/images/ic_tab_home_normal.png"</span> alt=<span class="hljs-string">""</span>&gt;
    &lt;/span&gt; 
    &lt;<span class="hljs-selector-tag">span</span> class=<span class="hljs-string">"m-tabbar-item-text"</span>&gt;  
          首页
    &lt;/span&gt;
  &lt;/a&gt; 
  &lt;<span class="hljs-selector-tag">a</span> class=<span class="hljs-string">"m-tabbar-item"</span>&gt;
    &lt;<span class="hljs-selector-tag">span</span> class=<span class="hljs-string">"m-tabbar-item-icon"</span>&gt;
       &lt; <span class="hljs-selector-tag">img</span> src=<span class="hljs-string">"../assets/images/ic_tab_subject_normal.png"</span> alt=<span class="hljs-string">""</span>&gt;
    &lt;/span&gt; 
    &lt;<span class="hljs-selector-tag">span</span> class=<span class="hljs-string">"m-tabbar-item-text"</span>&gt;  
          书影音
    &lt;/span&gt;
  &lt;/a&gt; 
  &lt;<span class="hljs-selector-tag">a</span> class=<span class="hljs-string">"m-tabbar-item"</span>&gt;
    &lt;<span class="hljs-selector-tag">span</span> class=<span class="hljs-string">"m-tabbar-item-icon"</span>&gt;
       &lt; <span class="hljs-selector-tag">img</span> src=<span class="hljs-string">"../assets/images/ic_tab_status_normal.png"</span> alt=<span class="hljs-string">""</span>&gt;
    &lt;/span&gt; 
    &lt;<span class="hljs-selector-tag">span</span> class=<span class="hljs-string">"m-tabbar-item-text"</span>&gt;  
          广播
    &lt;/span&gt;
  &lt;/a&gt; 
  &lt;<span class="hljs-selector-tag">a</span> class=<span class="hljs-string">"m-tabbar-item"</span>&gt;
    &lt;<span class="hljs-selector-tag">span</span> class=<span class="hljs-string">"m-tabbar-item-icon"</span>&gt;
       &lt; <span class="hljs-selector-tag">img</span> src=<span class="hljs-string">"../assets/images/ic_tab_group_normal.png"</span> alt=<span class="hljs-string">""</span>&gt;
    &lt;/span&gt; 
    &lt;<span class="hljs-selector-tag">span</span> class=<span class="hljs-string">"m-tabbar-item-text"</span>&gt;  
          小组
    &lt;/span&gt;
  &lt;/a&gt; 
  &lt;<span class="hljs-selector-tag">a</span> class=<span class="hljs-string">"m-tabbar-item"</span>&gt;
    &lt;<span class="hljs-selector-tag">span</span> class=<span class="hljs-string">"m-tabbar-item-icon"</span>&gt;
       &lt; <span class="hljs-selector-tag">img</span> src=<span class="hljs-string">"../assets/images/ic_tab_profile_normal.png"</span> alt=<span class="hljs-string">""</span>&gt;
    &lt;/span&gt; 
    &lt;<span class="hljs-selector-tag">span</span> class=<span class="hljs-string">"m-tabbar-item-text"</span>&gt;  
          我的
    &lt;/span&gt;
  &lt;/a&gt; 
&lt;/div&gt;</code></pre>
<p>style</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style lang=&quot;less&quot;>
.m-tabbar{
    display: flex;
    flex-direction: row;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    overflow: hidden;
    height: 50px;
    background: #fff;
    border-top: 1px solid #e4e4e4;
    
    .m-tabbar-item{
      flex: 1;
      text-align: center;
      .m-tabbar-item-icon{
          display: block;
          padding-top: 2px;
          img{
              width: 28px;
              height: 28px;
          }
      }
      .m-tabbar-item-text{
          display: block;
          font-size: 10px;
          color:#949494;
      }
      &amp;.is-active{
          .m-tabbar-item-text{
              color: #42bd56;
          }
      }
  }
}
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;style lang=<span class="hljs-string">"less"</span>&gt;
.m-tabbar{
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">flex-direction</span>: row;
    <span class="hljs-attribute">position</span>: fixed;
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">overflow</span>: hidden;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#fff</span>;
    <span class="hljs-attribute">border-top</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#e4e4e4</span>;
    
    .m-tabbar-item{
      <span class="hljs-attribute">flex</span>: <span class="hljs-number">1</span>;
      <span class="hljs-attribute">text-align</span>: center;
      .m-tabbar-item-<span class="hljs-attribute">icon</span>{
          <span class="hljs-attribute">display</span>: block;
          <span class="hljs-attribute">padding-top</span>: <span class="hljs-number">2px</span>;
          img{
              <span class="hljs-attribute">width</span>: <span class="hljs-number">28px</span>;
              <span class="hljs-attribute">height</span>: <span class="hljs-number">28px</span>;
          }
      }
      .m-tabbar-item-text{
          <span class="hljs-attribute">display</span>: block;
          <span class="hljs-attribute">font-size</span>: <span class="hljs-number">10px</span>;
          <span class="hljs-attribute">color</span>:<span class="hljs-number">#949494</span>;
      }
      &amp;.is-active{
          .m-tabbar-item-text{
              <span class="hljs-attribute">color</span>: <span class="hljs-number">#42bd56</span>;
          }
      }
  }
}
&lt;/style&gt;</code></pre>
<p>布局大功告成~~~~</p>
<p>前面我们说的是，通过组件的方式来实现这个app。</p>
<p>如果像上面代码这样的话肯定是不行的！既然我们大体布局已经写好了，现在就可以通过组件的方式来调用。当然我们还要改造一下代码。</p>
<p>先在components文件夹下面，新建两个组件，通过这两个组件来组合实现我们底部的tab组件：</p>
<p><strong>一个是tabbar-item.vue，实现子组件的item项，</strong></p>
<p><strong>tabbar-item.vue</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <a class=&quot;m-tabbar-item&quot; >
        <span class=&quot;m-tabbar-item-icon&quot;><slot name=&quot;icon-normal&quot;></slot></span>
        <span class=&quot;m-tabbar-item-text&quot;><slot></slot></span>
    </a>
</template>

<style lang=&quot;less&quot;>
.m-tabbar-item{
    flex: 1;
    text-align: center;
    .m-tabbar-item-icon{
        display: block;
        padding-top: 2px;
        img{
            width: 28px;
            height: 28px;
        }

    }
    .m-tabbar-item-text{
        display: block;
        font-size: 10px;
        color:#949494;
    }
    &amp;.is-active{
        .m-tabbar-item-text{
            color: #42bd56;
        }
    }
}
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;template&gt;
    &lt;<span class="hljs-selector-tag">a</span> class=<span class="hljs-string">"m-tabbar-item"</span> &gt;
        &lt;<span class="hljs-selector-tag">span</span> class=<span class="hljs-string">"m-tabbar-item-icon"</span>&gt;&lt;slot name=<span class="hljs-string">"icon-normal"</span>&gt;&lt;/slot&gt;&lt;/span&gt;
        &lt;<span class="hljs-selector-tag">span</span> class=<span class="hljs-string">"m-tabbar-item-text"</span>&gt;&lt;slot&gt;&lt;/slot&gt;&lt;/span&gt;
    &lt;/a&gt;
&lt;/template&gt;

&lt;style lang=<span class="hljs-string">"less"</span>&gt;
.m-tabbar-item{
    <span class="hljs-attribute">flex</span>: <span class="hljs-number">1</span>;
    <span class="hljs-attribute">text-align</span>: center;
    .m-tabbar-item-<span class="hljs-attribute">icon</span>{
        <span class="hljs-attribute">display</span>: block;
        <span class="hljs-attribute">padding-top</span>: <span class="hljs-number">2px</span>;
        img{
            <span class="hljs-attribute">width</span>: <span class="hljs-number">28px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">28px</span>;
        }

    }
    .m-tabbar-item-text{
        <span class="hljs-attribute">display</span>: block;
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">10px</span>;
        <span class="hljs-attribute">color</span>:<span class="hljs-number">#949494</span>;
    }
    &amp;.is-active{
        .m-tabbar-item-text{
            <span class="hljs-attribute">color</span>: <span class="hljs-number">#42bd56</span>;
        }
    }
}
&lt;/style&gt;</code></pre>
<p><strong>一个是tabbar.vue，实现tab的外层容器，</strong></p>
<p><strong>tabbar.vue</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div class=&quot;m-tabbar&quot;>
       <slot></slot>
    </div>
</template>
<style lang=&quot;less&quot;>
.m-tabbar{
    display: flex;
    flex-direction: row;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    overflow: hidden;
    height: 50px;
    background: #fff;
    border-top: 1px solid #e4e4e4;
}
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"m-tabbar"</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">slot</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"less"</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.m-tabbar</span>{
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">flex-direction</span>: row;
    <span class="hljs-attribute">position</span>: fixed;
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">overflow</span>: hidden;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#fff</span>;
    <span class="hljs-attribute">border-top</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#e4e4e4</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>在Index.vue中组合这两个组件，实现tab组件效果</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div>
    <m-tabbar>
      <m-tabbar-item id='tab1'>
        < img src=&quot;../assets/images/ic_tab_home_normal.png&quot; alt=&quot;&quot; slot=&quot;icon-normal&quot;> 
        首页
      </m-tabbar-item>
      <m-tabbar-item id='tab2'>
        < img src=&quot;../assets/images/ic_tab_subject_normal.png&quot; alt=&quot;&quot; slot=&quot;icon-normal&quot;> 
        书影音
      </m-tabbar-item>
      <m-tabbar-item id='tab3'>
        < img src=&quot;../assets/images/ic_tab_status_normal.png&quot; alt=&quot;&quot; slot=&quot;icon-normal&quot;> 
        广播
      </m-tabbar-item>
      <m-tabbar-item id='tab4'>
        ![](../assets/images/ic_tab_group_normal.png) 
        小组
      </m-tabbar-item>
       <m-tabbar-item id='tab5'>
        < img src=&quot;../assets/images/ic_tab_profile_normal.png&quot; alt=&quot;&quot; slot=&quot;icon-normal&quot;> 
        我的
      </m-tabbar-item>
    </m-tabbar>
  </div>
</template>

<script>
  import mTabbar from '../components/tabbar'
  import mTabbarItem from '../components/tabbar-item'
  export default {
    name: 'index',
    components: {
      mTabbar,
      mTabbarItem
    }
  }
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">m-tabbar</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">m-tabbar-item</span> <span class="hljs-attr">id</span>=<span class="hljs-string">'tab1'</span>&gt;</span>
        <span class="hljs-tag">&lt; <span class="hljs-attr">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../assets/images/ic_tab_home_normal.png"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"icon-normal"</span>&gt;</span> 
        首页
      <span class="hljs-tag">&lt;/<span class="hljs-name">m-tabbar-item</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">m-tabbar-item</span> <span class="hljs-attr">id</span>=<span class="hljs-string">'tab2'</span>&gt;</span>
        <span class="hljs-tag">&lt; <span class="hljs-attr">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../assets/images/ic_tab_subject_normal.png"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"icon-normal"</span>&gt;</span> 
        书影音
      <span class="hljs-tag">&lt;/<span class="hljs-name">m-tabbar-item</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">m-tabbar-item</span> <span class="hljs-attr">id</span>=<span class="hljs-string">'tab3'</span>&gt;</span>
        <span class="hljs-tag">&lt; <span class="hljs-attr">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../assets/images/ic_tab_status_normal.png"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"icon-normal"</span>&gt;</span> 
        广播
      <span class="hljs-tag">&lt;/<span class="hljs-name">m-tabbar-item</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">m-tabbar-item</span> <span class="hljs-attr">id</span>=<span class="hljs-string">'tab4'</span>&gt;</span>
        ![](../assets/images/ic_tab_group_normal.png) 
        小组
      <span class="hljs-tag">&lt;/<span class="hljs-name">m-tabbar-item</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">m-tabbar-item</span> <span class="hljs-attr">id</span>=<span class="hljs-string">'tab5'</span>&gt;</span>
        <span class="hljs-tag">&lt; <span class="hljs-attr">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../assets/images/ic_tab_profile_normal.png"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"icon-normal"</span>&gt;</span> 
        我的
      <span class="hljs-tag">&lt;/<span class="hljs-name">m-tabbar-item</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">m-tabbar</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">import</span> mTabbar <span class="hljs-keyword">from</span> <span class="hljs-string">'../components/tabbar'</span>
  <span class="hljs-keyword">import</span> mTabbarItem <span class="hljs-keyword">from</span> <span class="hljs-string">'../components/tabbar-item'</span>
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'index'</span>,
    <span class="hljs-attr">components</span>: {
      mTabbar,
      mTabbarItem
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>完成的效果。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008473751" src="https://static.alili.tech/img/remote/1460000008473751" alt="Paste_Image.png" title="Paste_Image.png" style="cursor: pointer;"></span></p>
<ul><li><ul><li><ul><li><ul><li><p>*</p></li></ul></li></ul></li></ul></li></ul>
<p><strong>光有一个死的界面，没有点击切换的效果怎么能行？</strong></p>
<p>以下我们通过vue使用自定义事件的表单输入组件来实现点击切换的效果。</p>
<ul><li><ul><li><ul><li><ul><li><p>*</p></li></ul></li></ul></li></ul></li></ul>
<p>先给Index.vue里面的tab组件加上v-model 来进行数据双向绑定，通过select来达到选择item，在item里面再添加一个选中的active图片</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div>
    测试
    <m-tabbar v-model=&quot;select&quot;>
      <m-tabbar-item id='tab1'>
        < img src=&quot;../assets/images/ic_tab_home_normal.png&quot; alt=&quot;&quot; slot=&quot;icon-normal&quot;> 
        < img src=&quot;../assets/images/ic_tab_home_active.png&quot; alt=&quot;&quot; slot=&quot;icon-active&quot;> 
        首页
      </m-tabbar-item>
      <m-tabbar-item id='tab2'>
        < img src=&quot;../assets/images/ic_tab_subject_normal.png&quot; alt=&quot;&quot; slot=&quot;icon-normal&quot;> 
        < img src=&quot;../assets/images/ic_tab_subject_active.png&quot; alt=&quot;&quot; slot=&quot;icon-active&quot;> 
        书影音
      </m-tabbar-item>
      <m-tabbar-item id='tab3'>
        < img src=&quot;../assets/images/ic_tab_status_normal.png&quot; alt=&quot;&quot; slot=&quot;icon-normal&quot;> 
        < img src=&quot;../assets/images/ic_tab_status_active.png&quot; alt=&quot;&quot; slot=&quot;icon-active&quot;> 
        广播
      </m-tabbar-item>
      <m-tabbar-item id='tab4'>
        < img src=&quot;../assets/images/ic_tab_group_normal.png&quot; alt=&quot;&quot; slot=&quot;icon-normal&quot;> 
        < img src=&quot;../assets/images/ic_tab_group_active.png&quot; alt=&quot;&quot; slot=&quot;icon-normal&quot;> 
        小组
      </m-tabbar-item>
       <m-tabbar-item id='tab5'>
        < img src=&quot;../assets/images/ic_tab_profile_normal.png&quot; alt=&quot;&quot; slot=&quot;icon-normal&quot;> 
        < img src=&quot;../assets/images/ic_tab_profile_active.png&quot; alt=&quot;&quot; slot=&quot;icon-normal&quot;> 
        我的
      </m-tabbar-item>
    </m-tabbar>
  </div>
</template>

<script>
  import mTabbar from '../components/tabbar'
  import mTabbarItem from '../components/tabbar-item'
  export default {
    name: 'index',
    components: {
      mTabbar,
      mTabbarItem
    },
    data() {
      return {
        select:&quot;tab1&quot;
      }
    }
  }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    测试
    <span class="hljs-tag">&lt;<span class="hljs-name">m-tabbar</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"select"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">m-tabbar-item</span> <span class="hljs-attr">id</span>=<span class="hljs-string">'tab1'</span>&gt;</span>
        <span class="hljs-tag">&lt; <span class="hljs-attr">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../assets/images/ic_tab_home_normal.png"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"icon-normal"</span>&gt;</span> 
        <span class="hljs-tag">&lt; <span class="hljs-attr">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../assets/images/ic_tab_home_active.png"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"icon-active"</span>&gt;</span> 
        首页
      <span class="hljs-tag">&lt;/<span class="hljs-name">m-tabbar-item</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">m-tabbar-item</span> <span class="hljs-attr">id</span>=<span class="hljs-string">'tab2'</span>&gt;</span>
        <span class="hljs-tag">&lt; <span class="hljs-attr">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../assets/images/ic_tab_subject_normal.png"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"icon-normal"</span>&gt;</span> 
        <span class="hljs-tag">&lt; <span class="hljs-attr">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../assets/images/ic_tab_subject_active.png"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"icon-active"</span>&gt;</span> 
        书影音
      <span class="hljs-tag">&lt;/<span class="hljs-name">m-tabbar-item</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">m-tabbar-item</span> <span class="hljs-attr">id</span>=<span class="hljs-string">'tab3'</span>&gt;</span>
        <span class="hljs-tag">&lt; <span class="hljs-attr">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../assets/images/ic_tab_status_normal.png"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"icon-normal"</span>&gt;</span> 
        <span class="hljs-tag">&lt; <span class="hljs-attr">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../assets/images/ic_tab_status_active.png"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"icon-active"</span>&gt;</span> 
        广播
      <span class="hljs-tag">&lt;/<span class="hljs-name">m-tabbar-item</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">m-tabbar-item</span> <span class="hljs-attr">id</span>=<span class="hljs-string">'tab4'</span>&gt;</span>
        <span class="hljs-tag">&lt; <span class="hljs-attr">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../assets/images/ic_tab_group_normal.png"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"icon-normal"</span>&gt;</span> 
        <span class="hljs-tag">&lt; <span class="hljs-attr">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../assets/images/ic_tab_group_active.png"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"icon-normal"</span>&gt;</span> 
        小组
      <span class="hljs-tag">&lt;/<span class="hljs-name">m-tabbar-item</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">m-tabbar-item</span> <span class="hljs-attr">id</span>=<span class="hljs-string">'tab5'</span>&gt;</span>
        <span class="hljs-tag">&lt; <span class="hljs-attr">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../assets/images/ic_tab_profile_normal.png"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"icon-normal"</span>&gt;</span> 
        <span class="hljs-tag">&lt; <span class="hljs-attr">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../assets/images/ic_tab_profile_active.png"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"icon-normal"</span>&gt;</span> 
        我的
      <span class="hljs-tag">&lt;/<span class="hljs-name">m-tabbar-item</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">m-tabbar</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">import</span> mTabbar <span class="hljs-keyword">from</span> <span class="hljs-string">'../components/tabbar'</span>
  <span class="hljs-keyword">import</span> mTabbarItem <span class="hljs-keyword">from</span> <span class="hljs-string">'../components/tabbar-item'</span>
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'index'</span>,
    <span class="hljs-attr">components</span>: {
      mTabbar,
      mTabbarItem
    },
    data() {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">select</span>:<span class="hljs-string">"tab1"</span>
      }
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>tabbar.vue里面通过props来传递数据vaule</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div class=&quot;m-tabbar&quot;>
       <slot></slot>
    </div>
</template>
<script>
    import mTabbarItem from './tabbar-item';
    export default {
        props: ['value']
    }
</script>
<style lang=&quot;less&quot;>
.m-tabbar{
    display: flex;
    flex-direction: row;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    overflow: hidden;
    height: 50px;
    background: #fff;
    border-top: 1px solid #e4e4e4;
}
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"m-tabbar"</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">slot</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">import</span> mTabbarItem <span class="hljs-keyword">from</span> <span class="hljs-string">'./tabbar-item'</span>;
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-attr">props</span>: [<span class="hljs-string">'value'</span>]
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"less"</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.m-tabbar</span>{
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">flex-direction</span>: row;
    <span class="hljs-attribute">position</span>: fixed;
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">overflow</span>: hidden;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#fff</span>;
    <span class="hljs-attribute">border-top</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#e4e4e4</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>tabbar-item.vue组件：根据父组件的value和当前组件的id判断是否为选中状态,通过 $parent.$emit('input',id) - 触发父组件的自定义事件，添加选中的图片，根据isActive来显示隐藏</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <a class=&quot;m-tabbar-item&quot; :class=&quot;{'is-active':isActive}&quot; @click=&quot;$parent.$emit('input',id)&quot;>
        <span class=&quot;m-tabbar-item-icon&quot; v-show=&quot;!isActive&quot;><slot name=&quot;icon-normal&quot;></slot></span>
        <span class=&quot;m-tabbar-item-icon&quot; v-show=&quot;isActive&quot;><slot name=&quot;icon-active&quot;></slot></span>
        <span class=&quot;m-tabbar-item-text&quot;><slot></slot></span>
    </a>
</template>
<script>
    export default{
        props: ['id'],
        computed: {
           isActive(){
               if(this.$parent.value===this.id){
                   return true;
               }
           }
        }
    }
</script>
<style lang=&quot;less&quot;>
.m-tabbar-item{
    flex: 1;
    text-align: center;
    .m-tabbar-item-icon{
        display: block;
        padding-top: 2px;
        img{
            width: 28px;
            height: 28px;
        }

    }
    .m-tabbar-item-text{
        display: block;
        font-size: 10px;
        color:#949494;
    }
    &amp;.is-active{
        .m-tabbar-item-text{
            color: #42bd56;
        }
    }
}
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"m-tabbar-item"</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"{'is-active':isActive}"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"$parent.$emit('input',id)"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"m-tabbar-item-icon"</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"!isActive"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">slot</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"icon-normal"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"m-tabbar-item-icon"</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"isActive"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">slot</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"icon-active"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"m-tabbar-item-text"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">slot</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span>{
        <span class="hljs-attr">props</span>: [<span class="hljs-string">'id'</span>],
        <span class="hljs-attr">computed</span>: {
           isActive(){
               <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.$parent.value===<span class="hljs-keyword">this</span>.id){
                   <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
               }
           }
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"less"</span>&gt;</span><span class="undefined">
.m-tabbar-item{
    flex: 1;
    text-align: center;
    .m-tabbar-item-icon{
        display: block;
        padding-top: 2px;
        img{
            width: 28px;
            height: 28px;
        }

    }
    .m-tabbar-item-text{
        display: block;
        font-size: 10px;
        color:#949494;
    }
    &amp;.is-active{
        .m-tabbar-item-text{
            color: #42bd56;
        }
    }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>大功告成，tabbar组件就完成了<del>~</del></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008473752?w=650&amp;h=820" src="https://static.alili.tech/img/remote/1460000008473752?w=650&amp;h=820" alt="录像1_转.gif" title="录像1_转.gif" style="cursor: pointer; display: inline;"></span></p>
<p>感谢饿了么团队给我们带来了这么好的ui组件！</p>
<p>源码下载  链接：<a href="http://pan.baidu.com/s/1qYlR8g0" rel="nofollow noreferrer" target="_blank">http://pan.baidu.com/s/1qYlR8g0</a> 密码：9yph</p>
<p>下载安装</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install
npm run dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-built_in">npm</span> install
<span class="hljs-built_in">npm</span> run dev</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
1-vuejs2.0实战：仿豆瓣app项目，创建自定义组件tabbar

## 原文链接
[https://segmentfault.com/a/1190000008473744](https://segmentfault.com/a/1190000008473744)

