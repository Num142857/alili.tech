---
title: '简单说说 angular.json 文件' 
date: 2019-02-14 2:30:37
hidden: true
slug: pln1wv8utp
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">...</h2>
<p>在<code>Angular CLI 6+</code>的版本后，原先的<code>angular-cli.json</code>就被换成了<code>angular.json</code>，而其中里面的字段变化挺大了，如果不了解基本的组成，或者直接把老版本的代码 copy 到新版本的工作空间中，会导致一些很不友好的错误。</p>
<p>这种变化主要还是因为<code>Angular CLI</code>引入了 <code>monorepo</code> (一个空间管理多个项目) 的开发模式，即使用<code>ng new</code>出来的相当于一个大的工作空间，通过<code>angular.json</code>配置来管理各种<code>ng generate application | library</code>出来的项目或组件库。</p>
<p>其实这种模式优势还是很明显的，比如一个公司有多种管理平台或者产品时，使用这种方式可以统一各个项目的环境，各个项目间共用的组件也被统一维护起来，所有项目共用<code>npm</code>包以及<code>typescript</code>配置。</p>
<p><code>monorepo</code>下结构如：<br><span class="img-wrap"><img data-src="/img/bVbiIEd?w=340&amp;h=518" src="https://static.alili.tech/img/bVbiIEd?w=340&amp;h=518" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>但是其实大多数人还是一个工作空间维护一个项目，所以这个在这里不那么重要，只是想说<code>json</code>文件的改变是为了新的模式而已。</p>
<h2 id="articleHeader1">
<code>Angular.json</code>的部分字段</h2>
<p>当你<code>ng new</code>一个工作空间时，默认会在根目录创建一个项目以及对应<code>e2e</code>项目。初始的<code>angular.json</code>结构如下（省略的部分的配置代码）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;$schema&quot;: &quot;./node_modules/@angular/cli/lib/config/schema.json&quot;,
    &quot;version&quot;: 1,
    &quot;newProjectRoot&quot;: &quot;projects&quot;,
    &quot;projects&quot;: {
        &quot;xxxx&quot;: {
            &quot;root&quot;: &quot;&quot;,
            &quot;sourceRoot&quot;: &quot;src&quot;,
            &quot;projectType&quot;: &quot;application&quot;,
            &quot;prefix&quot;: &quot;app&quot;,
            &quot;schematics&quot;: {},
            &quot;architect&quot;: {}
        }
    },
    &quot;defaultProject&quot;: &quot;xxxx&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
    <span class="hljs-attr">"$schema"</span>: <span class="hljs-string">"./node_modules/@angular/cli/lib/config/schema.json"</span>,
    <span class="hljs-attr">"version"</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">"newProjectRoot"</span>: <span class="hljs-string">"projects"</span>,
    <span class="hljs-attr">"projects"</span>: {
        <span class="hljs-attr">"xxxx"</span>: {
            <span class="hljs-attr">"root"</span>: <span class="hljs-string">""</span>,
            <span class="hljs-attr">"sourceRoot"</span>: <span class="hljs-string">"src"</span>,
            <span class="hljs-attr">"projectType"</span>: <span class="hljs-string">"application"</span>,
            <span class="hljs-attr">"prefix"</span>: <span class="hljs-string">"app"</span>,
            <span class="hljs-attr">"schematics"</span>: {},
            <span class="hljs-attr">"architect"</span>: {}
        }
    },
    <span class="hljs-attr">"defaultProject"</span>: <span class="hljs-string">"xxxx"</span>
}</code></pre>
<p>这是部分的配置属性，我按照顺序简单做个记录，以后也好查阅。</p>
<h3 id="articleHeader2"><code>$schema</code></h3>
<p>指向一个 <a href="https://json-schema.org/" rel="nofollow noreferrer" target="_blank">JSON Schema</a> 文件，这个文件描述了<code>angular.json</code>所有的字段以及约束。</p>
<p>其实可以比作一个有“类型提示”功能文件，只要支持了这个功能的 IDE 或编辑器，在书写<code>angular.json</code>文件时便会给出相应的提示。</p>
<h3 id="articleHeader3"><code>version</code></h3>
<p>设置版本</p>
<h3 id="articleHeader4"><code>newProjectRoot</code></h3>
<p>新建项目所在的路径。</p>
<p>当使用<code>ng generate application | library</code>创建一个新的项目时，会自动装配到设定的<code>newProjectRoot</code>目录下</p>
<h3 id="articleHeader5"><code>projects</code></h3>
<p>放置所有项目的配置。其中一个项目为一个子项，如<code>xxxx</code>为一个项目，在创建时自动生成。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;projects&quot;: {
        &quot;xxxx&quot;: {
            &quot;root&quot;: &quot;&quot;,
            &quot;sourceRoot&quot;: &quot;src&quot;,
            &quot;projectType&quot;: &quot;application&quot;,
            &quot;prefix&quot;: &quot;app&quot;,
            &quot;schematics&quot;: {},
            &quot;architect&quot;: {}
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
    <span class="hljs-attr">"projects"</span>: {
        <span class="hljs-attr">"xxxx"</span>: {
            <span class="hljs-attr">"root"</span>: <span class="hljs-string">""</span>,
            <span class="hljs-attr">"sourceRoot"</span>: <span class="hljs-string">"src"</span>,
            <span class="hljs-attr">"projectType"</span>: <span class="hljs-string">"application"</span>,
            <span class="hljs-attr">"prefix"</span>: <span class="hljs-string">"app"</span>,
            <span class="hljs-attr">"schematics"</span>: {},
            <span class="hljs-attr">"architect"</span>: {}
        }
    }
}</code></pre>
<p>在一个单独的配置中，可以通过灵活的配置实现一些自动化操作还有使用<code>CLI</code>内置的一些指令。</p>
<h4><code>root</code></h4>
<p>代表项目的“根目录”，也就是项目所在的位置，或者说项目源码的父级目录。项目的根目录包含了一些特定的配置。</p>
<h4><code>sourceRoot</code></h4>
<p>项目源码所在的目录，通常默认使用<code>src</code>目录。</p>
<h4><code>projectType</code></h4>
<p>标示这个项目是<code>application</code>还是<code>library</code></p>
<h4><code>prefix</code></h4>
<p>使用<code>ng generate component | directive</code>生成组件或者指令时默认的<code>selector</code>前缀，通常我们使用命令创建的组件或指令都是<code>app-xxx</code>格式，我们可以手动在这里改动，使整个项目生效。</p>
<h4><code>schematics</code></h4>
<p><code>CLI</code>中生成组件、指令、模块等文件的指令是使用<code>@angular-devkit/schematics</code>实现的，这些指令通常带有一些快捷配置，比如一个生成组件的命令：<code>ng g c --spec=false --styleext=scss</code>，这条命令可以直接生成一个 <strong>不带测试文件、使用<code>scss</code>为样式文件</strong> 的组件。如果每次都要手动输入这些配置就会显得麻烦，所以<code>angular.json</code>提供了<code>schematics</code>属性来统一设置一些生成类的命令配置。</p>
<p>这里的<code>schematics</code>是针对单个<code>project</code>来的。整个<code>angular.json</code>也有此字段，默认生效于所有<code>project</code>。</p>
<p><code>CLI</code>预设了几组选项，我们可以针对不同的选项进行配置：</p>
<ul>
<li><code>@schematics/angular:component</code></li>
<li><code>@schematics/angular:class</code></li>
<li><code>@schematics/angular:directive</code></li>
<li><code>@schematics/angular:guard</code></li>
<li><code>@schematics/angular:module</code></li>
<li><code>@schematics/angular:pipe</code></li>
<li><code>@schematics/angular:service</code></li>
</ul>
<p>拿<code>component</code>举例，如果要实现统一<code>ng g c --spec=false --styleext=scss</code>的效果，可以配置如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;schematics&quot;: {
        &quot;@schematics/angular:component&quot;: {
             &quot;styleext&quot;: &quot;less&quot;,
             &quot;spec&quot;: false
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
    <span class="hljs-attr">"schematics"</span>: {
        <span class="hljs-attr">"@schematics/angular:component"</span>: {
             <span class="hljs-attr">"styleext"</span>: <span class="hljs-string">"less"</span>,
             <span class="hljs-attr">"spec"</span>: <span class="hljs-literal">false</span>
        }
    }
}</code></pre>
<p>接着就可以直接使用<code>ng g c</code>直接生成对应的组件了。</p>
<h4><code>architect</code></h4>
<p>包含几组<code>CLI</code>相关的项目自动化命令配置，比如本地运行、编译、测试等等。默认预设了几组命令配置如<code>build</code>、<code>serve</code>等等：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;architect&quot;:{
        &quot;build&quot;:{},
        &quot;serve&quot;:{},
        &quot;extract-i18n&quot;:{},
        &quot;test&quot;:{},
        &quot;lint&quot;:{}
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
    <span class="hljs-attr">"architect"</span>:{
        <span class="hljs-attr">"build"</span>:{},
        <span class="hljs-attr">"serve"</span>:{},
        <span class="hljs-attr">"extract-i18n"</span>:{},
        <span class="hljs-attr">"test"</span>:{},
        <span class="hljs-attr">"lint"</span>:{}
    }
}</code></pre>
<h5>配置属性</h5>
<p>每一个配置项都有 3 个字段属性：<code>builder</code>，<code>options</code>，<code>configurations</code>，例如默认的<code>build</code>命令配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;architect&quot;: {
        &quot;build&quot;: {
            &quot;builder&quot;: &quot;@angular-devkit/build-angular:browser&quot;,
            &quot;options&quot;: {
                &quot;outputPath&quot;: &quot;dist/testApp&quot;,
                &quot;index&quot;: &quot;src/index.html&quot;,
                &quot;main&quot;: &quot;src/main.ts&quot;,
                &quot;polyfills&quot;: &quot;src/polyfills.ts&quot;,
                &quot;tsConfig&quot;: &quot;src/tsconfig.app.json&quot;,
                &quot;assets&quot;: [
                    &quot;src/favicon.ico&quot;,
                    &quot;src/assets&quot;
                ],
                &quot;styles&quot;: [
                    &quot;src/styles.css&quot;
                ],
                &quot;scripts&quot;: []
             },
             &quot;configurations&quot;: {
                 &quot;production&quot;: {
                     &quot;fileReplacements&quot;: [
                         {
                             &quot;replace&quot;: &quot;src/environments/environment.ts&quot;,
                             &quot;with&quot;: &quot;src/environments/environment.prod.ts&quot;
                         }
                     ],
                     &quot;optimization&quot;: true,
                     &quot;outputHashing&quot;: &quot;all&quot;,
                     &quot;sourceMap&quot;: false,
                     &quot;extractCss&quot;: true,
                     &quot;namedChunks&quot;: false,
                     &quot;aot&quot;: true,
                     &quot;extractLicenses&quot;: true,
                     &quot;vendorChunk&quot;: false,
                     &quot;buildOptimizer&quot;: true
                  }
              }
          }
      }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
    <span class="hljs-attr">"architect"</span>: {
        <span class="hljs-attr">"build"</span>: {
            <span class="hljs-attr">"builder"</span>: <span class="hljs-string">"@angular-devkit/build-angular:browser"</span>,
            <span class="hljs-attr">"options"</span>: {
                <span class="hljs-attr">"outputPath"</span>: <span class="hljs-string">"dist/testApp"</span>,
                <span class="hljs-attr">"index"</span>: <span class="hljs-string">"src/index.html"</span>,
                <span class="hljs-attr">"main"</span>: <span class="hljs-string">"src/main.ts"</span>,
                <span class="hljs-attr">"polyfills"</span>: <span class="hljs-string">"src/polyfills.ts"</span>,
                <span class="hljs-attr">"tsConfig"</span>: <span class="hljs-string">"src/tsconfig.app.json"</span>,
                <span class="hljs-attr">"assets"</span>: [
                    <span class="hljs-string">"src/favicon.ico"</span>,
                    <span class="hljs-string">"src/assets"</span>
                ],
                <span class="hljs-attr">"styles"</span>: [
                    <span class="hljs-string">"src/styles.css"</span>
                ],
                <span class="hljs-attr">"scripts"</span>: []
             },
             <span class="hljs-attr">"configurations"</span>: {
                 <span class="hljs-attr">"production"</span>: {
                     <span class="hljs-attr">"fileReplacements"</span>: [
                         {
                             <span class="hljs-attr">"replace"</span>: <span class="hljs-string">"src/environments/environment.ts"</span>,
                             <span class="hljs-attr">"with"</span>: <span class="hljs-string">"src/environments/environment.prod.ts"</span>
                         }
                     ],
                     <span class="hljs-attr">"optimization"</span>: <span class="hljs-literal">true</span>,
                     <span class="hljs-attr">"outputHashing"</span>: <span class="hljs-string">"all"</span>,
                     <span class="hljs-attr">"sourceMap"</span>: <span class="hljs-literal">false</span>,
                     <span class="hljs-attr">"extractCss"</span>: <span class="hljs-literal">true</span>,
                     <span class="hljs-attr">"namedChunks"</span>: <span class="hljs-literal">false</span>,
                     <span class="hljs-attr">"aot"</span>: <span class="hljs-literal">true</span>,
                     <span class="hljs-attr">"extractLicenses"</span>: <span class="hljs-literal">true</span>,
                     <span class="hljs-attr">"vendorChunk"</span>: <span class="hljs-literal">false</span>,
                     <span class="hljs-attr">"buildOptimizer"</span>: <span class="hljs-literal">true</span>
                  }
              }
          }
      }
}</code></pre>
<p>这个是项目默认生成的配置。</p>
<p><strong><code>builder</code></strong>代表要执行的内置程序，因为<code>CLI</code>内置了一些自动化工具，<code>architect</code>只是提供了一个<code>facade</code>模式（通俗地讲，就是开发者不需要知道内部的复杂实现）给开发者配置使用，本质上还是调用的内置工具。</p>
<p><strong><code>options</code></strong>代表针对当前<code>builder</code>要配置的配置项，调用不同的内置程序，是需要传对应的配置项的，由于配置项很多，这里也不会列出。</p>
<p><strong><code>configurations</code></strong>代表这个命令的多种调用模式，在此配置里，我们可以定义不同的别名，然后使用不同的配置（配置的字段还是属于<code>options</code>里的），最后在使用命令时便可以手动选择不同的模式。</p>
<h5>如何使用</h5>
<p><code>CLI</code>其实内置了几个快捷命令来对应默认生成的配置如<code>ng serve</code>、<code>ng build</code>等等，如果是我们额外自定义的配置，则可以使用<strong><code>ng run &lt;project&gt;:&lt;architect&gt;[:configurations] [其他配置]</code></strong><br>命令来实现，其中<code>project</code>和<code>architect</code>为必填，<code>configurations</code>为选填。</p>
<p>比如我们简单额外自定义一个本地运行的服务器命令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;architect&quot;:{
        &quot;myServe&quot;:{
            &quot;builder&quot;: &quot;@angular-devkit/build-angular:dev-server&quot;,
            &quot;options&quot;: {
                &quot;browserTarget&quot;: &quot;xxxx:build&quot;,
                &quot;port&quot;: 8800
            },
            &quot;configurations&quot;: {
                &quot;port1&quot;: {
                    &quot;port&quot;: 8801
                },
                &quot;port2&quot;: {
                    &quot;port&quot;: 880
                }
            }
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
    <span class="hljs-attr">"architect"</span>:{
        <span class="hljs-attr">"myServe"</span>:{
            <span class="hljs-attr">"builder"</span>: <span class="hljs-string">"@angular-devkit/build-angular:dev-server"</span>,
            <span class="hljs-attr">"options"</span>: {
                <span class="hljs-attr">"browserTarget"</span>: <span class="hljs-string">"xxxx:build"</span>,
                <span class="hljs-attr">"port"</span>: <span class="hljs-number">8800</span>
            },
            <span class="hljs-attr">"configurations"</span>: {
                <span class="hljs-attr">"port1"</span>: {
                    <span class="hljs-attr">"port"</span>: <span class="hljs-number">8801</span>
                },
                <span class="hljs-attr">"port2"</span>: {
                    <span class="hljs-attr">"port"</span>: <span class="hljs-number">880</span>
                }
            }
        }
    }
}</code></pre>
<p>配置使用了内置的运行本地服务器程序，然后使用默认的<code>build</code>配置，加上自定义的运行端口，另外加上两个不同模式，运行不同端口。</p>
<p>使用<code>ng run xxxx:myServe</code>可以正常运行本地服务器跑项目，端口是<code>8800</code><br>使用<code>ng run xxxx:myServe:port1</code>端口是<code>8801</code></p>
<p>当然，我们还可以直接使用额外的命令行配置直接覆盖已经定义的配置：<br><code>ng run xxxx:myServe:port1 --port=8808</code></p>
<p>这里的例子只是为了简单了解下<code>architect</code>的用法。</p>
<h3 id="articleHeader6"><code>defaultProject</code></h3>
<p>默认项目，当使用一些<code>CLI</code>命令没有指定项目名称时，默认指向的项目。</p>
<h2 id="articleHeader7">schema.json</h2>
<p>其实我只是为了记录自己有点印象的属性，整个<code>angular.json</code>还有很多其他的字段，如果想要全面了解，我们可以直接打开<code>$schema</code>所指向的文件，里面详细地展示了各种字段的类型、配置以及描述说明。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
简单说说 angular.json 文件

## 原文链接
[https://segmentfault.com/a/1190000016821515](https://segmentfault.com/a/1190000016821515)

