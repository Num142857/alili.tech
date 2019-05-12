---
title: 'jQ进阶篇--插件开发进阶' 
date: 2019-01-19 2:30:10
hidden: true
slug: 85i52s10w5d
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">jQuery插件开发模式</h2>
<p>软件开发过程中是需要一定的设计模式来指导开发的，有了模式，我们就能更好地组织我们的代码，并且从这些前人总结出来的模式中学到很多好的实践。</p>
<p>根据《jQuery高级编程》的描述，jQuery插件开发方式主要有三种：</p>
<ul>
<li>通过$.extend()来扩展jQuery</li>
<li>通过$.fn 向jQuery添加新的方法</li>
<li>通过$.widget()应用jQuery UI的部件工厂方式创建</li>
</ul>
<p>通常我们使用第二种方法来进行简单插件开发，说简单是相对于第三种方式。第三种方式是用来开发更高级jQuery部件的，该模式开发出来的部件带有很多jQuery内建的特性，比如插件的状态信息自动保存，各种关于插件的常用方法等，非常贴心，这里不细说。</p>
<p>而第一种方式又太简单，仅仅是在jQuery命名空间或者理解成jQuery身上添加了一个静态方法而以。所以我们调用通过$.extend()添加的函数时直接通过$符号调用（$.myfunction()）而不需要选中DOM元素($('#example').myfunction())。请看下面的例子。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.extend({
    sayHello: function(name) {
        console.log('Hello,' + (name ? name : 'Dude') + '!');
    }
})
$.sayHello(); //调用
$.sayHello('Wayou'); //带参调用
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>$.extend({
    <span class="hljs-attr">sayHello</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">name</span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Hello,'</span> + (name ? name : <span class="hljs-string">'Dude'</span>) + <span class="hljs-string">'!'</span>);
    }
})
$.sayHello(); <span class="hljs-comment">//调用</span>
$.sayHello(<span class="hljs-string">'Wayou'</span>); <span class="hljs-comment">//带参调用</span>
</code></pre>
<p>运行结果：<br><span class="img-wrap"><img data-src="/img/bVKjRE?w=484&amp;h=123" src="https://static.alili.tech/img/bVKjRE?w=484&amp;h=123" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>上面代码中，通过$.extend()向jQuery添加了一个sayHello函数，然后通过$直接调用。到此你可以认为我们已经完成了一个简单的jQuery插件了。</p>
<p>但如你所见，这种方式用来定义一些辅助方法是比较方便的。比如一个自定义的console，输出特定格式的信息，定义一次后可以通过jQuery在程序中任何需要的地方调用它。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.extend({
    log: function(message) {
        var now = new Date(),
            y = now.getFullYear(),
            m = now.getMonth() + 1, //！JavaScript中月分是从0开始的
            d = now.getDate(),
            h = now.getHours(),
            min = now.getMinutes(),
            s = now.getSeconds(),
            time = y + '/' + m + '/' + d + ' ' + h + ':' + min + ':' + s;
        console.log(time + ' My App: ' + message);
    }
})
$.log('initializing...'); //调用
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>$.extend({
    <span class="hljs-attr">log</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">message</span>) </span>{
        <span class="hljs-keyword">var</span> now = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(),
            y = now.getFullYear(),
            m = now.getMonth() + <span class="hljs-number">1</span>, <span class="hljs-comment">//！JavaScript中月分是从0开始的</span>
            d = now.getDate(),
            h = now.getHours(),
            min = now.getMinutes(),
            s = now.getSeconds(),
            time = y + <span class="hljs-string">'/'</span> + m + <span class="hljs-string">'/'</span> + d + <span class="hljs-string">' '</span> + h + <span class="hljs-string">':'</span> + min + <span class="hljs-string">':'</span> + s;
        <span class="hljs-built_in">console</span>.log(time + <span class="hljs-string">' My App: '</span> + message);
    }
})
$.log(<span class="hljs-string">'initializing...'</span>); <span class="hljs-comment">//调用</span>
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVKjRW?w=505&amp;h=104" src="https://static.alili.tech/img/bVKjRW?w=505&amp;h=104" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>但这种方式无法利用jQuery强大的选择器带来的便利，要处理DOM元素以及将插件更好地运用于所选择的元素身上，还是需要使用第二种开发方式。你所见到或使用的插件也大多是通过此种方式开发。</p>
<h2 id="articleHeader1">插件开发</h2>
<p>下面我们就来看第二种方式的jQuery插件开发。</p>
<h3 id="articleHeader2">基本方法</h3>
<p>先看一下它的基本格式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.fn.pluginName = function() {
    //your code goes here
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>$.fn.pluginName = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">//your code goes here</span>
}</code></pre>
<p>基本上就是往$.fn上面添加一个方法，名字是我们的插件名称。然后我们的插件代码在这个方法里面展开。</p>
<p>比如我们将页面上所有链接颜色转成红色，则可以这样写这个插件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.fn.myPlugin = function() {
    //在这里面,this指的是用jQuery选中的元素
    //example :$('a'),则this=$('a')
    this.css('color', 'red');
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>$.fn.myPlugin = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">//在这里面,this指的是用jQuery选中的元素</span>
    <span class="hljs-comment">//example :$('a'),则this=$('a')</span>
    <span class="hljs-keyword">this</span>.css(<span class="hljs-string">'color'</span>, <span class="hljs-string">'red'</span>);
}
</code></pre>
<p>在插件名字定义的这个函数内部，this指代的是我们在调用该插件时，用jQuery选择器选中的元素，一般是一个jQuery类型的集合。比如$('a')返回的是页面上所有a标签的集合，且这个集合已经是jQuery包装类型了，也就是说，在对其进行操作的时候可以直接调用jQuery的其他方法而不需要再用美元符号来包装一下。</p>
<p>所以在上面插件代码中，我们在this身上调用jQuery的css()方法，也就相当于在调用 $('a').css()。</p>
<p>理解this在这个地方的含义很重要。这样你才知道为什么可以直接商用jQuery方法同时在其他地方this指代不同时我们又需要用jQuery重新包装才能调用，下面会讲到。初学容易被this的值整晕，但理解了就不难。</p>
<p>现在就可以去页面试试我们的代码了，在页面上放几个链接，调用插件后链接字体变成红色。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul>
    <li>
        <a href=&quot;http://www.webo.com/liuwayong&quot;>我的微博</a>
    </li>
    <li>
        <a href=&quot;http://http://www.cnblogs.com/Wayou/&quot;>我的博客</a>
    </li>
    <li>
        <a href=&quot;http://wayouliu.duapp.com/&quot;>我的小站</a>
    </li>
