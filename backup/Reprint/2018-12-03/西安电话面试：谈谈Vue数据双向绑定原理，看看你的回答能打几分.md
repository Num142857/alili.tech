---
title: '西安电话面试：谈谈Vue数据双向绑定原理，看看你的回答能打几分' 
date: 2018-12-03 2:30:08
hidden: true
slug: gjsniu7t31h
categories: [reprint]
---

{{< raw >}}

                    
<p>最近我参加了一次来自西安的电话面试（第二轮，技术面），是大厂还是小作坊我在这里按下不表，先来说说这次电面给我留下印象较深的几道面试题，这次先来谈谈Vue的数据双向绑定原理。</p>
<h2>情景再现：</h2>
<blockquote>当我手机铃声响起，看着屏幕上面显示的归属地是来自陕西西安的电话，我知道属于我人生的第一次电话面试要来了。接起电话后，电脑那头传来了面试官的声音（中间省略了一些客套，直接上面试题。）面试官发问，“谈谈你对Vue数据双向绑定的认识”。</blockquote>
<p>面试官的这个问题也可以理解成为“你是怎么理解Vue数据绑定，知道它背后实现的原理么”。一般刚毕业的前端新人可能会说，用v-model。（当然，这可能是句废话）</p>
<p>如果简单说下v-model指令，是Vue的语法糖之类的，可能不会让面试官满意，也看不出你对Vue的熟练程度。只能说明你看过Vue的官方文档，如下图所示：</p>
<p><span class="img-wrap"><img data-src="/img/bV9oA8?w=1668&amp;h=1296" src="https://static.alili.tech/img/bV9oA8?w=1668&amp;h=1296" alt="图片描述" title="图片描述"></span></p>
<p>如果你的回答点到此为止，基本上是不合格的。此时面试官可能会含蓄地追问：然后呢？</p>
<p>其实，如果面试官就这个问题追问，你应该要往两方面想。往浅了说，如果不用v-model指令，你能用自己的思路实现双向绑定吗？往深了挖，他是想问v-model实现背后的原理。</p>
<p>如果你能get到这一点，说明你已经上道了，起码是在公司中开发过业务代码的小码农。</p>
<p>那如何在组件中自定义实现类似v-model的数据绑定呢？</p>
<p>我先撸为敬：</p>
<pre><code>import Vue from 'vue'

const component = {
    template: `
        &lt;div&gt;
            &lt;input type="text" @input="handleInput"&gt;
        &lt;/div&gt;
    `,
    methods: {
        handleInput (e) {
            this.$emit('input', e.target.value)
        }
    }
}

