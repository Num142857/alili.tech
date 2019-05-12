---
title: 'Vue.js新手教学|如何写一个Checklist组件' 
date: 2018-12-24 2:30:07
hidden: true
slug: lnsit1golc
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000012161500?w=2400&amp;h=1294" src="https://static.alili.tech/img/remote/1460000012161500?w=2400&amp;h=1294" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><strong>建议在电脑上阅读此文，全部源代码在文章最后</strong></p>
<p><strong>2017.11.30更新：本案例有了更优雅更简单的实现方案了,可以比较看一下两种实现方式，具体请看文末源码里的checklist2.0.vue文件</strong></p>
<p>2017.11.25更新章节：0.3 规划API</p>
<p>本文教你如何写一个移动端的 Checklist 组件，使用 vue 单文件形式开发，适合 Vue.js 新手。同时此文非常长，最好跟着文章步骤边看边写。本文说些什么，或者你能收获什么？。</p>
<ol>
<li>一步步从0开始有节奏的编写 Checklist 组件</li>
<li>在编码过程中进行功能分析</li>
<li>涉及一些移动端适配的问题</li>
<li>Vue.js组件方面的一些知识</li>
</ol>
<h2 id="articleHeader0">目录</h2>
<p><a href="#">前置知识</a>  <br><a href="#">什么是Checklist</a>  <br><a href="#">第零步：分析与准备</a></p>
<ul>
<li><a href="#0.1">0.1 业务需求和功能分析</a></li>
<li><a href="#0.2">0.2 规划API</a></li>
<li><a href="#0.3">0.3 初始化项目</a></li>
</ul>
<p><a href="#">第一步：实现组件骨架和基础结构</a></p>
<ul>
<li><a href="#1.1">1.1 实现基本骨架</a></li>
<li><a href="#1.2">1.2 实现topbar</a></li>
<li><a href="#1.3">1.3 实现操作提示栏</a></li>
</ul>
<p><a href="#">第二步：实现list列表结构</a></p>
<ul>
<li><a href="#2.1">2.1 实现基本骨架</a></li>
<li><a href="#2.2">2.2 实现checkbox选框</a></li>
<li><a href="#2.3">2.3 地址信息前面的小图标</a></li>
<li><a href="#2.4">2.4 适配移动端1像素边框</a></li>
<li><a href="#2.5">2.5 列表滚动</a></li>
</ul>
<p><a href="#">第三步：实现选择CheckBox的交互功能</a></p>
<ul>
<li><a href="#3.1">3.1 实现原理与v-model</a></li>
<li><a href="#3.2">3.2 加个选中样式</a></li>
<li>
<p><a href="#3.3">3.3 最多可选择几项</a></p>
<ul>
<li><a href="#3.3.1">3.3.1 使用 props 传递数据</a></li>
<li>[3.3.2 Watch选项、$refs的使用](#3.3.2 Watch选项、$refs的使用)</li>
</ul>
</li>
</ul>
<p><a href="#">第四步：组件显示隐藏</a></p>
<ul>
<li><a href="#4.1">4.1 显示组件</a></li>
<li><a href="#4.2">4.2 隐藏组件</a></li>
<li><a href="#4.3">4.3 添加蒙层</a></li>
<li><a href="#4.4">4.4 移动端input输入框阻止弹起手机虚拟键盘</a></li>
</ul>
<p><a href="#">第五步：数据渲染和向父组件传递事件</a></p>
<ul>
<li><a href="#5.1">5.1 数据渲染</a></li>
<li><a href="#5.2">5.2 组件通信与自定义事件</a></li>
</ul>
<p><a href="#">第六步：扩展和完善</a></p>
<ul>
<li><a href="#">设置选框在左边</a></li>
<li><a href="#">还可以做点什么呢？</a></li>
</ul>
<h2 id="articleHeader1">前置知识</h2>
<p>阅读此文前您最好有以下知识的基础：</p>
<ol>
<li>对 Vue.js 的<code>.vue</code>单文件和 Vue.js 组件知识有基本的认识</li>
<li>CSS 的 Flexbox 布局知识。</li>
</ol>
<h2 id="articleHeader2">什么是Checklist</h2>
<p>什么是Checklist组件？我们先来看一下市面上已经有的UI框架的Checklist长什么样</p>
<table>
<thead><tr>
<th align="left">weui</th>
<th align="left">Mint UI</th>
</tr></thead>
<tbody><tr>
<td align="left"><span class="img-wrap"><img data-src="/img/remote/1460000012161501?w=338&amp;h=580" src="https://static.alili.tech/img/remote/1460000012161501?w=338&amp;h=580" alt="weui" title="weui" style="cursor: pointer; display: inline;"></span></td>
<td align="left"><span class="img-wrap"><img data-src="/img/remote/1460000012161502?w=338&amp;h=576" src="https://static.alili.tech/img/remote/1460000012161502?w=338&amp;h=576" alt="Mint-UI" title="Mint-UI" style="cursor: pointer;"></span></td>
</tr></tbody>
</table>
<p>而这种组件的一个典型场景是移动端的购物车列表，打开你的京东、淘宝购物车看看，功能是不是很像呢？</p>
<p>本文写一个什么样的 Checklist 组件？这个组件来自于我司真实项目，刚开始我也是用的 Mint-UI 来做，后来业务升级需求变更 Mint-UI 就不适合了，于是我就自己撸了一个，特整理出来此文，并且我们尽量把他做的通用、灵活一点。我们的 Checklist 如下：</p>
<table>
<thead><tr>
<th align="left">我们的</th>
<th align="left">京东购物车列表</th>
</tr></thead>
<tbody><tr>
<td align="left"><span class="img-wrap"><img data-src="/img/remote/1460000012161503?w=338&amp;h=576" src="https://static.alili.tech/img/remote/1460000012161503?w=338&amp;h=576" alt="我们的" title="我们的" style="cursor: pointer;"></span></td>
<td align="left"><span class="img-wrap"><img data-src="/img/bVZcNd?w=642&amp;h=1132" src="https://static.alili.tech/img/bVZcNd?w=642&amp;h=1132" alt="京东" title="京东" style="cursor: pointer;"></span></td>
</tr></tbody>
</table>
<h2 id="articleHeader3">第零步：分析与准备</h2>
<h3 id="articleHeader4">0.1 业务需求和功能分析</h3>
<p>在动手撸代码之前，我们先来仔细分析一下业务需求和功能点，这个组件是展示考场和考场地址，考场地址没有就不显示，最多选三个，选了三个后其他的要禁用等，数据是根据考试科目和所在城市动态获取，当列表数据很多我们还得给它一个最大高度让列表可滚动等，从图中得出以下功能点：</p>
<ol>
<li>显示隐藏和过渡动画</li>
<li>列表的地址一行可有可无，行高自适应</li>
<li>选中状态和禁用状态</li>
<li>选择了几个和最多选几个的提示文字（我们叫他<strong>操作提示栏</strong>吧，为了方便后面都这么叫），为了通用性，最多选几个应该做成可配置选项</li>
<li>列表可滚动以及列表最大高度，最大高度也可以做成可配置项</li>
<li>头部bar，标题、取消、确定应该也是可有可无，可做成可配置项</li>
<li>选中的项的值应该是一个数组</li>
<li>选中后点击完成按钮应该把选中的值发送给父组件</li>
<li>checkbox选框可以在左边也可以在右边</li>
</ol>
<p>等等....</p>
<h3 id="articleHeader5">0.2 规划API</h3>
<p>一个Vue组件的 API 只来自 props、events 和 slots，确定好这 3 部分的命名、规则，剩下的逻辑即使第一版没做好，后续也可以迭代完善。但是 API 如果没有设计好，后续再改对使用者成本就很大了。</p>
<p>根据以上功能分析可以初步得如下出一些 API，我们可以先把各个 API 先写到组件中（此部分内容属于新增，本文并没有先把 API 写到组件中，Props 的<code>maxHeight</code> 本文也没有实现，你们可以自己考虑实现以下）</p>
<p><strong>Props</strong></p>
<table>
<thead><tr>
<th align="left">属性名</th>
<th align="left">说明</th>
<th align="left">类型</th>
<th align="left">是否必须</th>
<th align="left">默认值</th>
</tr></thead>
<tbody>
<tr>
<td align="left">max</td>
<td align="left">最多选择几项</td>
<td align="left">Number</td>
<td align="left">是</td>
<td align="left">0</td>
</tr>
<tr>
<td align="left">dataList</td>
<td align="left">数据</td>
<td align="left">Array</td>
<td align="left">是</td>
<td align="left">[]</td>
</tr>
<tr>
<td align="left">maxHeight</td>
<td align="left">控件最大高度</td>
<td align="left">Number</td>
<td align="left">否</td>
<td align="left">300(px)</td>
</tr>
<tr>
<td align="left">checkboxLeft</td>
<td align="left">选框是否在左边</td>
<td align="left">Boolean</td>
<td align="left">否</td>
<td align="left">false</td>
</tr>
</tbody>
</table>
<p><strong>Events</strong></p>
<table>
<thead><tr>
<th align="left">事件名</th>
<th align="left">说明</th>
<th align="left">参数/返回值</th>
</tr></thead>
<tbody><tr>
<td align="left">on-change</td>
<td align="left">点击确定之后触发的事件</td>
<td align="left">Object</td>
</tr></tbody>
</table>
<p><strong>Methods</strong></p>
<table>
<thead><tr>
<th align="left">方法名</th>
<th align="left">说明</th>
</tr></thead>
<tbody>
<tr>
<td align="left">show</td>
<td align="left">显示组件</td>
</tr>
<tr>
<td align="left">hide</td>
<td align="left">隐藏组件</td>
</tr>
</tbody>
</table>
<h3 id="articleHeader6">0.3 初始化项目</h3>
<p>再来分析一下 DOM 结构该怎么划分，这样有利于编码时的大局观  <br><span class="img-wrap"><img data-src="/img/remote/1460000012669132?w=672&amp;h=1168" src="https://static.alili.tech/img/remote/1460000012669132?w=672&amp;h=1168" alt="" title="" style="cursor: pointer;"></span></p>
<p>画的有点丑，手头没有什么好用的图片标注工具，用的 Mac 原生标注工具</p>
<p>经过上面的的分析，我们就知道这个组件要做些什么了，接下来我们就开始撸代码，首先我们先把组件基本外观和架子做出来。</p>
<p>首先，我们新建一个checklist.vue文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div class=&quot;cl-checklist&quot;>
      checklist
    </div>
</template>
<script>
</script>
<style scoped>
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"cl-checklist"</span>&gt;</span>
      checklist
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="undefined">
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="undefined">
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>为了便于开发时测试和观察，我们还得建一个demo.vue文件，在demo.vue中引入我们的checklist.vue组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div class=&quot;cl-div&quot;>
    <div class=&quot;center&quot;>checklist demo</div>
    <div>
      <input type=&quot;text&quot; placeholder=&quot;请选择考场&quot;>
    </div>
    <checklist></checklist>
  </div>
</template>
<script>
  import checklist from '@components/checklist/checklist'
  export default {
    components: {
      checklist
    }
  }
</script>
<style scoped>
  .center{
    text-align: center;
    font-size: 18px;
  }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"cl-div"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"center"</span>&gt;</span>checklist demo<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"请选择考场"</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">checklist</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">checklist</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">import</span> checklist <span class="hljs-keyword">from</span> <span class="hljs-string">'@components/checklist/checklist'</span>
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">components</span>: {
      checklist
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
  <span class="hljs-selector-class">.center</span>{
    <span class="hljs-attribute">text-align</span>: center;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">18px</span>;
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<h2 id="articleHeader7">第一步：实现组件骨架和基础结构</h2>
<h3 id="articleHeader8">1.1 实现基本骨架</h3>
<p>我们先把基本模块写出来，用背景颜色区分一下，写完后再把背景颜色去掉，我日常写页面都是这样，这样可以清晰的看到模块边界在哪里。<br>checklist.vue</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div class=&quot;cl-checklist&quot;>
    <div class=&quot;topbar&quot;></div>
    <div class=&quot;desc&quot;>您已选中0个，最多可选3个</div>
    <div class=&quot;list&quot;>
    </div>
  </div>
</template>
<script>
</script>
<style scoped>
  .topbar{
    height: 30px;
    background-color: #d0000e;
  }
  .desc{
    padding: 10px 15px 0 0;
    font-size: 14px;
    text-align: right;
    color: #fff;
    background-color: #0d2e44;
  }
  .list{
    height: 300px;
    background-color: #00b4ff;
  }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"cl-checklist"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"topbar"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"desc"</span>&gt;</span>您已选中0个，最多可选3个<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"list"</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="undefined">
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
  <span class="hljs-selector-class">.topbar</span>{
    <span class="hljs-attribute">height</span>: <span class="hljs-number">30px</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#d0000e</span>;
  }
  <span class="hljs-selector-class">.desc</span>{
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">10px</span> <span class="hljs-number">15px</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">14px</span>;
    <span class="hljs-attribute">text-align</span>: right;
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#0d2e44</span>;
  }
  <span class="hljs-selector-class">.list</span>{
    <span class="hljs-attribute">height</span>: <span class="hljs-number">300px</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#00b4ff</span>;
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>效果如下：<br><span class="img-wrap"><img data-src="/img/remote/1460000012669133?w=343&amp;h=585" src="https://static.alili.tech/img/remote/1460000012669133?w=343&amp;h=585" alt="" title="" style="cursor: pointer;"></span></p>
<h3 id="articleHeader9">1.2 实现topbar</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012669208?w=722&amp;h=162" src="https://static.alili.tech/img/remote/1460000012669208?w=722&amp;h=162" alt="" title="" style="cursor: pointer;"></span></p>
<p>topbar有三个元素，如何选择布局方式呢？可以看出，取消、完成按钮是左右对齐，中间title是居中对齐的。我们可以选择传统的浮动布局，使用三个div，比如叫：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;cancel&quot;>取消</div>
<div class=&quot;title&quot;>选择考场</div>
<div class=&quot;confirm&quot;>确定</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"cancel"</span>&gt;</span>取消<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"title"</span>&gt;</span>选择考场<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"confirm"</span>&gt;</span>确定<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>这样需要给div宽度，给取消、确定左右对齐，title居中对齐。<strong>NO！NO！NO！</strong>太麻烦了！我们使用<strong>Flexbox</strong>布局，后面我都将使用Flexbox布局。来看看Flexbox如何轻松解决这个布局。</p>
<p>HTML：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;topbar&quot;>
   <span class=&quot;cancel&quot;>取消</span>
   <span class=&quot;title&quot;>选择考场</span>
   <span class=&quot;confirm&quot;>完成</span>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"topbar"</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"cancel"</span>&gt;</span>取消<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"title"</span>&gt;</span>选择考场<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"confirm"</span>&gt;</span>完成<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>CSS：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".topbar{
    display: -webkit-flex;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 45px;
    font-size: 16px;
    padding: 0 13px;
    border-bottom: 1px solid rgb(217,217,217);
}
.topbar .cancel{
    color: rgb(159,159,159);
}
.topbar .confirm{
    color: rgb(46,166,242);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.topbar</span>{
    <span class="hljs-attribute">display</span>: -webkit-flex;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">justify-content</span>: space-between;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">45px</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">16px</span>;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span> <span class="hljs-number">13px</span>;
    <span class="hljs-attribute">border-bottom</span>: <span class="hljs-number">1px</span> solid <span class="hljs-built_in">rgb</span>(217,217,217);
}
<span class="hljs-selector-class">.topbar</span> <span class="hljs-selector-class">.cancel</span>{
    <span class="hljs-attribute">color</span>: <span class="hljs-built_in">rgb</span>(159,159,159);
}
<span class="hljs-selector-class">.topbar</span> <span class="hljs-selector-class">.confirm</span>{
    <span class="hljs-attribute">color</span>: <span class="hljs-built_in">rgb</span>(46,166,242);
}</code></pre>
<p>我们使用<code>justify-content: space-between</code>让他们水平两端对齐，然后<code>align-items: center</code>垂直居中对齐，再给个左右<code>padding</code>即可。效果如下：<br><span class="img-wrap"><img data-src="/img/remote/1460000012669134?w=357&amp;h=213" src="https://static.alili.tech/img/remote/1460000012669134?w=357&amp;h=213" alt="" title="" style="cursor: pointer;"></span></p>
<p>我在项目中用的是<code>display:inline-block</code>来布局，做的没现在的好，这种事后用文章的形式来复盘和输出能够让自己更清楚的认识怎么更好的去组织代码，这也是我坚持输出的原因。</p>
<h3 id="articleHeader10">1.3 实现操作提示栏</h3>
<p>这个比较简单，在这个部分直接一起给撸了吧。<br>HTML</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div class=&quot;cl-checklist&quot;>
    <div class=&quot;topbar&quot;>
      <span class=&quot;cancel&quot;>取消</span>
      <span class=&quot;title&quot;>选择考场</span>
      <span class=&quot;confirm&quot;>完成</span>
    </div>
    <div class=&quot;desc&quot;>您已选中0个，最多可选3个</div>
    <div class=&quot;list&quot;>
    </div>
  </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"cl-checklist"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"topbar"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"cancel"</span>&gt;</span>取消<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"title"</span>&gt;</span>选择考场<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"confirm"</span>&gt;</span>完成<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"desc"</span>&gt;</span>您已选中0个，最多可选3个<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"list"</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<p>CSS</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".desc{
  height: 30px;
  line-height: 30px;
  padding-right: 10px;
  font-size: 14px;
  text-align: right;
  color: rgb(159,159,159);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.desc</span>{
  <span class="hljs-attribute">height</span>: <span class="hljs-number">30px</span>;
  <span class="hljs-attribute">line-height</span>: <span class="hljs-number">30px</span>;
  <span class="hljs-attribute">padding-right</span>: <span class="hljs-number">10px</span>;
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">14px</span>;
  <span class="hljs-attribute">text-align</span>: right;
  <span class="hljs-attribute">color</span>: <span class="hljs-built_in">rgb</span>(159,159,159);
}</code></pre>
<p>效果如下：<br><span class="img-wrap"><img data-src="/img/remote/1460000012669135?w=354&amp;h=222" src="https://static.alili.tech/img/remote/1460000012669135?w=354&amp;h=222" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader11">第二步：实现list列表结构</h2>
<h3 id="articleHeader12">2.1 实现基本骨架</h3>
<p>我们先来回顾以下第零部多DOM结构的分析：<br><span class="img-wrap"><img data-src="/img/remote/1460000012669136?w=1342&amp;h=428" src="https://static.alili.tech/img/remote/1460000012669136?w=1342&amp;h=428" alt="" title="" style="cursor: pointer;"></span></p>
<p>可以看到我们把DOM结构总体划分为左右结构，然后左边的又分为上下结构，左边的checkbox水平垂直居中</p>
<p>我们先把结构基本勾勒出来<br>HTML：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<--  省略上面的代码 -->
<div class=&quot;list&quot;>
  <div class=&quot;line&quot;>
     <div class=&quot;l&quot;>
        <div class=&quot;title&quot;>科目二第07考点马路</div>
        <div class=&quot;address&quot;>上海市宝山区保安公路2009号</div>
     </div>
     <div class=&quot;r&quot;></div>
  </div>
</div>
<--  省略下面的代码 -->" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">--</span>  省略上面的代码 <span class="hljs-attr">--</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"list"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"line"</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"l"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"title"</span>&gt;</span>科目二第07考点马路<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"address"</span>&gt;</span>上海市宝山区保安公路2009号<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
     <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"r"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">--</span>  省略下面的代码 <span class="hljs-attr">--</span>&gt;</span></code></pre>
<p>CSS：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".list{
    height: 300px;
    font-size: 14px;
    padding: 10px 13px;
    background-color: #00b4ff;
  }
.list .line {
    display: -webkit-flex;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    background-color: #4caf50;
  }
.list .line .l{
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 90%;
    background-color: #d0000e;
  }
.list .line .r{
    width: 20px;
    height: 20px;
    background-color: #0d2e44;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.list</span>{
    <span class="hljs-attribute">height</span>: <span class="hljs-number">300px</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">14px</span>;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">10px</span> <span class="hljs-number">13px</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#00b4ff</span>;
  }
<span class="hljs-selector-class">.list</span> <span class="hljs-selector-class">.line</span> {
    <span class="hljs-attribute">display</span>: -webkit-flex;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">justify-content</span>: center;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#4caf50</span>;
  }
<span class="hljs-selector-class">.list</span> <span class="hljs-selector-class">.line</span> <span class="hljs-selector-class">.l</span>{
    <span class="hljs-attribute">display</span>: -webkit-flex;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">flex-direction</span>: column;
    <span class="hljs-attribute">justify-content</span>: center;
    <span class="hljs-attribute">align-items</span>: flex-start;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">90%</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#d0000e</span>;
  }
<span class="hljs-selector-class">.list</span> <span class="hljs-selector-class">.line</span> <span class="hljs-selector-class">.r</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#0d2e44</span>;
}</code></pre>
<p>效果如下：<br><span class="img-wrap"><img data-src="/img/remote/1460000012669137?w=368&amp;h=290" src="https://static.alili.tech/img/remote/1460000012669137?w=368&amp;h=290" alt="" title="" style="cursor: pointer;"></span></p>
<p>接下来就是完善了，以及右边的checkbox圆圈。<strong>注意</strong>，我们不能给<code>.line</code>设死高度，这个高度应该由内容撑开，因为我们要考虑没有地址信息的时候的展示。</p>
<h3 id="articleHeader13">2.2 实现checkbox选框</h3>
<p>为了方便展示选中状态，我们复制一行<code>.line</code>，设置这一行为选中状态，也就是加一个<code>.selected</code>的class，然后我们对<code>.selected</code>写选中状态的样式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;list&quot;>
      <div class=&quot;line&quot;>
        <div class=&quot;l&quot;>
          <div class=&quot;title&quot;>科目二第07考点马路</div>
          <div class=&quot;address&quot;>上海市宝山区保安公路2009号</div>
        </div>
        <div class=&quot;r&quot;></div>
      </div>
      <div class=&quot;line selected&quot;>
        <div class=&quot;l&quot;>
          <div class=&quot;title&quot;>科目二第07考点马路</div>
          <div class=&quot;address&quot;>上海市宝山区保安公路2009号</div>
        </div>
        <div class=&quot;r&quot;></div>
      </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"list"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"line"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"l"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"title"</span>&gt;</span>科目二第07考点马路<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"address"</span>&gt;</span>上海市宝山区保安公路2009号<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"r"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"line selected"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"l"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"title"</span>&gt;</span>科目二第07考点马路<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"address"</span>&gt;</span>上海市宝山区保安公路2009号<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"r"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>我们继续CSS：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".list .line .r{
    width: 20px;
    height: 20px;
    margin: 0 5px;
    -webkit-border-radius: 50%;
    border-radius: 50%;
    border:1px solid #9e9e9e;
    background-color: #fff;
    position: relative;
    z-index: 0;
  }
 .list .line.selected .l .title{
    color: #1799fa;
  }
  .list .line.selected .r{
    border: 1px solid #1799fa;
    background-color: #1799fa;
  }
  .list .line.selected .r::before{
    content: ' ';
    position: absolute;
    top: 4px;
    left: 4px;
    width: 12px;
    height: 12px;
    background-image: url(&quot;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAPCAYAAAALWoRrAAAA90lEQVQ4ja3TMSuFURgH8GeQRGIwy6BkUbIYlHwBu0Umi8VkMVlMJoMvIcNdDAYlJuULWCSESBSLwc9we/P2eu715t6nznKe//Or0zknEF1YS3jAHRa7Aa7iy0/ddAquVUC47ARcT8APLPwX3PC73jGPCPRiGSvoqwFuJuAb5opMoFFqnmCwDbiVgK+YLecCn5XQGYYScDsBXzBTzQb2k/A5hkvBnSTzhOnsRIEBHCdDFxjBbtJ7xFQGFmigH0fJ8HOyd4/JVmAZDc2bP0yQct1ioh1YRYvn1cg0XGP8LzBDC/igAl5hrA7YCg30YE/zl5xitC6I+AYJmBaJbbKurAAAAABJRU5ErkJggg==&quot;);
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center center;
    z-index: 1;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.list</span> <span class="hljs-selector-class">.line</span> <span class="hljs-selector-class">.r</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> <span class="hljs-number">5px</span>;
    <span class="hljs-attribute">-webkit-border-radius</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">border</span>:<span class="hljs-number">1px</span> solid <span class="hljs-number">#9e9e9e</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#fff</span>;
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">z-index</span>: <span class="hljs-number">0</span>;
  }
 <span class="hljs-selector-class">.list</span> <span class="hljs-selector-class">.line</span><span class="hljs-selector-class">.selected</span> <span class="hljs-selector-class">.l</span> <span class="hljs-selector-class">.title</span>{
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#1799fa</span>;
  }
  <span class="hljs-selector-class">.list</span> <span class="hljs-selector-class">.line</span><span class="hljs-selector-class">.selected</span> <span class="hljs-selector-class">.r</span>{
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#1799fa</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#1799fa</span>;
  }
  <span class="hljs-selector-class">.list</span> <span class="hljs-selector-class">.line</span><span class="hljs-selector-class">.selected</span> <span class="hljs-selector-class">.r</span><span class="hljs-selector-pseudo">::before</span>{
    <span class="hljs-attribute">content</span>: <span class="hljs-string">' '</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">4px</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">4px</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">12px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">12px</span>;
    <span class="hljs-attribute">background-image</span>: <span class="hljs-built_in">url</span>(<span class="hljs-string">"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAPCAYAAAALWoRrAAAA90lEQVQ4ja3TMSuFURgH8GeQRGIwy6BkUbIYlHwBu0Umi8VkMVlMJoMvIcNdDAYlJuULWCSESBSLwc9we/P2eu715t6nznKe//Or0zknEF1YS3jAHRa7Aa7iy0/ddAquVUC47ARcT8APLPwX3PC73jGPCPRiGSvoqwFuJuAb5opMoFFqnmCwDbiVgK+YLecCn5XQGYYScDsBXzBTzQb2k/A5hkvBnSTzhOnsRIEBHCdDFxjBbtJ7xFQGFmigH0fJ8HOyd4/JVmAZDc2bP0yQct1ioh1YRYvn1cg0XGP8LzBDC/igAl5hrA7YCg30YE/zl5xitC6I+AYJmBaJbbKurAAAAABJRU5ErkJggg=="</span>);
    <span class="hljs-attribute">background-repeat</span>: no-repeat;
    <span class="hljs-attribute">background-size</span>: contain;
    <span class="hljs-attribute">background-position</span>: center center;
    <span class="hljs-attribute">z-index</span>: <span class="hljs-number">1</span>;
}</code></pre>
<p>这里为了不依赖图片，我们把勾的图片编码成base64格式，同时我们先把背景去掉，效果如下：<br><span class="img-wrap"><img data-src="/img/remote/1460000012669138?w=353&amp;h=289" src="https://static.alili.tech/img/remote/1460000012669138?w=353&amp;h=289" alt="" title="" style="cursor: pointer;"></span></p>
<h3 id="articleHeader14">2.3 地址信息前面的小图标</h3>
<p>这个小图标最好使用伪元素来实现</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".list .line .l .address{
    color: rgb(159,159,159);
    position: relative;
    padding-left: 15px;
  }
  .list .line .l .address::before{
    content: ' ';
    display: inline-block;
    position: absolute;
    width: 15px;
    height: 15px;
    top: 2px;
    left: 0;
    background-image: url(&quot;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAbCAYAAAB836/YAAABu0lEQVRIiaXUzU8TQRjH8U9fpAkXIZqItHghxEgietuD/gP84R420QSDcCDxIq6KaCoJYCuaeJhdu93OlILfpEnnmWd++7zMM63d3V0RuljHQ9xFr7SP8QNfUOBPlmUzB5tsYBtLkb0eHpS/JzjEcd2hs7W1Vf1v4TkeoxMLu0EHa0VRLBdFcTIYDEC75vCsjO6mbGCnWlSCg1uKVTzK83xAqGFHqFmMX3iP7+X6HjbF67ud5/nnLvomXaxziVcY1WxDfMQLLDf8e+i3sZaIbq8hVjHC28SZtTZWIhs/TdKM8S3xsZW2eLrjOWIVMcFeO2Ik1Kc1R6xltoYI1+Y8Yl8Sxi7Funinz9s4SRzaEa/vKp4mzpx0hSHfjGzewUt8EpoA98voUuUoujgT7tdqxKEl3NN+QqDOMMuys6opRwscuI4jJrP8VYjytgxLjanX5uA/BA+qh7YuOBQadFOKLMv+Zde82Ae4uoHYlUZmTcGx8KwvymGWZVNjGhu9DzhdQOy09J0iNct75qd+VfrMkBIcYX+O4L74a5MUJHT8OGI/Nuc2zBOEd7iorS9KW5LrBH/jjZDeCK9LW5K/QatiGcsSFOsAAAAASUVORK5CYII=&quot;);
    background-repeat: no-repeat;
    background-size: contain;
    background-position: 0;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.list</span> <span class="hljs-selector-class">.line</span> <span class="hljs-selector-class">.l</span> <span class="hljs-selector-class">.address</span>{
    <span class="hljs-attribute">color</span>: <span class="hljs-built_in">rgb</span>(159,159,159);
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">padding-left</span>: <span class="hljs-number">15px</span>;
  }
  <span class="hljs-selector-class">.list</span> <span class="hljs-selector-class">.line</span> <span class="hljs-selector-class">.l</span> <span class="hljs-selector-class">.address</span><span class="hljs-selector-pseudo">::before</span>{
    <span class="hljs-attribute">content</span>: <span class="hljs-string">' '</span>;
    <span class="hljs-attribute">display</span>: inline-block;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">15px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">15px</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">2px</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">background-image</span>: <span class="hljs-built_in">url</span>(<span class="hljs-string">"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAbCAYAAAB836/YAAABu0lEQVRIiaXUzU8TQRjH8U9fpAkXIZqItHghxEgietuD/gP84R420QSDcCDxIq6KaCoJYCuaeJhdu93OlILfpEnnmWd++7zMM63d3V0RuljHQ9xFr7SP8QNfUOBPlmUzB5tsYBtLkb0eHpS/JzjEcd2hs7W1Vf1v4TkeoxMLu0EHa0VRLBdFcTIYDEC75vCsjO6mbGCnWlSCg1uKVTzK83xAqGFHqFmMX3iP7+X6HjbF67ud5/nnLvomXaxziVcY1WxDfMQLLDf8e+i3sZaIbq8hVjHC28SZtTZWIhs/TdKM8S3xsZW2eLrjOWIVMcFeO2Ik1Kc1R6xltoYI1+Y8Yl8Sxi7Funinz9s4SRzaEa/vKp4mzpx0hSHfjGzewUt8EpoA98voUuUoujgT7tdqxKEl3NN+QqDOMMuys6opRwscuI4jJrP8VYjytgxLjanX5uA/BA+qh7YuOBQadFOKLMv+Zde82Ae4uoHYlUZmTcGx8KwvymGWZVNjGhu9DzhdQOy09J0iNct75qd+VfrMkBIcYX+O4L74a5MUJHT8OGI/Nuc2zBOEd7iorS9KW5LrBH/jjZDeCK9LW5K/QatiGcsSFOsAAAAASUVORK5CYII="</span>);
    <span class="hljs-attribute">background-repeat</span>: no-repeat;
    <span class="hljs-attribute">background-size</span>: contain;
    <span class="hljs-attribute">background-position</span>: <span class="hljs-number">0</span>;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012669139?w=686&amp;h=700" src="https://static.alili.tech/img/remote/1460000012669139?w=686&amp;h=700" alt="" title="" style="cursor: pointer;"></span></p>
<h3 id="articleHeader15">2.4 适配移动端1像素边框</h3>
<p>实现适配移动端1px边框，主要是根据设备的dpr来对边框进行缩放处理，CSS写法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".border-1px{
    position: relative;
}
.border-1px::after{
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    border-bottom: 1px solid rgb(217,217,217);
    content: ' ';
}
@media (-webkit-min-device-pixel-ratio: 1.5), (min-device-pixel-ratio: 1.5) {
    .border-1px::after {
      -webkit-transform: scaleY(0.7);
      transform: scaleY(0.7);
    }
}
@media (-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2) {
    .border-1px::after {
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.border-1px</span>{
    <span class="hljs-attribute">position</span>: relative;
}
<span class="hljs-selector-class">.border-1px</span><span class="hljs-selector-pseudo">::after</span>{
    <span class="hljs-attribute">display</span>: block;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">border-bottom</span>: <span class="hljs-number">1px</span> solid <span class="hljs-built_in">rgb</span>(217,217,217);
    <span class="hljs-attribute">content</span>: <span class="hljs-string">' '</span>;
}
@<span class="hljs-keyword">media</span> (-webkit-min-device-pixel-ratio: <span class="hljs-number">1.5</span>), (min-device-pixel-ratio: <span class="hljs-number">1.5</span>) {
    <span class="hljs-selector-class">.border-1px</span><span class="hljs-selector-pseudo">::after</span> {
      <span class="hljs-attribute">-webkit-transform</span>: <span class="hljs-built_in">scaleY</span>(0.7);
      <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scaleY</span>(0.7);
    }
}
@<span class="hljs-keyword">media</span> (-webkit-min-device-pixel-ratio: <span class="hljs-number">2</span>), (min-device-pixel-ratio: <span class="hljs-number">2</span>) {
    <span class="hljs-selector-class">.border-1px</span><span class="hljs-selector-pseudo">::after</span> {
      <span class="hljs-attribute">-webkit-transform</span>: <span class="hljs-built_in">scaleY</span>(0.5);
      <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scaleY</span>(0.5);
    }
}</code></pre>
<p>然后我们在需要的地方设置<code>.border-1px</code>的样式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;list&quot;>
      <div class=&quot;line border-1px&quot;>
        <div class=&quot;l&quot;>
          <div class=&quot;title&quot;>科目二第07考点马路</div>
          <div class=&quot;address&quot;>上海市宝山区保安公路2009号</div>
        </div>
        <div class=&quot;r&quot;></div>
      </div>
      <div class=&quot;line border-1px selected&quot;>
        <div class=&quot;l&quot;>
          <div class=&quot;title&quot;>科目二第07考点马路</div>
          <div class=&quot;address&quot;>上海市宝山区保安公路2009号</div>
        </div>
        <div class=&quot;r&quot;></div>
      </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"list"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"line border-1px"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"l"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"title"</span>&gt;</span>科目二第07考点马路<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"address"</span>&gt;</span>上海市宝山区保安公路2009号<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"r"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"line border-1px selected"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"l"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"title"</span>&gt;</span>科目二第07考点马路<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"address"</span>&gt;</span>上海市宝山区保安公路2009号<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"r"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>我们在每一行的<code>.line</code>元素上添加<code>border-1px</code>，效果如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012669140?w=375&amp;h=308" src="https://static.alili.tech/img/remote/1460000012669140?w=375&amp;h=308" alt="" title="" style="cursor: pointer;"></span></p>
<p>更多移动端1像素边框问题可以参看<a href="http://www.qinshenxue.com/article/20151104151932.html" rel="nofollow noreferrer" target="_blank">《移动端1像素边框问题》</a></p>
<h3 id="articleHeader16">2.5 列表滚动</h3>
<p>实现滚动很简单，只要给父级元素也就是我们代码中的<code>.list</code>元素设置一个高度，在这里我们的数据多少不一定，所以我们最好只设置一个最大高度<code>max-height</code>即可，同时需要给最外层DIV也就是<code>.cl-checklist</code>设置<code>overflow:hidden</code>。我们先复制很多行来进行测试。<br>CSS：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".cl-checklist{
    overflow: hidden;
}
.list{
    /*height: 300px;*/
    max-height: 300px;
    font-size: 14px;
    padding: 10px 13px;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch; 
    overflow-scrolling: touch;
    /*background-color: #00A2E6;*/
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.cl-checklist</span>{
    <span class="hljs-attribute">overflow</span>: hidden;
}
<span class="hljs-selector-class">.list</span>{
    <span class="hljs-comment">/*height: 300px;*/</span>
    <span class="hljs-attribute">max-height</span>: <span class="hljs-number">300px</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">14px</span>;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">10px</span> <span class="hljs-number">13px</span>;
    <span class="hljs-attribute">overflow-y</span>: auto;
    <span class="hljs-attribute">-webkit-overflow-scrolling</span>: touch; 
    <span class="hljs-attribute">overflow-scrolling</span>: touch;
    <span class="hljs-comment">/*background-color: #00A2E6;*/</span>
}</code></pre>
<p>注意<code>overflow-scrolling: touch; </code>属性，设置该属性是为了适配在移动端下滚动不平滑的问题，现在的效果如下：<br><span class="img-wrap"><img data-src="/img/remote/1460000012669141?w=338&amp;h=576" src="https://static.alili.tech/img/remote/1460000012669141?w=338&amp;h=576" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader17">第三步：实现选择CheckBox的交互功能</h2>
<h3 id="articleHeader18">3.1 实现原理与v-model</h3>
<p>这一步是整个组件的一个核心也是重点难点，这一步写的好、写的巧就会对后面的逻辑交互简化很多。我们借助HTML的原生功能特性来实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<label for=&quot;xxx&quot;><input id=&quot;xxx&quot; type=&quot;checkbox&quot; value=&quot;&quot;></label>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="HTML" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">"xxx"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"xxx"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span></code></pre>
<p>这个标签组合可以实现点击<code>&lt;label&gt;</code>包裹起来的范围的时候触发<code>checkbox</code>，根据这个原理我们改造一下HTML代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;desc&quot;>您已选中 <span>"{{"checkboxValue.length"}}"</span> 个，最多可选<span>3</span>个</div>
    <div class=&quot;list&quot;>
      <div class=&quot;line-wrapper&quot;>
        <label for=&quot;1&quot; class=&quot;line border-1px&quot;>
          <div class=&quot;l&quot;>
            <div class=&quot;title&quot;>科目二第07考点马路</div>
            <div class=&quot;address&quot;>上海市宝山区保安公路2009号</div>
          </div>
          <div class=&quot;r&quot;></div>
        </label>
        <input type=&quot;checkbox&quot; id=&quot;1&quot; v-model=&quot;checkboxValue&quot; style=&quot;display:none&quot; value=&quot;1&quot;>
      </div>
      <div class=&quot;line-wrapper&quot;>
        <label for=&quot;2&quot; class=&quot;line border-1px&quot;>
          <div class=&quot;l&quot;>
            <div class=&quot;title&quot;>科目二第07考点马路</div>
            <div class=&quot;address&quot;>上海市宝山区保安公路2009号</div>
          </div>
          <div class=&quot;r&quot;></div>
        </label>
        <input type=&quot;checkbox&quot; id=&quot;2&quot; v-model=&quot;checkboxValue&quot; style=&quot;display:none&quot; value=&quot;2&quot;>
      </div>
      <div class=&quot;line-wrapper&quot;>
        <label for=&quot;3&quot; class=&quot;line border-1px&quot;>
          <div class=&quot;l&quot;>
            <div class=&quot;title&quot;>科目二第07考点马路</div>
            <div class=&quot;address&quot;>上海市宝山区保安公路2009号</div>
          </div>
          <div class=&quot;r&quot;></div>
        </label>
        <input type=&quot;checkbox&quot; id=&quot;3&quot; v-model=&quot;checkboxValue&quot; style=&quot;display:none&quot; value=&quot;3&quot;>
      </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"desc"</span>&gt;</span>您已选中 <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>"{{"checkboxValue.length"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span> 个，最多可选<span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>3<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>个<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"list"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"line-wrapper"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">"1"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"line border-1px"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"l"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"title"</span>&gt;</span>科目二第07考点马路<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"address"</span>&gt;</span>上海市宝山区保安公路2009号<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"r"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"1"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"checkboxValue"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"display:none"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"1"</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"line-wrapper"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">"2"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"line border-1px"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"l"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"title"</span>&gt;</span>科目二第07考点马路<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"address"</span>&gt;</span>上海市宝山区保安公路2009号<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"r"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"2"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"checkboxValue"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"display:none"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"2"</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"line-wrapper"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">"3"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"line border-1px"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"l"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"title"</span>&gt;</span>科目二第07考点马路<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"address"</span>&gt;</span>上海市宝山区保安公路2009号<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"r"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"3"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"checkboxValue"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"display:none"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"3"</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>主要是把<code>div.line</code>的元素变成<code>&lt;label&gt;</code>元素，然后在外面再包裹一个<code>div.line-wrapper</code>，在<code>&lt;label&gt;</code>后面加一个checkbox标签。同时让checkbox不可见我们可以给checkbox设置<code>display:none</code>或者给外围的<code>div.line-wrapper</code>设置<code>overflow:hidden</code>都可以，这里我使用<code>display:none</code>。</p>
<p>Vue.js 提供了 v-model 指令，用于在表单类元素上双向绑定数据，例如在输入框上使用时，输入的内容会实时映射到绑定的数据上。单选按钮在单独使用时不需要 v-model ，直接使用 v-bind 绑定一个布尔类型的值，为真时选中，为否时不选中，如果是组合使用来实现互斥效果时就需要 v-model 配合 value 来使用。</p>
<p>这里给checkbox用 v-model 指令绑定了一个<code>checkboxValue</code>，这个值必须是一个数组，然后Vue.js 会帮我们自动每次变更数组：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
    data () {
      return {
        checkboxValue: []
      }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    data () {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">checkboxValue</span>: []
      }
    }
}</code></pre>
<p>在操作提示栏里我们给当前选择了几个设置成了<code>checkboxValue</code>的长度，这样之后我们来试试，可以发现每次选择一个都会往数组中push一次，再次点击则会从数组中移除。效果如下：<br><span class="img-wrap"><img data-src="/img/remote/1460000012669142?w=338&amp;h=386" src="https://static.alili.tech/img/remote/1460000012669142?w=338&amp;h=386" alt="" title="" style="cursor: pointer;"></span></p>
<h3 id="articleHeader19">3.2 加个选中样式</h3>
<p>现在是可以选中了，但是如何给选中的项加上选中的CSS呢，想来想去也是个麻烦事，不过得借助JS来实现了，不知道广大网友有没有牛逼方法。</p>
<p>我们在checkbox标签上绑定一个事件<code>selectedItem</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;line-wrapper&quot;>
   <label for=&quot;1&quot; class=&quot;line border-1px&quot;>
       <div class=&quot;l&quot;>
            <div class=&quot;title&quot;>科目二第07考点马路</div>
            <div class=&quot;address&quot;>上海市宝山区保安公路2009号</div>
       </div>
       <div class=&quot;r&quot;></div>
    </label>
    <input type=&quot;checkbox&quot; id=&quot;1&quot; @click=&quot;selectedItem($event)&quot; v-model=&quot;checkboxValue&quot; style=&quot;display:none&quot; value=&quot;1&quot;>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"line-wrapper"</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">"1"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"line border-1px"</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"l"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"title"</span>&gt;</span>科目二第07考点马路<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"address"</span>&gt;</span>上海市宝山区保安公路2009号<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
       <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"r"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"1"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"selectedItem($event)"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"checkboxValue"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"display:none"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"1"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="methods: {
     selectedItem (event) {
        const labelNode = event.target.previousElementSibling
        const classList = labelNode.classList
        classList.contains('selected') ? classList.remove('selected') : classList.add('selected')
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">methods: {
     selectedItem (event) {
        <span class="hljs-keyword">const</span> labelNode = event.target.previousElementSibling
        <span class="hljs-keyword">const</span> classList = labelNode.classList
        classList.contains(<span class="hljs-string">'selected'</span>) ? classList.remove(<span class="hljs-string">'selected'</span>) : classList.add(<span class="hljs-string">'selected'</span>)
    }
}</code></pre>
<p>点击的时候获取Event事件对象，然后通过<code>previousElementSibling</code>找到上一个兄弟节点，给他绑定<code>.selected</code>class即可<br><span class="img-wrap"><img data-src="/img/remote/1460000012669143?w=338&amp;h=386" src="https://static.alili.tech/img/remote/1460000012669143?w=338&amp;h=386" alt="" title="" style="cursor: pointer;"></span></p>
<h3 id="articleHeader20">3.3 最多可选择几项</h3>
<h4>3.3.1 使用 props 传递数据</h4>
<p>用户是可以设置最多选择几项的，于是 Vue.js 的 Props 功能派上用场了。在 Vue.js 组件中，使用选项 Props 来声明需要从父级接收的数据，props 的值可以是两种，一种是字符串，一种是对象，这里我们使用对象，一个<code>Number</code>对象。</p>
<p>先定义 props</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="props: {
   max: {
       type: Number,
       default: 0
    }
 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">props: {
   <span class="hljs-attr">max</span>: {
       <span class="hljs-attr">type</span>: <span class="hljs-built_in">Number</span>,
       <span class="hljs-attr">default</span>: <span class="hljs-number">0</span>
    }
 }</code></pre>
<p>我们定义了一个max属性，它的类型是<code>Number</code>类型，默认值是 0 。然后我们把<code>max</code>加到操作提示中</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;desc&quot;>您已选中 <span>"{{"checkboxValue.length"}}"</span> 个，最多可选<span>"{{"max"}}"</span>个</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"desc"</span>&gt;</span>您已选中 <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>"{{"checkboxValue.length"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span> 个，最多可选<span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>"{{"max"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>个<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>然后我们就可以给组件传递<code>max</code>属性了，现在转到demo.vue文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div class=&quot;cl-div&quot;>
    <div class=&quot;center&quot;>checklist demo</div>
    <div>
      <input type=&quot;text&quot; placeholder=&quot;请选择考场&quot;>
    </div>
    <checklist :max=&quot;2&quot;></checklist>
  </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"cl-div"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"center"</span>&gt;</span>checklist demo<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"请选择考场"</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">checklist</span> <span class="hljs-attr">:max</span>=<span class="hljs-string">"2"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">checklist</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<p>我们给<code>max</code>设置为2，也就是最多选择2个。</p>
<h4>3.3.2 Watch选项、$refs的使用</h4>
<p>当我们选择了两个的时候其他的选择项就应该灰掉（禁用），那么就要监控 data 选项里的<code>checkboxValue</code>的长度了，这时候我们需要用到Vue.js的 watch 选项，watch 是一个对象，键是需要观察的表达式，值是对应回调函数。值也可以是方法名，或者包含选项的对象。Vue 实例将会在实例化时调用<code>$watch()</code>，遍历 watch 对象的每一个属性。</p>
<blockquote>
<strong>注意</strong>，不应该使用箭头函数来定义 watcher 函数 (例如<code>searchQuery: newValue =&gt; this.updateAutocomplete(newValue))</code>。理由是箭头函数绑定了父级作用域的上下文，所以 this 将不会按照期望指向 Vue 实例，<code>this.updateAutocomplete</code> 将是 <code>undefined</code>。</blockquote>
<p>我们通过监听 data 选项里的<code>checkboxValue</code>，来判断它的长度，如果它的长度刚好已经和设置的<code>max</code>属性相等了，就给其他添加<code>.disabled</code>这个class，同事给<code>input checkbox</code>添加<code>disabled</code>属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="watch: {
   checkboxValue (val) {
      const listDom = this.$refs['list']
      const lines = listDom.querySelectorAll('line-wrapper')
      if (val.length === this.max) {
        let item = null
        for (let i = 0; i < lines.length; i++) {
          item =lines[i]
          if (val.indexOf(lines[i].dataset.val) === -1) {
            item.children[0].classList.add('disabled')
            item.querySelector('input[type=&quot;checkbox&quot;]').setAttribute('disabled', 'disabled')
          }
      }
   } else {
        let item = null
        for (let i = 0; i <lines.length; i++) {
          item =lines[i]
          if (item.children[0].classList.contains('disabled')) {
            item.children[0].classList.remove('disabled')
            item.querySelector('input[type=&quot;checkbox&quot;]').removeAttribute('disabled')
          }
        }
      }
   }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">watch: {
   checkboxValue (val) {
      <span class="hljs-keyword">const</span> listDom = <span class="hljs-keyword">this</span>.$refs[<span class="hljs-string">'list'</span>]
      <span class="hljs-keyword">const</span> lines = listDom.querySelectorAll(<span class="hljs-string">'line-wrapper'</span>)
      <span class="hljs-keyword">if</span> (val.length === <span class="hljs-keyword">this</span>.max) {
        <span class="hljs-keyword">let</span> item = <span class="hljs-literal">null</span>
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; lines.length; i++) {
          item =lines[i]
          <span class="hljs-keyword">if</span> (val.indexOf(lines[i].dataset.val) === <span class="hljs-number">-1</span>) {
            item.children[<span class="hljs-number">0</span>].classList.add(<span class="hljs-string">'disabled'</span>)
            item.querySelector(<span class="hljs-string">'input[type="checkbox"]'</span>).setAttribute(<span class="hljs-string">'disabled'</span>, <span class="hljs-string">'disabled'</span>)
          }
      }
   } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">let</span> item = <span class="hljs-literal">null</span>
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt;lines.length; i++) {
          item =lines[i]
          <span class="hljs-keyword">if</span> (item.children[<span class="hljs-number">0</span>].classList.contains(<span class="hljs-string">'disabled'</span>)) {
            item.children[<span class="hljs-number">0</span>].classList.remove(<span class="hljs-string">'disabled'</span>)
            item.querySelector(<span class="hljs-string">'input[type="checkbox"]'</span>).removeAttribute(<span class="hljs-string">'disabled'</span>)
          }
        }
      }
   }
}</code></pre>
<p>这个需要配合Vue.js 的 <code>$refs</code>来做，在HTML中的<code>.list</code>节点上设置<code>ref = 'list'</code>，也就是为了方便选择这个DOM节点，当然你用传统的<code>document.querySelector</code>来选择<code>.list</code>节点也是没问题的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;list&quot; ref=&quot;list&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"list"</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"list"</span>&gt;</span></code></pre>
<p>上面代码的第9行，判断是否当前DOM是否在选中的数组中，拿的是<code>checkboxValue</code>的数组项和一个自定义属性值比较，这个自定义属性叫<code>data-val</code>，他的值跟<code>input checkbox</code>的 value 值保持一致，这个<code>val</code>自定义属性设置在<code>.list-wrapper</code>节点上是为了方便DOM查找，减少DOM查找层数，不然就需要获取<code>input checkbox</code>的 value 值来比较。</p>
<p>设置<code>.disabled</code>的CSS如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".list .line.disabled .l .title{
    color: #9e9e9e;
}
.list .line.disabled .r{
    border: 1px solid #9e9e9e;
    background-color: #9e9e9e;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.list</span> <span class="hljs-selector-class">.line</span><span class="hljs-selector-class">.disabled</span> <span class="hljs-selector-class">.l</span> <span class="hljs-selector-class">.title</span>{
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#9e9e9e</span>;
}
<span class="hljs-selector-class">.list</span> <span class="hljs-selector-class">.line</span><span class="hljs-selector-class">.disabled</span> <span class="hljs-selector-class">.r</span>{
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#9e9e9e</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#9e9e9e</span>;
}</code></pre>
<h2 id="articleHeader21">第四步：组件显示隐藏</h2>
<h3 id="articleHeader22">4.1 显示组件</h3>
<p>这一步我们要做一下的组件的显示与隐藏，点击输入框从页面底部显示组件，点击取消或者蒙层从上到下隐藏组件，并且添加过渡动画。这其实使用定位和CSS3的<code>transform</code>属性即可实现。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".cl-checklist{
    overflow: hidden;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    -webkit-transition: all .5s;
    transition: all .5s;
    -webkit-transform: translateY(100%);
    transform: translateY(100%);
}
.cl-checklist.show{
    -webkit-transform: translateY(0%);
    transform: translateY(0%);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.cl-checklist</span>{
    <span class="hljs-attribute">overflow</span>: hidden;
    <span class="hljs-attribute">position</span>: fixed;
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">-webkit-transition</span>: all .<span class="hljs-number">5s</span>;
    <span class="hljs-attribute">transition</span>: all .<span class="hljs-number">5s</span>;
    <span class="hljs-attribute">-webkit-transform</span>: <span class="hljs-built_in">translateY</span>(100%);
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateY</span>(100%);
}
<span class="hljs-selector-class">.cl-checklist</span><span class="hljs-selector-class">.show</span>{
    <span class="hljs-attribute">-webkit-transform</span>: <span class="hljs-built_in">translateY</span>(0%);
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateY</span>(0%);
}</code></pre>
<p>我们还得为组件弄一个是否显示和隐藏的属性<code>isOpen</code>，默认为<code>false</code>不显示，用它来控制给组件动态添加显示和隐藏的<code>.cl-checklist.show</code>类。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;cl-checklist&quot; :class=&quot;{'show': isOpen}&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"cl-checklist"</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"{'show': isOpen}"</span>&gt;</span></code></pre>
<p>那在demo.vue中如何调用这个属性呢？这时候我们就不得不考虑对外提供方法了，我们可以定义一个显示和隐藏的方法来供使用者调用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="methods: {
   show () {
      this.isOpen = true
   },
   hide () {
      this.isOpen = false
   }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">methods: {
   show () {
      <span class="hljs-keyword">this</span>.isOpen = <span class="hljs-literal">true</span>
   },
   hide () {
      <span class="hljs-keyword">this</span>.isOpen = <span class="hljs-literal">false</span>
   }
}</code></pre>
<p>在demo.vue中，为输入框添加事件，然后调用组件的 show 方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div class=&quot;cl-div&quot;>
    <div class=&quot;center&quot;>checklist demo</div>
    <div>
      <input type=&quot;text&quot; @focus=&quot;openChecklist&quot; placeholder=&quot;请选择考场&quot;>
    </div>
    <checklist ref=&quot;checklist&quot; :max=&quot;2&quot;></checklist>
  </div>
