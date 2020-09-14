---
title: 'JS所有内置对象属性和方法汇总' 
date: 2018-12-29 2:30:10
hidden: true
slug: vstfv6kk4y
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>对象什么的，程序员可是有很多呢...</p></blockquote>
<h1>JS三大对象</h1>
<p>对象，是任何一个开发者都无法绕开和逃避的话题，她似乎有些深不可测，但如此伟大和巧妙的存在，一定值得你去摸索、发现、征服。</p>
<p>我们都知道，JavaScript有3大对象，分别是<code>本地对象</code>、<code>内置对象</code>和<code>宿主对象</code>。</p>
<p>在此引用ECMA-262（ECMAScript的制定标准）对于他们的定义：</p>
<ul>
<li>
<p>本地对象</p>
<ul>
<li>与宿主无关，独立于宿主环境的ECMAScript实现提供的对象。</li>
<li>简单来说，本地对象就是 ECMA-262 定义的类（引用类型）。</li>
<li>这些引用类型在运行过程中需要通过new来创建所需的实例对象。</li>
<li>包含：<code>Object</code>、<code>Array</code>、<code>Date</code>、<code>RegExp</code>、<code>Function</code>、<code>Boolean</code>、<code>Number</code>、<code>String</code>等。</li>
</ul>
</li>
<li>
<p>内置对象</p>
<ul>
<li>与宿主无关，独立于宿主环境的ECMAScript实现提供的对象。</li>
<li>在 ECMAScript 程序开始执行前就存在，本身就是实例化内置对象，开发者无需再去实例化。</li>
<li>内置对象是本地对象的子集。</li>
<li>包含：<code>Global</code>和<code>Math</code>。</li>
<li>ECMAScript5中增添了<code>JSON</code>这个存在于全局的内置对象。</li>
</ul>
</li>
<li>
<p>宿主对象</p>
<ul>
<li>由 ECMAScript 实现的宿主环境提供的对象，包含两大类，一个是宿主提供，一个是自定义类对象。</li>
<li>所有非本地对象都属于宿主对象。</li>
<li>对于嵌入到网页中的JS来说，其宿主对象就是浏览器提供的对象，浏览器对象有很多，如<code>Window</code>和<code>Document</code>等。</li>
<li>所有的<code>DOM</code>和<code>BOM</code>对象都属于宿主对象。</li>
</ul>
</li>
</ul>
<blockquote>
<p>关于专业名词：本地对象也经常被叫做原生对象或内部对象，包含Global和Math在内的内置对象在《JavaScript高级程序设计》里也被叫做单体内置对象，很多时候，干脆也会直接把本地对象和内置对象统称为“内置对象”，也就是说除了宿主对象，剩下的都是ECMAScript的内部的“内置”对象。</p>
<p>声明：本文也将采取这种统称为“内置对象”的方式，比如文章标题。</p>
</blockquote>
<h1>Object类型</h1>
<h2>属性</h2>
<p><strong>constructor</strong><br><strong>prototype</strong></p>
<h2>实例方法</h2>
<p><strong>1、toString()</strong></p>
<p>功能：返回当前对象的字符串形式，返回值为String类型。</p>
<p>示例：</p>
<pre><code>[1,'2',true].toString(); //"1,2,true"
(new Date()).toString(); //"Sun Sep 24 2017 14:52:20 GMT+0800 (CST)"
({name:'ryan'}).toString(); //"[object Object]"</code></pre>
<blockquote>
<p>该方法属于Object对象，由于所有的对象都"继承"了Object的对象实例，因此几乎所有的实例对象都可以使用该方法。</p>
<p>JavaScript的许多内置对象都重写了该函数，以实现更适合自身的功能需要。</p>
</blockquote>
<p><strong>2、toLocaleString</strong></p>
<p>功能：返回当前对象的"本地化"字符串形式，以便于当前环境的用户辨识和使用，返回值为String类型。</p>
<p>示例：</p>
<pre><code>(1234567).toLocaleString(); //"1,234,567"
(6.37588).toLocaleString(); //"6.376"
(new Date()).toLocaleString(); //"2017/9/24 下午2:58:21"</code></pre>
<p><strong>3、valueOf()</strong></p>
<p>功能：返回指定对象的原始值。</p>
<blockquote><p>JavaScript的许多内置对象都重写了该函数，以实现更适合自身的功能需要。因此，不同类型对象的valueOf()方法的返回值和返回值类型均可能不同。</p></blockquote>
<h2>静态方法</h2>
<p><strong>1、Object.assign(target, ...sources)</strong></p>
<p>功能：把一个或多个源对象的可枚举、自有属性值复制到目标对象中，返回值为目标对象。<br>参数：</p>
<ul>
<li>目标对象（必须）</li>
<li>至少一个源对象（可选）</li>
</ul>
<p>示例：</p>
<pre><code>var target = {
    a:1
};
var source1 = {
    b:2
};
var source2 = {
    c:function(){
      console.log('c');
    }
};
Object.assign(target,source1,source2);
console.log(target); //{a: 1, b: 2, c: ƒ}</code></pre>
<p>拓展：自定义实现一个assign方法</p>
<pre><code>//自定义一个assign方法
  function copy(target){
    if(target == null){
      throwError('出错：Cannot convert undefined or null to object');
    }
    var target = new Object(target);
    for(var i = 1;i &lt; arguments.length;i ++){
      var source = arguments[i];
      for(var key in source){
        if(source.hasOwnProperty(key)){
          //若当前属性为源对象自有属性，则拷贝至目标对象
          target[key] = source[key];
        }
      }
    }
    return target;
  }</code></pre>
