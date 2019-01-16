---
title: 'Electron + Vue 实现一个代理客户端' 
date: 2019-01-17 2:30:25
hidden: true
slug: 07h13yqreyrr
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>开源项目地址：<a href="https://github.com/fwon/electron-anyproxy" rel="nofollow noreferrer" target="_blank">戳我</a></p></blockquote>
<h3 id="articleHeader0">原理</h3>
<p>作为一个合格的前端工程师，你一定用过Fiddler或Charles之类的抓包工具。但是在Mac上做开发时，相关的抓包工具很多是收费的。当你费劲心思下载到了破解版，却还是难以忍受其丑陋的win风格界面和令人悲伤的闪退问题。有没有想过自己来实现一个代理客户端呢？其实这个真的可以有。</p>
<h4>中间人</h4>
<p>一个http代理服务器的原理很简单。有了Nodejs作为武器，创建一个代理服务器就是分分钟的事。具体可参见jerryQu写的两篇文章 <a href="https://imququ.com/post/web-proxy.html" rel="nofollow noreferrer" target="_blank">《HTTP 代理原理及实现（一）》</a> <a href="https://imququ.com/post/web-proxy-2.html" rel="nofollow noreferrer" target="_blank">《HTTP 代理原理及实现（二）》</a> 文章对HTTP代理的原理和实践讲得比较清楚。</p>
<p>简单来讲就是要实现一个中间人，用户通过设置代理，网络请求就会通过中间人代理，再发往正式服务器。</p>
<p>这种中间人的实现方式有两种。</p>
<p>一种为普通的HTTP代理，通过Node.js开启一个HTTP服务，并将我们的浏览器或手机设置到该服务所在的ip和端口，那么HTTP流量就会经过该代理，从而实现数据的拦截。</p>
<p><span class="img-wrap"><img data-src="https://raw.githubusercontent.com/fwon/blog/master/assets/electron-vue-1.png" src="https://static.alili.techhttps://raw.githubusercontent.com/fwon/blog/master/assets/electron-vue-1.png" alt="pic" title="pic" style="cursor: pointer; display: inline;"></span></p>
<p>对于非HTTP请求，比如HTTPS, 或其他应用层请求。可以通过在Node.js 中开启一个TCP服务，监听CONNECT请求，因为应用层也是基于传输层的，所以数据在到达应用层之前会首先经过传输层，从而我们能实现传输层数据监听。</p>
<p><span class="img-wrap"><img data-src="https://raw.githubusercontent.com/fwon/blog/master/assets/electron-vue-2.png" src="https://static.alili.techhttps://raw.githubusercontent.com/fwon/blog/master/assets/electron-vue-2.png" alt="pic" title="pic" style="cursor: pointer;"></span></p>
<p>但是对于CONNECT捕抓到的请求，无法获取到HTTP相关的信息，包括头信息等，这对一般的前端分析作用不大，那么想要真正监听HTTPS，还需要支持证书相关的验证。</p>
<h4>证书</h4>
<p>假设我们是通过浏览器设置代理进行抓包实验（或全局代理），在这个过程中我们主要关注的是浏览器和代理服务器之间的交互，这个过程大概如下：</p>
<ol>
<li><p>浏览器客户端发出了一个请求，该请求会首先经过代理服务器。</p></li>
<li><p>代理服务器获取到客户端请求，知道了真实服务器的地址，它可能会做一些手脚，比如对请求数据进行修改，再发往真实服务器，获取到数据再返回给浏览器（利用这一点能实现跨域支持等）。或者代理服务器压根就不会请求真实服务器，而是直接伪造一份假数据给浏览器（利用这一点能实现接口mock）。</p></li>
<li><p>浏览器接收到数据，并返回给用户，显示在页面。</p></li>
</ol>
<p>上面这三步在HTTP中会无比流畅，然而如果请求是HTTPS，浏览器会验证代理服务器的安全性。这里会涉及到TLS握手的过程，其中也包括了证书的验证。</p>
<p>代理服务器返回HTTPS请求时，需要将对应请求域名的证书发给浏览器，浏览器再向本地的CA根证书验证域名证书的安全性。如果验证通过，则继续后续请求，验证失败浏览器会返回安全警告。</p>
<p><span class="img-wrap"><img data-src="https://raw.githubusercontent.com/fwon/blog/master/assets/electron-vue-3.png" src="https://static.alili.techhttps://raw.githubusercontent.com/fwon/blog/master/assets/electron-vue-3.png" alt="pic" title="pic" style="cursor: pointer;"></span></p>
<p>这里提到了两个证书，一个是域名证书，一个是CA根证书。</p>
<p><strong>域名证书</strong> 是每个支持HTTPS网站都需要有的一份证书，用于客户端验证该网站的安全性，而该证书通常是通过安全机构申请的，这个机构就是 <strong>CA（Certificate Authority，证书颁发机构）</strong>。在每台用户计算机的操作系统或浏览器中，都会保存一份CA列表，也就是有多个根证书，不同CA分别包含了不同的域名证书，浏览器在获取到域名证书之后，会向CA根证书进行验证，如果验证通过则能正常收发请求。</p>
<p>对于代理服务器来说，我们并没有合法的域名证书（证书只存在真实目标服务器，无法获取到），怎么让浏览器相信我们是个安全的代理（服务器）呢？答案是————伪造！</p>
<p>没错，我们既要伪造域名证书，也要伪造根证书。其实根证书是可以自己签发的。下面两条命令首先生成了一个私钥，然后利用私钥生成crt证书，我们只要双击crt文件进行安装，并设置为信任，就成功建立了一个本地根证书。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="openssl genrsa -out private.pem 2048
openssl req -new -x509 -key private.pem -out public.crt -days 99999" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code>openssl genrsa -<span class="hljs-keyword">out</span> <span class="hljs-keyword">private</span>.pem <span class="hljs-number">2048</span>
openssl req -<span class="hljs-keyword">new</span> -x509 -key <span class="hljs-keyword">private</span>.pem -<span class="hljs-keyword">out</span> <span class="hljs-keyword">public</span>.crt -days <span class="hljs-number">99999</span></code></pre>
<p>利用根证书，我们能够签发更多的域名证书。证书是链式验证的，验证域名证书的时候，会往上验证CA根证书，由于CA根证书已经被我们本地信任了，所以浏览器也会信任该域名证书，成功返回代理服务器的数据。</p>
<p><span class="img-wrap"><img data-src="https://raw.githubusercontent.com/fwon/blog/master/assets/electron-vue-4.png" src="https://static.alili.techhttps://raw.githubusercontent.com/fwon/blog/master/assets/electron-vue-4.png" alt="pic" title="pic" style="cursor: pointer;"></span></p>
<p>具体的操作流程是这样的，首先利用Node.js 生成AnyProxy CA证书，并手动信任。浏览器往cn.vuejs.org发出请求，代理服务器拦截到请求，知道请求是发往cn.vuejs.org，在返回数据之前，利用AnyProxy证书动态签发cn.vuejs.org域名证书，放于本地（用于下次请求，这里省去了中间证书的步骤），同时将该域名证书返回给浏览器。那么浏览器在接受到cn.vuejs.org域名证书后，往证书链上寻找到根证书AnyProxy，并通过AnyProxy证书验证域名证书是否受信任，同时还要检查域名证书的有效性，包括过期时间等。由于域名证书是我们通过AnyProxy动态创建的，所以保证了其受信任和有效性。最后浏览器返回代理服务器结果。从而实现了HTTPS请求的抓取。</p>
<p>具体的证书签发实现可参考 <a href="https://github.com/digitalbazaar/forge#x509" rel="nofollow noreferrer" target="_blank">forge</a> 库，现在广泛使用的证书是X.509格式。</p>
<h3 id="articleHeader1">Electron</h3>
<p>解决了证书问题，可以说已经完成了一大半的工作，那如何快速实现一个代理客户端呢？对于一个JSer来说，能利用Node.js来写是最好不过了。</p>
<h4>简介</h4>
<p>Electron大家应该不陌生了，它提供了一种解决方案，让我们能够利用Node.js 和 前端三宝 HTML + JS + CSS 来实现客户端软件。咋一听感觉像NW.js。经过一番了解，才知道其实NW.js可以算是Electron的前身了，都是出自同个作者之手，只不过该作者现在维护Electron去了，这其中涉及到一些产权的问题，感兴趣的可以围观一下知乎上<a href="https://www.zhihu.com/question/36292298/answer/102418523" rel="nofollow noreferrer" target="_blank">原作者的回答</a>。关于Electron和NW.js的区别<a href="https://electron.atom.io/docs/development/atom-shell-vs-node-webkit/" rel="nofollow noreferrer" target="_blank">官网上是这么说的</a>。简单讲就是Electron优化了NW.js中的一些不足。 秉着与时俱进的态度，我们当然要使用Electron。</p>
<p>有了Electron作为容器，我们小前端就可以用HTML+JS+CSS来开发客户端了。就像开发前端页面一样柔顺。Electron的使用比较简单，提供的API也比较清晰。核心概念就是Main Process 和 Render Process。</p>
<p>顾名思义Main Process是主进程，用于运行Electron的基本操作，如创建窗口，创建菜单等。Render Process是渲染进程，我们需要在渲染进程中创建软件界面，每个渲染进程对应的是一个窗口，主进程开启了多个窗口就会有多个渲染进程。</p>
<p>Electron提供了IPC用于进程间通信。分别是ipcMain和ipcRender。该通信机制允许ipcRender向ipcMain发送信号请求，并通过ipcMain返回数据。反回来ipcMain无法向特定的ipcRender发起请求。而且通信间传递的消息会被格式化为JSON字符串，所以并不支持在两个进程间传递句柄方法等，也就是不支持上下文传递。</p>
<blockquote><p>Arguments will be serialized in JSON internally and hence no functions or prototype chain will be included.</p></blockquote>
<p>假如要实现在渲染进程中点击一个按钮，则关闭客户端窗口，可以通过ipcRender发送一个信号给ipcMain, ipcMain接收到该信号后调用Electron的API关闭窗口。对于类似这种比较简单的指令操作，运用IPC实现就可以了，但是如果操作比较复杂，并且需要传递复杂数据类型，则用IPC就行不通了。</p>
<p>Electron提供了另一个API <a href="https://electron.atom.io/docs/api/remote/" rel="nofollow noreferrer" target="_blank">remote</a>，用于在Render Process中直接操作主进程的方法。这样就不需要移交Main Process处理，直接在前端页面中调用Electron的API。</p>
<h4>打包</h4>
<p>由于Electron本身包含了chromium和Node.js的代码, 所以不考虑项目本身体积，打包后的软件最小仍然有100M+, 这也是Electron最为显著的缺点之一。所以基本体积是无法避免的，我们只能尽量减小其他开发文件的大小，避免将一些无关包文件也打包进去。</p>
<p>为什么要强调这点呢？因为基于Node.js开发的项目往往会有一个庞大的node_modules文件夹，里面包含了一些开发和生产所用的包，也即对应package.json中的dependencies和devDependencies。而devDependencies中的包是不需要打包到软件的。这里推荐使用 <strong>electron-packager</strong>, 能自动排除dev依赖包，并支持自定义排除包文件夹。也可以打包出支持不同系统格式的软件。</p>
<h3 id="articleHeader2">界面开发</h3>
<p>界面开发采用传统前端页面开发方式，意味着你可以使用任何前端框架，利用Angular，Vue，React等框架来提升开发效率。</p>
<p>这些框架都支持模块化，利用webpack等打包工具，webpack本身会提供require等模块加载的方法，在前端开发的时候能实现类似后端的模块动态加载。</p>
<p>但是，当我们在Render Process中使用webpack进行开发，用require引入模块的时候就会出现冲突。因为require此时是webpack提供的一个引用本地文件的API，而不是Node.js的require, 导致我们无法通过require来引用Node.js的API，或者Electron的API。这有什么解决方案吗？</p>
<p>这里提供一个简单的方法，我们将需要用到Node.js API和Electron API 的方法抽象到renderer.js, 从HTML中单独引入，也就避免了webpack对renderer.js进行处理。然后通过插件的方式引入到前端框架中，以Vue为例：</p>
<p>index.html</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;renderer.js&quot;></script><!--提供Render Process 方法 -->
<script src=&quot;./dist/build.js&quot;></script><!--webpack 打包文件-->" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"renderer.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span><span class="hljs-comment">&lt;!--提供Render Process 方法 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./dist/build.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span><span class="hljs-comment">&lt;!--webpack 打包文件--&gt;</span></code></pre>
<p>renderer.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const electron = require('electron');
const remote = electron.remote;
const remoteApi = remote.require('./api.js');

