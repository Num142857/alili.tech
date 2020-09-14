---
title: 'javascript模块化（二）--RequireJS初探' 
date: 2019-02-07 2:30:15
hidden: true
slug: z4djq6je9xm
categories: [reprint]
---

{{< raw >}}

                    
<p>前言：在慕课网上跟着视频《侧边工具栏开发》做了一遍，用到了jquery操作DOM，其中，用requirejs管理模块依赖，然后自定义了两个模块它们都依赖jquery，并且其中一个自定义模块依赖另一个，所以要暴露出接口。看完视频初步认识了一下requirejs，以及模块化开发的概念，在此做一下总结。感谢慕课网上的老师。</p>
<p>使用模块化开发的好处：</p>
<ol>
<li><p>有效的防止命名冲突</p></li>
<li><p>声明不同的js文件之间的依赖</p></li>
<li><p>可以让我们写出模块化的代码，便于复用</p></li>
</ol>
<h2 id="articleHeader0">1.需求与目标</h2>
<p>这个视频《侧边工具栏开发》的需求很简单，就是做一个侧边工具条，</p>
<ol>
<li><p>固定定位在页面的某个位置，</p></li>
<li><p>在没有把页面向下滚动时，显示三个按钮，</p></li>
<li><p>当页面向下滚动一定距离之后，第四个按钮出现。</p></li>
<li><p>点击这个按钮，页面会回到顶部。</p></li>
<li><p>鼠标hover到每个按钮上都有一些相应的动画（CSS3完成这里不写）</p></li>
</ol>
<p><span class="img-wrap"><img data-src="/img/bVznRD" src="https://static.alili.tech/img/bVznRD" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><span class="img-wrap"><img data-src="/img/bVznQn" src="https://static.alili.tech/img/bVznQn" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">2.HTML结构</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="       <div class=&quot;toolbar&quot;>
            <!--第一个微信按钮-->
            <a href=&quot;javascript:;&quot; class=&quot;toolbar-item toolbar-item-weixin&quot;>
                <span class=&quot;toolbar-layer&quot;></span>
            </a>
    
            <!--第二个意见反馈按钮-->
            <a href=&quot;javascript:;&quot; class=&quot;toolbar-item toolbar-feedback&quot;></a>
    
            <!--第三个app下载按钮-->
            <a href=&quot;javascript:;&quot; class=&quot;toolbar-item toolbar-item-app&quot;>
                <span class=&quot;toolbar-layer&quot;></span>
            </a>
    
            <!--第四个回到顶部按钮-->
            <a id=&quot;backTop&quot; href=&quot;javascript:;&quot; class=&quot;toolbar-item toolbar-item-top&quot;></a>
        </div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">       <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"toolbar"</span>&gt;</span>
            <span class="hljs-comment">&lt;!--第一个微信按钮--&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:;"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"toolbar-item toolbar-item-weixin"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"toolbar-layer"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    
            <span class="hljs-comment">&lt;!--第二个意见反馈按钮--&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:;"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"toolbar-item toolbar-feedback"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    
            <span class="hljs-comment">&lt;!--第三个app下载按钮--&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:;"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"toolbar-item toolbar-item-app"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"toolbar-layer"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    
            <span class="hljs-comment">&lt;!--第四个回到顶部按钮--&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"backTop"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:;"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"toolbar-item toolbar-item-top"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>一些说明：</p>
