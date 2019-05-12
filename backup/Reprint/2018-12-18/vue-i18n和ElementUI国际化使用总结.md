---
title: 'vue-i18n和ElementUI国际化使用总结' 
date: 2018-12-18 2:30:11
hidden: true
slug: eri54iwcrei
categories: [reprint]
---

{{< raw >}}

                    
<p>项目中需要自定义切换中/英文，基于vue.js，结合vue-i18n，ElementUI,以下是使用方法。</p>
<p>ElementUI国际化链接： <a href="http://element-cn.eleme.io/#/zh-CN/component/i18n" rel="nofollow noreferrer" target="_blank">http://element-cn.eleme.io/#/...</a><br>vue-i18n：<a href="https://github.com/kazupon/vue-i18n" rel="nofollow noreferrer" target="_blank">https://github.com/kazupon/vu...</a><br>安装: <code>npm install vue-i18n</code></p>
<h3 id="articleHeader0">vue.js+vue-i18n国际化</h3>
<p>先不使用ElementUI，就简单的vue.js+vue-i18n使用方法：<br>在main.js同级建i18n新文件夹，里面新建i18n.js、langs文件夹，langs文件夹下新建en.js、cn.js;目录如下:</p>
<p><span class="img-wrap"><img data-src="/img/bV1Mpd?w=390&amp;h=282" src="https://static.alili.tech/img/bV1Mpd?w=390&amp;h=282" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//i18n.js

import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from './langs'
Vue.use(VueI18n)
//从localStorage中拿到用户的语言选择，如果没有，那默认中文。
const i18n = new VueI18n({
    locale: localStorage.lang || 'cn',
    messages,
})

export default i18n" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//i18n.js</span>

<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> VueI18n <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-i18n'</span>
<span class="hljs-keyword">import</span> messages <span class="hljs-keyword">from</span> <span class="hljs-string">'./langs'</span>
Vue.use(VueI18n)
<span class="hljs-comment">//从localStorage中拿到用户的语言选择，如果没有，那默认中文。</span>
<span class="hljs-keyword">const</span> i18n = <span class="hljs-keyword">new</span> VueI18n({
    <span class="hljs-attr">locale</span>: localStorage.lang || <span class="hljs-string">'cn'</span>,
    messages,
})

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> i18n</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//langs/index.js

import en from './en';
import cn from './cn';
export default {
    en: en,
    cn: cn
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//langs/index.js</span>

<span class="hljs-keyword">import</span> en <span class="hljs-keyword">from</span> <span class="hljs-string">'./en'</span>;
<span class="hljs-keyword">import</span> cn <span class="hljs-keyword">from</span> <span class="hljs-string">'./cn'</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">en</span>: en,
    <span class="hljs-attr">cn</span>: cn
}
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//en.js
const en = {
    message: {
        'hello': 'hello, world',
    }
}

export default en;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-comment">//en.js</span>
<span class="hljs-keyword">const</span> en = {
    message: {
        <span class="hljs-string">'hello'</span>: <span class="hljs-string">'hello, world'</span>,
    }
}

<span class="hljs-keyword">export</span> <span class="hljs-built_in">default</span> en;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//cn.js
const cn = {
    message: {
        'hello': '你好，世界',
    }
}

export default cn;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-comment">//cn.js</span>
<span class="hljs-keyword">const</span> cn = {
    message: {
        <span class="hljs-string">'hello'</span>: <span class="hljs-string">'你好，世界'</span>,
    }
}

