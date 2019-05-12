---
title: '数组的遍历你都会用了，那Promise版本的呢' 
date: 2018-12-03 2:30:08
hidden: true
slug: ck7ls5eo97
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>这里指的遍历方法包括：<code>map</code>、<code>reduce</code>、<code>reduceRight</code>、<code>forEach</code>、<code>filter</code>、<code>some</code>、<code>every</code><br>因为最近要进行了一些数据汇总，<code>node</code>版本已经是8.11.1了，所以直接写了个<code>async/await</code>的脚本。<br>但是在对数组进行一些遍历操作时，发现有些遍历方法对<code>Promise</code>的反馈并不是我们想要的结果。</blockquote>
<p>当然，有些严格来讲并不能算是遍历，比如说<code>some</code>，<code>every</code>这些的。<br>但确实，这些都会根据我们数组的元素来进行多次的调用传入的回调。</p>
<p>这些方法都是比较常见的，但是当你的回调函数是一个<code>Promise</code>时，一切都变了。</p>
<h2>前言</h2>
<p><code>async/await</code>为<code>Promise</code>的语法糖<br>文中会直接使用<code>async/await</code>替换<code>Promise</code></p>
<pre><code class="javascript">let result = await func()
// =&gt; 等价于
func().then(result =&gt; {
  // code here
})

// ======

async function func () {
  return 1  
}
// =&gt; 等价与
function func () {
  return new Promise(resolve =&gt; resolve(1))
}</code></pre>
<h2>map</h2>
<p><code>map</code>可以说是对<code>Promise</code>最友好的一个函数了。<br>我们都知道，<code>map</code>接收两个参数：</p>
<ol>
<li>对每项元素执行的回调，回调结果的返回值将作为该数组中相应下标的元素</li>
<li>一个可选的回调函数<code>this</code>指向的参数</li>
</ol>
<pre><code class="javascript">[1, 2, 3].map(item =&gt; item ** 2) // 对数组元素进行求平方
// &gt; [1, 4, 9]</code></pre>
<p>上边是一个普通的<code>map</code>执行，但是当我们的一些计算操作变为异步的：</p>
<pre><code class="javascript">[1, 2, 3].map(async item =&gt; item ** 2) // 对数组元素进行求平方
// &gt; [Promise, Promise, Promise]</code></pre>
<p>这时候，我们获取到的返回值其实就是一个由<code>Promise</code>函数组成的数组了。</p>
<p>所以为什么上边说<code>map</code>函数为最友好的，因为我们知道，<code>Promise</code>有一个函数为<code>Promise.all</code><br>会将一个由<code>Promise</code>组成的数组依次执行，并返回一个<code>Promise</code>对象，该对象的结果为数组产生的结果集。</p>
<pre><code class="javascript">await Promise.all([1, 2, 3].map(async item =&gt; item ** 2))
// &gt; [1, 4, 9]</code></pre>
<p><em>首先使用<code>Promise.all</code>对数组进行包装，然后用<code>await</code>获取结果。</em></p>
<h2>reduce/reduceRight</h2>
<p><code>reduce</code>的函数签名想必大家也很熟悉了，接收两个参数：</p>
<ol>
<li>
<p>对每一项元素执行的回调函数，返回值将被累加到下次函数调用中，回调函数的签名：</p>
<ol>
<li>
<code>accumulator</code>累加的值</li>
<li>
<code>currentValue</code>当前正在处理的元素</li>
<li>
<code>currentIndex</code>当前正在处理的元素下标</li>
<li>
<code>array</code>调用<code>reduce</code>的数组</li>
</ol>
</li>
<li>可选的初始化的值，将作为<code>accumulator</code>的初始值</li>
</ol>
<pre><code class="javascript">[1, 2, 3].reduce((accumulator, item) =&gt; accumulator + item, 0) // 进行加和
// &gt; 6</code></pre>
<p>这个代码也是没毛病的，同样如果我们加和的操作也是个异步的：</p>
<pre><code class="javascript">[1, 2, 3].reduce(async (accumulator, item) =&gt; accumulator + item, 0) // 进行加和
// &gt; Promise&nbsp;{&lt;resolved&gt;: "[object Promise]3"}</code></pre>
<p>这个结果返回的就会很诡异了，我们在回看上边的<code>reduce</code>的函数签名</p>
<blockquote>对每一项元素执行的回调函数，返回值将被累加到下次函数调用中</blockquote>
<p>然后我们再来看代码，<code>async (accumulator, item) =&gt; accumulator += item</code><br>这个在最开始也提到了，是<code>Pormise</code>的语法糖，为了看得更清晰，我们可以这样写：</p>
<pre><code class="javascript">(accumulator, item) =&gt; new Promise(resolve =&gt;
  resolve(accumulator += item)
)</code></pre>
<p>也就是说，我们<code>reduce</code>的回调函数返回值其实就是一个<code>Promise</code>对象<br>然后我们对<code>Promise</code>对象进行<code>+=</code>操作，得到那样怪异的返回值也就很合情合理了。</p>
<p>当然，<code>reduce</code>的调整也是很轻松的：</p>
<pre><code class="javascript">await [1, 2, 3].reduce(async (accumulator, item) =&gt; await accumulator + item, 0)
// &gt; 6</code></pre>
<p>我们对<code>accumulator</code>调用<code>await</code>，然后再与当前<code>item</code>进行加和，在最后我们的<code>reduce</code>返回值也一定是一个<code>Promise</code>，所以我们在最外边也添加<code>await</code>的字样<br>也就是说我们每次<code>reduce</code>都会返回一个新的<code>Promise</code>对象，在对象内部都会获取上次<code>Promise</code>的结果。<br>我们调用<code>reduce</code>实际上得到的是类似这样的一个<code>Promise</code>对象：</p>
<pre><code class="javascript">new Promise(resolve =&gt; {
  let item = 3
  new Promise(resolve =&gt; {
      let item = 2
      new Promise(resolve =&gt; {
        let item = 1
        Promise.resolve(0).then(result =&gt; resolve(item + result))
      }).then(result =&gt; resolve(item + result))
  }).then(result =&gt; resolve(item + result))
})</code></pre>
<h3>reduceRight</h3>
<p>这个就没什么好说的了。。跟<code>reduce</code>只是执行顺序相反而已</p>
<h2>forEach</h2>
<p><code>forEach</code>，这个应该是用得最多的遍历方法了，对应的函数签名：</p>
<ol>
<li>
<p><code>callback</code>，对每一个元素进行调用的函数</p>
<ol>
<li>
<code>currentValue</code>，当前元素</li>
<li>
<code>index</code>，当前元素下标</li>
<li>
<code>array</code>，调用<code>forEach</code>的数组引用</li>
</ol>
</li>
<li>
<code>thisArg</code>，一个可选的回调函数<code>this</code>指向</li>
</ol>
<p>我们有如下的操作：</p>
<pre><code class="javascript">// 获取数组元素求平方后的值
[1, 2, 3].forEach(item =&gt; {
  console.log(item ** 2)
})
// &gt; 1
// &gt; 4
// &gt; 9</code></pre>
<p>普通版本我们是可以直接这么输出的，但是如果遇到了<code>Promise</code></p>
<pre><code class="javascript">// 获取数组元素求平方后的值
[1, 2, 3].forEach(async item =&gt; {
  console.log(item ** 2)
})
// &gt; nothing</code></pre>
<p><code>forEach</code>并不关心回调函数的返回值，所以<code>forEach</code>只是执行了三个会返回<code>Promise</code>的函数<br>所以如果我们想要得到想要的效果，只能够自己进行增强对象属性了：</p>
<pre><code class="javascript">Array.prototype.forEachSync = async function (callback, thisArg) {
  for (let [index, item] of Object.entries(this)) {
    await callback(item, index, this)
  }
}

