---
title: '使用Gradle整合SpringBoot+Vue.js-开发调试与打包' 
date: 2019-01-17 2:30:25
hidden: true
slug: 5bmajmttb8b
categories: [reprint]
---

{{< raw >}}

                    
<p>首先非常感谢<a href="https://segmentfault.com/u/kevinz">kevinz</a>分享的文章<a href="https://segmentfault.com/a/1190000007021883" target="_blank">《springboot+gradle+vue+webpack 组合使用》</a>，这文章对我的帮助非常大。</p>
<p>我是做Java后台开发的，一般做Java的要做网页都是用jsp，但我并不喜欢在jsp代码中使用jstl标签，我一直想找一个Java能用的前后端分离的解决方案。目前确定比较好的组合是：前台页面用Vue.js，后台用SpringBoot。但是Vue.js在网上能找到的都是需要Node.js环境进行打包的，这使得不懂Node.js的Java程序员望而却步。</p>
<p>在此之前，为了能用上Vue.js快速开发网页，我利用Vue.js的异步组件的特性来加载组件，并配合vue-router来实现组件的视图切换。这样子就能用传统的JavaScript写法在网页端用上Vue.js。对于小型的项目是能适用的，但是对于大型的项目组织起来比较麻烦，而且没有代码压缩、混淆的功能。</p>
<p>在看到<a href="https://segmentfault.com/u/kevinz">kevinz</a>的文章后，我认真研究了，并稍作修改，在这里记下学习的笔记。</p>
<hr>
<p><strong>我的开发环境如下：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="IDE：Intellij IDEA
JDK：Java8
Gradle：3.3
Node.js：6.10.1
Vue-CLI：2.8.1
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">IDE</span>：<span class="hljs-selector-tag">Intellij</span> <span class="hljs-selector-tag">IDEA</span>
<span class="hljs-selector-tag">JDK</span>：<span class="hljs-selector-tag">Java8</span>
<span class="hljs-selector-tag">Gradle</span>：3<span class="hljs-selector-class">.3</span>
<span class="hljs-selector-tag">Node</span><span class="hljs-selector-class">.js</span>：6<span class="hljs-selector-class">.10</span><span class="hljs-selector-class">.1</span>
<span class="hljs-selector-tag">Vue-CLI</span>：2<span class="hljs-selector-class">.8</span><span class="hljs-selector-class">.1</span>
</code></pre>
<hr>
<h2 id="articleHeader0">1.Node.js安装与配置</h2>
<ol>
<li>到官网下载最新的Node.js安装</li>
<li>由于Node.js安装后，默认的node_modules和缓存文件是存在C盘的，最好是修改成其它盘。</li>
<li>
<p>在其它盘创建Node.js缓存文件夹,如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="E:\_development\nodejs\global 存放例如用`npm install -g express`命令安装的模块文件
E:\_development\nodejs\cache  存放下载缓存" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs taggerscript"><code>E:<span class="hljs-symbol">\_</span>development<span class="hljs-symbol">\n</span>odejs<span class="hljs-symbol">\g</span>lobal 存放例如用`npm install -g express`命令安装的模块文件
E:<span class="hljs-symbol">\_</span>development<span class="hljs-symbol">\n</span>odejs<span class="hljs-symbol">\c</span>ache  存放下载缓存</code></pre>
</li>
<li>
<p>找到【nodejs安装目录】/node_modules/npm/npmrc 文件，用txt打开，修改配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="prefix=E:\_development\nodejs\global  指定全局安装的node模块的目录
cache=E:\_development\nodejs\cache    指定缓存目录
registry=https://registry.npm.taobao.org  指定使用国内的淘宝的Node.js镜像" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code><span class="hljs-attr">prefix=</span>E:\_development\nodejs\global  指定全局安装的<span class="hljs-keyword">node</span><span class="hljs-title">模块的目录
cache</span>=E:\_development\nodejs\cache    指定缓存目录
<span class="hljs-attr">registry=</span>https://registry.npm.taobao.org  指定使用国内的淘宝的<span class="hljs-keyword">Node</span>.<span class="hljs-title">js</span>镜像</code></pre>
</li>
<li>为了测试配置是否成功，运行一下命令<code>npm install -g express</code>安装一个express试试，Java程序员可能不知道，express是Node.js的后端mvc框架，类似Java中的SpringMVC。如果安装成功，会生成一个E:_developmentnodejsglobalnode_modules目录，express的文件就在该目录下。</li>
<li>
<p>新增环境变量：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="NODE_PATH=E:\_development\nodejs\global\node_modules" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs taggerscript"><code style="word-break: break-word; white-space: initial;">NODE_PATH=E:<span class="hljs-symbol">\_</span>development<span class="hljs-symbol">\n</span>odejs<span class="hljs-symbol">\g</span>lobal<span class="hljs-symbol">\n</span>ode_modules</code></pre>
</li>
<li>
<p>Path环境变量加入路径：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="E:\_development\nodejs\global 加入该路径，才能使用后面安装vue-cli后的vue命令" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs taggerscript"><code style="word-break: break-word; white-space: initial;">E:<span class="hljs-symbol">\_</span>development<span class="hljs-symbol">\n</span>odejs<span class="hljs-symbol">\g</span>lobal 加入该路径，才能使用后面安装vue-cli后的vue命令</code></pre>
</li>
</ol>
<h2 id="articleHeader1">2.vue-cli安装</h2>
<p>vue-cli中cli是command line interface的缩写，安装很简单：<code>npm install -g vue-cli</code>，<code>-g</code>是全局安装的意思。安装过程可能比较久。安装完可以通过<code>vue -V</code>查看是否安装成功。如下图：<br><span class="img-wrap"><img data-src="/img/bVLMzk?w=119&amp;h=79" src="https://static.alili.tech/img/bVLMzk?w=119&amp;h=79" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader2">3.在IDEA搭建项目框架</h2>
<ol>
<li>创建整体工程的结构是，先创建一个总工程，叫show，再创建两个子模块，一个叫server，一个叫web。</li>
<li>打开IDEA，File--&gt;New--&gt;Project--&gt;Gradle--&gt;取消勾选Java--&gt;Next。如下图：<br><span class="img-wrap"><img data-src="/img/bVLMBD?w=750&amp;h=477" src="https://static.alili.tech/img/bVLMBD?w=750&amp;h=477" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span>
</li>
<li>输入父工程的信息，如下图：<br><span class="img-wrap"><img data-src="/img/bVLMDv?w=750&amp;h=477" src="https://static.alili.tech/img/bVLMDv?w=750&amp;h=477" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span>
</li>
<li>设置Gradle相关配置，由于网络特殊原因，最好用本地的Gradle库，配置如下图：<br><span class="img-wrap"><img data-src="/img/bVLMD6?w=750&amp;h=477" src="https://static.alili.tech/img/bVLMD6?w=750&amp;h=477" alt="图片描述" title="图片描述" style="cursor: pointer;"></span>
</li>
<li>设置项目存放路径，如下图：<br><span class="img-wrap"><img data-src="/img/bVLMEF?w=750&amp;h=477" src="https://static.alili.tech/img/bVLMEF?w=750&amp;h=477" alt="图片描述" title="图片描述" style="cursor: pointer;"></span>
</li>
<li>项目创建出来就除了Gradle的配置文件，其它什么都没有，接下来要创建两个子工程server和web。show项目创建后如下图：<br><span class="img-wrap"><img data-src="/img/bVLMFk?w=488&amp;h=253" src="https://static.alili.tech/img/bVLMFk?w=488&amp;h=253" alt="图片描述" title="图片描述" style="cursor: pointer;"></span>
</li>
<li>
<p>创建server子项目，对着show项目：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="右键-->New-->Module-->Gradle-->勾选Java
-->Next-->ArtifactId填&quot;server&quot;
-->Next-->Finished" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coq"><code>右键--&gt;New--&gt;<span class="hljs-keyword">Module</span>--&gt;Gradle--&gt;勾选Java
--&gt;<span class="hljs-keyword">Next</span>--&gt;ArtifactId填<span class="hljs-string">"server"</span>
--&gt;<span class="hljs-keyword">Next</span>--&gt;Finished</code></pre>
</li>
<li>
<p>创建web子项目，对着show项目：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="右键-->New-->Module-->Gradle-->勾选Javaweb
-->Next-->ArtifactId填&quot;web&quot;
-->Next-->Finished" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coq"><code>右键--&gt;New--&gt;<span class="hljs-keyword">Module</span>--&gt;Gradle--&gt;勾选Javaweb
--&gt;<span class="hljs-keyword">Next</span>--&gt;ArtifactId填<span class="hljs-string">"web"</span>
--&gt;<span class="hljs-keyword">Next</span>--&gt;Finished</code></pre>
</li>
<li>
<p>将<code>show</code>总项目的<code>build.gradle</code>文件修改成如下配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="group 'com.gongshi'
version '1.0'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code><span class="hljs-keyword">group</span> <span class="hljs-title">'com</span>.gongshi'
<span class="hljs-keyword">version</span> '<span class="hljs-number">1.0</span>'</code></pre>
</li>
<li>
<p>将<code>show</code>总项目的<code>setting.gradle</code>文件修改成如下配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="rootProject.name = 'show'
include 'server'
include 'web'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code>rootProject.name = <span class="hljs-string">'show'</span>
<span class="hljs-keyword">include</span> <span class="hljs-string">'server'</span>
<span class="hljs-keyword">include</span> <span class="hljs-string">'web'</span></code></pre>
</li>
<li>
<p>将<code>web</code>子项目的<code>build.gradle</code>文件修改成如下配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="plugins {
    id &quot;com.moowork.node&quot; version &quot;1.1.1&quot;
    id 'java'
}
//调用npm run build命令的Gradle任务
task npmBuild(type: NpmTask, dependsOn: npmInstall) {
    group = 'node'
    args = ['run', 'build']
}

