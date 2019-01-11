---
title: 'es6的一些知识点' 
date: 2019-01-09 2:30:11
hidden: true
slug: k0pcdhwtkl
categories: [reprint]
---

{{< raw >}}

                    
<h4>es6的一些知识点</h4>
<p>前言：es6（ECMAscript2015）标准</p>
<h5>let、const、var的一些区别</h5>
<ul>
<li><p>let、const   块级作用域、全局作用域、函数作用域</p></li>
<li><p>var 全局作用域、函数作用域</p></li>
<li>
</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="变量提升的问题：
var        ：  true
let、const ： false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code>变量提升的问题：
<span class="hljs-keyword">var</span>        ：  <span class="hljs-literal">true</span>
<span class="hljs-keyword">let</span>、<span class="hljs-keyword">const</span> ： <span class="hljs-literal">false</span></code></pre>
<p>例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(a);//undefind
let a=1；                     " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code>console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">a</span>)<span class="hljs-comment">;//undefind</span>
let <span class="hljs-keyword">a</span>=<span class="hljs-number">1</span>；                     </code></pre>
<p>块级作用域：例如在一个函数，for循环。。。区块之内！<br>const        常量，值不可更改。<br>let、var     变量，值可以更改</p>
<h5>严格模式</h5>
<ul>
<li><p>消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为;</p></li>
<li><p>消除代码运行的一些不安全之处，保证代码运行的安全；</p></li>
<li><p>提高编译器效率，增加运行速度；</p></li>
<li><p>为未来新版本的Javascript做好铺垫。</p></li>
</ul>
<p>"严格模式"体现了Javascript更合理、更安全、更严谨的发展方向，包括IE 10在内的主流浏览器，都已经支持它，许多大项目已经开始全面拥抱它。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="“use strict”" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">“<span class="hljs-keyword">use</span> <span class="hljs-keyword">strict</span>”</code></pre>
<h5>模板字符串（Template Strings）</h5>
<ul>
<li><p>规定了一种新的string方法可用  ``  斜引号来创建字符串的代码块</p></li>
<li><p>绑定变量用${}来绑定。</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let name=&quot;xiaosan&quot;;
        let age=22;
        let home=&quot;china&quot;
        let str1=`she's name ${name},
        she age ${age},
        she homes's ${home}`
        alert(str1)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> name=<span class="hljs-string">"xiaosan"</span>;
        <span class="hljs-keyword">let</span> age=<span class="hljs-number">22</span>;
        <span class="hljs-keyword">let</span> home=<span class="hljs-string">"china"</span>
        <span class="hljs-keyword">let</span> str1=<span class="hljs-string">`she's name <span class="hljs-subst">${name}</span>,
        she age <span class="hljs-subst">${age}</span>,
        she homes's <span class="hljs-subst">${home}</span>`</span>
        alert(str1)</code></pre>
<ul><li><p>字符串内可直接换行</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let str1=`she's name ${name},
        she age ${age},
        she homes's ${home}`
        alert(str1)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>let str1=<span class="hljs-symbol">`she'</span>s name <span class="hljs-variable">${name}</span>,
        <span class="hljs-keyword">she</span> age <span class="hljs-variable">${age}</span>,
        <span class="hljs-keyword">she</span> homes's <span class="hljs-variable">${home}</span>`
        alert(str1)</code></pre>
<ul><li><p>标签模板字符串。</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function tag(strings,...args){    //...扩展运算符
           //console.log(strings);
           //console.log(args);
           let str='';
           for(var i=0,l=strings.length-1;i<l;i++){
                str=str+strings[i]+args[i];
           }
           str+=strings[l];
           return str
       }
       let name1=&quot;xiaomi&quot;;
       let age1=23;
       let str3=tag`
        she's nam1 ${name1}
        she age ${age1}
       `
       console.log(str3)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">tag</span>(<span class="hljs-params">strings,...args</span>)</span>{    <span class="hljs-comment">//...扩展运算符</span>
           <span class="hljs-comment">//console.log(strings);</span>
           <span class="hljs-comment">//console.log(args);</span>
           <span class="hljs-keyword">let</span> str=<span class="hljs-string">''</span>;
           <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>,l=strings.length<span class="hljs-number">-1</span>;i&lt;l;i++){
                str=str+strings[i]+args[i];
           }
           str+=strings[l];
           <span class="hljs-keyword">return</span> str
       }
       <span class="hljs-keyword">let</span> name1=<span class="hljs-string">"xiaomi"</span>;
       <span class="hljs-keyword">let</span> age1=<span class="hljs-number">23</span>;
       <span class="hljs-keyword">let</span> str3=tag<span class="hljs-string">`
        she's nam1 <span class="hljs-subst">${name1}</span>
        she age <span class="hljs-subst">${age1}</span>
       `</span>
       <span class="hljs-built_in">console</span>.log(str3)</code></pre>
