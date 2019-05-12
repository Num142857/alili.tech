---
title: '【前端性能优化】高性能JavaScript整理总结' 
date: 2018-12-09 2:30:08
hidden: true
slug: 8491ire3d3u
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">高性能JavaScript整理总结</h2>
<p>关于前端性能优化：首先想到的是<a href="https://developer.yahoo.com/performance/rules.html" rel="nofollow noreferrer" target="_blank">雅虎军规34条</a><br>然后最近看了《高性能JavaScript》<br>大概的把书中提到大部分知识梳理了下并加上部分个人理解<br>这本书有参考雅虎特别性能小组的研究成果，所以跟34 军规有很多相似之处<br>有不当之处请在评论区指正，感谢~</p>
<p><strong>约定</strong>：很多单词语法都是简写比如doc指document，点点点代表不重要代码省略，码字不易（/双手合十）</p>
<h2 id="articleHeader1">1. 加载和执行</h2>
<hr>
<ul><li>JavaScript是单线程，所以JavaScript的加载和执行是从上至下加载执行完一个再继续加载执行下一个文件，会阻塞页面资源的加载，所以一般情况下JavaScript文件放在body标签<strong>内</strong>底部，很多后端开发人员放在body标签外下面，这样做不好的地方有两处：1、不规范  2、<strong>可能</strong>会造成js获取不到页面元素而导致报错。而放在body标签内底部可以确保js执行前页面渲染完成　</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body>
js...                         //正确
</body>
<!-----------------------分界线---------------------------->
<body>

</body>
js...                         //错误" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
js...                         //正确
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-comment">&lt;!-----------------------分界线----------------------------&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
js...                         //错误</code></pre>
<ul><li>合并脚本，每个&lt;script&gt;标签初始化下载都会阻塞页面渲染，所以减少页面的&lt;script&gt;标签数量可以起到优化作用，内嵌脚本外链脚本通用,另外HTTP会带来的额外的性能消耗，下载一个100KB的文件比下载4个25KB的文件更快，所以可以通过进行脚本的合并去1、减少&lt;script&gt;标签数量 2、减少HTTP请求带来的消耗（针对外链脚本），虽然现在很多工具帮我们完成了合并工作，但是原理还是需要了解下的。</li></ul>
<p>特殊情况：把一段<strong>内嵌</strong>的脚本紧跟在<strong>外链</strong>css标签后面，会导致：内嵌脚本为了确保执行的时候获得的是最精准的样式信息，会去先等待外链样式表的下载，这样会导致页面阻塞去等待该样式表下载。如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//错误示范
<link ... href='...'>
<script>
  内嵌脚本...
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//错误示范</span>
&lt;link ... href=<span class="hljs-string">'...'</span>&gt;
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="undefined">
  内嵌脚本...
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<ul><li>三种无阻塞下载JavaScript的方法：</li></ul>
<p>1.使用&lt;script&gt;标签的defer属性，defer描述：规定是否对脚本执行进行延迟，直到页面加载为止。<br>2.使用动态创建的&lt;script&gt;元素来下载并执行代码，俗称动态脚本注入，建议：动态加载的脚本放在head标签中比body标签中更保险，尤其是在页面加载中执行脚本，当body的内容没有全部加载完成时，IE可能会报错</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'a.js';
    document.querySelectorAll('head')[0].appendChild(script);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-keyword">var</span> script = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'script'</span>);
    script.type = <span class="hljs-string">'text/javascript'</span>;
    script.src = <span class="hljs-string">'a.js'</span>;
    <span class="hljs-built_in">document</span>.<span class="hljs-built_in">querySelectorAll</span>(<span class="hljs-string">'head'</span>)[<span class="hljs-number">0</span>].appendChild(script);</code></pre>
<p>3.使用XHR对象下载JavaScript代码并注入页面，常用的工具有比如LazyLoad类库（懒加载）LAB.js等</p>
<hr>
<h2 id="articleHeader2">2. 数据存取</h2>
<hr>
<ul><li>JavaScript四种基本数据存取位置：</li></ul>
<p>1.字面量：代表自身，无特定位置，包括：字符串、数字、布尔值、对象、数组、函数、正则表达式及null和undefined<br>2.本地变量：var/let/const关键字定义的数据存储单元<br>3.数组元素：存储在JavaScript数组对象内部，以数字为索引，下标从0开始<br>4.对象成员：存储在JavaScript对象内部，以字符串为索引<br>从一个字面量和本地变量中存取数据时的性能消耗极小（可忽略），数组和对象则稍高一些。<br>建议：尽量使用字面量和局部变量（局部变量在方法运行过后会自行释放，用完手动置为null或undefined也行），减少使用对象和数组,比如某作用域内的值呗函数引用一次以上，就可以把它存储到局部变量中来使用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var doc = document.querySelectorAll... ,
    a = doc.getElement... ,
    b = doc.getElement... ,
    c = doc.getElement... ;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-built_in">var</span> doc = document.querySelectorAll<span class="hljs-params">...</span> ,
    a = doc.getElement<span class="hljs-params">...</span> ,
    b = doc.getElement<span class="hljs-params">...</span> ,
    c = doc.getElement<span class="hljs-params">...</span> ;</code></pre>
