---
title: '《每周一点canvas动画》——用户交互' 
date: 2019-02-12 2:30:12
hidden: true
slug: egftwtbfu6g
categories: [reprint]
---

{{< raw >}}

                    
<p>用户交互也许是我们学习canvas动画中首先需要掌握的部分。毕竟，如果没有交互或者向动画中做一些动态的输入，那么这跟看电影有什么区别呢？用户交互基于事件，一般来说包括：<code>鼠标事件</code>，<code>触摸事件</code>和<code>键盘事件</code>。</p>
<h4>1、事件和事件执行</h4>
<p>在理解事件之前，你需要明白什么是<code>listener</code>和<code>handler</code>。<br>listener(即监听器)决定当一个事件发生时是否做出反应。handler(即执行者)是一个函数，当事件发生时被调用。好了，扯了这么多直接上代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    element.addEventListener(type, handler[, useCapture]);

    type: 事件类型
    handler: 事件执行函数
    useCapture: 可选，为布尔值false/true, 表示在冒泡/捕获阶段执行
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fsharp"><code>    element.addEventListener(<span class="hljs-class"><span class="hljs-keyword">type</span>, <span class="hljs-title">handler</span>[, <span class="hljs-title">useCapture</span>]);</span>

    <span class="hljs-class"><span class="hljs-keyword">type</span>: 事件类型</span>
    handler: 事件执行函数
    useCapture: 可选，为布尔值<span class="hljs-keyword">false</span>/<span class="hljs-keyword">true</span>, 表示在冒泡/捕获阶段执行
</code></pre>
<p>通过方法<code>addEventListener</code>来为某一元素添加事件，具体到我们的canvas上是什么样的呢？加入我们现在想要在canvas上绑定一个<code>mousedown</code>事件，具体代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    canvas.addEventListener('mousedown', function(event){
        console.log(&quot;Mouse pressed on element&quot;);
    }, false)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>    canvas.addEventListener(<span class="hljs-string">'mousedown'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Mouse pressed on element"</span>);
    }, <span class="hljs-literal">false</span>)
</code></pre>
<p>这样我们就为canvas绑定了鼠标点击事件，当在canvas上按下鼠标是就会在控制台看到打印出 "Mouse pressed on element"。</p>
<p>那么既然有添加事件(<code>addEventListener</code>)，就有移除事件(<code>removeEventListener</code>)，使用方式与添加事件几乎完全一样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    element.removeEventListener(type, handler[, useCapture]);
    type: 事件类型
    handler: 事件执行函数
    useCapture: 可选，为布尔值false/true, 表示在冒泡/捕获阶段执行" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fsharp"><code>    element.removeEventListener(<span class="hljs-class"><span class="hljs-keyword">type</span>, <span class="hljs-title">handler</span>[, <span class="hljs-title">useCapture</span>]);</span>
    <span class="hljs-class"><span class="hljs-keyword">type</span>: 事件类型</span>
    handler: 事件执行函数
    useCapture: 可选，为布尔值<span class="hljs-keyword">false</span>/<span class="hljs-keyword">true</span>, 表示在冒泡/捕获阶段执行</code></pre>
<p>唯一需要注意的是<code>handler</code>,即移除事件的函数，这里只能写函数名，而不能像添加事件一样将整个功能函数全部写入。也就是说，在添加某个事件的时候，我们可以将需要执行的函数写在事件监听之外并命名，这样如果你想要在后续的代码中移除该事件，直接将函数名传入移除事件的<code>handler</code>中即可。</p>
<p>现在让我们来实验下先为canvas添加一个事件，再将其移除</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body>
  <canvas id=&quot;canvas&quot; width=&quot;500&quot; height=&quot;500&quot;></canvas>
  <script></script>
   <script>
       window.onload = function(){
           var canvas = document.getElementById('canvas');
           
           //定义的执行函数add
           function add(event){
               console.log(&quot;mouse down&quot;);
           }
           canvas.addEventListener('mousedown', add, false);
           
           //移除事件mousedown
           canvas.removeEventListener('mousedown', add, false)
       }
   </script>
</body>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">canvas</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"canvas"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"500"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"500"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">canvas</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
       <span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
           <span class="hljs-keyword">var</span> canvas = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'canvas'</span>);
           
           <span class="hljs-comment">//定义的执行函数add</span>
           <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span>(<span class="hljs-params">event</span>)</span>{
               <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"mouse down"</span>);
           }
           canvas.addEventListener(<span class="hljs-string">'mousedown'</span>, add, <span class="hljs-literal">false</span>);
           
           <span class="hljs-comment">//移除事件mousedown</span>
           canvas.removeEventListener(<span class="hljs-string">'mousedown'</span>, add, <span class="hljs-literal">false</span>)
       }
   </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
