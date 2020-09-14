---
title: 'ES6系列文章 对象字面量' 
date: 2018-12-29 2:30:10
hidden: true
slug: reupssqwfbn
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVWd8N?w=320&amp;h=235" src="https://static.alili.tech/img/bVWd8N?w=320&amp;h=235" alt="http://oka16ee7n.bkt.clouddn.com/object_literal.png" title="http://oka16ee7n.bkt.clouddn.com/object_literal.png"></span></p>
<p>ECMAScript6使得声明对象字面量更加简单，提供了属性简写和方法简写功能，属性名计算的新特性。</p>
<pre><code class="js">function getInfo(name, age, weight) {
    return {
        // 如果属性名和属性值同名可以利用、es6的属性简写
        name,  // 等同于 make: make
        age, // 等同于 model: model
        weight, // 等同于 value: value

        // ES6的属性名是可计算的
        ['over' + weight]: true,

        // 对象方法名简写可以省略 function 关键字
        descripte() {
            console.log(name, age, weight);
        }
    };
}

let person = getInfo('Kia', 27, 400);
console.log(person);// {name: "Kia", age: 27, weight: 400, over400: true, descripte: ƒ}</code></pre>
<p>如果可以理解上述三个新特性，可以不必往下阅读。下面的文字仅提供给还有疑问的朋友。</p>
<h2>属性简写</h2>
<p>在 ES5及以前的版本中，对象字面量只支持键值对集合。实际业务中，对象字面量的初始化会有一定的代码重复。</p>
<pre><code class="js">//ES5
function createPeople(name, age) {
    return {
        name: name,
        age: age
    };
}</code></pre>
<p><code>createPeople</code>函数用来创建一个People的对象，可以看到上面的代码的 <code>name</code>和<code>age</code>分别书写了两次，有些麻烦。在ES6中通过使用属性简写特性可以消除这种属性名称和局部变量之间的重复书写,当对象的属性和变量同名时，可以不必再写冒号和值。</p>
<pre><code class="js">function createPeople(name, age) {
    return {
        name,
        age
    };
}</code></pre>
<h2>方法名简写</h2>
<p>ES5中若为对象添加方法必须指定方法名称，并完整地定义函数来实现。</p>
<pre><code class="js">var people = {
    name: 'xixi',
    sayName: function () {
        console.log(this.name);
    }
};</code></pre>
<p>ES6的语法更简洁，消除了冒号和方法名。</p>
<pre><code class="js">let people = {
    name: 'xixi',
    sayName() {
        console.log(this.name);
    }
};
people.sayName();// xixi</code></pre>
<h2>属性可计算</h2>
<pre><code class="js">let lastName = 'last name';
let person = {
    [lastName]: 'yuan'
};
console.log(person[lastName]);// yuan</code></pre>
<h2>总结</h2>
<p>对象字面量扩展的3个新特性介绍完毕，大家可以回到文章开头检查一下自己是否掌握了本小结内容。</p>
<h2>refs</h2>
<p>深入理解ES6<br><a href="https://www.eventbrite.com/engineering/learning-es6-enhanced-object-literals/" rel="nofollow noreferrer">learning-es6-enhanced-object-literals</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES6系列文章 对象字面量

## 原文链接
[https://segmentfault.com/a/1190000011455037](https://segmentfault.com/a/1190000011455037)

