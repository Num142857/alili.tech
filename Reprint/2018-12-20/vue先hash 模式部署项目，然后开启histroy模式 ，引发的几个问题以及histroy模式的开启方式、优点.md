---
title: 'vue先hash 模式部署项目，然后开启histroy模式 ，引发的几个问题以及histroy模式的开启方式、优点' 
date: 2018-12-20 2:30:10
hidden: true
slug: 24zhklel6lj
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言：</h2>
<p>vue路由有一个<a href="https://router.vuejs.org/zh-cn/essentials/history-mode.html" rel="nofollow noreferrer" target="_blank">HTML5 History 模式</a>,这个模式要在路由里面另外开启的，很多人在刚使用路由的时候之前不知道这个模式，所以并没有启用，然后就把项目部署上去了，因为这个模式还是有挺多优点的，最后还是会开启这个模式。</p>
<p>然而因为<strong>之前使用hash模式再改为histroy模式还是有些问题的</strong>，我已经踩过坑了，然后把这几个问题写出来。有需要的朋友可以做一下参考，喜欢的可以点波赞，或者关注一下，希望可以帮到大家。</p>
<blockquote>本文首发于我的个人blog：<a href="http://obkoro1.com/" rel="nofollow noreferrer" target="_blank">obkoro1.com</a>
</blockquote>
<h3 id="articleHeader1">开启history模式：</h3>
<p>如果不开启的话，路由默认是hash模式，开启这个模式前端的工作也很简单，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    mode: 'history' //在路由那里配置一下这个
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>    <span class="hljs-attribute">mode</span>: <span class="hljs-string">'history'</span> <span class="hljs-comment">//在路由那里配置一下这个</span>
</code></pre>
<p>最后需要后端的做一些配置配合，这里可以参考一下文档给的<a href="https://router.vuejs.org/zh-cn/essentials/history-mode.html" rel="nofollow noreferrer" target="_blank">栗子</a>。</p>
<h2 id="articleHeader2">history模式的优点:</h2>
<ol>
<li>url变成真正的url，url看上去更好看。<p><a href="http://yoursite.com/#/a/b" rel="nofollow noreferrer" target="_blank">http://yoursite.com/#/a/b</a>  //hash模式<br><a href="http://yoursite.com/a/b" rel="nofollow noreferrer" target="_blank">http://yoursite.com/a/b</a>  //history模式</p>
</li>
<li>可以使用vue-router的<a href="https://router.vuejs.org/zh-cn/advanced/scroll-behavior.html" rel="nofollow noreferrer" target="_blank">滚动行为</a>，这个用来记忆进入其他页面之前的位置非常好用，配置一下就可以直接使用了，前提是开启histroy模式。</li>
</ol>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012570102?w=1062&amp;h=271" src="https://static.alili.tech/img/remote/1460000012570102?w=1062&amp;h=271" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<ol>
<li>类似<a href="http://obkoro1.com/2017/12/16/vue-%E9%A1%B9%E7%9B%AE%E5%A6%82%E4%BD%95%E5%BC%95%E5%85%A5%E5%BE%AE%E4%BF%A1sdk%EF%BC%8C%E4%BD%BF%E7%94%A8%E5%BE%AE%E4%BF%A1%E5%88%86%E4%BA%AB%E6%8E%A5%E5%8F%A3/" rel="nofollow noreferrer" target="_blank">项目引入微信js-sdk</a>的时候，一些操作是对url是有要求，url不能带上'#'，如果没有开启histroy模式，很可能会导致问题。</li>
<li>像vue-cli的配置，都是以路由开启history模式的标准来配置的（下面会讲到一个栗子），没有开启的话，自己要另外配置。</li>
</ol>
<h2 id="articleHeader3">先hash模式，后histroy模式</h2>
<p>就像开头说的，这里的问题指的是：<strong>先用hash模式部署项目到线上，然后再开启histroy模式</strong>，由此引发的一些问题。</p>
<h3 id="articleHeader4">1.找不到资源问题：</h3>
<p><strong>在hash模式下面，直接打包的话，会导致找不到css、js和图片资源</strong>，然后经过百度之后，做出了如下截图的配置操作，更改<code>assetsPublicPath：'/'</code>为 <code>assetsPublicPath：'./'</code></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012570103" src="https://static.alili.tech/img/remote/1460000012570103" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>在hash模式下，像上面那么配置就没有问题了。当时我还以为vue-cli配置有问题，实际上，人家才没有问题呢，是我们自己没有开启history模式的问题。</p>
<p>然后开启了histroy模式之后，因为我们之前更改了assetsPublicPath属性，所以要把那个<code>.</code>给去掉，改回来：<code>assetsPublicPath：'/'</code></p>
<h3 id="articleHeader5">2.请求带上路由，导致请求失败</h3>
<h4>正确的请求是：</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    http:www.xxx.com/api/接口 //api是我通过proxyTable转发地址的代理名字
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>    http:www<span class="hljs-selector-class">.xxx</span><span class="hljs-selector-class">.com</span>/api/接口 <span class="hljs-comment">//api是我通过proxyTable转发地址的代理名字</span>
</code></pre>
<h4>开启histroy模式之后：</h4>
<p>在二层的路由里面会出现这种情况：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    路由是：http:www.xxx.com/a/b
    http:www.xxx.com/api/a/接口 //这就导致了请求失败，要把a也去掉才是正确的
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>    路由是：http:www<span class="hljs-selector-class">.xxx</span><span class="hljs-selector-class">.com</span>/a/<span class="hljs-selector-tag">b</span>
    http:www<span class="hljs-selector-class">.xxx</span><span class="hljs-selector-class">.com</span>/api/a/接口 <span class="hljs-comment">//这就导致了请求失败，要把a也去掉才是正确的</span>
