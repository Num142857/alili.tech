---
title: '一个只有十行的精简MVVM框架' 
date: 2018-12-31 2:30:30
hidden: true
slug: n7q81ql61h
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">前言</h1>
<p>MVVM模式相信做前端的人都不陌生，去网上搜MVVM，会出现一大堆关于MVVM模式的博文，但是这些博文大多都只是用图片和文字来进行抽象的概念讲解，对于刚接触MVVM模式的新手来说，这些概念虽然能够读懂，但是也很难做到理解透彻。因此，我写了这篇文章。</p>
<p>这篇文章旨在通过代码的形式让大家更好的理解MVVM模式，相信大多数人读了这篇文章之后再去看其他诸如regular、vue等基于MVVM模式框架的源码，会容易很多。</p>
<p>如果你对MVVM模式已经很熟悉并且也已经研读过并深刻理解了当下主流的前端框架，可以忽略下面的内容。如果你没有一点JavaScript基础，也请先去学习下再来阅读读此文。</p>
<h1 id="articleHeader1">引子</h1>
<p>来张图来镇压此文：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011187170" src="https://static.alili.tech/img/remote/1460000011187170" alt="alt MVVM模式" title="alt MVVM模式" style="cursor: pointer; display: inline;"></span></p>
<p><code>MVVM</code>是<code>Model-View-ViewModel</code>的缩写。简单的讲，它将<code>View</code>与<code>Model</code>层分隔开，利用<code>ViewModel</code>层将<code>Model</code>层的数据经过一定的处理变成适用于<code>View</code>层的数据结构并传送到<code>View</code>层渲染界面，同时<code>View</code>层的视图更新也会告知<code>ViewModel</code>层，然后<code>ViewModel</code>层再更新<code>Model</code>层的数据。</p>
<p>我们用一段学生信息的代码作为引子，然后一步步再重构成MVVM模式的样子。</p>
<p>编写类似下面结构的学生信息：</p>
<blockquote><ul>
<li>Name: Jessica Bre</li>
<li>Height: 1.8m</li>
<li>Weight: 70kg</li>
</ul></blockquote>
<p>用常规的js代码是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const student = {
    'first-name': 'Jessica',
    'last-name': 'Bre',
    'height': 180,
    'weight': 70,
}
const root = document.createElement('ul')
const nameLi = document.createElement('li')
const nameLabel = document.createElement('span')
nameLabel.textContent = 'Name: '
const name_ = document.createElement('span')
name_.textContent = student['first-name'] + ' ' + student['last-name']
nameLi.appendChild(nameLabel)
nameLi.appendChild(name_)
const heightLi = document.createElement('li')
const heightLabel = document.createElement('span')
heightLabel.textContent = 'Height: '
const height = document.createElement('span')
height.textContent = '' + student['height'] / 100 + 'm'
heightLi.appendChild(heightLabel)
heightLi.appendChild(height)
const weightLi = document.createElement('li')
const weightLabel = document.createElement('span')
weightLabel.textContent = 'Weight: '
const weight = document.createElement('span')
weight.textContent = '' + student['weight'] + 'kg'
weightLi.appendChild(weightLabel)
weightLi.appendChild(weight)
root.appendChild(nameLi)
root.appendChild(heightLi)
root.appendChild(weightLi)
document.body.appendChild(root)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> student = {
    <span class="hljs-string">'first-name'</span>: <span class="hljs-string">'Jessica'</span>,
    <span class="hljs-string">'last-name'</span>: <span class="hljs-string">'Bre'</span>,
    <span class="hljs-string">'height'</span>: <span class="hljs-number">180</span>,
    <span class="hljs-string">'weight'</span>: <span class="hljs-number">70</span>,
}
<span class="hljs-keyword">const</span> root = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'ul'</span>)
<span class="hljs-keyword">const</span> nameLi = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'li'</span>)
<span class="hljs-keyword">const</span> nameLabel = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'span'</span>)
nameLabel.textContent = <span class="hljs-string">'Name: '</span>
<span class="hljs-keyword">const</span> name_ = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'span'</span>)
name_.textContent = student[<span class="hljs-string">'first-name'</span>] + <span class="hljs-string">' '</span> + student[<span class="hljs-string">'last-name'</span>]
nameLi.appendChild(nameLabel)
nameLi.appendChild(name_)
<span class="hljs-keyword">const</span> heightLi = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'li'</span>)
<span class="hljs-keyword">const</span> heightLabel = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'span'</span>)
heightLabel.textContent = <span class="hljs-string">'Height: '</span>
<span class="hljs-keyword">const</span> height = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'span'</span>)
height.textContent = <span class="hljs-string">''</span> + student[<span class="hljs-string">'height'</span>] / <span class="hljs-number">100</span> + <span class="hljs-string">'m'</span>
heightLi.appendChild(heightLabel)
heightLi.appendChild(height)
<span class="hljs-keyword">const</span> weightLi = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'li'</span>)
<span class="hljs-keyword">const</span> weightLabel = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'span'</span>)
weightLabel.textContent = <span class="hljs-string">'Weight: '</span>
<span class="hljs-keyword">const</span> weight = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'span'</span>)
weight.textContent = <span class="hljs-string">''</span> + student[<span class="hljs-string">'weight'</span>] + <span class="hljs-string">'kg'</span>
weightLi.appendChild(weightLabel)
weightLi.appendChild(weight)
root.appendChild(nameLi)
root.appendChild(heightLi)
root.appendChild(weightLi)
<span class="hljs-built_in">document</span>.body.appendChild(root)</code></pre>
<p>好长的一堆代码呀！别急，下面我们一步步优化！</p>
<h1 id="articleHeader2">DRY一下如何</h1>
<p>程序设计中最广泛接受的规则之一就是“DRY”: "Do not Repeat Yourself"。很显然，上面的一段代码有很多重复的部分，不仅与这个准则相违背，而且给人一种不舒服的感觉。是时候做下处理，来让这段学生信息更"Drier"。</p>
<p>可以发现，代码里写了很多遍<code>document.createElement</code>来创建节点，但是由于列表项都是相似的结构，所以我们没有必要一遍一遍的写。因此，进行如下封装：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const createListItem = function (label, content) {
    const li = document.createElement('li')
    const labelSpan = document.createElement('span')
    labelSpan.textContent = label
    const contentSpan = document.createElement('span')
    contentSpan.textContent = content
    li.appendChild(labelSpan)
    li.appendChild(contentSpan)
    return li
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> createListItem = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">label, content</span>) </span>{
    <span class="hljs-keyword">const</span> li = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'li'</span>)
    <span class="hljs-keyword">const</span> labelSpan = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'span'</span>)
    labelSpan.textContent = label
    <span class="hljs-keyword">const</span> contentSpan = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'span'</span>)
    contentSpan.textContent = content
    li.appendChild(labelSpan)
    li.appendChild(contentSpan)
    <span class="hljs-keyword">return</span> li
}</code></pre>
<p>经过这步转化之后，整个学生信息应用就变成了这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const student = {
    'first-name': 'Jessica',
    'last-name': 'Bre',
    'height': 180,
    'weight': 70,
}

