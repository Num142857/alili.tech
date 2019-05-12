---
title: 'VUE使用element-ui所遇BUG与需求集结（结束更新）' 
date: 2018-12-25 2:30:11
hidden: true
slug: wakrx4uwyh
categories: [reprint]
---

{{< raw >}}

                    
<p>最近常使用<code>element-ui</code>的组件，遇到问题比较多，想做个清单。也包含一些自己总结的使用vue小方法。<span class="img-wrap"><img data-src="/img/bVYAMQ?w=51&amp;h=50" src="https://static.alili.tech/img/bVYAMQ?w=51&amp;h=50" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<blockquote>敲黑板：重点！！以下数据都是在vue(v2.3)+element-ui(v1.4)+webpack(v2.6)+axios(v0.16)+vuex(v2.3)环境下测试。<br>如有改变会说明。</blockquote>
<h2 id="articleHeader0">1.回车自动提交表单</h2>
<blockquote>详情：做列表搜索的时候当表单只有单个输入框时，回车会自动提交表单</blockquote>
<p>issue在此：<a href="https://github.com/ElemeFE/element/issues/3625" rel="nofollow noreferrer" target="_blank">点我点我</a></p>
<p><strong>解决：</strong>（阻止表单提交）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<el-form :inline=&quot;true&quot; :model=&quot;params&quot; @submit.native.prevent>
</el-form>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;el-<span class="hljs-selector-tag">form</span> :inline=<span class="hljs-string">"true"</span> :model=<span class="hljs-string">"params"</span> @submit<span class="hljs-selector-class">.native</span><span class="hljs-selector-class">.prevent</span>&gt;
&lt;/el-form&gt;</code></pre>
<h2 id="articleHeader1">2.监听input回车</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<el-input v-on:keyup.enter.native=&quot;login&quot;></el-input>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">&lt;el-<span class="hljs-selector-tag">input</span> v-on:keyup<span class="hljs-selector-class">.enter</span><span class="hljs-selector-class">.native</span>=<span class="hljs-string">"login"</span>&gt;&lt;/el-input&gt;</code></pre>
<h2 id="articleHeader2">3.tree组件增删改</h2>
<blockquote>树形组件最难搞，尤其遇上各种蛋疼的需求=。= 这次要有增删改的功能，但是发现官网给的例子并不是直接在数据上操作，所以自己修改了一个。</blockquote>
<p>详细地址：<a href="https://segmentfault.com/a/1190000011574698">点我就知道啦</a></p>
<h2 id="articleHeader3">4.table组件expand每次只展开一项</h2>
<blockquote>文档没有具体属性，但是在issue找的方法都是结合<code>row-key</code>和<code>expand-row-keys</code>来实现这个功能</blockquote>
<p>issue地址：<a href="https://github.com/ElemeFE/element/issues/3747" rel="nofollow noreferrer" target="_blank">灵机一现！</a></p>
<p><strong>解决：</strong>但是我在Stack Overflow找了个更简单的方法，要直接操作table树๑乛◡乛๑，只需要用到expand的方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<el-table @expand=&quot;handleExpandRow&quot; ref=&quot;row_table&quot;>
</el-table>
//method:
handleExpandRow(row,expanded){
    this.$refs.row_table.store.states.expandRows = expanded ? [row] : [];
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>&lt;el-<span class="hljs-keyword">table</span> @<span class="hljs-keyword">expand</span>=<span class="hljs-string">"handleExpandRow"</span> ref=<span class="hljs-string">"row_table"</span>&gt;
&lt;/el-<span class="hljs-keyword">table</span>&gt;
<span class="hljs-comment">//method:</span>
handleExpandRow(row,expanded){
    this.<span class="hljs-variable">$refs</span>.row_table.store.states.expandRows = expanded ? [row] : [];
}</code></pre>
<p>附上Stack Overflow原地址：<a href="https://stackoverflow.com/questions/44590918/how-can-i-get-an-element-to-appear-directly-when-i-expand-a-row-using-vue" rel="nofollow noreferrer" target="_blank">大神在此</a><br>————</p>
<p>以上是v1.4版本的，由于v2.0版本修改了返回参数，仿照上例修改了新的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="handleExpandRow(row,expandRows){
    this.$refs.raw_table.store.states.expandRows = expandRows.length !== 0 ? [row] : [];
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>handleExpandRow(<span class="hljs-built_in">row</span>,expandRows){
    this.$refs.raw_table.store.states.expandRows = expandRows.<span class="hljs-built_in">length</span> !== <span class="hljs-number">0</span> ? [<span class="hljs-built_in">row</span>] : [];
}</code></pre>
<h2 id="articleHeader4">5.复用table组件</h2>
<p>项目中表格太多，做了两个之后还是决定写了个复用放组件，而因为需求不断增加修改，所以不断简化，下面只是上个简单版的：<br>详细地址：<a href="https://segmentfault.com/a/1190000012054846">都说点我咯</a></p>
<p>在掘金上看到一篇还不错、也是关于table组件的文章：<a href="https://juejin.im/post/5a100d09f265da4324800807" rel="nofollow noreferrer" target="_blank">掘金地址</a></p>
<h2 id="articleHeader5">6.upload组件自定义filelist</h2>
<blockquote>上传文件用的还是挺多的，就是列表不好控制，尤其是要通过ajax删除等操作，所以还是自己写了一个。也是因为upload上传时有个动态进程用户体验不错，也重新捣鼓了以下。</blockquote>
<p>还是另开了一篇文章，不过基本没难度：<a href="https://segmentfault.com/a/1190000012234747">看这儿这儿</a></p>
<h2 id="articleHeader6">7.数组表单验证</h2>
<blockquote>用<code>v-for</code>循环列表的时候，想给部分值都做个验证，但是<code>el-form</code>只接收<code>object</code>。</blockquote>
<p>其实这个功能在官网是已经给出了（v2.0:<a href="http://element-cn.eleme.io/2.0/#/zh-CN/component/form#dong-tai-zeng-jian-biao-dan-xiang" rel="nofollow noreferrer" target="_blank">原来是你</a>），不过研究了一阵才用了个蠢方法。</p>
<p>假如有个列表：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="list: [{
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
}, {
    date: '2016-05-04',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1517 弄'
}, {
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1519 弄'
}, {
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1516 弄'
}]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-attribute">list</span>: [{
    <span class="hljs-attribute">date</span>: <span class="hljs-string">'2016-05-02'</span>,
    <span class="hljs-attribute">name</span>: <span class="hljs-string">'王小虎'</span>,
    <span class="hljs-attribute">address</span>: <span class="hljs-string">'上海市普陀区金沙江路 1518 弄'</span>
}, {
    <span class="hljs-attribute">date</span>: <span class="hljs-string">'2016-05-04'</span>,
    <span class="hljs-attribute">name</span>: <span class="hljs-string">'王小虎'</span>,
    <span class="hljs-attribute">address</span>: <span class="hljs-string">'上海市普陀区金沙江路 1517 弄'</span>
}, {
    <span class="hljs-attribute">date</span>: <span class="hljs-string">'2016-05-01'</span>,
    <span class="hljs-attribute">name</span>: <span class="hljs-string">'王小虎'</span>,
    <span class="hljs-attribute">address</span>: <span class="hljs-string">'上海市普陀区金沙江路 1519 弄'</span>
}, {
    <span class="hljs-attribute">date</span>: <span class="hljs-string">'2016-05-03'</span>,
    <span class="hljs-attribute">name</span>: <span class="hljs-string">'王小虎'</span>,
    <span class="hljs-attribute">address</span>: <span class="hljs-string">'上海市普陀区金沙江路 1516 弄'</span>
}]</code></pre>
<p>在新增或者修改<code>list</code>之后都要验证<code>name</code>和<code>adress</code>必填</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<el-form ref=&quot;listOption&quot; :rules=&quot;rules&quot; :model=&quot;setForm&quot; size=&quot;small&quot;>
    <ul>
        <li v-for=&quot;(item,i) in setForm.list&quot; :key=&quot;i&quot;>
            <el-form-item>
                <el-input v-model.number=&quot;item.date&quot;></el-input>
            </el-form-item>
            <el-form-item :prop=&quot;'list.' + i + '.name'&quot; :rules=&quot;rules.name&quot;>
                <el-input v-model.number=&quot;item.name&quot;></el-input>
            </el-form-item>
            <el-form-item :prop=&quot;'list.' + i + '.address'&quot; :rules=&quot;rules.address&quot;>
                <el-input v-model.number=&quot;item.address&quot;></el-input>
            </el-form-item>
        </li>
    </ul>
