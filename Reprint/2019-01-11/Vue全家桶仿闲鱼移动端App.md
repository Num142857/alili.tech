---
title: 'Vue全家桶仿闲鱼移动端App' 
date: 2019-01-11 2:30:08
hidden: true
slug: 4d0phjoa2n9
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">官方文档介绍：Vue.js，一套渐进式的JavaScript框架，拥有简单小巧的核心，却足以应付任何规模的应用。因此，想通过仿闲鱼移动端App这个项目来感受vue带来的灵活与轻盈。</h3>
<p>话不多说，来看看效果吧（请自动忽略渣像素，如果有好的录屏方法，可以在评论区安利给我哟，不胜感激O(∩_∩)O）</p>
<p><strong>登录与注销</strong> <br></p>
<p><span class="img-wrap"><img data-src="/img/bVPMJd?w=332&amp;h=587" src="https://static.alili.tech/img/bVPMJd?w=332&amp;h=587" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><strong>购买闲置</strong><br></p>
<p><span class="img-wrap"><img data-src="/img/bVPMJp?w=345&amp;h=608" src="https://static.alili.tech/img/bVPMJp?w=345&amp;h=608" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><strong>发布闲置</strong><br></p>
<p><span class="img-wrap"><img data-src="/img/bVPMJs?w=345&amp;h=608" src="https://static.alili.tech/img/bVPMJs?w=345&amp;h=608" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><strong>搜索功能</strong><br></p>
<p><span class="img-wrap"><img data-src="/img/bVPMJv?w=333&amp;h=589" src="https://static.alili.tech/img/bVPMJv?w=333&amp;h=589" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader1">在线预览</h3>
<p><strong>线上体验</strong>： <a href="https://sukura7.github.io/vue-xianyu-demo/index.html#/" rel="nofollow noreferrer" target="_blank">demo</a> (ps： 浏览器f12切换移动端查看效果更佳)<br><br><strong>源码</strong>： <a href="https://github.com/Sukura7/vue-ali-xianyu" rel="nofollow noreferrer" target="_blank">源码</a> <br></p>
<h1 id="articleHeader2">技术栈</h1>
<ul>
<li>vue 页面显示</li>
<li>vue-router实现spa</li>
<li>vuex 组件状态共享</li>
<li>axios 解决异步请求</li>
<li>esay-mock 提供数据接口，使用它不会出现跨域的麻烦</li>
<li>es6 代码书写优雅美观</li>
<li>lrz localResizeIMG图片先压缩再上传</li>
<li>webpack 文件打包</li>
<li>html5 css3 内容与装饰</li>
</ul>
<h1 id="articleHeader3">组件库</h1>
<ul>
<li>mint-ui element-ui下的一款产品，打理移动端的UI特别好用，提供丰富的组件</li>
<li>vue-awesome-swiper 轮播图插件，虽然mint-ui也提供了轮播图插件，但是突然想玩一下swiper，所以咱们借用一下swiper组件</li>
<li>vue-region-picker china-area-data 我们国家城市选择器组件，便于地址的管理</li>
</ul>
<h1 id="articleHeader4">实现功能</h1>
<ul>
<li>
<strong>登录与注销</strong><br>  用户进入App会有两种状态，登录和未登录。当你未登录的时候，你查看的界面是有效的，在必要的时候，会提醒你进行登录，所以，这就会产生状态的切换，那我们要怎样来登记这个状态呢？<code>Localstorage</code>?可以。但是这里我使用了<code>vuex</code>来实现状态的共享，因为我需要保存的状态有太多了，当你的页面超过了十几个，你就可以考虑使用vuex.</li>
<li>
<strong>发布闲置</strong><br>  用户可以发布想要卖掉的东西，这里的核心就是在移动端设备上调用相机，调用相册，现在科技发展的太快，移动设备像素越来越高，随便一张照片2M+，因此解决移动端图片上传问题，可以借助<code>lrz</code>插件将图片按设定的的宽高压缩成base64的文件，然后通过<code>ajax</code>请求将图片发送给后端，进行保存。用户可以进行多次发布，当然这也是用<code>vuex</code>实现的，在state里设置一个数组变量，通过数组的push方法将你发布的数据添加进去。</li>
<li>
<strong>删除发布</strong><br>  删除发布的难点在于我们怎么去实现绑定在v-for渲染出来的模板上的方法，这么说可能有点绕口，简单的说，怎么知道你就是要删除某个发布。其实，解决这个疑惑，我们就要用好v-for这个指令，它可以有index这个参数来标识当前的索引，而刚刚好，这个标识就是我们用户选中项的索引值，所以，只要我们把v-for指令等其他可以配合的指令用灵活，就没有什么问题解决不了。</li>
<li>
<strong>购买商品</strong><br>  其实购买商品跟发布闲置的思想差不多，甚至比发布还要简单，因为它没用图片上传问题，这里会有一个城市三金联动插件会用到，这也带来了很多遍历。补充一点，发布闲置和购买商品后，相应的数量值也会-1，这个也是用vuex实现的。</li>
<li>
<strong>删除订单</strong><br>  删除订单对应删除发布，删除之后相应的数量会减少，当然，以上些都基于你已经登录，如果是位登录状态是无法进行操作的。</li>
<li>
<strong>撩客服</strong><br>  如果你有看<a href="https://sukura7.github.io/vue-xianyu-demo/index.html#/" rel="nofollow noreferrer" target="_blank">demo</a>的话，那么你会注意到这里可以发送消息，而且也可以发送表情。表情的实现是个难点，我是学着GitHub上一位大佬老做的，其实每一个emoji就是一张图片，只是以code的形式展现，通过正则表达式以及数组的切割方法将它以<code>&lt;img src=""/&gt;</code>的格式输出。此处实现的确有点难，但是想明白后也就理解了，如果感兴趣的话，可以看<a href="https://github.com/Sukura7/vue-ali-xianyu" rel="nofollow noreferrer" target="_blank">源码</a>。</li>
<li>
<p><strong>搜索商品</strong><br>  用户输入关键字，通过ajax发送到后台数据，这里利用了字符串的indexOf()方法来判断用户输入的关键字有没有在后台返回的数据里，有的话就输出数据，没有就输出提示。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.axios.get('https://easy-mock.com/mock/593f72288ac26d795ff1e570/search/results')
          .then((res) => {
let result = res.data
console.log(result)
for( let i in result){
  let item = i
  console.log(item.indexOf(this.keywords))
  if(item.indexOf(this.keywords) !== -1){
      this.items = result[item]
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">this</span>.axios.get(<span class="hljs-string">'https://easy-mock.com/mock/593f72288ac26d795ff1e570/search/results'</span>)
          .then(<span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> {
<span class="hljs-keyword">let</span> result = res.data
<span class="hljs-built_in">console</span>.log(result)
<span class="hljs-keyword">for</span>( <span class="hljs-keyword">let</span> i <span class="hljs-keyword">in</span> result){
  <span class="hljs-keyword">let</span> item = i
  <span class="hljs-built_in">console</span>.log(item.indexOf(<span class="hljs-keyword">this</span>.keywords))
  <span class="hljs-keyword">if</span>(item.indexOf(<span class="hljs-keyword">this</span>.keywords) !== <span class="hljs-number">-1</span>){
      <span class="hljs-keyword">this</span>.items = result[item]
  }
}</code></pre>
</li>
<li>
<strong>div、css3打造自定义数字键盘</strong><br>  类似支付宝、银行等App都有自带的数字键盘提供给用户使用，这是怎么实现的呢？其实，div+css3+js就能帮你实现，这里不需要用input标签，因为它会带来反作用，在移动端它会唤醒你手机的自带输入法键盘，而在PC端则会允许用户输入任意的东西，显然这不是我们想要的效果。所以，我们就使用一个div好了，而闪烁光标用css3的animation来模拟就行啦,这样不就很像一个输入框了，剩下的逻辑控制就交给js了。一个流程下来，数字键盘的表现和功能就完成了。</li>
<li>
<strong>跟随导航</strong><br>  什么是跟随导航？就是随着你的滚动或滑动到某一个位置固定住的导航栏，在很多应用里都有这个需求。它的实现并不是很难，就是通过window的scroll事件判断来判断滚动的距离是否大于某一个值，如果大于，就把导航元素固定在某一位置。</li>
<li>
<strong>返回顶部</strong><br>  这里的需求就是，用户浏览了很长的页面，希望一键就能跑到顶部去，这个时候，就需要用到返回顶部这个事件了，它的实现跟上面原理类似，都是判断滚轮滑动的位置，如果大于某一个值，咱们就把这个值慢慢的变小，直到为0。</li>
<li>
<strong>图片轮播</strong><br>  借助mint-ui组件里的mt-swiper,配置一些相关的变量即可轻松实现，赠上<a href="http://mint-ui.github.io/docs/#/" rel="nofollow noreferrer" target="_blank">mint-ui</a>文档</li>
</ul>
<h1 id="articleHeader5">入过的坑</h1>
<ul>
<li>
<p><strong>跨域操作</strong><br>  在实现搜索功能的时候，我企图调用闲鱼官网的接口来获取数据，但是很不幸，他告诉我跨域。但是没关系，CORS来应付，我们只需在后端领域里配置一下响应头就行，<code>header("Access-Control-Allow-Origin：*")</code> 当然这种方法必须开启cors才能成功。还有另外一种方法就是在config文件夹的index.js中设置代理来解决跨域问题。形如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="proxyTable: {
      '/api': {
            target: 'https://s.2.taobao.com/list/list.htm?q=',
            changeOrigin: true,
            pathRewrite: { //需要rewrite重写的, 如果在服务器端做了处理则可以不要这段
             '^/api': ''
            }
      }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-attribute">proxyTable</span>: {
      <span class="hljs-string">'/api'</span>: {
            <span class="hljs-attribute">target</span>: <span class="hljs-string">'https://s.2.taobao.com/list/list.htm?q='</span>,
            <span class="hljs-attribute">changeOrigin</span>: true,
            <span class="hljs-attribute">pathRewrite</span>: { <span class="hljs-comment">//需要rewrite重写的, 如果在服务器端做了处理则可以不要这段</span>
             <span class="hljs-string">'^/api'</span>: <span class="hljs-string">''</span>
            }
      }</code></pre>
</li>
<li>
<strong>设备适配</strong><br>  市面上充斥着各式各样的手机，设备适配问题成了web开发的一个大挑战，现在也提出了各种解决方案，我采用的是css3的rem单位来解决适配问题，rem就是将根节点html的font-size的值作为整个页面的基准尺寸，默认html的font-size是16px，即1rem=16px，在未来的css样式里将你所有的px都按这样的比例换算成rem(字体的大小除外)，如果选择了这种方式，请rem一路到底，不然页面就会炸。</li>
<li>
<strong>移动端图片上传</strong><br>  上面有提到使用lrz图片压缩插件来实现，但是在适配手机时，发现有些手机不能够调用手机的相机以及本地文件，我猜想是用户的权限问题，你需要在设置里授予这个权限，不然也就不能传图片了。</li>
<li>
<strong>vue组件通信</strong><br>  vue由许多的组件组成，那么各组件之间的通信就成了一个问题。vue中组件之间传值有这么几种方式。如果是页面较少，就可以考虑使用props传值，父传子，子传孙，一直传下去···但是，使用Props，会有些麻烦，状态的改变要往回传，页面一多就有些烦人。所以如果你的页面超过了10个以上，就要考虑vuex了，vuex就是专门为vue.js开发的状态管理模式，能够实现组件之间的组件共享。</li>
</ul>
<h1 id="articleHeader6">总结<br>
</h1>
<p>未来不会停止这个项目，会保持更新，逐步细化完善更多功能，如果有帮助可以fork和star,希望聆听你们的建议和更正~<br></p>
<p><strong>使用手则</strong><br><br><strong>Build Setup</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  # install dependencies
  npm install

  # serve with hot reload at localhost:8081
  npm run dev

  # build for production with minification
  npm run build

  # build for production and view the bundle analyzer report
  npm run build --report
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>  <span class="hljs-comment"># install dependencies</span>
  npm install

  <span class="hljs-comment"># serve with hot reload at localhost:8081</span>
  npm <span class="hljs-keyword">run</span><span class="bash"> dev
</span>
  <span class="hljs-comment"># build for production with minification</span>
  npm <span class="hljs-keyword">run</span><span class="bash"> build
</span>
  <span class="hljs-comment"># build for production and view the bundle analyzer report</span>
  npm <span class="hljs-keyword">run</span><span class="bash"> build --report
</span></code></pre>
<p>For detailed explanation on how things work, checkout the <a href="http://vuejs-templates.github.io/webpack/" rel="nofollow noreferrer" target="_blank">guide</a> and <a href="http://vuejs.github.io/vue-loader" rel="nofollow noreferrer" target="_blank">docs for vue-     loader</a>.</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue全家桶仿闲鱼移动端App

## 原文链接
[https://segmentfault.com/a/1190000009919769](https://segmentfault.com/a/1190000009919769)

