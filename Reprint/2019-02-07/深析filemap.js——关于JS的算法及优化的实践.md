---
title: '深析filemap.js——关于JS的算法及优化的实践' 
date: 2019-02-07 2:30:15
hidden: true
slug: rkeyqokbiq
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>项目地址：<a href="https://github.com/jrainlau/filemap" rel="nofollow noreferrer" target="_blank">链接描述</a><br>项目简介：<a href="https://segmentfault.com/a/1190000005968734">https://segmentfault.com/a/1190000005968734</a></p></blockquote>
<p>关于项目的用法和介绍可以查看上面的两个链接，这篇文章主要内容是对<code>filemap.js</code>的代码进行一步一步的分析，详细介绍其运行原理和优化策略。</p>
<h2 id="articleHeader0">知识点准备：</h2>
<ol>
<li><p><code>NodeJS</code>的基本使用方法（主要是<code>fs</code>文件系统）；</p></li>
<li><p><code>ES6</code>特性及语法（<code>let</code>, <code>const</code>, <code>for...of</code>, <code>arrow function</code>...）</p></li>
<li><p><code>n叉树先序遍历算法</code>。</p></li>
</ol>
<p>知识点1和2请自行查阅资料，现在对知识点3进行分析。</p>
<h2 id="articleHeader1">N叉树先序遍历算法</h2>
<p>首先明白什么是树。引用<a href="https://book.douban.com/subject/25945449/" rel="nofollow noreferrer" target="_blank">数据结构与算法JavaScript描述</a>：</p>
<blockquote><p>一个树结构包含一系列存在父子关系的节点。每个节点都有一个父节点（除了顶部的第一个节点）以及零个或多个子节点：<br><span class="img-wrap"><img data-src="/img/bVzhGh" src="https://static.alili.tech/img/bVzhGh" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>位于树顶部的节点叫作根节点（11）。它没有父节点。树中的每个元素都叫作节点，节点分为内部节点和外部节点。至少有一个子节点的节点称为内部节点（7、5、9、15、13和20是内部节点）。没有子元素的节点称为外部节点或叶节点（3、6、8、10、12、14、18和25是叶节点）。<br>一个节点可以有祖先和后代。一个节点（除了根节点）的祖先包括父节点、祖父节点、曾祖父节点等。一个节点的后代包括子节点、孙子节点、曾孙节点等。例如，节点5的祖先有节点7和节点11，后代有节点3和节点6。<br>有关树的另一个术语是子树。子树由节点和它的后代构成。例如，节点13、12和14构成了上图中树的一棵子树。<br>节点的一个属性是深度，节点的深度取决于它的祖先节点的数量。比如，节点3有3个祖先节点（5、7和11），它的深度为3。<br>树的高度取决于所有节点深度的最大值。一棵树也可以被分解成层级。根节点在第0层，它的子节点在第1层，以此类推。上图中的树的高度为3（最大高度已在图中表示——第3层）。</p></blockquote>
<p>对于一棵树的遍历，有<code>先序</code>，<code>中序</code>和<code>后序</code>三种遍历方式，在本例中使用的是<code>先序遍历</code>的方式。至于三种遍历方式的异同，请阅读<a href="https://book.douban.com/subject/25945449/" rel="nofollow noreferrer" target="_blank">数据结构与算法JavaScript描述</a>，里面有详细的介绍。</p>
<p>首先我们创建一棵树：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let treeObj = {
    '1': [
        { '2': [{ '5': [{ '11': '11' }, { '12': '12' }, { '13': '13' }, { '14': '14' }] }] },
        { '3': [{ '6': '6' }, { '7': '7' }] },
        { '4': [{ '8': '8' }, { '9': '9' }, { '10': '10' }] }
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-keyword">let</span> treeObj = {
    <span class="hljs-string">'1'</span>: [
        { <span class="hljs-string">'2'</span>: [{ <span class="hljs-string">'5'</span>: [{ <span class="hljs-string">'11'</span>: <span class="hljs-string">'11'</span> }, { <span class="hljs-string">'12'</span>: <span class="hljs-string">'12'</span> }, { <span class="hljs-string">'13'</span>: <span class="hljs-string">'13'</span> }, { <span class="hljs-string">'14'</span>: <span class="hljs-string">'14'</span> }] }] },
        { <span class="hljs-string">'3'</span>: [{ <span class="hljs-string">'6'</span>: <span class="hljs-string">'6'</span> }, { <span class="hljs-string">'7'</span>: <span class="hljs-string">'7'</span> }] },
        { <span class="hljs-string">'4'</span>: [{ <span class="hljs-string">'8'</span>: <span class="hljs-string">'8'</span> }, { <span class="hljs-string">'9'</span>: <span class="hljs-string">'9'</span> }, { <span class="hljs-string">'10'</span>: <span class="hljs-string">'10'</span> }] }
    ]
}</code></pre>
<p>为了简单方便，我把它的key和value都设置成了相同的值。在例子中我们使用的都是key值。<br>然后分析<code>先序遍历</code>的原理：<br><span class="img-wrap"><img data-src="/img/bVzbdS" src="https://static.alili.tech/img/bVzbdS" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>虚线为遍历顺序，可以看出<code>先序遍历</code>可以得到整棵树的结构，这正是我们所需要的。接下来看代码如何实现。先看完整代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let traverseNode = (node, deep) => {
    if (typeof node !== 'string') {
        let key = Object.keys(node)
        console.log(key, deep)
        for (let i = 0; i < node[key].length; i++) {
            traverseNode(node[key][i], deep + 1)
        }
    }
}

traverseNode(treeObj, 1)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>let traverseNode = (<span class="hljs-keyword">node</span><span class="hljs-title">, deep</span>) =&gt; {
    if (typeof <span class="hljs-keyword">node</span> <span class="hljs-title">!== 'string</span>') {
        let key = Object.keys(<span class="hljs-keyword">node</span><span class="hljs-title">)
        console</span>.log(key, deep)
        for (let i = <span class="hljs-number">0</span>; i <span class="hljs-tag">&lt; node[key].length; i++) {
            traverseNode(node[key][i], deep + 1)
        }
    }
}

traverseNode(treeObj, 1)</span></code></pre>
<p>我们创建了一个<code>traverseNode()</code>函数，它接收两个对象作为参数。<code>node</code>参数为传入的节点，<code>deep</code>参数为节点的起始深度。<br>首先使用<code>Object.keys(obj)</code>方法取得节点的key值，同时输出深度值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let key = Object.keys(node)
console.log(key, deep)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>let key = Object.keys(<span class="hljs-keyword">node</span><span class="hljs-title">)
console</span>.log(key, deep)</code></pre>
<p>运行，在控制台将会输出<code>[ '1' ] 1</code>。接下来我们使用递归来重复这个过程，进行完整的遍历运算：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (let i = 0; i < node[key].length; i++) {
    traverseNode(node[key][i], deep + 1)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs matlab"><code><span class="hljs-keyword">for</span> (let <span class="hljs-built_in">i</span> = <span class="hljs-number">0</span>; <span class="hljs-built_in">i</span> &lt; node[key].<span class="hljs-built_in">length</span>; <span class="hljs-built_in">i</span>++) {
    traverseNode(node[key][i], deep + <span class="hljs-number">1</span>)
}</code></pre>
<p>这个递归就是我们前文一直在说的<code>先序遍历</code>。对于<code>二叉树</code>：</p>
<blockquote><p>先序遍历是以优先于后代节点的顺序访问每个节点的。先序遍历的一种应用是打印一个结构化的文档。<br>先序遍历会先访问节点本身，然后再访问它的左侧子节点，最后是右侧子节点。<br><span class="img-wrap"><img data-src="/img/bVzhIi" src="https://static.alili.tech/img/bVzhIi" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p></blockquote>
<p>在理解完上面这段话以后，不难把<code>先序遍历</code>的思路扩展到<code>n叉树</code>：先访问节点本身，然后从左到右访问它的n个子节点。<br>每一次完整的for循环都意味着“往下走一层”，所以只需要<code>deep + 1</code>即可知道每一个节点对应的深度。</p>
<p>在本例子的遍历过程中，<code>node</code>都是一个个的对象而非字符串。如果检测到<code>node</code>为字符串，证明其已经到了最后一层，需要停止，否则会无限循环导致溢出，所以我们需要添加一个判断：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (typeof node !== 'string')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code style="word-break: break-word; white-space: initial;">if (typeof <span class="hljs-keyword">node</span> <span class="hljs-title">!== 'string</span>')</code></pre>
<p>大功告成，现在我们尝试运行一下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[ '1' ] 1
[ '2' ] 2
[ '5' ] 3
[ '11' ] 4
[ '12' ] 4
[ '13' ] 4
[ '14' ] 4
[ '3' ] 2
[ '6' ] 3
[ '7' ] 3
[ '4' ] 2
[ '8' ] 3
[ '9' ] 3
[ '10' ] 3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scheme"><code>[ <span class="hljs-symbol">'1</span>' ] <span class="hljs-number">1</span>
[ <span class="hljs-symbol">'2</span>' ] <span class="hljs-number">2</span>
[ <span class="hljs-symbol">'5</span>' ] <span class="hljs-number">3</span>
[ <span class="hljs-symbol">'11</span>' ] <span class="hljs-number">4</span>
[ <span class="hljs-symbol">'12</span>' ] <span class="hljs-number">4</span>
[ <span class="hljs-symbol">'13</span>' ] <span class="hljs-number">4</span>
[ <span class="hljs-symbol">'14</span>' ] <span class="hljs-number">4</span>
[ <span class="hljs-symbol">'3</span>' ] <span class="hljs-number">2</span>
[ <span class="hljs-symbol">'6</span>' ] <span class="hljs-number">3</span>
[ <span class="hljs-symbol">'7</span>' ] <span class="hljs-number">3</span>
[ <span class="hljs-symbol">'4</span>' ] <span class="hljs-number">2</span>
[ <span class="hljs-symbol">'8</span>' ] <span class="hljs-number">3</span>
[ <span class="hljs-symbol">'9</span>' ] <span class="hljs-number">3</span>
[ <span class="hljs-symbol">'10</span>' ] <span class="hljs-number">3</span></code></pre>
<p>完美。</p>
<h2 id="articleHeader2">filemap.js原理</h2>
<p><code>filemap.js</code>通过遍历一个文件夹内部的所有子文件和子文件夹，输出其目录结构。我们使用<code>fs</code>文件系统来进行。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const fs = require('fs')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>)</code></pre>
<p>然后来构造核心部分代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 判断类型。若该路径对应的是文件夹则返回true，否则返回false
let isDic = (url) => fs.statSync(url).isDirectory()

