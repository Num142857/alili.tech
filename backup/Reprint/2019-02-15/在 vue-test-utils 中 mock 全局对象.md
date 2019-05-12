---
title: '在 vue-test-utils 中 mock 全局对象' 
date: 2019-02-15 2:30:44
hidden: true
slug: 4ph000y4vox
categories: [reprint]
---

{{< raw >}}

                    
<p><code>vue-test-utils</code>   提供了一种 mock 掉   <code>Vue.prototype</code>   的简单方式，不但对测试用例适用，也可以为所有测试设置默认的 mock。</p>
<h1 id="articleHeader0">
<code>mocks</code>   加载选项</h1>
<p><code>mocks</code>   加载选项   是一种将任何属性附加到  <code> Vue.prototype</code>   上的方式。这通常包括：</p>
<p><code>$store</code> , for Vuex</p>
<p><code>$router</code>, for Vue Router</p>
<p><code>$t</code> , for vue-i18n</p>
<p>以及其他种种。</p>
<p><code>vue-i18n </code>  <strong>的例子</strong><br>我们来看一个 vue-i18n   的例子。虽然可以为每个测试用到  <code> createLocalVue  </code> 并安装   <code>vue-i18n </code>，但那样可能会让事情难以处理并引入一堆样板。首先，组件 <code> &lt;Bilingual&gt;  </code> 用到了   <code>vue-i18n</code>` :</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div class=&quot;hello&quot;>
    "{{" $t(&quot;helloWorld&quot;) "}}"
  </div>
</template>

<script>
  export default {
    name: &quot;Bilingual&quot;
  }
</script>`" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"hello"</span>&gt;</span>
    </span><span class="hljs-template-variable">"{{" $t("helloWorld") "}}"</span><span class="xml">
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">name</span>: <span class="hljs-string">"Bilingual"</span>
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>`</span></code></pre>
<p>你先在另一个文件中弄好翻译，然后通过<code> $t  </code> 引用，这就是  <code> vue-i18n </code> 的工作方式。在本次测试中，虽然并不会真正关心翻译文件看起来什么样，不过还是看一看这次用到的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
  &quot;en&quot;: {
    helloWorld: &quot;Hello world!&quot;
  },
  &quot;ja&quot;: {
    helloWorld: &quot;こんにちは、世界！&quot;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>export <span class="hljs-keyword">default</span> {
  <span class="hljs-string">"en"</span>: {
    helloWorld: <span class="hljs-string">"Hello world!"</span>
  },
  <span class="hljs-string">"ja"</span>: {
    helloWorld: <span class="hljs-string">"こんにちは、世界！"</span>
  }
}</code></pre>
<p>基于这个 locale，正确的翻译将被渲染出来。我们先不用 mock，尝试在测试中渲染该组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { shallowMount } from &quot;@vue/test-utils&quot;
import Bilingual from &quot;@/components/Bilingual.vue&quot;

describe(&quot;Bilingual&quot;, () => {
  it(&quot;renders successfully&quot;, () => {
    const wrapper = shallowMount(Bilingual)
  })
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> { shallowMount } <span class="hljs-keyword">from</span> <span class="hljs-string">"@vue/test-utils"</span>
<span class="hljs-keyword">import</span> Bilingual <span class="hljs-keyword">from</span> <span class="hljs-string">"@/components/Bilingual.vue"</span>

describe(<span class="hljs-string">"Bilingual"</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  it(<span class="hljs-string">"renders successfully"</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    const wrapper = shallowMount(Bilingual)
  })
})</code></pre>
<p>通过 <code>yarn test:unit</code>   运行测试将抛出一堆错误堆栈。若仔细端详输出则会发现：</p>
<p>这是因为我们并未安装<code> vue-i18n</code> ，所以全局的  <code> $t</code>   方法并不存在。我们试试 <code> mocks </code>  加载选项：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { shallowMount } from &quot;@vue/test-utils&quot;
import Bilingual from &quot;@/components/Bilingual.vue&quot;

describe(&quot;Bilingual&quot;, () => {
  it(&quot;renders successfully&quot;, () => {
    const wrapper = shallowMount(Bilingual, {
      mocks: {
        $t: (msg) => msg
      }
    })
  })
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> { shallowMount } <span class="hljs-keyword">from</span> <span class="hljs-string">"@vue/test-utils"</span>
<span class="hljs-keyword">import</span> Bilingual <span class="hljs-keyword">from</span> <span class="hljs-string">"@/components/Bilingual.vue"</span>

describe(<span class="hljs-string">"Bilingual"</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  it(<span class="hljs-string">"renders successfully"</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    const wrapper = shallowMount(Bilingual, {
      mocks: {
        $t: <span class="hljs-function"><span class="hljs-params">(msg)</span> =&gt;</span> msg
      }
    })
  })
})</code></pre>
<p>现在测试通过了！<code> mocks </code>  选项用处多多，而我觉得最最常用的正是开头提到过的那三样。</p>
<p>（译注：通过这种方式就不能在单元测试中耦合与特定语言相关的内容了，因为翻译功能实际上已失效，也更无法处理可选参数等）</p>
<h1 id="articleHeader1">使用配置设置默认的 mocks</h1>
<p>有时需要一个 mock 的默认值，这样就不用为每个测试用例都设置一遍了。可以用 <code>vue-test-utils </code>  提供的   config   API 来实现。还是 <code>  vue-i18n</code>   的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import VueTestUtils from &quot;@vue/test-utils&quot;

VueTestUtils.config.mocks[&quot;mock&quot;] = &quot;Default Mock Value&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>import VueTestUtils from <span class="hljs-string">"@vue/test-utils"</span>

VueTestUtils<span class="hljs-selector-class">.config</span><span class="hljs-selector-class">.mocks</span>[<span class="hljs-string">"mock"</span>] = <span class="hljs-string">"Default Mock Value"</span></code></pre>
<p>这个示例中用到了 Jest，所以我将把默认 mock 描述在<code> jest.init.js   </code>文件中 -- 该文件会在测试运行前被自动加载。同时我也会导入并应用此前用于示例的翻译对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//jest.init.js

import VueTestUtils from &quot;@vue/test-utils&quot;
import translations from &quot;./src/translations.js&quot;

const locale = &quot;en&quot;

VueTestUtils.config.mocks[&quot;$t&quot;] = (msg) => translations[locale][msg]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code>//jest.init.js

import VueTestUtils from "@vue/test-utils"
import translations from "./src/translations.js"

const locale = "en"

VueTestUtils.config.mocks[<span class="hljs-string">"$t"</span>] = (msg) =&gt; translations[<span class="hljs-string">locale</span>][<span class="hljs-symbol">msg</span>]</code></pre>
<p>现在尽管还是用了一个 mock 过的<code> $t</code>   函数，但会渲染一个真实的翻译了。再次运行测试，这次移除了  <code> mocks </code>  加载选项并用  <code> console.log   </code>打印了 <code>  wrapper.html() </code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="describe(&quot;Bilingual&quot;, () => {
  it(&quot;renders successfully&quot;, () => {
    const wrapper = shallowMount(Bilingual)

    console.log(wrapper.html())
  })
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code>describe(<span class="hljs-string">"Bilingual"</span>, () =&gt; {
  it(<span class="hljs-string">"renders successfully"</span>, () =&gt; {
    const wrapper = shallowMount(<span class="hljs-name">Bilingual</span>)

    console.log(<span class="hljs-name">wrapper</span>.html())
  })
})</code></pre>
<p>测试通过，以下结构被渲染出来：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;hello&quot;>
  Hello world!
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"hello"</span>&gt;
  Hello world!
<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<p>（译注：依然无法应付复杂的翻译）</p>
<h1 id="articleHeader2">总结</h1>
<p>本文论述了：</p>
<ul>
<li><strong>在测试用例中使用 <code>mocks </code>  以 mock 一个全局对象</strong></li>
<li><strong>用 <code>config.mocks</code>   设置默认的 mock</strong></li>
</ul>
<p><em>原文链接：<a href="https://www.qdfuns.com/article.php?mod=view&amp;id=aaaddd492fb4c0f57287022a97293c7f&amp;uid=51352" rel="nofollow noreferrer" target="_blank">https://www.qdfuns.com/articl...</a></em></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
在 vue-test-utils 中 mock 全局对象

## 原文链接
[https://segmentfault.com/a/1190000016938533](https://segmentfault.com/a/1190000016938533)

