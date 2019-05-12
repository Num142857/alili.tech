---
title: 'JS基础篇--搞清Image加载事件(onload)、加载状态(complete)后，实现图片的本地预览，并自适应于父元素内' 
date: 2019-01-05 2:30:11
hidden: true
slug: whj15gl2og
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">onload与complete介绍</h2>
<p><code>complete</code>只是HTMLImageElement对象的一个属性，可以判断图片加载完成，不管图片是不是有缓存；而<code>onload</code>则是这个Image对象的load事件回调，当图片加载完成后执行onload绑定的函数。</p>
<p>给下面一个例子，解释下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.getElementById('load').onclick = function() {  
    var img = new Image();  
    img.src=&quot;images/avatar.png&quot;;  
    if(img.complete) {  
        console.log('dd');  
    }  
    img.onload = function() {  
        console.log('ff');  
    }  
} " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'load'</span>).onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{  
    <span class="hljs-keyword">var</span> img = <span class="hljs-keyword">new</span> Image();  
    img.src=<span class="hljs-string">"images/avatar.png"</span>;  
    <span class="hljs-keyword">if</span>(img.complete) {  
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'dd'</span>);  
    }  
    img.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{  
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'ff'</span>);  
    }  
} </code></pre>
<p>打印结果：<br>第一次点击，谷歌浏览器结果为：dd;IE浏览器结果为：ff。<br>第二次点击，谷歌浏览器结果为：dd,ff;IE浏览器结果为：ff。<br>第三次点击，谷歌浏览器结果为：dd,ff;IE浏览器结果为：dd,ff。<br>...</p>
<p>例2：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.getElementById('load').onclick = function() {  
    var img = new Image();  
    if(img.complete) {  
        console.log('dd');  
    }  
    img.onload = function() {  
        console.log('ff')  
    }  
    img.src=&quot;images/avatar.png&quot;;  
} " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'load'</span>).onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{  
    <span class="hljs-keyword">var</span> img = <span class="hljs-keyword">new</span> Image();  
    <span class="hljs-keyword">if</span>(img.complete) {  
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'dd'</span>);  
    }  
    img.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{  
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'ff'</span>)  
    }  
    img.src=<span class="hljs-string">"images/avatar.png"</span>;  
} </code></pre>
<p>打印结果：<br>第一次点击，谷歌浏览器结果为：dd,ff;IE浏览器结果为：ff。<br>第二次点击，谷歌浏览器结果为：dd,ff;IE浏览器结果为：ff。<br>第二次点击，谷歌浏览器结果为：dd,ff;IE浏览器结果为：ff。<br>...</p>
<p>例3：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.getElementById('load').onclick = function() {  
    var img = new Image(); 
    
    if(img.complete) {  
        console.log('dd');  
    }  
    img.onload = function() {  
        console.log('ff')  
    }  
    img.src=&quot;&quot;;     
}  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'load'</span>).onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{  
    <span class="hljs-keyword">var</span> img = <span class="hljs-keyword">new</span> Image(); 
    
    <span class="hljs-keyword">if</span>(img.complete) {  
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'dd'</span>);  
    }  
    img.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{  
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'ff'</span>)  
    }  
    img.src=<span class="hljs-string">""</span>;     
}  </code></pre>
<p>打印结果：<br>第一次点击，谷歌浏览器结果为：dd;IE浏览器结果为：空。<br>第二次点击，谷歌浏览器结果为：dd;IE浏览器结果为：空。<br>第二次点击，谷歌浏览器结果为：dd;IE浏览器结果为：空。<br>...</p>
<blockquote><p>根据结果得出：对于 complete 属性来讲，IE是根据图片是否显示过来判断，就是说当加载的图片显示出来后，complete 属性的值才为 true ，否则一直是 false ，和以前是否加载过该张图片没有关系，即和缓存没有关系！但是其它浏览器表现出来的确不一样，只要以前加载过该图，浏览器有缓存，也无论src是否有值，成功与否，只要获取到image，就可以执行，complete 就为 true。所以这个complete在不同浏览器中结果是不一样的。</p></blockquote>
<h2 id="articleHeader1">本地图片预览</h2>
<p>首先先写下布局，html代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;centerView&quot;>
    <div class=&quot;localPreview&quot;>
        <img id=&quot;showViewImg&quot;/>
    </div>
    <a class=&quot;inputParent&quot; href=&quot;javascript:void(0)&quot;>
        <i>点击上传文件</i>
        <input type=&quot;file&quot; id=&quot;filePath&quot; onchange=&quot;getCurrFile()&quot;/>
    </a>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"centerView"</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"localPreview"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"showViewImg"</span>/&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"inputParent"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:void(0)"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">i</span>&gt;</span>点击上传文件<span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"file"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"filePath"</span> <span class="hljs-attr">onchange</span>=<span class="hljs-string">"getCurrFile()"</span>/&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<p>css代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".centerView{
    width:150px;
}
.localPreview{
    position:relative;
    width:150px;
    height:150px;
    line-height:150px;
    text-align:center;
    background:#ccc;
}
.localPreview img{
    position: relative;
    vertical-align: middle;
}
.inputParent{
    position:relative;
    display:block;
    margin:10px auto;
    cursor:pointer;
    width:80px;
    height:30px;
    line-height:30px;
    background:#27bb6e;
    text-align: center;
    font-size:12px;
    color:#fff;
}
.inputParent i{
    font-style: normal;
    color:#fff;
}
.inputParent #filePath{
    position:absolute;
    width:100%;
    height:100%;
    top:0;
    left:0;
    filter:alpha(opacity=0); 
    opacity: 0;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.centerView</span>{
    <span class="hljs-attribute">width</span>:<span class="hljs-number">150px</span>;
}
<span class="hljs-selector-class">.localPreview</span>{
    <span class="hljs-attribute">position</span>:relative;
    <span class="hljs-attribute">width</span>:<span class="hljs-number">150px</span>;
    <span class="hljs-attribute">height</span>:<span class="hljs-number">150px</span>;
    <span class="hljs-attribute">line-height</span>:<span class="hljs-number">150px</span>;
    <span class="hljs-attribute">text-align</span>:center;
    <span class="hljs-attribute">background</span>:<span class="hljs-number">#ccc</span>;
}
<span class="hljs-selector-class">.localPreview</span> <span class="hljs-selector-tag">img</span>{
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">vertical-align</span>: middle;
}
<span class="hljs-selector-class">.inputParent</span>{
    <span class="hljs-attribute">position</span>:relative;
    <span class="hljs-attribute">display</span>:block;
    <span class="hljs-attribute">margin</span>:<span class="hljs-number">10px</span> auto;
    <span class="hljs-attribute">cursor</span>:pointer;
    <span class="hljs-attribute">width</span>:<span class="hljs-number">80px</span>;
    <span class="hljs-attribute">height</span>:<span class="hljs-number">30px</span>;
    <span class="hljs-attribute">line-height</span>:<span class="hljs-number">30px</span>;
    <span class="hljs-attribute">background</span>:<span class="hljs-number">#27bb6e</span>;
    <span class="hljs-attribute">text-align</span>: center;
    <span class="hljs-attribute">font-size</span>:<span class="hljs-number">12px</span>;
    <span class="hljs-attribute">color</span>:<span class="hljs-number">#fff</span>;
}
<span class="hljs-selector-class">.inputParent</span> <span class="hljs-selector-tag">i</span>{
    <span class="hljs-attribute">font-style</span>: normal;
    <span class="hljs-attribute">color</span>:<span class="hljs-number">#fff</span>;
}
<span class="hljs-selector-class">.inputParent</span> <span class="hljs-selector-id">#filePath</span>{
    <span class="hljs-attribute">position</span>:absolute;
    <span class="hljs-attribute">width</span>:<span class="hljs-number">100%</span>;
    <span class="hljs-attribute">height</span>:<span class="hljs-number">100%</span>;
    <span class="hljs-attribute">top</span>:<span class="hljs-number">0</span>;
    <span class="hljs-attribute">left</span>:<span class="hljs-number">0</span>;
    <span class="hljs-attribute">filter</span>:<span class="hljs-built_in">alpha</span>(opacity=0); 
    <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
}</code></pre>
<p>静态页面的效果如图所示：<br><span class="img-wrap"><img data-src="/img/bVR15E?w=327&amp;h=259" src="https://static.alili.tech/img/bVR15E?w=327&amp;h=259" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>梳理一下思路，我们要实现图片的本地预览，需要如下几点：<br>1.点击file上传文件按钮后，选中图片后，获得图片的路径。<br>2.根据图片实例一个new Image()得到图片的实际的大小。<br>3.得到图片的实际大小，再根据显示区域的宽高来处理图片的宽高，让其自适应于父元素区域中。<br>4.在IE9以及低版本浏览器中需要使用滤镜来实现图片的预览。</p>
<p>根据以上几点我们就写如下代码，首先我们先创建一个构造函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function DealPic(width,height){
    this.oriWidth = width;
    this.oriHeight = height;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>function DealPic(<span class="hljs-attribute">width</span>,height){
    this<span class="hljs-selector-class">.oriWidth</span> = <span class="hljs-attribute">width</span>;
    this<span class="hljs-selector-class">.oriHeight</span> = <span class="hljs-attribute">height</span>;
}</code></pre>
<p>这个oriWidth与oriHeight指的是父区域的宽高，也就是图片要跟该宽高进行比较的值。</p>
<p>接下来实现一个getObjectURL，干嘛的呢，如果支持file对象支持files，就返回只包含url的一个对象，如果是IE9以及低版本浏览器返回的对象中还包括滤镜图片的原始大小。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="DealPic.prototype.getObjectURL = function(fileObj){
    var result = {} ;
    var file;
    if(fileObj.files){
        file = fileObj.files[0];
        if (window.createObjectURL!=undefined) { // basic
            result.url = window.createObjectURL(file) ;
        }else if (window.URL!=undefined) { // mozilla(firefox)
            result.url = window.URL.createObjectURL(file) ;
        }else if (window.webkitURL!=undefined) { // webkit or chrome
            result.url = window.webkitURL.createObjectURL(file) ;
        }
    }else{
       var hiddenAlphaImageWidth,hiddenAlphaImageHeight;
        var hiddenAlphaImage = document.createElement('img');
        document.body.appendChild(hiddenAlphaImage);
        fileObj.select();
        fileObj.blur();
        result.url = document.selection.createRange().text;
        hiddenAlphaImage.style.filter = &quot;progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=image)&quot;;
        hiddenAlphaImage.filters.item(&quot;DXImageTransform.Microsoft.AlphaImageLoader&quot;).src = result.url;
        //但是当滤镜使用的图片超过10M大小，使用上面的代码页面会报错，说hiddenAlphaImage出现未指明的错误；
        //解决办法就是使用下面的注释的方式，注释上面的两行代码
        //使用下面代码滤镜图片超过10M后本地预览不了，通过这个滤镜得到的图片的宽高始终是28*30
        //hiddenAlphaImage.style.filter = &quot;progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='image',src=\&quot;&quot; + result.url + &quot;\&quot;)&quot;; 
        
        result.width = hiddenAlphaImage.offsetWidth;
        result.height = hiddenAlphaImage.offsetHeight;
        if(hiddenAlphaImage.parentNode){
            hiddenAlphaImage.parentNode.removeChild(hiddenAlphaImage);
        }
    }
    return result;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>DealPic.prototype.getObjectURL = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">fileObj</span>)</span>{
    <span class="hljs-keyword">var</span> result = {} ;
    <span class="hljs-keyword">var</span> file;
    <span class="hljs-keyword">if</span>(fileObj.files){
        file = fileObj.files[<span class="hljs-number">0</span>];
        <span class="hljs-keyword">if</span> (<span class="hljs-built_in">window</span>.createObjectURL!=<span class="hljs-literal">undefined</span>) { <span class="hljs-comment">// basic</span>
            result.url = <span class="hljs-built_in">window</span>.createObjectURL(file) ;
        }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-built_in">window</span>.URL!=<span class="hljs-literal">undefined</span>) { <span class="hljs-comment">// mozilla(firefox)</span>
            result.url = <span class="hljs-built_in">window</span>.URL.createObjectURL(file) ;
        }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-built_in">window</span>.webkitURL!=<span class="hljs-literal">undefined</span>) { <span class="hljs-comment">// webkit or chrome</span>
            result.url = <span class="hljs-built_in">window</span>.webkitURL.createObjectURL(file) ;
        }
    }<span class="hljs-keyword">else</span>{
       <span class="hljs-keyword">var</span> hiddenAlphaImageWidth,hiddenAlphaImageHeight;
        <span class="hljs-keyword">var</span> hiddenAlphaImage = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'img'</span>);
        <span class="hljs-built_in">document</span>.body.appendChild(hiddenAlphaImage);
        fileObj.select();
        fileObj.blur();
        result.url = <span class="hljs-built_in">document</span>.selection.createRange().text;
        hiddenAlphaImage.style.filter = <span class="hljs-string">"progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=image)"</span>;
        hiddenAlphaImage.filters.item(<span class="hljs-string">"DXImageTransform.Microsoft.AlphaImageLoader"</span>).src = result.url;
        <span class="hljs-comment">//但是当滤镜使用的图片超过10M大小，使用上面的代码页面会报错，说hiddenAlphaImage出现未指明的错误；</span>
        <span class="hljs-comment">//解决办法就是使用下面的注释的方式，注释上面的两行代码</span>
        <span class="hljs-comment">//使用下面代码滤镜图片超过10M后本地预览不了，通过这个滤镜得到的图片的宽高始终是28*30</span>
        <span class="hljs-comment">//hiddenAlphaImage.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='image',src=\"" + result.url + "\")"; </span>
        
        result.width = hiddenAlphaImage.offsetWidth;
        result.height = hiddenAlphaImage.offsetHeight;
        <span class="hljs-keyword">if</span>(hiddenAlphaImage.parentNode){
            hiddenAlphaImage.parentNode.removeChild(hiddenAlphaImage);
        }
    }
    <span class="hljs-keyword">return</span> result;
}</code></pre>
<p>在IE低版本浏览器为什么要这样处理呢，如果我们要得到滤镜图片的元素大小，首先得创建一个img元素，然后通过IE浏览器的document.selection.createRange().text得到图片路径，然后给这个img元素进行设置，这儿关键得用到filter的sizingMethod属性。</p>
<p>sizingMethod属性：可选值，设置或检索的方式来显示一个图像在对象边界显示方式。有三个值：crop裁剪图像以适应对象的尺寸；image，默认值，扩大或减少对象的边界,以适应图像的尺寸；scale，伸展或收缩图像填充对象的边界；</p>
<p>这儿使用image才能得到滤镜图片的原始大小。然后返回。<br>如果一开始只是把这个url返回回去，没有返回滤镜图片的实际大小，就不能达到自适应的效果。</p>
<p>当然上面获取图片的url用到的是<code>window.createObjectURL</code>，也可以用<code>FileReader.readAsDataURL</code>读取指定Blob或File的内容。<br>简单实现一下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (input.files &amp;&amp; input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) { 
        var showImg = document.getElementById('showViewImg');
        showImg.src = e.target.result;
        showImg.style.width = '150px';
        showImg.style.height = '80px';        
    };
    reader.readAsDataURL(input.files[0]);
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">if</span> (input.files &amp;&amp; input.files[<span class="hljs-number">0</span>]) {
    <span class="hljs-keyword">var</span> reader = <span class="hljs-keyword">new</span> FileReader();
    reader.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{ 
        <span class="hljs-keyword">var</span> showImg = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'showViewImg'</span>);
        showImg.src = e.target.result;
        showImg.style.width = <span class="hljs-string">'150px'</span>;
        showImg.style.height = <span class="hljs-string">'80px'</span>;        
    };
    reader.readAsDataURL(input.files[<span class="hljs-number">0</span>]);
}
</code></pre>
<p>这儿就不详细介绍了，只是这儿得到的url是base64编码的字符串，所以我一般还是选中上面第一种方式。 </p>
<p>接下来就是图片自适应的比较方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="DealPic.prototype.getPicResult = function(targetWidth,targetHeight,callback){
    if(this.oriWidth / this.oriHeight > targetWidth / targetHeight){
        var th = this.oriHeight;
        var tw = this.oriHeight / targetHeight * targetWidth; 
    }else{
       var tw = this.oriWidth;
       var th = this.oriWidth / targetWidth * targetHeight;
    }
    if(callback){
        callback(tw,th);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>DealPic.prototype.getPicResult = function(targetWidth,targetHeight,callback){
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.oriWidth / <span class="hljs-keyword">this</span>.oriHeight &gt; targetWidth / targetHeight){
        <span class="hljs-keyword">var</span> th = <span class="hljs-keyword">this</span>.oriHeight;
        <span class="hljs-keyword">var</span> tw = <span class="hljs-keyword">this</span>.oriHeight / targetHeight * targetWidth; 
    }<span class="hljs-keyword">else</span>{
       <span class="hljs-keyword">var</span> tw = <span class="hljs-keyword">this</span>.oriWidth;
       <span class="hljs-keyword">var</span> th = <span class="hljs-keyword">this</span>.oriWidth / targetWidth * targetHeight;
    }
    <span class="hljs-keyword">if</span>(callback){
        callback(tw,th);
    }
}</code></pre>
<p>这儿就不细说了。</p>
<p>最后就是绑定到file按钮上的change事件的方法了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getCurrFile(){
    var fileObj = document.getElementById('filePath');
    var showImgObj = document.getElementById('showViewImg');
    var newPicObj = new DealPic(150,150);
    var resultFileObj = newPicObj.getObjectURL(fileObj);
    if(fileObj.files){
        var newImg = new Image();
        newImg.onload = function(){
            newPicObj.getPicResult(newImg.width,newImg.height,function(tw,th){
                showImgObj.style.width = tw + 'px';
                showImgObj.style.height = th + 'px';
            });    
        }
        newImg.src = resultFileObj.url;
        showImgObj.setAttribute('src',resultFileObj.url);
    }else{
        showImgObj.style.filter = &quot;progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)&quot;;
        showImgObj.filters.item(&quot;DXImageTransform.Microsoft.AlphaImageLoader&quot;).src = resultFileObj.url;
        //IE9低版本不设置图片src会显示裂图，所以设置一个透明图片或者base64的透明图片
        showImgObj.setAttribute('src','./images/transparent.png');
        //showImgObj.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
        newPicObj.getPicResult(resultFileObj.width,resultFileObj.height,function(resw,resh){
            showImgObj.style.width = resw + 'px';
            showImgObj.style.height = resh + 'px';
        });    
    }   
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getCurrFile</span></span>(){
    <span class="hljs-keyword">var</span> fileObj = document.getElementById(<span class="hljs-string">'filePath'</span>);
    <span class="hljs-keyword">var</span> showImgObj = document.getElementById(<span class="hljs-string">'showViewImg'</span>);
    <span class="hljs-keyword">var</span> <span class="hljs-keyword">new</span><span class="hljs-type">PicObj</span> = <span class="hljs-keyword">new</span> <span class="hljs-type">DealPic</span>(<span class="hljs-number">150</span>,<span class="hljs-number">150</span>);
    <span class="hljs-keyword">var</span> resultFileObj = <span class="hljs-keyword">new</span><span class="hljs-type">PicObj</span>.getObjectURL(fileObj);
    <span class="hljs-keyword">if</span>(fileObj.files){
        <span class="hljs-keyword">var</span> <span class="hljs-keyword">new</span><span class="hljs-type">Img</span> = <span class="hljs-keyword">new</span> <span class="hljs-type">Image</span>();
        <span class="hljs-keyword">new</span><span class="hljs-type">Img</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span></span>(){
            <span class="hljs-keyword">new</span><span class="hljs-type">PicObj</span>.getPicResult(<span class="hljs-keyword">new</span><span class="hljs-type">Img</span>.width,<span class="hljs-keyword">new</span><span class="hljs-type">Img</span>.height,<span class="hljs-function"><span class="hljs-keyword">function</span></span>(tw,th){
                showImgObj.style.width = tw + <span class="hljs-string">'px'</span>;
                showImgObj.style.height = th + <span class="hljs-string">'px'</span>;
            });    
        }
        <span class="hljs-keyword">new</span><span class="hljs-type">Img</span>.src = resultFileObj.url;
        showImgObj.setAttribute(<span class="hljs-string">'src'</span>,resultFileObj.url);
    }<span class="hljs-keyword">else</span>{
        showImgObj.style.filter = <span class="hljs-string">"progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)"</span>;
        showImgObj.filters.item(<span class="hljs-string">"DXImageTransform.Microsoft.AlphaImageLoader"</span>).src = resultFileObj.url;
        <span class="hljs-comment">//IE9低版本不设置图片src会显示裂图，所以设置一个透明图片或者base64的透明图片</span>
        showImgObj.setAttribute(<span class="hljs-string">'src'</span>,<span class="hljs-string">'./images/transparent.png'</span>);
        <span class="hljs-comment">//showImgObj.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';</span>
        <span class="hljs-keyword">new</span><span class="hljs-type">PicObj</span>.getPicResult(resultFileObj.width,resultFileObj.height,<span class="hljs-function"><span class="hljs-keyword">function</span></span>(resw,resh){
            showImgObj.style.width = resw + <span class="hljs-string">'px'</span>;
            showImgObj.style.height = resh + <span class="hljs-string">'px'</span>;
        });    
    }   
}</code></pre>
<p>最后的js代码总结：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function DealPic(width,height){
    this.oriWidth = width;
    this.oriHeight = height;
}

