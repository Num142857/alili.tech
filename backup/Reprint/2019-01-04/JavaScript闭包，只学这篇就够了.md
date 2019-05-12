---
title: 'JavaScript闭包，只学这篇就够了' 
date: 2019-01-04 2:30:10
hidden: true
slug: waipgafczye
categories: [reprint]
---

{{< raw >}}

                    
<h1>闭包不是魔法</h1>
<p>这篇文章使用一些简单的代码例子来解释JavaScript闭包的概念，即使新手也可以轻松参透闭包的含义。</p>
<p>其实只要理解了核心概念，闭包并不是那么的难于理解。但是，网上充斥了太多学术性的文章，对于新手来说，看完这些文章可能会更加一头雾水。</p>
<p>这篇文章面向的是使用主流开发语言的程序员，如果你能读懂下面这段代码，恭喜你，你可以开始JavaScript闭包的学习之旅了。</p>
<pre><code class="javascript">function sayHello(name) {
    var text = 'Hello' + name;
    var say = function() {
        console.log(text);
    }
    say();
}
sayHello('Joe');</code></pre>
<p>我相信你一定看懂了，那我们就开始吧！<br>&lt;!-- more --&gt;</p>
<h1>闭包的一个例子</h1>
<p>举例之前，我们先用两句话概括一下：</p>
<ul>
<li>闭包是支持<code>一类函数</code>特性的一种方式（如果你还不知道什么是一类函数，请自行百度）；它是一个表达式，这个表达式可以在其作用域（当它被初次定义时）内引用变量，或者被赋值给一个变量，或者被当做一个变量传递给某个函数，甚至被当作一个函数的执行结果被返回出去。</li>
<li>闭包也可以看作是某个函数被调用时分配的栈帧，而且当这个函数返回结果之后它也不会被回收（就好像它被分配给了堆，而不是栈）</li>
</ul>
<p>下面的例子返回了对一个方法的引用：</p>
<pre><code class="javascript">function sayHello2(name){
    var text= 'Hello' + name; //局部变量
    var say=function(){
        console.log(text);
    }
    return say;
}
var say2=sayHello2('Bob');
say2();//logs='Hello Bob'</code></pre>
<p>我想大多数JavaScript程序员都能理解上面代码中一个函数的引用是如何被赋值给一个变量(<code>say2</code>)的。如果你不清楚的话，最好在继续了解闭包之前弄清楚。使用C语言的程序员或许会认为这个函数是指向另一个函数的指针，并且变量<code>say</code>和<code>say2</code>也同样是指向函数的指针。</p>
<p>然而C语言中指向函数的指针和JavaScript中对一个函数的引用有很大的不同。在JavaScript中，你可以把引用函数的变量当作同时拥有两个指针：一个指向函数，另一个隐形地指向闭包。</p>
<p>上面的代码中生成了一个闭包是因为匿名函数<code>function(){console.log(text);}</code>被定义在了另外一个函数<code>sayHello2()</code>中。在JavaScript中，如果你在一个函数中定义了另外一个函数，那么你就创建了一个闭包。</p>
<p>在C语言或者其他流行的开发语言当中，函数返回之后，所有局部变量都不能再被访问，因为栈帧已经被销毁了。</p>
<p>在JavaScript中，如果在一个函数中定义了另外一个函数，即使从被调用的函数中返回，局部变量依然能够被访问到。正如上面例子中我们在得到<code>sayHello2()</code>的返回值之后又调用了<code>say2()</code>一样。需要注意到，我们调用的代码中引用了函数<code>sayHello2()</code>中的局部变量<code>text</code>。</p>
<pre><code class="javascript">function(){console.log(text);} //say2.toString()的输出结果;</code></pre>
<p>观察<code>say2.toString()</code>的输出结果，我们会发现代码指向变量<code>text</code>。这个匿名函数能够引用值为<code>Hello Bob</code>的变量<code>text</code>是因为<code>sayHello2()</code>的局部变量被保留在了闭包中。</p>
<p>在JavaScript中神奇的地方在于引用一个函数的同时会有一个秘密的引用指向在这个函数内部创建的闭包，类似于委托一个方法指针加一个隐藏的对象引用。</p>
<h1>更多例子</h1>
<p>当你读到很多关于闭包的文章时，总会感觉一头雾水，但是当你看到一些应用的例子时，你就能清晰的理解闭包是如何工作的了。下面是我推荐的一些例子，希望大家能够认真研究直到真正清楚闭包是如何工作的。如果在你没有完全理解的情况下就开始使用闭包，你很快就会成为很多奇怪bug的创造者。</p>
<p>下面这个例子展示了局部变量不是被复制，而是被保留在了引用当中。这是当外部函数存在的情况下将栈帧保存在内存中的方法之一。</p>
<pre><code class="javascript">function say667(){
//处于闭包中的局部变量
var num=42;
var say=function(){console.log(num);}
num++;
return say;
}
var sayNumber=say667();
sayNumber();//logs 43</code></pre>
<p>下面例子中的三个全局函数有对同一个闭包的共同引用，因为他们都在<code>setupSomeGlobals()</code>中被定义。</p>
<pre><code class="javascript">var gLogNumber, gIncreaseNumber, gSetNumber;
function setupSomeGlobals() {
  //处于闭包中的局部变量
  var num = 42;
  // 用全局变量存储对函数的引用
  gLogNumber = function() { console.log(num); }
  gIncreaseNumber = function() { num++; }
  gSetNumber = function(x) { num = x; }
}
setupSomeGlobals();
gIncreaseNumber();
gLogNumber(); // 43
gSetNumber(5);
gLogNumber(); // 5

