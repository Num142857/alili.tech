---
title: '也许vue+css3做交互特效更简单' 
date: 2018-12-25 2:30:11
hidden: true
slug: i7kref8hupo
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">1.前言</h2>
<p>做项目就难免会开发交互效果或者特效，而我最近开发的项目一直在使用<code>vue</code>，开发技术栈方面，理所当然就使用了<code>vue</code>+<code>css3</code>开发，过程中发现使用<code>vue</code>+<code>css3</code>开发特效，和<code>javascript</code>/<code>jquery</code>+<code>css3</code>的思维方式不一样，但是比<code>javascript</code>/<code>jquery</code>+<code>css3</code>简单一点点。今天就分享三个简单的小实例，希望能起到拓展思维的作用，让大家明白vue+css3应该怎样开发交互效果！如果大家有什么好的建议，或者觉得我哪里写错了，欢迎指出！</p>
<blockquote>1.文章上面的代码，虽然代码很简单，不难理解，但是也是建议大家边写边看，这样不会混乱。<br>2.文章所提及的小实例，都是很基础的，大家可以参照自己的想法进行扩展，或者修改，可能会有意想不到的效果。我写这类型的文章也是想授人以渔，不是授人以鱼！<br>3.这几个实例，摘自我自己的平常练习的项目，代码已经提到github上面了(<a href="https://github.com/chenhuiYj/demos/tree/master/vue-demos" rel="nofollow noreferrer" target="_blank">vue-demos</a>)。欢迎大家star。</blockquote>
<h2 id="articleHeader1">2.开场小动画</h2>
<h3 id="articleHeader2">运行效果</h3>
<p>gif图模糊效果看着跟实际效果不太一样！大家注意！</p>
<p><span class="img-wrap"><img data-src="/img/bVYw4l?w=892&amp;h=163" src="https://static.alili.tech/img/bVYw4l?w=892&amp;h=163" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader3">原理分析</h3>
<p>说到原理分析，其实也没什么可以分析的，就是在页面是下面这个状态的时候，把文字替换掉。至于看到字体缩成一团，就是<code>letter-spacing</code>这个<code>css</code>属性的控制效果。字体模糊就是<code>filter: blur()</code>这个<code>css</code>属性的控制效果！看到有逐渐的变化，就是css3动画（<code>animation</code>）的效果</p>
<p><span class="img-wrap"><img data-src="/img/bVYw4Q?w=816&amp;h=147" src="https://static.alili.tech/img/bVYw4Q?w=816&amp;h=147" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>下面简单分析下，这个动画的几个步骤，从下面看到，这个动画一共8个步骤。</p>
<p><span class="img-wrap"><img data-src="/img/bVYxkc?w=440&amp;h=704" src="https://static.alili.tech/img/bVYxkc?w=440&amp;h=704" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>这下就清晰明了了，我们要在下图这个瞬间开始改变文字，也就是页面加载了两秒后，动画执行了两次后就开始改变文字。然后每隔两秒改变一次文字，直到最后！</p>
<p><span class="img-wrap"><img data-src="/img/bVYxir?w=426&amp;h=91" src="https://static.alili.tech/img/bVYxir?w=426&amp;h=91" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>下面给出<code>vue</code>和<code>javascript</code>两种方式的代码，看下哪种方式更加的简单！</p>
<h3 id="articleHeader4">vue方式</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>Title</title>
</head>
<style>
    body{
        background: #ccc;
    }
    h1 {
        color: white;
        text-transform: uppercase;
        margin-top: 100px;
        text-align: center;
        font-size: 6rem;
        line-height: 1;
        animation: letterspacing 1s 7 alternate ease-in-out;
        display: block;
        letter-spacing: .5rem;
    }

    @keyframes letterspacing {
        0% {
            letter-spacing: -72px;
            filter: blur(20px);
        }

        40% {
            filter: blur(6px);
        }

        80% {
            letter-spacing: 8px;
            filter: blur(0);
        }
    }
</style>
<body>
<div id=&quot;text&quot;>
    <h1>"{{"testText"}}"</h1>
</div>
</body>
<script src=&quot;vue.min.js&quot;></script>
<script type=&quot;text/javascript&quot;>
    new Vue({
        el:'#text',
        data:{
            nowIndex:0,
            testText:'欢迎浏览'
        },
        mounted(){
            let _this=this;
            let timer = setInterval(function(){
                _this.nowIndex++;
                switch (_this.nowIndex) {
                    case 1:
                        _this.testText = '守候的文章';
                        break;
                    case 2:
                        _this.testText = '愿您浏览愉快';
                        break;
                    case 3:
                        _this.testText = '学到知识';
                        break;
                }
                if (_this.nowIndex > 3) {
                    setTimeout(() => {
                        clearInterval(timer);
                    }, 2000)
                }
            }, 2000)
        }
    })