<p><strong>2、Object.create(proto [,propertiesObject])</strong> </p>
<p>功能：创建一个对象，其原型为prototype，同时可添加多个属性。 <br>参数：</p>
<ul>
<li>proto(必须)：原型对象，可以为null表示没有原型。</li>
<li>descriptors(可选)：包含一个或多个属性描述符的对象。</li>
</ul>
<p>propertiesObject参数详解：</p>
<ul>
<li>
<p>数据属性</p>
<ul>
<li>value：值</li>
<li>writable：是否可修改属性的值</li>
<li>configurable：是否可通过delete删除属性，重新定义</li>
<li>enumerable：是否可for-in枚举</li>
</ul>
</li>
<li>
<p>访问属性</p>
<ul>
<li>get()：访问</li>
<li>set()：设置</li>
</ul>
</li>
</ul>
<p>示例：</p>
<pre><code>function Person(name){
    this.name = name;
  }
  Person.prototype.say = function(){console.log('my name is ' + this.name +',my age is ' + this.age);}

  var person = new Person('ryan');
  var p = Object.create(person,{
    age:{
      value: 23,
      writable: true,
      configurable: true
    },
    sex:{
      configurable: true,
      get:function(){return sex + '士';},
      set:function(value){sex = value;}
    }
  });
  
  p.sex = '男';
  p.say(); //'my name is ryan,my age is 23'
  console.log(p.sex); //'男士'
  p.sex = '女';
  console.log(p.sex); //'女士'</code></pre>
<blockquote><p>总结：Object.create(proto [,propertiesObject]) 是E5中提出的一种新的对象创建方式，第一个参数是要继承的原型，如果不是一个子函数，可以传一个null，第二个可选参数是对象的属性描述符。</p></blockquote>
<p><strong>3、Object.defineProperty(obj, prop, descriptor)</strong></p>
<p>功能：在一个对象上定义一个新属性或修改一个现有属性，并返回该对象。</p>
<p>参数：</p>
<ul>
<li>obj（必须）：被操作的目标对象</li>
<li>prop（必须）：被定义或修改的目标属性</li>
<li>descriptor（必须）：属性的描述符</li>
</ul>
<p>示例：</p>
<pre><code>var obj = {};
Object.defineProperty(obj,'name',{
    writable: true,
    configurable: true,
    enumerable: false,
    value: '张三'
});

console.log(obj.name); //'张三'
for(var key in obj){
    console.log(obj[key]); //无结果
}</code></pre>
<blockquote><p>总结：在参数 descriptor中，如果不指定configurable, writable, enumerable ，则这些属性默认值为false，如果不指定value, get, set，则这些属性默认值为undefined。</p></blockquote>
<p><strong>4、Object.defineProperties(obj, props)</strong></p>
<p>功能：在一个对象上定义一个或多个新属性或修改现有属性，并返回该对象。</p>
<p>参数：</p>
<ul>
<li>obj（必须）：被操作的目标对象</li>
<li>props（必须）：该对象的一个或多个键值对定义了将要为对象添加或修改的属性的具体配置</li>
</ul>
<p>示例：</p>
<pre><code>var obj = {};
Object.defineProperties(obj,{
    name:{
      writable: true,
      configurable: true,
      enumerable: false,
      value: '张三'
    },
    age:{
      writable: true,
      configurable: true,
      enumerable: true,
      value: 23
    }
});

console.log(obj.name); //'张三'
console.log(obj.age); //23
for(var key in obj){
    console.log(obj[key]); //23
}</code></pre>
<p><strong>5、Object.seal(obj) / Object.isSealed(obj)</strong><br>功能：密封对象，阻止其修改现有属性的配置特性，即将对象的所有属性的configurable特性设置为false（也就是全部属性都无法重新配置，唯独可以把writable的值由true改为false，即冻结属性），并阻止添加新属性，返回该对象。</p>
<p>参数：</p>
<ul><li>obj（必须）：被密封的对象</li></ul>
<p>示例：</p>
<pre><code>var obj = {name:'张三'};

Object.seal(obj);
console.log(Object.isSealed(obj)); //true

obj.name = '李四'; //修改值成功
console.log(obj.name); //'李四'
obj.age = 23; //无法添加新属性
console.log(obj.age); //undefined

Object.defineProperty(obj,'name',{ 
    writable: true,
    configurable: true,
    enumerable: true
}); //报错：Cannot redefine property: name</code></pre>
<p>补充：Object.isSealed(obj)用于判断目标对象是否被密封，返回布尔值。</p>
<blockquote><p>将一个对象密封后仅能保证该对象不被扩展且全部属性不可重配置，但是原属性值却是可以被修改的。</p></blockquote>
<p><strong>6、Object.freeze(obj) / Object.isFrozen(obj)</strong></p>
<p>功能：完全冻结对象，在seal的基础上，属性值也不可以修改，即每个属性的wirtable也被设为false。</p>
<p>参数：</p>
<ul><li>obj（必须）：被冻结的对象</li></ul>
<p>示例：</p>
<pre><code>var obj = {name:'张三'};

Object.freeze(obj);
console.log(Object.isFrozen(obj)); //true

obj.name = '李四'; //修改值失败
console.log(obj.name); //'张三'
obj.age = 23; //无法添加新属性
console.log(obj.age); //undefined

Object.defineProperty(obj,'name',{ 
    writable: true,
    configurable: true,
    enumerable: true
}); //报错：Cannot redefine property: name</code></pre>
<p>补充：Object.isFrozen(obj)用于判断目标对象是否被冻结，返回布尔值。</p>
<p><strong>7、getOwnPropertyDescriptor(obj, prop)</strong></p>
<p>功能：获取目标对象上某自有属性的配置特性（属性描述符），返回值为配置对象。</p>
<p>参数：</p>
<ul>
<li>obj(必须)：目标对象</li>
<li>prop(必须)：目标自有属性</li>
</ul>
<p>示例：</p>
<pre><code>var obj = {};

Object.defineProperty(obj,'name',{
    writable: true,
    configurable: false,
    enumerable: true,
    value: '张三'
});

var prop = Object.getOwnPropertyDescriptor(obj,'name');
console.log(prop); //{value: "张三", writable: true, enumerable: true, configurable: false}</code></pre>
<p><strong>8、Object.getOwnPropertyNames(obj)</strong></p>
<p>功能：获取目标对象上的全部自有属性名（包括不可枚举属性）组成的数组。</p>
<p>参数：</p>
<ul><li>obj(必须)：目标对象</li></ul>
<p>示例：</p>
<pre><code>var obj = {};
obj.say = function(){};

