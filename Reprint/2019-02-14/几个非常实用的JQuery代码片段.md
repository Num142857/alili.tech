---
title: '几个非常实用的JQuery代码片段' 
date: 2019-02-14 2:30:37
hidden: true
slug: 15zas8c13fe
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000016895817" src="https://static.alili.tech/img/remote/1460000016895817" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>jQuery是一个兼容多浏览器的javascript库，核心理念是write less,do more(写得更少,做得更多)。jQuery使用户能更方便地处理HTML（标准通用标记语言下的一个应用）、events、实现动画效果，并且方便地为网站提供AJAX交互。jQuery还有一个比较大的优势是，它的文档说明很全，而且各种应用也说得很详细，同时还有许多成熟的插件可供选择。jQuery能够使用户的html页面保持代码和html内容分离，也就是说，不用再在html里面插入一堆js来调用命令了，只需要定义id即可，jQuery已经成为最流行的javascript库，下面给大家推荐几款常用的JQuery代码。</p>
<h1 id="articleHeader0">1、管理搜索框的值</h1>
<p>现在各大网站都有搜索框，而搜索框通常都有默认值，当输入框获取焦点时，默认值消失。而一旦输入框失去焦点，而输入框里又没有输入新的值，输入框里的值又会恢复成默认值，如果往输入框里输入了新值，则输入框的值为新输入的值。这种特效用JQuery很容易实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(&quot;#searchbox&quot;)
   .focus(function(){$(this).val('')})
   .blur(function(){
       var $this = $(this);
      // '请搜索...'为搜索框默认值
      ($this.val() === '')? $this.val('请搜索...') : null;
 });
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>$(<span class="hljs-string">"#searchbox"</span>)
   .focus(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{$(<span class="hljs-keyword">this</span>).val(<span class="hljs-string">''</span>)})
   .blur(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
       <span class="hljs-keyword">var</span> $<span class="hljs-keyword">this</span> = $(<span class="hljs-keyword">this</span>);
      <span class="hljs-comment">// '请搜索...'为搜索框默认值</span>
      ($<span class="hljs-keyword">this</span>.val() === <span class="hljs-string">''</span>)? $<span class="hljs-keyword">this</span>.val(<span class="hljs-string">'请搜索...'</span>) : <span class="hljs-literal">null</span>;
 });
</code></pre>
<h1 id="articleHeader1">2、反序访问JQuery对象里的元素</h1>
<p>在某些场景下，我们可能需要反序访问通过JQuery选择器获取到的页面元素对象，这个怎么实现呢？看下面代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//要掌握JQuery对象的get方法 以及数组的reverse方法即可
var arr = $('#nav').find('li').get().reverse();
$.each(arr,function(index,ele){
     .... ...
 });
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//要掌握JQuery对象的get方法 以及数组的reverse方法即可</span>
<span class="hljs-keyword">var</span> arr = $(<span class="hljs-string">'#nav'</span>).find(<span class="hljs-string">'li'</span>).get().reverse();
$.each(arr,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">index,ele</span>)</span>{
     .... ...
 });
