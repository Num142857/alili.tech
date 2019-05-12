---
title: 'html2canvas html截图插件图片放大清晰度解决方案，支持任意放大倍数，解决原插件图片偏移问题' 
date: 2019-01-30 2:30:23
hidden: true
slug: rv6vb1ihr69
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0"><strong>html2canvas html截图插件图片放大清晰度解决方案，支持任意放大倍数，解决原插件图片偏移问题</strong></h2>
<p>Author:youzebin (2016.12.6)<br>插件下载地址：<a href="https://github.com/niklasvh/html2canvas" rel="nofollow noreferrer" target="_blank">https://github.com/niklasvh/h...</a></p>
<p>1.首先引入html2canvas.js html2canvas 0.5.0-beta4 最新版即可</p>
<p>必要步骤1：修改插件的源码： （修改的地方有两处）</p>
<h4>1. 代码第 999 行 renderWindow 的方法中 修改判断条件 增加一个options.scale存在的条件：</h4>
<p>源码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (options.type === &quot;view&quot;) {
                canvas = crop(renderer.canvas, {width: renderer.canvas.width, height: renderer.canvas.height, top: 0, left: 0, x: 0, y: 0});
            } else if (node === clonedWindow.document.body || node === clonedWindow.document.documentElement || options.canvas != null) {
                canvas = renderer.canvas;
            } else {
                canvas = crop(renderer.canvas, {width:  options.width != null ? options.width : bounds.width, height: options.height != null ? options.height : bounds.height, top: bounds.top, left: bounds.left, x: 0, y: 0});

            }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-keyword">if</span> (options.type === <span class="hljs-string">"view"</span>) {
                canvas = crop(renderer.canvas, {<span class="hljs-string">width:</span> renderer.canvas.width, <span class="hljs-string">height:</span> renderer.canvas.height, <span class="hljs-string">top:</span> <span class="hljs-number">0</span>, <span class="hljs-string">left:</span> <span class="hljs-number">0</span>, <span class="hljs-string">x:</span> <span class="hljs-number">0</span>, <span class="hljs-string">y:</span> <span class="hljs-number">0</span>});
            } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (node === clonedWindow.document.body || node === clonedWindow.document.documentElement || options.canvas != <span class="hljs-literal">null</span>) {
                canvas = renderer.canvas;
            } <span class="hljs-keyword">else</span> {
                canvas = crop(renderer.canvas, {<span class="hljs-string">width:</span>  options.width != <span class="hljs-literal">null</span> ? options.width : bounds.width, <span class="hljs-string">height:</span> options.height != <span class="hljs-literal">null</span> ? options.height : bounds.height, <span class="hljs-string">top:</span> bounds.top, <span class="hljs-string">left:</span> bounds.left, <span class="hljs-string">x:</span> <span class="hljs-number">0</span>, <span class="hljs-string">y:</span> <span class="hljs-number">0</span>});

            }
