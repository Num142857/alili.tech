---
title: 'Mocha中文文档' 
date: 2018-12-30 2:30:10
hidden: true
slug: zevfrvry2wa
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">mocha中文文档</h2>
<blockquote><p>这个是对<a href="https://mochajs.org/" rel="nofollow noreferrer" target="_blank">mocha</a>文档的翻译，都是我一个字一个字敲出来的。水平有限，激情无限，欢迎大家批评指正。文档我也放在了我的<a href="https://github.com/2json/mocha-in-chinese" rel="nofollow noreferrer" target="_blank">github</a>上,后续，我会添加一些例子进去，欢迎大家关注和贡献。</p></blockquote>
<h3 id="articleHeader1">安装</h3>
<p>使用<a href="https://npmjs.org/" rel="nofollow noreferrer" target="_blank">npm</a>全局安装：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install --global mocha" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">$ npm install --global mocha</code></pre>
<p>也可以作为项目的依赖进行安装：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install --save-dev mocha" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">$ npm install --save-dev mocha</code></pre>
<blockquote><p>安装Mocha &gt;= v3.0.0，npm的版本应该&gt;=v1.4.0。除此，确保使用Node.js的版本&gt;=v0.10来运行Mocha</p></blockquote>
<p>Mocha也可以使用<a href="http://bower.io/" rel="nofollow noreferrer" target="_blank">Bower</a>进行安装(<code>bower install mocha</code>)，也可以从<a href="https://cdnjs.com/libraries/mocha" rel="nofollow noreferrer" target="_blank">cdnjs</a>上获取。</p>
<h3 id="articleHeader2">GEETING STARTED</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install mocha
$ mkdir test
$ $EDITOR test/test.js # 或者使用你喜欢的编辑器" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">$ npm install mocha
$ mkdir <span class="hljs-built_in">test</span>
$ <span class="hljs-variable">$EDITOR</span> <span class="hljs-built_in">test</span>/test.js <span class="hljs-comment"># 或者使用你喜欢的编辑器</span></code></pre>
<p>在编辑器中输入：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var assert = require('assert')
describe('Array', function() {
    describe('#indexOf()', function() {
        it('should return -1 when the value is not present', function() {
            assert.equal(-1, [1, 2, 3].indexOf(4))
        })
    })
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> assert = <span class="hljs-built_in">require</span>(<span class="hljs-string">'assert'</span>)
describe(<span class="hljs-string">'Array'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    describe(<span class="hljs-string">'#indexOf()'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        it(<span class="hljs-string">'should return -1 when the value is not present'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            assert.equal(<span class="hljs-number">-1</span>, [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].indexOf(<span class="hljs-number">4</span>))
        })
    })
})</code></pre>
<p>然后在终端中运行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ ./node_modules/mocha/bin/mocha

Array
    #indexOf()
      ✓ should return -1 when the value is not present


  1 passing (9ms)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">$ ./node_modules/mocha/bin/mocha

Array
    <span class="hljs-comment">#indexOf()</span>
      ✓ should <span class="hljs-built_in">return</span> -1 when the value is not present


  1 passing (9ms)</code></pre>
<p>在<code>package.json</code>中设置一个测试脚本：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;:{
    &quot;test&quot;: &quot;mocha&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-string">"scripts"</span>:{
    <span class="hljs-string">"test"</span>: <span class="hljs-string">"mocha"</span>
}</code></pre>
<p>然后运行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm test" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">$ npm <span class="hljs-built_in">test</span></code></pre>
<h3 id="articleHeader3">ASSERTIONS(断言)</h3>
<p>Mocha允许你使用任意你喜欢的断言库，在上面的例子中，我们使用了Node.js内置的<a href="https://nodejs.org/api/assert.html" rel="nofollow noreferrer" target="_blank">assert</a>模块作为断言。如果能够抛出一个错误，它就能够运行。这意味着你能使用下面的这些仓库，比如：</p>
<ul>
<li><a href="https://github.com/shouldjs/should.js" rel="nofollow noreferrer" target="_blank">should.js</a></li>
<li><a href="https://github.com/LearnBoost/expect.js" rel="nofollow noreferrer" target="_blank">expect.js</a></li>
<li><a href="http://chaijs.com/" rel="nofollow noreferrer" target="_blank">chai</a></li>
<li><a href="https://github.com/visionmedia/better-assert" rel="nofollow noreferrer" target="_blank">better-assert</a></li>
<li><a href="http://unexpected.js.org/" rel="nofollow noreferrer" target="_blank">unexpected</a></li>
</ul>
<h3 id="articleHeader4">ASYNCHRONOUS CODE(异步代码)</h3>
<p>使用mocha测试异步代码是再简单不过了。只需要在测试完成的时候调用一下回调函数即可。通过添加一个回调函数(通常命名为<code>done</code>)给<code>it()</code>方法，Mocha就会知道，它应该等这个函数被调用的时候才能完成测试。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="describe('User', function() {
    describe('#save()', function() {
        it('should save without error', function() {
            var user = new User('Luna')
            user.save(function(err) {
                if(err) done(err);
                else done()
            })
        })
    })
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">describe(<span class="hljs-string">'User'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    describe(<span class="hljs-string">'#save()'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        it(<span class="hljs-string">'should save without error'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">var</span> user = <span class="hljs-keyword">new</span> User(<span class="hljs-string">'Luna'</span>)
            user.save(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>) </span>{
                <span class="hljs-keyword">if</span>(err) done(err);
                <span class="hljs-keyword">else</span> done()
            })
        })
    })
})</code></pre>
<p>也可以让事情变得更简单，因为<code>done()</code>函数接收一个err，所以，我们可以直接按照下面的使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="describe('User', function() {
    describe('#save()', function() {
        it('should save without error', function(done) {
            var user = new User('Luna')
            user.save(done)
        })
    })
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">describe(<span class="hljs-string">'User'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    describe(<span class="hljs-string">'#save()'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        it(<span class="hljs-string">'should save without error'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">done</span>) </span>{
            <span class="hljs-keyword">var</span> user = <span class="hljs-keyword">new</span> User(<span class="hljs-string">'Luna'</span>)
            user.save(done)
        })
    })
})</code></pre>
<h4>WORKING WITH PROMISES(使用promises)</h4>
<p>同时，除了使用<code>done()</code>回调函数，你也可以返回一个<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise" rel="nofollow noreferrer" target="_blank">Promise</a>。这种方式对于测试那些返回promies的方法是实用的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="beforeEach(function() {
  return db.clear()
    .then(function() {
      return db.save([tobi, loki, jane]);
    });
});

describe('#find()', function() {
  it('respond with matching records', function() {
    return db.find({ type: 'User' }).should.eventually.have.length(3);
  });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">beforeEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> db.clear()
    .then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">return</span> db.save([tobi, loki, jane]);
    });
});

describe(<span class="hljs-string">'#find()'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  it(<span class="hljs-string">'respond with matching records'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> db.find({ <span class="hljs-attr">type</span>: <span class="hljs-string">'User'</span> }).should.eventually.have.length(<span class="hljs-number">3</span>);
  });
});</code></pre>
<blockquote><p>后面的例子使用了<a href="https://www.npmjs.com/package/chai-as-promised" rel="nofollow noreferrer" target="_blank">Chai as Promised</a> 进行promise断言</p></blockquote>
<p>在Mocha&gt;=3.0.0版本中，返回一个promise的同时，调用了done函数。将会导致一个异常，下面是一个常见的错误：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const assert = require('assert')

