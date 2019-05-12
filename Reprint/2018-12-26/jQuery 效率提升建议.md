---
title: 'jQuery 效率提升建议' 
date: 2018-12-26 2:30:14
hidden: true
slug: 40kocp3tsaf
categories: [reprint]
---

{{< raw >}}

                    
<p>jQuery简洁通用的方法集把编码者从繁重的工作中解脱出来，也拉低了进入javascript的门槛，初学者对浏览器兼容性一无所知的情况下，几行代码就可以写出超炫的特效。网上有一篇文章转载比较泛滥，已经不知道原文作者了，里面针对jQuery效率提升建议非常科学，现在重新组织里面的内容并转载。</p>
<hr>
<h2 id="articleHeader0">1.使用最新版本的jQuery</h2>
<p>jQuery的版本更新很快，你应该总是使用最新的版本。因为新版本会改进性能，还有很多新功能。 下面就来看看，不同版本的jQuery性能差异有多大。这里是三条最常见的jQuery选择语句：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('.elem')
$('.elem', context)
context.find('.elem')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code><span class="hljs-variable">$(</span><span class="hljs-string">'.elem'</span>)
<span class="hljs-variable">$(</span><span class="hljs-string">'.elem'</span>, context)
context.find(<span class="hljs-string">'.elem'</span>)</code></pre>
<p>我们用1.4.2、1.4.4、1.6.2三个版本的jQuery测试，看看浏览器在1秒内能够执行多少次。结果如下：</p>
<p><span class="img-wrap"><img data-src="/img/bVX36N?w=555&amp;h=299" src="https://static.alili.tech/img/bVX36N?w=555&amp;h=299" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>可以看到，1.6.2版本的运行次数，远远超过两个老版本。尤其是第一条语句，性能有数倍的提高。其他语句的测试，比如<code>.attr(“value”)</code>和<code>.val()</code>，也是新版本的jQuery表现好于老版本。</p>
<h2 id="articleHeader1">2.正确使用选择器</h2>
<p>在jquery中，你可以用多种选择器，选择同一个网页元素。每种选择器的性能是不一样的，你应该了解它们的性能差异。</p>
<ol>
<li>最快的选择器：id选择器和元素标签选择器<p>举例来说，下面的语句性能最佳：<br><code>$('#id')</code><br><code>$('form')</code><br><code>$('input')</code><br>遇到这些选择器的时候，jQuery内部会自动调用浏览器的原生方法（比如<code>getElementById()</code>），所以它们的执行速度快。</p>
</li>
<li>较慢的选择器：class选择器<br><code>$('.className')</code>的性能，取决于不同的浏览器。Firefox、Safari、Chrome、Opera浏览器，都有原生方法<code>getElementByClassName()</code>，所以速度并不慢。但是，IE5-IE8都没有部署这个方法，所以这个选择器在IE中会相当慢，jQuery历次更新对IE8之前的版本来说是没有用处的。</li>
<li>最慢的选择器：伪类选择器和属性选择器<p>先来看例子。找出网页中所有的隐藏元素，就要用到伪类选择器：<br><code>$(':hidden')</code></p>
<p>属性选择器的例子则是：<br><code>$('[attribute=value]')</code></p>
<p>这两种语句是最慢的，因为浏览器没有针对它们的原生方法。但是，一些浏览器的新版本，增加了<code>querySelector()</code>和<code>querySelectorAll()</code>方法，因此会使这类选择器的性能有大幅提高。  </p>
<p>最后是不同选择器的性能比较图。  </p>
<p><span class="img-wrap"><img data-src="/img/bVX366?w=461&amp;h=258" src="https://static.alili.tech/img/bVX366?w=461&amp;h=258" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>可以看到，ID选择器遥遥领先，然后是标签选择器，第三是Class选择器，其他选择器都非常慢。</p>
</li>
</ol>
<h2 id="articleHeader2">3.理解子元素和父元素的关系</h2>
<p>下面六个选择器，都是从父元素中选择子元素。你知道哪个速度最快，哪个速度最慢吗？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('.child', $parent)
$parent.find('.child')
$parent.children('.child')
$('#parent > .child')
$('#parent .child')
$('.child', $('#parent'))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code><span class="hljs-variable">$(</span><span class="hljs-string">'.child'</span>, <span class="hljs-variable">$parent</span>)
<span class="hljs-variable">$parent</span>.find(<span class="hljs-string">'.child'</span>)
<span class="hljs-variable">$parent</span>.children(<span class="hljs-string">'.child'</span>)
<span class="hljs-variable">$(</span><span class="hljs-string">'#parent &gt; .child'</span>)
<span class="hljs-variable">$(</span><span class="hljs-string">'#parent .child'</span>)
<span class="hljs-variable">$(</span><span class="hljs-string">'.child'</span>, <span class="hljs-variable">$(</span><span class="hljs-string">'#parent'</span>))</code></pre>
<p>我们一句句来看。</p>
<ol>
<li>
<code>$('.child', $parent)</code><br>这条语句的意思是，给定一个DOM对象，然后从中选择一个子元素。jQuery会自动把这条语句转成<code>$.parent.find('child')</code>，这会导致一定的性能损失。它比最快的形式慢了5%-10%。</li>
<li>
<code>$parent.find('.child')</code><br>这条是最快的语句。<code>.find()</code>方法会调用浏览器的原生方法（<code>getElementById</code>，<code>getElementByName</code>，<code>getElementByTagName</code>等等），所以速度较快。</li>
<li>
<code>$parent.children('.child')</code><br>这条语句在jQuery内部，会使用<code>$.sibling()</code>和javascript的<code>nextSibling()</code>方法，一个个遍历节点。它比最快的形式大约慢50%。</li>
<li>
<code>$('#parent &gt; .child')</code><br>jQuery内部使用Sizzle引擎，处理各种选择器。Sizzle引擎的选择顺序是从右到左，所以这条语句是先选<code>.child</code>，然后再一个个过滤出父元素<code>#parent</code>，这导致它比最快的形式大约慢70%。</li>
<li>
<code>$('#parent .child')</code><br>这条语句与上一条是同样的情况。但是，上一条只选择直接的子元素，这一条可以于选择多级子元素，所以它的速度更慢，大概比最快的形式慢了77%。</li>
<li>
<code>$('.child', $('#parent'))</code><br>jQuery内部会将这条语句转成<code>$('#parent').find('.child')</code>，比最快的形式慢了23%。所以，最佳选择是<code>$parent.find('.child')</code>。而且，由于<code>$parent</code>往往在前面的操作已经生成，jQuery会进行缓存，所以进一步加快了执行速度。</li>
</ol>
<h2 id="articleHeader3">4.不要过度使用jQuery</h2>
<p>jQuery速度再快，也无法与原生的javascript方法相比。所以有原生方法可以使用的场合，尽量避免使用jQuery。<br>请看下面的例子，为a元素绑定一个处理点击事件的函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('a').click(function(){
    alert($(this).attr('id'));
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>$(<span class="hljs-string">'a'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    alert($(<span class="hljs-keyword">this</span>).attr(<span class="hljs-string">'id'</span>));
});</code></pre>
<p>这段代码的意思是，点击a元素后，弹出该元素的id属性。为了获取这个属性，必须连续两次调用jQuery，第一次是<code>$(this)</code>，第二次是<code>attr('id')</code>。<br>事实上，这种处理完全不必要。更正确的写法是，直接采用javascript原生方法调用<code>this.id</code>，根据测试，<code>this.id</code>的速度比<code>$(this).attr('id')</code>快了20多倍。</p>
<h2 id="articleHeader4">5.做好缓存</h2>
<p>选中某一个网页元素，是开销很大的步骤。所以，使用选择器的次数应该越少越好，并且尽可能缓存选中的结果，便于以后反复使用。 比如，下面这样的写法就是糟糕的写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="jQuery('#top').find('p.classA');
jQuery('#top').find('p.classB');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">jQuery</span>(<span class="hljs-string">'#top'</span>)<span class="hljs-selector-class">.find</span>(<span class="hljs-string">'p.classA'</span>);
<span class="hljs-selector-tag">jQuery</span>(<span class="hljs-string">'#top'</span>)<span class="hljs-selector-class">.find</span>(<span class="hljs-string">'p.classB'</span>);</code></pre>
<p>更好的写法是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var cached = jQuery('#top');
cached.find('p.classA');
cached.find('p.classB');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>var cached = jQuery(<span class="hljs-string">'#top'</span>);
cached.<span class="hljs-built_in">find</span>(<span class="hljs-string">'p.classA'</span>);
cached.<span class="hljs-built_in">find</span>(<span class="hljs-string">'p.classB'</span>);</code></pre>
<p>根据测试，缓存比不缓存，快了2-3倍。</p>
<h2 id="articleHeader5">6.使用链式写法</h2>
<p>jQuery的一大特点，就是允许使用链式写法。</p>
<p><code>$('div').find('h3').eq(2).html('Hello');</code><br>采用链式写法时，jQuery自动缓存每一步的结果，因此比非链式写法要快。根据测试，链式写法比（不使用缓存的）非链式写法，大约快了25%。</p>
<h2 id="articleHeader6">7.事件的委托处理（EventDelegation）</h2>
<p>javascript的事件模型，采用”冒泡”模式，也就是说，子元素的事件会逐级向上”冒泡”，成为父元素的事件。<br>利用这一点，可以大大简化事件的绑定。比如，有一个表格（table元素），里面有100个格子（td元素），现在要求在每个格子上面绑定一个点击事件（click），请问是否需要将下面的命令执行100次？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(&quot;td&quot;).bind(&quot;click&quot;, function(){
    $(this).toggleClass(&quot;click&quot;);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>$(<span class="hljs-string">"td"</span>).bind(<span class="hljs-string">"click"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    $(<span class="hljs-keyword">this</span>).toggleClass(<span class="hljs-string">"click"</span>);
});</code></pre>
<p>回答是不需要，我们只要把这个事件绑定在table元素上面就可以了，因为td元素发生点击事件之后，这个事件会”冒泡”到父元素table上面，从而被监听到。<br>因此，这个事件只需要在父元素绑定1次即可，而不需要在子元素上绑定100次，从而大大提高性能。这就叫事件的”委托处理”，也就是子元素”委托”父元素处理这个事件。<br>具体的写法有两种。第一种是采用<code>.delegate()</code>方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(&quot;table&quot;).delegate(&quot;td&quot;,&quot;click&quot;, function(){
    $(this).toggleClass(&quot;click&quot;);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>$(<span class="hljs-string">"table"</span>).delegate(<span class="hljs-string">"td"</span>,<span class="hljs-string">"click"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    $(<span class="hljs-keyword">this</span>).toggleClass(<span class="hljs-string">"click"</span>);
});</code></pre>
<p>第二种是采用<code>.live()</code>方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(&quot;table&quot;).each(function(){
    $(&quot;td&quot;, this).live(&quot;click&quot;,function(){
        $(this).toggleClass(&quot;click&quot;);
    });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>$(<span class="hljs-string">"table"</span>).each(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    $(<span class="hljs-string">"td"</span>, <span class="hljs-keyword">this</span>).live(<span class="hljs-string">"click"</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        $(<span class="hljs-keyword">this</span>).toggleClass(<span class="hljs-string">"click"</span>);
    });
});</code></pre>
<p>这两种写法基本等价。唯一的区别在于，<code>.delegate()</code>是当事件冒泡到指定的父元素时触发，<code>.live()</code>则是当事件冒泡到文档的根元素后触发，因此<code>.delegate()</code>比<code>.live()</code>稍快一点。此外，这两种方法相比传统的<code>.bind()</code>方法还有一个好处，那就是对动态插入的元素也有效，.bind()只对已经存在的DOM元素有效，对动态插入的元素无效。<br>根据测试，委托处理比不委托处理，快了几十倍。在委托处理的情况下，<code>.delegate()</code>又比<code>.live()</code>大约快26%。</p>
<h2 id="articleHeader7">8.少改动DOM结构</h2>
<ol>
<li>改动DOM结构开销很大，因此不要频繁使用<code>.append()</code>、<code>.insertBefore()</code>和<code>.insetAfter()</code>这样的方法。<br>如果要插入多个元素，就先把它们合并，然后再一次性插入。根据测试，合并插入比不合并插入，快了将近10倍。</li>
<li>如果你要对一个DOM元素进行大量处理，应该先用<code>.detach()</code>方法，把这个元素从DOM中取出来，处理完毕以后，再重新插回文档。根据测试，使用<code>.detach()</code>方法比不使用时，快了60%。</li>
<li>
<p>如果你要在DOM元素上储存数据，不要写成下面这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var elem = $('#elem');
elem.data(key,value);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code><span class="hljs-built_in">var</span> <span class="hljs-built_in">elem</span> = $('#<span class="hljs-built_in">elem</span>');
<span class="hljs-built_in">elem</span>.data(<span class="hljs-built_in">key</span>,value);</code></pre>
<p>而要写成</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var elem = $('#elem');
$.data(elem,key,value);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code><span class="hljs-built_in">var</span> <span class="hljs-built_in">elem</span> = $('#<span class="hljs-built_in">elem</span>');
$.data(<span class="hljs-built_in">elem</span>,<span class="hljs-built_in">key</span>,value);</code></pre>
<p>根据测试， 后一种写法要比前一种写法，快了将近10倍。因为<code>elem.data()</code>方法是定义在jQuery函数的prototype对象上面的， 而<code>$.data()</code>方法是定义jQuery函数上面的，调用的时候不从复杂的jQuery对象上调用，所以速度快得多。（此处可以参阅下面第10点。）</p>
</li>
</ol>
<h2 id="articleHeader8">9.正确处理循环</h2>
<p>循环总是一种比较耗时的操作，如果可以使用复杂的选择器直接选中元素，就不要使用循环，去一个个辨认元素。<br>javascript原生循环方法for和while，要比jQuery的<code>.each()</code>方法快，应该优先使用原生方法。</p>
<h2 id="articleHeader9">10.尽量少生成jQuery对象</h2>
<p>每当你使用一次选择器（比如<code>$('#id')</code>），就会生成一个jQuery对象。jQuery对象是一个很庞大的对象，带有很多属性和方法，会占用不少资源。所以，尽量少生成jQuery对象。<br>举例来说，许多jQuery方法都有两个版本，一个是供jQuery对象使用的版本，另一个是供jQuery函数使用的版本。下面两个例子，都是取出一个元素的文本，使用的都是<code>text()</code>方法。你既可以使用针对jQuery对象的版本：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var $text = $(&quot;#text&quot;);
var $ts = $text.text();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-built_in">var</span> $text = $(<span class="hljs-string">"#text"</span>);
<span class="hljs-built_in">var</span> $ts = $text.text();</code></pre>
<p>也可以使用针对jQuery函数的版本：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var $text = $(&quot;#text&quot;);
var $ts = $.text($text);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mel"><code>var $text = $(<span class="hljs-string">"#text"</span>);
var $ts = $.<span class="hljs-keyword">text</span>($text);</code></pre>
<p>由于后一种针对jquery函数的版本不通过jQuery对象操作，所以相对开销较小，速度比较快。</p>
<h2 id="articleHeader10">11.小结</h2>
<p>jQuery对象方法和自身函数运行速度我进行了一下对比，分别测试了文章中提到的text和data，text测试结果不是很明显，<code>$.text</code>比对象方法text略占上风。对象data由于会对dom变更，速度会远慢于jQuery函数data。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
jQuery 效率提升建议

## 原文链接
[https://segmentfault.com/a/1190000011893165](https://segmentfault.com/a/1190000011893165)

