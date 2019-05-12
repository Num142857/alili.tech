---
title: '微信公众号图片上传至阿里云OSS' 
date: 2019-01-26 2:30:18
hidden: true
slug: tglix99doz
categories: [reprint]
---

{{< raw >}}

                    
<p>最近在做微信公众号，需要将图片上传至阿里云OSS。在做这个功能的过程中，我走了不少弯路，尝试过很多种方法，最后终于研究出一种便捷优美的方式。现在把这些方法和思路记录下来，避免遗忘。</p>
<h3 id="articleHeader0">一、通过浏览器直接传给OSS</h3>
<p>这种方式最简单。因为微信公众号的跳转页面是基于QQ浏览器的，所以可以直接使用HTML的<code>input</code>元素选择图片。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input type=&quot;file&quot;, name=&quot;pic&quot;, accept=&quot;image/jpeg&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"file"</span>, <span class="hljs-attr">name</span>=<span class="hljs-string">"pic"</span>, <span class="hljs-attr">accept</span>=<span class="hljs-string">"image/jpeg"</span> /&gt;</span></code></pre>
<p>OSS有一个Post Object的接口允许HTML表单上传文件，除了文件（file）之外，还有一些其他的字段如保存到OSS的路径（key）、策略（policy）、自己的OSS应用的accessKeyId、签名（signature）等。</p>
<p>所以需要构造表单。一般有两种方式：</p>
<h4>1）构造DOM节点，表单提交上传</h4>
<p>像下面代码这样构造form元素，然后利用<code>$('form').submit()</code>提交。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 请求地址由bucket名和oss的区域构成 -->
<form method=&quot;POST&quot; action=&quot;http://bucketname.oss-cn-shenzhen.aliyuncs.com&quot;>
  <input type=&quot;hidden&quot; name=&quot;key&quot; />
  <input type=&quot;hidden&quot; name=&quot;policy&quot; />
  <input type=&quot;hidden&quot; name=&quot;OSSAccessKeyId&quot; />
  <input type=&quot;hidden&quot; name=&quot;success_action_status&quot; /> 
  <input type=&quot;hidden&quot; name=&quot;signature&quot; />
  <input type=&quot;file&quot; name=&quot;file&quot; accept=&quot;image/jpeg&quot; />
