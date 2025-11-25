---
title: '用Vue高仿qq音乐官网-pc端' 
date: 2019-01-12 2:30:24
hidden: true
slug: 06vt3zsyb6y8
categories: [reprint]
---

{{< raw >}}

                    
<p>一直想做一个vue项目 然后呢 我就做了</p>
<h2 id="articleHeader0">效果预览</h2>
<p>部分地方不全部根据原版，也有自由发挥的，目前功能模块比较简陋，如果加载太慢，可以下载下来再本地运行</p>
<blockquote>
<p>&nbsp;<a href="https://github.com/Binaryify/NeteaseCloudMusicApi" rel="nofollow noreferrer" target="_blank">网易云音乐API</a></p>
<p>项目地址：<a href="https://github.com/j710328466/vue-qqmusic" rel="nofollow noreferrer" target="_blank">github</a></p>
<p>预览地址：<a href="http://182.254.147.168:8564/#/" rel="nofollow noreferrer" target="_blank">demo</a></p>
</blockquote>
<h2 id="articleHeader1">Build Setup</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# install dependencies
cnpm i
(可以用cnpm或yarn，更方便快捷，你值得拥有)

# serve with hot reload at localhost:8564
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# 网易云API部署 listen localhost:3000
npm run start " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code><span class="hljs-comment"># install dependencies</span>
cnpm i
(可以用cnpm或yarn，更方便快捷，你值得拥有)

