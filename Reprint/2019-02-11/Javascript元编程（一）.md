---
title: 'Javascript元编程（一）' 
date: 2019-02-11 2:30:49
hidden: true
slug: 0zekqrlyyopr
categories: [reprint]
---

{{< raw >}}

                    
<p>首发于知乎专栏：<a href="http://zhuanlan.zhihu.com/starkwang" rel="nofollow noreferrer" target="_blank">http://zhuanlan.zhihu.com/starkwang</a></p>
<p>这几天把一年多前买的《松本行弘的程序世界》重新看了看，很多当时不能理解的东西现在再去看真是茅塞顿开呀，看到元编程那一段真是把我震撼到了，后来发现 Javascript 里其实也是有一些支持元编程的特性的，今天就用一个 DEMO 示范一下吧。</p>
<h2 id="articleHeader0">什么元编程</h2>
<p>“元编程”这个名字看起来高端大气上档次，它的含义也是相当高端：“<strong>写一段自动写程序的程序</strong>”，不要误会，我们做的可不是人工智能。</p>
<p>言简意赅地说，元编程就是将代码视作数据，直接用字符串 or AST or 其他任何形式去操纵代码，以此获得一些维护性、效率上的好处。</p>
<p>Javascript 中，<code>eval</code>、<code>new Function()</code>便是两个可以用来进行元编程的特性。</p>
<h2 id="articleHeader1">原始示例</h2>
<p>现在我们有一堆用户的数据，具体字段有<code>name</code>,<code>sex</code>,<code>age</code>,<code>address</code>等等，通过类似 <code>/get_name?id=123456</code> 来拉取数据</p>
<p>那么我们很容易写出这样的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class User {
    constructor(userID) {
        this.id = userID;
    }

    get_name() {
        return $.ajax(`/get_name?id=${this.id}`);
    }

    get_sex() {
        return $.ajax(`/get_sex?id=${this.id}`);
    }

    //下面是get_age、get_address......
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">User</span> </span>{
    <span class="hljs-keyword">constructor</span>(userID) {
        <span class="hljs-keyword">this</span>.id = userID;
    }

    get_name() {
        <span class="hljs-keyword">return</span> $.ajax(<span class="hljs-string">`/get_name?id=<span class="hljs-subst">${<span class="hljs-keyword">this</span>.id}</span>`</span>);
    }

    get_sex() {
        <span class="hljs-keyword">return</span> $.ajax(<span class="hljs-string">`/get_sex?id=<span class="hljs-subst">${<span class="hljs-keyword">this</span>.id}</span>`</span>);
    }

    <span class="hljs-comment">//下面是get_age、get_address......</span>
}</code></pre>
<p>这段代码的问题在哪呢？</p>
<p>首先，用户数据有多少个字段，我们就要定义多少个 <code>get_something</code> 方法，更可怕的是这些方法里逻辑都是重复的，都是一个简单的 ajax。</p>
<h2 id="articleHeader2">进阶（一）</h2>
<p>我们可以把拉取数据的逻辑封装到 <code>__fetchData</code> 里：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class User {
    constructor(userID) {
        this.id = userID;
    }
    
    __fetchData(key) {
        //这是一个private方法，直接调用类似__fetchData(&quot;age&quot;)是不被允许的
        return $.ajax(`/get_${key}?id=${this.id}`)
    }

    get_name() {
        return this.__fetchData('name');
    }

    get_sex() {
        return this.__fetchData(&quot;sex&quot;);
    }

    //下面是get_age、get_address......
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">User</span> </span>{
    <span class="hljs-keyword">constructor</span>(userID) {
        <span class="hljs-keyword">this</span>.id = userID;
    }
    
    __fetchData(key) {
        <span class="hljs-comment">//这是一个private方法，直接调用类似__fetchData("age")是不被允许的</span>
        <span class="hljs-keyword">return</span> $.ajax(<span class="hljs-string">`/get_<span class="hljs-subst">${key}</span>?id=<span class="hljs-subst">${<span class="hljs-keyword">this</span>.id}</span>`</span>)
    }

    get_name() {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.__fetchData(<span class="hljs-string">'name'</span>);
    }

    get_sex() {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.__fetchData(<span class="hljs-string">"sex"</span>);
    }

    <span class="hljs-comment">//下面是get_age、get_address......</span>
}</code></pre>
<p>然后，冗余的问题可以通过<code>registerProperties</code>来解决：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class User {
    constructor(userID) {
        this.id = userID;
        this.registerProperties([&quot;name&quot;, &quot;age&quot;, &quot;sex&quot;, &quot;address&quot;]);
    }

    registerProperties(keyArray) {
        keyArray.forEach(key => {
            this[`get_${key}`] = () => this.__fetchData(key);
        })
    }

    __fetchData(key) {
        //这是一个private方法，直接调用类似__fetchData(&quot;age&quot;)是不被允许的
        return $.ajax(`/get_${key}?id=${this.id}`)
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">User</span> </span>{
    <span class="hljs-keyword">constructor</span>(userID) {
        <span class="hljs-keyword">this</span>.id = userID;
        <span class="hljs-keyword">this</span>.registerProperties([<span class="hljs-string">"name"</span>, <span class="hljs-string">"age"</span>, <span class="hljs-string">"sex"</span>, <span class="hljs-string">"address"</span>]);
    }

    registerProperties(keyArray) {
        keyArray.forEach(<span class="hljs-function"><span class="hljs-params">key</span> =&gt;</span> {
            <span class="hljs-keyword">this</span>[<span class="hljs-string">`get_<span class="hljs-subst">${key}</span>`</span>] = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">this</span>.__fetchData(key);
        })
    }

    __fetchData(key) {
        <span class="hljs-comment">//这是一个private方法，直接调用类似__fetchData("age")是不被允许的</span>
        <span class="hljs-keyword">return</span> $.ajax(<span class="hljs-string">`/get_<span class="hljs-subst">${key}</span>?id=<span class="hljs-subst">${<span class="hljs-keyword">this</span>.id}</span>`</span>)
    }
}</code></pre>
<h2 id="articleHeader3">进阶（三）</h2>
<p>到目前为止我们都没有涉及到任何元编程的概念，下面我们加上更高的需求：</p>
<p>在拉去数据之后，我们要对部分数据进行一定的处理，比如对 <code>name</code> 我们要去掉首尾的空格，对 <code>age</code> 我们要加上一个 <code>岁</code> 字。具体的处理方法定义在 <code>__handle_something</code> 里面。</p>
<p>这里我们便可以通过 <code>new Function()</code> 来动态生成函数，元编程开始显现威力：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class User {
    constructor(userID) {
        this.id = userID;
        this.registerProperties([&quot;name&quot;, &quot;age&quot;, &quot;sex&quot;, &quot;address&quot;]);
    }

    registerProperties(keyArray) {
        keyArray.forEach(key => {
            //注意这里的fnBody内部依然采用ES5的写法，因为babel目前不会编译函数字符串。
            var fnBody = `return this.__fetchData(&quot;/get_${key}?id=${this.id}&quot;)
                    .then(function(data){
                        return this.__handle_${key}?_this.handle_${key}(data):data;
                    })`;
            this[`get_${key}`] = new Function(fnBody);
        })
    }

    __handle_name(name) {
        //do somthing with name...
        return name;
    }

    __handle_age(age) {
        //do somthing with age...
        return age;
    }

    __fetchData(key) {
        //这是一个private方法，直接调用类似__fetchData(&quot;age&quot;)是不被允许的
        return $.ajax(`/get_${key}?id=${this.id}`)
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">User</span> </span>{
    <span class="hljs-keyword">constructor</span>(userID) {
        <span class="hljs-keyword">this</span>.id = userID;
        <span class="hljs-keyword">this</span>.registerProperties([<span class="hljs-string">"name"</span>, <span class="hljs-string">"age"</span>, <span class="hljs-string">"sex"</span>, <span class="hljs-string">"address"</span>]);
    }

    registerProperties(keyArray) {
        keyArray.forEach(<span class="hljs-function"><span class="hljs-params">key</span> =&gt;</span> {
            <span class="hljs-comment">//注意这里的fnBody内部依然采用ES5的写法，因为babel目前不会编译函数字符串。</span>
            <span class="hljs-keyword">var</span> fnBody = <span class="hljs-string">`return this.__fetchData("/get_<span class="hljs-subst">${key}</span>?id=<span class="hljs-subst">${<span class="hljs-keyword">this</span>.id}</span>")
                    .then(function(data){
                        return this.__handle_<span class="hljs-subst">${key}</span>?_this.handle_<span class="hljs-subst">${key}</span>(data):data;
                    })`</span>;
            <span class="hljs-keyword">this</span>[<span class="hljs-string">`get_<span class="hljs-subst">${key}</span>`</span>] = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Function</span>(fnBody);
        })
    }

    __handle_name(name) {
        <span class="hljs-comment">//do somthing with name...</span>
        <span class="hljs-keyword">return</span> name;
    }

    __handle_age(age) {
        <span class="hljs-comment">//do somthing with age...</span>
        <span class="hljs-keyword">return</span> age;
    }

    __fetchData(key) {
        <span class="hljs-comment">//这是一个private方法，直接调用类似__fetchData("age")是不被允许的</span>
        <span class="hljs-keyword">return</span> $.ajax(<span class="hljs-string">`/get_<span class="hljs-subst">${key}</span>?id=<span class="hljs-subst">${<span class="hljs-keyword">this</span>.id}</span>`</span>)
    }
}</code></pre>
<h2 id="articleHeader4">进阶（四）</h2>
<p>下面我们让需求更加变态一点：</p>
<ol>
<li><p>数据并非通过 ajax 直接拉取，而是通过一个别人封装好的 <code>UserDataBase</code> 里的方法来拉取；</p></li>
<li><p>数据的字段并非只有<code>name</code>,<code>sex</code>,<code>age</code>,<code>address</code>四个，而是要根据 <code>UserDataBase</code> 里给你的方法决定。给你1000个get不同字段的方法，User类里也要有对应的1000个方法。</p></li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class UserDataBase {
    constructor() {}
    get_name(id) {}
    get_age(id) {}
    get_address(id) {}
    get_sex(id) {}
    get_anything_else1(id) {}
    get_anything_else2(id) {}
    get_anything_else3(id) {}
    get_anything_else4(id) {}
    //......
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">UserDataBase</span> </span>{
    <span class="hljs-keyword">constructor</span>() {}
    get_name(id) {}
    get_age(id) {}
    get_address(id) {}
    get_sex(id) {}
    get_anything_else1(id) {}
    get_anything_else2(id) {}
    get_anything_else3(id) {}
    get_anything_else4(id) {}
    <span class="hljs-comment">//......</span>
}</code></pre>
<p>这里我们就需要用到 JS 的反射机制来读取所有拉取字段的方法，然后通过元编程的方式来动态生成对应的方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class User {
    constructor(userID, dataBase) {
        this.id = userID;
        this.__dataBase = dataBase;
        for (var method in dataBase) {
            //对每一个方法
            this.registerMethod(method);
        }
    }

    registerMethod(methodName) {
        //这里除去了前置的&quot;get_&quot;
        var propertyName = methodName.slice(4);
        
        //注意这里拉取数据的方法改为使用dataBase
        var fnBody = `return this.__dataBase.${methodName}()
                    .then(function(data){
                        return this.__handle_${propertyName}?_this.handle_${propertyName}(data):data;
                    })`;
        this[`get_${propertyName}`] = new Function(fnBody);
    }

    __handle_name(name) {
        //do somthing with name...
        return name;
    }

    __handle_age(age) {
        //do somthing with age...
        return age;
    }
}
var userDataBase = new UserDataBase();
var user = new User(&quot;123&quot;, userDataBase);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">User</span> </span>{
    <span class="hljs-keyword">constructor</span>(userID, dataBase) {
        <span class="hljs-keyword">this</span>.id = userID;
        <span class="hljs-keyword">this</span>.__dataBase = dataBase;
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> method <span class="hljs-keyword">in</span> dataBase) {
            <span class="hljs-comment">//对每一个方法</span>
            <span class="hljs-keyword">this</span>.registerMethod(method);
        }
    }

    registerMethod(methodName) {
        <span class="hljs-comment">//这里除去了前置的"get_"</span>
        <span class="hljs-keyword">var</span> propertyName = methodName.slice(<span class="hljs-number">4</span>);
        
        <span class="hljs-comment">//注意这里拉取数据的方法改为使用dataBase</span>
        <span class="hljs-keyword">var</span> fnBody = <span class="hljs-string">`return this.__dataBase.<span class="hljs-subst">${methodName}</span>()
                    .then(function(data){
                        return this.__handle_<span class="hljs-subst">${propertyName}</span>?_this.handle_<span class="hljs-subst">${propertyName}</span>(data):data;
                    })`</span>;
        <span class="hljs-keyword">this</span>[<span class="hljs-string">`get_<span class="hljs-subst">${propertyName}</span>`</span>] = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Function</span>(fnBody);
    }

    __handle_name(name) {
        <span class="hljs-comment">//do somthing with name...</span>
        <span class="hljs-keyword">return</span> name;
    }

    __handle_age(age) {
        <span class="hljs-comment">//do somthing with age...</span>
        <span class="hljs-keyword">return</span> age;
    }
}
<span class="hljs-keyword">var</span> userDataBase = <span class="hljs-keyword">new</span> UserDataBase();
<span class="hljs-keyword">var</span> user = <span class="hljs-keyword">new</span> User(<span class="hljs-string">"123"</span>, userDataBase);</code></pre>
<p>这样即使用户数据有一万种不同的属性字段，只要保证 <code>UserDataBase</code> 中良好地定义了对应的拉取方法，我们的 <code>User</code> 就能自动生成对应的方法。</p>
<p>这也就是元编程的优点之一，程序可以根据传入参数/对象的不同，动态地生成对应的程序，从而减少大量冗余的代码。</p>
<h2 id="articleHeader5">进阶（五）</h2>
<p>现在程序里还有点小瑕疵：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//用户数据中不存在www字段，若这样执行会报错：
user.get_www(); //user.get_www is not a function" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//用户数据中不存在www字段，若这样执行会报错：</span>
user.get_www(); <span class="hljs-comment">//user.get_www is not a function</span></code></pre>
<p>现在我们要保证像上面那样执行任意的 <code>user.get_xxxx()</code> ，程序不会报错，而是返回 <code>false</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//用户数据中不存在www字段：
user.get_www(); // => false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//用户数据中不存在www字段：</span>
user.get_www(); <span class="hljs-comment">// =&gt; false</span></code></pre>
<p>Javascript 里缺少了 Ruby 中 <code>method_missing</code> 这样黑科技的内核方法，但是我们可以通过 ES6 的 Proxy 特性来模拟：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function createUser(id, userDataBase) {
    return new Proxy(new User(id, userDataBase), {
        get: (target, property) => (typeof(target[property]) === &quot;function&quot; ? target[property] : () => false)
    })
}