const traverseFiles = (path, deep) => {
  let files = fs.readdirSync(path)
  for (let i = 0, len = files.length; i < len; i++) {
    if (files[i] !== 'filemap.js') console.log(deep, files[i], '\n') // 忽略filemap.js本身
    let dirPath = path + '\\' + files[i]
    // 当且仅当是文件夹时才进行下一轮遍历
    if (isDic(dirPath)) traverseFiles(dirPath, deep + 1)
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 判断类型。若该路径对应的是文件夹则返回true，否则返回false</span>
<span class="hljs-keyword">let</span> isDic = <span class="hljs-function">(<span class="hljs-params">url</span>) =&gt;</span> fs.statSync(url).isDirectory()

<span class="hljs-keyword">const</span> traverseFiles = <span class="hljs-function">(<span class="hljs-params">path, deep</span>) =&gt;</span> {
  <span class="hljs-keyword">let</span> files = fs.readdirSync(path)
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>, len = files.length; i &lt; len; i++) {
    <span class="hljs-keyword">if</span> (files[i] !== <span class="hljs-string">'filemap.js'</span>) <span class="hljs-built_in">console</span>.log(deep, files[i], <span class="hljs-string">'\n'</span>) <span class="hljs-comment">// 忽略filemap.js本身</span>
    <span class="hljs-keyword">let</span> dirPath = path + <span class="hljs-string">'\\'</span> + files[i]
    <span class="hljs-comment">// 当且仅当是文件夹时才进行下一轮遍历</span>
    <span class="hljs-keyword">if</span> (isDic(dirPath)) traverseFiles(dirPath, deep + <span class="hljs-number">1</span>)
  }
}</code></pre>
<p>文件目录结构其实就是一棵典型的<code>n叉树</code>，通过前文的例子，不难明白这段代码的原理。首先通过<code>fs.readdirSync(path)</code>同步地获取某路径对应的所有文件（夹），然后进行递归。可以把它理解为从第二层开始遍历，所以在写法上和前文例子稍有不同。</p>
<p>现在我们已经可以获取文件及其所在的深度了，接下来就是对这些信息进行格式化，使其输出更加直观。为了输出类似</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="|__folder
    |__file1
    |__file2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code><span class="hljs-string">|__folder</span>
    <span class="hljs-string">|__file1</span>
    <span class="hljs-string">|__file2</span></code></pre>
<p>这样的树状结构，我们需要判断不同的深度对应的缩进，所以我们来定义一个<code>placeHolder()</code>函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const placeHolder = (num) => {
  if (placeHolder.cache[num]) return placeHolder.cache[num] + '|__'
  placeHolder.cache[num] = ''
  for (let i = 0; i < num; i++) {
    placeHolder.cache[num] += '  '
  }
  return placeHolder.cache[num] + '|__'
}
placeHolder.cache = {}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-keyword">const</span> placeHolder = (<span class="hljs-built_in">num</span>) =&gt; {
  <span class="hljs-keyword">if</span> (placeHolder.cache[<span class="hljs-built_in">num</span>]) <span class="hljs-keyword">return</span> placeHolder.cache[<span class="hljs-built_in">num</span>] + <span class="hljs-string">'|__'</span>
  placeHolder.cache[<span class="hljs-built_in">num</span>] = <span class="hljs-string">''</span>
  <span class="hljs-keyword">for</span> (let i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-built_in">num</span>; i++) {
    placeHolder.cache[<span class="hljs-built_in">num</span>] += <span class="hljs-string">'  '</span>
  }
  <span class="hljs-keyword">return</span> placeHolder.cache[<span class="hljs-built_in">num</span>] + <span class="hljs-string">'|__'</span>
}
placeHolder.cache = {}</code></pre>
<p>这里涉及到一个<code>缓存函数执行结果</code>的优化策略。由于该函数多次被使用，如果每一次都是从头开始进行for循环，在性能上有着巨大的浪费。所以我们可以把它的执行结果缓存起来，当以后遇到相同情况时只需要取出缓存的结果即可，无需重新运算，大大提升了性能。</p>
<p>现在我们把核心代码改写一下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let isDic = (url) => fs.statSync(url).isDirectory()

