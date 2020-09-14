---
title: 'Just for fun——写个爬虫抓取whois信息' 
date: 2018-12-28 2:30:11
hidden: true
slug: 6ahsq26dczs
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">目标对象和过程</h1>
<p>爬取的网站是<a href="https://www.west.cn" rel="nofollow noreferrer" target="_blank">西部数码</a>，该网站在<a href="https://www.west.cn/web/whois/whoisinfo?domain=51lucy.com" rel="nofollow noreferrer" target="_blank">https://www.west.cn/web/whois...</a>可以查询whois信息，通过chrome调试知道，数据是从接口：<a href="https://www.west.cn/web/whois/whoisinfo?domain=51lucy.com&amp;server=&amp;refresh=0" rel="nofollow noreferrer" target="_blank">https://www.west.cn/web/whois...</a>中获取的</p>
<p><span class="img-wrap"><img data-src="/img/bVWEaM?w=920&amp;h=723" src="https://static.alili.tech/img/bVWEaM?w=920&amp;h=723" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVWEaQ?w=1195&amp;h=445" src="https://static.alili.tech/img/bVWEaQ?w=1195&amp;h=445" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">cookie</h2>
<p>分析该请求发现，<strong>qtoken2016</strong>这个key是最为重要（反爬虫的标记，我之前写的时候，还是qtoken），这个token的生成不在本页，而在<a href="https://www.west.cn/main/whois.asp" rel="nofollow noreferrer" target="_blank">https://www.west.cn/main/whoi...</a>这一页点击查看whois的时候，发送请求：<a href="https://www.west.cn/services/domain/whoisinfo.asp?act=gettok&amp;_=1507974083967" rel="nofollow noreferrer" target="_blank">https://www.west.cn/services/...</a>来生成新的token，得到的结果是混淆的js代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var l=[119,98,115,33,117,116,101,112,98,62,92,50,50,54,45,50,49,50,45,50,50,52,45,50,50,49,45,50,50,55,45,50,51,51,45,50,49,58,45,50,50,54,45,50,50,52,45,50,49,55,45,50,50,54,45,50,49,50,45,50,50,51,45,50,50,54,45,50,50,52,45,50,50,51,45,50,51,51,45,50,50,51,45,50,50,58,45,50,49,55,45,50,50,55,45,50,49,50,94,60,119,98,115,33,101,99,105,107,114,62,92,57,45,53,45,50,56,45,50,49,45,50,50,45,50,57,45,58,45,50,51,45,51,49,45,50,54,45,49,45,50,52,45,55,45,54,45,50,55,45,51,50,45,52,45,50,58,45,50,53,45,50,45,56,45,51,94,60,119,98,115,33,99,62,35,35,60,103,112,115,33,41,100,62,49,60,100,61,101,99,105,107,114,47,109,102,111,104,117,105,60,100,44,44,42,124,99,44,62,84,117,115,106,111,104,47,103,115,112,110,68,105,98,115,68,112,101,102,41,117,116,101,112,98,92,101,99,105,107,114,92,100,94,94,42,126,60,37,47,100,112,112,108,106,102,41,40,114,117,112,108,102,111,51,49,50,55,40,45,99,45,124,113,98,117,105,59,40,48,40,126,42,60];eval(function(p,a,c,k,e,d){e=function(c){return(c<a?&quot;&quot;:e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('6 3=\'\';7(2=0;2<4.5;2++){3+=8.a(4[2]-1)};9(3)',11,11,'||i|t|l|length|var|for|String|eval|fromCharCode'.split('|'),0,{}))
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dns"><code>var l=[<span class="hljs-number">119,98,115,33</span>,<span class="hljs-number">117,116,101,112</span>,<span class="hljs-number">98,62,92,50</span>,<span class="hljs-number">50,54,45,50</span>,<span class="hljs-number">49,50,45,50</span>,<span class="hljs-number">50,52,45,50</span>,<span class="hljs-number">50,49,45,50</span>,<span class="hljs-number">50,55,45,50</span>,<span class="hljs-number">51,51,45,50</span>,<span class="hljs-number">49,58,45,50</span>,<span class="hljs-number">50,54,45,50</span>,<span class="hljs-number">50,52,45,50</span>,<span class="hljs-number">49,55,45,50</span>,<span class="hljs-number">50,54,45,50</span>,<span class="hljs-number">49,50,45,50</span>,<span class="hljs-number">50,51,45,50</span>,<span class="hljs-number">50,54,45,50</span>,<span class="hljs-number">50,52,45,50</span>,<span class="hljs-number">50,51,45,50</span>,<span class="hljs-number">51,51,45,50</span>,<span class="hljs-number">50,51,45,50</span>,<span class="hljs-number">50,58,45,50</span>,<span class="hljs-number">49,55,45,50</span>,<span class="hljs-number">50,55,45,50</span>,<span class="hljs-number">49,50,94,60</span>,<span class="hljs-number">119,98,115,33</span>,<span class="hljs-number">101,99,105,107</span>,<span class="hljs-number">114,62,92,57</span>,<span class="hljs-number">45,53,45,50</span>,<span class="hljs-number">56,45,50,49</span>,<span class="hljs-number">45,50,50,45</span>,<span class="hljs-number">50,57,45,58</span>,<span class="hljs-number">45,50,51,45</span>,<span class="hljs-number">51,49,45,50</span>,<span class="hljs-number">54,45,49,45</span>,<span class="hljs-number">50,52,45,55</span>,<span class="hljs-number">45,54,45,50</span>,<span class="hljs-number">55,45,51,50</span>,<span class="hljs-number">45,52,45,50</span>,<span class="hljs-number">58,45,50,53</span>,<span class="hljs-number">45,50,45,56</span>,<span class="hljs-number">45,51,94,60</span>,<span class="hljs-number">119,98,115,33</span>,<span class="hljs-number">99,62,35,35</span>,<span class="hljs-number">60,103,112,115</span>,<span class="hljs-number">33,41,100,62</span>,<span class="hljs-number">49,60,100,61</span>,<span class="hljs-number">101,99,105,107</span>,<span class="hljs-number">114,47,109,102</span>,<span class="hljs-number">111,104,117,105</span>,<span class="hljs-number">60,100,44,44</span>,<span class="hljs-number">42,124,99,44</span>,<span class="hljs-number">62,84,117,115</span>,<span class="hljs-number">106,111,104,47</span>,<span class="hljs-number">103,115,112,110</span>,<span class="hljs-number">68,105,98,115</span>,<span class="hljs-number">68,112,101,102</span>,<span class="hljs-number">41,117,116,101</span>,<span class="hljs-number">112,98,92,101</span>,<span class="hljs-number">99,105,107,114</span>,<span class="hljs-number">92,100,94,94</span>,<span class="hljs-number">42,126,60,37</span>,<span class="hljs-number">47,100,112,112</span>,<span class="hljs-number">108,106,102,41</span>,<span class="hljs-number">40,114,117,112</span>,<span class="hljs-number">108,102,111,51</span>,<span class="hljs-number">49,50,55,40</span>,<span class="hljs-number">45,99,45,124</span>,<span class="hljs-number">113,98,117,105</span>,<span class="hljs-number">59,40,48,40</span>,<span class="hljs-number">126,42,60</span>]<span class="hljs-comment">;eval(function(p,a,c,k,e,d){e=function(c){return(c&lt;a?"":e(parseInt(c/a)))+((c=c%a)&gt;35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('6 3=\'\';7(2=0;2&lt;4.5;2++){3+=8.a(4[2]-1)};9(3)',11,11,'||i|t|l|length|var|for|String|eval|fromCharCode'.split('|'),0,{}))</span>
</code></pre>
<p>对于这一点，用js的eval函数模拟一下就可以解决。</p>
<p><span class="img-wrap"><img data-src="/img/bVWEa6?w=2041&amp;h=1013" src="https://static.alili.tech/img/bVWEa6?w=2041&amp;h=1013" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader2">代码</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * Created by salamander on 2016/11/8.
 */
