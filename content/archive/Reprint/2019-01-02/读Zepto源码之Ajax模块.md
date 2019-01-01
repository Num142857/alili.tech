---
title: '读Zepto源码之Ajax模块' 
date: 2019-01-02 2:30:09
hidden: true
slug: 2scu7p55bb9
categories: [reprint]
---

{{< raw >}}

                    
<p><code>Ajax</code> 模块也是经常会用到的模块，<code>Ajax</code> 模块中包含了 <code>jsonp</code> 的现实，和 <code>XMLHttpRequest</code> 的封装。 </p>
<p>读 Zepto 源码系列文章已经放到了github上，欢迎star: <a href="https://github.com/yeyuqiudeng/reading-zepto" rel="nofollow noreferrer" target="_blank">reading-zepto</a></p>
<h2 id="articleHeader0">源码版本</h2>
<p>本文阅读的源码为 <a href="https://github.com/madrobby/zepto/tree/v1.2.0" rel="nofollow noreferrer" target="_blank">zepto1.2.0</a></p>
<h2 id="articleHeader1">ajax的事件触发顺序</h2>
<p><code>zepto</code> 针对 <code>ajax</code> 的发送过程，定义了以下几个事件，正常情况下的触发顺序如下：</p>
<ol>
<li>
<code>ajaxstart</code> : <code>XMLHttpRequest</code> 实例化前触发</li>
<li>
<code>ajaxBeforeSend</code>： 发送 <code>ajax</code> 请求前触发</li>
<li>
<code>ajaxSend</code> : 发送 <code>ajax</code> 请求时触发</li>
<li>
<code>ajaxSuccess</code> / <code>ajaxError</code> : 请求成功/失败时触发</li>
<li>
<code>ajaxComplete</code>： 请求完成（无论成功还是失败）时触发</li>
<li>
<code>ajaxStop</code>: 请求完成后触发，这个事件在 <code>ajaxComplete</code> 后触发。</li>
</ol>
<h3 id="articleHeader2">ajax 方法的参数解释</h3>
<p>现在还没有讲到 <code>ajax</code> 方法，之所以要将参数提前，是因为后面的内容，不时会用到相关的参数，所以一开始先将参数解释清楚。</p>
<ul>
<li>
<code>type</code>： <code>HTTP</code> 请求的类型；</li>
<li>
<code>url</code>: 请求的路径；</li>
<li>
<code>data</code>： 请求参数；</li>
<li>
<code>processData</code>: 是否需要将非 <code>GET</code> 请求的参数转换成字符串，默认为 <code>true</code> ，即默认转换成字符串；</li>
<li>
<code>contentType</code>: 设置 <code>Content-Type</code> 请求头；</li>
<li>
<code>mineType</code> ： 覆盖响应的 <code>MIME</code> 类型，可以是 <code>json</code>、 <code>jsonp</code>、 <code>script</code>、 <code>xml</code>、 <code>html</code>、 或者 <code>text</code>；</li>
<li>
<code>jsonp</code>:  <code>jsonp</code> 请求时，携带回调函数名的参数名，默认为 <code>callback</code>；</li>
<li>
<code>jsonpCallback</code>： <code>jsonp</code> 请求时，响应成功时，执行的回调函数名，默认由 <code>zepto</code> 管理；</li>
<li>
<code>timeout</code>: 超时时间，默认为 <code>0</code>；</li>
<li>
<code>headers</code>：设置 <code>HTTP</code> 请求头；</li>
<li>
<code>async</code>： 是否为同步请求，默认为 <code>false</code>；</li>
<li>
<code>global</code>： 是否触发全局 <code>ajax</code> 事件，默认为 <code>true</code>；</li>
<li>
<code>context</code>： 执行回调时（如 <code>jsonpCallbak</code>）时的上下文环境，默认为 <code>window</code>。</li>
<li>
<code>traditional</code>: 是否使用传统的浅层序列化方式序列化 <code>data</code> 参数，默认为 <code>false</code>，例如有 <code>data</code> 为 <code>{p1:'test1', p2: {nested: 'test2'}</code> ，在 <code>traditional</code> 为 <code>false</code> 时，会序列化成 <code>p1=test1&amp;p2[nested]=test2</code>， 在为 <code>true</code> 时，会序列化成 <code>p1=test&amp;p2=[object+object]</code>；</li>
<li>
<code>xhrFields</code>：<code>xhr</code> 的配置；</li>
<li>
<code>cache</code>：是否允许浏览器缓存 <code>GET</code> 请求，默认为 <code>false</code>；</li>
<li>
<code>username</code>：需要认证的 <code>HTTP</code> 请求的用户名；</li>
<li>
<code>password</code>： 需要认证的 <code>HTTP</code> 请求的密码；</li>
<li>
<code>dataFilter</code>： 对响应数据进行过滤；</li>
<li>
<code>xhr</code>： <code>XMLHttpRequest</code> 实例，默认用 <code>new XMLHttpRequest()</code> 生成；</li>
<li>
<code>accepts</code>：从服务器请求的 <code>MIME</code> 类型；</li>
<li>
<code>beforeSend</code>： 请求发出前调用的函数；</li>
<li>
<code>success</code>: 请求成功后调用的函数；</li>
<li>
<code>error</code>： 请求出错时调用的函数；</li>
<li>
<code>complete</code>： 请求完成时调用的函数，无论请求是失败还是成功。</li>
</ul>
<h2 id="articleHeader3">内部方法</h2>
<h3 id="articleHeader4">triggerAndReturn</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function triggerAndReturn(context, eventName, data) {
  var event = $.Event(eventName)
  $(context).trigger(event, data)
  return !event.isDefaultPrevented()
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">triggerAndReturn</span>(<span class="hljs-params">context, eventName, data</span>) </span>{
  <span class="hljs-keyword">var</span> event = $.Event(eventName)
  $(context).trigger(event, data)
  <span class="hljs-keyword">return</span> !event.isDefaultPrevented()
}</code></pre>
<p><code>triggerAndReturn</code> 用来触发一个事件，并且如果该事件禁止浏览器默认事件时，返回 <code>false</code>。</p>
<p>参数 <code>context</code> 为上下文，<code>eventName</code> 为事件名，<code>data</code> 为数据。</p>
<p>该方法内部调用了 <code>Event</code> 模块的 <code>trigger</code> 方法，具体分析见《<a href="https://github.com/yeyuqiudeng/reading-zepto/blob/master/src/%E8%AF%BBZepto%E6%BA%90%E7%A0%81%E4%B9%8BEvent%E6%A8%A1%E5%9D%97.md#trigger" rel="nofollow noreferrer" target="_blank">读Zepto源码之Event模块</a>》。</p>
<h3 id="articleHeader5">triggerGlobal</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function triggerGlobal(settings, context, eventName, data) {
  if (settings.global) return triggerAndReturn(context || document, eventName, data)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">triggerGlobal</span>(<span class="hljs-params">settings, context, eventName, data</span>) </span>{
  <span class="hljs-keyword">if</span> (settings.global) <span class="hljs-keyword">return</span> triggerAndReturn(context || <span class="hljs-built_in">document</span>, eventName, data)
}</code></pre>
<p>触发全局事件</p>
<p><code>settings</code> 为 <code>ajax</code> 配置，<code>context</code> 为指定的上下文对象，<code>eventName</code> 为事件名，<code>data</code> 为数据。</p>
<p><code>triggerGlobal</code> 内部调用的是 <code>triggerAndReturn</code> 方法，如果有指定上下文对象，则在指定的上下文对象上触发，否则在 <code>document</code> 上触发。</p>
<h3 id="articleHeader6">ajaxStart</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function ajaxStart(settings) {
  if (settings.global &amp;&amp; $.active++ === 0) triggerGlobal(settings, null, 'ajaxStart')
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ajaxStart</span>(<span class="hljs-params">settings</span>) </span>{
  <span class="hljs-keyword">if</span> (settings.global &amp;&amp; $.active++ === <span class="hljs-number">0</span>) triggerGlobal(settings, <span class="hljs-literal">null</span>, <span class="hljs-string">'ajaxStart'</span>)
}</code></pre>
<p>触发全局的 <code>ajaxStart</code> 事件。</p>
<p>如果 <code>global</code> 设置为 <code>true</code>，则 <code>$.active</code> 的值增加1。</p>
<p>如果 <code>global</code> 为 <code>true</code> ，并且 <code>$.active</code> 在更新前的数量为 <code>0</code>，则触发全局的 <code>ajaxStart</code> 事件。</p>
<h3 id="articleHeader7">ajaxStop</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function ajaxStop(settings) {
  if (settings.global &amp;&amp; !(--$.active)) triggerGlobal(settings, null, 'ajaxStop')
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ajaxStop</span>(<span class="hljs-params">settings</span>) </span>{
  <span class="hljs-keyword">if</span> (settings.global &amp;&amp; !(--$.active)) triggerGlobal(settings, <span class="hljs-literal">null</span>, <span class="hljs-string">'ajaxStop'</span>)
}</code></pre>
<p>触发全局 <code>ajaxStop</code> 事件。</p>
<p>如果 <code>global</code> 为 <code>true</code> ，则将 <code>$.active</code> 的数量减少 <code>1</code>。如果 <code>$.active</code> 的数量减少至 <code>0</code>，即没有在执行中的 <code>ajax</code> 请求时，触发全局的 <code>ajaxStop</code> 事件。</p>
<h3 id="articleHeader8">ajaxBeforeSend</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function ajaxBeforeSend(xhr, settings) {
  var context = settings.context
  if (settings.beforeSend.call(context, xhr, settings) === false ||
      triggerGlobal(settings, context, 'ajaxBeforeSend', [xhr, settings]) === false)
    return false

  triggerGlobal(settings, context, 'ajaxSend', [xhr, settings])
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ajaxBeforeSend</span>(<span class="hljs-params">xhr, settings</span>) </span>{
  <span class="hljs-keyword">var</span> context = settings.context
  <span class="hljs-keyword">if</span> (settings.beforeSend.call(context, xhr, settings) === <span class="hljs-literal">false</span> ||
      triggerGlobal(settings, context, <span class="hljs-string">'ajaxBeforeSend'</span>, [xhr, settings]) === <span class="hljs-literal">false</span>)
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>

  triggerGlobal(settings, context, <span class="hljs-string">'ajaxSend'</span>, [xhr, settings])
}</code></pre>
<p><code>ajaxBeforeSend</code> 方法，触发 <code>ajaxBeforeSend</code> 事件和 <code>ajaxSend</code> 事件。</p>
<p>这两个事件很相似，只不过 <code>ajaxBeforedSend</code> 事件可以通过外界的配置来取消事件的触发。</p>
<p>在触发 <code>ajaxBeforeSend</code> 事件之前，会调用配置中的 <code>beforeSend</code> 方法，如果 <code>befoeSend</code> 方法返回的为 <code>false</code>时，则取消触发 <code>ajaxBeforeSend</code> 事件，并且会取消后续 <code>ajax</code> 请求的发送，后面会讲到。</p>
<p>否则触发 <code>ajaxBeforeSend</code> 事件，并且将 <code>xhr</code> 事件，和配置 <code>settings</code> 作为事件携带的数据。</p>
<p>注意这里很巧妙地使用了 <code>||</code> 进行断路。</p>
<p>如果 <code>beforeSend</code> 返回的为 <code>false</code> 或者触发<code>ajaxBeforeSend</code> 事件的方法 <code>triggerGlobal</code> 返回的为 <code>false</code>，也即取消了浏览器的默认行为，则 <code>ajaxBeforeSend</code> 方法返回 <code>false</code>，中止后续的执行。</p>
<p>否则在触发完 <code>ajaxBeforeSend</code> 事件后，触发 <code>ajaxSend</code> 事件。</p>
<h3 id="articleHeader9">ajaxComplete</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function ajaxComplete(status, xhr, settings) {
  var context = settings.context
  settings.complete.call(context, xhr, status)
  triggerGlobal(settings, context, 'ajaxComplete', [xhr, settings])
  ajaxStop(settings)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ajaxComplete</span>(<span class="hljs-params">status, xhr, settings</span>) </span>{
  <span class="hljs-keyword">var</span> context = settings.context
  settings.complete.call(context, xhr, status)
  triggerGlobal(settings, context, <span class="hljs-string">'ajaxComplete'</span>, [xhr, settings])
  ajaxStop(settings)
}</code></pre>
<p>触发 <code>ajaxComplete</code> 事件。</p>
<p>在触发 <code>ajaxComplete</code> 事件前，调用配置中的 <code>complete</code> 方法，将 <code>xhr</code> 实例和当前的状态 <code>state</code> 作为回调函数的参数。在触发完 <code>ajaxComplete</code> 事件后，调用 <code>ajaxStop</code> 方法，触发 <code>ajaxStop</code> 事件。</p>
<h3 id="articleHeader10">ajaxSuccess</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function ajaxSuccess(data, xhr, settings, deferred) {
  var context = settings.context, status = 'success'
  settings.success.call(context, data, status, xhr)
  if (deferred) deferred.resolveWith(context, [data, status, xhr])
  triggerGlobal(settings, context, 'ajaxSuccess', [xhr, settings, data])
  ajaxComplete(status, xhr, settings)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ajaxSuccess</span>(<span class="hljs-params">data, xhr, settings, deferred</span>) </span>{
  <span class="hljs-keyword">var</span> context = settings.context, status = <span class="hljs-string">'success'</span>
  settings.success.call(context, data, status, xhr)
  <span class="hljs-keyword">if</span> (deferred) deferred.resolveWith(context, [data, status, xhr])
  triggerGlobal(settings, context, <span class="hljs-string">'ajaxSuccess'</span>, [xhr, settings, data])
  ajaxComplete(status, xhr, settings)
}</code></pre>
<p>触发 <code>ajaxSucess</code> 方法。</p>
<p>在触发 <code>ajaxSuccess</code> 事件前，先调用配置中的 <code>success</code> 方法，将 <code>ajax</code> 返回的数据 <code>data</code> 和当前状态 <code>status</code> 及 <code>xhr</code> 作为回调函数的参数。</p>
<p>如果 <code>deferred</code> 存在，则调用 <code>resoveWith</code> 的方法，因为 <code>deferred</code> 对象，因此在使用 <code>ajax</code> 的时候，可以使用 <code>promise</code> 风格的调用。关于 <code>deferred</code> ，见 《<a href="https://github.com/yeyuqiudeng/reading-zepto/blob/master/src/%E8%AF%BBZepto%E6%BA%90%E7%A0%81%E4%B9%8BDeferred%E6%A8%A1%E5%9D%97.md" rel="nofollow noreferrer" target="_blank">读Zepto源码之Deferred模块</a>》的分析。 </p>
<p>在触发完 <code>ajaxSuccess</code> 事件后，继续调用 <code>ajaxComplete</code> 方法，触发 <code>ajaxComplete</code> 事件。</p>
<h3 id="articleHeader11">ajaxError</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function ajaxError(error, type, xhr, settings, deferred) {
  var context = settings.context
  settings.error.call(context, xhr, type, error)
  if (deferred) deferred.rejectWith(context, [xhr, type, error])
  triggerGlobal(settings, context, 'ajaxError', [xhr, settings, error || type])
  ajaxComplete(type, xhr, settings)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ajaxError</span>(<span class="hljs-params">error, type, xhr, settings, deferred</span>) </span>{
  <span class="hljs-keyword">var</span> context = settings.context
  settings.error.call(context, xhr, type, error)
  <span class="hljs-keyword">if</span> (deferred) deferred.rejectWith(context, [xhr, type, error])
  triggerGlobal(settings, context, <span class="hljs-string">'ajaxError'</span>, [xhr, settings, error || type])
  ajaxComplete(type, xhr, settings)
}</code></pre>
<p>触发 <code>ajaxError</code> 事件，错误的类型可以为 <code>timeout</code>、<code>error</code>、 <code>abort</code>、 <code>parsererror</code>。</p>
<p>在触发事件前，调用配置中的 <code>error</code> 方法，将 <code>xhr</code> 实例，错误类型 <code>type</code> 和 <code>error</code> 对象作为回调函数的参数。</p>
<p>随后调用 <code>ajaxComplete</code> 方法，触发 <code>ajaxComplete</code> 事件。因此，<code>ajaxComplete</code> 事件无论成功还是失败都会触发。</p>
<h3 id="articleHeader12">empty</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function empty() {}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">empty</span>(<span class="hljs-params"></span>) </span>{}</code></pre>
<p>空函数，用来作为回调函数配置的初始值。这样的好处是在执行回调函数时，不需要每次都判断回调函数是否存在。</p>
<h3 id="articleHeader13">ajaxDataFilter</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function ajaxDataFilter(data, type, settings) {
  if (settings.dataFilter == empty) return data
  var context = settings.context
  return settings.dataFilter.call(context, data, type)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ajaxDataFilter</span>(<span class="hljs-params">data, type, settings</span>) </span>{
  <span class="hljs-keyword">if</span> (settings.dataFilter == empty) <span class="hljs-keyword">return</span> data
  <span class="hljs-keyword">var</span> context = settings.context
  <span class="hljs-keyword">return</span> settings.dataFilter.call(context, data, type)
}</code></pre>
<p>主要用来过滤请求成功后的响应数据。</p>
<p>如果配置中的 <code>dataFilter</code> 属性为初始值 <code>empty</code>，则将原始数据返回。</p>
<p>如果有配置 <code>dataFilter</code>，则调用配置的回调方法，将数据 <code>data</code> 和数据类型 <code>type</code> 作为回调的参数，再将执行的结果返回。</p>
<h3 id="articleHeader14">mimeToDataType</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var htmlType = 'text/html',
    jsonType = 'application/json',
    scriptTypeRE = /^(?:text|application)\/javascript/i,
    xmlTypeRE = /^(?:text|application)\/xml/i,
function mimeToDataType(mime) {
  if (mime) mime = mime.split(';', 2)[0]
  return mime &amp;&amp; ( mime == htmlType ? 'html' :
                  mime == jsonType ? 'json' :
                  scriptTypeRE.test(mime) ? 'script' :
                  xmlTypeRE.test(mime) &amp;&amp; 'xml' ) || 'text'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> htmlType = <span class="hljs-string">'text/html'</span>,
    jsonType = <span class="hljs-string">'application/json'</span>,
    scriptTypeRE = <span class="hljs-regexp">/^(?:text|application)\/javascript/i</span>,
    xmlTypeRE = <span class="hljs-regexp">/^(?:text|application)\/xml/i</span>,
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mimeToDataType</span>(<span class="hljs-params">mime</span>) </span>{
  <span class="hljs-keyword">if</span> (mime) mime = mime.split(<span class="hljs-string">';'</span>, <span class="hljs-number">2</span>)[<span class="hljs-number">0</span>]
  <span class="hljs-keyword">return</span> mime &amp;&amp; ( mime == htmlType ? <span class="hljs-string">'html'</span> :
                  mime == jsonType ? <span class="hljs-string">'json'</span> :
                  scriptTypeRE.test(mime) ? <span class="hljs-string">'script'</span> :
                  xmlTypeRE.test(mime) &amp;&amp; <span class="hljs-string">'xml'</span> ) || <span class="hljs-string">'text'</span>
}</code></pre>
<p>返回 <code>dataType</code> 的类型。</p>
<p>先看看这个函数中使用到的几个正则表达式，<code>scriptTypeRE</code> 匹配的是 <code>text/javascript</code> 或者 <code>application/javascript</code>， <code>xmlTypeRE</code> 匹配的是 <code>text/xml</code> 或者 <code>application/xml</code>， 都还比较简单，不作过多的解释。</p>
<p><code>Content-Type</code> 的值的形式如下 <code>text/html; charset=utf-8</code>， 所以如果参数 <code>mime</code> 存在，则用 <code>;</code> 分割，取第一项，这里是 <code>text/html</code>，即为包含类型的字符串。</p>
<p>接下来是针对 <code>html</code> 、<code>json</code>、 <code>script</code> 和  <code>xml</code> 用对应的正则进行匹配，匹配成功，返回对应的类型值，如果都不匹配，则返回 <code>text</code>。</p>
<h3 id="articleHeader15">appendQuery</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function appendQuery(url, query) {
  if (query == '') return url
  return (url + '&amp;' + query).replace(/[&amp;?]{1,2}/, '?')
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">appendQuery</span>(<span class="hljs-params">url, query</span>) </span>{
  <span class="hljs-keyword">if</span> (query == <span class="hljs-string">''</span>) <span class="hljs-keyword">return</span> url
  <span class="hljs-keyword">return</span> (url + <span class="hljs-string">'&amp;'</span> + query).replace(<span class="hljs-regexp">/[&amp;?]{1,2}/</span>, <span class="hljs-string">'?'</span>)
}</code></pre>
<p>向 <code>url</code> 追加参数。</p>
<p>如果 <code>query</code> 为空，则将原 <code>url</code> 返回。</p>
<p>如果 <code>query</code> 不为空，则用 <code>&amp;</code> 拼接 <code>query</code>。</p>
<p>最后调用 <code>replace</code>，将 <code>&amp;&amp;</code> 、 <code>?&amp;</code> ，<code>&amp;?</code>  或 <code>??</code> 替换成 <code>?</code>。</p>
<p>拼接出来的 <code>url</code> 的形式如 <code>url?key=value&amp;key2=value</code></p>
<h3 id="articleHeader16">parseArguments</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function parseArguments(url, data, success, dataType) {
  if ($.isFunction(data)) dataType = success, success = data, data = undefined
  if (!$.isFunction(success)) dataType = success, success = undefined
  return {
    url: url
    , data: data
    , success: success
    , dataType: dataType
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">parseArguments</span>(<span class="hljs-params">url, data, success, dataType</span>) </span>{
  <span class="hljs-keyword">if</span> ($.isFunction(data)) dataType = success, success = data, data = <span class="hljs-literal">undefined</span>
  <span class="hljs-keyword">if</span> (!$.isFunction(success)) dataType = success, success = <span class="hljs-literal">undefined</span>
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">url</span>: url
    , <span class="hljs-attr">data</span>: data
    , <span class="hljs-attr">success</span>: success
    , <span class="hljs-attr">dataType</span>: dataType
  }
}</code></pre>
<p>这个方法是用来格式化参数的，<code>Ajax</code> 模块定义了一些便捷的调用方法，这些调用方法不需要传递 <code>option</code>，某些必填值已经采用了默认传递的方式，这些方法中有些参数是可以不需要传递的，这个方法就是来用判读那些参数有传递，那些没有传递，然后再将参数拼接成 <code>ajax</code> 所需要的 <code>options</code> 对象。</p>
<h3 id="articleHeader17">serialize</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function serialize(params, obj, traditional, scope){
  var type, array = $.isArray(obj), hash = $.isPlainObject(obj)
  $.each(obj, function(key, value) {
    type = $.type(value)
    if (scope) key = traditional ? scope :
    scope + '[' + (hash || type == 'object' || type == 'array' ? key : '') + ']'
    // handle data in serializeArray() format
    if (!scope &amp;&amp; array) params.add(value.name, value.value)
    // recurse into nested objects
    else if (type == &quot;array&quot; || (!traditional &amp;&amp; type == &quot;object&quot;))
      serialize(params, value, traditional, key)
    else params.add(key, value)
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">serialize</span>(<span class="hljs-params">params, obj, traditional, scope</span>)</span>{
  <span class="hljs-keyword">var</span> type, array = $.isArray(obj), hash = $.isPlainObject(obj)
  $.each(obj, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">key, value</span>) </span>{
    type = $.type(value)
    <span class="hljs-keyword">if</span> (scope) key = traditional ? scope :
    scope + <span class="hljs-string">'['</span> + (hash || type == <span class="hljs-string">'object'</span> || type == <span class="hljs-string">'array'</span> ? key : <span class="hljs-string">''</span>) + <span class="hljs-string">']'</span>
    <span class="hljs-comment">// handle data in serializeArray() format</span>
    <span class="hljs-keyword">if</span> (!scope &amp;&amp; array) params.add(value.name, value.value)
    <span class="hljs-comment">// recurse into nested objects</span>
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (type == <span class="hljs-string">"array"</span> || (!traditional &amp;&amp; type == <span class="hljs-string">"object"</span>))
      serialize(params, value, traditional, key)
    <span class="hljs-keyword">else</span> params.add(key, value)
  })
}</code></pre>
<p>序列化参数。</p>
<p>要了解这个函数，需要了解 <code>traditional</code> 参数的作用，这个参数表示是否开启以传统的浅层序列化方式来进行序列化，具体的示例见上文参数解释部分。</p>
<p>如果参数 <code>obj</code> 的为数组，则 <code>array</code> 为 <code>true</code>， 如果为纯粹对象，则 <code>hash</code> 为 <code>true</code>。 <code>$.isArray</code> 和 <code>$.isPlainObject</code> 的源码分析见《<a href="https://github.com/yeyuqiudeng/reading-zepto/blob/456627c2e8199ac1d043af51177d6159fddd39bc/src/%E8%AF%BBZepto%E6%BA%90%E7%A0%81%E4%B9%8B%E5%86%85%E9%83%A8%E6%96%B9%E6%B3%95.md#isplainobject" rel="nofollow noreferrer" target="_blank">读Zepto源码之内部方法</a>》。</p>
<p>遍历需要序列化的对象 <code>obj</code>，判断 <code>value</code> 的类型 <code>type</code>， 这个 <code>type</code> 后面会用到。</p>
<p><code>scope</code> 是记录深层嵌套时的 <code>key</code> 值，这个 <code>key</code> 值受 <code>traditional</code> 的影响。</p>
<p>如果 <code>traditional</code> 为 <code>true</code> ，则 <code>key</code> 为原始的 <code>scope</code> 值，即对象第一层的 <code>key</code> 值。</p>
<p>否则，用 <code>[]</code> 拼接当前循环中的 <code>key</code> ，最终的 <code>key</code> 值会是这种形式 <code>scope[key][key2]...</code></p>
<p>如果 <code>obj</code> 为数组，并且 <code>scope</code> 不存在，即为第一层，直接调用 <code>params.add</code> 方法，这个方法后面会分析到。</p>
<p>否则如果  <code>value</code> 的类型为数组或者非传统序列化方式下为对象，则递归调用 <code>serialize</code> 方法，用来处理 <code>key</code> 。</p>
<p>其他情况调用 <code>params.add</code> 方法。</p>
<h3 id="articleHeader18">serializeData</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function serializeData(options) {
  if (options.processData &amp;&amp; options.data &amp;&amp; $.type(options.data) != &quot;string&quot;)
    options.data = $.param(options.data, options.traditional)
  if (options.data &amp;&amp; (!options.type || options.type.toUpperCase() == 'GET' || 'jsonp' == options.dataType))
    options.url = appendQuery(options.url, options.data), options.data = undefined
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">serializeData</span>(<span class="hljs-params">options</span>) </span>{
  <span class="hljs-keyword">if</span> (options.processData &amp;&amp; options.data &amp;&amp; $.type(options.data) != <span class="hljs-string">"string"</span>)
    options.data = $.param(options.data, options.traditional)
  <span class="hljs-keyword">if</span> (options.data &amp;&amp; (!options.type || options.type.toUpperCase() == <span class="hljs-string">'GET'</span> || <span class="hljs-string">'jsonp'</span> == options.dataType))
    options.url = appendQuery(options.url, options.data), options.data = <span class="hljs-literal">undefined</span>
}</code></pre>
<p>序列化参数。</p>
<p>如果 <code>processData</code> 为 <code>true</code> ，并且参数 <code>data</code> 不为字符串，则调用 <code>$.params</code> 方法序列化参数。 <code>$.params</code> 方法后面会讲到。</p>
<p>如果为 <code>GET</code> 请求或者为 <code>jsonp</code> ，则调用 <code>appendQuery</code> ，将参数拼接到请求地址后面。</p>
<h2 id="articleHeader19">对外接口</h2>
<h3 id="articleHeader20">$.active</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.active = 0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">$.active = <span class="hljs-number">0</span></code></pre>
<p>正在请求的 <code>ajax</code> 数量，初始时为 <code>0</code>。</p>
<h3 id="articleHeader21">$.ajaxSettings</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.ajaxSettings = {
  // Default type of request
  type: 'GET',
  // Callback that is executed before request
  beforeSend: empty,
  // Callback that is executed if the request succeeds
  success: empty,
  // Callback that is executed the the server drops error
  error: empty,
  // Callback that is executed on request complete (both: error and success)
  complete: empty,
  // The context for the callbacks
  context: null,
  // Whether to trigger &quot;global&quot; Ajax events
  global: true,
  // Transport
  xhr: function () {
    return new window.XMLHttpRequest()
  },
  // MIME types mapping
  // IIS returns Javascript as &quot;application/x-javascript&quot;
  accepts: {
    script: 'text/javascript, application/javascript, application/x-javascript',
    json:   jsonType,
    xml:    'application/xml, text/xml',
    html:   htmlType,
    text:   'text/plain'
  },
  // Whether the request is to another domain
  crossDomain: false,
  // Default timeout
  timeout: 0,
  // Whether data should be serialized to string
  processData: true,
  // Whether the browser should be allowed to cache GET responses
  cache: true,
  //Used to handle the raw response data of XMLHttpRequest.
  //This is a pre-filtering function to sanitize the response.
  //The sanitized response should be returned
  dataFilter: empty
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">$.ajaxSettings = {
  <span class="hljs-comment">// Default type of request</span>
  type: <span class="hljs-string">'GET'</span>,
  <span class="hljs-comment">// Callback that is executed before request</span>
  beforeSend: empty,
  <span class="hljs-comment">// Callback that is executed if the request succeeds</span>
  success: empty,
  <span class="hljs-comment">// Callback that is executed the the server drops error</span>
  error: empty,
  <span class="hljs-comment">// Callback that is executed on request complete (both: error and success)</span>
  complete: empty,
  <span class="hljs-comment">// The context for the callbacks</span>
  context: <span class="hljs-literal">null</span>,
  <span class="hljs-comment">// Whether to trigger "global" Ajax events</span>
  global: <span class="hljs-literal">true</span>,
  <span class="hljs-comment">// Transport</span>
  xhr: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">window</span>.XMLHttpRequest()
  },
  <span class="hljs-comment">// MIME types mapping</span>
  <span class="hljs-comment">// IIS returns Javascript as "application/x-javascript"</span>
  accepts: {
    <span class="hljs-attr">script</span>: <span class="hljs-string">'text/javascript, application/javascript, application/x-javascript'</span>,
    <span class="hljs-attr">json</span>:   jsonType,
    <span class="hljs-attr">xml</span>:    <span class="hljs-string">'application/xml, text/xml'</span>,
    <span class="hljs-attr">html</span>:   htmlType,
    <span class="hljs-attr">text</span>:   <span class="hljs-string">'text/plain'</span>
  },
  <span class="hljs-comment">// Whether the request is to another domain</span>
  crossDomain: <span class="hljs-literal">false</span>,
  <span class="hljs-comment">// Default timeout</span>
  timeout: <span class="hljs-number">0</span>,
  <span class="hljs-comment">// Whether data should be serialized to string</span>
  processData: <span class="hljs-literal">true</span>,
  <span class="hljs-comment">// Whether the browser should be allowed to cache GET responses</span>
  cache: <span class="hljs-literal">true</span>,
  <span class="hljs-comment">//Used to handle the raw response data of XMLHttpRequest.</span>
  <span class="hljs-comment">//This is a pre-filtering function to sanitize the response.</span>
  <span class="hljs-comment">//The sanitized response should be returned</span>
  dataFilter: empty
}</code></pre>
<p><code>ajax</code> 默认配置，这些是 <code>zepto</code> 的默认值，在使用时，可以更改成自己需要的配置。</p>
<h3 id="articleHeader22">$.param</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var escape = encodeURIComponent
$.param = function(obj, traditional){
  var params = []
  params.add = function(key, value) {
    if ($.isFunction(value)) value = value()
    if (value == null) value = &quot;&quot;
    this.push(escape(key) + '=' + escape(value))
  }
  serialize(params, obj, traditional)
  return params.join('&amp;').replace(/%20/g, '+')
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> <span class="hljs-built_in">escape</span> = <span class="hljs-built_in">encodeURIComponent</span>
$.param = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj, traditional</span>)</span>{
  <span class="hljs-keyword">var</span> params = []
  params.add = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">key, value</span>) </span>{
    <span class="hljs-keyword">if</span> ($.isFunction(value)) value = value()
    <span class="hljs-keyword">if</span> (value == <span class="hljs-literal">null</span>) value = <span class="hljs-string">""</span>
    <span class="hljs-keyword">this</span>.push(<span class="hljs-built_in">escape</span>(key) + <span class="hljs-string">'='</span> + <span class="hljs-built_in">escape</span>(value))
  }
  serialize(params, obj, traditional)
  <span class="hljs-keyword">return</span> params.join(<span class="hljs-string">'&amp;'</span>).replace(<span class="hljs-regexp">/%20/g</span>, <span class="hljs-string">'+'</span>)
}</code></pre>
<p><code>param</code> 方法用来序列化参数，内部调用的是 <code>serialize</code> 方法，并且在容器 <code>params</code> 上定义了一个 <code>add</code> 方法，供 <code>serialize</code> 调用。</p>
<p><code>add</code> 方法比较简单，首先判断值 <code>value</code> 是否为 <code>function</code> ，如果是，则通过调用函数来取值，如果为 <code>null</code> 或者 <code>undefined</code> ，则 <code>value</code> 赋值为空字符串。</p>
<p>然后将 <code>key</code> 和 <code>value</code> 用 <code>encodeURIComponent</code> 编码，用 <code>=</code> 号连接起来。</p>
<p>接着便是简单的调用 <code>serialize</code> 方法。</p>
<p>最后将容器中的数据用 <code>&amp;</code> 连接起来，并且将空格替换成 <code>+</code> 号。</p>
<h3 id="articleHeader23">$.ajaxJSONP</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var jsonpID = +new Date()
$.ajaxJSONP = function(options, deferred){
  if (!('type' in options)) return $.ajax(options)

  var _callbackName = options.jsonpCallback,
      callbackName = ($.isFunction(_callbackName) ?
                      _callbackName() : _callbackName) || ('Zepto' + (jsonpID++)),
      script = document.createElement('script'),
      originalCallback = window[callbackName],
      responseData,
      abort = function(errorType) {
        $(script).triggerHandler('error', errorType || 'abort')
      },
      xhr = { abort: abort }, abortTimeout

  if (deferred) deferred.promise(xhr)

  $(script).on('load error', function(e, errorType){
    clearTimeout(abortTimeout)
    $(script).off().remove()

    if (e.type == 'error' || !responseData) {
      ajaxError(null, errorType || 'error', xhr, options, deferred)
    } else {
      ajaxSuccess(responseData[0], xhr, options, deferred)
    }

    window[callbackName] = originalCallback
    if (responseData &amp;&amp; $.isFunction(originalCallback))
      originalCallback(responseData[0])

    originalCallback = responseData = undefined
  })

  if (ajaxBeforeSend(xhr, options) === false) {
    abort('abort')
    return xhr
  }

  window[callbackName] = function(){
    responseData = arguments
  }

  script.src = options.url.replace(/\?(.+)=\?/, '?$1=' + callbackName)
  document.head.appendChild(script)

  if (options.timeout > 0) abortTimeout = setTimeout(function(){
    abort('timeout')
  }, options.timeout)

  return xhr
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> jsonpID = +<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()
$.ajaxJSONP = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">options, deferred</span>)</span>{
  <span class="hljs-keyword">if</span> (!(<span class="hljs-string">'type'</span> <span class="hljs-keyword">in</span> options)) <span class="hljs-keyword">return</span> $.ajax(options)

  <span class="hljs-keyword">var</span> _callbackName = options.jsonpCallback,
      callbackName = ($.isFunction(_callbackName) ?
                      _callbackName() : _callbackName) || (<span class="hljs-string">'Zepto'</span> + (jsonpID++)),
      script = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'script'</span>),
      originalCallback = <span class="hljs-built_in">window</span>[callbackName],
      responseData,
      abort = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">errorType</span>) </span>{
        $(script).triggerHandler(<span class="hljs-string">'error'</span>, errorType || <span class="hljs-string">'abort'</span>)
      },
      xhr = { <span class="hljs-attr">abort</span>: abort }, abortTimeout

  <span class="hljs-keyword">if</span> (deferred) deferred.promise(xhr)

  $(script).on(<span class="hljs-string">'load error'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e, errorType</span>)</span>{
    clearTimeout(abortTimeout)
    $(script).off().remove()

    <span class="hljs-keyword">if</span> (e.type == <span class="hljs-string">'error'</span> || !responseData) {
      ajaxError(<span class="hljs-literal">null</span>, errorType || <span class="hljs-string">'error'</span>, xhr, options, deferred)
    } <span class="hljs-keyword">else</span> {
      ajaxSuccess(responseData[<span class="hljs-number">0</span>], xhr, options, deferred)
    }

    <span class="hljs-built_in">window</span>[callbackName] = originalCallback
    <span class="hljs-keyword">if</span> (responseData &amp;&amp; $.isFunction(originalCallback))
      originalCallback(responseData[<span class="hljs-number">0</span>])

    originalCallback = responseData = <span class="hljs-literal">undefined</span>
  })

  <span class="hljs-keyword">if</span> (ajaxBeforeSend(xhr, options) === <span class="hljs-literal">false</span>) {
    abort(<span class="hljs-string">'abort'</span>)
    <span class="hljs-keyword">return</span> xhr
  }

  <span class="hljs-built_in">window</span>[callbackName] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    responseData = <span class="hljs-built_in">arguments</span>
  }

  script.src = options.url.replace(<span class="hljs-regexp">/\?(.+)=\?/</span>, <span class="hljs-string">'?$1='</span> + callbackName)
  <span class="hljs-built_in">document</span>.head.appendChild(script)

  <span class="hljs-keyword">if</span> (options.timeout &gt; <span class="hljs-number">0</span>) abortTimeout = setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    abort(<span class="hljs-string">'timeout'</span>)
  }, options.timeout)

  <span class="hljs-keyword">return</span> xhr
}</code></pre>
<p>在分析源码之前，先了解一下 <code>jsonp</code> 的原理。</p>
<p><code>jsonp</code> 实现跨域其实是利用了 <code>script</code> 可以请求跨域资源的特点，所以实现 <code>jsonp</code> 的基本步骤就是向页面动态插入一个 <code>script</code> 标签，在请求地址上带上需要传递的参数，后端再将数据返回，前端调用回调函数进行解释。</p>
<p>所以 <code>jsonp</code> 本质上是一个 <code>GET</code> 请求，因为链接的长度有限制，因此请求所携带的参数的长度也会有限制。</p>
<h4>一些变量的定义</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (!('type' in options)) return $.ajax(options)

var _callbackName = options.jsonpCallback,
    callbackName = ($.isFunction(_callbackName) ?
                    _callbackName() : _callbackName) || ('Zepto' + (jsonpID++)),
    script = document.createElement('script'),
    originalCallback = window[callbackName],
    responseData,
    abort = function(errorType) {
      $(script).triggerHandler('error', errorType || 'abort')
    },
    xhr = { abort: abort }, abortTimeout

if (deferred) deferred.promise(xhr)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (!(<span class="hljs-string">'type'</span> <span class="hljs-keyword">in</span> options)) <span class="hljs-keyword">return</span> $.ajax(options)

<span class="hljs-keyword">var</span> _callbackName = options.jsonpCallback,
    callbackName = ($.isFunction(_callbackName) ?
                    _callbackName() : _callbackName) || (<span class="hljs-string">'Zepto'</span> + (jsonpID++)),
    script = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'script'</span>),
    originalCallback = <span class="hljs-built_in">window</span>[callbackName],
    responseData,
    abort = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">errorType</span>) </span>{
      $(script).triggerHandler(<span class="hljs-string">'error'</span>, errorType || <span class="hljs-string">'abort'</span>)
    },
    xhr = { <span class="hljs-attr">abort</span>: abort }, abortTimeout