const traverseFiles = (path, deep) => {
  let files = fs.readdirSync(path)
  for (let i = 0, len = files.length; i < len; i++) {
    if (files[i] !== 'filemap.js') console.log(placeHolder(deep), files[i], '\n') // 忽略filemap.js本身
    let dirPath = path + '\\' + files[i]
    if (isDic(dirPath)) traverseFiles(dirPath, deep + 1)
  }
}

traverseFiles('./', 1)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> isDic = <span class="hljs-function">(<span class="hljs-params">url</span>) =&gt;</span> fs.statSync(url).isDirectory()

<span class="hljs-keyword">const</span> traverseFiles = <span class="hljs-function">(<span class="hljs-params">path, deep</span>) =&gt;</span> {
  <span class="hljs-keyword">let</span> files = fs.readdirSync(path)
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>, len = files.length; i &lt; len; i++) {
    <span class="hljs-keyword">if</span> (files[i] !== <span class="hljs-string">'filemap.js'</span>) <span class="hljs-built_in">console</span>.log(placeHolder(deep), files[i], <span class="hljs-string">'\n'</span>) <span class="hljs-comment">// 忽略filemap.js本身</span>
    <span class="hljs-keyword">let</span> dirPath = path + <span class="hljs-string">'\\'</span> + files[i]
    <span class="hljs-keyword">if</span> (isDic(dirPath)) traverseFiles(dirPath, deep + <span class="hljs-number">1</span>)
  }
}