</code></pre>
<p>改为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (options.type === &quot;view&quot;) {
                canvas = crop(renderer.canvas, {width: renderer.canvas.width, height: renderer.canvas.height, top: 0, left: 0, x: 0, y: 0});
            } else if (node === clonedWindow.document.body || node === clonedWindow.document.documentElement) {
                canvas = renderer.canvas;
            }else if(options.scale &amp;&amp; options.canvas !=null){
                log(&quot;放大canvas&quot;,options.canvas);
                var scale = options.scale || 1;
                canvas = crop(renderer.canvas, {width: bounds.width * scale, height:bounds.height * scale, top: bounds.top *scale, left: bounds.left *scale, x: 0, y: 0});
            }
            else {
                canvas = crop(renderer.canvas, {width:  options.width != null ? options.width : bounds.width, height: options.height != null ? options.height : bounds.height, top: bounds.top, left: bounds.left, x: 0, y: 0});
            }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code><span class="hljs-keyword">if</span> (options.type === <span class="hljs-string">"view"</span>) {
                canvas = crop(renderer.canvas, {<span class="hljs-built_in">width</span>: renderer.canvas.<span class="hljs-built_in">width</span>, <span class="hljs-built_in">height</span>: renderer.canvas.<span class="hljs-built_in">height</span>, top: <span class="hljs-number">0</span>, left: <span class="hljs-number">0</span>, x: <span class="hljs-number">0</span>, y: <span class="hljs-number">0</span>});
            } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (node === clonedWindow.document.body || node === clonedWindow.document.documentElement) {
                canvas = renderer.canvas;
            }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(options.<span class="hljs-built_in">scale</span> &amp;&amp; options.canvas !=<span class="hljs-keyword">null</span>){
                <span class="hljs-built_in">log</span>(<span class="hljs-string">"放大canvas"</span>,options.canvas);
                var <span class="hljs-built_in">scale</span> = options.<span class="hljs-built_in">scale</span> || <span class="hljs-number">1</span>;
                canvas = crop(renderer.canvas, {<span class="hljs-built_in">width</span>: bounds.<span class="hljs-built_in">width</span> * <span class="hljs-built_in">scale</span>, <span class="hljs-built_in">height</span>:bounds.<span class="hljs-built_in">height</span> * <span class="hljs-built_in">scale</span>, top: bounds.top *<span class="hljs-built_in">scale</span>, left: bounds.left *<span class="hljs-built_in">scale</span>, x: <span class="hljs-number">0</span>, y: <span class="hljs-number">0</span>});
            }
            <span class="hljs-keyword">else</span> {
                canvas = crop(renderer.canvas, {<span class="hljs-built_in">width</span>:  options.<span class="hljs-built_in">width</span> != <span class="hljs-keyword">null</span> ? options.<span class="hljs-built_in">width</span> : bounds.<span class="hljs-built_in">width</span>, <span class="hljs-built_in">height</span>: options.<span class="hljs-built_in">height</span> != <span class="hljs-keyword">null</span> ? options.<span class="hljs-built_in">height</span> : bounds.<span class="hljs-built_in">height</span>, top: bounds.top, left: bounds.left, x: <span class="hljs-number">0</span>, y: <span class="hljs-number">0</span>});
            }</code></pre>
