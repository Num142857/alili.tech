---
title: '在Vue2，Vue-cli中使用Typescript需要的配置' 
date: 2019-01-07 2:30:11
hidden: true
slug: 93ubdvjufp9
categories: [reprint]
---

{{< raw >}}

                    
<p>公司的团队最近热衷于vue框架，新项目想着练练typescript，于是开始了vue+ts的踩坑之路...<br>本文意在为和我有一样想法的伙伴们省去踩坑的时间</p>
<hr>
<p>1.初步配置</p>
<p>首先安装官方插件vue-class-component，vue-property-decorator，配置webpack。<br>webpack配置如下：<br>修改入口文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="entry: {
  app: './src/main.ts'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">entry</span>: {
  <span class="hljs-attribute">app</span>: <span class="hljs-string">'./src/main.ts'</span>
}</code></pre>
<p>resolve部分：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="extensions: ['.js', '.vue', '.json', '.ts', '.tsx']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code style="word-break: break-word; white-space: initial;"><span class="hljs-string">extensions:</span> [<span class="hljs-string">'.js'</span>, <span class="hljs-string">'.vue'</span>, <span class="hljs-string">'.json'</span>, <span class="hljs-string">'.ts'</span>, <span class="hljs-string">'.tsx'</span>]</code></pre>
<p>配置loader</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    test: /\.tsx?$/,
    loader: 'ts-loader',
    exclude: /node_modules/,
    options: {
      appendTsSuffixTo: [/\.vue$/],
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code>{
    test: <span class="hljs-regexp">/\.tsx?$/</span>,
    loader: <span class="hljs-string">'ts-loader'</span>,
    <span class="hljs-keyword">exclude</span>: <span class="hljs-regexp">/node_modules/</span>,
    <span class="hljs-keyword">options</span>: {
      appendTsSuffixTo: [<span class="hljs-regexp">/\.vue$/</span>],
    }
  }</code></pre>
<p>配置tsconfig.json</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;include&quot;: [
    &quot;src/**/*&quot;
  ],
  &quot;exclude&quot;: [
    &quot;node_modules&quot;
  ],
  &quot;compilerOptions&quot;: {
    &quot;allowSyntheticDefaultImports&quot;: true,
    &quot;experimentalDecorators&quot;: true,
    &quot;allowJs&quot;: true,
    &quot;module&quot;: &quot;es2015&quot;,
    &quot;target&quot;: &quot;es5&quot;,
    &quot;moduleResolution&quot;: &quot;node&quot;,
    &quot;experimentalDecorators&quot;: true,
    &quot;isolatedModules&quot;: true,
    &quot;lib&quot;: [
      &quot;dom&quot;,
      &quot;es5&quot;,
      &quot;es2015.promise&quot;
    ],
    &quot;sourceMap&quot;: true,
    &quot;pretty&quot;: true
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"include"</span>: [
    <span class="hljs-string">"src/**/*"</span>
  ],
  <span class="hljs-attr">"exclude"</span>: [
    <span class="hljs-string">"node_modules"</span>
  ],
  <span class="hljs-attr">"compilerOptions"</span>: {
    <span class="hljs-attr">"allowSyntheticDefaultImports"</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">"experimentalDecorators"</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">"allowJs"</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">"module"</span>: <span class="hljs-string">"es2015"</span>,
    <span class="hljs-attr">"target"</span>: <span class="hljs-string">"es5"</span>,
    <span class="hljs-attr">"moduleResolution"</span>: <span class="hljs-string">"node"</span>,
    <span class="hljs-attr">"experimentalDecorators"</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">"isolatedModules"</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">"lib"</span>: [
      <span class="hljs-string">"dom"</span>,
      <span class="hljs-string">"es5"</span>,
      <span class="hljs-string">"es2015.promise"</span>
    ],
    <span class="hljs-attr">"sourceMap"</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">"pretty"</span>: <span class="hljs-literal">true</span>
  }
}</code></pre>
<p>2.实战！<br>配好配置只是第一步，在项目里跑起来才是王道。<br>在vue文件的script标签里添加lang='ts'<br>因为ts-loader不像配过loader的webpack一样知道vue,html等文件是什么东西，你跑起来后会报模块无法解析的错误，所以还需要配置.d.ts声明文件<br>vue的如下配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="declare module &quot;*.vue&quot; {
  import Vue from 'vue';
  export default Vue;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">declare</span> <span class="hljs-keyword">module</span> "*.vue" {
  <span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Vue;
}</code></pre>
<p>你也可以为其它的非js模块配置.d.ts文件<br>如html（告诉ts-loader把html理解成字符串）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="declare module &quot;*.html&quot; {
  let template: string;
  export default template;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code>declare <span class="hljs-keyword">module</span> <span class="hljs-string">"*.html"</span> {
  let <span class="hljs-keyword">template</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">template</span>;
}</code></pre>
<p>配置好之后ts就能理解这些模块了<br>从vue-property-decorator引入需要用到的模块<br>（一般只用到Component, Vue, Watch, Prop这四个，其它3个没用到也没研究，知道的大佬可以解释下。）<br>import { Component, Vue, Watch } from 'vue-property-decorator'<br>这里拿之前写的sidbar的代码当个栗子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class HoverTopElem {
  leaveTop: number = -200
  top: number = null
  height: number = null

  show(e) {
    this.top = e.target.getBoundingClientRect().top
    this.height = e.target.clientHeight
  }
  hidden() {
    this.top = this.leaveTop
  }
}

