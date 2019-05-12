---
title: JavaScript实现继承
hidden: true
categories: [reprint]
slug: 68a1ada0
date: 2018-11-14 02:30:09
---

{{< raw >}}
<h2>&#x7B80;&#x4ECB;</h2><p>&#x672C;&#x6587;&#x4E0D;&#x51C6;&#x5907;&#x6DF1;&#x5165;&#x7EC6;&#x8282;&#xFF0C;&#x4E3B;&#x8981;&#x662F;&#x5BF9;&#x300A;JavaScript&#x9AD8;&#x7EA7;&#x7A0B;&#x5E8F;&#x8BBE;&#x8BA1;&#x4E2D;&#x300B;&#x4ECB;&#x7ECD;&#x7684;JS&#x5982;&#x4F55;&#x5B9E;&#x73B0;&#x7EE7;&#x627F;&#x505A;&#x4E00;&#x4E2A;&#x603B;&#x7ED3;&#xFF0C;&#x6BD5;&#x7ADF;&#x597D;&#x8BB0;&#x6027;&#x4E0D;&#x5982;&#x70C2;&#x7B14;&#x5934;&#x3002;&#x6587;&#x672B;&#x4F1A;&#x9644;&#x5E26;&#x4E00;&#x5F20;&#x795E;&#x56FE;&#xFF0C;&#x641E;&#x6E05;&#x695A;&#x8FD9;&#x5F20;&#x56FE;&#xFF0C;&#x539F;&#x578B;&#x94FE;&#x4E5F;&#x5C31;&#x6CA1;&#x6709;&#x4EC0;&#x4E48;&#x95EE;&#x9898;&#x4E86;&#x3002;</p><h2>ES5&#x5B9E;&#x73B0;&#x7EE7;&#x627F;&#x7684;&#x516D;&#x79CD;&#x65B9;&#x5F0F;</h2><h3>1. &#x539F;&#x578B;&#x94FE;</h3><p>&#x57FA;&#x672C;&#x601D;&#x60F3;&#xFF1A;</p><p><strong>&#x5229;&#x7528;&#x539F;&#x578B;&#x94FE;&#x8BA9;&#x4E00;&#x4E2A;&#x5F15;&#x7528;&#x7C7B;&#x578B;&#x7EE7;&#x627F;&#x53E6;&#x4E00;&#x4E2A;&#x5F15;&#x7528;&#x7C7B;&#x578B;&#x7684;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;&#x3002;</strong></p><pre><code>function SuperType () {
  this.property = true;
}

SuperType.prototype.getSuperValue = function () {
  return this.property;  
};

// &#x5B50;&#x7C7B; SubType
function SubType () {
  this.subProperty = false;
}

SubType.prototype = new SuperType();
SubType.prototype.getSubValue = function () {
  return this.subProperty;
};

// &#x5B9E;&#x4F8B;
var instance = new SubType();
console.log(instance);
console.log(instance.getSuperValue());                            // true
console.log(instance instanceof SubType);                         // true
console.log(instance instanceof SuperType);                       // true
console.log(instance instanceof Object);                          // true
console.log(SubType.prototype.isPrototypeOf(instance));           // true
console.log(SuperType.prototype.isPrototypeOf(instance));         // true
console.log(Object.prototype.isPrototypeOf(instance));            // true</code></pre><p>&#x7F3A;&#x70B9;&#xFF1A;</p><p><strong>1. &#x6765;&#x81EA;&#x539F;&#x578B;&#x5BF9;&#x8C61;&#x7684;&#x5F15;&#x7528;&#x5C5E;&#x6027;&#x662F;&#x6240;&#x6709;&#x5B9E;&#x4F8B;&#x5171;&#x4EAB;&#x7684;&#x3002;</strong></p><p><strong>2. &#x521B;&#x5EFA;&#x5B50;&#x7C7B;&#x5B9E;&#x4F8B;&#x65F6;&#xFF0C;&#x65E0;&#x6CD5;&#x5411;&#x7236;&#x7C7B;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4F20;&#x53C2;&#x3002;</strong></p><p>&#x4E3E;&#x4F8B;&#x5982;&#x4E0B;&#xFF1A;</p><pre><code>// 1. &#x6765;&#x81EA;&#x539F;&#x578B;&#x5BF9;&#x8C61;&#x7684;&#x5F15;&#x7528;&#x5C5E;&#x6027;&#x662F;&#x6240;&#x6709;&#x5B9E;&#x4F8B;&#x5171;&#x4EAB;&#x7684;

// &#x7236;&#x7C7B;
function SuperType () {
  this.colors = [&apos;red&apos;, &apos;blue&apos;, &apos;green&apos;];
}

// &#x5B50;&#x7C7B;
function SubType () {

}
SubType.prototype = new SuperType();

// &#x5B9E;&#x4F8B;
var instance1 = new SubType();
instance1.colors.push(&apos;black&apos;);
console.log(instance1.colors);        // [&apos;red&apos;, &apos;blue&apos;, &apos;green&apos;, &apos;black&apos;]
var instance2 = new SubType();
console.log(instance2.colors);        // [&apos;red&apos;, &apos;blue&apos;, &apos;green&apos;, &apos;black&apos;]

