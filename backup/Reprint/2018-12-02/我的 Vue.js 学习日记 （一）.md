---
title: '我的 Vue.js 学习日记 （一）' 
date: 2018-12-02 2:30:15
hidden: true
slug: 7nuklofvmxk
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>我是一名很普通的.net程序员，做了几些年的winform的开发，有过一点点的asp.net经验，前端近瞎；恰巧公司最近需要开发一个很小的网站，那么便借此机会顺便学习一下web应用方面的知识吧。</p>
<h2 id="articleHeader1">Why Vue.js</h2>
<p>那么是什么原因让我选择了Vue呢？现在的我并不知道Vue其他的优势，只知道他做到了双向绑定，这很方便，那么就是他吧！</p>
<h2 id="articleHeader2">起步</h2>
<p>首先，我来到了Vue的官方网址<code>https://cn.vuejs.org/</code>；看了视频，其意思是说Vue是响应式的，大约是JS里的值在发生变化后，页面上对应的显示也会变化，由于我没有经历过那么没有Vue的年代，所以我唯一的感觉就是 - 这东西貌似很方便 = =...；不皮了，点击<code>起步</code>！</p>
<h2 id="articleHeader3">门槛</h2>
<p>官方友情提示：<code>HTML、CSS 和 JavaScript 的中级知识</code>，我好像不达标？简单的HTML，CSS，JS我还是能看懂的！先往下看吧。</p>
<h2 id="articleHeader4">引用</h2>
<p>两种方式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 开发环境版本，包含了用帮助的命令行警告 -->
<script src=&quot;https://cdn.jsdelivr.net/npm/vue/dist/vue.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- 开发环境版本，包含了用帮助的命令行警告 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.jsdelivr.net/npm/vue/dist/vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>或</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 生产环境版本，优化了尺寸和速度 -->
<script src=&quot;https://cdn.jsdelivr.net/npm/vue&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- 生产环境版本，优化了尺寸和速度 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.jsdelivr.net/npm/vue"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>这里提到新手不推荐用<code>vue-cli</code>，这个我还真达标了！不过什么是<code>vue-cli</code>？简单查了下，大致是这样<code>中文名叫脚手架工具，英文名叫vue-cli，作用是配合已有模版快速搭建项目</code>，吐槽一下，英文名看不懂就算了，这个中文名其实也看不懂...什么叫脚手架？？？过过过！</p>
<h2 id="articleHeader5">Hello World先锋Demo官</h2>
<p>好，看到代码了，先跟着敲一遍再说。<br>工具：<code>VS2013</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html xmlns=&quot;http://www.w3.org/1999/xhtml&quot;>
<head>
    <meta http-equiv=&quot;Content-Type&quot; content=&quot;text/html; charset=utf-8&quot; />
    <title></title>
</head>
<body>
    <div id=&quot;app&quot;>
        "{{"message"}}"
    </div>

    <script src=&quot;https://cdn.jsdelivr.net/npm/vue/dist/vue.js&quot;></script>
    <script>
        var app = new Vue({
            el: '#app',
            data: {
                message: 'Hello Vue!'
            }
        })
    </script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">xmlns</span>=<span class="hljs-string">"http://www.w3.org/1999/xhtml"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"Content-Type"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"text/html; charset=utf-8"</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
        </span><span class="hljs-template-variable">"{{"message"}}"</span><span class="xml">
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.jsdelivr.net/npm/vue/dist/vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
        <span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
            el: <span class="hljs-string">'#app'</span>,
            data: {
                message: <span class="hljs-string">'Hello Vue!'</span>
            }
        })
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></span></code></pre>
<p>输出</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Hello Vue!" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs erlang-repl"><code style="word-break: break-word; white-space: initial;">Hello Vue!</code></pre>
<p>...没有获得哪怕一丝丝成就感。</p>
<p>你问我为啥把引用放下面而不再<code>Head</code>里？那你肯定跟我是一个级别的程序员，啊哈哈哈~因为有大佬说这样不影响上面HTML的加载速度。</p>
<p>通过观察，大致可以看出来，首先你的有一个<code>div</code>，并且他要有一个<code>id</code>，然后两对大括号<code>"{{""}}"</code>是显示下面<code>var app</code>这个<code>Vue</code>对象的<code>data</code>中的一个属性<code>message</code>的值。<code>el</code>视频中也提到了，对应<code>&lt;div id="app"&gt;</code>中的<code>app</code>，然后这个<code>div</code>和这个<code>var app</code>俩人就配对成功了！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="官方提到：通过浏览器的JS控制台修改app.message值，会看到变化" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code style="word-break: break-word; white-space: initial;">官方提到：通过浏览器的JS控制台修改app.<span class="hljs-keyword">message</span>值，会看到变化</code></pre>
<p>友情提示：在谷歌浏览器，按<code>F12</code>，切换到<code>Console</code>，输入<code>app.message='大哥别杀我！'</code>回车，他变了，没了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="真的，你不知道我经历了什么！" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code style="word-break: break-word; white-space: initial;">真的，你不知道我经历了什么！</code></pre>
<h2 id="articleHeader6">绑定元素Demo</h2>
<p>先敲，先敲...</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html xmlns=&quot;http://www.w3.org/1999/xhtml&quot;>
<head>
    <meta http-equiv=&quot;Content-Type&quot; content=&quot;text/html; charset=utf-8&quot; />
    <title></title>
