---
title: '入门node.js你必须知道的那些事' 
date: 2018-12-25 2:30:11
hidden: true
slug: k2w2yok6wo
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">入门node.js你必须知道的那些事</h1>
<h2 id="articleHeader1">最基本的一些操作和概念</h2>
<h3 id="articleHeader2">用node执行一段js代码</h3>
<ol>
<li><p>在命令行中用cd切换到桌面</p></li>
<li><p>创建一个文件夹和并用cd命令切换到这个文件夹<br>mkdir nodeTest &amp;&amp; cd nodeTest</p></li>
<li>
<p>创建一个js文件并写上简单的js代码<br>touch a.js <br> `</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 10;
console.log(a);
console.log(a + 10);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> a = <span class="hljs-number">10</span>;
<span class="hljs-built_in">console</span>.log(a);
<span class="hljs-built_in">console</span>.log(a + <span class="hljs-number">10</span>);</code></pre>
<p>`</p>
</li>
<li><p>在命令行中输入node a.js<br>命令行会输出 10 20</p></li>
</ol>
<h3 id="articleHeader3">node引用文件的方式</h3>
<ol>
<li><p>Node.js采用了CommonJS规范,通过require来引入一个js文件</p></li>
<li>
<p>新建文件b.js 并在文件中引入a.js</p>
<ul>
<li><p>touch b.js</p></li>
<li><p>require('./a.js')</p></li>
</ul>
</li>
<li>
<p>执行b.js</p>
<ul><li><p>node b.js 命令行会输出10 20</p></li></ul>
</li>
</ol>
<h3 id="articleHeader4">node中的模块概念</h3>
<ol>
<li><p>node中一个模块就是一个js文件，多个模块组成一个特定功能的一堆文件叫包</p></li>
<li>
<p>一个js文件可以定义它自己暴露给外部的变量(意思就是另一个文件通过require引用它后需要怎么使用它),node中提供共了exports和module.exports两个变量来实现它</p>
<p>a.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   function func1() {
       console.log('aaa')
   }
   function func2() {
       console.log('bbb')
   }
   exports.a = func1
   exports.b = func2
   " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>   <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">func1</span>(<span class="hljs-params"></span>) </span>{
       <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'aaa'</span>)
   }
   <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">func2</span>(<span class="hljs-params"></span>) </span>{
       <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'bbb'</span>)
   }
   exports.a = func1
   exports.b = func2
   </code></pre>
<p>b.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   var a = require('./a.js')
   a.a() //会打印出aaa
   a.b() //会打印出bbb
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>   <span class="hljs-selector-tag">var</span> <span class="hljs-selector-tag">a</span> = require(<span class="hljs-string">'./a.js'</span>)
   <span class="hljs-selector-tag">a</span>.a() <span class="hljs-comment">//会打印出aaa</span>
   <span class="hljs-selector-tag">a</span>.b() <span class="hljs-comment">//会打印出bbb</span>
</code></pre>
<p>c.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   //es6 模式匹配写法
   var {fun1,fun2} = require('./a.js')//fun1和fun2必须跟a.js中的变量名相同，这里是固定的
   fun1() //会打印出aaa
   fun2() //会打印出bbb
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gcode"><code>   <span class="hljs-comment">//es6 模式匹配写法</span>
   var {fu<span class="hljs-symbol">n1</span>,fu<span class="hljs-symbol">n2</span>} = require<span class="hljs-comment">('./a.js')</span><span class="hljs-comment">//fun1和fun2必须跟a.js中的变量名相同，这里是固定的</span>
   fu<span class="hljs-symbol">n1</span><span class="hljs-comment">()</span> <span class="hljs-comment">//会打印出aaa</span>
   fu<span class="hljs-symbol">n2</span><span class="hljs-comment">()</span> <span class="hljs-comment">//会打印出bbb</span>
</code></pre>
<p>a.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   //类的写法
   function Test() {
       this.func1 = function() {
           console.log('aaa')
       }
       this.func2 = function() {
           console.log('bbb')
       }
   }
   module.exports = Hello
   " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>   <span class="hljs-comment">//类的写法</span>
   <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Test</span>(<span class="hljs-params"></span>) </span>{
       <span class="hljs-keyword">this</span>.func1 = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
           <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'aaa'</span>)
       }
       <span class="hljs-keyword">this</span>.func2 = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
           <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'bbb'</span>)
       }
   }
   <span class="hljs-built_in">module</span>.exports = Hello
   </code></pre>
