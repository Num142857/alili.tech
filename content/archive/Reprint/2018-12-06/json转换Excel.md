---
title: 'json转换Excel' 
date: 2018-12-06 2:30:09
hidden: true
slug: ws817622loo
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">纯JS将json数据转成Excel并导出</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="采用JS-XLSX这个简单的Javascript库来读取和写入Excel表格文件，并且能够支持最新版本的XLSX文件" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs x86asm"><code style="word-break: break-word; white-space: initial;">采用<span class="hljs-keyword">JS</span>-XLSX这个简单的Javascript库来读取和写入Excel表格文件，并且能够支持最新版本的XLSX文件</code></pre>
<h3 id="articleHeader1">一、node 环境 安装XLSX库</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1、with npm
    $ npm install xlsx
2、node 读取文件
    if(typeof require !== 'undefuned')
    var XLSX = require('XLSX')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livescript"><code><span class="hljs-number">1</span>、<span class="hljs-keyword">with</span> <span class="hljs-built_in">npm</span>
    $ <span class="hljs-built_in">npm</span> install xlsx
<span class="hljs-number">2</span>、node 读取文件
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">require</span> !== <span class="hljs-string">'undefuned'</span>)
    <span class="hljs-keyword">var</span> XLSX = <span class="hljs-built_in">require</span>(<span class="hljs-string">'XLSX'</span>)</code></pre>
<h3 id="articleHeader2">二、直接引入XLSX库</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;http://oss.sheetjs.com/js-xlsx/xlsx.full.min.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://oss.sheetjs.com/js-xlsx/xlsx.full.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h3 id="articleHeader3">三、导入JSON数据</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input type='type' onchange='importDataSource(this)'/>

var dataSource = null;
var fileName = '';

//1、importDataSource() 方法用来获取json数据
function importDataSource(obj) {

    //2、obj.files[0]获得onchange文件，name获得文件名作为Excel的文件名
    fileName = obj.files[0].name.split('.')[0];
    
    //3、创建FileReader对象，将文件内容读入内存，通过一些api接口，可以在主线程中访问本地文件
    var reader = new FileReader();
    
    //4、readAsText(file) 异步按字符读取文件内容，结果用字符串形式表示
    reader.readAsText(obj.files[0]);
    
    var that = this
    
    //5、onload事件，当读取操作成功完成时调用
    reader.onload = function() {
    
        //读取完毕后输出结果 为字符串 此时需要转成json对象
        that.dataSource = JSON.parse(this.result)
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;input type=<span class="hljs-string">'type'</span> onchange=<span class="hljs-string">'importDataSource(this)'</span>/&gt;

<span class="hljs-keyword">var</span> dataSource = <span class="hljs-literal">null</span>;
<span class="hljs-keyword">var</span> fileName = <span class="hljs-string">''</span>;

<span class="hljs-comment">//1、importDataSource() 方法用来获取json数据</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">importDataSource</span>(<span class="hljs-params">obj</span>) </span>{

    <span class="hljs-comment">//2、obj.files[0]获得onchange文件，name获得文件名作为Excel的文件名</span>
    fileName = obj.files[<span class="hljs-number">0</span>].name.split(<span class="hljs-string">'.'</span>)[<span class="hljs-number">0</span>];
    
    <span class="hljs-comment">//3、创建FileReader对象，将文件内容读入内存，通过一些api接口，可以在主线程中访问本地文件</span>
    <span class="hljs-keyword">var</span> reader = <span class="hljs-keyword">new</span> FileReader();
    
    <span class="hljs-comment">//4、readAsText(file) 异步按字符读取文件内容，结果用字符串形式表示</span>
    reader.readAsText(obj.files[<span class="hljs-number">0</span>]);
    
    <span class="hljs-keyword">var</span> that = <span class="hljs-keyword">this</span>
    
    <span class="hljs-comment">//5、onload事件，当读取操作成功完成时调用</span>
    reader.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    
        <span class="hljs-comment">//读取完毕后输出结果 为字符串 此时需要转成json对象</span>
        that.dataSource = <span class="hljs-built_in">JSON</span>.parse(<span class="hljs-keyword">this</span>.result)
    }
}
</code></pre>
<blockquote>FileReader()对象<br>方法：<br>1、abort():void 终止文件读取操作<br>2、readAsArrayBuffer(file):void 异步按字节读取文件内容，结果用ArrayBuffer对象表示(二进制缓存区) 将二进制数据存放在其中，大小与源文件一样，通过此方式，可以直接在网络中传输二进制内容<br>3、readAsBinaryString(file):void 异步按字节读取文件内容，结果为文件的二进制串 与上个方法不同的是 readAsBinaryString读取后的内容被编码为字符，大小会受到影响，不适合直接传输，不推荐使用<br>4、readAsDataURL(file):void 异步读取文件内容并进行base64编码后输出，结果用data:url的字符串形式表示<br>事件：<br>1、onabort 当读取操作被中止时调用<br>2、onerror 当读取操作发生错误时调用<br>3、onload 当读取操作成功完成时调用<br>4、onloadend 当读取操作完成时调用,不管是成功还是失败 <br>5、onloadstart 当读取操作将要开始之前调用<br>6、onprogress 在读取数据过程中周期性调用</blockquote>
<h3 id="articleHeader4">四、将json数据 导出Excel</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var wopts = {
        bookType: 'xlsx',
        bookSST: false, 
        type: 'binary'
    };
