---
title: '[譯] scroll-behavior 滑順的捲動效果' 
date: 2019-02-09 2:30:59
hidden: true
slug: e0ae25i3j5
categories: [reprint]
---

{{< raw >}}

                    
<p>眾所皆知 HTML 錨點(anchor link)透過給定標籤 <code>id</code> 屬性跳到頁面上特定位置的功能。不過這個效果感覺上就像是閃一下就切換到該位置。<br>為了使用體驗上的感覺有時候網站會設計一種<code>平滑捲動到該位置</code>的效果。</p>
<p>在過去這樣的效果通常會透過 jQuery 來達成，但有時候一些簡單的頁面為了達成這個功能就需要載入一堆函式庫或框架這未免有點矯枉過正。<br>最新的 Javascript 提供了一個更有效率，加強原生 <code>window.scrollTo</code> 的方式。</p>
<p>一個標準的錨點已經是一個被廣泛使用的基本技巧: 透過這種方式就算新的 <code>smooth scroll</code> 滑順捲動的語法不被支援就的方法仍然會運作，就是跳到該位置。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<a href=&quot;#dest&quot;>Click to somewhere</a>
...
<p id=&quot;dest&quot;>This is the target</p>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#dest"</span>&gt;</span>Click to somewhere<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
...
<span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"dest"</span>&gt;</span>This is the target<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></code></pre>
<blockquote><p>要注意的是頁面內容要超過可視區域就是至少 scroll bar 要出現，如果瀏覽器已經在畫面上顯示出兩者且沒得捲就沒有效果。因此我們需要在連結和錨點之間補上一些內容。</p></blockquote>
<h1 id="articleHeader0">兩種方式</h1>
<p>由於 <code>Smooth Scrolling API</code> 有兩種，一種是 CSS, 一種則是 Javascript。也因此造成混亂的原因是部分瀏覽器有支援上不一致。</p>
<p>CSS 的方式非常簡單，只要在該元素設定 <code>scroll-behavior: smooth;</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
  scroll-behavior: smooth;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
  <span class="hljs-attribute">scroll-behavior</span>: smooth;
}</code></pre>
<blockquote><p>注意是 <code>behavior</code> 而不是 <code>behaviour</code></p></blockquote>
<p>這個方式非常方便不過目前只有 Firefox 支援，<a href="http://caniuse.com/#search=scroll-behavior" rel="nofollow noreferrer" target="_blank">查閱 Can I Use</a>。</p>
<h1 id="articleHeader1">Javascript</h1>
<p>然後是 Javascript 的方式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var anchor = document.querySelector('a[href=&quot;#dest&quot;]')
var target = document.getElementById('dest')
anchor.addEventListener('click', function (e) {
  if (window.scrollTo) {
    e.preventDefault()
    window.scrollTo({'behavior': 'smooth', 'top': target.offsetTop})
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> anchor = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'a[href="#dest"]'</span>)
<span class="hljs-keyword">var</span> target = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'dest'</span>)
anchor.addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
  <span class="hljs-keyword">if</span> (<span class="hljs-built_in">window</span>.scrollTo) {
    e.preventDefault()
    <span class="hljs-built_in">window</span>.scrollTo({<span class="hljs-string">'behavior'</span>: <span class="hljs-string">'smooth'</span>, <span class="hljs-string">'top'</span>: target.offsetTop})
  }
})</code></pre>
<p>注意到 <code>window.scrollTo</code> 跟現有的 Javascript 在參數上有些不同，如果你直接用在 Chrome 下，您就會出現參數數量不對的錯誤，所以實務上要應用還是需要額外做些處理。</p>
<p>另外這種方式有一個缺點，那就是我們不能自訂 <code>timing function</code>。</p>
<h1 id="articleHeader2">延伸</h1>
<p>上面的 script 已經可以讓單一的錨點正常的運作，不過這種方式有點面對大量連結的時候有點麻煩。假如我們在這個頁面有幾個錨點都要這功能，那麼我們可以簡單的實作如下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var applyScrolling = function (arr, cb) {
  for (var i = 0; i < arr.length; i++) {
    cb.call(null, i, arr[i])
  }
}

// 注意如果有使用 router 那麼自訂一個 class 可以避免一些問題
var anchors = document.querySelectorAll(&quot;a[href^='#']&quot;)
if (window.scrollTo) {
  applyScrolling(anchors, function (index, el) {
    var target = document.getElementById(el.getAttribute('href').substring(1))

    el.addEventListener('click', function (e) {
      console.log(target)
      e.preventDefault()
      // 這邊跟新的 method 參數是不同的。
      window.scrollTo(0, target.offsetTop)
    })
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> applyScrolling = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">arr, cb</span>) </span>{
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; arr.length; i++) {
    cb.call(<span class="hljs-literal">null</span>, i, arr[i])
  }
}

<span class="hljs-comment">// 注意如果有使用 router 那麼自訂一個 class 可以避免一些問題</span>
<span class="hljs-keyword">var</span> anchors = <span class="hljs-built_in">document</span>.querySelectorAll(<span class="hljs-string">"a[href^='#']"</span>)
<span class="hljs-keyword">if</span> (<span class="hljs-built_in">window</span>.scrollTo) {
  applyScrolling(anchors, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">index, el</span>) </span>{
    <span class="hljs-keyword">var</span> target = <span class="hljs-built_in">document</span>.getElementById(el.getAttribute(<span class="hljs-string">'href'</span>).substring(<span class="hljs-number">1</span>))

    el.addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
      <span class="hljs-built_in">console</span>.log(target)
      e.preventDefault()
      <span class="hljs-comment">// 這邊跟新的 method 參數是不同的。</span>
      <span class="hljs-built_in">window</span>.scrollTo(<span class="hljs-number">0</span>, target.offsetTop)
    })
  })
}</code></pre>
<h1 id="articleHeader3">譯者小結</h1>
<p>目前在 Firefox 下兩種方式都可以使用，而 Chrome 則需要額外的開啟設定。本文就是先記錄一下這些新的屬性與 API。</p>
<h1 id="articleHeader4">參考</h1>
<ul><li><p><a href="http://thenewcode.com/507/Smooth-Page-Scroll-in-5-Lines-of-JavaScript" rel="nofollow noreferrer" target="_blank">Smooth Page Scroll in 5 Lines of JavaScript</a></p></li></ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[譯] scroll-behavior 滑順的捲動效果

## 原文链接
[https://segmentfault.com/a/1190000005640302](https://segmentfault.com/a/1190000005640302)

