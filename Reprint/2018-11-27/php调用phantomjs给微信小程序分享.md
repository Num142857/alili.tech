---
title: 'php调用phantomjs给微信小程序分享' 
date: 2018-11-27 2:30:13
hidden: true
slug: iyssv109zm
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">&#x80CC;&#x666F;</h2><ul><li>&#x4E4B;&#x524D;&#x5DF2;&#x7ECF;&#x4F7F;&#x7528;<a href="https://segmentfault.com/a/1190000015286871">golang&#x5199;&#x8FC7;&#x8C03;&#x7528;phantomjs&#x7684;&#x6587;&#x7AE0;</a></li><li>CTO&#x4E0D;&#x8BA9;&#x6211;&#x4F7F;&#x7528;golang&#x6240;&#x4EE5;&#x53EA;&#x597D;&#x4F7F;&#x7528;php&#x8C03;&#x7528;phantomjs</li><li>packagist&#x4E0A;&#x7684;composer&#x5305;&#x529F;&#x80FD;&#x5F88;&#x5197;&#x4F59;,&#x6211;&#x53EA;&#x9700;&#x8981;&#x7528;&#x5230;phantomjs&#x7684;&#x622A;&#x56FE;&#x529F;&#x80FD;</li></ul><h2 id="articleHeader1">&#x77E5;&#x8BC6;&#x50A8;&#x5907;</h2><ul><li>*unix&#x7CFB;&#x7EDF;&#x5B89;&#x88C5;phantomjs,&#x6743;&#x9650;&#x76F8;&#x5173;&#x77E5;&#x8BC6;</li><li>&#x57FA;&#x672C;JavaScript&#x8BED;&#x6CD5;&#x77E5;&#x8BC6;</li><li>php <code>exec</code>&#x51FD;&#x6570;&#x8C03;&#x7528;<code>REPL</code> phantomjs</li><li>phantomjs js&#x622A;&#x56FE;&#x6587;&#x6863; <a href="http://javascript.ruanyifeng.com/tool/phantomjs.html" rel="nofollow noreferrer" target="_blank">http://javascript.ruanyifeng....</a></li></ul><h2 id="articleHeader2">&#x4EE3;&#x7801;(php &#x4EE3;&#x7801;&#x73AF;&#x5883;&#x4E3A;yii2&#x6846;&#x67B6;)</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;?php

namespace weapp\library\phantomjs;

use weapp\library\BizException;

class ScreenShot
{
    /** @var string &#x83B7;&#x53D6;phantomjs &#x53C2;&#x6570;&#x4E2D; js&#x6587;&#x4EF6;&#x7684;&#x51B3;&#x5B9A;&#x8DEF;&#x5F84; */
    private $js_path;
    /** @var bool|string &#x83B7;&#x53D6;php &#x6709;777&#x6743;&#x9650;&#x7684;&#x4E34;&#x65F6;&#x6587;&#x4EF6;&#x76EE;&#x5F55; */
    private $temp_dir;

    function __construct()
    {
        $dir = __DIR__;
        $this-&gt;js_path = &quot;{$dir}/script.js&quot;;
        /** @var bool|string &#x83B7;&#x53D6;php &#x6709;777&#x6743;&#x9650;&#x7684;&#x4E34;&#x65F6;&#x6587;&#x4EF6;&#x76EE;&#x5F55; */
        $this-&gt;temp_dir = \Yii::getAlias(&apos;@runtime&apos;);
    }