<ul><li>作用域</li></ul>
<p>每一个函数表示为一个对象，是Function的一个实例，Function对象提供一个内部属性[[scope]]该属性仅js引擎读取（题外话：想起来css的scoped属性，在vue组件中使用时，改样式文件只作用于该组件）[[scope]]包含一个函数被创建的作用域中对象的集合，这个集合就是函数的作用域链。当执行环境创建时，作用域链初始化为[[scope]]属性中的对象，按照出现顺序，复制到执行环境的作用域链中。然后执行环境会创建一个‘活动对象’，‘活动对象’作为函数运行的变量对象，包含所有局部变量、命名参数、参数集合和this，当执行环境销毁，活动对象也被销毁。</p>
<p>在函数执行时，每遇到一个变量，都会经历一次标识符解析过程（标识符位置越深，对应变量读写越慢）去决定从哪获取或者存储数据。<br>不太好理解，打个比方，A作用域包含B作用域，B作用域包含C作用域，在C作用域中根据一个标识符去找对应的变量，如果在C作用域中没找到，就会再去B作用域搜索，B作用域没找到，再去A作用域搜索，搜索的过程消耗了性能，依然是上面的例子，document是全局变量，搜索该变量时是在最后全局变量中找到的，所以放在局部变量中会更快找到。<br>TIPS：命名相同的两个变量存在于作用域链的不同部分，则标识符是遍历作用域时先找到的那个，先找到的屏蔽后面的。各浏览器标识符解析速度有差异。<br>建议：尽可能使用局部变量</p>
<p>with语句和try catch语句可以改变作用域链，尽量避免使用with语句来改变作用域链，因为它使函数的所有局部变量出现在第二个作用域链对象中，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function aa() {
        with(document){               //访问document变快了，访问其他局部变量变慢了
            var bd = body,
                links = getElementsByTagName('a'),
                i = 0,
                len = links.length;
            ...
        }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">aa</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">with</span>(<span class="hljs-built_in">document</span>){               <span class="hljs-comment">//访问document变快了，访问其他局部变量变慢了</span>
            <span class="hljs-keyword">var</span> bd = body,
                links = getElementsByTagName(<span class="hljs-string">'a'</span>),
                i = <span class="hljs-number">0</span>,
                len = links.length;
            ...
        }
    }</code></pre>
<p>然后try catch是把try块里面的错误抛到了catch块中处理，也是改变了作用域链，当catch块语句执行完毕后，作用域链又会恢复到之前状态</p>
<ul><li>动态作用域</li></ul>
<p>with、try catch、还是包含eval()的函数，都可以认为是动态的作用域，但都是执行过程中才有动态作用域，无法通过查看代码结构检测出来，只有在必要时才推荐使用动态作用域</p>
<ul><li>闭包</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function assignEvents() {
        var id = '2341321';
        document.querySelectorAll('#aaa').onclick = function (event) {
            saveDom(id);
        }
    }
var idNew = id;  //undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">assignEvents</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> id = <span class="hljs-string">'2341321'</span>;
        <span class="hljs-built_in">document</span>.querySelectorAll(<span class="hljs-string">'#aaa'</span>).onclick = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event</span>) </span>{
            saveDom(id);
        }
    }
