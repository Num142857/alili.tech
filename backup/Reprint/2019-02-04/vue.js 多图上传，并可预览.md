---
title: 'vue.js 多图上传，并可预览' 
date: 2019-02-04 2:30:58
hidden: true
slug: bmkslvm2qdc
categories: [reprint]
---

{{< raw >}}

                    
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
<head>
    <title>vue.js 简单多图上传图片</title>
    <meta http-equiv=&quot;Content-Type&quot; content=&quot;text/html; charset=utf-8&quot; />
    <style type=&quot;text/css&quot;>
    
    ul { list-style: none outside none; margin:0; padding: 0; }
    li { margin: 0 10px; display: inline; }
    #app{
      overflow: hidden;
      text-align: center;
      margin-top: 10%;
    }
    img {
        width: 100px;
        height: 100px;
        margin: auto;
        display: inline;
        margin-bottom: 10px;
    }
    </style>
    <script src=&quot;//cdn.bootcss.com/vue/1.0.23/vue.min.js&quot;></script>
    <script src=&quot;//cdn.bootcss.com/jquery/2.2.2/jquery.min.js&quot;></script>
    <!-- 新 Bootstrap 核心 CSS 文件 -->
    <link rel=&quot;stylesheet&quot; href=&quot;//cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.min.css&quot;>

    <!-- 可选的Bootstrap主题文件（一般不用引入） -->
    <link rel=&quot;stylesheet&quot; href=&quot;//cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap-theme.min.css&quot;>

    <!-- jQuery文件。务必在bootstrap.min.js 之前引入 -->
    <script src=&quot;//cdn.bootcss.com/jquery/1.11.3/jquery.min.js&quot;></script>

    <!-- 最新的 Bootstrap 核心 JavaScript 文件 -->
    <script src=&quot;//cdn.bootcss.com/bootstrap/3.3.5/js/bootstrap.min.js&quot;></script>
</head>
<body>
        <div id=&quot;app&quot;>

            <div style=&quot;margin-bottom: 20px&quot;>
                <h2>选择图片</h2>
                <a id='addPic' href=&quot;&quot; v-on:click=&quot;addPic&quot;>添加图片 </a>
                <input type=&quot;file&quot; @change=&quot;onFileChange&quot; multiple style=&quot;display: none;&quot;>
            </div>
            <div v-if=&quot;images.length >0&quot;>
               <ul>
                  <li v-for=&quot;(key,image) in images&quot;>
                    
                     <img :src=&quot;image&quot; @click='delImage(key)' />
                     <a href=&quot;#&quot; style=&quot;position: absolute;&quot; @click='delImage(key)'>
                        <span class=&quot;glyphicon glyphicon-remove&quot;></span>
                    </a>
                  </li>
               </ul>
                <button @click=&quot;removeImage&quot;>移除全部图片</button>
                <button @click='uploadImage' >上传</button>
            </div>
        </div>
    <script type=&quot;text/javascript&quot;>
    Vue.config.debug = true;// 开启vue 调试功能
    new Vue({
        el: '#app',
        data: {
            images: []
        },
        methods: {
            addPic(e){
                e.preventDefault();
                $('input[type=file]').trigger('click');
                return false;
            },
            onFileChange(e) {
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length)return; 
                this.createImage(files);

            },
            createImage(file) {
                if(typeof FileReader==='undefined'){
                    alert('您的浏览器不支持图片上传，请升级您的浏览器');
                    return false;
                }
                var image = new Image();         
                var vm = this;
                var leng=file.length;
                for(var i=0;i<leng;i++){
                    var reader = new FileReader();
                    reader.readAsDataURL(file[i]); 
                    reader.onload =function(e){
                    vm.images.push(e.target.result);                                    
                    };                 
                }                        
            },
            delImage:function(index){
                this.images.shift(index);
            },
            removeImage: function(e) {
                this.images = [];
            },
            uploadImage: function() {
                console.log(this.images);
                return false;
                var obj = {};
                obj.images=this.images
                $.ajax({
                    type: 'post',
                    url: &quot;upload.php&quot;,
                    data: obj,
                    dataType: &quot;json&quot;,
                    success: function(data) {
                        if(data.status){
                            alert(data.msg);
                            return false;
                        }else{
                            alert(data.msg);
                            return false;
                        }
                    }
                });
            }
        }
    })
    </script>
