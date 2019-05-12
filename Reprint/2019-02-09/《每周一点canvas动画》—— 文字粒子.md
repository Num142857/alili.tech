---
title: '《每周一点canvas动画》—— 文字粒子' 
date: 2019-02-09 2:30:58
hidden: true
slug: 8nawgscig4f
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p><a href="https://github.com/supperjet/text-particles" rel="nofollow noreferrer" target="_blank">代码文件</a></p></blockquote>
<p>每周一点canvas动画系列文章目前已经更新了12篇，今天给大家发个福利。我们使用canvas来制作一个小的效果。这个小效果是我从codePen上看到的，我对其做了些修改增强，添加了一些新的功能。UI界面就如下图中看到的样子。我们要实现的效果就如我在图中操作的那样，在输入框中输入文字（不管中文，还是英文，还是各种表情也好）都可以在canvas画布中通过众多的粒子组成，在侧边栏中还有很多控件，它们可以控制粒子的各方面属性，以此来形成各种不同的绚丽效果。</p>
<p><span class="img-wrap"><img data-src="/img/bVx6gy" src="https://static.alili.tech/img/bVx6gy" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader0">1.目录结构</h3>
<p><span class="img-wrap"><img data-src="/img/bVx6eW" src="https://static.alili.tech/img/bVx6eW" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h3 id="articleHeader1">2.UI界面</h3>
<p>UI界面的组成很简单，主要有<code>侧边栏控制台</code>和<code>canvas画布</code>两部分组成</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<canvas id=&quot;canvas&quot;></canvas>
<div id=&quot;control&quot;>...</div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">&lt;canvas id=<span class="hljs-string">"canvas"</span>&gt;&lt;/canvas&gt;
&lt;div id=<span class="hljs-string">"control"</span>&gt;...&lt;/div&gt;
</code></pre>
<p>在侧边栏中有一系列的控制条，他们控制着粒子的各种属性，包括文字输入框：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <input type=&quot;text&quot; id=&quot;message&quot; value=&quot;hahaha&quot; onchange=&quot;change()&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;"> &lt;input <span class="hljs-built_in">type</span>=<span class="hljs-string">"text"</span> id=<span class="hljs-string">"message"</span> value=<span class="hljs-string">"hahaha"</span> onchange=<span class="hljs-string">"change()"</span>&gt;</code></pre>
<p>控制条</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input type=&quot;range&quot; id=&quot;gra&quot; value=&quot;0&quot; min=&quot;-1&quot; max=&quot;1&quot; step=&quot;0.1&quot; onchange=&quot;changeV()&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">&lt;input <span class="hljs-built_in">type</span>=<span class="hljs-string">"range"</span> id=<span class="hljs-string">"gra"</span> value=<span class="hljs-string">"0"</span> min=<span class="hljs-string">"-1"</span> max=<span class="hljs-string">"1"</span> step=<span class="hljs-string">"0.1"</span> onchange=<span class="hljs-string">"changeV()"</span>&gt;</code></pre>
<p>粒子选择</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<p style=&quot;margin: 0 0 20px 10px;&quot;>
      <span id=&quot;ball&quot;>圆形</span>
      <span id=&quot;rect&quot;>方块</span>
</p>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">&lt;p style=<span class="hljs-string">"margin: 0 0 20px 10px;"</span>&gt;
      &lt;span id=<span class="hljs-string">"ball"</span>&gt;圆形&lt;/span&gt;
      &lt;span id=<span class="hljs-string">"rect"</span>&gt;方块&lt;/span&gt;
&lt;/p&gt;
</code></pre>
<p>在这我就不一一列举了！CSS样式文件主要是对UI界面的布局和样式处理，具体请查看代码文件。</p>
<h3 id="articleHeader2">3.侧边栏滑动</h3>
<p>当点击菜单按钮时，侧边栏滑出，再次点击缩回。采用<code>classList</code>来切换滑出和缩回的class,在<code>sidebar.js</code>中</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var btn = document.getElementById(&quot;btn&quot;);
var control = document.getElementById(&quot;control&quot;);

btn.addEventListener('click', function(e){
    control.classList.toggle(&quot;slide&quot;);
}, false)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">var btn = document.getElementById(<span class="hljs-string">"btn"</span>);
var control = document.getElementById(<span class="hljs-string">"control"</span>);

btn.addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-keyword">function</span>(e){
    control.classList.toggle(<span class="hljs-string">"slide"</span>);
}, <span class="hljs-literal">false</span>)</code></pre>
<p>这样我们的基础界面就搭建完成。下面就到了我们这个动画的核心思想</p>
<h3 id="articleHeader3">4.准备工作</h3>
<p>首先，我们在我们的<code>index.js</code>文件中定义我们需要的一些变量</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    W = canvas.width = window.innerWidth;
     H = canvas.height = window.innerHeight;
    gridY = 7, gridX = 7;
    type = &quot;ball&quot;;

