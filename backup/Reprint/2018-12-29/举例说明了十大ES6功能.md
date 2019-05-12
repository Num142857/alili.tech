---
title: '举例说明了十大ES6功能' 
date: 2018-12-29 2:30:10
hidden: true
slug: hdq6eu9y8v
categories: [reprint]
---

{{< raw >}}

                    
<p>虽然ES6规范不是最近才发布，但我认为很多开发人员仍然不太熟悉。 主要原因是在规范发布之后，Web浏览器的支持可能很差。 目前，规范发布已经超过2年了，现在很多浏览器对ES6支持良好。 即使您（或您的客户）不使用最新版本的Web浏览器，也可以使用转换器（如Babel），在应用程序的构建过程中将ES6转换为ES5。 这意味着要向前迈出一步，学习ES6。</p>
<p>在本文中，我将尽量简单地介绍最有用的功能。 在本教程之后，您将拥有基本技能，并能够将其应用于实际项目中。 不要将其视为指南或文件。 我的目标是鼓励你深入挖掘并熟悉ES6。</p>
<h1>1. const和let关键字</h1>
<p><strong>const</strong>使您能够定义常量（最终变量！）。 <strong>let</strong>让你定义变量。 这很棒，但是JavaScript中没有变量吗？ 是有的，但是由<strong>var</strong>声明的变量具有函数范围，并被提升到顶部。 这意味着在声明之前可以使用一个变量。 让变量和常量具有块范围（由{}包围），在声明之前不能使用。</p>
<pre><code>function f() {
  var x = 1
  let y = 2
  const z = 3
  {
    var x = 100
    let y = 200
    const z = 300
    console.log('x in block scope is', x)
    console.log('y in block scope is', y)
    console.log('z in block scope is', z)
  }
  console.log('x outside of block scope is', x)
  console.log('y outside of block scope is', y)
  console.log('z outside of block scope is', z)
}

f()</code></pre>
<p><em>运行结果如下：</em></p>
<pre><code>x in block scope is 100 
y in block scope is 200 
z in block scope is 300 
x outside of block scope is 100 
y outside of block scope is 2 
z outside of block scope is 3 </code></pre>
<h1>2. 数组辅助方法</h1>
<p>出现了新的很酷的功能，这有助于在很多情况下使用JS Array。 您实现了多少次的逻辑，如：过滤，检查是否有任何或所有元素符合条件，或者元素转换？ 是不是很多种情景下都有用过？ 现在语言本身自带这些很好用的功能。 在我看来，这是最有价值的功能：</p>
<h2>forEach</h2>
<p>对数组的每个元素执行传入的函数，将数组元素作为参数传递。</p>
<pre><code>var colors = ['red', 'green', 'blue']

function print(val) {
  console.log(val)
}

colors.forEach(print)</code></pre>
<p><em>运行结果如下：</em></p>
<pre><code>red 
green 
blue </code></pre>
<h2>map</h2>
<p>创建一个包含相同数量元素的新数组，但是由传入的函数返回元素。 它只是将每个数组元素转换成别的东西。</p>
<pre><code>var colors = ['red', 'green', 'blue']

function capitalize(val) {
    return val.toUpperCase()
}

var capitalizedColors = colors.map(capitalize)

console.log(capitalizedColors)</code></pre>
<p><em>运行结果如下：</em></p>
<pre><code>["RED","GREEN","BLUE"] </code></pre>
<h2>filter</h2>
<p>创建一个包含原始数组子集的新数组。 新数组包含的这些元素通过由传入的函数实现的测试，该函数应该返回true或false。</p>
<pre><code>var values = [1, 60, 34, 30, 20, 5]

function lessThan20(val) {
    return val &lt; 20
}

var valuesLessThan20 = values.filter(lessThan20)

console.log(valuesLessThan20)</code></pre>
<p><em>运行结果如下：</em></p>
<pre><code>[1,5] </code></pre>
<h2>find</h2>
<p>找到通过传入的函数测试的第一个元素，该函数应该返回true或false。</p>
<pre><code>var people = [
  {name: 'Jack', age: 50},
  {name: 'Michael', age: 9}, 
  {name: 'John', age: 40}, 
  {name: 'Ann', age: 19}, 
  {name: 'Elisabeth', age: 16}
]

