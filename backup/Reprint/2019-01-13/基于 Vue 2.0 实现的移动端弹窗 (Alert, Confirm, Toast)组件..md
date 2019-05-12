---
title: '基于 Vue 2.0 实现的移动端弹窗 (Alert, Confirm, Toast)组件.' 
date: 2019-01-13 2:30:11
hidden: true
slug: gjst890p8ll
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">wc-messagebox</h2>
<ul>
<li><p>基于 vue 2.0 开发的插件</p></li>
<li><p>包含 Alert, Confirm, Toast, Prompt</p></li>
<li><p>仿照 iOS 原生UI(样式来源: MUI)</p></li>
</ul>
<h2 id="articleHeader1">一些想法</h2>
<p>刚开始的时候想要用现成的弹窗组件来着, 但是查找一圈没有发现比较合适项目的, 所以才自己开发了一个, 包含 Alert, Comfirm, Toast, Prompt 四种, 并且可以单个引入.<br>Vue 的组件开发实际上比较简单, 有兴趣的可以看下源码实现, 步骤很清晰. <br>关于样式的问题, 是直接从 MUI（魅族开发的） 中拿过来的, 仿照 iOS 的效果.</p>
<h2 id="articleHeader2">效果图</h2>
<p><span class="img-wrap"><img data-src="/img/bVQxkR?w=368&amp;h=624" src="https://static.alili.tech/img/bVQxkR?w=368&amp;h=624" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>图是动图... 动不了点一下就好.</p>
<h2 id="articleHeader3">Install</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i wc-messagebox --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code class="shell" style="word-break: break-word; white-space: initial;">npm <span class="hljs-selector-tag">i</span> wc-messagebox --save</code></pre>
<h2 id="articleHeader4">Quick Start</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {Alert, Confirm, Toast} from 'wc-messagebox'
import 'wc-messagebox/style.css'

Vue.use(Alert, options)
Vue.use(Confirm, options)
Vue.use(Toast, options)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> {Alert, Confirm, Toast} <span class="hljs-keyword">from</span> <span class="hljs-string">'wc-messagebox'</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'wc-messagebox/style.css'</span>

Vue.use(Alert, options)
Vue.use(Confirm, options)
Vue.use(Toast, options)</code></pre>
<h2 id="articleHeader5">Usage</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.$alert(text, options)
options = {
    title: '',  // 默认无标题
    btn: {
        text: '',
        style: {
            'backgroun-color': 'red',
            'font-size': '20px',
            'color': 'blue'
        }
    }
}

this.$confirm(text, options)
options = {
    title: '', // 默认无标题
    yes: {
        text: '确定',
        style: {}
    },
    no: {
        text: '取消',
        style: {}
    }
}
this.$toast(text, options);
options = {
    position: 'bottom' // 'bottom' | 'center',
    duration: '1500'
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">this</span>.$alert(text, options)
options = {
    <span class="hljs-attr">title</span>: <span class="hljs-string">''</span>,  <span class="hljs-comment">// 默认无标题</span>
    btn: {
        <span class="hljs-attr">text</span>: <span class="hljs-string">''</span>,
        <span class="hljs-attr">style</span>: {
            <span class="hljs-string">'backgroun-color'</span>: <span class="hljs-string">'red'</span>,
            <span class="hljs-string">'font-size'</span>: <span class="hljs-string">'20px'</span>,
            <span class="hljs-string">'color'</span>: <span class="hljs-string">'blue'</span>
        }
    }
}

<span class="hljs-keyword">this</span>.$confirm(text, options)
options = {
    <span class="hljs-attr">title</span>: <span class="hljs-string">''</span>, <span class="hljs-comment">// 默认无标题</span>
    yes: {
        <span class="hljs-attr">text</span>: <span class="hljs-string">'确定'</span>,
        <span class="hljs-attr">style</span>: {}
    },
    <span class="hljs-attr">no</span>: {
        <span class="hljs-attr">text</span>: <span class="hljs-string">'取消'</span>,
        <span class="hljs-attr">style</span>: {}
    }
}
<span class="hljs-keyword">this</span>.$toast(text, options);
options = {
    <span class="hljs-attr">position</span>: <span class="hljs-string">'bottom'</span> <span class="hljs-comment">// 'bottom' | 'center',</span>
    duration: <span class="hljs-string">'1500'</span>
}
</code></pre>
<h2 id="articleHeader6">其他</h2>
<p>Alert, Confirm 返回的是一个Promise, 以支持链式调用.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.$confirm(text).then(success).catch(fail)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">this</span>.$confirm(text).then(success).catch(fail)</code></pre>
<h2 id="articleHeader7">项目地址</h2>
<p><a href="https://github.com/helicopters/wc-messagebox" rel="nofollow noreferrer" target="_blank">项目地址</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于 Vue 2.0 实现的移动端弹窗 (Alert, Confirm, Toast)组件.

## 原文链接
[https://segmentfault.com/a/1190000009705021](https://segmentfault.com/a/1190000009705021)

