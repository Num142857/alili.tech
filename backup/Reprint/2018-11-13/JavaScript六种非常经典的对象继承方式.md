---
title: JavaScript六种非常经典的对象继承方式
hidden: true
categories: [reprint]
slug: 65c5edce
date: 2018-11-13 02:30:09
---

{{< raw >}}
<h2>&#x4E00;&#x3001;&#x539F;&#x578B;&#x94FE;&#x7EE7;&#x627F;</h2><p>&#x91CD;&#x70B9;&#xFF1A;&#x5229;&#x7528;&#x539F;&#x578B;&#x8BA9;&#x4E00;&#x4E2A;&#x5F15;&#x7528;&#x7C7B;&#x578B;&#x7EE7;&#x627F;&#x53E6;&#x5916;&#x4E00;&#x4E2A;&#x5F15;&#x7528;&#x7C7B;&#x578B;&#x7684;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;&#x3002;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF0C;&#x539F;&#x578B;&#xFF0C;&#x5B9E;&#x4F8B;&#x4E4B;&#x95F4;&#x7684;&#x5173;&#x7CFB;&#xFF1A;&#x6BCF;&#x4E2A;&#x6784;&#x9020;&#x51FD;&#x6570;&#x90FD;&#x6709;&#x4E00;&#x4E2A;&#x539F;&#x578B;&#x5BF9;&#x8C61;&#xFF0C;&#x539F;&#x578B;&#x5BF9;&#x8C61;&#x5305;&#x542B;&#x4E00;&#x4E2A;&#x6307;&#x5411;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x6307;&#x9488;&#xFF0C;&#x800C;&#x5B9E;&#x4F8B;&#x90FD;&#x5305;&#x542B;&#x4E00;&#x4E2A;&#x6307;&#x5411;&#x539F;&#x578B;&#x5BF9;&#x8C61;&#x7684;&#x5185;&#x90E8;&#x6307;&#x9488;&#x3002;</p><pre><code>function SuperType(){
  this.property = true;
}
SuperType.prototype.getSuperValue = function(){
  return this.property;
};

function SubType(){
  this.subproperty = false;
}
// &#x7EE7;&#x627F;&#x81EA;SuperType
SubType.prototype = new SuperType();

SubType.prototype.getSubValue = function (){
  return this.subproperty;
};

var example = new SubType();
alert(example.getSuperValue());//true
</code></pre><p>&#x4F7F;&#x7528;&#x539F;&#x578B;&#x521B;&#x5EFA;&#x5BF9;&#x8C61;&#x4F1A;&#x5B58;&#x5728;&#x591A;&#x4E2A;&#x5B9E;&#x4F8B;&#x5BF9;&#x5F15;&#x7528;&#x7C7B;&#x578B;&#x7684;&#x64CD;&#x4F5C;&#x4F1A;&#x88AB;&#x7BE1;&#x6539;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x5728;&#x4E0A;&#x9762;&#x540C;&#x6837;&#x5B58;&#x5728;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x5982;&#x4E0B;&#xFF1A;</p><pre><code>function SuperType(){
  this.colors = [&quot;red&quot;, &quot;blue&quot;, &quot;green&quot;];
}
function SubType(){}//&#x5373;&#x4F7F;&#x6CA1;&#x6709;&#x5199;&#xFF0C;&#x4E5F;&#x4E0D;&#x4F1A;&#x5F71;&#x54CD;&#x7ED3;&#x679C;

SubType.prototype = new SuperType();

var example1 = new SubType();
example1.colors.push(&quot;black&quot;);
alert(example1.colors); //&quot;red,blue,green,black&quot;

