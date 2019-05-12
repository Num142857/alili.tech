---
title: 'JavaScript中的各种宽高属性' 
date: 2019-01-31 2:31:16
hidden: true
slug: yh2lq30d0x
categories: [reprint]
---

{{< raw >}}

                    
<p>在js中，存在着N多的关于高度和宽度的属性，比如：clientHeight、offsetHeight、scrollHeight、availHeight、scrollLeft、scrollTop、style.height、innerHeight、outerHeight、scree.height等等......这么多，傻傻分不清也正常啊。<br>本文的目标：</p>
<ol>
<li><p>理清js及jquery的各种width和height</p></li>
<li><p>对width和高度做一些实际的应用</p></li>
</ol>
<h2 id="articleHeader0">window和document</h2>
<p>首先我们来高清两个概念：</p>
<ol>
<li><p>window和document的区别是什么？</p></li>
<li><p>window.location和document.location是一样吗？</p></li>
</ol>
<p>第一个问题：</p>
<ul>
<li><p>Window对象表示浏览器中打开的<strong>窗口</strong>；window对象<strong>可以省略</strong>。比如alert()、window.alert()。</p></li>
<li><p>Document对象是Window对象的<strong>一部分</strong>。那么<code>document.body</code> 我们可以写成<code>window.document.body</code>；浏览器的<strong>HTML文档</strong>成为Document对象。</p></li>
</ul>
<p>第二问题：<br>window对象的location属性引用的是Location对象，表示该窗口中当前显示文档的URL。<br>document的对象的location属性也是引用了Location对象。<br>那意思是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.location === document.location;  //true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code style="word-break: break-word; white-space: initial;">window.<span class="hljs-keyword">location</span> <span class="hljs-title">=== document</span>.location;  //<span class="hljs-literal">true</span></code></pre>
<p>在通常情况下一样，frame也是一样</p>
<h2 id="articleHeader1">与window相关的宽高介绍</h2>
<p>与window相关的宽高有一下几个：</p>
<ol>
<li><p>window.innerWidth，通过字面意思我们知道这是一个内部的宽度</p></li>
<li><p>window.innerHeight，内部的高度</p></li>
<li><p>window.outWidth，外部的宽度</p></li>
<li><p>window.outHeight，外部的高度</p></li>
</ol>
<h3 id="articleHeader2">window.innerHeight和window.outHeight</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007515037?w=959&amp;h=540" src="https://static.alili.tech/img/remote/1460000007515037?w=959&amp;h=540" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>我发现在Windows 10下Chrome和360安全浏览器不一样、、、、（后面代码测试部分）</p>
<h3 id="articleHeader3">window.innerWidth和window.outWidth</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007515038?w=1096&amp;h=593" src="https://static.alili.tech/img/remote/1460000007515038?w=1096&amp;h=593" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>挂靠在window下的宽高还有window.screen， window.screen包含有关用户<strong>屏幕</strong>的信息。它包括：</p>
<ul>
<li><p>window.screen.width</p></li>
<li><p>window.screen.height</p></li>
<li><p>window.screen.availHeight</p></li>
<li><p>window.screen.availWidth</p></li>
<li><p>window.screenTop</p></li>
<li><p>window.screenLeft</p></li>
</ul>
<h3 id="articleHeader4">图解</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007515039?w=1047&amp;h=588" src="https://static.alili.tech/img/remote/1460000007515039?w=1047&amp;h=588" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000007515040?w=984&amp;h=555" src="https://static.alili.tech/img/remote/1460000007515040?w=984&amp;h=555" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h3 id="articleHeader5">window相关宽高代码演示</h3>
<p>演示代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(&quot;innerWidth=&quot;,innerWidth);
console.log(&quot;innerHeight=&quot;,innerHeight);
console.log(&quot;outerWidth=&quot;,outerWidth);
console.log(&quot;outerHeight=&quot;,outerHeight);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>console.<span class="hljs-built_in">log</span>(<span class="hljs-string">"innerWidth="</span>,innerWidth);
console.<span class="hljs-built_in">log</span>(<span class="hljs-string">"innerHeight="</span>,innerHeight);
console.<span class="hljs-built_in">log</span>(<span class="hljs-string">"outerWidth="</span>,outerWidth);
console.<span class="hljs-built_in">log</span>(<span class="hljs-string">"outerHeight="</span>,outerHeight);</code></pre>
<p>Chrome浏览器下效果<br><span class="img-wrap"><img data-src="/img/remote/1460000007515041?w=1158&amp;h=650" src="https://static.alili.tech/img/remote/1460000007515041?w=1158&amp;h=650" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.info(&quot;screen.width=&quot;,screen.width);
console.info(&quot;screen.height=&quot;,screen.height);
console.info(&quot;screen.availWidth=&quot;,screen.availWidth);
console.info(&quot;screen.availHeight=&quot;,screen.availHeight);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-built_in">console</span>.info(<span class="hljs-string">"screen.width="</span>,screen.width);
<span class="hljs-built_in">console</span>.info(<span class="hljs-string">"screen.height="</span>,screen.height);
<span class="hljs-built_in">console</span>.info(<span class="hljs-string">"screen.availWidth="</span>,screen.availWidth);
<span class="hljs-built_in">console</span>.info(<span class="hljs-string">"screen.availHeight="</span>,screen.availHeight);</code></pre>
<p>在Chrome浏览器下效果<br><span class="img-wrap"><img data-src="/img/remote/1460000007515042?w=1095&amp;h=614" src="https://static.alili.tech/img/remote/1460000007515042?w=1095&amp;h=614" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h3 id="articleHeader6">window相关宽高浏览器兼容问题</h3>
<p>innerHeight和outerHeight是不支持<strong>IE9以下</strong>版本的，而screen系列则不存在兼容问题。</p>
<h2 id="articleHeader7">document下面client相关宽高介绍</h2>
<p>docment下有三类属性：</p>
<ol>
<li><p>与client相关的宽高</p></li>
<li><p>与offset相关的宽高</p></li>
<li><p>与scroll相关的宽高</p></li>
</ol>
<h3 id="articleHeader8">与client相关的宽高</h3>
<p>与client相关的宽高又有如下几个属性：</p>
<ul>
<li><p>document.body.clientWidth</p></li>
<li><p>document.body.clientHeight</p></li>
<li><p>document.body.clientLeft</p></li>
<li><p>document.body.clientTop</p></li>
</ul>
<p><strong>clientWidth和clientHeight</strong><br>该属性指的是元素的可视部分宽度和高度，即<code>padding+contenr</code>。<br>如果没有滚动条，即为元素设定的高度和宽度。<br>如果出现滚动条，滚动条会遮盖元素的宽高，那么该属性就是其本来宽高减去滚动条的宽高。</p>
<p>我们来看如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body{
     border: 20px solid #000;
     margin: 10px;
     padding: 40px;
     background: #eee;
     height: 350px;
     width: 500px;
     overflow: scroll;
}

