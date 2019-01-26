---
title: 'javascript性能优化技巧' 
date: 2019-01-27 2:30:59
hidden: true
slug: xadf8ca4oas
categories: [reprint]
---

{{< raw >}}

                    
<p>春节在家，把《高性能的JavaScript》刷了一遍，受益匪浅。本着每看完一本书都要做读书笔记的习惯，将书中的知识点总结一下。</p>
<blockquote><p>由于不同浏览器使用的JavaScript引擎不同，因此对JavaScript的优化也不尽相同。也因此，有些方法在IE上可能性能相差很大，但在chrome上相差无几，也甚至某些方法在IE上最快，但在chrome上却并不是最优的方案，所以，对性能有极致要求的应用，应考虑你的产品使用者最常用的浏览器。当然，下面提到的优化方法都是通用法则或者对大多数浏览器都友好的方法。</p></blockquote>
<h1 id="articleHeader0">JavaScript加载和执行</h1>
<p>JavaScript的下载和执行会阻塞用户界面的绘制和其他资源的下载</p>
<h3 id="articleHeader1">优化方法：</h3>
<p>1.阻塞式脚本：合并文件（减少http请求），将script标签放在body尾部（减少页面css，html的下载阻塞，减少界面的空白时间（浏览器在解析到script标签之前，不会渲染页面的任何部分））</p>
<blockquote><p>目前流行的构建工具，如webpack,gulp，都有打包、合并文件的功能。</p></blockquote>
<p>2.无阻塞式脚本：延迟脚本和动态脚本均不阻塞，即下载过程不阻塞其他进程</p>
<p>延迟脚本：<br>defer和async属性：都是并行下载，下载过程不阻塞，区别在于执行时机，async是下载完成后立即执行；defer是等页面加载完成后再执行。defer仅当src属性声明时才生效（HTML5的规范）</p>
<p>动态脚本：<br>动态添加script标签，返回的代码通常会立刻执行，所以，为了确保脚本下载完成且准备就绪后才执行，须侦听load事件。将script添加到head中比添加到body中更保险。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//动态添加脚本，当脚本下载完成且准备就绪后执行回调函数。（这也是推荐的无阻塞的方法）
function loadScript(url,callback){
    var script=document.creatElement('script');
    script.type='text/javascript';
    if(script.readyState){ //IE
        script.onreadystatechange=function(){
            if(script.readyState == 'loaded' || script.readyState == 'complete'){
                script.onreadystatechange=null;
                callback();
            }
        }
    }else{  //非IE
        script.onload=function(){
            callback();
        }
    }

    script.src=url;
    document.getElementsByTagName('head')[0].appendChild(script);

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">//动态添加脚本，当脚本下载完成且准备就绪后执行回调函数。（这也是推荐的无阻塞的方法）</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">loadScript</span>(<span class="hljs-params">url,callback</span>)</span>{
    <span class="hljs-keyword">var</span> script=<span class="hljs-built_in">document</span>.creatElement(<span class="hljs-string">'script'</span>);
    script.type=<span class="hljs-string">'text/javascript'</span>;
    <span class="hljs-keyword">if</span>(script.readyState){ <span class="hljs-comment">//IE</span>
        script.onreadystatechange=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-keyword">if</span>(script.readyState == <span class="hljs-string">'loaded'</span> || script.readyState == <span class="hljs-string">'complete'</span>){
                script.onreadystatechange=<span class="hljs-literal">null</span>;
                callback();
            }
        }
    }<span class="hljs-keyword">else</span>{  <span class="hljs-comment">//非IE</span>
        script.onload=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            callback();
        }
    }

    script.src=url;
    <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">'head'</span>)[<span class="hljs-number">0</span>].appendChild(script);

}</code></pre>
<h1 id="articleHeader2">数据存取</h1>
<p>将全局变量存储到局部变量中：因为全局变量总是存在于执行环境作用域链的最末端，所以，访问全局变量是最慢的，访问局部变量是最快的。尤其是对于未优化过的JavaScript引擎。</p>
<p>在JavaScript中，只有2个语句可以在执行时临时改变作用域链：with语句和try-catch的catch子句。with语句会使得局部变量位于作用域第二层，会使性能下降，所以应避免使用。try-catch权衡使用（因为可预测的错误说明代码有问题，应及早修复）。</p>
<p>尽量避免使用with，try-catch，eval等动态作用域语句，因为JavaScript引擎无法通过静态分析的方法进行优化。</p>
<p>闭包会影响性能（作用域链加深）和可能导致内存泄漏（IE中）</p>
<h3 id="articleHeader3">总结：</h3>
<ol>
<li><p>使用对象字面量代替对象</p></li>
<li><p>使用局部变量存储全局变量和对象成员</p></li>
<li><p>尽量不用with，eval语句，try-catch的catch子句要谨慎使用</p></li>
<li><p>嵌套越深，性能越差，尽量少用。</p></li>
</ol>
<h1 id="articleHeader4">DOM编程</h1>
<p>DOM和JavaScript是2个独立的功能，只通过API连接，用JavaScript操作DOM天生就慢，所以应尽量减少用JavaScript操作DOM。</p>
<h3 id="articleHeader5">原则：</h3>
<p>1.减少访问DOM的次数，把运算尽量留在ECMAScript这一端处理。<br>2.innerHTML在绝大多数浏览器中比原生DOM方法要快（最新版的chrome除外），推荐使用。<br>3.用element.cloneNode()代替document.createElement()，稍快一些。<br>4.缓存HTML集合的length.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//这会是一个死循环，因为取HTML集合的length会重复执行查询的过程。
    var addDivs=document.getElementsByTagName('div');
    for(var i=0,len=addDivs.length;i<len;i++){
        document.body.appendChild(document.createElement('div'));
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">//这会是一个死循环，因为取HTML集合的length会重复执行查询的过程。</span>
    <span class="hljs-keyword">var</span> addDivs=<span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">'div'</span>);
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>,len=addDivs.length;i&lt;len;i++){
        <span class="hljs-built_in">document</span>.body.appendChild(<span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'div'</span>));
    }</code></pre>