var example2 = new SubType(); 
alert(example.colors); //&quot;red,blue,green,black&quot;
</code></pre><p>&#x4E24;&#x4E2A;&#x5B9E;&#x4F8B;&#x5BF9;&#x8C61;example1&#x548C;example2&#x7684;colors&#x5C5E;&#x6027;&#x6307;&#x5411;&#x76F8;&#x540C;&#xFF0C;&#x6539;&#x53D8;&#x4E00;&#x4E2A;&#x4F1A;&#x5F71;&#x54CD;&#x53E6;&#x4E00;&#x4E2A;&#x5B9E;&#x4F8B;&#x7684;&#x5C5E;&#x6027;&#x3002;</p><p>&#x7F3A;&#x70B9;&#xFF1A;<br>&#x2460;&#x539F;&#x578B;&#x94FE;&#x7EE7;&#x627F;&#x591A;&#x4E2A;&#x5B9E;&#x4F8B;&#x7684;&#x5F15;&#x7528;&#x7C7B;&#x578B;&#x5C5E;&#x6027;&#x6307;&#x5411;&#x76F8;&#x540C;&#xFF0C;&#x4E00;&#x4E2A;&#x5B9E;&#x4F8B;&#x4FEE;&#x6539;&#x4E86;&#x539F;&#x578B;&#x5C5E;&#x6027;&#xFF0C;&#x53E6;&#x4E00;&#x4E2A;&#x5B9E;&#x4F8B;&#x7684;&#x539F;&#x578B;&#x5C5E;&#x6027;&#x4E5F;&#x4F1A;&#x88AB;&#x4FEE;&#x6539;&#xFF1B;<br>&#x2461;&#x4E0D;&#x80FD;&#x4F20;&#x9012;&#x53C2;&#x6570;&#xFF1B;<br>&#x2462;&#x7EE7;&#x627F;&#x5355;&#x4E00;&#x3002;</p><h2>&#x4E8C;&#x3001;&#x501F;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7EE7;&#x627F;</h2><p>&#x91CD;&#x70B9;&#xFF1A;&#x4F7F;&#x7528;.call()&#x548C;.apply()&#x5C06;&#x7236;&#x7C7B;&#x6784;&#x9020;&#x51FD;&#x6570;&#x5F15;&#x5165;&#x5B50;&#x7C7B;&#x51FD;&#x6570;&#xFF0C;&#x4F7F;&#x7528;&#x7236;&#x7C7B;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x6765;&#x589E;&#x5F3A;&#x5B50;&#x7C7B;&#x5B9E;&#x4F8B;&#xFF0C;&#x7B49;&#x540C;&#x4E8E;&#x590D;&#x5236;&#x7236;&#x7C7B;&#x7684;&#x5B9E;&#x4F8B;&#x7ED9;&#x5B50;&#x7C7B;&#x3002;</p><pre><code>function SuperType(name){
  this.name = name;
  this.colors = [&quot;red&quot;, &quot;blue&quot;, &quot;green&quot;];
}

function SubType(name, age){
  // &#x7EE7;&#x627F;&#x81EA;SuperType
  SuperType.call(this, name);  
  this.age = age;
}

var example1 = new SubType(&quot;Mike&quot;, 23);
example1.colors.push(&quot;black&quot;);
alert(example1.colors);//&quot;red,blue,green,black&quot;

var example2 = new SubType();
alert(example2.colors);//&quot;red,blue,green&quot;

