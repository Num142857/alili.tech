---
title: 'VueJs单页应用实现微信网页授权及微信分享功能' 
date: 2019-01-07 2:30:11
hidden: true
slug: mh2cbf6u3di
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>在实际开发中，无论是做PC端、WebApp端还是微信公众号等类型的项目的时候，或多或少都会涉及到微信相关的开发，最近公司项目要求实现微信网页授权，并获取微信用户基本信息的功能及微信分享的功能，现在总算完成了，但开发过程中遇到好几个坑。废话不多说了，开始正题。</blockquote>
<h2 id="articleHeader0">描述点</h2>
<ol>
<li>微信相关开发知识了解</li>
<li>怎么样实现微信相关功能本地测试</li>
<li>微信网页授权</li>
<li>微信分享</li>
</ol>
<h3 id="articleHeader1">微信相关开发知识了解</h3>
<ul>
<li>
<p>微信公众号的appId，AppSecret</p>
<ul><li>当我们注册一个微信公众号后，便能够得到一个appId(每个微信公众号只有一个，一个微信公众号唯一的标识)和appSecret(可以进行重置)，这两个信息是进行微信公众号开发必不可少的，因为微信公众号中几乎所有功能的开发都与这两个信息相关。</li></ul>
</li>
<li>
<p>微信公众号中IP白名单</p>
<ul><li>在开发微信公众功能的时候，需要我们添加IP白名单，这样以便能够获取到access_token，关于access_token的介绍请看这里<a href="https://mp.weixin.qq.com/wiki?t=resource/res_main&amp;id=mp1421140183" rel="nofollow noreferrer" target="_blank">https://mp.weixin.qq.com/wiki?t=resource/res_main&amp;id=mp1421140183</a>
</li></ul>
</li>
<li>
<p>网页授权域名以及JS接口安全域名</p>
<ul>
<li>网页授权域名:在我们的应用中需要微信用户进行登录、获取微信用户基本信息的时候，需要设置这个域名</li>
<li>JS接口安全域名:在我们的应用中需要实现微信分享等功能，需要设置这个域名。</li>
</ul>
</li>
</ul>
<h3 id="articleHeader2">怎么样实现微信相关功能本地测试</h3>
<p>相对很多人都对这个问题比较感兴趣，因为在进行涉及到微信公众号中功能开发的时候，默认情况下我们是不能进行本地测试的，也就是说测试都需要将代码进行部署才测试，但这非常不利于我们的测试开发，<strong>其实进行本地测试开发很简单，只需要我们有一个域名就可以了，然后将我们本地的ip映射到这个域名上，就可以本地测试了。</strong>下面我就说说我是怎么做本地测试的.</p>
<p>因为购买域名需要进行备案操作之类的，比较麻烦，所以一般第三方平台就可以让我们得到一个域名。我是在natpp(ngrok)这个网站上注册的<a href="https://natapp.cn/" rel="nofollow noreferrer" target="_blank">https://natapp.cn/</a></p>
<p>我是花了五元钱购买了一个月的隧道，因为免费的不怎么靠谱，毕竟是免费的，哈哈。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010278702" src="https://static.alili.tech/img/remote/1460000010278702" alt="" title="" style="cursor: pointer; display: inline;"></span><br><strong>注意，我们不能直接使用这个隧道，因为这个隧道是三级域名，无法用于微信开发，需要绑定一个二级域名或自主域名</strong></p>
<p>当绑定完域名之后，在本地我们需要将本地ip进行映射穿透操作。<br>windows下打开dos窗口，输入 natapp -authtoken 你的隧道的authtoken</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010278703" src="https://static.alili.tech/img/remote/1460000010278703" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><strong>将你在上面设置的二级域名添加到上述说的网页授权域名以及JS接口安全域名</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010278704" src="https://static.alili.tech/img/remote/1460000010278704" alt="" title="" style="cursor: pointer;"></span></p>
<p>接下来便可以进行本地测试了.最后说一下，开发过程中下载微信开发工具进行调试也是不错的选择，下载地址<a href="https://mp.weixin.qq.com/wiki?t=resource/res_main&amp;id=mp1455784140" rel="nofollow noreferrer" target="_blank">https://mp.weixin.qq.com/wiki?t=resource/res_main&amp;id=mp1455784140</a></p>
<h3 id="articleHeader3">微信网页授权</h3>
<p>微信网页授权的目的主要是实现三方站点微信的登录、获取微信用户信息等</p>
<h4>实现微信网页授权获取微信用户的基本信息</h4>
<ul><li>先判断当前浏览器是不是微信内置浏览器,微信网页授权api： <a href="https://mp.weixin.qq.com/wiki?t=resource/res_main&amp;id=mp1421140842" rel="nofollow noreferrer" target="_blank">https://mp.weixin.qq.com/wiki?t=resource/res_main&amp;id=mp1421140842</a>
</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
    isweixin() {
          const ua = window.navigator.userAgent.toLowerCase();
          if(ua.match(/MicroMessenger/i) == 'micromessenger'){
              return true;
          } else {
              return false;
          }
      },

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>
    isweixin() {
          <span class="hljs-keyword">const</span> ua = <span class="hljs-built_in">window</span>.navigator.userAgent.toLowerCase();
          <span class="hljs-keyword">if</span>(ua.match(<span class="hljs-regexp">/MicroMessenger/i</span>) == <span class="hljs-string">'micromessenger'</span>){
              <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
          } <span class="hljs-keyword">else</span> {
              <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
          }
      },

