---
title: 'js控制文件拖拽，获取拖拽内容。' 
date: 2018-12-13 2:30:07
hidden: true
slug: q0npokfxbw
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>在用户拖拽文件到浏览器的某个元素上时，js可以监听到与拖拽相关的事件，并对拖拽结果进行处理，本文讨论下和拖拽文件相关的一些问题，不过没有处理太多关于兼容性的问题。</blockquote>
<h1 id="articleHeader0">拖拽事件</h1>
<p><code>js</code>能够监听到拖拽的事件有<code>drag</code>、<code>dragend</code>、<code>dragenter</code>、<code>dragexit(没有浏览器实现)</code>、<code>dragleave</code>、<code>dragover</code>、<code>dragstart</code>、<code>drop</code>，详细的内容可以看<a href="https://developer.mozilla.org/zh-CN/docs/Web/Events/drag" rel="nofollow noreferrer" target="_blank">MDN</a>。</p>
<p>其中，与拖拽文件相关的事件有<code>dragenter(文件拖拽进)</code>、<code>dragover(文件拖拽在悬浮)</code>、<code>dragleave(文件拖拽离开)</code>、<code>drop(文件拖拽放下)</code>。<br>拖拽事件可以绑定到指定的DOM元素上，可以绑定到整个页面中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var dropEle = document.querySelector('#dropZone');
dropEle.addEventListener('drop', function (e) {
    // 
}, false);

document.addEventListener('drop', function (e) {
    // 
}, false);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> dropEle = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'#dropZone'</span>);
dropEle.addEventListener(<span class="hljs-string">'drop'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
    <span class="hljs-comment">// </span>
}, <span class="hljs-literal">false</span>);

<span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">'drop'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
    <span class="hljs-comment">// </span>
}, <span class="hljs-literal">false</span>);</code></pre>
<h1 id="articleHeader1">阻止默认行为</h1>
<p>一般来说，我们只需要把处理拖拽文件的业务逻辑写到<code>drop</code>事件中就可以了，为什么还要绑定<code>dragenter</code>、<code>dragover</code>、<code>dragleave</code>这三个事件呢？</p>
<p>因为当你拖拽一个文件到没有对拖拽事件进行处理的浏览器中的时候，浏览器会打开这个文件，比如拖拽一张图片浏览器会打开这个图片，在没有PDF阅读器的时候也可以拖拽一个PDF到浏览器中，浏览器就会打开这个PDF文件。</p>
<p>如果浏览器打开了拖拽的文件，页面就跳走了，我们希望得到拖拽的文件，而不是让页面跳走。上面说到浏览器会打开拖拽的文件是浏览器的默认行为，我们需要阻止这个默认行为，就需要再上述的事件中进行阻止。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="dropZone.addEventListener(&quot;dragenter&quot;, function (e) {
    e.preventDefault();
    e.stopPropagation();
}, false);

dropZone.addEventListener(&quot;dragover&quot;, function (e) {
    e.preventDefault();
    e.stopPropagation();
}, false);

dropZone.addEventListener(&quot;dragleave&quot;, function (e) {
    e.preventDefault();
    e.stopPropagation();
}, false);

dropZone.addEventListener(&quot;drop&quot;, function (e) {
    e.preventDefault();
    e.stopPropagation();
    // 处理拖拽文件的逻辑
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">dropZone.addEventListener(<span class="hljs-string">"dragenter"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
    e.preventDefault();
    e.stopPropagation();
}, <span class="hljs-literal">false</span>);

dropZone.addEventListener(<span class="hljs-string">"dragover"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
    e.preventDefault();
    e.stopPropagation();
}, <span class="hljs-literal">false</span>);

dropZone.addEventListener(<span class="hljs-string">"dragleave"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
    e.preventDefault();
    e.stopPropagation();
}, <span class="hljs-literal">false</span>);