var workBook = {
        SheetNames: ['Sheet1'],
        Sheets: {},
        Props: {}
    };
    
function json2Excel() {

    //1、XLSX.utils.json_to_sheet(data) 接收一个对象数组并返回一个基于对象关键字自动生成的“标题”的工作表，默认的列顺序由使用Object.keys的字段的第一次出现确定
    //2、将数据放入对象workBook的Sheets中等待输出
    workBook.Sheets['Sheet1'] = XLSX.utils.json_to_sheet(dataSource)
    
    //3、XLSX.write() 开始编写Excel表格
    //4、changeData() 将数据处理成需要输出的格式
    saveAs(new Blob([changeData(XLSX.write(workBook, wopts))], {type: 'application/octet-stream'}))
}

function changeData(s) {

    //如果存在ArrayBuffer对象(es6) 最好采用该对象
    if (typeof ArrayBuffer !== 'undefined') {
        
        //1、创建一个字节长度为s.length的内存区域
        var buf = new ArrayBuffer(s.length);
        
        //2、创建一个指向buf的Unit8视图，开始于字节0，直到缓冲区的末尾
        var view = new Uint8Array(buf);
        
        //3、返回指定位置的字符的Unicode编码
        for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) &amp; 0xFF;
        return buf;

    } else {
        var buf = new Array(s.length);
        for (var i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) &amp; 0xFF;
        return buf;
    }
}
  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> wopts = {
        <span class="hljs-attr">bookType</span>: <span class="hljs-string">'xlsx'</span>,
        <span class="hljs-attr">bookSST</span>: <span class="hljs-literal">false</span>, 
        <span class="hljs-attr">type</span>: <span class="hljs-string">'binary'</span>
    };
<span class="hljs-keyword">var</span> workBook = {
        <span class="hljs-attr">SheetNames</span>: [<span class="hljs-string">'Sheet1'</span>],
        <span class="hljs-attr">Sheets</span>: {},
        <span class="hljs-attr">Props</span>: {}
    };
    
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">json2Excel</span>(<span class="hljs-params"></span>) </span>{

    <span class="hljs-comment">//1、XLSX.utils.json_to_sheet(data) 接收一个对象数组并返回一个基于对象关键字自动生成的“标题”的工作表，默认的列顺序由使用Object.keys的字段的第一次出现确定</span>
    <span class="hljs-comment">//2、将数据放入对象workBook的Sheets中等待输出</span>
    workBook.Sheets[<span class="hljs-string">'Sheet1'</span>] = XLSX.utils.json_to_sheet(dataSource)
    
    <span class="hljs-comment">//3、XLSX.write() 开始编写Excel表格</span>
    <span class="hljs-comment">//4、changeData() 将数据处理成需要输出的格式</span>
    saveAs(<span class="hljs-keyword">new</span> Blob([changeData(XLSX.write(workBook, wopts))], {<span class="hljs-attr">type</span>: <span class="hljs-string">'application/octet-stream'</span>}))
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">changeData</span>(<span class="hljs-params">s</span>) </span>{

    <span class="hljs-comment">//如果存在ArrayBuffer对象(es6) 最好采用该对象</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">ArrayBuffer</span> !== <span class="hljs-string">'undefined'</span>) {
        
        <span class="hljs-comment">//1、创建一个字节长度为s.length的内存区域</span>
        <span class="hljs-keyword">var</span> buf = <span class="hljs-keyword">new</span> <span class="hljs-built_in">ArrayBuffer</span>(s.length);
        
        <span class="hljs-comment">//2、创建一个指向buf的Unit8视图，开始于字节0，直到缓冲区的末尾</span>
        <span class="hljs-keyword">var</span> view = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Uint8Array</span>(buf);
        
        <span class="hljs-comment">//3、返回指定位置的字符的Unicode编码</span>
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i != s.length; ++i) view[i] = s.charCodeAt(i) &amp; <span class="hljs-number">0xFF</span>;
        <span class="hljs-keyword">return</span> buf;

    } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">var</span> buf = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>(s.length);
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i != s.length; ++i) buf[i] = s.charCodeAt(i) &amp; <span class="hljs-number">0xFF</span>;
        <span class="hljs-keyword">return</span> buf;
    }
}
  </code></pre>
