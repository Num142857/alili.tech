---
title: '微信小程序开发：python+sanic 实现小程序登录注册' 
date: 2019-01-06 2:30:10
hidden: true
slug: 4uaieeadljm
categories: [reprint]
---

{{< raw >}}

                    
<p>开发微信小程序时，接入小程序的授权登录可以快速实现用户注册登录的步骤，是快速建立用户体系的重要一步。这篇文章将介绍 python + sanic + 微信小程序实现用户快速注册登录全栈方案。</p>
<p><strong>微信小程序登录时序图如下：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010414725" src="https://static.alili.tech/img/remote/1460000010414725" alt="登录时序图" title="登录时序图" style="cursor: pointer; display: inline;"></span></p>
<p>这个流程分为两大部分：</p>
<ol>
<li><p>小程序使用 wx.login() API 获取 code，调用 wx.getUserInfo() API 获取 encryptedData 和 iv，然后将这三个信息发送给第三方服务器。</p></li>
<li><p>第三方服务器获取到 code、encryptedData和 iv 后，使用 code 换取 session_key，然后将 session_key 利用 encryptedData 和 iv 解密在服务端获取用户信息。根据用户信息返回 jwt 数据，完成登录。</p></li>
</ol>
<p>下面我们先看一下小程序提供的 API。</p>
<h2 id="articleHeader0">小程序登录 API</h2>
<p>在这个授权登录的过程中，用到的 API 如下：</p>
<ul>
<li><p>wx.login</p></li>
<li><p>wx.getUserInfo</p></li>
</ul>
<p><code>wx.chekSession</code> 是可选的，这里并没有用到。</p>
<h3 id="articleHeader1">wx.login(OBJECT)</h3>
<p>调用此接口可以获取登录凭证（code），以用来换取用户登录态信息，包括用户的唯一标识（openid） 及本次登录的 会话密钥（session_key）。</p>
<p>如果接口调用成功，返回结果如下：</p>
<table>
<thead><tr>
<th>参数名</th>
<th>类型</th>
<th>说明</th>
</tr></thead>
<tbody>
<tr>
<td>errMsg</td>
<td>String</td>
<td>调用结果</td>
</tr>
<tr>
<td>code</td>
<td>String</td>
<td>用户允许登录后，回调内容会带上 code（有效期五分钟），开发者需要将 code 发送到开发者服务器后台，使用code 换取 session_key api，将 code 换成 openid 和 session_key</td>
</tr>
</tbody>
</table>
<h4>code 换取 session_key</h4>
<p>开发者服务器使用登录凭证 code 获取 session_key 和 openid。其中 session_key 是对用户数据进行加密签名的密钥。为了自身应用安全，session_key 不应该在网络上传输。所以这一步应该在服务器端实现。</p>
<h3 id="articleHeader2">wx.getUserInfo</h3>
<p>此接口用来获取用户信息。</p>
<blockquote><p>当 <code>withCredentials</code> 为 true 时，要求此前有调用过 wx.login 且登录态尚未过期，此时返回的数据会包含 encryptedData, iv 等敏感信息；当 withCredentials 为 false 时，不要求有登录态，返回的数据不包含 encryptedData, iv 等敏感信息。</p></blockquote>
<p>接口success 时返回参数如下：</p>
<table>
<thead><tr>
<th>参数名</th>
<th>类型</th>
<th>说明</th>
</tr></thead>
<tbody>
<tr>
<td>userInfo</td>
<td>OBJECT</td>
<td>用户信息对象，不包含 openid 等敏感信息</td>
</tr>
<tr>
<td>rawData</td>
<td>String</td>
<td>不包括敏感信息的原始数据字符串，用于计算签名。</td>
</tr>
<tr>
<td>signature</td>
<td>String</td>
<td>使用 sha1( rawData + sessionkey ) 得到字符串，用于校验用户信息，参考文档 signature。</td>
</tr>
<tr>
<td>encryptedData</td>
<td>String</td>
<td>包括敏感数据在内的完整用户信息的加密数据，详细见加密数据解密算法</td>
</tr>
<tr>
<td>iv</td>
<td>String</td>
<td>加密算法的初始向量，详细见加密数据解密算法</td>
</tr>
</tbody>
</table>
<p><code>encryptedData</code> 解密后为以下 json 结构，详见加密数据解密算法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;openId&quot;: &quot;OPENID&quot;,
    &quot;nickName&quot;: &quot;NICKNAME&quot;,
    &quot;gender&quot;: GENDER,
    &quot;city&quot;: &quot;CITY&quot;,
    &quot;province&quot;: &quot;PROVINCE&quot;,
    &quot;country&quot;: &quot;COUNTRY&quot;,
    &quot;avatarUrl&quot;: &quot;AVATARURL&quot;,
    &quot;unionId&quot;: &quot;UNIONID&quot;,
    &quot;watermark&quot;:
    {
        &quot;appid&quot;:&quot;APPID&quot;,
    &quot;timestamp&quot;:TIMESTAMP
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
    <span class="hljs-attr">"openId"</span>: <span class="hljs-string">"OPENID"</span>,
    <span class="hljs-attr">"nickName"</span>: <span class="hljs-string">"NICKNAME"</span>,
    <span class="hljs-attr">"gender"</span>: GENDER,
    <span class="hljs-attr">"city"</span>: <span class="hljs-string">"CITY"</span>,
    <span class="hljs-attr">"province"</span>: <span class="hljs-string">"PROVINCE"</span>,
    <span class="hljs-attr">"country"</span>: <span class="hljs-string">"COUNTRY"</span>,
    <span class="hljs-attr">"avatarUrl"</span>: <span class="hljs-string">"AVATARURL"</span>,
    <span class="hljs-attr">"unionId"</span>: <span class="hljs-string">"UNIONID"</span>,
    <span class="hljs-attr">"watermark"</span>:
    {
        <span class="hljs-attr">"appid"</span>:<span class="hljs-string">"APPID"</span>,
    <span class="hljs-attr">"timestamp"</span>:TIMESTAMP
    }
}</code></pre>
<blockquote><p>由于解密 encryptedData 需要 session_key 和 iv 所以，在给服务器端发送授权验证的过程中需要将 code、encryptedData 和 iv 一起发送。</p></blockquote>
<h2 id="articleHeader3">服务器端提供的 API</h2>
<p>服务器端授权需要提供两个 API：</p>
<ol>
<li><p>/oauth/token 通过小程序提供的验证信息获取服务器自己的 token</p></li>
<li><p>/accounts/wxapp 如果登录用户是未注册用户，使用此接口注册为新用户。</p></li>
</ol>
<h3 id="articleHeader4">换取第三方 token（/oauth/token）</h3>
<p>开始授权时，小程序调用此 API 尝试换取jwt，如果用户未注册返回401，如果用户发送参数错误，返回403。</p>
<p>接口 获取 jwt 成功时返回参数如下：</p>
<table>
<thead><tr>
<th>参数名</th>
<th>类型</th>
<th>说明</th>
</tr></thead>
<tbody>
<tr>
<td>account_id</td>
<td>string</td>
<td>当前授权用户的用户 ID</td>
</tr>
<tr>
<td>access_token</td>
<td>string</td>
<td>jwt（登录流程中的第三方 session_key</td>
</tr>
<tr>
<td>token_type</td>
<td>string</td>
<td>token 类型（固定Bearer）</td>
</tr>
</tbody>
</table>
<p>小程序授权后应该先调用此接口，如果结果是用户未注册，则应该调用新用户注册的接口先注册新用户，注册成功后再调用此接口换取 jwt。</p>
<h3 id="articleHeader5">新用户注册（/accounts/wxapp）</h3>
<p>注册新用户时，服务器端需要存储当前用户的 openid，所以和授权接口一样，请求时需要的参数为 code、encryptedData 和 iv。</p>
<p>注册成功后，将返回用户的 ID 和注册时间。此时，应该再次调用获取 token 的接口去换取第三方 token，以用来下次登录。</p>
<h2 id="articleHeader6">实现流程</h2>
<p>接口定义好之后，来看下前后端整体的授权登录流程。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010414726" src="https://static.alili.tech/img/remote/1460000010414726" alt="小程序授权登录流程" title="小程序授权登录流程" style="cursor: pointer;"></span></p>
<p>这个流程需要注意的是，在 C 步（使用 code 换取 session ）之后我们得到 session_key，然后需要用 session_key 解密得到用户数据。</p>
<p>然后使用 openid 判断用户是否已经注册，如果用户已经注册，生成  jwt 返回给小程序。<br>如果用户未注册返回401， 提示用户未注册。</p>
<blockquote>
<p><code>jwt(3rd_session)</code> 用于第三方服务器和小程序之间做登录态校验，为了保证安全性，jwt 应该满足：</p>
<ol>
<li><p>足够长。建议有 2^128 组合</p></li>
<li><p>避免使用 srand(当前时间)，然后 rand() 的方法，而是采用操作系统提供的真正随机数机制。</p></li>
<li><p>设置一定的有效时间，</p></li>
</ol>
</blockquote>
<p>当然，在小程序中也可以使用手机号登录，不过这是另一个功能了，就不在这里叙述了。</p>
<h2 id="articleHeader7">代码实现</h2>
<p>说了这么多，接下来看代码吧。</p>
<h3 id="articleHeader8">小程序端代码</h3>
<p>代码逻辑为：</p>
<ol>
<li><p>用户在小程序授权</p></li>
<li><p>小程序将授权消息发送到服务器，服务器检查用户是否已经注册，如果注册返回 jwt，如果没注册提示用户未注册，然后小程序重新请求注册接口，注册用户，注册成功后重复这一步。</p></li>
</ol>
<p>为了简便，这里在小程序 启动的时候就请求授权。代码实现如下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//app.js
var config = require('./config.js')