DealPic.prototype.getObjectURL = function(fileObj){
    var result = {} ;
    var file;
    if(fileObj.files){
        file = fileObj.files[0];
        if (window.createObjectURL!=undefined) { // basic
            result.url = window.createObjectURL(file) ;
        }else if (window.URL!=undefined) { // mozilla(firefox)
            result.url = window.URL.createObjectURL(file) ;
        }else if (window.webkitURL!=undefined) { // webkit or chrome
            result.url = window.webkitURL.createObjectURL(file) ;
        }
    }else{
       var hiddenAlphaImageWidth,hiddenAlphaImageHeight;
        var hiddenAlphaImage = document.createElement('img');
        document.body.appendChild(hiddenAlphaImage);
        fileObj.select();
        fileObj.blur();
        result.url = document.selection.createRange().text;
        hiddenAlphaImage.style.filter = &quot;progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=image)&quot;;
        hiddenAlphaImage.filters.item(&quot;DXImageTransform.Microsoft.AlphaImageLoader&quot;).src = result.url;
        //但是当滤镜使用的图片超过10M大小，使用上面的代码页面会报错，说hiddenAlphaImage出现未指明的错误；
        //解决办法就是使用下面的注释的方式，注释上面的两行代码
        //使用下面代码滤镜图片超过10M后本地预览不了，通过这个滤镜得到的图片的宽高始终是28*30
        //hiddenAlphaImage.style.filter = &quot;progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='image',src=\&quot;&quot; + result.url + &quot;\&quot;)&quot;; 
        
        result.width = hiddenAlphaImage.offsetWidth;
        result.height = hiddenAlphaImage.offsetHeight;
        if(hiddenAlphaImage.parentNode){
            hiddenAlphaImage.parentNode.removeChild(hiddenAlphaImage);
        }
    }
    return result;
}

