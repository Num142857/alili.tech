---
title: 'vue.js前后端分离后台，该如何根据用户权限处理前端显示和后台接口访问' 
date: 2018-12-09 2:30:08
hidden: true
slug: bm0bsj31bma
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">索引</h2>
<ul>
<li><a href="#">概述</a></li>
<li><a href="#vue.js">vue.js动态路由</a></li>
<li><a href="#">模块切换</a></li>
<li><a href="#">处理浏览器刷新</a></li>
<li><a href="#">有选择的生成菜单</a></li>
<li><a href="#">项目完成进度</a></li>
</ul>
<h2 id="articleHeader1">概述</h2>
<p>传统的后台系统，直接根据用户的权限，于服务器端生成不同的html画面，呈现给用户。前后端分离项目中，画面大多数情况下于用户浏览器完成渲染，即用户在登录前，客户端即获取了完整的可用于用户操作的画面代码。<br>这时，如果想根据用户的权限来处理菜单或画面元素的呈现，有两种方式来处理：</p>
<ul>
<li>在用户登录后，使用自定义指令，把用户无权处理的菜单或项目从画面上remove掉</li>
<li>根据权限动态处理路由和菜单，并结合自定义指令，处理画面元素的呈现</li>
</ul>
<p>下面结合vue.js的动态路由，来说明一下如何来管理权限及菜单甚至接口。其中代码开源至（未完）<a href="https://github.com/ccfish86/jvue-admin" rel="nofollow noreferrer" target="_blank">jvue-admin</a></p>
<p>下图为实现效果：</p>
<ul>
<li>不同的业务模块，菜单不一样，避免单个模块菜单过长，另外授权时，根据模块处理权限更方便</li>
<li>画面用element-ui</li>
<li>使用了vuet代替vuex做数据的持久化</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bV6o2k?w=1329&amp;h=678" src="https://static.alili.tech/img/bV6o2k?w=1329&amp;h=678" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader2">vue.js动态路由</h2>
<p>vue.js路由需要的几个属性：path,name,component,children,meta。动态路由需要服务器端提供这些数据，所以需要在用户登录成功后，由接口返回类似的数据。如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[{
  &quot;id&quot;: 30,
  &quot;component&quot;: &quot;common-main&quot;,
  &quot;enabled&quot;: 1,
  &quot;iconClass&quot;: null,
  &quot;moduleId&quot;: 2,
  &quot;name&quot;: &quot;用户LAYOUT&quot;,
  &quot;path&quot;: &quot;/user&quot;,
  &quot;type&quot;: 1,
  &quot;showNav&quot;: 1,
  &quot;parentId&quot;: null,
  &quot;children&quot;: [
    {
      &quot;id&quot;: 32,
      &quot;component&quot;: &quot;user-index&quot;,
      &quot;enabled&quot;: 1,
      &quot;iconClass&quot;: null,
      &quot;moduleId&quot;: 2,
      &quot;name&quot;: &quot;用户列表&quot;,
      &quot;path&quot;: &quot;/user/list&quot;,
      &quot;type&quot;: 1,
      &quot;showNav&quot;: 1,
      &quot;parentId&quot;: 30,
      &quot;children&quot;: []
    }
  ]
},
{
  &quot;id&quot;: 42,
  &quot;component&quot;: &quot;common-main&quot;,
  &quot;enabled&quot;: 1,
  &quot;iconClass&quot;: null,
  &quot;moduleId&quot;: 10,
  &quot;name&quot;: &quot;测试L&quot;,
  &quot;path&quot;: &quot;/test&quot;,
  &quot;type&quot;: 2,
  &quot;showNav&quot;: 1,
  &quot;parentId&quot;: null,
  &quot;children&quot;: [
    {
      &quot;id&quot;: 43,
      &quot;component&quot;: &quot;test-ll&quot;,
      &quot;enabled&quot;: 1,
      &quot;iconClass&quot;: null,
      &quot;moduleId&quot;: 10,
      &quot;name&quot;: &quot;测试LL&quot;,
      &quot;path&quot;: &quot;/test/ll&quot;,
      &quot;type&quot;: 1,
      &quot;showNav&quot;: 1,
      &quot;parentId&quot;: 42,
      &quot;children&quot;: []
    }
  ]
}]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">[{
  <span class="hljs-attr">"id"</span>: <span class="hljs-number">30</span>,
  <span class="hljs-attr">"component"</span>: <span class="hljs-string">"common-main"</span>,
  <span class="hljs-attr">"enabled"</span>: <span class="hljs-number">1</span>,
  <span class="hljs-attr">"iconClass"</span>: <span class="hljs-literal">null</span>,
  <span class="hljs-attr">"moduleId"</span>: <span class="hljs-number">2</span>,
  <span class="hljs-attr">"name"</span>: <span class="hljs-string">"用户LAYOUT"</span>,
  <span class="hljs-attr">"path"</span>: <span class="hljs-string">"/user"</span>,
  <span class="hljs-attr">"type"</span>: <span class="hljs-number">1</span>,
  <span class="hljs-attr">"showNav"</span>: <span class="hljs-number">1</span>,
  <span class="hljs-attr">"parentId"</span>: <span class="hljs-literal">null</span>,
  <span class="hljs-attr">"children"</span>: [
    {
      <span class="hljs-attr">"id"</span>: <span class="hljs-number">32</span>,
      <span class="hljs-attr">"component"</span>: <span class="hljs-string">"user-index"</span>,
      <span class="hljs-attr">"enabled"</span>: <span class="hljs-number">1</span>,
      <span class="hljs-attr">"iconClass"</span>: <span class="hljs-literal">null</span>,
      <span class="hljs-attr">"moduleId"</span>: <span class="hljs-number">2</span>,
      <span class="hljs-attr">"name"</span>: <span class="hljs-string">"用户列表"</span>,
      <span class="hljs-attr">"path"</span>: <span class="hljs-string">"/user/list"</span>,
      <span class="hljs-attr">"type"</span>: <span class="hljs-number">1</span>,
      <span class="hljs-attr">"showNav"</span>: <span class="hljs-number">1</span>,
      <span class="hljs-attr">"parentId"</span>: <span class="hljs-number">30</span>,
      <span class="hljs-attr">"children"</span>: []
    }
  ]
},
{
  <span class="hljs-attr">"id"</span>: <span class="hljs-number">42</span>,
  <span class="hljs-attr">"component"</span>: <span class="hljs-string">"common-main"</span>,
  <span class="hljs-attr">"enabled"</span>: <span class="hljs-number">1</span>,
  <span class="hljs-attr">"iconClass"</span>: <span class="hljs-literal">null</span>,
  <span class="hljs-attr">"moduleId"</span>: <span class="hljs-number">10</span>,
  <span class="hljs-attr">"name"</span>: <span class="hljs-string">"测试L"</span>,
  <span class="hljs-attr">"path"</span>: <span class="hljs-string">"/test"</span>,
  <span class="hljs-attr">"type"</span>: <span class="hljs-number">2</span>,
  <span class="hljs-attr">"showNav"</span>: <span class="hljs-number">1</span>,
  <span class="hljs-attr">"parentId"</span>: <span class="hljs-literal">null</span>,
  <span class="hljs-attr">"children"</span>: [
    {
      <span class="hljs-attr">"id"</span>: <span class="hljs-number">43</span>,
      <span class="hljs-attr">"component"</span>: <span class="hljs-string">"test-ll"</span>,
      <span class="hljs-attr">"enabled"</span>: <span class="hljs-number">1</span>,
      <span class="hljs-attr">"iconClass"</span>: <span class="hljs-literal">null</span>,
      <span class="hljs-attr">"moduleId"</span>: <span class="hljs-number">10</span>,
      <span class="hljs-attr">"name"</span>: <span class="hljs-string">"测试LL"</span>,
      <span class="hljs-attr">"path"</span>: <span class="hljs-string">"/test/ll"</span>,
      <span class="hljs-attr">"type"</span>: <span class="hljs-number">1</span>,
      <span class="hljs-attr">"showNav"</span>: <span class="hljs-number">1</span>,
      <span class="hljs-attr">"parentId"</span>: <span class="hljs-number">42</span>,
      <span class="hljs-attr">"children"</span>: []
    }
  ]
}]
</code></pre>
<p>然后在用户登录后：<br>转换为vue.js可识别的路由对象后追加后vue路由<code>$router.addRoutes(userRouters)</code><br>处理上述menu数据至vue.js路由的方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="toRoutes (menus) {
    let userRouters = []
    menus.forEach(menu => {
      let {
        id,
        moduleId,
        path,
        component,
        name,
        meta = {},
        iconCls,
        children,
        showNav
      } = menu
      if (children &amp;&amp; children instanceof Array) {
        children = utils.toRoutes(children)
      }
      meta.moduleId = moduleId
      meta.id = id
      meta.name = name
      meta.showNav = showNav

      let userRouter = {
        path: path,
        component (resolve) {
          let vfile = component.replace(/(-)/g, (v) => '/')
          require(['@/pages/' + vfile + '.vue'], resolve)
        },
        name: name,
        iconCls: iconCls,
        meta: meta,
        children: children
      }
      userRouters.push(userRouter)
    })
    return userRouters
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code>toRoutes (menus) {
    <span class="hljs-keyword">let</span> userRouters = []
    menus.forEach(<span class="hljs-function"><span class="hljs-params">menu</span> =&gt;</span> {
      <span class="hljs-keyword">let</span> {
        id,
        moduleId,
        path,
        component,
        name,
        meta = {},
        iconCls,
        children,
        showNav
      } = menu
      <span class="hljs-keyword">if</span> (children &amp;&amp; children <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Array</span>) {
        children = utils.toRoutes(children)
      }
      meta.moduleId = moduleId
      meta.id = id
      meta.name = name
      meta.showNav = showNav

      <span class="hljs-keyword">let</span> userRouter = {
        path: path,
        component (resolve) {
          <span class="hljs-keyword">let</span> vfile = component.replace(<span class="hljs-regexp">/(-)/g</span>, <span class="hljs-function">(<span class="hljs-params">v</span>) =&gt;</span> <span class="hljs-string">'/'</span>)
          <span class="hljs-built_in">require</span>([<span class="hljs-string">'@/pages/'</span> + vfile + <span class="hljs-string">'.vue'</span>], resolve)
        },
        name: name,
        iconCls: iconCls,
        meta: meta,
        children: children
      }
      userRouters.push(userRouter)
    })
    <span class="hljs-keyword">return</span> userRouters
  }</code></pre>
