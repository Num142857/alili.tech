---
title: 'Vue系列（二）：发送Ajax、JSONP请求、Vue生命周期及实例属性和方法、自定义指令与过渡' 
date: 2018-12-16 2:30:10
hidden: true
slug: icgaaal219a
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0"><a href="https://segmentfault.com/a/1190000012934686"><strong>上一篇：</strong>Vue系列（一）：简介、起步、常用指令、事件和属性、模板、过滤器</a></h3>
<h2 id="articleHeader1">一、 发送AJAX请求</h2>
<h3 id="articleHeader2">1. 简介</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vue本身不支持发送AJAX请求，需要使用vue-resource、axios等插件实现
axios是一个基于Promise的HTTP请求客户端，用来发送请求，也是vue2.0官方推荐的，同时不再对vue-resource进行更新和维护

参考：GitHub上搜索axios，查看API文档
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">vue</span>本身不支持发送<span class="hljs-selector-tag">AJAX</span>请求，需要使用<span class="hljs-selector-tag">vue-resource</span>、<span class="hljs-selector-tag">axios</span>等插件实现
<span class="hljs-selector-tag">axios</span>是一个基于<span class="hljs-selector-tag">Promise</span>的<span class="hljs-selector-tag">HTTP</span>请求客户端，用来发送请求，也是<span class="hljs-selector-tag">vue2</span><span class="hljs-selector-class">.0</span>官方推荐的，同时不再对<span class="hljs-selector-tag">vue-resource</span>进行更新和维护

参考：<span class="hljs-selector-tag">GitHub</span>上搜索<span class="hljs-selector-tag">axios</span>，查看<span class="hljs-selector-tag">API</span>文档
</code></pre>
<h3 id="articleHeader3">2. 使用axios发送AJAX请求</h3>
<h4>2.1 安装axios并引入</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install axios -S
也可直接下载axios.min.js文件
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>npm install axios -S
也可直接下载axios<span class="hljs-selector-class">.min</span><span class="hljs-selector-class">.js</span>文件
</code></pre>
<h4>2.2 基本用法</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="axios([options])  
axios.get(url[,options]);
    传参方式：
        1.通过url传参
        2.通过params选项传参
axios.post(url,data,[options]);
    axios默认发送数据时，数据格式是Request Payload，并非我们常用的Form Data格式，
    所以参数必须要以键值对形式传递，不能以json形式传参
    传参方式：
        1.自己拼接为键值对
        2.使用transformRequest，在请求发送前将请求数据进行转换
        3.如果使用模块化开发，可以使用qs模块进行转换

axios本身并不支持发送跨域的请求，没有提供相应的API，作者也暂没计划在axios添加支持发送跨域请求，所以只能使用第三方库" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">axios</span>(<span class="hljs-selector-attr">[options]</span>)  
<span class="hljs-selector-tag">axios</span><span class="hljs-selector-class">.get</span>(<span class="hljs-selector-tag">url</span><span class="hljs-selector-attr">[,options]</span>);
    传参方式：
        1.通过<span class="hljs-selector-tag">url</span>传参
        2.通过<span class="hljs-selector-tag">params</span>选项传参
<span class="hljs-selector-tag">axios</span><span class="hljs-selector-class">.post</span>(<span class="hljs-selector-tag">url</span>,<span class="hljs-selector-tag">data</span>,<span class="hljs-selector-attr">[options]</span>);
    <span class="hljs-selector-tag">axios</span>默认发送数据时，数据格式是<span class="hljs-selector-tag">Request</span> <span class="hljs-selector-tag">Payload</span>，并非我们常用的<span class="hljs-selector-tag">Form</span> <span class="hljs-selector-tag">Data</span>格式，
    所以参数必须要以键值对形式传递，不能以<span class="hljs-selector-tag">json</span>形式传参
    传参方式：
        1.自己拼接为键值对
        2.使用<span class="hljs-selector-tag">transformRequest</span>，在请求发送前将请求数据进行转换
        3.如果使用模块化开发，可以使用<span class="hljs-selector-tag">qs</span>模块进行转换

