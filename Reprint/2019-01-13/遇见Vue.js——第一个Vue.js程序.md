---
title: '遇见Vue.js——第一个Vue.js程序' 
date: 2019-01-13 2:30:11
hidden: true
slug: zsmtc3v6tcc
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">遇见Vue</h2>
<h3 id="articleHeader1">Vue.js是什么</h3>
<p><span class="img-wrap"><img data-src="/img/bVORjF?w=873&amp;h=469" src="https://static.alili.tech/img/bVORjF?w=873&amp;h=469" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>Vue.js（读音 /vjuː/, 类似于 view） 是一套构建用户界面的 <strong>渐进式框架</strong>。<br>与其他重量级框架不同的是，Vue 采用自底向上增量开发的设计。<br>Vue 的核心库只关注视图层，并且非常容易学习，非常容易与其它库或已有项目整合。<br>另一方面，Vue 完全有能力驱动采用单文件组件和Vue生态系统支持的库开发的复杂单页应用。</p>
<h3 id="articleHeader2">Vue.js 的目标</h3>
<p>是通过尽可能简单的 API 实现<strong>响应的数据绑定</strong>和<strong>组合的视图组件</strong>。<br>Vue.js 是一个用于创建 Web 交互界面的库。它让你通过简单而灵活的 API 创建由数据驱动的 UI 组件。</p>
<h3 id="articleHeader3">Vue.js的特性</h3>
<p><strong>简洁：</strong><br>HTML 模板 + JSON 数据，再创建一个 Vue 实例，就这么简单。</p>
<p><strong>数据驱动：</strong><br>自动追踪依赖的模板表达式和计算属性。</p>
<p><strong>组件化：</strong><br>用解耦、可复用的组件来构造界面。</p>
<p><strong>轻量：</strong><br>~24kb min+gzip，无依赖。</p>
<p><strong>快速：</strong><br>精确有效的异步批量 DOM 更新。</p>
<p><strong>模块友好：</strong><br>通过 NPM 或 Bower 安装，无缝融入你的工作流。</p>
<h2 id="articleHeader4">第一个Vue.js程序</h2>
<h3 id="articleHeader5">安装</h3>
<p>我们可以在 Vue.js 的<a href="http://cn.vuejs.org/" rel="nofollow noreferrer" target="_blank">官网</a>上直接下载 vue.min.js 并用 <code>&lt;script&gt;</code> 标签引入。Vue 会被注册为一个全局变量。</p>
<blockquote><p>重要提示：在开发时请用开发版本，遇到常见错误它会给出友好的警告。</p></blockquote>
<p><a href="https://vuejs.org/js/vue.min.js" rel="nofollow noreferrer" target="_blank">下载Vue.js生产版本</a></p>
<p><a href="https://vuejs.org/js/vue.js" rel="nofollow noreferrer" target="_blank">下载Vue.js开发版本</a></p>
<h3 id="articleHeader6">代码示例</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
    <head>
        <meta charset=&quot;UTF-8&quot;>
        <title>it研习社-第一个Hello Vue程序</title>
    </head>
    <body>
        <div id=&quot;app&quot;>
            "{{"message"}}"
        </div>
        <script src=&quot;vue.js&quot; type=&quot;text/javascript&quot; charset=&quot;utf-8&quot;></script>
        <script type=&quot;text/javascript&quot;>
            var app=new Vue({
                el:'#app',
                data:{
                    message:'Hello Vue!'
                }
            });
        </script>
    </body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>it研习社-第一个Hello Vue程序<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
            </span><span class="hljs-template-variable">"{{"message"}}"</span><span class="xml">
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"vue.js"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="actionscript">
            <span class="hljs-keyword">var</span> app=<span class="hljs-keyword">new</span> Vue({
                el:<span class="hljs-string">'#app'</span>,
                data:{
                    message:<span class="hljs-string">'Hello Vue!'</span>
                }
            });
        </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></span></code></pre>
<blockquote><p>预览：<a href="https://91jack.github.io/Vue-tutorial/chapter01/01hellovue.html" rel="nofollow noreferrer" target="_blank">https://91jack.github.io/Vue-...</a></p></blockquote>
<p>页面输出：</p>
<p><span class="img-wrap"><img data-src="/img/bVORjP?w=115&amp;h=35" src="https://static.alili.tech/img/bVORjP?w=115&amp;h=35" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader7">第一个Hello Vue代码详解</h3>
<blockquote><p>1.将vue.js文件引入到当前页面</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
<script src=&quot;vue.js&quot; type=&quot;text/javascript&quot; charset=&quot;utf-8&quot;></script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"vue.js"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="只要将vue.js文件引入页面，在当前环境就会多出一个全局变量：Vue
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>只要将<span class="hljs-selector-tag">vue</span><span class="hljs-selector-class">.js</span>文件引入页面，在当前环境就会多出一个全局变量：<span class="hljs-selector-tag">Vue</span>
</code></pre>
<blockquote><p>2.通过全局构造函数：Vue ，实例化一个Vue应用程序接管的元素（包括所有的子元素）</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/javascript&quot;>
var app=new Vue({
  el:'#app', //el:element 的简写 ，用来指定Vue应用程序接管的元素（包括所有的子元素）
  data:{ //data:data就是Vue实例应用程序中的数据成员
      message:'Hello Vue!'
  }
});
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="actionscript">
<span class="hljs-keyword">var</span> app=<span class="hljs-keyword">new</span> Vue({
  el:<span class="hljs-string">'#app'</span>, <span class="hljs-comment">//el:element 的简写 ，用来指定Vue应用程序接管的元素（包括所有的子元素）</span>
  data:{ <span class="hljs-comment">//data:data就是Vue实例应用程序中的数据成员</span>
      message:<span class="hljs-string">'Hello Vue!'</span>
  }
});
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<blockquote><p>3.代码执行流程解析</p></blockquote>
<ul><li><p>1.浏览器从上到下依次进行解析</p></li></ul>
<p>浏览器对于id=app 的div 内部的 "{{"message"}}"不认识，直接作为普通文本渲染到网页上</p>
<ul><li><p>2.浏览器继续往后解析执行</p></li></ul>
<p>发现有一个js外链脚本，发起请求进行下载<br>当当前页面环境拿到js脚本之后，vue.js就会执行，执行结束，就向全局暴露出了一个对象：Vue</p>
<ul><li><p>3.当解析执行到咱们自己的Script的时候，开始解析执行咱们自己的代码</p></li></ul>
<p>通过 el 属性 指定  Vue程序 的接管范围<br>通过 data 向Vue 实例的应用程序中初始化了一个 message 成员<br>Vue 程序通过 el 属性指定id为 #app 的div<br>开始解析执行 Vue 能识别的语法<br>"{{"message"}}" 在Vue 中被称为双花括号插值表达式<br>在双括号插值表达式中可以使用 当前元素 所属Vue程序 接管范围的data中的数据</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
遇见Vue.js——第一个Vue.js程序

## 原文链接
[https://segmentfault.com/a/1190000009699032](https://segmentfault.com/a/1190000009699032)

