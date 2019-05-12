---
title: 'CSS水平垂直居中解决方案' 
date: 2018-12-14 2:30:11
hidden: true
slug: wtpij7b92s
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">CSS水平垂直居中解决方案</h1>
<h2 id="articleHeader1">准备</h2>
<p>创建元素</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;parent&quot;>
  <div class=&quot;child&quot;>child</div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"parent"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"child"</span>&gt;</span>child<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<h2 id="articleHeader2">垂直水平居中方案一：知道宽度的情况下 absolute+margin负值</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent {
  width:400px;
  height:400px;
  background: red;
  position: relative;
}
.child {
  position: absolute;
  left:50%;
  top:50%;
  background: yellow;
  width:50px;
  height:50px;
  margin-left:-25px;
  margin-top:-25px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">.parent {
  width:400px;
  height:400px;
  background: red;
  position: relative;
}
.child {
  position: absolute;
  left:50%;
  top:50%;
  background: yellow;
  width:50px;
  height:50px;
  margin-left:-25px;
  margin-top:-25px;
}</code></pre>
<h2 id="articleHeader3">垂直水平居中方案二：不知道宽高的情况下 absolute+transform</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent {
  width:400px;
  height:400px;
  background: red;
  position: relative;
}
.child {
  position: absolute;
  left:50%;
  top:50%;
  transform: translate(-50%,-50%);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">.parent {
  width:400px;
  height:400px;
  background: red;
  position: relative;
}
.child {
  position: absolute;
  left:50%;
  top:50%;
  transform: translate(-50%,-50%);
}</code></pre>
<h2 id="articleHeader4">垂直居中方案三：position+margin:auto</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent {
  position:relative;
  width:200px;
  height:200px;
  background: red;
}
.child {
  width:80px;
  height:40px;
  background: yellow;
  position: absolute;
  left:0;
  top:0;
  right:0 ;
  bottom:0;
  margin:auto;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">.parent {
  position:relative;
  width:200px;
  height:200px;
  background: red;
}
.child {
  width:80px;
  height:40px;
  background: yellow;
  position: absolute;
  left:0;
  top:0;
  right:0 ;
  bottom:0;
  margin:auto;
}</code></pre>
<h2 id="articleHeader5">垂直居中方案四：+ 多行文本的垂直居中 :table-cell+vertical-align:middle;</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent {
    height: 300px;
    width:400px;
    border: 1px solid red;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
}
.child {
  display: inline-block;
  width:50px;
  height:50px;
  background: blue;
}
/* 或者 */
.parent {
    width: 400px;
    height: 300px;
    display: table-cell;
    vertical-align: middle;
    border: 1px solid red;
    text-align: center;
}
.child {
    display: inline-block;
    vertical-align: middle;
    background: blue;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">.parent {
    height: 300px;
    width:400px;
    border: 1px solid red;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
}
.child {
  display: inline-block;
  width:50px;
  height:50px;
  background: blue;
}
/* 或者 */
.parent {
    width: 400px;
    height: 300px;
    display: table-cell;
    vertical-align: middle;
    border: 1px solid red;
    text-align: center;
}
.child {
    display: inline-block;
    vertical-align: middle;
    background: blue;
}</code></pre>
<h2 id="articleHeader6">垂直居中方案五：display: flex</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent {
  width:400px;
  height:200px;
  background:red;
  display: flex;
  justify-content:center;
  align-items:center;
}
.child {
  height:100px;
  width:100px;
  background:green;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">.parent {
  width:400px;
  height:200px;
  background:red;
  display: flex;
  justify-content:center;
  align-items:center;
}
.child {
  height:100px;
  width:100px;
  background:green;
}</code></pre>
<h2 id="articleHeader7">垂直居中方案六：伪元素</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent {
  width:200px;
  height:200px;
  background:red;
  text-align: center;
}
.child {
  height:100px;
  width:100px;
  background:yellow;
  display: inline-block;
  vertical-align: middle;
}
.parent:before {
  content:&quot;&quot;;
  height:100%;
  vertical-align: middle;
  display: inline-block;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">.parent {
  width:200px;
  height:200px;
  background:red;
  text-align: center;
}
.child {
  height:100px;
  width:100px;
  background:yellow;
  display: inline-block;
  vertical-align: middle;
}
.parent:before {
  content:"";
  height:100%;
  vertical-align: middle;
  display: inline-block;
}</code></pre>
<blockquote>在下的文章都是学习过程中的总结，如果发现错误，欢迎留言指出~</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS水平垂直居中解决方案

## 原文链接
[https://segmentfault.com/a/1190000013249094](https://segmentfault.com/a/1190000013249094)

