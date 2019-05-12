---
title: 'VUE的总结(2)' 
date: 2019-02-14 2:30:37
hidden: true
slug: 753ijhie7cp
categories: [reprint]
---

{{< raw >}}

                    
<p>用到的代码： <a href="https://github.com/liyang1234567890/VUE-" rel="nofollow noreferrer" target="_blank">https://github.com/liyang1234...</a><br>vue.js API传送门： <a href="https://cn.vuejs.org/v2/api/" rel="nofollow noreferrer" target="_blank">https://cn.vuejs.org/v2/api/</a></p>
<h1 id="articleHeader0">v-on指令</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;>
    <meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;>
    <title>v-on指令</title>
</head>
<body>
    <div id=&quot;app&quot;>
        <button v-on:click=&quot;clickhandler&quot;>btn</button>
    </div>
    <script src=&quot;vue.min.js&quot;></script>

    <script>
        let vm = new Vue({
            el: '#app',
            data: {},
            methods: {
                clickhandler(){
                    console.log(Math.random());
                }
            }
        });
    </script>
</body>
</html>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1.0"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"X-UA-Compatible"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"ie=edge"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>v-on指令<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">v-on:click</span>=<span class="hljs-string">"clickhandler"</span>&gt;</span>btn<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"vue.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">let</span> vm = <span class="hljs-keyword">new</span> Vue({
            <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
            <span class="hljs-attr">data</span>: {},
            <span class="hljs-attr">methods</span>: {
                clickhandler(){
                    <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Math</span>.random());
                }
            }
        });
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbiCaH?w=416&amp;h=504" src="https://static.alili.tech/img/bVbiCaH?w=416&amp;h=504" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>点击按钮产生了随机数，v-on：可以用@代替。</p>
<hr>
<h2 id="articleHeader1">点击按钮，数字自增</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <div id=&quot;app&quot;>
        <button v-on:click=&quot;clickhandler&quot;>btn</button>
        <h1>"{{"num"}}"</h1>
    </div>
    <script src=&quot;vue.min.js&quot;></script>

    <script>
        let vm = new Vue({
            el: '#app',
            data: {
                num: 0
            },
            methods: {
                clickhandler(){
                    this. num++;
                }
            }
        }); 
    </script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml">    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">v-on:click</span>=<span class="hljs-string">"clickhandler"</span>&gt;</span>btn<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span></span><span class="hljs-template-variable">"{{"num"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"vue.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">let</span> vm = <span class="hljs-keyword">new</span> Vue({
            <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
            <span class="hljs-attr">data</span>: {
                <span class="hljs-attr">num</span>: <span class="hljs-number">0</span>
            },
            <span class="hljs-attr">methods</span>: {
                clickhandler(){
                    <span class="hljs-keyword">this</span>. num++;
                }
            }
        }); 
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>点击按钮数字增加</p>
<p><span class="img-wrap"><img data-src="/img/bVbiCcj?w=252&amp;h=166" src="https://static.alili.tech/img/bVbiCcj?w=252&amp;h=166" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<hr>
<h2 id="articleHeader2">但是有时候我们是要传参数的</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <button v-on:click=&quot;clickhandler(2)&quot;>btn</button> <!-- 相当于函数调用 2是实参  -->
    <h1 v-text=&quot;num&quot;></h1>
</div>
<script src=&quot;vue.min.js&quot;></script>

