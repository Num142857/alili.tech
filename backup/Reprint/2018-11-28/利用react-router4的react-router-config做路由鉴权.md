---
title: '利用react-router4的react-router-config做路由鉴权' 
date: 2018-11-28 2:30:10
hidden: true
slug: ix6394yhoo
categories: [reprint]
---

{{< raw >}}
<p>&#x4E00;&#x3001;react-router-config &#x662F;&#x4E00;&#x4E2A;&#x5E2E;&#x52A9;&#x6211;&#x4EEC;&#x914D;&#x7F6E;&#x9759;&#x6001;&#x8DEF;&#x7531;&#x7684;&#x5C0F;&#x52A9;&#x624B;&#x3002;<br>&#x5176;&#x6E90;&#x7801;&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x9AD8;&#x9636;&#x51FD;&#x6570; &#x5229;&#x7528;&#x4E00;&#x4E2A;map&#x51FD;&#x6570;&#x751F;&#x6210;&#x9759;&#x6001;&#x8DEF;&#x7531;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from &quot;react&quot;;
import Switch from &quot;react-router/Switch&quot;;
import Route from &quot;react-router/Route&quot;;
const renderRoutes = (routes, extraProps = {}, switchProps = {}) =&gt;
routes ? (
    &lt;Switch {...switchProps}&gt;
        {routes.map((route, i) =&gt; ( 
        &lt;Route
          key={route.key || i}
          path={route.path}
          exact={route.exact}
          strict={route.strict}
          render={props =&gt; (
            &lt;route.component {...props} {...extraProps} route={route} /&gt;
          )}
        /&gt;
      ))}
    &lt;/Switch&gt;
  ) : null;
 export default renderRoutes;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xquery"><code><span class="hljs-keyword">import</span> React from <span class="hljs-string">&quot;react&quot;</span>;
<span class="hljs-keyword">import</span> Switch from <span class="hljs-string">&quot;react-router/Switch&quot;</span>;
<span class="hljs-keyword">import</span> Route from <span class="hljs-string">&quot;react-router/Route&quot;</span>;
const renderRoutes = (routes, extraProps = {}, switchProps = {}) =&gt;
routes ? (
    &lt;Switch {...switchProps}&gt;
        {routes.map((route, i) =&gt; ( 
        &lt;Route
          key={route.key || i}
          path={route.path}
          exact={route.exact}
          strict={route.strict}
          render={props =&gt; (
            &lt;route.component {...props} {...extraProps} route={route} /&gt;
          )}
        /&gt;
      ))}
    &lt;/Switch&gt;
  ) : null;
 export <span class="hljs-keyword">default</span> renderRoutes;</code></pre><p>//router.js &#x5047;&#x8BBE;&#x8FD9;&#x662F;&#x6211;&#x4EEC;&#x8BBE;&#x7F6E;&#x7684;&#x8DEF;&#x7531;&#x6570;&#x7EC4;&#xFF08;&#x8FD9;&#x79CD;&#x5199;&#x6CD5;&#x548C;vue&#x5F88;&#x76F8;&#x4F3C;&#x662F;&#x4E0D;&#x662F;?)</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const routes = [
    { path: &apos;/&apos;,
        exact: true,
        component: Home,
    },
    {
        path: &apos;/login&apos;,
        component: Login,
    },
    {
        path: &apos;/user&apos;,
        component: User,
    },
    {
        path: &apos;*&apos;,
        component: NotFound
    }
]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs yaml"><code><span class="hljs-string">const</span> <span class="hljs-string">routes</span> <span class="hljs-string">=</span> <span class="hljs-string">[</span>
    <span class="hljs-string">{</span> <span class="hljs-attr">path:</span> <span class="hljs-string">&apos;/&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">        exact:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">        component:</span> <span class="hljs-string">Home,</span>
    <span class="hljs-string">},</span>
    <span class="hljs-string">{</span>
<span class="hljs-attr">        path:</span> <span class="hljs-string">&apos;/login&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">        component:</span> <span class="hljs-string">Login,</span>
    <span class="hljs-string">},</span>
    <span class="hljs-string">{</span>
<span class="hljs-attr">        path:</span> <span class="hljs-string">&apos;/user&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">        component:</span> <span class="hljs-string">User,</span>
    <span class="hljs-string">},</span>
    <span class="hljs-string">{</span>
<span class="hljs-attr">        path:</span> <span class="hljs-string">&apos;*&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">        component:</span> <span class="hljs-string">NotFound</span>
    <span class="hljs-string">}</span>
