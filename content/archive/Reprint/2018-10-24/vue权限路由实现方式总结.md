---
title: vue权限路由实现方式总结
hidden: true
categories: reprint
slug: 97e1d046
date: 2018-10-24 08:17:53
---

{{< raw >}}

                    
<h2 id="articleHeader0">&#x4F7F;&#x7528;&#x5168;&#x5C40;&#x8DEF;&#x7531;&#x5B88;&#x536B;</h2>
<h3 id="articleHeader1">&#x5B9E;&#x73B0;</h3>
<p>&#x524D;&#x7AEF;&#x5B9A;&#x4E49;&#x597D;&#x8DEF;&#x7531;&#xFF0C;&#x5E76;&#x4E14;&#x5728;&#x8DEF;&#x7531;&#x4E0A;&#x6807;&#x8BB0;&#x76F8;&#x5E94;&#x7684;&#x6743;&#x9650;&#x4FE1;&#x606F;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const routerMap = [
  {
    path: &apos;/permission&apos;,
    component: Layout,
    redirect: &apos;/permission/index&apos;,
    alwaysShow: true, // will always show the root menu
    meta: {
      title: &apos;permission&apos;,
      icon: &apos;lock&apos;,
      roles: [&apos;admin&apos;, &apos;editor&apos;] // you can set roles in root nav
    },
    children: [{
      path: &apos;page&apos;,
      component: () =&gt; import(&apos;@/views/permission/page&apos;),
      name: &apos;pagePermission&apos;,
      meta: {
        title: &apos;pagePermission&apos;,
        roles: [&apos;admin&apos;] // or you can only set roles in sub nav
      }
    }, {
      path: &apos;directive&apos;,
      component: () =&gt; import(&apos;@/views/permission/directive&apos;),
      name: &apos;directivePermission&apos;,
      meta: {
        title: &apos;directivePermission&apos;
        // if do not set roles, means: this page does not require permission
      }
    }]
  }]" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> routerMap = [
  {
    <span class="hljs-attr">path</span>: <span class="hljs-string">&apos;/permission&apos;</span>,
    <span class="hljs-attr">component</span>: Layout,
    <span class="hljs-attr">redirect</span>: <span class="hljs-string">&apos;/permission/index&apos;</span>,
    <span class="hljs-attr">alwaysShow</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// will always show the root menu</span>
    meta: {
      <span class="hljs-attr">title</span>: <span class="hljs-string">&apos;permission&apos;</span>,
      <span class="hljs-attr">icon</span>: <span class="hljs-string">&apos;lock&apos;</span>,
      <span class="hljs-attr">roles</span>: [<span class="hljs-string">&apos;admin&apos;</span>, <span class="hljs-string">&apos;editor&apos;</span>] <span class="hljs-comment">// you can set roles in root nav</span>
    },
    <span class="hljs-attr">children</span>: [{
      <span class="hljs-attr">path</span>: <span class="hljs-string">&apos;page&apos;</span>,
      <span class="hljs-attr">component</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">&apos;@/views/permission/page&apos;</span>),
      <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;pagePermission&apos;</span>,
      <span class="hljs-attr">meta</span>: {
        <span class="hljs-attr">title</span>: <span class="hljs-string">&apos;pagePermission&apos;</span>,
        <span class="hljs-attr">roles</span>: [<span class="hljs-string">&apos;admin&apos;</span>] <span class="hljs-comment">// or you can only set roles in sub nav</span>
      }
    }, {
      <span class="hljs-attr">path</span>: <span class="hljs-string">&apos;directive&apos;</span>,
      <span class="hljs-attr">component</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">&apos;@/views/permission/directive&apos;</span>),
      <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;directivePermission&apos;</span>,
      <span class="hljs-attr">meta</span>: {
        <span class="hljs-attr">title</span>: <span class="hljs-string">&apos;directivePermission&apos;</span>
        <span class="hljs-comment">// if do not set roles, means: this page does not require permission</span>
      }
    }]
  }]</code></pre>