//Gradle的java插件的jar任务，依赖npmBuild,即web子模块打jar包前必须运行npm run build
jar.dependsOn npmBuild

//调用npm run dev
task npmDev(type: NpmTask, dependsOn: npmInstall) {
    group = 'node'
    args = ['run', 'dev']
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>plugins {
    id <span class="hljs-string">"com.moowork.node"</span> version <span class="hljs-string">"1.1.1"</span>
    id <span class="hljs-string">'java'</span>
}
//调用npm <span class="hljs-keyword">run</span><span class="bash"> build命令的Gradle任务
</span>task npmBuild(type: NpmTask, dependsOn: npmInstall) {
    group = <span class="hljs-string">'node'</span>
    args = [<span class="hljs-string">'run'</span>, <span class="hljs-string">'build'</span>]
}

//Gradle的java插件的jar任务，依赖npmBuild,即web子模块打jar包前必须运行npm <span class="hljs-keyword">run</span><span class="bash"> build
</span>jar.dependsOn npmBuild

//调用npm <span class="hljs-keyword">run</span><span class="bash"> dev
</span>task npmDev(type: NpmTask, dependsOn: npmInstall) {
    group = <span class="hljs-string">'node'</span>
    args = [<span class="hljs-string">'run'</span>, <span class="hljs-string">'dev'</span>]
}</code></pre>
<p>在上面的代码中，<code> id "com.moowork.node" version "1.1.1" </code>一行是加入了一个Gradle插件，叫<a href="https://github.com/srs/gradle-node-plugin/blob/master/docs/node.md" rel="nofollow noreferrer" target="_blank">gradle-node-plugin</a>,该插件可以通过调用Gradle命令来调用node.js的命令或npm的命令。插件自带了一些内容的命令，如：<code>gradle npmInstall</code>用于运行<code>npm install</code>命名，另外还有：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ gradle npm_install
$ gradle npm_update
$ gradle npm_list
$ gradle npm_cache_clean
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code><span class="hljs-variable">$ </span>gradle npm_install
<span class="hljs-variable">$ </span>gradle npm_update
<span class="hljs-variable">$ </span>gradle npm_list
<span class="hljs-variable">$ </span>gradle npm_cache_clean
...</code></pre>
</li>
<li>
<p>将<code>server</code>子项目的<code>build.gradle</code>文件修改成如下配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="plugins {
    id 'org.springframework.boot' version '1.5.2.RELEASE'
    id 'java'
}

