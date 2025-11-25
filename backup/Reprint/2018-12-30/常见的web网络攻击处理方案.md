---
title: '常见的web网络攻击处理方案' 
date: 2018-12-30 2:30:10
hidden: true
slug: c0blklc2oh
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>来到新公司以后，还蛮大的公司，前段后端同事也大都是3年左右工作经验的，但是在遇到被刷手机验证码接口的时候却给出了一些“奇怪”的对策，比如验证手机格式，IOS，Android那边说验证手机机器码。。。<br>人家都是直接用脚本直接随机生成手机号，机器码什么的好伐。。。<br>感觉可能是和很多同学平时基本遇不到这样的情况有关吧，我以前的项目的话也有几百万的用户，东西做大了，攻击者就会天天来光顾了，遇到的也就多了。。。所以，我就来做做总结。</p>
<h2 id="articleHeader1">分类</h2>
<p>本文将介绍一下三种网络攻击的解决方案：</p>
<ol>
<li>XSS</li>
<li>CSRF</li>
<li>脚本刷接口</li>
</ol>
<h2 id="articleHeader2">XSS</h2>
<p>XSS全称是Cross-site scripting，有点前端安全基础的同学应该都知道。就是通过一些用户可以输入的界面，比如评论，填入一些非法字符，如<code>&gt;&lt;script&gt;alert(document.cookie)&lt;/script&gt;</code>等类似的方式，导致网页做些这个“史壳郎”想要的一些操作。<br>怎么防御呢？这种现象的产生原因无非是，前端模板或者后端模板在渲染的时候没有进行字符转译，导致<code>&lt;&gt;</code>这样的字符直接就渲染到了页面上。<br>所以，我们只需要在渲染前做一次转译，将这些符号转为字符实体就好了。幸运的是，现在的前端库，如vue，react，前端模板ejs，juicer，后端模板smarty，blade等，都已经内部做了转译了，开发者愉快的使用就好了。所以，其实我们完全不用做任何额外的工作。但是，还是理解内部机制比较好。<br>详细的可以看<a href="https://github.com/CodeLittlePrince/blog/issues/2" rel="nofollow noreferrer" target="_blank">我在github写的文章</a>，字数不多，但是言简意赅，因为并不喜欢长篇大论的。</p>
<h2 id="articleHeader3">CSRF</h2>
<p>CSRF全称是Cross-site request forgery。这个的话其实很多公司都不太做这个防御，我问过挺多朋友，他们公司的确并不关心这个。<br>好吧，，，不过其实，这种攻击的确在如今，对用户或者公司的危害非常小，不过还是要做的，因为，对于网络安全，我们是认真的！<br>攻击场景的话，比如：网页有一个对作品点赞的功能，点赞提交地址为<code>http://csrf.com/api.like?id=777</code>，然后另外一个网站放了这样一个元素<code>&lt;img src="http://csrf.com/api.like?id=888"&gt;</code>，这样的话，一旦用户进入这个bbb.com页面，就会请求csrf.com/api.like这个接口，因为用户的登录信息尚未过期，那就等于给id为888这个作品点赞了。<br>防御方式：</p>
<ol>
<li>后端判断referer是否合法（不推荐）</li>
<li>每次请求都要带上token，token是csrf.com页面渲染时一起带过来的，这样的话，如果不在csrf.com页面发起这个点赞请求，token是不存在的，因为就能做到防御了。</li>
</ol>
<p>这里只简单的介绍了一下，<a href="https://github.com/CodeLittlePrince/blog/issues/6" rel="nofollow noreferrer" target="_blank">详细的可以看我在github写的文章&gt;&gt;</a></p>
<h2 id="articleHeader4">脚本刷接口</h2>
<p>这种攻击方式很简单，最傻瓜的就是在chrome打开控制面板，到console里这么做<code>$.get('/getPhoneVerifyCode')</code>。<br>最常见的场景就是，也不知道“史壳郎”目的是什么，总会刷网站的手机验证码接口，导致公司在短信接口上话费更多的费用，估计是短信验证码的公司的人干的。。。<br>防御方式：</p>
<ol><li>目前公认的解决方案，就一种，验证码验证</li></ol>
<h4>可是提供验证码的公司那么多，怎么选呢？</h4>
<p><span class="img-wrap"><img data-src="/img/bVVCr2?w=796&amp;h=406" src="https://static.alili.tech/img/bVVCr2?w=796&amp;h=406" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>还在用这样的验证码吗？<br>那只要想，分分钟就能被刷爆。这样图片文字识别的算法早烂大街了。</p>
<p>介绍几种比较新型的验证码：</p>
<p>1、<strong>智能无感知型</strong>：比如谷歌智能验证<br><span class="img-wrap"><img data-src="/img/bVVCth?w=616&amp;h=164" src="https://static.alili.tech/img/bVVCth?w=616&amp;h=164" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>2、<strong>滑块型</strong>：比如极验的滑块<br><span class="img-wrap"><img data-src="/img/bVVCut?w=624&amp;h=498" src="https://static.alili.tech/img/bVVCut?w=624&amp;h=498" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>3、<strong>图片位置点击型</strong>：比如网易云易盾的图中点选<br><span class="img-wrap"><img data-src="/img/bVVCvW?w=628&amp;h=426" src="https://static.alili.tech/img/bVVCvW?w=628&amp;h=426" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>我们以前公司用的是<a href="http://www.geetest.com/exp.html" rel="nofollow noreferrer" target="_blank">极验验证</a>。用的是它的第二代验证，然后最近发现它居然出了第三代认证，就是“智能无感知型”的认证。</p>
<p>最后，我想说，我真的不是极验公司的码农0 0</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
常见的web网络攻击处理方案

## 原文链接
[https://segmentfault.com/a/1190000011310463](https://segmentfault.com/a/1190000011310463)

