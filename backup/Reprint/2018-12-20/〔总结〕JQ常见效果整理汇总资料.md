---
title: '〔总结〕JQ常见效果整理汇总资料' 
date: 2018-12-20 2:30:10
hidden: true
slug: rk1olunsqm9
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">1.滚动条插件-jQuery custom content scroller（美化）</h2>
<p>jQuery滚动条插件jQuery custom content scroller支持横向滚动纵向滚动以及多种滚动显示效果。使用这个插件你可以轻松的给你的层追加很好看的滚动条。<br>如图，当然可以根据自己的需要修改其颜色，滚动条的宽度<br><span class="img-wrap"><img data-src="http://segmentfault.com/img/bVbXcJ" src="https://static.alili.techhttp://segmentfault.com/img/bVbXcJ" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<p><strong>使用步骤</strong></p>
<p><strong>1.引用jQuery类库极其相关的插件js和css库</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<link href=&quot;jquery.mCustomScrollbar.css&quot; rel=&quot;stylesheet&quot; type=&quot;text/css&quot;>
<script src=&quot;http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js&quot;></script>
<script src=&quot;jquery.mCustomScrollbar.concat.min.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"jquery.mCustomScrollbar.css"</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"jquery.mCustomScrollbar.concat.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>2.给元素追加自定义滚动条方法:</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>
    (function($){
        $(window).load(function(){
            $(&quot;.content&quot;).mCustomScrollbar();
        });
    })(jQuery);
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">$</span>)</span>{
        $(<span class="hljs-built_in">window</span>).load(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            $(<span class="hljs-string">".content"</span>).mCustomScrollbar();
        });
    })(jQuery);
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>3.如果需要横向滑动你可以这么设置</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(&quot;.content&quot;).mCustomScrollbar({
    horizontalScroll:true
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code><span class="hljs-variable">$(</span><span class="hljs-string">".content"</span>).mCustomScrollbar({
    <span class="hljs-symbol">horizontalScroll:</span><span class="hljs-keyword">true</span>
});</code></pre>
<p>转载地址：<a href="http://www.jq22.com/jquery-info124" rel="nofollow noreferrer" target="_blank">http://www.jq22.com/jquery-info124</a><br>效果地址：<a href="http://www.jq22.com/jquery-info124" rel="nofollow noreferrer" target="_blank">http://www.jq22.com/cj/customer/index.html</a></p>
<h2 id="articleHeader1">2.jQuery timelinr和animate.css创建超酷的CSS动画时间轴特效</h2>
<p>其中不错的插件：<br><a href="http://www.gbin1.com/technology/javascript/20120331jslibtimeline/" rel="nofollow noreferrer" target="_blank">Timeline</a><br><a href="http://www.gbin1.com/technology/jquery/20111009timelineplugin/" rel="nofollow noreferrer" target="_blank">Timelinr</a><br><a href="http://www.gbin1.com/technology/jquerynews/20111206jqueryplugintimeglider/" rel="nofollow noreferrer" target="_blank">TimergliderJS</a><br><a href="http://www.gbin1.com/bloghome.html?tag=javascript%E6%97%B6%E9%97%B4%E8%BD%B4" rel="nofollow noreferrer" target="_blank">Chronoline</a></p>
<p>使用以上jQuery插件或者类库都可以创建漂亮的时间轴timline特效。</p>
<p><code>Timelinr</code>是一个时间轴的jQuery插件实现，你可以方便的使用它来生成一个动态的时间轴特效，提供了垂直和水平显示方式，并且支持自动播放。</p>
<p>Timelinr插件介绍：</p>
<p>引入jQuery类库和插件类库，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;js/jquery-1.6.1.min.js&quot; type=&quot;text/javascript&quot;></script>
<script src=&quot;js/jquery.timelinr-0.9.js&quot; type=&quot;text/javascript&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/jquery-1.6.1.min.js"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/jquery.timelinr-0.9.js"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>初始化缺省参数，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/javascript&quot;>
   $(function(){
      $().timelinr();
   });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
   $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      $().timelinr();
   });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>或者定制参数内容，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/javascript&quot;> 
   $(function(){
      $().timelinr({
         orientation: 'horizontal',
         // value: horizontal | vertical, default to horizontal
         containerDiv: '#timeline',
         // value: any HTML tag or #id, default to #timeline
         datesDiv: '#dates',
         // value: any HTML tag or #id, default to #dates
         datesSelectedClass: 'selected',
         // value: any class, default to selected
         datesSpeed: 500,
         // value: integer between 100 and 1000 (recommended), default to 500 (normal)
         issuesDiv : '#issues',
         // value: any HTML tag or #id, default to #issues
         issuesSelectedClass: 'selected',
         // value: any class, default to selected
         issuesSpeed: 200,
         // value: integer between 100 and 1000 (recommended), default to 200 (fast)
         issuesTransparency: 0.2,
         // value: integer between 0 and 1 (recommended), default to 0.2
         issuesTransparencySpeed: 500,
         // value: integer between 100 and 1000 (recommended), default to 500 (normal)
         prevButton: '#prev',
         // value: any HTML tag or #id, default to #prev
         nextButton: '#next',
         // value: any HTML tag or #id, default to #next
         arrowKeys: 'false',
         // value: true/false, default to false
         startAt: 1,
         // value: integer, default to 1 (first)
         autoPlay: 'false',
         // value: true | false, default to false
         autoPlayDirection: 'forward',
         // value: forward | backward, default to forward
         autoPlayPause: 2000
         // value: integer (1000 = 1 seg), default to 2000 (2segs)
      });
   });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code>&lt;script type=<span class="hljs-string">"text/javascript"</span>&gt; 
   $(function(){
      $().timelinr({
         orientation: <span class="hljs-string">'horizontal'</span>,
         // value: horizontal | vertical, <span class="hljs-keyword">default</span> <span class="hljs-keyword">to</span> horizontal
         containerDiv: <span class="hljs-string">'#timeline'</span>,
         // value: any HTML tag <span class="hljs-literal">or</span> <span class="hljs-meta">#id, default to #timeline</span>
         datesDiv: <span class="hljs-string">'#dates'</span>,
         // value: any HTML tag <span class="hljs-literal">or</span> <span class="hljs-meta">#id, default to #dates</span>
         datesSelectedClass: <span class="hljs-string">'selected'</span>,
         // value: any class, <span class="hljs-keyword">default</span> <span class="hljs-keyword">to</span> selected
         datesSpeed: <span class="hljs-number">500</span>,
         // value: integer between <span class="hljs-number">100</span> <span class="hljs-literal">and</span> <span class="hljs-number">1000</span> (recommended), <span class="hljs-keyword">default</span> <span class="hljs-keyword">to</span> <span class="hljs-number">500</span> (normal)
         issuesDiv : <span class="hljs-string">'#issues'</span>,
         // value: any HTML tag <span class="hljs-literal">or</span> <span class="hljs-meta">#id, default to #issues</span>
         issuesSelectedClass: <span class="hljs-string">'selected'</span>,
         // value: any class, <span class="hljs-keyword">default</span> <span class="hljs-keyword">to</span> selected
         issuesSpeed: <span class="hljs-number">200</span>,
         // value: integer between <span class="hljs-number">100</span> <span class="hljs-literal">and</span> <span class="hljs-number">1000</span> (recommended), <span class="hljs-keyword">default</span> <span class="hljs-keyword">to</span> <span class="hljs-number">200</span> (fast)
         issuesTransparency: <span class="hljs-number">0.2</span>,
         // value: integer between <span class="hljs-number">0</span> <span class="hljs-literal">and</span> <span class="hljs-number">1</span> (recommended), <span class="hljs-keyword">default</span> <span class="hljs-keyword">to</span> <span class="hljs-number">0.2</span>
         issuesTransparencySpeed: <span class="hljs-number">500</span>,
         // value: integer between <span class="hljs-number">100</span> <span class="hljs-literal">and</span> <span class="hljs-number">1000</span> (recommended), <span class="hljs-keyword">default</span> <span class="hljs-keyword">to</span> <span class="hljs-number">500</span> (normal)
         prevButton: <span class="hljs-string">'#prev'</span>,
         // value: any HTML tag <span class="hljs-literal">or</span> <span class="hljs-meta">#id, default to #prev</span>
         nextButton: <span class="hljs-string">'#next'</span>,
         // value: any HTML tag <span class="hljs-literal">or</span> <span class="hljs-meta">#id, default to #next</span>
         arrowKeys: <span class="hljs-string">'false'</span>,
         // value: <span class="hljs-literal">true</span>/<span class="hljs-literal">false</span>, <span class="hljs-keyword">default</span> <span class="hljs-keyword">to</span> <span class="hljs-literal">false</span>
         startAt: <span class="hljs-number">1</span>,
         // value: integer, <span class="hljs-keyword">default</span> <span class="hljs-keyword">to</span> <span class="hljs-number">1</span> (first)
         autoPlay: <span class="hljs-string">'false'</span>,
         // value: <span class="hljs-literal">true</span> | <span class="hljs-literal">false</span>, <span class="hljs-keyword">default</span> <span class="hljs-keyword">to</span> <span class="hljs-literal">false</span>
         autoPlayDirection: <span class="hljs-string">'forward'</span>,
         // value: forward | backward, <span class="hljs-keyword">default</span> <span class="hljs-keyword">to</span> forward
         autoPlayPause: <span class="hljs-number">2000</span>
         // value: integer (<span class="hljs-number">1000</span> = <span class="hljs-number">1</span> seg), <span class="hljs-keyword">default</span> <span class="hljs-keyword">to</span> <span class="hljs-number">2000</span> (<span class="hljs-number">2</span>segs)
      })<span class="hljs-comment">;</span>
   })<span class="hljs-comment">;</span>
&lt;/script&gt;</code></pre>
<p>HTML代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <div id=&quot;timeline&quot;>
   <ul id=&quot;dates&quot;>
      <li><a href=&quot;#&quot;>date1</a></li>
      <li><a href=&quot;#&quot;>date2</a></li>
   </ul>
   <ul id=&quot;issues&quot;>
      <li id=&quot;date1&quot;>
         <p>Lorem ipsum.</p>
      </li>
      <li id=&quot;date2&quot;>
         <p>Lorem ipsum.</p>
      </li>
   </ul>
   <a href=&quot;#&quot; id=&quot;next&quot;>+</a> <!-- optional -->
   <a href=&quot;#&quot; id=&quot;prev&quot;>-</a> <!-- optional -->
</div>  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code> <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"timeline"</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"dates"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span>date1<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span>date2<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
   <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"issues"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"date1"</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Lorem ipsum.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"date2"</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Lorem ipsum.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
   <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"next"</span>&gt;</span>+<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span> <span class="hljs-comment">&lt;!-- optional --&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"prev"</span>&gt;</span>-<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span> <span class="hljs-comment">&lt;!-- optional --&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>  </code></pre>
<h2 id="articleHeader2">3.HoverDir-Jquery方向意识悬停特效</h2>
<p><strong>html结构：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul id=&quot;da-thumbs&quot; class=&quot;da-thumbs&quot;>
    <li>
        <a href=&quot;#&quot;>
            <img src=&quot;images/list.jpg&quot; />
            <div><span>简介</span></div>
        </a>
    </li>
    <li>
        <!-- ... -->
    </li>
    <!-- ... -->
