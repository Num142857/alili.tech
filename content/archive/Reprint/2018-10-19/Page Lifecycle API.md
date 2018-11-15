---
title: Page Lifecycle API
hidden: true
categories: reprint
slug: 44eadeab
date: 2018-10-19 00:00:00
---

{{< raw >}}

            <p>今天的现代浏览器有时在系统资源受限的情境下会暂停页面或完全放弃执行它。将来，浏览器会主动执行此操作，因此它们会消耗更少的电量和内存。在Chrome 68中提供的<a href="https://wicg.github.io/page-lifecycle/spec.html">Page Lifecycle API</a>提供了生命周期钩子，因此网页可以安全地处理这些浏览器干预，而不会影响用户体验。具体请查看API了解你的应用程序是否需要实现这些特性。</p>
<h2>背景</h2>
<p>应用程序的生命周期是现代操作系统管理资源的关键。在Android, iOS, 和最近的Windows版本中，操作系统可以随时开始或结束应用程序。这使得这些平台可以简化和重新分配最有利于用户的资源。</p>
<p>在网络上， 有史以来从来没有过这样的生命周期， 所以应用程序可以一直保持运行态。运行大量网页后，内存，CPU，电池和网络等关键系统资源可能会超负荷运行，从而导致最终用户体验不佳。</p>
<p>虽然web平台早就有与生命周期状态相关的事件 — 如 <a href="https://developer.mozilla.org/en-US/docs/Web/Events/load">load</a>, <a href="https://developer.mozilla.org/en-US/docs/Web/Events/unload">unload</a>, and <a href="https://developer.mozilla.org/en-US/docs/Web/Events/visibilitychange">visibilitychange</a> —这些事件只允许开发者响应用户造成的生命周期状态更改。为了使Web能够在低功耗设备上可靠地工作（并且通常在所有平台上具有更高的资源意识），浏览器需要一种主动回收和重新分配系统资源的方法。</p>
<p>事实上，现在的浏览器已经对在后台标签的页面<a href="https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API#Policies_in_place_to_aid_background_page_performance">采取了积极措施来节约资源</a> , 而且很多的浏览器(特别是Chrome)会做更多这方面的工作 - 以减少它们的整体资源占用。</p>
<p>问题是开发者目前无法为系统执行的这类干预操作做好准备，甚至都不知道系统正在干预。 这意味着浏览器需要保护或冒险破坏网页。</p>
<p><a href="https://wicg.github.io/page-lifecycle/spec.html">Page Lifecycle API</a> 通过以下措施来解决这个问题:</p>
<ul>
<li><p>在网上介绍并标准化生命周期状态的概念。</p>
</li>
<li><p>定义新的系统启动状态，允许浏览器限制隐藏或非活动状态的标签页可以使用的资源。</p>
</li>
<li><p>创建新的API和事件，允许Web开发者响应这些新的系统启动状态的转换。</p>
</li>
</ul>
<p>这种解决方法提供了可预测性，网页开发人员需要创建一个能灵活应对系统干预的应用程序，而且这种解决方法让浏览器可以更加积极地优化系统资源，最终令所有web用户受益。</p>
<p>本篇文章剩余部分会介绍Chrome 68中新的页面生命周期特性，并且会探索这些特性与所有已存在的网页平台的状态和事件的关联。文章也为开发者应该（或不应该）在每个状态进行的工作类型提供建议和最佳实践。</p>
<h2>总览页面生命周期状态和事件</h2>
<p>所有的页面生命周期状态都是相互独立存在的， 也就是说一个页面在同一个时间点只能存在一个状态。而且通常大多数页面生命周期的状态改变都可通过DOM事件监听 ( 也有例外,查看<a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#developer-recommendations-for-each-state">开发者对每个状态的建议</a> ).</p>
<p>也许图表是最能直观解释页面生命周期状态的，它同样也能很好的标识事件间的转换：</p>
<p><a href="https://developers.google.com/web/updates/images/2018/07/page-lifecycle-api-state-event-flow.png"><img src="https://p0.ssl.qhimg.com/t01711864ebc928ca7c.png" alt="Page Lifecycle API state and event flow"></a></p>
<h3>状态</h3>
<p>下表详列了每个状态的细节信息。还列出了可能发生的前后状态，还包括开发者可以用来监听变化的事件。</p>
<table>
<thead>
<tr>
<th>状态</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Active</strong></td>
</tr>
</tbody>
</table>
<p>当页面可见或有input框聚焦时，该页面处于<em>active</em>状态</p>
<p><strong>可能之前的状态为:</strong> <a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#state-passive">passive</a> <em>(通过<a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#event-focus">focus</a> 事件转换而来)</em></p>
<p><strong>可能下个状态为:</strong> <a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#state-passive">passive</a> <em>(通过 <a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#event-blur">blur</a> 事件转换而来)</em></p>
<p>| | <strong>Passive</strong> |</p>
<p>当页面可见但没有聚焦的input框时，该页面处于<em>passive</em>状态</p>
<p><strong>之前可能的状态是:</strong> <a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#state-active">active</a> <em>(通过触发<a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#event-blur">blur</a> 事件而来)</em> <a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#state-hidden">hidden</a> <em>(通过<a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#event-visibilitychange">visibilitychange</a>触发事件而来)</em></p>
<p><strong>接下来可能变成的状态是:</strong> <a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#state-active">active</a> <em>(通过触发<a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#event-focus">focus</a> 事件而来)</em> <a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#state-hidden">hidden</a> <em>(通过触发<a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#event-visibilitychange">visibilitychange</a> 事件而来)</em></p>
<p>| | <strong>Hidden</strong> |</p>
<p>如果页面不可见且尚未被冻结，则处于<em>hidden</em>状态。</p>
<p><strong>之前可能的状态是:</strong> <a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#state-passive">passive</a> <em>(通过事件<a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#event-visibilitychange">visibilitychange</a>而来)</em></p>
<p><strong>接下来可能变成的状态:</strong> <a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#state-passive">passive</a> <em>(通过触发<a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#event-visibilitychange">visibilitychange</a>事件而来)</em> <a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#state-frozen">frozen</a> <em>(通过触发<a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#event-freeze">freeze</a>事件而来)</em> <a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#state-terminated">terminated</a> <em>(通过触发<a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#event-pagehide">pagehide</a>事件而来)</em></p>
<p>| | <strong>Frozen</strong> |</p>
<p>当处于<em>frozen</em>状态时，浏览器暂停执行页面里<a href="https://html.spec.whatwg.org/multipage/webappapis.html#task-queue">任务队列</a> 中 <a href="https://wicg.github.io/page-lifecycle/spec.html#html-task-source-dfn">可冻结的</a><a href="https://html.spec.whatwg.org/multipage/webappapis.html#queue-a-task">任务</a> 直到页面不是冻结状态. 也就是说像JavaScript定时器和fetch回调不会运行。已经运行的任务可以结束(特别是<a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#event-freeze">freeze</a>回调), 但它们可能会受限于它们做的是什么或能运行多久。</p>
<p>浏览器冻结页面是为了保护CPU/电池/数据使用，同样它也能使<a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#page-navigation-cache">后退/前进导航</a>更快— 因为避免了重新加载整个页。</p>
<p><strong>可能之前的状态为:</strong> <a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#state-hidden">hidden</a> <em>(通过触发<a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#event-freeze">freeze</a>事件而来)</em></p>
<p>_</p>
<p><strong>之后可能变成的状态:</strong> <a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#state-active">active</a> <em>(通过先触发<a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#event-resume">resume</a>事件, 再触发<a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#event-pageshow">pageshow</a>事件而来)</em> <a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#state-passive">passive</a> <em>(通过先触发 <a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#event-resume">resume</a>事件，再触发<a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#event-pageshow">pageshow</a>事件而来)</em> <a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#state-hidden">hidden</a> <em>(通过触发<a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#event-resume">resume</a>事件而来)</em></p>
<p>_ | | <strong>Terminated</strong> |</p>
<p>一旦浏览器卸载页面或在内存中清除页面时，页面就变为<em>terminated</em>状态. 在这种状态下不会运行<a href="https://html.spec.whatwg.org/multipage/webappapis.html#queue-a-task">新任务</a>, 并且正在进行的任务如果运行了太久也会被杀掉。</p>
<p><strong>之前可能的状态是:</strong> <a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#state-hidden">hidden</a> <em>(通过触发<a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#event-pagehide">pagehide</a>事件)</em></p>
<p><strong>之后可能的状态是:</strong> NONE</p>
<p>| | <strong>Discarded</strong> |</p>
<p>当页面被浏览器卸载为保护资源时，页面处于<em>discarded</em>状态.在这种状态下不会运行任何任务、事件回调甚至是JavaScript。因为在资源受限的情况下通常要放弃某些操作， 所以不可能开启一个新进程。</p>
<p>处在<em>discarded</em> 状态的tab页 (<a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#prevent-freeze-discard">包括tab页窗口的标题和图标</a> ) 即使是页面消失也总是对用户可见</p>
<p><strong>之前可能的状态是:</strong> <a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#state-frozen">frozen</a> <em>(不触发事件)</em></p>
<p><strong>之后可能的状态是:</strong> NONE</p>
<p>|</p>
<h3>事件</h3>
<p>浏览器会发送许多事件，但是只有小部分事件表明页面周期状态可能发生变化。下表概述了与生命周期相关的所有事件，并列出了它们可能转换前后的状态。</p>
<table>
<thead>
<tr>
<th>名字</th>
<th>细节信息</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="https://developer.mozilla.org/en-US/docs/Web/Events/focus">focus</a></td>
</tr>
</tbody>
</table>
<p>有DOM元素已经聚焦。</p>
<p><strong>备注:</strong> focus事件并不一定表示状态改变了。如果页面之前没有input聚焦，它仅表示状态更改。</p>
<p><strong>之前可能的状态是:</strong> <a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#state-passive">passive</a></p>
<p><strong>当前可能的状态:</strong> <a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#state-active">active</a></p>
<p>| | <a href="https://developer.mozilla.org/en-US/docs/Web/Events/blur">blur</a> |</p>
<p>有DOM元素失去焦点。</p>
<p><strong>备注:</strong> blur事件并不一定表示状态改变了。如果页面不再有input框聚焦(例如， 页面没有从一个聚焦的元素切换到另一个元素)， 它仅表示状态更改。</p>
<p><strong>之前可能的状态是:</strong> <a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#state-active">active</a></p>
<p><strong>当前可能的状态:</strong> <a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#state-passive">passive</a></p>
<p>| | <a href="https://developer.mozilla.org/en-US/docs/Web/Events/visibilitychange">visibilitychange</a> |</p>
<p>文档上， <a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/visibilityState">visibilityState</a>值已经更新了。文档的visibilityState值已更改。 当用户导航到新页面，切换选项卡，关闭选项卡，最小化或关闭浏览器或在移动端切换应用程序时，可能会使visibilityState的值改变。</p>
<p><strong>之前可能的状态是:</strong> <a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#state-passive">passive</a> <a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#state-hidden">hidden</a></p>
<p><strong>当前可能的状态:</strong> <a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#state-passive">passive</a> <a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#state-hidden">hidden</a></p>
<p>| | <a href="https://wicg.github.io/page-lifecycle/spec.html#sec-api">freeze</a> <strong>*</strong> |</p>
<p>页面刚被冻结. 页面任务队列不会执行任何<a href="https://wicg.github.io/page-lifecycle/spec.html#html-task-source-dfn">冻结的</a>任务。</p>
<p><strong>之前可能的状态:</strong> <a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#state-hidden">hidden</a></p>
<p><strong>当前可能的状态:</strong> <a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#state-frozen">frozen</a></p>
<p>| | <a href="https://wicg.github.io/page-lifecycle/spec.html#sec-api">resume</a> <strong>*</strong> |</p>
<p>The browser has resumed a <em>frozen</em> page. 浏览器已经恢复了<em>冻结的</em>页面</p>
<p><strong>之前可能的状态:</strong> <a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#state-frozen">frozen</a></p>
<p><strong>当前可能的状态:</strong> <a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#state-active">active</a> <em>(如果是紧随<a href="https://developer.mozilla.org/en-US/docs/Web/Events/pageshow">pageshow</a> 事件发生)</em> <a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#state-passive">passive</a> <em>(如果是紧随<a href="https://developer.mozilla.org/en-US/docs/Web/Events/pageshow">pageshow</a>事件发生)</em> <a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#state-hidden">hidden</a></p>
<p>| | <a href="https://developer.mozilla.org/en-US/docs/Web/Events/pageshow">pageshow</a> |</p>
<p>会话历史记录新增一条记录。</p>
<p>这可能是个全新的页面，也可能是<a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#page-navigation-cache">导航缓存中的页面</a>. 如果页面是页面导航缓存中，事件的持久属性为true，否则为false。</p>
<p><strong>可能之前的状态:</strong> <a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#state-frozen">frozen</a> <em>(<a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#event-resume">resume</a> 事件也会被触发)</em></p>
<p><strong>当前的状态:</strong> <a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#state-active">active</a> <a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#state-passive">passive</a> <a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#state-hidden">hidden</a></p>
<p>| | <a href="https://developer.mozilla.org/en-US/docs/Web/Events/pagehide">pagehide</a> |</p>
<p>会话历史记录新增一条记录。</p>
<p>如果用户在浏览另一个页面， 而且浏览器可能会添加当前的页面到<a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#page-navigation-cache">页面导航缓存</a> ,以便之后调用, 事件属性会持续为true，此时页面将进入到<em>frozen</em>状态， 否则会进入到结束状态。</p>
<p><strong>可能之前的状态是:</strong> <a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#state-hidden">hidden</a></p>
<p><strong>当前可能的状态是:</strong> <a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#state-frozen">frozen</a> <em>(event.persisted为true, <a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#event-freeze">freeze</a>事件紧随)</em> <a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#state-terminated">terminated</a> <em>(event.persisted为false, <a href="https://developer.mozilla.org/en-US/docs/Web/Events/unload">unload</a>事件紧随)</em></p>
<p>| | <a href="https://developer.mozilla.org/en-US/docs/Web/Events/beforeunload">beforeunload</a> |</p>
<p>window、document以及其资源即将被卸载。但在此时，document仍然是可见的，事件仍可以被取消。</p>
<p><strong>警告:</strong> beforeunload事件只能用于警告用户有未保存的改变。一旦保存后，事件应该会被清除。这样做不可能对页面没有影响，因为在某些场景下会牺牲性能。在<a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#legacy-lifecycle-apis-to-avoid">旧版API</a>看详细内容.</p>
<p><strong>之前可能的状态是：</strong> <a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#state-hidden">hidden</a></p>
<p><strong>当前可能的状态是:</strong> <a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#state-terminated">terminated</a></p>
<p>| | <a href="https://developer.mozilla.org/en-US/docs/Web/Events/unload">unload</a> |</p>
<p>此时页面正在卸载</p>
<p><strong>警告:</strong> 建议千万不要使用unload事件，因为它不稳定而且在某些场合下可能伤害性能。在<a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#legacy-lifecycle-apis-to-avoid">旧版API</a> 看详细内容.</p>
<p><strong>之前可能的状态是:</strong> <a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#state-hidden">hidden</a></p>
<p><strong>当前可能的状态:</strong> <a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#state-terminated">terminated</a></p>
<p>|</p>
<p><em><strong>*</strong> 以下展示页面生命周期API</em>定义的新事件</p>
<h3>在Chrome 68添加的新属性</h3>
<p>上面的部分展示了两种状态，它是系统初始化状态而非用户初始化状态：<a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#state-frozen">frozen</a> 和 <a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#state-discarded">discarded</a>. 正如以上提到的，现在的浏览器偶尔会冻结并丢弃隐藏的标签(他们自己决定), 但是开发者无法得知。</p>
<p>在Chrome 68, 开发者现在可以通过监听document的<a href="https://wicg.github.io/page-lifecycle/spec.html#sec-api">freeze</a>和<a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#event-resume">resume</a>事件来观察一个隐藏的tab标签什么时候冻结和解除冻结的.</p>
<pre><code class="hljs coffeescript"><span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">'freeze'</span>, <span class="hljs-function"><span class="hljs-params">(event)</span> =&gt;</span> {
  <span class="hljs-regexp">//</span> The page <span class="hljs-keyword">is</span> now frozen.
});

<span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">'resume'</span>, <span class="hljs-function"><span class="hljs-params">(event)</span> =&gt;</span> {
  <span class="hljs-regexp">//</span> The page has been unfrozen.
});