<p>&#x5168;&#x5C40;&#x8DEF;&#x7531;&#x5B88;&#x536B;&#x6BCF;&#x6B21;&#x90FD;&#x5224;&#x65AD;&#x7528;&#x6237;&#x662F;&#x5426;&#x5DF2;&#x7ECF;&#x767B;&#x5F55;&#xFF0C;&#x6CA1;&#x6709;&#x767B;&#x5F55;&#x5219;&#x8DF3;&#x5230;&#x767B;&#x5F55;&#x9875;&#x3002;&#x5DF2;&#x7ECF;&#x767B;&#x5F55;(&#x5DF2;&#x7ECF;&#x53D6;&#x5F97;&#x540E;&#x53F0;&#x8FD4;&#x56DE;&#x7684;&#x7528;&#x6237;&#x7684;&#x6743;&#x9650;&#x4FE1;&#x606F;(&#x89D2;&#x8272;&#x4E4B;&#x7C7B;&#x7684;))&#xFF0C;&#x5219;&#x5224;&#x65AD;&#x5F53;&#x524D;&#x8981;&#x8DF3;&#x8F6C;&#x7684;&#x8DEF;&#x7531;&#xFF0C;&#x7528;&#x6237;&#x662F;&#x5426;&#x6709;&#x6743;&#x9650;&#x8BBF;&#x95EE;(&#x6839;&#x636E;&#x8DEF;&#x7531;&#x540D;&#x79F0;&#x5230;&#x5168;&#x90E8;&#x8DEF;&#x7531;&#x91CC;&#x627E;&#x5230;&#x5BF9;&#x5E94;&#x7684;&#x8DEF;&#x7531;&#xFF0C;&#x5224;&#x65AD;&#x7528;&#x6237;&#x662F;&#x5426;&#x5177;&#x5907;&#x8DEF;&#x7531;&#x4E0A;&#x6807;&#x6CE8;&#x7684;&#x6743;&#x9650;&#x4FE1;&#x606F;(&#x6BD4;&#x5982;&#x4E0A;&#x9762;&#x7684;<code>roles: [&apos;admin&apos;, &apos;editor&apos;]</code>))&#x3002;&#x6CA1;&#x6709;&#x6743;&#x9650;&#x5219;&#x8DF3;&#x5230;&#x4E8B;&#x5148;&#x5B9A;&#x4E49;&#x597D;&#x7684;&#x754C;&#x9762;(403,404&#x4E4B;&#x7C7B;&#x7684;)&#x3002;</p>
<p>&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#xFF0C;&#x83DC;&#x5355;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x7528;&#x8DEF;&#x7531;&#x751F;&#x6210;(&#x7528;&#x6237;&#x6CA1;&#x6709;&#x6743;&#x9650;&#x7684;&#x83DC;&#x5355;&#x4E5F;&#x4F1A;&#x663E;&#x793A;&#xFF0C;&#x70B9;&#x51FB;&#x8DF3;&#x8F6C;&#x7684;&#x65F6;&#x5019;&#x624D;&#x505A;&#x6743;&#x9650;&#x5224;&#x65AD;)&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x5728;&#x7528;&#x6237;&#x767B;&#x5F55;&#x540E;&#x6839;&#x636E;&#x7528;&#x6237;&#x6743;&#x9650;&#x628A;&#x8DEF;&#x7531;&#x8FC7;&#x6EE4;&#x4E00;&#x904D;&#x751F;&#x6210;&#x83DC;&#x5355;(&#x83DC;&#x5355;&#x9700;&#x8981;&#x4FDD;&#x5B58;&#x5728;vuex&#x91CC;)&#x3002;</p>
<blockquote>&#x76EE;&#x524D;<a href="https://github.com/iview/iview-admin/blob/dev/src/router/index.js" rel="nofollow noreferrer" target="_blank">iview-admin</a>&#x8FD8;&#x662F;&#x7528;&#x7684;&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;</blockquote>
<h3 id="articleHeader2">&#x7F3A;&#x70B9;</h3>
<ul>
<li>&#x52A0;&#x8F7D;&#x6240;&#x6709;&#x7684;&#x8DEF;&#x7531;&#xFF0C;&#x5982;&#x679C;&#x8DEF;&#x7531;&#x5F88;&#x591A;&#xFF0C;&#x800C;&#x7528;&#x6237;&#x5E76;&#x4E0D;&#x662F;&#x6240;&#x6709;&#x7684;&#x8DEF;&#x7531;&#x90FD;&#x6709;&#x6743;&#x9650;&#x8BBF;&#x95EE;&#xFF0C;&#x5BF9;&#x6027;&#x80FD;&#x4F1A;&#x6709;&#x5F71;&#x54CD;&#x3002;</li>
<li>&#x5168;&#x5C40;&#x8DEF;&#x7531;&#x5B88;&#x536B;&#x91CC;&#xFF0C;&#x6BCF;&#x6B21;&#x8DEF;&#x7531;&#x8DF3;&#x8F6C;&#x90FD;&#x8981;&#x505A;&#x6743;&#x9650;&#x5224;&#x65AD;&#x3002;</li>
<li>&#x83DC;&#x5355;&#x4FE1;&#x606F;&#x5199;&#x6B7B;&#x5728;&#x524D;&#x7AEF;&#xFF0C;&#x8981;&#x6539;&#x4E2A;&#x663E;&#x793A;&#x6587;&#x5B57;&#x6216;&#x6743;&#x9650;&#x4FE1;&#x606F;&#xFF0C;&#x9700;&#x8981;&#x91CD;&#x65B0;&#x7F16;&#x8BD1;</li>
<li>&#x83DC;&#x5355;&#x8DDF;&#x8DEF;&#x7531;&#x8026;&#x5408;&#x5728;&#x4E00;&#x8D77;&#xFF0C;&#x5B9A;&#x4E49;&#x8DEF;&#x7531;&#x7684;&#x65F6;&#x5019;&#x8FD8;&#x6709;&#x6DFB;&#x52A0;&#x83DC;&#x5355;&#x663E;&#x793A;&#x6807;&#x9898;&#xFF0C;&#x56FE;&#x6807;&#x4E4B;&#x7C7B;&#x7684;&#x4FE1;&#x606F;&#xFF0C;&#x800C;&#x4E14;&#x8DEF;&#x7531;&#x4E0D;&#x4E00;&#x5B9A;&#x4F5C;&#x4E3A;&#x83DC;&#x5355;&#x663E;&#x793A;&#xFF0C;&#x8FD8;&#x8981;&#x591A;&#x52A0;&#x5B57;&#x6BB5;&#x8FDB;&#x884C;&#x6807;&#x8BC6;</li>
</ul>
<h2 id="articleHeader3">&#x767B;&#x5F55;&#x9875;&#x4E0E;&#x4E3B;&#x5E94;&#x7528;&#x5206;&#x79BB;</h2>
<p>&#x9488;&#x5BF9;&#x524D;&#x4E00;&#x79CD;&#x5B9E;&#x73B0;&#x65B9;&#x5F0F;&#x7684;&#x7F3A;&#x70B9;&#xFF0C;&#x53EF;&#x4EE5;&#x5C06;&#x767B;&#x5F55;&#x9875;&#x4E0E;&#x4E3B;&#x5E94;&#x7528;&#x653E;&#x5230;&#x4E0D;&#x540C;&#x7684;&#x9875;&#x9762;(&#x4E0D;&#x5728;&#x540C;&#x4E00;&#x4E2A;vue&#x5E94;&#x7528;&#x5B9E;&#x4F8B;&#x91CC;)&#x3002;</p>
<h3 id="articleHeader4">&#x5B9E;&#x73B0;</h3>
<p>&#x767B;&#x5F55;&#x6210;&#x529F;&#x540E;&#xFF0C;&#x8FDB;&#x884C;&#x9875;&#x9762;&#x8DF3;&#x8F6C;(&#x771F;&#x6B63;&#x7684;&#x9875;&#x9762;&#x8DF3;&#x8F6C;&#xFF0C;&#x4E0D;&#x662F;&#x8DEF;&#x7531;&#x8DF3;&#x8F6C;)&#xFF0C;&#x5E76;&#x5C06;&#x7528;&#x6237;&#x6743;&#x9650;&#x4F20;&#x9012;&#x5230;&#x4E3B;&#x5E94;&#x7528;&#x6240;&#x5728;&#x9875;&#x9762;&#xFF0C;&#x4E3B;&#x5E94;&#x7528;&#x521D;&#x59CB;&#x5316;&#x4E4B;&#x524D;&#xFF0C;&#x6839;&#x636E;&#x7528;&#x6237;&#x6743;&#x9650;&#x7B5B;&#x9009;&#x8DEF;&#x7531;&#xFF0C;&#x7B5B;&#x9009;&#x540E;&#x7684;&#x8DEF;&#x7531;&#x4F5C;&#x4E3A;vue&#x7684;&#x5B9E;&#x4F8B;&#x5316;&#x53C2;&#x6570;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x50CF;&#x524D;&#x4E00;&#x79CD;&#x65B9;&#x5F0F;&#x6240;&#x6709;&#x7684;&#x8DEF;&#x7531;&#x90FD;&#x4F20;&#x9012;&#x8FDB;&#x53BB;&#xFF0C;&#x4E5F;&#x4E0D;&#x9700;&#x8981;&#x5728;&#x5168;&#x5C40;&#x8DEF;&#x7531;&#x5B88;&#x536B;&#x91CC;&#x505A;&#x6743;&#x9650;&#x5224;&#x65AD;&#x4E86;&#x3002;</p>
<h3 id="articleHeader5">&#x7F3A;&#x70B9;</h3>
<ul>
<li>&#x9700;&#x8981;&#x505A;&#x9875;&#x9762;&#x8DF3;&#x8F6C;&#xFF0C;&#x4E0D;&#x662F;&#x7EAF;&#x7CB9;&#x7684;&#x5355;&#x9875;&#x5E94;&#x7528;</li>
<li>&#x83DC;&#x5355;&#x4FE1;&#x606F;&#x5199;&#x6B7B;&#x5728;&#x524D;&#x7AEF;&#xFF0C;&#x8981;&#x6539;&#x4E2A;&#x663E;&#x793A;&#x6587;&#x5B57;&#x6216;&#x6743;&#x9650;&#x4FE1;&#x606F;&#xFF0C;&#x9700;&#x8981;&#x91CD;&#x65B0;&#x7F16;&#x8BD1;</li>
<li>&#x83DC;&#x5355;&#x8DDF;&#x8DEF;&#x7531;&#x8026;&#x5408;&#x5728;&#x4E00;&#x8D77;&#xFF0C;&#x5B9A;&#x4E49;&#x8DEF;&#x7531;&#x7684;&#x65F6;&#x5019;&#x8FD8;&#x6709;&#x6DFB;&#x52A0;&#x83DC;&#x5355;&#x663E;&#x793A;&#x6807;&#x9898;&#xFF0C;&#x56FE;&#x6807;&#x4E4B;&#x7C7B;&#x7684;&#x4FE1;&#x606F;&#xFF0C;&#x800C;&#x4E14;&#x8DEF;&#x7531;&#x4E0D;&#x4E00;&#x5B9A;&#x4F5C;&#x4E3A;&#x83DC;&#x5355;&#x663E;&#x793A;&#xFF0C;&#x8FD8;&#x8981;&#x591A;&#x52A0;&#x5B57;&#x6BB5;&#x8FDB;&#x884C;&#x6807;&#x8BC6;</li>
</ul>
<h2 id="articleHeader6">&#x4F7F;&#x7528;<code>addRoutes</code>&#x52A8;&#x6001;&#x6302;&#x8F7D;&#x8DEF;&#x7531;</h2>
<p><code>addRoutes</code>&#x5141;&#x8BB8;&#x5728;&#x5E94;&#x7528;&#x521D;&#x59CB;&#x5316;&#x4E4B;&#x540E;&#xFF0C;&#x52A8;&#x6001;&#x7684;&#x6302;&#x8F7D;&#x8DEF;&#x7531;&#x3002;&#x6709;&#x4E86;&#x8FD9;&#x4E2A;&#x65B0;&#x59FF;&#x52BF;&#xFF0C;&#x5C31;&#x4E0D;&#x7528;&#x50CF;&#x524D;&#x4E00;&#x79CD;&#x65B9;&#x5F0F;&#x90A3;&#x6837;&#x8981;&#x5728;&#x5E94;&#x7528;&#x521D;&#x59CB;&#x5316;&#x4E4B;&#x8981;&#x5BF9;&#x8DEF;&#x7531;&#x8FDB;&#x884C;&#x7B5B;&#x9009;&#x3002;</p>
<h3 id="articleHeader7">&#x5B9E;&#x73B0;</h3>
<p>&#x5E94;&#x7528;&#x521D;&#x59CB;&#x5316;&#x7684;&#x65F6;&#x5019;&#x5148;&#x6302;&#x8F7D;&#x4E0D;&#x9700;&#x8981;&#x6743;&#x9650;&#x63A7;&#x5236;&#x7684;&#x8DEF;&#x7531;&#xFF0C;&#x6BD4;&#x5982;&#x767B;&#x5F55;&#x9875;&#xFF0C;404&#x7B49;&#x9519;&#x8BEF;&#x9875;&#x3002;</p>
<p>&#x6709;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;<code>addRoutes</code>&#x5E94;&#x8BE5;&#x4F55;&#x65F6;&#x8C03;&#x7528;&#xFF0C;&#x5728;&#x54EA;&#x91CC;&#x8C03;&#x7528;</p>
<p>&#x767B;&#x5F55;&#x540E;&#xFF0C;&#x83B7;&#x53D6;&#x7528;&#x6237;&#x7684;&#x6743;&#x9650;&#x4FE1;&#x606F;&#xFF0C;&#x7136;&#x540E;&#x7B5B;&#x9009;&#x6709;&#x6743;&#x9650;&#x8BBF;&#x95EE;&#x7684;&#x8DEF;&#x7531;&#xFF0C;&#x518D;&#x8C03;&#x7528;<code>addRoutes</code>&#x6DFB;&#x52A0;&#x8DEF;&#x7531;&#x3002;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x662F;&#x53EF;&#x884C;&#x7684;&#x3002;&#x4F46;&#x662F;&#x4E0D;&#x53EF;&#x80FD;&#x6BCF;&#x6B21;&#x8FDB;&#x5165;&#x5E94;&#x7528;&#x90FD;&#x9700;&#x8981;&#x767B;&#x5F55;&#xFF0C;&#x7528;&#x6237;&#x5237;&#x65B0;&#x6D4F;&#x89C8;&#x5668;&#x53C8;&#x8981;&#x767B;&#x9646;&#x4E00;&#x6B21;&#x3002;</p>
<p>&#x6240;&#x4EE5;<code>addRoutes</code>&#x8FD8;&#x662F;&#x8981;&#x5728;&#x5168;&#x5C40;&#x8DEF;&#x7531;&#x5B88;&#x536B;&#x91CC;&#x8FDB;&#x884C;&#x8C03;&#x7528;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import router from &apos;./router&apos;
import store from &apos;./store&apos;
import { Message } from &apos;element-ui&apos;
import NProgress from &apos;nprogress&apos; // progress bar
import &apos;nprogress/nprogress.css&apos;// progress bar style
import { getToken } from &apos;@/utils/auth&apos; // getToken from cookie

