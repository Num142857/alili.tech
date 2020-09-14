---
title: '微信小程序开发--『狗蛋TV』' 
date: 2018-11-30 2:30:12
hidden: true
slug: sgjyfk4idqa
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">狗蛋TV</h1>
<p><span class="img-wrap"><img data-src="/img/bVbazwL" src="https://static.alili.tech/img/bVbazwL" alt="163622f528556b3d?w=290&amp;h=290&amp;f=png&amp;s=10175" title="163622f528556b3d?w=290&amp;h=290&amp;f=png&amp;s=10175" style="cursor: pointer; display: inline;"></span></p>
<p>狗蛋TV是基于微信小程序开发的一款App。gordanLee每天都会推荐一首歌、一篇文章、一段短视频，每天用十分钟的细碎时光，点燃内心的光明。目前分为音乐，短视频，影评三个模块。</p>
<p><span class="img-wrap"><img data-src="https://user-gold-cdn.xitu.io/2018/5/15/163621cf53070049?imageView2/1/w/1304/h/734/q/85/format/webp/interlace/1" src="https://static.alili.techhttps://user-gold-cdn.xitu.io/2018/5/15/163621cf53070049?imageView2/1/w/1304/h/734/q/85/format/webp/interlace/1" alt="banner.png" title="banner.png" style="cursor: pointer; display: inline;"></span></p>
<ul>
<li>
<a href="https://github.com/lishuaixingNewBee/gordanTv" rel="nofollow noreferrer" target="_blank">线上开源地址</a> <a href="https://github.com/lishuaixingNewBee/gordanTv" rel="nofollow noreferrer" target="_blank">https://github.com/lishuaixin...</a> 点个赞吧！</li>
<li><a href="https://developers.weixin.qq.com/miniprogram/dev/" rel="nofollow noreferrer" target="_blank">小程序开发文档</a></li>
</ul>
<p><span class="img-wrap"><img data-src="https://user-gold-cdn.xitu.io/2018/5/15/16363d00625d335a?w=267&amp;h=474&amp;f=gif&amp;s=556913" src="https://static.alili.techhttps://user-gold-cdn.xitu.io/2018/5/15/16363d00625d335a?w=267&amp;h=474&amp;f=gif&amp;s=556913" alt="引导页" title="引导页" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="https://user-gold-cdn.xitu.io/2018/5/15/1635f631d527619f?w=267&amp;h=474&amp;f=gif&amp;s=2425224" src="https://static.alili.techhttps://user-gold-cdn.xitu.io/2018/5/15/1635f631d527619f?w=267&amp;h=474&amp;f=gif&amp;s=2425224" alt="音乐页" title="音乐页" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="https://user-gold-cdn.xitu.io/2018/5/15/1635f631d52e422c?w=267&amp;h=474&amp;f=gif&amp;s=2739050" src="https://static.alili.techhttps://user-gold-cdn.xitu.io/2018/5/15/1635f631d52e422c?w=267&amp;h=474&amp;f=gif&amp;s=2739050" alt="短视频页" title="短视频页" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="https://user-gold-cdn.xitu.io/2018/5/15/1635f631d5460ad5?w=267&amp;h=474&amp;f=gif&amp;s=2924101" src="https://static.alili.techhttps://user-gold-cdn.xitu.io/2018/5/15/1635f631d5460ad5?w=267&amp;h=474&amp;f=gif&amp;s=2924101" alt="影评页" title="影评页" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="https://user-gold-cdn.xitu.io/2018/5/15/1635f631d55a00f9?w=267&amp;h=474&amp;f=gif&amp;s=1368594" src="https://static.alili.techhttps://user-gold-cdn.xitu.io/2018/5/15/1635f631d55a00f9?w=267&amp;h=474&amp;f=gif&amp;s=1368594" alt="搜索页" title="搜索页" style="cursor: pointer;"></span></p>
<p><code>以下所有 API 均由产品公司自身提供，本人皆从网络获取。获取与共享之行为或有侵犯产品权益的嫌疑。若被告知需停止共享与使用，本人会及时删除此页面与整个项目。请您暸解相关情况，并遵守产品协议。</code></p>
<p>为了方便大家学习和测试，我们提供了https的接口供大家使用，且用且珍惜。请在微信开发设置中加入request合法域名,或者在开发设置中勾选——不校验合法域名、web-view（业务域名）、TLS 版本以及 HTTPS 证书。</p>
<h3 id="articleHeader1">感谢与支持</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    -   狗蛋TVapi: https://api.gordantv.top
    -   豆瓣api: https://api.douban.com
    -   QQ音乐api: https://y.qq.com" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>    -   狗蛋<span class="hljs-string">TVapi:</span> <span class="hljs-string">https:</span><span class="hljs-comment">//api.gordantv.top</span>
    -   豆瓣<span class="hljs-string">api:</span> <span class="hljs-string">https:</span><span class="hljs-comment">//api.douban.com</span>
    -   QQ音乐<span class="hljs-string">api:</span> <span class="hljs-string">https:</span><span class="hljs-comment">//y.qq.com</span></code></pre>
