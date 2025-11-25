---
title: 'mongoose学习笔记（超详细）' 
date: 2019-01-04 2:30:10
hidden: true
slug: 4qt3hse1xem
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p><a href="http://cnodejs.org/topic/58b911997872ea0864fee313" rel="nofollow noreferrer" target="_blank">原文出处</a></p></blockquote>
<h2 id="articleHeader0">名词解释</h2>
<ul>
<li>Schema： 一种以文件形式存储的数据库模型骨架，不具备数据库的操作能力</li>
<li>Model： 由Schema编译而成的假想（fancy）构造器，具有抽象属性和行为。Model的每一个实例（instance）就是一个document。document可以保存到数据库和从数据库返回。</li>
<li>Instance： 由Model创建的实例。</li>
</ul>
<h2 id="articleHeader1">概念解析</h2>
<table>
<thead><tr>
<th>SQL术语/概念</th>
<th align="center">MongoDB术语/概念</th>
<th align="left">解释/说明</th>
</tr></thead>
<tbody>
<tr>
<td>rdatabase</td>
<td align="center">database</td>
<td align="left">-</td>
</tr>
<tr>
<td>table</td>
<td align="center">collection</td>
<td align="left">数据库表/集合</td>
</tr>
<tr>
<td>row</td>
<td align="center">document</td>
<td align="left">数据记录行/文档</td>
</tr>
<tr>
<td>column</td>
<td align="center">index</td>
<td align="left">数据记录行/文档</td>
</tr>
<tr>
<td>table joins</td>
<td align="center">-</td>
<td align="left">表连接,MongoDB不支持</td>
</tr>
<tr>
<td>primary key</td>
<td align="center">primary key 主键</td>
<td align="left">MongoDB自动将_id字段设置为主键</td>
</tr>
</tbody>
</table>
<h2 id="articleHeader2">定义Schema</h2>
<p>mongoose中任何任何事物都是从Schema开始的。每一个Schema对应MongoDB中的一个集合（collection）。Schema中定义了集合中文档（document）的样式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var blogSchema = new Schema({  
    title:  String,  
    author: String,  
    body:   String,  
    comments: [{ body: String, date: Date }],  
    date: { type: Date, default: Date.now },  
    hidden: Boolean, 
    meta: {    votes: Number,    favs:  Number  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">var</span> mongoose = <span class="hljs-built_in">require</span>(<span class="hljs-string">'mongoose'</span>);
<span class="hljs-keyword">var</span> Schema = mongoose.Schema;
<span class="hljs-keyword">var</span> blogSchema = <span class="hljs-keyword">new</span> Schema({  
    title:  <span class="hljs-built_in">String</span>,  
    author: <span class="hljs-built_in">String</span>,  
    body:   <span class="hljs-built_in">String</span>,  
    comments: [{ body: <span class="hljs-built_in">String</span>, date: <span class="hljs-built_in">Date</span> }],  
    date: { <span class="hljs-keyword">type</span>: <span class="hljs-built_in">Date</span>, <span class="hljs-keyword">default</span>: <span class="hljs-built_in">Date</span>.now },  
    hidden: <span class="hljs-built_in">Boolean</span>, 
    meta: {    votes: <span class="hljs-built_in">Number</span>,    favs:  <span class="hljs-built_in">Number</span>  }
});</code></pre>
<p>如果之后想要在Schema中添加键，可以使用Schema#add方法。</p>
<h2 id="articleHeader3">创造一个model</h2>
<p>为了使用schema定义，我们需要转换blogSchema为一个Model。使用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mongoose.model(modelName, schema)
var BlogModel = mongoose.model('Blog', blogSchema);// 开始吧！" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>mongoose.model(modelName, schema)
<span class="hljs-keyword">var</span> BlogModel = mongoose.model(<span class="hljs-string">'Blog'</span>, blogSchema);<span class="hljs-comment">// 开始吧！</span></code></pre>
<h2 id="articleHeader4">实例方法</h2>
<p>Model的实例是document。实例有很多内置的方法，我们也可以给实例自定义方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var animalSchema = new Schema({ 
    name: String, type: String    
});
animalSchema.methods.findSimilarTypes = function (cb) {
    return this.model('Animal').find({ type: this.type }, cb);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">var</span> animalSchema = <span class="hljs-keyword">new</span> Schema({ 
    name: <span class="hljs-built_in">String</span>, <span class="hljs-keyword">type</span>: <span class="hljs-built_in">String</span>    
});
animalSchema.methods.findSimilarTypes = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">cb</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.model(<span class="hljs-string">'Animal'</span>).find({ <span class="hljs-keyword">type</span>: <span class="hljs-keyword">this</span>.type }, cb);
}</code></pre>
<p>现在所有的动物实例有findSimilarTypes方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var AnimalModel = mongoose.model('Animal', animalSechema);
var dog = new AnimalModel({ type: 'dog' });
dog.findSimilarTypes(function (err, dogs) { 
    console.log(dogs); // woof
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> AnimalModel = mongoose.model(<span class="hljs-string">'Animal'</span>, animalSechema);
<span class="hljs-keyword">var</span> dog = <span class="hljs-keyword">new</span> AnimalModel({ <span class="hljs-attr">type</span>: <span class="hljs-string">'dog'</span> });
dog.findSimilarTypes(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err, dogs</span>) </span>{ 
    <span class="hljs-built_in">console</span>.log(dogs); <span class="hljs-comment">// woof</span>
});</code></pre>
<p>重写一个默认的实例方法可能会导致不期待的结果。</p>
<h2 id="articleHeader5">Statics方法</h2>
<p>给Model添加一个静态方法也是简单的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="animalSchema.statics.findByName = function (name, cb) {
    this.find({ name: new RegExp(name, 'i') }, cb);
}

var AnimalModel = mongoose.model('Animal', animalSchema);
AnimalModel.findByName('fido', function (err, animals) { 
    console.log(animals);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>animalSchema.statics.findByName = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">name, cb</span>) </span>{
    <span class="hljs-keyword">this</span>.find({ <span class="hljs-attr">name</span>: <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(name, <span class="hljs-string">'i'</span>) }, cb);
}

<span class="hljs-keyword">var</span> AnimalModel = mongoose.model(<span class="hljs-string">'Animal'</span>, animalSchema);
AnimalModel.findByName(<span class="hljs-string">'fido'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err, animals</span>) </span>{ 
    <span class="hljs-built_in">console</span>.log(animals);
});</code></pre>
<h3 id="articleHeader6">methods和statics的区别</h3>
<p>区别就是一个给Model添加方法（statics），<br>一个给实例添加方法（methods）。</p>
<h2 id="articleHeader7">索引</h2>
<p>MongoDB支持二级索引，定义索引有两种方式</p>
<p>路径级别 schema级别</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var animalSchema = new Schema({  
    name: String,  
    type: String,  
    tags: { type: [String], index: true } // field level
    });

animalSchema.index({ name: 1, type: -1 }); // schema level, 1是正序，-1是倒序" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">var</span> animalSchema = <span class="hljs-keyword">new</span> <span class="hljs-type">Schema</span>({  
    name: <span class="hljs-type">String</span>,  
    <span class="hljs-class"><span class="hljs-keyword">type</span></span>: <span class="hljs-type">String</span>,  
    tags: { <span class="hljs-class"><span class="hljs-keyword">type</span></span>: [<span class="hljs-type">String</span>], index: <span class="hljs-literal">true</span> } <span class="hljs-comment">// field level</span>
    });