let request = require('request');
let Q = require('q');
let datetime = require('locutus/php/datetime');

let getTokenUrl = 'http://www.west.cn/main/whois.asp?act=gettok&amp;_=';
let whoisUrl = 'http://www.west.cn/web/whois/whoisinfo?domain=';
// 需要的字段
let needFields = ['domain', 'registrar', 'country', 'mail', 'whoisinfo', 'add_time', 'registrant_name', 'expire_date'];

// 模仿jquery
let jQuery, $;
$ = jQuery = {
    token: ''
};

jQuery.cookie =  function(name, value, options) {
    this.token = value;
};

/**
 * 获取西部数码whois信息
 * @param domain 域名
 * @param proxy 代理
 */
function getWestWhois(domain, proxy) {
    let defer = Q.defer();
    let firstOptions = {
        url: getTokenUrl + (new Date()).getTime()
    };
    if(proxy) {
        firstOptions.proxy = 'http://' + proxy.trim();
    }
    request(firstOptions, function (error, response, body) {
        if(!error &amp;&amp; response.statusCode === 200) {
            // 模拟执行js代码
            try {
                eval(body);
            } catch (err) {
                defer.reject('解析json出错：' + err);
                return;
            }
            if($.token) {
                let options = {
                    url: whoisUrl +  domain + '&amp;server=&amp;refresh=1',
                    headers: {
                        'Cookie': 'qtoken=' + $.token,
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                };
                // 添加代理
                if(proxy) {
                    options.proxy = 'http://' + proxy.trim();
                }
                request(options, function (error, response, body) {
                    if(!error &amp;&amp; response.statusCode === 200) {
                        let data = null;
                        try {
                            data = JSON.parse(body);
                        } catch (err) {
                            defer.reject('解析json出错：' + err);
                            return;
                        }
                        if(data['code'] === 200) {
                            defer.resolve(extractWestData(domain, data));
                        } else {
                            defer.reject('查询西部数码whois失败')
                        }
                    } else {
                        defer.reject('请求西部数码whois失败');
                    }
                })
            } else {
                defer.reject('生成token失败');
                return defer.promise;
            }
        } else {
            defer.reject(error);
        }
    });
    return defer.promise;
}

/**
 * 提取西部数码数据
 * @param domain
 * @param data
 */
function extractWestData(domain, data) {
    let country = solveCountry(domain, data['body']);
    return {
        domain: domain,
        mail: data['dom_em'],
        errcode: 0,
        country: country,
        registrant_name: data['dom_org'],
        registrar: data['registrer'],
        expire: data['expdate'],
        whoisinfo: JSON.stringify({
            domain: domain,
            mail: data['dom_em'],
            errcode: 0,
            country: country,
            registrant_name: data['dom_org'],
            registrar: data['registrer'],
            expire: data['expdate']
        })
    };

    function solveCountry(domain, html) {
        if(domain &amp;&amp; domain.substr(-1, 3) === '.cn') {
            return  'CN';
        }
        let result = html.match(/Registrant Country: (\S+?)<br\/>/);
        if(result) {
            return result[1].trim();
        }
        return '';
    }
}


module.exports.getWestWhois = getWestWhois;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">/**
 * Created by salamander on 2016/11/8.
 */</span>
<span class="hljs-keyword">let</span> request = <span class="hljs-built_in">require</span>(<span class="hljs-string">'request'</span>);
<span class="hljs-keyword">let</span> Q = <span class="hljs-built_in">require</span>(<span class="hljs-string">'q'</span>);
<span class="hljs-keyword">let</span> datetime = <span class="hljs-built_in">require</span>(<span class="hljs-string">'locutus/php/datetime'</span>);

<span class="hljs-keyword">let</span> getTokenUrl = <span class="hljs-string">'http://www.west.cn/main/whois.asp?act=gettok&amp;_='</span>;
<span class="hljs-keyword">let</span> whoisUrl = <span class="hljs-string">'http://www.west.cn/web/whois/whoisinfo?domain='</span>;
<span class="hljs-comment">// 需要的字段</span>
<span class="hljs-keyword">let</span> needFields = [<span class="hljs-string">'domain'</span>, <span class="hljs-string">'registrar'</span>, <span class="hljs-string">'country'</span>, <span class="hljs-string">'mail'</span>, <span class="hljs-string">'whoisinfo'</span>, <span class="hljs-string">'add_time'</span>, <span class="hljs-string">'registrant_name'</span>, <span class="hljs-string">'expire_date'</span>];

<span class="hljs-comment">// 模仿jquery</span>
<span class="hljs-keyword">let</span> jQuery, $;
$ = jQuery = {
    <span class="hljs-attr">token</span>: <span class="hljs-string">''</span>
};

jQuery.cookie =  <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">name, value, options</span>) </span>{
    <span class="hljs-keyword">this</span>.token = value;
};