</code></pre>
<p>现在你可以看看控制台是否还能打印出“mouse down”！</p>
<h4>2.鼠标事件</h4>
<p>鼠标事件一共可以分为：</p>
<ul>
<li><p>mousedown</p></li>
<li><p>mouseup</p></li>
<li><p>click</p></li>
<li><p>dbclick</p></li>
<li><p>mousewheel</p></li>
<li><p>mouseover</p></li>
<li><p>mouseout</p></li>
</ul>
<p>每一个鼠标事件都包含两个属性来决定当前鼠标的位置：<code>pageX</code>和<code>pageY</code>。通过<code>pageX</code>和<code>pageY</code>，还有canvas元素的偏移位置，我们就能够计算出鼠标具体是在canvas元素的什么位置。为了考虑不同浏览器的兼容性，以防万一你可以使用<code>clientX</code>和<code>clientY</code>。在这里，我们创建一个js文件，名为<code>**utils.js**</code>,这个文件是我们的一个工具函数，里面会逐渐加入一些我们重复使用的方法，那么现在我们向我们的工具函数中添加第一个方法<code>captureMouse</code>,具体代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="utils.js文件

    //将utils定义为window对象下的一个属性，属性值为对象
    window.utils = {};

    //在utils对象上定义捕获坐标的方法
    window.utils.captureMouse = function(element){
            //定义一个名为mouse的对象
            var mouse = {x:0,y:0};
            
            //为元素绑定mousemove事件
            element.addEventListener('mousemove',function(event){
                var x,y;
                
                //获取鼠标位于当前屏幕的位置， 并作兼容处理
                if(event.pageX||event.pageY){
                    x = event.pageX;
                    y = event.pageY;
                }else{
                    x = event.clientX + document.body.scrollLeft +document.documentElement.scrollLeft;
                    y = event.clientY + document.body.scrollTop +document.documentElement.scrollTop;
                }
                //将当前的坐标值减去元素的偏移位置，即为鼠标位于当前canvas的位置
                x -= element.offsetLeft;
                y -= element.offsetTop;

                mouse.x = x;
                mouse.y = y;
            },false);
             //返回值为mouse对象
             return mouse;
        }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>utils.js文件

    <span class="hljs-comment">//将utils定义为window对象下的一个属性，属性值为对象</span>
    <span class="hljs-built_in">window</span>.utils = {};

    <span class="hljs-comment">//在utils对象上定义捕获坐标的方法</span>
    <span class="hljs-built_in">window</span>.utils.captureMouse = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">element</span>)</span>{
            <span class="hljs-comment">//定义一个名为mouse的对象</span>
            <span class="hljs-keyword">var</span> mouse = {<span class="hljs-attr">x</span>:<span class="hljs-number">0</span>,<span class="hljs-attr">y</span>:<span class="hljs-number">0</span>};
            
            <span class="hljs-comment">//为元素绑定mousemove事件</span>
            element.addEventListener(<span class="hljs-string">'mousemove'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>)</span>{
                <span class="hljs-keyword">var</span> x,y;
                
                <span class="hljs-comment">//获取鼠标位于当前屏幕的位置， 并作兼容处理</span>
                <span class="hljs-keyword">if</span>(event.pageX||event.pageY){
                    x = event.pageX;
                    y = event.pageY;
                }<span class="hljs-keyword">else</span>{
                    x = event.clientX + <span class="hljs-built_in">document</span>.body.scrollLeft +<span class="hljs-built_in">document</span>.documentElement.scrollLeft;
                    y = event.clientY + <span class="hljs-built_in">document</span>.body.scrollTop +<span class="hljs-built_in">document</span>.documentElement.scrollTop;
                }
                <span class="hljs-comment">//将当前的坐标值减去元素的偏移位置，即为鼠标位于当前canvas的位置</span>
                x -= element.offsetLeft;
                y -= element.offsetTop;

                mouse.x = x;
                mouse.y = y;
            },<span class="hljs-literal">false</span>);
             <span class="hljs-comment">//返回值为mouse对象</span>
             <span class="hljs-keyword">return</span> mouse;
        }</code></pre>
