---
title: 'Decorator' 
date: 2019-01-07 2:30:11
hidden: true
slug: ousy52roq0n
categories: [reprint]
---

{{< raw >}}

                    <div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="            //装饰器本质是一个函数
            //装饰对象可以使用多个装饰器
            //装饰器可以带参数
            //装饰器修饰类,实例方法
            //aop 设计思想（log，邮件发送）
        function school(target){
            target.schoolName=&quot;快手直播&quot;;
        }
        function hometown(diqu){
            return function(target){
                target.home=diqu;
            }
        }
        function studyke(kemu){
            return function(target){
                target.ke=kemu;
            }
        }
        
        @hometown(&quot;根里的&quot;)
        @school
        
        class Student {
            constructor(name){
                this.name=name;
            }
            @studyke(&quot;jquery&quot;)
            study(){
                console.log(this.name+&quot;在看&quot;+this.ke);
            }
        }
        console.log(Student.schoolName);//显示快手直播.
        console.log(Student.home);//显示根里的.
        
        let l = new Student(&quot;曹伟&quot;);
        l.study();//显示曹伟再看jquery.
        
        @school
        class Teacher {
            
        }
        console.log(Teacher.schoolName);//显示快手直播." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>            <span class="hljs-comment">//装饰器本质是一个函数</span>
            <span class="hljs-comment">//装饰对象可以使用多个装饰器</span>
            <span class="hljs-comment">//装饰器可以带参数</span>
            <span class="hljs-comment">//装饰器修饰类,实例方法</span>
            <span class="hljs-comment">//aop 设计思想（log，邮件发送）</span>
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">school</span>(<span class="hljs-params">target</span>)</span>{
            target.schoolName=<span class="hljs-string">"快手直播"</span>;
        }
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">hometown</span>(<span class="hljs-params">diqu</span>)</span>{
            <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">target</span>)</span>{
                target.home=diqu;
            }
        }
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">studyke</span>(<span class="hljs-params">kemu</span>)</span>{
            <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">target</span>)</span>{
                target.ke=kemu;
            }
        }
        
        @hometown(<span class="hljs-string">"根里的"</span>)
        @school
        
        <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Student</span> </span>{
            <span class="hljs-keyword">constructor</span>(name){
                <span class="hljs-keyword">this</span>.name=name;
            }
            @studyke(<span class="hljs-string">"jquery"</span>)
            study(){
                <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name+<span class="hljs-string">"在看"</span>+<span class="hljs-keyword">this</span>.ke);
            }
        }
        <span class="hljs-built_in">console</span>.log(Student.schoolName);<span class="hljs-comment">//显示快手直播.</span>
        <span class="hljs-built_in">console</span>.log(Student.home);<span class="hljs-comment">//显示根里的.</span>
        
        <span class="hljs-keyword">let</span> l = <span class="hljs-keyword">new</span> Student(<span class="hljs-string">"曹伟"</span>);
        l.study();<span class="hljs-comment">//显示曹伟再看jquery.</span>
        
        @school
        <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Teacher</span> </span>{
            
        }
        <span class="hljs-built_in">console</span>.log(Teacher.schoolName);<span class="hljs-comment">//显示快手直播.</span></code></pre>
                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Decorator

## 原文链接
[https://segmentfault.com/a/1190000010283707](https://segmentfault.com/a/1190000010283707)

