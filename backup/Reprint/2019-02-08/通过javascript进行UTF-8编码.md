---
title: '通过javascript进行UTF-8编码' 
date: 2019-02-08 2:30:41
hidden: true
slug: mircczubcwc
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">通过javascript进行UTF-8编码</h2>
<hr>
<h3 id="articleHeader1">javascript的字符集：</h3>
<p>javascript程序是使用<code>Unicode</code>字符集编写的。<code>Unicode</code>是<code>ASCII</code>和<code>Latin-1</code>的超集，并支持地球上几乎所有的语言。<code>ECMAScript3</code>要求JavaScript必须支持<code>Unicode2.1</code>及后续版本，<code>ECMAScript5</code>则要求支持<code>Unicode3</code>及后续版本。所以，我们编写出来的javascript程序，都是使用Unicode编码的。</p>
<h3 id="articleHeader2">UTF-8</h3>
<p><code>UTF-8（UTF8-bit Unicode Transformation Format）</code>是一种针对Unicode的可变长度字符编码，也是一种前缀码。</p>
<p>它可以用来表示Unicode标准中的任何字符，且其编码中的<code>第一个字节仍与ASCII兼容</code>，这使得原来处理ASCII字符的软件无须或只须做少部分修改，即可继续使用。因此，<code>它逐渐成为电子邮件、网页及其他存储或发送文字的应用中，优先采用的编码</code>。</p>
<p>目前大部分的网站，都是使用的UTF-8编码。</p>
<h3 id="articleHeader3">将javascript生成的Unicode编码字符串转为UTF-8编码的字符串</h3>
<p>如标题所说的应用场景十分常见，例如发送一段二进制到服务器时，服务器规定该二进制内容的编码必须为UTF-8。这种情况下，我们必须就要通过程序将javascript的Unicode字符串转为UTF-8编码的字符串。</p>
<h3 id="articleHeader4">转换方法</h3>
<p>转换之前我们必须了解Unicode的编码结构是固定的。<br><em>不信可以试一试 String 的 charCodeAt 这个方法，看看返回的 charCode 占几个字节。</em></p>
<blockquote><ul><li><p>英文占1个字符，汉字占2个字符</p></li></ul></blockquote>
<p>然而，UTF-8的编码结构长度是<code>根据某单个字符的大小</code>来决定长度有多少。<br>下面为单个字符的大小占用几个字节。单个unicode字符编码之后的最大长度为6个字节。</p>
<blockquote><ul>
<li><p>1个字节：Unicode码为0 - 127</p></li>
<li><p>2个字节：Unicode码为128 - 2047</p></li>
<li><p>3个字节：Unicode码为2048 - 0xFFFF</p></li>
<li><p>4个字节：Unicode码为65536 - 0x1FFFFF</p></li>
<li><p>5个字节：Unicode码为0x200000 - 0x3FFFFFF</p></li>
<li><p>6个字节：Unicode码为0x4000000 - 0x7FFFFFFF</p></li>
</ul></blockquote>
<p>具体请看图片：<br><span class="img-wrap"><img data-src="/img/bVyttX" src="https://static.alili.tech/img/bVyttX" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>因为英文和英文字符的Unicode码为<code>0 - 127</code>，所以英文在Unicode和UTF-8中的长度和字节都是一致的，只占用1个字节。这也就是为什么<code>UTF8是Unicode的超集</code>！</p>
<p>现在我们再来讨论汉字，因为汉字的unicode码区间为<code>0x2e80 - 0x9fff</code>, 所以汉字在UTF8中的长度最长为3个字节。</p>
<p>那么汉字是如何从Unicode的2个字节转换为UTF8的三个字节的哪？</p>
<p>假设我需要把汉字"中"转为UTF-8的编码</p>
<h4>1、获取汉字Unicode值大小</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str = '中';
var charCode = str.charCodeAt(0);
console.log(charCode); // => 20013" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> str = <span class="hljs-string">'中'</span>;
<span class="hljs-keyword">var</span> charCode = str.charCodeAt(<span class="hljs-number">0</span>);
<span class="hljs-built_in">console</span>.log(charCode); <span class="hljs-comment">// =&gt; 20013</span></code></pre>
<h4>2、根据大小判断UTF8的长度</h4>
<p>由上一步我们得到汉字"中"的charCode为20013.然后我们发现20013位于2048 - 0xFFFF这个区间里，所以汉字"中"应该在UTF8中占3个字节。</p>
<h4>3、补码</h4>
<p>既然知道汉字"中"需要占3个字节，那么这3个字节如何得到哪？</p>
<p>这就需要设计到补码，具体补码逻辑如下：<br><span class="img-wrap"><img data-src="/img/bVytBT" src="https://static.alili.tech/img/bVytBT" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>好吧，我知道这个图你们也看不明白，还是我来讲吧！</p>
<p>具体的补位码如下,"x"表示空位，用来补位的。</p>
<blockquote><ul>
<li><p>0xxxxxxx</p></li>
<li><p>110xxxxx 10xxxxxx</p></li>
<li><p>1110xxxx 10xxxxxx 10xxxxxx</p></li>
<li><p>11110xxx 10xxxxxx 10xxxxxx 10xxxxxx</p></li>
<li><p>111110xx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx</p></li>
<li><p>1111110x 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx</p></li>
</ul></blockquote>
<p><code>warning:有没有发现？补位码第一个字节前面有几个1就表示整个UTF-8编码占多少个字节！UTF-8解码为Unicode就是利用的这个特点哦～</code></p>
<p>我们先举个简单的例子。把英文字母"A"转为UTF8编码。<br>1、“A”的charCode为65<br>2、65位于0-127的区间，所以“A”占一个字节<br>3、UTF8中一个字节的补位为0xxxxxxx，x表示的是空位，是用来补位的。<br>4、将65转为二进制得到1000001<br>5、将1000001按照从前到后的顺序，依次补到1xxxxxxx的空位中，得到01000001<br>6、将11000001转为字符串，得到"A"<br>7、最终，"A"为UTF8编码之后“A”</p>
<p>通过这个小例子，我们是否再次验证了<code>UTF-8是Unicode的超集</code>！</p>
<p>好了，我们现在再回到汉字"中"上，之前我们已经得到了"中"的charCode为20013，二进制为<code>01001110 00101101</code>。具体如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var code = 20013;
code.toString(2); 
// => 100111000101101 等同于 01001110 00101101" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>var <span class="hljs-keyword">code</span> = <span class="hljs-number">20013</span>;
<span class="hljs-keyword">code</span>.toString(<span class="hljs-number">2</span>); 
<span class="hljs-comment">// =&gt; 100111000101101 等同于 01001110 00101101</span></code></pre>
<p>然后，我们按照上面“A”补位的方法，来给"中"补位。<br>将<code>01001110 00101101</code>按照从前到后的顺序依此补位到<code>1110xxxx 10xxxxxx 10xxxxxx</code>上.得到<code>11100100 10111000 10101101</code>.</p>
<h4>4、得到UTF8编码的内容</h4>
<p>通过上面的步骤，我们得到了"中"的三个UTF8字节，<code>11100100 10111000 10101101</code>。<br>我们将每个字节转为16进制，得到<code>0xE4 0xB8 0xAD</code>;<br>那么这个<code>0xE4 0xB8 0xAD</code>就是我们最终得到的UTF8编码了。</p>
<p>我们使用nodejs的buffer来验证一下是否正确。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var buffer = new Buffer('中'); 
console.log(buffer.length); // => 3
console.log(buffer); // => <Buffer e4 b8 ad>
// 最终得到三个字节 0xe4 0xb8 0xad" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs glsl"><code>var <span class="hljs-keyword">buffer</span> = new Buffer('中'); 
console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">buffer</span>.<span class="hljs-built_in">length</span>); <span class="hljs-comment">// =&gt; 3</span>
console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">buffer</span>); <span class="hljs-comment">// =&gt; &lt;Buffer e4 b8 ad&gt;</span>
<span class="hljs-comment">// 最终得到三个字节 0xe4 0xb8 0xad</span></code></pre>
<p>因为16进制是不分大小写的，所以是不是跟我们算出来<code>0xE4 0xB8 0xAD</code>一模一样。</p>
<h4>将上面的编码逻辑写到一个函数中。</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 将字符串格式化为UTF8编码的字节
var writeUTF = function (str, isGetBytes) {
      var back = [];
      var byteSize = 0;
      for (var i = 0; i < str.length; i++) {
          var code = str.charCodeAt(i);
          if (0x00 <= code &amp;&amp; code <= 0x7f) {
                byteSize += 1;
                back.push(code);
          } else if (0x80 <= code &amp;&amp; code <= 0x7ff) {
                byteSize += 2;
                back.push((192 | (31 &amp; (code >> 6))));
                back.push((128 | (63 &amp; code)))
          } else if ((0x800 <= code &amp;&amp; code <= 0xd7ff) 
                  || (0xe000 <= code &amp;&amp; code <= 0xffff)) {
                byteSize += 3;
                back.push((224 | (15 &amp; (code >> 12))));
                back.push((128 | (63 &amp; (code >> 6))));
                back.push((128 | (63 &amp; code)))
          }
       }
       for (i = 0; i < back.length; i++) {
            back[i] &amp;= 0xff;
       }
       if (isGetBytes) {
            return back
       }
       if (byteSize <= 0xff) {
            return [0, byteSize].concat(back);
       } else {
            return [byteSize >> 8, byteSize &amp; 0xff].concat(back);
        }
}