<ol>
<li><p>为了让页面显示滚动条，需要在这个上述代码下面加很多行<code>&lt;p&gt;&lt;/p&gt;</code>标签以便撑开页面显示滚动条。</p></li>
<li><p>CSS部分视频中老师讲了三种方法，并且用到了SASS，感兴趣的同学可以去看一下，这里不再赘述。</p></li>
</ol>
<h2 id="articleHeader2">3.requirejs入门</h2>
<h3 id="articleHeader3">（1）项目目录结构</h3>
<p>其中jquery-3.1.0.js和require.js是在各自官网下载的资源文件。main.js是自定义的入口文件。<br><span class="img-wrap"><img data-src="/img/bVznRY" src="https://static.alili.tech/img/bVznRY" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h3 id="articleHeader4">（2）加载初始化requirejs</h3>
<p>在未引入模块化编写代码以前引入js文件是在<code>&lt;body&gt;</code>标签之前写多个<code>&lt;script&gt;</code>标签，根据js文件加载的顺序，添加js文件。现在根据<code>requirejs</code>的异步加载的特性，可以设定一个主入口文件，只用一个<code>&lt;script&gt;</code>实现其余js文件的加载。</p>
<ol>
<li><p>首先是引入requirejs：在<code>HTML</code>文件的<code>&lt;body&gt;</code>标签的之前添加script标签，</p></li>
<li><p>然后引入<code>requirejs</code>文件，然后用<code>data-main</code>这个属性来引入入口文件。（当用requirejs引用文件时，可以省略js文件的js后缀名，所以此处引入的就是项目目录中的<code>main.js</code>）<br>如下：</p></li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <script src=&quot;js/require.js&quot; data-main=&quot;js/main&quot;></script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    &lt;script src=<span class="hljs-string">"js/require.js"</span> data-main=<span class="hljs-string">"js/main"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
</code></pre>
<h3 id="articleHeader5">（3）requirejs的常用方法</h3>
<ol><li><p><code>requirejs.config</code>（<code>为模块指定别名，方便模块的引入</code>），<strong><code>在入口文件中定义</code></strong><br>如这个demo要引入多次<code>jquery-3.1.0.js</code>，但是这个名字很长所以可以在入口文件<code>main.js</code>中为它定义一个别名，如下：</p></li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    //为jquery模块定义别名
    requirejs.config({
        paths:{
            jquery:'jquery-3.1.0.js'
        }
    });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-comment">//为jquery模块定义别名</span>
    requirejs.config({
        <span class="hljs-attr">paths</span>:{
            <span class="hljs-attr">jquery</span>:<span class="hljs-string">'jquery-3.1.0.js'</span>
        }
    });</code></pre>
<ol><li><p><code>requirejs()</code>方法（<code>将写好的模块进行引入</code>）<br>requirejs()接收两个参数，第一个参数是一个数组，写入要引入的模块的名字。第二个参数是一个回调函数，需要传递一个参数，来代替前面所引入的模块。如：引入jquery模块</p></li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    requirejs(['jquery'],function($){
        //写一段代码验证jquery是否被正确引入
        //将body背景颜色变为红色
        $('body').css('background-color','red');
    });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    requirejs([<span class="hljs-string">'jquery'</span>],<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">$</span>)</span>{
        <span class="hljs-comment">//写一段代码验证jquery是否被正确引入</span>
        <span class="hljs-comment">//将body背景颜色变为红色</span>
        $(<span class="hljs-string">'body'</span>).css(<span class="hljs-string">'background-color'</span>,<span class="hljs-string">'red'</span>);
    });</code></pre>
<ol><li><p><code>define()</code>(<code>利用它定义编写模块，然后在相应的地方进行引入。</code>)<br><code>define()</code>接收三个参数，第一个参数是为本模块命名的值，可以不写，第二个参数表示需要引入的模块，第三个参数是各依赖项成功加载后所运行的函数，传入的参数与各个依赖项形成对应的关系。</p></li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    define(
        moduleName,  //可选，如果此参数不写，则默认使用本模块所在文件的文件名
        dependencies,    //一个数组，此数组包含着此文件所需的各个依赖项目，这个数组中各项对应的是所依赖文件相对于requirejs库所形成的相对路径文件名。
        function(parameters){  
            //各依赖项成功加载后所运行的函数
            //传入的参数与dependencies数组中的各个依赖项形成对应关系
        }
    );" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    define(
        moduleName,  <span class="hljs-comment">//可选，如果此参数不写，则默认使用本模块所在文件的文件名</span>
        dependencies,    <span class="hljs-comment">//一个数组，此数组包含着此文件所需的各个依赖项目，这个数组中各项对应的是所依赖文件相对于requirejs库所形成的相对路径文件名。</span>
        <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">parameters</span>)</span>{  
            <span class="hljs-comment">//各依赖项成功加载后所运行的函数</span>
            <span class="hljs-comment">//传入的参数与dependencies数组中的各个依赖项形成对应关系</span>
        }
    );</code></pre>