</form>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 请求地址由bucket名和oss的区域构成 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">method</span>=<span class="hljs-string">"POST"</span> <span class="hljs-attr">action</span>=<span class="hljs-string">"http://bucketname.oss-cn-shenzhen.aliyuncs.com"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"hidden"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"key"</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"hidden"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"policy"</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"hidden"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"OSSAccessKeyId"</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"hidden"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"success_action_status"</span> /&gt;</span> 
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"hidden"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"signature"</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"file"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"file"</span> <span class="hljs-attr">accept</span>=<span class="hljs-string">"image/jpeg"</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span></code></pre>
<h4>2）利用Html5的FormData对象上传</h4>
<p>像下面这样构造FormData对象，再通过ajax或fetch post表单数据。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const formData = new FormData();
formData.append('key', filePath); // OSS的保存路径
formData.append('policy', policy); // 策略
formData.append('OSSAccessKeyId', accessKeyId); // OSS对象的标识
formData.append('success_action_status', '200'); // 成功返回码
formData.append('signature', signature); // 签名
formData.append('file', file); // 图片文件，$('input[name=&quot;pic&quot;]').files[0]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> formData = <span class="hljs-keyword">new</span> FormData();
formData.append(<span class="hljs-string">'key'</span>, filePath); <span class="hljs-comment">// OSS的保存路径</span>
formData.append(<span class="hljs-string">'policy'</span>, policy); <span class="hljs-comment">// 策略</span>
formData.append(<span class="hljs-string">'OSSAccessKeyId'</span>, accessKeyId); <span class="hljs-comment">// OSS对象的标识</span>
formData.append(<span class="hljs-string">'success_action_status'</span>, <span class="hljs-string">'200'</span>); <span class="hljs-comment">// 成功返回码</span>
formData.append(<span class="hljs-string">'signature'</span>, signature); <span class="hljs-comment">// 签名</span>
formData.append(<span class="hljs-string">'file'</span>, file); <span class="hljs-comment">// 图片文件，$('input[name="pic"]').files[0]</span></code></pre>
<h3 id="articleHeader1">二、服务端下载微信图片再转存至OSS</h3>
<p>上面的方法虽然简单直接，但只能从相册中选择图片，而想要拍摄图片并上传，则必须通过<a href="https://mp.weixin.qq.com/wiki/11/74ad127cc054f6b80759c40f77ec03db.html" rel="nofollow noreferrer" target="_blank">微信JS-SDK</a>来调用相机。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="wx.chooseImage({
  count: 1, // 默认9
  sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
  sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
  success: function (res) {
    // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
    var localIds = res.localIds; 
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">wx.chooseImage({
  <span class="hljs-attr">count</span>: <span class="hljs-number">1</span>, <span class="hljs-comment">// 默认9</span>
  sizeType: [<span class="hljs-string">'original'</span>, <span class="hljs-string">'compressed'</span>], <span class="hljs-comment">// 可以指定是原图还是压缩图，默认二者都有</span>
  sourceType: [<span class="hljs-string">'album'</span>, <span class="hljs-string">'camera'</span>], <span class="hljs-comment">// 可以指定来源是相册还是相机，默认二者都有</span>
  success: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">res</span>) </span>{
    <span class="hljs-comment">// 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片</span>
    <span class="hljs-keyword">var</span> localIds = res.localIds; 
  }
});</code></pre>
<p>这里有个问题，微信JS-SDK选择图片之后返回的是图片的标识id，而不是实际的图片文件，所以不能构造form表单上传OSS。</p>
<p>那该怎么办呢？思路：将图片先上传至微信的服务器（最多保存3天），再通过微信的下载多媒体文件接口（<a href="http://file.api.weixin.qq.com/cgi-bin/media/get?access_token=ACCESS_TOKEN&amp;media_id=MEDIA_ID" rel="nofollow noreferrer" target="_blank">http://file.api.weixin.qq.com...</a>）将图片下载到服务器，再上传至OSS（虽然有点绕，但可行）。</p>
<p>客户端代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="wx.chooseImage({
  count: 1, // 默认9
  sizeType: ['original', 'compressed'],
  sourceType: ['album', 'camera'],
  success: function (res) {
    var localIds = res.localIds;
    wx.uploadImage({
      localId: localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
      isShowProgressTips: 1, // 默认为1，显示进度提示
      success: function (res) {
        var serverId = res.serverId; // 返回图片的服务器端ID
        // do something ...
        // 调用自己搭建的服务端的api，传入serverId，做获取微信图片上传OSS的相关操作
        doSomething();
      }
    });
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">wx.chooseImage({
  <span class="hljs-attr">count</span>: <span class="hljs-number">1</span>, <span class="hljs-comment">// 默认9</span>
  sizeType: [<span class="hljs-string">'original'</span>, <span class="hljs-string">'compressed'</span>],
  <span class="hljs-attr">sourceType</span>: [<span class="hljs-string">'album'</span>, <span class="hljs-string">'camera'</span>],
  <span class="hljs-attr">success</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">res</span>) </span>{
    <span class="hljs-keyword">var</span> localIds = res.localIds;
    wx.uploadImage({
      <span class="hljs-attr">localId</span>: localIds[<span class="hljs-number">0</span>], <span class="hljs-comment">// 需要上传的图片的本地ID，由chooseImage接口获得</span>
      isShowProgressTips: <span class="hljs-number">1</span>, <span class="hljs-comment">// 默认为1，显示进度提示</span>
      success: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">res</span>) </span>{
        <span class="hljs-keyword">var</span> serverId = res.serverId; <span class="hljs-comment">// 返回图片的服务器端ID</span>
        <span class="hljs-comment">// do something ...</span>
        <span class="hljs-comment">// 调用自己搭建的服务端的api，传入serverId，做获取微信图片上传OSS的相关操作</span>
        doSomething();
      }
    });
  }
});</code></pre>
<blockquote><p>小tips：选择图片时只要选择了<code>compressed</code>，微信就会自动帮我们压缩图片，<a href="https://mp.weixin.qq.com/wiki/12/58bfcfabbd501c7cd77c19bd9cfa8354.html" rel="nofollow noreferrer" target="_blank">官方文档</a>也说明上传的多媒体文件会控制格式和大小，其中图片控制在jpg格式和1M以下的大小。所以，基本不用考虑图片过大的问题。实测中，8M的图片压缩后只有120KB左右。</p></blockquote>
<p>服务端的代码经过了3次的演变才完善：</p>
<h4>1）利用fs将图片写到本地</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const fs = require('fs');
const request = require('require');
const OSS = require('ali-oss').Wrapper;