const createListItem = function (label, content) {
  const li = document.createElement('li')
  const labelSpan = document.createElement('span')
  labelSpan.textContent = label
  const contentSpan = document.createElement('span')
  contentSpan.textContent = content
  li.appendChild(labelSpan)
  li.appendChild(contentSpan)
  return li
}
const root = document.createElement('ul')
const nameLi = createListItem('Name: ', student['first-name'] + ' ' + student['last-name'])
const heightLi = createListItem('Height: ', student['height'] / 100 + 'm')
const weightLi = createListItem('Weight: ', student['weight'] + 'kg')
root.appendChild(nameLi)
root.appendChild(heightLi)
root.appendChild(weightLi)
document.body.appendChild(root)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> student = {
    <span class="hljs-string">'first-name'</span>: <span class="hljs-string">'Jessica'</span>,
    <span class="hljs-string">'last-name'</span>: <span class="hljs-string">'Bre'</span>,
    <span class="hljs-string">'height'</span>: <span class="hljs-number">180</span>,
    <span class="hljs-string">'weight'</span>: <span class="hljs-number">70</span>,
}

<span class="hljs-keyword">const</span> createListItem = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">label, content</span>) </span>{
  <span class="hljs-keyword">const</span> li = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'li'</span>)
  <span class="hljs-keyword">const</span> labelSpan = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'span'</span>)
  labelSpan.textContent = label
  <span class="hljs-keyword">const</span> contentSpan = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'span'</span>)
  contentSpan.textContent = content
  li.appendChild(labelSpan)
  li.appendChild(contentSpan)
  <span class="hljs-keyword">return</span> li
}
<span class="hljs-keyword">const</span> root = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'ul'</span>)
<span class="hljs-keyword">const</span> nameLi = createListItem(<span class="hljs-string">'Name: '</span>, student[<span class="hljs-string">'first-name'</span>] + <span class="hljs-string">' '</span> + student[<span class="hljs-string">'last-name'</span>])
<span class="hljs-keyword">const</span> heightLi = createListItem(<span class="hljs-string">'Height: '</span>, student[<span class="hljs-string">'height'</span>] / <span class="hljs-number">100</span> + <span class="hljs-string">'m'</span>)
<span class="hljs-keyword">const</span> weightLi = createListItem(<span class="hljs-string">'Weight: '</span>, student[<span class="hljs-string">'weight'</span>] + <span class="hljs-string">'kg'</span>)
root.appendChild(nameLi)
root.appendChild(heightLi)
root.appendChild(weightLi)
<span class="hljs-built_in">document</span>.body.appendChild(root)</code></pre>
<p>是不是变得更短了，也更易读了？即使你不看<code>createListItem</code>函数的实现，光看<code>const nameLi = createListItem('Name: ', student['first-name'] + ' ' + student['last-name'])</code>也能大致明白这段代码时干什么的。</p>
<p>但是上面的代码封装的还不够，因为每次创建一个列表项，我们都要多调用一遍<code>createListItem</code>，上面的代码为了创建<code>name,height,weight</code>标签，调用了三遍<code>createListItem</code>，这里显然还有精简的空间。因此，我们再进一步封装：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const student = {
    'first-name': 'Jessica',
    'last-name': 'Bre',
    'height': 180,
    'weight': 70,
}