<p>b.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   var Test = require('./a.js')
   var test = new Test()
   test.func1()
   test.func2()

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>   <span class="hljs-keyword">var</span> <span class="hljs-keyword">Test</span> = require('./a.js')
   <span class="hljs-keyword">var</span> <span class="hljs-keyword">test</span> = new <span class="hljs-keyword">Test</span>()
   <span class="hljs-keyword">test</span>.func1()
   <span class="hljs-keyword">test</span>.func2()

</code></pre>
</li>
</ol>
<h3 id="articleHeader5">exports 和 module.exports 的关系</h3>
<blockquote>
<p>exports 是module.exports的一个引用，意思就是指向同一块内存地址，node中真正生效的是module.exports,修改exports本质上也是修改module.exports的值，</p>
<p>比如exports.a = 3，实际上module.exports.a也是等于3的</p>
<p>又比如exports = {}，这样exports就和module.exports的指向的对象就不一样了，后面再怎么修改exports也不会影响到module.exports的值，也不会影响到文件输出的变量</p>
<p><del>再比如module.exports={}，这样造成的效果和上面exports={}的效果是一样的</del></p>
<p>这里表达有问题，虽然module.exports={}和exports={}都是让exports与module.exports的引用指向不同了，但是最后的效果实际上是不一样的，具体用法参考评论区。感谢@琪琪好笨笨 指出的错误</p>
<p>建议：如果你还傻傻分不清楚它们的区别，以后在不是必须用到module.exports的时候只用exports,如果导出一个类这样的必须用到module.exports就不要使用exports了,不要混在一起用就不会出错了</p>
</blockquote>
<h3 id="articleHeader6">node中的npm</h3>
<blockquote>
<p>node中默认自带了npm，npm是一个包管理器，上面说到包就是一个个模块(js文件)组成的一个具有特定功能的一堆js文件，通过npm我们可以引入这些包(如果不理解，把包理解成一个个插件也没有错)来轻松实现一些功能</p>
<p>安装一个模块你只需要npm install xxx 就可以安装了，然后在你自己的js中用var xxx = require('./xxx')就可以使用了</p>
<p>通过npm install xxx 安装完xxx模块后，你会发现当前目录下多了一个node_modules文件夹，打开node_modules文件夹你会发现里面有一个xxx文件夹。你在执行npm install xxx的时候，实际上npm也只是帮你把xxx这个包下载下来了而已，仅此而已</p>
<p>当你通过npm安装了十来个或者更多的包的时候你可能自己早就不知道自己安装了哪些包了，因为很多包依赖了其它的包(一个包用到另一个包提供的功能是非常正常的行为，就像我们在用别人包里的功能一样),所以npm提供了package.json这个文件来管理包</p>
<p>package.json 是一个文件，里面可以定义很多键值对，其中有几个字段非常重要，dependencies表示上线运行时依赖的包，devDependencies表示开发时依赖的包，scripts可以定义自己的脚本，main表示所有的包你都会通过这个文件引入</p>
<p>当你在dependencies和devDependencies定义好依赖，然后在命令行中输入npm install，npm就会帮你自动安装好这些包；反过来你在命令行中输入npm install xxx --save后npm就会在package.json中的dependencies自动加上xxx，如果执行的是npm install xxx --save-dev 就会在devDependencies中自动加上xxx。</p>
<p>而在scripts中定义的脚本就直接可以在命令行中运行了，如果还弄不懂，可以看一下我的另一篇文章，如何制作自己的npm包</p>
</blockquote>
<h2 id="articleHeader7">node.js中自带的那些模块</h2>
<h3 id="articleHeader8">http模块</h3>
<blockquote>
<p>使用别人的模块，其实就是使用别人写好的方法(函数)，只需要搞清楚别人提供的方法是怎么用的就可以了，可以查node.js官网查api或者看看网上写的教程就好。</p>
<p>下面演示了一个最简单的http模块的使用方法，在当前目录下在命令行中输入node test.js，http会挂起一个监听，只需要在浏览器中输入<a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost</a>:8000，test.js就会跟浏览器返回<code>&lt;div&gt;hello world&lt;/div&gt;</code>显示在页面上：</p>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="test.js
var http = require('http')
var callBack = function(req, res) {
    res.write('<div>hello world</div>')
    res.end()
}
http.createServer(callBack).listen(8000)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code>test.js
var <span class="hljs-keyword">http</span> = <span class="hljs-built_in">require</span>(<span class="hljs-string">'http'</span>)
var callBack = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-title">req</span>, <span class="hljs-title">res</span>) {</span>
    res.<span class="hljs-built_in">write</span>(<span class="hljs-string">'&lt;div&gt;hello world&lt;/div&gt;'</span>)
    res.<span class="hljs-keyword">end</span>()
}
<span class="hljs-keyword">http</span>.createServer(callBack).listen(<span class="hljs-number">8000</span>)
</code></pre>
<h3 id="articleHeader9">url模块</h3>
<blockquote>
<p>在http模块的例子中传入了一个回调函数，两个参数分别是request和response，前者是浏览器传给我们的对象，后者是我们传给浏览器的对象。</p>
<p>其中req中包含了url这个属性，可以在回调函数中把它打印出来<code>console.log(req.url)</code>,加入你在浏览器中输入的是：<a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost</a>:8000/aaa/bbb?abc=3，那么打印出来的值是：/aaa/bbb?abc=3</p>
<p>在这里我们需要使用到的是/aaa/bbb和abc=3分开来的结果，node给我们提供了一个处理url的模块，就叫做url模块.当然如果你自己想处理这个url也是完全可以的，用正则表达式就可以，但是已经有现成的为啥不用呢</p>
<p>下面简单演示一下用法，在浏览器输入：<a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost</a>:8000/aaa/bbb?abc=3</p>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="test.js
var http = require('http')
var url = require('url')
var callBack = function(req, res) {
    var urlString = url.parse(req.url)
    var path = urlString.pathname
    var query = urlString.query
    console.log(path,query)//打印出/aaa/bbb abc=3
   res.write('<div>hello world</div>')
   res.end()
}
http.createServer(callBack).listen(8000)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code>test.js
<span class="hljs-built_in">var</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">'http'</span>)
<span class="hljs-built_in">var</span> <span class="hljs-built_in">url</span> = <span class="hljs-built_in">require</span>(<span class="hljs-string">'url'</span>)
<span class="hljs-built_in">var</span> callBack = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{
    <span class="hljs-built_in">var</span> urlString = <span class="hljs-built_in">url</span>.parse(req.url)
    <span class="hljs-built_in">var</span> path = urlString.pathname
    <span class="hljs-built_in">var</span> query = urlString.query
    <span class="hljs-built_in">console</span>.log(path,query)<span class="hljs-comment">//打印出/aaa/bbb abc=3</span>
   res.write(<span class="hljs-string">'&lt;div&gt;hello world&lt;/div&gt;'</span>)
   res.end()
}
http.createServer(callBack).listen(<span class="hljs-number">8000</span>)
</code></pre>
<h3 id="articleHeader10">fs模块</h3>
<blockquote><p>fs是一个提供文件操作功能的模块，可以对文件进行读写存删等操作，下面演示向浏览器返回本js的内容：</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="test.js
var http = require('http')
var fs = require('fs')
var callBack = function(req, res) {
    fs.readFile('./test.js', 'utf-8', function(err, data) {
        res.write(data)
        res.end()
    })
}
http.createServer(callBack).listen(8000)

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>test.js
<span class="hljs-keyword">var</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">'http'</span>)
<span class="hljs-keyword">var</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>)
<span class="hljs-keyword">var</span> callBack = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{
    fs.readFile(<span class="hljs-string">'./test.js'</span>, <span class="hljs-string">'utf-8'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, data</span>) </span>{
        res.write(data)
        res.end()
    })
}
http.createServer(callBack).listen(<span class="hljs-number">8000</span>)

