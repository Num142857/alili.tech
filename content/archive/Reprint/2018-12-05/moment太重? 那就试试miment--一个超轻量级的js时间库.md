---
title: 'moment太重? 那就试试miment--一个超轻量级的js时间库' 
date: 2018-12-05 2:30:09
hidden: true
slug: 8vjwewuaamp
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">介绍</h3>
<p>Miment 是一个轻量级的时间库（打包压缩后只有1K）,没有太多的方法，<br>Miment的设计理念就是让你以几乎为零的成本快速上手，无需一遍一遍的撸文档</p>
<h3 id="articleHeader1">由来</h3>
<p>首先 致敬一下Moment，非常好用的一个时间库，我本身也是Moment重度使用者，用习惯了Moment,<br>一碰到需要处理时间的需求，立马Moment,不过有时候想想，Moment给我们提供了那么多的功能，但是我们天天用的，<br>也就那么一两个，刚好最近在写微信小程序，然后在页面引入Moment，打包完，包竟然大了200多K，把Moment去掉，<br>就直接少掉200多K,反复试了好几次，确定一个Moment在小程序里面，占用大概200K的空间，于是就想自己写一个类似<br>Moment的精简的时间库，于是就有了这个，为什么要叫Miment呢，其实刚开始我是想叫Mini-Moment的，<br>但是考虑到以后可能会经常使用到，打2个单词中间还要加一个下划线太累了，所以就把Mini-Moment缩水成Miment了。</p>
<h3 id="articleHeader2">开始使用</h3>
<p>如果你是直接在浏览器里面使用，请下载<code>./dist/miment-min.js</code>到你的项目里面去，然后在页面引入后即可直接使用miment</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
<script src='你js存放的目录/miment-min.js'> </script>
<script>
    miment().format()  //  2018-04-09 23:01:58 这是我写这篇文档的时候，运行代码显示的时间
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">'你js存放的目录/miment-min.js'</span>&gt;</span><span class="undefined"> </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    miment().format()  <span class="hljs-comment">//  2018-04-09 23:01:58 这是我写这篇文档的时候，运行代码显示的时间</span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>如果你是在单页面应用或者nodejs环境下使用,首先你需要使用安装一下Miment</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i miment
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>npm <span class="hljs-selector-tag">i</span> miment
</code></pre>
<p>或者</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn add miment
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>yarn <span class="hljs-keyword">add</span><span class="bash"> miment
</span></code></pre>
<p>然后就可以在你的项目中使用了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import miment from 'miment'
miment().format()
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>import miment from <span class="hljs-string">'miment'</span>
<span class="hljs-function"><span class="hljs-title">miment</span><span class="hljs-params">()</span></span>.format()
</code></pre>
<h3 id="articleHeader3">API</h3>
<blockquote>你也可以猛戳这里看<a href="https://noahlam.github.io/Miment/" rel="nofollow noreferrer" target="_blank">example</a>
</blockquote>
<p><strong>API 分为3大类</strong></p>
<p>第一类是返回其他对象的，比如format，返回的是字符串  json返回的是一个josn</p>
<p>第二类是返回miment对象的，你可以在调完一个api后面继续调用另一个api,也就是我们所说的链式调用  </p>
<p>第三类是从Date对象继承的，也就是说Date对象有的方法，miment也同样有，该类方法建议尽量少用</p>
<h4>第一类</h4>
<ol>
<li>
<p><code>format</code> <strong>格式化时间</strong> ,format方法也就是我们平时最常用的一个了，他一共接收2个参数，这2个参数都有默认值，不传就使用默认值</p>
<table>
<thead><tr>
<th>参数名称</th>
<th>参数类型</th>
<th>参数默认值</th>
<th>是否必传</th>
<th>说明</th>
</tr></thead>
<tbody>
<tr>
<td>格式化的字符串</td>
<td>string</td>
<td>'YYYY-MM-DD hh:mm:ss'</td>
<td>N</td>
<td>年YYYY,月MM,日DD,时hh,分mm,秒ss,毫秒SSS,数字星期ww,中文星期WW</td>
</tr>
<tr>
<td>是否是格式化一个时间差</td>
<td>boolean</td>
<td>false</td>
<td>N</td>
<td>比如你要计算的时间是一个倒计时，这个时候也就需要传true</td>
</tr>
</tbody>
</table>
<blockquote>本着简单的原则，这里格式化方式没有做的太灵活,有时候灵活也是一种学习成本，因为你需要记很多的用法，不是吗？,<br><strong>注意</strong>格式化字符串区分大小写，记的技巧是大的单位大写 YYYY MM DD，小的单位小写 hh mm ss 毫秒跟星期特殊的单独记，<br>参数必须严格按照说明里面的填写，多一个或者少一个都认不到，比如YYYY写成YYY或者YY这样是识别不了的<p>第二个参数的用法可以参考 distance函数</p>
</blockquote>
<p>示例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="miment().format('YYYY年MM月DD日 hh:mm:ss')  // 2018-04-09 23:49:36
miment().format('YYYY/MM/DD hh-mm-ss SSS') // 2018/04/09 23-49-36 568
miment().format('YYYY年MM月DD日 星期WW')     // 2018年04月09日 星期一
miment().format('YYYY年MM月DD日 星期ww')     // 2018年04月09日 星期1 (星期日这边会显示星期0)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">miment</span><span class="hljs-params">()</span></span>.format(<span class="hljs-string">'YYYY年MM月DD日 hh:mm:ss'</span>)  <span class="hljs-comment">// 2018-04-09 23:49:36</span>
<span class="hljs-function"><span class="hljs-title">miment</span><span class="hljs-params">()</span></span>.format(<span class="hljs-string">'YYYY/MM/DD hh-mm-ss SSS'</span>) <span class="hljs-comment">// 2018/04/09 23-49-36 568</span>
<span class="hljs-function"><span class="hljs-title">miment</span><span class="hljs-params">()</span></span>.format(<span class="hljs-string">'YYYY年MM月DD日 星期WW'</span>)     <span class="hljs-comment">// 2018年04月09日 星期一</span>
<span class="hljs-function"><span class="hljs-title">miment</span><span class="hljs-params">()</span></span>.format(<span class="hljs-string">'YYYY年MM月DD日 星期ww'</span>)     <span class="hljs-comment">// 2018年04月09日 星期1 (星期日这边会显示星期0)</span>
</code></pre>
<p>扩展一下，如果我们只是想获取年份或者月份或者日，可以这样用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="miment().format('YYYY')   // 2018
miment().format('MM')     // 04
miment().format('DD')     // 09
miment().format('hh')     // 23
miment().format('mm')     // 57
miment().format('ss')     // 16
miment().format('SSS')    // 063
miment().format('ww')     // 1
miment().format('WW')     // 一
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">miment</span><span class="hljs-params">()</span></span>.format(<span class="hljs-string">'YYYY'</span>)   <span class="hljs-comment">// 2018</span>
<span class="hljs-function"><span class="hljs-title">miment</span><span class="hljs-params">()</span></span>.format(<span class="hljs-string">'MM'</span>)     <span class="hljs-comment">// 04</span>
<span class="hljs-function"><span class="hljs-title">miment</span><span class="hljs-params">()</span></span>.format(<span class="hljs-string">'DD'</span>)     <span class="hljs-comment">// 09</span>
<span class="hljs-function"><span class="hljs-title">miment</span><span class="hljs-params">()</span></span>.format(<span class="hljs-string">'hh'</span>)     <span class="hljs-comment">// 23</span>
<span class="hljs-function"><span class="hljs-title">miment</span><span class="hljs-params">()</span></span>.format(<span class="hljs-string">'mm'</span>)     <span class="hljs-comment">// 57</span>
<span class="hljs-function"><span class="hljs-title">miment</span><span class="hljs-params">()</span></span>.format(<span class="hljs-string">'ss'</span>)     <span class="hljs-comment">// 16</span>
<span class="hljs-function"><span class="hljs-title">miment</span><span class="hljs-params">()</span></span>.format(<span class="hljs-string">'SSS'</span>)    <span class="hljs-comment">// 063</span>
<span class="hljs-function"><span class="hljs-title">miment</span><span class="hljs-params">()</span></span>.format(<span class="hljs-string">'ww'</span>)     <span class="hljs-comment">// 1</span>
<span class="hljs-function"><span class="hljs-title">miment</span><span class="hljs-params">()</span></span>.format(<span class="hljs-string">'WW'</span>)     <span class="hljs-comment">// 一</span>
</code></pre>
<p>所以，有了这个方法，其实你可以不需要去记大部分原生的方法（getFUllYear,getDate,getDay...）,所有的需求一个format搞定，<br>这就是我们追求的极简，当然，也会有一丢丢的性能损失，不过个人觉得对于当今的硬件设备，你完全可以忽略这一点点性能。除非你的项目很特殊。</p>
</li>
<li>
<p><code>json</code> <strong>输出json格式的时间</strong>,不需要参数</p>
<p>直接上代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="miment().json()
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">miment</span><span class="hljs-params">()</span></span>.json()
</code></pre>
<p>看输出</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;year&quot;: 2018,
    &quot;month&quot;: 4,
    &quot;date&quot;: 11,
    &quot;hour&quot;: 8,
    &quot;minute&quot;: 57,
    &quot;second&quot;: 41,
    &quot;day&quot;: 3,
    &quot;milliSecond&quot;: 87
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
    <span class="hljs-attr">"year"</span>: <span class="hljs-number">2018</span>,
    <span class="hljs-attr">"month"</span>: <span class="hljs-number">4</span>,
    <span class="hljs-attr">"date"</span>: <span class="hljs-number">11</span>,
    <span class="hljs-attr">"hour"</span>: <span class="hljs-number">8</span>,
    <span class="hljs-attr">"minute"</span>: <span class="hljs-number">57</span>,
    <span class="hljs-attr">"second"</span>: <span class="hljs-number">41</span>,
    <span class="hljs-attr">"day"</span>: <span class="hljs-number">3</span>,
    <span class="hljs-attr">"milliSecond"</span>: <span class="hljs-number">87</span>
}
</code></pre>
<p>输出内容比较简单，应该很好理解，这里就不对输出做介绍了，day返回的是星期几，从0-星期天 1-星期一，以此类推</p>
</li>
<li>
<p><code>stamp</code> <strong>输出时间戳</strong>,不需要参数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="miment().stamp()
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">miment</span><span class="hljs-params">()</span></span>.stamp()
</code></pre>
<p>看输出</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1523408529932
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">1523408529932</span>
</code></pre>
<p>会输出一串代表当前时间的数字，这个对前端基本没啥用，不过有时候后端的同学会要求传这个</p>
</li>
<li>
<p><code>daysInMonth</code> <strong>获取当前月的天数</strong>,不需要参数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  miment().daysInMonth()   // 30
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>  <span class="hljs-selector-tag">miment</span>()<span class="hljs-selector-class">.daysInMonth</span>()   <span class="hljs-comment">// 30</span>
</code></pre>
</li>
</ol>
<h4>第二类</h4>
<ol>
<li>
<p><code>add</code> <strong>增加或减少时间</strong>,它接收2个参数</p>
<table>
<thead><tr>
<th>参数名称</th>
<th>参数类型</th>
<th>参数默认值</th>
<th>是否必传</th>
<th>说明</th>
</tr></thead>
<tbody>
<tr>
<td>增量</td>
<td>number</td>
<td>0</td>
<td>N</td>
<td>要增加的时间量，增加传正数，减少传负数</td>
</tr>
<tr>
<td>增量单位</td>
<td>string</td>
<td>无默认值</td>
<td>Y</td>
<td>要增加的时间单位，可选有YYYY MM DD hh mm ss SSS ww WW</td>
</tr>
</tbody>
</table>
<blockquote>单位 的可选参数跟格式化方法<code>format</code>的类似，这么做也是为了方便记忆，只需要记一套方案<p><strong>同样地</strong> 单位也区分大小写，记的技巧是大的单位大写 YYYY MM DD，小的单位小写 hh mm ss 毫秒跟星期特殊的单独记，<br>参数必须严格按照说明里面的填写，多一个或者少一个都认不到，比如YYYY写成YYY或者YY这样是识别不了的</p>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="miment().add(1,'DD')  // 增加一天
miment().add(1,'YYYY').add(2,'MM').add(-3,'DD')  // 增加1年2个月又减回去3天
miment().add(-1,'ww')  // 减去一周 --即获取上周的日期
miment().add(500,SSS)  // 增加500毫秒
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">miment</span><span class="hljs-params">()</span></span>.add(<span class="hljs-number">1</span>,<span class="hljs-string">'DD'</span>)  <span class="hljs-comment">// 增加一天</span>
<span class="hljs-function"><span class="hljs-title">miment</span><span class="hljs-params">()</span></span>.add(<span class="hljs-number">1</span>,<span class="hljs-string">'YYYY'</span>).add(<span class="hljs-number">2</span>,<span class="hljs-string">'MM'</span>).add(-<span class="hljs-number">3</span>,<span class="hljs-string">'DD'</span>)  <span class="hljs-comment">// 增加1年2个月又减回去3天</span>
<span class="hljs-function"><span class="hljs-title">miment</span><span class="hljs-params">()</span></span>.add(-<span class="hljs-number">1</span>,<span class="hljs-string">'ww'</span>)  <span class="hljs-comment">// 减去一周 --即获取上周的日期</span>
<span class="hljs-function"><span class="hljs-title">miment</span><span class="hljs-params">()</span></span>.add(<span class="hljs-number">500</span>,SSS)  <span class="hljs-comment">// 增加500毫秒</span>
</code></pre>
<p>add返回的值是增加完后的miment对象，所以我们可以在它后面继续调用miment有的方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="miment().add(1,'DD').format()   // 我测试的时候，打印的是 2018-04-12 09:29:55
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">miment</span>()<span class="hljs-selector-class">.add</span>(<span class="hljs-number">1</span>,<span class="hljs-string">'DD'</span>)<span class="hljs-selector-class">.format</span>()   <span class="hljs-comment">// 我测试的时候，打印的是 2018-04-12 09:29:55</span>
</code></pre>
<p>需要注意的是，当你调完<code>第一类</code>的方法以后，返回的就不是miment对象了，比如<code>format</code>返回的是一个字符串，这个时候你就不能再调用miment上的方法了，<br>会报错 <code>Uncaught TypeError: miment(...).format(...).xxx is not a function</code>  因为字符串的原型上面没有这个方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="miment().add(1,'DD').format().add(1,'DD')  // 报错
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">miment</span>()<span class="hljs-selector-class">.add</span>(<span class="hljs-number">1</span>,<span class="hljs-string">'DD'</span>)<span class="hljs-selector-class">.format</span>()<span class="hljs-selector-class">.add</span>(<span class="hljs-number">1</span>,<span class="hljs-string">'DD'</span>)  <span class="hljs-comment">// 报错</span>
</code></pre>
</li>
<li>
<p><code>distance</code> <strong>计算2个时间的距离</strong> 接收2个参数，返回一个miment对象</p>
<table>
<thead><tr>
<th>参数名称</th>
<th>参数类型</th>
<th>参数默认值</th>
<th>是否必传</th>
<th>说明</th>
</tr></thead>
<tbody>
<tr>
<td>起始时间</td>
<td>miment/date/number/string</td>
<td>无</td>
<td>Y</td>
<td>接受4种类型参数，会自动转换</td>
</tr>
<tr>
<td>结束时间</td>
<td>miment/date/number/string</td>
<td>无</td>
<td>N</td>
<td>同上</td>
</tr>
</tbody>
</table>
<blockquote>只传一个起始时间的时候，返回 <strong>起始时间 - miment当前时间</strong><p>起始时间和结束时间都有传的时候，返回 <strong>起始时间 - 结束时间</strong></p>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="miment().distance('2018-04-10 00:00:00')  // Mon Dec 29 1969 22:11:51 GMT+0800 (CST)
miment().distance(1523408529932)          // Wed Dec 31 1969 07:13:47 GMT+0800 (CST)