function teenager(person) {
    return person.age &gt; 10 &amp;&amp; person.age &lt; 20
}

var firstTeenager = people.find(teenager)

console.log('First found teenager:', firstTeenager.name)</code></pre>
<p><em>运行结果如下：</em></p>
<pre><code>First found teenager: Ann </code></pre>
<h2>every</h2>
<p>检查数组的每个元素是否通过传入函数的测试，该函数应该返回true或false（每个函数都返回true，则结果为true，否则为false）。</p>
<pre><code>var people = [
  {name: 'Jack', age: 50},
  {name: 'Michael', age: 9}, 
  {name: 'John', age: 40}, 
  {name: 'Ann', age: 19}, 
  {name: 'Elisabeth', age: 16}
]

function teenager(person) {
    return person.age &gt; 10 &amp;&amp; person.age &lt; 20
}

var everyoneIsTeenager = people.every(teenager)

console.log('Everyone is teenager: ', everyoneIsTeenager)</code></pre>
<p><em>运行结果如下：</em></p>
<pre><code>Everyone is teenager:  false </code></pre>
<h2>some</h2>
<p>检查数组的任何元素是否通过由提供的函数实现的测试，该函数应该返回true或false。(有一个函数返回true，则结果true。否则结果为false)</p>
<pre><code>var people = [
  {name: 'Jack', age: 50},
  {name: 'Michael', age: 9}, 
  {name: 'John', age: 40}, 
  {name: 'Ann', age: 19}, 
  {name: 'Elisabeth', age: 16}
]

function teenager(person) {
    return person.age &gt; 10 &amp;&amp; person.age &lt; 20
}

var thereAreTeenagers = people.some(teenager)

console.log('There are teenagers:', thereAreTeenagers)</code></pre>
<p><em>运行结果如下：</em></p>
<pre><code>There are teenagers: true </code></pre>
<h2>reduce</h2>
<p>方法接收一个函数作为累加器（accumulator），数组中的每个值（从左到右）开始缩减，最终为一个值。 累加器的初始值应作为reduce函数的第二个参数提供。</p>
<pre><code>var array = [1, 2, 3, 4]

function sum(acc, value) {
  return acc + value
}

function product(acc, value) {
  return acc * value
}

var sumOfArrayElements = array.reduce(sum, 0)
var productOfArrayElements = array.reduce(product, 1)

console.log('Sum of', array, 'is', sumOfArrayElements)
console.log('Product of', array, 'is', productOfArrayElements)</code></pre>
<p><em>运行结果如下：</em></p>
<pre><code>Sum of [1,2,3,4] is 10 
Product of [1,2,3,4] is 24 </code></pre>
<h1>3.箭头函数</h1>
<p>执行非常简单的函数（如上述的<code>Sum</code>或<code>Product</code>）需要编写大量的模版。 有什么解决办法吗？ 是的，可以尝试箭头函数！</p>
<pre><code>var array = [1, 2, 3, 4]

const sum = (acc, value) =&gt; acc + value
const product = (acc, value) =&gt; acc * value

var sumOfArrayElements = array.reduce(sum, 0)
var productOfArrayElements = array.reduce(product, 1)</code></pre>
<p>箭头函数也可以内联。 它真的简化了代码：</p>
<pre><code>var array = [1, 2, 3, 4]

var sumOfArrayElements = array.reduce((acc, value) =&gt; acc + value, 0)
var productOfArrayElements = array.reduce((acc, value) =&gt; acc * value, 1)</code></pre>
<p>箭头函数也可以更复杂，并且有很多行代码：</p>
<pre><code>var array = [1, 2, 3, 4]

const sum = (acc, value) =&gt; {
  const result = acc + value
  console.log(acc, ' plus ', value, ' is ', result)
  return result
}

var sumOfArrayElements = array.reduce(sum, 0)</code></pre>
<h1>4. 类</h1>
<p>哪个Java开发人员在切换到JS项目时不会错过类？ 谁不喜欢显式继承，像Java语言，而不是为原型继承编写魔术代码？ 这引起了一些JS开发者反对，因为在ES6中已经引入了类。 他们不改变继承的概念。 它们只是原型继承的语法糖。</p>
<pre><code>class Point {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    toString() {
        return '[X=' + this.x + ', Y=' + this.y + ']'
    }
}