await [1, 2, 3].forEachSync(async item =&gt; {
  console.log(item ** 2)
})

// &gt; 1
// &gt; 4
// &gt; 9</code></pre>
<p><em><code>await</code>会忽略非<code>Promise</code>值，<code>await 0</code>、<code>await undefined</code>与普通代码无异</em></p>
<h2>filter</h2>
<p><code>filter</code>作为一个筛选数组用的函数，同样具有遍历的功能：<br>函数签名同<code>forEach</code>，但是<code>callback</code>返回值为<code>true</code>的元素将被放到<code>filter</code>函数返回值中去。</p>
<p>我们要进行一个奇数的筛选，所以我们这么写：</p>
<pre><code class="javascript">[1, 2, 3].filter(item =&gt; item % 2 !== 0)
// &gt; [1, 3]</code></pre>
<p>然后我们改为<code>Promise</code>版本：</p>
<pre><code class="javascript">[1, 2, 3].filter(async item =&gt; item % 2 !== 0)
// &gt; [1, 2, 3]</code></pre>
<p>这会导致我们的筛选功能失效，因为<code>filter</code>的返回值匹配不是完全相等的匹配，只要是返回值能转换为<code>true</code>，就会被认定为通过筛选。<br><code>Promise</code>对象必然是<code>true</code>的，所以筛选失效。<br>所以我们的处理方式与上边的<code>forEach</code>类似，同样需要自己进行对象增强<br>但我们这里直接选择一个取巧的方式：</p>
<pre><code class="javascript">Array.prototype.filterSync = async function (callback, thisArg) {
  let filterResult = await Promise.all(this.map(callback))
  // &gt; [true, false, true]

  return this.filter((_, index) =&gt; filterResult[index])
}

