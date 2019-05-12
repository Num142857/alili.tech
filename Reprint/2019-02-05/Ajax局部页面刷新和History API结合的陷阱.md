---
title: 'Ajax局部页面刷新和History API结合的陷阱' 
date: 2019-02-05 2:30:09
hidden: true
slug: oe3y59qcal
categories: [reprint]
---

{{< raw >}}

                    
<p>ajax在现代网站已经得到非常普遍地应用，主要的好处大家都知道（异步加载数据，不用刷新整个浏览器，更小的数据传输尺寸）。对于那些老网站或者老项目来说全盘改造成ajax并不现实，于是就有了“局部页面刷新”这个解决方案。如果不知道“局部页面刷新”是何物请看<a href="http://msdn.microsoft.com/en-us/library/bb386573%5C%28v=vs.140%5C%29.aspx" rel="nofollow noreferrer" target="_blank">这里</a>，<a href="http://api.jquery.com/load/" rel="nofollow noreferrer" target="_blank">这里</a>和<a href="http://amberonrails.com/ajax-partial-loading/" rel="nofollow noreferrer" target="_blank">这里</a>。</p>
<p>在我们的项目里，将原来的<code>iframe</code>或者<code>frame</code>统统替换成了时髦的<code>div</code>，然后修改了页面上所有发起请求的地方，把响应内容<code>jQuery.load</code>到<code>div</code>里。</p>
<p>于是乎原来老旧的网站变成了一个时髦的基于ajax的网站，每个页面传输的数据量变小了，再也不用解决令人头疼的:</p>
<ol>
<li><p>为了消除滚动条让<a href="http://www.codeproject.com/Articles/19499/How-To-Adjust-IFrame-Height-on-Its-Content" rel="nofollow noreferrer" target="_blank">iframe自适应大小</a></p></li>
<li><p><a href="http://stackoverflow.com/questions/14941504/how-to-access-parent-window-javascript-variable-inside-child-windowpop-up" rel="nofollow noreferrer" target="_blank">如何访问parent window变量</a>的问题(还有如何访问parent的parent的parent... window变量的问题)</p></li>
<li><p><a href="http://stackoverflow.com/questions/14366841/accessing-javascript-variable-in-an-iframe-from-the-parent-window-on-same-domai" rel="nofollow noreferrer" target="_blank">如何访问child iframe里的变量</a>[]的问题了(还有如何访问child的child的child... iframe里的变量的问题)</p></li>
</ol>
<p>因为大家永远都在同一个window里，而且div本身就会根据内容自动撑大。但是等等！浏览器怎么不能后退了？</p>
<p>我们的那个项目是一个满大街可见的<strong><em>XX管理信息系统</em></strong>，这种系统最常见的布局就是左侧一个树形菜单区域，右侧是一个功能区域，功能区域里有一个查询条件区域（里面有个查询按钮），还有一个空白的区域用来显示查询结果，同时是用户操作数据的地方（比如form表单）。</p>
<p>在iframe时代，上面讲到的4个区域都是一个iframe，这也就意味着我们可以有很变态的后退能力。<br>当然了一般来说用户最常用的就是对操作区域做后退动作，比如查询一下，选择一条记录点击修改，看到form表单，修改一下，在点击保存前后悔了，点击浏览器的后退，回到查询结果页面。</p>
<p>但是在引入了ajax后无法后退了，因为ajax请求不会记录到浏览器历史里，历史都没有了自然就无法后退了。</p>
<p>好在Html5的History API能够帮助我们解决问题。我们可以人为的使用<code>history.pushState</code>来人造历史信息，并且通过监听<code>popstate</code>事件来知道用户点击了浏览器后退或前进按钮，然后将页面元素还原到历史上的某个状态。关于Html5 History API的相关信息可以看<a href="http://diveintohtml5.info/history.html" rel="nofollow noreferrer" target="_blank">这里</a>。</p>
<p>但是事情远不止这么简单，下面是我们遇到的一些坑：</p>
<h2 id="articleHeader0">陷阱1：重复执行js脚本</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 点击查询按钮的时候人为构造一个浏览器历史
$('#some-button').click(function() {
  $(targetSelector).load(url);

  history.pushState({
    container : targetSelector,
    content   : $(targetSelector).html()
  }, null, url);

});

