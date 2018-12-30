---
title: '我是这样搞懂一个神奇的BUG' 
date: 2018-12-31 2:30:30
hidden: true
slug: jw7c98iafc9
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>摘要:</strong> 通过分析用户的行为，才想得到为什么会出现这种情况！</p>
<p>前两天在BearyChat收到这样的一个报警消息:</p>
<p><span class="img-wrap"><img data-src="/img/bVU0W3?w=778&amp;h=211" src="https://static.alili.tech/img/bVU0W3?w=778&amp;h=211" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><strong>409</strong> ？<strong>Conflict</strong> ？ 平时很少遇到这样的错误，貌似很严重的样子，吓得我赶紧查看到底发生了什么。</p>
<p>仔细查看错误详情发现是因为使用同一个邮箱账号多次注册导致后面的请求数据库直接报错。<br><span class="img-wrap"><img data-src="/img/bVU0Xk?w=1133&amp;h=368" src="https://static.alili.tech/img/bVU0Xk?w=1133&amp;h=368" alt="" title="" style="cursor: pointer; display: inline;"></span><br>但是，不应该啊！我们是事先有做检查的。如果该邮箱已经被注册，会提醒并且不让注册的。难道对方是个黑客，直接调用API发请求？如果是这样那就更加危险了，我们已经被黑客盯上了！</p>
<p>可是这样做对黑客也没什么好处啊，并且IP显示为国内地址，如果真的是黑客好歹用国外的地址吧。想了想，还是仔细分析到底出了什么问题吧。</p>
<p>再往下一看，发现自己完全是多想了。如果是黑客的话，下面的用户行为就把他给完全暴露了！<br><span class="img-wrap"><img data-src="/img/bVU0Xz?w=929&amp;h=811" src="https://static.alili.tech/img/bVU0Xz?w=929&amp;h=811" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>这些用户行为记录默认按照倒序排列，我们可以从下往上一条条看用户的使用轨迹。通过用户行为可以得知出错前的整个操作流程：</p>
<ul>
<li>打开我们网站的首页</li>
<li>点击“免费试用“进入注册页面</li>
<li>输入邮箱</li>
<li>输入密码</li>
<li>再次出入密码</li>
<li>点击创建团队</li>
<li>点击创建团队</li>
<li>团队创建成功</li>
<li>报错</li>
</ul>
<p>那么问题来了：有没有什么异常的行为？<br>答：有！他点击了创建团队两次。</p>
<p>凭着我敏锐的嗅觉意识到可能是由于用户快速点击"创建团队"按钮两次导致。通过时间记录发现第一次点击是在1.86m，第二次在1.87m。也就是说：用户在很短的时间内快速点击了两次。</p>
<p>刚刚的用户行为记录过滤了网络请求，接下里我们结合网络请求一起分析：</p>
<p><span class="img-wrap"><img data-src="/img/bVU0XF?w=971&amp;h=716" src="https://static.alili.tech/img/bVU0XF?w=971&amp;h=716" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>可以发现有两个/members/email的GET请求，并且都成功返回404，这里代码的意思是指该邮箱尚未被注册，可以被使用。一个/members/create请求成功返回200，表示账户创建成功。最后报错的/members/create请求失败返回409。</p>
<p>到这里基本确定出错原因就是由于用户快速点击创建团队导致。<br>有没有这种可能呢，尝试复现一下看看呗！于是，我打开了注册页面，输入邮箱和密码，然后以超快的手速点击创建团队N次。哈哈哈哈，不出所料，被我成功复现了！</p>
<p>只要能够成功复现，这个BUG基本上就算被解决了，接下来就是去分析如何优化代码防止出现这种情况了。有两个思路：1. 用户点击之后，设置被点击的按钮无效直到点击请求完全被处理；2. 将验证邮箱是否存在的和创建团队两个异步事件想办法合并为一个原子操作。综合考虑，决定使用第一种方案。因为实现简单，对现有代码改动不大。</p>
<p>总的来说：当在没有堆栈信息或者报错信息难以理解的时候，Fundebug记录的用户行为真的很有用。五星推荐前端开发接入到项目中！</p>
<p><span class="img-wrap"><img data-src="/img/bVUopp?w=271&amp;h=371" src="https://static.alili.tech/img/bVUopp?w=271&amp;h=371" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>版权声明:<br>转载时请注明作者Fundebug以及本文地址：<br><a href="https://blog.fundebug.com/2017/09/06/fundebug-user-behavior-help-debug/" rel="nofollow noreferrer" target="_blank">https://blog.fundebug.com/201...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
我是这样搞懂一个神奇的BUG

## 原文链接
[https://segmentfault.com/a/1190000011166158](https://segmentfault.com/a/1190000011166158)

