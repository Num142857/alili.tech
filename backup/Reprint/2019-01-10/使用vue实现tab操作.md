---
title: '使用vue实现tab操作' 
date: 2019-01-10 2:30:08
hidden: true
slug: l8r9e2mrk3q
categories: [reprint]
---

{{< raw >}}

                    
<p>原文地址:<a href="https://www.xiabingbao.com/vue/2017/07/02/vue-tab.html" rel="nofollow noreferrer" target="_blank">https://www.xiabingbao.com/vue/2017/07/02/vue-tab.html</a>  </p>
<p>在使用jQuery类库实现tab功能时，是获取鼠标在mousenter或click时的index值，然后切换到当前的标题和内容，把其他的标题和内容的状态去掉：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('.tab .title').find('.item')
    .removeClass('current').eq(index).addClass('current'); // 为index位置的title添加current
$('.tab .content').find('.item')
    .hide().eq(index).show(); // 显示index位置的内容" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">$(<span class="hljs-string">'.tab .title'</span>).find(<span class="hljs-string">'.item'</span>)
    .removeClass(<span class="hljs-string">'current'</span>).eq(index).addClass(<span class="hljs-string">'current'</span>); <span class="hljs-comment">// 为index位置的title添加current</span>
$(<span class="hljs-string">'.tab .content'</span>).find(<span class="hljs-string">'.item'</span>)
    .hide().eq(index).show(); <span class="hljs-comment">// 显示index位置的内容</span></code></pre>
<p>那么在使用vue实现tab功能时，就不是像jQuery这种直接操作DOM了。我这里总结了下实现tab功能的3个思路，仅供参考。</p>
<h3 id="articleHeader0">1. 切换content或者直接切换内容</h3>
<p>这种思路下，我们首先把结构搭建起来，然后用一个变量<code>selected</code>表示tab当前展示的位置，给li标签添加mouseenter或click事件，将当前的index传递进去：  <br>html代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;hd&quot;>
    <ul class=&quot;clearfix&quot;>
        <li v-for=&quot;(item, index) of list&quot; :class=&quot;{active:selected==index}&quot; @mouseenter=&quot;change(index)&quot;>"{{"item.title"}}"</li>
    </ul>
