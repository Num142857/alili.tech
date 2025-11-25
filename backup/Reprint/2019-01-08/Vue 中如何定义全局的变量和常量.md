---
title: 'Vue 中如何定义全局的变量和常量' 
date: 2019-01-08 2:30:11
hidden: true
slug: dlt02aw0it
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">Vue 中如何定义全局的变量和常量</h2>
<p>我想要定义一个变量, 在项目的任何地方都可以访问到, 不需要每一次使用的时候, 都引入. </p>
<p><strong>尝试1:</strong> <br>创建 global.js 并且在其中定义</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let a = 10;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">let a</span> = 10;</code></pre>
<p>在入口文件中引入 global.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import './global.js'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> <span class="hljs-string">'./global.js'</span></code></pre>
<p>在项目中使用:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a // 报错
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">a</span> <span class="hljs-comment">// 报错</span>
</code></pre>
<p>发现报错了, a 并没有定义. 为什么?</p>
<p>这个涉及到模块作用域:<br>1 每一个 js 都相当于一个模块, 一个模块有自己的模块作用域. <br>意思就是说: 其中的变量方法, 都只在这个模块上面生效. </p>
<p><strong>尝试2:</strong> <br>将变量放到 Vue.prototype 上面, 通过插件全局引入<br>创建 global.js, 这样写:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let a = 10;
export default {
    install () {
        Vue.prototype.$a = a;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-keyword">let</span> a = <span class="hljs-number">10</span>;
export <span class="hljs-keyword">default</span> {
    install () {
        Vue.prototype.$a = a;
    }
}</code></pre>
<p>在 入口文件中引入:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import G from './global'
Vue.use(G);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> G <span class="hljs-keyword">from</span> <span class="hljs-string">'./global'</span>
Vue.use(G);</code></pre>
<p>在项目中使用:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.$a
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">this</span>.$a
</code></pre>
<p>的确可以, 但是这样的方式并不好, 在任何 this 不指向 Vue 的地方, 你都没有办法使用这个变量. </p>
<p><strong>尝试3:</strong> <br>将变量放到 window 对象上面<br>创建 global.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.a = 10;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code style="word-break: break-word; white-space: initial;">window.a = <span class="hljs-number">10</span><span class="hljs-comment">;</span></code></pre>
<p>在入口文件中引入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import './global.js'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> <span class="hljs-string">'./global.js'</span></code></pre>
<p>在项目中使用:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">a</span> 
</code></pre>
<p>可行, 这种方式只要你能访问到 window 对象, 就能访问到这个变量. <br>有什么缺点吗? <br>暂时没有发现. </p>
<p>实际的场景分析:<br>在实际情景上, 你可能拥有一份配置, 比如说微信公众号开发的时候, 你有一份配置, 写着<br>appId 和 appKey, 希望可以全局访问到. <br>按照上面的讨论, 你应该这么写:</p>
<p>global.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
window.appId = 123;
window.appKey = 'abc';
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>
<span class="hljs-built_in">window</span>.appId = <span class="hljs-number">123</span>;
<span class="hljs-built_in">window</span>.appKey = <span class="hljs-string">'abc'</span>;
</code></pre>
<p>可以很明显的看到, 一旦你要定义的变量或者常量过多, 就能疯了. <br>所以我们希望有一种方式, 我们定义还是按照自己的方式定义:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
appId = 123;
appKey = 'abc';
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code>
<span class="hljs-attribute">appId</span> = 123;
<span class="hljs-attribute">appKey</span> = <span class="hljs-string">'abc'</span>;
</code></pre>
<p>然后有一个方法fn, 可以将这两个参数, 直接绑定到 window 对象上面</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fn (appId, appKey);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code style="word-break: break-word; white-space: initial;"><span class="hljs-function"><span class="hljs-keyword">fn</span> <span class="hljs-params">(appId, appKey)</span></span>;</code></pre>
<p>结果就是 appId, appKey 都会被绑定到 window 对象上面. </p>
<p>实现:<br>你需要传递一个对象给方法 fn, fn 负责将这个对象中的每一个 key 都绑定到 window 对象上面.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
let bindToGlobal = obj => {
    for (let key in obj) {
        window[key] = obj[key]
    }
}

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-keyword">let</span> bindToGlobal = <span class="hljs-function"><span class="hljs-params">obj</span> =&gt;</span> {
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> key <span class="hljs-keyword">in</span> obj) {
        <span class="hljs-built_in">window</span>[key] = obj[key]
    }
}

