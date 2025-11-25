---
title: '原生JS写一个功能强大的编辑器' 
date: 2018-12-28 2:30:11
hidden: true
slug: qkwk8zpexyr
categories: [reprint]
---

{{< raw >}}

                    
<p>因为一个同学，要做一个能加入图片的留言板功能，类型与QQ空间留言板和百度贴吧发帖的那种形式，同时在网上找了找发生网上对这方面的交流很少，所以发表这篇文章抛砖引玉，希望能帮助广大的学习者，也同时希望大佬能对此文章及本人写的代码，不吝赐教。<br>主要采用了原生JS与调用Selection API结合html的contentible功能实现功能。</p>
<p>1.先来看看效果<br><span class="img-wrap"><img data-src="/img/bVWYIo?w=837&amp;h=499" src="https://static.alili.tech/img/bVWYIo?w=837&amp;h=499" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>2.主要功能</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.在当前光标位置添加指定图片，并=点击以后修改图片大小
2.修改选中文字的大小，字体颜色及添加斜体、粗体、下划线" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">1.</span>在当前光标位置添加指定图片，并=点击以后修改图片大小
<span class="hljs-number">2.</span>修改选中文字的大小，字体颜色及添加斜体、粗体、下划线</code></pre>
<p>3.代码及一些难点部分<br>首先看一个很很很关键和重要的函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getSelectionRange() { 
    var select;
    //兼容处理
    if (window.getSelection) { 
        select = window.getSelection();
           range = select.getRangeAt(0);//获取selection对象,并获取range对象
    } else if (document.selection) { 
        //IE浏览器
        range = document.selection.createRange();//IE可以直接获取
    };
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getSelectionRange</span>(<span class="hljs-params"></span>) </span>{ 
    <span class="hljs-keyword">var</span> select;
    <span class="hljs-comment">//兼容处理</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">window</span>.getSelection) { 
        select = <span class="hljs-built_in">window</span>.getSelection();
           range = select.getRangeAt(<span class="hljs-number">0</span>);<span class="hljs-comment">//获取selection对象,并获取range对象</span>
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-built_in">document</span>.selection) { 
        <span class="hljs-comment">//IE浏览器</span>
        range = <span class="hljs-built_in">document</span>.selection.createRange();<span class="hljs-comment">//IE可以直接获取</span>
    };
};</code></pre>
<p>这个函数是调用seleciton API并用range保存当前光标位置，方便后面插入图片和给代码修改文字样式</p>
<p>其次另外一个也很关键的函数是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//插入节点
function insert(newNode){
    var fragNode = document.createDocumentFragment().appendChild(newNode);//创建文档碎片并放入新节点
    range.deleteContents();//删除Rnge中的内容
    range.insertNode(fragNode);//再插入新碎片
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-comment">//插入节点</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">insert</span></span>(<span class="hljs-keyword">new</span><span class="hljs-type">Node</span>){
    <span class="hljs-keyword">var</span> fragNode = document.createDocumentFragment().appendChild(<span class="hljs-keyword">new</span><span class="hljs-type">Node</span>);<span class="hljs-comment">//创建文档碎片并放入新节点</span>
    range.deleteContents();<span class="hljs-comment">//删除Rnge中的内容</span>
    range.insertNode(fragNode);<span class="hljs-comment">//再插入新碎片</span>
}</code></pre>
<p>这个函数接收一个新的也就是要插入节点的形参，然后删除当前位置的内容（如果选中的是文字这把当前这选中的文字删除掉）最后把新创建的节点插入到光标的位置。</p>
<p>我们在来看看另外一个难点部分，就是获取选中的文字，，这里我采用的是鼠标的监听事件，mousedown-&gt;mousemove-&gt;mouseup，分别的监听，来判断是否鼠标发生移动，及得到鼠标选中的文本</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//获取选中的字符
edit.addEventListener(&quot;click&quot;,function(){
    getSelectionRange();//获取Range
});
edit.addEventListener(&quot;mousedown&quot;,function(){
    edit.addEventListener(&quot;mousemove&quot;,listenMove);
});
function listenMove(){
    moved=true;
};
edit.addEventListener(&quot;mouseup&quot;,function(){
    if(!moved){
        return;
    }
    //当有选中内容才进行操作
    edit.removeEventListener(&quot;mousemove&quot;,listenMove);
    getSelectionRange();
    selectTxt= range.toString();//将选择的内容从对象中提取出来,直接转字符串就行了。
    moved = false;
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">//获取选中的字符</span>
edit.addEventListener(<span class="hljs-string">"click"</span>,<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    getSelectionRange();<span class="hljs-comment">//获取Range</span>
});
edit.addEventListener(<span class="hljs-string">"mousedown"</span>,<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    edit.addEventListener(<span class="hljs-string">"mousemove"</span>,listenMove);
});
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">listenMove</span><span class="hljs-params">()</span></span>{
    moved=<span class="hljs-literal">true</span>;
};
edit.addEventListener(<span class="hljs-string">"mouseup"</span>,<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    <span class="hljs-keyword">if</span>(!moved){
        <span class="hljs-keyword">return</span>;
    }
    <span class="hljs-comment">//当有选中内容才进行操作</span>
    edit.removeEventListener(<span class="hljs-string">"mousemove"</span>,listenMove);
    getSelectionRange();
    selectTxt= range.toString();<span class="hljs-comment">//将选择的内容从对象中提取出来,直接转字符串就行了。</span>
    moved = <span class="hljs-literal">false</span>;
});</code></pre>
<p>先在mousedown函数里面获取一次range,然后在mouseup的函数里面再次获取range得到选中的文字用selectTxt保存，这里在我看来只要是理清楚思路这里很好理解。<br>到了这里我们就已经把几个比较困难的问题解决了，剩下的插入文字和图片及改变图片的大小，都是很简单的基本操作。<br>我以插入图片为例，大家可以拿到代码以后自己理一理插入文字的思路：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//插入图片
var imgSrc='';
aInsertBtn[0].onclick=function(){
    var txt=document.getElementById('txtImg');
    //如果同时存在本地上传图片和网络图片的地址，只插入网络图片
    console.log(txt.value)
    if(txt.value){
        imgSrc=txt.value;
        txt.value=&quot; &quot;;
    }
    addImg(imgSrc);
    insertImg.style.display=&quot;none&quot;;
}
function fileChange(){
    var val=this.value.toLowerCase().split('.');
    if(val){
        if(val[1]=='gif'||val[1]=='png'||val[1]=='jpg'||val[1]=='jpeg'){
            var reader = new FileReader();
                reader.onload = function (e) {
                imgSrc = e.target.result;                
            }
            reader.readAsDataURL(this.files[0]);
        }else{
            alert(&quot;目前支持gif,png,jpg,jpeg格式的图片!&quot;)
        }
    }
}
function addImg(src){
    var newImg=new Image();
    newImg.className=&quot;insertNewImg&quot;;
    newImg.src=src;
    insert(newImg);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-comment">//插入图片</span>
<span class="hljs-keyword">var</span> imgSrc=<span class="hljs-string">''</span>;
aInsertBtn[<span class="hljs-number">0</span>].onclick=<span class="hljs-function"><span class="hljs-keyword">function</span></span>(){
    <span class="hljs-keyword">var</span> txt=document.getElementById(<span class="hljs-string">'txtImg'</span>);
    <span class="hljs-comment">//如果同时存在本地上传图片和网络图片的地址，只插入网络图片</span>
    console.log(txt.value)
    <span class="hljs-keyword">if</span>(txt.value){
        imgSrc=txt.value;
        txt.value=<span class="hljs-string">" "</span>;
    }
    addImg(imgSrc);
    insertImg.style.display=<span class="hljs-string">"none"</span>;
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fileChange</span></span>(){
    <span class="hljs-keyword">var</span> val=<span class="hljs-built_in">this</span>.value.toLowerCase().split(<span class="hljs-string">'.'</span>);
    <span class="hljs-keyword">if</span>(val){
        <span class="hljs-keyword">if</span>(val[<span class="hljs-number">1</span>]==<span class="hljs-string">'gif'</span>||val[<span class="hljs-number">1</span>]==<span class="hljs-string">'png'</span>||val[<span class="hljs-number">1</span>]==<span class="hljs-string">'jpg'</span>||val[<span class="hljs-number">1</span>]==<span class="hljs-string">'jpeg'</span>){
            <span class="hljs-keyword">var</span> reader = <span class="hljs-keyword">new</span> <span class="hljs-type">FileReader</span>();
                reader.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> </span>(e) {
                imgSrc = e.target.result;                
            }
            reader.readAsDataURL(<span class="hljs-built_in">this</span>.files[<span class="hljs-number">0</span>]);
        }<span class="hljs-keyword">else</span>{
            alert(<span class="hljs-string">"目前支持gif,png,jpg,jpeg格式的图片!"</span>)
        }
    }
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">addImg</span></span>(src){
    <span class="hljs-keyword">var</span> <span class="hljs-keyword">new</span><span class="hljs-type">Img</span>=<span class="hljs-keyword">new</span> <span class="hljs-type">Image</span>();
    <span class="hljs-keyword">new</span><span class="hljs-type">Img</span>.className=<span class="hljs-string">"insertNewImg"</span>;
    <span class="hljs-keyword">new</span><span class="hljs-type">Img</span>.src=src;
    insert(<span class="hljs-keyword">new</span><span class="hljs-type">Img</span>);
}</code></pre>
<p>这里需特别的说明一下，如果是插入的是本地图片，由于浏览器为了安全限制file.value并不是图片的真实地址，换句话说img.src=file.value是得不到图片的，所以这里我们需要借用FileReader对象来得到真实的图片地址，当然这里网络的图片地址肯定是可以直接用的，然后将的到的src地址传入addImg函数生成img节点以后插入当前光标指向的文本位置。<br>所以添加文本样式也是一样的方法，无非就是在创建完文本节点以后给他添加style样式。</p>
<p>所以根据这种方法，读者可以根据自己的需求添加更多的功能，比如：在编辑框里面插入一个可以点击的a标签或者添加一个代码块.....</p>
<p>希望能读到此文章的读者，能在下方一起交流，更希望大佬提出错误，谢谢！！！<br>GitHub地址：<a href="https://github.com/LiChangyi/edit" rel="nofollow noreferrer" target="_blank"></a><a href="https://github.com/LiChangyi/edit" rel="nofollow noreferrer" target="_blank">https://github.com/LiChangyi/...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
原生JS写一个功能强大的编辑器

## 原文链接
[https://segmentfault.com/a/1190000011634322](https://segmentfault.com/a/1190000011634322)

