---
title: '基于vue+vuex+localStorage开发的本地记事本' 
date: 2019-01-27 2:31:00
hidden: true
slug: m9z364mzitq
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>本文采用vue2.0+vuex+localStorage+sass+webpack，实现一个本地存储的记事本。兼容PC端和移动端。在线预览地址：<a href="http://blog.gdfengshuo.com/example/notepad/" rel="nofollow noreferrer" target="_blank">DEMO</a></p></blockquote>
<hr>
<h2 id="articleHeader0">功能说明</h2>
<ul>
<li>支持回车添加事件</li>
<li>
<p>支持事件状态切换</p>
<ul>
<li>添加事件 -&gt; 进入未完成列表</li>
<li>未完成 -&gt; 已完成(勾选checkbox)</li>
<li>未完成 -&gt; 已取消(点击取消按钮)</li>
<li>已完成 -&gt; 未完成(取消勾选checkbox)</li>
<li>已取消 -&gt; 未完成(点击恢复按钮)</li>
</ul>
</li>
<li>支持下载数据到notepad.txt文件</li>
<li>支持筛选事件</li>
<li>支持编辑事件</li>
<li>支持删除事件</li>
<li>支持清空所有事件</li>
<li>支持本地化存储</li>
<li>支持折叠面板</li>
<li>支持切换主题颜色 <img src="https://static.alili.techundefined" class="emoji" alt="sparkles" title="sparkles">
</li>
</ul>
<h2 id="articleHeader1">安装步骤</h2>
<p>本项目是使用vue-cli脚手架生成的项目，项目代码可以到我的github上clone下来。clone下来之后可进入文件目录</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git clone https://github.com/lin-xin/notepad.git      // 把模板下载到本地
cd notepad                                            // 进入模板目录
npm install                                           // 安装项目依赖，等待安装完成之后
npm run dev                                              // 即可在本地开启 http://localhost:8080 访问该项目

// 如果 node-sass 安装失败，可使用 cnpm 安装
npm install cnpm -g --registry=https://registry.npm.taobao.org
cnpm -v             // 查看cnpm版本号确认安装成功
cnpm install node-sass -D

//安装成功后再看看是否可以正确运行了
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code>git clone https:<span class="hljs-regexp">//gi</span>thub.com<span class="hljs-regexp">/lin-xin/</span>notepad.git      <span class="hljs-regexp">//</span> 把模板下载到本地
cd notepad                                            <span class="hljs-regexp">//</span> 进入模板目录
npm install                                           <span class="hljs-regexp">//</span> 安装项目依赖，等待安装完成之后
npm run dev                                              <span class="hljs-regexp">//</span> 即可在本地开启 http:<span class="hljs-regexp">//</span>localhost:<span class="hljs-number">8080</span> 访问该项目

<span class="hljs-regexp">//</span> 如果 node-sass 安装失败，可使用 cnpm 安装
npm install cnpm -g --registry=https:<span class="hljs-regexp">//</span>registry.npm.taobao.org
cnpm -v             <span class="hljs-regexp">//</span> 查看cnpm版本号确认安装成功
cnpm install node-sass -D

<span class="hljs-regexp">//</span>安装成功后再看看是否可以正确运行了
</code></pre>
<h2 id="articleHeader2">功能截图</h2>
<p><span class="img-wrap"><img data-src="https://raw.githubusercontent.com/lin-xin/notepad/master/screenshots/3.gif" src="https://static.alili.techhttps://raw.githubusercontent.com/lin-xin/notepad/master/screenshots/3.gif" alt="image" title="image" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="https://raw.githubusercontent.com/lin-xin/notepad/master/screenshots/2.gif" src="https://static.alili.techhttps://raw.githubusercontent.com/lin-xin/notepad/master/screenshots/2.gif" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader3">主要难点</h2>
<h3 id="articleHeader4">1.折叠面板</h3>
<p>难点：点击折叠面板title,要动画实现sliderUp和sliderDown，但是div高度auto，使用transition： height .3s无效。</p>
<p>解决方法：点击时候获取div高度值，赋值给style.height，然后再改变高度为0，这样transition才会生效。</p>
<h3 id="articleHeader5">2.切换状态</h3>
<p>难点：在不同的状态间切换，实时地把事件在不同状态列表中显示出来</p>
<p>解决方法：利用vuex进行状态管理，把所有事件和状态存储在store对象中，在组件中通过计算属性获得事件，因此就有了实时性。<br>关于vuex在该项目中更详细的应用可查看文章：<a href="https://github.com/lin-xin/blog/issues/5" rel="nofollow noreferrer" target="_blank">Vuex 模块化实现待办事项的状态管理</a></p>
<h3 id="articleHeader6">3.本地存储</h3>
<p>知识点：localStorage是HTML5提供的一种在客户端存储数据的新方法，没有时间限制，第二天、第二周或下一年之后，数据依然可用。</p>
<p>用法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1）存储数据：localStorage.setItem(item, value)
2）获取数据：localStorage.getItem(item)
3）移除数据：localStorage.removeItem(item)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs basic"><code><span class="hljs-number">1</span>）存储数据：localStorage.setItem(item, value)
<span class="hljs-number">2</span>）获取数据：localStorage.getItem(item)
<span class="hljs-number">3</span>）移除数据：localStorage.<span class="hljs-comment">removeItem(item)</span>
</code></pre>
<h3 id="articleHeader7">4.父子组件间的通讯</h3>
<p>知识点：组件实例的作用域是孤立的。这意味着不能并且不应该在子组件的模板内直接引用父组件的数据。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1）父组件可以使用 props 把数据传给子组件。
2）子组件可以使用 $emit 触发父组件的自定义事件。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">1</span>）父组件可以使用 props 把数据传给子组件。
<span class="hljs-number">2</span>）子组件可以使用 $emit 触发父组件的自定义事件。
</code></pre>
<h3 id="articleHeader8">5.筛选功能</h3>
<p>功能描述：可根据 类型 和 关键词 进行筛选</p>
<p>知识点：在返回所有事件的计算属性上，使用过滤器( filter )，进行对 type 和 content 的筛选，返回符合条件的事件。</p>
<h3 id="articleHeader9">6.切换主题</h3>
<p>功能描述：通过点击选中的颜色，改变整个记事本的主题风格，并永久保存。</p>
<p>知识点：使用vuex管理主题状态，并进行模块化管理，用localStorage永久存储选中的主题颜色。</p>
<h2 id="articleHeader10">总结</h2>
<p>虽然只是做了个小小的记事本，但是我感觉收获还是很大的，很多知识点掌握得更加的牢固。这个记事本只做了一个页面，就没有用vue-router，路由也是vue里很强大的功能。 做这个记事本的初衷，是因为在工作中，我都会把最近要做的事情给记在本子上，完成之后就会打钩，所以想把这个给放到电脑上去实现。</p>
<p>01-25：添加筛选功能<br>02-07：修复issues 取消事件的bug #1<br>02-28：添加下载数据到notepad.txt的功能<br>03-13：添加切换主题颜色功能</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于vue+vuex+localStorage开发的本地记事本

## 原文链接
[https://segmentfault.com/a/1190000008199523](https://segmentfault.com/a/1190000008199523)