</code></pre>
<ul>
<li>1 第一步：用户同意授权，获取code</li>
<li>2 第二步：通过code换取网页授权access_token</li>
<li>3 第三步：刷新access_token（如果需要）</li>
<li>4 第四步：拉取用户信息(需scope为 snsapi_userinfo)</li>
<li>5 附：检验授权凭证（access_token）是否有效</li>
</ul>
<p>微信API里面关于这些都介绍得比较清楚的，我就说说在这个过程中我所遇到的问题，以及解决办法</p>
<p>在第一步获取code的时候，因为这个code在五分钟之内只能够使用一次，所以必须对这个code进行缓存起来。否则会出现"errcode":40163,"errmsg":"code been used, hints: [ req_id: nOCEBa0466th12 ]"或{"errcode":40029,"errmsg":"invalid code"} 错误。</p>
<h4>微信分享</h4>
<p>微信分享其实用得非常得多，我就简单说下在vue-cli中怎么引入微信分享的sdk，以及怎么样实现分享功能.</p>
<p>微信分享APi: <a href="https://mp.weixin.qq.com/wiki?t=resource/res_main&amp;id=mp1421141115" rel="nofollow noreferrer" target="_blank">https://mp.weixin.qq.com/wiki?t=resource/res_main&amp;id=mp1421141115</a></p>
<p>首先引入sdk:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install weixin-js-sdk --save-dev
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>npm <span class="hljs-keyword">install </span>weixin-<span class="hljs-keyword">js-sdk </span>--save-dev
</code></pre>
<p>然后通过require或者import引入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import wx from 'weixin-js-sdk';
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> wx <span class="hljs-keyword">from</span> <span class="hljs-string">'weixin-js-sdk'</span>;
</code></pre>
<p><strong>微信分享中最重要的是获取到签名，才能够实现微信的分享</strong></p>
<p>再根据当前的url去获取到所需要的参数来完成签名的验证，参数主要用appId<br>、nonceStr、timestamp、signature，然后通过wx对象的config方法去进行配置验证签名</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" wx.config({
          debug: false,
          appId: appId, // 和获取Ticke的必须一样------必填，公众号的唯一标识
          timestamp:timestamp, // 必填，生成签名的时间戳
          nonceStr: nonceStr, // 必填，生成签名的随机串
          signature: signature,// 必填，签名，见附录1
          //需要分享的列表项:发送给朋友，分享到朋友圈，分享到QQ，分享到QQ空间
          jsApiList: [
            'onMenuShareAppMessage','onMenuShareTimeline',
            'onMenuShareQQ','onMenuShareQZone'
          ]
        });


         //处理验证失败的信息
        wx.error(function (res) {
          logUtil.printLog('验证失败返回的信息:',res);
        });
        //处理验证成功的信息
        wx.ready(function () {
        //              alert(window.location.href.split('#')[0]);
          //分享到朋友圈
          wx.onMenuShareTimeline({
            title: _this.newDetailObj.title, // 分享标题
            link: window.location.href.split('#')[0], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: _this.newDetailObj.thu_image, // 分享图标
            success: function (res) {
              // 用户确认分享后执行的回调函数
              logUtil.printLog(&quot;分享到朋友圈成功返回的信息为:&quot;,res);
              _this.showMsg(&quot;分享成功!&quot;)
            },
            cancel: function (res) {
              // 用户取消分享后执行的回调函数
              logUtil.printLog(&quot;取消分享到朋友圈返回的信息为:&quot;,res);
            }
          });
          //分享给朋友
          wx.onMenuShareAppMessage({
            title: _this.newDetailObj.title, // 分享标题
            desc: _this.desc, // 分享描述
            link: window.location.href.split('#')[0], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: _this.newDetailObj.thu_image, // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function (res) {
              // 用户确认分享后执行的回调函数
              logUtil.printLog(&quot;分享给朋友成功返回的信息为:&quot;,res);
            },
            cancel: function (res) {
              // 用户取消分享后执行的回调函数
              logUtil.printLog(&quot;取消分享给朋友返回的信息为:&quot;,res);
            }
          });
          //分享到QQ
          wx.onMenuShareQQ({
            title: _this.newDetailObj.title, // 分享标题
            desc: _this.desc, // 分享描述
            link: window.location.href.split('#')[0], // 分享链接
            imgUrl: _this.newDetailObj.thu_image, // 分享图标
            success: function (res) {
              // 用户确认分享后执行的回调函数
              logUtil.printLog(&quot;分享到QQ好友成功返回的信息为:&quot;,res);
            },
            cancel: function (res) {
              // 用户取消分享后执行的回调函数
              logUtil.printLog(&quot;取消分享给QQ好友返回的信息为:&quot;,res);
            }
          });

          //分享到QQ空间
          wx.onMenuShareQZone({
            title: _this.newDetailObj.title, // 分享标题
            desc: _this.desc, // 分享描述
            link: window.location.href.split('#')[0], // 分享链接
            imgUrl: _this.newDetailObj.thu_image, // 分享图标
            success: function (res) {
              // 用户确认分享后执行的回调函数
              logUtil.printLog(&quot;分享到QQ空间成功返回的信息为:&quot;,res);
            },
            cancel: function (res) {
              // 用户取消分享后执行的回调函数
              logUtil.printLog(&quot;取消分享到QQ空间返回的信息为:&quot;,res);
            }
          });
        });
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code> <span class="hljs-selector-tag">wx</span><span class="hljs-selector-class">.config</span>({
          <span class="hljs-attribute">debug</span>: false,
          <span class="hljs-attribute">appId</span>: appId, <span class="hljs-comment">// 和获取Ticke的必须一样------必填，公众号的唯一标识</span>
          <span class="hljs-attribute">timestamp</span>:timestamp, <span class="hljs-comment">// 必填，生成签名的时间戳</span>
          <span class="hljs-attribute">nonceStr</span>: nonceStr, <span class="hljs-comment">// 必填，生成签名的随机串</span>
          <span class="hljs-attribute">signature</span>: signature,<span class="hljs-comment">// 必填，签名，见附录1</span>
          <span class="hljs-comment">//需要分享的列表项:发送给朋友，分享到朋友圈，分享到QQ，分享到QQ空间</span>
          <span class="hljs-attribute">jsApiList</span>: [
            <span class="hljs-string">'onMenuShareAppMessage'</span>,<span class="hljs-string">'onMenuShareTimeline'</span>,
            <span class="hljs-string">'onMenuShareQQ'</span>,<span class="hljs-string">'onMenuShareQZone'</span>
          ]
        });


         <span class="hljs-comment">//处理验证失败的信息</span>
        <span class="hljs-selector-tag">wx</span><span class="hljs-selector-class">.error</span>(function (res) {
          <span class="hljs-selector-tag">logUtil</span><span class="hljs-selector-class">.printLog</span>(<span class="hljs-string">'验证失败返回的信息:'</span>,res);
        });
        <span class="hljs-comment">//处理验证成功的信息</span>
        <span class="hljs-selector-tag">wx</span><span class="hljs-selector-class">.ready</span>(function () {
        <span class="hljs-comment">//              alert(window.location.href.split('#')[0]);</span>
          <span class="hljs-comment">//分享到朋友圈</span>
          <span class="hljs-selector-tag">wx</span><span class="hljs-selector-class">.onMenuShareTimeline</span>({
            <span class="hljs-attribute">title</span>: _this.newDetailObj.title, <span class="hljs-comment">// 分享标题</span>
            <span class="hljs-attribute">link</span>: window.location.href.split(<span class="hljs-string">'#'</span>)[<span class="hljs-number">0</span>], <span class="hljs-comment">// 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致</span>
            <span class="hljs-attribute">imgUrl</span>: _this.newDetailObj.thu_image, <span class="hljs-comment">// 分享图标</span>
            <span class="hljs-attribute">success</span>: function (res) {
              <span class="hljs-comment">// 用户确认分享后执行的回调函数</span>
              logUtil.printLog(<span class="hljs-string">"分享到朋友圈成功返回的信息为:"</span>,res);
              <span class="hljs-selector-tag">_this</span><span class="hljs-selector-class">.showMsg</span>(<span class="hljs-string">"分享成功!"</span>)
            },
            <span class="hljs-selector-tag">cancel</span>: <span class="hljs-selector-tag">function</span> (res) {
              <span class="hljs-comment">// 用户取消分享后执行的回调函数</span>
              <span class="hljs-selector-tag">logUtil</span><span class="hljs-selector-class">.printLog</span>(<span class="hljs-string">"取消分享到朋友圈返回的信息为:"</span>,res);
            }
          });
          <span class="hljs-comment">//分享给朋友</span>
          <span class="hljs-selector-tag">wx</span><span class="hljs-selector-class">.onMenuShareAppMessage</span>({
            <span class="hljs-attribute">title</span>: _this.newDetailObj.title, <span class="hljs-comment">// 分享标题</span>
            <span class="hljs-attribute">desc</span>: _this.desc, <span class="hljs-comment">// 分享描述</span>
            <span class="hljs-attribute">link</span>: window.location.href.split(<span class="hljs-string">'#'</span>)[<span class="hljs-number">0</span>], <span class="hljs-comment">// 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致</span>
            <span class="hljs-attribute">imgUrl</span>: _this.newDetailObj.thu_image, <span class="hljs-comment">// 分享图标</span>
            <span class="hljs-attribute">type</span>: <span class="hljs-string">''</span>, <span class="hljs-comment">// 分享类型,music、video或link，不填默认为link</span>
            <span class="hljs-attribute">dataUrl</span>: <span class="hljs-string">''</span>, <span class="hljs-comment">// 如果type是music或video，则要提供数据链接，默认为空</span>
            <span class="hljs-attribute">success</span>: function (res) {
              <span class="hljs-comment">// 用户确认分享后执行的回调函数</span>
              logUtil.printLog(<span class="hljs-string">"分享给朋友成功返回的信息为:"</span>,res);
            },
            <span class="hljs-attribute">cancel</span>: function (res) {
              <span class="hljs-comment">// 用户取消分享后执行的回调函数</span>
              <span class="hljs-selector-tag">logUtil</span><span class="hljs-selector-class">.printLog</span>(<span class="hljs-string">"取消分享给朋友返回的信息为:"</span>,res);
            }
          });
          <span class="hljs-comment">//分享到QQ</span>
          <span class="hljs-selector-tag">wx</span><span class="hljs-selector-class">.onMenuShareQQ</span>({
            <span class="hljs-attribute">title</span>: _this.newDetailObj.title, <span class="hljs-comment">// 分享标题</span>
            <span class="hljs-attribute">desc</span>: _this.desc, <span class="hljs-comment">// 分享描述</span>
            <span class="hljs-attribute">link</span>: window.location.href.split(<span class="hljs-string">'#'</span>)[<span class="hljs-number">0</span>], <span class="hljs-comment">// 分享链接</span>
            <span class="hljs-attribute">imgUrl</span>: _this.newDetailObj.thu_image, <span class="hljs-comment">// 分享图标</span>
            <span class="hljs-attribute">success</span>: function (res) {
              <span class="hljs-comment">// 用户确认分享后执行的回调函数</span>
              logUtil.printLog(<span class="hljs-string">"分享到QQ好友成功返回的信息为:"</span>,res);
            },
            <span class="hljs-attribute">cancel</span>: function (res) {
              <span class="hljs-comment">// 用户取消分享后执行的回调函数</span>
              <span class="hljs-selector-tag">logUtil</span><span class="hljs-selector-class">.printLog</span>(<span class="hljs-string">"取消分享给QQ好友返回的信息为:"</span>,res);
            }
          });

          <span class="hljs-comment">//分享到QQ空间</span>
          <span class="hljs-selector-tag">wx</span><span class="hljs-selector-class">.onMenuShareQZone</span>({
            <span class="hljs-attribute">title</span>: _this.newDetailObj.title, <span class="hljs-comment">// 分享标题</span>
            <span class="hljs-attribute">desc</span>: _this.desc, <span class="hljs-comment">// 分享描述</span>
            <span class="hljs-attribute">link</span>: window.location.href.split(<span class="hljs-string">'#'</span>)[<span class="hljs-number">0</span>], <span class="hljs-comment">// 分享链接</span>
            <span class="hljs-attribute">imgUrl</span>: _this.newDetailObj.thu_image, <span class="hljs-comment">// 分享图标</span>
            <span class="hljs-attribute">success</span>: function (res) {
              <span class="hljs-comment">// 用户确认分享后执行的回调函数</span>
              logUtil.printLog(<span class="hljs-string">"分享到QQ空间成功返回的信息为:"</span>,res);
            },
            <span class="hljs-attribute">cancel</span>: function (res) {
              <span class="hljs-comment">// 用户取消分享后执行的回调函数</span>
              <span class="hljs-selector-tag">logUtil</span><span class="hljs-selector-class">.printLog</span>(<span class="hljs-string">"取消分享到QQ空间返回的信息为:"</span>,res);
            }
          });
        });
</code></pre>
<p><strong>在这个过程中出现的错误就是:config:invalid signature</strong>，这个错误就说明签名不对，这时候需要静下心来去想想，然后进行排除，我最后发现原来是当前的url的错误，看了网上很多都是url需要进行编码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let url = encodeURIComponent(window.location.href.split('#')[0]);

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-keyword">let</span> <span class="hljs-built_in">url</span> = <span class="hljs-built_in">encodeURIComponent</span>(<span class="hljs-built_in">window</span>.location.href.split(<span class="hljs-string">'#'</span>)[<span class="hljs-number">0</span>]);

</code></pre>
<p>就不错了，最后来看看效果</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010278705" src="https://static.alili.tech/img/remote/1460000010278705" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>一般出现这个问题，大部分都是url的问题哦。</p>
<p>今天就写到这里，需要交流的小伙伴请加群:526450553</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
VueJs单页应用实现微信网页授权及微信分享功能

## 原文链接
[https://segmentfault.com/a/1190000010278697](https://segmentfault.com/a/1190000010278697)