</template>
<script>
  import checklist from '@components/checklist/checklist'
  export default {
    methods: {
      openChecklist () {
        this.$refs['checklist'].show()
      }
    },
    components: { checklist }
  }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"cl-div"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"center"</span>&gt;</span>checklist demo<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> @<span class="hljs-attr">focus</span>=<span class="hljs-string">"openChecklist"</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"请选择考场"</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">checklist</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"checklist"</span> <span class="hljs-attr">:max</span>=<span class="hljs-string">"2"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">checklist</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">import</span> checklist <span class="hljs-keyword">from</span> <span class="hljs-string">'@components/checklist/checklist'</span>
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">methods</span>: {
      openChecklist () {
        <span class="hljs-keyword">this</span>.$refs[<span class="hljs-string">'checklist'</span>].show()
      }
    },
    <span class="hljs-attr">components</span>: { checklist }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>现在的效果如下：<br><span class="img-wrap"><img data-src="/img/remote/1460000012669144?w=338&amp;h=575" src="https://static.alili.tech/img/remote/1460000012669144?w=338&amp;h=575" alt="" title="" style="cursor: pointer;"></span></p>
<h3 id="articleHeader23">4.2 隐藏组件</h3>
<p>做好了显示那隐藏就很简单了，点击取消隐藏组件，动画会原路返回，只需要为取消设置一下<code>isOpen = false</code>或者调用<code>hide</code>方法即可。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;topbar&quot;>
   <span class=&quot;cancel&quot; @click=&quot;hide&quot;>取消</span>
   <span class=&quot;title&quot;>选择考场</span>
   <span class=&quot;confirm&quot;>完成</span>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"topbar"</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"cancel"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"hide"</span>&gt;</span>取消<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"title"</span>&gt;</span>选择考场<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"confirm"</span>&gt;</span>完成<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>现在效果如下<br><span class="img-wrap"><img data-src="/img/remote/1460000012669145?w=338&amp;h=575" src="https://static.alili.tech/img/remote/1460000012669145?w=338&amp;h=575" alt="" title="" style="cursor: pointer;"></span></p>
