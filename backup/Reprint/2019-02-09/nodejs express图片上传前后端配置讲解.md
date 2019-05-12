---
title: 'nodejs express图片上传前后端配置讲解' 
date: 2019-02-09 2:30:58
hidden: true
slug: yh17w6ayiub
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">nodejs图片上传</h2>
<p>nodejs一般开发网站基本都用express框架，本文也主要以express为例，讲解如何上传图片；<br>express本身没有上传图片功能；一般都是集成相应的模块；常用的有multer中间件和formidable中间件，前一个我配置的时候总是出错，所以pass；此处主要演示formidable的用法；</p>
<h4>首先前端页面配置，无非两种，</h4>
<p>-表单提交；<br>-ajax提交；<br><strong>表单提交代码如下</strong>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!doctype html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>Document</title>
</head>
<body>
<form action=&quot;/uploader&quot; method=&quot;post&quot; enctype=&quot;multipart/form-data&quot;>
    <!--注意此处的name和后端files的属性对应-->
    <input type=&quot;file&quot; name=&quot;fulAvatar&quot;>
    <input type=&quot;submit&quot;>
</form>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!doctype html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Document<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">action</span>=<span class="hljs-string">"/uploader"</span> <span class="hljs-attr">method</span>=<span class="hljs-string">"post"</span> <span class="hljs-attr">enctype</span>=<span class="hljs-string">"multipart/form-data"</span>&gt;</span>
    <span class="hljs-comment">&lt;!--注意此处的name和后端files的属性对应--&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"file"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"fulAvatar"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"submit"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>这里注意表单的enctype属性一定要是：<code>multipart/form-data</code>；<br><code>&lt;input type="file" name="fulAvatar"&gt;</code>别忘了name属性;<br>这是html文档的讲解：</p>
<blockquote><p>定义和用法<br>enctype 属性规定在发送到服务器之前应该如何对表单数据进行编码。</p></blockquote>
<p>默认地，表单数据会编码为 "application/x-www-form-urlencoded"。就是说，在发送到服务器之前，所有字符都会进行编码（空格转换为 "+" 加号，特殊符号转换为 ASCII HEX 值）。</p>
<p><img alt="Alt text" title="Alt text" src="https://static.alili.techundefined" style="cursor: pointer;"></p>
<p><strong>ajax提交</strong>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE>
<html>
<head>
    <title> formdata file jquery ajax upload</title>
</head>

<body>
<img id=&quot;showImg&quot; src=&quot;&quot; alt=&quot;&quot;>

<form role=&quot;form&quot; id=&quot;myForm&quot; action=&quot;http://v0.api.upyun.com/xxx&quot; method=&quot;post&quot; enctype=&quot;multipart/form-data&quot;>

    <input type=&quot;hidden&quot; name=&quot;policy&quot; value=&quot;&quot;>
    <input type=&quot;hidden&quot; name=&quot;signature&quot; value=&quot;&quot;>

    <div class=&quot;form-group&quot;>
        <label class=&quot;col-sm-2 control-label&quot;>说明:</label>

        <div class=&quot;col-sm-10&quot;>
            <p class=&quot;form-control-static &quot;>ajax 文件上传 。</p>
        </div>
    </div>
    <div class=&quot;form-group&quot;>
        <label for=&quot;url&quot; class=&quot;col-sm-2 control-label&quot;><s>*</s>图片选择:</label>

        <div class=&quot;col-sm-7&quot;>
            <input type=&quot;file&quot; name=&quot;fulAvatar&quot; id=&quot;file_upload&quot; value=&quot;&quot;
                   class=&quot;form-control&quot; placeholder=&quot;图片地址&quot; onchange=&quot;uploadByForm();&quot;>
        </div>
    </div>

    <div class=&quot;form-group&quot;>
        <div class=&quot;col-sm-offset-2 col-sm-7&quot;>

            <a id=&quot;btnAjax&quot; onclick=>Ajax上传</a>
        </div>
    </div>
</form>