// &#x56E0;&#x4E3A;&#x4FEE;&#x6539;colors&#x662F;&#x4FEE;&#x6539;&#x7684;SubType.prototype.colors&#xFF0C;&#x6240;&#x4EE5;&#x6240;&#x6709;&#x7684;&#x5B9E;&#x4F8B;&#x90FD;&#x4F1A;&#x66F4;&#x65B0;</code></pre><pre><code>// 2. &#x521B;&#x5EFA;&#x5B50;&#x7C7B;&#x5B9E;&#x4F8B;&#x65F6;&#xFF0C;&#x65E0;&#x6CD5;&#x5411;&#x7236;&#x7C7B;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4F20;&#x53C2;

// &#x8C03;&#x7528;&#x7236;&#x7C7B;&#x662F;&#x5728; SubType.prototype = new SuperType()
// &#x65B0;&#x5EFA;&#x5B50;&#x7C7B;&#x5B9E;&#x4F8B;&#x8C03;&#x7528; new SubType()
// &#x6240;&#x4EE5;&#x65E0;&#x6CD5;&#x518D;new SubType() &#x7684;&#x65F6;&#x5019;&#x7ED9;&#x7236;&#x7C7B; SuperType() &#x4F20;&#x53C2;</code></pre><h3>2. &#x501F;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;</h3><p>&#x57FA;&#x672C;&#x601D;&#x60F3;&#xFF1A;</p><p><strong>&#x5728;&#x5B50;&#x7C7B;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x5185;&#x90E8;&#x901A;&#x8FC7;call()&#x4EE5;&#x53CA;apply()&#x8C03;&#x7528;&#x7236;&#x7C7B;&#x6784;&#x9020;&#x51FD;&#x6570;&#x3002;</strong></p><pre><code>// &#x7236;&#x7C7B; SuperType
function SuperType (name) {
  this.name = name;
  this.colors = [&apos;red&apos;, &apos;blue&apos;, &apos;green&apos;];
  
  this.getName = function () {
      return this.name;
  }
}

// &#x5B50;&#x7C7B;
function SubType (name) {
  // &#x7EE7;&#x627F;&#x4E86;SuperType&#xFF0C;&#x540C;&#x65F6;&#x8FD8;&#x4F20;&#x9012;&#x4E86;&#x53C2;&#x6570;
  SuperType.call(this, name);

  // &#x5B9E;&#x4F8B;&#x5C5E;&#x6027;
  this.age = 20;
}

