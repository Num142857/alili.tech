---
title: 'vue 项目的I18n国际化之路' 
date: 2018-12-06 2:30:09
hidden: true
slug: stsg80za0a9
categories: [reprint]
---

{{< raw >}}

                    
<p><strong> I18n (internationalization ) ---未完善 </strong></p>
<p>产品国际化是产品后期维护及推广中重要的一环，通过国际化操作使得产品能更好适应不同语言和地区的需求</p>
<p>国际化重点：<br>1、    语言<br>语言本地化<br>2、    文化<br>颜色、习俗等<br>3、    书写习惯<br>日期格式、时区、数字格式、书写方向<br>备注：项目中会兵分两路，一路是语言的国际化，另一路主要为文化国际化</p>
<p>产品设计之初引入国际化标准，符合项目的开发流程。<br>国内主要主要三点，一个是港澳台采用中文繁体+英文，内陆通俗中文简体，新疆等地区采用文化标准。</p>
<p>Vue-I18n<br>Vue-I18n安装<br>CDN:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;https://unpkg.com/vue/dist/vue.js&quot;></script>
<script src=&quot;https://unpkg.com/vue-i18n/dist/vue-i18n.js&quot;></script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://unpkg.com/vue/dist/vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://unpkg.com/vue-i18n/dist/vue-i18n.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>NPM:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install vue-i18n --save-dev
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code>npm install vue-i18n --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span>
</code></pre>
<p>vue-I18n暴露$t对象进行应用<br>项目例子（面向中国内陆及港澳台）</p>
<p>Main.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import VueI18n from 'vue-i18n'
/* 平台国际语言静态字典 */
import LangEn from './lang/en'
import LangZhCHS from './lang/zhCHS'
import LangZhCHT from './lang/zhCHT'
/* vue-i18n注册 */
Vue.use(VueI18n)
// 设置语言项
const i18n = new VueI18n({
  locale: 'zhCHS',
  messages: {
    'en': LangEn,
    'zhCHS': LangZhCHS,
    'zhCHT': LangZhCHT
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  components: { App },
  template: '<App/>'
})

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> VueI18n <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-i18n'</span>
<span class="hljs-comment">/* 平台国际语言静态字典 */</span>
<span class="hljs-keyword">import</span> LangEn <span class="hljs-keyword">from</span> <span class="hljs-string">'./lang/en'</span>
<span class="hljs-keyword">import</span> LangZhCHS <span class="hljs-keyword">from</span> <span class="hljs-string">'./lang/zhCHS'</span>
<span class="hljs-keyword">import</span> LangZhCHT <span class="hljs-keyword">from</span> <span class="hljs-string">'./lang/zhCHT'</span>
<span class="hljs-comment">/* vue-i18n注册 */</span>
Vue.use(VueI18n)
<span class="hljs-comment">// 设置语言项</span>
<span class="hljs-keyword">const</span> i18n = <span class="hljs-keyword">new</span> VueI18n({
  <span class="hljs-attr">locale</span>: <span class="hljs-string">'zhCHS'</span>,
  <span class="hljs-attr">messages</span>: {
    <span class="hljs-string">'en'</span>: LangEn,
    <span class="hljs-string">'zhCHS'</span>: LangZhCHS,
    <span class="hljs-string">'zhCHT'</span>: LangZhCHT
  }
})
<span class="hljs-comment">/* eslint-disable no-new */</span>
<span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
  i18n,
  <span class="hljs-attr">components</span>: { App },
  <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;App/&gt;'</span>
})

