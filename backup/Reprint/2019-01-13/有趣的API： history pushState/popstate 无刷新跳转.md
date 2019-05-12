---
title: '有趣的API： history pushState/popstate 无刷新跳转' 
date: 2019-01-13 2:30:11
hidden: true
slug: hypzx00iduc
categories: [reprint]
---

{{< raw >}}

                    
<p>摸鱼逛知乎看到这么一个问题</p>
<p><span class="img-wrap"><img data-src="/img/bVOmkS?w=1558&amp;h=934" src="https://static.alili.tech/img/bVOmkS?w=1558&amp;h=934" alt="知乎" title="知乎" style="cursor: pointer; display: inline;"></span></p>
<p>这个API看起来貌似很厉害的样子，搜搜看</p>
<p><span class="img-wrap"><img data-src="/img/bVOmk1?w=1536&amp;h=1100" src="https://static.alili.tech/img/bVOmk1?w=1536&amp;h=1100" alt="baidu" title="baidu" style="cursor: pointer; display: inline;"></span><br>不得不说，张鑫旭真的厉害。</p>
<h2 id="articleHeader0">API介绍</h2>
<p>首先看看API如何使用：</p>
<ul>
<li>
<p><code>history.pushState(state, title, url)</code> :  无刷新的向浏览器 <strong>历史最前方</strong> 加入一条记录。</p>
<ul>
<li><p><code>state</code>(any) 需要保存的数据，这个数据在触发<code>popstate</code>事件时保存在<code>event.state</code>上。</p></li>
<li><p><code>title</code>(string)：</p></li>
</ul>
<blockquote><p>Firefox 目前忽略了這個參數，雖然他以後有可能會採用。如果以後改變了這個作法，傳送空白的字串應該還會是安全的。另外，你可以傳送一個短的標題來敘述你想要到的state。     <br>目前没有发现有地方保存这个<code>title</code>，推测是<code>state</code>的说明？</p></blockquote>
<ul>
<li><p><code>url</code>(string) 需要更改的<code>url</code>地址。</p></li>
<li><p><strong>ps：<code>pushState</code> 需要至少两个参数。</strong></p></li>
</ul>
</li>
<li><p><code>popstate</code>： 浏览器点击前进后退时触发的事件。<code>event.state</code>可以获取当前url下设置的<code>state</code>。</p></li>
</ul>
<p>另外获取<code>pushState</code>中设置的<code>state</code>不一定要在<code>popstate</code>事件中获取，直接<code>history.state</code>也可以拿到。</p>
<h2 id="articleHeader1">补充内容</h2>
<h3 id="articleHeader2">pjax</h3>
<p><code>pjax</code>,利用<code>ajax</code> 和 <code>pushState</code>做成的和多页应用体验一致的SPA。<a href="https://github.com/defunkt/jquery-pjax" rel="nofollow noreferrer" target="_blank">github项目地址</a></p>
<h3 id="articleHeader3">现代路由框架的H5模式。</h3>
<p>路由器的无刷新跳转也是利用该<code>api</code>完成的。<strong>另外，由于<code>url</code>变化，在用户复制分享时候由于路由未定义会出错，所以还需要服务端进行重定向处理。</strong></p>
<p>引用资料：</p>
<ol>
<li><p><a href="http://www.zhangxinxu.com/wordpress/2013/06/html5-history-api-pushstate-replacestate-ajax/" rel="nofollow noreferrer" target="_blank">张鑫旭：ajax与HTML5 history pushState/replaceState实例</a></p></li>
<li><p><a href="https://developer.mozilla.org/zh-TW/docs/Web/Guide/API/DOM/Manipulating_the_browser_history/Manipulating_the_browser_history" rel="nofollow noreferrer" target="_blank">mdn文档</a></p></li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
有趣的API： history pushState/popstate 无刷新跳转

## 原文链接
[https://segmentfault.com/a/1190000009580652](https://segmentfault.com/a/1190000009580652)

