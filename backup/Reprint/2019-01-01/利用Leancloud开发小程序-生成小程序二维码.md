---
title: '利用Leancloud开发小程序-生成小程序二维码' 
date: 2019-01-01 2:30:07
hidden: true
slug: vv8rupk8in
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">什么是Leancloud</h2>
<ul>
<li><p>Leancloud是国内有名的BaaS提供商，什么是BaaS提供商呢？通俗点讲就是给你提供增删改查等后台服务的API，你通过这些API就可以将数据存储在云端数据库中，而不需要关系服务器环境和里面的处理逻辑，它提供的SDK有js、java、object-c、python等等。</p></li>
<li><p>类似的BaaS提供商还有谷歌的firebase（www.firebase.com），但容易被墙不推荐。</p></li>
<li><p>所以我们可以不需要自己搭建后台环境就可以实现小程序的后端需要了，这样可以极高的提高开发效率，缩短开发周期。</p></li>
</ul>
<h2 id="articleHeader1">如何使用Leancloud进行小程序开发</h2>
<h4>关于增删改查</h4>
<p>Leancloud提供了完整的增删改查API，只要根据文档给到API进行调用就行，这个就不详细描述了，请看文档：<a href="https://leancloud.cn/docs/leanstorage_guide-js.html" rel="nofollow noreferrer" target="_blank">https://leancloud.cn/docs/lea...</a></p>
<h4>关于小程序授权登陆</h4>
<p>下面地址详情描述了如何实现授权登陆：<br><a href="https://leancloud.cn/docs/weapp.html#" rel="nofollow noreferrer" target="_blank">https://leancloud.cn/docs/wea...</a>用户系统</p>
<h4>关于小程序需要后端的API调用</h4>
<p>这里所说的需要后台的API调用，指类似：微信支付、二维码生成、微信提现、微信发红包、发送模版信息等等。<br>要实现这些功能必须使用 Leancloud的<strong>云引擎</strong>中的<strong>云函数</strong>。</p>
<h2 id="articleHeader2">什么是云函数</h2>
<p>就是我们可以简单的编写一个可以执行的node函数部署到leancloude的云引擎中，直接使用leancloud的API就可以直接执行你编写的函数，不需要像以前编写后端需要关心后端服务器环境那么复杂，只需要执行一段指令将云函数部署到云端就可以执行了。<br>详情请看：<a href="https://leancloud.cn/docs/leanengine_overview.html" rel="nofollow noreferrer" target="_blank">https://leancloud.cn/docs/lea...</a></p>
<h2 id="articleHeader3">如何编写云函数</h2>
<p><a href="https://leancloud.cn/docs/leanengine_cloudfunction_guide-node.html" rel="nofollow noreferrer" target="_blank">https://leancloud.cn/docs/lea...</a><br>这里有详细说明，我就不赘述了。</p>
<h2 id="articleHeader4">如何部署云函数</h2>
<p>我们这里介绍如何使用github部署：</p>
<ol>
<li><p>注册并创建leancloud应用：这个就不用说把，网站：<a href="https://leancloud.cn" rel="nofollow noreferrer" target="_blank">https://leancloud.cn</a></p></li>
<li><p>设置云引擎<br>进入第一步创建的应用-云引擎-设置，将git的地址填进去，这个代码库可以fork我的代码仓库（<a href="https://github.com/jasondu/leancloud-wxa" rel="nofollow noreferrer" target="_blank">https://github.com/jasondu/le...</a>），然后复制<strong>Deploy Key</strong>，然后到自己fork的github设置页面中的【Deploy keys】选项，添加一个Deploy Keys，Title随便写，Key就是刚才复制的，然后点击保存即可。</p></li>
<li><p>部署云引擎<br>回到云引擎-部署，“分支或版本号”填入master，点击部署就可以部署云引擎了。</p></li>
</ol>
<blockquote><p>下面我们通过“生成小程序二维码”来讲解如何使用云函数开发小程序后台</p></blockquote>
<h2 id="articleHeader5">生成小程序二维码</h2>
<h4>小程序二维码分类：</h4>
<h5>从类型分类：</h5>
<ul>
<li><p>小程序二维码：那个圆形的二维码</p></li>
<li><p>普通二维码</p></li>
</ul>
<h5>是否可以无限生成分类：</h5>
<ul>
<li><p>无限</p></li>
<li><p>有限</p></li>
</ul>
<h5>这几种分类对应着下面三个接口：</h5>
<ul>
<li><p>小程序二维码、有限的<br><code>https://api.weixin.qq.com/wxa/getwxacode?access_token=ACCESS_TOKEN</code></p></li>
<li><p>小程序二维码、无限的<br><code>https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=ACCESS_TOKEN</code></p></li>
<li><p>普通二维码、有限的<br><code>https://api.weixin.qq.com/cgi-bin/wxaapp/createwxaqrcode?access_token=ACCESS_TOKEN</code></p></li>
</ul>
<h4>云函数规划</h4>
<ol>
<li><p>入参验证</p></li>
<li><p>获取accessToken</p></li>
<li><p>调用二维码生成接口获取二维码二进制流</p></li>
<li><p>保存二维码到leancloud</p></li>
</ol>
<h4>代码</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="AV.Cloud.define('getwxacode', function (request, response) {
    const params = request.params;
    const requireParams = ['type'];
    let url;

    switch (params.type) {
        case 1:
            url = 'https://api.weixin.qq.com/wxa/getwxacode';
            requireParams.push('path');
            break;
        case 2:
            url = 'https://api.weixin.qq.com/wxa/getwxacodeunlimit';
            requireParams.push('page');
            requireParams.push('scene');
            break;
        case 3:
            url = 'https://api.weixin.qq.com/cgi-bin/wxaapp/createwxaqrcode';
            requireParams.push('path');
            break;
    }
    // 1. 入参验证
    requireValidate(params, requireParams).then(params => {
        // 2. 获取accessToken
        wxapi.getLatestToken((err, accessToken) => {
            // 3. 调用二维码生成接口获取二维码二进制流
            axios.post(url, params, {
                params: {
                    access_token: accessToken.accessToken,
                    dataType: 'JSON',
                },
                responseType: 'arraybuffer'
            }).then((res) => {
                // 4. 保存二维码到leancloud
                if (typeof res.data === 'undefined') {
                    return response.error('生成二维码失败');
                } else {
                    const imageFile = new AV.File('file-qrcode.png', res.data);
                    imageFile.save().then((res) => {
                        return response.success(res);
                    }, (error) => {
                        return response.error(err);
                    });
                }
            });
        });
    }).catch(err => {
        return response.error(err);
    });
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code>AV.Cloud.define(<span class="hljs-string">'getwxacode'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">request, response</span>) </span>{
    <span class="hljs-keyword">const</span> params = request.params;
    <span class="hljs-keyword">const</span> requireParams = [<span class="hljs-string">'type'</span>];
    <span class="hljs-keyword">let</span> url;

    <span class="hljs-keyword">switch</span> (params.type) {
        <span class="hljs-keyword">case</span> <span class="hljs-number">1</span>:
            url = <span class="hljs-string">'https://api.weixin.qq.com/wxa/getwxacode'</span>;
            requireParams.push(<span class="hljs-string">'path'</span>);
            <span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-number">2</span>:
            url = <span class="hljs-string">'https://api.weixin.qq.com/wxa/getwxacodeunlimit'</span>;
            requireParams.push(<span class="hljs-string">'page'</span>);
            requireParams.push(<span class="hljs-string">'scene'</span>);
            <span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-number">3</span>:
            url = <span class="hljs-string">'https://api.weixin.qq.com/cgi-bin/wxaapp/createwxaqrcode'</span>;
            requireParams.push(<span class="hljs-string">'path'</span>);
            <span class="hljs-keyword">break</span>;
    }
    <span class="hljs-comment">// 1. 入参验证</span>
    requireValidate(params, requireParams).then(<span class="hljs-function"><span class="hljs-params">params</span> =&gt;</span> {
        <span class="hljs-comment">// 2. 获取accessToken</span>
        wxapi.getLatestToken(<span class="hljs-function">(<span class="hljs-params">err, accessToken</span>) =&gt;</span> {
            <span class="hljs-comment">// 3. 调用二维码生成接口获取二维码二进制流</span>
            axios.post(url, params, {
                params: {
                    access_token: accessToken.accessToken,
                    dataType: <span class="hljs-string">'JSON'</span>,
                },
                responseType: <span class="hljs-string">'arraybuffer'</span>
            }).then(<span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> {
                <span class="hljs-comment">// 4. 保存二维码到leancloud</span>
                <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> res.data === <span class="hljs-string">'undefined'</span>) {
                    <span class="hljs-keyword">return</span> response.error(<span class="hljs-string">'生成二维码失败'</span>);
                } <span class="hljs-keyword">else</span> {
                    <span class="hljs-keyword">const</span> imageFile = <span class="hljs-keyword">new</span> AV.File(<span class="hljs-string">'file-qrcode.png'</span>, res.data);
                    imageFile.save().then(<span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> {
                        <span class="hljs-keyword">return</span> response.success(res);
                    }, <span class="hljs-function">(<span class="hljs-params">error</span>) =&gt;</span> {
                        <span class="hljs-keyword">return</span> response.error(err);
                    });
                }
            });
        });
    }).catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
        <span class="hljs-keyword">return</span> response.error(err);
    });
})</code></pre>
<blockquote><p>requireValidate： 验证入参的方法<br><strong>注意：</strong>这里获取二维码必须要用axios的方式进行请求，否则返回的图片信息会保存失败</p></blockquote>
<h4>调用云函数（小程序代码）</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const AV = require('../libs/leancloud/av-weapp-min.js');
const paramsJson = {
    type: 1,
    path: '/pages/index/index'
};
AV.Cloud.run('getwxacode', paramsJson).then(function (data) {
    // 调用成功，得到生成二维码的链接
    console.log(data.url);
}, function (err) {
    // 处理调用失败
    console.log(err);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> AV = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../libs/leancloud/av-weapp-min.js'</span>);
<span class="hljs-keyword">const</span> paramsJson = {
    <span class="hljs-attr">type</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">path</span>: <span class="hljs-string">'/pages/index/index'</span>
};
AV.Cloud.run(<span class="hljs-string">'getwxacode'</span>, paramsJson).then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">data</span>) </span>{
    <span class="hljs-comment">// 调用成功，得到生成二维码的链接</span>
    <span class="hljs-built_in">console</span>.log(data.url);
}, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err</span>) </span>{
    <span class="hljs-comment">// 处理调用失败</span>
    <span class="hljs-built_in">console</span>.log(err);
});</code></pre>
<h4>代码地址</h4>
<p><a href="https://github.com/jasondu/leancloud-wxa" rel="nofollow noreferrer" target="_blank">https://github.com/jasondu/le...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
利用Leancloud开发小程序-生成小程序二维码

## 原文链接
[https://segmentfault.com/a/1190000011029245](https://segmentfault.com/a/1190000011029245)

