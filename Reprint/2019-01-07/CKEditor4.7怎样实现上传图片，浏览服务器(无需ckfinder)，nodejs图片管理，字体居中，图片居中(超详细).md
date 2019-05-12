---
title: 'CKEditor4.7怎样实现上传图片，浏览服务器(无需ckfinder)，nodejs图片管理，字体居中，图片居中(超详细)' 
date: 2019-01-07 2:30:11
hidden: true
slug: husfzcjxvaa
categories: [reprint]
---

{{< raw >}}

                    
<p>首先是下载CKEditor，下载地址：<a href="http://ckeditor.com/download" rel="nofollow noreferrer" target="_blank">http://ckeditor.com/download</a></p>
<p>选择里面的Customize自定义，如图</p>
<p><span class="img-wrap"><img data-src="/img/bVRlFy?w=1406&amp;h=858" src="https://static.alili.tech/img/bVRlFy?w=1406&amp;h=858" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>然后进入配置界面，第一个choose preset一般就选standard标准的</p>
<p>第二个需要添加两个东西进去</p>
<p>第一个是Justify</p>
<p><span class="img-wrap"><img data-src="/img/bVRlGu?w=1132&amp;h=707" src="https://static.alili.tech/img/bVRlGu?w=1132&amp;h=707" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>它的作用是添加左对齐右对齐居中的按钮，可以使字体居中，但只添加这个无法使图片居中</p>
<p>第二个是Enhanced Image</p>
<p><span class="img-wrap"><img data-src="/img/bVRlIT?w=1083&amp;h=650" src="https://static.alili.tech/img/bVRlIT?w=1083&amp;h=650" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>有了它，就可以使图片居中了。</p>
<p>然后根据自己的需求进行添加，但注意这里面有许多是不支持4.7版的，谨慎添加，有很多添加之后无法显示编辑器。</p>
<p>然后选择skin皮肤，添加language语言，在这里我添加了中文简体和中文繁体，根据你的需要。</p>
<p>最后，勾上同意协议，点击下载就行了。</p>
<p>下载解压后会得到一个文件夹，这就是你需要的文件夹，把它放到你的项目public中，文件夹打开有个ckeditor.js文件，通过<code>&lt;script src="/ckeditor/ckeditor.js"&gt;&lt;/script&gt;</code>添加到你的网页，就可以在网页中使用了，使用方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<textarea name=&quot;content&quot; id=&quot;editor1&quot; rows=&quot;10&quot; cols=&quot;80&quot;>内容</textarea>
<script>
    CKEDITOR.replace('editor1', {
        language: 'zh-CN',//改成中文版
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">textarea</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"content"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"editor1"</span> <span class="hljs-attr">rows</span>=<span class="hljs-string">"10"</span> <span class="hljs-attr">cols</span>=<span class="hljs-string">"80"</span>&gt;</span>内容<span class="hljs-tag">&lt;/<span class="hljs-name">textarea</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    CKEDITOR.replace(<span class="hljs-string">'editor1'</span>, {
        language: <span class="hljs-string">'zh-CN'</span>,<span class="hljs-comment">//改成中文版</span>
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>然后就可以在网页看到效果了</p>
<p><span class="img-wrap"><img data-src="/img/bVRlPA?w=1075&amp;h=529" src="https://static.alili.tech/img/bVRlPA?w=1075&amp;h=529" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>我们点开图片<span class="img-wrap"><img data-src="/img/bVRlVG?w=25&amp;h=25" src="https://static.alili.tech/img/bVRlVG?w=25&amp;h=25" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span>，发现并没有上传图片的功能，也没有浏览服务器的功能</p>
<p><span class="img-wrap"><img data-src="/img/bVRlVq?w=271&amp;h=320" src="https://static.alili.tech/img/bVRlVq?w=271&amp;h=320" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>现在我们来一一实现</p>
<p>首先图片上传功能，找到ckeditor文件夹，进入后找到plugins，点进去</p>
<p><span class="img-wrap"><img data-src="/img/bVRlXz?w=592&amp;h=370" src="https://static.alili.tech/img/bVRlXz?w=592&amp;h=370" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>找到iamge2文件夹，进入后找到image2.js，用编辑器打开，搜索hidden，此文件中只有两处hidden，找到id为'Upload'的hidden，将'!0'的'!'去掉，如图：</p>
<p><span class="img-wrap"><img data-src="/img/bVRlY5?w=395&amp;h=227" src="https://static.alili.tech/img/bVRlY5?w=395&amp;h=227" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>此时刷新页面点击图片会发现多了个上传标签</p>
<p><span class="img-wrap"><img data-src="/img/bVRlZj?w=265&amp;h=217" src="https://static.alili.tech/img/bVRlZj?w=265&amp;h=217" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>此时就可以点击Choose File上传图片了，但是点击上传到服务器不能上传，此时需要在ckeditor文件夹中的config.js配置文件中加一段代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="config.filebrowserUploadUrl = '/ckeditorUpload?type=File';  
config.filebrowserImageUploadUrl = &quot;/ckeditorUpload?type=image&quot;;
config.filebrowserFlashUploadUrl = '/ckeditorUpload?type=Flash';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code><span class="hljs-built_in">config</span>.filebrowserUploadUrl = <span class="hljs-string">'/ckeditorUpload?type=File'</span><span class="hljs-comment">;  </span>
<span class="hljs-built_in">config</span>.filebrowserImageUploadUrl = <span class="hljs-string">"/ckeditorUpload?type=image"</span><span class="hljs-comment">;</span>
<span class="hljs-built_in">config</span>.filebrowserFlashUploadUrl = <span class="hljs-string">'/ckeditorUpload?type=Flash'</span><span class="hljs-comment">;</span></code></pre>
<p>一般就加第一个就行了，也可以三个都加，顾名思义，看它的名字就会懂什么意思了吧，后面的是你的服务器后台，响应过去，在你的服务器实现上传，每种语言实现也就不一样，这里不详讲，有问题的可以去看看你使用语言的文件上传方式，上传图片的功能就实现了。</p>
<p>然后是浏览服务器的功能，可是在上面连按钮都没有，怎么实现呢？其实很简单的，只需在刚才的config.js文件里面加上这段代码即可：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="config.filebrowserImageBrowseUrl = '/browerServer?type=image';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">config</span>.filebrowserImageBrowseUrl = <span class="hljs-string">'/browerServer?type=image'</span>;</code></pre>
<p>后面的是你服务器响应地址，保存后去刷新页面，发现，按钮已经出来了</p>
<p><span class="img-wrap"><img data-src="/img/bVRl3V?w=268&amp;h=343" src="https://static.alili.tech/img/bVRl3V?w=268&amp;h=343" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>但是在服务器里面要怎么实现图片的管理呢？这里每种语言实现也不一样了，大家可以自行搜索图片管理的代码，但我看到网上Java的，PHP的挺多，就是很少看到nodejs的，这里给出nodejs的实现方法：</p>
<p>服务器代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.get('/browerServer', function (req, res, next) {
    var callback = req.query.CKEditorFuncNum;
    var imgPath =  &quot;.\/public\/images\/uploads&quot;;
    var imgInfols = [];
    try {
        var files = rd.readSync(imgPath);
        for (var i in files) {
            if (!fs.lstatSync(files[i]).isDirectory()) {
                if (files[i].toLowerCase().split(/\.(jpg|jpeg|png|gif|bmp)$/).reverse()[0].length == 0) {
                    console.log(files[i]);
                    imgInfols[imgInfols.length] = {
                        name: files[i].split(&quot;\/&quot;).reverse()[0],//获取文件名
                        url: files[i].split(&quot;\/public&quot;).reverse()[0],
                        mtime: fs.statSync(files[i]).mtime
                    }
                }
            }
        }

    }
    catch (e) {
        console.log(e);
    }
    imgInfols.sort(function (a, b) {
        return Date.parse(b.ctime) - Date.parse(a.ctime);
    });
    console.log(callback);
    res.render('adminImgManage', {results:imgInfols, callback:callback});
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>router.get(<span class="hljs-string">'/browerServer'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res, next</span>) </span>{
    <span class="hljs-keyword">var</span> callback = req.query.CKEditorFuncNum;
    <span class="hljs-keyword">var</span> imgPath =  <span class="hljs-string">".\/public\/images\/uploads"</span>;
    <span class="hljs-keyword">var</span> imgInfols = [];
    <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">var</span> files = rd.readSync(imgPath);
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i <span class="hljs-keyword">in</span> files) {
            <span class="hljs-keyword">if</span> (!fs.lstatSync(files[i]).isDirectory()) {
                <span class="hljs-keyword">if</span> (files[i].toLowerCase().split(<span class="hljs-regexp">/\.(jpg|jpeg|png|gif|bmp)$/</span>).reverse()[<span class="hljs-number">0</span>].length == <span class="hljs-number">0</span>) {
                    <span class="hljs-built_in">console</span>.log(files[i]);
                    imgInfols[imgInfols.length] = {
                        <span class="hljs-attr">name</span>: files[i].split(<span class="hljs-string">"\/"</span>).reverse()[<span class="hljs-number">0</span>],<span class="hljs-comment">//获取文件名</span>
                        url: files[i].split(<span class="hljs-string">"\/public"</span>).reverse()[<span class="hljs-number">0</span>],
                        <span class="hljs-attr">mtime</span>: fs.statSync(files[i]).mtime
                    }
                }
            }
        }

    }
    <span class="hljs-keyword">catch</span> (e) {
        <span class="hljs-built_in">console</span>.log(e);
    }
    imgInfols.sort(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">a, b</span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">Date</span>.parse(b.ctime) - <span class="hljs-built_in">Date</span>.parse(a.ctime);
    });
    <span class="hljs-built_in">console</span>.log(callback);
    res.render(<span class="hljs-string">'adminImgManage'</span>, {<span class="hljs-attr">results</span>:imgInfols, <span class="hljs-attr">callback</span>:callback});
});</code></pre>
<p>adminImgManage.ejs代码：//这里我用了image-picker，详见<a href="http://rvera.github.io/image-picker/" rel="nofollow noreferrer" target="_blank">http://rvera.github.io/image-...</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<% include ../header.ejs %>
<link rel=&quot;stylesheet&quot; type=&quot;text/css&quot; href=&quot;/stylesheets/image-picker.css&quot;>
<script src=&quot;/javascripts/prettify.js&quot; type=&quot;text/javascript&quot;></script>
<script src=&quot;/javascripts/jquery.masonry.min.js&quot; type=&quot;text/javascript&quot;></script>
<script src=&quot;/javascripts/show_html.js&quot; type=&quot;text/javascript&quot;></script>
<script src=&quot;/javascripts/image-picker.min.js&quot; type=&quot;text/javascript&quot;></script>
<div class=&quot;container&quot;>
    <div>
        <div class=&quot;text-center&quot; style=&quot;padding-bottom: 20px;&quot;>
            <button type=&quot;button&quot; class=&quot;btn btn-primary select&quot;>选择</button>
            <button type=&quot;button&quot; class=&quot;btn btn-primary delete&quot;>删除</button>
        </div>
        <select class=&quot;image-picker&quot; style=&quot;display: none;&quot;>
            <% results.forEach(function(item){ %>
                <option data-img-src=&quot;<%= item.url%>&quot; value=&quot;<%= item.name%>&quot;><%= item.name%></option>
            <%})%>
        </select>
    </div>
