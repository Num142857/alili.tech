---
title: '《JavaScript函数式编程》读书笔记' 
date: 2019-02-02 2:30:10
hidden: true
slug: xywzs9vc2bs
categories: [reprint]
---

{{< raw >}}

                    
<p>JavaScript是一门很神奇的语言，作为一门现代化的语言，他有很多很有特色的东西，这些东西，让我们看到了一个十分自由化的未来，你永远都不知道，自己是不是掌握了这门奇葩的要命的语言。本文，可能没有那么多高深的编程技巧，有的更多的是，对编程本身的理解。因为，不知道自己有多白痴，所以，要记录下来，等到自己不白痴的时候，就能缅怀当年那个白痴的自己了。</p>
<h2 id="articleHeader0">什么是函数式编程</h2>
<p>所谓函数式编程，是把函数本身上升到<code>一等公民</code>的地位，进行编程构建。在书中，作者用了这么一句话来形容函数式编程：</p>
<blockquote><p>函数式编程通过使用函数来将值转换成抽象单元，接着用于构建软件系统。</p></blockquote>
<p>额，那么好，我们先回忆一下什么叫函数。</p>
<h3 id="articleHeader1">函数</h3>
<blockquote><p>一般的，在一个变化过程中，有两个变量x、y，如果给定一个x值，相应的就确定唯一的一个y，那么就称y是x的函数，其中x是自变量，y是因变量，x的取值范围叫做这个函数的定义域，相应y的取值范围叫做函数的值域。</p></blockquote>
<p>这是数学中的定义，简单的说，函数就是从A到B的<code>关系映射</code>。在计算机中，我们将多条语句组成的程序段（程序块）叫做函数，一个函数本身应该有一定的意义。和数学定义相当的是，变量的生命周期所在的函数空间，为变量的定义域。</p>
<h3 id="articleHeader2">面向函数的编程</h3>
<p>所谓函数式编程，我们又可以叫做是面向函数的编程。所谓面向函数就是使用函数来作为我们分析和抽象程序的主要工具。</p>
<p>嗯，首先，我们继续来复习一下</p>
<ul><li><p>什么叫做面向过程。</p></li></ul>
<blockquote><p>“面向过程”(Procedure Oriented)是一种以过程为中心的编程思想。“面向过程”也可称之为“面向记录”编程思想，他们不支持丰富的“面向对象”特性（比如继承、多态），并且它们不允许混合持久化状态和域逻辑。</p></blockquote>
<p>其实，说白了，就是想到什么写什么。</p>
<ul><li><p>什么叫做面向对象</p></li></ul>
<blockquote><p>按人们认识客观世界的系统思维方式，采用基于对象（实体）的概念建立模型，模拟客观世界分析、设计、实现软件的办法。通过面向对象的理念使计算机软件系统能与现实世界中的系统一一对应。</p></blockquote>
<p>在面向对象中，我们都知道<code>类</code>和<code>对象</code>是两个很重要的概念。</p>
<p>我们知道，所谓的类，其实就是：</p>
<blockquote><p>具有相同特性（数据元素）和行为（功能）的对象的抽象就是类。因此，对象的抽象是类，类的具体化就是对象，也可以说类的实例是对象，类实际上就是一种数据类型。</p></blockquote>
<p>而我们所说的对象，其实就是：</p>
<blockquote><p>对象是人们要进行研究的任何事物，从最简单的整数到复杂的飞机等均可看作对象，它不仅能表示具体的事物，还能表示抽象的规则、计划或事件。</p></blockquote>
<p>我们不难发现，类和对象，其实都是从数据角度出发来思考和解决问题，以数据本身为运算核心来抽象我们的计算行为。但是，很多时候，我们会发现，其实我们的运算行为远远比数据本身要复杂，而且，我们很多时候，其实并不能很好的去抽象一个对象。</p>
<p>我的数据老师曾经这样教导我们：</p>
<blockquote><p>所谓程序，就是数据结构加算法。</p></blockquote>
<p>如果说，面向对象是从数据结构的角度出发的话，面向函数的编程，就是从算法角度出发，也就是从行为的角度出发。</p>
<h2 id="articleHeader3">为什么要用函数式编程</h2>
<h3 id="articleHeader4">数据和行为的关系</h3>
<p>在计算机中，数据多数指的是存储结构。行为指的多数是计算操作。比如说这段代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function say(){
        let a = 1 + 1; 
        console.log(a)
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">say</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">let</span> a = <span class="hljs-number">1</span> + <span class="hljs-number">1</span>; 
        <span class="hljs-built_in">console</span>.log(a)
    }</code></pre>
