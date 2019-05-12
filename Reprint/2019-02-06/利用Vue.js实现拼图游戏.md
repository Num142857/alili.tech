---
title: '利用Vue.js实现拼图游戏' 
date: 2019-02-06 2:30:09
hidden: true
slug: g68xzi1hn4o
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>之前写过一篇《基于Vue.js的表格分页组件》的文章，主要介绍了Vue组件的编写方法，有兴趣的可以访问这里进行阅读：<a href="https://segmentfault.com/a/1190000005174322">https://segmentfault.com/a/11...</a></p></blockquote>
<h2 id="articleHeader0">前言</h2>
<p>为了进一步让大家了解Vue.js的神奇魅力，了解Vue.js的一种以数据为驱动的理念，本文主要利用Vue实现了一个数字拼图游戏，其原理并不是很复杂，效果图如下：</p>
<p><span class="img-wrap"><img data-src="/img/bVzUjs" src="https://static.alili.tech/img/bVzUjs" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>demo展示地址为：<a href="https://luozhihao.github.io/vue-puzzle/index.html#" rel="nofollow noreferrer" target="_blank"></a><a href="https://luozhihao.github.io/vue-puzzle/index.html#" rel="nofollow noreferrer" target="_blank">https://luozhihao.github.io/v...</a>!/</p>
<p>有能力的可以玩玩，拼出来有赏哦~~</p>
<h2 id="articleHeader1">功能分析</h2>
<p>当然玩归玩，作为一名Vue爱好者，我们理应深入游戏内部，一探代码的实现。接下来我们就先来分析一下要完成这样的一个游戏，主要需要实现哪些功能。下面我就直接将此实例的功能点罗列在下了：</p>
<ul>
<li><p>随机生成1~15的数字格子，每一个数字都必须出现且仅出现一次</p></li>
<li><p>点击一个数字方块后，如其上下左右有一处为空，则两者交换位置</p></li>
<li><p>格子每移动一步，我们都需要校验其是否闯关成功</p></li>
<li><p>点击重置游戏按钮后需对拼图进行重新排序</p></li>
</ul>
<p>以上便是本实例的主要功能点，可见游戏功能并不复杂，我们只需一个个攻破就OK了，接下来我就来展示一下各个功能点的Vue代码。</p>
<h2 id="articleHeader2">构建游戏面板</h2>
<p>作为一款以数据驱动的JS框架，Vue的HTML模板很多时候都应该绑定数据的，比如此游戏的方块格子，我们这里肯定是不能写死的，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div class=&quot;box&quot;>
        <ul class=&quot;puzzle-wrap&quot;>
            <li 
                :class=&quot;{'puzzle': true, 'puzzle-empty': !puzzle}&quot; 
                v-for=&quot;puzzle in puzzles&quot; 
                v-text=&quot;puzzle&quot;
            ></li>
        </ul>
    </div>
</template>