<h3 id="articleHeader6">（4）demo的基本功能实现</h3>
<p>现在先对demo中的基本功能进行实现：</p>
<p>目前的目录结构如下：<br><span class="img-wrap"><img data-src="/img/bVznRY" src="https://static.alili.tech/img/bVznRY" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<ol>
<li><p>首先在HTML中初始化<code>requirejs</code>：在<code>&lt;/body&gt;</code>标签之前:<br><code>&lt;script src="js/require.js" data-main="js/main"&gt;&lt;/script&gt;</code></p></li>
<li><p>在入口文件main.js中实现基本功能</p></li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
    //1.首先为jquery模块定义别名
    requirejs.config({
        paths: {
            jquery: 'jquery-3.1.0'
        }
    });
        
    //2.然后用requirejs()方法引入jquery模块实现demo中需求
    requirejs(['jquery'],function($){
    
        //为id值为backTop的第四个按钮添加点击回到顶部事件,当点击时执行move函数回到顶部
        $('#backTop').on('click',move);
        
        //监听一下windows对象的滚动事件，
        //每次滚动都执行函数checkPosition确定一下位置,是否到达设定的临界点，以显示和隐藏第四个按钮
        $(window).on('scroll',function(){
            checkPosition($(window).height());
        });
        
        //解决bug：在刷新页面时也出现第四个按钮，即页面加载时就检查一下滚动位置
        checkPosition($(window).height());

//------------------------------分割线------------------------------------------
        //move函数的具体实现，加动画效果
        function move(){
            $('html, body').animate({
                scrollTop:0
            },800);
        }
        //go函数可以立即移动到顶部
        function go(){
            $('html, body').scrollTop(0);
        }

        //checkPosition函数的具体实现
        function checkPosition(pos){
            if($(window).scrollTop() > pos){
                $('#backTop').fadeIn();
            }else{
                $('#backTop').fadeOut();
            }
        }
    });
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
    <span class="hljs-comment">//1.首先为jquery模块定义别名</span>
    requirejs.config({
        <span class="hljs-attr">paths</span>: {
            <span class="hljs-attr">jquery</span>: <span class="hljs-string">'jquery-3.1.0'</span>
        }
    });
        
    <span class="hljs-comment">//2.然后用requirejs()方法引入jquery模块实现demo中需求</span>
    requirejs([<span class="hljs-string">'jquery'</span>],<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">$</span>)</span>{
    
        <span class="hljs-comment">//为id值为backTop的第四个按钮添加点击回到顶部事件,当点击时执行move函数回到顶部</span>
        $(<span class="hljs-string">'#backTop'</span>).on(<span class="hljs-string">'click'</span>,move);
        
        <span class="hljs-comment">//监听一下windows对象的滚动事件，</span>
        <span class="hljs-comment">//每次滚动都执行函数checkPosition确定一下位置,是否到达设定的临界点，以显示和隐藏第四个按钮</span>
        $(<span class="hljs-built_in">window</span>).on(<span class="hljs-string">'scroll'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            checkPosition($(<span class="hljs-built_in">window</span>).height());
        });
        
        <span class="hljs-comment">//解决bug：在刷新页面时也出现第四个按钮，即页面加载时就检查一下滚动位置</span>
        checkPosition($(<span class="hljs-built_in">window</span>).height());

<span class="hljs-comment">//------------------------------分割线------------------------------------------</span>
        <span class="hljs-comment">//move函数的具体实现，加动画效果</span>
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">move</span>(<span class="hljs-params"></span>)</span>{
            $(<span class="hljs-string">'html, body'</span>).animate({
                <span class="hljs-attr">scrollTop</span>:<span class="hljs-number">0</span>
            },<span class="hljs-number">800</span>);
        }
        <span class="hljs-comment">//go函数可以立即移动到顶部</span>
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">go</span>(<span class="hljs-params"></span>)</span>{
            $(<span class="hljs-string">'html, body'</span>).scrollTop(<span class="hljs-number">0</span>);
        }

        <span class="hljs-comment">//checkPosition函数的具体实现</span>
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkPosition</span>(<span class="hljs-params">pos</span>)</span>{
            <span class="hljs-keyword">if</span>($(<span class="hljs-built_in">window</span>).scrollTop() &gt; pos){
                $(<span class="hljs-string">'#backTop'</span>).fadeIn();
            }<span class="hljs-keyword">else</span>{
                $(<span class="hljs-string">'#backTop'</span>).fadeOut();
            }
        }
    });