DealPic.prototype.getPicResult = function(targetWidth,targetHeight,callback){
    if(this.oriWidth / this.oriHeight > targetWidth / targetHeight){
        var th = this.oriHeight;
        var tw = this.oriHeight / targetHeight * targetWidth; 
    }else{
       var tw = this.oriWidth;
       var th = this.oriWidth / targetWidth * targetHeight;
    }
    if(callback){
        callback(tw,th);
    }
}

function getCurrFile(){
    var fileObj = document.getElementById('filePath');
    var showImgObj = document.getElementById('showViewImg');
    var newPicObj = new DealPic(150,150);
    var resultFileObj = newPicObj.getObjectURL(fileObj);
    if(fileObj.files){
        var newImg = new Image();
        newImg.onload = function(){
            newPicObj.getPicResult(newImg.width,newImg.height,function(tw,th){
                showImgObj.style.width = tw + 'px';
                showImgObj.style.height = th + 'px';
            });    
        }
        newImg.src = resultFileObj.url;
        showImgObj.setAttribute('src',resultFileObj.url);
    }else{
        showImgObj.style.filter = &quot;progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)&quot;;
        showImgObj.filters.item(&quot;DXImageTransform.Microsoft.AlphaImageLoader&quot;).src = resultFileObj.url;
        //IE9低版本不设置图片src会显示裂图，所以设置一个透明图片或者base64的透明图片
        showImgObj.setAttribute('src','./images/transparent.png');
        //showImgObj.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
        newPicObj.getPicResult(resultFileObj.width,resultFileObj.height,function(resw,resh){
            showImgObj.style.width = resw + 'px';
            showImgObj.style.height = resh + 'px';
        });    
    }   
}  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">DealPic</span></span>(width,height){
    <span class="hljs-built_in">this</span>.oriWidth = width;
    <span class="hljs-built_in">this</span>.oriHeight = height;
}