// &#x5B9E;&#x4F8B;
var instance1 = new SubType(&apos;Tom&apos;);
instance1.colors.push(&apos;black&apos;);
console.log(instance1.name);               // &quot;Tom&quot;
console.log(instance1.getName());          // &quot;Tom&quot;
console.log(instance1.age);                // 20
console.log(instance1.colors);             // [&apos;red&apos;, &apos;blue&apos;, &apos;green&apos;, &apos;black&apos;]
var instance2 = new SubType(&apos;Peter&apos;);
console.log(instance2.name);               // &quot;Peter&quot;
console.log(instance2.getName());          // &quot;Peter&quot;
console.log(instance2.age);                // 20
console.log(instance2.colors);             // [&apos;red&apos;, &apos;blue&apos;, &apos;green&apos;]</code></pre><p>&#x53EF;&#x4EE5;&#x770B;&#x5230;&#xFF0C;&#x501F;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;&#x5B9E;&#x73B0;&#x7EE7;&#x627F;&#xFF0C;&#x89E3;&#x51B3;&#x4E86;&#x539F;&#x578B;&#x94FE;&#x7EE7;&#x627F;&#x7684;&#x4E24;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x65E2;&#x53EF;&#x4EE5;&#x5728;&#x65B0;&#x5EFA;&#x5B50;&#x7C7B;&#x5B9E;&#x4F8B;&#x7684;&#x65F6;&#x5019;&#x7ED9;&#x7236;&#x7C7B;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4F20;&#x9012;&#x53C2;&#x6570;&#xFF0C;&#x4E5F;&#x4E0D;&#x4F1A;&#x9020;&#x6210;&#x5B50;&#x7C7B;&#x5B9E;&#x4F8B;&#x5171;&#x4EAB;&#x7236;&#x7C7B;&#x5F15;&#x7528;&#x53D8;&#x91CF;&#x3002;</p><p>&#x4F46;&#x662F;&#x4F60;&#x6CE8;&#x610F;&#x5230;&#x4E86;&#x5417;&#xFF0C;&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x628A;&#x7236;&#x7C7B;&#x65B9;&#x6CD5;&#x4E5F;&#x5199;&#x5728;&#x4E86;SuperType()&#x6784;&#x9020;&#x51FD;&#x6570;&#x91CC;&#x9762;&#xFF0C;&#x53EF;&#x4EE5;&#x50CF;&#x524D;&#x9762;&#x4E00;&#x6837;&#x5199;&#x5728;SuperType.prototype&#x4E0A;&#x5417;&#xFF1F;</p><p><strong>&#x7B54;&#x6848;&#x662F;&#x4E0D;&#x53EF;&#x4EE5;</strong>&#xFF0C;&#x5FC5;&#x987B;&#x5199;&#x5728;SuperType()&#x6784;&#x9020;&#x51FD;&#x6570;&#x91CC;&#x9762;&#x3002;&#x56E0;&#x4E3A;&#x8FD9;&#x91CC;&#x662F;&#x901A;&#x8FC7;&#x8C03;&#x7528;SuperType.call(this)&#x6765;&#x5B9E;&#x73B0;&#x7EE7;&#x627F;&#x7684;&#xFF0C;&#x5E76;&#x6CA1;&#x6709;&#x901A;&#x8FC7;new&#x751F;&#x6210;&#x4E00;&#x4E2A;&#x7236;&#x7C7B;&#x5B9E;&#x4F8B;&#xFF0C;&#x6240;&#x4EE5;&#x5982;&#x679C;&#x5199;&#x5728;prototype&#x4E0A;&#xFF0C;&#x5B50;&#x7C7B;&#x662F;&#x65E0;&#x6CD5;&#x62FF;&#x5230;&#x7684;&#x3002;</p><p>&#x7F3A;&#x70B9;&#xFF1A;</p><p><strong>1. &#x5982;&#x679C;&#x65B9;&#x6CD5;&#x90FD;&#x5728;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4E2D;&#x5B9A;&#x4E49;&#xFF0C;&#x90A3;&#x4E48;&#x5C31;&#x65E0;&#x6CD5;&#x590D;&#x7528;&#x51FD;&#x6570;&#x3002;&#x6BCF;&#x6B21;&#x6784;&#x5EFA;&#x5B9E;&#x4F8B;&#x65F6;&#x90FD;&#x4F1A;&#x5728;&#x5B9E;&#x4F8B;&#x4E2D;&#x4FDD;&#x7559;&#x65B9;&#x6CD5;&#x51FD;&#x6570;&#xFF0C;&#x9020;&#x6210;&#x4E86;&#x5185;&#x5B58;&#x7684;&#x6D6A;&#x8D39;&#xFF0C;&#x540C;&#x65F6;&#x4E5F;&#x65E0;&#x6CD5;&#x5B9E;&#x73B0;&#x540C;&#x6B65;&#x66F4;&#x65B0;&#xFF0C;&#x56E0;&#x4E3A;&#x6BCF;&#x4E2A;&#x5B9E;&#x4F8B;&#x90FD;&#x662F;&#x5355;&#x72EC;&#x7684;&#x65B9;&#x6CD5;&#x51FD;&#x6570;&#x3002;&#x5982;&#x679C;&#x65B9;&#x6CD5;&#x5199;&#x5728;prototype&#x4E0A;&#xFF0C;&#x5C31;&#x53EA;&#x4F1A;&#x6709;&#x4E00;&#x4EFD;&#xFF0C;&#x66F4;&#x65B0;&#x65F6;&#x5019;&#x4F1A;&#x505A;&#x5230;&#x540C;&#x6B65;&#x66F4;&#x65B0;&#x3002;</strong></p><p><span class="img-wrap"><img data-src="http://p54fus2hp.bkt.clouddn.com/blog/20180828/extend1.png" src="https://static.alili.techhttp://p54fus2hp.bkt.clouddn.com/blog/20180828/extend1.png" alt="extend1" title="extend1"></span></p><p><span class="img-wrap"><img data-src="http://p54fus2hp.bkt.clouddn.com/blog/20180828/extend2.png" src="https://static.alili.techhttp://p54fus2hp.bkt.clouddn.com/blog/20180828/extend2.png" alt="extend2" title="extend2"></span></p><h3>3. &#x7EC4;&#x5408;&#x7EE7;&#x627F;</h3><p>&#x57FA;&#x672C;&#x601D;&#x60F3;&#xFF1A;</p><p><strong>&#x5C06;&#x539F;&#x578B;&#x94FE;&#x548C;&#x501F;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x6280;&#x672F;&#x7EC4;&#x5408;&#x5230;&#x4E00;&#x5757;&#xFF0C;&#x4ECE;&#x800C;&#x53D1;&#x6325;&#x4E8C;&#x8005;&#x4E4B;&#x957F;&#x7684;&#x4E00;&#x79CD;&#x7EE7;&#x627F;&#x6A21;&#x5F0F;&#x3002;</strong></p><p>&#x4F7F;&#x7528;&#x539F;&#x578B;&#x94FE;&#x5B9E;&#x73B0;&#x5BF9;&#x539F;&#x578B;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;&#x7684;&#x7EE7;&#x627F;&#xFF0C;&#x800C;&#x901A;&#x8FC7;&#x501F;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;&#x6765;&#x5B9E;&#x73B0;&#x5BF9;&#x5B9E;&#x4F8B;&#x5C5E;&#x6027;&#x7684;&#x7EE7;&#x627F;&#x3002;</p><pre><code>// &#x7236;&#x7C7B;
function SuperType (name) {
  this.name = name;
  this.colors = [&apos;red&apos;, &apos;blue&apos;, &apos;green&apos;];
}

SuperType.prototype.sayName = function () {
  console.log(this.name);
}

// &#x5B50;&#x7C7B;
function SubType (name, age) {
  // &#x7EE7;&#x627F;&#x7236;&#x7C7B;&#x5B9E;&#x4F8B;&#x5C5E;&#x6027;
  SuperType.call(this, name);
  
  // &#x5B50;&#x7C7B;&#x5B9E;&#x4F8B;&#x5C5E;&#x6027;
  this.age = age;
}

SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function () {
  console.log(this.age);
};

// &#x5B9E;&#x4F8B;
var instance1 = new SubType(&apos;Tom&apos;, 20);
instance1.colors.push(&apos;black&apos;);
console.log(instance1.colors);                  // [&apos;red&apos;, &apos;blue&apos;, &apos;green&apos;, &apos;black&apos;]
instance1.sayName();                            // &quot;Tom&quot;
instance1.sayAge();                             // 20