</ul>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;ul id=<span class="hljs-string">"da-thumbs"</span> <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"da-thumbs"</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"images/list.jpg"</span> /&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>简介<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- ... --&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- ... --&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span></code></pre>
<p><strong>代码构成，CSS部分</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" .da-thumbs li {
    float: left;
    margin: 5px;
    background: #fff;
    padding: 8px;
    position: relative;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
.da-thumbs li a,
.da-thumbs li a img {
    display: block;
    position: relative;
}
.da-thumbs li a {
    overflow: hidden;
}
.da-thumbs li a div {
    position: absolute;
    background: rgba(75,75,75,0.7);
    width: 100%;
    height: 100%;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code> <span class="hljs-selector-class">.da-thumbs</span> <span class="hljs-selector-tag">li</span> {
    <span class="hljs-attribute">float</span>: left;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">5px</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#fff</span>;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">8px</span>;
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">1px</span> <span class="hljs-number">3px</span> <span class="hljs-built_in">rgba</span>(0,0,0,0.1);
}
<span class="hljs-selector-class">.da-thumbs</span> <span class="hljs-selector-tag">li</span> <span class="hljs-selector-tag">a</span>,
<span class="hljs-selector-class">.da-thumbs</span> <span class="hljs-selector-tag">li</span> <span class="hljs-selector-tag">a</span> <span class="hljs-selector-tag">img</span> {
    <span class="hljs-attribute">display</span>: block;
    <span class="hljs-attribute">position</span>: relative;
}
<span class="hljs-selector-class">.da-thumbs</span> <span class="hljs-selector-tag">li</span> <span class="hljs-selector-tag">a</span> {
    <span class="hljs-attribute">overflow</span>: hidden;
}
<span class="hljs-selector-class">.da-thumbs</span> <span class="hljs-selector-tag">li</span> <span class="hljs-selector-tag">a</span> <span class="hljs-selector-tag">div</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">rgba</span>(75,75,75,0.7);
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
}</code></pre>
<p><strong>CSS动画关键部分，采用css3的动画效果，以及添加方向的class</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".da-thumbs li a div.da-animate {
    -webkit-transition: all 0.3s ease;
    -moz-transition: all 0.3s ease-in-out;
    -o-transition: all 0.3s ease-in-out;
    -ms-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
}
/* 动画开始阶段的class */
.da-slideFromTop {
    left: 0px;
    top: -100%;
}
.da-slideFromBottom {
    left: 0px;
    top: 100%;
}
.da-slideFromLeft {
    top: 0px; 
    left: -100%;
}
.da-slideFromRight {
    top: 0px;
    left: 100%;
}
/* 动画结果阶段的class: */
.da-slideTop {
    top: 0px;
}
.da-slideLeft {
    left: 0px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.da-thumbs</span> <span class="hljs-selector-tag">li</span> <span class="hljs-selector-tag">a</span> <span class="hljs-selector-tag">div</span><span class="hljs-selector-class">.da-animate</span> {
    <span class="hljs-attribute">-webkit-transition</span>: all <span class="hljs-number">0.3s</span> ease;
    <span class="hljs-attribute">-moz-transition</span>: all <span class="hljs-number">0.3s</span> ease-in-out;
    <span class="hljs-attribute">-o-transition</span>: all <span class="hljs-number">0.3s</span> ease-in-out;
    <span class="hljs-attribute">-ms-transition</span>: all <span class="hljs-number">0.3s</span> ease-in-out;
    <span class="hljs-attribute">transition</span>: all <span class="hljs-number">0.3s</span> ease-in-out;
}
<span class="hljs-comment">/* 动画开始阶段的class */</span>
<span class="hljs-selector-class">.da-slideFromTop</span> {
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0px</span>;
    <span class="hljs-attribute">top</span>: -<span class="hljs-number">100%</span>;
}
<span class="hljs-selector-class">.da-slideFromBottom</span> {
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0px</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">100%</span>;
}
<span class="hljs-selector-class">.da-slideFromLeft</span> {
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0px</span>; 
    <span class="hljs-attribute">left</span>: -<span class="hljs-number">100%</span>;
}
<span class="hljs-selector-class">.da-slideFromRight</span> {
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0px</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">100%</span>;
}
<span class="hljs-comment">/* 动画结果阶段的class: */</span>
<span class="hljs-selector-class">.da-slideTop</span> {
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0px</span>;
}
<span class="hljs-selector-class">.da-slideLeft</span> {
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0px</span>;
}</code></pre>
<p><strong>动画的js脚本部分</strong></p>
<p>脚本部分，就是引入jquery文件，引入该插件。然后调用该插件即可。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(function() {
    $('#da-thumbs > li').hoverdir();
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>$(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    $(<span class="hljs-string">'#da-thumbs &gt; li'</span>).hoverdir();
});</code></pre>
<p>该插件支持动画效果，延迟动画效果，和反向</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('#da-thumbs > li').hoverdir( {
    hoverDelay : 50,
    reverse : true
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>$(<span class="hljs-string">'#da-thumbs &gt; li'</span>).hoverdir( {
    <span class="hljs-string">hoverDelay :</span> <span class="hljs-number">50</span>,
    <span class="hljs-string">reverse :</span> <span class="hljs-literal">true</span>
});</code></pre>
<blockquote>注：<code>hoverDelay</code>是延迟加载时间，越大时间越长。reverse是是否反向，true表示反向，默认false。插件名jquery.hoverdir.js</blockquote>
<p>插件下载地址：<a href="https://pan.baidu.com/s/1pLaEo59" rel="nofollow noreferrer" target="_blank">https://pan.baidu.com/s/1pLaEo59</a> 密码：<code>rore</code></p>
<h2 id="articleHeader3">4.点击radio，当选中‘其它’时，显示后面输入框；否则隐藏</h2>
<p><strong>html代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
    <input type=&quot;radio&quot; name=&quot;rd&quot; class=&quot;same&quot; value='选项二' >选项一
    <input type=&quot;radio&quot; name=&quot;rd&quot; class=&quot;same&quot; value='选项二'>选项二
    <input type=&quot;radio&quot; name=&quot;rd&quot; class=&quot;same others&quot; value='其它'>其它
    <input type=&quot;text&quot; name=&quot;txt&quot; class=&quot;txt&quot; value=&quot;&quot;/> 
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>&lt;div&gt;
    &lt;input <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"radio"</span> name=<span class="hljs-string">"rd"</span> <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"same"</span> value='选项二' &gt;选项一
    &lt;input <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"radio"</span> name=<span class="hljs-string">"rd"</span> <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"same"</span> value='选项二'&gt;选项二
    &lt;input <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"radio"</span> name=<span class="hljs-string">"rd"</span> <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"same others"</span> value='其它'&gt;其它
    &lt;input <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"text"</span> name=<span class="hljs-string">"txt"</span> <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"txt"</span> value=<span class="hljs-string">""</span>/&gt; 
&lt;/div&gt;</code></pre>
<p><strong>jquery代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(function(){
    $(&quot;.same&quot;).click(function(){
       $(this).siblings().attr(&quot;checked&quot;,false);
       $(this).attr(&quot;checked&quot;,true);  
        if($(this).attr(&quot;class&quot;).indexOf('others')>=0){  
            $(this).siblings('.txt').show();
        }
        else{
            $(&quot;.others&quot;).siblings('.txt').hide();
        }
    });
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>$(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    $(<span class="hljs-string">".same"</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
       $(<span class="hljs-keyword">this</span>).siblings().attr(<span class="hljs-string">"checked"</span>,<span class="hljs-literal">false</span>);
       $(<span class="hljs-keyword">this</span>).attr(<span class="hljs-string">"checked"</span>,<span class="hljs-literal">true</span>);  
        <span class="hljs-keyword">if</span>($(<span class="hljs-keyword">this</span>).attr(<span class="hljs-string">"class"</span>).indexOf(<span class="hljs-string">'others'</span>)&gt;=<span class="hljs-number">0</span>){  
            $(<span class="hljs-keyword">this</span>).siblings(<span class="hljs-string">'.txt'</span>).show();
        }
        <span class="hljs-keyword">else</span>{
            $(<span class="hljs-string">".others"</span>).siblings(<span class="hljs-string">'.txt'</span>).hide();
        }
    });
})</code></pre>
<blockquote>注释： if语句也可以使用if($(this).hasClass("others"))进行判断</blockquote>
<p>实现效果如下：<br><span class="img-wrap"><img data-src="/img/bVkf3y" src="https://static.alili.tech/img/bVkf3y" alt="image" title="image" style="cursor: pointer;"></span></p>
<p>看了网友的回复，确实css解决是最简单的，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".others ~ input[type='text'] {
    display:none;
}
.others:checked ~ input[type='text'] {
    display:inline;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.others</span> ~ <span class="hljs-selector-tag">input</span><span class="hljs-selector-attr">[type='text']</span> {
    <span class="hljs-attribute">display</span>:none;
}
<span class="hljs-selector-class">.others</span><span class="hljs-selector-pseudo">:checked</span> ~ <span class="hljs-selector-tag">input</span><span class="hljs-selector-attr">[type='text']</span> {
    <span class="hljs-attribute">display</span>:inline;
}</code></pre>
<blockquote>注：但是但是IE9以下低版本不支持。</blockquote>
<h2 id="articleHeader4">5.jquery.mousewheel实现整屏翻屏效果</h2>
<p>实现整屏上下翻效果：<br>需加载的js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/javascript&quot; src=&quot;js/jquery-1.8.3.min.js&quot;></script>
<script type=&quot;text/javascript&quot; src=&quot;js/jquery.mousewheel.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/jquery-1.8.3.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/jquery.mousewheel.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>css样式如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body{padding:0;margin:0; overflow:hidden }
ul{list-style:none;}
.content{width:100%;height100%;position:relative;top:0;}
.div_01,.div_02,.div_03,.div_04{width:100%;margin:0 auto; text-align: center;}
.div_01{background: #b20909;}
.div_02{background: #0941b2;}
.div_03{background: #2db209;}
.div_04{background: #b29c09;}
.left_fixed{position:fixed;width:15px; height:100px; left:100px;top:200px;z-index:999;}
.left_fixed ul li{
    background:#000;cursor:pointer;width:15px;height: 15px;
    border-radius:15px;margin-bottom: 10px;
}
.left_fixed ul li.active{background:#fff;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-selector-tag">body</span>{<span class="hljs-attribute">padding</span>:<span class="hljs-number">0</span>;<span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span>; <span class="hljs-attribute">overflow</span>:hidden }
ul{list-style:none;}
<span class="hljs-selector-class">.content</span>{<span class="hljs-attribute">width</span>:<span class="hljs-number">100%</span>;height100%;<span class="hljs-attribute">position</span>:relative;<span class="hljs-attribute">top</span>:<span class="hljs-number">0</span>;}
<span class="hljs-selector-class">.div_01</span>,<span class="hljs-selector-class">.div_02</span>,<span class="hljs-selector-class">.div_03</span>,<span class="hljs-selector-class">.div_04</span>{<span class="hljs-attribute">width</span>:<span class="hljs-number">100%</span>;<span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span> auto; <span class="hljs-attribute">text-align</span>: center;}
<span class="hljs-selector-class">.div_01</span>{<span class="hljs-attribute">background</span>: <span class="hljs-number">#b20909</span>;}
<span class="hljs-selector-class">.div_02</span>{<span class="hljs-attribute">background</span>: <span class="hljs-number">#0941b2</span>;}
<span class="hljs-selector-class">.div_03</span>{<span class="hljs-attribute">background</span>: <span class="hljs-number">#2db209</span>;}
<span class="hljs-selector-class">.div_04</span>{<span class="hljs-attribute">background</span>: <span class="hljs-number">#b29c09</span>;}
<span class="hljs-selector-class">.left_fixed</span>{<span class="hljs-attribute">position</span>:fixed;<span class="hljs-attribute">width</span>:<span class="hljs-number">15px</span>; <span class="hljs-attribute">height</span>:<span class="hljs-number">100px</span>; <span class="hljs-attribute">left</span>:<span class="hljs-number">100px</span>;<span class="hljs-attribute">top</span>:<span class="hljs-number">200px</span>;<span class="hljs-attribute">z-index</span>:<span class="hljs-number">999</span>;}
<span class="hljs-selector-class">.left_fixed</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span>{
    <span class="hljs-attribute">background</span>:<span class="hljs-number">#000</span>;<span class="hljs-attribute">cursor</span>:pointer;<span class="hljs-attribute">width</span>:<span class="hljs-number">15px</span>;<span class="hljs-attribute">height</span>: <span class="hljs-number">15px</span>;
    <span class="hljs-attribute">border-radius</span>:<span class="hljs-number">15px</span>;<span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">10px</span>;
}
<span class="hljs-selector-class">.left_fixed</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-class">.active</span>{<span class="hljs-attribute">background</span>:<span class="hljs-number">#fff</span>;}</code></pre>
<p>jquery代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var page=0;//翻屏变量，初始第一屏
var shakStaute = 0; //该变量作用是鼠标滑轮一直向下或者向上滑动时出现抖动现象
$(function(){
    var starttime = 0,
        endtime = 0;
    $(&quot;body&quot;).mousewheel(function(event, delta) {
        starttime = new Date().getTime(); //记录翻屏的初始时间

        if (delta < 0&amp;&amp; page>=0 &amp;&amp; page<=$(&quot;.content .divsame&quot;).length-2) { 
        
            if (shakStaute>=0 &amp;&amp;(starttime == 0 || (endtime - starttime) <= -500)) { //在500ms内执行一次翻屏
                shakStaute=1;
                page++;
                renderPage(page,true);  //翻屏函数
                endtime = new Date().getTime(); //记录翻屏的结束时间
                
            }
        } else if (delta>0 &amp;&amp; page>=1 &amp;&amp; shakStaute==1 &amp;&amp; (starttime == 0 || (endtime - starttime) <= -500)) {  
            page--;
            renderPage(page,true);
            endtime = new Date().getTime();                     
        }   

    });
    
    var div_height=$(window).height(); 

    $(&quot;.divsame&quot;).css({'height':div_height});

    $(window).resize(function(){
        
        div_height=$(window).height();

        $(&quot;.divsame&quot;).css({'height':div_height});
        $('.content').animate({top:-page*div_height }, 100);
    });
    
    
    $(&quot;.left_fixed ul li&quot;).on(&quot;click&quot;, function(){ //点击小导航也执行翻屏
        var index = $(this).index();
        if(index>0){
            shakStaute==1;
        }
        page = index;
        renderPage(page, true);
        $(&quot;.left_fixed ul li&quot;).removeClass(&quot;active&quot;);
        $(this).addClass(&quot;active&quot;);
        return false;
    });
    
    function renderPage(pageNumber, isScroll){ 
        if (isScroll){
            $('.content').animate({top:-pageNumber*div_height }, 'slow');
            $(&quot;.left_fixed ul li&quot;).removeClass(&quot;active&quot;);
            $(&quot;.left_fixed ul li&quot;).eq(pageNumber).addClass(&quot;active&quot;);
        }     
        return;
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> page=<span class="hljs-number">0</span>;<span class="hljs-comment">//翻屏变量，初始第一屏</span>
<span class="hljs-keyword">var</span> shakStaute = <span class="hljs-number">0</span>; <span class="hljs-comment">//该变量作用是鼠标滑轮一直向下或者向上滑动时出现抖动现象</span>
$(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> starttime = <span class="hljs-number">0</span>,
        endtime = <span class="hljs-number">0</span>;
    $(<span class="hljs-string">"body"</span>).mousewheel(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event, delta</span>) </span>{
        starttime = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime(); <span class="hljs-comment">//记录翻屏的初始时间</span>

        <span class="hljs-keyword">if</span> (delta &lt; <span class="hljs-number">0</span>&amp;&amp; page&gt;=<span class="hljs-number">0</span> &amp;&amp; page&lt;=$(<span class="hljs-string">".content .divsame"</span>).length<span class="hljs-number">-2</span>) { 
        
            <span class="hljs-keyword">if</span> (shakStaute&gt;=<span class="hljs-number">0</span> &amp;&amp;(starttime == <span class="hljs-number">0</span> || (endtime - starttime) &lt;= <span class="hljs-number">-500</span>)) { <span class="hljs-comment">//在500ms内执行一次翻屏</span>
                shakStaute=<span class="hljs-number">1</span>;
                page++;
                renderPage(page,<span class="hljs-literal">true</span>);  <span class="hljs-comment">//翻屏函数</span>
                endtime = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime(); <span class="hljs-comment">//记录翻屏的结束时间</span>
                
            }
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (delta&gt;<span class="hljs-number">0</span> &amp;&amp; page&gt;=<span class="hljs-number">1</span> &amp;&amp; shakStaute==<span class="hljs-number">1</span> &amp;&amp; (starttime == <span class="hljs-number">0</span> || (endtime - starttime) &lt;= <span class="hljs-number">-500</span>)) {  
            page--;
            renderPage(page,<span class="hljs-literal">true</span>);
            endtime = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime();                     
        }   

    });
    
    <span class="hljs-keyword">var</span> div_height=$(<span class="hljs-built_in">window</span>).height(); 

    $(<span class="hljs-string">".divsame"</span>).css({<span class="hljs-string">'height'</span>:div_height});

    $(<span class="hljs-built_in">window</span>).resize(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        
        div_height=$(<span class="hljs-built_in">window</span>).height();

        $(<span class="hljs-string">".divsame"</span>).css({<span class="hljs-string">'height'</span>:div_height});
        $(<span class="hljs-string">'.content'</span>).animate({<span class="hljs-attr">top</span>:-page*div_height }, <span class="hljs-number">100</span>);
    });
    
    
    $(<span class="hljs-string">".left_fixed ul li"</span>).on(<span class="hljs-string">"click"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ <span class="hljs-comment">//点击小导航也执行翻屏</span>
        <span class="hljs-keyword">var</span> index = $(<span class="hljs-keyword">this</span>).index();
        <span class="hljs-keyword">if</span>(index&gt;<span class="hljs-number">0</span>){
            shakStaute==<span class="hljs-number">1</span>;
        }
        page = index;
        renderPage(page, <span class="hljs-literal">true</span>);
        $(<span class="hljs-string">".left_fixed ul li"</span>).removeClass(<span class="hljs-string">"active"</span>);
        $(<span class="hljs-keyword">this</span>).addClass(<span class="hljs-string">"active"</span>);
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    });
    
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">renderPage</span>(<span class="hljs-params">pageNumber, isScroll</span>)</span>{ 
        <span class="hljs-keyword">if</span> (isScroll){
            $(<span class="hljs-string">'.content'</span>).animate({<span class="hljs-attr">top</span>:-pageNumber*div_height }, <span class="hljs-string">'slow'</span>);
            $(<span class="hljs-string">".left_fixed ul li"</span>).removeClass(<span class="hljs-string">"active"</span>);
            $(<span class="hljs-string">".left_fixed ul li"</span>).eq(pageNumber).addClass(<span class="hljs-string">"active"</span>);
        }     
        <span class="hljs-keyword">return</span>;
    }
})</code></pre>
<p>同时也是实时响应的。</p>
<p>插件下载地址：<a href="https://pan.baidu.com/s/1gfOZ9q7" rel="nofollow noreferrer" target="_blank">https://pan.baidu.com/s/1gfOZ9q7</a> 密码：<code>ocq3</code></p>
<h2 id="articleHeader5">6.手机页面，点击某缩略图，在弹出层看大图，并能左右切换看图</h2>
<p>头部需加载的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;js/jquery-1.8.2.min.js&quot; type=&quot;text/javascript&quot;></script>
<script src=&quot;js/TouchSlide.1.0.js&quot; type=&quot;text/javascript&quot;></script>
<script src=&quot;js/popup.js&quot; type=&quot;text/javascript&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/jquery-1.8.2.min.js"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/TouchSlide.1.0.js"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/popup.js"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>html代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;tip_boxs&quot; id=&quot;tip_boxs&quot; style=&quot;display:none;&quot;>
    <div class=&quot;align&quot;>
        <div id=&quot;slideBoxindexb&quot;>
            <div class=&quot;bd&quot;>
                <ul class=&quot;clearfix&quot;>
                    <li><img src=&quot;images/list_01.jpg&quot; /></li>
                    <li><img src=&quot;images/list_02.jpg&quot; /></li>
                    <li><img src=&quot;images/list_03.jpg&quot; /></li>
                </ul>
            </div>
            <div class=&quot;hd&quot;>
                <span class=&quot;prev&quot;></span>
                <span class=&quot;next&quot;></span>
            </div>
        </div>
        <div class=&quot;pop_con close&quot;>
            <p class=&quot;time&quot;>2014-10-06</p>
            <h5>餐桌上的创意美学</h5>
            <p>Audi City Beijing是亚洲首家数字化奥迪展厅，坐落于市中心东方广场。Audi City Beijing是奥迪品牌为粉丝们创造的一个可以相识交流的奇幻场所，同时，Audi City Beijing为人们提供了一个与品牌交流对话的空间,让奥迪与城市生活更加紧密地联系在一起。</p>
        </div>
    </div>  
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"tip_boxs"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"tip_boxs"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"display:none;"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"align"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"slideBoxindexb"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"bd"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"clearfix"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"images/list_01.jpg"</span> /&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"images/list_02.jpg"</span> /&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"images/list_03.jpg"</span> /&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"hd"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"prev"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"next"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pop_con close"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"time"</span>&gt;</span>2014-10-06<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h5</span>&gt;</span>餐桌上的创意美学<span class="hljs-tag">&lt;/<span class="hljs-name">h5</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Audi City Beijing是亚洲首家数字化奥迪展厅，坐落于市中心东方广场。Audi City Beijing是奥迪品牌为粉丝们创造的一个可以相识交流的奇幻场所，同时，Audi City Beijing为人们提供了一个与品牌交流对话的空间,让奥迪与城市生活更加紧密地联系在一起。<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>  
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p><strong>css 样式：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*弹框*/
.tip_boxs{z-index:9999; width:80%; position:relative;left:10%;display:none;height:100%;display:-webkit-box; -webkit-box-pack: center;-webkit-box-align: center; text-align:center; margin:0 auto; }
.tip_boxs .align{border-radius: 10px;overflow:hidden;width:100%;background: #fff;}
.tip_boxs_zhezhao{ background:#000; opacity:0.8; z-index:8888; display:none; position:fixed; top:0; left:0;}
#slideBoxindexb{ position:relative; width:100%; overflow:hidden; margin:0 auto;}
#slideBoxindexb .bd{ position:relative; z-index:0; width:100%;}
#slideBoxindexb .bd .tempWrap{width:100%;}
#slideBoxindexb .bd li{ position:relative;float:left;}
#slideBoxindexb .bd li{display: block;width:100%;display: -webkit-box;-webkit-box-pack: center;-webkit-box-align: center;}
#slideBoxindexb .bd li img{display: block;width:100%;border-top-left-radius: 10px;border-top-right-radius: 10px;}
#slideBoxindexb .prev,#slideBoxindexb .next{cursor:pointer; position:absolute;top:50%;margin-top:-16px;display:block; width:30px; height:32px;background: url(../images/prev_next_bg.png) no-repeat; }
#slideBoxindexb .prev{left:5px;}
#slideBoxindexb .next{right:5px;background-position: -30px 0;}
.tip_boxs .pop_con{width:100%;padding:10px;box-sizing:border-box;background: #fff;font-size: 12px;color:#060505;text-align: left;}
.tip_boxs .pop_con p{text-indent: 2em;line-height: 26px;}
.tip_boxs .pop_con p.time{color:#000;text-indent:0;}
.tip_boxs .pop_con h5{font-size: 14px;font-weight: bold;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-comment">/*弹框*/</span>
<span class="hljs-selector-class">.tip_boxs</span>{<span class="hljs-attribute">z-index</span>:<span class="hljs-number">9999</span>; <span class="hljs-attribute">width</span>:<span class="hljs-number">80%</span>; <span class="hljs-attribute">position</span>:relative;<span class="hljs-attribute">left</span>:<span class="hljs-number">10%</span>;<span class="hljs-attribute">display</span>:none;<span class="hljs-attribute">height</span>:<span class="hljs-number">100%</span>;<span class="hljs-attribute">display</span>:-webkit-box; <span class="hljs-attribute">-webkit-box-pack</span>: center;<span class="hljs-attribute">-webkit-box-align</span>: center; <span class="hljs-attribute">text-align</span>:center; <span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span> auto; }
<span class="hljs-selector-class">.tip_boxs</span> <span class="hljs-selector-class">.align</span>{<span class="hljs-attribute">border-radius</span>: <span class="hljs-number">10px</span>;<span class="hljs-attribute">overflow</span>:hidden;<span class="hljs-attribute">width</span>:<span class="hljs-number">100%</span>;<span class="hljs-attribute">background</span>: <span class="hljs-number">#fff</span>;}
<span class="hljs-selector-class">.tip_boxs_zhezhao</span>{ <span class="hljs-attribute">background</span>:<span class="hljs-number">#000</span>; <span class="hljs-attribute">opacity</span>:<span class="hljs-number">0.8</span>; <span class="hljs-attribute">z-index</span>:<span class="hljs-number">8888</span>; <span class="hljs-attribute">display</span>:none; <span class="hljs-attribute">position</span>:fixed; <span class="hljs-attribute">top</span>:<span class="hljs-number">0</span>; <span class="hljs-attribute">left</span>:<span class="hljs-number">0</span>;}
<span class="hljs-selector-id">#slideBoxindexb</span>{ <span class="hljs-attribute">position</span>:relative; <span class="hljs-attribute">width</span>:<span class="hljs-number">100%</span>; <span class="hljs-attribute">overflow</span>:hidden; <span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span> auto;}
<span class="hljs-selector-id">#slideBoxindexb</span> <span class="hljs-selector-class">.bd</span>{ <span class="hljs-attribute">position</span>:relative; <span class="hljs-attribute">z-index</span>:<span class="hljs-number">0</span>; <span class="hljs-attribute">width</span>:<span class="hljs-number">100%</span>;}
<span class="hljs-selector-id">#slideBoxindexb</span> <span class="hljs-selector-class">.bd</span> <span class="hljs-selector-class">.tempWrap</span>{<span class="hljs-attribute">width</span>:<span class="hljs-number">100%</span>;}
<span class="hljs-selector-id">#slideBoxindexb</span> <span class="hljs-selector-class">.bd</span> <span class="hljs-selector-tag">li</span>{ <span class="hljs-attribute">position</span>:relative;<span class="hljs-attribute">float</span>:left;}
<span class="hljs-selector-id">#slideBoxindexb</span> <span class="hljs-selector-class">.bd</span> <span class="hljs-selector-tag">li</span>{<span class="hljs-attribute">display</span>: block;<span class="hljs-attribute">width</span>:<span class="hljs-number">100%</span>;<span class="hljs-attribute">display</span>: -webkit-box;<span class="hljs-attribute">-webkit-box-pack</span>: center;<span class="hljs-attribute">-webkit-box-align</span>: center;}
<span class="hljs-selector-id">#slideBoxindexb</span> <span class="hljs-selector-class">.bd</span> <span class="hljs-selector-tag">li</span> <span class="hljs-selector-tag">img</span>{<span class="hljs-attribute">display</span>: block;<span class="hljs-attribute">width</span>:<span class="hljs-number">100%</span>;<span class="hljs-attribute">border-top-left-radius</span>: <span class="hljs-number">10px</span>;<span class="hljs-attribute">border-top-right-radius</span>: <span class="hljs-number">10px</span>;}
<span class="hljs-selector-id">#slideBoxindexb</span> <span class="hljs-selector-class">.prev</span>,<span class="hljs-selector-id">#slideBoxindexb</span> <span class="hljs-selector-class">.next</span>{<span class="hljs-attribute">cursor</span>:pointer; <span class="hljs-attribute">position</span>:absolute;<span class="hljs-attribute">top</span>:<span class="hljs-number">50%</span>;<span class="hljs-attribute">margin-top</span>:-<span class="hljs-number">16px</span>;<span class="hljs-attribute">display</span>:block; <span class="hljs-attribute">width</span>:<span class="hljs-number">30px</span>; <span class="hljs-attribute">height</span>:<span class="hljs-number">32px</span>;<span class="hljs-attribute">background</span>: <span class="hljs-built_in">url</span>(../images/prev_next_bg.png) no-repeat; }
<span class="hljs-selector-id">#slideBoxindexb</span> <span class="hljs-selector-class">.prev</span>{<span class="hljs-attribute">left</span>:<span class="hljs-number">5px</span>;}
<span class="hljs-selector-id">#slideBoxindexb</span> <span class="hljs-selector-class">.next</span>{<span class="hljs-attribute">right</span>:<span class="hljs-number">5px</span>;<span class="hljs-attribute">background-position</span>: -<span class="hljs-number">30px</span> <span class="hljs-number">0</span>;}
<span class="hljs-selector-class">.tip_boxs</span> <span class="hljs-selector-class">.pop_con</span>{<span class="hljs-attribute">width</span>:<span class="hljs-number">100%</span>;<span class="hljs-attribute">padding</span>:<span class="hljs-number">10px</span>;<span class="hljs-attribute">box-sizing</span>:border-box;<span class="hljs-attribute">background</span>: <span class="hljs-number">#fff</span>;<span class="hljs-attribute">font-size</span>: <span class="hljs-number">12px</span>;<span class="hljs-attribute">color</span>:<span class="hljs-number">#060505</span>;<span class="hljs-attribute">text-align</span>: left;}
<span class="hljs-selector-class">.tip_boxs</span> <span class="hljs-selector-class">.pop_con</span> <span class="hljs-selector-tag">p</span>{<span class="hljs-attribute">text-indent</span>: <span class="hljs-number">2em</span>;<span class="hljs-attribute">line-height</span>: <span class="hljs-number">26px</span>;}
<span class="hljs-selector-class">.tip_boxs</span> <span class="hljs-selector-class">.pop_con</span> <span class="hljs-selector-tag">p</span><span class="hljs-selector-class">.time</span>{<span class="hljs-attribute">color</span>:<span class="hljs-number">#000</span>;<span class="hljs-attribute">text-indent</span>:<span class="hljs-number">0</span>;}
<span class="hljs-selector-class">.tip_boxs</span> <span class="hljs-selector-class">.pop_con</span> <span class="hljs-selector-tag">h5</span>{<span class="hljs-attribute">font-size</span>: <span class="hljs-number">14px</span>;<span class="hljs-attribute">font-weight</span>: bold;}</code></pre>
<p><strong>jquery代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/javascript&quot;>
$(function(){
    $(&quot;.content_02 .list_item li&quot;).on('click',function(){ 
        popup($(&quot;.tip_boxs&quot;));  
         TouchSlide({
        slideCell: &quot;#slideBoxindexb&quot;,
        autoPlay:false,
        mainCell: &quot;.bd ul&quot;,
        effect: &quot;leftLoop&quot;
    });
    })
})
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
$(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    $(<span class="hljs-string">".content_02 .list_item li"</span>).on(<span class="hljs-string">'click'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ 
        popup($(<span class="hljs-string">".tip_boxs"</span>));  
         TouchSlide({
        <span class="hljs-attr">slideCell</span>: <span class="hljs-string">"#slideBoxindexb"</span>,
        <span class="hljs-attr">autoPlay</span>:<span class="hljs-literal">false</span>,
        <span class="hljs-attr">mainCell</span>: <span class="hljs-string">".bd ul"</span>,
        <span class="hljs-attr">effect</span>: <span class="hljs-string">"leftLoop"</span>
    });
    })
})
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>实现效果图为：<br><span class="img-wrap"><img data-src="/img/bVkfUA" src="https://static.alili.tech/img/bVkfUA" alt="image" title="image" style="cursor: pointer;"></span></p>
<blockquote>注：其中TouchSlide.1.0.js为弹出层中图片预览左右滑动效果；popup.js为弹框</blockquote>
<h2 id="articleHeader6">7.jquery.queryloader2.js实现图片（包括背景图片）预加载</h2>
<p>分享一个jQuery的预加载插件，这个插件通过检查页面中的所有元素来提前加载所有包含的图片（包括背景图片），这个版本的插件是原来版本的一个更新，更容易使用。<br>Queryloader目前需要<code>jQuery1.7</code>，并且支持<code>IE&gt;7, Chrome, Safari和Firefox</code>。<br>如何使用</p>
<p>引入类库</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;js/jquery.queryloader2.js&quot;type=&quot;text/javascript&quot;></script> " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/jquery.queryloader2.js"</span><span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span> </code></pre>
<p>当然你必须在以上代码之前引入jQuery类库，然后调用如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(document).ready(function () {
     $(&quot;body&quot;).queryLoader2();
 });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>$(<span class="hljs-built_in">document</span>).ready(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
     $(<span class="hljs-string">"body"</span>).queryLoader2();
 });</code></pre>
<p>如果你在iOS上使用，请调用如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" window.addEventListener('DOMContentLoaded', function() {
    $(&quot;body&quot;).queryLoader2();
 });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code> <span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">'DOMContentLoaded'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    $(<span class="hljs-string">"body"</span>).queryLoader2();
 });</code></pre>
<p>相关选项：</p>
<ul>
<li>backgroundColor (string) 加载的背景颜色</li>
<li>barColor (string) 加载条背景颜色</li>
<li>barHeight (int) 加载条高度，缺省为1</li>
<li>deepSearch (boolean) 设置为“true“来找到所有的指定元素对应图片。如果你不希望查找子元素，可以设置为false。</li>
<li>percentage (boolean) 设置为"true"来启用百分比展示，缺省为false</li>
<li>completeAnimation (string) 设定结束的动画类型，”grow“或者为"fade"，缺省为fade</li>
<li>onLoadComplete (function) 加载完毕后调用的方法。对于修改动画非常实用</li>
<li>onComplete (function) 这个方法在完成加载和动画后调用</li>
</ul>
<p>下载地址：<a href="https://pan.baidu.com/s/1bpLJVGz" rel="nofollow noreferrer" target="_blank">https://pan.baidu.com/s/1bpLJVGz</a>  密码：<code>rsgs</code></p>
<h2 id="articleHeader7">8.实现放大镜效果</h2>
<p><strong>实现原理</strong><br>首先，我们讲解一下放大镜效果的实现方式：</p>
<p>方法一：准备一张高像素的大图，当鼠标放到原图上，加载显示大图的对应位置。<br>方法二：对原图片进行放大，也就是调整原图的长和宽。</p>
<p>上面我们介绍了通过两种方式实现放大镜效果，接下来，我们将以上的两种方式应用到我们的<code>jQuery</code>插件中。</p>
<p>首先，我们需要一个img元素显示原图对象，还需要一个容器作为显示框；显示框里面存放大图对象。当鼠标移动到原图上时，通过对大图进行绝对定位来显示对应的部位，实现类似放大镜的效果。</p>
<p>接下来，让我们定义Index.html页面，具体实现如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
<head>
<title>放大镜效果</title>
<meta charset=&quot;utf-8&quot;/>
<meta name=&quot;description&quot; content=&quot;&quot;/>
<meta name=&quot;keywords&quot; content=&quot;&quot;/>
<link type=&quot;text/css&quot; rel=&quot;stylesheet&quot; href=&quot;css/reset.css&quot;/>
<link type=&quot;text/css&quot; rel=&quot;stylesheet&quot; href=&quot;css/main.css&quot;/>
<script type=&quot;text/javascript&quot; src=&quot;js/jquery-1.11.1.js&quot;></script>
<script type=&quot;text/javascript&quot; src=&quot;js/jquery.imageZoom.js&quot;></script>  
</head>
<body>  
    <div class=&quot;magnify&quot;>
    <div class=&quot;large&quot;></div>
    <img class=&quot;small&quot; src=&quot;images/iphone.jpg&quot; width=&quot;200&quot; />
    </div>
    
    <div class=&quot;magnify_02&quot;>
    <div class=&quot;large_02&quot;></div>
    <img class=&quot;small_02&quot; src=&quot;images/img5.jpg&quot; width=&quot;400&quot;/>
    </div>
    <script type=&quot;text/javascript&quot;>
    $(function(){
    
        $(&quot;.magnify&quot;).hover(function(){
                $.fn.imageZoom({
            small :&quot;small&quot;,
            large : &quot;large&quot;,
            magnify: &quot;magnify&quot;
           });
    
        },function(){})
    
        $(&quot;.magnify_02&quot;).hover(function(){
            $.fn.imageZoom({
            small : &quot;small_02&quot;,
            large : &quot;large_02&quot;,
            magnify: &quot;magnify_02&quot;
            });
    
        },function(){})
    
    })
</script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>放大镜效果<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>/&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"description"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">""</span>/&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"keywords"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">""</span>/&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"css/reset.css"</span>/&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"css/main.css"</span>/&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/jquery-1.11.1.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/jquery.imageZoom.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>  
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>  
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"magnify"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"large"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"small"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"images/iphone.jpg"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"200"</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"magnify_02"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"large_02"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"small_02"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"images/img5.jpg"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"400"</span>/&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    
        $(<span class="hljs-string">".magnify"</span>).hover(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                $.fn.imageZoom({
            <span class="hljs-attr">small</span> :<span class="hljs-string">"small"</span>,
            <span class="hljs-attr">large</span> : <span class="hljs-string">"large"</span>,
            <span class="hljs-attr">magnify</span>: <span class="hljs-string">"magnify"</span>
           });
    
        },<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{})
    
        $(<span class="hljs-string">".magnify_02"</span>).hover(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            $.fn.imageZoom({
            <span class="hljs-attr">small</span> : <span class="hljs-string">"small_02"</span>,
            <span class="hljs-attr">large</span> : <span class="hljs-string">"large_02"</span>,
            <span class="hljs-attr">magnify</span>: <span class="hljs-string">"magnify_02"</span>
            });
    
        },<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{})
    
    })
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>css样式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".magnify {width: 200px; margin: 50px auto; position: relative;}
.large {width: 175px; height: 175px;position: absolute;border-radius: 100%;z-index:99;box-shadow: 0 0 0 7px rgba(255, 255, 255, 0.85), 0 0 7px 7px rgba(0, 0, 0, 0.25), inset 0 0 40px 2px rgba(0, 0, 0, 0.25);background: url('../images/iphone.jpg') no-repeat;display: none;}
.small { display: block; }

.magnify_02 {width: 400px; margin: 50px auto; position: relative;}
.large_02 {width: 175px; height: 175px;position: absolute;border-radius: 100%;z-index:99;box-shadow: 0 0 0 7px rgba(255, 255, 255, 0.85), 0 0 7px 7px rgba(0, 0, 0, 0.25), inset 0 0 40px 2px rgba(0, 0, 0, 0.25);background: url('../images/iphone.jpg') no-repeat;display: none;}
.small_02 { display: block; }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.magnify</span> {<span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>; <span class="hljs-attribute">margin</span>: <span class="hljs-number">50px</span> auto; <span class="hljs-attribute">position</span>: relative;}
<span class="hljs-selector-class">.large</span> {<span class="hljs-attribute">width</span>: <span class="hljs-number">175px</span>; <span class="hljs-attribute">height</span>: <span class="hljs-number">175px</span>;<span class="hljs-attribute">position</span>: absolute;<span class="hljs-attribute">border-radius</span>: <span class="hljs-number">100%</span>;<span class="hljs-attribute">z-index</span>:<span class="hljs-number">99</span>;<span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">7px</span> <span class="hljs-built_in">rgba</span>(255, 255, 255, 0.85), <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">7px</span> <span class="hljs-number">7px</span> <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.25), inset <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">40px</span> <span class="hljs-number">2px</span> <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.25);<span class="hljs-attribute">background</span>: <span class="hljs-built_in">url</span>(<span class="hljs-string">'../images/iphone.jpg'</span>) no-repeat;<span class="hljs-attribute">display</span>: none;}
<span class="hljs-selector-class">.small</span> { <span class="hljs-attribute">display</span>: block; }

<span class="hljs-selector-class">.magnify_02</span> {<span class="hljs-attribute">width</span>: <span class="hljs-number">400px</span>; <span class="hljs-attribute">margin</span>: <span class="hljs-number">50px</span> auto; <span class="hljs-attribute">position</span>: relative;}
<span class="hljs-selector-class">.large_02</span> {<span class="hljs-attribute">width</span>: <span class="hljs-number">175px</span>; <span class="hljs-attribute">height</span>: <span class="hljs-number">175px</span>;<span class="hljs-attribute">position</span>: absolute;<span class="hljs-attribute">border-radius</span>: <span class="hljs-number">100%</span>;<span class="hljs-attribute">z-index</span>:<span class="hljs-number">99</span>;<span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">7px</span> <span class="hljs-built_in">rgba</span>(255, 255, 255, 0.85), <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">7px</span> <span class="hljs-number">7px</span> <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.25), inset <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">40px</span> <span class="hljs-number">2px</span> <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.25);<span class="hljs-attribute">background</span>: <span class="hljs-built_in">url</span>(<span class="hljs-string">'../images/iphone.jpg'</span>) no-repeat;<span class="hljs-attribute">display</span>: none;}
<span class="hljs-selector-class">.small_02</span> { <span class="hljs-attribute">display</span>: block; }</code></pre>
<p><strong>mousemove事件</strong><br>接下来，我们通过jQuery插件形式来实现放大镜效果，当鼠标移动到small对象上方时，就会在large对象中显示大图的对应位置，这就涉及到mousemove事件了，所以，我们需要实现mousemove事件的监听方法。</p>
<p>实现jquery.imagezoom.js插件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=";(function($) {
    $.fn.imageZoom = function(options) {
        var defaults = {
            scaling: 0.3,
            small :&quot;small&quot;,
            large : &quot;large&quot;,
            magnify:&quot;magnify&quot;
        };

        options = $.extend(defaults, options),
        native_width = 0,
        native_height = 0,
        current_width = 0,
        current_height = 0,

        magnify=&quot;.&quot;+options.magnify;
        small=&quot;.&quot;+options.small;
        $small=$(small);
        large=&quot;.&quot;+options.large;
        $large=$(large);

        $(magnify).mousemove(function(e) {
            var image_object = new Image();
            image_object.src = $small.attr('src');
            if(!+[1,]) {
                native_height = image_object.height;
                native_width = image_object.width;   
            } 
            else{
                image_object.onload = function() {   
                    image_object.onload = null;
                    native_height = image_object.height;
                    native_width = image_object.width;
               }
            }
            current_height = $small.height();
            current_width = $small.width();
            var magnify_offset = $(this).offset();
            var  mx = e.pageX - magnify_offset.left;
            var  my = e.pageY - magnify_offset.top;

            if (mx < $(this).width() &amp;&amp; my <$(this).height() &amp;&amp; mx > 0 &amp;&amp; my > 0) {
                $large.fadeIn(100);
            }else{
                $large.fadeOut(100);
            }
            if ($large.is(&quot;:visible&quot;)) {
                var rx = Math.round(mx / $small.width() * native_width - $large.width() / 2) * -1,
                    ry = Math.round(my / $small.height() * native_height - $large.height() / 2) * -1,
                    bgp = rx + &quot;px &quot; + ry + &quot;px&quot;,
                    px = mx - $large.width() / 2,
                    py = my - $large.height() / 2;
                $large.css({
                    left: px,
                    top: py,
                    backgroundPosition: bgp
                });
            }
        });
    };
})(jQuery);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code>;(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">($)</span> </span>{
    $.fn.imageZoom = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(options)</span> </span>{
        <span class="hljs-keyword">var</span> defaults = {
            scaling: <span class="hljs-number">0.3</span>,
            small :<span class="hljs-string">"small"</span>,
            large : <span class="hljs-string">"large"</span>,
            magnify:<span class="hljs-string">"magnify"</span>
        };

        options = $.extend(defaults, options),
        native_width = <span class="hljs-number">0</span>,
        native_height = <span class="hljs-number">0</span>,
        current_width = <span class="hljs-number">0</span>,
        current_height = <span class="hljs-number">0</span>,

        magnify=<span class="hljs-string">"."</span>+options.magnify;
        small=<span class="hljs-string">"."</span>+options.small;
        $small=$(small);
        large=<span class="hljs-string">"."</span>+options.large;
        $large=$(large);

        $(magnify).mousemove(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(e)</span> </span>{
            <span class="hljs-keyword">var</span> image_object = <span class="hljs-keyword">new</span> Image();
            image_object.src = $small.attr(<span class="hljs-string">'src'</span>);
            <span class="hljs-keyword">if</span>(!+[<span class="hljs-number">1</span>,]) {
                native_height = image_object.height;
                native_width = image_object.width;   
            } 
            <span class="hljs-keyword">else</span>{
                image_object.onload = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{   
                    image_object.onload = <span class="hljs-keyword">null</span>;
                    native_height = image_object.height;
                    native_width = image_object.width;
               }
            }
            current_height = $small.height();
            current_width = $small.width();
            <span class="hljs-keyword">var</span> magnify_offset = $(this).offset();
            <span class="hljs-keyword">var</span>  mx = e.pageX - magnify_offset.left;
            <span class="hljs-keyword">var</span>  my = e.pageY - magnify_offset.top;

            <span class="hljs-keyword">if</span> (mx &lt; $(this).width() &amp;&amp; my &lt;$(this).height() &amp;&amp; mx &gt; <span class="hljs-number">0</span> &amp;&amp; my &gt; <span class="hljs-number">0</span>) {
                $large.fadeIn(<span class="hljs-number">100</span>);
            }<span class="hljs-keyword">else</span>{
                $large.fadeOut(<span class="hljs-number">100</span>);
            }
            <span class="hljs-keyword">if</span> ($large.is(<span class="hljs-string">":visible"</span>)) {
                <span class="hljs-keyword">var</span> rx = Math.round(mx / $small.width() * native_width - $large.width() / <span class="hljs-number">2</span>) * <span class="hljs-number">-1</span>,
                    ry = Math.round(my / $small.height() * native_height - $large.height() / <span class="hljs-number">2</span>) * <span class="hljs-number">-1</span>,
                    bgp = rx + <span class="hljs-string">"px "</span> + ry + <span class="hljs-string">"px"</span>,
                    px = mx - $large.width() / <span class="hljs-number">2</span>,
                    py = my - $large.height() / <span class="hljs-number">2</span>;
                $large.css({
                    left: px,
                    top: py,
                    backgroundPosition: bgp
                });
            }
        });
    };
})(jQuery);</code></pre>
<blockquote>注释：当鼠标移动到magnify对象中，我们需要获取鼠标在magnify中的相对坐标位置，这里我们把相对坐标定义为(mx,my)，通过上图我们知道相对坐标等于<code>(pageX - offsetLeft, pageY - offsetTop)</code>。</blockquote>
<p>现在，我们已经获取鼠标在magnify对象中的坐标值，接下来，需要获取对应大图的相应坐标，这里我们把大图的对应坐标定义为(rx,ry)，我们可以通过比例关系获取(rx,ry)的值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mx / small.width （原图的宽）= rx / native_width（大图的宽）
my / small.height （原图的长）= ry / native_height（大图的长）" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ceylon"><code>mx / <span class="hljs-keyword">small</span>.width （原图的宽）= rx / <span class="hljs-keyword">native</span><span class="hljs-number">_</span>width（大图的宽）
my / <span class="hljs-keyword">small</span>.height （原图的长）= ry / <span class="hljs-keyword">native</span><span class="hljs-number">_</span>height（大图的长）</code></pre>
<p>通过上面的比例关系，我们知道大图的坐标<code>(rx,ry)</code>等于<code>(mx/small.width*native_width, my/small.height*native_height)</code>。</p>
<p><strong>mousewheel事件</strong><br>前面，我们通过<code>mousemove</code>事件来放大图片，这里我们将通过鼠标的滚轮事件实现图片放大效果。</p>
<p>由于，不同的浏览器有不同的滚轮事件。主要是有三种：<code>onmousewheel（IE 6/7/8）</code>、<code>mousewheel（IE9，Chrome，Safari和Opera）</code>和<code>DOMMouseScroll</code>（只有Firefox支持），关于这三个事件这里不做详细的介绍了。</p>
<p>由于不同浏览器之间存在着差异，为了实现浏览器之间的兼容，所以，我们需要监听以上三种滚轮事件（onmousewheel，mousewheel和DOMMouseScroll），具体实现如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(&quot;.magnify&quot;).bind('DOMMouseScroll mousewheel onmousewheel', function(e) {
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>$(<span class="hljs-string">".magnify"</span>).bind(<span class="hljs-string">'DOMMouseScroll mousewheel onmousewheel'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
});</code></pre>
<p>上面，我们实现了兼容不同浏览器的滚轮事件监听方法，接下来，判断滚轮向上或向下也要考虑不同浏览器的兼容性，主流的览器（IE、Opera、Safari、Firefox、Chrome）中Firefox 使用detail，其余四类使用<code>wheelDelta</code>；两者只在取值上不一致，代表含义一致，<code>detail</code>与<code>wheelDelta</code>只各取两个值，<code>detail</code>只取<code>±3</code>，<code>wheelDelta</code>只取<code>±120</code>，其中正数表示为向上，负数表示向下。</p>
<p>由于detail和wheelDelta都有两个值表示向上或向下滚动，所以不同浏览器间可以通过以下方式实现兼容，具体实现如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(&quot;.magnify&quot;).bind('DOMMouseScroll mousewheel onmousewheel', function(e) {
    // cross-browser wheel delta
    var e = window.event || e; // old IE support.
    var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>$(<span class="hljs-string">".magnify"</span>).bind(<span class="hljs-string">'DOMMouseScroll mousewheel onmousewheel'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
    <span class="hljs-comment">// cross-browser wheel delta</span>
    <span class="hljs-keyword">var</span> e = <span class="hljs-built_in">window</span>.event || e; <span class="hljs-comment">// old IE support.</span>
    <span class="hljs-keyword">var</span> delta = <span class="hljs-built_in">Math</span>.max(<span class="hljs-number">-1</span>, <span class="hljs-built_in">Math</span>.min(<span class="hljs-number">1</span>, (e.wheelDelta || -e.detail)));
});</code></pre>
<p>上面，我们已经处理了不同浏览器滚轮监听方法，当用户滚动滚轮时需要动态地修改原图的尺寸，这里我们定义缩放比scaling为0.3，也就是说每当用户滚动一下滚轮原图就按0.3的比例进行缩放，具体实现如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Gets the image scaling height and width.
native_height += (native_height * scaling * delta);
native_width += (native_width * scaling * delta);

// Update backgroud image size.
$large.css('background-size', native_width + &quot;px &quot; + native_height + &quot;px&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>// Gets the <span class="hljs-built_in">image</span> scaling <span class="hljs-built_in">height</span> <span class="hljs-keyword">and</span> <span class="hljs-built_in">width</span>.
native_height += (native_height * scaling * <span class="hljs-built_in">delta</span>);
native_width += (native_width * scaling * <span class="hljs-built_in">delta</span>);

// Update backgroud <span class="hljs-built_in">image</span> size.
$large.css('<span class="hljs-built_in">background</span>-size', native_width + <span class="hljs-string">"px "</span> + native_height + <span class="hljs-string">"px"</span>);</code></pre>
<p>上面，我们实现了放大镜效果，当我们鼠标停留在图片上方会自动放大图片的相应部位，当然我们可以通过滚轮调整放大的比例。</p>
<p><strong>参考</strong><br><a href="http://tech.pro/tutorial/681/css-tutorial-the-background-position-property" rel="nofollow noreferrer" target="_blank">http://tech.pro/tutorial/681/css-tutorial-the-background-position-property</a><br><a href="http://www.sitepoint.com/html5-javascript-mouse-wheel/" rel="nofollow noreferrer" target="_blank">http://www.sitepoint.com/html5-javascript-mouse-wheel/</a><br><a href="http://thecodeplayer.com/walkthrough/magnifying-glass-for-images-using-jquery-and-css3" rel="nofollow noreferrer" target="_blank">http://thecodeplayer.com/walkthrough/magnifying-glass-for-images-using-jquery-and-css3</a></p>
<h2 id="articleHeader8">9.实现雪花飘落</h2>
<p><strong>实现思路</strong></p>
<ul>
<li>1.在一定的频率下在页面中生成一定数目的雪花从上往下飘落；</li>
<li>2.在指定的时间内飘落后移除页面；</li>
<li>3.可设置雪花的大小，在一定范围内随机雪花大小；</li>
<li>4.什么时间后清除生成雪花，停止函数。</li>
</ul>
<p><strong>js代码</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" ;(function($){   
    $.fn.snow = function(options){
    
        var $flake          = $('<div class=&quot;flake&quot; />').css({'position': 'absolute', 'top': '-50px'}),
            documentHeight  = $(document).height(),
            documentWidth   = $(document).width(),
            defaults        = {
                                flakeChar   : &quot;&amp;#10052;&quot;, 
                                minSize     : 10,
                                maxSize     : 20,
                                newOn       : 500,
                                flakeColor  : '#ffffff',
                                durationMillis: null
                            },
            options         = $.extend({}, defaults, options);
                        
        $flake.html(options.flakeChar);

        var interval        = setInterval( function(){
            var startPositionLeft   = Math.random() * documentWidth - 100,
                startOpacity        = 0.5 + Math.random(),
                sizeFlake           = options.minSize + Math.random() * options.maxSize,
                endPositionTop      = documentHeight - defaults.maxSize - 40,
                endPositionLeft     = startPositionLeft - 100 + Math.random() * 200,
                durationFall        = documentHeight * 10 + Math.random() * 5000;
            $flake
                .clone()
                .appendTo('body')
                .css({
                        left: startPositionLeft,
                        opacity: startOpacity,
                        'font-size': sizeFlake,
                        color: options.flakeColor
                })
                .animate({
                        top: endPositionTop,
                        left: endPositionLeft,
                        opacity: 0.2
                    },
                    durationFall,
                    'linear',
                    function() {
                        $(this).remove()
                    }
                );
        }, options.newOn);

        if (options.durationMillis) {
            setTimeout(function() {
                clearInterval(interval);
            }, options.durationMillis);
        }   
    };  
})(jQuery);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code> ;(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">$</span>)</span>{   
    $.fn.snow = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">options</span>)</span>{
    
        <span class="hljs-keyword">var</span> $flake          = $(<span class="hljs-string">'&lt;div class="flake" /&gt;'</span>).css({<span class="hljs-string">'position'</span>: <span class="hljs-string">'absolute'</span>, <span class="hljs-string">'top'</span>: <span class="hljs-string">'-50px'</span>}),
            documentHeight  = $(<span class="hljs-built_in">document</span>).height(),
            documentWidth   = $(<span class="hljs-built_in">document</span>).width(),
            defaults        = {
                                <span class="hljs-attr">flakeChar</span>   : <span class="hljs-string">"&amp;#10052;"</span>, 
                                <span class="hljs-attr">minSize</span>     : <span class="hljs-number">10</span>,
                                <span class="hljs-attr">maxSize</span>     : <span class="hljs-number">20</span>,
                                <span class="hljs-attr">newOn</span>       : <span class="hljs-number">500</span>,
                                <span class="hljs-attr">flakeColor</span>  : <span class="hljs-string">'#ffffff'</span>,
                                <span class="hljs-attr">durationMillis</span>: <span class="hljs-literal">null</span>
                            },
            options         = $.extend({}, defaults, options);
                        
        $flake.html(options.flakeChar);

        <span class="hljs-keyword">var</span> interval        = setInterval( <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-keyword">var</span> startPositionLeft   = <span class="hljs-built_in">Math</span>.random() * documentWidth - <span class="hljs-number">100</span>,
                startOpacity        = <span class="hljs-number">0.5</span> + <span class="hljs-built_in">Math</span>.random(),
                sizeFlake           = options.minSize + <span class="hljs-built_in">Math</span>.random() * options.maxSize,
                endPositionTop      = documentHeight - defaults.maxSize - <span class="hljs-number">40</span>,
                endPositionLeft     = startPositionLeft - <span class="hljs-number">100</span> + <span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">200</span>,
                durationFall        = documentHeight * <span class="hljs-number">10</span> + <span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">5000</span>;
            $flake
                .clone()
                .appendTo(<span class="hljs-string">'body'</span>)
                .css({
                        <span class="hljs-attr">left</span>: startPositionLeft,
                        <span class="hljs-attr">opacity</span>: startOpacity,
                        <span class="hljs-string">'font-size'</span>: sizeFlake,
                        <span class="hljs-attr">color</span>: options.flakeColor
                })
                .animate({
                        <span class="hljs-attr">top</span>: endPositionTop,
                        <span class="hljs-attr">left</span>: endPositionLeft,
                        <span class="hljs-attr">opacity</span>: <span class="hljs-number">0.2</span>
                    },
                    durationFall,
                    <span class="hljs-string">'linear'</span>,
                    <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                        $(<span class="hljs-keyword">this</span>).remove()
                    }
                );
        }, options.newOn);

        <span class="hljs-keyword">if</span> (options.durationMillis) {
            setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                clearInterval(interval);
            }, options.durationMillis);
        }   
    };  
})(jQuery);</code></pre>
<p>调用方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(function(){
    $(&quot;body&quot;).snow({'durationMillis':2000}); //2s后停止生成雪花
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>$(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    $(<span class="hljs-string">"body"</span>).snow({<span class="hljs-string">'durationMillis'</span>:<span class="hljs-number">2000</span>}); <span class="hljs-comment">//2s后停止生成雪花</span>
})</code></pre>
<p><strong>参数解释：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" * @params flakeChar - 实现雪花图案的html字符
 * @params minSize - 雪花的最小尺寸
 * @params maxSize - 雪花的最大尺寸
 * @params newOn - 雪花出现的频率
 * @params flakeColors - 雪花颜色
 * @params durationMillis - 多少毫米后停止生成雪花
 * @example $.fn.snow({ maxSize: 200, newOn: 1000 }); 
 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code> * <span class="hljs-variable">@params</span> flakeChar - 实现雪花图案的html字符
 * <span class="hljs-variable">@params</span> minSize - 雪花的最小尺寸
 * <span class="hljs-variable">@params</span> maxSize - 雪花的最大尺寸
 * <span class="hljs-variable">@params</span> newOn - 雪花出现的频率
 * <span class="hljs-variable">@params</span> flakeColors - 雪花颜色
 * <span class="hljs-variable">@params</span> durationMillis - 多少毫米后停止生成雪花
 * <span class="hljs-variable">@example</span> $.fn.snow({ <span class="hljs-attribute">maxSize</span>: <span class="hljs-number">200</span>, <span class="hljs-attribute">newOn</span>: <span class="hljs-number">1000</span> }); 
 </code></pre>
<h2 id="articleHeader9">10.实现锚点向下平滑滚动特效</h2>
<p>实现效果如图所示：<br><span class="img-wrap"><img data-src="/img/remote/1460000011003164" src="https://static.alili.tech/img/remote/1460000011003164" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<p>实现原理：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="('html, body').animate({ scrollTop:(hash).offset().top
}, 800, function(){
    window.location.hash = hash;
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>(<span class="hljs-string">'html, body'</span>).animate({ <span class="hljs-attr">scrollTop</span>:(hash).offset().top
}, <span class="hljs-number">800</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">window</span>.location.hash = hash;
});</code></pre>
<p>代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
<head>
<script src=&quot;https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js&quot;></script>
<script>
$(document).ready(function(){
  // Add smooth scrolling to all links
  $(&quot;a&quot;).on('click', function(event) {
 
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== &quot;&quot;) {
      // Prevent default anchor click behavior
      event.preventDefault();
 
      // Store hash
      var hash = this.hash;
 
      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){
    
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
});
</script>
 <style>
body, html, .main {
    height: 100%;
}
 
section {
    min-height: 100%;
}
</style>
</head>
<body>
<a href=&quot;#section2&quot; style=&quot;
      font-size: 30px;
      font-weight: bold;
      text-align: center;
&quot;>点击此处平滑滚动到第二部分</a>
<div class=&quot;main&quot;>
  <section></section>
</div>
<div class=&quot;main&quot; id=&quot;section2&quot;>
  <section style=&quot;
      background-color: #03c03c;
      color: #fff;
      font-size: 30px;
      text-align: center&quot;>
      SECTION 2
  </section>
</div>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
$(<span class="hljs-built_in">document</span>).ready(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-comment">// Add smooth scrolling to all links</span>
  $(<span class="hljs-string">"a"</span>).on(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{
 
    <span class="hljs-comment">// Make sure this.hash has a value before overriding default behavior</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.hash !== <span class="hljs-string">""</span>) {
      <span class="hljs-comment">// Prevent default anchor click behavior</span>
      event.preventDefault();
 
      <span class="hljs-comment">// Store hash</span>
      <span class="hljs-keyword">var</span> hash = <span class="hljs-keyword">this</span>.hash;
 
      <span class="hljs-comment">// Using jQuery's animate() method to add smooth page scroll</span>
      <span class="hljs-comment">// The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area</span>
      $(<span class="hljs-string">'html, body'</span>).animate({
        <span class="hljs-attr">scrollTop</span>: $(hash).offset().top
      }, <span class="hljs-number">800</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    
        <span class="hljs-comment">// Add hash (#) to URL when done scrolling (default click behavior)</span>
        <span class="hljs-built_in">window</span>.location.hash = hash;
      });
    } <span class="hljs-comment">// End if</span>
  });
});
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-tag">body</span>, <span class="hljs-selector-tag">html</span>, <span class="hljs-selector-class">.main</span> {
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
}
 
