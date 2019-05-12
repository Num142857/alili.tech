---
title: 'php中使用openssl_encrypt代替mcrypt_encrypt实现js加密php解密的方法' 
date: 2019-01-09 2:30:11
hidden: true
slug: az56ud1xka6
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">项目背景</h1>
<ul>
<li><p>因为自己开发的接口希望在传递的工程中可以保证参数是密文的形式，主要是前端使用js加密，后端使用php解密</p></li>
<li><p>在网络上搜索了很多的方法，但是大部分的都是使用mcrypt_decrypt和mcrypt_encrypt进行php端的加解密，但是众所周知的问题，这两个方法在php7.1以后将会被废弃，故而采用。</p></li>
</ul>
<h1 id="articleHeader1">实现方式说明</h1>
<ul>
<li><p>php使用mcrypt_decrypt和mcrypt_encrypt的组合方式，以及openssl_decrypt和openssl_encrypt的组合方式</p></li>
<li><p>js端使用<a href="https://github.com/brix/crypto-js/tree/release-3.1.2" rel="nofollow noreferrer" target="_blank">Crypto-js</a></p></li>
<li><p>为了说明两种方式的区别，在使用mcrypt_decrypt和mcrypt_encrypt方式的时候，使用crypto-helper-zeropadding.js来命名自定义的js加密帮助类，使用test_crypto_zeropadding.html来命令对应的测试html文件；在使用openssl_decrypt和openssl_encrypt的组合方式的时候，使用crypto-helper-pkcs7.js来命名自定义的js加密帮助类，使用test_crypto_pcks7.html来命名测试页面 ，详细的区别可以参见 帖子 <br><a href="https://segmentfault.com/q/1010000009624263">https://segmentfault.com/q/10...</a></p></li>
</ul>
<h1 id="articleHeader2">demo地址</h1>
<p><a href="https://github.com/crelaber/js-encrypt-php-decrypt" rel="nofollow noreferrer" target="_blank">github地址</a></p>
<h1 id="articleHeader3">方法一 ：使用mcrypt_decrypt和mcrypt_encrypt</h1>
<h2 id="articleHeader4">php加密解密类</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<?php

class AesJs
{
    /**向量
     * @var string
     */
    const IV = &quot;1234567890123412&quot;;//16位
    /**
     * 默认秘钥
     */
    const KEY = '201707eggplant99';//16位

    public static function init($iv = '')
    {
        self::$iv = $iv;
    }

    /**
     * 加密字符串
     * @param string $data 字符串
     * @param string $key 加密key
     * @return string
     */
    public static function encrypt($data = '', $key = self::KEY)
    {
        $encrypted = mcrypt_encrypt(MCRYPT_RIJNDAEL_128, $key, $data, MCRYPT_MODE_CBC, self::$iv);
        return base64_encode($encrypted);
    }

    /**
     * 解密字符串
     * @param string $data 字符串
     * @param string $key  加密key
     * @return string
     */
    public static function decrypt($data = '', $key = self::KEY)
    {
        $decrypted = mcrypt_decrypt(MCRYPT_RIJNDAEL_128, $key, base64_decode($data), MCRYPT_MODE_CBC, self::$iv);
        return rtrim($decrypted, &quot;\0&quot;);
    }



