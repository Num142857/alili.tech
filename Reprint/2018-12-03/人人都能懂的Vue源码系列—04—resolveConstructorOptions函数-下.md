---
title: '人人都能懂的Vue源码系列—04—resolveConstructorOptions函数-下' 
date: 2018-12-03 2:30:08
hidden: true
slug: 74uudkbroxd
categories: [reprint]
---

{{< raw >}}

                    
<p>上一篇文章中说道，resolveConstructorOptions函数要分两种情况进行说明，第一种是Ctor为基础构造器的情况，这个已经向大家介绍过了，今天这篇文章主要介绍第二种情况，Ctor是Vue.extend创建的"子类"。</p>
<h2>Ctor是Vue.extend创建的"子类"</h2>
<p>Vue.extend方法我们之后的博文再进行详细介绍，这里大家可以先把Vue.extend的功能笼统的理解为继承。我们接下来看resolveConstructorOptions相关的代码，如果Ctor是Vue.extend创建的"子类"，那么在extend的过程中，Ctor上就会有super属性。</p>
<pre><code class="js">Vue.extend = function (extendOptions: Object): Function {
  ...
  Sub['super'] = Super
  ...
}</code></pre>
<p>Ctor上有了super属性，就会去执行if块内的代码</p>
<pre><code class="js">...
const superOptions = resolveConstructorOptions(Ctor.super)
const cachedSuperOptions = Ctor.superOptions
...
// Vue.extend相关代码
Vue.extend = function (extendOptions: Object): Function {
  ...
  Sub.superOptions = Super.options // Sub.superOptions指向基础构造器的options
  ...
}</code></pre>
<p>首先递归调用resolveConstructorOptions方法，返回"父类"上的options并赋值给superOptions变量。然后把"自身"的options赋值给cachedSuperOptions变量。<br>然后比较这两个变量的值,当这两个变量值不等时，说明"父类"的options改变过了。例如执行了Vue.mixin方法，这时候就需要把"自身"的superOptions属性替换成最新的。然后检查是否"自身"d的options是否发生变化。resolveModifiedOptions的功能就是这个。</p>
<pre><code class="js">if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions
      // check if there are any late-modified/attached options (#4976)
      const modifiedOptions = resolveModifiedOptions(Ctor)
      ....
    }</code></pre>
<p>说了这么多，大家可能还是有点陌生，我们直接举个例子来说明一下。</p>
<pre><code>  var Profile = Vue.extend({
     template: '&lt;p&gt;"{{"firstName"}}" "{{"lastName"}}" aka "{{"alias"}}"&lt;/p&gt;'
  })
  Vue.mixin({ data: function () {
    return {
      firstName: 'Walter',
      lastName: 'White',
      alias: 'Heisenberg'
    }
   "}}")
   new Profile().$mount('#example')</code></pre>
<p>由于Vue.mixin改变了"父类"options。源码中superOptions和cachedSuperOptions就不相等了,大家可以去jsfiddle试试效果。<br>接下来看看resolveModifiedOptions都干了哪些事情？</p>
<pre><code class="js">function resolveModifiedOptions (Ctor: Class&lt;Component&gt;): ?Object {
  let modified // 定义modified变量
  const latest = Ctor.options // 自身的options
  const extended = Ctor.extendOptions // 构造"自身"时传入的options
  const sealed = Ctor.sealedOptions // 执行Vue.extend时封装的"自身"options，这个属性就是方便检查"自身"的options有没有变化
 // 遍历当前构造器上的options属性，如果在"自身"封装的options里没有，则证明是新添加的。执行if内的语句。调用dedupe方法，最终返回modified变量(即”自身新添加的options“)
  for (const key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) modified = {}
      modified[key] = dedupe(latest[key], extended[key], sealed[key])
    }
  }
  return modified
}</code></pre>
<p>那么dedupe方法又干了什么事情呢？</p>
<pre><code class="js">function dedupe (latest, extended, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    const res = []
    sealed = Array.isArray(sealed) ? sealed : [sealed]
    extended = Array.isArray(extended) ? extended : [extended]
    for (let i = 0; i &lt; latest.length; i++) {
      // push original options and not sealed options to exclude duplicated options
      if (extended.indexOf(latest[i]) &gt;= 0 || sealed.indexOf(latest[i]) &lt; 0) {
        res.push(latest[i])
      }
    }
    return res
  } else {
    return latest
  }
}</code></pre>
<p>从作者的注释可以看到这个方法主要就是防止生命周期构造函数重复。我们再来看该方法传入的3个参数。latest，extended，sealed，lateset表示的是"自身"新增的options。extended表示的是当前构造器上新增的extended options，sealed表示的是当前构造器上新增的封装options。<br>回到源码，如果latest不是数组的话(lateset是"自身"新增的options)，这里不需要去重，直接返回latest。如果传入的latest是数组（如果latest是数组，一般这个新增的options就是生命周期钩子函数），则遍历该数组，如果该数组的某项在extended数组中有或者在sealed数组中没有，则推送到返回数组中从而实现去重。(这个去重逻辑目前自己还不是特别明白，之后如果明白了会在这里更新，有明白的同学们请在评论区留言)<br>现在我们了解了resolveModifiedOptions和dedupe方法的作用，接下来回到resolveConstructorOptions源码。</p>
<pre><code class="js">  if (modifiedOptions) {
    extend(Ctor.extendOptions, modifiedOptions)
  }
  options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions)
  if (options.name) {
    options.components[options.name] = Ctor
  }</code></pre>
<p>如果”自身“有新添加的options，则把新添加的options属性添加到Ctor.extendOptions属性上。调用mergeOptions方法合并"父类"构造器上的options和”自身“上的extendOptions(mergeOptions在下一篇博文中介绍)，最后返回合并后的options。</p>
<p>看到这里，可能会感觉到头晕，为了让大家更好的理解。我们来看下面的流程图。<br><span class="img-wrap"><img data-src="/img/bV9r0S?w=1024&amp;h=768" src="https://static.alili.tech/img/bV9r0S?w=1024&amp;h=768" alt="resolveConstructorOptions流程图" title="resolveConstructorOptions流程图"></span></p>
<p>下篇博客我们主要讲mergeOptions方法，在整个Vue中属于比较核心的一个方法。敬请期待！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
人人都能懂的Vue源码系列—04—resolveConstructorOptions函数-下

## 原文链接
[https://segmentfault.com/a/1190000014606817](https://segmentfault.com/a/1190000014606817)

