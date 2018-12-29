---
title: 'Node.js作为中间层实现简单的前后端分离' 
date: 2018-12-30 2:30:10
hidden: true
slug: 0yntvw8o53q
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">零、用koa2实现前后端分离的点赞＋1的功能（欢迎clone和star）</h3>
<p>Github：<a href="https://github.com/pengxiaohua/praise-by-koa" rel="nofollow noreferrer" target="_blank">https://github.com/pengxiaohua/praise-by-koa</a><br>简书：<a href="http://www.jianshu.com/p/c3215333655a" rel="nofollow noreferrer" target="_blank">http://www.jianshu.com/p/c3215333655a</a></p>
<h3 id="articleHeader1">一、前后端不分离存在什么问题</h3>
<p>之前做一个Python+django+jQuery项目时候，经常碰到很尴尬的问题，前后端想分离，却始终分不开，或者说是分的不彻底，前端代码的开发总是要依赖Python的环境，环境崩溃了或者缺个插件，项目起不来，前端看不到页面效果，没法开发。<br>如果硬生生的把前端代码从整个项目中拉出来，单独开发，那前后端开发完，还是需要合并代码联调，还是得合在一起解决问题，开发效率很低。<br>前后端俨然成了牛郎织女一般，断了连，连了断，强行拆开，也想偷偷幽会，捉急呀。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011382417" src="https://static.alili.tech/img/remote/1460000011382417" alt="前后端如漆似胶.jpg" title="前后端如漆似胶.jpg" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader2">二、为什么要前后端分离</h3>
<h5>1、开发效率高</h5>
<p>前端开发人员不用苦苦地配置各种后端环境，安装各种莫名的插件，摆脱对后端开发环境的依赖，一门心思写前端代码就好，后端开发人员也不用时不时的跑去帮着前端配环境。</p>
<h5>2、职责清晰，找bug方便</h5>
<p>以前有了bug，前端推后端，后端推前端，不知道该谁去该，前后端分离，是谁的问题就该谁去处理，处理问题方便很多，后期代码重构方便，做到了高可维护性。</p>
<h3 id="articleHeader3">三、怎么实现前后端分离</h3>
<ul>
<li>前端：负责View和Controller层路由的分发</li>
<li>后端：只负责Model层，业务和数据处理等</li>
</ul>
<p>最近一段时间学习了Node.js和koa框架后，总的来说Node.js优点还是挺多的：</p>
<ul>
<li>都是js，前端熟悉的语言，学习成本低</li>
<li>事件驱动，非阻塞I/O</li>
<li>适合IO密集型业务</li>
</ul>
<p>现在决定尝试一下用Node.js作为中间层，PHP写后端简单的接口，Node.js封装PHP接口，前端axois请求封装后的接口，将需要的数据返回到对应的view层页面，既解决了跨域问题（Node.js作为服务端，服务端没有跨域一说），同时又不需要配后端环境，只需要一个PHP接口。基本逻辑如下图所示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011382418" src="https://static.alili.tech/img/remote/1460000011382418" alt="Node.js作为中间层作用" title="Node.js作为中间层作用" style="cursor: pointer; display: inline;"></span></p>
<p>对此做了一个<a href="https://github.com/pengxiaohua/praise-by-koa" rel="nofollow noreferrer" target="_blank">点赞+1的Demo</a>，逻辑不复杂，但达到了Node.js作为中间层实现前后端分离的目的。</p>
<p>Github：<a href="https://github.com/pengxiaohua/news-responsive-by-react" rel="nofollow noreferrer" target="_blank">https://github.com/pengxiaohua/praise-by-koa</a></p>
<h5>1、截图：</h5>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011382419" src="https://static.alili.tech/img/remote/1460000011382419" alt="点赞+1截图" title="点赞+1截图" style="cursor: pointer; display: inline;"></span></p>
<h5>2、功能介绍</h5>
<ul>
<li>用PHP+MySQL完成点赞接口，实现用户点击一次更新数据库点赞总数+1</li>
<li>用koa2+ES6封装PHP点赞接口，并建立路由。</li>
<li>将<a href="https://github.com/pengxiaohua/praise" rel="nofollow noreferrer" target="_blank">praise</a>项目迁移进入koa2，通过index/index路由进行访问</li>
<li>将用户点击事件通过axios连接到koa2点赞接口</li>
<li>对用户连续点击事件进行稀释(或叫节流)</li>
<li>基本测试：完成点赞接口的自动化测试(mocha)、点赞+1功能的自动化测试(karma)、真实页面的点击自动化测试(selenium-webdriver)</li>
</ul>
<h5>3、项目代码结构</h5>
<p>为了适配更多浏览器，代码中和.es6后缀的文件同名的.js文件是babel转码后的es5文件，这里省掉了对应的.js文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├── app.es6                        <-- node启动页面
├── config
│&nbsp;&nbsp; ├── config.es6                 <-- 配置端口号、文件名
├── controller
│&nbsp;&nbsp; ├── indexController.es6        <-- 创建路由
│&nbsp;&nbsp; ├── initController.es6         <-- 分发路由
├── karma.conf.js                  <-- karma配置文件
├── models
│&nbsp;&nbsp; ├── model.es6                  <-- 后端php接口的封装
├── public
│&nbsp;&nbsp; ├── css
│&nbsp;&nbsp; │&nbsp;&nbsp; └── main.css               <-- css文件
│&nbsp;&nbsp; └── js
│&nbsp;&nbsp;     ├── connect-api.es6        <-- axois连接koa点赞接口
│&nbsp;&nbsp;     ├── index.es6              <-- 点赞+1
│&nbsp;&nbsp;     ├── thumb.es6              <-- 实例化index.es6
├── server
│&nbsp;&nbsp; ├── db.php
│&nbsp;&nbsp; ├── get_count.php              <-- 获取当前点赞数原始php接口
│&nbsp;&nbsp; └── post_count.php             <-- 点赞+1原始php接口
├── test
│&nbsp;&nbsp; ├── e2e.js                     <-- 端对端自动化测试
│&nbsp;&nbsp; ├── geckodriver                <-- 端对端自动化测试Firefox启动程序
│&nbsp;&nbsp; ├── index.spec.js              <-- 点赞+1功能自动化测试
│&nbsp;&nbsp; ├── server.es6                 <-- 点赞+1接口测试
└── views
    ├── index.html                 <-- 主页面
    └── layout.html                <-- 模板" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code class="shell">├── app<span class="hljs-selector-class">.es6</span>                        &lt;-- node启动页面
