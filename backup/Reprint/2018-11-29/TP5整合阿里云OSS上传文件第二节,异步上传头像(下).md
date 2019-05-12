---
title: 'TP5整合阿里云OSS上传文件第二节,异步上传头像(下)' 
date: 2018-11-29 9:34:56
hidden: true
slug: 5b2m2h7r0qq
categories: [reprint]
---

{{< raw >}}

                    
<p>是这个功能的最后一步了,<br>新增插件:<br>layer.js 弹窗层组件<br>jquery.form 异步表单提交插件</p>
<p>新增CSS:<br>layer扩展文件 修改layer弹窗的皮肤,默认的不喜欢!<br>基本代码和之前第二节的差不多,修改了upload.js里面的一点点东西</p>
<p>先看看演示吧!<br><span class="img-wrap"><img data-src="/img/bVbaN8a?w=983&amp;h=561" src="https://static.alili.tech/img/bVbaN8a?w=983&amp;h=561" alt="5aff13e891126.gif" title="5aff13e891126.gif" style="cursor: pointer;"></span><br>简单的数据表:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="-- 图片表
DROP TABLE IF EXISTS images;
CREATE TABLE IF NOT EXISTS images(
  id INT(11) UNSIGNED PRIMARY KEY AUTO_INCREMENT COMMENT 'id',
  img_url VARCHAR(255) NOT NULL DEFAULT '' COMMENT '图片名称',
  create_time INT NOT NULL DEFAULT 0 COMMENT '创建时间',
  update_time INT NOT NULL DEFAULT 0 COMMENT '更新时间'
)ENGINE innodb CHARSET utf8 COMMENT '图片表';
-- 用户表
DROP TABLE if EXISTS user;
CREATE TABLE IF NOT EXISTS user(
  id INT(11) UNSIGNED PRIMARY KEY AUTO_INCREMENT COMMENT 'id',
  img_id int(11) UNSIGNED NOT NULL DEFAULT 0 COMMENT '图片ID',
  create_time INT NOT NULL DEFAULT 0 COMMENT '创建时间',
  update_time INT NOT NULL DEFAULT 0 COMMENT '更新时间'
)ENGINE innodb CHARSET utf8 COMMENT '用户表';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code><span class="hljs-comment">-- 图片表</span>
<span class="hljs-keyword">DROP</span> <span class="hljs-keyword">TABLE</span> <span class="hljs-keyword">IF</span> <span class="hljs-keyword">EXISTS</span> images;
<span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">TABLE</span> <span class="hljs-keyword">IF</span> <span class="hljs-keyword">NOT</span> <span class="hljs-keyword">EXISTS</span> images(
  <span class="hljs-keyword">id</span> <span class="hljs-built_in">INT</span>(<span class="hljs-number">11</span>) <span class="hljs-keyword">UNSIGNED</span> PRIMARY <span class="hljs-keyword">KEY</span> AUTO_INCREMENT <span class="hljs-keyword">COMMENT</span> <span class="hljs-string">'id'</span>,
  img_url <span class="hljs-built_in">VARCHAR</span>(<span class="hljs-number">255</span>) <span class="hljs-keyword">NOT</span> <span class="hljs-literal">NULL</span> <span class="hljs-keyword">DEFAULT</span> <span class="hljs-string">''</span> <span class="hljs-keyword">COMMENT</span> <span class="hljs-string">'图片名称'</span>,
  create_time <span class="hljs-built_in">INT</span> <span class="hljs-keyword">NOT</span> <span class="hljs-literal">NULL</span> <span class="hljs-keyword">DEFAULT</span> <span class="hljs-number">0</span> <span class="hljs-keyword">COMMENT</span> <span class="hljs-string">'创建时间'</span>,
  update_time <span class="hljs-built_in">INT</span> <span class="hljs-keyword">NOT</span> <span class="hljs-literal">NULL</span> <span class="hljs-keyword">DEFAULT</span> <span class="hljs-number">0</span> <span class="hljs-keyword">COMMENT</span> <span class="hljs-string">'更新时间'</span>
)<span class="hljs-keyword">ENGINE</span> <span class="hljs-keyword">innodb</span> <span class="hljs-keyword">CHARSET</span> utf8 <span class="hljs-keyword">COMMENT</span> <span class="hljs-string">'图片表'</span>;
<span class="hljs-comment">-- 用户表</span>
<span class="hljs-keyword">DROP</span> <span class="hljs-keyword">TABLE</span> <span class="hljs-keyword">if</span> <span class="hljs-keyword">EXISTS</span> <span class="hljs-keyword">user</span>;
<span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">TABLE</span> <span class="hljs-keyword">IF</span> <span class="hljs-keyword">NOT</span> <span class="hljs-keyword">EXISTS</span> <span class="hljs-keyword">user</span>(
  <span class="hljs-keyword">id</span> <span class="hljs-built_in">INT</span>(<span class="hljs-number">11</span>) <span class="hljs-keyword">UNSIGNED</span> PRIMARY <span class="hljs-keyword">KEY</span> AUTO_INCREMENT <span class="hljs-keyword">COMMENT</span> <span class="hljs-string">'id'</span>,
  img_id <span class="hljs-built_in">int</span>(<span class="hljs-number">11</span>) <span class="hljs-keyword">UNSIGNED</span> <span class="hljs-keyword">NOT</span> <span class="hljs-literal">NULL</span> <span class="hljs-keyword">DEFAULT</span> <span class="hljs-number">0</span> <span class="hljs-keyword">COMMENT</span> <span class="hljs-string">'图片ID'</span>,
  create_time <span class="hljs-built_in">INT</span> <span class="hljs-keyword">NOT</span> <span class="hljs-literal">NULL</span> <span class="hljs-keyword">DEFAULT</span> <span class="hljs-number">0</span> <span class="hljs-keyword">COMMENT</span> <span class="hljs-string">'创建时间'</span>,
  update_time <span class="hljs-built_in">INT</span> <span class="hljs-keyword">NOT</span> <span class="hljs-literal">NULL</span> <span class="hljs-keyword">DEFAULT</span> <span class="hljs-number">0</span> <span class="hljs-keyword">COMMENT</span> <span class="hljs-string">'更新时间'</span>
)<span class="hljs-keyword">ENGINE</span> <span class="hljs-keyword">innodb</span> <span class="hljs-keyword">CHARSET</span> utf8 <span class="hljs-keyword">COMMENT</span> <span class="hljs-string">'用户表'</span>;</code></pre>
<p>之后再aliyunOss配置文件中增加一个配置,就是访问的域名;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//阿里云OSS配置
return [
    'KeyId'      => '***',  //您的Access Key ID
    'KeySecret'  => '***',  //您的Access Key Secret
    'Endpoint'   => '****',  //阿里云oss 外网地址endpoint
    'Bucket'     => '****',  //Bucket名称
    'OssDomain' => 'http://thinkpjax.cn/',  // 这个配置是新增的
];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-comment">//阿里云OSS配置</span>
<span class="hljs-keyword">return</span> [
    <span class="hljs-string">'KeyId'</span>      =&gt; <span class="hljs-string">'***'</span>,  <span class="hljs-comment">//您的Access Key ID</span>
    <span class="hljs-string">'KeySecret'</span>  =&gt; <span class="hljs-string">'***'</span>,  <span class="hljs-comment">//您的Access Key Secret</span>
    <span class="hljs-string">'Endpoint'</span>   =&gt; <span class="hljs-string">'****'</span>,  <span class="hljs-comment">//阿里云oss 外网地址endpoint</span>
    <span class="hljs-string">'Bucket'</span>     =&gt; <span class="hljs-string">'****'</span>,  <span class="hljs-comment">//Bucket名称</span>
    <span class="hljs-string">'OssDomain'</span> =&gt; <span class="hljs-string">'http://thinkpjax.cn/'</span>,  <span class="hljs-comment">// 这个配置是新增的</span>
];</code></pre>
<p>创建基础模型类 (application/index/model/base.php)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<?php
/**
 * User: 李昊天
 * Date: 2018/5/19
 * Time: 0:50
 * Email: haotian0607@gmail.com
 */