animalSchema.index({ name: <span class="hljs-number">1</span>, <span class="hljs-class"><span class="hljs-keyword">type</span></span>: <span class="hljs-number">-1</span> }); <span class="hljs-comment">// schema level, 1是正序，-1是倒序</span></code></pre>
<p>如果要建立复合索引的话，在schema级别建立是必要的。</p>
<p>索引或者复合索引能让搜索更加高效，默认索引就是主键索引ObjectId，属性名为_id。</p>
<p>数据库中主要的就是CRUD操作，建立索引可以提高查询速度。但是过多的索引会降低CUD操作。深度好文如下</p>
<p><a href="http://www.cnblogs.com/huangxincheng/archive/2012/02/29/2372699.html" rel="nofollow noreferrer" target="_blank">http://www.cnblogs.com/huangx...</a></p>
<h2 id="articleHeader8">虚拟属性</h2>
<p>Schema中如果定义了虚拟属性，那么该属性将不写入数据库。写入数据库的还是原来的属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 定义一个schema

var personSchema = new Schema({  
    name: {  first: String,    last: String  }
});

// 编译
var Person = mongoose.model('Person', personSchema);// 创造实例

var bad = new Person({ 
    name: { first: 'Walter', last: 'White' }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-comment">// 定义一个schema</span>

<span class="hljs-keyword">var</span> personSchema = <span class="hljs-keyword">new</span> Schema({  
    name: {  first: <span class="hljs-built_in">String</span>,    last: <span class="hljs-built_in">String</span>  }
});

<span class="hljs-comment">// 编译</span>
<span class="hljs-keyword">var</span> Person = mongoose.model(<span class="hljs-string">'Person'</span>, personSchema);<span class="hljs-comment">// 创造实例</span>

<span class="hljs-keyword">var</span> bad = <span class="hljs-keyword">new</span> Person({ 
    name: { first: <span class="hljs-string">'Walter'</span>, last: <span class="hljs-string">'White'</span> }
});</code></pre>
<p>我们将名字分成名字和姓，如果要得到全名，我们需要</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(bad.name.first + ' ' + bad.name.last); // Walter White" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code style="word-break: break-word; white-space: initial;">console.<span class="hljs-built_in">log</span>(bad.name.<span class="hljs-keyword">first</span> + <span class="hljs-string">' '</span> + bad.name.<span class="hljs-keyword">last</span>);<span class="hljs-comment"> // Walter White</span></code></pre>
<p>这样无疑是麻烦的，我们可以通过虚拟属性的getter来解决这个问题。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="personSchema.virtual('name.full').get(function () { 
    return this.name.first + ' ' + this.name.last;
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>personSchema.virtual(<span class="hljs-string">'name.full'</span>).<span class="hljs-keyword">get</span>(function () { 
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name.first + <span class="hljs-string">' '</span> + <span class="hljs-keyword">this</span>.name.last;
});</code></pre>
<p>那么就可以使用bad.name.full直接调用全名了。</p>
<p>反之，如果我们知道虚拟属性name.full，通过setter也可以得到组成name.full的每一项。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="personSchema.virtual('name.full').set(function (name) {  
    var split = name.split(' ');  
    this.name.first = split[0];  
    this.name.last = split[1];
});
...
mad.name.full = 'Breaking Bad';
console.log(mad.name.first); // Breaking
console.log(mad.name.last);  // Bad" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code>personSchema.virtual(<span class="hljs-string">'name.full'</span>).<span class="hljs-built_in">set</span>(function (<span class="hljs-built_in">name</span>) {  
    var split = <span class="hljs-built_in">name</span>.split(<span class="hljs-string">' '</span>);  
    this.<span class="hljs-built_in">name</span>.first = split[<span class="hljs-number">0</span>];  
    this.<span class="hljs-built_in">name</span>.last = split[<span class="hljs-number">1</span>];
});
...
mad.<span class="hljs-built_in">name</span>.full = <span class="hljs-string">'Breaking Bad'</span>;
console.<span class="hljs-built_in">log</span>(mad.<span class="hljs-built_in">name</span>.first); <span class="hljs-comment">// Breaking</span>
console.<span class="hljs-built_in">log</span>(mad.<span class="hljs-built_in">name</span>.last);  <span class="hljs-comment">// Bad</span></code></pre>
<h2 id="articleHeader9">配置项</h2>
<p>schema有一些配置项可以使用，有两种方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Schema({…}, options)

