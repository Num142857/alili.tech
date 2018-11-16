---
title: 仿美团外卖的全栈项目(vue+node+mongodb)带支付->大三求实习
hidden: true
categories: [reprint]
slug: 58ca5aa3
date: 2018-10-23 00:00:00
---

{{< raw >}}

                    
<h2 id="articleHeader0">关于</h2>
<p>2019届大三学生，前段时间一直想一个人单独开发一个较为完整的项目，在众多应用中，考虑之后选择了美团外卖来模仿，这段时间就利用课余时间进行开发，前端用vue+vuex+vue-router+axios，因为需要用到定位和支付等功能，需要后端配合，而且想要做真正数据交互，所以用express(基于nodejs的框架)做后台，数据库用NOSQL的mongodb。 前端项目包含20多个路由，涉及到vue文件有40个，功能设计登录，定位，浏览商品，加购物车，下订单，支付(支持微信和支付宝的扫码支付和调起app支付)，评价，个人信息更改，是一个较为完整的项目。</p>
<p><strong>注意：此项目为个人开发实践练习，不作为任何商业用途</strong></p>
<h2 id="articleHeader1">重要事情先讲一遍</h2>
<p>求广深实习，现在可以开始上班(要求暑假上班也可以)，每周保证4天以上的上班时间</p>
<h2 id="articleHeader2">功能</h2>
<ul>
<li>登录/注销</li>
<li>IP定位</li>
<li>搜索地址</li>
<li>获取商店(计算当前位置和商店的距离)</li>
<li>加购物车</li>
<li>下订单</li>
<li>支付(支持微信和支付宝的扫码支付和调起app支付)</li>
<li>评价</li>
<li>头像上传(用了七牛云存储)</li>
<li>图片懒加载</li>
</ul>
<h2 id="articleHeader3">技术栈</h2>
<ul>
<li>Webpack-cli搭建项目</li>
<li>Vue全家桶(vue+vuex+vue-router)</li>
<li>CSS预处理器SCSS</li>
<li>axios与后端进行请求数据</li>
<li>使用better-scroll滚动</li>
<li>七牛云存储图片</li>
<li>支付宝和微信支付</li>
<li>Express搭建后端服务</li>
<li>Mongoose对MongoDB进行便捷操作</li>
<li>使用Charles抓取数据</li>
</ul>
<h2 id="articleHeader4">多图预警</h2>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000014267519?w=372&amp;h=664" del-src="https://static.alili.tech/v-5bbf1b3b/global/img/squares.svg" alt="主界面" title="主界面" style="cursor: pointer;"></span></p>
<h3 id="articleHeader5">定位和搜索商家</h3>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000014267520?w=374&amp;h=664" del-src="https://static.alili.tech/v-5bbf1b3b/global/img/squares.svg" alt="" title="" style="cursor: pointer;"></span></p>
<h3 id="articleHeader6">扫码支付</h3>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000014267521" src="https://static.alili.tech/img/remote/1460000014267521" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader7">调起APP支付</h3>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000014267522?w=247&amp;h=463" del-src="https://static.alili.tech/v-5bbf1b3b/global/img/squares.svg" alt="" title="" style="cursor: pointer;"></span></p>
<h3 id="articleHeader8">购物车</h3>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000014267523?w=378&amp;h=664" src="https://static.alili.tech/img/remote/1460000014267523?w=378&amp;h=664" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader9">商品操作</h3>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000014267524?w=374&amp;h=664" src="https://static.alili.tech/img/remote/1460000014267524?w=374&amp;h=664" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader10">评论</h3>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000014267525?w=377&amp;h=668" del-src="https://static.alili.tech/v-5bbf1b3b/global/img/squares.svg" alt="" title="" style="cursor: pointer;"></span></p>
<h3 id="articleHeader11">其它操作</h3>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000014267526" del-src="https://static.alili.tech/v-5bbf1b3b/global/img/squares.svg" alt="" title="" style="cursor: pointer;"></span></p>
<h3 id="articleHeader12">还有一些其它功能就不放图了哈</h3>
<h2 id="articleHeader13">线上地址</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="请用谷歌浏览器然后开启移动端浏览，如果要调用APP支付就需要用手机自带浏览器打开，然后支付时选择调起APP支付" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code style="word-break: break-word; white-space: initial;">请用谷歌浏览器然后开启移动端浏览，如果要调用<span class="hljs-keyword">APP</span>支付就需要用手机自带浏览器打开，然后支付时选择调起<span class="hljs-keyword">APP</span>支付</code></pre>
<p><a href="http://39.108.3.12" rel="nofollow noreferrer" target="_blank">线上地址</a></p>
<h2 id="articleHeader14">仓库地址</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="代码已开源到github上面，有具体的运行操作，如果觉得还可以，请给个Star哈哈！" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mathematica"><code style="word-break: break-word; white-space: initial;">代码已开源到github上面，有具体的运行操作，如果觉得还可以，请给个<span class="hljs-keyword">Star</span>哈哈！</code></pre>
<p><a href="https://github.com/zwStar/vue-meituan" rel="nofollow noreferrer" target="_blank">github地址</a></p>
<h3 id="articleHeader15">未完待续</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="还有商家管理PC端还没写完，等写完再开源出来

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code>还有商家管理<span class="hljs-built_in">PC</span>端还没写完，等写完再开源出来

</code></pre>
<h2 id="articleHeader16">写在最后</h2>
<p>因为还是学生，平时最多也是和同学一起开发，并没有参与过真正的企业团队开发，所以应该有很多地方做的不是很好，欢迎各位大佬们给我提一些意见，最后再问一句哈，求广深实习，现在可以开始上班(要求暑假上班也可以)，每周保证4天以上的上班时间。如果没有，我等下再来问哈。。。</p>

                
{{< /raw >}}

# 版权声明
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文链接
[https://segmentfault.com/a/1190000014267516](https://segmentfault.com/a/1190000014267516)

## 原文标题
仿美团外卖的全栈项目(vue+node+mongodb)带支付->大三求实习