<p>这个方法将DOM元素作为参数传入，这样我们只要将canvas传入就可以获取到鼠标在当前canvas的位置。具体代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <canvas id=&quot;canvas&quot; width='500' height=&quot;500&quot; style=&quot;background:#000&quot;>
           <p>you browser not support canvas!<p>
       </canvas>
       <script src='../js/utils.js'></script>
       <script>
           window.onload = function(){
              var canvas = document.getElementById('canvas'),
                  //将canvas传入，该方法会返回一个包含属性x和y的对象
                  mouse = utils.captureMouse(canvas);

              //为canvas绑定mousedown事件，当鼠标按下的时候打印出当前鼠标相对于canvas的坐标值
              canvas.addEventListener('mousedown',function(event){
                console.log(&quot;x:&quot; +mouse.x +&quot;,y:&quot; + mouse.y);
              });
       </script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>    <span class="hljs-tag">&lt;<span class="hljs-name">canvas</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"canvas"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">'500'</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"500"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"background:#000"</span>&gt;</span>
           <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>you browser not support canvas!<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
       <span class="hljs-tag">&lt;/<span class="hljs-name">canvas</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">'../js/utils.js'</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
           <span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
              <span class="hljs-keyword">var</span> canvas = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'canvas'</span>),
                  <span class="hljs-comment">//将canvas传入，该方法会返回一个包含属性x和y的对象</span>
                  mouse = utils.captureMouse(canvas);

              <span class="hljs-comment">//为canvas绑定mousedown事件，当鼠标按下的时候打印出当前鼠标相对于canvas的坐标值</span>
              canvas.addEventListener(<span class="hljs-string">'mousedown'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>)</span>{
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"x:"</span> +mouse.x +<span class="hljs-string">",y:"</span> + mouse.y);
              });
       </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>Have a try!!!看看能否成功。</p>
<h5>getBoundingClientRect（）</h5>
<p>其实，关于canvas的鼠标位置获取的方法还可以应用它自身的一个方法<code>getBoundingClientRect</code>，这里做一个介绍，你可以使用，但本系列文章主要使用上面这种更具广泛性的方法。具体代码可以参考如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        canvas.addEventListener('mousedown',function(event){
                       //event兼容处理
                       var event = event || window.event;
                       //兼容处理，获取当前鼠标相对屏幕的坐标
                       var winX = event.clientX+document.body.scrollLeft +document.documentElement.scrollLeft || event.pageX;
                       var winY = event.clientY+document.body.scrollTop +document.documentElement.scrollTop || event.pageY;
                       
                       //定义一个对象
                       var can = {x:0, y:0};
                       //调用getBoundingClientRect方法，该方法返回一个对象，包含canvas的left、 top、 width、 height等值
                       
                       var canBox = canvas.getBoundingClientRect();
                       
                   //（winX - canBox.left）：与上面的含义一样，是减去canvas的偏移量
                   //（canvas.width/canBox.width）：一般来说canvas.width和canBox.width是一样的，也就是说这两个的比值为1.但不排除你会为canvas设置边框，这是实际的坐标位置就会有所变化，比如canvas.width = 500, 你可能设置了一个1px的边框，那么canBox.width = 502, 所以比值就不为1了。这样做只是让数据更精确。
                   
                       can.x = (winX - canBox.left)*(canvas.width/canBox.width);
                       can.y = (winY - canBox.top)*(canvas.height/canBox.height);
                       
                       //输出
                       console.log(can.x，can.y);
                   },false);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>        canvas.addEventListener(<span class="hljs-string">'mousedown'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>)</span>{
                       <span class="hljs-comment">//event兼容处理</span>
                       <span class="hljs-keyword">var</span> event = event || <span class="hljs-built_in">window</span>.event;
                       <span class="hljs-comment">//兼容处理，获取当前鼠标相对屏幕的坐标</span>
                       <span class="hljs-keyword">var</span> winX = event.clientX+<span class="hljs-built_in">document</span>.body.scrollLeft +<span class="hljs-built_in">document</span>.documentElement.scrollLeft || event.pageX;
                       <span class="hljs-keyword">var</span> winY = event.clientY+<span class="hljs-built_in">document</span>.body.scrollTop +<span class="hljs-built_in">document</span>.documentElement.scrollTop || event.pageY;
                       
                       <span class="hljs-comment">//定义一个对象</span>
                       <span class="hljs-keyword">var</span> can = {<span class="hljs-attr">x</span>:<span class="hljs-number">0</span>, <span class="hljs-attr">y</span>:<span class="hljs-number">0</span>};
                       <span class="hljs-comment">//调用getBoundingClientRect方法，该方法返回一个对象，包含canvas的left、 top、 width、 height等值</span>
                       
                       <span class="hljs-keyword">var</span> canBox = canvas.getBoundingClientRect();
                       
                   <span class="hljs-comment">//（winX - canBox.left）：与上面的含义一样，是减去canvas的偏移量</span>
                   <span class="hljs-comment">//（canvas.width/canBox.width）：一般来说canvas.width和canBox.width是一样的，也就是说这两个的比值为1.但不排除你会为canvas设置边框，这是实际的坐标位置就会有所变化，比如canvas.width = 500, 你可能设置了一个1px的边框，那么canBox.width = 502, 所以比值就不为1了。这样做只是让数据更精确。</span>
                   
                       can.x = (winX - canBox.left)*(canvas.width/canBox.width);
                       can.y = (winY - canBox.top)*(canvas.height/canBox.height);
                       
                       <span class="hljs-comment">//输出</span>
                       <span class="hljs-built_in">console</span>.log(can.x，can.y);
                   },<span class="hljs-literal">false</span>);