traverseFiles(<span class="hljs-string">'./'</span>, <span class="hljs-number">1</span>)</code></pre>
<p>在根目录中运行<code>node filemap.js</code>，我们就能够得到完美的文件目录树状结构图了。</p>
<h2 id="articleHeader3">功能进一步扩展</h2>
<p>现在是“无差别”地对所有文件夹进行展开。如果想要忽略某些文件夹，比如<code>.git</code>或者<code>node_modules</code>之类的文件夹，应该如何做呢？参考命令行输入参数的方法，这个需求不难实现。<br>首先获取需要忽略的文件夹名：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let ignoreCase = {}
if(process.argv[2] === '-i'){
    for (let i of process.argv.slice(3)) {
      ignoreCase[i] = true
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>let ignoreCase = {}
<span class="hljs-function"><span class="hljs-title">if</span><span class="hljs-params">(process.argv[<span class="hljs-number">2</span>] === <span class="hljs-string">'-i'</span>)</span></span>{
    <span class="hljs-keyword">for</span> (let <span class="hljs-selector-tag">i</span> of process<span class="hljs-selector-class">.argv</span><span class="hljs-selector-class">.slice</span>(<span class="hljs-number">3</span>)) {
      ignoreCase[i] = true
    }
}</code></pre>
<p><code>ignoreCase</code>保存着需要忽略的文件夹名。这里使用对象而不是数组的原因是，当判断一个<code>item</code>是否被已经被保存的时候，<code>item.indexOf(Array)</code>的效率并没有<code>Object[item]</code>来得高。使用<code>for...of</code>循环能够直接取得对象。</p>
<p>接下来我们可以在核心代码中多加一个判断：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let isDic = (url) => fs.statSync(url).isDirectory()

const traverseFiles = (path, deep) => {
  let files = fs.readdirSync(path)
  let con = false
  for (let i = 0, len = files.length; i < len; i++) {
    if (files[i] !== 'filemap.js') console.log(placeHolder(deep), files[i], '\n')
    con = ignoreCase[files[i]] === undefined? true: false
    let dirPath = path + '\\' + files[i]
    if (isDic(dirPath) &amp;&amp; con) traverseFiles(dirPath, deep + 1)
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> isDic = <span class="hljs-function">(<span class="hljs-params">url</span>) =&gt;</span> fs.statSync(url).isDirectory()

<span class="hljs-keyword">const</span> traverseFiles = <span class="hljs-function">(<span class="hljs-params">path, deep</span>) =&gt;</span> {
  <span class="hljs-keyword">let</span> files = fs.readdirSync(path)
  <span class="hljs-keyword">let</span> con = <span class="hljs-literal">false</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>, len = files.length; i &lt; len; i++) {
    <span class="hljs-keyword">if</span> (files[i] !== <span class="hljs-string">'filemap.js'</span>) <span class="hljs-built_in">console</span>.log(placeHolder(deep), files[i], <span class="hljs-string">'\n'</span>)
    con = ignoreCase[files[i]] === <span class="hljs-literal">undefined</span>? <span class="hljs-literal">true</span>: <span class="hljs-literal">false</span>
    <span class="hljs-keyword">let</span> dirPath = path + <span class="hljs-string">'\\'</span> + files[i]
    <span class="hljs-keyword">if</span> (isDic(dirPath) &amp;&amp; con) traverseFiles(dirPath, deep + <span class="hljs-number">1</span>)
  }
}</code></pre>
<p>被忽略的文件夹将不会进行递归运算。<br>最后别忘了在退出进程：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="process.exit()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code style="word-break: break-word; white-space: initial;">process.<span class="hljs-keyword">exit</span>()</code></pre>
<p>至此，完整的<code>filemap.js</code>已经完成，其所有代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * @author Jrain Lau
 * @email jrainlau@163.com
 * @date 2016-07-14
 */
 
'use strict'
const fs = require('fs')

let ignoreCase = {}
if(process.argv[2] === '-i'){
    for (let i of process.argv.slice(3)) {
      ignoreCase[i] = true
    }
}

console.log('\n\nThe files tree is:\n=================\n\n')

const placeHolder = (num) => {
  if (placeHolder.cache[num]) return placeHolder.cache[num] + '|__'
  placeHolder.cache[num] = ''
  for (let i = 0; i < num; i++) {
    placeHolder.cache[num] += '  '
  }
  return placeHolder.cache[num] + '|__'
}
placeHolder.cache = {}

let isDic = (url) => fs.statSync(url).isDirectory()

const traverseFiles = (path, deep) => {
  let files = fs.readdirSync(path)
  let con = false
  for (let i = 0, len = files.length; i < len; i++) {
    if (files[i] !== 'filemap.js') console.log(placeHolder(deep), files[i], '\n')
    con = ignoreCase[files[i]] === undefined? true: false
    let dirPath = path + '\\' + files[i]
    if (isDic(dirPath) &amp;&amp; con) traverseFiles(dirPath, deep + 1)
  }
}

traverseFiles('./', 1)

process.exit()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">/**
 * @author Jrain Lau
 * @email jrainlau@163.com
 * @date 2016-07-14
 */</span>
<span class="hljs-meta"> 
'use strict'</span>
<span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>)

<span class="hljs-keyword">let</span> ignoreCase = {}
<span class="hljs-keyword">if</span>(process.argv[<span class="hljs-number">2</span>] === <span class="hljs-string">'-i'</span>){
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i <span class="hljs-keyword">of</span> process.argv.slice(<span class="hljs-number">3</span>)) {
      ignoreCase[i] = <span class="hljs-literal">true</span>
    }
}

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'\n\nThe files tree is:\n=================\n\n'</span>)

