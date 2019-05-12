---
title: '前端图片直传OSS试验' 
date: 2019-02-05 2:30:09
hidden: true
slug: 1sryhn0eec8
categories: [reprint]
---

{{< raw >}}

                    
<p>前段时间参与了一个H5项目，里边有个需求是用户上传图片。当时的方案是前端先调用微信的JSSDK选择图片并上传，然后再从后端下载到服务器上。然而用的时候发现客户端给的图片有大有小，但是由于用了微信的接口，图片在下载之前是没法控制的。后来在想能不能调用HTML5原生的文件上传接口，另外还可以配合阿里云的OSS对图片做进一步处理，所以就有了这篇文章。</p>
<h2 id="articleHeader0">1. HTML5原生上传</h2>
<p>其实之前也有想过用原生的，可手里的项目全是微信平台的H5，原生上传一直被告知有兼容性问题，所以这个方案一直是被搁置的；只是这次觉得用微信接口实在不爽才重新翻出来的，没想到意外发现手里的米4居然可以正常用。。好了闲话不说，上代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input id=&quot;img_input&quot; type=&quot;file&quot; accept=&quot;image/*&quot; />
<div id=&quot;preview_box&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;input <span class="hljs-built_in">id</span>=<span class="hljs-string">"img_input"</span> type=<span class="hljs-string">"file"</span> accept=<span class="hljs-string">"image/*"</span> /&gt;
&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">"preview_box"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<p>HTML部分主要就是那个input，至于下边那个div，主要是留着放图片预览用的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;http://cdn.bootcss.com/jquery/2.2.4/jquery.min.js&quot;></script>
<script>
    $(&quot;#img_input&quot;).on(&quot;change&quot;, function(e) {
        var file = e.target.files[0]; // 获取图片资源
        var fd = new FormData(); // 用formdata上传文件

        // 只选择图片文件
        if (!file.type.match('image.*')) {
            return false;
        }

        fd.append('file', file, file.name); // 填入文件

        $.ajax({
            url: 'fileupload.php',
            data: fd,
            processData: false,
            contentType: false,
            type: 'POST',
            success: function () {
                // 成功后显示文件预览
                var reader = new FileReader();
                reader.readAsDataURL(file); // 读取文件
                // 渲染文件
                reader.onload = function(ev) {
                    var img = '<img class=&quot;preview&quot; src=&quot;' + ev.target.result + '&quot; alt=&quot;preview&quot;/>';
                    $(&quot;#preview_box&quot;).empty().append(img);
                }
            }
        });
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://cdn.bootcss.com/jquery/2.2.4/jquery.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-string">"#img_input"</span>).on(<span class="hljs-string">"change"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
        <span class="hljs-keyword">var</span> file = e.target.files[<span class="hljs-number">0</span>]; <span class="hljs-comment">// 获取图片资源</span>
        <span class="hljs-keyword">var</span> fd = <span class="hljs-keyword">new</span> FormData(); <span class="hljs-comment">// 用formdata上传文件</span>

        <span class="hljs-comment">// 只选择图片文件</span>
        <span class="hljs-keyword">if</span> (!file.type.match(<span class="hljs-string">'image.*'</span>)) {
            <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
        }

        fd.append(<span class="hljs-string">'file'</span>, file, file.name); <span class="hljs-comment">// 填入文件</span>

        $.ajax({
            <span class="hljs-attr">url</span>: <span class="hljs-string">'fileupload.php'</span>,
            <span class="hljs-attr">data</span>: fd,
            <span class="hljs-attr">processData</span>: <span class="hljs-literal">false</span>,
            <span class="hljs-attr">contentType</span>: <span class="hljs-literal">false</span>,
            <span class="hljs-attr">type</span>: <span class="hljs-string">'POST'</span>,
            <span class="hljs-attr">success</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                <span class="hljs-comment">// 成功后显示文件预览</span>
                <span class="hljs-keyword">var</span> reader = <span class="hljs-keyword">new</span> FileReader();
                reader.readAsDataURL(file); <span class="hljs-comment">// 读取文件</span>
                <span class="hljs-comment">// 渲染文件</span>
                reader.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">ev</span>) </span>{
                    <span class="hljs-keyword">var</span> img = <span class="hljs-string">'&lt;img class="preview" src="'</span> + ev.target.result + <span class="hljs-string">'" alt="preview"/&gt;'</span>;
                    $(<span class="hljs-string">"#preview_box"</span>).empty().append(img);
                }
            }
        });
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>文件填入FormData，然后POST上传，后端（用的PHP）简单写下接收就行。<br>(然后这里顺便想问下如果直接上传blob的话，PHP后端应该怎么写？有大神路过请不吝赐教~小弟这里先谢过了）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<?php

if ($error == UPLOAD_ERR_OK) {
    $tmp_name = $_FILES[&quot;file&quot;][&quot;tmp_name&quot;];
    $name = $_FILES[&quot;file&quot;][&quot;name&quot;];
    move_uploaded_file($tmp_name, &quot;$name&quot;);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="php"><span class="hljs-meta">&lt;?php</span>

<span class="hljs-keyword">if</span> ($error == UPLOAD_ERR_OK) {
    $tmp_name = $_FILES[<span class="hljs-string">"file"</span>][<span class="hljs-string">"tmp_name"</span>];
    $name = $_FILES[<span class="hljs-string">"file"</span>][<span class="hljs-string">"name"</span>];
    move_uploaded_file($tmp_name, <span class="hljs-string">"$name"</span>);
}</span></code></pre>
<p>然后处理下权限啥的，就能跑啦。</p>
<h2 id="articleHeader1">2. 前端压缩（localResizeIMG）</h2>
<p><a href="https://github.com/think2011/localResizeIMG" rel="nofollow noreferrer" target="_blank">localResizeIMG</a> 是个好插件，用法也很简单，把 GitHub 里的 dist 文件夹拖下来改个名（我改了个“localRZ”），然后直接引用 lrz.bundle.js 文件就行了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;http://cdn.bootcss.com/jquery/2.2.4/jquery.min.js&quot;></script>
<script src=&quot;localRZ/lrz.bundle.js&quot;></script>
<script>
    $(&quot;#img_input&quot;).on(&quot;change&quot;, function(e) {
        var file = e.target.files[0]; //获取图片资源
        var filename = file.name;

        // 只选择图片文件
        if (!file.type.match('image.*')) {
            return false;
        }
        // LocalResizeIMG处理：
        lrz(file, {width: 400})
            .then(function (rst) {
                $.ajax({
                    url: 'fileupload.php',
                    data: rst.formData, // LocalResizeIMG 直接封装好的
                    processData: false,
                    contentType: false,
                    type: 'POST'
                }).done(function(data, textStatus, jqXHR){
                    // 图片预览
                    var img = new Image();
                    img.src = rst.base64;

                    img.onload = function () {
                        $(&quot;#preview_box&quot;).empty().append(img);
                    };
                });
                return rst;
            })
            .catch(function (err) {
                // 万一出错了，这里可以捕捉到错误信息
                // 而且以上的then都不会执行
                alert('ERROR:' + err);
            })
            .always(function () {
                // 不管是成功失败，这里都会执行
            });

    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://cdn.bootcss.com/jquery/2.2.4/jquery.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"localRZ/lrz.bundle.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-string">"#img_input"</span>).on(<span class="hljs-string">"change"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
        <span class="hljs-keyword">var</span> file = e.target.files[<span class="hljs-number">0</span>]; <span class="hljs-comment">//获取图片资源</span>
        <span class="hljs-keyword">var</span> filename = file.name;

        <span class="hljs-comment">// 只选择图片文件</span>
        <span class="hljs-keyword">if</span> (!file.type.match(<span class="hljs-string">'image.*'</span>)) {
            <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
        }
        <span class="hljs-comment">// LocalResizeIMG处理：</span>
        lrz(file, {<span class="hljs-attr">width</span>: <span class="hljs-number">400</span>})
            .then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">rst</span>) </span>{
                $.ajax({
                    <span class="hljs-attr">url</span>: <span class="hljs-string">'fileupload.php'</span>,
                    <span class="hljs-attr">data</span>: rst.formData, <span class="hljs-comment">// LocalResizeIMG 直接封装好的</span>
                    processData: <span class="hljs-literal">false</span>,
                    <span class="hljs-attr">contentType</span>: <span class="hljs-literal">false</span>,
                    <span class="hljs-attr">type</span>: <span class="hljs-string">'POST'</span>
                }).done(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data, textStatus, jqXHR</span>)</span>{
                    <span class="hljs-comment">// 图片预览</span>
                    <span class="hljs-keyword">var</span> img = <span class="hljs-keyword">new</span> Image();
                    img.src = rst.base64;

                    img.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                        $(<span class="hljs-string">"#preview_box"</span>).empty().append(img);
                    };
                });
                <span class="hljs-keyword">return</span> rst;
            })
            .catch(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err</span>) </span>{
                <span class="hljs-comment">// 万一出错了，这里可以捕捉到错误信息</span>
                <span class="hljs-comment">// 而且以上的then都不会执行</span>
                alert(<span class="hljs-string">'ERROR:'</span> + err);
            })
            .always(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                <span class="hljs-comment">// 不管是成功失败，这里都会执行</span>
            });

    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>localResizeIMG 的 <a href="https://github.com/think2011/localResizeIMG/wiki" rel="nofollow noreferrer" target="_blank">文档</a> 写的挺清楚的，哪里不明白的话可以过去看看。</p>
<h2 id="articleHeader2">3. 美化上传按钮</h2>
<p>原生的文件上传控件略丑，所以一般是要美化一下。<br>HTML：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;filePicker&quot;>
    <input id=&quot;img_input&quot; type=&quot;file&quot; accept=&quot;image/*&quot; />
    <label for=&quot;img_input&quot;>上传图片</label>
</div>

<div class=&quot;preview_box&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"filePicker"</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"img_input"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"file"</span> <span class="hljs-attr">accept</span>=<span class="hljs-string">"image/*"</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">"img_input"</span>&gt;</span>上传图片<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"preview_box"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<p>放一个 lable 上去，然后隐藏掉原有的 input：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style type=&quot;text/css&quot;>
    .filePicker {
        margin: 200px;
        width: 200px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        color: #fff;
        background: #00b7ee;
    }
    
    .filePicker label {
        display: block;
        width: 100%;
        height: 100%;
    }
    
    .filePicker input[type=&quot;file&quot;] {
        display: none;
    }

</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.filePicker</span> {
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>;
        <span class="hljs-attribute">line-height</span>: <span class="hljs-number">50px</span>;
        <span class="hljs-attribute">text-align</span>: center;
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#00b7ee</span>;
    }
    
    <span class="hljs-selector-class">.filePicker</span> <span class="hljs-selector-tag">label</span> {
        <span class="hljs-attribute">display</span>: block;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
    }
    
    <span class="hljs-selector-class">.filePicker</span> <span class="hljs-selector-tag">input</span><span class="hljs-selector-attr">[type="file"]</span> {
        <span class="hljs-attribute">display</span>: none;
    }

</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>这样看起来就舒服多了。</p>
<h2 id="articleHeader3">4. 对接OSS</h2>
<p>关于直传，阿里官方给了三种方案：</p>
<ol>
<li><p>客户端 JavaScript 签名后直传；</p></li>
<li><p>客户端申请服务端签名，然后打包上传；</p></li>
<li><p>客户端申请服务端签名，打包上传OSS后回调服务端。</p></li>
</ol>
<p>这里主要用的是第二种。</p>
<p>根据官方给的案例代码，首先要搞个签名用的PHP：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<?php

function gmt_iso8601($time) {
    $dtStr = date(&quot;c&quot;, $time);
    $mydatetime = new DateTime($dtStr);
    $expiration = $mydatetime->format(DateTime::ISO8601);
    $pos = strpos($expiration, '+');
    $expiration = substr($expiration, 0, $pos);
    return $expiration.&quot;Z&quot;;
}

//自行设置AccessKey和相应Bucket的外网域名
$id= 'xxxxxxxxxxx';
$key= 'yyyyyyyyyy';
$host = 'http://zzzzzzz.oss-cn-xxxxxxxxx.aliyuncs.com/';

$now = time();
$expire = 10; //设置该policy超时时间是10s. 即这个policy过了这个有效时间，将不能访问
$end = $now + $expire;
$expiration = gmt_iso8601($end);

//文件大小范围.用户可以自己设置
$condition = array(0=>'content-length-range', 1=>0, 2=>1048576000);

//设置用户上传指定的前缀
$dir = 'test/';
//用户上传数据的位置匹配,这一步不是必须项,只是为了安全起见,防止用户通过policy上传到别人的目录
$start = array(0=>'starts-with', 1=>'$key', 2=>$dir);

//设置bucket
$bucket = array(0=>'eq', 1=>'$bucket', 2=>'gmei');

$conditions = array(0=>$bucket, 1=>$condition, 2=>$start);


$arr = array('expiration'=>$expiration,'conditions'=>$conditions);
//echo json_encode($arr);
//return;
$policy = json_encode($arr);
$base64_policy = base64_encode($policy);
$signature = base64_encode(hash_hmac('sha1', $base64_policy, $key, true));

$response = array(
    'accessid' => $id,
    'host' => $host,
    'policy' => $base64_policy,
    'signature' => $signature,
    'expire' => $end,
    'dir' => $dir.'${filename}'
);

echo json_encode($response);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="php"><span class="hljs-meta">&lt;?php</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">gmt_iso8601</span><span class="hljs-params">($time)</span> </span>{
    $dtStr = date(<span class="hljs-string">"c"</span>, $time);
    $mydatetime = <span class="hljs-keyword">new</span> DateTime($dtStr);
    $expiration = $mydatetime-&gt;format(DateTime::ISO8601);
    $pos = strpos($expiration, <span class="hljs-string">'+'</span>);
    $expiration = substr($expiration, <span class="hljs-number">0</span>, $pos);
    <span class="hljs-keyword">return</span> $expiration.<span class="hljs-string">"Z"</span>;
}

<span class="hljs-comment">//自行设置AccessKey和相应Bucket的外网域名</span>
$id= <span class="hljs-string">'xxxxxxxxxxx'</span>;
$key= <span class="hljs-string">'yyyyyyyyyy'</span>;
$host = <span class="hljs-string">'http://zzzzzzz.oss-cn-xxxxxxxxx.aliyuncs.com/'</span>;

$now = time();
$expire = <span class="hljs-number">10</span>; <span class="hljs-comment">//设置该policy超时时间是10s. 即这个policy过了这个有效时间，将不能访问</span>
$end = $now + $expire;
$expiration = gmt_iso8601($end);

<span class="hljs-comment">//文件大小范围.用户可以自己设置</span>
$condition = <span class="hljs-keyword">array</span>(<span class="hljs-number">0</span>=&gt;<span class="hljs-string">'content-length-range'</span>, <span class="hljs-number">1</span>=&gt;<span class="hljs-number">0</span>, <span class="hljs-number">2</span>=&gt;<span class="hljs-number">1048576000</span>);

<span class="hljs-comment">//设置用户上传指定的前缀</span>
$dir = <span class="hljs-string">'test/'</span>;
<span class="hljs-comment">//用户上传数据的位置匹配,这一步不是必须项,只是为了安全起见,防止用户通过policy上传到别人的目录</span>
$start = <span class="hljs-keyword">array</span>(<span class="hljs-number">0</span>=&gt;<span class="hljs-string">'starts-with'</span>, <span class="hljs-number">1</span>=&gt;<span class="hljs-string">'$key'</span>, <span class="hljs-number">2</span>=&gt;$dir);

<span class="hljs-comment">//设置bucket</span>
$bucket = <span class="hljs-keyword">array</span>(<span class="hljs-number">0</span>=&gt;<span class="hljs-string">'eq'</span>, <span class="hljs-number">1</span>=&gt;<span class="hljs-string">'$bucket'</span>, <span class="hljs-number">2</span>=&gt;<span class="hljs-string">'gmei'</span>);

$conditions = <span class="hljs-keyword">array</span>(<span class="hljs-number">0</span>=&gt;$bucket, <span class="hljs-number">1</span>=&gt;$condition, <span class="hljs-number">2</span>=&gt;$start);


$arr = <span class="hljs-keyword">array</span>(<span class="hljs-string">'expiration'</span>=&gt;$expiration,<span class="hljs-string">'conditions'</span>=&gt;$conditions);
<span class="hljs-comment">//echo json_encode($arr);</span>
<span class="hljs-comment">//return;</span>
$policy = json_encode($arr);
$base64_policy = base64_encode($policy);
$signature = base64_encode(hash_hmac(<span class="hljs-string">'sha1'</span>, $base64_policy, $key, <span class="hljs-keyword">true</span>));

$response = <span class="hljs-keyword">array</span>(
    <span class="hljs-string">'accessid'</span> =&gt; $id,
    <span class="hljs-string">'host'</span> =&gt; $host,
    <span class="hljs-string">'policy'</span> =&gt; $base64_policy,
    <span class="hljs-string">'signature'</span> =&gt; $signature,
    <span class="hljs-string">'expire'</span> =&gt; $end,
    <span class="hljs-string">'dir'</span> =&gt; $dir.<span class="hljs-string">'${filename}'</span>
);

<span class="hljs-keyword">echo</span> json_encode($response);</span></code></pre>
<p>里边的东西填一下，然后保存在同目录下就行。然后改下HTML：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;http://cdn.bootcss.com/jquery/2.2.4/jquery.min.js&quot;></script>
<script src=&quot;localRZ/lrz.bundle.js&quot;></script>
<script>
    $(&quot;#img_input&quot;).on(&quot;change&quot;, function(e) {
        var file = e.target.files[0]; //获取图片资源
        var filename = file.name;

        // 只选择图片文件
        if (!file.type.match('image.*')) {
            return false;
        }
        // LocalResizeIMG写法：
        lrz(file, {width: 200, fieldName: 'osstest'})
            .then(function (rst) {
                // OSS要求把上传文件放到最后一项，但是用LocalResizeIMG输出的FormData，就只能放在
                // 第一项，所以这里要自己new个出来
                var ossData = new FormData();
                // 先请求授权，然后回调
                $.getJSON('ossget.php', function (json) { //签名用的PHP
                    // 添加签名信息
                    ossData.append('OSSAccessKeyId', json.accessid);
                    ossData.append('policy', json.policy);
                    ossData.append('Signature', json.signature);
                    ossData.append('key', json.dir);
                    // 添加文件
                    ossData.append('file', rst.file, filename);

                    $.ajax({
                        url: json.host,
                        data: ossData,
                        processData: false,
                        contentType: false,
                        type: 'POST'
                    }).done(function(){
                        // 成功后显示图片预览
                        var img = new Image();
                        img.src = rst.base64;
                        img.onload = function () {
                            $(&quot;.preview_box&quot;).empty().append(img);
                        };
                    });
                });
                return rst;
            })
            .catch(function (err) {
                // 万一出错了，这里可以捕捉到错误信息
                // 而且以上的then都不会执行
                alert('ERROR:' + err);
            })
            .always(function () {
                // 不管是成功失败，这里都会执行
            });
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://cdn.bootcss.com/jquery/2.2.4/jquery.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"localRZ/lrz.bundle.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-string">"#img_input"</span>).on(<span class="hljs-string">"change"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
        <span class="hljs-keyword">var</span> file = e.target.files[<span class="hljs-number">0</span>]; <span class="hljs-comment">//获取图片资源</span>
        <span class="hljs-keyword">var</span> filename = file.name;

        <span class="hljs-comment">// 只选择图片文件</span>
        <span class="hljs-keyword">if</span> (!file.type.match(<span class="hljs-string">'image.*'</span>)) {
            <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
        }
        <span class="hljs-comment">// LocalResizeIMG写法：</span>
        lrz(file, {<span class="hljs-attr">width</span>: <span class="hljs-number">200</span>, <span class="hljs-attr">fieldName</span>: <span class="hljs-string">'osstest'</span>})
            .then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">rst</span>) </span>{
                <span class="hljs-comment">// OSS要求把上传文件放到最后一项，但是用LocalResizeIMG输出的FormData，就只能放在</span>
                <span class="hljs-comment">// 第一项，所以这里要自己new个出来</span>
                <span class="hljs-keyword">var</span> ossData = <span class="hljs-keyword">new</span> FormData();
                <span class="hljs-comment">// 先请求授权，然后回调</span>
                $.getJSON(<span class="hljs-string">'ossget.php'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">json</span>) </span>{ <span class="hljs-comment">//签名用的PHP</span>
                    <span class="hljs-comment">// 添加签名信息</span>
                    ossData.append(<span class="hljs-string">'OSSAccessKeyId'</span>, json.accessid);
                    ossData.append(<span class="hljs-string">'policy'</span>, json.policy);
                    ossData.append(<span class="hljs-string">'Signature'</span>, json.signature);
                    ossData.append(<span class="hljs-string">'key'</span>, json.dir);
                    <span class="hljs-comment">// 添加文件</span>
                    ossData.append(<span class="hljs-string">'file'</span>, rst.file, filename);

                    $.ajax({
                        <span class="hljs-attr">url</span>: json.host,
                        <span class="hljs-attr">data</span>: ossData,
                        <span class="hljs-attr">processData</span>: <span class="hljs-literal">false</span>,
                        <span class="hljs-attr">contentType</span>: <span class="hljs-literal">false</span>,
                        <span class="hljs-attr">type</span>: <span class="hljs-string">'POST'</span>
                    }).done(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                        <span class="hljs-comment">// 成功后显示图片预览</span>
                        <span class="hljs-keyword">var</span> img = <span class="hljs-keyword">new</span> Image();
                        img.src = rst.base64;
                        img.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                            $(<span class="hljs-string">".preview_box"</span>).empty().append(img);
                        };
                    });
                });
                <span class="hljs-keyword">return</span> rst;
            })
            .catch(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err</span>) </span>{
                <span class="hljs-comment">// 万一出错了，这里可以捕捉到错误信息</span>
                <span class="hljs-comment">// 而且以上的then都不会执行</span>
                alert(<span class="hljs-string">'ERROR:'</span> + err);
            })
            .always(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                <span class="hljs-comment">// 不管是成功失败，这里都会执行</span>
            });
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h2 id="articleHeader4">5. 遗留问题</h2>
<ol>
<li><p><del>OSS返回给客户端的XML没法正常解析</del></p></li>
<li><p><del>返回的XML是报错内容，但是不影响文件的正常上传（文件上传返回的是默认的204）。报错内容是（大意）“[AccessDenied]：The bucket you visit is not belong to you.”，查了下文档说原因是“子用户没有Bucket管理的权限(如getBucketAcl CreateBucket、deleteBucket setBucketReferer、 getBucketReferer等)”，调了半天的 RAM（访问控制）也没弄好，不知道是什么原因~</del></p></li>
</ol>
<h2 id="articleHeader5">6. 2016/8/31 补遗：</h2>
<p>上次留下几个问题，已经解决了，所以过来填坑。</p>
<p>其实这两个问题算是一个问题，在 PostObject 文档里，表单域里有个参数“success_action_status”，描述是“未指定success_action_redirect表单域时，该表单域指定了上传成功后返回给客户端的状态码。 接受值为200, 201, 204（默认）。 如果该域的值为200或者204，OSS返回一个空文档和相应的状态码。 如果该域的值设置为201，OSS返回一个XML文件和201状态码。 如果其值未设置或者设置成一个非法值，OSS返回一个空文档和204状态码。”所以，之前返回不正常的这个问题，只要强行指定返回201状态码，就可以正常收到返回的XML了（并且也没有先前报错的问题了）。</p>
<p>上代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;http://cdn.bootcss.com/jquery/2.2.4/jquery.min.js&quot;></script>
<script src=&quot;localRZ/lrz.bundle.js&quot;></script>
<script>
    $(&quot;#img_input&quot;).on(&quot;change&quot;, function(e) {
        var file = e.target.files[0]; //获取图片资源
        var filename = file.name;

        // 只选择图片文件
        if (!file.type.match('image.*')) {
            return false;
        }
        // LocalResizeIMG写法：
        lrz(file, {width: 200, fieldName: 'osstest'})
            .then(function (rst) {
                var ossData = new FormData();
                // 先请求授权，然后回调
                $.getJSON('ossget.php', function (json) {
                    // 添加配置参数
                    ossData.append('OSSAccessKeyId', json.accessid);
                    ossData.append('policy', json.policy);
                    ossData.append('Signature', json.signature);
                    ossData.append('key', json.dir);
                    ossData.append('success_action_status', 201); // 指定返回的状态码
                    ossData.append('file', rst.file, filename);

                    $.ajax({
                        url: json.host,
                        data: ossData,
                        dataType: 'xml', // 这里加个对返回内容的类型指定
                        processData: false,
                        contentType: false,
                        type: 'POST'
                    }).done(function(data){
                        // 返回的上传信息
                        if ($(data).find('PostResponse')) {
                            var res = $(data).find('PostResponse');
                            console.info('Bucket：' + res.find('Bucket').text() );
                            console.info('Location：' + res.find('Location').text() );
                            console.info('Key：' + res.find('Key').text() );
                            console.info('ETag：' + res.find('ETag').text() );
                        }
                        // 图片预览
                        var img = new Image();
                        img.src = rst.base64;

                        img.onload = function () {
                            $(&quot;.preview_box&quot;).empty().append(img);
                        };
                    });
                });
                return rst;
            })
            .catch(function (err) {
                // 万一出错了，这里可以捕捉到错误信息
                // 而且以上的then都不会执行
                alert('ERROR:'+err);
            })
            .always(function () {
                // 不管是成功失败，这里都会执行
            });

    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://cdn.bootcss.com/jquery/2.2.4/jquery.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"localRZ/lrz.bundle.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-string">"#img_input"</span>).on(<span class="hljs-string">"change"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
        <span class="hljs-keyword">var</span> file = e.target.files[<span class="hljs-number">0</span>]; <span class="hljs-comment">//获取图片资源</span>
        <span class="hljs-keyword">var</span> filename = file.name;

        <span class="hljs-comment">// 只选择图片文件</span>
        <span class="hljs-keyword">if</span> (!file.type.match(<span class="hljs-string">'image.*'</span>)) {
            <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
        }
        <span class="hljs-comment">// LocalResizeIMG写法：</span>
        lrz(file, {<span class="hljs-attr">width</span>: <span class="hljs-number">200</span>, <span class="hljs-attr">fieldName</span>: <span class="hljs-string">'osstest'</span>})
            .then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">rst</span>) </span>{
                <span class="hljs-keyword">var</span> ossData = <span class="hljs-keyword">new</span> FormData();
                <span class="hljs-comment">// 先请求授权，然后回调</span>
                $.getJSON(<span class="hljs-string">'ossget.php'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">json</span>) </span>{
                    <span class="hljs-comment">// 添加配置参数</span>
                    ossData.append(<span class="hljs-string">'OSSAccessKeyId'</span>, json.accessid);
                    ossData.append(<span class="hljs-string">'policy'</span>, json.policy);
                    ossData.append(<span class="hljs-string">'Signature'</span>, json.signature);
                    ossData.append(<span class="hljs-string">'key'</span>, json.dir);
                    ossData.append(<span class="hljs-string">'success_action_status'</span>, <span class="hljs-number">201</span>); <span class="hljs-comment">// 指定返回的状态码</span>
                    ossData.append(<span class="hljs-string">'file'</span>, rst.file, filename);

                    $.ajax({
                        <span class="hljs-attr">url</span>: json.host,
                        <span class="hljs-attr">data</span>: ossData,
                        <span class="hljs-attr">dataType</span>: <span class="hljs-string">'xml'</span>, <span class="hljs-comment">// 这里加个对返回内容的类型指定</span>
                        processData: <span class="hljs-literal">false</span>,
                        <span class="hljs-attr">contentType</span>: <span class="hljs-literal">false</span>,
                        <span class="hljs-attr">type</span>: <span class="hljs-string">'POST'</span>
                    }).done(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
                        <span class="hljs-comment">// 返回的上传信息</span>
                        <span class="hljs-keyword">if</span> ($(data).find(<span class="hljs-string">'PostResponse'</span>)) {
                            <span class="hljs-keyword">var</span> res = $(data).find(<span class="hljs-string">'PostResponse'</span>);
                            <span class="hljs-built_in">console</span>.info(<span class="hljs-string">'Bucket：'</span> + res.find(<span class="hljs-string">'Bucket'</span>).text() );
                            <span class="hljs-built_in">console</span>.info(<span class="hljs-string">'Location：'</span> + res.find(<span class="hljs-string">'Location'</span>).text() );
                            <span class="hljs-built_in">console</span>.info(<span class="hljs-string">'Key：'</span> + res.find(<span class="hljs-string">'Key'</span>).text() );
                            <span class="hljs-built_in">console</span>.info(<span class="hljs-string">'ETag：'</span> + res.find(<span class="hljs-string">'ETag'</span>).text() );
                        }
                        <span class="hljs-comment">// 图片预览</span>
                        <span class="hljs-keyword">var</span> img = <span class="hljs-keyword">new</span> Image();
                        img.src = rst.base64;

                        img.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                            $(<span class="hljs-string">".preview_box"</span>).empty().append(img);
                        };
                    });
                });
                <span class="hljs-keyword">return</span> rst;
            })
            .catch(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err</span>) </span>{
                <span class="hljs-comment">// 万一出错了，这里可以捕捉到错误信息</span>
                <span class="hljs-comment">// 而且以上的then都不会执行</span>
                alert(<span class="hljs-string">'ERROR:'</span>+err);
            })
            .always(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                <span class="hljs-comment">// 不管是成功失败，这里都会执行</span>
            });

    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>最后总结了下，HTTP 一定要学好啊！！（于是哭着滚去看书了……）</p>
<hr>
<p>【参考资料】</p>
<ol>
<li><p><a href="http://www.jquery123.com/jQuery.ajax/" rel="nofollow noreferrer" target="_blank">jQuery手册 - AJAX函数</a></p></li>
<li><p><a href="http://www.zhangxinxu.com/wordpress/2013/10/understand-domstring-document-formdata-blob-file-arraybuffer/" rel="nofollow noreferrer" target="_blank">理解DOMString、Document、FormData、Blob、File、ArrayBuffer数据类型</a></p></li>
<li><p><a href="https://help.aliyun.com/document_detail/31926.html" rel="nofollow noreferrer" target="_blank">对象存储OSS - Web端直传实践：采用服务端签名后直传</a></p></li>
<li><p><a href="https://help.aliyun.com/document_detail/31988.html" rel="nofollow noreferrer" target="_blank">对象存储OSS - API手册 - Post Object</a></p></li>
<li><p><a href="https://help.aliyun.com/knowledge_detail/42976.html" rel="nofollow noreferrer" target="_blank">对象存储OSS - API手册 - PostObject错误及排查</a></p></li>
<li><p><a href="https://market.aliyun.com/products/53690006/cmgj000281.html" rel="nofollow noreferrer" target="_blank">对象存储OSS - OSS控制台客户端Windows版</a></p></li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端图片直传OSS试验

## 原文链接
[https://segmentfault.com/a/1190000006718963](https://segmentfault.com/a/1190000006718963)