<p>5.使用children代替childNodes，因为childNodes会包含文本节点（空格）和注释节点，还需要自己额外过滤这些节点，children已经帮我们过滤掉这些节点了，而且使用的过滤方法效率很高。<br>6.原生选择器API：querySelectorAll()和querySelector()  ，IE8及以上支持<br>querySelectorAll()返回的是个nodelist（也是类数组），不是HTML集合（与getElenmentsByTagName等不同）。<br>7.减少重绘和重排：<br>在修改样式的过程中，最好避免使用下面的属性,因为它们会刷新渲染队列，尽量少查询下列属性，可以用局部变量缓存结果。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="offsetTop，offsetLeft，offsetWidth，offsetHeight,
scrollTop，scrollLeft，scrollWidth，scrollHeight
clientTop，clientLeft，clientWidth，clientHeight
getComputedStyle()  (currentStyle in IE)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">offsetTop，offsetLeft，offsetWidth，offsetHeight,
scrollTop，scrollLeft，scrollWidth，scrollHeight
clientTop，clientLeft，clientWidth，clientHeight
getComputedStyle()  (currentStyle <span class="hljs-keyword">in</span> IE)</code></pre>
<p>8.合并多次对DOM和样式的修改：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="el.style.cssText+=';border-left:2px;';
JavaScript改变class" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">el.style.cssText+=<span class="hljs-string">';border-left:2px;'</span>;
JavaScript改变<span class="hljs-class"><span class="hljs-keyword">class</span></span></code></pre>
<p>9.批量修改DOM时，使用document fragment：文档片段是一个轻量级的document对象，它本身就是为了更新和移动节点设计的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var fragement=document.createDocumentFragment();
var li=document.createElement('li');
fragement.appendChild(li);
document.body.appendChild(fragement);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">var</span> fragement=<span class="hljs-built_in">document</span>.createDocumentFragment();
<span class="hljs-keyword">var</span> li=<span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'li'</span>);
fragement.appendChild(li);
<span class="hljs-built_in">document</span>.body.appendChild(fragement);</code></pre>
<p>10.动画中使用绝对定位，使用拖放代理。<br>11.使用事件委托来减少事件处理器的数量。</p>
<p>ps:个人觉得，原生方法和库封装的方法并不冲突，应根据实际情况和个人的技能掌握情况选择最合适的方法。</p>
<h1 id="articleHeader6">算法和流程控制</h1>
<ol>
<li><p>for...in的循环性能最差（因为它需要搜索实例和原型上的所有属性），除非，你需要遍历一个属性数量未知的对象，否则不要使用它。<br>更不要用它遍历数组成员。其余的循环性能都差不多。</p></li>
<li><p>倒序循环，把减法操作放到控制条件中，例如：k--，这样只是比较“它是true吗？”速度更快。</p></li>
<li><p>forEach()比数组循环慢，如果对性能有极致要求，还是用数组循环好。</p></li>
<li><p>当判断值多于2个时，使用switch，否则用if-else  （数量少时，性能差别不大，可根据个人喜好使用）。若判断值很多，且没有什么复杂的操作，可以用数组代替switch。<br>在JavaScript中，switch使用全等操作符，不会发生类型转换的损耗。</p></li>
<li><p>把最可能出现的条件放在首位。</p></li>
<li><p>调用栈溢出错误基本都是由递归导致的：不正确的终止条件；包含了太多递归，超过了浏览器的调用栈限制。把递归算法改用迭代算法实现是避免调用栈溢出错误的解决方法之一。</p></li>
<li><p>缓存：避免重复性工作，手动实现缓存（Vue源码中就有很多缓存）</p></li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function memfactorial(n){
    if(!memfactorial.cache){
        memfactorial.cache={
            '0':1,
            '1':1
        }
    }

    if(!memfactorial.cache.hasOwnProperty(n)){
        memfactorial.cache[n]=n* memfactorial(n-1);
    }

    return memfactorial.cache[n];
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">memfactorial</span>(<span class="hljs-params">n</span>)</span>{
    <span class="hljs-keyword">if</span>(!memfactorial.cache){
        memfactorial.cache={
            <span class="hljs-string">'0'</span>:<span class="hljs-number">1</span>,
            <span class="hljs-string">'1'</span>:<span class="hljs-number">1</span>
        }
    }

    <span class="hljs-keyword">if</span>(!memfactorial.cache.hasOwnProperty(n)){
        memfactorial.cache[n]=n* memfactorial(n<span class="hljs-number">-1</span>);
    }

    <span class="hljs-keyword">return</span> memfactorial.cache[n];
  }</code></pre>