<span class="hljs-keyword">const</span> placeHolder = <span class="hljs-function">(<span class="hljs-params">num</span>) =&gt;</span> {
  <span class="hljs-keyword">if</span> (placeHolder.cache[num]) <span class="hljs-keyword">return</span> placeHolder.cache[num] + <span class="hljs-string">'|__'</span>
  placeHolder.cache[num] = <span class="hljs-string">''</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; num; i++) {
    placeHolder.cache[num] += <span class="hljs-string">'  '</span>
  }
  <span class="hljs-keyword">return</span> placeHolder.cache[num] + <span class="hljs-string">'|__'</span>
}
placeHolder.cache = {}

<span class="hljs-keyword">let</span> isDic = <span class="hljs-function">(<span class="hljs-params">url</span>) =&gt;</span> fs.statSync(url).isDirectory()

<span class="hljs-keyword">const</span> traverseFiles = <span class="hljs-function">(<span class="hljs-params">path, deep</span>) =&gt;</span> {
  <span class="hljs-keyword">let</span> files = fs.readdirSync(path)
  <span class="hljs-keyword">let</span> con = <span class="hljs-literal">false</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>, len = files.length; i &lt; len; i++) {
    <span class="hljs-keyword">if</span> (files[i] !== <span class="hljs-string">'filemap.js'</span>) <span class="hljs-built_in">console</span>.log(placeHolder(deep), files[i], <span class="hljs-string">'\n'</span>)
    con = ignoreCase[files[i]] === <span class="hljs-literal">undefined</span>? <span class="hljs-literal">true</span>: <span class="hljs-literal">false</span>
    <span class="hljs-keyword">let</span> dirPath = path + <span class="hljs-string">'\\'</span> + files[i]
    <span class="hljs-keyword">if</span> (isDic(dirPath) &amp;&amp; con) traverseFiles(dirPath, deep + <span class="hljs-number">1</span>)
  }
}

