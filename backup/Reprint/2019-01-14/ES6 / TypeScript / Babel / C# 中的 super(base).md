---
title: 'ES6 / TypeScript / Babel / C# 中的 super(base)' 
date: 2019-01-14 2:30:07
hidden: true
slug: 8h4kxcrb2hb
categories: [reprint]
---

{{< raw >}}

                    
<p>今天看到 <a href="/u/justjavac">@justjavac</a> 写的《<a href="http://mp.weixin.qq.com/s/X3wwv9svWx6dbhxEEFzbAA" rel="nofollow noreferrer" target="_blank">ES6 中的 this &amp; super：babel 和 typescript 都错了</a>》，觉得很有意思，所以也研究了一下。</p>
<p>借用 <a href="/u/justjavac">@justjavac</a> 的示例代码，略做修改，然后在几种语言中跑了一下，结果</p>
<table>
<thead><tr>
<th align="right">语言(版本)</th>
<th align="center">输出1</th>
<th align="center">输出2</th>
<th align="center">输出3</th>
</tr></thead>
<tbody>
<tr>
<td align="right">ES6</td>
<td align="center">3</td>
<td align="center">undefined</td>
<td align="center">3</td>
</tr>
<tr>
<td align="right">Babel</td>
<td align="center">2</td>
<td align="center">undefined</td>
<td align="center">2</td>
</tr>
<tr>
<td align="right">TypeScript (?)</td>
<td align="center">2</td>
<td align="center">3</td>
<td align="center">2</td>
</tr>
<tr>
<td align="right">C#</td>
<td align="center">3</td>
<td align="center">3</td>
<td align="center">3</td>
</tr>
<tr>
<td align="right">Java</td>
<td align="center">3</td>
<td align="center">3</td>
<td align="center">3</td>
</tr>
</tbody>
</table>
<p>是的，我加入了 C# 和 Java 的运行结果，毕竟它们是真正的 OOP 语言。另外请注意到，我在 TypeScript 后面加了个问号 <code>(?)</code>，因为实际上 TypeScript 虽然编译成了对应的 JS，但是转译过程中是会报错的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="index.ts (20,15): Only public and protected methods of the base class are accessible via the 'super' keyword. (2340)
index.ts (22,27): Only public and protected methods of the base class are accessible via the 'super' keyword. (2340)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">index.ts (20,15): Only public and protected methods of the base class are accessible via the <span class="hljs-string">'super'</span> keyword. (2340)
index.ts (22,27): Only public and protected methods of the base class are accessible via the <span class="hljs-string">'super'</span> keyword. (2340)</code></pre>
<p>下面，我从 C#/Java 说起</p>
<h2 id="articleHeader0">C# / Java</h2>
<p>对于 C#/Java 这样的真正的 OOP 语言来说，<code>super.x</code> 和 <code>this.x</code> 其实是一个东西，因为在子类中没有重新定义这个成员 <code>x</code>。以 C# 代码为例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="using System;
                    
public class Program
{
    public static void Main()
    {
        var t = new ColorPoint();
        t.test();
    }
}

class Point {
    public int x;
    
    protected void getValue() {
        Console.WriteLine(this.x);
    }
}

class ColorPoint : Point {
    public ColorPoint() {
        this.x = 2;
        base.x = 3;
        Console.WriteLine(this.x);
        Console.WriteLine(base.x);
    }

    public void test() {
        this.getValue();
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="cs hljs"><code class="cs"><span class="hljs-keyword">using</span> System;
                    
<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title">Program</span>
{
    <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">void</span> <span class="hljs-title">Main</span>(<span class="hljs-params"></span>)
    </span>{
        <span class="hljs-keyword">var</span> t = <span class="hljs-keyword">new</span> ColorPoint();
        t.test();
    }
}

<span class="hljs-keyword">class</span> <span class="hljs-title">Point</span> {
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">int</span> x;
    
    <span class="hljs-function"><span class="hljs-keyword">protected</span> <span class="hljs-keyword">void</span> <span class="hljs-title">getValue</span>(<span class="hljs-params"></span>) </span>{
        Console.WriteLine(<span class="hljs-keyword">this</span>.x);
    }
}

<span class="hljs-keyword">class</span> <span class="hljs-title">ColorPoint</span> : <span class="hljs-title">Point</span> {
    <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-title">ColorPoint</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">this</span>.x = <span class="hljs-number">2</span>;
        <span class="hljs-keyword">base</span>.x = <span class="hljs-number">3</span>;
        Console.WriteLine(<span class="hljs-keyword">this</span>.x);
        Console.WriteLine(<span class="hljs-keyword">base</span>.x);
    }

    <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title">test</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">this</span>.getValue();
    }
}</code></pre>
<p>上面这段代码是为了与下面这段代码进行比较——假如我们在子类中重新定义 <code>x</code> 呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class ColorPoint : Point {
    public new int x;
    
    public ColorPoint() {
        this.x = 2;
        base.x = 3;
        Console.WriteLine(this.x);
        Console.WriteLine(base.x);
    }

    public void test() {
        this.getValue();
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="cs hljs"><code class="cs"><span class="hljs-keyword">class</span> <span class="hljs-title">ColorPoint</span> : <span class="hljs-title">Point</span> {
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">new</span> <span class="hljs-keyword">int</span> x;
    
    <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-title">ColorPoint</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">this</span>.x = <span class="hljs-number">2</span>;
        <span class="hljs-keyword">base</span>.x = <span class="hljs-number">3</span>;
        Console.WriteLine(<span class="hljs-keyword">this</span>.x);
        Console.WriteLine(<span class="hljs-keyword">base</span>.x);
    }

    <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title">test</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">this</span>.getValue();
    }
}</code></pre>
<p>它的输出是 <code>2</code>、<code>3</code>、<code>3</code>，为什么？</p>
<p><code>this.x</code> 是 <code>2</code> 好理解，<code>super.x</code> 是 <code>3</code> 也好理解。而 <code>getValue()</code> 中实际取的是父类中的 <code>x</code>，似乎有点不好理解——</p>
<p>其实也不难理解，因为子类中重新定义了 <code>x</code>，它和父类中的 <code>x</code> 就不是同一个东西了，只是正好名称相同而已。</p>
<p>另一个方面来理解：子类中重新定义 <code>x</code>，而不是重载(也不可能重载字段，只有方法和属性可以重载)，那么 <code>getValue()</code> 就不会顺着虚函数链去找到最近的一个定义，也就不会取到子类中的赋值。</p>
<h2 id="articleHeader1">TypeScript</h2>
<p>在 TypeScript 的 <a href="http://www.typescriptlang.org/play/index.html" rel="nofollow noreferrer" target="_blank">Playground</a> 中运行下面的代码确实可以得到 <code>2</code>、<code>3</code>、<code>2</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Point {
    public x: number;

    protected getValue() {
        console.log(this.x);
    }
}