Object.defineProperties(obj,{
    name:{
      writable: true,
      configurable: true,
      enumerable: true,
      value: '张三'
    },
    age:{
      writable: true,
      configurable: true,
      enumerable: false,
      value: 23
    }
});

var arr = Object.getOwnPropertyNames(obj);
console.log(arr); //["say", "name", "age"]</code></pre>
<p><strong>9、Object.getPrototypeOf(obj)</strong></p>
<p>功能：获取指定对象的原型，即目标对象的prototype属性的值。 </p>
<p>参数：</p>
<ul><li>obj(必须)：目标对象</li></ul>
<p>示例：</p>
<pre><code>function Person(name){
    this.name = name;
}

var person = new Person('张三');
var p = Object.create(person); //对象p的原型为person
console.log(p); //Person {}

var __ptoto__ = Object.getPrototypeOf(p);
console.log(__ptoto__); //Person {name: "张三"}</code></pre>
<p><strong>10、Object.setPrototypeOf(obj, proto)</strong></p>
<p>功能：设置目标对象的原型为另一个对象或null，返回该目标对象。</p>
<p>参数：</p>
<ul>
<li>obj(必须)：目标对象</li>
<li>proto(必须)：原型对象</li>
</ul>
<p>示例：</p>
<pre><code>var obj = {a:1};
var proto = {};
Object.setPrototypeOf(obj,proto); //设置obj对象的原型

proto.b = 2; //为该原型对象添加属性
proto.c = 3;

console.log(obj.a); //1
console.log(obj.b); //2
console.log(obj.c); //3</code></pre>
<p>解析：上述代码将proto对象设为obj对象的原型，所以从obj对象上可以顺利读取到proto 对象的属性，也就是原型链上的属性。</p>
<blockquote><p>Object.setPrototypeOf()方法的作用与__proto__相同，用来设置当前对象的原型指向的对象(prototype)。它是 ES6 正式推荐的设置原型对象的方法。</p></blockquote>
<p><strong>11、Object.keys(obj)</strong></p>
<p>功能：获取目标对象上所有可枚举属性组成的数组。</p>
<p>参数：</p>
<ul><li>obj(必须)：目标对象</li></ul>
<p>示例：</p>
<pre><code>var person = {
    type:'person',
    say:function(){}
  };
  //以person对象为原型，创建obj对象
  var obj = Object.create(person,{
    sex:{
      writable: true,
      configurable: true,
      enumerable: false, //设置sex属性为不可枚举
      value: 'male'
    },
    age:{
      writable: true,
      configurable: true,
      enumerable: true, //设置age属性为可枚举
      value: 23
    }
  });

  obj.name = '张三'; //自定义属性name默认为可枚举
  console.log(obj.propertyIsEnumerable('name')); //true，成功验证name属性为可枚举

  //用for-in可获取obj上全部可枚举的属性（包括自有和原型链上的）
  var arr = [];
  for(var key in obj){
    arr.push(key);
  }
  console.log(arr); //["age", "name", "type", "say"]

  //用Object.keys()可获取obj上全部可枚举的自有属性
  console.log(Object.keys(obj)); // ["age", "name"]</code></pre>
<blockquote>
<p>总结：Object.keys(obj)方法获取的集合和for-in遍历获取的不同在于，Object.keys()只获取目标对象上可枚举的自有属性，而for-in遍历会包含原型链上可枚举属性一并获取。</p>
<p>Object.keys()和Object.getOwnPropertyNames()的相同之处都是获取目标对象的自有属性，区别在于，后者会连同不可枚举的自有属性也一并获取组成数组并返回。</p>
</blockquote>
<p><strong>12、Object.preventExtensions(obj) / Object.isExtensible(obj)</strong></p>
<p>功能：使某一对象不可扩展，也就是不能为其添加新属性。 </p>
<p>参数：</p>
<ul><li>obj(必须)：目标对象</li></ul>
<p>补充：Object.isExtensible(obj)方法用于判断一个对象是否可扩展，即是否可以添加新属性。</p>
<p>示例：</p>
<pre><code>var obj = {
  name: '张三'
};

Object.preventExtensions(obj); //阻止obj的可扩展性
console.log(Object.isExtensible(obj)); //false，表明obj对象为不可扩展，即阻止成功

