---
title: '可能是最全的Vue-TypeScript教程(附实例代码和一键构建工具)' 
date: 2018-12-21 2:30:11
hidden: true
slug: lxn9ilbvhi
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bV0ypg?w=484&amp;h=220" src="https://static.alili.tech/img/bV0ypg?w=484&amp;h=220" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h1 id="articleHeader0">Vue-TypeScript-DpApp-Demo</h1>
<h2 id="articleHeader1">功能</h2>
<ul>
<li>轮播</li>
<li>搜索</li>
<li>列表</li>
<li>懒加载</li>
<li>简单动画</li>
<li>loading</li>
<li>vue-router.ts</li>
<li>vuex.ts</li>
<li>vue-class-component使用</li>
<li>vuex-class使用</li>
<li>xxx.d.ts声明文件</li>
<li>基于类的编写方式</li>
<li>mock数据</li>
<li>tsconfig.json</li>
<li>webpack配置</li>
<li><b>vue-typescript-cli</b></li>
</ul>
<p>项目地址：<a href="https://github.com/SimonZhangITer/vue-typescript-dpapp-demo" rel="nofollow noreferrer" target="_blank">https://github.com/SimonZhang...</a></p>
<h2 id="articleHeader2">完成后的简单例子</h2>
<p>基于类的写法加上静态类型检查，简直不能再嗨</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script lang=&quot;ts&quot;>
import Vue from &quot;vue&quot;;
import Component from &quot;vue-class-component&quot;;
import { State } from &quot;vuex-class&quot;;

@Component
export default class Shops extends Vue {
  @State shops: StoreState.shop[];
  @State searchVal: string;