</code></pre><p>在chrome 68的文档对象中现在也包含了 <a href="https://wicg.github.io/page-lifecycle/spec.html#sec-api">wasDiscarded</a> 属性. 它用于决定在隐藏的标签中何时被抛弃。你可以在页面加载时检查这个值(备注：被抛弃后的页面要重新用必须重新加载).</p>
<pre><code class="hljs coffeescript"><span class="hljs-keyword">if</span> (<span class="hljs-built_in">document</span>.wasDiscarded) {
  <span class="hljs-regexp">//</span> Page was previously discarded <span class="hljs-keyword">by</span> the browser <span class="hljs-keyword">while</span> <span class="hljs-keyword">in</span> a hidden tab.
}


</code></pre><p>若想了解关于在freeze和resume事件发生时该做哪些重要操作的建议，或想知道页面即将被抛弃时如何处理和准备，请查看 <a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#developer-recommendations-for-each-state">对每个状态的开发者建议</a>.</p>
<p>接下来的几个章节概括了这些新特性如何适应已经存在的web平台的状态和事件。</p>
<h2>监听页面周期状态</h2>
<p>在<a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#state-active">active</a>, <a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#state-passive">passive</a>, 以及 <a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#state-hidden">hidden</a> 这些状态时,可以从现在的web平台API中执行一些JavaScript代码判断当前页面生命周期状态。</p>
<pre><code class="hljs coffeescript">const getState = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-keyword">if</span> (<span class="hljs-built_in">document</span>.visibilityState === <span class="hljs-string">'hidden'</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-string">'hidden'</span>;
  }
  <span class="hljs-keyword">if</span> (<span class="hljs-built_in">document</span>.hasFocus()) {
    <span class="hljs-keyword">return</span> <span class="hljs-string">'active'</span>;
  }
  <span class="hljs-keyword">return</span> <span class="hljs-string">'passive'</span>;
};