    /**
     * &#x622A;&#x56FE;&#x5E76;&#x4E0A;&#x4F20;
     * @param string $url
     * @param string $filename
     * @return string
     * @throws BizException
     */
    public function screenShotThenSaveToOss(string $url, string $filename = &apos;temp.jpg&apos;)
    {
        //&#x8F93;&#x51FA;&#x56FE;&#x7247;&#x7684;&#x8DEF;&#x5F84;
        $outputFilePath = &quot;{$this-&gt;temp_dir}/$filename&quot;;
        //&#x6267;&#x884C;&#x7684;phantomjs&#x547D;&#x4EE4;
        //phantomjs &#x53EF;&#x6267;&#x884C;&#x6587;&#x4EF6;&#x5FC5;&#x987B;&#x662F; &#x7EDD;&#x5BF9;&#x8DEF;&#x5F84; &#x5426;&#x5219;&#x5BFC;&#x81F4; exec &#x51FD;&#x6570;&#x8FD4;&#x56DE;&#x503C;127&#x9519;&#x8BEF;
        $cmd = &quot;\usr\local\bin\phantomjs {$this-&gt;js_path} &apos;$url&apos; &apos;$outputFilePath&apos;&quot;;
        //&#x6355;&#x6349;&#x4E0D;&#x5230;phantomjs&#x547D;&#x4EE4;&#x8F93;&#x51FA;&#x7ED3;&#x679C;
        exec($cmd, $output);
        //&#x68C0;&#x67E5;&#x622A;&#x56FE;&#x6587;&#x4EF6;&#x662F;&#x5426;&#x5B58;&#x5728;
        $isShotImgaeExist = file_exists($outputFilePath);
        if (!$isShotImgaeExist) {
            throw new BizException(0, &apos;phantomjs&#x622A;&#x56FE;&#x5931;&#x8D25;&apos;, BizException::SELF_DEFINE);
        }
        //&#x4FDD;&#x5B58;&#x622A;&#x56FE;&#x5230;oss
        $result = $this-&gt;postScreenShotImageToOss($outputFilePath);
        //&#x5220;&#x9664;&#x4E34;&#x65F6;&#x6587;&#x4EF6;&#x5939;&#x7684;&#x622A;&#x56FE;&#x56FE;&#x7247;
        unlink($outputFilePath);
        return $result;
    }


    /**
     * &#x4E0A;&#x4F20;&#x622A;&#x56FE;&#x5230;&#x963F;&#x91CC;&#x4E91;&#x76F4;&#x4F20;oss
     * @param string $screenshot_path
     * @return string
     */
    public function postScreenShotImageToOss(string $screenshot_path): string
    {
        $ossKey = &apos;raw_file_name&apos;;

        $file = new \CURLFile($screenshot_path, &apos;image/jpeg&apos;, &apos;file&apos;);
        $tokenArray = $this-&gt;getOssPolicyToken(&apos;fetch&apos;);
        $url = $tokenArray-&gt;host;
        $postData = [
            &apos;key&apos; =&gt; &quot;{$tokenArray-&gt;dir}/$ossKey&quot;,
            &apos;policy&apos; =&gt; $tokenArray-&gt;policy,
            &apos;OSSAccessKeyId&apos; =&gt; $tokenArray-&gt;accessid,
            &apos;success_action_status&apos; =&gt; &apos;200&apos;,
            &apos;signature&apos; =&gt; $tokenArray-&gt;signature,
            &apos;callback&apos; =&gt; $tokenArray-&gt;callback,
            &apos;file&apos; =&gt; $file
        ];
        $ch = curl_init();
        //$data = array(&apos;name&apos; =&gt; &apos;Foo&apos;, &apos;file&apos; =&gt; &apos;@/home/user/test.png&apos;);
        curl_setopt($ch, CURLOPT_URL, $url);
        // Disable SSL verification
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_SAFE_UPLOAD, true); // required as of PHP 5.6.0
        curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 20);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 20);
        //curl_setopt($ch, CURLOPT_HTTPHEADER, [&quot;Content-Type: $mime_type&quot;]);

        $res = curl_exec($ch);
        $res = json_decode($res);
        curl_close($ch);
        if (empty($res) || $res-&gt;code != 0) {
            return &apos;&apos;;
        } else {
            return $res-&gt;data-&gt;url;
        }
    }

    /**
     * &#x8C03;&#x7528;&#x7BA1;&#x7406;&#x540E;&#x53F0;&#x963F;&#x91CC;&#x4E91;oss token&#x63A5;&#x53E3;
     * @param null $url
     * @return array
     */
    public function getOssPolicyToken($url = null)
    {
        $url = \Yii::$app-&gt;params[&apos;oss_screen_shot_token_api&apos;];
        $ch = curl_init();
        // Disable SSL verification
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        // Will return the response, if false it print the response
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        // Set the url
        curl_setopt($ch, CURLOPT_URL, $url);
        // Execute
        $result = curl_exec($ch);
        // Closing
        curl_close($ch);
        $res = json_decode($result);
        if (empty($res) || $res-&gt;code != 0) {
            return [];
        } else {
            return $res-&gt;data;
        }
    }
}

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="php hljs"><code class="php"><span class="hljs-meta">&lt;?php</span>