new Vue({
    conponents: {
        CompA: component
    },
    el: '#root',
    template: `
        &lt;div&gt;
            &lt;comp-a&gt;&lt;/comp-a&gt;
        &lt;/div&gt;
    `
})</code></pre>
<p>这是一个初始化的demo，定义了一个组件component，实例化了一个Vue对象。v-model绑定的值，是从外层的Vue实例中传进去的。首先我们要在组件component里面定义一个props：</p>
<pre><code>props: ['value']</code></pre>
<p>然后就可以在Vue实例的template模板里面去加上这个value，同时绑定input事件：</p>
<pre><code>template: `
    &lt;div&gt;
        &lt;comp-a :value="value" @input="value = arguments[0]"&gt;&lt;/comp-a&gt;
    &lt;/div&gt;
`,
data () {
    return {
        value: 'runtu'
    }
}</code></pre>
<p>解释一下，上面代码中的arguments就是组件template里面的$emit传出来的值，所有的参数都会放到arguments里面，类似于数组。所以这边我们把arguments[0]赋值给了value。</p>
<p>同样，组件component里面的input也得绑定value：</p>
<pre><code>const component = {
    props: ['value'],
    template: `
        &lt;div&gt;
            &lt;input type="text" @input="handleInput" :value="value"&gt;
        &lt;/div&gt;
    `,
    methods: {
        handleInput (e) {
            this.$emit('input', e.target.value)
        }
    }
}</code></pre>
<p>等执行完以上步骤，江湖规矩，先在terminal里面跑一下 npm run dev ：</p>
<p><span class="img-wrap"><img data-src="/img/bV9oHW?w=1810&amp;h=454" src="https://static.alili.tech/img/bV9oHW?w=1810&amp;h=454" alt="图片描述" title="图片描述"></span></p>
<p>看到demo运行成功地跑在本地8080端口之后，再将视线转移到浏览器里看一下：</p>
<p><span class="img-wrap"><img data-src="/img/bV9oID?w=879&amp;h=553" src="https://static.alili.tech/img/bV9oID?w=879&amp;h=553" alt="图片描述" title="图片描述"></span></p>
<p>你可以看到Root里面的value是“runtu”，当我们在input框里输入什么，它的data里面的值就会变成什么。相当于我们在Vue实例模板中使用v-model，就等价于我们去绑定了:value和 @input。</p>
<p>到此，这个demo已经实现了v-model的功能。</p>
<p>当然，此时的template里面可以直接将:value和 @input替换为v-model，效果是一样的：</p>
<pre><code>template: `
    &lt;div&gt;
        &lt;comp-a v-model="value"&gt;&lt;/comp-a&gt;
    &lt;/div&gt;
`,</code></pre>
<p>这应该是最简单的实现v-model数据绑定的demo。只需要在一个组件里面有个props，加上一个value，然后当组件要去修改数据的时候， $emit一个input事件，并且把新的值传出去。这就实现了Vue里面的数据双向绑定。</p>
<p>其实，v-model指令就是在组件上加了一个props，以及增加了一个事件监听（比如本demo中的input事件），说白了，在v-model里面作者帮我们封装了这个双向绑定的逻辑，我们只管拿去用就好。</p>
<p>当然这个demo还可以更进一步，给变量的名称定义一下，这样看起来更加灵活：</p>
<pre><code>const conmponent = {
    model: {
        prop: 'value',
        event: 'change'
    },
    props: ['value'],
    template: `
        &lt;div&gt;
            &lt;input type="text" @input="handleInput" :value="value"&gt;
        &lt;/div&gt;
    `,
    methods: {
        handleInput (e) {
            this.$emit('change', e.target.value)
        }
    }
}</code></pre>
<h2>总结</h2>
<p>一句话总结就是：在数据渲染时使用prop渲染数据，将prop绑定到子组件自身的数据上，修改数据时更新自身数据来替代prop，watch子组件自身数据的改变，触发事件通知父组件更改绑定到prop的数据。</p>
<p>面试官可能还会不厌其烦地问你，Vue数据绑定这样做的好处是什么？</p>
<p>敲黑板划重点：<strong>父组件数据改变时，不会修改存储prop的子组件数据，只是以子组件数据为媒介，完成对prop的双向修改。</strong></p>
<p>如果还要继续深挖，就得搬个小板凳泡上一壶茶准备好瓜子花生，坐下来跟面试官好好聊一聊Vue的响应式原理了，Object.defineProperty 通过 getter 和 setter 劫持了对象赋值的过程，在这个过程中可以进行更新 dom 操作等等。</p>
<p>当你能聊到这部分的时候，说明你对Vue的研究达到了一定的程度，面试官也能通过这个问题了解到电话那头的你对Vue.js知识掌握的深浅，不止停留在使用API做业务开发层面。</p>
<p>当然，这道面试题仅仅是我此次西安电话面试的开胃菜，接下来还有更多面试题等着我去回答，此电面系列文章会第一时间更新在我的公众号&lt;<strong>闰土大叔</strong>&gt;里面，欢迎大家关注。</p>
<p><span class="img-wrap"><img data-src="/img/bV9oIK?w=344&amp;h=344" src="https://static.alili.tech/img/bV9oIK?w=344&amp;h=344" alt="图片描述" title="图片描述"></span></p>
<p>另外，跟大家透个底，目前为止，通过几轮的面试，我已经成功地拿到了这家上市公司的offer。</p>
<p>未完待续......</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
西安电话面试：谈谈Vue数据双向绑定原理，看看你的回答能打几分

## 原文链接
[https://segmentfault.com/a/1190000014593975](https://segmentfault.com/a/1190000014593975)