const ossClient = new OSS({
  accessKeyId: 'your access key',
  accessKeySecret: 'your access secret',
  bucket: 'your bucket name',
  region: 'oss-cn-hangzhou'
});

// 需要获取微信accessToken，这里不细说
const accessToken = 'access token';
const mediaId = 'xxxxxxx'; // 微信多媒体文件id
const destPath = `weixin/images/201702/${mediaId}.jpg`; // OSS文件路径，按自己喜欢构造咯
const wxReq = request(`http://file.api.weixin.qq.com/cgi-bin/media/get?access_token=${accessToken }&amp;media_id=${mediaId}`);

// 将文件流pipe到本地文件
wxReq.pipe(fs.createWriteStream(`${mediaId}.jpg`));
wxReq.on('end', () => {
  co(function* () {
    const result = yield ossClient.putStream(destPath, fs.createReadStream(`${mediaId}.jpg`), {timeout: 30 * 60 * 1000});
    console.log('图片上传阿里云结果', result);
    fs.unlink(`${mediaId}.jpg`);
    // res.status(200).json(result);
  }).catch(err => {
    console.warn(err);
    //res.status(500).send('上传文件出错');
  });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>);
<span class="hljs-keyword">const</span> request = <span class="hljs-built_in">require</span>(<span class="hljs-string">'require'</span>);
<span class="hljs-keyword">const</span> OSS = <span class="hljs-built_in">require</span>(<span class="hljs-string">'ali-oss'</span>).Wrapper;

<span class="hljs-keyword">const</span> ossClient = <span class="hljs-keyword">new</span> OSS({
  <span class="hljs-attr">accessKeyId</span>: <span class="hljs-string">'your access key'</span>,
  <span class="hljs-attr">accessKeySecret</span>: <span class="hljs-string">'your access secret'</span>,
  <span class="hljs-attr">bucket</span>: <span class="hljs-string">'your bucket name'</span>,
  <span class="hljs-attr">region</span>: <span class="hljs-string">'oss-cn-hangzhou'</span>
});

<span class="hljs-comment">// 需要获取微信accessToken，这里不细说</span>
<span class="hljs-keyword">const</span> accessToken = <span class="hljs-string">'access token'</span>;
<span class="hljs-keyword">const</span> mediaId = <span class="hljs-string">'xxxxxxx'</span>; <span class="hljs-comment">// 微信多媒体文件id</span>
<span class="hljs-keyword">const</span> destPath = <span class="hljs-string">`weixin/images/201702/<span class="hljs-subst">${mediaId}</span>.jpg`</span>; <span class="hljs-comment">// OSS文件路径，按自己喜欢构造咯</span>
<span class="hljs-keyword">const</span> wxReq = request(<span class="hljs-string">`http://file.api.weixin.qq.com/cgi-bin/media/get?access_token=<span class="hljs-subst">${accessToken }</span>&amp;media_id=<span class="hljs-subst">${mediaId}</span>`</span>);

<span class="hljs-comment">// 将文件流pipe到本地文件</span>
wxReq.pipe(fs.createWriteStream(<span class="hljs-string">`<span class="hljs-subst">${mediaId}</span>.jpg`</span>));
wxReq.on(<span class="hljs-string">'end'</span>, () =&gt; {
  co(<span class="hljs-function"><span class="hljs-keyword">function</span>* (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">yield</span> ossClient.putStream(destPath, fs.createReadStream(<span class="hljs-string">`<span class="hljs-subst">${mediaId}</span>.jpg`</span>), {<span class="hljs-attr">timeout</span>: <span class="hljs-number">30</span> * <span class="hljs-number">60</span> * <span class="hljs-number">1000</span>});
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'图片上传阿里云结果'</span>, result);
    fs.unlink(<span class="hljs-string">`<span class="hljs-subst">${mediaId}</span>.jpg`</span>);
    <span class="hljs-comment">// res.status(200).json(result);</span>
  }).catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.warn(err);
    <span class="hljs-comment">//res.status(500).send('上传文件出错');</span>
  });
});</code></pre>
<p>这种方式需要频繁地写文件和删文件，感觉一点都不极客。</p>
<h4>2）利用memory-streams模块将图片写到内存</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const request = require('require');
const OSS = require('ali-oss').Wrapper;
const streams = require('memory-streams');