obj.age = 23; //默认添加失败
console.log(obj.age); //undefined</code></pre>
<h1>Array类型</h1>
<h2>Array 对象属性</h2>
<p><strong>1、length</strong></p>
<p>设置或返回数组中元素的数目。</p>
<blockquote><p>设置 length 属性可改变数组的大小。如果设置的值比其当前值小，数组将被截断，其尾部的元素将丢失。如果设置的值比它的当前值大，数组将增大，新的元素被添加到数组的尾部，它们的值为 undefined。</p></blockquote>
<p><strong>2、constructor</strong></p>
<p>返回对创建此对象的数组函数的引用。</p>
<p><strong>3、prototype</strong></p>
<p>使您有能力向对象添加属性和方法。</p>
<h2>Array 对象方法</h2>
<p><strong>1、concat()</strong></p>
<ul>
<li>用于连接两个或多个数组，该方法不会改变现有的数组，而是返回被连接数组的一个副本。</li>
<li>如果要进行 concat() 操作的参数是数组，那么添加的是数组中的元素，而不是数组。</li>
</ul>
<p><strong>2、join()</strong></p>
<ul>
<li>把数组中的所有元素放入一个字符串，元素是通过指定的分隔符进行分隔的。</li>
<li>若省略了分隔符参数，则使用逗号作为分隔符。</li>
</ul>
<p><strong>3、push()</strong></p>
<ul><li>向数组的末尾添加一个或多个元素，并返回新的数组长度。</li></ul>
<p><strong>4、pop()</strong></p>
<ul>
<li>用于删除数组的最后一个元素，把数组长度减1，并返回被删除元素。</li>
<li>如果数组已经为空，则 pop() 不改变数组，并返回 undefined。</li>
</ul>
<p><strong>5、shift()</strong></p>
<ul>
<li>用于把数组的第一个元素从其中删除，并返回被移除的这个元素。</li>
<li>如果数组是空的，那么 shift() 方法将不进行任何操作，返回 undefined。</li>
<li>该方法是直接修改原数组。</li>
</ul>
<p><strong>6、unshift()</strong></p>
<ul>
<li>向数组的开头添加一个或更多元素，并返回新的数组长度。</li>
<li>该方法是直接修改原数组。</li>
</ul>
<p><strong>7、reverse()</strong></p>
<ul>
<li>用于颠倒数组中元素的顺序。</li>
<li>该方法会直接修改原数组，而不会创建新数组。</li>
</ul>
<p><strong>8、sort()</strong></p>
<ul>
<li>用于对数组的元素进行排序。</li>
<li>该排序直接修改原数组，不生成副本。</li>
<li>该方法接受一个可选参数，若未使用参数，将按字母顺序对数组元素进行排序，说得更精确点，是按照字符编码的顺序进行排序。要实现这一点，首先应把数组的元素都转换成字符串（如有必要），以便进行比较。</li>
<li>
<p>如果想按照其他标准进行排序，就需要提供比较函数，该函数要比较两个值，然后返回一个用于说明这两个值的相对顺序的数字。比较函数应该具有两个参数 a 和 b，其返回值如下：</p>
<ul>
<li>若 a 小于 b，排序后 a 应该在 b 之前，则返回一个小于 0 的值。</li>
<li>若 a 等于 b，则返回 0。</li>
<li>若 a 大于 b，则返回一个大于 0 的值。</li>
</ul>
</li>
</ul>
<p><strong>9、slice(start [,end])</strong></p>
<ul>
<li>截取原数组从start到end位置（不包含它）元素组成的子数组。</li>
<li>该方法返回一个新数组，不会修改原数组。</li>
<li>若未指定end参数，那么截取尾巴直到原数组最后一个元素（包含它）。</li>
</ul>
<p><strong>10、splice(index,howmany [,item1,item2...])</strong></p>
<ul>
<li>删除从 index 处开始的hownamy个元素，并且用可选参数列表中声明的一个或多个值来替换那些被删除的元素。</li>
<li>该方法返回的是含有被删除的元素组成的数组，若无被删元素，则返回空数组。</li>
<li>若参数只有index，那么原数组将从index开始删除直至结尾。</li>
<li>该方法直接修改原数组。</li>
</ul>
<p>map():返回一个新的Array，每个元素为调用func的结果</p>
<p>filter():返回一个符合func条件的元素数组</p>
<p>some():返回一个boolean，判断是否有元素是否符合func条件</p>
<p>every():返回一个boolean，判断每个元素是否符合func条件</p>
<p>forEach():没有返回值，只是针对每个元素调用func</p>
<p>reduce()：reduce方法有两个参数，第一个参数是一个callback，用于针对数组项的操作；第二个参数则是传入的初始值，这个初始值用于单个数组项的操作。需要注意的是，reduce方法返回值并不是数组，而是形如初始值的经过叠加处理后的操作。</p>
<h1>Date类型</h1>
<p>Date对象：封装一个时间点，提供操作时间的API。Date对象中封装的是从1970年1月1日0点至今的毫秒数。</p>
<p><strong>创建Date对象4种方式</strong></p>
<pre><code>var now = new Date(); //获取客户端的当前系统时间

var date - new Date("1994/02/04 03:23:55"); //创建自定义时间

var date = new Date(yyyy, MM, dd, hh, mm, ss); //创建自定义时间

