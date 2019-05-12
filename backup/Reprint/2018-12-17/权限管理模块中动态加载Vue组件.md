---
title: '权限管理模块中动态加载Vue组件' 
date: 2018-12-17 2:30:07
hidden: true
slug: u2qa5wfglb
categories: [reprint]
---

{{< raw >}}

                    
<p>当前后端分离时，权限问题的处理也和我们传统的处理方式有一点差异。笔者前几天刚好在负责一个项目的权限管理模块，现在权限管理模块已经做完了，我想通过5-6篇文章，来介绍一下项目中遇到的问题以及我的解决方案，希望这个系列能够给小伙伴一些帮助。本系列文章并不是手把手的教程，主要介绍了核心思路并讲解了核心代码，完整的代码小伙伴们可以在GitHub上star并clone下来研究。另外，原本计划把项目跑起来放到网上供小伙伴们查看，但是之前买服务器为了省钱，内存只有512M，两个应用跑不起来(已经有一个<a href="https://github.com/lenve/VBlog" rel="nofollow noreferrer" target="_blank">V部落开源项目</a>在运行)，因此小伙伴们只能将就看一下下面的截图了，GitHub上有部署教程，部署到本地也可以查看完整效果。</p>
<hr>
<p>项目地址：<a href="https://github.com/lenve/vhr" rel="nofollow noreferrer" target="_blank">https://github.com/lenve/vhr</a>  </p>
<p>前面几篇文章，我们已经基本解决了服务端的问题，并封装了前端请求，本文我们主要来聊聊登录以及组件的动态加载。  </p>
<p>本文是本系列的第五篇，建议先阅读前面的文章有助于更好的理解本文：  </p>
<p>1.<a href="http://mp.weixin.qq.com/s/lpznrVx6Bh9X7ZnunrWQSA" rel="nofollow noreferrer" target="_blank">SpringBoot+Vue前后端分离，使用SpringSecurity完美处理权限问题(一)</a>  <br>2.<a href="https://mp.weixin.qq.com/s/9Do-kQOvJGLsw9m36_LrFA" rel="nofollow noreferrer" target="_blank">SpringBoot+Vue前后端分离，使用SpringSecurity完美处理权限问题(二)</a>  <br>3.<a href="https://mp.weixin.qq.com/s/9c0j2GzCNmtdOL8EfCV_bA" rel="nofollow noreferrer" target="_blank">SpringSecurity中密码加盐与SpringBoot中异常统一处理</a>  <br>4.<a href="https://mp.weixin.qq.com/s/KabBPItayxBEv56_g9y6KQ" rel="nofollow noreferrer" target="_blank">axios请求封装和异常统一处理</a></p>
<h1 id="articleHeader0">登录状态保存</h1>
<p>当用户登录成功之后，需要将当前用户的登录信息保存在本地，方便后面使用。具体实现如下：</p>
<h2 id="articleHeader1">登录成功保存数据</h2>
<p>在登录操作执行成功之后，通过commit操作将数据提交到store中，核心代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.postRequest('/login', {
    username: this.loginForm.username,
    password: this.loginForm.password
}).then(resp=> {
    if (resp &amp;&amp; resp.status == 200) {
    var data = resp.data;
    _this.$store.commit('login', data.msg);
    var path = _this.$route.query.redirect;
    _this.$router.replace({path: path == '/' || path == undefined ? '/home' : path});
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">this</span>.postRequest(<span class="hljs-string">'/login'</span>, {
    username: <span class="hljs-keyword">this</span>.loginForm.username,
    password: <span class="hljs-keyword">this</span>.loginForm.password
}).then(resp=&gt; {
    <span class="hljs-keyword">if</span> (resp &amp;&amp; resp.status == <span class="hljs-number">200</span>) {
    <span class="hljs-keyword">var</span> <span class="hljs-keyword">data</span> = resp.<span class="hljs-keyword">data</span>;
    _this.$store.commit(<span class="hljs-string">'login'</span>, <span class="hljs-keyword">data</span>.msg);
    <span class="hljs-keyword">var</span> path = _this.$route.query.redirect;
    _this.$router.replace({path: path == <span class="hljs-string">'/'</span> || path == undefined ? <span class="hljs-string">'/home'</span> : path});
    }
});</code></pre>
<h2 id="articleHeader2">store</h2>
<p>store的核心代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default new Vuex.Store({
  state: {
    user: {
      name: window.localStorage.getItem('user' || '[]') == null ? '未登录' : JSON.parse(window.localStorage.getItem('user' || '[]')).name,
      userface: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).userface
    }
  },
  mutations: {
    login(state, user){
      state.user = user;
      window.localStorage.setItem('user', JSON.stringify(user));
    },
    logout(state){
      window.localStorage.removeItem('user');
    }
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>export <span class="hljs-keyword">default</span> new Vuex.Store({
  <span class="hljs-keyword">state</span>: {
    <span class="hljs-keyword">user</span>: {
      name: window.localStorage.getItem('<span class="hljs-keyword">user</span>' || '[]') == null ? '未登录' : JSON.parse(window.localStorage.getItem('<span class="hljs-keyword">user</span>' || '[]')).name,
      userface: window.localStorage.getItem('<span class="hljs-keyword">user</span>' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('<span class="hljs-keyword">user</span>' || '[]')).userface
    }
  },
  mutations: {
    login(<span class="hljs-keyword">state</span>, <span class="hljs-keyword">user</span>){
      <span class="hljs-keyword">state</span>.<span class="hljs-keyword">user</span> = <span class="hljs-keyword">user</span>;
      window.localStorage.<span class="hljs-built_in">set</span>Item('<span class="hljs-keyword">user</span>', JSON.stringify(<span class="hljs-keyword">user</span>));
    },
    logout(<span class="hljs-keyword">state</span>){
      window.localStorage.removeItem('<span class="hljs-keyword">user</span>');
    }
  }
});</code></pre>
<p>为了减少麻烦，用户登录成功后的数据将被保存在localStorage中（防止用户按F5刷新之后数据丢失），以字符串的形式存入，取的时候再转为json。当用户注销登陆时，将localStorage中的数据清除。</p>
<h1 id="articleHeader3">组件动态加载</h1>
<p>在权限管理模块中，这算是前端的核心了。</p>
<h2 id="articleHeader4">核心思路</h2>
<p>用户在登录成功之后，进入home主页之前，向服务端发送请求，要求获取当前的菜单信息和组件信息，服务端根据当前用户所具备的角色，以及角色所对应的资源，返回一个json字符串，格式如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[
    {
        &quot;id&quot;: 2,
        &quot;path&quot;: &quot;/home&quot;,
        &quot;component&quot;: &quot;Home&quot;,
        &quot;name&quot;: &quot;员工资料&quot;,
        &quot;iconCls&quot;: &quot;fa fa-user-circle-o&quot;,
        &quot;children&quot;: [
            {
                &quot;id&quot;: null,
                &quot;path&quot;: &quot;/emp/basic&quot;,
                &quot;component&quot;: &quot;EmpBasic&quot;,
                &quot;name&quot;: &quot;基本资料&quot;,
                &quot;iconCls&quot;: null,
                &quot;children&quot;: [],
                &quot;meta&quot;: {
                    &quot;keepAlive&quot;: false,
                    &quot;requireAuth&quot;: true
                }
            },
            {
                &quot;id&quot;: null,
                &quot;path&quot;: &quot;/emp/adv&quot;,
                &quot;component&quot;: &quot;EmpAdv&quot;,
                &quot;name&quot;: &quot;高级资料&quot;,
                &quot;iconCls&quot;: null,
                &quot;children&quot;: [],
                &quot;meta&quot;: {
                    &quot;keepAlive&quot;: false,
                    &quot;requireAuth&quot;: true
                }
            }
        ],
        &quot;meta&quot;: {
            &quot;keepAlive&quot;: false,
            &quot;requireAuth&quot;: true
        }
    }
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>[
    {
        <span class="hljs-attr">"id"</span>: <span class="hljs-number">2</span>,
        <span class="hljs-attr">"path"</span>: <span class="hljs-string">"/home"</span>,
        <span class="hljs-attr">"component"</span>: <span class="hljs-string">"Home"</span>,
        <span class="hljs-attr">"name"</span>: <span class="hljs-string">"员工资料"</span>,
        <span class="hljs-attr">"iconCls"</span>: <span class="hljs-string">"fa fa-user-circle-o"</span>,
        <span class="hljs-attr">"children"</span>: [
            {
                <span class="hljs-attr">"id"</span>: <span class="hljs-literal">null</span>,
                <span class="hljs-attr">"path"</span>: <span class="hljs-string">"/emp/basic"</span>,
                <span class="hljs-attr">"component"</span>: <span class="hljs-string">"EmpBasic"</span>,
                <span class="hljs-attr">"name"</span>: <span class="hljs-string">"基本资料"</span>,
                <span class="hljs-attr">"iconCls"</span>: <span class="hljs-literal">null</span>,
                <span class="hljs-attr">"children"</span>: [],
                <span class="hljs-attr">"meta"</span>: {
                    <span class="hljs-attr">"keepAlive"</span>: <span class="hljs-literal">false</span>,
                    <span class="hljs-attr">"requireAuth"</span>: <span class="hljs-literal">true</span>
                }
            },
            {
                <span class="hljs-attr">"id"</span>: <span class="hljs-literal">null</span>,
                <span class="hljs-attr">"path"</span>: <span class="hljs-string">"/emp/adv"</span>,
                <span class="hljs-attr">"component"</span>: <span class="hljs-string">"EmpAdv"</span>,
                <span class="hljs-attr">"name"</span>: <span class="hljs-string">"高级资料"</span>,
                <span class="hljs-attr">"iconCls"</span>: <span class="hljs-literal">null</span>,
                <span class="hljs-attr">"children"</span>: [],
                <span class="hljs-attr">"meta"</span>: {
                    <span class="hljs-attr">"keepAlive"</span>: <span class="hljs-literal">false</span>,
                    <span class="hljs-attr">"requireAuth"</span>: <span class="hljs-literal">true</span>
                }
            }
        ],
        <span class="hljs-attr">"meta"</span>: {
            <span class="hljs-attr">"keepAlive"</span>: <span class="hljs-literal">false</span>,
            <span class="hljs-attr">"requireAuth"</span>: <span class="hljs-literal">true</span>
        }
    }
]</code></pre>
<p>前端在拿到这个字符串之后，做两件事：1.将json动态添加到当前路由中;2.将数据保存到store中，然后各页面根据store中的数据来渲染菜单。  </p>
<p>核心思路并不难，下面我们来看看实现步骤。</p>
<h2 id="articleHeader5">数据请求时机</h2>
<p>这个很重要。  </p>
<p>可能会有小伙伴说这有何难，登录成功之后请求不就可以了吗？是的，登录成功之后，请求菜单资源是可以的，请求到之后，我们将之保存在store中，以便下一次使用，但是这样又会有另外一个问题，假如用户登录成功之后，点击某一个子页面，进入到子页面中，然后按了一下F5进行刷新，这个时候就GG了，因为F5刷新之后store中的数据就没了，而我们又只在登录成功的时候请求了一次菜单资源，要解决这个问题，有两种思路：1.将菜单资源不要保存到store中，而是保存到localStorage中，这样即使F5刷新之后数据还在；2.直接在每一个页面的mounted方法中，都去加载一次菜单资源。  </p>
<p>由于菜单资源是非常敏感的，因此最好不要不要将其保存到本地，故舍弃方案1，但是方案2的工作量有点大，因此我采取办法将之简化，采取的办法就是使用路由中的导航守卫。</p>
<h2 id="articleHeader6">路由导航守卫</h2>
<p>我的具体实现是这样的，首先在store中创建一个routes数组，这是一个空数组，然后开启路由全局守卫，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.beforeEach((to, from, next)=> {
    if (to.name == 'Login') {
      next();
      return;
    }
    var name = store.state.user.name;
    if (name == '未登录') {
      if (to.meta.requireAuth || to.name == null) {
        next({path: '/', query: {redirect: to.path"}}")
      } else {
        next();
      }
    } else {
      initMenu(router, store);
      next();
    }
  }
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code>router.beforeEach((<span class="hljs-keyword">to</span>, from, <span class="hljs-keyword">next</span>)=&gt; {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">to</span>.name == <span class="hljs-string">'Login'</span>) {
      <span class="hljs-keyword">next</span>()<span class="hljs-comment">;</span>
      <span class="hljs-keyword">return</span><span class="hljs-comment">;</span>
    }
    var name = store.state.user.name<span class="hljs-comment">;</span>
    <span class="hljs-keyword">if</span> (name == <span class="hljs-string">'未登录'</span>) {
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">to</span>.meta.requireAuth || <span class="hljs-keyword">to</span>.name == <span class="hljs-literal">null</span>) {
        <span class="hljs-keyword">next</span>({path: <span class="hljs-string">'/'</span>, query: {redirect: <span class="hljs-keyword">to</span>.path"}}")
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">next</span>()<span class="hljs-comment">;</span>
      }
    } <span class="hljs-keyword">else</span> {
      initMenu(router, store)<span class="hljs-comment">;</span>
      <span class="hljs-keyword">next</span>()<span class="hljs-comment">;</span>
    }
  }
)</code></pre>
<p>这里的代码很短，我来做一个简单的解释：  <br>1.如果要去的页面是登录页面，这个没啥好说的，直接过。  </p>
<p>2.如果不是登录页面的话，我先从store中获取当前的登录状态，如果未登录，则通过路由中meta属性的requireAuth属性判断要去的页面是否需要登录，如果需要登录，则跳回登录页面，同时将要去的页面的path作为参数传给登录页面，以便在登录成功之后跳转到目标页面，如果不需要登录，则直接过（事实上，本项目中只有Login页面不需要登录）；如果已经登录了，则先初始化菜单，再跳转。  </p>
<p>初始化菜单的操作如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const initMenu = (router, store)=> {
  if (store.state.routes.length > 0) {
    return;
  }
  getRequest(&quot;/config/sysmenu&quot;).then(resp=> {
    if (resp &amp;&amp; resp.status == 200) {
      var fmtRoutes = formatRoutes(resp.data);
      router.addRoutes(fmtRoutes);
      store.commit('initMenu', fmtRoutes);
    }
  })
}
export const formatRoutes = (routes)=> {
  let fmRoutes = [];
  routes.forEach(router=> {
    let {
      path,
      component,
      name,
      meta,
      iconCls,
      children
    } = router;
    if (children &amp;&amp; children instanceof Array) {
      children = formatRoutes(children);
    }
    let fmRouter = {
      path: path,
      component(resolve){
        if (component.startsWith(&quot;Home&quot;)) {
          require(['../components/' + component + '.vue'], resolve)
        } else if (component.startsWith(&quot;Emp&quot;)) {
          require(['../components/emp/' + component + '.vue'], resolve)
        } else if (component.startsWith(&quot;Per&quot;)) {
          require(['../components/personnel/' + component + '.vue'], resolve)
        } else if (component.startsWith(&quot;Sal&quot;)) {
          require(['../components/salary/' + component + '.vue'], resolve)
        } else if (component.startsWith(&quot;Sta&quot;)) {
          require(['../components/statistics/' + component + '.vue'], resolve)
        } else if (component.startsWith(&quot;Sys&quot;)) {
          require(['../components/system/' + component + '.vue'], resolve)
        }
      },
      name: name,
      iconCls: iconCls,
      meta: meta,
      children: children
    };
    fmRoutes.push(fmRouter);
  })
  return fmRoutes;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> initMenu = <span class="hljs-function">(<span class="hljs-params">router, store</span>)=&gt;</span> {
  <span class="hljs-keyword">if</span> (store.state.routes.length &gt; <span class="hljs-number">0</span>) {
    <span class="hljs-keyword">return</span>;
  }
  getRequest(<span class="hljs-string">"/config/sysmenu"</span>).then(<span class="hljs-function"><span class="hljs-params">resp</span>=&gt;</span> {
    <span class="hljs-keyword">if</span> (resp &amp;&amp; resp.status == <span class="hljs-number">200</span>) {
      <span class="hljs-keyword">var</span> fmtRoutes = formatRoutes(resp.data);
      router.addRoutes(fmtRoutes);
      store.commit(<span class="hljs-string">'initMenu'</span>, fmtRoutes);
    }
  })
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> formatRoutes = <span class="hljs-function">(<span class="hljs-params">routes</span>)=&gt;</span> {
  <span class="hljs-keyword">let</span> fmRoutes = [];
  routes.forEach(<span class="hljs-function"><span class="hljs-params">router</span>=&gt;</span> {
    <span class="hljs-keyword">let</span> {
      path,
      component,
      name,
      meta,
      iconCls,
      children
    } = router;
    <span class="hljs-keyword">if</span> (children &amp;&amp; children <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Array</span>) {
      children = formatRoutes(children);
    }
    <span class="hljs-keyword">let</span> fmRouter = {
      <span class="hljs-attr">path</span>: path,
      component(resolve){
        <span class="hljs-keyword">if</span> (component.startsWith(<span class="hljs-string">"Home"</span>)) {
          <span class="hljs-built_in">require</span>([<span class="hljs-string">'../components/'</span> + component + <span class="hljs-string">'.vue'</span>], resolve)
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (component.startsWith(<span class="hljs-string">"Emp"</span>)) {
          <span class="hljs-built_in">require</span>([<span class="hljs-string">'../components/emp/'</span> + component + <span class="hljs-string">'.vue'</span>], resolve)
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (component.startsWith(<span class="hljs-string">"Per"</span>)) {
          <span class="hljs-built_in">require</span>([<span class="hljs-string">'../components/personnel/'</span> + component + <span class="hljs-string">'.vue'</span>], resolve)
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (component.startsWith(<span class="hljs-string">"Sal"</span>)) {
          <span class="hljs-built_in">require</span>([<span class="hljs-string">'../components/salary/'</span> + component + <span class="hljs-string">'.vue'</span>], resolve)
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (component.startsWith(<span class="hljs-string">"Sta"</span>)) {
          <span class="hljs-built_in">require</span>([<span class="hljs-string">'../components/statistics/'</span> + component + <span class="hljs-string">'.vue'</span>], resolve)
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (component.startsWith(<span class="hljs-string">"Sys"</span>)) {
          <span class="hljs-built_in">require</span>([<span class="hljs-string">'../components/system/'</span> + component + <span class="hljs-string">'.vue'</span>], resolve)
        }
      },
      <span class="hljs-attr">name</span>: name,
      <span class="hljs-attr">iconCls</span>: iconCls,
      <span class="hljs-attr">meta</span>: meta,
      <span class="hljs-attr">children</span>: children
    };
    fmRoutes.push(fmRouter);
  })
  <span class="hljs-keyword">return</span> fmRoutes;
}</code></pre>
<p>在初始化菜单中，首先判断store中的数据是否存在，如果存在，说明这次跳转是正常的跳转，而不是用户按F5或者直接在地址栏输入某个地址进入的。否则就去加载菜单。拿到菜单之后，首先通过formatRoutes方法将服务器返回的json转为router需要的格式，这里主要是转component，因为服务端返回的component是一个字符串，而router中需要的却是一个组件，因此我们在formatRoutes方法中动态的加载需要的组件即可。数据格式准备成功之后，一方面将数据存到store中，另一方面利用路由中的addRoutes方法将之动态添加到路由中。</p>
<h2 id="articleHeader7">菜单渲染</h2>
<p>最后，在Home页中，从store中获取菜单json，渲染成菜单即可，相关代码可以在<code>Home.vue</code>中查看，不赘述。  </p>
<p>OK，如此之后，不同用户登录成功之后就可以看到不同的菜单了。  </p>
<p>关注公众号，可以及时接收到最新文章:  </p>
<p><span class="img-wrap"><img data-src="/img/bVUERD?w=258&amp;h=258" src="https://static.alili.tech/img/bVUERD?w=258&amp;h=258" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
权限管理模块中动态加载Vue组件

## 原文链接
[https://segmentfault.com/a/1190000012846468](https://segmentfault.com/a/1190000012846468)

