---
title: '连接两个div的直线，拖动时保持连线。' 
date: 2018-12-26 2:30:14
hidden: true
slug: 5i6ustqejzb
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">效果：连接两个div带箭头的虚线，拖动div时保持线条实时改变位置保持始终连接</h3>
<p>效果图：<br><span class="img-wrap"><img data-src="/img/bVYc4w?w=647&amp;h=544" src="https://static.alili.tech/img/bVYc4w?w=647&amp;h=544" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h4>1.产品经理提出的需求</h4>
<blockquote><p>用带箭头的虚线将两个位置不固定的div连接起来,初听到这个需求一头雾水，传统的div可以做直线，但斜起来不太好做，幸亏之前接触过svg,里面有一个line标签，知道起始中止两个点的位置，就可以将两个点连接起来了。<br>  至于箭头,可以这么做先定义箭头：</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      <svg>
          <defs>
              <marker id=&quot;arrow&quot; markerUnits=&quot;strokeWidth&quot; markerWidth=&quot;12&quot; markerHeight=&quot;12&quot; viewBox=&quot;0 0 12 12&quot; refX=&quot;6&quot; refY=&quot;6&quot; orient=&quot;auto&quot;>
                  <path xmlns=&quot;http://www.w3.org/2000/svg&quot; d=&quot;M2,2 L10,6 L2,10 L6,6 L2,2&quot; style=&quot;fill: #000000;&quot; />
              </marker>
          </defs>
      </svg>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>      <span class="hljs-tag">&lt;<span class="hljs-name">svg</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">defs</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">marker</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"arrow"</span> <span class="hljs-attr">markerUnits</span>=<span class="hljs-string">"strokeWidth"</span> <span class="hljs-attr">markerWidth</span>=<span class="hljs-string">"12"</span> <span class="hljs-attr">markerHeight</span>=<span class="hljs-string">"12"</span> <span class="hljs-attr">viewBox</span>=<span class="hljs-string">"0 0 12 12"</span> <span class="hljs-attr">refX</span>=<span class="hljs-string">"6"</span> <span class="hljs-attr">refY</span>=<span class="hljs-string">"6"</span> <span class="hljs-attr">orient</span>=<span class="hljs-string">"auto"</span>&gt;</span>
                  <span class="hljs-tag">&lt;<span class="hljs-name">path</span> <span class="hljs-attr">xmlns</span>=<span class="hljs-string">"http://www.w3.org/2000/svg"</span> <span class="hljs-attr">d</span>=<span class="hljs-string">"M2,2 L10,6 L2,10 L6,6 L2,2"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"fill: #000000;"</span> /&gt;</span>
              <span class="hljs-tag">&lt;/<span class="hljs-name">marker</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">defs</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">svg</span>&gt;</span></code></pre>
<p>将箭头放在直线上：marker-end="url(#arrow)"</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   <line  x1=&quot;0&quot; y1=&quot;0&quot; x2=&quot;200&quot; y2=&quot;50&quot; stroke=&quot;#000&quot; stroke-width=&quot;2&quot; marker-end=&quot;url(#arrow)&quot;stroke-dasharray=&quot;10,10&quot;></line> " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code style="word-break: break-word; white-space: initial;">   &lt;<span class="hljs-built_in">line</span>  x1=<span class="hljs-string">"0"</span> y1=<span class="hljs-string">"0"</span> x2=<span class="hljs-string">"200"</span> y2=<span class="hljs-string">"50"</span> <span class="hljs-built_in">stroke</span>=<span class="hljs-string">"#000"</span> <span class="hljs-built_in">stroke</span>-<span class="hljs-built_in">width</span>=<span class="hljs-string">"2"</span> marker-<span class="hljs-built_in">end</span>=<span class="hljs-string">"url(#arrow)"</span><span class="hljs-built_in">stroke</span>-dasharray=<span class="hljs-string">"10,10"</span>&gt;&lt;/<span class="hljs-built_in">line</span>&gt; </code></pre>
<h4>2.确定起始中止两个点左上角的位置</h4>
<blockquote><p>需要连接的两个div及SVG都相对于某一个div.wrap绝对定位，可以先求得两个div左上角相对与div.wrap坐标：</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      //获取元素左上角相对于某一元素的的位置
      function getElCoordinate(dom) {
                  var t = dom.offsetTop;
                  var l = dom.offsetLeft;
                  var w = dom.offsetWidth;
                  var h = dom.offsetHeight;
                  dom = dom.offsetParent;
                  while (!$(dom).hasClass('wrap')) {
                      t += dom.offsetTop;
                      l += dom.offsetLeft;
                      dom = dom.offsetParent;
                  }; return {
                      top: t,//Y轴坐标
                      left: l,//X轴坐标
                      width:w,//元素宽度
                      height:h//元素高度 
                  };
              }
     })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>      <span class="hljs-comment">//获取元素左上角相对于某一元素的的位置</span>
      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getElCoordinate</span>(<span class="hljs-params">dom</span>) </span>{
                  <span class="hljs-keyword">var</span> t = dom.offsetTop;
                  <span class="hljs-keyword">var</span> l = dom.offsetLeft;
                  <span class="hljs-keyword">var</span> w = dom.offsetWidth;
                  <span class="hljs-keyword">var</span> h = dom.offsetHeight;
                  dom = dom.offsetParent;
                  <span class="hljs-keyword">while</span> (!$(dom).hasClass(<span class="hljs-string">'wrap'</span>)) {
                      t += dom.offsetTop;
                      l += dom.offsetLeft;
                      dom = dom.offsetParent;
                  }; <span class="hljs-keyword">return</span> {
                      <span class="hljs-attr">top</span>: t,<span class="hljs-comment">//Y轴坐标</span>
                      left: l,<span class="hljs-comment">//X轴坐标</span>
                      width:w,<span class="hljs-comment">//元素宽度</span>
                      height:h<span class="hljs-comment">//元素高度 </span>
                  };
              }
     })</code></pre>