  get shopList(): StoreState.shop[] {
    const shops = this.shops;
    const searchVal = this.searchVal;
    return shops.filter(
      (el: StoreState.shop) => el.shopName.indexOf(searchVal) > -1
    );
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">&lt;script lang=<span class="hljs-string">"ts"</span>&gt;
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">"vue"</span>;
<span class="hljs-keyword">import</span> Component <span class="hljs-keyword">from</span> <span class="hljs-string">"vue-class-component"</span>;
<span class="hljs-keyword">import</span> { State } <span class="hljs-keyword">from</span> <span class="hljs-string">"vuex-class"</span>;

@Component
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Shops</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Vue</span> </span>{
  @State shops: StoreState.shop[];
  @State searchVal: string;

  get shopList(): StoreState.shop[] {
    <span class="hljs-keyword">const</span> shops = <span class="hljs-keyword">this</span>.shops;
    <span class="hljs-keyword">const</span> searchVal = <span class="hljs-keyword">this</span>.searchVal;
    <span class="hljs-keyword">return</span> shops.filter(
      <span class="hljs-function">(<span class="hljs-params">el: StoreState.shop</span>) =&gt;</span> el.shopName.indexOf(searchVal) &gt; <span class="hljs-number">-1</span>
    );
  }
}
&lt;<span class="hljs-regexp">/script&gt;</span></code></pre>
<h1 id="articleHeader3">为什么使用TypeScript</h1>
<h3 id="articleHeader4">1. JavaScript的超集</h3>
<p>支持所有原生JavaScript的语法</p>
<h3 id="articleHeader5">2. 强类型语言</h3>
<p>现在很多主流语言都是强类型的，而这点也一直是JavaScript所被人诟病的地方。使用TypeScript之后，将会在代码调试、重构等步骤节省很多时间。</p>
<blockquote>比如说：函数在返回值的时候可能经过复杂的操作，那我们如果想要知道这个值的结构就需要去仔细阅读这段代码。那如果有了TypeScript之后，直接就可以看到函数的返回值结构，将会非常的方便</blockquote>
<h3 id="articleHeader6">3. 强大的IDE支持</h3>
<p>现在的主流编辑器如<code>VSCode</code>、<code>WebStorm</code>、<code>Atom</code>、<code>Sublime</code>等都对TypeScript有着非常友好的支持，主要体现在智能提示上，非常的方便</p>
<h3 id="articleHeader7">4. 可运行于任何浏览器、计算机、操作系统</h3>
<p>强大的编译引擎</p>
<h3 id="articleHeader8">5. 迭代更新快</h3>
<p>不断更新，提供更加方便友好的Api</p>
<h3 id="articleHeader9">6. 微软和Google爸爸</h3>
<p>TypeScript是微软开发的语言，而Google的<code>Angular</code>使用的就是TypeScript，所以不用担心会停止维护，至少在近几年内TypeScript都会一门主流开发语言</p>
<h3 id="articleHeader10">7. npm下载量非常高</h3>
<p>截止2017.12.17, TypeScript在全球范围内的npm日均下载量在<code>30w</code>左右，这个数字将近是vue下载量的10倍，可见TypeScript还是非常受欢迎的</p>
<h1 id="articleHeader11">Vue-TypeScript-Cli</h1>
<p>官方虽然明确提出对TypeScript的支持，但是并没有明确的配置文档，自己在配置的时候还是需要查阅很多资料以及踩很多坑的（这个过程真的很蓝瘦-_-）</p>
<p>但是现在可以不用踩这个坑啦，我基于官方的<code>vue-cli</code>写了一个<a href="https://github.com/SimonZhangITer/vue-typescript-template" rel="nofollow noreferrer" target="_blank">vue-typescript-cli</a>，可以一键构建TypeScript模板</p>
<h3 id="articleHeader12">用法</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vue init SimonZhangITer/vue-typescript-template <project-name>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">vue init SimonZhangITer/vue-typescript-template &lt;project-name&gt;</code></pre>
<p>比如</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vue init SimonZhangITer/vue-typescript-template my-project" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">vue init SimonZhangITer/vue-typescript-template my-project</code></pre>
<p>然后配置好的TypeScript模板就下载到<code>./my-project</code>文件夹了，<code>npm run dev</code>即可运行</p>
<h1 id="articleHeader13">TypeScript配置</h1>
<p>这里记录一下当时的踩坑过程，所有配置已经在<a href="https://github.com/SimonZhangITer/vue-typescript-template" rel="nofollow noreferrer" target="_blank">vue-typescript-template</a>配置完毕</p>
<h2 id="articleHeader14">1. Webpack</h2>
<h4>安装ts-loader</h4>
<p>首先需要安装<code>ts-loader</code>，这是TypeScript为Webpack提供的编译器，类似于<code>babel-loader</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i ts-loader -D" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm i ts-loader -D</code></pre>
<h4>配置rules</h4>
<p>接着在Webpack的<code>module.rules</code>里面添加对ts的支持(我这里的webpack版本是2.x)：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    test: /\.vue$/,
    loader: 'vue-loader',
    options: vueLoaderConfig
},
{
    test: /\.ts$/,
    loader: 'ts-loader',
    options: {
      appendTsSuffixTo: [/\.vue$/],
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
    <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.vue$/</span>,
    <span class="hljs-attr">loader</span>: <span class="hljs-string">'vue-loader'</span>,
    <span class="hljs-attr">options</span>: vueLoaderConfig
},
{
    <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.ts$/</span>,
    <span class="hljs-attr">loader</span>: <span class="hljs-string">'ts-loader'</span>,
    <span class="hljs-attr">options</span>: {
      <span class="hljs-attr">appendTsSuffixTo</span>: [<span class="hljs-regexp">/\.vue$/</span>],
    }
}</code></pre>
<h4>配置extensions</h4>
<p>添加可识别文件后缀对ts的支持，如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="extensions: ['.js', '.vue', '.json', '.ts']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">extensions: [<span class="hljs-string">'.js'</span>, <span class="hljs-string">'.vue'</span>, <span class="hljs-string">'.json'</span>, <span class="hljs-string">'.ts'</span>]</code></pre>
<h2 id="articleHeader15">2. tsconfig.json</h2>
<p>创建tsconfig.json文件，放在根目录下，和<code>package.json</code>同级</p>
<p>配置内容主要也看个人需求，具体可以去typescript的官网查看，但是有一点需要注意：</p>
<blockquote>在Vue中，你需要引入 strict: true (或者至少 noImplicitThis: true，这是 strict 模式的一部分) 以利用组件方法中 this 的类型检查，否则它会始终被看作 any 类型。</blockquote>
<p>这里列出我的配置，功能在注释中给出</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;include&quot;: [
    &quot;src/*&quot;,
    &quot;src/**/*&quot;
  ],
  &quot;exclude&quot;: [
    &quot;node_modules&quot;
  ],
  &quot;compilerOptions&quot;: {
    // types option has been previously configured
    &quot;types&quot;: [
      // add node as an option
      &quot;node&quot;
    ],
    // typeRoots option has been previously configured
    &quot;typeRoots&quot;: [
      // add path to @types
      &quot;node_modules/@types&quot;
    ],
    // 以严格模式解析
    &quot;strict&quot;: true,
    // 在.tsx文件里支持JSX
    &quot;jsx&quot;: &quot;preserve&quot;,
    // 使用的JSX工厂函数
    &quot;jsxFactory&quot;: &quot;h&quot;,
    // 允许从没有设置默认导出的模块中默认导入
    &quot;allowSyntheticDefaultImports&quot;: true,
    // 启用装饰器
    &quot;experimentalDecorators&quot;: true,
    &quot;strictFunctionTypes&quot;: false,
    // 允许编译javascript文件
    &quot;allowJs&quot;: true,
    // 采用的模块系统
    &quot;module&quot;: &quot;esnext&quot;,
    // 编译输出目标 ES 版本
    &quot;target&quot;: &quot;es5&quot;,
    // 如何处理模块
    &quot;moduleResolution&quot;: &quot;node&quot;,
    // 在表达式和声明上有隐含的any类型时报错
    &quot;noImplicitAny&quot;: true,
    &quot;lib&quot;: [
      &quot;dom&quot;,
      &quot;es5&quot;,
      &quot;es6&quot;,
      &quot;es7&quot;,
      &quot;es2015.promise&quot;
    ],
    &quot;sourceMap&quot;: true,
    &quot;pretty&quot;: true
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
  <span class="hljs-string">"include"</span>: [
    <span class="hljs-string">"src/*"</span>,
    <span class="hljs-string">"src/**/*"</span>
  ],
  <span class="hljs-string">"exclude"</span>: [
    <span class="hljs-string">"node_modules"</span>
  ],
  <span class="hljs-string">"compilerOptions"</span>: {
    <span class="hljs-comment">// types option has been previously configured</span>
    <span class="hljs-string">"types"</span>: [
      <span class="hljs-comment">// add node as an option</span>
      <span class="hljs-string">"node"</span>
    ],
    <span class="hljs-comment">// typeRoots option has been previously configured</span>
    <span class="hljs-string">"typeRoots"</span>: [
      <span class="hljs-comment">// add path to @types</span>
      <span class="hljs-string">"node_modules/@types"</span>
    ],
    <span class="hljs-comment">// 以严格模式解析</span>
    <span class="hljs-string">"strict"</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-comment">// 在.tsx文件里支持JSX</span>
    <span class="hljs-string">"jsx"</span>: <span class="hljs-string">"preserve"</span>,
    <span class="hljs-comment">// 使用的JSX工厂函数</span>
    <span class="hljs-string">"jsxFactory"</span>: <span class="hljs-string">"h"</span>,
    <span class="hljs-comment">// 允许从没有设置默认导出的模块中默认导入</span>
    <span class="hljs-string">"allowSyntheticDefaultImports"</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-comment">// 启用装饰器</span>
    <span class="hljs-string">"experimentalDecorators"</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-string">"strictFunctionTypes"</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-comment">// 允许编译javascript文件</span>
    <span class="hljs-string">"allowJs"</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-comment">// 采用的模块系统</span>
    <span class="hljs-string">"module"</span>: <span class="hljs-string">"esnext"</span>,
    <span class="hljs-comment">// 编译输出目标 ES 版本</span>
    <span class="hljs-string">"target"</span>: <span class="hljs-string">"es5"</span>,
    <span class="hljs-comment">// 如何处理模块</span>
    <span class="hljs-string">"moduleResolution"</span>: <span class="hljs-string">"node"</span>,
    <span class="hljs-comment">// 在表达式和声明上有隐含的any类型时报错</span>
    <span class="hljs-string">"noImplicitAny"</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-string">"lib"</span>: [
      <span class="hljs-string">"dom"</span>,
      <span class="hljs-string">"es5"</span>,
      <span class="hljs-string">"es6"</span>,
      <span class="hljs-string">"es7"</span>,
      <span class="hljs-string">"es2015.promise"</span>
    ],
    <span class="hljs-string">"sourceMap"</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-string">"pretty"</span>: <span class="hljs-literal">true</span>
  }
}</code></pre>
<h2 id="articleHeader16">3. 修改main.js</h2>
<ol><li>把项目主文件<code>main.js</code>修改成<code>main.ts</code>，里面的写法基本不变，但是有一点需要注意：</li></ol>
<p>引入Vue文件的时候需要加上<code>.vue</code>后缀,否则编辑器识别不到</p>
<ol><li>把webpack的entry文件也修改成<code>main.ts</code>
</li></ol>
<h2 id="articleHeader17">4. vue-shims.d.ts</h2>
<p>TypeScript并不支持Vue文件，所以需要告诉TypeScript<code>*.vue</code>文件交给vue编辑器来处理。解决方案就是在创建一个vue-shims.d.ts文件，建议放在src目录下再创建一个<code>typings</code>文件夹，把这个声明文件放进去，如：<code>src/typings/vue-shims.d.ts</code>，文件内容：</p>
<blockquote>
<code>*.d.ts</code>类型文件不需要手动引入，TypeScript会自动加载</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">declare <span class="hljs-built_in">module</span> <span class="hljs-string">'*.vue'</span> {
  <span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Vue
}</code></pre>
<p>到这里TypeScript在Vue中配置就完成了，可以愉快的撸代码了~</p>
<h1 id="articleHeader18">第三方插件库</h1>
<p>现在Vue官方已经明确提出支持TypeScript，并考虑出一个对应的<code>vue-cli</code>，在这之前，Vue开发团队已经开发出了一些插件库来支持TypeScript，这里简单和大家介绍一下。</p>
<h3 id="articleHeader19">Vue-Class-Component</h3>
<p><a href="https://github.com/vuejs/vue-class-component" rel="nofollow noreferrer" target="_blank">vue-class-component</a>是官方维护的TypeScript装饰器，写法比较扁平化。Vue对其做到完美兼容，如果你在声明组件时更喜欢基于类的 API，这个库一定不要错过</p>
<p>ps：用了这个装饰器之后写方法不需要额外加逗号，贼嗨~~~</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from &quot;vue&quot;;
import Component from &quot;vue-class-component&quot;;

