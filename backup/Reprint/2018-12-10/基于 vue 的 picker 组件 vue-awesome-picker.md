---
title: '基于 vue 的 picker 组件 vue-awesome-picker' 
date: 2018-12-10 2:30:07
hidden: true
slug: 1f73z8hqtym
categories: [reprint]
---

{{< raw >}}

                    
<p>⚠️ <strong>DEPRECATED 组件停止维护, 本文评论不再回复</strong> ⚠️<br>⚠️<strong> 有赞前端大量坑位，内推私信</strong>⚠️</p>
<h1 id="articleHeader0">vue-awesome-picker <a href="https://npmjs.org/package/vue-awesome-picker" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="https://img.shields.io/npm/v/vue-awesome-picker.svg?style=flat" src="https://static.alili.techhttps://img.shields.io/npm/v/vue-awesome-picker.svg?style=flat" alt="NPM Version" title="NPM Version" style="cursor: pointer; display: inline;"></span></a> <a href="https://npmjs.org/package/vue-awesome-picker" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="https://img.shields.io/npm/dt/vue-awesome-picker.svg?style=flat" src="https://static.alili.techhttps://img.shields.io/npm/dt/vue-awesome-picker.svg?style=flat" alt="NPM Downloads" title="NPM Downloads" style="cursor: pointer; display: inline;"></span></a>
</h1>
<p>基于 <a href="https://github.com/vuejs/vue" rel="nofollow noreferrer" target="_blank">Vue.js</a> &amp; <a href="https://github.com/ustbhuangyi/better-scroll" rel="nofollow noreferrer" target="_blank">Better-Scroll</a> 的移动端 picker 组件</p>
<h2 id="articleHeader1">Features</h2>
<ul>
<li>支持单列、多列和联级数据</li>
<li>内置时间、日期数据</li>
<li>滚轮 3D 效果</li>
<li>颜色可配置</li>
</ul>
<h2 id="articleHeader2">Demo</h2>
<blockquote>PS：Demo 已启用 Service Worker 试试离线访问吧</blockquote>
<p><a href="https://fyerl.github.io/vue-awesome-picker/" rel="nofollow noreferrer" target="_blank">点击查看 &gt;&gt;</a></p>
<p><span class="img-wrap"><img data-src="https://github.com/fyerl/vue-awesome-picker/raw/master/static/img/qr-code.png" src="https://static.alili.techhttps://github.com/fyerl/vue-awesome-picker/raw/master/static/img/qr-code.png" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader3">Installation</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install vue-awesome-picker --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm install vue-awesome-picker --save</code></pre>
<h2 id="articleHeader4">Usage</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* main.js */
import AwesomePicker from 'vue-awesome-picker';
Vue.use(AwesomePicker);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/* main.js */</span>
<span class="hljs-keyword">import</span> AwesomePicker <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-awesome-picker'</span>;
Vue.use(AwesomePicker);</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 详细使用方法参照源码 App.vue */
<awesome-picker
  ref=&quot;picker&quot;
  :data=&quot;picker.data&quot;
  :anchor=&quot;picker.anchor&quot;
  :textTitle=&quot;picker.textTitle&quot;
  :textConfirm=&quot;picker.textConfirm&quot;
  :textCancel=&quot;picker.textCancel&quot;
  :colorTitle=&quot;picker.colorTitle&quot;
  :colorConfirm=&quot;picker.colorConfirm&quot;
  :colorCancel=&quot;picker.colorCancel&quot;
  :swipeTime=&quot;picker.swipeTime&quot;
  @cancel=&quot;handlePickerCancel&quot;
  @confirm=&quot;handlePickerConfirm&quot;>
</awesome-picker>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/* 详细使用方法参照源码 App.vue */</span>
&lt;awesome-picker
  ref=<span class="hljs-string">"picker"</span>
  :data=<span class="hljs-string">"picker.data"</span>
  :anchor=<span class="hljs-string">"picker.anchor"</span>
  :textTitle=<span class="hljs-string">"picker.textTitle"</span>
  :textConfirm=<span class="hljs-string">"picker.textConfirm"</span>
  :textCancel=<span class="hljs-string">"picker.textCancel"</span>
  :colorTitle=<span class="hljs-string">"picker.colorTitle"</span>
  :colorConfirm=<span class="hljs-string">"picker.colorConfirm"</span>
  :colorCancel=<span class="hljs-string">"picker.colorCancel"</span>
  :swipeTime=<span class="hljs-string">"picker.swipeTime"</span>
  @cancel=<span class="hljs-string">"handlePickerCancel"</span>
  @confirm=<span class="hljs-string">"handlePickerConfirm"</span>&gt;