<span class="hljs-keyword">namespace</span> <span class="hljs-title">weapp</span>\<span class="hljs-title">library</span>\<span class="hljs-title">phantomjs</span>;

<span class="hljs-keyword">use</span> <span class="hljs-title">weapp</span>\<span class="hljs-title">library</span>\<span class="hljs-title">BizException</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ScreenShot</span>
</span>{
    <span class="hljs-comment">/** <span class="hljs-doctag">@var</span> string &#x83B7;&#x53D6;phantomjs &#x53C2;&#x6570;&#x4E2D; js&#x6587;&#x4EF6;&#x7684;&#x51B3;&#x5B9A;&#x8DEF;&#x5F84; */</span>
    <span class="hljs-keyword">private</span> $js_path;
    <span class="hljs-comment">/** <span class="hljs-doctag">@var</span> bool|string &#x83B7;&#x53D6;php &#x6709;777&#x6743;&#x9650;&#x7684;&#x4E34;&#x65F6;&#x6587;&#x4EF6;&#x76EE;&#x5F55; */</span>
    <span class="hljs-keyword">private</span> $temp_dir;

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">__construct</span><span class="hljs-params">()</span>
    </span>{
        $dir = <span class="hljs-keyword">__DIR__</span>;
        <span class="hljs-keyword">$this</span>-&gt;js_path = <span class="hljs-string">&quot;{$dir}/script.js&quot;</span>;
        <span class="hljs-comment">/** <span class="hljs-doctag">@var</span> bool|string &#x83B7;&#x53D6;php &#x6709;777&#x6743;&#x9650;&#x7684;&#x4E34;&#x65F6;&#x6587;&#x4EF6;&#x76EE;&#x5F55; */</span>
        <span class="hljs-keyword">$this</span>-&gt;temp_dir = \Yii::getAlias(<span class="hljs-string">&apos;@runtime&apos;</span>);
    }

    <span class="hljs-comment">/**
     * &#x622A;&#x56FE;&#x5E76;&#x4E0A;&#x4F20;
     * <span class="hljs-doctag">@param</span> string $url
     * <span class="hljs-doctag">@param</span> string $filename
     * <span class="hljs-doctag">@return</span> string
     * <span class="hljs-doctag">@throws</span> BizException
     */</span>
    <span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">screenShotThenSaveToOss</span><span class="hljs-params">(string $url, string $filename = <span class="hljs-string">&apos;temp.jpg&apos;</span>)</span>
    </span>{
        <span class="hljs-comment">//&#x8F93;&#x51FA;&#x56FE;&#x7247;&#x7684;&#x8DEF;&#x5F84;</span>
        $outputFilePath = <span class="hljs-string">&quot;{$this-&gt;temp_dir}/$filename&quot;</span>;
        <span class="hljs-comment">//&#x6267;&#x884C;&#x7684;phantomjs&#x547D;&#x4EE4;</span>
        <span class="hljs-comment">//phantomjs &#x53EF;&#x6267;&#x884C;&#x6587;&#x4EF6;&#x5FC5;&#x987B;&#x662F; &#x7EDD;&#x5BF9;&#x8DEF;&#x5F84; &#x5426;&#x5219;&#x5BFC;&#x81F4; exec &#x51FD;&#x6570;&#x8FD4;&#x56DE;&#x503C;127&#x9519;&#x8BEF;</span>
        $cmd = <span class="hljs-string">&quot;\usr\local\bin\phantomjs {$this-&gt;js_path} &apos;$url&apos; &apos;$outputFilePath&apos;&quot;</span>;
        <span class="hljs-comment">//&#x6355;&#x6349;&#x4E0D;&#x5230;phantomjs&#x547D;&#x4EE4;&#x8F93;&#x51FA;&#x7ED3;&#x679C;</span>
        exec($cmd, $output);
        <span class="hljs-comment">//&#x68C0;&#x67E5;&#x622A;&#x56FE;&#x6587;&#x4EF6;&#x662F;&#x5426;&#x5B58;&#x5728;</span>
        $isShotImgaeExist = file_exists($outputFilePath);
        <span class="hljs-keyword">if</span> (!$isShotImgaeExist) {
            <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> BizException(<span class="hljs-number">0</span>, <span class="hljs-string">&apos;phantomjs&#x622A;&#x56FE;&#x5931;&#x8D25;&apos;</span>, BizException::SELF_DEFINE);
        }
        <span class="hljs-comment">//&#x4FDD;&#x5B58;&#x622A;&#x56FE;&#x5230;oss</span>
        $result = <span class="hljs-keyword">$this</span>-&gt;postScreenShotImageToOss($outputFilePath);
        <span class="hljs-comment">//&#x5220;&#x9664;&#x4E34;&#x65F6;&#x6587;&#x4EF6;&#x5939;&#x7684;&#x622A;&#x56FE;&#x56FE;&#x7247;</span>
        unlink($outputFilePath);
        <span class="hljs-keyword">return</span> $result;
    }


    <span class="hljs-comment">/**
     * &#x4E0A;&#x4F20;&#x622A;&#x56FE;&#x5230;&#x963F;&#x91CC;&#x4E91;&#x76F4;&#x4F20;oss
     * <span class="hljs-doctag">@param</span> string $screenshot_path
     * <span class="hljs-doctag">@return</span> string
     */</span>
    <span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">postScreenShotImageToOss</span><span class="hljs-params">(string $screenshot_path)</span>: <span class="hljs-title">string</span>
    </span>{
        $ossKey = <span class="hljs-string">&apos;raw_file_name&apos;</span>;

        $file = <span class="hljs-keyword">new</span> \CURLFile($screenshot_path, <span class="hljs-string">&apos;image/jpeg&apos;</span>, <span class="hljs-string">&apos;file&apos;</span>);
        $tokenArray = <span class="hljs-keyword">$this</span>-&gt;getOssPolicyToken(<span class="hljs-string">&apos;fetch&apos;</span>);
        $url = $tokenArray-&gt;host;
        $postData = [
            <span class="hljs-string">&apos;key&apos;</span> =&gt; <span class="hljs-string">&quot;{$tokenArray-&gt;dir}/$ossKey&quot;</span>,
            <span class="hljs-string">&apos;policy&apos;</span> =&gt; $tokenArray-&gt;policy,
            <span class="hljs-string">&apos;OSSAccessKeyId&apos;</span> =&gt; $tokenArray-&gt;accessid,
            <span class="hljs-string">&apos;success_action_status&apos;</span> =&gt; <span class="hljs-string">&apos;200&apos;</span>,
            <span class="hljs-string">&apos;signature&apos;</span> =&gt; $tokenArray-&gt;signature,
            <span class="hljs-string">&apos;callback&apos;</span> =&gt; $tokenArray-&gt;callback,
            <span class="hljs-string">&apos;file&apos;</span> =&gt; $file
        ];
        $ch = curl_init();
        <span class="hljs-comment">//$data = array(&apos;name&apos; =&gt; &apos;Foo&apos;, &apos;file&apos; =&gt; &apos;@/home/user/test.png&apos;);</span>
        curl_setopt($ch, CURLOPT_URL, $url);
        <span class="hljs-comment">// Disable SSL verification</span>
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, <span class="hljs-keyword">false</span>);
        curl_setopt($ch, CURLOPT_POST, <span class="hljs-number">1</span>);
        curl_setopt($ch, CURLOPT_SAFE_UPLOAD, <span class="hljs-keyword">true</span>); <span class="hljs-comment">// required as of PHP 5.6.0</span>
        curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, <span class="hljs-keyword">true</span>);
        curl_setopt($ch, CURLOPT_TIMEOUT, <span class="hljs-number">20</span>);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, <span class="hljs-number">20</span>);
        <span class="hljs-comment">//curl_setopt($ch, CURLOPT_HTTPHEADER, [&quot;Content-Type: $mime_type&quot;]);</span>

        $res = curl_exec($ch);
        $res = json_decode($res);
        curl_close($ch);
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">empty</span>($res) || $res-&gt;code != <span class="hljs-number">0</span>) {
            <span class="hljs-keyword">return</span> <span class="hljs-string">&apos;&apos;</span>;
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">return</span> $res-&gt;data-&gt;url;
        }
    }

    <span class="hljs-comment">/**
     * &#x8C03;&#x7528;&#x7BA1;&#x7406;&#x540E;&#x53F0;&#x963F;&#x91CC;&#x4E91;oss token&#x63A5;&#x53E3;
     * <span class="hljs-doctag">@param</span> null $url
     * <span class="hljs-doctag">@return</span> array
     */</span>
    <span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getOssPolicyToken</span><span class="hljs-params">($url = null)</span>
    </span>{
        $url = \Yii::$app-&gt;params[<span class="hljs-string">&apos;oss_screen_shot_token_api&apos;</span>];
        $ch = curl_init();
        <span class="hljs-comment">// Disable SSL verification</span>
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, <span class="hljs-keyword">false</span>);
        <span class="hljs-comment">// Will return the response, if false it print the response</span>
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, <span class="hljs-keyword">true</span>);
        <span class="hljs-comment">// Set the url</span>
        curl_setopt($ch, CURLOPT_URL, $url);
        <span class="hljs-comment">// Execute</span>
        $result = curl_exec($ch);
        <span class="hljs-comment">// Closing</span>
        curl_close($ch);
        $res = json_decode($result);
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">empty</span>($res) || $res-&gt;code != <span class="hljs-number">0</span>) {
            <span class="hljs-keyword">return</span> [];
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">return</span> $res-&gt;data;
        }
    }
}