miment().distance('2018-04-10 00:00:00', new Date())  //Mon Dec 29 1969 22:11:13 GMT+0800 (CST)
miment().distance('2018-04-10 00:00:00', '2018-04-11 00:00:00')  //Mon Dec 29 1969 22:10:46 GMT+0800 (CST)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">miment</span><span class="hljs-params">()</span></span>.distance(<span class="hljs-string">'2018-04-10 00:00:00'</span>)  <span class="hljs-comment">// Mon Dec 29 1969 22:11:51 GMT+0800 (CST)</span>
<span class="hljs-function"><span class="hljs-title">miment</span><span class="hljs-params">()</span></span>.distance(<span class="hljs-number">1523408529932</span>)          <span class="hljs-comment">// Wed Dec 31 1969 07:13:47 GMT+0800 (CST)</span>

<span class="hljs-function"><span class="hljs-title">miment</span><span class="hljs-params">()</span></span>.distance(<span class="hljs-string">'2018-04-10 00:00:00'</span>, new Date())  <span class="hljs-comment">//Mon Dec 29 1969 22:11:13 GMT+0800 (CST)</span>
<span class="hljs-function"><span class="hljs-title">miment</span><span class="hljs-params">()</span></span>.distance(<span class="hljs-string">'2018-04-10 00:00:00'</span>, <span class="hljs-string">'2018-04-11 00:00:00'</span>)  <span class="hljs-comment">//Mon Dec 29 1969 22:10:46 GMT+0800 (CST)</span>
</code></pre>
<p>你一定注意到了，distance方法返回的时间，竟然都是1969年的？ 这实际上是基于1970-01-01 00:00:00的一个毫秒数，<br>具体请看 <a href="https://baike.baidu.com/item/UNIX%E6%97%B6%E9%97%B4/8932323" rel="nofollow noreferrer" target="_blank">百度百科-unix时间</a>,<br>而我们把两个时间相减，得到的可能是一个相对来说很小的数(还有可能是负数)，所以离1970很近</p>
<p>那我们要怎么显示我们能看得懂的时间呢？ 很简单 用格式化时间函数format,还记得format函数的第二个参数吗？<br>就是专门用来格式化distance计算出来的时间差，只要把第二个参数设为true,就能把当前时间格式化成时间差<br>我们先来看看第二个参数不传，或者传false的时候是什么样子的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="miment().distance(1523408529932).format('YYYY年MM月DD日 hh时mm分ss秒')        // 1969年12月30日 00时52分16秒
miment().distance(1523408529932).format('YYYY年MM月DD日 hh时mm分ss秒',false)  // 1969年12月30日 00时52分16秒
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">miment</span>()<span class="hljs-selector-class">.distance</span>(<span class="hljs-number">1523408529932</span>)<span class="hljs-selector-class">.format</span>(<span class="hljs-string">'YYYY年MM月DD日 hh时mm分ss秒'</span>)        <span class="hljs-comment">// 1969年12月30日 00时52分16秒</span>
<span class="hljs-selector-tag">miment</span>()<span class="hljs-selector-class">.distance</span>(<span class="hljs-number">1523408529932</span>)<span class="hljs-selector-class">.format</span>(<span class="hljs-string">'YYYY年MM月DD日 hh时mm分ss秒'</span>,false)  <span class="hljs-comment">// 1969年12月30日 00时52分16秒</span>
</code></pre>
<p>然后我们把第二个参数设为true</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="miment().distance(1523408529932).format('YYYY年MM月DD日 hh时mm分ss秒',true)  // 00年01月03日 23时08分23秒

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">miment</span>()<span class="hljs-selector-class">.distance</span>(<span class="hljs-number">1523408529932</span>)<span class="hljs-selector-class">.format</span>(<span class="hljs-string">'YYYY年MM月DD日 hh时mm分ss秒'</span>,true)  <span class="hljs-comment">// 00年01月03日 23时08分23秒</span>