├── config
│&nbsp;&nbsp; ├── config<span class="hljs-selector-class">.es6</span>                 &lt;-- 配置端口号、文件名
├── controller
│&nbsp;&nbsp; ├── indexController<span class="hljs-selector-class">.es6</span>        &lt;-- 创建路由
│&nbsp;&nbsp; ├── initController<span class="hljs-selector-class">.es6</span>         &lt;-- 分发路由
├── karma<span class="hljs-selector-class">.conf</span><span class="hljs-selector-class">.js</span>                  &lt;-- karma配置文件
├── models
│&nbsp;&nbsp; ├── model<span class="hljs-selector-class">.es6</span>                  &lt;-- 后端php接口的封装
├── public
│&nbsp;&nbsp; ├── css
│&nbsp;&nbsp; │&nbsp;&nbsp; └── main<span class="hljs-selector-class">.css</span>               &lt;-- css文件
│&nbsp;&nbsp; └── js
│&nbsp;&nbsp;     ├── connect-api<span class="hljs-selector-class">.es6</span>        &lt;-- axois连接koa点赞接口
│&nbsp;&nbsp;     ├── index<span class="hljs-selector-class">.es6</span>              &lt;-- 点赞+<span class="hljs-number">1</span>
│&nbsp;&nbsp;     ├── thumb<span class="hljs-selector-class">.es6</span>              &lt;-- 实例化index<span class="hljs-selector-class">.es6</span>
├── server
│&nbsp;&nbsp; ├── db<span class="hljs-selector-class">.php</span>
│&nbsp;&nbsp; ├── get_count<span class="hljs-selector-class">.php</span>              &lt;-- 获取当前点赞数原始php接口
│&nbsp;&nbsp; └── post_count<span class="hljs-selector-class">.php</span>             &lt;-- 点赞+<span class="hljs-number">1</span>原始php接口
├── test
│&nbsp;&nbsp; ├── e2e<span class="hljs-selector-class">.js</span>                     &lt;-- 端对端自动化测试
│&nbsp;&nbsp; ├── geckodriver                &lt;-- 端对端自动化测试Firefox启动程序
│&nbsp;&nbsp; ├── index<span class="hljs-selector-class">.spec</span><span class="hljs-selector-class">.js</span>              &lt;-- 点赞+<span class="hljs-number">1</span>功能自动化测试
│&nbsp;&nbsp; ├── server<span class="hljs-selector-class">.es6</span>                 &lt;-- 点赞+<span class="hljs-number">1</span>接口测试
└── views
    ├── index<span class="hljs-selector-class">.html</span>                 &lt;-- 主页面
    └── layout<span class="hljs-selector-class">.html</span>                &lt;-- 模板</code></pre>