<p>这段代码里，作为变量存在的<code>a</code>，<code>say</code>，是我们所熟知的数据，而<code>function say()</code>则是包含了整个说的行为。<br>在面向对象的编程中，我们习惯把对象作为行为的核心，也就是说，先有人，然后，人来执行一个动作。而，对象，其实就是某一种变量，亦或是某一种数据类型。而函数式编程中，则认为数据只是行为加工的产品。将行为和数据分离。我们来看一段代码。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // man.php
    class Man {
        function __constructor($sexy){
            $this->sexy = $sexy;
        }
        public function sayHello($string){
            echo &quot;I'm a &quot;.$this->sexy.&quot;,I want to say:&quot;.$string;
        }
    }
    // male.php
    require_once 'man.php'
    $male = new Man(&quot;man&quot;);
    $male->sayHello(&quot;my name is homker&quot;);
    // I'm a man, I want to say: my name is homker" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="php hljs"><code class="php">    <span class="hljs-comment">// man.php</span>
    <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Man</span> </span>{
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">__constructor</span><span class="hljs-params">($sexy)</span></span>{
            <span class="hljs-keyword">$this</span>-&gt;sexy = $sexy;
        }
        <span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sayHello</span><span class="hljs-params">($string)</span></span>{
            <span class="hljs-keyword">echo</span> <span class="hljs-string">"I'm a "</span>.<span class="hljs-keyword">$this</span>-&gt;sexy.<span class="hljs-string">",I want to say:"</span>.$string;
        }
    }
    <span class="hljs-comment">// male.php</span>
    <span class="hljs-keyword">require_once</span> <span class="hljs-string">'man.php'</span>
    $male = <span class="hljs-keyword">new</span> Man(<span class="hljs-string">"man"</span>);
    $male-&gt;sayHello(<span class="hljs-string">"my name is homker"</span>);
    <span class="hljs-comment">// I'm a man, I want to say: my name is homker</span></code></pre>
<blockquote>
<p>tips：<br>因为javascript本身是没有类的概念的，为了更好的说明问题，这里使用了<code>php</code>来作为范例语言，当然，你也可以使用javascript面向对象的方式来重新实现这段代码。就像这样。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   function Man(sexy){
       var self = this;
       self._sexy = sexy;
       self.sayHello = function(string){
           console.log(&quot;I'm a &quot;+self._sexy+&quot;,I want to say:&quot;+string);
       }
   }

   var male = new Man(&quot;man&quot;);
   male.sayHello('my name is homker');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">   <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Man</span>(<span class="hljs-params">sexy</span>)</span>{
       <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>;
       self._sexy = sexy;
       self.sayHello = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">string</span>)</span>{
           <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"I'm a "</span>+self._sexy+<span class="hljs-string">",I want to say:"</span>+string);
       }
   }

   <span class="hljs-keyword">var</span> male = <span class="hljs-keyword">new</span> Man(<span class="hljs-string">"man"</span>);
   male.sayHello(<span class="hljs-string">'my name is homker'</span>);</code></pre>
</blockquote>
<p>这是一段很简单的面向对象的代码，我们看看同样的功能在函数式中要怎么做。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function Man(sexy){
        return function(string){
            console.log(&quot;I'm a &quot;+sexy+&quot;,I want to say:&quot;+string);
        }
    }
    
    var sayHello = Man('man');
    sayHello('my name is homker');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Man</span>(<span class="hljs-params">sexy</span>)</span>{
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">string</span>)</span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"I'm a "</span>+sexy+<span class="hljs-string">",I want to say:"</span>+string);
        }
    }
    
    <span class="hljs-keyword">var</span> sayHello = Man(<span class="hljs-string">'man'</span>);
    sayHello(<span class="hljs-string">'my name is homker'</span>);</code></pre>