it('should complete this test', function (done) {
    return new Promise(function (resolve) {
        assert.ok(true)
        resolve()
    })
    .then(done)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> assert = <span class="hljs-built_in">require</span>(<span class="hljs-string">'assert'</span>)

it(<span class="hljs-string">'should complete this test'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">done</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve</span>) </span>{
        assert.ok(<span class="hljs-literal">true</span>)
        resolve()
    })
    .then(done)
})</code></pre>
<p>这个测试会失败，错误信息为：<code> Error: Resolution method is overspecified. Specify a callback *or* return a Promise; not both.</code><br>而比v3.0.0更老的版本中，调用done函数会被忽略。</p>
<h3 id="articleHeader5">USING ASYNC / AWAIT</h3>
<p>如果你的js运行环境支持<a href="https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/async_function" rel="nofollow noreferrer" target="_blank">async/await</a>，你也可以像下面这样写异步测试。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="beforeEach(async function() {
  await db.clear();
  await db.save([tobi, loki, jane]);
});

describe('#find()', function() {
  it('responds with matching records', async function() {
    const users = await db.find({ type: 'User' });
    users.should.have.length(3);
  });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">beforeEach(<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">await</span> db.clear();
  <span class="hljs-keyword">await</span> db.save([tobi, loki, jane]);
});