</code></pre>
<p>分割线以上是执行的代码，分割线以下是写的被调用的函数。</p>
<h3 id="articleHeader7">（5）将功能抽象成模块</h3>
<p>上述代码虽然实现了功能，但是存在以下问题：</p>
<ol>
<li><p>move和go函数都是到达顶部的功能，实现的功能很相似，作用如果想在其它地方使用这个功能，就要再进行代码的复制，不方便功能的复用。所以应该将功能抽象成模块。</p></li>
<li><p>实现功能的功能单一：两个函数都是到达顶部，这样即便抽象成模块也会受到很大的限制，所以可以进一步将问题抽象成移动滚动条到指定位置。</p></li>
</ol>
<p><strong>第一步</strong>：创建一个新模块，用<code>scrollto.js</code>表示，目前这个demo的目录结构如图：<br><span class="img-wrap"><img data-src="/img/bVznRZ" src="https://static.alili.tech/img/bVznRZ" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>第二步：将功能抽象成模块，写入<code>scrollto.js</code>中</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//1.先定义这个模块，因为要用到jquery，所以还要引入jquery
    define(['jquery'],function($){
        //定义构造函数
        function ScrollTo(opts){
            this.opts = $.extend({},ScrollTo.DEFAULTS,opts);   //实现传参覆盖
            this.$el = $('html, body');
        }
    
        //原型添加方法
        ScrollTo.prototype.move = function (){
            var opts = this.opts;
            this.$el.animate({
                scrollTop:opts.dest
            },opts.speed);
        };
        ScrollTo.prototype.go = function(){
            this.$el.scrollTop(opts.dest);
        };
    
        //定义默认的参数
        ScrollTo.DEFAULTS = {
            dest:0,
            speed:800
        };
        
        //定义接口
        return {
            ScrollTo:ScrollTo
        };
        
    });
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//1.先定义这个模块，因为要用到jquery，所以还要引入jquery</span>
    define([<span class="hljs-string">'jquery'</span>],<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">$</span>)</span>{
        <span class="hljs-comment">//定义构造函数</span>
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ScrollTo</span>(<span class="hljs-params">opts</span>)</span>{
            <span class="hljs-keyword">this</span>.opts = $.extend({},ScrollTo.DEFAULTS,opts);   <span class="hljs-comment">//实现传参覆盖</span>
            <span class="hljs-keyword">this</span>.$el = $(<span class="hljs-string">'html, body'</span>);
        }
    
        <span class="hljs-comment">//原型添加方法</span>
        ScrollTo.prototype.move = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>)</span>{
            <span class="hljs-keyword">var</span> opts = <span class="hljs-keyword">this</span>.opts;
            <span class="hljs-keyword">this</span>.$el.animate({
                <span class="hljs-attr">scrollTop</span>:opts.dest
            },opts.speed);
        };
        ScrollTo.prototype.go = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-keyword">this</span>.$el.scrollTop(opts.dest);
        };
    
        <span class="hljs-comment">//定义默认的参数</span>
        ScrollTo.DEFAULTS = {
            <span class="hljs-attr">dest</span>:<span class="hljs-number">0</span>,
            <span class="hljs-attr">speed</span>:<span class="hljs-number">800</span>
        };
        
        <span class="hljs-comment">//定义接口</span>
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">ScrollTo</span>:ScrollTo
        };
        
    });
    </code></pre>
<p>代码详解：</p>
<ol>
<li><p>传递的参数为一个对象，用opts表示</p></li>
<li><p>用户没有传递参数时，使用默认的参数，默认参数直接写在ScrollTo构造函数上，相当于形成一个静态属性，然后通过jquery的extend()方法进行原型的扩展</p></li>
<li><p>实现用户传递参数用之，不传递参数用默认值。jquery的<code>extend()</code>方法</p></li>
<li><p>在原型上添加move和go方法</p></li>
</ol>
<p>第三步：在入口文件main.js中引入这个<code>scrollto.js</code>的模块</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
    requirejs(['jquery','scrollto'], function($,scrollto){
    
        //为了使用scrollto模块，需要实例化一下
        var scroll = new scrollto.ScrollTo({
            dest:0,
            speed:2000
        });
        //点击回到顶部按钮回到指定位置功能
        $('#backTop').on('click', $.proxy(scroll.move, scroll));
    
    });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
    requirejs([<span class="hljs-string">'jquery'</span>,<span class="hljs-string">'scrollto'</span>], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">$,scrollto</span>)</span>{
    
        <span class="hljs-comment">//为了使用scrollto模块，需要实例化一下</span>
        <span class="hljs-keyword">var</span> scroll = <span class="hljs-keyword">new</span> scrollto.ScrollTo({
            <span class="hljs-attr">dest</span>:<span class="hljs-number">0</span>,
            <span class="hljs-attr">speed</span>:<span class="hljs-number">2000</span>
        });
        <span class="hljs-comment">//点击回到顶部按钮回到指定位置功能</span>
        $(<span class="hljs-string">'#backTop'</span>).on(<span class="hljs-string">'click'</span>, $.proxy(scroll.move, scroll));
    
    });</code></pre>
