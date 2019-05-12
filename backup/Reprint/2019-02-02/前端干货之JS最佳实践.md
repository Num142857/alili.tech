---
title: '前端干货之JS最佳实践' 
date: 2019-02-02 2:30:11
hidden: true
slug: ob79d7rugwi
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>
<a href="https://wdd.js.org/js-best-practices/#/" rel="nofollow noreferrer" target="_blank">持续更新地址</a>  <a href="https://wdd.js.org/js-best-practices/#/" rel="nofollow noreferrer" target="_blank">https://wdd.js.org/js-best-pr...</a>
</blockquote>
<h1 id="articleHeader0">1. 风格</h1>
<p><code>一千个读者有一千个哈姆雷特</code>，每个人都有自己的code style。我也曾为了要不要加分号给同事闹个脸红脖子粗，实际上有必要吗？ 其实JavaScript已经有了比较流行的几个风格</p>
<ul>
<li><a href="https://standardjs.com/readme-zhcn.html" rel="nofollow noreferrer" target="_blank">JavaScript Standard Style </a></li>
<li><a href="https://google.github.io/styleguide/jsguide.html" rel="nofollow noreferrer" target="_blank">Google JavaScript Style Guide</a></li>
<li><a href="https://github.com/airbnb/javascript" rel="nofollow noreferrer" target="_blank">Airbnb JavaScript Style Guide</a></li>
</ul>
<p>我自己使用的是<code>JavaScript Standard Style</code>, 我之所以使用这个，是因为它有一些工具。可以让你写完代码后，一旦保存，就自动帮你把你的风格的代码修正成标准分割，而不是死记硬背应该怎么写。看完这个页面，你就应该立马爱上<a href="https://standardjs.com/readme-zhcn.html" rel="nofollow noreferrer" target="_blank">JavaScript Standard Style </a>, 如果你用vscode, 恰好你有写vue, 你想在.vue文件中使用standard风格，那么你需要看看<a href="https://segmentfault.com/a/1190000012468438">这篇文章</a></p>
<h1 id="articleHeader1">2. 可维护性</h1>
<blockquote>很多时候，我们不是从零开始，开发新代码。而是去维护别人的代码，以他人的工作成果为基础。确保自己的代码可维护，是赠人玫瑰，手留余香的好事。一方面让别人看的舒服，另一方面也防止自己长时间没看过自己的代码，自己都难以理解。</blockquote>
<h2 id="articleHeader2">2.1. 什么是可维护代码</h2>
<p>可维护的代码的一些特征</p>
<ul>
<li>
<code>可理解</code>易于理解代码的用途</li>
<li>
<code>可适应</code>数据的变化，不需要完全重写代码</li>
<li>
<code>可扩展</code>要考虑未来对核心功能的扩展</li>
<li>
<code>可调试</code>给出足够的信息，让调试的时候，确定问题所在</li>
<li>
<code>不可分割</code>函数的功能要单一，功能粒度不可分割，可复用性增强</li>
</ul>
<h2 id="articleHeader3">2.2. 代码约定</h2>
<h3 id="articleHeader4">2.2.1. 可读性</h3>
<ul>
<li>统一的缩进方式</li>
<li>注释</li>
<li>空白行</li>
</ul>
<h4>2.2.1.1. 缩进：</h4>
<ul>
<li>一般使用4个空格</li>
<li>不用制表符的原因是它在不同编辑器里显示效果不同</li>
</ul>
<h4>2.2.1.2. 注释：哪些地方需要注释？</h4>
<ul>
<li>函数和方法</li>
<li>大段代码</li>
<li>复杂的算法</li>
<li>hack</li>
</ul>
<h4>2.2.1.3. 空白行：哪些地方需要空白行？</h4>
<ul>
<li>方法之间</li>
<li>方法里的局部变量和第一个语句之间</li>
<li>单行或者多行注释</li>
<li>方法内衣个逻辑单元之间</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Good
if (wl &amp;&amp; wl.length) {

    for (i = 0, l = wl.length; i < l; ++i) {
        p = wl[i];
        type = Y.Lang.type(r[p]);
        
        if (s.hasOwnProperty(p)) {
        
            if (merge &amp;&amp; type == 'object') {
                Y.mix(r[p], s[p]);
            } else if (ov || !(p in r)) {
                r[p] = s[p];
            }
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>// Good
<span class="hljs-keyword">if</span> (wl &amp;&amp; wl.length) {

    <span class="hljs-keyword">for</span> (i = <span class="hljs-number">0</span>, l = wl.length; i &lt; l; ++i) {
        p = wl[i];
        <span class="hljs-keyword">type</span> <span class="hljs-type">= </span>Y.Lang.<span class="hljs-keyword">type</span>(r[p]);
        
        <span class="hljs-keyword">if</span> (s.hasOwnProperty(p)) {
        
            <span class="hljs-keyword">if</span> (merge &amp;&amp; <span class="hljs-keyword">type</span> <span class="hljs-type">== </span><span class="hljs-symbol">'object</span>') {
                Y.mix(r[p], s[p]);
            } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (ov || !(p <span class="hljs-keyword">in</span> r)) {
                r[p] = s[p];
            }
        }
    }
}</code></pre>
<h3 id="articleHeader5">2.2.2. 变量名和函数名</h3>
<blockquote>There are only two hard problem in Computer Science cache invalidation and naming things.---Phil Karlton</blockquote>
<ul>
<li>驼峰式命名</li>
<li>变量名以名词开头</li>
<li>方法名以动词开头</li>
<li>常量全部大写</li>
<li>构造函数以大写字母开头</li>
<li>jQuery对象以"$"符号开头</li>
<li>自定义事件处理函数以“on”开头</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Good
var count = 10;
var myName = &quot;wdd&quot;;
var found = true;

// Bad: Easily confused with functions
var getCount = 10;
var isFound = true;

// Good
function getName() {
    return myName;
}

// Bad: Easily confused with variable
function theName() {
    return myName;
}

// Bad:
var btnOfSubmit = $('#submit');

// Good:
var $btnOfSubmit = $('#submit');

// Bad:给App添加一个处理聊天事件的函数，一般都是和websocket服务端推送消息相关
App.addMethod('createChat',function(res){
    App.log(res);
});
// Bad: 此处调用,这里很容易误以为这个函数是处理创建聊天的逻辑函数
App.createChat();

// Good: 
App.addMethod('onCreateChat',function(res){
    App.log(res);
});
// Good：此处调用
App.onCreateChat();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// Good</span>
<span class="hljs-keyword">var</span> count = <span class="hljs-number">10</span>;
<span class="hljs-keyword">var</span> myName = <span class="hljs-string">"wdd"</span>;
<span class="hljs-keyword">var</span> found = <span class="hljs-literal">true</span>;

<span class="hljs-comment">// Bad: Easily confused with functions</span>
<span class="hljs-keyword">var</span> getCount = <span class="hljs-number">10</span>;
<span class="hljs-keyword">var</span> isFound = <span class="hljs-literal">true</span>;

<span class="hljs-comment">// Good</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getName</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> myName;
}

<span class="hljs-comment">// Bad: Easily confused with variable</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">theName</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> myName;
}

<span class="hljs-comment">// Bad:</span>
<span class="hljs-keyword">var</span> btnOfSubmit = $(<span class="hljs-string">'#submit'</span>);

<span class="hljs-comment">// Good:</span>
<span class="hljs-keyword">var</span> $btnOfSubmit = $(<span class="hljs-string">'#submit'</span>);

<span class="hljs-comment">// Bad:给App添加一个处理聊天事件的函数，一般都是和websocket服务端推送消息相关</span>
App.addMethod(<span class="hljs-string">'createChat'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res</span>)</span>{
    App.log(res);
});
<span class="hljs-comment">// Bad: 此处调用,这里很容易误以为这个函数是处理创建聊天的逻辑函数</span>
App.createChat();