describe(<span class="hljs-string">'#find()'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  it(<span class="hljs-string">'responds with matching records'</span>, <span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">const</span> users = <span class="hljs-keyword">await</span> db.find({ <span class="hljs-attr">type</span>: <span class="hljs-string">'User'</span> });
    users.should.have.length(<span class="hljs-number">3</span>);
  });
});</code></pre>
<h3 id="articleHeader6">SYNCHRONOUS CODE</h3>
<p>当测试同步代码的时候，可以省略参数中的回调函数，Mocha会自动的测试下面的代码。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="describe('Array', function () {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function() {
          [1,2,3].indexOf(5).should.equal(-1);
          [1,2,3].indexOf(0).should.equal(-1);
        });
    })
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code class="javascrit">describe('Array', function () {
    describe('#indexOf()', function () {
        it('should return <span class="hljs-number">-1</span> when the value is not present', function() {
          [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>].indexOf(<span class="hljs-number">5</span>).should.equal(<span class="hljs-name">-1</span>)<span class="hljs-comment">;</span>
          [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>].indexOf(<span class="hljs-number">0</span>).should.equal(<span class="hljs-name">-1</span>)<span class="hljs-comment">;</span>
        })<span class="hljs-comment">;</span>
    })
})</code></pre>
<h3 id="articleHeader7">ARROW FUNCTIONS</h3>
<p>向Mocha传递箭头函数是不好的，由于this的词法作用域的问题，箭头函数是不能够访问mocha的上下文的。例如，由于箭头函数本身的机制，下面的代码会失败。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="describe('my suite', () => {
  it('my test', () => {
    // should set the timeout of this test to 1000 ms; instead will fail
    this.timeout(1000);
    assert.ok(true);
  });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">describe(<span class="hljs-string">'my suite'</span>, () =&gt; {
  it(<span class="hljs-string">'my test'</span>, () =&gt; {
    <span class="hljs-comment">// should set the timeout of this test to 1000 ms; instead will fail</span>
    <span class="hljs-keyword">this</span>.timeout(<span class="hljs-number">1000</span>);
    assert.ok(<span class="hljs-literal">true</span>);
  });
});</code></pre>
<p>如果你不需要使用mocha的上下文，可以使用箭头函数。然而，如果你以后需要使用这个上下文的话，重构会变得十分困难。</p>
<h3 id="articleHeader8">HOOKS</h3>
<p>鉴于默认使用BDD风格的接口，Mocha提供了一些钩子函数:<code>before()</code>,<code>after()</code>,<code>beforeEach()</code>和<code>afterEach()</code>。这些钩子函数可以用于设置测试的先决条件或者对测试进行清理。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="describe('hooks', function() {
    before(function() {
        // 在这个区块内的所有测试之前运行
    })
    after(function () {
        // 在这个区块内的所有测试之后运行
    })
    beforeEach(function () {
        // 在这个区块内的每个测试运行之前运行
    })
    afterEach(function () {
        // 在这个区块内的每个测试之后运行
    })
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">describe(<span class="hljs-string">'hooks'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    before(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 在这个区块内的所有测试之前运行</span>
    })
    after(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 在这个区块内的所有测试之后运行</span>
    })
    beforeEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 在这个区块内的每个测试运行之前运行</span>
    })
    afterEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 在这个区块内的每个测试之后运行</span>
    })
})</code></pre>
<blockquote><p>测试可以出现在before,after或者和你的钩子函数交替出现。钩子函数会按照它们被定义的顺序运行。一般就是，<code>before()(只运行一次)</code>-&gt;<code>beforeEach()</code>-&gt;<code>afterEach()</code>-&gt;<code>after()(只运行一次)</code>。</p></blockquote>
<h3 id="articleHeader9">DESCRIBING HOOKS</h3>
<p>任何钩子函数在执行的时候都可以传递一个可选的描述信息，可以更容易地准确指出测试中的错误。如果钩子函数使用了命名的回调函数，则其名字会被作为默认的描述信息。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="beforeEach(function () {
    // beforeEach钩子函数(没有任何的描述信息)
})
beforeEach(function namedFn() {
    // beforeEach:namedFn会被当作描述信息
})
beforeEach('some description', function () {
    // beforeEach:some description(提供了描述信息)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">beforeEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// beforeEach钩子函数(没有任何的描述信息)</span>
})
beforeEach(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">namedFn</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// beforeEach:namedFn会被当作描述信息</span>
})
beforeEach(<span class="hljs-string">'some description'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// beforeEach:some description(提供了描述信息)</span>
})</code></pre>
<h3 id="articleHeader10">ASYNCHRONOUS HOOKS</h3>
<p>所有的钩子(<code>before()</code>,<code>after()</code>,<code>beforeEach()</code>,<code>afterEach()</code>)可以是同步的也可以是异步的，其行为就像是普通的测试用例。例如，你希望在每个测试之前，向数据库中填充一些内容。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="describe('Connection', function() {
  var db = new Connection,
    tobi = new User('tobi'),
    loki = new User('loki'),
    jane = new User('jane');

  beforeEach(function(done) {
    db.clear(function(err) {
      if (err) return done(err);
      db.save([tobi, loki, jane], done);
    });
  });

  describe('#find()', function() {
    it('respond with matching records', function(done) {
      db.find({type: 'User'}, function(err, res) {
        if (err) return done(err);
        res.should.have.length(3);
        done();
      });
    });
  });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">describe(<span class="hljs-string">'Connection'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> db = <span class="hljs-keyword">new</span> Connection,
    tobi = <span class="hljs-keyword">new</span> User(<span class="hljs-string">'tobi'</span>),
    loki = <span class="hljs-keyword">new</span> User(<span class="hljs-string">'loki'</span>),
    jane = <span class="hljs-keyword">new</span> User(<span class="hljs-string">'jane'</span>);

  beforeEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">done</span>) </span>{
    db.clear(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>) </span>{
      <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">return</span> done(err);
      db.save([tobi, loki, jane], done);
    });
  });

  describe(<span class="hljs-string">'#find()'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    it(<span class="hljs-string">'respond with matching records'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">done</span>) </span>{
      db.find({<span class="hljs-attr">type</span>: <span class="hljs-string">'User'</span>}, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, res</span>) </span>{
        <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">return</span> done(err);
        res.should.have.length(<span class="hljs-number">3</span>);
        done();
      });
    });
  });
});</code></pre>
<h3 id="articleHeader11">ROOT-LEVEL HOOKS</h3>
<p>你可以选择几个文件来添加根级别的钩子。例如，添加<code>beforeEach()</code>在所有<code>describe()</code>块外面(译者注：可以理解为最顶级作用域中)，这会造成在每个测试用例之前调用这个钩子函数。不仅仅它所在的这个文件(这是因为Mocha有一个暗藏的<code>describe()</code>，叫做"root-suite")。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="beforeEach(function () {
    console.log('before every test in every file');
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">beforeEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'before every test in every file'</span>);
})</code></pre>
<h3 id="articleHeader12">DELAYED ROOT SUITE</h3>
<p>如果想在mocha命令运行之后，先做一些别的工作，再启动测试，可以使用mocha --delay命令，此命令会在全局环境中生成一个run函数，延迟工作完成后调用run函数即可启动测试。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setTimeout(function () {
    // do some setup
    
    describe('my suite', function () {
        // ...
    });
    
    run();
}, 5000)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// do some setup</span>
    
    describe(<span class="hljs-string">'my suite'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// ...</span>
    });
    
    run();
}, <span class="hljs-number">5000</span>)</code></pre>
<h3 id="articleHeader13">PENDING TESTS</h3>
<p>不给测试用例传递一个回调函数，就是被等待实现的测试用例，但同样会在报告中体现出来。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="describe('Array', function() {
    describe('#indexOf', function () {
        // 等待测试
        it('should return -1 when the value is nor present');
    });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">describe(<span class="hljs-string">'Array'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    describe(<span class="hljs-string">'#indexOf'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 等待测试</span>
        it(<span class="hljs-string">'should return -1 when the value is nor present'</span>);
    });
});</code></pre>
<h3 id="articleHeader14">EXCLUSIVE TESTS</h3>
<p>在用例测试集或者用例单元后面加上<code>.only()</code>方法，可以让mocha只测试此用例集合或者用例单元。下面是一个仅执行一个特殊的测试单元的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="describe('Array', function () {
    describe.only('#indexOf()', function () {
        // ....
    })
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">describe(<span class="hljs-string">'Array'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    describe.only(<span class="hljs-string">'#indexOf()'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// ....</span>
    })
})</code></pre>
<p>注意：在Array用例集下面嵌套的集合，只有#indexOf用例集合会被执行。</p>
<p>下面的这个例子是仅仅执行唯一一个测试单元。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="describe('Array', function() {
    describe('#indexOf', function() {
        it.only('should return -1 unless preset', function () {
            // ...
        })
        it('should return the index when present', function () {
            // ...
        })
    })
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">describe(<span class="hljs-string">'Array'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    describe(<span class="hljs-string">'#indexOf'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        it.only(<span class="hljs-string">'should return -1 unless preset'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// ...</span>
        })
        it(<span class="hljs-string">'should return the index when present'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// ...</span>
        })
    })
})</code></pre>
<p>在v3.0.0版本之前，<code>.only()</code>函数通过字符串匹配的方式去决定哪个测试应该被执行。但是在v3.0.0版本及以后，<code>.only()</code>可以被定义多次来定义一系列的测试子集。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="describe('Array', function () {
    describe('#indexOf', function () {
        it.only('should return -1 unless present', function () {
            // this test will be run
        })
        it.only('should return index when present', function () {
            // this test will also be run
        })
        it('should return -1 if called with a non-Array context', function () {
            // this test will not be run
        })
    })
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">describe(<span class="hljs-string">'Array'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    describe(<span class="hljs-string">'#indexOf'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        it.only(<span class="hljs-string">'should return -1 unless present'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// this test will be run</span>
        })
        it.only(<span class="hljs-string">'should return index when present'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// this test will also be run</span>
        })
        it(<span class="hljs-string">'should return -1 if called with a non-Array context'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// this test will not be run</span>
        })
    })
})</code></pre>
<p>你也可以选择多个测试集合：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
describe('Array', function () {
    describe.only('#indexOf()', function () {
        it('should return -1 unless present', function() {
          // this test will be run
        });
    
        it('should return the index when present', function() {
          // this test will also be run
        });
    });
    describe.only('#concat()', function () {
        it('should return a new Array', function () {
          // this test will also be run
        });
    });
    
    describe('#slice()', function () {
        it('should return a new Array', function () {
          // this test will not be run
        });
    });
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
describe(<span class="hljs-string">'Array'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    describe.only(<span class="hljs-string">'#indexOf()'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        it(<span class="hljs-string">'should return -1 unless present'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
          <span class="hljs-comment">// this test will be run</span>
        });
    
        it(<span class="hljs-string">'should return the index when present'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
          <span class="hljs-comment">// this test will also be run</span>
        });
    });
    describe.only(<span class="hljs-string">'#concat()'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        it(<span class="hljs-string">'should return a new Array'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
          <span class="hljs-comment">// this test will also be run</span>
        });
    });
    
    describe(<span class="hljs-string">'#slice()'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        it(<span class="hljs-string">'should return a new Array'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
          <span class="hljs-comment">// this test will not be run</span>
        });
    });
})
</code></pre>
<p>上面两种情况也可以结合在一起使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="describe('Array', function () {
    describe.only('#indexOf()', function () {
        it.only('should return -1 unless present', function () {
            // this test will be run
        })
        it('should return the index when present', function () {
            // this test will not be run
        })
    })
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">describe(<span class="hljs-string">'Array'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    describe.only(<span class="hljs-string">'#indexOf()'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        it.only(<span class="hljs-string">'should return -1 unless present'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// this test will be run</span>
        })
        it(<span class="hljs-string">'should return the index when present'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// this test will not be run</span>
        })
    })
})</code></pre>
<p>注意：如果有钩子函数，钩子函数会被执行。</p>
<blockquote><p>除非你是真的需要它，否则不要提交<code>only()</code>到你的版本控制中。</p></blockquote>
<h3 id="articleHeader15">INCLUSIVE TESTS</h3>
<p>和<code>only()</code>方法相反，<code>.skip()</code>方法可以用于跳过某些测试测试集合和测试用例。所有被跳过的用例都会被标记为<code>pending</code>用例，在报告中也会以<code>pending</code>用例显示。下面是一个跳过整个测试集的例子。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="describe('Array', function () {
    describe.skip('#indexOf', function () {
        // ...
    })
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">describe(<span class="hljs-string">'Array'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    describe.skip(<span class="hljs-string">'#indexOf'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// ...</span>
    })
})</code></pre>
<p>或者指定跳过某一个测试用例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="describe('Array', function () {
    describe('#indexOf()', function () {
        it.skip('should return -1 unless present', function () {
            // this test will not be run
        })
        
        it('should return the index when present', function () {
            // this test will be run
        })
    })
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">describe(<span class="hljs-string">'Array'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    describe(<span class="hljs-string">'#indexOf()'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        it.skip(<span class="hljs-string">'should return -1 unless present'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// this test will not be run</span>
        })
        
        it(<span class="hljs-string">'should return the index when present'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// this test will be run</span>
        })
    })
})</code></pre>
<blockquote><p>最佳实践：使用<code>.skip()</code>方法来跳过某些不需要的测试用例而不是从代码中注释掉。</p></blockquote>
<p>有些时候，测试用例需要某些特定的环境或者一些特殊的配置，但我们事先是无法确定的。这个时候，我们可以使用<code>this.skip()</code>［译者注：这个时候就不能使用箭头函数了］根据条件在运行的时候跳过某些测试用例。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="it('should only test in the correct environment', function () {
    if(/* check the environment */) {
        // make assertions
    } else {
        this.skip()
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">it(<span class="hljs-string">'should only test in the correct environment'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">if</span>(<span class="hljs-comment">/* check the environment */</span>) {
        <span class="hljs-comment">// make assertions</span>
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">this</span>.skip()
    }
})</code></pre>
<p>这个测试在报告中会以<code>pending</code>状态呈现。为了避免测试逻辑混乱，在调用skip函数之后，就不要再在用例函数或after钩子中执行更多的逻辑了。</p>
<p>下面的这个测试和上面的相比，因为没有在else分支做任何事情，当if条件不满足的时候，它仍然会在报告中显示passing。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="it('should only test in the correct environment', function () {
    if (/* check test environment */) {
        // make assertion
    } else {
        // do nothing
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">it(<span class="hljs-string">'should only test in the correct environment'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-comment">/* check test environment */</span>) {
        <span class="hljs-comment">// make assertion</span>
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-comment">// do nothing</span>
    }
})</code></pre>
<blockquote><p>最佳事件：千万不要什么事情都不做，一个测试应该做个断言判断或者使用skip()</p></blockquote>
<p>我们也可以在before钩子函数中使用.skip()来跳过多个测试用例或者测试集合。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="before(function () {
   if(/* check test environment */) {
       // setup mode
   } else {
       this.skip()
   }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">before(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
   <span class="hljs-keyword">if</span>(<span class="hljs-comment">/* check test environment */</span>) {
       <span class="hljs-comment">// setup mode</span>
   } <span class="hljs-keyword">else</span> {
       <span class="hljs-keyword">this</span>.skip()
   }
})</code></pre>
<blockquote><p>Mocha v3.0.0之前，在异步的测试用例和钩子函数中是不支持<code>this.skip()</code>的。</p></blockquote>
<h3 id="articleHeader16">RETRY TESTS</h3>
<p>Mocha允许你为失败的测试用例指定需要重复的次数。这个功能是为端对端测试所设计的，因为这些测试的数据不好模拟。Mocha不推荐在单元测试中使用这个功能。</p>
<p>这个功能会重新运行beforeEach/afterEach钩子，但不会重新运行before/after钩子。</p>
<p>下面是一个使用Selenium webdriver写的一个重复执行的测试用例。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="describe('retries', function () {
    // 尝试全部的失败的测试4次，
    this.retries(4);

  beforeEach(function () {
    browser.get('http://www.yahoo.com');
  });

  it('should succeed on the 3rd try', function () {
    // Specify this test to only retry up to 2 times
    this.retries(2);
    expect($('.foo').isDisplayed()).to.eventually.be.true;
  });
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">describe(<span class="hljs-string">'retries'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// 尝试全部的失败的测试4次，</span>
    <span class="hljs-keyword">this</span>.retries(<span class="hljs-number">4</span>);

  beforeEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    browser.get(<span class="hljs-string">'http://www.yahoo.com'</span>);
  });

  it(<span class="hljs-string">'should succeed on the 3rd try'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// Specify this test to only retry up to 2 times</span>
    <span class="hljs-keyword">this</span>.retries(<span class="hljs-number">2</span>);
    expect($(<span class="hljs-string">'.foo'</span>).isDisplayed()).to.eventually.be.true;
  });
})</code></pre>
<h3 id="articleHeader17">DYNAMICALLY GENERATING TESTS</h3>
<p>Mocha可以使用<code>Function.prototype.call</code>和函数表达式来定义测试用例，其实就是动态生成一些测试用例，不需要使用什么特殊的语法。和你见过的其他框架可能有所不同，这个特性可以通过定义一些参数来实现测试用例所拥有的功能。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var assert = require('chai').assert;