</code></pre><p>但<a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#state-frozen">frozen</a> 和 <a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#state-terminated">terminated</a>状态,当状态改变时只能在相应的事件(<a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#event-freeze">freeze</a> 和<a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#event-pagehide">pagehide</a>) 中才能监听到。</p>
<h3>观察状态改变</h3>
<p>基于上面定义的getState()函数，可以作如下修改，这样便可观察所有页面生命周期状态改变。</p>
<pre><code class="hljs pf">// Stores the initial <span class="hljs-keyword">state</span> using the getState() function (defined above).
let <span class="hljs-keyword">state</span> = getState();

// Accepts a next <span class="hljs-keyword">state</span> and, if there's been a <span class="hljs-keyword">state</span> change, logs the
// change <span class="hljs-keyword">to</span> the console. It also updates the <span class="hljs-keyword">state</span> value defined above.
const <span class="hljs-keyword">log</span>StateChange = (nextState) =&gt; {
  const prevState = <span class="hljs-keyword">state</span>;
  if (nextState !== prevState) {
    console.<span class="hljs-keyword">log</span>(State change: ${prevState} &gt;&gt;&gt; ${nextState});
    <span class="hljs-keyword">state</span> = nextState;
  }
};

// These lifecycle events can <span class="hljs-literal">all</span> use the same listener <span class="hljs-keyword">to</span> observe <span class="hljs-keyword">state</span>
// changes (they call the getState() function <span class="hljs-keyword">to</span> determine the next <span class="hljs-keyword">state</span>).
['pageshow', 'focus', 'blur', 'visibilitychange', 'resume'].<span class="hljs-keyword">for</span>Each((type) =&gt; {
  window.addEventListener(type, () =&gt; <span class="hljs-keyword">log</span>StateChange(getState()), {capture: true});
});