// 当浏览器后退后者前进的时候，我们把当时的结果重新加载到container里来
window.addEventListener('popstate', function() {
  var state = history.state
  $(state.container).html(state.content);
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 点击查询按钮的时候人为构造一个浏览器历史</span>
$(<span class="hljs-string">'#some-button'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  $(targetSelector).load(url);

  history.pushState({
    <span class="hljs-attr">container</span> : targetSelector,
    <span class="hljs-attr">content</span>   : $(targetSelector).html()
  }, <span class="hljs-literal">null</span>, url);

});

<span class="hljs-comment">// 当浏览器后退后者前进的时候，我们把当时的结果重新加载到container里来</span>
<span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">'popstate'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> state = history.state
  $(state.container).html(state.content);
})</code></pre>
<p>一切看上去都OK，直到...我们发现局部页面刷新所获得的结果里包含了操作dom元素的js。</p>
<p>当遇到这种情况时会发生很奇妙的现象，history state.content是已经加载完毕+js执行后的结果，当我们重新还原的时候，我们会把这个结果加载出来，<strong>并且又会执行一遍js</strong>。如果这个js是一个添加dom的动作那么在后退的时候你会看到这个重复的dom元素。</p>
<p>我们想过跟踪哪些dom元素是被js修改过的来避免这个问题，但是...这是不现实的。</p>
<h2 id="articleHeader1">陷阱2：无法还原到最初状态</h2>
<p>前面的方案因为load的内容里可能有js脚本所以有严重缺陷，于是我们换了个思路，history里保存responseText，而不是已经load好后的东西。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 点击查询按钮的时候人为构造一个浏览器历史
$('#some-button').click(function() {
  $(targetSelector).load(url, function(responseText) {
    history.pushState({
      container : targetSelector,
      content   : responseText
    }, null, url);
  });
});

// popstate事件的处理方式一样" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 点击查询按钮的时候人为构造一个浏览器历史</span>
$(<span class="hljs-string">'#some-button'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  $(targetSelector).load(url, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">responseText</span>) </span>{
    history.pushState({
      <span class="hljs-attr">container</span> : targetSelector,
      <span class="hljs-attr">content</span>   : responseText
    }, <span class="hljs-literal">null</span>, url);
  });
});

<span class="hljs-comment">// popstate事件的处理方式一样</span></code></pre>
<p>但是仍然遇到了这么一个问题，如果container（刷新目标区域，某个div）原来是有内容的，而这个内容不是通过ajax局部页面刷新而来，而是用户一进入这个页面就已经有的，比如使用服务器端的模板引擎生成的页面，那么在它加载完html片段后就无法回退了。因为它的内容一开始就不在history里（事实上浏览器自己产生的history是没有state的），这样就形成了退无可退的局面。</p>
<p>如果你想，我们只要保存这个container原来的内容不就行了，当后退的时候我们直接恢复它原来的内容，但是请看<strong>陷阱1</strong></p>
<p>不过当发生退无可退的情况时，我们认为已经退回到了第一次进入页面的状态，这个时候我们刷新整个页面就行了。</p>
<h2 id="articleHeader2">陷阱3：多个并列的container</h2>
<p>陷阱2的解决方案实际上是基于container之间是属于嵌套关系或者就一个container的情况的。如果是这种情况就不行了：</p>
<p>有A和B两个container，点击某个按钮刷新了A的内容（产生历史），然后在点击某个按钮刷新的B的按钮（产生历史），按照用户的预想情况，第一次后退还原B原来的内容，第二次后退还原A原来的内容。但实际上，第一次后退无法还原B的内容（陷阱2），第二次后退页面刷新了（一切恢复最初的样子）。</p>
<p>如果B是嵌套在A里的就无所谓了，第一次后退的时候获得的是A的state，根据A的state还原A的内容的时候顺便把B也还原了，第二次后退页面刷新，把A也还原了。</p>
<p>而且根据<strong>陷阱1</strong>所讲，我们也不能在history里存储A或者B里原来的内容。</p>
<p>解决办法：对于这种操作就不要记录历史了。</p>
<h2 id="articleHeader3">陷阱4：看到过时页面</h2>
<p>我们在History state里存的是当时load时的responseText，当我们后退的时候看到的是过时的页面，比如我们原先查询结果里看到有A记录，然后我们跳转到其他页面里，然后再后退到查询结果页面看到A记录还在，但是这个A记录很可能只是一个幽灵，在数据库里早就已经不存在了。如果我们这个时候再对A记录操作就有出现错误。</p>
<p>解决办法是我们在history state里保存url已经相关的参数，当popstate的时候重新发起请求就行了，这样一来的话也减少了history存储state所需要的空间。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 这里只给get请求的例子，post的原理也差不多
$('#some-button').click(function() {
  $(targetSelector).load(url, function(responseText) {
    history.pushState({
      container : targetSelector,
      url       : url
    }, null, url);
  });
});

