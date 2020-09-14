---
title: '几分钟的阅读让你明白node.JS的强大 走上web后端开发的道路 （一版）' 
date: 2018-12-20 2:30:10
hidden: true
slug: mwuasgnp1q9
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0"><strong>前言</strong></h2>
<p><strong>本文章主要写给那些想了解node语言的开发,我的目标希望大家通过阅读本篇文章能够简单使用node进行开发，以及了解一些事件驱动的异步编程风格,主要分<code>node的背景</code>,<code>安装配置</code>,<code>模块创建引用</code>等几个方面描述</strong></p>
<p><strong>建议大家在阅读本篇文章途中 可以<code>亲自</code>尝试一下我所带来的小例子，这样才能<code>更好</code>的掌握！</strong></p>
<h2 id="articleHeader1"><strong>背景</strong></h2>
<p><code>Node.js</code>,或者Node，是一个可以让<code>JavaScript 运行在服务器端的平台</code>。它可以让JavaScript 脱离浏览器的束缚运行在一般的服务器环境下，就像运行Python、Perl、PHP、Ruby程序一样。你可以用Node.js 轻松地进行服务器端应用开发，Python、Perl、PHP、Ruby 能做的事情Node.js 几乎都能做，而可以做得更好。</p>
<p>Node.js 是一个为<code>实时Web (Real-timeWeb) </code>应用开发而诞生的平台，它从诞生之初就充分考虑在<code>实时响应</code>、<code>超大规模数据要球下架构的可扩展性</code>。这使得它摒弃了传统平台依靠<code>多线程来实现高并发的设计思路</code>，而采用了<code>线程</code>、<code>异式I/O</code>、<code>事件驱动式</code>的程序设计模型。这些特性不仅带来了大的<code>性能提升</code>，还减少多线程程序设计的复杂性，进而提高了开发效率。Node.js 最初是由Ryan Dahl 发起的开源项目，后来被Joyent 公司注意到。Joyent 公司将Ryan Dahl 招人旗下,因此现在的Node.js 由Joyent 公司管理并维护。尽管它诞生的时间( 2009年) 还不长，但它的周围配经形成了一个庞大的生态系统。Nodejs 有着强大而灵活的包管理器<code>(nodepackagemanager,npm)</code>,目前已经有上万个第三方模块，其中有网站开发框架，有MySQL、PostgreSQL、MongoDB 数据库接口,有模板语言解析、CSS 生成T 具邮件、加密、图形、调试支持，甚至还有图形用户界面和操作系统API 具。由VMware 公司建立的云计算平台CloudFoundry 率先支持了Node.js。2011年6月，微软宣布与Joyent 公司合作，将Node.js 移植到Windows,同时Windows Azure 云计算平台也支持Node.js。Node.js 目前还处在迅速发展阶段，相信在不久的未来它一定会成为流行的Web应用开发平台。</p>
<p><strong>让我们从现在开始，一同探索Node.js 的美妙世界吧!</strong></p>
<h2 id="articleHeader2">安装配置</h2>
<p>在<strong>window</strong>上面很容易安装node 只需要访问<a href="http://nodejs.org" rel="nofollow noreferrer" target="_blank">node官网</a>，点击<strong>DownLoad链接</strong>，然后选择<strong>window Installer</strong>，下载安装包，下载完成后打开 点击<strong>Next</strong> 如图，就可以安装完成</p>
<p><span class="img-wrap"><img data-src="/img/bV0YhA?w=417&amp;h=325" src="https://static.alili.tech/img/bV0YhA?w=417&amp;h=325" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>为了检测安装是否完成，<strong>打开命令行CMD</strong>，然后输入node 如果下载成功 便进入node交互模式 如图：</p>
<p><span class="img-wrap"><img data-src="/img/bV0Yh8?w=516&amp;h=302" src="https://static.alili.tech/img/bV0Yh8?w=516&amp;h=302" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>通过这种方式安装还会自带<strong>NPM</strong> 我们可以直接在使用它！</p>
<p><strong>Mac OS X上安装Node.js</strong><br>只需要访问<a href="http://nodejs.org" rel="nofollow noreferrer" target="_blank">node官网</a>，点击<strong>DownLoad链接</strong>，然后选择<strong>Macintosh Installer</strong>，下载安装包，下载完成后运行安装包，根据提示完成安装：</p>
<p><span class="img-wrap"><img data-src="/img/bV0YFm?w=447&amp;h=325" src="https://static.alili.tech/img/bV0YFm?w=447&amp;h=325" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><strong>node和npm都会安装到/usr/local/bin目录下，安装过程需要管理员权限，安装完后在终端输入node回车进入node交互模式，如果提示-bash：node ：command not found  那就是没有已正确的方式安装完成。需要重新安装</strong></p>
<h2 id="articleHeader3">安装完成之后 练习一下</h2>
<p>进入node交互环境</p>
<ol>
<li>consoloe.log('hello,node.js')       <br>   输出 //       hello,node.js</li>
<li>1 + 2    <br>  输出  // 3</li>
</ol>
<p>可以进行<code>加减乘除</code> 运算 </p>
<p><em>接下来创建一下第一个应用  也可以叫模块 ！</em><br>打开你所常用的文本编辑器输入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" var http = require('http');  //通过require对象（指令）来引用http模块
                   //参数request代表是发送请求对象    response代表是响应请求的对象
 http.createServer(function(request,response){ //通过http对象的方法createServer创建一个服务器
    res.writeHead(200, {'Content-Type': 'text/html'}); //规定数据的content-type文本类型为text/html
    res.write('<h1>Node.js</h1>');  //响应请求然后write 字体大小为h1标准的node.js字样
    res.end('<p>Hello World</p>');   //发送响应数据为 hello world；
 }).listen(8888);  //该服务监听本地host 端口8888 
 
 console.log('Server running at http://127.0.0.1:8888/'); //在终端告诉用户该服务运行与8888端口" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code> <span class="hljs-keyword">var</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">'http'</span>);  <span class="hljs-comment">//通过require对象（指令）来引用http模块</span>
                   <span class="hljs-comment">//参数request代表是发送请求对象    response代表是响应请求的对象</span>
 http.createServer(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">request,response</span>)</span>{ <span class="hljs-comment">//通过http对象的方法createServer创建一个服务器</span>
    res.writeHead(<span class="hljs-number">200</span>, {<span class="hljs-string">'Content-Type'</span>: <span class="hljs-string">'text/html'</span>}); <span class="hljs-comment">//规定数据的content-type文本类型为text/html</span>
    res.write(<span class="hljs-string">'&lt;h1&gt;Node.js&lt;/h1&gt;'</span>);  <span class="hljs-comment">//响应请求然后write 字体大小为h1标准的node.js字样</span>
    res.end(<span class="hljs-string">'&lt;p&gt;Hello World&lt;/p&gt;'</span>);   <span class="hljs-comment">//发送响应数据为 hello world；</span>
 }).listen(<span class="hljs-number">8888</span>);  <span class="hljs-comment">//该服务监听本地host 端口8888 </span>
 
 <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Server running at http://127.0.0.1:8888/'</span>); <span class="hljs-comment">//在终端告诉用户该服务运行与8888端口</span></code></pre>