</script>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Title<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">body</span>{
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#ccc</span>;
    }
    <span class="hljs-selector-tag">h1</span> {
        <span class="hljs-attribute">color</span>: white;
        <span class="hljs-attribute">text-transform</span>: uppercase;
        <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">text-align</span>: center;
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">6rem</span>;
        <span class="hljs-attribute">line-height</span>: <span class="hljs-number">1</span>;
        <span class="hljs-attribute">animation</span>: letterspacing <span class="hljs-number">1s</span> <span class="hljs-number">7</span> alternate ease-in-out;
        <span class="hljs-attribute">display</span>: block;
        <span class="hljs-attribute">letter-spacing</span>: .<span class="hljs-number">5rem</span>;
    }

    @<span class="hljs-keyword">keyframes</span> letterspacing {
        0% {
            <span class="hljs-attribute">letter-spacing</span>: -<span class="hljs-number">72px</span>;
            <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">blur</span>(20px);
        }

        40% {
            <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">blur</span>(6px);
        }

        80% {
            <span class="hljs-attribute">letter-spacing</span>: <span class="hljs-number">8px</span>;
            <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">blur</span>(0);
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"text"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span></span><span class="hljs-template-variable">"{{"testText"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"vue.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">new</span> Vue({
        <span class="hljs-attr">el</span>:<span class="hljs-string">'#text'</span>,
        <span class="hljs-attr">data</span>:{
            <span class="hljs-attr">nowIndex</span>:<span class="hljs-number">0</span>,
            <span class="hljs-attr">testText</span>:<span class="hljs-string">'欢迎浏览'</span>
        },
        mounted(){
            <span class="hljs-keyword">let</span> _this=<span class="hljs-keyword">this</span>;
            <span class="hljs-keyword">let</span> timer = setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                _this.nowIndex++;
                <span class="hljs-keyword">switch</span> (_this.nowIndex) {
                    <span class="hljs-keyword">case</span> <span class="hljs-number">1</span>:
                        _this.testText = <span class="hljs-string">'守候的文章'</span>;
                        <span class="hljs-keyword">break</span>;
                    <span class="hljs-keyword">case</span> <span class="hljs-number">2</span>:
                        _this.testText = <span class="hljs-string">'愿您浏览愉快'</span>;
                        <span class="hljs-keyword">break</span>;
                    <span class="hljs-keyword">case</span> <span class="hljs-number">3</span>:
                        _this.testText = <span class="hljs-string">'学到知识'</span>;
                        <span class="hljs-keyword">break</span>;
                }
                <span class="hljs-keyword">if</span> (_this.nowIndex &gt; <span class="hljs-number">3</span>) {
                    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
                        clearInterval(timer);
                    }, <span class="hljs-number">2000</span>)
                }
            }, <span class="hljs-number">2000</span>)
        }
    })
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></span></code></pre>
<h3 id="articleHeader5">javascript方式</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>Title</title>
</head>
<style>
    body{
        background: #ccc;
    }
    h1 {
        color: white;
        text-transform: uppercase;
        margin-top: 100px;
        text-align: center;
        font-size: 6rem;
        line-height: 1;
        animation: letterspacing 1s 7 alternate ease-in-out;
        display: block;
        letter-spacing: .5rem;
    }

    @keyframes letterspacing {
        0% {
            letter-spacing: -6rem;
            filter: blur(1rem);
        }

        40% {
            filter: blur(.3rem);
        }

        80% {
            letter-spacing: .5rem;
            filter: blur(0rem);
        }
    }
</style>
<body>
<div id=&quot;text&quot;>
    <h1>欢迎浏览</h1>
</div>
</body>
<script>
    var oH1=document.querySelector('h1'),nowIndex=0;
    console.log(oH1)
    var timer = setInterval(function () {
        nowIndex++;
        switch (nowIndex) {
            case 1:
                oH1.innerHTML = '守候的文章';
                break;
            case 2:
                oH1.innerHTML = '愿您浏览愉快';
                break;
            case 3:
                oH1.innerHTML = '学到知识';
                break;
        }
        if (nowIndex > 3) {
            setTimeout(() => {
                clearInterval(timer);
            }, 2000)
        }
    }, 2000)