<span class="hljs-comment">// Good: </span>
App.addMethod(<span class="hljs-string">'onCreateChat'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res</span>)</span>{
    App.log(res);
});
<span class="hljs-comment">// Good：此处调用</span>
App.onCreateChat();</code></pre>
<blockquote>变量命名不仅仅是一种科学，更是一种艺术。总之，要短小精悍，见名知意。有些名词可以反应出变量的类型。</blockquote>
<h4>2.2.2.1. <code>变量名</code>
</h4>
<table>
<thead><tr>
<th>名词</th>
<th>数据类型含义</th>
</tr></thead>
<tbody>
<tr>
<td>count, length,size</td>
<td>数值</td>
</tr>
<tr>
<td>name, title,message</td>
<td>字符串</td>
</tr>
<tr>
<td>i, j, k</td>
<td>用来循环</td>
</tr>
<tr>
<td>car,person,student,user</td>
<td>对象</td>
</tr>
<tr>
<td>success,fail</td>
<td>布尔值</td>
</tr>
<tr>
<td>payload</td>
<td>post数据的请求体</td>
</tr>
<tr>
<td>method</td>
<td>请求方式</td>
</tr>
</tbody>
</table>
<h4>2.2.2.2. <code>函数名</code>
</h4>
<table>
<thead><tr>
<th>动词</th>
<th>含义</th>
</tr></thead>
<tbody>
<tr>
<td>can</td>
<td>Function returns a boolean</td>
</tr>
<tr>
<td>has</td>
<td>Function returns a boolean</td>
</tr>
<tr>
<td>is</td>
<td>Function returns a boolean</td>
</tr>
<tr>
<td>get</td>
<td>Function returns a nonboolean</td>
</tr>
<tr>
<td>set</td>
<td>　Function is used to save a value</td>
</tr>
</tbody>
</table>
<h4>2.2.2.3. <code>一些与函数名搭配的常用动词</code>
</h4>
<table>
<thead><tr>
<th>动词</th>
<th>用法</th>
</tr></thead>
<tbody>
<tr>
<td>send</td>
<td>发送</td>
</tr>
<tr>
<td>resend</td>
<td>重发</td>
</tr>
<tr>
<td>validate</td>
<td>验证</td>
</tr>
<tr>
<td>query</td>
<td>查询</td>
</tr>
<tr>
<td>create</td>
<td>创建</td>
</tr>
<tr>
<td>add</td>
<td>添加</td>
</tr>
<tr>
<td>delete</td>
<td>删除</td>
</tr>
<tr>
<td>remove</td>
<td>移除</td>
</tr>
<tr>
<td>insert</td>
<td>插入</td>
</tr>
<tr>
<td>update</td>
<td>更新，编辑</td>
</tr>
<tr>
<td>copy</td>
<td>复制</td>
</tr>
<tr>
<td>render</td>
<td>渲染</td>
</tr>
<tr>
<td>close</td>
<td>关闭</td>
</tr>
<tr>
<td>open</td>
<td>开启</td>
</tr>
<tr>
<td>clear</td>
<td>清除</td>
</tr>
<tr>
<td>edit</td>
<td>编辑</td>
</tr>
<tr>
<td>query</td>
<td>查询</td>
</tr>
<tr>
<td>on</td>
<td>当事件发生</td>
</tr>
<tr>
<td>list</td>
<td>渲染一个列表，如用户列表renderUsersList()</td>
</tr>
<tr>
<td>content</td>
<td>渲染内容，如用户详情的页面 renderUserContent()</td>
</tr>
</tbody>
</table>
<h4>2.2.2.4. <code>接口常用的动词</code>
</h4>
<p>对于http请求的最常用的四种方法，get,post,put,delete，有一些常用的名词与其对应</p>
<table>
<thead><tr>
<th>含义</th>
<th>请求方法</th>
<th>词语</th>
<th>栗子</th>
</tr></thead>
<tbody>
<tr>
<td>增加</td>
<td>post</td>
<td>create</td>
<td>createUser,createCall</td>
</tr>
<tr>
<td>删除</td>
<td>delete</td>
<td>delete</td>
<td>deleteUser</td>
</tr>
<tr>
<td>修改</td>
<td>put</td>
<td>update</td>
<td>updateUser,updateProfile</td>
</tr>
<tr>
<td>查询</td>
<td>get</td>
<td>get,query</td>
<td>getUser,queryUser(无条件查询使用get，有条件查询使用query)</td>
</tr>
</tbody>
</table>
<h4>2.2.2.5. <code>学会使用单复数命名函数</code>
</h4>
<table>
<thead><tr>
<th>函数名</th>
<th>含义</th>
</tr></thead>
<tbody>
<tr>
<td>getUser()</td>
<td>获取一个用户，一般是通过唯一的id来获取</td>
</tr>
<tr>
<td>getUsers()</td>
<td>获取一组用户，一般是通过一些条件来获取</td>
</tr>
<tr>
<td>createUser()</td>
<td>创建一个用户</td>
</tr>
<tr>
<td>createUsers()</td>
<td>创建一组用户</td>
</tr>
</tbody>
</table>
<h4>2.2.2.6. <code>常量</code>
</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var MAX_COUNT = 10;
var URL = &quot;http://www.nczonline.net/&quot;;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code>var MAX_COUNT = <span class="hljs-number">10</span><span class="hljs-comment">;</span>
var URL = <span class="hljs-string">"http://www.nczonline.net/"</span><span class="hljs-comment">;</span></code></pre>
<h4>2.2.2.7. <code>构造函数</code>
</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Good
function Person(name) {
    this.name = name;
}
Person.prototype.sayName = function() {
    alert(this.name);
};
var me = new Person(&quot;wdd&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">// Good</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span><span class="hljs-params">(name)</span> </span>{
    <span class="hljs-keyword">this</span>.name = name;
}
Person.prototype.sayName = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
    alert(<span class="hljs-keyword">this</span>.name);
};
<span class="hljs-keyword">var</span> me = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">"wdd"</span>);</code></pre>
<h4>2.2.2.8. <code>底层http请求接口函数</code>
</h4>
<ul><li>建议使用“_”开头，例如App._getUsers();而对于接口函数的封装，例如App.getUsers(),内部逻辑调用App._getUsers();</li></ul>
<h3 id="articleHeader6">2.2.3. 文件名</h3>
<ul>
<li>全部使用小写字母</li>
<li>单词之间的间隔使用“-”</li>
</ul>
<p>eg：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app-main.js
app-event.js
app-user-manger.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>app-main<span class="hljs-selector-class">.js</span>
app-event<span class="hljs-selector-class">.js</span>
app-user-manger.js</code></pre>
<h3 id="articleHeader7">2.2.4. 文件归类</h3>
<p>自己写的js文件最好和引用的一些第三方js分别放置在不同的文件夹下。</p>
<h3 id="articleHeader8">2.2.5. 千万别用alert</h3>
<p><code>alert的缺点</code></p>
<ul>
<li>如果你用alert来显示提醒消息，那么用户除了点击alert上的的确定按钮外，就只能点击上面的关闭，或者选择禁止再选择对话框，除此以外什么都不能操作。</li>
<li>有些浏览器如果禁止了alert的选项，那么你的alert是不会显示的</li>
<li>如果你在try catch语句里使用alert，那么console里将不会输出错误信息，你都没办法查看错误的详细原因，以及储出错的位置。</li>
</ul>
<p><code>更优雅的提醒方式</code></p>
<ul>
<li>console.log() 普通提示消息</li>
<li>console.error() 错误提示消息</li>
<li>console.info() 信息提示消息</li>
<li>console.warn() 警告提示消息</li>
</ul>
<h2 id="articleHeader9">2.3. 松散耦合</h2>
<ul>
<li>html文件中尽可能避免写js语句</li>
<li>尽量避免在js更改某个css类的属性，而使用更改类的方法</li>
<li>不要在css中写js的表达式</li>
<li>解耦应用逻辑和事件处理程序</li>
</ul>
<h3 id="articleHeader10">2.3.1. 将应用逻辑和事件处理程序的解耦</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//一般事件订阅的写法，以jQuery的写法为栗子
$(document).on('click','#btn-get-users',function(event){
    event.stopPropagation();
    
    //下面的省略号表示执行获取所有用于并显示在页面上的逻辑
    // Bad
    ...
    ...
    ...
    //
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//一般事件订阅的写法，以jQuery的写法为栗子</span>
$(<span class="hljs-built_in">document</span>).on(<span class="hljs-string">'click'</span>,<span class="hljs-string">'#btn-get-users'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>)</span>{
    event.stopPropagation();
    
    <span class="hljs-comment">//下面的省略号表示执行获取所有用于并显示在页面上的逻辑</span>
    <span class="hljs-comment">// Bad</span>
    ...
    ...
    ...
    <span class="hljs-comment">//</span>
});</code></pre>
<p>如果增加了需求，当点击另外一个按钮的时候，也要执行获取所有用户并显示在页面上，那么上面省略的代码又要复制一份。如果接口有改动，那么需要在两个不同的地方都要修改。<br>所以，应该这样。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(document).on('click','#btn-get-users',function(event){
    event.stopPropagation();
    
    //将应用逻辑分离在其他个函数中
    // Good
    App.getUsers();
    App.renderUsers();
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>$(<span class="hljs-built_in">document</span>).on(<span class="hljs-string">'click'</span>,<span class="hljs-string">'#btn-get-users'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>)</span>{
    event.stopPropagation();
    
    <span class="hljs-comment">//将应用逻辑分离在其他个函数中</span>
    <span class="hljs-comment">// Good</span>
    App.getUsers();
    App.renderUsers();
});</code></pre>
<h3 id="articleHeader11">2.3.2. 松散解耦规则</h3>
<ul>
<li>不要将event对象传给其他方法，只传递来自event对象中的某些数据</li>
<li>任何事件处理程序都应该只处理事件，然后把处理转交给应用逻辑。</li>
</ul>
<h3 id="articleHeader12">2.3.3. 将异步请求和数据处理解耦</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Bad
ReqApi.tenant.queryUsers({},function(res){
    if(!res.success){
        console.error(res);
        return;
    }
    
    //对数据的处理
    ...
    ...
    ...
});    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// Bad</span>
ReqApi.tenant.queryUsers({},<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res</span>)</span>{
    <span class="hljs-keyword">if</span>(!res.success){
        <span class="hljs-built_in">console</span>.error(res);
        <span class="hljs-keyword">return</span>;
    }
    
    <span class="hljs-comment">//对数据的处理</span>
    ...
    ...
    ...
});    </code></pre>
<p>上面代码对数据的处理直接写死在异步请求里面，如果换了一个请求，但是数据处理方式是一样的，那么又要复制一遍数据处理的代码。最好的方式是将数据处理模块化成为一个函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Good
ReqApi.tenant.queryUsers({},function(res){
    if(!res.success){
        console.error(res);
        return;
    }
    
    //对数据的处理
    App.renderUsers(res.data);
}); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// Good</span>
ReqApi.tenant.queryUsers({},<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res</span>)</span>{
    <span class="hljs-keyword">if</span>(!res.success){
        <span class="hljs-built_in">console</span>.error(res);
        <span class="hljs-keyword">return</span>;
    }
    
    <span class="hljs-comment">//对数据的处理</span>
    App.renderUsers(res.data);
}); </code></pre>
<p><strong>异步请求只处理请求，不处理数据。函数的功能要专一，功能粒度不可分割。</strong></p>
<h3 id="articleHeader13">2.3.4. 不要将某个变量写死在函数中，尽量使用参数传递进来</h3>
<p>如果你需要一个函数去验证输入框是否是空，如下。这种方式就会绑定死了这个只能验证id为test的输入框，换成其他的就不行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
function checkInputIsEmpty(){
    var value = $('#test').val();
    if(value){
        return true;
    }
    else{
        return false;
    }
}

