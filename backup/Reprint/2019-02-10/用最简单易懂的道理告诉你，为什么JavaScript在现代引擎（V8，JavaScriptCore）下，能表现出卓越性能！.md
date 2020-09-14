---
title: '用最简单易懂的道理告诉你，为什么JavaScript在现代引擎（V8，JavaScriptCore）下，能表现出卓越性能！' 
date: 2019-02-10 2:30:42
hidden: true
slug: zlvsdlib9bb
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">简单性能测试</h2>
<p>首先，我们先来做一个简单的性能测试，对比一下Java，JavaScript，PHP，Ruby这四门语言。这个性能测试，是计算斐波那契数列（兔子数列）。比如计算n=5的兔子数列，结果是:1,1,2,3,5,8,13,21,34,55（1+1=2...21+34=35）。</p>
<p>这很容易通过一个递归来实现，JavaScript代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fs(n) {
        if (n <= 2) {
            return 1;
        } else {
            return fs(n - 1) + fs(n - 2);
        }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fs</span>(<span class="hljs-params">n</span>) </span>{
        <span class="hljs-keyword">if</span> (n &lt;= <span class="hljs-number">2</span>) {
            <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">return</span> fs(n - <span class="hljs-number">1</span>) + fs(n - <span class="hljs-number">2</span>);
        }
    }</code></pre>
<p>可以看出，这个测试主要偏重CPU栈操作。</p>
<p>以上面这个函数为基础，加上一些逻辑，分别使用Java，JavaScript，PHP，Ruby这四门语言编写了脚本，计算n=40的兔子数列，我们看一下结果吧。（代码在本文最后，^_^）</p>
<ul>
<li><p>首先是Java，编译出字节码耗时约1s，运行字节码耗时约1s，666。</p></li>
<li><p>其次是JavaScript，在node环境下运行耗时约3.5s，在浏览器环境（Safari）下约8s，66。</p></li>
<li><p>接着是Ruby，出人意料的结果，约39s，6不起来了。</p></li>
<li><p>最后是PHP，约80s，233。</p></li>
<li><p>C或者C++的代码我没有写，肯定跑得比狗还快。</p></li>
</ul>
<p>这个简单性能测试并不能说明语言优劣，只是比较好玩而已，代码在本文最后，有兴趣可以去运行一下。</p>
<h2 id="articleHeader1">Java鹤立鸡群的原因</h2>
<h3 id="articleHeader2">静态类型vs动态类型</h3>
<p>静态类型语言指的是编译的时候就能够知道每个变量的类型，我们编程的时候当然也需要给定类型，如Java中的整型int，浮点型float等。</p>
<p>动态类型语言指的是运行的时候才能够知道每个变量的类型，编程的时候也无需显示指定类型，如JavaScript中的var，PHP中的$。</p>
<p>看上去，静态类型还是动态类型对性能没什么影响，实际上却影响很大。</p>
<p>概括来说就是，静态类型语言在编译后会大量利用类型已知的优势，比如int类型，占用4个字节，编译后的代码就可以使用内存地址加偏移量的方法存取变量。而地址＋偏移量的算法汇编非常容易实现。</p>
<p>那动态类型语言是如何做的呢？概括的来说就是当做字符串通通存下来，之后存取就用字符串匹配。</p>
<p>可以感受到这儿存在的性能差异了吗？</p>
<h3 id="articleHeader3">编译型vs解释性</h3>
<p>编译型语言，就像C/C++，代码要经过编译器编译成可执行程序后才可以运行。这个编译过程没什么时间要求，所以编译器可以做大量代码优化措施，有时候编译要好久好久。</p>
<p>解释型语言，就像JavaScript，就是引擎直接读源码，然后就出结果，当然这样子做效率非常低。就像靠人脑去读源码，然后写答案一样。</p>
<p>奇葩型语言，就像Java，有编译过程，但编译产出的是中间代码（字节码），这个过程也有充分的时间做优化。也有解释过程，字节码需要由Java虚拟机解释执行。</p>
<p>从这儿，大概可以理解，为什么C/C++运行效率比Java更高。因为不管怎么说，直接运行二进制码都比解释执行字节码来得快吧。</p>
<p>所以，有趣的事情就来了，C/C++是大哥，Java是二哥，一群解释型脚本语言是小弟们。大哥，独孤求败。二哥，想法子和大哥站在一条线上。小弟们，尽全力跟上二哥。</p>
<h2 id="articleHeader4">现代JavaScript引擎的努力</h2>
<p>先来看看，Java虚拟机做了哪些努力？</p>
<p>Java想的肯定是优化虚拟机解释执行字节码的速度，这儿正是和大哥拉开差距的地方。从大哥那学了很多招。其中重要的一招就是JIT（Just-In-Time），主要的思想就是解释器在解释字节码的时候，会将部分字节码转化成本地代码（汇编代码），这样可以被CPU直接执行，而不是解释执行，从而极大地提高性能。</p>
<p>重点来看看，JavaScript引擎做了哪些努力？<br>JavaScript从前辈那里学习了很多，总结来说有：</p>
<ul>
<li><p>优化数据表示，弥补动态类型的性能缺陷</p></li>
<li><p>引入一个编译过程，而不是直接解释执行，但这个编译过程和运行是一起的，时间的权衡变得非常重要。</p></li>
<li><p>JIT技术，与Java中的JIT原理相同</p></li>
</ul>
<h3 id="articleHeader5">V8引擎与JavaScriptCore引擎</h3>
<p>各个JavaScript优化的具体实现不太一样。</p>
<p>举例子来说，V8引擎对于编译和JIT的做法是，在编译阶段的过程是：源码＝》抽象语法树＝》本地代码。其中从抽象语法树到本地代码的过程使用的是JIT全码生成器，其作用是将抽象语法树转换成各个硬件平台和直接运行的本地代码。V8引擎的这种思路看起来像想要越过二哥Java，直接学大哥C/C++啊。</p>
<p>而JavaScriptCore引擎的做法是更接近二哥的，在编译阶段的过程是：源码＝》抽象语法树＝》字节码（中间代码）。对这个阶段像极了二哥Java的编译过程，只是这里小弟可没有充裕的时间做优化。于是大量的字节码优化措施被延后，比如JIT。JavaScriptCore引擎使用DFG JIT、LLVM等继续对字节码做优化。</p>
<p>权衡时间很重要，一个很好的优化措施但耗时太多，引入之后反而让JavaScript整体的运行时间变长了，得不偿失。另外，还有许多人提出，要不要完全抄二哥的，就是也引入一个提前编译的过程，233</p>
<h2 id="articleHeader6">Ruby、PHP为什么在前面的测试中落败</h2>
<p>具体原因可能还是在引擎吧，可能它们的引擎远没有像V8这么努力。</p>
<h2 id="articleHeader7">总结</h2>
<p>首先，对于底层的理解，有助于编写上层的代码。比如现在我们去理解JavaScript代码的时候，会更深刻。具体可以看这篇文章试试，<a href="https://segmentfault.com/a/1190000005017794">《通过这一段代码，让我们重新认识JavaScript》</a>。<br>其次，多一些话题吧，比如以后和同伴谈起V8引擎（装B）的时候，说我这个例子还不错吧。</p>
<h2 id="articleHeader8">性能测试代码，Java、JavaScript、Ruby、PHP计算斐波那契数列（兔子数列）</h2>
<h3 id="articleHeader9">Java</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import java.util.Date;
public class Fbnq {
    public static void main(String []args) {
        int num = 40;
        long startTime = new Date().getTime();
        //System.out.println(startTime);
        String result = fslog(num);
        long endTime = new Date().getTime();
        //System.out.println(endTime);
        float needTme = (endTime - startTime)/1000;
        
        System.out.println(&quot;time:&quot;+needTme+&quot;s,result:&quot;+result);
    }
    public static int fs (int n){
        if(n <= 2){
            return 1;
        }else{
            return fs(n-1)+fs(n-2);
        }
    }
    public static String fslog(int num){
        String rsString = &quot;&quot;;
        for(int i=1;i<=num;i++){
            int rs = fs(i);
            System.out.println(rs);
            if(i == 1){
                rsString = rsString + rs;
            }else{
                rsString = rsString + &quot;,&quot; + rs;
            }
        }
        return rsString;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="java hljs"><code class="java"><span class="hljs-keyword">import</span> java.util.Date;
<span class="hljs-keyword">public</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Fbnq</span> </span>{
    <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">void</span> <span class="hljs-title">main</span><span class="hljs-params">(String []args)</span> </span>{
        <span class="hljs-keyword">int</span> num = <span class="hljs-number">40</span>;
        <span class="hljs-keyword">long</span> startTime = <span class="hljs-keyword">new</span> Date().getTime();
        <span class="hljs-comment">//System.out.println(startTime);</span>
        String result = fslog(num);
        <span class="hljs-keyword">long</span> endTime = <span class="hljs-keyword">new</span> Date().getTime();
        <span class="hljs-comment">//System.out.println(endTime);</span>
        <span class="hljs-keyword">float</span> needTme = (endTime - startTime)/<span class="hljs-number">1000</span>;
        
        System.out.println(<span class="hljs-string">"time:"</span>+needTme+<span class="hljs-string">"s,result:"</span>+result);
    }
    <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">int</span> <span class="hljs-title">fs</span> <span class="hljs-params">(<span class="hljs-keyword">int</span> n)</span></span>{
        <span class="hljs-keyword">if</span>(n &lt;= <span class="hljs-number">2</span>){
            <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
        }<span class="hljs-keyword">else</span>{
            <span class="hljs-keyword">return</span> fs(n-<span class="hljs-number">1</span>)+fs(n-<span class="hljs-number">2</span>);
        }
    }
    <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> String <span class="hljs-title">fslog</span><span class="hljs-params">(<span class="hljs-keyword">int</span> num)</span></span>{
        String rsString = <span class="hljs-string">""</span>;
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">int</span> i=<span class="hljs-number">1</span>;i&lt;=num;i++){
            <span class="hljs-keyword">int</span> rs = fs(i);
            System.out.println(rs);
            <span class="hljs-keyword">if</span>(i == <span class="hljs-number">1</span>){
                rsString = rsString + rs;
            }<span class="hljs-keyword">else</span>{
                rsString = rsString + <span class="hljs-string">","</span> + rs;
            }
        }
        <span class="hljs-keyword">return</span> rsString;
    }
}</code></pre>
<h3 id="articleHeader10">JavaScript</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var num = 40;
var startDate = new Date().getTime();
var result = logfs(num);
var endDate = new Date().getTime();