const createList = function(kvPairs){
  const createListItem = function (label, content) {
    const li = document.createElement('li')
    const labelSpan = document.createElement('span')
    labelSpan.textContent = label
    const contentSpan = document.createElement('span')
    contentSpan.textContent = content
    li.appendChild(labelSpan)
    li.appendChild(contentSpan)
    return li
  }
  const root = document.createElement('ul')
  kvPairs.forEach(function (x) {
    root.appendChild(createListItem(x.key, x.value))
  })
  return root
}


const ul = createList([
  {
    key: 'Name: ',
    value: student['first-name'] + ' ' + student['last-name']
  },
  {
    key: 'Height: ',
    value: student['height'] / 100 + 'm'
  },
  {
    key: 'Weight: ',
    value: student['weight'] + 'kg'
  }])
document.body.appendChild(ul)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> student = {
    <span class="hljs-string">'first-name'</span>: <span class="hljs-string">'Jessica'</span>,
    <span class="hljs-string">'last-name'</span>: <span class="hljs-string">'Bre'</span>,
    <span class="hljs-string">'height'</span>: <span class="hljs-number">180</span>,
    <span class="hljs-string">'weight'</span>: <span class="hljs-number">70</span>,
}

<span class="hljs-keyword">const</span> createList = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">kvPairs</span>)</span>{
  <span class="hljs-keyword">const</span> createListItem = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">label, content</span>) </span>{
    <span class="hljs-keyword">const</span> li = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'li'</span>)
    <span class="hljs-keyword">const</span> labelSpan = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'span'</span>)
    labelSpan.textContent = label
    <span class="hljs-keyword">const</span> contentSpan = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'span'</span>)
    contentSpan.textContent = content
    li.appendChild(labelSpan)
    li.appendChild(contentSpan)
    <span class="hljs-keyword">return</span> li
  }
  <span class="hljs-keyword">const</span> root = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'ul'</span>)
  kvPairs.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">x</span>) </span>{
    root.appendChild(createListItem(x.key, x.value))
  })
  <span class="hljs-keyword">return</span> root
}