<p>我们会发现，在函数式编程中，我们去除掉了主语。你不知道这个动作是由谁发出的。相比于在面向对象编程中，数据是对象的属性，在函数式编程中，我们并不在乎这个数据的内容是什么，而更在乎其变化。</p>
<blockquote><p>额，当然，严格意义上来说，其实，这个sayHello的原型是Object，在浏览器端，追溯他的原型链，它是挂在window对象下面的。</p></blockquote>
<h3 id="articleHeader5">专注于过程本身</h3>
<p>在实际的开发过程中，我们有的时候很难抽象出一个对象来描述我们到底要做什么，或者说，我们其实并不在乎这堆数据里面的内容是什么，我们要关心的，只是把数据经过加工，得出结果，仅此而已。至于这个数据，到底是用来干什么的，我们其实可以并不用关心。</p>
<h2 id="articleHeader6">如何使用函数式编程</h2>
<p>上面说的都是一些思维上的东西，可能很稚嫩，希望各位大大们能指出其中的错误，切不可吝啬言语。下面就来说说函数式编程的一些具体的东西。</p>
<h3 id="articleHeader7">一等公民</h3>
<p>所谓一等公民，说的是函数本身可以成为代码构成中的任意部分。具体的来说，函数可以具有以下的特点：</p>
<ul>
<li><p>函数可以存储为变量</p></li>
<li><p>函数可以成为数组的一个元素</p></li>
<li><p>函数可以成为对象的成员变量</p></li>
<li><p>函数可以在使用的时被直接创建</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    1 + (function(){ return 1 })(); //2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">    <span class="hljs-number">1</span> + (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ <span class="hljs-keyword">return</span> <span class="hljs-number">1</span> })(); <span class="hljs-comment">//2</span></code></pre>
<ul>
<li><p>函数可以被作为实参传递</p></li>
<li><p>函数可以被另一个函数返回</p></li>
<li><p>函数可以返回另一个函数</p></li>
<li><p>函数可以作为形参</p></li>
</ul>
<p>相信大家一看就懂了。</p>
<h3 id="articleHeader8">纯函数 （Pure Function）</h3>
<p>在函数式编程中，有一个很重要的概念是纯函数。所谓纯函数就是</p>
<blockquote><p>纯函数（Pure Function）与外界交换数据只有唯一渠道——参数和返回值。其在逻辑上没有副作用</p></blockquote>
<h4>可预见性</h4>
<p>简单的说，就是你输入什么，就输出什么。输入和输出是可预见的。比如说像酱：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function add(x,y){
        x = _.isNumber(x)? x : 0;
        y = _.isNumber(y)? y : 0;
        return x+y;
    }
    
    add(1,2); // 3
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span>(<span class="hljs-params">x,y</span>)</span>{
        x = _.isNumber(x)? x : <span class="hljs-number">0</span>;
        y = _.isNumber(y)? y : <span class="hljs-number">0</span>;
        <span class="hljs-keyword">return</span> x+y;
    }
    
    add(<span class="hljs-number">1</span>,<span class="hljs-number">2</span>); <span class="hljs-comment">// 3</span>
    </code></pre>
<p>这样的一个函数，你输入两个变量，你可以很确定的，你得到的一定是两者之和。与之相异的，在javascript编程中很容易出现的，比如说酱：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var x = 10;
    function add10(y){
        return y+x;
    }
    
    add10(1); // 11
    
    x = 11;
    
    add10(1); //12
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-keyword">var</span> x = <span class="hljs-number">10</span>;
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add10</span>(<span class="hljs-params">y</span>)</span>{
        <span class="hljs-keyword">return</span> y+x;
    }
    
    add10(<span class="hljs-number">1</span>); <span class="hljs-comment">// 11</span>
    
    x = <span class="hljs-number">11</span>;
    
    add10(<span class="hljs-number">1</span>); <span class="hljs-comment">//12</span>
    </code></pre>