</code></pre><h4>phantomjs javascript&#x811A;&#x672C;&#x5185;&#x5BB9;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;use strict&quot;;
var system = require(&apos;system&apos;);
var webPage = require(&apos;webpage&apos;);
var page = webPage.create();
//&#x8BBE;&#x7F6E;phantomjs&#x7684;&#x6D4F;&#x89C8;&#x5668;user-agent
page.settings.userAgent = &apos;Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1&apos;;

//&#x83B7;&#x53D6;php exec &#x51FD;&#x6570;&#x7684;&#x547D;&#x4EE4;&#x884C;&#x53C2;&#x6570;
if (system.args.length !== 3) {
    console.log(system.args);
    console.log(&apos;&#x53C2;&#x6570;&#x9519;&#x8BEF;&apos;);
    console.log(&apos;&#x7B2C;2&#x4E2A;&#x53C2;&#x6570;&#x4E3A;url&#x5730;&#x5740; &#x7B2C;3&#x4E2A;&#x53C2;&#x6570;&#x4E3A;&#x622A;&#x56FE;&#x6587;&#x4EF6;&#x540D;&#x79F0;&apos;);
    phantom.exit(1);
}

//&#x547D;&#x4EE4;&#x884C; &#x622A;&#x56FE;&#x7F51;&#x5740;&#x53C2;&#x6570;
var url = system.args[1];
//&#x56FE;&#x7247;&#x8F93;&#x51FA;&#x8DEF;&#x5F84;
var filePath = system.args[2];
console.log(&apos;-------&apos;);
console.log(url);
console.log(&apos;-------&apos;);
console.log(filePath);
console.log(&apos;-------&apos;);

//&#x8BBE;&#x7F6E;&#x6D4F;&#x89C8;&#x5668;&#x89C6;&#x53E3;
page.viewportSize = {width: 480, height: 960};
//&#x6253;&#x5F00;&#x7F51;&#x5740;
page.open(url, function start(status) {
    //1000ms&#x4E4B;&#x540E;&#x5F00;&#x59CB;&#x622A;&#x56FE;
    setTimeout(function () {
        //&#x622A;&#x56FE;&#x683C;&#x5F0F;&#x4E3A;jpg 80%&#x7684;&#x56FE;&#x7247;&#x8D28;&#x91CF;
        page.render(filePath, {format: &apos;jpg&apos;, quality: &apos;80&apos;});
        console.log(&apos;success&apos;);
        //&#x9000;&#x51FA;phantomjs &#x907F;&#x514D;phantomjs&#x5BFC;&#x81F4;&#x5185;&#x5B58;&#x6CC4;&#x9732;
        phantom.exit();
    }, 1000);
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-meta">&quot;use strict&quot;</span>;
<span class="hljs-keyword">var</span> system = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;system&apos;</span>);
<span class="hljs-keyword">var</span> webPage = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;webpage&apos;</span>);
<span class="hljs-keyword">var</span> page = webPage.create();
<span class="hljs-comment">//&#x8BBE;&#x7F6E;phantomjs&#x7684;&#x6D4F;&#x89C8;&#x5668;user-agent</span>
page.settings.userAgent = <span class="hljs-string">&apos;Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1&apos;</span>;

<span class="hljs-comment">//&#x83B7;&#x53D6;php exec &#x51FD;&#x6570;&#x7684;&#x547D;&#x4EE4;&#x884C;&#x53C2;&#x6570;</span>
<span class="hljs-keyword">if</span> (system.args.length !== <span class="hljs-number">3</span>) {
    <span class="hljs-built_in">console</span>.log(system.args);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x53C2;&#x6570;&#x9519;&#x8BEF;&apos;</span>);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x7B2C;2&#x4E2A;&#x53C2;&#x6570;&#x4E3A;url&#x5730;&#x5740; &#x7B2C;3&#x4E2A;&#x53C2;&#x6570;&#x4E3A;&#x622A;&#x56FE;&#x6587;&#x4EF6;&#x540D;&#x79F0;&apos;</span>);
    phantom.exit(<span class="hljs-number">1</span>);
}

<span class="hljs-comment">//&#x547D;&#x4EE4;&#x884C; &#x622A;&#x56FE;&#x7F51;&#x5740;&#x53C2;&#x6570;</span>
<span class="hljs-keyword">var</span> url = system.args[<span class="hljs-number">1</span>];
<span class="hljs-comment">//&#x56FE;&#x7247;&#x8F93;&#x51FA;&#x8DEF;&#x5F84;</span>
<span class="hljs-keyword">var</span> filePath = system.args[<span class="hljs-number">2</span>];
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;-------&apos;</span>);
<span class="hljs-built_in">console</span>.log(url);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;-------&apos;</span>);
<span class="hljs-built_in">console</span>.log(filePath);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;-------&apos;</span>);

