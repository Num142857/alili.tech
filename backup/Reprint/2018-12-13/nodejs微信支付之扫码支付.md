---
title: 'nodejs微信支付之扫码支付' 
date: 2018-12-13 2:30:07
hidden: true
slug: 9bd0m4mlh69
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">前言</h1>
<p>本篇文章主要是记录本人在微信扫码支付过程中所遇到的问题，给大家一个借鉴作用，希望对你们有帮助</p>
<h2 id="articleHeader1">开发环境</h2>
<ul>
<li>nodejs <code>v8.1.0</code>
</li>
<li>egg <code>v1.1.0</code>
</li>
</ul>
<h2 id="articleHeader2">准备工作</h2>
<ul>
<li>微信公众号-appid</li>
<li>微信商户号-mch_id</li>
<li>key值(签名算法所需,其实就是一个32位的密码，可以用md5生成一个)(key设置路径：微信商户平台(pay.weixin.qq.com)--&gt;账户设置--&gt;API安全--&gt;密钥设置)</li>
</ul>
<h2 id="articleHeader3">扫码支付-统一下单</h2>
<p>以下才用的是微信模式二，因为比较简单</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    let MD5 = require('md5'),
        xml2js = require('xml2js'),
        url = &quot;https://api.mch.weixin.qq.com/pay/unifiedorder&quot;,// 下单请求地址
        appid = '公众号id',
        mch_id = '微信商户号'；
        notify_url = '回调地址',
        out_trade_no = '自己设置的订单号',// 微信会有自己订单号、我们自己的系统需要设置自己的订单号
        total_fee = '订单金额',// 注意，单位为分
        body = '商品简单描述', 
        trade_type = 'NATIVE',// 交易类型，JSAPI--公众号支付、NATIVE--原生扫码支付、APP--app支付
        nonce_str = moment().format('YYYYMMDDHHmmssSSS'),// 随机字符串32位以下
        stringA = `appid=${公众号id}&amp;body=${body}&amp;mch_id=${微信商户号}&amp;nonce_str=${nonce_str}&amp;notify_url=${
        notify_url}&amp;out_trade_no=${out_trade_no}&amp;spbill_create_ip=${ctx.request.ip}&amp;total_fee=${total_fee}&amp;trade_type=${trade_type}`,
        stringSignTemp = stringA + &quot;&amp;key=xxxxxxxxxxxxxxxxx&quot;, //注：key为商户平台设置的密钥key
        sign = MD5(stringSignTemp).toUpperCase();  //注：MD5签名方式
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">    <span class="hljs-keyword">let</span> MD5 = <span class="hljs-built_in">require</span>(<span class="hljs-string">'md5'</span>),
        xml2js = <span class="hljs-built_in">require</span>(<span class="hljs-string">'xml2js'</span>),
        url = <span class="hljs-string">"https://api.mch.weixin.qq.com/pay/unifiedorder"</span>,<span class="hljs-comment">// 下单请求地址</span>
        appid = <span class="hljs-string">'公众号id'</span>,
        mch_id = <span class="hljs-string">'微信商户号'</span>；
        notify_url = <span class="hljs-string">'回调地址'</span>,
        out_trade_no = <span class="hljs-string">'自己设置的订单号'</span>,<span class="hljs-comment">// 微信会有自己订单号、我们自己的系统需要设置自己的订单号</span>
        total_fee = <span class="hljs-string">'订单金额'</span>,<span class="hljs-comment">// 注意，单位为分</span>
        body = <span class="hljs-string">'商品简单描述'</span>, 
        trade_type = <span class="hljs-string">'NATIVE'</span>,<span class="hljs-comment">// 交易类型，JSAPI--公众号支付、NATIVE--原生扫码支付、APP--app支付</span>
        nonce_str = moment().format(<span class="hljs-string">'YYYYMMDDHHmmssSSS'</span>),<span class="hljs-comment">// 随机字符串32位以下</span>
        stringA = <span class="hljs-string">`appid=<span class="hljs-subst">${公众号id}</span>&amp;body=<span class="hljs-subst">${body}</span>&amp;mch_id=<span class="hljs-subst">${微信商户号}</span>&amp;nonce_str=<span class="hljs-subst">${nonce_str}</span>&amp;notify_url=<span class="hljs-subst">${
        notify_url}</span>&amp;out_trade_no=<span class="hljs-subst">${out_trade_no}</span>&amp;spbill_create_ip=<span class="hljs-subst">${ctx.request.ip}</span>&amp;total_fee=<span class="hljs-subst">${total_fee}</span>&amp;trade_type=<span class="hljs-subst">${trade_type}</span>`</span>,
        stringSignTemp = stringA + <span class="hljs-string">"&amp;key=xxxxxxxxxxxxxxxxx"</span>, <span class="hljs-comment">//注：key为商户平台设置的密钥key</span>
        sign = MD5(stringSignTemp).toUpperCase();  <span class="hljs-comment">//注：MD5签名方式</span>
    </code></pre>
