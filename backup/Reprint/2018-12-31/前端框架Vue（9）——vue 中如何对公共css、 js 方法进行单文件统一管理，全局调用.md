---
title: '前端框架Vue（9）——vue 中如何对公共css、 js 方法进行单文件统一管理，全局调用' 
date: 2018-12-31 2:30:29
hidden: true
slug: gejcmt66g5a
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">1、前言</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    最近，为公司开发交付的一个后台管理系统项目，我使用了 Vue 框架进行开发实践。
    
    模块化、组件化、工程化的开发体验非常好。良好的 api，优雅的设计，对于工程师非常友好。

    但是由于模块比较多，我对于每个模块分配了不同的组件，发现一个项目中有许多相同的方法，
    在每个组件中我都需要进行重复的编写。

    所以，我希望能够将这些公共的方法，抽离出来放到同一个 js 中，这里就取名 util.js。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>    最近，为公司开发交付的一个后台管理系统项目，我使用了 <span class="hljs-selector-tag">Vue</span> 框架进行开发实践。
    
    模块化、组件化、工程化的开发体验非常好。良好的 <span class="hljs-selector-tag">api</span>，优雅的设计，对于工程师非常友好。

    但是由于模块比较多，我对于每个模块分配了不同的组件，发现一个项目中有许多相同的方法，
    在每个组件中我都需要进行重复的编写。

    所以，我希望能够将这些公共的方法，抽离出来放到同一个 <span class="hljs-selector-tag">js</span> 中，这里就取名 <span class="hljs-selector-tag">util</span><span class="hljs-selector-class">.js</span>。</code></pre>
<h2 id="articleHeader1">2、模型设计</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011275600" src="https://static.alili.tech/img/remote/1460000011275600" alt="这里写图片描述" title="这里写图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader2">3、实现方法</h2>
<p>1、方法一</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="暴露接口的方式，直接在组件中进行引用" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code style="word-break: break-word; white-space: initial;">暴露接口的方式，直接在组件中进行引用</code></pre>
<p>首先在 util.js 单独文件中写两个方法：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011275601" src="https://static.alili.tech/img/remote/1460000011275601" alt="这里写图片描述" title="这里写图片描述" style="cursor: pointer;"></span></p>
<p>在组件中引用，测试了无法在 main.js 中全局引用（有方法请告诉我）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {a,b} from '../static/js/util.js'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> {a,b} <span class="hljs-keyword">from</span> <span class="hljs-string">'../static/js/util.js'</span></code></pre>
<p>调用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="test: function() {
        a();
        b();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs subunit"><code><span class="hljs-keyword">test: </span>function() {
        a();
        b();
}</code></pre>
<p>2、方法二：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="将公共方法集成到 Vue 原型上，Vue.prototype.name" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">将公共方法集成到 Vue 原型上，Vue<span class="hljs-selector-class">.prototype</span><span class="hljs-selector-class">.name</span></code></pre>
<p>首先在 util.js 中写方法：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011275602" src="https://static.alili.tech/img/remote/1460000011275602" alt="这里写图片描述" title="这里写图片描述" style="cursor: pointer;"></span></p>
<p>在 main.js 中进行全局引用：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011275603" src="https://static.alili.tech/img/remote/1460000011275603" alt="这里写图片描述" title="这里写图片描述" style="cursor: pointer;"></span></p>
<p>调用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.adminApi.a();
this.adminApi.b();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">this</span><span class="hljs-selector-class">.adminApi</span><span class="hljs-selector-class">.a</span>();
<span class="hljs-selector-tag">this</span><span class="hljs-selector-class">.adminApi</span><span class="hljs-selector-class">.b</span>();</code></pre>
<p><strong>其实我想要实现是这样的，感谢 &lt;font color=red size=3&gt;@wow511287680 &lt;/font&gt; 留言提供的思路：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // utils.js  
    let utils = {  
        toPath (name) {  
            location.href = '/#/' + name;  
        }  
    };  
      
    export {  
        utils  
    }  
    
    xxx.vue  
    import {utils} from '@/js/utils';  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>    // utils.js  
    <span class="hljs-keyword">let</span> utils = {  
        toPath (name) {  
            location.href = <span class="hljs-string">'/#/'</span> + name;  
        }  
    };  
      
    export {  
        utils  
    }  
    
    xxx.vue  
    <span class="hljs-keyword">import</span> {utils} from <span class="hljs-string">'@/js/utils'</span>;  </code></pre>
<p><strong>这样，不同对象中分别有不同的方法，分层更加的清晰，可维护性也更高。</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011275604" src="https://static.alili.tech/img/remote/1460000011275604" alt="这里写图片描述" title="这里写图片描述" style="cursor: pointer;"></span></p>
<p>在组件中先引用，再调用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {obj, obj1} from '../../static/js/utils'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> {obj, obj1} <span class="hljs-keyword">from</span> <span class="hljs-string">'../../static/js/utils'</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="obj.fun1();
obj1.fun1();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gcode"><code>obj.fu<span class="hljs-symbol">n1</span><span class="hljs-comment">()</span>;
obj<span class="hljs-number">1.</span>fu<span class="hljs-symbol">n1</span><span class="hljs-comment">()</span>;</code></pre>
<h2 id="articleHeader3">4、CSS 公用样式进行抽离复用</h2>
<p>建一个公共样式 css 文件： </p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011275605" src="https://static.alili.tech/img/remote/1460000011275605" alt="这里写图片描述" title="这里写图片描述" style="cursor: pointer;"></span></p>
<p>在 main.js 中进行全局引用，方法同 js：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import './static/css/common.css'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> <span class="hljs-string">'./static/css/common.css'</span></code></pre>
<p>.<br>..<br>...<br>....</p>
<p><strong>本文，未完待续 ... ...</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端框架Vue（9）——vue 中如何对公共css、 js 方法进行单文件统一管理，全局调用

## 原文链接
[https://segmentfault.com/a/1190000011275595](https://segmentfault.com/a/1190000011275595)

