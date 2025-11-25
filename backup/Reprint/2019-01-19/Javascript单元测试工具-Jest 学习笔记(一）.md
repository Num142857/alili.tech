---
title: 'Javascript单元测试工具-Jest 学习笔记(一）' 
date: 2019-01-19 2:30:10
hidden: true
slug: 5jf224u2amo
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">写在前面</h2>
<p>首先这并不是一篇完整的关于Jest的教程，只是个人在接触jest学习的一点随手笔记，大部分内容都是对官方文档的一些翻译。只是让想了解jest的人快速知道一下jest是做什么的，怎么做。对于如何对项目进行测试，特别是现在很火的React，后面待熟练使用或者会另写一篇心得体会。</p>
<h2 id="articleHeader1">What's Jest</h2>
<p><a href="http://facebook.github.io/jest/" rel="nofollow noreferrer" target="_blank">Jest</a>是Facebook开发的一个对javascript进行单元测试的工具，之前仅在其内部使用，后开源，并且是在<strong>Jasmine</strong>测试框架上演变开发而来，使用了我们熟知的<strong>expect(value).toBe(other)</strong>这种断言格式。</p>
<h2 id="articleHeader2">Getting Start</h2>
<h3 id="articleHeader3">第一个Jest测试Demo</h3>
<p>通过npm安装</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install jest --save-dev
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>$ npm <span class="hljs-keyword">install </span><span class="hljs-keyword">jest </span>--save-dev
</code></pre>
<p>编辑一个待测试的<code>sum.js</code>文件如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function sum(a, b) {
    return a + b;
}
module.exports = sum;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sum</span>(<span class="hljs-params">a, b</span>) </span>{
    <span class="hljs-keyword">return</span> a + b;
}
<span class="hljs-built_in">module</span>.exports = sum;</code></pre>
<p>编辑一个测试文件<code>sum.test.js</code></p>
<blockquote><p>注意：关于这个测试文件的位置，建议是对每个组件新建一个<code>__test__</code>文件夹，然后文件命名是<code>name.test.js</code>，用于存放测试文件。</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const sum = require('./sum');
    
test('adds 1 + 2 to equal 3', ()=> {
    expect(sum(1, 2)).toBe(3);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> sum = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./sum'</span>);
    
test(<span class="hljs-string">'adds 1 + 2 to equal 3'</span>, ()=&gt; {
    expect(sum(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>)).toBe(<span class="hljs-number">3</span>);
});</code></pre>
<p>接着在<code>package.json</code>文件里添加测试命令</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts:&quot; {
    &quot;test&quot;: &quot;jest&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-string">"scripts:"</span> {
    <span class="hljs-string">"test"</span>: <span class="hljs-string">"jest"</span>
}</code></pre>
<p>最后，运行 <code>npm test</code>命令后jest将会打印如下信息</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="PASS ./sum.test.js
✓ adds 1 + 2 to equal 3 (5ms)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>PASS ./sum.test.js
✓ adds <span class="hljs-number">1</span> + <span class="hljs-number">2</span> to equal <span class="hljs-number">3</span> (<span class="hljs-number">5</span>ms)
</code></pre>
<p>至此，第一个测试Demo完成了。</p>
<h2 id="articleHeader4">Using Matchers</h2>
<blockquote><p><strong>Jest</strong>使用<code>matchers</code>来使用不同的方式测试你的结果。</p></blockquote>
<h3 id="articleHeader5">Common Matchers</h3>
<p>最简单的测试方式就是测试一个值是否全等</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="test('2加2等于4', ()=> {
    expect(2 + 2).toBe(4);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">test(<span class="hljs-string">'2加2等于4'</span>, ()=&gt; {
    expect(<span class="hljs-number">2</span> + <span class="hljs-number">2</span>).toBe(<span class="hljs-number">4</span>);
});</code></pre>
<p>在上述代码中，<code>expect(2+2)</code>返回一个“期望”对象，通常我们不会对这个期望对象进行匹配，而是由<code>matchers</code>完成，在这里<code>.toBe(4)</code>便是这个<code>matchers</code>，当<strong>Jest</strong>运行时，它会跟踪所有失败的<code>matchers</code>以便打印正确的错误信息给我们。</p>
<p><code>toBe</code>使用 <code>===</code> 来测试全等于，如果我们想检查一个对象<code>object</code>中的值，使用<code>toEqual</code>来替代，<code>toEqual</code>递归遍历检查对象或数组里的每一个领域。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;use strict&quot;;
    
test('object assigenment', ()=> {
    let data = { one: 1};
    data['two'] = 2;
    expect(data).toEqual({ one: 1, two: 2 });
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-meta">"use strict"</span>;
    
test(<span class="hljs-string">'object assigenment'</span>, ()=&gt; {
    <span class="hljs-keyword">let</span> data = { <span class="hljs-attr">one</span>: <span class="hljs-number">1</span>};
    data[<span class="hljs-string">'two'</span>] = <span class="hljs-number">2</span>;
    expect(data).toEqual({ <span class="hljs-attr">one</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">two</span>: <span class="hljs-number">2</span> });
})</code></pre>
<blockquote><p><strong>注意：</strong>官网的例子是没有使用的<code>"use strict";</code>，然后npm test的时候就会报出一条错误<br>SyntaxError: Block-scoped declarations (let, const, function, class) not yet supported outside strict mode</p></blockquote>
<p>使用<code>not</code>可以测试一个<code>matchers</code>的反向规则：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="test('adding positive numbers is not zero', () => {
    for (let a = 1; a < 10; a++) {
        for (let b = 1; b < 10; b++) {
            expect(a + b).not.toBe(0);
        }
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">test(<span class="hljs-string">'adding positive numbers is not zero'</span>, () =&gt; {
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> a = <span class="hljs-number">1</span>; a &lt; <span class="hljs-number">10</span>; a++) {
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> b = <span class="hljs-number">1</span>; b &lt; <span class="hljs-number">10</span>; b++) {
            expect(a + b).not.toBe(<span class="hljs-number">0</span>);
        }
    }
});</code></pre>
<h3 id="articleHeader6">Truthiness</h3>
<p>在测试的时候，有时候我们需要在<code>undefined</code>，<code>null</code>和<code>false</code>进行区别，但是我们又不想去了解他们的不同点，Jest也会帮助我们得到我们想要的结果。</p>
<ul>
<li><p><code>toBeNull</code>  检查是否为null</p></li>
<li><p><code>toBeUndefined</code>  检查是否为undefined</p></li>
<li><p><code>toBeDefined</code>  与<code>toBeUndefined</code>的相反</p></li>
<li><p><code>toBeTruthy</code>  检查任何通过<code>if</code>显示转换是否为true</p></li>
<li><p><code>toBeFalsy</code>  检查任何通过<code>if</code>显示转换是否为false</p></li>
</ul>
<p>如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="test('null', () => {
    let n = null;
      expect(n).toBeNull();
      expect(n).toBeDefined();
      expect(n).not.toBeUndefined();
      expect(n).not.toBeTruthy();
      expect(n).toBeFalsy();
});