<p>对于这个函数而言，函数本身是不可控的，如果外部的x发生改变，函数的返回值也随之会发生改变。那么如果想避免，应该怎么写呢：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function add(x){
        return function(y){
            return x+y;
        }
    }
    
    var add10 = add(10);
    
    add10(1); //11
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span>(<span class="hljs-params">x</span>)</span>{
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">y</span>)</span>{
            <span class="hljs-keyword">return</span> x+y;
        }
    }
    
    <span class="hljs-keyword">var</span> add10 = add(<span class="hljs-number">10</span>);
    
    add10(<span class="hljs-number">1</span>); <span class="hljs-comment">//11</span>
    </code></pre>
<p>这个时候，将函数所需的变量闭包在函数体的内部，函数的运算是不依赖于外界的变量的，你输入什么，就一定会输出什么。</p>
<h4>完整性</h4>
<p>为了实现函数的可控性，要保证，函数本省是完整的。函数的完整表现在，函数的运行不依赖于外界的环境变量。同时，函数的逻辑是完整的。比如说，酱：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <!DOCTYPE html>
    <html>
        <head>
            <title>a demo</title>
            <link herf=&quot;path/to/style&quot; rel=&quot;stylesheet&quot; />
            <script src=&quot;path/to/jq&quot;></script>
        </head>
        <body>
            <div class=“container”>
                <span id=&quot;display&quot;></span>
                <button id=&quot;getJson&quot;>获取数据</button>
            </div>
            <script type=&quot;appliaction/javascript&quot;>
                ;(function(){
                    $('#getJson').addEventListener('click',function(){
                        $.get('path/to/json',function(json){
                            $('#display').text(json);
                        })
                    },false)
                })()
            </script>
        </body>
    </html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    &lt;!DOCTYPE html&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>a demo<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">herf</span>=<span class="hljs-string">"path/to/style"</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> /&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"path/to/jq"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">“container”</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"display"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"getJson"</span>&gt;</span>获取数据<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"appliaction/javascript"</span>&gt;</span><span class="javascript">
                ;(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                    $(<span class="hljs-string">'#getJson'</span>).addEventListener(<span class="hljs-string">'click'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                        $.get(<span class="hljs-string">'path/to/json'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">json</span>)</span>{
                            $(<span class="hljs-string">'#display'</span>).text(json);
                        })
                    },<span class="hljs-literal">false</span>)
                })()
            </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></span></code></pre>
<p>上面是我们经常写的方式，当然啦，如果框架复杂一点，可能会多一点回调嵌套。但是，逻辑不出于此。但是呢，如果要函数完整，应该酱，额，我就写重要的部分啦：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var getJson = function(url,params){
        return $.getJson(url,params);
    }
    
    var display = function(text){
        $('#display').text(text)
    }
    
    var getJsonClickHandle = function(){
        getJson('url',{}).done(display)
    }
    
    var init = function(){
        $('#getJson').click(getJsonClickHandle);
    }
    
    
    init();
        " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-keyword">var</span> getJson = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">url,params</span>)</span>{
        <span class="hljs-keyword">return</span> $.getJson(url,params);
    }
    
    <span class="hljs-keyword">var</span> display = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">text</span>)</span>{
        $(<span class="hljs-string">'#display'</span>).text(text)
    }
    
    <span class="hljs-keyword">var</span> getJsonClickHandle = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        getJson(<span class="hljs-string">'url'</span>,{}).done(display)
    }
    
    <span class="hljs-keyword">var</span> init = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        $(<span class="hljs-string">'#getJson'</span>).click(getJsonClickHandle);
    }
    
    
    init();
        </code></pre>
