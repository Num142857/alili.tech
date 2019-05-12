---
title: '【教学向】再加150行代码教你实现一个低配版的web component库（1） —设计篇' 
date: 2019-01-02 2:30:09
hidden: true
slug: ygsf1yzn5zr
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>上两篇Mvvm教程的热度超出我的预期，很多码友留言表扬同时希望我继续出下一篇教程，当时我也半开玩笑说只要点赞超10就兑现承诺，没想到还真破了10，所以就有了今天的文章。</p>
<h2 id="articleHeader1">准备工作</h2>
<p>熟读 <br><a href="https://segmentfault.com/a/1190000010744960">【教学向】150行代码教你实现一个低配版的MVVM库（1）- 原理篇</a><br><a href="https://segmentfault.com/a/1190000010752076" target="_blank">【教学向】150行代码教你实现一个低配版的MVVM库（2）- 代码篇</a></p>
<p>本篇是在上两篇的基础之上对代码进行进一步扩展，从而实现web component功能，所以读者务必掌握mvvm的实现机制才能深入理解本篇的内容（mvvm是web component的基石）。</p>
<h2 id="articleHeader2">什么才是好的 web component 设计</h2>
<p>目前市面上各大主流前端框架，凡事带web component功能的，他们的设计水准基本都不入我的法眼，唯一看得上眼的是google的polymer，但是在某些API设计层面也显得略微繁琐（想了解polymer的朋友看一翻一下我专栏里面10篇<a href="https://segmentfault.com/a/1190000003810019">polymer入门系列教程</a>）</p>
<h3 id="articleHeader3">什么是component</h3>
<p>html提供的原生标签，比如DIV, BUTTON, INPUT家族，Hx家族等等，这些就好比俄罗斯方块里的一块块标准积木,我们称它们为stand component<br><span class="img-wrap"><img data-src="/img/bVp8Zb" src="https://static.alili.tech/img/bVp8Zb" alt="2164182735-560b52e32e896" title="2164182735-560b52e32e896" style="cursor: pointer; display: inline;"></span></p>
<p>某一天这些积木不能满足你的需求了，被扩展或被组合形成了<strong>非基本</strong>形状<br><span class="img-wrap"><img data-src="/img/bVp9hq" src="https://static.alili.tech/img/bVp9hq" alt="2061348422-560b891619854" title="2061348422-560b891619854" style="cursor: pointer; display: inline;"></span></p>
<p>这些新形状就是custom component，自定义组件！为什么要有component呢，好处是什么呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 1. 可以复用
 2. 结构清晰
 3. 独立开发
 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code> <span class="hljs-number">1.</span> 可以复用
 <span class="hljs-number">2.</span> 结构清晰
 <span class="hljs-number">3.</span> 独立开发
 </code></pre>
<p>你稍微开动下脑筋就能分析出来了，我就不展开了。</p>
<h3 id="articleHeader4">我心目中的web component</h3>
<p>在座的各位都写过index.html么？很简单<br>主要就分成3大块内容，style, dom, script</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!--样式-->
<style>
</style>
<!--DOM UI-->
<body>
</body>
<!--逻辑-->
<script>
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!--样式--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="undefined">
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-comment">&lt;!--DOM UI--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-comment">&lt;!--逻辑--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="undefined">
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>然后外面用个&lt;html&gt;&lt;/html&gt;包裹</p>
<p>所以这期低配版web component库设计目的很简单，作为一个开发人员，我希望在写一个<strong>custom component</strong>的时候也能按照index.html的原生风格来写，这是多么的优雅，自然，没有学习成本啊！<br>这也应该是无数人心目中的web component设计</p>
<h3 id="articleHeader5">API设计</h3>
<p>所以，我们的SegmentFault.js v2.0的Web Component的设计宗旨就是，尽量接近原生的html结构和使用习惯,<strong>接近原生从而把学习成本降到最低，是我追求的东西</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- myComp.html //文件名还是以.html结尾,自然 -->
<sf-component>
    <style>
        <!--css-->
    </style>
    <template>
        <!-- any dom-->
    <template>
    <script>
        //js
    </script>
