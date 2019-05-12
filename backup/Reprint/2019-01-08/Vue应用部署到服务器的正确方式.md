---
title: 'Vue应用部署到服务器的正确方式' 
date: 2019-01-08 2:30:11
hidden: true
slug: vfbke8mt188
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">Vue应用部署到服务器的正确方式</h2>
<p>很多时候我们发现辛辛苦苦写的VueJs应用经过打包后在自己本地搭建的服务器上测试没有什么问题，但真正放在服务器上后，会发现或多或少的问题，比如：页面出现空白现象，获取资源路径不对等，我相信以VueJs为技术栈来进行前端开发的小伙伴或多或少都会遇到这样的问题，我也遇到过，那现在我们就来一一解决这样的问题。</p>
<h2 id="articleHeader1">如何打包</h2>
<ul><li><p>基于Vue-Cli,通过npm run build来进行打包的操作</p></li></ul>
<h2 id="articleHeader2">如何部署</h2>
<ul>
<li><p>将打包出来的资源，基于Vue-Cli的一般是dist目录下有static目录和index.html文件，可以直接将这两个文件扔到服务端</p></li>
<li><p>但有时候，我们会直接将dist文件扔到服务端</p></li>
</ul>
<h2 id="articleHeader3">出现的问题</h2>
<ul>
<li><p>打包到服务器后，出现资源引用路径的问题</p></li>
<li><p>打包到服务器后，出现空白页的问题</p></li>
<li><p>打包到服务器后，出现引入的css的type被拦截转换为"text/plain"问题</p></li>
<li><p>打包到服务器后，出现路由刷新404的问题</p></li>
</ul>
<h3 id="articleHeader4">出现资源引用路径的解决方案</h3>
<p>一般这个问题是由于在webpack配置打包发布的目录造成的。</p>
<ul>
<li>
<p>情况一.如果是将static与index.html直接放在服务器根目录,也就是说，当前的应用访问的网址如:<a href="http://www.xxx.com" rel="nofollow noreferrer" target="_blank">http://www.xxx.com</a></p>
<ul><li>
<p>解决办法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    配置输出的publiPath:&quot;/&quot;或者&quot;./&quot;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>    配置输出的<span class="hljs-string">publiPath:</span><span class="hljs-string">"/"</span>或者<span class="hljs-string">"./"</span>
</code></pre>
</li></ul>
</li>
<li>
<p>情况二.直接将打包后的dist文件放在了服务器的根目录，也就是如果需要访问当前的应用，访问的网址如:<a href="http://www.xxx.com/dist" rel="nofollow noreferrer" target="_blank">http://www.xxx.com/dist</a></p>
<ul><li>
<p>解决办法：</p>
<p>首先需要在创建路由实例中增加：<br>const router = new VueRouter({<br>mode: 'history',<br>base: '/mobile/',<br>scorllBehavior: () =&gt; ({</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="y: 0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code style="word-break: break-word; white-space: initial;"><span class="hljs-symbol">y:</span> <span class="hljs-number">0</span></code></pre>
<p>}),<br>routes<br>});<br>然后再打包发布目录:<br>publiPath:"/dist/"或者"http://www.xxx.com/dist/"</p>
</li></ul>
</li>
</ul>
<h3 id="articleHeader5">出现由于路由的history模式下刷新当前路由出现404的问题</h3>
<p>今天做的应用发布到服务器上，发现当刷新当前路由的时候，就会出现404的状况，其实这是<br>因为当刷新当前页面时候，所需要访问的资源在服务器上找不到，也就是说，我们在VueJs开发应用的过程中，设置路由的路径不是真实存在的路径，并且使用了history模式。</p>
<ul><li><p>解决办法</p></li></ul>
<p>需要后端进行配合,参考<a href="https://router.vuejs.org/en/essentials/history-mode.html" rel="nofollow noreferrer" target="_blank">https://router.vuejs.org/en/essentials/history-mode.html</a></p>
<h3 id="articleHeader6">出现引入的css的type被拦截转换为"text/plain"问题</h3>
<p>这是我开发过程中遇到的感觉很奇葩的问题，我们都知道，一般基于Vue-Cli，通过WebPack打包后的资源不需要更改什么。可是我发现，当我把代码进行上传后，输入网址，看见的页面把我吓坏了，发现所有样式不存在了，第一反应就是认为是自己在进行打包配置过程中出现了什么问题，然后通过fillder进行调试，发现css文件是正确获取到的</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010191673" src="https://static.alili.tech/img/remote/1460000010191673" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>可以看到，这个css文件的type被拦截转换为"text/plain"，这时候，我又把相关的配置文件看了两遍，后面发现，真的是日了狗了，让我哭一会儿。先上图</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010191674" src="https://static.alili.tech/img/remote/1460000010191674" alt="" title="" style="cursor: pointer;"></span></p>
<p>我擦，原来是服务器端返回的类型居然是"text/plain"。这个问题很好解决，把这图直接给后端，是不是感觉被坑了/(ㄒoㄒ)/~~。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue应用部署到服务器的正确方式

## 原文链接
[https://segmentfault.com/a/1190000010191670](https://segmentfault.com/a/1190000010191670)