@Component
export default class App extends Vue {
  name:string = 'Simon Zhang'

  // computed
  get MyName():string {
    return `My name is ${this.name}`
  }

  // methods
  sayHello():void {
    alert(`Hello ${this.name}`)
  }

  mounted() {
    this.sayHello();
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">"vue"</span>;
<span class="hljs-keyword">import</span> Component <span class="hljs-keyword">from</span> <span class="hljs-string">"vue-class-component"</span>;

@Component
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Vue</span> </span>{
  name:string = <span class="hljs-string">'Simon Zhang'</span>

  <span class="hljs-comment">// computed</span>
  get MyName():string {
    <span class="hljs-keyword">return</span> <span class="hljs-string">`My name is <span class="hljs-subst">${<span class="hljs-keyword">this</span>.name}</span>`</span>
  }

  <span class="hljs-comment">// methods</span>
  sayHello():<span class="hljs-keyword">void</span> {
    alert(<span class="hljs-string">`Hello <span class="hljs-subst">${<span class="hljs-keyword">this</span>.name}</span>`</span>)
  }

  mounted() {
    <span class="hljs-keyword">this</span>.sayHello();
  }
}</code></pre>
<p>这个代码如果用原生Vue语法来写的话就是这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
  data () {
    return {
      name: 'Simon Zhang'
    }
  },

  mounted () {
    this.sayHello()
  },

  computed: {
    MyName() {
      return `My name is ${this.name}`
    }
  },

  methods: {
    sayHello() {
      alert(`Hello ${this.name}`)
    },
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">name</span>: <span class="hljs-string">'Simon Zhang'</span>
    }
  },