alert(example1.name); // &quot;Mike&quot;
alert(example1.age); // 23
</code></pre><p>&#x501F;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7EE7;&#x627F;&#x7684;&#x91CD;&#x70B9;&#x5C31;&#x5728;&#x4E8E;SuperType<strong>.call(this, name)</strong>&#xFF0C;&#x8C03;&#x7528;&#x4E86;SuperType&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF0C;&#x8FD9;&#x6837;&#xFF0C;SubType&#x7684;&#x6BCF;&#x4E2A;&#x5B9E;&#x4F8B;&#x90FD;&#x4F1A;&#x5C06;SuperType&#x4E2D;&#x7684;&#x5C5E;&#x6027;&#x590D;&#x5236;&#x4E00;&#x4EFD;&#x3002;</p><p>&#x7F3A;&#x70B9;&#xFF1A;<br>&#x2460;&#x53EA;&#x80FD;&#x7EE7;&#x627F;&#x7236;&#x7C7B;&#x7684;&#x5B9E;&#x4F8B;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;&#xFF0C;&#x4E0D;&#x80FD;&#x7EE7;&#x627F;&#x539F;&#x578B;&#x5C5E;&#x6027;/&#x65B9;&#x6CD5;&#xFF1B;<br>&#x2461;&#x65E0;&#x6CD5;&#x5B9E;&#x73B0;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x590D;&#x7528;&#xFF0C;&#x6BCF;&#x4E2A;&#x5B50;&#x7C7B;&#x90FD;&#x6709;&#x7236;&#x7C7B;&#x5B9E;&#x4F8B;&#x51FD;&#x6570;&#x7684;&#x526F;&#x672C;&#xFF0C;&#x5F71;&#x54CD;&#x6027;&#x80FD;&#xFF0C;&#x4EE3;&#x7801;&#x4F1A;&#x81C3;&#x80BF;&#x3002;</p><h2>&#x4E09;&#x3001;&#x7EC4;&#x5408;&#x7EE7;&#x627F;</h2><p>&#x91CD;&#x70B9;&#xFF1A;&#x5C06;<strong>&#x539F;&#x578B;&#x94FE;&#x7EE7;&#x627F;</strong>&#x548C;<strong>&#x6784;&#x9020;&#x51FD;&#x6570;&#x7EE7;&#x627F;</strong>&#x8FD9;&#x4E24;&#x79CD;&#x6A21;&#x5F0F;&#x7684;&#x4F18;&#x70B9;&#x7EC4;&#x5408;&#x5728;&#x4E00;&#x8D77;&#xFF0C;&#x901A;&#x8FC7;&#x8C03;&#x7528;&#x7236;&#x7C7B;&#x6784;&#x9020;&#xFF0C;&#x7EE7;&#x627F;&#x7236;&#x7C7B;&#x7684;&#x5C5E;&#x6027;&#x5E76;&#x4FDD;&#x7559;&#x4F20;&#x53C2;&#xFF0C;&#x7136;&#x540E;&#x901A;&#x8FC7;&#x5C06;&#x7236;&#x7C7B;&#x5B9E;&#x4F8B;&#x4F5C;&#x4E3A;&#x5B50;&#x7C7B;&#x539F;&#x578B;&#xFF0C;&#x5B9E;&#x73B0;&#x51FD;&#x6570;&#x590D;&#x7528;&#x3002;</p><p>&#x5176;&#x80CC;&#x540E;&#x7684;&#x601D;&#x8DEF;&#x662F;<strong>&#x4F7F;&#x7528;&#x539F;&#x578B;&#x94FE;&#x5B9E;&#x73B0;&#x5BF9;&#x539F;&#x578B;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;&#x7684;&#x7EE7;&#x627F;</strong>&#xFF0C;&#x800C;<strong>&#x901A;&#x8FC7;&#x501F;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;&#x6765;&#x5B9E;&#x73B0;&#x5BF9;&#x5B9E;&#x4F8B;&#x5C5E;&#x6027;&#x7684;&#x7EE7;&#x627F;</strong>&#xFF0C;&#x8FD9;&#x6837;&#xFF0C;&#x65E2;&#x901A;&#x8FC7;&#x5728;&#x539F;&#x578B;&#x4E0A;&#x5B9A;&#x4E49;&#x65B9;&#x6CD5;&#x5B9E;&#x73B0;&#x4E86;&#x51FD;&#x6570;&#x590D;&#x7528;&#xFF0C;&#x53C8;&#x80FD;&#x4FDD;&#x8BC1;&#x6BCF;&#x4E2A;&#x5B9E;&#x4F8B;&#x90FD;&#x6709;&#x5B83;&#x81EA;&#x5DF1;&#x7684;&#x5C5E;&#x6027;&#x3002;</p><pre><code>function SuperType(name){
  this.name = name;
  this.colors = [&quot;red&quot;, &quot;blue&quot;, &quot;green&quot;];
}
SuperType.prototype.sayName = function(){
  alert(this.name);
};

function SubType(name, age){
  //&#x7EE7;&#x627F;&#x5C5E;&#x6027;
  SuperType.call(this, name);
  this.age = age;
}

// &#x7EE7;&#x627F;&#x65B9;&#x6CD5;
SubType.prototype = new SuperType(); 
SubType.prototype.constructor = SubType; 
SubType.prototype.sayAge = function(){
    alert(this.age);
};

var example1 = new SubType(&quot;Mike&quot;, 23);
example1.colors.push(&quot;black&quot;);
alert(example1.colors); //&quot;red,blue,green,black&quot;
example1.sayName(); //&quot;Mike&quot;;
example1.sayAge(); //23