var schema = new Schema({...});
schema.set(option, value);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code>new <span class="hljs-type">Schema</span>({…}, options)

<span class="hljs-keyword">var</span> schema = new <span class="hljs-type">Schema</span>(<span class="hljs-meta">{...}</span>);
schema.<span class="hljs-built_in">set</span>(option, value);</code></pre>
<p>有效的配置有:</p>
<ol>
<li>autoIndex（默认true）</li>
<li>capped</li>
<li>collection</li>
<li>id _id（默认true）</li>
<li>read safe（默认true）</li>
<li>shardKey strict（默认true）</li>
<li>toJSON</li>
<li>toObject</li>
<li>versionKey</li>
<li>typeKey</li>
<li>validateBeforeSave</li>
<li>skipVersioning</li>
<li>timestamps</li>
<li>useNestedStrict</li>
<li>retainKeyOrder</li>
</ol>
<h3 id="articleHeader10">autoIndex–自动索引</h3>
<p>应用开始的时候，Mongoose对每一个索引发送一个ensureIndex的命令。索引默认（_id）被Mongoose创建。</p>
<p>当我们不需要设置索引的时候，就可以通过设置这个选项。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var schema = new Schema({..}, { autoIndex: false });
var Clock = mongoose.model('Clock', schema);
Clock.ensureIndexes(callback);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code><span class="hljs-keyword">var</span> schema = new <span class="hljs-type">Schema</span>(<span class="hljs-meta">{..}</span>, { autoIndex: <span class="hljs-literal">false</span> });
<span class="hljs-keyword">var</span> <span class="hljs-type">Clock</span> = mongoose.model('<span class="hljs-type">Clock</span>', schema);
<span class="hljs-type">Clock</span>.ensureIndexes(callback);</code></pre>
<h3 id="articleHeader11">bufferCommands</h3>
<p>似乎是说这个（mongoose buffer）管理在mongoose连接关闭的时候重连，如果取消buffer设置，如下：（存疑）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var schema = new Schema({..}, { bufferCommands: false });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> schema = new <span class="hljs-type">Schema</span>(<span class="hljs-meta">{..}</span>, { bufferCommands: <span class="hljs-literal">false</span> });</code></pre>
<h3 id="articleHeader12">capped–上限设置</h3>
<p>如果有数据库的批量操作，该属性能限制一次操作的量，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Schema({...},{capped:1024});  //一次操作上线1024条数据" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code style="word-break: break-word; white-space: initial;">new <span class="hljs-type">Schema</span>(<span class="hljs-meta">{...}</span>,{capped:<span class="hljs-number">1024</span>});  //一次操作上线<span class="hljs-number">1024</span>条数据</code></pre>
<p>当然该参数也可是对象，包含size、max、autiIndexId属性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Schema({...},{capped:{size:1024,max:100,autoIndexId:true"}}");" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code style="word-break: break-word; white-space: initial;">new <span class="hljs-type">Schema</span>(<span class="hljs-meta">{...}</span>,{capped:{size:<span class="hljs-number">1024</span>,max:<span class="hljs-number">100</span>,autoIndexId:<span class="hljs-literal">true</span>"}}");</code></pre>
<h3 id="articleHeader13">collection–集合名字</h3>
<p>在MongDB中默认使用Model的名字作为集合的名字，如过需要自定义集合的名字，可以通过设置这个选项。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var schema = new Schema({...}, {collection: 'yourName'});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> schema = new <span class="hljs-type">Schema</span>(<span class="hljs-meta">{...}</span>, {collection: 'yourName'});</code></pre>
<h3 id="articleHeader14">id</h3>
<p>mongoose分配给每一个schema一个虚拟属性id，它是一个getter。返回的是_id转换为字符串后的值。如果不需要为schema添加这个getter，可以通过id配置修改。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 默认行为
var pageSchema = new Schema({ name: String });
var pageModel = mongoose.model('Page', pageSchema);
var p = new pageModel({ name: 'mongodb.org' });
console.log(p.id); // '50341373e894ad16347efe01'

// 禁止id
var pageSchema = new Schema({ name: String }, { id: false } );
var pageModel = mongoose.model('Page', pageSchema);
var p = new pageModel({ name: 'mongodb.org' });
console.log(p.id); // undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-comment">// 默认行为</span>
<span class="hljs-built_in">var</span> pageSchema = <span class="hljs-keyword">new</span> Schema({ <span class="hljs-attribute">name</span>: <span class="hljs-built_in">String</span> });
<span class="hljs-built_in">var</span> pageModel = mongoose.model(<span class="hljs-string">'Page'</span>, pageSchema);
<span class="hljs-built_in">var</span> p = <span class="hljs-keyword">new</span> pageModel({ <span class="hljs-attribute">name</span>: <span class="hljs-string">'mongodb.org'</span> });
<span class="hljs-built_in">console</span>.log(p.id); <span class="hljs-comment">// '50341373e894ad16347efe01'</span>

