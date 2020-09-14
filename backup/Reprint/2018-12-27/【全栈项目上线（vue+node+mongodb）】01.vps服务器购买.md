---
title: '【全栈项目上线（vue+node+mongodb）】01.vps服务器购买' 
date: 2018-12-27 2:30:12
hidden: true
slug: vniml6h6ow
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">vps服务器购买操作</h1>
<h2 id="articleHeader1">搭建vue + node + mongodb 项目需要购买服务器</h2>
<h2 id="articleHeader2">服务器购买后最好选择Ubuntu系统(接下来的项目上线教程都是按照Ubuntu系统来讲)</h2>
<h3 id="articleHeader3">注意点：</h3>
<blockquote><p>千万别绑定自己的信用卡，绑定后打算解绑需要另一张信用卡来解绑，好像国外都是这么干的</p></blockquote>
<h3 id="articleHeader4">结账方式选择：</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="有支付宝的最好选择支付宝
没有支付宝的话，就选择PayPal（支持大部分银联卡）
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>有支付宝的最好选择支付宝
没有支付宝的话，就选择PayPal（支持大部分银联卡）
</code></pre>
<h2 id="articleHeader5">选购服务器</h2>
<h3 id="articleHeader6">支付方式支持 支付宝结账比较方便，同时也支持PayPal</h3>
<h2 id="articleHeader7">选购搬瓦工（支持 ss 价格实惠）</h2>
<p>板瓦工 推荐1g以上内存（因为node服务器消耗内存比较大）<br><a href="https://www.bwh1.net/" rel="nofollow noreferrer" target="_blank">bwh1</a></p>
<h3 id="articleHeader8">注册账号的时候，需要填写一些信息，最后需要的验证码需要科学上网才能出现验证码图片，所以正确填写完验证码之后，才能注册，才能购买</h3>
<p><span class="img-wrap"><img data-src="/img/bVXyIg?w=958&amp;h=476" src="https://static.alili.tech/img/bVXyIg?w=958&amp;h=476" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader9">选购阿里云</h2>
<h3 id="articleHeader10">注意：千万别选择window系统（如果不是必须window的话）</h3>
<h3 id="articleHeader11">如果你选择了window系统，不能更换问Linux系统，解决办法：提交工单，去退货，然后重新购买</h3>
<blockquote><p>如果你是学生，就去通过学生通道购买 9.9一个月<br>如果不是学生推荐一下链接<br><a href="https://common-buy.aliyun.com/?spm=5176.10003347.843204.1.Ql3ciJ&amp;commodityCode=swas&amp;request=undefined#/buy" rel="nofollow noreferrer" target="_blank">https://common-buy.aliyun.com...</a></p></blockquote>
<p>如果你的域名没有备案，请买香港主机或其他国外主机</p>
<h2 id="articleHeader12">推荐阿里云（双十一搞活动）280一年</h2>
<p><a href="https://promotion.aliyun.com/ntms/act/qwbk.html?open_id=4dc9ecb7-9a7d-4800-a51a-a659a1ebb2ca-511180874&amp;open_cid=187" rel="nofollow noreferrer" target="_blank">https://promotion.aliyun.com/...</a></p>
<h2 id="articleHeader13">选购vultr</h2>
<h3 id="articleHeader14">第一步注册账号</h3>
<h3 id="articleHeader15">登录进去</h3>
<h3 id="articleHeader16">注意点：</h3>
<blockquote><p>千万别绑定自己的信用卡，绑定后打算解绑需要另一张信用卡来解绑，好像国外都是这么干的</p></blockquote>
<h3 id="articleHeader17">支付方式：</h3>
<p>支持 PayPal （所有银联卡都支持）</p>
<p><a href="https://www.vultr.com/" rel="nofollow noreferrer" target="_blank">https://www.vultr.com/</a><br><a href="https://www.vultr.com/pricing/" rel="nofollow noreferrer" target="_blank">https://www.vultr.com/pricing/</a><br><span class="img-wrap"><img data-src="/img/bVXyCS?w=1582&amp;h=2762" src="https://static.alili.tech/img/bVXyCS?w=1582&amp;h=2762" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader18">选择数字海洋 <a href="https://www.digitalocean.com" rel="nofollow noreferrer" target="_blank">digitalocean</a>
</h3>
<blockquote><p>国外口碑不错<br>digitalocean 如果你有教育邮箱，就是edu结尾的邮箱， 可以去领100美金优惠券，这个查的很严，两个账号用一个支付方式，都使用了优惠券就回被查出来<br>优惠券两年后就不能用了</p></blockquote>
<h4>网址<a href="https://cloud.digitalocean.com/login" rel="nofollow noreferrer" target="_blank">https://cloud.digitalocean.co...</a>
</h4>
<h3 id="articleHeader19">等大家买完后，接下来讲项目上线（敬请期待）</h3>
<h2 id="articleHeader20">项目上线方式：</h2>
<h3 id="articleHeader21">普通打包上传方式</h3>
<h3 id="articleHeader22">git webhooks  pm2 自动化方式</h3>
<h3 id="articleHeader23">docker 方式</h3>
<h4>会不断优化此篇文章（请收藏）</h4>
<h2 id="articleHeader24">下一篇文章（选购域名）</h2>
<h2 id="articleHeader25">欢迎加入前端微信群，持续学习</h2>
<p>图片描述</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【全栈项目上线（vue+node+mongodb）】01.vps服务器购买

## 原文链接
[https://segmentfault.com/a/1190000011772497](https://segmentfault.com/a/1190000011772497)