NProgress.configure({ showSpinner: false })// NProgress Configuration

// permission judge function
function hasPermission(roles, permissionRoles) {
  if (roles.indexOf(&apos;admin&apos;) &gt;= 0) return true // admin permission passed directly
  if (!permissionRoles) return true
  return roles.some(role =&gt; permissionRoles.indexOf(role) &gt;= 0)
}

const whiteList = [&apos;/login&apos;, &apos;/authredirect&apos;]// no redirect whitelist

router.beforeEach((to, from, next) =&gt; {
  NProgress.start() // start progress bar
  if (getToken()) { // determine if there has token
    /* has token*/
    if (to.path === &apos;/login&apos;) {
      next({ path: &apos;/&apos; })
      NProgress.done() // if current page is dashboard will not trigger    afterEach hook, so manually handle it
    } else {
      if (store.getters.roles.length === 0) { // &#x5224;&#x65AD;&#x5F53;&#x524D;&#x7528;&#x6237;&#x662F;&#x5426;&#x5DF2;&#x62C9;&#x53D6;&#x5B8C;user_info&#x4FE1;&#x606F;
        store.dispatch(&apos;GetUserInfo&apos;).then(res =&gt; { // &#x62C9;&#x53D6;user_info
          const roles = res.data.roles // note: roles must be a array! such as: [&apos;editor&apos;,&apos;develop&apos;]
          store.dispatch(&apos;GenerateRoutes&apos;, { roles }).then(() =&gt; { // &#x6839;&#x636E;roles&#x6743;&#x9650;&#x751F;&#x6210;&#x53EF;&#x8BBF;&#x95EE;&#x7684;&#x8DEF;&#x7531;&#x8868;
            router.addRoutes(store.getters.addRouters) // &#x52A8;&#x6001;&#x6DFB;&#x52A0;&#x53EF;&#x8BBF;&#x95EE;&#x8DEF;&#x7531;&#x8868;
            next({ ...to, replace: true }) // hack&#x65B9;&#x6CD5; &#x786E;&#x4FDD;addRoutes&#x5DF2;&#x5B8C;&#x6210; ,set the replace: true so the navigation will not leave a history record
          })
        }).catch((err) =&gt; {
          store.dispatch(&apos;FedLogOut&apos;).then(() =&gt; {
            Message.error(err || &apos;Verification failed, please login again&apos;)
            next({ path: &apos;/&apos; })
          })
        })
      } else {
        // &#x6CA1;&#x6709;&#x52A8;&#x6001;&#x6539;&#x53D8;&#x6743;&#x9650;&#x7684;&#x9700;&#x6C42;&#x53EF;&#x76F4;&#x63A5;next() &#x5220;&#x9664;&#x4E0B;&#x65B9;&#x6743;&#x9650;&#x5224;&#x65AD; &#x2193;
        if (hasPermission(store.getters.roles, to.meta.roles)) {
          next()//
        } else {
          next({ path: &apos;/401&apos;, replace: true, query: { noGoBack: true }})
        }
        // &#x53EF;&#x5220; &#x2191;
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // &#x5728;&#x514D;&#x767B;&#x5F55;&#x767D;&#x540D;&#x5355;&#xFF0C;&#x76F4;&#x63A5;&#x8FDB;&#x5165;
      next()
    } else {
      next(&apos;/login&apos;) // &#x5426;&#x5219;&#x5168;&#x90E8;&#x91CD;&#x5B9A;&#x5411;&#x5230;&#x767B;&#x5F55;&#x9875;
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() =&gt; {
  NProgress.done() // finish progress bar
})" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> router <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./router&apos;</span>
<span class="hljs-keyword">import</span> store <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./store&apos;</span>
<span class="hljs-keyword">import</span> { Message } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;element-ui&apos;</span>
<span class="hljs-keyword">import</span> NProgress <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;nprogress&apos;</span> <span class="hljs-comment">// progress bar</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">&apos;nprogress/nprogress.css&apos;</span><span class="hljs-comment">// progress bar style</span>
<span class="hljs-keyword">import</span> { getToken } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@/utils/auth&apos;</span> <span class="hljs-comment">// getToken from cookie</span>

NProgress.configure({ <span class="hljs-attr">showSpinner</span>: <span class="hljs-literal">false</span> })<span class="hljs-comment">// NProgress Configuration</span>

<span class="hljs-comment">// permission judge function</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">hasPermission</span>(<span class="hljs-params">roles, permissionRoles</span>) </span>{
  <span class="hljs-keyword">if</span> (roles.indexOf(<span class="hljs-string">&apos;admin&apos;</span>) &gt;= <span class="hljs-number">0</span>) <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span> <span class="hljs-comment">// admin permission passed directly</span>
  <span class="hljs-keyword">if</span> (!permissionRoles) <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>
  <span class="hljs-keyword">return</span> roles.some(<span class="hljs-function"><span class="hljs-params">role</span> =&gt;</span> permissionRoles.indexOf(role) &gt;= <span class="hljs-number">0</span>)
}

<span class="hljs-keyword">const</span> whiteList = [<span class="hljs-string">&apos;/login&apos;</span>, <span class="hljs-string">&apos;/authredirect&apos;</span>]<span class="hljs-comment">// no redirect whitelist</span>

router.beforeEach(<span class="hljs-function">(<span class="hljs-params">to, <span class="hljs-keyword">from</span>, next</span>) =&gt;</span> {
  NProgress.start() <span class="hljs-comment">// start progress bar</span>
  <span class="hljs-keyword">if</span> (getToken()) { <span class="hljs-comment">// determine if there has token</span>
    <span class="hljs-comment">/* has token*/</span>
    <span class="hljs-keyword">if</span> (to.path === <span class="hljs-string">&apos;/login&apos;</span>) {
      next({ <span class="hljs-attr">path</span>: <span class="hljs-string">&apos;/&apos;</span> })
      NProgress.done() <span class="hljs-comment">// if current page is dashboard will not trigger    afterEach hook, so manually handle it</span>
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">if</span> (store.getters.roles.length === <span class="hljs-number">0</span>) { <span class="hljs-comment">// &#x5224;&#x65AD;&#x5F53;&#x524D;&#x7528;&#x6237;&#x662F;&#x5426;&#x5DF2;&#x62C9;&#x53D6;&#x5B8C;user_info&#x4FE1;&#x606F;</span>
        store.dispatch(<span class="hljs-string">&apos;GetUserInfo&apos;</span>).then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> { <span class="hljs-comment">// &#x62C9;&#x53D6;user_info</span>
          <span class="hljs-keyword">const</span> roles = res.data.roles <span class="hljs-comment">// note: roles must be a array! such as: [&apos;editor&apos;,&apos;develop&apos;]</span>
          store.dispatch(<span class="hljs-string">&apos;GenerateRoutes&apos;</span>, { roles }).then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> { <span class="hljs-comment">// &#x6839;&#x636E;roles&#x6743;&#x9650;&#x751F;&#x6210;&#x53EF;&#x8BBF;&#x95EE;&#x7684;&#x8DEF;&#x7531;&#x8868;</span>
            router.addRoutes(store.getters.addRouters) <span class="hljs-comment">// &#x52A8;&#x6001;&#x6DFB;&#x52A0;&#x53EF;&#x8BBF;&#x95EE;&#x8DEF;&#x7531;&#x8868;</span>
            next({ ...to, <span class="hljs-attr">replace</span>: <span class="hljs-literal">true</span> }) <span class="hljs-comment">// hack&#x65B9;&#x6CD5; &#x786E;&#x4FDD;addRoutes&#x5DF2;&#x5B8C;&#x6210; ,set the replace: true so the navigation will not leave a history record</span>
          })
        }).catch(<span class="hljs-function">(<span class="hljs-params">err</span>) =&gt;</span> {
          store.dispatch(<span class="hljs-string">&apos;FedLogOut&apos;</span>).then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            Message.error(err || <span class="hljs-string">&apos;Verification failed, please login again&apos;</span>)
            next({ <span class="hljs-attr">path</span>: <span class="hljs-string">&apos;/&apos;</span> })
          })
        })
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-comment">// &#x6CA1;&#x6709;&#x52A8;&#x6001;&#x6539;&#x53D8;&#x6743;&#x9650;&#x7684;&#x9700;&#x6C42;&#x53EF;&#x76F4;&#x63A5;next() &#x5220;&#x9664;&#x4E0B;&#x65B9;&#x6743;&#x9650;&#x5224;&#x65AD; &#x2193;</span>
        <span class="hljs-keyword">if</span> (hasPermission(store.getters.roles, to.meta.roles)) {
          next()<span class="hljs-comment">//</span>
        } <span class="hljs-keyword">else</span> {
          next({ <span class="hljs-attr">path</span>: <span class="hljs-string">&apos;/401&apos;</span>, <span class="hljs-attr">replace</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">query</span>: { <span class="hljs-attr">noGoBack</span>: <span class="hljs-literal">true</span> }})
        }
        <span class="hljs-comment">// &#x53EF;&#x5220; &#x2191;</span>
      }
    }
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-comment">/* has no token*/</span>
    <span class="hljs-keyword">if</span> (whiteList.indexOf(to.path) !== <span class="hljs-number">-1</span>) { <span class="hljs-comment">// &#x5728;&#x514D;&#x767B;&#x5F55;&#x767D;&#x540D;&#x5355;&#xFF0C;&#x76F4;&#x63A5;&#x8FDB;&#x5165;</span>
      next()
    } <span class="hljs-keyword">else</span> {
      next(<span class="hljs-string">&apos;/login&apos;</span>) <span class="hljs-comment">// &#x5426;&#x5219;&#x5168;&#x90E8;&#x91CD;&#x5B9A;&#x5411;&#x5230;&#x767B;&#x5F55;&#x9875;</span>
      NProgress.done() <span class="hljs-comment">// if current page is login will not trigger afterEach hook, so manually handle it</span>
    }
  }
})