var example2 = new SubType(&quot;Jack&quot;, 22);
alert(example2.colors); //&quot;red,blue,green&quot;
example2.sayName(); //&quot;Jack&quot;;
example2.sayAge(); //22</code></pre><p>&#x7F3A;&#x9677;&#xFF1A;<br>&#x7236;&#x7C7B;&#x4E2D;&#x7684;&#x5B9E;&#x4F8B;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;&#x65E2;&#x5B58;&#x5728;&#x4E8E;&#x5B50;&#x7C7B;&#x7684;&#x5B9E;&#x4F8B;&#x4E2D;&#xFF0C;&#x53C8;&#x5B58;&#x5728;&#x4E8E;&#x5B50;&#x7C7B;&#x7684;&#x539F;&#x578B;&#x4E2D;&#xFF0C;&#x4E0D;&#x8FC7;&#x4EC5;&#x662F;&#x5185;&#x5B58;&#x5360;&#x7528;&#xFF0C;&#x56E0;&#x6B64;&#xFF0C;&#x5728;&#x4F7F;&#x7528;&#x5B50;&#x7C7B;&#x521B;&#x5EFA;&#x5B9E;&#x4F8B;&#x5BF9;&#x8C61;&#x65F6;&#xFF0C;&#x5176;&#x539F;&#x578B;&#x4E2D;&#x4F1A;&#x5B58;&#x5728;<strong>&#x4E24;&#x4EFD;&#x76F8;&#x540C;&#x7684;&#x5C5E;&#x6027;/&#x65B9;&#x6CD5;</strong>&#x3002;-------<strong>&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x662F;javascript&#x4E2D;&#x6700;&#x5E38;&#x7528;&#x7684;&#x7EE7;&#x627F;&#x6A21;&#x5F0F;</strong>&#x3002;</p><h2>&#x56DB;&#x3001; &#x539F;&#x578B;&#x5F0F;&#x7EE7;&#x627F;</h2><p>&#x91CD;&#x70B9;&#xFF1A;&#x7528;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x5305;&#x88C5;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x7136;&#x540E;&#x8FD4;&#x56DE;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x7684;&#x8C03;&#x7528;&#xFF0C;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x5C31;&#x53D8;&#x6210;&#x4E86;&#x4E2A;&#x53EF;&#x4EE5;&#x968F;&#x610F;&#x589E;&#x6DFB;&#x5C5E;&#x6027;&#x7684;&#x5B9E;&#x4F8B;&#x6216;&#x5BF9;&#x8C61;&#x3002;object.create()&#x5C31;&#x662F;&#x8FD9;&#x4E2A;&#x539F;&#x7406;,&#x76F4;&#x63A5;&#x5C06;&#x67D0;&#x4E2A;&#x5BF9;&#x8C61;&#x76F4;&#x63A5;&#x8D4B;&#x503C;&#x7ED9;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x539F;&#x578B;&#x3002;</p><pre><code>function object(obj){
  function O(){}
  O.prototype = obj;
  return new O();
}</code></pre><p>object()&#x5BF9;&#x4F20;&#x5165;&#x5176;&#x4E2D;&#x7684;&#x5BF9;&#x8C61;&#x6267;&#x884C;&#x4E86;&#x4E00;&#x6B21;&#x6D45;&#x590D;&#x5236;&#xFF0C;&#x5C06;O&#x7684;&#x539F;&#x578B;&#x76F4;&#x63A5;&#x6307;&#x5411;&#x4F20;&#x5165;&#x7684;&#x5BF9;&#x8C61;&#x3002;</p><pre><code>var person = {
  name: &quot;Mike&quot;,
  friends: [&quot;Jack&quot;, &quot;Tom&quot;, &quot;Joes&quot;]
};

var anotherPerson = object(person);
anotherPerson.name = &quot;Greg&quot;;
anotherPerson.friends.push(&quot;Peter&quot;);

var yetAnotherPerson = object(person);
yetAnotherPerson.name = &quot;Linda&quot;;
yetAnotherPerson.friends.push(&quot;BoBo&quot;);