<span class="hljs-keyword">if</span> (deferred) deferred.promise(xhr)</code></pre>
<p>如果配置中的请求类型没有定义，则直接调用 <code>$.ajax</code> 方法，这个方法是整个模块的核心，后面会讲到。 <code>jsonp</code> 请求的 <code>type</code> 必须为 <code>jsonp</code> 。</p>
<p>私有变量用来临时存放配置中的 <code>jsonpCallback</code> ，即 <code>jsonp</code> 请求成功后执行的回调函数名，该配置可以为 <code>function</code> 类型。</p>
<p><code>callbackName</code> 是根据配置得出的回调函数名。如果 <code>_callbackName</code> 为 <code>function</code> ，则以执行的结果作为回调函数名，如果 <code>_callbackName</code> 没有配置，则用 <code>Zepto</code> + <code>时间戳</code> 作为回调函数名，时间戳初始化后，采用自增的方式来实现函数名的唯一性。</p>
<p><code>script</code> 用来保存创建的 <code>script</code> 节点。</p>
<p><code>originalCallback</code> 用来储存原始的回调函数。</p>
<p><code>responseData</code> 为响应的数据。</p>
<p><code>abort</code> 函数用来中止 <code>jsonp</code> 请求，实质上是触发了 <code>error</code> 事件。</p>
<p><code>xhr</code> 对象只有 <code>abort</code> 方法，如果存在 <code>deferred</code> 对象，则调用 <code>promise</code> 方法在 <code>xhr</code> 对象的基础上生成一个 <code>promise</code> 对象。</p>
<p><code>abortTimeout</code> 用来指定超时时间。</p>
<h4>beforeSend</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (ajaxBeforeSend(xhr, options) === false) {
  abort('abort')
  return xhr
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (ajaxBeforeSend(xhr, options) === <span class="hljs-literal">false</span>) {
  abort(<span class="hljs-string">'abort'</span>)
  <span class="hljs-keyword">return</span> xhr
}</code></pre>
<p>在发送 <code>jsonp</code> 请求前，会调用 <code>ajaxBeforeSend</code> 方法，如果返回的为 <code>false</code>，则中止 <code>jsonp</code> 请求的发送。</p>
<h4>发送请求</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window[callbackName] = function(){
  responseData = arguments
}

script.src = options.url.replace(/\?(.+)=\?/, '?$1=' + callbackName)
document.head.appendChild(script)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">window</span>[callbackName] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  responseData = <span class="hljs-built_in">arguments</span>
}