jar {
    baseName = 'server'
    version =  '1.0'
}

repositories {
    //使用淘宝的maven镜像
    maven{ url 'http://maven.aliyun.com/nexus/content/groups/public'}
}

dependencies {
    compile project(':web')//server模块依赖web模块
    compile(&quot;org.springframework.boot:spring-boot-starter-web&quot;)
    compile(&quot;org.springframework.boot:spring-boot-devtools&quot;)
    testCompile(&quot;org.springframework.boot:spring-boot-starter-test&quot;)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code>plugins {
    id <span class="hljs-string">'org.springframework.boot'</span> version <span class="hljs-string">'1.5.2.RELEASE'</span>
    id <span class="hljs-string">'java'</span>
}

jar {
    baseName = <span class="hljs-string">'server'</span>
    version =  <span class="hljs-string">'1.0'</span>
}

<span class="hljs-keyword">repositories</span> {
    <span class="hljs-comment">//使用淘宝的maven镜像</span>
    maven{ url <span class="hljs-string">'http://maven.aliyun.com/nexus/content/groups/public'</span>}
}

<span class="hljs-keyword">dependencies</span> {
    <span class="hljs-keyword">compile</span> <span class="hljs-keyword">project</span>(<span class="hljs-string">':web'</span>)<span class="hljs-comment">//server模块依赖web模块</span>
    <span class="hljs-keyword">compile</span>(<span class="hljs-string">"org.springframework.boot:spring-boot-starter-web"</span>)
    <span class="hljs-keyword">compile</span>(<span class="hljs-string">"org.springframework.boot:spring-boot-devtools"</span>)
    testCompile(<span class="hljs-string">"org.springframework.boot:spring-boot-starter-test"</span>)
}</code></pre>
<p>在上面的代码中，需要特别注意的是<code>compile project(':web')</code>，这个设置能在server打包时把web的资源先打包，并作为依赖，加入到server项目生成的jar包中。</p>
</li>
</ol>
<p>13.在IDEA右侧找到Gradle的栏目，点击Refresh All Gradle Projects, IDEA会按找各个build.gradle文件的配置，下载依赖的jar。</p>
<p><span class="img-wrap"><img data-src="/img/bVLMPn?w=864&amp;h=489" src="https://static.alili.tech/img/bVLMPn?w=864&amp;h=489" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>到这里为止，项目的结构搭建好了，下一步是先编写一下SpringBoot的代码，把一个简单Java后台跑起来。</p>
<h2 id="articleHeader3">4.编写SpringBoot的后台</h2>
<p>1.创建包com.gongshi，创建类：Application.java。如下：</p>
<p>Application.java:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="package com.gongshi;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;

@SpringBootApplication
public class Application {

    private static final Logger logger = LoggerFactory.getLogger(Application.class);

    public static void main(String[] args) {
        SpringApplication.run(Application.class);
        logger.info(&quot;SpringBoot server stated on port: 8080&quot;);
    }

    //增加一个SpringMVC的DispatcherServlet，接收前台/api开头的请求
    @Bean
    public ServletRegistrationBean apiV1ServletBean(WebApplicationContext wac) {
        DispatcherServlet servlet = new DispatcherServlet(wac);
        ServletRegistrationBean bean = new ServletRegistrationBean(servlet, &quot;/api/*&quot;);
        bean.setName(&quot;ApiServlet&quot;);
        return bean;
    }

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs swift"><code>package com.gongshi;

<span class="hljs-keyword">import</span> org.slf4j.Logger;
<span class="hljs-keyword">import</span> org.slf4j.LoggerFactory;
<span class="hljs-keyword">import</span> org.springframework.boot.SpringApplication;
<span class="hljs-keyword">import</span> org.springframework.boot.autoconfigure.SpringBootApplication;
<span class="hljs-keyword">import</span> org.springframework.boot.web.servlet.ServletRegistrationBean;
<span class="hljs-keyword">import</span> org.springframework.context.annotation.Bean;
<span class="hljs-keyword">import</span> org.springframework.web.context.WebApplicationContext;
<span class="hljs-keyword">import</span> org.springframework.web.servlet.DispatcherServlet;

@<span class="hljs-type">SpringBootApplication</span>
<span class="hljs-keyword">public</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Application</span> </span>{

    <span class="hljs-keyword">private</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">final</span> <span class="hljs-type">Logger</span> logger = <span class="hljs-type">LoggerFactory</span>.getLogger(<span class="hljs-type">Application</span>.<span class="hljs-keyword">class</span>);

    <span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> void main(<span class="hljs-type">String</span>[] args) {
        <span class="hljs-type">SpringApplication</span>.run(<span class="hljs-type">Application</span>.<span class="hljs-keyword">class</span>);
        logger.info(<span class="hljs-string">"SpringBoot server stated on port: 8080"</span>);
    }

    <span class="hljs-comment">//增加一个SpringMVC的DispatcherServlet，接收前台/api开头的请求</span>
    @<span class="hljs-type">Bean</span>
    <span class="hljs-keyword">public</span> <span class="hljs-type">ServletRegistrationBean</span> apiV1ServletBean(<span class="hljs-type">WebApplicationContext</span> wac) {
        <span class="hljs-type">DispatcherServlet</span> servlet = new <span class="hljs-type">DispatcherServlet</span>(wac);
        <span class="hljs-type">ServletRegistrationBean</span> bean = new <span class="hljs-type">ServletRegistrationBean</span>(servlet, <span class="hljs-string">"/api/*"</span>);
        bean.setName(<span class="hljs-string">"ApiServlet"</span>);
        <span class="hljs-keyword">return</span> bean;
    }

}</code></pre>
<p>3.创建包com.gongshi.controller，创建类：AppController.java。如下：</p>
<p>AppController.java:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="package com.gongshi.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping(&quot;/app&quot;)
public class AppController {
    
    //简单的后台接口，用于测试
    @RequestMapping(&quot;/info&quot;)
    public Object info(){
        Map<String,Object> map = new HashMap<>();
        map.put(&quot;info&quot;,&quot;hello hello hello&quot;);
        return map;
    }
    
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">package</span> com.gongshi.controller;

<span class="hljs-keyword">import</span> org.springframework.web.bind.<span class="hljs-keyword">annotation</span>.RequestMapping;
<span class="hljs-keyword">import</span> org.springframework.web.bind.<span class="hljs-keyword">annotation</span>.RestController;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.Map;

<span class="hljs-meta">@RestController</span>
<span class="hljs-meta">@RequestMapping(<span class="hljs-meta-string">"/app"</span>)</span>
<span class="hljs-keyword">public</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AppController</span> </span>{
    
    <span class="hljs-comment">//简单的后台接口，用于测试</span>
    <span class="hljs-meta">@RequestMapping(<span class="hljs-meta-string">"/info"</span>)</span>
    <span class="hljs-keyword">public</span> Object info(){
        Map&lt;String,Object&gt; map = new HashMap&lt;&gt;();
        map.put(<span class="hljs-string">"info"</span>,<span class="hljs-string">"hello hello hello"</span>);
        <span class="hljs-keyword">return</span> map;
    }
    
}</code></pre>
<p>3.在server/src/main/resources目录下，创建一个staic目录，创建一个html页面，用于测试，如下：<br>index.html</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
  <meta charset=&quot;UTF-8&quot;>
  <title>Title</title>
</head>
<body>
<h1>Hello Spring Boot</h1>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Title<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello Spring Boot<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>4.暂时注释掉<code>server/builde.gradle</code>中的<code>compile project(':web')</code>配置（因为web子项目未配置好vue.js相的内容），在IDEA右侧Gradle栏目，点击运行server的bootRun任务，bootRun任务会运行Application.java下的main方法。启动Spring Boot，如下图：<br><span class="img-wrap"><img data-src="/img/bVLMYs?w=1169&amp;h=715" src="https://static.alili.tech/img/bVLMYs?w=1169&amp;h=715" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>为了测试后台是否正常运行，分别访问一下：</p>
<ol>
<li>
<a href="http://localhost:8080" rel="nofollow noreferrer" target="_blank">http://localhost:8080</a>，结果如下：<br><span class="img-wrap"><img data-src="/img/bVLMYW?w=309&amp;h=182" src="https://static.alili.tech/img/bVLMYW?w=309&amp;h=182" alt="图片描述" title="图片描述" style="cursor: pointer;"></span>
</li>
<li>
<a href="http://localhost:8080/index.html" rel="nofollow noreferrer" target="_blank">http://localhost:8080/index.html</a>，结果如下：<br><span class="img-wrap"><img data-src="/img/bVLMZa?w=347&amp;h=174" src="https://static.alili.tech/img/bVLMZa?w=347&amp;h=174" alt="图片描述" title="图片描述" style="cursor: pointer;"></span>
</li>
<li>
<a href="http://localhost:8080/app/info" rel="nofollow noreferrer" target="_blank">http://localhost:8080/app/info</a>，结果如下：<br><span class="img-wrap"><img data-src="/img/bVLMZE?w=315&amp;h=154" src="https://static.alili.tech/img/bVLMZE?w=315&amp;h=154" alt="图片描述" title="图片描述" style="cursor: pointer;"></span>
</li>
</ol>
<p>以上三个结果中，需要注意下第1个和第2个。Spring Boot默认会将server/src/main/resources/static下的文件作为静态资源，提供给外部访问。当访问<a href="http://localhost:8080" rel="nofollow noreferrer" target="_blank">http://localhost:8080</a>时，发现static有index.html文件，默认会显示到浏览器端。这就是为什么1和2的结果是一样的。</p>
<h2 id="articleHeader4">5.编写Vue.js的前台</h2>
<ol><li>在这里前台使用vue-cli生成前台的模板。随便打开一个文件夹，比如：D:demo,按住shift+右键--&gt;在此处打开命令窗口，即可打开一个命令行，输入命令<code>vue init webpack web</code>,其中webpack是用<code>webpack</code>做vue.js的打包工具，<code>web</code>是生成的模板名称。依次做以下的选择：</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Project name --> web
Project description --> A Vue.js project
Author --> Hello
Vue build --> 回车
Install vue-router ? --> y
Use ESlint to lint your code? --> n
Setup unit tests with Karma + Mocha? --> n
Setup e2e tests with Nightwatch? --> n" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xl"><code>P<span class="hljs-function"><span class="hljs-title">roject</span> <span class="hljs-keyword">name</span> --&gt;</span> web
P<span class="hljs-function"><span class="hljs-title">roject</span> description --&gt;</span> A Vue.js project
A<span class="hljs-function"><span class="hljs-title">uthor</span> --&gt;</span> Hello
V<span class="hljs-function"><span class="hljs-title">ue</span> build --&gt;</span> 回车
I<span class="hljs-function"><span class="hljs-title">nstall</span> vue-router ? --&gt;</span> y
U<span class="hljs-function"><span class="hljs-title">se</span> ESlint to lint your code? --&gt;</span> n
S<span class="hljs-function"><span class="hljs-title">etup</span> unit tests <span class="hljs-keyword">with</span> Karma + Mocha? --&gt;</span> n
S<span class="hljs-function"><span class="hljs-title">etup</span> e2e tests <span class="hljs-keyword">with</span> Nightwatch? --&gt;</span> n</code></pre>
<p>2.执行以上步骤后，vue-cli工具就会将项目模板生成到D:demoweb目录，此时把web目录下所有文件拷贝到IDEA的show/web子项目中。如下图：<br><span class="img-wrap"><img data-src="/img/bVLM5Y?w=369&amp;h=544" src="https://static.alili.tech/img/bVLM5Y?w=369&amp;h=544" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>3.IDEA下方打开Terminal命令行终端，执行命令：<code>cd web</code> ，<code>npm install</code>，这样子npm就会根据package.js中的信息下载依赖的模块。安装后show/web/目录下会出现node_modules目录。如下图：</p>
<p><span class="img-wrap"><img data-src="/img/bVLM6y?w=674&amp;h=974" src="https://static.alili.tech/img/bVLM6y?w=674&amp;h=974" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>4.此时需要测试一下vue-cli搭建的web子项目是否正确，打开IDEA右侧Gradle栏目，找到npmDev任务，双击运行一下，任务运行成功会自动打开浏览器，显示localhost:8080，显示Vue的模板页面。如下图：<br><span class="img-wrap"><img data-src="/img/bVLM7t?w=1169&amp;h=944" src="https://static.alili.tech/img/bVLM7t?w=1169&amp;h=944" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader5">6.修改Vue.js的前台配置</h2>
<ol>
<li>因为gradle构建输出目录是build，vue-cli生成的模板的构建脚本的目录也是build，因此这里要把构建脚本的build目录修改成script：点选show/web/build目录，<code>shift+F6</code>重命名，将<code>show/web/build目录改成script目录</code>,避免与gradle的构建输出目录冲突。</li>
<li>修改show/web/package.json中与build目录相关的配置：</li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &quot;scripts&quot;: {
    &quot;dev&quot;: &quot;node build/dev-server.js&quot;,
    &quot;build&quot;: &quot;node build/build.js&quot;
  },
    改成：
  &quot;scripts&quot;: {
    &quot;dev&quot;: &quot;node script/dev-server.js&quot;,
    &quot;build&quot;: &quot;node script/build.js&quot;
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>  <span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"dev"</span>: <span class="hljs-string">"node build/dev-server.js"</span>,
    <span class="hljs-string">"build"</span>: <span class="hljs-string">"node build/build.js"</span>
  },
    改成：
  <span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"dev"</span>: <span class="hljs-string">"node script/dev-server.js"</span>,
    <span class="hljs-string">"build"</span>: <span class="hljs-string">"node script/build.js"</span>
  },</code></pre>
<p>3.修改show/web/script/webpack.dev.conf.js中与build目录相关的配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})
    改成：
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./script/dev-client'].concat(baseWebpackConfig.entry[name])
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code>Object.keys(baseWebpackConfig.<span class="hljs-built_in">entry</span>).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span></span> (<span class="hljs-keyword">name</span>) {
  baseWebpackConfig.<span class="hljs-built_in">entry</span>[<span class="hljs-keyword">name</span>] = [<span class="hljs-string">'./build/dev-client'</span>].concat(baseWebpackConfig.<span class="hljs-built_in">entry</span>[<span class="hljs-keyword">name</span>])
})
    改成：
Object.keys(baseWebpackConfig.<span class="hljs-built_in">entry</span>).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span></span> (<span class="hljs-keyword">name</span>) {
  baseWebpackConfig.<span class="hljs-built_in">entry</span>[<span class="hljs-keyword">name</span>] = [<span class="hljs-string">'./script/dev-client'</span>].concat(baseWebpackConfig.<span class="hljs-built_in">entry</span>[<span class="hljs-keyword">name</span>])
})
</code></pre>
<p>4.修改show/web/config/index.js中的配置,包括webpack打包输出位置，以及配置代理避免跨域问题，具体修改项看下面注释：</p>
<p>show/web/config/index.js：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

var assetsRoot = path.resolve(__dirname, '../build/resources/main/static')// <-----1.add
module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(assetsRoot, 'index.html'),// <-----2.change
    assetsRoot: assetsRoot,// <-----3.change
    assetsSubDirectory: 'assets',// <-----4.change
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 3000,// <-----5.change
    autoOpenBrowser: true,
    assetsSubDirectory: 'assets',// <-----6.change
    assetsPublicPath: '/',
    proxyTable: {// <-----7.change
      '/api/**': 'http://localhost:8080'//代理前台/api开头的请求，代理到8080端口，spring boot的访问端口
    },
    // CSS Sourcemaps off by default because relative paths are &quot;buggy&quot;
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>// see http://vuejs-templates.github.io/webpack <span class="hljs-keyword">for</span> documentation.
var path = require(<span class="hljs-string">'path'</span>)

var assetsRoot = path.<span class="hljs-built_in">resolve</span>(__dirname, <span class="hljs-string">'../build/resources/main/static'</span>)// &lt;-----<span class="hljs-number">1</span>.<span class="hljs-built_in">add</span>
module.exports = {
  build: {
    <span class="hljs-keyword">en</span><span class="hljs-variable">v:</span> require(<span class="hljs-string">'./prod.env'</span>),
    <span class="hljs-built_in">index</span>: path.<span class="hljs-built_in">resolve</span>(assetsRoot, <span class="hljs-string">'index.html'</span>),// &lt;-----<span class="hljs-number">2</span>.<span class="hljs-keyword">change</span>
    assetsRoo<span class="hljs-variable">t:</span> assetsRoot,// &lt;-----<span class="hljs-number">3</span>.<span class="hljs-keyword">change</span>
    assetsSubDirectory: <span class="hljs-string">'assets'</span>,// &lt;-----<span class="hljs-number">4</span>.<span class="hljs-keyword">change</span>
    assetsPublicPath: <span class="hljs-string">'/'</span>,
    productionSourceMap: true,
    // Gzip off by default <span class="hljs-keyword">as</span> many popular static hosts such <span class="hljs-keyword">as</span>
    // Surge <span class="hljs-built_in">or</span> Netlify already gzip <span class="hljs-keyword">all</span> static assets <span class="hljs-keyword">for</span> you.
    // Before setting <span class="hljs-keyword">to</span> `true`, <span class="hljs-keyword">make</span> sure <span class="hljs-keyword">to</span>:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtension<span class="hljs-variable">s:</span> [<span class="hljs-string">'js'</span>, <span class="hljs-string">'css'</span>],
    // Run the build <span class="hljs-keyword">command</span> with <span class="hljs-keyword">an</span> extra <span class="hljs-keyword">argument</span> <span class="hljs-keyword">to</span>
    // View the bundle analyzer report after build finishe<span class="hljs-variable">s:</span>
    // `npm run build --report`
    // Set <span class="hljs-keyword">to</span> `true` <span class="hljs-built_in">or</span> `false` <span class="hljs-keyword">to</span> always turn it <span class="hljs-keyword">on</span> <span class="hljs-built_in">or</span> off
    bundleAnalyzerRepor<span class="hljs-variable">t:</span> process.env.npm_config_report
  },
  de<span class="hljs-variable">v:</span> {
    <span class="hljs-keyword">en</span><span class="hljs-variable">v:</span> require(<span class="hljs-string">'./dev.env'</span>),
    por<span class="hljs-variable">t:</span> <span class="hljs-number">3000</span>,// &lt;-----<span class="hljs-number">5</span>.<span class="hljs-keyword">change</span>
    autoOpenBrowser: true,
    assetsSubDirectory: <span class="hljs-string">'assets'</span>,// &lt;-----<span class="hljs-number">6</span>.<span class="hljs-keyword">change</span>
    assetsPublicPath: <span class="hljs-string">'/'</span>,
    proxyTable: {// &lt;-----<span class="hljs-number">7</span>.<span class="hljs-keyword">change</span>
      <span class="hljs-string">'/api/**'</span>: <span class="hljs-string">'http://localhost:8080'</span>//代理前台/api开头的请求，代理到<span class="hljs-number">8080</span>端口，spring boot的访问端口
    },
    // CSS Sourcemaps off by default because relative paths are <span class="hljs-string">"buggy"</span>
    // with this option, according <span class="hljs-keyword">to</span> the CSS-Loader README
    // (http<span class="hljs-variable">s:</span>//github.<span class="hljs-keyword">com</span>/webpack/css-loader#sourcemaps)
    // In our experience, they generally work <span class="hljs-keyword">as</span> expected,
    // just <span class="hljs-keyword">be</span> aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
</code></pre>
<p>5.测试show/web子项目的开发环境。关闭spring boot后台，在IDEA右侧Gradle栏目找到npmDev任务并运行。如果运行成功，会自动打开浏览器显示<a href="http://localhost:3000" rel="nofollow noreferrer" target="_blank">http://localhost:3000</a>，并显示Vue.js的模板页面，此时找到<code>show/web/src/components/Hello.vue</code>，修改一点内容：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App 333333333'//<-----change
    }
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haskell"><code>&lt;script&gt;
<span class="hljs-title">export</span> <span class="hljs-keyword">default</span> {
  name: 'hello',
  <span class="hljs-class"><span class="hljs-keyword">data</span> () {
    <span class="hljs-title">return</span> {
      <span class="hljs-title">msg</span>: '<span class="hljs-type">Welcome</span> <span class="hljs-title">to</span> <span class="hljs-type">Your</span> <span class="hljs-type">Vue</span>.<span class="hljs-title">js</span> <span class="hljs-type">App</span> 333333333'//&lt;<span class="hljs-comment">-----change</span>
    }</span>
  }
}
&lt;/script&gt;</code></pre>
<p>打开浏览器查看<a href="http://localhost:3000" rel="nofollow noreferrer" target="_blank">http://localhost:3000</a>，如果对应的内容更新了，则表明web子项目的开发环境正确。</p>
<p>如果运行npmDev报错，有可能是多次运行npmDev命令，有其它Node.js进程占用了端口，打开任务管理器关闭即可，如下图：<br><span class="img-wrap"><img data-src="/img/bVLNca?w=666&amp;h=593" src="https://static.alili.tech/img/bVLNca?w=666&amp;h=593" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>5.测试show/web子项目的打包。在IDEA右侧Gradle栏目找到npmBuild任务并运行。如果运行成功，webpack打包的前端资源会输出到show/web/build目录下，如下图：<br><span class="img-wrap"><img data-src="/img/bVLNcD?w=386&amp;h=609" src="https://static.alili.tech/img/bVLNcD?w=386&amp;h=609" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><strong>注意：</strong></p>
<p>我把webpack的打包输出路径故意设置成build/resources/main/static，这样子，web子项目打成jar包后，在classpath中的路径就是/static目录了，即跟spring boot默认的静态资源查找路径是一样的。</p>
<p>再者，server子项目依赖web项目（show/server/build.gradle中的<code>compile project(':web')</code>配置），所以server子项目打jar包前会先将web子项目打成jar包，web子项目的jar包中已经包含了webpack输出的静态资源。</p>
<p>所以，当server子项目打包后，访问<a href="http://localhost:8080/index.html" rel="nofollow noreferrer" target="_blank">http://localhost:8080/index.html</a>就能访问到web子项目webpack打包的输出的index.html文件。</p>
<p><strong>注意：</strong><br>server子项目打包前，请先删除show/server/src/main/resources/static目录，避免与web子项目打包过来的文件重复。</p>
<h2 id="articleHeader6">7.开发调试</h2>
<ol>
<li>先运行show/server子项目的bootRun任务，启动Spring Boot</li>
<li>再运行show/web子项目的npmDev任务，启动node的开发服务器</li>
<li>当show/web子项目有请求需要调用Spring Boot后台，加上<strong>/api前缀</strong>，请求即可代理从node的开发服务器<a href="http://localhost:3000/api/xxxx" rel="nofollow noreferrer" target="_blank">http://localhost:3000/api/xxxx</a>代理到<a href="http://localhost:8080/api/xxxx" rel="nofollow noreferrer" target="_blank">http://localhost:8080/api/xxxx</a>
</li>
<li>而在开发前台页面时候（对show/web/src目录下的文件修改），应该访问<a href="http://localhost:3000/" rel="nofollow noreferrer" target="_blank">http://localhost:3000/</a>，而不是8080端口，访问3000端口，即可看到页面修改的即时效果。</li>
</ol>
<h2 id="articleHeader7">8.打包</h2>
<p>运行show/server子项目的build任务，即可完成打包。打包的jar包已经包含show/web子项目的输出内容。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用Gradle整合SpringBoot+Vue.js-开发调试与打包

## 原文链接
[https://segmentfault.com/a/1190000008968295](https://segmentfault.com/a/1190000008968295)

