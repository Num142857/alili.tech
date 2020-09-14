---
title: 'vue实现对表格数据的增删改查(CURD)' 
date: 2019-01-09 2:30:12
hidden: true
slug: ewby7mvkjjf
categories: [reprint]
---

{{< raw >}}

                    
<p>原文地址:<a href="https://www.xiabingbao.com/vue/2017/07/10/vue-curd.html" rel="nofollow noreferrer" target="_blank">https://www.xiabingbao.com/vue/2017/07/10/vue-curd.html</a>  </p>
<p>在管理员的一些后台页面里，个人中心里的数据列表里，都会有对这些数据进行增删改查的操作。比如在管理员后台的用户列表里，我们可以录入新用户的信息，也可以对既有的用户信息进行修改。在vue中，我们更应该专注于对数据的操作和处理。  </p>
<p>比如我们有一个这样的页面：  </p>
<p><span class="img-wrap"><img data-src="/img/bVQByB?w=1313&amp;h=422" src="https://static.alili.tech/img/bVQByB?w=1313&amp;h=422" alt="vue实现对表格数据的增删改查(CURD)" title="vue实现对表格数据的增删改查(CURD)" style="cursor: pointer; display: inline;"></span></p>
<p>我们在这个页面里，就实现了增删改查4个功能，点击链接查看demo【<a href="http://www.xiabingbao.com/demo/vue-curd/index.html" rel="nofollow noreferrer" target="_blank">http://www.xiabingbao.com/demo/vue-curd/index.html</a>】。  </p>
<p>我们把这些用户信息保存到<code>list</code>的数组中，然后增删改查就在这个数组上进行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="list: [
    {
        username: 'aaaaa',
        email: '123@qq.com',
        sex: '男',
        province: '北京市',
        hobby: ['篮球', '读书', '编程']
    },
    {
        username: 'bbbbb',
        email: 'bbbbbbb@163.com',
        sex: '女',
        province: '河北省',
        hobby: ['弹琴', '读书', '插画']
    }
    // ...
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">list: [
    {
        <span class="hljs-attr">username</span>: <span class="hljs-string">'aaaaa'</span>,
        <span class="hljs-attr">email</span>: <span class="hljs-string">'123@qq.com'</span>,
        <span class="hljs-attr">sex</span>: <span class="hljs-string">'男'</span>,
        <span class="hljs-attr">province</span>: <span class="hljs-string">'北京市'</span>,
        <span class="hljs-attr">hobby</span>: [<span class="hljs-string">'篮球'</span>, <span class="hljs-string">'读书'</span>, <span class="hljs-string">'编程'</span>]
    },
    {
        <span class="hljs-attr">username</span>: <span class="hljs-string">'bbbbb'</span>,
        <span class="hljs-attr">email</span>: <span class="hljs-string">'bbbbbbb@163.com'</span>,
        <span class="hljs-attr">sex</span>: <span class="hljs-string">'女'</span>,
        <span class="hljs-attr">province</span>: <span class="hljs-string">'河北省'</span>,
        <span class="hljs-attr">hobby</span>: [<span class="hljs-string">'弹琴'</span>, <span class="hljs-string">'读书'</span>, <span class="hljs-string">'插画'</span>]
    }
    <span class="hljs-comment">// ...</span>
]</code></pre>
<p>设置这些数据主要也是复习一下vue对表单的处理操作，这里面的表单有：文本输入框，单选按钮，select选择框，复选框等。</p>
<h3 id="articleHeader0">1. 展示数据</h3>
<p>我们的数据都放在数组<code>list</code>中，但是这里并不直接对list对循环输出，而是先把list中的数据给一个数组<code>slist</code>，对<code>slist</code>进行循环输出。因为我们在后面的<strong>查询</strong>功能中需要对数据进行过滤，数组list一直保存着原始数据（包括新增、修改后或已删除后），而数组slist只负责展示。  </p>
<p>在vue中提供一个<code>setSlist</code>方法，将需要展示的数据给了数组slist：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 获取需要渲染到页面中的数据
setSlist(arr) {
    this.slist = JSON.parse(JSON.stringify(arr));
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 获取需要渲染到页面中的数据</span>
setSlist(arr) {
    <span class="hljs-keyword">this</span>.slist = <span class="hljs-built_in">JSON</span>.parse(<span class="hljs-built_in">JSON</span>.stringify(arr));
}</code></pre>
<p>然后在html中使用<code>v-for</code>把slist数组渲染出来：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<tr v-cloak v-for=&quot;(item, index) of slist&quot;>
    <td>"{{"index+1"}}"</td>
    <td>"{{"item.username"}}"</td>
    <td>"{{"item.email"}}"</td>
    <td>"{{"item.sex"}}"</td>
    <td>"{{"item.province"}}"</td>
    <td>"{{"item.hobby.join(' | ')"}}"</td>
    <td><a href=&quot;javascript:;&quot; @click=&quot;showOverlay(index)&quot;>修改</a> | <a href=&quot;javascript:;&quot; @click=&quot;del(index)&quot;>删除</a></td>
</tr>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">tr</span> <span class="hljs-attr">v-cloak</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(item, index) of slist"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>"{{"index+1"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>"{{"item.username"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>"{{"item.email"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>"{{"item.sex"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>"{{"item.province"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>"{{"item.hobby.join(' | ')"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:;"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"showOverlay(index)"</span>&gt;</span>修改<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span> | <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:;"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"del(index)"</span>&gt;</span>删除<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span></code></pre>
<p>在操作这一栏中，给修改和删除操作绑定上事件。</p>
<h3 id="articleHeader1">2. 增加和删除功能</h3>
<p>把增加功能和删除合并到一起，是这两个功能相对来说都比较简单。  </p>
<p>增加用户时使用<code>push</code>方法，把用户的信息添加到<code>list</code>数组的最后：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.list.push({
    username: 'ffff',
    email: 'fffffff@163.com',
    sex: '女',
    province: '河南省',
    hobby: ['弹琴', '插画']
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">this</span>.list.push({
    <span class="hljs-attr">username</span>: <span class="hljs-string">'ffff'</span>,
    <span class="hljs-attr">email</span>: <span class="hljs-string">'fffffff@163.com'</span>,
    <span class="hljs-attr">sex</span>: <span class="hljs-string">'女'</span>,
    <span class="hljs-attr">province</span>: <span class="hljs-string">'河南省'</span>,
    <span class="hljs-attr">hobby</span>: [<span class="hljs-string">'弹琴'</span>, <span class="hljs-string">'插画'</span>]
});</code></pre>
<p>这样就能添加一位ffff的用户了。  </p>
<p>删除用户时，通过<code>splice(index, 1)</code>，可以删除index位置的数据，页面上的数据自动就会更新。</p>
<h3 id="articleHeader2">3. 修改功能</h3>
<p>当我们想要修改某个元素时，可以把这个位置上的数据取出来放到弹层里（或者其他某个位置），在弹层里的信息可以取消或者修改后进行保存。  </p>
<p>假设我们弹层里的数据是<code>selectedlist</code>，那么每次修改时，把index位置的数据给了selectedlist，然后在弹层中修改selectedlist。我们也能看到修改数据的类型： 文本框（用户名，邮箱），单选按钮（性别），select选择框（所在省份），多选框（爱好），这里我们主要练习的是表单处理（<a href="https://cn.vuejs.org/v2/guide/forms.html" rel="nofollow noreferrer" target="_blank">https://cn.vuejs.org/v2/guide...</a>）。弹层是否显示用变量<code>isActive</code>来控制：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 修改数据
modifyData(index) {
    this.selected = index; // 修改的位置
    this.selectedlist = this.list[index];
    this.isActive = true;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 修改数据</span>
modifyData(index) {
    <span class="hljs-keyword">this</span>.selected = index; <span class="hljs-comment">// 修改的位置</span>
    <span class="hljs-keyword">this</span>.selectedlist = <span class="hljs-keyword">this</span>.list[index];
    <span class="hljs-keyword">this</span>.isActive = <span class="hljs-literal">true</span>;
}</code></pre>
<p>有没有发现一个问题，当修改弹层中的信息时，表格中的数据也同步更新了。可是我们本身是希望当点击保存按钮时，才把弹层中的数据保存到表格里。问题的根源就出在这里：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.selectedlist = this.list[index];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">this</span>.selectedlist = <span class="hljs-keyword">this</span>.list[index];</code></pre>
<p>因为<code>list[index]</code>是个Object类型的数据，若使用<strong>=</strong>赋值，则赋值操作为浅度拷贝（把数据的地址赋值给对应变量，而没有把具体的数据复制给变量，变量会随数据值的变化而变化），selectedlist与list[index]使用相同的数据地址，互相引起数据值的变化。因此这里我们需要进行深度拷贝：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.selectedlist = JSON.parse( JSON.stringify(this.list[index]) ); // 先转换为字符串，然后再转换" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">this</span>.selectedlist = <span class="hljs-built_in">JSON</span>.parse( <span class="hljs-built_in">JSON</span>.stringify(<span class="hljs-keyword">this</span>.list[index]) ); <span class="hljs-comment">// 先转换为字符串，然后再转换</span></code></pre>
<p>当用户修改数据后，selectedlist就会发生变化，点击保存按钮时，将数据重新保存到index位置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*
  this.list 数据数组
  this.selected 刚才修改的位置
  this.selectedlist 需要保存的数据
*/
Vue.set(this.list, this.selected, this.selectedlist);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/*
  this.list 数据数组
  this.selected 刚才修改的位置
  this.selectedlist 需要保存的数据
*/</span>
Vue.set(<span class="hljs-keyword">this</span>.list, <span class="hljs-keyword">this</span>.selected, <span class="hljs-keyword">this</span>.selectedlist);</code></pre>
<h3 id="articleHeader3">4. 查询功能</h3>
<p>在第1小节中我们已经说过，在页面表格中展示的是<code>slist</code>中的数据，就是为了方便执行查询操作：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 获取需要渲染到页面中的数据
setSlist(arr) {
    this.slist = JSON.parse(JSON.stringify(arr));
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 获取需要渲染到页面中的数据</span>
setSlist(arr) {
    <span class="hljs-keyword">this</span>.slist = <span class="hljs-built_in">JSON</span>.parse(<span class="hljs-built_in">JSON</span>.stringify(arr));
}</code></pre>
<p>每次根据某些条件将过滤后的数据赋值给slist数组，展示出查询后的数据。这里我们的查询实现了两个小功能：</p>
<ol>
<li><p>用户在输入某个字符后，自动在输入框下方用列表展示出用户可能要查询的词语（如用户名等）</p></li>
<li><p>同步更新表格中的数据</p></li>
</ol>
<p>这里我们通过用户名和邮箱进行查询，因此在过滤数据时，需要检测用户名和邮箱是否含有查询的单词。我们先给输入框绑定一个input事件，同时用datalist展示用户可能要查询的词语：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input type=&quot;text&quot; placeholder=&quot;search&quot; @input=&quot;search&quot; list=&quot;cars&quot; class=&quot;search&quot;>
<datalist id=&quot;cars&quot;>
    <option v-for=&quot;item in searchlist&quot; :value=&quot;item&quot;></option>
</datalist>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"search"</span> @<span class="hljs-attr">input</span>=<span class="hljs-string">"search"</span> <span class="hljs-attr">list</span>=<span class="hljs-string">"cars"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"search"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">datalist</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"cars"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in searchlist"</span> <span class="hljs-attr">:value</span>=<span class="hljs-string">"item"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">datalist</span>&gt;</span></code></pre>
<p>search功能的实现，<code>searchlist</code>为在输入框下方展示的可能要搜索的词语，<code>ss</code>数组则保存过滤后的数据，当循环完毕后，设置调用<code>setSlist</code>方法修改slist数组：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 搜索
search(e) {
    var v = e.target.value,
        self = this;
    self.searchlist = [];
    if (v) {
        var ss = [];

        // 过滤需要的数据
        this.list.forEach(function (item) {
            // 检测用户名
            if (item.username.indexOf(v) > -1) {
                if (self.searchlist.indexOf(item.username) == -1) {
                    self.searchlist.push(item.username);
                }
                ss.push(item);
            } else if (item.email.indexOf(v) > -1) {
                // 检测邮箱
                if (self.searchlist.indexOf(item.email) == -1) {
                    self.searchlist.push(item.email);
                }
                ss.push(item);
            }
        });
        this.setSlist(ss); // 将过滤后的数据给了slist
    } else {
        // 没有搜索内容，则展示全部数据
        this.setSlist(this.list);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-comment">// 搜索</span>
search(e) {
    <span class="hljs-keyword">var</span> v = e.target.value,
        <span class="hljs-keyword">self</span> = this;
    <span class="hljs-keyword">self</span>.searchlist = [];
    <span class="hljs-keyword">if</span> (v) {
        <span class="hljs-keyword">var</span> ss = [];

        <span class="hljs-comment">// 过滤需要的数据</span>
        this.<span class="hljs-keyword">list</span>.<span class="hljs-keyword">forEach</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(item)</span> </span>{
            <span class="hljs-comment">// 检测用户名</span>
            <span class="hljs-keyword">if</span> (item.username.indexOf(v) &gt; <span class="hljs-number">-1</span>) {
                <span class="hljs-keyword">if</span> (<span class="hljs-keyword">self</span>.searchlist.indexOf(item.username) == <span class="hljs-number">-1</span>) {
                    <span class="hljs-keyword">self</span>.searchlist.push(item.username);
                }
                ss.push(item);
            } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (item.email.indexOf(v) &gt; <span class="hljs-number">-1</span>) {
                <span class="hljs-comment">// 检测邮箱</span>
                <span class="hljs-keyword">if</span> (<span class="hljs-keyword">self</span>.searchlist.indexOf(item.email) == <span class="hljs-number">-1</span>) {
                    <span class="hljs-keyword">self</span>.searchlist.push(item.email);
                }
                ss.push(item);
            }
        });
        this.setSlist(ss); <span class="hljs-comment">// 将过滤后的数据给了slist</span>
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-comment">// 没有搜索内容，则展示全部数据</span>
        this.setSlist(this.<span class="hljs-keyword">list</span>);
    }
}</code></pre>
<p>每当用户输入或者删除一个字符时都会调用search方法，执行查询操作，当用点击展示词语列表时，也会调用search方法。</p>
<h3 id="articleHeader4">5. 将弹层独立为组件</h3>
<p>其实我们应该发现，修改功能（或新增功能）从代码和样式上相对来说比较独立，我们把弹层独立为组件的形式，把需要修改的数据通过<code>props</code>传递给该组件（新增数据时，可以给组件传递一个空数据），当用户点击保存时，再通过<code>$emit</code>给了父组件（子组件不能直接父级的数据，需要用data或者computed生成一个局部变量，然后再使用$emit方法把这个局部数据再传递上去）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 弹层组件 
Vue.component('model', {
    props: ['list', 'isactive'],
    template: `<div class=&quot;overlay&quot; v-show=&quot;isactive&quot;>
                    <div class=&quot;con&quot;>
                        <h2 class=&quot;title&quot;>新增 | 修改</h2>
                        <div class=&quot;content&quot;>
                            /* 省略 */
                        </div>
                    </div>
               </div>`,
    computed: {
        modifylist() {
            return this.list;
        }
    },
    methods: {
        changeActive() {
            this.$emit('change'); // 关闭弹层，修改isactive值
        },
        modify() {
            this.$emit('modify', this.modifylist); // 将修改后的数据传递给父组件
        }
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 弹层组件 </span>
Vue.component(<span class="hljs-string">'model'</span>, {
    <span class="hljs-attr">props</span>: [<span class="hljs-string">'list'</span>, <span class="hljs-string">'isactive'</span>],
    <span class="hljs-attr">template</span>: <span class="hljs-string">`&lt;div class="overlay" v-show="isactive"&gt;
                    &lt;div class="con"&gt;
                        &lt;h2 class="title"&gt;新增 | 修改&lt;/h2&gt;
                        &lt;div class="content"&gt;
                            /* 省略 */
                        &lt;/div&gt;
                    &lt;/div&gt;
               &lt;/div&gt;`</span>,
    <span class="hljs-attr">computed</span>: {
        modifylist() {
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.list;
        }
    },
    <span class="hljs-attr">methods</span>: {
        changeActive() {
            <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'change'</span>); <span class="hljs-comment">// 关闭弹层，修改isactive值</span>
        },
        modify() {
            <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'modify'</span>, <span class="hljs-keyword">this</span>.modifylist); <span class="hljs-comment">// 将修改后的数据传递给父组件</span>
        }
    }
});</code></pre>
<p>父组件，在父组件中截取<code>change</code>和<code>modify</code>事件，再用<code>changeOverlay</code>和<code>modify</code>来实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<model :list='selectedlist' :isactive=&quot;isActive&quot; v-cloak @change=&quot;changeOverlay&quot; @modify=&quot;modify&quot;></model>
<!-- segmengfault -->" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">model</span> <span class="hljs-attr">:list</span>=<span class="hljs-string">'selectedlist'</span> <span class="hljs-attr">:isactive</span>=<span class="hljs-string">"isActive"</span> <span class="hljs-attr">v-cloak</span> @<span class="hljs-attr">change</span>=<span class="hljs-string">"changeOverlay"</span> @<span class="hljs-attr">modify</span>=<span class="hljs-string">"modify"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">model</span>&gt;</span>
<span class="hljs-comment">&lt;!-- segmengfault --&gt;</span></code></pre>
<h3 id="articleHeader5">6. 总结</h3>
<p>洋洋洒洒写了不少，其实里面的难点不太多，主要是form表单方面的操作，再一个就是练习下组件间的数据与事件传递。内容比较简单，欢迎各位批评指正。  </p>
<p>如果你觉得不错，欢迎关注我的公众号：<strong>wenzichel</strong><br><span class="img-wrap"><img data-src="/img/remote/1460000010022524?w=258&amp;h=258" src="https://static.alili.tech/img/remote/1460000010022524?w=258&amp;h=258" alt="wenzichel" title="wenzichel" style="cursor: pointer; display: inline;"></span></p>
<p>原文地址:<a href="https://www.xiabingbao.com/vue/2017/07/10/vue-curd.html" rel="nofollow noreferrer" target="_blank">https://www.xiabingbao.com/vue/2017/07/10/vue-curd.html</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue实现对表格数据的增删改查(CURD)

## 原文链接
[https://segmentfault.com/a/1190000010115096](https://segmentfault.com/a/1190000010115096)