dropZone.addEventListener(<span class="hljs-string">"drop"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
    e.preventDefault();
    e.stopPropagation();
    <span class="hljs-comment">// 处理拖拽文件的逻辑</span>
}</code></pre>
<p>实际上<code>dragenter</code>不阻止默认行为也不会触发浏览器打开文件，为了防止某些浏览器可能有的兼容性问题，把拖拽周期中的所有的事件都阻止默认行为并且阻止了事件冒泡。</p>
<h1 id="articleHeader2">获得拖拽的文件</h1>
<p>我们会在<code>drop</code>这个事件的回调中的事件对象能够得到文件对象。</p>
<p>在事件对象中，一个<code>e.dataTransfer</code>这样的属性，它是一个<code>DataTransfer</code>类型的数据，有如下的属性</p>
<table>
<thead><tr>
<th align="left">属性</th>
<th align="left">类型</th>
<th align="left">说明</th>
</tr></thead>
<tbody>
<tr>
<td align="left">dropEffect</td>
<td align="left">String</td>
<td align="left">用来hack某些兼容性问题</td>
</tr>
<tr>
<td align="left">effectAllowed</td>
<td align="left">String</td>
<td align="left">暂时不用</td>
</tr>
<tr>
<td align="left">files</td>
<td align="left">FileList</td>
<td align="left">拖拽的文件列表</td>
</tr>
<tr>
<td align="left">items</td>
<td align="left">DataTransferItemList</td>
<td align="left">拖拽的数据(有可能是字符串)</td>
</tr>
<tr>
<td align="left">types</td>
<td align="left">Array</td>
<td align="left">拖拽的数据类型 该属性在Safari下比较混乱</td>
</tr>
</tbody>
</table>
<p>在<code>Chrome</code>中我们用<code>items</code>对象获得文件，其他浏览器用<code>files</code>获得文件，主要是为了处理拖拽文件夹的问题，最好不允许用户拖拽文件夹，因为文件夹内可能还有文件夹，递归上传文件会很久，如果不递归查找，只上传目录第一层级的文件，用户可能以为上传功能了，但是没有上传子目录文件，所以还是禁止上传文件夹比较好，后面我会说要怎么处理。</p>
<h1 id="articleHeader3">Chrome获取文件</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="dropZone.addEventListener(&quot;drop&quot;, function (e) {
    e.preventDefault();
    e.stopPropagation();
    
    var df = e.dataTransfer;
    var dropFiles = []; // 存放拖拽的文件对象
    
    if(df.items !== undefined) {
        // Chrome有items属性，对Chrome的单独处理
        for(var i = 0; i < df.items.length; i++) {
            var item = df.items[i];
            // 用webkitGetAsEntry禁止上传目录
            if(item.kind === &quot;file&quot; &amp;&amp; item.webkitGetAsEntry().isFile) {
                var file = item.getAsFile();
                dropFiles.push(file);
            }
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">dropZone.addEventListener(<span class="hljs-string">"drop"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
    e.preventDefault();
    e.stopPropagation();
    
    <span class="hljs-keyword">var</span> df = e.dataTransfer;
    <span class="hljs-keyword">var</span> dropFiles = []; <span class="hljs-comment">// 存放拖拽的文件对象</span>
    
    <span class="hljs-keyword">if</span>(df.items !== <span class="hljs-literal">undefined</span>) {
        <span class="hljs-comment">// Chrome有items属性，对Chrome的单独处理</span>
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; df.items.length; i++) {
            <span class="hljs-keyword">var</span> item = df.items[i];
            <span class="hljs-comment">// 用webkitGetAsEntry禁止上传目录</span>
            <span class="hljs-keyword">if</span>(item.kind === <span class="hljs-string">"file"</span> &amp;&amp; item.webkitGetAsEntry().isFile) {
                <span class="hljs-keyword">var</span> file = item.getAsFile();
                dropFiles.push(file);
            }
        }
    }
}</code></pre>
<h1 id="articleHeader4">其他浏览器获取文件</h1>
<p>这里只测试了Safari，其他浏览器并没有测试，不过看完本文一定也有思路处理其他浏览器的兼容情况。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="dropZone.addEventListener(&quot;drop&quot;, function (e) {
    e.preventDefault();
    e.stopPropagation();
    
    var df = e.dataTransfer;
    var dropFiles = []; // 存放拖拽的文件对象
    
    if(df.items !== undefined) {
        // Chrome拖拽文件逻辑
    } else {
        for(var i = 0; i < df.files.length; i++) {
            dropFiles.push(df.files[i]);
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">dropZone.addEventListener(<span class="hljs-string">"drop"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
    e.preventDefault();
    e.stopPropagation();
    
    <span class="hljs-keyword">var</span> df = e.dataTransfer;
    <span class="hljs-keyword">var</span> dropFiles = []; <span class="hljs-comment">// 存放拖拽的文件对象</span>
    
    <span class="hljs-keyword">if</span>(df.items !== <span class="hljs-literal">undefined</span>) {
        <span class="hljs-comment">// Chrome拖拽文件逻辑</span>
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; df.files.length; i++) {
            dropFiles.push(df.files[i]);
        }
    }
}</code></pre>
<p>由于<code>Safari</code>没有<code>item</code>，自然也没有<code>webkitGetAsEntry</code>，所以在Safari无法确定拖拽的是否是文件还是文件夹。</p>
<h2 id="articleHeader5">非Chrome内核浏览器判断目录的方法</h2>
<p>浏览器获取到的每个file对象有四个属性：<code>lastModified</code>、<code>name</code>、<code>size</code>、<code>type</code>，其中<code>type</code>是文件的<code>MIME Type</code>，文件夹的<code>type</code>是空的，但是有些文件没有<code>MIME Type</code>，如果按照<code>type</code>是否为空判断是不是拖拽的文件夹的话，会误伤一部分文件，所以这个方法行。</p>
<p>那么还有什么方法可以判断呢，思路大概是这样子的，用户拖拽的文件和文件夹应该是不一样的东西，用<code>File API</code>操作的时候应该会有区别，比如进行某些操作的时候，文件就能够正常操作，但是文件夹就会报错，通过错误的捕获就能够判断是文件还是文件夹了，好我们根据这个思路来写一下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="dropZone.addEventListener(&quot;drop&quot;, function (e) {
    e.preventDefault();
    e.stopPropagation();

    var df = e.dataTransfer;
    var dropFiles = [];
    
    if(df.items !== undefined){
        // Chrome拖拽文件逻辑
    } else {
        for(var i = 0; i < df.files.length; i++){
            var dropFile = df.files[i];
            if ( dropFile.type ) {
                // 如果type不是空串，一定是文件
                dropFiles.push(dropFile);
            } else {
                try {
                    var fileReader = new FileReader();
                    fileReader.readAsDataURL(dropFile.slice(0, 3));

                    fileReader.addEventListener('load', function (e) {
                        console.log(e, 'load');
                        dropFiles.push(dropFile);
                    }, false);

                    fileReader.addEventListener('error', function (e) {
                        console.log(e, 'error，不可以上传文件夹');
                    }, false);

                } catch (e) {
                    console.log(e, 'catch error，不可以上传文件夹');
                }
            }
        }
    }
}, false);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>dropZone.addEventListener(<span class="hljs-string">"drop"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
    e.preventDefault();
    e.stopPropagation();

    <span class="hljs-keyword">var</span> df = e.dataTransfer;
    <span class="hljs-keyword">var</span> dropFiles = [];
    
    <span class="hljs-keyword">if</span>(df.items !== <span class="hljs-literal">undefined</span>){
        <span class="hljs-comment">// Chrome拖拽文件逻辑</span>
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; df.files.length; i++){
            <span class="hljs-keyword">var</span> dropFile = df.files[i];
            <span class="hljs-keyword">if</span> ( dropFile.type ) {
                <span class="hljs-comment">// 如果type不是空串，一定是文件</span>
                dropFiles.push(dropFile);
            } <span class="hljs-keyword">else</span> {
                <span class="hljs-keyword">try</span> {
                    <span class="hljs-keyword">var</span> fileReader = <span class="hljs-keyword">new</span> FileReader();
                    fileReader.readAsDataURL(dropFile.slice(<span class="hljs-number">0</span>, <span class="hljs-number">3</span>));

                    fileReader.addEventListener(<span class="hljs-string">'load'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
                        <span class="hljs-built_in">console</span>.log(e, <span class="hljs-string">'load'</span>);
                        dropFiles.push(dropFile);
                    }, <span class="hljs-literal">false</span>);

                    fileReader.addEventListener(<span class="hljs-string">'error'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
                        <span class="hljs-built_in">console</span>.log(e, <span class="hljs-string">'error，不可以上传文件夹'</span>);
                    }, <span class="hljs-literal">false</span>);

                } <span class="hljs-keyword">catch</span> (e) {
                    <span class="hljs-built_in">console</span>.log(e, <span class="hljs-string">'catch error，不可以上传文件夹'</span>);
                }
            }
        }
    }
}, <span class="hljs-literal">false</span>);</code></pre>
<p>上面代码创建了一个<code>FileReader</code>实例，通过这个实例对文件进行读取，我测试读取一个1G多的文件要3S多，时间有点长，就用<code>slice</code>截取了前3个字符，为什么是前3个不是前2个或者前4个呢，因为代码是我写的，我开心这么写呗~</p>
<p>如果<code>load</code>事件触发了，就说明拖拽过来的东西是文件，如果<code>error</code>事件触发了，就说明是文件夹，为了防止其他可能的潜在错误，用<code>try</code>包起来这段代码。</p>
<h1 id="articleHeader6">三方应用的一点点小hack</h1>
<p>经过测试发现通过<code>Mac</code>的<code>Finder</code>拖拽文件没有问题，但是有时候文件并不一定在<code>Finder</code>中，也可能在某些应用中，有一个应用叫做<code>圈点</code>，这个应用的用户反馈文件拖拽失效，去看了其他开源文件上传的源码，发现了这样一行代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="dropZone.addEventListener(&quot;dragover&quot;, function (e) {
    e.dataTransfer.dropEffect = 'copy'; // 兼容某些三方应用，如圈点
    e.preventDefault();
    e.stopPropagation();
}, false);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">dropZone.addEventListener(<span class="hljs-string">"dragover"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
    e.dataTransfer.dropEffect = <span class="hljs-string">'copy'</span>; <span class="hljs-comment">// 兼容某些三方应用，如圈点</span>
    e.preventDefault();
    e.stopPropagation();
}, <span class="hljs-literal">false</span>);</code></pre>
<p>需要把<code>dropEffect</code>置为<code>copy</code>，上网搜了下这个问题，源码文档中也没有说为什么要加这个，有兴趣的同学可以找一下为什么。</p>
<h1 id="articleHeader7">可以拿来就用的代码</h1>
<p>由于用了<code>FileReader</code>去读取文件，这是一个异步IO操作，为了记录当前处理了多少个文件，以及什么时候触发拖拽结束的回调，写了一个<code>checkDropFinish</code>的方法一直去比较处理的文件数量和文件总数，确定所有文件处理完了后就去调用完成的回调。</p>
<p>另外，我在最后调试异步处理的时候，用的断点调试，发现断点调试在<code>Safari</code>中会导致异步回调不触发，需要自己调试定制功能的同学注意下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 获得拖拽文件的回调函数
function getDropFileCallBack (dropFiles) {
    console.log(dropFiles, dropFiles.length);
}