<script>
    let vm = new Vue({
        el: '#app',
        data: {
            num: 0
        },
        methods: {//相当于函数声明
            clickhandler(n){
                this. num += n;
            }
        }
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">v-on:click</span>=<span class="hljs-string">"clickhandler(2)"</span>&gt;</span>btn<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span> <span class="hljs-comment">&lt;!-- 相当于函数调用 2是实参  --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">v-text</span>=<span class="hljs-string">"num"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"vue.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">let</span> vm = <span class="hljs-keyword">new</span> Vue({
        <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
        <span class="hljs-attr">data</span>: {
            <span class="hljs-attr">num</span>: <span class="hljs-number">0</span>
        },
        <span class="hljs-attr">methods</span>: {<span class="hljs-comment">//相当于函数声明</span>
            clickhandler(n){
                <span class="hljs-keyword">this</span>. num += n;
            }
        }
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>这样就是每点击一次增加2</p>
<hr>
<h2 id="articleHeader3">获取事件源用$event</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <button v-on:click=&quot;clickhandler(2,$event)&quot;>btn</button> <!-- 相当于函数调用 2是实参  -->
    <h1 v-text=&quot;num&quot;></h1>
</div>
<script src=&quot;vue.min.js&quot;></script>

<script>
    let vm = new Vue({
        el: '#app',
        data: {
            num: 0
        },
        methods: {//相当于函数声明
            clickhandler(n,e){
                this. num += n;
                console.log(e);
            }
        }
    });
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">v-on:click</span>=<span class="hljs-string">"clickhandler(2,$event)"</span>&gt;</span>btn<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span> <span class="hljs-comment">&lt;!-- 相当于函数调用 2是实参  --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">v-text</span>=<span class="hljs-string">"num"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"vue.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">let</span> vm = <span class="hljs-keyword">new</span> Vue({
        <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
        <span class="hljs-attr">data</span>: {
            <span class="hljs-attr">num</span>: <span class="hljs-number">0</span>
        },
        <span class="hljs-attr">methods</span>: {<span class="hljs-comment">//相当于函数声明</span>
            clickhandler(n,e){
                <span class="hljs-keyword">this</span>. num += n;
                <span class="hljs-built_in">console</span>.log(e);
            }
        }
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbiCe7?w=322&amp;h=336" src="https://static.alili.tech/img/bVbiCe7?w=322&amp;h=336" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<hr>
<h2 id="articleHeader4">可以在按钮上绑定多个事件</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <button v-on:click=&quot;clickhandler(2,$event)&quot;>btn</button> <!-- 相当于函数调用 2是实参  -->
    <h1 v-text=&quot;num&quot;></h1>

    <button v-on=&quot;{mousedown: doThis, mouseup: doThat}&quot;>btn2</button>
</div>
<script src=&quot;vue.min.js&quot;></script>

<script>
    let vm = new Vue({
        el: '#app',
        data: {
            num: 0
        },
        methods: {//相当于函数声明
            clickhandler(n,e){
                this. num += n;
                console.log(e);
            },
            doThis(e){
                console.log('doThis');
            },
            doThat(e){
                console.log('doThat');
            }
        }
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">v-on:click</span>=<span class="hljs-string">"clickhandler(2,$event)"</span>&gt;</span>btn<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span> <span class="hljs-comment">&lt;!-- 相当于函数调用 2是实参  --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">v-text</span>=<span class="hljs-string">"num"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">v-on</span>=<span class="hljs-string">"{mousedown: doThis, mouseup: doThat}"</span>&gt;</span>btn2<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"vue.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">let</span> vm = <span class="hljs-keyword">new</span> Vue({
        <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
        <span class="hljs-attr">data</span>: {
            <span class="hljs-attr">num</span>: <span class="hljs-number">0</span>
        },
        <span class="hljs-attr">methods</span>: {<span class="hljs-comment">//相当于函数声明</span>
            clickhandler(n,e){
                <span class="hljs-keyword">this</span>. num += n;
                <span class="hljs-built_in">console</span>.log(e);
            },
            doThis(e){
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'doThis'</span>);
            },
            doThat(e){
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'doThat'</span>);
            }
        }
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>按下鼠标输出doThis 放开鼠标输出doThat<br><span class="img-wrap"><img data-src="/img/bVbiCpP?w=265&amp;h=346" src="https://static.alili.tech/img/bVbiCpP?w=265&amp;h=346" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<hr>
<h2 id="articleHeader5">冒泡</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style>
    #div1{
        width: 400px;
        height: 400px;
        background: red;
    }
    #div2{
        width: 200px;
        height: 200px;
        background: green;
    }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-id">#div1</span>{
        <span class="hljs-attribute">width</span>: <span class="hljs-number">400px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">400px</span>;
        <span class="hljs-attribute">background</span>: red;
    }
    <span class="hljs-selector-id">#div2</span>{
        <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">background</span>: green;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>&lt;/head&gt;<br>&lt;body&gt;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <button v-on:click=&quot;clickhandler(2,$event)&quot;>btn</button> <!-- 相当于函数调用 2是实参  -->
    <h1 v-text=&quot;num&quot;></h1>
    <button v-on=&quot;{mousedown: doThis, mouseup: doThat}&quot;>btn2</button>

    <div id=&quot;div1&quot; @click=&quot;clickDiv1&quot;>
        <div id=&quot;div2&quot; @click=&quot;clickDiv2&quot;></div>
    </div>
</div>


<script src=&quot;vue.min.js&quot;></script>

<script>
    let vm = new Vue({
        el: '#app',
        data: {
            num: 0
        },
        methods: {//相当于函数声明
            clickhandler(n,e){
                this. num += n;
                console.log(e);
            },
            doThis(e){
                console.log('doThis');
            },
            doThat(e){
                console.log('doThat');
            },
            clickDiv1(){
                console.log('div1');
            },
            clickDiv2(){
                console.log('div2');
            }
        }
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">v-on:click</span>=<span class="hljs-string">"clickhandler(2,$event)"</span>&gt;</span>btn<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span> <span class="hljs-comment">&lt;!-- 相当于函数调用 2是实参  --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">v-text</span>=<span class="hljs-string">"num"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">v-on</span>=<span class="hljs-string">"{mousedown: doThis, mouseup: doThat}"</span>&gt;</span>btn2<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"div1"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"clickDiv1"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"div2"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"clickDiv2"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>


<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"vue.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">let</span> vm = <span class="hljs-keyword">new</span> Vue({
        <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
        <span class="hljs-attr">data</span>: {
            <span class="hljs-attr">num</span>: <span class="hljs-number">0</span>
        },
        <span class="hljs-attr">methods</span>: {<span class="hljs-comment">//相当于函数声明</span>
            clickhandler(n,e){
                <span class="hljs-keyword">this</span>. num += n;
                <span class="hljs-built_in">console</span>.log(e);
            },
            doThis(e){
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'doThis'</span>);
            },
            doThat(e){
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'doThat'</span>);
            },
            clickDiv1(){
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'div1'</span>);
            },
            clickDiv2(){
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'div2'</span>);
            }
        }
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>点击div2 再点击div1</p>
<p><span class="img-wrap"><img data-src="/img/bVbiCtk?w=573&amp;h=401" src="https://static.alili.tech/img/bVbiCtk?w=573&amp;h=401" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="先捕获后冒泡，冒泡从里往外，先输出div2，再输出div1。


" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs smali"><code>先捕获后冒泡，冒泡从里往外，先输出div2，再输出div1。


</code></pre>
<hr>
<h2 id="articleHeader6">阻止冒泡</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;div1&quot; @click=&quot;clickDiv1&quot;>
        <div id=&quot;div2&quot; @click=&quot;clickDiv2($event)&quot;></div>
</div>
clickDiv1(){
                console.log('div1');
            }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">"div1"</span> @click=<span class="hljs-string">"clickDiv1"</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">"div2"</span> @click=<span class="hljs-string">"clickDiv2($event)"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;
clickDiv1(){
                console.<span class="hljs-built_in">log</span>('div1');
            },</code></pre>
<p>clickDiv2(e){</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="                console.log('div2');
                e.stopPropagation();
            }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>                <span class="hljs-selector-tag">console</span><span class="hljs-selector-class">.log</span>(<span class="hljs-string">'div2'</span>);
                <span class="hljs-selector-tag">e</span><span class="hljs-selector-class">.stopPropagation</span>();
            }
</code></pre>
<p>点击div2,只输出div2<br><span class="img-wrap"><img data-src="/img/bVbiCvB?w=547&amp;h=402" src="https://static.alili.tech/img/bVbiCvB?w=547&amp;h=402" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<hr>
<h2 id="articleHeader7">使用vue的方法 @click.stop</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;div1&quot; @click=&quot;clickDiv1&quot;>
    <div id=&quot;div2&quot; @click.stop=&quot;clickDiv2($event)&quot;></div>
</div>
clickDiv1(){
                console.log('div1');
            }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">"div1"</span> @click=<span class="hljs-string">"clickDiv1"</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">"div2"</span> @click.stop=<span class="hljs-string">"clickDiv2($event)"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;
clickDiv1(){
                console.<span class="hljs-built_in">log</span>('div1');
            },</code></pre>
<p>clickDiv2(e){</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="                console.log('div2');
            }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code>                console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'div2'</span>)<span class="hljs-comment">;</span>
            }</code></pre>