class ColorPoint extends Point {
    static default() {
        return new ColorPoint(0, 0, 'black')
    }

    constructor(x, y, color) {
        super(x, y)
        this.color = color
    }

    toString() {
        return '[X=' + this.x + ', Y=' + this.y + ', color=' + this.color + ']'
    }
}

console.log('The first point is ' + new Point(2, 10))
console.log('The second point is ' + new ColorPoint(2, 10, 'green'))
</code></pre>
<p><em>运行结果如下：</em></p>
<pre><code>The first point is [X=2, Y=10] 
The second point is [X=2, Y=10, color=green] 
The default color point is [X=0, Y=0, color=black] </code></pre>
<h1>5.对象功能增强</h1>
<p>对象功能已被增强。 现在我们可以更容易地：</p>
<ol>
<li>定义具有和已有变量名称相同且赋值的字段</li>
<li>定义函数</li>
<li>定义动态（计算）属性</li>
</ol>
<pre><code>const color = 'red'
const point = {
  x: 5,
  y: 10,
  color,
  toString() {
    return 'X=' + this.x + ', Y=' + this.y + ', color=' + this.color
  },
  [ 'prop_' + 42 ]: 42
}

console.log('The point is ' + point)
console.log('The dynamic property is ' + point.prop_42)</code></pre>
<p><em>运行结果如下：</em></p>
<pre><code>The point is X=5, Y=10, color=red 
The dynamic property is 42 </code></pre>
<h1>6. 模板字符串</h1>
<p>谁喜欢写大字符串和变量连接？ 我相信我们中只有少数人喜欢。 谁讨厌阅读这样的代码？ 我确定大家都是，ES6引入了非常易于使用的字符串模板和变量的占位符。</p>
<pre><code>function hello(firstName, lastName) {
  return `Good morning ${firstName} ${lastName}! 
How are you?`
}

console.log(hello('Jan', 'Kowalski'))</code></pre>
<p><em>运行结果如下：</em></p>
<pre><code>Good morning Jan Kowalski! 
How are you? </code></pre>
<p>请注意，我们可以写多行文本。</p>
<p>重要提示：使用反引号代替撇号来包装文本。</p>
<h1>7. 默认函数参数</h1>
<p>你不喜欢提供所有可能的函数参数？ 使用默认值。</p>
<pre><code>function sort(arr = [], direction = 'ascending') {
  console.log('I\'m going to sort the array', arr, direction)
}

sort([1, 2, 3])
sort([1, 2, 3], 'descending')</code></pre>
<p><em>运行结果如下：</em></p>
<pre><code>I'm going to sort the array [1,2,3] ascending 
I'm going to sort the array [1,2,3] descending </code></pre>
<h1>8. rest参数和扩展运算符</h1>
<h2>扩展</h2>
<p>它可以将数组或对象内容提取为单个元素。</p>
<p>示例 - 制作数组的浅拷贝：</p>
<pre><code>var array = ['red', 'blue', 'green']
var copyOfArray = [...array]

console.log('Copy of', array, 'is', copyOfArray)
console.log('Are', array, 'and', copyOfArray, 'same?', array === copyOfArray)</code></pre>
<p><em>运行结果如下：</em></p>
<pre><code>Copy of ["red","blue","green"] is ["red","blue","green"] 
Are ["red","blue","green"] and ["red","blue","green"] same? false </code></pre>
<p>示例 - 合并数组：</p>
<pre><code>var defaultColors = ['red', 'blue', 'green']
var userDefinedColors = ['yellow', 'orange']

var mergedColors = [...defaultColors, ...userDefinedColors]

console.log('Merged colors', mergedColors)</code></pre>
<p><em>运行结果如下：</em></p>
<pre><code>Merged colors ["red","blue","green","yellow","orange"] </code></pre>
<h2>rest参数</h2>
<p>您要将前几个函数参数绑定到变量，其他变量作为数组绑定到单个变量吗？ 现在你可以很容易地做到这一点。</p>
<pre><code>function printColors(first, second, third, ...others) {
  console.log('Top three colors are ' + first + ', ' + second + ' and ' + third + '. Others are: ' + others)
}
printColors('yellow', 'blue', 'orange', 'white', 'black')</code></pre>
<p><em>运行结果如下：</em></p>
<pre><code>Top three colors are yellow, blue and orange. Others are: white,black </code></pre>
<h1>9. 解构赋值</h1>
<h2>数组</h2>
<p>从数组中提取所请求的元素并将其分配给变量。</p>
<pre><code>function printFirstAndSecondElement([first, second]) {
    console.log('First element is ' + first + ', second is ' + second)
}