</code></pre>
<h3 id="articleHeader0">3、键盘事件</h3>
<p>键盘事件就两个：</p>
<ul>
<li><p>keydown</p></li>
<li><p>keyup</p></li>
</ul>
<p>我们同样可以向绑定鼠标事件那样为canvas绑定键盘事件。好吧！现在我们来看看，如何将一个键盘事件绑定到window(为什么不直接绑定到canvas上呢？想想)上：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body >
    <p>任意按下按键</p>
   <script>
       window.onload = function(){
       
              //定义键盘事件
           function onKeyboard(event){
              switch (event.keyCode){
                  case 38:
                      console.log('up!');
                      break;
                  case 40:
                      console.log('down!');
                      break;
                  case 37:
                      console.log('left!');
                      break;
                  case 39:
                      console.log('right!');
                      break;
                  default:
                      console.log(event.keyCode);
           }
        }
        //为window对象绑定键盘事件
        window.addEventListener('keydown',onKeyboard,false)；
       }
    </script>
</body>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">body</span> &gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>任意按下按键<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
       <span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
       
              <span class="hljs-comment">//定义键盘事件</span>
           <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onKeyboard</span>(<span class="hljs-params">event</span>)</span>{
              <span class="hljs-keyword">switch</span> (event.keyCode){
                  <span class="hljs-keyword">case</span> <span class="hljs-number">38</span>:
                      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'up!'</span>);
                      <span class="hljs-keyword">break</span>;
                  <span class="hljs-keyword">case</span> <span class="hljs-number">40</span>:
                      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'down!'</span>);
                      <span class="hljs-keyword">break</span>;
                  <span class="hljs-keyword">case</span> <span class="hljs-number">37</span>:
                      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'left!'</span>);
                      <span class="hljs-keyword">break</span>;
                  <span class="hljs-keyword">case</span> <span class="hljs-number">39</span>:
                      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'right!'</span>);
                      <span class="hljs-keyword">break</span>;
                  <span class="hljs-keyword">default</span>:
                      <span class="hljs-built_in">console</span>.log(event.keyCode);
           }
        }
        <span class="hljs-comment">//为window对象绑定键盘事件</span>
        <span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">'keydown'</span>,onKeyboard,<span class="hljs-literal">false</span>)；
       }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