<span class="hljs-comment">/**
 * 获取西部数码whois信息
 * @param domain 域名
 * @param proxy 代理
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getWestWhois</span>(<span class="hljs-params">domain, proxy</span>) </span>{
    <span class="hljs-keyword">let</span> defer = Q.defer();
    <span class="hljs-keyword">let</span> firstOptions = {
        <span class="hljs-attr">url</span>: getTokenUrl + (<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()).getTime()
    };
    <span class="hljs-keyword">if</span>(proxy) {
        firstOptions.proxy = <span class="hljs-string">'http://'</span> + proxy.trim();
    }
    request(firstOptions, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">error, response, body</span>) </span>{
        <span class="hljs-keyword">if</span>(!error &amp;&amp; response.statusCode === <span class="hljs-number">200</span>) {
            <span class="hljs-comment">// 模拟执行js代码</span>
            <span class="hljs-keyword">try</span> {
                <span class="hljs-built_in">eval</span>(body);
            } <span class="hljs-keyword">catch</span> (err) {
                defer.reject(<span class="hljs-string">'解析json出错：'</span> + err);
                <span class="hljs-keyword">return</span>;
            }
            <span class="hljs-keyword">if</span>($.token) {
                <span class="hljs-keyword">let</span> options = {
                    <span class="hljs-attr">url</span>: whoisUrl +  domain + <span class="hljs-string">'&amp;server=&amp;refresh=1'</span>,
                    <span class="hljs-attr">headers</span>: {
                        <span class="hljs-string">'Cookie'</span>: <span class="hljs-string">'qtoken='</span> + $.token,
                        <span class="hljs-string">'X-Requested-With'</span>: <span class="hljs-string">'XMLHttpRequest'</span>
                    }
                };
                <span class="hljs-comment">// 添加代理</span>
                <span class="hljs-keyword">if</span>(proxy) {
                    options.proxy = <span class="hljs-string">'http://'</span> + proxy.trim();
                }
                request(options, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">error, response, body</span>) </span>{
                    <span class="hljs-keyword">if</span>(!error &amp;&amp; response.statusCode === <span class="hljs-number">200</span>) {
                        <span class="hljs-keyword">let</span> data = <span class="hljs-literal">null</span>;
                        <span class="hljs-keyword">try</span> {
                            data = <span class="hljs-built_in">JSON</span>.parse(body);
                        } <span class="hljs-keyword">catch</span> (err) {
                            defer.reject(<span class="hljs-string">'解析json出错：'</span> + err);
                            <span class="hljs-keyword">return</span>;
                        }
                        <span class="hljs-keyword">if</span>(data[<span class="hljs-string">'code'</span>] === <span class="hljs-number">200</span>) {
                            defer.resolve(extractWestData(domain, data));
                        } <span class="hljs-keyword">else</span> {
                            defer.reject(<span class="hljs-string">'查询西部数码whois失败'</span>)
                        }
                    } <span class="hljs-keyword">else</span> {
                        defer.reject(<span class="hljs-string">'请求西部数码whois失败'</span>);
                    }
                })
            } <span class="hljs-keyword">else</span> {
                defer.reject(<span class="hljs-string">'生成token失败'</span>);
                <span class="hljs-keyword">return</span> defer.promise;
            }
        } <span class="hljs-keyword">else</span> {
            defer.reject(error);
        }
    });
    <span class="hljs-keyword">return</span> defer.promise;
}

<span class="hljs-comment">/**
 * 提取西部数码数据
 * @param domain
 * @param data
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">extractWestData</span>(<span class="hljs-params">domain, data</span>) </span>{
    <span class="hljs-keyword">let</span> country = solveCountry(domain, data[<span class="hljs-string">'body'</span>]);
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">domain</span>: domain,
        <span class="hljs-attr">mail</span>: data[<span class="hljs-string">'dom_em'</span>],
        <span class="hljs-attr">errcode</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">country</span>: country,
        <span class="hljs-attr">registrant_name</span>: data[<span class="hljs-string">'dom_org'</span>],
        <span class="hljs-attr">registrar</span>: data[<span class="hljs-string">'registrer'</span>],
        <span class="hljs-attr">expire</span>: data[<span class="hljs-string">'expdate'</span>],
        <span class="hljs-attr">whoisinfo</span>: <span class="hljs-built_in">JSON</span>.stringify({
            <span class="hljs-attr">domain</span>: domain,
            <span class="hljs-attr">mail</span>: data[<span class="hljs-string">'dom_em'</span>],
            <span class="hljs-attr">errcode</span>: <span class="hljs-number">0</span>,
            <span class="hljs-attr">country</span>: country,
            <span class="hljs-attr">registrant_name</span>: data[<span class="hljs-string">'dom_org'</span>],
            <span class="hljs-attr">registrar</span>: data[<span class="hljs-string">'registrer'</span>],
            <span class="hljs-attr">expire</span>: data[<span class="hljs-string">'expdate'</span>]
        })
    };

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">solveCountry</span>(<span class="hljs-params">domain, html</span>) </span>{
        <span class="hljs-keyword">if</span>(domain &amp;&amp; domain.substr(<span class="hljs-number">-1</span>, <span class="hljs-number">3</span>) === <span class="hljs-string">'.cn'</span>) {
            <span class="hljs-keyword">return</span>  <span class="hljs-string">'CN'</span>;
        }
        <span class="hljs-keyword">let</span> result = html.match(<span class="hljs-regexp">/Registrant Country: (\S+?)&lt;br\/&gt;/</span>);
        <span class="hljs-keyword">if</span>(result) {
            <span class="hljs-keyword">return</span> result[<span class="hljs-number">1</span>].trim();
        }
        <span class="hljs-keyword">return</span> <span class="hljs-string">''</span>;
    }
}


<span class="hljs-built_in">module</span>.exports.getWestWhois = getWestWhois;
</code></pre>
<h1 id="articleHeader3">使用</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let westWhois = require('./west_whois.js');

westWhois.getWestWhois('51nazi.com').then((info) => {
    console.log(info);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>let westWhois = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./west_whois.js'</span>);

westWhois.getWestWhois(<span class="hljs-string">'51nazi.com'</span>).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(info)</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(info);
});</code></pre>
<p>结果：</p>
<p><span class="img-wrap"><img data-src="/img/bVWEcu?w=866&amp;h=370" src="https://static.alili.tech/img/bVWEcu?w=866&amp;h=370" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader4">另外</h1>
<p><strong>51nazi.com</strong>这个域名是我的，有意出售。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Just for fun——写个爬虫抓取whois信息

## 原文链接
[https://segmentfault.com/a/1190000011555174](https://segmentfault.com/a/1190000011555174)