<p>以上就是我们所需要的一些参数<br>签名生成算法见<a href="https://pay.weixin.qq.com/wiki/doc/api/native.php?chapter=4_3" rel="nofollow noreferrer" target="_blank">微信官方</a><br>spbill_create_ip 是 终端ip地址</p>
<p>下面把所有的参数拼接成xml</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    const formData = &quot;<xml>&quot;;
        formData += &quot;<appid>&quot; + appid + &quot;</appid>&quot;; //appid
        formData += &quot;<body>&quot; + body + &quot;</body>&quot;; //商品或支付单简要描述
        formData += &quot;<mch_id>&quot; + mch_id + &quot;</mch_id>&quot;; //商户号
        formData += &quot;<nonce_str>&quot; + nonce_str + &quot;</nonce_str>&quot;; //随机字符串，不长于32位
        formData += &quot;<notify_url>&quot; + notify_url + &quot;</notify_url>&quot;; //支付成功后微信服务器通过POST请求通知这个地址
        formData += &quot;<out_trade_no>&quot; + out_trade_no + &quot;</out_trade_no>&quot;; //订单号
        formData += &quot;<total_fee>&quot; + total_fee + &quot;</total_fee>&quot;; //金额
        formData += &quot;<spbill_create_ip>&quot; + ctx.request.ip + &quot;</spbill_create_ip>&quot;; //ip
        formData += &quot;<trade_type>NATIVE</trade_type>&quot;; //NATIVE会返回code_url ，JSAPI不会返回
        formData += &quot;<sign>&quot; + sign + &quot;</sign>&quot;;
        formData += &quot;</xml>&quot;;
    // 这里使用了egg里面请求的方式
    const resultData = yield ctx.curl(url, {
            method: 'POST',
            content: formData,
            headers: {
                'content-type': 'text/html',
            },
        });

    // xml转json格式
    xml2js.parseString(resultData.data, function (err, json) {
        if (err) {
            new Error(&quot;解析xml报错&quot;)
        } else {
            var result = formMessage(json.xml); // 转换成正常的json 数据
            console.log(result) //打印出返回的结果
        }
    })
    var formMessage = function (result) {
        var message = {};
        if (typeof result === 'object') {
            var keys = Object.keys(result);
            for (var i = 0; i < keys.length; i++) {
                var item = result[keys[i]];
                var key = keys[i];
                if (!(item instanceof Array) || item.length === 0) {
                    continue;
                }
                if (item.length === 1) {
                    var val = item[0];
                    if (typeof val === 'object') {
                        message[key] = formMessage(val);
                    } else {
                        message[key] = (val || '').trim();
                    }
                } else {
                    message[key] = [];
                    for (var j = 0, k = item.length; j < k; j++) {
                        message[key].push(formMessage(itemp[j]));
                    }
                }
            }
        }
        return message;
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">    <span class="hljs-keyword">const</span> formData = <span class="hljs-string">"&lt;xml&gt;"</span>;
        formData += <span class="hljs-string">"&lt;appid&gt;"</span> + appid + <span class="hljs-string">"&lt;/appid&gt;"</span>; <span class="hljs-comment">//appid</span>
        formData += <span class="hljs-string">"&lt;body&gt;"</span> + body + <span class="hljs-string">"&lt;/body&gt;"</span>; <span class="hljs-comment">//商品或支付单简要描述</span>
        formData += <span class="hljs-string">"&lt;mch_id&gt;"</span> + mch_id + <span class="hljs-string">"&lt;/mch_id&gt;"</span>; <span class="hljs-comment">//商户号</span>
        formData += <span class="hljs-string">"&lt;nonce_str&gt;"</span> + nonce_str + <span class="hljs-string">"&lt;/nonce_str&gt;"</span>; <span class="hljs-comment">//随机字符串，不长于32位</span>
        formData += <span class="hljs-string">"&lt;notify_url&gt;"</span> + notify_url + <span class="hljs-string">"&lt;/notify_url&gt;"</span>; <span class="hljs-comment">//支付成功后微信服务器通过POST请求通知这个地址</span>
        formData += <span class="hljs-string">"&lt;out_trade_no&gt;"</span> + out_trade_no + <span class="hljs-string">"&lt;/out_trade_no&gt;"</span>; <span class="hljs-comment">//订单号</span>
        formData += <span class="hljs-string">"&lt;total_fee&gt;"</span> + total_fee + <span class="hljs-string">"&lt;/total_fee&gt;"</span>; <span class="hljs-comment">//金额</span>
        formData += <span class="hljs-string">"&lt;spbill_create_ip&gt;"</span> + ctx.request.ip + <span class="hljs-string">"&lt;/spbill_create_ip&gt;"</span>; <span class="hljs-comment">//ip</span>
        formData += <span class="hljs-string">"&lt;trade_type&gt;NATIVE&lt;/trade_type&gt;"</span>; <span class="hljs-comment">//NATIVE会返回code_url ，JSAPI不会返回</span>
        formData += <span class="hljs-string">"&lt;sign&gt;"</span> + sign + <span class="hljs-string">"&lt;/sign&gt;"</span>;
        formData += <span class="hljs-string">"&lt;/xml&gt;"</span>;
    <span class="hljs-comment">// 这里使用了egg里面请求的方式</span>
    <span class="hljs-keyword">const</span> resultData = <span class="hljs-keyword">yield</span> ctx.curl(url, {
            <span class="hljs-attr">method</span>: <span class="hljs-string">'POST'</span>,
            <span class="hljs-attr">content</span>: formData,
            <span class="hljs-attr">headers</span>: {
                <span class="hljs-string">'content-type'</span>: <span class="hljs-string">'text/html'</span>,
            },
        });

    <span class="hljs-comment">// xml转json格式</span>
    xml2js.parseString(resultData.data, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err, json</span>) </span>{
        <span class="hljs-keyword">if</span> (err) {
            <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">"解析xml报错"</span>)
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">var</span> result = formMessage(json.xml); <span class="hljs-comment">// 转换成正常的json 数据</span>
            <span class="hljs-built_in">console</span>.log(result) <span class="hljs-comment">//打印出返回的结果</span>
        }
    })
    <span class="hljs-keyword">var</span> formMessage = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">result</span>) </span>{
        <span class="hljs-keyword">var</span> message = {};
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> result === <span class="hljs-string">'object'</span>) {
            <span class="hljs-keyword">var</span> keys = <span class="hljs-built_in">Object</span>.keys(result);
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; keys.length; i++) {
                <span class="hljs-keyword">var</span> item = result[keys[i]];
                <span class="hljs-keyword">var</span> key = keys[i];
                <span class="hljs-keyword">if</span> (!(item <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Array</span>) || item.length === <span class="hljs-number">0</span>) {
                    <span class="hljs-keyword">continue</span>;
                }
                <span class="hljs-keyword">if</span> (item.length === <span class="hljs-number">1</span>) {
                    <span class="hljs-keyword">var</span> val = item[<span class="hljs-number">0</span>];
                    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> val === <span class="hljs-string">'object'</span>) {
                        message[key] = formMessage(val);
                    } <span class="hljs-keyword">else</span> {
                        message[key] = (val || <span class="hljs-string">''</span>).trim();
                    }
                } <span class="hljs-keyword">else</span> {
                    message[key] = [];
                    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> j = <span class="hljs-number">0</span>, k = item.length; j &lt; k; j++) {
                        message[key].push(formMessage(itemp[j]));
                    }
                }
            }
        }
        <span class="hljs-keyword">return</span> message;
    }</code></pre>
