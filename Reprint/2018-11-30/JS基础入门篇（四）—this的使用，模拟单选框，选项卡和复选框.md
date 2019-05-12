---
title: 'JS基础入门篇（四）—this的使用，模拟单选框，选项卡和复选框' 
date: 2018-11-30 2:30:12
hidden: true
slug: capday79ms9
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">1.this的使用</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this
    js中的关键字
        js内部已经定义好了,可以不声明 直接使用
this的指向问题
    1. 在函数外部使用
        this指向的是window
    2. 在函数内部使用
        有名函数
            直接调用函数 this指的还是window
            通过事件调用，事件是谁触发的 this指的就是谁
        匿名函数
            通过事件调用，事件是谁触发的 this指的就是谁" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">this</span>
    js中的关键字
        js内部已经定义好了,可以不声明 直接使用
<span class="hljs-keyword">this</span>的指向问题
    <span class="hljs-number">1.</span> 在函数外部使用
        <span class="hljs-keyword">this</span>指向的是window
    <span class="hljs-number">2.</span> 在函数内部使用
        有名函数
            直接调用函数 <span class="hljs-keyword">this</span>指的还是window
            通过事件调用，事件是谁触发的 <span class="hljs-keyword">this</span>指的就是谁
        匿名函数
            通过事件调用，事件是谁触发的 <span class="hljs-keyword">this</span>指的就是谁</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
<body>
<div id=&quot;box&quot;>box</div>
<script>
    alert(this); //[object Window]
//------------------------------------------
    
    function fn(){
        alert( this );
    }
    fn(); // 直接调用 ,函数内的this 指的还是 [object Window]

    document.onclick = fn; //[object HTMLDocument]

    var box = document.getElementById(&quot;box&quot;);
    box.onclick = fn; //[object HTMLDivElement]
//------------------------------------------

//    匿名函数 由事件调用,事件由谁触发 this指向谁
    document.onclick = function(){
        alert(this);
    };
    var box = document.getElementById(&quot;box&quot;);
    box.onclick = function(){
        alert(this);
    }
</script>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box"</span>&gt;</span>box<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    alert(<span class="hljs-keyword">this</span>); <span class="hljs-comment">//[object Window]</span>
<span class="hljs-comment">//------------------------------------------</span>
    
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params"></span>)</span>{
        alert( <span class="hljs-keyword">this</span> );
    }
    fn(); <span class="hljs-comment">// 直接调用 ,函数内的this 指的还是 [object Window]</span>

    <span class="hljs-built_in">document</span>.onclick = fn; <span class="hljs-comment">//[object HTMLDocument]</span>

    <span class="hljs-keyword">var</span> box = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"box"</span>);
    box.onclick = fn; <span class="hljs-comment">//[object HTMLDivElement]</span>
<span class="hljs-comment">//------------------------------------------</span>

<span class="hljs-comment">//    匿名函数 由事件调用,事件由谁触发 this指向谁</span>
    <span class="hljs-built_in">document</span>.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        alert(<span class="hljs-keyword">this</span>);
    };
    <span class="hljs-keyword">var</span> box = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"box"</span>);
    box.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        alert(<span class="hljs-keyword">this</span>);
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
<h2 id="articleHeader1">2.模拟单选框</h2>
<p><a href="https://codepen.io/Liang_zhi_fang/pen/pVZJgX" rel="nofollow noreferrer" target="_blank">模拟单选框效果图</a><button class="btn btn-xs btn-default ml10 preview" data-url="Liang_zhi_fang/pen/pVZJgX" data-typeid="3">点击预览</button><br><strong>方法一：</strong>大清洗，在设置颜色之前把所有的颜色值设为空。然后再设置点击框的颜色。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title></title>
    <style>
        div{
            width:100px;
            height:100px;
            border: 1px solid #000;
            display: inline-block;
        }
    </style>