    public static function pkcs7_pad($str){
        $len = mb_strlen($str, '8bit');
        $c = 16 - ($len % 16);
        $str .= str_repeat(chr($c), $c);
        return $str;
    }

}

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="php"><span class="hljs-meta">&lt;?php</span>

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AesJs</span>
</span>{
    <span class="hljs-comment">/**向量
     * <span class="hljs-doctag">@var</span> string
     */</span>
    <span class="hljs-keyword">const</span> IV = <span class="hljs-string">"1234567890123412"</span>;<span class="hljs-comment">//16位</span>
    <span class="hljs-comment">/**
     * 默认秘钥
     */</span>
    <span class="hljs-keyword">const</span> KEY = <span class="hljs-string">'201707eggplant99'</span>;<span class="hljs-comment">//16位</span>

    <span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">init</span><span class="hljs-params">($iv = <span class="hljs-string">''</span>)</span>
    </span>{
        <span class="hljs-keyword">self</span>::$iv = $iv;
    }

    <span class="hljs-comment">/**
     * 加密字符串
     * <span class="hljs-doctag">@param</span> string $data 字符串
     * <span class="hljs-doctag">@param</span> string $key 加密key
     * <span class="hljs-doctag">@return</span> string
     */</span>
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">encrypt</span><span class="hljs-params">($data = <span class="hljs-string">''</span>, $key = self::KEY)</span>
    </span>{
        $encrypted = mcrypt_encrypt(MCRYPT_RIJNDAEL_128, $key, $data, MCRYPT_MODE_CBC, <span class="hljs-keyword">self</span>::$iv);
        <span class="hljs-keyword">return</span> base64_encode($encrypted);
    }

    <span class="hljs-comment">/**
     * 解密字符串
     * <span class="hljs-doctag">@param</span> string $data 字符串
     * <span class="hljs-doctag">@param</span> string $key  加密key
     * <span class="hljs-doctag">@return</span> string
     */</span>
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">decrypt</span><span class="hljs-params">($data = <span class="hljs-string">''</span>, $key = self::KEY)</span>
    </span>{
        $decrypted = mcrypt_decrypt(MCRYPT_RIJNDAEL_128, $key, base64_decode($data), MCRYPT_MODE_CBC, <span class="hljs-keyword">self</span>::$iv);
        <span class="hljs-keyword">return</span> rtrim($decrypted, <span class="hljs-string">"\0"</span>);
    }



    <span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">pkcs7_pad</span><span class="hljs-params">($str)</span></span>{
        $len = mb_strlen($str, <span class="hljs-string">'8bit'</span>);
        $c = <span class="hljs-number">16</span> - ($len % <span class="hljs-number">16</span>);
        $str .= str_repeat(chr($c), $c);
        <span class="hljs-keyword">return</span> $str;
    }

}

</span></code></pre>
<h2 id="articleHeader5">js端的关键代码</h2>
<h3 id="articleHeader6">自定义封装的crypto-helper-zeropadding.js</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
var IV = '1234567890123412';

var KEY = '201707eggplant99'
/**
 * 加密
 */
function encrypt(str) {
    key = CryptoJS.enc.Utf8.parse(KEY);// 秘钥
    var iv= CryptoJS.enc.Utf8.parse(IV);//向量iv
    var encrypted = CryptoJS.AES.encrypt(str, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.ZeroPadding });
    return encrypted.toString();
}
/**
 * 解密
 * @param str
 */
function decrypt(str) {
    var key = CryptoJS.enc.Utf8.parse(KEY);// 秘钥
    var iv=    CryptoJS.enc.Utf8.parse(IV);//向量iv
    var decrypted = CryptoJS.AES.decrypt(str,key,{iv:iv,padding:CryptoJS.pad.ZeroPadding});
    return decrypted.toString(CryptoJS.enc.Utf8);
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>
<span class="hljs-keyword">var</span> IV = '1234567890123412';

<span class="hljs-keyword">var</span> KEY = '201707eggplant99'
<span class="hljs-comment">/**
 * 加密
 */</span>
function encrypt(str) {
    key = CryptoJS.<span class="hljs-keyword">enc</span>.Utf8.<span class="hljs-keyword">parse</span>(KEY);<span class="hljs-comment">// 秘钥</span>
    <span class="hljs-keyword">var</span> iv= CryptoJS.<span class="hljs-keyword">enc</span>.Utf8.<span class="hljs-keyword">parse</span>(IV);<span class="hljs-comment">//向量iv</span>
    <span class="hljs-keyword">var</span> encrypted = CryptoJS.AES.encrypt(str, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.ZeroPadding });
    <span class="hljs-keyword">return</span> encrypted.<span class="hljs-keyword">toString</span>();
}
<span class="hljs-comment">/**
 * 解密
 * @param str
 */</span>