console.log(document.body.clientHeight);    //430（padding*2+height）
console.log(document.body.clientWidth);     //580（padding*2+width）" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-selector-tag">body</span>{
     <span class="hljs-attribute">border</span>: <span class="hljs-number">20px</span> solid <span class="hljs-number">#000</span>;
     <span class="hljs-attribute">margin</span>: <span class="hljs-number">10px</span>;
     <span class="hljs-attribute">padding</span>: <span class="hljs-number">40px</span>;
     <span class="hljs-attribute">background</span>: <span class="hljs-number">#eee</span>;
     <span class="hljs-attribute">height</span>: <span class="hljs-number">350px</span>;
     <span class="hljs-attribute">width</span>: <span class="hljs-number">500px</span>;
     <span class="hljs-attribute">overflow</span>: scroll;
}

console<span class="hljs-selector-class">.log</span>(document<span class="hljs-selector-class">.body</span><span class="hljs-selector-class">.clientHeight</span>);    <span class="hljs-comment">//430（padding*2+height）</span>
console<span class="hljs-selector-class">.log</span>(document<span class="hljs-selector-class">.body</span><span class="hljs-selector-class">.clientWidth</span>);     <span class="hljs-comment">//580（padding*2+width）</span></code></pre>
<p>我们再看下面的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#mydiv{
      width: 200px;
      height: 200px;
      background: red;
      border: 1px solid #000;
      overflow: auto;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-id">#mydiv</span>{
      <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
      <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
      <span class="hljs-attribute">background</span>: red;
      <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#000</span>;
      <span class="hljs-attribute">overflow</span>: auto;
}</code></pre>
<p>在DIV中添加文字知道出现滚动轴，这时候</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var mydiv = document.getElementById(&quot;mydiv&quot;);
console.log(&quot;mydiv.clientHeight=&quot;,mydiv.clientHeight);    // 200
console.log(&quot;mydiv.clientWidth=&quot;,mydiv.clientWidth);      // 183（减去了滚动条的宽度）" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> mydiv = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"mydiv"</span>);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"mydiv.clientHeight="</span>,mydiv.clientHeight);    <span class="hljs-comment">// 200</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"mydiv.clientWidth="</span>,mydiv.clientWidth);      <span class="hljs-comment">// 183（减去了滚动条的宽度）</span></code></pre>
<p>而在Mac系统下，滚动条不占高度，这时候client的宽度还是200.</p>
<p><strong>总结</strong></p>
<ul>
<li><p>假入无padding无滚动条，clientWidth=style.width</p></li>
<li><p>假如有padding无滚动轴，clientWidth=style.width+style.padding*2</p></li>
<li><p>假如有padding有滚动，且滚动是显示的，clientWidth=style.width+style.padding*2-滚动轴宽度</p></li>
</ul>
<p><strong>clientLeft和clientTop</strong></p>
<p>这两个返回的是元素周围边框的厚度，如果不指定一个边框或者不定位该元素，他的值就是0.</p>
<p>我们还是以body为例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body{
     border: 20px solid #000;
     margin: 10px;
     padding: 40px;
     background: #eee;
     height: 350px;
     width: 500px;
     overflow: scroll;
}

