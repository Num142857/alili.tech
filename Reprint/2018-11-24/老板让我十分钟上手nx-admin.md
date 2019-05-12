---
title: '老板让我十分钟上手nx-admin' 
date: 2018-11-24 2:30:09
hidden: true
slug: tf1h17c5i9
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">&#x5927;&#x4F53;&#x6D41;&#x7A0B;</h2><h5>&#x53C2;&#x8003;&#x8D44;&#x6599;:</h5><p><a href="https://github.com/mgbq/nx-admin" rel="nofollow noreferrer" target="_blank">nx-admin&#x9879;&#x76EE;&#x5730;&#x5740;</a></p><blockquote>&#x9996;&#x5148;&#x8FD9;&#x91CC;&#x5C31;&#x4E0D;&#x8BB2;&#x89E3;vue&#x548C;vuex&#x4E4B;&#x7C7B;&#x7684;&#x57FA;&#x7840;&#x4E1C;&#x897F;&#x4E86; &#x6709;&#x5174;&#x8DA3;&#x7684;&#x53EF;&#x4EE5;&#x53BB;&#x5B98;&#x65B9;&#x6587;&#x6863;&#x4E86;&#x89E3;&#x3002;&#x8FD9;&#x91CC;&#x6839;&#x636E;&#x6D41;&#x7A0B;&#x8D70;&#x5411;&#x5927;&#x6982;&#x8BF4;&#x8BF4;</blockquote><h3 id="articleHeader1">&#x8DEF;&#x7531;&#x914D;&#x7F6E;</h3><p>&#x9996;&#x5148;&#x627E;&#x5230;&#x8DEF;&#x7531;&#x914D;&#x7F6E;,&#x8DEF;&#x7531;&#x914D;&#x7F6E;&#x653E;&#x5728;&#x4E86;<code>src/router/index.js</code>&#x8DEF;&#x7531;&#x914D;&#x7F6E;&#x91CC;&#x66B4;&#x9732;&#x4E86;&#x4E24;&#x4E2A;&#x5E38;&#x91CF; &#x4E00;&#x4E2A;&#x662F; <code>constantRouterMap</code> &#x53E6;&#x5916;&#x4E00;&#x4E2A;&#x662F; <code>asyncRouterMap</code> &#x8FD9;&#x91CC;&#x5148;&#x8BF4;&#x8BF4;<code>constantRouterMap</code>&#x3002; nx-admin&#x7684;&#x6743;&#x9650;&#x9A8C;&#x8BC1;&#x5927;&#x6982;&#x662F;</p><ul><li>1 &#x9ED8;&#x8BA4;&#x5927;&#x5BB6;&#x90FD;&#x80FD;&#x8BBF;&#x95EE;&#x7684;&#x9875;&#x9762;,&#x4E0D;&#x9700;&#x8981;&#x6743;&#x9650;, &#x90FD;&#x8BBF;&#x95EE;&#x7684;&#x9875;&#x9762;&#x5B9A;&#x4E49;&#x4E3A; <code>constantRouterMap</code></li><li>2 &#x9700;&#x8981;&#x767B;&#x5F55;&#x6216;&#x8005;&#x9700;&#x8981;&#x6743;&#x9650;&#x7684;&#x9875;&#x9762;&#x8DEF;&#x7531;&#x5B9A;&#x4E49;&#x4E3A; <code>asyncRouterMap</code></li></ul><p>&#x6839;&#x636E;&#x540E;&#x53F0;&#x83B7;&#x53D6;&#x5230;&#x7528;&#x6237;&#x4FE1;&#x606F;role&#xFF08;&#x6743;&#x9650;&#xFF09;&#x7684;&#x4E0D;&#x540C;&#x6765;&#x52A8;&#x6001;&#x52A0;&#x8F7D;asyncRouterMap&#x4E2D;meta.role&#x7684;&#x6743;&#x9650;&#x5BF9;&#x5E94;&#x7684;&#x9875;&#x9762;</p><h3 id="articleHeader2">&#x767B;&#x5F55;&#x6210;&#x529F;&#x540E;&#x505A;&#x7684;&#x4E8B;&#x60C5;</h3><p>&#x70B9;&#x51FB;&#x767B;&#x5F55;&#x4EE5;&#x540E; &#x5DE6;&#x4FA7;&#x7684;&#x4FA7;&#x8FB9;&#x680F;&#x6709;&#x5BFC;&#x822A;&#x5217;&#x8868;&#x3002; &#x8FD9;&#x91CC;&#x63D0;&#x51FA;&#x4E24;&#x4E2A;&#x7591;&#x95EE;&#xFF1F;</p><ul><li>&#x6839;&#x636E;&#x8DEF;&#x7531;&#x914D;&#x7F6E;&#x8BF4;&#x7684; &#x52A8;&#x6001;&#x52A0;&#x8F7D;&#x5BF9;&#x5E94;&#x7684;&#x6743;&#x9650;&#x8DEF;&#x7531; &#x90A3;&#x4E48;&#x4FA7;&#x8FB9;&#x680F;&#x90A3;&#x4E48;&#x591A;&#x8DEF;&#x7531; &#x80AF;&#x5B9A;&#x4E0D;&#x80FD;&#x5199;&#x6B7B;&#x5427;&#xFF1F;</li><li>&#x6211;&#x70B9;&#x51FB;&#x767B;&#x5F55;&#x540E; &#x90A3;&#x4E9B;&#x767B;&#x5F55;&#x6D41;&#x7A0B;&#x600E;&#x4E48;&#x8D70;&#x7684;&#xFF1F;&#x7528;&#x6237;&#x6743;&#x9650;&#x5B58;&#x5728;&#x54EA;&#x91CC;&#xFF1F;token&#x5728;&#x54EA;&#x91CC;&#xFF1F;</li></ul><h3 id="articleHeader3">&#x4FA7;&#x8FB9;&#x680F;&#x7684;&#x52A8;&#x6001;&#x6E32;&#x67D3;</h3><p>&#x6839;&#x636E;&#x95EE;&#x9898;1&#x6765;&#x56DE;&#x7B54; &#x9996;&#x5148;&#x6211;&#x4EEC;&#x627E;&#x5230;layout&#x4E5F;&#x5C31;&#x662F;<code>src/views/layout/Layout.vue</code>&#xFF0C;<br>&#x56E0;&#x4E3A;&#x5728;&#x8DEF;&#x7531;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x6211;&#x4EEC;&#x770B;&#x89C1;<code>asyncRouterMap</code>&#x4E2D;&#x597D;&#x591A;&#x7EC4;&#x4EF6;&#x7684;&#x7236;&#x7EC4;&#x4EF6;&#x90FD;&#x662F;<code>Layout</code> &#x5728;<code>Layout</code>&#x4E2D;&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x6709;&#x4E2A;&#x7EC4;&#x4EF6;<code>sidebar</code>&#x3002;<br>ok&#x7EE7;&#x7EED;&#x627E;<code>sidebar</code>&#x8FD9;&#x4E2A;&#x7EC4;&#x4EF6; <code>src/views/layout/components/Sidebar/index.vue</code>&#xFF0C;&#x53D1;&#x73B0;&#x8FD9;&#x91CC;&#x5C31;&#x662F;&#x6E32;&#x67D3;&#x4FA7;&#x8FB9;&#x680F;&#x7684;,&#x7136;&#x540E;&#x627E;&#x5230;&#x6E32;&#x67D3;&#x7684;&#x53D8;&#x91CF;&#x662F;<code>permission_routers</code> &#x8FD9;&#x4E2A;&#x53D8;&#x91CF;&#x662F;&#x5B58;&#x5728;vuex&#x91CC;&#x9762;&#x7684;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#x8DEF;&#x7531;&#x662F;&#x5B58;&#x5728;vuex&#x7684; &#x6240;&#x4EE5;&#x548B;&#x4EEC;&#x53BB;vuex&#x91CC;&#x9762;&#x627E;&#x627E;&#x770B; <code>src/store/modules/permission.js</code>&#x3002;</p><h3 id="articleHeader4">&#x8DEF;&#x7531;&#x7684;&#x52A8;&#x6001;&#x52A0;&#x8F7D;</h3><p><code>src/store/modules/permission.js</code> &#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x91CC;&#x9762;&#x6709;&#x4E2A;actions</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" GenerateRoutes({ commit }, data) {
      return new Promise(resolve =&gt; {
        const { roles } = data
        let accessedRouters
        if (roles.indexOf(&apos;admin&apos;) &gt;= 0) {
          accessedRouters = asyncRouterMap
        } else {
          accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        }
        commit(&apos;SET_ROUTERS&apos;, accessedRouters)
        resolve()
      })
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code> GenerateRoutes({ commit }, data) {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
        <span class="hljs-keyword">const</span> { roles } = data
        <span class="hljs-keyword">let</span> accessedRouters
        <span class="hljs-keyword">if</span> (roles.indexOf(<span class="hljs-string">&apos;admin&apos;</span>) &gt;= <span class="hljs-number">0</span>) {
          accessedRouters = asyncRouterMap
        } <span class="hljs-keyword">else</span> {
          accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        }
        commit(<span class="hljs-string">&apos;SET_ROUTERS&apos;</span>, accessedRouters)
        resolve()
      })
    }</code></pre><p>&#x53D1;&#x73B0;&#x5C31;&#x662F;&#x8FD9;&#x4E00;&#x6BB5;&#x4EE3;&#x7801;&#x66F4;&#x6539;&#x4E86;permission_routers,&#x5177;&#x4F53;&#x903B;&#x8F91;&#x54B1;&#x4EEC;&#x4E0D;&#x770B; &#x7B80;&#x5355;&#x89E3;&#x91CA;&#x6765;&#x8BF4;&#x5C31;&#x662F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" &#x5982;&#x679C;&#x7528;&#x6237;&#x7684;&#x6743;&#x9650;&#x662F;&#x7BA1;&#x7406;&#x5458;
        &#x628A;asyncRouterMap&#x6240;&#x6709;&#x7684;&#x8DEF;&#x7531;&#x9875;&#x9762;&#x90FD;&#x6E32;&#x67D3;&#x51FA;&#x6765;,&#x6BD5;&#x7ADF;&#x7BA1;&#x7406;&#x5458;&#x561B; &#x4F60;&#x61C2;&#x7684;&#x6743;&#x9650;&#x561B;&#x3002;
    &#x5426;&#x5219; 
        &#x6211;&#x4E0D;&#x662F;&#x7BA1;&#x7406;&#x5458;&#x4F46;&#x662F;&#x4E5F;&#x4E0D;&#x662F;&#x6E38;&#x5BA2;&#x5C31;&#x662F;&#x4E00;&#x5C0F;&#x5E02;&#x6C11; &#x90A3;&#x4E48;&#x6211;&#x8981;&#x53BB;asyncRouterMap&#x4E2D;&#x627E;&#x627E;&#x6211;&#x5C0F;&#x5E02;&#x6C11;&#x80FD;&#x591F;&#x8BBF;&#x95EE;&#x54EA;&#x4E9B;&#x9875;&#x9762;&#x3002;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs"><code> &#x5982;&#x679C;&#x7528;&#x6237;&#x7684;&#x6743;&#x9650;&#x662F;&#x7BA1;&#x7406;&#x5458;
        &#x628A;asyncRouterMap&#x6240;&#x6709;&#x7684;&#x8DEF;&#x7531;&#x9875;&#x9762;&#x90FD;&#x6E32;&#x67D3;&#x51FA;&#x6765;,&#x6BD5;&#x7ADF;&#x7BA1;&#x7406;&#x5458;&#x561B; &#x4F60;&#x61C2;&#x7684;&#x6743;&#x9650;&#x561B;&#x3002;
    &#x5426;&#x5219; 
        &#x6211;&#x4E0D;&#x662F;&#x7BA1;&#x7406;&#x5458;&#x4F46;&#x662F;&#x4E5F;&#x4E0D;&#x662F;&#x6E38;&#x5BA2;&#x5C31;&#x662F;&#x4E00;&#x5C0F;&#x5E02;&#x6C11; &#x90A3;&#x4E48;&#x6211;&#x8981;&#x53BB;asyncRouterMap&#x4E2D;&#x627E;&#x627E;&#x6211;&#x5C0F;&#x5E02;&#x6C11;&#x80FD;&#x591F;&#x8BBF;&#x95EE;&#x54EA;&#x4E9B;&#x9875;&#x9762;&#x3002;</code></pre><p>&#x770B;&#x5B8C;&#x8FD9;&#x6BB5;&#x903B;&#x8F91;&#x548B;&#x4EEC;&#x5C31;&#x77E5;&#x9053;&#x4E86;&#x8FD9;&#x4E2A;&#x8DEF;&#x7531;&#x662F;&#x5982;&#x4F55;&#x52A8;&#x6001;&#x66F4;&#x6539;&#x7684;&#x4E86;,&#x7B49;&#x7B49;,&#x662F;&#x4E0D;&#x662F;&#x5FD8;&#x4E86;&#x5565;&#xFF1F; &#x867D;&#x7136;&#x6211;&#x77E5;&#x9053;&#x8FD9;&#x4E2A;actions,&#x4F46;&#x662F;&#x3002;&#x3002;&#x3002;&#x5728;&#x54EA;&#x8C03;&#x7528;&#x7684;&#xFF1F; &#x7ECF;&#x8FC7;&#x6DF1;&#x601D;&#x719F;&#x8651;&#x7684;&#x7740;&#x60F3;&#xFF0C;&#x5728;&#x82B1;&#x4E86;0.1s&#x540E; &#x5C31;&#x5F97;&#x51FA;&#xFF0C;&#x65E2;&#x7136;&#x662F;&#x8DEF;&#x7531;&#x561B; &#x80AF;&#x5B9A;&#x662F;&#x6709;&#x4E2A;&#x5168;&#x5C40;&#x7684;&#x5730;&#x65B9;&#x8981;&#x505A;&#x5224;&#x65AD;&#x7684; &#x6240;&#x4EE5;&#x5F97;&#x51FA;&#x7ED3;&#x8BBA;&#x5C31;&#x662F; <code>router.beforeEach</code>, &#x4E00;&#x5F00;&#x59CB;&#x53BB;&#x627E;&#x90A3;&#x4E2A;&#x5565;<code>src/main.js</code>,&#x53D1;&#x73B0;<code>beforeEach</code>&#x88AB;&#x5206;&#x79BB;&#x5728;<code>src/permission.js</code> &#x6253;&#x5F00;&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x3002;&#x4E00;&#x5207;&#x7591;&#x95EE;&#x90FD;&#x89E3;&#x5F00;&#x4E86;&#x3002;</p><h3 id="articleHeader5">&#x7528;&#x6237;&#x6743;&#x9650;&#x7684;&#x83B7;&#x53D6;</h3><p>&#x8BF4;&#x771F;&#x7684;&#x3002;&#x3002;&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x597D;&#x957F;&#x3002;&#x3002;&#x90FD;&#x4E0D;&#x60F3;&#x770B;&#x4E86;&#x3002;&#x3002;&#x3002;&#x3002; &#x4E0B;&#x56FE;&#x7684;&#x4EE3;&#x7801;&#x8FD9;&#x4E48;&#x957F; &#x770B;&#x4E2A;&#x6BDB;&#x554A;&#x3002;&#x3002;&#x4E8E;&#x662F;&#x6211;&#x7B80;&#x5355;&#x7FFB;&#x8BD1;&#x4E86;&#x4E0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.beforeEach((to, from, next) =&gt; {
  NProgress.start() // start progress bar 
  if (getToken()) { // &#x5224;&#x65AD;&#x662F;&#x5426;&#x6709;token
    if (to.path === &apos;/login&apos;) {
      next({ path: &apos;/&apos; })
      NProgress.done() // router&#x5728;hash&#x6A21;&#x5F0F;&#x4E0B; &#x624B;&#x52A8;&#x6539;&#x53D8;hash &#x91CD;&#x5B9A;&#x5411;&#x56DE;&#x6765; &#x4E0D;&#x4F1A;&#x89E6;&#x53D1;afterEach &#x6682;&#x65F6;hack&#x65B9;&#x6848; ps&#xFF1A;history&#x6A21;&#x5F0F;&#x4E0B;&#x65E0;&#x95EE;&#x9898;&#xFF0C;&#x53EF;&#x5220;&#x9664;&#x8BE5;&#x884C;&#xFF01;
    } else {
      if (store.getters.roles.length === 0) { // &#x5224;&#x65AD;&#x5F53;&#x524D;&#x7528;&#x6237;&#x662F;&#x5426;&#x5DF2;&#x62C9;&#x53D6;&#x5B8C;user_info&#x4FE1;&#x606F;
        store.dispatch(&apos;GetUserInfo&apos;).then(res =&gt; { // &#x62C9;&#x53D6;user_info
          const roles = res.data.role
          store.dispatch(&apos;GenerateRoutes&apos;, { roles }).then(() =&gt; { // &#x751F;&#x6210;&#x53EF;&#x8BBF;&#x95EE;&#x7684;&#x8DEF;&#x7531;&#x8868;
            router.addRoutes(store.getters.addRouters) // &#x52A8;&#x6001;&#x6DFB;&#x52A0;&#x53EF;&#x8BBF;&#x95EE;&#x8DEF;&#x7531;&#x8868;
            next({ ...to, replace: true }) // hack&#x65B9;&#x6CD5; &#x786E;&#x4FDD;addRoutes&#x5DF2;&#x5B8C;&#x6210; ,set the replace: true so the navigation will not leave a history record
          })
        }).catch(() =&gt; {
          store.dispatch(&apos;FedLogOut&apos;).then(() =&gt; {
            Message.error(&apos;Verification failed, please login again&apos;)
            next({ path: &apos;/login&apos; })
          })
        })
      } else {
        // &#x6CA1;&#x6709;&#x52A8;&#x6001;&#x6539;&#x53D8;&#x6743;&#x9650;&#x7684;&#x9700;&#x6C42;&#x53EF;&#x76F4;&#x63A5;next() &#x5220;&#x9664;&#x4E0B;&#x65B9;&#x6743;&#x9650;&#x5224;&#x65AD; &#x2193;
        if (hasPermission(store.getters.roles, to.meta.role)) {
          next()//
        } else {
          next({ path: &apos;/401&apos;, query: { noGoBack: true "}}")
          NProgress.done() // router&#x5728;hash&#x6A21;&#x5F0F;&#x4E0B; &#x624B;&#x52A8;&#x6539;&#x53D8;hash &#x91CD;&#x5B9A;&#x5411;&#x56DE;&#x6765; &#x4E0D;&#x4F1A;&#x89E6;&#x53D1;afterEach &#x6682;&#x65F6;hack&#x65B9;&#x6848; ps&#xFF1A;history&#x6A21;&#x5F0F;&#x4E0B;&#x65E0;&#x95EE;&#x9898;&#xFF0C;&#x53EF;&#x5220;&#x9664;&#x8BE5;&#x884C;&#xFF01;
        }
        // &#x53EF;&#x5220; &#x2191;
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // &#x5728;&#x514D;&#x767B;&#x5F55;&#x767D;&#x540D;&#x5355;&#xFF0C;&#x76F4;&#x63A5;&#x8FDB;&#x5165;
      next()
    } else {
      next(&apos;/login&apos;) // &#x5426;&#x5219;&#x5168;&#x90E8;&#x91CD;&#x5B9A;&#x5411;&#x5230;&#x767B;&#x5F55;&#x9875;
      NProgress.done() // router&#x5728;hash&#x6A21;&#x5F0F;&#x4E0B; &#x624B;&#x52A8;&#x6539;&#x53D8;hash &#x91CD;&#x5B9A;&#x5411;&#x56DE;&#x6765; &#x4E0D;&#x4F1A;&#x89E6;&#x53D1;afterEach &#x6682;&#x65F6;hack&#x65B9;&#x6848; ps&#xFF1A;history&#x6A21;&#x5F0F;&#x4E0B;&#x65E0;&#x95EE;&#x9898;&#xFF0C;&#x53EF;&#x5220;&#x9664;&#x8BE5;&#x884C;&#xFF01;
    }
  }
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>router.beforeEach(<span class="hljs-function">(<span class="hljs-params">to, <span class="hljs-keyword">from</span>, next</span>) =&gt;</span> {
  NProgress.start() <span class="hljs-comment">// start progress bar </span>
  <span class="hljs-keyword">if</span> (getToken()) { <span class="hljs-comment">// &#x5224;&#x65AD;&#x662F;&#x5426;&#x6709;token</span>
    <span class="hljs-keyword">if</span> (to.path === <span class="hljs-string">&apos;/login&apos;</span>) {
      next({ <span class="hljs-attr">path</span>: <span class="hljs-string">&apos;/&apos;</span> })
      NProgress.done() <span class="hljs-comment">// router&#x5728;hash&#x6A21;&#x5F0F;&#x4E0B; &#x624B;&#x52A8;&#x6539;&#x53D8;hash &#x91CD;&#x5B9A;&#x5411;&#x56DE;&#x6765; &#x4E0D;&#x4F1A;&#x89E6;&#x53D1;afterEach &#x6682;&#x65F6;hack&#x65B9;&#x6848; ps&#xFF1A;history&#x6A21;&#x5F0F;&#x4E0B;&#x65E0;&#x95EE;&#x9898;&#xFF0C;&#x53EF;&#x5220;&#x9664;&#x8BE5;&#x884C;&#xFF01;</span>
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">if</span> (store.getters.roles.length === <span class="hljs-number">0</span>) { <span class="hljs-comment">// &#x5224;&#x65AD;&#x5F53;&#x524D;&#x7528;&#x6237;&#x662F;&#x5426;&#x5DF2;&#x62C9;&#x53D6;&#x5B8C;user_info&#x4FE1;&#x606F;</span>
        store.dispatch(<span class="hljs-string">&apos;GetUserInfo&apos;</span>).then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> { <span class="hljs-comment">// &#x62C9;&#x53D6;user_info</span>
          <span class="hljs-keyword">const</span> roles = res.data.role
          store.dispatch(<span class="hljs-string">&apos;GenerateRoutes&apos;</span>, { roles }).then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> { <span class="hljs-comment">// &#x751F;&#x6210;&#x53EF;&#x8BBF;&#x95EE;&#x7684;&#x8DEF;&#x7531;&#x8868;</span>
            router.addRoutes(store.getters.addRouters) <span class="hljs-comment">// &#x52A8;&#x6001;&#x6DFB;&#x52A0;&#x53EF;&#x8BBF;&#x95EE;&#x8DEF;&#x7531;&#x8868;</span>
            next({ ...to, <span class="hljs-attr">replace</span>: <span class="hljs-literal">true</span> }) <span class="hljs-comment">// hack&#x65B9;&#x6CD5; &#x786E;&#x4FDD;addRoutes&#x5DF2;&#x5B8C;&#x6210; ,set the replace: true so the navigation will not leave a history record</span>
          })
        }).catch(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
          store.dispatch(<span class="hljs-string">&apos;FedLogOut&apos;</span>).then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            Message.error(<span class="hljs-string">&apos;Verification failed, please login again&apos;</span>)
            next({ <span class="hljs-attr">path</span>: <span class="hljs-string">&apos;/login&apos;</span> })
          })
        })
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-comment">// &#x6CA1;&#x6709;&#x52A8;&#x6001;&#x6539;&#x53D8;&#x6743;&#x9650;&#x7684;&#x9700;&#x6C42;&#x53EF;&#x76F4;&#x63A5;next() &#x5220;&#x9664;&#x4E0B;&#x65B9;&#x6743;&#x9650;&#x5224;&#x65AD; &#x2193;</span>
        <span class="hljs-keyword">if</span> (hasPermission(store.getters.roles, to.meta.role)) {
          next()<span class="hljs-comment">//</span>
        } <span class="hljs-keyword">else</span> {
          next({ <span class="hljs-attr">path</span>: <span class="hljs-string">&apos;/401&apos;</span>, <span class="hljs-attr">query</span>: { <span class="hljs-attr">noGoBack</span>: <span class="hljs-literal">true</span> "}}")
          NProgress.done() <span class="hljs-comment">// router&#x5728;hash&#x6A21;&#x5F0F;&#x4E0B; &#x624B;&#x52A8;&#x6539;&#x53D8;hash &#x91CD;&#x5B9A;&#x5411;&#x56DE;&#x6765; &#x4E0D;&#x4F1A;&#x89E6;&#x53D1;afterEach &#x6682;&#x65F6;hack&#x65B9;&#x6848; ps&#xFF1A;history&#x6A21;&#x5F0F;&#x4E0B;&#x65E0;&#x95EE;&#x9898;&#xFF0C;&#x53EF;&#x5220;&#x9664;&#x8BE5;&#x884C;&#xFF01;</span>
        }
        <span class="hljs-comment">// &#x53EF;&#x5220; &#x2191;</span>
      }
    }
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">if</span> (whiteList.indexOf(to.path) !== <span class="hljs-number">-1</span>) { <span class="hljs-comment">// &#x5728;&#x514D;&#x767B;&#x5F55;&#x767D;&#x540D;&#x5355;&#xFF0C;&#x76F4;&#x63A5;&#x8FDB;&#x5165;</span>
      next()
    } <span class="hljs-keyword">else</span> {
      next(<span class="hljs-string">&apos;/login&apos;</span>) <span class="hljs-comment">// &#x5426;&#x5219;&#x5168;&#x90E8;&#x91CD;&#x5B9A;&#x5411;&#x5230;&#x767B;&#x5F55;&#x9875;</span>
      NProgress.done() <span class="hljs-comment">// router&#x5728;hash&#x6A21;&#x5F0F;&#x4E0B; &#x624B;&#x52A8;&#x6539;&#x53D8;hash &#x91CD;&#x5B9A;&#x5411;&#x56DE;&#x6765; &#x4E0D;&#x4F1A;&#x89E6;&#x53D1;afterEach &#x6682;&#x65F6;hack&#x65B9;&#x6848; ps&#xFF1A;history&#x6A21;&#x5F0F;&#x4E0B;&#x65E0;&#x95EE;&#x9898;&#xFF0C;&#x53EF;&#x5220;&#x9664;&#x8BE5;&#x884C;&#xFF01;</span>
    }
  }
})</code></pre><p>&#x8BF7;&#x8BF4;&#x4EBA;&#x8BDD;&#xFF0C;&#x7FFB;&#x8BD1;&#x6210;&#x4EBA;&#x8BDD;&#x7684;&#x7248;&#x672C;&#x3002;&#x3002;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &#x6BCF;&#x6B21;&#x66F4;&#x6539;&#x9875;&#x9762;&#x8DEF;&#x7531;
        &#x4F60;&#x6709;&#x6CA1;&#x6709;token&#x554A;&#xFF1F;
            &#x6709;&#x554A;
                &#x597D;&#x7684;,&#x4F60;&#x7684;&#x6743;&#x9650;&#x662F;&#x9ED8;&#x8BA4;&#x7684;&#x6743;&#x9650;0&#x4E48;&#xFF1F;
                    &#x662F;&#x7684;&#x3002;&#x3002;&#x6211;&#x5C31;&#x662F;&#x4E00;&#x6E38;&#x5BA2;
                        &#x7CFB;&#x7EDF;&#x83B7;&#x53D6;&#x6211;&#x7684;&#x4FE1;&#x606F;..&#x62FF;&#x5230;&#x6743;&#x9650;&#x503C;,&#x52A8;&#x6001;&#x52A0;&#x8F7D;&#x8DEF;&#x7531;(GenerateRoutes)...&#x901A;&#x884C;...
                    &#x4E0D;&#x662F;&#x3002;&#x3002;&#x6211;&#x662F;&#x6743;&#x9650;&#x6C6A;(admin)
                        &#x7B49;&#x7B49;..&#x6211;&#x770B;&#x770B;&#x4F5C;&#x8005;&#x6709;&#x6CA1;&#x6709;&#x628A;&#x4F60;&#x964D;&#x7EA7;
                            &#x6CA1;&#x6709;
                                &#x597D;&#x4E86;&#x3002;&#x3002;&#x4F60;&#x8FD8;&#x662F;&#x6743;&#x9650;&#x6C6A; &#x8BF7;&#x8FDB;
                            &#x6709;
                                &#x6EDA;&#x5427;,&#x4F60;&#x5DF2;&#x7ECF;&#x4E0D;&#x662F;&#x6743;&#x9650;&#x6C6A;&#x4E86;,&#x4F5C;&#x8005;&#x5DF2;&#x7ECF;&#x628A;&#x4F60;&#x5199;&#x6210;&#x6218;&#x6597;&#x529B;&#x53EA;&#x6709;5&#x7684;&#x6E23;&#x6E23;&#x4E86;
            &#x6CA1;&#x6709;
                &#x6CA1;&#x6709;&#x8FD8;&#x6562;&#x95EF;&#x8FD9;&#x91CC;&#xFF1F;&#x6EDA;&#x53BB;&#x5173;&#x53E3;(/login)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs clean"><code>  &#x6BCF;&#x6B21;&#x66F4;&#x6539;&#x9875;&#x9762;&#x8DEF;&#x7531;
        &#x4F60;&#x6709;&#x6CA1;&#x6709;token&#x554A;&#xFF1F;
            &#x6709;&#x554A;
                &#x597D;&#x7684;,&#x4F60;&#x7684;&#x6743;&#x9650;&#x662F;&#x9ED8;&#x8BA4;&#x7684;&#x6743;&#x9650;<span class="hljs-number">0</span>&#x4E48;&#xFF1F;
                    &#x662F;&#x7684;&#x3002;&#x3002;&#x6211;&#x5C31;&#x662F;&#x4E00;&#x6E38;&#x5BA2;
                        &#x7CFB;&#x7EDF;&#x83B7;&#x53D6;&#x6211;&#x7684;&#x4FE1;&#x606F;..&#x62FF;&#x5230;&#x6743;&#x9650;&#x503C;,&#x52A8;&#x6001;&#x52A0;&#x8F7D;&#x8DEF;&#x7531;(GenerateRoutes)...&#x901A;&#x884C;...
                    &#x4E0D;&#x662F;&#x3002;&#x3002;&#x6211;&#x662F;&#x6743;&#x9650;&#x6C6A;(admin)
                        &#x7B49;&#x7B49;..&#x6211;&#x770B;&#x770B;&#x4F5C;&#x8005;&#x6709;&#x6CA1;&#x6709;&#x628A;&#x4F60;&#x964D;&#x7EA7;
                            &#x6CA1;&#x6709;
                                &#x597D;&#x4E86;&#x3002;&#x3002;&#x4F60;&#x8FD8;&#x662F;&#x6743;&#x9650;&#x6C6A; &#x8BF7;&#x8FDB;
                            &#x6709;
                                &#x6EDA;&#x5427;,&#x4F60;&#x5DF2;&#x7ECF;&#x4E0D;&#x662F;&#x6743;&#x9650;&#x6C6A;&#x4E86;,&#x4F5C;&#x8005;&#x5DF2;&#x7ECF;&#x628A;&#x4F60;&#x5199;&#x6210;&#x6218;&#x6597;&#x529B;&#x53EA;&#x6709;<span class="hljs-number">5</span>&#x7684;&#x6E23;&#x6E23;&#x4E86;
            &#x6CA1;&#x6709;
                &#x6CA1;&#x6709;&#x8FD8;&#x6562;&#x95EF;&#x8FD9;&#x91CC;&#xFF1F;&#x6EDA;&#x53BB;&#x5173;&#x53E3;(/login)</code></pre><p>&#x6CA1;&#x9519;&#xFF0C;&#x5C31;&#x8FD9;&#x4E48;&#x7B80;&#x5355;&#x3002;&#x6574;&#x4E2A;&#x6743;&#x9650;&#x9A8C;&#x8BC1;&#x6D41;&#x7A0B;&#x5C31;&#x5B8C;&#x6574;&#x4E86;&#x3002;&#x5269;&#x4E0B;&#x7684;&#x5C31;&#x662F;&#x8BFB;&#x8BFB;&#x6587;&#x6863;&#x554A;,&#x770B;&#x770B;&#x5982;&#x4F55;&#x4F7F;&#x7528;&#x7EC4;&#x4EF6;&#x4E4B;&#x7C7B;&#x7684;&#x4E86;&#x3002;</p><p>&#x53C2;&#x8003; <a href="https://github.com/Relsoul" rel="nofollow noreferrer" target="_blank">https://github.com/Relsoul</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
老板让我十分钟上手nx-admin

## 原文链接
[https://segmentfault.com/a/1190000015578063](https://segmentfault.com/a/1190000015578063)

