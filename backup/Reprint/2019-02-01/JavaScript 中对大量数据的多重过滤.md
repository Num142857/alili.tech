---
title: 'JavaScript 中对大量数据的多重过滤' 
date: 2019-02-01 2:30:10
hidden: true
slug: hjgkntbgqek
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>所有代码使用 ES2015 语法，需要 ES5 语法的可以用 <a href="http://babeljs.io/repl" rel="nofollow noreferrer" target="_blank">Babel - Try it out</a> 或者 <a href="http://www.typescriptlang.org/play/index.html" rel="nofollow noreferrer" target="_blank">TypeScript Playground</a> 翻译。</p></blockquote>
<h2 id="articleHeader0">问题提出</h2>
<p>今天有朋友问我一个问题，前端通过 Ajax 从后端取得了大量的数据，需要根据一些条件过滤，过滤的方法是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Filter {
    filterA(s) {
        let data = this.filterData || this.data;
        this.filterData = data.filter(m => m.a === s);
    }
    
    filterB(s) {
        let data = this.filterData || this.data;
        this.filterData = data.filter(m => m.b === s);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Filter</span> </span>{
    filterA(s) {
        <span class="hljs-keyword">let</span> data = <span class="hljs-keyword">this</span>.filterData || <span class="hljs-keyword">this</span>.data;
        <span class="hljs-keyword">this</span>.filterData = data.filter(<span class="hljs-function"><span class="hljs-params">m</span> =&gt;</span> m.a === s);
    }
    
    filterB(s) {
        <span class="hljs-keyword">let</span> data = <span class="hljs-keyword">this</span>.filterData || <span class="hljs-keyword">this</span>.data;
        <span class="hljs-keyword">this</span>.filterData = data.filter(<span class="hljs-function"><span class="hljs-params">m</span> =&gt;</span> m.b === s);
    }
}</code></pre>
<p>现在迷糊了，觉得这样处理数据不对，但是又不知道该怎么处理。</p>
<h2 id="articleHeader1">发现问题</h2>
<p>问题就在过滤上，这样固然可以实现多重过滤（先调用 <code>filterA()</code> 再调用 <code>filterB()</code> 就可以实现），但是这个过滤是不可逆的。假如过滤过程是这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="f.filterA(&quot;a1&quot;);
f.filterB(&quot;b1&quot;);
f.filterA(&quot;a2&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">f.filterA(<span class="hljs-string">"a1"</span>);
f.filterB(<span class="hljs-string">"b1"</span>);
f.filterA(<span class="hljs-string">"a2"</span>);</code></pre>
<p>本来是希望按 <code>"a1"</code> 和 <code>"b1"</code> 过滤了数据之后，再修改第一个条件为 <code>"a2"</code>，但结果却成了空集。</p>
<h2 id="articleHeader2">解决问题</h2>
<p>发现了问题，就针对性的解决。这个问题既然是因为过滤过程不可逆造成的，那每次都直接从 <code>this.data</code> 开始过滤，而不是从 <code>this.filterData</code> 开始过滤，就能解决问题。如果要这样做，就需要将选择的过滤条件先记录下来。</p>
<h3 id="articleHeader3">记录过滤条件</h3>
<p>用一个列表记录过滤条件当然是可行的，但是注意对同一个条件的两次过滤是互斥的，只能保留最后一个，所以应该用 HashMap 更为合适。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Filter {
    constructor() {
        this.filters = {};
    }

    set(key, filter) {
        this.filters[key] = filter;
    }

    getFilters() {
        return Object.keys(this.filters).map(key => this.filters[key]);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Filter</span> </span>{
    <span class="hljs-keyword">constructor</span>() {
        <span class="hljs-keyword">this</span>.filters = {};
    }

    set(key, filter) {
        <span class="hljs-keyword">this</span>.filters[key] = filter;
    }

    getFilters() {
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.keys(<span class="hljs-keyword">this</span>.filters).map(<span class="hljs-function"><span class="hljs-params">key</span> =&gt;</span> <span class="hljs-keyword">this</span>.filters[key]);
    }
}</code></pre>
<p>这种情况下，像上面的过程表示为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="f.set(&quot;A&quot;, m => m.a === &quot;a1&quot;);
f.set(&quot;B&quot;, m => m.b === &quot;b1&quot;);
f.set(&quot;A&quot;, m => m.a === &quot;a1&quot;);

let filters = f.getFilters();  // length === 2;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">f.set(<span class="hljs-string">"A"</span>, m =&gt; m.a === <span class="hljs-string">"a1"</span>);
f.set(<span class="hljs-string">"B"</span>, m =&gt; m.b === <span class="hljs-string">"b1"</span>);
f.set(<span class="hljs-string">"A"</span>, m =&gt; m.a === <span class="hljs-string">"a1"</span>);

<span class="hljs-keyword">let</span> filters = f.getFilters();  <span class="hljs-comment">// length === 2;</span></code></pre>
<p>上面第 3 句设置的 filter 覆盖了第 1 句设置的那个。现在再用最后取得的 <code>filters</code> 依次来过滤原数据 <code>this.data</code>，就能得到正确的结果。</p>
<p>有人会觉得 <code>getFilters()</code> 返回的列表不是按 <code>set</code> 的顺序的——的确，这是 HashMap 的特点，无序。不过对于简单条件的判断，不管谁先谁后，结果是一样的。但是对于一些复合条件判断，就可能会有影响。</p>
<p>确实需要的话，可以通过 array 代替 map 来解决一下顺序的问题，但这样查找效率会降低（线性查找）。如果还想解决查找效率的问题，可以用 array + map 来处理。这里就不多说了。</p>
<h3 id="articleHeader4">过滤</h3>
<p>实际上在使用的时候，每次都 <code>getFilter()</code> 再用一个循环来处理确实比较慢。既然 <code>data</code> 都封装成 <code>Filter</code> 中，可以考虑直接给一个 <code>filter()</code> 方法来作为过滤接口。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Filter {
    filter() {
        let data = this.data;
        for (let f of this.getFilters()) {
            data = data.filter(f);
        }
        return data;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Filter</span> </span>{
    filter() {
        <span class="hljs-keyword">let</span> data = <span class="hljs-keyword">this</span>.data;
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> f <span class="hljs-keyword">of</span> <span class="hljs-keyword">this</span>.getFilters()) {
            data = data.filter(f);
        }
        <span class="hljs-keyword">return</span> data;
    }
}</code></pre>
<p>不过这样我觉得效率不太好，尤其是对大量数据的时候。不妨利用一下 <a href="https://lodash.com/" rel="nofollow noreferrer" target="_blank">lodash</a> 的延迟处理过程。</p>
<h4>利用 lodash 的延迟处理</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="filter() {
    let chain = _(this.data);
    for (let f of this.getFilters()) {
        chain = chain.filter(f);
    }
    return chain.value();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">filter() {
    <span class="hljs-keyword">let</span> chain = _(<span class="hljs-keyword">this</span>.data);
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> f <span class="hljs-keyword">of</span> <span class="hljs-keyword">this</span>.getFilters()) {
        chain = chain.filter(f);
    }
    <span class="hljs-keyword">return</span> chain.value();
}</code></pre>
<p>lodash 在数据大于 200 的时候会启用延迟处理过程，也就是说，它会处理成一个循环中依次调用每一个 filter，而不是对每一个 filter 进行一次循环。</p>
<blockquote>
<p>延迟处理和非延迟处理通过下图可以看出来区别。非延迟处理总共会进行 <code>n</code>（这里 n = 3） 次大循环，产生 <code>n - 1</code> 个中间结果。而延迟处理只会进行一次大循环，没有中间结果产生。</p>
<p><span class="img-wrap"><img data-src="/img/bVE6Du?w=588&amp;h=426" src="https://static.alili.tech/img/bVE6Du?w=588&amp;h=426" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
</blockquote>
<p>不过说实在的，我不太喜欢为了一点小事多加载一个库，所以干脆自己做个简单的实现</p>
<h4>自己实现延迟处理</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="filter() {
    const filters = this.getFilters();
    return data.filter(m => {
        for (let f of filters) {
            // 如果某个 filter 已经把它过滤掉了，也不用再用后面的 filter 来判断了
            if (!f(m)) {
                return false;
            }
        }
        return true;
    });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">filter() {
    <span class="hljs-keyword">const</span> filters = <span class="hljs-keyword">this</span>.getFilters();
    <span class="hljs-keyword">return</span> data.filter(<span class="hljs-function"><span class="hljs-params">m</span> =&gt;</span> {
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> f <span class="hljs-keyword">of</span> filters) {
            <span class="hljs-comment">// 如果某个 filter 已经把它过滤掉了，也不用再用后面的 filter 来判断了</span>
            <span class="hljs-keyword">if</span> (!f(m)) {
                <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
            }
        }
        <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
    });
}</code></pre>
<p>里面的 for 循环还可以用 Array.prototype.every 来简化：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="filter() {
    const filters = this.getFilters();
    return data.filter(m => {
        return filters.every(f => f(m));
    });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">filter() {
    <span class="hljs-keyword">const</span> filters = <span class="hljs-keyword">this</span>.getFilters();
    <span class="hljs-keyword">return</span> data.filter(<span class="hljs-function"><span class="hljs-params">m</span> =&gt;</span> {
        <span class="hljs-keyword">return</span> filters.every(<span class="hljs-function"><span class="hljs-params">f</span> =&gt;</span> f(m));
    });
}</code></pre>
<p>数据过滤其实并不是多复杂的事情，只要把思路理清楚，搞明白什么数据是需要保留的，什么数据是临时（中间过程）的，什么数据是最终结果……利用 Array.prototype 中的相关方法，或者诸如 lodash 之类的工具，很容易就处理出来了。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript 中对大量数据的多重过滤

## 原文链接
[https://segmentfault.com/a/1190000007371890](https://segmentfault.com/a/1190000007371890)