console.log(document.body.clientLeft);    //20
console.log(document.body.clientTop);    //20" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-selector-tag">body</span>{
     <span class="hljs-attribute">border</span>: <span class="hljs-number">20px</span> solid <span class="hljs-number">#000</span>;
     <span class="hljs-attribute">margin</span>: <span class="hljs-number">10px</span>;
     <span class="hljs-attribute">padding</span>: <span class="hljs-number">40px</span>;
     <span class="hljs-attribute">background</span>: <span class="hljs-number">#eee</span>;
     <span class="hljs-attribute">height</span>: <span class="hljs-number">350px</span>;
     <span class="hljs-attribute">width</span>: <span class="hljs-number">500px</span>;
     <span class="hljs-attribute">overflow</span>: scroll;
}

console<span class="hljs-selector-class">.log</span>(document<span class="hljs-selector-class">.body</span><span class="hljs-selector-class">.clientLeft</span>);    <span class="hljs-comment">//20</span>
console<span class="hljs-selector-class">.log</span>(document<span class="hljs-selector-class">.body</span><span class="hljs-selector-class">.clientTop</span>);    <span class="hljs-comment">//20</span></code></pre>
<p>这一对属性是用来读取元素的body的宽度和高度的</p>
<ul>
<li><p>clientTop=border-top的border-width</p></li>
<li><p>clientLeft=border-left的border-width</p></li>
</ul>
<h3 id="articleHeader9">与offset相关宽高介绍</h3>
<p>与offset相关的宽高又有如下几个属性：</p>
<ul>
<li><p>document.body.offsetWidth</p></li>
<li><p>document.body.offsetHeight</p></li>
<li><p>document.offsetLeft</p></li>
<li><p>document.offsetTop</p></li>
</ul>
<p><strong>offsetWidth与offsetHeight</strong><br>这一对属性指的是元素的border+padding+content的宽度和高度。</p>
<p>该属性和其内部的内容是否超出元素大小无关，只和本来设定的border以及width和height有关。<br>我们还是以body为例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body{
     border: 20px solid #000;
     margin: 10px;
     padding: 40px;
     background: #eee;
     height: 350px;
     width: 500px;
     overflow: scroll;
}