  mounted () {
    <span class="hljs-keyword">this</span>.sayHello()
  },

  <span class="hljs-attr">computed</span>: {
    MyName() {
      <span class="hljs-keyword">return</span> <span class="hljs-string">`My name is <span class="hljs-subst">${<span class="hljs-keyword">this</span>.name}</span>`</span>
    }
  },

  <span class="hljs-attr">methods</span>: {
    sayHello() {
      alert(<span class="hljs-string">`Hello <span class="hljs-subst">${<span class="hljs-keyword">this</span>.name}</span>`</span>)
    },
  }
}</code></pre>
<h3 id="articleHeader20">Vuex-Class</h3>
<p><a href="https://github.com/ktsn/vuex-class" rel="nofollow noreferrer" target="_blank">vuex-class</a>是基于基于<code>vue-class-component</code>对Vuex提供的装饰器。它的作者同时也是<code>vue-class-component</code>的主要贡献者，质量还是有保证的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from &quot;vue&quot;;
import Component from &quot;vue-class-component&quot;;
import { State, Action, Getter } from &quot;vuex-class&quot;;

@Component
export default class App extends Vue {
  name:string = 'Simon Zhang'
  @State login: boolean;
  @Action initAjax: () => void;
  @Getter load: boolean;

  get isLogin(): boolean {
    return this.login;
  }