var oldLog = gLogNumber;

setupSomeGlobals();
gLogNumber(); // 42

oldLog() // 5    </code></pre>
<p>当这三个函数被创建时，它们能够共享对同一个闭包的访问-即对<code>setupSomeGlobals()</code>中的局部变量的访问。</p>
<p>需要注意到在上述例子中，如果你再次调用<code>setupSomeGlobals()</code>，会创建一个新的闭包。<code>gLogNumber()</code>、<code>gSetNumber()</code>和<code>gLogNumber()</code>会被带有新闭包的函数重写（在JavaScript中，当在一个函数中定义另外一个函数时，重新调用外部函数会导致内部函数被重新创建）。</p>
<p>下面这个例子对很多人来说都难以理解，所以你更需要真正理解它。在循环中定义函数时要格外小心：闭包中的局部变量或许不会和你的预想的一样。</p>
<pre><code class="javascript">function buildList(list) {
    var result = [];
    for (var i = 0; i &lt; list.length; i++) {
        var item = 'item' + i;
        result.push( function() {console.log(item + ' ' + list[i])} );
    }
    return result;
}

function testList() {
    var fnlist = buildList([1,2,3]);
    for (var j = 0; j &lt; fnlist.length; j++) {
        fnlist[j]();
    }
}

 testList() //logs "item2 undefined" 3次</code></pre>