<span class="hljs-keyword">const</span> ul = createList([
  {
    <span class="hljs-attr">key</span>: <span class="hljs-string">'Name: '</span>,
    <span class="hljs-attr">value</span>: student[<span class="hljs-string">'first-name'</span>] + <span class="hljs-string">' '</span> + student[<span class="hljs-string">'last-name'</span>]
  },
  {
    <span class="hljs-attr">key</span>: <span class="hljs-string">'Height: '</span>,
    <span class="hljs-attr">value</span>: student[<span class="hljs-string">'height'</span>] / <span class="hljs-number">100</span> + <span class="hljs-string">'m'</span>
  },
  {
    <span class="hljs-attr">key</span>: <span class="hljs-string">'Weight: '</span>,
    <span class="hljs-attr">value</span>: student[<span class="hljs-string">'weight'</span>] + <span class="hljs-string">'kg'</span>
  }])
<span class="hljs-built_in">document</span>.body.appendChild(ul)</code></pre>
<p>有没有看到MVVM风格的影子？<code>student</code>对象是原始数据，相当于<code>Model</code>层；<code>createList</code>创建了<code>dom</code>树，相当于<code>View</code>层，那么<code>ViewModel</code>层呢？仔细观察，其实我们传给<code>createList</code>函数的参数就是<code>Model</code>的数据的改造，为了让<code>Model</code>的数据符合<code>View</code>的结构，我们做了这样的改造，因此虽然这段函数里面没有独立的<code>ViewModel</code>层，但是它确实是存在的！聪明的同学应该想到了，下一步就是来独立出<code>ViewModel</code>层了吧~</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Model
const tk = {
    'first-name': 'Jessica',
    'last-name': 'Bre',
    'height': 180,
    'weight': 70,
}

//View
const createList = function(kvPairs){
  const createListItem = function (label, content) {
    const li = document.createElement('li')
    const labelSpan = document.createElement('span')
    labelSpan.textContent = label
    const contentSpan = document.createElement('span')
    contentSpan.textContent = content
    li.appendChild(labelSpan)
    li.appendChild(contentSpan)
    return li
  }
  const root = document.createElement('ul')
  kvPairs.forEach(function (x) {
    root.appendChild(createListItem(x.key, x.value))
  })
  return root
}
//ViewModel
const formatStudent = function (student) {
  return [
    {
      key: 'Name: ',
      value: student['first-name'] + ' ' + student['last-name']
    },
    {
      key: 'Height: ',
      value: student['height'] / 100 + 'm'
    },
    {
      key: 'Weight: ',
      value: student['weight'] + 'kg'
    }]
}
const ul = createList(formatStudent(tk))
document.body.appendChild(ul)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// Model</span>
<span class="hljs-keyword">const</span> tk = {
    <span class="hljs-string">'first-name'</span>: <span class="hljs-string">'Jessica'</span>,
    <span class="hljs-string">'last-name'</span>: <span class="hljs-string">'Bre'</span>,
    <span class="hljs-string">'height'</span>: <span class="hljs-number">180</span>,
    <span class="hljs-string">'weight'</span>: <span class="hljs-number">70</span>,
}

