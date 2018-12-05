---
title: 'vue 微信授权解决方案' 
date: 2018-12-06 2:30:09
hidden: true
slug: xqtits26bdi
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">背景</h2>
<p>vue前后端分离开发微信授权<br>2018-08-14更新<br>时隔四个月第一次更新，因为项目重构有一次接触到了微信授权，思路已经比原来清晰的多了，将重新修改一下整个文章</p>
<h2 id="articleHeader1">场景</h2>
<p>app将商品分享到微信朋友圈或者分享给微信好友，用户点击页面时进行微信授权登陆，获取用户信息。<br>问题：<strong>没有固定的h5应用首页，回调不能到index。授权后重定向url带参数并且很长</strong></p>
<p>本人愚钝，开发过程中，尝试过很多方法，踩坑不足以形容我的心情，可以说每一次都是一次跳井的体验啊。</p>
<p>1.一开始尝试的方式是前端请求微信连接，返回code，然后code作为再去请求后台接口获取token，后面看到别人的博客说这个方法不好，最好就是直接请求后台接口，然后后台返回url做跳转，所以就采用了最传统的方法，后台返回url，前台跳转。</p>
<p>2.这个时候就出现一个问题，微信授权要跳跳跳，最终想回到第一次点进来时候的链接就蛋疼了，从网上查了一下解决方法，将链接本身作为redirect_uri参数，大概就是这个样子</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="https://open.weixin.qq.com/connect/oauth2/authorizeappid=xxxxxxxxxxxxxxxxxx&amp;redirect_uri=*www.admin?http://www.xxx.com/h5/product*&amp;response_type=code&amp;scope=snsapi_userinfo&amp;state=STATE&amp;connect_redirect=1#wechat_redirect
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>https://open.weixin.qq.com/connect/oauth2/authorizeappid=xxxxxxxxxxxxxxxxxx&amp;redirect_uri=*www.admin?http://www.xxx.com/h5/product*&amp;response_type=code&amp;scope=snsapi_userinfo&amp;<span class="hljs-keyword">state</span>=STATE&amp;connect_redirect=<span class="hljs-number">1</span><span class="hljs-comment">#wechat_redirect</span>
</code></pre>
<p>然而我们的前台链接是这个鬼样子的，本身带参数，而且超长，what？微信可能不会接受我长这么丑。/(ㄒoㄒ)/~~</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" http://www.xxx.com/h5/product?id=6RedfM5O4xeyl0AmOwmyipkHr8AQCv-hYXZVAIFTwDXOsWSKqgu3VaCmaKSerBnacvWuzO3Zwdf8y%2F2K2lvqkluV6Ane4LCAKyPU2tPAPj%2FMF6F6xkzp27GqqpNya7HbdEA34qGQJvHIA9tlIMkeEWid1112b8oZuP3FQBwU%2F%2FMaSrovzQP6LlzWamyPnv0vMizu8uh0ItpJOQUV1m%2FtemF3U9KuHo8rXCw%3D" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs apache"><code style="word-break: break-word; white-space: initial;"> <span class="hljs-attribute">http</span>://www.xxx.com/h5/product?id=6RedfM5O4xeyl0AmOwmyipkHr8AQCv-hYXZVAIFTwDXOsWSKqgu3VaCmaKSerBnacvWuzO3Zwdf8y<span class="hljs-number">%2</span>F2K2lvqkluV6Ane4LCAKyPU2tPAPj<span class="hljs-number">%2</span>FMF6F6xkzp27GqqpNya7HbdEA34qGQJvHIA9tlIMkeEWid1112b8oZuP3FQBwU<span class="hljs-number">%2</span>F<span class="hljs-number">%2</span>FMaSrovzQP6LlzWamyPnv0vMizu8uh0ItpJOQUV1m<span class="hljs-number">%2</span>FtemF3U9KuHo8rXCw<span class="hljs-number">%3</span>D</code></pre>
<p>最终放弃了这个方案</p>
<p>3.考虑如何重定向我的前台地址，并且获取token</p>
<p>接下来就是我现在用的方法，bug还有很多，先分享一下我的方法，后期优化或有更好的方法再做修改<br>在main.js中路由全局钩子判断本地是不是有user_token，也就是微信授权后返回的token，如果没有token，并且当前的路由不是author（专门为了授权而生的页面），那就保存当前的url，比如www.xxx.com/h5/product?id=6RedfM5O4xeyl0AmOwm，然后进入author。那如果本地有token，就是用户之前授权拿到过token并且vuex里没有用户信息，那我就获取用户信息并保存在vuex中，这里遇到一个问题就是token会出现过期的情况，那我就删除了本地的user_token，window.localStorage.removeItem("user_token");刷新页面 router.go(0);这个时候就重新走了一遍如果没有token的情况。<br>第一版方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" router.beforeEach((to, from, next) => {
      //   第一次进入项目
      let token = window.localStorage.getItem(&quot;user_token&quot;);
      
      if (!token &amp;&amp; to.path != &quot;/author&quot;) {
        window.localStorage.setItem(&quot;beforeLoginUrl&quot;, to.fullPath); // 保存用户进入的url
        next(&quot;/author&quot;);
        return false;
      } else if (token &amp;&amp; !store.getters.userInfo) {
      //获取用户信息接口
        store
          .dispatch(&quot;GetUserInfo&quot;, {
            user_token: token
          })
          .catch(err => {
            window.localStorage.removeItem(&quot;user_token&quot;);
            router.go(0);
            return false;
          });
      }
      next();
    });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code> router.beforeEach(<span class="hljs-function">(<span class="hljs-params">to, <span class="hljs-keyword">from</span>, next</span>) =&gt;</span> {
      <span class="hljs-comment">//   第一次进入项目</span>
      <span class="hljs-keyword">let</span> token = <span class="hljs-built_in">window</span>.localStorage.getItem(<span class="hljs-string">"user_token"</span>);
      
      <span class="hljs-keyword">if</span> (!token &amp;&amp; to.path != <span class="hljs-string">"/author"</span>) {
        <span class="hljs-built_in">window</span>.localStorage.setItem(<span class="hljs-string">"beforeLoginUrl"</span>, to.fullPath); <span class="hljs-comment">// 保存用户进入的url</span>
        next(<span class="hljs-string">"/author"</span>);
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (token &amp;&amp; !store.getters.userInfo) {
      <span class="hljs-comment">//获取用户信息接口</span>
        store
          .dispatch(<span class="hljs-string">"GetUserInfo"</span>, {
            <span class="hljs-attr">user_token</span>: token
          })
          .catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
            <span class="hljs-built_in">window</span>.localStorage.removeItem(<span class="hljs-string">"user_token"</span>);
            router.go(<span class="hljs-number">0</span>);
            <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
          });
      }
      next();
    });</code></pre>