namespace app\index\model;
use think\Model;
class Base extends Model
{
    public function img()
    {
        return $this->hasOne('Images','id','img_id');
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="php"><span class="hljs-meta">&lt;?php</span>
<span class="hljs-comment">/**
 * User: 李昊天
 * Date: 2018/5/19
 * Time: 0:50
 * Email: haotian0607<span class="hljs-doctag">@gmail</span>.com
 */</span>
<span class="hljs-keyword">namespace</span> <span class="hljs-title">app</span>\<span class="hljs-title">index</span>\<span class="hljs-title">model</span>;
<span class="hljs-keyword">use</span> <span class="hljs-title">think</span>\<span class="hljs-title">Model</span>;
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Base</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Model</span>
</span>{
    <span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">img</span><span class="hljs-params">()</span>
    </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">$this</span>-&gt;hasOne(<span class="hljs-string">'Images'</span>,<span class="hljs-string">'id'</span>,<span class="hljs-string">'img_id'</span>);
    }
}</span></code></pre>
<p>创建用户模型(application/index/model/User.php) 继承基础模型类<br>创建图片模型(application/index/model/Images.php)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<?php
/**
 * User: 李昊天
 * Date: 2018/5/19
 * Time: 0:54
 * Email: haotian0607@gmail.com
 */
namespace app\index\model;
use think\facade\Config;
use think\Model;
class Images extends Model
{
   /**
     * 设置读取器
     * 在读取图片地址的时候将配置文件中的OssDomain.数据库里面的图片地址
     * @param $url
     * @return string
     */
    public function getImgUrlAttr($url)
    {
        return Config::get('aliyunOss.OssDomain').$url;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="php"><span class="hljs-meta">&lt;?php</span>
<span class="hljs-comment">/**
 * User: 李昊天
 * Date: 2018/5/19
 * Time: 0:54
 * Email: haotian0607<span class="hljs-doctag">@gmail</span>.com
 */</span>
<span class="hljs-keyword">namespace</span> <span class="hljs-title">app</span>\<span class="hljs-title">index</span>\<span class="hljs-title">model</span>;
<span class="hljs-keyword">use</span> <span class="hljs-title">think</span>\<span class="hljs-title">facade</span>\<span class="hljs-title">Config</span>;
<span class="hljs-keyword">use</span> <span class="hljs-title">think</span>\<span class="hljs-title">Model</span>;
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Images</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Model</span>
</span>{
   <span class="hljs-comment">/**
     * 设置读取器
     * 在读取图片地址的时候将配置文件中的OssDomain.数据库里面的图片地址
     * <span class="hljs-doctag">@param</span> $url
     * <span class="hljs-doctag">@return</span> string
     */</span>
    <span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getImgUrlAttr</span><span class="hljs-params">($url)</span>
    </span>{
        <span class="hljs-keyword">return</span> Config::get(<span class="hljs-string">'aliyunOss.OssDomain'</span>).$url;
    }
}</span></code></pre>
<p>修改upload.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ImgId = $face.find($(&quot;input[name='imgId']&quot;));
if (!$ImgId.length) {
$ImgId = $face.append('<input name=&quot;imgId&quot; type=&quot;hidden&quot;>');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-variable">$ImgId</span> = <span class="hljs-variable">$face</span>.find($(<span class="hljs-string">"input[name='imgId']"</span>));
<span class="hljs-keyword">if</span> (!<span class="hljs-variable">$ImgId</span>.length) {
<span class="hljs-variable">$ImgId</span> = <span class="hljs-variable">$face</span>.<span class="hljs-keyword">append</span>('&lt;<span class="hljs-keyword">input</span> name=<span class="hljs-string">"imgId"</span> <span class="hljs-keyword">type</span>=<span class="hljs-string">"hidden"</span>&gt;');
}</code></pre>
<p>$face.find($("input[name='imgId']")).val(response.data.imgId);</p>
<p>完整代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * User: 李昊天
 * Date: 2018/5/18
 * Time: 1:15
 * Email: haotian0607@gmail.com
 */
$(function () {
    var $face = $(&quot;#face&quot;), thumbnailWidth = 100, thumbnailHeight = 100;
    //创建uploader实例
    WebUploader.create({
        server: uploaderUrl, //服务器异步接受地址!
        pick: {
            id: &quot;#changeFile&quot;, //指定选择文件的按钮容器
            multiple: false, //禁止多选
        },
        resize: false, //不压缩image
        auto: true, //选择之后自动上传
        swf: '../flash/Uploader.swf', //防止低版本浏览器 用到了flash
        // 只允许选择图片文件。
        accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: 'image/*'
        }
    }).on('fileQueued', function (file) {
        // 当有文件添加进来的时候
        var $img = $face.find('img'); //获取到头像的DOM
        // 创建缩略图
        this.makeThumb(file, function (error, src) {
            if (error) {
                $img.replaceWith('<span>不能预览</span>');
                return;
            }
            $img.attr('src', src);
        }, thumbnailWidth, thumbnailHeight);
    }).on('uploadProgress', function (file, percentage) {
        // 文件上传过程中创建进度条实时显示。
        $percent = $face.find(&quot;.progress .progress-bar&quot;);
        $ImgId = $face.find($(&quot;input[name='imgId']&quot;));
        if (!$ImgId.length) {
            $ImgId = $face.append('<input name=&quot;imgId&quot; type=&quot;hidden&quot;>');
        }
        // 避免重复创建
        if (!$percent.length) {
            //构建进度条DOM
            $face.append('<div class=&quot;dialog&quot;></div>'); //这个是提示框
            $percent = $('<div class=&quot;progress&quot;><div class=&quot;progress-bar&quot; role=&quot;progressbar&quot; aria-valuenow=&quot;60&quot; aria-valuemin=&quot;0&quot; aria-valuemax=&quot;100&quot; style=&quot;width: 10%;&quot;><span></span></div></div>').appendTo($face).find('progress-bar');
        }
        $percent.css({'width': 50 + '%'}); //让进度条动起来
    }).on('uploadSuccess', function (file, response) {
        // 文件上传成功，给dialog添加class, 用样式标记上传成功。
        //找到头像DIV下面的dialog  添加一个success的样式类将内容改变成上传成功并且显示!
        $face.find('.dialog').addClass('success').text('上传成功').show();
        $face.find($(&quot;input[name='imgId']&quot;)).val(response.data.imgId);
    }).on('uploadError', function (file) {
        // 文件上传失败，同样是添加Class
        //找到头像DIV下面的dialog  添加一个error的样式类将内容改变成上传失败并且显示!
        $face.find('.dialog').addClass('error').text('上传失败').show();
    }).on('uploadComplete', function (file) {
        // 完成上传完了，成功或者失败，先删除进度条。
        $face.find('.progress').remove();
    });
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-comment">/**
 * User: 李昊天
 * Date: 2018/5/18
 * Time: 1:15
 * Email: haotian0607<span class="hljs-doctag">@gmail</span>.com
 */</span>
$(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">var</span> $face = $(<span class="hljs-string">"#face"</span>), thumbnailWidth = <span class="hljs-number">100</span>, thumbnailHeight = <span class="hljs-number">100</span>;
    <span class="hljs-comment">//创建uploader实例</span>
    WebUploader.create({
        server: uploaderUrl, <span class="hljs-comment">//服务器异步接受地址!</span>
        pick: {
            id: <span class="hljs-string">"#changeFile"</span>, <span class="hljs-comment">//指定选择文件的按钮容器</span>
            multiple: <span class="hljs-keyword">false</span>, <span class="hljs-comment">//禁止多选</span>
        },
        resize: <span class="hljs-keyword">false</span>, <span class="hljs-comment">//不压缩image</span>
        auto: <span class="hljs-keyword">true</span>, <span class="hljs-comment">//选择之后自动上传</span>
        swf: <span class="hljs-string">'../flash/Uploader.swf'</span>, <span class="hljs-comment">//防止低版本浏览器 用到了flash</span>
        <span class="hljs-comment">// 只允许选择图片文件。</span>
        accept: {
            title: <span class="hljs-string">'Images'</span>,
            extensions: <span class="hljs-string">'gif,jpg,jpeg,bmp,png'</span>,
            mimeTypes: <span class="hljs-string">'image/*'</span>
        }
    }).on(<span class="hljs-string">'fileQueued'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(file)</span> </span>{
        <span class="hljs-comment">// 当有文件添加进来的时候</span>
        <span class="hljs-keyword">var</span> $img = $face.find(<span class="hljs-string">'img'</span>); <span class="hljs-comment">//获取到头像的DOM</span>
        <span class="hljs-comment">// 创建缩略图</span>
        this.makeThumb(file, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(error, src)</span> </span>{
            <span class="hljs-keyword">if</span> (error) {
                $img.replaceWith(<span class="hljs-string">'&lt;span&gt;不能预览&lt;/span&gt;'</span>);
                <span class="hljs-keyword">return</span>;
            }
            $img.attr(<span class="hljs-string">'src'</span>, src);
        }, thumbnailWidth, thumbnailHeight);
    }).on(<span class="hljs-string">'uploadProgress'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(file, percentage)</span> </span>{
        <span class="hljs-comment">// 文件上传过程中创建进度条实时显示。</span>
        $percent = $face.find(<span class="hljs-string">".progress .progress-bar"</span>);
        $ImgId = $face.find($(<span class="hljs-string">"input[name='imgId']"</span>));
        <span class="hljs-keyword">if</span> (!$ImgId.length) {
            $ImgId = $face.append(<span class="hljs-string">'&lt;input name="imgId" type="hidden"&gt;'</span>);
        }
        <span class="hljs-comment">// 避免重复创建</span>
        <span class="hljs-keyword">if</span> (!$percent.length) {
            <span class="hljs-comment">//构建进度条DOM</span>
            $face.append(<span class="hljs-string">'&lt;div class="dialog"&gt;&lt;/div&gt;'</span>); <span class="hljs-comment">//这个是提示框</span>
            $percent = $(<span class="hljs-string">'&lt;div class="progress"&gt;&lt;div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 10%;"&gt;&lt;span&gt;&lt;/span&gt;&lt;/div&gt;&lt;/div&gt;'</span>).appendTo($face).find(<span class="hljs-string">'progress-bar'</span>);
        }
        $percent.css({<span class="hljs-string">'width'</span>: <span class="hljs-number">50</span> + <span class="hljs-string">'%'</span>}); <span class="hljs-comment">//让进度条动起来</span>
    }).on(<span class="hljs-string">'uploadSuccess'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(file, response)</span> </span>{
        <span class="hljs-comment">// 文件上传成功，给dialog添加class, 用样式标记上传成功。</span>
        <span class="hljs-comment">//找到头像DIV下面的dialog  添加一个success的样式类将内容改变成上传成功并且显示!</span>
        $face.find(<span class="hljs-string">'.dialog'</span>).addClass(<span class="hljs-string">'success'</span>).text(<span class="hljs-string">'上传成功'</span>).show();
        $face.find($(<span class="hljs-string">"input[name='imgId']"</span>)).val(response.data.imgId);
    }).on(<span class="hljs-string">'uploadError'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(file)</span> </span>{
        <span class="hljs-comment">// 文件上传失败，同样是添加Class</span>
        <span class="hljs-comment">//找到头像DIV下面的dialog  添加一个error的样式类将内容改变成上传失败并且显示!</span>
        $face.find(<span class="hljs-string">'.dialog'</span>).addClass(<span class="hljs-string">'error'</span>).text(<span class="hljs-string">'上传失败'</span>).show();
    }).on(<span class="hljs-string">'uploadComplete'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(file)</span> </span>{
        <span class="hljs-comment">// 完成上传完了，成功或者失败，先删除进度条。</span>
        $face.find(<span class="hljs-string">'.progress'</span>).remove();
    });
});
</code></pre>
<p>修改up.html里面的代码:<br>主要是加入表单,加入提交按钮,加入form.js和layer.js<br>主要部分代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<form action=&quot;"{{":url('index/User/modify')"}}"&quot; id=&quot;modifyForm&quot; method=&quot;post&quot;>
        <div id=&quot;face&quot;>
            <img src=&quot;"{{"$data.img.img_url|default='/static/img/default.png'"}}"&quot; alt=&quot;&quot; class=&quot;img-thumbnail&quot;>
        </div>
        <div id=&quot;changeFile&quot;>选择文件</div>
        <div style=&quot;position:relative;top:250px;text-align:center;&quot;>
            <button type=&quot;button&quot; id=&quot;submitBtn&quot; class=&quot;btn&quot; style=&quot;margin-left: -70px;&quot;>提交修改</button>
        </div>
    </form>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">action</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">"{{":url('index/User/modify')"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"modifyForm"</span> <span class="hljs-attr">method</span>=<span class="hljs-string">"post"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"face"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">"{{"$data.img.img_url|<span class="hljs-name">default</span>='/static/img/default.png'"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"img-thumbnail"</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"changeFile"</span>&gt;</span>选择文件<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"position:relative;top:250px;text-align:center;"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"submitBtn"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"margin-left: -70px;"</span>&gt;</span>提交修改<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span></span></code></pre>
<p>加入操作的js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>
    $(function () {
        layer.config({
            extend: 'web/style.css',
            skin: 'web'
        });
        $(&quot;#submitBtn&quot;).on('click', function () {
            var $input = $(&quot;input[name='imgId']&quot;);
            if ($input.length < 1 || $input.val() == '') {
                layer.tips('请先上传图片', $(&quot;#changeFile&quot;), {
                    tips: [2, '#E4393c'],
                    time: 4000
                });
                return;
            }
            $(&quot;#modifyForm&quot;).ajaxSubmit({
                beforeSend: function () {
                    layer.load();
                },
                success: function (res) {
                    var ico = 1;
                    if (res.status == 1) ico = 1; else ico = 2;
                    layer.alert(res.msg, {icon: ico, shade: 0.2});
                },
                complete: function () {
                    layer.closeAll('loading');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    switch (jqXHR.status) {
                        case(500):
                            layer.alert('服务器系统内部错误！' + textStatus, {icon: 2});
                            break;
                        case(408):
                            layer.alert('请求超时！' + textStatus, {icon: 3});
                            break;
                        default:
                            layer.alert('请求出错！' + textStatus, {icon: 2});
                    }
                },
            })
        });
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        layer.config({
            <span class="hljs-attr">extend</span>: <span class="hljs-string">'web/style.css'</span>,
            <span class="hljs-attr">skin</span>: <span class="hljs-string">'web'</span>
        });
        $(<span class="hljs-string">"#submitBtn"</span>).on(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">var</span> $input = $(<span class="hljs-string">"input[name='imgId']"</span>);
            <span class="hljs-keyword">if</span> ($input.length &lt; <span class="hljs-number">1</span> || $input.val() == <span class="hljs-string">''</span>) {
                layer.tips(<span class="hljs-string">'请先上传图片'</span>, $(<span class="hljs-string">"#changeFile"</span>), {
                    <span class="hljs-attr">tips</span>: [<span class="hljs-number">2</span>, <span class="hljs-string">'#E4393c'</span>],
                    <span class="hljs-attr">time</span>: <span class="hljs-number">4000</span>
                });
                <span class="hljs-keyword">return</span>;
            }
            $(<span class="hljs-string">"#modifyForm"</span>).ajaxSubmit({
                <span class="hljs-attr">beforeSend</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                    layer.load();
                },
                <span class="hljs-attr">success</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">res</span>) </span>{
                    <span class="hljs-keyword">var</span> ico = <span class="hljs-number">1</span>;
                    <span class="hljs-keyword">if</span> (res.status == <span class="hljs-number">1</span>) ico = <span class="hljs-number">1</span>; <span class="hljs-keyword">else</span> ico = <span class="hljs-number">2</span>;
                    layer.alert(res.msg, {<span class="hljs-attr">icon</span>: ico, <span class="hljs-attr">shade</span>: <span class="hljs-number">0.2</span>});
                },
                <span class="hljs-attr">complete</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                    layer.closeAll(<span class="hljs-string">'loading'</span>);
                },
                <span class="hljs-attr">error</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">jqXHR, textStatus, errorThrown</span>) </span>{
                    <span class="hljs-keyword">switch</span> (jqXHR.status) {
                        <span class="hljs-keyword">case</span>(<span class="hljs-number">500</span>):
                            layer.alert(<span class="hljs-string">'服务器系统内部错误！'</span> + textStatus, {<span class="hljs-attr">icon</span>: <span class="hljs-number">2</span>});
                            <span class="hljs-keyword">break</span>;
                        <span class="hljs-keyword">case</span>(<span class="hljs-number">408</span>):
                            layer.alert(<span class="hljs-string">'请求超时！'</span> + textStatus, {<span class="hljs-attr">icon</span>: <span class="hljs-number">3</span>});
                            <span class="hljs-keyword">break</span>;
                        <span class="hljs-keyword">default</span>:
                            layer.alert(<span class="hljs-string">'请求出错！'</span> + textStatus, {<span class="hljs-attr">icon</span>: <span class="hljs-number">2</span>});
                    }
                },
            })
        });
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>后端代码也有更改:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="public function uploadFile()
    {
//        sleep(3);
        $file = request()->file('file');  //获取到上传的文件
        $resResult = Image::open($file);
        try {
            $config = Config::pull('aliyun_oss'); //获取Oss的配置
            //实例化对象 将配置传入
            $ossClient = new OssClient($config['KeyId'], $config['KeySecret'], $config['Endpoint']);
            //这里是有sha1加密 生成文件名 之后连接上后缀
            $fileName = sha1(date('YmdHis', time()) . uniqid()) . '.' . $resResult->type();
            //执行阿里云上传
            $result = $ossClient->uploadFile($config['Bucket'], $fileName, $file->getInfo()['tmp_name']);
            if ($result &amp;&amp; $result['info']['http_code'] == 200) {
                try {
                    $Images = new Images(); //实例化图片模型
                    $Images->allowField('img_url')->save([
                        'img_url' => $fileName   //写入上传的文件名
                    ]);
                    return ajaxReturn(parent::SUCCESS, 'success', [
                        'imgId' => $Images->id,
                    ]);
                } catch (Exception $e) {
                    return ajaxReturn(parent::FAIL, 'error');
                }
            } else {
                return ajaxReturn(parent::FAIL, 'error');
            }
        } catch (OssException $e) {
            return $e->getMessage();
        }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">uploadFile</span><span class="hljs-params">()</span>
    </span>{
<span class="hljs-comment">//        sleep(3);</span>
        $file = request()-&gt;file(<span class="hljs-string">'file'</span>);  <span class="hljs-comment">//获取到上传的文件</span>
        $resResult = Image::open($file);
        <span class="hljs-keyword">try</span> {
            $config = Config::pull(<span class="hljs-string">'aliyun_oss'</span>); <span class="hljs-comment">//获取Oss的配置</span>
            <span class="hljs-comment">//实例化对象 将配置传入</span>
            $ossClient = <span class="hljs-keyword">new</span> OssClient($config[<span class="hljs-string">'KeyId'</span>], $config[<span class="hljs-string">'KeySecret'</span>], $config[<span class="hljs-string">'Endpoint'</span>]);
            <span class="hljs-comment">//这里是有sha1加密 生成文件名 之后连接上后缀</span>
            $fileName = sha1(date(<span class="hljs-string">'YmdHis'</span>, time()) . uniqid()) . <span class="hljs-string">'.'</span> . $resResult-&gt;type();
            <span class="hljs-comment">//执行阿里云上传</span>
            $result = $ossClient-&gt;uploadFile($config[<span class="hljs-string">'Bucket'</span>], $fileName, $file-&gt;getInfo()[<span class="hljs-string">'tmp_name'</span>]);
            <span class="hljs-keyword">if</span> ($result &amp;&amp; $result[<span class="hljs-string">'info'</span>][<span class="hljs-string">'http_code'</span>] == <span class="hljs-number">200</span>) {
                <span class="hljs-keyword">try</span> {
                    $Images = <span class="hljs-keyword">new</span> Images(); <span class="hljs-comment">//实例化图片模型</span>
                    $Images-&gt;allowField(<span class="hljs-string">'img_url'</span>)-&gt;save([
                        <span class="hljs-string">'img_url'</span> =&gt; $fileName   <span class="hljs-comment">//写入上传的文件名</span>
                    ]);
                    <span class="hljs-keyword">return</span> ajaxReturn(<span class="hljs-keyword">parent</span>::SUCCESS, <span class="hljs-string">'success'</span>, [
                        <span class="hljs-string">'imgId'</span> =&gt; $Images-&gt;id,
                    ]);
                } <span class="hljs-keyword">catch</span> (<span class="hljs-keyword">Exception</span> $e) {
                    <span class="hljs-keyword">return</span> ajaxReturn(<span class="hljs-keyword">parent</span>::FAIL, <span class="hljs-string">'error'</span>);
                }
            } <span class="hljs-keyword">else</span> {
                <span class="hljs-keyword">return</span> ajaxReturn(<span class="hljs-keyword">parent</span>::FAIL, <span class="hljs-string">'error'</span>);
            }
        } <span class="hljs-keyword">catch</span> (OssException $e) {
            <span class="hljs-keyword">return</span> $e-&gt;getMessage();
        }
    }</code></pre>
<p>最好是在修改的时候判断表单传递的imgId与数据库里面的ID,如果一致就不允许修改!<br>修改逻辑代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" public function modify()
    {
        if (request()->isPost()) {
            $userData = (new UserModel())->find(parent::$uid);
            if (null === $userData) {
                return ajaxReturn(parent::FAIL, '获取用户信息失败,请重新登录!');
            }
            $imgId = input('post.imgId', '');
            $result = $userData->allowField('img_id')->save(['img_id' => $imgId]);
            if ($result) {
                return ajaxReturn(parent::SUCCESS, '修改成功!');
            } else {
                return ajaxReturn(parent::FAIL, '操作失败!');
            }
        }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code> <span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">modify</span><span class="hljs-params">()</span>
    </span>{
        <span class="hljs-keyword">if</span> (request()-&gt;isPost()) {
            $userData = (<span class="hljs-keyword">new</span> UserModel())-&gt;find(<span class="hljs-keyword">parent</span>::$uid);
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">null</span> === $userData) {
                <span class="hljs-keyword">return</span> ajaxReturn(<span class="hljs-keyword">parent</span>::FAIL, <span class="hljs-string">'获取用户信息失败,请重新登录!'</span>);
            }
            $imgId = input(<span class="hljs-string">'post.imgId'</span>, <span class="hljs-string">''</span>);
            $result = $userData-&gt;allowField(<span class="hljs-string">'img_id'</span>)-&gt;save([<span class="hljs-string">'img_id'</span> =&gt; $imgId]);
            <span class="hljs-keyword">if</span> ($result) {
                <span class="hljs-keyword">return</span> ajaxReturn(<span class="hljs-keyword">parent</span>::SUCCESS, <span class="hljs-string">'修改成功!'</span>);
            } <span class="hljs-keyword">else</span> {
                <span class="hljs-keyword">return</span> ajaxReturn(<span class="hljs-keyword">parent</span>::FAIL, <span class="hljs-string">'操作失败!'</span>);
            }
        }
    }</code></pre>
<p>up控制器:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="public function up()
    {
       /**
         * 使用动态关联预载入
         */
        $userData = (new UserModel())->with('img')->find(parent::$uid);
        return $this->fetch('up', [
            'data' => $userData,
        ]);
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">up</span><span class="hljs-params">()</span>
    </span>{
       <span class="hljs-comment">/**
         * 使用动态关联预载入
         */</span>
        $userData = (<span class="hljs-keyword">new</span> UserModel())-&gt;with(<span class="hljs-string">'img'</span>)-&gt;find(<span class="hljs-keyword">parent</span>::$uid);
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">$this</span>-&gt;fetch(<span class="hljs-string">'up'</span>, [
            <span class="hljs-string">'data'</span> =&gt; $userData,
        ]);
    }</code></pre>