window.addEventListener('popstate', function() {
  var state = history.state;
  $(state.container).load(state.url);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 这里只给get请求的例子，post的原理也差不多</span>
$(<span class="hljs-string">'#some-button'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  $(targetSelector).load(url, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">responseText</span>) </span>{
    history.pushState({
      <span class="hljs-attr">container</span> : targetSelector,
      <span class="hljs-attr">url</span>       : url
    }, <span class="hljs-literal">null</span>, url);
  });
});

<span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">'popstate'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> state = history.state;
  $(state.container).load(state.url);
});</code></pre>
<h2 id="articleHeader4">陷阱5：redirect</h2>
<p>即使我们在history state保存了url你就以为没事了？too simple, too naive！如果我们对这个url发起的请求被服务器redirect到另一个url，那么在history state里保存这个url就不对了。</p>
<p>如果我们这个url是用来删除某条记录的，服务器收到请求在数据库里删除了这条记录，然后redirect到了首页url，那么这个时候你在history里应该存那个url呢？显然是首页的url，因为如果你存了删除url，那么在后退的时候，我们会重新发起这个url，想想这多吓人。</p>
<p>解决办法其实不太简单，因为ajax是否被redirect你是不知道的，用jQuery封装的jqXHR对象也没法知道这个。</p>
<p>也许<a href="https://xhr.spec.whatwg.org/#the-responseurl-attribute" rel="nofollow noreferrer" target="_blank">链WHATWG的XmlHttpRequest.responseURL</a>可以救你，但是浏览器兼容性不好。</p>
<p>我的做法在服务器<code>sendRedirect</code>之前在<code>requestUrl</code>的<code>queryString</code>里添加一个flag，用一个专门的servlet filter判断过来的请求是否有这个flag，如果有那么就将本次请求的url（也就是redirect到的url）放到<code>response</code>的一个特定的header里。然后就可以用<code>jqXHR.getResponseHeader('some-header')</code>来获得这个url，把这个url放到history state里。</p>
<h2 id="articleHeader5">陷阱6：无法精确还原dom对象的状态</h2>
<p>不论是保存responseText还是保存url请求参数，都无法在浏览器后退的时候精确还原dom对象的状态，比如我在IE6里有个这样的特性，你在某个页面勾选了某个checkbox，然后跳转到一个新的页面然后再后退，那个checkbox还是处于勾选状态，这个在利用ajax局部页面刷新里是完全做不到的，想到用户和我说以前后退的时候那个勾还在现在勾没有了，不解决这个BUG就不验收的事情时才想到iframe的好啊。</p>
<p>所以如果要精确还原dom对象的状态，得在history.pushState的时候自行把相关信息保存下来，在popstate的时候用到这些信息并还原dom。</p>
<p>事实上即使用了iframe也并不是所有的浏览器会还原dom对象状态，看<a href="https://segmentfault.com/n/1330000006240399">这篇文章</a>。</p>
<h2 id="articleHeader6">总结</h2>
<ol>
<li><p>不要轻易从iframe切换到ajax局部页面刷新</p></li>
<li><p>要自己控制那些ajax局部页面刷新纪录历史，哪些不记录，有些时候可能还需要replaceState，不要想当然的把所有请求都记录历史</p></li>
<li><p>把代码改造成ajax局部页面刷新只是第一步，还需要对整个网站、应用的UI做规划和设计，关于这个问题不存在通用的解决方案</p></li>
</ol>
<h2 id="articleHeader7">参考资料</h2>
<ul>
<li><p><a href="http://diveintohtml5.info/history.html" rel="nofollow noreferrer" target="_blank">MANIPULATING HISTORY FOR FUN &amp; PROFIT</a></p></li>
<li><p><a href="https://html.spec.whatwg.org/multipage/browsers.html#history" rel="nofollow noreferrer" target="_blank">Session history and navigation</a></p></li>
<li><p><a href="https://developer.mozilla.org/en/DOM/Manipulating_the_browser_history" rel="nofollow noreferrer" target="_blank">Manipulating the browser history</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Ajax局部页面刷新和History API结合的陷阱

## 原文链接
[https://segmentfault.com/a/1190000006240654](https://segmentfault.com/a/1190000006240654)

