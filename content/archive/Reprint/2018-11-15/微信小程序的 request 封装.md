---
title: '微信小程序的 request 封装' 
date: 2018-11-15 21:20:48
hidden: true
slug: abnrb89y5fp
categories: [reprint]
---

{{< raw >}}
<h1>&#x80CC;&#x666F;</h1><p>&#x4E4B;&#x524D;&#x5C0F;&#x7A0B;&#x5E8F;&#x4EE3;&#x7801;&#x6DF7;&#x4E71;&#xFF0C;&#x6240;&#x4EE5;&#x65B0;&#x9879;&#x76EE;&#x4E00;&#x5F00;&#x59CB;&#x5C31;&#x51C6;&#x5907;&#x5F04;&#x4E2A;&#x5FAE;&#x4FE1;&#x5C0F;&#x7A0B;&#x5E8F;&#x7684; request &#x7684;&#x5C01;&#x88C5;</p><h1>&#x6D41;&#x7A0B;</h1><p>&#x5148;&#x6765;&#x8BF4;&#x8BF4;&#x6574;&#x4E2A;&#x6D41;&#x7A0B;&#xFF1A;</p><ol><li>appjs &#x91CC;&#x9762;&#x5DF2;&#x8FDB;&#x5165;&#x5C31;&#x53BB;&#x83B7;&#x53D6;&#x7528;&#x6237;&#x4FE1;&#x606F;&#xFF0C;&#x5982;&#x679C;&#x6CA1;&#x6709;&#x767B;&#x5F55;&#x5219;&#x9ED8;&#x8BA4;&#x767B;&#x5F55;&#xFF0C;&#x8FD9;&#x91CC;&#x4E0D;&#x505A;&#x9519;&#x8BEF;&#x5904;&#x7406;</li><li>&#x7528;&#x6237;&#x5FC5;&#x987B;&#x540C;&#x610F;&#x6388;&#x6743;&#x624D;&#x80FD;&#x8FDB;&#x884C;&#x64CD;&#x4F5C;&#xFF0C;&#x5982;&#x679C;&#x4E0D;&#x540C;&#x610F;&#x6388;&#x6743;&#x5219;&#x4F1A;&#x4E00;&#x76F4;&#x8DF3;&#x8F6C;&#x5230;&#x6388;&#x6743;&#x9875;&#x9762;</li><li>&#x5728;&#x6388;&#x6743;&#x9875;&#x9762;&#x70B9;&#x51FB;&#x6388;&#x6743;&#x767B;&#x5F55;&#x540E;&#xFF0C;&#x8C03;&#x7528;&#x767B;&#x5F55;&#x63A5;&#x53E3;&#xFF0C;&#x6210;&#x529F;&#x540E;&#x8FD4;&#x56DE;&#x8C03;&#x8D77;&#x6388;&#x6743;&#x7684;&#x9875;&#x9762;&#xFF0C;</li></ol><h1>app.js</h1><p>onLaunch &#x91CC;&#x9762;&#x83B7;&#x53D6;&#x7528;&#x6237;&#x4FE1;&#x606F;</p><pre><code>appSelf = this;
        // &#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x7B2C;&#x4E00;&#x6B21;&#x8FDB;&#x5165;&#xFF0C;&#x83B7;&#x53D6;&#x7528;&#x6237;&#x4FE1;&#x606F;&#xFF0C;&#x4E0D;&#x505A;&#x4EFB;&#x4F55;&#x9519;&#x8BEF;&#x5904;&#x7406;
        userInfo().then( (res)=&gt;{
            console.log(res);// &#x6253;&#x5370;&#x7ED3;&#x679C;
            if (!res.code) {
                appSelf.globalData.userInfo = res
            }
        }).catch( (errMsg)=&gt;{
            console.log(errMsg);// &#x9519;&#x8BEF;&#x63D0;&#x793A;&#x4FE1;&#x606F;
        });
