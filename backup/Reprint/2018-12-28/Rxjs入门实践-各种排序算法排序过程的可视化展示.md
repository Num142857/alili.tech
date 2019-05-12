---
title: 'Rxjs入门实践-各种排序算法排序过程的可视化展示' 
date: 2018-12-28 2:30:11
hidden: true
slug: bnj8muu0xhh
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">Rxjs入门实践-各种排序算法排序过程的可视化展示</h2>
<blockquote>这几天学习下《算法》的排序章节，<a href="https://github.com/xiyuyizhi/notes/blob/master/data_structure/algo2/algorithms2.md" rel="nofollow noreferrer" target="_blank">具体见对排序的总结</a>,想着做点东西，能将各种排序算法的排序过程使用Rxjs通过可视化的方式展示出来，正好练系一下Rxjs的使用<p>本文不会太多介绍Rxjs的基本概念，重点介绍如何用响应式编程的思想来实现功能</p>
</blockquote>
<p><a href="https://xiyuyizhi.github.io/rxjs-sort-visualization/" rel="nofollow noreferrer" target="_blank">在线演示地址</a></p>
<p><a href="https://github.com/xiyuyizhi/rxjs-sort-visualization" rel="nofollow noreferrer" target="_blank">源码</a></p>
<p>效果图</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011666029?w=300&amp;h=189" src="https://static.alili.tech/img/remote/1460000011666029?w=300&amp;h=189" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader1">需求</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011666030?w=600&amp;h=320" src="https://static.alili.tech/img/remote/1460000011666030?w=600&amp;h=320" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>页面中包括一个随机生成300个数字的按钮和、一个选择不同排序算法的下拉列表和一个echart渲染的容器元素</p>
<p>点击按钮会随机生成300个随机数，同时页面渲染出300个数的柱状图，然后选择一种排序算法后，页面开始展示排序过程，在排序过程中如果我们切换成另一种排序算法，会停止当前算法的可视化展示，转而开始新的排序算法的可视化展示</p>
<h3 id="articleHeader2">思路</h3>
<p>要展示出排序算法在排序过程中数组中数据的变化，我们要<code>定期保存一下排序过程中当前数组的快照</code>，然后通过echart展示当前数组的数据,重复这个过程直到排序完成，我们也就有了表示排序过程的一个动画展示</p>
<h3 id="articleHeader3">具体实现</h3>
<p>在Rxjs中，一切皆是流，要实现这个功能，重要的是确定好数据流，以及数据流在未来一段时间内的变化过程</p>
<p>根据页面，可以清晰的确定几个数据流</p>
<p>按钮点击操作生成的数据流</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const createNumber$ = Rx.Observable.fromEvent(query('.numberCreator'), 'click')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">const createNumber$ = Rx<span class="hljs-selector-class">.Observable</span><span class="hljs-selector-class">.fromEvent</span>(query(<span class="hljs-string">'.numberCreator'</span>), <span class="hljs-string">'click'</span>)</code></pre>
<p>切换下拉列表生成的数据流</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const select$ = Rx.Observable.fromEvent(query('.sortTypes'), 'change')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">const select$ = Rx<span class="hljs-selector-class">.Observable</span><span class="hljs-selector-class">.fromEvent</span>(query(<span class="hljs-string">'.sortTypes'</span>), <span class="hljs-string">'change'</span>)</code></pre>
<p>点击按钮生成随机数组并渲染echart图表很显然就用到map和do这两个operator</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    createNumber$
    .map(e => {
        return numberCreator()
    })
    .do(nums => {
        const option = getOption(nums)
        echartInstance.setOption(option)
    })
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>    createNumber$
    .map(<span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> {
        <span class="hljs-keyword">return</span> numberCreator()
    })
    .do(<span class="hljs-function"><span class="hljs-params">nums</span> =&gt;</span> {
        <span class="hljs-keyword">const</span> option = getOption(nums)
        echartInstance.setOption(option)
    })
    </code></pre>
<p>切换下拉列表时我们要得到当前选择的排序算法的一个标识</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let currentType
select$
    .map(e => e.target)
    .map(x => x.options[x.selectedIndex].value)
    .map(type => {
        return {
            type,
            timer:1
        }
    })
    .do(x => {
        currentType = x.type
    })
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs n1ql"><code>let currentType
<span class="hljs-keyword">select</span>$
    .<span class="hljs-keyword">map</span>(<span class="hljs-built_in">e</span> =&gt; <span class="hljs-built_in">e</span>.target)
    .<span class="hljs-keyword">map</span>(x =&gt; x.options[x.selectedIndex].<span class="hljs-keyword">value</span>)
    .<span class="hljs-keyword">map</span>(<span class="hljs-built_in">type</span> =&gt; {
        <span class="hljs-keyword">return</span> {
            <span class="hljs-built_in">type</span>,
            timer:<span class="hljs-number">1</span>
        }
    })
    .<span class="hljs-keyword">do</span>(x =&gt; {
        currentType = x.<span class="hljs-built_in">type</span>
    })