</div>
<div v-for=&quot;(item, index) of list&quot; :class=&quot;{active:selected==index, item:true}&quot; v-html=&quot;item.content&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"hd"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"clearfix"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(item, index) of list"</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"{active:selected==index}"</span> @<span class="hljs-attr">mouseenter</span>=<span class="hljs-string">"change(index)"</span>&gt;</span>"{{"item.title"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(item, index) of list"</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"{active:selected==index, item:true}"</span> <span class="hljs-attr">v-html</span>=<span class="hljs-string">"item.content"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>js代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var app = new Vue({
    el: '#app',
    data: {
        selected: 0, //当前位置
        list: [
            {
                title: '11111',
                content: '11111content'
            },
            {
                title: '22222',
                content: '222222content'
            },
            {
                title: '33333',
                content: `<div>
                                <span style=&quot;color:#f00&quot;>hello world</span>
                                <p><input type=&quot;text&quot; v-model=&quot;message&quot;></p>
                                <p>"{{"message"}}"</p>
                            </div>`
            }
        ]
    },
    methods: {
        change(index) {
            this.selected = index;
        }
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
    <span class="hljs-attr">data</span>: {
        <span class="hljs-attr">selected</span>: <span class="hljs-number">0</span>, <span class="hljs-comment">//当前位置</span>
        list: [
            {
                <span class="hljs-attr">title</span>: <span class="hljs-string">'11111'</span>,
                <span class="hljs-attr">content</span>: <span class="hljs-string">'11111content'</span>
            },
            {
                <span class="hljs-attr">title</span>: <span class="hljs-string">'22222'</span>,
                <span class="hljs-attr">content</span>: <span class="hljs-string">'222222content'</span>
            },
            {
                <span class="hljs-attr">title</span>: <span class="hljs-string">'33333'</span>,
                <span class="hljs-attr">content</span>: <span class="hljs-string">`&lt;div&gt;
                                &lt;span style="color:#f00"&gt;hello world&lt;/span&gt;
                                &lt;p&gt;&lt;input type="text" v-model="message"&gt;&lt;/p&gt;
                                &lt;p&gt;"{{"message"}}"&lt;/p&gt;
                            &lt;/div&gt;`</span>
            }
        ]
    },
    <span class="hljs-attr">methods</span>: {
        change(index) {
            <span class="hljs-keyword">this</span>.selected = index;
        }
    }
})</code></pre>
<p>绑定的<code>change(index)</code>事件，每次都将index给了<code>selected</code>，然后tab就会切换到对应的标签。【<a href="http://www.xiabingbao.com/demo/vue-tab/demo1.html" rel="nofollow noreferrer" target="_blank">查看实例1</a>】  </p>
<p>上面的代码里，我们是通过切换div的显示与隐藏来进行执行的。tab中的content里如果只有纯html内容，我们可以直接把<code>list[selected].content</code>展示到.bd中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class='bd' v-html=&quot;list[selected].content&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'bd'</span> <span class="hljs-attr">v-html</span>=<span class="hljs-string">"list[selected].content"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>每次selected变换时，bd的内容都会发生变化。</p>
<h3 id="articleHeader1">2. 使用currentView</h3>
<p>在上面的实现方式中，第3个tab里有个输入框与p标签双向绑定，但是没有效果，因为vue是把list中的内容作为html元素填充到页面中的，message并没有作为vue的属性绑定给input。那么使用组建和currentView就能弥补这个缺陷。  </p>
<p>无论使用全局注册还是局部注册的组件，思路都是一样的，我们暂时使用全局注册的组件来实现。  </p>
<p>每个组件里展示的是一个tab里的内容，先注册3个组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// tab0
Vue.component('item0',{
    template : '<div>1111111content</div>'
});
// tab1
Vue.component('item1',{
    template : '<div>222222content</div>'
})
// tab2
Vue.component('item2',{
    data(){
        return{
            message : ''
        }
    },
    template : `<div>
                    <span style=&quot;color:#f00&quot;>hello world</span>
                    <p><input type=&quot;text&quot; v-model=&quot;message&quot;></p>
                    <p>"{{"message"}}"</p>
                </div>`
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// tab0</span>
Vue.component(<span class="hljs-string">'item0'</span>,{
    <span class="hljs-attr">template</span> : <span class="hljs-string">'&lt;div&gt;1111111content&lt;/div&gt;'</span>
});
<span class="hljs-comment">// tab1</span>
Vue.component(<span class="hljs-string">'item1'</span>,{
    <span class="hljs-attr">template</span> : <span class="hljs-string">'&lt;div&gt;222222content&lt;/div&gt;'</span>
})
<span class="hljs-comment">// tab2</span>
Vue.component(<span class="hljs-string">'item2'</span>,{
    data(){
        <span class="hljs-keyword">return</span>{
            <span class="hljs-attr">message</span> : <span class="hljs-string">''</span>
        }
    },
    <span class="hljs-attr">template</span> : <span class="hljs-string">`&lt;div&gt;
                    &lt;span style="color:#f00"&gt;hello world&lt;/span&gt;
                    &lt;p&gt;&lt;input type="text" v-model="message"&gt;&lt;/p&gt;
                    &lt;p&gt;"{{"message"}}"&lt;/p&gt;
                &lt;/div&gt;`</span>
})</code></pre>
<p>然后在html中使用component来展示对应组件的内容，title的展示方式不变：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;hd&quot;>
    <ul class=&quot;clearfix&quot;>
        <li v-for=&quot;(item, index) of list&quot; :class=&quot;{active:selected==index}&quot; @mouseenter=&quot;change(index)&quot;>"{{"item.title"}}"</li>
    </ul>
</div>
<component :is=&quot;currentView&quot;></component>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"hd"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"clearfix"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(item, index) of list"</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"{active:selected==index}"</span> @<span class="hljs-attr">mouseenter</span>=<span class="hljs-string">"change(index)"</span>&gt;</span>"{{"item.title"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">component</span> <span class="hljs-attr">:is</span>=<span class="hljs-string">"currentView"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">component</span>&gt;</span></code></pre>
<p><code>currentView</code>属性可以让多个组件可以使用同一个挂载点，并动态切换：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var app = new Vue({
    el: '#app',
    data: {
        selected: 0,
        currentView : 'item0',
        list: [
            {
                title: '11111'
            },
            {
                title: '22222'
            },
            {
                title: '33333'
            }
        ]
    },
    methods: {
        change(index) {
            this.selected = index;
            this.currentView = 'item'+index; // 切换currentView
        }
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
    <span class="hljs-attr">data</span>: {
        <span class="hljs-attr">selected</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">currentView</span> : <span class="hljs-string">'item0'</span>,
        <span class="hljs-attr">list</span>: [
            {
                <span class="hljs-attr">title</span>: <span class="hljs-string">'11111'</span>
            },
            {
                <span class="hljs-attr">title</span>: <span class="hljs-string">'22222'</span>
            },
            {
                <span class="hljs-attr">title</span>: <span class="hljs-string">'33333'</span>
            }
        ]
    },
    <span class="hljs-attr">methods</span>: {
        change(index) {
            <span class="hljs-keyword">this</span>.selected = index;
            <span class="hljs-keyword">this</span>.currentView = <span class="hljs-string">'item'</span>+index; <span class="hljs-comment">// 切换currentView</span>
        }
    }
})</code></pre>
<p>这样 message 在组件里就是一个独立的data属性，能在tab里也使用vue绑定事件了【<a href="http://www.xiabingbao.com/demo/vue-tab/demo2.html" rel="nofollow noreferrer" target="_blank">查看实例2</a>】。</p>
<h3 id="articleHeader2">3. 使用slot方式等</h3>
<p>使用<code>slot</code>方式进行内容分发或者一个独立的组件，可以让我们把代码整合到一块，对外提供一个数据接口，只要按照既定的格式填写数据即可。</p>
<h4>3.1 slot</h4>
<p>用slot方式写一个子组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('my-slot-tab', {
    props : ['list', 'selected'],
    template : `<div class=&quot;tab&quot;>
                    <div class=&quot;hd&quot;>
                        <ul class=&quot;clearfix&quot;>
                            <slot name=&quot;title&quot; v-for=&quot;(item, index) in list&quot; :index=&quot;index&quot; :text=&quot;item.title&quot;> </slot>
                        </ul>
                    </div>
                    <div class=&quot;bd&quot;>
                        <slot name=&quot;content&quot; :content=&quot;list[selected].content&quot;></slot>
                    </div>
                </div>`
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Vue.component(<span class="hljs-string">'my-slot-tab'</span>, {
    <span class="hljs-attr">props</span> : [<span class="hljs-string">'list'</span>, <span class="hljs-string">'selected'</span>],
    <span class="hljs-attr">template</span> : <span class="hljs-string">`&lt;div class="tab"&gt;
                    &lt;div class="hd"&gt;
                        &lt;ul class="clearfix"&gt;
                            &lt;slot name="title" v-for="(item, index) in list" :index="index" :text="item.title"&gt; &lt;/slot&gt;
                        &lt;/ul&gt;
                    &lt;/div&gt;
                    &lt;div class="bd"&gt;
                        &lt;slot name="content" :content="list[selected].content"&gt;&lt;/slot&gt;
                    &lt;/div&gt;
                &lt;/div&gt;`</span>
});</code></pre>
<p>父组件模板：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<my-slot-tab :list=&quot;list&quot; :selected=&quot;selected&quot;>
    <template slot=&quot;title&quot; scope=&quot;props&quot;>
        <li :class=&quot;{active:selected==props.index, item:true}&quot; @mouseenter=&quot;change(props.index)&quot;>"{{" props.text "}}"</li>
    </template>
    <template slot=&quot;content&quot; scope=&quot;props&quot;>
        <div v-html=&quot;props.content&quot;></div>
    </template>
</my-slot-tab>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">my-slot-tab</span> <span class="hljs-attr">:list</span>=<span class="hljs-string">"list"</span> <span class="hljs-attr">:selected</span>=<span class="hljs-string">"selected"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"title"</span> <span class="hljs-attr">scope</span>=<span class="hljs-string">"props"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"{active:selected==props.index, item:true}"</span> @<span class="hljs-attr">mouseenter</span>=<span class="hljs-string">"change(props.index)"</span>&gt;</span>"{{" props.text "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"content"</span> <span class="hljs-attr">scope</span>=<span class="hljs-string">"props"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-html</span>=<span class="hljs-string">"props.content"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">my-slot-tab</span>&gt;</span></code></pre>
<p>父组件中<code>slot="title"</code>会替换子组件中<code>name="title"</code>的slot，父组件中<code>slot="content"</code>会替换子组件中<code>name="content"</code>的slot.最终渲染出来的tab结构与上面之前的代码一样。【<a href="http://www.xiabingbao.com/demo/vue-tab/demo3.html" rel="nofollow noreferrer" target="_blank">查看实例3-1</a>】</p>
<h4>3.2 其他组件方式</h4>
<p>还有一种方式就是把所有的模板都写到组件中。  <br>子组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('my-tab', {
    props : ['list'],
    template : `<div class=&quot;tab&quot;>
                    <div class=&quot;hd&quot;>
                        <ul class=&quot;clearfix&quot;>
                            <li v-for=&quot;(item, index) in list&quot; :class=&quot;{active:selected==index, item:true}&quot; @mouseenter=&quot;change(index)&quot;>"{{"item.title"}}"</li>
                        </ul>
                    </div>
                    <div class=&quot;bd&quot;>
                        <div v-for=&quot;(item, index) of list&quot; :class=&quot;{active:selected==index, item:true}&quot; v-html=&quot;item.content&quot;></div>
                    </div>
                </div>`,
    data(){
        return{
            selected:0
        }
    },
    methods : {
        change(index){
            this.selected = index;
        }
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Vue.component(<span class="hljs-string">'my-tab'</span>, {
    <span class="hljs-attr">props</span> : [<span class="hljs-string">'list'</span>],
    <span class="hljs-attr">template</span> : <span class="hljs-string">`&lt;div class="tab"&gt;
                    &lt;div class="hd"&gt;
                        &lt;ul class="clearfix"&gt;
                            &lt;li v-for="(item, index) in list" :class="{active:selected==index, item:true}" @mouseenter="change(index)"&gt;"{{"item.title"}}"&lt;/li&gt;
                        &lt;/ul&gt;
                    &lt;/div&gt;
                    &lt;div class="bd"&gt;
                        &lt;div v-for="(item, index) of list" :class="{active:selected==index, item:true}" v-html="item.content"&gt;&lt;/div&gt;
                    &lt;/div&gt;
                &lt;/div&gt;`</span>,
    data(){
        <span class="hljs-keyword">return</span>{
            <span class="hljs-attr">selected</span>:<span class="hljs-number">0</span>
        }
    },
    <span class="hljs-attr">methods</span> : {
        change(index){
            <span class="hljs-keyword">this</span>.selected = index;
        }
    }
});</code></pre>
<p>父组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<my-tab :list=&quot;list&quot;></my-tab>  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">my-tab</span> <span class="hljs-attr">:list</span>=<span class="hljs-string">"list"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-tab</span>&gt;</span>  </code></pre>
<p>这种只需要传递一个list即可。【<a href="http://www.xiabingbao.com/demo/vue-tab/demo3.html" rel="nofollow noreferrer" target="_blank">查看实例3-2</a>】  </p>
<p>对比这两种方法，slot中可以自定义更多的内容，而下面的方法使用起来更加简单，只是自定义的东西比较少。</p>
<h3 id="articleHeader3">4. 总结</h3>
<p>上面讲解了几种实现tab功能的方式，没有说哪种方式最好，选择最适合自己项目需求的方式就是最好的。文中有哪有错误或不足，欢迎批评指正。  </p>
<p>如果你觉得不错，欢迎关注我的公众号：<strong>wenzichel</strong><br><span class="img-wrap"><img data-src="/img/remote/1460000010022524?w=258&amp;h=258" src="https://static.alili.tech/img/remote/1460000010022524?w=258&amp;h=258" alt="wenzichel" title="wenzichel" style="cursor: pointer; display: inline;"></span></p>
<p>原文地址:<a href="https://www.xiabingbao.com/vue/2017/07/02/vue-tab.html" rel="nofollow noreferrer" target="_blank">https://www.xiabingbao.com/vue/2017/07/02/vue-tab.html</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用vue实现tab操作

## 原文链接
[https://segmentfault.com/a/1190000010019716](https://segmentfault.com/a/1190000010019716)

