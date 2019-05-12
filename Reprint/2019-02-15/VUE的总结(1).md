---
title: 'VUE的总结(1)' 
date: 2019-02-15 2:30:44
hidden: true
slug: 6bjjnudlh9x
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>这里用到的代码：<a href="https://github.com/liyang1234567890/VUE-" rel="nofollow noreferrer" target="_blank">https://github.com/liyang1234...</a></strong></p>
<h2 id="articleHeader0">jQuery和VUE的比较</h2>
<p>jQuery中包含了大量的Dom操作，无论怎么操作，都要先找到Dom对象，对它进行操作。频繁操作Dom会导致网页的重绘和重排，比如remove一个节点，当然就要重建Dom树，也肯定对性能有影响。VUE中有虚拟DOM,它的作用就是，在内存里面通过js去模仿Dom树这样的一个数据结构。当网页中有东西变化时，并不是同步到真实Dom上，而是把这个状态和内存中的虚拟Dom进行比较，仅仅把发生变化的东西放在真实Dom上。这就是VUE比jQuery性能更好的地方。</p>
<h2 id="articleHeader1">输出HelloWorld</h2>
<p>下载vue.js传送门：<a href="https://cn.vuejs.org/v2/guide/installation.html" rel="nofollow noreferrer" target="_blank">https://cn.vuejs.org/v2/guide...</a></p>
<p><span class="img-wrap"><img data-src="/img/bVbixqh?w=650&amp;h=246" src="https://static.alili.tech/img/bVbixqh?w=650&amp;h=246" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>开发版vue.js,是未压缩过的，生产版是vue.min.js,是被压缩过的。<br>开发版<br><span class="img-wrap"><img data-src="/img/bVbiDMX?w=401&amp;h=239" src="https://static.alili.tech/img/bVbiDMX?w=401&amp;h=239" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>生产版<br><span class="img-wrap"><img data-src="/img/bVbiDM0?w=396&amp;h=239" src="https://static.alili.tech/img/bVbiDM0?w=396&amp;h=239" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;>
    <meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;>
    <title>Document</title>
</head>
<body>
    <div id=&quot;app&quot;>
        "{{"msg"}}"
    </div>
    <script src=&quot;vue.min.js&quot;></script>
    <script>
        let vm = new Vue({
            el: '#app',
             //表示挂载元素 表明元素在上面id是app的div里面才好使，放在外面没有用，只当做字符串去解析
            data: {
                msg: 'Hello World'
            }
        });
    </script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1.0"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"X-UA-Compatible"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"ie=edge"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Document<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
        </span><span class="hljs-template-variable">"{{"msg"}}"</span><span class="xml">
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"vue.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">let</span> vm = <span class="hljs-keyword">new</span> Vue({
            <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
             <span class="hljs-comment">//表示挂载元素 表明元素在上面id是app的div里面才好使，放在外面没有用，只当做字符串去解析</span>
            data: {
                <span class="hljs-attr">msg</span>: <span class="hljs-string">'Hello World'</span>
            }
        });
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></span></code></pre>
<p>运行截图： <br><span class="img-wrap"><img data-src="/img/bVbixqn?w=290&amp;h=236" src="https://static.alili.tech/img/bVbixqn?w=290&amp;h=236" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>console.log(vm);一下得到的是一个Object<br><span class="img-wrap"><img data-src="/img/bVbixq4?w=245&amp;h=151" src="https://static.alili.tech/img/bVbixq4?w=245&amp;h=151" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>vm.$el得到挂载元素<br><span class="img-wrap"><img data-src="/img/bVbixq6?w=182&amp;h=76" src="https://static.alili.tech/img/bVbixq6?w=182&amp;h=76" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>如果想获取内容<br>vm.$data.msg或者vm.msg<br><span class="img-wrap"><img data-src="/img/bVbixrj?w=129&amp;h=101" src="https://static.alili.tech/img/bVbixrj?w=129&amp;h=101" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>如果想要给msg赋值、改变值<br>vm.msg = "123456";在回车的瞬间，网页中内容也瞬间改变成123456，原因是data相当于Model层中的一个变量，当data改变时，通过ViewModel中的data Bindings传递到View层，所以VUE框架是数据驱动的。</p>
<p><span class="img-wrap"><img data-src="/img/bVbixr5?w=797&amp;h=382" src="https://static.alili.tech/img/bVbixr5?w=797&amp;h=382" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVbixrO?w=430&amp;h=466" src="https://static.alili.tech/img/bVbixrO?w=430&amp;h=466" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h1 id="articleHeader2">v-指令</h1>
<p>VUE官网API传送门：<a href="https://cn.vuejs.org/v2/api/" rel="nofollow noreferrer" target="_blank">https://cn.vuejs.org/v2/api/</a></p>
<h2 id="articleHeader3">v-if指令</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;>
    <meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;>
    <title>Document</title>