console.log(&quot;time:&quot; + ((endDate - startDate) / 1000) + &quot;s&quot;, &quot;result:&quot; + result);

function logfs(num) {
    var rsString = &quot;&quot;;
    for (var i = 1; i <= num; i++) {
        var rs = fs(i);
        if (i === 1) {
            rsString = rsString + rs;
        } else {
            rsString = rsString + &quot;,&quot; + rs;
        }
        console.log(rs);
    }
    return rsString;
    function fs(n) {
        if (n <= 2) {
            return 1;
        } else {
            return fs(n - 1) + fs(n - 2);
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> num = <span class="hljs-number">40</span>;
<span class="hljs-keyword">var</span> startDate = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime();
<span class="hljs-keyword">var</span> result = logfs(num);
<span class="hljs-keyword">var</span> endDate = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime();

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"time:"</span> + ((endDate - startDate) / <span class="hljs-number">1000</span>) + <span class="hljs-string">"s"</span>, <span class="hljs-string">"result:"</span> + result);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">logfs</span>(<span class="hljs-params">num</span>) </span>{
    <span class="hljs-keyword">var</span> rsString = <span class="hljs-string">""</span>;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">1</span>; i &lt;= num; i++) {
        <span class="hljs-keyword">var</span> rs = fs(i);
        <span class="hljs-keyword">if</span> (i === <span class="hljs-number">1</span>) {
            rsString = rsString + rs;
        } <span class="hljs-keyword">else</span> {
            rsString = rsString + <span class="hljs-string">","</span> + rs;
        }
        <span class="hljs-built_in">console</span>.log(rs);
    }
    <span class="hljs-keyword">return</span> rsString;
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fs</span>(<span class="hljs-params">n</span>) </span>{
        <span class="hljs-keyword">if</span> (n &lt;= <span class="hljs-number">2</span>) {
            <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">return</span> fs(n - <span class="hljs-number">1</span>) + fs(n - <span class="hljs-number">2</span>);
        }
    }
}</code></pre>
<h3 id="articleHeader11">Ruby</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="def fs (n)
    if n < 2
        return 1;
    else
        return (fs (n-1)) + (fs (n-2));
    end