</code></pre>
<h1 id="articleHeader2">3、克隆table header到表格的最下面</h1>
<p>为了让table具有更好的可读性，我们可以将表格的header信息克隆一份到表格的底部，这种特效通过JQuery就很容易实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var $tfoot = $('<tfoot></tfoot>'); 
$($('thead').clone(true, true).children().get().reverse()).each(function(){
    $tfoot.append($(this));
});
$tfoot.insertAfter('table thead');
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> $tfoot = $(<span class="hljs-string">'&lt;tfoot&gt;&lt;/tfoot&gt;'</span>); 
$($(<span class="hljs-string">'thead'</span>).clone(<span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>).children().get().reverse()).each(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    $tfoot.append($(<span class="hljs-keyword">this</span>));
});
$tfoot.insertAfter(<span class="hljs-string">'table thead'</span>);
</code></pre>
<h1 id="articleHeader3">4、使用JQuery重绘图片的大小</h1>
<p>关于图片大小的重绘，你可以在服务端来实现，也可以通过JQuery在客户端实现。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(window).bind(&quot;load&quot;, function() {
     // IMAGE RESIZE
     $('#product_cat_list img').each(function() {
          var maxWidth = 120;
          var maxHeight = 120;
          var ratio = 0;
          var width = $(this).width();
          var height = $(this).height();

          if(width > maxWidth){
           ratio = maxWidth / width;
           $(this).css(&quot;width&quot;, maxWidth);
           $(this).css(&quot;height&quot;, height * ratio);
           height = height * ratio;
          }
          var width = $(this).width();
          var height = $(this).height();
          if(height > maxHeight){
           ratio = maxHeight / height;
           $(this).css(&quot;height&quot;, maxHeight);
           $(this).css(&quot;width&quot;, width * ratio);
           width = width * ratio;
          }
     });
     //$(&quot;#contentpage img&quot;).show();
     // IMAGE RESIZE
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>$(<span class="hljs-built_in">window</span>).bind(<span class="hljs-string">"load"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
     <span class="hljs-comment">// IMAGE RESIZE</span>
     $(<span class="hljs-string">'#product_cat_list img'</span>).each(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
          <span class="hljs-keyword">var</span> maxWidth = <span class="hljs-number">120</span>;
          <span class="hljs-keyword">var</span> maxHeight = <span class="hljs-number">120</span>;
          <span class="hljs-keyword">var</span> ratio = <span class="hljs-number">0</span>;
          <span class="hljs-keyword">var</span> width = $(<span class="hljs-keyword">this</span>).width();
          <span class="hljs-keyword">var</span> height = $(<span class="hljs-keyword">this</span>).height();

          <span class="hljs-keyword">if</span>(width &gt; maxWidth){
           ratio = maxWidth / width;
           $(<span class="hljs-keyword">this</span>).css(<span class="hljs-string">"width"</span>, maxWidth);
           $(<span class="hljs-keyword">this</span>).css(<span class="hljs-string">"height"</span>, height * ratio);
           height = height * ratio;
          }
          <span class="hljs-keyword">var</span> width = $(<span class="hljs-keyword">this</span>).width();
          <span class="hljs-keyword">var</span> height = $(<span class="hljs-keyword">this</span>).height();
          <span class="hljs-keyword">if</span>(height &gt; maxHeight){
           ratio = maxHeight / height;
           $(<span class="hljs-keyword">this</span>).css(<span class="hljs-string">"height"</span>, maxHeight);
           $(<span class="hljs-keyword">this</span>).css(<span class="hljs-string">"width"</span>, width * ratio);
           width = width * ratio;
          }
     });
     <span class="hljs-comment">//$("#contentpage img").show();</span>
     <span class="hljs-comment">// IMAGE RESIZE</span>
});
</code></pre>
<h1 id="articleHeader4">5、滚动时动态加载页面内容</h1>
<p>有些网站的网页内容不是一次性加载完毕的，而是在鼠标向下滚动时动态加载的，这是怎么做到的呢？看下面代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var loading = false;
$(window).scroll(function(){
 if((($(window).scrollTop()+$(window).height())+250)>=$(document).height()){
      if(loading == false){
           loading = true;
           $('#loadingbar').css(&quot;display&quot;,&quot;block&quot;);
           $.get(&quot;load.php?start=&quot;+$('#loaded_max').val(), function(loaded){
                $('body').append(loaded);
                $('#loaded_max').val(parseInt($('#loaded_max').val())+50);
                $('#loadingbar').css(&quot;display&quot;,&quot;none&quot;);
                loading = false;
           });
      }
 }
});

$(document).ready(function() {
 $('#loaded_max').val(50);
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> loading = <span class="hljs-literal">false</span>;
$(<span class="hljs-built_in">window</span>).scroll(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
 <span class="hljs-keyword">if</span>((($(<span class="hljs-built_in">window</span>).scrollTop()+$(<span class="hljs-built_in">window</span>).height())+<span class="hljs-number">250</span>)&gt;=$(<span class="hljs-built_in">document</span>).height()){
      <span class="hljs-keyword">if</span>(loading == <span class="hljs-literal">false</span>){
           loading = <span class="hljs-literal">true</span>;
           $(<span class="hljs-string">'#loadingbar'</span>).css(<span class="hljs-string">"display"</span>,<span class="hljs-string">"block"</span>);
           $.get(<span class="hljs-string">"load.php?start="</span>+$(<span class="hljs-string">'#loaded_max'</span>).val(), <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">loaded</span>)</span>{
                $(<span class="hljs-string">'body'</span>).append(loaded);
                $(<span class="hljs-string">'#loaded_max'</span>).val(<span class="hljs-built_in">parseInt</span>($(<span class="hljs-string">'#loaded_max'</span>).val())+<span class="hljs-number">50</span>);
                $(<span class="hljs-string">'#loadingbar'</span>).css(<span class="hljs-string">"display"</span>,<span class="hljs-string">"none"</span>);
                loading = <span class="hljs-literal">false</span>;
           });
      }
 }
});

$(<span class="hljs-built_in">document</span>).ready(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
 $(<span class="hljs-string">'#loaded_max'</span>).val(<span class="hljs-number">50</span>);
});
</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
几个非常实用的JQuery代码片段

## 原文链接
[https://segmentfault.com/a/1190000016895814](https://segmentfault.com/a/1190000016895814)