<p>注意到<code>result.push( function() {console.log(item + ' ' + list[i])}</code>向<code>result</code>数组中插入了三次对匿名函数的引用。如果你对匿名函数不太熟悉，可以想象成下面的代码：</p>
<pre><code class="javascript">pointer=function(){console.log(item+''+list[i])};
result.push(pointer);</code></pre>
<p>需要注意到，当你运行上面的例子时，<code>item2 undefined</code>被打印了三次！这是因为像前一个例子中提到的，<code>buildList</code>的局部变量只有一个闭包。当在<code>fnlist[j]()</code>中调用匿名函数时，它们用的都是同一个闭包，而且在这个闭包中使用了<code>i</code>和<code>item</code>的当前值（<code>i</code>的值为3因为循环已经结束，<code>item</code>的值为<code>item2</code>）。因为我们从0开始计数所以<code>item</code>的值为<code>item2</code>，而<code>i++</code>会使<code>i</code>的值变为<code>3</code>。</p>
<p>下面这个例子展示了闭包在退出之前包含了外部函数中定义的任何局部变量。注意到变量<code>alice</code>其实是在匿名函数之后定义的。匿名函数先定义，但是当它被调用时它能够访问<code>alice</code>，因为<code>alice</code>和匿名函数处于同一作用域（JavaScript会进行变量提升）。<code>sayAlice()()</code>只是直接调用了<code>sayAlice()</code>返回的函数引用-但结果却和之前一样，只不过没有临时变量而已。</p>
<pre><code class="JavaScript">function sayAlice() {
    var say = function() { console.log(alice); }
    var alice = 'Hello Alice';
    return say;
}
sayAlice()();// logs "Hello Alice"</code></pre>
<p>注意到变量<code>say</code>也在闭包中，能够被任何在<code>sayAlice()</code>中定义的函数访问，或者在内部函数中被递归调用。</p>
<p>最后一个例子展现了每次调用都为局部变量创建一个独立闭包。不是每个函数定义都会有一个闭包，而是每次函数调用产生一个闭包。</p>
<pre><code class="JavaScript">function newClosure(someNum, someRef) {
    var num = someNum;
    var anArray = [1,2,3];
    var ref = someRef;
    return function(x) {
        num += x;
        anArray.push(num);
        console.log('num: ' + num +
            '; anArray: ' + anArray.toString() +
            '; ref.someVar: ' + ref.someVar + ';');
      }
}
obj = {someVar: 4};
fn1 = newClosure(4, obj);
fn2 = newClosure(5, obj);
fn1(1); // num: 5; anArray: 1,2,3,5; ref.someVar: 4;
fn2(1); // num: 6; anArray: 1,2,3,6; ref.someVar: 4;
obj.someVar++;
fn1(2); // num: 7; anArray: 1,2,3,5,7; ref.someVar: 5;
fn2(2); // num: 8; anArray: 1,2,3,6,8; ref.someVar: 5;</code></pre>
<h1>总结</h1>
<p>如果你对于闭包的概念依然不清晰，那么最好的方式就是运行一下上面的例子，看看会发生什么。读懂一篇长篇大论要比理解一个例子难的多。我对与闭包和栈帧的解释在技术上并不完全正确-而是为了帮助理解而简化了。如果这些基本点都掌握之后，你就可以朝着更细微之处进发了。</p>
<p>最后总结几点：</p>
<ul>
<li>当你在一个函数中定义另外一个函数时，你就使用了闭包。</li>
<li>当你在函数中使用<code>eval()</code>时，你就使用了闭包。你在<code>eval</code>中用到的文字可以指向外部函数的局部变量，而且在<code>eval</code>中你也可以使用<code>eval('val foo=...')</code>来创建局部变量。</li>
<li>当你在函数中使用<code>new Function(...)</code>时，<strong>不会</strong>创建一个闭包（这个新的函数不能引用外部函数的局部变量）。</li>
<li>JavaScript中的闭包就好像保存了一份局部变量的备份，他们保持在函数退出时的状态。</li>
<li>最好将闭包当作是一个函数的入口创建的，而局部变量是被添加进这个闭包的。</li>
<li>当一个带有闭包的函数被调用时，总会保存一组新的局部变量。</li>
<li>两个看似代码相同的函数却有不同的行为，是因为<code>隐藏的</code>闭包在作怪。我不认为JavaScript代码能够判断出一个函数引用是否有闭包。</li>
<li>如果你尝试做任何动态代码的改动（例如：<code>myFunction = Function(myFunction.toString().replace(/Hello/,'Hola'));</code>），如果<code>myFunction</code>是个闭包，那就不会起作用（当然，你不会想在运行时里进行源代码的字符串替换，除非...）。</li>
<li>在函数中定义多层函数是有可能的，这样你就可以得到多个级别的闭包。</li>
<li>我认为在通常情况下，闭包是函数及被捕获的变量的术语，请注意在这篇文章里我没有用到闭包的定义。</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript闭包，只学这篇就够了

## 原文链接
[https://segmentfault.com/a/1190000010660305](https://segmentfault.com/a/1190000010660305)

