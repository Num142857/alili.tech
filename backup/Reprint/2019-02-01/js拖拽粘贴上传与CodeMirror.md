---
title: 'js拖拽粘贴上传与CodeMirror' 
date: 2019-02-01 2:30:10
hidden: true
slug: xupzg5qj5e
categories: [reprint]
---

{{< raw >}}

                    
<p>Markdown编辑器选用<a href="https://simplemde.com" rel="nofollow noreferrer" target="_blank">https://simplemde.com</a><br>它是一款纯js实现的markdown编辑器。缺点不支持图片上传。那我们就得改造它。<br>simplemde是基于codemirror编辑器的.<br>先介绍基本：<br>codemirror文档：<a href="http://codemirror.net/doc/manual.html" rel="nofollow noreferrer" target="_blank">http://codemirror.net/doc/man...</a><br>simplemde文档:<a href="https://github.com/NextStepWebs/simplemde-markdown-editor" rel="nofollow noreferrer" target="_blank">https://github.com/NextStepWe...</a><br>API文档:<br>拖拽：<br><a href="https://developer.mozilla.org/en-US/docs/Web/API/DragEvent" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org...</a><br><a href="https://developer.mozilla.org/en-US/docs/Web/API/DragEvent/dataTransfer" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org...</a></p>
<p>粘贴：<br><a href="https://developer.mozilla.org/en-US/docs/Web/API/ClipboardEvent" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org...</a><br><a href="https://developer.mozilla.org/en-US/docs/Web/Events/paste" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org...</a></p>
<p>注意一点：目前firefox与chrome比较新的版本都实现了这些API。</p>
<h1 id="articleHeader0">paste事件</h1>
<p>绑定的元素不一定是input，普通的div也是可以绑定的，如果是给document绑定了，就相当于全局了，任何时候的粘贴操作都会触发。<br>获取事件对象ClipboardEvent<br>先写一下事件绑定的代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pasteEle.addEventListener(&quot;paste&quot;, function (e){
    if ( !(e.clipboardData &amp;&amp; e.clipboardData.items) ) {
        return ;
    }
 
    for (var i = 0, len = e.clipboardData.items.length; i < len; i++) {
        var item = e.clipboardData.items[i];
 
        if (item.kind === &quot;string&quot;) {
            item.getAsString(function (str) {
                // str 是获取到的字符串
            })
        } else if (item.kind === &quot;file&quot;) {
            var pasteFile = item.getAsFile();
            // pasteFile就是获取到的文件
        }
    }
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>pasteEle.addEventListener(<span class="hljs-string">"paste"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(e)</span></span>{
    <span class="hljs-keyword">if</span> ( !(e.clipboardData &amp;&amp; e.clipboardData.items) ) {
        <span class="hljs-keyword">return</span> ;
    }
 
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, len = e.clipboardData.items.length; i &lt; len; i++) {
        <span class="hljs-keyword">var</span> item = e.clipboardData.items[i];
 
        <span class="hljs-keyword">if</span> (item.kind === <span class="hljs-string">"string"</span>) {
            item.getAsString(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(str)</span> </span>{
                <span class="hljs-comment">// str 是获取到的字符串</span>
            })
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (item.kind === <span class="hljs-string">"file"</span>) {
            <span class="hljs-keyword">var</span> pasteFile = item.getAsFile();
            <span class="hljs-comment">// pasteFile就是获取到的文件</span>
        }
    }
});
</code></pre>
<p>粘贴事件提供了一个clipboardData的属性，如果该属性有items属性，那么就可以查看items中是否有图片类型的数据了。<br><strong>clipboardData介绍</strong><br>介绍一下clipboardData对象，它实际上是一个DataTransfer类型的对象，DataTransfer 是拖动产生的一个对象，但实际上粘贴事件也是它。<br>属性介绍<br>dropEffect    String    默认是 none<br>effectAllowed    String    默认是 uninitialized<br>files    FileList    在粘贴操作时为空List<br>items    DataTransferItemList    剪切板中的各项数据<br>types    Array    剪切板中的数据类型。</p>
<p><strong>DataTransferItem</strong><br>items是一个DataTransferItemList对象，自然里面都是DataTransferItem类型的数据了。<br>DataTransferItem有两个属性kind和type</p>
<p>kind    一般为string或者file<br>type    具体的数据类型，例如具体是哪种类型字符串或者哪种类型的文件，即MIME-Type，常见的值有text/plain、text/html、Files。<br>方法</p>
<p>getAsFile    空    如果kind是file，可以用该方法获取到文件<br>getAsString    回调函数    如果kind是string，可以用该方法获取到字符串，字符串需要用回调函数得到，回调函数的第一个参数就是剪切板中的字符串<br>综合</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// demo 程序将粘贴事件绑定到 document 上
document.addEventListener(&quot;paste&quot;, function (e) {
    var cbd = e.clipboardData;
    //var ua = window.navigator.userAgent;
 
    for(var i = 0; i < cbd.items.length; i++) {
        var item = cbd.items[i];
        if(item.kind == &quot;file&quot;){
            var blob = item.getAsFile();
            if (blob.size === 0) {
                return;
            }
            // blob 就是从剪切板获得的文件 可以进行上传或其他操作
        }
    }
}, false);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// demo 程序将粘贴事件绑定到 document 上</span>
<span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">"paste"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
    <span class="hljs-keyword">var</span> cbd = e.clipboardData;
    <span class="hljs-comment">//var ua = window.navigator.userAgent;</span>
 
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; cbd.items.length; i++) {
        <span class="hljs-keyword">var</span> item = cbd.items[i];
        <span class="hljs-keyword">if</span>(item.kind == <span class="hljs-string">"file"</span>){
            <span class="hljs-keyword">var</span> blob = item.getAsFile();
            <span class="hljs-keyword">if</span> (blob.size === <span class="hljs-number">0</span>) {
                <span class="hljs-keyword">return</span>;
            }
            <span class="hljs-comment">// blob 就是从剪切板获得的文件 可以进行上传或其他操作</span>
        }
    }
}, <span class="hljs-literal">false</span>);
</code></pre>
<h1 id="articleHeader1">drop事件</h1>
<p>DragEvent<br><strong>DragEvent.dataTransfer</strong></p>
<p>dropEffect    String    默认是 none<br>effectAllowed    String    默认是 uninitialized<br>files    FileList<br>items    DataTransferItemList    剪切板中的各项数据<br>types    Array    剪切板中的数据类型。<br>DataTransferItem<br>items是一个DataTransferItemList对象，自然里面都是DataTransferItem类型的数据了。</p>
<p><strong>DataTransferItem</strong>有两个属性kind和type</p>
<p>kind    一般为string或者file<br>type    具体的数据类型，例如具体是哪种类型字符串或者哪种类型的文件，即MIME-Type，常见的值有images/*、text/plain、text/html、Files。<br>方法</p>
<p>getAsFile    空    如果kind是file，可以用该方法获取到文件<br>getAsString    回调函数    如果kind是string，可以用该方法获取到字符串，字符串需要用回调函数得到，回调函数的第一个参数就是剪切板中的字符串</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="dropEle.addEventListener(&quot;drop&quot;, function (e){
    var data = new FormData();
    var files = event.dataTransfer.files;
    var i = 0;
    var len = files.length;
    while (i < len){
        data.append(&quot;file&quot; + i, files[i]);
         i++;
    }
    var xhr = new XMLHttpRequest();
    xhr.open(&quot;post&quot;, &quot;/upload&quot;, true);
    xhr.onreadystatechange = function(){
         if (xhr.readyState == 4){
             alert(xhr.responseText);
         }
     };
     xhr.send(data);
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>dropEle.addEventListener(<span class="hljs-string">"drop"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(e)</span></span>{
    <span class="hljs-keyword">var</span> data = <span class="hljs-keyword">new</span> FormData();
    <span class="hljs-keyword">var</span> files = event.dataTransfer.files;
    <span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">var</span> len = files.length;
    <span class="hljs-keyword">while</span> (i &lt; len){
        data.append(<span class="hljs-string">"file"</span> + i, files[i]);
         i++;
    }
    <span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest();
    xhr.open(<span class="hljs-string">"post"</span>, <span class="hljs-string">"/upload"</span>, <span class="hljs-literal">true</span>);
    xhr.onreadystatechange = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
         <span class="hljs-keyword">if</span> (xhr.readyState == <span class="hljs-number">4</span>){
             alert(xhr.responseText);
         }
     };
     xhr.send(data);
});
</code></pre>
<p>阻止浏览器默认打开拖拽文件的行为：参考这里</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.addEventListener(&quot;drop&quot;,function(e){
  e = e || event;
  console.log(e);
  //e.preventDefault();
  if (e.target.tagName != &quot;textarea&quot;) {  // check wich element is our target
    e.preventDefault();
  }  
},false);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">"drop"</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
  e = e || event;
  <span class="hljs-built_in">console</span>.log(e);
  <span class="hljs-comment">//e.preventDefault();</span>
  <span class="hljs-keyword">if</span> (e.target.tagName != <span class="hljs-string">"textarea"</span>) {  <span class="hljs-comment">// check wich element is our target</span>
    e.preventDefault();
  }  
},<span class="hljs-literal">false</span>);
</code></pre>
<p>理论知识说完了。下面开始实验改造codemirror</p>
<h1 id="articleHeader2">codemirror支持粘贴和拖拽上传</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
<head>
    <meta charset=&quot;utf-8&quot;>
    <meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;IE=edge&quot;>
    <title>codemirror</title>
    <link rel=&quot;stylesheet&quot; href=&quot;codemirror.css&quot;>
    <script src=&quot;codemirror.js&quot;></script>
</head>
<body>
    <textarea name=&quot;aaa&quot; id=&quot;aaa&quot;></textarea>
    <script>
    var textarea=document.getElementById(&quot;aaa&quot;)
      var editor = CodeMirror.fromTextArea(textarea, {
        lineNumbers: true
      });
  editor.on(&quot;paste&quot;,function(editor,e){
      // console.log(e.clipboardData)
      if(!(e.clipboardData&amp;&amp;e.clipboardData.items)){
          alert(&quot;该浏览器不支持操作&quot;);
          return;
      }
      for (var i = 0, len = e.clipboardData.items.length; i < len; i++) {
        var item = e.clipboardData.items[i];
       // console.log(item.kind+&quot;:&quot;+item.type);
        if (item.kind === &quot;string&quot;) {
            item.getAsString(function (str) {
                // str 是获取到的字符串
            })
        } else if (item.kind === &quot;file&quot;) {
            var pasteFile = item.getAsFile();
            // pasteFile就是获取到的文件
            console.log(pasteFile);
            fileUpload(pasteFile);
        }
    }
  });
  editor.on(&quot;drop&quot;,function(editor,e){
      // console.log(e.dataTransfer.files[0]);
      if(!(e.dataTransfer&amp;&amp;e.dataTransfer.files)){
          alert(&quot;该浏览器不支持操作&quot;);
          return;
      }
      for(var i=0;i<e.dataTransfer.files.length;i++){
          console.log(e.dataTransfer.files[i]);
          fileUpload(e.dataTransfer.files[i]);
      }
      e.preventDefault();
  });
  //文件上传
  function fileUpload(fileObj){
      var data = new FormData();
      data.append(&quot;file&quot;,fileObj);
      var xhr = new XMLHttpRequest();
    xhr.open(&quot;post&quot;, &quot;/upload&quot;, true);
    xhr.onreadystatechange = function(){
         if (xhr.readyState == 4){
             alert(xhr.responseText);
         }
     };
     xhr.send(data);
  }
  //阻止浏览器默认打开拖拽文件的行为
  window.addEventListener(&quot;drop&quot;,function(e){
  e = e || event;
  e.preventDefault();
  if (e.target.tagName == &quot;textarea&quot;) {  // check wich element is our target
    e.preventDefault();
  } 
},false);
</script>
</html>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"X-UA-Compatible"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"IE=edge"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>codemirror<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"codemirror.css"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"codemirror.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">textarea</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"aaa"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"aaa"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">textarea</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> textarea=<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"aaa"</span>)
      <span class="hljs-keyword">var</span> editor = CodeMirror.fromTextArea(textarea, {
        <span class="hljs-attr">lineNumbers</span>: <span class="hljs-literal">true</span>
      });
  editor.on(<span class="hljs-string">"paste"</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">editor,e</span>)</span>{
      <span class="hljs-comment">// console.log(e.clipboardData)</span>
      <span class="hljs-keyword">if</span>(!(e.clipboardData&amp;&amp;e.clipboardData.items)){
          alert(<span class="hljs-string">"该浏览器不支持操作"</span>);
          <span class="hljs-keyword">return</span>;
      }
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, len = e.clipboardData.items.length; i &lt; len; i++) {
        <span class="hljs-keyword">var</span> item = e.clipboardData.items[i];
       <span class="hljs-comment">// console.log(item.kind+":"+item.type);</span>
        <span class="hljs-keyword">if</span> (item.kind === <span class="hljs-string">"string"</span>) {
            item.getAsString(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">str</span>) </span>{
                <span class="hljs-comment">// str 是获取到的字符串</span>
            })
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (item.kind === <span class="hljs-string">"file"</span>) {
            <span class="hljs-keyword">var</span> pasteFile = item.getAsFile();
            <span class="hljs-comment">// pasteFile就是获取到的文件</span>
            <span class="hljs-built_in">console</span>.log(pasteFile);
            fileUpload(pasteFile);
        }
    }
  });
  editor.on(<span class="hljs-string">"drop"</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">editor,e</span>)</span>{
      <span class="hljs-comment">// console.log(e.dataTransfer.files[0]);</span>
      <span class="hljs-keyword">if</span>(!(e.dataTransfer&amp;&amp;e.dataTransfer.files)){
          alert(<span class="hljs-string">"该浏览器不支持操作"</span>);
          <span class="hljs-keyword">return</span>;
      }
      <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>;i&lt;e.dataTransfer.files.length;i++){
          <span class="hljs-built_in">console</span>.log(e.dataTransfer.files[i]);
          fileUpload(e.dataTransfer.files[i]);
      }
      e.preventDefault();
  });
  <span class="hljs-comment">//文件上传</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fileUpload</span>(<span class="hljs-params">fileObj</span>)</span>{
      <span class="hljs-keyword">var</span> data = <span class="hljs-keyword">new</span> FormData();
      data.append(<span class="hljs-string">"file"</span>,fileObj);
      <span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest();
    xhr.open(<span class="hljs-string">"post"</span>, <span class="hljs-string">"/upload"</span>, <span class="hljs-literal">true</span>);
    xhr.onreadystatechange = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
         <span class="hljs-keyword">if</span> (xhr.readyState == <span class="hljs-number">4</span>){
             alert(xhr.responseText);
         }
     };
     xhr.send(data);
  }
  <span class="hljs-comment">//阻止浏览器默认打开拖拽文件的行为</span>
  <span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">"drop"</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
  e = e || event;
  e.preventDefault();
  <span class="hljs-keyword">if</span> (e.target.tagName == <span class="hljs-string">"textarea"</span>) {  <span class="hljs-comment">// check wich element is our target</span>
    e.preventDefault();
  } 
},<span class="hljs-literal">false</span>);
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre>
<p><strong>附Codemirror常用事件与方法</strong><br>参考<a href="http://blog.csdn.net/mafan121/article/details/49178945" rel="nofollow noreferrer" target="_blank">这里</a><br>1.onChange(instance,changeObj)：codeMirror文本被修改后触发。<br>instance是一个当前的codemirror对象，changeObj是一个｛from，to，text,removed｝对象。其中from，to分别表示起始行对象和结束行对象，行对象包括ch：改变位置距离行头的间隔字符，line：改变的行数。text是一个字符串数组表示被修改的文本内容，即你输入的内容。</p>
<p>2.onBeforeChange(instance,changObj):内容改变前被调用<br>3.onCursorActivity(instance)：当鼠标点击内容区、选中内容、修改内容时被触发<br>4.onKeyHandled:(instance,name,event):当一个都dom元素的事件触发时调用，name为操作名称。<br>5.onInputRead(insatance,changeObj):当一个新的input从隐藏的textara读取出时调用<br>6.onBeforeSelectionChange(instance,obj):当选中的区域被改变时调用，obj对象是选择的范围和改变的内容（本人未测试成功）<br>7.onUpdate(instance):编辑器内容被改变时触发<br>8.onFocus(instance):编辑器获得焦点式触发<br>9.onBlur(instance):编辑器失去焦点时触发</p>
<p>常用方法：<br>getValue():获取编辑器文本内容<br>setValue(text):设置编辑器文本内容<br>getRange({line,ch},{line,ch}):获取指定范围内的文本内容第一个对象是起始坐标，第二个是结束坐标<br>replaceRange(replaceStr,{line,ch},{line,ch}):替换指定区域的内容<br>getLine(line)：获取指定行的文本内容<br>lineCount():统计编辑器内容行数<br>firstLine():获取第一行行数，默认为0，从开始计数<br>lastLine():获取最后一行行数<br>getLineHandle(line):根据行号获取行句柄<br>getSelection():获取鼠标选中区域的代码<br>replaceSelection(str):替换选中区域的代码<br>setSelection({line:num,ch:num1},{line:num2,ch:num3}):设置一个区域被选中<br>somethingSelected()：判断是否被选择<br>getEditor()：获取CodeMirror对像<br>undo()：撤销<br>redo():回退</p>
<h1 id="articleHeader3">simplemde支持粘贴和拖拽上传</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var simplemde = new SimpleMDE({ element: document.getElementById(&quot;MyID&quot;) });
simplemde.codemirror.on(&quot;drop&quot;, function(editor,e){
    ...
});
simplemde.codemirror.on(&quot;paste&quot;,function(editor,e){
...
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> simplemde = <span class="hljs-keyword">new</span> SimpleMDE({ <span class="hljs-attr">element</span>: <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"MyID"</span>) });
simplemde.codemirror.on(<span class="hljs-string">"drop"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">editor,e</span>)</span>{
    ...
});
simplemde.codemirror.on(<span class="hljs-string">"paste"</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">editor,e</span>)</span>{
...
});
</code></pre>
<h1 id="articleHeader4">Blob对象转File对象</h1>
<p>为了使用WebUploader这个文件上传组件，需要将粘贴得到的Blob对象转为File对象。<br>Blob 对象是包含有只读原始数据的类文件对象.File 接口基于 Blob，继承了 Blob 的功能,并且扩展支持用户计算机上的本地文件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var blob=new Blob();
var file = new File([blob], &quot;image.png&quot;, {type:&quot;image/png&quot;});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">var</span> blob=<span class="hljs-keyword">new</span> <span class="hljs-type">Blob</span>();
<span class="hljs-keyword">var</span> file = <span class="hljs-keyword">new</span> <span class="hljs-type">File</span>([blob], <span class="hljs-string">"image.png"</span>, {<span class="hljs-class"><span class="hljs-keyword">type</span></span>:<span class="hljs-string">"image/png"</span>});
</code></pre>
<p>File构造器的第一个参数必须是数组</p>
<h1 id="articleHeader5">WebUploader文件上传</h1>
<p><a href="http://fex.baidu.com/webuploader/getting-started.html" rel="nofollow noreferrer" target="_blank">http://fex.baidu.com/webuploa...</a><br>创建Uploader对象</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var uploader = WebUploader.Uploader({
    swf: 'path_of_swf/Uploader.swf',
 
    // 开起分片上传。
    chunked: true
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> uploader = WebUploader.Uploader({
    swf: <span class="hljs-string">'path_of_swf/Uploader.swf'</span>,
 
    <span class="hljs-comment">// 开起分片上传。</span>
    chunked: <span class="hljs-literal">true</span>
});
</code></pre>
<p>监听fileQueued事件来实现进度UI构造:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 当有文件被添加进队列的时候
uploader.on( 'fileQueued', function( file ) {
    var $list=$(&quot;#list&quot;);
    $list.append( '<div id=&quot;' + file.id + '&quot; class=&quot;item&quot;>' +
        '<h4 class=&quot;info&quot;>' + file.name + '</h4>' +
        '<p class=&quot;state&quot;>等待上传...</p>' +
    '</div>' );
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scilab"><code><span class="hljs-comment">// 当有文件被添加进队列的时候</span>
uploader.on( <span class="hljs-string">'fileQueued'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">( file )</span> {</span>
    var $<span class="hljs-built_in">list</span>=$(<span class="hljs-string">"#list"</span>);
    $list.append( <span class="hljs-string">'&lt;div id="</span><span class="hljs-string">' + file.id + '</span><span class="hljs-string">" class="</span>item<span class="hljs-string">"&gt;'</span> +
        <span class="hljs-string">'&lt;h4 class="</span>info<span class="hljs-string">"&gt;'</span> + file.name + <span class="hljs-string">'&lt;/h4&gt;'</span> +
        <span class="hljs-string">'&lt;p class="</span>state<span class="hljs-string">"&gt;等待上传...&lt;/p&gt;'</span> +
    <span class="hljs-string">'&lt;/div&gt;'</span> );
});
</code></pre>
<p>文件上传进度:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 文件上传过程中创建进度条实时显示。
uploader.on( 'uploadProgress', function( file, percentage ) {
    var $li = $( '#'+file.id ),
    $percent = $li.find('.progress .progress-bar');
    // 避免重复创建
    if ( !$percent.length ) {
        $percent = $('<div class=&quot;progress progress-striped active&quot;>' +
          '<div class=&quot;progress-bar&quot; role=&quot;progressbar&quot; style=&quot;width: 0%&quot;>' +
          '</div>' +
        '</div>').appendTo( $li ).find('.progress-bar');
    }
 
    $li.find('p.state').text('上传中');
    $percent.css( 'width', percentage * 100 + '%' );
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mel"><code><span class="hljs-comment">// 文件上传过程中创建进度条实时显示。</span>
uploader.on( <span class="hljs-string">'uploadProgress'</span>, function( <span class="hljs-keyword">file</span>, percentage ) {
    var $li = $( <span class="hljs-string">'#'</span>+<span class="hljs-keyword">file</span>.id ),
    $percent = $li.find(<span class="hljs-string">'.progress .progress-bar'</span>);
    <span class="hljs-comment">// 避免重复创建</span>
    <span class="hljs-keyword">if</span> ( !$percent.length ) {
        $percent = $(<span class="hljs-string">'&lt;div class="progress progress-striped active"&gt;'</span> +
          <span class="hljs-string">'&lt;div class="progress-bar" role="progressbar" style="width: 0%"&gt;'</span> +
          <span class="hljs-string">'&lt;/div&gt;'</span> +
        <span class="hljs-string">'&lt;/div&gt;'</span>).appendTo( $li ).find(<span class="hljs-string">'.progress-bar'</span>);
    }
 
    $li.find(<span class="hljs-string">'p.state'</span>).<span class="hljs-keyword">text</span>(<span class="hljs-string">'上传中'</span>);
    $percent.css( <span class="hljs-string">'width'</span>, percentage * <span class="hljs-number">100</span> + <span class="hljs-string">'%'</span> );
});
</code></pre>
<p>文件成功、失败处理:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="uploader.on( 'uploadSuccess', function( file,data ) {
    $( '#'+file.id ).find('p.state').text('已上传');
});
 
uploader.on( 'uploadError', function( file ) {
    $( '#'+file.id ).find('p.state').text('上传出错');
});
 
uploader.on( 'uploadComplete', function( file ) {
    $( '#'+file.id ).find('.progress').fadeOut();
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>uploader.on( <span class="hljs-string">'uploadSuccess'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"> file,data </span>) </span>{
    $( <span class="hljs-string">'#'</span>+file.id ).find(<span class="hljs-string">'p.state'</span>).text(<span class="hljs-string">'已上传'</span>);
});
 
uploader.on( <span class="hljs-string">'uploadError'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"> file </span>) </span>{
    $( <span class="hljs-string">'#'</span>+file.id ).find(<span class="hljs-string">'p.state'</span>).text(<span class="hljs-string">'上传出错'</span>);
});
 
uploader.on( <span class="hljs-string">'uploadComplete'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"> file </span>) </span>{
    $( <span class="hljs-string">'#'</span>+file.id ).find(<span class="hljs-string">'.progress'</span>).fadeOut();
});
</code></pre>
<p>添加文件到队列并上传:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="uploader.addFiles( file ) 
uploader.addFiles( [file1, file2 …] ) 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">uploader</span><span class="hljs-selector-class">.addFiles</span>( <span class="hljs-selector-tag">file</span> ) 
<span class="hljs-selector-tag">uploader</span><span class="hljs-selector-class">.addFiles</span>( <span class="hljs-selector-attr">[file1, file2 …]</span> ) 
</code></pre>
<p>开始上传:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="uploader.upload() 
//uploader.upload( file | fileId)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gcode"><code>uploader.upload<span class="hljs-comment">()</span> 
<span class="hljs-comment">//uploader.upload( file | fileId)</span>
</code></pre>
<p>其他参考：<br><a href="https://segmentfault.com/a/1190000004288686">js获取剪切板内容，js控制图片粘贴</a><br><a href="http://www.hyjiacan.com/codemirror-event/" rel="nofollow noreferrer" target="_blank">在线代码编辑器 CODEMIRROR 事件说明</a><br>javascript.ruanyifeng.com<br><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Blob" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
js拖拽粘贴上传与CodeMirror

## 原文链接
[https://segmentfault.com/a/1190000007434697](https://segmentfault.com/a/1190000007434697)