</code></pre>
<p>试一试，当按下鼠标的方向键是是否在控制台打印出了相应的信息！</p>
<h3 id="articleHeader1">4、触摸事件</h3>
<p>触摸事件包括以下3种：</p>
<ul>
<li><p>touchstart</p></li>
<li><p>touchend</p></li>
<li><p>touchmove</p></li>
</ul>
<p>触摸实践中，手指就充当了鼠标的作用。同样我们最为关心的是当前触摸的位置。和<code>captureMouse</code>方法一样，这里在我们的工具函数文件中，需要添加一新的方法来捕获触摸的位置，名为<code>captureTouch</code>,现在在utils.js文件中添加如下方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="utils.js文件

    window.utils.captureTouch = function (element) {
      var touch = {
                      x: null,
                    y: null,
                    isPressed: false,
                    event: null
                    }；
      var body_scrollLeft = document.body.scrollLeft,
          element_scrollLeft = document.documentElement.scrollLeft,
          body_scrollTop = document.body.scrollTop,
          element_scrollTop = document.documentElement.scrollTop,
          offsetLeft = element.offsetLeft,
          offsetTop = element.offsetTop;
          
     // 绑定touchstart事件
      element.addEventListener('touchstart', function (event) {
        touch.isPressed = true;
        touch.event = event;
      }, false);
      
     // 绑定touchend事件
      element.addEventListener('touchend', function (event) {
        touch.isPressed = false;
        touch.x = null;
        touch.y = null;
        touch.event = event;
      }, false);
      
     //绑定touchmove事件
      element.addEventListener('touchmove', function (event) {
        var x, y,
            touch_event = event.touches[0]; //第一次touch

        if (touch_event.pageX || touch_event.pageY) {
          x = touch_event.pageX;
          y = touch_event.pageY;
        } else {
          x = touch_event.clientX + body_scrollLeft + element_scrollLeft;
          y = touch_event.clientY + body_scrollTop + element_scrollTop;
        }
        //剪去偏移量
        x -= offsetLeft;
        y -= offsetTop;

        touch.x = x;
        touch.y = y;
        touch.event = event;
      }, false);
      //返回touch对象
      return touch;
    };
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>utils.js文件

    <span class="hljs-built_in">window</span>.utils.captureTouch = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">element</span>) </span>{
      <span class="hljs-keyword">var</span> touch = {
                      <span class="hljs-attr">x</span>: <span class="hljs-literal">null</span>,
                    <span class="hljs-attr">y</span>: <span class="hljs-literal">null</span>,
                    <span class="hljs-attr">isPressed</span>: <span class="hljs-literal">false</span>,
                    <span class="hljs-attr">event</span>: <span class="hljs-literal">null</span>
                    }；
      <span class="hljs-keyword">var</span> body_scrollLeft = <span class="hljs-built_in">document</span>.body.scrollLeft,
          element_scrollLeft = <span class="hljs-built_in">document</span>.documentElement.scrollLeft,
          body_scrollTop = <span class="hljs-built_in">document</span>.body.scrollTop,
          element_scrollTop = <span class="hljs-built_in">document</span>.documentElement.scrollTop,
          offsetLeft = element.offsetLeft,
          offsetTop = element.offsetTop;
          
     <span class="hljs-comment">// 绑定touchstart事件</span>
      element.addEventListener(<span class="hljs-string">'touchstart'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event</span>) </span>{
        touch.isPressed = <span class="hljs-literal">true</span>;
        touch.event = event;
      }, <span class="hljs-literal">false</span>);
      
     <span class="hljs-comment">// 绑定touchend事件</span>
      element.addEventListener(<span class="hljs-string">'touchend'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event</span>) </span>{
        touch.isPressed = <span class="hljs-literal">false</span>;
        touch.x = <span class="hljs-literal">null</span>;
        touch.y = <span class="hljs-literal">null</span>;
        touch.event = event;
      }, <span class="hljs-literal">false</span>);
      
     <span class="hljs-comment">//绑定touchmove事件</span>
      element.addEventListener(<span class="hljs-string">'touchmove'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event</span>) </span>{
        <span class="hljs-keyword">var</span> x, y,
            touch_event = event.touches[<span class="hljs-number">0</span>]; <span class="hljs-comment">//第一次touch</span>

        <span class="hljs-keyword">if</span> (touch_event.pageX || touch_event.pageY) {
          x = touch_event.pageX;
          y = touch_event.pageY;
        } <span class="hljs-keyword">else</span> {
          x = touch_event.clientX + body_scrollLeft + element_scrollLeft;
          y = touch_event.clientY + body_scrollTop + element_scrollTop;
        }
        <span class="hljs-comment">//剪去偏移量</span>
        x -= offsetLeft;
        y -= offsetTop;

        touch.x = x;
        touch.y = y;
        touch.event = event;
      }, <span class="hljs-literal">false</span>);
      <span class="hljs-comment">//返回touch对象</span>
      <span class="hljs-keyword">return</span> touch;
    };
</code></pre>
<h3 id="articleHeader2">总结</h3>
<p>这一节主要介绍用户与canvas交互的各种事件，重要的是你应该在你自己的工具函数文件中包含了以下两个方法：<code>utils.captureTouch</code>和<code>utils.captureMouse</code>这两个方法都是为了获取当前相对于canvas元素的位置。我们将在后面的章节中频繁使用。当然，除了这两个方法，由于我们使用的<code>requestAnimationFrame</code>方法同样也涉及到兼容性的问题，我们将它一同添加到<code>utils.js</code>中，具体代码请查看<code>utils.js</code>文件。<br>下一节，三角函数坐标旋转敬请期待！！！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
《每周一点canvas动画》——用户交互

## 原文链接
[https://segmentfault.com/a/1190000004882447](https://segmentfault.com/a/1190000004882447)