<span class="hljs-string">]</span></code></pre><p>//app.js &#x90A3;&#x4E48;&#x6211;&#x4EEC;&#x5728;app.js&#x91CC;&#x8FD9;&#x4E48;&#x4F7F;&#x7528;&#x5C31;&#x80FD;&#x5E2E;&#x6211;&#x751F;&#x6210;&#x9759;&#x6001;&#x7684;&#x8DEF;&#x7531;&#x4E86;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { renderRoutes } from &apos;react-router-config&apos;
import routes from &apos;./router.js&apos;
const App = () =&gt; (
   &lt;main&gt;
      &lt;Switch&gt;
         {renderRoutes(routes)}
      &lt;/Switch&gt;
   &lt;/main&gt;
)

export default App
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> { renderRoutes } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react-router-config&apos;</span>
<span class="hljs-keyword">import</span> routes <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./router.js&apos;</span>
<span class="hljs-keyword">const</span> App = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> (
   <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">main</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Switch</span>&gt;</span>
         {renderRoutes(routes)}
      <span class="hljs-tag">&lt;/<span class="hljs-name">Switch</span>&gt;</span>
   <span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span></span>
)

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> App
</code></pre><p>&#x626F;&#x4E86;&#x534A;&#x5929;&#xFF0C;&#x8981;&#x5982;&#x4F55;&#x5229;&#x7528;&#x8FD9;&#x4E2A;&#x63D2;&#x4EF6;&#x5E2E;&#x6211;&#x4EEC;&#x8DEF;&#x7531;&#x9274;&#x6743;&#x5462;&#xFF1F;<br>&#x7528;&#x8FC7;vue&#x7684;&#x5C0F;&#x670B;&#x53CB;&#x90FD;&#x77E5;&#x9053;&#xFF0C;vue&#x7684;router.js &#x91CC;&#x9762;&#x6DFB;&#x52A0; <code>meta: { requiresAuth: true }</code><br>&#x7136;&#x540E;&#x5229;&#x7528;<code>&#x5BFC;&#x822A;&#x5B88;&#x536B;</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.beforeEach((to, from, next) =&gt; {
  // &#x5728;&#x6BCF;&#x6B21;&#x8DEF;&#x7531;&#x8FDB;&#x5165;&#x4E4B;&#x524D;&#x5224;&#x65AD;requiresAuth&#x7684;&#x503C;&#xFF0C;&#x5982;&#x679C;&#x662F;true&#x7684;&#x8BDD;&#x5462;&#x5C31;&#x5148;&#x5224;&#x65AD;&#x662F;&#x5426;&#x5DF2;&#x767B;&#x9646;
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs moonscript"><code>router.beforeEach(<span class="hljs-function"><span class="hljs-params">(to, <span class="hljs-keyword">from</span>, <span class="hljs-built_in">next</span>)</span> =&gt;</span> {
  // &#x5728;&#x6BCF;&#x6B21;&#x8DEF;&#x7531;&#x8FDB;&#x5165;&#x4E4B;&#x524D;&#x5224;&#x65AD;requiresAuth&#x7684;&#x503C;&#xFF0C;&#x5982;&#x679C;&#x662F;<span class="hljs-literal">true</span>&#x7684;&#x8BDD;&#x5462;&#x5C31;&#x5148;&#x5224;&#x65AD;&#x662F;&#x5426;&#x5DF2;&#x767B;&#x9646;
})</code></pre><p>&#x4E8C;&#x3001;<strong>&#x57FA;&#x4E8E;&#x7C7B;&#x4F3C;vue&#x7684;&#x8DEF;&#x7531;&#x9274;&#x6743;&#x60F3;&#x6CD5;&#xFF0C;&#x6211;&#x4EEC;&#x7A0D;&#x7A0D;&#x6539;&#x9020;&#x4E00;&#x4E0B;react-router-config</strong><br>// utils/renderRoutes.js</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from &apos;react&apos;
import { Route, Redirect, Switch } from &apos;react-router-dom&apos;
const renderRoutes = (routes, authed, authPath = &apos;/login&apos;, extraProps = {}, switchProps = {}) =&gt; routes ? (
  &lt;Switch {...switchProps}&gt;
    {routes.map((route, i) =&gt; (
      &lt;Route
        key={route.key || i}
        path={route.path}
        exact={route.exact}
        strict={route.strict}
        render={(props) =&gt; {
          if (!route.requiresAuth || authed || route.path === authPath) {
            return &lt;route.component {...props} {...extraProps} route={route} /&gt;
          }
          return &lt;Redirect to="{{" pathname: authPath, state: { from: props.location } "}}" /&gt;
        "}}"
      /&gt;
    ))}
  &lt;/Switch&gt;
) : null

export default renderRoutes" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xquery"><code><span class="hljs-keyword">import</span> React from <span class="hljs-string">&apos;react&apos;</span>
<span class="hljs-keyword">import</span> { Route, Redirect, Switch } from <span class="hljs-string">&apos;react-router-dom&apos;</span>
const renderRoutes = (routes, authed, authPath = <span class="hljs-string">&apos;/login&apos;</span>, extraProps = {}, switchProps = {}) =&gt; routes ? (
  &lt;Switch {...switchProps}&gt;
    {routes.map((route, i) =&gt; (
      &lt;Route
        key={route.key || i}
        path={route.path}
        exact={route.exact}
        strict={route.strict}
        render={(props) =&gt; {
          if (!route.requiresAuth || authed || route.path === authPath) {
            return &lt;route.component {...props} {...extraProps} route={route} /&gt;
          }
          return &lt;Redirect to="{{" pathname: authPath, state: { from: props.location } "}}" /&gt;
        "}}"
      /&gt;
    ))}
  &lt;/Switch&gt;
) : null

export <span class="hljs-keyword">default</span> renderRoutes</code></pre><p>&#x4FEE;&#x6539;&#x540E;&#x7684;&#x6E90;&#x7801;&#x589E;&#x52A0;&#x4E86;&#x4E24;&#x4E2A;&#x53C2;&#x6570; authed &#x3001; authPath &#x548C;&#x4E00;&#x4E2A;&#x5C5E;&#x6027; route.requiresAuth<br>&#x7136;&#x540E;&#x518D;&#x6765;&#x770B;&#x4E00;&#x4E0B;&#x6700;&#x5173;&#x952E;&#x7684;&#x4E00;&#x6BB5;&#x4EE3;&#x7801;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (!route.requiresAuth || authed || route.path === authPath) {
    return &lt;route.component {...props} {...extraProps} route={route} /&gt;
    }
    return &lt;Redirect to="{{" pathname: authPath, state: { from: props.location } "}}" /&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xquery"><code><span class="hljs-keyword">if</span> (!route.requiresAuth || authed || route.path === authPath) {
    return &lt;route.component {...props} {...extraProps} route={route} /&gt;
    }
    <span class="hljs-keyword">return</span> &lt;Redirect <span class="hljs-keyword">to</span>="{{" pathname: authPath, state: { from: props.location } "}}" /&gt;</code></pre><p>&#x5F88;&#x7B80;&#x5355; &#x5982;&#x679C; route.requiresAuth = false &#x6216;&#x8005; authed = true &#x6216;&#x8005; route.path === authPath&#xFF08;&#x53C2;&#x6570;&#x9ED8;&#x8BA4;&#x503C;&apos;/login&apos;&#xFF09;&#x5219;&#x6E32;&#x67D3;&#x6211;&#x4EEC;&#x9875;&#x9762;&#xFF0C;&#x5426;&#x5219;&#x5C31;&#x6E32;&#x67D3;&#x6211;&#x4EEC;&#x8BBE;&#x7F6E;&#x7684;<strong>authPath</strong>&#x9875;&#x9762;&#xFF0C;&#x5E76;&#x8BB0;&#x5F55;&#x4ECE;&#x54EA;&#x4E2A;&#x9875;&#x9762;&#x8DF3;&#x8F6C;&#x3002;</p><p>&#x76F8;&#x5E94;&#x7684;router.js&#x4E5F;&#x8981;&#x7A0D;&#x5FAE;&#x4FEE;&#x6539;&#x4E00;&#x4E0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const routes = [
    { path: &apos;/&apos;,
        exact: true,
        component: Home,
        requiresAuth: false,
    },
    {
        path: &apos;/login&apos;,
        component: Login,
        requiresAuth: false,

    },
    {
        path: &apos;/user&apos;,
        component: User,
        requiresAuth: true, //&#x9700;&#x8981;&#x767B;&#x9646;&#x540E;&#x624D;&#x80FD;&#x8DF3;&#x8F6C;&#x7684;&#x9875;&#x9762;

    },
    {
        path: &apos;*&apos;,
        component: NotFound,
        requiresAuth: false,
    }
]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs yaml"><code><span class="hljs-string">const</span> <span class="hljs-string">routes</span> <span class="hljs-string">=</span> <span class="hljs-string">[</span>
    <span class="hljs-string">{</span> <span class="hljs-attr">path:</span> <span class="hljs-string">&apos;/&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">        exact:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">        component:</span> <span class="hljs-string">Home,</span>
<span class="hljs-attr">        requiresAuth:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
    <span class="hljs-string">},</span>
    <span class="hljs-string">{</span>
<span class="hljs-attr">        path:</span> <span class="hljs-string">&apos;/login&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">        component:</span> <span class="hljs-string">Login,</span>
<span class="hljs-attr">        requiresAuth:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>

    <span class="hljs-string">},</span>
    <span class="hljs-string">{</span>
<span class="hljs-attr">        path:</span> <span class="hljs-string">&apos;/user&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">        component:</span> <span class="hljs-string">User,</span>
<span class="hljs-attr">        requiresAuth:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span> <span class="hljs-string">//&#x9700;&#x8981;&#x767B;&#x9646;&#x540E;&#x624D;&#x80FD;&#x8DF3;&#x8F6C;&#x7684;&#x9875;&#x9762;</span>

    <span class="hljs-string">},</span>
    <span class="hljs-string">{</span>
<span class="hljs-attr">        path:</span> <span class="hljs-string">&apos;*&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">        component:</span> <span class="hljs-string">NotFound,</span>
<span class="hljs-attr">        requiresAuth:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
    <span class="hljs-string">}</span>
<span class="hljs-string">]</span></code></pre><p>//app.js</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from &apos;react&apos;
import { Switch } from &apos;react-router-dom&apos;
//import { renderRoutes } from &apos;react-router-config&apos;
import renderRoutes from &apos;./utils/renderRoutes&apos;
import routes from &apos;./router.js&apos;