router.afterEach(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  NProgress.done() <span class="hljs-comment">// finish progress bar</span>
})</code></pre>
<p>&#x5173;&#x952E;&#x7684;&#x4EE3;&#x7801;&#x5982;&#x4E0B;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (store.getters.roles.length === 0) { // &#x5224;&#x65AD;&#x5F53;&#x524D;&#x7528;&#x6237;&#x662F;&#x5426;&#x5DF2;&#x62C9;&#x53D6;&#x5B8C;user_info&#x4FE1;&#x606F;
        store.dispatch(&apos;GetUserInfo&apos;).then(res =&gt; { // &#x62C9;&#x53D6;user_info
          const roles = res.data.roles // note: roles must be a array! such as: [&apos;editor&apos;,&apos;develop&apos;]
          store.dispatch(&apos;GenerateRoutes&apos;, { roles }).then(() =&gt; { // &#x6839;&#x636E;roles&#x6743;&#x9650;&#x751F;&#x6210;&#x53EF;&#x8BBF;&#x95EE;&#x7684;&#x8DEF;&#x7531;&#x8868;
            router.addRoutes(store.getters.addRouters) // &#x52A8;&#x6001;&#x6DFB;&#x52A0;&#x53EF;&#x8BBF;&#x95EE;&#x8DEF;&#x7531;&#x8868;
            next({ ...to, replace: true }) // hack&#x65B9;&#x6CD5; &#x786E;&#x4FDD;addRoutes&#x5DF2;&#x5B8C;&#x6210; ,set the replace: true so the navigation will not leave a history record
          })
        }).catch((err) =&gt; {
          store.dispatch(&apos;FedLogOut&apos;).then(() =&gt; {
            Message.error(err || &apos;Verification failed, please login again&apos;)
            next({ path: &apos;/&apos; })
          })
        })" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">if</span> (store.getters.roles.length === <span class="hljs-number">0</span>) { <span class="hljs-comment">// &#x5224;&#x65AD;&#x5F53;&#x524D;&#x7528;&#x6237;&#x662F;&#x5426;&#x5DF2;&#x62C9;&#x53D6;&#x5B8C;user_info&#x4FE1;&#x606F;</span>
        store.dispatch(<span class="hljs-string">&apos;GetUserInfo&apos;</span>).then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> { <span class="hljs-comment">// &#x62C9;&#x53D6;user_info</span>
          <span class="hljs-keyword">const</span> roles = res.data.roles <span class="hljs-comment">// note: roles must be a array! such as: [&apos;editor&apos;,&apos;develop&apos;]</span>
          store.dispatch(<span class="hljs-string">&apos;GenerateRoutes&apos;</span>, { roles }).then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> { <span class="hljs-comment">// &#x6839;&#x636E;roles&#x6743;&#x9650;&#x751F;&#x6210;&#x53EF;&#x8BBF;&#x95EE;&#x7684;&#x8DEF;&#x7531;&#x8868;</span>
            router.addRoutes(store.getters.addRouters) <span class="hljs-comment">// &#x52A8;&#x6001;&#x6DFB;&#x52A0;&#x53EF;&#x8BBF;&#x95EE;&#x8DEF;&#x7531;&#x8868;</span>
            next({ ...to, <span class="hljs-attr">replace</span>: <span class="hljs-literal">true</span> }) <span class="hljs-comment">// hack&#x65B9;&#x6CD5; &#x786E;&#x4FDD;addRoutes&#x5DF2;&#x5B8C;&#x6210; ,set the replace: true so the navigation will not leave a history record</span>
          })
        }).catch(<span class="hljs-function">(<span class="hljs-params">err</span>) =&gt;</span> {
          store.dispatch(<span class="hljs-string">&apos;FedLogOut&apos;</span>).then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            Message.error(err || <span class="hljs-string">&apos;Verification failed, please login again&apos;</span>)
            next({ <span class="hljs-attr">path</span>: <span class="hljs-string">&apos;/&apos;</span> })
          })
        })</code></pre>