<p>同样可以阻止冒泡   <br><span class="img-wrap"><img data-src="/img/bVbiCwa?w=534&amp;h=400" src="https://static.alili.tech/img/bVbiCwa?w=534&amp;h=400" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<hr>
<h2 id="articleHeader8">阻止浏览器默认行为</h2>
<p><a href="http://www.baidu.com" rel="nofollow noreferrer" target="_blank">baidu</a><br>点击超链接会默认跳转到百度网页，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<a href=&quot;http://www.baidu.com&quot; @click=&quot;baidu($event)&quot;>baidu</a>
baidu(e){
             e.preventDefault();
        }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>&lt;a href=<span class="hljs-string">"http://www.baidu.com"</span> @click=<span class="hljs-string">"baidu($event)"</span>&gt;<span class="hljs-keyword">baidu&lt;/a&gt;
</span><span class="hljs-keyword">baidu(e){
</span>             e.preventDefault()<span class="hljs-comment">;</span>
        }</code></pre>
<p>点击超链接之后不会跳转了         <br><span class="img-wrap"><img data-src="/img/bVbiCxE?w=281&amp;h=76" src="https://static.alili.tech/img/bVbiCxE?w=281&amp;h=76" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>vue提供的修饰符 .prevent</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<a href=&quot;http://www.baidu.com&quot; @click.prevent=&quot;baidu($event)&quot;>baidu</a>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"http://www.baidu.com"</span> @<span class="hljs-attr">click.prevent</span>=<span class="hljs-string">"baidu($event)"</span>&gt;</span>baidu<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></code></pre>
<p>同样能阻止默认行为</p>
<hr>
<h2 id="articleHeader9">两个修饰符可以连着写</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<a href=&quot;http://www.baidu.com&quot; @click.stop.prevent=&quot;baidu($event)&quot;>baidu</a>

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;<span class="hljs-selector-tag">a</span> href=<span class="hljs-string">"http://www.baidu.com"</span> @click<span class="hljs-selector-class">.stop</span><span class="hljs-selector-class">.prevent</span>=<span class="hljs-string">"baidu($event)"</span>&gt;baidu&lt;/a&gt;