@Component({
  name: 'sidebar',
  template: template,
  components: {
    sidebarItem
  }
})
export default class Sidebar extends Vue {
  SidebarMenu: any = SidebarMenu
  hoverTopElem: HoverTopElem = new HoverTopElem()
  activeListItemName: string = null
  activeRouteItemRoute: string = null

  get _activeRouteItemRoute(): string {
    return this.$route.path
  }

  @Watch('_activeRouteItemRoute', { immediate: true })
  onRouteChanged(val: any) {
    this.activeRouteItemRoute = val
  }

  changeList(param) {
    this.activeListItemName = param
  }

  changeRoute(param) {
    this.activeRouteItemRoute = param
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HoverTopElem</span> </span>{
  leaveTop: number = <span class="hljs-number">-200</span>
  top: number = <span class="hljs-literal">null</span>
  height: number = <span class="hljs-literal">null</span>

  show(e) {
    <span class="hljs-keyword">this</span>.top = e.target.getBoundingClientRect().top
    <span class="hljs-keyword">this</span>.height = e.target.clientHeight
  }
  hidden() {
    <span class="hljs-keyword">this</span>.top = <span class="hljs-keyword">this</span>.leaveTop
  }
}

<span class="hljs-meta">@Component</span>({
  name: <span class="hljs-symbol">'sideba</span>r',
  template: template,
  components: {
    sidebarItem
  }
})
export <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Sidebar</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Vue</span> </span>{
  <span class="hljs-type">SidebarMenu</span>: any = <span class="hljs-type">SidebarMenu</span>
  hoverTopElem: <span class="hljs-type">HoverTopElem</span> = <span class="hljs-keyword">new</span> <span class="hljs-type">HoverTopElem</span>()
  activeListItemName: string = <span class="hljs-literal">null</span>
  activeRouteItemRoute: string = <span class="hljs-literal">null</span>

  get _activeRouteItemRoute(): string {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$route.path
  }

  <span class="hljs-meta">@Watch</span>(<span class="hljs-symbol">'_activeRouteItemRout</span>e', { immediate: <span class="hljs-literal">true</span> })
  onRouteChanged(<span class="hljs-keyword">val</span>: any) {
    <span class="hljs-keyword">this</span>.activeRouteItemRoute = <span class="hljs-keyword">val</span>
  }

  changeList(param) {
    <span class="hljs-keyword">this</span>.activeListItemName = param
  }

  changeRoute(param) {
    <span class="hljs-keyword">this</span>.activeRouteItemRoute = param
  }
}</code></pre>
<p>元数据写在@Component配置里，像名字，用到的组件啥的，然后说下之前vue里用到的各个实例属性方法在这里怎么用：</p>
<p>data: 这个是最常用的，像上面的SidebarMenu（这里一共声明了4个），注意这里声明的<br>变量一定要赋一个值，没有就null,不能是undefined，不然这个数据就不是响应的。因此HoverTopElem类里的属性也是要有初始值，不然这些属性也不是响应的</p>
<p>computed: 这里就是get函数，注意tsconfig.jsonp不配置"target": "es5"这里会报错</p>
<p>prop: vue-property-decorator里面有Prop模块，也可以在元数据声明这个prop，然后在类里声明一下这个变量就可以了，个人推荐第一种</p>
<p>watch: vue-property-decorator里的Watch模块</p>
<p>methods: 方法像data一样直接写在类里就可以了（注意不要和周期钩子同名）<br>各种生命周期钩子: 直接写就行<br>路由钩子见vue-class-component文档</p>
<p>至此，基本就可以像原来一样写vue组件了。</p>
<p>当然如果要想和原来一样写ts,还需要配置tslint,vue-cli自带的eslint不识别一些ts语法，像public修饰符之类的，导致编译失败，因为ts还不是很熟练就没想着配，有兴趣的朋友可以试试。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
在Vue2，Vue-cli中使用Typescript需要的配置

## 原文链接
[https://segmentfault.com/a/1190000010309539](https://segmentfault.com/a/1190000010309539)