alert(person.friends);   //&quot;Jack,Tom,Joes,Peter,BoBo&quot;
</code></pre><p>ECMAScript5&#x901A;&#x8FC7;&#x65B0;&#x589E;Object.create()&#x65B9;&#x6CD5;&#x89C4;&#x8303;&#x5316;&#x4E86;&#x539F;&#x578B;&#x5F0F;&#x7EE7;&#x627F;&#xFF0C;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x63A5;&#x6536;&#x4E24;&#x4E2A;&#x53C2;&#x6570;&#xFF1A;&#x4E00;&#x4E2A;&#x7528;&#x4F5C;&#x65B0;&#x5BF9;&#x8C61;&#x539F;&#x578B;&#x7684;&#x5BF9;&#x8C61;&#x548C;&#x4E00;&#x4E2A;&#x4F5C;&#x4E3A;&#x65B0;&#x5BF9;&#x8C61;&#x5B9A;&#x4E49;&#x989D;&#x5916;&#x5C5E;&#x6027;&#x7684;&#x5BF9;&#x8C61;&#x3002;</p><pre><code>var person = {
name:&quot;EvanChen&quot;,
friends:[&quot;Shelby&quot;,&quot;Court&quot;,&quot;Van&quot;];
};
var anotherPerson = Object.create(person);
anotherPerson.name = &quot;Greg&quot;;
anotherPerson.friends.push(&quot;Rob&quot;);
var yetAnotherPerson = Object.create(person);
yetAnotherPerson.name = &quot;Linda&quot;;
yetAnotherPerson.friends.push(&quot;Barbie&quot;);
console.log(person.friends);//&quot;Shelby&quot;,&quot;Court&quot;,&quot;Van&quot;,&quot;Rob&quot;,&quot;Barbie&quot;
</code></pre><p>&#x7F3A;&#x70B9;&#xFF1A;<br>&#x2460;&#x539F;&#x578B;&#x94FE;&#x7EE7;&#x627F;&#x591A;&#x4E2A;&#x5B9E;&#x4F8B;&#x7684;&#x5F15;&#x7528;&#x7C7B;&#x578B;&#x5C5E;&#x6027;&#x6307;&#x5411;&#x76F8;&#x540C;(&#x6240;&#x6709;&#x5B9E;&#x4F8B;&#x90FD;&#x4F1A;&#x7EE7;&#x627F;&#x539F;&#x578B;&#x4E0A;&#x7684;&#x5C5E;&#x6027;)&#xFF0C;&#x5B58;&#x5728;&#x7BE1;&#x6539;&#x7684;&#x53EF;&#x80FD;&#xFF1B;<br>&#x2461;&#x65E0;&#x6CD5;&#x4F20;&#x9012;&#x53C2;&#x6570;,&#x65E0;&#x6CD5;&#x5B9E;&#x73B0;&#x590D;&#x7528;&#x3002;&#xFF08;&#x65B0;&#x5B9E;&#x4F8B;&#x5C5E;&#x6027;&#x90FD;&#x662F;&#x540E;&#x9762;&#x6DFB;&#x52A0;&#x7684;&#xFF09;&#x3002;</p><h2>&#x4E94;&#x3001;&#x5BC4;&#x751F;&#x5F0F;&#x7EE7;&#x627F;</h2><p>&#x91CD;&#x70B9;&#xFF1A;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x4EC5;&#x7528;&#x4E8E;&#x5C01;&#x88C5;&#x7EE7;&#x627F;&#x8FC7;&#x7A0B;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x8BE5;&#x51FD;&#x6570;&#x5728;&#x5185;&#x90E8;&#x4EE5;&#x67D0;&#x79CD;&#x65B9;&#x5F0F;&#x6765;&#x589E;&#x5F3A;&#x5BF9;&#x8C61;&#xFF0C;&#x6700;&#x540E;&#x8FD4;&#x56DE;&#x6784;&#x9020;&#x51FD;&#x6570;&#x3002;(&#x5C31;&#x50CF;&#x7ED9;&#x539F;&#x578B;&#x5F0F;&#x7EE7;&#x627F;&#x5916;&#x9762;&#x5957;&#x4E86;&#x4E2A;&#x58F3;&#x5B50;&#xFF0C;&#x7136;&#x540E;return&#x51FA;&#x6765;)</p><pre><code>function createAnother(original){ 
  varclone=object(original); // &#x8FC7;&#x8C03;&#x7528;&#x51FD;&#x6570;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x65B0;&#x5BF9;&#x8C61;
  clone.sayHi = function(){ // &#x4EE5;&#x67D0;&#x79CD;&#x65B9;&#x5F0F;&#x589E;&#x5F3A;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;
    alert(&quot;hi&quot;);
  };
  return clone; // &#x8FD4;&#x56DE;&#x5BF9;&#x8C61;
}</code></pre><p>&#x51FD;&#x6570;&#x7684;&#x4E3B;&#x8981;&#x4F5C;&#x7528;&#x662F;&#x4E3A;&#x6784;&#x9020;&#x51FD;&#x6570;&#x65B0;&#x589E;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;&#xFF0C;&#x4EE5;&#x589E;&#x5F3A;&#x51FD;&#x6570;&#x3002;</p><pre><code>var person = {
  name: &quot;Nicholas&quot;,
  friends: [&quot;Shelby&quot;, &quot;Court&quot;, &quot;Van&quot;]
};
var anotherPerson = createAnother(person);
anotherPerson.sayHi(); //&quot;hi&quot;</code></pre><p>&#x7F3A;&#x70B9;&#xFF1A;<br>&#x2460;&#x539F;&#x578B;&#x94FE;&#x7EE7;&#x627F;&#x591A;&#x4E2A;&#x5B9E;&#x4F8B;&#x7684;&#x5F15;&#x7528;&#x7C7B;&#x578B;&#x5C5E;&#x6027;&#x6307;&#x5411;&#x76F8;&#x540C;&#xFF0C;&#x5B58;&#x5728;&#x7BE1;&#x6539;&#x7684;&#x53EF;&#x80FD;&#xFF1B;<br>&#x2461;&#x65E0;&#x6CD5;&#x4F20;&#x9012;&#x53C2;&#x6570;&#xFF0C;&#x6CA1;&#x7528;&#x5230;&#x539F;&#x578B;&#xFF0C;&#x65E0;&#x6CD5;&#x590D;&#x7528;&#x3002;</p><h2>&#x516D;&#x3001;&#x5BC4;&#x751F;&#x7EC4;&#x5408;&#x5F0F;&#x7EE7;&#x627F;</h2><p>&#x91CD;&#x70B9;&#xFF1A;&#x901A;&#x8FC7;&#x501F;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4F20;&#x9012;&#x53C2;&#x6570;&#x548C;&#x5BC4;&#x751F;&#x6A21;&#x5F0F;&#x5B9E;&#x73B0;&#x7EE7;&#x627F;&#x5C5E;&#x6027;&#xFF0C;&#x901A;&#x8FC7;&#x539F;&#x578B;&#x94FE;&#x7684;&#x6DF7;&#x6210;&#x5F62;&#x5F0F;&#x6765;&#x7EE7;&#x627F;&#x65B9;&#x6CD5;&#xFF0C;&#x5728;&#x51FD;&#x6570;&#x4E2D;&#x7528;apply&#x6216;&#x8005;call&#x5F15;&#x5165;&#x53E6;&#x4E00;&#x4E2A;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF0C;&#x53EF;&#x4F20;&#x53C2;&#x3002;</p><pre><code>function inheritPrototype(subType, superType){
  var prototype = Object.create(superType.prototype); //Object.create&#x521B;&#x5EFA;&#x5BF9;&#x8C61;
  prototype.constructor = subType;                    // &#x589E;&#x5F3A;&#x5BF9;&#x8C61;
  subType.prototype = prototype;                      // &#x6307;&#x5B9A;&#x5BF9;&#x8C61;
}

