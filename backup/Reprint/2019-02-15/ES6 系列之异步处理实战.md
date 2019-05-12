---
title: 'ES6 系列之异步处理实战' 
date: 2019-02-15 2:30:44
hidden: true
slug: vwkme203i7
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>我们以<code>查找指定目录下的最大文件</code>为例，感受从</p>
<p>回调函数 -&gt; Promise -&gt; Generator -&gt; Async</p>
<p>异步处理方式的改变。</p>
<h2 id="articleHeader1">API 介绍</h2>
<p>为了实现这个功能，我们需要用到几个 Nodejs 的 API，所以我们来简单介绍一下。</p>
<h3 id="articleHeader2">fs.readdir</h3>
<p>readdir 方法用于读取目录，返回一个包含文件和目录的数组。</p>
<h3 id="articleHeader3">fs.stat</h3>
<p>stat 方法的参数是一个文件或目录，它产生一个对象，该对象包含了该文件或目录的具体信息。此外，该对象还有一个 isFile() 方法可以判断正在处理的到底是一个文件，还是一个目录。</p>
<h2 id="articleHeader4">思路分析</h2>
<p>我们基本的实现思路就是：</p>
<ol>
<li>用 <code>fs.readdir</code> 获取指定目录的内容信息</li>
<li>循环遍历内容信息，使用 <code>fs.stat</code> 获取该文件或者目录的具体信息</li>
<li>将具体信息储存起来</li>
<li>当全部储存起来后，筛选其中的是文件的信息</li>
<li>遍历比较，找出最大文件</li>
<li>获取并返回最大文件</li>
</ol>
<p>然后我们直接上代码吧。</p>
<h2 id="articleHeader5">回调函数</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var fs = require('fs');
var path = require('path');

function findLargest(dir, cb) {
    // 读取目录下的所有文件
    fs.readdir(dir, function(er, files) {
        if (er) return cb(er);

        var counter = files.length;
        var errored = false;
        var stats = [];

        files.forEach(function(file, index) {
            // 读取文件信息
            fs.stat(path.join(dir, file), function(er, stat) {

                if (errored) return;

                if (er) {
                    errored = true;
                    return cb(er);
                }

                stats[index] = stat;

                // 事先算好有多少个文件，读完 1 个文件信息，计数减 1，当为 0 时，说明读取完毕，此时执行最终的比较操作
                if (--counter == 0) {

                    var largest = stats
                        .filter(function(stat) { return stat.isFile() })
                        .reduce(function(prev, next) {
                            if (prev.size > next.size) return prev
                            return next
                        })

                    cb(null, files[stats.indexOf(largest)])
                }
            })
        })
    })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>);
<span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">findLargest</span>(<span class="hljs-params">dir, cb</span>) </span>{
    <span class="hljs-comment">// 读取目录下的所有文件</span>
    fs.readdir(dir, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">er, files</span>) </span>{
        <span class="hljs-keyword">if</span> (er) <span class="hljs-keyword">return</span> cb(er);

        <span class="hljs-keyword">var</span> counter = files.length;
        <span class="hljs-keyword">var</span> errored = <span class="hljs-literal">false</span>;
        <span class="hljs-keyword">var</span> stats = [];

        files.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">file, index</span>) </span>{
            <span class="hljs-comment">// 读取文件信息</span>
            fs.stat(path.join(dir, file), <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">er, stat</span>) </span>{

                <span class="hljs-keyword">if</span> (errored) <span class="hljs-keyword">return</span>;

                <span class="hljs-keyword">if</span> (er) {
                    errored = <span class="hljs-literal">true</span>;
                    <span class="hljs-keyword">return</span> cb(er);
                }

                stats[index] = stat;

                <span class="hljs-comment">// 事先算好有多少个文件，读完 1 个文件信息，计数减 1，当为 0 时，说明读取完毕，此时执行最终的比较操作</span>
                <span class="hljs-keyword">if</span> (--counter == <span class="hljs-number">0</span>) {

                    <span class="hljs-keyword">var</span> largest = stats
                        .filter(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">stat</span>) </span>{ <span class="hljs-keyword">return</span> stat.isFile() })
                        .reduce(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">prev, next</span>) </span>{
                            <span class="hljs-keyword">if</span> (prev.size &gt; next.size) <span class="hljs-keyword">return</span> prev
                            <span class="hljs-keyword">return</span> next
                        })

                    cb(<span class="hljs-literal">null</span>, files[stats.indexOf(largest)])
                }
            })
        })
    })
}</code></pre>
<p>使用方式为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 查找当前目录最大的文件
findLargest('./', function(er, filename) {
    if (er) return console.error(er)
    console.log('largest file was:', filename)
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 查找当前目录最大的文件</span>
findLargest(<span class="hljs-string">'./'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">er, filename</span>) </span>{
    <span class="hljs-keyword">if</span> (er) <span class="hljs-keyword">return</span> <span class="hljs-built_in">console</span>.error(er)
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'largest file was:'</span>, filename)
});</code></pre>
<h2 id="articleHeader6">Promise</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var fs = require('fs');
var path = require('path');