  mounted() {
    this.initAjax();
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">"vue"</span>;
<span class="hljs-keyword">import</span> Component <span class="hljs-keyword">from</span> <span class="hljs-string">"vue-class-component"</span>;
<span class="hljs-keyword">import</span> { State, Action, Getter } <span class="hljs-keyword">from</span> <span class="hljs-string">"vuex-class"</span>;

@Component
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Vue</span> </span>{
  name:string = <span class="hljs-string">'Simon Zhang'</span>
  @State login: boolean;
  @Action initAjax: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">void</span>;
  @Getter load: boolean;

  get isLogin(): boolean {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.login;
  }

  mounted() {
    <span class="hljs-keyword">this</span>.initAjax();
  }
}</code></pre>
<p>上面的代码就相当于：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
  data() {
    return {
      name: 'Simon Zhang'
    }
  },

  mounted() {
    this.initAjax()
  },

  computed: {
    login() {
      return this.$store.state.login
    },
    load() {
      return this.$store.getters.load
    }
  },

  methods: {
    initAjax() {
      this.$store.dispatch('initAjax')
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  data() {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">name</span>: <span class="hljs-string">'Simon Zhang'</span>
    }
  },

  mounted() {
    <span class="hljs-keyword">this</span>.initAjax()
  },

  <span class="hljs-attr">computed</span>: {
    login() {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$store.state.login
    },
    load() {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$store.getters.load
    }
  },

  <span class="hljs-attr">methods</span>: {
    initAjax() {
      <span class="hljs-keyword">this</span>.$store.dispatch(<span class="hljs-string">'initAjax'</span>)
    }
  }
}</code></pre>
<h3 id="articleHeader21">Vue-Property-Decorator</h3>
<p><a href="https://github.com/kaorun343/vue-property-decorator" rel="nofollow noreferrer" target="_blank">vue-property-decorator</a> 是在 vue-class-component 上增强了更多的结合 Vue 特性的装饰器，新增了这 7 个装饰器</p>
<ul>
<li><code>@Emit</code></li>
<li><code>@Inject</code></li>
<li><code>@Model</code></li>
<li><code>@Prop</code></li>
<li><code>@Provide</code></li>
<li><code>@Watch</code></li>
<li>
<code>@Component</code> (从 vue-class-component 继承)</li>
</ul>
<h1 id="articleHeader22">坑</h1>
<h3 id="articleHeader23">引入部分第三方库的时候需要额外声明文件</h3>
<p>比如说我想引入<code>vue-lazyload</code>,虽然已经在本地安装，但是typescript还是提示找不到模块。原因是typescript是从<code>node_modules/@types</code>目录下去找模块声明，有些库并没有提供typescript的声明文件，所以就需要自己去添加</p>
<p>解决办法：在<code>src/typings</code>目前下建一个<code>tools.d.ts</code>文件，声明这个模块即可</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="declare module 'vue-awesome-swiper' {
  export const swiper: any
  export const swiperSlide: any
}

declare module 'vue-lazyload'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">declare <span class="hljs-built_in">module</span> <span class="hljs-string">'vue-awesome-swiper'</span> {
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> swiper: any
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> swiperSlide: any
}