writeUTF('中'); // =>  [0, 3, 228, 184, 173] 
// 前两位表示后面utf8字节的长度。因为长度为3，所以前两个字节为`0，3`
// 内容为`228, 184, 173`转成16进制就是`0xE4 0xB8 0xAD`" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code><span class="hljs-comment">// 将字符串格式化为UTF8编码的字节</span>
var writeUTF = function (str, isGetBytes) {
      var back = [];
      var byteSize = <span class="hljs-number">0</span>;
      <span class="hljs-keyword">for</span> (var i = <span class="hljs-number">0</span>; i &lt; str.length; i++) {
          var <span class="hljs-built_in">code</span> = str.charCodeAt(i);
          <span class="hljs-keyword">if</span> (<span class="hljs-number">0x00</span> &lt;= <span class="hljs-built_in">code</span> &amp;&amp; <span class="hljs-built_in">code</span> &lt;= <span class="hljs-number">0x7f</span>) {
                byteSize += <span class="hljs-number">1</span>;
                back.<span class="hljs-keyword">push</span>(<span class="hljs-built_in">code</span>);
          } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-number">0x80</span> &lt;= <span class="hljs-built_in">code</span> &amp;&amp; <span class="hljs-built_in">code</span> &lt;= <span class="hljs-number">0x7ff</span>) {
                byteSize += <span class="hljs-number">2</span>;
                back.<span class="hljs-keyword">push</span>((<span class="hljs-number">192</span> | (<span class="hljs-number">31</span> &amp; (<span class="hljs-built_in">code</span> &gt;&gt; <span class="hljs-number">6</span>))));
                back.<span class="hljs-keyword">push</span>((<span class="hljs-number">128</span> | (<span class="hljs-number">63</span> &amp; <span class="hljs-built_in">code</span>)))
          } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> ((<span class="hljs-number">0x800</span> &lt;= <span class="hljs-built_in">code</span> &amp;&amp; <span class="hljs-built_in">code</span> &lt;= <span class="hljs-number">0xd7ff</span>) 
                  || (<span class="hljs-number">0xe000</span> &lt;= <span class="hljs-built_in">code</span> &amp;&amp; <span class="hljs-built_in">code</span> &lt;= <span class="hljs-number">0xffff</span>)) {
                byteSize += <span class="hljs-number">3</span>;
                back.<span class="hljs-keyword">push</span>((<span class="hljs-number">224</span> | (<span class="hljs-number">15</span> &amp; (<span class="hljs-built_in">code</span> &gt;&gt; <span class="hljs-number">12</span>))));
                back.<span class="hljs-keyword">push</span>((<span class="hljs-number">128</span> | (<span class="hljs-number">63</span> &amp; (<span class="hljs-built_in">code</span> &gt;&gt; <span class="hljs-number">6</span>))));
                back.<span class="hljs-keyword">push</span>((<span class="hljs-number">128</span> | (<span class="hljs-number">63</span> &amp; <span class="hljs-built_in">code</span>)))
          }
       }
       <span class="hljs-keyword">for</span> (i = <span class="hljs-number">0</span>; i &lt; back.length; i++) {
            back[i] &amp;= <span class="hljs-number">0xff</span>;
       }
       <span class="hljs-keyword">if</span> (isGetBytes) {
            <span class="hljs-keyword">return</span> back
       }
       <span class="hljs-keyword">if</span> (byteSize &lt;= <span class="hljs-number">0xff</span>) {
            <span class="hljs-keyword">return</span> [<span class="hljs-number">0</span>, byteSize].concat(back);
       } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">return</span> [byteSize &gt;&gt; <span class="hljs-number">8</span>, byteSize &amp; <span class="hljs-number">0xff</span>].concat(back);
        }
}