var oldDate = new Date("1994/02/04");
var newDate = new Date(oldDate); //复制一个时间对象</code></pre>
<p><strong>日期API</strong></p>
<p>日期分量：FullYear、Month、Date、Day、Hours、Minutes、Seconds、Milliseconds。<br>每一个日期分量都有一个<code>get</code>和<code>set</code>方法（除了Day没有set方法），分别用于获取和设置时间对象。</p>
<blockquote>
<p>日期的单位及范围:</p>
<p>年FullYear (无范围)  <br>月Month (0~11, 0开始,没有12)   <br>日Date   (1~31, 和现实生活一样)     <br>星期Day  (0~6, 0是星期日,没有7)<br>时Hours   (0~23. 0开始，没有24)<br>分Minutes (0~59)<br>秒Seconds  (0~59)<br>毫秒MilliSeconds</p>
</blockquote>
<h1>RegExp类型</h1>
<h3>RegExp对象属性</h3>
<p><strong>1、global</strong></p>
<ul>
<li>描述：RegExp 对象是否具有标志 g，即全局匹配。</li>
<li>值：true或false。</li>
</ul>
<p><strong>2、ignoreCase</strong></p>
<ul>
<li>描述：RegExp 对象是否具有标志 i，即忽略大小写。</li>
<li>值：一个整数，它声明的是上一次匹配文本之后的第一个字符的位置。</li>
</ul>
<p><strong>3、lastIndex</strong></p>
<ul>
<li>描述：lastIndex用于规定下次匹配的起始位置。</li>
<li>值：true或false。</li>
</ul>
<blockquote><p>不具有标志 g 和不表示全局模式的 RegExp 对象不能使用 lastIndex 属性。</p></blockquote>
<h3>RegExp对象方法</h3>
<p><strong>1、compile()</strong></p>
<ul>
<li>compile() 方法用于在脚本执行过程中编译正则表达式。</li>
<li>compile() 方法也可用于改变和重新编译正则表达式。</li>
</ul>
<p><strong>2、exec()</strong></p>
<ul>
<li>功能：用于检索字符串中的正则表达式的匹配。</li>
<li>参数：string，必须，要检索的字符串。</li>
<li>返回值：返回一个数组，其中存放匹配的结果。如果未找到匹配，则返回值为 null。</li>
</ul>
<p><strong>3、test()</strong></p>
<ul>
<li>功能：用于检测一个字符串是否匹配某个模式。</li>
<li>参数：string，必须，要检索的字符串。</li>
<li>返回值：true或者false。</li>
</ul>
<blockquote><p>注意：支持正则表达式的 String 对象的方法有：search()、match()、replace()和split()。</p></blockquote>
<h1>Function类型</h1>
<h2>Function对象属性</h2>
<p><strong>1、arguments</strong></p>
<ul>
<li>arguments.length：获取函数实参的个数</li>
<li>arguments.callee：获取函数对象本身的引用</li>
<li>arguments.callee.length：获取函数形参的个数</li>
</ul>
<blockquote><p>Javascrip中每个函数都会有一个Arguments对象实例arguments，它引用着函数的实参，可以用数组下标的方式"[]"引用每个实际传入的参数。</p></blockquote>
<p>示例：</p>
<pre><code>function say(a,b,c){
  console.log(arguments.length); //2
  console.log(arguments[0],arguments[1]); //hello world
}
say('hello','world');</code></pre>
<h2>Function对象方法</h2>
<p><strong>1、toString()</strong></p>
<ul><li>功能：将函数体转换成对应的字符串。</li></ul>
<h1>Boolean类型</h1>
<p>常用方法：</p>
<p><strong>1、toString()</strong></p>
<ul><li>功能：根据布尔值返回字符串 "true" 或 "false"。</li></ul>
<blockquote><p>注释：在 Boolean 对象被用于字符串环境中时，此方法会被自动调用。</p></blockquote>
<p><strong>2、valueOf()</strong></p>
<ul><li>功能：返回 Boolean 对象的原始值。</li></ul>
<h1>Number类型</h1>
<p>常用方法：</p>
<p><strong>1、toString()</strong> </p>
<p>功能：将Number数值转换为字符串，该方法接受一个可选参数基数，若省略该参数，则默认基数为10，即十进制。</p>
<pre><code>var num = 10;
console.log(num.toString(2)); //1010</code></pre>
<p><strong>2、toLocaleString()</strong><br>功能：把一个 Number 对象转换为本地格式的字符串。</p>
<p><strong>3、valueOf()</strong><br>功能：返回一个 Number 对象的基本数字值。</p>
<blockquote><p>valueOf() 方法通常由 JavaScript 在后台自动进行调用，而不是显式地处于代码中。</p></blockquote>
<h1>String类型</h1>
<h2>String对象属性</h2>
<p><strong>1、length</strong></p>
<p>功能：String 对象的 length 属性声明了该字符串中的字符数。</p>
<h2>String对象方法</h2>
<p><strong>1、charAt()</strong></p>
<ul>
<li>功能：返回指定位置的字符。</li>
<li>参数：必须，为目标字符的下标位置。</li>
</ul>
<blockquote><p>若参数 index 不在 0 与 string.length 之间，该方法将返回一个空字符串。</p></blockquote>
<p><strong>2、charCodeAt()</strong></p>
<ul>
<li>功能：返回在指定的位置的字符的 Unicode 编码。</li>
<li>参数：必须，为目标字符的下标位置。</li>
</ul>
<blockquote><p>若参数 index 不在 0 与 string.length 之间，该方法将返回NaN。</p></blockquote>
<p><strong>3、indexOf()</strong></p>
<ul>
<li>功能：检索字符串，返回指定子字符串在字符串中首次出现的位置。</li>
<li>参数1：检索目标子字符串，必须。</li>
<li>参数2：在字符串中开始检索的位置，可选。其合法取值是 0 到 stringObject.length - 1。如省略该参数，则将从字符串的首字符开始检索。</li>
</ul>
<blockquote><p>注意：indexOf() 方法对大小写敏感！<br>注意：如果要检索的字符串值没有出现，则该方法返回 -1。</p></blockquote>
<p><strong>4、lastIndexOf()</strong></p>
<ul>
<li>功能：从后向前搜索字符串，返回指定子字符串在字符串中首次出现的位置。</li>
<li>参数1：检索目标子字符串，必须。</li>
<li>参数2：在字符串中开始检索的位置，可选。其合法取值是 0 到 stringObject.length - 1。如省略该参数，则将从字符串的最后一个字符开始检索。</li>
</ul>
<p><strong>5、match()</strong></p>
<ul>
<li>功能：返回指定位置的字符。</li>
<li>参数：必须，规定要检索的字符串值或待匹配的 RegExp 对象。</li>
<li>返回值：存放匹配结果的数组。该数组的内容依赖于 regexp 是否具有全局标志 g。</li>
</ul>
<blockquote>
<p>如果 regexp 没有标志 g，那么 match() 方法就只能在 stringObject 中执行一次匹配。如果没有找到任何匹配的文本， match() 将返回 null。否则，它将返回一个数组，其中存放了与它找到的匹配文本有关的信息。该数组的第 0 个元素存放的是匹配文本，而其余的元素存放的是与正则表达式的子表达式匹配的文本。除了这些常规的数组元素之外，返回的数组还含有两个对象属性。index 属性声明的是匹配文本的起始字符在 stringObject 中的位置，input 属性声明的是对 stringObject 的引用。</p>
<p>如果 regexp 具有标志 g，则 match() 方法将执行全局检索，找到 stringObject 中的所有匹配子字符串。若没有找到任何匹配的子串，则返回 null。如果找到了一个或多个匹配子串，则返回一个数组。不过全局匹配返回的数组的内容与前者大不相同，它的数组元素中存放的是 stringObject 中所有的匹配子串，而且也没有 index 属性或 input 属性。</p>
</blockquote>
<p>示例：</p>
<pre><code>var s = 'hello21 world21';
console.log(s.match(/\d{2}/)); //[ '21', index: 5, input: 'hello21 world21' ]