function add() {
  return Array.prototype.slice.call(arguments).reduce(function(prev, curr) {
    return prev + curr;
  }, 0);
}

describe('add()', function() {
  var tests = [
    {args: [1, 2],       expected: 3},
    {args: [1, 2, 3],    expected: 6},
    {args: [1, 2, 3, 4], expected: 10}
  ];

  tests.forEach(function(test) {
    it('correctly adds ' + test.args.length + ' args', function() {
      var res = add.apply(null, test.args);
      assert.equal(res, test.expected);
    });
  });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> assert = <span class="hljs-built_in">require</span>(<span class="hljs-string">'chai'</span>).assert;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Array</span>.prototype.slice.call(<span class="hljs-built_in">arguments</span>).reduce(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">prev, curr</span>) </span>{
    <span class="hljs-keyword">return</span> prev + curr;
  }, <span class="hljs-number">0</span>);
}

describe(<span class="hljs-string">'add()'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> tests = [
    {<span class="hljs-attr">args</span>: [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>],       <span class="hljs-attr">expected</span>: <span class="hljs-number">3</span>},
    {<span class="hljs-attr">args</span>: [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>],    <span class="hljs-attr">expected</span>: <span class="hljs-number">6</span>},
    {<span class="hljs-attr">args</span>: [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>], <span class="hljs-attr">expected</span>: <span class="hljs-number">10</span>}
  ];

  tests.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">test</span>) </span>{
    it(<span class="hljs-string">'correctly adds '</span> + test.args.length + <span class="hljs-string">' args'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">var</span> res = add.apply(<span class="hljs-literal">null</span>, test.args);
      assert.equal(res, test.expected);
    });
  });
});</code></pre>
<p>上面的测试用例所产生的结果如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ mocha

  add()
    ✓ correctly adds 2 args
    ✓ correctly adds 3 args
    ✓ correctly adds 4 args" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">$ mocha

  add()
    ✓ correctly adds 2 args
    ✓ correctly adds 3 args
    ✓ correctly adds 4 args</code></pre>
<h3 id="articleHeader18">TEST DURATION</h3>
<p>很多的测试报告都会显示测试所花费的时间，同样也会对一些耗时的测试作出特殊的标记。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011362882" src="https://static.alili.tech/img/remote/1460000011362882" alt="" title="" style="cursor: pointer;"></span></p>
<p>我们可以使用slow()方法来明确的表示出，超过多久的时间，这个测试就可以认为是slow的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="describe('something slow', function() {
  this.slow(10000);

  it('should take long enough for me to go make a sandwich', function() {
    // ...
  });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">describe(<span class="hljs-string">'something slow'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">this</span>.slow(<span class="hljs-number">10000</span>);

  it(<span class="hljs-string">'should take long enough for me to go make a sandwich'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// ...</span>
  });
});</code></pre>
<h3 id="articleHeader19">TIMEOUTS</h3>
<p>测试集合超时:</p>
<p>在测试集合上定义超时时间，会对这个测试集合中所有的测试用例和测试集合起作用。我们可以通过<code>this.timeout(0)</code>来关闭超时判断的功能。而且在测试用例和测试集合上定义的超时时间会覆盖外围的测试集合的设置。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="describe('a suite of tests', function() {
  this.timeout(500);

  it('should take less than 500ms', function(done){
    setTimeout(done, 300);
  });

  it('should take less than 500ms as well', function(done){
    setTimeout(done, 250);
  });
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">describe(<span class="hljs-string">'a suite of tests'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">this</span>.timeout(<span class="hljs-number">500</span>);

  it(<span class="hljs-string">'should take less than 500ms'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">done</span>)</span>{
    setTimeout(done, <span class="hljs-number">300</span>);
  });

  it(<span class="hljs-string">'should take less than 500ms as well'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">done</span>)</span>{
    setTimeout(done, <span class="hljs-number">250</span>);
  });
})</code></pre>
<p>测试用例超时：</p>
<p>我们也可以给测试用例定义超时时间，或者通过<code>this.timeout(0)</code>来禁止超时时间的判断。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="it('should take less than 500ms', function(done){
  this.timeout(500);
  setTimeout(done, 300);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="python hljs"><code class="python">it(<span class="hljs-string">'should take less than 500ms'</span>, function(done){
  this.timeout(<span class="hljs-number">500</span>);
  setTimeout(done, <span class="hljs-number">300</span>);
});</code></pre>
<p>钩子函数超时：</p>
<p>也可以给钩子函数设定超时时间，同样也可以使用<code>this.timeout(0)</code>来禁止掉超时时间的判断。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="describe('a suite of tests', function() {
  beforeEach(function(done) {
    this.timeout(3000); // A very long environment setup.
    setTimeout(done, 2500);
  });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">describe(<span class="hljs-string">'a suite of tests'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  beforeEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">done</span>) </span>{
    <span class="hljs-keyword">this</span>.timeout(<span class="hljs-number">3000</span>); <span class="hljs-comment">// A very long environment setup.</span>
    setTimeout(done, <span class="hljs-number">2500</span>);
  });
});</code></pre>
<blockquote><p>在Mocha v3.0.0版本及以上，如果设定的超时时间比<a href="https://developer.mozilla.org/docs/Web/API/WindowTimers/setTimeout#Maximum_delay_value" rel="nofollow noreferrer" target="_blank">最大延迟时间</a>的值大，那么也会被认为是禁止掉超时时间的判断。</p></blockquote>
<h3 id="articleHeader20">DIFFS</h3>
<p>如果做断言的时候抛出了<code>AssertionErrors</code>的异常，且错误对象中含有<code>err.expected</code>属性和<code>err.actual</code>属性，mocha会在报告中展示出期望值和实际值之间的差异。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011362883" src="https://static.alili.tech/img/remote/1460000011362883" alt="" title="" style="cursor: pointer;"></span></p>
<h3 id="articleHeader21">USAGE</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="格式：mocha [debug] [options] [files]

