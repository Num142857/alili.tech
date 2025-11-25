---
title: 'H5实例教学--从AnimateCC到CreateJS入门' 
date: 2019-01-26 2:30:18
hidden: true
slug: mzd8glfuhd
categories: [reprint]
---

{{< raw >}}

                    
<p>源码以及资源地址下载：<br>链接: <a href="http://pan.baidu.com/s/1kU8LBTH" rel="nofollow noreferrer" target="_blank">http://pan.baidu.com/s/1kU8LBTH</a> 密码: j7hu</p>
<p>首先，打开flash文件，可以看到库里面有几个待使用的元件<br><span class="img-wrap"><img data-src="/img/bVJmAD?w=288&amp;h=227" src="https://static.alili.tech/img/bVJmAD?w=288&amp;h=227" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>我们先用软件自带的发布功能发布一下<br>快捷键 alt+shift+F12,也可以在文件里选择发布</p>
<p><span class="img-wrap"><img data-src="/img/bVJmAJ?w=164&amp;h=53" src="https://static.alili.tech/img/bVJmAJ?w=164&amp;h=53" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>发布后在flash文件旁边会有一个html和一个js</p>
<p><span class="img-wrap"><img data-src="/img/bVJmAQ?w=734&amp;h=97" src="https://static.alili.tech/img/bVJmAQ?w=734&amp;h=97" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br> 我们打开demo1.html可以看到这样的代码片段</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var canvas, stage, exportRoot;
function init() {
   // --- write your JS code here ---
   
   canvas = document.getElementById(&quot;canvas&quot;);
   images = images||{};
   ss = ss||{};

   var loader = new createjs.LoadQueue(false);
   loader.addEventListener(&quot;fileload&quot;, handleFileLoad);
   loader.addEventListener(&quot;complete&quot;, handleComplete);
   loader.loadFile({src:&quot;images/demo1_atlas_.json&quot;, type:&quot;spritesheet&quot;, id:&quot;demo1_atlas_&quot;}, true);
   loader.loadManifest(lib.properties.manifest);
}

function handleFileLoad(evt) {
   if (evt.item.type == &quot;image&quot;) { images[evt.item.id] = evt.result; }
}

