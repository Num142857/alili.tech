---
title: '新版 vue-cli 2.9.1的webpack的存在问题解决' 
date: 2018-12-25 2:30:11
hidden: true
slug: eb1kwr5qqrt
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">最新vue-cli 2.9.1的webpack存在问题</h1>
<p>最近vue-cli更新，用其构建项目的时候，发现bulid文件下少了两个文件，分别是dev-sever.js和dev-client.js  <br><strong> vue-cli 2.8  </strong></p>
<p><span class="img-wrap"><img data-src="https://sghuangrihuang.github.io/staticRepository/11-18/images/1.png" src="https://static.alili.techhttps://sghuangrihuang.github.io/staticRepository/11-18/images/1.png" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><strong>vue-cli 2.9.1  </strong> </p>
<p><span class="img-wrap"><img data-src="https://sghuangrihuang.github.io/staticRepository/11-18/images/2.png" src="https://static.alili.techhttps://sghuangrihuang.github.io/staticRepository/11-18/images/2.png" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>这是为什么呢  <br>我们查看下package.json   <br>vue-cli 2.8  <br><span class="img-wrap"><img data-src="https://sghuangrihuang.github.io/staticRepository/11-18/images/3.png" src="https://static.alili.techhttps://sghuangrihuang.github.io/staticRepository/11-18/images/3.png" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>vue-cli 2.9.1  <br><span class="img-wrap"><img data-src="https://sghuangrihuang.github.io/staticRepository/11-18/images/4.png" src="https://static.alili.techhttps://sghuangrihuang.github.io/staticRepository/11-18/images/4.png" alt="" title="" style="cursor: pointer;"></span></p>
<p>由此可知 在最新版本的vue-cli中webpack版本更新到v3.6.0了。   </p>
<p>既然更新了 那就我们就重新开下webpack的配置项。</p>
<h2 id="articleHeader1">vue自启浏览器设置</h2>
<p>当我们启动npm run dev执行此cli的时候发现 居然不会自己启动浏览器了  </p>
<p>这样的话 岂不是装逼不了？ 不不不 还是可以的，只要我们修改下配置项就可以了  </p>
<p>我们先看看 我们npm run dev 到底执行了什么<br>继续查看package.json的scripts选项的dev 配置  </p>
<p><strong>vue-cli 2.9.1  </strong>  package.json  <br><span class="img-wrap"><img data-src="https://sghuangrihuang.github.io/staticRepository/11-18/images/5.png" src="https://static.alili.techhttps://sghuangrihuang.github.io/staticRepository/11-18/images/5.png" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>对比下就知道 当我们运行npm run dev 实际上是执行了webpack-dev-server --inline --progress --config build/webpack.dev.conf.js  <br><strong>vue-cli 2.8  </strong>   package.json  <br><span class="img-wrap"><img data-src="https://sghuangrihuang.github.io/staticRepository/11-18/images/6.png" src="https://static.alili.techhttps://sghuangrihuang.github.io/staticRepository/11-18/images/6.png" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>跟之前运行npm run dev 有区别 也好说明了他要删除这两个文件的原因了，因为最新版本的webpack的配置中是采用webpack-dev-server这个插件进行的启动浏览器的 可以在官网进行查看他的一个<a href="https://doc.webpack-china.org/configuration/dev-server/" rel="nofollow noreferrer" target="_blank">API</a>使用说明</p>
<p>build/webpack.dev.conf.js  运行路径 那查看下其配置</p>
<p>vue-cli 2.9.1 build/webpack.dev.conf.js    <br><span class="img-wrap"><img data-src="https://sghuangrihuang.github.io/staticRepository/11-18/images/7.png" src="https://static.alili.techhttps://sghuangrihuang.github.io/staticRepository/11-18/images/7.png" alt="" title="" style="cursor: pointer;"></span></p>
<p>查看API就知道这个open 这个参数就是打开自启服务器的原因，但是config.dev.autoOpenBrowser这个是什么呢，我们可以向上查找  <br><span class="img-wrap"><img data-src="https://sghuangrihuang.github.io/staticRepository/11-18/images/8.png" src="https://static.alili.techhttps://sghuangrihuang.github.io/staticRepository/11-18/images/8.png" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>刚好对应config的定义 require就是加载进来 那就是继续查看对应的路径 刚好对应config文件下的index.js 在require默认是其下的index文件 这里就对应index.js  </p>
<p>config/index.js  <br><span class="img-wrap"><img data-src="https://sghuangrihuang.github.io/staticRepository/11-18/images/9.png" src="https://static.alili.techhttps://sghuangrihuang.github.io/staticRepository/11-18/images/9.png" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>这里的autoOpenBrowser对应false ,既然我们要改动那就直接改为true就可以。然后在重启下服务 就可以自启动服务了 </p>
<p>其中的port也可以改对应的启动端口，在最新版本的vue-cli配置中 即使设置的端口被占用了，他自动会在其端口在加1 开启服务的。</p>
<hr>
<h2 id="articleHeader2">饿了吗APP 接口设置问题</h2>
<p>由于bulid文件夹下的两个文件没有，那饿了吗接口怎么设置呢。  </p>
<p>在此之前我们理解下饿了吗app的接口的设置原理，由于数据都是直接从data.json这个文件获取的，所以呢，我们要模拟mock做个接口。但是在饿了吗APP的设置中 它是直接启动服务的时候把接口给做好了，这也是为什么我们可以直接访问其/api/seller有对应数据  <br>vue-cli 2.9.1 <span class="img-wrap"><img data-src="https://sghuangrihuang.github.io/staticRepository/11-18/images/10.png" src="https://static.alili.techhttps://sghuangrihuang.github.io/staticRepository/11-18/images/10.png" alt="" title="" style="cursor: pointer;"></span></p>
<p>在vue-cli 2.9.1之前版本是在dev-server.js直接设置的 具体参数在  <br><strong>vue-cli 2.8  </strong>  <br><span class="img-wrap"><img data-src="https://sghuangrihuang.github.io/staticRepository/11-18/images/11.png" src="https://static.alili.techhttps://sghuangrihuang.github.io/staticRepository/11-18/images/11.png" alt="" title="" style="cursor: pointer;"></span></p>
<h3 id="articleHeader3">方法一：</h3>
<p>回到起点，在最新版本vue-cli的配置中浏览器服务都在webpack-dev-server 这个插件中，那我们就其在webpack.dev.conf.js进行修改  <br>现在我们的要求就是怎么在服务开启的时候接口数据也对应做好呢，那我们查看其插件API 刚好有一个参数就是<a href="https://doc.webpack-china.org/configuration/dev-server/#devserver-before" rel="nofollow noreferrer" target="_blank">devServer.before</a>  <br>devServer.before  <br><span class="img-wrap"><img data-src="https://sghuangrihuang.github.io/staticRepository/11-18/images/12.png" src="https://static.alili.techhttps://sghuangrihuang.github.io/staticRepository/11-18/images/12.png" alt="" title="" style="cursor: pointer;"></span></p>
<p>就是解决问题所在了。 进行修改  <br>webpack.dev.conf.js<br><span class="img-wrap"><img data-src="https://sghuangrihuang.github.io/staticRepository/11-18/images/13.png" src="https://static.alili.techhttps://sghuangrihuang.github.io/staticRepository/11-18/images/13.png" alt="" title="" style="cursor: pointer;"></span></p>
<p>这样我们就可以直接发送API请求数据了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.axios.get(&quot;/api/seller&quot;).then(function(res){
  // do something
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">this</span>.axios.get(<span class="hljs-string">"/api/seller"</span>).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res</span>)</span>{
  <span class="hljs-comment">// do something</span>
})</code></pre>
<h3 id="articleHeader4">方法二</h3>
<p>会node的也可以直接做个api接口，开启node服务 然后饿了吗项目直接访问这个接口，当然这里会存在跨域问题和路由映射，不过webpack-dev-server 帮你们解决这个问题了 主要是设置参数问题 <a href="https://doc.webpack-china.org/configuration/dev-server/#devserver-proxy" rel="nofollow noreferrer" target="_blank">devServer.proxy</a> 进行路由映射等等  </p>
<p><span class="img-wrap"><img data-src="https://sghuangrihuang.github.io/staticRepository/11-18/images/14.png" src="https://static.alili.techhttps://sghuangrihuang.github.io/staticRepository/11-18/images/14.png" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>不过这些还需要考虑到自身能力，我建议还是使用第一种方法</p>
<h2 id="articleHeader5">总结</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="前端技术更新那么快，我们最好就是每天都要学习想对应的知识，主要是底层能理解透彻了 这些问题我们就可以对应解决

虽然我的能力有限，目前能解决的也就这些问题，毕竟是第一次发表文章，如果存在什么技术问题可以直接回复我，谢谢了。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>前端技术更新那么快，我们最好就是每天都要学习想对应的知识，主要是底层能理解透彻了 这些问题我们就可以对应解决

虽然我的能力有限，目前能解决的也就这些问题，毕竟是第一次发表文章，如果存在什么技术问题可以直接回复我，谢谢了。</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
新版 vue-cli 2.9.1的webpack的存在问题解决

## 原文链接
[https://segmentfault.com/a/1190000012060181](https://segmentfault.com/a/1190000012060181)