命令：
    init <path> : 生成一个在浏览器中运行的单元测试的模版" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">格式：mocha [debug] [options] [files]

命令：
    init &lt;path&gt; : 生成一个在浏览器中运行的单元测试的模版</code></pre>
<p>当我们运行如下命令的时候:<code>mocha init .</code>会在当前路径中生成一个模版，文件如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011362884" src="https://static.alili.tech/img/remote/1460000011362884" alt="" title="" style="cursor: pointer;"></span></p>
<p>mocha的命令的基本选项：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Options:

    -h, --help                  输出帮助信息
    -V, --version               输出mocha的版本号
    -A, --async-only            强制所有的测试用例必须使用callback或者返回一个promise的格式来确定异步的正确性
    -c, --colors                在报告中显示颜色
    -C, --no-colors             在报告中禁止显示颜色
    -g, --growl                 在桌面上显示测试报告的结果
    -O, --reporter-options <k=v,k2=v2,...>  设置报告的基本选项
    -R, --reporter <name>       指定测试报告的格式
    -S, --sort                  对测试文件进行排序
    -b, --bail                  在第一个测试没有通过的时候就停止执行后面所有的测试
    -d, --debug                 启用node的debugger功能
    -g, --grep <pattern>        用于搜索测试用例的名称，然后只执行匹配的测试用例
    -f, --fgrep <string>        只执行测试用例的名称中含有string的测试用例
    -gc, --expose-gc            展示垃圾回收的log内容
    -i, --invert                只运行不符合条件的测试用例，必须和--grep或--fgrep之一同时运行
    -r, --require <name>        require指定模块
    -s, --slow <ms>             指定slow的时间，单位是ms，默认是75ms
    -t, --timeout <ms>          指定超时时间，单位是ms，默认是200ms
    -u, --ui <name>             指定user-interface (bdd|tdd|exports)中的一种
    -w, --watch                 用来监视指定的测试脚本。只要测试脚本有变化，就会自动运行Mocha
    --check-leaks               检测全局变量造成的内存泄漏问题
    --full-trace                展示完整的错误栈信息
    --compilers <ext>:<module>,...  使用给定的模块来编译文件
    --debug-brk                 启用nodejs的debug模式
    --es_staging                启用全部staged特性
    --harmony<_classes,_generators,...>     all node --harmony* flags are available
    --preserve-symlinks                     告知模块加载器在解析和缓存模块的时候，保留模块本身的软链接信息
    --icu-data-dir                          include ICU data
    --inline-diffs              用内联的方式展示actual/expected之间的不同
    --inspect                   激活chrome浏览器的控制台
    --interfaces                展示所有可用的接口
    --no-deprecation            不展示warning信息
    --no-exit                   require a clean shutdown of the event loop: mocha will not call process.exit
    --no-timeouts               禁用超时功能
    --opts <path>               定义option文件路径 
    --perf-basic-prof           启用linux的分析功能
    --prof                      打印出统计分析信息
    --recursive                 包含子目录中的测试用例
    --reporters                 展示所有可以使用的测试报告的名称
    --retries <times>           设置对于失败的测试用例的尝试的次数
    --throw-deprecation         无论任何时候使用过时的函数都抛出一个异常
    --trace                     追踪函数的调用过程
    --trace-deprecation         展示追踪错误栈
    --use_strict                强制使用严格模式
    --watch-extensions <ext>,... --watch监控的扩展 
    --delay                     异步测试用例的延迟时间" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">Options:

    -h, --help                  输出帮助信息
    -V, --version               输出mocha的版本号
    -A, --async-only            强制所有的测试用例必须使用callback或者返回一个promise的格式来确定异步的正确性
    -c, --colors                在报告中显示颜色
    -C, --no-colors             在报告中禁止显示颜色
    -g, --growl                 在桌面上显示测试报告的结果
    -O, --reporter-options &lt;k=v,k2=v2,...&gt;  设置报告的基本选项
    -R, --reporter &lt;name&gt;       指定测试报告的格式
    -S, --sort                  对测试文件进行排序
    -b, --bail                  在第一个测试没有通过的时候就停止执行后面所有的测试
    <span class="hljs-_">-d</span>, --debug                 启用node的debugger功能
    -g, --grep &lt;pattern&gt;        用于搜索测试用例的名称，然后只执行匹配的测试用例
    <span class="hljs-_">-f</span>, --fgrep &lt;string&gt;        只执行测试用例的名称中含有string的测试用例
    -gc, --expose-gc            展示垃圾回收的<span class="hljs-built_in">log</span>内容
    -i, --invert                只运行不符合条件的测试用例，必须和--grep或--fgrep之一同时运行
    -r, --require &lt;name&gt;        require指定模块
    <span class="hljs-_">-s</span>, --slow &lt;ms&gt;             指定slow的时间，单位是ms，默认是75ms
    -t, --timeout &lt;ms&gt;          指定超时时间，单位是ms，默认是200ms
    -u, --ui &lt;name&gt;             指定user-interface (bdd|tdd|exports)中的一种
    -w, --watch                 用来监视指定的测试脚本。只要测试脚本有变化，就会自动运行Mocha
    --check-leaks               检测全局变量造成的内存泄漏问题
    --full-trace                展示完整的错误栈信息
    --compilers &lt;ext&gt;:&lt;module&gt;,...  使用给定的模块来编译文件
    --debug-brk                 启用nodejs的debug模式
    --es_staging                启用全部staged特性
    --harmony&lt;_classes,_generators,...&gt;     all node --harmony* flags are available
    --preserve-symlinks                     告知模块加载器在解析和缓存模块的时候，保留模块本身的软链接信息
    --icu-data-dir                          include ICU data
    --inline-diffs              用内联的方式展示actual/expected之间的不同
    --inspect                   激活chrome浏览器的控制台
    --interfaces                展示所有可用的接口
    --no-deprecation            不展示warning信息
    --no-exit                   require a clean shutdown of the event loop: mocha will not call process.exit
    --no-timeouts               禁用超时功能
    --opts &lt;path&gt;               定义option文件路径 
    --perf-basic-prof           启用linux的分析功能
    --prof                      打印出统计分析信息
    --recursive                 包含子目录中的测试用例
    --reporters                 展示所有可以使用的测试报告的名称
    --retries &lt;<span class="hljs-built_in">times</span>&gt;           设置对于失败的测试用例的尝试的次数
    --throw-deprecation         无论任何时候使用过时的函数都抛出一个异常
    --trace                     追踪函数的调用过程
    --trace-deprecation         展示追踪错误栈
    --use_strict                强制使用严格模式
    --watch-extensions &lt;ext&gt;,... --watch监控的扩展 
    --delay                     异步测试用例的延迟时间</code></pre>