App({
    onLaunch: function() {
        //调用API从本地缓存中获取数据
        var jwt = wx.getStorageSync('jwt');
        var that = this;
        if (!jwt.access_token){ //检查 jwt 是否存在 如果不存在调用登录
            that.login();
        } else {
            console.log(jwt.account_id);
        }
    },
    login: function() {
        // 登录部分代码
        var that = this;
        wx.login({
            // 调用 login 获取 code
            success: function(res) {
                var code = res.code;
                wx.getUserInfo({
                    // 调用 getUserInfo 获取 encryptedData 和 iv
                    success: function(res) {
                        // success
                        that.globalData.userInfo = res.userInfo;
                        var encryptedData = res.encryptedData || 'encry';
                        var iv = res.iv || 'iv';
                        console.log(config.basic_token);
                        wx.request({ // 发送请求 获取 jwt
                            url: config.host + '/auth/oauth/token?code=' + code,
                            header: {
                                Authorization: config.basic_token
                            },
                            data: {
                                username: encryptedData,
                                password: iv,
                                grant_type: &quot;password&quot;,
                                auth_approach: 'wxapp',
                            },
                            method: &quot;POST&quot;,
                            success: function(res) {
                                if (res.statusCode === 201) {
                                    // 得到 jwt 后存储到 storage，
                                    wx.showToast({
                                        title: '登录成功',
                                        icon: 'success'
                                    });
                                    wx.setStorage({
                                        key: &quot;jwt&quot;,
                                        data: res.data
                                    });
                                    that.globalData.access_token = res.data.access_token;
                                    that.globalData.account_id = res.data.sub;
                                } else if (res.statusCode === 401){
                                    // 如果没有注册调用注册接口
                                    that.register();
                                } else {
                                    // 提示错误信息
                                    wx.showToast({
                                        title: res.data.text,
                                        icon: 'success',
                                        duration: 2000
                                    });
                                }
                            },
                            fail: function(res) {
                                console.log('request token fail');
                            }
                        })
                    },
                    fail: function() {
                        // fail
                    },
                    complete: function() {
                        // complete
                    }
                })
            }
        })

    },
    register: function() {
        // 注册代码
        var that = this;
        wx.login({ // 调用登录接口获取 code
            success: function(res) {
                var code = res.code;
                wx.getUserInfo({
                    // 调用 getUserInfo 获取 encryptedData 和 iv
                    success: function(res) {
                        // success
                        that.globalData.userInfo = res.userInfo;
                        var encryptedData = res.encryptedData || 'encry';
                        var iv = res.iv || 'iv';
                        console.log(iv);
                        wx.request({ // 请求注册用户接口
                            url: config.host + '/auth/accounts/wxapp',
                            header: {
                                Authorization: config.basic_token
                            },
                            data: {
                                username: encryptedData,
                                password: iv,
                                code: code,
                            },
                            method: &quot;POST&quot;,
                            success: function(res) {
                                if (res.statusCode === 201) {
                                    wx.showToast({
                                        title: '注册成功',
                                        icon: 'success'
                                    });
                                    that.login();
                                } else if (res.statusCode === 400) {
                                    wx.showToast({
                                        title: '用户已注册',
                                        icon: 'success'
                                    });
                                    that.login();
                                } else if (res.statusCode === 403) {
                                    wx.showToast({
                                        title: res.data.text,
                                        icon: 'success'
                                    });
                                }
                                console.log(res.statusCode);
                                console.log('request token success');
                            },
                            fail: function(res) {
                                console.log('request token fail');
                            }
                        })
                    },
                    fail: function() {
                        // fail
                    },
                    complete: function() {
                        // complete
                    }
                })
            }
        })

    },

    get_user_info: function(jwt) {
        wx.request({
            url: config.host + '/auth/accounts/self',
            header: {
                Authorization: jwt.token_type + ' ' + jwt.access_token
            },
            method: &quot;GET&quot;,
            success: function (res) {
                if (res.statusCode === 201) {
                    wx.showToast({
                        title: '已注册',
                        icon: 'success'
                    });
                } else if (res.statusCode === 401 || res.statusCode === 403) {
                    wx.showToast({
                        title: '未注册',
                        icon: 'error'
                    });
                }

                console.log(res.statusCode);
                console.log('request token success');
            },
            fail: function (res) {
                console.log('request token fail');
            }
        })
    },

    globalData: {
        userInfo: null
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//app.js</span>
<span class="hljs-keyword">var</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./config.js'</span>)

App({
    <span class="hljs-attr">onLaunch</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">//调用API从本地缓存中获取数据</span>
        <span class="hljs-keyword">var</span> jwt = wx.getStorageSync(<span class="hljs-string">'jwt'</span>);
        <span class="hljs-keyword">var</span> that = <span class="hljs-keyword">this</span>;
        <span class="hljs-keyword">if</span> (!jwt.access_token){ <span class="hljs-comment">//检查 jwt 是否存在 如果不存在调用登录</span>
            that.login();
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-built_in">console</span>.log(jwt.account_id);
        }
    },
    <span class="hljs-attr">login</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 登录部分代码</span>
        <span class="hljs-keyword">var</span> that = <span class="hljs-keyword">this</span>;
        wx.login({
            <span class="hljs-comment">// 调用 login 获取 code</span>
            success: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res</span>) </span>{
                <span class="hljs-keyword">var</span> code = res.code;
                wx.getUserInfo({
                    <span class="hljs-comment">// 调用 getUserInfo 获取 encryptedData 和 iv</span>
                    success: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res</span>) </span>{
                        <span class="hljs-comment">// success</span>
                        that.globalData.userInfo = res.userInfo;
                        <span class="hljs-keyword">var</span> encryptedData = res.encryptedData || <span class="hljs-string">'encry'</span>;
                        <span class="hljs-keyword">var</span> iv = res.iv || <span class="hljs-string">'iv'</span>;
                        <span class="hljs-built_in">console</span>.log(config.basic_token);
                        wx.request({ <span class="hljs-comment">// 发送请求 获取 jwt</span>
                            url: config.host + <span class="hljs-string">'/auth/oauth/token?code='</span> + code,
                            <span class="hljs-attr">header</span>: {
                                <span class="hljs-attr">Authorization</span>: config.basic_token
                            },
                            <span class="hljs-attr">data</span>: {
                                <span class="hljs-attr">username</span>: encryptedData,
                                <span class="hljs-attr">password</span>: iv,
                                <span class="hljs-attr">grant_type</span>: <span class="hljs-string">"password"</span>,
                                <span class="hljs-attr">auth_approach</span>: <span class="hljs-string">'wxapp'</span>,
                            },
                            <span class="hljs-attr">method</span>: <span class="hljs-string">"POST"</span>,
                            <span class="hljs-attr">success</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res</span>) </span>{
                                <span class="hljs-keyword">if</span> (res.statusCode === <span class="hljs-number">201</span>) {
                                    <span class="hljs-comment">// 得到 jwt 后存储到 storage，</span>
                                    wx.showToast({
                                        <span class="hljs-attr">title</span>: <span class="hljs-string">'登录成功'</span>,
                                        <span class="hljs-attr">icon</span>: <span class="hljs-string">'success'</span>
                                    });
                                    wx.setStorage({
                                        <span class="hljs-attr">key</span>: <span class="hljs-string">"jwt"</span>,
                                        <span class="hljs-attr">data</span>: res.data
                                    });
                                    that.globalData.access_token = res.data.access_token;
                                    that.globalData.account_id = res.data.sub;
                                } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (res.statusCode === <span class="hljs-number">401</span>){
                                    <span class="hljs-comment">// 如果没有注册调用注册接口</span>
                                    that.register();
                                } <span class="hljs-keyword">else</span> {
                                    <span class="hljs-comment">// 提示错误信息</span>
                                    wx.showToast({
                                        <span class="hljs-attr">title</span>: res.data.text,
                                        <span class="hljs-attr">icon</span>: <span class="hljs-string">'success'</span>,
                                        <span class="hljs-attr">duration</span>: <span class="hljs-number">2000</span>
                                    });
                                }
                            },
                            <span class="hljs-attr">fail</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res</span>) </span>{
                                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'request token fail'</span>);
                            }
                        })
                    },
                    <span class="hljs-attr">fail</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                        <span class="hljs-comment">// fail</span>
                    },
                    <span class="hljs-attr">complete</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                        <span class="hljs-comment">// complete</span>
                    }
                })
            }
        })

    },
    <span class="hljs-attr">register</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 注册代码</span>
        <span class="hljs-keyword">var</span> that = <span class="hljs-keyword">this</span>;
        wx.login({ <span class="hljs-comment">// 调用登录接口获取 code</span>
            success: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res</span>) </span>{
                <span class="hljs-keyword">var</span> code = res.code;
                wx.getUserInfo({
                    <span class="hljs-comment">// 调用 getUserInfo 获取 encryptedData 和 iv</span>
                    success: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res</span>) </span>{
                        <span class="hljs-comment">// success</span>
                        that.globalData.userInfo = res.userInfo;
                        <span class="hljs-keyword">var</span> encryptedData = res.encryptedData || <span class="hljs-string">'encry'</span>;
                        <span class="hljs-keyword">var</span> iv = res.iv || <span class="hljs-string">'iv'</span>;
                        <span class="hljs-built_in">console</span>.log(iv);
                        wx.request({ <span class="hljs-comment">// 请求注册用户接口</span>
                            url: config.host + <span class="hljs-string">'/auth/accounts/wxapp'</span>,
                            <span class="hljs-attr">header</span>: {
                                <span class="hljs-attr">Authorization</span>: config.basic_token
                            },
                            <span class="hljs-attr">data</span>: {
                                <span class="hljs-attr">username</span>: encryptedData,
                                <span class="hljs-attr">password</span>: iv,
                                <span class="hljs-attr">code</span>: code,
                            },
                            <span class="hljs-attr">method</span>: <span class="hljs-string">"POST"</span>,
                            <span class="hljs-attr">success</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res</span>) </span>{
                                <span class="hljs-keyword">if</span> (res.statusCode === <span class="hljs-number">201</span>) {
                                    wx.showToast({
                                        <span class="hljs-attr">title</span>: <span class="hljs-string">'注册成功'</span>,
                                        <span class="hljs-attr">icon</span>: <span class="hljs-string">'success'</span>
                                    });
                                    that.login();
                                } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (res.statusCode === <span class="hljs-number">400</span>) {
                                    wx.showToast({
                                        <span class="hljs-attr">title</span>: <span class="hljs-string">'用户已注册'</span>,
                                        <span class="hljs-attr">icon</span>: <span class="hljs-string">'success'</span>
                                    });
                                    that.login();
                                } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (res.statusCode === <span class="hljs-number">403</span>) {
                                    wx.showToast({
                                        <span class="hljs-attr">title</span>: res.data.text,
                                        <span class="hljs-attr">icon</span>: <span class="hljs-string">'success'</span>
                                    });
                                }
                                <span class="hljs-built_in">console</span>.log(res.statusCode);
                                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'request token success'</span>);
                            },
                            <span class="hljs-attr">fail</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res</span>) </span>{
                                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'request token fail'</span>);
                            }
                        })
                    },
                    <span class="hljs-attr">fail</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                        <span class="hljs-comment">// fail</span>
                    },
                    <span class="hljs-attr">complete</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                        <span class="hljs-comment">// complete</span>
                    }
                })
            }
        })

    },

    <span class="hljs-attr">get_user_info</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">jwt</span>) </span>{
        wx.request({
            <span class="hljs-attr">url</span>: config.host + <span class="hljs-string">'/auth/accounts/self'</span>,
            <span class="hljs-attr">header</span>: {
                <span class="hljs-attr">Authorization</span>: jwt.token_type + <span class="hljs-string">' '</span> + jwt.access_token
            },
            <span class="hljs-attr">method</span>: <span class="hljs-string">"GET"</span>,
            <span class="hljs-attr">success</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">res</span>) </span>{
                <span class="hljs-keyword">if</span> (res.statusCode === <span class="hljs-number">201</span>) {
                    wx.showToast({
                        <span class="hljs-attr">title</span>: <span class="hljs-string">'已注册'</span>,
                        <span class="hljs-attr">icon</span>: <span class="hljs-string">'success'</span>
                    });
                } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (res.statusCode === <span class="hljs-number">401</span> || res.statusCode === <span class="hljs-number">403</span>) {
                    wx.showToast({
                        <span class="hljs-attr">title</span>: <span class="hljs-string">'未注册'</span>,
                        <span class="hljs-attr">icon</span>: <span class="hljs-string">'error'</span>
                    });
                }

                <span class="hljs-built_in">console</span>.log(res.statusCode);
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'request token success'</span>);
            },
            <span class="hljs-attr">fail</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">res</span>) </span>{
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'request token fail'</span>);
            }
        })
    },

    <span class="hljs-attr">globalData</span>: {
        <span class="hljs-attr">userInfo</span>: <span class="hljs-literal">null</span>
    }
})</code></pre>
<h3 id="articleHeader9">服务端代码</h3>
<p>服务端使用 <a href="https://github.com/channelcat/sanic" rel="nofollow noreferrer" target="_blank"><code>sanic</code></a> 框架 + <a href="https://github.com/guokr/swagger-py-codegen" rel="nofollow noreferrer" target="_blank"><code>swagger_py_codegen</code></a> 生成 rest-api。<br>数据库使用 MongoDB，<a href="https://github.com/gusibi/python-weixin" rel="nofollow noreferrer" target="_blank"><code>python-weixin</code></a> 实现了登录过程中 code 换取 session_key 以及 encryptedData 解密的功能，所以使用python-weixin 作为 python 微信 sdk 使用。</p>
<blockquote>
<p>为了过滤无效请求，服务器端要求用户在获取 token 或授权时在 header 中带上 <code>Authorization</code> 信息。 <code>Authorization</code> 在登录前使用的是 Basic 验证（格式 (Basic hashkey) 注 hashkey为client_id + client_secret 做BASE64处理），只是用来校验请求的客户端是否合法。不过Basic 基本等同于明文，并不能用它来进行严格的授权验证。</p>
<p>jwt 原理及使用参见 <a href="https://mp.weixin.qq.com/s?__biz=MzAwNjI5MjAzNw==&amp;mid=2655752020&amp;idx=1&amp;sn=b5e56989a57e9b8067eb6614381a04fd&amp;chksm=80b0b87eb7c73168d7eb1d7f1a95e759b9b0934318571de4f6d2455402e654e6c09d9b022f25" rel="nofollow noreferrer" target="_blank">理解JWT（JSON Web Token）认证及实践</a></p>
</blockquote>
<p>使用 swagger 生成代码结构如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010414727" src="https://static.alili.tech/img/remote/1460000010414727" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>由于代码太长，这里只放获取 jwt 的逻辑：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="def get_wxapp_userinfo(encrypted_data, iv, code):
    from weixin.lib.wxcrypt import WXBizDataCrypt
    from weixin import WXAPPAPI
    from weixin.oauth2 import OAuth2AuthExchangeError
    appid = Config.WXAPP_ID
    secret = Config.WXAPP_SECRET
    api = WXAPPAPI(appid=appid, app_secret=secret)
    try:
        # 使用 code  换取 session key    
        session_info = api.exchange_code_for_session_key(code=code)
    except OAuth2AuthExchangeError as e:
        raise Unauthorized(e.code, e.description)
    session_key = session_info.get('session_key')
    crypt = WXBizDataCrypt(appid, session_key)
    # 解密得到 用户信息
    user_info = crypt.decrypt(encrypted_data, iv)
    return user_info