<sf-component>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- myComp.html //文件名还是以.html结尾,自然 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">sf-component</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="xml">
        <span class="hljs-comment">&lt;!--css--&gt;</span>
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- any dom--&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
        <span class="hljs-comment">//js</span>
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">sf-component</span>&gt;</span></code></pre>
<p>写个具体的例子</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- myComp.html -->
<sf-component>
    <style>
        button{
            color:red;
        }
        p{
            color:yellow;
        }
    </style>
    <template>
        <div>
            <input type=&quot;text&quot; sf-value=&quot;this.message&quot;/>
            <button sf-innerText=&quot;this.buttonName&quot; onclick=&quot;this.clickHandler()&quot;></button>
            <p sf-innerText=&quot;this.message&quot;> 
            </p>
        </div>
    </template>
    <script>
        this.message = &quot;this is a component&quot;;
        this.buttonName = &quot;click me&quot;;
        this.clickHandler = function(){
            alert(this.message);
        };
    </script>
</sf-component>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- myComp.html --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">sf-component</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        <span class="hljs-selector-tag">button</span>{
            <span class="hljs-attribute">color</span>:red;
        }
        <span class="hljs-selector-tag">p</span>{
            <span class="hljs-attribute">color</span>:yellow;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">sf-value</span>=<span class="hljs-string">"this.message"</span>/&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">sf-innerText</span>=<span class="hljs-string">"this.buttonName"</span> <span class="hljs-attr">onclick</span>=<span class="hljs-string">"this.clickHandler()"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">sf-innerText</span>=<span class="hljs-string">"this.message"</span>&gt;</span> 
            <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
        <span class="hljs-keyword">this</span>.message = <span class="hljs-string">"this is a component"</span>;
        <span class="hljs-keyword">this</span>.buttonName = <span class="hljs-string">"click me"</span>;
        <span class="hljs-keyword">this</span>.clickHandler = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
            alert(<span class="hljs-keyword">this</span>.message);
        };
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">sf-component</span>&gt;</span></code></pre>
<p>一个Component的描述文件定义好了，那么接下去就是如何引入它了。沿用上篇Mvvm中的风格，我们给SegmentFault这个Class弄个registerComponent(tagName,compPath)方法，比如在index.html中</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var sf = new SegmentFault();
sf.registerController(&quot;xxx&quot;,xxx);
...
sf.registerComponent(&quot;my-comp&quot;,&quot;components/myComp.html&quot;);
...
sf.init();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code><span class="hljs-built_in">var</span> <span class="hljs-built_in">sf</span> = <span class="hljs-built_in">new</span> SegmentFault();
<span class="hljs-built_in">sf</span>.registerController(<span class="hljs-string">"xxx"</span>,xxx);
...
<span class="hljs-built_in">sf</span>.registerComponent(<span class="hljs-string">"my-comp"</span>,<span class="hljs-string">"components/myComp.html"</span>);
...
<span class="hljs-built_in">sf</span>.init();</code></pre>
<p>而在父组件中我们就可以通过"my-comp"这个我们刚刚注册时起的标签名来引入这个组件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body>
    <div>...<div>
    <my-comp></my-comp>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>...<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">my-comp</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-comp</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
<p>怎么样！四个字：干净利落</p>
<h3 id="articleHeader6">一个Web Component库必须具备的基本素（功）养（能）</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 1. Mvvm 具备双向绑定功能
 2. Shadow Style 具有独立的不污染全局的css功能
 3. Communication 具有和父子兄弟组件通讯的功能
 4. 拥有生命周期 （属于高级功能，本低配版库不涉及）" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code> <span class="hljs-number">1.</span> Mvvm 具备双向绑定功能
 <span class="hljs-number">2.</span> Shadow Style 具有独立的不污染全局的css功能
 <span class="hljs-number">3.</span> Communication 具有和父子兄弟组件通讯的功能
 <span class="hljs-number">4.</span> 拥有生命周期 （属于高级功能，本低配版库不涉及）</code></pre>