DealPic.prototype.getObjectURL = <span class="hljs-function"><span class="hljs-keyword">function</span></span>(fileObj){
    <span class="hljs-keyword">var</span> result = {} ;
    <span class="hljs-keyword">var</span> file;
    <span class="hljs-keyword">if</span>(fileObj.files){
        file = fileObj.files[<span class="hljs-number">0</span>];
        <span class="hljs-keyword">if</span> (window.createObjectURL!=undefined) { <span class="hljs-comment">// basic</span>
            result.url = window.createObjectURL(file) ;
        }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (window.URL!=undefined) { <span class="hljs-comment">// mozilla(firefox)</span>
            result.url = window.URL.createObjectURL(file) ;
        }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (window.webkitURL!=undefined) { <span class="hljs-comment">// webkit or chrome</span>
            result.url = window.webkitURL.createObjectURL(file) ;
        }
    }<span class="hljs-keyword">else</span>{
       <span class="hljs-keyword">var</span> hiddenAlphaImageWidth,hiddenAlphaImageHeight;
        <span class="hljs-keyword">var</span> hiddenAlphaImage = document.createElement(<span class="hljs-string">'img'</span>);
        document.body.appendChild(hiddenAlphaImage);
        fileObj.select();
        fileObj.blur();
        result.url = document.selection.createRange().text;
        hiddenAlphaImage.style.filter = <span class="hljs-string">"progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=image)"</span>;
        hiddenAlphaImage.filters.item(<span class="hljs-string">"DXImageTransform.Microsoft.AlphaImageLoader"</span>).src = result.url;
        <span class="hljs-comment">//但是当滤镜使用的图片超过10M大小，使用上面的代码页面会报错，说hiddenAlphaImage出现未指明的错误；</span>
        <span class="hljs-comment">//解决办法就是使用下面的注释的方式，注释上面的两行代码</span>
        <span class="hljs-comment">//使用下面代码滤镜图片超过10M后本地预览不了，通过这个滤镜得到的图片的宽高始终是28*30</span>
        <span class="hljs-comment">//hiddenAlphaImage.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='image',src=\"" + result.url + "\")"; </span>
        
        result.width = hiddenAlphaImage.offsetWidth;
        result.height = hiddenAlphaImage.offsetHeight;
        <span class="hljs-keyword">if</span>(hiddenAlphaImage.parentNode){
            hiddenAlphaImage.parentNode.removeChild(hiddenAlphaImage);
        }
    }
    <span class="hljs-keyword">return</span> result;
}