traverseFiles(<span class="hljs-string">'./'</span>, <span class="hljs-number">1</span>)

process.exit()</code></pre>
<p>使用时只需要带上参数<code>-i 文件夹1 文件夹2 ...</code>即可控制文件夹的展开与否。</p>
<h2 id="articleHeader4">后记</h2>
<p>在学习<a href="https://book.douban.com/subject/25945449/" rel="nofollow noreferrer" target="_blank">数据结构与算法JavaScript描述</a>的过程中，有时候真的觉得特别困，后来发挥自己喜欢折腾的个性，想办法把枯燥的东西进行实践，不知不觉就会变得有趣了。在<code>filemap.js</code>的早期版本中有着许多bug和性能问题，比如不合理使用三元表达式，没有缓存函数执行结果，判断文件类型考虑不周等等情况。文中所涉及到的优化策略，有很多是来自他人的指点和一次次的修改才最终得出来的，在此非常感谢给予我帮助的人。</p>
<p>最后感谢你的阅读。我是Jrain，欢迎关注<a href="https://segmentfault.com/blog/jrain">我的专栏</a>，将不定期分享自己的学习体验，开发心得，搬运墙外的干货。下次见啦！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
深析filemap.js——关于JS的算法及优化的实践

## 原文链接
[https://segmentfault.com/a/1190000005987714](https://segmentfault.com/a/1190000005987714)

