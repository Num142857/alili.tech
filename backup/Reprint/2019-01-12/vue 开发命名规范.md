---
title: 'vue 开发命名规范' 
date: 2019-01-12 2:30:24
hidden: true
slug: zvafwd763s
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">views 命名</h2>
<p>views 文件夹下面是由 以页面为单位的 vue 文件 或者 模块文件夹 组成的，放在 src 目录之下，与 components、assets 同级。</p>
<h3 id="articleHeader1">views 下的文件夹命名</h3>
<ol>
<li><p>views 下面的文件夹代表着模块的名字</p></li>
<li><p>由名词组成（car、order、cart）</p></li>
<li><p>单词只能有一个（good: car order cart）（bad: carInfo carpage）</p></li>
<li><p>尽量是名词（good: car）（bad: greet good）</p></li>
<li><p>以小写开头（good: car）（bad: Car）</p></li>
</ol>
<h3 id="articleHeader2">views 下的 vue 文件命名</h3>
<ol>
<li><p>views 下面的 vue 文件代表着页面的名字</p></li>
<li><p>放在模块文件夹之下</p></li>
<li><p>只有一个文件的情况下不会出现文件夹，而是直接放在 views 目录下面，如 Login Home</p></li>
<li><p>尽量是名词</p></li>
<li><p>大写开头，开头的单词就是所属模块名字（CarDetail、CarEdit、CarList）</p></li>
<li><p>名字至少两个单词（good: CarDetail）（bad: Car）</p></li>
<li><p>常用结尾单词有（Detail、Edit、List、Info、Report）</p></li>
<li><p>以 Item 结尾的代表着组件（CarListItem、CarInfoItem）</p></li>
</ol>
<h2 id="articleHeader3">vue 方法命名</h2>
<h3 id="articleHeader4">vue 方法放置顺序</h3>
<ol>
<li><p>components</p></li>
<li><p>props</p></li>
<li><p>data</p></li>
<li><p>created</p></li>
<li><p>mounted</p></li>
<li><p>activited</p></li>
<li><p>update</p></li>
<li><p>beforeRouteUpdate</p></li>
<li><p>metods</p></li>
<li><p>filter</p></li>
<li><p>computed</p></li>
<li><p>watch</p></li>
</ol>
<h3 id="articleHeader5">method 自定义方法命名</h3>
<ol>
<li><p>动宾短语（good：jumpPage、openCarInfoDialog）（bad：go、nextPage、show、open、login）</p></li>
<li><p>ajax 方法以 get、post 开头，以 data 结尾（good：getListData、postFormData）（bad：takeData、confirmData、getList、postForm）</p></li>
<li><p>事件方法以 on 开头（onTypeChange、onUsernameInput）</p></li>
<li><p>init、refresh 单词除外</p></li>
<li><p>尽量使用常用单词开头（set、get、open、close、jump）</p></li>
<li><p>驼峰命名（good: getListData）（bad: get_list_data、getlistData）</p></li>
</ol>
<h3 id="articleHeader6">data props 方法注意点</h3>
<ol>
<li><p>使用 data 里的变量时请先在 data 里面初始化</p></li>
<li><p>props 指定类型，也就是 type</p></li>
<li><p>props 改变父组件数据 基础类型用 $emit ，复杂类型直接改</p></li>
<li><p>ajax 请求数据用上 isLoading、isError 变量</p></li>
<li><p>不命名多余数据，现在是详情页、你的数据是 ajax 请求的，那就直接声明一个对象叫 d，而不是每个字段都声明</p></li>
<li><p>表单数据请包裹一层 form</p></li>
</ol>
<h3 id="articleHeader7">生命周期方法注意点</h3>
<ol>
<li><p>不在 mounted、created 之类的方法写逻辑，取 ajax 数据，</p></li>
<li><p>在 created 里面监听 Bus 事件</p></li>
</ol>
<h2 id="articleHeader8">例</h2>
<h3 id="articleHeader9">文件路径</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="src
    assets
        ...
    components
        ...
    views
        car
            CarEdit.vue
            CarList.vue
            CarDetai.vue
        user
            UserDetail.vue
            UserEdit.vue
            UserPasswordRest.vue
        customer
            CustomerCardItem.vue
            CustomerList.vue
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>src
    assets
        ...
    components
        ...
    views
        car
            CarEdit<span class="hljs-selector-class">.vue</span>
            CarList<span class="hljs-selector-class">.vue</span>
            CarDetai<span class="hljs-selector-class">.vue</span>
        user
            UserDetail<span class="hljs-selector-class">.vue</span>
            UserEdit<span class="hljs-selector-class">.vue</span>
            UserPasswordRest<span class="hljs-selector-class">.vue</span>
        customer
            CustomerCardItem<span class="hljs-selector-class">.vue</span>
            CustomerList<span class="hljs-selector-class">.vue</span>