</code></pre>
<hr>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input type=&quot;text&quot; @keyup=&quot;keyuphandler($event)&quot;>
keyuphandler(e){
     if(e.keyCode == 13){//13是回车
         console.log('hahahahh');
     }
}
当在输入框中按回车键时，输出一串 。。。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>&lt;input <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"text"</span> <span class="hljs-meta">@keyup</span>=<span class="hljs-string">"keyuphandler($event)"</span>&gt;
keyuphandler(e){
     <span class="hljs-keyword">if</span>(e.keyCode == <span class="hljs-number">13</span>){<span class="hljs-comment">//13是回车</span>
         console.log(<span class="hljs-symbol">'hahahah</span>h');
     }
}
当在输入框中按回车键时，输出一串 。。。</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbiCzQ?w=508&amp;h=126" src="https://static.alili.tech/img/bVbiCzQ?w=508&amp;h=126" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>keyCode总结：<a href="https://www.cnblogs.com/daysme/p/6272570.html" rel="nofollow noreferrer" target="_blank">https://www.cnblogs.com/daysm...</a></p>
<hr>
<h2 id="articleHeader10">.once修饰符表示只能一次</h2>
<p>&lt;button v-on:click.once="clickhandler(2,$event)"&gt;btn&lt;/button&gt;<br>按钮只能点击一次<br><span class="img-wrap"><img data-src="/img/bVbiDkA?w=114&amp;h=108" src="https://static.alili.tech/img/bVbiDkA?w=114&amp;h=108" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<hr>
<h1 id="articleHeader11">v-model指令</h1>
<h2 id="articleHeader12">原理</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <div id=&quot;app&quot;>
        用户名: <input type=&quot;text&quot; v-model=&quot;username&quot;>
        <h4>用户名是："{{"username"}}"</h4>
    </div>

    <script src=vue.min.js></script>

    <script>
        new Vue({
            el: '#app',
            data: {
                username: ''
            }
        });
    </script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml">    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
        用户名: <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"username"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h4</span>&gt;</span>用户名是：</span><span class="hljs-template-variable">"{{"username"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h4</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">vue.min.js</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
        <span class="hljs-keyword">new</span> Vue({
            el: <span class="hljs-string">'#app'</span>,
            data: {
                username: <span class="hljs-string">''</span>
            }
        });
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</span></code></pre>
<p>input框里输入什么就显示什么      <br><span class="img-wrap"><img data-src="/img/bVbiDkC?w=286&amp;h=97" src="https://static.alili.tech/img/bVbiDkC?w=286&amp;h=97" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><strong>原理:&lt;input&gt;相当于View层，通过v-model绑定上data里面的username,将数据自动同步到Model层,双花括号将两者联系起来，Model层将数据同步到“用户名是：”的View层，这就是双向数据绑定。</strong></p>
<p><span class="img-wrap"><img data-src="/img/bVbiDkS?w=773&amp;h=396" src="https://static.alili.tech/img/bVbiDkS?w=773&amp;h=396" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader13">v-model只限制于能使用的标签：&lt;input&gt;&lt;select&gt;&lt;textarea&gt;</h2>
<p><strong>v-model自动将radio设成单选</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 性别: <input type=&quot;radio&quot;>男
 <input type=&quot;radio&quot;>女" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fsharp"><code> 性别: &lt;input <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"radio"</span>&gt;男
 &lt;input <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"radio"</span>&gt;女</code></pre>