</body>

</html>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>vue.js 简单多图上传图片<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"Content-Type"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"text/html; charset=utf-8"</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="css">
    
    <span class="hljs-selector-tag">ul</span> { <span class="hljs-attribute">list-style</span>: none outside none; <span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span>; <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>; }
    <span class="hljs-selector-tag">li</span> { <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> <span class="hljs-number">10px</span>; <span class="hljs-attribute">display</span>: inline; }
    <span class="hljs-selector-id">#app</span>{
      <span class="hljs-attribute">overflow</span>: hidden;
      <span class="hljs-attribute">text-align</span>: center;
      <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">10%</span>;
    }
    <span class="hljs-selector-tag">img</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">margin</span>: auto;
        <span class="hljs-attribute">display</span>: inline;
        <span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">10px</span>;
    }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"//cdn.bootcss.com/vue/1.0.23/vue.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"//cdn.bootcss.com/jquery/2.2.2/jquery.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- 新 Bootstrap 核心 CSS 文件 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"//cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.min.css"</span>&gt;</span>

    <span class="hljs-comment">&lt;!-- 可选的Bootstrap主题文件（一般不用引入） --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"//cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap-theme.min.css"</span>&gt;</span>

    <span class="hljs-comment">&lt;!-- jQuery文件。务必在bootstrap.min.js 之前引入 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"//cdn.bootcss.com/jquery/1.11.3/jquery.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

    <span class="hljs-comment">&lt;!-- 最新的 Bootstrap 核心 JavaScript 文件 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"//cdn.bootcss.com/bootstrap/3.3.5/js/bootstrap.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>

            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"margin-bottom: 20px"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>选择图片<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">id</span>=<span class="hljs-string">'addPic'</span> <span class="hljs-attr">href</span>=<span class="hljs-string">""</span> <span class="hljs-attr">v-on:click</span>=<span class="hljs-string">"addPic"</span>&gt;</span>添加图片 <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"file"</span> @<span class="hljs-attr">change</span>=<span class="hljs-string">"onFileChange"</span> <span class="hljs-attr">multiple</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"display: none;"</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"images.length &gt;0"</span>&gt;</span>
               <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
                  <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(key,image) in images"</span>&gt;</span>
                    
                     <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">"image"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">'delImage(key)'</span> /&gt;</span>
                     <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"position: absolute;"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">'delImage(key)'</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"glyphicon glyphicon-remove"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
                  <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
               <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"removeImage"</span>&gt;</span>移除全部图片<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">'uploadImage'</span> &gt;</span>上传<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
    Vue.config.debug = <span class="hljs-literal">true</span>;<span class="hljs-comment">// 开启vue 调试功能</span>
    <span class="hljs-keyword">new</span> Vue({
        <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
        <span class="hljs-attr">data</span>: {
            <span class="hljs-attr">images</span>: []
        },
        <span class="hljs-attr">methods</span>: {
            addPic(e){
                e.preventDefault();
                $(<span class="hljs-string">'input[type=file]'</span>).trigger(<span class="hljs-string">'click'</span>);
                <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
            },
            onFileChange(e) {
                <span class="hljs-keyword">var</span> files = e.target.files || e.dataTransfer.files;
                <span class="hljs-keyword">if</span> (!files.length)<span class="hljs-keyword">return</span>; 
                <span class="hljs-keyword">this</span>.createImage(files);

            },
            createImage(file) {
                <span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> FileReader===<span class="hljs-string">'undefined'</span>){
                    alert(<span class="hljs-string">'您的浏览器不支持图片上传，请升级您的浏览器'</span>);
                    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
                }
                <span class="hljs-keyword">var</span> image = <span class="hljs-keyword">new</span> Image();         
                <span class="hljs-keyword">var</span> vm = <span class="hljs-keyword">this</span>;
                <span class="hljs-keyword">var</span> leng=file.length;
                <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>;i&lt;leng;i++){
                    <span class="hljs-keyword">var</span> reader = <span class="hljs-keyword">new</span> FileReader();
                    reader.readAsDataURL(file[i]); 
                    reader.onload =<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
                    vm.images.push(e.target.result);                                    
                    };                 
                }                        
            },
            <span class="hljs-attr">delImage</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">index</span>)</span>{
                <span class="hljs-keyword">this</span>.images.shift(index);
            },
            <span class="hljs-attr">removeImage</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
                <span class="hljs-keyword">this</span>.images = [];
            },
            <span class="hljs-attr">uploadImage</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.images);
                <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
                <span class="hljs-keyword">var</span> obj = {};
                obj.images=<span class="hljs-keyword">this</span>.images
                $.ajax({
                    <span class="hljs-attr">type</span>: <span class="hljs-string">'post'</span>,
                    <span class="hljs-attr">url</span>: <span class="hljs-string">"upload.php"</span>,
                    <span class="hljs-attr">data</span>: obj,
                    <span class="hljs-attr">dataType</span>: <span class="hljs-string">"json"</span>,
                    <span class="hljs-attr">success</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
                        <span class="hljs-keyword">if</span>(data.status){
                            alert(data.msg);
                            <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
                        }<span class="hljs-keyword">else</span>{
                            alert(data.msg);
                            <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
                        }
                    }
                });
            }
        }
    })
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre>
<p>PHP 代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<?php
    define('UPLOAD_DIR', './images/');
    $img = $_POST['image'];
    $start=strpos($img,',');
    $img= substr($img,$start+1);
    $img = str_replace(' ', '+', $img);
    $data = base64_decode($img);
    $fileName = UPLOAD_DIR . uniqid() . '.jpg';
    $success = file_put_contents($fileName, $data);
    $data=array();
    if($success){
        $data['status']=1;
        $data['msg']='上传成功';
        echo json_encode($data);
    }else{
        $data['status']=0;
        $data['msg']='系统繁忙，请售后再试';
        echo json_encode($data);
    }
    
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="php"><span class="hljs-meta">&lt;?php</span>
    define(<span class="hljs-string">'UPLOAD_DIR'</span>, <span class="hljs-string">'./images/'</span>);
    $img = $_POST[<span class="hljs-string">'image'</span>];
    $start=strpos($img,<span class="hljs-string">','</span>);
    $img= substr($img,$start+<span class="hljs-number">1</span>);
    $img = str_replace(<span class="hljs-string">' '</span>, <span class="hljs-string">'+'</span>, $img);
    $data = base64_decode($img);
    $fileName = UPLOAD_DIR . uniqid() . <span class="hljs-string">'.jpg'</span>;
    $success = file_put_contents($fileName, $data);
    $data=<span class="hljs-keyword">array</span>();
    <span class="hljs-keyword">if</span>($success){
        $data[<span class="hljs-string">'status'</span>]=<span class="hljs-number">1</span>;
        $data[<span class="hljs-string">'msg'</span>]=<span class="hljs-string">'上传成功'</span>;
        <span class="hljs-keyword">echo</span> json_encode($data);
    }<span class="hljs-keyword">else</span>{
        $data[<span class="hljs-string">'status'</span>]=<span class="hljs-number">0</span>;
        $data[<span class="hljs-string">'msg'</span>]=<span class="hljs-string">'系统繁忙，请售后再试'</span>;
        <span class="hljs-keyword">echo</span> json_encode($data);
    }
    
</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue.js 多图上传，并可预览

## 原文链接
[https://segmentfault.com/a/1190000006860258](https://segmentfault.com/a/1190000006860258)