end

def fslog (num)
    num = num - 1;
    rsString = &quot;&quot;;
    for i in 1..num
        rs = fs i;
        puts rs;
        if i === 1
            rsString = rsString + &quot;#{rs}&quot;;
        else
            rsString = rsString + &quot;,#{rs}&quot;;
        end
        
    end
    return rsString;
end

num = 40;
startTime = Time.now.to_f*1000;
rsString = fslog num;
endTime = Time.now.to_f*1000;

needTime = (endTime - startTime)/1000;

puts &quot;time:#{needTime}s,result:#{rsString}&quot;;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="ruby hljs"><code class="ruby"><span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">fs</span> <span class="hljs-params">(n)</span></span>
    <span class="hljs-keyword">if</span> n &lt; <span class="hljs-number">2</span>
        <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
    <span class="hljs-keyword">else</span>
        <span class="hljs-keyword">return</span> (fs (n-<span class="hljs-number">1</span>)) + (fs (n-<span class="hljs-number">2</span>));
    <span class="hljs-keyword">end</span>
<span class="hljs-keyword">end</span>

<span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">fslog</span> <span class="hljs-params">(num)</span></span>
    num = num - <span class="hljs-number">1</span>;
    rsString = <span class="hljs-string">""</span>;
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-number">1</span>..num
        rs = fs i;
        puts rs;
        <span class="hljs-keyword">if</span> i === <span class="hljs-number">1</span>
            rsString = rsString + <span class="hljs-string">"<span class="hljs-subst">#{rs}</span>"</span>;
        <span class="hljs-keyword">else</span>
            rsString = rsString + <span class="hljs-string">",<span class="hljs-subst">#{rs}</span>"</span>;
        <span class="hljs-keyword">end</span>
        
    <span class="hljs-keyword">end</span>
    <span class="hljs-keyword">return</span> rsString;
