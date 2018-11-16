---
title: vue全家桶仿某鱼部分布局以及功能实现
hidden: true
categories: [reprint]
slug: 9f9a7b3c
date: 2018-10-23 00:00:00
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p><strong>每次写文章时，总会觉得比写代码难多了，可能这就是我表述方面的不足吧，然而写文章也是可以复盘一下自己的开发过程，对自己还是受益良多的。在这里简单叙述一下我仿某鱼部分布局以及功能实现的过程，仅做学习用途。</strong></p>
<p><strong>Vue是一套用于构建用户界面的渐进式框架，Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的SPA单页面应用提供驱动。</strong></p>
<hr>
<h3 id="articleHeader1">技术栈以及组件库</h3>
<ul>
<li>vuex: 解决组件数据共享问题，加强组件数据持久化。</li>
<li>vue-router: 主要实现spa单页面开发。</li>
<li>axios: 异步请求数据。</li>
<li>easymock: 假数据模拟接口。</li>
<li>mint-ui: 一款移动端开发的框架。<a href="http://mint-ui.github.io/#!/zh-cn" rel="nofollow noreferrer" target="_blank">Mint UI</a>
</li>
<li>stylus: css预处理器</li>
<li>better-scroll: 一个移动端滚动的解决方案</li>
<li>swiper: 一个强大的滑动特效插件</li>
<li>lrz: 图片压缩插件</li>
</ul>
<h3 id="articleHeader2">实现效果</h3>
<p><strong>搜索</strong></p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000015994545?w=378&amp;h=660" src="https://static.alili.tech/img/remote/1460000015994545?w=378&amp;h=660" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><strong>分类</strong></p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000015994546?w=378&amp;h=660" src="https://static.alili.tech/img/remote/1460000015994546?w=378&amp;h=660" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><strong>登录</strong></p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000015994547" del-src="https://static.alili.tech/v-5bbf1b3b/global/img/squares.svg" alt="" title="" style="cursor: pointer;"></span></p>
<p><strong>购买</strong></p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000015994548" del-src="https://static.alili.tech/v-5bbf1b3b/global/img/squares.svg" alt="" title="" style="cursor: pointer;"></span><br><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000015994549" del-src="https://static.alili.tech/v-5bbf1b3b/global/img/squares.svg" alt="" title="" style="cursor: pointer;"></span></p>
<p><strong>发布</strong></p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000015994550" del-src="https://static.alili.tech/v-5bbf1b3b/global/img/squares.svg" alt="" title="" style="cursor: pointer;"></span></p>
<h3 id="articleHeader3">代码目录结构</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="●
┣━ src # 开发目录
 ┣━ api                  //axios获取假数据的统一js
  ┣━ data.js
 ┣━ assets                  //静态文件资源
  ┣━ images                 //图片
  ┣━ utils                  //通用js方法函数
 ┣━ common                 //通用的文件资源
  ┣━ stylus                 //stylus文件夹
 ┣━ component              //可复用的组件
  ┣━...
  ┣━...
  ┣━...
  ┣━...
  ┣━...
  ┣━...
 ┣━ pages                 //页面（页面组件）
  ┣━...
  ┣━...
  ┣━...
  ┣━...
  ┣━...
  ┣━...
 ┣━ router                 //路由
  ┣━ index.js
 ┣━ store                  //vuex数据状态管理
  ┣━ index.js
  ┣━ state.js
  ┣━ mutations.js
  ┣━ actions.js
  ┣━ getters.js
 ┣━ App.vue                //根组件
 ┗━ main.js                 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>●
┣━ src # 开发目录
 ┣━ api                  <span class="hljs-comment">//axios获取假数据的统一js</span>
  ┣━ data.js
 ┣━ assets                  <span class="hljs-comment">//静态文件资源</span>
  ┣━ images                 <span class="hljs-comment">//图片</span>
  ┣━ utils                  <span class="hljs-comment">//通用js方法函数</span>
 ┣━ common                 <span class="hljs-comment">//通用的文件资源</span>
  ┣━ stylus                 <span class="hljs-comment">//stylus文件夹</span>
 ┣━ component              <span class="hljs-comment">//可复用的组件</span>
  ┣━...
  ┣━...
  ┣━...
  ┣━...
  ┣━...
  ┣━...
 ┣━ pages                 <span class="hljs-comment">//页面（页面组件）</span>
  ┣━...
  ┣━...
  ┣━...
  ┣━...
  ┣━...
  ┣━...
 ┣━ router                 <span class="hljs-comment">//路由</span>
  ┣━ index.js
 ┣━ store                  <span class="hljs-comment">//vuex数据状态管理</span>
  ┣━ index.js
  ┣━ state.js
  ┣━ mutations.js
  ┣━ actions.js
  ┣━ getters.js
 ┣━ App.vue                <span class="hljs-comment">//根组件</span>
 ┗━ main.js                 
