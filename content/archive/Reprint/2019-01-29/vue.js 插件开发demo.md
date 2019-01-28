---
title: 'vue.js 插件开发demo' 
date: 2019-01-29 2:30:10
hidden: true
slug: d0lzs3c7uge
categories: [reprint]
---

{{< raw >}}

                    
<p>插件可以让开发者提供的扩展看起来像是vue自己就有的。因为插件的功能会使用Vue全局对象或者实例来调用，或者被修改从而在Vue的钩子函数内起作用。比如用于http调用的插件vue-resource被插入到vue后，可以使用:</p>
<p>Vue.http.get(url)</p>
<p>的方式使用此插件提供的服务。本文构建一个可以执行的demo，验证插件对Vue的修改，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var get = function(a){console.log('Hello  ' +a)}
var plugin = {}
plugin.install = function(Vue) {
    if (plugin.installed) {
        return;
    }
    Vue.who = get;
    Object.defineProperties(Vue.prototype, {
        $who: {
            get() {
                return {get:get}
            }
        }
    });
    Vue.mixin({
        created: function () {
          console.log('Plugin activiated')
        }        
    })    
}
if (typeof window !== 'undefined' &amp;&amp; window.Vue) {
    window.Vue.use(plugin);
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">var</span> <span class="hljs-keyword">get</span> = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a</span>)</span>{<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Hello  '</span> +a)}
<span class="hljs-keyword">var</span> plugin = {}
plugin.install = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">Vue</span>) </span>{
    <span class="hljs-keyword">if</span> (plugin.installed) {
        <span class="hljs-keyword">return</span>;
    }
    Vue.who = <span class="hljs-keyword">get</span>;
    <span class="hljs-built_in">Object</span>.defineProperties(Vue.prototype, {
        $who: {
            <span class="hljs-keyword">get</span>() {
                <span class="hljs-keyword">return</span> {<span class="hljs-keyword">get</span>:<span class="hljs-keyword">get</span>}
            }
        }
    });
    Vue.mixin({
        created: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
          <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Plugin activiated'</span>)
        }        
    })    
}
<span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">window</span> !== <span class="hljs-string">'undefined'</span> &amp;&amp; <span class="hljs-built_in">window</span>.Vue) {
    <span class="hljs-built_in">window</span>.Vue.use(plugin);
}
</code></pre>
<p>此插件以get函数形式提供服务，可以打印一个字符串。它必须公开一个对象，此对象有一个install的方法，此方法的参数为Vue，可以在此方法内通过赋值创建全局方法，像这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    Vue.who = get;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code style="word-break: break-word; white-space: initial;">    Vue.who = get<span class="hljs-comment">;</span></code></pre>
<p>或者针对vue的prototype，通过defineProperties创建实例方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" Object.defineProperties(Vue.prototype, {
            $who: {
                get() {
                    return {get:get}
                }
            }
        });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code> <span class="hljs-built_in">Object</span>.defineProperties(Vue.prototype, {
            $who: {
                <span class="hljs-keyword">get</span>() {
                    <span class="hljs-keyword">return</span> {<span class="hljs-keyword">get</span>:<span class="hljs-keyword">get</span>}
                }
            }
        });</code></pre>
<p>混入能力可以把钩子函数混入到Vue实例内：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    Vue.mixin({
        created: function () {
          console.log('Plugin activiated')
        }        
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>    <span class="hljs-selector-tag">Vue</span><span class="hljs-selector-class">.mixin</span>({
        <span class="hljs-attribute">created</span>: function () {
          console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'Plugin activiated'</span>)
        }        
    })</code></pre>
<p>此时可以使用一个文件对它测试：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
<html>
  <body>
    <script type=&quot;text/javascript&quot; src=&quot;https://vuejs.org/js/vue.js&quot;></script>
    <script type=&quot;text/javascript&quot; src=&quot;p1.js&quot;></script>
    <script type=&quot;text/javascript&quot;>
        var vue = new Vue()
        vue.$who.get('Vue Instance')
        Vue.who('Global Vue')
    </script>
  </body>
</html>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://vuejs.org/js/vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"p1.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="actionscript">
        <span class="hljs-keyword">var</span> vue = <span class="hljs-keyword">new</span> Vue()
        vue.$who.get(<span class="hljs-string">'Vue Instance'</span>)
        Vue.who(<span class="hljs-string">'Global Vue'</span>)
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre>
<p>打开控制台，可以看到如下消息：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Plugin activiated
p1.js:2 Hello  Vue Instance
p1.js:2 Hello  Global Vue

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">Plugin</span> <span class="hljs-selector-tag">activiated</span>
<span class="hljs-selector-tag">p1</span><span class="hljs-selector-class">.js</span><span class="hljs-selector-pseudo">:2</span> <span class="hljs-selector-tag">Hello</span>  <span class="hljs-selector-tag">Vue</span> <span class="hljs-selector-tag">Instance</span>
<span class="hljs-selector-tag">p1</span><span class="hljs-selector-class">.js</span><span class="hljs-selector-pseudo">:2</span> <span class="hljs-selector-tag">Hello</span>  <span class="hljs-selector-tag">Global</span> <span class="hljs-selector-tag">Vue</span>

</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue.js 插件开发demo

## 原文链接
[https://segmentfault.com/a/1190000007853784](https://segmentfault.com/a/1190000007853784)