<span class="hljs-keyword">var</span> idNew = id;  <span class="hljs-comment">//undefined</span></code></pre>
<p>作为局部变量，id只能在当前作用域访问，出了作用域就访问不到了，但是这个事件处理函数处于该作用域内，可以获取局部变量id，就变成了assignEvents外的saveDom方法可以获得assignEvents的局部变量id。为了实现这一功能<br><span class="img-wrap"><img data-src="/img/bV6loO?w=868&amp;h=474" src="https://static.alili.tech/img/bV6loO?w=868&amp;h=474" alt="执行环境的作用域链和闭包" title="执行环境的作用域链和闭包" style="cursor: pointer;"></span><br>闭包的[[scope]]属性引用了assignEvents执行环境作用域链的对象（这个对象包含id属性），当执行结束时，执行环境销毁，理应活动对象也被销毁，但是因为闭包的引入，导致这个活动对象处于激活状态，就无法销毁，这就需要更多的内存空间。<br>由于IE使用非原生JavaScript对象实现DOM对象，所以闭包可能导致内存泄漏。<br>由于saveDom方法跨作用域访问量变量id，所以闭包会带来性能消耗，解决办法是：常用的跨作用域变量存储在局部变量中使用</p>
<ul><li>对象成员</li></ul>
<p>大部分JavaScript代码是面向对象编写的（自定义对象、BOM/DOM），所以会导致非常频繁的访问对象成员。所以访问对象也有可优化的地方<br>嵌套成员：对象可以嵌套其他成员<br>嵌套深度与读取时间成正比</p>
<ul><li>原型链</li></ul>
<p>推荐一个回答，第一个 苏墨橘的回答，相比于之前看的千篇一律的解答，这个更容易理解<br><a href="https://www.zhihu.com/question/34183746/answer/59043879" rel="nofollow noreferrer" target="_blank">关于原型链</a></p>
<hr>
<h2 id="articleHeader3">3. DOM编程<em>*</em>*（常见的性能瓶颈）</h2>
<hr>
<p>三个问题：<br>1.访问和修改DOM元素<br>2.修改DOM元素样式导致的重绘和重排<br>3.通过DOM事件处理与用户交互</p>
<ul><li>DOM</li></ul>
<p>DOM：document object module 文档对象模型，可以理解为操作文档的程序接口<br>为什么说DOM慢，操作DOM代价昂贵，简单理解就是两个<strong>独立</strong>的功能只要通过接口彼此连接，就会产生消耗。比如：中国人买iPhone，美国人买卫龙，需要交税的，这个税就是消耗，同样，从DOM到JavaScript或从JavaScript到DOM都有类似的消耗。<br>所以尽量的减少这种交税的次数来达到一定的性能优化，<br>最坏的方式就是在循环中操作或者访问DOM，非常消耗性能。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//bad
for(var i = 0; i < 10000; i++){
    document.querySelectorAll('#aaa').innerHTML += 'a';
}
//good
var aaaHtml = ''; 
for(var i = 0; i < 10000; i++){
    aaaHtml += 'a';
}
document.querySelectorAll('#aaa').innerHTML += aaaHtml;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-comment">//bad</span>
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10000</span>; i++){
    <span class="hljs-built_in">document</span>.<span class="hljs-built_in">querySelectorAll</span>(<span class="hljs-string">'#aaa'</span>).innerHTML += <span class="hljs-string">'a'</span>;
}
<span class="hljs-comment">//good</span>
<span class="hljs-keyword">var</span> aaaHtml = <span class="hljs-string">''</span>; 
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10000</span>; i++){
    aaaHtml += <span class="hljs-string">'a'</span>;
}
<span class="hljs-built_in">document</span>.<span class="hljs-built_in">querySelectorAll</span>(<span class="hljs-string">'#aaa'</span>).innerHTML += aaaHtml;</code></pre>
<ul><li>关于innerHTML和DOM方法（doc.createElement()）谁更快</li></ul>
<p>不考虑Web标准的情况下，差不多。<br>除了最新版的WebKit内核之外的浏览器中，innerHTML更快，旧版本浏览器效率更高<br>新版的WebKit内核的浏览器DOM方法更快 <br>克隆节点带来的优化效果不是很明显、略过<br>访问集合元素时使用局部变量（跟操作一个元素多次是一个道理，不赘述）</p>
<ul><li>遍历DOM</li></ul>
<p>一般来说，querySelectorAll()是获取元素最快的API  返回的是一个NodeList<br>querySelector() 返回的是element,<br>querySelectorAll()还有一点就是可以同时获取两类元素</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var two = doc.querySelectorAll('div.aaa,div.bbb');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> two = doc.<span class="hljs-built_in">querySelectorAll</span>(<span class="hljs-string">'div.aaa,div.bbb'</span>);</code></pre>
<ul><li>重绘和重排</li></ul>
<p>浏览器下载完页面中的所有组件--HTML标记、JavaScript、CSS、图片之后会解析生成两个内部数据结构：<br>1.DOM树    表示页面结构   比如操场上早操，小红你站这，小绿你站那，小明...（滚出去），哈，开个玩笑，这种位置的结构就像DOM树<br>2.渲染树<br>表示DOM节点如何显示     比如 小红穿绿衣服，小绿穿红衣服，小明穿毛呢大衣 小红长头发  小绿绿头发等等</p>
<p>DOM树中每一个需要显示的节点在渲染树种至少存在一个对应的节点（隐藏元素没有对应节点，所以可以利用这一点，先把元素隐藏然后处理然后显示来优化消耗的性能），渲染树中的节点被称为‘帧’或者‘盒’，符合CSS模型定义。（盒子模型不是落地成盒）当DOM和渲染树构建完成，浏览器开始显示页面元素。<br>那什么时候开始重绘和重排呢：</p>
<p>当DOM变化影响了几何属性，浏览器会让渲染树中受到影响的部分失效，重新构造渲染树。这个过程称为重排；  比如班级座位正常，某段时间后小明狂胖200斤，本来小明坐一个位置，现在需要两个位置，其他同学就需要往两边坐或者往后坐，当然，小明会不会滚出去取决于小明的成绩好坏。<br>完成重排后，，浏览器会把受影响的部分重新绘制到屏幕上，这个过程称为重绘；<br>当改变DOM的非几何属性时，只会发生重绘，不会重排；<br>重绘和重排都是代价昂贵；尽量减少</p>
<p>重排何时发生：<br>1.添加或删除可见DOM元素<br>2.元素位置改变<br>3.元素尺寸改变（内外边距、边框厚宽高等）<br>4.内容改变 （内容导致尺寸变化的时候）<br>5.页面渲染器初始化<br>6.浏览器窗口尺寸变化</p>
<ul><li>减少重绘和重排</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//三次重绘
el.style.borderLeft = '1px';
el.style.borderRight = '2px';
el.style.padding = '5px';

//一次重绘
el.style.cssText = 'border-left: 1px;border-right: 2px; padding: 5px';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">//三次重绘</span>
el.style.borderLeft = <span class="hljs-string">'1px'</span>;
el.style.borderRight = <span class="hljs-string">'2px'</span>;
el.style.padding = <span class="hljs-string">'5px'</span>;