var instance2 = new SubType(&apos;Peter&apos;, 30);
console.log(instance2.colors);                  // [&apos;red&apos;, &apos;blue&apos;, &apos;green&apos;]
instance2.sayName();                            // &quot;Peter&quot;
instance2.sayAge();                             // 30</code></pre><p>&#x7F3A;&#x70B9;&#xFF1A;</p><p><strong>1. &#x8C03;&#x7528;&#x4E86;&#x4E24;&#x6B21;&#x7236;&#x7C7B;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF0C;&#x4E00;&#x6B21;&#x901A;&#x8FC7;SuperType.call(this)&#x8C03;&#x7528;&#xFF0C;&#x4E00;&#x6B21;&#x901A;&#x8FC7;new SuperType()&#x8C03;&#x7528;&#x3002;</strong></p><h2>4. &#x539F;&#x578B;&#x5F0F;&#x7EE7;&#x627F;</h2><p>&#x57FA;&#x672C;&#x601D;&#x60F3;&#xFF1A;</p><p><strong>&#x4E0D;&#x4F7F;&#x7528;&#x4E25;&#x683C;&#x610F;&#x4E49;&#x4E0A;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF0C;&#x501F;&#x52A9;&#x539F;&#x578B;&#x53EF;&#x4EE5;&#x57FA;&#x4E8E;&#x5DF2;&#x6709;&#x7684;&#x5BF9;&#x8C61;&#x521B;&#x5EFA;&#x65B0;&#x7684;&#x5BF9;&#x8C61;&#xFF0C;&#x540C;&#x65F6;&#x8FD8;&#x4E0D;&#x5FC5;&#x56E0;&#x6B64;&#x521B;&#x5EFA;&#x81EA;&#x5B9A;&#x4E49;&#x7C7B;&#x578B;&#x3002;</strong></p><pre><code>// &#x5728;object&#x51FD;&#x6570;&#x5185;&#x90E8;&#xFF0C;&#x5148;&#x521B;&#x5EFA;&#x4E86;&#x4E00;&#x4E2A;&#x4E34;&#x65F6;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF0C;&#x7136;&#x540E;&#x5C06;&#x4F20;&#x5165;&#x7684;&#x5BF9;&#x8C61;&#x4F5C;&#x4E3A;&#x8FD9;&#x4E2A;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x539F;&#x578B;&#xFF0C;&#x6700;&#x540E;&#x8FD4;&#x56DE;&#x8FD9;&#x4E2A;&#x4E34;&#x65F6;&#x7C7B;&#x578B;&#x7684;&#x4E00;&#x4E2A;&#x65B0;&#x5B9E;&#x4F8B;&#x3002;
// &#x4ECE;&#x672C;&#x8D28;&#x4E0A;&#x8BB2;&#xFF0C;object()&#x5BF9;&#x4F20;&#x5165;&#x5176;&#x4E2D;&#x7684;&#x5BF9;&#x8C61;&#x6267;&#x884C;&#x4E86;&#x4E00;&#x6B21;&#x6D45;&#x590D;&#x5236;&#x3002;

function object (o) {
  function F() {}
  F.prototype = o;
  return new F();
}


var person = {
  name: &apos;Tom&apos;,
  friends: [&apos;Shelby&apos;, &apos;Court&apos;, &apos;Van&apos;]
};

var anotherPerson = object(person);
anotherPerson.name = &apos;Greg&apos;;
anotherPerson.friends.push(&apos;Rob&apos;);

var yetAnotherPerson = object(person);
yetAnotherPerson.name = &apos;Linda&apos;;
yetAnotherPerson.friends.push(&apos;Barbie&apos;);

console.log(anotherPerson.friends);               // [&apos;Shelby&apos;, &apos;Court&apos;, &apos;Van&apos;, &apos;Rob&apos;, &apos;Barbie&apos;]
console.log(yetAnotherPerson.friends);            // [&apos;Shelby&apos;, &apos;Court&apos;, &apos;Van&apos;, &apos;Rob&apos;, &apos;Barbie&apos;]
console.log(person.friends);                      // [&apos;Shelby&apos;, &apos;Court&apos;, &apos;Van&apos;, &apos;Rob&apos;, &apos;Barbie&apos;]
</code></pre><p>ECMAScript5&#x4E2D;&#x65B0;&#x589E;&#x4E86;&#x4E00;&#x4E2A;&#x65B9;&#x6CD5;Object.create(prototype, descripter)&#x63A5;&#x6536;&#x4E24;&#x4E2A;&#x53C2;&#x6570;&#xFF1A;</p><ul><li>prototype&#xFF08;&#x5FC5;&#x9009;&#xFF09;&#xFF0C;&#x7528;&#x4F5C;&#x65B0;&#x5BF9;&#x8C61;&#x7684;&#x539F;&#x578B;&#x5BF9;&#x8C61;</li><li>descripter&#xFF08;&#x53EF;&#x9009;&#xFF09;&#xFF0C;&#x4E3A;&#x65B0;&#x5BF9;&#x8C61;&#x5B9A;&#x4E49;&#x989D;&#x5916;&#x5C5E;&#x6027;&#x7684;&#x5BF9;&#x8C61;</li></ul><p>&#x5728;&#x4F20;&#x5165;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;Object.create()&#x4E0E;&#x524D;&#x9762;&#x5199;&#x7684;object()&#x65B9;&#x6CD5;&#x7684;&#x884C;&#x4E3A;&#x76F8;&#x540C;&#x3002;</p><pre><code>var person = {
  name: &apos;Tom&apos;,
  friends: [&apos;Shelby&apos;, &apos;Court&apos;, &apos;Van&apos;]
};