<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">awesome-picker</span>&gt;</span></span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="methods: {
  show() {
    this.$refs.picker.show();
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">methods: {
  show() {
    <span class="hljs-keyword">this</span>.$refs.picker.show();
  }
}</code></pre>
<h2 id="articleHeader5">Props</h2>
<table>
<thead><tr>
<th>参数</th>
<th>描述</th>
<th>可选</th>
<th>类型</th>
<th>默认</th>
</tr></thead>
<tbody>
<tr>
<td>data</td>
<td>详细描述见下文</td>
<td> </td>
<td>Array</td>
<td> </td>
</tr>
<tr>
<td>anchor</td>
<td>详细描述见下文</td>
<td> </td>
<td>Array</td>
<td> </td>
</tr>
<tr>
<td>type</td>
<td>内置 picker 类型<br>无需传入 data</td>
<td>date, time</td>
<td>String</td>
<td> </td>
</tr>
<tr>
<td>textTitle</td>
<td>title 文案</td>
<td> </td>
<td>String</td>
<td> </td>
</tr>
<tr>
<td>textConfirm</td>
<td>confirm 文案</td>
<td> </td>
<td>String</td>
<td>确定</td>
</tr>
<tr>
<td>textCancel</td>
<td>cancel 文案</td>
<td> </td>
<td>String</td>
<td>取消</td>
</tr>
<tr>
<td>colorTitle</td>
<td>title 颜色</td>
<td> </td>
<td>String</td>
<td>#000000</td>
</tr>
<tr>
<td>colorConfirm</td>
<td>confirm 颜色</td>
<td> </td>
<td>String</td>
<td>#42b983</td>
</tr>
<tr>
<td>colorCancel</td>
<td>cancel 颜色</td>
<td> </td>
<td>String</td>
<td>#999999</td>
</tr>
<tr>
<td>swipeTime</td>
<td>滚动速度(<a href="https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/options.html#swipetime" rel="nofollow noreferrer" target="_blank">better-scroll swipeTime</a>)</td>
<td> </td>
<td>Number</td>
<td>1800</td>
</tr>
</tbody>
</table>
<h3 id="articleHeader6">data</h3>
<blockquote>vue-awesome-picker 通过数据结构不同来区分是普通 picker 还是联级 picker, 所以请严格按照以下数据结构进行配置</blockquote>
<p>单列、多列 picker 以双层数组的形式传入 data</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[
  ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's','t', 'u', 'v', 'w', 'x', 'y', 'z'],
  ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S','T', 'U', 'V', 'W', 'X', 'Y', 'Z']
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">[
  [<span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>, <span class="hljs-string">'c'</span>, <span class="hljs-string">'d'</span>, <span class="hljs-string">'e'</span>, <span class="hljs-string">'f'</span>, <span class="hljs-string">'g'</span>, <span class="hljs-string">'h'</span>, <span class="hljs-string">'i'</span>, <span class="hljs-string">'j'</span>, <span class="hljs-string">'k'</span>, <span class="hljs-string">'l'</span>, <span class="hljs-string">'m'</span>, <span class="hljs-string">'n'</span>, <span class="hljs-string">'o'</span>, <span class="hljs-string">'p'</span>, <span class="hljs-string">'q'</span>, <span class="hljs-string">'r'</span>, <span class="hljs-string">'s'</span>,<span class="hljs-string">'t'</span>, <span class="hljs-string">'u'</span>, <span class="hljs-string">'v'</span>, <span class="hljs-string">'w'</span>, <span class="hljs-string">'x'</span>, <span class="hljs-string">'y'</span>, <span class="hljs-string">'z'</span>],
  [<span class="hljs-string">'A'</span>, <span class="hljs-string">'B'</span>, <span class="hljs-string">'C'</span>, <span class="hljs-string">'D'</span>, <span class="hljs-string">'E'</span>, <span class="hljs-string">'F'</span>, <span class="hljs-string">'G'</span>, <span class="hljs-string">'H'</span>, <span class="hljs-string">'I'</span>, <span class="hljs-string">'J'</span>, <span class="hljs-string">'K'</span>, <span class="hljs-string">'L'</span>, <span class="hljs-string">'M'</span>, <span class="hljs-string">'N'</span>, <span class="hljs-string">'O'</span>, <span class="hljs-string">'P'</span>, <span class="hljs-string">'Q'</span>, <span class="hljs-string">'R'</span>, <span class="hljs-string">'S'</span>,<span class="hljs-string">'T'</span>, <span class="hljs-string">'U'</span>, <span class="hljs-string">'V'</span>, <span class="hljs-string">'W'</span>, <span class="hljs-string">'X'</span>, <span class="hljs-string">'Y'</span>, <span class="hljs-string">'Z'</span>]
]</code></pre>
<p>联级 picker 通过 children 构造出具有层级关系的数据</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[
  {
    value: 'A',
    children: [
      { value: 'A-a' },
      { value: 'A-b' },
      { value: 'A-c' }
    ]
  },
  {
    value: 'B',
    children: [
      { value: 'B-a' },
      { value: 'B-b' }
    ]
  },
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">[
  {
    <span class="hljs-attr">value</span>: <span class="hljs-string">'A'</span>,
    <span class="hljs-attr">children</span>: [
      { <span class="hljs-attr">value</span>: <span class="hljs-string">'A-a'</span> },
      { <span class="hljs-attr">value</span>: <span class="hljs-string">'A-b'</span> },
      { <span class="hljs-attr">value</span>: <span class="hljs-string">'A-c'</span> }
    ]
  },
  {
    <span class="hljs-attr">value</span>: <span class="hljs-string">'B'</span>,
    <span class="hljs-attr">children</span>: [
      { <span class="hljs-attr">value</span>: <span class="hljs-string">'B-a'</span> },
      { <span class="hljs-attr">value</span>: <span class="hljs-string">'B-b'</span> }
    ]
  },
]</code></pre>
<h3 id="articleHeader7">anchor</h3>
<blockquote>anchor 是 picker 展开时每一列默认滚动的锚点位置或值的数组, 兼容两种数据结构, 未匹配到默认选中第0项</blockquote>
<p>[推荐]数组对象形式: 与事件 confirm 返回的参数数据结构相同, 对象里可以只存在 index 或 value, 当存在 index 时优先匹配 index</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[
  { 
    index: 0,
    value: 'A'
  },
  {
    index: 0,
    value: 'A-a'
  } 
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">[
  { 
    <span class="hljs-attr">index</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">value</span>: <span class="hljs-string">'A'</span>
  },
  {
    <span class="hljs-attr">index</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">value</span>: <span class="hljs-string">'A-a'</span>
  } 
]</code></pre>
<p>单层数组形式: index 组成的数组</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[0, 0]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">[<span class="hljs-number">0</span>, <span class="hljs-number">0</span>]</code></pre>
<h2 id="articleHeader8">Methods</h2>
<table>
<thead><tr>
<th>方法</th>
<th>描述</th>
</tr></thead>
<tbody><tr>
<td>show</td>
<td>展开显示 picker</td>
</tr></tbody>
</table>
<h2 id="articleHeader9">Events</h2>
<table>
<thead><tr>
<th>事件</th>
<th>描述</th>
<th>参数</th>
</tr></thead>
<tbody>
<tr>
<td>confirm</td>
<td>点击 confirm 按钮后触发</td>
<td>[{ index: xxx, value: xxx }...] <br> index: 当前选中的 item 在当列的 index <br> value: 当前选中 item 的 value</td>
</tr>
<tr>
<td>cancel</td>
<td>点击 cancel 按钮后触发</td>
<td> </td>
</tr>
</tbody>
</table>
<h2 id="articleHeader10">Development</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git clone git@github.com:Fyerl/vue-awesome-picker.git
cd vue-awesome-picker
npm install
npm run dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">git <span class="hljs-built_in">clone</span> git@github.com:Fyerl/vue-awesome-picker.git
<span class="hljs-built_in">cd</span> vue-awesome-picker
npm install
npm run dev</code></pre>
<p><em>keywords for seo: js picker, 前端 picker, datepicker, timepicker, vue, picker, vue picker, vue awesome picker, service worker, pwa, vue pwa, npm, vue npm</em></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于 vue 的 picker 组件 vue-awesome-picker

## 原文链接
[https://segmentfault.com/a/1190000013696869](https://segmentfault.com/a/1190000013696869)