</code></pre>
<h2 id="articleHeader11">用http模块、url模块、http模块搭建一个静态服务器</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var http = require('http')
var url = require('url')
var fs = require('fs')
var callBack = function(req, res) {
var pathname = url.parse(req.url).pathname
if (pathname == '/') {
    pathname = '/index.html'
}
fs.readFile('.' + pathname, 'utf-8', function(err, data) {
        if (err) {
            res.write('Error 404')
        } else {
            res.write(data)
        }
        res.end()
    }
)}
http.createServer(callBack).listen(8000)

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-built_in">var</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">'http'</span>)
<span class="hljs-built_in">var</span> <span class="hljs-built_in">url</span> = <span class="hljs-built_in">require</span>(<span class="hljs-string">'url'</span>)
<span class="hljs-built_in">var</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>)
<span class="hljs-built_in">var</span> callBack = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{
<span class="hljs-built_in">var</span> pathname = <span class="hljs-built_in">url</span>.parse(req.url).pathname
<span class="hljs-keyword">if</span> (pathname == <span class="hljs-string">'/'</span>) {
    pathname = <span class="hljs-string">'/index.html'</span>
}
fs.readFile(<span class="hljs-string">'.'</span> + pathname, <span class="hljs-string">'utf-8'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, data</span>) </span>{
        <span class="hljs-keyword">if</span> (err) {
            res.write(<span class="hljs-string">'Error 404'</span>)
        } <span class="hljs-title">else</span> {
            res.write(data)
        }
        res.end()
    }
)}
http.createServer(callBack).listen(<span class="hljs-number">8000</span>)