// The next two listeners, <span class="hljs-keyword">on</span> the other hand, can determine the next
// <span class="hljs-keyword">state</span> <span class="hljs-keyword">from</span> the event itself.
window.addEventListener('freeze', () =&gt; {
  // In the freeze event, the next <span class="hljs-keyword">state</span> is always frozen.
  <span class="hljs-keyword">log</span>StateChange('frozen');
}, {capture: true});

window.addEventListener('pagehide', (event) =&gt; {
  if (event.persisted) {
    // If the event's persisted property is true the page is about
    // <span class="hljs-keyword">to</span> enter the page navigation cache, which is also <span class="hljs-keyword">in</span> the frozen <span class="hljs-keyword">state</span>.
    <span class="hljs-keyword">log</span>StateChange('frozen');
  } else {
    // If the event's persisted property is not true the page is
    // about <span class="hljs-keyword">to</span> be unloaded.
    <span class="hljs-keyword">log</span>StateChange('terminated');
  }
}, {capture: true});


</code></pre><p>以上代码做了三件事:</p>
<ul>
<li><p>使用getState()函数设置初始状态。</p>
</li>
<li><p>定义一个入参为下个状态值的函数， 而且如果有状态值有改变，在控制台打印出这些改变。</p>
</li>
<li><p>为所有必要的生命周期事件添加捕获事件监听器，反过来调用logStateChange()函数， 传入需要改变的状态值为参数。</p>
</li>
</ul>
<p><strong>警告!</strong> 这段代码在不同的浏览器中会产生不同的结果, 因为事件顺序(以及可靠性)实现还未统一。查看<a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#managing-cross-browsers-differences">管理跨浏览器差异</a>学习处理这些差异的最佳实践.</p>
<p>对上面的代码要提醒一点， 所有的事件监听器都要被添加到window而且他们都会传入<a href="https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Syntax">{capture: true}</a>. 这么做有几个原因:</p>
<ul>
<li><p>不是所有的生命周期事件的target都一致。pagehide和pageshow事件会在window上触发; visibilitychange、freeze以及resume事件在document上触发, 而focus和blur事件会在他们各自的DOM元素上触发。</p>
</li>
<li><p>这些事件大部分不会冒泡，这就意味着不可能在公共的祖先上添加非捕获事件监听器监听所有的事件</p>
</li>
<li><p>捕获阶段在目标或冒泡阶段之前执行， 所以在此时添加事件监听器能确保它能在其他代码取消它们前执行。</p>
</li>
</ul>
<h3>管理跨浏览器差异</h3>
<p>本篇文章的开始根据页面生命周期API概述了状态和事件流。但由于这些API刚被引入， 新的事件和DOM API还未在所有的浏览器中实现。</p>
<p>此外, 当下所有浏览器实现的事件也并未一致。例如：</p>
<ul>
<li><p>当切换标签页时有些浏览器灭有触发blur事件。这就意味着(跟上面在表格和图表中的相反)页面可以直接从active 状态直接进入到hidden状态而不会先转为passive状态。</p>
</li>
<li><p>个别浏览器实现了<a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#page-navigation-cache">页面导航缓存</a>, 而页面生命周期API定义了缓存的页面应处于冻结状态。由于API完全是新的，所以这些浏览器还未实现freeze和resume事件, 即使这些状态仍然可以通过pagehide和pageshow事件被监听到。</p>
</li>
<li><p>IE浏览器老版(10及以下版本)没有实现visibilitychange事件。</p>
</li>
<li><p>pagehide和visibilitychange事件的发生顺序有所 <a href="https://github.com/w3c/page-visibility/issues/39">改变</a>. 如果在卸载页面时，并且页面处于可见状态，早期浏览器会先触发pagehide事件再触发visibilitychange事件。新的Chrome版本则是先触发visibilitychange事件再触发pagehide事件，无论卸载时文档是否为可见状态。</p>
</li>
</ul>
<p>为了让开发者更容易处理这些跨浏览器的矛盾问题，并能全心关注<a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#developer-recommendations-for-each-state">生命周期状态建议以及最佳实践</a>, 我们发布了<a href="https://github.com/GoogleChromeLabs/page-lifecycle">PageLifecycle.js</a>, 这是个用来监听页面生命周期API状态改变的JavaScript库。</p>
<p><a href="https://github.com/GoogleChromeLabs/page-lifecycle">PageLifecycle.js</a> 规范了跨浏览器在事件触发顺序的差异，这样状态就能准确如本文图表及表格中所述变化(而且在所有的浏览器中都能保持一致).</p>
<h2>各种状态时对开发者的建议</h2>
<p>作为开发者，了解页面生命周期_以及_知道在代码中如何监听它们都同样重要，因为你接下来应该做的(不应该做的)工作都会极大的依赖于当前页面的状态。</p>
<p>例如，如果页面处于hidden状态，很明显给用户瞬时性通知没有意义。由于这个例子非常明显，但总有不那么明显的场景，以下例举了其中值得关注的场景的建议.</p>
<table>
<thead>
<tr>
<th>状态</th>
<th>开发者建议</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Active</strong></td>
</tr>
</tbody>
</table>
<p>对用户来说<em>active</em>状态是最关键的，因此这是最好的时间<a href="https://developers.google.com/web/updates/2018/05/first-input-delay">响应用户输入</a>.</p>
<p>任何可能阻止主线程的非UI工作都应该被重新划分为<a href="https://developers.google.com/web/updates/2015/08/using-requestidlecallback">空闲时段</a> 或 <a href="https://developers.google.com/web/fundamentals/performance/rendering/optimize-javascript-execution#reduce_complexity_or_use_web_workers">卸载到Web worker</a>.</p>
<p>| | <strong>Passive</strong> |</p>
<p>在<em>passive</em>状态时， 用户不会与页面互动，但仍对用户可见。这也就是说UI更新及动画依然会流畅，但这些更新时间就没那么重要了。</p>
<p>当页面从<em>active</em>更改为<em>passive</em>时，现在是保持未保存的应用程序状态的好时机。</p>
<p>| | <strong>Hidden</strong> |</p>
<p>当页面从<em>passive</em>状态切换到<em>hidden</em>状态时，可能用户不会再跟它有交互直到页面被重新加载.</p>
<p>开发者能可靠的监听到最后状态变化可能是页面转换到<em>hidden</em>状态。 (特别是在移动设备上， 因为用户可以关掉tab标签或者是浏览器，此时， beforeunload, pagehide, unload事件都不会触发).</p>
<p>这意味着您应该将<em>hidden</em>状态视为用户会话可能结束. 换言之，这时该保存所有没有保存的应用状态、发送还未发送的所有需要分析的数据。</p>
<p>这时候也应该停止更新UI(因为用户都不会看到了)，也要关闭所有用户不希望在后台运行的程序。</p>
<p>| | <strong>Frozen</strong> |</p>
<p>页面处于<em>frozen</em>状态时,在 <a href="https://html.spec.whatwg.org/multipage/webappapis.html#task-queue">任务队列</a> <a href="https://html.spec.whatwg.org/multipage/webappapis.html#queue-a-task">冻结的任务</a> 会被挂起直到页面不再被冻结——这可能永远不会发生(例如： 页面被抛弃).</p>
<p>这意味着页面从<em>hidden</em>转为<em>frozen</em>时，必须停止任何计时器或拆除任何连接，如果冻结，可能会影响同一源的其他open的选项卡标签，或影响浏览器将页面放入<a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#page-navigation-cache">页面导航缓存</a>的能力.</p>
<p>特别值得一提的是：</p>
<ul>
<li><p>关闭所有打开的<a href="https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API">IndexedDB</a>连接。</p>
</li>
<li><p>关闭打开的<a href="https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API">BroadcastChannel</a>连接。</p>
</li>
<li><p>关闭打开的<a href="https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API">WebRTC</a>连接.</p>
</li>
<li><p>停止所有网络轮询以及所有打开的<a href="https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API">Web Socket</a>连接.</p>
</li>
<li><p>释放所有被保持的<a href="https://github.com/inexorabletash/web-locks">Web Locks</a>.</p>
</li>
</ul>
<p>应该将任何动态的视图状态(e.g. 无限滚动列表视图的滚动位置) 保存到<a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage">sessionStorage</a> (或者<a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#save-data-to-indexeddb-before-freezing">通过commit()提交到IndexedDB</a> ) 这样的话，如果随后页面被抛弃又重新加载就能恢复原来的状态。</p>
<p>如果页面从<em>frozen</em>转变为<em>hidden</em>,你可以重新打开在任何开始冻结状态时关闭的连接或者重启那时被停止的轮询。</p>
<p>| | <strong>Terminated</strong> |</p>
<p>通常在页面转为<em>terminated</em>状态时不需要做任何操作。</p>
<p>由于页面即将被卸载，导致用户行为总是在进入terminated状态前进入hidden状态，进入hidden状态时应该执行会话结束逻辑(例如，保存应用程序状态和提交分析数据).</p>
<p>当然 (正如<a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#advice-hidden">对<em>hidden</em>状态建议</a>中提到的), 对开发者而言了解转为<em>terminated</em>状态在许多场景下（特别是移动设备上）是不可靠的极为重要， 所以依靠termination事件(例如，beforeunload, pagehide, 还有unload事件)都有可能丢失数据。</p>
<p>| | <strong>Discarded</strong> |</p>
<p>当页面正被抛弃时， <em>discarded</em>状态不会被开发者监听到。这是因为页面通常在资源约束下被丢弃，并且在大多数情况下根本不可能解冻页面以允许脚本运行响应丢弃事件.</p>
<p>所以， 在从hidden转变到frozen时，你应该做好有可能页面会被抛弃的准备。这样的话，在页面加载时，通过检查document.wasDiscarded属性来恢复抛弃的页面状态。</p>
<p>|</p>
<p>再次重申, 由于不同的浏览器对生命周期事件的可靠性及顺序实现不统一。若要根据上表的建议最简单的是使用 <a href="https://github.com/GoogleChromeLabs/page-lifecycle">PageLifecycle.js</a>.</p>
<h2>##要避免的旧版生命周期API</h2>
<h3>unload事件</h3>
<p><strong>关键点:</strong> 千万别再现代浏览器中使用unload事件。</p>
<p>许多开发者认为unload事件是能保证会回调，所以使用它作为结束会话的信号来保存状态或者发送分析数据。但这样做<strong>极为不靠谱</strong>, 特别是在移动设备上! unload事件在一些典型的unload场景中并没有被触发，包括从移动设备上标签切换器上关闭标签还有从app切换器上直接关闭浏览器app.</p>
<p>由于这种原因, 依赖<a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#event-visibilitychange">visibilitychange</a> 事件来决定会话是否结束更好，而且可以把hidden状态当做 <a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#advice-hidden">最后一次最可靠的事件来保存app及用户数据</a>.</p>
<p>另外, 仅仅在已注册的卸载事件处理程序（通过onunload或addEventListener（））就可以防止浏览器将页面放入 <a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#page-navigation-cache">页面导航缓存</a> 中，以实现更快的后退和前进加载。</p>
<p>现代浏览器(包括IE11), 都建议始终用<a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#event-pagehide">pagehide</a> 事件来检测页面是否被卸载 (a.k.a <a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#state-terminated">terminated</a>状态) 而不是用unload事件. 如果你需要支持Internet Explorer版本10及以下, 您应该检测pagehide事件，如果浏览器不支持pagehide，则只使用unload：</p>
<pre><code class="hljs coffeescript">const terminationEvent = <span class="hljs-string">'onpagehide'</span> <span class="hljs-keyword">in</span> self ? <span class="hljs-string">'pagehide'</span> : <span class="hljs-string">'unload'</span>;

addEventListener(terminationEvent, <span class="hljs-function"><span class="hljs-params">(event)</span> =&gt;</span> {
  <span class="hljs-regexp">//</span> Note: <span class="hljs-keyword">if</span> the browser <span class="hljs-keyword">is</span> able to cache the page, event.persisted
  <span class="hljs-regexp">//</span> <span class="hljs-keyword">is</span> <span class="hljs-literal">true</span>, <span class="hljs-keyword">and</span> the state <span class="hljs-keyword">is</span> frozen rather than terminated.
}, {capture: <span class="hljs-literal">true</span>});


</code></pre><p>想要了解更多关于页面导航缓存，以及unload事件为何会破坏它们，请看:</p>
<ul>
<li><p><a href="https://webkit.org/blog/427/webkit-page-cache-i-the-basics/">WebKit Page Cache</a></p>
</li>
<li><p><a href="https://developer.mozilla.org/en-US/Firefox/Releases/1.5/Using_Firefox_1.5_caching">Firefox Back-Forward Cache</a></p>
</li>
</ul>
<h3>beforeunload 事件</h3>
<p><strong>关键点:</strong> 永远不要无条件地添加beforeunload监听器或将其用作为会话结束信号。 仅在用户未保存的工作时添加，并在保存工作后立即将其删除。</p>
<p>beforeunload和unload事件的问题类似，因为当它发生时会阻止浏览器在其<a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#page-navigation-cache">页面导航缓存</a>中缓存页面</p>
<p>beforeunload和unload事件的不同之处是使用beforeunload是被允许的. 例如,当你想要警告用户如果继续卸载页面未保存的变化将会丢失。</p>
<p>由于有正当理由使用beforeunload，但使用它会阻止页面添加到页面导航缓存中。所以建议只在用户有未保存的变化状态时才添加beforeunload监听，在保存好这些改变立即删除。</p>
<p>换句话说，不要这样做（因为它无条件地添加了一个beforeunload监听器）:</p>
<pre><code class="hljs coffeescript">addEventListener(<span class="hljs-string">'beforeunload'</span>, <span class="hljs-function"><span class="hljs-params">(event)</span> =&gt;</span> {
  <span class="hljs-regexp">//</span> A function that returns <span class="hljs-literal">true</span> <span class="hljs-keyword">if</span> the page has unsaved changes.
  <span class="hljs-keyword">if</span> (pageHasUnsavedChanges()) {
    event.preventDefault();
    <span class="hljs-keyword">return</span> event.returnValue = <span class="hljs-string">'Are you sure you want to exit?'</span>;
  }
}, {capture: <span class="hljs-literal">true</span>});


</code></pre><p>应该这样处理(只在需要的时候添加beforeunload监听， 在不需要的时候删除监听处理器):</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">const</span> beforeUnloadListener = <span class="hljs-function">(<span class="hljs-params">event</span>) =&gt;</span> {
  event.preventDefault();
  <span class="hljs-keyword">return</span> event.returnValue = <span class="hljs-string">'Are you sure you want to exit?'</span>;
};