<span class="hljs-comment">//View</span>
<span class="hljs-keyword">const</span> createList = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">kvPairs</span>)</span>{
  <span class="hljs-keyword">const</span> createListItem = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">label, content</span>) </span>{
    <span class="hljs-keyword">const</span> li = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'li'</span>)
    <span class="hljs-keyword">const</span> labelSpan = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'span'</span>)
    labelSpan.textContent = label
    <span class="hljs-keyword">const</span> contentSpan = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'span'</span>)
    contentSpan.textContent = content
    li.appendChild(labelSpan)
    li.appendChild(contentSpan)
    <span class="hljs-keyword">return</span> li
  }
  <span class="hljs-keyword">const</span> root = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'ul'</span>)
  kvPairs.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">x</span>) </span>{
    root.appendChild(createListItem(x.key, x.value))
  })
  <span class="hljs-keyword">return</span> root
}
<span class="hljs-comment">//ViewModel</span>
<span class="hljs-keyword">const</span> formatStudent = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">student</span>) </span>{
  <span class="hljs-keyword">return</span> [
    {
      <span class="hljs-attr">key</span>: <span class="hljs-string">'Name: '</span>,
      <span class="hljs-attr">value</span>: student[<span class="hljs-string">'first-name'</span>] + <span class="hljs-string">' '</span> + student[<span class="hljs-string">'last-name'</span>]
    },
    {
      <span class="hljs-attr">key</span>: <span class="hljs-string">'Height: '</span>,
      <span class="hljs-attr">value</span>: student[<span class="hljs-string">'height'</span>] / <span class="hljs-number">100</span> + <span class="hljs-string">'m'</span>
    },
    {
      <span class="hljs-attr">key</span>: <span class="hljs-string">'Weight: '</span>,
      <span class="hljs-attr">value</span>: student[<span class="hljs-string">'weight'</span>] + <span class="hljs-string">'kg'</span>
    }]
}
<span class="hljs-keyword">const</span> ul = createList(formatStudent(tk))
<span class="hljs-built_in">document</span>.body.appendChild(ul)</code></pre>
<p>这看上去更舒服了。但是，最后两行还能封装~</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const run = function (root, {model, view, vm}) {
  const rendered = view(vm(model))
  root.appendChild(rendered)
}
run(document.body, {
      model: tk, 
      view: createList, 
      vm: formatStudent
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> run = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">root, {model, view, vm}</span>) </span>{
  <span class="hljs-keyword">const</span> rendered = view(vm(model))
  root.appendChild(rendered)
}
run(<span class="hljs-built_in">document</span>.body, {
      <span class="hljs-attr">model</span>: tk, 
      <span class="hljs-attr">view</span>: createList, 
      <span class="hljs-attr">vm</span>: formatStudent
})</code></pre>
<p>这种写法，熟悉vue或者regular的同学，应该会觉得似曾相识吧？</p>
<h1 id="articleHeader3">让我们来加点互动</h1>
<p>前面学生信息的身高的单位都是默认<code>m</code>，如果新增一个需求，要求学生的身高的单位可以在<code>m</code>和<code>cm</code>之间切换呢？</p>
<p>首先需要一个变量来保存度量单位，因此这里必须用一个新的Model：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const tk = {
    'first-name': 'Jessica',
    'last-name': 'Bre',
    'height': 180,
    'weight': 70,
}
const measurement = 'cm'
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> tk = {
    <span class="hljs-string">'first-name'</span>: <span class="hljs-string">'Jessica'</span>,
    <span class="hljs-string">'last-name'</span>: <span class="hljs-string">'Bre'</span>,
    <span class="hljs-string">'height'</span>: <span class="hljs-number">180</span>,
    <span class="hljs-string">'weight'</span>: <span class="hljs-number">70</span>,
}
<span class="hljs-keyword">const</span> measurement = <span class="hljs-string">'cm'</span>
</code></pre>
<p>为了让<code>tk</code>更方便的被其他模块重用，这里选择增加一个<code>measurement</code>数据源，而不是直接修改<code>tk</code>。</p>
<p>在视图部分要增加一个radio单选表单，用来切换身高单位。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const createList = function(kvPairs){
  const createListItem = function (label, content) {
    const li = document.createElement('li')
    const labelSpan = document.createElement('span')
    labelSpan.textContent = label
    const contentSpan = document.createElement('span')
    contentSpan.textContent = content
    li.appendChild(labelSpan)
    li.appendChild(contentSpan)
    return li
  }
  const root = document.createElement('ul')
  kvPairs.forEach(function (x) {
    root.appendChild(createListItem(x.key, x.value))
  })
  return root
}
const createToggle = function (options) {
  const createRadio = function (name, opt){
    const radio = document.createElement('input')
    radio.name = name
    radio.value = opt.value
    radio.type = 'radio'
    radio.textContent = opt.value
    radio.addEventListener('click', opt.onclick)
    radio.checked = opt.checked
    return radio
  }
  const root = document.createElement('form')
  options.opts.forEach(function (x) {
    root.appendChild(createRadio(options.name, x))
    root.appendChild(document.createTextNode(x.value))
  })
  return root
}
const createToggleableList = function(vm){
  const listView = createList(vm.kvPairs)
  const toggle = createToggle(vm.options)
  const root = document.createElement('div')
  root.appendChild(toggle)
  root.appendChild(listView)
  return root
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> createList = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">kvPairs</span>)</span>{
  <span class="hljs-keyword">const</span> createListItem = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">label, content</span>) </span>{
    <span class="hljs-keyword">const</span> li = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'li'</span>)
    <span class="hljs-keyword">const</span> labelSpan = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'span'</span>)
    labelSpan.textContent = label
    <span class="hljs-keyword">const</span> contentSpan = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'span'</span>)
    contentSpan.textContent = content
    li.appendChild(labelSpan)
    li.appendChild(contentSpan)
    <span class="hljs-keyword">return</span> li
  }
  <span class="hljs-keyword">const</span> root = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'ul'</span>)
  kvPairs.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">x</span>) </span>{
    root.appendChild(createListItem(x.key, x.value))
  })
  <span class="hljs-keyword">return</span> root
}
<span class="hljs-keyword">const</span> createToggle = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">options</span>) </span>{
  <span class="hljs-keyword">const</span> createRadio = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">name, opt</span>)</span>{
    <span class="hljs-keyword">const</span> radio = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'input'</span>)
    radio.name = name
    radio.value = opt.value
    radio.type = <span class="hljs-string">'radio'</span>
    radio.textContent = opt.value
    radio.addEventListener(<span class="hljs-string">'click'</span>, opt.onclick)
    radio.checked = opt.checked
    <span class="hljs-keyword">return</span> radio
  }
  <span class="hljs-keyword">const</span> root = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'form'</span>)
  options.opts.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">x</span>) </span>{
    root.appendChild(createRadio(options.name, x))
    root.appendChild(<span class="hljs-built_in">document</span>.createTextNode(x.value))
  })
  <span class="hljs-keyword">return</span> root
}
<span class="hljs-keyword">const</span> createToggleableList = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">vm</span>)</span>{
  <span class="hljs-keyword">const</span> listView = createList(vm.kvPairs)
  <span class="hljs-keyword">const</span> toggle = createToggle(vm.options)
  <span class="hljs-keyword">const</span> root = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'div'</span>)
  root.appendChild(toggle)
  root.appendChild(listView)
  <span class="hljs-keyword">return</span> root
}</code></pre>
<p>接下来是<code>ViewModel</code>部分，<code>createToggleableList</code>函数需要与之前的<code>createList</code>函数不同的参数。因此，对View-Model结构重构是有必要的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const createVm = function (model) {
  const calcHeight = function (measurement, cms) {
    if (measurement === 'm'){
      return cms / 100 + 'm'
    }else{
      return cms + 'cm'
    }
  }
  const options = {
    name: 'measurement',
    opts: [
      {
        value: 'cm',
        checked: model.measurement === 'cm',
        onclick: () => model.measurement = 'cm'
      },
      {
        value: 'm',
        checked: model.measurement === 'm',
        onclick: () => model.measurement = 'm'
      }
    ]
  }
  const kvPairs = [
    {
      key: 'Name: ',
      value: model.student['first-name'] + ' ' + model.student['last-name']
    },
    {
      key: 'Height: ',
      value: calcHeight(model.measurement, model.student['height'])
    },
    {
      key: 'Weight: ',
      value: model.student['weight'] + 'kg'
    },
    {
      key: 'BMI: ',
      value:  model.student['weight'] / (model.student['height'] * model.student['height'] / 10000)
    }]
  return {kvPairs, options}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> createVm = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">model</span>) </span>{
  <span class="hljs-keyword">const</span> calcHeight = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">measurement, cms</span>) </span>{
    <span class="hljs-keyword">if</span> (measurement === <span class="hljs-string">'m'</span>){
      <span class="hljs-keyword">return</span> cms / <span class="hljs-number">100</span> + <span class="hljs-string">'m'</span>
    }<span class="hljs-keyword">else</span>{
      <span class="hljs-keyword">return</span> cms + <span class="hljs-string">'cm'</span>
    }
  }
  <span class="hljs-keyword">const</span> options = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'measurement'</span>,
    <span class="hljs-attr">opts</span>: [
      {
        <span class="hljs-attr">value</span>: <span class="hljs-string">'cm'</span>,
        <span class="hljs-attr">checked</span>: model.measurement === <span class="hljs-string">'cm'</span>,
        <span class="hljs-attr">onclick</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> model.measurement = <span class="hljs-string">'cm'</span>
      },
      {
        <span class="hljs-attr">value</span>: <span class="hljs-string">'m'</span>,
        <span class="hljs-attr">checked</span>: model.measurement === <span class="hljs-string">'m'</span>,
        <span class="hljs-attr">onclick</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> model.measurement = <span class="hljs-string">'m'</span>
      }
    ]
  }
  <span class="hljs-keyword">const</span> kvPairs = [
    {
      <span class="hljs-attr">key</span>: <span class="hljs-string">'Name: '</span>,
      <span class="hljs-attr">value</span>: model.student[<span class="hljs-string">'first-name'</span>] + <span class="hljs-string">' '</span> + model.student[<span class="hljs-string">'last-name'</span>]
    },
    {
      <span class="hljs-attr">key</span>: <span class="hljs-string">'Height: '</span>,
      <span class="hljs-attr">value</span>: calcHeight(model.measurement, model.student[<span class="hljs-string">'height'</span>])
    },
    {
      <span class="hljs-attr">key</span>: <span class="hljs-string">'Weight: '</span>,
      <span class="hljs-attr">value</span>: model.student[<span class="hljs-string">'weight'</span>] + <span class="hljs-string">'kg'</span>
    },
    {
      <span class="hljs-attr">key</span>: <span class="hljs-string">'BMI: '</span>,
      <span class="hljs-attr">value</span>:  model.student[<span class="hljs-string">'weight'</span>] / (model.student[<span class="hljs-string">'height'</span>] * model.student[<span class="hljs-string">'height'</span>] / <span class="hljs-number">10000</span>)
    }]
  <span class="hljs-keyword">return</span> {kvPairs, options}
}</code></pre>
<p>这里为<code>createToggle</code>添加了<code>ops</code>，并且将<code>ops</code>封装成了一个对象。根据度量单位，使用不同的方式去计算身高。当任何一个<code>radio</code>被点击，数据的度量单位将会改变。</p>
<p>看上去很完美，但是当你点击radio标签的时候，视图不会有任何改变。因为这里还没有为视图做更新算法。有关<code>MVVM</code>如何处理视图更新，那是一个比较大的课题，需要另辟一个博文来讲，由于本文写的是一个精简的<code>MVVM</code>框架，这里就不再赘述，并用最简单的方式实现视图更新:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const run = function (root, {model, view, vm}) {
  let m = {...model}
  let m_old = {}
  setInterval( function (){
    if(!_.isEqual(m, m_old)){
      const rendered = view(vm(m))
      root.innerHTML = ''
      root.appendChild(rendered)
      m_old = {...m}
    }
  },1000)
}
run(document.body, {
      model: {student:tk, measurement}, 
      view: createToggleableList, 
      vm: createVm 
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> run = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">root, {model, view, vm}</span>) </span>{
  <span class="hljs-keyword">let</span> m = {...model}
  <span class="hljs-keyword">let</span> m_old = {}
  setInterval( <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">if</span>(!_.isEqual(m, m_old)){
      <span class="hljs-keyword">const</span> rendered = view(vm(m))
      root.innerHTML = <span class="hljs-string">''</span>
      root.appendChild(rendered)
      m_old = {...m}
    }
  },<span class="hljs-number">1000</span>)
}
run(<span class="hljs-built_in">document</span>.body, {
      <span class="hljs-attr">model</span>: {<span class="hljs-attr">student</span>:tk, measurement}, 
      <span class="hljs-attr">view</span>: createToggleableList, 
      <span class="hljs-attr">vm</span>: createVm 
})</code></pre>
<p>上述代码引用了一个外部库<code>lodash</code>的<code>isEqual</code>方法来比较数据模型是否有更新。此段代码应用了轮询，每秒都会检测数据是否发生变化，有变化了再更新视图。这是最笨的方法，并且在DOM结构比较复杂时，性能也会受到很大的影响。还是同样的话，本文的主题是<strong>一个精简的MVVM框架</strong>，因此略去了很多细节性的东西，只把主要的东西提炼出来，以达到更好的理解MVVM模式的目的。</p>
<h1 id="articleHeader4">MVVM框架的诞生</h1>
<p>以上便是一个简短精简的MVVM风格的学生信息的示例。至此，一个精简的MVVM框架其实已经出来了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
* @param {Node} root
* @param {Object} model
* @param {Function} view
* @param {Function} vm
*/
const run = function (root, {model, view, vm}) {
  let m = {...model}
  let m_old = {}
  setInterval( function (){
    if(!_.isEqual(m, m_old)){
      const rendered = view(vm(m))
      root.innerHTML = ''
      root.appendChild(rendered)
      m_old = {...m}
    }
  },1000)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
* @param {Node} root
* @param {Object} model
* @param {Function} view
* @param {Function} vm
*/</span>
<span class="hljs-keyword">const</span> run = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">root, {model, view, vm}</span>) </span>{
  <span class="hljs-keyword">let</span> m = {...model}
  <span class="hljs-keyword">let</span> m_old = {}
  setInterval( <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">if</span>(!_.isEqual(m, m_old)){
      <span class="hljs-keyword">const</span> rendered = view(vm(m))
      root.innerHTML = <span class="hljs-string">''</span>
      root.appendChild(rendered)
      m_old = {...m}
    }
  },<span class="hljs-number">1000</span>)
}</code></pre>
<p>什么?你确定不是在开玩笑？一个只有十行的框架？请记住：</p>
<blockquote><p>框架是对如何组织代码和整个项目如何通用运作的抽象。</p></blockquote>
<p>这并不意味着你应该有一堆代码或混乱的类，尽管企业可用的API列表经常都很可怕的长。但是如果你研读一个框架仓库的核心文件夹，你可能发现它会出乎意料的小（相比于整个项目来说）。其核心代码包含主要工作进程，而其他部分只是帮助开发人员以更加舒适的方式构建应用程序的附件。有兴趣的同学可以去看看<a href="https://cycle.js.org/" rel="nofollow noreferrer" target="_blank">cycle.js</a>,这个框架只有124行（包含注释和空格）。</p>
<h1 id="articleHeader5">总结</h1>
<p>此时用一张图来作为总结再好不过了！</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011187170" src="https://static.alili.tech/img/remote/1460000011187170" alt="alt MVVM模式" title="alt MVVM模式" style="cursor: pointer;"></span></p>
<p>当然这里还有很多细节需要进一步探讨，比如如何选择或设计一个更加友好的View层的视图工具，如何更新和何时更新视图比较合适等等。如果把这些问题都解决了，相信这种MVVM框架会更加健壮。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
一个只有十行的精简MVVM框架

## 原文链接
[https://segmentfault.com/a/1190000011187165](https://segmentfault.com/a/1190000011187165)