<span class="hljs-comment">// 禁止id</span>
<span class="hljs-built_in">var</span> pageSchema = <span class="hljs-keyword">new</span> Schema({ <span class="hljs-attribute">name</span>: <span class="hljs-built_in">String</span> }, { <span class="hljs-attribute">id:</span><span class="hljs-string"> false</span> } );
<span class="hljs-built_in">var</span> pageModel = mongoose.model(<span class="hljs-string">'Page'</span>, pageSchema);
<span class="hljs-built_in">var</span> p = <span class="hljs-keyword">new</span> pageModel({ <span class="hljs-attribute">name</span>: <span class="hljs-string">'mongodb.org'</span> });
<span class="hljs-built_in">console</span>.log(p.id); <span class="hljs-comment">// undefined</span></code></pre>
<h3 id="articleHeader15">_id</h3>
<p>在一个schema中如果没有定义_id域（field），那么mongoose将会默认分配一个_id域（field）。类型是ObjectId。如果不需要使用这个默认的选择，可以通过设置这个选项。</p>
<p>通过在schema中设置这个字段可以阻止生成mongoose获得_id。但是在插入的时候仍然会生成_id。设置这个字段之后，如果再使用Schema.set(’_id’, false)将无效。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 默认行为
var pageSchema = new Schema({ name: String });
var pageModel = mongoose.model('Page', pageSchema);
var p = new pageModel({ name: 'mongodb.org' });
console.log(p); // { _id: '50341373e894ad16347efe01', name: 'mongodb.org' }

// 禁用 _id
var pageSchema = new Schema({ name: String }, { _id: false });
// schema构造器设置之后，不要再像下面这样设置
// var schema = new Schema({ name: String });
// schema.set('_id', false);