console.log(&quot;offsetWidth=&quot;,document.body.offsetWidth); 
//620（width+margin*2+padding*2+border*2）
console.log(&quot;offsetHeight=&quot;,document.body.offsetHeight);    
//470（width+margin*2+padding*2+border*2）" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">body</span>{
     <span class="hljs-attribute">border</span>: <span class="hljs-number">20px</span> solid <span class="hljs-number">#000</span>;
     <span class="hljs-attribute">margin</span>: <span class="hljs-number">10px</span>;
     <span class="hljs-attribute">padding</span>: <span class="hljs-number">40px</span>;
     <span class="hljs-attribute">background</span>: <span class="hljs-number">#eee</span>;
     <span class="hljs-attribute">height</span>: <span class="hljs-number">350px</span>;
     <span class="hljs-attribute">width</span>: <span class="hljs-number">500px</span>;
     <span class="hljs-attribute">overflow</span>: scroll;
}

<span class="hljs-selector-tag">console</span><span class="hljs-selector-class">.log</span>(<span class="hljs-string">"offsetWidth="</span>,document.body.offsetWidth); 
<span class="hljs-comment">//620（width+margin*2+padding*2+border*2）</span>
<span class="hljs-selector-tag">console</span><span class="hljs-selector-class">.log</span>(<span class="hljs-string">"offsetHeight="</span>,document.body.offsetHeight);    
<span class="hljs-comment">//470（width+margin*2+padding*2+border*2）</span></code></pre>
<p><strong>总结</strong></p>
<ul>
<li>
<p>假如无padding无滚动条无border：</p>
<ul><li><p>offsetWidth=clientWidth=style.width</p></li></ul>
</li>
<li>
<p>假如有padding无滚动条有border：</p>
<ul>
<li><p>offsetWidth=style.width+style.padding<em>2+(border-width)</em>2</p></li>
<li><p>offsetWidth=clientWidth+border宽度*2</p></li>
</ul>
</li>
<li>
<p>假如有padding有滚动条，且滚动条是显示的，有border：</p>
<ul>
<li><p>offsetWidth=style.width+style.padding<em>2+(border-width)</em>2</p></li>
<li><p>offsetWidth=clientWidth+滚动条宽度+border宽度*2</p></li>
</ul>
</li>
</ul>
<p><strong>offsetLeft和offsetTop</strong><br>这两个属性是基于<code>offsetParent</code>的，了解这两个属性我们必须先了解它，什么是<code>offsetParent</code>呢？</p>
<ol>
<li><p>如果当前元素的父级元素没有进行CSS定位（position为absolute或relative）,offsetParent为border.</p></li>
<li><p>假如当前元素的父级元素中有CSS定位，offsetParent取最近的那个父级元素。</p></li>
</ol>
<p>在IE6/7中：<br>offsetLeft=(offsetParent的padding-left)+(当前元素的margin-left)</p>
<p>在IE8/9/10及Chrome中：<br>offsetLeft=(offsetParent的margin-left)+(offsetParent的border宽度)+(offsetParentd的padding-left)+(当前元素的margin-left)</p>
<p>在FireFox中：<br>offsetLeft=(offsetParent的margin-left)+(当前元素的margin-left)+(offsetParent的padding-left)</p>
<p>、、、、看到这里是不是已经懵逼了？、、、还是举例子吧：</p>
<p>CSS:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body{
    border: 20px solid #000;
    margin: 10px;
    padding: 40px;
    background: #eee;
    height: 350px;
    width: 500px;
}
#mydiv{
    width: 400px;
    height: 200px;
    padding: 20px;
    margin :10px;
    background: #f60;
    border: 20px solid #888;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">body</span>{
    <span class="hljs-attribute">border</span>: <span class="hljs-number">20px</span> solid <span class="hljs-number">#000</span>;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">40px</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#eee</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">350px</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">500px</span>;
}
<span class="hljs-selector-id">#mydiv</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">400px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">margin </span>:<span class="hljs-number">10px</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#f60</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">20px</span> solid <span class="hljs-number">#888</span>;
}</code></pre>
<p>在IE8/910及Chrome中<br>mydiv.offsetLeft = 80<br>mydiv.offsetTop = 80</p>
<p>在火狐中<br>mydiv.offsetLeft = 60<br>mydiv.offsetTop = 60</p>
<p>在IE低版本IE6/7中是<br>mydiv.offsetLeft = 50<br>mydiv.offsetTop = 50</p>
<h3 id="articleHeader10">与scroll相关宽高介绍</h3>
<p>与scroll相关的宽高属性有如下几个：</p>
<ul>
<li><p>document.body.scrollWidth</p></li>
<li><p>document.body.scrollHeight</p></li>
<li><p>document.body.scrollLeft</p></li>
<li><p>document.body.scrollTop</p></li>
</ul>
<p><strong>scrollWidth和scrollHeight</strong><br>document.body的scrollWidth和scrollHeight与div的scrollWidth和scrollHeight是有区别的。</p>
<p>我们先来看看document.body的scrollWidth和scrollHeight：</p>
<ol>
<li>
<p>给定宽高小于浏览器窗口</p>
<ul>
<li><p>scrollWidth通常是浏览器窗口的宽度</p></li>
<li><p>scrollHeight通常是浏览器窗口的高度</p></li>
</ul>
</li>
<li>
<p>给定宽高大于浏览器窗口，且内容小于给定宽高</p>
<ul>
<li><p>scrollWidth给定的宽度+其所有padding、margin和border</p></li>
<li><p>scrollHeight给定的高度+其所有的padding、margin和border</p></li>
</ul>
</li>
<li>
<p>给定宽高大于浏览器窗口，且内容大于给定宽高</p>
<ul>
<li><p>scrollWidth内容宽度+其所有的padding、margin和border</p></li>
<li><p>scrollHeight内容高度+其所有的padding、margin和border</p></li>
</ul>
</li>
</ol>
<p>再来看看在某div中scrollWidth和scrollHeight：</p>
<ul><li><p>在无滚动轴的时候<br><span class="img-wrap"><img data-src="/img/remote/1460000007515043?w=565&amp;h=291" src="https://static.alili.tech/img/remote/1460000007515043?w=565&amp;h=291" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p></li></ul>
<p>scrollWidth==clientWidth=style.width+style.padding*2</p>
<ul><li><p>在有滚动轴的时候<br><span class="img-wrap"><img data-src="/img/remote/1460000007515044?w=539&amp;h=316" src="https://static.alili.tech/img/remote/1460000007515044?w=539&amp;h=316" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p></li></ul>
<p>scrollWidth==实际内容的宽度+padding*2<br>scrollHeight==实际内容的高度+padding*2</p>
<p><strong>scrollLeft和scrollTop</strong><br>这对属性是<strong>可读写（可被重新赋值）</strong> 的，指的是当元素其中的内容超出其宽高的时候，元素被卷起来的高和宽度。<br><strong>obj.style.width和obj.style.height</strong><br>对于一个dom元素，它的style属性返回的是一个对象，这个对象中的任意一个属性是可读写的，style.width等于CSS属性中的宽度style.height等于CSS属性中的高度。</p>
<h2 id="articleHeader11">Event对象的5种坐标</h2>
<p>哪五种坐标？</p>
<ol>
<li><p>clientX和clientY，相对于浏览器（可是区左上角0,0）的坐标</p></li>
<li><p>screenX和screenY，相对于设备屏幕左上角（0,0）的坐标</p></li>
<li><p>offsetX和offsetY，相对于事件源左上角（0,0）的坐标</p></li>
<li><p>pageX和pageY，相对于整个网页左上角（0,0）的坐标</p></li>
<li><p>X和Y，本来是IE属性，相对于用CSS动态定位的最内层包容元素</p></li>
</ol>
<hr>
<p>本文内容整理自慕课网课程<a href="http://www.imooc.com/video/11207" rel="nofollow noreferrer" target="_blank">《JS/jQuery宽高的理解和应用》</a>课程讲解和PPT</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript中的各种宽高属性

## 原文链接
[https://segmentfault.com/a/1190000007515034](https://segmentfault.com/a/1190000007515034)