<p>2018-08-14第二版方法<br>不同的地方是将跳转判断从author.vue里拿出来放这里了逻辑其实很简单，有token获取信息，没token跳转授权</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.beforeEach((to, from, next) => {
  
  const token = window.localStorage.getItem('user_token')
  if (token) {
    if (to.path === '/author') {
      next({
        path: '/'
      })
    } else {
      store
        .dispatch('GetUserInfo', {
          user_token: token
        })
        .then(res => {
          // 拉取用户信息
          next()
        })
    }
  } else {
    if (to.path !== '/author') {
      // 保存用户进入的url
      if (to.path === '/shop' || to.path === '/product') {
        window.localStorage.setItem('authUrl', to.fullPath) // 保存用户进入的url
      }
      store.dispatch('GetAuthUrl').then(res => {
        // 此处返回的是后台拼接的微信授权地址，前台也是可以拼接的，跳转到微信授权
        window.location.href = res.data.url //https://open.weixin.qq.com/connect/oauth2/authorize?appid=aaaaa&amp;redirect_uri=后端java或php地址&amp;response_type=code&amp;scope=snsapi_userinfo&amp;state=STATE&amp;connect_redirect=1#wechat_redirect
      })
    } else {
      next()
    }
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>router.beforeEach(<span class="hljs-function">(<span class="hljs-params">to, <span class="hljs-keyword">from</span>, next</span>) =&gt;</span> {
  
  <span class="hljs-keyword">const</span> token = <span class="hljs-built_in">window</span>.localStorage.getItem(<span class="hljs-string">'user_token'</span>)
  <span class="hljs-keyword">if</span> (token) {
    <span class="hljs-keyword">if</span> (to.path === <span class="hljs-string">'/author'</span>) {
      next({
        <span class="hljs-attr">path</span>: <span class="hljs-string">'/'</span>
      })
    } <span class="hljs-keyword">else</span> {
      store
        .dispatch(<span class="hljs-string">'GetUserInfo'</span>, {
          <span class="hljs-attr">user_token</span>: token
        })
        .then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
          <span class="hljs-comment">// 拉取用户信息</span>
          next()
        })
    }
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">if</span> (to.path !== <span class="hljs-string">'/author'</span>) {
      <span class="hljs-comment">// 保存用户进入的url</span>
      <span class="hljs-keyword">if</span> (to.path === <span class="hljs-string">'/shop'</span> || to.path === <span class="hljs-string">'/product'</span>) {
        <span class="hljs-built_in">window</span>.localStorage.setItem(<span class="hljs-string">'authUrl'</span>, to.fullPath) <span class="hljs-comment">// 保存用户进入的url</span>
      }
      store.dispatch(<span class="hljs-string">'GetAuthUrl'</span>).then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
        <span class="hljs-comment">// 此处返回的是后台拼接的微信授权地址，前台也是可以拼接的，跳转到微信授权</span>
        <span class="hljs-built_in">window</span>.location.href = res.data.url <span class="hljs-comment">//https://open.weixin.qq.com/connect/oauth2/authorize?appid=aaaaa&amp;redirect_uri=后端java或php地址&amp;response_type=code&amp;scope=snsapi_userinfo&amp;state=STATE&amp;connect_redirect=1#wechat_redirect</span>
      })
    } <span class="hljs-keyword">else</span> {
      next()
    }
  }
})</code></pre>
<p>下面就是进入author.vue的逻辑,第一次进入author， www.xxxx.com/h5/author，判断链接有没有token参数，如果没有就跳微信授权，然后后台会重定向回来并携带token，如： www.xxxx.com/h5/author?token=xxxxxxxxx&amp;msg=200</p>
<p>第一版</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 
<template>
   <div>