<script src=&quot;http://cdn.bootcss.com/jquery/1.11.1/jquery.min.js&quot;></script>
<script type=&quot;text/javascript&quot;>

    /**
     * ajax 上传。
     */
    function uploadByForm() {
        //用form 表单直接 构造formData 对象; 就不需要下面的append 方法来为表单进行赋值了。
        var formData = new FormData($(&quot;#myForm&quot;)[0]);
        var url = &quot;http://localhost:3000/uploader&quot;;
        $.ajax({
            url: url,
            type: 'POST',
            data: formData,

            /**
             * 必须false才会避开jQuery对 formdata 的默认处理
             * XMLHttpRequest会对 formdata 进行正确的处理
             */
            processData: false,
            /**
             *必须false才会自动加上正确的Content-Type
             */
            contentType: false,
            success: function (responseStr) {
                alert(responseStr.newPath);
                $(&quot;img&quot;).attr({&quot;src&quot;: responseStr.newPath}).prependTo($(&quot;body&quot;));
            },
            error: function (responseStr) {
                alert(responseStr.newPath);
            }
        });
    }

</script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span> formdata file jquery ajax upload<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"showImg"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">""</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">role</span>=<span class="hljs-string">"form"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"myForm"</span> <span class="hljs-attr">action</span>=<span class="hljs-string">"http://v0.api.upyun.com/xxx"</span> <span class="hljs-attr">method</span>=<span class="hljs-string">"post"</span> <span class="hljs-attr">enctype</span>=<span class="hljs-string">"multipart/form-data"</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"hidden"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"policy"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">""</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"hidden"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"signature"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">""</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"form-group"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col-sm-2 control-label"</span>&gt;</span>说明:<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>

        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col-sm-10"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"form-control-static "</span>&gt;</span>ajax 文件上传 。<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"form-group"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">"url"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col-sm-2 control-label"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">s</span>&gt;</span>*<span class="hljs-tag">&lt;/<span class="hljs-name">s</span>&gt;</span>图片选择:<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>

        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col-sm-7"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"file"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"fulAvatar"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"file_upload"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">""</span>
                   <span class="hljs-attr">class</span>=<span class="hljs-string">"form-control"</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"图片地址"</span> <span class="hljs-attr">onchange</span>=<span class="hljs-string">"uploadByForm();"</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"form-group"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col-sm-offset-2 col-sm-7"</span>&gt;</span>

            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btnAjax"</span> <span class="hljs-attr">onclick</span>=&gt;</span>Ajax上传<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://cdn.bootcss.com/jquery/1.11.1/jquery.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">

    <span class="hljs-comment">/**
     * ajax 上传。
     */</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">uploadByForm</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">//用form 表单直接 构造formData 对象; 就不需要下面的append 方法来为表单进行赋值了。</span>
        <span class="hljs-keyword">var</span> formData = <span class="hljs-keyword">new</span> FormData($(<span class="hljs-string">"#myForm"</span>)[<span class="hljs-number">0</span>]);
        <span class="hljs-keyword">var</span> url = <span class="hljs-string">"http://localhost:3000/uploader"</span>;
        $.ajax({
            <span class="hljs-attr">url</span>: url,
            <span class="hljs-attr">type</span>: <span class="hljs-string">'POST'</span>,
            <span class="hljs-attr">data</span>: formData,

            <span class="hljs-comment">/**
             * 必须false才会避开jQuery对 formdata 的默认处理
             * XMLHttpRequest会对 formdata 进行正确的处理
             */</span>
            processData: <span class="hljs-literal">false</span>,
            <span class="hljs-comment">/**
             *必须false才会自动加上正确的Content-Type
             */</span>
            contentType: <span class="hljs-literal">false</span>,
            <span class="hljs-attr">success</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">responseStr</span>) </span>{
                alert(responseStr.newPath);
                $(<span class="hljs-string">"img"</span>).attr({<span class="hljs-string">"src"</span>: responseStr.newPath}).prependTo($(<span class="hljs-string">"body"</span>));
            },
            <span class="hljs-attr">error</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">responseStr</span>) </span>{
                alert(responseStr.newPath);
            }
        });
    }

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>ajax上传主要用的是Jquery;这一块只是知道这么用；配置ajax的时候<strong>processData</strong>与<strong>contentType</strong>都设置为false；<br>还有此处用了HTML5的一个新特性;FormData;<br>用法如下：<code>new FormData($("#myForm")[0])</code>;</p>
<h4>关于ajax这一块我做了个尝试,就是不用html5的FormData，而是直接用$("file_upload").val()去取文件表单的值，然后通过ajax传递，结果不是很理想;</h4>
<p>将这坨数据传到后端就可以了；</p>
<h3 id="articleHeader1">前端页面演示完了；下面是后端代码演示：</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var express = require('express');
var router = express.Router();
var formidable = require('formidable'),
    fs = require('fs'),
    TITLE = 'formidable上传示例',
    AVATAR_UPLOAD_FOLDER = '/avatar/',
    domain = &quot;http://localhost:3000&quot;;