var message = document.getElementById('message'),
    gravity = document.getElementById('gra'),
    duration = document.getElementById('dur'),
    speed = document.getElementById('speed'),
    radius = document.getElementById('rad'),
    resolution = document.getElementById('res');

   graVal = parseFloat(gravity.value);
   durVal = parseFloat(duration.value);
   spdVal = parseFloat(speed.value);
   radVal = parseFloat(radius.value);
   resVal = parseFloat(resolution.value);      

colors = [
  '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5',
  '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50',
  '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800',
  '#FF5722'
  ];

function change(){
      。。。
}

function changeV() {
     。。。
}


(function drawFrame(){
    window.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, W, H);

    。。。
}())" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">var canvas = document.getElementById(<span class="hljs-string">'canvas'</span>);
    context = canvas.getContext(<span class="hljs-string">'2d'</span>);
    W = canvas.width = window.innerWidth;
     H = canvas.height = window.innerHeight;
    gridY = 7, gridX = 7;
    <span class="hljs-built_in">type</span> = <span class="hljs-string">"ball"</span>;

var message = document.getElementById(<span class="hljs-string">'message'</span>),
    gravity = document.getElementById(<span class="hljs-string">'gra'</span>),
    duration = document.getElementById(<span class="hljs-string">'dur'</span>),
    speed = document.getElementById(<span class="hljs-string">'speed'</span>),
    radius = document.getElementById(<span class="hljs-string">'rad'</span>),
    resolution = document.getElementById(<span class="hljs-string">'res'</span>);

   graVal = parseFloat(gravity.value);
   durVal = parseFloat(duration.value);
   spdVal = parseFloat(speed.value);
   radVal = parseFloat(radius.value);
   resVal = parseFloat(resolution.value);      

colors = [
  <span class="hljs-string">'#f44336'</span>, <span class="hljs-string">'#e91e63'</span>, <span class="hljs-string">'#9c27b0'</span>, <span class="hljs-string">'#673ab7'</span>, <span class="hljs-string">'#3f51b5'</span>,
  <span class="hljs-string">'#2196f3'</span>, <span class="hljs-string">'#03a9f4'</span>, <span class="hljs-string">'#00bcd4'</span>, <span class="hljs-string">'#009688'</span>, <span class="hljs-string">'#4CAF50'</span>,
  <span class="hljs-string">'#8BC34A'</span>, <span class="hljs-string">'#CDDC39'</span>, <span class="hljs-string">'#FFEB3B'</span>, <span class="hljs-string">'#FFC107'</span>, <span class="hljs-string">'#FF9800'</span>,
  <span class="hljs-string">'#FF5722'</span>
  ];

<span class="hljs-keyword">function</span> <span class="hljs-function"><span class="hljs-title">change</span></span>(){
      。。。
}

<span class="hljs-keyword">function</span> <span class="hljs-function"><span class="hljs-title">changeV</span></span>() {
     。。。
}


(<span class="hljs-keyword">function</span> <span class="hljs-function"><span class="hljs-title">drawFrame</span></span>(){
    window.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, W, H);

    。。。
}())</code></pre>
<p>注意这里的的context， W， H等我们定义的是全局变量。<br>这里有两个变量可能你不知道他是干什么的<code>gridX</code>和<code>gridY</code>，之后我会详细介绍。</p>
<h3 id="articleHeader4">5.shape.js 文件</h3>
<p>这个文件是我们整个动画效果的核心，只有理解了它，你才能了解这个效果的实现原理。因为不是很长，这里我把文件全部列出：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Shape(x, y, texte){
        this.x = x;
        this.y = y;
        this.size = 200;
        this.text = texte;
        this.placement = [];
    }
Shape.prototype.getValue = function(){
         context.textAlign = &quot;center&quot;;
         context.font =  this.size + &quot;px arial&quot;;
         context.fillText(this.text, this.x, this.y);

         var idata = context.getImageData(0, 0, W, H);
         var buffer32 = new Uint32Array(idata.data.buffer);

         for(var j=0; j < H; j += gridY){
             for(var i=0 ; i < W; i += gridX){
                 if(buffer32[j * W + i]){
                     var particle = new Particle(i, j, type);
                     this.placement.push(particle);
                 }
             }
         }
         
         context.clearRect(0, 0, W, H);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-keyword">function</span> Shape(x, y, texte){
        this.x = x;
        this.y = y;
        this.size = 200;
        this.text = texte;
        this.placement = [];
    }