<span class="hljs-comment">//&#x8BBE;&#x7F6E;&#x6D4F;&#x89C8;&#x5668;&#x89C6;&#x53E3;</span>
page.viewportSize = {<span class="hljs-attr">width</span>: <span class="hljs-number">480</span>, <span class="hljs-attr">height</span>: <span class="hljs-number">960</span>};
<span class="hljs-comment">//&#x6253;&#x5F00;&#x7F51;&#x5740;</span>
page.open(url, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">start</span>(<span class="hljs-params">status</span>) </span>{
    <span class="hljs-comment">//1000ms&#x4E4B;&#x540E;&#x5F00;&#x59CB;&#x622A;&#x56FE;</span>
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">//&#x622A;&#x56FE;&#x683C;&#x5F0F;&#x4E3A;jpg 80%&#x7684;&#x56FE;&#x7247;&#x8D28;&#x91CF;</span>
        page.render(filePath, {<span class="hljs-attr">format</span>: <span class="hljs-string">&apos;jpg&apos;</span>, <span class="hljs-attr">quality</span>: <span class="hljs-string">&apos;80&apos;</span>});
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;success&apos;</span>);
        <span class="hljs-comment">//&#x9000;&#x51FA;phantomjs &#x907F;&#x514D;phantomjs&#x5BFC;&#x81F4;&#x5185;&#x5B58;&#x6CC4;&#x9732;</span>
        phantom.exit();
    }, <span class="hljs-number">1000</span>);
});</code></pre><h3 id="articleHeader3">php&#x8C03;&#x7528;phantomjs&#x76EE;&#x5F55;&#x7ED3;&#x6784;</h3><p><span class="img-wrap"><img data-src="/img/bVbcs5U?w=242&amp;h=149" src="https://static.alili.tech/img/bVbcs5U?w=242&amp;h=149" alt="php&#x8C03;&#x7528;JavaScript phantomjs" title="php&#x8C03;&#x7528;JavaScript phantomjs" style="cursor:pointer;display:inline"></span></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
php调用phantomjs给微信小程序分享

## 原文链接
[https://segmentfault.com/a/1190000015325775](https://segmentfault.com/a/1190000015325775)