<h4>3.确定连接点在div上的位置：</h4>
<blockquote><p>分为两种情况：终点div位于起点div上方,终点div位于起点div下方。</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   var pos1 = getElCoordinate($('.item1')[0])//起点div的位置
   var pos2 = getElCoordinate($('.item2')[0])//终点div的位置
   function getPos(pos1, pos2){
              //分两种情况
              var x1,y1,x2,y2;
              if(pos2.top<pos1.top){
                  x1 = pos1.left + pos1.width/2;
                  y1 = pos1.top;
                  y2 = pos2.top + pos2.height
                 if(pos2.left<pos1.left){
                    x2 = pos2.left + pos2.width/2
              }else{
                  x1 = pos1.left + pos1.width / 2;
                  y1 = pos1.top + pos1.height;
                  x2 = pos2.left + pos2.width/2
                  y2 = pos2.top 
              }
              return {
                  start :{x:x1,y:y1},
                  end : {x:x2,y:y2}
              }
           }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coq"><code>   var pos1 = getElCoordinate($('.item1')[<span class="hljs-number">0</span>])//起点div的位置
   var pos2 = getElCoordinate($('.item2')[<span class="hljs-number">0</span>])//终点div的位置
   function getPos(pos1, pos2){
              //分两种情况
              var x1,y1,x2,y2;
              <span class="hljs-keyword">if</span>(pos2.<span class="hljs-built_in">top</span>&lt;pos1.<span class="hljs-built_in">top</span>){
                  x1 = pos1.<span class="hljs-built_in">left</span> + pos1.width/<span class="hljs-number">2</span>;
                  y1 = pos1.<span class="hljs-built_in">top</span>;
                  y2 = pos2.<span class="hljs-built_in">top</span> + pos2.height
                 <span class="hljs-keyword">if</span>(pos2.<span class="hljs-built_in">left</span>&lt;pos1.<span class="hljs-built_in">left</span>){
                    x2 = pos2.<span class="hljs-built_in">left</span> + pos2.width/<span class="hljs-number">2</span>
              }<span class="hljs-keyword">else</span>{
                  x1 = pos1.<span class="hljs-built_in">left</span> + pos1.width / <span class="hljs-number">2</span>;
                  y1 = pos1.<span class="hljs-built_in">top</span> + pos1.height;
                  x2 = pos2.<span class="hljs-built_in">left</span> + pos2.width/<span class="hljs-number">2</span>
                  y2 = pos2.<span class="hljs-built_in">top</span> 
              }
              <span class="hljs-keyword">return</span> {
                  start :{x:x1,y:y1},
                  <span class="hljs-keyword">end</span> : {x:x2,y:y2}
              }
           }</code></pre>
<h4>4.确定起止点位置后连线。</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   function move(){
               var pos1 = getElCoordinate($('.item1')[0])
               var pos2 = getElCoordinate($('.item2')[0])
               var start = getPos(pos1, pos2).start
               var end = getPos(pos1, pos2).end

               $('#line').attr({ x1: start.x, y1: start.y, x2: end.x, y2: end.y })
               $('#path').attr({ d: 'M20,20 L100,100' })
           }
           move()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>   <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">move</span>(<span class="hljs-params"></span>)</span>{
               <span class="hljs-keyword">var</span> pos1 = getElCoordinate($(<span class="hljs-string">'.item1'</span>)[<span class="hljs-number">0</span>])
               <span class="hljs-keyword">var</span> pos2 = getElCoordinate($(<span class="hljs-string">'.item2'</span>)[<span class="hljs-number">0</span>])
               <span class="hljs-keyword">var</span> start = getPos(pos1, pos2).start
               <span class="hljs-keyword">var</span> end = getPos(pos1, pos2).end

               $(<span class="hljs-string">'#line'</span>).attr({ <span class="hljs-attr">x1</span>: start.x, <span class="hljs-attr">y1</span>: start.y, <span class="hljs-attr">x2</span>: end.x, <span class="hljs-attr">y2</span>: end.y })
               $(<span class="hljs-string">'#path'</span>).attr({ <span class="hljs-attr">d</span>: <span class="hljs-string">'M20,20 L100,100'</span> })
           }
           move()</code></pre>
<h4>5.两个div分别拖动并保持线始终连接</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="             drag($('.item'), move)
             function drag(obj,callback) {
                var dragEles = obj;
                dragEles.each(function(index, dragEleDom){
                    var _move = false;//移动标记
                    var _x, _y;//鼠标离控件左上角的相对位置
                    var dragEle = $(dragEleDom)
                    dragEle.click(function () {
                        //alert(&quot;click&quot;);//点击（松开后触发）
                    }).mousedown(function (e) {
                        _move = true;
                        _x = e.pageX - parseInt(dragEle.css(&quot;left&quot;));
                        _y = e.pageY - parseInt(dragEle.css(&quot;top&quot;));
                        // dragEle.fadeTo(20, 0.9);//点击后开始拖动并透明显示
                    });
                    $(document).mousemove(function (e) {
                        if (_move) {
                            var x = e.pageX - _x;//移动时根据鼠标位置计算控件左上角的绝对位置
                            var y = e.pageY - _y;
                            dragEle.css({ top: y, left: x });//控件新位置
                            if(callback){callback()}
                        }
                    }).mouseup(function () {
                        _move = false;
                        dragEle.fadeTo(&quot;fast&quot;, 1);//松开鼠标后停止移动并恢复成不透明
                    });
                })
                
           }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>             drag($(<span class="hljs-string">'.item'</span>), move)
             <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">drag</span>(<span class="hljs-params">obj,callback</span>) </span>{
                <span class="hljs-keyword">var</span> dragEles = obj;
                dragEles.each(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">index, dragEleDom</span>)</span>{
                    <span class="hljs-keyword">var</span> _move = <span class="hljs-literal">false</span>;<span class="hljs-comment">//移动标记</span>
                    <span class="hljs-keyword">var</span> _x, _y;<span class="hljs-comment">//鼠标离控件左上角的相对位置</span>
                    <span class="hljs-keyword">var</span> dragEle = $(dragEleDom)
                    dragEle.click(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                        <span class="hljs-comment">//alert("click");//点击（松开后触发）</span>
                    }).mousedown(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
                        _move = <span class="hljs-literal">true</span>;
                        _x = e.pageX - <span class="hljs-built_in">parseInt</span>(dragEle.css(<span class="hljs-string">"left"</span>));
                        _y = e.pageY - <span class="hljs-built_in">parseInt</span>(dragEle.css(<span class="hljs-string">"top"</span>));
                        <span class="hljs-comment">// dragEle.fadeTo(20, 0.9);//点击后开始拖动并透明显示</span>
                    });
                    $(<span class="hljs-built_in">document</span>).mousemove(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
                        <span class="hljs-keyword">if</span> (_move) {
                            <span class="hljs-keyword">var</span> x = e.pageX - _x;<span class="hljs-comment">//移动时根据鼠标位置计算控件左上角的绝对位置</span>
                            <span class="hljs-keyword">var</span> y = e.pageY - _y;
                            dragEle.css({ <span class="hljs-attr">top</span>: y, <span class="hljs-attr">left</span>: x });<span class="hljs-comment">//控件新位置</span>
                            <span class="hljs-keyword">if</span>(callback){callback()}
                        }
                    }).mouseup(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                        _move = <span class="hljs-literal">false</span>;
                        dragEle.fadeTo(<span class="hljs-string">"fast"</span>, <span class="hljs-number">1</span>);<span class="hljs-comment">//松开鼠标后停止移动并恢复成不透明</span>
                    });
                })
                
           }</code></pre>
<h4>梳理下流程：分析需求&gt;确定使用SVG&gt;找到连接点&gt;连线&gt;拖动时保持连线。</h4>
<h4>源码托管于<a href="https://github.com/liubin915249126/javascript/tree/master/SVG" rel="nofollow noreferrer" target="_blank">github</a>欢迎star</h4>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
连接两个div的直线，拖动时保持连线。

## 原文链接
[https://segmentfault.com/a/1190000011927640](https://segmentfault.com/a/1190000011927640)