var s = 'hello21 world21';
console.log(s.match(/\d{2}/g)); //[ '21', '21' ]</code></pre>
<p><strong>6、replace()</strong></p>
<ul>
<li>功能：在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串。</li>
<li>参数1：regexp/substr，必须，规定子字符串或要匹配的 RegExp 对象。</li>
<li>参数2：replacement，必须，用于替换的字符串值。</li>
<li>返回值：替换后的一个新字符串。</li>
</ul>
<p>示例：</p>
<pre><code>var s = 'hello world hello';
console.log(s.replace('hello','hi')); //hi world hello
console.log(s.replace(/hello/,'hi')); //hi world hello
console.log(s.replace(/hello/g,'hi')); //hi world hi</code></pre>
<blockquote><p>replace方法返回一个新字符串，并不会修改原字符串。</p></blockquote>
<p><strong>7、search()</strong></p>
<ul>
<li>功能：用于检索字符串中指定的子字符串，或检索与正则表达式相匹配的子字符串。</li>
<li>参数：regexp/substr，必须，规定子字符串或要匹配的 RegExp 对象。</li>
<li>返回值：原字符串中第一次匹配到目标字符串的起始位置。</li>
</ul>
<p>示例：</p>
<pre><code>var s = 'hello world hello';
console.log(s.search('hello')); //0
console.log(s.search(/hello/g)); //0
console.log(s.search(/hello2/)); //-1</code></pre>
<blockquote><p>search()方法不执行全局匹配，它将忽略标志 g。也就是说，它只匹配一次。若没匹配到结果，则返回-1。</p></blockquote>
<p><strong>8、toLowerCase() &amp; toUpperCase()</strong></p>
<ul>
<li>功能：把字符串转换为小写/大写。</li>
<li>返回值：一个新的字符串。</li>
</ul>
<p>示例：</p>
<pre><code>var s = 'Hello World';
console.log(s.toLowerCase()); //hello world
console.log(s.toUpperCase()); //HELLO WORLD
</code></pre>
<p><strong>9、concat()</strong></p>
<ul>
<li>功能：用于连接两个或多个字符串。</li>
<li>语法：stringObject.concat(stringX,stringX,...,stringX)</li>
<li>参数：</li>
<li>返回值：衔接后的一个新字符串。</li>
</ul>
<blockquote><p>concat方法不会修改原字符串。<br>stringObject.concat() 与 Array.concat() 很相似。<br>通常使用 " + " 运算符来进行字符串的连接运算通常会更简便一些。</p></blockquote>
<p>示例：</p>
<pre><code>var s1 = 'hello ';
var s2 = 'world ';
var s3 = '233';
console.log(s1.concat(s2,s3)); //hello world 233</code></pre>
<p><strong>10、split()</strong></p>
<ul>
<li>功能：用于把一个字符串分割成字符串数组，是 Array.join( ) 的逆操作。</li>
<li>参数1：separator，必须，字符串或正则表达式，从该参数指定的地方分割原字符串。</li>
<li>参数2：howmany，可选，指定返回数组的最大长度。</li>
<li>返回值：一个字符串数组。</li>
</ul>
<p>示例：</p>
<pre><code>var s = 'hi baby';
console.log(s.split('')); //[ 'h', 'i', ' ', 'b', 'a', 'b', 'y' ]
console.log(s.split(' '));  //[ 'hi', 'baby' ]
console.log(s.split('b')); //[ 'hi ', 'a', 'y' ]</code></pre>
<p><strong>11、slice()</strong></p>
<ul>
<li>功能：截取字符串的某个部分，并以新的字符串返回被提取的部分。</li>
<li>参数1：截取的起始位置，必须。</li>
<li>参数2：截取的结束位置，可选。</li>
<li>返回值：截取部分，一个新的字符串。</li>
</ul>
<blockquote><p>注意：String.slice() 与 Array.slice() 相似。<br>slice方法的两个参数接受负值，若为负数，则该参数规定的是从字符串的尾部开始算起的位置。也就是说，-1 指字符串的最后一个字符，-2 指倒数第二个字符，以此类推。<br>若未指定第二个参数，则默认截取至字符串的末尾。<br>slice方法不修改原字符串。</p></blockquote>
<p>示例：</p>
<pre><code>var s = 'hi baby';
console.log(s.slice(3)); //baby
console.log(s.slice(1,5)); //i ba
console.log(s.slice(-4)); //baby
console.log(s.slice(-4,-2)); //ba</code></pre>
<p><strong>12、substr()</strong></p>
<ul>
<li>功能：截取从指定下标开始的指定数目的字符。</li>
<li>参数1：start，必须，截取的起始位置，接受负值。</li>
<li>参数2：length，可选，截取字符串的长度，若未指定，则默认截取到原字符串的末尾。</li>
<li>返回值：截取部分，一个新的字符串。</li>
</ul>
<blockquote><p>注意：ECMAscript 没有对该方法进行标准化，因此不建议使用它。</p></blockquote>
<p>示例：</p>
<pre><code>var s = 'hi baby';
console.log(s.substr(3)); //baby
console.log(s.substr(3,2)); //ba
console.log(s.substr(-3,2)); //ab</code></pre>
<p><strong>13、substring()</strong></p>
<ul>
<li>功能：截取字符串中介于两个指定下标之间的字符。</li>
<li>参数1：start，必须，截取的起始位置。</li>
<li>参数2：end，可选，截取的结束位置，若未指定，则默认截取到原字符串的末尾。</li>
<li>返回值：截取部分，一个新的字符串。</li>
</ul>
<p>示例：</p>
<pre><code>var s = 'hi baby';
console.log(s.substring(3)); //baby
console.log(s.substring(3,5)); //ba
console.log(s.substring(5,3)); //ba
console.log(s.substring(3,3)); //''</code></pre>
<blockquote><p>注意：与 slice() 和 substr() 方法不同的是，substring() 不接受负的参数。<br>如果参数 start 与 stop 相等，那么该方法返回的一个空串。<br>如果 start 比 stop 大，那么该方法在提取子串之前会先交换这两个参数。</p></blockquote>
<h1>Global对象（全局对象）</h1>
<blockquote><p>关于全局对象：全局对象只是一个对象，而不是类。既没有构造函数，也无法实例化一个新的全局对象。</p></blockquote>
<h2>属性</h2>
<p><strong>Infinity</strong><br>代表正的无穷大的数值。</p>
<p>示例：</p>
<pre><code>console.log(6/0); //Infinity
console.log(-6/0); //-Infinity
console.log(0/0); //NaN
console.log(1.7976931348623157E+10308); //Infinity
console.log(-1.7976931348623157E+10308); //-Infinity</code></pre>
<blockquote><p>Infinity代表了超出JavaScript处理范围的数值。也就是说JS无法处理的数值都是Infinity。实践证明，JS所能处理的最大值是1.7976931348623157e+308，而最小值是5e-324。</p></blockquote>
<p><strong>NaN</strong><br>代表非数字的值。</p>
<p>示例：</p>
<pre><code>var a = Number('100');
var b = Number('hello world');

