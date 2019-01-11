---
title: 'vue入门实践，style和数据绑定' 
date: 2019-01-09 2:30:12
hidden: true
slug: 1t2d0r0sp0pi
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">初阶版</h2>
<p><span class="img-wrap"><img data-src="/img/bVQrOD?w=355&amp;h=518" src="https://static.alili.tech/img/bVQrOD?w=355&amp;h=518" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><strong>需要注意的地方</strong></p>
<ul>
<li><p>由于方块变化框与下方ctrl部分共享一个动态参数counter，所以这两部分要包裹在同一个id之下，实现数据共享。</p></li>
<li><p>给style添加绑定之后，由于样式参数要动态变化，所以直接将整个绑定的样式参数都放入computed中处理，返回值是一个样式的object。</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*html 片段*/
<li class=&quot;block&quot; v-for=&quot;n in counter&quot; v-bind:style=&quot;styleObject&quot;></li>

/*js 片段*/
data:{
       counter:0,
            },
computed:{
        styleObject : function(){
                    return {
                        width: initWidth - this.counter * 20 +'px',
                    }
                }
            }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">/*html 片段*/</span>
&lt;li <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"block"</span> v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"n in counter"</span> v-bind:style=<span class="hljs-string">"styleObject"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>

<span class="hljs-comment">/*js 片段*/</span>
data:{
       <span class="hljs-attr">counter</span>:<span class="hljs-number">0</span>,
            },
<span class="hljs-attr">computed</span>:{
        <span class="hljs-attr">styleObject</span> : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                    <span class="hljs-keyword">return</span> {
                        <span class="hljs-attr">width</span>: initWidth - <span class="hljs-keyword">this</span>.counter * <span class="hljs-number">20</span> +<span class="hljs-string">'px'</span>,
                    }
                }
            }
</code></pre>
<p><em>附：完整代码</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;zh-cn&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>Vue</title>
    <link rel=&quot;stylesheet&quot; href=&quot;css/index.css&quot;>

</head>
<body>
   <div id=&quot;ctrl&quot;>
       <ul id=&quot;show&quot; class=&quot;wrap&quot;>
            <li class=&quot;block&quot; v-for=&quot;n in counter&quot; v-bind:style=&quot;styleObject&quot;></li>
        </ul>
        <div class=&quot;wrap&quot;>
            <button v-on:click=&quot;counter += 1&quot;>加一层</button>
            <p>这个按钮被戳了"{{"counter"}}"次</p>
        </div>
   </div>

    <script src=&quot;ventor/vue.js&quot;></script>
    <script>
        var initWidth = 300;

        var vm = new Vue({
            el:'#ctrl',
            data:{
                counter:0,
            },
            computed:{
                styleObject : function(){
                    return {
                        width: initWidth - this.counter * 20 +'px',
                    }
                }
            }
        })

    </script>
</body>
</html>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"zh-cn"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Vue<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"css/index.css"</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"ctrl"</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"show"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"wrap"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"block"</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"n in counter"</span> <span class="hljs-attr">v-bind:style</span>=<span class="hljs-string">"styleObject"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"wrap"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">v-on:click</span>=<span class="hljs-string">"counter += 1"</span>&gt;</span>加一层<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>这个按钮被戳了</span><span class="hljs-template-variable">"{{"counter"}}"</span><span class="xml">次<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
   <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"ventor/vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
        <span class="hljs-keyword">var</span> initWidth = <span class="hljs-number">300</span>;

        <span class="hljs-keyword">var</span> vm = <span class="hljs-keyword">new</span> Vue({
            el:<span class="hljs-string">'#ctrl'</span>,
            data:{
                counter:<span class="hljs-number">0</span>,
            },
            computed:{
                styleObject : <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
                    <span class="hljs-keyword">return</span> {
                        width: initWidth - <span class="hljs-keyword">this</span>.counter * <span class="hljs-number">20</span> +<span class="hljs-string">'px'</span>,
                    }
                }
            }
        })

    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</span></code></pre>
<h2 id="articleHeader1">进阶版</h2>
<p><span class="img-wrap"><img data-src="/img/bVQrOJ?w=356&amp;h=483" src="https://static.alili.tech/img/bVQrOJ?w=356&amp;h=483" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><strong>思路</strong></p>
<ul>
<li><p>在v-for循环中，增加index参数，利用index对每个block赋予不同的宽度值。用v-if控制，当最后一块的宽度计算结果小于0的时候，停止循环生成，只计数，并显示提示。</p></li>
<li>
<p>在负责提示的p标签中添加v-if，让这个元素到了满足条件的时候才在DOM树中生成</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//html
<div id=&quot;ctrl&quot;>
       <ul id=&quot;show&quot; class=&quot;wrap&quot;>
            <li class=&quot;block&quot; v-for=&quot;(n,index) in counter&quot; v-if=&quot;index<11&quot; v-bind:style=&quot;styleObject(index)&quot;></li>
        </ul>
        <div class=&quot;wrap&quot;>
            <button v-on:click=&quot;counter += 1&quot;>加一层</button>
            <p>这个按钮被戳了"{{"counter"}}"次</p>
            <p v-if=&quot;counter>10&quot;>"{{"warning"}}"</p>
        </div>
   </div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml">//html
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"ctrl"</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"show"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"wrap"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"block"</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(n,index) in counter"</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"index&lt;11"</span> <span class="hljs-attr">v-bind:style</span>=<span class="hljs-string">"styleObject(index)"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"wrap"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">v-on:click</span>=<span class="hljs-string">"counter += 1"</span>&gt;</span>加一层<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>这个按钮被戳了</span><span class="hljs-template-variable">"{{"counter"}}"</span><span class="xml">次<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"counter&gt;10"</span>&gt;</span></span><span class="hljs-template-variable">"{{"warning"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
   <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</span></code></pre>