<span class="hljs-comment">//一次重绘</span>
el.style.cssText = <span class="hljs-string">'border-left: 1px;border-right: 2px; padding: 5px'</span>;</code></pre>
<p>批量修改DOM时如何减少重绘和重排： 步骤：<br>1.使元素脱离文档流<br>2.对其应用多重改变<br>3.把元素带回文档中                  //步骤1 3 两次重排   </p>
<p>三种方法使DOM脱离文档：<br>1.隐藏元素--应用修改--显示<br>2.使用文档片断，在当前DOM之外构建一个子树，再拷回文档<br>3.拷贝到一个脱离文档的节点中，修改副本，副本替换原始元素</p>
<ul><li>让元素脱离动画流</li></ul>
<p>一般来说，重排只会影响一小部分渲染树，但是也有可能影响很大一部分甚至全部。一次大规模的重排可能会让用户觉得页面一顿一顿的，影响用户体验<br>避免大部分重排：元素使用绝对定位让其脱离文档流--动画--恢复定位</p>
<ul><li>IE和:hover</li></ul>
<p>从IE7开始，IE可以在任何元素上使用:hover这个伪选择器，但是当你大量元素使用时 会降低响应速度 IE8更明显</p>
<ul><li>事件委托：事件逐成冒泡被父级捕获</li></ul>
<p>每绑定一个事件处理器都是有代价的<br>事件三阶段：捕获--到达目标--冒泡<br>事件委托的兼容性问题：访问事件对象、判断事件源、取消冒泡（可选）、阻止默认动作（可选）<br>使用事件委托来减少事件处理器的数量</p>
<hr>
<h2 id="articleHeader4">4. 算法和流程控制</h2>
<hr>
<ul><li>循环</li></ul>
<p>大多数编程语言中，代码执行时间大部分消耗在循环中，所以循环也是提升性能的重要环节之一</p>
<p>JavaScript四种循环：<br>1.for循环</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Tips：for循环初始化会创建一个函数级变量而不是循环级，因为JavaScript只有函数级作用域（ES6存在块级作用域if(){let n = ...}let定义的n只作用于if块内部，执行完就会释放不会导致变量提升）,所以在for循环中定义一个变量和在循环体外定义一个变量时一样的
var i = 100;
for(var i = 0; i < 10; i++){
    console.log(i)  //0,1,2,3...9
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>Tips：<span class="hljs-keyword">for</span>循环初始化会创建一个函数级变量而不是循环级，因为JavaScript只有函数级作用域（ES6存在块级作用域<span class="hljs-keyword">if</span>(){<span class="hljs-keyword">let</span> n = ...}<span class="hljs-keyword">let</span>定义的n只作用于<span class="hljs-keyword">if</span>块内部，执行完就会释放不会导致变量提升）,所以在<span class="hljs-keyword">for</span>循环中定义一个变量和在循环体外定义一个变量时一样的
<span class="hljs-keyword">var</span> i = <span class="hljs-number">100</span>;
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i++){
    <span class="hljs-built_in">console</span>.log(i)  <span class="hljs-comment">//0,1,2,3...9</span>
}</code></pre>
<p>2.while循环<br>3.do-while循环<br>4.for in 循环<br>Tips：for in循环可以枚举任何对象的<strong>属性名</strong>（不是值），但是for in比其他三个循环<strong>明显要慢</strong>，所以除非要迭代一个属性数量未知的对象，否则避免使用for in循环，如果遍历一个属性数量已知属性列表，其他循环比for in快，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var arr = ['name','age'],
        i = 0;
    while(i < arr.length){
        process(object[arr[i]]);
    }    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs matlab"><code>    var arr = [<span class="hljs-string">'name'</span>,<span class="hljs-string">'age'</span>],
        <span class="hljs-built_in">i</span> = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">while</span>(<span class="hljs-built_in">i</span> &lt; arr.<span class="hljs-built_in">length</span>){
        process(object[arr[i]]);
    }    </code></pre>