function handleComplete(evt) {
   var queue = evt.target;
   ss[&quot;demo1_atlas_&quot;] = queue.getResult(&quot;demo1_atlas_&quot;);
   exportRoot = new lib.demo1();

   stage = new createjs.Stage(canvas);
   stage.addChild(exportRoot);
   stage.update();

   createjs.Ticker.setFPS(lib.properties.fps);
   createjs.Ticker.addEventListener(&quot;tick&quot;, stage);
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crystal"><code>var canvas, stage, exportRoot;
function init() {
   <span class="hljs-regexp">//</span> --- write your JS code here ---
   
   canvas = document.getElementById(<span class="hljs-string">"canvas"</span>);
   images = images||{};
   ss = ss||{};

   var loader = new createjs.LoadQueue(<span class="hljs-literal">false</span>);
   loader.addEventListener(<span class="hljs-string">"fileload"</span>, handleFileLoad);
   loader.addEventListener(<span class="hljs-string">"complete"</span>, handleComplete);
   loader.loadFile({<span class="hljs-symbol">src:</span><span class="hljs-string">"images/demo1_atlas_.json"</span>, <span class="hljs-symbol">type:</span><span class="hljs-string">"spritesheet"</span>, <span class="hljs-symbol">id:</span><span class="hljs-string">"demo1_atlas_"</span>}, <span class="hljs-literal">true</span>);
   loader.loadManifest(<span class="hljs-class"><span class="hljs-keyword">lib</span>.<span class="hljs-title">properties</span>.<span class="hljs-title">manifest</span>);</span>
}

function handleFileLoad(evt) {
   <span class="hljs-keyword">if</span> (evt.item.<span class="hljs-keyword">type</span> == <span class="hljs-string">"image"</span>) { images[evt.item.id] = evt.result; }
}

function handleComplete(evt) {
   var queue = evt.target;
   ss[<span class="hljs-string">"demo1_atlas_"</span>] = queue.getResult(<span class="hljs-string">"demo1_atlas_"</span>);
   exportRoot = new <span class="hljs-class"><span class="hljs-keyword">lib</span>.<span class="hljs-title">demo1</span>();</span>

   stage = new createjs.Stage(canvas);
   stage.addChild(exportRoot);
   stage.update();

   createjs.Ticker.setFPS(<span class="hljs-class"><span class="hljs-keyword">lib</span>.<span class="hljs-title">properties</span>.<span class="hljs-title">fps</span>);</span>
   createjs.Ticker.addEventListener(<span class="hljs-string">"tick"</span>, stage);
}
</code></pre>
<p>我们新建一个test.js，把html生成的script部分的代码复制进去，然后再新建一个html上引用<br>代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>Title</title>
</head>
<body onload=&quot;init();&quot; style=&quot;margin: 0;padding: 0;&quot;>
    <canvas id=&quot;canvas&quot; width=&quot;720&quot; height=&quot;1206&quot; style=&quot;background: #ddd;position: absolute;left: 50%;transform: translateX(-50%)&quot;></canvas>
    <script src=&quot;lib/createjs.js&quot;></script>
    <script src=&quot;demo1.js&quot;></script>
    <script src=&quot;test.js&quot;></script>
</body>
</html>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Title<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span> <span class="hljs-attr">onload</span>=<span class="hljs-string">"init();"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"margin: 0;padding: 0;"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">canvas</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"canvas"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"720"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"1206"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"background: #ddd;position: absolute;left: 50%;transform: translateX(-50%)"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">canvas</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"lib/createjs.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"demo1.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"test.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre>
<p>这个flash里面有两个动画，我们现在来实现一个效果，在一般情况时播放一个动画，在手指按下时播放另一个动画<br>我们需要改一改flash生成的代码<br>把handleComplete<br> 改为以下内容</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var queue = evt.target;
stage = new createjs.Stage(canvas);
ss[&quot;demo1_atlas_&quot;] = queue.getResult(&quot;demo1_atlas_&quot;);
var animate1 = new lib.view1();
var animate2 = new lib.view2();
// animation.setTransform(205,209);
animate1.x=&quot;360&quot;;
animate1.y=&quot;600&quot;;
animate2.x=&quot;300&quot;;
animate2.y=&quot;570&quot;;
animateList= [animate1,animate2];
stage.addChild(animate2);
stage.update();
createjs.Ticker.setFPS(lib.properties.fps);
createjs.Ticker.addEventListener(&quot;tick&quot;, stage);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crystal"><code>var queue = evt.target;
stage = new createjs.Stage(canvas);
ss[<span class="hljs-string">"demo1_atlas_"</span>] = queue.getResult(<span class="hljs-string">"demo1_atlas_"</span>);
var animate1 = new <span class="hljs-class"><span class="hljs-keyword">lib</span>.<span class="hljs-title">view1</span>();</span>
var animate2 = new <span class="hljs-class"><span class="hljs-keyword">lib</span>.<span class="hljs-title">view2</span>();</span>
/<span class="hljs-regexp">/ animation.setTransform(205,209);
animate1.x="360";
animate1.y="600";
animate2.x="300";
animate2.y="570";
animateList= [animate1,animate2];
stage.addChild(animate2);
stage.update();
createjs.Ticker.setFPS(lib.properties.fps);
createjs.Ticker.addEventListener("tick", stage);
</span></code></pre>
<p>创建两个场景animate1/animate2<br>new lib.view1()为新建一个场景的构造方法，场景的类名对应程序中<br><span class="img-wrap"><img data-src="/img/bVJmA4?w=297&amp;h=105" src="https://static.alili.tech/img/bVJmA4?w=297&amp;h=105" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br> 然后给两个场景定好x/y位置<br>将其中一个场景加入舞台中</p>
<p>需要介绍一下createjs下的三个类</p>
<p>Stage是createjs的一个舞台类<br>相当于最根部的场景，需要展示的场景添加到他的内部，构造函数可以传入一个canvas标签，表示对对应的canvas进行绘制。<br>stage = new createjs.Stage(canvas);<br>可以获得一个舞台对象，把需要展示的内容放入该对象中</p>
<p>LoadQueue是一个加载器类,<br>需要用它加载资源，也可以绑定事件监听，有以下事件<br><span class="img-wrap"><img data-src="/img/bVJmA8?w=709&amp;h=130" src="https://static.alili.tech/img/bVJmA8?w=709&amp;h=130" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br> 用以下哎方法加载文件</p>
<p><span class="img-wrap"><img data-src="/img/bVJmBa?w=696&amp;h=55" src="https://static.alili.tech/img/bVJmBa?w=696&amp;h=55" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>Ticker<br>这是一个类似setIntervald的东西，可以在这里对canvas的绘制频率进行控制<br>tick事件就是帧变化的时候的事件<br>createjs.Ticker.addEventListener("tick", stage);<br>此为当帧变化时刷新stage，stage也可以传入一个function</p>
<p>ok至此我们已经成功添加一个元件到舞台中，并播放动画。<br>因为需要加载一个本地资源的json文件，所以你需要在当前目录搭建一个本地服务器来跑。<br>否则会出现以下问题</p>
<p><span class="img-wrap"><img data-src="/img/bVJmBf?w=700&amp;h=50" src="https://static.alili.tech/img/bVJmBf?w=700&amp;h=50" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>现在我们需要实现触碰屏幕播放另一个动画<br>写一个事件绑定的方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function bindEvent() {
    canvas.addEventListener(&quot;touchstart&quot;,function(){
        stage.removeChild(animateList[1]);
        stage.addChild(animateList[0]);
    })
    canvas.addEventListener(&quot;touchend&quot;,function(){
        stage.removeChild(animateList[0]);
        stage.addChild(animateList[1]);
    })
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bindEvent</span><span class="hljs-params">()</span> </span>{
    canvas.addEventListener(<span class="hljs-string">"touchstart"</span>,<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
        stage.removeChild(animateList[<span class="hljs-number">1</span>]);
        stage.addChild(animateList[<span class="hljs-number">0</span>]);
    })
    canvas.addEventListener(<span class="hljs-string">"touchend"</span>,<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
        stage.removeChild(animateList[<span class="hljs-number">0</span>]);
        stage.addChild(animateList[<span class="hljs-number">1</span>]);
    })
</code></pre>
<p>该方法使手指触碰与离开时更换舞台中的动画，好了功能完成，不过此时用手机看<br><span class="img-wrap"><img data-src="/img/bVJmBj?w=454&amp;h=700" src="https://static.alili.tech/img/bVJmBj?w=454&amp;h=700" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>canvas并没有填充整个屏幕<br>加一个自适应屏幕的方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function resizeCanvas(){
    model = new createjs.EventDispatcher();//用来捕获事件的原型
    stageWidth =  document.documentElement.clientWidth;
    stageHeight = document.documentElement.clientHeight;
    stageScale = stageWidth/(750/2);
    canvas = document.getElementById(&quot;canvas&quot;);
    if(stageWidth/stageHeight > 0.665)
    {
        stageScale = stageHeight/(1206/2);
        canvas.style.left = (stageWidth - 750/2*stageScale)/2 + 'px';
    }
    else
    {
        stageScale = stageWidth/(750/2);
    }



    canvas.style.width = 750/2*stageScale + 'px';
    canvas.style.height = 1206/2*stageScale + 'px';
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>function resizeCanvas(){
    model = new createjs.EventDispatcher();<span class="hljs-comment">//用来捕获事件的原型</span>
    stageWidth =  document.documentElement.clientWidth;
    stageHeight = document.documentElement.clientHeight;
    stageScale = stageWidth/(<span class="hljs-number">750</span>/<span class="hljs-number">2</span>);
    canvas = document.getElementById(<span class="hljs-string">"canvas"</span>);
    if(stageWidth/stageHeight &gt; <span class="hljs-number">0.665</span>)
    {
        stageScale = stageHeight/(<span class="hljs-number">1206</span>/<span class="hljs-number">2</span>);
        canvas.style.left = (stageWidth - <span class="hljs-number">750</span>/<span class="hljs-number">2</span>*stageScale)/<span class="hljs-number">2</span> + 'px';
    }
    else
    {
        stageScale = stageWidth/(<span class="hljs-number">750</span>/<span class="hljs-number">2</span>);
    }



    canvas.style.width = <span class="hljs-number">750</span>/<span class="hljs-number">2</span>*stageScale + 'px';
    canvas.style.height = <span class="hljs-number">1206</span>/<span class="hljs-number">2</span>*stageScale + 'px';
}
</code></pre>
<p>在资源加载完成的回调方法中调用它<br>resizeCanvas();//自适应宽高<br>bindEvent();//绑定事件</p>
<p><span class="img-wrap"><img data-src="/img/bVJmBk?w=454&amp;h=709" src="https://static.alili.tech/img/bVJmBk?w=454&amp;h=709" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>完成！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
H5实例教学--从AnimateCC到CreateJS入门

## 原文链接
[https://segmentfault.com/a/1190000008389068](https://segmentfault.com/a/1190000008389068)