<span class="hljs-keyword">end</span>

num = <span class="hljs-number">40</span>;
startTime = Time.now.to_f*<span class="hljs-number">1000</span>;
rsString = fslog num;
endTime = Time.now.to_f*<span class="hljs-number">1000</span>;

needTime = (endTime - startTime)/<span class="hljs-number">1000</span>;

puts <span class="hljs-string">"time:<span class="hljs-subst">#{needTime}</span>s,result:<span class="hljs-subst">#{rsString}</span>"</span>;</code></pre>
<h3 id="articleHeader12">Php</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<?php
    $num = 40;
    $startTime = microtime(true)*1000;
    var_dump($startTime);
    consoleLog($startTime);
    $result = fslog($num);
    $endTime = microtime(true)*1000;



    consoleLog(&quot;time:&quot;.(($endTime - $startTime)/1000).&quot;s,result:&quot;.$result);

    function fs($n){
        if ($n <= 2) {
            return 1;
        } else {
            return fs($n - 1) + fs($n - 2);
        }
    }
    function fslog($num){
        $rsString = &quot;&quot;;
        for($i=1;$i<=$num;$i++){
            $rs = fs($i);
            if($i===1){
                $rsString = $rsString.&quot;&quot;.$rs;
            }else{
                $rsString = $rsString.&quot;,&quot;.$rs;
            }
            consoleLog($rs);
        }
        return $rsString;
    }
    function consoleLog($str){
        echo $str.&quot;\n&quot;;
    }
?>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="php hljs"><code class="php"><span class="hljs-meta">&lt;?php</span>
    $num = <span class="hljs-number">40</span>;
    $startTime = microtime(<span class="hljs-keyword">true</span>)*<span class="hljs-number">1000</span>;
    var_dump($startTime);
    consoleLog($startTime);
    $result = fslog($num);
    $endTime = microtime(<span class="hljs-keyword">true</span>)*<span class="hljs-number">1000</span>;



    consoleLog(<span class="hljs-string">"time:"</span>.(($endTime - $startTime)/<span class="hljs-number">1000</span>).<span class="hljs-string">"s,result:"</span>.$result);

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fs</span><span class="hljs-params">($n)</span></span>{
        <span class="hljs-keyword">if</span> ($n &lt;= <span class="hljs-number">2</span>) {
            <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">return</span> fs($n - <span class="hljs-number">1</span>) + fs($n - <span class="hljs-number">2</span>);
        }
    }
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fslog</span><span class="hljs-params">($num)</span></span>{
        $rsString = <span class="hljs-string">""</span>;
        <span class="hljs-keyword">for</span>($i=<span class="hljs-number">1</span>;$i&lt;=$num;$i++){
            $rs = fs($i);
            <span class="hljs-keyword">if</span>($i===<span class="hljs-number">1</span>){
                $rsString = $rsString.<span class="hljs-string">""</span>.$rs;
            }<span class="hljs-keyword">else</span>{
                $rsString = $rsString.<span class="hljs-string">","</span>.$rs;
            }
            consoleLog($rs);
        }
        <span class="hljs-keyword">return</span> $rsString;
    }
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">consoleLog</span><span class="hljs-params">($str)</span></span>{
        <span class="hljs-keyword">echo</span> $str.<span class="hljs-string">"\n"</span>;
    }
<span class="hljs-meta">?&gt;</span></code></pre>
<h2 id="articleHeader13">参考</h2>
<ul>
<li><p>《你所不知道的JavaScript（上卷）》</p></li>
<li><p>《WebKit技术内幕》</p></li>
<li><p>《深入浅出Node.js》</p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用最简单易懂的道理告诉你，为什么JavaScript在现代引擎（V8，JavaScriptCore）下，能表现出卓越性能！

## 原文链接
[https://segmentfault.com/a/1190000005148418](https://segmentfault.com/a/1190000005148418)