<h3 id="articleHeader24">4.3 添加蒙层</h3>
<p>为了使蒙层能够覆盖整个页面，还不得不为DOM结构做一下调整</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;cl-checklist&quot;>
    <div class=&quot;checklist&quot; :class=&quot;{'show': isOpen}&quot;>
        ... ...
    </div>
    <!--蒙层-->
    <div class=&quot;checklist-overlay&quot;  v-if=&quot;isOpen&quot;></div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"cl-checklist"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"checklist"</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"{'show': isOpen}"</span>&gt;</span>
        ... ...
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-comment">&lt;!--蒙层--&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"checklist-overlay"</span>  <span class="hljs-attr">v-if</span>=<span class="hljs-string">"isOpen"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p><code>.checklist-overlay</code>的CSS如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".checklist-overlay{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, .5);
  transition: all .5s;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.checklist-overlay</span>{
  <span class="hljs-attribute">position</span>: fixed;
  <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">z-index</span>: <span class="hljs-number">1000</span>;
  <span class="hljs-attribute">background</span>: <span class="hljs-built_in">rgba</span>(0, 0, 0, .5);
  <span class="hljs-attribute">transition</span>: all .<span class="hljs-number">5s</span>;
}</code></pre>
<p>对应的，DOM结构调整后，最外层的样式也要改一下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".cl-checklist{
    overflow: hidden;
}
.checklist{
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 2000;
    width: 100%;
    background-color: #fff;
    -webkit-transition: all .5s;
    transition: all .5s;
    -webkit-transform: translateY(100%);
    transform: translateY(100%);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.cl-checklist</span>{
    <span class="hljs-attribute">overflow</span>: hidden;
}
<span class="hljs-selector-class">.checklist</span>{
    <span class="hljs-attribute">position</span>: fixed;
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">z-index</span>: <span class="hljs-number">2000</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#fff</span>;
    <span class="hljs-attribute">-webkit-transition</span>: all .<span class="hljs-number">5s</span>;
    <span class="hljs-attribute">transition</span>: all .<span class="hljs-number">5s</span>;
    <span class="hljs-attribute">-webkit-transform</span>: <span class="hljs-built_in">translateY</span>(100%);
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateY</span>(100%);
}</code></pre>
<p>特别注意，为<code>.checklist</code>增加了白色背景和<code>z-index:2000</code>，现在的效果如下<br><span class="img-wrap"><img data-src="/img/remote/1460000012669146?w=338&amp;h=575" src="https://static.alili.tech/img/remote/1460000012669146?w=338&amp;h=575" alt="" title="" style="cursor: pointer;"></span></p>
<p>当然了，你也可以让点击蒙层的时候也可以隐藏组件，直接给蒙层绑定一个单击事件<code>@click = "hide"</code>即可。</p>
<h3 id="articleHeader25">4.4 移动端input输入框阻止弹起手机虚拟键盘</h3>
<p>在移动端，input会默认触发手机的虚拟键盘，如何阻止手机虚拟键盘弹起呢？目前我试过有两个方案，一个是给input添加<code>readonly</code>属性,另一个就是在input事件处理方法前面添加一句<code>document.activeElement.blur() </code>。关于这个问题的详细可以阅读我的另一篇博客<a href="https://dunizb.com/2017/09/24/disable-the-phone-virtual-keyboard-up/" rel="nofollow noreferrer" target="_blank">《小技巧|H5禁止手机虚拟键盘弹出》</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="methods: {
   show () {
      document.activeElement.blur()
      this.isOpen = true
   }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">methods: {
   show () {
      <span class="hljs-built_in">document</span>.activeElement.blur()
      <span class="hljs-keyword">this</span>.isOpen = <span class="hljs-literal">true</span>
   }
}</code></pre>
<h2 id="articleHeader26">第五步：数据渲染和向父组件传递事件</h2>
<p>此文中子组件就是 checklist.vue ，父组件就是 demo.vue</p>
<h3 id="articleHeader27">5.1 数据渲染</h3>
<p>前面我们的数据都是写死的，现在我们来动态渲染数据，也就是循环数据了。从父组件传递数据，在子组件中接收，还得使用 Props，前面我们定义了一个 <code>max</code> 属性，用来控制最多选择几项，我们再添加一个 Props 属性，取名为 <code>dataList</code>，这是一个数组类型，并且是必须的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="props: {
  max: {
      type: Number,
       default: 0
   },
  dataList: {
      type: Array,
      require: true
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">props: {
  <span class="hljs-attr">max</span>: {
      <span class="hljs-attr">type</span>: <span class="hljs-built_in">Number</span>,
       <span class="hljs-attr">default</span>: <span class="hljs-number">0</span>
   },
  <span class="hljs-attr">dataList</span>: {
      <span class="hljs-attr">type</span>: <span class="hljs-built_in">Array</span>,
      <span class="hljs-attr">require</span>: <span class="hljs-literal">true</span>
  }
}</code></pre>
<p>在组件中传递这个 Props ，需要<strong>注意</strong>的就是，由于 HTML 特性不区分大小写，当使用 DOM 模板时，驼峰命名的 props 名称要转为短横线分隔符命名。不能<code>dataList</code>在组件中必须使用中划线，变成<code>data-list</code> 形式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<checklist ref=&quot;checklist&quot; :data-list=&quot;data&quot; :max=&quot;2&quot;></checklist>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">checklist</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"checklist"</span> <span class="hljs-attr">:data-list</span>=<span class="hljs-string">"data"</span> <span class="hljs-attr">:max</span>=<span class="hljs-string">"2"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">checklist</span>&gt;</span></code></pre>
<p>定义 <code>data</code> 数据，这里的数据应该是从后端接口中来的，这里我就模拟一下数据了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="data () {
   return {
        data: [{
            label: '科目二第07考点马路',
            value: '101',
            address: '上海市宝山区宝安公路2009号'
          },{
            label: '科目二第08考点沪松公路',
            value: '102',
            address: '上海市闵行区沪松公路565弄128号'
          },{
            label: '科目二第09考点七宝',
            value: '103',
            address: '上海市闵行区沪松公路200号'
          },{
            label: '科目二第09考点世纪公园世纪公园',
            value: '104',
            address: ''
          },{
            label: '科目二第09考点世纪公园',
            value: '105',
            address: '上海市浦东新区世纪大道200号'
          },{
            label: '科目二第09考点哈哈哈哈',
            value: '107'
          },{
            label: '科目二第09考点合川路地铁站',
            value: '106',
            address: '上海市合川路地铁站2号出口'
          }]
     }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">data () {
   <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">data</span>: [{
            <span class="hljs-attr">label</span>: <span class="hljs-string">'科目二第07考点马路'</span>,
            <span class="hljs-attr">value</span>: <span class="hljs-string">'101'</span>,
            <span class="hljs-attr">address</span>: <span class="hljs-string">'上海市宝山区宝安公路2009号'</span>
          },{
            <span class="hljs-attr">label</span>: <span class="hljs-string">'科目二第08考点沪松公路'</span>,
            <span class="hljs-attr">value</span>: <span class="hljs-string">'102'</span>,
            <span class="hljs-attr">address</span>: <span class="hljs-string">'上海市闵行区沪松公路565弄128号'</span>
          },{
            <span class="hljs-attr">label</span>: <span class="hljs-string">'科目二第09考点七宝'</span>,
            <span class="hljs-attr">value</span>: <span class="hljs-string">'103'</span>,
            <span class="hljs-attr">address</span>: <span class="hljs-string">'上海市闵行区沪松公路200号'</span>
          },{
            <span class="hljs-attr">label</span>: <span class="hljs-string">'科目二第09考点世纪公园世纪公园'</span>,
            <span class="hljs-attr">value</span>: <span class="hljs-string">'104'</span>,
            <span class="hljs-attr">address</span>: <span class="hljs-string">''</span>
          },{
            <span class="hljs-attr">label</span>: <span class="hljs-string">'科目二第09考点世纪公园'</span>,
            <span class="hljs-attr">value</span>: <span class="hljs-string">'105'</span>,
            <span class="hljs-attr">address</span>: <span class="hljs-string">'上海市浦东新区世纪大道200号'</span>
          },{
            <span class="hljs-attr">label</span>: <span class="hljs-string">'科目二第09考点哈哈哈哈'</span>,
            <span class="hljs-attr">value</span>: <span class="hljs-string">'107'</span>
          },{
            <span class="hljs-attr">label</span>: <span class="hljs-string">'科目二第09考点合川路地铁站'</span>,
            <span class="hljs-attr">value</span>: <span class="hljs-string">'106'</span>,
            <span class="hljs-attr">address</span>: <span class="hljs-string">'上海市合川路地铁站2号出口'</span>
          }]
     }
}</code></pre>
<p>最后就是渲染了，回到 checklist.vue 中，把 <code>v-for</code> 补上就行了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;list&quot; ref=&quot;list&quot;>
    <div v-for=&quot;(item, index) in dataList&quot; class=&quot;line-wrapper&quot; :data-val=&quot;item.value&quot;>
       <label :for=&quot;index&quot; class=&quot;line border-1px&quot;>
          <div class=&quot;l&quot;>
             <div class=&quot;title&quot;>"{{"item.label"}}"</div>
             <div class=&quot;address&quot; v-if=&quot;item.address&quot;>"{{"item.address"}}"</div>
           </div>
           <div class=&quot;r&quot;></div>
       </label>
       <input type=&quot;checkbox&quot; :id=&quot;index&quot; @click=&quot;selectedItem($event)&quot;
             v-model=&quot;checkboxValue&quot; style=&quot;display:none&quot; :value=&quot;item.value&quot;>
    </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"list"</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"list"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(item, index) in dataList"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"line-wrapper"</span> <span class="hljs-attr">:data-val</span>=<span class="hljs-string">"item.value"</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">:for</span>=<span class="hljs-string">"index"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"line border-1px"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"l"</span>&gt;</span>
             <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"title"</span>&gt;</span>"{{"item.label"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
             <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"address"</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"item.address"</span>&gt;</span>"{{"item.address"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
           <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
           <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"r"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
       <span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span> <span class="hljs-attr">:id</span>=<span class="hljs-string">"index"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"selectedItem($event)"</span>
             <span class="hljs-attr">v-model</span>=<span class="hljs-string">"checkboxValue"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"display:none"</span> <span class="hljs-attr">:value</span>=<span class="hljs-string">"item.value"</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>需要注意的就是<strong>第 3 行</strong>和<strong>第 10 行</strong>，<code>for</code>的值和<code>id</code>的值必须一致，这里最好是使用<code>v-for</code>的<code>index</code>，当然了，也可以用<code>item.label</code>或<code>item.value</code>，但不推荐这样做。</p>
