---
title: 'js实现文件切片上传，断点续传' 
date: 2019-01-14 2:30:07
hidden: true
slug: wnhh1fmuior
categories: [reprint]
---

{{< raw >}}

                    
<p>思路很简单，拿到文件，保存文件唯一性标识，切割文件，分段上传，每次上传一段，根据唯一性标识判断文件上传进度，直到文件的全部片段上传完毕。</p>
<p>以下文字没有完整的代码，只有基础理论，伸手党绕道。</p>
<h4>读取文件</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var input = document.querySelector('input');
input.addEventListener('change', function() {
    var file = this.files[0];
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> input = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'input'</span>);
input.addEventListener(<span class="hljs-string">'change'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> file = <span class="hljs-keyword">this</span>.files[<span class="hljs-number">0</span>];
});</code></pre>
<h4>文件唯一性</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var md5code = md5(file);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> md5code = md5(<span class="hljs-keyword">file</span>);</code></pre>
<h4>文件切割</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var reader = new FileReader();
reader.readAsArrayBuffer(file);
reader.addEventListener(&quot;load&quot;, function(e) {
    //每10M切割一段,这里只做一个切割演示，实际切割需要循环切割，
    var slice = e.target.result.slice(0, 10*1024*1024);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> reader = <span class="hljs-keyword">new</span> FileReader();
reader.readAsArrayBuffer(file);
reader.addEventListener(<span class="hljs-string">"load"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(e)</span> </span>{
    <span class="hljs-comment">//每10M切割一段,这里只做一个切割演示，实际切割需要循环切割，</span>
    <span class="hljs-keyword">var</span> slice = e.target.result.slice(<span class="hljs-number">0</span>, <span class="hljs-number">10</span>*<span class="hljs-number">1024</span>*<span class="hljs-number">1024</span>);
});</code></pre>
<h4>h5上传一个（一片）文件</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var formdata = new FormData();
formdata.append('0', slice);
//这里是有一个坑的，部分设备无法获取文件名称，和文件类型，这个在最后给出解决方案
formdata.append('filename', file.filename);
var xhr = new XMLHttpRequest();
xhr.addEventListener('load', function() {
    //xhr.responseText
});
xhr.open('POST', '');
xhr.send(formdata);
xhr.addEventListener('progress', updateProgress);
xhr.upload.addEventListener('progress', updateProgress);

function updateProgress(event) {
    if (event.lengthComputable) {
        //进度条
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> formdata = <span class="hljs-keyword">new</span> FormData();
formdata.append(<span class="hljs-string">'0'</span>, slice);
<span class="hljs-comment">//这里是有一个坑的，部分设备无法获取文件名称，和文件类型，这个在最后给出解决方案</span>
formdata.append(<span class="hljs-string">'filename'</span>, file.filename);
<span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest();
xhr.addEventListener(<span class="hljs-string">'load'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-comment">//xhr.responseText</span>
});
xhr.open(<span class="hljs-string">'POST'</span>, <span class="hljs-string">''</span>);
xhr.send(formdata);
xhr.addEventListener(<span class="hljs-string">'progress'</span>, updateProgress);
xhr.upload.addEventListener(<span class="hljs-string">'progress'</span>, updateProgress);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">updateProgress</span><span class="hljs-params">(event)</span> </span>{
    <span class="hljs-keyword">if</span> (event.lengthComputable) {
        <span class="hljs-comment">//进度条</span>
    }
}</code></pre>
<h4>无法获取文件类型的设备解决方案</h4>
<blockquote>首先在：<a href="http://www.garykessler.net/library/file_sigs.html%E6%9F%A5%E6%89%BE%E5%AF%B9%E5%BA%94%E6%96%87%E4%BB%B6%E7%9A%84%E5%A4%B4%E4%BF%A1%E6%81%AF" rel="nofollow noreferrer" target="_blank">http://www.garykessler.net/li...</a><br>这里只给出了常见的图片和视频的文件类型判断</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function checkFileType(type, file, back) {
    /**
     * type png jpg mp4 ...
     * file input.change=> this.files[0]
     * back callback(boolean)
     */
    // http://www.garykessler.net/library/file_sigs.html
    var args = arguments;
    if (args.length != 3) {
        back(0);
    }
    var type = args[0]; // type = '(png|jpg)' , 'png'
    var file = args[1];
    var back = typeof args[2] == 'function' ? args[2] : function() {};
    if (file.type == '') {
        // 如果系统无法获取文件类型，则读取二进制流，对二进制进行解析文件类型
        var imgType = [
            'ff d8 ff', //jpg
            '89 50 4e', //png

            '0 0 0 14 66 74 79 70 69 73 6F 6D', //mp4
            '0 0 0 18 66 74 79 70 33 67 70 35', //mp4
            '0 0 0 0 66 74 79 70 33 67 70 35', //mp4
            '0 0 0 0 66 74 79 70 4D 53 4E 56', //mp4
            '0 0 0 0 66 74 79 70 69 73 6F 6D', //mp4

            '0 0 0 18 66 74 79 70 6D 70 34 32', //m4v
            '0 0 0 0 66 74 79 70 6D 70 34 32', //m4v

            '0 0 0 14 66 74 79 70 71 74 20 20', //mov
            '0 0 0 0 66 74 79 70 71 74 20 20', //mov
            '0 0 0 0 6D 6F 6F 76', //mov

            '4F 67 67 53 0 02', //ogg
            '1A 45 DF A3', //ogg

            '52 49 46 46 x x x x 41 56 49 20', //avi (RIFF fileSize fileType LIST)(52 49 46 46,DC 6C 57 09,41 56 49 20,4C 49 53 54)
        ];
        var typeName = [
            'jpg',
            'png',
            'mp4',
            'mp4',
            'mp4',
            'mp4',
            'mp4',
            'm4v',
            'm4v',
            'mov',
            'mov',
            'mov',
            'ogg',
            'ogg',
            'avi',
        ];
        var sliceSize = /png|jpg|jpeg/.test(type) ? 3 : 12;
        var reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.addEventListener(&quot;load&quot;, function(e) {
            var slice = e.target.result.slice(0, sliceSize);
            reader = null;
            if (slice &amp;&amp; slice.byteLength == sliceSize) {
                var view = new Uint8Array(slice);
                var arr = [];
                view.forEach(function(v) {
                    arr.push(v.toString(16));
                });
                view = null;
                var idx = arr.join(' ').indexOf(imgType);
                if (idx > -1) {
                    back(typeName[idx]);
                } else {
                    arr = arr.map(function(v) {
                        if (i > 3 &amp;&amp; i < 8) {
                            return 'x';
                        }
                        return v;
                    });
                    var idx = arr.join(' ').indexOf(imgType);
                    if (idx > -1) {
                        back(typeName[idx]);
                    } else {
                        back(false);
                    }

                }
            } else {
                back(false);
            }

        });
    } else {
        var type = file.name.match(/\.(\w+)$/)[1];
        back(type);
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkFileType</span>(<span class="hljs-params">type, file, back</span>) </span>{
    <span class="hljs-comment">/**
     * type png jpg mp4 ...
     * file input.change=&gt; this.files[0]
     * back callback(boolean)
     */</span>
    <span class="hljs-comment">// http://www.garykessler.net/library/file_sigs.html</span>
    <span class="hljs-keyword">var</span> args = <span class="hljs-built_in">arguments</span>;
    <span class="hljs-keyword">if</span> (args.length != <span class="hljs-number">3</span>) {
        back(<span class="hljs-number">0</span>);
    }
    <span class="hljs-keyword">var</span> type = args[<span class="hljs-number">0</span>]; <span class="hljs-comment">// type = '(png|jpg)' , 'png'</span>
    <span class="hljs-keyword">var</span> file = args[<span class="hljs-number">1</span>];
    <span class="hljs-keyword">var</span> back = <span class="hljs-keyword">typeof</span> args[<span class="hljs-number">2</span>] == <span class="hljs-string">'function'</span> ? args[<span class="hljs-number">2</span>] : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{};
    <span class="hljs-keyword">if</span> (file.type == <span class="hljs-string">''</span>) {
        <span class="hljs-comment">// 如果系统无法获取文件类型，则读取二进制流，对二进制进行解析文件类型</span>
        <span class="hljs-keyword">var</span> imgType = [
            <span class="hljs-string">'ff d8 ff'</span>, <span class="hljs-comment">//jpg</span>
            <span class="hljs-string">'89 50 4e'</span>, <span class="hljs-comment">//png</span>

            <span class="hljs-string">'0 0 0 14 66 74 79 70 69 73 6F 6D'</span>, <span class="hljs-comment">//mp4</span>
            <span class="hljs-string">'0 0 0 18 66 74 79 70 33 67 70 35'</span>, <span class="hljs-comment">//mp4</span>
            <span class="hljs-string">'0 0 0 0 66 74 79 70 33 67 70 35'</span>, <span class="hljs-comment">//mp4</span>
            <span class="hljs-string">'0 0 0 0 66 74 79 70 4D 53 4E 56'</span>, <span class="hljs-comment">//mp4</span>
            <span class="hljs-string">'0 0 0 0 66 74 79 70 69 73 6F 6D'</span>, <span class="hljs-comment">//mp4</span>

            <span class="hljs-string">'0 0 0 18 66 74 79 70 6D 70 34 32'</span>, <span class="hljs-comment">//m4v</span>
            <span class="hljs-string">'0 0 0 0 66 74 79 70 6D 70 34 32'</span>, <span class="hljs-comment">//m4v</span>

            <span class="hljs-string">'0 0 0 14 66 74 79 70 71 74 20 20'</span>, <span class="hljs-comment">//mov</span>
            <span class="hljs-string">'0 0 0 0 66 74 79 70 71 74 20 20'</span>, <span class="hljs-comment">//mov</span>
            <span class="hljs-string">'0 0 0 0 6D 6F 6F 76'</span>, <span class="hljs-comment">//mov</span>

            <span class="hljs-string">'4F 67 67 53 0 02'</span>, <span class="hljs-comment">//ogg</span>
            <span class="hljs-string">'1A 45 DF A3'</span>, <span class="hljs-comment">//ogg</span>

            <span class="hljs-string">'52 49 46 46 x x x x 41 56 49 20'</span>, <span class="hljs-comment">//avi (RIFF fileSize fileType LIST)(52 49 46 46,DC 6C 57 09,41 56 49 20,4C 49 53 54)</span>
        ];
        <span class="hljs-keyword">var</span> typeName = [
            <span class="hljs-string">'jpg'</span>,
            <span class="hljs-string">'png'</span>,
            <span class="hljs-string">'mp4'</span>,
            <span class="hljs-string">'mp4'</span>,
            <span class="hljs-string">'mp4'</span>,
            <span class="hljs-string">'mp4'</span>,
            <span class="hljs-string">'mp4'</span>,
            <span class="hljs-string">'m4v'</span>,
            <span class="hljs-string">'m4v'</span>,
            <span class="hljs-string">'mov'</span>,
            <span class="hljs-string">'mov'</span>,
            <span class="hljs-string">'mov'</span>,
            <span class="hljs-string">'ogg'</span>,
            <span class="hljs-string">'ogg'</span>,
            <span class="hljs-string">'avi'</span>,
        ];
        <span class="hljs-keyword">var</span> sliceSize = <span class="hljs-regexp">/png|jpg|jpeg/</span>.test(type) ? <span class="hljs-number">3</span> : <span class="hljs-number">12</span>;
        <span class="hljs-keyword">var</span> reader = <span class="hljs-keyword">new</span> FileReader();
        reader.readAsArrayBuffer(file);
        reader.addEventListener(<span class="hljs-string">"load"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
            <span class="hljs-keyword">var</span> slice = e.target.result.slice(<span class="hljs-number">0</span>, sliceSize);
            reader = <span class="hljs-literal">null</span>;
            <span class="hljs-keyword">if</span> (slice &amp;&amp; slice.byteLength == sliceSize) {
                <span class="hljs-keyword">var</span> view = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Uint8Array</span>(slice);
                <span class="hljs-keyword">var</span> arr = [];
                view.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">v</span>) </span>{
                    arr.push(v.toString(<span class="hljs-number">16</span>));
                });
                view = <span class="hljs-literal">null</span>;
                <span class="hljs-keyword">var</span> idx = arr.join(<span class="hljs-string">' '</span>).indexOf(imgType);
                <span class="hljs-keyword">if</span> (idx &gt; <span class="hljs-number">-1</span>) {
                    back(typeName[idx]);
                } <span class="hljs-keyword">else</span> {
                    arr = arr.map(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">v</span>) </span>{
                        <span class="hljs-keyword">if</span> (i &gt; <span class="hljs-number">3</span> &amp;&amp; i &lt; <span class="hljs-number">8</span>) {
                            <span class="hljs-keyword">return</span> <span class="hljs-string">'x'</span>;
                        }
                        <span class="hljs-keyword">return</span> v;
                    });
                    <span class="hljs-keyword">var</span> idx = arr.join(<span class="hljs-string">' '</span>).indexOf(imgType);
                    <span class="hljs-keyword">if</span> (idx &gt; <span class="hljs-number">-1</span>) {
                        back(typeName[idx]);
                    } <span class="hljs-keyword">else</span> {
                        back(<span class="hljs-literal">false</span>);
                    }

                }
            } <span class="hljs-keyword">else</span> {
                back(<span class="hljs-literal">false</span>);
            }

        });
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">var</span> type = file.name.match(<span class="hljs-regexp">/\.(\w+)$/</span>)[<span class="hljs-number">1</span>];
        back(type);
    }
}
</code></pre>
<h5>调用方法</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="checkFileType('(mov|mp4|avi)',file,function(fileType){
    // fileType = mp4,
    // 如果file的类型不在枚举之列，则返回false
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>checkFileType(<span class="hljs-string">'(mov|mp4|avi)'</span>,file,<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(fileType)</span></span>{
    <span class="hljs-comment">// fileType = mp4,</span>
    <span class="hljs-comment">// 如果file的类型不在枚举之列，则返回false</span>
});</code></pre>
<h4>上面上传文件的一步，可以改成：</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="formdata.append('filename', md5code+'.'+fileType);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs go"><code style="word-break: break-word; white-space: initial;">formdata.<span class="hljs-built_in">append</span>(<span class="hljs-string">'filename'</span>, md5code+<span class="hljs-string">'.'</span>+fileType);</code></pre>
<p>总结：有了切割上传，有了文件唯一标识信息（文件md5）断点续传只不过是后台的一个小小的判断逻辑而已。</p>
<h2 id="articleHeader0">未来，前端，大有可为</h2>
<hr>
<p>有些小伙伴不是太清楚后台的小小的判断是怎么做的：<br>这里贴一张图给大家参考，自己手画，有点丑，将就下。</p>
<p><span class="img-wrap"><img data-src="/img/bV7uRl?w=922&amp;h=750" src="https://static.alili.tech/img/bV7uRl?w=922&amp;h=750" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>后续我再画一张完整的上传流程图给更新上来。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
js实现文件切片上传，断点续传

## 原文链接
[https://segmentfault.com/a/1190000009448892](https://segmentfault.com/a/1190000009448892)