<p>现在是单选框可以多选  <br><span class="img-wrap"><img data-src="/img/bVbiDkT?w=191&amp;h=59" src="https://static.alili.tech/img/bVbiDkT?w=191&amp;h=59" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="性别: <input type=&quot;radio&quot; name=&quot;sex&quot;>男
<input type=&quot;radio&quot; name=&quot;sex&quot;>女" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fsharp"><code>性别: &lt;input <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"radio"</span> name=<span class="hljs-string">"sex"</span>&gt;男
&lt;input <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"radio"</span> name=<span class="hljs-string">"sex"</span>&gt;女</code></pre>
<p>添加name属性可以实现单选<br><span class="img-wrap"><img data-src="/img/bVbiDkU?w=210&amp;h=73" src="https://static.alili.tech/img/bVbiDkU?w=210&amp;h=73" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><strong>现在用v-model试一下</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="性别: <input type=&quot;radio&quot; value=&quot;男&quot; v-model=&quot;sex&quot;>男
<input type=&quot;radio&quot; value=&quot;女&quot; v-model=&quot;sex&quot;>女
<h4>用户的性别是:"{{"sex"}}"</h4>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml">性别: <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"radio"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"男"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"sex"</span>&gt;</span>男
<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"radio"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"女"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"sex"</span>&gt;</span>女
<span class="hljs-tag">&lt;<span class="hljs-name">h4</span>&gt;</span>用户的性别是:</span><span class="hljs-template-variable">"{{"sex"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h4</span>&gt;</span></span></code></pre>
<p><strong>后台接收数据接的是value</strong> </p>
<p><span class="img-wrap"><img data-src="/img/bVbiDkV?w=154&amp;h=107" src="https://static.alili.tech/img/bVbiDkV?w=154&amp;h=107" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<hr>
<h2 id="articleHeader14">多选框</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="爱好:<input type=&quot;checkbox&quot; value=&quot;篮球&quot; v-model=&quot;hobbys&quot;>篮球
     <input type=&quot;checkbox&quot; value=&quot;足球&quot; v-model=&quot;hobbys&quot;>足球
     <input type=&quot;checkbox&quot; value=&quot;排球&quot; v-model=&quot;hobbys&quot;>排球
     <h4>用户的爱好是:"{{"hobbys"}}"</h4>
data: {
            hobbys:[]
        }     
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>爱好:&lt;<span class="hljs-built_in">input</span> <span class="hljs-built_in">type</span>=<span class="hljs-string">"checkbox"</span> value=<span class="hljs-string">"篮球"</span> v-model=<span class="hljs-string">"hobbys"</span>&gt;篮球
     &lt;<span class="hljs-built_in">input</span> <span class="hljs-built_in">type</span>=<span class="hljs-string">"checkbox"</span> value=<span class="hljs-string">"足球"</span> v-model=<span class="hljs-string">"hobbys"</span>&gt;足球
     &lt;<span class="hljs-built_in">input</span> <span class="hljs-built_in">type</span>=<span class="hljs-string">"checkbox"</span> value=<span class="hljs-string">"排球"</span> v-model=<span class="hljs-string">"hobbys"</span>&gt;排球
     <span class="hljs-symbol">&lt;h4&gt;</span>用户的爱好是:"{{"hobbys"}}"&lt;/h4&gt;
