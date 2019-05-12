---
title: 'angular4学习记录 -- 数据绑定、响应式编程、管道' 
date: 2018-12-30 2:30:10
hidden: true
slug: zerv460oszs
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">angular4 数据绑定、响应式编程、管道</h1>
<h2 id="articleHeader1">数据绑定</h2>
<ol>
<li>
<p>基本Html属性绑定</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <td [attr.colspan]=&quot;tableColspan&quot;>Something</td>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>    <span class="hljs-tag">&lt;<span class="hljs-name">td</span> [<span class="hljs-attr">attr.colspan</span>]=<span class="hljs-string">"tableColspan"</span>&gt;</span>Something<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
</code></pre>
</li>
<li>
<p>css类绑定</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     <div class=&quot;aa bb&quot; [class]=&quot;someExpression&quot;>something</div>
     <div [class.special]=&quot;isSpecial&quot;>something</div>
     <div [ngClass]=&quot;{aaa:isA, bbb:isB}&quot;>something</div>
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>     &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"aa bb"</span> [<span class="hljs-built_in">class</span>]=<span class="hljs-string">"someExpression"</span>&gt;something&lt;/<span class="hljs-keyword">div</span>&gt;
     &lt;<span class="hljs-keyword">div</span> [<span class="hljs-built_in">class</span>.special]=<span class="hljs-string">"isSpecial"</span>&gt;something&lt;/<span class="hljs-keyword">div</span>&gt;
     &lt;<span class="hljs-keyword">div</span> [ngClass]=<span class="hljs-string">"{aaa:isA, bbb:isB}"</span>&gt;something&lt;/<span class="hljs-keyword">div</span>&gt;
    </code></pre>
</li>
<li>
<p>样式绑定</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <button [style.color]=&quot;isSpecial?'red':'blue'>Red</button>
    <div [ngStyle]=&quot;{'font-style':this.canSave?'italic':'normal'}&quot;></div>

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ceylon"><code>    &lt;button [style.color]=<span class="hljs-string">"isSpecial?'red':'blue'&gt;Red&lt;/button&gt;
    &lt;div [ngStyle]="</span>{<span class="hljs-string">'font-style'</span>:<span class="hljs-keyword">this</span>.canSave?<span class="hljs-string">'italic'</span>:<span class="hljs-string">'normal'</span>}<span class="hljs-string">"&gt;&lt;/div&gt;

</span></code></pre>
</li>
</ol>
<p>4.双向绑定</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input [(ngModue)]='name'>"{{"name"}}"
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> [(<span class="hljs-attr">ngModue</span>)]=<span class="hljs-string">'name'</span>&gt;</span></span><span class="hljs-template-variable">"{{"name"}}"</span><span class="xml">
</span></code></pre>
<h2 id="articleHeader2">响应式编程</h2>
<p>响应式编程 其实就是异步数据流编程观察者模式与Rxjs<br>可观察对象Observable(stream,数据生产者,可观察对象,被观察者):表示一组值或者事件的集合.<br>在可观察对象发射数据(流)并经过操作符操作后,接着就可以通过订阅(subscribe)这个数据(流)然后激活之前注册的Observable(观察者,一组回调的集合)的回调函数拿到最终结果(完成观察者对可观察对象的订阅)<br>订阅Subscription:表示一个可观察对象,主要用于取消订阅</p>
<p>具体实例实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="constructor(){
    Observable.from([1,2,3,4])
        .filter( e => e%2 == 0)
        .map( e => e*e )
        .subscribe(
            e => console.log(e)
        )
}


// debounce是空闲时间的间隔控制" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code class="javscript"><span class="hljs-function"><span class="hljs-keyword">constructor</span><span class="hljs-params">()</span><span class="hljs-comment">{
    Observable.from([1,2,3,4])
        .filter( e =&gt; e%2 == 0)
        .map( e =&gt; e*e )
        .subscribe(
            e =&gt; console.log(e)
        )
}</span>


<span class="hljs-comment">// debounce是空闲时间的间隔控制</span></span></code></pre>
<h2 id="articleHeader3">管道</h2>
<ul>
<li>管道是一个带有“管道元数据(pipe metadata)”装饰器的类。</li>
<li>这个管道类实现了PipeTransform接口的transform方法，该方法接受一个输入值和一些可选参数，并返回转换后的值。</li>
<li>当每个输入值被传给transform方法时，还会带上另一个参数，比如我们这个管道中的exponent(放大指数)。</li>
<li>我们通过@Pipe装饰器告诉Angular：这是一个管道。该装饰器是从Angular的core库中引入的。</li>
<li>这个@Pipe装饰器允许我们定义管道的名字，这个名字会被用在模板表达式中。它必须是一个有效的JavaScript标识符。 比如，我们这个管道的名字是exponentialStrength。</li>
</ul>
<h4>普通使用：</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<p>The hero's birthday is "{{" birthday | date "}}"</p>
// birthday | date 部分的date就是一个实例管道
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs twig"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>The hero's birthday is </span><span class="hljs-template-variable">"{{" birthday | <span class="hljs-name">date</span> "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
// birthday | date 部分的date就是一个实例管道
</span></code></pre>
<h4>链式管道使用</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
The chained hero's birthday is
"{{" birthday | date | uppercase"}}"
//链式管道就是在变量后面链接多个pipe
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code>
The chained hero's birthday is
"{{" birthday <span class="hljs-string">| date | uppercase"}}"</span>
<span class="hljs-comment">//链式管道就是在变量后面链接多个pipe</span>
</code></pre>
<h4>传递参数</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=""{{" birthday | date: *FullDate* "}}"
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>"{{" birthday | date: *FullDate* "}}"
</code></pre>
<h4>自定义管道</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Pipe({name: 'exponentialStrength'})
export class ExponentialStrengthPipe implements PipeTransform {
  transform(value: number, exponent: string): number {
    let exp = parseFloat(exponent);
    return Math.pow(value, isNaN(exp) ? 1 : exp);
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-meta">@Pipe</span>({name: <span class="hljs-string">'exponentialStrength'</span>})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> ExponentialStrengthPipe <span class="hljs-keyword">implements</span> PipeTransform {
  transform(value: <span class="hljs-built_in">number</span>, exponent: <span class="hljs-built_in">string</span>): <span class="hljs-built_in">number</span> {
    <span class="hljs-keyword">let</span> exp = <span class="hljs-built_in">parseFloat</span>(exponent);
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.pow(value, <span class="hljs-built_in">isNaN</span>(exp) ? <span class="hljs-number">1</span> : exp);
  }
}
</code></pre>
<h4>纯管道</h4>
<p>值变化或者对象引用发生变化的时候，才会执行管道。</p>
<h4>非纯管道</h4>
<p>速度超慢，深度检测，会频繁检测。pure设为false。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
angular4学习记录 -- 数据绑定、响应式编程、管道

## 原文链接
[https://segmentfault.com/a/1190000011357491](https://segmentfault.com/a/1190000011357491)

