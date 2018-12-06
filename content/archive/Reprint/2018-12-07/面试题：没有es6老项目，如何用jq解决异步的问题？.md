---
title: '面试题：没有es6老项目，如何用jq解决异步的问题？' 
date: 2018-12-07 2:30:10
hidden: true
slug: g283dt5ddfc
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">我们都知道es6提供了promise异步写法，但是大部分的公司都是jq写的，那我们如何用Jq来写和promise异步一样的写法呢？这个知道的人不多下面我们就来写写把</h3>
<p>注意： <br>1 JQ 1.5以上<br>2 关键api: $.Deferred()</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>Document</title>
</head>
<body>
    <p>deferred test</p>

    <script src=&quot;https://cdn.bootcss.com/jquery/3.2.0/jquery.min.js&quot;></script>
    <script type=&quot;text/javascript&quot;>
        
        // var wait = function () {
        //     var task = function () {
        //         console.log('执行完成')
        //     }
        //     setTimeout(task, 2000)
        // }
        // wait()

        // 已经封装好的（A 员工）
        function waitHandle() {
            // 定义
            var dtd = $.Deferred()
            var wait = function (dtd) {
                var task = function () {
                    console.log('执行完成')
                    // 成功
                    dtd.resolve()
                    // 失败
                    // dtd.reject()
                }
                setTimeout(task, 1000)
                // wait 返回
                return dtd.promise()
            }
            // 最终返回
            return wait(dtd)
        }

        // 使用（B 员工）
        var w = waitHandle()  // promise 对象
        $.when(w).then(function () {
            console.log('ok 1')
        }, function () {
            console.log('err 1')
        })

    </script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Document<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>deferred test<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/jquery/3.2.0/jquery.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
        
        <span class="hljs-comment">// var wait = function () {</span>
        <span class="hljs-comment">//     var task = function () {</span>
        <span class="hljs-comment">//         console.log('执行完成')</span>
        <span class="hljs-comment">//     }</span>
        <span class="hljs-comment">//     setTimeout(task, 2000)</span>
        <span class="hljs-comment">// }</span>
        <span class="hljs-comment">// wait()</span>

        <span class="hljs-comment">// 已经封装好的（A 员工）</span>
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">waitHandle</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 定义</span>
            <span class="hljs-keyword">var</span> dtd = $.Deferred()
            <span class="hljs-keyword">var</span> wait = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">dtd</span>) </span>{
                <span class="hljs-keyword">var</span> task = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'执行完成'</span>)
                    <span class="hljs-comment">// 成功</span>
                    dtd.resolve()
                    <span class="hljs-comment">// 失败</span>
                    <span class="hljs-comment">// dtd.reject()</span>
                }
                setTimeout(task, <span class="hljs-number">1000</span>)
                <span class="hljs-comment">// wait 返回</span>
                <span class="hljs-keyword">return</span> dtd.promise()
            }
            <span class="hljs-comment">// 最终返回</span>
            <span class="hljs-keyword">return</span> wait(dtd)
        }

        <span class="hljs-comment">// 使用（B 员工）</span>
        <span class="hljs-keyword">var</span> w = waitHandle()  <span class="hljs-comment">// promise 对象</span>
        $.when(w).then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'ok 1'</span>)
        }, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'err 1'</span>)
        })

    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>这样就可以使用了，其实promise的前身就是jq的deffered，封装好之后用法差不多，es6把他规范化了而已</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
面试题：没有es6老项目，如何用jq解决异步的问题？

## 原文链接
[https://segmentfault.com/a/1190000014121419](https://segmentfault.com/a/1190000014121419)

