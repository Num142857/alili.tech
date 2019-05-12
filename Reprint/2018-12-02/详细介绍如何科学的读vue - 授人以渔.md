---
title: '详细介绍如何科学的读vue - 授人以渔' 
date: 2018-12-02 2:30:15
hidden: true
slug: y8yujsqfj9
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>如果对您有帮助，请一定帮忙点个star，让我有更大的动力继续分享，如果您要转载，务必补上我的github地址，谢谢兄dei</strong><br>原发布于个人github仓库：<a href="https://github.com/screetBloom/wecat.js" rel="nofollow noreferrer" target="_blank">https://github.com/screetBloom/wecat.js</a></p>
<p>vue毫不疑问是我们写框架时借鉴的核心，<strong>但是据我观察，其实很多人是不会读这种成熟的库、框架的</strong>，所以在这里先和大家说一下如何读vue</p>
<h2 id="articleHeader0">科学读vue，授人以渔？element UI为什么取名element？</h2>
<p>接下来我们会具体的回答这两个问题。<br>毫无疑问，任何东西在刚起步的时候都是非常简单，当然也包括Vue，而且一开始的代码更能清晰的展示出来最一开始作者的思路      <br><br><br>我相信当你读vue源代码的时候，肯定也遇到过和我一样的问题，vue从2014年中后期大规模被使用以来，历时4年了。目前高度解耦的代码我是感觉很不好读的，很多时候我们都是看别人的博客和理解来读vue源码，不仅片面还都喜欢互相抄袭       <br>其实，我们自己也是可以尝试完全靠自己来理解vue的，不用去看某些人云亦云的博客     <br>然而当我们尝试去读源码，当我们打开<a href="https://github.com/vuejs/vue" rel="nofollow noreferrer" target="_blank">vue.js</a>,你会看到<br><span class="img-wrap"><img data-src="http://7xl4c6.com1.z0.glb.clouddn.com/FiaRUXW8uTUs_m8UQL1yNyKozBwu" src="https://static.alili.techhttp://7xl4c6.com1.z0.glb.clouddn.com/FiaRUXW8uTUs_m8UQL1yNyKozBwu" alt="vue的github主页" title="vue的github主页" style="cursor: pointer; display: inline;"></span><br><br><br>这里你会发现，即使你选"0.10"的branches，希望获取早期版本源码，那里面的代码也已经是中后期很系统的代码了，<strong>那么如何从最最最初期的代码读起呢？</strong>        <br>这个时候我们想到了commit，只要尤雨溪推代码，每次commit都会被记录下来，而在github上如何在当前仓库展示特定的某次commit呢？比如第一次的commit        <br>这个我先和大家说一下，github保存commit时是用的40位的hash值来标志某一次commit，呈现在浏览器上的url是这样子的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="https://github.com/vuejs/vue/tree/83fac017f96f34c92c3578796a7ddb443d4e1f17
// 也可以用7位hash来访问，如
https://github.com/vuejs/vue/tree/83fac01" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code class="bahs">https:<span class="hljs-regexp">//gi</span>thub.com<span class="hljs-regexp">/vuejs/</span>vue<span class="hljs-regexp">/tree/</span><span class="hljs-number">83</span>fac017f96f34c92c3578796a7ddb443d4e1f17
<span class="hljs-regexp">//</span> 也可以用<span class="hljs-number">7</span>位hash来访问，如
https:<span class="hljs-regexp">//gi</span>thub.com<span class="hljs-regexp">/vuejs/</span>vue<span class="hljs-regexp">/tree/</span><span class="hljs-number">83</span>fac01</code></pre>
<p>url格式是：仓库地址+'/tree/hash值'，那么我们只要获得commit的hash值，就可以读到vue从第一个提交到现在的所有版本的代码，不会有任何遗漏        <br>其实上述的url就是vue第一次提交的源代码，我们看图，注意标注的第一次提交：<br><span class="img-wrap"><img data-src="http://7xl4c6.com1.z0.glb.clouddn.com/FnMSjLvqUx99YYk4Jy2k3L5VUhkn" src="https://static.alili.techhttp://7xl4c6.com1.z0.glb.clouddn.com/FnMSjLvqUx99YYk4Jy2k3L5VUhkn" alt="vue的第一次提交" title="vue的第一次提交" style="cursor: pointer; display: inline;"></span><br><strong>那么现在的问题就来了，如何获取到每一次vue项目提交的commit的hash值呢？既然是github，很明显的需要借助git命令</strong>        <br>方法如下：</p>
<ul>
<li>git clone下来</li>
<li>在项目目录打开 控制台，输入“git log --oneline --decorate --graph --all”，来查看所有commit，你会发现有非常多的commit，远远大于github上统计的数字。可以输入10万直接翻到最后一个“83fac017”，那我们现在开始看看历史上的第一个版本的hash，然后在浏览器中输入<a href="https://github.com/vuejs/vue/tree/83fac017" rel="nofollow noreferrer" target="_blank">https://github.com/vuejs/vue/...</a> 在github上查看</li>
<li>查看对应的head 的hash值，修改tree后面的值访问即可，我们找几个提交的代码来看看(test目录都是测试代码，可以不看)</li>
</ul>
<p><span class="img-wrap"><img data-src="http://7xl4c6.com1.z0.glb.clouddn.com/FsWUczxuJLMhHpG7qW9NbcEvv7xx" src="https://static.alili.techhttp://7xl4c6.com1.z0.glb.clouddn.com/FsWUczxuJLMhHpG7qW9NbcEvv7xx" alt="查看hash" title="查看hash" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 看看第一次提交的代码，目录结构有好几个，但是主要代码就main.js里的一句
module.exports = 123
// 我们再看看第三次提交的代码，很明显的src目录里已经有了三个文件directives.js、filters.js、main.js；这部分可以自己去看
// 我们重点看一下目录'explorations/getset.html'
var app = new Element('test', {
    msg: 'hello'
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">// 看看第一次提交的代码，目录结构有好几个，但是主要代码就main.js里的一句
module.exports = 123
// 我们再看看第三次提交的代码，很明显的src目录里已经有了三个文件directives.js、filters.js、main.js；这部分可以自己去看
// 我们重点看一下目录<span class="hljs-string">'explorations/getset.html'</span>
var app = new Element(<span class="hljs-string">'test'</span>, {
    msg: <span class="hljs-string">'hello'</span>
})</code></pre>
<p><strong>有没有想到饿了吗前端为什么将自己的UI组件库取名"element UI"</strong>,猜的不错的话，一方面应该是致敬vue；<br>从中我们也很明显看得出来，他们很早以前就知道这个方法来查看vue的历史版本，但是遗憾的是，网上很少有"授人以鱼不如授人以渔"的做法，没人去说如何合理的去看源代码，大量充斥的都是对源码理解的相互抄袭      <br><strong>到这里，如何科学的读vue就结束了，读vue使用这种方法，读react呢？还有以后读各种库呢？</strong></p>
<p><strong>再次希望，如果对您有帮助，请一定帮忙点个star，让我有更大的动力继续分享，<a href="https://github.com/screetBloom/wecat.js" rel="nofollow noreferrer" target="_blank">https://github.com/screetBloom/wecat.js</a></strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
详细介绍如何科学的读vue - 授人以渔

## 原文链接
[https://segmentfault.com/a/1190000014680930](https://segmentfault.com/a/1190000014680930)

