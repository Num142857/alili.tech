---
title: 'springboot+gradle+vue+webpack 组合使用' 
date: 2019-02-03 2:30:39
hidden: true
slug: 1f7jsmb51pn
categories: [reprint]
---

{{< raw >}}

                    
<p>最近使用springboot, vue, webpack开发了一款SPA应用，这里主要记录开发+调试+打包的过程及做法。<br>使用的技术<br><a href="https://gradle.org/" rel="nofollow noreferrer" target="_blank">gradle</a><br><a href="http://projects.spring.io/spring-boot/" rel="nofollow noreferrer" target="_blank">springboot</a><br><a href="https://github.com/vuejs/vue" rel="nofollow noreferrer" target="_blank">vue.js</a><br><a href="http://webpack.github.io/" rel="nofollow noreferrer" target="_blank">webpack</a></p>
<p>下面是开发时的项目结构目录，主要分成后端项目与前端项目，后端主要用于编写服务器逻辑，前端则是编写页面和存放静态资源。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="-- springboot-vue-webpack-examples
|
|-- server
|   |
|   |-- src            // 源码
|   |-- build          // 构建输出目录
|
|-- ui
|   |
|   |-- build-scripts  // vue 构建脚本
|   |-- config         // vue 配置文件
|   |-- src            // 源码
|   |-- static         // 静态资源
|   |-- build          // 构建输出目录" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gherkin"><code>-- springboot-vue-webpack-examples
|<span class="hljs-string">
</span>|<span class="hljs-string">-- server
</span>|<span class="hljs-string">   </span>|
|<span class="hljs-string">   </span>|<span class="hljs-string">-- src            // 源码
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- build          // 构建输出目录
</span>|
|<span class="hljs-string">-- ui
</span>|<span class="hljs-string">   </span>|
|<span class="hljs-string">   </span>|<span class="hljs-string">-- build-scripts  // vue 构建脚本
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- config         // vue 配置文件
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- src            // 源码
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- static         // 静态资源
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- build          // 构建输出目录</span></code></pre>
<p>ui项目通过<code>vue init webpack ui</code>命令创建使用的是<a href="https://github.com/vuejs-templates/webpack" rel="nofollow noreferrer" target="_blank">vue提供的模板</a>，之所以使用该模板因为里面已经配置好了调试与生产打包方式，我们不需要做什么更改就可以直接使用。</p>
<p>默认在vue的模板中构建脚本是放置在<code>build</code>目录中，这里将构建脚本移置<code>build-scripts</code>目录中，主要是因为<code>gradle</code>的默认构建输出目录是<code>build</code>为了减少配置而修改了vue构建脚本的目录，我感觉这是最简单方便的，因为比如我们在使用代码版本控制器的时候<code>build</code>目录会被忽略而不提交至服务器，我不想去修改太多的配置。将vue构建脚本移动后需要修改几个点，如下图<br><span class="img-wrap"><img data-src="/img/bVDCR5?w=793&amp;h=181" src="https://static.alili.tech/img/bVDCR5?w=793&amp;h=181" alt="图片" title="图片" style="cursor: pointer; display: inline;"></span></p>
<p>ui项目的<code>gradle</code>脚本配置，最终我们打包发布都是直接通过<code>gradle</code>命令，所以需要将<code>node</code>构建集成到<code>gradle</code>中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="project(':ui') {

    apply plugin: 'com.moowork.node'

    task cnpmInstall(type: NpmTask) {
        group = 'node'
        args = ['install', '--registry=http://registry.cnpmjs.org']
    }

    task buildUI(type: NpmTask, dependsOn: cnpmInstall) {
        group = 'node'
        args = ['run', 'build']
    }
    jar.dependsOn buildUI

    task runDev(type: NpmTask, dependsOn: cnpmInstall) {
        group = 'node'
        args = ['run', 'dev']
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code><span class="hljs-keyword">project</span>(<span class="hljs-string">':ui'</span>) {

    apply plugin: <span class="hljs-string">'com.moowork.node'</span>

    <span class="hljs-keyword">task</span> cnpmInstall(type: NpmTask) {
        <span class="hljs-keyword">group</span> = <span class="hljs-string">'node'</span>
        args = [<span class="hljs-string">'install'</span>, <span class="hljs-string">'--registry=http://registry.cnpmjs.org'</span>]
    }

    <span class="hljs-keyword">task</span> buildUI(type: NpmTask, dependsOn: cnpmInstall) {
        <span class="hljs-keyword">group</span> = <span class="hljs-string">'node'</span>
        args = [<span class="hljs-string">'run'</span>, <span class="hljs-string">'build'</span>]
    }
    jar.dependsOn buildUI

    <span class="hljs-keyword">task</span> runDev(type: NpmTask, dependsOn: cnpmInstall) {
        <span class="hljs-keyword">group</span> = <span class="hljs-string">'node'</span>
        args = [<span class="hljs-string">'run'</span>, <span class="hljs-string">'dev'</span>]
    }
}</code></pre>
<p><code>cnpmInstall</code> 该命令主要用于依赖安装，之所以需要这个命令主要是因为我们的网络环境不太好，将镜像设置为国内的下载依赖比较稳定。<br><code>buildUI</code> 调用<code>package.json</code>中的命令构建ui。<br><code>runDev</code> 可以通过<code>gradlew :ui:runDev</code>命令启动ui。</p>
<p><code>ui/config/index.js</code> 配置修改</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

var assetsRoot = path.resolve(__dirname, '../build/resources/main/ui')
module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(assetsRoot, 'index.html'),
    assetsRoot: assetsRoot,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev.env'),
    port: 3000,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api/**': 'http://localhost:8080'
    },
    // CSS Sourcemaps off by default because relative paths are &quot;buggy&quot;
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-regexp">//</span> see http:<span class="hljs-regexp">//</span>vuejs-templates.github.io/webpack <span class="hljs-keyword">for</span> documentation.
var path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)

var assetsRoot = path.resolve(__dirname, <span class="hljs-string">'../build/resources/main/ui'</span>)
<span class="hljs-built_in">module</span>.exports = {
  build: {
    env: <span class="hljs-built_in">require</span>(<span class="hljs-string">'./prod.env'</span>),
    index: path.resolve(assetsRoot, <span class="hljs-string">'index.html'</span>),
    assetsRoot: assetsRoot,
    assetsSubDirectory: <span class="hljs-string">'static'</span>,
    assetsPublicPath: <span class="hljs-string">'/'</span>,
    productionSourceMap: <span class="hljs-literal">true</span>,
    <span class="hljs-regexp">//</span> Gzip <span class="hljs-literal">off</span> <span class="hljs-keyword">by</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">as</span> many popular static hosts such <span class="hljs-keyword">as</span>
    <span class="hljs-regexp">//</span> Surge <span class="hljs-keyword">or</span> Netlify already gzip all static assets <span class="hljs-keyword">for</span> you.
    <span class="hljs-regexp">//</span> Before setting to `<span class="javascript"><span class="hljs-literal">true</span></span>`, make sure to:
    <span class="hljs-regexp">//</span> <span class="hljs-built_in">npm</span> install --save-dev compression-webpack-plugin
    productionGzip: <span class="hljs-literal">false</span>,
    productionGzipExtensions: [<span class="hljs-string">'js'</span>, <span class="hljs-string">'css'</span>]
  },
  dev: {
    env: <span class="hljs-built_in">require</span>(<span class="hljs-string">'./dev.env'</span>),
    port: <span class="hljs-number">3000</span>,
    assetsSubDirectory: <span class="hljs-string">'static'</span>,
    assetsPublicPath: <span class="hljs-string">'/'</span>,
    proxyTable: {
      <span class="hljs-string">'/api/**'</span>: <span class="hljs-string">'http://localhost:8080'</span>
    },
    <span class="hljs-regexp">//</span> CSS Sourcemaps <span class="hljs-literal">off</span> <span class="hljs-keyword">by</span> <span class="hljs-keyword">default</span> because relative paths are <span class="hljs-string">"buggy"</span>
    <span class="hljs-regexp">//</span> with <span class="hljs-keyword">this</span> option, according to the CSS-Loader README
    <span class="hljs-regexp">//</span> (https:<span class="hljs-regexp">//gi</span>thub.com/webpack/css-loader<span class="hljs-comment">#sourcemaps)</span>
    <span class="hljs-regexp">//</span> In our experience, they generally work <span class="hljs-keyword">as</span> expected,
    <span class="hljs-regexp">//</span> just be aware <span class="hljs-keyword">of</span> <span class="hljs-keyword">this</span> issue <span class="hljs-keyword">when</span> enabling <span class="hljs-keyword">this</span> option.
    cssSourceMap: <span class="hljs-literal">false</span>
  }
}</code></pre>
<p><code>assetsRoot</code> 将webpack构建的资源输出至<code>build/resources/main/ui</code>目录，<code>gradle</code>打包会将<code>ui</code>加入至<code>classpath</code>中，<code>spring</code>查找静态资源有<code>ui</code>目录区分比较方便。<br><code>proxyTable</code> 增加代理配置将<code>/api/**</code> URL下的所有请求转发至服务后端即<code>springboot</code>启动的服务，这样做的目的是为了方便<code>debug</code>，在vue webpack中已经配置好了<code>hot-dev</code>，在开发中我们修改了前端<code>js</code>或者<code>vue</code>不需要<strong>重新构建</strong>或<strong>重启</strong>应用前端就能响应。所以在开发中我们启动服务后的访问入口是<br><code>http://localhost:3000</code><br>其实<code>3000</code>是<code>express dev-server</code>的端口，这里也体现了上面为什么要配置<code>proxyTable</code>，当我们从<code>dev-server</code>作为访问入口时与后端服务并不是同一个，存在<strong>跨域</strong>问题，但是通过代理可以避免这个问题，同时这并不会对生产环境造成影响，当我们发布项目之后可以直接通过<code>springboot</code>服务作为访问入口，因为在生产环境中我们不需要<code>hot-reload</code>功能。</p>
<p>服务端WEB配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Configuration
@RestController
public class WebConfiguration extends WebMvcConfigurerAdapter {

    @Value(&quot;classpath:/ui/index.html&quot;)
    private Resource indexHtml;

    @Bean
    @Order(Ordered.HIGHEST_PRECEDENCE)
    public CharacterEncodingFilter characterEncodingFilter() {
        CharacterEncodingFilter filter = new CharacterEncodingFilter(&quot;UTF-8&quot;, true);
        return filter;
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler(&quot;/**&quot;).addResourceLocations(&quot;classpath:/ui/&quot;);
    }

    @Bean
    public ServletRegistrationBean apiV1ServletBean(WebApplicationContext wac) {
        DispatcherServlet servlet = new DispatcherServlet(wac);
        ServletRegistrationBean bean = new ServletRegistrationBean(servlet, &quot;/api/v1/*&quot;);
        bean.setName(&quot;api-v1&quot;);
        return bean;
    }

    @RequestMapping(&quot;/&quot;)
    public Object index() {
        return ResponseEntity.ok().body(indexHtml);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-meta">@Configuration</span>
<span class="hljs-meta">@RestController</span>
<span class="hljs-keyword">public</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">WebConfiguration</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">WebMvcConfigurerAdapter</span> </span>{

    <span class="hljs-meta">@Value</span>(<span class="hljs-string">"classpath:/ui/index.html"</span>)
    <span class="hljs-keyword">private</span> Resource indexHtml;

    <span class="hljs-meta">@Bean</span>
    <span class="hljs-meta">@Order</span>(Ordered.HIGHEST_PRECEDENCE)
    <span class="hljs-function"><span class="hljs-keyword">public</span> CharacterEncodingFilter <span class="hljs-title">characterEncodingFilter</span><span class="hljs-params">()</span> </span>{
        CharacterEncodingFilter filter = <span class="hljs-keyword">new</span> CharacterEncodingFilter(<span class="hljs-string">"UTF-8"</span>, <span class="hljs-keyword">true</span>);
        <span class="hljs-keyword">return</span> filter;
    }

    <span class="hljs-meta">@Override</span>
    <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title">addResourceHandlers</span><span class="hljs-params">(ResourceHandlerRegistry registry)</span> </span>{
        registry.addResourceHandler(<span class="hljs-string">"/**"</span>).addResourceLocations(<span class="hljs-string">"classpath:/ui/"</span>);
    }

    <span class="hljs-meta">@Bean</span>
    <span class="hljs-function"><span class="hljs-keyword">public</span> ServletRegistrationBean <span class="hljs-title">apiV1ServletBean</span><span class="hljs-params">(WebApplicationContext wac)</span> </span>{
        DispatcherServlet servlet = <span class="hljs-keyword">new</span> DispatcherServlet(wac);
        ServletRegistrationBean bean = <span class="hljs-keyword">new</span> ServletRegistrationBean(servlet, <span class="hljs-string">"/api/v1/*"</span>);
        bean.setName(<span class="hljs-string">"api-v1"</span>);
        <span class="hljs-keyword">return</span> bean;
    }

    <span class="hljs-meta">@RequestMapping</span>(<span class="hljs-string">"/"</span>)
    <span class="hljs-function"><span class="hljs-keyword">public</span> Object <span class="hljs-title">index</span><span class="hljs-params">()</span> </span>{
        <span class="hljs-keyword">return</span> ResponseEntity.ok().body(indexHtml);
    }
}</code></pre>
<p><code>addResourceHandlers</code> 增加静态资源访问路径。<br><code>apiV1ServletBean</code> 之所以增加一个<code>servlet</code>配置，是为了与静态资源区分，后端服务都是通过<code>restful</code>接口交互而静态资源是通过<code>/</code>根目录的方式访问。<br><code>index</code> 根目录返回<code>index.html</code>。</p>
<p>至此基础配置就差不多是这样打包发布就可以直接通过<code>gradlew build</code>。发布时我们无需修改任何配置及代码，与开发环境是一致。而在开发环境中我们也保留良好的开发，及调试环境。<br><strong>注：运行时不需要<code>nodejs</code>环境</strong></p>
<p>示例代码：<a href="https://github.com/kevin70/springboot-vue-webpack-examples" rel="nofollow noreferrer" target="_blank">springboot-vue-webpack-examples</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
springboot+gradle+vue+webpack 组合使用

## 原文链接
[https://segmentfault.com/a/1190000007021883](https://segmentfault.com/a/1190000007021883)