授权中。。。
   </div>
</template>

<script>
  
   import {
      getWxAuth
   } from '@/service/getData'
   import {
      GetQueryString 
   } from '@/utils/mixin';
   export default {
      data() {
         return {
            token: '',
         };
      },
      computed: {
       
      },
      created() {
         this.token =  window.localStorage.getItem(&quot;user_token&quot;);
         //判断当前的url有没有token参数,如果不存在那就跳转到微信授权的url
         //就是前面说的ReturnGetCodeUrl方法
  
         if (!GetQueryString(&quot;token&quot;)) {
            this.ReturnGetCodeUrl();
         } else {
           //如果有token，如http://www.xxxx.com/h5/author?token=xxxxxxxxx&amp;msg=200，这里的参数就是后台重定向到前台http://www.xxxx.com/h5/author，并携带的参数。这样就可以拿到我们想要的token了
           //判断一下后台返回的状态码msg，因为可能出现微信拿不到token的情况
            let msg = GetQueryString(&quot;msg&quot;)
            if (msg = 200) {
               this.token = GetQueryString(&quot;token&quot;);
               //存储token到本地
                window.localStorage.setItem(&quot;user_token&quot;, this.token);
                //获取beforeLoginUrl，我们的前端页面
               let url =  window.localStorage.getItem(&quot;beforeLoginUrl&quot;);
               //跳转
               this.$router.push(url);
               //删除本地beforeLoginUrl
               removeLocalStorage(&quot;beforeLoginUrl&quot;);
            }else{
            //msg不是200的情况，可能跳到404的错误页面
            }
         }
      },
      methods: {
       
         async ReturnGetCodeUrl() {
            let {
               data
            } = await getWxAuth({});
            if (data.status == 200) {
              
               window.location.href = data.url;
            }
         },

         
      },
      watch: {},

      components: {},


      mounted: function () {}
   }
</script>
<style lang='scss' scoped>

