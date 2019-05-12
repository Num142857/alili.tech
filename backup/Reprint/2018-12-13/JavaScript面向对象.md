---
title: 'JavaScript面向对象' 
date: 2018-12-13 2:30:07
hidden: true
slug: jwxmedairp
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">面向对象</h1>
<h3 id="articleHeader1">面向过程与面向对象编程</h3>
<p>1、面向过程：所有的工作都是现写现用。</p>
<p>2、面向对象：是一种编程思想，许多功能事先已经编写好了，在使用时，只需要关注功能的运用，而不需要这个功能的具体实现过程。</p>
<h3 id="articleHeader2">javascript对象</h3>
<p>将相关的变量和函数组合成一个整体，这个整体叫做对象，对象中的变量叫做属性，变量中的函数叫做方法。javascript中的对象类似字典。</p>
<h3 id="articleHeader3">创建对象的方法</h3>
<h4>1、单体</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/javascript&quot;>
var Tom = {
    name : 'tom',
    age : 18,
    showname : function(){
        alert('我的名字叫'+this.name);    
    },
    showage : function(){
        alert('我今年'+this.age+'岁');    
    }
}
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="actionscript">
<span class="hljs-keyword">var</span> Tom = {
    name : <span class="hljs-string">'tom'</span>,
    age : <span class="hljs-number">18</span>,
    showname : <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
        alert(<span class="hljs-string">'我的名字叫'</span>+<span class="hljs-keyword">this</span>.name);    
    },
    showage : <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
        alert(<span class="hljs-string">'我今年'</span>+<span class="hljs-keyword">this</span>.age+<span class="hljs-string">'岁'</span>);    
    }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<h4>2、工厂模式</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/javascript&quot;>

function Person(name,age,job){
    var o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.showname = function(){
        alert('我的名字叫'+this.name);    
    };
    o.showage = function(){
        alert('我今年'+this.age+'岁');    
    };
    o.showjob = function(){
        alert('我的工作是'+this.job);    
    };
    return o;
}
var tom = Person('tom',18,'程序员');
tom.showname();