<p><strong>server</strong>文件夹，存放的是php接口代码文件，为了方便查看放到了项目中，其实是可以任意放到其他地方，或者其他服务器上的，只需要给出后端接口地址就行。<br><strong>models</strong>文件夹，存放的代码是ES6和koa对后端接口的封装<br><strong>controller</strong>文件夹，存放的代码是对路由的处理<br><strong>public</strong>文件夹，存放的代码是css和js<br><strong>views</strong>文件夹，存放的代码是模板文件和html主页<br><strong>config</strong>文件夹，存放的是配置端口号和文件名的代码<br><strong>test</strong>文件夹，存放的是测试代码</p>
<h5>4、安装</h5>
<h6>① clone the repo</h6>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ git clone https://github.com/pengxiaohua/news-responsive-by-react.git
$ cd news-responsive-by-react" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code class="shell">$ git clone https:<span class="hljs-type"></span>//github.com/pengxiaohua/<span class="hljs-keyword">new</span><span class="hljs-type">s</span>-responsive-by-react.git
$ cd <span class="hljs-keyword">new</span><span class="hljs-type">s</span>-responsive-by-react</code></pre>
<h6>② Install dependencies</h6>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code class="shell" style="word-break: break-word; white-space: initial;">$ npm <span class="hljs-keyword">install</span></code></pre>
<h5>5、启动</h5>
<p>此项目在XAMPP环境下运行的php接口和数据库,开启Apache服务器</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="localhost:8080" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code class="shell" style="word-break: break-word; white-space: initial;"><span class="hljs-symbol">localhost:</span><span class="hljs-number">8080</span></code></pre>
<p>MySQL数据库创建：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="('localhost','root','','praise',3506)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scheme"><code class="shell" style="word-break: break-word; white-space: initial;">(<span class="hljs-symbol">'localhost</span>',<span class="hljs-symbol">'root</span>','',<span class="hljs-symbol">'praise</span>',<span class="hljs-number">3506</span>)</code></pre>
<p>数据库名praise，接口3506，表名praise_count，2个字段‘id’和‘count’，id默认值为1，count默认值为0<br>浏览器输入：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="http://localhost:8081/index/index" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code class="shell" style="word-break: break-word; white-space: initial;">http://localhos<span class="hljs-variable">t:8081</span>/<span class="hljs-built_in">index</span>/<span class="hljs-built_in">index</span></code></pre>
<h5>6、测试</h5>
<h6>① 点赞+1功能自动化测试</h6>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="karma start" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code class="shell" style="word-break: break-word; white-space: initial;">karma <span class="hljs-literal">start</span></code></pre>
<h6>② 点赞+1接口自动化测试</h6>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd test
 mocha server.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code class="shell"><span class="hljs-built_in">cd</span> <span class="hljs-built_in">test</span>
 mocha server.js</code></pre>
<h6>③端对端测试</h6>
<p>使用的是&nbsp;<a href="https://www.npmjs.com/package/selenium-webdriver" rel="nofollow noreferrer" target="_blank">selenium-webdriver</a>，安装<a href="https://github.com/mozilla/geckodriver/releases/" rel="nofollow noreferrer" target="_blank">浏览器启动程序</a>这里选择的是Firefox启动程序geckodriver macos v0.18.0版本,下载解压后和测试文件e2e.js放在一个目录下，开始测试<br>开启2个终端窗口<br>一个开启服务：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="node app.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code class="shell" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">node</span> <span class="hljs-title">app</span>.js</code></pre>
<p>另一个窗口测试：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd test
node e2e.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code class="shell">cd test
<span class="hljs-keyword">node</span> <span class="hljs-title">e2e</span>.js</code></pre>
<h5>7、最后</h5>
<p>想down下代码在本地试试的童鞋，可以进<a href="https://github.com/pengxiaohua/praise-by-koa" rel="nofollow noreferrer" target="_blank">我的github</a>下载，别忘了star哟。<br>有问题欢迎随时留言。</p>
<h3 id="articleHeader4">四、总结：</h3>
<p>Node.js作为中间层实现前后端分离后：</p>
<table>
<thead><tr>
<th align="left">前端</th>
<th align="left">前端</th>
<th align="left">后端</th>
</tr></thead>
<tbody>
<tr>
<td align="left">浏览器</td>
<td align="left">服务器</td>
<td align="left">服务器</td>
</tr>
<tr>
<td align="left">HTML+CSS+JavaScript</td>
<td align="left">Node.js</td>
<td align="left">PHP(或其他后端语言)</td>
</tr>
<tr>
<td align="left">跑在浏览器上的JS</td>
<td align="left">跑在服務器上的JS</td>
<td align="left">服务层</td>
</tr>
<tr>
<td align="left">CSS、JS加载运行</td>
<td align="left">转发数据，串接服务</td>
<td align="left">提供数据接口</td>
</tr>
<tr>
<td align="left">DOM操作</td>
<td align="left">路由设计，控制逻辑</td>
<td align="left">维持数据稳定</td>
</tr>
<tr>
<td align="left">公用模板、路由</td>
<td align="left">渲染页面，体验优化</td>
<td align="left">封装业务逻辑</td>
</tr>
</tbody>
</table>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Node.js作为中间层实现简单的前后端分离

## 原文链接
[https://segmentfault.com/a/1190000011382412](https://segmentfault.com/a/1190000011382412)

