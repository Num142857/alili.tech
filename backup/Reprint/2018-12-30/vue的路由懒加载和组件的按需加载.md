---
title: 'vue的路由懒加载和组件的按需加载' 
date: 2018-12-30 2:30:09
hidden: true
slug: 4oq09fmmfqe
categories: [reprint]
---

{{< raw >}}

                    
<p>“懒加载也叫延迟加载，即在需要的时候进行加载，随用随载。在单页应用中，如果没有应用懒加载，运用webpack打包后的文件将会异常的大，造成进入首页时，需要加载的内容过多，延时过长，不利于用户体验，而运用懒加载则可以将页面进行划分，需要的时候加载页面，可以有效的分担首页所承担的加载压力，减少首页加载用时。”</p>
<h3 id="articleHeader0">1、vue路由的懒加载</h3>
<ul><li>按需加载的写法</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="                require([&quot;src/xx/xxx/xx.vue&quot;], resolve);
            }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code>                <span class="hljs-meta">require</span>([<span class="hljs-string">"src/xx/xxx/xx.vue"</span>], resolve)<span class="hljs-comment">;</span>
            }</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVV6vV?w=790&amp;h=515" src="https://static.alili.tech/img/bVV6vV?w=790&amp;h=515" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<ul><li>效果</li></ul>
<p><span class="img-wrap"><img data-src="/img/bVV6yA?w=741&amp;h=277" src="https://static.alili.tech/img/bVV6yA?w=741&amp;h=277" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>按需加载会在页面第一次请求的时候，把相关路由组件块的js添加上；非按需加载则会把所有的路由组件块的js包打在一起。当业务包很大的时候建议用路由的按需加载（懒加载）。</p>
<h3 id="articleHeader1">2、vue组件的异步加载和同步加载</h3>
<ul><li>组件的写法</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
       // aview: function(resolve) {
       //     require([&quot;./a.vue&quot;], resolve);
       // },
       // bview: function(resolve) {
       //     require([&quot;./b.vue&quot;], resolve);
       // }
       aview:require(&quot;./a.vue&quot;),
       bview:require(&quot;./b.vue&quot;)," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lua"><code>
       // aview: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(resolve)</span></span> {
       //     <span class="hljs-built_in">require</span>([<span class="hljs-string">"./a.vue"</span>], resolve);
       // },
       // bview: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(resolve)</span></span> {
       //     <span class="hljs-built_in">require</span>([<span class="hljs-string">"./b.vue"</span>], resolve);
       // }
       aview:<span class="hljs-built_in">require</span>(<span class="hljs-string">"./a.vue"</span>),
       bview:<span class="hljs-built_in">require</span>(<span class="hljs-string">"./b.vue"</span>),</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVV6z2?w=762&amp;h=254" src="https://static.alili.tech/img/bVV6z2?w=762&amp;h=254" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<ul><li>效果<br>异步组件页面渲染的时候会跳动；但是同步书写不会</li></ul>
<h3 id="articleHeader2">3、vue组件的按需加载（2种方式）</h3>
<h4>1、动态组件方式</h4>
<ul><li>书写方式</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="组件里面：
 components: {
        aview: function(resolve) {
            require([&quot;./a.vue&quot;], resolve);
        },
        bview: function(resolve) {
            require([&quot;./b.vue&quot;], resolve);
        }
    },
 模板里面：
<component :is=&quot;current&quot; :data=&quot;myData&quot; ></component>
 data: function() {
        return {
            current: &quot;&quot;,
            myData:&quot;&quot;,
            show:false
        }
    },
    methods: {
        changeComponents:function(view)
        {
            if(view=='aview')
            {
                this.myData='a1000';
            }
            else
            {
                this.myData='b1000';
            }
            this.current=view;
        }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>组件里面：
 components: {
        <span class="hljs-attr">aview</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve</span>) </span>{
            <span class="hljs-built_in">require</span>([<span class="hljs-string">"./a.vue"</span>], resolve);
        },
        <span class="hljs-attr">bview</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve</span>) </span>{
            <span class="hljs-built_in">require</span>([<span class="hljs-string">"./b.vue"</span>], resolve);
        }
    },
 模板里面：
&lt;component :is=<span class="hljs-string">"current"</span> :data=<span class="hljs-string">"myData"</span> &gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">component</span>&gt;</span></span>
 data: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">current</span>: <span class="hljs-string">""</span>,
            <span class="hljs-attr">myData</span>:<span class="hljs-string">""</span>,
            <span class="hljs-attr">show</span>:<span class="hljs-literal">false</span>
        }
    },
    <span class="hljs-attr">methods</span>: {
        <span class="hljs-attr">changeComponents</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">view</span>)
        </span>{
            <span class="hljs-keyword">if</span>(view==<span class="hljs-string">'aview'</span>)
            {
                <span class="hljs-keyword">this</span>.myData=<span class="hljs-string">'a1000'</span>;
            }
            <span class="hljs-keyword">else</span>
            {
                <span class="hljs-keyword">this</span>.myData=<span class="hljs-string">'b1000'</span>;
            }
            <span class="hljs-keyword">this</span>.current=view;
        }
    }</code></pre>
<p>*效果（会触发组件的生命周期）</p>
<p><span class="img-wrap"><img data-src="/img/bVV6Bj?w=579&amp;h=194" src="https://static.alili.tech/img/bVV6Bj?w=579&amp;h=194" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h4>2、v-if方式(强制创建和结束生命周期)</h4>
<ul><li>书写方式</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="模板：
<aview v-if=&quot;show&quot;></aview>
组件：
components: {
        aview:require(&quot;./a.vue&quot;)
    }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>模板：
&lt;aview v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"show"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">aview</span>&gt;</span></span>
组件：
components: {
        <span class="hljs-attr">aview</span>:<span class="hljs-built_in">require</span>(<span class="hljs-string">"./a.vue"</span>)
    },</code></pre>
<ul><li>效果</li></ul>
<p><span class="img-wrap"><img data-src="/img/bVV6Cm?w=470&amp;h=164" src="https://static.alili.tech/img/bVV6Cm?w=470&amp;h=164" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><a href="http://www.cnblogs.com/zhanyishu/p/6587571.html" rel="nofollow noreferrer" target="_blank">详细的路由懒加载</a></p>
<p><a href="https://github.com/holidaying" rel="nofollow noreferrer" target="_blank">更需资料github</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue的路由懒加载和组件的按需加载

## 原文链接
[https://segmentfault.com/a/1190000011426274](https://segmentfault.com/a/1190000011426274)

