---
title: 'vue中使用微信公众号js-sdk踩坑记录（2）' 
date: 2018-12-23 2:30:07
hidden: true
slug: 6hdz953omri
categories: [reprint]
---

{{< raw >}}

                    
<p>最近又在vue中捣鼓了下微信公众号api的接入，不得不说这里边水是真的深啊，上次分享了微信授权登录和js-sdk签名的部分，其中很多朋友私信我表示了疑惑，今天我就再次尝试理顺一下这里边的坑吧：</p>
<blockquote>微信JS-SDK是微信公众平台面向网页开发者提供的基于微信内的网页开发工具包。<br>通过使用微信JS-SDK，网页开发者可借助微信高效地使用拍照、选图、语音、位置等手机系统的能力，同时可以直接使用微信分享、扫一扫、卡券、支付等微信特有的能力，为微信用户提供更优质的网页体验。</blockquote>
<h2 id="articleHeader0">分享页面到朋友圈</h2>
<p>上文是从<a href="https://mp.weixin.qq.com/wiki?t=resource/res_main&amp;id=mp1421141115" rel="nofollow noreferrer" target="_blank">官方文档</a>中摘出来的，由此可见，我们如果要实现在公众号的内嵌h5中实现微信分享，支付等功能，就得引入js-sdk。<br>使用js-sdk有一个关键的环节，那就是通过config接口注入权限验证配置，而配置中有个signature参数是需要借助服务端获取的，这里就不过多探讨了，大家通过<a href="https://mp.weixin.qq.com/wiki?t=resource/res_main&amp;id=mp1421141115" rel="nofollow noreferrer" target="_blank">官方文档</a>可以深入了解。</p>
<h3 id="articleHeader1">Hash or History?</h3>
<p>上篇文章，我推荐大家在vue中配置vue-router使用hash模式，那么hash模式和history模式到底有什么差别呢？我举个栗子，假设我们都通过<code>http://domain.com</code>进入，然后跳转到路由为<code>/jssdk</code>的页面需要用到jssdk，那么实际js-sdk进行签名校验时所获取的当前页面url在ios和andrioid是不同的，这里我通过表格展示出来：<br><span class="img-wrap"><img data-src="/img/remote/1460000012339153?w=1744&amp;h=712" src="https://static.alili.tech/img/remote/1460000012339153?w=1744&amp;h=712" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>真相都在表格里，我表达能力不好恕我偷个懒23333333。</p>
<p>如果阁下没有接入分享指定页面的需求的话，hash模式很方便，但是无奈笔者需要接微信分享，如果使用hash模式，分享出去的地址，微信会自动处理掉#后边的部分，那么我就没法分享指定页面到朋友圈或者给朋友了。<br>怎么办呢，只能硬着脑子解决history问题咯，其实也好解决，就是<strong>iOS需要使用第一次进入页面的URL获取签名，安卓每次路由切换都重新配置签名</strong>。我这里罗列两个方案：</p>
<p>1.入口文件中记录页面URL，在页面组件创建完成后，ios获取记录的url进行签名，android获取当前路由（<code>window.location.href.split('#')[0]</code>），请移步我的<a href="https://segmentfault.com/a/1190000010753247?_ea=2944899">上一篇博客</a></p>
<p>2.入口文件中直接进行签名和注入配置，仅针对android在每次切换路由时再重新签名和配置。该方案适合所有页面都需要用到js-sdk的情况</p>
<h3 id="articleHeader2">问题记录</h3>
<p>现列出我在捣鼓过程中遇到的一个个bug：</p>
<p>1.安卓设备能分享ios设备不能分享；<br>出现该问题的原因就是因为采用了history模式，且没有考虑到ios校验签名获取的url是第一次访问的url而使用了切换后的url。</p>
<p>2.ios设备进入页面时不能分享，手动刷新页面后才能分享；<br>多次测试后我发现，测试分享的时候，如果是访问的链接没带<a href="http://%E7%9A%84%E8%AF%9D" rel="nofollow noreferrer" target="_blank">http://的话</a>，除了首页其他页面都是失效的，测试时落地页ur必须要加<a>http://</a></p>
<p>3.点击链接能正常分享，点击别人分享的图文消息之后不能分享；<br>猜想1：点击图文消息时候，微信进行签名校验的url去掉了自己添加的参数，所以我们在进行签名时也要去掉微信添加的参数? 所以我把微信参数即<br>`?from=singlemessage&amp;isappinstalled=0'这个部分去掉，结果依旧是分享失败，而我自己随意加一个参数，分享则正常，我随意加两个参数的时候，分享却又不正常了。</p>
<p>猜想2: 微信分享进行签名校验的url仅能允许一个参数？所以我这样写：<br><code>url = location.href.split('&amp;')[0]</code>,验证后发现是错误的，再仔细一想我居然有这么可怕的想法，连官方文档都不相信了。</p>
<p>猜想3：url难道需要进行编码？即<br><code>url = encodeURIComponent(window.location.href.split('#')[0])</code>经我多次debug，终于找到问题，就是需要对签名的url进行编码，word哥，不容易啊</p>
<p><strong>仅需要对签名的url进行编码，分享配置中的url不需要编码</strong><br><strong>仅需要对签名的url进行编码，分享配置中的url不需要编码</strong><br><strong>仅需要对签名的url进行编码，分享配置中的url不需要编码</strong></p>
<p>这里又是一个坑，务必小心。</p>
<p>经常N次的debug和尝试之后我码了几十行代码，解决了以上所有问题，回首一看我真的是年轻啊，也就那么简单的逻辑，也许换个人一步就到位了，我却和各种各样的bug战斗了n多遍（改动一点代码就要上生产环境debug的心酸有谁能懂），唉。。。</p>
<h3 id="articleHeader3">Coding</h3>
<p>分享一下我怎么按照第二种方案进行微信分享配置的<br>由于我项目中需求是基本所有页面都需要能分享，所以在每个page组件中去获取签名是不实际的，所以我就想借助vue-router的after钩子去完成分享配置的操作，对于android则还需要重新进行签名。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// main.js
...
import wx from 'weixin-js-sdk'
import request from 'axios'
...
router.afterEach((to, from) => {
  let _url = window.location.origin + to.fullPath
  // 非ios设备，切换路由时候进行重新签名
  if (window.__wxjs_is_wkwebview !== true) {
    request.get('/api/jssdk?url=' + encodeURIComponent(_url)).then(function (_lists) {
      // 注入配置
      wx.config({
      ...
      })
    })
  }
  // 微信分享配置
  wx.ready(function () {
    wx.onMenuShareTimeline({
     ...
    })
    wx.onMenuShareAppMessage({
      ...
    })
  })
})

...
// ios 设备进入页面则进行js-sdk签名
if (window.__wxjs_is_wkwebview === true) {
  let _url = window.location.href.split('#')[0]
  request.get('/api/jssdk?url=' + encodeURIComponent(_url)).then(function (res) {
    let _lists = res
    wx.config({
      debug: false,
      appId: _lists.appId,
      timestamp: _lists.timestamp,
      nonceStr: _lists.nonceStr,
      signature: _lists.signature,
      jsApiList: ['chooseImage', 'uploadImage', 'previewImage', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareTimeline', 'chooseWXPay']
    })
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// main.js</span>
...
import wx <span class="hljs-keyword">from</span> <span class="hljs-string">'weixin-js-sdk'</span>
<span class="hljs-keyword">import</span> request <span class="hljs-keyword">from</span> <span class="hljs-string">'axios'</span>
...
router.afterEach(<span class="hljs-function">(<span class="hljs-params">to, <span class="hljs-keyword">from</span></span>) =&gt;</span> {
  <span class="hljs-keyword">let</span> _url = <span class="hljs-built_in">window</span>.location.origin + to.fullPath
  <span class="hljs-comment">// 非ios设备，切换路由时候进行重新签名</span>
  <span class="hljs-keyword">if</span> (<span class="hljs-built_in">window</span>.__wxjs_is_wkwebview !== <span class="hljs-literal">true</span>) {
    request.get(<span class="hljs-string">'/api/jssdk?url='</span> + <span class="hljs-built_in">encodeURIComponent</span>(_url)).then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">_lists</span>) </span>{
      <span class="hljs-comment">// 注入配置</span>
      wx.config({
      ...
      })
    })
  }
  <span class="hljs-comment">// 微信分享配置</span>
  wx.ready(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    wx.onMenuShareTimeline({
     ...
    })
    wx.onMenuShareAppMessage({
      ...
    })
  })
})

...
<span class="hljs-comment">// ios 设备进入页面则进行js-sdk签名</span>
<span class="hljs-keyword">if</span> (<span class="hljs-built_in">window</span>.__wxjs_is_wkwebview === <span class="hljs-literal">true</span>) {
  <span class="hljs-keyword">let</span> _url = <span class="hljs-built_in">window</span>.location.href.split(<span class="hljs-string">'#'</span>)[<span class="hljs-number">0</span>]
  request.get(<span class="hljs-string">'/api/jssdk?url='</span> + <span class="hljs-built_in">encodeURIComponent</span>(_url)).then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">res</span>) </span>{
    <span class="hljs-keyword">let</span> _lists = res
    wx.config({
      <span class="hljs-attr">debug</span>: <span class="hljs-literal">false</span>,
      <span class="hljs-attr">appId</span>: _lists.appId,
      <span class="hljs-attr">timestamp</span>: _lists.timestamp,
      <span class="hljs-attr">nonceStr</span>: _lists.nonceStr,
      <span class="hljs-attr">signature</span>: _lists.signature,
      <span class="hljs-attr">jsApiList</span>: [<span class="hljs-string">'chooseImage'</span>, <span class="hljs-string">'uploadImage'</span>, <span class="hljs-string">'previewImage'</span>, <span class="hljs-string">'onMenuShareTimeline'</span>, <span class="hljs-string">'onMenuShareAppMessage'</span>, <span class="hljs-string">'onMenuShareTimeline'</span>, <span class="hljs-string">'chooseWXPay'</span>]
    })
  })
}</code></pre>
<p>总结： 总之简要概括就是要想分享成功，必须签名是成功的，要想签名成功，必须保证调用签名配置的时候微信校验签名获取的url（ios永远是第一次进入页面的url）和我们请求服务端获取签名时提交的url一致。</p>
<h2 id="articleHeader4">调用微信支付</h2>
<h3 id="articleHeader5">两个方案何去何从</h3>
<p>h5使用微信支付，细心的人会发现，微信是有两个方案的，我大致了解了一个，一个是js-sdk中开放的能力，一个是微信支付开放平台提供的接口</p>
<p><a href="https://mp.weixin.qq.com/wiki?t=resource/res_main&amp;id=mp1421141115" rel="nofollow noreferrer" target="_blank">js-sdk版本:</a><br><span class="img-wrap"><img data-src="/img/remote/1460000012339154?w=1838&amp;h=1168" src="https://static.alili.tech/img/remote/1460000012339154?w=1838&amp;h=1168" alt="" title="" style="cursor: pointer; display: inline;"></span><br><a href="https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=7_7&amp;index=6" rel="nofollow noreferrer" target="_blank">微信支付版本：</a><br><span class="img-wrap"><img data-src="/img/remote/1460000012339155?w=1478&amp;h=1124" src="https://static.alili.tech/img/remote/1460000012339155?w=1478&amp;h=1124" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>如果你只需要在公众号中调用支付，两个方法都可以，笔者由于已经使用js-sdk接入了其他功能，所以这里就选择了chooseWXPay方式。</p>
<h3 id="articleHeader6">接入步骤</h3>
<p>在其他功能都接入成功的前提下，接支付就很快很方便了，笔者把主要步骤列下：</p>
<ol>
<li>微信公众平台中配置好js安全接口域名（例如www.imwty.com），这个是调用js-sdk的前提，公众号支付也是基于js-sdk；</li>
<li>微信支付平台中设置支付目录，参见<a href="https://mp.weixin.qq.com/wiki?t=resource/res_main&amp;id=mp1421141115" rel="nofollow noreferrer" target="_blank">微信支付开发文档</a>，这里要说明的是，你需要进行支付的页面路由是什么，就要配置什么，而且需要在后边加上/（例如www.imwty.com/pay/）</li>
<li>调用js-sdk签名配置（wechat.config），上文已有提及。</li>
<li>在点击支付按钮的逻辑中，调用wechat.chooseWXPay()方法，该方法也涉及到支付签名，需要从服务端去获取签名信息</li>
</ol>
<p>注意的点：访问支付页面务必不要遗漏<code>/</code>，微信那边会严格比较调用第4步骤时你所在的页面路由和支付平台中设置的路由是否一致。</p>
<h3 id="articleHeader7">Coding</h3>
<p>这里主要展示第4步骤中笔者的写法，仅供参考</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...
methods () {
 handlerPay () {**粗体文本**
    let self = this
    // 进行支付签名
    apiUtil.get('/api/jssdk/pay', {amount: this.amount}).then(function (wxmsg) {
      self.$wechat.chooseWXPay({
     // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
          appId: wxmsg.appId,
          timestamp: wxmsg.timeStamp,
          nonceStr: wxmsg.nonceStr, // 支付签名随机串，不长于 32 位
          package: wxmsg.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
          signType: wxmsg.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
          paySign: wxmsg.paySign, // 支付签名
          success: function (res) {
            // 支付成功的回调函数
          },
          cancel: function (res) {
            // 支付取消的回调函数
          },
          error: function (res) {
            // 支付失败的回调函数
          }
    }).catch(function () {
      ...
    })
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code>...
methods () {
 handlerPay () {**粗体文本**
    let <span class="hljs-keyword">self</span> = this
    <span class="hljs-comment">// 进行支付签名</span>
    apiUtil.get(<span class="hljs-string">'/api/jssdk/pay'</span>, {amount: this.amount}).then(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(wxmsg)</span> </span>{
      <span class="hljs-keyword">self</span>.$wechat.chooseWXPay({
     <span class="hljs-comment">// 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符</span>
          appId: wxmsg.appId,
          timestamp: wxmsg.timeStamp,
          nonceStr: wxmsg.nonceStr, <span class="hljs-comment">// 支付签名随机串，不长于 32 位</span>
          package: wxmsg.package, <span class="hljs-comment">// 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）</span>
          signType: wxmsg.signType, <span class="hljs-comment">// 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'</span>
          paySign: wxmsg.paySign, <span class="hljs-comment">// 支付签名</span>
          success: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(res)</span> </span>{
            <span class="hljs-comment">// 支付成功的回调函数</span>
          },
          cancel: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(res)</span> </span>{
            <span class="hljs-comment">// 支付取消的回调函数</span>
          },
          error: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(res)</span> </span>{
            <span class="hljs-comment">// 支付失败的回调函数</span>
          }
    }).<span class="hljs-keyword">catch</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
      ...
    })
  }
}</code></pre>
<h3 id="articleHeader8">结语</h3>
<p>由于本人文笔一般，思维的表达估计不到位，见解也是浅尝辄止，所以如果看官您有疑惑的地方或者有歧义欢迎来和本人交流。为了方便大家互相沟通，本人也创建了一个vue公众号开发的qq群，欢迎加入和大家一起分享开发心得，qq群号：130903919</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue中使用微信公众号js-sdk踩坑记录（2）

## 原文链接
[https://segmentfault.com/a/1190000012339148](https://segmentfault.com/a/1190000012339148)

