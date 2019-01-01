---
title: 'vue+webpack的快速使用指南（新手向）' 
date: 2019-01-02 2:30:09
hidden: true
slug: 6mbqvv3lvwk
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>一、vue有两种使用方式：</strong></p>
<p>1.下载vue.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;vue.js&quot;></script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>2.使用npm</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install vue
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code>npm <span class="hljs-keyword">install</span> vue
</code></pre>
<p><strong>二、在vue的mvc思想基础上，会有很多想实现的功能，可以不必原生写。比如ajax请求，各种插件。</strong></p>
<p>安装vue-cli，促使这些插件可以在vue上运行。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install vue-cli -g
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code>npm install vue-<span class="hljs-keyword">cli</span> -g
</code></pre>
<p><strong>三、vue安装成功测试</strong></p>
<p>cmd 中,(vue各种模板)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vue -V

vue list 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>vue -V

vue <span class="hljs-built_in">list</span> 
</code></pre>
<p><strong>四、使用vue，结合webpack开发。</strong></p>
<p>从vue的角度讲，使用了模块化编写代码。</p>
<p>从webpack的角度讲，编译后的代码，页面全是js写的，别人看不懂，也压缩了文件大小。</p>
<p><strong>五、vue+webpack简单流程操作</strong></p>
<p>1、文件夹中、shift+右键，选择“在此处打开命令窗口”</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vue init webpack test
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code>vue init webpack <span class="hljs-built_in">test</span>
</code></pre>
<blockquote><p>test是项目名字</p></blockquote>
<p>2、<br><span class="img-wrap"><img data-src="/img/bVT9rm?w=606&amp;h=343" src="https://static.alili.tech/img/bVT9rm?w=606&amp;h=343" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<blockquote><p>1.项目名字，<br>2.项目描述，<br>3.项目作者，<br>4.使用vue什么模式，<br>5.是否安装vue路由，<br>6.是否使用eslint检查代码（建议no，严格要求es6编码），<br>7.不知道， <br>8.不知道，</p></blockquote>
<p>3、进入项目文件夹，shift+右键，选择“在此处打开命令窗口”</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code>npm <span class="hljs-keyword">install</span>
</code></pre>
<blockquote><p>此步骤就是安装package.json中预设，要装的插件。</p></blockquote>
<p>4、<br><span class="img-wrap"><img data-src="/img/bVT9tn?w=263&amp;h=466" src="https://static.alili.tech/img/bVT9tn?w=263&amp;h=466" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<blockquote>
<p>1.build，vue能进行模块化编写，就靠它配置文件<br>2.config，webpack能打包，就靠它配置文件<br>3.dist，这个是打包后才出现的文件夹。里面装的就是打包后的项目文件<br>4.node_modules，安装vue各种插件的地方<br>5.src，项目编写的地方 assets，装资源的地方，图片，字体等</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="components，装模块，或者网页的地方。文件均为**.vue

router，配置路由，哪个地址，分配component下的哪个网页

App.vue,本身就是个components挂在外面的index.html上。index相当于投资人，甩手掌柜，App.vue相当于职业经理人，网页的事它主管。

main.js,和主管App.vue配套的，主管js。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">components</span>，装模块，或者网页的地方。文件均为**<span class="hljs-selector-class">.vue</span>

<span class="hljs-selector-tag">router</span>，配置路由，哪个地址，分配<span class="hljs-selector-tag">component</span>下的哪个网页

<span class="hljs-selector-tag">App</span><span class="hljs-selector-class">.vue</span>,本身就是个<span class="hljs-selector-tag">components</span>挂在外面的<span class="hljs-selector-tag">index</span><span class="hljs-selector-class">.html</span>上。<span class="hljs-selector-tag">index</span>相当于投资人，甩手掌柜，<span class="hljs-selector-tag">App</span><span class="hljs-selector-class">.vue</span>相当于职业经理人，网页的事它主管。

<span class="hljs-selector-tag">main</span><span class="hljs-selector-class">.js</span>,和主管<span class="hljs-selector-tag">App</span><span class="hljs-selector-class">.vue</span>配套的，主管<span class="hljs-selector-tag">js</span>。</code></pre>
<p>6.static，有它可以使用git项目版本管理<br>7.index.html，vue网页入口<br>8.package.json ,内置初始插件名称。后期再安装插件，npm i 插件名 --save ，可以保存进文件内</p>
</blockquote>
<p>5、.vue可以看成是.html，都有标签代码区域，js区域，css样式区域。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="又不同于.html，作用域都是独立的。所以js引用必须import导入，export导出。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code>又不同于.html，作用域都是独立的。所以js引用必须<span class="hljs-keyword">import</span>导入，<span class="hljs-keyword">export</span>导出。
</code></pre>
<p>6、运行项目<br>项目文件中，shift+右键，选择“在此处打开命令窗口”</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run dev 
npm run build 
npm start
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>npm <span class="hljs-keyword">run</span><span class="bash"> dev 
</span>npm <span class="hljs-keyword">run</span><span class="bash"> build 
</span>npm start
</code></pre>
<blockquote><p>dev就是webpack的开发模式，开发模式，就是压缩文件之前 <br>build就是项目完成后开始压缩文件，文件夹中出现dist文件夹，里面就是压缩后的项目<br>进入dist文件夹，shift+右键，选择“在此处打开命令窗口”  （运行项目）</p></blockquote>
<p>完结~然后就可以开始专注于代码的编写~<br>空缺错误之处，欢迎指导~</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue+webpack的快速使用指南（新手向）

## 原文链接
[https://segmentfault.com/a/1190000010960666](https://segmentfault.com/a/1190000010960666)