console.log(a); //100
console.log(b); //NaN
console.log(isNaN(a)); //false
console.log(isNaN(b)); //true</code></pre>
<blockquote><p>提示：请使用 isNaN() 方法来判断一个值是否是数字，原因是 NaN 与所有值都不相等，包括它自己。</p></blockquote>
<p><strong>Undefined</strong><br>代表未定义的值。</p>
<p>示例：</p>
<pre><code>var a;
var b = '';
var c = null;

console.log(a === undefined); //true
console.log(b === undefined); //false
console.log(c == undefined); //true</code></pre>
<blockquote>
<p>提示：判断一个变量是否未定义，只能用 === undefined 运算来测试，因为 == 运算符会认为 undefined 值等价于 null，即undefined == null会返回true。</p>
<p>注释：null 表示无值，而 undefined 表示一个未声明的变量，或已声明但没有赋值的变量，或一个并不存在的对象属性。</p>
</blockquote>
<h2>方法</h2>
<p><strong>1、encodeURI(URIString)</strong></p>
<p>功能：将字符串作为URI进行编码，返回值为URIstring 的副本。</p>
<p>参数：</p>
<ul><li>URIString(必须)：一个待编码的字符串。</li></ul>
<p>示例：</p>
<pre><code>console.log(encodeURI('http://www.baidu.com')); //http://www.baidu.com
console.log(encodeURI('http://www.baidu.com/my mind')); //http://www.baidu.com/my%20mind
console.log(encodeURI(',/?:@&amp;=+$#')); //,/?:@&amp;=+$#</code></pre>
<blockquote>
<p>该方法不会对 ASCII 字母和数字进行编码，也不会对这些 ASCII 标点符号进行编码： - _ . ! ~ * ' ( ) 。</p>
<p>该方法的目的是对 URI 进行完整的编码，因此对以下在 URI 中具有特殊含义的 ASCII 标点符号，encodeURI() 函数是不会进行转义的：;/?:@&amp;=+$,#</p>
<p>提示：如果 URI 组件中含有分隔符，比如 ? 和 #，则应当使用 encodeURIComponent() 方法分别对各组件进行编码。</p>
</blockquote>
<p><strong>2、encodeURIComponent(URIString)</strong></p>
<p>功能：将字符串作为URI组件进行编码，返回值为URIstring的副本。</p>
<p>该方法不会对 ASCII 字母和数字进行编码，也不会对这些 ASCII 标点符号进行编码： - _ . ! ~ * ' ( ) 。</p>
<p>其他字符（比如 ：;/?:@&amp;=+$,# 这些用于分隔 URI 组件的标点符号），都是由一个或多个十六进制的转义序列替换的。</p>
<p>参数：</p>
<ul><li>URIString(必须)：一个待编码的字符串。</li></ul>
<p>示例：</p>
<blockquote>
<p>encodeURI和encodeURIComponent的区别：</p>
<p>它们都是编码URL，唯一区别就是编码的字符范围，其中encodeURI方法不会对下列字符编码  ASCII字母、数字、~!@#$&amp;*()=:/,;?+'<br>encodeURIComponent方法不会对下列字符编码 ASCII字母、数字、~!*()'<br>所以encodeURIComponent比encodeURI编码的范围更大。<br>实际例子来说，encodeURIComponent会把 <a>http://</a>  编码成  http%3A%2F%2F 而encodeURI却不会。</p>
</blockquote>
<p>使用场景：</p>
<ul><li>当你需要编码整个URL，然后使用这个URL，则使用encodeURI。</li></ul>
<pre><code>console.log(encodeURI('http://www.baidu.com/home/some other thing'));
//编码后为：http://www.baidu.com/home/some%20other%20thing; 其中，空格被编码成了%20