</el-form>
<!-- prop的关键字要相对应，别少了那一点 -->" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">el-form</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"listOption"</span> <span class="hljs-attr">:rules</span>=<span class="hljs-string">"rules"</span> <span class="hljs-attr">:model</span>=<span class="hljs-string">"setForm"</span> <span class="hljs-attr">size</span>=<span class="hljs-string">"small"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(item,i) in setForm.list"</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">"i"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">el-form-item</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">el-input</span> <span class="hljs-attr">v-model.number</span>=<span class="hljs-string">"item.date"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">el-input</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">el-form-item</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">el-form-item</span> <span class="hljs-attr">:prop</span>=<span class="hljs-string">"'list.' + i + '.name'"</span> <span class="hljs-attr">:rules</span>=<span class="hljs-string">"rules.name"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">el-input</span> <span class="hljs-attr">v-model.number</span>=<span class="hljs-string">"item.name"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">el-input</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">el-form-item</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">el-form-item</span> <span class="hljs-attr">:prop</span>=<span class="hljs-string">"'list.' + i + '.address'"</span> <span class="hljs-attr">:rules</span>=<span class="hljs-string">"rules.address"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">el-input</span> <span class="hljs-attr">v-model.number</span>=<span class="hljs-string">"item.address"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">el-input</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">el-form-item</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">el-form</span>&gt;</span>
<span class="hljs-comment">&lt;!-- prop的关键字要相对应，别少了那一点 --&gt;</span></code></pre>
<p>要啥给啥：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="data(){
    return {
        list: [{...}],
        rules: {
            name: [{
                required: true,
                trigger: '请输入姓名'
            }],
            address: [{
                required: true,
                trigger: '请输入地址'
            }]
        }
    }
},
computed: {
    setForm(){
        return {
            name: 'mylist',
            list: this.list
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">data</span>(){
    <span class="hljs-selector-tag">return</span> {
        <span class="hljs-attribute">list</span>: [{...}],
        <span class="hljs-attribute">rules</span>: {
            <span class="hljs-attribute">name</span>: [{
                <span class="hljs-attribute">required</span>: true,
                <span class="hljs-attribute">trigger</span>: <span class="hljs-string">'请输入姓名'</span>
            }],
            <span class="hljs-attribute">address</span>: [{
                <span class="hljs-attribute">required</span>: true,
                <span class="hljs-attribute">trigger</span>: <span class="hljs-string">'请输入地址'</span>
            }]
        }
    }
},
<span class="hljs-attribute">computed</span>: {
    setForm(){
        return {
            <span class="hljs-attribute">name</span>: <span class="hljs-string">'mylist'</span>,
            <span class="hljs-attribute">list</span>: this.list
        }
    }
}</code></pre>
<hr>
<blockquote><strong>从Tab 8开始升级使用element-ui（v2.0.9）</strong></blockquote>
<hr>
<h2 id="articleHeader7">8.转换emoji表情</h2>
<blockquote>例如用户的昵称使用了emoji表情，后台返回的数据<code>:rose:</code>，要转换成一朵玫瑰花。</blockquote>
<p>使用<a href="https://github.com/emojione/emojify.js" rel="nofollow noreferrer" target="_blank">emojify插件</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install emojify.js --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install </span>emojify.<span class="hljs-keyword">js </span>--save</code></pre>
<p>vue main.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Emojify from 'emojify.js'
// import 'emojify.js/dist/css/basic/emojify.min.css'//单个图
import 'emojify.js/dist/css/sprites/emojify.min.css'//雪碧图
Emojify.setConfig({
    mode: 'sprite',
})//设置emojify为雪碧图模式，更多的设置可参考插件" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> Emojify <span class="hljs-keyword">from</span> <span class="hljs-string">'emojify.js'</span>
<span class="hljs-comment">// import 'emojify.js/dist/css/basic/emojify.min.css'//单个图</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'emojify.js/dist/css/sprites/emojify.min.css'</span><span class="hljs-comment">//雪碧图</span>
Emojify.setConfig({
    mode: <span class="hljs-string">'sprite'</span>,
})<span class="hljs-comment">//设置emojify为雪碧图模式，更多的设置可参考插件</span></code></pre>
<p>正式引用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.prototype.$emoji = Emojify;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elm"><code style="word-break: break-word; white-space: initial;"><span class="hljs-type">Vue</span>.proto<span class="hljs-keyword">type</span>.$emoji = <span class="hljs-type">Emojify</span>;</code></pre>
<p>由于输出的是<code>img</code>/<code>span</code>标签，所以用<code>v-html</code>，但是不支持<code>filter</code>，只能写个<code>method</code>了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<span v-html=&quot;Emojify(scope.row.name)&quot;></span>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-html</span>=<span class="hljs-string">"Emojify(scope.row.name)"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Emojify(code){
    let that = this;
    return code.replace(/\:\w+\:/g,function(str){
        return that.$emoji.replace(str)
    })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>Emojify(code){
    <span class="hljs-keyword">let</span> that = <span class="hljs-keyword">this</span>;
    <span class="hljs-keyword">return</span> code.replace(<span class="hljs-regexp">/\:\w+\:/g</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">str</span>)</span>{
        <span class="hljs-keyword">return</span> that.$emoji.replace(str)
    })
}</code></pre>
<h2 id="articleHeader8">9.百度富文本Ueditor</h2>
<blockquote>做这个功能的时候遇到不少问题，尤其是图片上传。不过此处都简略，参考了不少前人的文档，大同小异。</blockquote>
<p>到 <a href="http://ueditor.baidu.com/website/" rel="nofollow noreferrer" target="_blank">官网</a> 下载对应服务器的压缩包，在<code>index.html</code>引入js文件（静态资源放在<code>static</code>文件夹）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <script src=&quot;/static/Ueditor/ueditor.config.js&quot;></script>
    <script src=&quot;/static/Ueditor/ueditor.all.min.js&quot;></script>
    <script src=&quot;/static/Ueditor/lang/zh-cn/zh-cn.js&quot;></script>
    <script src=&quot;/static/Ueditor/ueditor.parse.min.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"/static/Ueditor/ueditor.config.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"/static/Ueditor/ueditor.all.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"/static/Ueditor/lang/zh-cn/zh-cn.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"/static/Ueditor/ueditor.parse.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>写个组件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div class=&quot;ueditor&quot; ref=&quot;rowUEditor&quot;>
    <script id=&quot;editor&quot; type=&quot;text/plain&quot;></script>
  </div>
</template>
<script>
export default {
    name: 'ueditor',
    data() {
        return {
            editor: null
        }
    },
    props: {
        defaultMsg: {//文本内容
            type: String
        },
        config: {//单独设置
            type: Object,
        }
    },
    computed: {
        DefaultConfig() {//默认设置
            let obj = this.config
            let serverUrl = this.$store.state.baseURL + '/sys/ueditor/exec.act'//服务器地址
            return {
                serverUrl,
                ...obj
            }
        }
    },
    mounted() {
        this.initUEditor()
    },
    methods: {
        initUEditor() {
            const that = this;
            this.editor = UE.getEditor('editor', this.DefaultConfig); // 初始化UE
            this.editor.addListener(&quot;ready&quot;, function() {
                if (that.defaultMsg == null) {
                    that.editor.setContent('');
                } else {
                    that.editor.setContent(that.defaultMsg);
                }
            });
            this.editor.addListener(&quot;contentChange&quot;, function() { //监听内容变化
                that.getUEContent();
            })
        },
        getUEContent() { // 获取内容方法
            let content = this.editor.getContent();
            this.$emit(&quot;getUEContent&quot;, content)
        }
    },
    destroyed() {//退出后销毁
        this.editor.destroy();
    }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ueditor"</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"rowUEditor"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"editor"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/plain"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'ueditor'</span>,
    data() {
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">editor</span>: <span class="hljs-literal">null</span>
        }
    },
    <span class="hljs-attr">props</span>: {
        <span class="hljs-attr">defaultMsg</span>: {<span class="hljs-comment">//文本内容</span>
            type: <span class="hljs-built_in">String</span>
        },
        <span class="hljs-attr">config</span>: {<span class="hljs-comment">//单独设置</span>
            type: <span class="hljs-built_in">Object</span>,
        }
    },
    <span class="hljs-attr">computed</span>: {
        DefaultConfig() {<span class="hljs-comment">//默认设置</span>
            <span class="hljs-keyword">let</span> obj = <span class="hljs-keyword">this</span>.config
            <span class="hljs-keyword">let</span> serverUrl = <span class="hljs-keyword">this</span>.$store.state.baseURL + <span class="hljs-string">'/sys/ueditor/exec.act'</span><span class="hljs-comment">//服务器地址</span>
            <span class="hljs-keyword">return</span> {
                serverUrl,
                ...obj
            }
        }
    },
    mounted() {
        <span class="hljs-keyword">this</span>.initUEditor()
    },
    <span class="hljs-attr">methods</span>: {
        initUEditor() {
            <span class="hljs-keyword">const</span> that = <span class="hljs-keyword">this</span>;
            <span class="hljs-keyword">this</span>.editor = UE.getEditor(<span class="hljs-string">'editor'</span>, <span class="hljs-keyword">this</span>.DefaultConfig); <span class="hljs-comment">// 初始化UE</span>
            <span class="hljs-keyword">this</span>.editor.addListener(<span class="hljs-string">"ready"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                <span class="hljs-keyword">if</span> (that.defaultMsg == <span class="hljs-literal">null</span>) {
                    that.editor.setContent(<span class="hljs-string">''</span>);
                } <span class="hljs-keyword">else</span> {
                    that.editor.setContent(that.defaultMsg);
                }
            });
            <span class="hljs-keyword">this</span>.editor.addListener(<span class="hljs-string">"contentChange"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-comment">//监听内容变化</span>
                that.getUEContent();
            })
        },
        getUEContent() { <span class="hljs-comment">// 获取内容方法</span>
            <span class="hljs-keyword">let</span> content = <span class="hljs-keyword">this</span>.editor.getContent();
            <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">"getUEContent"</span>, content)
        }
    },
    destroyed() {<span class="hljs-comment">//退出后销毁</span>
        <span class="hljs-keyword">this</span>.editor.destroy();
    }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>然后就可以单独拎出来用了，只需要提供设置和默认文本就好</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<sl-editor ref=&quot;ueditor&quot; 