script.src = options.url.replace(<span class="hljs-regexp">/\?(.+)=\?/</span>, <span class="hljs-string">'?$1='</span> + callbackName)
<span class="hljs-built_in">document</span>.head.appendChild(script)</code></pre>
<p>发送请求前，重写了 <code>window[callbackName]</code> 函数，将 <code>arguments</code> 赋值给 <code>responseData</code>， 这个函数会在后端返回的 <code>js</code> 代码中执行，这样 <code>responseData</code> 就可以获取得到数据了。</p>
<p>接下来，将 <code>url</code> 的<code>=?</code> 占位符，替换成回调函数名，最后将 <code>script</code> 插入到页面中，发送请求。</p>
<h4>请求超时</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (options.timeout > 0) abortTimeout = setTimeout(function(){
  abort('timeout')
}, options.timeout)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (options.timeout &gt; <span class="hljs-number">0</span>) abortTimeout = setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  abort(<span class="hljs-string">'timeout'</span>)
}, options.timeout)</code></pre>
<p>如果有设置超时时间，则在请求超时时，触发错误事件。</p>
<h4>请求成功或失败</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(script).on('load error', function(e, errorType){
  clearTimeout(abortTimeout)
  $(script).off().remove()

  if (e.type == 'error' || !responseData) {
    ajaxError(null, errorType || 'error', xhr, options, deferred)
  } else {
    ajaxSuccess(responseData[0], xhr, options, deferred)
  }

  window[callbackName] = originalCallback
  if (responseData &amp;&amp; $.isFunction(originalCallback))
    originalCallback(responseData[0])

  originalCallback = responseData = undefined
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">$(script).on(<span class="hljs-string">'load error'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e, errorType</span>)</span>{
  clearTimeout(abortTimeout)
  $(script).off().remove()

  <span class="hljs-keyword">if</span> (e.type == <span class="hljs-string">'error'</span> || !responseData) {
    ajaxError(<span class="hljs-literal">null</span>, errorType || <span class="hljs-string">'error'</span>, xhr, options, deferred)
  } <span class="hljs-keyword">else</span> {
    ajaxSuccess(responseData[<span class="hljs-number">0</span>], xhr, options, deferred)
  }

  <span class="hljs-built_in">window</span>[callbackName] = originalCallback
  <span class="hljs-keyword">if</span> (responseData &amp;&amp; $.isFunction(originalCallback))
    originalCallback(responseData[<span class="hljs-number">0</span>])

  originalCallback = responseData = <span class="hljs-literal">undefined</span>
})</code></pre>
<p>在请求成功或者失败时，先清除请求超时定时器，避免触发超时错误，再将插入页面的 <code>script</code> 从页面上删除，因为数据已经获取到，不再需要这个 <code>script</code> 了。注意在删除 <code>script</code> 前，调用了 <code>off</code> 方法，将 <code>script</code> 上的事件都移除了。</p>
<p>如果请求出错，则调用 <code>ajaxError</code> 方法。</p>
<p>如果请求成功，则调用 <code>ajaxSuccess</code> 方法。</p>
<p>之前我们把 <code>window[callbackName]</code> 重写掉了，目的是为了获取到数据，现在再重新将原来的回调函数赋值回去，在获取到数据后，如果 <code>originalCallback</code> 有定义，并且为函数，则将数据作为参数传递进去，执行。</p>
<p>最后将数据和临时函数 <code>originalCallback</code> 清理。</p>
<h3 id="articleHeader24">$.ajax</h3>
<p><code>$.ajax</code> 方法是整个模块的核心，代码太长，就不全部贴在这里了，下面一部分一部分来分析。</p>
<h4>处理默认配置</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var settings = $.extend({}, options || {}),
    deferred = $.Deferred &amp;&amp; $.Deferred(),
    urlAnchor, hashIndex