</script>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Title<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">body</span>{
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#ccc</span>;
    }
    <span class="hljs-selector-tag">h1</span> {
        <span class="hljs-attribute">color</span>: white;
        <span class="hljs-attribute">text-transform</span>: uppercase;
        <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">text-align</span>: center;
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">6rem</span>;
        <span class="hljs-attribute">line-height</span>: <span class="hljs-number">1</span>;
        <span class="hljs-attribute">animation</span>: letterspacing <span class="hljs-number">1s</span> <span class="hljs-number">7</span> alternate ease-in-out;
        <span class="hljs-attribute">display</span>: block;
        <span class="hljs-attribute">letter-spacing</span>: .<span class="hljs-number">5rem</span>;
    }

    @<span class="hljs-keyword">keyframes</span> letterspacing {
        0% {
            <span class="hljs-attribute">letter-spacing</span>: -<span class="hljs-number">6rem</span>;
            <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">blur</span>(1rem);
        }

        40% {
            <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">blur</span>(.3rem);
        }

        80% {
            <span class="hljs-attribute">letter-spacing</span>: .<span class="hljs-number">5rem</span>;
            <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">blur</span>(0rem);
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"text"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>欢迎浏览<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> oH1=<span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'h1'</span>),nowIndex=<span class="hljs-number">0</span>;
    <span class="hljs-built_in">console</span>.log(oH1)
    <span class="hljs-keyword">var</span> timer = setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        nowIndex++;
        <span class="hljs-keyword">switch</span> (nowIndex) {
            <span class="hljs-keyword">case</span> <span class="hljs-number">1</span>:
                oH1.innerHTML = <span class="hljs-string">'守候的文章'</span>;
                <span class="hljs-keyword">break</span>;
            <span class="hljs-keyword">case</span> <span class="hljs-number">2</span>:
                oH1.innerHTML = <span class="hljs-string">'愿您浏览愉快'</span>;
                <span class="hljs-keyword">break</span>;
            <span class="hljs-keyword">case</span> <span class="hljs-number">3</span>:
                oH1.innerHTML = <span class="hljs-string">'学到知识'</span>;
                <span class="hljs-keyword">break</span>;
        }
        <span class="hljs-keyword">if</span> (nowIndex &gt; <span class="hljs-number">3</span>) {
            setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
                clearInterval(timer);
            }, <span class="hljs-number">2000</span>)
        }
    }, <span class="hljs-number">2000</span>)
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<h2 id="articleHeader6">3.导航滑块</h2>
<h3 id="articleHeader7">运行效果</h3>
<p><span class="img-wrap"><img data-src="/img/bVYw1Z?w=807&amp;h=127" src="https://static.alili.tech/img/bVYw1Z?w=807&amp;h=127" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader8">原理分析</h3>
<p>首先，下面是页面初始化的时候，橙色滑块的位置</p>
<p><span class="img-wrap"><img data-src="/img/bVYxlM?w=691&amp;h=46" src="https://static.alili.tech/img/bVYxlM?w=691&amp;h=46" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>鼠标放到第二个tab上面，大家可以看到，橙色滑块就是向右偏移了一个tab的距离</p>
<p><span class="img-wrap"><img data-src="/img/bVYxlU?w=650&amp;h=68" src="https://static.alili.tech/img/bVYxlU?w=650&amp;h=68" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>鼠标放到第三个tab上面，大家可以看到，橙色滑块就是向右偏移了两个tab的距离</p>
<p><span class="img-wrap"><img data-src="/img/bVYxl0?w=652&amp;h=113" src="https://static.alili.tech/img/bVYxl0?w=652&amp;h=113" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>如果从第一个tab到第六个tab的索引是0,1,2,3,4,5。</p>
<p>那么滑块的公式就是（索引*tab的宽度）。大家看到有逐渐过去的效果，其实是css3过渡（<code>transition</code>）的效果。大家看下面的代码就行了，一看就懂！代码如下：</p>
<h3 id="articleHeader9">vue方式</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>Title</title>
</head>
<link rel=&quot;stylesheet&quot; href=&quot;reset.css&quot;>
<style>
    .nav{
        margin: 40px;
        position: relative;
    }
.nav li{
    float: left;
    width: 100px;
    height: 40px;
    line-height: 40px;
    color: #fff;
    text-align: center;
    background: #09f;
    cursor: pointer;
}
    .nav span{
        position: relative;
        z-index: 2;
    }
    .nav .slider{
        position: absolute;
        transition: all .5s cubic-bezier(0.4, -0.3, 0.57, 1.38);
        width: 100px;
        height: 40px;
        background: #f90;
        top: 0;
        left: 0;
        z-index: 1;
    }
</style>
<body>
<div class=&quot;nav clear&quot; id=&quot;nav&quot; @mouseleave=&quot;nowIndex=0&quot;>
    <ul>
        <li @mouseenter.stop=&quot;nowIndex=0&quot;><span>Tab One</span></li>
        <li @mouseenter.stop=&quot;nowIndex=1&quot;><span>Tab Two</span></li>
        <li @mouseenter.stop=&quot;nowIndex=2&quot;><span>Tab Three</span></li>
        <li @mouseenter.stop=&quot;nowIndex=3&quot;><span>Tab four</span></li>
        <li @mouseenter.stop=&quot;nowIndex=4&quot;><span>Tab five</span></li>
        <li @mouseenter.stop=&quot;nowIndex=5&quot;><span>Tab six</span></li>
    </ul>
    <div class=&quot;slider&quot; :style=&quot;{'transform':'translate3d('+nowIndex*100+'px,0,0)'}&quot;></div>
</div>
</body>
<script src=&quot;vue.min.js&quot;></script>
<script type=&quot;text/javascript&quot;>
   new Vue({
       el:'#nav',
       data:{
           nowIndex:0
       }
   })
</script>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Title<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"reset.css"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.nav</span>{
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">40px</span>;
        <span class="hljs-attribute">position</span>: relative;
    }