writeUTF('中'); <span class="hljs-comment">// =&gt;  [0, 3, 228, 184, 173] </span>
<span class="hljs-comment">// 前两位表示后面utf8字节的长度。因为长度为3，所以前两个字节为`0，3`</span>
<span class="hljs-comment">// 内容为`228, 184, 173`转成16进制就是`0xE4 0xB8 0xAD`</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 读取UTF8编码的字节，并专为Unicode的字符串
var readUTF = function (arr) {
    if (typeof arr === 'string') {
        return arr;
    }
    var UTF = '', _arr = this.init(arr);
    for (var i = 0; i < _arr.length; i++) {
        var one = _arr[i].toString(2),
                v = one.match(/^1+?(?=0)/);
        if (v &amp;&amp; one.length == 8) {
            var bytesLength = v[0].length;
            var store = _arr[i].toString(2).slice(7 - bytesLength);
            for (var st = 1; st < bytesLength; st++) {
                store += _arr[st + i].toString(2).slice(2)
            }
            UTF += String.fromCharCode(parseInt(store, 2));
            i += bytesLength - 1
        } else {
            UTF += String.fromCharCode(_arr[i])
        }
    }
    return UTF
}

readUTF([0, 3, 228, 184, 173]); => '中'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 读取UTF8编码的字节，并专为Unicode的字符串</span>
<span class="hljs-keyword">var</span> readUTF = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">arr</span>) </span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> arr === <span class="hljs-string">'string'</span>) {
        <span class="hljs-keyword">return</span> arr;
    }
    <span class="hljs-keyword">var</span> UTF = <span class="hljs-string">''</span>, _arr = <span class="hljs-keyword">this</span>.init(arr);
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; _arr.length; i++) {
        <span class="hljs-keyword">var</span> one = _arr[i].toString(<span class="hljs-number">2</span>),
                v = one.match(<span class="hljs-regexp">/^1+?(?=0)/</span>);
        <span class="hljs-keyword">if</span> (v &amp;&amp; one.length == <span class="hljs-number">8</span>) {
            <span class="hljs-keyword">var</span> bytesLength = v[<span class="hljs-number">0</span>].length;
            <span class="hljs-keyword">var</span> store = _arr[i].toString(<span class="hljs-number">2</span>).slice(<span class="hljs-number">7</span> - bytesLength);
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> st = <span class="hljs-number">1</span>; st &lt; bytesLength; st++) {
                store += _arr[st + i].toString(<span class="hljs-number">2</span>).slice(<span class="hljs-number">2</span>)
            }
            UTF += <span class="hljs-built_in">String</span>.fromCharCode(<span class="hljs-built_in">parseInt</span>(store, <span class="hljs-number">2</span>));
            i += bytesLength - <span class="hljs-number">1</span>
        } <span class="hljs-keyword">else</span> {
            UTF += <span class="hljs-built_in">String</span>.fromCharCode(_arr[i])
        }
    }
    <span class="hljs-keyword">return</span> UTF
}

