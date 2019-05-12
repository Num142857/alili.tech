---
title: '原生js实现在表格用鼠标框选并有反选功能' 
date: 2018-12-15 2:30:11
hidden: true
slug: yfw1b0q65c
categories: [reprint]
---

{{< raw >}}

                    
<p>今天应同学要求，需要写一个像Excel那样框选高亮，并且实现框选区域实现反选功能。要我用原生js写，由于没什么经验翻阅了很多资料，第一次写文章希望各位指出不足！！</p>
<p><strong>上来先建表</strong></p>
<hr>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;table-container&quot; >
    <table class=&quot;table&quot; id=&quot;dataGrid&quot; align=&quot;center&quot;>
        <tr id=&quot;title&quot;>
            <th>&amp;nbsp;</th>
            <th>水果</th>
            <th>蔬菜</th>
        </tr>
        <tr id=&quot;tb1&quot; class=&quot;fileDiv&quot;>
            <td><input type=&quot;checkbox&quot; name=&quot;idarray&quot; value=&quot;1&quot;/></td>
            <td>苹果</td>
            <td>菠菜</td>
        </tr>
        <tr id=&quot;tb2&quot; class=&quot;fileDiv&quot;>
            <td><input type=&quot;checkbox&quot; name=&quot;idarray&quot; value=&quot;2&quot;/></td>
            <td>梨</td>
            <td>白菜</td>
        </tr>
        <tr id=&quot;tb3&quot; class=&quot;fileDiv&quot;>
            <td><input type=&quot;checkbox&quot; name=&quot;idarray&quot; value=&quot;3&quot;/></td>
            <td>葡萄</td>
            <td>萝卜</td>
        </tr>
        <tr id=&quot;tb4&quot; class=&quot;fileDiv&quot;>
            <td><input type=&quot;checkbox&quot; name=&quot;idarray&quot; value=&quot;4&quot;/></td>
            <td>桃子</td>
            <td>土豆</td>
        </tr>
        <tr id=&quot;tb5&quot; class=&quot;fileDiv&quot;>
            <td><input type=&quot;checkbox&quot; name=&quot;idarray&quot; value=&quot;5&quot;/></td>
            <td>苹果</td>
            <td>菠菜</td>
        </tr>
        以下省略十行……
    </table>
</div>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"table-container"</span> &gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">table</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"table"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"dataGrid"</span> <span class="hljs-attr">align</span>=<span class="hljs-string">"center"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">tr</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"title"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>&amp;nbsp;<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>水果<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>蔬菜<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">tr</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"tb1"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fileDiv"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"idarray"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"1"</span>/&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>苹果<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>菠菜<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">tr</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"tb2"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fileDiv"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"idarray"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"2"</span>/&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>梨<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>白菜<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">tr</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"tb3"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fileDiv"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"idarray"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"3"</span>/&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>葡萄<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>萝卜<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">tr</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"tb4"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fileDiv"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"idarray"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"4"</span>/&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>桃子<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>土豆<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">tr</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"tb5"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fileDiv"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"idarray"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"5"</span>/&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>苹果<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>菠菜<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
        以下省略十行……
    <span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
