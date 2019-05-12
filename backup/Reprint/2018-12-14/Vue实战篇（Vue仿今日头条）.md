---
title: 'Vue实战篇（Vue仿今日头条）' 
date: 2018-12-14 2:30:11
hidden: true
slug: ph2pik1ynrh
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>vue也弄了一段时间了, 前段时间一直想用vue写个移动端,加之年底也不是很忙,于是前几天便着手开始弄了,到今天为止也算是勉强能看了</p>
<p>因为也是纯粹的写写前端页面,所以数据方面用的是mock.js,为了真实的模拟请求,可以直接在 <em><a href="https://easy-mock.com/" rel="nofollow noreferrer" target="_blank">Easy Mock</a></em> 自己生成API<br>也可直接登陆我这项目的Easy Mock账号密码：</p>
<p>账号: vue-toutiao<br>  密码： 123456</p>
<p><strong>如果你想修改接口，请copy一份在修改</strong></p>
<p>如果你想后台接口也自己开发的话。可以阅读我这篇博客 <em><a href="https://segmentfault.com/a/1190000013025450?_ea=3265181">Vue + Node + Mongodb 开发一个完整博客流程</a></em></p>
<h2 id="articleHeader1">技术栈：</h2>
<p><code>vue</code> + <code>webpack</code> + <code>vuex</code> + <code>axios</code></p>
<h2 id="articleHeader2">结构：</h2>
<ul>
<li>build: webpack配置</li>
<li>config: 项目配置参数</li>
<li>src<br><code>assets</code>: 静态资源文件，存放图片啥的<br><code>components</code>: <a href="https://github.com/cd-dongzi/vue-components" rel="nofollow noreferrer" target="_blank">常用组件封装</a><br><code>directive</code>: <a href="https://github.com/cd-dongzi/vue-directive" rel="nofollow noreferrer" target="_blank">常用指令封装</a><br><code>router</code>: 路由表<br><code>store</code>: 状态管理 vuex<br><code>styles</code>: 样式文件<br><code>utils</code>: <a href="https://github.com/cd-dongzi/utils" rel="nofollow noreferrer" target="_blank">常用工具类封装</a><br><code>views</code>: 视图页面</li>
<li>static: 静态文件： 存放 favicon.ico 等等</li>
</ul>
<p><strong>此项目用到了 DllPlugin 进行打包处理，所有启动该项目时记得，先执行一次该脚本命令生成配置</strong></p>
<h2 id="articleHeader3">效果演示：</h2>
<p><span class="img-wrap"><img data-src="/img/bV3l3r?w=240&amp;h=419" src="https://static.alili.tech/img/bV3l3r?w=240&amp;h=419" alt="8ace816fe5b8a.gif" title="8ace816fe5b8a.gif" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/bV3l3w?w=233&amp;h=420" src="https://static.alili.tech/img/bV3l3w?w=233&amp;h=420" alt="92a250f8bd122.gif" title="92a250f8bd122.gif" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000013228746" src="https://static.alili.tech/img/remote/1460000013228746" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000013228747" src="https://static.alili.tech/img/remote/1460000013228747" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/bV3l3G?w=240&amp;h=420" src="https://static.alili.tech/img/bV3l3G?w=240&amp;h=420" alt="8b6d9277a429a.gif" title="8b6d9277a429a.gif" style="cursor: pointer;"></span></p>
<h2 id="articleHeader4">几个常用的知识点</h2>
<h3 id="articleHeader5">1. 路由懒加载</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    path: '/development',
    name: 'development',
    component: (resolve) => {
        require(['../views/development.vue'], resolve)
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>{
    <span class="hljs-attribute">path</span>: <span class="hljs-string">'/development'</span>,
    name: <span class="hljs-string">'development'</span>,
    component: (resolve) =&gt; {
        <span class="hljs-built_in">require</span>([<span class="hljs-string">'../views/development.vue'</span>], resolve)
    }
}</code></pre>
<p><strong>或</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
const _import_ = file => () => import('views/' + file + '.vue')

{
    path: '/development',
    name: 'development',
    component: _import_('development')
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code>
<span class="hljs-keyword">const</span> _import_ = file =&gt; () =&gt; <span class="hljs-keyword">import</span>(<span class="hljs-string">'views/'</span> + file + <span class="hljs-string">'.vue'</span>)

{
    path: <span class="hljs-string">'/development'</span>,
    name: <span class="hljs-string">'development'</span>,
    component: _import_(<span class="hljs-string">'development'</span>)
}</code></pre>
<h3 id="articleHeader6">2. 登陆拦截</h3>
<p>通过路由的 beforeEach 钩子函数来判断是否需要登陆</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 如：系统设置需要登陆
{ 
    path: '/system', 
    name: '系统设置', 
    meta: { 
        login: true
    },
    component: _import_('System/index')
}

router.beforeEach((to, from, next) => {
    if (to.meta.login) { //判断前往的界面是否需要登陆
        if (store.state.user.user.name) { // 是否已经登陆
            next()
        }else{
            Vue.prototype.$alert('请先登录!')
                .then( () => {
                    store.state.user.isLogin = true
                })
        }
    }else{
        if (to.meta.page) store.state.app.pageLoading = true
        next() 
    }
    
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">// 如：系统设置需要登陆</span>
{ 
    path: <span class="hljs-string">'/system'</span>, 
    name: <span class="hljs-string">'系统设置'</span>, 
    meta: { 
        login: true
    },
    component: _import_(<span class="hljs-string">'System/index'</span>)
}

router.beforeEach((to, from, next) =&gt; {
    <span class="hljs-keyword">if</span> (to<span class="hljs-selector-class">.meta</span><span class="hljs-selector-class">.login</span>) { <span class="hljs-comment">//判断前往的界面是否需要登陆</span>
        <span class="hljs-keyword">if</span> (store<span class="hljs-selector-class">.state</span><span class="hljs-selector-class">.user</span><span class="hljs-selector-class">.user</span><span class="hljs-selector-class">.name</span>) { <span class="hljs-comment">// 是否已经登陆</span>
            next()
        }<span class="hljs-keyword">else</span>{
            Vue<span class="hljs-selector-class">.prototype</span>.<span class="hljs-variable">$alert</span>(<span class="hljs-string">'请先登录!'</span>)
                .then( () =&gt; {
                    store<span class="hljs-selector-class">.state</span><span class="hljs-selector-class">.user</span><span class="hljs-selector-class">.isLogin</span> = true
                })
        }
    }<span class="hljs-keyword">else</span>{
        <span class="hljs-keyword">if</span> (to<span class="hljs-selector-class">.meta</span><span class="hljs-selector-class">.page</span>) store<span class="hljs-selector-class">.state</span><span class="hljs-selector-class">.app</span><span class="hljs-selector-class">.pageLoading</span> = true
        next() 
    }
    
})</code></pre>
<h3 id="articleHeader7">3. 动画切换</h3>
<p>通过检测设置在 Router上的animate属性 来判断它做什么样的切换动画</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Router.prototype.animate = 0

// 获取每个路由meta上面的slide 来判断它做什么动画
{ 
    path: '/system', 
    name: '系统设置', 
    meta: { 
        slide: 1 
    },
    component: _import_('System/index')
}


watch: {
    $route (to, from) {
        /*
        0: 不做动画
        1: 左切换
        2: 右切换
        3: 上切换
        4: 下切换
        ...
         */
        let animate = this.$router.animate || to.meta.slide
        if (!animate) {
            this.animate = '' 
        }else{
            this.animate = animate === 1 ?  'slide-left' :
                animate === 2 ?  'slide-right' :
                animate === 3 ?  'slide-top' :
                animate === 4 ?  'slide-bottom' : ''
        }
        this.$router.animate = 0
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code>Router.prototype.<span class="hljs-built_in">animate</span> = <span class="hljs-number">0</span>

<span class="hljs-comment">// 获取每个路由meta上面的slide 来判断它做什么动画</span>
{ 
    path: <span class="hljs-string">'/system'</span>, 
    <span class="hljs-built_in">name</span>: <span class="hljs-string">'系统设置'</span>, 
    meta: { 
        slide: <span class="hljs-number">1</span> 
    },
    component: <span class="hljs-variable">_import_</span>(<span class="hljs-string">'System/index'</span>)
}


watch: {
    $route (<span class="hljs-keyword">to</span>, <span class="hljs-keyword">from</span>) {
        <span class="hljs-comment">/*
        0: 不做动画
        1: 左切换
        2: 右切换
        3: 上切换
        4: 下切换
        ...
         */</span>
        let <span class="hljs-built_in">animate</span> = this.$router.<span class="hljs-built_in">animate</span> || <span class="hljs-keyword">to</span>.meta.slide
        <span class="hljs-keyword">if</span> (!<span class="hljs-built_in">animate</span>) {
            this.<span class="hljs-built_in">animate</span> = <span class="hljs-string">''</span> 
        }<span class="hljs-keyword">else</span>{
            this.<span class="hljs-built_in">animate</span> = <span class="hljs-built_in">animate</span> === <span class="hljs-number">1</span> ?  <span class="hljs-string">'slide-left'</span> :
                <span class="hljs-built_in">animate</span> === <span class="hljs-number">2</span> ?  <span class="hljs-string">'slide-right'</span> :
                <span class="hljs-built_in">animate</span> === <span class="hljs-number">3</span> ?  <span class="hljs-string">'slide-top'</span> :
                <span class="hljs-built_in">animate</span> === <span class="hljs-number">4</span> ?  <span class="hljs-string">'slide-bottom'</span> : <span class="hljs-string">''</span>
        }
        this.$router.<span class="hljs-built_in">animate</span> = <span class="hljs-number">0</span>
    }
}</code></pre>
<h3 id="articleHeader8">4. 视频播放：因为在IOS上 无法隐藏video的controls ,所以我们可以隐藏video,通过绘制canvas来达到播放视频的效果</h3>
<h3 id="articleHeader9">5. icon采用的是 <a href="http://www.iconfont.cn/" rel="nofollow noreferrer" target="_blank">阿里巴巴矢量图</a>
</h3>
<h3 id="articleHeader10">6. <a href="http://mockjs.com/" rel="nofollow noreferrer" target="_blank">mock.js</a>
</h3>
<h3 id="articleHeader11">7. <a href="https://easy-mock.com/" rel="nofollow noreferrer" target="_blank">Easy Mock</a>
</h3>
<p>一些更加详细的配置可在<a href="https://github.com/cd-dongzi/vue-project/tree/master/vue-toutiao" rel="nofollow noreferrer" target="_blank">github</a>上查看</p>
<p><a href="http://dzblog.cn/cases/vue-toutiao/index.html" rel="nofollow noreferrer" target="_blank">在线预览地址, 或可通过 chrome 控制台手机模式观看</a></p>
<blockquote>
<a href="https://github.com/cd-dongzi/vue-project/tree/master/vue-toutiao" rel="nofollow noreferrer" target="_blank">github地址</a><br><a href="http://dzblog.cn/article/5a78609ec153997e3417a6d4" rel="nofollow noreferrer" target="_blank">博客地址</a>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue实战篇（Vue仿今日头条）

## 原文链接
[https://segmentfault.com/a/1190000013153782](https://segmentfault.com/a/1190000013153782)