readUTF([<span class="hljs-number">0</span>, <span class="hljs-number">3</span>, <span class="hljs-number">228</span>, <span class="hljs-number">184</span>, <span class="hljs-number">173</span>]); =&gt; <span class="hljs-string">'中'</span></code></pre>
<h3 id="articleHeader5">另外一种将中文解析得到UTF8字节码的方法</h3>
<p>另外一种比较简单的将中文转为UTF8字节码的方法比较简单，浏览器也提供了一个方法，而且这个方法大家都一直在用，是什么哪？就是<code>encodeURI</code>。当然，<code>encodeURIComponent</code>也是可以的。<br>没错，就是这个方法。那么这个方法是怎么将一个Unicode编码的中文转为UTF8的字节码嘞？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str = '中';

var code = encodeURI(str);

console.log(code); // => %E4%B8%AD" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> str = <span class="hljs-string">'中'</span>;

<span class="hljs-keyword">var</span> code = <span class="hljs-built_in">encodeURI</span>(str);

<span class="hljs-built_in">console</span>.log(code); <span class="hljs-comment">// =&gt; %E4%B8%AD</span></code></pre>
<p>有没有发现得到了一个转义后的字符串，而且这个字符串中的内容和我之前在上面得到的字节码是一样的～～～。</p>
<p>下面我们将<code>%E4%B8%AD</code>转为一个number数组。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var codeList = code.split('%');