<p>基础模型类:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<?php
/**
 * User: 李昊天
 * Date: 2018/5/19
 * Time: 0:44
 * Email: haotian0607@gmail.com
 */
namespace app\index\controller;
use think\Controller;
class Base extends Controller
{
    protected static $uid = '';
    const SUCCESS = 1;
    const FAIL = 0;
    public function initialize()
    {
        //由于没有登录使用了假数据
        self::$uid = 1;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="php"><span class="hljs-meta">&lt;?php</span>
<span class="hljs-comment">/**
 * User: 李昊天
 * Date: 2018/5/19
 * Time: 0:44
 * Email: haotian0607<span class="hljs-doctag">@gmail</span>.com
 */</span>
<span class="hljs-keyword">namespace</span> <span class="hljs-title">app</span>\<span class="hljs-title">index</span>\<span class="hljs-title">controller</span>;
<span class="hljs-keyword">use</span> <span class="hljs-title">think</span>\<span class="hljs-title">Controller</span>;
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Base</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Controller</span>
</span>{
    <span class="hljs-keyword">protected</span> <span class="hljs-keyword">static</span> $uid = <span class="hljs-string">''</span>;
    <span class="hljs-keyword">const</span> SUCCESS = <span class="hljs-number">1</span>;
    <span class="hljs-keyword">const</span> FAIL = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">initialize</span><span class="hljs-params">()</span>
    </span>{
        <span class="hljs-comment">//由于没有登录使用了假数据</span>
        <span class="hljs-keyword">self</span>::$uid = <span class="hljs-number">1</span>;
    }
}</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
TP5整合阿里云OSS上传文件第二节,异步上传头像(下)

## 原文链接
[https://segmentfault.com/a/1190000014929952](https://segmentfault.com/a/1190000014929952)