Shape.prototype.getValue = <span class="hljs-function"><span class="hljs-title">function</span></span>(){
         context.textAlign = <span class="hljs-string">"center"</span>;
         context.font =  this.size + <span class="hljs-string">"px arial"</span>;
         context.fillText(this.text, this.x, this.y);

         var idata = context.getImageData(0, 0, W, H);
         var buffer32 = new Uint32Array(idata.data.buffer);

         <span class="hljs-keyword">for</span>(var j=0; j &lt; H; j += gridY){
             <span class="hljs-keyword">for</span>(var i=0 ; i &lt; W; i += gridX){
                 <span class="hljs-keyword">if</span>(buffer32[j * W + i]){
                     var particle = new Particle(i, j, <span class="hljs-built_in">type</span>);
                     this.placement.push(particle);
                 }
             }
         }
         
         context.clearRect(0, 0, W, H);
}</code></pre>
<p>接下来，我就详细的解一下该文件的代码！首先我们新建了一个构造函数<code>Shape</code>，该构造函数有3个参数:</p>
<ul>
<li><p>x , y: 要绘制的文字的位置</p></li>
<li><p>texte: 要绘制的文字</p></li>
</ul>
<p>我们设置了文字的大小为200px, 并且定义了一个属性<code>placement</code>，这个属性是一个数组。so wired!它是干什么的呢？别急，继续往下走。</p>
<p>接下来我们在原型对象上定义了一个方法<code>getValue</code>.这几行代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" context.textAlign = &quot;center&quot;;
 context.font =  this.size + &quot;px arial&quot;;
 context.fillText(this.text, this.x, this.y);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"> context.textAlign = <span class="hljs-string">"center"</span>;
 context.font =  this.size + <span class="hljs-string">"px arial"</span>;
 context.fillText(this.text, this.x, this.y);</code></pre>
<p>很简单，设置文字对其方式，字体大小，并且通过<code>fillText()</code>在canvas上绘制文字。如果此时在控制栏中输入文字，在index.js中新建一个shape对象，并把文字传入，再调用getValue方法就可以看到你已经把输入的文字绘制到了canvas中，当然这时候忽略下面的代码啊！</p>
<p>回到正题，接下来我们调用了<code>context.getImageData()</code>，它是canvas绘制图片的API接口，通过它我们可以得到需要绘制的图片的数据内容。也许你会问，它是用来获取canvas上绘制的图片的数据内容，可是我们这并没有绘制图片啊？</p>
<p>其实，该方法的作用并不只是局限于获取图片的内容。只要canvas上有内容，不管是绘制的文字，还是图形它都能获取，甚至是空白的canvas它也能获取，只不过此时的数据都是0。</p>
<p>那么通过该API获取的内容是什么样的呢？首先，我们尝试获取一张空canvas的内容</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d');
var imgData = context.getImageData(0, 0, canvas.width, canvas.height);
    console.log(imgData); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">var canvas = document.getElementById(<span class="hljs-string">'canvas'</span>),
    context = canvas.getContext(<span class="hljs-string">'2d'</span>);
var imgData = context.getImageData(0, 0, canvas.width, canvas.height);
    console.log(imgData); </code></pre>
