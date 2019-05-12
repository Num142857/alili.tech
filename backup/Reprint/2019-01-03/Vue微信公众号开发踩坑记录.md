---
title: 'Vue微信公众号开发踩坑记录' 
date: 2019-01-03 2:30:11
hidden: true
slug: qlv5h18oxs8
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">需求</h2>
<ul>
<li>微信授权登录（基于公众号的登录方案）</li>
<li>接入JS-SDK实现图片上传，分享等功能</li>
</ul>
<h2 id="articleHeader1">现状及难点</h2>
<ul>
<li>采用的Vue框架，前后端分离模式（vue工程仅作为客户端），用户通过域名访问的是客户端，但是微信授权中涉及签名和token校验依赖服务端</li>
<li>JS-SDK需要向服务端获取签名，且获取签名中需要的参数包括所在页面的url，但由于单页应用的路由特殊，其中涉及到iOS和android微信客户端浏览器内核的差异性导致的兼容问题</li>
</ul>
<h2 id="articleHeader2">解决方案</h2>
<h3 id="articleHeader3">授权登录</h3>
<p>本人将授权流程设计如下：<br><span class="img-wrap"><img data-src="/img/remote/1460000010753252" src="https://static.alili.tech/img/remote/1460000010753252" alt="此处输入图片的描述" title="此处输入图片的描述" style="cursor: pointer;"></span><br>详细说明：</p>
<ol>
<li>用户访问网站主域名</li>
<li>vue客户端(domain/)接收请求，在路由解析前判断用户是否登录（比如检查cookie）；</li>
<li>如果没有登录，则通过api获取微信授权地址，获取后跳转到微信授权页面；</li>
<li>用户确认授权，微信服务器发起回调请求，这时回调到服务器端（domain/api/xxx）</li>
<li>服务器端保存用户信息，进行注册登录操作（记录cookie），重定向到vue客户端（domain/）</li>
<li>重复第一步，授权登录成功</li>
</ol>
<p>踩坑记录：<br>以下是另一个授权方案<br><span class="img-wrap"><img data-src="/img/remote/1460000010753253" src="https://static.alili.tech/img/remote/1460000010753253" alt="此处输入图片的描述" title="此处输入图片的描述" style="cursor: pointer; display: inline;"></span><br>其实如果只实现授权登录到话，这个方案是可以的，而且也很清晰，vue客户端单方面在服务器和微信服务器之间进行通信，微信服务器不能直接和服务器通信。这种方案的坑在于当微信授权回调时会携带一个code参数，该参数会污染vue路由导致ios上进行JS-SDK签名时失败（后续会具体描述这个问题）</p>
<h3 id="articleHeader4">JS-SDK签名</h3>
<p>对于签名，官方是这么说的</p>
<blockquote>所有需要使用JS-SDK的页面必须先注入配置信息，否则将无法调用（同一个url仅需调用一次，对于变化url的SPA的web app可在每次url变化时进行调用</blockquote>
<p>vue中路由有history和hash两种模式；在history模式下，理想的设计方案是，当进入到需要用到JS-SDK组件时，获取以下当前url（也就是通过 location.href.split(‘#’)[0]获得到的地址）传递到服务端进行签名，应该就没问题了，但是<strong>IOS获取的url并不是调用微信js的时候所在页面的地址，而是进入到网站第一个页面的地址。</strong> </p>
<p>网上查询到一个方案是针对ios设备进入页面时先将当前url记录下来，到授权页面时将记录的url传递给服务端进行签名。该方案经实践是可行的，妈妈再也不用担心我的网址很丑很难看啦。</p>
<p>另外一个方案就是使用hash模式，这种模式下，url永远都只是主域名地址，省去了传递url的烦恼，也没必要处理兼容，所以如果不建议路由中有<code>#</code>的话，该方案应该是首选方案。</p>
<p>这里还有一个深坑，那就是如果授权方案采用了上述中的vue客户端处理回调的方式，那么ios将永远无法签名成功，为什么呢，因为这种方案路由通常是这样子的:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="http://domain.com/?code=xxxxxx&amp;stat=#/xxx" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code style="word-break: break-word; white-space: initial;"><span class="hljs-symbol">http:</span>//domain.com/?code=xxxxxx&amp;stat=<span class="hljs-meta">#/xxx</span></code></pre>
<p>这种路由中带了参数的url是没法签名校验成功的！<br>这种路由中带了参数的url是没法签名校验成功的！<br>这种路由中带了参数的url是没法签名校验成功的！<br>重要的事情得说三遍啊<br>在我另外一篇文章中对js-sdk签名做了更多的介绍，可以移步到<a href="https://segmentfault.com/a/1190000012339148">vue微信公众号开发踩坑记录（2）</a></p>
<h2 id="articleHeader5">Coding</h2>
<p>任何不上代码的吹逼都是耍流氓，这里笔者分享下在vue中具体怎么coding的。</p>
<h3 id="articleHeader6">微信授权登录</h3>
<p>笔者在项目中使用的vue-router进行路由控制，使用了vuex记录用户登录信息，但是由于vuex中存储的内容在页面刷新后会丢失，所以服务端同时也写了用户登录状态到cookie中，vue中需要通过这两个条件进行登录判断，不多BB，直接看代码吧</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ... other code

router.beforeEach((to, from, next) => {
  if ((!VueCookie.get('user') &amp;&amp; !store.state.userInfo)) {
    // 第一次访问
    console.log('授权登录')
    // 跳转到微信授权页面，微信授权地址通过服务端获得
    axios.post('/api/login').then(res => {
      var data = res.data
      if (data.code === 100) {
        window.location.href = data.data
      }
    })
  } else if (!store.state.userInfo) {
    // 刷新页面，获取数据存入vuex
    axios.get('/api/currentuser').then(res => {
      if (res.data.code === 100) {
        store.dispatch('setUserInfo', res.data.data)
        next()
      }
    })
    console.log('cookie生效期内登录')
    next()
  } else {
    // 已经登录
    console.log('已登录')
    next()
  }
})

//... other code" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-comment">// ... other code</span>

router.beforeEach((<span class="hljs-keyword">to</span>, from, next) =&gt; {
  <span class="hljs-keyword">if</span> ((!VueCookie.get(<span class="hljs-string">'user'</span>) &amp;&amp; !store.state.userInfo)) {
    <span class="hljs-comment">// 第一次访问</span>
    console.<span class="hljs-keyword">log</span>(<span class="hljs-string">'授权登录'</span>)
    <span class="hljs-comment">// 跳转到微信授权页面，微信授权地址通过服务端获得</span>
    axios.post(<span class="hljs-string">'/api/login'</span>).then(res =&gt; {
      <span class="hljs-built_in">var</span> <span class="hljs-built_in">data</span> = res.<span class="hljs-built_in">data</span>
      <span class="hljs-keyword">if</span> (<span class="hljs-built_in">data</span>.code === <span class="hljs-number">100</span>) {
        window.location.href = <span class="hljs-built_in">data</span>.<span class="hljs-built_in">data</span>
      }
    })
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (!store.state.userInfo) {
    <span class="hljs-comment">// 刷新页面，获取数据存入vuex</span>
    axios.get(<span class="hljs-string">'/api/currentuser'</span>).then(res =&gt; {
      <span class="hljs-keyword">if</span> (res.<span class="hljs-built_in">data</span>.code === <span class="hljs-number">100</span>) {
        store.dispatch(<span class="hljs-string">'setUserInfo'</span>, res.<span class="hljs-built_in">data</span>.<span class="hljs-built_in">data</span>)
        next()
      }
    })
    console.<span class="hljs-keyword">log</span>(<span class="hljs-string">'cookie生效期内登录'</span>)
    next()
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-comment">// 已经登录</span>
    console.<span class="hljs-keyword">log</span>(<span class="hljs-string">'已登录'</span>)
    next()
  }
})

<span class="hljs-comment">//... other code</span></code></pre>
<h3 id="articleHeader7">history模式下的JS-SDK签名</h3>
<p>在入口文件中将当前url存入vuex</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ... other code
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  // 处理jssdk签名,兼容history模式
  if (!store.state.url) {
    store.commit('setUrl', document.URL)
  }
  // ... other code" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">// ... other code</span>
router.beforeEach((to, from, next) =&gt; {
  document<span class="hljs-selector-class">.title</span> = to<span class="hljs-selector-class">.meta</span><span class="hljs-selector-class">.title</span>
  <span class="hljs-comment">// 处理jssdk签名,兼容history模式</span>
  <span class="hljs-keyword">if</span> (!store<span class="hljs-selector-class">.state</span><span class="hljs-selector-class">.url</span>) {
    store.commit(<span class="hljs-string">'setUrl'</span>, document.URL)
  }
  <span class="hljs-comment">// ... other code</span></code></pre>
<p>在需要获取签名的组件中获取并进行配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ... other code
created () {
      var sef = this
      var url = ''
      // 判断是否是ios微信浏览器
      if (window.__wxjs_is_wkwebview === true) {
        url = this.$store.state.url.split('#')[0]
      } else {
        url = window.location.href.split('#')[0]
      }
      this.$http.get('/api/jssdk?url=' + url).then(function (res) {
        sef.lists = res.data.data
        hmTools.wechact(sef.lists, sef) //js-sdk配置
      })
    }
// ...other code" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-comment">// ... other code</span>
created () {
      <span class="hljs-built_in">var</span> sef = <span class="hljs-keyword">this</span>
      <span class="hljs-built_in">var</span> <span class="hljs-built_in">url</span> = <span class="hljs-string">''</span>
      <span class="hljs-comment">// 判断是否是ios微信浏览器</span>
      <span class="hljs-keyword">if</span> (<span class="hljs-built_in">window</span>.__wxjs_is_wkwebview === <span class="hljs-literal">true</span>) {
        <span class="hljs-built_in">url</span> = <span class="hljs-keyword">this</span>.$store.state.url.split(<span class="hljs-string">'#'</span>)[<span class="hljs-number">0</span>]
      } <span class="hljs-title">else</span> {
        <span class="hljs-built_in">url</span> = <span class="hljs-built_in">window</span>.location.href.split(<span class="hljs-string">'#'</span>)[<span class="hljs-number">0</span>]
      }
      <span class="hljs-keyword">this</span>.$http.get(<span class="hljs-string">'/api/jssdk?url='</span> + <span class="hljs-built_in">url</span>).then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">res</span>) </span>{
        sef.lists = res.data.data
        hmTools.wechact(sef.lists, sef) <span class="hljs-comment">//js-sdk配置</span>
      })
    }
<span class="hljs-comment">// ...other code</span></code></pre>
<h2 id="articleHeader8">结语</h2>
<p>由于本人文笔一般，思维的表达估计不到位，见解也是浅尝辄止，所以如果看官您有疑惑的地方或者有歧义欢迎来和本人交流。为了方便大家互相沟通，本人也创建了一个vue公众号开发的qq群，欢迎加入和大家一起分享开发心得，qq群号：130903919</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue微信公众号开发踩坑记录

## 原文链接
[https://segmentfault.com/a/1190000010753247](https://segmentfault.com/a/1190000010753247)