</code></pre>
<p>更新版本:<br>你这样用之后, 所有的变量/常量都绑定在 window 对象上面, 很容易就和已经存在 window 对象上面的变量<br>冲突, 所以要收敛你的行为, 这样:<br>你先在window 对象上面设置一个属性, 属性值是一个对象, 比如这样:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
window.key = {};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code>
<span class="hljs-built_in">window</span>.<span class="hljs-built_in">key</span> = {};
</code></pre>
<p>然后将你所有需要设置的全局变量, 方法, 都放到 window.key 里面而不是 window 上面.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
let bindToGlobal = obj => {
    window.abc = {};
    for (let key in obj) {
        window.abc[key] = obj[key]
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-keyword">let</span> bindToGlobal = <span class="hljs-function"><span class="hljs-params">obj</span> =&gt;</span> {
    <span class="hljs-built_in">window</span>.abc = {};
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> key <span class="hljs-keyword">in</span> obj) {
        <span class="hljs-built_in">window</span>.abc[key] = obj[key]
    }
}
</code></pre>
<p>更近一步, 可以让这个 key 的名字为 _const 或者 _var, 或者让用户自己控制这个变量的名字.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
let bindToGlobal = (obj, key='var') => {
    window[key] = {};
    for (let i in obj) {
        window[key][i] = obj[i]
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-keyword">let</span> bindToGlobal = <span class="hljs-function">(<span class="hljs-params">obj, key=<span class="hljs-string">'var'</span></span>) =&gt;</span> {
    <span class="hljs-built_in">window</span>[key] = {};
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i <span class="hljs-keyword">in</span> obj) {
        <span class="hljs-built_in">window</span>[key][i] = obj[i]
    }
}
</code></pre>
<p>现在大致已经可以了, 然后你要解决一下, 如果重复调用 'bindToGlobal' 后面的会覆盖掉前面<br>所定义的 变量/常量, 而我们要的是 追加, 不是覆盖, 所以代码做个调整:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
let bindToGlobal = (obj, key='var') => {
    if (typeof window[key] === 'undefined') {
        window[key] = {};
    }
    
    for (let i in obj) {
        window[key][i] = obj[i]
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-keyword">let</span> bindToGlobal = <span class="hljs-function">(<span class="hljs-params">obj, key=<span class="hljs-string">'var'</span></span>) =&gt;</span> {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">window</span>[key] === <span class="hljs-string">'undefined'</span>) {
        <span class="hljs-built_in">window</span>[key] = {};
    }
    
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i <span class="hljs-keyword">in</span> obj) {
        <span class="hljs-built_in">window</span>[key][i] = obj[i]
    }
}
</code></pre>
<p>到这里已经结束了. <br>最后对 'bindToGlobal' 做一个修改, 使得你以后使用的时候比较简单方便一点</p>
<h2 id="articleHeader1">讨论一下:</h2>
<p>虽然开放了绑定在 window 对象上面的对象的名字, 但是你是不是就可以随便起名字?</p>
<p>假设你有两份配置, 都是常量, <br>一份是 http.js, 配置了全局请求的域名<br>一份是 wexin.js 配置了公众号里面的一些 appId, appkey </p>
<p>你是这样绑定呢:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="bindToGlobal(http, '_http');
bindToGlobal(wexin, '_wexin');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code>bindToGlobal(<span class="hljs-name">http</span>, '_http')<span class="hljs-comment">;</span>
bindToGlobal(<span class="hljs-name">wexin</span>, '_wexin')<span class="hljs-comment">;</span></code></pre>
<p>这样访问:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="_http.host 
_wexin.appId
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>_http<span class="hljs-selector-class">.host</span> 
_wexin<span class="hljs-selector-class">.appId</span>
</code></pre>
<p>还是按照它是常量还是变量去绑定:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="bindToGlobal(httpConfig, '_const');
bindToGlobal(wexin, '_const');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code>bindToGlobal(<span class="hljs-name">httpConfig</span>, '_const')<span class="hljs-comment">;</span>
bindToGlobal(<span class="hljs-name">wexin</span>, '_const')<span class="hljs-comment">;</span></code></pre>
<p>这样访问:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="_const.host;
_const.appId;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code>_const.host<span class="hljs-comment">;</span>
_const.appId<span class="hljs-comment">;</span>
</code></pre>
<p>前者语义上面肯定是优秀的, 但是我考虑的不是这么一个点:<br>1 如果有新人要来维护你的代码, 他想访问一个常量, 要先知道你定义的常量的名字是什么, 比如知道了<br>  是 'wexin', 然后再知道那个变量的名字是啥, 比如说 appId, 这个时候才能访问:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="wexin.appId;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code style="word-break: break-word; white-space: initial;">wexin.appId<span class="hljs-comment">;</span></code></pre>
<p>而如果你统一都是用 '_const', 他只要去配置文件里面看下名字是 appId, 就可以这么用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="_const.appId; // over
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs objectivec"><code>_<span class="hljs-keyword">const</span>.appId; <span class="hljs-comment">// over</span>
</code></pre>
<p>也就是说 牺牲语义, 换来维护简单一点. <br>试想如果追求语义, 你分的非常细, 定了七八个 key。</p>
<p>2 记忆上面的问题, 未来的你, 放了几个月再来维护的时候, 或者某天你搞这个项目都搞的要吐了, 新访问<br>一个变量的时候, 还要想一下 key 名字, 怂.<br>而统一 _const.appId, 多简单的事情.</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue 中如何定义全局的变量和常量

## 原文链接
[https://segmentfault.com/a/1190000010168571](https://segmentfault.com/a/1190000010168571)