<h4>About Babel</h4>
<p>如果你在js文件中使用了es6的模块，你可以<code>npm install --save-dev babel-register</code>，然后使用--require选项<code> mocha --require babel-register</code>。如果你指定了文件的后缀名，--compilers选项也是必需的。</p>
<h4>-b, --bail</h4>
<p>如果你只对第一个异常感兴趣，可以使用这个选项。</p>
<h4>-d, --debug</h4>
<p>启用nodejs的debug功能。这个选项会用<code>node debug &lt;file&gt;</code>的模式运行你的脚本，所以会在<code>debugger</code>语句处暂停执行。这个选项和mocha debug以及mocha --debug是不同的；mocha debug将会唤起nodejs默认的debug客户端，mocha --debug也可以使用不同的接口，比如－－Blink的控制台工具。</p>
<h4>--globals names</h4>
<p>names是一个逗号分隔的列表，例如，假设你的app需要使用全局变量<code>app</code>和<code>YUI</code>，这个时候你就可以使用<code>--global app, YUI</code>了。names也可以是一个通配符。比如，--global '*bar'将会匹配foobar，barbar等。参数传入 * 的话，会忽略所有全局变量。</p>
<h4>--check-leaks</h4>
<p>默认情况下，mocha并不会去检查应用暴露出来的全局变量，加上这个配置后就会去检查，此时某全局变量如果没有用上面的--GLOBALS去配置为可接受，mocha就会报错。</p>
<h4>-r, --require module-name</h4>
<p>这个命令可以引入一些测试运行时候所必需的依赖。比如should.js，通过这个选项你不需要在每个文件使用require('should')来添加should.js了。也可以用--require ./test/helper.js这样的命令去引入指定的本地模块。<br>但是，如果要引用模块导出的对象，还是需要require，var should = require('should')这样搞。</p>
<h4>-u, --ui name</h4>
<p>用来指定测试所使用的接口，默认是'bdd'。</p>
<h4>-R, --reporter name</h4>
<p>这个命令用于指定报告的格式。默认是spec。这个选项也可以用于指定使用第三方的报告样式。例如，在<code>npm install mocha-lcov-reporter</code>后，就可以使用<code>--reporter mocha-lcov-reporter</code>来指定报告格式。</p>
<h4>-t, --timeout ms</h4>
<p>用来指定用例超时时间。单位是ms，默认是2s。可以直接使用带单位的时间来覆盖掉默认的单位。例如：--timeout 2s和--timeout 2000是一样的。</p>
<h4>-s, --slow ms</h4>
<p>用来指定慢用例判定时间，默认是75ms。</p>
<h4>-g, --grep</h4>
<p>参数用于搜索测试用例的名称（即it块的第一个参数），然后只执行匹配的测试用例。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="describe('api', function() {
  describe('GET /api/users', function() {
    it('respond with an array of users', function() {
      // ...
    });
  });
});

describe('app', function() {
  describe('GET /users', function() {
    it('respond with an array of users', function() {
      // ...
    });
  });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">describe(<span class="hljs-string">'api'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  describe(<span class="hljs-string">'GET /api/users'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    it(<span class="hljs-string">'respond with an array of users'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-comment">// ...</span>
    });
  });
});

describe(<span class="hljs-string">'app'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  describe(<span class="hljs-string">'GET /users'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    it(<span class="hljs-string">'respond with an array of users'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-comment">// ...</span>
    });
  });
});</code></pre>
<p>当我们使用<code>--grep api</code>或者<code>--grep app</code>只能运行其中一个对应的测试。</p>
<h3 id="articleHeader22">INTERFACES</h3>
<p>mocha的测绘接口类型指的是集中测试用例组织模式的选择。Mocha提供了<strong>BDD</strong>,<strong>TDD</strong>,<strong>Exports</strong>,<strong>QUnit</strong>和<strong>Require-style</strong>几种接口。</p>
<h4>BDD</h4>
<p>BDD测试提供了describe()，context()，it()，specify()，before()，after()，beforeEach()和afterEach()这几种函数。</p>
<p>context()是describe()的别名，二者的用法是一样的。最大的作用就是让测试的可读性更好，组织的更好。相似地，specify()是it()的别名。</p>
<blockquote><p>上面的所有测试都是用BDD风格的接口写的。</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="describe('Array', function() {
    before(function() {
      // ...
    });

    describe('#indexOf()', function() {
      context('when not present', function() {
        it('should not throw an error', function() {
          (function() {
            [1,2,3].indexOf(4);
          }).should.not.throw();
        });
        it('should return -1', function() {
          [1,2,3].indexOf(4).should.equal(-1);
        });
      });
      context('when present', function() {
        it('should return the index where the element first appears in the array', function() {
          [1,2,3].indexOf(3).should.equal(2);
        });
      });
    });
  });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">describe(<span class="hljs-string">'Array'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    before(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-comment">// ...</span>
    });

    describe(<span class="hljs-string">'#indexOf()'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      context(<span class="hljs-string">'when not present'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        it(<span class="hljs-string">'should not throw an error'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
          (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>].indexOf(<span class="hljs-number">4</span>);
          }).should.not.throw();
        });
        it(<span class="hljs-string">'should return -1'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
          [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>].indexOf(<span class="hljs-number">4</span>).should.equal(<span class="hljs-number">-1</span>);
        });
      });
      context(<span class="hljs-string">'when present'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        it(<span class="hljs-string">'should return the index where the element first appears in the array'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
          [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>].indexOf(<span class="hljs-number">3</span>).should.equal(<span class="hljs-number">2</span>);
        });
      });
    });
  });</code></pre>
<h4>TDD</h4>
<p>TDD风格的测试提供了suite(), test(), suiteSetup(), suiteTeardown(), setup(), 和 teardown()这几个函数:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="suite('Array', function() {
  setup(function() {
    // ...
  });

  suite('#indexOf()', function() {
    test('should return -1 when not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">suite(<span class="hljs-string">'Array'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  setup(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// ...</span>
  });

  suite(<span class="hljs-string">'#indexOf()'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    test(<span class="hljs-string">'should return -1 when not present'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      assert.equal(<span class="hljs-number">-1</span>, [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>].indexOf(<span class="hljs-number">4</span>));
    });
  });
});</code></pre>
<h4>Exports</h4>
<p>Exports 的写法有的类似于Mocha的前身<a href="https://github.com/tj/expresso" rel="nofollow noreferrer" target="_blank">expresso</a>，键 before, after, beforeEach, 和afterEach都具有特殊的含义。对象值对应的是测试集合，函数值对应的是测试用例。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  before: function() {
    // ...
  },

  'Array': {
    '#indexOf()': {
      'should return -1 when not present': function() {
        [1,2,3].indexOf(4).should.equal(-1);
      }
    }
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">before</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// ...</span>
  },

  <span class="hljs-string">'Array'</span>: {
    <span class="hljs-string">'#indexOf()'</span>: {
      <span class="hljs-string">'should return -1 when not present'</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>].indexOf(<span class="hljs-number">4</span>).should.equal(<span class="hljs-number">-1</span>);
      }
    }
  }
};</code></pre>
<h4>QUNIT</h4>
<p>QUNIT风格的测试像TDD接口一样支持suite和test函数，同时又像BDD一样支持before(), after(), beforeEach(), 和 afterEach()等钩子函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function ok(expr, msg) {
  if (!expr) throw new Error(msg);
}