// &#x7236;&#x7C7B;&#x521D;&#x59CB;&#x5316;&#x5B9E;&#x4F8B;&#x5C5E;&#x6027;&#x548C;&#x539F;&#x578B;&#x5C5E;&#x6027;
function SuperType(name){
  this.name = name;
  this.colors = [&quot;red&quot;, &quot;blue&quot;, &quot;green&quot;];
}
SuperType.prototype.sayName = function(){
  alert(this.name);
};

// &#x501F;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4F20;&#x9012;&#x589E;&#x5F3A;&#x5B50;&#x7C7B;&#x5B9E;&#x4F8B;&#x5C5E;&#x6027;&#xFF08;&#x652F;&#x6301;&#x4F20;&#x53C2;&#x548C;&#x907F;&#x514D;&#x7BE1;&#x6539;&#xFF09;
function SubType(name, age){
  SuperType.call(this, name);
  this.age = age;
}

// &#x5C06;&#x7236;&#x7C7B;&#x539F;&#x578B;&#x6307;&#x5411;&#x5B50;&#x7C7B;
inheritPrototype(SubType, SuperType);

// &#x65B0;&#x589E;&#x5B50;&#x7C7B;&#x539F;&#x578B;&#x5C5E;&#x6027;
SubType.prototype.sayAge = function(){
  alert(this.age);
}

