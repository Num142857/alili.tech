---
title: 'VUE开发SPA之较舒服的微信授权登录' 
date: 2019-01-14 2:30:07
hidden: true
slug: 0wafkrmsso9e
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">SPA单页应用中微信授权登录的一点思路</h3>
<p>单页应用应该如何解决微信授权登录的尴尬跳转？后退无法返回？<br>主要遇到的问题就是  <br>先进入单页应用，一边渲染页面一边判断用户有没有登录，当判断到没有登录时异步数据请求已经发送出去了，然后要跳转到微信授权页面，这样就浪费了一次网络请求且用户可能要去点击这个数据了结果...跳走了！在授权成功后用户点击后退再次进行授权有没有？？？<br>本文主要讲述</p>
<blockquote>对于单页应用应该在哪个阶段获取微信授权？  <br> 只考虑网站完全依赖微信授权登录，一进入就要以授权的身份进入</blockquote>
<h4>基本思路</h4>
<p>核心是需要有个author.vue  叫它授权中间页好了</p>
<p><span class="img-wrap"><img data-src="/img/bVNZQC?w=558&amp;h=814" src="https://static.alili.tech/img/bVNZQC?w=558&amp;h=814" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h4>vue开发过程中的一些点子</h4>
<p>由于我的业务是完全依赖微信授权登录的，也就是用户一进来就应该是已经完成授权的  <br>为了避免让用户明显感觉到先进入网站然后又跳转到微信授权页面  <br>我们从<strong>vue-router</strong>下手  <br>基本实现思路是：</p>
<ul>
<li>无论使用哪个url进入网站都会先触发router.beforeEach钩子</li>
<li>在router.beforeEach钩子中判断用户当前登录状态</li>
<li>若没有登录则保存用户进入的url并跳转到author授权页面</li>
<li>author授权页面完成微信授权以及token的写入实现用户登录</li>
<li>获取前面保存的用户进入url并跳转</li>
</ul>
<p>经过这样一个流程，用户感觉到的就是，无论从哪个url进入SPA，都会先显示author页面，然后再进入自己想要进入的页面，而不是先进入自己想要进入的页面再<strong>闪</strong>到author页面，这样不仅节省了资源也提升了用户体验，更重要的一点是！我们的项目多了一个广告页面(无语...)！！！  </p>
<p>先贴上我的实现代码  <br>用户信息保存在Vuex中</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// holdno是我自己定义的一个工具集 里面有各种操作方法
router.beforeEach((to, from, next) => {
  if(!store.state.user.id &amp;&amp; to.path != '/author'){
    // 第一次进入项目
    holdno.cookie.set('beforeLoginUrl', to.fullPath) // 保存用户进入的url
    next('/author')
    return false
  }
  next()
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// holdno是我自己定义的一个工具集 里面有各种操作方法</span>
router.beforeEach(<span class="hljs-function">(<span class="hljs-params">to, <span class="hljs-keyword">from</span>, next</span>) =&gt;</span> {
  <span class="hljs-keyword">if</span>(!store.state.user.id &amp;&amp; to.path != <span class="hljs-string">'/author'</span>){
    <span class="hljs-comment">// 第一次进入项目</span>
    holdno.cookie.set(<span class="hljs-string">'beforeLoginUrl'</span>, to.fullPath) <span class="hljs-comment">// 保存用户进入的url</span>
    next(<span class="hljs-string">'/author'</span>)
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
  }
  next()
})</code></pre>
<p>下面来看一下author页面的处理逻辑</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="created () {
    // 检测会员有没有登录
    if(!holdno.cookie.get('user')){
      let ua = window.navigator.userAgent.toLowerCase()
      if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        // 跳转到微信授权页面
        window.location.href = this.webUrl + '/Wap/User/getOpenid'
      }
    }else{
      // 如果有token 但是vuex中没有用户登录信息则做登录操作
      this.login()
    }
},
methods: {
    login () {
      let url = this.webUrl + '/Wap/User/info'
      // 通过cookie中保存的token 获取用户信息
      this.$http.get(url).then(response => {
        response = response.body
        if(response){
          // 保存用户登录状态(Vuex)
          this.$store.commit('user', response)
          setTimeout(() => {
            this.goBeforeLoginUrl() // 页面恢复(进入用户一开始请求的页面)
          }, 2000)
        }else{
          this.$alert('服务器撸猫去惹 :(', 'wrong')
          if(holdno.cookie.get('user')){
            // 跳转到微信授权页面
            window.location.href = this.webUrl + '/Wap/User/getOpenid'
          }
        }
      })
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">created () {
    <span class="hljs-comment">// 检测会员有没有登录</span>
    <span class="hljs-keyword">if</span>(!holdno.cookie.get(<span class="hljs-string">'user'</span>)){
      <span class="hljs-keyword">let</span> ua = <span class="hljs-built_in">window</span>.navigator.userAgent.toLowerCase()
      <span class="hljs-keyword">if</span>(ua.match(<span class="hljs-regexp">/MicroMessenger/i</span>) == <span class="hljs-string">'micromessenger'</span>){
        <span class="hljs-comment">// 跳转到微信授权页面</span>
        <span class="hljs-built_in">window</span>.location.href = <span class="hljs-keyword">this</span>.webUrl + <span class="hljs-string">'/Wap/User/getOpenid'</span>
      }
    }<span class="hljs-keyword">else</span>{
      <span class="hljs-comment">// 如果有token 但是vuex中没有用户登录信息则做登录操作</span>
      <span class="hljs-keyword">this</span>.login()
    }
},
<span class="hljs-attr">methods</span>: {
    login () {
      <span class="hljs-keyword">let</span> url = <span class="hljs-keyword">this</span>.webUrl + <span class="hljs-string">'/Wap/User/info'</span>
      <span class="hljs-comment">// 通过cookie中保存的token 获取用户信息</span>
      <span class="hljs-keyword">this</span>.$http.get(url).then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
        response = response.body
        <span class="hljs-keyword">if</span>(response){
          <span class="hljs-comment">// 保存用户登录状态(Vuex)</span>
          <span class="hljs-keyword">this</span>.$store.commit(<span class="hljs-string">'user'</span>, response)
          setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            <span class="hljs-keyword">this</span>.goBeforeLoginUrl() <span class="hljs-comment">// 页面恢复(进入用户一开始请求的页面)</span>
          }, <span class="hljs-number">2000</span>)
        }<span class="hljs-keyword">else</span>{
          <span class="hljs-keyword">this</span>.$alert(<span class="hljs-string">'服务器撸猫去惹 :('</span>, <span class="hljs-string">'wrong'</span>)
          <span class="hljs-keyword">if</span>(holdno.cookie.get(<span class="hljs-string">'user'</span>)){
            <span class="hljs-comment">// 跳转到微信授权页面</span>
            <span class="hljs-built_in">window</span>.location.href = <span class="hljs-keyword">this</span>.webUrl + <span class="hljs-string">'/Wap/User/getOpenid'</span>
          }
        }
      })
    }
}</code></pre>
<p>上述代码中 <strong>window.location.href = this.webUrl + '/Wap/User/getOpenid'</strong>  <br>这一段是后端请求微信授权登录接口的地址，在后端获取到用户信息及openid后再次跳转到author页面而不是直接定向到用户想要请求的位置，这样做的原因很简单。</p>
<p>如果用户跳转到授权页面，由后端获取用户信息并保存好登录状态，重定向到用户请求的页面，这时只要用户点击一下后退，所有的逻辑重新再来一遍有没有？作为一个不懂技术的用户，应该也是很郁闷，为什么后退还是跳回来了呢？？？  </p>
<p>所以获取用户信息后再次重定向到author页面，由author做一个中间页检测到获取到用户信息后在前端做一个跳转，也就是代码中的<strong>this.goBeforeLoginUrl()</strong>(跳转到登录前的url ...哈哈哈)，这时候用户再点击后退就会退回到author页面而不是后端获取用户openid的url，但真的会再次显示author页面给用户吗？并不会，回看我们路由钩子的定义：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.beforeEach((to, from, next) => {
  if(to.path == '/author' &amp;&amp; store.state.user.id){
    // 用户使用后退返回到授权页，则默认回到首页
    next('/index')
    return false
  }
  ...
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">router.beforeEach(<span class="hljs-function">(<span class="hljs-params">to, <span class="hljs-keyword">from</span>, next</span>) =&gt;</span> {
  <span class="hljs-keyword">if</span>(to.path == <span class="hljs-string">'/author'</span> &amp;&amp; store.state.user.id){
    <span class="hljs-comment">// 用户使用后退返回到授权页，则默认回到首页</span>
    next(<span class="hljs-string">'/index'</span>)
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
  }
  ...
})</code></pre>
<p>后面部分这里不重要，展示出来的则是关键部分，在再次跳转至author前，路由钩子被触发，检测到即将进入的页面to.path == '/author'成立同时刚才在this.login()中做了<strong>this.$store.commit('user', response)</strong>操作，所以if条件成立页面被直接跳转至<strong>'/index'</strong>首页，所以在这一个流程中，用户并没有再次看到授权页面，而是直接返回到了首页，是不是很完美！  </p>
<p><strong>this.goBeforeLoginUrl()</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 登录后跳转方法
Vue.prototype.goBeforeLoginUrl = () => {
  let url = holdno.cookie.get('beforeLoginUrl')
  if(!url || url.indexOf('/author') != -1){
    router.push('/index')
  }else{
    if(url == '/'){
      url = '/index'
    }
    router.push(url)
    holdno.cookie.set('beforeLoginUrl', '')
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 登录后跳转方法</span>
Vue.prototype.goBeforeLoginUrl = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-keyword">let</span> url = holdno.cookie.get(<span class="hljs-string">'beforeLoginUrl'</span>)
  <span class="hljs-keyword">if</span>(!url || url.indexOf(<span class="hljs-string">'/author'</span>) != <span class="hljs-number">-1</span>){
    router.push(<span class="hljs-string">'/index'</span>)
  }<span class="hljs-keyword">else</span>{
    <span class="hljs-keyword">if</span>(url == <span class="hljs-string">'/'</span>){
      url = <span class="hljs-string">'/index'</span>
    }
    router.push(url)
    holdno.cookie.set(<span class="hljs-string">'beforeLoginUrl'</span>, <span class="hljs-string">''</span>)
  }
}</code></pre>
<p>看完整个流程，author只讲到逻辑处理，但它毕竟是一个页面，也是要展示给用户看的，只处理逻辑的话难道白花花的一片show给用户吗？当然不是！想必大家都了解app在初次启动时都有一个广告页吧，我们完全可以把author授权中间页包装成一个广告页，在用户浏览花哨的图片(广告)时默默完成授权登录的处理 :)</p>
<p><span class="img-wrap"><img data-src="/img/bVUkMd?w=719&amp;h=1280" src="https://static.alili.tech/img/bVUkMd?w=719&amp;h=1280" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>大概就是这么个意思 :P</p>
<h4>扫码体验</h4>
<blockquote>emmmm... 现在已经是小程序的时代了，所以我把微信web站点给关掉了，没办法体验了 不好意思。</blockquote>
<p>希望能有大神交流更优解决方案。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
VUE开发SPA之较舒服的微信授权登录

## 原文链接
[https://segmentfault.com/a/1190000009493199](https://segmentfault.com/a/1190000009493199)

