---
title: '最近老是有兄弟问我，Vue双向绑定的原理，以及简单的原生js写出来实现，我就来一个最简单的双向绑定，原生十行代码让你看懂原理' 
date: 2019-02-14 2:30:37
hidden: true
slug: 3u52c5hg4nu
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">废话不多说直接看效果图</h2>
<p><span class="img-wrap"><img data-src="/img/bVbiYY5?w=282&amp;h=500" src="https://static.alili.tech/img/bVbiYY5?w=282&amp;h=500" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<blockquote>代码很好理解，但是在看代码之前需要知道Vue双向绑定的原理其实就是基于<br><strong>Object.defineProperty</strong>  实现的双向绑定 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty" rel="nofollow noreferrer" target="_blank">官方传送门</a>
</blockquote>
<blockquote>这里我们用官方的话来说<br>Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。<br>语法：<br>Object.defineProperty(obj, prop, descriptor)<br><strong>参数</strong><br>obj：<br>要在其上定义属性的对象。<br>prop：<br>要定义或修改的属性的名称。<br>descriptor：<br>将被定义或修改的属性描述符。</blockquote>
<p>这里面要说的真的就太多了，我们就调双向绑定需要用到的说一下就可以了，需要了解更多的朋友可以进<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty" rel="nofollow noreferrer" target="_blank">官网</a>官网看更加详细的</p>
<blockquote>这里我们就只是说一下 Object.defineProperty里面的核心的 get 和 set</blockquote>
<h2 id="articleHeader1">get</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let data ={} ;
let index = 1;
Object.defineProperty(data,&quot;age&quot;,{ //不明白参数什么含义的请往上看咯
    get:function(){
        return index;//获取到了定义的index变量
    }
})
console.log(data); // {age:1}

怎么样，是不是非常简单，那么我们趁热赶紧看一下set吧" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">let</span> data ={} ;
<span class="hljs-keyword">let</span> index = <span class="hljs-number">1</span>;
<span class="hljs-built_in">Object</span>.defineProperty(data,<span class="hljs-string">"age"</span>,{ <span class="hljs-comment">//不明白参数什么含义的请往上看咯</span>
    <span class="hljs-keyword">get</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">return</span> index;<span class="hljs-comment">//获取到了定义的index变量</span>
    }
})
<span class="hljs-built_in">console</span>.log(data); <span class="hljs-comment">// {age:1}</span>

怎么样，是不是非常简单，那么我们趁热赶紧看一下<span class="hljs-keyword">set</span>吧</code></pre>
<h2 id="articleHeader2">set</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var data ={} ;
var index= 1;
Object.defineProperty(data,&quot;age&quot;,{
    get:function(){
        return index;
    },
    set:function(newZhi){
        index=newZhi;
    }
})
console.log(data);// {age:1}
哈哈 是不是感觉和上面的get是一样的呢？用法都是一样的 那么楼主能来点不一样的嘛？
回答：可以


----------


Object.defineProperty(data,&quot;age&quot;,{
    get:function(){
        return index;
    },
    set:function(newZhi){
        index=newZhi+10;
    }
})
console.log(data); // {age:11}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code>var <span class="hljs-keyword">data</span> ={} ;
var <span class="hljs-built_in">index</span>= <span class="hljs-number">1</span>;
Object.defineProperty(<span class="hljs-keyword">data</span>,<span class="hljs-string">"age"</span>,{
    get:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">index</span>;
    },
    set:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(newZhi)</span></span>{
        <span class="hljs-built_in">index</span>=newZhi;
    }
})
console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">data</span>);// {age:<span class="hljs-number">1</span>}
哈哈 是不是感觉和上面的get是一样的呢？用法都是一样的 那么楼主能来点不一样的嘛？
回答：可以


----------


Object.defineProperty(<span class="hljs-keyword">data</span>,<span class="hljs-string">"age"</span>,{
    get:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">index</span>;
    },
    set:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(newZhi)</span></span>{
        <span class="hljs-built_in">index</span>=newZhi+<span class="hljs-number">10</span>;
    }
})
console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">data</span>); // {age:<span class="hljs-number">11</span>}</code></pre>
<p>既然Object.defineProperty里面的set和get看懂了就可以直接上手简单的双向绑定啦，这时候有的小伙伴可能就问了：什么？这么快？   回答：就是这么快<br>直接贴代码 每一行都是有注释的 赶紧看看吧</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body>
        <input type=&quot;text&quot; id=&quot;inp&quot;/>
        <div id=&quot;text&quot;>我是测试数据的</div>
</body>
<script type=&quot;text/javascript&quot;>
        const inp = document.getElementById(&quot;inp&quot;),tex=document.getElementById(&quot;text&quot;), data = {};//获取两个元素
        Object.defineProperty(data,&quot;name&quot;,{
            get:function(){
                return inp.value;//获取到文本框value输入的值
            },
            set:function(newdata){//接收到文本框value的值
                tex.innerHTML = newdata;//div的值等于文本框的值
            }
        })
        inp.addEventListener(&quot;keyup&quot;,function(e){//键盘按下的时候来实时同步
            data.name = this.value;
        })
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"inp"</span>/&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"text"</span>&gt;</span>我是测试数据的<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">const</span> inp = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"inp"</span>),tex=<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"text"</span>), data = {};<span class="hljs-comment">//获取两个元素</span>
        <span class="hljs-built_in">Object</span>.defineProperty(data,<span class="hljs-string">"name"</span>,{
            <span class="hljs-attr">get</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                <span class="hljs-keyword">return</span> inp.value;<span class="hljs-comment">//获取到文本框value输入的值</span>
            },
            <span class="hljs-attr">set</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">newdata</span>)</span>{<span class="hljs-comment">//接收到文本框value的值</span>
                tex.innerHTML = newdata;<span class="hljs-comment">//div的值等于文本框的值</span>
            }
        })
        inp.addEventListener(<span class="hljs-string">"keyup"</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{<span class="hljs-comment">//键盘按下的时候来实时同步</span>
            data.name = <span class="hljs-keyword">this</span>.value;
        })
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<blockquote>怎么样？是不是很简单呢 十行代码就完事了(当然只是简单的双向绑定，拓展性很强）</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
最近老是有兄弟问我，Vue双向绑定的原理，以及简单的原生js写出来实现，我就来一个最简单的双向绑定，原生十行代码让你看懂原理

## 原文链接
[https://segmentfault.com/a/1190000016878958](https://segmentfault.com/a/1190000016878958)