var PageModel = mongoose.model('Page', pageSchema);
var p = new pageModel({ name: 'mongodb.org' });
console.log(p); // { name: 'mongodb.org' }
// 当插入的时候，MongoDB将会创建_id
p.save(function (err) {  
    if (err) return handleError(err);  
    pageModel.findById(p, function (err, doc) { 
        if (err) return handleError(err);   
        console.log(doc); 
        // { name: 'mongodb.org', _id: '50341373e894ad16347efe12' }  
    })
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 默认行为</span>
<span class="hljs-keyword">var</span> pageSchema = <span class="hljs-keyword">new</span> Schema({ <span class="hljs-attr">name</span>: <span class="hljs-built_in">String</span> });
<span class="hljs-keyword">var</span> pageModel = mongoose.model(<span class="hljs-string">'Page'</span>, pageSchema);
<span class="hljs-keyword">var</span> p = <span class="hljs-keyword">new</span> pageModel({ <span class="hljs-attr">name</span>: <span class="hljs-string">'mongodb.org'</span> });
<span class="hljs-built_in">console</span>.log(p); <span class="hljs-comment">// { _id: '50341373e894ad16347efe01', name: 'mongodb.org' }</span>

<span class="hljs-comment">// 禁用 _id</span>
<span class="hljs-keyword">var</span> pageSchema = <span class="hljs-keyword">new</span> Schema({ <span class="hljs-attr">name</span>: <span class="hljs-built_in">String</span> }, { <span class="hljs-attr">_id</span>: <span class="hljs-literal">false</span> });
<span class="hljs-comment">// schema构造器设置之后，不要再像下面这样设置</span>
<span class="hljs-comment">// var schema = new Schema({ name: String });</span>
<span class="hljs-comment">// schema.set('_id', false);</span>

<span class="hljs-keyword">var</span> PageModel = mongoose.model(<span class="hljs-string">'Page'</span>, pageSchema);
<span class="hljs-keyword">var</span> p = <span class="hljs-keyword">new</span> pageModel({ <span class="hljs-attr">name</span>: <span class="hljs-string">'mongodb.org'</span> });
<span class="hljs-built_in">console</span>.log(p); <span class="hljs-comment">// { name: 'mongodb.org' }</span>
<span class="hljs-comment">// 当插入的时候，MongoDB将会创建_id</span>
p.save(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err</span>) </span>{  
    <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">return</span> handleError(err);  
    pageModel.findById(p, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err, doc</span>) </span>{ 
        <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">return</span> handleError(err);   
        <span class="hljs-built_in">console</span>.log(doc); 
        <span class="hljs-comment">// { name: 'mongodb.org', _id: '50341373e894ad16347efe12' }  </span>
    })
})</code></pre>
<p>为什么不建议使用set</p>
<h3 id="articleHeader16">read</h3>
<p>允许在schema级别设置query#read，对于所有的查询，提供给我们一种方法应用默认的ReadPreferences。</p>
<h3 id="articleHeader17">safe</h3>
<p>这个配置会在MongoDB所有的操作中起作用。如果设置成true就是在操作的时候要等待返回的MongoDB返回的结果，比如update，要返回影响的条数，才往后执行，如果safe：false，则表示不用等到结果就向后执行了。<br>默认设置为true能保证所有的错误能通过我们写的回调函数。我们也能设置其它的安全等级如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{ j: 1, w: 2, wtimeout: 10000 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;">{ <span class="hljs-attribute">j</span>: <span class="hljs-number">1</span>, w: <span class="hljs-number">2</span>, wtimeout: <span class="hljs-number">10000</span> }</code></pre>
<p>表示如果10秒内写操作没有完成，将会超时。<br>关于j和w，这里有很好的解释。</p>
<p><a href="http://kyfxbl.iteye.com/blog/1952941" rel="nofollow noreferrer" target="_blank">http://kyfxbl.iteye.com/blog/...</a></p>
<h3 id="articleHeader18">shardKey</h3>
<p>需要mongodb做分布式，才会使用该属性。</p>
<h3 id="articleHeader19">strict</h3>
<p>默认是enabled，如果实例中的域（field）在schema中不存在，那么这个域不会被插入到数据库。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ThingSchema = new Schema({a:String});
var ThingModel = db.model('Thing',SchemaSchema);
var thing = new Thing({iAmNotInTheThingSchema:true});
thing.save();//iAmNotInTheThingSchema这个属性将无法被存储

// 通过doc.set()设置也会受到影响。
var thingSchema = new Schema({..})
var Thing = mongoose.model('Thing', thingSchema);
var thing = new Thing;
thing.set('iAmNotInTheSchema', true);
thing.save(); // iAmNotInTheSchema is not saved to the db" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-keyword">var</span> ThingSchema = <span class="hljs-keyword">new</span> <span class="hljs-type">Schema</span>({a:<span class="hljs-type">String</span>});
<span class="hljs-keyword">var</span> ThingModel = db.model(<span class="hljs-string">'Thing'</span>,SchemaSchema);
<span class="hljs-keyword">var</span> thing = <span class="hljs-keyword">new</span> <span class="hljs-type">Thing</span>({iAmNotInTheThingSchema:<span class="hljs-type">true</span>});
thing.save();<span class="hljs-comment">//iAmNotInTheThingSchema这个属性将无法被存储</span>

<span class="hljs-comment">// 通过doc.set()设置也会受到影响。</span>
<span class="hljs-keyword">var</span> thingSchema = <span class="hljs-keyword">new</span> <span class="hljs-type">Schema</span>({..})
<span class="hljs-keyword">var</span> Thing = mongoose.model(<span class="hljs-string">'Thing'</span>, thingSchema);
<span class="hljs-keyword">var</span> thing = <span class="hljs-keyword">new</span> <span class="hljs-type">Thing</span>;
thing.<span class="hljs-keyword">set</span>(<span class="hljs-string">'iAmNotInTheSchema'</span>, <span class="hljs-literal">true</span>);
thing.save(); <span class="hljs-comment">// iAmNotInTheSchema is not saved to the db</span></code></pre>
<p>如果取消严格选项，iAmNotInTheThingSchema将会被存入数据库</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var thingSchema = new Schema({..}, { strict: false });
var thing = new Thing({ iAmNotInTheSchema: true });
thing.save(); // iAmNotInTheSchema is now saved to the db!!" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code><span class="hljs-keyword">var</span> thingSchema = new <span class="hljs-type">Schema</span>(<span class="hljs-meta">{..}</span>, { strict: <span class="hljs-literal">false</span> });
<span class="hljs-keyword">var</span> thing = new <span class="hljs-type">Thing</span>({ iAmNotInTheSchema: <span class="hljs-literal">true</span> });
thing.save(); // iAmNotInTheSchema <span class="hljs-keyword">is</span> now saved to the db!!</code></pre>
<p>该选项也可以在Model级别使用，通过设置第二个参数，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ThingModel = db.model('Thing');
var thing1 = new ThingModel(doc,true);  //启用严格
var thing2 = new ThingModel(doc,false); //禁用严格" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-keyword">var</span> ThingModel = db.model(<span class="hljs-string">'Thing'</span>);
<span class="hljs-keyword">var</span> thing1 = <span class="hljs-keyword">new</span> <span class="hljs-type">ThingModel</span>(doc,<span class="hljs-literal">true</span>);  <span class="hljs-comment">//启用严格</span>
<span class="hljs-keyword">var</span> thing2 = <span class="hljs-keyword">new</span> <span class="hljs-type">ThingModel</span>(doc,<span class="hljs-literal">false</span>); <span class="hljs-comment">//禁用严格</span></code></pre>
<p>strict也可以设置为throw，表示出现问题将会抛出错误而不是抛弃不合适的数据。</p>
<p>注意：</p>
<ul><li>不要设置为false除非你有充分的理由。</li></ul>
<p>在mongoose v2里默认是false。</p>
<p>在实例上设置的任何键值对如果再schema中不存在对应的，将会被忽视。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var thingSchema = new Schema({..})
var Thing = mongoose.model('Thing', thingSchema);
var thing = new Thing;
thing.iAmNotInTheSchema = true;
thing.save(); // iAmNotInTheSchema 不会保存到数据库。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code><span class="hljs-keyword">var</span> thingSchema = new <span class="hljs-type">Schema</span>(<span class="hljs-meta">{..}</span>)
<span class="hljs-keyword">var</span> <span class="hljs-type">Thing</span> = mongoose.model('<span class="hljs-type">Thing</span>', thingSchema);
<span class="hljs-keyword">var</span> thing = new <span class="hljs-type">Thing</span>;
thing.iAmNotInTheSchema = <span class="hljs-literal">true</span>;
thing.save(); // iAmNotInTheSchema 不会保存到数据库。</code></pre>
<h3 id="articleHeader20">toJSON</h3>
<p>和toObject类似，选择这个选项为true后，但是只有当实例调用了toJSON方法后，才会起作用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var schema = new Schema({ name: String });
schema.path('name').get(function (v) { 
    return v + ' is my name';
});

schema.set('toJSON', { getters: true, virtuals: false });
var M = mongoose.model('Person', schema);
var m = new M({ name: 'Max Headroom' });
console.log(m.toObject()); // { _id: 504e0cd7dd992d9be2f20b6f, name: 'Max Headroom' }
console.log(m.toJSON()); // { _id: 504e0cd7dd992d9be2f20b6f, name: 'Max Headroom is my name' }
console.log(JSON.stringify(m)); // { &quot;_id&quot;: &quot;504e0cd7dd992d9be2f20b6f&quot;, &quot;name&quot;: &quot;Max Headroom is my name&quot; }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> schema = <span class="hljs-keyword">new</span> Schema({ <span class="hljs-attr">name</span>: <span class="hljs-built_in">String</span> });
schema.path(<span class="hljs-string">'name'</span>).get(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">v</span>) </span>{ 
    <span class="hljs-keyword">return</span> v + <span class="hljs-string">' is my name'</span>;
});