</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params">name,age,job</span>)</span>{
    <span class="hljs-keyword">var</span> o = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Object</span>();
    o.name = name;
    o.age = age;
    o.job = job;
    o.showname = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        alert(<span class="hljs-string">'我的名字叫'</span>+<span class="hljs-keyword">this</span>.name);    
    };
    o.showage = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        alert(<span class="hljs-string">'我今年'</span>+<span class="hljs-keyword">this</span>.age+<span class="hljs-string">'岁'</span>);    
    };
    o.showjob = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        alert(<span class="hljs-string">'我的工作是'</span>+<span class="hljs-keyword">this</span>.job);    
    };
    <span class="hljs-keyword">return</span> o;
}
<span class="hljs-keyword">var</span> tom = Person(<span class="hljs-string">'tom'</span>,<span class="hljs-number">18</span>,<span class="hljs-string">'程序员'</span>);
tom.showname();

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<h4>3、构造函数</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/javascript&quot;>
    function Person(name,age,job){            
        this.name = name;
        this.age = age;
        this.job = job;
        this.showname = function(){
            alert('我的名字叫'+this.name);    
        };
        this.showage = function(){
            alert('我今年'+this.age+'岁');    
        };
        this.showjob = function(){
            alert('我的工作是'+this.job);    
        };
    }
    var tom = new Person('tom',18,'程序员');
    var jack = new Person('jack',19,'销售');
    alert(tom.showjob==jack.showjob);
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="actionscript">
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span><span class="hljs-params">(name,age,job)</span></span>{            
        <span class="hljs-keyword">this</span>.name = name;
        <span class="hljs-keyword">this</span>.age = age;
        <span class="hljs-keyword">this</span>.job = job;
        <span class="hljs-keyword">this</span>.showname = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
            alert(<span class="hljs-string">'我的名字叫'</span>+<span class="hljs-keyword">this</span>.name);    
        };
        <span class="hljs-keyword">this</span>.showage = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
            alert(<span class="hljs-string">'我今年'</span>+<span class="hljs-keyword">this</span>.age+<span class="hljs-string">'岁'</span>);    
        };
        <span class="hljs-keyword">this</span>.showjob = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
            alert(<span class="hljs-string">'我的工作是'</span>+<span class="hljs-keyword">this</span>.job);    
        };
    }
    <span class="hljs-keyword">var</span> tom = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">'tom'</span>,<span class="hljs-number">18</span>,<span class="hljs-string">'程序员'</span>);
    <span class="hljs-keyword">var</span> jack = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">'jack'</span>,<span class="hljs-number">19</span>,<span class="hljs-string">'销售'</span>);
    alert(tom.showjob==jack.showjob);
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<h4>4、原型模式</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/javascript&quot;>
    function Person(name,age,job){        
        this.name = name;
        this.age = age;
        this.job = job;
    }
    Person.prototype.showname = function(){
        alert('我的名字叫'+this.name);    
    };
    Person.prototype.showage = function(){
        alert('我今年'+this.age+'岁');    
    };
    Person.prototype.showjob = function(){
        alert('我的工作是'+this.job);    
    };
    var tom = new Person('tom',18,'程序员');
    var jack = new Person('jack',19,'销售');
    alert(tom.showjob==jack.showjob);
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="actionscript">
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span><span class="hljs-params">(name,age,job)</span></span>{        
        <span class="hljs-keyword">this</span>.name = name;
        <span class="hljs-keyword">this</span>.age = age;
        <span class="hljs-keyword">this</span>.job = job;
    }
    Person.prototype.showname = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
        alert(<span class="hljs-string">'我的名字叫'</span>+<span class="hljs-keyword">this</span>.name);    
    };
    Person.prototype.showage = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
        alert(<span class="hljs-string">'我今年'</span>+<span class="hljs-keyword">this</span>.age+<span class="hljs-string">'岁'</span>);    
    };
    Person.prototype.showjob = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
        alert(<span class="hljs-string">'我的工作是'</span>+<span class="hljs-keyword">this</span>.job);    
    };
    <span class="hljs-keyword">var</span> tom = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">'tom'</span>,<span class="hljs-number">18</span>,<span class="hljs-string">'程序员'</span>);
    <span class="hljs-keyword">var</span> jack = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">'jack'</span>,<span class="hljs-number">19</span>,<span class="hljs-string">'销售'</span>);
    alert(tom.showjob==jack.showjob);
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<h4>5、继承</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/javascript&quot;>

        function fclass(name,age){
            this.name = name;
            this.age = age;
        }
        fclass.prototype.showname = function(){
            alert(this.name);
        }
        fclass.prototype.showage = function(){
            alert(this.age);
        }
        function sclass(name,age,job)
        {
            fclass.call(this,name,age);
            this.job = job;
        }
        sclass.prototype = new fclass();
        sclass.prototype.showjob = function(){
            alert(this.job);
        }
        var tom = new sclass('tom',19,'全栈工程师');
        tom.showname();
        tom.showage();
        tom.showjob();
    </script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="actionscript">

        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fclass</span><span class="hljs-params">(name,age)</span></span>{
            <span class="hljs-keyword">this</span>.name = name;
            <span class="hljs-keyword">this</span>.age = age;
        }
        fclass.prototype.showname = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
            alert(<span class="hljs-keyword">this</span>.name);
        }
        fclass.prototype.showage = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
            alert(<span class="hljs-keyword">this</span>.age);
        }
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sclass</span><span class="hljs-params">(name,age,job)</span>
        </span>{
            fclass.call(<span class="hljs-keyword">this</span>,name,age);
            <span class="hljs-keyword">this</span>.job = job;
        }
        sclass.prototype = <span class="hljs-keyword">new</span> fclass();
        sclass.prototype.showjob = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
            alert(<span class="hljs-keyword">this</span>.job);
        }
        <span class="hljs-keyword">var</span> tom = <span class="hljs-keyword">new</span> sclass(<span class="hljs-string">'tom'</span>,<span class="hljs-number">19</span>,<span class="hljs-string">'全栈工程师'</span>);
        tom.showname();
        tom.showage();
        tom.showjob();
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript面向对象

## 原文链接
[https://segmentfault.com/a/1190000013304366](https://segmentfault.com/a/1190000013304366)