<span class="hljs-selector-tag">axios</span>本身并不支持发送跨域的请求，没有提供相应的<span class="hljs-selector-tag">API</span>，作者也暂没计划在<span class="hljs-selector-tag">axios</span>添加支持发送跨域请求，所以只能使用第三方库</code></pre>
<p><a href="https://github.com/tcyfree/VueLearn/blob/master/day02/01.html" rel="nofollow noreferrer" target="_blank">代码：发送AJAX请求</a></p>
<h3 id="articleHeader4">3. 使用vue-resource发送跨域请求</h3>
<h4>3.1 安装vue-resource并引入</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cnpm install vue-resource -S
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>cnpm <span class="hljs-keyword">install</span> vue-<span class="hljs-keyword">resource</span> -S
</code></pre>
<h4>3.2 基本用法</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="使用this.$http发送请求  
    this.$http.get(url, [options])
    this.$http.head(url, [options])
    this.$http.delete(url, [options])
    this.$http.jsonp(url, [options])
    this.$http.post(url, [body], [options])
    this.$http.put(url, [body], [options])
    this.$http.patch(url, [body], [options])  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code>使用this.<span class="hljs-variable">$http</span>发送请求  
    this.<span class="hljs-variable">$http</span><span class="hljs-selector-class">.get</span>(url, <span class="hljs-selector-attr">[options]</span>)
    this.<span class="hljs-variable">$http</span><span class="hljs-selector-class">.head</span>(url, <span class="hljs-selector-attr">[options]</span>)
    this.<span class="hljs-variable">$http</span><span class="hljs-selector-class">.delete</span>(url, <span class="hljs-selector-attr">[options]</span>)
    this.<span class="hljs-variable">$http</span><span class="hljs-selector-class">.jsonp</span>(url, <span class="hljs-selector-attr">[options]</span>)
    this.<span class="hljs-variable">$http</span><span class="hljs-selector-class">.post</span>(url, <span class="hljs-selector-attr">[body]</span>, <span class="hljs-selector-attr">[options]</span>)
    this.<span class="hljs-variable">$http</span><span class="hljs-selector-class">.put</span>(url, <span class="hljs-selector-attr">[body]</span>, <span class="hljs-selector-attr">[options]</span>)
    this.<span class="hljs-variable">$http</span><span class="hljs-selector-class">.patch</span>(url, <span class="hljs-selector-attr">[body]</span>, <span class="hljs-selector-attr">[options]</span>)  </code></pre>
<p><a href="https://github.com/tcyfree/VueLearn/blob/master/day02/02.html" rel="nofollow noreferrer" target="_blank">练习代码：百度搜索列表</a></p>
<h2 id="articleHeader5">二、Vue生命周期</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vue实例从创建到销毁的过程，称为生命周期，共有八个阶段" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code style="word-break: break-word; white-space: initial;">vue实例从创建到销毁的过程，称为生命周期，共有八个阶段</code></pre>
<p><a href="https://cn.vuejs.org/v2/guide/instance.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%9B%BE%E7%A4%BA" rel="nofollow noreferrer" target="_blank">生命周期图示</a>                <br><a href="https://github.com/tcyfree/VueLearn/blob/master/day02/03.html" rel="nofollow noreferrer" target="_blank">代码：Vue生命周期</a></p>
<h2 id="articleHeader6">三、计算属性</h2>
<h3 id="articleHeader7">1. 基本用法</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="计算属性也是用来存储数据，但具有以下几个特点：     
    a.数据可以进行逻辑处理操作
    b.对计算属性中的数据进行监视
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>计算属性也是用来存储数据，但具有以下几个特点：     
    <span class="hljs-selector-tag">a</span>.数据可以进行逻辑处理操作
    <span class="hljs-selector-tag">b</span>.对计算属性中的数据进行监视