<blockquote>&#x4E0A;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x5C31;&#x662F;<a href="https://github.com/PanJiaChen/vue-element-admin" rel="nofollow noreferrer" target="_blank">vue-element-admin</a>&#x7684;&#x5B9E;&#x73B0;</blockquote>
<h3 id="articleHeader8">&#x7F3A;&#x70B9;</h3>
<ul>
<li>&#x5168;&#x5C40;&#x8DEF;&#x7531;&#x5B88;&#x536B;&#x91CC;&#xFF0C;&#x6BCF;&#x6B21;&#x8DEF;&#x7531;&#x8DF3;&#x8F6C;&#x90FD;&#x8981;&#x505A;&#x5224;&#x65AD;</li>
<li>&#x83DC;&#x5355;&#x4FE1;&#x606F;&#x5199;&#x6B7B;&#x5728;&#x524D;&#x7AEF;&#xFF0C;&#x8981;&#x6539;&#x4E2A;&#x663E;&#x793A;&#x6587;&#x5B57;&#x6216;&#x6743;&#x9650;&#x4FE1;&#x606F;&#xFF0C;&#x9700;&#x8981;&#x91CD;&#x65B0;&#x7F16;&#x8BD1;</li>
<li>&#x83DC;&#x5355;&#x8DDF;&#x8DEF;&#x7531;&#x8026;&#x5408;&#x5728;&#x4E00;&#x8D77;&#xFF0C;&#x5B9A;&#x4E49;&#x8DEF;&#x7531;&#x7684;&#x65F6;&#x5019;&#x8FD8;&#x6709;&#x6DFB;&#x52A0;&#x83DC;&#x5355;&#x663E;&#x793A;&#x6807;&#x9898;&#xFF0C;&#x56FE;&#x6807;&#x4E4B;&#x7C7B;&#x7684;&#x4FE1;&#x606F;&#xFF0C;&#x800C;&#x4E14;&#x8DEF;&#x7531;&#x4E0D;&#x4E00;&#x5B9A;&#x4F5C;&#x4E3A;&#x83DC;&#x5355;&#x663E;&#x793A;&#xFF0C;&#x8FD8;&#x8981;&#x591A;&#x52A0;&#x5B57;&#x6BB5;&#x8FDB;&#x884C;&#x6807;&#x8BC6;</li>
</ul>
<h2 id="articleHeader9">&#x83DC;&#x5355;&#x4E0E;&#x8DEF;&#x7531;&#x5206;&#x79BB;&#xFF0C;&#x83DC;&#x5355;&#x7531;&#x540E;&#x7AEF;&#x8FD4;&#x56DE;</h2>
<p>&#x83DC;&#x5355;&#x7684;&#x663E;&#x793A;&#x6807;&#x9898;&#xFF0C;&#x56FE;&#x7247;&#x7B49;&#x9700;&#x8981;&#x968F;&#x65F6;&#x66F4;&#x6539;&#xFF0C;&#x8981;&#x5BF9;&#x83DC;&#x5355;&#x505A;&#x7BA1;&#x7406;&#x529F;&#x80FD;&#x3002;</p>
<p>&#x540E;&#x7AEF;&#x76F4;&#x63A5;&#x6839;&#x636E;&#x7528;&#x6237;&#x6743;&#x9650;&#x8FD4;&#x56DE;&#x53EF;&#x8BBF;&#x95EE;&#x7684;&#x83DC;&#x5355;&#x3002;</p>
<h3 id="articleHeader10">&#x5B9E;&#x73B0;</h3>
<p>&#x524D;&#x7AEF;&#x5B9A;&#x4E49;&#x8DEF;&#x7531;&#x4FE1;&#x606F;(&#x6807;&#x51C6;&#x7684;&#x8DEF;&#x7531;&#x5B9A;&#x4E49;&#xFF0C;&#x4E0D;&#x9700;&#x8981;&#x52A0;&#x5176;&#x4ED6;&#x6807;&#x8BB0;&#x5B57;&#x6BB5;)&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    name: &quot;login&quot;,
    path: &quot;/login&quot;,
    component: () =&gt; import(&quot;@/pages/Login.vue&quot;)
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;login&quot;</span>,
    <span class="hljs-attr">path</span>: <span class="hljs-string">&quot;/login&quot;</span>,
    <span class="hljs-attr">component</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">&quot;@/pages/Login.vue&quot;</span>)
}</code></pre>
<p>name&#x5B57;&#x6BB5;&#x90FD;&#x4E0D;&#x4E3A;&#x7A7A;&#xFF0C;&#x9700;&#x8981;&#x6839;&#x636E;&#x6B64;&#x5B57;&#x6BB5;&#x4E0E;&#x540E;&#x7AEF;&#x8FD4;&#x56DE;&#x83DC;&#x5355;&#x505A;&#x5173;&#x8054;&#x3002;</p>
<p>&#x505A;&#x83DC;&#x5355;&#x7BA1;&#x7406;&#x529F;&#x80FD;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4E00;&#x5B9A;&#x8981;&#x6709;&#x4E2A;&#x5B57;&#x6BB5;&#x4E0E;&#x524D;&#x7AEF;&#x7684;&#x8DEF;&#x7531;&#x7684;name&#x5B57;&#x6BB5;&#x5BF9;&#x5E94;&#x4E0A;(&#x4E5F;&#x53EF;&#x4EE5;&#x662F;&#x5176;&#x4ED6;&#x5B57;&#x6BB5;&#xFF0C;&#x53EA;&#x8981;&#x83DC;&#x5355;&#x80FD;&#x627E;&#x5230;&#x5BF9;&#x5E94;&#x7684;&#x8DEF;&#x7531;&#x6216;&#x8005;&#x8DEF;&#x7531;&#x80FD;&#x627E;&#x5230;&#x5BF9;&#x5E94;&#x7684;&#x83DC;&#x5355;&#x5C31;&#x884C;)&#xFF0C;&#x5E76;&#x4E14;&#x505A;&#x552F;&#x4E00;&#x6027;&#x6821;&#x9A8C;&#x3002;&#x83DC;&#x5355;&#x4E0A;&#x8FD8;&#x9700;&#x8981;&#x5B9A;&#x4E49;&#x6743;&#x9650;&#x5B57;&#x6BB5;&#xFF0C;&#x53EF;&#x4EE5;&#x662F;&#x4E00;&#x4E2A;&#x6216;&#x591A;&#x4E2A;&#x3002;&#x5176;&#x4ED6;&#x4FE1;&#x606F;&#xFF0C;&#x6BD4;&#x5982;&#x663E;&#x793A;&#x6807;&#x9898;&#xFF0C;&#x56FE;&#x6807;&#xFF0C;&#x6392;&#x5E8F;&#xFF0C;&#x9501;&#x5B9A;&#x4E4B;&#x7C7B;&#x7684;&#xFF0C;&#x53EF;&#x4EE5;&#x6839;&#x636E;&#x5B9E;&#x9645;&#x9700;&#x6C42;&#x8FDB;&#x884C;&#x8BBE;&#x8BA1;&#x3002;</p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000015800804?w=1458&amp;h=747" del-src="https://static.alili.tech/img/remote/1460000015800804?w=1458&amp;h=747" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>&#x8FD8;&#x662F;&#x5728;&#x5168;&#x5C40;&#x8DEF;&#x7531;&#x5B88;&#x536B;&#x91CC;&#x505A;&#x5224;&#x65AD;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function hasPermission(router, accessMenu) {
  if (whiteList.indexOf(router.path) !== -1) {
    return true;
  }
  let menu = Util.getMenuByName(router.name, accessMenu);
  if (menu.name) {
    return true;
  }
  return false;

}

Router.beforeEach(async (to, from, next) =&gt; {
  if (getToken()) {
    let userInfo = store.state.user.userInfo;
    if (!userInfo.name) {
      try {
        await store.dispatch(&quot;GetUserInfo&quot;)
        await store.dispatch(&apos;updateAccessMenu&apos;)
        if (to.path === &apos;/login&apos;) {
          next({ name: &apos;home_index&apos; })
        } else {
          //Util.toDefaultPage([...routers], to.name, router, next);
          next({ ...to, replace: true })//&#x83DC;&#x5355;&#x6743;&#x9650;&#x66F4;&#x65B0;&#x5B8C;&#x6210;,&#x91CD;&#x65B0;&#x8FDB;&#x4E00;&#x6B21;&#x5F53;&#x524D;&#x8DEF;&#x7531;
        }
      }  
      catch (e) {
        if (whiteList.indexOf(to.path) !== -1) { // &#x5728;&#x514D;&#x767B;&#x5F55;&#x767D;&#x540D;&#x5355;&#xFF0C;&#x76F4;&#x63A5;&#x8FDB;&#x5165;
          next()
        } else {
          next(&apos;/login&apos;)
        }
      }
    } else {
      if (to.path === &apos;/login&apos;) {
        next({ name: &apos;home_index&apos; })
      } else {
        if (hasPermission(to, store.getters.accessMenu)) {
          Util.toDefaultPage(store.getters.accessMenu,to, routes, next);
        } else {
          next({ path: &apos;/403&apos;,replace:true })
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // &#x5728;&#x514D;&#x767B;&#x5F55;&#x767D;&#x540D;&#x5355;&#xFF0C;&#x76F4;&#x63A5;&#x8FDB;&#x5165;
      next()
    } else {
      next(&apos;/login&apos;)
    }
  }
  let menu = Util.getMenuByName(to.name, store.getters.accessMenu);
  Util.title(menu.title);
});

Router.afterEach((to) =&gt; {
  window.scrollTo(0, 0);
});
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">hasPermission</span>(<span class="hljs-params">router, accessMenu</span>) </span>{
  <span class="hljs-keyword">if</span> (whiteList.indexOf(router.path) !== <span class="hljs-number">-1</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
  }
  <span class="hljs-keyword">let</span> menu = Util.getMenuByName(router.name, accessMenu);
  <span class="hljs-keyword">if</span> (menu.name) {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
  }
  <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;

}

Router.beforeEach(<span class="hljs-keyword">async</span> (to, <span class="hljs-keyword">from</span>, next) =&gt; {
  <span class="hljs-keyword">if</span> (getToken()) {
    <span class="hljs-keyword">let</span> userInfo = store.state.user.userInfo;
    <span class="hljs-keyword">if</span> (!userInfo.name) {
      <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">await</span> store.dispatch(<span class="hljs-string">&quot;GetUserInfo&quot;</span>)
        <span class="hljs-keyword">await</span> store.dispatch(<span class="hljs-string">&apos;updateAccessMenu&apos;</span>)
        <span class="hljs-keyword">if</span> (to.path === <span class="hljs-string">&apos;/login&apos;</span>) {
          next({ <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;home_index&apos;</span> })
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-comment">//Util.toDefaultPage([...routers], to.name, router, next);</span>
          next({ ...to, <span class="hljs-attr">replace</span>: <span class="hljs-literal">true</span> })<span class="hljs-comment">//&#x83DC;&#x5355;&#x6743;&#x9650;&#x66F4;&#x65B0;&#x5B8C;&#x6210;,&#x91CD;&#x65B0;&#x8FDB;&#x4E00;&#x6B21;&#x5F53;&#x524D;&#x8DEF;&#x7531;</span>
        }
      }  
      <span class="hljs-keyword">catch</span> (e) {
        <span class="hljs-keyword">if</span> (whiteList.indexOf(to.path) !== <span class="hljs-number">-1</span>) { <span class="hljs-comment">// &#x5728;&#x514D;&#x767B;&#x5F55;&#x767D;&#x540D;&#x5355;&#xFF0C;&#x76F4;&#x63A5;&#x8FDB;&#x5165;</span>
          next()
        } <span class="hljs-keyword">else</span> {
          next(<span class="hljs-string">&apos;/login&apos;</span>)
        }
      }
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">if</span> (to.path === <span class="hljs-string">&apos;/login&apos;</span>) {
        next({ <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;home_index&apos;</span> })
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">if</span> (hasPermission(to, store.getters.accessMenu)) {
          Util.toDefaultPage(store.getters.accessMenu,to, routes, next);
        } <span class="hljs-keyword">else</span> {
          next({ <span class="hljs-attr">path</span>: <span class="hljs-string">&apos;/403&apos;</span>,<span class="hljs-attr">replace</span>:<span class="hljs-literal">true</span> })
        }
      }
    }
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">if</span> (whiteList.indexOf(to.path) !== <span class="hljs-number">-1</span>) { <span class="hljs-comment">// &#x5728;&#x514D;&#x767B;&#x5F55;&#x767D;&#x540D;&#x5355;&#xFF0C;&#x76F4;&#x63A5;&#x8FDB;&#x5165;</span>
      next()
    } <span class="hljs-keyword">else</span> {
      next(<span class="hljs-string">&apos;/login&apos;</span>)
    }
  }
  <span class="hljs-keyword">let</span> menu = Util.getMenuByName(to.name, store.getters.accessMenu);
  Util.title(menu.title);
});