</head>
<body>
    <div id=&quot;app&quot;>
        <span v-if=&quot;true&quot;>你好，我是李洋</span>

    </div>
    <script src=&quot;vue.min.js&quot;></script>

    <script>
        new Vue({
            el: '#app',
        });
    </script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1.0"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"X-UA-Compatible"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"ie=edge"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Document<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"true"</span>&gt;</span>你好，我是李洋<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>

    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"vue.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
        <span class="hljs-keyword">new</span> Vue({
            el: <span class="hljs-string">'#app'</span>,
        });
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>v-if是true的时候显示内容，false的时候什么也不显示</p>
<p><span class="img-wrap"><img data-src="/img/bVbixtd?w=176&amp;h=76" src="https://static.alili.tech/img/bVbixtd?w=176&amp;h=76" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVbixtk?w=520&amp;h=261" src="https://static.alili.tech/img/bVbixtk?w=520&amp;h=261" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>他这里是在DOM结构中被删除了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <div id=&quot;app&quot;>
        <span v-if=&quot;isClick&quot;>你好，我是李洋</span>
    </div>
    <script src=&quot;vue.min.js&quot;></script>

    <script>
        let vm = new Vue({
            el: '#app',
            data: {
                isClick: false
            }
        });
    </script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"isClick"</span>&gt;</span>你好，我是李洋<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"vue.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">let</span> vm = <span class="hljs-keyword">new</span> Vue({
            <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
            <span class="hljs-attr">data</span>: {
                <span class="hljs-attr">isClick</span>: <span class="hljs-literal">false</span>
            }
        });
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>当vm.isClick = true的时候<br><span class="img-wrap"><img data-src="/img/bVbixty?w=491&amp;h=457" src="https://static.alili.tech/img/bVbixty?w=491&amp;h=457" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>v-if后面也可以写表达式<br>&lt;span v-if="isClick == 1?true:false"&gt;你好，我是李洋&lt;/span&gt;<br>输入vm.isClick=0时，<br><span class="img-wrap"><img data-src="/img/bVbixvf?w=392&amp;h=469" src="https://static.alili.tech/img/bVbixvf?w=392&amp;h=469" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader4">v-else-if指令</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <div>
        <span v-if=&quot;letter == 'A'&quot;>A</span>
        <span v-else-if=&quot;letter == 'B'&quot;>B</span>
        <span v-else=&quot;letter == 'C'&quot;>C</span>
    </div>
    <script src=&quot;vue.min.js&quot;></script>

    <script>
        let vm = new Vue({
            el: '#app',
            data: {
                isClick: 1,
                letter: &quot;A&quot;
            }
        });
    </script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"letter == 'A'"</span>&gt;</span>A<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-else-if</span>=<span class="hljs-string">"letter == 'B'"</span>&gt;</span>B<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-else</span>=<span class="hljs-string">"letter == 'C'"</span>&gt;</span>C<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"vue.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">let</span> vm = <span class="hljs-keyword">new</span> Vue({
            <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
            <span class="hljs-attr">data</span>: {
                <span class="hljs-attr">isClick</span>: <span class="hljs-number">1</span>,
                <span class="hljs-attr">letter</span>: <span class="hljs-string">"A"</span>
            }
        });
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbixvW?w=406&amp;h=423" src="https://static.alili.tech/img/bVbixvW?w=406&amp;h=423" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>回车之后</p>
<p><span class="img-wrap"><img data-src="/img/bVbixv2?w=402&amp;h=444" src="https://static.alili.tech/img/bVbixv2?w=402&amp;h=444" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>随便输入个其他内容，回车输出C<br><span class="img-wrap"><img data-src="/img/bVbixx9?w=418&amp;h=510" src="https://static.alili.tech/img/bVbixx9?w=418&amp;h=510" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader5">v-show指令</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
    <span v-show=&quot;isShow&quot;>SHOW</span>