</head>
<body>
    <div id=&quot;app&quot;>
        "{{"message"}}"
        <br/>
        <span v-bind:title=&quot;message&quot;>
            鼠标悬停几秒据说有看头？
        </span>
    </div>

    <script src=&quot;https://cdn.jsdelivr.net/npm/vue/dist/vue.js&quot;></script>
    <script>
        var app = new Vue({
            el: '#app',
            data: {
                message: 'Hello Vue!' + new Date().toLocaleString()
            }
        })
    </script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">xmlns</span>=<span class="hljs-string">"http://www.w3.org/1999/xhtml"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"Content-Type"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"text/html; charset=utf-8"</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
        </span><span class="hljs-template-variable">"{{"message"}}"</span><span class="xml">
        <span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-bind:title</span>=<span class="hljs-string">"message"</span>&gt;</span>
            鼠标悬停几秒据说有看头？
        <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.jsdelivr.net/npm/vue/dist/vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
            <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
            <span class="hljs-attr">data</span>: {
                <span class="hljs-attr">message</span>: <span class="hljs-string">'Hello Vue!'</span> + <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().toLocaleString()
            }
        })
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></span></code></pre>
<p>没有智能感知，代码也不停报错，不过编译不会报错，运行也可以看到结果，老样子用<code>F12</code>修改<code>app.message</code>的值，效果好像与<code>上一个Demo</code>是一样的。</p>
<p>说明：<code>v-bind</code>是指令，指令带前缀<code>v-</code>，<code>v-bind</code>将<code>message</code>的值绑定<code>:</code>给<code>title</code>，<code>v-bind:title="message"</code></p>
<h2 id="articleHeader7">显示隐藏元素Demo</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html xmlns=&quot;http://www.w3.org/1999/xhtml&quot;>
<head>
    <meta http-equiv=&quot;Content-Type&quot; content=&quot;text/html; charset=utf-8&quot; />
    <title></title>
</head>
<body>
    <div id=&quot;app&quot;>
        "{{"message"}}"
        <br />
        <span v-bind:title=&quot;message&quot;>
            鼠标悬停几秒据说有看头？
        </span>
        <br />
        <p v-if=&quot;seen&quot;>Now you see me - 我伦</p>
    </div>

    <script src=&quot;https://cdn.jsdelivr.net/npm/vue/dist/vue.js&quot;></script>
    <script>
        var app = new Vue({
            el: '#app',
            data: {
                message: 'Hello Vue!' + new Date().toLocaleString(),
                seen: true
            }
        })
    </script>