<p>假设以上四种循环类型性能一样，可以从两个方面去优化循环的性能：<br>(当循环体复杂度为X时，优化方案优先减少循环体的复杂度，循环体复杂度大于X时，优化方案优先减少迭代次数 )<br>1.每次迭代的事务（减少循环体的复杂度）<br>2.迭代的次数（减少循环的次数，百度‘达夫设备’），可以这么理解，达夫设备就是拆解循环，比如遍历一个长度为100的数组，普通情况下循环体执行100次，达夫设备的思想是把100次拆为每次循环执行多次（n表示）100对n取余，执行取余次数，再执行100除以n（下舍）次循环，这个循环体执行n次普通循环体的操作<br>达夫设备代码：(这个8就是我说的n)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var i = items.length % 8;           //先循环余数次数
    while(i){
        process(items[i--]);
    }
    i = Math.floor(items.length / 8);   //再循环8的整数倍次数  循环体是普通循环的8倍 可以写成函数传参调用
    while(i){
        process(items[i--]);
        process(items[i--]);
        process(items[i--]);
        process(items[i--]);
        process(items[i--]);
        process(items[i--]);
        process(items[i--]);
        process(items[i--]);
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code>    var i = <span class="hljs-built_in">items</span>.length % <span class="hljs-number">8</span>;           <span class="hljs-comment">//先循环余数次数</span>
    <span class="hljs-keyword">while</span>(i){
        process(<span class="hljs-built_in">items</span>[i--]);
    }
    i = Math.<span class="hljs-built_in">floor</span>(<span class="hljs-built_in">items</span>.length / <span class="hljs-number">8</span>);   <span class="hljs-comment">//再循环8的整数倍次数  循环体是普通循环的8倍 可以写成函数传参调用</span>
    <span class="hljs-keyword">while</span>(i){
        process(<span class="hljs-built_in">items</span>[i--]);
        process(<span class="hljs-built_in">items</span>[i--]);
        process(<span class="hljs-built_in">items</span>[i--]);
        process(<span class="hljs-built_in">items</span>[i--]);
        process(<span class="hljs-built_in">items</span>[i--]);
        process(<span class="hljs-built_in">items</span>[i--]);
        process(<span class="hljs-built_in">items</span>[i--]);
        process(<span class="hljs-built_in">items</span>[i--]);
    }</code></pre>
<p>最小化属性查找：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for(var i = 0, len = arr.length; i < len; i++){
    ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs matlab"><code><span class="hljs-keyword">for</span>(var <span class="hljs-built_in">i</span> = <span class="hljs-number">0</span>, len = arr.<span class="hljs-built_in">length</span>; <span class="hljs-built_in">i</span> &lt; len; <span class="hljs-built_in">i</span>++){
    ...
}</code></pre>
<p>基于函数的迭代：forEach()<br>forEach遍历一个数组的所有成员，并执行一个函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="arr.forEach(function(value, index, array){
    ...
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code>arr.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(value, <span class="hljs-keyword">index</span>, <span class="hljs-keyword">array</span>)</span><span class="hljs-comment">{
    ...
}</span>)</span></code></pre>
<p>但是<strong>所有情况</strong>下。基于循环的迭代比基于函数的迭代快8倍，在运行速度要求严格时，基于循环的迭代优先于基于函数的迭代</p>
<ul><li>条件语句</li></ul>
<p>if-else对比switch：<br>当条件较少时 使用if-else更易读，而当条件较多时if-else性能负担比switch大，易读性也没switch好。<br>优化if-else的方法是：尽可能的把可能出现的条件放在首位，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var i = Math.random(1);     
    if(i <= 0.8){            //i小于0.8是几率最大的，如果i的值满足i <= 0.8 后面的条件就不会再判断了
        ...
    }else if(i > 0.8 &amp;&amp; i <= 0.9){
        ...
    }else{
        ...
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code>    <span class="hljs-built_in">var</span> i = Math.random(<span class="hljs-number">1</span>);     
    <span class="hljs-keyword">if</span>(i &lt;= <span class="hljs-number">0.8</span>){            <span class="hljs-comment">//i小于0.8是几率最大的，如果i的值满足i &lt;= 0.8 后面的条件就不会再判断了</span>
        <span class="hljs-params">...</span>
    }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(i &gt; <span class="hljs-number">0.8</span> &amp;&amp; i &lt;= <span class="hljs-number">0.9</span>){
        <span class="hljs-params">...</span>
    }<span class="hljs-keyword">else</span>{
        <span class="hljs-params">...</span>
    }</code></pre>
<p>当条件很多的时候：（比如10个和10个以上），避免使用条件语句if-else、switch是最佳方式是使用hash表</p>
<ul><li>Memoization</li></ul>
<p>减少工作量就是最好的性能优化技术（你可以理解为，砍需求是为了性能优化，这是鲁迅说的--鲁迅：这句话我还真说过）<br>Memoization避免重复工作，缓存前一个计算的结果为后面的计算所用<br>比如分别求4、5、6的阶乘<br>求6的阶乘的时候，因为我缓存了5的阶乘结果，那么6的阶乘就是5的阶乘结果乘以6</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!--Memoization缓存重复运算的值-->
            function memoizeA(n) {
                if(!memoizeA.cache){
                    memoizeA.cache = {
                        '0': 1,
                        '1': 1
                    }
                }
                if(!memoizeA.cache.hasOwnProperty(n)){
                    memoizeA.cache[n] = n * memoizeA(n-1)
                }
                return memoizeA.cache[n]
            }

            var a1 = memoizeA(4)
            console.log(a1)          //24
            var a2 = memoizeA(5)
            console.log(a2)            //120
            var a3 = memoizeA(6)
            console.log(a3)           //720

            <!--封装为方法-->
            function memoize(func, cache) {
                cache = cache || {};
                
                var shell = function (arg) {
                    if(!cache.hasOwnProperty(arg)){
                        cache[arg] = func(arg);
                    }
                    return cache[arg];
                }
                return shell;
            }
            var funCcc = function ccc(n){
                if(n == 0){
                     return 1;
                }else{
                    return n*ccc(n-1)
                }
            }
            var a4 = memoize(funCcc,{&quot;0&quot;:1,&quot;1&quot;:1});
            console.log(a4(6));         //720" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;!--Memoization缓存重复运算的值--&gt;
            <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">memoizeA</span>(<span class="hljs-params">n</span>) </span>{
                <span class="hljs-keyword">if</span>(!memoizeA.cache){
                    memoizeA.cache = {
                        <span class="hljs-string">'0'</span>: <span class="hljs-number">1</span>,
                        <span class="hljs-string">'1'</span>: <span class="hljs-number">1</span>
                    }
                }
                <span class="hljs-keyword">if</span>(!memoizeA.cache.hasOwnProperty(n)){
                    memoizeA.cache[n] = n * memoizeA(n<span class="hljs-number">-1</span>)
                }
                <span class="hljs-keyword">return</span> memoizeA.cache[n]
            }

            <span class="hljs-keyword">var</span> a1 = memoizeA(<span class="hljs-number">4</span>)
            <span class="hljs-built_in">console</span>.log(a1)          <span class="hljs-comment">//24</span>
            <span class="hljs-keyword">var</span> a2 = memoizeA(<span class="hljs-number">5</span>)
            <span class="hljs-built_in">console</span>.log(a2)            <span class="hljs-comment">//120</span>
            <span class="hljs-keyword">var</span> a3 = memoizeA(<span class="hljs-number">6</span>)
            <span class="hljs-built_in">console</span>.log(a3)           <span class="hljs-comment">//720</span>

            &lt;!--封装为方法--&gt;
            <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">memoize</span>(<span class="hljs-params">func, cache</span>) </span>{
                cache = cache || {};
                
                <span class="hljs-keyword">var</span> shell = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">arg</span>) </span>{
                    <span class="hljs-keyword">if</span>(!cache.hasOwnProperty(arg)){
                        cache[arg] = func(arg);
                    }
                    <span class="hljs-keyword">return</span> cache[arg];
                }
                <span class="hljs-keyword">return</span> shell;
            }
            <span class="hljs-keyword">var</span> funCcc = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ccc</span>(<span class="hljs-params">n</span>)</span>{
                <span class="hljs-keyword">if</span>(n == <span class="hljs-number">0</span>){
                     <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
                }<span class="hljs-keyword">else</span>{
                    <span class="hljs-keyword">return</span> n*ccc(n<span class="hljs-number">-1</span>)
                }
            }
            <span class="hljs-keyword">var</span> a4 = memoize(funCcc,{<span class="hljs-string">"0"</span>:<span class="hljs-number">1</span>,<span class="hljs-string">"1"</span>:<span class="hljs-number">1</span>});
            <span class="hljs-built_in">console</span>.log(a4(<span class="hljs-number">6</span>));         <span class="hljs-comment">//720</span></code></pre>