Router.afterEach(<span class="hljs-function">(<span class="hljs-params">to</span>) =&gt;</span> {
  <span class="hljs-built_in">window</span>.scrollTo(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>);
});
</code></pre>
<p>&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#x662F;<a href="https://github.com/wjkang/vue-quasar-admin" rel="nofollow noreferrer" target="_blank">vue-quasar-admin</a>&#x7684;&#x5B9E;&#x73B0;&#x3002;&#x56E0;&#x4E3A;&#x6CA1;&#x6709;&#x4F7F;&#x7528;<code>addRoutes</code>,&#x6BCF;&#x6B21;&#x8DEF;&#x7531;&#x8DF3;&#x8F6C;&#x7684;&#x65F6;&#x5019;&#x90FD;&#x8981;&#x5224;&#x65AD;&#x6743;&#x9650;&#xFF0C;&#x8FD9;&#x91CC;&#x7684;&#x5224;&#x65AD;&#x4E5F;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x56E0;&#x4E3A;&#x83DC;&#x5355;&#x7684;name&#x4E0E;&#x8DEF;&#x7531;&#x7684;name&#x662F;&#x4E00;&#x4E00;&#x5BF9;&#x5E94;&#x7684;,&#x800C;&#x540E;&#x7AEF;&#x8FD4;&#x56DE;&#x7684;&#x83DC;&#x5355;&#x5C31;&#x5DF2;&#x7ECF;&#x662F;&#x7ECF;&#x8FC7;&#x6743;&#x9650;&#x8FC7;&#x6EE4;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x5982;&#x679C;&#x6839;&#x636E;&#x8DEF;&#x7531;name&#x627E;&#x4E0D;&#x5230;&#x5BF9;&#x5E94;&#x7684;&#x83DC;&#x5355;&#xFF0C;&#x5C31;&#x8868;&#x793A;&#x7528;&#x6237;&#x6709;&#x6CA1;&#x6743;&#x9650;&#x8BBF;&#x95EE;&#x3002;</p>
<p>&#x5982;&#x679C;&#x8DEF;&#x7531;&#x5F88;&#x591A;&#xFF0C;&#x53EF;&#x4EE5;&#x5728;&#x5E94;&#x7528;&#x521D;&#x59CB;&#x5316;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x53EA;&#x6302;&#x8F7D;&#x4E0D;&#x9700;&#x8981;&#x6743;&#x9650;&#x63A7;&#x5236;&#x7684;&#x8DEF;&#x7531;&#x3002;&#x53D6;&#x5F97;&#x540E;&#x7AEF;&#x8FD4;&#x56DE;&#x7684;&#x83DC;&#x5355;&#x540E;&#xFF0C;&#x6839;&#x636E;&#x83DC;&#x5355;&#x4E0E;&#x8DEF;&#x7531;&#x7684;&#x5BF9;&#x5E94;&#x5173;&#x7CFB;&#xFF0C;&#x7B5B;&#x9009;&#x51FA;&#x53EF;&#x8BBF;&#x95EE;&#x7684;&#x8DEF;&#x7531;&#xFF0C;&#x901A;&#x8FC7;<code>addRoutes</code>&#x52A8;&#x6001;&#x6302;&#x8F7D;&#x3002;</p>
<h3 id="articleHeader11">&#x7F3A;&#x70B9;</h3>
<ul>
<li>&#x83DC;&#x5355;&#x9700;&#x8981;&#x4E0E;&#x8DEF;&#x7531;&#x505A;&#x4E00;&#x4E00;&#x5BF9;&#x5E94;&#xFF0C;&#x524D;&#x7AEF;&#x6DFB;&#x52A0;&#x4E86;&#x65B0;&#x529F;&#x80FD;&#xFF0C;&#x9700;&#x8981;&#x901A;&#x8FC7;&#x83DC;&#x5355;&#x7BA1;&#x7406;&#x529F;&#x80FD;&#x6DFB;&#x52A0;&#x65B0;&#x7684;&#x83DC;&#x5355;&#xFF0C;&#x5982;&#x679C;&#x83DC;&#x5355;&#x914D;&#x7F6E;&#x7684;&#x4E0D;&#x5BF9;&#x4F1A;&#x5BFC;&#x81F4;&#x5E94;&#x7528;&#x4E0D;&#x80FD;&#x6B63;&#x5E38;&#x4F7F;&#x7528;</li>
<li>&#x5168;&#x5C40;&#x8DEF;&#x7531;&#x5B88;&#x536B;&#x91CC;&#xFF0C;&#x6BCF;&#x6B21;&#x8DEF;&#x7531;&#x8DF3;&#x8F6C;&#x90FD;&#x8981;&#x505A;&#x5224;&#x65AD;</li>
</ul>
<h2 id="articleHeader12">&#x83DC;&#x5355;&#x4E0E;&#x8DEF;&#x7531;&#x5B8C;&#x5168;&#x7531;&#x540E;&#x7AEF;&#x8FD4;&#x56DE;</h2>
<p>&#x83DC;&#x5355;&#x7531;&#x540E;&#x7AEF;&#x8FD4;&#x56DE;&#x662F;&#x53EF;&#x884C;&#x7684;&#xFF0C;&#x4F46;&#x662F;&#x8DEF;&#x7531;&#x7531;&#x540E;&#x7AEF;&#x8FD4;&#x56DE;&#x5462;&#xFF1F;&#x770B;&#x4E00;&#x4E0B;&#x8DEF;&#x7531;&#x7684;&#x5B9A;&#x4E49;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    name: &quot;login&quot;,
    path: &quot;/login&quot;,
    component: () =&gt; import(&quot;@/pages/Login.vue&quot;)
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;login&quot;</span>,
    <span class="hljs-attr">path</span>: <span class="hljs-string">&quot;/login&quot;</span>,
    <span class="hljs-attr">component</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">&quot;@/pages/Login.vue&quot;</span>)
}</code></pre>
<p>&#x540E;&#x7AEF;&#x5982;&#x679C;&#x76F4;&#x63A5;&#x8FD4;&#x56DE;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;name&quot;: &quot;login&quot;,
    &quot;path&quot;: &quot;/login&quot;,
    &quot;component&quot;: &quot;() =&gt; import(&apos;@/pages/Login.vue&apos;)&quot;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
    <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;login&quot;</span>,
    <span class="hljs-string">&quot;path&quot;</span>: <span class="hljs-string">&quot;/login&quot;</span>,
    <span class="hljs-string">&quot;component&quot;</span>: <span class="hljs-string">&quot;() =&gt; import(&apos;@/pages/Login.vue&apos;)&quot;</span>
}</code></pre>
<p>&#x8FD9;&#x662F;&#x4EC0;&#x4E48;&#x9B3C;&#xFF0C;&#x660E;&#x663E;&#x4E0D;&#x884C;&#x3002;<code>() =&gt; import(&apos;@/pages/Login.vue&apos;)</code>&#x8FD9;&#x4EE3;&#x7801;&#x5982;&#x679C;&#x6CA1;&#x51FA;&#x73B0;&#x5728;&#x524D;&#x7AEF;&#xFF0C;webpack&#x4E0D;&#x4F1A;&#x5BF9;<code>Login.vue</code>&#x8FDB;&#x884C;&#x7F16;&#x8BD1;&#x6253;&#x5305;</p>
<h3 id="articleHeader13">&#x5B9E;&#x73B0;</h3>
<p>&#x524D;&#x7AEF;&#x7EDF;&#x4E00;&#x5B9A;&#x4E49;&#x8DEF;&#x7531;&#x7EC4;&#x4EF6;&#xFF0C;&#x6BD4;&#x5982;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Home = () =&gt; import(&quot;../pages/Home.vue&quot;);
const UserInfo = () =&gt; import(&quot;../pages/UserInfo.vue&quot;);
export default {
  home: Home,
  userInfo: UserInfo
};" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>const Home = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">&quot;../pages/Home.vue&quot;</span>);
const UserInfo = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">&quot;../pages/UserInfo.vue&quot;</span>);
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  home: Home,
  userInfo: UserInfo
};</code></pre>
<p>&#x5C06;&#x8DEF;&#x7531;&#x7EC4;&#x4EF6;&#x5B9A;&#x4E49;&#x4E3A;&#x8FD9;&#x79CD;key-value&#x7684;&#x7ED3;&#x6784;&#x3002;</p>
<p>&#x540E;&#x7AEF;&#x8FD4;&#x56DE;&#x683C;&#x5F0F;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[
      {
        name: &quot;home&quot;,
        path: &quot;/&quot;,
        component: &quot;home&quot;
      },
      {
        name: &quot;home&quot;,
        path: &quot;/userinfo&quot;,
        component: &quot;userInfo&quot;
      }
]" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">[
      {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;home&quot;</span>,
        <span class="hljs-attr">path</span>: <span class="hljs-string">&quot;/&quot;</span>,
        <span class="hljs-attr">component</span>: <span class="hljs-string">&quot;home&quot;</span>
      },
      {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;home&quot;</span>,
        <span class="hljs-attr">path</span>: <span class="hljs-string">&quot;/userinfo&quot;</span>,
        <span class="hljs-attr">component</span>: <span class="hljs-string">&quot;userInfo&quot;</span>
      }
]</code></pre>
<p>&#x5728;&#x5C06;&#x540E;&#x7AEF;&#x8FD4;&#x56DE;&#x8DEF;&#x7531;&#x901A;&#x8FC7;<code>addRoutes</code>&#x52A8;&#x6001;&#x6302;&#x8F7D;&#x4E4B;&#x95F4;&#xFF0C;&#x9700;&#x8981;&#x5C06;&#x6570;&#x636E;&#x5904;&#x7406;&#x4E00;&#x4E0B;&#xFF0C;&#x5C06;component&#x5B57;&#x6BB5;&#x6362;&#x4E3A;&#x771F;&#x6B63;&#x7684;&#x7EC4;&#x4EF6;&#x3002;</p>
<p>&#x81F3;&#x4E8E;&#x83DC;&#x5355;&#x4E0E;&#x8DEF;&#x7531;&#x662F;&#x5426;&#x8FD8;&#x8981;&#x5206;&#x79BB;&#xFF0C;&#x600E;&#x4E48;&#x5BF9;&#x5E94;&#xFF0C;&#x53EF;&#x4EE5;&#x6839;&#x636E;&#x5B9E;&#x9645;&#x9700;&#x6C42;&#x8FDB;&#x884C;&#x5904;&#x7406;&#x3002;</p>
<p>&#x5982;&#x679C;&#x6709;&#x5D4C;&#x5957;&#x8DEF;&#x7531;&#xFF0C;&#x540E;&#x7AEF;&#x529F;&#x80FD;&#x8BBE;&#x8BA1;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x8981;&#x6CE8;&#x610F;&#x6DFB;&#x52A0;&#x76F8;&#x5E94;&#x7684;&#x5B57;&#x6BB5;&#x3002;&#x524D;&#x7AEF;&#x62FF;&#x5230;&#x6570;&#x636E;&#x4E5F;&#x8981;&#x505A;&#x76F8;&#x5E94;&#x7684;&#x5904;&#x7406;&#x3002;</p>
<h3 id="articleHeader14">&#x7F3A;&#x70B9;</h3>
<ul>
<li>&#x5168;&#x5C40;&#x8DEF;&#x7531;&#x5B88;&#x536B;&#x91CC;&#xFF0C;&#x6BCF;&#x6B21;&#x8DEF;&#x7531;&#x8DF3;&#x8F6C;&#x90FD;&#x8981;&#x505A;&#x5224;&#x65AD;</li>
<li>&#x524D;&#x540E;&#x7AEF;&#x7684;&#x914D;&#x5408;&#x8981;&#x6C42;&#x66F4;&#x9AD8;</li>
</ul>
<h2 id="articleHeader15">&#x4E0D;&#x4F7F;&#x7528;&#x5168;&#x5C40;&#x8DEF;&#x7531;&#x5B88;&#x536B;</h2>
<p>&#x524D;&#x9762;&#x51E0;&#x79CD;&#x65B9;&#x5F0F;&#xFF0C;&#x9664;&#x4E86;<code>&#x767B;&#x5F55;&#x9875;&#x4E0E;&#x4E3B;&#x5E94;&#x7528;&#x5206;&#x79BB;</code>,&#x6BCF;&#x6B21;&#x8DEF;&#x7531;&#x8DF3;&#x8F6C;&#xFF0C;&#x90FD;&#x5728;&#x5168;&#x5C40;&#x8DEF;&#x7531;&#x5B88;&#x536B;&#x91CC;&#x505A;&#x4E86;&#x5224;&#x65AD;&#x3002;</p>
<h3 id="articleHeader16">&#x5B9E;&#x73B0;</h3>
<p>&#x5E94;&#x7528;&#x521D;&#x59CB;&#x5316;&#x7684;&#x65F6;&#x5019;&#x53EA;&#x6302;&#x8F7D;&#x4E0D;&#x9700;&#x8981;&#x6743;&#x9650;&#x63A7;&#x5236;&#x7684;&#x8DEF;&#x7531;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const constRouterMap = [
  {
    name: &quot;login&quot;,
    path: &quot;/login&quot;,
    component: () =&gt; import(&quot;@/pages/Login.vue&quot;)
  },
  {
    path: &quot;/404&quot;,
    component: () =&gt; import(&quot;@/pages/Page404.vue&quot;)
  },
  {
    path: &quot;/init&quot;,
    component: () =&gt; import(&quot;@/pages/Init.vue&quot;)
  },
  {
    path: &quot;*&quot;,
    redirect: &quot;/404&quot;
  }
];
export default constRouterMap;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> constRouterMap = [
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;login&quot;</span>,
    <span class="hljs-attr">path</span>: <span class="hljs-string">&quot;/login&quot;</span>,
    <span class="hljs-attr">component</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">&quot;@/pages/Login.vue&quot;</span>)
  },
  {
    <span class="hljs-attr">path</span>: <span class="hljs-string">&quot;/404&quot;</span>,
    <span class="hljs-attr">component</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">&quot;@/pages/Page404.vue&quot;</span>)
  },
  {
    <span class="hljs-attr">path</span>: <span class="hljs-string">&quot;/init&quot;</span>,
    <span class="hljs-attr">component</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">&quot;@/pages/Init.vue&quot;</span>)
  },
  {
    <span class="hljs-attr">path</span>: <span class="hljs-string">&quot;*&quot;</span>,
    <span class="hljs-attr">redirect</span>: <span class="hljs-string">&quot;/404&quot;</span>
  }
];
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> constRouterMap;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from &quot;vue&quot;;
import Router from &quot;vue-router&quot;;
import ConstantRouterMap from &quot;./routers&quot;;

