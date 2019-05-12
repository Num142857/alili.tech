---
title: '看完这篇文章还不会call/apply/bind的来找我。' 
date: 2019-02-03 2:30:39
hidden: true
slug: ns9f03im34
categories: [reprint]
---

{{< raw >}}

                    
<p>先从一个小题目开始吧：</p>
<p>要实现一个加法函数，这个时候向函数当中传递个数大于0的若干个整形数据，求所有这些数据的和。</p>
<ul>
<li><p>Function.prototype.call</p></li>
<li><p>Function.prototype.apply</p></li>
<li><p>Function.prototype.bind</p></li>
</ul>
<p>其中<code>call方法</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var personA = {
        name: 'XL',
        sayName: function (hobby){
            console.log(this.name + ' likes ' + hobby);
        } 
    };
    
    personA.sayName('basketball');   // 'XL likes basketball'
    
    var personB = {
        name: 'xl'
    }
    
    personA.sayName.call(personB, 'basketball');  // 'xl likes basketball'
    personA.sayName.apply(personB, ['basketball']); // 'xl likes basketball'
    
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-keyword">var</span> personA = {
        <span class="hljs-attr">name</span>: <span class="hljs-string">'XL'</span>,
        <span class="hljs-attr">sayName</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">hobby</span>)</span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name + <span class="hljs-string">' likes '</span> + hobby);
        } 
    };
    
    personA.sayName(<span class="hljs-string">'basketball'</span>);   <span class="hljs-comment">// 'XL likes basketball'</span>
    
    <span class="hljs-keyword">var</span> personB = {
        <span class="hljs-attr">name</span>: <span class="hljs-string">'xl'</span>
    }
    
    personA.sayName.call(personB, <span class="hljs-string">'basketball'</span>);  <span class="hljs-comment">// 'xl likes basketball'</span>
    personA.sayName.apply(personB, [<span class="hljs-string">'basketball'</span>]); <span class="hljs-comment">// 'xl likes basketball'</span>
    
    </code></pre>
<p><strong>call和apply的区别就在于传递方式的不同，call在接收指定参数的形式是someMethod.call(obj, arg1, arg2);而apply在接收指定参数时的形式是someMethod.apply(obj, [arg1, arg2]).或者someMethod.apply(obj, arg1),但是这个arg1必须是一个类数组对象</strong></p>
<p>其实想要真正掌握<code>call/apply</code>包括<code>bind方法</code>，首先必须搞清楚当一个<code>函数/方法</code>被调用的时候<code>this</code>的指向问题。 关于<code>this</code>的指向的问题请参照我的<a href="https://segmentfault.com/a/1190000003046071?_ea=1200802">学习笔记</a>。</p>
<p>那么在这里<code>call,apply,bind</code>事实上都改变了<code>函数/方法</code>被调用时<code>this</code>的指向。</p>
<p>还是拿上面的例子来说：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    personA.sayName(‘basketball’); //调用sayName()这个方法的对象是personA,因此sayName()内部的this指向就是personA对象" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">    personA.sayName(‘basketball’); <span class="hljs-comment">//调用sayName()这个方法的对象是personA,因此sayName()内部的this指向就是personA对象</span></code></pre>
<p>换一种写法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var sayName = personA.sayName('basketball');
    //这里将sayName方法挂载到了window对象上，即window.sayName = person.sayName();  这个时候调用sayName().此时this指向就是window对象" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-keyword">var</span> sayName = personA.sayName(<span class="hljs-string">'basketball'</span>);
    <span class="hljs-comment">//这里将sayName方法挂载到了window对象上，即window.sayName = person.sayName();  这个时候调用sayName().此时this指向就是window对象</span></code></pre>
<p>使用<code>call/apply</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    personA.sayName.call(personB, 'basketball');
    //本来sayName方法的this指向是personA对象，但是调用call后，this对象指向了personB对象。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    personA.sayName.call(personB, <span class="hljs-string">'basketball'</span>);
    <span class="hljs-comment">//本来sayName方法的this指向是personA对象，但是调用call后，this对象指向了personB对象。</span></code></pre>
