---
title: 'Vue 2.0 入门系列（11）双向绑定其他元素以及自定义表单控件' 
date: 2019-01-15 2:30:12
hidden: true
slug: 4mzh4sak5x
categories: [reprint]
---

{{< raw >}}

                    
<p>之前我们学过用 <code>v-model</code> 进行双向数据绑定：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;root&quot;>
    <textarea class=&quot;textarea&quot; v-model=&quot;comment&quot;></textarea>
</div>

<script>

    var vm = new Vue({
        el:&quot;#root&quot;,
        data:{
            comment:&quot;这是一条评论&quot;
        }
    });

</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;div id=<span class="hljs-string">"root"</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">textarea</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"textarea"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"comment"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">textarea</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/div&gt;

&lt;script&gt;

    var vm = new Vue({
        el:"#root",
        data:{
            comment:"这是一条评论"
        }
    });

&lt;/</span>script&gt;</code></pre>
<p>而且，提到过，<code>v-model</code> 只能用于表单控件，如果用于其他元素，比如 <code>p</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<p contenteditable=&quot;true&quot; v-model=&quot;comment&quot;></p>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">&lt;p contenteditable=<span class="hljs-string">"true"</span> v-model=<span class="hljs-string">"comment"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span></code></pre>
<p>那么就会报错:</p>
<blockquote><p>v-model is not supported on this element type. If you are working with contenteditable, it's recommended to wrap a library dedicated for that purpose inside a custom component.</p></blockquote>
<p>它会提示用 <code>custom component</code>，即自定义组件。在使用自定义组件之前，先来看看 <code>v-model</code> 的另外一种等价写法:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<textarea :value=&quot;comment&quot; @input=&quot;comment = $event.target.value&quot;></textarea>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">textarea</span> <span class="hljs-attr">:value</span>=<span class="hljs-string">"comment"</span> @<span class="hljs-attr">input</span>=<span class="hljs-string">"comment = $event.target.value"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">textarea</span>&gt;</span></code></pre>
<p>该过程很好理解，首先，动态绑定输入控件的 <code>value</code> 属性到 <code>comment</code> 变量上，然后对 <code>input</code> 事件进行监控，实时同步 <code>comment</code> 的值。</p>
<p>如果用这种写法，就可以对 <code>p</code> 等元素进行双向绑定了。由于 <code>p</code> 元素没有 <code>value</code> 属性，可以使用 <code>v-text</code> 或者插值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<p contenteditable=&quot;true&quot; @input=&quot;comment = $event.target.innerText&quot;>"{{" comment "}}"</p>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">contenteditable</span>=<span class="hljs-string">"true"</span> @<span class="hljs-attr">input</span>=<span class="hljs-string">"comment = $event.target.innerText"</span>&gt;</span>"{{" comment "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></code></pre>
<p>或者:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<p contenteditable=&quot;true&quot; v-text=&quot;comment&quot; @input=&quot;comment = $event.target.innerText&quot;></p>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">contenteditable</span>=<span class="hljs-string">"true"</span> <span class="hljs-attr">v-text</span>=<span class="hljs-string">"comment"</span> @<span class="hljs-attr">input</span>=<span class="hljs-string">"comment = $event.target.innerText"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></code></pre>
<p>现在，我们对评论的内容进行过滤，效果如下：</p>
<p><span class="img-wrap"><img data-src="/img/bVMR1f?w=420&amp;h=130" src="https://static.alili.tech/img/bVMR1f?w=420&amp;h=130" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>可以使用自定义组件，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<comment v-model=&quot;comment&quot;></comment>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">comment</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"comment"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">comment</span>&gt;</span></code></pre>
<p>如何让组件的 <code>v-model</code> 生效呢？需要按照 Vue 的约定：</p>
<ol>
<li><p>接受一个 <code>value</code> 属性</p></li>
<li><p>在有新的 <code>value</code> 时触发 <code>input</code> 事件</p></li>
</ol>
<p>跟我们之前的写法类似：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('comment',{
    props:['value'],
    template:`
        <textarea :value=&quot;value&quot; @input=&quot;filterComment($event.target.value)&quot;></textarea>
    `,
    methods: {
        filterComment(comment){
            this.$emit('input',comment)
        }
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Vue.component(<span class="hljs-string">'comment'</span>,{
    <span class="hljs-attr">props</span>:[<span class="hljs-string">'value'</span>],
    <span class="hljs-attr">template</span>:<span class="hljs-string">`
        &lt;textarea :value="value" @input="filterComment($event.target.value)"&gt;&lt;/textarea&gt;
    `</span>,
    <span class="hljs-attr">methods</span>: {
        filterComment(comment){
            <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'input'</span>,comment)
        }
    }
});</code></pre>
<p>这样就可以实现简单的双向绑定了，而且我们可以在 <code>filterComment</code> 方法中定义过滤规则：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="filterComment(comment){
    var filterRst = (comment.indexOf('敏感词') >= 0 ? comment.replace(\敏感词\g,&quot;河蟹&quot;) : comment);
    this.$emit('input',filterRst)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">filterComment(comment){
    <span class="hljs-keyword">var</span> filterRst = (comment.indexOf(<span class="hljs-string">'敏感词'</span>) &gt;= <span class="hljs-number">0</span> ? comment.replace(\敏感词\g,<span class="hljs-string">"河蟹"</span>) : comment);
    <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'input'</span>,filterRst)
}</code></pre>
<p>完整示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;zh-cn&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>Document</title>
    <script src=&quot;https://cdn.bootcss.com/vue/2.2.6/vue.js&quot;></script>
    <link rel=&quot;stylesheet&quot; type=&quot;text/css&quot; href=&quot;https://cdnjs.cloudflare.com/ajax/libs/bulma/0.4.1/css/bulma.css&quot;>
</head>
<body>
    <div id=&quot;root&quot; class=&quot;container&quot;>
        <comment v-model=&quot;comment&quot;></comment>
    </div>

    <script>
        Vue.component('comment',{
            props:['value'],
            template:`
                <textarea class=&quot;textarea&quot; :value=&quot;value&quot; @input=&quot;filterComment($event.target.value)&quot;></textarea>
            `,
            data(){
                return {
                    sensitiveList:['包子','蛤蛤'],
                    replaceWord:'河蟹'
                }
            },
            methods: {
                filterComment(comment){
                    var that = this;
                    this.sensitiveList.forEach(function(word){
                        var regex = new RegExp(word,'g');;
                        comment = (comment.indexOf(word) >= 0 ? comment.replace(regex,that.replaceWord) : comment);
                    })
                    this.$emit('input',comment)
                }
            }
        });
    
        var vm = new Vue({
            el:&quot;#root&quot;,
            data:{
                comment:'这是一条评论'
            }
        });
    </script>
    
</body>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"zh-cn"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Document<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/vue/2.2.6/vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://cdnjs.cloudflare.com/ajax/libs/bulma/0.4.1/css/bulma.css"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"root"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">comment</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"comment"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">comment</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
        Vue.component(<span class="hljs-string">'comment'</span>,{
            props:[<span class="hljs-string">'value'</span>],
            template:`
                &lt;textarea <span class="hljs-class"><span class="hljs-keyword">class</span>="<span class="hljs-title">textarea</span>" :<span class="hljs-title">value</span>="<span class="hljs-title">value</span>" @<span class="hljs-title">input</span>="<span class="hljs-title">filterComment</span>($<span class="hljs-title">event</span>.<span class="hljs-title">target</span>.<span class="hljs-title">value</span>)"&gt;&lt;/<span class="hljs-title">textarea</span>&gt;
            `,
            <span class="hljs-title">data</span>()</span>{
                <span class="hljs-keyword">return</span> {
                    sensitiveList:[<span class="hljs-string">'包子'</span>,<span class="hljs-string">'蛤蛤'</span>],
                    replaceWord:<span class="hljs-string">'河蟹'</span>
                }
            },
            methods: {
                filterComment(comment){
                    <span class="hljs-keyword">var</span> that = <span class="hljs-keyword">this</span>;
                    <span class="hljs-keyword">this</span>.sensitiveList.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(word)</span></span>{
                        <span class="hljs-keyword">var</span> regex = <span class="hljs-keyword">new</span> RegExp(word,<span class="hljs-string">'g'</span>);;
                        comment = (comment.indexOf(word) &gt;= <span class="hljs-number">0</span> ? comment.replace(regex,that.replaceWord) : comment);
                    })
                    <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'input'</span>,comment)
                }
            }
        });
    
        <span class="hljs-keyword">var</span> vm = <span class="hljs-keyword">new</span> Vue({
            el:<span class="hljs-string">"#root"</span>,
            data:{
                comment:<span class="hljs-string">'这是一条评论'</span>
            }
        });
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue 2.0 入门系列（11）双向绑定其他元素以及自定义表单控件

## 原文链接
[https://segmentfault.com/a/1190000009225098](https://segmentfault.com/a/1190000009225098)