// good 
function isEmptyInput(id){
    var value = $('#'+id).val();
    if(value){
        return true;
    }
    else{
        return false;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// bad</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkInputIsEmpty</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> value = $(<span class="hljs-string">'#test'</span>).val();
    <span class="hljs-keyword">if</span>(value){
        <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
    }
    <span class="hljs-keyword">else</span>{
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    }
}

<span class="hljs-comment">// good </span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isEmptyInput</span>(<span class="hljs-params">id</span>)</span>{
    <span class="hljs-keyword">var</span> value = $(<span class="hljs-string">'#'</span>+id).val();
    <span class="hljs-keyword">if</span>(value){
        <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
    }
    <span class="hljs-keyword">else</span>{
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    }
}</code></pre>
<h2 id="articleHeader14">2.4. 编程实践</h2>
<h3 id="articleHeader15">2.4.1. 尊总对象所有权</h3>
<p>javascript动态性质是的几乎任何东西在任何时间都能更改，这样就很容易覆写了一些默认的方法。导致一些灾难性的后果。<code>如果你不负责或者维护某个对象，那么你就不能对它进行修改。</code></p>
<ul>
<li>不要为实例或原型添加属性</li>
<li>不要为实例或者原型添加方法</li>
<li>不要重定义存已存在的方法</li>
</ul>
<h3 id="articleHeader16">2.4.2. 避免全局变量</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Bad 两个全局变量
var name = &quot;wdd&quot;;
funtion getName(){
    console.log(name);
}