<h3 id="articleHeader2">项目介绍</h3>
<p>狗蛋TV是基于微信小程序+ES6进行开发，能同时运行在Android、iOS环境下。涵盖了音乐、短视频、影评三个版块。</p>
<ul>
<li>
<p>开屏引导图</p>
<ol>
<li>调用微信wx.onAccelerometerChange重力感应设备API,实现水波荡漾。</li>
<li>调用wx.getUserInfo获取用户头像。</li>
</ol>
</li>
<li>
<p>工具类</p>
<ol><li>用Promise封装wx.request(),简化代码结构:</li></ol>
</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const $get = (url, data) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data,
      header: { 'Content-Type': 'json' },
      success: resolve,
      fail: reject
    })
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> $<span class="hljs-keyword">get</span> = <span class="hljs-function">(<span class="hljs-params">url, data</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    wx.request({
      url,
      data,
      header: { <span class="hljs-string">'Content-Type'</span>: <span class="hljs-string">'json'</span> },
      success: resolve,
      fail: reject
    })
  })
}</code></pre>
<ol><li>电影评分实现</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const convertToStarsArray = (average) => {
  const LENGTH = 5;
  const CLS_ON = 'on'; // 全星
  const CLS_HALF = 'half'; // 半星
  const CLS_OFF = 'off'; // 无星
  let result = [];
  let score = Math.round(average) / 2;
  let hasDecimal = score % 1 !== 0
  let integer = Math.floor(score)
  for (let i = 0; i < integer; i++) {
    result.push(CLS_ON)
  }
  if (hasDecimal) {
    result.push(CLS_HALF)
  }
  while (result.length < LENGTH) {
    result.push(CLS_OFF)
  }
  return result;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> convertToStarsArray = <span class="hljs-function">(<span class="hljs-params">average</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> LENGTH = <span class="hljs-number">5</span>;
  <span class="hljs-keyword">const</span> CLS_ON = <span class="hljs-string">'on'</span>; <span class="hljs-comment">// 全星</span>
  <span class="hljs-keyword">const</span> CLS_HALF = <span class="hljs-string">'half'</span>; <span class="hljs-comment">// 半星</span>
  <span class="hljs-keyword">const</span> CLS_OFF = <span class="hljs-string">'off'</span>; <span class="hljs-comment">// 无星</span>
  <span class="hljs-keyword">let</span> result = [];
  <span class="hljs-keyword">let</span> score = <span class="hljs-built_in">Math</span>.round(average) / <span class="hljs-number">2</span>;
  <span class="hljs-keyword">let</span> hasDecimal = score % <span class="hljs-number">1</span> !== <span class="hljs-number">0</span>
  <span class="hljs-keyword">let</span> integer = <span class="hljs-built_in">Math</span>.floor(score)
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; integer; i++) {
    result.push(CLS_ON)
  }
  <span class="hljs-keyword">if</span> (hasDecimal) {
    result.push(CLS_HALF)
  }
  <span class="hljs-keyword">while</span> (result.length &lt; LENGTH) {
    result.push(CLS_OFF)
  }
  <span class="hljs-keyword">return</span> result;
}</code></pre>
<ul><li>小程序内部组件实现上拉刷新，下拉加载</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    方法一：scroll-view 组件
    方法二：onPullDownRefresh和onReachBottom方法实现小程序下拉加载和上拉刷新" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code>    方法一：<span class="hljs-keyword">scroll</span>-<span class="hljs-built_in">view</span> 组件
    方法二：onPullDownRefresh和onReachBottom方法实现小程序下拉加载和上拉刷新</code></pre>
<ul><li>
<p>阅读模块</p>
<ol><li><a href="https://github.com/icindy/wxParse" rel="nofollow noreferrer" target="_blank">微信小程序使用wxParse解析html</a></li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="项目中遇到在微信小程序里需要显示音乐文章的内容，文章内容是通过接口读取的服
务器中的富文本内容，是html格式的，小程序默认是不支持html格式的内容显示的，
那我们需要显示html内容的时候，就可以通过wxParse来实现。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>项目中遇到在微信小程序里需要显示音乐文章的内容，文章内容是通过接口读取的服
务器中的富文本内容，是html格式的，小程序默认是不支持html格式的内容显示的，
那我们需要显示html内容的时候，就可以通过wxParse来实现。</code></pre>
</li></ul>
<h3 id="articleHeader3">项目安装</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    git clone git@github.com:lishuaixingNewBee/gordanTv.git" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code style="word-break: break-word; white-space: initial;">    git <span class="hljs-keyword">clone</span> <span class="hljs-title">git</span>@github.com:lishuaixingNewBee/gordanTv.git</code></pre>
<h3 id="articleHeader4">目录结构</h3>
<hr>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="|--- utils &amp; Public Function              通用函数
|--- components &amp; components Public View  components和template模板
|--- images &amp; Img Resources               图片资源
|--- pages &amp; View Dir                     页面" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coq"><code class="shell">|<span class="hljs-type">--- utils</span> &amp; Public <span class="hljs-keyword">Function</span>              通用函数
|<span class="hljs-type">--- components</span> &amp; components Public View  components和template模板
|<span class="hljs-type">--- images</span> &amp; Img Resources               图片资源
|<span class="hljs-type">--- pages</span> &amp; View Dir                     页面</code></pre>
<h3 id="articleHeader5">○ 更新记录</h3>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
微信小程序开发--『狗蛋TV』

## 原文链接
[https://segmentfault.com/a/1190000014873916](https://segmentfault.com/a/1190000014873916)

