---
title: '原生js实现移动端选择器插件' 
date: 2018-12-13 2:30:07
hidden: true
slug: k37ej62qp2l
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">原生js实现移动端选择器插件</h1>
<h2 id="articleHeader1">前言</h2>
<p>插件功能只满足我司业务需求，如果希望有更多功能的，可在下方留言，我尽量扩展！如果你有需要或者喜欢的话，可以给我github来个star ?</p>
<blockquote>
<a href="https://github.com/zhouatie/plugin/tree/master/pickerView" rel="nofollow noreferrer" target="_blank">仓库地址</a><p><a href="https://zhouatie.github.io/plugin/pickerView/pickerView.html" rel="nofollow noreferrer" target="_blank">在线预览(记得将浏览器切换到手机模式)</a></p>
</blockquote>
<h3 id="articleHeader2">预览</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013373342?w=284&amp;h=500" src="https://static.alili.tech/img/remote/1460000013373342?w=284&amp;h=500" alt="省市区" title="省市区" style="cursor: pointer;"></span></p>
<h3 id="articleHeader3">准备</h3>
<p>首先在页面中引入css,js文件</p>
<p>每次需要弹出该组件时通过new一个实例来生成，代码如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var data = {
    1:{
      2:[3,4]
    }
}
var pickerView = new PickerView({
    bindElem: elem, // 绑定的元素,用于区别多个组件存在时回显区别，如果单个可以随意填某个元素
    data: data, // 说明：该参数必须符合json格式 且最里层是个数组，如上面的data变量所展示的[3,4]。
    title: '标题2', // 顶部标题文本 默认为“标题”
    leftText: '取消', // 头部左侧按钮文本 默认为‘取消’
    rightText: '确定', // 头部右侧按钮文本 默认为“确定”
    rightFn: function( selectArr ){  // 点击头部右侧按钮的回调函数，参数为一个数组，数组对应滚轮中每项对应的值

    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javaScript"><span class="hljs-keyword">var</span> data = {
    <span class="hljs-number">1</span>:{
      <span class="hljs-number">2</span>:[<span class="hljs-number">3</span>,<span class="hljs-number">4</span>]
    }
}
<span class="hljs-keyword">var</span> pickerView = <span class="hljs-keyword">new</span> PickerView({
    <span class="hljs-attr">bindElem</span>: elem, <span class="hljs-comment">// 绑定的元素,用于区别多个组件存在时回显区别，如果单个可以随意填某个元素</span>
    data: data, <span class="hljs-comment">// 说明：该参数必须符合json格式 且最里层是个数组，如上面的data变量所展示的[3,4]。</span>
    title: <span class="hljs-string">'标题2'</span>, <span class="hljs-comment">// 顶部标题文本 默认为“标题”</span>
    leftText: <span class="hljs-string">'取消'</span>, <span class="hljs-comment">// 头部左侧按钮文本 默认为‘取消’</span>
    rightText: <span class="hljs-string">'确定'</span>, <span class="hljs-comment">// 头部右侧按钮文本 默认为“确定”</span>
    rightFn: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"> selectArr </span>)</span>{  <span class="hljs-comment">// 点击头部右侧按钮的回调函数，参数为一个数组，数组对应滚轮中每项对应的值</span>

    }
});</code></pre>
<blockquote>字段介绍如上注释，滚轮的数量取决于你json嵌套的层数。如下：</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var data = [1,2,3]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> data = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>]</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013366594?w=281&amp;h=202" src="https://static.alili.tech/img/remote/1460000013366594?w=281&amp;h=202" alt="data1" title="data1" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var data = {
    &quot;小明家&quot;:[&quot;小明爸爸&quot;,&quot;小明妈妈&quot;,&quot;小明爷爷&quot;,&quot;小明奶奶&quot;,&quot;小明爸爸&quot;,&quot;小明妈妈&quot;,&quot;小明爷爷&quot;,&quot;小明奶奶&quot;],
    &quot;小红家&quot;:[&quot;小红爸爸&quot;,&quot;小红妈妈&quot;]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javaScript"><span class="hljs-keyword">var</span> data = {
    <span class="hljs-string">"小明家"</span>:[<span class="hljs-string">"小明爸爸"</span>,<span class="hljs-string">"小明妈妈"</span>,<span class="hljs-string">"小明爷爷"</span>,<span class="hljs-string">"小明奶奶"</span>,<span class="hljs-string">"小明爸爸"</span>,<span class="hljs-string">"小明妈妈"</span>,<span class="hljs-string">"小明爷爷"</span>,<span class="hljs-string">"小明奶奶"</span>],
    <span class="hljs-string">"小红家"</span>:[<span class="hljs-string">"小红爸爸"</span>,<span class="hljs-string">"小红妈妈"</span>]
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013366595?w=280&amp;h=201" src="https://static.alili.tech/img/remote/1460000013366595?w=280&amp;h=201" alt="data2" title="data2" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader4">案例</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- html -->
<button style=&quot;font-size:50px;&quot; id=&quot;btn&quot;>按钮</button>
<div class=&quot;showText&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- html --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"font-size:50px;"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn"</span>&gt;</span>按钮<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"showText"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<blockquote>button标签是用来每次点击的时候打开组件<p>div标签用来展示选择的内容</p>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//js