for (key in $.ajaxSettings) if (settings[key] === undefined) settings[key] = $.ajaxSettings[key]
ajaxStart(settings)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> settings = $.extend({}, options || {}),
    deferred = $.Deferred &amp;&amp; $.Deferred(),
    urlAnchor, hashIndex
<span class="hljs-keyword">for</span> (key <span class="hljs-keyword">in</span> $.ajaxSettings) <span class="hljs-keyword">if</span> (settings[key] === <span class="hljs-literal">undefined</span>) settings[key] = $.ajaxSettings[key]
ajaxStart(settings)</code></pre>
<p><code>settings</code> 为所传递配置的副本。</p>
<p><code>deferred</code> 为 <code>deferred</code> 对象。</p>
<p><code>urlAnchor</code> 为浏览器解释的路径，会用来判断是否跨域，后面会讲到。</p>
<p><code>hashIndex</code> 为路径中 <code>hash</code> 的索引。</p>
<p>用 <code>for ... in</code> 去遍历 <code>$.ajaxSettings</code> ，作为配置的默认值。</p>
<p>配置处理完毕后，调用 <code>ajaxStart</code> 函数，触发 <code>ajaxStart</code> 事件。</p>
<h4>判断是否跨域</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="originAnchor = document.createElement('a')
originAnchor.href = window.location.href

