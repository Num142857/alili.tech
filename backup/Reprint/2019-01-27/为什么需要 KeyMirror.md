---
title: '为什么需要 KeyMirror' 
date: 2019-01-27 2:31:00
hidden: true
slug: 9q0xjy9504k
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">前言</h3>
<p>今天有朋友问了 “KeyMirror” 这个库有什么用的问题，其实这个问题并不难，这里扫一下盲区。</p>
<p>会按照下面这个逻辑来展开，彻底理解一下：</p>
<ol>
<li><p>KeyMirror 有什么用？</p></li>
<li><p>Google Closure Compiler 是什么？</p></li>
<li><p>KeyMirror 解决了什么问题，好处是什么?</p></li>
<li><p>KeyMirror 的源码是什么样子？</p></li>
<li><p>用 Gulp 配置一个压缩任务，测试一下 Google Closure Compiler.</p></li>
</ol>
<h3 id="articleHeader1">一、KeyMirror 有什么用</h3>
<p>直观的来看一下，测试代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var kv = {
    GET_USER: null,
    SET_USER: null,
    REMOVE_USER: null
};

// keyMirror 是对应的测试方法
var kv_new = keyMirror(kv);
console.log(kv);
console.log(kv_new);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> kv = {
    <span class="hljs-attr">GET_USER</span>: <span class="hljs-literal">null</span>,
    <span class="hljs-attr">SET_USER</span>: <span class="hljs-literal">null</span>,
    <span class="hljs-attr">REMOVE_USER</span>: <span class="hljs-literal">null</span>
};

<span class="hljs-comment">// keyMirror 是对应的测试方法</span>
<span class="hljs-keyword">var</span> kv_new = keyMirror(kv);
<span class="hljs-built_in">console</span>.log(kv);
<span class="hljs-built_in">console</span>.log(kv_new);</code></pre>
<p>最后输出的结果如下：</p>
<p><span class="img-wrap"><img data-src="/img/bVIvB8?w=200&amp;h=167" src="https://static.alili.tech/img/bVIvB8?w=200&amp;h=167" alt="结果" title="结果" style="cursor: pointer; display: inline;"></span></p>
<p>然后就是相当于重新生成了一个 <code>key == value</code> 的结构。但是肯定就会想，为毛要多此一举呢？其实这个跟 <strong>Google Closure Compiler</strong> 的 <strong>Advanced</strong> 模式有关。接下来我们来看一下它是什么。</p>
<h3 id="articleHeader2">二、Google Closure Compiler 是什么</h3>
<p>如果有兴趣的朋友可以直接跳到文章后面，使用 Gulp 把环境搭起来测试，因为下面的地址都要翻墙！</p>
<p>有官方文档，需要翻墙：<a href="https://developers.google.com/closure/compiler/" rel="nofollow noreferrer" target="_blank">文档</a>。</p>
<p>大致的意思就是说，Closure Compiler 是一个工具，这个工具能够编译 JavaScript 代码，编译后的代码能下载更快并且执行也更快。它能够解析你的 JS 代码，并且去分析它，能移除没有使用到的代码，重写、压缩得到最终的生产环境下的 JS 代码。它拥有检测语法、变量声明、类型定义以及对 JS 语言缺陷做一些检查。</p>
<p>总之，这就是做 JS 编译并且做一些常用检测的一款工具。</p>
<p>具体能够在线体验，也需要翻墙，<a href="http://closure-compiler.appspot.com/home" rel="nofollow noreferrer" target="_blank">在线体验地址</a></p>
<p>这个工具有三种模式：</p>
<ol>
<li><p>只去空格（ Whitespace only ）</p></li>
<li><p>简单处理（ Simple ）</p></li>
<li><p>最优处理（ Advanced ）</p></li>
</ol>
<p>用 KeyMirror 的原因就是因为第三种（Advanced，最优处理）模式下，会将 <code>Map&lt;K, V&gt;</code> 格式的 K 进行压缩，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 源代码
var kv = {
    GET_USER: null,
    SET_USER: null,
    REMOVE_USER: null
};