// Good 一个全局变量
var App = {
    name:&quot;wdd&quot;,
    sayName:funtion(){
        console.log(this.name);//如果这个函数当做回调数使用，这个this可能指向window,
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code><span class="hljs-comment">// Bad 两个全局变量</span>
var <span class="hljs-built_in">name</span> = <span class="hljs-string">"wdd"</span>;
funtion getName(){
    console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">name</span>);
}

<span class="hljs-comment">// Good 一个全局变量</span>
var App = {
    <span class="hljs-built_in">name</span>:<span class="hljs-string">"wdd"</span>,
    sayName:funtion(){
        console.<span class="hljs-built_in">log</span>(this.<span class="hljs-built_in">name</span>);<span class="hljs-comment">//如果这个函数当做回调数使用，这个this可能指向window,</span>
    }
};</code></pre>
<p>单一的全局变量便是命名空间的概念，例如雅虎的YUI,jQuery的$等。</p>
<h3 id="articleHeader17">2.4.3. 避免与null进行比较</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="funtion sortArray(values){
    // 避免
    if(values != null){
        values.sort(comparator);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>funtion sortArray(<span class="hljs-built_in">values</span>){
    // 避免
    <span class="hljs-keyword">if</span>(<span class="hljs-built_in">values</span> != null){
        <span class="hljs-built_in">values</span>.<span class="hljs-built_in">sort</span>(comparator);
    }
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function sortArray(values){
    // 推荐
    if(values instanceof Array){
        values.sort(compartor);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sortArray</span>(<span class="hljs-params">values</span>)</span>{
    <span class="hljs-comment">// 推荐</span>
    <span class="hljs-keyword">if</span>(values <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Array</span>){
        values.sort(compartor);
    }
}</code></pre>
<h4>2.4.3.1. 与null进行比较的代码，可以用以下技术进行替换</h4>
<ul>
<li>如果值是一个应用类型，使用<strong>instanceof</strong>操作符，检查其构造函数</li>
<li>如果值是基本类型，使用<strong>typeof</strong>检查其类型</li>
<li>如果是希望对象包含某个特定的方法名，则只用<strong>typeof</strong>操作符确保指定名字的方法存在于对象上。</li>
</ul>
<p><code>代码中与null比较越少，就越容易确定代码的目的，消除不必要的错误。</code></p>
<h3 id="articleHeader18">2.4.4. 从代码中分离配置文件</h3>
<p>配置数据是一些硬代码(hardcoded)，看下面的栗子</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function validate(value){
    if(!value){
        alert('Invalid value');
        location.href = '/errors/invalid.php';
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">validate</span><span class="hljs-params">(value)</span></span>{
    <span class="hljs-keyword">if</span>(!value){
        alert(<span class="hljs-string">'Invalid value'</span>);
        location.href = <span class="hljs-string">'/errors/invalid.php'</span>;
    }
}</code></pre>
<p>上面代码里有两个配置数据，一个是UI字符串('Invalid value'),另一个是一个Url('/error/invalid.php')。如果你把他们写死在代码里，那么如果当你需要修改这些地方的时候，那么你必须一处一处的检查并修改，而且还可能会遗漏。</p>
<h4>2.4.4.1. 所以第一步是要区分，哪些代码应该写成配置文件的形式？</h4>
<ul>
<li>显示在UI元素中的字符串</li>
<li>URL</li>
<li>一些重复的唯一值</li>
<li>一些设置变量</li>
<li>任何可能改变的值</li>
</ul>
<h4>2.4.4.2. 一些例子</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Config = {
    &quot;MSG_INVALID_VALUE&quot;:&quot;Invalid value&quot;,
    &quot;URL_INVALID&quot;:&quot;/errors/invalid.php&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> Config = {
    <span class="hljs-string">"MSG_INVALID_VALUE"</span>:<span class="hljs-string">"Invalid value"</span>,
    <span class="hljs-string">"URL_INVALID"</span>:<span class="hljs-string">"/errors/invalid.php"</span>
}</code></pre>
<h3 id="articleHeader19">2.4.5. 调试信息开关</h3>
<p>在开发过程中，可能随处留下几个<strong>console.log</strong>,或者<strong>alert</strong>语句，这些语句在开发过程中是很有价值的。但是项目一旦进入生产环境，过多的console.log可能影响到浏览器的运行效率，过多的alert会降低程序的用户体验。而我们最好不要在进入生产环境前，一处一处像扫雷一样删除或者注释掉这些调试语句。</p>
<p><code>最好的方式是设置一个开关。</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//全局命令空间
var App = {
    debug:true,
    log:function(msg){
        if(debug){
            console.log(msg);
        }
    },
    alert:function(msg){
        if(debug){
            alert(msg);
        }
    }
};

//使用
App.log('获取用户信息成功');
App.alert('密码不匹配');

//关闭日志输出与alert
App.debug = false;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//全局命令空间</span>
<span class="hljs-keyword">var</span> App = {
    <span class="hljs-attr">debug</span>:<span class="hljs-literal">true</span>,
    <span class="hljs-attr">log</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">msg</span>)</span>{
        <span class="hljs-keyword">if</span>(debug){
            <span class="hljs-built_in">console</span>.log(msg);
        }
    },
    <span class="hljs-attr">alert</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">msg</span>)</span>{
        <span class="hljs-keyword">if</span>(debug){
            alert(msg);
        }
    }
};

<span class="hljs-comment">//使用</span>
App.log(<span class="hljs-string">'获取用户信息成功'</span>);
App.alert(<span class="hljs-string">'密码不匹配'</span>);

<span class="hljs-comment">//关闭日志输出与alert</span>
App.debug = <span class="hljs-literal">false</span>;</code></pre>
<h3 id="articleHeader20">2.4.6. 使用jQuery Promise</h3>
<p>没使用promise之前的回调函数写法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad：没使用promise之前的回调函数写法
function sendRequest(req,successCallback,errorCallback){
    var inputData = req.data || {};
    inputData = JSON.stringify(inputData);
    $.ajax({
        url:req.base+req.destination,
        type:req.type || &quot;get&quot;,
        headers:{
            sessionId:session.id
        },
        data:inputData,
        dataType:&quot;json&quot;,
        contentType : 'application/json; charset=UTF-8',
        success:function(data){
            successCallback(data);
        },
        error:function(data){
            console.error(data);
            errorCallback(data);
        }
    });
}

//调用
sendRequest(req,function(res){
    ...
},function(res){
    ...
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// bad：没使用promise之前的回调函数写法</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sendRequest</span>(<span class="hljs-params">req,successCallback,errorCallback</span>)</span>{
    <span class="hljs-keyword">var</span> inputData = req.data || {};
    inputData = <span class="hljs-built_in">JSON</span>.stringify(inputData);
    $.ajax({
        <span class="hljs-attr">url</span>:req.base+req.destination,
        <span class="hljs-attr">type</span>:req.type || <span class="hljs-string">"get"</span>,
        <span class="hljs-attr">headers</span>:{
            <span class="hljs-attr">sessionId</span>:session.id
        },
        <span class="hljs-attr">data</span>:inputData,
        <span class="hljs-attr">dataType</span>:<span class="hljs-string">"json"</span>,
        <span class="hljs-attr">contentType</span> : <span class="hljs-string">'application/json; charset=UTF-8'</span>,
        <span class="hljs-attr">success</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
            successCallback(data);
        },
        <span class="hljs-attr">error</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
            <span class="hljs-built_in">console</span>.error(data);
            errorCallback(data);
        }
    });
}

<span class="hljs-comment">//调用</span>
sendRequest(req,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res</span>)</span>{
    ...
},<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res</span>)</span>{
    ...
});</code></pre>
<p>使用promise之后</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function sendRequest(req){
    var dfd = $.Deferred();
    var inputData = req.data || {};
    inputData = JSON.stringify(inputData);
    $.ajax({
        url:req.base+req.destination,
        type:req.type || &quot;get&quot;,
        headers:{
            sessionId:session.id
        },
        data:inputData,
        dataType:&quot;json&quot;,
        contentType : 'application/json; charset=UTF-8',
        success:function(data){
            dfd.resolve(data);
        },
        error:function(data){
            dfd.reject(data);
        }
    });
    
    return dfd.promise();
}

//调用
sendRequest(req)
.done(function(){
    //请求成功
    ...
})
.fail(function(){
    //请求失败
    ...
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sendRequest</span>(<span class="hljs-params">req</span>)</span>{
    <span class="hljs-keyword">var</span> dfd = $.Deferred();
    <span class="hljs-keyword">var</span> inputData = req.data || {};
    inputData = <span class="hljs-built_in">JSON</span>.stringify(inputData);
    $.ajax({
        <span class="hljs-attr">url</span>:req.base+req.destination,
        <span class="hljs-attr">type</span>:req.type || <span class="hljs-string">"get"</span>,
        <span class="hljs-attr">headers</span>:{
            <span class="hljs-attr">sessionId</span>:session.id
        },
        <span class="hljs-attr">data</span>:inputData,
        <span class="hljs-attr">dataType</span>:<span class="hljs-string">"json"</span>,
        <span class="hljs-attr">contentType</span> : <span class="hljs-string">'application/json; charset=UTF-8'</span>,
        <span class="hljs-attr">success</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
            dfd.resolve(data);
        },
        <span class="hljs-attr">error</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
            dfd.reject(data);
        }
    });
    
    <span class="hljs-keyword">return</span> dfd.promise();
}

<span class="hljs-comment">//调用</span>
sendRequest(req)
.done(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-comment">//请求成功</span>
    ...
})
.fail(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-comment">//请求失败</span>
    ...
});</code></pre>
<h3 id="articleHeader21">2.4.7. 显示错误提醒，不要给后端接口背锅</h3>
<p>假如前端要去接口获取用户信息并显示出来，如果你的请求格式是正确的，但是接口返回400以上的错误，你必须通过提醒来告知测试，这个错误是接口的返回错误，而不是前端的逻辑错误。</p>
<h3 id="articleHeader22">2.4.8. REST化接口请求</h3>
<blockquote>对资源的操作包括获取、创建、修改和删除资源，这些操作正好对应HTTP协议提供的GET、POST、PUT和DELETE方法。</blockquote>
<p><code>对应方式</code></p>
<table>
<thead><tr>
<th>请求类型</th>
<th>接口前缀</th>
</tr></thead>
<tbody>
<tr>
<td>GET</td>
<td>.get,</td>
</tr>
<tr>
<td>POST</td>
<td>.create 或者 .get</td>
</tr>
<tr>
<td>PUT</td>
<td>.update</td>
</tr>
<tr>
<td>DELETE</td>
<td>.delete</td>
</tr>
</tbody>
</table>
<p><code>说明</code></p>
<ul><li>有些接口虽然是获取某一个资源，但是它使用的却是POST请求，所以建议使用.get比较好</li></ul>
<p>示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 与用户相关的接口
App.api.user = {};

// 获取一个用户: 一般来说是一个指定的Id，例如userId
App.api.user.getUser = function(){
    ...
};

// 获取一组用户: 一般来说是一些条件，获取条件下的用户，筛选符合条件的用户
App.api.user.getUsers = function(){
    ...
};

// 创建一个用户
App.api.user.createUser = function(){
    
};

// 创建一组用户
App.api.user.createUsers = function(){
    
};

// 更新一个用户
App.api.user.updateUser = function(){
    
};

// 更新一组用户
App.api.user.updateUsers = function(){
    
};

// 更新一个用户
App.api.user.updateUser = function(){
    
};

// 更新一组用户
App.api.user.updateUsers = function(){
    
};

// 删除一个用户
App.api.user.deleteUser = function(){
    
};

// 删除一组用户
App.api.user.deleteUsers = function(){
    
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">// 与用户相关的接口</span>
App.api.user = {};

<span class="hljs-comment">// 获取一个用户: 一般来说是一个指定的Id，例如userId</span>
App.api.user.getUser = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    ...
};

<span class="hljs-comment">// 获取一组用户: 一般来说是一些条件，获取条件下的用户，筛选符合条件的用户</span>
App.api.user.getUsers = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    ...
};