<span class="hljs-selector-class">.nav</span> <span class="hljs-selector-tag">li</span>{
    <span class="hljs-attribute">float</span>: left;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">40px</span>;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">40px</span>;
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
    <span class="hljs-attribute">text-align</span>: center;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#09f</span>;
    <span class="hljs-attribute">cursor</span>: pointer;
}
    <span class="hljs-selector-class">.nav</span> <span class="hljs-selector-tag">span</span>{
        <span class="hljs-attribute">position</span>: relative;
        <span class="hljs-attribute">z-index</span>: <span class="hljs-number">2</span>;
    }
    <span class="hljs-selector-class">.nav</span> <span class="hljs-selector-class">.slider</span>{
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">transition</span>: all .<span class="hljs-number">5s</span> <span class="hljs-built_in">cubic-bezier</span>(0.4, -0.3, 0.57, 1.38);
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">40px</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#f90</span>;
        <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">z-index</span>: <span class="hljs-number">1</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"nav clear"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"nav"</span> @<span class="hljs-attr">mouseleave</span>=<span class="hljs-string">"nowIndex=0"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> @<span class="hljs-attr">mouseenter.stop</span>=<span class="hljs-string">"nowIndex=0"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>Tab One<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> @<span class="hljs-attr">mouseenter.stop</span>=<span class="hljs-string">"nowIndex=1"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>Tab Two<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> @<span class="hljs-attr">mouseenter.stop</span>=<span class="hljs-string">"nowIndex=2"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>Tab Three<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> @<span class="hljs-attr">mouseenter.stop</span>=<span class="hljs-string">"nowIndex=3"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>Tab four<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> @<span class="hljs-attr">mouseenter.stop</span>=<span class="hljs-string">"nowIndex=4"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>Tab five<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> @<span class="hljs-attr">mouseenter.stop</span>=<span class="hljs-string">"nowIndex=5"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>Tab six<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"slider"</span> <span class="hljs-attr">:style</span>=<span class="hljs-string">"{'transform':'translate3d('+nowIndex*100+'px,0,0)'}"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"vue.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="actionscript">
   <span class="hljs-keyword">new</span> Vue({
       el:<span class="hljs-string">'#nav'</span>,
       data:{
           nowIndex:<span class="hljs-number">0</span>
       }
   })
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<h3 id="articleHeader10">javascript方式</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>Title</title>
</head>
<link rel=&quot;stylesheet&quot; href=&quot;reset.css&quot;>
<style>
    .nav{
        position: relative;
    }
.nav li{
    float: left;
    width: 100px;
    height: 40px;
    line-height: 40px;
    color: #fff;
    text-align: center;
    background: #09f;
    cursor: pointer;
}
    .nav span{
        position: relative;
        z-index: 2;
    }
    .nav .slider{
        position: absolute;
        transition: all .5s cubic-bezier(0.4, -0.3, 0.57, 1.38);
        width: 100px;
        height: 40px;
        background: #f90;
        top: 0;
        left: 0;
        z-index: 1;
    }
</style>
<body>
<div class=&quot;nav clear&quot; id=&quot;nav&quot;>
    <ul>
        <li><span>Tab One</span></li>
        <li><span>Tab Two</span></li>
        <li><span>Tab Three</span></li>
        <li><span>Tab four</span></li>
        <li><span>Tab five</span></li>
        <li><span>Tab six</span></li>
    </ul>
    <div class=&quot;slider&quot;></div>
</div>
</body>
<script type=&quot;text/javascript&quot;>
    var oDiv=document.querySelector(&quot;#nav&quot;),oLi=oDiv.querySelectorAll(&quot;li&quot;),oSlider=document.querySelector(&quot;.slider&quot;);
    oDiv.addEventListener(&quot;mouseleave&quot;,function () {
        oSlider.style.transform='translate3d(0,0,0)';
    })
    for(var i=0;i<oLi.length;i++){
        oLi[i].index=i;
        oLi[i].addEventListener(&quot;mouseenter&quot;,function (e) {
            oSlider.style.transform='translate3d('+this.index*100+'px,0,0)';
        })
    }
</script>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Title<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"reset.css"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.nav</span>{
        <span class="hljs-attribute">position</span>: relative;
    }
<span class="hljs-selector-class">.nav</span> <span class="hljs-selector-tag">li</span>{
    <span class="hljs-attribute">float</span>: left;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">40px</span>;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">40px</span>;
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
    <span class="hljs-attribute">text-align</span>: center;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#09f</span>;
    <span class="hljs-attribute">cursor</span>: pointer;
}
    <span class="hljs-selector-class">.nav</span> <span class="hljs-selector-tag">span</span>{
        <span class="hljs-attribute">position</span>: relative;
        <span class="hljs-attribute">z-index</span>: <span class="hljs-number">2</span>;
    }
    <span class="hljs-selector-class">.nav</span> <span class="hljs-selector-class">.slider</span>{
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">transition</span>: all .<span class="hljs-number">5s</span> <span class="hljs-built_in">cubic-bezier</span>(0.4, -0.3, 0.57, 1.38);
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">40px</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#f90</span>;
        <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">z-index</span>: <span class="hljs-number">1</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"nav clear"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"nav"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>Tab One<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>Tab Two<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>Tab Three<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>Tab four<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>Tab five<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>Tab six<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"slider"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> oDiv=<span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">"#nav"</span>),oLi=oDiv.querySelectorAll(<span class="hljs-string">"li"</span>),oSlider=<span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">".slider"</span>);
    oDiv.addEventListener(<span class="hljs-string">"mouseleave"</span>,<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        oSlider.style.transform=<span class="hljs-string">'translate3d(0,0,0)'</span>;
    })
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>;i&lt;oLi.length;i++){
        oLi[i].index=i;
        oLi[i].addEventListener(<span class="hljs-string">"mouseenter"</span>,<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
            oSlider.style.transform=<span class="hljs-string">'translate3d('</span>+<span class="hljs-keyword">this</span>.index*<span class="hljs-number">100</span>+<span class="hljs-string">'px,0,0)'</span>;
        })
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<h2 id="articleHeader11">4.轮播图</h2>
<h3 id="articleHeader12">运行效果</h3>
<p><span class="img-wrap"><img data-src="/img/bVYxpU?w=1050&amp;h=527" src="https://static.alili.tech/img/bVYxpU?w=1050&amp;h=527" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader13">原理分析</h3>
<p>蓝框的是li，黑框的是div</p>
<p>初始化状态</p>
<p><span class="img-wrap"><img data-src="/img/bVYxre?w=933&amp;h=206" src="https://static.alili.tech/img/bVYxre?w=933&amp;h=206" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>处于显示第二张图片的时候</p>
<p><span class="img-wrap"><img data-src="/img/bVYxrJ?w=934&amp;h=269" src="https://static.alili.tech/img/bVYxrJ?w=934&amp;h=269" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>看到上面，其实也就是控制ul的偏移量（<code>transform:translate3d</code>）。计算公式和上面的滑块相似，索引（<code>0|1|2|3</code>）*<code>li</code>的宽度。不同的就是，ul的偏移量是取负数，因为ul是想左偏，上面的滑块是向右偏！<br>当第一张图片的时候，ul偏移量设置（<code>transform: translate3d(0px, 0px, 0px)</code>）。<br>当第二张图片的时候，ul偏移量设置（<code>transform: translate3d(-1000px, 0px, 0px)</code>）。<br>当第二张图片的时候，ul偏移量设置（<code>transform: translate3d(-2000px, 0px, 0px)</code>）。以此类推，偏移量很简单的就能计算出来！</p>
<p>可能我说的大家有点懵，但是，看下面的代码，就不会懵了，因为代码也很简单！</p>
<h3 id="articleHeader14">vue方式</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>Title</title>
    <link rel=&quot;stylesheet&quot; href=&quot;reset.css&quot;>
    <style>
        .slide-img {
            width: 1000px;
            height: 500px;
            overflow: hidden;
            position: relative;
            margin: 20px auto;
        }

        ul {
            transition: all .5s ease;
        }

        li {
            float: left;
        }

        .slide-arrow div {
            width: 50px;
            height: 100px;
            position: absolute;
            margin: auto;
            top: 0;
            bottom: 0;
            background: url(&quot;http://i1.bvimg.com/1949/4d860a3067fab23b.jpg&quot;) no-repeat;
        }

        .arrow-right {
            transform: rotate(180deg);
            right: 0;
        }

        .arrow-left {
            left: 0;
        }
        .slide-option{
            position: absolute;
            bottom: 10px;
            width: 100%;
            left: 0;
            text-align: center;
        }
        .slide-option span{
            display: inline-block;
            width: 14px;
            height: 14px;
            border-radius: 100%;
            background: #ccc;
            margin: 0 10px;
        }
        .slide-option .active{
            background: #09f;
        }
    </style>
</head>
<body>
<div class=&quot;slide-img clear&quot; id=&quot;slide-img&quot;>
    <!--用tran这个class控制ul是否含有过渡效果，样式已经写好-->
    <ul :style=&quot;{'width':(listWidth*list.length)+'px','transform':'translate3d(-'+(listWidth*nowIndex)+'px,0,0)'}&quot;>
        <!--遍历出来的图片-->
        <li v-for=&quot;(li,index) in list&quot; :style=&quot;{'width':listWidth+'px'}&quot;>
            <a href=&quot;javascript:;&quot;>
                <img :src=&quot;li&quot; class=&quot;slider-img&quot;/>
            </a>
        </li>
    </ul>
    <div class=&quot;slide-option&quot;>
        <span v-for=&quot;(li,index) in list&quot; :class=&quot;{'active':index===nowIndex}&quot;></span>
    </div>
    <div class=&quot;slide-arrow&quot;>
        <div class=&quot;arrow-left&quot; @click.stop=&quot;switchDo('reduce')&quot;></div>
        <div class=&quot;arrow-right&quot; @click.stop=&quot;switchDo&quot;></div>
    </div>
</div>
</body>
<script src=&quot;vue.min.js&quot;></script>
<script type=&quot;text/javascript&quot;>
    new Vue({
        el: '#slide-img',
        data: {
            nowIndex: 0,
            listWidth: '1000',
            list: ['./images/timg1.jpg', './images/timg2.jpg', './images/timg3.jpg', './images/timg4.jpg'],
            timer:null
        },
        methods: {
            //滑动操作
            switchDo(reduce){
                clearInterval(this.timer);
                //根据reduce判断this.nowIndex的增加或者减少！
                if(reduce==='reduce'){
                    //如果是第一张，就返回最后一张
                    if(this.nowIndex===0){
                        this.nowIndex=this.list.length-1;
                    }
                    else{
                        this.nowIndex--;
                    }
                }
                else{
                    //如果是最后一张，就返回第一张
                    if(this.nowIndex===this.list.length-1){
                        this.nowIndex=0;
                    }
                    else{
                        this.nowIndex++;
                    }
                }
                var _this=this;
                this.timer=setInterval(function () {
                    _this.switchDo();
                },4000)

            },
        },
        mounted(){
            var _this=this;
            this.timer=setInterval(function () {
                _this.switchDo();
            },4000)
        }
    })
</script>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Title<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"reset.css"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        <span class="hljs-selector-class">.slide-img</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">1000px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">500px</span>;
            <span class="hljs-attribute">overflow</span>: hidden;
            <span class="hljs-attribute">position</span>: relative;
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">20px</span> auto;
        }

        <span class="hljs-selector-tag">ul</span> {
            <span class="hljs-attribute">transition</span>: all .<span class="hljs-number">5s</span> ease;
        }

        <span class="hljs-selector-tag">li</span> {
            <span class="hljs-attribute">float</span>: left;
        }

        <span class="hljs-selector-class">.slide-arrow</span> <span class="hljs-selector-tag">div</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">50px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">position</span>: absolute;
            <span class="hljs-attribute">margin</span>: auto;
            <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">background</span>: <span class="hljs-built_in">url</span>(<span class="hljs-string">"http://i1.bvimg.com/1949/4d860a3067fab23b.jpg"</span>) no-repeat;
        }

        <span class="hljs-selector-class">.arrow-right</span> {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(180deg);
            <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
        }

        <span class="hljs-selector-class">.arrow-left</span> {
            <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
        }
        <span class="hljs-selector-class">.slide-option</span>{
            <span class="hljs-attribute">position</span>: absolute;
            <span class="hljs-attribute">bottom</span>: <span class="hljs-number">10px</span>;
            <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
            <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">text-align</span>: center;
        }
        <span class="hljs-selector-class">.slide-option</span> <span class="hljs-selector-tag">span</span>{
            <span class="hljs-attribute">display</span>: inline-block;
            <span class="hljs-attribute">width</span>: <span class="hljs-number">14px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">14px</span>;
            <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">100%</span>;
            <span class="hljs-attribute">background</span>: <span class="hljs-number">#ccc</span>;
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> <span class="hljs-number">10px</span>;
        }
        <span class="hljs-selector-class">.slide-option</span> <span class="hljs-selector-class">.active</span>{
            <span class="hljs-attribute">background</span>: <span class="hljs-number">#09f</span>;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"slide-img clear"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"slide-img"</span>&gt;</span>
    <span class="hljs-comment">&lt;!--用tran这个class控制ul是否含有过渡效果，样式已经写好--&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">:style</span>=<span class="hljs-string">"{'width':(listWidth*list.length)+'px','transform':'translate3d(-'+(listWidth*nowIndex)+'px,0,0)'}"</span>&gt;</span>
        <span class="hljs-comment">&lt;!--遍历出来的图片--&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(li,index) in list"</span> <span class="hljs-attr">:style</span>=<span class="hljs-string">"{'width':listWidth+'px'}"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:;"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">"li"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"slider-img"</span>/&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"slide-option"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(li,index) in list"</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"{'active':index===nowIndex}"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"slide-arrow"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"arrow-left"</span> @<span class="hljs-attr">click.stop</span>=<span class="hljs-string">"switchDo('reduce')"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"arrow-right"</span> @<span class="hljs-attr">click.stop</span>=<span class="hljs-string">"switchDo"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"vue.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="actionscript">
    <span class="hljs-keyword">new</span> Vue({
        el: <span class="hljs-string">'#slide-img'</span>,
        data: {
            nowIndex: <span class="hljs-number">0</span>,
            listWidth: <span class="hljs-string">'1000'</span>,
            list: [<span class="hljs-string">'./images/timg1.jpg'</span>, <span class="hljs-string">'./images/timg2.jpg'</span>, <span class="hljs-string">'./images/timg3.jpg'</span>, <span class="hljs-string">'./images/timg4.jpg'</span>],
            timer:<span class="hljs-literal">null</span>
        },
        methods: {
            <span class="hljs-comment">//滑动操作</span>
            switchDo(reduce){
                clearInterval(<span class="hljs-keyword">this</span>.timer);
                <span class="hljs-comment">//根据reduce判断this.nowIndex的增加或者减少！</span>
                <span class="hljs-keyword">if</span>(reduce===<span class="hljs-string">'reduce'</span>){
                    <span class="hljs-comment">//如果是第一张，就返回最后一张</span>
                    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.nowIndex===<span class="hljs-number">0</span>){
                        <span class="hljs-keyword">this</span>.nowIndex=<span class="hljs-keyword">this</span>.list.length<span class="hljs-number">-1</span>;
                    }
                    <span class="hljs-keyword">else</span>{
                        <span class="hljs-keyword">this</span>.nowIndex--;
                    }
                }
                <span class="hljs-keyword">else</span>{
                    <span class="hljs-comment">//如果是最后一张，就返回第一张</span>
                    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.nowIndex===<span class="hljs-keyword">this</span>.list.length<span class="hljs-number">-1</span>){
                        <span class="hljs-keyword">this</span>.nowIndex=<span class="hljs-number">0</span>;
                    }
                    <span class="hljs-keyword">else</span>{
                        <span class="hljs-keyword">this</span>.nowIndex++;
                    }
                }
                <span class="hljs-keyword">var</span> _this=<span class="hljs-keyword">this</span>;
                <span class="hljs-keyword">this</span>.timer=setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
                    _this.switchDo();
                },<span class="hljs-number">4000</span>)

            },
        },
        mounted(){
            <span class="hljs-keyword">var</span> _this=<span class="hljs-keyword">this</span>;
            <span class="hljs-keyword">this</span>.timer=setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
                _this.switchDo();
            },<span class="hljs-number">4000</span>)
        }
    })
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<h3 id="articleHeader15">javascript方式</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>Title</title>
    <link rel=&quot;stylesheet&quot; href=&quot;reset.css&quot;>
    <style>
        .slide-img {
            width: 1000px;
            height: 500px;
            overflow: hidden;
            position: relative;
            margin: 20px auto;
        }

        ul {
            transition: all .5s ease;
        }

        li {
            float: left;
        }

        .slide-arrow div {
            width: 50px;
            height: 100px;
            position: absolute;
            margin: auto;
            top: 0;
            bottom: 0;
            background: url(&quot;http://i1.bvimg.com/1949/4d860a3067fab23b.jpg&quot;) no-repeat;
        }

        .arrow-right {
            transform: rotate(180deg);
            right: 0;
        }

        .arrow-left {
            left: 0;
        }
        .slide-option{
            position: absolute;
            bottom: 10px;
            width: 100%;
            left: 0;
            text-align: center;
        }
        .slide-option span{
            display: inline-block;
            width: 14px;
            height: 14px;
            border-radius: 100%;
            background: #ccc;
            margin: 0 10px;
        }
        .slide-option .active{
            background: #09f;
        }
    </style>
</head>
<body>
<div class=&quot;slide-img clear&quot; id=&quot;slide-img&quot;>
    <!--用tran这个class控制ul是否含有过渡效果，样式已经写好-->
    <ul id=&quot;slide-img-ul&quot;>
        <!--遍历出来的图片-->
        <li style=&quot;width: 1000px;&quot;><a href=&quot;javascript:;&quot;><img src=&quot;images/timg1.jpg&quot; class=&quot;slider-img&quot;/></a></li>
        <li style=&quot;width: 1000px;&quot;><a href=&quot;javascript:;&quot;><img src=&quot;images/timg2.jpg&quot; class=&quot;slider-img&quot;/></a></li>
        <li style=&quot;width: 1000px;&quot;><a href=&quot;javascript:;&quot;><img src=&quot;images/timg3.jpg&quot; class=&quot;slider-img&quot;/></a></li>
        <li style=&quot;width: 1000px;&quot;><a href=&quot;javascript:;&quot;><img src=&quot;images/timg4.jpg&quot; class=&quot;slider-img&quot;/></a></li>
    </ul>
    <div class=&quot;slide-option&quot;>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>
    <div class=&quot;slide-arrow&quot;>
        <div class=&quot;arrow-left&quot;></div>
        <div class=&quot;arrow-right&quot;></div>
    </div>
</div>
</body>
<script type=&quot;text/javascript&quot;>
    window.onload=function () {
        var oUl=document.querySelector('#slide-img-ul');
        var oLi=oUl.querySelectorAll('li');
        var oSpan=document.querySelector('.slide-option').querySelectorAll('span');
        var oArrowLeft=document.querySelector('.arrow-left');
        var oArrowRight=document.querySelector('.arrow-right');
        oUl.style.width='4000px';
        oArrowLeft.addEventListener('click',function () {
            switchDo('reduce');
        })
        oArrowRight.addEventListener('click',function () {
            switchDo();
        })
        var timer=null,nowIndex=0;
        function switchDo(reduce){
            clearInterval(timer);
            //设置样式
            oUl.style.transform='translate3d(-'+(1000*nowIndex)+'px,0,0)';
            for (var i=0;i<oSpan.length;i++){
                if(i===nowIndex){
                    oSpan[i].className='active';
                }
                else{
                    oSpan[i].className='';
                }
            }
            //根据reduce判断this.nowIndex的增加或者减少！
            if(reduce==='reduce'){
                //如果是第一张，就返回最后一张
                if(nowIndex===0){
                    nowIndex=oLi.length-1;
                }
                else{
                    nowIndex--;
                }
            }
            else{
                //如果是最后一张，就返回第一张
                if(nowIndex===oLi.length-1){
                    nowIndex=0;
                }
                else{
                    nowIndex++;
                }
            }
            timer=setInterval(function () {
                switchDo();
            },4000)
        }
        switchDo();
    }
</script>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Title<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"reset.css"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        <span class="hljs-selector-class">.slide-img</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">1000px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">500px</span>;
            <span class="hljs-attribute">overflow</span>: hidden;
            <span class="hljs-attribute">position</span>: relative;
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">20px</span> auto;
        }

        <span class="hljs-selector-tag">ul</span> {
            <span class="hljs-attribute">transition</span>: all .<span class="hljs-number">5s</span> ease;
        }

        <span class="hljs-selector-tag">li</span> {
            <span class="hljs-attribute">float</span>: left;
        }

        <span class="hljs-selector-class">.slide-arrow</span> <span class="hljs-selector-tag">div</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">50px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">position</span>: absolute;
            <span class="hljs-attribute">margin</span>: auto;
            <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">background</span>: <span class="hljs-built_in">url</span>(<span class="hljs-string">"http://i1.bvimg.com/1949/4d860a3067fab23b.jpg"</span>) no-repeat;
        }

        <span class="hljs-selector-class">.arrow-right</span> {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(180deg);
            <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
        }

        <span class="hljs-selector-class">.arrow-left</span> {
            <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
        }
        <span class="hljs-selector-class">.slide-option</span>{
            <span class="hljs-attribute">position</span>: absolute;
            <span class="hljs-attribute">bottom</span>: <span class="hljs-number">10px</span>;
            <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
            <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">text-align</span>: center;
        }
        <span class="hljs-selector-class">.slide-option</span> <span class="hljs-selector-tag">span</span>{
            <span class="hljs-attribute">display</span>: inline-block;
            <span class="hljs-attribute">width</span>: <span class="hljs-number">14px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">14px</span>;
            <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">100%</span>;
            <span class="hljs-attribute">background</span>: <span class="hljs-number">#ccc</span>;
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> <span class="hljs-number">10px</span>;
        }
        <span class="hljs-selector-class">.slide-option</span> <span class="hljs-selector-class">.active</span>{
            <span class="hljs-attribute">background</span>: <span class="hljs-number">#09f</span>;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"slide-img clear"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"slide-img"</span>&gt;</span>
    <span class="hljs-comment">&lt;!--用tran这个class控制ul是否含有过渡效果，样式已经写好--&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"slide-img-ul"</span>&gt;</span>
        <span class="hljs-comment">&lt;!--遍历出来的图片--&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width: 1000px;"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:;"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"images/timg1.jpg"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"slider-img"</span>/&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width: 1000px;"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:;"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"images/timg2.jpg"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"slider-img"</span>/&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width: 1000px;"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:;"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"images/timg3.jpg"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"slider-img"</span>/&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width: 1000px;"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:;"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"images/timg4.jpg"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"slider-img"</span>/&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"slide-option"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"slide-arrow"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"arrow-left"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"arrow-right"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
    <span class="hljs-built_in">window</span>.onload=<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> oUl=<span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'#slide-img-ul'</span>);
        <span class="hljs-keyword">var</span> oLi=oUl.querySelectorAll(<span class="hljs-string">'li'</span>);
        <span class="hljs-keyword">var</span> oSpan=<span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.slide-option'</span>).querySelectorAll(<span class="hljs-string">'span'</span>);
        <span class="hljs-keyword">var</span> oArrowLeft=<span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.arrow-left'</span>);
        <span class="hljs-keyword">var</span> oArrowRight=<span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.arrow-right'</span>);
        oUl.style.width=<span class="hljs-string">'4000px'</span>;
        oArrowLeft.addEventListener(<span class="hljs-string">'click'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            switchDo(<span class="hljs-string">'reduce'</span>);
        })
        oArrowRight.addEventListener(<span class="hljs-string">'click'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            switchDo();
        })
        <span class="hljs-keyword">var</span> timer=<span class="hljs-literal">null</span>,nowIndex=<span class="hljs-number">0</span>;
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">switchDo</span>(<span class="hljs-params">reduce</span>)</span>{
            clearInterval(timer);
            <span class="hljs-comment">//设置样式</span>
            oUl.style.transform=<span class="hljs-string">'translate3d(-'</span>+(<span class="hljs-number">1000</span>*nowIndex)+<span class="hljs-string">'px,0,0)'</span>;
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>;i&lt;oSpan.length;i++){
                <span class="hljs-keyword">if</span>(i===nowIndex){
                    oSpan[i].className=<span class="hljs-string">'active'</span>;
                }
                <span class="hljs-keyword">else</span>{
                    oSpan[i].className=<span class="hljs-string">''</span>;
                }
            }
            <span class="hljs-comment">//根据reduce判断this.nowIndex的增加或者减少！</span>
            <span class="hljs-keyword">if</span>(reduce===<span class="hljs-string">'reduce'</span>){
                <span class="hljs-comment">//如果是第一张，就返回最后一张</span>
                <span class="hljs-keyword">if</span>(nowIndex===<span class="hljs-number">0</span>){
                    nowIndex=oLi.length<span class="hljs-number">-1</span>;
                }
                <span class="hljs-keyword">else</span>{
                    nowIndex--;
                }
            }
            <span class="hljs-keyword">else</span>{
                <span class="hljs-comment">//如果是最后一张，就返回第一张</span>
                <span class="hljs-keyword">if</span>(nowIndex===oLi.length<span class="hljs-number">-1</span>){
                    nowIndex=<span class="hljs-number">0</span>;
                }
                <span class="hljs-keyword">else</span>{
                    nowIndex++;
                }
            }
            timer=setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                switchDo();
            },<span class="hljs-number">4000</span>)
        }
        switchDo();
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<h2 id="articleHeader16">5.小结</h2>
<p>好了，关于<code>vue</code>+<code>css3</code>开发的特效，以及和<code>javascript</code>+<code>css3</code>的对比，就说到这里了，希望这三个小实例，能帮到大家了解下应该怎么使用<code>vue</code>+<code>css3</code>开发特效的。今天讲这三个小实例不是说给大家代码，让大家复制粘贴使用，而是希望能起到一个抛砖引玉的作用，拓展思维的作用！就像我之前写文章说得那样，我写文章是希望能起到一个授人以渔的作用，而不是授人以鱼！最后，如果大家觉得有什么地方我写错了，写错不好，或者有其它什么建议，欢迎指出！让大家相互学习，共同进步！</p>
<p>-------------------------华丽的分割线--------------------<br>想了解更多，关注关注我的微信公众号：守候书阁</p>
<p><span class="img-wrap"><img data-src="/img/bV1Cv6?w=258&amp;h=258" src="https://static.alili.tech/img/bV1Cv6?w=258&amp;h=258" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
也许vue+css3做交互特效更简单

## 原文链接
[https://segmentfault.com/a/1190000012073091](https://segmentfault.com/a/1190000012073091)