</ul>
<p>这是p标签不是a标签，我不会受影响</p>
<script src=&quot;jquery-1.11.0.min.js&quot;></script>
<script src=&quot;jquery.myplugin.js&quot;></script>
<script type=&quot;text/javascript&quot;>
    $(function(){
        $('a').myPlugin();
    })
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"http://www.webo.com/liuwayong"</span>&gt;</span>我的微博<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"http://http://www.cnblogs.com/Wayou/"</span>&gt;</span>我的博客<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"http://wayouliu.duapp.com/"</span>&gt;</span>我的小站<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>这是p标签不是a标签，我不会受影响<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"jquery-1.11.0.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"jquery.myplugin.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        $(<span class="hljs-string">'a'</span>).myPlugin();
    })
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>运行结果：<br><span class="img-wrap"><img data-src="/img/bVKjSH?w=519&amp;h=224" src="https://static.alili.tech/img/bVKjSH?w=519&amp;h=224" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>下面进一步，在插件代码里处理每个具体的元素，而不是对一个集合进行处理，这样我们就可以针对每个元素进行相应操作。</p>
<p>我们已经知道this指代jQuery选择器返回的集合，那么通过调用jQuery的.each()方法就可以处理合集中的每个元素了，但此刻要注意的是，在each方法内部，this指带的是普通的DOM元素了，如果需要调用jQuery的方法那就需要用$来重新包装一下。</p>
<p>比如现在我们要在每个链接显示链接的真实地址，首先通过each遍历所有a标签，然后获取href属性的值再加到链接文本后面。</p>
<p>更改后我们的插件代码为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.fn.myPlugin = function() {
    //在这里面,this指的是用jQuery选中的元素
    this.css('color', 'red');
    this.each(function() {
        //对每个元素进行操作
        $(this).append(' ' + $(this).attr('href'));
    }))
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>$.fn.myPlugin = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">//在这里面,this指的是用jQuery选中的元素</span>
    <span class="hljs-keyword">this</span>.css(<span class="hljs-string">'color'</span>, <span class="hljs-string">'red'</span>);
    <span class="hljs-keyword">this</span>.each(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">//对每个元素进行操作</span>
        $(<span class="hljs-keyword">this</span>).append(<span class="hljs-string">' '</span> + $(<span class="hljs-keyword">this</span>).attr(<span class="hljs-string">'href'</span>));
    }))
}
</code></pre>
<p>调用代码还是一样的，我们通过选中页面所有的a标签来调用这个插件</p>
<p>运行结果：</p>
<p><span class="img-wrap"><img data-src="/img/bVKjS0?w=481&amp;h=246" src="https://static.alili.tech/img/bVKjS0?w=481&amp;h=246" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>到此，你已经可以编写功能简单的jQuery插件了。是不是也没那么难。</p>
<p>下面开始jQuery插件编写中一个重要的部分，参数的接收。</p>
<h3 id="articleHeader3">支持链式调用</h3>
<p>我们都知道jQuery一个时常优雅的特性是支持链式调用，选择好DOM元素后可以不断地调用其他方法。</p>
<p>要让插件不打破这种链式调用，只需return一下即可。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.fn.myPlugin = function() {
    //在这里面,this指的是用jQuery选中的元素
    this.css('color', 'red');
    return this.each(function() {
        //对每个元素进行操作
        $(this).append(' ' + $(this).attr('href'));
    }))
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>$.fn.myPlugin = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">//在这里面,this指的是用jQuery选中的元素</span>
    <span class="hljs-keyword">this</span>.css(<span class="hljs-string">'color'</span>, <span class="hljs-string">'red'</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.each(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">//对每个元素进行操作</span>
        $(<span class="hljs-keyword">this</span>).append(<span class="hljs-string">' '</span> + $(<span class="hljs-keyword">this</span>).attr(<span class="hljs-string">'href'</span>));
    }))
}
</code></pre>
<h3 id="articleHeader4">让插件接收参数</h3>
<p>一个强劲的插件是可以让使用者随意定制的，这要求我们提供在编写插件时就要考虑得全面些，尽量提供合适的参数。</p>
<p>比如现在我们不想让链接只变成红色，我们让插件的使用者自己定义显示什么颜色，要做到这一点很方便，只需要使用者在调用的时候传入一个参数即可。同时我们在插件的代码里面接收。另一方面，为了灵活，使用者可以不传递参数，插件里面会给出参数的默认值。</p>
<p>在处理插件参数的接收上，通常使用jQuery的extend方法，上面也提到过，但那是给extend方法传递单个对象的情况下，这个对象会合并到jQuery身上，所以我们就可以在jQuery身上调用新合并对象里包含的方法了，像上面的例子。当给extend方法传递一个以上的参数时，它会将所有参数对象合并到第一个里。同时，如果对象中有同名属性时，合并的时候后面的会覆盖前面的。</p>
<p>利用这一点，我们可以在插件里定义一个保存插件参数默认值的对象，同时将接收来的参数对象合并到默认对象上，最后就实现了用户指定了值的参数使用指定的值，未指定的参数使用插件默认值。</p>
<p>为了演示方便，再指定一个参数fontSize，允许调用插件的时候设置字体大小。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.fn.myPlugin = function(options) {
    var defaults = {
        'color': 'red',
        'fontSize': '12px'
    };
    var settings = $.extend(defaults, options);
    return this.css({
        'color': settings.color,
        'fontSize': settings.fontSize
    });
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>$.fn.myPlugin = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">options</span>) </span>{
    <span class="hljs-keyword">var</span> defaults = {
        <span class="hljs-string">'color'</span>: <span class="hljs-string">'red'</span>,
        <span class="hljs-string">'fontSize'</span>: <span class="hljs-string">'12px'</span>
    };
    <span class="hljs-keyword">var</span> settings = $.extend(defaults, options);
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.css({
        <span class="hljs-string">'color'</span>: settings.color,
        <span class="hljs-string">'fontSize'</span>: settings.fontSize
    });
}
</code></pre>
<p>现在，我们调用的时候指定颜色，字体大小未指定，会运用插件里的默认值12px。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('a').myPlugin({
    'color': '#2C9929'
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code><span class="hljs-variable">$(</span><span class="hljs-string">'a'</span>).myPlugin({
    <span class="hljs-string">'color'</span>: <span class="hljs-string">'#2C9929'</span>
});
</code></pre>
<p>运行结果：<br><span class="img-wrap"><img data-src="/img/bVKjTz?w=481&amp;h=257" src="https://static.alili.tech/img/bVKjTz?w=481&amp;h=257" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>同时指定颜色与字体大小：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('a').myPlugin({
    'color': '#2C9929',
    'fontSize': '20px'
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code><span class="hljs-variable">$(</span><span class="hljs-string">'a'</span>).myPlugin({
    <span class="hljs-string">'color'</span>: <span class="hljs-string">'#2C9929'</span>,
    <span class="hljs-string">'fontSize'</span>: <span class="hljs-string">'20px'</span>
});</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVKjTC?w=481&amp;h=257" src="https://static.alili.tech/img/bVKjTC?w=481&amp;h=257" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><strong>保护好默认参数</strong></p>
<p>注意到上面代码调用extend时会将defaults的值改变，这样不好，因为它作为插件因有的一些东西应该维持原样，另外就是如果你在后续代码中还要使用这些默认值的话，当你再次访问它时它已经被用户传进来的参数更改了。</p>
<p><span class="img-wrap"><img data-src="/img/bVKjTT?w=648&amp;h=241" src="https://static.alili.tech/img/bVKjTT?w=648&amp;h=241" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>一个好的做法是将一个新的空对象做为$.extend的第一个参数，defaults和用户传递的参数对象紧随其后，这样做的好处是所有值被合并到这个空对象上，保护了插件里面的默认值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.fn.myPlugin = function(options) {
    var defaults = {
        'color': 'red',
        'fontSize': '12px'
    };
    var settings = $.extend({},defaults, options);//将一个空对象做为第一个参数
    return this.css({
        'color': settings.color,
        'fontSize': settings.fontSize
    });
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>$.fn.myPlugin = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">options</span>) </span>{
    <span class="hljs-keyword">var</span> defaults = {
        <span class="hljs-string">'color'</span>: <span class="hljs-string">'red'</span>,
        <span class="hljs-string">'fontSize'</span>: <span class="hljs-string">'12px'</span>
    };
    <span class="hljs-keyword">var</span> settings = $.extend({},defaults, options);<span class="hljs-comment">//将一个空对象做为第一个参数</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.css({
        <span class="hljs-string">'color'</span>: settings.color,
        <span class="hljs-string">'fontSize'</span>: settings.fontSize
    });
}
</code></pre>
<p>到此，插件可以接收和处理参数后，就可以编写出更健壮而灵活的插件了。若要编写一个复杂的插件，代码量会很大，如何组织代码就成了一个需要面临的问题，没有一个好的方式来组织这些代码，整体感觉会杂乱无章，同时也不好维护，所以将插件的所有方法属性包装到一个对象上，用面向对象的思维来进行开发，无疑会使工作轻松很多。</p>
<h3 id="articleHeader5">面向对象的插件开发</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//定义Beautifier的构造函数
var Beautifier = function(ele, opt) {
    this.$element = ele,
    this.defaults = {
        'color': 'red',
        'fontSize': '12px',
        'textDecoration':'none'
    },
    this.options = $.extend({}, this.defaults, opt)
}
//定义Beautifier的方法
Beautifier.prototype = {
    beautify: function() {
        return this.$element.css({
            'color': this.options.color,
            'fontSize': this.options.fontSize,
            'textDecoration': this.options.textDecoration
        });
    }
}
//在插件中使用Beautifier对象
$.fn.myPlugin = function(options) {
    //创建Beautifier的实体
    var beautifier = new Beautifier(this, options);
    //调用其方法
    return beautifier.beautify();
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//定义Beautifier的构造函数</span>
<span class="hljs-keyword">var</span> Beautifier = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">ele, opt</span>) </span>{
    <span class="hljs-keyword">this</span>.$element = ele,
    <span class="hljs-keyword">this</span>.defaults = {
        <span class="hljs-string">'color'</span>: <span class="hljs-string">'red'</span>,
        <span class="hljs-string">'fontSize'</span>: <span class="hljs-string">'12px'</span>,
        <span class="hljs-string">'textDecoration'</span>:<span class="hljs-string">'none'</span>
    },
    <span class="hljs-keyword">this</span>.options = $.extend({}, <span class="hljs-keyword">this</span>.defaults, opt)
}
<span class="hljs-comment">//定义Beautifier的方法</span>
Beautifier.prototype = {
    <span class="hljs-attr">beautify</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$element.css({
            <span class="hljs-string">'color'</span>: <span class="hljs-keyword">this</span>.options.color,
            <span class="hljs-string">'fontSize'</span>: <span class="hljs-keyword">this</span>.options.fontSize,
            <span class="hljs-string">'textDecoration'</span>: <span class="hljs-keyword">this</span>.options.textDecoration
        });
    }
}
<span class="hljs-comment">//在插件中使用Beautifier对象</span>
$.fn.myPlugin = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">options</span>) </span>{
    <span class="hljs-comment">//创建Beautifier的实体</span>
    <span class="hljs-keyword">var</span> beautifier = <span class="hljs-keyword">new</span> Beautifier(<span class="hljs-keyword">this</span>, options);
    <span class="hljs-comment">//调用其方法</span>
    <span class="hljs-keyword">return</span> beautifier.beautify();
}
</code></pre>
<p>调用方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(function() {
    $('a').myPlugin({
        'color': '#2C9929',
        'fontSize': '20px'
    });
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>$(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    $(<span class="hljs-string">'a'</span>).myPlugin({
        <span class="hljs-string">'color'</span>: <span class="hljs-string">'#2C9929'</span>,
        <span class="hljs-string">'fontSize'</span>: <span class="hljs-string">'20px'</span>
    });
})
</code></pre>
<p>指定文字带下划线（我们在Beautifier对象中新加的功能，默认不带下划线，如上面的例子）的调用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(function() {
    $('a').myPlugin({
        'color': '#2C9929',
        'fontSize': '20px',
        'textDecoration': 'underline'
    });
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>$(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    $(<span class="hljs-string">'a'</span>).myPlugin({
        <span class="hljs-string">'color'</span>: <span class="hljs-string">'#2C9929'</span>,
        <span class="hljs-string">'fontSize'</span>: <span class="hljs-string">'20px'</span>,
        <span class="hljs-string">'textDecoration'</span>: <span class="hljs-string">'underline'</span>
    });
})
</code></pre>
<h3 id="articleHeader6">关于命名空间</h3>
<p><strong>用自调用匿名函数包裹你的代码</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function() {
    //定义Beautifier的构造函数
    var Beautifier = function(ele, opt) {
        this.$element = ele,
        this.defaults = {
            'color': 'red',
            'fontSize': '12px',
            'textDecoration': 'none'
        },
        this.options = $.extend({}, this.defaults, opt)
    }
    //定义Beautifier的方法
    Beautifier.prototype = {
        beautify: function() {
            return this.$element.css({
                'color': this.options.color,
                'fontSize': this.options.fontSize,
                'textDecoration': this.options.textDecoration
            });
        }
    }
    //在插件中使用Beautifier对象
    $.fn.myPlugin = function(options) {
        //创建Beautifier的实体
        var beautifier = new Beautifier(this, options);
        //调用其方法
        return beautifier.beautify();
    }
})();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">//定义Beautifier的构造函数</span>
    <span class="hljs-keyword">var</span> Beautifier = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">ele, opt</span>) </span>{
        <span class="hljs-keyword">this</span>.$element = ele,
        <span class="hljs-keyword">this</span>.defaults = {
            <span class="hljs-string">'color'</span>: <span class="hljs-string">'red'</span>,
            <span class="hljs-string">'fontSize'</span>: <span class="hljs-string">'12px'</span>,
            <span class="hljs-string">'textDecoration'</span>: <span class="hljs-string">'none'</span>
        },
        <span class="hljs-keyword">this</span>.options = $.extend({}, <span class="hljs-keyword">this</span>.defaults, opt)
    }
    <span class="hljs-comment">//定义Beautifier的方法</span>
    Beautifier.prototype = {
        <span class="hljs-attr">beautify</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$element.css({
                <span class="hljs-string">'color'</span>: <span class="hljs-keyword">this</span>.options.color,
                <span class="hljs-string">'fontSize'</span>: <span class="hljs-keyword">this</span>.options.fontSize,
                <span class="hljs-string">'textDecoration'</span>: <span class="hljs-keyword">this</span>.options.textDecoration
            });
        }
    }
    <span class="hljs-comment">//在插件中使用Beautifier对象</span>
    $.fn.myPlugin = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">options</span>) </span>{
        <span class="hljs-comment">//创建Beautifier的实体</span>
        <span class="hljs-keyword">var</span> beautifier = <span class="hljs-keyword">new</span> Beautifier(<span class="hljs-keyword">this</span>, options);
        <span class="hljs-comment">//调用其方法</span>
        <span class="hljs-keyword">return</span> beautifier.beautify();
    }
})();
</code></pre>
<p><strong>将系统变量以变量形式传递到插件内部</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=";(function($,window,document,undefined){
    //我们的代码。。
    //blah blah blah...
})(jQuery,window,document);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code>;(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">$,<span class="hljs-built_in">window</span>,<span class="hljs-built_in">document</span>,<span class="hljs-literal">undefined</span></span>)</span>{
    <span class="hljs-comment">//我们的代码。。</span>
    <span class="hljs-comment">//blah blah blah...</span>
})(jQuery,<span class="hljs-built_in">window</span>,<span class="hljs-built_in">document</span>);</code></pre>
<p>而至于这个undefined，稍微有意思一点，为了得到没有被修改的undefined，我们并没有传递这个参数，但却在接收时接收了它，因为实际并没有传，所以‘undefined’那个位置接收到的就是真实的'undefined'了。是不是有点hack的味道，值得细细体会的技术，当然不是我发明的，都是从前人的经验中学习。</p>
<p>所以最后我们的插件成了这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=";(function($, window, document,undefined) {
    //定义Beautifier的构造函数
    var Beautifier = function(ele, opt) {
        this.$element = ele,
        this.defaults = {
            'color': 'red',
            'fontSize': '12px',
            'textDecoration': 'none'
        },
        this.options = $.extend({}, this.defaults, opt)
    }
    //定义Beautifier的方法
    Beautifier.prototype = {
        beautify: function() {
            return this.$element.css({
                'color': this.options.color,
                'fontSize': this.options.fontSize,
                'textDecoration': this.options.textDecoration
            });
        }
    }
    //在插件中使用Beautifier对象
    $.fn.myPlugin = function(options) {
        //创建Beautifier的实体
        var beautifier = new Beautifier(this, options);
        //调用其方法
        return beautifier.beautify();
    }
})(jQuery, window, document);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>;(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">$, window, document,undefined</span>) </span>{
    <span class="hljs-comment">//定义Beautifier的构造函数</span>
    <span class="hljs-keyword">var</span> Beautifier = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">ele, opt</span>) </span>{
        <span class="hljs-keyword">this</span>.$element = ele,
        <span class="hljs-keyword">this</span>.defaults = {
            <span class="hljs-string">'color'</span>: <span class="hljs-string">'red'</span>,
            <span class="hljs-string">'fontSize'</span>: <span class="hljs-string">'12px'</span>,
            <span class="hljs-string">'textDecoration'</span>: <span class="hljs-string">'none'</span>
        },
        <span class="hljs-keyword">this</span>.options = $.extend({}, <span class="hljs-keyword">this</span>.defaults, opt)
    }
    <span class="hljs-comment">//定义Beautifier的方法</span>
    Beautifier.prototype = {
        <span class="hljs-attr">beautify</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$element.css({
                <span class="hljs-string">'color'</span>: <span class="hljs-keyword">this</span>.options.color,
                <span class="hljs-string">'fontSize'</span>: <span class="hljs-keyword">this</span>.options.fontSize,
                <span class="hljs-string">'textDecoration'</span>: <span class="hljs-keyword">this</span>.options.textDecoration
            });
        }
    }
    <span class="hljs-comment">//在插件中使用Beautifier对象</span>
    $.fn.myPlugin = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">options</span>) </span>{
        <span class="hljs-comment">//创建Beautifier的实体</span>
        <span class="hljs-keyword">var</span> beautifier = <span class="hljs-keyword">new</span> Beautifier(<span class="hljs-keyword">this</span>, options);
        <span class="hljs-comment">//调用其方法</span>
        <span class="hljs-keyword">return</span> beautifier.beautify();
    }
})(jQuery, <span class="hljs-built_in">window</span>, <span class="hljs-built_in">document</span>);</code></pre>
<p>一个安全，结构良好，组织有序的插件编写完成。</p>
<p><strong>参考：</strong><br>jQuery官网学习中心关于插件开发的文章： <a href="http://learn.jquery.com/plugins/" rel="nofollow noreferrer" target="_blank">http://learn.jquery.com/plugins/</a><br>jQuery官网插件中心：<a href="http://plugins.jquery.com/" rel="nofollow noreferrer" target="_blank">http://plugins.jquery.com/</a><br>jQuery官网插件发布指南：<a href="http://plugins.jquery.com/docs/publish/" rel="nofollow noreferrer" target="_blank">http://plugins.jquery.com/doc...</a><br>转载地址：<a href="http://www.cnblogs.com/Wayou/p/jquery_plugin_tutorial.html" rel="nofollow noreferrer" target="_blank">http://www.cnblogs.com/Wayou/...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
jQ进阶篇--插件开发进阶

## 原文链接
[https://segmentfault.com/a/1190000008617439](https://segmentfault.com/a/1190000008617439)