<h3 id="articleHeader28">5.2 组件通信与自定义事件</h3>
<p>最后的最后，就是该处理点击“完成”后把选中的值传递给父页面了。我们已经知道从父组件向子组件通信，通过 props 传递数据就可以了，当子组件需要向父组件传递数据时，就需要用到自定义事件。v-on 指令除了可以监听 DOM 事件外，还可以用于组件之间额自定义事件</p>
<p>在 Vue.js 中子组件使用 <code>$emit()</code> 来触发事件，父组件使用 <code>$on()</code> 来监听子组件的事件。父组件也可以直接在子组件的自定义标签上使用 v-on 来监听子组件触发的自定义事件。</p>
<p>我们给确定使用<code>@click</code>按钮绑定一个方法，叫<code>onConfirm</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;topbar&quot;>
    <span class=&quot;cancel&quot; @click=&quot;hide&quot;>取消</span>
    <span class=&quot;title&quot;>选择考场</span>
    <span class=&quot;confirm&quot; @click=&quot;onConfirm&quot;>完成</span>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"topbar"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"cancel"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"hide"</span>&gt;</span>取消<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"title"</span>&gt;</span>选择考场<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"confirm"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"onConfirm"</span>&gt;</span>完成<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>我们需要传递什么给父组件？选中的值，这个值应该包含一个考场 value 值（也就是考场的id），选中的考场名称，或许还需要考场的地址，我们可以把这几个值使用<code>|</code>符号连接这几个值一起放到单选框的 value 里面</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;list&quot; ref=&quot;list&quot;>
    <div v-for=&quot;(item, index) in dataList&quot; class=&quot;line-wrapper&quot; :data-val=&quot;item.label + '|' + item.value&quot;>
        <label :for=&quot;index&quot; class=&quot;line border-1px&quot;>
        <div class=&quot;l&quot;>
            <div class=&quot;title&quot;>"{{"item.label"}}"</div>
            <div class=&quot;address&quot; v-if=&quot;item.address&quot;>"{{"item.address"}}"</div>
        </div>
        <div class=&quot;r&quot;></div>
        </label>
        <input type=&quot;checkbox&quot; :id=&quot;index&quot; @click=&quot;selectedItem($event)&quot;
                v-model=&quot;checkboxValue&quot; style=&quot;display:none&quot; :value=&quot;item.label + '|' + item.value&quot;>
    </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"list"</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"list"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(item, index) in dataList"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"line-wrapper"</span> <span class="hljs-attr">:data-val</span>=<span class="hljs-string">"item.label + '|' + item.value"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">:for</span>=<span class="hljs-string">"index"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"line border-1px"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"l"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"title"</span>&gt;</span>"{{"item.label"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"address"</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"item.address"</span>&gt;</span>"{{"item.address"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"r"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span> <span class="hljs-attr">:id</span>=<span class="hljs-string">"index"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"selectedItem($event)"</span>
                <span class="hljs-attr">v-model</span>=<span class="hljs-string">"checkboxValue"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"display:none"</span> <span class="hljs-attr">:value</span>=<span class="hljs-string">"item.label + '|' + item.value"</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p><strong>注意：</strong>第 2 行的 data-val 要跟 单选框的 value 值保持一致，因为接下来的 JS 逻辑需要用到它来和单选框的 value 比较，我们来实现 onConfirm() 方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="onConfirm () {
    this.isOpen = false
    const checkboxValue = this.checkboxValue
    const res = []
    for (let i = 0; i < checkboxValue.length; i++) {
        const resObj = {}
        const item = checkboxValue[i].split('|')
        resObj.label = item[0]
        resObj.value = item[1]
        res.push(resObj)
    }
    this.$emit('on-change', res)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">onConfirm () {
    <span class="hljs-keyword">this</span>.isOpen = <span class="hljs-literal">false</span>
    <span class="hljs-keyword">const</span> checkboxValue = <span class="hljs-keyword">this</span>.checkboxValue
    <span class="hljs-keyword">const</span> res = []
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; checkboxValue.length; i++) {
        <span class="hljs-keyword">const</span> resObj = {}
        <span class="hljs-keyword">const</span> item = checkboxValue[i].split(<span class="hljs-string">'|'</span>)
        resObj.label = item[<span class="hljs-number">0</span>]
        resObj.value = item[<span class="hljs-number">1</span>]
        res.push(resObj)
    }
    <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'on-change'</span>, res)
}</code></pre>
<p>在方法中，首选取得<code>checkboxValue</code>的值，然后分别取出其中的value、label 和 address 三个部分放到一个对象resObj 中，再放到 res 数组中，最后把这个数组对象作为 on-change 事件的返回值参数。</p>
<p>在父组件的子组件标签上我们用 <code>@on-change</code> 来接收</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<checklist ref=&quot;checklist&quot;
               :data-list=&quot;data&quot;
               :max=&quot;2&quot; @on-change=&quot;changeKaochangValue&quot;></checklist>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">checklist</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"checklist"</span>
               <span class="hljs-attr">:data-list</span>=<span class="hljs-string">"data"</span>
               <span class="hljs-attr">:max</span>=<span class="hljs-string">"2"</span> @<span class="hljs-attr">on-change</span>=<span class="hljs-string">"changeKaochangValue"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">checklist</span>&gt;</span></code></pre>