const authed = false // &#x5982;&#x679C;&#x767B;&#x9646;&#x4E4B;&#x540E;&#x53EF;&#x4EE5;&#x5229;&#x7528;redux&#x4FEE;&#x6539;&#x8BE5;&#x503C;(&#x5173;&#x4E8E;redux&#x4E0D;&#x5728;&#x6211;&#x4EEC;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#x7684;&#x8BA8;&#x8BBA;&#x8303;&#x56F4;&#x4E4B;&#x5185;&#xFF09;
const authPath = &apos;/login&apos; // &#x9ED8;&#x8BA4;&#x672A;&#x767B;&#x5F55;&#x7684;&#x65F6;&#x5019;&#x8FD4;&#x56DE;&#x7684;&#x9875;&#x9762;&#xFF0C;&#x53EF;&#x4EE5;&#x81EA;&#x884C;&#x8BBE;&#x7F6E;

const App = () =&gt; (
   &lt;main&gt;
      &lt;Switch&gt;
         {renderRoutes(routes, authed, authPath)}
      &lt;/Switch&gt;
   &lt;/main&gt;
)
export default App" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react&apos;</span>
<span class="hljs-keyword">import</span> { Switch } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react-router-dom&apos;</span>
<span class="hljs-comment">//import { renderRoutes } from &apos;react-router-config&apos;</span>
<span class="hljs-keyword">import</span> renderRoutes <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./utils/renderRoutes&apos;</span>
<span class="hljs-keyword">import</span> routes <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./router.js&apos;</span>

