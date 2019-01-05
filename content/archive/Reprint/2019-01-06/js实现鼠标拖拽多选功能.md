---
title: 'js实现鼠标拖拽多选功能' 
date: 2019-01-06 2:30:10
hidden: true
slug: yfiiqsy2x5
categories: [reprint]
---

{{< raw >}}

                    
<p>最近做了一个用js实现鼠标拖拽多选的功能，于是整理了一下思路，写了一个小demo：<br>遮罩出现：<br><span class="img-wrap"><img data-src="/img/bVRVC2?w=564&amp;h=516" src="https://static.alili.tech/img/bVRVC2?w=564&amp;h=516" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>被遮罩盖住的，即为选中的块（背景色为粉色）<br><span class="img-wrap"><img data-src="/img/bVRVDa?w=564&amp;h=491" src="https://static.alili.tech/img/bVRVDa?w=564&amp;h=491" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>下面是具体代码，注释已在文中，与大家交流。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
<head>
    <title>鼠标拖拽多选功能</title>
    <script src=&quot;https://cdn.bootcss.com/jquery/1.10.2/jquery.min.js&quot;></script>
    <style type=&quot;text/css&quot;>
        *{
            box-sizing:border-box;
        }
        ul{
            width:500px;
            height:auto;
            margin:0;
            padding:20px;
            font-size: 0;
            /*需设置定位*/
            position:relative;
        }
        li{
            width:70px;
            height:70px;
            margin:10px;
            padding:0;
            display:inline-block;
            vertical-align: top;
            font-size: 13px;
            border:1px solid #d9d9d9;
        }
        #moveSelected{
            position:absolute;
            background-color: blue;
            opacity:0.3;
            border:1px dashed #d9d9d9;
            top:0;
            left:0;
        }
        .selected{
            background-color: pink;
        }
    </style>
</head>
<body>
    <ul class=&quot;list&quot;>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>7</li>
        <li>8</li>
        <li>9</li>
        <li>10</li>
        <li>11</li>
        <li>12</li>
        <li>13</li>
        <li>14</li>
        <li>15</li>
        <li>16</li>
        <li>17</li>
        <li>18</li>
        <li>19</li>
        <li>20</li>
        <li>21</li>
        <li>22</li>
        <!-- 鼠标拖拽出的遮罩 （定位为  position:absolute）-->
        <!-- 遮罩最好是在绑定了mouseover事件的元素内部，并且不要阻止遮罩的冒泡事件。这样鼠标移到了遮罩上面，依然可以利用冒泡执行父元素的mouseover事件，就不会出现遮罩只能扩大，不能缩小的情况了（亲自试过） -->
        <div id=&quot;moveSelected&quot;></div>
    </ul>
