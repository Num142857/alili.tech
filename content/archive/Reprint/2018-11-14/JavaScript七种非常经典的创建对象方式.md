---
title: JavaScript七种非常经典的创建对象方式
hidden: true
categories: [reprint]
slug: 628e286f
date: 2018-11-14 02:30:09
---

{{< raw >}}
<p>JavaScript&#x521B;&#x5EFA;&#x5BF9;&#x8C61;&#x7684;&#x65B9;&#x5F0F;&#x6709;&#x5F88;&#x591A;&#xFF0C;&#x901A;&#x8FC7;Object&#x6784;&#x9020;&#x51FD;&#x6570;&#x6216;&#x5BF9;&#x8C61;&#x5B57;&#x9762;&#x91CF;&#x7684;&#x65B9;&#x5F0F;&#x4E5F;&#x53EF;&#x4EE5;&#x521B;&#x5EFA;&#x5355;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x663E;&#x7136;&#x8FD9;&#x4E24;&#x79CD;&#x65B9;&#x5F0F;&#x4F1A;&#x4EA7;&#x751F;&#x5927;&#x91CF;&#x7684;&#x91CD;&#x590D;&#x4EE3;&#x7801;&#xFF0C;&#x5E76;&#x4E0D;&#x9002;&#x5408;&#x91CF;&#x4EA7;&#x3002;&#x63A5;&#x4E0B;&#x6765;&#x4ECB;&#x7ECD;&#x4E03;&#x79CD;&#x975E;&#x5E38;&#x7ECF;&#x5178;&#x7684;&#x521B;&#x5EFA;&#x5BF9;&#x8C61;&#x7684;&#x65B9;&#x5F0F;&#xFF0C;&#x4ED6;&#x4EEC;&#x4E5F;&#x5404;&#x6709;&#x4F18;&#x7F3A;&#x70B9;&#x3002;&#xFF08;&#x5185;&#x5BB9;&#x4E3B;&#x8981;&#x6765;&#x81EA;&#x4E8E;&#x300A;JavaScript&#x9AD8;&#x7EA7;&#x7A0B;&#x5E8F;&#x8BBE;&#x8BA1;&#x300B;&#xFF0C;&#x8FD8;&#x53C2;&#x8003;&#x4E86;&#x4E00;&#x4E0B;&#x522B;&#x4EBA;&#x5199;&#x7684;&#x6587;&#x7AE0;&#xFF09;</p><h2>&#x4E00;&#x3001;&#x5DE5;&#x5382;&#x6A21;&#x5F0F;</h2><pre><code>function createPerson(name, job) { 
 var o = new Object();
 o.name = name;
 o.job = job;
 o.sayName = function() { 
  console.log(this.name); 
 } 
 return o 
} 
var person1 = createPerson(&apos;Mike&apos;, &apos;student&apos;) 
var person2 = createPerson(&apos;X&apos;, &apos;engineer&apos;) </code></pre><p>&#x53EF;&#x4EE5;&#x65E0;&#x6570;&#x6B21;&#x8C03;&#x7528;&#x8FD9;&#x4E2A;&#x5DE5;&#x5382;&#x51FD;&#x6570;&#xFF0C;&#x6BCF;&#x6B21;&#x90FD;&#x4F1A;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x5305;&#x542B;&#x4E24;&#x4E2A;&#x5C5E;&#x6027;&#x548C;&#x4E00;&#x4E2A;&#x65B9;&#x6CD5;&#x7684;&#x5BF9;&#x8C61;&#x3002;<br>&#x5DE5;&#x5382;&#x6A21;&#x5F0F;&#x867D;&#x7136;&#x89E3;&#x51B3;&#x4E86;&#x521B;&#x5EFA;&#x591A;&#x4E2A;&#x76F8;&#x4F3C;&#x5BF9;&#x8C61;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x4F46;&#x662F;&#x6CA1;&#x6709;&#x89E3;&#x51B3;&#x5BF9;&#x8C61;&#x8BC6;&#x522B;&#x95EE;&#x9898;&#xFF0C;&#x5373;&#x4E0D;&#x80FD;&#x77E5;&#x9053;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x7684;&#x7C7B;&#x578B;&#x3002;</p><h2>&#x4E8C;&#x3001;&#x6784;&#x9020;&#x51FD;&#x6570;&#x6A21;&#x5F0F;</h2><pre><code>function Person(name, job) { 
 this.name = name;
 this.job = job;
 this.sayName = function() { 
  console.log(this.name);
 } 
} 
var person1 = new Person(&apos;Mike&apos;, &apos;student&apos;) 
var person2 = new Person(&apos;X&apos;, &apos;engineer&apos;) 
</code></pre><p>&#x6CA1;&#x6709;&#x663E;&#x793A;&#x7684;&#x521B;&#x5EFA;&#x5BF9;&#x8C61;&#xFF0C;&#x4F7F;&#x7528;new&#x6765;&#x8C03;&#x7528;&#x8FD9;&#x4E2A;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF0C;&#x4F7F;&#x7528;new&#x540E;&#x4F1A;&#x81EA;&#x52A8;&#x6267;&#x884C;&#x5982;&#x4E0B;&#x64CD;&#x4F5C;&#xFF1A;<br>&#x2460;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x65B0;&#x5BF9;&#x8C61;&#xFF1B;<br>&#x2461;&#x5C06;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x4F5C;&#x7528;&#x57DF;&#x8D4B;&#x7ED9;&#x65B0;&#x5BF9;&#x8C61;&#xFF08;&#x56E0;&#x6B64;this&#x5C31;&#x6307;&#x5411;&#x4E86;&#x8FD9;&#x4E2A;&#x65B0;&#x5BF9;&#x8C61;&#xFF09;&#xFF1B;<br>&#x2462;&#x6267;&#x884C;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#xFF08;&#x4E3A;&#x8FD9;&#x4E2A;&#x65B0;&#x5BF9;&#x8C61;&#x6DFB;&#x52A0;&#x5C5E;&#x6027;&#xFF09;&#xFF1B;<br>&#x2463;&#x8FD4;&#x56DE;&#x65B0;&#x5BF9;&#x8C61;&#x3002;<br>&#x7F3A;&#x70B9;&#xFF1A;&#x6BCF;&#x4E2A;&#x65B9;&#x6CD5;&#x90FD;&#x8981;&#x5728;&#x6BCF;&#x4E2A;&#x5B9E;&#x4F8B;&#x4E0A;&#x91CD;&#x65B0;&#x521B;&#x5EFA;&#x4E00;&#x904D;&#x3002;<br>&#x521B;&#x5EFA;&#x4E24;&#x4E2A;&#x5B8C;&#x6210;&#x540C;&#x6837;&#x4EFB;&#x52A1;&#x7684;&#x7684;Function&#x5B9E;&#x4F8B;&#x7684;&#x786E;&#x6CA1;&#x6709;&#x5FC5;&#x8981;&#x3002;&#x51B5;&#x4E14;&#x6709;this&#x5BF9;&#x8C61;&#x5728;&#xFF0C;&#x6839;&#x672C;&#x4E0D;&#x7528;&#x5728;&#x6267;&#x884C;&#x4EE3;&#x7801;&#x524D;&#x5C31;&#x628A;&#x51FD;&#x6570;&#x7ED1;&#x5B9A;&#x5230;&#x7279;&#x5B9A;&#x7684;&#x5BF9;&#x8C61;&#x4E0A;&#xFF0C;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x8FD9;&#x6837;&#x7684;&#x5F62;&#x5F0F;&#x5B9A;&#x4E49;&#xFF1A;</p><pre><code>function Person( name, age, job ){
    this.name = name;
    this.age = age;
    this.job = job;

    this.sayName = sayName;
}