function decrypt(str) {
    <span class="hljs-keyword">var</span> key = CryptoJS.<span class="hljs-keyword">enc</span>.Utf8.<span class="hljs-keyword">parse</span>(KEY);<span class="hljs-comment">// 秘钥</span>
    <span class="hljs-keyword">var</span> iv=    CryptoJS.<span class="hljs-keyword">enc</span>.Utf8.<span class="hljs-keyword">parse</span>(IV);<span class="hljs-comment">//向量iv</span>
    <span class="hljs-keyword">var</span> decrypted = CryptoJS.AES.decrypt(str,key,{iv:iv,padding:CryptoJS.pad.ZeroPadding});
    <span class="hljs-keyword">return</span> decrypted.<span class="hljs-keyword">toString</span>(CryptoJS.<span class="hljs-keyword">enc</span>.Utf8);
}
</code></pre>
<h3 id="articleHeader7">js测试调用页面test_crypto_zeropadding.html</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<html>
<head>test crypto-js</head>
<script src=&quot;crypto-js/aes.js&quot; type=&quot;text/javascript&quot;></script>
<script src=&quot;crypto-js/md5.js&quot; type=&quot;text/javascript&quot;></script>
<script src=&quot;crypto-js/components/pad-zeropadding-min.js&quot; type=&quot;text/javascript&quot;></script>
<script src=&quot;crypto-helper-zeropadding.js&quot; type=&quot;text/javascript&quot;></script>

<script type=&quot;text/javascript&quot;>

var data = '111111';
var encode = encrypt(data);
console.log('encode is =======>'+encode);
var decode = decrypt(encode);
console.log('decode is =======>'+decode);
alert('encode is ====>'+encode+',decode is ====>'+decode);
</script>


</html>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>test crypto-js<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"crypto-js/aes.js"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"crypto-js/md5.js"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"crypto-js/components/pad-zeropadding-min.js"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"crypto-helper-zeropadding.js"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">

<span class="hljs-keyword">var</span> data = <span class="hljs-string">'111111'</span>;
<span class="hljs-keyword">var</span> encode = encrypt(data);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'encode is =======&gt;'</span>+encode);
<span class="hljs-keyword">var</span> decode = decrypt(encode);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'decode is =======&gt;'</span>+decode);
alert(<span class="hljs-string">'encode is ====&gt;'</span>+encode+<span class="hljs-string">',decode is ====&gt;'</span>+decode);
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>


<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre>
<h3 id="articleHeader8">js端页面运行效果</h3>
<p><span class="img-wrap"><img data-src="/img/bVQE22?w=1087&amp;h=267" src="https://static.alili.tech/img/bVQE22?w=1087&amp;h=267" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader9">方法二 ：openssl_decrypt和openssl_encrypt的组合方式</h1>
<h2 id="articleHeader10">php加密解密类</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<?php
/*
+--------------------------------------------------------------------------
|   由于在php7.1之后mcrypt_encrypt会被废弃，因此使用openssl_encrypt方法来替换
|   ========================================
|   by Focus
|   ========================================
|
|
+---------------------------------------------------------------------------
*/
class OpensslEncryptHelper
{
    /**向量
     * @var string
     */
    const IV = &quot;1234567890123412&quot;;//16位
    /**
     * 默认秘钥
     */
    const KEY = '201707eggplant99';//16位

    /**
     * 解密字符串
     * @param string $data 字符串
     * @param string $key 加密key
     * @return string
     */
    public static function decryptWithOpenssl($data,$key = self::KEY,$iv = self::IV){
        return openssl_decrypt(base64_decode($data),&quot;AES-128-CBC&quot;,$key,OPENSSL_RAW_DATA,$iv);
    }