</code></pre>
<h3 id="articleHeader10">日常列表页</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// CarList.vue
<template>
    <div class=&quot;container&quot;>
        <ul>
            <li v-for=&quot;car in carList&quot; :key=&quot;car.id&quot;>
                <img src=&quot;car.logo&quot; alt=&quot;&quot;>
                <p>"{{"car.name | empty"}}"</p>
            </li>
        </ul>
        <button @click=&quot;loadNextPage&quot;>下一页</button>
        <div class=&quot;last&quot; v-show=&quot;isLast&quot;>已经没有更多了...</div>
        <div class=&quot;loading&quot; v-show=&quot;isLoading&quot;>正在加载...</div>
        <div class=&quot;error&quot; v-show=&quot;isError&quot; @click=&quot;getCarListData&quot;>加载错误，点击 <span class=&quot;font-blue&quot;>这里</span> 重试</div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                carList: [],
                totalPage: 1, // 总页数
                page: 0, // 当前页数
                isLoading: false, // 是否正在加载
                isError: false // 是否加载错误
            }
        },
        mounted() {
            this.loadNextPage();
        },
        methods: {
            // 获取列表数据
            getCarListData() {
                let data = {
                    page: this.page, // 当前页数
                    pageSize: 10 // 每页条数 
                }

                this.isLoading = true;
                this.isError = false;
                this.$ajaxGet('/car/list', data).then(data => {
                    // 加载成功
                    this.carList.concat(data.list);
                    this.page = data.page;
                    this.totalPage = data.totalPage
                    
                    this.isLoading = false;
                }).catch(() => {
                     //  加载列表失败
                    this.isLoading = false;
                    this.isError = true;
                });
            },
            // 下一页
            loadNextPage() {
                if(this.page <= this.totalPage) {
                    this.page ++;
                    this.getCarListData();
                }
            }
        },
        filters: {
            empty(value) {
                return value || '未知';
            }
        },
        computed: {
            // 是否是最后一条
            isLast() {
                return !this.isLoading &amp;&amp; this.carList.length > 10 &amp;&amp; !this.isError &amp;&amp; this.page >= this.totalPage;
            }
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">// CarList.vue</span>
&lt;template&gt;
    &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span>="<span class="hljs-title">container</span>"&gt;</span>
        &lt;ul&gt;
            &lt;li v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"car in carList"</span> :key=<span class="hljs-string">"car.id"</span>&gt;
                &lt;img src=<span class="hljs-string">"car.logo"</span> alt=<span class="hljs-string">""</span>&gt;
                &lt;p&gt;"{{"car.name | empty"}}"&lt;/p&gt;
            &lt;/li&gt;
        &lt;/ul&gt;
        &lt;button <span class="hljs-meta">@click</span>=<span class="hljs-string">"loadNextPage"</span>&gt;下一页&lt;/button&gt;
        &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span>="<span class="hljs-title">last</span>" <span class="hljs-title">v</span>-<span class="hljs-title">show</span>="<span class="hljs-title">isLast</span>"&gt;已经没有更多了...&lt;<span class="hljs-type">/div</span>&gt;</span>
        &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span>="<span class="hljs-title">loading</span>" <span class="hljs-title">v</span>-<span class="hljs-title">show</span>="<span class="hljs-title">isLoading</span>"&gt;正在加载...&lt;<span class="hljs-type">/div</span>&gt;</span>
        &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span>="<span class="hljs-title">error</span>" <span class="hljs-title">v</span>-<span class="hljs-title">show</span>="<span class="hljs-title">isError</span>" <span class="hljs-meta">@click</span>="<span class="hljs-title">getCarListData</span>"&gt;加载错误，点击 &lt;<span class="hljs-type">span class="font-blue"</span>&gt;这里&lt;<span class="hljs-type">/span</span>&gt; 重试&lt;<span class="hljs-type">/div</span>&gt;</span>
    &lt;/div&gt;
&lt;/template&gt;
&lt;script&gt;
    export <span class="hljs-keyword">default</span> {
        <span class="hljs-keyword">data</span>() {
            <span class="hljs-keyword">return</span> {
                carList: [],
                totalPage: <span class="hljs-number">1</span>, <span class="hljs-comment">// 总页数</span>
                page: <span class="hljs-number">0</span>, <span class="hljs-comment">// 当前页数</span>
                isLoading: <span class="hljs-literal">false</span>, <span class="hljs-comment">// 是否正在加载</span>
                isError: <span class="hljs-literal">false</span> <span class="hljs-comment">// 是否加载错误</span>
            }
        },
        mounted() {
            <span class="hljs-keyword">this</span>.loadNextPage();
        },
        methods: {
            <span class="hljs-comment">// 获取列表数据</span>
            getCarListData() {
                let <span class="hljs-keyword">data</span> = {
                    page: <span class="hljs-keyword">this</span>.page, <span class="hljs-comment">// 当前页数</span>
                    pageSize: <span class="hljs-number">10</span> <span class="hljs-comment">// 每页条数 </span>
                }

                <span class="hljs-keyword">this</span>.isLoading = <span class="hljs-literal">true</span>;
                <span class="hljs-keyword">this</span>.isError = <span class="hljs-literal">false</span>;
                <span class="hljs-keyword">this</span>.$ajaxGet(<span class="hljs-string">'/car/list'</span>, <span class="hljs-keyword">data</span>).then(<span class="hljs-keyword">data</span> =&gt; {
                    <span class="hljs-comment">// 加载成功</span>
                    <span class="hljs-keyword">this</span>.carList.concat(<span class="hljs-keyword">data</span>.list);
                    <span class="hljs-keyword">this</span>.page = <span class="hljs-keyword">data</span>.page;
                    <span class="hljs-keyword">this</span>.totalPage = <span class="hljs-keyword">data</span>.totalPage
                    
                    <span class="hljs-keyword">this</span>.isLoading = <span class="hljs-literal">false</span>;
                }).<span class="hljs-keyword">catch</span>(() =&gt; {
                     <span class="hljs-comment">//  加载列表失败</span>
                    <span class="hljs-keyword">this</span>.isLoading = <span class="hljs-literal">false</span>;
                    <span class="hljs-keyword">this</span>.isError = <span class="hljs-literal">true</span>;
                });
            },
            <span class="hljs-comment">// 下一页</span>
            loadNextPage() {
                <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.page &lt;= <span class="hljs-keyword">this</span>.totalPage) {
                    <span class="hljs-keyword">this</span>.page ++;
                    <span class="hljs-keyword">this</span>.getCarListData();
                }
            }
        },
        filters: {
            empty(value) {
                <span class="hljs-keyword">return</span> value || <span class="hljs-string">'未知'</span>;
            }
        },
        computed: {
            <span class="hljs-comment">// 是否是最后一条</span>
            isLast() {
                <span class="hljs-keyword">return</span> !<span class="hljs-keyword">this</span>.isLoading &amp;&amp; <span class="hljs-keyword">this</span>.carList.length &gt; <span class="hljs-number">10</span> &amp;&amp; !<span class="hljs-keyword">this</span>.isError &amp;&amp; <span class="hljs-keyword">this</span>.page &gt;= <span class="hljs-keyword">this</span>.totalPage;
            }
        }
    }
&lt;/script&gt;</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue 开发命名规范

## 原文链接
[https://segmentfault.com/a/1190000009805187](https://segmentfault.com/a/1190000009805187)