v-if=&quot;editor.config.isShow&quot; 
:defaultMsg=&quot;content&quot; 
:config=&quot;editor.config&quot;
@getUEContent=&quot;getUEContent&quot;></sl-editor>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ruby"><code>&lt;sl-editor ref=<span class="hljs-string">"ueditor"</span> 
v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"editor.config.isShow"</span> 
<span class="hljs-symbol">:defaultMsg=<span class="hljs-string">"content"</span></span> 
<span class="hljs-symbol">:config=<span class="hljs-string">"editor.config"</span></span>
@getUEContent=<span class="hljs-string">"getUEContent"</span>&gt;&lt;<span class="hljs-regexp">/sl-editor&gt;</span></code></pre>
<p>data:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="data(){
    return {
        editor: {
            msg: '',
            config: {
                autoHeightEnabled: false,
                initialFrameHeight: 300,//高度
                zIndex: 5,//层级
                isShow: false,//是否显示编辑器
            }
        },
        content: 'hello world'
    }
},
methods: {
    getUEContent(content){
        this.content = content;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">data</span><span class="hljs-params">()</span></span>{
    return {
        editor: {
            msg: <span class="hljs-string">''</span>,
            config: {
                autoHeightEnabled: false,
                initialFrameHeight: <span class="hljs-number">300</span>,<span class="hljs-comment">//高度</span>
                zIndex: <span class="hljs-number">5</span>,<span class="hljs-comment">//层级</span>
                isShow: false,<span class="hljs-comment">//是否显示编辑器</span>
            }
        },
        <span class="hljs-attribute">content</span>: <span class="hljs-string">'hello world'</span>
    }
},
methods: {
    getUEContent(<span class="hljs-attribute">content</span>){
        this<span class="hljs-selector-class">.content</span> = <span class="hljs-attribute">content</span>;
    }
}</code></pre>
<p>过程中遇到几个问题<br>1.由于是放在<code>form</code>下，<code>el-form-item</code>有个默认<code>line-height:40px</code>会让工具栏变形，所以要加个样式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".ueditor{
  line-height:normal;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.ueditor</span>{
  <span class="hljs-attribute">line-height</span>:normal;
}</code></pre>
<p>2.添加内容是默认<code>p</code>标签，显示相关内容时体验不好被运营投诉了→_→ 然后改用<code>div</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="getUEContent(){
    let content = this.editor.getContent();
    content = content.replace(/<p([\s\S]*?)<\/p>/g,&quot;<div$1</div>&quot;)
    this.$emit(&quot;getUEContent&quot;,content)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>getUEContent(){
    <span class="hljs-built_in">let</span> <span class="hljs-built_in">content</span> = this.editor.getContent();
    <span class="hljs-built_in">content</span> = <span class="hljs-built_in">content</span>.replace(/&lt;p([\s\S]*?)&lt;\/p&gt;/g,<span class="hljs-string">"&lt;div$1&lt;/div&gt;"</span>)
    this.$emit(<span class="hljs-string">"getUEContent"</span>,<span class="hljs-built_in">content</span>)
}</code></pre>
<p>3.如果页面出现滚动条，编辑器进入编辑状态后，再往上滚动，工具栏也会跟着往上跑，脱离文本框。看☟☟☟<br><span class="img-wrap"><img data-src="/img/bV3HTx?w=933&amp;h=311" src="https://static.alili.tech/img/bV3HTx?w=933&amp;h=311" alt="正常的工具栏" title="正常的工具栏" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/bV3HTY?w=931&amp;h=356" src="https://static.alili.tech/img/bV3HTY?w=931&amp;h=356" alt="猫饼工具栏" title="猫饼工具栏" style="cursor: pointer;"></span></p>
<p>然而在google搜了半天没找到解决办法，倒回去看文档_(:_」∠)_<br>果然，精髓都浓缩在文档中</p>
<p><span class="img-wrap"><img data-src="/img/bV3HUS?w=659&amp;h=40" src="https://static.alili.tech/img/bV3HUS?w=659&amp;h=40" alt="修复工具栏" title="修复工具栏" style="cursor: pointer;"></span></p>
<p>所以在<code>DefaultConfig</code>加个默认设置就好了<code>autoFloatEnabled: false</code></p>
<p>github：<a href="https://github.com/xiaoniezi/vue-ueditor" rel="nofollow noreferrer" target="_blank">戳戳戳</a>（附上一个修改单图上传功能后的<code>ueditor</code>文件，不知道为啥用原本的不行）</p>
<h2 id="articleHeader9">10.axios报错后重新请求</h2>
<p>如题，请求数据报错时再请求一次=。= 这是个猫饼，不是都尽量避免重复请求，怎么还有这么野蛮的需求……anyway，找到个梯子</p>
<p><a href="http://www.itomtan.com/2017/10/17/vue-axios-timeout-retry-callback/#" rel="nofollow noreferrer" target="_blank">使劲戳不戳不知道</a></p>
<h2 id="articleHeader10">更新项</h2>
<p>———— 2017.12.12 ————</p>
<ol>
<li>[修改]Tab 4.table组件expand每次只展开一项</li>
<li>[新增]Tab 7.数组表单验证</li>
</ol>
<p>———— 2018.01.22 ————</p>
<ol><li>[新增]Tab 8.转换emoji表情</li></ol>
<p>———— 2018.02.09 ————</p>
<ol>
<li>[新增]Tab 9.百度富文本Ueditor</li>
<li>[新增]Tab 10.axios报错后重新请求</li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
VUE使用element-ui所遇BUG与需求集结（结束更新）

## 原文链接
[https://segmentfault.com/a/1190000012046845](https://segmentfault.com/a/1190000012046845)