    /**
     * 加密字符串
     * 参考网站： https://segmentfault.com/q/1010000009624263
     * @param string $data 字符串
     * @param string $key 加密key
     * @return string
     */
    public static function encryptWithOpenssl($data,$key = self::KEY,$iv = self::IV){

//        echo base64_encode(mcrypt_encrypt(MCRYPT_RIJNDAEL_128, &quot;1234567890123456&quot;, pkcs7_pad(&quot;123456&quot;), MCRYPT_MODE_CBC, &quot;1234567890123456&quot;));
//        echo base64_encode(openssl_encrypt(&quot;123456&quot;,&quot;AES-128-CBC&quot;,&quot;1234567890123456&quot;,OPENSSL_RAW_DATA,&quot;1234567890123456&quot;));
//        $encrypted = mcrypt_encrypt(MCRYPT_RIJNDAEL_128, $key, $data, MCRYPT_MODE_CBC, self::$iv);
//        return base64_encode(mcrypt_encrypt(MCRYPT_RIJNDAEL_128, &quot;1234567890123456&quot;, pkcs7_pad(&quot;123456&quot;), MCRYPT_MODE_CBC, &quot;1234567890123456&quot;));
        return base64_encode(openssl_encrypt($data,&quot;AES-128-CBC&quot;,$key,OPENSSL_RAW_DATA,$iv));
    }


}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="php"><span class="hljs-meta">&lt;?php</span>
<span class="hljs-comment">/*
+--------------------------------------------------------------------------
|   由于在php7.1之后mcrypt_encrypt会被废弃，因此使用openssl_encrypt方法来替换
|   ========================================
|   by Focus
|   ========================================
|
|
+---------------------------------------------------------------------------
*/</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">OpensslEncryptHelper</span>
</span>{
    <span class="hljs-comment">/**向量
     * <span class="hljs-doctag">@var</span> string
     */</span>
    <span class="hljs-keyword">const</span> IV = <span class="hljs-string">"1234567890123412"</span>;<span class="hljs-comment">//16位</span>
    <span class="hljs-comment">/**
     * 默认秘钥
     */</span>
    <span class="hljs-keyword">const</span> KEY = <span class="hljs-string">'201707eggplant99'</span>;<span class="hljs-comment">//16位</span>

    <span class="hljs-comment">/**
     * 解密字符串
     * <span class="hljs-doctag">@param</span> string $data 字符串
     * <span class="hljs-doctag">@param</span> string $key 加密key
     * <span class="hljs-doctag">@return</span> string
     */</span>
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">decryptWithOpenssl</span><span class="hljs-params">($data,$key = self::KEY,$iv = self::IV)</span></span>{
        <span class="hljs-keyword">return</span> openssl_decrypt(base64_decode($data),<span class="hljs-string">"AES-128-CBC"</span>,$key,OPENSSL_RAW_DATA,$iv);
    }

    <span class="hljs-comment">/**
     * 加密字符串
     * 参考网站： https://segmentfault.com/q/1010000009624263
     * <span class="hljs-doctag">@param</span> string $data 字符串
     * <span class="hljs-doctag">@param</span> string $key 加密key
     * <span class="hljs-doctag">@return</span> string
     */</span>
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">encryptWithOpenssl</span><span class="hljs-params">($data,$key = self::KEY,$iv = self::IV)</span></span>{

<span class="hljs-comment">//        echo base64_encode(mcrypt_encrypt(MCRYPT_RIJNDAEL_128, "1234567890123456", pkcs7_pad("123456"), MCRYPT_MODE_CBC, "1234567890123456"));</span>
<span class="hljs-comment">//        echo base64_encode(openssl_encrypt("123456","AES-128-CBC","1234567890123456",OPENSSL_RAW_DATA,"1234567890123456"));</span>
<span class="hljs-comment">//        $encrypted = mcrypt_encrypt(MCRYPT_RIJNDAEL_128, $key, $data, MCRYPT_MODE_CBC, self::$iv);</span>
<span class="hljs-comment">//        return base64_encode(mcrypt_encrypt(MCRYPT_RIJNDAEL_128, "1234567890123456", pkcs7_pad("123456"), MCRYPT_MODE_CBC, "1234567890123456"));</span>
        <span class="hljs-keyword">return</span> base64_encode(openssl_encrypt($data,<span class="hljs-string">"AES-128-CBC"</span>,$key,OPENSSL_RAW_DATA,$iv));
    }


}</span></code></pre>
<h2 id="articleHeader11">js端的关键代码</h2>
<h3 id="articleHeader12">自定义封装的crypto-helper-pkcs7.js</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
var IV = '1234567890123412';

var KEY = '201707eggplant99'
/**
 * 加密
 */
function encrypt(str) {
    key = CryptoJS.enc.Utf8.parse(KEY);// 秘钥
    var iv= CryptoJS.enc.Utf8.parse(IV);//向量iv
    var encrypted = CryptoJS.AES.encrypt(str, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7});
    return encrypted.toString();
}
/**
 * 解密
 * @param str
 */
function decrypt(str) {
    var key = CryptoJS.enc.Utf8.parse(KEY);// 秘钥
    var iv=    CryptoJS.enc.Utf8.parse(IV);//向量iv
    var decrypted = CryptoJS.AES.decrypt(str,key,{iv:iv,padding:CryptoJS.pad.Pkcs7});
    return decrypted.toString(CryptoJS.enc.Utf8);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>
<span class="hljs-keyword">var</span> IV = '1234567890123412';

<span class="hljs-keyword">var</span> KEY = '201707eggplant99'
<span class="hljs-comment">/**
 * 加密
 */</span>
function encrypt(str) {
    key = CryptoJS.<span class="hljs-keyword">enc</span>.Utf8.<span class="hljs-keyword">parse</span>(KEY);<span class="hljs-comment">// 秘钥</span>
    <span class="hljs-keyword">var</span> iv= CryptoJS.<span class="hljs-keyword">enc</span>.Utf8.<span class="hljs-keyword">parse</span>(IV);<span class="hljs-comment">//向量iv</span>
    <span class="hljs-keyword">var</span> encrypted = CryptoJS.AES.encrypt(str, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7});
    <span class="hljs-keyword">return</span> encrypted.<span class="hljs-keyword">toString</span>();
}
<span class="hljs-comment">/**
 * 解密
 * @param str
 */</span>