<span class="hljs-comment">// A function that invokes a callback when the page has unsaved changes.</span>
onPageHasUnsavedChanges(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  addEventListener(<span class="hljs-string">'beforeunload'</span>, beforeUnloadListener, {<span class="hljs-attr">capture</span>: <span class="hljs-literal">true</span>});
});

<span class="hljs-comment">// A function that invokes a callback when the page's unsaved changes are resolved.</span>
onAllChangesSaved(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  removeEventListener(<span class="hljs-string">'beforeunload'</span>, beforeUnloadListener, {<span class="hljs-attr">capture</span>: <span class="hljs-literal">true</span>});
});


</code></pre><p><strong>备注:</strong> <a href="https://github.com/GoogleChromeLabs/page-lifecycle">PageLifecycle.js</a> 库提供了简便方法addUnsavedChanges()和removeUnsavedChanges(), 都是会遵循以上概述的最佳实践. 它们基于一个<a href="https://docs.google.com/document/d/1SXY2zGDgh7L73kX3bXfxCi15IV_Z7RnH9lRIZnuqf6g/edit?usp=sharing">提案草案</a>，正式用声明性API替换beforeunload事件，该API在移动平台上不易被滥用且更可靠。</p>
<p>若你想正确地使用beforeunload事件并且能跨浏览器工作，建议使用<a href="https://github.com/GoogleChromeLabs/page-lifecycle">PageLifecycle.js</a>。</p>
<h2>FAQs</h2>
<h3>我的页面在hidden时非常重要，我如何能避免它被冻结或是被抛弃？</h3>
<p>在hidden状态下运行时，有很多合理的场景网页都不应被冻结。最常见的例子是当app在播放音乐时。</p>
<p>在某些情况下Chrome丢弃页面会很危险，例如假设页面包含有未提交用户输入的表单，或是有个在页面卸载时发出警告的beforeunload处理程序。</p>
<p>目前， 在丢弃页面时Chrome将更保守，只有在有把握不会影响用户时才会这样做。例如，在hidden状态时，页面会监听是否有如下情况，若有Chrome不会丢弃该页面，除非资源极其受限:</p>
<ul>
<li><p>播放音频</p>
</li>
<li><p>正在使用WebRTC</p>
</li>
<li><p>更新表格标题或图标时</p>
</li>
<li><p>弹出警告时</p>
</li>
<li><p>发送推送通知</p>
</li>
</ul>
<p><strong>备注:</strong> 对于更新标题或网站图标以提醒用户未读通知的网页，我们目前 <a href="https://github.com/WICG/page-lifecycle/issues/24">目前有一项提议，从service worker来更新</a>,这允许Chrome冻结或丢弃页面，但仍然会显示更改的tab标题或网站图标。</p>
<h3>什么是页面导航缓存?</h3>
<p>页面导航缓存是个一般术语，用于描述一些浏览器实现更快前进或后退按钮的导航优化。Webkit把它叫做<a href="https://webkit.org/blog/427/webkit-page-cache-i-the-basics/">页面缓存</a> 而Firefox称它为<a href="https://developer.mozilla.org/en-US/Firefox/Releases/1.5/Using_Firefox_1.5_caching">Back-Forwards Cache</a> (或是简写bfcache).</p>
<p>当用户离开页面时，这些浏览器会冻结该页面的版本，以便用户使用前进或后退按钮导航时能快速恢复。请记住，添加beforeunload或unload事件处理器 <a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#legacy-lifecycle-apis-to-avoid">能阻止优化</a>.</p>
<p>归根结底，这个冻结与浏览器为了保护CPU/电量所做的冻结都有同样的功能; 因此这种情况也被认为是<a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#state-frozen">frozen</a>生命周期状态.</p>
<h3>###为什么没有提及load或者DOMContentLoaded事件?</h3>
<p>页面生命周期API定义的状态是相互独立，没有关联的。由于页面能在active、passive、或者hidden状态时都可以加载，单独的loading状态没有意义存在。而且也因为load和DOMContentLoaded事件并不标识页面生命周期状态变化，所以它们与API没有关系.</p>
<h3>如果在frozen或terminated状态不能执行异步API, 如何保存数据到IndexedDB?</h3>
<p>在frozen或terminated状态下, 在页面 <a href="https://html.spec.whatwg.org/multipage/webappapis.html#task-queue">任务队列里</a>的<a href="https://wicg.github.io/page-lifecycle/spec.html#html-task-source-dfn">冻结任务</a> 被挂起，也就是说不能可靠的调用异步操作或基于API的回调（如IndexedDB）。</p>
<p>将来, 我们将<a href="https://github.com/w3c/IndexedDB/pull/242">为IDBTransaction对象添加commit()方法</a>, 这样为开发者提供了高效执行只写的数据处理方法而无需回调.换言之, 如果开发者仅仅是想将数据写入到IndexedDB而不需执行包含一系列读写数据的复杂数据处理，那么commit()方法能在任务队列被挂起前完成。 (假设IndexedDB数据库已经打开).</p>
<p>但是，对于今天需要工作的代码，开发人员有两种选择：</p>
<ul>
<li><p><strong>使用Session Storage:</strong> <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage">Session Storage</a>是同步的而且跨页丢弃持久保存。</p>
</li>
<li><p><strong>从service worker中使用IndexedDB:</strong> 在页面被终止或丢弃时，service worker可以将数据存在IndexedDb. 在freeze或pagehide事件监听器中可以通过<a href="https://googlechrome.github.io/samples/service-worker/post-message/">postMessage()</a>发送数据到service worker, service worker可以处理保存数据.</p>
</li>
</ul>
<p><strong>备注:</strong> 虽然上面的第二种方法能解决问题，但是在由于内存压力导致设备冻结或丢弃的场景下，这种方案就不是很理想。因为浏览器需要启动service worker进程，这会带来更大的压力。</p>
<h2>在frozen或discarded状态下测试app</h2>
<p>要在frozen和discarded状态下测试app行为, 可以访问 <a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/chrome://discards">chrome://discards</a>冻结或丢弃任何你打开的标签页。</p>
<p><a href="https://developers.google.com/web/updates/images/2018/07/chrome-discards.png"><img src="https://p0.ssl.qhimg.com/t012753ea23cd26ce1c.png" alt="Chrome Discards UI"></a></p>
<p>这确保你当页面在丢弃后重加载时能正确的处理freeze和resume事件以及document.wasDiscarded 标志</p>
<h2>总结</h2>
<p>开发者若想要尊重用户设备的系统资源，要时刻牢记在app中使用压面生命周期状态。 在用户不期望的情况下，网页不会消耗过多的系统资源，这一点至关重要。</p>
<p>此外, 越多的开发者开始实现新的生命周期API，浏览器冻结或丢弃不使用的页面就越安全。这就意味着浏览器会消耗更少的内存、CPU、电量, 这对用户也是件好事。</p>
<p>最近, 开发者若想要实现本文提到的 <a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api/#developer-recommendations-for-each-state">最佳实践</a>，但又不想去记所有可能的状态及事件转换那就使用 <a href="https://github.com/GoogleChromeLabs/page-lifecycle">PageLifecycle.js</a>吧，这样可以很容易在所有浏览器监听到一致的生命周期状态变化。</p>

          
{{< /raw >}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/page-lifecycle-api](https://www.zcfy.cc/article/page-lifecycle-api)
原文标题: Page Lifecycle API
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