def verify_wxapp(encrypted_data, iv, code):
    user_info = get_wxapp_userinfo(encrypted_data, iv, code)
    # 获取 openid
    openid = user_info.get('openId', None)
    if openid:
        auth = Account.get_by_wxapp(openid)
        if not auth:
            raise Unauthorized('wxapp_not_registered')
        return auth
    raise Unauthorized('invalid_wxapp_code')
    
    
def create_token(request):
    # verify basic token
    approach = request.json.get('auth_approach')
    username = request.json['username']
    password = request.json['password']
    if approach == 'password':
        account = verify_password(username, password)
    elif approach == 'wxapp':
        account = verify_wxapp(username, password, request.args.get('code'))
    if not account:
        return False, {}
    payload = {
        &quot;iss&quot;: Config.ISS,
        &quot;iat&quot;: int(time.time()),
        &quot;exp&quot;: int(time.time()) + 86400 * 7,
        &quot;aud&quot;: Config.AUDIENCE,
        &quot;sub&quot;: str(account['_id']),
        &quot;nickname&quot;: account['nickname'],
        &quot;scopes&quot;: ['open']
    }
    token = jwt.encode(payload, 'secret', algorithm='HS256')
    # 由于 account 中 _id 是一个 object 需要转化成字符串
    return True, {'access_token': token, 'account_id': str(account['_id'])}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="python hljs"><code class="python"><span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">get_wxapp_userinfo</span><span class="hljs-params">(encrypted_data, iv, code)</span>:</span>
    <span class="hljs-keyword">from</span> weixin.lib.wxcrypt <span class="hljs-keyword">import</span> WXBizDataCrypt
    <span class="hljs-keyword">from</span> weixin <span class="hljs-keyword">import</span> WXAPPAPI
    <span class="hljs-keyword">from</span> weixin.oauth2 <span class="hljs-keyword">import</span> OAuth2AuthExchangeError
    appid = Config.WXAPP_ID
    secret = Config.WXAPP_SECRET
    api = WXAPPAPI(appid=appid, app_secret=secret)
    <span class="hljs-keyword">try</span>:
        <span class="hljs-comment"># 使用 code  换取 session key    </span>
        session_info = api.exchange_code_for_session_key(code=code)
    <span class="hljs-keyword">except</span> OAuth2AuthExchangeError <span class="hljs-keyword">as</span> e:
        <span class="hljs-keyword">raise</span> Unauthorized(e.code, e.description)
    session_key = session_info.get(<span class="hljs-string">'session_key'</span>)
    crypt = WXBizDataCrypt(appid, session_key)
    <span class="hljs-comment"># 解密得到 用户信息</span>
    user_info = crypt.decrypt(encrypted_data, iv)
    <span class="hljs-keyword">return</span> user_info


