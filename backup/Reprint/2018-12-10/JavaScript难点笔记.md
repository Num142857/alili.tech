---
title: 'JavaScript难点笔记' 
date: 2018-12-10 2:30:07
hidden: true
slug: gd37d4lupn5
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">前言</h1>
<p>由于工作需求重新回顾了一下JavaScript，以下内容是我以前的学习笔记和其他参考资料整理完善后的内容，都是常用到的，使用频率比较高的，自己必须得精通的知识点的总结，便以后再复习参考。</p>
<h2 id="articleHeader1">第一章 JavaScript原型对象与原型链</h2>
<h3 id="articleHeader2">1.1 构造函数的缺点</h3>
<p>自定义对象时，以构造函数为模板，对象的属性和方法，可以定义在构造函数内部。每当获取对象时都会在内存中创建新的对象属性和方法，这既是增加页面代码量有浪费内存（系统资源）。</p>
<p>同一个构造函数的对象实例之间无法共享属性，而所有的方法都是同样的行为，因此属性和方法完全应该共享。但无法共享这就是缺点。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Student(Name,Class){
    this.name=Name;
    this.class=Class;
    this.f=function(){
        console.log(this.name+'是'+this.class+'班的学生');
    }
}
//此时，每当得到一个对象实例，就会多一个“01”的班，浪费内存，
//因为只有一个班，而学生两个，只在内存中存在一个班级而学生不一样就可以了，但构造函数无法实现
var Stu1=new Student('Aklman','01');
var Stu2=new Student('Ahmatbek','01');
Stu1.f();
Stu2.f();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Student</span>(<span class="hljs-params">Name,Class</span>)</span>{
    <span class="hljs-keyword">this</span>.name=Name;
    <span class="hljs-keyword">this</span>.class=Class;
    <span class="hljs-keyword">this</span>.f=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name+<span class="hljs-string">'是'</span>+<span class="hljs-keyword">this</span>.class+<span class="hljs-string">'班的学生'</span>);
    }
}
<span class="hljs-comment">//此时，每当得到一个对象实例，就会多一个“01”的班，浪费内存，</span>
<span class="hljs-comment">//因为只有一个班，而学生两个，只在内存中存在一个班级而学生不一样就可以了，但构造函数无法实现</span>
<span class="hljs-keyword">var</span> Stu1=<span class="hljs-keyword">new</span> Student(<span class="hljs-string">'Aklman'</span>,<span class="hljs-string">'01'</span>);
<span class="hljs-keyword">var</span> Stu2=<span class="hljs-keyword">new</span> Student(<span class="hljs-string">'Ahmatbek'</span>,<span class="hljs-string">'01'</span>);
Stu1.f();
Stu2.f();</code></pre>
<h3 id="articleHeader3">1.2 prototype属性</h3>
<p>JavaScript中每一个对象都继承另一个对象，父类对象称之为“原型”（prototype）对象。<strong>只有null除外，其他都有自己的原型对象</strong></p>
<p>而原型对象上的所有属性和方法，都能被派生（子类）对象共享。通过构造方法生成生成实例化对象时，会自动生成实例化对象分配原型对象。每一个构造方法都有一个prototype属性，这个属性就是实例化对象的原型对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Student(Name,Class){
    this.name=Name;
    this.f=function(){
        console.log(this.name+'是'+this.class+'班的学生');
    }
}
//构造函数的prototype就是由这个构造函数得到的对象的原型对象（父类对象）
Student.prototype.class='01';
var stu1=new Student('aklman');
var stu2=new Student('ahmatbek');
stu1.f();
stu2.f();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Student</span>(<span class="hljs-params">Name,Class</span>)</span>{
    <span class="hljs-keyword">this</span>.name=Name;
    <span class="hljs-keyword">this</span>.f=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name+<span class="hljs-string">'是'</span>+<span class="hljs-keyword">this</span>.class+<span class="hljs-string">'班的学生'</span>);
    }
}
<span class="hljs-comment">//构造函数的prototype就是由这个构造函数得到的对象的原型对象（父类对象）</span>
Student.prototype.class=<span class="hljs-string">'01'</span>;
<span class="hljs-keyword">var</span> stu1=<span class="hljs-keyword">new</span> Student(<span class="hljs-string">'aklman'</span>);
<span class="hljs-keyword">var</span> stu2=<span class="hljs-keyword">new</span> Student(<span class="hljs-string">'ahmatbek'</span>);
stu1.f();
stu2.f();</code></pre>
<p>构造函数Student的prototype对象就是实例化对象stu1和stu2的原型对象。在原型对象上添加一个color属性。结果，实例化对象都能读取属性。实现属性共享；</p>
<p>原型对象的属性不是实例化对象自身的属性。但是只要修改原型对象，变动会立刻回提现到所有实例化对象上。</p>
<blockquote>如果实例化对象自身就有某个属性或方法，那么原型对象上的属性和方法便会失效：</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Student(Name,Class){
    this.name=Name;
    this.f=function(){
        console.log(this.name+'是'+this.class+'班的学生');
    }
}
//将class属性，赋值给原型对象，此后所有对象共享class属性
Student.prototype.class='01';
var stu1=new Student('aklman');
var stu2=new Student('ahmatbek');
//为stu2对象定义class属性，原型对象的class属性则失效，也就是说在stu2上的属性发生变化
stu2.class='02';
stu1.f();
stu2.f();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Student</span>(<span class="hljs-params">Name,Class</span>)</span>{
    <span class="hljs-keyword">this</span>.name=Name;
    <span class="hljs-keyword">this</span>.f=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name+<span class="hljs-string">'是'</span>+<span class="hljs-keyword">this</span>.class+<span class="hljs-string">'班的学生'</span>);
    }
}
<span class="hljs-comment">//将class属性，赋值给原型对象，此后所有对象共享class属性</span>
Student.prototype.class=<span class="hljs-string">'01'</span>;
<span class="hljs-keyword">var</span> stu1=<span class="hljs-keyword">new</span> Student(<span class="hljs-string">'aklman'</span>);
<span class="hljs-keyword">var</span> stu2=<span class="hljs-keyword">new</span> Student(<span class="hljs-string">'ahmatbek'</span>);
<span class="hljs-comment">//为stu2对象定义class属性，原型对象的class属性则失效，也就是说在stu2上的属性发生变化</span>
stu2.class=<span class="hljs-string">'02'</span>;
stu1.f();
stu2.f();</code></pre>
<blockquote>总结：原型对象的作用就是定义所有数理化对象共享的属性和方法。这也是他被称为原型对象的原因，而实例化对象可以视作从原型对象衍生出来的子对象。<p>由于JavaScript的所有对象都是构造函数（只有null除外）。而所有构造函数都有prototype属性（其实是所有函数都有prototype属性），所以所有对象都有自己的原型对象。</p>
</blockquote>
<h3 id="articleHeader4">1.3 原型链</h3>
<p>对象的属性和方法，有可能是定义在自身内，也有可能是定义在它的原型对象上。由于原型对象本身也是对象，又有自己的原型，所有生成了一条原型链（prototype chain）。例如，a对象是b对象的原型，b对象是c对象的原型，依次类推。</p>
<p>如果那么一层层地上溯，所有对象的原型最终都可以上溯到Object对象上。Object对象也有原型就是一个没有任何属性和方法的null对象，而null对象没有自己的原型。</p>
<p>获取对象的原型对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Student(Name){
    this.name=Name;
}
var stu1=new Student('aklman');
console.log(Student.prototype);
console.log(Student.prototype.constructor.prototype);
//由于对象自身直接获取原型对象，最终的大对象就是object,也就是说，在JavaScript中所有对象（不管从何而来）都基于object大对象，而最大对象Object的原型指向null，也就是没有
console.log(stu1.__pro__.__proto__.__proto__);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Student</span>(<span class="hljs-params">Name</span>)</span>{
    <span class="hljs-keyword">this</span>.name=Name;
}
<span class="hljs-keyword">var</span> stu1=<span class="hljs-keyword">new</span> Student(<span class="hljs-string">'aklman'</span>);
<span class="hljs-built_in">console</span>.log(Student.prototype);
<span class="hljs-built_in">console</span>.log(Student.prototype.constructor.prototype);
<span class="hljs-comment">//由于对象自身直接获取原型对象，最终的大对象就是object,也就是说，在JavaScript中所有对象（不管从何而来）都基于object大对象，而最大对象Object的原型指向null，也就是没有</span>
<span class="hljs-built_in">console</span>.log(stu1.__pro__.__proto__.__proto__);</code></pre>
<p>原型链的作用是读取对象某个属性时，JavaScript引擎先寻找对象本身的属性，如果找不到就找它的原型（父类对象），如果还是找不到就找原型的原型。如果直到最顶层的Object。prototype还是找不到，则返回undefined。</p>
<blockquote>如果对象自身和它的原型，都定义了一个同名属性，那么悠闲读取对象自身的属性，这叫<strong>覆盖(overriding)</strong>。</blockquote>
<p>注意：一级级向上，在原型链寻找某个属性，对性能是有影响的。如果寻找某个不存在的属性将会遍历整个原型链。</p>
<p>实际开发上注意事项：通常使用第三方框架（一个类），但是我们发现这个类中并不存在我们想要的属性或方法时，不能直接修改源代码，但是可以通过原型对象来添加我们想要的属性和方法。</p>
<h3 id="articleHeader5">1.4 原型操作</h3>
<h4>1.4.1 constructor属性</h4>
<p>对象有一个constructor属性指向原型对象所在的构造函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Student(name){
    this.name=name;
}
var stu=new Student('aklman');
console.log(stu.constructor);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Student</span>(<span class="hljs-params">name</span>)</span>{
    <span class="hljs-keyword">this</span>.name=name;
}
<span class="hljs-keyword">var</span> stu=<span class="hljs-keyword">new</span> Student(<span class="hljs-string">'aklman'</span>);
<span class="hljs-built_in">console</span>.log(stu.constructor);</code></pre>
<h4>1.4.2 设置获取原型对象</h4>
<p>Object.getPrototypeOf()方法返回一个对象的原型对象，也就是通过它获取原型对象，这是标准的方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Student(name,Class){
    this.name=name;
}
var stu=new Student('aklman');
//获取stu对象的原型对象
var s=Object.getPrototypeOf(stu);
console.log(s);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Student</span>(<span class="hljs-params">name,Class</span>)</span>{
    <span class="hljs-keyword">this</span>.name=name;
}
<span class="hljs-keyword">var</span> stu=<span class="hljs-keyword">new</span> Student(<span class="hljs-string">'aklman'</span>);
<span class="hljs-comment">//获取stu对象的原型对象</span>
<span class="hljs-keyword">var</span> s=<span class="hljs-built_in">Object</span>.getPrototypeOf(stu);
<span class="hljs-built_in">console</span>.log(s);</code></pre>
<p>Object.setPrototypeOd()为现有对象设置原型对象，第一个参数是现有对象，第二个是要设置成为原型对象的对象，用这个方法来设置原型对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Student(name,Class){
    this.name=name;
}
var ob={p:'aklan'};
var stu=new Student('Jappar');
//设置stu的原型对象ob
Object.setPrototypeOf(stu,ob); 
console.log(stu.p);//aklman
console.log(stu.name);//Jappar
console.log(Object.getPrototypeOf(stu));//由大对象提供的getPrototypeOf方法获取对象的原型对象" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Student</span>(<span class="hljs-params">name,Class</span>)</span>{
    <span class="hljs-keyword">this</span>.name=name;
}
<span class="hljs-keyword">var</span> ob={<span class="hljs-attr">p</span>:<span class="hljs-string">'aklan'</span>};
<span class="hljs-keyword">var</span> stu=<span class="hljs-keyword">new</span> Student(<span class="hljs-string">'Jappar'</span>);
<span class="hljs-comment">//设置stu的原型对象ob</span>
<span class="hljs-built_in">Object</span>.setPrototypeOf(stu,ob); 
<span class="hljs-built_in">console</span>.log(stu.p);<span class="hljs-comment">//aklman</span>
<span class="hljs-built_in">console</span>.log(stu.name);<span class="hljs-comment">//Jappar</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Object</span>.getPrototypeOf(stu));<span class="hljs-comment">//由大对象提供的getPrototypeOf方法获取对象的原型对象</span></code></pre>
<p>proto属性：前面用proto来获取原型对象，如果给proto属性赋值，则设置原型对象；最好不用这个，用Object.getPrototypeOf()来读取，用Object.setPrototypeof()来设置。也就是用这两个方法来对原型对象做读写操作。</p>
<h4>1.4.3 获取原型对象方法及比较</h4>
<p>上面写过获取原型对象的方法有三种：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="obj.__proto__
obj.constructor.prototype
Object.getPrototypeOf(obj)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">obj.__proto__
obj.constructor.prototype
<span class="hljs-built_in">Object</span>.getPrototypeOf(obj)</code></pre>
<p>其中前两个方法不是很友好，最新的ES6标准规定，proto属性只有浏览器才需要部署，其他环境可以不部署。而obj.constructor.prototype在手动改变原型对象时，会失效。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Student(name,Class){
    this.name=name;
}
var ob={p:'aklman'};
var stu=new Student('Jappar');
//使用constructor属性获取原型对象
console.log(stu.constructor.prtototype);