/* 图片上传路由 */
router.post('/uploader', function(req, res) {

  var form = new formidable.IncomingForm();   //创建上传表单
  form.encoding = 'utf-8';        //设置编辑
  form.uploadDir = 'public' + AVATAR_UPLOAD_FOLDER;     //设置上传目录
  form.keepExtensions = true;     //保留后缀
  form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小

  form.parse(req, function(err, fields, files) {

    if (err) {
      res.locals.error = err;
      res.render('index', { title: TITLE });
      return;
    }
    console.log(files);

    var extName = '';  //后缀名
    switch (files.fulAvatar.type) {
      case 'image/pjpeg':
        extName = 'jpg';
        break;
      case 'image/jpeg':
        extName = 'jpg';
        break;
      case 'image/png':
        extName = 'png';
        break;
      case 'image/x-png':
        extName = 'png';
        break;
    }

    if(extName.length == 0){
      res.locals.error = '只支持png和jpg格式图片';
      res.render('index', { title: TITLE });
      return;
    }

    var avatarName = Math.random() + '.' + extName;
    //图片写入地址；
    var newPath = form.uploadDir + avatarName;
    //显示地址；
    var showUrl = domain + AVATAR_UPLOAD_FOLDER + avatarName;
    console.log(&quot;newPath&quot;,newPath);
    fs.renameSync(files.fulAvatar.path, newPath);  //重命名
    res.json({
      &quot;newPath&quot;:showUrl
    });
  });
});
module.exports = router;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">'express'</span>);
<span class="hljs-keyword">var</span> router = express.Router();
<span class="hljs-keyword">var</span> formidable = <span class="hljs-built_in">require</span>(<span class="hljs-string">'formidable'</span>),
    fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>),
    TITLE = <span class="hljs-string">'formidable上传示例'</span>,
    AVATAR_UPLOAD_FOLDER = <span class="hljs-string">'/avatar/'</span>,
    domain = <span class="hljs-string">"http://localhost:3000"</span>;