var example1 = new SubType(&quot;abc&quot;, 21);
var example2 = new SubType(&quot;def&quot;, 22);

example1.colors.push(&quot;pink&quot;); // [&quot;red&quot;, &quot;blue&quot;, &quot;green&quot;, &quot;pink&quot;]
example1.colors.push(&quot;black&quot;); // [&quot;red&quot;, &quot;blue&quot;, &quot;green&quot;, &quot;black&quot;]</code></pre><p>&#x5BC4;&#x751F;&#x7EC4;&#x5408;&#x7EE7;&#x627F;&#x96C6;&#x5408;&#x4E86;&#x524D;&#x9762;&#x51E0;&#x79CD;&#x7EE7;&#x627F;&#x4F18;&#x70B9;&#xFF0C;&#x51E0;&#x4E4E;&#x907F;&#x514D;&#x4E86;&#x4E0A;&#x9762;&#x7EE7;&#x627F;&#x65B9;&#x5F0F;&#x7684;&#x6240;&#x6709;&#x7F3A;&#x9677;&#xFF0C;&#x662F;&#x6267;&#x884C;&#x6548;&#x7387;&#x6700;&#x9AD8;&#x4E5F;&#x662F;&#x5E94;&#x7528;&#x9762;&#x6700;&#x5E7F;&#x7684;&#x3002;</p><p>&#x7F3A;&#x70B9;&#xFF1A;<br>&#x5B9E;&#x73B0;&#x7684;&#x8FC7;&#x7A0B;&#x76F8;&#x5BF9;&#x7E41;&#x7410;&#x3002;</p><p><strong>&#x4E3A;&#x4EC0;&#x4E48;&#x8981;&#x5B66;&#x4E60;&#x8FD9;&#x4E9B;&#x7EE7;&#x627F;&#x65B9;&#x5F0F;&#xFF0C;&#x660E;&#x660E;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x7EE7;&#x627F;&#x4E3A;&#x4EC0;&#x4E48;&#x8FD8;&#x8981;&#x641E;&#x8FD9;&#x4E48;&#x9EBB;&#x70E6;&#xFF1F;</strong>&#x4E3B;&#x8981;&#x662F;&#x4E3A;&#x4E86;&#x5B66;&#x4E60;&#x5B83;&#x4EEC;&#x7684;&#x601D;&#x60F3;&#xFF0C;&#x6253;&#x4E0B;&#x66F4;&#x597D;&#x7684;&#x57FA;&#x7840;&#xFF0C;&#x4E3A;&#x4EE5;&#x540E;&#x9605;&#x8BFB;&#x6846;&#x67B6;&#x6E90;&#x7801;&#xFF0C;&#x6216;&#x81EA;&#x5DF1;&#x5C01;&#x88C5;&#x7EC4;&#x4EF6;&#x751A;&#x81F3;&#x6846;&#x67B6;&#x5927;&#x6709;&#x76CA;&#x5904;&#x3002;</p><p>&#x65F6;&#x95F4;&#x6709;&#x70B9;&#x5306;&#x5FD9;&#xFF0C;&#x6CA1;&#x6709;&#x52A0;&#x4E0A;ES6&#x7684;extends&#xFF0C;&#x6709;&#x7A7A;&#x518D;&#x8865;&#x4E0A;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript六种非常经典的对象继承方式

## 原文链接
[https://segmentfault.com/a/1190000016242916](https://segmentfault.com/a/1190000016242916)