</head>
<body>
    <div></div>
    <div></div>
    <div></div>
    <script>
    
        var divs = document.getElementsByTagName(&quot;div&quot;);
        for (var i = 0; i < divs.length; i++) {
//            alert( &quot;for执行中,此次i是&quot; + i);
//            alert( &quot;此次为 第 &quot;+ i +&quot; 个div 添加点击事件处理函数&quot; )
            divs[i].onclick = function(){
//                alert(i);
//                把 所有的 div 颜色 清除
                for (var i = 0; i < divs.length; i++) {
                    divs[i].style.backgroundColor = &quot;&quot;;
                }
//                为点击的这个div添加颜色
                this.style.backgroundColor = &quot;cornflowerblue&quot;;
            }    
        }
    </script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        <span class="hljs-selector-tag">div</span>{
            <span class="hljs-attribute">width</span>:<span class="hljs-number">100px</span>;
            <span class="hljs-attribute">height</span>:<span class="hljs-number">100px</span>;
            <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#000</span>;
            <span class="hljs-attribute">display</span>: inline-block;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    
        <span class="hljs-keyword">var</span> divs = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">"div"</span>);
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; divs.length; i++) {
<span class="hljs-comment">//            alert( "for执行中,此次i是" + i);</span>
<span class="hljs-comment">//            alert( "此次为 第 "+ i +" 个div 添加点击事件处理函数" )</span>
            divs[i].onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
<span class="hljs-comment">//                alert(i);</span>
<span class="hljs-comment">//                把 所有的 div 颜色 清除</span>
                <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; divs.length; i++) {
                    divs[i].style.backgroundColor = <span class="hljs-string">""</span>;
                }
<span class="hljs-comment">//                为点击的这个div添加颜色</span>
                <span class="hljs-keyword">this</span>.style.backgroundColor = <span class="hljs-string">"cornflowerblue"</span>;
            }    
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p><strong>方法二：</strong>点击什么，清除什么。记录当前点击的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body>
<div></div>
<div></div>
<div></div>
<script>
    var divs=document.getElementsByTagName(&quot;div&quot;);
    var now=0;
    for( var i=0; i<divs.length;i++){
        divs[i].index=i;//建立索引，记录每一个节点值。
        divs[i].onclick=function () {
            divs[now].style.background=&quot;&quot;;
            this.style.background=&quot;coral&quot;;
            now=this.index;

        }
    }