global.remoteApi = remoteApi;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> electron = <span class="hljs-built_in">require</span>(<span class="hljs-string">'electron'</span>);
<span class="hljs-keyword">const</span> remote = electron.remote;
<span class="hljs-keyword">const</span> remoteApi = remote.require(<span class="hljs-string">'./api.js'</span>);

global.remoteApi = remoteApi;</code></pre>
<p>Vue入口文件main.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.use({
    install (Vue, options) {
        //添加实例方法
        Vue.prototype.$remoteApi = global.remoteApi;
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Vue.use({
    install (Vue, options) {
        <span class="hljs-comment">//添加实例方法</span>
        Vue.prototype.$remoteApi = global.remoteApi;
    }
});</code></pre>
<p>在Vue组件中就可以直接通过<code>this.$remoteApi</code>调用基于Nodejs或Electron的接口了。这样就有效地分离了前端界面和客户端的代码，只要剥离了$remoteApi, 前端界面也可作为一个独立的项目进行开发。</p>
<h3 id="articleHeader3">方案优缺点</h3>
<p>Electron的这种实现方式也不是什么新鲜套路了，对于NW.js 有的大多数缺点Electron也有。</p>
<p>其中一个通病就是性能问题，主要是渲染性能方面。基于webkit引擎来渲染UI界面，跟原生的系统UI还是有一定的差距。毕竟是基于DOM节点的渲染，每次节点的重排都是一次大的开销。这点只能通过在前端框架中来优化，比如利用Virtual DOM等相关技术。而视觉上的缺点则可以通过CSS做到竟可能接近原生控件。</p>
<p>而对于JS的执行性能，v8表示hold得住。</p>
<p>优点当然也比较明显，对比于Cocoa，Qt等传统桌面客户端技术，基于前端技术的实现成本较低（C++牛请忽略）跨平台支持更好（框架都帮你做好了），且天然支持热更新。</p>
<p>更重要的是，有这么多优秀软件帮你背书啊.....以下都是基于Electron开发。</p>
<p><span class="img-wrap"><img data-src="https://raw.githubusercontent.com/fwon/blog/master/assets/electron-vue-5.png" src="https://static.alili.techhttps://raw.githubusercontent.com/fwon/blog/master/assets/electron-vue-5.png" alt="pic" title="pic" style="cursor: pointer;"></span></p>
<p>当然，我并不是在安利Electron。毕竟别人能开发得这么原生态，你不一定行...  </p>
<p>关键还是看技术，Electron是完全能够开发出中大型产品级的软件的。</p>
<p>说了这么多，代码呢？</p>
<p><span class="img-wrap"><img data-src="https://raw.githubusercontent.com/fwon/blog/master/assets/electron-vue-6.jpg" src="https://static.alili.techhttps://raw.githubusercontent.com/fwon/blog/master/assets/electron-vue-6.jpg" alt="pic" title="pic" style="cursor: pointer;"></span></p>
<p>能读到这里，感谢你的坚持！</p>
<p>下面基于以上理论实现的代理客户端。目前支持以下功能：</p>
<ol>
<li><p>支持HTTP/HTTPS请求抓取。</p></li>
<li><p>支持网速模拟。</p></li>
<li><p>支持请求拦截修改，实现跨域等功能。</p></li>
<li><p>实现接口Mock，用于本地开发调试。</p></li>
</ol>
<p><span class="img-wrap"><img data-src="https://raw.githubusercontent.com/fwon/blog/master/assets/electron-anyproxy-1.png" src="https://static.alili.techhttps://raw.githubusercontent.com/fwon/blog/master/assets/electron-anyproxy-1.png" alt="pic" title="pic" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="https://raw.githubusercontent.com/fwon/blog/master/assets/electron-anyproxy-2.png" src="https://static.alili.techhttps://raw.githubusercontent.com/fwon/blog/master/assets/electron-anyproxy-2.png" alt="pic" title="pic" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="https://raw.githubusercontent.com/fwon/blog/master/assets/electron-anyproxy-3.png" src="https://static.alili.techhttps://raw.githubusercontent.com/fwon/blog/master/assets/electron-anyproxy-3.png" alt="pic" title="pic" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="https://raw.githubusercontent.com/fwon/blog/master/assets/electron-anyproxy-4.png" src="https://static.alili.techhttps://raw.githubusercontent.com/fwon/blog/master/assets/electron-anyproxy-4.png" alt="pic" title="pic" style="cursor: pointer;"></span></p>
<p><a href="https://github.com/fwon/electron-anyproxy" rel="nofollow noreferrer" target="_blank">项目地址</a> 欢迎试玩。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Electron + Vue 实现一个代理客户端

## 原文链接
[https://segmentfault.com/a/1190000008978174](https://segmentfault.com/a/1190000008978174)