</code></pre>
<h3 id="articleHeader4">实现主要的几个功能</h3>
<ul>
<li>登录退出<p>用户在已登录状态和未登录状态的界面是不同的，有些功能指定要在登录状态下才会有，因此会产生状态的切换，我们可以通过浏览器自带的window.localStorage来存储数据，也可以用vuex，如果状态多的情况下建议采用vuex</p>
</li>
<li>搜索功能<p>这个没什么好说的，利用indexOf这个方法来验证假数据中是否有这个key，相应输出它的value，没有那就切换另一个找不到的UI界面</p>
</li>
<li>分类功能<p>这个也没有什么难度，取到假数据中的数据来for in循环输出，然后用better-scroll插件来实现滚动对应的高度效果</p>
</li>
<li>购买<p>如果是在未登录的状态下，那么进行一个router-link路由跳转到登录login页面，如果是已登录的状态下，会进入到一个商品详情页，点击我想要会进入到一个与卖家聊天交互的一个界面，这里面的卖家的数据都是模拟出来的假数据，因此它不能像真的卖家一样。其中每一个表情emoji就是一个图片，用code的方式把它编译出来再进行一个swiper轮播来包裹他们的遍历循环。<br><br>接着点击立即购买则会跳到付款页面，如果填过地址等信息的，那么可以选择，如果未填的，则会引导至输入相关信息页面，再点击购买就成功了，这个时候数据就会利用vuex保存到我的个人页面中的我买到的页面中。可以进行确认收货后删除订单。</p>
</li>
<li>发布<p>一样，只有在已登录的状态下才可以进入到发布的界面，发布就是充当着一个卖家的身份，需要填写商品详情的相关信息包括图片，价格等。通过验证才可发布成功，同样利用了vuex来保存发布的商品信息，再跳至我的页面中的我发布的页面进行数据输出。</p>
</li>
<li>设备适配<p>我是用rem来实现的，也建议用rem来自适应布局，先自己封装一个自适应html的 font-size的js，再将其导入到main.js中</p>
</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  /**
    * Created by zhaolele on 2018/7/25.
    */
    (function(doc, win) {
      var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
          var clientWidth = docEl.clientWidth;
          if (!clientWidth) return;
          docEl.style.fontSize = 32 * (clientWidth / 320) + 'px';
        };
      if (!doc.addEventListener) return;
      win.addEventListener(resizeEvt, recalc, false);
      doc.addEventListener('DOMContentLoaded', recalc, false);
    })(document, window);
    
    //10rem
  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>  <span class="hljs-comment">/**
    * Created by zhaolele on 2018/7/25.
    */</span>
    (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">doc, win</span>) </span>{
      <span class="hljs-keyword">var</span> docEl = doc.documentElement,
        resizeEvt = <span class="hljs-string">'orientationchange'</span> <span class="hljs-keyword">in</span> <span class="hljs-built_in">window</span> ? <span class="hljs-string">'orientationchange'</span> : <span class="hljs-string">'resize'</span>,
        recalc = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
          <span class="hljs-keyword">var</span> clientWidth = docEl.clientWidth;
          <span class="hljs-keyword">if</span> (!clientWidth) <span class="hljs-keyword">return</span>;
          docEl.style.fontSize = <span class="hljs-number">32</span> * (clientWidth / <span class="hljs-number">320</span>) + <span class="hljs-string">'px'</span>;
        };
      <span class="hljs-keyword">if</span> (!doc.addEventListener) <span class="hljs-keyword">return</span>;
      win.addEventListener(resizeEvt, recalc, <span class="hljs-literal">false</span>);
      doc.addEventListener(<span class="hljs-string">'DOMContentLoaded'</span>, recalc, <span class="hljs-literal">false</span>);
    })(<span class="hljs-built_in">document</span>, <span class="hljs-built_in">window</span>);
    
    <span class="hljs-comment">//10rem</span>
  </code></pre>
<ul><li>移动端一像素<p>众所周知，移动端因不同的设备的分辨率导致一像素并不是真正的统一的一像素，因此我们需要封装一个stylus的mixin来引入</p>
</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="border-1px($color)
  position: relative
  &amp;:after
    display: block
    position: absolute
    left: 0
    bottom: 0
    width: 100%
    border-top: 1px solid $color
    content: ' '
    
@media (-webkit-min-device-pixel-ratio: 1.5),(min-device-pixel-ratio: 1.5)
  .border-1px
    &amp;::after
      -webkit-transform: scaleY(0.7)
      transform: scaleY(0.7)

@media (-webkit-min-device-pixel-ratio: 2),(min-device-pixel-ratio: 2)
  .border-1px
    &amp;::after
      -webkit-transform: scaleY(0.5)
      transform: scaleY(0.5)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">border-1px</span><span class="hljs-params">(<span class="hljs-variable">$color</span>)</span></span>
  <span class="hljs-attribute">position</span>: relative
  &amp;:after
    <span class="hljs-attribute">display</span>: block
    <span class="hljs-attribute">position</span>: absolute
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>
    <span class="hljs-attribute">border-top</span>: <span class="hljs-number">1px</span> solid <span class="hljs-variable">$color</span>
    <span class="hljs-attribute">content</span>: <span class="hljs-string">' '</span>
    