//修改stu的原型对象为ob
Object.setPrototypeOf(stu,ob);

//使用getPrototypeOf方法来查看stu的原型对象为ob
console.log(Object.getPrototypeOf(stu));

//使用constructor属性获取原型对象为Object，这是错误的,构造函数无法修改对象的原型对象
console.log(stu.constructor.prototype);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Student</span>(<span class="hljs-params">name,Class</span>)</span>{
    <span class="hljs-keyword">this</span>.name=name;
}
<span class="hljs-keyword">var</span> ob={<span class="hljs-attr">p</span>:<span class="hljs-string">'aklman'</span>};
<span class="hljs-keyword">var</span> stu=<span class="hljs-keyword">new</span> Student(<span class="hljs-string">'Jappar'</span>);
<span class="hljs-comment">//使用constructor属性获取原型对象</span>
<span class="hljs-built_in">console</span>.log(stu.constructor.prtototype);

<span class="hljs-comment">//修改stu的原型对象为ob</span>
<span class="hljs-built_in">Object</span>.setPrototypeOf(stu,ob);

<span class="hljs-comment">//使用getPrototypeOf方法来查看stu的原型对象为ob</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Object</span>.getPrototypeOf(stu));

<span class="hljs-comment">//使用constructor属性获取原型对象为Object，这是错误的,构造函数无法修改对象的原型对象</span>
<span class="hljs-built_in">console</span>.log(stu.constructor.prototype);</code></pre>
<p>总结：最好使用Object.getPrototypeOf()方法获取原型对象，没了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Student(name){
    this.name=name;
}
vat stu=new Student('aklman');
//1.构造函数获取原型对象
console.log(stu.constructor.prototype);
//2.由对象自身获取原型对象
console.log(stu.__proto__);
//3.有大树提供的getPrototypeOf()方法获取对象的原型对象
console.log(Obj.getPrototypeOf(stu));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Student</span>(<span class="hljs-params">name</span>)</span>{
    <span class="hljs-keyword">this</span>.name=name;
}
vat stu=<span class="hljs-keyword">new</span> Student(<span class="hljs-string">'aklman'</span>);
<span class="hljs-comment">//1.构造函数获取原型对象</span>
<span class="hljs-built_in">console</span>.log(stu.constructor.prototype);
<span class="hljs-comment">//2.由对象自身获取原型对象</span>
<span class="hljs-built_in">console</span>.log(stu.__proto__);
<span class="hljs-comment">//3.有大树提供的getPrototypeOf()方法获取对象的原型对象</span>
<span class="hljs-built_in">console</span>.log(Obj.getPrototypeOf(stu));</code></pre>
<h2 id="articleHeader6">第二章 闭包</h2>
<h3 id="articleHeader7">2.1 闭包的概念</h3>
<p>JavaScript有两种作用域：全局作用域和函数作用域（局部作用域）。函数内部可以直接读取全局变量，但是函数外部无法读取函数内部声明的变量。</p>
<p>但是，有时候却需要在函数外部访问函数内部的变量；正常情况下，这是无法的访问的，只有通过变通方法才能实现访问，也就是在函数内部再定义一个函数，通过内部函数来访问函数内部的变量。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fun1(){
    var n=100;
    var fun2=function(){
        console.log(n);
    }
    return funct;
}
var pack=fun1();
pack();//100" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fun1</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> n=<span class="hljs-number">100</span>;
    <span class="hljs-keyword">var</span> fun2=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(n);
    }
    <span class="hljs-keyword">return</span> funct;
}
<span class="hljs-keyword">var</span> pack=fun1();
pack();<span class="hljs-comment">//100</span></code></pre>
<p>说明：函数fun2就在函数fun1()内部，这是fun1（）内部的所有局部变量对fun2（）是可访问的。反过来就不行，内部函数中的局部变量对父类函数是不可访问的。这就是JavaScript中特有的<strong>链式作用域（chain scope）</strong>结构，子对象会一级一级地向上寻找所有父类对象的变量，所以，父对象的所有变量，对子对象都是可见的，反之则不成立。</p>
<p>既然fun2()可以读取fun1()中的局部变量，那么只要把fun2()作为返回值，我们就可以在fun1()外部读取它的内部变量了。</p>
<p>重点：</p>
<blockquote>闭包就是函数fun2，既能狗读取其他函数内部变量的函数。由于JavaScript中，只要函数内部的子函数才能够读取函数内部的局部变量，因此可以把闭包简单理解成“定义一个函数内部的函数”。<p>闭包的最大特点就是它可以“记住”诞生的环境，比如fun2()记住，所以从fun2()可以得到fun1()的内部变量。本质上，闭包就是将函数内部和函数外部连接起来的一座桥梁。</p>
</blockquote>
<h3 id="articleHeader8">2.2 垃圾回收机制及闭包</h3>
<h4>2.2.1 垃圾回收机制</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fun1(){
    var n=100;
    console.log(++n);
}
fun1();//101
fun1();//101" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fun1</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> n=<span class="hljs-number">100</span>;
    <span class="hljs-built_in">console</span>.log(++n);
}
fun1();<span class="hljs-comment">//101</span>
fun1();<span class="hljs-comment">//101</span></code></pre>
<p>说明：在函数内部引入一个变量或者函数时，系统都会开辟一块内存空间；还会将这块内存的引用计数器初始化，初始化值为0；如果外部有全局变量或者程序引用了这块空间，则引用计数器会自动进行+1操作，当函数执行完毕后，变量计数器会重新归零，系统会运行垃圾回收机制，将函数运行产生的数据销毁；如果计数器不是0，则不会清楚数据；这过程就是<strong>JavaScript的垃圾回收机制</strong>；</p>
<p>JavaScript的垃圾回收机制原理图：<br><span class="img-wrap"><img data-src="/img/bV6fHv?w=512&amp;h=278" src="https://static.alili.tech/img/bV6fHv?w=512&amp;h=278" alt="JavaScript垃圾回收机制原理图" title="JavaScript垃圾回收机制原理图" style="cursor: pointer;"></span></p>
<p>用闭包的分析话更能体验此原理：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fun1(){
    var n=100;
    function fun2(){
        console.log(++n);
    }
    return fun2;
}
var fu=fun1();//实际上返回了fun2
fu();//101,相当于调用了fun2(),
fu();//102,相当于在此调用了fun2()
fu();//103
fu();//104" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fun1</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> n=<span class="hljs-number">100</span>;
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fun2</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(++n);
    }
    <span class="hljs-keyword">return</span> fun2;
}
<span class="hljs-keyword">var</span> fu=fun1();<span class="hljs-comment">//实际上返回了fun2</span>
fu();<span class="hljs-comment">//101,相当于调用了fun2(),</span>
fu();<span class="hljs-comment">//102,相当于在此调用了fun2()</span>
fu();<span class="hljs-comment">//103</span>
fu();<span class="hljs-comment">//104</span></code></pre>
<p>代码分析（注释）：</p>
<blockquote>因函数fun1被调用时，返回的结果是fun2函数体，也就是说，fun2函数被当做返回值给fun1的调用者，但是fun2函数并没有在此被调用执行（只是把函数体返回到函数外了）;<p>因此整个fun1函数体，无法判断子函数fun2会对其产生何种影响，无法判断变量n是否会被使用，即使fun1函数被调用结束，整个fun1函数始终保留在内存中，不会被垃圾回收机制回收；</p>
</blockquote>
<p>也就是运行代码发现，函数调用一次（在这里是指fun2），其变量n变化一次；</p>
<p>闭包的最大用处：</p>
<blockquote>可以读取函数内部的变量。<p>让函数内部读取的变量始终保持在内存中，即闭包可以使得它诞生环境一直存在。</p>
</blockquote>
<p>注意的是，外层函数每次运行，都会生成一个新的闭包，而这个闭包有会保留外层函数的内部变量，所以内存消耗很大；因此不能滥用闭包，否则会造成网页的性能问题。</p>
<h2 id="articleHeader9">第三章 call和apply方法</h2>
<p>关于JavaScript中的this的指向：</p>
<blockquote>1.全局作用域下，this指向window对象<p>2.构造函数中，this指向实例化对象</p>
</blockquote>
<p>如果要在调用函数是直接修改函数内部的this指向使用call或者apply方法来修改指向。</p>
<blockquote>1.call方法格式：函数名称.call(obj,arg1,arg2,...argN);说明其中：obj是函数内this要指向的对象，arg列表是参数列表，参数与参数之间使用一个逗号隔开</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ob1={name:'Aklman',age:23};
var ob2={name:'ahmatbek'};
function fun(sex){
    console.log(this.name+this.age+sex);
}
fun.call(ob1,'男');//Aklman23男
fun.call(ob2,'男');//ahmatbekundefined男,因为对象ob2中没有age属性" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> ob1={<span class="hljs-attr">name</span>:<span class="hljs-string">'Aklman'</span>,<span class="hljs-attr">age</span>:<span class="hljs-number">23</span>};
<span class="hljs-keyword">var</span> ob2={<span class="hljs-attr">name</span>:<span class="hljs-string">'ahmatbek'</span>};
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fun</span>(<span class="hljs-params">sex</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name+<span class="hljs-keyword">this</span>.age+sex);
}
fun.call(ob1,<span class="hljs-string">'男'</span>);<span class="hljs-comment">//Aklman23男</span>
fun.call(ob2,<span class="hljs-string">'男'</span>);<span class="hljs-comment">//ahmatbekundefined男,因为对象ob2中没有age属性</span></code></pre>
<blockquote>2.apply方法格式：函数名称.apply(obj,[arg1,,arg2,...argN]);说明其中：obj是函数内this要指向的对象，arg列表是参数列表，要求格式为数组</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ob1={name:'aklman',age:23};
var ob2={name:'ahmatbek',tel:176};
function fun(sex,age,tel){
    console.log(this.name+age+sex+tel);
}
fun.apply(ob1, ['男', 23, 176]);//aklman23男176
fun.apply(ob2, ['男', 20, 133]);//ahmatbek20男133" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> ob1={<span class="hljs-attr">name</span>:<span class="hljs-string">'aklman'</span>,<span class="hljs-attr">age</span>:<span class="hljs-number">23</span>};
<span class="hljs-keyword">var</span> ob2={<span class="hljs-attr">name</span>:<span class="hljs-string">'ahmatbek'</span>,<span class="hljs-attr">tel</span>:<span class="hljs-number">176</span>};
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fun</span>(<span class="hljs-params">sex,age,tel</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name+age+sex+tel);
}
fun.apply(ob1, [<span class="hljs-string">'男'</span>, <span class="hljs-number">23</span>, <span class="hljs-number">176</span>]);<span class="hljs-comment">//aklman23男176</span>
fun.apply(ob2, [<span class="hljs-string">'男'</span>, <span class="hljs-number">20</span>, <span class="hljs-number">133</span>]);<span class="hljs-comment">//ahmatbek20男133</span></code></pre>
<p>两种修改this指向方法的区别：</p>
<blockquote>相同点：功能完全一样，都是为了改变函数内部的hits指向，唯一的不同就在于参数传递方式不同<p>不同点：call方法可能多个参数，第一个要指向的对象，其他参数为函数的实参；apply方法最多只能有两个实参，第一个要指向的对象，第二个是数组，数组内容为函数的实参。</p>
</blockquote>
<h2 id="articleHeader10">第四章 私有属性</h2>
<p>JavaScript与其他语言不太一样，它只有两种属性，即公有属性和私有属性，概念很好理解，也就是在构造函数内部通过this声明的属性就是公有属性，通过var声明的就是私有属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Employee(){
    this.name='aklman';//公有属性
    var age=18;//私有属性
    this.fun=function(){//公有方法
        console.log(this.name+age);//age只能在构造函数内部访问
    }
}
var m=new Employee();
console.log(m.name);//aklman
console.log(m.age);//undefined
m.fun();//aklman18" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Employee</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">this</span>.name=<span class="hljs-string">'aklman'</span>;<span class="hljs-comment">//公有属性</span>
    <span class="hljs-keyword">var</span> age=<span class="hljs-number">18</span>;<span class="hljs-comment">//私有属性</span>
    <span class="hljs-keyword">this</span>.fun=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-comment">//公有方法</span>
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name+age);<span class="hljs-comment">//age只能在构造函数内部访问</span>
    }
}
<span class="hljs-keyword">var</span> m=<span class="hljs-keyword">new</span> Employee();
<span class="hljs-built_in">console</span>.log(m.name);<span class="hljs-comment">//aklman</span>
<span class="hljs-built_in">console</span>.log(m.age);<span class="hljs-comment">//undefined</span>
m.fun();<span class="hljs-comment">//aklman18</span></code></pre>
<h2 id="articleHeader11">第五章 对象继承</h2>
<p>JavaScript中的继承的实现与其他语言也不相同，它没有关键字提供继承的功能。所谓<strong>继承</strong>就是<strong>为了子类中提供父类中的属性和方法，子类能够使用父类中的属性和方法</strong>；</p>
<p>JavaScript中继承的实现方式有：</p>
<blockquote>1.通过原型对象实现继承</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//声明构造函数
function Study(){
    this.fun=function(){
        console.log('我是构造函数中的公有方法');
    }
}
//声明构造函数
function Student(){}
Student.prototype=new Study();//设置构造函数Student的原型为Study,实现继承
var extend=new Study();
extend.fun();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//声明构造函数</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Study</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">this</span>.fun=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'我是构造函数中的公有方法'</span>);
    }
}
<span class="hljs-comment">//声明构造函数</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Student</span>(<span class="hljs-params"></span>)</span>{}
Student.prototype=<span class="hljs-keyword">new</span> Study();<span class="hljs-comment">//设置构造函数Student的原型为Study,实现继承</span>
<span class="hljs-keyword">var</span> extend=<span class="hljs-keyword">new</span> Study();
extend.fun();</code></pre>
<blockquote>2.通过call或apply方法继承（实质就是改变指向使用父类中的属性和方法）</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//声明构造函数
function Study(){
    this.fun=function(){
        console.log('我是构造函数中的公有方法');
    }
}
//声明构造函数
function Student(){
    Study.call(this);//将Study函数内部的this指向Student的实例化对象
}
var extend=new Study();
extend.fun();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//声明构造函数</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Study</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">this</span>.fun=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'我是构造函数中的公有方法'</span>);
    }
}
<span class="hljs-comment">//声明构造函数</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Student</span>(<span class="hljs-params"></span>)</span>{
    Study.call(<span class="hljs-keyword">this</span>);<span class="hljs-comment">//将Study函数内部的this指向Student的实例化对象</span>
}
<span class="hljs-keyword">var</span> extend=<span class="hljs-keyword">new</span> Study();
extend.fun();</code></pre>
<h2 id="articleHeader12">第六章 定时器</h2>
<p>JavaScript提供定时执行代码的功能叫做定时器；</p>
<blockquote>1.setTimeout():用来指定某个函数或某代码，在多少秒之后执行。<p>2.setInterval():指定某个任务每隔一段时间就执行一次，也就是无限次的定时执行。</p>
</blockquote>
<p>setTimeout(),setInterval()的第一个参数都是指定执行的函数名称或者代码段，第二个参数是时间：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fun(){
    var n=1;
    return function(){
        console.log(++n);
    }
}
var s=fun();
//3秒后调用函数；
setTimeout('s()',3000);
//每隔1秒就执行函数名为s的函数
setInterval(s,100);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fun</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> n=<span class="hljs-number">1</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(++n);
    }
}
<span class="hljs-keyword">var</span> s=fun();
<span class="hljs-comment">//3秒后调用函数；</span>
setTimeout(<span class="hljs-string">'s()'</span>,<span class="hljs-number">3000</span>);
<span class="hljs-comment">//每隔1秒就执行函数名为s的函数</span>
setInterval(s,<span class="hljs-number">100</span>);</code></pre>
<p>setTimeout()函数和setInterval()函数都返回一个表示计数器编号的整数值，将该整数传入clearTimeout()和clearInterval()函数，就可以取消对应的定时器。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input type=&quot;button&quot; value=&quot;停止&quot;>
<script>
function fun(){
    var n=1;
    return function(){
        console.log(++n);
    }
}
var s=fun();
//3秒后调用函数；
var i=setTimeout('s()',3000);
//每隔1秒就执行函数名为s的函数
var j=setInterval(s,100);
document.querySelector('input').onclick=function(){
    //停止定时器
    clearInterval(j);
    clearTimeout(i);
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">&lt;input type=<span class="hljs-string">"button"</span> value=<span class="hljs-string">"停止"</span>&gt;
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fun</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> n=<span class="hljs-number">1</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(++n);
    }
}
<span class="hljs-keyword">var</span> s=fun();
<span class="hljs-comment">//3秒后调用函数；</span>
<span class="hljs-keyword">var</span> i=setTimeout(<span class="hljs-string">'s()'</span>,<span class="hljs-number">3000</span>);
<span class="hljs-comment">//每隔1秒就执行函数名为s的函数</span>
<span class="hljs-keyword">var</span> j=setInterval(s,<span class="hljs-number">100</span>);
<span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'input'</span>).onclick=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-comment">//停止定时器</span>
    clearInterval(j);
    clearTimeout(i);
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<h2 id="articleHeader13">补充知识点</h2>
<p>上面提过内存，计数器，那么就谷歌一下什么是内存及计数器。</p>
<p>通常说的内存是计算机的主存储器(main memory),简称主存。主存通过控制芯片等与CPU相连，主要负责存储指令和数据。主存由可读写的元素构成，每个字节(1字节=8位)都带有一个地址编号（也就是所谓的内存地址）。CPU可以通过改地址读取主存中的指令和数据，当然也可以写入数据。注意的是，主存中存储的指令和数据会随着计算机的关机自动清除（自动销毁，释放）。</p>
<p>寄存器是CPU的组件之一，，CPU由控制器，运算器，时钟，寄存器组成。控制器做的是数据运算以外的处理（主要是输入和输出的时机控制），比如内存和磁盘等媒介的输入输出，显示器，打印机的输出等，都是控制器做的事。</p>
<p>废话不多说，听大师们说CPU中程序员只要搞明白寄存器就可以飞上天了。原因是程序是把寄存器作为对象来描述，也就是计算机中每一句命令都是通过寄存器才能执行（数据存储，假发运算等），寄存器也有很多种类，根据类型存储的数据也不一样，不同的CPU中的寄存器数量也不一样以及寄存器存储的数值范围也不一样。</p>
<p>寄存器由程序计数器，标志寄存器，累加寄存器，基址寄存器，变址寄存器，通用寄存器等组成，其中程序计数器和标志寄存器比较特殊。计数器以二进制形式技术，计数规则是：<strong>CPU每执行一个命令，计数器的值就会自动加1,</strong>例如，CPU执行0100地址的指令后，计数器的值就变成了0101（当执行的指令占据多个内存地址是，增加与指令长度相应的数值）。<strong>然后CPU的控制器就会参照计数器的数值，从内存中读取命令并执行，也就是说，程序计数器决定着程序的运行流程。</strong></p>
<h1 id="articleHeader14">参考资料</h1>
<p><a href="http://www.w3school.com.cn/b.asp" rel="nofollow noreferrer" target="_blank">W3school</a><br><a href="http://www.runoob.com/js/js-tutorial.html" rel="nofollow noreferrer" target="_blank">菜鸟教程</a><br><a href="http://item.jd.com/10974436.html" rel="nofollow noreferrer" target="_blank">JavaScript权威指南（第6版）</a><br><a href="https://item.jd.com/11758229.html" rel="nofollow noreferrer" target="_blank">计算机科学导论（第三版）</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript难点笔记

## 原文链接
[https://segmentfault.com/a/1190000013844401](https://segmentfault.com/a/1190000013844401)

