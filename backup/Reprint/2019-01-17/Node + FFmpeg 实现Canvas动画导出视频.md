---
title: 'Node + FFmpeg 实现Canvas动画导出视频' 
date: 2019-01-17 2:30:25
hidden: true
slug: vzbi2dm9la
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">导言</h2>
<p>Canvas为前端提供了动画展示的平台，随着现在视频娱乐的流行，你是否想过把Canvas动画导出视频？目前纯前端的视频编码转换（例如WebM Encoder <a href="https://github.com/antimatter15/whammy" rel="nofollow noreferrer" target="_blank">Whammy</a>）还存在许多限制，较为成熟的方案是将每帧图片传给后端实现，由后端调用FFmpeg进行视频转码。整体流程并不复杂，这篇文章将带大家实现这个过程。</p>
<h2 id="articleHeader1">整体方案</h2>
<ul>
<li><p>由前端记录Canvas动画的每帧图像，以base64字符串形式传给后端</p></li>
<li><p>利用node fluent-ffmpeg模块，调用FFmpeg将图片合并成视频，并将视频存储在server端，并返回相应下载url</p></li>
<li><p>前端通过请求得到视频文件</p></li>
</ul>
<h2 id="articleHeader2">前端部分</h2>
<h3 id="articleHeader3">每帧图片生成</h3>
<p>图片生成可以通过canvas原生接口toDataURL实现，最终返回base64形式的图像数据。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="generatePng () {
  ...
  var imgData = canvas.toDataURL(&quot;image/png&quot;);
  return imgData;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>generatePng () {
  ...
  <span class="hljs-keyword">var</span> imgData = canvas.toDataURL(<span class="hljs-string">"image/png"</span>);
  <span class="hljs-keyword">return</span> imgData;
}</code></pre>
<h3 id="articleHeader4">动画录制与图片流传输</h3>
<p>动画的记录与传送是个异步过程，这里返回一个Promise，等待后端处理完毕，收到回应后，即完成此异步过程。</p>
<p>以下代码将canvas每帧动画信息存入一个图片数组imgs中，将数组转成字符串的形式传给后端。注意这里contentType设置为“text/plain”。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="generateVideo () {
  var that = this;
  return new Promise (
    function (resolve, reject) {
      var imgs = [];
      ...
      window.requestAnimationFrame(that.recordTick.bind(that, imgs, resolve, reject));
    }
  )
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livescript"><code>generateVideo () {
  <span class="hljs-keyword">var</span> <span class="hljs-literal">that</span> = <span class="hljs-keyword">this</span>;
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Promise (
    <span class="hljs-keyword">function</span> (resolve, reject) {
      <span class="hljs-keyword">var</span> imgs = [];
      ...
      <span class="hljs-built_in">window</span>.requestAnimationFrame(<span class="hljs-literal">that</span>.recordTick.bind(<span class="hljs-literal">that</span>, imgs, resolve, reject));
    }
  )
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="recordTick (imgs, resolve, reject) {
  ...//每帧动画的记录信息，如时间戳等

  if (...) {//动画终止条件
    this.stopPlay();
    imgs.push(this.generatePng());
    $.ajax({
      url: '/video/record',
      data: imgs.join(' '),
      method: 'POST',
      contentType: 'text/plain',
      success: function (data, textStatus, jqXHR) {
        resolve(data);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        reject(errorThrown);
      }
    });
  } else {
    ...//每帧动画展示的代码

    imgs.push(this.generatePng());
    window.requestAnimationFrame(this.recordTick.bind(this, imgs, resolve, reject));
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>recordTick (imgs, resolve, reject) {
  ...<span class="hljs-comment">//每帧动画的记录信息，如时间戳等</span>

  <span class="hljs-keyword">if</span> (...) {<span class="hljs-comment">//动画终止条件</span>
    <span class="hljs-keyword">this</span>.stopPlay();
    imgs.push(<span class="hljs-keyword">this</span>.generatePng());
    $.ajax({
      <span class="hljs-attr">url</span>: <span class="hljs-string">'/video/record'</span>,
      <span class="hljs-attr">data</span>: imgs.join(<span class="hljs-string">' '</span>),
      <span class="hljs-attr">method</span>: <span class="hljs-string">'POST'</span>,
      <span class="hljs-attr">contentType</span>: <span class="hljs-string">'text/plain'</span>,
      <span class="hljs-attr">success</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">data, textStatus, jqXHR</span>) </span>{
        resolve(data);
      },
      <span class="hljs-attr">error</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">jqXHR, textStatus, errorThrown</span>) </span>{
        reject(errorThrown);
      }
    });
  } <span class="hljs-keyword">else</span> {
    ...<span class="hljs-comment">//每帧动画展示的代码</span>

    imgs.push(<span class="hljs-keyword">this</span>.generatePng());
    <span class="hljs-built_in">window</span>.requestAnimationFrame(<span class="hljs-keyword">this</span>.recordTick.bind(<span class="hljs-keyword">this</span>, imgs, resolve, reject));
  }
}</code></pre>
<h3 id="articleHeader5">视频下载</h3>
<p>上一节代码中，动画停止时，会通过post请求给后端传送所有图片数据，后端处理完毕后，返回数据中包含一个url，此url即为视频文件的下载地址。</p>
<p>为了支持浏览器端用户点击下载，我们需要用到a标签的download属性，此属性可以支持点击a标签后下载指定文件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="editor.generateVideo().then(function (data) {
  videoRecordingModal.setDownloadLink(data.url, data.filename);
  videoRecordingModal.changeStatus('recorded');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code>editor.generateVideo().<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span></span> (<span class="hljs-keyword">data</span>) {
  videoRecordingModal.setDownloadLink(<span class="hljs-keyword">data</span>.url, <span class="hljs-keyword">data</span>.filename);
  videoRecordingModal.changeStatus(<span class="hljs-string">'recorded'</span>);
});</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setDownloadLink: function (url, filename) {
  this.config.$dom.find('.video-download').attr('href', url);
  this.config.$dom.find('.video-download').attr('download', filename);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>setDownloadLink: function (url, filename) {
  <span class="hljs-keyword">this</span>.<span class="hljs-built_in">config</span>.$dom.<span class="hljs-built_in">find</span>(<span class="hljs-string">'.video-download'</span>).attr(<span class="hljs-string">'href'</span>, url);
  <span class="hljs-keyword">this</span>.<span class="hljs-built_in">config</span>.$dom.<span class="hljs-built_in">find</span>(<span class="hljs-string">'.video-download'</span>).attr(<span class="hljs-string">'download'</span>, filename);
}</code></pre>
<h2 id="articleHeader6">后端部分</h2>
<h3 id="articleHeader7">图片序列生成</h3>
<p>接收到前端传送的图片数据后，我们首先需要将图片解析、存储在服务器中，我们建立以当前时间戳命名的文件夹，将图片序列以一定格式存储于其中。由于每张图片写入都是异步过程，为确保所有图片都已处理完毕后，才执行视频转码过程，我们需要用到Promise.all。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise.all(imgs.map(function (value, index) {
  var img = decodeBase64Image(value)
  var data = img.data
  var type = img.type
  return new Promise(function (resolve, reject) {
    fs.writeFile(path.resolve(__dirname, (folder + '/img' + index + '.' + type)), data, 'base64', function(err) {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
})).then(function () {
  …//视频转码
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Promise</span>.all(imgs.map(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">value, index</span>) </span>{
  <span class="hljs-keyword">var</span> img = decodeBase64Image(value)
  <span class="hljs-keyword">var</span> data = img.data
  <span class="hljs-keyword">var</span> type = img.type
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve, reject</span>) </span>{
    fs.writeFile(path.resolve(__dirname, (folder + <span class="hljs-string">'/img'</span> + index + <span class="hljs-string">'.'</span> + type)), data, <span class="hljs-string">'base64'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>) </span>{
      <span class="hljs-keyword">if</span> (err) {
        reject(err)
      } <span class="hljs-keyword">else</span> {
        resolve()
      }
    })
  })
})).then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  …<span class="hljs-comment">//视频转码</span>
})</code></pre>
<p>其中decodeBase64Image函数参考<a href="http://stackoverflow.com/questions/20267939/nodejs-write-base64-image-file" rel="nofollow noreferrer" target="_blank">这里</a>。</p>
<h3 id="articleHeader8">视频生成</h3>
<p>视频生成利用FFmpeg转码工具。<br>首先确保server端安装了FFmpeg</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="brew install ffmpeg" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">brew </span><span class="hljs-keyword">install </span>ffmpeg</code></pre>
<p>在项目中安装fluent-ffmpeg，这是node调用ffmpeg的接口模块</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install fluent-ffmpeg --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> fluent-ffmpeg <span class="hljs-comment">--save</span></code></pre>
<p>结合上一节图片序列存储的代码，整个接口代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.post('/video/record', function(req, res) {
  var imgs = req.text.split(' ')
  var timeStamp = Date.now()
  var folder = 'images/' + timeStamp
  if (!fs.existsSync(resolve(folder))){
    fs.mkdirSync(resolve(folder));
  }

  Promise.all(imgs.map(function (value, index) {
    var img = decodeBase64Image(value)
    var data = img.data
    var type = img.type
    return new Promise(function (resolve, reject) {
      fs.writeFile(path.resolve(__dirname, (folder + '/img' + index + '.' + type)), data, 'base64', function(err) {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  })).then(function () {
    var proc = new ffmpeg({ source: resolve(folder + '/img%d.png'), nolog: true })
      .withFps(25)
      .on('end', function() {
        res.status(200)
        res.send({
          url: '/video/mpeg/' + timeStamp,
          filename: 'jianshi' + timeStamp + '.mpeg'
        })
      })
      .on('error', function(err) {
        console.log('ERR: ' + err.message)
      })
      .saveToFile(resolve('video/jianshi' + timeStamp + '.mpeg'))
  })
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>app.post(<span class="hljs-string">'/video/record'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{
  <span class="hljs-keyword">var</span> imgs = req.text.split(<span class="hljs-string">' '</span>)
  <span class="hljs-keyword">var</span> timeStamp = <span class="hljs-built_in">Date</span>.now()
  <span class="hljs-keyword">var</span> folder = <span class="hljs-string">'images/'</span> + timeStamp
  <span class="hljs-keyword">if</span> (!fs.existsSync(resolve(folder))){
    fs.mkdirSync(resolve(folder));
  }

  <span class="hljs-built_in">Promise</span>.all(imgs.map(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">value, index</span>) </span>{
    <span class="hljs-keyword">var</span> img = decodeBase64Image(value)
    <span class="hljs-keyword">var</span> data = img.data
    <span class="hljs-keyword">var</span> type = img.type
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve, reject</span>) </span>{
      fs.writeFile(path.resolve(__dirname, (folder + <span class="hljs-string">'/img'</span> + index + <span class="hljs-string">'.'</span> + type)), data, <span class="hljs-string">'base64'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>) </span>{
        <span class="hljs-keyword">if</span> (err) {
          reject(err)
        } <span class="hljs-keyword">else</span> {
          resolve()
        }
      })
    })
  })).then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> proc = <span class="hljs-keyword">new</span> ffmpeg({ <span class="hljs-attr">source</span>: resolve(folder + <span class="hljs-string">'/img%d.png'</span>), <span class="hljs-attr">nolog</span>: <span class="hljs-literal">true</span> })
      .withFps(<span class="hljs-number">25</span>)
      .on(<span class="hljs-string">'end'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        res.status(<span class="hljs-number">200</span>)
        res.send({
          <span class="hljs-attr">url</span>: <span class="hljs-string">'/video/mpeg/'</span> + timeStamp,
          <span class="hljs-attr">filename</span>: <span class="hljs-string">'jianshi'</span> + timeStamp + <span class="hljs-string">'.mpeg'</span>
        })
      })
      .on(<span class="hljs-string">'error'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'ERR: '</span> + err.message)
      })
      .saveToFile(resolve(<span class="hljs-string">'video/jianshi'</span> + timeStamp + <span class="hljs-string">'.mpeg'</span>))
  })
})</code></pre>
<h3 id="articleHeader9">视频下载</h3>
<p>最终将视频文件传输给前端的接口代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.get('/video/mpeg/:timeStamp', function(req, res) {
  res.contentType('mpeg');
  var rstream = fs.createReadStream(resolve('video/jianshi' + req.params.timeStamp + '.mpeg'));
  rstream.pipe(res, {end: true});
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>app.get(<span class="hljs-string">'/video/mpeg/:timeStamp'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(req, res)</span> </span>{
  res.contentType(<span class="hljs-string">'mpeg'</span>);
  <span class="hljs-keyword">var</span> rstream = fs.createReadStream(resolve(<span class="hljs-string">'video/jianshi'</span> + req.params.timeStamp + <span class="hljs-string">'.mpeg'</span>));
  rstream.pipe(res, {end: <span class="hljs-literal">true</span>});
})</code></pre>
<h2 id="articleHeader10">效果预览</h2>
<p><span class="img-wrap"><img data-src="/img/bVLEIb?w=1275&amp;h=749" src="https://static.alili.tech/img/bVLEIb?w=1275&amp;h=749" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>注：此功能是个人项目”简诗”的一部分，完整代码可以查看<a href="https://github.com/moyuer1992/jianshi" rel="nofollow noreferrer" target="_blank">https://github.com/moyuer1992...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Node + FFmpeg 实现Canvas动画导出视频

## 原文链接
[https://segmentfault.com/a/1190000008935586](https://segmentfault.com/a/1190000008935586)