codeList = codeList.map(item => parseInt(item,16));

console.log(codeList); // => [228, 184, 173]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> codeList = code.split(<span class="hljs-string">'%'</span>);

codeList = codeList.map(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> <span class="hljs-built_in">parseInt</span>(item,<span class="hljs-number">16</span>));

<span class="hljs-built_in">console</span>.log(codeList); <span class="hljs-comment">// =&gt; [228, 184, 173]</span></code></pre>
<p>如此简单，有木有～～～</p>
<h4>这个简便方法的原理是什么？</h4>
<p>这里就涉及到的<code>URI</code>中的<code>querystring</code>编码的问题了。因为按照规定，URI中的querystring必须按照UTF8的编码进行传输，而JavaScript是Unicode的，所以浏览器就给我们提供了一个方法，也就是<code>encodeURI</code>/<code>encodeURIComponent</code>方法。这个方法会讲<code>非英文字符</code>(<em>这里考虑下，为什么是非英文字符？</em>)先转为UTF8的字节码，然后前面加个%进行拼接，所以我们将汉字<code>"中"</code>转义下便得到了<code>"%E4%B8%AD"</code>.<br>好吧，原理就这些，没有其他的了。</p>
<p>不过，这种方法还有个缺点，那就是<code>只会转义非英文字符</code>，所以当我们需要将英文字符也格式化为UTF8编码时，这个方法是达不到我们需求的，我们还需要额外的将英文字符也给转义下。</p>
<p>那我想要解析回来应该怎么做哪？用<code>decodeURI</code>/<code>decodeURIComponent</code>就可以了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var codeList = [228, 184, 173];

var code = codeList.map(item => '%'+item.toString(16)).join('');

decodeURI(code); // => 中" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> codeList = [<span class="hljs-number">228</span>, <span class="hljs-number">184</span>, <span class="hljs-number">173</span>];

<span class="hljs-keyword">var</span> code = codeList.map(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> <span class="hljs-string">'%'</span>+item.toString(<span class="hljs-number">16</span>)).join(<span class="hljs-string">''</span>);

<span class="hljs-built_in">decodeURI</span>(code); <span class="hljs-comment">// =&gt; 中</span></code></pre>
<p>好了，到这里本文也就介绍完UTF8的编码了。<br>希望可以帮助大家了解到UTF-8编码的原理。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
通过javascript进行UTF-8编码

## 原文链接
[https://segmentfault.com/a/1190000005794963](https://segmentfault.com/a/1190000005794963)