<script>
export default {
    data () {
        return {
            puzzles: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
        }
    }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"puzzle-wrap"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> 
                <span class="hljs-attr">:class</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">{'puzzle': true, 'puzzle-empty': !puzzle}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span> 
                <span class="hljs-attr">v-for</span>=<span class="hljs-string">"puzzle in puzzles"</span> 
                <span class="hljs-attr">v-text</span>=<span class="hljs-string">"puzzle"</span>
            &gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> </span></span><span class="hljs-template-variable">{
    data () {
        return {
            puzzles: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
        }</span><span class="xml"><span class="undefined">
    }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>这里我省略了css样式部分，大家可以先不用关心。以上代码我们将1~15的数字写死在了一个数组中，这显然不是随机排序的，那么我们就来实现随机排序的功能。</p>
<h2 id="articleHeader3">随机排序数字</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div class=&quot;box&quot;>
        <ul class=&quot;puzzle-wrap&quot;>
            <li 
                :class=&quot;{'puzzle': true, 'puzzle-empty': !puzzle}&quot; 
                v-for=&quot;puzzle in puzzles&quot; 
                v-text=&quot;puzzle&quot;
            ></li>
        </ul>
    </div>
</template>

<script>
export default {
    data () {
        return {
            puzzles: []
        }
    },
    methods: {

        // 重置渲染
        render () {
            let puzzleArr = [],
                i = 1

            // 生成包含1 ~ 15数字的数组
            for (i; i < 16; i++) {
                puzzleArr.push(i)
            }

            // 随机打乱数组
            puzzleArr = puzzleArr.sort(() => {
                return Math.random() - 0.5
            });

            // 页面显示
            this.puzzles = puzzleArr
            this.puzzles.push('')
        },
    },
    ready () {
        this.render()
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"puzzle-wrap"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> 
                <span class="hljs-attr">:class</span>=<span class="hljs-string">"{'puzzle': true, 'puzzle-empty': !puzzle}"</span> 
                <span class="hljs-attr">v-for</span>=<span class="hljs-string">"puzzle in puzzles"</span> 
                <span class="hljs-attr">v-text</span>=<span class="hljs-string">"puzzle"</span>
            &gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    data () {
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">puzzles</span>: []
        }
    },
    <span class="hljs-attr">methods</span>: {

        <span class="hljs-comment">// 重置渲染</span>
        render () {
            <span class="hljs-keyword">let</span> puzzleArr = [],
                i = <span class="hljs-number">1</span>

            <span class="hljs-comment">// 生成包含1 ~ 15数字的数组</span>
            <span class="hljs-keyword">for</span> (i; i &lt; <span class="hljs-number">16</span>; i++) {
                puzzleArr.push(i)
            }

            <span class="hljs-comment">// 随机打乱数组</span>
            puzzleArr = puzzleArr.sort(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
                <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.random() - <span class="hljs-number">0.5</span>
            });

            <span class="hljs-comment">// 页面显示</span>
            <span class="hljs-keyword">this</span>.puzzles = puzzleArr
            <span class="hljs-keyword">this</span>.puzzles.push(<span class="hljs-string">''</span>)
        },
    },
    ready () {
        <span class="hljs-keyword">this</span>.render()
    }
}</span></code></pre>
<p>以上代码，我们利用for循环生成了一个1~15的有序数组，之后我们又利用原生JS的sort方法随机打乱数字，这里还包含了一个知识点就是Math.random()方法。<br>利用sort()方法进行自定义排序，我们需要提供一个比较函数，然后返回一个用于说明这两个值的相对顺序的数字，其返回值如下：</p>
<ul>
<li><p>返回一个小于 0 的值，说明 a 小于 b</p></li>
<li><p>返回 0，说明 a 等于 b</p></li>
<li><p>返回一个大于 0 的值，说明 a 大于 b</p></li>
</ul>
<p>这里利用Math.random()生成一个 0 ~ 1 之间的随机数，再减去0.5，这样就会有一半概率返回一个小于 0 的值， 一半概率返回一个大于 0 的值，就保证了生成数组的随机性，实现了动态随机生成数字格子的功能。</p>
<p>需要注意的是，我们还在数组最后插了一个空字符串，用来生成唯一的空白格子。</p>
<h2 id="articleHeader4">交换方块位置</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div class=&quot;box&quot;>
        <ul class=&quot;puzzle-wrap&quot;>
            <li 
                :class=&quot;{'puzzle': true, 'puzzle-empty': !puzzle}&quot; 
                v-for=&quot;puzzle in puzzles&quot; 
                v-text=&quot;puzzle&quot;
                @click=&quot;moveFn($index)&quot;
            ></li>
        </ul>
    </div>
</template>

<script>
export default {
    data () {
        return {
            puzzles: []
        }
    },
    methods: {

        // 重置渲染
        render () {
            let puzzleArr = [],
                i = 1

            // 生成包含1 ~ 15数字的数组
            for (i; i < 16; i++) {
                puzzleArr.push(i)
            }

            // 随机打乱数组
            puzzleArr = puzzleArr.sort(() => {
                return Math.random() - 0.5
            });

            // 页面显示
            this.puzzles = puzzleArr
            this.puzzles.push('')
        },

        // 点击方块
        moveFn (index) {

            // 获取点击位置及其上下左右的值
            let curNum = this.puzzles[index],
                leftNum = this.puzzles[index - 1],
                rightNum = this.puzzles[index + 1],
                topNum = this.puzzles[index - 4],
                bottomNum = this.puzzles[index + 4]

            // 和为空的位置交换数值
            if (leftNum === '' &amp;&amp; index % 4) {
                this.puzzles.$set(index - 1, curNum)
                this.puzzles.$set(index, '')
            } else if (rightNum === '' &amp;&amp; 3 !== index % 4) {
                this.puzzles.$set(index + 1, curNum)
                this.puzzles.$set(index, '')
            } else if (topNum === '') {
                this.puzzles.$set(index - 4, curNum)
                this.puzzles.$set(index, '')
            } else if (bottomNum === '') {
                this.puzzles.$set(index + 4, curNum)
                this.puzzles.$set(index, '')
            }
        }
    },
    ready () {
        this.render()
    }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"puzzle-wrap"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> 
                <span class="hljs-attr">:class</span>=<span class="hljs-string">"{'puzzle': true, 'puzzle-empty': !puzzle}"</span> 
                <span class="hljs-attr">v-for</span>=<span class="hljs-string">"puzzle in puzzles"</span> 
                <span class="hljs-attr">v-text</span>=<span class="hljs-string">"puzzle"</span>
                @<span class="hljs-attr">click</span>=<span class="hljs-string">"moveFn($index)"</span>
            &gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
export <span class="hljs-keyword">default</span> {
    data () {
        <span class="hljs-keyword">return</span> {
            puzzles: []
        }
    },
    methods: {

        <span class="hljs-comment">// 重置渲染</span>
        render () {
            let puzzleArr = [],
                i = <span class="hljs-number">1</span>

            <span class="hljs-comment">// 生成包含1 ~ 15数字的数组</span>
            <span class="hljs-keyword">for</span> (i; i &lt; <span class="hljs-number">16</span>; i++) {
                puzzleArr.push(i)
            }

            <span class="hljs-comment">// 随机打乱数组</span>
            puzzleArr = puzzleArr.sort(() =&gt; {
                <span class="hljs-keyword">return</span> Math.random() - <span class="hljs-number">0.5</span>
            });

            <span class="hljs-comment">// 页面显示</span>
            <span class="hljs-keyword">this</span>.puzzles = puzzleArr
            <span class="hljs-keyword">this</span>.puzzles.push(<span class="hljs-string">''</span>)
        },

        <span class="hljs-comment">// 点击方块</span>
        moveFn (index) {

            <span class="hljs-comment">// 获取点击位置及其上下左右的值</span>
            let curNum = <span class="hljs-keyword">this</span>.puzzles[index],
                leftNum = <span class="hljs-keyword">this</span>.puzzles[index - <span class="hljs-number">1</span>],
                rightNum = <span class="hljs-keyword">this</span>.puzzles[index + <span class="hljs-number">1</span>],
                topNum = <span class="hljs-keyword">this</span>.puzzles[index - <span class="hljs-number">4</span>],
                bottomNum = <span class="hljs-keyword">this</span>.puzzles[index + <span class="hljs-number">4</span>]

            <span class="hljs-comment">// 和为空的位置交换数值</span>
            <span class="hljs-keyword">if</span> (leftNum === <span class="hljs-string">''</span> &amp;&amp; index % <span class="hljs-number">4</span>) {
                <span class="hljs-keyword">this</span>.puzzles.$<span class="hljs-keyword">set</span>(index - <span class="hljs-number">1</span>, curNum)
                <span class="hljs-keyword">this</span>.puzzles.$<span class="hljs-keyword">set</span>(index, <span class="hljs-string">''</span>)
            } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (rightNum === <span class="hljs-string">''</span> &amp;&amp; <span class="hljs-number">3</span> !== index % <span class="hljs-number">4</span>) {
                <span class="hljs-keyword">this</span>.puzzles.$<span class="hljs-keyword">set</span>(index + <span class="hljs-number">1</span>, curNum)
                <span class="hljs-keyword">this</span>.puzzles.$<span class="hljs-keyword">set</span>(index, <span class="hljs-string">''</span>)
            } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (topNum === <span class="hljs-string">''</span>) {
                <span class="hljs-keyword">this</span>.puzzles.$<span class="hljs-keyword">set</span>(index - <span class="hljs-number">4</span>, curNum)
                <span class="hljs-keyword">this</span>.puzzles.$<span class="hljs-keyword">set</span>(index, <span class="hljs-string">''</span>)
            } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (bottomNum === <span class="hljs-string">''</span>) {
                <span class="hljs-keyword">this</span>.puzzles.$<span class="hljs-keyword">set</span>(index + <span class="hljs-number">4</span>, curNum)
                <span class="hljs-keyword">this</span>.puzzles.$<span class="hljs-keyword">set</span>(index, <span class="hljs-string">''</span>)
            }
        }
    },
    ready () {
        <span class="hljs-keyword">this</span>.render()
    }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<ol>
<li><p>这里我们首先在每个格子的li上添加了点击事件@click="moveFn($index)"，通过$index参数获取点击方块在数组中的位置</p></li>
<li><p>其次获取其上下左右的数字在数组中的index值依次为index - 4、index + 4、index - 1、index + 1</p></li>
<li><p>当我们找到上下左右有一处为空的时候我们将空的位置赋值上当前点击格子的数字，将当前点击的位置置为空</p></li>
</ol>
<p>备注：我们为什么要使用<strong>$set</strong>方法，而不直接用等号赋值呢，这里包含了Vue响应式原理的知识点。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 因为 JavaScript 的限制，Vue.js 不能检测到下面数组变化：

// 1.直接用索引设置元素，如 vm.items[0] = {}；
// 2.修改数据的长度，如 vm.items.length = 0。
// 为了解决问题 (1)，Vue.js 扩展了观察数组，为它添加了一个 $set() 方法：

// 与 `example1.items[0] = ...` 相同，但是能触发视图更新
example1.items.$set(0, { childMsg: 'Changed!'})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>// 因为 JavaScript 的限制，Vue.js 不能检测到下面数组变化：

// <span class="hljs-number">1</span>.直接用索引设置元素，如 <span class="hljs-keyword">vm</span>.<span class="hljs-built_in">items</span>[<span class="hljs-number">0</span>] = {}；
// <span class="hljs-number">2</span>.修改数据的长度，如 <span class="hljs-keyword">vm</span>.<span class="hljs-built_in">items</span>.length = <span class="hljs-number">0</span>。
// 为了解决问题 (<span class="hljs-number">1</span>)，Vue.js 扩展了观察数组，为它添加了一个 $<span class="hljs-keyword">set</span>() 方法：

// 与 `example1.<span class="hljs-built_in">items</span>[<span class="hljs-number">0</span>] = ...` 相同，但是能触发视图更新
example1.<span class="hljs-built_in">items</span>.$<span class="hljs-keyword">set</span>(<span class="hljs-number">0</span>, { childMs<span class="hljs-variable">g:</span> <span class="hljs-string">'Changed!'</span>})</code></pre>
<p>详见：<a href="http://cn.vuejs.org/guide/list.html#%E9%97%AE%E9%A2%98" rel="nofollow noreferrer" target="_blank"></a><a href="http://cn.vuejs.org/guide/list.html#" rel="nofollow noreferrer" target="_blank">http://cn.vuejs.org/guide/lis...</a>问题</p>
<h2 id="articleHeader5">检测是否闯关成功</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div class=&quot;box&quot;>
        <ul class=&quot;puzzle-wrap&quot;>
            <li 
                :class=&quot;{'puzzle': true, 'puzzle-empty': !puzzle}&quot; 
                v-for=&quot;puzzle in puzzles&quot; 
                v-text=&quot;puzzle&quot;
                @click=&quot;moveFn($index)&quot;
            ></li>
        </ul>
    </div>
</template>

<script>
export default {
    data () {
        return {
            puzzles: []
        }
    },
    methods: {

        // 重置渲染
        render () {
            let puzzleArr = [],
                i = 1

            // 生成包含1 ~ 15数字的数组
            for (i; i < 16; i++) {
                puzzleArr.push(i)
            }

            // 随机打乱数组
            puzzleArr = puzzleArr.sort(() => {
                return Math.random() - 0.5
            });

            // 页面显示
            this.puzzles = puzzleArr
            this.puzzles.push('')
        },

        // 点击方块
        moveFn (index) {

            // 获取点击位置及其上下左右的值
            let curNum = this.puzzles[index],
                leftNum = this.puzzles[index - 1],
                rightNum = this.puzzles[index + 1],
                topNum = this.puzzles[index - 4],
                bottomNum = this.puzzles[index + 4]

            // 和为空的位置交换数值
            if (leftNum === '' &amp;&amp; index % 4) {
                this.puzzles.$set(index - 1, curNum)
                this.puzzles.$set(index, '')
            } else if (rightNum === '' &amp;&amp; 3 !== index % 4) {
                this.puzzles.$set(index + 1, curNum)
                this.puzzles.$set(index, '')
            } else if (topNum === '') {
                this.puzzles.$set(index - 4, curNum)
                this.puzzles.$set(index, '')
            } else if (bottomNum === '') {
                this.puzzles.$set(index + 4, curNum)
                this.puzzles.$set(index, '')
            }

            this.passFn()
        },

        // 校验是否过关
        passFn () {
            if (this.puzzles[15] === '') {
                const newPuzzles = this.puzzles.slice(0, 15)

                const isPass = newPuzzles.every((e, i) => e === i + 1)

                if (isPass) {
                    alert ('恭喜，闯关成功！')
                }
            }
        }
    },
    ready () {
        this.render()
    }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"puzzle-wrap"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> 
                <span class="hljs-attr">:class</span>=<span class="hljs-string">"{'puzzle': true, 'puzzle-empty': !puzzle}"</span> 
                <span class="hljs-attr">v-for</span>=<span class="hljs-string">"puzzle in puzzles"</span> 
                <span class="hljs-attr">v-text</span>=<span class="hljs-string">"puzzle"</span>
                @<span class="hljs-attr">click</span>=<span class="hljs-string">"moveFn($index)"</span>
            &gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
export <span class="hljs-keyword">default</span> {
    data () {
        <span class="hljs-keyword">return</span> {
            puzzles: []
        }
    },
    methods: {

        <span class="hljs-comment">// 重置渲染</span>
        render () {
            let puzzleArr = [],
                i = <span class="hljs-number">1</span>

            <span class="hljs-comment">// 生成包含1 ~ 15数字的数组</span>
            <span class="hljs-keyword">for</span> (i; i &lt; <span class="hljs-number">16</span>; i++) {
                puzzleArr.push(i)
            }

            <span class="hljs-comment">// 随机打乱数组</span>
            puzzleArr = puzzleArr.sort(() =&gt; {
                <span class="hljs-keyword">return</span> Math.random() - <span class="hljs-number">0.5</span>
            });

            <span class="hljs-comment">// 页面显示</span>
            <span class="hljs-keyword">this</span>.puzzles = puzzleArr
            <span class="hljs-keyword">this</span>.puzzles.push(<span class="hljs-string">''</span>)
        },

        <span class="hljs-comment">// 点击方块</span>
        moveFn (index) {

            <span class="hljs-comment">// 获取点击位置及其上下左右的值</span>
            let curNum = <span class="hljs-keyword">this</span>.puzzles[index],
                leftNum = <span class="hljs-keyword">this</span>.puzzles[index - <span class="hljs-number">1</span>],
                rightNum = <span class="hljs-keyword">this</span>.puzzles[index + <span class="hljs-number">1</span>],
                topNum = <span class="hljs-keyword">this</span>.puzzles[index - <span class="hljs-number">4</span>],
                bottomNum = <span class="hljs-keyword">this</span>.puzzles[index + <span class="hljs-number">4</span>]

            <span class="hljs-comment">// 和为空的位置交换数值</span>
            <span class="hljs-keyword">if</span> (leftNum === <span class="hljs-string">''</span> &amp;&amp; index % <span class="hljs-number">4</span>) {
                <span class="hljs-keyword">this</span>.puzzles.$<span class="hljs-keyword">set</span>(index - <span class="hljs-number">1</span>, curNum)
                <span class="hljs-keyword">this</span>.puzzles.$<span class="hljs-keyword">set</span>(index, <span class="hljs-string">''</span>)
            } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (rightNum === <span class="hljs-string">''</span> &amp;&amp; <span class="hljs-number">3</span> !== index % <span class="hljs-number">4</span>) {
                <span class="hljs-keyword">this</span>.puzzles.$<span class="hljs-keyword">set</span>(index + <span class="hljs-number">1</span>, curNum)
                <span class="hljs-keyword">this</span>.puzzles.$<span class="hljs-keyword">set</span>(index, <span class="hljs-string">''</span>)
            } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (topNum === <span class="hljs-string">''</span>) {
                <span class="hljs-keyword">this</span>.puzzles.$<span class="hljs-keyword">set</span>(index - <span class="hljs-number">4</span>, curNum)
                <span class="hljs-keyword">this</span>.puzzles.$<span class="hljs-keyword">set</span>(index, <span class="hljs-string">''</span>)
            } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (bottomNum === <span class="hljs-string">''</span>) {
                <span class="hljs-keyword">this</span>.puzzles.$<span class="hljs-keyword">set</span>(index + <span class="hljs-number">4</span>, curNum)
                <span class="hljs-keyword">this</span>.puzzles.$<span class="hljs-keyword">set</span>(index, <span class="hljs-string">''</span>)
            }

            <span class="hljs-keyword">this</span>.passFn()
        },

        <span class="hljs-comment">// 校验是否过关</span>
        passFn () {
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.puzzles[<span class="hljs-number">15</span>] === <span class="hljs-string">''</span>) {
                <span class="hljs-keyword">const</span> newPuzzles = <span class="hljs-keyword">this</span>.puzzles.slice(<span class="hljs-number">0</span>, <span class="hljs-number">15</span>)

                <span class="hljs-keyword">const</span> isPass = newPuzzles.every((e, i) =&gt; e === i + <span class="hljs-number">1</span>)

                <span class="hljs-keyword">if</span> (isPass) {
                    alert (<span class="hljs-string">'恭喜，闯关成功！'</span>)
                }
            }
        }
    },
    ready () {
        <span class="hljs-keyword">this</span>.render()
    }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>我们在moveFn方法里调用了passFn方法来进行检测，而passFn方法里又涉及了两个知识点：<br>（1）slice方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="通过slice方法我们截取数组的前15个元素生成一个新的数组，当然前提是数组随后一个元素为空" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code style="word-break: break-word; white-space: initial;">通过slice方法我们截取数组的前<span class="hljs-number">15</span>个元素生成一个新的数组，当然前提是数组随后一个元素为空</code></pre>
<p>（2）every方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="通过every方法我们来循环截取后数组的每一个元素是否等于其index+1值，如果全部等于则返回true，只要有一个不等于则返回false
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>通过<span class="hljs-keyword">every</span>方法我们来循环截取后数组的每一个元素是否等于其index+<span class="hljs-number">1</span>值，如果全部等于则返回<span class="hljs-literal">true</span>，只要有一个不等于则返回<span class="hljs-literal">false</span>
</code></pre>
<p>如果闯关成功那么isPass的值为true，就会alert "恭喜，闯关成功！"提示窗，如果没有则不提示。</p>
<h2 id="articleHeader6">重置游戏</h2>
<p>重置游戏其实很简单，只需添加重置按钮并在其上调用render方法就行了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div class=&quot;box&quot;>
        <ul class=&quot;puzzle-wrap&quot;>
            <li 
                :class=&quot;{'puzzle': true, 'puzzle-empty': !puzzle}&quot; 
                v-for=&quot;puzzle in puzzles&quot; 
                v-text=&quot;puzzle&quot;
                @click=&quot;moveFn($index)&quot;
            ></li>
        </ul>
        <button class=&quot;btn btn-warning btn-block btn-reset&quot; @click=&quot;render&quot;>重置游戏</button>
    </div>
</template>

<script>
export default {
    data () {
        return {
            puzzles: []
        }
    },
    methods: {

        // 重置渲染
        render () {
            let puzzleArr = [],
                i = 1

            // 生成包含1 ~ 15数字的数组
            for (i; i < 16; i++) {
                puzzleArr.push(i)
            }

            // 随机打乱数组
            puzzleArr = puzzleArr.sort(() => {
                return Math.random() - 0.5
            });

            // 页面显示
            this.puzzles = puzzleArr
            this.puzzles.push('')
        },

        // 点击方块
        moveFn (index) {

            // 获取点击位置及其上下左右的值
            let curNum = this.puzzles[index],
                leftNum = this.puzzles[index - 1],
                rightNum = this.puzzles[index + 1],
                topNum = this.puzzles[index - 4],
                bottomNum = this.puzzles[index + 4]

            // 和为空的位置交换数值
            if (leftNum === '' &amp;&amp; index % 4) {
                this.puzzles.$set(index - 1, curNum)
                this.puzzles.$set(index, '')
            } else if (rightNum === '' &amp;&amp; 3 !== index % 4) {
                this.puzzles.$set(index + 1, curNum)
                this.puzzles.$set(index, '')
            } else if (topNum === '') {
                this.puzzles.$set(index - 4, curNum)
                this.puzzles.$set(index, '')
            } else if (bottomNum === '') {
                this.puzzles.$set(index + 4, curNum)
                this.puzzles.$set(index, '')
            }

            this.passFn()
        },

        // 校验是否过关
        passFn () {
            if (this.puzzles[15] === '') {
                const newPuzzles = this.puzzles.slice(0, 15)

                const isPass = newPuzzles.every((e, i) => e === i + 1)

                if (isPass) {
                    alert ('恭喜，闯关成功！')
                }
            }
        }
    },
    ready () {
        this.render()
    }
}
</script>

<style>
@import url('./assets/css/bootstrap.min.css');

body {
    font-family: Arial, &quot;Microsoft YaHei&quot;; 
}

.box {
    width: 400px;
    margin: 50px auto 0;
}

.puzzle-wrap {
    width: 400px;
    height: 400px;
    margin-bottom: 40px;
    padding: 0;
    background: #ccc;
    list-style: none;
}

.puzzle {
    float: left;
    width: 100px;
    height: 100px;
    font-size: 20px;
    background: #f90;
    text-align: center;
    line-height: 100px;
    border: 1px solid #ccc;
    box-shadow: 1px 1px 4px;
    text-shadow: 1px 1px 1px #B9B4B4;
    cursor: pointer;
}

.puzzle-empty {
    background: #ccc;
    box-shadow: inset 2px 2px 18px;
}

.btn-reset {
    box-shadow: inset 2px 2px 18px;
}
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"puzzle-wrap"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> 
                <span class="hljs-attr">:class</span>=<span class="hljs-string">"{'puzzle': true, 'puzzle-empty': !puzzle}"</span> 
                <span class="hljs-attr">v-for</span>=<span class="hljs-string">"puzzle in puzzles"</span> 
                <span class="hljs-attr">v-text</span>=<span class="hljs-string">"puzzle"</span>
                @<span class="hljs-attr">click</span>=<span class="hljs-string">"moveFn($index)"</span>
            &gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn btn-warning btn-block btn-reset"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"render"</span>&gt;</span>重置游戏<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
export <span class="hljs-keyword">default</span> {
    data () {
        <span class="hljs-keyword">return</span> {
            puzzles: []
        }
    },
    methods: {

        <span class="hljs-comment">// 重置渲染</span>
        render () {
            let puzzleArr = [],
                i = <span class="hljs-number">1</span>

            <span class="hljs-comment">// 生成包含1 ~ 15数字的数组</span>
            <span class="hljs-keyword">for</span> (i; i &lt; <span class="hljs-number">16</span>; i++) {
                puzzleArr.push(i)
            }

            <span class="hljs-comment">// 随机打乱数组</span>
            puzzleArr = puzzleArr.sort(() =&gt; {
                <span class="hljs-keyword">return</span> Math.random() - <span class="hljs-number">0.5</span>
            });

            <span class="hljs-comment">// 页面显示</span>
            <span class="hljs-keyword">this</span>.puzzles = puzzleArr
            <span class="hljs-keyword">this</span>.puzzles.push(<span class="hljs-string">''</span>)
        },

        <span class="hljs-comment">// 点击方块</span>
        moveFn (index) {

            <span class="hljs-comment">// 获取点击位置及其上下左右的值</span>
            let curNum = <span class="hljs-keyword">this</span>.puzzles[index],
                leftNum = <span class="hljs-keyword">this</span>.puzzles[index - <span class="hljs-number">1</span>],
                rightNum = <span class="hljs-keyword">this</span>.puzzles[index + <span class="hljs-number">1</span>],
                topNum = <span class="hljs-keyword">this</span>.puzzles[index - <span class="hljs-number">4</span>],
                bottomNum = <span class="hljs-keyword">this</span>.puzzles[index + <span class="hljs-number">4</span>]

            <span class="hljs-comment">// 和为空的位置交换数值</span>
            <span class="hljs-keyword">if</span> (leftNum === <span class="hljs-string">''</span> &amp;&amp; index % <span class="hljs-number">4</span>) {
                <span class="hljs-keyword">this</span>.puzzles.$<span class="hljs-keyword">set</span>(index - <span class="hljs-number">1</span>, curNum)
                <span class="hljs-keyword">this</span>.puzzles.$<span class="hljs-keyword">set</span>(index, <span class="hljs-string">''</span>)
            } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (rightNum === <span class="hljs-string">''</span> &amp;&amp; <span class="hljs-number">3</span> !== index % <span class="hljs-number">4</span>) {
                <span class="hljs-keyword">this</span>.puzzles.$<span class="hljs-keyword">set</span>(index + <span class="hljs-number">1</span>, curNum)
                <span class="hljs-keyword">this</span>.puzzles.$<span class="hljs-keyword">set</span>(index, <span class="hljs-string">''</span>)
            } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (topNum === <span class="hljs-string">''</span>) {
                <span class="hljs-keyword">this</span>.puzzles.$<span class="hljs-keyword">set</span>(index - <span class="hljs-number">4</span>, curNum)
                <span class="hljs-keyword">this</span>.puzzles.$<span class="hljs-keyword">set</span>(index, <span class="hljs-string">''</span>)
            } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (bottomNum === <span class="hljs-string">''</span>) {
                <span class="hljs-keyword">this</span>.puzzles.$<span class="hljs-keyword">set</span>(index + <span class="hljs-number">4</span>, curNum)
                <span class="hljs-keyword">this</span>.puzzles.$<span class="hljs-keyword">set</span>(index, <span class="hljs-string">''</span>)
            }

            <span class="hljs-keyword">this</span>.passFn()
        },

        <span class="hljs-comment">// 校验是否过关</span>
        passFn () {
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.puzzles[<span class="hljs-number">15</span>] === <span class="hljs-string">''</span>) {
                <span class="hljs-keyword">const</span> newPuzzles = <span class="hljs-keyword">this</span>.puzzles.slice(<span class="hljs-number">0</span>, <span class="hljs-number">15</span>)

                <span class="hljs-keyword">const</span> isPass = newPuzzles.every((e, i) =&gt; e === i + <span class="hljs-number">1</span>)

                <span class="hljs-keyword">if</span> (isPass) {
                    alert (<span class="hljs-string">'恭喜，闯关成功！'</span>)
                }
            }
        }
    },
    ready () {
        <span class="hljs-keyword">this</span>.render()
    }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
@<span class="hljs-keyword">import</span> url(<span class="hljs-string">'./assets/css/bootstrap.min.css'</span>);

<span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">font-family</span>: Arial, <span class="hljs-string">"Microsoft YaHei"</span>; 
}

<span class="hljs-selector-class">.box</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">400px</span>;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">50px</span> auto <span class="hljs-number">0</span>;
}

<span class="hljs-selector-class">.puzzle-wrap</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">400px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">400px</span>;
    <span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">40px</span>;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#ccc</span>;
    <span class="hljs-attribute">list-style</span>: none;
}

<span class="hljs-selector-class">.puzzle</span> {
    <span class="hljs-attribute">float</span>: left;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#f90</span>;
    <span class="hljs-attribute">text-align</span>: center;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#ccc</span>;
    <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">1px</span> <span class="hljs-number">1px</span> <span class="hljs-number">4px</span>;
    <span class="hljs-attribute">text-shadow</span>: <span class="hljs-number">1px</span> <span class="hljs-number">1px</span> <span class="hljs-number">1px</span> <span class="hljs-number">#B9B4B4</span>;
    <span class="hljs-attribute">cursor</span>: pointer;
}

<span class="hljs-selector-class">.puzzle-empty</span> {
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#ccc</span>;
    <span class="hljs-attribute">box-shadow</span>: inset <span class="hljs-number">2px</span> <span class="hljs-number">2px</span> <span class="hljs-number">18px</span>;
}

<span class="hljs-selector-class">.btn-reset</span> {
    <span class="hljs-attribute">box-shadow</span>: inset <span class="hljs-number">2px</span> <span class="hljs-number">2px</span> <span class="hljs-number">18px</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>这里我一并加上了css代码。</p>
<h2 id="articleHeader7">总结</h2>
<blockquote>
<p>其实本游戏的代码量不多，功能点也不是很复杂，不过通过Vue来写这样的游戏，有助于我们了解Vue以数据驱动的响应式原理，在简化代码量的同时也增加了代码的可读性。</p>
<p>本实例的所有源码我已经上传至我的github，地址为<a href="https://github.com/luozhihao/vue-puzzle" rel="nofollow noreferrer" target="_blank"></a><a href="https://github.com/luozhihao/vue-puzzle" rel="nofollow noreferrer" target="_blank">https://github.com/luozhihao/...</a> 需要的童鞋可以自行下载运行。</p>
</blockquote>
<p>本文地址：<a href="https://segmentfault.com/a/1190000006137236"></a><a href="https://segmentfault.com/a/1190000006137236" target="_blank">https://segmentfault.com/a/11...</a><br>博客园：<a href="http://www.cnblogs.com/luozhihao/p/5726661.html" rel="nofollow noreferrer" target="_blank"></a><a href="http://www.cnblogs.com/luozhihao/p/5726661.html" rel="nofollow noreferrer" target="_blank">http://www.cnblogs.com/luozhi...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
利用Vue.js实现拼图游戏

## 原文链接
[https://segmentfault.com/a/1190000006137236](https://segmentfault.com/a/1190000006137236)