</code></pre>
<h3 id="articleHeader8">2.计算属性 vs 方法</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="将计算属性的get函数定义为一个方法也可以实现类似的功能
区别：
    a.计算属性是基于它的依赖进行更新的，只有在相关依赖发生改变时才能更新变化
    b.计算属性是缓存的，只要相关依赖没有改变，多次访问计算属性得到的值是之前缓存的计算结果，不会多次执行
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>将计算属性的get函数定义为一个方法也可以实现类似的功能
区别：
    <span class="hljs-selector-tag">a</span>.计算属性是基于它的依赖进行更新的，只有在相关依赖发生改变时才能更新变化
    <span class="hljs-selector-tag">b</span>.计算属性是缓存的，只要相关依赖没有改变，多次访问计算属性得到的值是之前缓存的计算结果，不会多次执行
</code></pre>
<h3 id="articleHeader9">3. get和set</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="计算属性由两部分组成：get和set，分别用来获取计算属性和设置计算属性
默认只有get，如果需要set，要自己添加
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>计算属性由两部分组成：<span class="hljs-keyword">get</span>和<span class="hljs-keyword">set</span>，分别用来获取计算属性和设置计算属性
默认只有<span class="hljs-keyword">get</span>，如果需要<span class="hljs-keyword">set</span>，要自己添加
</code></pre>
<p><a href="https://github.com/tcyfree/VueLearn/blob/master/day02/04.html" rel="nofollow noreferrer" target="_blank">代码：计算属性</a></p>
<h2 id="articleHeader10">四、 vue实例的属性和方法</h2>
<h3 id="articleHeader11">1. 属性</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vm.$el
vm.$data
vm.$options
vm.$refs
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code><span class="hljs-keyword">vm</span>.$<span class="hljs-keyword">el</span>
<span class="hljs-keyword">vm</span>.$data
<span class="hljs-keyword">vm</span>.$<span class="hljs-keyword">options</span>
<span class="hljs-keyword">vm</span>.$refs
</code></pre>
<h3 id="articleHeader12">2. 方法</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vm.$mount()
vm.$destroy()
vm.$nextTick(callback)

vm.$set(object,key,value)
vm.$delete(object,key)
vm.$watch(data,callback[,options])
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>vm.<span class="hljs-variable">$mount</span>()
vm.<span class="hljs-variable">$destroy</span>()
vm.<span class="hljs-variable">$nextTick</span>(callback)

vm.<span class="hljs-variable">$set</span>(<span class="hljs-selector-tag">object</span>,key,value)
vm.<span class="hljs-variable">$delete</span>(<span class="hljs-selector-tag">object</span>,key)
vm.<span class="hljs-variable">$watch</span>(data,callback[,options])
</code></pre>
<p><a href="https://github.com/tcyfree/VueLearn/blob/master/day02/05.html" rel="nofollow noreferrer" target="_blank">代码：实例的属性和方法01</a><br><a href="https://github.com/tcyfree/VueLearn/blob/master/day02/06.html" rel="nofollow noreferrer" target="_blank">实例的属性和方法02</a><br><a href="https://github.com/tcyfree/VueLearn/blob/master/day02/07.html" rel="nofollow noreferrer" target="_blank">实例的属性和方法03</a></p>
<h2 id="articleHeader13">五、自定义指令</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="分类：全局指令、局部指令
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>分类：全局指令、局部指令
</code></pre>
<h3 id="articleHeader14">1. 自定义全局指令</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="使用全局方法Vue.directive(指令ID,定义对象)    
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>使用全局方法<span class="hljs-selector-tag">Vue</span><span class="hljs-selector-class">.directive</span>(指令<span class="hljs-selector-tag">ID</span>,定义对象)    
</code></pre>
<h3 id="articleHeader15">2. 自定义局部指令</h3>
<p><a href="https://github.com/tcyfree/VueLearn/blob/master/day02/08.html" rel="nofollow noreferrer" target="_blank">代码：自定义指令</a></p>
<h3 id="articleHeader16">3. 练习</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="拖动页面中的元素
onmouseover onmouseout 
onmousedown onmousemove  onmouseup" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>拖动页面中的元素
onmouseover onmouseout 
onmousedown onmousemove  onmouseup</code></pre>
<p><a href="https://github.com/tcyfree/VueLearn/blob/master/day02/09.html" rel="nofollow noreferrer" target="_blank">代码：练习</a></p>
<h2 id="articleHeader17">六、过渡(动画)</h2>
<h3 id="articleHeader18">1. 简介</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue 在插入、更新或者移除 DOM 时，提供多种不同方式的应用过渡效果
本质上还是使用CSS3动画：transition、animation
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code>Vue 在插入、更新或者移除 DOM 时，提供多种不同方式的应用过渡效果
本质上还是使用CSS3动画：<span class="hljs-attribute">transition</span>、<span class="hljs-attribute">animation</span>
</code></pre>
<h3 id="articleHeader19">2. 基本用法</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="使用transition组件，将要执行动画的元素包含在该组件内
    <transition>
        运动的元素
    </transition>       