</li>
</ul>
<p><strong>注意</strong></p>
<ul><li><p>v-for里面的value、index参数，只在自己渲染的块中有效，无法在同一个实例下的其它地方使用。</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//js
var initWidth = 300;

var vm = new Vue({
            el:'#ctrl',
            data:{
                counter:0,
                warning:'',
            },
            methods:{
                styleObject : function(index){
                    if(initWidth - index * 30>0){
                        return {
                            width: initWidth - index * 30 +'px',
                        }
                    }else{
                        this.warning = '已经到最底层啦！';
                        return {
                            width:0,
                        }
                    }
                }
            }
        })
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">//js</span>
<span class="hljs-keyword">var</span> initWidth = <span class="hljs-number">300</span>;

<span class="hljs-keyword">var</span> vm = <span class="hljs-keyword">new</span> Vue({
            el:<span class="hljs-string">'#ctrl'</span>,
            data:{
                counter:<span class="hljs-number">0</span>,
                warning:<span class="hljs-string">''</span>,
            },
            methods:{
                styleObject : <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(index)</span></span>{
                    <span class="hljs-keyword">if</span>(initWidth - index * <span class="hljs-number">30</span>&gt;<span class="hljs-number">0</span>){
                        <span class="hljs-keyword">return</span> {
                            width: initWidth - index * <span class="hljs-number">30</span> +<span class="hljs-string">'px'</span>,
                        }
                    }<span class="hljs-keyword">else</span>{
                        <span class="hljs-keyword">this</span>.warning = <span class="hljs-string">'已经到最底层啦！'</span>;
                        <span class="hljs-keyword">return</span> {
                            width:<span class="hljs-number">0</span>,
                        }
                    }
                }
            }
        })
</code></pre>
<p><strong>注意</strong></p>
<ul>
<li><p>vm实例中，使用methods进行传参的函数调用（computed不具备传参的功能 ）</p></li>
<li><p>v-bind:style 的methods函数要返回style键值对</p></li>
<li><p>双向数据绑定的数据对象不用写在return中</p></li>
</ul>
<p><em>附：完整代码</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;zh-cn&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>Vue</title>
    <link rel=&quot;stylesheet&quot; href=&quot;css/index.css&quot;>

</head>
<body>
<!--  倒金字塔-->
   <div id=&quot;ctrl&quot;>
       <ul id=&quot;show&quot; class=&quot;wrap&quot;>
            <li class=&quot;block&quot; v-for=&quot;(n,index) in counter&quot; v-if=&quot;index<11&quot; v-bind:style=&quot;styleObject(index)&quot;></li>
        </ul>
        <div class=&quot;wrap&quot;>
            <button v-on:click=&quot;counter += 1&quot;>加一层</button>
            <p>这个按钮被戳了"{{"counter"}}"次</p>
            <p v-if=&quot;counter>10&quot;>"{{"warning"}}"</p>
        </div>
   </div>

    <script src=&quot;ventor/vue.js&quot;></script>
    <script>
//        倒金字塔
        var initWidth = 300;

        var vm = new Vue({
            el:'#ctrl',
            data:{
                counter:0,
                warning:'',
            },
            methods:{
                styleObject : function(index){
                    if(initWidth - index * 30>0){
                        return {
                            width: initWidth - index * 30 +'px',
                        }
                    }else{
                        this.warning = '已经到最底层啦！';
                        return {
                            width:0,
                        }
                    }
                }
            }
        })

    </script>
</body>
</html>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"zh-cn"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Vue<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"css/index.css"</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-comment">&lt;!--  倒金字塔--&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"ctrl"</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"show"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"wrap"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"block"</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(n,index) in counter"</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"index&lt;11"</span> <span class="hljs-attr">v-bind:style</span>=<span class="hljs-string">"styleObject(index)"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"wrap"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">v-on:click</span>=<span class="hljs-string">"counter += 1"</span>&gt;</span>加一层<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>这个按钮被戳了</span><span class="hljs-template-variable">"{{"counter"}}"</span><span class="xml">次<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"counter&gt;10"</span>&gt;</span></span><span class="hljs-template-variable">"{{"warning"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
   <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"ventor/vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
<span class="hljs-comment">//        倒金字塔</span>
        <span class="hljs-keyword">var</span> initWidth = <span class="hljs-number">300</span>;

        <span class="hljs-keyword">var</span> vm = <span class="hljs-keyword">new</span> Vue({
            el:<span class="hljs-string">'#ctrl'</span>,
            data:{
                counter:<span class="hljs-number">0</span>,
                warning:<span class="hljs-string">''</span>,
            },
            methods:{
                styleObject : <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(index)</span></span>{
                    <span class="hljs-keyword">if</span>(initWidth - index * <span class="hljs-number">30</span>&gt;<span class="hljs-number">0</span>){
                        <span class="hljs-keyword">return</span> {
                            width: initWidth - index * <span class="hljs-number">30</span> +<span class="hljs-string">'px'</span>,
                        }
                    }<span class="hljs-keyword">else</span>{
                        <span class="hljs-keyword">this</span>.warning = <span class="hljs-string">'已经到最底层啦！'</span>;
                        <span class="hljs-keyword">return</span> {
                            width:<span class="hljs-number">0</span>,
                        }
                    }
                }
            }
        })

    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue入门实践，style和数据绑定

## 原文链接
[https://segmentfault.com/a/1190000010077651](https://segmentfault.com/a/1190000010077651)