DealPic.prototype.getPicResult = <span class="hljs-function"><span class="hljs-keyword">function</span></span>(targetWidth,targetHeight,<span class="hljs-keyword">callback</span>){
    <span class="hljs-keyword">if</span>(<span class="hljs-built_in">this</span>.oriWidth / <span class="hljs-built_in">this</span>.oriHeight &gt; targetWidth / targetHeight){
        <span class="hljs-keyword">var</span> th = <span class="hljs-built_in">this</span>.oriHeight;
        <span class="hljs-keyword">var</span> tw = <span class="hljs-built_in">this</span>.oriHeight / targetHeight * targetWidth; 
    }<span class="hljs-keyword">else</span>{
       <span class="hljs-keyword">var</span> tw = <span class="hljs-built_in">this</span>.oriWidth;
       <span class="hljs-keyword">var</span> th = <span class="hljs-built_in">this</span>.oriWidth / targetWidth * targetHeight;
    }
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">callback</span>){
        <span class="hljs-keyword">callback</span>(tw,th);
    }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getCurrFile</span></span>(){
    <span class="hljs-keyword">var</span> fileObj = document.getElementById(<span class="hljs-string">'filePath'</span>);
    <span class="hljs-keyword">var</span> showImgObj = document.getElementById(<span class="hljs-string">'showViewImg'</span>);
    <span class="hljs-keyword">var</span> <span class="hljs-keyword">new</span><span class="hljs-type">PicObj</span> = <span class="hljs-keyword">new</span> <span class="hljs-type">DealPic</span>(<span class="hljs-number">150</span>,<span class="hljs-number">150</span>);
    <span class="hljs-keyword">var</span> resultFileObj = <span class="hljs-keyword">new</span><span class="hljs-type">PicObj</span>.getObjectURL(fileObj);
    <span class="hljs-keyword">if</span>(fileObj.files){
        <span class="hljs-keyword">var</span> <span class="hljs-keyword">new</span><span class="hljs-type">Img</span> = <span class="hljs-keyword">new</span> <span class="hljs-type">Image</span>();
        <span class="hljs-keyword">new</span><span class="hljs-type">Img</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span></span>(){
            <span class="hljs-keyword">new</span><span class="hljs-type">PicObj</span>.getPicResult(<span class="hljs-keyword">new</span><span class="hljs-type">Img</span>.width,<span class="hljs-keyword">new</span><span class="hljs-type">Img</span>.height,<span class="hljs-function"><span class="hljs-keyword">function</span></span>(tw,th){
                showImgObj.style.width = tw + <span class="hljs-string">'px'</span>;
                showImgObj.style.height = th + <span class="hljs-string">'px'</span>;
            });    
        }
        <span class="hljs-keyword">new</span><span class="hljs-type">Img</span>.src = resultFileObj.url;
        showImgObj.setAttribute(<span class="hljs-string">'src'</span>,resultFileObj.url);
    }<span class="hljs-keyword">else</span>{
        showImgObj.style.filter = <span class="hljs-string">"progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)"</span>;
        showImgObj.filters.item(<span class="hljs-string">"DXImageTransform.Microsoft.AlphaImageLoader"</span>).src = resultFileObj.url;
        <span class="hljs-comment">//IE9低版本不设置图片src会显示裂图，所以设置一个透明图片或者base64的透明图片</span>
        showImgObj.setAttribute(<span class="hljs-string">'src'</span>,<span class="hljs-string">'./images/transparent.png'</span>);
        <span class="hljs-comment">//showImgObj.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';</span>
        <span class="hljs-keyword">new</span><span class="hljs-type">PicObj</span>.getPicResult(resultFileObj.width,resultFileObj.height,<span class="hljs-function"><span class="hljs-keyword">function</span></span>(resw,resh){
            showImgObj.style.width = resw + <span class="hljs-string">'px'</span>;
            showImgObj.style.height = resh + <span class="hljs-string">'px'</span>;
        });    
    }   
}  </code></pre>
<p>最后本地预览的效果如图所示：<br><span class="img-wrap"><img data-src="/img/bVR4Kb?w=284&amp;h=233" src="https://static.alili.tech/img/bVR4Kb?w=284&amp;h=233" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JS基础篇--搞清Image加载事件(onload)、加载状态(complete)后，实现图片的本地预览，并自适应于父元素内

## 原文链接
[https://segmentfault.com/a/1190000010465626](https://segmentfault.com/a/1190000010465626)

