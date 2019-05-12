---
title: '微信小程序 使用filter过滤器几种方式' 
date: 2018-12-24 2:30:06
hidden: true
slug: hx3ebbht9pf
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/326507-e81e06b2cb7187e9.jpeg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/326507-e81e06b2cb7187e9.jpeg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt="管道.jpeg" title="管道.jpeg" style="cursor: pointer; display: inline;"></span></p>
<p>由于微信小程序 技术生态比较闭合，导致很多 现代前端框架很多积累出的成果都没有实现(可能未来会逐一实现).  用惯了现代 再耍小程序 总感觉很不顺手. </p>
<p><strong>需要结果的请直接看最后的WXS</strong></p>
<h3 id="articleHeader0">View Filter</h3>
<p>filter 理解为管道加工处理,  你扔给我一组数据  经过各种不同类型的管道加工 产出新的数据 但是又不会影响修改原数据,  最终展示给用户.</p>
<p>现有前端框架filter一般:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" time | dateTime('yyy-mm-dd')
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code> <span class="hljs-built_in">time</span> | <span class="hljs-keyword">dateTime</span>(<span class="hljs-string">'yyy-mm-dd'</span>)
</code></pre>
<p>使用 | 作为管道符  传递参数进行序列化</p>
<h4>缺陷:</h4>
<p>截止目前,小程序官方并没有管道实现方式,以下列出了替代几种方案，供大家选择使用.</p>
<h3 id="articleHeader1">直接修改原数据</h3>
<p>在请求完成之后 对返回值data进行一次数据处理 比如 抽象一个_formatListData方法对 返回进行二次处理.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
 _formatListData(list) {
     return list.map((item) => {
          let date = FormatUtil.getDateTime(item.childBirth);
          item.filterChildBirth = `${date.y}-${date.M}-${date.d}`;
      return item;
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code>
 _formatListData(<span class="hljs-built_in">list</span>) {
     <span class="hljs-keyword">return</span> <span class="hljs-built_in">list</span>.map((item) =&gt; {
          <span class="hljs-keyword">let</span> <span class="hljs-built_in">date</span> = FormatUtil.getDateTime(item.childBirth);
          item.filterChildBirth = <span class="hljs-string">`<span class="hljs-subst">${date.y}</span>-<span class="hljs-subst">${date.M}</span>-<span class="hljs-subst">${date.d}</span>`</span>;
      <span class="hljs-keyword">return</span> item;
    }
}
</code></pre>
<p>这种方式会给原数据添加新字段 filterChildBirth  (原字段为 childBirth) . 最终展示也是显示filterChildBirth 到view上面，多个需要filter的字段都通过这种方式去处理,很明显 对一些业务型filter倒还好   如果遇到filter需要 共享 就比较坑.</p>
<h3 id="articleHeader2">ES6 get</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
data : {
  time : 1511748300571
}

 get time (){    
  return FormatUtil.getDate(this.data.time);
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>
<span class="hljs-keyword">data</span> : {
  time : <span class="hljs-number">1511748300571</span>
}

 <span class="hljs-keyword">get</span> time (){    
  <span class="hljs-keyword">return</span> FormatUtil.getDate(<span class="hljs-keyword">this</span>.<span class="hljs-keyword">data</span>.time);
}
</code></pre>
<p>通过get方法来实现对字段显示过滤. 只能操作对象 对数组中的item 比较无力.</p>
<h3 id="articleHeader3">WXS</h3>
<blockquote><p>微信小程序的架构分为 app-service 和 page-frame，分别运行于不同的线程。你在开发时写的所有 JS 都是运行在 app-service 线程里的，而每个页面各自的 WXML/WXSS 则运行在 page-frame 中。app-service 与 page-frame 之间通过桥协议通信（包括 setData 调用、canvas指令和各种DOM事件），涉及消息序列化、跨线程通信与evaluateJavascript()。这个架构的好处是：分开了业务主线程和显示界面，即便业务主线程非常繁忙，也不会阻塞用户在 page-frame 上的交互。一个小程序可以有多个 page-frame （webview），页面间切换动画比SPA更流畅。坏处是：在 page-frame 上无法调用业务 JS。跨线程通信的成本很高，不适合需要频繁通信的场景。业务 JS 无法直接控制 DOM。<br>作者：鲁小夫<br>链接：<a href="https://www.zhihu.com/question/64322737/answer/223446446" rel="nofollow noreferrer" target="_blank">https://www.zhihu.com/questio...</a></p></blockquote>
<p>了解了wxs 设计初衷，我们也就知道能做什么事情了.<br><strong>wxs 目前主要是增强 wxml 标签的表达能力</strong></p>
<p>ps : <strong>因为运行在不同线程所以 js与wxs 不能相互引用的.  这就有可能在js中使用公共方法 在wxs中需要重新写一份(为了共享filter) 造成代码冗余.</strong></p>
<p>通过wxs 实现共享filter:</p>
<ol><li>首先我们建立共享filter文件夹,实现一个日期格式化</li></ol>
<p><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/326507-b29a1af47d4c2feb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/326507-b29a1af47d4c2feb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt="image.png" title="image.png" style="cursor: pointer; display: inline;"></span></p>
<ol>
<li>
<p>WXS 实现日期格式化（es6语法不能使用)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   var DateFr = {

    getDate: function (time, splitStr) {

   if (!time) return '';

   var date =getDate(time);
   var M = date.getMonth() + 1;
   var y = date.getFullYear();
   var d = date.getDate();

   if (M < 10) M = &quot;0&quot; + M;
   if (d < 10) d = &quot;0&quot; + d;

   if (splitStr)
     return y +splitStr + M +splitStr+d;
   else
     return {
       y: y,
       M: M,
       d: d
     };
     }
   }

   module.exports = {
     getDate: DateFr.getDate
   }

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code>   <span class="hljs-built_in">var</span> DateFr = {

    <span class="hljs-attribute">getDate</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">time, splitStr</span>) </span>{

   <span class="hljs-keyword">if</span> (!time) <span class="hljs-keyword">return</span> <span class="hljs-string">''</span>;

   <span class="hljs-built_in">var</span> <span class="hljs-built_in">date</span> =getDate(time);
   <span class="hljs-built_in">var</span> M = <span class="hljs-built_in">date</span>.getMonth() + <span class="hljs-number">1</span>;
   <span class="hljs-built_in">var</span> y = <span class="hljs-built_in">date</span>.getFullYear();
   <span class="hljs-built_in">var</span> d = <span class="hljs-built_in">date</span>.getDate();

   <span class="hljs-keyword">if</span> (M &lt; <span class="hljs-number">10</span>) M = <span class="hljs-string">"0"</span> + M;
   <span class="hljs-keyword">if</span> (d &lt; <span class="hljs-number">10</span>) d = <span class="hljs-string">"0"</span> + d;

   <span class="hljs-keyword">if</span> (splitStr)
     <span class="hljs-keyword">return</span> y +splitStr + M +splitStr+d;
   <span class="hljs-keyword">else</span>
     <span class="hljs-keyword">return</span> {
       <span class="hljs-attribute">y</span>: y,
       <span class="hljs-attribute">M</span>: M,
       <span class="hljs-attribute">d</span>: d
     };
     }
   }

   <span class="hljs-built_in">module</span>.exports = {
     <span class="hljs-attribute">getDate</span>: DateFr.getDate
   }

</code></pre>
</li>
<li>
<p>在业务页面wxml中引用wxs</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
     <wxs module=&quot;dateFr&quot; src=&quot;../../../../filter/dateFr.wxs&quot;></wxs>
      " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>
     &lt;wxs <span class="hljs-built_in">module</span>=<span class="hljs-string">"dateFr"</span> src=<span class="hljs-string">"../../../../filter/dateFr.wxs"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">wxs</span>&gt;</span></span>
      </code></pre>
<p>使用filter</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      <text >"{{"dateFr.getTime(item.createdAt,':')"}}"</text>
   " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>      &lt;<span class="hljs-built_in">text</span> &gt;"{{"dateFr.getTime(<span class="hljs-built_in">item</span>.createdAt,':')"}}"&lt;/<span class="hljs-built_in">text</span>&gt;
   </code></pre>
<h3 id="articleHeader4">结尾</h3>
<p>wxs 基本满足filter的场景:</p>
</li>
</ol>
<p>共享filter场景 采用3<br>业务filter很多场景 采用1,3<br>简单业务filter 数据非数组型场景 采用2<br>小程序还有很长的路要走,仍需继续努力.</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
微信小程序 使用filter过滤器几种方式

## 原文链接
[https://segmentfault.com/a/1190000012246412](https://segmentfault.com/a/1190000012246412)