<span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">verify_wxapp</span><span class="hljs-params">(encrypted_data, iv, code)</span>:</span>
    user_info = get_wxapp_userinfo(encrypted_data, iv, code)
    <span class="hljs-comment"># 获取 openid</span>
    openid = user_info.get(<span class="hljs-string">'openId'</span>, <span class="hljs-keyword">None</span>)
    <span class="hljs-keyword">if</span> openid:
        auth = Account.get_by_wxapp(openid)
        <span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> auth:
            <span class="hljs-keyword">raise</span> Unauthorized(<span class="hljs-string">'wxapp_not_registered'</span>)
        <span class="hljs-keyword">return</span> auth
    <span class="hljs-keyword">raise</span> Unauthorized(<span class="hljs-string">'invalid_wxapp_code'</span>)
    
    
<span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">create_token</span><span class="hljs-params">(request)</span>:</span>
    <span class="hljs-comment"># verify basic token</span>
    approach = request.json.get(<span class="hljs-string">'auth_approach'</span>)
    username = request.json[<span class="hljs-string">'username'</span>]
    password = request.json[<span class="hljs-string">'password'</span>]
    <span class="hljs-keyword">if</span> approach == <span class="hljs-string">'password'</span>:
        account = verify_password(username, password)
    <span class="hljs-keyword">elif</span> approach == <span class="hljs-string">'wxapp'</span>:
        account = verify_wxapp(username, password, request.args.get(<span class="hljs-string">'code'</span>))
    <span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> account:
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">False</span>, {}
    payload = {
        <span class="hljs-string">"iss"</span>: Config.ISS,
        <span class="hljs-string">"iat"</span>: int(time.time()),
        <span class="hljs-string">"exp"</span>: int(time.time()) + <span class="hljs-number">86400</span> * <span class="hljs-number">7</span>,
        <span class="hljs-string">"aud"</span>: Config.AUDIENCE,
        <span class="hljs-string">"sub"</span>: str(account[<span class="hljs-string">'_id'</span>]),
        <span class="hljs-string">"nickname"</span>: account[<span class="hljs-string">'nickname'</span>],
        <span class="hljs-string">"scopes"</span>: [<span class="hljs-string">'open'</span>]
    }
    token = jwt.encode(payload, <span class="hljs-string">'secret'</span>, algorithm=<span class="hljs-string">'HS256'</span>)
    <span class="hljs-comment"># 由于 account 中 _id 是一个 object 需要转化成字符串</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">True</span>, {<span class="hljs-string">'access_token'</span>: token, <span class="hljs-string">'account_id'</span>: str(account[<span class="hljs-string">'_id'</span>])}</code></pre>