</code></pre>
<p><strong>下面是重点</strong></p>
<p>只点击按钮或者只切换下拉页面都不应该展示排序过程，只有当两个事件流都触发了，并且之后某一个再次触发的时候才会渲染排序过程的动画，所以我们需要<code>combineLatest</code>操作符,将两个数据流合并成一个</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const combine$=Rx.Observable.combineLatest(
    createNumber$,
    select$
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code>const combine<span class="hljs-variable">$=</span>Rx.Observable.combineLatest(
    createNumber<span class="hljs-variable">$,</span>
    select<span class="hljs-variable">$
</span>)</code></pre>
<p>现在在combine$数据流中我们就有个随机数组和排序类型</p>
<p>[Array[300],'1']</p>
<p>然后就应该排序算法进行工作了，这里思考一下</p>
<ul>
<li>[] 怎样来生成我们排序算法排序过程中数据的快照？</li>
<li>[] 生成的数据快照什么时候让echart来渲染？</li>
</ul>
<p>对于第一点，我们需要将<code>排序算法封装成一个自定义的operator</code>,在排序过程中不断next() 数据快照,<br>到这里我们的数据流就变成能在<code>未来一段时间内不断生成新Value的一个数据流</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
Rx.Observable.prototype.sort = function () {
    const input = this
    return Rx.Observable.create((observer) => {
        input.subscribe((arr) => {
            const nums = clone(arr[0])
            const select = arr[1]
            const sortMethod = sortTypes[select.type]
            sortMethod(nums, function (arr) {
                observer.next({
                    nums: JSON.parse(JSON.stringify(arr)),
                    select
                })
            }, error => {
                observer.error(error)
            })
        }, )

    })
}

combine$.sort()
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>
Rx.Observable.prototype.sort = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">const</span> input = <span class="hljs-keyword">this</span>
    <span class="hljs-keyword">return</span> Rx.Observable.create(<span class="hljs-function">(<span class="hljs-params">observer</span>) =&gt;</span> {
        input.subscribe(<span class="hljs-function">(<span class="hljs-params">arr</span>) =&gt;</span> {
            <span class="hljs-keyword">const</span> nums = clone(arr[<span class="hljs-number">0</span>])
            <span class="hljs-keyword">const</span> select = arr[<span class="hljs-number">1</span>]
            <span class="hljs-keyword">const</span> sortMethod = sortTypes[select.type]
            sortMethod(nums, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">arr</span>) </span>{
                observer.next({
                    <span class="hljs-attr">nums</span>: <span class="hljs-built_in">JSON</span>.parse(<span class="hljs-built_in">JSON</span>.stringify(arr)),
                    select
                })
            }, error =&gt; {
                observer.error(error)
            })
        }, )

    })
}

combine$.sort()
</code></pre>
<p>对于第二点，因为排序算法是非常快的，如果我们subscibe sort()操作符产生的新值就开始渲染echart,页面上是看不出动画效果的，所以，我们需要<code>延迟echart渲染图表的过程</code>,我们需要将sort()触发的值<code>转变成一个异步的新事件流并打平到原数据流中</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="combine$
    .sort()
    .flatMap(obj => {
        return Rx.Observable.of(obj).delay(100 * obj.select.timer++)
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code><span class="hljs-built_in">combine</span>$
    .<span class="hljs-built_in">sort</span>()
    .flatMap(obj =&gt; {
        <span class="hljs-built_in">return</span> Rx.Observable.of(obj).<span class="hljs-built_in">delay</span>(<span class="hljs-number">100</span> * obj.select.<span class="hljs-built_in">timer</span>++)
    })</code></pre>
<p><code>注意obj.select.timer++</code>，对于sort()前后触发的两个值，为了展示出echart渲染的动画，我们要给它们渲染的时间依次递增</p>
<p>到这一步，我们的单次功能就能正常进行了，但如果<code>在一个排序动画过程还没有结束，我们又点击了一个新的排序类型</code>，则新旧两次的还在<code>序列</code>中没进行的渲染都会依次进行，干扰echart渲染的效果，所以在切换到新的类型时，我们要过滤序列中的值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="combine$
    .sort()
    .flatMap(obj => {
        return Rx.Observable.of(obj).delay(100 * obj.select.timer++)
    })
    .filter(x => {
        return x.select.type == currentType
    })
    .do(x => {
        const option = getOption(x.nums)
        echartInstance.setOption(option)
    })
    .subscribe(() => { }, null, () => {
        console.log('complete')
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code>combine$
    .sort()
    .flatMap(<span class="hljs-function"><span class="hljs-params">obj</span> =&gt;</span> {
        <span class="hljs-keyword">return</span> Rx.Observable.of(obj).delay(<span class="hljs-number">100</span> * obj.select.timer++)
    })
    .filter(<span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> {
        <span class="hljs-keyword">return</span> x.select.type == currentType
    })
    .do(<span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> {
        <span class="hljs-keyword">const</span> option = getOption(x.nums)
        echartInstance.setOption(option)
    })
    .subscribe(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> { }, <span class="hljs-literal">null</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'complete'</span>)
    })</code></pre>
<p>整个数据流序列</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   -createNumber$---------------------------------------------------------------------------------
 
   ---------------select$-------------------------------------------------------------------------
                             combineLatest()
   ---------------------------combine$------------------------------------------------------------
                              sort()
   ---------------------------v1       v2       v3       v4 .......v11      v22      v33----------
                                flatMap()
   ---------------------------delay1  delay2  delay3  delay4 ....delay11  delay22  delay33--------
                                 filter(currentType==type)
   ---------------------------delay1  delay2  delay11  delay22  delay33--------------------------
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haml"><code>   -<span class="ruby">createNumber$---------------------------------------------------------------------------------
</span> 
   -<span class="ruby">--------------select$-------------------------------------------------------------------------
</span>                             combineLatest()
   -<span class="ruby">--------------------------combine$------------------------------------------------------------
</span>                              sort()
   -<span class="ruby">--------------------------v1       v2       v3       v4 .......v11      v22      v33----------
</span>                                flatMap()
   -<span class="ruby">--------------------------delay1  delay2  delay3  delay4 ....delay11  delay22  delay33--------
</span>                                 filter(currentType==type)
   -<span class="ruby">--------------------------delay1  delay2  delay11  delay22  delay33--------------------------
</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Rxjs入门实践-各种排序算法排序过程的可视化展示

## 原文链接
[https://segmentfault.com/a/1190000011665982](https://segmentfault.com/a/1190000011665982)