schema.set(<span class="hljs-string">'toJSON'</span>, { <span class="hljs-attr">getters</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">virtuals</span>: <span class="hljs-literal">false</span> });
<span class="hljs-keyword">var</span> M = mongoose.model(<span class="hljs-string">'Person'</span>, schema);
<span class="hljs-keyword">var</span> m = <span class="hljs-keyword">new</span> M({ <span class="hljs-attr">name</span>: <span class="hljs-string">'Max Headroom'</span> });
<span class="hljs-built_in">console</span>.log(m.toObject()); <span class="hljs-comment">// { _id: 504e0cd7dd992d9be2f20b6f, name: 'Max Headroom' }</span>
<span class="hljs-built_in">console</span>.log(m.toJSON()); <span class="hljs-comment">// { _id: 504e0cd7dd992d9be2f20b6f, name: 'Max Headroom is my name' }</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">JSON</span>.stringify(m)); <span class="hljs-comment">// { "_id": "504e0cd7dd992d9be2f20b6f", "name": "Max Headroom is my name" }</span></code></pre>
<p>可以看出，配置属性name对toObject没影响，对toJSON有影响。</p>
<h3 id="articleHeader21">toObject</h3>
<p>选择这个选项为true后，默认对这个schema所有的实例都有作用。不需要实例手动调用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var schema = new Schema({ name: String });
schema.path('name').get(function (v) {  
    return v + ' is my name';
});

schema.set('toObject', { getters: true });
var M = mongoose.model('Person', schema);
var m = new M({ name: 'Max Headroom' });
console.log(m); // { _id: 504e0cd7dd992d9be2f20b6f, name: 'Max Headroom is my name' }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> schema = <span class="hljs-keyword">new</span> Schema({ <span class="hljs-attr">name</span>: <span class="hljs-built_in">String</span> });
schema.path(<span class="hljs-string">'name'</span>).get(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">v</span>) </span>{  
    <span class="hljs-keyword">return</span> v + <span class="hljs-string">' is my name'</span>;
});

schema.set(<span class="hljs-string">'toObject'</span>, { <span class="hljs-attr">getters</span>: <span class="hljs-literal">true</span> });
<span class="hljs-keyword">var</span> M = mongoose.model(<span class="hljs-string">'Person'</span>, schema);
<span class="hljs-keyword">var</span> m = <span class="hljs-keyword">new</span> M({ <span class="hljs-attr">name</span>: <span class="hljs-string">'Max Headroom'</span> });
<span class="hljs-built_in">console</span>.log(m); <span class="hljs-comment">// { _id: 504e0cd7dd992d9be2f20b6f, name: 'Max Headroom is my name' }</span></code></pre>
<p>较上面不同的是，没有virtuals: false这个设置。</p>
<h3 id="articleHeader22">typeKey</h3>
<p>在mongoose里，如果schema里有个对象，并且这个对象有个type键，mongoose将会将这个作为一种类型声明。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Mongoose 认为loc字段的类型是一个字符串，而不是有type这个字段 
var schema = new Schema({ loc: { type: String, coordinates: [Number] } });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">// Mongoose 认为loc字段的类型是一个字符串，而不是有type这个字段 </span>
<span class="hljs-keyword">var</span> schema = <span class="hljs-keyword">new</span> Schema({ loc: { <span class="hljs-keyword">type</span>: <span class="hljs-built_in">String</span>, coordinates: [<span class="hljs-built_in">Number</span>] } });</code></pre>
<p>然而，对于一些应用来说，type字段是必要的。那么可以通过typeKey来设置。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var schema = new Schema({ 
    // Mongoose 这时候认为loc字段有两个键，一个是type，一个是coordinates  
    loc: { type: String, coordinates: [Number] },  
    // Mongoose 这时候认为name字段的类型是字符串。  
    name: { $type: String }
},{ typeKey: '$type' }); // '$type'键意味着这是一个类型宣告，而不是默认的type" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">var</span> schema = <span class="hljs-keyword">new</span> <span class="hljs-type">Schema</span>({ 
    <span class="hljs-comment">// Mongoose 这时候认为loc字段有两个键，一个是type，一个是coordinates  </span>
    loc: { <span class="hljs-class"><span class="hljs-keyword">type</span></span>: <span class="hljs-type">String</span>, coordinates: [<span class="hljs-type">Number</span>] },  
    <span class="hljs-comment">// Mongoose 这时候认为name字段的类型是字符串。  </span>
    name: { $<span class="hljs-class"><span class="hljs-keyword">type</span></span>: <span class="hljs-type">String</span> }
},{ typeKey: '$<span class="hljs-class"><span class="hljs-keyword">type</span>' })</span>; <span class="hljs-comment">// '$type'键意味着这是一个类型宣告，而不是默认的type</span></code></pre>
<h3 id="articleHeader23">validateBeforeSave</h3>
<p>默认得，文档被保存到数据库的时候会自动验证，这是为了防止无效的文档。如果想要手动处理验证，并且能保存不通过验证的文档，可以设置这个选项为false。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var schema = new Schema({ name: String });
schema.set('validateBeforeSave', false);
schema.path('name').validate(function (value) {   
    return v != null;
});
var M = mongoose.model('Person', schema);
var m = new M({ name: null });
m.validate(function(err) { 
    console.log(err); // 将会告诉你null不被允许
});
m.save(); // 尽管数据无效，但是仍然可以保存。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> schema = <span class="hljs-keyword">new</span> Schema({ <span class="hljs-attr">name</span>: <span class="hljs-built_in">String</span> });
schema.set(<span class="hljs-string">'validateBeforeSave'</span>, <span class="hljs-literal">false</span>);
schema.path(<span class="hljs-string">'name'</span>).validate(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">value</span>) </span>{   
    <span class="hljs-keyword">return</span> v != <span class="hljs-literal">null</span>;
});
<span class="hljs-keyword">var</span> M = mongoose.model(<span class="hljs-string">'Person'</span>, schema);
<span class="hljs-keyword">var</span> m = <span class="hljs-keyword">new</span> M({ <span class="hljs-attr">name</span>: <span class="hljs-literal">null</span> });
m.validate(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>) </span>{ 
    <span class="hljs-built_in">console</span>.log(err); <span class="hljs-comment">// 将会告诉你null不被允许</span>
});
m.save(); <span class="hljs-comment">// 尽管数据无效，但是仍然可以保存。</span></code></pre>
<h3 id="articleHeader24">versionKey</h3>
<p>版本锁设置在每一个文档（document）上，由mogoose生成。默认的值是__v，但是可以自定义。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var schema = new Schema({ name: 'string' });
var Thing = mongoose.model('Thing', schema);
var thing = new Thing({ name: 'mongoose v3' });
thing.save(); // { __v: 0, name: 'mongoose v3' }