<p>这时候，我们抽象了整个行为。</p>
<p>点击 -&gt; 获取数据 -&gt; 显示数据。</p>
<p>酱，我们把每个行为转换成了一个单独的函数行为。这样的，每一个函数都是单独的行为，可以很好的扩展和复制到其他地方。</p>
<p>同时，我们也引出了一个纯函数很重要的部分。</p>
<h4>可测试</h4>
<p>我们发现，当函数功能变的单一的时候，我们可以很清晰的知道函数输入什么，输出什么的时候，我们发现，这个代码的可测试性，得到了很大的提高。还是用上面的两段代码，前者，根本不知道怎么去写测试，或者说，就是错了，你也不知道哪里错的，因为，所有的逻辑被各种匿名函数包裹了，很难很快的定位到问题的所在，后者，则容易了很多。</p>
<h3 id="articleHeader9">可组合（compose）</h3>
<p>当函数纯化之后，有一个很鲜明的特点是，这个函数变的可以组合了。我们可以像堆乐高积木一样，把各个我们要用的函数堆起来变成一个更大得函数体。比如说酱：</p>
<blockquote><p>使用了underscore.js；</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function checker(){
        var validators = _.toArray(arguments);
        return function(obj){
            return _.reducer(validators,function(err,check){
                if(check(obj)){
                    return errs;
                }else{
                    return _.chain(errs).push(check.message).value();
                }
            },[])
        }
    }
    
    function validator(message,fun){
        var f = function(){
            return fun.apply(fun,arguments);
        };
        f['message'] = message;
        return f;
    }
    
    function hasKeys(){
        var KEYS = _.toArray(arguments);
        
        var fun = function(obj){
            return _.every(KEYS,function(key){
                return _.has(obj,key);
            });
        };
        
        fun.message = KEYS.concat([&quot;，this key is valid&quot;]).join(&quot; &quot;);
        return fun;
    }
    
    var checkCommand = checker(hasKeys('msg','type'));
    
    checkCommand({}); // msg type , this key is valid
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checker</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">var</span> validators = _.toArray(<span class="hljs-built_in">arguments</span>);
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj</span>)</span>{
            <span class="hljs-keyword">return</span> _.reducer(validators,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err,check</span>)</span>{
                <span class="hljs-keyword">if</span>(check(obj)){
                    <span class="hljs-keyword">return</span> errs;
                }<span class="hljs-keyword">else</span>{
                    <span class="hljs-keyword">return</span> _.chain(errs).push(check.message).value();
                }
            },[])
        }
    }
    
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">validator</span>(<span class="hljs-params">message,fun</span>)</span>{
        <span class="hljs-keyword">var</span> f = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-keyword">return</span> fun.apply(fun,<span class="hljs-built_in">arguments</span>);
        };
        f[<span class="hljs-string">'message'</span>] = message;
        <span class="hljs-keyword">return</span> f;
    }
    
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">hasKeys</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">var</span> KEYS = _.toArray(<span class="hljs-built_in">arguments</span>);
        
        <span class="hljs-keyword">var</span> fun = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj</span>)</span>{
            <span class="hljs-keyword">return</span> _.every(KEYS,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">key</span>)</span>{
                <span class="hljs-keyword">return</span> _.has(obj,key);
            });
        };
        
        fun.message = KEYS.concat([<span class="hljs-string">"，this key is valid"</span>]).join(<span class="hljs-string">" "</span>);
        <span class="hljs-keyword">return</span> fun;
    }
    
    <span class="hljs-keyword">var</span> checkCommand = checker(hasKeys(<span class="hljs-string">'msg'</span>,<span class="hljs-string">'type'</span>));
    
    checkCommand({}); <span class="hljs-comment">// msg type , this key is valid</span>
    </code></pre>