</code></pre>
<p>解决方式是：</p>
<p>因为我用的是<a href="https://www.kancloud.cn/yunye/axios/234845" rel="nofollow noreferrer" target="_blank">axios</a>，所以可以在<a href="https://juejin.im/post/59fd982c6fb9a045170490df" rel="nofollow noreferrer" target="_blank">全局请求</a>中设置一个baseURL，这个baseURL就是项目的网站地址（<a href="http:www.xxx.com">http:www.xxx.com</a>）,然后二层的路由也会自动去掉前面的a和b。</p>
<h3 id="articleHeader6">3.cookie问题</h3>
<p>这个实际上不是个问题，完全是自己作的，<strong>我把项目分为两层。所以从a登录，b那边刷新就会出现没有cookie的情况</strong>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
    两层路由
    http://yoursite.com/a
    http://yoursite.com/b
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>
    两层路由
<span class="hljs-symbol">    http:</span><span class="hljs-comment">//yoursite.com/a</span>
<span class="hljs-symbol">    http:</span><span class="hljs-comment">//yoursite.com/b</span>
</code></pre>
<p>这里是因为cookie能否拿到跟存储的路由位置是有关的，之前使用hash模式因为hash模式的url<code>http://yoursite.com/#/a/b</code>，会统一存在<a href="http://yoursite.com%E4%B8%8B%E9%9D%A2" rel="nofollow noreferrer" target="_blank">http://yoursite.com下面</a>。</p>
<p>而history模式cookie就会存在<code>http://yoursite.com/a</code>或者<code>http://yoursite.com/b</code>下面，另外一边就会没有cookiie。</p>
<h4>解决办法：</h4>
<ol>
<li>不要分为两层，统一所有的路由都在一个路由地址下面。</li>
<li>在项目的路由的根地址<code>path:'/'</code>里面存cookie。</li>
<li>
<p>使用sessionStorage存信息，我就是用这个方法，<a href="http://obkoro1.com/2017/11/25/cookie%E3%80%81localStorage%E5%92%8CsessionStorage%20%E4%B8%89%E8%80%85%E4%B9%8B%E9%97%B4%E7%9A%84%E5%8C%BA%E5%88%AB%E4%BB%A5%E5%8F%8A%E5%AD%98%E5%82%A8%E3%80%81%E8%8E%B7%E5%8F%96%E3%80%81%E5%88%A0%E9%99%A4%E7%AD%89%E4%BD%BF%E7%94%A8%E6%96%B9%E5%BC%8F/" rel="nofollow noreferrer" target="_blank">使用方法</a>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="sessionStorage只要在http://yoursite.com都可以访问的到，不管是存在a上面还是b上面。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>sessionStorage只要在<span class="hljs-string">http:</span><span class="hljs-comment">//yoursite.com都可以访问的到，不管是存在a上面还是b上面。</span>
</code></pre>
</li>
</ol>
<h2 id="articleHeader7">后话</h2>
<p>以上就是本文的所有内容，建议项目一开始还是直接跟后端说一下，开启histroy模式，省得后面的种种坑。上面的内容都是本人亲自踩坑之后的血泪教训，希望可以帮助到需要的朋友，然后祝大家圣诞节快乐。</p>
<p><strong>最后</strong>：如需转载，请放上原文链接并署名。码字不易，<strong>感谢</strong>支持！本人写文章本着交流记录的心态，写的不好之处，不撕逼，但是欢迎指点。然后就是希望看完的朋友点个<strong>喜欢</strong>，也可以<strong>关注</strong>一下我。<br><strong><a href="http://obkoro1.com/" rel="nofollow noreferrer" target="_blank">个人blog</a></strong> and <strong><a href="https://juejin.im/user/58714f0eb123db4a2eb95372" rel="nofollow noreferrer" target="_blank">掘金个人主页</a></strong>  </p>
<p>以上2017.12.25</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue先hash 模式部署项目，然后开启histroy模式 ，引发的几个问题以及histroy模式的开启方式、优点

## 原文链接
[https://segmentfault.com/a/1190000012570097](https://segmentfault.com/a/1190000012570097)