var anotherPerson = Object.create(person);
anotherPerson.name = &apos;Greg&apos;;
anotherPerson.friends.push(&apos;Rob&apos;);

var yetAnotherPerson = Object.create(person, {
    name: {
        value: &apos;Linda&apos;,
        enumerable: true
    }
});
yetAnotherPerson.friends.push(&apos;Barbie&apos;);

console.log(anotherPerson.friends);               // [&apos;Shelby&apos;, &apos;Court&apos;, &apos;Van&apos;, &apos;Rob&apos;, &apos;Barbie&apos;]
console.log(yetAnotherPerson.friends);            // [&apos;Shelby&apos;, &apos;Court&apos;, &apos;Van&apos;, &apos;Rob&apos;, &apos;Barbie&apos;]
console.log(person.friends);                      // [&apos;Shelby&apos;, &apos;Court&apos;, &apos;Van&apos;, &apos;Rob&apos;, &apos;Barbie&apos;]</code></pre><p>&#x7F3A;&#x70B9;&#xFF1A;</p><p><strong>1. &#x548C;&#x539F;&#x578B;&#x94FE;&#x7EE7;&#x627F;&#x4E00;&#x6837;&#xFF0C;&#x6240;&#x6709;&#x5B50;&#x7C7B;&#x5B9E;&#x4F8B;&#x5171;&#x4EAB;&#x7236;&#x7C7B;&#x7684;&#x5F15;&#x7528;&#x7C7B;&#x578B;&#x3002;</strong></p><h2>5. &#x5BC4;&#x751F;&#x5F0F;&#x7EE7;&#x627F;</h2><p>&#x57FA;&#x672C;&#x539F;&#x7406;&#xFF1A;</p><p><strong>&#x5BC4;&#x751F;&#x5F0F;&#x7EE7;&#x627F;&#x662F;&#x4E0E;&#x539F;&#x578B;&#x5F0F;&#x7EE7;&#x627F;&#x7D27;&#x5BC6;&#x76F8;&#x5173;&#x7684;&#x4E00;&#x79CD;&#x601D;&#x8DEF;&#xFF0C;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x4EC5;&#x7528;&#x4E8E;&#x5C01;&#x88C5;&#x7EE7;&#x627F;&#x8FC7;&#x7A0B;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x8BE5;&#x51FD;&#x6570;&#x5185;&#x90E8;&#x4EE5;&#x67D0;&#x79CD;&#x5F62;&#x5F0F;&#x6765;&#x505A;&#x589E;&#x5F3A;&#x5BF9;&#x8C61;&#xFF0C;&#x6700;&#x540E;&#x8FD4;&#x56DE;&#x5BF9;&#x8C61;&#x3002;</strong></p><pre><code>function object (o) {
  function F() {}
  F.prototype = o;
  return new F();
}

function createAnother (o) {
  var clone = object(o);
  clone.sayHi = function () {
    console.log(&apos;Hi&apos;);
  }
  return clone;
}

var person = {
  name: &apos;Tom&apos;,
  friends: [&apos;Shelby&apos;, &apos;Court&apos;, &apos;Van&apos;] 
};