Vue.use(Router);

export default new Router({
  // mode: &apos;history&apos;, // require service support
  scrollBehavior: () =&gt; ({ y: 0 }),
  routes: ConstantRouterMap
});" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;vue&quot;</span>;
<span class="hljs-keyword">import</span> Router <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;vue-router&quot;</span>;
<span class="hljs-keyword">import</span> ConstantRouterMap <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./routers&quot;</span>;

Vue.use(Router);

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Router({
  <span class="hljs-comment">// mode: &apos;history&apos;, // require service support</span>
  scrollBehavior: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> ({ <span class="hljs-attr">y</span>: <span class="hljs-number">0</span> }),
  <span class="hljs-attr">routes</span>: ConstantRouterMap
});</code></pre>
<p>&#x767B;&#x5F55;&#x6210;&#x529F;&#x540E;&#x8DF3;&#x5230;<code>/</code>&#x8DEF;&#x7531;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="submitForm(formName) {
      let _this=this;
      this.$refs[formName].validate(valid =&gt; {
        if (valid) {
          _this.$store.dispatch(&quot;loginByUserName&quot;,{
            name:_this.ruleForm2.name,
            pass:_this.ruleForm2.pass
          }).then(()=&gt;{
            _this.$router.push({
              path:&apos;/&apos;
            })
          })
        } else {
          
          return false;
        }
      });
    }" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">submitForm(formName) {
      <span class="hljs-keyword">let</span> _this=<span class="hljs-keyword">this</span>;
      <span class="hljs-keyword">this</span>.$refs[formName].validate(<span class="hljs-function"><span class="hljs-params">valid</span> =&gt;</span> {
        <span class="hljs-keyword">if</span> (valid) {
          _this.$store.dispatch(<span class="hljs-string">&quot;loginByUserName&quot;</span>,{
            <span class="hljs-attr">name</span>:_this.ruleForm2.name,
            <span class="hljs-attr">pass</span>:_this.ruleForm2.pass
          }).then(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
            _this.$router.push({
              <span class="hljs-attr">path</span>:<span class="hljs-string">&apos;/&apos;</span>
            })
          })
        } <span class="hljs-keyword">else</span> {
          
          <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
        }
      });
    }</code></pre>
