---
title: '一步一步搭建一个图片上传网站（后台服务器用nodejs）' 
date: 2019-01-15 2:30:12
hidden: true
slug: gzau4cf1qps
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>前几天看了腾讯云社区的一个文件上传的文章<a href="https://www.qcloud.com/community/article/985614?fromSource=gwzcw.114038.114038.114038" rel="nofollow noreferrer" target="_blank">文件上传那些事儿</a>，大体上讲了以下h5中图片上传的几个核心原理，但是没有后端接受的服务器代码，没法做测试。也没有具体的一个实例都是一些基本的原理片段，并且ui界面也不好看，我就准备给那篇文章作为补充做一个图片上传网站。<br>效果如图：</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVNfBp?w=425&amp;h=207" src="https://static.alili.tech/img/bVNfBp?w=425&amp;h=207" alt="效果1" title="效果1" style="cursor: pointer; display: inline;"></span><span class="img-wrap"><img data-src="/img/bVNfBu?w=984&amp;h=314" src="https://static.alili.tech/img/bVNfBu?w=984&amp;h=314" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>点击上传后，会把文件放到后台一个uploads文件夹下面，如果上传成功，那么页面会 弹出一个上传成功的提示框，如果上传失败，会弹出一个失败的提示框，如果网速比较慢，会显示出上传过程中的进度条。</p>
<h1 id="articleHeader0">开发准备</h1>
<h2 id="articleHeader1">用普通的表单提交方法实现文件上传。</h2>
<p>1.编写前端代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<form action=&quot;uploadimg&quot; method=&quot;POST&quot; enctype=&quot;multipart/form-data&quot;>
        <input type=&quot;file&quot; name=&quot;imgfile&quot; multiple>
        <input type=&quot;submit&quot; value=&quot;提交&quot;>
    </form>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs accesslog"><code>&lt;form action=<span class="hljs-string">"uploadimg"</span> method=<span class="hljs-string">"<span class="hljs-keyword">POST</span>"</span> enctype=<span class="hljs-string">"multipart/form-data"</span>&gt;
        &lt;input type=<span class="hljs-string">"file"</span> name=<span class="hljs-string">"imgfile"</span> multiple&gt;
        &lt;input type=<span class="hljs-string">"submit"</span> value=<span class="hljs-string">"提交"</span>&gt;
    &lt;/form&gt;</code></pre>
<ul>
<li><p>设置action为提交地址，<code>enctype="multipart/form-data"</code></p></li>
<li><p>设置提交文件表单域名为<code>imgfile</code></p></li>
</ul>
<p>2.编写后端测试用代码</p>
<ul><li><p>这里我们采用了express框架，需要先安装这个框架，然后使用静态中间件指定放置我们js css html 文件的目录</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var app = express();
app.use(express.static('dist'))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-keyword">var</span> app = express();
app.<span class="hljs-keyword">use</span>(express.<span class="hljs-keyword">static</span>(<span class="hljs-string">'dist'</span>))</code></pre>
<ul><li><p>下载处理上传文件的插件<code>multer</code><br>在readme.md文件中有基本的使用方法，我们复制过来代码实例稍微改改就可以使用了。把文件上传路径指定到uploads,然后用当前日期和文件名命名上传过来的文件。这个imgfile域名必须严格和前端表单文件域名对应起来。</p></li></ul>
<p>完整代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;use strict&quot;;
exports.__esModule = true;
var express = require(&quot;express&quot;);
var multer = require(&quot;multer&quot;);
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },
    filename: function(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})
var upload = multer({ storage: storage });
var app = express();
app.use(express.static('dist'));
//var cpUpload = upload.fields([{ name: 'imgfile', maxCount: 12 }])
app.post('/uploadimg', upload.array('imgfile', 40), function(req, res, next) {
    var files = req.files
    console.log(files)
    if (!files[0]) {
        res.send('error');
    } else {
        res.send('success');
    }



    console.log(files);
})

var server = app.listen(9999, 'localhost', function() {
    console.log('server is running at port 9999...');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-meta">"use strict"</span>;
exports.__esModule = <span class="hljs-literal">true</span>;
<span class="hljs-keyword">var</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">"express"</span>);
<span class="hljs-keyword">var</span> multer = <span class="hljs-built_in">require</span>(<span class="hljs-string">"multer"</span>);
<span class="hljs-keyword">var</span> storage = multer.diskStorage({
    <span class="hljs-attr">destination</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, file, cb</span>) </span>{
        cb(<span class="hljs-literal">null</span>, <span class="hljs-string">'./uploads'</span>);
    },
    <span class="hljs-attr">filename</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, file, cb</span>) </span>{
        cb(<span class="hljs-literal">null</span>, <span class="hljs-string">`<span class="hljs-subst">${<span class="hljs-built_in">Date</span>.now()}</span>-<span class="hljs-subst">${file.originalname}</span>`</span>)
    }
})
<span class="hljs-keyword">var</span> upload = multer({ <span class="hljs-attr">storage</span>: storage });
<span class="hljs-keyword">var</span> app = express();
app.use(express.static(<span class="hljs-string">'dist'</span>));
<span class="hljs-comment">//var cpUpload = upload.fields([{ name: 'imgfile', maxCount: 12 }])</span>
app.post(<span class="hljs-string">'/uploadimg'</span>, upload.array(<span class="hljs-string">'imgfile'</span>, <span class="hljs-number">40</span>), <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res, next</span>) </span>{
    <span class="hljs-keyword">var</span> files = req.files
    <span class="hljs-built_in">console</span>.log(files)
    <span class="hljs-keyword">if</span> (!files[<span class="hljs-number">0</span>]) {
        res.send(<span class="hljs-string">'error'</span>);
    } <span class="hljs-keyword">else</span> {
        res.send(<span class="hljs-string">'success'</span>);
    }



    <span class="hljs-built_in">console</span>.log(files);
})