<p>如果大家这种写法看不习惯，那就换种方式来看:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    personA.sayName.call(personB, 'basketball') ===> personB.sayName('basketball');
    //从前面的一个形式变为后面一种形式，此时,sayName方法的this指向是personB对象了。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    personA.sayName.call(personB, <span class="hljs-string">'basketball'</span>) ===&gt; personB.sayName(<span class="hljs-string">'basketball'</span>);
    <span class="hljs-comment">//从前面的一个形式变为后面一种形式，此时,sayName方法的this指向是personB对象了。</span></code></pre>
<p>换一种方式书写后大家应该看的很清晰明了了吧？以后碰到<code>call/apply</code>调用的时候，换一种形式去理解，这样就很清晰了。</p>
<p>再比如大家经常看到的一种对于函数的<code>arguments</code>类数组对象的处理方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function fn() {
        var args = Array.prototype.slice.apply(arguments); //这里将arguments这个类数组对象转化为一个数组 
    }
    
    //咱们再来转化下:
Array.prototype.slice.apply(arguments); ===>>> arguments.slice(); 
//因为arguments是类数组对象的原因，因此它可以直接调用slice方法;如果要截取数组的从第几位到第几位的数

Array.prototype.slice.apply(arguments, [0, 2]); ===>>> arguments.slice(0, 2);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> args = <span class="hljs-built_in">Array</span>.prototype.slice.apply(<span class="hljs-built_in">arguments</span>); <span class="hljs-comment">//这里将arguments这个类数组对象转化为一个数组 </span>
    }
    
    <span class="hljs-comment">//咱们再来转化下:</span>
<span class="hljs-built_in">Array</span>.prototype.slice.apply(<span class="hljs-built_in">arguments</span>); ===&gt;&gt;&gt; <span class="hljs-built_in">arguments</span>.slice(); 
<span class="hljs-comment">//因为arguments是类数组对象的原因，因此它可以直接调用slice方法;如果要截取数组的从第几位到第几位的数</span>

<span class="hljs-built_in">Array</span>.prototype.slice.apply(<span class="hljs-built_in">arguments</span>, [<span class="hljs-number">0</span>, <span class="hljs-number">2</span>]); ===&gt;&gt;&gt; <span class="hljs-built_in">arguments</span>.slice(<span class="hljs-number">0</span>, <span class="hljs-number">2</span>);</code></pre>
<p>握草，感觉编不下去了- - </p>
<p>其实将<code>call/apply</code>,换一种形式去看，是不是就和普通的方法调用一样一样的。</p>
<p><code>bind</code>方法呢，起的作用和<code>call</code>,<code>apply</code>一样，都是改变函数/方法执行时,<code>this</code>的指向，确保这个<code>函数/方法</code>运行时<code>this</code>指向保持一致。<br>比如大家经常用到的<code>setTimeout</code>异步函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var person = {
        name: 'XL',
        sayName: function() {
            setTimeout(function() {
                console.log(this.name);
            }, 0);
        }
    }
    
    person.sayName();   //最后输出： undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-keyword">var</span> person = {
        <span class="hljs-attr">name</span>: <span class="hljs-string">'XL'</span>,
        <span class="hljs-attr">sayName</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name);
            }, <span class="hljs-number">0</span>);
        }
    }
    
    person.sayName();   <span class="hljs-comment">//最后输出： undefined</span></code></pre>
<p>这是因为<code>setTimeout()</code>这个异步函数调用的时候，内部的回调函数<code>this</code>的指向是<code>window</code>.但是在<code>window</code>对象上并未挂载<code>name</code>属性，因此最后输出<code>undefined</code>.</p>
<p>添加一行代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var name = 'XLLLL';
    var person = {
        name: 'XL',
        sayName: function() {
            setTimeout(function() {
                console.log(this.name);
            }, 0);
        }
    }
    
    person.sayName();   //输出  ‘XLLLL’" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-keyword">var</span> name = <span class="hljs-string">'XLLLL'</span>;
    <span class="hljs-keyword">var</span> person = {
        <span class="hljs-attr">name</span>: <span class="hljs-string">'XL'</span>,
        <span class="hljs-attr">sayName</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name);
            }, <span class="hljs-number">0</span>);
        }
    }
    
    person.sayName();   <span class="hljs-comment">//输出  ‘XLLLL’</span></code></pre>