var dropZone = document.querySelector(&quot;#dropZone&quot;);
dropZone.addEventListener(&quot;dragenter&quot;, function (e) {
    e.preventDefault();
    e.stopPropagation();
}, false);

dropZone.addEventListener(&quot;dragover&quot;, function (e) {
    e.dataTransfer.dropEffect = 'copy'; // 兼容某些三方应用，如圈点
    e.preventDefault();
    e.stopPropagation();
}, false);

dropZone.addEventListener(&quot;dragleave&quot;, function (e) {
    e.preventDefault();
    e.stopPropagation();
}, false);

dropZone.addEventListener(&quot;drop&quot;, function (e) {
    e.preventDefault();
    e.stopPropagation();

    var df = e.dataTransfer;
    var dropFiles = []; // 拖拽的文件，会放到这里
    var dealFileCnt = 0; // 读取文件是个异步的过程，需要记录处理了多少个文件了
    var allFileLen = df.files.length; // 所有的文件的数量，给非Chrome浏览器使用的变量

    // 检测是否已经把所有的文件都遍历过了
    function checkDropFinish () {
        if ( dealFileCnt === allFileLen-1 ) {
            getDropFileCallBack(dropFiles);
        }
        dealFileCnt++;
    }

    if(df.items !== undefined){
        // Chrome拖拽文件逻辑
        for(var i = 0; i < df.items.length; i++) {
            var item = df.items[i];
            if(item.kind === &quot;file&quot; &amp;&amp; item.webkitGetAsEntry().isFile) {
                var file = item.getAsFile();
                dropFiles.push(file);
                console.log(file);
            }
        }
    } else {
        // 非Chrome拖拽文件逻辑
        for(var i = 0; i < allFileLen; i++) {
            var dropFile = df.files[i];
            if ( dropFile.type ) {
                dropFiles.push(dropFile);
                checkDropFinish();
            } else {
                try {
                    var fileReader = new FileReader();
                    fileReader.readAsDataURL(dropFile.slice(0, 3));

                    fileReader.addEventListener('load', function (e) {
                        console.log(e, 'load');
                        dropFiles.push(dropFile);
                        checkDropFinish();
                    }, false);

                    fileReader.addEventListener('error', function (e) {
                        console.log(e, 'error，不可以上传文件夹');
                        checkDropFinish();
                    }, false);

                } catch (e) {
                    console.log(e, 'catch error，不可以上传文件夹');
                    checkDropFinish();
                }
            }
        }
    }
}, false);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 获得拖拽文件的回调函数</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getDropFileCallBack</span> (<span class="hljs-params">dropFiles</span>) </span>{
    <span class="hljs-built_in">console</span>.log(dropFiles, dropFiles.length);
}

<span class="hljs-keyword">var</span> dropZone = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">"#dropZone"</span>);
dropZone.addEventListener(<span class="hljs-string">"dragenter"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
    e.preventDefault();
    e.stopPropagation();
}, <span class="hljs-literal">false</span>);

