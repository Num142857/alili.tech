---
title: 'vue开发小想法' 
date: 2019-01-25 2:30:23
hidden: true
slug: 227hyo2y1hw
categories: [reprint]
---

{{< raw >}}

                    
<p>这周入职新公司，公司这边用vue框架，我习惯使用typescript来写东西，vue搞出了.vue文件，连js都不算，在.vue文件中ts/js的代码提示，补全都没有了，对于我这样有小偏执的人来说，不能接受。</p>
<p>vue英文官网推荐了一个叫<a href="https://www.npmjs.com/package/vue-class-component" rel="nofollow noreferrer" target="_blank">vue-class-component</a>的包，可以以class的模式写vue组件。vue-class-component(以下简称Component)带来了很多便利：</p>
<ol>
<li><p>methods，钩子都可以直接写作class的方法</p></li>
<li><p>computed属性可以直接通过get来获得</p></li>
<li><p>初始化data可以声明为class的属性</p></li>
<li><p>其他的都可以放到Component装饰器里<br>举个小例子</p></li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Component({
    props: {
        firstName: String,
        lastName: String
    },
    components: {
        'component-a': ComponentA
    }
})
export class XXXX extends Vue {
    firstName: string;
    lastName: string;
    
    //初始data
    middleName = 'middle';
    
    //computed 属性
    get fullName() {
        return this.firstName + this.lastName;
    }
    
    //method
    hello() {
        alert(`Hello ${this.fullName}!`);
    }
    
    //钩子
    mounted() {
        this.hello();
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-meta">@Component</span>({
    props: {
        firstName: <span class="hljs-type">String</span>,
        lastName: <span class="hljs-type">String</span>
    },
    components: {
        <span class="hljs-symbol">'component</span>-a': <span class="hljs-type">ComponentA</span>
    }
})
export <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">XXXX</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Vue</span> </span>{
    firstName: string;
    lastName: string;
    
    <span class="hljs-comment">//初始data</span>
    middleName = <span class="hljs-symbol">'middl</span>e';
    
    <span class="hljs-comment">//computed 属性</span>
    get fullName() {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.firstName + <span class="hljs-keyword">this</span>.lastName;
    }
    
    <span class="hljs-comment">//method</span>
    hello() {
        alert(`<span class="hljs-type">Hello</span> ${<span class="hljs-keyword">this</span>.fullName}!`);
    }
    
    <span class="hljs-comment">//钩子</span>
    mounted() {
        <span class="hljs-keyword">this</span>.hello();
    }
}</code></pre>
<p>现在尽管可以以class的模式来写vue的组件了，但自动补全，代码提示等功能还是没有，至少我用的vscode没有这个功能，跑个题先，vscode真的非常棒，不愧是微软出品，写typescript超级赞，加上jsconfig.json写javascript也很不错，vscode出来之前我都是用sublime text，vscode不断出新功能，sublime就替补了。话归正题，要想获取好的代码提示还得是原语言啊，js代码在.ts,.js文件写，scss在.scss写,html在.html写</p>
<p>最终vue组件以以下方式写感觉挺爽，很顺</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue';
import Componet from 'vue-class-component';

require('./XXX.template.scss');

@Component({
    template: require('./XXX.template.html'),
    props: {
        firstName: String,
        lastName: String
    },
    components: {
        'component-a': ComponentA
    }
})
export class XXXX extends Vue {
    firstName: string;
    lastName: string;
    
    //初始data
    middleName = 'middle';
    
    //computed 属性
    get fullName() {
        return this.firstName + this.lastName;
    }
    
    //method
    hello() {
        alert(`Hello ${this.fullName}!`);
    }
    
    //钩子
    mounted() {
        this.hello();
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-type">Vue</span> from <span class="hljs-symbol">'vu</span>e';
<span class="hljs-keyword">import</span> <span class="hljs-type">Componet</span> from <span class="hljs-symbol">'vue</span>-<span class="hljs-class"><span class="hljs-keyword">class</span><span class="hljs-title">-component</span>'</span>;

require('./<span class="hljs-type">XXX</span>.template.scss');

<span class="hljs-meta">@Component</span>({
    template: require('./<span class="hljs-type">XXX</span>.template.html'),
    props: {
        firstName: <span class="hljs-type">String</span>,
        lastName: <span class="hljs-type">String</span>
    },
    components: {
        <span class="hljs-symbol">'component</span>-a': <span class="hljs-type">ComponentA</span>
    }
})
export <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">XXXX</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Vue</span> </span>{
    firstName: string;
    lastName: string;
    
    <span class="hljs-comment">//初始data</span>
    middleName = <span class="hljs-symbol">'middl</span>e';
    
    <span class="hljs-comment">//computed 属性</span>
    get fullName() {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.firstName + <span class="hljs-keyword">this</span>.lastName;
    }
    
    <span class="hljs-comment">//method</span>
    hello() {
        alert(`<span class="hljs-type">Hello</span> ${<span class="hljs-keyword">this</span>.fullName}!`);
    }
    
    <span class="hljs-comment">//钩子</span>
    mounted() {
        <span class="hljs-keyword">this</span>.hello();
    }
}</code></pre>
<p>现在各个文件回归它的本职工作了，哈哈哈，不过现在打包时有点小问题，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[Vue warn]: You are using the runtime-only build of Vue where the template option is not available. Either pre-compile the templates into render functions, or use the compiler-included build." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs n1ql"><code style="word-break: break-word; white-space: initial;">[Vue warn]: You are using the runtime-only <span class="hljs-keyword">build</span> of Vue <span class="hljs-keyword">where</span> the template <span class="hljs-keyword">option</span> <span class="hljs-keyword">is</span> <span class="hljs-keyword">not</span> available. Either pre-compile the templates <span class="hljs-keyword">into</span> render functions, <span class="hljs-keyword">or</span> <span class="hljs-keyword">use</span> the compiler-included <span class="hljs-keyword">build</span>.</code></pre>
<p>解决方法也很简单，在webpack配置文件里 加上</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="alias: {
    'vue': 'vue/dist/vue.esm.js'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code><span class="hljs-built_in">alias</span>: {
    <span class="hljs-string">'vue'</span>: <span class="hljs-string">'vue/dist/vue.esm.js'</span>
}</code></pre>
<p>即可。好的，现在代码补全，语法提示什么功能都回来了</p>
<p>不使用typescript，也可以写javascript,通过babel来编译也是可以的</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue开发小想法

## 原文链接
[https://segmentfault.com/a/1190000008560547](https://segmentfault.com/a/1190000008560547)