<p>为了避免在回调函数当中,<code>this</code>指向发生变化，所以大家都会这样处理：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var person = {
        name: 'XL',
        sayName: function() {
            setTimeout(function() {
                console.log(this.name);
            }.bind(this), 0);   //通过bind方法将this对象绑定为person。那么回调函数在执行的时候,this指向还是person。
        }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-keyword">var</span> person = {
        <span class="hljs-attr">name</span>: <span class="hljs-string">'XL'</span>,
        <span class="hljs-attr">sayName</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name);
            }.bind(<span class="hljs-keyword">this</span>), <span class="hljs-number">0</span>);   <span class="hljs-comment">//通过bind方法将this对象绑定为person。那么回调函数在执行的时候,this指向还是person。</span>
        }
    }</code></pre>
<p>可以用下面这段代码来简单模拟下<code>bind</code>方法内部的操作:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    Function.prototype.bind = function(obj) {
        var method = this;
        return function() {
            method.apply(obj, arguments);
        }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-built_in">Function</span>.prototype.bind = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj</span>) </span>{
        <span class="hljs-keyword">var</span> method = <span class="hljs-keyword">this</span>;
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            method.apply(obj, <span class="hljs-built_in">arguments</span>);
        }
    }</code></pre>
<p>还记得刚才给大家讲的将<code>apply</code>进行变换的形式吗？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    Function.prototype.bind = function(obj) {
        var method = this;
        return function() {
            obj.method(arguments);
        }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-built_in">Function</span>.prototype.bind = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj</span>) </span>{
        <span class="hljs-keyword">var</span> method = <span class="hljs-keyword">this</span>;
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            obj.method(<span class="hljs-built_in">arguments</span>);
        }
    }</code></pre>
<p>大家应该看到了<code>bind</code>和<code>apply/call</code>的区别了吧？ <code>bind</code>方法是返回一个新的函数，但是这个函数比较特殊，这个函数的<code>this</code>对象已经被<code>bind</code>方法传入的第一个参数给绑定了.</p>
<p>比如我们可以使用bind方法来简写一个方法:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function fn() {
        var hasOwnKey = Function.call.bind(Object.hasOwnProperty);
        
        for(var key in obj) {
            if(hasOwnKey(obj, key)) {
                //xxxx
            }
        }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> hasOwnKey = <span class="hljs-built_in">Function</span>.call.bind(<span class="hljs-built_in">Object</span>.hasOwnProperty);
        
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> obj) {
            <span class="hljs-keyword">if</span>(hasOwnKey(obj, key)) {
                <span class="hljs-comment">//xxxx</span>
            }
        }
    }</code></pre>
<p>唉，真的编不下去了。大家看完之后应该已经懂了把？ - -</p>
<p>还是不懂的话在评论区留言，我给大家解答。</p>
<p>哦，一开始那个题目的一种写法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    //要实现一个加法函数，这个时候向函数当中传递个数大于0的若干个整形数据，求所有这些数据的和。
    function add() {
        return Array.prototype.reduce.call(arguments, function(n1, n2) {
            return n1 + n2;
        });   
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-comment">//要实现一个加法函数，这个时候向函数当中传递个数大于0的若干个整形数据，求所有这些数据的和。</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">Array</span>.prototype.reduce.call(<span class="hljs-built_in">arguments</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">n1, n2</span>) </span>{
            <span class="hljs-keyword">return</span> n1 + n2;
        });   
    }</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
看完这篇文章还不会call/apply/bind的来找我。

## 原文链接
[https://segmentfault.com/a/1190000006993545](https://segmentfault.com/a/1190000006993545)