suite('Array');

test('#length', function() {
  var arr = [1,2,3];
  ok(arr.length == 3);
});

test('#indexOf()', function() {
  var arr = [1,2,3];
  ok(arr.indexOf(1) == 0);
  ok(arr.indexOf(2) == 1);
  ok(arr.indexOf(3) == 2);
});

suite('String');

test('#length', function() {
  ok('foo'.length == 3);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ok</span>(<span class="hljs-params">expr, msg</span>) </span>{
  <span class="hljs-keyword">if</span> (!expr) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(msg);
}

suite(<span class="hljs-string">'Array'</span>);

test(<span class="hljs-string">'#length'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
  ok(arr.length == <span class="hljs-number">3</span>);
});

test(<span class="hljs-string">'#indexOf()'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
  ok(arr.indexOf(<span class="hljs-number">1</span>) == <span class="hljs-number">0</span>);
  ok(arr.indexOf(<span class="hljs-number">2</span>) == <span class="hljs-number">1</span>);
  ok(arr.indexOf(<span class="hljs-number">3</span>) == <span class="hljs-number">2</span>);
});

suite(<span class="hljs-string">'String'</span>);

test(<span class="hljs-string">'#length'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  ok(<span class="hljs-string">'foo'</span>.length == <span class="hljs-number">3</span>);
});</code></pre>
<h4>REQUIRE</h4>
<p>require可以使用require方法引入describe函数，同时，你可以为其设置一个别名。如果你不想再测试中出现全局变量，这个方法也是十分实用的。</p>
<p><strong>注意</strong>：这种风格的测试不能通过node命令来直接运行，因为，这里的require()方法node是不能够解析的，我们必须通过mocha来运行测试。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var testCase = require('mocha').describe;
var pre = require('mocha').before;
var assertions = require('mocha').it;
var assert = require('chai').assert;

testCase('Array', function() {
  pre(function() {
    // ...
  });

  testCase('#indexOf()', function() {
    assertions('should return -1 when not present', function() {
      assert.equal([1,2,3].indexOf(4), -1);
    });
  });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> testCase = <span class="hljs-built_in">require</span>(<span class="hljs-string">'mocha'</span>).describe;
<span class="hljs-keyword">var</span> pre = <span class="hljs-built_in">require</span>(<span class="hljs-string">'mocha'</span>).before;
<span class="hljs-keyword">var</span> assertions = <span class="hljs-built_in">require</span>(<span class="hljs-string">'mocha'</span>).it;
<span class="hljs-keyword">var</span> assert = <span class="hljs-built_in">require</span>(<span class="hljs-string">'chai'</span>).assert;

testCase(<span class="hljs-string">'Array'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  pre(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// ...</span>
  });

  testCase(<span class="hljs-string">'#indexOf()'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    assertions(<span class="hljs-string">'should return -1 when not present'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      assert.equal([<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>].indexOf(<span class="hljs-number">4</span>), <span class="hljs-number">-1</span>);
    });
  });
});</code></pre>
<h3 id="articleHeader23">REPORTERS</h3>
<p>Mocha报告会自适应终端窗口，如果终端类型非TTY类型，会禁用ANSI-escape颜色。</p>
<h4>SPEC</h4>
<p>这是默认的测试报告，输出的格式是一个嵌套的分级视图。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011362885" src="https://static.alili.tech/img/remote/1460000011362885" alt="" title="" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011362886" src="https://static.alili.tech/img/remote/1460000011362886" alt="" title="" style="cursor: pointer;"></span></p>
<h4>DOT MATRIX</h4>
<p>dot matrix视图报告使用一系列的字符来表示报告的结果，失败的测试使用红色的<code>!</code>来表示，pending测试使用蓝色的<code>,</code>来表示。慢的测试用黄色的<code>.</code>来表示。这个终端输出的内容最少。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011362887" src="https://static.alili.tech/img/remote/1460000011362887" alt="" title="" style="cursor: pointer;"></span></p>
<h4>NYAN</h4>
<p>"nyan"报告就是你所期望的那样（谜一样的解释）：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011362888" src="https://static.alili.tech/img/remote/1460000011362888" alt="" title="" style="cursor: pointer;"></span></p>
<h4>TAP</h4>
<p>The TAP reporter emits lines for a <a href="http://en.wikipedia.org/wiki/Test_Anything_Protocol" rel="nofollow noreferrer" target="_blank">Test-Anything-Protocol</a> consumer.</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011362889" src="https://static.alili.tech/img/remote/1460000011362889" alt="" title="" style="cursor: pointer;"></span></p>
<h4>LANDING STRIP</h4>
<p>landing strip飞机降落的跑道，测试报告就是像一架飞机轨道一样的视图。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011362890" src="https://static.alili.tech/img/remote/1460000011362890" alt="" title="" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011362891" src="https://static.alili.tech/img/remote/1460000011362891" alt="" title="" style="cursor: pointer;"></span></p>
<h4>LIST</h4>
<p>"list"报告就是简单的输出一个列表来显示每个测试用例是否通过或失败，对于失败的测试用例，会在下面输出详细的信息。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011362892" src="https://static.alili.tech/img/remote/1460000011362892" alt="" title="" style="cursor: pointer;"></span></p>
<h4>PROGRESS</h4>
<p>"progress"报告就是一个包含进度条的视图。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011362893" src="https://static.alili.tech/img/remote/1460000011362893" alt="" title="" style="cursor: pointer;"></span></p>
<h4>JSON</h4>
<p>json视图会输出一个json对象作为结果</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011362894" src="https://static.alili.tech/img/remote/1460000011362894" alt="" title="" style="cursor: pointer;"></span></p>
<h4>JSON STREAM</h4>
<p>输出的也是一个json，不同测试用例以换行符进行分割。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011362895" src="https://static.alili.tech/img/remote/1460000011362895" alt="" title="" style="cursor: pointer;"></span></p>
<h4>MIN</h4>
<p>这个报告只显示测试的整体情况，但是仍然会输出错误和失败的情况。和--watch选项结合使用最好。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011362896" src="https://static.alili.tech/img/remote/1460000011362896" alt="" title="" style="cursor: pointer;"></span></p>
<h4>DOC</h4>
<p>生成一个只包含html的body内容的测试报告。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011362897" src="https://static.alili.tech/img/remote/1460000011362897" alt="" title="" style="cursor: pointer;"></span></p>
<p>例如，假设你有下面的javascript代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      [1,2,3].indexOf(5).should.equal(-1);
      [1,2,3].indexOf(0).should.equal(-1);
    });
  });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">describe(<span class="hljs-string">'Array'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  describe(<span class="hljs-string">'#indexOf()'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    it(<span class="hljs-string">'should return -1 when the value is not present'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>].indexOf(<span class="hljs-number">5</span>).should.equal(<span class="hljs-number">-1</span>);
      [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>].indexOf(<span class="hljs-number">0</span>).should.equal(<span class="hljs-number">-1</span>);
    });
  });
});</code></pre>
<p>通过<code>mocha --reporter doc array</code>会生成如下的报告：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<section class=&quot;suite&quot;>
  <h1>Array</h1>
  <dl>
    <section class=&quot;suite&quot;>
      <h1>#indexOf()</h1>
      <dl>
      <dt>should return -1 when the value is not present</dt>
      <dd><pre><code>[1,2,3].indexOf(5).should.equal(-1);
[1,2,3].indexOf(0).should.equal(-1);</code></pre></dd>
      </dl>
    </section>
  </dl>