// var data = 地级市json数据，过大 就不展示了

var data = {
    &quot;小明家&quot;:{
      &quot;小明爸爸&quot;:[1,2,6,7,7,8,8,9,0,6,98,76,5],
      &quot;小明妈妈&quot;:[3,4]
    },
    &quot;小红家&quot;:{
      &quot;小红爸爸&quot;:[5,6],
      &quot;小红妈妈&quot;:[7,8]
    }
}
var btn = document.getElementById(&quot;btn&quot;);
btn.onclick = function(){
  var pickerView = new PickerView({
      bindElem: btn,
      data: data,
      title: '家庭',
      leftText: '取消',
      rightText: '确定',
      rightFn: function( selectArr ){
          console.log(selectArr,'selectarr');
          // 将家庭成员展示到showText类名的div中
          document.querySelector(&quot;.showText&quot;).innerText = selectArr.join(&quot;-&quot;);
      }
  });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javaScript"><span class="hljs-comment">//js</span>

<span class="hljs-comment">// var data = 地级市json数据，过大 就不展示了</span>

<span class="hljs-keyword">var</span> data = {
    <span class="hljs-string">"小明家"</span>:{
      <span class="hljs-string">"小明爸爸"</span>:[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">6</span>,<span class="hljs-number">7</span>,<span class="hljs-number">7</span>,<span class="hljs-number">8</span>,<span class="hljs-number">8</span>,<span class="hljs-number">9</span>,<span class="hljs-number">0</span>,<span class="hljs-number">6</span>,<span class="hljs-number">98</span>,<span class="hljs-number">76</span>,<span class="hljs-number">5</span>],
      <span class="hljs-string">"小明妈妈"</span>:[<span class="hljs-number">3</span>,<span class="hljs-number">4</span>]
    },
    <span class="hljs-string">"小红家"</span>:{
      <span class="hljs-string">"小红爸爸"</span>:[<span class="hljs-number">5</span>,<span class="hljs-number">6</span>],
      <span class="hljs-string">"小红妈妈"</span>:[<span class="hljs-number">7</span>,<span class="hljs-number">8</span>]
    }
}
<span class="hljs-keyword">var</span> btn = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"btn"</span>);
btn.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">var</span> pickerView = <span class="hljs-keyword">new</span> PickerView({
      <span class="hljs-attr">bindElem</span>: btn,
      <span class="hljs-attr">data</span>: data,
      <span class="hljs-attr">title</span>: <span class="hljs-string">'家庭'</span>,
      <span class="hljs-attr">leftText</span>: <span class="hljs-string">'取消'</span>,
      <span class="hljs-attr">rightText</span>: <span class="hljs-string">'确定'</span>,
      <span class="hljs-attr">rightFn</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"> selectArr </span>)</span>{
          <span class="hljs-built_in">console</span>.log(selectArr,<span class="hljs-string">'selectarr'</span>);
          <span class="hljs-comment">// 将家庭成员展示到showText类名的div中</span>
          <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">".showText"</span>).innerText = selectArr.join(<span class="hljs-string">"-"</span>);
      }
  });
}</code></pre>
<blockquote>说明： 每次显示组件的时候都需要new一个实例，如上button标签每次被点击的时候都new一个。效果如下：</blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013366596?w=281&amp;h=500" src="https://static.alili.tech/img/remote/1460000013366596?w=281&amp;h=500" alt="预览" title="预览" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader5">结尾</h2>
<p>如有什么功能需要增加的，可在评论区留言，我尽量满足。如有什么疏忽或错误，希望您指出。我会尽早修改，以免误导他人。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
原生js实现移动端选择器插件

## 原文链接
[https://segmentfault.com/a/1190000013366588](https://segmentfault.com/a/1190000013366588)