function printSecondAndFourthElement([, second, , fourth]) {
    console.log('Second element is ' + second + ', fourth is ' + fourth)
}

var array = [1, 2, 3, 4, 5]

printFirstAndSecondElement(array)
printSecondAndFourthElement(array)</code></pre>
<p><em>运行结果如下：</em></p>
<pre><code>First element is 1, second is 2 
Second element is 2, fourth is 4 </code></pre>
<h2>对象</h2>
<p>从对象中提取所请求的属性，并将其分配给与属性相同名称的变量。</p>
<pre><code>function printBasicInfo({firstName, secondName, profession}) {
    console.log(firstName + ' ' + secondName + ' - ' + profession)
}

var person = {
  firstName: 'John',
  secondName: 'Smith',
  age: 33,
  children: 3,
  profession: 'teacher'
}

printBasicInfo(person)</code></pre>
<p><em>运行结果如下：</em></p>
<pre><code>John Smith - teacher </code></pre>
<h1>10. Promises</h1>
<p>Promises承诺（是的，我知道这听起来很奇怪），你将会得到延期或长期运行任务的未来结果。 承诺有两个渠道：第一个为结果，第二个为潜在的错误。 要获取结果，您将回调函数作为“then”函数参数。 要处理错误，您将回调函数提供为“catch”函数参数。</p>
<pre><code>function asyncFunc() {
    return new Promise((resolve, reject) =&gt; {
        setTimeout(() =&gt; {
          const result = Math.random();
          result &gt; 0.5 ? resolve(result) : reject('Oppps....I cannot calculate')
        }, 1)
    });
}

for (let i=0; i&lt;10; i++) {
    asyncFunc()
        .then(result =&gt; console.log('Result is: ' + result))
        .catch(result =&gt; console.log('Error: ' + result))
}</code></pre>
<p><em>运行结果如下：</em></p>
<pre><code>Result is: 0.7930997430022211 
Error: Oppps....I cannot calculate 
Result is: 0.6412258210597288 
Result is: 0.7890325910244533 
Error: Oppps....I cannot calculate 
Error: Oppps....I cannot calculate 
Result is: 0.8619834683310168 
Error: Oppps....I cannot calculate 
Error: Oppps....I cannot calculate 
Result is: 0.8258410427354488 </code></pre>
<h1>总结</h1>
<p>我希望你喜欢这篇文章。 如果您想要一些练习，您可以使用沙箱进行学习过程：<a href="https://es6console.com/" rel="nofollow noreferrer"></a><a href="https://es6console.com/" rel="nofollow noreferrer">https://es6console.com/</a>。 如果您需要更多信息，可以在这里找到</p>
<ul>
<li>
<a href="https://github.com/lukehoban/es6features" rel="nofollow noreferrer"></a><a href="https://github.com/lukehoban/es6features" rel="nofollow noreferrer">https://github.com/lukehoban/...</a>
</li>
<li>
<a href="http://exploringjs.com/es6/" rel="nofollow noreferrer"></a><a href="http://exploringjs.com/es6/" rel="nofollow noreferrer">http://exploringjs.com/es6/</a>
</li>
</ul>
<p>翻译自<a href="https://blog.pragmatists.com/top-10-es6-features-by-example-80ac878794bb" rel="nofollow noreferrer">Top 10 ES6 features by example</a></p>
<p>关注我的公众号，更多优质文章定时推送</p>
<p><span class="img-wrap"><img data-src="/img/bVVbe2?w=344&amp;h=344" src="https://static.alili.tech/img/bVVbe2?w=344&amp;h=344" alt="clipboard.png" title="clipboard.png"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
举例说明了十大ES6功能

## 原文链接
[https://segmentfault.com/a/1190000011467229](https://segmentfault.com/a/1190000011467229)