<p>上述代码中有一点需要注意：</p>
<ol>
<li><p>在第6行中，如果添加点击按钮回到指定位置事件时，这么写：<br><code>$('#backTop').on('click', scroll.move)</code>;</p></li>
<li><p>此时浏览器控制台会报错：<code>Uncaught TypeError: Cannot read property 'ScrollTo' of undefined</code></p></li>
<li><p>分析原因是因为，在main.js中调用<code>scrollto.js</code>模块中在<code>ScrollTo.prototype.move</code>原型方法move时，main.js中this指的是ScrollTo的实例，即scrollto，而在语句<code>$('#backTop').on('click', scroll.move)</code>;中，这个this指代的是id为backTop的这个按钮。</p></li>
<li><p>解决办法：用jquery提供的方法，直接将this指向scroll对象。<br><code>$('#backTop').on('click', $.proxy(scroll.move, scroll))</code></p></li>
</ol>
<p><strong>第四步：一个bug</strong><br>这时基本功能虽然实现了，点击底部那个按钮，传入设定的返回位置和返回的速度，页面可以再次返回顶部指定位置，<strong>但是目前还存在一个bug</strong>：在点击底部按钮回到顶部指定位置时，假如连续多次点击这个按钮，则页面回到顶部后就无法再次向下滚动页面。</p>
<p>bug分析：</p>
<ol>
<li><p>假如执行的函数如上面第三步中代码，速度设置成较慢的速度2000，那么在返回顶部指定位置时可以多次点击这个按钮，</p></li>
<li><p>这样每次点击按钮事件都要调用move方法执行里面的动画，点击多少次，这个动画就要执行多少次。</p></li>
<li><p>因此在页面返回顶部后，再次滚动页面向下会立即执行返回顶部动画，所以在执行完点击次数的动画之前，用户都无法向下滚动。（并且非常耗性能）</p></li>
</ol>
<p>解决办法，在滚动条正在运动或者已经到达目的地，就不应该执行动画。添加判断。<br>所以<code>scrollto.js</code>的代码可以改成如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    define(['jquery'],function($){
        //定义构造函数
        function ScrollTo(opts){
            this.opts = $.extend({},ScrollTo.DEFAULTS,opts);   //实现传参覆盖
            this.$el = $('html, body');
        }
    
        //原型添加方法
        ScrollTo.prototype.move = function (){
            var opts = this.opts;
            if ($(window).scrollTop() != opts.dest){  //判断是否到达指定位置
                if(!this.$el.is(':animated')){    //判断是否在运动
                    this.$el.animate({
                        scrollTop:opts.dest
                    },opts.speed);
                }
            }
        };
        ScrollTo.prototype.go = function(){
            var dest = this.opts.dest;
            if($(window).scrollTop() != dest){
                this.$el.scrollTop(dest);
            }
        };
    
        //定义默认的参数
        ScrollTo.DEFAULTS = {
            dest:0,
            speed:800
        };
        
        //定义接口
        return {
            ScrollTo:ScrollTo
        };
              
    });
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    define([<span class="hljs-string">'jquery'</span>],<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">$</span>)</span>{
        <span class="hljs-comment">//定义构造函数</span>
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ScrollTo</span>(<span class="hljs-params">opts</span>)</span>{
            <span class="hljs-keyword">this</span>.opts = $.extend({},ScrollTo.DEFAULTS,opts);   <span class="hljs-comment">//实现传参覆盖</span>
            <span class="hljs-keyword">this</span>.$el = $(<span class="hljs-string">'html, body'</span>);
        }
    
        <span class="hljs-comment">//原型添加方法</span>
        ScrollTo.prototype.move = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>)</span>{
            <span class="hljs-keyword">var</span> opts = <span class="hljs-keyword">this</span>.opts;
            <span class="hljs-keyword">if</span> ($(<span class="hljs-built_in">window</span>).scrollTop() != opts.dest){  <span class="hljs-comment">//判断是否到达指定位置</span>
                <span class="hljs-keyword">if</span>(!<span class="hljs-keyword">this</span>.$el.is(<span class="hljs-string">':animated'</span>)){    <span class="hljs-comment">//判断是否在运动</span>
                    <span class="hljs-keyword">this</span>.$el.animate({
                        <span class="hljs-attr">scrollTop</span>:opts.dest
                    },opts.speed);
                }
            }
        };
        ScrollTo.prototype.go = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-keyword">var</span> dest = <span class="hljs-keyword">this</span>.opts.dest;
            <span class="hljs-keyword">if</span>($(<span class="hljs-built_in">window</span>).scrollTop() != dest){
                <span class="hljs-keyword">this</span>.$el.scrollTop(dest);
            }
        };
    
        <span class="hljs-comment">//定义默认的参数</span>
        ScrollTo.DEFAULTS = {
            <span class="hljs-attr">dest</span>:<span class="hljs-number">0</span>,
            <span class="hljs-attr">speed</span>:<span class="hljs-number">800</span>
        };
        
        <span class="hljs-comment">//定义接口</span>
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">ScrollTo</span>:ScrollTo
        };
              
    });
    </code></pre>