</code></pre><h1>httpUtils.js</h1><h2>request &#x7684;&#x5C01;&#x88C5;</h2><pre><code>const request = function (path, method, data, header) {
    let user_id = &quot;&quot;;
    let token = &quot;&quot;;
    try {
        user_id = wx.getStorageSync(USER_ID_KEY);
        token = wx.getStorageSync(TOKEN_KEY);
    } catch (e) {}
    header = header || {};
    let cookie = [];
    cookie.push(&quot;USERID=&quot; + user_id);
    cookie.push(&quot;TOKEN=&quot; + token);
    cookie.push(&quot;device=&quot; + 1);
    cookie.push(&quot;app_name=&quot; + 1);
    cookie.push(&quot;app_version=&quot; + ENV_VERSION);
    cookie.push(&quot;channel=&quot; + 1);
    header.cookie = cookie.join(&quot;; &quot;);
    return new Promise((resolve, reject) =&gt; {
        wx.request({//&#x540E;&#x53F0;&#x8BF7;&#x6C42;
            url: API_BASE_URL + path,
            header: header,
            method: method,
            data: data,
            success: function (res) {
                if (res.statusCode !== 200) {
                    reject(res.data)
                } else {
                    if (res.data.code === 20006) {
                        login().then( (res)=&gt;{
                            resolve(res)
                        }).catch( (errMsg)=&gt;{
                            reject(errMsg);
                        })
                    }
                    resolve(res.data)
                }
            },
            fail: function (res) {
                reject(&quot;not data&quot;);
            }
        });
    });
}</code></pre><h2>login</h2><pre><code>const login = function () {
    try {
        wx.removeStorageSync(USER_ID_KEY)
        wx.removeStorageSync(TOKEN_KEY)
    } catch (e) {}
    return new Promise((resolve, reject) =&gt; {
        wx.login({
            success: res =&gt; {
                let code = res.code;
                // &#x5DF2;&#x7ECF;&#x6388;&#x6743;&#xFF0C;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x8C03;&#x7528; getUserInfo &#x83B7;&#x53D6;&#x5934;&#x50CF;&#x6635;&#x79F0;&#xFF0C;&#x4E0D;&#x4F1A;&#x5F39;&#x6846;
                wx.getUserInfo({
                    withCredentials: true,
                    success: res =&gt; {
                        let userInfo = res.userInfo;
                        let name = userInfo.nickName;
                        let avatar = userInfo.avatarUrl;
                        let sex = userInfo.gender;
                        let data = {
                            code: code,
                            encryptedData: res.encryptedData,
                            iv: res.iv,
                            name: name,
                            avatar: avatar,
                            sex: sex,
                            from: FROM,
                        };
                        request(&quot;/api/user/login/byWeChatApplet&quot;, &quot;POST&quot;, data).then( (res)=&gt;{
                            if (!res.code) {
                                try {
                                    wx.setStorageSync(USER_ID_KEY, res.user_id);
                                    wx.setStorageSync(TOKEN_KEY, res.token)
                                } catch (e) {
                                    reject(JSON.stringify(e));
                                }
                            }
                            resolve(res)
                        }).catch( (errMsg)=&gt;{
                            reject(errMsg)
                        });
                    },
                    fail: function (res) {
                        console.log(res);

                        if (res.errMsg &amp;&amp; res.errMsg.startsWith(&quot;getUserInfo:fail&quot;) &amp;&amp; res.errMsg.search(&quot;unauthorized&quot;) != -1) {
                            // &#x8DF3;&#x8F6C;&#x6388;&#x6743;&#x9875;&#x9762;
                            wx.navigateTo({
                                url: &apos;/pages/auth/auth&apos;
                            })
                            return;
                        }
                        wx.getSetting({
                            success: (res) =&gt; {
                                if (!res.authSetting[&quot;scope.userInfo&quot;]) {
                                    // &#x8DF3;&#x8F6C;&#x6388;&#x6743;&#x9875;&#x9762;
                                    wx.navigateTo({
                                        url: &apos;/pages/auth/auth&apos;
                                    })
                                }
                            }
                        });
                    }
                })
            }
        })
    });
};</code></pre><h1>auth.js</h1><p>&#x6388;&#x6743;&#x9875;&#x9762; js</p><pre><code>Page({
    data: {
    },
    onLoad: function () {
        self = this;
    },

    auth: function (e) {
        console.log(app.globalData.userInfo);
        if (e.detail.userInfo) {
            login().then( (res)=&gt;{
                console.log(res);// &#x6253;&#x5370;&#x7ED3;&#x679C;
                if (res.code) {
                    // &#x63A5;&#x53E3;&#x9519;&#x8BEF;
                    return
                }
                // &#x8DF3;&#x8F6C;&#x56DE;&#x4E0A;&#x4E00;&#x4E2A;&#x9875;&#x9762;
                wx.navigateBack()
            }).catch( (errMsg)=&gt;{
                console.log(errMsg);// &#x9519;&#x8BEF;&#x63D0;&#x793A;&#x4FE1;&#x606F;
            });
        }
    },

});</code></pre><h1>&#x9879;&#x76EE;&#x5730;&#x5740;</h1><p><a href="https://github.com/lmxdawn/wxa-demo" rel="nofollow noreferrer">https://github.com/lmxdawn/wx...</a></p><p>&#x4E00;&#x4E2A; vue + thinkphp5.1 &#x642D;&#x5EFA;&#x7684;&#x540E;&#x53F0;&#x7BA1;&#x7406;&#xFF1A;<a href="https://github.com/lmxdawn/vue-admin-html" rel="nofollow noreferrer">https://github.com/lmxdawn/vu...</a></p><p>&#x6F14;&#x793A;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbfLAU?w=311&amp;h=508" src="https://static.alili.tech/img/bVbfLAU?w=311&amp;h=508" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;"></span></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
微信小程序的 request 封装

## 原文链接
[https://segmentfault.com/a/1190000016074601](https://segmentfault.com/a/1190000016074601)

