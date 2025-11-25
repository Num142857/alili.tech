---
title: 'vue做微信公众号分享,支付' 
date: 2018-12-20 2:30:10
hidden: true
slug: nm24kwmy
categories: [reprint]
---

{{< raw >}}

                    
<p>在前段时间做了一个微信公众号,因为我又是新手,没什么经验,拿起vue就开始,导致一坑再坑,简直阔怕!!!<br>对于此次项目,我主要用到的是vue的整框架和必要的插件,但是我没用vuex,用vuex的话会方便很多很多</p>
<p><strong>1.首先从认证获取openid说起;</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="因为我们后天也是第一次做微信公众号,导致大家都走了很多弯路,刚开始认证是由前端来转认证跳转,后台给我接口,传一个url给我我做跳转再返回到我的目标页面,把参数带在地址后面,然后我去截取地址,获取参数,这样不是不可以,但是征得增加了很多不必要的麻烦." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs erlang"><code style="word-break: break-word; white-space: initial;">因为我们后天也是第一次做微信公众号,导致大家都走了很多弯路,刚开始认证是由前端来转认证跳转,后台给我接口,传一个url给我我做跳转再返回到我的目标页面,把参数带在地址后面,然后我去截取地址,获取参数,这样不是不可以,但是征得增加了很多不必要的麻烦.</code></pre>
<p>后来我们改正了,有后台去做认证跳转,进去我们的页面就直接认证,自己做跳转,参数还是带在url地址后面,我个人认为要是后端可以,把参数放在cookie是比较好的;</p>
<p><strong>2.微信支付;</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="之前一直不知道,我觉得微信支付必须要认证成功之后可以,但是后来发现并不是这样的,之前做的时候,一直遇到坑,因为我们授权是写在登录页面的,用户第一次进入的时候需要到登录页面,就要授权,但是用户第二次进入的话不需要登录,就导致没有授权,微信支付就不成功,后来我们就改成了,只要点击微信公众号的导航栏的目标页面,第一次进去就开始认证,这样微信支付就成功了,微信支付还要注意,要在微信商户平台配置需要支付的地址,不然报错" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code style="word-break: break-word; white-space: initial;">之前一直不知道,我觉得微信支付必须要认证成功之后可以,但是后来发现并不是这样的,之前做的时候,一直遇到坑,因为我们授权是写在登录页面的,用户第一次进入的时候需要到登录页面,就要授权,但是用户第二次进入的话不需要登录,就导致没有授权,微信支付就不成功,后来我们就改成了,只要点击微信公众号的导航栏的目标页面,第一次进去就开始认证,这样微信支付就成功了,微信支付还要注意,要在微信商户平台配置需要支付的地址,不然报错</code></pre>
<p><span class="img-wrap"><img data-src="/img/bV0TI0?w=439&amp;h=235" src="https://static.alili.tech/img/bV0TI0?w=439&amp;h=235" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>这样错我遇到了两次,一次就是没有授权,第一次能支付,第二次就出现这样的错,第二次就是没有配置地址;反正在微信支付这里我弄了很久,但是弄清楚之后你就会发现其实不难</p>
<p><span class="img-wrap"><img data-src="/img/bV0TLz?w=1403&amp;h=685" src="https://static.alili.tech/img/bV0TLz?w=1403&amp;h=685" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>这是支付的配置,可以吧debug模式打开,看看返回的到底是什么;<br>还要注意,在回调函数重的this指向是改变了的</p>
<p><strong>3.微信分享;</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="微信分享也是,现在我想着我之前思路不清晰,做的哪些东西,真的,脑壳皮都还在痛,微信分享首先要认证;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>微信分享也是,现在我想着我之前思路不清晰,做的哪些东西,真的,脑壳皮都还在痛,微信分享首先要认证<span class="hljs-comment">;</span>
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bV0TM7?w=907&amp;h=306" src="https://static.alili.tech/img/bV0TM7?w=907&amp;h=306" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>配置自己需要的参数,微信支付和认证里面的data都是后台返回的,注意大小写,微信认证可以写router.beforeEach<br>里面更具自己的需求,要是路由切换了,就认证;这是最终解决的方法,但是之前我的config认证是写在每个页面的,我需要分享的页面我就会去配置,导致自己真的一坑在坑,首先,是先后问题,就是每次进入页面,我config还没有认证成功,我的就已经调起了分享的函数了,这导致我每次分享都不成功,要是写在router.beforeEach里面就不会存在这个问题,还有就是要注意shareMessage里面的内容,要是是动态配置的就不会有多大的问题.</p>
<p>说到这个认证,就会涉及到url地址:<br>首先是在hash下面,获取的url地址，前端需要用js获取当前页面除去'#'hash部分的链接:可用location.href.split('#')[0]获取;<br>要是用的history模式的话,就获当前也买你的地址,但是你会发现问题又来了,因为history模式的话,在Android手机上没什么问题,但是ios上面问题就出来了,就是你怎么弄只有当前进去的页面可以认证成功,之后每个页面,你可以复制当前也买你的地址,不管是那个页面都是你第一次进去的那个也买你的地址,这样就导致地址认证不成功,生成的签名不一样,config也就不成功,我是这样解决的,</p>
<p><span class="img-wrap"><img data-src="/img/bV0Ubm?w=753&amp;h=84" src="https://static.alili.tech/img/bV0Ubm?w=753&amp;h=84" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>还是要用到router.beforeEach,我会先判断是不是Android,要是是的话就直接next();要是不是的话就判断是不是第一次进来,如果是第一次进入页面,就把地址保存起来,我上面说我没有用vuex我直接保存在sessionStorage里面的,这样我要是是ios的话我每次config的地址就是我sessionStorage的地址,这样我在history模式下就把config认证好了.当然也还有其他方法,比如可以用a标签跳转,但这样也就失去意义了,也没有必要.</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue做微信公众号分享,支付

## 原文链接
[https://segmentfault.com/a/1190000012570056](https://segmentfault.com/a/1190000012570056)

