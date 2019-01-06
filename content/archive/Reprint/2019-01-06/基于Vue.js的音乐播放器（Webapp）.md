---
title: '基于Vue.js的音乐播放器（Webapp）' 
date: 2019-01-06 2:30:10
hidden: true
slug: 6a1whiukava
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">概述</h3>
<p>项目是基于Vue.js，成品是一个移动端的音乐播放器，来源于imooc的实战课程。自己动手实践并加以修改拓展。<br>项目的大致流程是Vue-cli构建开发环境，分析需求，设计构思，规划目录结构，开始编码。</p>
<h4>视图层</h4>
<blockquote><ul>
<li><p>推荐页</p></li>
<li>
<p>歌手页</p>
<ul><li><p>歌手详情</p></li></ul>
</li>
<li>
<p>歌曲排行榜</p>
<ul><li><p>排行榜详情</p></li></ul>
</li>
<li><p>搜索页</p></li>
<li><p>用户中心</p></li>
</ul></blockquote>
<h4>数据来源</h4>
<p>所有数据都来自于QQ音乐，抓取自QQ的接口，大部分接口都是JSONP，抓取比较容易，其中一些接口限制了<code>host</code>，不能直接抓取，采用的方法是用<code>axios</code>代理，设置<code>header</code>，以此绕过<code>host</code>的限制。<br>PS：具体代码请看<code>prod.server.js</code>文件</p>
<h4>技术栈</h4>
<blockquote><ul>
<li><p>Vue</p></li>
<li><p>Vuex</p></li>
<li><p>Vue-Router</p></li>
<li><p>Vue-cli</p></li>
<li><p>Stylus</p></li>
<li><p>Axios</p></li>
<li><p>ESlint</p></li>
<li><p>Better-scroll</p></li>
</ul></blockquote>
<h4>src目录结构</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010403547" src="https://static.alili.tech/img/remote/1460000010403547" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader1">难点</h3>
<h4>player组件</h4>
<p>讲一讲<code>player</code>    播放器组件，播放器组件可谓是整个项目的核心，当然数据处理和用户体验方面也是不简单的（逃。<br>播放器是全局组件，放在<code>App.vue</code>下面，通过<code>Vuex</code>传递数据，触发<code>action</code>提交<code>mutation</code>，从而使播放器开始工作。当然，其中的数据交互说复杂也不是很复杂，就是要花多点时间理解，<code>player</code>组件由多个基础组件构成，具体请看项目代码，下面上图<br><span class="img-wrap"><img data-src="/img/remote/1460000010403548" src="https://static.alili.tech/img/remote/1460000010403548" alt="" title="" style="cursor: pointer;"></span></p>
<blockquote><p>为了防止切换歌曲时点击速度过快导致歌曲播放错误，使用了<code>audio</code>的<code>onplay</code>API，结合<code>Vuex</code>获取到数据，判断当前歌曲数据请求到才可以切换下一首歌曲，判断函数如下</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" ready() {
   this.songReady = true
 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"> ready() {
   <span class="hljs-keyword">this</span>.songReady = <span class="hljs-literal">true</span>
 }</code></pre>
<h4>数据处理</h4>
<p>通过调用QQ音乐的JSONP接口，获取的数据并不能直接拿来用，需要做进一步的规格化，达到我们使用的要求，所以在这方面单独封装了一个<code>class</code>来处理这方面的数据，具体请看<code>src/common/js/song.js</code></p>
<p>在请求JSONP的时候，用到了一个JSONP库，这个库代码十分简短，只有几十行，有兴趣的同学可以<a href="https://github.com/webmodules/jsonp" rel="nofollow noreferrer" target="_blank">学习</a>下。</p>
<p>使用时，就是将请求的参数拼接在请求url上，然后调用这个库的<code>jsonp</code>方法。所以，在此封装了两个函数，一个是将参数拼接在url上，另一个是将库里面的<code>jsonp</code>方法Promise化，方便我们使用，具体请查看<code>src/common/js/jsonp.js</code>。</p>
<p>将请求的数据格式化后再通过<code>Vuex</code>传递，组件间共享，实现歌曲的播放切换等。</p>
<h4>交互体验</h4>
<p>该项目的很多地方都涉及到滚动，包括下拉滚动，下拉滚动刷新等。这里面用到了一个库(<code>better-scroll</code>)，来实现所有涉及到的滚动，建议学习下它的<a href="https://github.com/ustbhuangyi/better-scroll" rel="nofollow noreferrer" target="_blank">API</a>。</p>
<p>其他动画包括了<code>Vue</code>的<code>transition</code>动画，路由之间切换时的简单动画，播放器打开时的动画，这个地方比较难，也比较好玩。</p>
<p>打开页面时的加载Loading效果，其实就是一个Loading组件，也比较简单。</p>
<p>为了减少流量，图片加载使用了懒加载的方式，滚动时再加载真实的图片。<br>具体效果请自身体验：）</p>
<h3 id="articleHeader2">效果</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010403549" src="https://static.alili.tech/img/remote/1460000010403549" alt="" title="" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000010403550" src="https://static.alili.tech/img/remote/1460000010403550" alt="" title="" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000010403551" src="https://static.alili.tech/img/remote/1460000010403551" alt="" title="" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000010403552" src="https://static.alili.tech/img/remote/1460000010403552" alt="" title="" style="cursor: pointer;"></span></p>
<h3 id="articleHeader3">构建</h3>
<h4>开发环境</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# run e2e tests
npm run e2e

# run all tests
npm test" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-comment"># install dependencies</span>
npm install

<span class="hljs-comment"># serve with hot reload at localhost:8080</span>
npm run dev

<span class="hljs-comment"># run e2e tests</span>
npm run e2e

<span class="hljs-comment"># run all tests</span>
npm <span class="hljs-built_in">test</span></code></pre>
<h4>生产环境</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# build for production with minification
npm run build
# run
node prod.server.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-comment"># build for production with minification</span>
npm run build
<span class="hljs-comment"># run</span>
node prod.server.js</code></pre>
<h3 id="articleHeader4">总结</h3>
<p>通过学习该项目，自己收获了许多，实践中也遇到了大大小小许多问题，通过断点调试等最终解决了，对我来说无疑是最大的鼓励，也希望能与大家一起学习。<br>项目地址：<a href="https://github.com/k-water/vue-music" rel="nofollow noreferrer" target="_blank">https://github.com/k-water/vue-music</a><br>喜欢的点个赞<br>完 ：）</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于Vue.js的音乐播放器（Webapp）

## 原文链接
[https://segmentfault.com/a/1190000010403542](https://segmentfault.com/a/1190000010403542)

