---
title: 'Decorators（修饰器）' 
date: 2019-01-07 2:30:11
hidden: true
slug: 2jfgtce1mmq
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">修饰器（Decorator）是一个函数，用来修改类的行为。</h3>
<h4>装饰对象可以使用多个装饰器</h4>
<h4>装饰器可以带参数</h4>
<h4>装饰器 修饰类 实例方法</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'use strict'

function school(){
        console.log('师徒');
    }

    @school
    class Student{
        constructor(name){
            this.name=name
        }
        study(){
            console.log(this.name+&quot; is studying&quot;);
        }
    }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-meta">'use strict'</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">school</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'师徒'</span>);
    }

    @school
    <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Student</span></span>{
        <span class="hljs-keyword">constructor</span>(name){
            <span class="hljs-keyword">this</span>.name=name
        }
        study(){
            <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name+<span class="hljs-string">" is studying"</span>);
        }
    }
</code></pre>
<h6>@school相当于一个修饰器</h6>
<h2 id="articleHeader1">需要先安装一个插件：</h2>
<p>npm install babel-plugin-transform-decorators-legacy --save-dev</p>
<h2 id="articleHeader2">然后在项目根目录下，找到：</h2>
<p>.babelrc=&gt;修改为"plugins": ["transform-decorators-legacy"]</p>
<p>在html文件里引用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function school(target){
    target.schoolName=&quot;师徒&quot;;
    }
    function hometown(diq){
        return function(target){
            target.home=diq;
        }
    }
    function studyke(kemu){
        return function(target){
            target.ke=kemu;
        }
    }
    
    @hometown(&quot;大广灵&quot;)
    @school
    
    class Student {
        constructor(name){
            this.name=name;
        }
        @studyke(&quot;jquery&quot;)
        study(){
            console.log(this.name+&quot;啦啦啦&quot;+this.ke);
        }
    }
    console.log(Student.schoolName);//师徒.
    console.log(Student.home);//广灵县.
    
    let l = new Student(&quot;ss&quot;);
    l.study();//ss在啦啦啦jquery.
    
    @school
    class Teacher {
        
    }
    console.log(Teacher.schoolName);//师徒." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">school</span>(<span class="hljs-params">target</span>)</span>{
    target.schoolName=<span class="hljs-string">"师徒"</span>;
    }
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">hometown</span>(<span class="hljs-params">diq</span>)</span>{
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">target</span>)</span>{
            target.home=diq;
        }
    }
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">studyke</span>(<span class="hljs-params">kemu</span>)</span>{
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">target</span>)</span>{
            target.ke=kemu;
        }
    }
    
    @hometown(<span class="hljs-string">"大广灵"</span>)
    @school
    
    <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Student</span> </span>{
        <span class="hljs-keyword">constructor</span>(name){
            <span class="hljs-keyword">this</span>.name=name;
        }
        @studyke(<span class="hljs-string">"jquery"</span>)
        study(){
            <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name+<span class="hljs-string">"啦啦啦"</span>+<span class="hljs-keyword">this</span>.ke);
        }
    }
    <span class="hljs-built_in">console</span>.log(Student.schoolName);<span class="hljs-comment">//师徒.</span>
    <span class="hljs-built_in">console</span>.log(Student.home);<span class="hljs-comment">//广灵县.</span>
    
    <span class="hljs-keyword">let</span> l = <span class="hljs-keyword">new</span> Student(<span class="hljs-string">"ss"</span>);
    l.study();<span class="hljs-comment">//ss在啦啦啦jquery.</span>
    
    @school
    <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Teacher</span> </span>{
        
    }
    <span class="hljs-built_in">console</span>.log(Teacher.schoolName);<span class="hljs-comment">//师徒.</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Decorators（修饰器）

## 原文链接
[https://segmentfault.com/a/1190000010280732](https://segmentfault.com/a/1190000010280732)