<span class="hljs-comment">// 创建一个用户</span>
App.api.user.createUser = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    
};

<span class="hljs-comment">// 创建一组用户</span>
App.api.user.createUsers = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    
};

<span class="hljs-comment">// 更新一个用户</span>
App.api.user.updateUser = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    
};

<span class="hljs-comment">// 更新一组用户</span>
App.api.user.updateUsers = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    
};

<span class="hljs-comment">// 更新一个用户</span>
App.api.user.updateUser = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    
};

<span class="hljs-comment">// 更新一组用户</span>
App.api.user.updateUsers = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    
};

<span class="hljs-comment">// 删除一个用户</span>
App.api.user.deleteUser = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    
};

<span class="hljs-comment">// 删除一组用户</span>
App.api.user.deleteUsers = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    
};</code></pre>
<h1 id="articleHeader23">3. 性能</h1>
<h2 id="articleHeader24">3.1. 注意作用域</h2>
<ul>
<li>避免全局查找</li>
<li>避免with语句</li>
</ul>
<h2 id="articleHeader25">3.2. 选择正确的方法</h2>
<ul>
<li>
<p>优化循环</p>
<ul>
<li>
<code>减值迭代</code>：从最大值开始，在循环中不断减值的迭代器更加高效</li>
<li>
<code>简化终止条件</code>：由于每次循环过程都会计算终止条件，所以必须保证它尽可能快。也就是避免其他属性查找</li>
<li>
<code>简化循环体</code>：由于循环体是执行最多的，所以要确保其最大限度地优化。</li>
</ul>
</li>
<li>展开循环</li>
<li>避免双重解释：</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// **Bad** 某些代码求值
eval(&quot;alert('hello')&quot;);

// **Bad** 创建新函数
var sayHi = new Function(&quot;alert('hello')&quot;);