dropZone.addEventListener(<span class="hljs-string">"dragover"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
    e.dataTransfer.dropEffect = <span class="hljs-string">'copy'</span>; <span class="hljs-comment">// 兼容某些三方应用，如圈点</span>
    e.preventDefault();
    e.stopPropagation();
}, <span class="hljs-literal">false</span>);

dropZone.addEventListener(<span class="hljs-string">"dragleave"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
    e.preventDefault();
    e.stopPropagation();
}, <span class="hljs-literal">false</span>);

dropZone.addEventListener(<span class="hljs-string">"drop"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
    e.preventDefault();
    e.stopPropagation();

    <span class="hljs-keyword">var</span> df = e.dataTransfer;
    <span class="hljs-keyword">var</span> dropFiles = []; <span class="hljs-comment">// 拖拽的文件，会放到这里</span>
    <span class="hljs-keyword">var</span> dealFileCnt = <span class="hljs-number">0</span>; <span class="hljs-comment">// 读取文件是个异步的过程，需要记录处理了多少个文件了</span>
    <span class="hljs-keyword">var</span> allFileLen = df.files.length; <span class="hljs-comment">// 所有的文件的数量，给非Chrome浏览器使用的变量</span>

    <span class="hljs-comment">// 检测是否已经把所有的文件都遍历过了</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkDropFinish</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">if</span> ( dealFileCnt === allFileLen<span class="hljs-number">-1</span> ) {
            getDropFileCallBack(dropFiles);
        }
        dealFileCnt++;
    }

    <span class="hljs-keyword">if</span>(df.items !== <span class="hljs-literal">undefined</span>){
        <span class="hljs-comment">// Chrome拖拽文件逻辑</span>
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; df.items.length; i++) {
            <span class="hljs-keyword">var</span> item = df.items[i];
            <span class="hljs-keyword">if</span>(item.kind === <span class="hljs-string">"file"</span> &amp;&amp; item.webkitGetAsEntry().isFile) {
                <span class="hljs-keyword">var</span> file = item.getAsFile();
                dropFiles.push(file);
                <span class="hljs-built_in">console</span>.log(file);
            }
        }
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-comment">// 非Chrome拖拽文件逻辑</span>
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; allFileLen; i++) {
            <span class="hljs-keyword">var</span> dropFile = df.files[i];
            <span class="hljs-keyword">if</span> ( dropFile.type ) {
                dropFiles.push(dropFile);
                checkDropFinish();
            } <span class="hljs-keyword">else</span> {
                <span class="hljs-keyword">try</span> {
                    <span class="hljs-keyword">var</span> fileReader = <span class="hljs-keyword">new</span> FileReader();
                    fileReader.readAsDataURL(dropFile.slice(<span class="hljs-number">0</span>, <span class="hljs-number">3</span>));

                    fileReader.addEventListener(<span class="hljs-string">'load'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
                        <span class="hljs-built_in">console</span>.log(e, <span class="hljs-string">'load'</span>);
                        dropFiles.push(dropFile);
                        checkDropFinish();
                    }, <span class="hljs-literal">false</span>);

                    fileReader.addEventListener(<span class="hljs-string">'error'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
                        <span class="hljs-built_in">console</span>.log(e, <span class="hljs-string">'error，不可以上传文件夹'</span>);
                        checkDropFinish();
                    }, <span class="hljs-literal">false</span>);

                } <span class="hljs-keyword">catch</span> (e) {
                    <span class="hljs-built_in">console</span>.log(e, <span class="hljs-string">'catch error，不可以上传文件夹'</span>);
                    checkDropFinish();
                }
            }
        }
    }
}, <span class="hljs-literal">false</span>);</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
js控制文件拖拽，获取拖拽内容。

## 原文链接
[https://segmentfault.com/a/1190000013298317](https://segmentfault.com/a/1190000013298317)

