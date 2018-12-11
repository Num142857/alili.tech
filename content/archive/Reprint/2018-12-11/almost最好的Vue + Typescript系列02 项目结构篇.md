---
title: 'almost最好的Vue + Typescript系列02 项目结构篇' 
date: 2018-12-11 2:30:10
hidden: true
slug: 36luqvally4
categories: [reprint]
---

{{< raw >}}

                    
<p>基于vue-cli 3.x,配合typescript的环境构建的新vue项目,跟以前的结构相比,有了一些变化,下面我们来简单的了解一下</p>
<h2 id="articleHeader0">基本结构:</h2>
<p><span class="img-wrap"><img data-src="/img/bV5xGn?w=360&amp;h=226" src="https://static.alili.tech/img/bV5xGn?w=360&amp;h=226" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<ul>
<li>
<strong>node_modules:</strong>  项目中安装的依赖模块</li>
<li>
<strong>public:</strong> 主页文件index.html &amp;&amp; favicon.icon(将以往单独在外部的index.html移到了public文件夹下),index.html我们可以像平时普通的html文件一样引入文件(css,js)和书写基本信息，添加meta标签等。</li>
<li>
<strong>src:</strong> 源码文件夹，基本上我们的业务逻辑文件都应该放在这里</li>
<li>
<strong>package.json:</strong> 定义了这个项目所需要的各种模块，以及项目的配置信息（比如名称、版本、许可证等元数据）。npm install命令根据这个配置文件，自动下载所需的模块，也就是配置项目所需的运行和开发环境</li>
<li>
<strong>package-lock.json:</strong> 当 node_modules 或 package.json 发生变化时自动生成的文件，用以记录当前状态下实际安装的各个npm package的具体来源和版本号。 可参考: <a href="https://www.zhihu.com/question/62331583" rel="nofollow noreferrer" target="_blank">npm install 生成的package-lock.json是什么文件？有什么用？</a>
</li>
<li>
<strong>tsconfig.json:</strong> 指定了用来编译这个项目的根文件和编译选项 可参考: <a href="http://www.typescriptlang.org/docs/handbook/tsconfig-json.html" rel="nofollow noreferrer" target="_blank">tsconfig.json</a>
</li>
<li>
<strong>tslint.json:</strong> ts语言的语法检查,具体的操作和配置参数可参考我的另外一篇文章:<a href="https://segmentfault.com/a/1190000013676663?_ea=3438325">almost最好的Vue + Typescript系列01 环境搭建篇</a>
</li>
</ul>
<h2 id="articleHeader1">src文件,详细目录结构:</h2>
<p>在这里我根据平时项目经验,整理了一个分类比较合理的目录 ↓<br><span class="img-wrap"><img data-src="/img/bV5xSd?w=480&amp;h=438" src="https://static.alili.tech/img/bV5xSd?w=480&amp;h=438" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<ol>
<li>
<strong>api:</strong> 根据项目业务不同的模块进行分类,封装业务接口,如:<br><span class="img-wrap"><img data-src="/img/bV5xS6?w=193&amp;h=55" src="https://static.alili.tech/img/bV5xS6?w=193&amp;h=55" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span>
</li>
<li>
<strong>assets:</strong> 静态文件资源,通常我们用来存放一些公共的css,images,以文件夹区分:<br><span class="img-wrap"><img data-src="/img/bV5xSp?w=280&amp;h=130" src="https://static.alili.tech/img/bV5xSp?w=280&amp;h=130" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span>
</li>
<li>
<strong>common:</strong> 我们习惯放一些公共的ts文件,如封装好的网络请求</li>
<li>
<strong>utils:</strong> 这个就比较熟悉了,存放一些小的工具文件</li>
<li>
<strong>store:</strong> vuex状态管理工具的相关文件</li>
<li>
<p><strong>views &amp;&amp; components:</strong>  这里就涉及到木偶组件和智能组件(后续详解,也可先阅读其他资料)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="- views:  智能组件
- components: 木偶组件" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haml"><code>-<span class="ruby"> <span class="hljs-symbol">views:</span>  智能组件
</span>-<span class="ruby"> <span class="hljs-symbol">components:</span> 木偶组件</span></code></pre>
</li>
<li>
<strong>app.vue:</strong>  App.vue组件,整个项目的最外层组件,包含三个部分，一个是模板(html)，一个是script，一个是样式(css)</li>
<li>
<strong>main.ts:</strong> 入口文件,可以引入一些插件或静态资源的包，当然引入之前要先安装了该插件</li>
<li>
<strong>router.ts:</strong> 路由配置文件</li>
</ol>
<blockquote>该篇主要介绍了下基于vue-cli 3.x 的项目结构,怎么使项目看起来更加的合理和规范,下一篇将聊聊关于网络接口的请求封装</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
almost最好的Vue + Typescript系列02 项目结构篇

## 原文链接
[https://segmentfault.com/a/1190000013676789](https://segmentfault.com/a/1190000013676789)