</code></pre>
<p>zhCHS.js<br>通过exports</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  buttom: {
    cancel: '取消',
    determine: '确定',
    login: '登陆',
    signOut: '退出登陆',
    registered: '注册',
    search: '查询',
    submit: '提交',
    save: '保存'
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>module.exports = {
  buttom: {
    cance<span class="hljs-variable">l:</span> <span class="hljs-string">'取消'</span>,
    determine: <span class="hljs-string">'确定'</span>,
    login: <span class="hljs-string">'登陆'</span>,
    signOu<span class="hljs-variable">t:</span> <span class="hljs-string">'退出登陆'</span>,
    registered: <span class="hljs-string">'注册'</span>,
    <span class="hljs-built_in">search</span>: <span class="hljs-string">'查询'</span>,
    submi<span class="hljs-variable">t:</span> <span class="hljs-string">'提交'</span>,
    save: <span class="hljs-string">'保存'</span>
  }
}
</code></pre>
<p>Example.vue<br>通过$t进行数据绑定<br>例子中初始化先检查浏览器默认语言，并保存到localstorage中<br>通过this.$i18n.locale可以随意切换版本</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<v-btn flat>"{{"$t('buttom.cancel')"}}"</v-btn>
<v-btn-toggle v-model=&quot;icon&quot;>
  <v-btn flat value=&quot;zhCHS&quot;>
    <span>中文</span>
    <v-icon>format_align_left</v-icon>
  </v-btn>
  <v-btn flat value=&quot;en&quot;>
    <span>English</span>
    <v-icon>format_color_text</v-icon>
  </v-btn>
</v-btn-toggle>


  watch: {
    icon (val) {
      this.$i18n.locale = val
      this.setLocalStorage('PLAY_LANG', val)
    }
  },
  created () {
    let lang = this.getLocalStorage('PLAY_LANG')
    if (lang) {
      this.icon = lang
    } else {
      let defaultLang = this.getNavigatorLang()  // 获取浏览器设置语言
      this.setLocalStorage('PLAY_LANG', defaultLang)
      this.icon = defaultLang
    }
  }
  
  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>&lt;v-btn flat&gt;"{{"$t(<span class="hljs-string">'buttom.cancel'</span>)"}}"&lt;/v-btn&gt;
&lt;v-btn-toggle v-model=<span class="hljs-string">"icon"</span>&gt;
  &lt;v-btn flat value=<span class="hljs-string">"zhCHS"</span>&gt;
    &lt;span&gt;中文&lt;/span&gt;
    &lt;v-icon&gt;format_align_left&lt;/v-icon&gt;
  &lt;/v-btn&gt;
  &lt;v-btn flat value=<span class="hljs-string">"en"</span>&gt;
    &lt;span&gt;English&lt;/span&gt;
    &lt;v-icon&gt;format_color_text&lt;/v-icon&gt;
  &lt;/v-btn&gt;
&lt;/v-btn-toggle&gt;


  watch: {
    icon (<span class="hljs-keyword">val</span>) {
      <span class="hljs-keyword">this</span>.$i18n.locale = <span class="hljs-keyword">val</span>
      <span class="hljs-keyword">this</span>.setLocalStorage(<span class="hljs-string">'PLAY_LANG'</span>, <span class="hljs-keyword">val</span>)
    }
  },
  created () {
    let lang = <span class="hljs-keyword">this</span>.getLocalStorage(<span class="hljs-string">'PLAY_LANG'</span>)
    <span class="hljs-keyword">if</span> (lang) {
      <span class="hljs-keyword">this</span>.icon = lang
    } <span class="hljs-keyword">else</span> {
      let defaultLang = <span class="hljs-keyword">this</span>.getNavigatorLang()  <span class="hljs-comment">// 获取浏览器设置语言</span>
      <span class="hljs-keyword">this</span>.setLocalStorage(<span class="hljs-string">'PLAY_LANG'</span>, defaultLang)
      <span class="hljs-keyword">this</span>.icon = defaultLang
    }
  }
  
  </code></pre>
<p>效果图：<br>中文<br><span class="img-wrap"><img data-src="/img/bV7Z6b?w=1330&amp;h=392" src="https://static.alili.tech/img/bV7Z6b?w=1330&amp;h=392" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>英文<br><span class="img-wrap"><img data-src="/img/bV7Z6R?w=1348&amp;h=393" src="https://static.alili.tech/img/bV7Z6R?w=1348&amp;h=393" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>完整项目github地址：<a href="https://github.com/hty7/vue-demo.git" rel="nofollow noreferrer" target="_blank"></a><a href="https://github.com/hty7/vue-demo.git" rel="nofollow noreferrer" target="_blank">https://github.com/hty7/vue-d...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue 项目的I18n国际化之路

## 原文链接
[https://segmentfault.com/a/1190000014241037](https://segmentfault.com/a/1190000014241037)