const ossClient = new OSS({
  accessKeyId: 'your access key',
  accessKeySecret: 'your access secret',
  bucket: 'your bucket name',
  region: 'oss-cn-hangzhou'
});

const accessToken = 'access token';
const mediaId = 'xxxxxxx'; // 微信多媒体文件id
const destPath = `weixin/images/201702/${mediaId}.jpg`; // OSS文件路径
const writer = new streams.WritableStream();
const wxReq = request(`http://file.api.weixin.qq.com/cgi-bin/media/get?access_token=${accessToken }&amp;media_id=${mediaId}`);

wxReq.pipe(writer);
wxReq.on('end', () => {
  co(function* () {
    const result = yield ossClient.put(destPath, writer.toBuffer(), {timeout: 30 * 60 * 1000});
    console.log('图片上传阿里云结果', result);
    // res.status(200).json(result);
  }).catch(err => {
    console.warn(err);
    //res.status(500).send('上传文件出错');
  });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> request = <span class="hljs-built_in">require</span>(<span class="hljs-string">'require'</span>);
<span class="hljs-keyword">const</span> OSS = <span class="hljs-built_in">require</span>(<span class="hljs-string">'ali-oss'</span>).Wrapper;
<span class="hljs-keyword">const</span> streams = <span class="hljs-built_in">require</span>(<span class="hljs-string">'memory-streams'</span>);

<span class="hljs-keyword">const</span> ossClient = <span class="hljs-keyword">new</span> OSS({
  <span class="hljs-attr">accessKeyId</span>: <span class="hljs-string">'your access key'</span>,
  <span class="hljs-attr">accessKeySecret</span>: <span class="hljs-string">'your access secret'</span>,
  <span class="hljs-attr">bucket</span>: <span class="hljs-string">'your bucket name'</span>,
  <span class="hljs-attr">region</span>: <span class="hljs-string">'oss-cn-hangzhou'</span>
});

<span class="hljs-keyword">const</span> accessToken = <span class="hljs-string">'access token'</span>;
<span class="hljs-keyword">const</span> mediaId = <span class="hljs-string">'xxxxxxx'</span>; <span class="hljs-comment">// 微信多媒体文件id</span>
<span class="hljs-keyword">const</span> destPath = <span class="hljs-string">`weixin/images/201702/<span class="hljs-subst">${mediaId}</span>.jpg`</span>; <span class="hljs-comment">// OSS文件路径</span>
<span class="hljs-keyword">const</span> writer = <span class="hljs-keyword">new</span> streams.WritableStream();
<span class="hljs-keyword">const</span> wxReq = request(<span class="hljs-string">`http://file.api.weixin.qq.com/cgi-bin/media/get?access_token=<span class="hljs-subst">${accessToken }</span>&amp;media_id=<span class="hljs-subst">${mediaId}</span>`</span>);

wxReq.pipe(writer);
wxReq.on(<span class="hljs-string">'end'</span>, () =&gt; {
  co(<span class="hljs-function"><span class="hljs-keyword">function</span>* (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">yield</span> ossClient.put(destPath, writer.toBuffer(), {<span class="hljs-attr">timeout</span>: <span class="hljs-number">30</span> * <span class="hljs-number">60</span> * <span class="hljs-number">1000</span>});
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'图片上传阿里云结果'</span>, result);
    <span class="hljs-comment">// res.status(200).json(result);</span>
  }).catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.warn(err);
    <span class="hljs-comment">//res.status(500).send('上传文件出错');</span>
  });
});</code></pre>
<p>这种方式将图片暂存在内存里面，那如果并发量很大，是不是内存要爆炸了都？感觉还是不可取。</p>
<h4>3）将下载图片的流直接写入OSS文件</h4>
<p>折腾了好久，发现原来可以这么简单和优雅：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const request = require('require');
const OSS = require('ali-oss').Wrapper;