<span class="hljs-keyword">var</span> server = app.listen(<span class="hljs-number">9999</span>, <span class="hljs-string">'localhost'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'server is running at port 9999...'</span>);
});</code></pre>
<p>这样选择文件，点击提交按钮后文件就被上传到了服务器uploads文件夹下</p>
<h2 id="articleHeader2">用H5和ajax技术实现无刷新文件上传</h2>
<p>1.改造原来的选择文件按钮，让它变成一个可爱的小图标，点击后选择文件。<br>这个过于简单就不放代码了，具体思路是把一个a标签放上背景图片，把上传文件<code>input type="file"</code>大小设置成a标签一样大，并且放置到a标签上面，opacity设置成0透明的。点击a实际上是点击了<code>input type="file"</code><br>2.选取文件后生成缩略图，这个基本思路是监听<code>input type="file"</code>的onchange事件，如果选了文件就利用FileReader生成一个图片data:url添加到div.preview里面动态生成的img上，给div.preview设置成flex布局就可以灵活放置预览图了。<br>html</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <div class=&quot;wrap&quot;>

        <a href=&quot;&quot; class=&quot;selectImg&quot; title=&quot;上传图片&quot;></a>
        <input type=&quot;file&quot; multiple id=&quot;file&quot;>
        <input type=&quot;button&quot; value=&quot;上传&quot; id=&quot;upload&quot;>
        <div class=&quot;preview&quot;></div>
        <div class=&quot;progress&quot;>
            <progress max=&quot;100&quot; value=&quot;1&quot; item-width=&quot;100&quot; id=&quot;progress&quot;></progress>
        </div>
    </div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"wrap"</span>&gt;

        &lt;a href=<span class="hljs-string">""</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"selectImg"</span> title=<span class="hljs-string">"上传图片"</span>&gt;&lt;/a&gt;
        &lt;input type=<span class="hljs-string">"file"</span> multiple <span class="hljs-built_in">id</span>=<span class="hljs-string">"file"</span>&gt;
        &lt;input type=<span class="hljs-string">"button"</span> value=<span class="hljs-string">"上传"</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">"upload"</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"preview"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"progress"</span>&gt;
            &lt;progress max=<span class="hljs-string">"100"</span> value=<span class="hljs-string">"1"</span> <span class="hljs-built_in">item</span>-width=<span class="hljs-string">"100"</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">"progress"</span>&gt;&lt;/progress&gt;
        &lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<p>js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   fileinput.onchange = () => {
            //console.log('dddd')
            var files = fileinput.files
            let imgDOMArray = new Array(files.length)
            let reader = []
            let thumbPic = []
            progressDOM = document.getElementById('progress-img')
            for (let i = 0; i < files.length; i++) {
                reader[i] = new FileReader()
                thumbPic[i] = document.createElement('div')
                imgDOMArray[i] = document.createElement('img')
                imgDOMArray[i].file = files[i]
                thumbPic[i].className = 'thumbPic'
                thumbPic[i].appendChild(imgDOMArray[i])
                previewDOM.appendChild(thumbPic[i])
                reader[i].readAsDataURL(files[i])
                reader[i].onload = (img => {

                    return e =>img.src = e.target.result
                    
                })(imgDOMArray[i])

            }
        }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>   fileinput.onchange = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            <span class="hljs-comment">//console.log('dddd')</span>
            <span class="hljs-keyword">var</span> files = fileinput.files
            <span class="hljs-keyword">let</span> imgDOMArray = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>(files.length)
            <span class="hljs-keyword">let</span> reader = []
            <span class="hljs-keyword">let</span> thumbPic = []
            progressDOM = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'progress-img'</span>)
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; files.length; i++) {
                reader[i] = <span class="hljs-keyword">new</span> FileReader()
                thumbPic[i] = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'div'</span>)
                imgDOMArray[i] = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'img'</span>)
                imgDOMArray[i].file = files[i]
                thumbPic[i].className = <span class="hljs-string">'thumbPic'</span>
                thumbPic[i].appendChild(imgDOMArray[i])
                previewDOM.appendChild(thumbPic[i])
                reader[i].readAsDataURL(files[i])
                reader[i].onload = (<span class="hljs-function"><span class="hljs-params">img</span> =&gt;</span> {

                    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span>img.src = e.target.result
                    
                })(imgDOMArray[i])

            }
        }</code></pre>
