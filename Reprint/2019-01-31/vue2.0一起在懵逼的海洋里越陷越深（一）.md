---
title: 'vue2.0一起在懵逼的海洋里越陷越深（一）' 
date: 2019-01-31 2:31:16
hidden: true
slug: lpa43uvsx1
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">就在今年的10月份，Vue2.0发布啦，来懵逼的海洋里一起下沉吧！</h3>
<p>前段阵子都没有发随笔，一方面要准备一场考试，另一方面是在研究vue2.0，又一方面一时也不知道写点什么好。<br><strong><em>（而其实最大的方面是自己找到了偷懒不写随笔的理由了。。。）</em></strong></p>
<hr>
<p><a href="http://leenty.com/img/vue/vue2.0.png" rel="nofollow noreferrer" target="_blank">http://leenty.com/img/vue/vue...</a><br><span class="img-wrap"><img data-src="/img/bVGaXK?w=600&amp;h=600" src="https://static.alili.tech/img/bVGaXK?w=600&amp;h=600" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><strong> @周星星和江南另外三大才子有佳句流传：</strong><br>山下一群鹅，嘘声赶落河.<br>下河捉鹅医肚饿，吃完回家玩...<br>呃...玩vue2.0 咳咳咳咳</p>
<p><strong> 先看看vue2.0多了哪些好玩的 </strong></p>
<ul>
<li><p>virtual-DOM（据说不是普通的Virtual-DOM）</p></li>
<li><p>Templates || JSX || Hyperscript(现在，你可以选择你喜欢的编写模式进行开发了)</p></li>
<li><p>流式服务端渲染（这个听起来很厉害，后面一起研究）</p></li>
<li><p>其他（各种性能优化，更多想象发挥空间，更多可能）</p></li>
</ul>
<p><strong> 伴随着vue2.0的更新，vue生态链的其他组件也跟着进行了更新 </strong></p>
<ul>
<li><p>vue-router</p></li>
<li><p>vue-resource</p></li>
<li><p>vue-cli</p></li>
</ul>
<h3 id="articleHeader1">好，进入正题</h3>
<p>先贴个地址，<a href="http://vue2.leenty.com" rel="nofollow noreferrer" target="_blank">我的vue2.0的demo</a><br>这个demo使用vue-cli快速生成还发环境<br>加入vue-router做前端路由<br>加入vue-resource做ajax<br>加入vuex做状态管理<br>demo里目前使用hash模式<br>具体的会在接下来一一介绍</p>
<p><strong> 具体细节 </strong></p>
<p>好的，现在打开你的终端，开始开车啦！?</p>
<ul><li><p>安装vue-cli</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -g vue-cli" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code class="shell" style="word-break: break-word; white-space: initial;">npm install -g vue-<span class="hljs-keyword">cli</span></code></pre>
<ul><li><p>创建vue项目<br>语法：</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vue init <template-name> <project-name>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code class="shell" style="word-break: break-word; white-space: initial;">vue init &lt;template-<span class="hljs-built_in">name</span>&gt; &lt;project-<span class="hljs-built_in">name</span>&gt;</code></pre>
<p>这里我选择使用webpack来创建（可以参考<a href="http://leenty.com/2016/06/02/git%E5%85%A5%E9%97%A8%E7%BA%A7-%E5%9C%A8github%E5%88%9B%E5%BB%BA%E9%A1%B9%E7%9B%AE/" rel="nofollow noreferrer" target="_blank">git入门级-在github创建项目</a>）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vue init webpack app" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code class="shell" style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">vue init webpack app</span></code></pre>
<p>之后vue-cli就会询问Project name，你可以输入你的工程名，或者直接回车就会默认使用之前的名称<br>之后还会有一系列询问，你可以一路回车下来，这样就创建好了一个<br>大概会是这样子<br><a href="http://leenty.com/img/vue/vue-cli.png" rel="nofollow noreferrer" target="_blank">http://leenty.com/img/vue/vue...</a><br><span class="img-wrap"><img data-src="/img/bVGaXS?w=1090&amp;h=730" src="https://static.alili.tech/img/bVGaXS?w=1090&amp;h=730" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<ul><li><p>安装依赖</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code class="shell" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">npm</span> i</code></pre>
<p>当完成这一步步骤后就可以使用命令启动vue应用了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code class="shell" style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">run</span><span class="bash"> dev</span></code></pre>
<ul><li><p>接下来就安装其他需要的组件，vue-router,vue-resource,vuex</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install vue-router vue-resource vuex --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code class="shell" style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> vue-router vue-<span class="hljs-keyword">resource</span> vuex <span class="hljs-comment">--save</span></code></pre>
<p>到这一步，vue项目的骨架已经好了。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue2.0一起在懵逼的海洋里越陷越深（一）

## 原文链接
[https://segmentfault.com/a/1190000007629594](https://segmentfault.com/a/1190000007629594)