</div>
<script src=&quot;vue.min.js&quot;></script>

<script>
    let vm = new Vue({
        el: '#app',
        data: {
            isClick: 1,
            letter: &quot;A&quot;,
            isShow: true
        }
    });
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"isShow"</span>&gt;</span>SHOW<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"vue.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">let</span> vm = <span class="hljs-keyword">new</span> Vue({
        <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
        <span class="hljs-attr">data</span>: {
            <span class="hljs-attr">isClick</span>: <span class="hljs-number">1</span>,
            <span class="hljs-attr">letter</span>: <span class="hljs-string">"A"</span>,
            <span class="hljs-attr">isShow</span>: <span class="hljs-literal">true</span>
        }
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>vm.isShow=false之后，内容消失，但是v-show是在样式当中自动设置了displayLnone;空间上还是占位置的。<br><span class="img-wrap"><img data-src="/img/bVbixz6?w=592&amp;h=400" src="https://static.alili.tech/img/bVbixz6?w=592&amp;h=400" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><strong>所以当频繁显示true,false的时候使用v-show，因为若使用v-if会不断的增删DOM树，形象性能。</strong></p>
<p>也可以用 !isShow</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<span v-show=&quot;isShow&quot;>SHOW</span>
<span v-show=&quot;!isShow&quot;>NOT SHOW</span>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code>&lt;span v-<span class="hljs-keyword">show</span>=<span class="hljs-string">"isShow"</span>&gt;<span class="hljs-keyword">SHOW</span>&lt;/span&gt;
&lt;span v-<span class="hljs-keyword">show</span>=<span class="hljs-string">"!isShow"</span>&gt;<span class="hljs-keyword">NOT</span> <span class="hljs-keyword">SHOW</span>&lt;/span&gt;</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbixCY?w=396&amp;h=394" src="https://static.alili.tech/img/bVbixCY?w=396&amp;h=394" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader6">v-for指令遍历数组</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <meta name=&quot;viewport&quot; content=&quot;width=<device-width>, initial-scale=1.0&quot;>
    <meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;>
    <title>Document</title>
</head>
<body>
    <div id=&quot;app&quot;>
        <ul>
            <li v-for=&quot;com in companies&quot;>"{{"com"}}"</li>
        </ul>
    </div>

    <script src=&quot;vue.min.js&quot;></script>

    <script>
        let vm = new Vue({
            el :'#app',
            data: {
                companies: ['百度','阿里巴巴','腾讯','滴滴','小米']
            }
        });
    </script>
</body>
</html>

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=&lt;device-width&gt;, initial-scale=1.0"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"X-UA-Compatible"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"ie=edge"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Document<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"com in companies"</span>&gt;</span></span><span class="hljs-template-variable">"{{"com"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"vue.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">let</span> vm = <span class="hljs-keyword">new</span> Vue({
            <span class="hljs-attr">el</span> :<span class="hljs-string">'#app'</span>,
            <span class="hljs-attr">data</span>: {
                <span class="hljs-attr">companies</span>: [<span class="hljs-string">'百度'</span>,<span class="hljs-string">'阿里巴巴'</span>,<span class="hljs-string">'腾讯'</span>,<span class="hljs-string">'滴滴'</span>,<span class="hljs-string">'小米'</span>]
            }
        });
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>

</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbixGF?w=171&amp;h=148" src="https://static.alili.tech/img/bVbixGF?w=171&amp;h=148" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>push进去一个<br><span class="img-wrap"><img data-src="/img/bVbixHw?w=458&amp;h=466" src="https://static.alili.tech/img/bVbixHw?w=458&amp;h=466" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>如果还想输出数组下标  <strong>双花括号中的变量名字是随便起的</strong><br>&lt;li v-for="(com, index) in companies"&gt;"{{"com"}}"--"{{"index"}}"&lt;/li&gt;<br><span class="img-wrap"><img data-src="/img/bVbixHZ?w=195&amp;h=131" src="https://static.alili.tech/img/bVbixHZ?w=195&amp;h=131" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>表达式非常灵活，可以算术运算<br>&lt;li v-for="(com, index) in companies"&gt;"{{"com"}}"--"{{"index+1"}}"&lt;/li&gt;</p>
<p><span class="img-wrap"><img data-src="/img/bVbixIl?w=194&amp;h=128" src="https://static.alili.tech/img/bVbixIl?w=194&amp;h=128" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader7">v-for指令遍历对象</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
<ul>//遍历对象的时候有三个参数，值，键，索引 **双花括号中的变量名字是随便起的，这样只是比较语义化**
        <li v-for=&quot;(val,key,index) in object&quot;>"{{"val"}}"--"{{"key"}}"--"{{"index+1"}}"</li>
    </ul>
</div>

<script src=&quot;vue.min.js&quot;></script>

<script>
    let vm = new Vue({
        el :'#app',
        data: {
            companies: ['百度','阿里巴巴','腾讯','滴滴','小米'],
            object: {
                name: 'liyang',
                age: 22,
                company: 'Baidu'
            }
        }
    });
</script>

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>//遍历对象的时候有三个参数，值，键，索引 **双花括号中的变量名字是随便起的，这样只是比较语义化**
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(val,key,index) in object"</span>&gt;</span></span><span class="hljs-template-variable">"{{"val"}}"</span><span class="xml">--</span><span class="hljs-template-variable">"{{"key"}}"</span><span class="xml">--</span><span class="hljs-template-variable">"{{"index+1"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"vue.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">let</span> vm = <span class="hljs-keyword">new</span> Vue({
        <span class="hljs-attr">el</span> :<span class="hljs-string">'#app'</span>,
        <span class="hljs-attr">data</span>: {
            <span class="hljs-attr">companies</span>: [<span class="hljs-string">'百度'</span>,<span class="hljs-string">'阿里巴巴'</span>,<span class="hljs-string">'腾讯'</span>,<span class="hljs-string">'滴滴'</span>,<span class="hljs-string">'小米'</span>],
            <span class="hljs-attr">object</span>: {
                <span class="hljs-attr">name</span>: <span class="hljs-string">'liyang'</span>,
                <span class="hljs-attr">age</span>: <span class="hljs-number">22</span>,
                <span class="hljs-attr">company</span>: <span class="hljs-string">'Baidu'</span>
            }
        }
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

</span></code></pre>
<h2 id="articleHeader8">v-for指令遍历数组中的对象，类似json对象格式</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
    <ul>
        <li v-for=&quot;obj in arr&quot;>
            "{{"obj"}}"
        </li>
    </ul>
</div>

<script src=&quot;vue.min.js&quot;></script>

<script>
    let vm = new Vue({
        el :'#app',
        data: {
            companies: ['百度','阿里巴巴','腾讯','滴滴','小米'],
            object: {
                name: 'liyang',
                age: 22,
                company: 'Baidu'
            },
            arr: [{
                name: 'liyang',
                age: 22,
                company: 'Baidu'
            },{
                name: 'qqq',
                age: 23,
                company: 'Alibaba'
            },{
                name: 'www',
                age: 24,
                company: 'Tencent'
            }]
        }
    });
</script>   
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"obj in arr"</span>&gt;</span>
            </span><span class="hljs-template-variable">"{{"obj"}}"</span><span class="xml">
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"vue.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">let</span> vm = <span class="hljs-keyword">new</span> Vue({
        <span class="hljs-attr">el</span> :<span class="hljs-string">'#app'</span>,
        <span class="hljs-attr">data</span>: {
            <span class="hljs-attr">companies</span>: [<span class="hljs-string">'百度'</span>,<span class="hljs-string">'阿里巴巴'</span>,<span class="hljs-string">'腾讯'</span>,<span class="hljs-string">'滴滴'</span>,<span class="hljs-string">'小米'</span>],
            <span class="hljs-attr">object</span>: {
                <span class="hljs-attr">name</span>: <span class="hljs-string">'liyang'</span>,
                <span class="hljs-attr">age</span>: <span class="hljs-number">22</span>,
                <span class="hljs-attr">company</span>: <span class="hljs-string">'Baidu'</span>
            },
            <span class="hljs-attr">arr</span>: [{
                <span class="hljs-attr">name</span>: <span class="hljs-string">'liyang'</span>,
                <span class="hljs-attr">age</span>: <span class="hljs-number">22</span>,
                <span class="hljs-attr">company</span>: <span class="hljs-string">'Baidu'</span>
            },{
                <span class="hljs-attr">name</span>: <span class="hljs-string">'qqq'</span>,
                <span class="hljs-attr">age</span>: <span class="hljs-number">23</span>,
                <span class="hljs-attr">company</span>: <span class="hljs-string">'Alibaba'</span>
            },{
                <span class="hljs-attr">name</span>: <span class="hljs-string">'www'</span>,
                <span class="hljs-attr">age</span>: <span class="hljs-number">24</span>,
                <span class="hljs-attr">company</span>: <span class="hljs-string">'Tencent'</span>
            }]
        }
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>   
</span></code></pre>
<p>获取数组中的每一个对象，运行效果：<br><span class="img-wrap"><img data-src="/img/bVbixP9?w=481&amp;h=121" src="https://static.alili.tech/img/bVbixP9?w=481&amp;h=121" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>获取对象中的某个信息<br>"{{"obj.name"}}"<br><span class="img-wrap"><img data-src="/img/bVbixQM?w=147&amp;h=88" src="https://static.alili.tech/img/bVbixQM?w=147&amp;h=88" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>获取对象中的所有信息</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul>
    <li v-for=&quot;obj in arr&quot;>
         <div v-for=&quot;(val,key) in obj&quot;>"{{"val"}}"--"{{"key"}}"</div>
         <!-- "{{"obj"}}" -->
    </li>
</ul>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"obj in arr"</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(val,key) in obj"</span>&gt;</span></span><span class="hljs-template-variable">"{{"val"}}"</span><span class="xml">--</span><span class="hljs-template-variable">"{{"key"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
         <span class="hljs-comment">&lt;!-- </span></span><span class="hljs-template-variable">"{{"obj"}}"</span><span class="xml"><span class="hljs-comment"> --&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbixVE?w=192&amp;h=196" src="https://static.alili.tech/img/bVbixVE?w=192&amp;h=196" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>如果想得到按照年龄大小排序的结果</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul>
    <li v-for=&quot;obj in arrSort&quot;>
         <div v-for=&quot;(val,key) in obj&quot;>"{{"val"}}"--"{{"key"}}"</div>
          <!-- "{{"obj"}}" -->
    </li>
</ul>
computed: {
            arrSort() {
                return this.arr.sort(function (a, b) {
                    return a.age - b.age;
                });
            }
        }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"obj in arrSort"</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(val,key) in obj"</span>&gt;</span></span><span class="hljs-template-variable">"{{"val"}}"</span><span class="xml">--</span><span class="hljs-template-variable">"{{"key"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-comment">&lt;!-- </span></span><span class="hljs-template-variable">"{{"obj"}}"</span><span class="xml"><span class="hljs-comment"> --&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
computed: {
            arrSort() {
                return this.arr.sort(function (a, b) {
                    return a.age - b.age;
                });
            }
        }</span></code></pre>
<p><strong>这里就很困惑哦，为啥a.age-b.age返回这个值就是升序排序了</strong><br>去查了一下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" var numArr = [13,22,43,9,34,223,98];
    numArr.sort(function(a,b) {
        return a - b;//升序
    });
    console.log(numArr);        " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code> var numArr = [<span class="hljs-number">13</span>,<span class="hljs-number">22</span>,<span class="hljs-number">43</span>,<span class="hljs-number">9</span>,<span class="hljs-number">34</span>,<span class="hljs-number">223</span>,<span class="hljs-number">98</span>];
    numArr.sort(function(a,b) {
        return a - b;<span class="hljs-comment">//升序</span>
    });
    console.log(numArr);        </code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbiAXZ?w=289&amp;h=125" src="https://static.alili.tech/img/bVbiAXZ?w=289&amp;h=125" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  var numArr = [13,22,43,9,34,223,98];
    numArr.sort(function(a,b) {
        return b - a;//降序
    });
    console.log(numArr); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>  var numArr = [<span class="hljs-number">13</span>,<span class="hljs-number">22</span>,<span class="hljs-number">43</span>,<span class="hljs-number">9</span>,<span class="hljs-number">34</span>,<span class="hljs-number">223</span>,<span class="hljs-number">98</span>];
    numArr.sort(function(a,b) {
        return b - a;<span class="hljs-comment">//降序</span>
    });
    console.log(numArr); </code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbiAYv?w=292&amp;h=139" src="https://static.alili.tech/img/bVbiAYv?w=292&amp;h=139" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>原因：其实这个函数相当于一个委托(或许说谓词函数更为贴切一些)，因为要对数组排序，必然要涉及到两个数组成员的比较，这个函数为你提供一种选择，以改变默认的大小比较规则，排序结果根据这个规则进行比较(函数返回值小于0认为是第一个元素小于第二个元素，等于0是两个元素相等，大于0是第一个元素大于第二个元素)。简单的改变这个函数，你就可以实现倒序排序。也可以对一个具有多个属性的对象进行排序。</p>
<h2 id="articleHeader9">v-text指令</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="v-text指令相当于先解析双花括号，再解析里面的内容，解决页面加载有双花括号会闪烁的问题。
<div id=&quot;app&quot;>
    <span v-text=&quot;msg&quot;></span>
    <span v-html=&quot;msg&quot;></span>
</div>
<script src=&quot;vue.min.js&quot;></script>

<script>
    let vm = new Vue({
        el: '#app',
        data: {
            msg: '<h3>I am Liyang</h3>'
        }
    });
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>v-text指令相当于先解析双花括号，再解析里面的内容，解决页面加载有双花括号会闪烁的问题。
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-text</span>=<span class="hljs-string">"msg"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-html</span>=<span class="hljs-string">"msg"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"vue.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">let</span> vm = <span class="hljs-keyword">new</span> Vue({
        <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
        <span class="hljs-attr">data</span>: {
            <span class="hljs-attr">msg</span>: <span class="hljs-string">'&lt;h3&gt;I am Liyang&lt;/h3&gt;'</span>
        }
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbiA3p?w=208&amp;h=127" src="https://static.alili.tech/img/bVbiA3p?w=208&amp;h=127" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br><strong>v-html不建议使用，会注掉一些标签，引起安全性问题</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
VUE的总结(1)

## 原文链接
[https://segmentfault.com/a/1190000016786374](https://segmentfault.com/a/1190000016786374)