<p><code>checkCommand</code>就是我们最后组合出来的可以进行校验的大城堡了，而且这个城堡可以定制化哦，甚至必要的时候，可以动态定制化。</p>
<h3 id="articleHeader10">高阶函数（high-order function）</h3>
<p>高阶函数是函数式编程中，很重要的部分，我们先来看看它是怎么定义的。作为一个高阶函数，他要满足以下定义：</p>
<ul>
<li><p>高阶函数一定是一等公民</p></li>
<li><p>以一个函数为参数</p></li>
<li><p>同时返回一个函数作为函数的返回值</p></li>
</ul>
<p>举一个简单的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var aFunc = (function(callback){
        return function(){
            callback&amp;&amp;callback();
        }
    })(function(){ console.log(&quot;I am a high-order function&quot;) });
    
    aFunc();// I am a high-order function;
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-keyword">var</span> aFunc = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">callback</span>)</span>{
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            callback&amp;&amp;callback();
        }
    })(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"I am a high-order function"</span>) });
    
    aFunc();<span class="hljs-comment">// I am a high-order function;</span>
    </code></pre>
<p>额，呵呵，这个例子比较无聊哈，我们看个更有意思的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function calc(x){
        return function(y){
            return function(method){
                method&amp;&amp;method(x)(y);
            }
        }
    }
    function add(x){
        return function(y){
            console.log(x+y);
        }
    }
    calc(1)(2)(add)；//3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">calc</span>(<span class="hljs-params">x</span>)</span>{
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">y</span>)</span>{
            <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">method</span>)</span>{
                method&amp;&amp;method(x)(y);
            }
        }
    }
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span>(<span class="hljs-params">x</span>)</span>{
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">y</span>)</span>{
            <span class="hljs-built_in">console</span>.log(x+y);
        }
    }
    calc(<span class="hljs-number">1</span>)(<span class="hljs-number">2</span>)(add)；<span class="hljs-comment">//3</span></code></pre>
<p>当然，你再无聊点，非要写成这样，也不是不可以。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function calc(x){
        return function(method){
            return function(y){
                method&amp;&amp;method(x)(y);
            }
        }
    }
    calc(1)(add)(2);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">calc</span>(<span class="hljs-params">x</span>)</span>{
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">method</span>)</span>{
            <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">y</span>)</span>{
                method&amp;&amp;method(x)(y);
            }
        }
    }
    calc(<span class="hljs-number">1</span>)(add)(<span class="hljs-number">2</span>);</code></pre>
<p>其中的<code>add</code>方法是可自定义的。你可以把它换成任何一个你想要的函数。</p>
<h4>柯理化函数（curry）</h4>
<p>柯理化函数，是函数编程中很重要的一个方法。嗯，我们先来看看定义：</p>
<blockquote><p>只传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数。</p></blockquote>
<p>上文的<code>add</code>,<code>calc</code>都是柯理化的函数。<br>在平时的使用中，我们经常如此使用之：</p>
<blockquote><ul>
<li><p>接收一个函数</p></li>
<li><p>返回一个只接收一个参数的函数</p></li>
</ul></blockquote>
<p>柯理化函数的定义是函数式编程的基础，我们通过返回一个闭包的方式来使得函数参数变的可以捕捉，可以传递，可以保存。同时也使得，函数的行为变的可以分离，可以组合。</p>
<h5>柯理方向</h5>
<p>嗯，我们知道运算符是有方向的，函数组合的大函数也是一样的。比如说，下面两个函数就不一样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var leftdiv(x){
        return function(y){
            return x/y;
        }
    }
    
    var rightdiv(x){
        return function(y){
            return y/x;
        }
    }
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-keyword">var</span> leftdiv(x){
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">y</span>)</span>{
            <span class="hljs-keyword">return</span> x/y;
        }
    }
    
    <span class="hljs-keyword">var</span> rightdiv(x){
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">y</span>)</span>{
            <span class="hljs-keyword">return</span> y/x;
        }
    }
    </code></pre>
<h4>部分引用</h4>
<p>我们说到柯理化的函数可以保存参数,或者说成是保留运算场景。比如说我们在上文举的<code>add</code>函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var add10 = add(10);
    add10(1);//11" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-keyword">var</span> add10 = add(<span class="hljs-number">10</span>);
    add10(<span class="hljs-number">1</span>);<span class="hljs-comment">//11</span></code></pre>