<p><strong><em>样式</em></strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style>
        body {  padding: 0;  margin: 0;  overflow-y: hidden;  }
        .table {  width: 990px;  height: 850px;  }
        .table tr {  height: 50px;  overflow: scroll  }
        .table-container {
            position: absolute;
            top: 0;
            left: 200px;
            height: 750px;
            width: 990px;
            overflow-y: scroll;
            overflow-x: hidden;
        }
         #title {  background-color: #BDE4F4;  }
        .fileDiv {  background-color:#FEFF89; }
        .seled {  border: 1px solid red;  background-color: #D6DFF7;  }
    </style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        <span class="hljs-selector-tag">body</span> {  <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;  <span class="hljs-attribute">overflow-y</span>: hidden;  }
        <span class="hljs-selector-class">.table</span> {  <span class="hljs-attribute">width</span>: <span class="hljs-number">990px</span>;  <span class="hljs-attribute">height</span>: <span class="hljs-number">850px</span>;  }
        <span class="hljs-selector-class">.table</span> <span class="hljs-selector-tag">tr</span> {  <span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>;  <span class="hljs-attribute">overflow</span>: scroll  }
        <span class="hljs-selector-class">.table-container</span> {
            <span class="hljs-attribute">position</span>: absolute;
            <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">left</span>: <span class="hljs-number">200px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">750px</span>;
            <span class="hljs-attribute">width</span>: <span class="hljs-number">990px</span>;
            <span class="hljs-attribute">overflow-y</span>: scroll;
            <span class="hljs-attribute">overflow-x</span>: hidden;
        }
         <span class="hljs-selector-id">#title</span> {  <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#BDE4F4</span>;  }
        <span class="hljs-selector-class">.fileDiv</span> {  <span class="hljs-attribute">background-color</span>:<span class="hljs-number">#FEFF89</span>; }
        <span class="hljs-selector-class">.seled</span> {  <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid red;  <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#D6DFF7</span>;  }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<hr>
<p><strong><em>效果</em></strong><br><span class="img-wrap"><img data-src="/img/remote/1460000013073586" src="https://static.alili.tech/img/remote/1460000013073586" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<hr>
<h2 id="articleHeader0">重头戏js部分开始</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/javascript&quot;>
        var allpro2 = [];
        var index = 0;

        window.onload = function () {
            document.onmousedown = function () {
                var evt = window.event || arguments[0];

                var startX = (evt.x || evt.clientX);
                var startY = (evt.y || evt.clientY);

                if (startX > 220 &amp;&amp; startX < 1210) {
                    var selList = [];
                    var fileNodes = document.getElementsByTagName(&quot;tr&quot;);
                    for (var i = 0; i < fileNodes.length; i++) {
                        if (fileNodes[i].className.indexOf(&quot;fileDiv&quot;) != -1) {
                            fileNodes[i].className = &quot;fileDiv&quot;;
                            selList.push(fileNodes[i]);
                        }
                    }
                    allpro2 = [];       //选错区域后重选则清空数组
                    var yheight = document.getElementById(&quot;tablewrapper&quot;);
                    if (yheight.scrollTop > 0) {      //判断初始滚动条是否为0 为后面是否加滚动条高度设置判断值
                        var istrue = true;
                    }
                    paint(yheight, selList, startX, startY, istrue);

                }
            }
        };


        function paint(yheight, selList, startX, startY, istrue) {
            var isSelect = true;
            var selDiv = document.createElement(&quot;div&quot;);
            selDiv.style.cssText = &quot;position:absolute;width:0px;height:0px;font-size:0px;margin:0px;padding:0px;border:1px dashed #0099FF;background-color:#C3D5ED;z-index:1000;filter:alpha(opacity:60);opacity:0.6;display:none;&quot;;
            selDiv.id = &quot;selectDiv&quot;;
            document.body.appendChild(selDiv);

            selDiv.style.left = startX + &quot;px&quot;;
            selDiv.style.top = startY + &quot;px&quot;;

            var _x = null;
            var _y = null;


            document.onmousemove = function () {
                evt = window.event || arguments[0];
                if (isSelect) {
                    if (selDiv.style.display == &quot;none&quot;) {
                        selDiv.style.display = &quot;&quot;;
                    }

                    _x = (evt.x || evt.clientX);
                    _y = (evt.y || evt.clientY);

                    selDiv.style.left = Math.min(_x, startX) + &quot;px&quot;;
                    selDiv.style.top = Math.min(_y, startY) + &quot;px&quot;;
                    selDiv.style.width = Math.abs(_x - startX) + &quot;px&quot;;
                    selDiv.style.height = Math.abs(_y - startY) + &quot;px&quot;;
                }
            };


            document.onmouseup = function () {
                if (selDiv) {
                    if (istrue) {
                        selDiv.style.height = Math.abs(_y - startY) + &quot;px&quot;;
                        selDiv.style.top = Math.min(_y, startY) + yheight.scrollTop + &quot;px&quot;;
                    } else {
                        selDiv.style.height = Math.abs(_y - startY) + yheight.scrollTop + &quot;px&quot;;
                    }
                    var _l = selDiv.offsetLeft, _t = selDiv.offsetTop;
                    var _w = selDiv.offsetWidth, _h = selDiv.offsetHeight;
                    for (var i = 0; i < selList.length; i++) {
                        var sl = selList[i].offsetWidth + selList[i].offsetParent.offsetParent.offsetLeft; //获取父元素table距离左边距离
                        var st = selList[i].offsetHeight + selList[i].offsetTop;

                        if (sl > _l &amp;&amp; st > _t &amp;&amp; selList[i].offsetLeft < _l + _w &amp;&amp; selList[i].offsetTop < _t + _h) {
                            if (selList[i].className.indexOf(&quot;seled&quot;) == -1) {
                                selList[i].className = selList[i].className + &quot; seled&quot;;
                            }
                        } else {
                            if (selList[i].className.indexOf(&quot;seled&quot;) != -1) {
                                selList[i].className = &quot;fileDiv&quot;;
                            }
                        }
                    }
                }

                isSelect = false;
                if (selDiv) {
                    document.body.removeChild(selDiv);
                    showSelDiv(selList);
                }
                revs1();
                selList = null, _x = null, _y = null, selDiv = null, startX = null, startY = null, evt = null;
            }
        }

        function showSelDiv(arr) {         //确定选中范围更新数组allpro2
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].className.indexOf(&quot;seled&quot;) != -1) {
                    var allpro1 = document.getElementById(arr[i].id).getElementsByTagName(&quot;td&quot;)[0].getElementsByTagName(&quot;input&quot;)[0];
                    allpro2.push(allpro1);
                }
            }
        }


        function revs1() {        //反选函数
            if (allpro2.length > 0) {
                for (var i = 0; i < allpro2.length; i++) {
                    if (allpro2[i].type == &quot;checkbox&quot; &amp;&amp; allpro2[i].checked == true) {
                        allpro2[i].checked = false;
                    } else if (allpro2[i].type == &quot;checkbox&quot; &amp;&amp; allpro2[i].checked == false) {
                        allpro2[i].checked = true;
                    }
                }
            }
            allpro2 = [];
        }
    </script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">var</span> allpro2 = [];
        <span class="hljs-keyword">var</span> index = <span class="hljs-number">0</span>;

        <span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">document</span>.onmousedown = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                <span class="hljs-keyword">var</span> evt = <span class="hljs-built_in">window</span>.event || <span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>];

                <span class="hljs-keyword">var</span> startX = (evt.x || evt.clientX);
                <span class="hljs-keyword">var</span> startY = (evt.y || evt.clientY);

                <span class="hljs-keyword">if</span> (startX &gt; <span class="hljs-number">220</span> &amp;&amp; startX &lt; <span class="hljs-number">1210</span>) {
                    <span class="hljs-keyword">var</span> selList = [];
                    <span class="hljs-keyword">var</span> fileNodes = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">"tr"</span>);
                    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; fileNodes.length; i++) {
                        <span class="hljs-keyword">if</span> (fileNodes[i].className.indexOf(<span class="hljs-string">"fileDiv"</span>) != <span class="hljs-number">-1</span>) {
                            fileNodes[i].className = <span class="hljs-string">"fileDiv"</span>;
                            selList.push(fileNodes[i]);
                        }
                    }
                    allpro2 = [];       <span class="hljs-comment">//选错区域后重选则清空数组</span>
                    <span class="hljs-keyword">var</span> yheight = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"tablewrapper"</span>);
                    <span class="hljs-keyword">if</span> (yheight.scrollTop &gt; <span class="hljs-number">0</span>) {      <span class="hljs-comment">//判断初始滚动条是否为0 为后面是否加滚动条高度设置判断值</span>
                        <span class="hljs-keyword">var</span> istrue = <span class="hljs-literal">true</span>;
                    }
                    paint(yheight, selList, startX, startY, istrue);

                }
            }
        };


        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">paint</span>(<span class="hljs-params">yheight, selList, startX, startY, istrue</span>) </span>{
            <span class="hljs-keyword">var</span> isSelect = <span class="hljs-literal">true</span>;
            <span class="hljs-keyword">var</span> selDiv = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"div"</span>);
            selDiv.style.cssText = <span class="hljs-string">"position:absolute;width:0px;height:0px;font-size:0px;margin:0px;padding:0px;border:1px dashed #0099FF;background-color:#C3D5ED;z-index:1000;filter:alpha(opacity:60);opacity:0.6;display:none;"</span>;
            selDiv.id = <span class="hljs-string">"selectDiv"</span>;
            <span class="hljs-built_in">document</span>.body.appendChild(selDiv);

            selDiv.style.left = startX + <span class="hljs-string">"px"</span>;
            selDiv.style.top = startY + <span class="hljs-string">"px"</span>;

            <span class="hljs-keyword">var</span> _x = <span class="hljs-literal">null</span>;
            <span class="hljs-keyword">var</span> _y = <span class="hljs-literal">null</span>;


            <span class="hljs-built_in">document</span>.onmousemove = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                evt = <span class="hljs-built_in">window</span>.event || <span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>];
                <span class="hljs-keyword">if</span> (isSelect) {
                    <span class="hljs-keyword">if</span> (selDiv.style.display == <span class="hljs-string">"none"</span>) {
                        selDiv.style.display = <span class="hljs-string">""</span>;
                    }

                    _x = (evt.x || evt.clientX);
                    _y = (evt.y || evt.clientY);

                    selDiv.style.left = <span class="hljs-built_in">Math</span>.min(_x, startX) + <span class="hljs-string">"px"</span>;
                    selDiv.style.top = <span class="hljs-built_in">Math</span>.min(_y, startY) + <span class="hljs-string">"px"</span>;
                    selDiv.style.width = <span class="hljs-built_in">Math</span>.abs(_x - startX) + <span class="hljs-string">"px"</span>;
                    selDiv.style.height = <span class="hljs-built_in">Math</span>.abs(_y - startY) + <span class="hljs-string">"px"</span>;
                }
            };


            <span class="hljs-built_in">document</span>.onmouseup = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                <span class="hljs-keyword">if</span> (selDiv) {
                    <span class="hljs-keyword">if</span> (istrue) {
                        selDiv.style.height = <span class="hljs-built_in">Math</span>.abs(_y - startY) + <span class="hljs-string">"px"</span>;
                        selDiv.style.top = <span class="hljs-built_in">Math</span>.min(_y, startY) + yheight.scrollTop + <span class="hljs-string">"px"</span>;
                    } <span class="hljs-keyword">else</span> {
                        selDiv.style.height = <span class="hljs-built_in">Math</span>.abs(_y - startY) + yheight.scrollTop + <span class="hljs-string">"px"</span>;
                    }
                    <span class="hljs-keyword">var</span> _l = selDiv.offsetLeft, _t = selDiv.offsetTop;
                    <span class="hljs-keyword">var</span> _w = selDiv.offsetWidth, _h = selDiv.offsetHeight;
                    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; selList.length; i++) {
                        <span class="hljs-keyword">var</span> sl = selList[i].offsetWidth + selList[i].offsetParent.offsetParent.offsetLeft; <span class="hljs-comment">//获取父元素table距离左边距离</span>
                        <span class="hljs-keyword">var</span> st = selList[i].offsetHeight + selList[i].offsetTop;

                        <span class="hljs-keyword">if</span> (sl &gt; _l &amp;&amp; st &gt; _t &amp;&amp; selList[i].offsetLeft &lt; _l + _w &amp;&amp; selList[i].offsetTop &lt; _t + _h) {
                            <span class="hljs-keyword">if</span> (selList[i].className.indexOf(<span class="hljs-string">"seled"</span>) == <span class="hljs-number">-1</span>) {
                                selList[i].className = selList[i].className + <span class="hljs-string">" seled"</span>;
                            }
                        } <span class="hljs-keyword">else</span> {
                            <span class="hljs-keyword">if</span> (selList[i].className.indexOf(<span class="hljs-string">"seled"</span>) != <span class="hljs-number">-1</span>) {
                                selList[i].className = <span class="hljs-string">"fileDiv"</span>;
                            }
                        }
                    }
                }

                isSelect = <span class="hljs-literal">false</span>;
                <span class="hljs-keyword">if</span> (selDiv) {
                    <span class="hljs-built_in">document</span>.body.removeChild(selDiv);
                    showSelDiv(selList);
                }
                revs1();
                selList = <span class="hljs-literal">null</span>, _x = <span class="hljs-literal">null</span>, _y = <span class="hljs-literal">null</span>, selDiv = <span class="hljs-literal">null</span>, startX = <span class="hljs-literal">null</span>, startY = <span class="hljs-literal">null</span>, evt = <span class="hljs-literal">null</span>;
            }
        }

        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">showSelDiv</span>(<span class="hljs-params">arr</span>) </span>{         <span class="hljs-comment">//确定选中范围更新数组allpro2</span>
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; arr.length; i++) {
                <span class="hljs-keyword">if</span> (arr[i].className.indexOf(<span class="hljs-string">"seled"</span>) != <span class="hljs-number">-1</span>) {
                    <span class="hljs-keyword">var</span> allpro1 = <span class="hljs-built_in">document</span>.getElementById(arr[i].id).getElementsByTagName(<span class="hljs-string">"td"</span>)[<span class="hljs-number">0</span>].getElementsByTagName(<span class="hljs-string">"input"</span>)[<span class="hljs-number">0</span>];
                    allpro2.push(allpro1);
                }
            }
        }


        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">revs1</span>(<span class="hljs-params"></span>) </span>{        <span class="hljs-comment">//反选函数</span>
            <span class="hljs-keyword">if</span> (allpro2.length &gt; <span class="hljs-number">0</span>) {
                <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; allpro2.length; i++) {
                    <span class="hljs-keyword">if</span> (allpro2[i].type == <span class="hljs-string">"checkbox"</span> &amp;&amp; allpro2[i].checked == <span class="hljs-literal">true</span>) {
                        allpro2[i].checked = <span class="hljs-literal">false</span>;
                    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (allpro2[i].type == <span class="hljs-string">"checkbox"</span> &amp;&amp; allpro2[i].checked == <span class="hljs-literal">false</span>) {
                        allpro2[i].checked = <span class="hljs-literal">true</span>;
                    }
                }
            }
            allpro2 = [];
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013073587" src="https://static.alili.tech/img/remote/1460000013073587" alt="效果动态图.gif" title="效果动态图.gif" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
原生js实现在表格用鼠标框选并有反选功能

## 原文链接
[https://segmentfault.com/a/1190000013073583](https://segmentfault.com/a/1190000013073583)