<h5>增强的对象字面量（自变量）</h5>
<ul>
<li><p>对象属性能够简写；</p></li>
<li><p>对象方法可以简写function关键字</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let name=&quot;张三&quot;;
        let age=22;
        let zhangshan={
            name,
            age,
            runing(){
                console.log(&quot;我会跑&quot;)
            }
        }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code><span class="hljs-attribute">let name</span>=<span class="hljs-string">"张三"</span>;
<span class="hljs-attribute">        let age</span>=22;
<span class="hljs-attribute">        let zhangshan</span>={
            name,
            age,
            runing(){
                console.log(<span class="hljs-string">"我会跑"</span>)
            }
        }</code></pre>
<ul>
<li><p>对象属性名可以书写自动计算形式</p></li>
<li><p>原型继承__proto__</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" let people={
            eat(){
                console.log(&quot;我会吃&quot;)
            },
            speak(){
                console.log(&quot;我会说话&quot;)
            },
            feeling(){
                console.log(&quot;我有感情&quot;)
            }
        }
        let caowei={
            name:name,
            __proto__:people,//设置对象原型，用来继承
            study(){
                console.log(&quot;I have sutying ok!&quot;)
            }
        }
        console.log(&quot;my name's&quot;+caowei.name)
        caowei.study();
        caowei.eat();
        caowei.speak();
        caowei.feeling();
         console.log(caowei)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code> let people={
            eat(){
                console.<span class="hljs-built_in">log</span>(<span class="hljs-string">"我会吃"</span>)
            },
            speak(){
                console.<span class="hljs-built_in">log</span>(<span class="hljs-string">"我会说话"</span>)
            },
            feeling(){
                console.<span class="hljs-built_in">log</span>(<span class="hljs-string">"我有感情"</span>)
            }
        }
        let caowei={
            <span class="hljs-built_in">name</span>:<span class="hljs-built_in">name</span>,
            <span class="hljs-variable">__proto__</span>:people,<span class="hljs-comment">//设置对象原型，用来继承</span>
            study(){
                console.<span class="hljs-built_in">log</span>(<span class="hljs-string">"I have sutying ok!"</span>)
            }
        }
        console.<span class="hljs-built_in">log</span>(<span class="hljs-string">"my name's"</span>+caowei.<span class="hljs-built_in">name</span>)
        caowei.study();
        caowei.eat();
        caowei.speak();
        caowei.feeling();
         console.<span class="hljs-built_in">log</span>(caowei)</code></pre>
<h5>解构赋值</h5>
<ul>
<li><p>es6允许我们按照一定结构提取数组与对象里的值，赋给变量</p></li>
<li><p>函数的解构赋值</p></li>
<li><p>说的明白一点解构赋值它的类型就是数组跟对象<br>例子</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//数组
        let [a,,c]=[1,2,3];
        console.log(a,c)
//对象
        let obj={
            x:1,
            y:2
        }
        let {x,y}=obj
        console.log(x,y)//1 2
//函数操作
//函数传对象

        function fn(person){
            let name=person.name;
            let age =person.age;
            console.log(name,age)
        }
        let aa={name:&quot;xiaosan&quot;,age:18}
        fn(aa)*/
       /* function fn({uname:name,age,sex=&quot;女人&quot;}){
            console.log(name,age,sex)
        }
        let bb={uname:&quot;xiaosan&quot;,age:18}
        fn(bb)*/
        //es5 函数传数组
        /*function fn(Arr){
            let x=Arr[0];
            let y=Arr[1];
            let z=Arr[2];
            console.log(x,y,z)
        }*/
        /*function fn([x,y,z,d=22]){
           
            console.log(x,y,z,d)
        }
        let arr=[9,5,8]
        fn(arr)
//字符串解构赋值

        let str=&quot;123456&quot;;
        let [a,b,c,d,e,f,g=50]=str;
        console.log(a,b,c,d,e,f,g)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>//数组
        <span class="hljs-keyword">let</span> [a,,c]=[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
        console.log(a,c)
//对象
        <span class="hljs-keyword">let</span> obj={
            x:<span class="hljs-number">1</span>,
            y:<span class="hljs-number">2</span>
        }
        <span class="hljs-keyword">let</span> {x,y}=obj
        console.log(x,y)//<span class="hljs-number">1</span> <span class="hljs-number">2</span>
//函数操作
//函数传对象

        <span class="hljs-keyword">function</span> fn(person){
            let name=person.name;
            let age =person.age;
            console.log(name,age)
        }
        <span class="hljs-keyword">let</span> aa={name:<span class="hljs-string">"xiaosan"</span>,age:<span class="hljs-number">18</span>}
        fn(aa)*/
       /* <span class="hljs-keyword">function</span> fn({uname:name,age,sex=<span class="hljs-string">"女人"</span>}){
            console.log(name,age,sex)
        }
        <span class="hljs-keyword">let</span> bb={uname:<span class="hljs-string">"xiaosan"</span>,age:<span class="hljs-number">18</span>}
        fn(bb)*/
        //es5 函数传数组
        /*<span class="hljs-keyword">function</span> fn(Arr){
            let x=Arr[<span class="hljs-number">0</span>];
            let y=Arr[<span class="hljs-number">1</span>];
            let z=Arr[<span class="hljs-number">2</span>];
            console.log(x,y,z)
        }*/
        /*<span class="hljs-keyword">function</span> fn([x,y,z,d=<span class="hljs-number">22</span>]){
           
            console.log(x,y,z,d)
        }
        <span class="hljs-keyword">let</span> arr=[<span class="hljs-number">9</span>,<span class="hljs-number">5</span>,<span class="hljs-number">8</span>]
        fn(arr)
//字符串解构赋值

        <span class="hljs-keyword">let</span> str=<span class="hljs-string">"123456"</span>;
        <span class="hljs-keyword">let</span> [a,b,c,d,e,f,g=<span class="hljs-number">50</span>]=str;
        console.log(a,b,c,d,e,f,g)</code></pre>
<h5>扩展运算符</h5>
<ul><li><p>扩展运算符用三个点号表示，功能是把数组或类数组对象展开成一系列用逗号隔开的值<br>操作数组操作对象（自变量对象ps：兼容问题）</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" //展开数组 
    let arr=[1,2,3]
    let arr2=arr;
   // console.log(arr2);
   document.write(arr2)  //1,2,3
   let arr3=[...arr]   //也可以看做是拷贝
   console.log(arr3)//( 3) [1 2 3]
   //展开对象

let obj={
    name:&quot;zhangsan&quot;,
    age:19,
}
let obj1={
    ...obj,
    sex:&quot;man&quot;
}
console.log(obj1)  //报错 现在浏览器不支持但是方法确实可行可以采用babel编译一下使用

//展开函数
function myFunction(x, y, z) {
    console.log(x,y,z)//0 1 2
 }
var args = [0, 1, 2];
myFunction(...args);


function myFunc(a, b, ...rest) {
    console.log(rest.length);//3
}

myFunc(1,2,3,4,5); // => 3

function myFunction(x, y, z,...l) {
    console.log(x,y,z,l)//0 1 2
 }
var args = [0, 1, 2,4,5,6];//0 1 2 (3) [4,5,6]
myFunction(...args);
//数组 与 扩展运算符结合
let c = [&quot;abc&quot;,11,12]
let a = [1, 3, 4, 5,c],
    b = [...a, 6, 7, 8, 9]
  // b=a;
console.log(b)//(8) [1,2,3,4,5,6,7,8,9];
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code> <span class="hljs-comment">//展开数组 </span>
    let arr=[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>]
    let arr2=arr;
   <span class="hljs-comment">// console.log(arr2);</span>
   document.write(arr2)  <span class="hljs-comment">//1,2,3</span>
   let arr3=[...arr]   <span class="hljs-comment">//也可以看做是拷贝</span>
   console.log(arr3)<span class="hljs-comment">//( 3) [1 2 3]</span>
   <span class="hljs-comment">//展开对象</span>

let obj={
    name:<span class="hljs-string">"zhangsan"</span>,
    age:<span class="hljs-number">19</span>,
}
let obj1={
    ...obj,
    sex:<span class="hljs-string">"man"</span>
}
console.log(obj1)  <span class="hljs-comment">//报错 现在浏览器不支持但是方法确实可行可以采用babel编译一下使用</span>

<span class="hljs-comment">//展开函数</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">myFunction</span><span class="hljs-params">(x, y, z)</span> </span>{
    console.log(x,y,z)<span class="hljs-comment">//0 1 2</span>
 }
<span class="hljs-keyword">var</span> args = [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>];
myFunction(...args);


<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">myFunc</span><span class="hljs-params">(a, b, <span class="hljs-rest_arg">...rest</span>)</span> </span>{
    console.log(rest.length);<span class="hljs-comment">//3</span>
}

myFunc(<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>); <span class="hljs-comment">// =&gt; 3</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">myFunction</span><span class="hljs-params">(x, y, z,<span class="hljs-rest_arg">...l</span>)</span> </span>{
    console.log(x,y,z,l)<span class="hljs-comment">//0 1 2</span>
 }
<span class="hljs-keyword">var</span> args = [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>];<span class="hljs-comment">//0 1 2 (3) [4,5,6]</span>
myFunction(...args);
<span class="hljs-comment">//数组 与 扩展运算符结合</span>
let c = [<span class="hljs-string">"abc"</span>,<span class="hljs-number">11</span>,<span class="hljs-number">12</span>]
let a = [<span class="hljs-number">1</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>,c],
    b = [...a, <span class="hljs-number">6</span>, <span class="hljs-number">7</span>, <span class="hljs-number">8</span>, <span class="hljs-number">9</span>]
  <span class="hljs-comment">// b=a;</span>
console.log(b)<span class="hljs-comment">//(8) [1,2,3,4,5,6,7,8,9];</span>
</code></pre>
<h5>箭头函数=&gt;</h5>
<ul><li><p>ES6允许使用“箭头”（=&gt;）定义函数</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var f = v => v" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> f = <span class="hljs-function"><span class="hljs-params">v</span> =&gt;</span> v</code></pre>
<p>上边的函数可以书写为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var f = function(v) {
  return v;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> f = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(v)</span> </span>{
  <span class="hljs-keyword">return</span> v;
};</code></pre>
<p>如果箭头函数不需要参数或需要多个参数，就使用一个圆括号代表参数部分。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var f = () => 5;
// 等同于
var f = function () { return 5 };

var sum = (num1, num2) => num1 + num2;
// 等同于
var sum = function(num1, num2) {
  return num1 + num2;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> f = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-number">5</span>;
<span class="hljs-comment">// 等同于</span>
<span class="hljs-keyword">var</span> f = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">return</span> <span class="hljs-number">5</span> };

<span class="hljs-keyword">var</span> sum = <span class="hljs-function">(<span class="hljs-params">num1, num2</span>) =&gt;</span> num1 + num2;
<span class="hljs-comment">// 等同于</span>
<span class="hljs-keyword">var</span> sum = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">num1, num2</span>) </span>{
  <span class="hljs-keyword">return</span> num1 + num2;
};</code></pre>
<p>如果箭头函数的代码块部分多于一条语句，就要使用大括号将它们括起来，并且使用return语句返回。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var sum = (num1, num2) => { return num1 + num2; }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;">var sum = <span class="hljs-function"><span class="hljs-params">(num1, num2)</span> =&gt;</span> { <span class="hljs-keyword">return</span> num1 + num2; }</code></pre>
<p>由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上括号。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var getTempItem = id => ({ id: id, name: &quot;Temp&quot; });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> getTempItem = <span class="hljs-function"><span class="hljs-params">id</span> =&gt;</span> ({ <span class="hljs-attr">id</span>: id, <span class="hljs-attr">name</span>: <span class="hljs-string">"Temp"</span> });</code></pre>
<p>箭头函数可以与变量解构结合使用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const full = ({ first, last }) => first + ' ' + last;

// 等同于
function full(person) {
  return person.first + ' ' + person.last;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> full = <span class="hljs-function">(<span class="hljs-params">{ first, last }</span>) =&gt;</span> first + <span class="hljs-string">' '</span> + last;

<span class="hljs-comment">// 等同于</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">full</span>(<span class="hljs-params">person</span>) </span>{
  <span class="hljs-keyword">return</span> person.first + <span class="hljs-string">' '</span> + person.last;
}</code></pre>
<h5>默认参数，剩余参数，扩展参数</h5>
<p>参数的默认参数，剩余参数，拓展参数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//默认参数
         let sayHello=(name,age=25)=>{
             let str=`my name's ${name},age's ${age} old`
            //console.log(name,age)
            console.log(str)//my name's chenxu,age's 25 old
        }
        sayHello(&quot;chenxu&quot;)

        //扩展参数
        let sum=(a,b,c)=>{
            console.log(a,b,c)
        } 
        let arr=[4,5]          //扩展
        sum(1,...arr)


        //剩余参数
        let sum1=(a,b,...c)=>{
            console.log(c);
            console.log(a,b)

> 引用文字

;  //剩余
        }
        sum1(1,2,3,4,5,7,9)
*/
        let sum2=(a,b,...c)=>{
            console.log(c);
            var result=c.reduce((a,b)=>a+b);
            console.log(result);
            console.log(a,b);
        }
        sum2(1,2,3,4,5,7,9)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-regexp">//</span>默认参数
         let sayHello=<span class="hljs-function"><span class="hljs-params">(name,age=<span class="hljs-number">25</span>)</span>=&gt;</span>{
             let str=`<span class="javascript">my name<span class="hljs-string">'s ${name},age'</span>s ${age} old</span>`
            <span class="hljs-regexp">//</span><span class="hljs-built_in">console</span>.log(name,age)
            <span class="hljs-built_in">console</span>.log(str)<span class="hljs-regexp">//m</span>y name<span class="hljs-string">'s chenxu,age'</span>s <span class="hljs-number">25</span> old
        }
        sayHello(<span class="hljs-string">"chenxu"</span>)

        <span class="hljs-regexp">//</span>扩展参数
        let sum=<span class="hljs-function"><span class="hljs-params">(a,b,c)</span>=&gt;</span>{
            <span class="hljs-built_in">console</span>.log(a,b,c)
        } 
        let arr=[<span class="hljs-number">4</span>,<span class="hljs-number">5</span>]          <span class="hljs-regexp">//</span>扩展
        sum(<span class="hljs-number">1</span>,...arr)


        <span class="hljs-regexp">//</span>剩余参数
        let sum1=<span class="hljs-function"><span class="hljs-params">(a,b,...c)</span>=&gt;</span>{
            <span class="hljs-built_in">console</span>.log(c);
            <span class="hljs-built_in">console</span>.log(a,b)

&gt; 引用文字

;  <span class="hljs-regexp">//</span>剩余
        }
        sum1(<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">7</span>,<span class="hljs-number">9</span>)
*/
        let sum2=<span class="hljs-function"><span class="hljs-params">(a,b,...c)</span>=&gt;</span>{
            <span class="hljs-built_in">console</span>.log(c);
            var result=c.reduce(<span class="hljs-function"><span class="hljs-params">(a,b)</span>=&gt;</span>a+b);
            <span class="hljs-built_in">console</span>.log(result);
            <span class="hljs-built_in">console</span>.log(a,b);
        }
        sum2(<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">7</span>,<span class="hljs-number">9</span>)</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
es6的一些知识点

## 原文链接
[https://segmentfault.com/a/1190000010164790](https://segmentfault.com/a/1190000010164790)