</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code> 
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
授权中。。。
   <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  
   <span class="hljs-keyword">import</span> {
      getWxAuth
   } <span class="hljs-keyword">from</span> <span class="hljs-string">'@/service/getData'</span>
   <span class="hljs-keyword">import</span> {
      GetQueryString 
   } <span class="hljs-keyword">from</span> <span class="hljs-string">'@/utils/mixin'</span>;
   <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
      data() {
         <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">token</span>: <span class="hljs-string">''</span>,
         };
      },
      <span class="hljs-attr">computed</span>: {
       
      },
      created() {
         <span class="hljs-keyword">this</span>.token =  <span class="hljs-built_in">window</span>.localStorage.getItem(<span class="hljs-string">"user_token"</span>);
         <span class="hljs-comment">//判断当前的url有没有token参数,如果不存在那就跳转到微信授权的url</span>
         <span class="hljs-comment">//就是前面说的ReturnGetCodeUrl方法</span>
  
         <span class="hljs-keyword">if</span> (!GetQueryString(<span class="hljs-string">"token"</span>)) {
            <span class="hljs-keyword">this</span>.ReturnGetCodeUrl();
         } <span class="hljs-keyword">else</span> {
           <span class="hljs-comment">//如果有token，如http://www.xxxx.com/h5/author?token=xxxxxxxxx&amp;msg=200，这里的参数就是后台重定向到前台http://www.xxxx.com/h5/author，并携带的参数。这样就可以拿到我们想要的token了</span>
           <span class="hljs-comment">//判断一下后台返回的状态码msg，因为可能出现微信拿不到token的情况</span>
            <span class="hljs-keyword">let</span> msg = GetQueryString(<span class="hljs-string">"msg"</span>)
            <span class="hljs-keyword">if</span> (msg = <span class="hljs-number">200</span>) {
               <span class="hljs-keyword">this</span>.token = GetQueryString(<span class="hljs-string">"token"</span>);
               <span class="hljs-comment">//存储token到本地</span>
                <span class="hljs-built_in">window</span>.localStorage.setItem(<span class="hljs-string">"user_token"</span>, <span class="hljs-keyword">this</span>.token);
                <span class="hljs-comment">//获取beforeLoginUrl，我们的前端页面</span>
               <span class="hljs-keyword">let</span> url =  <span class="hljs-built_in">window</span>.localStorage.getItem(<span class="hljs-string">"beforeLoginUrl"</span>);
               <span class="hljs-comment">//跳转</span>
               <span class="hljs-keyword">this</span>.$router.push(url);
               <span class="hljs-comment">//删除本地beforeLoginUrl</span>
               removeLocalStorage(<span class="hljs-string">"beforeLoginUrl"</span>);
            }<span class="hljs-keyword">else</span>{
            <span class="hljs-comment">//msg不是200的情况，可能跳到404的错误页面</span>
            }
         }
      },
      <span class="hljs-attr">methods</span>: {
       
         <span class="hljs-keyword">async</span> ReturnGetCodeUrl() {
            <span class="hljs-keyword">let</span> {
               data
            } = <span class="hljs-keyword">await</span> getWxAuth({});
            <span class="hljs-keyword">if</span> (data.status == <span class="hljs-number">200</span>) {
              
               <span class="hljs-built_in">window</span>.location.href = data.url;
            }
         },

         
      },
      <span class="hljs-attr">watch</span>: {},

      <span class="hljs-attr">components</span>: {},


      <span class="hljs-attr">mounted</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{}
   }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">'scss'</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="undefined">