</body>
</html>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">xmlns</span>=<span class="hljs-string">"http://www.w3.org/1999/xhtml"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"Content-Type"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"text/html; charset=utf-8"</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
        </span><span class="hljs-template-variable">"{{"message"}}"</span><span class="xml">
        <span class="hljs-tag">&lt;<span class="hljs-name">br</span> /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-bind:title</span>=<span class="hljs-string">"message"</span>&gt;</span>
            鼠标悬停几秒据说有看头？
        <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">br</span> /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"seen"</span>&gt;</span>Now you see me - 我伦<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.jsdelivr.net/npm/vue/dist/vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
            <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
            <span class="hljs-attr">data</span>: {
                <span class="hljs-attr">message</span>: <span class="hljs-string">'Hello Vue!'</span> + <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().toLocaleString(),
                <span class="hljs-attr">seen</span>: <span class="hljs-literal">true</span>
            }
        })
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</span></code></pre>
<p>友情提示：data中用<code>,</code>分割多个<code>属性</code>，姑且就叫属性吧。<br>老样子<code>F12</code> - <code>Console</code> - <code>app.seen=false</code>，结果是我伦不见了。<br>所以说<code>v-if</code>用来控制元素是否显示的吧。</p>
<h2 id="articleHeader8">v-for</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html xmlns=&quot;http://www.w3.org/1999/xhtml&quot;>
<head>
    <meta http-equiv=&quot;Content-Type&quot; content=&quot;text/html; charset=utf-8&quot; />
    <title></title>
</head>
<body>
    <div id=&quot;app&quot;>
        "{{"message"}}"
        <br />
        <span v-bind:title=&quot;message&quot;>
            鼠标悬停几秒据说有看头？
        </span>
        <br />
        <p v-if=&quot;seen&quot;>Now you see me - 我伦</p>
        <ol>
            <li v-for=&quot;todo in todos&quot;>
                "{{"todo.text"}}"
            </li>
        </ol>
    </div>

    <script src=&quot;https://cdn.jsdelivr.net/npm/vue/dist/vue.js&quot;></script>
    <script>
        var app = new Vue({
            el: '#app',
            data: {
                message: 'Hello Vue!' + new Date().toLocaleString(),
                seen: true,
                todos: [
                    { text: '第一个' },
                    { text: '第2个' },
                    { text: '第三个' }
                ]
            }
        })
    </script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">xmlns</span>=<span class="hljs-string">"http://www.w3.org/1999/xhtml"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"Content-Type"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"text/html; charset=utf-8"</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
        </span><span class="hljs-template-variable">"{{"message"}}"</span><span class="xml">
        <span class="hljs-tag">&lt;<span class="hljs-name">br</span> /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-bind:title</span>=<span class="hljs-string">"message"</span>&gt;</span>
            鼠标悬停几秒据说有看头？
        <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">br</span> /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"seen"</span>&gt;</span>Now you see me - 我伦<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ol</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"todo in todos"</span>&gt;</span>
                </span><span class="hljs-template-variable">"{{"todo.text"}}"</span><span class="xml">
            <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ol</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.jsdelivr.net/npm/vue/dist/vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
            <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
            <span class="hljs-attr">data</span>: {
                <span class="hljs-attr">message</span>: <span class="hljs-string">'Hello Vue!'</span> + <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().toLocaleString(),
                <span class="hljs-attr">seen</span>: <span class="hljs-literal">true</span>,
                <span class="hljs-attr">todos</span>: [
                    { <span class="hljs-attr">text</span>: <span class="hljs-string">'第一个'</span> },
                    { <span class="hljs-attr">text</span>: <span class="hljs-string">'第2个'</span> },
                    { <span class="hljs-attr">text</span>: <span class="hljs-string">'第三个'</span> }
                ]
            }
        })
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></span></code></pre>
<p>结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Hello Vue!2018/5/1 下午10:44:59 
鼠标悬停几秒据说有看头？ 
Now you see me - 我伦

第一个
第2个
第三个" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">Hello</span> <span class="hljs-selector-tag">Vue</span>!<span class="hljs-selector-tag">2018</span>/<span class="hljs-selector-tag">5</span>/<span class="hljs-selector-tag">1</span> 下午<span class="hljs-selector-tag">10</span><span class="hljs-selector-pseudo">:44</span><span class="hljs-selector-pseudo">:59</span> 
鼠标悬停几秒据说有看头？ 
<span class="hljs-selector-tag">Now</span> <span class="hljs-selector-tag">you</span> <span class="hljs-selector-tag">see</span> <span class="hljs-selector-tag">me</span> <span class="hljs-selector-tag">-</span> 我伦

第一个
第<span class="hljs-selector-tag">2</span>个
第三个</code></pre>
<p>在控制台输入：<code>app.todos.push({ text: '新项目' })</code></p>
<p>结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Hello Vue!2018/5/1 下午10:44:59 
鼠标悬停几秒据说有看头？ 
Now you see me - 我伦