</section>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">section</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"suite"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Array<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">dl</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">section</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"suite"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>#indexOf()<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">dl</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">dt</span>&gt;</span>should return -1 when the value is not present<span class="hljs-tag">&lt;/<span class="hljs-name">dt</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">dd</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">pre</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">code</span>&gt;</span>[1,2,3].indexOf(5).should.equal(-1);
[1,2,3].indexOf(0).should.equal(-1);<span class="hljs-tag">&lt;/<span class="hljs-name">code</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">pre</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">dd</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">dl</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">dl</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span></code></pre>
<h4>MARKDOWN</h4>
<p>"markdown"格式的报告会给你的测试用例生成一个markdown内容。如果你想使用github wiki或者生成一个github能够渲染的markdown文件，这种格式十分有用。这有一个例子<a href="https://github.com/senchalabs/connect/blob/90a725343c2945aaee637e799b1cd11e065b2bff/tests.md" rel="nofollow noreferrer" target="_blank">test output</a></p>
<h4>HTML</h4>
<p>只有在浏览器中使用Mocha的时候才能生成这种报告。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011362898" src="https://static.alili.tech/img/remote/1460000011362898" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h4>UNDOCUMENTED REPORTERS</h4>
<p>"XUnit"类型的报告也是可以使用的。默认情况下，只会在console控制台中输出。为了将报告写入一个文件中，使用<code>--reporter-options output=filename.xml</code></p>
<h4>THIRD PARTY REPORTERS</h4>
<p>Mocha也可以使用第三方报告生成器，具体的件<a href="https://github.com/mochajs/mocha/wiki/Third-party-reporters" rel="nofollow noreferrer" target="_blank">文档</a></p>
<h3 id="articleHeader24">RUNNING MOCHA IN THE BROWSER</h3>
<p>Mocha可以在浏览器中使用。每次Mocha发版，都会生成一个新的./mocha.js和./mocha.css文件，以便在浏览器中使用。</p>
<h4>BROWSER-SPECIFIC METHODS</h4>
<p>下面的方法只能在浏览器中使用。</p>
<p><code>mocha.allowUncaught()</code>：未捕获的错误不会被抛出。</p>
<p>下面是一个典型的例子。在加载测试脚本之前，使用mocha.setup('bdd')函数把测试模式设置为BDD接口，测试脚本加载完之后用mocha.run()函数来运行测试。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<html>
<head>
  <meta charset=&quot;utf-8&quot;>
  <title>Mocha Tests</title>
  <link href=&quot;https://cdn.rawgit.com/mochajs/mocha/2.2.5/mocha.css&quot; rel=&quot;stylesheet&quot; />
</head>
<body>
  <div id=&quot;mocha&quot;></div>

  <script src=&quot;https://cdn.rawgit.com/jquery/jquery/2.1.4/dist/jquery.min.js&quot;></script>
  <script src=&quot;https://cdn.rawgit.com/Automattic/expect.js/0.3.1/index.js&quot;></script>
  <script src=&quot;https://cdn.rawgit.com/mochajs/mocha/2.2.5/mocha.js&quot;></script>

  <script>mocha.setup('bdd')</script>
  <script src=&quot;test.array.js&quot;></script>
  <script src=&quot;test.object.js&quot;></script>
  <script src=&quot;test.xhr.js&quot;></script>
  <script>
    mocha.checkLeaks();
    mocha.globals(['jQuery']);
    mocha.run();
  </script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Mocha Tests<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://cdn.rawgit.com/mochajs/mocha/2.2.5/mocha.css"</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"mocha"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.rawgit.com/jquery/jquery/2.1.4/dist/jquery.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.rawgit.com/Automattic/expect.js/0.3.1/index.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.rawgit.com/mochajs/mocha/2.2.5/mocha.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">mocha.setup(<span class="hljs-string">'bdd'</span>)</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"test.array.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"test.object.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"test.xhr.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    mocha.checkLeaks();
    mocha.globals([<span class="hljs-string">'jQuery'</span>]);
    mocha.run();
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<h4>GREP</h4>
<p>浏览器中可以通过在url后边加?grep=api参数，来使用grep命令。</p>
<h4>BROWSER CONFIGURATION</h4>
<p>可以通过mocha.setup()方法来设置配置:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Use &quot;tdd&quot; interface.  This is a shortcut to setting the interface;
// any other options must be passed via an object.
mocha.setup('tdd');

// This is equivalent to the above.
mocha.setup({
  ui: 'tdd'
});

// Use &quot;tdd&quot; interface, ignore leaks, and force all tests to be asynchronous
mocha.setup({
  ui: 'tdd',
  ignoreLeaks: true,
  asyncOnly: true
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// Use "tdd" interface.  This is a shortcut to setting the interface;</span>
<span class="hljs-comment">// any other options must be passed via an object.</span>
mocha.setup(<span class="hljs-string">'tdd'</span>);

<span class="hljs-comment">// This is equivalent to the above.</span>
mocha.setup({
  <span class="hljs-attr">ui</span>: <span class="hljs-string">'tdd'</span>
});

<span class="hljs-comment">// Use "tdd" interface, ignore leaks, and force all tests to be asynchronous</span>
mocha.setup({
  <span class="hljs-attr">ui</span>: <span class="hljs-string">'tdd'</span>,
  <span class="hljs-attr">ignoreLeaks</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">asyncOnly</span>: <span class="hljs-literal">true</span>
});</code></pre>
<h4>BROWSER-SPECIFIC OPTION(S)</h4>
<p>下面的选项只能在浏览器中使用。</p>
<p><code>noHighlighting</code>：如果为true，在输出结果中语法不会高亮。</p>
<h4>MOCHA.OPTS</h4>
<p>在服务端运行的时候，mocha会去加载test目录下的mocha.opts文件，来读取mocha配置项。这个配置文件中的每一行代表一项配置。如果运行mocha命令的时候，带上的配置参数与这个配置文件中的配置冲突的话，以命令中的为准。</p>
<p>假设你有如下的mocha.opt文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="-- require should
-- reporter dot
-- ui bdd" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">-- require should
-- reporter dot
-- ui bdd</code></pre>
<p>上面的配置就会让mocha 引入一下should模块、报告样式设置为dot，并且使用bdd的测试接口。在这个基础上，运行mocha的时候也可以添加一些额外的参数，比如添加<code>--Growl</code>选项同时更改报告样式为list风格：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ mocha --reporter list --growl" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">$ mocha --reporter list --growl</code></pre>
<h3 id="articleHeader25">THE TEST/ DIRECTORY</h3>
<p>默认情况下，Mocha会搜索<code>./test/*.js</code>和<code>./test/*.coffee</code>，所以，你可以把你的测试放在<code>test/</code>文件夹下面。</p>
<h3 id="articleHeader26">EXAMPLES</h3>
<ul>
<li><a href="https://github.com/visionmedia/express/tree/master/test" rel="nofollow noreferrer" target="_blank">Express</a></li>
<li><a href="https://github.com/senchalabs/connect/tree/master/test" rel="nofollow noreferrer" target="_blank">Connect</a></li>
<li><a href="https://github.com/visionmedia/superagent/tree/master/test/node" rel="nofollow noreferrer" target="_blank">SuperAgent</a></li>
<li><a href="https://github.com/LearnBoost/websocket.io/tree/master/test" rel="nofollow noreferrer" target="_blank">WebSocket.io</a></li>
<li><a href="https://github.com/mochajs/mocha/tree/master/test" rel="nofollow noreferrer" target="_blank">Mocha</a></li>
</ul>
<h3 id="articleHeader27">TESTING MOCHA</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ cd /path/to/mocha
$ npm install
$ npm test" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">$ <span class="hljs-built_in">cd</span> /path/to/mocha
$ npm install
$ npm <span class="hljs-built_in">test</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Mocha中文文档

## 原文链接
[https://segmentfault.com/a/1190000011362879](https://segmentfault.com/a/1190000011362879)