<p>具体代码可以在 <a href="https://github.com/gusibi/Metis" rel="nofollow noreferrer" target="_blank">Metis：https://github.com/gusibi/Metis</a> 查看。</p>
<blockquote>
<p><code>Note</code>: 如果试用代码，请先设定 oauth2_client，使用自己的配置。</p>
<blockquote><p>不要将私密配置信息提交到 github。</p></blockquote>
</blockquote>
<h2 id="articleHeader10">参考链接</h2>
<ul>
<li><p><a href="http://www.cnblogs.com/ihardcoder/p/6279602.html" rel="nofollow noreferrer" target="_blank">《微信小程序七日谈》- 第五天：你可能要在登录功能上花费大力气</a></p></li>
<li><p><a href="https://mp.weixin.qq.com/s?__biz=MzAwNjI5MjAzNw==&amp;mid=2655752020&amp;idx=1&amp;sn=b5e56989a57e9b8067eb6614381a04fd&amp;chksm=80b0b87eb7c73168d7eb1d7f1a95e759b9b0934318571de4f6d2455402e654e6c09d9b022f25" rel="nofollow noreferrer" target="_blank">理解JWT（JSON Web Token）认证及实践</a></p></li>
<li><p><a href="http://blog.gusibi.com/post/weixin-python-login/" rel="nofollow noreferrer" target="_blank">网站微信登录－python 实现</a></p></li>
</ul>
<hr>
<p>最后，感谢女朋友支持。</p>
<table>
<thead><tr>
<th>欢迎关注(April_Louisa)</th>
<th>请我喝芬达</th>
</tr></thead>
<tbody><tr>
<td><span class="img-wrap"><img data-src="/img/remote/1460000009873993?w=430&amp;h=430" src="https://static.alili.tech/img/remote/1460000009873993?w=430&amp;h=430" alt="欢迎关注" title="欢迎关注" style="cursor: pointer; display: inline;"></span></td>
<td><span class="img-wrap"><img data-src="/img/remote/1460000009873994?w=425&amp;h=425" src="https://static.alili.tech/img/remote/1460000009873994?w=425&amp;h=425" alt="请我喝芬达" title="请我喝芬达" style="cursor: pointer; display: inline;"></span></td>
</tr></tbody>
</table>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
微信小程序开发：python+sanic 实现小程序登录注册

## 原文链接
[https://segmentfault.com/a/1190000010414722](https://segmentfault.com/a/1190000010414722)