test('zero', () => {
      let z = 0;
      expect(z).not.toBeNull();
      expect(z).toBeDefined();
      expect(z).not.toBeUndefined();
      expect(z).not.toBeTruthy();
      expect(z).toBeFalsy();
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">test(<span class="hljs-string">'null'</span>, () =&gt; {
    <span class="hljs-keyword">let</span> n = <span class="hljs-literal">null</span>;
      expect(n).toBeNull();
      expect(n).toBeDefined();
      expect(n).not.toBeUndefined();
      expect(n).not.toBeTruthy();
      expect(n).toBeFalsy();
});

test(<span class="hljs-string">'zero'</span>, () =&gt; {
      <span class="hljs-keyword">let</span> z = <span class="hljs-number">0</span>;
      expect(z).not.toBeNull();
      expect(z).toBeDefined();
      expect(z).not.toBeUndefined();
      expect(z).not.toBeTruthy();
      expect(z).toBeFalsy();
});</code></pre>
<h3 id="articleHeader7">Numbers</h3>
<p>比较数字的大多数方法都有其对应的matchers</p>
<ul>
<li><p><code>toBeGreaterThan</code>  大于</p></li>
<li><p><code>toBeGreaterThanOrEqual</code>  大于等于</p></li>
<li><p><code>toBeLessThan</code>  小于</p></li>
<li><p><code>toBeLessThanOrEqual</code>  小于等于</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="test('two plus two', () => {
    let value = 2 + 2;
    expect(value).toBeGreaterThan(3);
    expect(value).toBeGreaterThanOrEqual(3.5);
    expect(value).toBeLessThan(5);
    expect(value).toBeLessThanOrEqual(4.5);

    // toBe and toEqual 对于number类型作用是一样的
    expect(value).toBe(4);
    expect(value).toEqual(4);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">test(<span class="hljs-string">'two plus two'</span>, () =&gt; {
    <span class="hljs-keyword">let</span> value = <span class="hljs-number">2</span> + <span class="hljs-number">2</span>;
    expect(value).toBeGreaterThan(<span class="hljs-number">3</span>);
    expect(value).toBeGreaterThanOrEqual(<span class="hljs-number">3.5</span>);
    expect(value).toBeLessThan(<span class="hljs-number">5</span>);
    expect(value).toBeLessThanOrEqual(<span class="hljs-number">4.5</span>);

    <span class="hljs-comment">// toBe and toEqual 对于number类型作用是一样的</span>
    expect(value).toBe(<span class="hljs-number">4</span>);
    expect(value).toEqual(<span class="hljs-number">4</span>);
});</code></pre>
<p>对于浮点数的测试，使用<code>toBeCloseTo</code>来替代<code>toEqual</code>，因为我们不会让一个测试依赖于一个微小的舍入型错误。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="test('adding floating point numbers', () => {
    let value = 0.1 + 0.2;
    expect(value).not.toBe(0.3);    // It isn't! Because rounding error
    expect(value).toBeCloseTo(0.3); // This works.
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">test(<span class="hljs-string">'adding floating point numbers'</span>, () =&gt; {
    <span class="hljs-keyword">let</span> value = <span class="hljs-number">0.1</span> + <span class="hljs-number">0.2</span>;
    expect(value).not.toBe(<span class="hljs-number">0.3</span>);    <span class="hljs-comment">// It isn't! Because rounding error</span>
    expect(value).toBeCloseTo(<span class="hljs-number">0.3</span>); <span class="hljs-comment">// This works.</span>
});</code></pre>
<h3 id="articleHeader8">Strings</h3>
<p>使用<code>toMatch</code>对字符串进行正则表达式匹配</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="test('there is no I in team', () => {
    expect('team').not.toMatch(/I/);
});