<h4>第一点Mvvm</h4>
<p>Mvvm之前已经实现，我们只要套用之前的实现即可</p>
<h4>第二点Shadow Style</h4>
<p>可能很多人对这个没什么概念，我沿用前文中的内容，比如我们在component中定义了它的style，如</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- myComp.html -->
<sf-component>
    <style>
        button{
            color:red;
        }
        p{
            color:yellow;
        }
    </style>
    <template>
        <div>
            ...
        </div>
    </template>
    <script>
        ...
    </script>
</sf-component>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- myComp.html --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">sf-component</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        <span class="hljs-selector-tag">button</span>{
            <span class="hljs-attribute">color</span>:red;
        }
        <span class="hljs-selector-tag">p</span>{
            <span class="hljs-attribute">color</span>:yellow;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            ...
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="undefined">
        ...
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">sf-component</span>&gt;</span></code></pre>
<p>这里我们在&lt;style&gt;&lt;/style&gt;标签中，定义了css，其中p和button的写法在传统观念中都是会影响html页面中所有的p元素和button元素的，这是我们不希望发生的，我们希望的是这个&lt;style&gt;&lt;/style&gt;标签生效的作用域仅仅是在当前的，被定义的component中。这种有独立作用域的css就叫Shadow Style。</p>
<p>要实现Shadow Style，其实有比较简单的做法，本篇设计篇中不会涉及，你可以趁此独立思考下，待下篇看看是否与我不谋而合，或者有比我更加高级的方案。</p>
<h4>第三点Communication</h4>
<p>即组件之间的通讯，经常有人在sf中问到这个组件通讯问题，其实这个问题是有比较标准的答案的，即3点</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 1. 父子通讯: 父->子 通过 set 属性， 子->父 抛事件
 2. 兄弟通讯: 大儿子 抛事件给 -> 父 -> set 小儿子 的属性
 3. 远亲通讯: 走消息总线 （其实就在一个单例上搞事件机制）" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coq"><code> <span class="hljs-number">1.</span> 父子通讯: 父-&gt;子 通过 <span class="hljs-built_in">set</span> 属性， 子-&gt;父 抛事件
 <span class="hljs-number">2.</span> 兄弟通讯: 大儿子 抛事件给 -&gt; 父 -&gt; <span class="hljs-built_in">set</span> 小儿子 的属性
 <span class="hljs-number">3.</span> 远亲通讯: 走消息总线 （其实就在一个单例上搞事件机制）</code></pre>
<p>要实现通讯机制，其实也不复杂，主要就2个功能，1 父组件可以set子组件的属性， 2 组件可以向外层抛事件，外层也可以监听组件抛出的事件，所以，我们会如此设计这块的内容，觉个例子,代码说话</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body>
    <div>...<div>
    <my-comp sf-msg=&quot;vm.message&quot; sf-oncustomevent=&quot;vm.customEventHandler&quot;></my-comp>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code><span class="hljs-symbol">&lt;body&gt;</span>
    <span class="hljs-symbol">&lt;div&gt;</span>...<span class="hljs-symbol">&lt;div&gt;</span>
    &lt;my-<span class="hljs-keyword">comp</span> <span class="hljs-keyword">sf</span>-msg=<span class="hljs-string">"vm.message"</span> <span class="hljs-keyword">sf</span>-oncustomevent=<span class="hljs-string">"vm.customEventHandler"</span>&gt;&lt;/my-<span class="hljs-keyword">comp</span>&gt;
&lt;/body&gt;</code></pre>
<p>大家注意看，从父组件的角度，我可以使用<strong>sf-</strong> + propertyName(这里是msg) 来实现外部父组件对组件的赋值，而且还能使用<strong>sf-on</strong> + 自定义事件名称（这里是customevent） 对组件进行监听。</p>
<p>换个角度，从子组件角度出发，我可以被外部赋值，我可以可以向外部dispatch事件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<sf-component>
    <style>
        //...
    </style>
    <template>
        <div>
            <div class=&quot;compClass&quot;>
                <input type=&quot;text&quot; sf-value=&quot;this.message&quot; />
                <button sf-innerText=&quot;this.buttonName&quot; onclick=&quot;this.clickHandler()&quot;></button>
                <my-comp2 sf-msg=&quot;this.message&quot;></my-comp2>
                <p sf-innerText=&quot;this.message + ', hi Component1'&quot;>
                </p>
            </div>
        </div>
    </template>
    <script>
        this.buttonName = &quot;click me&quot;;
        this.clickHandler = function () {
            alert(this.message);
            this.dispatchEvent(&quot;customevent&quot;, &quot;hello world&quot;);//为component的vm,内置一个dispatchEvent方法，用法和原生的事件机制一毛一样。
        };
        Object.defineProperty(this, &quot;msg&quot;, {
            set: function (value) {
                if (value) {
                    this.message = value;
                }
            }
        });
    </script>
</sf-component>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">sf-component</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="undefined">
        //...
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"compClass"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">sf-value</span>=<span class="hljs-string">"this.message"</span> /&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">sf-innerText</span>=<span class="hljs-string">"this.buttonName"</span> <span class="hljs-attr">onclick</span>=<span class="hljs-string">"this.clickHandler()"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">my-comp2</span> <span class="hljs-attr">sf-msg</span>=<span class="hljs-string">"this.message"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-comp2</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">sf-innerText</span>=<span class="hljs-string">"this.message + ', hi Component1'"</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
        <span class="hljs-keyword">this</span>.buttonName = <span class="hljs-string">"click me"</span>;
        <span class="hljs-keyword">this</span>.clickHandler = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
            alert(<span class="hljs-keyword">this</span>.message);
            <span class="hljs-keyword">this</span>.dispatchEvent(<span class="hljs-string">"customevent"</span>, <span class="hljs-string">"hello world"</span>);<span class="hljs-comment">//为component的vm,内置一个dispatchEvent方法，用法和原生的事件机制一毛一样。</span>
        };
        Object.defineProperty(<span class="hljs-keyword">this</span>, <span class="hljs-string">"msg"</span>, {
            <span class="hljs-keyword">set</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(value)</span> </span>{
                <span class="hljs-keyword">if</span> (value) {
                    <span class="hljs-keyword">this</span>.message = value;
                }
            }
        });
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">sf-component</span>&gt;</span></code></pre>
<p>使用Object.defineProperty可以很大程度上满足我们对set property的需求，另外再给component的vm挂载一个内置的函数this.dispatchEvent来发送自定义事件我们就功德圆满了。</p>
<h4>第四点生命周期</h4>
<p>你可以给一个组件：由注册-&gt;加载定义-&gt;显示到DOM Tree-&gt;内容更新-&gt;从DOM Tree移除-&gt;销毁 等一系时间节点定义他的生命周期，如果是做的比较考究的库，你可以把这这些时间节点的变更都一一向用户通知，或者提供api供用户控制。本文设计的低配版库阉割了这部分高级功能，我们就是一教学向的库，不整这些有的没的。</p>
<h2 id="articleHeader7">结语</h2>
<p>至此，设计篇结束，主要介绍了一下本教学库的设计理念和一些web component的基本概念，欢迎点赞收藏评论，投硬笔投香蕉</p>
<p>如果本文阅读没有问题，请继续服用下一篇<br><a href="https://segmentfault.com/a/1190000010895646" target="_blank">【教学向】150行代码教你实现一个低配版的MVVM库（2）- 代码篇</a></p>
<h3 id="articleHeader8">相关阅读</h3>
<p><a href="https://segmentfault.com/a/1190000010744960">【教学向】150行代码教你实现一个低配版的MVVM库（1）- 原理篇</a><br><a href="https://segmentfault.com/a/1190000010752076" target="_blank">【教学向】150行代码教你实现一个低配版的MVVM库（2）- 代码篇</a><br><a href="https://segmentfault.com/a/1190000010877602">【教学向】再加150行代码教你实现一个低配版的web component库（1） —设计篇</a><br><a href="https://segmentfault.com/a/1190000010895646" target="_blank">【教学向】再加150行代码教你实现一个低配版的web component库（2） —原理篇</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【教学向】再加150行代码教你实现一个低配版的web component库（1） —设计篇

## 原文链接
[https://segmentfault.com/a/1190000010877602](https://segmentfault.com/a/1190000010877602)