var readDir = function(dir) {
    return new Promise(function(resolve, reject) {
        fs.readdir(dir, function(err, files) {
            if (err) reject(err);
            resolve(files)
        })
    })
}

var stat = function(path) {
    return new Promise(function(resolve, reject) {
        fs.stat(path, function(err, stat) {
            if (err) reject(err)
            resolve(stat)
        })
    })
}

function findLargest(dir) {
    return readDir(dir)
        .then(function(files) {
            let promises = files.map(file => stat(path.join(dir, file)))
            return Promise.all(promises).then(function(stats) {
                return { stats, files }
            })
        })
        .then(data => {

            let largest = data.stats
                .filter(function(stat) { return stat.isFile() })
                .reduce((prev, next) => {
                    if (prev.size > next.size) return prev
                    return next
                })

            return data.files[data.stats.indexOf(largest)]
        })

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>);
<span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);

<span class="hljs-keyword">var</span> readDir = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">dir</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
        fs.readdir(dir, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, files</span>) </span>{
            <span class="hljs-keyword">if</span> (err) reject(err);
            resolve(files)
        })
    })
}

<span class="hljs-keyword">var</span> stat = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">path</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
        fs.stat(path, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, stat</span>) </span>{
            <span class="hljs-keyword">if</span> (err) reject(err)
            resolve(stat)
        })
    })
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">findLargest</span>(<span class="hljs-params">dir</span>) </span>{
    <span class="hljs-keyword">return</span> readDir(dir)
        .then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">files</span>) </span>{
            <span class="hljs-keyword">let</span> promises = files.map(<span class="hljs-function"><span class="hljs-params">file</span> =&gt;</span> stat(path.join(dir, file)))
            <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.all(promises).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">stats</span>) </span>{
                <span class="hljs-keyword">return</span> { stats, files }
            })
        })
        .then(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> {

            <span class="hljs-keyword">let</span> largest = data.stats
                .filter(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">stat</span>) </span>{ <span class="hljs-keyword">return</span> stat.isFile() })
                .reduce(<span class="hljs-function">(<span class="hljs-params">prev, next</span>) =&gt;</span> {
                    <span class="hljs-keyword">if</span> (prev.size &gt; next.size) <span class="hljs-keyword">return</span> prev
                    <span class="hljs-keyword">return</span> next
                })

            <span class="hljs-keyword">return</span> data.files[data.stats.indexOf(largest)]
        })

}</code></pre>
<p>使用方式为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="findLargest('./')
.then(function(filename) {
    console.log('largest file was:', filename);
})
.catch(function() {
    console.log(error);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">findLargest(<span class="hljs-string">'./'</span>)
.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">filename</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'largest file was:'</span>, filename);
})
.catch(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(error);
});</code></pre>
<h2 id="articleHeader7">Generator</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var fs = require('fs');
var path = require('path');

var co = require('co')

var readDir = function(dir) {
    return new Promise(function(resolve, reject) {
        fs.readdir(dir, function(err, files) {
            if (err) reject(err);
            resolve(files)
        })
    })
}

var stat = function(path) {
    return new Promise(function(resolve, reject) {
        fs.stat(path, function(err, stat) {
            if (err) reject(err)
            resolve(stat)
        })
    })
}

function* findLargest(dir) {
    var files = yield readDir(dir);
    var stats = yield files.map(function(file) {
        return stat(path.join(dir, file))
    })

    let largest = stats
        .filter(function(stat) { return stat.isFile() })
        .reduce((prev, next) => {
            if (prev.size > next.size) return prev
            return next
        })

    return files[stats.indexOf(largest)]

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>);
<span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);

<span class="hljs-keyword">var</span> co = <span class="hljs-built_in">require</span>(<span class="hljs-string">'co'</span>)

<span class="hljs-keyword">var</span> readDir = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">dir</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
        fs.readdir(dir, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, files</span>) </span>{
            <span class="hljs-keyword">if</span> (err) reject(err);
            resolve(files)
        })
    })
}

<span class="hljs-keyword">var</span> stat = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">path</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
        fs.stat(path, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, stat</span>) </span>{
            <span class="hljs-keyword">if</span> (err) reject(err)
            resolve(stat)
        })
    })
}