第一个
第2个
第三个
新项目" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">Hello</span> <span class="hljs-selector-tag">Vue</span>!<span class="hljs-selector-tag">2018</span>/<span class="hljs-selector-tag">5</span>/<span class="hljs-selector-tag">1</span> 下午<span class="hljs-selector-tag">10</span><span class="hljs-selector-pseudo">:44</span><span class="hljs-selector-pseudo">:59</span> 
鼠标悬停几秒据说有看头？ 
<span class="hljs-selector-tag">Now</span> <span class="hljs-selector-tag">you</span> <span class="hljs-selector-tag">see</span> <span class="hljs-selector-tag">me</span> <span class="hljs-selector-tag">-</span> 我伦

第一个
第<span class="hljs-selector-tag">2</span>个
第三个
新项目</code></pre>
<p>多了一个<code>新项目</code></p>
<p>感觉官方在不停地炫耀这个值同步改变的功能。</p>
<h2 id="articleHeader9">目测是个click事件的Demo</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html xmlns=&quot;http://www.w3.org/1999/xhtml&quot;>
<head>
    <meta http-equiv=&quot;Content-Type&quot; content=&quot;text/html; charset=utf-8&quot; />
    <title></title>
</head>
<body>
    <div id=&quot;app&quot;>
        "{{"message"}}"
        <br />
        <span v-bind:title=&quot;message&quot;>
            鼠标悬停几秒据说有看头？
        </span>
        <br />
        <p v-if=&quot;seen&quot;>Now you see me - 我伦</p>
        <ol>
            <li v-for=&quot;todo in todos&quot;>
                "{{"todo.text"}}"
            </li>
        </ol>
        <button v-on:click=&quot;reverseMessage&quot;>啥叫逆转消息？？？</button>
    </div>

    <script src=&quot;https://cdn.jsdelivr.net/npm/vue/dist/vue.js&quot;></script>
    <script>
        var app = new Vue({
            el: '#app',
            data: {
                message: 'Hello Vue!' + new Date().toLocaleString(),
                seen: true,
                todos: [
                    { text: '第一个' },
                    { text: '第2个' },
                    { text: '第三个' }
                ]
            },
            methods: {
                reverseMessage: function () {
                    this.message = this.message.split('').reverse().join('')
                }
            }
        })
    </script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">xmlns</span>=<span class="hljs-string">"http://www.w3.org/1999/xhtml"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"Content-Type"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"text/html; charset=utf-8"</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
        </span><span class="hljs-template-variable">"{{"message"}}"</span><span class="xml">
        <span class="hljs-tag">&lt;<span class="hljs-name">br</span> /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-bind:title</span>=<span class="hljs-string">"message"</span>&gt;</span>
            鼠标悬停几秒据说有看头？
        <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">br</span> /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"seen"</span>&gt;</span>Now you see me - 我伦<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ol</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"todo in todos"</span>&gt;</span>
                </span><span class="hljs-template-variable">"{{"todo.text"}}"</span><span class="xml">
            <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ol</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">v-on:click</span>=<span class="hljs-string">"reverseMessage"</span>&gt;</span>啥叫逆转消息？？？<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.jsdelivr.net/npm/vue/dist/vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
            <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
            <span class="hljs-attr">data</span>: {
                <span class="hljs-attr">message</span>: <span class="hljs-string">'Hello Vue!'</span> + <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().toLocaleString(),
                <span class="hljs-attr">seen</span>: <span class="hljs-literal">true</span>,
                <span class="hljs-attr">todos</span>: [
                    { <span class="hljs-attr">text</span>: <span class="hljs-string">'第一个'</span> },
                    { <span class="hljs-attr">text</span>: <span class="hljs-string">'第2个'</span> },
                    { <span class="hljs-attr">text</span>: <span class="hljs-string">'第三个'</span> }
                ]
            },
            <span class="hljs-attr">methods</span>: {
                <span class="hljs-attr">reverseMessage</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                    <span class="hljs-keyword">this</span>.message = <span class="hljs-keyword">this</span>.message.split(<span class="hljs-string">''</span>).reverse().join(<span class="hljs-string">''</span>)
                }
            }
        })
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></span></code></pre>
<p>今天先到这里吧。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
我的 Vue.js 学习日记 （一）

## 原文链接
[https://segmentfault.com/a/1190000014683721](https://segmentfault.com/a/1190000014683721)