// 编译后( 整理了一下格式，实际情况下会再添加压缩 )
var a = {
    a: null,
    c: null,
    b: null
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 源代码</span>
<span class="hljs-keyword">var</span> kv = {
    <span class="hljs-attr">GET_USER</span>: <span class="hljs-literal">null</span>,
    <span class="hljs-attr">SET_USER</span>: <span class="hljs-literal">null</span>,
    <span class="hljs-attr">REMOVE_USER</span>: <span class="hljs-literal">null</span>
};

<span class="hljs-comment">// 编译后( 整理了一下格式，实际情况下会再添加压缩 )</span>
<span class="hljs-keyword">var</span> a = {
    <span class="hljs-attr">a</span>: <span class="hljs-literal">null</span>,
    <span class="hljs-attr">c</span>: <span class="hljs-literal">null</span>,
    <span class="hljs-attr">b</span>: <span class="hljs-literal">null</span>
};</code></pre>
<p>在引用的时候就变成：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 源代码
var kv_new = keyMirror(kv);
console.log(kv_new.GET_USER);

// 编译后
var a = keyMirror({ a: null, c: null, b: null });
console.log(a.a);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 源代码</span>
<span class="hljs-keyword">var</span> kv_new = keyMirror(kv);
<span class="hljs-built_in">console</span>.log(kv_new.GET_USER);

<span class="hljs-comment">// 编译后</span>
<span class="hljs-keyword">var</span> a = keyMirror({ <span class="hljs-attr">a</span>: <span class="hljs-literal">null</span>, <span class="hljs-attr">c</span>: <span class="hljs-literal">null</span>, <span class="hljs-attr">b</span>: <span class="hljs-literal">null</span> });
<span class="hljs-built_in">console</span>.log(a.a);</code></pre>
<p><strong>这样如果在没有进行 KeyMirror 处理的时候，引用就会错误了，这种编译模式破坏了我们的代码</strong>，要避免这个编译导致的 <code>Key</code> 改变，可以给 <code>Key</code> 添加引号（单、双均可），其实能够分析的就是静态的属性，动态基本上是不好做好的，可以这样理解。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 源代码
var kv = {
    'STOP_USER': null
};

// 编译后
var a = {
    STOP_USER: null
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 源代码</span>
<span class="hljs-keyword">var</span> kv = {
    <span class="hljs-string">'STOP_USER'</span>: <span class="hljs-literal">null</span>
};

<span class="hljs-comment">// 编译后</span>
<span class="hljs-keyword">var</span> a = {
    <span class="hljs-attr">STOP_USER</span>: <span class="hljs-literal">null</span>
};</code></pre>
<blockquote><p>然而我们这样做了之后，代码就得不到更有效的压缩，这样 <code>Closure Compiler</code> 的功能就被削弱了，所以引入 <code>KeyMirror</code> 既能保证代码前后的功能一致，也能享受压缩带来的性能提升。</p></blockquote>
<h3 id="articleHeader3">三、KeyMirror 的源码是什么样子</h3>
<p>既然知道了上面的背景和原因，我们来看下如何实现一个这玩意，其实特别简单的功能，就是让 K,V 相等。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var keyMirror = function(obj) {
    var ret = {};
    var key;
    
    // 对参数的控制，必须是对象
    if (!(obj instanceof Object &amp;&amp; !Array.isArray(obj))) {
        throw new Error('keyMirror(...): Argument must be an object.');
    }
    
    // 简单的遍历，将对应 K 赋值给 Map[K]
    for (key in obj) {
        // 只拷贝自己的属性
        if (!obj.hasOwnProperty(key)) {
            continue;
        }
        ret[key] = key;
    }
    
    return ret;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> keyMirror = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj</span>) </span>{
    <span class="hljs-keyword">var</span> ret = {};
    <span class="hljs-keyword">var</span> key;
    
    <span class="hljs-comment">// 对参数的控制，必须是对象</span>
    <span class="hljs-keyword">if</span> (!(obj <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Object</span> &amp;&amp; !<span class="hljs-built_in">Array</span>.isArray(obj))) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'keyMirror(...): Argument must be an object.'</span>);
    }
    
    <span class="hljs-comment">// 简单的遍历，将对应 K 赋值给 Map[K]</span>
    <span class="hljs-keyword">for</span> (key <span class="hljs-keyword">in</span> obj) {
        <span class="hljs-comment">// 只拷贝自己的属性</span>
        <span class="hljs-keyword">if</span> (!obj.hasOwnProperty(key)) {
            <span class="hljs-keyword">continue</span>;
        }
        ret[key] = key;
    }
    
    <span class="hljs-keyword">return</span> ret;
};</code></pre>
<h3 id="articleHeader4">四、Gulp 配置测试 Closure Compiler</h3>
<p>这里需要用到两个东西：gulp、google-closure-compiler-js</p>
<p>直接上代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var gulp = require('gulp');
var compiler = require('google-closure-compiler-js').gulp();

