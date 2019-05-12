---
title: '基于react、socket.io、node.js仿微信开发' 
date: 2018-12-16 2:30:10
hidden: true
slug: iof36bd16n
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">前言</h1>
<p>这个项目是我自学react+redux的第一个项目，并结合自己之前所学的node+mongodb，来模仿开发微信客户端。利用每天下班时间边学习边写。由于本人技术水平有限，比较适合新手。目前还没有写完。喜欢的话可以帮忙给我github点个star ^_^</p>
<h2 id="articleHeader1">项目地址</h2>
<p><a href="https://github.com/zhouatie/wechat" rel="nofollow noreferrer" target="_blank">https://github.com/zhouatie/w...</a></p>
<h2 id="articleHeader2">技术栈</h2>
<p>react+redux+react-router4+socket.io+axios+node.js+mongodb</p>
<h2 id="articleHeader3">说明</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="本地启动mongodb服务
分别进入wechat跟server文件夹npm install
wechat里npm run start 
server里node app.js 和 chat.js 这两个文件" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>本地启动mongodb服务
分别进入wechat跟server文件夹npm install
wechat里npm run <span class="hljs-literal">start</span> 
server里<span class="hljs-keyword">node</span> <span class="hljs-title">app</span>.js 和 chat.js 这两个文件</code></pre>
<blockquote>开发环境：macbook pro 、vscode、Chrome、node<p>如果npm install太慢导致有些npm依赖包下载失败 你可以看控制台的报错信息，再手动npm install 具体的开发包，推荐使用淘宝的注册源，直接运行</p>
</blockquote>
<p><code>npm install -g cnpm --registry=https://registry.npm.taobao.org</code></p>
<h2 id="articleHeader4">目标功能</h2>
<ul>
<li>[√] 注册</li>
<li>[√] 登录</li>
<li>[√] 添加好友</li>
<li>[√] 支持私聊</li>
<li>[√] 消息列表的展示</li>
<li>[√] 未读消息数量的显示</li>
<li>[√] axios数据跨域的设置</li>
<li>[ ] 群聊</li>
<li>[√] 上传头像</li>
<li>[√] 个人信息的编辑</li>
<li>[ ] 朋友圈</li>
</ul>
<h2 id="articleHeader5">部分截图</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012925104" src="https://static.alili.tech/img/remote/1460000012925104" alt="私聊" title="私聊" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012925105" src="https://static.alili.tech/img/remote/1460000012925105" alt="上传头像" title="上传头像" style="cursor: pointer;"></span></p>
<h2 id="articleHeader6">总结</h2>
<p>1.之前写vue项目的时候，在main.js文件中写express接口，就行了，就不存在跨域问题。在create-react-app启动的静态资源服务中，实在找不到哪里可以写接口，找了好久的node_modules ，都不知道在哪里下手。好在create-react-app中的package.json中加上：<code>proxy:http://localhost:4000</code>就能解决跨域问题了。</p>
<p>2.在app.js页面中，使用的是express框架，写socket.io不知道为什么会提醒跨域问题，而我前面的登录接口用axios跨域就没有问题，而且我在express的头部做了CORS处理，还是存在跨域问题。所以只能另启了一个node服务，采用原生node.js编写，跨域就成功了。但是我在新写的服务中，换成用express框架，结果也提示了存在跨域问题。目前个人猜测express可能有什么跨域机制。</p>
<p>3.在引入react-router4的时候遇到了很多疑难杂症，晚上大部分的react-router4一下的版本。按照网上来做，好多报错，到处找博客找文章。后来通过react-router英文文档的阅读解决了各种报错问题。</p>
<p>4.我是通过redux来更新消息列表，中间出现store数据更新了，组件却不渲染。后来求助好友后，原来是我强制修改了state导致页面无法即使刷新。</p>
<p>5.formdata上传文件，相当于表单上传，头部为<code>Content-Type:multipart/form-data</code>,这点要注意了！</p>
<blockquote>注意: Multer 不会处理任何非 multipart/form-data 类型的表单数据。具体见   <a href="https://www.npmjs.com/package/multer" rel="nofollow noreferrer" target="_blank">multer</a>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var multer = require('multer');
var upload = multer({ dest: '../wechat/public/logos' }); // dest 指的是图片存到哪个文件夹里

// 上传头像
app.post(&quot;/uploadLogo&quot;, upload.single(&quot;avatar&quot;), (req, res) => {
    User.update({ _id: req.body.id }, { $set: { logo: './logos/' + req.file.filename } }, function () {
        res.send({
            status: &quot;success&quot;,
            url: './logos/' + req.file.filename
        })
    })
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> multer = <span class="hljs-built_in">require</span>(<span class="hljs-string">'multer'</span>);
<span class="hljs-keyword">var</span> upload = multer({ <span class="hljs-attr">dest</span>: <span class="hljs-string">'../wechat/public/logos'</span> }); <span class="hljs-comment">// dest 指的是图片存到哪个文件夹里</span>

<span class="hljs-comment">// 上传头像</span>
app.post(<span class="hljs-string">"/uploadLogo"</span>, upload.single(<span class="hljs-string">"avatar"</span>), (req, res) =&gt; {
    User.update({ <span class="hljs-attr">_id</span>: req.body.id }, { <span class="hljs-attr">$set</span>: { <span class="hljs-attr">logo</span>: <span class="hljs-string">'./logos/'</span> + req.file.filename } }, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        res.send({
            <span class="hljs-attr">status</span>: <span class="hljs-string">"success"</span>,
            <span class="hljs-attr">url</span>: <span class="hljs-string">'./logos/'</span> + req.file.filename
        })
    })
})</code></pre>
<h2 id="articleHeader7">参考资料</h2>
<p>《深入浅出React和Redux》-- 程墨</p>
<p>《MongoDB实战（第二版）》</p>
<p><a href="https://reacttraining.com/react-router/web/guides/philosophy" rel="nofollow noreferrer" target="_blank">react-router</a></p>
<p><a href="https://reactjs.org/docs/hello-world.html" rel="nofollow noreferrer" target="_blank">react</a></p>
<p><a href="http://www.redux.org.cn/index.html" rel="nofollow noreferrer" target="_blank">redux中文文档</a></p>
<p><a href="http://www.nodeclass.com/api/mongoose.html#guide_connections" rel="nofollow noreferrer" target="_blank">mongoose</a></p>
<p><a href="https://juejin.im/entry/5923e2242f301e006b2a7827" rel="nofollow noreferrer" target="_blank">基于 Vue、Nodejs、Socket.io 的聊天应用</a></p>
<p><a href="https://www.npmjs.com/package/multer" rel="nofollow noreferrer" target="_blank">multer</a></p>
<blockquote>文章都是学习过程中的总结，如果发现错误，欢迎留言指出</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于react、socket.io、node.js仿微信开发

## 原文链接
[https://segmentfault.com/a/1190000012925099](https://segmentfault.com/a/1190000012925099)