dat<span class="hljs-variable">a:</span> {
            hobby<span class="hljs-variable">s:</span>[]
        }     
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbiDk0?w=308&amp;h=98" src="https://static.alili.tech/img/bVbiDk0?w=308&amp;h=98" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<hr>
<h2 id="articleHeader15">下拉列表</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 公司:<select name=&quot;&quot; id=&quot;&quot; v-model=&quot;company&quot;>
         <option value=&quot;百度&quot;>百度</option>
         <option value=&quot;百度&quot;>阿里巴巴</option>
         <option value=&quot;百度&quot;>腾讯</option>
     </select>
<h4>用户的公司是:"{{"company"}}"</h4>
data:{
        company:' ' 
     }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code> 公司:&lt;select name=<span class="hljs-string">""</span> id=<span class="hljs-string">""</span> v-model=<span class="hljs-string">"company"</span>&gt;
         &lt;<span class="hljs-keyword">option</span> <span class="hljs-keyword">value</span>=<span class="hljs-string">"百度"</span>&gt;百度&lt;/<span class="hljs-keyword">option</span>&gt;
         &lt;<span class="hljs-keyword">option</span> <span class="hljs-keyword">value</span>=<span class="hljs-string">"百度"</span>&gt;阿里巴巴&lt;/<span class="hljs-keyword">option</span>&gt;
         &lt;<span class="hljs-keyword">option</span> <span class="hljs-keyword">value</span>=<span class="hljs-string">"百度"</span>&gt;腾讯&lt;/<span class="hljs-keyword">option</span>&gt;
     &lt;/select&gt;
&lt;h4&gt;用户的公司是:"{{"company"}}"&lt;/h4&gt;
data:{
        company:<span class="hljs-string">' '</span> 
     }
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbiDk1?w=183&amp;h=105" src="https://static.alili.tech/img/bVbiDk1?w=183&amp;h=105" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<hr>
<h2 id="articleHeader16">textarea</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <textarea value=&quot;自我介绍&quot; cols=&quot;30&quot; rows=&quot;10&quot; id=&quot;&quot; v-model=&quot;description&quot;></textarea>
 <h4>我的描述是："{{"description"}}"</h4>
 data: {
     description:''
     }
 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"> <span class="hljs-tag">&lt;<span class="hljs-name">textarea</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"自我介绍"</span> <span class="hljs-attr">cols</span>=<span class="hljs-string">"30"</span> <span class="hljs-attr">rows</span>=<span class="hljs-string">"10"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">""</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"description"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">textarea</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">h4</span>&gt;</span>我的描述是：</span><span class="hljs-template-variable">"{{"description}</span><span class="xml">}<span class="hljs-tag">&lt;/<span class="hljs-name">h4</span>&gt;</span>
 data: </span><span class="hljs-template-variable">{
     description:''
     }</span><span class="xml">
 </span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbiDk2?w=285&amp;h=243" src="https://static.alili.tech/img/bVbiDk2?w=285&amp;h=243" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<hr>