<p>其中的add10就是部分引用，<code>add10</code>这个函数保留了上一次函数调用时的运算场景，当下一个参数进来的时候，它能够继续运行，并给出结果。这样的好处是什么呢，我们可以实现核心运算的前置条件校验。</p>
<p>比如说酱：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var add = function(x){
        if(!isNumber(x)) throw Error(' x must be a num');
        return function(y){
            if(!isNumber(y)) throw Error(' y must be a num');
            return function(){
                return x+y;
            }
        }
    }
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-keyword">var</span> add = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">x</span>)</span>{
        <span class="hljs-keyword">if</span>(!isNumber(x)) <span class="hljs-keyword">throw</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">' x must be a num'</span>);
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">y</span>)</span>{
            <span class="hljs-keyword">if</span>(!isNumber(y)) <span class="hljs-keyword">throw</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">' y must be a num'</span>);
            <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                <span class="hljs-keyword">return</span> x+y;
            }
        }
    }
    </code></pre>
<p>我们在每一次的调用的时候，我们顺便做了输入参数的校验，当最后函数执行的时候，我们可以确保，最后的函数执行是可靠的，也就是该函数是纯的。</p>
<h4>组合</h4>
<p>上文在说纯函数的时候，我们就已经说到了组合了，这里，我们再强调的地方是组合函数的<code>管道</code>特性。就是把上一个函数的值作为下一个函数的参数。<br>就像酱：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var compose = function(f,g){
        return function(x){
            return f(g(x));
        }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-keyword">var</span> compose = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">f,g</span>)</span>{
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">x</span>)</span>{
            <span class="hljs-keyword">return</span> f(g(x));
        }
    }</code></pre>
<h3 id="articleHeader11">基于流的编程</h3>
<p>其实，对于函数式编程，我们总结其技巧的时候，发现，其功能是围绕于：</p>
<ul>
<li><p>用函数传递函数</p></li>
<li><p>用函数构造函数</p></li>
<li><p>用函数调用函数</p></li>
</ul>
<p>而这三个综合在一起，使得函数式编程能够实现基于数据流或者控制流。</p>
<h4>链式编程</h4>
<p>这个我们都很熟悉啦，jquery就是这样干的，通过返回一个自身来实现链式调用。就像酱：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    
    $.prototype.next(){
        //do something
        return this;
    }
    
    $('li').next().next();
    
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    
    $.prototype.next(){
        <span class="hljs-comment">//do something</span>
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
    }
    
    $(<span class="hljs-string">'li'</span>).next().next();
    
    </code></pre>
<h4>promise</h4>
<p>这个其实单独拿出来，写一本书。所以这里就不详细说了。例子的话，上文也有举<code>getJson</code>，这里就不举了。</p>
<p>链式编程和promise能更好的，让我们按照数据处理的阶段去处理函数，在开始的进行参数校验，在加工的时候，进行数据的加工，在最后的时候，进行函数的显示。</p>
<h2 id="articleHeader12">总结</h2>
<p>其实，这本翻来覆去的看了好几遍，一直想做一个总结，但是并不能做的出来。因为，我们很容易发现，在实际的操作过程中，我们或多或少的都使用了函数式编程的一部分，我们或多或少的都在践行函数式编程的理论，但是，如果说，我们的代码就是使用函数式编程的时候，我们又会发现，我们的代码中，有很大一部分的逻辑，实在是没办法使用函数式编程进行处理。所以，后面有了响应式编程RXJs,通过订阅和发布模式来实现队列化的事件调度和资源分配，但是在实际使用过程中，要想很快的将代码转化成函数式编程，需要对行为逻辑有很深刻的理解和抽象，对步骤的分解，对函数的分解，对行为的分解，这个才是函数式编程中最难的部分，如何去思考你的数据发生了什么变化，你的状态发生了什么变化，去管理你的数据和你的状态。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
《JavaScript函数式编程》读书笔记

## 原文链接
[https://segmentfault.com/a/1190000007185920](https://segmentfault.com/a/1190000007185920)