<p><strong>保存为hello.js</strong></p>
<p>然后你打开当前目录,打开命令行输入 node hello.js 你就会在命令行处看到Server running at <a href="http://127.0.0.1" rel="nofollow noreferrer" target="_blank">http://127.0.0.1</a>:8888/ ,然后就可以打开浏览器输入这个<a href="http://127.0.0.1" rel="nofollow noreferrer" target="_blank">http://127.0.0.1</a>:8888/ 就可以看到刚才写的响应数据</p>
<p><strong>**是不是特别简单！！！！！</strong></p>
<h2 id="articleHeader4"><strong>模块的创建与引用</strong></h2>
<p>学习node.JS必须懂的一些地方</p>
<ol>
<li><strong>什么是模块?</strong></li>
<li><strong>如何创建并加载模块?</strong></li>
<li><strong>如何创建一个包?</strong></li>
<li><strong>如何使用包管理?</strong></li>
</ol>
<p>这次先讲前俩点，和稍微渗透3 4 点</p>
<p><strong>第一点！</strong><br>模块是Node.js应用程序的基本组成部分，文件和模块是一一对应的。换句话说，一个Node.js文件就是一个模块，这个文件可能是JavaScript代码,JSON或者编译过的C/C++扩展。</p>
<p>var http= require('http'),其中http是Node.js的一个核心模块，其内部是用C++实现的，外部用Javascript封装。我们通过require函数获取这个模块 ，从而才能使用其中的对象。</p>
<p><strong>第二点！</strong><br>在Node.js,创建一个模块非常简单，因为一个文件就是一个模块，我们要关注的问题仅仅只是如何在其他文件获取这个模块，Node.js提供了exports和require俩个对象，其中exports是模块公开的接口，require用于从外部获取一个模块的接口，即获取模块的exports对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 创建模块
//module.js