</code></pre>
</li>
<li>
<p><code>firstDayOfWeek</code> <strong>获取 本周的第一天(周日)</strong>  不需要参数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  miment().firstDayOfWeek()           // Sun Apr 08 2018 11:27:55 GMT+0800 (CST)
  miment().firstDayOfWeek().format()  // 2018-04-08 11:27:55
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>  <span class="hljs-selector-tag">miment</span>()<span class="hljs-selector-class">.firstDayOfWeek</span>()           <span class="hljs-comment">// Sun Apr 08 2018 11:27:55 GMT+0800 (CST)</span>
  <span class="hljs-selector-tag">miment</span>()<span class="hljs-selector-class">.firstDayOfWeek</span>()<span class="hljs-selector-class">.format</span>()  <span class="hljs-comment">// 2018-04-08 11:27:55</span>
</code></pre>
<p>如果想获取周一呢？周二、三、四、五、六呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  miment().firstDayOfWeek().add(1,'DD').format() // 2018-04-09 11:27:55
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>  <span class="hljs-selector-tag">miment</span>()<span class="hljs-selector-class">.firstDayOfWeek</span>()<span class="hljs-selector-class">.add</span>(<span class="hljs-number">1</span>,<span class="hljs-string">'DD'</span>)<span class="hljs-selector-class">.format</span>() <span class="hljs-comment">// 2018-04-09 11:27:55</span>
</code></pre>
</li>
<li>
<p><code>firstDay</code>  <strong>获取每个月的第一天</strong> 不需要参数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="miment().firstDay()           // Sun Apr 01 2018 00:00:00 GMT+0800 (CST)
miment().firstDay().format()  // 2018-04-01 00:00:00
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">miment</span><span class="hljs-params">()</span></span>.firstDay()           <span class="hljs-comment">// Sun Apr 01 2018 00:00:00 GMT+0800 (CST)</span>
<span class="hljs-function"><span class="hljs-title">miment</span><span class="hljs-params">()</span></span>.firstDay().format()  <span class="hljs-comment">// 2018-04-01 00:00:00</span>
</code></pre>
</li>
<li>
<p><code>lastDay</code>  <strong>获取每个月的最后一天</strong> 不需要参数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="miment().lastDay()           // Mon Apr 30 2018 00:00:00 GMT+0800 (CST)
miment().lastDay().format()  // 2018-04-30 00:00:00
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">miment</span><span class="hljs-params">()</span></span>.lastDay()           <span class="hljs-comment">// Mon Apr 30 2018 00:00:00 GMT+0800 (CST)</span>
<span class="hljs-function"><span class="hljs-title">miment</span><span class="hljs-params">()</span></span>.lastDay().format()  <span class="hljs-comment">// 2018-04-30 00:00:00</span>
</code></pre>
</li>
</ol>
<h4>第三类</h4>
<ol><li>
<code>Date自带方法</code> miment继承自Date对象，所以也拥有Date对象的所有方法，这里就不做深入讲解，需要更多关于Date对象的说明，</li></ol>
<p>请移步至<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date" rel="nofollow noreferrer" target="_blank">MDN查看</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> 不过需要注意的是，由于继承而来的方法是属于Date对象的，为了保持一致，我们没有去对方法做改动，所以方法无法返回miment对象，也就是说无法链式调用miment
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>&gt; 不过需要注意的是，由于继承而来的方法是属于<span class="hljs-keyword">Date</span>对象的，为了保持一致，我们没有去对方法做改动，所以方法无法返回miment对象，也就是说无法链式调用miment
</code></pre>
<h3 id="articleHeader4">写在最后</h3>
<p>目前这些功能(函数)，是我们团队在日常实践中碰到的比较常用的，如果你对功能有新的需求或者建议，<br>欢迎给我们提<a href="https://github.com/noahlam/Miment/issues" rel="nofollow noreferrer" target="_blank">Issue</a>,如果喜欢miment，<br>请在我的<a href="https://github.com/noahlam/Miment" rel="nofollow noreferrer" target="_blank">github</a>上给我一个star,你的star就是我最大的动力了，谢谢！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
moment太重? 那就试试miment--一个超轻量级的js时间库

## 原文链接
[https://segmentfault.com/a/1190000014401666](https://segmentfault.com/a/1190000014401666)