</div>
<script type=&quot;text/javascript&quot;>
jQuery(&quot;select.image-picker&quot;).imagepicker({
    hide_select:  false,
});
$(document).ready(function(){
    $(&quot;.select&quot;).click(function(){
        window.location.href = &quot;/adminSelectImg/&quot; + $(&quot;.image-picker&quot;).val() + &quot;/&quot; + <%= callback%>;
    });
    $(&quot;.delete&quot;).click(function(){
        window.location.href = &quot;/adminDeleteImg/&quot; + $(&quot;.image-picker&quot;).val();
    });
});
</script>
<% include ../footer.ejs %>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs erb"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">%</span></span></span><span class="ruby"> <span class="hljs-keyword">include</span> ../header.ejs </span><span class="xml"><span class="hljs-tag">%&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"/stylesheets/image-picker.css"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"/javascripts/prettify.js"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"/javascripts/jquery.masonry.min.js"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"/javascripts/show_html.js"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"/javascripts/image-picker.min.js"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"text-center"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"padding-bottom: 20px;"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn btn-primary select"</span>&gt;</span>选择<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn btn-primary delete"</span>&gt;</span>删除<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">select</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"image-picker"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"display: none;"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">%</span></span></span><span class="ruby"> results.forEach(function(item){ </span><span class="xml"><span class="hljs-tag">%&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">data-img-src</span>=<span class="hljs-string">"&lt;%=</span></span></span><span class="ruby"> item.url</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">%&gt;"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"&lt;%=</span></span></span><span class="ruby"> item.name</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">%&gt;"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">%=</span></span></span><span class="ruby"> item.name</span><span class="xml"><span class="hljs-tag">%&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">%</span></span></span><span class="ruby">})</span><span class="xml"><span class="hljs-tag">%&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">select</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
jQuery(<span class="hljs-string">"select.image-picker"</span>).imagepicker({
    <span class="hljs-attr">hide_select</span>:  <span class="hljs-literal">false</span>,
});
$(<span class="hljs-built_in">document</span>).ready(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    $(<span class="hljs-string">".select"</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">window</span>.location.href = <span class="hljs-string">"/adminSelectImg/"</span> + $(<span class="hljs-string">".image-picker"</span>).val() + <span class="hljs-string">"/"</span> + <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">%=</span></span></span></span></span><span class="ruby"> callback</span><span class="xml"><span class="javascript">%&gt;;
    });
    $(<span class="hljs-string">".delete"</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">window</span>.location.href = <span class="hljs-string">"/adminDeleteImg/"</span> + $(<span class="hljs-string">".image-picker"</span>).val();
    });
});
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">%</span></span></span><span class="ruby"> <span class="hljs-keyword">include</span> ../footer.ejs </span><span class="xml"><span class="hljs-tag">%&gt;</span></span></code></pre>
<p>图片选择服务器处理代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.get('/adminSelectImg/:name/:callback', function (req, res, next) {
    var name = req.params.name;
    var callback = req.params.callback;
    var str = &quot;<script type=\&quot;text/javascript\&quot;>&quot; + &quot;window.opener.CKEDITOR.tools.callFunction(&quot;+ callback + &quot;,'&quot; + &quot;/images/uploads/&quot;+ name + &quot;','');window.close();&quot; + &quot;</script>&quot;;
    res.send(str);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code>router.<span class="hljs-keyword">get</span>(<span class="hljs-string">'/adminSelectImg/:name/:callback'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> </span>(req, res, next) {
    <span class="hljs-keyword">var</span> name = req.params.name;
    <span class="hljs-keyword">var</span> <span class="hljs-keyword">callback</span> = req.params.<span class="hljs-keyword">callback</span>;
    <span class="hljs-keyword">var</span> str = <span class="hljs-string">"&lt;script type=\"text/javascript\"&gt;"</span> + <span class="hljs-string">"window.opener.CKEDITOR.tools.callFunction("</span>+ <span class="hljs-keyword">callback</span> + <span class="hljs-string">",'"</span> + <span class="hljs-string">"/images/uploads/"</span>+ name + <span class="hljs-string">"','');window.close();"</span> + <span class="hljs-string">"&lt;/script&gt;"</span>;
    res.send(str);
});</code></pre>
<p>删除的代码就不粘了，举一反三，注明下代码中的window.opener.CKEDITOR.tools.callFunction，这个是ckeditor的反值得函数，执行后就会把括号内的后面的路径加载到图像信息的URL中，这样点击确定就可以将图片放入编辑器了。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CKEditor4.7怎样实现上传图片，浏览服务器(无需ckfinder)，nodejs图片管理，字体居中，图片居中(超详细)

## 原文链接
[https://segmentfault.com/a/1190000010294176](https://segmentfault.com/a/1190000010294176)