<p>需要注意的是，每个父画面对应的vue文件，需要&lt;router-view&gt;&lt;/router-view&gt;来渲染子画面，这个在做画面管理时，可以做相应的标识。</p>
<h2 id="articleHeader3">模块切换</h2>
<p>模块列表放置于顶部导航，在点击模块名时，调用changeModule处理。同样，在处理页面切换时，在全局路由钩子，也需要判断跳转前后的moduleId是否一致，以使跨模块的页面跳转后，对应的导航能正常处理。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 详见/src/vuet/modules/user.js
async changeModule (moduleId = 0) {
if (this.moduleId !== moduleId) {
  this.moduleId = moduleId
  this.leftRoutes = []
  this.openeds = []
  // 只需要处理第一层，第二层
  this.routers.forEach(router => {
    if (router.meta &amp;&amp; router.meta.moduleId === moduleId &amp;&amp; router.meta.showNav === 1) {
      // console.info(`router.meta.showNav = ${router.meta.showNav}`)
      let nrouter = Object.assign(router)
      if (nrouter.children) {
        this.openeds.push(router.path)
        nrouter.children = nrouter.children.filter((r) => r.meta &amp;&amp; r.meta.showNav === 1)
      }
      this.leftRoutes.push(nrouter)
    } else {
      return
    }
  })
  //  FIXME 处理模块后，需要切换到对应的页面
}
},
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 详见/src/vuet/modules/user.js</span>
<span class="hljs-keyword">async</span> changeModule (moduleId = <span class="hljs-number">0</span>) {
<span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.moduleId !== moduleId) {
  <span class="hljs-keyword">this</span>.moduleId = moduleId
  <span class="hljs-keyword">this</span>.leftRoutes = []
  <span class="hljs-keyword">this</span>.openeds = []
  <span class="hljs-comment">// 只需要处理第一层，第二层</span>
  <span class="hljs-keyword">this</span>.routers.forEach(<span class="hljs-function"><span class="hljs-params">router</span> =&gt;</span> {
    <span class="hljs-keyword">if</span> (router.meta &amp;&amp; router.meta.moduleId === moduleId &amp;&amp; router.meta.showNav === <span class="hljs-number">1</span>) {
      <span class="hljs-comment">// console.info(`router.meta.showNav = ${router.meta.showNav}`)</span>
      <span class="hljs-keyword">let</span> nrouter = <span class="hljs-built_in">Object</span>.assign(router)
      <span class="hljs-keyword">if</span> (nrouter.children) {
        <span class="hljs-keyword">this</span>.openeds.push(router.path)
        nrouter.children = nrouter.children.filter(<span class="hljs-function">(<span class="hljs-params">r</span>) =&gt;</span> r.meta &amp;&amp; r.meta.showNav === <span class="hljs-number">1</span>)
      }
      <span class="hljs-keyword">this</span>.leftRoutes.push(nrouter)
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">return</span>
    }
  })
  <span class="hljs-comment">//  FIXME 处理模块后，需要切换到对应的页面</span>
}
},
</code></pre>
<h2 id="articleHeader4">处理浏览器刷新</h2>
<p>vuet支持store模式的规则，来持久化用户登录数据及前端的路由和菜单数据，这里保存到<code>vuet#user-self</code>，暂时部分细节尚待处理（如：直接URL访问或刷新时登录超时的验证，敏感数据如密码等加密(或不保存)处理）。<br>用户刷新浏览器后，依赖vuet依然可以得到之前保存过的menus和路由等信息，但动态路由需要重新生成并调用<code>$router.addRoutes(userRouters)</code>追加至vue，这一部分处理，详见/src/vuet/modules/user.js</p>
<p>在刷新时，会执行到router.onReady，从本地的localstorage里取路由元(后台返回的用于创建路由的数据)数据，生成动态路由。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// /src/router/index.js
router.onReady(() => {
  // 处理刷新后，router重加载
  let userSelf = vuet.getModule('user-self')
  if (userSelf &amp;&amp; userSelf.user) {
    userSelf.reloadRouters()
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// /src/router/index.js</span>
router.onReady(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-comment">// 处理刷新后，router重加载</span>
  <span class="hljs-keyword">let</span> userSelf = vuet.getModule(<span class="hljs-string">'user-self'</span>)
  <span class="hljs-keyword">if</span> (userSelf &amp;&amp; userSelf.user) {
    userSelf.reloadRouters()
  }
})</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// /src/vuet/modules/user.js
  reloadRouters () {
    if (this.menus &amp;&amp; this.menus.length > 0) {
      let userRoutes = utils.toRoutes(this.menus)
      // 追加404
      userRoutes.push({
        path: '*',
        meta: {auth: false},
        hidden: true,
        redirect: {path: '/error/404'}
      })
      this.app.$router.addRoutes(userRoutes)
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// /src/vuet/modules/user.js</span>
  reloadRouters () {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.menus &amp;&amp; <span class="hljs-keyword">this</span>.menus.length &gt; <span class="hljs-number">0</span>) {
      <span class="hljs-keyword">let</span> userRoutes = utils.toRoutes(<span class="hljs-keyword">this</span>.menus)
      <span class="hljs-comment">// 追加404</span>
      userRoutes.push({
        <span class="hljs-attr">path</span>: <span class="hljs-string">'*'</span>,
        <span class="hljs-attr">meta</span>: {<span class="hljs-attr">auth</span>: <span class="hljs-literal">false</span>},
        <span class="hljs-attr">hidden</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">redirect</span>: {<span class="hljs-attr">path</span>: <span class="hljs-string">'/error/404'</span>}
      })
      <span class="hljs-keyword">this</span>.app.$router.addRoutes(userRoutes)
    }
  }</code></pre>
<h2 id="articleHeader5">有选择的生成菜单</h2>
<p>因为一些编译或详情画面，需要根据用户点击来获取ID参数，如果直接放到菜单里也无法使用，这里在后台的API里，通过返回showNav来区分，即动态生成vue.js路由，但不生成菜单。暂时在模块下，支持两层菜单，如果更多的话，稍加修改即可支持。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<el-menu :default-active=&quot;String(userSelf.active)&quot; router theme=&quot;dark&quot; @open=&quot;handleOpen&quot; @close=&quot;handleClose&quot; :default-openeds=&quot;userSelf.openeds&quot;>
  <template v-for=&quot;router in userSelf.leftRoutes&quot;>
    <el-submenu :index=&quot;router.path&quot; :key=&quot;router.path&quot;
                v-if=&quot;router.children &amp;&amp; router.children instanceof Array &amp;&amp; router.children.length > 0&quot;>
      <template slot=&quot;title&quot;>"{{"router.name"}}"</template>
      <el-menu-item v-for=&quot;child in router.children&quot; :key=&quot;child.name&quot; :index=&quot;child.path&quot;>"{{"child.meta.name"}}"
      </el-menu-item>
    </el-submenu>
    <el-menu-item :index=&quot;router.path&quot; :key=&quot;router.path&quot; v-else>"{{"router.meta.name"}}"</el-menu-item>
  </template>
</el-menu>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">el-menu</span> <span class="hljs-attr">:default-active</span>=<span class="hljs-string">"String(userSelf.active)"</span> <span class="hljs-attr">router</span> <span class="hljs-attr">theme</span>=<span class="hljs-string">"dark"</span> @<span class="hljs-attr">open</span>=<span class="hljs-string">"handleOpen"</span> @<span class="hljs-attr">close</span>=<span class="hljs-string">"handleClose"</span> <span class="hljs-attr">:default-openeds</span>=<span class="hljs-string">"userSelf.openeds"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"router in userSelf.leftRoutes"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">el-submenu</span> <span class="hljs-attr">:index</span>=<span class="hljs-string">"router.path"</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">"router.path"</span>
                <span class="hljs-attr">v-if</span>=<span class="hljs-string">"router.children &amp;&amp; router.children instanceof Array &amp;&amp; router.children.length &gt; 0"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"title"</span>&gt;</span>"{{"router.name"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">el-menu-item</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"child in router.children"</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">"child.name"</span> <span class="hljs-attr">:index</span>=<span class="hljs-string">"child.path"</span>&gt;</span>"{{"child.meta.name"}}"
      <span class="hljs-tag">&lt;/<span class="hljs-name">el-menu-item</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">el-submenu</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">el-menu-item</span> <span class="hljs-attr">:index</span>=<span class="hljs-string">"router.path"</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">"router.path"</span> <span class="hljs-attr">v-else</span>&gt;</span>"{{"router.meta.name"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">el-menu-item</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">el-menu</span>&gt;</span></code></pre>
<h2 id="articleHeader6">项目完成进度</h2>
<p>上述只是简单描述了前端的部分处理，另外配合前端后台API也开发了部分接口。后台使用的是Spring boot基本上配置下数据库就可以执行起来，有时间的话，另起一篇再说。</p>
<p>模块和菜单的前后端管理基本上是完成了，API的描述信息后台已有相应的机制自动收集。后续陆续追加角色，和角色与API和画面的管理(授权)，及后端API的权限拦截。</p>
<p>更多其他功能，如后台的权限发生变更，即时影响客户端菜单或画面重新渲染的处理可能需要下一个版本引入websocket后来实现。另外后端会使用hazelcast，以角色为单位把API/菜单权限缓存至内存中，避免每个用户加载相同的角色数据，占用比较多的内存资源和DB-IO，也解决方便授权相关数据更新后的前端响应问题。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue.js前后端分离后台，该如何根据用户权限处理前端显示和后台接口访问

## 原文链接
[https://segmentfault.com/a/1190000013883117](https://segmentfault.com/a/1190000013883117)