过滤的CSS类名：6个
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>使用<span class="hljs-attribute">transition</span>组件，将要执行动画的元素包含在该组件内
    &lt;<span class="hljs-attribute">transition</span>&gt;
        运动的元素
    &lt;/<span class="hljs-attribute">transition</span>&gt;       
过滤的CSS类名：<span class="hljs-number">6</span>个
</code></pre>
<h3 id="articleHeader20">3. 钩子函数</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="8个" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code style="word-break: break-word; white-space: initial;"><span class="hljs-number">8</span>个</code></pre>
<p><a href="https://github.com/tcyfree/VueLearn/blob/master/day02/10.html" rel="nofollow noreferrer" target="_blank">动画01</a><br><a href="https://github.com/tcyfree/VueLearn/blob/master/day02/11.html" rel="nofollow noreferrer" target="_blank">动画02</a></p>
<h3 id="articleHeader21">4. 结合第三方动画库animate.css一起使用</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<transition enter-active-class=&quot;animated fadeInLeft&quot; leave-active-class=&quot;animated fadeOutRight&quot;>
    <p v-show=&quot;flag&quot;>网博</p>
</transition>    
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">transition</span> <span class="hljs-attr">enter-active-class</span>=<span class="hljs-string">"animated fadeInLeft"</span> <span class="hljs-attr">leave-active-class</span>=<span class="hljs-string">"animated fadeOutRight"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"flag"</span>&gt;</span>网博<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">transition</span>&gt;</span>    
</code></pre>
<h3 id="articleHeader22">5. 多元素动画</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<transition-group>    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs apache"><code style="word-break: break-word; white-space: initial;"><span class="hljs-section">&lt;transition-group&gt;</span>    </code></pre>
<p><a href="https://github.com/tcyfree/VueLearn/blob/master/day02/12.html" rel="nofollow noreferrer" target="_blank">多元素动画01</a><br><a href="https://github.com/tcyfree/VueLearn/blob/master/day02/13.html" rel="nofollow noreferrer" target="_blank">多元素动画02</a></p>
<h3 id="articleHeader23"><a href="https://segmentfault.com/a/1190000013009026"><strong>下一篇：</strong>Vue系列（三）：组件及数据传递、路由、单文件组件、vue-cli脚手架</a></h3>
<p>参考Vue教学视频：<a href="http://edu.51cto.com/course/10543.html" rel="nofollow noreferrer" target="_blank">Vue.js 2.0之全家桶系列视频课程（vue、vue-router、axios、vuex）</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue系列（二）：发送Ajax、JSONP请求、Vue生命周期及实例属性和方法、自定义指令与过渡

## 原文链接
[https://segmentfault.com/a/1190000012967337](https://segmentfault.com/a/1190000012967337)