const ossClient = new OSS({
  accessKeyId: 'your access key',
  accessKeySecret: 'your access secret',
  bucket: 'your bucket name',
  region: 'oss-cn-hangzhou'
});

const accessToken = 'access token';
const mediaId = 'xxxxxxx'; // 微信多媒体文件id
const destPath = `weixin/images/201702/${mediaId}.jpg`; // OSS文件路径
const wxReq = request(`http://file.api.weixin.qq.com/cgi-bin/media/get?access_token=${accessToken }&amp;media_id=${mediaId}`);

wxReq.on('response', (response) => {
  // request的响应结果response可以作为读取流传给ossClient
  co(function* () {
    const result = yield ossClient.putStream(destPath, response, {timeout: 30 * 60 * 1000});
    console.log('图片上传阿里云结果', result);
    // res.status(200).json(result);
  }).catch(err => {
    console.warn(err);
    //res.status(500).send('上传文件出错');
  });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> request = <span class="hljs-built_in">require</span>(<span class="hljs-string">'require'</span>);
<span class="hljs-keyword">const</span> OSS = <span class="hljs-built_in">require</span>(<span class="hljs-string">'ali-oss'</span>).Wrapper;

<span class="hljs-keyword">const</span> ossClient = <span class="hljs-keyword">new</span> OSS({
  <span class="hljs-attr">accessKeyId</span>: <span class="hljs-string">'your access key'</span>,
  <span class="hljs-attr">accessKeySecret</span>: <span class="hljs-string">'your access secret'</span>,
  <span class="hljs-attr">bucket</span>: <span class="hljs-string">'your bucket name'</span>,
  <span class="hljs-attr">region</span>: <span class="hljs-string">'oss-cn-hangzhou'</span>
});

<span class="hljs-keyword">const</span> accessToken = <span class="hljs-string">'access token'</span>;
<span class="hljs-keyword">const</span> mediaId = <span class="hljs-string">'xxxxxxx'</span>; <span class="hljs-comment">// 微信多媒体文件id</span>
<span class="hljs-keyword">const</span> destPath = <span class="hljs-string">`weixin/images/201702/<span class="hljs-subst">${mediaId}</span>.jpg`</span>; <span class="hljs-comment">// OSS文件路径</span>
<span class="hljs-keyword">const</span> wxReq = request(<span class="hljs-string">`http://file.api.weixin.qq.com/cgi-bin/media/get?access_token=<span class="hljs-subst">${accessToken }</span>&amp;media_id=<span class="hljs-subst">${mediaId}</span>`</span>);

wxReq.on(<span class="hljs-string">'response'</span>, (response) =&gt; {
  <span class="hljs-comment">// request的响应结果response可以作为读取流传给ossClient</span>
  co(<span class="hljs-function"><span class="hljs-keyword">function</span>* (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">yield</span> ossClient.putStream(destPath, response, {<span class="hljs-attr">timeout</span>: <span class="hljs-number">30</span> * <span class="hljs-number">60</span> * <span class="hljs-number">1000</span>});
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'图片上传阿里云结果'</span>, result);
    <span class="hljs-comment">// res.status(200).json(result);</span>
  }).catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.warn(err);
    <span class="hljs-comment">//res.status(500).send('上传文件出错');</span>
  });
});</code></pre>
<p>这种方式省去了前面两种方式的中间步骤，更加简练直接，个人认为是最好的。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
微信公众号图片上传至阿里云OSS

## 原文链接
[https://segmentfault.com/a/1190000008352305](https://segmentfault.com/a/1190000008352305)