<h3 id="articleHeader8">（6）将返回顶部整体抽象成模块</h3>
<p>我们把返回的功能函数move和go都抽象在了<code>scrollto.js</code>模块中，现在还可以直接把整个返回顶部的功能（包括滚动一定距离后隐藏的按钮出现，和点击按钮之后回到顶部指定位置）<br>然后在入口文件中只需要引入这个模块（取名叫<code>backtop.js</code>），这个<code>back.js</code>需要依赖上面定义的<code>scrollto.js</code>模块。</p>
<p>所以目前的项目目录如下图：<br><span class="img-wrap"><img data-src="/img/bVznSV" src="https://static.alili.tech/img/bVznSV" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>第一步：现在来写<code>backtop.js</code>模块</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    define(['jquery', 'scrollto'], function($, scrollto){
        //执行函数部分
        function BackTop(el, opts){
            this.opts = $.extend({}, BackTop.DEFAULTS, opts);
            this.$el = $(el);   //el是节点
            this.scroll = new scrollto.ScrollTo({
                dest: 0,
                speed: this.opts.speed     
            });
            
            this._checkPosition();   //加载时就检查位置，解决bug
            
            if(this.opts.mode == 'move'){  //是move才执行move函数，其他执行go
                this.$el.on('click', $.proxy(this._move, this));
            }else{
                this.$el.on('click', $.proxy(this._go, this));
            }
            
            $(window).on('scroll', $.proxy(this._checkPOsition, this));
 
        }
    
        //定义默认属性部分
        BackTop.DEFAULTS = {
            mode: 'move',
            pos: $(window).height(),
            speed: 800
        };
    
    
        //定义功能函数部分
        BackTop.prototype._move = function(){
            this.scroll.move();
        };
    
        BackTop.prototype._go = function(){
            this.scroll.go();
        };
    
        BackTop.prototype._checkPosition = function(){
            if($(window).scrollTop() > this.opts.pos){
                this.$el.fadeIn();
            }else{
                this.$el.fadeOut();
            }
        };
    
        //暴露模块接口，返回整个对象
        return{
            BackTop: BackTop
        };
    
    
    });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    define([<span class="hljs-string">'jquery'</span>, <span class="hljs-string">'scrollto'</span>], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">$, scrollto</span>)</span>{
        <span class="hljs-comment">//执行函数部分</span>
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">BackTop</span>(<span class="hljs-params">el, opts</span>)</span>{
            <span class="hljs-keyword">this</span>.opts = $.extend({}, BackTop.DEFAULTS, opts);
            <span class="hljs-keyword">this</span>.$el = $(el);   <span class="hljs-comment">//el是节点</span>
            <span class="hljs-keyword">this</span>.scroll = <span class="hljs-keyword">new</span> scrollto.ScrollTo({
                <span class="hljs-attr">dest</span>: <span class="hljs-number">0</span>,
                <span class="hljs-attr">speed</span>: <span class="hljs-keyword">this</span>.opts.speed     
            });
            
            <span class="hljs-keyword">this</span>._checkPosition();   <span class="hljs-comment">//加载时就检查位置，解决bug</span>
            
            <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.opts.mode == <span class="hljs-string">'move'</span>){  <span class="hljs-comment">//是move才执行move函数，其他执行go</span>
                <span class="hljs-keyword">this</span>.$el.on(<span class="hljs-string">'click'</span>, $.proxy(<span class="hljs-keyword">this</span>._move, <span class="hljs-keyword">this</span>));
            }<span class="hljs-keyword">else</span>{
                <span class="hljs-keyword">this</span>.$el.on(<span class="hljs-string">'click'</span>, $.proxy(<span class="hljs-keyword">this</span>._go, <span class="hljs-keyword">this</span>));
            }
            
            $(<span class="hljs-built_in">window</span>).on(<span class="hljs-string">'scroll'</span>, $.proxy(<span class="hljs-keyword">this</span>._checkPOsition, <span class="hljs-keyword">this</span>));
 
        }
    
        <span class="hljs-comment">//定义默认属性部分</span>
        BackTop.DEFAULTS = {
            <span class="hljs-attr">mode</span>: <span class="hljs-string">'move'</span>,
            <span class="hljs-attr">pos</span>: $(<span class="hljs-built_in">window</span>).height(),
            <span class="hljs-attr">speed</span>: <span class="hljs-number">800</span>
        };
    
    
        <span class="hljs-comment">//定义功能函数部分</span>
        BackTop.prototype._move = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-keyword">this</span>.scroll.move();
        };
    
        BackTop.prototype._go = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-keyword">this</span>.scroll.go();
        };
    
        BackTop.prototype._checkPosition = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-keyword">if</span>($(<span class="hljs-built_in">window</span>).scrollTop() &gt; <span class="hljs-keyword">this</span>.opts.pos){
                <span class="hljs-keyword">this</span>.$el.fadeIn();
            }<span class="hljs-keyword">else</span>{
                <span class="hljs-keyword">this</span>.$el.fadeOut();
            }
        };
    
        <span class="hljs-comment">//暴露模块接口，返回整个对象</span>
        <span class="hljs-keyword">return</span>{
            <span class="hljs-attr">BackTop</span>: BackTop
        };
    
    
    });</code></pre>