test('but there is a &quot;stop&quot; in Christoph', () => {
    expect('Christoph').toMatch(/stop/);
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">test(<span class="hljs-string">'there is no I in team'</span>, () =&gt; {
    expect(<span class="hljs-string">'team'</span>).not.toMatch(<span class="hljs-regexp">/I/</span>);
});

test(<span class="hljs-string">'but there is a "stop" in Christoph'</span>, () =&gt; {
    expect(<span class="hljs-string">'Christoph'</span>).toMatch(<span class="hljs-regexp">/stop/</span>);
})</code></pre>
<h3 id="articleHeader9">Arrays</h3>
<p>使用<code>toContain</code>对数组内的特定项进行匹配测试</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let shoppingList = ['diapers', 'kleenex', 'trash bags', 'paper towels', 'beer'];

test('the shopping list has beer on it', () => {
    expect(shoppingList).toContain('beer');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> shoppingList = [<span class="hljs-string">'diapers'</span>, <span class="hljs-string">'kleenex'</span>, <span class="hljs-string">'trash bags'</span>, <span class="hljs-string">'paper towels'</span>, <span class="hljs-string">'beer'</span>];

test(<span class="hljs-string">'the shopping list has beer on it'</span>, () =&gt; {
    expect(shoppingList).toContain(<span class="hljs-string">'beer'</span>);
});</code></pre>
<h3 id="articleHeader10">Exceptions</h3>
<p>使用<code>toThrow</code>对一个特定函数调用时候抛出的错误进行测试</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function compileAndroidCode() {
    throw new ConfigError('you are using the wrong JDK');
}

test('compiling android goes as expected', () => {
    expect(compileAndroidCode).toThrow();
    expect(compileAndroidCode).toThrow(ConfigError);

    // You can also use the exact error message or a regexp
    expect(compileAndroidCode).toThrow('you are using the wrong JDK');
    expect(compileAndroidCode).toThrow(/JDK/);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">compileAndroidCode</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> ConfigError(<span class="hljs-string">'you are using the wrong JDK'</span>);
}

test(<span class="hljs-string">'compiling android goes as expected'</span>, () =&gt; {
    expect(compileAndroidCode).toThrow();
    expect(compileAndroidCode).toThrow(ConfigError);

    <span class="hljs-comment">// You can also use the exact error message or a regexp</span>
    expect(compileAndroidCode).toThrow(<span class="hljs-string">'you are using the wrong JDK'</span>);
    expect(compileAndroidCode).toThrow(<span class="hljs-regexp">/JDK/</span>);
});</code></pre>
<h2 id="articleHeader11">Testing Asynchronous Code</h2>
<p>在javascript程序中，会经常见到一些异步执行的代码，当我们有这些异步执行的代码时，<strong>Jest</strong>需要知道当前这个代码测试是否已经完成，然后才能转向另一个测试。<strong>Jest</strong>提供了一些方法来处理这种问题。</p>
<h3 id="articleHeader12">Callbacks</h3>
<p>最常用的异步测试模式便是<strong>callbacks</strong></p>
<p>列如，我们有一个<code>fetchData(callback)</code>方法，当<code>callback(data)</code>方法调用的时候，我们会获取一些<code>data</code>数据，并且想测试返回的数据是否只是一个字符串<code>uyun</code>。</p>
<p>默认情况下下，<strong>Jest</strong>在所有的代码执行完之后便会完成测试，这意味这些测试不再会按计划的工作下去。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Don't do this!
test('the data is uyun', () => {
    function callback(data) {
        expect(data).toBe('uyun');
    }

    fetchData(callback);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// Don't do this!</span>
test(<span class="hljs-string">'the data is uyun'</span>, () =&gt; {
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">callback</span>(<span class="hljs-params">data</span>) </span>{
        expect(data).toBe(<span class="hljs-string">'uyun'</span>);
    }

    fetchData(callback);
});</code></pre>
<p>问题是，测试希望一旦<code>fatchData</code>成功后才能完成，并在其之前调用回调。</p>
<p>这里有另一种形式修复这个测试的问题，在这个测试方法里使用一个参数为<code>done</code>的回调参数，而不是放置一个空参数，<strong>Jest</strong>要等到<code>done</code>被调用后才会结束此次测试。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="test('the data is uyun', done => {
    function callback(data) {
        expect(data).toBe('uyun');
        done();
    }

    fetchData(callback);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">test(<span class="hljs-string">'the data is uyun'</span>, done =&gt; {
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">callback</span>(<span class="hljs-params">data</span>) </span>{
        expect(data).toBe(<span class="hljs-string">'uyun'</span>);
        done();
    }

    fetchData(callback);
});</code></pre>
<p>如果<code>done()</code>没被调用，测试即失败了，这时候我们也会得到我们想要的错误结果了。</p>
<h3 id="articleHeader13">Promises</h3>
<p>如果我们的代码中使用到了<code>Promises </code>，这里有一个简单的异步测试处理方法。只是我们的测试中返回一个<code>promise</code>，并且<strong>Jest</strong>会等待这个promise解析完成，如果rejected了，这个测试便会自动视为失败。如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="test('the data is uyun', () => {
    return fetchData().then(data => {
        expect(data).toBe('uyun');
    });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">test(<span class="hljs-string">'the data is uyun'</span>, () =&gt; {
    <span class="hljs-keyword">return</span> fetchData().then(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> {
        expect(data).toBe(<span class="hljs-string">'uyun'</span>);
    });
});</code></pre>
<blockquote><p>注意：一定要确保返回了<code>Promise</code>，如果省略了这步，你的测试将会在<code>fetchData</code>完成之前首先结束掉。</p></blockquote>
<h3 id="articleHeader14">Async/Await</h3>
<p>如果代码中使用到<code>async</code>和<code>await</code>，可以这样做。编写一个异步测试，仅需要在测试方法前面使用<code>async</code>关键词，然后传递给测试函数即可。如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="test('the data is uyun', async () => {
    const data = await fetchData();
    expect(data).toBe('uyun');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">test(<span class="hljs-string">'the data is uyun'</span>, <span class="hljs-keyword">async</span> () =&gt; {
    <span class="hljs-keyword">const</span> data = <span class="hljs-keyword">await</span> fetchData();
    expect(data).toBe(<span class="hljs-string">'uyun'</span>);
});</code></pre>
<p>在这个例子中，<code>async</code>和<code>await</code>等同于<code>promises</code>方法的一种语法糖实现方式。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Javascript单元测试工具-Jest 学习笔记(一）

## 原文链接
[https://segmentfault.com/a/1190000008628067](https://segmentfault.com/a/1190000008628067)