</script>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> divs=<span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">"div"</span>);
    <span class="hljs-keyword">var</span> now=<span class="hljs-number">0</span>;
    <span class="hljs-keyword">for</span>( <span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>; i&lt;divs.length;i++){
        divs[i].index=i;<span class="hljs-comment">//建立索引，记录每一个节点值。</span>
        divs[i].onclick=<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            divs[now].style.background=<span class="hljs-string">""</span>;
            <span class="hljs-keyword">this</span>.style.background=<span class="hljs-string">"coral"</span>;
            now=<span class="hljs-keyword">this</span>.index;

        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
<h2 id="articleHeader2">3.选项卡</h2>
<p><a href="https://codepen.io/Liang_zhi_fang/pen/LmBZEr" rel="nofollow noreferrer" target="_blank">模拟选项卡</a><button class="btn btn-xs btn-default ml10 preview" data-url="Liang_zhi_fang/pen/LmBZEr" data-typeid="3">点击预览</button></p>
<p><strong>方法一：</strong>大清洗，在设置颜色之前把所有的颜色值设为空。然后再设置点击框的颜色。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>Title</title>
    <style>
        div{
            width: 100px;
            height: 100px;
            background: red;
            font:20px/2 &quot;宋体&quot;;
            color:#fff;
            display: none;
            margin-top: 20px;

        }
        button{
            width: 100px;
            line-height: 50px;
            font-size:18px;
            background: none;
        }
        .show{
            display: block;
        }
        .active{
            background: cornflowerblue;
        }
    </style>
</head>
<body>
<button class=&quot;active&quot;>选项卡一</button>
<button>选项卡二</button>
<button>选项卡三</button>
<div class=&quot;show&quot;>内容一</div>
<div>内容二</div>
<div>内容三</div>
<script>
    var btns=document.getElementsByTagName(&quot;button&quot;);
    var divs=document.getElementsByTagName(&quot;div&quot;);
    for(var i=0;i<divs.length;i++){
        btns[i].index=i;
        btns[i].onclick=function () {
            for(var i=0;i<divs.length;i++) {
                btns[i].className=&quot;&quot;;
                divs[i].className=&quot;&quot;;

            }
            this.className=&quot;active&quot;;
            divs[this.index].className=&quot;show&quot;;
        }
    }
</script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Title<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        <span class="hljs-selector-tag">div</span>{
            <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">background</span>: red;
            <span class="hljs-attribute">font</span>:<span class="hljs-number">20px</span>/<span class="hljs-number">2</span> <span class="hljs-string">"宋体"</span>;
            <span class="hljs-attribute">color</span>:<span class="hljs-number">#fff</span>;
            <span class="hljs-attribute">display</span>: none;
            <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">20px</span>;

        }
        <span class="hljs-selector-tag">button</span>{
            <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">line-height</span>: <span class="hljs-number">50px</span>;
            <span class="hljs-attribute">font-size</span>:<span class="hljs-number">18px</span>;
            <span class="hljs-attribute">background</span>: none;
        }
        <span class="hljs-selector-class">.show</span>{
            <span class="hljs-attribute">display</span>: block;
        }
        <span class="hljs-selector-class">.active</span>{
            <span class="hljs-attribute">background</span>: cornflowerblue;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"active"</span>&gt;</span>选项卡一<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>选项卡二<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>选项卡三<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"show"</span>&gt;</span>内容一<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>内容二<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>内容三<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> btns=<span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">"button"</span>);
    <span class="hljs-keyword">var</span> divs=<span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">"div"</span>);
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>;i&lt;divs.length;i++){
        btns[i].index=i;
        btns[i].onclick=<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>;i&lt;divs.length;i++) {
                btns[i].className=<span class="hljs-string">""</span>;
                divs[i].className=<span class="hljs-string">""</span>;

            }
            <span class="hljs-keyword">this</span>.className=<span class="hljs-string">"active"</span>;
            divs[<span class="hljs-keyword">this</span>.index].className=<span class="hljs-string">"show"</span>;
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p><strong>方法二：</strong>点击什么，清除什么。记录当前点击的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>Title</title>
    <style>
        div{
            width: 100px;
            height: 100px;
            background: red;
            font:20px/2 &quot;宋体&quot;;
            color:#fff;
            display: none;
            margin-top: 20px;

        }
        button{
            width: 100px;
            line-height: 50px;
            font-size:18px;
            background: none;
        }
        .show{
            display: block;
        }
        .active{
            background: cornflowerblue;
        }
    </style>
</head>
<body>
<button class=&quot;active&quot;>选项卡一</button>
<button>选项卡二</button>
<button>选项卡三</button>
<div class=&quot;show&quot;>内容一</div>
<div>内容二</div>
<div>内容三</div>
<script>
    var btns=document.getElementsByTagName(&quot;button&quot;);
    var divs=document.getElementsByTagName(&quot;div&quot;);
    var now=0;
    for(var i=0;i<divs.length;i++){
        btns[i].index=i;
        btns[i].onclick=function () {
            btns[now].className=&quot;&quot;;
            divs[now].className=&quot;&quot;;
            this.className=&quot;active&quot;;
            divs[this.index].className=&quot;show&quot;;
            now=this.index;
        }
    }
</script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Title<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        <span class="hljs-selector-tag">div</span>{
            <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">background</span>: red;
            <span class="hljs-attribute">font</span>:<span class="hljs-number">20px</span>/<span class="hljs-number">2</span> <span class="hljs-string">"宋体"</span>;
            <span class="hljs-attribute">color</span>:<span class="hljs-number">#fff</span>;
            <span class="hljs-attribute">display</span>: none;
            <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">20px</span>;

        }
        <span class="hljs-selector-tag">button</span>{
            <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">line-height</span>: <span class="hljs-number">50px</span>;
            <span class="hljs-attribute">font-size</span>:<span class="hljs-number">18px</span>;
            <span class="hljs-attribute">background</span>: none;
        }
        <span class="hljs-selector-class">.show</span>{
            <span class="hljs-attribute">display</span>: block;
        }
        <span class="hljs-selector-class">.active</span>{
            <span class="hljs-attribute">background</span>: cornflowerblue;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"active"</span>&gt;</span>选项卡一<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>选项卡二<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>选项卡三<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"show"</span>&gt;</span>内容一<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>内容二<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>内容三<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> btns=<span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">"button"</span>);
    <span class="hljs-keyword">var</span> divs=<span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">"div"</span>);
    <span class="hljs-keyword">var</span> now=<span class="hljs-number">0</span>;
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>;i&lt;divs.length;i++){
        btns[i].index=i;
        btns[i].onclick=<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            btns[now].className=<span class="hljs-string">""</span>;
            divs[now].className=<span class="hljs-string">""</span>;
            <span class="hljs-keyword">this</span>.className=<span class="hljs-string">"active"</span>;
            divs[<span class="hljs-keyword">this</span>.index].className=<span class="hljs-string">"show"</span>;
            now=<span class="hljs-keyword">this</span>.index;
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<h2 id="articleHeader3">4.模拟复选框</h2>
<p><a href="https://codepen.io/Liang_zhi_fang/pen/gKPQmr" rel="nofollow noreferrer" target="_blank">模拟复选框查看效果以及代码！！！！</a><button class="btn btn-xs btn-default ml10 preview" data-url="Liang_zhi_fang/pen/gKPQmr" data-typeid="3">点击预览</button></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>Title</title>
    <style>
        div{
            width: 100px;
            height: 100px;
            border:1px solid black;
            float: left;
            margin-right: 10px;
        }
        .active{
            background: cornflowerblue;
        }
    </style>
</head>
<body>
    <div></div>
    <div></div>
    <div></div>
    <script>
        var divs=document.getElementsByTagName(&quot;div&quot;);
        console.log(divs);
        var L=divs.length;
        for(var i=0;i<L;i++){
            // true表示没被点击
            // false表示被点击了
            divs[i].onoff=true;
            divs[i].onclick=function () {
                if(this.onoff){//如果没被点击，则添加背景颜色
                    this.className=&quot;active&quot;;
                }else{//如果点击了，则清空背景颜色
                    this.className=&quot;&quot;;
                }
                this.onoff=!this.onoff;//只要点击了，就将此div的自定义属性值取反。
            }
        }
    </script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Title<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        <span class="hljs-selector-tag">div</span>{
            <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">border</span>:<span class="hljs-number">1px</span> solid black;
            <span class="hljs-attribute">float</span>: left;
            <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">10px</span>;
        }
        <span class="hljs-selector-class">.active</span>{
            <span class="hljs-attribute">background</span>: cornflowerblue;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">var</span> divs=<span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">"div"</span>);
        <span class="hljs-built_in">console</span>.log(divs);
        <span class="hljs-keyword">var</span> L=divs.length;
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>;i&lt;L;i++){
            <span class="hljs-comment">// true表示没被点击</span>
            <span class="hljs-comment">// false表示被点击了</span>
            divs[i].onoff=<span class="hljs-literal">true</span>;
            divs[i].onclick=<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.onoff){<span class="hljs-comment">//如果没被点击，则添加背景颜色</span>
                    <span class="hljs-keyword">this</span>.className=<span class="hljs-string">"active"</span>;
                }<span class="hljs-keyword">else</span>{<span class="hljs-comment">//如果点击了，则清空背景颜色</span>
                    <span class="hljs-keyword">this</span>.className=<span class="hljs-string">""</span>;
                }
                <span class="hljs-keyword">this</span>.onoff=!<span class="hljs-keyword">this</span>.onoff;<span class="hljs-comment">//只要点击了，就将此div的自定义属性值取反。</span>
            }
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JS基础入门篇（四）—this的使用，模拟单选框，选项卡和复选框

## 原文链接
[https://segmentfault.com/a/1190000014856511](https://segmentfault.com/a/1190000014856511)

