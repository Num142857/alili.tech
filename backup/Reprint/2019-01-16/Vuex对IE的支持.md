---
title: 'Vuex对IE的支持' 
date: 2019-01-16 2:30:08
hidden: true
slug: x9bws2ugg6
categories: [reprint]
---

{{< raw >}}

                    
<p>最近在使用Vuex弄个小项目，在github上down了一个后台管理平台的demo跑起来后就愉快的二次开发(haowujiecao)，交给被人的时候，对方问了句为什么我这里打开dist下面的html一篇空白？<br>WTF？跑过去一看，对面还是用的IE...我有一句mmp。刚想嘲讽现在谁还用IE的时候，发现对方是高版本IE，那么不对呀。Vue是支持IE的，问题出在了哪里？<br>于是本地也开启了万年吃灰的IE一看报错信息。</p>
<p><span class="img-wrap"><img data-src="/img/bVL74w?w=558&amp;h=83" src="https://static.alili.tech/img/bVL74w?w=558&amp;h=83" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>原来是vuex出了问题，不支持IE呗。<br>发现问题解决问题。<br>想要在IE中使用Vuex，还得需要<strong>babel-polyfill</strong>的支持。<br>找到了官网：<a href="https://babeljs.io/docs/usage/polyfill/" rel="nofollow noreferrer" target="_blank"></a><a href="https://babeljs.io/docs/usage/polyfill/" rel="nofollow noreferrer" target="_blank">https://babeljs.io/docs/usage...</a><br>用起来so easy 三板斧，<code>npm i import 'babel-polyfill'</code></p>
<p>我是配置在了store文件中的，这样一个引用即可。</p>
<p><span class="img-wrap"><img data-src="/img/bVL77O?w=464&amp;h=119" src="https://static.alili.tech/img/bVL77O?w=464&amp;h=119" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>run 一下IE好了。<br>好想对IE说一句，嗯...算了。还得靠你吃饭...</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vuex对IE的支持

## 原文链接
[https://segmentfault.com/a/1190000009048684](https://segmentfault.com/a/1190000009048684)