await [1, 2, 3].filterSync(item =&gt; item % 2 !== 0)</code></pre>
<p>我们可以直接在内部调用<code>map</code>方法，因为我们知道<code>map</code>会将所有的返回值返回为一个新的数组。<br>这也就意味着，我们<code>map</code>可以拿到我们对所有<code>item</code>进行筛选的结果，<code>true</code>或者<code>false</code>。<br>接下来对原数组每一项进行返回对应下标的结果即可。</p>
<h2>some</h2>
<p><code>some</code>作为一个用来检测数组是否满足一些条件的函数存在，同样是可以用作遍历的<br>函数签名同<code>forEach</code>，有区别的是当任一<code>callback</code>返回值匹配为<code>true</code>则会直接返回<code>true</code>，如果所有的<code>callback</code>匹配均为<code>false</code>，则返回<code>false</code></p>
<p>我们要判断数组中是否有元素等于<code>2</code>：</p>
<pre><code class="javascript">[1, 2, 3].some(item =&gt; item === 2)
// &gt; true</code></pre>
<p>然后我们将它改为<code>Promise</code></p>
<pre><code class="javascript">[1, 2, 3].some(async item =&gt; item === 2)
// &gt; true</code></pre>
<p>这个函数依然会返回<code>true</code>，但是却不是我们想要的，因为这个是<code>async</code>返回的<code>Promise</code>对象被认定为<code>true</code>。</p>
<p>所以，我们要进行如下处理：</p>
<pre><code class="javascript">Array.prototype.someSync = async function (callback, thisArg) {
  for (let [index, item] of Object.entries(this)) {
    if (await callback(item, index, this)) return true
  }

  return false
}
await [1, 2, 3].someSync(async item =&gt; item === 2)
// &gt; true</code></pre>
<p>因为<code>some</code>在匹配到第一个<code>true</code>之后就会终止遍历，所以我们在这里边使用<code>forEach</code>的话是在性能上的一种浪费。<br>同样是利用了<code>await</code>会忽略普通表达式的优势，在内部使用<code>for-of</code>来实现我们的需求</p>
<h2>every</h2>
<p>以及我们最后的一个<code>every</code><br>函数签名同样与<code>forEach</code>一样，<br>但是<code>callback</code>的处理还是有一些区别的：<br>其实换一种角度考虑，<code>every</code>就是一个反向的<code>some</code><br><code>some</code>会在获取到第一个<code>true</code>时终止<br>而<code>every</code>会在获取到第一个<code>false</code>时终止，如果所有元素均为<code>true</code>，则返回<code>true</code></p>
<p>我们要判定数组中元素是否全部大于3</p>
<pre><code class="javascript">[1, 2, 3].every(item =&gt; item &gt; 3)
// &gt; false</code></pre>
<p>很显然，一个都没有匹配到的，而且回调函数在执行到第一次时就已经终止了，不会继续执行下去。<br>我们改为<code>Promise</code>版本：</p>
<pre><code class="javascript">[1, 2, 3].every(async =&gt; item &gt; 3)
// &gt; true</code></pre>
<p>这个必然是<code>true</code>，因为我们判断的是<code>Promise</code>对象<br>所以我们拿上边的<code>someSync</code>实现稍微修改一下：</p>
<pre><code class="javascript">Array.prototype.everySync = async function (callback, thisArg) {
  for (let [index, item] of Object.entries(this)) {
    if (!await callback(item, index, this)) return false
  }

  return true
}
await [1, 2, 3].everySync(async item =&gt; item === 2)
// &gt; false</code></pre>
<p>当匹配到任意一个<code>false</code>时，直接返回<code>false</code>，终止遍历。</p>
<h2>后记</h2>
<p>关于数组的这几个遍历方法。<br>因为<code>map</code>和<code>reduce</code>的特性，所以是在使用<code>async</code>时改动最小的函数。<br><em><code>reduce</code>的结果很像一个洋葱模型</em><br>但对于其他的遍历函数来说，目前来看就需要自己来实现了。</p>
<p>四个<code>*Sync</code>函数的实现：<a href="https://github.com/Jiasm/notebook/tree/master/array-sync" rel="nofollow noreferrer">https://github.com/Jiasm/notebook/tree/master/array-sync</a></p>
<h3>参考资料</h3>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array" rel="nofollow noreferrer">Array - JavaScript | MDN</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
数组的遍历你都会用了，那Promise版本的呢

## 原文链接
[https://segmentfault.com/a/1190000014598785](https://segmentfault.com/a/1190000014598785)

