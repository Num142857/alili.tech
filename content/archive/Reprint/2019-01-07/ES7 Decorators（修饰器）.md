---
title: 'ES7 Decorators（修饰器）' 
date: 2019-01-07 2:30:11
hidden: true
slug: rx750vox3vk
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">ES6 Decorators（修饰器）</h1>
<p><strong>修饰器（Decorator）是一个函数，用来修改类的行为。这是ES7的一个提案，目前Babel转码器已经支持</strong></p>
<blockquote>我们在游戏大型项目种经常会用到的方法，现在es6直接支持</blockquote>
<p><strong>想要使用Decorator的话需要我们配置一下文件夹，配置一下环境</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install babel-plugin-transform-decorators-legacy --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> babel-<span class="hljs-keyword">plugin</span>-transform-decorators-legacy <span class="hljs-comment">--save-dev</span></code></pre>
<p>完事配置一下babelrc文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;plugins&quot;: [&quot;transform-decorators-legacy&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs prolog"><code style="word-break: break-word; white-space: initial;"><span class="hljs-string">"plugins"</span>: [<span class="hljs-string">"transform-decorators-legacy"</span>]</code></pre>
<p><strong>先说一下装饰器的特点</strong></p>
<ul><li>装饰器本质是一个函数</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@hometown     hometown()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs aspectj"><code style="word-break: break-word; white-space: initial;"><span class="hljs-meta">@hometown</span>     hometown()</code></pre>
<ul><li>装饰对象可以使用多个装饰器</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@hometown(&quot;山西&quot;)
@school
    class Student{
        constructor(name){
            this.name=name;
        }
        @studyke(&quot;HTML&quot;)
        study(){
            console.log(this.name+&quot;  is studying&quot;+this.ke+&quot;!&quot;)
        }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-meta">@hometown(<span class="hljs-meta-string">"山西"</span>)</span>
<span class="hljs-meta">@school</span>
    <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Student</span></span>{
        <span class="hljs-keyword">constructor</span>(name){
            <span class="hljs-keyword">this</span>.name=name;
        }
        <span class="hljs-meta">@studyke(<span class="hljs-meta-string">"HTML"</span>)</span>
        study(){
            console.log(<span class="hljs-keyword">this</span>.name+<span class="hljs-string">"  is studying"</span>+<span class="hljs-keyword">this</span>.ke+<span class="hljs-string">"!"</span>)
        }
}</code></pre>
<ul><li>装饰器可以带参数</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function hometown(diqu){
            //target.home=&quot;xx&quot;;
            return function(target){
               target.home=diqu;
            }
        }

@hometown(&quot;山西&quot;)
class..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">hometown</span><span class="hljs-params">(diqu)</span></span>{
            <span class="hljs-comment">//target.home="xx";</span>
            <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(target)</span></span>{
               target.home=diqu;
            }
        }

@hometown(<span class="hljs-string">"山西"</span>)
<span class="hljs-class"><span class="hljs-keyword">class</span>...</span></code></pre>
<ul><li>装饰器修饰 类</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function school(target){
            console.log(&quot;123&quot;)
            target.schoolName=&quot;xxxx&quot;;
        }
        function hometown(diqu){
            //target.home=&quot;xx&quot;;
            return function(target){
               target.home=diqu;
            }
        }

        function studyke(kemu){
            return function(target){
                target.ke=kemu;
            }
        }
        @hometown(&quot;山西&quot;)
        @school
        class Student{
            constructor(name){
                this.name=name;
            }
            @studyke(&quot;HTML&quot;)
            study(){
                console.log(this.name+&quot;  is studying&quot;+this.ke+&quot;!&quot;)
            }
        }
        console.log(Student.schoolName);
        console.log(Student.home);

        let l=new Student(&quot;xiaoA&quot;);
        l.study();

        @school
        function Teacher(){

        } " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">school</span>(<span class="hljs-params">target</span>)</span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"123"</span>)
            target.schoolName=<span class="hljs-string">"xxxx"</span>;
        }
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">hometown</span>(<span class="hljs-params">diqu</span>)</span>{
            <span class="hljs-comment">//target.home="xx";</span>
            <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">target</span>)</span>{
               target.home=diqu;
            }
        }

        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">studyke</span>(<span class="hljs-params">kemu</span>)</span>{
            <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">target</span>)</span>{
                target.ke=kemu;
            }
        }
        @hometown(<span class="hljs-string">"山西"</span>)
        @school
        <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Student</span></span>{
            <span class="hljs-keyword">constructor</span>(name){
                <span class="hljs-keyword">this</span>.name=name;
            }
            @studyke(<span class="hljs-string">"HTML"</span>)
            study(){
                <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name+<span class="hljs-string">"  is studying"</span>+<span class="hljs-keyword">this</span>.ke+<span class="hljs-string">"!"</span>)
            }
        }
        <span class="hljs-built_in">console</span>.log(Student.schoolName);
        <span class="hljs-built_in">console</span>.log(Student.home);

        <span class="hljs-keyword">let</span> l=<span class="hljs-keyword">new</span> Student(<span class="hljs-string">"xiaoA"</span>);
        l.study();

        @school
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Teacher</span>(<span class="hljs-params"></span>)</span>{

        } </code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES7 Decorators（修饰器）

## 原文链接
[https://segmentfault.com/a/1190000010282841](https://segmentfault.com/a/1190000010282841)