var anotherPerson = createAnother(person);
anotherPerson.sayHi();                              // &quot;Hi&quot;
anotherPerson.friends.push(&apos;Rob&apos;);
console.log(anotherPerson.friends);              // [&apos;Shelby&apos;, &apos;Court&apos;, &apos;Van&apos;, &apos;Rob&apos;]
var yerAnotherPerson = createAnother(person);
console.log(yerAnotherPerson.friends);              // [&apos;Shelby&apos;, &apos;Court&apos;, &apos;Van&apos;, &apos;Rob&apos;]</code></pre><p>&#x7F3A;&#x70B9;&#xFF1A;</p><p><strong>1. &#x548C;&#x539F;&#x578B;&#x94FE;&#x5F0F;&#x7EE7;&#x627F;&#x4E00;&#x6837;&#xFF0C;&#x6240;&#x6709;&#x5B50;&#x7C7B;&#x5B9E;&#x4F8B;&#x5171;&#x4EAB;&#x7236;&#x7C7B;&#x5F15;&#x7528;&#x7C7B;&#x578B;&#x3002;</strong></p><p><strong>2. &#x548C;&#x501F;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7EE7;&#x627F;&#x4E00;&#x6837;&#xFF0C;&#x6BCF;&#x6B21;&#x521B;&#x5EFA;&#x5BF9;&#x8C61;&#x90FD;&#x4F1A;&#x521B;&#x5EFA;&#x4E00;&#x6B21;&#x65B9;&#x6CD5;&#x3002;</strong></p><h3>6. &#x5BC4;&#x751F;&#x7EC4;&#x5408;&#x5F0F;&#x7EE7;&#x627F;</h3><p>&#x57FA;&#x672C;&#x601D;&#x60F3;&#xFF1A;</p><p><strong>&#x5C06;&#x5BC4;&#x751F;&#x5F0F;&#x7EE7;&#x627F;&#x548C;&#x7EC4;&#x5408;&#x7EE7;&#x627F;&#x76F8;&#x7ED3;&#x5408;&#xFF0C;&#x89E3;&#x51B3;&#x4E86;&#x7EC4;&#x5408;&#x5F0F;&#x7EE7;&#x627F;&#x4E2D;&#x4F1A;&#x8C03;&#x7528;&#x4E24;&#x6B21;&#x7236;&#x7C7B;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x7F3A;&#x70B9;&#x3002;</strong></p><p>&#x7EC4;&#x5408;&#x7EE7;&#x627F;&#x662F;JavaScript&#x6700;&#x5E38;&#x7528;&#x7684;&#x7EE7;&#x627F;&#x6A21;&#x5F0F;&#xFF0C;&#x5B83;&#x6700;&#x5927;&#x7684;&#x95EE;&#x9898;&#x5C31;&#x662F;&#x65E0;&#x8BBA;&#x5728;&#x4EC0;&#x4E48;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x90FD;&#x4F1A;&#x8C03;&#x7528;&#x4E24;&#x6B21;&#x7236;&#x7C7B;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF1A;&#x4E00;&#x6B21;&#x662F;&#x5728;&#x521B;&#x5EFA;&#x5B50;&#x7C7B;&#x539F;&#x578B;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x53E6;&#x4E00;&#x6B21;&#x662F;&#x5728;&#x5B50;&#x7C7B;&#x6784;&#x9020;&#x51FD;&#x6570;&#x5185;&#x90E8;&#x3002;</p><pre><code>// &#x7EC4;&#x5408;&#x7EE7;&#x627F;
function SuperType(name) {
  this.name = name;
  this.colors = [&quot;red&quot;, &quot;blue&quot;, &quot;green&quot;];
}
SuperType.prototype.sayName = function () {
  alert(this.name);
};
function SubType(name, age) {
  SuperType.call(this, name); //&#x7B2C;&#x4E8C;&#x6B21;&#x8C03;&#x7528; SuperType()
  this.age = age;
}
SubType.prototype = new SuperType(); //&#x7B2C;&#x4E00;&#x6B21;&#x8C03;&#x7528; SuperType()
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function () {
  alert(this.age);
};</code></pre><p>&#x7EC4;&#x5408;&#x7EE7;&#x627F;&#x5728;&#x7B2C;&#x4E00;&#x6B21;&#x8C03;&#x7528;SuperType&#x6784;&#x9020;&#x51FD;&#x6570;&#x65F6;&#xFF0C;SubType.prototype&#x4F1A;&#x5F97;&#x5230;&#x4E24;&#x4E2A;&#x5C5E;&#x6027;&#xFF1A;name&#x548C;colors&#xFF1B;&#x5B83;&#x4EEC;&#x90FD;&#x662F; SuperType &#x7684;&#x5B9E;&#x4F8B;&#x5C5E;&#x6027;&#xFF0C;&#x53EA;&#x4E0D;&#x8FC7;&#x73B0;&#x5728;&#x4F4D;&#x4E8E; SubType&#x7684;&#x539F;&#x578B;&#x4E2D;&#x3002;&#x5F53;&#x8C03;&#x7528;SubType&#x6784;&#x9020;&#x51FD;&#x6570;&#x65F6;&#xFF0C;&#x53C8;&#x4F1A;&#x8C03;&#x7528;&#x4E00;&#x6B21;SuperType&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF0C;&#x8FD9;&#x4E00;&#x6B21;&#x53C8;&#x5728;&#x65B0;&#x5BF9;&#x8C61;&#x4E0A;&#x521B;&#x5EFA;&#x4E86;&#x5B9E;&#x4F8B;&#x5C5E;&#x6027;name&#x548C;colors&#x3002;&#x4E8E;&#x662F;&#xFF0C;&#x8FD9;&#x4E24;&#x4E2A;&#x5C5E;&#x6027;&#x5C31;&#x5C4F;&#x853D;&#x4E86;&#x539F;&#x578B;&#x4E2D;&#x7684;&#x4E24;&#x4E2A;&#x540C;&#x540D;&#x5C5E;&#x6027;&#x3002;</p><p><strong>&#x6240;&#x8C13;&#x5BC4;&#x751F;&#x7EC4;&#x5408;&#x5F0F;&#x7EE7;&#x627F;&#xFF0C;&#x5373;&#x901A;&#x8FC7;&#x501F;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;&#x6765;&#x7EE7;&#x627F;&#x5C5E;&#x6027;&#xFF0C;&#x901A;&#x8FC7;&#x539F;&#x578B;&#x94FE;&#x7684;&#x6DF7;&#x6210;&#x5F62;&#x5F0F;&#x6765;&#x7EE7;&#x627F;&#x65B9;&#x6CD5;&#x3002;</strong></p><p>&#x5176;&#x80CC;&#x540E;&#x7684;&#x57FA;&#x672C;&#x601D;&#x8DEF;&#x662F;&#xFF1A;&#x4E0D;&#x5FC5;&#x4E3A;&#x4E86;&#x6307;&#x5B9A;&#x5B50;&#x7C7B;&#x578B;&#x7684;&#x539F;&#x578B;&#x800C;&#x8C03;&#x7528;&#x7236;&#x7C7B;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x7684;&#x65E0;&#x975E;&#x5C31;&#x662F;&#x7236;&#x7C7B;&#x539F;&#x578B;&#x7684;&#x4E00;&#x4E2A;&#x526F;&#x672C;&#x800C;&#x5DF2;&#x3002;&#x672C;&#x8D28;&#x4E0A;&#xFF0C;&#x5C31;&#x662F;&#x4F7F;&#x7528;&#x5BC4;&#x751F;&#x5F0F;&#x7EE7;&#x627F;&#x6765;&#x7EE7;&#x627F;&#x7236;&#x7C7B;&#x7684;prototype&#xFF0C;&#x7136;&#x540E;&#x518D;&#x5C06;&#x7ED3;&#x679C;&#x6307;&#x5B9A;&#x7ED9;&#x5B50;&#x7C7B;&#x7684;prototype&#x3002;</p><p>&#x5BC4;&#x751F;&#x7EC4;&#x5408;&#x5F0F;&#x7EE7;&#x627F;&#x7684;&#x57FA;&#x672C;&#x6A21;&#x578B;&#x5982;&#x4E0B;&#xFF1A;</p><pre><code>function inheritPrototype(SubType, SuperType) {
    var prototype = object(SuperType.prototype);        // &#x521B;&#x5EFA;&#x5BF9;&#x8C61;
    prototype.constructor = SubType;    // &#x589E;&#x5F3A;&#x5BF9;&#x8C61;
    SubType.prototype = prototype;      // &#x6307;&#x5B9A;&#x5BF9;&#x8C61;
    
}</code></pre><p>&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x5B8C;&#x6574;&#x7684;&#x5BC4;&#x751F;&#x7EC4;&#x5408;&#x5F0F;&#x7EE7;&#x627F;&#xFF1A;</p><pre><code>function object(o) {
  function F() { }
  F.prototype = o;
  return new F();
}