//但是如果你用了encodeURIComponent
console.log(encodeURIComponent('http://www.baidu.com/home/some other thing'));
//http%3A%2F%2Fwww.baidu.com%2Fhome%2Fsome%20other%20thing 连 "/" 都被编码了，整个URL已经没法用了</code></pre>
<ul><li>当你需要编码URL中的参数时，那么使用encodeURIComponent。</li></ul>
<pre><code>var param = "http://www.baidu.com/home/"; //param为参数
param = encodeURIComponent(param);
var url = "http://www.baidu.com?next=" + param;
console.log(url) //'http://www.baidu.com?next=http%3A%2F%2Fwww.baidu.com%2Fhome%2F'
//显然，参数中的 "/" 被编码了，而如果用encodeURI肯定要出问题，因为后面的/是需要编码的。</code></pre>
<p>补充：相应的，存在decodeURI()和decodeURIComponent是用来解码的，逆向操作。</p>
<p><strong>3、parseInt(string,radix)</strong></p>
<p>功能：解析一个字符串，并返回一个整数。</p>
<p>参数：</p>
<ul>
<li>string(必须)：待解析的字符串</li>
<li>radix(可选)：表示要解析的数字的基数。该值介于 2 ~ 36 之间。<br>如果省略该参数或其值为 0，则数字将以 10 为基础来解析。如果它以 “0x” 或 “0X” 开头，将以 16 为基数。如果该参数小于 2 或者大于 36，则 parseInt() 将返回 NaN。</li>
</ul>
<p>示例：</p>
<pre><code>console.log(parseInt('10')); //10
console.log(parseInt('11',9)); //10 (9+1)
console.log(parseInt('11',2)); //3 (2+1)
console.log(parseInt('17',8)); //15 (8+7)
console.log(parseInt('1f',16)); //31 (16+15)
console.log(parseInt('010')); //10
console.log(parseInt('0x0011')); //17</code></pre>
<p><strong>4、parseFloat()</strong></p>
<p>功能：解析一个字符串，并返回一个浮点数。<br>该函数指定字符串中的首个字符是否是数字。如果是，则对字符串进行解析，直到到达数字的末端为止。</p>
<p>参数：</p>
<ul><li>string(必须)：待解析的字符串</li></ul>
<p>示例：</p>
<pre><code>console.log(parseFloat('10')); //10
console.log(parseFloat('10.00')); //10 
console.log(parseFloat('10.33')); //10.33
console.log(parseFloat(' 60 ')); //60 首尾的空格会忽略
console.log(parseFloat('23 34 45')); //23 中间的空格不会忽略，会中断
console.log(parseFloat('23 years')); //23
console.log(parseFloat('i am 23')); //NaN</code></pre>
<blockquote><p>提示：开头和结尾的空格是允许的。如果字符串的第一个字符不能被转换为数字，那么 parseFloat() 会返回 NaN。如果只想解析数字的整数部分，请使用 parseInt() 方法。</p></blockquote>
<p><strong>5、isFinite(number)</strong></p>
<p>功能：用于检查其参数是否是无穷大。</p>
<p>参数：</p>
<ul><li>number(必须)：待检测数字。<br>如果 number 是有限数字（或可转换为有限数字），那么返回 true。否则，如果 number 是 NaN（非数字），或者是正、负无穷大的数，则返回 false。</li></ul>
<p>示例：</p>
<pre><code>console.log(isFinite(123)); //true
console.log(isFinite(-1.23)); //true
console.log(isFinite(5-2)); //true
console.log(isFinite(0)); //true
console.log(isFinite(0/0)); //false
console.log(isFinite('Hello')); //false</code></pre>
<p><strong>6、isNaN(number)</strong></p>
<p>功能：用于检查其参数是否为非数字值。</p>
<p>参数：</p>
<ul><li>number(必须)：待检测数字。<br>如果 number 是非数字值 NaN（或者能被转换成NaN），返回 true，否则返回 false。</li></ul>
<p>示例：</p>
<pre><code>console.log(isNaN(123)); //false
console.log(isNaN(-1.23)); //false
console.log(isNaN(5-2)); //false
console.log(isNaN(0)); //false
console.log(isNaN(0/0)); //true
console.log(isNaN('Hello')); //true</code></pre>
<blockquote><p>提示：isNaN() 函数通常用于检测 parseFloat() 和 parseInt() 的结果，以判断它们表示的是否是合法的数字。当然也可以用 isNaN() 函数来检测算数错误，比如用 0 作除数的情况。</p></blockquote>
<p><strong>7、Number(object)</strong></p>
<p>功能：把对象的值转换为数字。</p>
<p>参数：</p>
<ul><li>object(必须)：待转换的对象。 <br>如果参数是 Date 对象，Number() 返回从1970年1月1日至今的毫秒数，即时间戳。如果对象的值无法转换为数字，那么 Number() 函数返回 NaN。</li></ul>
<p>示例：</p>
<pre><code>console.log(Number(new Boolean(true))); //1
console.log(Number(new Boolean(false))); //0
console.log(Number(new Date())); //1506266494726
console.log(Number(new String('999'))); //999
console.log(Number(new String('999 888'))); //NaN</code></pre>
<p><strong>8、String(object)</strong></p>
<p>功能：把对象的值转换为字符串。</p>
<p>参数：</p>
<ul><li>object(必须)：待转换的对象。</li></ul>
<p>示例：</p>
<pre><code>console.log(String(new Boolean(true))); //'true'
console.log(String(new Boolean(false))); //'false'
console.log(String(new Date())); //'Sun Sep 24 2017 23:25:43 GMT+0800 (CST)'
console.log(String(new String('999'))); //'999'
console.log(String(new String('999 888'))); //'999 888'
console.log(String(12345)); //'12345'</code></pre>
<h1>Math对象</h1>
<p>常用方法：</p>
<pre><code>Math.abs(); //取绝对值
Math.ceil(); //向上取整
Math.floor(); //向下取整
Math.round(); //四舍五入取整
Math.random(); //生成0~1间的随机数(&gt;0)
Math.max(x,y); //取x、y中较大的那个
Math.min(x,y); //取x、y中较小的那个</code></pre>
<h1>JSON对象</h1>
<p>我们常说的对象字面量其实不是JSON对象，但是有真正的JSON对象。</p>
<p>两者完全不一样概念，在新版的浏览器里JSON对象已经被原生的内置对象了，目前有2个静态方法：JSON.parse用来将JSON字符串反序列化成对象，JSON.stringify用来将对象序列化成JSON字符串。</p>
<p>老版本的浏览器不支持这个对象，但你可以通过json2.js来实现同样的功能。</p>
<h2>JSON对象方法</h2>
<p><strong>1、JSON.parse()</strong></p>
<ul>
<li>功能：将字符串反序列化成对象</li>
<li>参数：JSON字符串</li>
<li>返回值：对象</li>
</ul>
<p>示例：</p>
<pre><code>var jsonString = '{"name":"ryan"}'; //JSON字符串（比如从AJAX获取字符串信息）
var obj = JSON.parse(jsonString); //将字符串反序列化成对象
console.log(obj); //{ name: 'ryan' }
console.log(obj.name == 'ryan'); //true</code></pre>
<p><strong>2、JSON.stringify()</strong></p>
<ul>
<li>功能：将一个对象解析为JSON字符串</li>
<li>参数：对象</li>
<li>返回值：JSON字符串</li>
</ul>
<p>示例：</p>
<pre><code>var obj = {name:'ryan',age:23};
var jsonString = JSON.stringify(obj);
console.log(jsonString); //'{"name":"ryan","age":23}'</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JS所有内置对象属性和方法汇总

## 原文链接
[https://segmentfault.com/a/1190000011467723](https://segmentfault.com/a/1190000011467723)

