---
title: 'Angular4.0.0强势发布，全向后兼容' 
date: 2019-01-18 2:30:34
hidden: true
slug: td4oed3ve4
categories: [reprint]
---

{{< raw >}}

                    
<p>经历了6个RC版本之后，今天Angular发布了4.0.0版本，这次发布是主版本的更新（遵循采用语义版本），并且在大多数情况下，Angular4.0版本是向后兼容Angular2.0的。</p>
<p>那么，这次Angular4版本主要更新了什么呢？</p>
<ul>
<li><p>体积更小，速度更快<br>Angular应用程序变得更小更快，并且在未来几个月将进一步改进框架。</p></li>
<li><p>更好的模板引擎<br>改进了AoT，将生成的代码的大小减少约60％。如果模板越复杂，那么优化的代码也会越多。（译者注：当然，这对于用户来说，完全是透明的，public api 没有发生变化。）</p></li>
<li><p>动画模块改进<br>将动画从@angular/core中分离开来，区分核心模块与动画模块，精简核心模块体积。</p></li>
</ul>
<p>再来看看Angular4给我们带来了哪些新的特性。</p>
<ul><li><p>增强 <em>ngIf 和 </em>ngFor 语法<br>模板绑定语法进行了几个有用的更改。现在可以使用if / else样式语法，并分配局部变量，例如在展开observable时。</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div *ngIf=&quot;userList | async as users; else loading&quot;>
      <user-profile *ngFor=&quot;let user of users; count as count&quot; [user]=&quot;user&quot;>
      </user-profile>
     <div>"{{"count"}}" total users</div>
</div>
<ng-template #loading>Loading...</ng-template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> *<span class="hljs-attr">ngIf</span>=<span class="hljs-string">"userList | async as users; else loading"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">user-profile</span> *<span class="hljs-attr">ngFor</span>=<span class="hljs-string">"let user of users; count as count"</span> [<span class="hljs-attr">user</span>]=<span class="hljs-string">"user"</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">user-profile</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span></span><span class="hljs-template-variable">"{{"count"}}"</span><span class="xml"> total users<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">ng-template</span> #<span class="hljs-attr">loading</span>&gt;</span>Loading...<span class="hljs-tag">&lt;/<span class="hljs-name">ng-template</span>&gt;</span></span></code></pre>
<ul>
<li><p>服务端渲染（Angular Universal）<br>原先的Angular Universal是社区人员维护的，后被angular官方采用。目前在4.0.0版本中，将大部分的代码集成在@angular/platform-server模块中。为大家带来更好的服务端渲染体验，更简单Api调用。请参见基于Angular4的服务端渲染demo： <a href="https://github.com/z827101859/angular-universal" rel="nofollow noreferrer" target="_blank">https://github.com/z827101859/angular-universal</a> 。之后，官方会为大家带来更好更全面的例子。</p></li>
<li><p>TypeScript 2.1 和 2.2 的兼容<br>Angular已更新为更新版本的TypeScript，提高了ngc的速度，并且有更好的类型检查机制。</p></li>
<li><p>模板的Source Maps<br>当模板中的某些内容发生错误时，Angular会生成源映射，从而为原始模板提供有意义的上下文。</p></li>
</ul>
<hr>
<p>更多内容，请参见Angular官方原文：<br><a href="http://angularjs.blogspot.hk/2017/03/angular-400-now-available.html" rel="nofollow noreferrer" target="_blank">http://angularjs.blogspot.hk/2017/03/angular-400-now-available.html</a></p>
<hr>
<h5>最后，给想要学习Angular的同学一个Angular4的模板项目，项目结合webpack进行打包，包含了当前Angular框架中的许多新特性，喜欢的同学不妨开始从这里学习：<a href="https://github.com/ntesmail/angular-webpack-template" rel="nofollow noreferrer" target="_blank">https://github.com/ntesmail/angular-webpack-template</a>
</h5>
<ol>
<li><p>git clone git@github.com:ntesmail/angular-webpack-template.git</p></li>
<li><p>npm install   （由于你懂的原因，这一步你可能会安装失败，这时候大家只能翻墙咯）</p></li>
<li><p>npm run start</p></li>
</ol>
<p>转载请申明@sweetyx</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Angular4.0.0强势发布，全向后兼容

## 原文链接
[https://segmentfault.com/a/1190000008815705](https://segmentfault.com/a/1190000008815705)