<hr>
<h2 id="articleHeader5">5. 字符串和正则表达式</h2>
<hr>
<p>说明：正则表达式我不会<span class="img-wrap"><img data-src="/img/bV6qGn?w=50&amp;h=50" src="https://static.alili.tech/img/bV6qGn?w=50&amp;h=50" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span>，这里就不说了</p>
<ul><li>字符串</li></ul>
<p>比较下四中字符串拼接方法的性能：<br>A：<code>str = str + 'a'+'b'</code><br>B:<code>str += 'a' + 'b'</code><br>C: arr.join('')<br>D:str.concat('b','c')<br>对于A与B比较：B会在内存中创建一个临时字符串，字符串拼接为'ab'后赋给临时字符串，临时字符串赋给str;大多数浏览器下A优于B，但在IE8及更早的版本中，B优于A<br>关于join、concat加前两种拼接的效率:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    //+=
    (function () {
        var startTime = new Date().getTime();
        var str = '';
        var addStr = 'hello world~, hello xiaojiejie';
        for(var i = 0; i < 100000; i++){
            str += addStr;
        }
        var endTime = new Date().getTime();
        console.log('字符串str += a:');
        console.log(endTime-startTime);
    })();
    // +
    (function () {
        var startTime = new Date().getTime();
        var str = '';
        var addStr = 'hello world~, hello xiaojiejie';
        for(var i = 0; i < 100000; i++){
            str = str + addStr;
        }
        var endTime = new Date().getTime();
        console.log('字符串str = str + a:');
        console.log(endTime-startTime);
    })();
    //concat
    (function () {
        var startTime = new Date().getTime();
        var str = '';
        var addStr = 'hello world~, hello xiaojiejie';
        for(var i = 0; i < 100000; i++){
            str = str.concat(addStr);
        }
        var endTime = new Date().getTime();
        console.log('字符串str.concat:');
        console.log(endTime-startTime);
    })();
    //join
    (function () {
        var startTime = new Date().getTime();
        var str = '';
        var arr = [];
        var addStr = 'hello world~, hello xiaojiejie';
        for(var i = 0; i < 100000; i++){
            arr.push(addStr);
        }
        str = arr.join('');
        var endTime = new Date().getTime();
        console.log('字符串join:');
        console.log(endTime-startTime);
    })();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>    <span class="hljs-comment">//+=</span>
    (<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> startTime = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime();
        <span class="hljs-keyword">var</span> str = <span class="hljs-string">''</span>;
        <span class="hljs-keyword">var</span> addStr = <span class="hljs-string">'hello world~, hello xiaojiejie'</span>;
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">100000</span>; i++){
            str += addStr;
        }
        <span class="hljs-keyword">var</span> endTime = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime();
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'字符串str += a:'</span>);
        <span class="hljs-built_in">console</span>.log(endTime-startTime);
    })();
    <span class="hljs-comment">// +</span>
    (<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> startTime = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime();
        <span class="hljs-keyword">var</span> str = <span class="hljs-string">''</span>;
        <span class="hljs-keyword">var</span> addStr = <span class="hljs-string">'hello world~, hello xiaojiejie'</span>;
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">100000</span>; i++){
            str = str + addStr;
        }
        <span class="hljs-keyword">var</span> endTime = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime();
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'字符串str = str + a:'</span>);
        <span class="hljs-built_in">console</span>.log(endTime-startTime);
    })();
    <span class="hljs-comment">//concat</span>
    (<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> startTime = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime();
        <span class="hljs-keyword">var</span> str = <span class="hljs-string">''</span>;
        <span class="hljs-keyword">var</span> addStr = <span class="hljs-string">'hello world~, hello xiaojiejie'</span>;
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">100000</span>; i++){
            str = str.concat(addStr);
        }
        <span class="hljs-keyword">var</span> endTime = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime();
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'字符串str.concat:'</span>);
        <span class="hljs-built_in">console</span>.log(endTime-startTime);
    })();
    <span class="hljs-comment">//join</span>
    (<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> startTime = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime();
        <span class="hljs-keyword">var</span> str = <span class="hljs-string">''</span>;
        <span class="hljs-keyword">var</span> arr = [];
        <span class="hljs-keyword">var</span> addStr = <span class="hljs-string">'hello world~, hello xiaojiejie'</span>;
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">100000</span>; i++){
            arr.push(addStr);
        }
        str = arr.join(<span class="hljs-string">''</span>);
        <span class="hljs-keyword">var</span> endTime = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime();
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'字符串join:'</span>);
        <span class="hljs-built_in">console</span>.log(endTime-startTime);
    })();</code></pre>