<span class="hljs-keyword">export</span> <span class="hljs-built_in">default</span> cn;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//main.js添加下面代码
import i18n from './i18n/i18n';
window.app = new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: { App }
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//main.js添加下面代码</span>
<span class="hljs-keyword">import</span> i18n <span class="hljs-keyword">from</span> <span class="hljs-string">'./i18n/i18n'</span>;
<span class="hljs-built_in">window</span>.app = <span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
  router,
  store,
  i18n,
  <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;App/&gt;'</span>,
  <span class="hljs-attr">components</span>: { App }
})
</code></pre>
<p>接下来是在页面中使用、切换语言。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//html: 
<p>"{{"$t('message.hello')"}}"</p> // hello, world" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code><span class="hljs-regexp">//</span>html: 
&lt;p&gt;"{{"<span class="hljs-variable">$t</span>(<span class="hljs-string">'message.hello'</span>)"}}"&lt;<span class="hljs-regexp">/p&gt; /</span><span class="hljs-regexp">/ hello, world</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//js切换语言
data() {
    return {
        lang: 'en'
    }
},
methods: {
    switchLang()  {
        this.$i18n.locale = this.lang 
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">//js切换语言</span>
<span class="hljs-function"><span class="hljs-title">data</span><span class="hljs-params">()</span></span> {
    return {
        lang: <span class="hljs-string">'en'</span>
    }
},
methods: {
    switchLang()  {
        this.<span class="hljs-variable">$i18n</span><span class="hljs-selector-class">.locale</span> = this<span class="hljs-selector-class">.lang</span> 
    }
}</code></pre>
<p>通过改变this.$i18n.locale的值就可以自动切换页面的语言了，en,ja,cn...等等</p>
<h3 id="articleHeader1">vue.js+vue-i18n+elementUI国际化</h3>
<p>更改的地方不多，如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//i18n.js

import Vue from 'vue'
import locale from 'element-ui/lib/locale';
import VueI18n from 'vue-i18n'
import messages from './langs'
Vue.use(VueI18n)
//从localStorage中拿到用户的语言选择，如果没有，那默认中文。
const i18n = new VueI18n({
    locale: localStorage.lang || 'cn',
    messages,
})
locale.i18n((key, value) => i18n.t(key, value)) //为了实现element插件的多语言切换

export default i18n" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//i18n.js</span>

<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> locale <span class="hljs-keyword">from</span> <span class="hljs-string">'element-ui/lib/locale'</span>;
<span class="hljs-keyword">import</span> VueI18n <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-i18n'</span>
<span class="hljs-keyword">import</span> messages <span class="hljs-keyword">from</span> <span class="hljs-string">'./langs'</span>
Vue.use(VueI18n)
<span class="hljs-comment">//从localStorage中拿到用户的语言选择，如果没有，那默认中文。</span>
<span class="hljs-keyword">const</span> i18n = <span class="hljs-keyword">new</span> VueI18n({
    <span class="hljs-attr">locale</span>: localStorage.lang || <span class="hljs-string">'cn'</span>,
    messages,
})
locale.i18n(<span class="hljs-function">(<span class="hljs-params">key, value</span>) =&gt;</span> i18n.t(key, value)) <span class="hljs-comment">//为了实现element插件的多语言切换</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> i18n</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//en.js

import enLocale from 'element-ui/lib/locale/lang/en'
const en = {
    message: {
        'hello': 'hello, world',
    },
    ...enLocale
}

export default en;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//en.js</span>

<span class="hljs-keyword">import</span> enLocale <span class="hljs-keyword">from</span> <span class="hljs-string">'element-ui/lib/locale/lang/en'</span>
<span class="hljs-keyword">const</span> en = {
    <span class="hljs-attr">message</span>: {
        <span class="hljs-string">'hello'</span>: <span class="hljs-string">'hello, world'</span>,
    },
    ...enLocale
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> en;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//cn.js

import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
const cn = {
    message: {
        'hello': '你好，世界',
    },
    ...zhLocale
}

export default cn;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//cn.js</span>

<span class="hljs-keyword">import</span> zhLocale <span class="hljs-keyword">from</span> <span class="hljs-string">'element-ui/lib/locale/lang/zh-CN'</span>
<span class="hljs-keyword">const</span> cn = {
    <span class="hljs-attr">message</span>: {
        <span class="hljs-string">'hello'</span>: <span class="hljs-string">'你好，世界'</span>,
    },
    ...zhLocale
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> cn;</code></pre>
<p>main.js保持不变，就可以解决vue-i18n 6.0以上与elementUI的冲突，</p>
<p>现在切换中英文，elementUI内部语言也会改变。</p>
<p><span class="img-wrap"><img data-src="/img/bV1Mx9?w=876&amp;h=384" src="https://static.alili.tech/img/bV1Mx9?w=876&amp;h=384" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader2">$t()绑定方式</h3>
<p>&lt;p&gt;"{{"$t('message.hello')"}}"&lt;/p&gt;<br>v-text、v-html中： &lt;p v-text="$t('message.hello')"&gt;&lt;/p&gt;<br>data中: label: this.$t('message.hello')</p>
<p>遇到的问题： <br>绑定在data中的值，在切换中英文时不会自动更新，正在寻找解决办法，如有高手知道，可以指点一二。</p>
<p>2018.03.22自答：<br>去 vue-i18n 提了 issue 才知道是我对 vue 理解不够深刻，<br>绑定在data中不会自动更新的原因是 Vue 组件中的 data 属性只会在组件实例化时候后计算一次<br>解决办法是，写在 computed props 里<br><a href="https://github.com/kazupon/vue-i18n/commit/d007ac8e91261dda63eb9ce95cf2b7bb73bf7968" rel="nofollow noreferrer" target="_blank">issue 回答链接</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue-i18n和ElementUI国际化使用总结

## 原文链接
[https://segmentfault.com/a/1190000012779120](https://segmentfault.com/a/1190000012779120)