<p>上面使用了egg的请求方式，原生node可以使用request</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var request = require('request');
    request({
        url: url,
        method: &quot;POST&quot;,
        body: formData
    }, function(error, response, body) {
        if (!error &amp;&amp; response.statusCode == 200) {
        }
    }); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">    <span class="hljs-keyword">var</span> request = <span class="hljs-built_in">require</span>(<span class="hljs-string">'request'</span>);
    request({
        <span class="hljs-attr">url</span>: url,
        <span class="hljs-attr">method</span>: <span class="hljs-string">"POST"</span>,
        <span class="hljs-attr">body</span>: formData
    }, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">error, response, body</span>) </span>{
        <span class="hljs-keyword">if</span> (!error &amp;&amp; response.statusCode == <span class="hljs-number">200</span>) {
        }
    }); </code></pre>
<p>如果请求成功会最终返回一个xml,然后我们进行解析成json的格式,里面会有一个<code>code_url</code>和<code>out_trade_no</code>,我们需要把这两个返回给前端，然后通过生成二维码展示给用户扫码，完成支付</p>
<h2 id="articleHeader4">监听支付是否成功</h2>
<p>上面操作完成之后，我们需要知道用户是否完成支付，因为用户会停留在该页面，我们需要在用户付完款之后，通知用户支付成功。<br>首先，用户发起支付的时候我们会生成二维码，让用户完成扫码支付，我们还要做的是，开一个定时器，每隔一段时间去发送一个请求，这个时候，我们node后台就需要写一个查询订单的接口，之前我们拿到了<code>out_trade_no</code>，也就是我们系统内部的订单号，我们把这个数据发送给后台查询订单的接口，然后后台接收到之后会请求微信的查询接口地址<code>https://api.mch.weixin.qq.com/pay/orderquery</code>,流程跟上面一样，只是接口地址和微信返回的xml不一样而已，返回的字段会有一个状态即<code>SUCCESS</code>和<code>NOTPAY</code>，我们可以通过判断是否支付返回给前端，成功之后提示给用户支付成功，关闭定时器。</p>
<h2 id="articleHeader5">回调地址</h2>
<p>这个是非常重要的一环，大部分的操作其实在上面就可以完成，但是有特殊的情况，比如用户电脑断网发送不了请求，但是手机付款了，这就会导致我们记录不到用户支付的信息。这个时候回调地址就很重要了</p>
<h3 id="articleHeader6">设置回调地址</h3>
<p>微信商户中心-&gt;产品中心-&gt;开发配置-&gt;扫码支付</p>
<p>之后我们需要做的是后端用<code>post</code>来接收微信发送的异步回调信息，也是<code>xml</code>的格式，这里注意，如果不支持接收xml，可能会得到空的数据<br>这里还需要注意的是，我们在保存用户支付信息的同时，得先查改订单是否支付，以免重复操作，可能会插入多条记录的情况</p>
<h2 id="articleHeader7">总结</h2>
<p>微信扫码支付坑还是有的，如果你是第一次摸索的话，下面罗列一下需要注意的地方</p>
<ol>
<li>签名算法要写正确，不然是不会成功的，要拼接正确才行</li>
<li>微信返回的是xml格式的数据，我们得通过插件转成json，这样才方便获取数据</li>
<li>返回的<code>code_url</code>要给前端生成二维码用，然后需要开一个定时器查询该订单是否完成支付，最终通知用户结果</li>
<li>回调地址很重要，我们后端需要<code>post</code>接收微信返回的回调信息，然后保存信息，不过在保存用户支付信息的之前，我们得知道该订单是否已经保存过，以免重复添加。还有就是返回的是xml的数据，后端一定要保证能够接收得到，按照正常的方式是接收不了的，得额外设置。</li>
</ol>
<p>文章地址 <a href="http://www.wclimb.site/2018/02/14/nodejs%E5%BE%AE%E4%BF%A1%E6%94%AF%E4%BB%98%E4%B9%8B%E6%89%AB%E7%A0%81%E6%94%AF%E4%BB%98/" rel="nofollow noreferrer" target="_blank">nodejs微信支付之扫码支付</a><br>个人博客地址 <a href="http://www.wclimb.site" rel="nofollow noreferrer" target="_blank">http://www.wclimb.site</a><br>GitHub地址 <a href="https://github.com/wclimb" rel="nofollow noreferrer" target="_blank">wclimb</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
nodejs微信支付之扫码支付

## 原文链接
[https://segmentfault.com/a/1190000013293668](https://segmentfault.com/a/1190000013293668)

