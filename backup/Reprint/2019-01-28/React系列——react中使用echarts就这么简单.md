---
title: 'React系列——react中使用echarts就这么简单' 
date: 2019-01-28 2:30:09
hidden: true
slug: 7mrz66muqqn
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">我们真的需要react-echarts插件吗？</h3>
<h3 id="articleHeader1">NO！！！</h3>
<p><strong>在这里，我使用echarts提供的模块化加载方式，实现了几个react-echarts图表组件：<a href="http://setcamp.tech" rel="nofollow noreferrer" target="_blank">react-echarts图表在线渲染查看</a></strong></p>
<p>你可以打开控制台，观察每个图表组件的加载情况。</p>
<p>但是，如果你认为仅仅是模块导入echarts的tooltip、grid这些插件就完事了，那么我也用不着写这篇文章分享了，下面会讲到另外一种异步加载方式。</p>
<p>导入echarts，最烦人的是什么？配置option是其一，其二就是极其庞大的echarts！特别是管理后台使用到echarts的时候，如果需要同个页面展示数十种图表类型，你就该好好考虑性能问题了。</p>
<h3 id="articleHeader2">插件版本号</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &quot;echarts&quot;: &quot;^3.6.2&quot;,
  &quot;react&quot;: &quot;^15.6.1&quot;,
  &quot;react-dom&quot;: &quot;^15.6.1&quot;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code>  <span class="hljs-string">"echarts"</span>: <span class="hljs-string">"^3.6.2"</span>,
  <span class="hljs-string">"react"</span>: <span class="hljs-string">"^15.6.1"</span>,
  <span class="hljs-string">"react-dom"</span>: <span class="hljs-string">"^15.6.1"</span>