var name;
exports.setName = function(thyName){
    name = thyName;
}

exports.sayHello = function() {
    console.log('hello' + name)
}

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code>// 创建模块
//<span class="hljs-keyword">module</span>.js

var <span class="hljs-keyword">name</span>;
exports.setName = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(thyName)</span></span>{
    <span class="hljs-keyword">name</span> = thyName;
}

exports.sayHello = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span> {
    console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'hello'</span> + <span class="hljs-keyword">name</span>)
}

</code></pre>
<p>同级目录下创建getmodule.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//引入模块
// getmodule.js

var myModule = require('./module');
myModule.setName('zhangsan');
myModule.sayHello();

在命令行运行node getmodule.js   输出// hello zhangsan
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">//引入模块</span>
<span class="hljs-comment">// getmodule.js</span>

<span class="hljs-keyword">var</span> myModule = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./module'</span>);
myModule.setName(<span class="hljs-string">'zhangsan'</span>);
myModule.sayHello();

在命令行运行node <span class="hljs-keyword">get</span><span class="hljs-built_in">module</span>.js   输出<span class="hljs-comment">// hello zhangsan</span>
</code></pre>
<p>以上该例子中,module.js通过exports对象吧setName 和 sayHello作为模块的访问接口，在getmodule.js中通过<br>require（'./module'）加载这个模块，然后就可以之间访问module.js中exports对象的成员函数了 </p>
<p><strong>require 不会重复加载模块,无论调用多少次require,获得的模块都是同一个,修改一下上面的getmodule.js</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//修改getmodule.js 
var hello1 = require('./module');
hello1.setName('zhangsan');

var hello2 = require('./module');
hello2.setName('zhangsan2');

hello1.sayHello(); // 输出结果为zhangsan2!
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//修改getmodule.js </span>
<span class="hljs-keyword">var</span> hello1 = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./module'</span>);
hello1.setName(<span class="hljs-string">'zhangsan'</span>);

<span class="hljs-keyword">var</span> hello2 = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./module'</span>);
hello2.setName(<span class="hljs-string">'zhangsan2'</span>);

hello1.sayHello(); <span class="hljs-comment">// 输出结果为zhangsan2!</span>
</code></pre>
<p>因为变量hello1和变量hello2执行都是同一个实例,因此hello1.setName的结果被hello2.setName覆盖!结果由后者决定</p>
<p>把一个对象封装到模块中 例如:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
//hello.js

function hello (){
  var name;
  
  this.setName = function(thyName) {
    name = thyName;
  }
  
  this.sayHello = function() {
     console.log('hello' + name);
  }

 };
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>
<span class="hljs-comment">//hello.js</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">hello</span> (<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">var</span> name;
  
  <span class="hljs-keyword">this</span>.setName = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">thyName</span>) </span>{
    name = thyName;
  }
  
  <span class="hljs-keyword">this</span>.sayHello = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
     <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'hello'</span> + name);
  }

 };
</code></pre>
<p>module.exports = Hello;  //导出该模块接口; 如果按导出方法哪有 exports.Hello = Hello 引入require('./hello').Hello;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 按上面module.exports = Hello导出 引入模块;
 

 //getHello.js

 var Hello = require('./hello');
 hello = new Hello();
 hello.setName = ('zhangsan');
 hello.sayHello(); //输出hello zhangsan
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code> 按上面<span class="hljs-built_in">module</span>.exports = Hello导出 引入模块;
 

 <span class="hljs-comment">//getHello.js</span>

 <span class="hljs-keyword">var</span> Hello = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./hello'</span>);
 hello = <span class="hljs-keyword">new</span> Hello();
 hello.setName = (<span class="hljs-string">'zhangsan'</span>);
 hello.sayHello(); <span class="hljs-comment">//输出hello zhangsan</span>