<p>结果如下：</p>
<p><span class="img-wrap"><img data-src="/img/bVx6e1" src="https://static.alili.tech/img/bVx6e1" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>我们看到，这里的<code>imgData</code>是一个对象，该对象的第一个属性就是<code>data</code>,是一个8位无符号整数的类型化数组<a href="https://msdn.microsoft.com/zh-cn/library/dn641188%28v=vs.94%29.aspx" rel="nofollow noreferrer" target="_blank">Uint8ClampedArray</a>。打开data看看都有什么,这里我随便打开其中的一个看看。</p>
<p><span class="img-wrap"><img data-src="/img/bVx6e2" src="https://static.alili.tech/img/bVx6e2" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>因为canvas为空，所以数据都为零。现在我们换一下，在canvas中画一个蓝色的矩形。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="context.fillStyle = &quot;#49f&quot;;
context.fillRect(0, 0, canvas.width,canvas.height);
var imgData = context.getImageData(0, 0, canvas.width, canvas.height);
console.log(imgData);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">context.fillStyle = <span class="hljs-string">"#49f"</span>;
context.fillRect(0, 0, canvas.width,canvas.height);
var imgData = context.getImageData(0, 0, canvas.width, canvas.height);
console.log(imgData);</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVx6e4" src="https://static.alili.tech/img/bVx6e4" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>看看，我们的的数据是不是不为零了！OK! 原理我在这解释的都差不多了，我们回到正题，看下一行代码。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" var buffer32 = new Uint32Array(idata.data.buffer);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;"> var buffer32 = new Uint32Array(idata.data.buffer);</code></pre>
<p><code>idata.data.buffer</code> ,在这里我们调用Uint8ClampedArray对象的buffer属性，获取此数组引用的 <code>ArrayBuffer</code>。然后将它传入<a href="https://msdn.microsoft.com/zh-cn/library/br230737%28v=vs.94%29.aspx" rel="nofollow noreferrer" target="_blank">Uint32Array</a>对象(32位无符号整数值的类型化数组）。此时，我们看看上面绘制蓝色矩形的数据变成什么样了，首先数组长度变为[160000],刚好是上面的8位的四分之一</p>
<p><span class="img-wrap"><img data-src="/img/bVx6e7" src="https://static.alili.tech/img/bVx6e7" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>内容变为</p>
<p><span class="img-wrap"><img data-src="/img/bVx6fa" src="https://static.alili.tech/img/bVx6fa" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>相当于我们把一张图片的分辨率缩小了，以前有640000个数据， 现在只有160000个数据。当然，在本文中数据的内容不是我们所关心的。我们所关心的是在哪有数据。</p>
<p>所以，接下来,就是在有数据的地方，放上我们的粒子</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for(var j=0; j < H; j += gridY){
             for(var i=0 ; i < W; i += gridX){
                 if(buffer32[j * W + i]){
                     var particle = new Particle(i, j, type);
                     this.placement.push(particle);
                 }
             }
         }

 context.clearRect(0, 0, W, H); //清除所画内容
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-keyword">for</span>(var j=0; j &lt; H; j += gridY){
             <span class="hljs-keyword">for</span>(var i=0 ; i &lt; W; i += gridX){
                 <span class="hljs-keyword">if</span>(buffer32[j * W + i]){
                     var particle = new Particle(i, j, <span class="hljs-built_in">type</span>);
                     this.placement.push(particle);
                 }
             }
         }

 context.clearRect(0, 0, W, H); //清除所画内容
</code></pre>
<p>我们遍历整个canvas, 通过<code>buffer32[j * W + i]</code>来判断这个位置的数据是否为空，如果不为空，那么，在这绘制一个粒子。粒子的位置为（i，j）我们作为参数传入。当然你也可以在数据为空的地方放上粒子，看看会出现什么样的效果。</p>
<p>这里用到了gridX和gridY，它们的作用是来判断每个多少个距离取一次数据。学过信号抽样的同学应该很好理解，如果你间隔大，抽样得到的数据就小，反之如果你设定的间隔小，那么抽到的数据就多。在我们的效果中，我们绘制的是文字，同样的道理，间隔小获取的数据就多，粒子就多，组成的文字就完整。间隔大获取的就少。那么粒子组成的文字就不那么完整，这两个变量的值，通过分辨率控件来绑定。思来想去还是上张图吧！</p>
<p><span class="img-wrap"><img data-src="/img/bVx6fc" src="https://static.alili.tech/img/bVx6fc" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader5">6.particles.js 文件</h3>
<p>该文件就是我们的粒子文件，我就不做过多解释了,不懂得欢迎提问。</p>
<h3 id="articleHeader6">7.粒子切换</h3>
<p>粒子切换的代码在<code>slide.js</code>中，很简单，就是绑定了两个事件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/粒子切换
var ball = document.getElementById(&quot;ball&quot;);
var rect = document.getElementById(&quot;rect&quot;);

function chose(particleName){
    particleName.addEventListener('click', function(e){
        this.style.backgroundColor = &quot;orange&quot;;
        (particleName == ball ? rect : ball).style.backgroundColor = &quot;rgba(0, 0, 0, 0)&quot;;
        type = (type === &quot;ball&quot; ? &quot;rect&quot; : &quot;ball&quot;);
        change();
        
    }, false)
}

chose(ball);
chose(rect);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">/粒子切换
var ball = document.getElementById(<span class="hljs-string">"ball"</span>);
var rect = document.getElementById(<span class="hljs-string">"rect"</span>);

<span class="hljs-keyword">function</span> chose(particleName){
    particleName.addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-keyword">function</span>(e){
        this.style.backgroundColor = <span class="hljs-string">"orange"</span>;
        (particleName == ball ? rect : ball).style.backgroundColor = <span class="hljs-string">"rgba(0, 0, 0, 0)"</span>;
        <span class="hljs-built_in">type</span> = (<span class="hljs-built_in">type</span> === <span class="hljs-string">"ball"</span> ? <span class="hljs-string">"rect"</span> : <span class="hljs-string">"ball"</span>);
        change();
        
    }, <span class="hljs-literal">false</span>)
}

chose(ball);
chose(rect);</code></pre>
<p>Ok！这个效果的关键点，基本都已经讲完了，有兴趣自己看看吧！！！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
《每周一点canvas动画》—— 文字粒子

## 原文链接
[https://segmentfault.com/a/1190000005704935](https://segmentfault.com/a/1190000005704935)