</code></pre>
<h3 id="articleHeader3">实现了哪些图表组件</h3>
<p>1、饼图<br>2、柱状图<br>3、折线图<br>4、散点图<br>5、地图<br>6、雷达图<br>7、k线图</p>
<h3 id="articleHeader4">我们不总是需要插件</h3>
<p>实现这些echarts-react组件的目的，是告诉大家，react可以不需要引入第三方插件，使用echarts，不要惧怕react组件！</p>
<p>看过很多人说react难写，因为他们习惯了在jQuery开发模式下导入echarts、swiper、d3等插件。而突然切换到react中，就产生了不知所措的感觉。<br>如何在react中导入第三方插件，成为了他们心中的痛点，所以一些人就认为需要别人封装好的echarts-react插件或者其他react插件，才能使用，这种想法是错的。</p>
<h3 id="articleHeader5">echarts体积太大，使用模块化加载</h3>
<p>以柱状图为例子，我们根据需要渲染的插件采取模块导入，不渲染的组件不导入，最大程度减小js。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import echarts from 'echarts/lib/echarts' //必须
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/grid'
import 'echarts/lib/chart/bar'
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crystal"><code>import echarts from <span class="hljs-string">'echarts/lib/echarts'</span> /<span class="hljs-regexp">/必须
import 'echarts/lib</span><span class="hljs-regexp">/component/tooltip</span><span class="hljs-string">'
import '</span>echarts/<span class="hljs-class"><span class="hljs-keyword">lib</span>/<span class="hljs-title">component</span>/<span class="hljs-title">grid</span>'</span>
import <span class="hljs-string">'echarts/lib/chart/bar'</span>
</code></pre>
<h3 id="articleHeader6">组件化开发的福音，react组件模块化加载</h3>
<p>demo中采用单个echarts组件异步打包加载的模式，因为echarts组件普遍偏大，即使压缩也效果不明显，所以异步加载是最好的方式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { pieOption, barOption, lineOption, scatterOption, mapOption, radarOption, candlestickOption } from './optionConfig/options'
const PieReact = asyncComponent(() => import(/* webpackChunkName: &quot;PieReact&quot; */'./EchartsDemo/PieReact'))  //饼图组件
const BarReact = asyncComponent(() => import(/* webpackChunkName: &quot;BarReact&quot; */'./EchartsDemo/BarReact')) //柱状图组件
const LineReact = asyncComponent(() => import(/* webpackChunkName: &quot;LineReact&quot; */'./EchartsDemo/LineReact'))  //折线图组件
const ScatterReact = asyncComponent(() => import(/* webpackChunkName: &quot;ScatterReact&quot; */'./EchartsDemo/ScatterReact'))  //散点图组件
const MapReact = asyncComponent(() => import(/* webpackChunkName: &quot;MapReact&quot; */'./EchartsDemo/MapReact'))  //地图组件
const RadarReact = asyncComponent(() => import(/* webpackChunkName: &quot;RadarReact&quot; */'./EchartsDemo/RadarReact')) //雷达图组件
const CandlestickReact = asyncComponent(() => import(/* webpackChunkName: &quot;CandlestickReact&quot; */'./EchartsDemo/CandlestickReact')) //k线图组件
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> { pieOption, barOption, lineOption, scatterOption, mapOption, radarOption, candlestickOption } <span class="hljs-keyword">from</span> <span class="hljs-string">'./optionConfig/options'</span>
<span class="hljs-keyword">const</span> PieReact = asyncComponent(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-comment">/* webpackChunkName: "PieReact" */</span><span class="hljs-string">'./EchartsDemo/PieReact'</span>))  <span class="hljs-comment">//饼图组件</span>
<span class="hljs-keyword">const</span> BarReact = asyncComponent(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-comment">/* webpackChunkName: "BarReact" */</span><span class="hljs-string">'./EchartsDemo/BarReact'</span>)) <span class="hljs-comment">//柱状图组件</span>
<span class="hljs-keyword">const</span> LineReact = asyncComponent(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-comment">/* webpackChunkName: "LineReact" */</span><span class="hljs-string">'./EchartsDemo/LineReact'</span>))  <span class="hljs-comment">//折线图组件</span>
<span class="hljs-keyword">const</span> ScatterReact = asyncComponent(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-comment">/* webpackChunkName: "ScatterReact" */</span><span class="hljs-string">'./EchartsDemo/ScatterReact'</span>))  <span class="hljs-comment">//散点图组件</span>
<span class="hljs-keyword">const</span> MapReact = asyncComponent(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-comment">/* webpackChunkName: "MapReact" */</span><span class="hljs-string">'./EchartsDemo/MapReact'</span>))  <span class="hljs-comment">//地图组件</span>
<span class="hljs-keyword">const</span> RadarReact = asyncComponent(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-comment">/* webpackChunkName: "RadarReact" */</span><span class="hljs-string">'./EchartsDemo/RadarReact'</span>)) <span class="hljs-comment">//雷达图组件</span>
<span class="hljs-keyword">const</span> CandlestickReact = asyncComponent(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-comment">/* webpackChunkName: "CandlestickReact" */</span><span class="hljs-string">'./EchartsDemo/CandlestickReact'</span>)) <span class="hljs-comment">//k线图组件</span>
</code></pre>
<h3 id="articleHeader7">启动项目</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//安装
npm install

//启动
npm start
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code><span class="hljs-comment">//安装</span>
npm install

<span class="hljs-comment">//启动</span>
npm start
</code></pre>
<h3 id="articleHeader8">打包项目</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run build
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>npm <span class="hljs-keyword">run</span><span class="bash"> build
</span></code></pre>
<h3 id="articleHeader9">实现方案介绍</h3>
<p>1、每个图表单独封装成一个组件，通过参数传递数据，你会发现，图表内部代码几乎完全一样，只有import的类型不同。</p>
<p>2、异步加载是提高图表加载性能的最佳方式，不管是服务端还是客户端渲染。</p>
<p>3、在这些demo中，我认为对你来说最有价值的是react组件异步加载模式，很多人异步加载组件是通过拆分路由的方式，而非路由组件的异步加载，并不多人去尝试。但我想告诉你的是，<br>非路由组件的异步加载会将你的庞大的父组件拆分的更细，体积更小，加载的更加流畅。</p>
<p>===&gt; <a href="https://github.com/hyy1115/react-echarts-modules" rel="nofollow noreferrer" target="_blank">去往github查看react异步加载echarts源码</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React系列——react中使用echarts就这么简单

## 原文链接
[https://segmentfault.com/a/1190000008049240](https://segmentfault.com/a/1190000008049240)