// 自定义版本锁
new Schema({..}, { versionKey: '_somethingElse' });
var Thing = mongoose.model('Thing', schema);
var thing = new Thing({ name: 'mongoose v3' });
thing.save(); // { _somethingElse: 0, name: 'mongoose v3' }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> schema = <span class="hljs-keyword">new</span> Schema({ name: <span class="hljs-string">'string'</span> });
<span class="hljs-keyword">var</span> Thing = mongoose.model(<span class="hljs-string">'Thing'</span>, schema);
<span class="hljs-keyword">var</span> thing = <span class="hljs-keyword">new</span> Thing({ name: <span class="hljs-string">'mongoose v3'</span> });
thing.save(); <span class="hljs-comment">// { __v: 0, name: 'mongoose v3' }</span>

<span class="hljs-comment">// 自定义版本锁</span>
<span class="hljs-keyword">new</span> Schema({..}, { versionKey: <span class="hljs-string">'_somethingElse'</span> });
<span class="hljs-keyword">var</span> Thing = mongoose.model(<span class="hljs-string">'Thing'</span>, schema);
<span class="hljs-keyword">var</span> thing = <span class="hljs-keyword">new</span> Thing({ name: <span class="hljs-string">'mongoose v3'</span> });
thing.save(); <span class="hljs-comment">// { _somethingElse: 0, name: 'mongoose v3' }</span></code></pre>
<p>不要将这个选项设置为false除非你知道你在做什么。</p>
<h3 id="articleHeader25">skipVersioning</h3>
<p><a href="http://aaronheckmann.tumblr.com/post/48943525537/mongoose-v3-part-1-" rel="nofollow noreferrer" target="_blank">http://aaronheckmann.tumblr.c...</a></p>
<p>按照这里的说法，大致是说，加入在一个博客系统中，一个人所有的评论是一个数组，那么所有的评论是有索引的，比如某一条评论的body，comments.3.body，这里3是索引。假如一个评论者（A）想要修改自己的评论，但是此时另一个评论者（B）删除（或其他操作）了自己的评论，那么对A的索引可能会造成变化，此时对A的操作会发生错误。</p>
<p>为了改变这个问题，mongoose v3添加了version key配置。无论什么时候修改一个数组潜在地改变数组元素位置，这个version key(__V)的值会加1。在where条件中也需要添加__v条件，如果能通过（数组索引没改变），就可以修改，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="posts.update(
    { _id: postId, __v: verionNumber } ,
    { $set: { 'comments.3.body': updatedText "}}"
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">posts</span><span class="hljs-selector-class">.update</span>(
    { <span class="hljs-attribute">_id</span>: postId, <span class="hljs-attribute">__v</span>: verionNumber } ,
    { $<span class="hljs-attribute">set</span>: { <span class="hljs-string">'comments.3.body'</span>: updatedText "}}"
);</code></pre>
<p>如果在更新之前删除了评论，那么就会发生错误。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="post.save(function (err) { 
    console.log(err); // Error: No matching document found.
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-keyword">post</span>.<span class="hljs-keyword">save</span>(function (<span class="hljs-keyword">err</span>) { 
    console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">err</span>); <span class="hljs-comment">// Error: No matching document found.</span>
});</code></pre>
<h3 id="articleHeader26">timestamps</h3>
<p>如果在schema设置这个选项，createdAt和updatedAt域将会被自动添加的文档中。它们默认的类型是Date，默认的名字是createdAt和updatedAt，不过我们可以自己修改。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var thingSchema = new Schema({..}, { timestamps: { createdAt: 'created_at' } });
var Thing = mongoose.model('Thing', thingSchema);
var thing = new Thing();
thing.save(); // created_at &amp; updatedAt将会被包含在文档。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code><span class="hljs-keyword">var</span> thingSchema = new <span class="hljs-type">Schema</span>(<span class="hljs-meta">{..}</span>, { timestamps: { createdAt: 'created_at' } });
<span class="hljs-keyword">var</span> <span class="hljs-type">Thing</span> = mongoose.model('<span class="hljs-type">Thing</span>', thingSchema);
<span class="hljs-keyword">var</span> thing = new <span class="hljs-type">Thing</span>();
thing.save(); // created_at &amp; updatedAt将会被包含在文档。</code></pre>
<h3 id="articleHeader27">useNestedStrict</h3>
<p>在mongoos 4， update()和findOneAndUpdate()方法只检查顶级schema的strict的选项设置。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var childSchema = new Schema({}, { strict: false });// 这里parentSchema是topSchema，而childSchema是subSchema。
var parentSchema = new Schema({ child: childSchema }, { strict: 'throw' });
var Parent = mongoose.model('Parent', parentSchema);
Parent.update({}, { 'child.name': 'Luke Skywalker' }, function(error) {  
    // 发生错误因为parentSchema设置了strict: 'throw'}
    // 即使childSchema设置了{strict: false}
});
var update = { 'child.name': 'Luke Skywalker' };
var opts = { strict: false };
Parent.update({}, update, opts, function(error) { 
    // 这个可以通过因为重写了parentSchema的strict选项
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-keyword">var</span> childSchema = <span class="hljs-keyword">new</span> Schema({}, { strict: <span class="hljs-keyword">false</span> });<span class="hljs-comment">// 这里parentSchema是topSchema，而childSchema是subSchema。</span>
<span class="hljs-keyword">var</span> parentSchema = <span class="hljs-keyword">new</span> Schema({ child: childSchema }, { strict: <span class="hljs-string">'throw'</span> });
<span class="hljs-keyword">var</span> <span class="hljs-keyword">Parent</span> = mongoose.model(<span class="hljs-string">'Parent'</span>, parentSchema);
<span class="hljs-keyword">Parent</span>.update({}, { <span class="hljs-string">'child.name'</span>: <span class="hljs-string">'Luke Skywalker'</span> }, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(error)</span> </span>{  
    <span class="hljs-comment">// 发生错误因为parentSchema设置了strict: 'throw'}</span>
    <span class="hljs-comment">// 即使childSchema设置了{strict: false}</span>
});
<span class="hljs-keyword">var</span> update = { <span class="hljs-string">'child.name'</span>: <span class="hljs-string">'Luke Skywalker'</span> };
<span class="hljs-keyword">var</span> opts = { strict: <span class="hljs-keyword">false</span> };
<span class="hljs-keyword">Parent</span>.update({}, update, opts, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(error)</span> </span>{ 
    <span class="hljs-comment">// 这个可以通过因为重写了parentSchema的strict选项</span>
});</code></pre>
<p>如果设置了useNestedStrict为true，mogoose在更新时使用childSchema的strict选项。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var childSchema = new Schema({}, { strict: false });
var parentSchema = new Schema({ child: childSchema },  { strict: 'throw', useNestedStrict: true });
var Parent = mongoose.model('Parent', parentSchema);
Parent.update({}, { 'child.name': 'Luke Skywalker' }, function(error) { 
    // 可以更新
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-keyword">var</span> childSchema = <span class="hljs-keyword">new</span> Schema({}, { strict: <span class="hljs-keyword">false</span> });
<span class="hljs-keyword">var</span> parentSchema = <span class="hljs-keyword">new</span> Schema({ child: childSchema },  { strict: <span class="hljs-string">'throw'</span>, useNestedStrict: <span class="hljs-keyword">true</span> });
<span class="hljs-keyword">var</span> <span class="hljs-keyword">Parent</span> = mongoose.model(<span class="hljs-string">'Parent'</span>, parentSchema);
<span class="hljs-keyword">Parent</span>.update({}, { <span class="hljs-string">'child.name'</span>: <span class="hljs-string">'Luke Skywalker'</span> }, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(error)</span> </span>{ 
    <span class="hljs-comment">// 可以更新</span>
});</code></pre>
<h3 id="articleHeader28">retainKeyOrder</h3>
<p>默认得，mongoose会转换实体中键的顺序。比如</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Model({ first: 1, second: 2 })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">Model</span>({ <span class="hljs-attribute">first</span>: <span class="hljs-number">1</span>, second: <span class="hljs-number">2</span> })</code></pre>
<p>将会在MongoDB中存储为{ second: 2, first: 1 }；这带来了极大的不方便。</p>
<p>Mongoose v4.6.4 有一个retainKeyOrder选项确保mongoose不会改变键的顺序。</p>
<blockquote>
<p>参考</p>
<p><a href="http://cnodejs.org/topic/504b4924e2b84515770103dd?utm_source=ourjs.com" rel="nofollow noreferrer" target="_blank">http://cnodejs.org/topic/504b...</a></p>
<p><a href="http://www.nodeclass.com/api/mongoose.html#schema_Schema-add" rel="nofollow noreferrer" target="_blank">http://www.nodeclass.com/api/...</a></p>
<p><a href="http://mongoosejs.com/docs/guide.html" rel="nofollow noreferrer" target="_blank">http://mongoosejs.com/docs/gu...</a></p>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
mongoose学习笔记（超详细）

## 原文链接
[https://segmentfault.com/a/1190000010688972](https://segmentfault.com/a/1190000010688972)