function sayName(){
    alert( this.name );
}</code></pre><p>&#x5982;&#x6B64;&#x4E00;&#x6765;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x5C06;sayName()&#x51FD;&#x6570;&#x7684;&#x5B9A;&#x4E49;&#x8F6C;&#x79FB;&#x5230;&#x6784;&#x9020;&#x51FD;&#x6570;&#x5916;&#x90E8;&#x3002;&#x800C;&#x5728;&#x6784;&#x9020;&#x51FD;&#x6570;&#x5185;&#x90E8;&#xFF0C;&#x6211;&#x4EEC;&#x5C06;sayName&#x5C5E;&#x6027;&#x8BBE;&#x7F6E;&#x6210;&#x5168;&#x5C40;&#x7684;sayName&#x51FD;&#x6570;&#x3002;&#x8FD9;&#x6837;&#x7684;&#x8BDD;&#xFF0C;&#x7531;&#x4E8E;sayName&#x5305;&#x542B;&#x7684;&#x662F;&#x4E00;&#x4E2A;&#x6307;&#x5411;&#x51FD;&#x6570;&#x7684;&#x6307;&#x9488;&#xFF0C;&#x56E0;&#x6B64;person1&#x548C;person2&#x5BF9;&#x8C61;&#x5C31;&#x53EF;&#x4EE5;&#x5171;&#x4EAB;&#x5728;&#x5168;&#x5C40;&#x4F5C;&#x7528;&#x57DF;&#x4E2D;&#x5B9A;&#x4E49;&#x7684;&#x540C;&#x4E00;&#x4E2A;sayName()&#x51FD;&#x6570;&#x3002;</p><p>&#x8FD9;&#x6837;&#x505A;&#x89E3;&#x51B3;&#x4E86;&#x4E24;&#x4E2A;&#x51FD;&#x6570;&#x505A;&#x540C;&#x4E00;&#x4EF6;&#x4E8B;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x4F46;&#x662F;&#x65B0;&#x7684;&#x95EE;&#x9898;&#x53C8;&#x6765;&#x4E86;&#xFF1A;&#x5728;&#x5168;&#x5C40;&#x4F5C;&#x7528;&#x57DF;&#x4E2D;&#x5B9A;&#x4E49;&#x7684;&#x51FD;&#x6570;&#x5B9E;&#x9645;&#x4E0A;&#x53EA;&#x80FD;&#x88AB;&#x67D0;&#x4E2A;&#x5BF9;&#x8C61;&#x8C03;&#x7528;&#xFF0C;&#x8FD9;&#x8BA9;&#x5168;&#x5C40;&#x4F5C;&#x7528;&#x57DF;&#x6709;&#x70B9;&#x540D;&#x4E0D;&#x526F;&#x5B9E;&#x3002;&#x800C;&#x66F4;&#x91CD;&#x8981;&#x7684;&#x662F;&#xFF1A;&#x5982;&#x679C;&#x5BF9;&#x8C61;&#x9700;&#x8981;&#x5B9A;&#x4E49;&#x5F88;&#x591A;&#x65B9;&#x6CD5;&#xFF0C;&#x90A3;&#x4E48;&#x5C31;&#x9700;&#x8981;&#x5B9A;&#x4E49;&#x5F88;&#x591A;&#x4E2A;&#x5168;&#x5C40;&#x51FD;&#x6570;&#xFF0C;&#x8FD9;&#x6837;&#x4E00;&#x6765;&#xFF0C;&#x6211;&#x4EEC;&#x81EA;&#x5B9A;&#x4E49;&#x7684;&#x8FD9;&#x4E2A;&#x5F15;&#x7528;&#x7C7B;&#x578B;&#x5C31;&#x6BEB;&#x65E0;&#x5C01;&#x88C5;&#x6027;&#x53EF;&#x8A00;&#x4E86;&#x3002;</p><p>&#x8FD9;&#x4E9B;&#x95EE;&#x9898;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x4F7F;&#x7528;&#x539F;&#x578B;&#x6A21;&#x5F0F;&#x6765;&#x89E3;&#x51B3;&#x3002;</p><h2>&#x4E09;&#x3001;&#x539F;&#x578B;&#x6A21;&#x5F0F;</h2><pre><code>function Person() { 
} 
Person.prototype.name = &apos;Mike&apos; 
Person.prototype.job = &apos;student&apos; 
Person.prototype.sayName = function() { 
 console.log(this.name) 
} 
var person1 = new Person() 
</code></pre><p>&#x5C06;&#x4FE1;&#x606F;&#x76F4;&#x63A5;&#x6DFB;&#x52A0;&#x5230;&#x539F;&#x578B;&#x5BF9;&#x8C61;&#x4E0A;&#x3002;&#x4F7F;&#x7528;&#x539F;&#x578B;&#x7684;&#x597D;&#x5904;&#x662F;&#x53EF;&#x4EE5;&#x8BA9;&#x6240;&#x6709;&#x7684;&#x5B9E;&#x4F8B;&#x5BF9;&#x8C61;&#x5171;&#x4EAB;&#x5B83;&#x6240;&#x5305;&#x542B;&#x7684;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;&#xFF0C;&#x4E0D;&#x5FC5;&#x5728;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4E2D;&#x5B9A;&#x4E49;&#x5BF9;&#x8C61;&#x5B9E;&#x4F8B;&#x4FE1;&#x606F;&#xFF0C;&#x800C;&#x662F;&#x53EF;&#x4EE5;&#x5C06;&#x8FD9;&#x4E9B;&#x4FE1;&#x606F;&#x76F4;&#x63A5;&#x6DFB;&#x52A0;&#x5230;&#x539F;&#x578B;&#x5BF9;&#x8C61;&#x4E2D;&#x3002;<br>&#x2460;&#x7406;&#x89E3;&#x539F;&#x578B;<br>&#x65E0;&#x8BBA;&#x4EC0;&#x4E48;&#x65F6;&#x5019;,&#x53EA;&#x8981;&#x521B;&#x5EFA;&#x4E86;&#x4E00;&#x4E2A;&#x65B0;&#x51FD;&#x6570;,&#x5C31;&#x4F1A;&#x6839;&#x636E;&#x4E00;&#x7EC4;&#x7279;&#x5B9A;&#x7684;&#x89C4;&#x5219;&#x4E3A;&#x8BE5;&#x51FD;&#x6570;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;prototype&#x5C5E;&#x6027;&#x3002;<br>&#x5728;&#x9ED8;&#x8BA4;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x6240;&#x6709;<strong>prototype</strong>&#x5C5E;&#x6027;&#x90FD;&#x4F1A;&#x81EA;&#x52A8;&#x83B7;&#x5F97;&#x4E00;&#x4E2A;<strong>constructor</strong>&#xFF08;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF09;&#x5C5E;&#x6027;&#xFF0C;&#x8FD9;&#x4E2A;&#x5C5E;&#x6027;&#x5305;&#x542B;&#x4E00;&#x4E2A;&#x6307;&#x5411;<strong>prototype</strong>&#x5C5E;&#x6027;&#x6240;&#x5728;&#x51FD;&#x6570;&#x7684;&#x6307;&#x9488;&#x3002;<br>&#x6BCF;&#x5F53;&#x4EE3;&#x7801;&#x8BFB;&#x53D6;&#x67D0;&#x4E2A;&#x5BF9;&#x8C61;&#x7684;&#x67D0;&#x4E2A;&#x5C5E;&#x6027;&#x65F6;,&#x90FD;&#x4F1A;&#x6267;&#x884C;&#x4E00;&#x641C;&#x7D22;&#xFF0C;&#x76EE;&#x6807;&#x662F;&#x5177;&#x6709;&#x7ED9;&#x5B9A;&#x540D;&#x5B57;&#x7684;&#x5C5E;&#x6027;&#x3002;&#x641C;&#x7D22;&#x9996;&#x5148;&#x4ECE;&#x5BF9;&#x8C61;&#x5B9E;&#x4F8B;&#x672C;&#x8EAB;&#x5F00;&#x59CB;&#x3002;&#x5982;&#x679C;&#x5728;&#x5B9E;&#x4F8B;&#x4E2D;&#x627E;&#x5230;&#x4E86;&#x5177;&#x6709;&#x7ED9;&#x5B9A;&#x540D;&#x5B57;&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x5219;&#x8FD4;&#x56DE;&#x8BE5;&#x5C5E;&#x6027;&#x7684;&#x503C;&#xFF1B;&#x5982;&#x679C;&#x6CA1;&#x6709;&#x627E;&#x5230;&#xFF0C;&#x5219;&#x7EE7;&#x7EED;&#x641C;&#x7D22;&#x6307;&#x9488;&#x6307;&#x5411;&#x7684;&#x539F;&#x578B;&#x5BF9;&#x8C61;&#xFF0C;&#x5728;&#x539F;&#x578B;&#x5BF9;&#x8C61;&#x4E2D;&#x67E5;&#x627E;&#x5177;&#x6709;&#x7ED9;&#x5B9A;&#x540D;&#x5B57;&#x7684;&#x5C5E;&#x6027;&#x3002;&#x5982;&#x679C;&#x5728;&#x539F;&#x578B;&#x5BF9;&#x8C61;&#x4E2D;&#x627E;&#x5230;&#x4E86;&#x8FD9;&#x4E2A;&#x5C5E;&#x6027;&#xFF0C;&#x5219;&#x8FD4;&#x56DE;&#x8BE5;&#x5C5E;&#x6027;&#x7684;&#x503C;&#x3002;<br>&#x867D;&#x7136;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x5BF9;&#x8C61;&#x5B9E;&#x4F8B;&#x8BBF;&#x95EE;&#x4FDD;&#x5B58;&#x5728;&#x539F;&#x578B;&#x4E2D;&#x7684;&#x503C;&#xFF0C;&#x4F46;&#x5374;&#x4E0D;&#x80FD;&#x901A;&#x8FC7;&#x5BF9;&#x8C61;&#x5B9E;&#x4F8B;&#x91CD;&#x5199;&#x539F;&#x578B;&#x4E2D;&#x7684;&#x503C;&#x3002;<br>&#x5982;&#x679C;&#x6211;&#x4EEC;&#x5728;&#x5B9E;&#x4F8B;&#x4E2D;&#x6DFB;&#x52A0;&#x4E86;&#x4E00;&#x4E2A;&#x5C5E;&#x6027;&#xFF0C;&#x800C;&#x8BE5;&#x5C5E;&#x6027;&#x4E0E;&#x5B9E;&#x4F8B;&#x4E2D;&#x7684;&#x4E00;&#x4E2A;&#x5C5E;&#x6027;&#x540C;&#x540D;&#xFF0C;&#x90A3;&#x4E48;&#x5C31;&#x4F1A;&#x5728;&#x5B9E;&#x4F8B;&#x4E2D;&#x521B;&#x5EFA;&#x8BE5;&#x5C5E;&#x6027;&#xFF0C;&#x8BE5;&#x5C5E;&#x6027;&#x5C06;&#x4F1A;&#x5C4F;&#x853D;&#x539F;&#x578B;&#x4E2D;&#x7684;&#x90A3;&#x4E2A;&#x5C5E;&#x6027;&#x3002;<br>&#x5373;&#x4F7F;&#x662F;&#x5C06;&#x5C5E;&#x6027;&#x8BBE;&#x7F6E;&#x4E3A;null&#xFF0C;&#x4E5F;&#x53EA;&#x662F;&#x5728;&#x5B9E;&#x4F8B;&#x4E2D;&#x7684;&#x5C5E;&#x6027;&#x503C;&#x4E3A;null&#x3002;<br>&#x4E0D;&#x8FC7;&#xFF0C;&#x4F7F;&#x7528;delete&#x64CD;&#x4F5C;&#x7B26;&#x53EF;&#x4EE5;&#x5B8C;&#x5168;&#x5220;&#x9664;&#x5B9E;&#x4F8B;&#x5C5E;&#x6027;&#xFF0C;&#x4ECE;&#x800C;&#x80FD;&#x591F;&#x91CD;&#x65B0;&#x8BBF;&#x95EE;&#x539F;&#x578B;&#x4E2D;&#x7684;&#x5C5E;&#x6027;&#x3002;<br>&#x4F7F;&#x7528;<em>hasOwnProperty()</em> &#x65B9;&#x6CD5;&#x53EF;&#x4EE5;&#x68C0;&#x6D4B;&#x4E00;&#x4E2A;&#x5C5E;&#x6027;&#x662F;&#x5B58;&#x5728;&#x4E8E;&#x5B9E;&#x4F8B;&#x4E2D;&#xFF0C;&#x8FD8;&#x662F;&#x5B58;&#x5728;&#x4E0E;&#x539F;&#x578B;&#x4E2D;&#x3002;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x53EA;&#x5728;&#x7ED9;&#x5B9A;&#x5C5E;&#x6027;&#x5B58;&#x5728;&#x4E8E;&#x5BF9;&#x8C61;&#x5B9E;&#x4F8B;&#x4E2D;&#x65F6;&#xFF0C;&#x624D;&#x4F1A;&#x8FD4;&#x56DE;true&#x3002;</p><p>&#x2461;&#x539F;&#x578B;&#x4E0E;in&#x64CD;&#x4F5C;&#x7B26;<br>in&#x64CD;&#x4F5C;&#x7B26;&#x4F1A;&#x5728;&#x901A;&#x8FC7;&#x5BF9;&#x8C61;&#x80FD;&#x591F;&#x8BBF;&#x95EE;&#x7ED9;&#x5B9A;&#x5C5E;&#x6027;&#x65F6;&#x8FD4;&#x56DE;true&#xFF0C;&#x65E0;&#x8BBA;&#x8BE5;&#x5C5E;&#x6027;&#x662F;&#x5B58;&#x5728;&#x4E8E;&#x5B9E;&#x4F8B;&#x4E2D;&#x8FD8;&#x662F;&#x539F;&#x578B;&#x4E2D;&#x3002;</p><p>&#x2462;&#x66F4;&#x7B80;&#x5355;&#x7684;&#x539F;&#x578B;&#x8BED;&#x6CD5;</p><pre><code>function Person(){    
}
Person.prototype = {
    name : &quot;Mike&quot;,
    age : 29,
    job : &quot;engineer&quot;,    
    syaName : function(){
        alert( this.name );
    }
};</code></pre><p>//&#x5728;&#x4E0A;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x4E2D;&#xFF0C;&#x5C06;Person.prototype&#x8BBE;&#x7F6E;&#x4E3A;&#x7B49;&#x4E8E;&#x4E00;&#x4E2A;&#x4EE5;&#x5BF9;&#x8C61;&#x5B57;&#x9762;&#x91CF;&#x5F62;&#x5F0F;&#x521B;&#x5EFA;&#x7684;&#x65B0;&#x5BF9;&#x8C61;&#x3002;&#x6700;&#x7EC8;&#x7ED3;&#x679C;&#x76F8;&#x540C;&#xFF0C;&#x4F46;&#x6709;&#x4E00;&#x4E2A;&#x4F8B;&#x5916;&#xFF1A;constructor&#x5C5E;&#x6027;&#x4E0D;&#x518D;&#x6307;&#x5411;Person&#x3002;</p><h2>&#x56DB;&#x3001;&#x7EC4;&#x5408;&#x4F7F;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;&#x6A21;&#x5F0F;&#x548C;&#x539F;&#x578B;&#x6A21;&#x5F0F;</h2><p>&#x7EC4;&#x5408;&#x4F7F;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;&#x6A21;&#x5F0F;&#x548C;&#x539F;&#x578B;&#x6A21;&#x5F0F;&#x662F;&#x4F7F;&#x7528;&#x6700;&#x4E3A;&#x5E7F;&#x6CDB;&#x3001;&#x8BA4;&#x540C;&#x5EA6;&#x6700;&#x9AD8;&#x7684;&#x4E00;&#x79CD;&#x521B;&#x5EFA;&#x81EA;&#x5B9A;&#x4E49;&#x7C7B;&#x578B;&#x7684;&#x65B9;&#x6CD5;&#x3002;&#x5B83;&#x53EF;&#x4EE5;&#x89E3;&#x51B3;&#x4E0A;&#x9762;&#x90A3;&#x4E9B;&#x6A21;&#x5F0F;&#x7684;&#x7F3A;&#x70B9;&#xFF0C;&#x4F7F;&#x7528;&#x6B64;&#x6A21;&#x5F0F;&#x53EF;&#x4EE5;&#x8BA9;&#x6BCF;&#x4E2A;&#x5B9E;&#x4F8B;&#x90FD;&#x4F1A;&#x6709;&#x81EA;&#x5DF1;&#x7684;&#x4E00;&#x4EFD;&#x5B9E;&#x4F8B;&#x5C5E;&#x6027;&#x526F;&#x672C;&#xFF0C;&#x4F46;&#x540C;&#x65F6;&#x53C8;&#x5171;&#x4EAB;&#x7740;&#x5BF9;&#x65B9;&#x6CD5;&#x7684;&#x5F15;&#x7528;&#xFF0C;&#x8FD9;&#x6837;&#x7684;&#x8BDD;&#xFF0C;&#x5373;&#x4F7F;&#x5B9E;&#x4F8B;&#x5C5E;&#x6027;&#x4FEE;&#x6539;&#x5F15;&#x7528;&#x7C7B;&#x578B;&#x7684;&#x503C;&#xFF0C;&#x4E5F;&#x4E0D;&#x4F1A;&#x5F71;&#x54CD;&#x5176;&#x4ED6;&#x5B9E;&#x4F8B;&#x7684;&#x5C5E;&#x6027;&#x503C;&#x4E86;&#x3002;&#x8FD8;&#x652F;&#x6301;&#x5411;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4F20;&#x9012;&#x53C2;&#x6570;&#xFF0C;&#x53EF;&#x8C13;&#x662F;&#x96C6;&#x4E24;&#x79CD;&#x6A21;&#x5F0F;&#x7684;&#x4F18;&#x70B9;&#x3002;</p><pre><code>function Person(name) { 
 this.name = name; 
 this.friends = [&apos;Jack&apos;, &apos;Merry&apos;]; 
} 
Person.prototype.sayName = function() { 
 console.log(this.name); 
} 
var person1 = new Person(); 
var person2 = new Person(); 
person1.friends.push(&apos;Van&apos;); 
console.log(person1.friends) //[&quot;Jack&quot;, &quot;Merry&quot;, &quot;Van&quot;] 
console.log(person2.friends) // [&quot;Jack&quot;, &quot;Merry&quot;] 
console.log(person1.friends === person2.friends) //false 
</code></pre><h2>&#x4E94;&#x3001;&#x52A8;&#x6001;&#x539F;&#x578B;&#x6A21;&#x5F0F;</h2><p>&#x52A8;&#x6001;&#x539F;&#x578B;&#x6A21;&#x5F0F;&#x5C06;&#x6240;&#x6709;&#x4FE1;&#x606F;&#x90FD;&#x5C01;&#x88C5;&#x5728;&#x4E86;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4E2D;&#xFF0C;&#x521D;&#x59CB;&#x5316;&#x7684;&#x65F6;&#x5019;&#x3002;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x68C0;&#x6D4B;&#x67D0;&#x4E2A;&#x5E94;&#x8BE5;&#x5B58;&#x5728;&#x7684;&#x65B9;&#x6CD5;&#x662F;&#x5426;&#x6709;&#x6548;&#xFF0C;&#x6765;&#x51B3;&#x5B9A;&#x662F;&#x5426;&#x9700;&#x8981;&#x521D;&#x59CB;&#x5316;&#x539F;&#x578B;&#x3002;</p><pre><code>function Person(name, job) { 
  // &#x5C5E;&#x6027; 
 this.name = name;
 this.job = job;
 // &#x65B9;&#x6CD5; 
 if(typeof this.sayName !== &apos;function&apos;) { 
  Person.prototype.sayName = function() { 
    console.log(this.name) 
  } 
 } 
} 
var person1 = new Person(&apos;Mike&apos;, &apos;Student&apos;) 
person1.sayName() 
</code></pre><p>&#x53EA;&#x6709;&#x5728;sayName&#x65B9;&#x6CD5;&#x4E0D;&#x5B58;&#x5728;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x624D;&#x4F1A;&#x5C06;&#x5B83;&#x6DFB;&#x52A0;&#x5230;&#x539F;&#x578B;&#x4E2D;&#x3002;&#x8FD9;&#x6BB5;&#x4EE3;&#x7801;&#x53EA;&#x4F1A;&#x521D;&#x6B21;&#x8C03;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x65F6;&#x5019;&#x624D;&#x4F1A;&#x6267;&#x884C;&#x3002;&#x6B64;&#x540E;&#x539F;&#x578B;&#x5DF2;&#x7ECF;&#x5B8C;&#x6210;&#x521D;&#x59CB;&#x5316;&#xFF0C;&#x4E0D;&#x9700;&#x8981;&#x5728;&#x505A;&#x4EC0;&#x4E48;&#x4FEE;&#x6539;&#x4E86;,&#x8FD9;&#x91CC;&#x5BF9;&#x539F;&#x578B;&#x6240;&#x505A;&#x7684;&#x4FEE;&#x6539;&#xFF0C;&#x80FD;&#x591F;&#x7ACB;&#x5373;&#x5728;&#x6240;&#x6709;&#x5B9E;&#x4F8B;&#x4E2D;&#x5F97;&#x5230;&#x53CD;&#x6620;&#x3002;<br>&#x5176;&#x6B21;&#xFF0C;if&#x8BED;&#x53E5;&#x68C0;&#x67E5;&#x7684;&#x53EF;&#x4EE5;&#x662F;&#x521D;&#x59CB;&#x5316;&#x4E4B;&#x540E;&#x5E94;&#x8BE5;&#x5B58;&#x5728;&#x7684;&#x4EFB;&#x4F55;&#x5C5E;&#x6027;&#x6216;&#x65B9;&#x6CD5;&#xFF0C;&#x6240;&#x4EE5;&#x4E0D;&#x5FC5;&#x7528;&#x4E00;&#x5927;&#x5806;&#x7684;if&#x8BED;&#x53E5;&#x68C0;&#x67E5;&#x6BCF;&#x4E00;&#x4E2A;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;&#xFF0C;&#x53EA;&#x8981;&#x68C0;&#x67E5;&#x4E00;&#x4E2A;&#x5C31;&#x884C;&#x3002;</p><h2>&#x516D;&#x3001;&#x5BC4;&#x751F;&#x6784;&#x9020;&#x51FD;&#x6570;&#x6A21;&#x5F0F;</h2><p>&#x8FD9;&#x79CD;&#x6A21;&#x5F0F;&#x7684;&#x57FA;&#x672C;&#x601D;&#x60F3;&#x5C31;&#x662F;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x8BE5;&#x51FD;&#x6570;&#x7684;&#x4F5C;&#x7528;&#x4EC5;&#x4EC5;&#x662F;&#x5C01;&#x88C5;&#x521B;&#x5EFA;&#x5BF9;&#x8C61;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x7136;&#x540E;&#x518D;&#x8FD4;&#x56DE;&#x65B0;&#x5EFA;&#x7684;&#x5BF9;&#x8C61;</p><pre><code>function Person(name, job) { 
  var o = new Object();
 o.name = name;
 o.job = job;
 o.sayName = function() { 
  console.log(this.name) 
 } 
 return o 
} 
var person1 = new Person(&apos;Mike&apos;, &apos;student&apos;) 
person1.sayName() 
</code></pre><p>&#x8FD9;&#x4E2A;&#x6A21;&#x5F0F;&#xFF0C;&#x9664;&#x4E86;&#x4F7F;&#x7528;new&#x64CD;&#x4F5C;&#x7B26;&#x5E76;&#x628A;&#x4F7F;&#x7528;&#x7684;&#x5305;&#x88C5;&#x51FD;&#x6570;&#x53EB;&#x505A;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4E4B;&#x5916;&#xFF0C;&#x548C;&#x5DE5;&#x5382;&#x6A21;&#x5F0F;&#x51E0;&#x4E4E;&#x4E00;&#x6837;&#x3002;<br>&#x6784;&#x9020;&#x51FD;&#x6570;&#x5982;&#x679C;&#x4E0D;&#x8FD4;&#x56DE;&#x5BF9;&#x8C61;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E5F;&#x4F1A;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x5BF9;&#x8C61;&#xFF0C;&#x901A;&#x8FC7;&#x5728;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x672B;&#x5C3E;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;return&#x8BED;&#x53E5;&#xFF0C;&#x53EF;&#x4EE5;&#x91CD;&#x5199;&#x8C03;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;&#x65F6;&#x8FD4;&#x56DE;&#x7684;&#x503C;&#x3002;</p><h2>&#x4E03;&#x3001;&#x7A33;&#x59A5;&#x6784;&#x9020;&#x51FD;&#x6570;&#x6A21;&#x5F0F;</h2><p>&#x9996;&#x5148;&#x660E;&#x767D;&#x7A33;&#x59A5;&#x5BF9;&#x8C61;&#x6307;&#x7684;&#x662F;&#x6CA1;&#x6709;&#x516C;&#x5171;&#x5C5E;&#x6027;&#xFF0C;&#x800C;&#x4E14;&#x5176;&#x65B9;&#x6CD5;&#x4E5F;&#x4E0D;&#x5F15;&#x7528;this&#x3002;&#x7A33;&#x59A5;&#x5BF9;&#x8C61;&#x6700;&#x9002;&#x5408;&#x5728;&#x4E00;&#x4E9B;&#x5B89;&#x5168;&#x73AF;&#x5883;&#x4E2D;(&#x8FD9;&#x4E9B;&#x73AF;&#x5883;&#x4F1A;&#x7981;&#x6B62;&#x4F7F;&#x7528;this&#x548C;new)&#xFF0C;&#x6216;&#x9632;&#x6B62;&#x6570;&#x636E;&#x88AB;&#x5176;&#x4ED6;&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x6539;&#x52A8;&#x65F6;&#x4F7F;&#x7528;&#x3002;<br>&#x7A33;&#x59A5;&#x6784;&#x9020;&#x51FD;&#x6570;&#x6A21;&#x5F0F;&#x548C;&#x5BC4;&#x751F;&#x6A21;&#x5F0F;&#x7C7B;&#x4F3C;&#xFF0C;&#x6709;&#x4E24;&#x70B9;&#x4E0D;&#x540C;:<strong>1.&#x662F;&#x521B;&#x5EFA;&#x5BF9;&#x8C61;&#x7684;&#x5B9E;&#x4F8B;&#x65B9;&#x6CD5;&#x4E0D;&#x5F15;&#x7528;this&#xFF1B;2.&#x4E0D;&#x4F7F;&#x7528;new&#x64CD;&#x4F5C;&#x7B26;&#x8C03;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;</strong></p><pre><code>function Person(name, job) { 
 var o = new Object();
 o.name = name;
 o.job = job;
 o.sayName = function() { 
  console.log(name) //&#x6CE8;&#x610F;&#x8FD9;&#x91CC;&#x6CA1;&#x6709;&#x4E86;&quot;this&quot;&#xFF1B;
 } 
 return o 
} 
var person1 = Person(&apos;Mike&apos;, &apos;student&apos;) 
person1.sayName();
</code></pre><p>&#x548C;&#x5BC4;&#x751F;&#x6784;&#x9020;&#x51FD;&#x6570;&#x6A21;&#x5F0F;&#x4E00;&#x6837;&#xFF0C;&#x8FD9;&#x6837;&#x521B;&#x5EFA;&#x51FA;&#x6765;&#x7684;&#x5BF9;&#x8C61;&#x4E0E;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4E4B;&#x95F4;&#x6CA1;&#x6709;&#x4EC0;&#x4E48;&#x5173;&#x7CFB;&#xFF0C;instanceof&#x64CD;&#x4F5C;&#x7B26;&#x5BF9;&#x4ED6;&#x4EEC;&#x6CA1;&#x6709;&#x610F;&#x4E49;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript七种非常经典的创建对象方式

## 原文链接
[https://segmentfault.com/a/1190000016155973](https://segmentfault.com/a/1190000016155973)