</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>GetQueryString方法</p>
<p>mixin.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const GetQueryString = name => {
  var url = new RegExp(&quot;(^|&amp;)&quot; + name + &quot;=([^&amp;]*)(&amp;|$)&quot;);
  var newUrl = window.location.search.substr(1).match(url);
  if (newUrl != null) {
    return unescape(newUrl[2]);
  } else {
    return false;
  }
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code>export const GetQueryString = name =&gt; {
  <span class="hljs-keyword">var</span> url = <span class="hljs-keyword">new</span> <span class="hljs-type">RegExp</span>(<span class="hljs-string">"(^|&amp;)"</span> + name + <span class="hljs-string">"=([^&amp;]*)(&amp;|$)"</span>);
  <span class="hljs-keyword">var</span> <span class="hljs-keyword">new</span><span class="hljs-type">Url</span> = window.location.search.substr(<span class="hljs-number">1</span>).match(url);
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">new</span><span class="hljs-type">Url</span> != <span class="hljs-literal">null</span>) {
    <span class="hljs-keyword">return</span> unescape(<span class="hljs-keyword">new</span><span class="hljs-type">Url</span>[<span class="hljs-number">2</span>]);
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
  }
};
</code></pre>
<p>第二版<br>只用来后台拿到参数返回到author页面后的携带的参数如果获取成功则跳转到授权之前保存的url如果失败提示用户关闭网页重新授权，另外有一点值得注意，微信名里有特殊字符的需要转码要不授权会失败</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- author -->
<template>
  <div>
    授权中。。。
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import {
    Toast
  } from 'mint-ui'
  import {
    GetQueryString,
    setLocalStorage,
    getLocalStorage,
    removeLocalStorage
  } from '@/utils'
  export default {
    data() {
      return {
        token: ''
      }
    },
    computed: {
      ...mapGetters([
        'userInfo'
      ])
    },
    created() {
      const wxtoken = GetQueryString('token')
      const code = GetQueryString('msg')
      if (wxtoken &amp;&amp; Number(code) === 200) {
        setLocalStorage('user_token', wxtoken)
        const historyUrl = getLocalStorage('authUrl')
        this.$router.replace(historyUrl)
        //  removeLocalStorage('authUrl')
      } else {
        // 没有拿到后台访问微信返回的token
        Toast('授权失败请关闭网页重新进入')
        removeLocalStorage('share_token')
        removeLocalStorage('authUrl')
      }
    }
  }

</script>
<style lang='scss' scoped>


</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- author --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    授权中。。。
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">import</span> {
    mapGetters
  } <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>
  <span class="hljs-keyword">import</span> {
    Toast
  } <span class="hljs-keyword">from</span> <span class="hljs-string">'mint-ui'</span>
  <span class="hljs-keyword">import</span> {
    GetQueryString,
    setLocalStorage,
    getLocalStorage,
    removeLocalStorage
  } <span class="hljs-keyword">from</span> <span class="hljs-string">'@/utils'</span>
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    data() {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">token</span>: <span class="hljs-string">''</span>
      }
    },
    <span class="hljs-attr">computed</span>: {
      ...mapGetters([
        <span class="hljs-string">'userInfo'</span>
      ])
    },
    created() {
      <span class="hljs-keyword">const</span> wxtoken = GetQueryString(<span class="hljs-string">'token'</span>)
      <span class="hljs-keyword">const</span> code = GetQueryString(<span class="hljs-string">'msg'</span>)
      <span class="hljs-keyword">if</span> (wxtoken &amp;&amp; <span class="hljs-built_in">Number</span>(code) === <span class="hljs-number">200</span>) {
        setLocalStorage(<span class="hljs-string">'user_token'</span>, wxtoken)
        <span class="hljs-keyword">const</span> historyUrl = getLocalStorage(<span class="hljs-string">'authUrl'</span>)
        <span class="hljs-keyword">this</span>.$router.replace(historyUrl)
        <span class="hljs-comment">//  removeLocalStorage('authUrl')</span>
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-comment">// 没有拿到后台访问微信返回的token</span>
        Toast(<span class="hljs-string">'授权失败请关闭网页重新进入'</span>)
        removeLocalStorage(<span class="hljs-string">'share_token'</span>)
        removeLocalStorage(<span class="hljs-string">'authUrl'</span>)
      }
    }
  }

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">'scss'</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="undefined">


</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</code></pre>
<p>整个过程是可以实现授权，但是觉得代码写得不好，以后的开发中希望能够有更优的方法。希望能和大家交流学习。<br>2018-08-14更新，总结一下，第二次开发流程做了简化，但是整个思路还是一样，我之前想到过另外一种方法，是将我的那串长参数先保存在本地，然后去授权的时候就可以让后台帮我跳转到固定页面如/product我在从本地拿参数解析，这个方法应该也是可行的，下次尝试后更新</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue 微信授权解决方案

## 原文链接
[https://segmentfault.com/a/1190000014255151](https://segmentfault.com/a/1190000014255151)