<span class="hljs-comment"># serve with hot reload at localhost:8564</span>
npm <span class="hljs-keyword">run</span><span class="bash"> dev
</span>
<span class="hljs-comment"># build for production with minification</span>
npm <span class="hljs-keyword">run</span><span class="bash"> build
</span>
<span class="hljs-comment"># build for production and view the bundle analyzer report</span>
npm <span class="hljs-keyword">run</span><span class="bash"> build --report
</span>
<span class="hljs-comment"># 网易云API部署 listen localhost:3000</span>
npm <span class="hljs-keyword">run</span><span class="bash"> start </span></code></pre>
<h2 id="articleHeader2">技术栈</h2>
<ul>
<li><p>vue(数据绑定)</p></li>
<li><p>vue-router</p></li>
<li><p>vuex(管理组件状态，实现组件通信）</p></li>
<li><p>webpack(打包工具)</p></li>
<li><p>scss（原来想用stylus,回头看看我都快写完了...）</p></li>
<li><p>axios（我等下要重点讲这<em>*</em>*）</p></li>
<li><p>组件库: element-UI(本来想用muse-UI,感觉那个更cool，下次吧..)</p></li>
<li><p>API: 网易云音乐API(仿qq音乐我用网易云音乐的东西，你怕不怕...)</p></li>
</ul>
<h2 id="articleHeader3">核心功能组件的实现</h2>
<h3 id="articleHeader4">搜索功能</h3>
<p><span class="img-wrap"><img data-src="https://ooo.0o0.ooo/2017/06/14/594135198d975.gif" src="https://static.alili.techhttps://ooo.0o0.ooo/2017/06/14/594135198d975.gif" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader5">播放功能</h3>
<p><span class="img-wrap"><img data-src="https://ooo.0o0.ooo/2017/06/14/5941364de751e.gif" src="https://static.alili.techhttps://ooo.0o0.ooo/2017/06/14/5941364de751e.gif" alt="" title="" style="cursor: pointer;"></span><br> &nbsp; &nbsp;(播放页面正在完善中，样式只是大概，待细化...)</p>
<h3 id="articleHeader6">跳转功能</h3>
<p><span class="img-wrap"><img data-src="https://ooo.0o0.ooo/2017/06/14/59415a8cd0df7.gif" src="https://static.alili.techhttps://ooo.0o0.ooo/2017/06/14/59415a8cd0df7.gif" alt="" title="" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(目前子目录只开通歌手列表)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scheme"><code>(<span class="hljs-name">目前子目录只开通歌手列表</span>)
</code></pre>
<h2 id="articleHeader7">自己挖的坑，自己埋</h2>
<h3 id="articleHeader8">vuex的模块应用</h3>
<ul><li><p>&nbsp;一开始我并没有使用vuex，因为我觉得目前这个项目比较小，并不需要它来管理数据，毕竟vuex针对大项目来说确实很好用，但是后来考虑到如果后期该项目我还要    维护，数据量一大，还是要重新分类数据，所以中途某些地方插入了vuex的使用，这就很大一部分影响了项目进行的进度。（目前只用到action和state）</p></li></ul>
<h3 id="articleHeader9">qq音乐的轮播图</h3>
<ul><li><p>不用说，qq音乐这个网站的页面我是真的挺喜欢，不光是他的设计，页面的布局也很美观，在控制台调试的时候可以看看它的结构，非常有层次而富有美感，即使加上    一层margin,padding也不会有违和感。这就造就了它的轮播图结构比较麻烦，不是说做不出来，因为这是第一次上传的项目，我想先将大概的结构完善一下，后期再    维护，所以我就选用了element-UI里面的跑马灯式轮播图组件，大体来说，除了部分瑕疵以外，还是高度还原了原版轮播图的。</p></li></ul>
<h3 id="articleHeader10">axios后端数据获取时产生的跨域问题</h3>
<ul>
<li><p>&nbsp;重点来了，这个是我在该项目中花了最多时间的地方，相信很多同学使用axios都碰到过我这个问题，目前我这里使用了三种方法处理该问题，请大家针对自己的项目问题对号入座<br> &nbsp; &nbsp;</p></li>
<li><p>跨域访问，简单来说就是 A 网站的 javascript 代码试图访问 B 网站，包括提交内容和获取内容。由于安全原因，跨域访问是被各大浏览器所默认禁止的。<br> &nbsp; &nbsp;</p></li>
</ul>
<p>①. 针对本地相同端口服务器之间的跨域</p>
<ul><li>
<p>这是我刚开始碰到问题时使用的第一种，这个时候你只需要找到build文件中的dev-server，找到引用express的位置，给它加上一个头文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.all('*', function (req, res, next) {
res.header(&quot;Access-Control-Allow-Credentials&quot;, true)
res.header(&quot;Access-Control-Allow-Origin&quot;, &quot;*&quot;)
res.header(&quot;Access-Control-Allow-Headers&quot;, &quot;X-Requested-With&quot;)
res.header(&quot;Access-Control-Allow-Methods&quot;, &quot;PUT,POST,GET,DELETE,OPTIONS&quot;)
res.header(&quot;X-Powered-By&quot;, ' 3.2.1')
res.header(&quot;Content-Type&quot;, &quot;application/json;charset=utf-8&quot;)
next()
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs accesslog"><code>app.all('*', function (req, res, next) {
res.header(<span class="hljs-string">"Access-Control-Allow-Credentials"</span>, true)
res.header(<span class="hljs-string">"Access-Control-Allow-Origin"</span>, <span class="hljs-string">"*"</span>)
res.header(<span class="hljs-string">"Access-Control-Allow-Headers"</span>, <span class="hljs-string">"X-Requested-With"</span>)
res.header(<span class="hljs-string">"Access-Control-Allow-Methods"</span>, <span class="hljs-string">"<span class="hljs-keyword">PUT</span>,<span class="hljs-keyword">POST</span>,<span class="hljs-keyword">GET</span>,<span class="hljs-keyword">DELETE</span>,<span class="hljs-keyword">OPTIONS</span>"</span>)
res.header(<span class="hljs-string">"X-Powered-By"</span>, ' <span class="hljs-number">3</span>.<span class="hljs-number">2</span>.<span class="hljs-number">1</span>')
res.header(<span class="hljs-string">"Content-Type"</span>, <span class="hljs-string">"application/json;charset=utf-8"</span>)
next()
})</code></pre>
</li></ul>
<blockquote><p><span class="img-wrap"><img data-src="https://ooo.0o0.ooo/2017/06/14/594140894d162.jpg" src="https://static.alili.techhttps://ooo.0o0.ooo/2017/06/14/594140894d162.jpg" alt="" title="" style="cursor: pointer; display: inline;"></span></p></blockquote>
<ul><li><p>然后它就会报错~，具体原因是你同一个端口申请相同端口的东西,不好意思，那不叫跨域...<br><br></p></li></ul>
<p>②. 针对本地不同端口的服务器之间的跨域</p>
<ul><li><p>就是将上面的头文件放在当前项目申请的服务器的那个api中。<br><br></p></li></ul>
<p>③. 针对本地服务器对域名服务器访问的跨域问题</p>
<ul><li>
<p>找到当前项目congfig文件夹下index.js文件，然后在文件中将proxyTable内容改为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="proxyTable: {
   '/api': {
   target: '[1]',
   changeOrigin: true,
   pathRewrite: {
   '^/api': '/'
   }
  }
 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-attribute">proxyTable</span>: {
   <span class="hljs-string">'/api'</span>: {
   <span class="hljs-attribute">target</span>: <span class="hljs-string">'[1]'</span>,
   <span class="hljs-attribute">changeOrigin</span>: true,
   <span class="hljs-attribute">pathRewrite</span>: {
   <span class="hljs-string">'^/api'</span>: <span class="hljs-string">'/'</span>
   }
  }
 }</code></pre>
</li></ul>
<blockquote><p>就是你当前想访问的api地址，项目中访问的时候就只要用/api做反向代理即可</p></blockquote>
<h2 id="articleHeader11">终于</h2>
<ul>
<li><p>&nbsp;这是我第一个用vue撸的项目，可能功能有点简陋，很多地方有待提高，不过这次实践让我对组件化的理解有了一定的提升，后期会继续加入其它功能模块的，文中有用词不对的地方，欢迎大家指出，项目有什么bug，也希望大家多多提issue</p></li>
<li><p>如果对你有帮助，给个star吧</p></li>
<li><p><a href="http://jzxer.cn/about/" rel="nofollow noreferrer" target="_blank">找工作中</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用Vue高仿qq音乐官网-pc端

## 原文链接
[https://segmentfault.com/a/1190000009791639](https://segmentfault.com/a/1190000009791639)