class ColorPoint extends Point {
    constructor() {
        super();
        this.x = 2;
        super.x = 3;
        console.log(this.x);
        console.log(super.x);
    }

    test() {
        this.getValue();
    }
}

const t = new ColorPoint();
t.test();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">class</span> Point {
    <span class="hljs-keyword">public</span> x: <span class="hljs-built_in">number</span>;

    <span class="hljs-keyword">protected</span> getValue() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.x);
    }
}

<span class="hljs-keyword">class</span> ColorPoint <span class="hljs-keyword">extends</span> Point {
    <span class="hljs-keyword">constructor</span>(<span class="hljs-params"></span>) {
        <span class="hljs-keyword">super</span>();
        <span class="hljs-keyword">this</span>.x = <span class="hljs-number">2</span>;
        <span class="hljs-keyword">super</span>.x = <span class="hljs-number">3</span>;
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.x);
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">super</span>.x);
    }

    test() {
        <span class="hljs-keyword">this</span>.getValue();
    }
}

<span class="hljs-keyword">const</span> t = <span class="hljs-keyword">new</span> ColorPoint();
t.test();</code></pre>
<p>问题在于，不管是在 Playground 还是 VSCode 还是 vsc(编译器)，都会得到错误提示</p>
<blockquote>Only public and protected methods of the base class are accessible via the 'super' keyword.</blockquote>
<p>这里提到了用 <code>super</code> 的两个条件，一个是 <code>public</code> 或 <code>protected</code> 修饰，二个是 <code>methods</code>。第二个条件就是关键所在：TypeScript 中只能通过 <code>super</code> 调用方法，所以 <code>super.x</code> 从语法上来说就是错的！我不知道 Anders Hejlsberg 为什么要在语法错误的情况仍然输出结果——也许是为了容错性。但既然用 TypeScript，就是为了用它的静态检查，所以要充分关注编译错误提示。</p>
<p>现在来试验一下介于 field 和 method 之间的情况，使用 getter/setter 语法的属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Point {
    private _x: number;
    public get x(): number {
        return this._x;
    }

    public set x(value: number) {
        this._x = value;
    }

    protected getValue() {
        console.log(this.x);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">class</span> Point {
    <span class="hljs-keyword">private</span> _x: <span class="hljs-built_in">number</span>;
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">get</span> x(): <span class="hljs-built_in">number</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._x;
    }

    <span class="hljs-keyword">public</span> <span class="hljs-keyword">set</span> x(value: <span class="hljs-built_in">number</span>) {
        <span class="hljs-keyword">this</span>._x = value;
    }

    <span class="hljs-keyword">protected</span> getValue() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.x);
    }
}</code></pre>
<p>很遗憾，同样的错误。就这一点来说，我觉得 TypeScript 还有待进步。</p>
<h2 id="articleHeader2">ES6 / ES2015 / Babel</h2>
<blockquote>ES6 的正式名称是 ECMAScrip 2015，即 ES2015</blockquote>
<p>那么，现在来说说 ES6 的结果 <code>3</code>、<code>undefined</code>、<code>3</code>。</p>
<p>……</p>
<p>可是，我除了说不能理解之外，还能说什么呢？</p>
<p>既然 <code>super.x = 3</code> 都可以起作用，凭什么 <code>console.log(super.x)</code> 就取不到值？从这一点上来说，Babel 的结果 (<code>2</code>、<code>undefined</code>、<code>2</code>) 反而更符合逻辑。</p>
<h2 id="articleHeader3">小结</h2>
<p>ES6 的结果我不能理解，也许能从 <a href="http://www.ecma-international.org/ecma-262/6.0/" rel="nofollow noreferrer" target="_blank">ECMAScript 2015 Language Specification</a> 中找到答案，不过我没耐心去阅读这个长而枯燥的英文文档——如果有人找到了答案，麻烦告诉我一声，万分感谢！</p>
<p>不管怎么说，我用 TypeScript 的时间比较多，而且忠实于编译器的错误提示。因此在我实际工作中遇到类似问题的概率非常低，不纠结 <code>^_^</code>！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES6 / TypeScript / Babel / C# 中的 super(base)

## 原文链接
[https://segmentfault.com/a/1190000009529572](https://segmentfault.com/a/1190000009529572)