<span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">findLargest</span>(<span class="hljs-params">dir</span>) </span>{
    <span class="hljs-keyword">var</span> files = <span class="hljs-keyword">yield</span> readDir(dir);
    <span class="hljs-keyword">var</span> stats = <span class="hljs-keyword">yield</span> files.map(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">file</span>) </span>{
        <span class="hljs-keyword">return</span> stat(path.join(dir, file))
    })

    <span class="hljs-keyword">let</span> largest = stats
        .filter(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">stat</span>) </span>{ <span class="hljs-keyword">return</span> stat.isFile() })
        .reduce(<span class="hljs-function">(<span class="hljs-params">prev, next</span>) =&gt;</span> {
            <span class="hljs-keyword">if</span> (prev.size &gt; next.size) <span class="hljs-keyword">return</span> prev
            <span class="hljs-keyword">return</span> next
        })

    <span class="hljs-keyword">return</span> files[stats.indexOf(largest)]

}</code></pre>
<p>使用方式为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="co(findLargest, './')
.then(function(filename) {
    console.log('largest file was:', filename);
})
.catch(function() {
    console.log(error);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">co(findLargest, <span class="hljs-string">'./'</span>)
.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">filename</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'largest file was:'</span>, filename);
})
.catch(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(error);
});</code></pre>
<h2 id="articleHeader8">Async</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var fs = require('fs');
var path = require('path');

var readDir = function(dir) {
    return new Promise(function(resolve, reject) {
        fs.readdir(dir, function(err, files) {
            if (err) reject(err);
            resolve(files)
        })
    })
}

var stat = function(path) {
    return new Promise(function(resolve, reject) {
        fs.stat(path, function(err, stat) {
            if (err) reject(err)
            resolve(stat)
        })
    })
}

async function findLargest(dir) {
    var files = await readDir(dir);

    let promises = files.map(file => stat(path.join(dir, file)))
    var stats = await Promise.all(promises)

    let largest = stats
        .filter(function(stat) { return stat.isFile() })
        .reduce((prev, next) => {
            if (prev.size > next.size) return prev
            return next
        })

    return files[stats.indexOf(largest)]

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>);
<span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);

<span class="hljs-keyword">var</span> readDir = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">dir</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
        fs.readdir(dir, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, files</span>) </span>{
            <span class="hljs-keyword">if</span> (err) reject(err);
            resolve(files)
        })
    })
}

<span class="hljs-keyword">var</span> stat = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">path</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
        fs.stat(path, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, stat</span>) </span>{
            <span class="hljs-keyword">if</span> (err) reject(err)
            resolve(stat)
        })
    })
}

<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">findLargest</span>(<span class="hljs-params">dir</span>) </span>{
    <span class="hljs-keyword">var</span> files = <span class="hljs-keyword">await</span> readDir(dir);

    <span class="hljs-keyword">let</span> promises = files.map(<span class="hljs-function"><span class="hljs-params">file</span> =&gt;</span> stat(path.join(dir, file)))
    <span class="hljs-keyword">var</span> stats = <span class="hljs-keyword">await</span> <span class="hljs-built_in">Promise</span>.all(promises)

    <span class="hljs-keyword">let</span> largest = stats
        .filter(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">stat</span>) </span>{ <span class="hljs-keyword">return</span> stat.isFile() })
        .reduce(<span class="hljs-function">(<span class="hljs-params">prev, next</span>) =&gt;</span> {
            <span class="hljs-keyword">if</span> (prev.size &gt; next.size) <span class="hljs-keyword">return</span> prev
            <span class="hljs-keyword">return</span> next
        })

    <span class="hljs-keyword">return</span> files[stats.indexOf(largest)]

}</code></pre>
<p>使用方式为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="findLargest('./')
.then(function(filename) {
    console.log('largest file was:', filename);
})
.catch(function() {
    console.log(error);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">findLargest(<span class="hljs-string">'./'</span>)
.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">filename</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'largest file was:'</span>, filename);
})
.catch(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(error);
});</code></pre>
<h2 id="articleHeader9">ES6 系列</h2>
<p>ES6 系列目录地址：<a href="https://github.com/mqyqingfeng/Blog" rel="nofollow noreferrer" target="_blank">https://github.com/mqyqingfeng/Blog</a></p>
<p>ES6 系列预计写二十篇左右，旨在加深 ES6 部分知识点的理解，重点讲解块级作用域、标签模板、箭头函数、Symbol、Set、Map 以及 Promise 的模拟实现、模块加载方案、异步处理等内容。</p>
<p>如果有错误或者不严谨的地方，请务必给予指正，十分感谢。如果喜欢或者有所启发，欢迎 star，对作者也是一种鼓励。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES6 系列之异步处理实战

## 原文链接
[https://segmentfault.com/a/1190000016802611](https://segmentfault.com/a/1190000016802611)