if (!settings.crossDomain) {
  urlAnchor = document.createElement('a')
  urlAnchor.href = settings.url
  // cleans up URL for .href (IE only), see https://github.com/madrobby/zepto/pull/1049
  urlAnchor.href = urlAnchor.href
  settings.crossDomain = (originAnchor.protocol + '//' + originAnchor.host) !== (urlAnchor.protocol + '//' + urlAnchor.host)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">originAnchor = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'a'</span>)
originAnchor.href = <span class="hljs-built_in">window</span>.location.href

<span class="hljs-keyword">if</span> (!settings.crossDomain) {
  urlAnchor = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'a'</span>)
  urlAnchor.href = settings.url
  <span class="hljs-comment">// cleans up URL for .href (IE only), see https://github.com/madrobby/zepto/pull/1049</span>
  urlAnchor.href = urlAnchor.href
  settings.crossDomain = (originAnchor.protocol + <span class="hljs-string">'//'</span> + originAnchor.host) !== (urlAnchor.protocol + <span class="hljs-string">'//'</span> + urlAnchor.host)
}</code></pre>
<p>如果跨域 <code>crossDomain</code> 没有设置，则需要检测请求的地址是否跨域。</p>
<p><code>originAnchor</code> 是当前页面链接，整体思路是创建一个 <code>a</code> 节点，将 <code>href</code> 属性设置为当前请求的地址，然后获取节点的 <code>protocol</code> 和 <code>host</code>，看跟当前页面的链接用同样方式拼接出来的地址是否一致。</p>
<p>注意到这里的 <code>urlAnchor</code> 进行了两次赋值，这是因为 <code>ie</code> 默认不会对链接 <code>a</code> 添加端口号，但是会对 <code>window.location.href</code> 添加端口号，如果端口号为 <code>80</code> 时，会出现不一致的情况。具体见:<a href="https://github.com/madrobby/zepto/pull/1049" rel="nofollow noreferrer" target="_blank">pr#1049</a></p>
<h4>处理请求地址</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (!settings.url) settings.url = window.location.toString()
if ((hashIndex = settings.url.indexOf('#')) > -1) settings.url = settings.url.slice(0, hashIndex)
serializeData(settings)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (!settings.url) settings.url = <span class="hljs-built_in">window</span>.location.toString()
<span class="hljs-keyword">if</span> ((hashIndex = settings.url.indexOf(<span class="hljs-string">'#'</span>)) &gt; <span class="hljs-number">-1</span>) settings.url = settings.url.slice(<span class="hljs-number">0</span>, hashIndex)
serializeData(settings)</code></pre>
<p>如果没有配置 <code>url</code> ，则用当前页面的地址作为请求地址。</p>
<p>如果请求的地址带有 <code>hash</code>， 则将 <code>hash</code> 去掉，因为 <code>hash</code> 并不会传递给后端。</p>
<p>然后调用 <code>serializeData</code> 方法来序列化请求参数 <code>data</code>。</p>
<h4>处理缓存</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var dataType = settings.dataType, hasPlaceholder = /\?.+=\?/.test(settings.url)
if (hasPlaceholder) dataType = 'jsonp'

if (settings.cache === false || (
  (!options || options.cache !== true) &amp;&amp;
  ('script' == dataType || 'jsonp' == dataType)
))
  settings.url = appendQuery(settings.url, '_=' + Date.now())" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> dataType = settings.dataType, hasPlaceholder = <span class="hljs-regexp">/\?.+=\?/</span>.test(settings.url)
<span class="hljs-keyword">if</span> (hasPlaceholder) dataType = <span class="hljs-string">'jsonp'</span>

<span class="hljs-keyword">if</span> (settings.cache === <span class="hljs-literal">false</span> || (
  (!options || options.cache !== <span class="hljs-literal">true</span>) &amp;&amp;
  (<span class="hljs-string">'script'</span> == dataType || <span class="hljs-string">'jsonp'</span> == dataType)
))
  settings.url = appendQuery(settings.url, <span class="hljs-string">'_='</span> + <span class="hljs-built_in">Date</span>.now())</code></pre>