<p>我用这段代码简单在chrome65上测试了下，平均下来A&gt;B&gt;C&gt;D，未统计取平均，也没测试其他浏览器<br>书上说在IE老版本join是比较快的，也是<strong>大量</strong>字符串拼接的唯一高效方式<br>详细参考 <a href="https://www.cnblogs.com/chsword/archive/2012/06/17/javascript-string-concat-performance.html" rel="nofollow noreferrer" target="_blank">几种字符串拼接性能</a></p>
<hr>
<h2 id="articleHeader6">6. 快速相应的用户界面</h2>
<hr>
<ul><li>浏览器UI线程</li></ul>
<p>用于执行JavaScript和更新用户界面的进程被称为'浏览器UI线程'，UI线程的工作基于一个队列系统，当进程空闲时，就会从改队列提取任务去执行，该任务可能是JavaScript代码也可能是UI更新（重绘、重排）。<br>UI：用户界面  GUI：图形用户界面  这张图来自 <a href="https://blog.csdn.net/u011643473/article/details/43192083" rel="nofollow noreferrer" target="_blank">链接</a><br><span class="img-wrap"><img data-src="/img/bV6Atu?w=674&amp;h=368" src="https://static.alili.tech/img/bV6Atu?w=674&amp;h=368" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>浏览器限制JavaScript任务的运行时间，限制两分钟，可以防止恶意代码不断执行来锁定你的浏览器<br>单个JavaScript操作的花费总时间应该小于等于100ms，这就意味着在100ms内响应用户的操作，不然就会让用户感受到迟钝感</p>
<ul><li>定时器让出时间片断</li></ul>
<p>如果代码复杂100ms运营不完，可以使用定时器让出时间片断，从而使UI获得控制权进行更新。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="这个例子只是说明JavaScript单线程，定时器可以把任务放到后面执行，方便理解
console.log(111)；
setTimeout(func(){console.log(222)},0);
console.log(333);
//111 333 222" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code>这个例子只是说明JavaScript单线程，定时器可以把任务放到后面执行，方便理解
console.<span class="hljs-built_in">log</span>(<span class="hljs-number">111</span>)；
setTimeout(<span class="hljs-function"><span class="hljs-keyword">func</span><span class="hljs-params">()</span>{<span class="hljs-title">console</span>.<span class="hljs-title">log</span><span class="hljs-params">(<span class="hljs-number">222</span>)</span>},0);</span>
console.<span class="hljs-built_in">log</span>(<span class="hljs-number">333</span>)<span class="hljs-comment">;</span>
//<span class="hljs-number">111</span> <span class="hljs-number">333</span> <span class="hljs-number">222</span></code></pre>
<p>JavaScript是单线程，所以定时器可以把JavaScript任务放到后面，控制权先交给UI线程<br>定时器精度有几毫秒的偏差，，Windows系统中定时器的分辨率为25ms，所以建议延迟最小值设置为25ms</p>
<p>把一个任务分解成一系列子任务<br>把一个运行时间长的函数分解为一个个短时间运行的子函数</p>
<p>使用时间戳计算获得程序运行时间，以便快速找到运行时间较长的代码部分进行优化</p>
<p>重复的定时器会抢夺UI线程的运行时间，1秒及以上的低频定时器不会有什么影响，当使用高频100ms-200ms之前的定时器时响应会变慢，所以高频重复定时器使用要注意</p>
<ul><li>Web Workers （HTML5新特性）</li></ul>
<p>在UI线程外运行，不占用UI线程的时间<br><a href="http://www.w3school.com.cn/tiy/t.asp?f=html5_webworker" rel="nofollow noreferrer" target="_blank">来自W3C的worker demo</a><br>Web Workers不能修改DOM<br>运行环境组成：<br><em>一个navigator对象</em><br><em>一个location对象（与window.location相同  属性-只读）</em><br><em>一个self对象，指向worker对象</em><br><em>可以引入需要用到的外部文件importScripts()方法</em><br><em>可以使用js对象 Object、Array、Date等</em><br><em>XHR</em><br><em>定时器</em><br><em>close() 立刻停止Worker运行</em></p>
<p><a href="http://www.w3school.com.cn/html5/html_5_webworkers.asp" rel="nofollow noreferrer" target="_blank">W3C介绍Web Worker</a><br><a href="https://www.ibm.com/developerworks/cn/web/1112_sunch_webworker/" rel="nofollow noreferrer" target="_blank">博文：Web Worker原理和应用介绍</a><br>实际应用场景：处理纯数据或者与UI线程无关的长时间运行脚本，个人觉得大量的纯计算可以考虑使用</p>
<hr>
<h2 id="articleHeader7">7. Ajax（阿炸克斯）</h2>
<hr>
<p>前面说到数据存取会影响性能，理所应当的，数据的传输同样影响性能<br>Ajax通过异步的方式在客户端和服务端之间传输数据。</p>
<ul><li>数据传输</li></ul>
<p>请求数据的五种方式：</p>
<p>A:XMLHTTPRequest(简称XHR)<br>最常用异步异步发送和接收数据,包括GET和POST两种方式<br>不能跨域<br>GET--参数放在url后面，请求得到的数据会被缓存，当url加参数超过2048，可以使用POST方式<br>POST--参数在头信息，数据不会被缓存<br>XHR工作原理及优缺点参考<a href="https://blog.csdn.net/youjinli122/article/details/77412851" rel="nofollow noreferrer" target="_blank">选我选我</a></p>
<p>B:动态脚本注入<br>其实就是创建一个script元素这个元素的src不受当前域限制，但是不能设置请求头信息，也就是只能用GET方式</p>
<p>C.Multipart XHR<br>MXHR荀彧一个HTTP请求就可以传输多个数据<br>通过在服务端讲资源打包成一个双方约定的字符串分割的长字符串发送到客户端，然后根据mime-typed类型和传入的其他头信息解析出资源<br>缺点：资源不能被缓存</p>
<p>D.iframe<br>E.comet</p>
<p>发送数据：XHR、Beacons、</p>
<ul><li>数据格式</li></ul>
<p>A.XML<br>优点：通用、格式严格、易于验证<br>缺点：冗长、结构复杂有效数据比例低</p>
<p>B.JSON<br>JSON.parse():JSON--&gt;对象<br>JSON.stringify()：js值--&gt;JSON字符串<br>文件小、下载快、解析快</p>
<p>C.JSON-P<br>在客户端注册一个callback, 然后把callback的名字传给服务器。此时，服务器先生成 json 数据。 然后以 javascript 语法的方式，生成一个function , function 名字就是传递上来的参数 jsonp。最后将 json 数据直接以入参的方式，放置到 function 中，这样就生成了一段 js 语法的文档，返回给客户端。</p>
<p>D.HTML<br>E.自定义数据格式</p>
<ul><li>Ajax性能</li></ul>
<p>最快的Ajax请求就是没有请求（贫一句：最快的写程序方式就是天天跟产品拌嘴，砍需求，那啥，我先跑了，产品拿着刀追来了）</p>
<p>避免不必要的请求：<br>服务端设置HTTP头信息确保响应会被浏览器缓存<br>客户端讲获取的信息存到本地避免再次请求（localstorage sessionstorage cookice）<br>设置HTTP头信息，expiresgaosu告诉浏览器缓存多久<br>减少HTTP请求，合并css、js、图片资源文件等或使用MXHR<br>通过次要文件用Ajax获取可缩短页面加载时间</p>
<hr>
<h2 id="articleHeader8">8. 编程实践</h2>
<hr>
<ul><li>避免双重求值</li></ul>
<p>eval()、Function慎用，定时器第一个参数建议函数而不是字符串都能避免字符串双重求值</p>
<ul><li>使用对象或者数组直接量</li></ul>
<p>直接量：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {
    name:...
    age:...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-built_in">var</span> obj = {
    name:<span class="hljs-params">...</span>
    age:<span class="hljs-params">...</span>
}</code></pre>
<p>非直接量：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = new Object()
obj.name = ...
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-built_in">var</span> obj = <span class="hljs-literal">new</span> Object()
obj.name = <span class="hljs-params">...</span>
<span class="hljs-params">...</span></code></pre>
<p>运行时直接量比非直接量快</p>
<ul><li>避免重复工作</li></ul>
<p>A:延迟加载（懒加载）<br>进入函数--&gt;判断条件--&gt;重写函数<br>B:条件预加载<br>函数调用前提前进行条件检测<br>var addEvent = doc.addEventListener ? funcA : funcB</p>
<ul><li>使用JavaScript速度快的部分</li></ul>
<p>A.位操作<br>B.原生方法，首先原生方法是最快的，而且浏览器会缓存部分原生方法<br>C.复杂计算时多使用Math对象<br>D.querySelector和querySelectorAll是查询最快的<br>当用Document类型调用querySelector()方法时，会在文档元素范围内查找匹配的元素；而当用Element类型调用querySelector()方法时，只会在这个元素的后代元素中去查找匹配的元素。若不存在匹配的元素，则这两种类型调用该方法时，均返回null。</p>
<hr>
<h2 id="articleHeader9">9. 构建并部署高性能JavaScript应用</h2>
<hr>
<p>这一章讲的都是其他章节的优化原理的实践，主要有：<br>1.合并多个js文件<br>2.预处理js文件<br>3.js压缩<br>4.js的HTTP压缩<br>5.缓存js文件<br>6.处理缓存问题<br>7.使用内容分发网络（CDN）这个有点效果显著的感觉，前年第一次用的时候感觉快了很多，打个比方就是：<br>京东网上水果蔬菜超市，假设你在上海买了一个榴莲，京东可以在上海的仓库给你发货，如果上海没有他们的仓库，就在离你最近的一个仓库发货，以保证最快速度送到你手上（吃什么不好，吃榴莲，别人会说食屎拉你）。这个仓库放的就是静态资源文件，根据请求发出的位置找到最近的CDN节点把资源返回给请求端，大概是这个意思，具体原理参考<a href="https://www.cnblogs.com/wxiaona/p/5867685.html" rel="nofollow noreferrer" target="_blank">CDN原理</a><br>现在很多方式都在gulp、webpack工具里进行了，方便省事</p>
<hr>
<h2 id="articleHeader10">10. 工具</h2>
<hr>
<ul><li>JavaScript性能分析</li></ul>
<p>使用Date对象实例减去另一个实例获得任务运行时间毫秒数</p>
<ul><li>匿名函数</li></ul>
<p>测量分析匿名函数的方法就是给匿名函数加上名字</p>
<ul><li>调试工具</li></ul>
<p>个人比较喜欢chrome调试工具<br>贡献几个比较全的教程<br><a href="http://www.cnblogs.com/st-leslie/p/8196493.html" rel="nofollow noreferrer" target="_blank">基础篇</a><br><a href="https://www.cnblogs.com/st-leslie/p/8244559.html" rel="nofollow noreferrer" target="_blank">优化篇</a><br><a href="http://www.cnblogs.com/st-leslie/p/8261319.html" rel="nofollow noreferrer" target="_blank">实战1</a><br><a href="http://www.cnblogs.com/st-leslie/p/8271347.html" rel="nofollow noreferrer" target="_blank">实战2</a><br><a href="https://addyosmani.com/blog/taming-the-unicorn-easing-javascript-memory-profiling-in-devtools/" rel="nofollow noreferrer" target="_blank">英文使用介绍</a></p>
<ul><li>脚本阻塞</li></ul>
<p>Safari4、IE8、Firefox3.5、chrome及以上允许脚本并行下载，但阻塞运行，虽然文件下载快了，但是页面渲染任会阻塞直到脚本运行完<br>对运行慢的脚本进行优化或重构，不必要的脚本等到等到页面渲染完成再加载</p>
<ul><li>Page Speed</li></ul>
<p>显示解析和运行JavaScript消耗的时间，指明可以延长加载的脚本，并报告没被使用的函数</p>
<ul><li>Fiddler</li></ul>
<p>Fiddler是一个HTTP调试代理工具，能检测到网络中所有资源，以定位加载瓶颈</p>
<ul><li>YSlow</li></ul>
<p>YSlow工具可以深入观察页面初始加载和运行过程的整体性能</p>
<ul><li>WebPagetest</li></ul>
<p>WebPagetest：根据用户浏览器真实的连接速度，在全球范围内进行网页速度测试，并提供详细的优化建议。<br><a href="http://www.webpagetest.org/" rel="nofollow noreferrer" target="_blank">WebPagetest</a></p>
<ul><li>Google PageSpeed</li></ul>
<p>PageSpeed 根据网页最佳实践分析和优化测试的网页。</p>
<ul><li>Pingdom 网站速度测试</li></ul>
<p>输入 URL 地址，即可测试页面加载速度，分析并找出性能瓶颈。<br><a href="https://tools.pingdom.com/" rel="nofollow noreferrer" target="_blank">Pingdom 网站速度测试</a></p>
<p>还有很多类似工具：参考<a href="https://www.cnblogs.com/laichen/p/6876687.html" rel="nofollow noreferrer" target="_blank">前端性能优化和测试工具总结</a></p>
<hr>
<p>本文档主干内容来自于《高性能JavaScript》及其他其他博客并注明出处，如有侵权请联系作者删除~<br>后续会通过举证说明更多方案的效果，不断完善此文档</p>
<p><em>注：内容有不当或者错误处请指正~转载请注明出处~谢谢合作！</em></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【前端性能优化】高性能JavaScript整理总结

## 原文链接
[https://segmentfault.com/a/1190000013963213](https://segmentfault.com/a/1190000013963213)