<h4>2. 代码第 943 行 html2canvas 的方法中  修改width,height：</h4>
<p>源码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="return renderDocument(node.ownerDocument, options, node.ownerDocument.defaultView.innerWidth, node.ownerDocument.defaultView.innerHeight, index).then(function(canvas) {
    if (typeof(options.onrendered) === &quot;function&quot;) {
        log(&quot;options.onrendered is deprecated, html2canvas returns a Promise containing the canvas&quot;);
        options.onrendered(canvas);
    }
    return canvas;
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>return renderDocument(<span class="hljs-keyword">node</span>.<span class="hljs-title">ownerDocument</span>, options, <span class="hljs-keyword">node</span>.<span class="hljs-title">ownerDocument</span>.defaultView.innerWidth, <span class="hljs-keyword">node</span>.<span class="hljs-title">ownerDocument</span>.defaultView.innerHeight, index).then(function(canvas) {
    if (typeof(options.onrendered) === <span class="hljs-string">"function"</span>) {
        log(<span class="hljs-string">"options.onrendered is deprecated, html2canvas returns a Promise containing the canvas"</span>);
        options.onrendered(canvas);
    }
    return canvas;
});</code></pre>
<p>改为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="width = options.width != null ? options.width : node.ownerDocument.defaultView.innerWidth;
height = options.height != null ? options.height : node.ownerDocument.defaultView.innerHeight;
return renderDocument(node.ownerDocument, options, width, height, index).then(function(canvas) {
    if (typeof(options.onrendered) === &quot;function&quot;) {
        log(&quot;options.onrendered is deprecated, html2canvas returns a Promise containing the canvas&quot;);
        options.onrendered(canvas);
    }
    return canvas;
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code><span class="hljs-built_in">width</span> = options.<span class="hljs-built_in">width</span> != <span class="hljs-keyword">null</span> ? options.<span class="hljs-built_in">width</span> : node.ownerDocument.defaultView.innerWidth;
<span class="hljs-built_in">height</span> = options.<span class="hljs-built_in">height</span> != <span class="hljs-keyword">null</span> ? options.<span class="hljs-built_in">height</span> : node.ownerDocument.defaultView.innerHeight;
<span class="hljs-keyword">return</span> renderDocument(node.ownerDocument, options, <span class="hljs-built_in">width</span>, <span class="hljs-built_in">height</span>, index).then(function(canvas) {
    <span class="hljs-keyword">if</span> (typeof(options.onrendered) === <span class="hljs-string">"function"</span>) {
        <span class="hljs-built_in">log</span>(<span class="hljs-string">"options.onrendered is deprecated, html2canvas returns a Promise containing the canvas"</span>);
        options.onrendered(canvas);
    }
    <span class="hljs-keyword">return</span> canvas;
});</code></pre>
<p>2.使用方式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var shareContent = document.getElementById(&quot;shareContent&quot;);//需要截图的包裹的（原生的）DOM 对象
var width = shareContent.offsetWidth; //获取dom 宽度
var height = shareContent.offsetHeight; //获取dom 高度
var canvas = document.createElement(&quot;canvas&quot;); //创建一个canvas节点
var scale = 2; //定义任意放大倍数 支持小数
canvas.width = width * scale; //定义canvas 宽度 * 缩放
canvas.height = height * scale; //定义canvas高度 *缩放
canvas.getContext(&quot;2d&quot;).scale(scale,scale); //获取context,设置scale 
var opts = {
    scale:scale, // 添加的scale 参数
    canvas:canvas, //自定义 canvas
    logging: true, //日志开关
    width:width, //dom 原始宽度
    height:height //dom 原始高度
};

html2canvas(shareContent, opts).then(function (canvas) {
    //如果想要生成图片 引入canvas2Image.js 下载地址：
    //https://github.com/hongru/canvas2image/blob/master/canvas2image.js
    var img = Canvas2Image.convertToImage(canvas, canvas.width, canvas.height);
    console.log(img);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code>var shareContent = document.getElementById(<span class="hljs-string">"shareContent"</span>);<span class="hljs-comment">//需要截图的包裹的（原生的）DOM 对象</span>
var <span class="hljs-built_in">width</span> = shareContent.offsetWidth; <span class="hljs-comment">//获取dom 宽度</span>
var <span class="hljs-built_in">height</span> = shareContent.offsetHeight; <span class="hljs-comment">//获取dom 高度</span>
var canvas = document.createElement(<span class="hljs-string">"canvas"</span>); <span class="hljs-comment">//创建一个canvas节点</span>
var <span class="hljs-built_in">scale</span> = <span class="hljs-number">2</span>; <span class="hljs-comment">//定义任意放大倍数 支持小数</span>
canvas.<span class="hljs-built_in">width</span> = <span class="hljs-built_in">width</span> * <span class="hljs-built_in">scale</span>; <span class="hljs-comment">//定义canvas 宽度 * 缩放</span>
canvas.<span class="hljs-built_in">height</span> = <span class="hljs-built_in">height</span> * <span class="hljs-built_in">scale</span>; <span class="hljs-comment">//定义canvas高度 *缩放</span>
canvas.getContext(<span class="hljs-string">"2d"</span>).<span class="hljs-built_in">scale</span>(<span class="hljs-built_in">scale</span>,<span class="hljs-built_in">scale</span>); <span class="hljs-comment">//获取context,设置scale </span>
var opts = {
    <span class="hljs-built_in">scale</span>:<span class="hljs-built_in">scale</span>, <span class="hljs-comment">// 添加的scale 参数</span>
    canvas:canvas, <span class="hljs-comment">//自定义 canvas</span>
    logging: <span class="hljs-keyword">true</span>, <span class="hljs-comment">//日志开关</span>
    <span class="hljs-built_in">width</span>:<span class="hljs-built_in">width</span>, <span class="hljs-comment">//dom 原始宽度</span>
    <span class="hljs-built_in">height</span>:<span class="hljs-built_in">height</span> <span class="hljs-comment">//dom 原始高度</span>
};

html2canvas(shareContent, opts).then(function (canvas) {
    <span class="hljs-comment">//如果想要生成图片 引入canvas2Image.js 下载地址：</span>
    <span class="hljs-comment">//https://github.com/hongru/canvas2image/blob/master/canvas2image.js</span>
    var img = Canvas2Image.convertToImage(canvas, canvas.<span class="hljs-built_in">width</span>, canvas.<span class="hljs-built_in">height</span>);
    console.<span class="hljs-built_in">log</span>(img);
});</code></pre>
<h2 id="articleHeader1"><strong>2017.1.7 优化插件使用的方式，并附上demo （插件的改动还是按照上面的操作流程）</strong></h2>
<p>（不好意思各位，最近发现上面插件的使用方式上存在截图不完整的bug，<br>很多人在插件的使用上存在各种各样的问题。所以决定完善这篇文章的内容）</p>
<p>以下我总结了一些注意事项，在代码中注释了，仅供参考。<br>付：完整使用的demo ,如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <meta name=&quot;viewport&quot;
          content=&quot;width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no&quot;>
    <meta http-equiv=&quot;pragma&quot; content=&quot;no-cache&quot;>
    <meta http-equiv=&quot;cache-control&quot; content=&quot;no-cache&quot;>
    <meta http-equiv=&quot;expires&quot; content=&quot;0&quot;>
    <title>html2Canvas demo</title>
    <script>
        document.documentElement.style.fontSize = window.screen.width / 7.5 + 'px';
    </script>
    <style>
        body,
        html,
        div,
        p,
        ul,
        li,
        a,
        img,
        span,
        button,
        header,
        footer,
        section {
            padding: 0;
            margin: 0;
        }

        *, :before, :after {
            -webkit-tap-highlight-color: transparent;
            -webkit-user-select: none;
            outline: none;
            box-sizing: border-box;
            -webkit-box-sizing: border-box;
        }

        ::-webkit-scrollbar {
            width: 0;
            opacity: 0;
        }

        button{
            font-family: simsun,&quot;microsoft yahei&quot;, arial, &quot;Helvetica Neue&quot;, Helvetica, STHeiTi, sans-serif;
        }
        body {
            font-family: &quot;microsoft yahei&quot;, arial, &quot;Helvetica Neue&quot;, Helvetica, STHeiTi, sans-serif;
            color: #000;
            background-color: #f5f5f5;
            -webkit-overflow-scrolling: touch;
        }
        .share-container {
            padding-top: 0.72rem;
            width: 2.35rem;
            margin: 0 auto;
        }

        .share-content {
            padding-top: 0.72rem;
            height:3rem;
            background-color: blue;
            border-radius: 5px;
            width: 100%;
        }
        .text{
            font-size: 0.36rem;
            color: #f2f2f2;
        }
        .btn-share {
            width: 64%;
            height: 0.89rem;
            background-color: #3baaff;
            border-radius: 0.89rem;
            border: 1px solid #3baaff;
            color: white;
            font-size: 0.36rem;
            margin: 0.75rem 0 0.67rem;
        }
        .btn-share:active{
            background-color: #1b96c8;
        }
    </style>
</head>
<body>
<section class=&quot;main-container&quot;>
    <header class=&quot;share-container&quot; id=&quot;shareContainer&quot;>
        <div class=&quot;share-content&quot; id=&quot;shareContent&quot;>
              <div class=&quot;text&quot;>
                  <p>文字，图片等内容</p>
              </div>
        </div>
    </header>
    <footer class=&quot;footer-center&quot;>
        <button class=&quot;btn-share&quot; id=&quot;btnShare&quot;>截&amp;nbsp;图</button>
    </footer>
</section>

<script src=&quot;static/js/html2canvas.js&quot;></script>
<script>

    //定义查找元素方法
    function $(selector) {
        return document.querySelector(selector);
    }
    var main = {
        init:function(){
            main.setListener();
        },
        //设置监听事件
        setListener:function(){
            var btnShare = document.getElementById(&quot;btnShare&quot;);
            btnShare.onclick = function(){
                main.html2Canvas();
            }
        },
        //获取像素密度
        getPixelRatio:function(context){
            var backingStore = context.backingStorePixelRatio ||
                    context.webkitBackingStorePixelRatio ||
                    context.mozBackingStorePixelRatio ||
                    context.msBackingStorePixelRatio ||
                    context.oBackingStorePixelRatio ||
                    context.backingStorePixelRatio || 1;
            return (window.devicePixelRatio || 1) / backingStore;
        },
        //绘制dom 元素，生成截图canvas
        html2Canvas: function () {
            var shareContent = $(&quot;#shareContent&quot;);// 需要绘制的部分的 (原生）dom 对象 ，注意容器的宽度不要使用百分比，使用固定宽度，避免缩放问题
            var width = shareContent.offsetWidth;  // 获取(原生）dom 宽度
            var height = shareContent.offsetHeight; // 获取(原生）dom 高
            var offsetTop = shareContent.offsetTop;  //元素距离顶部的偏移量

            var canvas = document.createElement('canvas');  //创建canvas 对象
            var context = canvas.getContext('2d');
            var scaleBy = main.getPixelRatio(context);  //获取像素密度的方法 (也可以采用自定义缩放比例)
            canvas.width = width * scaleBy;   //这里 由于绘制的dom 为固定宽度，居中，所以没有偏移
            canvas.height = (height + offsetTop) * scaleBy;  // 注意高度问题，由于顶部有个距离所以要加上顶部的距离，解决图像高度偏移问题
            context.scale(scaleBy, scaleBy);

            var opts = {
                allowTaint:true,//允许加载跨域的图片
                tainttest:true, //检测每张图片都已经加载完成
                scale:scaleBy, // 添加的scale 参数
                canvas:canvas, //自定义 canvas
                logging: true, //日志开关，发布的时候记得改成false
                width:width, //dom 原始宽度
                height:height //dom 原始高度
            };
            html2canvas(shareContent, opts).then(function (canvas) {
               console.log(&quot;html2canvas&quot;);
                var body = document.getElementsByTagName(&quot;body&quot;);
                body[0].appendChild(canvas);
            });
        }
    };

    //最后运行代码
    main.init();

</script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span>
          <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"pragma"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"no-cache"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"cache-control"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"no-cache"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"expires"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"0"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>html2Canvas demo<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-built_in">document</span>.documentElement.style.fontSize = <span class="hljs-built_in">window</span>.screen.width / <span class="hljs-number">7.5</span> + <span class="hljs-string">'px'</span>;
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        <span class="hljs-selector-tag">body</span>,
        <span class="hljs-selector-tag">html</span>,
        <span class="hljs-selector-tag">div</span>,
        <span class="hljs-selector-tag">p</span>,
        <span class="hljs-selector-tag">ul</span>,
        <span class="hljs-selector-tag">li</span>,
        <span class="hljs-selector-tag">a</span>,
        <span class="hljs-selector-tag">img</span>,
        <span class="hljs-selector-tag">span</span>,
        <span class="hljs-selector-tag">button</span>,
        <span class="hljs-selector-tag">header</span>,
        <span class="hljs-selector-tag">footer</span>,
        <span class="hljs-selector-tag">section</span> {
            <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
        }

        *, <span class="hljs-selector-pseudo">:before</span>, <span class="hljs-selector-pseudo">:after</span> {
            <span class="hljs-attribute">-webkit-tap-highlight-color</span>: transparent;
            <span class="hljs-attribute">-webkit-user-select</span>: none;
            <span class="hljs-attribute">outline</span>: none;
            <span class="hljs-attribute">box-sizing</span>: border-box;
            <span class="hljs-attribute">-webkit-box-sizing</span>: border-box;
        }

        <span class="hljs-selector-pseudo">::-webkit-scrollbar</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
        }

        <span class="hljs-selector-tag">button</span>{
            <span class="hljs-attribute">font-family</span>: simsun,<span class="hljs-string">"microsoft yahei"</span>, arial, <span class="hljs-string">"Helvetica Neue"</span>, Helvetica, STHeiTi, sans-serif;
        }
        <span class="hljs-selector-tag">body</span> {
            <span class="hljs-attribute">font-family</span>: <span class="hljs-string">"microsoft yahei"</span>, arial, <span class="hljs-string">"Helvetica Neue"</span>, Helvetica, STHeiTi, sans-serif;
            <span class="hljs-attribute">color</span>: <span class="hljs-number">#000</span>;
            <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#f5f5f5</span>;
            <span class="hljs-attribute">-webkit-overflow-scrolling</span>: touch;
        }
        <span class="hljs-selector-class">.share-container</span> {
            <span class="hljs-attribute">padding-top</span>: <span class="hljs-number">0.72rem</span>;
            <span class="hljs-attribute">width</span>: <span class="hljs-number">2.35rem</span>;
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
        }

        <span class="hljs-selector-class">.share-content</span> {
            <span class="hljs-attribute">padding-top</span>: <span class="hljs-number">0.72rem</span>;
            <span class="hljs-attribute">height</span>:<span class="hljs-number">3rem</span>;
            <span class="hljs-attribute">background-color</span>: blue;
            <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">5px</span>;
            <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
        }
        <span class="hljs-selector-class">.text</span>{
            <span class="hljs-attribute">font-size</span>: <span class="hljs-number">0.36rem</span>;
            <span class="hljs-attribute">color</span>: <span class="hljs-number">#f2f2f2</span>;
        }
        <span class="hljs-selector-class">.btn-share</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">64%</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">0.89rem</span>;
            <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#3baaff</span>;
            <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">0.89rem</span>;
            <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#3baaff</span>;
            <span class="hljs-attribute">color</span>: white;
            <span class="hljs-attribute">font-size</span>: <span class="hljs-number">0.36rem</span>;
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">0.75rem</span> <span class="hljs-number">0</span> <span class="hljs-number">0.67rem</span>;
        }
        <span class="hljs-selector-class">.btn-share</span><span class="hljs-selector-pseudo">:active</span>{
            <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#1b96c8</span>;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">section</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"main-container"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">header</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"share-container"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"shareContainer"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"share-content"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"shareContent"</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"text"</span>&gt;</span>
                  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>文字，图片等内容<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
              <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">footer</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"footer-center"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn-share"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btnShare"</span>&gt;</span>截&amp;nbsp;图<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">footer</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"static/js/html2canvas.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">

    <span class="hljs-comment">//定义查找元素方法</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">$</span>(<span class="hljs-params">selector</span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">document</span>.querySelector(selector);
    }
    <span class="hljs-keyword">var</span> main = {
        <span class="hljs-attr">init</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            main.setListener();
        },
        <span class="hljs-comment">//设置监听事件</span>
        setListener:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-keyword">var</span> btnShare = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"btnShare"</span>);
            btnShare.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                main.html2Canvas();
            }
        },
        <span class="hljs-comment">//获取像素密度</span>
        getPixelRatio:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">context</span>)</span>{
            <span class="hljs-keyword">var</span> backingStore = context.backingStorePixelRatio ||
                    context.webkitBackingStorePixelRatio ||
                    context.mozBackingStorePixelRatio ||
                    context.msBackingStorePixelRatio ||
                    context.oBackingStorePixelRatio ||
                    context.backingStorePixelRatio || <span class="hljs-number">1</span>;
            <span class="hljs-keyword">return</span> (<span class="hljs-built_in">window</span>.devicePixelRatio || <span class="hljs-number">1</span>) / backingStore;
        },
        <span class="hljs-comment">//绘制dom 元素，生成截图canvas</span>
        html2Canvas: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">var</span> shareContent = $(<span class="hljs-string">"#shareContent"</span>);<span class="hljs-comment">// 需要绘制的部分的 (原生）dom 对象 ，注意容器的宽度不要使用百分比，使用固定宽度，避免缩放问题</span>
            <span class="hljs-keyword">var</span> width = shareContent.offsetWidth;  <span class="hljs-comment">// 获取(原生）dom 宽度</span>
            <span class="hljs-keyword">var</span> height = shareContent.offsetHeight; <span class="hljs-comment">// 获取(原生）dom 高</span>
            <span class="hljs-keyword">var</span> offsetTop = shareContent.offsetTop;  <span class="hljs-comment">//元素距离顶部的偏移量</span>

            <span class="hljs-keyword">var</span> canvas = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'canvas'</span>);  <span class="hljs-comment">//创建canvas 对象</span>
            <span class="hljs-keyword">var</span> context = canvas.getContext(<span class="hljs-string">'2d'</span>);
            <span class="hljs-keyword">var</span> scaleBy = main.getPixelRatio(context);  <span class="hljs-comment">//获取像素密度的方法 (也可以采用自定义缩放比例)</span>
            canvas.width = width * scaleBy;   <span class="hljs-comment">//这里 由于绘制的dom 为固定宽度，居中，所以没有偏移</span>
            canvas.height = (height + offsetTop) * scaleBy;  <span class="hljs-comment">// 注意高度问题，由于顶部有个距离所以要加上顶部的距离，解决图像高度偏移问题</span>
            context.scale(scaleBy, scaleBy);

            <span class="hljs-keyword">var</span> opts = {
                <span class="hljs-attr">allowTaint</span>:<span class="hljs-literal">true</span>,<span class="hljs-comment">//允许加载跨域的图片</span>
                tainttest:<span class="hljs-literal">true</span>, <span class="hljs-comment">//检测每张图片都已经加载完成</span>
                scale:scaleBy, <span class="hljs-comment">// 添加的scale 参数</span>
                canvas:canvas, <span class="hljs-comment">//自定义 canvas</span>
                logging: <span class="hljs-literal">true</span>, <span class="hljs-comment">//日志开关，发布的时候记得改成false</span>
                width:width, <span class="hljs-comment">//dom 原始宽度</span>
                height:height <span class="hljs-comment">//dom 原始高度</span>
            };
            html2canvas(shareContent, opts).then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">canvas</span>) </span>{
               <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"html2canvas"</span>);
                <span class="hljs-keyword">var</span> body = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">"body"</span>);
                body[<span class="hljs-number">0</span>].appendChild(canvas);
            });
        }
    };

    <span class="hljs-comment">//最后运行代码</span>
    main.init();

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<h2 id="articleHeader2">运行上面的demo 前有以下 <strong>注意点</strong>：</h2>
<ol>
<li><p>前面的内容没看过,没下载过html2canvas.js 没按照插件改过说明操作的先改好再说</p></li>
<li>
<p>注意元素的样式的使用：<br>   外层元素width 不能使用百分比 ,避免导致图片与文字间缩放比例问题</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="错误使用方式如  
 .container {
       width:50%;
       margin: 0 auto;
 } 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>错误使用方式如  
 <span class="hljs-selector-class">.container</span> {
       <span class="hljs-attribute">width</span>:<span class="hljs-number">50%</span>;
       <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
 } 
</code></pre>
</li>
</ol>
<p>需要改成如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" .container {
       width:300px;
       margin: 0 auto;
 } 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code> <span class="hljs-selector-class">.container</span> {
       <span class="hljs-attribute">width</span>:<span class="hljs-number">300px</span>;
       <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
 } 
</code></pre>
<p>完整demo下载地址 github:  <a href="https://github.com/omwteam/html2canvas" rel="nofollow noreferrer" target="_blank">https://github.com/omwteam/ht...</a><br>觉得好用就点个赞呗</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
html2canvas html截图插件图片放大清晰度解决方案，支持任意放大倍数，解决原插件图片偏移问题

## 原文链接
[https://segmentfault.com/a/1190000007707209](https://segmentfault.com/a/1190000007707209)