// **Bad** 设置超时
setTimeout(&quot;alert('hello')&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-comment">// **Bad** 某些代码求值</span>
<span class="hljs-keyword">eval</span>(<span class="hljs-string">"alert('hello')"</span>);

<span class="hljs-comment">// **Bad** 创建新函数</span>
<span class="hljs-keyword">var</span> sayHi = <span class="hljs-keyword">new</span> <span class="hljs-function"><span class="hljs-keyword">Function</span><span class="hljs-params">(<span class="hljs-string">"alert('hello')"</span>)</span></span>;

<span class="hljs-comment">// **Bad** 设置超时</span>
setTimeout(<span class="hljs-string">"alert('hello')"</span>);</code></pre>
<ul><li>
<p>性能的其他注意事项</p>
<ul>
<li>原生方法较快</li>
<li>switch语句较快：可以适当的替换ifelse语句<code>case 的分支不要超过128条</code>
</li>
<li>位运算符较快</li>
</ul>
</li></ul>
<h2 id="articleHeader26">3.3. 最小化语句数</h2>
<h3 id="articleHeader27">3.3.1. 多个变量声明(<code>废弃</code>)</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 方式1：Bad
var count = 5;
var name = 'wdd';
var sex = 'male';
var age = 10;

// 方式2：Good
var count = 5,
    name = 'wdd',
    sex = 'male',
    age = 10;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-comment">// 方式1：Bad</span>
<span class="hljs-keyword">var</span> count = <span class="hljs-number">5</span>;
<span class="hljs-keyword">var</span> <span class="hljs-keyword">name</span> = <span class="hljs-string">'wdd'</span>;
<span class="hljs-keyword">var</span> sex = <span class="hljs-string">'male'</span>;
<span class="hljs-keyword">var</span> age = <span class="hljs-number">10</span>;

<span class="hljs-comment">// 方式2：Good</span>
<span class="hljs-keyword">var</span> count = <span class="hljs-number">5</span>,
    <span class="hljs-keyword">name</span> = <span class="hljs-string">'wdd'</span>,
    sex = <span class="hljs-string">'male'</span>,
    age = <span class="hljs-number">10</span>;</code></pre>
<p><code>2017-03-07 理论上方式2可能要比方式1性能高一点。但是我在实际使用中，这个快一点几乎是没什么感受的。就像你无法感受到小草的生长一样。反而可读性更为重要。所以，每行最好只定义一个变量，并且每行都有一个var,并用分号结尾。</code></p>
<h3 id="articleHeader28">3.3.2. 插入迭代值</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Good
var name = values[i++];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-comment">// Good</span>
<span class="hljs-keyword">var</span> <span class="hljs-keyword">name</span> = values[i++];</code></pre>
<h3 id="articleHeader29">3.3.3. 使用数组和对象字面量</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Good
var values = ['a','b','c'];

var person = {
    name:'wdd',
    age:10
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">// Good</span>
<span class="hljs-keyword">var</span> values = [<span class="hljs-string">'a'</span>,<span class="hljs-string">'b'</span>,<span class="hljs-string">'c'</span>];

<span class="hljs-keyword">var</span> person = {
    name:<span class="hljs-string">'wdd'</span>,
    age:<span class="hljs-number">10</span>
};</code></pre>
<p><code>只要有可能，尽量使用数组和对象字面量的表达式来消除不必要的语句</code></p>
<h2 id="articleHeader30">3.4. 优化DOM交互</h2>
<blockquote>在JavaScript各个方面中，DOM无疑是最慢的一部分。DOM操作与交互要消耗大量的时间。因为他们往往需要重新渲染整个页面或者某一部分。进一步说，看似细微的操作也可能花很久来执行。因为DOM要处理非常多的信息。理解如何优化与DOM的交互可以极大的提高脚本完成的速度。</blockquote>
<ul>
<li>使用dom缓存技术</li>
<li>最小化现场更新</li>
<li>使用innerHTML插入大段html</li>
<li>使用事件代理</li>
</ul>
<h3 id="articleHeader31">3.4.1. Dom缓存技术</h3>
<p>调用频率非常高的dom查找，可以将DOM缓存在于一个变量中</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 最简单的dom缓存

var domCache = {};

function myGetElement(tag){
    return domCache[tag] = domCache[tag] || $(tag);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 最简单的dom缓存</span>

<span class="hljs-keyword">var</span> domCache = {};

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">myGetElement</span>(<span class="hljs-params">tag</span>)</span>{
    <span class="hljs-keyword">return</span> domCache[tag] = domCache[tag] || $(tag);
}</code></pre>
<h2 id="articleHeader32">3.5. 避免过长的属性查找，设置一个快捷方式</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 先看下面的极端情况
app.user.mother.parent.home.name = 'wdd'
app.user.mother.parent.home.adderess = '上海'
app.user.mother.parent.home.weather = '晴天'

// 更优雅的方式
var home = app.user.mother.parent.home;
home.name = 'wdd';
home.address = '上海',
home.weather = '晴天'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-comment">// 先看下面的极端情况</span>
app.user.mother.parent.<span class="hljs-built_in">home</span>.name = <span class="hljs-string">'wdd'</span>
app.user.mother.parent.<span class="hljs-built_in">home</span>.adderess = <span class="hljs-string">'上海'</span>
app.user.mother.parent.<span class="hljs-built_in">home</span>.weather = <span class="hljs-string">'晴天'</span>

<span class="hljs-comment">// 更优雅的方式</span>
var <span class="hljs-built_in">home</span> = app.user.mother.parent.<span class="hljs-built_in">home</span>;
<span class="hljs-built_in">home</span>.name = <span class="hljs-string">'wdd'</span>;
<span class="hljs-built_in">home</span>.address = <span class="hljs-string">'上海'</span>,
<span class="hljs-built_in">home</span>.weather = <span class="hljs-string">'晴天'</span></code></pre>
<p><code>注意</code><br>使用上面的方式是有前提的，必须保证app.user.mather.parent.home是一个对象，因为对象是传递的引用。如果他的类型是一个基本类型，例如：number,string,boolean，那么复制操作仅仅是值传递，新定义的home的改变，并不会影响到app.user.mather.parent.home的改变。</p>
<h1 id="articleHeader33">4. 快捷方式</h1>
<h2 id="articleHeader34">4.1. 字符串转数字</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="+'4.1' === 4.1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code style="word-break: break-word; white-space: initial;">+'<span class="hljs-number">4.1</span>' === <span class="hljs-number">4.1</span></code></pre>
<h2 id="articleHeader35">4.2. 数字转字符</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="4.1+'' === '4.1'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-number">4.1</span>+<span class="hljs-string">''</span> === <span class="hljs-string">'4.1'</span></code></pre>
<h2 id="articleHeader36">4.3. 字符串取整</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'4.99' | 0 === 4" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code style="word-break: break-word; white-space: initial;">'<span class="hljs-number">4.99</span>' | <span class="hljs-number">0</span> === <span class="hljs-number">4</span></code></pre>
<h1 id="articleHeader37">5. 通用编码原则</h1>
<p>建议读者自行扩展</p>
<ul>
<li><code>DRY(dont't repeat yoursele: 不要重复你自己)</code></li>
<li><code>高内聚低耦合</code></li>
<li><code>开放闭合</code></li>
<li><code>最小意外</code></li>
<li><code>单一职责(single responsibility)</code></li>
</ul>
<h1 id="articleHeader38">6. 高级技巧</h1>
<h2 id="articleHeader39">6.1. 安全类型检测</h2>
<ul>
<li>javascript内置类型检测并不可靠</li>
<li>safari某些版本（&lt;4）typeof正则表达式返回为function</li>
</ul>
<p>建议使用Object.prototype.toString.call()方法检测数据类型</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function isArray(value){
    return Object.prototype.toString.call(value) === &quot;[object Array]&quot;;
}

function isFunction(value){
    return Object.prototype.toString.call(value) === &quot;[object Function]&quot;;
}

function isRegExp(value){
    return Object.prototype.toString.call(value) === &quot;[object RegExp]&quot;;
}

function isNativeJSON(){
    return window.JSON &amp;&amp; Object.prototype.toString.call(JSON) === &quot;[object JSON]&quot;;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isArray</span>(<span class="hljs-params">value</span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.prototype.toString.call(value) === <span class="hljs-string">"[object Array]"</span>;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isFunction</span>(<span class="hljs-params">value</span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.prototype.toString.call(value) === <span class="hljs-string">"[object Function]"</span>;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isRegExp</span>(<span class="hljs-params">value</span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.prototype.toString.call(value) === <span class="hljs-string">"[object RegExp]"</span>;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isNativeJSON</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">window</span>.JSON &amp;&amp; <span class="hljs-built_in">Object</span>.prototype.toString.call(<span class="hljs-built_in">JSON</span>) === <span class="hljs-string">"[object JSON]"</span>;
}</code></pre>
<p><code>对于ie中一COM对象形式实现的任何函数，isFunction都返回false，因为他们并非原生的javascript函数。</code></p>
<p><strong>在web开发中，能够区分原生与非原生的对象非常重要。只有这样才能确切知道某个对象是否有哪些功能</strong></p>
<p>以上所有的正确性的前提是：Object.prototype.toString没有被修改过</p>
<h2 id="articleHeader40">6.2. 作用域安全的构造函数</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(name){
    this.name = name;
}

//使用new来创建一个对象
var one = new Person('wdd');

//直接调用构造函数
Person();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span><span class="hljs-params">(name)</span></span>{
    <span class="hljs-keyword">this</span>.name = name;
}

<span class="hljs-comment">//使用new来创建一个对象</span>
<span class="hljs-keyword">var</span> one = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">'wdd'</span>);

<span class="hljs-comment">//直接调用构造函数</span>
Person();</code></pre>
<p>由于this是运行时分配的，如果你使用new来操作，this指向的就是one。如果直接调用构造函数，那么this会指向全局对象window,然后你的代码就会覆盖window的原生name。如果有其他地方使用过window.name, 那么你的函数将会埋下一个深藏的bug。</p>
<p><code>那么，如何才能创建一个作用域安全的构造函数？</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(name){
    if(this instanceof Person){
        this.name = name;
    }
    else{
        return new Person(name);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span><span class="hljs-params">(name)</span></span>{
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span> <span class="hljs-keyword">instanceof</span> Person){
        <span class="hljs-keyword">this</span>.name = name;
    }
    <span class="hljs-keyword">else</span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Person(name);
    }
}</code></pre>
<h2 id="articleHeader41">6.3. 惰性载入函数</h2>
<p>假设有一个方法X，在A类浏览器里叫A,在b类浏览器里叫B,有些浏览器并没有这个方法,你想实现一个跨浏览器的方法。</p>
<p>惰性载入函数的思想是：<code>在函数内部改变函数自身的执行逻辑</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function X(){
    if(A){
        return new A();
    }
    else{
        if(B){
            return new B();
        }
        else{
            throw new Error('no A or B');
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">X</span></span>(){
    <span class="hljs-keyword">if</span>(A){
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-type">A</span>();
    }
    <span class="hljs-keyword">else</span>{
        <span class="hljs-keyword">if</span>(B){
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-type">B</span>();
        }
        <span class="hljs-keyword">else</span>{
            <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-type">Error</span>(<span class="hljs-string">'no A or B'</span>);
        }
    }
}</code></pre>
<p>换一种写法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function X(){
    if(A){
        X = function(){
            return new A();
        };
    }
    else{
        if(B){
            X = function(){
                return new B();
            };
        }
        else{
            throw new Error('no A or B');
        }
    }
    
    return new X();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">X</span></span>(){
    <span class="hljs-keyword">if</span>(A){
        X = <span class="hljs-function"><span class="hljs-keyword">function</span></span>(){
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-type">A</span>();
        };
    }
    <span class="hljs-keyword">else</span>{
        <span class="hljs-keyword">if</span>(B){
            X = <span class="hljs-function"><span class="hljs-keyword">function</span></span>(){
                <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-type">B</span>();
            };
        }
        <span class="hljs-keyword">else</span>{
            <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-type">Error</span>(<span class="hljs-string">'no A or B'</span>);
        }
    }
    
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-type">X</span>();
}</code></pre>
<h2 id="articleHeader42">6.4. 防篡改对象</h2>
<h3 id="articleHeader43">6.4.1. 不可扩展对象 Object.preventExtensions</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 下面代码在谷歌浏览器中执行
> var person = {name: 'wdd'};
undefined
> Object.preventExtensions(person);
Object {name: &quot;wdd&quot;}
> person.age = 10
10
> person
Object {name: &quot;wdd&quot;}
> Object.isExtensible(person)
false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 下面代码在谷歌浏览器中执行</span>
&gt; <span class="hljs-keyword">var</span> person = {<span class="hljs-attr">name</span>: <span class="hljs-string">'wdd'</span>};
<span class="hljs-literal">undefined</span>
&gt; <span class="hljs-built_in">Object</span>.preventExtensions(person);
<span class="hljs-built_in">Object</span> {<span class="hljs-attr">name</span>: <span class="hljs-string">"wdd"</span>}
&gt; person.age = <span class="hljs-number">10</span>
<span class="hljs-number">10</span>
&gt; person
<span class="hljs-built_in">Object</span> {<span class="hljs-attr">name</span>: <span class="hljs-string">"wdd"</span>}
&gt; <span class="hljs-built_in">Object</span>.isExtensible(person)
<span class="hljs-literal">false</span></code></pre>
<h3 id="articleHeader44">6.4.2. 密封对象Object.seal</h3>
<p>密封对象不可扩展，并且不能删除对象的属性或者方法。但是属性值可以修改。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> var one = {name: 'hihi'}
undefined
> Object.seal(one)
Object {name: &quot;hihi&quot;}
> one.age = 12
12
> one
Object {name: &quot;hihi&quot;}
> delete one.name
false
> one
Object {name: &quot;hihi&quot;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&gt; <span class="hljs-keyword">var</span> one = {<span class="hljs-attr">name</span>: <span class="hljs-string">'hihi'</span>}
<span class="hljs-literal">undefined</span>
&gt; <span class="hljs-built_in">Object</span>.seal(one)
<span class="hljs-built_in">Object</span> {<span class="hljs-attr">name</span>: <span class="hljs-string">"hihi"</span>}
&gt; one.age = <span class="hljs-number">12</span>
<span class="hljs-number">12</span>
&gt; one
<span class="hljs-built_in">Object</span> {<span class="hljs-attr">name</span>: <span class="hljs-string">"hihi"</span>}
&gt; <span class="hljs-keyword">delete</span> one.name
<span class="hljs-literal">false</span>
&gt; one
<span class="hljs-built_in">Object</span> {<span class="hljs-attr">name</span>: <span class="hljs-string">"hihi"</span>}</code></pre>
<h3 id="articleHeader45">6.4.3. 冻结对象 Object.freeze</h3>
<p>最严格的防篡改就是冻结对象。对象不可扩展，而且密封，不能修改。只能访问。</p>
<h2 id="articleHeader46">6.5. 高级定时器</h2>
<h3 id="articleHeader47">6.5.1. 函数节流</h3>
<p>函数节流的思想是：<code>某些代码不可以没有间断的连续重复执行</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var processor = {
    timeoutId: null,

    // 实际进行处理的方法
    performProcessing: function(){
        ...
    },

    // 初始化调用方法
    process: function(){
        clearTimeout(this.timeoutId);

        var that = this;

        this.timeoutId = setTimeout(function(){
            that.performProcessing();
        }, 100);
    }
}

// 尝试开始执行
processor.process();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> processor = {
    timeoutId: <span class="hljs-literal">null</span>,

    <span class="hljs-comment">// 实际进行处理的方法</span>
    performProcessing: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
        ...
    },

    <span class="hljs-comment">// 初始化调用方法</span>
    process: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
        clearTimeout(<span class="hljs-keyword">this</span>.timeoutId);

        <span class="hljs-keyword">var</span> that = <span class="hljs-keyword">this</span>;

        <span class="hljs-keyword">this</span>.timeoutId = setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
            that.performProcessing();
        }, <span class="hljs-number">100</span>);
    }
}

<span class="hljs-comment">// 尝试开始执行</span>
processor.process();</code></pre>
<h3 id="articleHeader48">6.5.2. 中央定时器</h3>
<p>页面如果有十个区域要动态显示当前时间，一般来说，可以用10个定时来实现。其实一个中央定时器就可以搞定。</p>
<p>中央定时器动画 demo地址：<a href="http://wangduanduan.coding.me/my-all-demos/ninja/center-time-control.html" rel="nofollow noreferrer" target="_blank">http://wangduanduan.coding.me...</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var timers = {
        timerId: 0,
        timers: [],
        add: function(fn){
            this.timers.push(fn);
        },
        start: function(){
            if(this.timerId){
                return;
            }

            (function runNext(){
                if(timers.timers.length > 0){
                    for(var i=0; i < timers.timers.length ; i++){
                        if(timers.timers[i]() === false){
                            timers.timers.splice(i, 1);
                            i--;
                        }
                    }

                    timers.timerId = setTimeout(runNext, 16);
                }
            })();
        },
        stop: function(){
            clearTimeout(timers.timerId);
            this.timerId = 0;
        }
    };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> timers = {
        timerId: <span class="hljs-number">0</span>,
        timers: [],
        add: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(fn)</span></span>{
            <span class="hljs-keyword">this</span>.timers.push(fn);
        },
        start: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
            <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.timerId){
                <span class="hljs-keyword">return</span>;
            }

            (<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">runNext</span><span class="hljs-params">()</span></span>{
                <span class="hljs-keyword">if</span>(timers.timers.length &gt; <span class="hljs-number">0</span>){
                    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>; i &lt; timers.timers.length ; i++){
                        <span class="hljs-keyword">if</span>(timers.timers[i]() === <span class="hljs-literal">false</span>){
                            timers.timers.splice(i, <span class="hljs-number">1</span>);
                            i--;
                        }
                    }

                    timers.timerId = setTimeout(runNext, <span class="hljs-number">16</span>);
                }
            })();
        },
        stop: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
            clearTimeout(timers.timerId);
            <span class="hljs-keyword">this</span>.timerId = <span class="hljs-number">0</span>;
        }
    };</code></pre>
