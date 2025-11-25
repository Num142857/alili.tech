---
title: 'almost最好的Vue + Typescript系列01 环境搭建篇' 
date: 2018-12-11 2:30:10
hidden: true
slug: anwfhx5tgnf
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>hello~ 大家好。 初来乍到，请多多关照 ?(๑•̀ㅂ•́)و✧<br>也许这是第一套基于 vue-cli 3.x 搭建基于 typescript 的vue项目教程。<br>2018年3月初,vue-cli 升级到了新的版本3.x版，跟vue-cli 2.x版本项目结构发生了很大的改变，目录结构更简洁更科学。 <br>并且可以选配 TypeScript，在此之前配置 TypeScript 略麻烦，typescript 是 JavaScript的超级，静态类型，便捷的注解，使前端代码优雅。</p>
<h2 id="articleHeader1">前期准备</h2>
<p>不用怕,下面开始一步步教你构建一个vue项目:</p>
<p>我大概总结了构建项目的几个步骤:</p>
<ol>
<li>vue-cli 脚手架生成项目结构 (此篇文章主要介绍第一步)</li>
<li>封装网络请求接口,还可以再根据业务进行一些封装</li>
<li>网络请求异常处理的封装</li>
<li>根据个人喜好配置一些插件,如<a href="https://palantir.github.io/tslint/" rel="nofollow noreferrer" target="_blank">tslint</a>
</li>
</ol>
<p>环境依赖: <a href="https://gold.xitu.io" rel="nofollow noreferrer" target="_blank">Node.js</a> ;<br>vue官方脚手架: <a href="https://www.npmjs.com/package/vue-cli" rel="nofollow noreferrer" target="_blank">vue-cli</a></p>
<h2 id="articleHeader2">开始动手</h2>
<blockquote>利用最新版的脚手架vue-cli构建初始项目<br>参考github: <a href="https://github.com/vuejs/vue-cli" rel="nofollow noreferrer" target="_blank">vue-cli</a>
</blockquote>
<h4>1.安装最新的脚手架包</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -g @vue/cli" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">npm</span> install -g @vue/cli</code></pre>
<h4>2.初始化项目(注意不是init,而且create)</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vue create vue-project(取你要的项目名字)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">vue <span class="hljs-keyword">create</span> vue-<span class="hljs-keyword">project</span>(取你要的项目名字)</code></pre>
<h4>3.自定义项目需求:</h4>
<p>默认当前default,按键盘向下键,将箭头切换到Manually select features(手动选择功能),enter键<br><span class="img-wrap"><img data-src="/img/bV5wz0?w=355&amp;h=86" src="https://static.alili.tech/img/bV5wz0?w=355&amp;h=86" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bV5wLS?w=267&amp;h=73" src="https://static.alili.tech/img/bV5wLS?w=267&amp;h=73" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>这时候出现了一些配置项,选择适合本次项目的配置: (按空格确认选择,down往下移动,不要按错啦)<br><span class="img-wrap"><img data-src="/img/bV5wNE?w=514&amp;h=170" src="https://static.alili.tech/img/bV5wNE?w=514&amp;h=170" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>按下回车键,进入下一个配置:<br><span class="img-wrap"><img data-src="/img/bV5wOz?w=646&amp;h=82" src="https://static.alili.tech/img/bV5wOz?w=646&amp;h=82" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bV5wOG?w=622&amp;h=92" src="https://static.alili.tech/img/bV5wOG?w=622&amp;h=92" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>sass or less,个人偏向于sass,所以这里选择了sass:<br><span class="img-wrap"><img data-src="/img/bV5wPk?w=910&amp;h=167" src="https://static.alili.tech/img/bV5wPk?w=910&amp;h=167" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>下一步出现了<strong>In dedicated config files</strong> or <strong>In package.json</strong><br><span class="img-wrap"><img data-src="/img/bV5wPD?w=841&amp;h=162" src="https://static.alili.tech/img/bV5wPD?w=841&amp;h=162" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>建议选择分<strong>In dedicated config files</strong>(专门的配置文件),会自动生成一个vue.config.js的文件,因为新的脚手架没有特殊的webpack.config.json,为了使结构更清晰,我们单独将配置放在一个文件夹下面,不跟package.json揉在一起</p>
<p>继续向下选择<br><span class="img-wrap"><img data-src="/img/bV5wWE?w=819&amp;h=164" src="https://static.alili.tech/img/bV5wWE?w=819&amp;h=164" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>保存成功后,开始安装啦~~<br>安装成功后,提示:<br><span class="img-wrap"><img data-src="/img/bV5wAz?w=396&amp;h=97" src="https://static.alili.tech/img/bV5wAz?w=396&amp;h=97" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<hr>
<p>此时项目大概结构已经有了,选择我们熟悉的编辑器打开(这里推荐使用<a href="https://code.visualstudio.com/" rel="nofollow noreferrer" target="_blank">vscode</a>,对ts语法支持很好哦)</p>
<p>大致目录结构:<br><span class="img-wrap"><img data-src="/img/bV5wZo?w=323&amp;h=362" src="https://static.alili.tech/img/bV5wZo?w=323&amp;h=362" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>我们现在运行起来试试:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd vue-project
cnpm i
npm run serve" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-keyword">cd</span> vue-project
cnpm <span class="hljs-built_in">i</span>
npm <span class="hljs-keyword">run</span> serve</code></pre>
<blockquote>注意启动命令: npm run serve, 在package.json可查看相应的启动命令<span class="img-wrap"><img data-src="/img/bV5wEJ?w=445&amp;h=100" src="https://static.alili.tech/img/bV5wEJ?w=445&amp;h=100" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span>
</blockquote>
<p>启动成功:<br><span class="img-wrap"><img data-src="/img/bV5wFq?w=463&amp;h=167" src="https://static.alili.tech/img/bV5wFq?w=463&amp;h=167" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>好啦~ 脚手架运行起来以后,下面我们该根据自己需要的需要配置自己的项目了</p>
<h2 id="articleHeader3">安装 <a href="https://github.com/buzinas/tslint-eslint-rules" rel="nofollow noreferrer" target="_blank">tslint</a>
</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save-dev tslint-eslint-rules" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code style="word-break: break-word; white-space: initial;">npm install --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span> tslint-eslint-rules</code></pre>
<p><strong>新建文件</strong> tslint.json , 根据自己的喜好配置啦,附上我的tslint.json文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;defaultSeverity&quot;: &quot;warning&quot;,
  &quot;extends&quot;: [
    &quot;tslint:recommended&quot;
  ],
  &quot;rules&quot;: {
    &quot;quotemark&quot;: [true, &quot;single&quot;],
    &quot;indent&quot;: [true, &quot;spaces&quot;, 2],
    &quot;interface-name&quot;: false,
    &quot;ordered-imports&quot;: false,
    &quot;object-literal-sort-keys&quot;: false,
    &quot;no-trailing-whitespace&quot;: false,
    &quot;no-consecutive-blank-lines&quot;: false,
    &quot;semicolon&quot;: [true, &quot;never&quot;],
    &quot;trailing-comma&quot;: [true, {&quot;multiline&quot;: &quot;never&quot;, &quot;singleline&quot;: &quot;never&quot;}]
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"defaultSeverity"</span>: <span class="hljs-string">"warning"</span>,
  <span class="hljs-attr">"extends"</span>: [
    <span class="hljs-string">"tslint:recommended"</span>
  ],
  <span class="hljs-attr">"rules"</span>: {
    <span class="hljs-attr">"quotemark"</span>: [<span class="hljs-literal">true</span>, <span class="hljs-string">"single"</span>],
    <span class="hljs-attr">"indent"</span>: [<span class="hljs-literal">true</span>, <span class="hljs-string">"spaces"</span>, <span class="hljs-number">2</span>],
    <span class="hljs-attr">"interface-name"</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">"ordered-imports"</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">"object-literal-sort-keys"</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">"no-trailing-whitespace"</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">"no-consecutive-blank-lines"</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">"semicolon"</span>: [<span class="hljs-literal">true</span>, <span class="hljs-string">"never"</span>],
    <span class="hljs-attr">"trailing-comma"</span>: [<span class="hljs-literal">true</span>, {<span class="hljs-attr">"multiline"</span>: <span class="hljs-string">"never"</span>, <span class="hljs-attr">"singleline"</span>: <span class="hljs-string">"never"</span>}]
  }
}
</code></pre>
<h2 id="articleHeader4">题外话</h2>
<blockquote>第一篇主要介绍了下基于vue-cli 3.x + typescript环境搭建篇,下一篇简单介绍一下<a href="https://segmentfault.com/a/1190000013676789">vue项目结构详解</a>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
almost最好的Vue + Typescript系列01 环境搭建篇

## 原文链接
[https://segmentfault.com/a/1190000013676663](https://segmentfault.com/a/1190000013676663)