</code></pre>
<h2 id="articleHeader12">使用外部模块</h2>
<h3 id="articleHeader13">简单说明</h3>
<blockquote><p>外部模块都是第三方提供的模块，node.js默认是不提供的，所以需要用npm安装，这里提供package.json文件，只需要执行npm install 安装就行了，另外是管理MongoDB数据库的一个包，所以本地需要把MongoDB单独安装一下。</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="package.json
{
  &quot;dependencies&quot;: {
    &quot;cheerio&quot;: &quot;^1.0.0-rc.2&quot;,
    &quot;eventproxy&quot;: &quot;^1.0.0&quot;,
    &quot;express&quot;: &quot;^4.16.2&quot;,
    &quot;koa&quot;: &quot;^2.4.1&quot;,<!--koa是用来替代express的框架-->
    &quot;superagent&quot;: &quot;^3.8.1&quot;
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-class"><span class="hljs-keyword">package</span>.<span class="hljs-title">json</span>
{</span>
  <span class="hljs-string">"dependencies"</span>: {
    <span class="hljs-string">"cheerio"</span>: <span class="hljs-string">"^1.0.0-rc.2"</span>,
    <span class="hljs-string">"eventproxy"</span>: <span class="hljs-string">"^1.0.0"</span>,
    <span class="hljs-string">"express"</span>: <span class="hljs-string">"^4.16.2"</span>,
    <span class="hljs-string">"koa"</span>: <span class="hljs-string">"^2.4.1"</span>,&lt;!--koa是用来替代express的框架--&gt;
    <span class="hljs-string">"superagent"</span>: <span class="hljs-string">"^3.8.1"</span>
  }
}
</code></pre>
<h3 id="articleHeader14">express</h3>
<blockquote><p>express提供了基本的路由和静态文件访问的功能，当然还有其它的功能，这里主要演示它的基本使用<br>下面1,2,3都是设置public和files目录下为静态文件，可以直接通过文件路径访问，1、2可以同时存在，即可以指定几个目录均为静态文件目录，在指定目录为静态文件后，访问静态文件需要省略这个目录，比如访问public目录下的css/index.css：localhost:8000/css/index.css,直接省略了public，<br>可以通过3来指定替换目录名称的路径，通过3设置后，要访问public下的css/index.css：localhost:8000/public/css/index.css</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var express = require('express')
var app = express()
1. app.use(express.static('public'))
2. app.use(express.static('files'))
3. app.use('/static',express.static(public))
app.get('/', function (req, res) {
  res.send('Hello World');//一个回调方法对应一个路径
})
app.get('/user', function (req, res) {
  res.send('user');
})
app.listen(8000, function () {
  console.log('app is listening at port 3000');
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-keyword">var</span> express = <span class="hljs-keyword">require</span>(<span class="hljs-string">'express'</span>)
<span class="hljs-keyword">var</span> app = express()
<span class="hljs-number">1.</span> app.<span class="hljs-keyword">use</span>(express.<span class="hljs-keyword">static</span>(<span class="hljs-string">'public'</span>))
<span class="hljs-number">2.</span> app.<span class="hljs-keyword">use</span>(express.<span class="hljs-keyword">static</span>(<span class="hljs-string">'files'</span>))
<span class="hljs-number">3.</span> app.<span class="hljs-keyword">use</span>(<span class="hljs-string">'/static'</span>,express.<span class="hljs-keyword">static</span>(<span class="hljs-keyword">public</span>))
app.get(<span class="hljs-string">'/'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(req, res)</span> </span>{
  res.send(<span class="hljs-string">'Hello World'</span>);<span class="hljs-comment">//一个回调方法对应一个路径</span>
})
app.get(<span class="hljs-string">'/user'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(req, res)</span> </span>{
  res.send(<span class="hljs-string">'user'</span>);
})
app.listen(<span class="hljs-number">8000</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
  console.log(<span class="hljs-string">'app is listening at port 3000'</span>);
})
</code></pre>
<h3 id="articleHeader15">superagent、cheerio模块</h3>
<blockquote>
<p>superagent是一个可以发http请求的模块，回调函数中的res就是请求到的内容</p>
<p>cheerio是在服务器端类式jquery的框架，看代码应该能看出来</p>
<p>下面演示的是抓取糯米网的餐品列表链接</p>
</blockquote>
<p>var superagent = require('superagent')</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var cheerio = require('cheerio')
var spideUrl = 'https://t10.nuomi.com/pc/t10/index'
superagent.get(spideUrl)
    .end(function(err, res) {
        if (err) {
            return console.error(err);
        }
        var foodUrls = [];
        var $ = cheerio.load(res.text)
        // 获取首页所有的链接
        $('.j-item a').each(function(idx, element) {
            var $element = $(element)
            foodUrls.push($element.attr('href'))
        })
        console.log(topicUrls)
    })
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> cheerio = <span class="hljs-built_in">require</span>(<span class="hljs-string">'cheerio'</span>)
<span class="hljs-keyword">var</span> spideUrl = <span class="hljs-string">'https://t10.nuomi.com/pc/t10/index'</span>
superagent.get(spideUrl)
    .end(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, res</span>) </span>{
        <span class="hljs-keyword">if</span> (err) {
            <span class="hljs-keyword">return</span> <span class="hljs-built_in">console</span>.error(err);
        }
        <span class="hljs-keyword">var</span> foodUrls = [];
        <span class="hljs-keyword">var</span> $ = cheerio.load(res.text)
        <span class="hljs-comment">// 获取首页所有的链接</span>
        $(<span class="hljs-string">'.j-item a'</span>).each(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">idx, element</span>) </span>{
            <span class="hljs-keyword">var</span> $element = $(element)
            foodUrls.push($element.attr(<span class="hljs-string">'href'</span>))
        })
        <span class="hljs-built_in">console</span>.log(topicUrls)
    })
</code></pre>
<h3 id="articleHeader16">eventproxy</h3>
<blockquote><p>在爬取一堆类式的链接的时候，一个个链接写挺麻烦的，eventproxy提供了监听，然后触发回调的方式来处理这类问题，下面是我拷贝的一段代码，应该挺容易看懂的</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//得到一个 eventproxy 的实例
var ep = new eventproxy() 
// 命令 ep 重复监听 urls.length 次（在这里也就是 10 次） 
ep.after('topic_html', urls.length, function (topics) {
  topics = topics.map(function(page) {
    var $ = cheerio.load(page)
    var userId = $('.runUserName a font').eq(0).text()
    return userId
  });
  console.log(topics);
})
urls.forEach(function(item) {
  superagent.get(item)
    .end(function (err, res) {
      ep.emit('topic_html', res.text)
    })
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//得到一个 eventproxy 的实例</span>
<span class="hljs-keyword">var</span> ep = <span class="hljs-keyword">new</span> eventproxy() 
<span class="hljs-comment">// 命令 ep 重复监听 urls.length 次（在这里也就是 10 次） </span>
ep.after(<span class="hljs-string">'topic_html'</span>, urls.length, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">topics</span>) </span>{
  topics = topics.map(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">page</span>) </span>{
    <span class="hljs-keyword">var</span> $ = cheerio.load(page)
    <span class="hljs-keyword">var</span> userId = $(<span class="hljs-string">'.runUserName a font'</span>).eq(<span class="hljs-number">0</span>).text()
    <span class="hljs-keyword">return</span> userId
  });
  <span class="hljs-built_in">console</span>.log(topics);
})
urls.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">item</span>) </span>{
  superagent.get(item)
    .end(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err, res</span>) </span>{
      ep.emit(<span class="hljs-string">'topic_html'</span>, res.text)
    })
})
</code></pre>
<h2 id="articleHeader17">总结</h2>
<blockquote>
<p>大部分学习前端其实是没必要深入学习node.js的，一方面没那个精力，然后也没那么必要，但是一些基本的东西还是有必要好好学学的</p>
<p>大多数前端同学之所以觉得应该学前端，其实是平时接触到的npm、require模块、es6的语法等问题觉得比较棘手，以为是自己不懂node.js，其实这些和node.js并无太大关系，这些已经影响到学习前端其它内容的地方还是需要好好学习的</p>
<p>学习node.js基本的东西还是有必要的，比如搭建个简单的服务器，做点基本的逻辑处理和数据处理，做个爬虫啥的。而这些都很简单，看两篇博客做几个练习就够了，再深入就根据实际情况学习就好了。</p>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
入门node.js你必须知道的那些事

## 原文链接
[https://segmentfault.com/a/1190000012066000](https://segmentfault.com/a/1190000012066000)