<span class="hljs-keyword">const</span> authed = <span class="hljs-literal">false</span> <span class="hljs-comment">// &#x5982;&#x679C;&#x767B;&#x9646;&#x4E4B;&#x540E;&#x53EF;&#x4EE5;&#x5229;&#x7528;redux&#x4FEE;&#x6539;&#x8BE5;&#x503C;(&#x5173;&#x4E8E;redux&#x4E0D;&#x5728;&#x6211;&#x4EEC;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#x7684;&#x8BA8;&#x8BBA;&#x8303;&#x56F4;&#x4E4B;&#x5185;&#xFF09;</span>
<span class="hljs-keyword">const</span> authPath = <span class="hljs-string">&apos;/login&apos;</span> <span class="hljs-comment">// &#x9ED8;&#x8BA4;&#x672A;&#x767B;&#x5F55;&#x7684;&#x65F6;&#x5019;&#x8FD4;&#x56DE;&#x7684;&#x9875;&#x9762;&#xFF0C;&#x53EF;&#x4EE5;&#x81EA;&#x884C;&#x8BBE;&#x7F6E;</span>

<span class="hljs-keyword">const</span> App = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> (
   <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">main</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Switch</span>&gt;</span>
         {renderRoutes(routes, authed, authPath)}
      <span class="hljs-tag">&lt;/<span class="hljs-name">Switch</span>&gt;</span>
   <span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span></span>
)
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> App</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x767B;&#x9646;&#x4E4B;&#x540E;&#x8FD4;&#x56DE;&#x539F;&#x5148;&#x8981;&#x53BB;&#x7684;&#x9875;&#x9762;login&#x51FD;&#x6570;
login(){
    const { from } = this.props.location.state || { from: { pathname: &apos;/&apos; } }
     // authed = true // &#x8FD9;&#x90E8;&#x5206;&#x903B;&#x8F91;&#x81EA;&#x5DF1;&#x5199;&#x5427;&#x3002;&#x3002;&#x3002;
    this.props.history.push(from.pathname)
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs cs"><code><span class="hljs-comment">//&#x767B;&#x9646;&#x4E4B;&#x540E;&#x8FD4;&#x56DE;&#x539F;&#x5148;&#x8981;&#x53BB;&#x7684;&#x9875;&#x9762;login&#x51FD;&#x6570;</span>
login(){
    <span class="hljs-keyword">const</span> { <span class="hljs-keyword">from</span> } = <span class="hljs-keyword">this</span>.props.location.state || { <span class="hljs-keyword">from</span>: { pathname: <span class="hljs-string">&apos;/&apos;</span> } }
     <span class="hljs-comment">// authed = true // &#x8FD9;&#x90E8;&#x5206;&#x903B;&#x8F91;&#x81EA;&#x5DF1;&#x5199;&#x5427;&#x3002;&#x3002;&#x3002;</span>
    <span class="hljs-keyword">this</span>.props.history.push(<span class="hljs-keyword">from</span>.pathname)
}</code></pre><p>&#x4EE5;&#x4E0A;&#xFF5E;&#x4FEE;&#x6539;&#x4E86;&#x90E8;&#x5206;&#x6E90;&#x7801;&#x5E76;&#x5B8C;&#x6210;&#x4E86;&#x6211;&#x4EEC;&#x60F3;&#x8981;&#x7684;&#x6548;&#x679C;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
利用react-router4的react-router-config做路由鉴权

## 原文链接
[https://segmentfault.com/a/1190000015282620](https://segmentfault.com/a/1190000015282620)