@media (-webkit-min-device-pixel-ratio: <span class="hljs-number">1.5</span>),(min-device-pixel-ratio: <span class="hljs-number">1.5</span>)
  <span class="hljs-selector-class">.border-1px</span>
    &amp;::after
      -webkit-<span class="hljs-attribute">transform</span>: scaleY(<span class="hljs-number">0.7</span>)
      <span class="hljs-attribute">transform</span>: scaleY(<span class="hljs-number">0.7</span>)

@media (-webkit-min-device-pixel-ratio: <span class="hljs-number">2</span>),(min-device-pixel-ratio: <span class="hljs-number">2</span>)
  <span class="hljs-selector-class">.border-1px</span>
    &amp;::after
      -webkit-<span class="hljs-attribute">transform</span>: scaleY(<span class="hljs-number">0.5</span>)
      <span class="hljs-attribute">transform</span>: scaleY(<span class="hljs-number">0.5</span>)
</code></pre>
<ul><li>图片上传</li></ul>
<p>可以使用input中type的file属性，然后用html5的新属性hidden来隐藏掉这个节点，通过点击其他的节点来触发这个input type=file的点击事件，再利用lrz的图片压缩将图片优美的输出到也页面中。拿里面的上传头像的代码贴一下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="html:
<div class=&quot;avatar&quot; @click=&quot;addPic&quot;>
    <img :src=&quot;url&quot; alt=&quot;&quot;>
    <span class=&quot;upavatar&quot;>上传帅照</span>
    <input type=&quot;file&quot; hidden accept=&quot;image/jpeg,image/jpg,image/png&quot; capture=&quot;camera&quot; @change=&quot;fileInput&quot; ref=&quot;file&quot;>
</div>

js 方法：

addPic() {
  this.$refs.file.click()
},              //点击触发fileInput事件

fileInput(e) {
  let files = e.target.files
  console.log(files)
  if(!files.length) return
  this.createImage(files, e)
},

createImage(files, e) {
  lrz(files[0], { width: 480 }).then(rst=> {
    this.url = rst.base64
  }).catch(err=> {
    console.log(err)
  }).always(()=> {
    e.tartget.value = null
  })
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>html:
&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"avatar"</span> <span class="hljs-meta">@click</span>=<span class="hljs-string">"addPic"</span>&gt;
    &lt;img :src=<span class="hljs-string">"url"</span> alt=<span class="hljs-string">""</span>&gt;
    &lt;span <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"upavatar"</span>&gt;上传帅照&lt;/span&gt;
    &lt;input <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"file"</span> hidden accept=<span class="hljs-string">"image/jpeg,image/jpg,image/png"</span> capture=<span class="hljs-string">"camera"</span> <span class="hljs-meta">@change</span>=<span class="hljs-string">"fileInput"</span> ref=<span class="hljs-string">"file"</span>&gt;
&lt;/div&gt;

js 方法：

addPic() {
  <span class="hljs-keyword">this</span>.$refs.file.click()
},              <span class="hljs-comment">//点击触发fileInput事件</span>

fileInput(e) {
  let files = e.target.files
  console.log(files)
  <span class="hljs-keyword">if</span>(!files.length) <span class="hljs-keyword">return</span>
  <span class="hljs-keyword">this</span>.createImage(files, e)
},

createImage(files, e) {
  lrz(files[<span class="hljs-number">0</span>], { width: <span class="hljs-number">480</span> }).then(rst=&gt; {
    <span class="hljs-keyword">this</span>.url = rst.base64
  }).<span class="hljs-keyword">catch</span>(err=&gt; {
    console.log(err)
  }).always(()=&gt; {
    e.tartget.value = <span class="hljs-literal">null</span>
  })
},</code></pre>
<hr>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000015994551" src="https://static.alili.tech/img/remote/1460000015994551" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader5">结语</h2>
<p>**很多东西细节想聊出来，比如嵌套路由所踩的坑..等，但是最近忙于找工作，时间问题就写到这里，有兴趣或者正在学习vue的同学可以查看我的github源码。<a href="https://github.com/LLZUPUP/vue-fallowFish" rel="nofollow noreferrer" target="_blank">fallow-fish</a><br><br><br>如果对你有帮助，可以star我的项目给我一点点的鼓励，也希望有志同道和的可以加入一起讨论，我也会第一时间帮你解答。**</p>

                
{{< /raw >}}

# 版权声明
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文链接
[https://segmentfault.com/a/1190000015994542](https://segmentfault.com/a/1190000015994542)

## 原文标题
vue全家桶仿某鱼部分布局以及功能实现
