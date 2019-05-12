---
title: 'jQuery常用方法总结【一】' 
date: 2018-12-09 2:30:08
hidden: true
slug: 2b5cb5g1jme
categories: [reprint]
---

{{< raw >}}

                    
<p>近几天上班闲来无事，把jQuery常用的方法做了下总结，记个笔记。</p>
<h2 id="articleHeader0">用来操作元素的方法</h2>
<p><strong>1. val()</strong> ：返回的或设置被选元素的值，大多用于input元素。相当于document.getElementById("input1").value;</p>
<p><strong>2. html()</strong> ：返回或设置被选元素的内容（包括HTML标记）。或者说当被选元素有子元素时，则连子元素的标签一起返回。</p>
<p><strong>3. text()</strong> ：返回或设置被选元素的文本内容（不包括HTML标记）。</p>
<p><strong><em>这三个方法的区别：</em></strong></p>
<p><strong>用于取值时</strong></p>
<p>val()一般用于input元素的取值，text()和html()一般用于除input以外的文本的取值。<br>val()和html()相同，如果其应用在多个元素上时，只能读取第一个表单元素的"value"值，而text()则可以获取<br>所有选中的元素的文本内容。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="例:    <input type=&quot;text&quot; id=&quot;text1&quot;/>
       <input type=&quot;text&quot; id=&quot;text2&quot;/>
        
   ->   $(&quot;#text1,#text2&quot;).val();  //只能获取到text1的value



" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fsharp"><code>例:    &lt;input <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"text"</span> id=<span class="hljs-string">"text1"</span>/&gt;
       &lt;input <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"text"</span> id=<span class="hljs-string">"text2"</span>/&gt;
        
   -&gt;   $(<span class="hljs-string">"#text1,#text2"</span>).<span class="hljs-keyword">val</span>();  <span class="hljs-comment">//只能获取到text1的value</span>



</code></pre>
<hr>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="            
        <div id=&quot;p1&quot;> <p>text1</p> </div>    
        <div id=&quot;p2&quot;> <p>text2</p> </div>         
        
   ->   $(&quot;#p1,#p2&quot;).html();  //只能获取到id=p1的div的文本值和标签 <p>text1</p>

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>            
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"p1"</span>&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>text1<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span> <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>    
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"p2"</span>&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>text2<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span> <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>         
        
   -&gt;   $("#p1,#p2").html();  //只能获取到id=p1的div的文本值和标签 <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>text1<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>

</code></pre>
<hr>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 
        <p id=&quot;p1&quot;>text1</p>     
        <p id=&quot;p2&quot;>text2</p>  
        
   ->   $(&quot;#p1,#p2&quot;).text();  //可以获取到p1和p2的文本值text1,text2


  
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code> 
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"p1"</span>&gt;</span>text1<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>     
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"p2"</span>&gt;</span>text2<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>  
        
   -&gt;   $("#p1,#p2").text();  //可以获取到p1和p2的文本值text1,text2


  
    </code></pre>
<p><strong>用于设置值时</strong></p>
<p>html(),val(),text()都可以改变所有已选取元素的值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="例：  $(&quot;#text1,#text2,#text3&quot;).val(&quot;test&quot;);  //可以将id为text1,text2,text3的元素值全部改成test

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livescript"><code>例：  $(<span class="hljs-string">"<span class="hljs-subst">#text1</span>,<span class="hljs-subst">#text2</span>,<span class="hljs-subst">#text3</span>"</span>).val(<span class="hljs-string">"test"</span>);  <span class="hljs-regexp">//可以将id为text1,text2,text3的元素值全部改成test

</span></code></pre>
<p><strong>4.attr()</strong> ：用于获取或改变属性值，只要是键值对的元素属性，都可以使用attr()。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="例(获取属性值)：                   
                   <a id=&quot;a1&quot; href=&quot;www.baidu.com&quot;>链接</a>
     
             ->    var href = $(&quot;#a1&quot;).attr(&quot;href&quot;);  //返回id=a1的a元素的href属性：www.baidu.com   

 
     
  (改变属性值)：  
     ->    $(&quot;#a1&quot;).attr(&quot;href&quot;，&quot;www.google.com&quot;);  //将id=a1的a元素href改成 www.google.com
     

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code>例(获取属性值)：                   
                   &lt;a id=<span class="hljs-string">"a1"</span> href=<span class="hljs-string">"www.baidu.com"</span>&gt;链接&lt;/a&gt;
     
             -&gt;    <span class="hljs-built_in">var</span> href = $(<span class="hljs-string">"#a1"</span>).<span class="hljs-built_in">attr</span>(<span class="hljs-string">"href"</span>);  <span class="hljs-comment">//返回id=a1的a元素的href属性：www.baidu.com   </span>

 
     
  (改变属性值)：  
     -&gt;    $(<span class="hljs-string">"#a1"</span>).<span class="hljs-built_in">attr</span>(<span class="hljs-string">"href"</span>，<span class="hljs-string">"www.google.com"</span>);  <span class="hljs-comment">//将id=a1的a元素href改成 www.google.com</span>
     

</code></pre>
<hr>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" (获取属性值)：
            <input id=&quot;text1&quot; type=&quot;text&quot; class=&quot;aa&quot; style=&quot;width:100px;&quot;/>
        
 ->     var text1 = $(&quot;#text1&quot;).attr(&quot;id&quot;);  //返回 &quot;text1&quot;
 ->     var text2 = $(&quot;#text1&quot;).attr(&quot;type&quot;);  //返回 &quot;text&quot;
 ->     var text3 = $(&quot;#text1&quot;).attr(&quot;class&quot;);  //返回 &quot;aa&quot;
 ->     var text4 = $(&quot;#text1&quot;).attr(&quot;style&quot;);  //返回 &quot;width:100px;&quot;




(改变属性值)：  
 ->     $(&quot;#text1&quot;).attr({
                'type' : 'password',
                'class' : 'bb',
                'style' : 'width:80px;'
        });  //将id=text1的元素type改成 password，class改成bb，style改成width:80px;
 
        注意：修改多个属性值时，最后一个属性不要带逗号！  
        建议：对于checked和selected这两个属性，用prop代替attr会好一些，因为：
               1） attr只能获取初始值，无论是否变化。
               2） prop能访问变化后的值，并以true/false返回。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code> (获取属性值)：
            &lt;input id=<span class="hljs-string">"text1"</span> type=<span class="hljs-string">"text"</span> class=<span class="hljs-string">"aa"</span> style=<span class="hljs-string">"width:100px;"</span>/&gt;
        
 -&gt;     var text1 = <span class="hljs-variable">$(</span><span class="hljs-string">"#text1"</span>).attr(<span class="hljs-string">"id"</span>);  <span class="hljs-regexp">//</span>返回 <span class="hljs-string">"text1"</span>
 -&gt;     var text2 = <span class="hljs-variable">$(</span><span class="hljs-string">"#text1"</span>).attr(<span class="hljs-string">"type"</span>);  <span class="hljs-regexp">//</span>返回 <span class="hljs-string">"text"</span>
 -&gt;     var text3 = <span class="hljs-variable">$(</span><span class="hljs-string">"#text1"</span>).attr(<span class="hljs-string">"class"</span>);  <span class="hljs-regexp">//</span>返回 <span class="hljs-string">"aa"</span>
 -&gt;     var text4 = <span class="hljs-variable">$(</span><span class="hljs-string">"#text1"</span>).attr(<span class="hljs-string">"style"</span>);  <span class="hljs-regexp">//</span>返回 <span class="hljs-string">"width:100px;"</span>




(改变属性值)：  
 -&gt;     <span class="hljs-variable">$(</span><span class="hljs-string">"#text1"</span>).attr({
                <span class="hljs-string">'type'</span> : <span class="hljs-string">'password'</span>,
                <span class="hljs-string">'class'</span> : <span class="hljs-string">'bb'</span>,
                <span class="hljs-string">'style'</span> : <span class="hljs-string">'width:80px;'</span>
        });  <span class="hljs-regexp">//</span>将id=text1的元素type改成 password，class改成bb，style改成<span class="hljs-symbol">width:</span><span class="hljs-number">80</span>px;
 
        注意：修改多个属性值时，最后一个属性不要带逗号！  
        建议：对于checked和selected这两个属性，用prop代替attr会好一些，因为：
               <span class="hljs-number">1</span>） attr只能获取初始值，无论是否变化。
               <span class="hljs-number">2</span>） prop能访问变化后的值，并以<span class="hljs-keyword">true</span>/<span class="hljs-keyword">false</span>返回。
</code></pre>
<h2 id="articleHeader1">操作元素的css属性或者类</h2>
<p><strong>1. addClass()</strong> ： 向被选元素添加一个或者多个类。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="例： .text1{
        width:100%;
        height:90px;
     }
     
     <input type=&quot;text&quot; id=&quot;text1&quot;/>
     
     $(#text1&quot;).addClass(&quot;text1&quot;);
->   <input type=&quot;text&quot; id=&quot;text1&quot; class=&quot;text1&quot;/>

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>例： .text1{
        width:100%;
        height:90px;
     }
     
     &lt;<span class="hljs-keyword">input</span> <span class="hljs-keyword">type</span>=<span class="hljs-string">"text"</span> id=<span class="hljs-string">"text1"</span>/&gt;
     
     $(#text1<span class="hljs-string">").addClass("</span>text1");
-&gt;   &lt;<span class="hljs-keyword">input</span> <span class="hljs-keyword">type</span>=<span class="hljs-string">"text"</span> id=<span class="hljs-string">"text1"</span> <span class="hljs-keyword">class</span>=<span class="hljs-string">"text1"</span>/&gt;

</code></pre>
<p><strong>2. removeClass()</strong> : 从被选元素中删除一个类。</p>
<p><strong>3. toggleClass()</strong> ： 对被选元素进行添加/删除类的切换操作。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 
例：  .blue{
          color : blue;
      }
      
      <h1>标题</h1>
      
      $(&quot;h1&quot;).toggleClass(&quot;blue&quot;);      
->    当h1元素的class包括blue时就删除，没有时就加上。   


" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code> 
例：  .<span class="hljs-built_in">blue</span>{
          <span class="hljs-built_in">color</span> : <span class="hljs-built_in">blue</span>;
      }
      
      &lt;h1&gt;标题&lt;/h1&gt;
      
      $(<span class="hljs-string">"h1"</span>).toggleClass(<span class="hljs-string">"blue"</span>);      
-&gt;    当h1元素的class包括<span class="hljs-built_in">blue</span>时就删除，没有时就加上。   


</code></pre>
<p><strong>4. css()</strong> ： 设置或返回被选元素的一个或者多个样式属性，用法和attr()一样。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 
例： $('#text1').css('background-color');  //返回text1的背景色
     $('#text1').css('background-color','red');  //设置text1的背景色为红色
     $('#text1').css({ 'background-color':'red',
                       'font-size':'200%'}
                     );   //设置多个样式属性
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code> 
例： <span class="hljs-variable">$(</span><span class="hljs-string">'#text1'</span>).css(<span class="hljs-string">'background-color'</span>);  <span class="hljs-regexp">//</span>返回text1的背景色
     <span class="hljs-variable">$(</span><span class="hljs-string">'#text1'</span>).css(<span class="hljs-string">'background-color'</span>,<span class="hljs-string">'red'</span>);  <span class="hljs-regexp">//</span>设置text1的背景色为红色
     <span class="hljs-variable">$(</span><span class="hljs-string">'#text1'</span>).css({ <span class="hljs-string">'background-color'</span><span class="hljs-symbol">:<span class="hljs-string">'red'</span></span>,
                       <span class="hljs-string">'font-size'</span><span class="hljs-symbol">:<span class="hljs-string">'200%'</span></span>}
                     );   <span class="hljs-regexp">//</span>设置多个样式属性
</code></pre>
<h2 id="articleHeader2">用于添加或删除元素</h2>
<p><strong>1. append()</strong> : 在被选元素的结尾插入新内容。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="例： <p id=&quot;p1&quot;> 111 </p>

->   $('#p1').append(&quot;222&quot;);
                
->   <p id=&quot;p1&quot;> 111222 </p>

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haml"><code>例： &lt;p id="p1"&gt; 111 &lt;/p&gt;

-<span class="ruby">&gt;   $(<span class="hljs-string">'#p1'</span>).append(<span class="hljs-string">"222"</span>);
</span>                
-<span class="ruby">&gt;   &lt;p id=<span class="hljs-string">"p1"</span>&gt; <span class="hljs-number">111222</span> &lt;<span class="hljs-regexp">/p&gt;
</span></span>
</code></pre>
<p><strong>2. prepend()</strong> : 在被选元素的开头插入新内容，与append相反。</p>
<p><strong>3. after()</strong> ：在被选元素之后插入新内容。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="例： <p id=&quot;p1&quot;> 111 </p>

->   $('#p1').after(&quot;222&quot;);
                
->   <p id=&quot;p1&quot;> 111 </p>222

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haml"><code>例： &lt;p id="p1"&gt; 111 &lt;/p&gt;

-<span class="ruby">&gt;   $(<span class="hljs-string">'#p1'</span>).after(<span class="hljs-string">"222"</span>);
</span>                
-<span class="ruby">&gt;   &lt;p id=<span class="hljs-string">"p1"</span>&gt; <span class="hljs-number">111</span> &lt;<span class="hljs-regexp">/p&gt;222
</span></span>
</code></pre>
<p><strong>4. before()</strong> : 在被选元素之前插入新内容，与after相反。</p>
<p>区别： <strong>append和prepend是在被选元素里面添加内容，after和before是在被选元素外面添加内容。</strong></p>
<hr>
<p><strong>5. remove()</strong> : 删除被选元素（及其子元素），就是删除被被选元素包裹在内的所有元素，包括它自己。</p>
<p><strong>6. empty()</strong> ： 删除被选元素的所有子元素，不删除被选元素自己。</p>
<h2 id="articleHeader3">操作元素尺寸</h2>
<p>在看下面的方法之前，咱得先把div的那些尺寸再搞清楚一遍。<br><span class="img-wrap"><img data-src="/img/bV6ACf?w=335&amp;h=200" src="https://static.alili.tech/img/bV6ACf?w=335&amp;h=200" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>上图是一张div的图，上面标记了它的各项属性，</p>
<ul>
<li>第二层<strong>灰色</strong>的部分是这个div的<strong>边框</strong>，平时的边框可能没这么宽，只是这个想让大家看的更明白一点，</li>
<li>最里层的<strong>淡灰色</strong>是div里面的<strong>内容</strong>，可能是table，文本或者其他的，这些内容会和边框有个距离，不管是上下左右，这个距离就是<strong>padding（内边距）</strong>，也是<strong>蓝色</strong>的部分。这三层构成了一个div，这个div呢，和它的父元素，可能也是一个div，也可能就是浏览器窗口了，不管是上下左右也会有一个距离，这个距离就是<strong>margin（外边距）</strong>，是最外面虚线框与灰色边框中间的那部分<strong>白色</strong>的。</li>
</ul>
<p>好，来看下面的方法：</p>
<p><strong>1. width()</strong> ：<strong>设置或返回</strong>元素的宽度（不包括內边距，边框，和外边距）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="例 ： <div id=&quot;div1&quot; style=&quot;height:100px;width:300px;padding:10px;margin:3px;border:1px solid blue;&quot;>
      </div>
      
      这个例子是一个div，它的高度是100px，宽度是300px，内边距padding是10px，外边距margin是3px，
边框的宽度是1px。

-> $(&quot;#div1&quot;).width(); //返回div1元素的宽度300px
-> $(&quot;#div1&quot;).width(&quot;300px&quot;); //重新设置div1元素的宽度为300px
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>例 ： &lt;div id=<span class="hljs-string">"div1"</span> style=<span class="hljs-string">"height:100px;width:300px;padding:10px;margin:3px;border:1px solid blue;"</span>&gt;
      &lt;/div&gt;
      
      这个例子是一个div，它的高度是<span class="hljs-number">100</span>px，宽度是<span class="hljs-number">300</span>px，内边距padding是<span class="hljs-number">10</span>px，外边距margin是<span class="hljs-number">3</span>px，
边框的宽度是<span class="hljs-number">1</span>px。

-&gt; $(<span class="hljs-string">"#div1"</span>).width(); <span class="hljs-comment">//返回div1元素的宽度300px</span>
-&gt; $(<span class="hljs-string">"#div1"</span>).width(<span class="hljs-string">"300px"</span>); <span class="hljs-comment">//重新设置div1元素的宽度为300px</span>
</code></pre>
<p><strong>2. height()</strong> ：<strong>设置或返回</strong>元素的高度（不包括内边距，边框，和外边距），</p>
<p>还是上面那个例子，$("#div1").height();返回div1的高度100px。也可以用这个方法也可以设置高度，同上。</p>
<p><strong>3. innerWidth()</strong> ：<strong>返回</strong>元素的宽度（包括内边距）。</p>
<p>这个方法是不仅返回元素的宽度，还会加上它的左右内边距的值一起返回，比如上个例子，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    $(&quot;#div1&quot;).innerWidth();
->  300（宽度） + 10（左内边距） + 10（右内边距） = 320px 。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>    $(<span class="hljs-string">"#div1"</span>).innerWidth();
-&gt;  <span class="hljs-number">300</span>（宽度） + <span class="hljs-number">10</span>（左内边距） + <span class="hljs-number">10</span>（右内边距） = <span class="hljs-number">320</span>px 。
</code></pre>
<p>我也不太明白为什么有这样一个方法，我还没用过，不过可以用来计算内边距。<br>注意： 这个方法只能返回值，并不能设置值。</p>
<p><strong>4. innerHeight()</strong> ： <strong>返回</strong>元素的高度（包括外边距）。</p>
<p>这个方法返回元素的高度，加上它的上下内边距.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    $(&quot;#div1&quot;).innerHeight();
->  100（高度）+ 10（上边距）+10（下边距）= 120px
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>    $(<span class="hljs-string">"#div1"</span>).innerHeight();
-&gt;  <span class="hljs-number">100</span>（高度）+ <span class="hljs-number">10</span>（上边距）+<span class="hljs-number">10</span>（下边距）= <span class="hljs-number">120</span>px
</code></pre>
<p><strong>5. outerWidth()</strong> ： <strong>返回</strong>元素的宽度（包括内边距，边框）。</p>
<p>这个方法返回元素的宽度，再加上它的左右边距，再加上它左右边框的宽度。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    $(&quot;#div1&quot;).outerWidth();
->  300（宽度） + 10（左内边距） + 10（右内边距） + 1（左边框宽度) + 1（右边框宽度）= 322px 。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>    $(<span class="hljs-string">"#div1"</span>).outerWidth();
-&gt;  <span class="hljs-number">300</span>（宽度） + <span class="hljs-number">10</span>（左内边距） + <span class="hljs-number">10</span>（右内边距） + <span class="hljs-number">1</span>（左边框宽度) + <span class="hljs-number">1</span>（右边框宽度）= <span class="hljs-number">322</span>px 。
</code></pre>
<p>就是innerWidth加上两边边框的宽度嘛，估计是用来计算边框宽度的。</p>
<p><strong>6. outerHeight()</strong> ： <strong>返回</strong>元素的高度（包括内边距，边框）。<br>这个方法返回元素的宽度，再加上它的左右边距，再加上它上下边框的宽度。计算方法同上，应该是122px。</p>
<p><strong>7. outerWidth(true)</strong> ：<strong>返回</strong>元素的宽度（包括内边距，边框和外边距）。</p>
<p>宽度，内边距，边框都算完了，怎么能落下外边距呢，inner和outer都用完了，估计开发的时候没词了，就在outerWidth()里面加个true，<br>就这样咱可以把外边距再算进去。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    $(&quot;#div1&quot;).outerWidth(true); 
->  300（宽度） + 10（左内边距） + 10（右内边距） + 1（左边框宽度) + 1（右边框宽度）+ 3（左外边距）+ 3（右边距）= 328px 。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>    $(<span class="hljs-string">"#div1"</span>).outerWidth(true); 
-&gt;  <span class="hljs-number">300</span>（宽度） + <span class="hljs-number">10</span>（左内边距） + <span class="hljs-number">10</span>（右内边距） + <span class="hljs-number">1</span>（左边框宽度) + <span class="hljs-number">1</span>（右边框宽度）+ <span class="hljs-number">3</span>（左外边距）+ <span class="hljs-number">3</span>（右边距）= <span class="hljs-number">328</span>px 。
</code></pre>
<p><strong>8. outerHeight(true)</strong> : <strong>返回</strong>元素的高度（包括内边距，边框和外边距）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    $(&quot;#div1&quot;).outerHeight(true); 
->  300（宽度） + 10（上内边距） + 10（下内边距） + 1（上边框宽度) + 1（下边框宽度）+ 3（上外边距）+ 3（下边距）= 128px 。

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>    $(<span class="hljs-string">"#div1"</span>).outerHeight(true); 
-&gt;  <span class="hljs-number">300</span>（宽度） + <span class="hljs-number">10</span>（上内边距） + <span class="hljs-number">10</span>（下内边距） + <span class="hljs-number">1</span>（上边框宽度) + <span class="hljs-number">1</span>（下边框宽度）+ <span class="hljs-number">3</span>（上外边距）+ <span class="hljs-number">3</span>（下边距）= <span class="hljs-number">128</span>px 。

</code></pre>
<hr>
<p>元素的操作先写这么多，等下在下一篇文章里面写一下jQuery的ajax操作，元素的遍历。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
jQuery常用方法总结【一】

## 原文链接
[https://segmentfault.com/a/1190000013896756](https://segmentfault.com/a/1190000013896756)