<p>第二步：scrollto.js保持不变</p>
<p>第三步：写main.js入口文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    //定义别名
    requirejs.config({
        paths: {
            jquery: 'jquery-3.1.0'
        }
    });
    
    //调用backtop.js模块
    requirejs(['jquery', 'backtop'], function($, backtop){
        //实例化BackTop
        new backtop.BackTop($('#backtop'),{
            mode: 'move',
            pos:100,
            speed: 2000
        });

    });
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-comment">//定义别名</span>
    requirejs.config({
        <span class="hljs-attr">paths</span>: {
            <span class="hljs-attr">jquery</span>: <span class="hljs-string">'jquery-3.1.0'</span>
        }
    });
    
    <span class="hljs-comment">//调用backtop.js模块</span>
    requirejs([<span class="hljs-string">'jquery'</span>, <span class="hljs-string">'backtop'</span>], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">$, backtop</span>)</span>{
        <span class="hljs-comment">//实例化BackTop</span>
        <span class="hljs-keyword">new</span> backtop.BackTop($(<span class="hljs-string">'#backtop'</span>),{
            <span class="hljs-attr">mode</span>: <span class="hljs-string">'move'</span>,
            <span class="hljs-attr">pos</span>:<span class="hljs-number">100</span>,
            <span class="hljs-attr">speed</span>: <span class="hljs-number">2000</span>
        });

    });
    </code></pre>
<h2 id="articleHeader9">4.总结</h2>
<p>这个demo中的模块化是这样一种思想：</p>
<ol>
<li><p>首先把功能函数放在一个模块中（move和go）</p></li>
<li><p>把整个实现功能也抽象成一个模块，依赖上一个功能函数模块</p></li>
<li><p>最后只需要在入口文件中实例化一下这个最外层的模块，即可完成一系列功能的调用。</p></li>
<li><p>每个模块都用面向对象的思想，定义模块并且暴露接口</p></li>
<li><p>默认值的用法可以让调用者拿起就用，可以不用考虑传参数。</p></li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
javascript模块化（二）--RequireJS初探

## 原文链接
[https://segmentfault.com/a/1190000006011186](https://segmentfault.com/a/1190000006011186)