function decrypt(str) {
    <span class="hljs-keyword">var</span> key = CryptoJS.<span class="hljs-keyword">enc</span>.Utf8.<span class="hljs-keyword">parse</span>(KEY);<span class="hljs-comment">// 秘钥</span>
    <span class="hljs-keyword">var</span> iv=    CryptoJS.<span class="hljs-keyword">enc</span>.Utf8.<span class="hljs-keyword">parse</span>(IV);<span class="hljs-comment">//向量iv</span>
    <span class="hljs-keyword">var</span> decrypted = CryptoJS.AES.decrypt(str,key,{iv:iv,padding:CryptoJS.pad.Pkcs7});
    <span class="hljs-keyword">return</span> decrypted.<span class="hljs-keyword">toString</span>(CryptoJS.<span class="hljs-keyword">enc</span>.Utf8);
}</code></pre>
<h3 id="articleHeader13">test_crypto_pcks7.html代码</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<html>
<head>test crypto-js</head>
<script src=&quot;crypto-js/aes.js&quot; type=&quot;text/javascript&quot;></script>
<script src=&quot;crypto-js/md5.js&quot; type=&quot;text/javascript&quot;></script>
<script src=&quot;crypto-js/components/pad-zeropadding-min.js&quot; type=&quot;text/javascript&quot;></script>
<script src=&quot;crypto-helper-pkcs7.js&quot; type=&quot;text/javascript&quot;></script>

<script type=&quot;text/javascript&quot;>

var data = '111111';
var encode = encrypt(data);
console.log('encode is =======>'+encode);
var decode = decrypt(encode);
console.log('decode is =======>'+decode);
alert('encode is ====>'+encode+',decode is ====>'+decode);

</script>


</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>test crypto-js<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"crypto-js/aes.js"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"crypto-js/md5.js"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"crypto-js/components/pad-zeropadding-min.js"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"crypto-helper-pkcs7.js"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">

<span class="hljs-keyword">var</span> data = <span class="hljs-string">'111111'</span>;
<span class="hljs-keyword">var</span> encode = encrypt(data);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'encode is =======&gt;'</span>+encode);
<span class="hljs-keyword">var</span> decode = decrypt(encode);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'decode is =======&gt;'</span>+decode);
alert(<span class="hljs-string">'encode is ====&gt;'</span>+encode+<span class="hljs-string">',decode is ====&gt;'</span>+decode);

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>


<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<h1 id="articleHeader14">参考资料</h1>
<p><a href="http://www.designcss.org/archives/jsencrypt-php-openssl-rsa-encrypt.html" rel="nofollow noreferrer" target="_blank">前端基于jsencrypt、php基于openssl的rsa非对称加密的实现</a></p>
<p><a href="http://blog.csdn.net/u013474436/article/details/70323491?locationNum=14&amp;fps=1" rel="nofollow noreferrer" target="_blank">PHP OpenSSL&amp;Mcrypt实现AES加密</a></p>
<p><a href="https://github.com/brix/crypto-js/tree/release-3.1.2" rel="nofollow noreferrer" target="_blank">crypto-js项目地址</a></p>
<p><a href="https://zhidao.baidu.com/question/1447483656421960300.html" rel="nofollow noreferrer" target="_blank">为什么 CryptoJS DES 加密的结果和 Java DES 不一样</a></p>
<p><a href="http://blog.csdn.net/fenglailea/article/details/52755694" rel="nofollow noreferrer" target="_blank">JS AES加密与PHP解密</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
php中使用openssl_encrypt代替mcrypt_encrypt实现js加密php解密的方法

## 原文链接
[https://segmentfault.com/a/1190000010128665](https://segmentfault.com/a/1190000010128665)