<h1 id="articleHeader7">字符串和正则表达式</h1>
<p>字符串拼接推荐用+ +=，推荐写法：str=str+'one'+"two";(将str写在左侧)</p>
<blockquote><p>书上说：在大多数浏览器中，Array.prototype.join()比其他字符串连接方法更慢，但在IE7及早期的浏览器中，在合并大量字符串时是最高效的途径。</p></blockquote>
<p>每个浏览器都有它自己的正则表达式引擎，它们有着各自的优势。</p>
<h3 id="articleHeader8">提高正则表达式效率的方法</h3>
<ol>
<li><p>关注如何让匹配更快失败</p></li>
<li><p>正则表达式以简单，必需的字元开始：例如：起始标记是^，特定字符串，[a-z]或者d等，避免以分组或选择字元开头，避免/one|two/顶层分支。</p></li>
<li><p>减少分支数量，缩小分支范围：例如：将cat|bat 替换为：[cb]at  ;将red|read 替换为：rea?d   将red|raw 替换为：r(?:ed|aw)  将（.|r|n）替换为：[sS]。</p></li>
<li><p>当分支必不可少时，将常用分支放到前面。</p></li>
<li><p>使用非捕获组</p></li>
<li><p>合理使用捕获：如果需要引用匹配的一部分，应用捕获，然后引用那部分</p></li>
<li><p>暴露必须的字元：用/^(ab|cd)/代替/(^ab|^cd)/</p></li>
<li><p>使用合适的量词：贪婪和惰性量词的匹配过程不一样，视情况选择使用。</p></li>
<li><p>将正则表达式赋值给变量（以避免对正则重新编译）并重用它们。</p></li>
<li><p>将复杂的正则拆分为简单的片段：如果太复杂，可以先用条件判断分割</p></li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//去除字符串首尾空格的方法，推荐写法
if(!String.prototype.trim){    //防止覆盖原生方法
        String.prototype.trim=function(){
            return this.replace(/^\s+/,'').replace(/\s+$/,'');
        }
   }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">//去除字符串首尾空格的方法，推荐写法</span>