gulp.task('go', function () {
    return gulp.src('./index.js')
        .pipe(compiler({
            // 编译等级，不区分大小写哈
            compilation_level: 'advanced',
            warning_level: 'VERBOSE',
            output_wrapper: '(function(){\n%output%\n}).call(this)',
            js_output_file: 'index.advanced.min.js',
            create_source_map: true
        }))
        .pipe(gulp.dest('.'));
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> gulp = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp'</span>);
<span class="hljs-keyword">var</span> compiler = <span class="hljs-built_in">require</span>(<span class="hljs-string">'google-closure-compiler-js'</span>).gulp();

gulp.task(<span class="hljs-string">'go'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> gulp.src(<span class="hljs-string">'./index.js'</span>)
        .pipe(compiler({
            <span class="hljs-comment">// 编译等级，不区分大小写哈</span>
            compilation_level: <span class="hljs-string">'advanced'</span>,
            <span class="hljs-attr">warning_level</span>: <span class="hljs-string">'VERBOSE'</span>,
            <span class="hljs-attr">output_wrapper</span>: <span class="hljs-string">'(function(){\n%output%\n}).call(this)'</span>,
            <span class="hljs-attr">js_output_file</span>: <span class="hljs-string">'index.advanced.min.js'</span>,
            <span class="hljs-attr">create_source_map</span>: <span class="hljs-literal">true</span>
        }))
        .pipe(gulp.dest(<span class="hljs-string">'.'</span>));
});</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 测试代码
var kv = {
    GET_USER: null,
    SET_USER: null,
    REMOVE_USER: null
};
// 必须要和 keyMirror 代码一起，不然会被提示 error。
// Error: Compilation error, 1 errors
var kv_new = keyMirror(kv);
console.log(kv);
console.log(kv_new);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 测试代码</span>
<span class="hljs-keyword">var</span> kv = {
    <span class="hljs-attr">GET_USER</span>: <span class="hljs-literal">null</span>,
    <span class="hljs-attr">SET_USER</span>: <span class="hljs-literal">null</span>,
    <span class="hljs-attr">REMOVE_USER</span>: <span class="hljs-literal">null</span>
};
<span class="hljs-comment">// 必须要和 keyMirror 代码一起，不然会被提示 error。</span>
<span class="hljs-comment">// Error: Compilation error, 1 errors</span>
<span class="hljs-keyword">var</span> kv_new = keyMirror(kv);
<span class="hljs-built_in">console</span>.log(kv);
<span class="hljs-built_in">console</span>.log(kv_new);</code></pre>
<p>亲测非常的慢，不知道是不是我姿势不对，advanced 模式都是花费 12s 左右，simple 模式也花费 8s 左右，第一次测试我还卡挂了，所以基本上代码量上去了感觉是不适用的。</p>
<p>参考地址：</p>
<p>[1] <a href="https://developers.google.com/closure/compiler/" rel="nofollow noreferrer" target="_blank">https://developers.google.com/closure/compiler/</a></p>
<p>[2] <a href="https://github.com/facebook/react/issues/1639" rel="nofollow noreferrer" target="_blank">https://github.com/facebook/react/issues/1639</a></p>
<p>[3] <a href="https://gist.github.com/zpao/d25251b139647a79cddf" rel="nofollow noreferrer" target="_blank">https://gist.github.com/zpao/d25251b139647a79cddf</a><button class="btn btn-xs btn-default ml10 preview" data-url="zpao/d25251b139647a79cddf" data-typeid="1">点击预览</button></p>
<p>[4] <a href="https://www.npmjs.com/package/keymirror" rel="nofollow noreferrer" target="_blank">https://www.npmjs.com/package/keymirror</a></p>
<p>原文出自：<a href="http://60sky.com/post/why-key-mirror.html" rel="nofollow noreferrer" target="_blank">http://60sky.com/post/why-key-mirror.html</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
为什么需要 KeyMirror

## 原文链接
[https://segmentfault.com/a/1190000008185613](https://segmentfault.com/a/1190000008185613)