var userDataBase = new UserDataBase();
var user = createUser(&quot;123&quot;, userDataBase);

user.get_name() => // fetch name data
user.get_wwwwww() // => false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createUser</span>(<span class="hljs-params">id, userDataBase</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Proxy</span>(<span class="hljs-keyword">new</span> User(id, userDataBase), {
        <span class="hljs-attr">get</span>: <span class="hljs-function">(<span class="hljs-params">target, property</span>) =&gt;</span> (<span class="hljs-keyword">typeof</span>(target[property]) === <span class="hljs-string">"function"</span> ? target[property] : <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-literal">false</span>)
    })
}

<span class="hljs-keyword">var</span> userDataBase = <span class="hljs-keyword">new</span> UserDataBase();
<span class="hljs-keyword">var</span> user = createUser(<span class="hljs-string">"123"</span>, userDataBase);

user.get_name() =&gt; <span class="hljs-comment">// fetch name data</span>
user.get_wwwwww() <span class="hljs-comment">// =&gt; false</span></code></pre>
<h2 id="articleHeader6">总结</h2>
<p>其实这里的 DEMO 只是元编程的一个小应用，下一篇文章里我们会通过元编程实现一个简单的表单验证 DSL ：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//类似
form.name[&quot;is not empty&quot;][&quot;length is between&quot;,1,20] // => true or false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//类似</span>
form.name[<span class="hljs-string">"is not empty"</span>][<span class="hljs-string">"length is between"</span>,<span class="hljs-number">1</span>,<span class="hljs-number">20</span>] <span class="hljs-comment">// =&gt; true or false</span></code></pre>
<h2 id="articleHeader7">参考</h2>
<p><a href="http://zhuanlan.zhihu.com/p/20754002" rel="nofollow noreferrer" target="_blank">来来来，咱么元编程入个门</a></p>
<p><a href="http://www.cnblogs.com/liuyanlong/archive/2013/05/27/3102161.html" rel="nofollow noreferrer" target="_blank">元编程之javascript</a></p>
<p><a href="https://www.phodal.com/blog/javascript-dsl-meta-programming-use-proxy/" rel="nofollow noreferrer" target="_blank">JavaScript 元编程之ES6 Proxy</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Javascript元编程（一）

## 原文链接
[https://segmentfault.com/a/1190000004950743](https://segmentfault.com/a/1190000004950743)