<blockquote>XLSX.utils <br>1、XLSX.utils.table_to_sheet 我们常用的还有这个 将table数据转成Excel表格，需要一个表DOM元素并返回一个类似于输入表的工作表。 数字被解析。 所有其他数据将作为字符串存储。  <br>2、Uint8Array 8位无符号整数，长度1个字节  <br>3、ArrayBuffer是一块内存，比如var buf = new ArrayBuffer(1024), 就等于开辟了一块1kb大小的内存，但是不能通过buf[0]=12,来进行赋值，如果想操作内存块中的数据，需要通过var init8 = new Int8Array(buf)然后通过int8[0] = 12来操作<br>4、如果你从XHR、file API、canvas等读取到一大串字节流，采用ArrayBuffer比较好，会配合一些api来增强二进制的处理能力    <br>5、ArrayBuffer作为内存区域，可以存放多种类型的数据，不同的数据有不同的存储方式，Uint8Array就是其中一种，8表示这种数据类型占据的字节数。这里使用8来转换是因为数据类型最小占1个字节，可以存储字母、数字、汉字、字符等<br>6、s.charCodeAt(i) &amp; 0xFF：&amp;0xff这个是考虑到计算机内的存储都是利用二进制的补码进行存储的。对于正数(00000001),原码来说，首位表示符号位，反码 补码都是本身。对于负数(10000001)，原码来说，反码是对原码除了符号位之外做取反运算，即(11111110),补码是对反码作+1运算即(11111111)，这样做其实就是想保持二进制的补码的一致性 (详解：<a href="https://www.cnblogs.com/think-in-java/p/5527389.html)" rel="nofollow noreferrer" target="_blank">https://www.cnblogs.com/think...</a>
</blockquote>
<h3 id="articleHeader5">五、将文件输出并下载</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function saveAs(obj, fileName) {//当然可以自定义简单的下载文件实现方式 

    var tmpa = document.createElement(&quot;a&quot;);

    tmpa.download = fileName || &quot;下载&quot;;
    tmpa.href = URL.createObjectURL(obj); //绑定a标签
    tmpa.click(); //模拟点击实现下载

    setTimeout(function () { //延时释放
        URL.revokeObjectURL(obj); //用URL.revokeObjectURL()来释放这个object URL
    }, 100);

}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">saveAs</span>(<span class="hljs-params">obj, fileName</span>) </span>{<span class="hljs-comment">//当然可以自定义简单的下载文件实现方式 </span>

    <span class="hljs-keyword">var</span> tmpa = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"a"</span>);

    tmpa.download = fileName || <span class="hljs-string">"下载"</span>;
    tmpa.href = URL.createObjectURL(obj); <span class="hljs-comment">//绑定a标签</span>
    tmpa.click(); <span class="hljs-comment">//模拟点击实现下载</span>

    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ <span class="hljs-comment">//延时释放</span>
        URL.revokeObjectURL(obj); <span class="hljs-comment">//用URL.revokeObjectURL()来释放这个object URL</span>
    }, <span class="hljs-number">100</span>);

}
</code></pre>
<blockquote>模拟下载 a标签添加download属性</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
json转换Excel

## 原文链接
[https://segmentfault.com/a/1190000014242385](https://segmentfault.com/a/1190000014242385)