function inheritPrototype(SubType, SuperType) {
  var prototype = object(SuperType.prototype);        // &#x521B;&#x5EFA;&#x5BF9;&#x8C61;
  prototype.constructor = SubType;    // &#x589E;&#x5F3A;&#x5BF9;&#x8C61;
  SubType.prototype = prototype;      // &#x6307;&#x5B9A;&#x5BF9;&#x8C61; 
}

// &#x7236;&#x7C7B;
function SuperType(name) {
  this.name = name;
  this.colors = [&quot;red&quot;, &quot;blue&quot;, &quot;green&quot;];
}

SuperType.prototype.sayName = function () {
  console.log(this.name);
};

// &#x5B50;&#x7C7B;
function SubType(name, age) {
  // &#x7EE7;&#x627F;&#x7236;&#x7C7B;&#x5B9E;&#x4F8B;&#x5C5E;&#x6027;
  SuperType.call(this, name);

  // &#x5B50;&#x7C7B;&#x5B9E;&#x4F8B;&#x5C5E;&#x6027;
  this.age = age;
}

// &#x7EE7;&#x627F;&#x7236;&#x7C7B;&#x65B9;&#x6CD5;
inheritPrototype(SubType, SuperType);

// &#x5B50;&#x7C7B;&#x65B9;&#x6CD5;
SubType.prototype.sayAge = function () {
  console.log(this.age);
};

// &#x5B9E;&#x4F8B;
var instance1 = new SubType(&apos;Tom&apos;, 20);
instance1.colors.push(&apos;black&apos;);
instance1.sayAge();                                   // 20
instance1.sayName();                                  // &quot;Tom&quot;
console.log(instance1.colors);                        // [&quot;red&quot;, &quot;blue&quot;, &quot;green&quot;, &quot;black&quot;]

var instance2 = new SubType(&apos;Peter&apos;, 30);
instance2.sayAge();                                   // 30
instance2.sayName();                                  // &quot;Peter&quot;
console.log(instance2.colors);                        // [&quot;red&quot;, &quot;blue&quot;, &quot;green&quot;]</code></pre><p>&#x5BC4;&#x751F;&#x7EC4;&#x5408;&#x5F0F;&#x7EE7;&#x627F;&#x7684;&#x9AD8;&#x6548;&#x7387;&#x4F53;&#x73B0;&#x5728;&#x5B83;&#x53EA;&#x8C03;&#x7528;&#x4E86;&#x4E00;&#x6B21;SuperType&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF0C;&#x5E76;&#x4E14;&#x56E0;&#x6B64;&#x907F;&#x514D;&#x4E86;&#x518D;SubType.prototype&#x4E0A;&#x9762;&#x521B;&#x5EFA;&#x4E0D;&#x5FC5;&#x8981;&#x7684;&#x3001;&#x591A;&#x4F59;&#x7684;&#x5C5E;&#x6027;&#x3002;&#x4E0E;&#x6B64;&#x540C;&#x65F6;&#xFF0C;&#x539F;&#x578B;&#x94FE;&#x8FD8;&#x80FD;&#x4FDD;&#x6301;&#x4E0D;&#x53D8;&#x3002;&#x56E0;&#x6B64;&#xFF0C;&#x8FD8;&#x80FD;&#x591F;&#x6B63;&#x5E38;&#x4F7F;&#x7528;instanceof&#x548C;isPrototypeOf()&#x3002;</p><p><strong>&#x5F00;&#x53D1;&#x4EBA;&#x5458;&#x666E;&#x904D;&#x8BA4;&#x4E3A;&#x5BC4;&#x751F;&#x7EC4;&#x5408;&#x5F0F;&#x7EE7;&#x627F;&#x662F;&#x5F15;&#x7528;&#x7C7B;&#x578B;&#x6700;&#x7406;&#x60F3;&#x7684;&#x7EE7;&#x627F;&#x65B9;&#x5F0F;&#x3002;</strong></p><hr><h2>ES6&#x5B9E;&#x73B0;&#x7EE7;&#x627F;</h2><pre><code>// &#x7236;&#x7C7B;
class SuperType {
  constructor(name) {
    this.name = name;
    this.colors = [&quot;red&quot;, &quot;blue&quot;, &quot;green&quot;];
  }