<h2 id="articleHeader17">几个修饰符</h2>
<p><strong>.lazy 当鼠标挪出input框的时候才回显</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="            用户名: <input type=&quot;text&quot; v-model=&quot;username&quot;>
            <h4>用户名是："{{"username"}}"</h4>

            用户名lazy: <input type=&quot;text&quot; v-model.lazy=&quot;username&quot;>
            <h4>用户名是："{{"username"}}"</h4>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml">            用户名: <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"username"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h4</span>&gt;</span>用户名是：</span><span class="hljs-template-variable">"{{"username"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h4</span>&gt;</span>

            用户名lazy: <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">v-model.lazy</span>=<span class="hljs-string">"username"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h4</span>&gt;</span>用户名是：</span><span class="hljs-template-variable">"{{"username"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h4</span>&gt;</span></span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbiDk4?w=297&amp;h=182" src="https://static.alili.tech/img/bVbiDk4?w=297&amp;h=182" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bVbiDk5?w=269&amp;h=178" src="https://static.alili.tech/img/bVbiDk5?w=269&amp;h=178" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<hr>
<p><strong>.number</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="             年龄:<input type=&quot;text&quot; v-model=&quot;age&quot;>
            <h4>用户的年龄是:"{{"age"}}"</h4>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml">             年龄:<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"age"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h4</span>&gt;</span>用户的年龄是:</span><span class="hljs-template-variable">"{{"age"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h4</span>&gt;</span></span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbiDk9?w=262&amp;h=95" src="https://static.alili.tech/img/bVbiDk9?w=262&amp;h=95" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bVbiDla?w=205&amp;h=138" src="https://static.alili.tech/img/bVbiDla?w=205&amp;h=138" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>得到的数据类型是 string</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="            年龄:<input type=&quot;text&quot; v-model.number=&quot;age&quot;>
            <h4>用户的年龄是:"{{"age"}}"</h4>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml">            年龄:<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">v-model.number</span>=<span class="hljs-string">"age"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h4</span>&gt;</span>用户的年龄是:</span><span class="hljs-template-variable">"{{"age"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h4</span>&gt;</span></span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbiDlb?w=263&amp;h=109" src="https://static.alili.tech/img/bVbiDlb?w=263&amp;h=109" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/bVbiDld?w=181&amp;h=121" src="https://static.alili.tech/img/bVbiDld?w=181&amp;h=121" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>得到的数据类型是 number</p>
<p>将type改成number,输入框可以有增加减少功能</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="            年龄:<input type=&quot;number&quot; v-model.number=&quot;age&quot;>
            <h4>用户的年龄是:"{{"age"}}"</h4>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml">            年龄:<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"number"</span> <span class="hljs-attr">v-model.number</span>=<span class="hljs-string">"age"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h4</span>&gt;</span>用户的年龄是:</span><span class="hljs-template-variable">"{{"age"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h4</span>&gt;</span></span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbiDle?w=234&amp;h=93" src="https://static.alili.tech/img/bVbiDle?w=234&amp;h=93" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<hr>
<p>.trim去掉首尾空格</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="          用户名trim: <input type=&quot;text&quot; v-model.trim=&quot;username&quot;>
          <h4>用户名是："{{"username"}}"</h4>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml">          用户名trim: <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">v-model.trim</span>=<span class="hljs-string">"username"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">h4</span>&gt;</span>用户名是：</span><span class="hljs-template-variable">"{{"username"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h4</span>&gt;</span></span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbiDlf?w=296&amp;h=253" src="https://static.alili.tech/img/bVbiDlf?w=296&amp;h=253" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<hr>
<h2 id="articleHeader18">v-bind绑定属性</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body>
<div id=&quot;app&quot;>
    <img src=&quot;imgSrc&quot; alt=&quot;&quot;>
</div>

<script src=&quot;vue.min.js&quot;></script>

<script>
    new Vue({
        el: '#app',
        data: {
            imgSrc: 'https://cn.vuejs.org/images/logo.png'
        }

    });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"imgSrc"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"vue.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    <span class="hljs-keyword">new</span> Vue({
        el: <span class="hljs-string">'#app'</span>,
        data: {
            imgSrc: <span class="hljs-string">'https://cn.vuejs.org/images/logo.png'</span>
        }

    });</span></code></pre>
<p>想把ImgSrc的地址作为img标签中的图片，但是会报错：</p>
<p><span class="img-wrap"><img data-src="/img/bVbiDlk?w=365&amp;h=82" src="https://static.alili.tech/img/bVbiDlk?w=365&amp;h=82" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<img v-bind:src=&quot;imgSrc&quot; alt=&quot;&quot;>OK了" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">&lt;<span class="hljs-selector-tag">img</span> v-bind:src=<span class="hljs-string">"imgSrc"</span> alt=<span class="hljs-string">""</span>&gt;OK了</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbiDll?w=455&amp;h=421" src="https://static.alili.tech/img/bVbiDll?w=455&amp;h=421" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>v-bind的简写形式是冒号<strong>:</strong></p>
<hr>
<h2 id="articleHeader19">小例子</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    .aa{
        width: 100px;
        height: 100px;
        background: #F00;
    }
    <div class=&quot;aa&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>    .aa{
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#F00</span>;
    }
    &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"aa"</span>&gt;&lt;/div&gt;</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbiDlm?w=173&amp;h=164" src="https://static.alili.tech/img/bVbiDlm?w=173&amp;h=164" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 
         .aa{
        width: 100px;
        height: 100px;
        background: #F00;
    }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code> 
         <span class="hljs-selector-class">.aa</span>{
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#F00</span>;
    }
</code></pre>
<p>v-bind的方式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        .aa{
            width: 100px;
            height: 100px;
            background: #F00;
        }
        <div :class=&quot;className&quot;></div>
        data:{
            className:'aa'
            }
            

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code>        .aa{
            <span class="hljs-symbol">width:</span> <span class="hljs-number">100</span>px;
            <span class="hljs-symbol">height:</span> <span class="hljs-number">100</span>px;
            <span class="hljs-symbol">background:</span> <span class="hljs-comment">#F00;</span>
        }
        &lt;div <span class="hljs-symbol">:class=<span class="hljs-string">"className"</span>&gt;&lt;/div&gt;</span>
        <span class="hljs-symbol">data:</span>{
            <span class="hljs-symbol">className:</span><span class="hljs-string">'aa'</span>
            }
            

</code></pre>
<hr>
<h2 id="articleHeader20">值控制是否显示</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    .aa{
        width: 100px;
        height: 100px;
        background: #F00;
    }
    <div :class=&quot;className&quot;></div>
    <div :class=&quot;{aa:isAA}&quot;></div>
    data:{
        isAA: true
        }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code>    .aa{
        <span class="hljs-symbol">width:</span> <span class="hljs-number">100</span>px;
        <span class="hljs-symbol">height:</span> <span class="hljs-number">100</span>px;
        <span class="hljs-symbol">background:</span> <span class="hljs-comment">#F00;</span>
    }
    &lt;div <span class="hljs-symbol">:class=<span class="hljs-string">"className"</span>&gt;&lt;/div&gt;</span>
    &lt;div <span class="hljs-symbol">:class=<span class="hljs-string">"{aa:isAA}"</span>&gt;&lt;/div&gt;</span>
    <span class="hljs-symbol">data:</span>{
        <span class="hljs-symbol">isAA:</span> <span class="hljs-keyword">true</span>
        }</code></pre>
<p>意思是样式显示取决于isAA是否为true<br><span class="img-wrap"><img data-src="/img/bVbiDlr?w=287&amp;h=249" src="https://static.alili.tech/img/bVbiDlr?w=287&amp;h=249" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<hr>
<h2 id="articleHeader21">样式写在对象中</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div :style=&quot;styleObj&quot;></div>
 styleObj: {
                width: '100px',
                height: '100px',
                background: '#0f0'

            }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code>&lt;div <span class="hljs-symbol">:style=<span class="hljs-string">"styleObj"</span>&gt;&lt;/div&gt;</span>
 <span class="hljs-symbol">styleObj:</span> {
                <span class="hljs-symbol">width:</span> <span class="hljs-string">'100px'</span>,
                <span class="hljs-symbol">height:</span> <span class="hljs-string">'100px'</span>,
                <span class="hljs-symbol">background:</span> <span class="hljs-string">'#0f0'</span>

            }
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbiDlB?w=224&amp;h=331" src="https://static.alili.tech/img/bVbiDlB?w=224&amp;h=331" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<hr>
<h1 id="articleHeader22">其他指令</h1>
<h2 id="articleHeader23">v-pre指令原样输出</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body>
<div id=&quot;app&quot;>
    <h1>"{{"msg"}}"</h1>

</div>

<script src=&quot;vue.min.js&quot;></script>

<script>
    new Vue({
        el: '#app',
        data: {
            msg: 'Hello'
        }
    });
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span></span><span class="hljs-template-variable">"{{"msg"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"vue.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    <span class="hljs-keyword">new</span> Vue({
        el: <span class="hljs-string">'#app'</span>,
        data: {
            msg: <span class="hljs-string">'Hello'</span>
        }
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbiDlO?w=147&amp;h=93" src="https://static.alili.tech/img/bVbiDlO?w=147&amp;h=93" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<h1 v-pre>"{{"msg"}}"</h1>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code style="word-break: break-word; white-space: initial;"><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">v-pre</span>&gt;</span></span><span class="hljs-template-variable">"{{"msg"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbiDlQ?w=163&amp;h=102" src="https://static.alili.tech/img/bVbiDlQ?w=163&amp;h=102" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<hr>
<h2 id="articleHeader24">v-cloak指令渲染完成后显示</h2>
<h2 id="articleHeader25">v-once只渲染一次</h2>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
VUE的总结(2)

## 原文链接
[https://segmentfault.com/a/1190000016795168](https://segmentfault.com/a/1190000016795168)