<p>&#x56E0;&#x4E3A;&#x5F53;&#x524D;&#x6CA1;&#x6709;<code>/</code>&#x8DEF;&#x7531;&#xFF0C;&#x4F1A;&#x8DF3;&#x5230;<code>/404</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
  &lt;h1&gt;404&lt;/h1&gt;
&lt;/template&gt;
&lt;script&gt;
export default {
  name:&apos;page404&apos;,
  mounted(){
    if(!this.$store.state.isLogin){
      this.$router.replace({ path: &apos;/login&apos; });
      return;
    }
    if(!this.$store.state.initedApp){
       this.$router.replace({ path: &apos;/init&apos; });
       return
    }
  }
}
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;template&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>404<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/template&gt;
&lt;script&gt;
export default {
  name:&apos;page404&apos;,
  mounted(){
    if(!this.$store.state.isLogin){
      this.$router.replace({ path: &apos;/</span>login<span class="hljs-string">&apos; });
      return;
    }
    if(!this.$store.state.initedApp){
       this.$router.replace({ path: &apos;</span>/init<span class="hljs-string">&apos; });
       return
    }
  }
}
&lt;/script&gt;</span></code></pre>
<p>404&#x7EC4;&#x4EF6;&#x91CC;&#x5224;&#x65AD;&#x5DF2;&#x7ECF;&#x767B;&#x5F55;&#xFF0C;&#x63A5;&#x7740;&#x5224;&#x65AD;&#x5E94;&#x7528;&#x662F;&#x5426;&#x5DF2;&#x7ECF;&#x521D;&#x59CB;&#x5316;(&#x7528;&#x6237;&#x6743;&#x9650;&#x4FE1;&#x606F;&#xFF0C;&#x53EF;&#x8BBF;&#x95EE;&#x83DC;&#x5355;&#xFF0C;&#x8DEF;&#x7531;&#x7B49;&#x662F;&#x5426;&#x5DF2;&#x7ECF;&#x4ECE;&#x540E;&#x7AEF;&#x53D6;&#x5F97;)&#x3002;&#x6CA1;&#x6709;&#x521D;&#x59CB;&#x5316;&#x5219;&#x8DF3;&#x8F6C;&#x5230;<code>/init</code>&#x8DEF;&#x7531;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
  &lt;div&gt;&lt;/div&gt;
&lt;/template&gt;
&lt;script&gt;
import { getAccessMenuList } from &quot;../mock/menus&quot;;
import components from &quot;../router/routerComponents.js&quot;;
export default {
  async mounted() {
    if (!this.$store.state.isLogin) {
      this.$router.push({ path: &quot;/login&quot; });
      return;
    }
    if (!this.$store.state.initedApp) {
      const loading = this.$loading({
        lock: true,
        text: &quot;&#x521D;&#x59CB;&#x5316;&#x4E2D;&quot;,
        spinner: &quot;el-icon-loading&quot;,
        background: &quot;rgba(0, 0, 0, 0.7)&quot;
      });
      let menus = await getAccessMenuList(); //&#x6A21;&#x62DF;&#x4ECE;&#x540E;&#x7AEF;&#x83B7;&#x53D6;
      var routers = [...menus];
      for (let router of routers) {
        let component = components[router.component];
        router.component = component;
      }
      this.$router.addRoutes(routers);
      this.$store.dispatch(&quot;setAccessMenuList&quot;, menus).then(() =&gt; {
        loading.close();
        this.$router.replace({
          path: &quot;/&quot;
        });
      });
      return;
    } else {
      this.$router.replace({
        path: &quot;/&quot;
      });
    }
  }
};
&lt;/script&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;template&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/template&gt;
&lt;script&gt;
import { getAccessMenuList } from &quot;../m</span>ock/menus<span class="hljs-string">&quot;;
import components from &quot;</span>../router/routerComponents.js<span class="hljs-string">&quot;;
export default {
  async mounted() {
    if (!this.$store.state.isLogin) {
      this.$router.push({ path: &quot;</span>/login<span class="hljs-string">&quot; });
      return;
    }
    if (!this.$store.state.initedApp) {
      const loading = this.$loading({
        lock: true,
        text: &quot;</span>&#x521D;&#x59CB;&#x5316;&#x4E2D;<span class="hljs-string">&quot;,
        spinner: &quot;</span>el-icon-loading<span class="hljs-string">&quot;,
        background: &quot;</span>rgba(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0.7</span>)<span class="hljs-string">&quot;
      });
      let menus = await getAccessMenuList(); //&#x6A21;&#x62DF;&#x4ECE;&#x540E;&#x7AEF;&#x83B7;&#x53D6;
      var routers = [...menus];
      for (let router of routers) {
        let component = components[router.component];
        router.component = component;
      }
      this.$router.addRoutes(routers);
      this.$store.dispatch(&quot;</span>setAccessMenuList<span class="hljs-string">&quot;, menus).then(() =&gt; {
        loading.close();
        this.$router.replace({
          path: &quot;</span>/<span class="hljs-string">&quot;
        });
      });
      return;
    } else {
      this.$router.replace({
        path: &quot;</span>/<span class="hljs-string">&quot;
      });
    }
  }
};
&lt;/script&gt;
</span></code></pre>
<p>init&#x7EC4;&#x4EF6;&#x91CC;&#x5224;&#x65AD;&#x5E94;&#x7528;&#x662F;&#x5426;&#x5DF2;&#x7ECF;&#x521D;&#x59CB;&#x5316;(&#x907F;&#x514D;&#x521D;&#x59CB;&#x5316;&#x540E;&#xFF0C;&#x76F4;&#x63A5;&#x4ECE;&#x5730;&#x5740;&#x680F;&#x8F93;&#x5165;&#x5730;&#x5740;&#x518D;&#x6B21;&#x8FDB;&#x5165;&#x5F53;&#x524D;&#x7EC4;&#x4EF6;)&#x3002;</p>
<p>&#x5982;&#x679C;&#x5DF2;&#x7ECF;&#x521D;&#x59CB;&#x5316;&#xFF0C;&#x8DF3;&#x8F6C;<code>/</code>&#x8DEF;&#x7531;(&#x5982;&#x679C;&#x540E;&#x7AEF;&#x8FD4;&#x56DE;&#x7684;&#x8DEF;&#x7531;&#x91CC;&#x6CA1;&#x6709;&#x5B9A;&#x4E49;&#x6B21;&#x8DEF;&#x7531;&#xFF0C;&#x5219;&#x4F1A;&#x8DF3;&#x8F6C;404)&#x3002;</p>
<p>&#x6CA1;&#x6709;&#x521D;&#x59CB;&#x5316;&#xFF0C;&#x5219;&#x8C03;&#x7528;&#x8FDC;&#x7A0B;&#x63A5;&#x53E3;&#x83B7;&#x53D6;&#x83DC;&#x5355;&#x548C;&#x8DEF;&#x7531;&#x7B49;&#xFF0C;&#x7136;&#x540E;&#x5904;&#x7406;&#x540E;&#x7AEF;&#x8FD4;&#x56DE;&#x7684;&#x8DEF;&#x7531;&#xFF0C;&#x5C06;component&#x8D4B;&#x503C;&#x4E3A;&#x771F;&#x6B63;<br>&#x7684;&#x7EC4;&#x4EF6;&#xFF0C;&#x63A5;&#x7740;&#x8C03;&#x7528;<code>addRoutes</code>&#x6302;&#x8F7D;&#x65B0;&#x8DEF;&#x7531;&#xFF0C;&#x6700;&#x540E;&#x8DF3;&#x8F6C;<code>/</code>&#x8DEF;&#x7531;&#x5373;&#x53EF;&#x3002;&#x83DC;&#x5355;&#x7684;&#x5904;&#x7406;&#x4E5F;&#x662F;&#x5728;&#x6B64;&#x5904;&#xFF0C;&#x770B;&#x5B9E;&#x9645;<br>&#x9700;&#x6C42;&#x3002;</p>
<blockquote><a href="https://codesandbox.io/s/r02zvvlpno" rel="nofollow noreferrer" target="_blank">&#x5B9E;&#x73B0;&#x4F8B;&#x5B50;</a></blockquote>
<h3 id="articleHeader17">&#x7F3A;&#x70B9;</h3>
<ul>
<li>&#x5728;404&#x9875;&#x9762;&#x505A;&#x4E86;&#x5224;&#x65AD;&#xFF0C;&#x611F;&#x89C9;&#x6BD4;&#x8F83;&#x602A;&#x5F02;</li>
<li>&#x591A;&#x5F15;&#x5165;&#x4E86;&#x4E00;&#x4E2A;init&#x9875;&#x9762;&#x7EC4;&#x4EF6;</li>
</ul>
<h2 id="articleHeader18">&#x603B;&#x7ED3;</h2>
<p>&#x6BD4;&#x8F83;&#x63A8;&#x8350;&#x540E;&#x9762;&#x4E24;&#x79CD;&#x5B9E;&#x73B0;&#x65B9;&#x5F0F;&#x3002;</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue权限路由实现方式总结

## 原文链接
[https://segmentfault.com/a/1190000015800801](https://segmentfault.com/a/1190000015800801)