</code></pre>
<p><strong>第三点 /创建包</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 包是在模块基础上更深一步的抽象,Node.js的包类型与C/C++的函数库或者Java/.Net的类库.将某个独立的功能封装起来,用于发布" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code style="word-break: break-word; white-space: initial;"> 包是在模块基础上更深一步的抽象,<span class="hljs-keyword">Node</span>.<span class="hljs-title">js</span>的包类型与C/C++的函数库或者Java/.Net的类库.将某个独立的功能封装起来,用于发布</code></pre>
<p>更新,依赖管理和版本控制.Node.js根据CommonJS规范实现了包机制,开发了npm来解决包发布和获取;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" node.js的包就是一个目录,包含一个JSON格式的包说明文件package.json.   package.json必须在包的顶层目录下,其他遵循CommonJS的规范不是特别严格
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code> <span class="hljs-keyword">node</span>.<span class="hljs-title">js</span>的包就是一个目录,包含一个JSON格式的包说明文件package.json.   package.json必须在包的顶层目录下,其他遵循CommonJS的规范不是特别严格
</code></pre>
<p><strong>第四点 /包管理</strong></p>
<p>node.js包管理，即npm是Node.js官方提供的包管理工具，它已经成为了Node.js包的标准发布平台，npm提供了命令行工具，你可以很方便去下载 安装 升级 删除包！ 也可以发布 维护你自己的包！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   npm install（i） pagejson_name //下载的格式 本地模式  末尾加-g (--global) 就是全局模式
   
   npm uninstall  pagejson_name //删除的格式  末尾加-g (--global) 就是全局模式
   
   //等等很多命令 可以去搜索 就不一一列举了
   
   
   
   

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>   <span class="hljs-built_in">npm</span> install（i） pagejson_name <span class="hljs-regexp">//</span>下载的格式 本地模式  末尾加-g (--<span class="hljs-built_in">global</span>) 就是全局模式
   
   <span class="hljs-built_in">npm</span> uninstall  pagejson_name <span class="hljs-regexp">//</span>删除的格式  末尾加-g (--<span class="hljs-built_in">global</span>) 就是全局模式
   
   <span class="hljs-regexp">//</span>等等很多命令 可以去搜索 就不一一列举了
   
   
   
   

</code></pre>
<h2 id="articleHeader5">待续！！</h2>
<p><strong>本来应该把node一些核心模块一块说了的 比如全局对象 process console  事件驱动events  事件发射器 error事件 继承EventEmitter 等等</strong> <br>但是今天确实身体不适，还请谅解，可能会休息几天 所以提前把这版发出来，暂时把他定位为第一版 对于node的探索，我还会更新 第二版的，下一章节除了会补全这次没有讲到了还会带大家利用node来进行web开发！初步定稿为1月2号！</p>
<ul>
<li>http 与express 安装与搭建</li>
<li>路由的控制 如工作原理 创建路由规则等等</li>
<li>模板引擎 什么是?怎么使用?如何利用布局?等等</li>
</ul>
<h2 id="articleHeader6">结语</h2>
<p>希望大家可以通过看这篇文章能有收获，最简单的证明就是把项目用到node的配置文件再去拿出来看看，最起码知道它是怎么个流程，不一定知道它干什么，但是知道它从哪来 是导出还说引用！这就是进步！</p>
<p>//进一步学习参考这篇书 学习<br><a href="https://www.nodebeginner.org/" rel="nofollow noreferrer" target="_blank">https://www.nodebeginner.org/</a></p>
<h2 id="articleHeader7">不要做幻想的乞丐，要做幸福的创造者！！！</h2>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
几分钟的阅读让你明白node.JS的强大 走上web后端开发的道路 （一版）

## 原文链接
[https://segmentfault.com/a/1190000012588575](https://segmentfault.com/a/1190000012588575)

