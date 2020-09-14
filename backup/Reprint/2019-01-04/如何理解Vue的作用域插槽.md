---
title: '如何理解Vue的作用域插槽' 
date: 2019-01-04 2:30:10
hidden: true
slug: klje4kg21os
categories: [reprint]
---

{{< raw >}}

                    
<p>举个例子，比如我写了一个可以实现条纹相间的列表组件，发布后，使用者可以自定义每一行的内容或样式（普通的slot就可以完成这个工作）。而作用域插槽的关键之处就在于，父组件能接收来自子组件的slot传递过来的参数，具体看案例和注释。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
    <html lang=&quot;en&quot;>
    <head>
        <meta charset=&quot;UTF-8&quot;>
        <title>Vue作用域插槽</title>
        <script src=&quot;https://cdn.bootcss.com/vue/2.3.4/vue.js&quot;></script>
    </head>
    <body>
        <div id=&quot;app2&quot;>
            <!-- 组件使用者只需传递users数据即可 -->
            <my-stripe-list :items=&quot;users&quot; odd-bgcolor=&quot;#D3DCE6&quot; even-bgcolor=&quot;#E5E9F2&quot;>
                <!-- props对象接收来自子组件slot的$index参数 -->
                <template slot=&quot;cont&quot; scope=&quot;props&quot;>
                    <span>"{{"users[props.$index].id"}}"</span>
                    <span>"{{"users[props.$index].name"}}"</span>
                    <span>"{{"users[props.$index].age"}}"</span>
                    <!-- 这里可以自定[编辑][删除]按钮的链接和样式 -->
                    <a :href=&quot;'#edit/id/'+users[props.$index].id&quot;>编辑</a>
                    <a :href=&quot;'#del/id/'+users[props.$index].id&quot;>删除</a>
                </template>
            </my-stripe-list>
        </div>
        <script>
            Vue.component('my-stripe-list', {
                /*slot的$index可以传递到父组件中*/
                template: `
                    <div>
                        <div v-for=&quot;(item, index) in items&quot; style=&quot;line-height:2.2;&quot; :style=&quot;index % 2 === 0 ? 'background:'+oddBgcolor : 'background:'+evenBgcolor&quot;>
                            <slot name=&quot;cont&quot; :$index=&quot;index&quot;></slot>
                        </div>
                    </div>
                `,
                props: {
                    items: Array,
                    oddBgcolor: String,
                    evenBgcolor: String
                }
            });
            new Vue({
                el: '#app2',
                data: {
                    users: [
                        {id: 1, name: '张三', age: 20},
                        {id: 2, name: '李四', age: 22},
                        {id: 3, name: '王五', age: 27},
                        {id: 4, name: '张龙', age: 27},
                        {id: 5, name: '赵虎', age: 27}
                    ]
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
        <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Vue作用域插槽<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/vue/2.3.4/vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app2"</span>&gt;</span>
            <span class="hljs-comment">&lt;!-- 组件使用者只需传递users数据即可 --&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">my-stripe-list</span> <span class="hljs-attr">:items</span>=<span class="hljs-string">"users"</span> <span class="hljs-attr">odd-bgcolor</span>=<span class="hljs-string">"#D3DCE6"</span> <span class="hljs-attr">even-bgcolor</span>=<span class="hljs-string">"#E5E9F2"</span>&gt;</span>
                <span class="hljs-comment">&lt;!-- props对象接收来自子组件slot的$index参数 --&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"cont"</span> <span class="hljs-attr">scope</span>=<span class="hljs-string">"props"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span></span><span class="hljs-template-variable">"{{"users[props.$index].id"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span></span><span class="hljs-template-variable">"{{"users[props.$index].name"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span></span><span class="hljs-template-variable">"{{"users[props.$index].age"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                    <span class="hljs-comment">&lt;!-- 这里可以自定[编辑][删除]按钮的链接和样式 --&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">:href</span>=<span class="hljs-string">"'#edit/id/'+users[props.$index].id"</span>&gt;</span>编辑<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">:href</span>=<span class="hljs-string">"'#del/id/'+users[props.$index].id"</span>&gt;</span>删除<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">my-stripe-list</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
            Vue.component(<span class="hljs-string">'my-stripe-list'</span>, {
                <span class="hljs-comment">/*slot的$index可以传递到父组件中*/</span>
                template: `
                    &lt;div&gt;
                        &lt;div v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"(item, index) in items"</span> style=<span class="hljs-string">"line-height:2.2;"</span> :style=<span class="hljs-string">"index % 2 === 0 ? 'background:'+oddBgcolor : 'background:'+evenBgcolor"</span>&gt;
                            &lt;slot name=<span class="hljs-string">"cont"</span> :$index=<span class="hljs-string">"index"</span>&gt;&lt;/slot&gt;
                        &lt;/div&gt;
                    &lt;/div&gt;
                `,
                props: {
                    items: Array,
                    oddBgcolor: String,
                    evenBgcolor: String
                }
            });
            <span class="hljs-keyword">new</span> Vue({
                el: <span class="hljs-string">'#app2'</span>,
                data: {
                    users: [
                        {id: <span class="hljs-number">1</span>, name: <span class="hljs-string">'张三'</span>, age: <span class="hljs-number">20</span>},
                        {id: <span class="hljs-number">2</span>, name: <span class="hljs-string">'李四'</span>, age: <span class="hljs-number">22</span>},
                        {id: <span class="hljs-number">3</span>, name: <span class="hljs-string">'王五'</span>, age: <span class="hljs-number">27</span>},
                        {id: <span class="hljs-number">4</span>, name: <span class="hljs-string">'张龙'</span>, age: <span class="hljs-number">27</span>},
                        {id: <span class="hljs-number">5</span>, name: <span class="hljs-string">'赵虎'</span>, age: <span class="hljs-number">27</span>}
                    ]
                }
            });
        </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVTf5W?w=273&amp;h=175" src="https://static.alili.tech/img/bVTf5W?w=273&amp;h=175" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何理解Vue的作用域插槽

## 原文链接
[https://segmentfault.com/a/1190000010747756](https://segmentfault.com/a/1190000010747756)