<h1 id="articleHeader49">7. 函数式编程</h1>
<p>推荐阅读：<a href="https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/" rel="nofollow noreferrer" target="_blank">JS函数式编程中文版</a></p>
<h1 id="articleHeader50">8. HTML的告诫</h1>
<ul>
<li>使用input的时候，一定要加上maxlength属性。（你以为只需要输入一个名字的地方，用户可能复制一篇文章放进去。）</li>
<li>从input取值的时候，最好去除一下首尾空格</li>
</ul>
<h1 id="articleHeader51">9. ajax的告诫</h1>
<p>ajax在使用的时候，例如点击按钮，获取某个列表。需要注意以下方面</p>
<ol>
<li>ajax请求还没有结束时，按钮一定要disabled，防止多次点击。请求结束时，才去掉按钮的disabled属性。</li>
<li>请求没结束的时候，一定要显示一个gif的动画，告诉用户请求还在loading。不要让用户以为这垃圾程序又卡死了。</li>
<li>请求的结果如果是空的，一定要告诉用户: 很抱歉，暂时没有查询到相关记录之类的话语。不要给一个空白页面给用户。</li>
<li>最好考虑到请求报错的情况，给出友好的错误提醒。</li>
</ol>
<h1 id="articleHeader52">10. 代码整洁之道</h1>
<h2 id="articleHeader53">10.1. 函数整洁</h2>
<ul>
<li><code>尽量将所有代码封装在函数中，不要暴露全局变量</code></li>
<li><code>每个函数的函数体中，代码行越少越好，最好一个函数中就一句代码</code></li>
</ul>
<h1 id="articleHeader54">11. 工程化与模块化</h1>
<h2 id="articleHeader55">11.1. 前端构建工具必不可少</h2>
<h3 id="articleHeader56">11.1.1. webpack</h3>
<h3 id="articleHeader57">11.1.2. rollup</h3>
<h3 id="articleHeader58">11.1.3. parcel</h3>
<h1 id="articleHeader59">12. 协议 TCP IP HTTP</h1>
<p><code>如果你认为前端不需要关于协议的知识，那么你就是大错特错了。其实不仅仅是前端，所有的开发者都应该学习底层的协议。因为他们是互联网通信的基石。</code></p>
<blockquote>推荐三本必读的书籍</blockquote>
<ul>
<li><a href="https://book.douban.com/subject/10746113/" rel="nofollow noreferrer" target="_blank">HTTP权威指南</a></li>
<li><a href="https://book.douban.com/subject/24737674/" rel="nofollow noreferrer" target="_blank">图解TCP/IP : 第5版</a></li>
<li><a href="https://book.douban.com/subject/25863515/" rel="nofollow noreferrer" target="_blank">图解HTTP</a></li>
</ul>
<p>或者你一也可以看看关于协议方面的一些问题，以及如果你遇到过，你是否知道如何解决：</p>
<ul>
<li><a href="https://wdd.js.org/you-dont-know-https-and-http.html" rel="nofollow noreferrer" target="_blank">可能被遗漏的https与http的知识点</a></li>
<li><a href="https://wdd.js.org/tcp-high-recv-q-or-send-q-reasons.html" rel="nofollow noreferrer" target="_blank">哑代理 - TCP链接高Recv-Q，内存泄露的罪魁祸首</a></li>
</ul>
<h1 id="articleHeader60">13. 推荐深度阅读</h1>
<h2 id="articleHeader61">13.1. 推荐阅读技术书籍</h2>
<ul>
<li><a href="https://book.douban.com/subject/10797189/" rel="nofollow noreferrer" target="_blank">编写可读代码的艺术</a></li>
<li><a href="https://book.douban.com/subject/21792530/" rel="nofollow noreferrer" target="_blank">编写可维护的JavaScript</a></li>
<li><a href="https://book.douban.com/subject/30143702/" rel="nofollow noreferrer" target="_blank">JavaScript忍者秘籍（第2版）</a></li>
<li><a href="https://book.douban.com/subject/3590768/" rel="nofollow noreferrer" target="_blank">JavaScript语言精粹</a></li>
<li><a href="https://book.douban.com/subject/10746113/" rel="nofollow noreferrer" target="_blank">HTTP权威指南</a></li>
<li><a href="https://book.douban.com/subject/24737674/" rel="nofollow noreferrer" target="_blank">图解TCP/IP : 第5版</a></li>
<li><a href="https://book.douban.com/subject/25863515/" rel="nofollow noreferrer" target="_blank">图解HTTP</a></li>
<li><a href="https://book.douban.com/subject/4199741/" rel="nofollow noreferrer" target="_blank">代码整洁之道</a></li>
</ul>
<h2 id="articleHeader62">13.2. 推荐阅读在线文章</h2>
<ul>
<li><a href="https://www.smashingmagazine.com/2012/11/writing-fast-memory-efficient-javascript/" rel="nofollow noreferrer" target="_blank">Writing Fast, Memory-Efficient JavaScript</a></li>
<li><a href="https://bonsaiden.github.io/JavaScript-Garden/zh/" rel="nofollow noreferrer" target="_blank">JavaScript 秘密花园</a></li>
<li><a href="https://github.com/getify/You-Dont-Know-JS" rel="nofollow noreferrer" target="_blank">You-Dont-Know-JS</a></li>
<li><a href="https://www.mnot.net/cache_docs/" rel="nofollow noreferrer" target="_blank">关于缓存，你应该链接的一切</a></li>
<li><a href="https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/" rel="nofollow noreferrer" target="_blank">JS函数式编程中文版</a></li>
</ul>
<h2 id="articleHeader63">13.3. 技术之外</h2>
<ul>
<li><a href="https://book.douban.com/subject/5290566/" rel="nofollow noreferrer" target="_blank">筑巢引凤-高黏度社会化网站设计秘诀</a></li>
<li><a href="https://book.douban.com/subject/6021440/" rel="nofollow noreferrer" target="_blank">黑客与画家</a></li>
</ul>
<h1 id="articleHeader64">14. 参考文献</h1>
<ul>
<li>JavaScript高级程序设计(第3版) 【美】尼古拉斯·泽卡斯</li>
<li>Maintainable JavaScript (英文版) Nicholas C. Zakas(其实和上边那本书应该是同一个人)</li>
<li>JavaScript忍者秘籍 John Resig / Bear Bibeault （John Resig 大名鼎鼎jQuery的创造者）</li>
<li><a href="https://github.com/fex-team/styleguide" rel="nofollow noreferrer" target="_blank">百度前端研发部 文档与源码编写风格</a></li>
<li><a href="https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/" rel="nofollow noreferrer" target="_blank">js函数式编程指南</a></li>
<li><a href="https://github.com/hueitan/javascript-sdk-design" rel="nofollow noreferrer" target="_blank">JavaScript SDK Design Guide: JavaScript-sdk设计指南</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端干货之JS最佳实践

## 原文链接
[https://segmentfault.com/a/1190000007101196](https://segmentfault.com/a/1190000007101196)