<span class="hljs-selector-tag">section</span> {
    <span class="hljs-attribute">min-height</span>: <span class="hljs-number">100%</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#section2"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"
      font-size: 30px;
      font-weight: bold;
      text-align: center;
"</span>&gt;</span>点击此处平滑滚动到第二部分<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"main"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">section</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"main"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"section2"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">section</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"
      background-color: #03c03c;
      color: #fff;
      font-size: 30px;
      text-align: center"</span>&gt;</span>
      SECTION 2
  <span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<h2 id="articleHeader10">11.jQuery Color animation 色彩动画扩展</h2>
<p><code>jQuery</code> 的动画方法（<code>animate</code>）支持各种属性的过渡，但是默认并不支持色彩的过渡，该插件正是来补足这一点！</p>
<blockquote>PS: 该插件支持 <code>RGBA</code> 颜色的过渡，但是请注意，<code>IE8以下的版本不支持 RGBA 颜色</code>。</blockquote>
<p><strong>支持以下属性：</strong></p>
<ul>
<li>color</li>
<li>backgroundColor</li>
<li>borderColor</li>
<li>borderBottomColor</li>
<li>borderLeftColor</li>
<li>borderRightColor</li>
<li>borderTopColor</li>
<li>outlineColor</li>
</ul>
<p><strong>使用方法：</strong></p>
<p>载入 JavaScript 文件,首先页面中引入你的JQ版本，然后引入下面的插件代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src='jquery.animate-colors.js'></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">'jquery.animate-colors.js'</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>调用方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('#demodiv').animate({ color:'#E4D8B8' })
$('#demodiv').animate({ backgroundColor:'#400101' })
$('#demodiv').animate({ borderBottomColor:'#00346B' })
$('#demodiv').animate({ borderColor:'#F2E2CE' })
$('#demodiv').animate({ color:'rgba(42, 47, 76, 0.1)' })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mel"><code>$(<span class="hljs-string">'#demodiv'</span>).animate({ <span class="hljs-keyword">color</span>:<span class="hljs-string">'#E4D8B8'</span> })
$(<span class="hljs-string">'#demodiv'</span>).animate({ backgroundColor:<span class="hljs-string">'#400101'</span> })
$(<span class="hljs-string">'#demodiv'</span>).animate({ borderBottomColor:<span class="hljs-string">'#00346B'</span> })
$(<span class="hljs-string">'#demodiv'</span>).animate({ borderColor:<span class="hljs-string">'#F2E2CE'</span> })
$(<span class="hljs-string">'#demodiv'</span>).animate({ <span class="hljs-keyword">color</span>:<span class="hljs-string">'rgba(42, 47, 76, 0.1)'</span> })</code></pre>
<p>下面贴一下不同的jquery版本，使用该插件的版本不一样，如下：</p>
<p><code>jQuery Animate colors </code>（适用于 <code>jQuery 1.8</code> 以上版本）：<a href="https://files.cnblogs.com/files/moqiutao/jquery.1.8.animate-colors.zip" rel="nofollow noreferrer" target="_blank">《下载地址》</a><br><code>jQuery Animate colors</code> （适用于 <code>jQuery 1.7.2 </code>以下版本）：<a href="https://files.cnblogs.com/files/moqiutao/jquery1.7.2.animate-colors.Archived.zip" rel="nofollow noreferrer" target="_blank">《下载地址》</a><br>这儿贴一下适用于<code>jquery1.8以上</code>版本的源码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function($) {
    /**
     * Check whether the browser supports RGBA color mode.
     *
     * Author Mehdi Kabab <http://pioupioum.fr>
     * @return {boolean} True if the browser support RGBA. False otherwise.
     */
    function isRGBACapable() {
        var $script = $('script:first'),
                color = $script.css('color'),
                result = false;
        if (/^rgba/.test(color)) {
            result = true;
        } else {
            try {
                result = ( color != $script.css('color', 'rgba(0, 0, 0, 0.5)').css('color') );
                $script.css('color', color);
            } catch (e) {
            }
        }

        return result;
    }

    $.extend(true, $, {
        support: {
            'rgba': isRGBACapable()
        }
    });

    var properties = ['color', 'backgroundColor', 'borderBottomColor', 'borderLeftColor', 'borderRightColor', 'borderTopColor', 'outlineColor'];
    $.each(properties, function(i, property) {
        $.Tween.propHooks[ property ] = {
            get: function(tween) {
                return $(tween.elem).css(property);
            },
            set: function(tween) {
                var style = tween.elem.style;
                var p_begin = parseColor($(tween.elem).css(property));
                var p_end = parseColor(tween.end);
                tween.run = function(progress) {
                    style[property] = calculateColor(p_begin, p_end, progress);
                }
            }
        }
    });

    // borderColor doesn't fit in standard fx.step above.
    $.Tween.propHooks.borderColor = {
        set: function(tween) {
            var style = tween.elem.style;
            var p_begin = [];
            var borders = properties.slice(2, 6); // All four border properties
            $.each(borders, function(i, property) {
                p_begin[property] = parseColor($(tween.elem).css(property));
            });
            var p_end = parseColor(tween.end);
            tween.run = function(progress) {
                $.each(borders, function(i, property) {
                    style[property] = calculateColor(p_begin[property], p_end, progress);
                });
            }
        }
    }

    // Calculate an in-between color. Returns &quot;#aabbcc&quot;-like string.
    function calculateColor(begin, end, pos) {
        var color = 'rgb' + ($.support['rgba'] ? 'a' : '') + '('
                + parseInt((begin[0] + pos * (end[0] - begin[0])), 10) + ','
                + parseInt((begin[1] + pos * (end[1] - begin[1])), 10) + ','
                + parseInt((begin[2] + pos * (end[2] - begin[2])), 10);
        if ($.support['rgba']) {
            color += ',' + (begin &amp;&amp; end ? parseFloat(begin[3] + pos * (end[3] - begin[3])) : 1);
        }
        color += ')';
        return color;
    }

    // Parse an CSS-syntax color. Outputs an array [r, g, b]
    function parseColor(color) {
        var match, triplet;

        // Match #aabbcc
        if (match = /#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})/.exec(color)) {
            triplet = [parseInt(match[1], 16), parseInt(match[2], 16), parseInt(match[3], 16), 1];

            // Match #abc
        } else if (match = /#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])/.exec(color)) {
            triplet = [parseInt(match[1], 16) * 17, parseInt(match[2], 16) * 17, parseInt(match[3], 16) * 17, 1];

            // Match rgb(n, n, n)
        } else if (match = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(color)) {
            triplet = [parseInt(match[1]), parseInt(match[2]), parseInt(match[3]), 1];

        } else if (match = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9\.]*)\s*\)/.exec(color)) {
            triplet = [parseInt(match[1], 10), parseInt(match[2], 10), parseInt(match[3], 10),parseFloat(match[4])];

            // No browser returns rgb(n%, n%, n%), so little reason to support this format.
        }
        return triplet;
    }
})(jQuery);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scheme"><code>(<span class="hljs-name">function</span>(<span class="hljs-name">$</span>) {
    /**
     * Check whether the browser supports RGBA color mode.
     *
     * Author Mehdi Kabab &lt;http://pioupioum.fr&gt;
     * @return {boolean} True if the browser support RGBA. False otherwise.
     */
    function isRGBACapable() {
        var $script = $(<span class="hljs-symbol">'script:first</span>'),
                color = $script.css(<span class="hljs-symbol">'color</span>'),
                result = false<span class="hljs-comment">;</span>
        if (<span class="hljs-name">/^rgba/.test</span>(<span class="hljs-name">color</span>)) {
            result = true<span class="hljs-comment">;</span>
        } else {
            try {
                result = ( color != $script.css(<span class="hljs-symbol">'color</span>', <span class="hljs-symbol">'rgba</span>(<span class="hljs-name">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0.5</span>)').css(<span class="hljs-symbol">'color</span>') )<span class="hljs-comment">;</span>
                $script.css(<span class="hljs-symbol">'color</span>', color)<span class="hljs-comment">;</span>
            } catch (<span class="hljs-name">e</span>) {
            }
        }

        return result<span class="hljs-comment">;</span>
    }

    $.extend(<span class="hljs-name">true</span>, $, {
        support: {
            <span class="hljs-symbol">'rgba</span><span class="hljs-symbol">':</span> isRGBACapable()
        }
    })<span class="hljs-comment">;</span>

    var properties = [<span class="hljs-symbol">'color</span>', <span class="hljs-symbol">'backgroundColor</span>', <span class="hljs-symbol">'borderBottomColor</span>', <span class="hljs-symbol">'borderLeftColor</span>', <span class="hljs-symbol">'borderRightColor</span>', <span class="hljs-symbol">'borderTopColor</span>', <span class="hljs-symbol">'outlineColor</span>']<span class="hljs-comment">;</span>
    $.each(<span class="hljs-name">properties</span>, function(<span class="hljs-name">i</span>, property) {
        $.Tween.propHooks[ property ] = {
            get: function(<span class="hljs-name">tween</span>) {
                return $(<span class="hljs-name">tween.elem</span>).css(<span class="hljs-name">property</span>)<span class="hljs-comment">;</span>
            },
            set: function(<span class="hljs-name">tween</span>) {
                var style = tween.elem.style<span class="hljs-comment">;</span>
                var p_begin = parseColor(<span class="hljs-name">$</span>(<span class="hljs-name">tween.elem</span>).css(<span class="hljs-name">property</span>))<span class="hljs-comment">;</span>
                var p_end = parseColor(<span class="hljs-name">tween.end</span>)<span class="hljs-comment">;</span>
                tween.run = function(<span class="hljs-name">progress</span>) {
                    style[<span class="hljs-name">property</span>] = calculateColor(<span class="hljs-name">p_begin</span>, p_end, progress)<span class="hljs-comment">;</span>
                }
            }
        }
    })<span class="hljs-comment">;</span>

    // borderColor doesn<span class="hljs-symbol">'t</span> fit in standard fx.step above.
    $.Tween.propHooks.borderColor = {
        set: function(<span class="hljs-name">tween</span>) {
            var style = tween.elem.style<span class="hljs-comment">;</span>
            var p_begin = []<span class="hljs-comment">;</span>
            var borders = properties.slice(<span class="hljs-name">2</span>, <span class="hljs-number">6</span>)<span class="hljs-comment">; // All four border properties</span>
            $.each(<span class="hljs-name">borders</span>, function(<span class="hljs-name">i</span>, property) {
                p_begin[<span class="hljs-name">property</span>] = parseColor(<span class="hljs-name">$</span>(<span class="hljs-name">tween.elem</span>).css(<span class="hljs-name">property</span>))<span class="hljs-comment">;</span>
            })<span class="hljs-comment">;</span>
            var p_end = parseColor(<span class="hljs-name">tween.end</span>)<span class="hljs-comment">;</span>
            tween.run = function(<span class="hljs-name">progress</span>) {
                $.each(<span class="hljs-name">borders</span>, function(<span class="hljs-name">i</span>, property) {
                    style[<span class="hljs-name">property</span>] = calculateColor(<span class="hljs-name">p_begin</span>[<span class="hljs-name">property</span>], p_end, progress)<span class="hljs-comment">;</span>
                })<span class="hljs-comment">;</span>
            }
        }
    }

    // Calculate an in-between color. Returns <span class="hljs-string">"#aabbcc"</span>-like string.
    function calculateColor(<span class="hljs-name"><span class="hljs-builtin-name">begin</span></span>, end, pos) {
        var color = <span class="hljs-symbol">'rgb</span>' + (<span class="hljs-name">$.support</span>[<span class="hljs-symbol">'rgba</span>'] ? <span class="hljs-symbol">'a</span>' : '') + '('
                + parseInt((begin[<span class="hljs-number">0</span>] + pos * (end[<span class="hljs-number">0</span>] - begin[<span class="hljs-number">0</span>])), <span class="hljs-number">10</span>) + ','
                + parseInt((begin[<span class="hljs-number">1</span>] + pos * (end[<span class="hljs-number">1</span>] - begin[<span class="hljs-number">1</span>])), <span class="hljs-number">10</span>) + ','
                + parseInt((begin[<span class="hljs-number">2</span>] + pos * (end[<span class="hljs-number">2</span>] - begin[<span class="hljs-number">2</span>])), <span class="hljs-number">10</span>);
        if ($.support[<span class="hljs-symbol">'rgba</span>']) {
            color += ',' + (begin &amp;&amp; end ? parseFloat(begin[<span class="hljs-number">3</span>] + pos * (end[<span class="hljs-number">3</span>] - begin[<span class="hljs-number">3</span>])) : <span class="hljs-number">1</span>);
        }
        color += ')'<span class="hljs-comment">;</span>
        return color<span class="hljs-comment">;</span>
    }

    // Parse an CSS-syntax color. Outputs an array [<span class="hljs-name">r</span>, g, b]
    function parseColor(<span class="hljs-name">color</span>) {
        var match, triplet<span class="hljs-comment">;</span>

        // Match #aabbcc
        if (<span class="hljs-name">match</span> = /#([<span class="hljs-name">0-9a-fA-F</span>]{<span class="hljs-number">2</span>})([<span class="hljs-name">0-9a-fA-F</span>]{<span class="hljs-number">2</span>})([<span class="hljs-name">0-9a-fA-F</span>]{<span class="hljs-number">2</span>})/.exec(<span class="hljs-name">color</span>)) {
            triplet = [<span class="hljs-name">parseInt</span>(<span class="hljs-name">match</span>[<span class="hljs-name">1</span>], <span class="hljs-number">16</span>), parseInt(<span class="hljs-name">match</span>[<span class="hljs-name">2</span>], <span class="hljs-number">16</span>), parseInt(<span class="hljs-name">match</span>[<span class="hljs-name">3</span>], <span class="hljs-number">16</span>), <span class="hljs-number">1</span>]<span class="hljs-comment">;</span>

            // Match #abc
        } else if (<span class="hljs-name">match</span> = /#([<span class="hljs-name">0-9a-fA-F</span>])([<span class="hljs-name">0-9a-fA-F</span>])([<span class="hljs-name">0-9a-fA-F</span>])/.exec(<span class="hljs-name">color</span>)) {
            triplet = [<span class="hljs-name">parseInt</span>(<span class="hljs-name">match</span>[<span class="hljs-name">1</span>], <span class="hljs-number">16</span>) * <span class="hljs-number">17</span>, parseInt(<span class="hljs-name">match</span>[<span class="hljs-name">2</span>], <span class="hljs-number">16</span>) * <span class="hljs-number">17</span>, parseInt(<span class="hljs-name">match</span>[<span class="hljs-name">3</span>], <span class="hljs-number">16</span>) * <span class="hljs-number">17</span>, <span class="hljs-number">1</span>]<span class="hljs-comment">;</span>

            // Match rgb(<span class="hljs-name">n</span>, n, n)
        } else if (<span class="hljs-name">match</span> = /rgb\(\s*([<span class="hljs-name">0-9</span>]{<span class="hljs-number">1</span>,<span class="hljs-number">3</span>})\s*,\s*([<span class="hljs-name">0-9</span>]{<span class="hljs-number">1</span>,<span class="hljs-number">3</span>})\s*,\s*([<span class="hljs-name">0-9</span>]{<span class="hljs-number">1</span>,<span class="hljs-number">3</span>})\s*\)/.exec(<span class="hljs-name">color</span>)) {
            triplet = [<span class="hljs-name">parseInt</span>(<span class="hljs-name">match</span>[<span class="hljs-name">1</span>]), parseInt(<span class="hljs-name">match</span>[<span class="hljs-name">2</span>]), parseInt(<span class="hljs-name">match</span>[<span class="hljs-name">3</span>]), <span class="hljs-number">1</span>]<span class="hljs-comment">;</span>

        } else if (<span class="hljs-name">match</span> = /rgba\(\s*([<span class="hljs-name">0-9</span>]{<span class="hljs-number">1</span>,<span class="hljs-number">3</span>})\s*,\s*([<span class="hljs-name">0-9</span>]{<span class="hljs-number">1</span>,<span class="hljs-number">3</span>})\s*,\s*([<span class="hljs-name">0-9</span>]{<span class="hljs-number">1</span>,<span class="hljs-number">3</span>})\s*,\s*([<span class="hljs-name">0-9</span>\.]*)\s*\)/.exec(<span class="hljs-name">color</span>)) {
            triplet = [<span class="hljs-name">parseInt</span>(<span class="hljs-name">match</span>[<span class="hljs-name">1</span>], <span class="hljs-number">10</span>), parseInt(<span class="hljs-name">match</span>[<span class="hljs-name">2</span>], <span class="hljs-number">10</span>), parseInt(<span class="hljs-name">match</span>[<span class="hljs-name">3</span>], <span class="hljs-number">10</span>),parseFloat(<span class="hljs-name">match</span>[<span class="hljs-name">4</span>])]<span class="hljs-comment">;</span>

            // No browser returns rgb(<span class="hljs-name">n%</span>, n%, n%), so little reason to support this format.
        }
        return triplet<span class="hljs-comment">;</span>
    }
})(<span class="hljs-name">jQuery</span>)<span class="hljs-comment">;</span></code></pre>
<p>官网地址：<a href="https://bitstorm.org/jquery/color-animation/" rel="nofollow noreferrer" target="_blank">https://bitstorm.org/jquery/color-animation/</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
〔总结〕JQ常见效果整理汇总资料

## 原文链接
[https://segmentfault.com/a/1190000012605961](https://segmentfault.com/a/1190000012605961)