<p>在父组件的 data 选项中定义一个<code>kaochangVal</code>属性来接收，然后把选中的考场名称打印出来</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<p v-for=&quot;(item, index) in kaochangVal&quot;>"{{"item.label"}}"</p>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(item, index) in kaochangVal"</span>&gt;</span>"{{"item.label"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></code></pre>
<p>changeKaochangValue 方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="changeKaochangValue (val) {
    this.kaochangVal = val
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">changeKaochangValue (val) {
    <span class="hljs-keyword">this</span>.kaochangVal = val
}</code></pre>
<p>现在的效果如下：<br><span class="img-wrap"><img data-src="/img/remote/1460000012669147?w=338&amp;h=575" src="https://static.alili.tech/img/remote/1460000012669147?w=338&amp;h=575" alt="" title="" style="cursor: pointer;"></span></p>
<p>至此，这个 Checklist 组件算是完成了。</p>
<h2 id="articleHeader29">第六步：扩展和完善</h2>
<h3 id="articleHeader30">设置选框在左边</h3>
<p>考虑通用性，假如需求需要 CheckBox 框在左边呢？这个问题其实很好解决，因为我们使用 Flexbox 布局，天然支持，只需要多加一句样式即可。这个特性应该是可以用户设置的，也就是得弄一个 props 属性来支持。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="props : {
  checkboxLeft: {
    type: Booolean,
    default: false
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">props : {
  <span class="hljs-attr">checkboxLeft</span>: {
    <span class="hljs-attr">type</span>: Booolean,
    <span class="hljs-attr">default</span>: <span class="hljs-literal">false</span>
  }
}</code></pre>
<p>定义一个 checkboxLeft 属性，默认为 false 也就是 默认 checkbox 在右边，只有用户显示传递改值为 true 时 checkbox 才在左边。</p>
<p>前面说只需要加一个样式就可以让 checkbox 在左边了，为 <code>.line</code> 元素设置一个样式 class ,然后通过 checkboxLeft 这个 props 来动态绑定 class</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".list .line.checkbox-left{
    flex-direction: row-reverse;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.list</span> <span class="hljs-selector-class">.line</span><span class="hljs-selector-class">.checkbox-left</span>{
    <span class="hljs-attribute">flex-direction</span>: row-reverse;
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...
<label :for=&quot;index&quot; class=&quot;line border-1px&quot; :class=&quot;{'checkbox-left': checkboxLeft}&quot;>
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">...
<span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">:for</span>=<span class="hljs-string">"index"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"line border-1px"</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"{'checkbox-left': checkboxLeft}"</span>&gt;</span>
...</code></pre>
<p>熟悉 Flexbox 的同学应该知道，<code>flex-direction</code>是控制布局的方向，<code>row-reverse</code>就是倒序的意思，原来是 12 排列，row-reverse 后就变成 21 排列了。</p>
<p>在组件上（demo.vue）设置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<checklist ref=&quot;checklist&quot;
               :data-list=&quot;data&quot;
               :max=&quot;2&quot;
               :checkbox-left=&quot;true&quot;
               @on-change=&quot;changeKaochangValue&quot;></checklist>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">checklist</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"checklist"</span>
               <span class="hljs-attr">:data-list</span>=<span class="hljs-string">"data"</span>
               <span class="hljs-attr">:max</span>=<span class="hljs-string">"2"</span>
               <span class="hljs-attr">:checkbox-left</span>=<span class="hljs-string">"true"</span>
               @<span class="hljs-attr">on-change</span>=<span class="hljs-string">"changeKaochangValue"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">checklist</span>&gt;</span></code></pre>
<p>显示设置 props 的<code>checkboxLeft</code> 为 true 即可<br><span class="img-wrap"><img data-src="/img/remote/1460000012669148?w=672&amp;h=826" src="https://static.alili.tech/img/remote/1460000012669148?w=672&amp;h=826" alt="" title="" style="cursor: pointer;"></span></p>
<h3 id="articleHeader31">还可以做点什么呢？</h3>
<p>大家可以扩展一下...</p>
<hr>
<p><a href="https://github.com/dunizb/vue-components/tree/master/src/checklist" rel="nofollow noreferrer" target="_blank">完整源码</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue.js新手教学|如何写一个Checklist组件

## 原文链接
[https://segmentfault.com/a/1190000012161495](https://segmentfault.com/a/1190000012161495)