  sayName() {
    console.log(this.name);
  };
}

// &#x5B50;&#x7C7B;
class SubType extends SuperType {
  constructor(name, age) {
    // &#x7EE7;&#x627F;&#x7236;&#x7C7B;&#x5B9E;&#x4F8B;&#x5C5E;&#x6027;&#x548C;prototype&#x4E0A;&#x7684;&#x65B9;&#x6CD5;
    super(name);
    
    // &#x5B50;&#x7C7B;&#x5B9E;&#x4F8B;&#x5C5E;&#x6027;
    this.age = age;
  }

  // &#x5B50;&#x7C7B;&#x65B9;&#x6CD5;
  sayAge() {
    console.log(this.age);
  }
}

// &#x5B9E;&#x4F8B;
var instance1 = new SubType(&apos;Tom&apos;, 20);
instance1.colors.push(&apos;black&apos;);
instance1.sayAge();                                   // 20
instance1.sayName();                                  // &quot;Tom&quot;
console.log(instance1.colors);                        // [&quot;red&quot;, &quot;blue&quot;, &quot;green&quot;, &quot;black&quot;]

var instance2 = new SubType(&apos;Peter&apos;, 30);
instance2.sayAge();                                   // 30
instance2.sayName();                                  // &quot;Peter&quot;
console.log(instance2.colors);                        // [&quot;red&quot;, &quot;blue&quot;, &quot;green&quot;]</code></pre><p>&#x7528;ES6&#x7684;&#x8BED;&#x6CD5;&#x6765;&#x5B9E;&#x73B0;&#x7EE7;&#x627F;&#x975E;&#x5E38;&#x7684;&#x7B80;&#x5355;&#xFF0C;&#x4E0B;&#x9762;&#x662F;&#x628A;&#x8FD9;&#x6BB5;&#x4EE3;&#x7801;&#x653E;&#x5230;Babel&#x91CC;&#x8F6C;&#x7801;&#x7684;&#x7ED3;&#x679C;&#x56FE;&#x7247;&#xFF1A;</p><p><span class="img-wrap"><img data-src="http://p54fus2hp.bkt.clouddn.com/blog/20180828/babel-es6-extend.png" src="https://static.alili.techhttp://p54fus2hp.bkt.clouddn.com/blog/20180828/babel-es6-extend.png" alt="babel-es6-extend" title="babel-es6-extend"></span></p><p>&#x53EF;&#x4EE5;&#x770B;&#x5230;&#xFF0C;&#x5E95;&#x5C42;&#x5176;&#x5B9E;&#x4E5F;&#x662F;&#x7528;&#x5BC4;&#x751F;&#x7EC4;&#x5408;&#x5F0F;&#x7EE7;&#x627F;&#x6765;&#x5B9E;&#x73B0;&#x7684;&#x3002;</p><h2>&#x603B;&#x7ED3;</h2><p>ES5&#x5B9E;&#x73B0;&#x7EE7;&#x627F;&#x6709;6&#x79CD;&#x65B9;&#x5F0F;&#xFF1A;</p><ol><li>&#x539F;&#x578B;&#x94FE;&#x7EE7;&#x627F;</li><li>&#x501F;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7EE7;&#x627F;</li><li>&#x7EC4;&#x5408;&#x7EE7;&#x627F;</li><li>&#x539F;&#x578B;&#x5F0F;&#x7EE7;&#x627F;</li><li>&#x5BC4;&#x751F;&#x5F0F;&#x7EE7;&#x627F;</li><li>&#x5BC4;&#x751F;&#x7EC4;&#x5408;&#x5F0F;&#x7EE7;&#x627F;</li></ol><p>&#x5BC4;&#x751F;&#x7EC4;&#x5408;&#x5F0F;&#x7EE7;&#x627F;&#x662F;&#x5927;&#x5BB6;&#x516C;&#x8BA4;&#x7684;&#x6700;&#x597D;&#x7684;&#x5B9E;&#x73B0;&#x5F15;&#x7528;&#x7C7B;&#x578B;&#x7EE7;&#x627F;&#x7684;&#x65B9;&#x6CD5;&#x3002;</p><p>ES6&#x65B0;&#x589E;class&#x548C;extends&#x8BED;&#x6CD5;&#xFF0C;&#x7528;&#x6765;&#x5B9A;&#x4E49;&#x7C7B;&#x548C;&#x5B9E;&#x73B0;&#x7EE7;&#x627F;&#xFF0C;&#x5E95;&#x5C42;&#x4E5F;&#x662F;&#x91C7;&#x7528;&#x4E86;&#x5BC4;&#x751F;&#x7EC4;&#x5408;&#x5F0F;&#x7EE7;&#x627F;&#x3002;</p><p>&#x9644;&#x56FE;&#xFF1A;</p><p><span class="img-wrap"><img data-src="http://p54fus2hp.bkt.clouddn.com/blog/20180829/JavaScript_prototype.png" src="https://static.alili.techhttp://p54fus2hp.bkt.clouddn.com/blog/20180829/JavaScript_prototype.png" alt="prototype" title="prototype"></span></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript实现继承

## 原文链接
[https://segmentfault.com/a/1190000016184431](https://segmentfault.com/a/1190000016184431)