<span class="hljs-keyword">if</span>(!<span class="hljs-built_in">String</span>.prototype.trim){    <span class="hljs-comment">//防止覆盖原生方法</span>
        <span class="hljs-built_in">String</span>.prototype.trim=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.replace(<span class="hljs-regexp">/^\s+/</span>,<span class="hljs-string">''</span>).replace(<span class="hljs-regexp">/\s+$/</span>,<span class="hljs-string">''</span>);
        }
   }</code></pre>
<blockquote><p>尽管正则很强大，但也不是任何时候都要用正则。对于字面量字符串的操作，字符串原生的方法就很快，例如：indexOf，slice，substring等。</p></blockquote>
<h1 id="articleHeader9">其他</h1>
<ol>
<li><p>建议定时器最小延迟时间是25ms.小于10ms时，各浏览器表现不一致。</p></li>
<li><p>多个定时器时，用setInterval()代替多个setTimeout()</p></li>
<li><p>使用动态脚本注入（json-p），要小心第三方域代码的安全性。不要把敏感信息编码在json-p中。即便是带有随机URL或做了cookie判断。</p></li>
<li>
<p>图片信标：只是用来发送简单数据</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  //只是创建一个Image对象，并不把img插入DOM中。
（new Image()）.src=url+params.join('&amp;');
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code>  <span class="hljs-comment">//只是创建一个Image对象，并不把img插入DOM中。</span>
（<span class="hljs-keyword">new</span> Image()）.src=url+<span class="hljs-keyword">params</span>.<span class="hljs-keyword">join</span>(<span class="hljs-string">'&amp;'</span>);
</code></pre>
</li>
<li><p>尽可能使用JOSN.parse()解析json字符串，该方法可以捕获json字符串中的词法错误，并允许传入一个函数用来过滤或转换解析结果。</p></li>
<li><p>ajax类库的局限：ajax类库为了兼容浏览器，所以不能访问XMLHttpRequests的完整功能。例如不能直接访问readystatechange事件，所以要了解原生的写法。<br>所以，要知道何时使用成熟的类库，何时编写自己的底层代码。</p></li>
<li><p>缩短页面的加载时间，页面主要内容加载完成后，再用ajax获取那些次要的文件。（首页优化）</p></li>
<li><p>通过正确设置响应头来缓存JavaScript文件。</p></li>
<li><p>使用位操作，速度快。</p></li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    i%2   
    //可以改写成位运算 &amp;1 ：
    if(i&amp;1){ 
        //奇数
    }else{ 
        //偶数
    }
    //位掩码：后台常用的按位打标，
    var ops=op_a | op_b | op_c;  
    if(ops &amp; op_a){ 
        //op_a存在
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gcode"><code>    i<span class="hljs-meta">%</span><span class="hljs-number">2</span>   
    <span class="hljs-comment">//可以改写成位运算 &amp;1 ：</span>
    <span class="hljs-keyword">if</span><span class="hljs-comment">(i&amp;1)</span>{ 
        <span class="hljs-comment">//奇数</span>
    }else{ 
        <span class="hljs-comment">//偶数</span>
    }
    <span class="hljs-comment">//位掩码：后台常用的按位打标，</span>
    var ops=op_a | op_b | op_c;  
    <span class="hljs-keyword">if</span><span class="hljs-comment">(ops &amp; op_a)</span>{ 
        <span class="hljs-comment">//op_a存在</span>
    }</code></pre>
<h1 id="articleHeader10">个人感想</h1>
<p>性能提升有多方面：客户端性能，网络情况，服务器性能，在具体解决及分析问题时，要从各个方面考虑，JavaScript代码质量，http请求数也只是其中一部分而已，要全面考虑。在进行优化时，要弄清楚性能瓶颈，然后对症优化。</p>
<p>新看到一篇很棒的文章：<br>前端性能优化备忘录：<a href="https://www.w3ctech.com/topic/1945" rel="nofollow noreferrer" target="_blank">https://www.w3ctech.com/topic...</a>  </p>
<p>ps:如有不对，欢迎指正。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
javascript性能优化技巧

## 原文链接
[https://segmentfault.com/a/1190000008273435](https://segmentfault.com/a/1190000008273435)