declare <span class="hljs-built_in">module</span> <span class="hljs-string">'vue-lazyload'</span></code></pre>
<h3 id="articleHeader24">对vuex的支持不是很好</h3>
<p>在TypeScript里面使用不了mapState、mapGetters等方法，只能一个变量一个变量的去引用，这个要麻烦不少。不过使用<code>vuex-class</code>库之后，写法上也还算简洁美观</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default class modules extends Vue {
  @State login: boolean; // 对应this.$store.state.login
  @State headline: StoreState.headline[]; // 对应this.$store.state.headline

  private swiperOption: Object = {
    autoplay: true,
    loop: true,
    direction: &quot;vertical&quot;
  };

  logoClick(): void {
    alert(&quot;点我干嘛&quot;);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">modules</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Vue</span> </span>{
  @State login: boolean; <span class="hljs-comment">// 对应this.$store.state.login</span>
  @State headline: StoreState.headline[]; <span class="hljs-comment">// 对应this.$store.state.headline</span>

  private swiperOption: <span class="hljs-built_in">Object</span> = {
    <span class="hljs-attr">autoplay</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">loop</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">direction</span>: <span class="hljs-string">"vertical"</span>
  };

  logoClick(): <span class="hljs-keyword">void</span> {
    alert(<span class="hljs-string">"点我干嘛"</span>);
  }
}</code></pre>
<h1 id="articleHeader25">总结</h1>
<p>TypeScript还是非常值得学习和使用一个语言，还是有很多优点的</p>
<p>欢迎大家对我的项目提建议，欢迎Star~<br>项目地址：<a href="https://github.com/SimonZhangITer/vue-typescript-dpapp-demo" rel="nofollow noreferrer" target="_blank">https://github.com/SimonZhang...</a></p>
<p>QQ交流群：323743292</p>
<h2 id="articleHeader26">Build Setup</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 安装依赖
npm install

# 启动项目
npm run dev

# 打包项目
npm run build" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-comment"># 安装依赖</span>
npm install

<span class="hljs-comment"># 启动项目</span>
npm run dev

<span class="hljs-comment"># 打包项目</span>
npm run build</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
可能是最全的Vue-TypeScript教程(附实例代码和一键构建工具)

## 原文链接
[https://segmentfault.com/a/1190000012486378](https://segmentfault.com/a/1190000012486378)