<p>3.点击上传按钮上传图片<br>这个基本思路就是利用Formdata模拟表单，然后用ajax发送文件到服务器</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        var aUpload = document.querySelector('.selectImg')
        var button = document.querySelector('#upload')
        var fileinput = document.getElementById('file')
        button.onclick = uploadFile
         function uploadFile() {
            //  console.log('ddd')
            var xhr = new XMLHttpRequest()
            var formdata = new FormData()

            var files = fileinput.files
            if (!files[0]) {
                alert('请先选择图片，再上传！')
                return
            }

            var progress = document.querySelector('progress')
            for (let i = 0; i < files.length; i++) {
                formdata.append('imgfile', files[i], files[i].name)
            }
            xhr.open('POST', '/uploadimg')
            xhr.onload = () => {
                if (xhr.status === 200 &amp;&amp; xhr.responseText === 'success') {
                    previewDOM.innerHTML = ''
                    xhr = null
                    alert('图片上传成功！')
                }
            }
            xhr.send(formdata)
            xhr.upload.onprogress = e => {
                if (e.lengthComputable) {
                    var progressWrap = document.querySelector('.progress')
                    progressWrap.style.display = &quot;flex&quot;
                    var percentComplete = e.loaded / e.total * 100
                    progress.value = percentComplete

                    if (percentComplete >= 100) {
                        progress.value = 0
                        progressWrap.style.display = &quot;none&quot;
                    }
                }
            }

        }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>        <span class="hljs-keyword">var</span> aUpload = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.selectImg'</span>)
        <span class="hljs-keyword">var</span> button = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'#upload'</span>)
        <span class="hljs-keyword">var</span> fileinput = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'file'</span>)
        button.onclick = uploadFile
         <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">uploadFile</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">//  console.log('ddd')</span>
            <span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest()
            <span class="hljs-keyword">var</span> formdata = <span class="hljs-keyword">new</span> FormData()

            <span class="hljs-keyword">var</span> files = fileinput.files
            <span class="hljs-keyword">if</span> (!files[<span class="hljs-number">0</span>]) {
                alert(<span class="hljs-string">'请先选择图片，再上传！'</span>)
                <span class="hljs-keyword">return</span>
            }

            <span class="hljs-keyword">var</span> progress = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'progress'</span>)
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; files.length; i++) {
                formdata.append(<span class="hljs-string">'imgfile'</span>, files[i], files[i].name)
            }
            xhr.open(<span class="hljs-string">'POST'</span>, <span class="hljs-string">'/uploadimg'</span>)
            xhr.onload = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
                <span class="hljs-keyword">if</span> (xhr.status === <span class="hljs-number">200</span> &amp;&amp; xhr.responseText === <span class="hljs-string">'success'</span>) {
                    previewDOM.innerHTML = <span class="hljs-string">''</span>
                    xhr = <span class="hljs-literal">null</span>
                    alert(<span class="hljs-string">'图片上传成功！'</span>)
                }
            }
            xhr.send(formdata)
            xhr.upload.onprogress = <span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> {
                <span class="hljs-keyword">if</span> (e.lengthComputable) {
                    <span class="hljs-keyword">var</span> progressWrap = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.progress'</span>)
                    progressWrap.style.display = <span class="hljs-string">"flex"</span>
                    <span class="hljs-keyword">var</span> percentComplete = e.loaded / e.total * <span class="hljs-number">100</span>
                    progress.value = percentComplete

                    <span class="hljs-keyword">if</span> (percentComplete &gt;= <span class="hljs-number">100</span>) {
                        progress.value = <span class="hljs-number">0</span>
                        progressWrap.style.display = <span class="hljs-string">"none"</span>
                    }
                }
            }

        }</code></pre>
<p>其中利用了xhr.upload.onprogress监听数据上传事件，并且动态设置h5进度条的value显示上传进度。如果上传完成，隐藏进度条。<br>如果服务器返回的是success，就弹出上传图片成功。否则弹出上传图片失败。</p>
<hr>
<p><strong>总结</strong><br>前端利用了FileReader 的readAsDataUrl显示缩略图，利用H5 progress标签和监听xhr.upload.onprogress显示进度条。利用FormData模拟表单数据，用ajax技术提交到服务器。<br>后端利用express建立服务器，利用static中间件指定js css html 文件路径。用multer模块实现了解析存储通过<code>input typle="file"</code>提交的数据。<br>利用这个前端ajax和后端nodejs技术，我们基本上就可以做出一个图片上传存储的基本网站核心。如果数据量比较大我们就可以采用数据库存储索引搜索，不过这已经跟前端没啥关系就不展开讲了。</p>
<hr>
<p><a href="https://github.com/liyu2012/fileupload" rel="nofollow noreferrer" target="_blank">获取代码</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
一步一步搭建一个图片上传网站（后台服务器用nodejs）

## 原文链接
[https://segmentfault.com/a/1190000009316054](https://segmentfault.com/a/1190000009316054)