<p><code>hasPlaceholder</code> 的正则匹配规则跟上面分析到 <code>jsonp</code> 的替换 <code>callbackName</code> 的正则一样，约定以这样的方式来替换 <code>url</code> 中的 <code>callbackName</code>。因此，也可以用这样的正则来判断是否为 <code>jsonp</code>。</p>
<p>如果 <code>cache</code> 的配置为 <code>false</code> ，或者在 <code>dataType</code> 为 <code>script</code> 或者 <code>jsonp</code> 的情况下， <code>cache</code> 没有设置为 <code>true</code> 时，表示不需要缓存，清除浏览器缓存的方式也很简单，就是往请求地址的后面加上一个时间戳，这样每次请求的地址都不一样，浏览器自然就没有缓存了。</p>
<h4>处理jsonp</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if ('jsonp' == dataType) {
  if (!hasPlaceholder)
    settings.url = appendQuery(settings.url,
                               settings.jsonp ? (settings.jsonp + '=?') : settings.jsonp === false ? '' : 'callback=?')
  return $.ajaxJSONP(settings, deferred)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (<span class="hljs-string">'jsonp'</span> == dataType) {
  <span class="hljs-keyword">if</span> (!hasPlaceholder)
    settings.url = appendQuery(settings.url,
                               settings.jsonp ? (settings.jsonp + <span class="hljs-string">'=?'</span>) : settings.jsonp === <span class="hljs-literal">false</span> ? <span class="hljs-string">''</span> : <span class="hljs-string">'callback=?'</span>)
  <span class="hljs-keyword">return</span> $.ajaxJSONP(settings, deferred)
}</code></pre>
<p>判断 <code>dataType</code> 的类型为 <code>jsonp</code> 时，会对 <code>url</code> 进行一些处理。</p>
<p>如果还没有 <code>?=</code> 占位符，则向 <code>url</code> 中追加占位符。</p>
<p>如果 <code>settings.jsonp</code> 存在，则追加 <code>settings.jsonp</code>  + <code>=?</code>。</p>
<p>如果 <code>settings.jsonp</code> 为 <code>false</code>， 则不向 <code>url</code> 中追加东西。</p>
<p>否则默认追加 <code>callback=?</code>。</p>
<p><code>url</code> 拼接完毕后，调用 <code>$.ajaxJSONP</code> 方法，发送 <code>jsonp</code> 请求。</p>
<h4>一些变量</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var mime = settings.accepts[dataType],
    headers = { },
    setHeader = function(name, value) { headers[name.toLowerCase()] = [name, value] },
    protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol,
    xhr = settings.xhr(),
    nativeSetHeader = xhr.setRequestHeader,
    abortTimeout

if (deferred) deferred.promise(xhr)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> mime = settings.accepts[dataType],
    headers = { },
    setHeader = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">name, value</span>) </span>{ headers[name.toLowerCase()] = [name, value] },
    protocol = <span class="hljs-regexp">/^([\w-]+:)\/\//</span>.test(settings.url) ? <span class="hljs-built_in">RegExp</span>.$<span class="hljs-number">1</span> : <span class="hljs-built_in">window</span>.location.protocol,
    xhr = settings.xhr(),
    nativeSetHeader = xhr.setRequestHeader,
    abortTimeout

<span class="hljs-keyword">if</span> (deferred) deferred.promise(xhr)</code></pre>
<p><code>mime</code> 获取数据的 <code>mime</code> 类型。</p>
<p><code>headers</code> 为请求头。</p>
<p><code>setHeader</code> 为设置请求头的方法，其实是往 <code>headers</code> 上增加对应的 <code>key</code> <code>value</code> 值。</p>
<p><code>protocol</code> 为协议，匹配一个或多个以字母、数字或者 <code>-</code> 开头，并且后面为 <code>://</code> 的字符串。优先从配置的 <code>url</code> 中获取，如果没有配置 <code>url</code>，则取 <code>window.location.protocol</code>。</p>
<p><code>xhr</code> 为 <code>XMLHttpRequest</code> 实例。</p>
<p><code>nativeSetHeader</code> 为 <code>xhr</code> 实例上的 <code>setRequestHeader</code> 方法。</p>
<p><code>abortTimeout</code> 为超时定时器的 <code>id</code>。</p>
<p>如果 <code>deferred</code> 对象存在，则调用 <code>promise</code> 方法，以 <code>xhr</code> 为基础生成一个 <code>promise</code> 。</p>
<h4>设置请求头</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (!settings.crossDomain) setHeader('X-Requested-With', 'XMLHttpRequest')
setHeader('Accept', mime || '*/*')
if (mime = settings.mimeType || mime) {
  if (mime.indexOf(',') > -1) mime = mime.split(',', 2)[0]
  xhr.overrideMimeType &amp;&amp; xhr.overrideMimeType(mime)
}
if (settings.contentType || (settings.contentType !== false &amp;&amp; settings.data &amp;&amp; settings.type.toUpperCase() != 'GET'))
  setHeader('Content-Type', settings.contentType || 'application/x-www-form-urlencoded')

if (settings.headers) for (name in settings.headers) setHeader(name, settings.headers[name])
xhr.setRequestHeader = setHeader" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (!settings.crossDomain) setHeader(<span class="hljs-string">'X-Requested-With'</span>, <span class="hljs-string">'XMLHttpRequest'</span>)
setHeader(<span class="hljs-string">'Accept'</span>, mime || <span class="hljs-string">'*/*'</span>)
<span class="hljs-keyword">if</span> (mime = settings.mimeType || mime) {
  <span class="hljs-keyword">if</span> (mime.indexOf(<span class="hljs-string">','</span>) &gt; <span class="hljs-number">-1</span>) mime = mime.split(<span class="hljs-string">','</span>, <span class="hljs-number">2</span>)[<span class="hljs-number">0</span>]
  xhr.overrideMimeType &amp;&amp; xhr.overrideMimeType(mime)
}
<span class="hljs-keyword">if</span> (settings.contentType || (settings.contentType !== <span class="hljs-literal">false</span> &amp;&amp; settings.data &amp;&amp; settings.type.toUpperCase() != <span class="hljs-string">'GET'</span>))
  setHeader(<span class="hljs-string">'Content-Type'</span>, settings.contentType || <span class="hljs-string">'application/x-www-form-urlencoded'</span>)

<span class="hljs-keyword">if</span> (settings.headers) <span class="hljs-keyword">for</span> (name <span class="hljs-keyword">in</span> settings.headers) setHeader(name, settings.headers[name])
xhr.setRequestHeader = setHeader</code></pre>
<p>如果不是跨域请求时，设置请求头 <code>X-Requested-With</code> 的值为 <code>XMLHttpRequest</code> 。这个请求头的作用是告诉服务端，这个请求为 <code>ajax</code> 请求。</p>
<p><code>setHeader('Accept', mime || '*/*')</code> 用来设置客户端接受的资源类型。</p>
<p>当 <code>mime</code> 存在时，调用 <code>overrideMimeType</code> 方法来重写 <code>response</code> 的 <code>content-type</code> ，使得服务端返回的类型跟客户端要求的类型不一致时，可以按照指定的格式来解释。具体可以参见这篇文章 《<a href="https://segmentfault.com/a/1190000004322487">你真的会使用XMLHttpRequest吗？</a>》。</p>
<p>如果有指定 <code>contentType</code> ，</p>
<p>或者 <code>contentType</code> 没有设置为 <code>false</code> ，并且 <code>data</code> 存在以及请求类型不为 <code>GET</code> 时，设置 <code>Content-Type</code> 为指定的 <code>contentType</code> ，在没有指定时，设置为 <code>application/x-www-form-urlencoded</code> 。所以没有指定 <code>contentType</code> 时， <code>POST</code> 请求，默认的 <code>Content-Type</code> 为 <code>application/x-www-form-urlencoded</code>。</p>
<p>如果有配置 <code>headers</code> ，则遍历 <code>headers</code> 配置，分别调用 <code>setHeader</code> 方法配置。</p>
<h4>before send</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (ajaxBeforeSend(xhr, settings) === false) {
  xhr.abort()
  ajaxError(null, 'abort', xhr, settings, deferred)
  return xhr
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (ajaxBeforeSend(xhr, settings) === <span class="hljs-literal">false</span>) {
  xhr.abort()
  ajaxError(<span class="hljs-literal">null</span>, <span class="hljs-string">'abort'</span>, xhr, settings, deferred)
  <span class="hljs-keyword">return</span> xhr
}</code></pre>
<p>调用 <code>ajaxBeforeSend</code> 方法，如果返回的为 <code>false</code> ，则中止 <code>ajax</code> 请求。</p>
<h4>同步和异步请求的处理</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var async = 'async' in settings ? settings.async : true
xhr.open(settings.type, settings.url, async, settings.username, settings.password)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> <span class="hljs-keyword">async</span> = <span class="hljs-string">'async'</span> <span class="hljs-keyword">in</span> settings ? settings.async : <span class="hljs-literal">true</span>
xhr.open(settings.type, settings.url, <span class="hljs-keyword">async</span>, settings.username, settings.password)</code></pre>
<p>如果有配置 <code>async</code> ，则采用配置中的值，否则，默认发送的是异步请求。</p>
<p>接着调用 <code>open</code> 方法，创建一个请求。</p>
<h4>创建请求后的配置</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (settings.xhrFields) for (name in settings.xhrFields) xhr[name] = settings.xhrFields[name]

for (name in headers) nativeSetHeader.apply(xhr, headers[name])" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (settings.xhrFields) <span class="hljs-keyword">for</span> (name <span class="hljs-keyword">in</span> settings.xhrFields) xhr[name] = settings.xhrFields[name]

<span class="hljs-keyword">for</span> (name <span class="hljs-keyword">in</span> headers) nativeSetHeader.apply(xhr, headers[name])</code></pre>
<p>如果有配置 <code>xhrFields</code> ，则遍历，设置对应的 <code>xhr</code> 属性。</p>
<p>再遍历上面配置的 <code>headers</code> 对象，调用 <code>setRequestHeader</code> 方法，设置请求头，注意这里的请求头必须要在 <code>open</code> 之后，在 <code>send</code> 之前设置。</p>
<h4>发送请求</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="xhr.send(settings.data ? settings.data : null)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">xhr.send(settings.data ? settings.data : <span class="hljs-literal">null</span>)</code></pre>
<p>发送请求很简单，调用 <code>xhr.send</code> 方法，将配置中的数据传入即可。</p>
<h4>请求响应成功后的处理</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="xhr.onreadystatechange = function(){
  if (xhr.readyState == 4) {
    xhr.onreadystatechange = empty
    clearTimeout(abortTimeout)
    var result, error = false
    if ((xhr.status >= 200 &amp;&amp; xhr.status < 300) || xhr.status == 304 || (xhr.status == 0 &amp;&amp; protocol == 'file:')) {
      dataType = dataType || mimeToDataType(settings.mimeType || xhr.getResponseHeader('content-type'))

      if (xhr.responseType == 'arraybuffer' || xhr.responseType == 'blob')
        result = xhr.response
      else {
        result = xhr.responseText

        try {
          // http://perfectionkills.com/global-eval-what-are-the-options/
          // sanitize response accordingly if data filter callback provided
          result = ajaxDataFilter(result, dataType, settings)
          if (dataType == 'script')    (1,eval)(result)
          else if (dataType == 'xml')  result = xhr.responseXML
          else if (dataType == 'json') result = blankRE.test(result) ? null : $.parseJSON(result)
        } catch (e) { error = e }

        if (error) return ajaxError(error, 'parsererror', xhr, settings, deferred)
      }

      ajaxSuccess(result, xhr, settings, deferred)
    } else {
      ajaxError(xhr.statusText || null, xhr.status ? 'error' : 'abort', xhr, settings, deferred)
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">xhr.onreadystatechange = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">if</span> (xhr.readyState == <span class="hljs-number">4</span>) {
    xhr.onreadystatechange = empty
    clearTimeout(abortTimeout)
    <span class="hljs-keyword">var</span> result, error = <span class="hljs-literal">false</span>
    <span class="hljs-keyword">if</span> ((xhr.status &gt;= <span class="hljs-number">200</span> &amp;&amp; xhr.status &lt; <span class="hljs-number">300</span>) || xhr.status == <span class="hljs-number">304</span> || (xhr.status == <span class="hljs-number">0</span> &amp;&amp; protocol == <span class="hljs-string">'file:'</span>)) {
      dataType = dataType || mimeToDataType(settings.mimeType || xhr.getResponseHeader(<span class="hljs-string">'content-type'</span>))

      <span class="hljs-keyword">if</span> (xhr.responseType == <span class="hljs-string">'arraybuffer'</span> || xhr.responseType == <span class="hljs-string">'blob'</span>)
        result = xhr.response
      <span class="hljs-keyword">else</span> {
        result = xhr.responseText

        <span class="hljs-keyword">try</span> {
          <span class="hljs-comment">// http://perfectionkills.com/global-eval-what-are-the-options/</span>
          <span class="hljs-comment">// sanitize response accordingly if data filter callback provided</span>
          result = ajaxDataFilter(result, dataType, settings)
          <span class="hljs-keyword">if</span> (dataType == <span class="hljs-string">'script'</span>)    (<span class="hljs-number">1</span>,<span class="hljs-built_in">eval</span>)(result)
          <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (dataType == <span class="hljs-string">'xml'</span>)  result = xhr.responseXML
          <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (dataType == <span class="hljs-string">'json'</span>) result = blankRE.test(result) ? <span class="hljs-literal">null</span> : $.parseJSON(result)
        } <span class="hljs-keyword">catch</span> (e) { error = e }

        <span class="hljs-keyword">if</span> (error) <span class="hljs-keyword">return</span> ajaxError(error, <span class="hljs-string">'parsererror'</span>, xhr, settings, deferred)
      }

      ajaxSuccess(result, xhr, settings, deferred)
    } <span class="hljs-keyword">else</span> {
      ajaxError(xhr.statusText || <span class="hljs-literal">null</span>, xhr.status ? <span class="hljs-string">'error'</span> : <span class="hljs-string">'abort'</span>, xhr, settings, deferred)
    }
  }
}</code></pre>
<h5>readyState</h5>
<p><code>readyState</code> 有以下5种状态，状态切换时，会响应 <code>onreadystatechange</code> 的回调。</p>
<table>
<thead><tr>
<th>0</th>
<th>
<code>xhr</code> 实例已经创建，但是还没有调用 <code>open</code> 方法。</th>
</tr></thead>
<tbody>
<tr>
<td>1</td>
<td>已经调用 <code>open</code> 方法</td>
</tr>
<tr>
<td>2</td>
<td>请求已经发送，可以获取响应头和状态 <code>status</code>
</td>
</tr>
<tr>
<td>3</td>
<td>下载中，部分响应数据已经可以使用</td>
</tr>
<tr>
<td>4</td>
<td>请求完成</td>
</tr>
</tbody>
</table>
<p>具体见 <a href="https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState" rel="nofollow noreferrer" target="_blank">MDN:XMLHttpRequest.readyState</a></p>
<h5>清理工作</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="xhr.onreadystatechange = empty
clearTimeout(abortTimeout)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">xhr.onreadystatechange = empty
clearTimeout(abortTimeout)</code></pre>
<p>当 <code>readyState</code> 变为 <code>4</code> 时，表示请求完成（无论成功还是失败），这时需要将 <code>onreadystatechange</code> 重新赋值为 <code>empty</code> 函数，清除超时响应定时器，避免定时器超时的任务执行。</p>
<h5>成功状态判断</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if ((xhr.status >= 200 &amp;&amp; xhr.status < 300) || xhr.status == 304 || (xhr.status == 0 &amp;&amp; protocol == 'file:')) {
          ...
   }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> ((xhr.status &gt;= <span class="hljs-number">200</span> &amp;&amp; xhr.status &lt; <span class="hljs-number">300</span>) || xhr.status == <span class="hljs-number">304</span> || (xhr.status == <span class="hljs-number">0</span> &amp;&amp; protocol == <span class="hljs-string">'file:'</span>)) {
          ...
   }</code></pre>
<p>这里判断的是 <code>http</code> 状态码，状态码的含义可以参考 <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Status" rel="nofollow noreferrer" target="_blank">HTTP response status codes</a>。</p>
<p>解释一下最后这个条件 <code>xhr.status == 0 &amp;&amp; protocol == 'file:'</code>。</p>
<p><code>status</code> 为 <code>0</code> 时，表示请求并没有到达服务器，有几种情况会造成 <code>status</code> 为 <code>0</code> 的情况，例如网络不通，不合法的跨域请求，防火墙拦截等。</p>
<p>直接用本地文件的方式打开，也会出现  <code>status</code> 为 <code>0</code> 的情况，但是我在 <code>chrome</code> 上测试，在这种情况下只能取到         <code>status</code> ， <code>responseType</code> 和 <code>responseText</code> 都取不到，不清楚这个用本地文件打开时，进入成功判断的目的何在。</p>
<h5>处理数据</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="blankRE = /^\s*$/,

dataType = dataType || mimeToDataType(settings.mimeType || xhr.getResponseHeader('content-type'))
if (xhr.responseType == 'arraybuffer' || xhr.responseType == 'blob')
  result = xhr.response
else {
  result = xhr.responseText

  try {
    // http://perfectionkills.com/global-eval-what-are-the-options/
    // sanitize response accordingly if data filter callback provided
    result = ajaxDataFilter(result, dataType, settings)
    if (dataType == 'script')    (1,eval)(result)
    else if (dataType == 'xml')  result = xhr.responseXML
    else if (dataType == 'json') result = blankRE.test(result) ? null : $.parseJSON(result)
  } catch (e) { error = e }
  if (error) return ajaxError(error, 'parsererror', xhr, settings, deferred)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">blankRE = <span class="hljs-regexp">/^\s*$/</span>,

dataType = dataType || mimeToDataType(settings.mimeType || xhr.getResponseHeader(<span class="hljs-string">'content-type'</span>))
<span class="hljs-keyword">if</span> (xhr.responseType == <span class="hljs-string">'arraybuffer'</span> || xhr.responseType == <span class="hljs-string">'blob'</span>)
  result = xhr.response
<span class="hljs-keyword">else</span> {
  result = xhr.responseText

  <span class="hljs-keyword">try</span> {
    <span class="hljs-comment">// http://perfectionkills.com/global-eval-what-are-the-options/</span>
    <span class="hljs-comment">// sanitize response accordingly if data filter callback provided</span>
    result = ajaxDataFilter(result, dataType, settings)
    <span class="hljs-keyword">if</span> (dataType == <span class="hljs-string">'script'</span>)    (<span class="hljs-number">1</span>,<span class="hljs-built_in">eval</span>)(result)
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (dataType == <span class="hljs-string">'xml'</span>)  result = xhr.responseXML
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (dataType == <span class="hljs-string">'json'</span>) result = blankRE.test(result) ? <span class="hljs-literal">null</span> : $.parseJSON(result)
  } <span class="hljs-keyword">catch</span> (e) { error = e }
  <span class="hljs-keyword">if</span> (error) <span class="hljs-keyword">return</span> ajaxError(error, <span class="hljs-string">'parsererror'</span>, xhr, settings, deferred)</code></pre>
<p>首先获取 <code>dataType</code>，后面会根据 <code>dataType</code> 来判断获得的数据类型，进而调用不同的方法来处理。</p>
<p>如果数据为 <code>arraybuffer</code> 或 <code>blob</code> 对象时，即为二进制数据时，<code>result</code> 从 <code>response</code> 中直接取得。</p>
<p>否则，用 <code>responseText</code> 获取数据，然后再对数据尝试解释。</p>
<p>在解释数据前，调用 <code>ajaxDataFilter</code> 对数据进行过滤。</p>
<p>如果数据类型为 <code>script</code> ，则使用 <code>eval</code> 方法，执行返回的 <code>script</code> 内容。</p>
<p>这里为什么用 <code>(1, eval)</code> ，而不是直接用 <code>eval</code> 呢，是为了确保 <code>eval</code> 执行的作用域是在 <code>window</code> 下。具体参考：<a href="https://stackoverflow.com/questions/9107240/1-evalthis-vs-evalthis-in-javascript" rel="nofollow noreferrer" target="_blank">(1,eval)('this') vs eval('this') in JavaScript?</a> 和 《<a href="http://perfectionkills.com/global-eval-what-are-the-options/" rel="nofollow noreferrer" target="_blank">Global eval. What are the options?</a>》</p>
<p>如果 <code>dataType</code> 为 <code>xml</code> ，则调用<code>responseXML</code> 方法</p>
<p>如果为 <code>json</code> ，返回的内容为空时，结果返回 <code>null</code> ，如果不为空，调用 <code>$.parseJSON</code> 方法，格式化为 <code>json</code> 格式。相关分析见《<a href="https://github.com/yeyuqiudeng/reading-zepto/blob/4143f028beff94ce3834e41620fdea48b764301c/src/%E8%AF%BBZepto%E6%BA%90%E7%A0%81%E4%B9%8B%E5%B7%A5%E5%85%B7%E5%87%BD%E6%95%B0.md#parsejson" rel="nofollow noreferrer" target="_blank">读zepto源码之工具函数</a>》</p>
<p>如果解释出错了，则调用 <code>ajaxError</code> 方法，触发 <code>ajaxError</code> 事件，事件类型为 <code>parseerror</code>。</p>
<p>如果都成功了，则调用  <code>ajaxSuccess</code> 方法，执行成功回调。</p>
<h5>响应出错</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ajaxError(xhr.statusText || null, xhr.status ? 'error' : 'abort', xhr, settings, deferred)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">ajaxError(xhr.statusText || <span class="hljs-literal">null</span>, xhr.status ? <span class="hljs-string">'error'</span> : <span class="hljs-string">'abort'</span>, xhr, settings, deferred)</code></pre>
<p>如果 <code>status</code> 不在成功的范围内，则调用 <code>ajaxError</code> 方法，触发 <code>ajaxError</code> 事件。</p>
<h4>响应超时</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (settings.timeout > 0) abortTimeout = setTimeout(function(){
  xhr.onreadystatechange = empty
  xhr.abort()
  ajaxError(null, 'timeout', xhr, settings, deferred)
}, settings.timeout)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (settings.timeout &gt; <span class="hljs-number">0</span>) abortTimeout = setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  xhr.onreadystatechange = empty
  xhr.abort()
  ajaxError(<span class="hljs-literal">null</span>, <span class="hljs-string">'timeout'</span>, xhr, settings, deferred)
}, settings.timeout)</code></pre>
<p>如果有设置超时时间，则设置一个定时器，超时时，首先要将 <code>onreadystatechange</code> 的回调设置为空函数 <code>empty</code> ，避免超时响应执行完毕后，请求完成，再次执行成功回调。</p>
<p>然后调用 <code>xhr.abort</code> 方法，取消请求的发送，并且调用 <code>ajaxError</code> 方法，触发 <code>ajaxError</code> 事件。</p>
<h3 id="articleHeader25">$.get</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.get = function(/* url, data, success, dataType */){
  return $.ajax(parseArguments.apply(null, arguments))
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">$.get = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"><span class="hljs-regexp">/* url, data, success, dataType */</span></span>)</span>{
  <span class="hljs-keyword">return</span> $.ajax(parseArguments.apply(<span class="hljs-literal">null</span>, <span class="hljs-built_in">arguments</span>))
}</code></pre>
<p><code>$.get</code> 是 <code>$.ajax</code> <code>GET</code> 请求的便捷方法，内部调用了 <code>$.ajax</code> ，不需要指定请求类型。</p>
<h3 id="articleHeader26">$.post</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.post = function(/* url, data, success, dataType */){
  var options = parseArguments.apply(null, arguments)
  options.type = 'POST'
  return $.ajax(options)
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">$.post = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"><span class="hljs-regexp">/* url, data, success, dataType */</span></span>)</span>{
  <span class="hljs-keyword">var</span> options = parseArguments.apply(<span class="hljs-literal">null</span>, <span class="hljs-built_in">arguments</span>)
  options.type = <span class="hljs-string">'POST'</span>
  <span class="hljs-keyword">return</span> $.ajax(options)
}
</code></pre>
<p><code>$.post</code> 是 <code>$.ajax</code> <code>POST</code> 请求的便捷方法，跟 <code>$.get</code> 一样，只开放了 <code>url</code>、<code>data</code> 、<code>success</code> 和 <code>dataType</code> 等几个接口参数，默认配置了 <code>type</code> 为 <code>POST</code> 请求。</p>
<h3 id="articleHeader27">$.getJSON</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.getJSON = function(/* url, data, success */){
  var options = parseArguments.apply(null, arguments)
  options.dataType = 'json'
  return $.ajax(options)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">$.getJSON = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"><span class="hljs-regexp">/* url, data, success */</span></span>)</span>{
  <span class="hljs-keyword">var</span> options = parseArguments.apply(<span class="hljs-literal">null</span>, <span class="hljs-built_in">arguments</span>)
  options.dataType = <span class="hljs-string">'json'</span>
  <span class="hljs-keyword">return</span> $.ajax(options)
}</code></pre>
<p><code>$.getJSON</code> 跟 <code>$.get</code> 差不多，比 <code>$.get</code> 更省了一个 <code>dataType</code> 的参数，这里指定了 <code>dataType</code> 为 <code>json</code> 类型。</p>
<h3 id="articleHeader28">$.fn.load</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.fn.load = function(url, data, success){
  if (!this.length) return this
  var self = this, parts = url.split(/\s/), selector,
      options = parseArguments(url, data, success),
      callback = options.success
  if (parts.length > 1) options.url = parts[0], selector = parts[1]
  options.success = function(response){
    self.html(selector ?
              $('<div>').html(response.replace(rscript, &quot;&quot;)).find(selector)
              : response)
    callback &amp;&amp; callback.apply(self, arguments)
  }
  $.ajax(options)
  return this
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">$.fn.load = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">url, data, success</span>)</span>{
  <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.length) <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>
  <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>, parts = url.split(<span class="hljs-regexp">/\s/</span>), selector,
      options = parseArguments(url, data, success),
      callback = options.success
  <span class="hljs-keyword">if</span> (parts.length &gt; <span class="hljs-number">1</span>) options.url = parts[<span class="hljs-number">0</span>], selector = parts[<span class="hljs-number">1</span>]
  options.success = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">response</span>)</span>{
    self.html(selector ?
              $(<span class="hljs-string">'&lt;div&gt;'</span>).html(response.replace(rscript, <span class="hljs-string">""</span>)).find(selector)
              : response)
    callback &amp;&amp; callback.apply(self, <span class="hljs-built_in">arguments</span>)
  }
  $.ajax(options)
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>
}</code></pre>
<p><code>load</code> 方法是用 <code>ajax</code> 的方式，请求一个 <code>html</code> 文件，并将请求的文件插入到页面中。</p>
<p><code>url</code> 可以指定选择符，选择符用空格分割，如果有指定选择符，则只将匹配选择符的文档插入到页面中。<code>url</code> 的格式为 <code>请求地址 选择符</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var self = this, parts = url.split(/\s/), selector,
   options = parseArguments(url, data, success),
   callback = options.success
if (parts.length > 1) options.url = parts[0], selector = parts[1]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>, parts = url.split(<span class="hljs-regexp">/\s/</span>), selector,
   options = parseArguments(url, data, success),
   callback = options.success
<span class="hljs-keyword">if</span> (parts.length &gt; <span class="hljs-number">1</span>) options.url = parts[<span class="hljs-number">0</span>], selector = parts[<span class="hljs-number">1</span>]</code></pre>
<p><code>parts</code> 是用空格分割后的结果，如果有选择符，则 <code>length</code> 会大于 <code>1</code>，数组的第一项为请求地址，第二项为选择符。</p>
<p>调用 <code>parseArguments</code> 用来重新调整参数，因为 <code>data</code> 和 <code>success</code> 都是可选的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="options.success = function(response){
  self.html(selector ?
            $('<div>').html(response.replace(rscript, &quot;&quot;)).find(selector)
            : response)
  callback &amp;&amp; callback.apply(self, arguments)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">options.success = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">response</span>)</span>{
  self.html(selector ?
            $(<span class="hljs-string">'&lt;div&gt;'</span>).html(response.replace(rscript, <span class="hljs-string">""</span>)).find(selector)
            : response)
  callback &amp;&amp; callback.apply(self, <span class="hljs-built_in">arguments</span>)
}</code></pre>
<p>请求成功后，如果有 <code>selector</code> ，则从文档中筛选符合的文档插入页面，否则，将返回的文档全部插入页面。</p>
<p>如果有配置回调函数，则执行回调。</p>
<h2 id="articleHeader29">系列文章</h2>
<ol>
<li><a href="https://github.com/yeyuqiudeng/reading-zepto/blob/master/src/%E8%AF%BBZepto%E6%BA%90%E7%A0%81%E4%B9%8B%E4%BB%A3%E7%A0%81%E7%BB%93%E6%9E%84.md" rel="nofollow noreferrer" target="_blank">读Zepto源码之代码结构</a></li>
<li><a href="https://github.com/yeyuqiudeng/reading-zepto/blob/master/src/%E8%AF%BBZepto%E6%BA%90%E7%A0%81%E4%B9%8B%E5%86%85%E9%83%A8%E6%96%B9%E6%B3%95.md" rel="nofollow noreferrer" target="_blank">读 Zepto 源码之内部方法</a></li>
<li><a href="https://github.com/yeyuqiudeng/reading-zepto/blob/a4d6ad99c57047beae2b652b4d2cbb380599a524/src/%E8%AF%BBZepto%E6%BA%90%E7%A0%81%E4%B9%8B%E5%B7%A5%E5%85%B7%E5%87%BD%E6%95%B0.md" rel="nofollow noreferrer" target="_blank">读Zepto源码之工具函数</a></li>
<li><a href="https://github.com/yeyuqiudeng/reading-zepto/blob/master/src/%E8%AF%BBZepto%E6%BA%90%E7%A0%81%E4%B9%8B%E7%A5%9E%E5%A5%87%E7%9A%84%24.md" rel="nofollow noreferrer" target="_blank">读Zepto源码之神奇的$</a></li>
<li><a href="https://github.com/yeyuqiudeng/reading-zepto/blob/master/src/%E8%AF%BBZepto%E6%BA%90%E7%A0%81%E4%B9%8B%E9%9B%86%E5%90%88%E6%93%8D%E4%BD%9C.md" rel="nofollow noreferrer" target="_blank">读Zepto源码之集合操作</a></li>
<li><a href="https://github.com/yeyuqiudeng/reading-zepto/blob/master/src/%E8%AF%BBZepto%E6%BA%90%E7%A0%81%E4%B9%8B%E9%9B%86%E5%90%88%E5%85%83%E7%B4%A0%E6%9F%A5%E6%89%BE.md" rel="nofollow noreferrer" target="_blank">读Zepto源码之集合元素查找</a></li>
<li><a href="https://github.com/yeyuqiudeng/reading-zepto/blob/master/src/%E8%AF%BBZepto%E6%BA%90%E7%A0%81%E4%B9%8B%E6%93%8D%E4%BD%9CDOM.md" rel="nofollow noreferrer" target="_blank">读Zepto源码之操作DOM</a></li>
<li><a href="https://github.com/yeyuqiudeng/reading-zepto/blob/master/src/%E8%AF%BBZepto%E6%BA%90%E7%A0%81%E4%B9%8B%E6%A0%B7%E5%BC%8F%E6%93%8D%E4%BD%9C.md" rel="nofollow noreferrer" target="_blank">读Zepto源码之样式操作</a></li>
<li><a href="https://github.com/yeyuqiudeng/reading-zepto/blob/master/src/%E8%AF%BBZepto%E6%BA%90%E7%A0%81%E4%B9%8B%E5%B1%9E%E6%80%A7%E6%93%8D%E4%BD%9C.md" rel="nofollow noreferrer" target="_blank">读Zepto源码之属性操作</a></li>
<li><a href="https://github.com/yeyuqiudeng/reading-zepto/blob/master/src/%E8%AF%BBZepto%E6%BA%90%E7%A0%81%E4%B9%8BEvent%E6%A8%A1%E5%9D%97.md" rel="nofollow noreferrer" target="_blank">读Zepto源码之Event模块</a></li>
<li><a href="https://github.com/yeyuqiudeng/reading-zepto/blob/master/src/%E8%AF%BBZepto%E6%BA%90%E7%A0%81%E4%B9%8BIE%E6%A8%A1%E5%9D%97.md" rel="nofollow noreferrer" target="_blank">读Zepto源码之IE模块</a></li>
<li><a href="https://github.com/yeyuqiudeng/reading-zepto/blob/master/src/%E8%AF%BBZepto%E6%BA%90%E7%A0%81%E4%B9%8BCallbacks%E6%A8%A1%E5%9D%97.md" rel="nofollow noreferrer" target="_blank">读Zepto源码之Callbacks模块</a></li>
<li><a href="https://github.com/yeyuqiudeng/reading-zepto/blob/master/src/%E8%AF%BBZepto%E6%BA%90%E7%A0%81%E4%B9%8BDeferred%E6%A8%A1%E5%9D%97.md" rel="nofollow noreferrer" target="_blank">读Zepto源码之Deferred模块</a></li>
</ol>
<h2 id="articleHeader30">参考</h2>
<ul>
<li><a href="http://www.cnblogs.com/mominger/p/4398982.html" rel="nofollow noreferrer" target="_blank">Zepto源码分析-ajax模块</a></li>
<li><a href="http://ysha.me/2016/07/19/07-19-%E8%AF%BBzepto%E6%BA%90%E7%A0%81%EF%BC%883%EF%BC%89ajax/" rel="nofollow noreferrer" target="_blank">读zepto源码（3) ajax</a></li>
<li><a href="https://segmentfault.com/a/1190000004322487">你真的会使用XMLHttpRequest吗？</a></li>
<li><a href="https://juejin.im/post/593d7f0a128fe1006aea235f" rel="nofollow noreferrer" target="_blank">原来你是这样的 jsonp(原理与具体实现细节)</a></li>
<li><a href="http://www.cnblogs.com/BlackStorm/p/Zepto-Analysing-For-Ajax-Module.html" rel="nofollow noreferrer" target="_blank">一个普通的 Zepto 源码分析（二） - ajax 模块</a></li>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest" rel="nofollow noreferrer" target="_blank">MDN:XMLHttpRequest</a></li>
<li><a href="https://fetch.spec.whatwg.org/#responses" rel="nofollow noreferrer" target="_blank">fetch.spec.whatwg.org</a></li>
<li><a href="https://stackoverflow.com/questions/872206/http-status-code-0-what-does-this-mean-for-fetch-or-xmlhttprequest" rel="nofollow noreferrer" target="_blank">HTTP status code 0 - what does this mean for fetch, or XMLHttpRequest?</a></li>
<li><a href="https://stackoverflow.com/questions/9107240/1-evalthis-vs-evalthis-in-javascript" rel="nofollow noreferrer" target="_blank">(1,eval)('this') vs eval('this') in JavaScript?</a></li>
<li><a href="http://perfectionkills.com/global-eval-what-are-the-options/" rel="nofollow noreferrer" target="_blank">Global eval. What are the options?</a></li>
</ul>
<h2 id="articleHeader31">License</h2>
<p><a href="http://creativecommons.org/licenses/by-nc-nd/4.0/" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000009502046" src="https://static.alili.tech/img/remote/1460000009502046" alt="License: CC BY-NC-ND 4.0" title="License: CC BY-NC-ND 4.0" style="cursor: pointer; display: inline;"></span></a></p>
<p>最后，所有文章都会同步发送到微信公众号上，欢迎关注,欢迎提意见：  <span class="img-wrap"><img data-src="/img/remote/1460000009735938?w=430&amp;h=430" src="https://static.alili.tech/img/remote/1460000009735938?w=430&amp;h=430" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>作者：对角另一面</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
读Zepto源码之Ajax模块

## 原文链接
[https://segmentfault.com/a/1190000010879529](https://segmentfault.com/a/1190000010879529)