<span class="hljs-comment">/* 图片上传路由 */</span>
router.post(<span class="hljs-string">'/uploader'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{

  <span class="hljs-keyword">var</span> form = <span class="hljs-keyword">new</span> formidable.IncomingForm();   <span class="hljs-comment">//创建上传表单</span>
  form.encoding = <span class="hljs-string">'utf-8'</span>;        <span class="hljs-comment">//设置编辑</span>
  form.uploadDir = <span class="hljs-string">'public'</span> + AVATAR_UPLOAD_FOLDER;     <span class="hljs-comment">//设置上传目录</span>
  form.keepExtensions = <span class="hljs-literal">true</span>;     <span class="hljs-comment">//保留后缀</span>
  form.maxFieldsSize = <span class="hljs-number">2</span> * <span class="hljs-number">1024</span> * <span class="hljs-number">1024</span>;   <span class="hljs-comment">//文件大小</span>

  form.parse(req, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, fields, files</span>) </span>{

    <span class="hljs-keyword">if</span> (err) {
      res.locals.error = err;
      res.render(<span class="hljs-string">'index'</span>, { <span class="hljs-attr">title</span>: TITLE });
      <span class="hljs-keyword">return</span>;
    }
    <span class="hljs-built_in">console</span>.log(files);

    <span class="hljs-keyword">var</span> extName = <span class="hljs-string">''</span>;  <span class="hljs-comment">//后缀名</span>
    <span class="hljs-keyword">switch</span> (files.fulAvatar.type) {
      <span class="hljs-keyword">case</span> <span class="hljs-string">'image/pjpeg'</span>:
        extName = <span class="hljs-string">'jpg'</span>;
        <span class="hljs-keyword">break</span>;
      <span class="hljs-keyword">case</span> <span class="hljs-string">'image/jpeg'</span>:
        extName = <span class="hljs-string">'jpg'</span>;
        <span class="hljs-keyword">break</span>;
      <span class="hljs-keyword">case</span> <span class="hljs-string">'image/png'</span>:
        extName = <span class="hljs-string">'png'</span>;
        <span class="hljs-keyword">break</span>;
      <span class="hljs-keyword">case</span> <span class="hljs-string">'image/x-png'</span>:
        extName = <span class="hljs-string">'png'</span>;
        <span class="hljs-keyword">break</span>;
    }

    <span class="hljs-keyword">if</span>(extName.length == <span class="hljs-number">0</span>){
      res.locals.error = <span class="hljs-string">'只支持png和jpg格式图片'</span>;
      res.render(<span class="hljs-string">'index'</span>, { <span class="hljs-attr">title</span>: TITLE });
      <span class="hljs-keyword">return</span>;
    }

    <span class="hljs-keyword">var</span> avatarName = <span class="hljs-built_in">Math</span>.random() + <span class="hljs-string">'.'</span> + extName;
    <span class="hljs-comment">//图片写入地址；</span>
    <span class="hljs-keyword">var</span> newPath = form.uploadDir + avatarName;
    <span class="hljs-comment">//显示地址；</span>
    <span class="hljs-keyword">var</span> showUrl = domain + AVATAR_UPLOAD_FOLDER + avatarName;
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"newPath"</span>,newPath);
    fs.renameSync(files.fulAvatar.path, newPath);  <span class="hljs-comment">//重命名</span>
    res.json({
      <span class="hljs-string">"newPath"</span>:showUrl
    });
  });
});
<span class="hljs-built_in">module</span>.exports = router;</code></pre>
<p>图片传到后端其实就是一段2进制字符串，保存在内存中，需要用到fs模块读取后再写入到新的目录；打印<code>files</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{ fulAvatar: 
   File {
     domain: null,
     _events: {},
     _eventsCount: 0,
     _maxListeners: undefined,
     size: 106836,
     path: 'public/avatar/upload_d75420a381af12d19db01599fd2d0b73.jpeg',
     name: 'line.jpeg',
     type: 'image/jpeg',
     hash: null,
     lastModifiedDate: 2016-12-19T15:22:47.896Z,
     _writeStream: 
      WriteStream {
        _writableState: [Object],
        writable: false,
        domain: null,
        _events: {},
        _eventsCount: 0,
        _maxListeners: undefined,
        path: 'public/avatar/upload_d75420a381af12d19db01599fd2d0b73.jpeg',
        fd: null,
        flags: 'w',
        mode: 438,
        start: undefined,
        autoClose: true,
        pos: undefined,
        bytesWritten: 106836,
        closed: true } } }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">{</span> <span class="hljs-attr">fulAvatar:</span> 
   <span class="hljs-string">File</span> <span class="hljs-string">{</span>
<span class="hljs-attr">     domain:</span> <span class="hljs-literal">null</span><span class="hljs-string">,</span>
<span class="hljs-attr">     _events:</span> <span class="hljs-string">{},</span>
<span class="hljs-attr">     _eventsCount:</span> <span class="hljs-number">0</span><span class="hljs-string">,</span>
<span class="hljs-attr">     _maxListeners:</span> <span class="hljs-string">undefined,</span>
<span class="hljs-attr">     size:</span> <span class="hljs-number">106836</span><span class="hljs-string">,</span>
<span class="hljs-attr">     path:</span> <span class="hljs-string">'public/avatar/upload_d75420a381af12d19db01599fd2d0b73.jpeg'</span><span class="hljs-string">,</span>
<span class="hljs-attr">     name:</span> <span class="hljs-string">'line.jpeg'</span><span class="hljs-string">,</span>
<span class="hljs-attr">     type:</span> <span class="hljs-string">'image/jpeg'</span><span class="hljs-string">,</span>
<span class="hljs-attr">     hash:</span> <span class="hljs-literal">null</span><span class="hljs-string">,</span>
<span class="hljs-attr">     lastModifiedDate:</span> <span class="hljs-number">2016</span><span class="hljs-bullet">-12</span><span class="hljs-bullet">-19</span><span class="hljs-attr">T15:22:47.896Z,</span>
<span class="hljs-attr">     _writeStream:</span> 
      <span class="hljs-string">WriteStream</span> <span class="hljs-string">{</span>
<span class="hljs-attr">        _writableState:</span> <span class="hljs-string">[Object],</span>
<span class="hljs-attr">        writable:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
<span class="hljs-attr">        domain:</span> <span class="hljs-literal">null</span><span class="hljs-string">,</span>
<span class="hljs-attr">        _events:</span> <span class="hljs-string">{},</span>
<span class="hljs-attr">        _eventsCount:</span> <span class="hljs-number">0</span><span class="hljs-string">,</span>
<span class="hljs-attr">        _maxListeners:</span> <span class="hljs-string">undefined,</span>
<span class="hljs-attr">        path:</span> <span class="hljs-string">'public/avatar/upload_d75420a381af12d19db01599fd2d0b73.jpeg'</span><span class="hljs-string">,</span>
<span class="hljs-attr">        fd:</span> <span class="hljs-literal">null</span><span class="hljs-string">,</span>
<span class="hljs-attr">        flags:</span> <span class="hljs-string">'w'</span><span class="hljs-string">,</span>
<span class="hljs-attr">        mode:</span> <span class="hljs-number">438</span><span class="hljs-string">,</span>
<span class="hljs-attr">        start:</span> <span class="hljs-string">undefined,</span>
<span class="hljs-attr">        autoClose:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">        pos:</span> <span class="hljs-string">undefined,</span>
<span class="hljs-attr">        bytesWritten:</span> <span class="hljs-number">106836</span><span class="hljs-string">,</span>
<span class="hljs-attr">        closed:</span> <span class="hljs-literal">true</span> <span class="hljs-string">}</span> <span class="hljs-string">}</span> <span class="hljs-string">}</span></code></pre>
<p>以上数据用fs模块读取path属性得到是就是一段2进制的字符串；</p>
<h5>注：如果不配置express中间件，express是不能取到上传的文件的，这一块在路由回调函数的req上没有做处理。</h5>
<p>以上的示例基本就完成一些基本功能了；<br>疑惑就是网上一些jquery插件上传图片利用ajax，他们的原来是声明呢 ？希望有人给解释下</p>
<p>找到一篇相似的文章：</p>
<blockquote><p><a href="https://segmentfault.com/a/1190000006914679">https://segmentfault.com/a/11...</a></p></blockquote>
<p>补充：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" var formData = new FormData();
 var fileObj = document.getElementById(&quot;file_upload&quot;).files[0];
 formData.append(&quot;fulAvatar&quot;, fileObj);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code> <span class="hljs-keyword">var</span> formData = <span class="hljs-keyword">new</span> FormData();
 <span class="hljs-keyword">var</span> fileObj = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"file_upload"</span>).files[<span class="hljs-number">0</span>];
 formData.append(<span class="hljs-string">"fulAvatar"</span>, fileObj);</code></pre>
<blockquote><p>formData的两种用法一种是直接将表单dom直接塞进去，还有一种就是通过append填进去，但是这里要注意，填进去的是name和dom的files[0]属性；</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
nodejs express图片上传前后端配置讲解

## 原文链接
[https://segmentfault.com/a/1190000005706031](https://segmentfault.com/a/1190000005706031)