</body>
</html>
<script type=&quot;text/javascript&quot;>
    $(document).ready(function(){
        let moveSelected=$('#moveSelected')[0];
        let flag=false;//是搜开启拖拽的标志
        let oldLeft=0;//鼠标按下时的left,top
        let oldTop=0;
        let selectedList=[];//拖拽多选选中的块集合

        // 鼠标按下时开启拖拽多选，将遮罩定位并展现
        $(&quot;.list&quot;).mousedown(function(event) {
            flag=true;
            moveSelected.style.top=event.pageY+'px';
            moveSelected.style.left=event.pageX+'px';
            oldLeft=event.pageX;
            oldTop=event.pageY;
            event.preventDefault();  // 阻止默认行为
            event.stopPropagation(); // 阻止事件冒泡
        });
        // 鼠标移动时计算遮罩的位置，宽 高
        $(&quot;.list&quot;).mousemove(function(event) {
            if(!flag) return;//只有开启了拖拽，才进行mouseover操作
            if(event.pageX<oldLeft){//向左拖
                moveSelected.style.left=event.pageX+'px';
                moveSelected.style.width=(oldLeft-event.pageX)+'px';
            }else{
                moveSelected.style.width=(event.pageX-oldLeft)+'px';
            }
            if(event.pageY<oldTop){//向上
                moveSelected.style.top=event.pageY+'px';
                moveSelected.style.height=(oldTop-event.pageY)+'px';
            }else{
                moveSelected.style.height=(event.pageY-oldTop)+'px';
            }
            event.preventDefault();  // 阻止默认行为
            event.stopPropagation(); // 阻止事件冒泡
        });
        //鼠标抬起时计算遮罩的right 和 bottom，找出遮罩覆盖的块，关闭拖拽选中开关，清除遮罩数据
        $(&quot;.list&quot;).mouseup(function(event) {
            moveSelected.style.bottom=Number(moveSelected.style.top.split('px')[0])+Number(moveSelected.style.height.split('px')[0]) + 'px';
            moveSelected.style.right=Number(moveSelected.style.left.split('px')[0])+Number(moveSelected.style.width.split('px')[0])+'px';
            findSelected();
            flag=false;
            clearDragData();
            event.preventDefault();  // 阻止默认行为
            event.stopPropagation(); // 阻止事件冒泡
        });
        $(&quot;.list&quot;).mouseleave(function(event) {
            flag=false;
            moveSelected.style.width=0;
            moveSelected.style.height=0;
            moveSelected.style.top=0;
            moveSelected.style.left=0;
            event.preventDefault();  // 阻止默认行为
            event.stopPropagation(); // 阻止事件冒泡
        });
        function findSelected(){
            let blockList=$('.list').find('li');
            for(let i=0;i<blockList.length;i++){
                //计算每个块的定位信息
                let left=$(blockList[i]).offset().left;
                let right=$(blockList[i]).width()+left;
                let top=$(blockList[i]).offset().top;
                let bottom=$(blockList[i]).height()+top;
                //判断每个块是否被遮罩盖住（即选中）
                let leftFlag=moveSelected.style.left.split('px')[0]<=left &amp;&amp; left<=moveSelected.style.right.split('px')[0];
                let rightFlag=moveSelected.style.left.split('px')[0]<=right &amp;&amp; right<=moveSelected.style.right.split('px')[0];
                let topFlag=moveSelected.style.top.split('px')[0]<=top &amp;&amp; top<=moveSelected.style.bottom.split('px')[0];
                let bottomFlag=moveSelected.style.top.split('px')[0]<=bottom &amp;&amp; bottom<=moveSelected.style.bottom.split('px')[0];
                if((leftFlag || rightFlag) &amp;&amp; (topFlag || bottomFlag)){
                    selectedList.push(blockList[i]);
                    $(blockList[i]).addClass('selected');
                }
            }
            console.log(selectedList);
        }
        function clearDragData(){
            moveSelected.style.width=0;
            moveSelected.style.height=0;
            moveSelected.style.top=0;
            moveSelected.style.left=0;
            moveSelected.style.bottom=0;
            moveSelected.style.right=0;
        }
    });
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>鼠标拖拽多选功能<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/jquery/1.10.2/jquery.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="css">
        *{
            <span class="hljs-attribute">box-sizing</span>:border-box;
        }
        <span class="hljs-selector-tag">ul</span>{
            <span class="hljs-attribute">width</span>:<span class="hljs-number">500px</span>;
            <span class="hljs-attribute">height</span>:auto;
            <span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span>;
            <span class="hljs-attribute">padding</span>:<span class="hljs-number">20px</span>;
            <span class="hljs-attribute">font-size</span>: <span class="hljs-number">0</span>;
            <span class="hljs-comment">/*需设置定位*/</span>
            <span class="hljs-attribute">position</span>:relative;
        }
        <span class="hljs-selector-tag">li</span>{
            <span class="hljs-attribute">width</span>:<span class="hljs-number">70px</span>;
            <span class="hljs-attribute">height</span>:<span class="hljs-number">70px</span>;
            <span class="hljs-attribute">margin</span>:<span class="hljs-number">10px</span>;
            <span class="hljs-attribute">padding</span>:<span class="hljs-number">0</span>;
            <span class="hljs-attribute">display</span>:inline-block;
            <span class="hljs-attribute">vertical-align</span>: top;
            <span class="hljs-attribute">font-size</span>: <span class="hljs-number">13px</span>;
            <span class="hljs-attribute">border</span>:<span class="hljs-number">1px</span> solid <span class="hljs-number">#d9d9d9</span>;
        }
        <span class="hljs-selector-id">#moveSelected</span>{
            <span class="hljs-attribute">position</span>:absolute;
            <span class="hljs-attribute">background-color</span>: blue;
            <span class="hljs-attribute">opacity</span>:<span class="hljs-number">0.3</span>;
            <span class="hljs-attribute">border</span>:<span class="hljs-number">1px</span> dashed <span class="hljs-number">#d9d9d9</span>;
            <span class="hljs-attribute">top</span>:<span class="hljs-number">0</span>;
            <span class="hljs-attribute">left</span>:<span class="hljs-number">0</span>;
        }
        <span class="hljs-selector-class">.selected</span>{
            <span class="hljs-attribute">background-color</span>: pink;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"list"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>1<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>2<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>3<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>4<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>5<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>6<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>7<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>8<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>9<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>10<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>11<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>12<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>13<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>14<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>15<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>16<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>17<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>18<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>19<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>20<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>21<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>22<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- 鼠标拖拽出的遮罩 （定位为  position:absolute）--&gt;</span>
        <span class="hljs-comment">&lt;!-- 遮罩最好是在绑定了mouseover事件的元素内部，并且不要阻止遮罩的冒泡事件。这样鼠标移到了遮罩上面，依然可以利用冒泡执行父元素的mouseover事件，就不会出现遮罩只能扩大，不能缩小的情况了（亲自试过） --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"moveSelected"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
    $(<span class="hljs-built_in">document</span>).ready(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">let</span> moveSelected=$(<span class="hljs-string">'#moveSelected'</span>)[<span class="hljs-number">0</span>];
        <span class="hljs-keyword">let</span> flag=<span class="hljs-literal">false</span>;<span class="hljs-comment">//是搜开启拖拽的标志</span>
        <span class="hljs-keyword">let</span> oldLeft=<span class="hljs-number">0</span>;<span class="hljs-comment">//鼠标按下时的left,top</span>
        <span class="hljs-keyword">let</span> oldTop=<span class="hljs-number">0</span>;
        <span class="hljs-keyword">let</span> selectedList=[];<span class="hljs-comment">//拖拽多选选中的块集合</span>

        <span class="hljs-comment">// 鼠标按下时开启拖拽多选，将遮罩定位并展现</span>
        $(<span class="hljs-string">".list"</span>).mousedown(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{
            flag=<span class="hljs-literal">true</span>;
            moveSelected.style.top=event.pageY+<span class="hljs-string">'px'</span>;
            moveSelected.style.left=event.pageX+<span class="hljs-string">'px'</span>;
            oldLeft=event.pageX;
            oldTop=event.pageY;
            event.preventDefault();  <span class="hljs-comment">// 阻止默认行为</span>
            event.stopPropagation(); <span class="hljs-comment">// 阻止事件冒泡</span>
        });
        <span class="hljs-comment">// 鼠标移动时计算遮罩的位置，宽 高</span>
        $(<span class="hljs-string">".list"</span>).mousemove(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{
            <span class="hljs-keyword">if</span>(!flag) <span class="hljs-keyword">return</span>;<span class="hljs-comment">//只有开启了拖拽，才进行mouseover操作</span>
            <span class="hljs-keyword">if</span>(event.pageX&lt;oldLeft){<span class="hljs-comment">//向左拖</span>
                moveSelected.style.left=event.pageX+<span class="hljs-string">'px'</span>;
                moveSelected.style.width=(oldLeft-event.pageX)+<span class="hljs-string">'px'</span>;
            }<span class="hljs-keyword">else</span>{
                moveSelected.style.width=(event.pageX-oldLeft)+<span class="hljs-string">'px'</span>;
            }
            <span class="hljs-keyword">if</span>(event.pageY&lt;oldTop){<span class="hljs-comment">//向上</span>
                moveSelected.style.top=event.pageY+<span class="hljs-string">'px'</span>;
                moveSelected.style.height=(oldTop-event.pageY)+<span class="hljs-string">'px'</span>;
            }<span class="hljs-keyword">else</span>{
                moveSelected.style.height=(event.pageY-oldTop)+<span class="hljs-string">'px'</span>;
            }
            event.preventDefault();  <span class="hljs-comment">// 阻止默认行为</span>
            event.stopPropagation(); <span class="hljs-comment">// 阻止事件冒泡</span>
        });
        <span class="hljs-comment">//鼠标抬起时计算遮罩的right 和 bottom，找出遮罩覆盖的块，关闭拖拽选中开关，清除遮罩数据</span>
        $(<span class="hljs-string">".list"</span>).mouseup(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{
            moveSelected.style.bottom=<span class="hljs-built_in">Number</span>(moveSelected.style.top.split(<span class="hljs-string">'px'</span>)[<span class="hljs-number">0</span>])+<span class="hljs-built_in">Number</span>(moveSelected.style.height.split(<span class="hljs-string">'px'</span>)[<span class="hljs-number">0</span>]) + <span class="hljs-string">'px'</span>;
            moveSelected.style.right=<span class="hljs-built_in">Number</span>(moveSelected.style.left.split(<span class="hljs-string">'px'</span>)[<span class="hljs-number">0</span>])+<span class="hljs-built_in">Number</span>(moveSelected.style.width.split(<span class="hljs-string">'px'</span>)[<span class="hljs-number">0</span>])+<span class="hljs-string">'px'</span>;
            findSelected();
            flag=<span class="hljs-literal">false</span>;
            clearDragData();
            event.preventDefault();  <span class="hljs-comment">// 阻止默认行为</span>
            event.stopPropagation(); <span class="hljs-comment">// 阻止事件冒泡</span>
        });
        $(<span class="hljs-string">".list"</span>).mouseleave(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{
            flag=<span class="hljs-literal">false</span>;
            moveSelected.style.width=<span class="hljs-number">0</span>;
            moveSelected.style.height=<span class="hljs-number">0</span>;
            moveSelected.style.top=<span class="hljs-number">0</span>;
            moveSelected.style.left=<span class="hljs-number">0</span>;
            event.preventDefault();  <span class="hljs-comment">// 阻止默认行为</span>
            event.stopPropagation(); <span class="hljs-comment">// 阻止事件冒泡</span>
        });
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">findSelected</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-keyword">let</span> blockList=$(<span class="hljs-string">'.list'</span>).find(<span class="hljs-string">'li'</span>);
            <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;blockList.length;i++){
                <span class="hljs-comment">//计算每个块的定位信息</span>
                <span class="hljs-keyword">let</span> left=$(blockList[i]).offset().left;
                <span class="hljs-keyword">let</span> right=$(blockList[i]).width()+left;
                <span class="hljs-keyword">let</span> top=$(blockList[i]).offset().top;
                <span class="hljs-keyword">let</span> bottom=$(blockList[i]).height()+top;
                <span class="hljs-comment">//判断每个块是否被遮罩盖住（即选中）</span>
                <span class="hljs-keyword">let</span> leftFlag=moveSelected.style.left.split(<span class="hljs-string">'px'</span>)[<span class="hljs-number">0</span>]&lt;=left &amp;&amp; left&lt;=moveSelected.style.right.split(<span class="hljs-string">'px'</span>)[<span class="hljs-number">0</span>];
                <span class="hljs-keyword">let</span> rightFlag=moveSelected.style.left.split(<span class="hljs-string">'px'</span>)[<span class="hljs-number">0</span>]&lt;=right &amp;&amp; right&lt;=moveSelected.style.right.split(<span class="hljs-string">'px'</span>)[<span class="hljs-number">0</span>];
                <span class="hljs-keyword">let</span> topFlag=moveSelected.style.top.split(<span class="hljs-string">'px'</span>)[<span class="hljs-number">0</span>]&lt;=top &amp;&amp; top&lt;=moveSelected.style.bottom.split(<span class="hljs-string">'px'</span>)[<span class="hljs-number">0</span>];
                <span class="hljs-keyword">let</span> bottomFlag=moveSelected.style.top.split(<span class="hljs-string">'px'</span>)[<span class="hljs-number">0</span>]&lt;=bottom &amp;&amp; bottom&lt;=moveSelected.style.bottom.split(<span class="hljs-string">'px'</span>)[<span class="hljs-number">0</span>];
                <span class="hljs-keyword">if</span>((leftFlag || rightFlag) &amp;&amp; (topFlag || bottomFlag)){
                    selectedList.push(blockList[i]);
                    $(blockList[i]).addClass(<span class="hljs-string">'selected'</span>);
                }
            }
            <span class="hljs-built_in">console</span>.log(selectedList);
        }
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">clearDragData</span>(<span class="hljs-params"></span>)</span>{
            moveSelected.style.width=<span class="hljs-number">0</span>;
            moveSelected.style.height=<span class="hljs-number">0</span>;
            moveSelected.style.top=<span class="hljs-number">0</span>;
            moveSelected.style.left=<span class="hljs-number">0</span>;
            moveSelected.style.bottom=<span class="hljs-number">0</span>;
            moveSelected.style.right=<span class="hljs-number">0</span>;
        }
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
js实现鼠标拖拽多选功能

## 原文链接
[https://segmentfault.com/a/1190000010430655](https://segmentfault.com/a/1190000010430655)

