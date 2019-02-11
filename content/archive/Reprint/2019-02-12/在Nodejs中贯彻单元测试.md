---
title: '在Nodejs中贯彻单元测试' 
date: 2019-02-12 2:30:12
hidden: true
slug: psrtszbg0z9
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>原文链接：<a href="http://huang-jerryc.com/2015/07/30/%E5%9C%A8Nodejs%E4%B8%AD%E8%B4%AF%E5%BD%BB%E5%8D%95%E5%85%83%E6%B5%8B%E8%AF%95/" rel="nofollow noreferrer" target="_blank">BlueSun | 在Nodejs中贯彻单元测试</a></p></blockquote>
<p>在团队合作中，你写好了一个函数，供队友使用，跑去跟你的队友说，你传个A值进去，他就会返回B结果了。过了一会，你队友跑过来说，我传个A值却返回C结果，怎么回事？你丫的有没有测试过啊？</p>
<p>大家一起写个项目，难免会有我要写的函数里面依赖别人的函数，但是这个函数到底值不值得信赖？单元测试是衡量代码质量的一重要标准，纵观Github的受欢迎项目，都是有test文件夹，并且buliding-pass的。如果你也为社区贡献过module，想更多人使用的话，加上单元测试吧，让你的module值得别人信赖。</p>
<p>要在Nodejs中写单元测试的话，你需要知道用什么测试框架，怎么测试异步函数，怎么测试私有方法，怎么模拟测试环境，怎么测试依赖HTTP协议的web应用，需要了解TDD和BDD，还有需要提供测试的覆盖率。</p>
<blockquote><p>本文的示例代码会备份到 Github : <a href="https://github.com/JerryC8080/unittest-demo" rel="nofollow noreferrer" target="_blank">unittest-demo</a></p></blockquote>
<h2 id="articleHeader0">目录</h2>
<ol>
<li><p>测试框架</p></li>
<li><p>断言库</p></li>
<li><p>需求变更</p></li>
<li><p>异步测试</p></li>
<li><p>异常测试</p></li>
<li><p>测试私有方法</p></li>
<li><p>测试Web应用</p></li>
<li><p>覆盖率</p></li>
<li><p>使用Makefile把测试串起来</p></li>
<li><p>持续集成，Travis-cli</p></li>
<li><p>一些观点</p></li>
<li><p>彩蛋</p></li>
<li><p>整理</p></li>
</ol>
<h2 id="articleHeader1">测试框架</h2>
<p>Nodejs的测试框架还用说？大家都在用，Mocha。</p>
<p>Mocha 是一个功能丰富的Javascript测试框架，它能运行在Node.js和浏览器中，支持<strong>BDD</strong>、<strong>TDD</strong>、<strong>QUnit</strong>、<strong>Exports</strong>式的测试，本文主要示例是使用更接近与思考方式的BDD，如果了解更多可以访问Mocha的<a href="http://mochajs.org/" rel="nofollow noreferrer" target="_blank">官网</a></p>
<h4></h4>
<h4>测试接口</h4>
<p>Mocha的BDD接口有：</p>
<ul>
<li><p><code>describe()</code></p></li>
<li><p><code>it()</code></p></li>
<li><p><code>before()</code></p></li>
<li><p><code>after()</code></p></li>
<li><p><code>beforeEach()</code></p></li>
<li><p><code>afterEach()</code></p></li>
</ul>
<h4>安装</h4>
<p><code>npm install mocha -g</code></p>
<h4>编写一个稳定可靠的模块</h4>
<p>模块具备limit方法，输入一个数值，小于0的时候返回0，其余正常返回</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="exports.limit = function (num) {
  if (num < 0) {
    return 0;
  }
  return num;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">exports.limit = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">num</span>) </span>{
  <span class="hljs-keyword">if</span> (num &lt; <span class="hljs-number">0</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>;
  }
  <span class="hljs-keyword">return</span> num;
};</code></pre>
<h4>目录分配</h4>
<ul>
<li><p><code>lib</code>，存放模块代码的地方</p></li>
<li><p><code>test</code>，存放单元测试代码的地方</p></li>
<li><p><code>index.js</code>，向外导出模块的地方</p></li>
<li><p><code>package.json</code>，包描述文件</p></li>
</ul>
<h4>测试</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var lib = require('index');

describe('module', function () {
  describe('limit', function () {
    it('limit should success', function () {
      lib.limit(10);
    });
  });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> lib = <span class="hljs-built_in">require</span>(<span class="hljs-string">'index'</span>);

describe(<span class="hljs-string">'module'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  describe(<span class="hljs-string">'limit'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    it(<span class="hljs-string">'limit should success'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      lib.limit(<span class="hljs-number">10</span>);
    });
  });
});</code></pre>
<h4>结果</h4>
<p>在当前目录下执行<code>mocha</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ mocha

  ․

  ✔ 1 test complete (2ms)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>$ mocha

  ․

  ✔ <span class="hljs-number">1</span> test complete (<span class="hljs-number">2</span>ms)</code></pre>
<h2 id="articleHeader2">断言库</h2>
<p>上面的代码只是运行了代码，并没有对结果进行检查，这时候就要用到断言库了，Node.js中常用的断言库有：</p>
<ul>
<li><p>should.js</p></li>
<li><p>expect.js</p></li>
<li><p>chai</p></li>
</ul>
<h4>加上断言</h4>
<p>使用<code>should</code>库为测试用例加上断言</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="it('limit should success', function () {
  lib.limit(10).should.be.equal(10);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">it(<span class="hljs-string">'limit should success'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  lib.limit(<span class="hljs-number">10</span>).should.be.equal(<span class="hljs-number">10</span>);
});</code></pre>
<h2 id="articleHeader3">需求变更</h2>
<p>需求变更啦：&nbsp;<code>limit</code>这个方法还要求返回值大于100时返回100。</p>
<p>针对需求重构代码之后，正是测试用例的价值所在了，</p>
<p>它能确保你的改动对原有成果没有造成破坏。</p>
<p>但是，你要多做的一些工作的是，需要为新的需求编写新的测试代码。</p>
<h2 id="articleHeader4">异步测试</h2>
<h4>测试异步回调</h4>
<p>lib库中新增async函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="exports.async = function (callback) {
  setTimeout(function () {
    callback(10);
  }, 10);
};    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">exports.async = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">callback</span>) </span>{
  setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    callback(<span class="hljs-number">10</span>);
  }, <span class="hljs-number">10</span>);
};    </code></pre>
<p>测试异步代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="describe('async', function () {
  it('async', function (done) {
    lib.async(function (result) {
      done();
    });
  });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">describe(<span class="hljs-string">'async'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  it(<span class="hljs-string">'async'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">done</span>) </span>{
    lib.async(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">result</span>) </span>{
      done();
    });
  });
});</code></pre>
<h4>测试Promise</h4>
<p>使用should提供的Promise断言接口:</p>
<ul>
<li><p><code>finally</code> | <code>eventually</code></p></li>
<li><p><code>fulfilled</code></p></li>
<li><p><code>fulfilledWith</code></p></li>
<li><p><code>rejected</code></p></li>
<li><p><code>rejectedWith</code></p></li>
<li><p><code>then</code></p></li>
</ul>
<p>测试代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="describe('should', function () {
  describe('#Promise', function () {
    it('should.reject', function () {
      (new Promise(function (resolve, reject) {
        reject(new Error('wrong'));
      })).should.be.rejectedWith('wrong');
    });

    it('should.fulfilled', function () {
      (new Promise(function (resolve, reject) {
        resolve({username: 'jc', age: 18, gender: 'male'})
      })).should.be.fulfilled().then(function (it) {
          it.should.have.property('username', 'jc');
        })
    });
  });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">describe(<span class="hljs-string">'should'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  describe(<span class="hljs-string">'#Promise'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    it(<span class="hljs-string">'should.reject'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      (<span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve, reject</span>) </span>{
        reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'wrong'</span>));
      })).should.be.rejectedWith(<span class="hljs-string">'wrong'</span>);
    });

    it(<span class="hljs-string">'should.fulfilled'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      (<span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve, reject</span>) </span>{
        resolve({<span class="hljs-attr">username</span>: <span class="hljs-string">'jc'</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">18</span>, <span class="hljs-attr">gender</span>: <span class="hljs-string">'male'</span>})
      })).should.be.fulfilled().then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">it</span>) </span>{
          it.should.have.property(<span class="hljs-string">'username'</span>, <span class="hljs-string">'jc'</span>);
        })
    });
  });
});</code></pre>
<h4>异步方法的超时支持</h4>
<p>Mocha的超时设定默认是2s，如果执行的测试超过2s的话，就会报timeout错误。</p>
<p>可以主动修改超时时间，有两种方法。</p>
<h4>命令行式</h4>
<p><code>mocha -t 10000</code></p>
<h4>API式</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="describe('async', function () {
  this.timeout(10000);
  it('async', function (done) {
    lib.async(function (result) {
      done();
    });
  });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">describe(<span class="hljs-string">'async'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">this</span>.timeout(<span class="hljs-number">10000</span>);
  it(<span class="hljs-string">'async'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">done</span>) </span>{
    lib.async(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">result</span>) </span>{
      done();
    });
  });
});</code></pre>
<p>这样的话<code>async</code>执行时间不超过10s，就不会报错timeout错误了。</p>
<h2 id="articleHeader5">异常测试</h2>
<p>异常应该怎么测试，现在有<code>getContent</code>方法，他会读取指定文件的内容，但是不一定会成功，会抛出异常。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="exports.getContent = function (filename, callback) {
  fs.readFile(filename, 'utf-8', callback);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">exports.getContent = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">filename, callback</span>) </span>{
  fs.readFile(filename, <span class="hljs-string">'utf-8'</span>, callback);
};</code></pre>
<p>这时候就应该模拟(mock)错误环境了</p>
<h4>简单Mock</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="describe(&quot;getContent&quot;, function () {
  var _readFile;
  before(function () {
    _readFile = fs.readFile;
    fs.readFile = function (filename, encoding, callback) {
      process.nextTick(function () {
        callback(new Error(&quot;mock readFile error&quot;));
      });
    };    
  });
  // it();
  after(function () {
    // 用完之后记得还原。否则影响其他case
    fs.readFile = _readFile;
  })
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">describe(<span class="hljs-string">"getContent"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> _readFile;
  before(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    _readFile = fs.readFile;
    fs.readFile = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">filename, encoding, callback</span>) </span>{
      process.nextTick(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        callback(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">"mock readFile error"</span>));
      });
    };    
  });
  <span class="hljs-comment">// it();</span>
  after(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// 用完之后记得还原。否则影响其他case</span>
    fs.readFile = _readFile;
  })
});</code></pre>
<h4>Mock库</h4>
<p>Mock小模块：<a href="https://github.com/fent/node-muk" rel="nofollow noreferrer" target="_blank"><code>muk</code></a> ，略微优美的写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var fs = require('fs');
var muk = require('muk');

before(function () {
  muk(fs, 'readFile', function(path, encoding, callback) {
    process.nextTick(function () {
      callback(new Error(&quot;mock readFile error&quot;));
    });
  });
});
// it();
after(function () {
  muk.restore();
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>);
<span class="hljs-keyword">var</span> muk = <span class="hljs-built_in">require</span>(<span class="hljs-string">'muk'</span>);

before(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  muk(fs, <span class="hljs-string">'readFile'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">path, encoding, callback</span>) </span>{
    process.nextTick(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      callback(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">"mock readFile error"</span>));
    });
  });
});
<span class="hljs-comment">// it();</span>
after(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  muk.restore();
});</code></pre>
<h2 id="articleHeader6">测试私有方法</h2>
<p>针对一些内部的方法，没有通过exports暴露出来，怎么测试它？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function _adding(num1, num2) {
  return num1 + num2;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_adding</span>(<span class="hljs-params">num1, num2</span>) </span>{
  <span class="hljs-keyword">return</span> num1 + num2;
}</code></pre>
<h4>通过rewire导出方法</h4>
<p>模块：<a href="http://jhnns.github.com/rewire/" rel="nofollow noreferrer" target="_blank"><code>rewire</code></a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="it('limit should return success', function () {
  var lib = rewire('../lib/index.js');
  var litmit = lib.__get__('limit');
  litmit(10);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>it(<span class="hljs-string">'limit should return success'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
  <span class="hljs-keyword">var</span> lib = rewire(<span class="hljs-string">'../lib/index.js'</span>);
  <span class="hljs-keyword">var</span> litmit = lib.__get__(<span class="hljs-string">'limit'</span>);
  litmit(<span class="hljs-number">10</span>);
});</code></pre>
<h2 id="articleHeader7">测试Web应用</h2>
<p>在开发Web项目的时候，要测试某一个API，如：<code>/user</code>，到底怎么编写测试用例呢？</p>
<p>使用：<a href="https://github.com/visionmedia/supertest" rel="nofollow noreferrer" target="_blank"><code>supertest</code></a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var express = require(&quot;express&quot;);
var request = require(&quot;supertest&quot;);
var app = express();

// 定义路由
app.get('/user', function(req, res){
  res.send(200, { name: 'jerryc' });
});

describe('GET /user', function(){
  it('respond with json', function(done){
    request(app)
      .get('/user')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err){
          done(err);
        }
        res.body.name.should.be.eql('jerryc');
        done();
      })
  });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">"express"</span>);
<span class="hljs-keyword">var</span> request = <span class="hljs-built_in">require</span>(<span class="hljs-string">"supertest"</span>);
<span class="hljs-keyword">var</span> app = express();

<span class="hljs-comment">// 定义路由</span>
app.get(<span class="hljs-string">'/user'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>)</span>{
  res.send(<span class="hljs-number">200</span>, { <span class="hljs-attr">name</span>: <span class="hljs-string">'jerryc'</span> });
});

describe(<span class="hljs-string">'GET /user'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  it(<span class="hljs-string">'respond with json'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">done</span>)</span>{
    request(app)
      .get(<span class="hljs-string">'/user'</span>)
      .set(<span class="hljs-string">'Accept'</span>, <span class="hljs-string">'application/json'</span>)
      .expect(<span class="hljs-string">'Content-Type'</span>, /json/)
      .expect(<span class="hljs-number">200</span>)
      .end(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err, res</span>) </span>{
        <span class="hljs-keyword">if</span> (err){
          done(err);
        }
        res.body.name.should.be.eql(<span class="hljs-string">'jerryc'</span>);
        done();
      })
  });
});</code></pre>
<h2 id="articleHeader8">覆盖率</h2>
<p>测试的时候，我们常常关心，是否所有代码都测试到了。</p>
<p>这个指标就叫做<a href="http://en.wikipedia.org/wiki/Code_coverage" rel="nofollow noreferrer" target="_blank">"代码覆盖率"</a>（code coverage）。它有四个测量维度。</p>
<blockquote><ul>
<li><p><strong>行覆盖率</strong>（line coverage）：是否每一行都执行了？</p></li>
<li><p><strong>函数覆盖率</strong>（function coverage）：是否每个函数都调用了？</p></li>
<li><p><strong>分支覆盖率</strong>（branch coverage）：是否每个if代码块都执行了？</p></li>
<li><p><strong>语句覆盖率</strong>（statement coverage）：是否每个语句都执行了？</p></li>
</ul></blockquote>
<p><a href="https://github.com/gotwarlost/istanbul" rel="nofollow noreferrer" target="_blank">Istanbul</a>&nbsp;是 JavaScript 程序的代码覆盖率工具。</p>
<h4>安装</h4>
<p><code>$ npm install -g istanbul</code></p>
<h4>覆盖率测试</h4>
<p>在编写过以上的测试用例之后，执行命令：</p>
<p><code>istanbul cover _mocha</code></p>
<p>就能得到覆盖率:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="JerryC% istanbul cover _mocha                                                                                                                                                                


  module
    limit
      ✓ limit should success
    async
      ✓ async
    getContent
      ✓ getContent
    add
      ✓ add

  should
    #Promise
      ✓ should.reject
      ✓ should fulfilled


  6 passing (32ms)


================== Coverage summary ======================
Statements   : 100% ( 10/10 )
Branches     : 100% ( 2/2 )
Functions    : 100% ( 5/5 )
Lines        : 100% ( 10/10 )
==========================================================" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">JerryC% istanbul cover _mocha                                                                                                                                                                


  <span class="hljs-built_in">module</span>
    limit
      ✓ limit should success
    <span class="hljs-keyword">async</span>
      ✓ <span class="hljs-keyword">async</span>
    getContent
      ✓ getContent
    add
      ✓ add

  should
    #<span class="hljs-built_in">Promise</span>
      ✓ should.reject
      ✓ should fulfilled


  <span class="hljs-number">6</span> passing (<span class="hljs-number">32</span>ms)


================== Coverage summary ======================
Statements   : <span class="hljs-number">100</span>% ( <span class="hljs-number">10</span>/<span class="hljs-number">10</span> )
Branches     : <span class="hljs-number">100</span>% ( <span class="hljs-number">2</span>/<span class="hljs-number">2</span> )
Functions    : <span class="hljs-number">100</span>% ( <span class="hljs-number">5</span>/<span class="hljs-number">5</span> )
Lines        : <span class="hljs-number">100</span>% ( <span class="hljs-number">10</span>/<span class="hljs-number">10</span> )
==========================================================</code></pre>
<p>这条命令同时还生成了一个 coverage 子目录，其中的 coverage.json 文件包含覆盖率的原始数据，coverage/lcov-report 是可以在浏览器打开的覆盖率报告，其中有详细信息，到底哪些代码没有覆盖到。</p>
<p><span class="img-wrap"><img data-src="http://xia-dev.b0.upaiyun.com/eac87dbf-4e4b-426e-80ac-7c50e1b9a1cb.jpg" src="https://static.alili.techhttp://xia-dev.b0.upaiyun.com/eac87dbf-4e4b-426e-80ac-7c50e1b9a1cb.jpg" alt="覆盖率html" title="覆盖率html" style="cursor: pointer;"></span></p>
<p>上面命令中，<code>istanbul cover</code> 命令后面跟的是 <code>_mocha</code> 命令，前面的下划线是不能省略的。</p>
<p>因为，<a href="https://github.com/gotwarlost/istanbul/issues/44" rel="nofollow noreferrer" target="_blank">mocha 和 _mocha 是两个不同的命令</a>，前者会新建一个进程执行测试，而后者是在当前进程（即 istanbul 所在的进程）执行测试，只有这样， istanbul 才会捕捉到覆盖率数据。其他测试框架也是如此，必须在同一个进程执行测试。</p>
<p>如果要向 mocha 传入参数，可以写成下面的样子。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ istanbul cover _mocha -- tests/test.sqrt.js -R spec" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">$ istanbul cover _mocha -- tests/test<span class="hljs-selector-class">.sqrt</span><span class="hljs-selector-class">.js</span> -R spec</code></pre>
<p>上面命令中，两根连词线后面的部分，都会被当作参数传入 Mocha 。如果不加那两根连词线，它们就会被当作 istanbul 的参数（参考链接<a href="http://www.clock.co.uk/blog/npm-module-code-coverage-in-2-simple-steps" rel="nofollow noreferrer" target="_blank">1</a>，<a href="http://www.vapidspace.com/coding/2014/10/29/code-coverage-metrics-with-mocha-and-istanbul/" rel="nofollow noreferrer" target="_blank">2</a>）。</p>
<h2 id="articleHeader9">使用Makefile串起项目</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="TESTS = test/*.test.js
REPORTER = spec
TIMEOUT = 10000
JSCOVERAGE = ./node_modules/jscover/bin/jscover

test:
    @NODE_ENV=test ./node_modules/mocha/bin/mocha -R $(REPORTER) -t $(TIMEOUT) $(TESTS)

test-cov: lib-cov
    @LIB_COV=1 $(MAKE) test REPORTER=dot
    @LIB_COV=1 $(MAKE) test REPORTER=html-cov > coverage.html

lib-cov:
    @rm -rf ./lib-cov
    @$(JSCOVERAGE) lib lib-cov

.PHONY: test test-cov lib-cov

make test
make test-cov
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crystal"><code>TESTS = test/*.test.js
REPORTER = spec
TIMEOUT = <span class="hljs-number">10000</span>
JSCOVERAGE = ./node_modules/jscover/bin/jscover

<span class="hljs-symbol">test:</span>
    @NODE_ENV=test ./node_modules/mocha/bin/mocha -R $(REPORTER) -t $(TIMEOUT) $(TESTS)

test-<span class="hljs-symbol">cov:</span> <span class="hljs-class"><span class="hljs-keyword">lib</span>-<span class="hljs-title">cov</span></span>
    @LIB_COV=<span class="hljs-number">1</span> $(MAKE) test REPORTER=dot
    @LIB_COV=<span class="hljs-number">1</span> $(MAKE) test REPORTER=html-cov &gt; coverage.html

<span class="hljs-class"><span class="hljs-keyword">lib</span>-<span class="hljs-title">cov</span>:</span>
    @rm -rf ./<span class="hljs-class"><span class="hljs-keyword">lib</span>-<span class="hljs-title">cov</span></span>
    @$(JSCOVERAGE) <span class="hljs-class"><span class="hljs-keyword">lib</span> <span class="hljs-title">lib</span>-<span class="hljs-title">cov</span></span>

.<span class="hljs-symbol">PHONY:</span> test test-cov <span class="hljs-class"><span class="hljs-keyword">lib</span>-<span class="hljs-title">cov</span></span>

make test
make test-cov
</code></pre>
<p>用项目自身的jscover和mocha，避免版本冲突和混乱</p>
<h2 id="articleHeader10">持续集成，Travis-cli</h2>
<ul><li>
<p><a href="https://travis-ci.org/" rel="nofollow noreferrer" target="_blank">Travis-ci</a></p>
<ul>
<li><p>绑定Github帐号</p></li>
<li><p>在Github仓库的Admin打开Services hook</p></li>
<li><p>打开Travis</p></li>
<li><p>每次push将会hook触发执行<code>npm test</code>命令</p></li>
</ul>
</li></ul>
<p>注意：Travis会将未描述的项目当作Ruby项目。所以需要在根目录下加入<code>.travis.yml</code>文件。内容如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="language: node_js
node_js:
  - &quot;0.12&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="yaml hljs"><code class="yaml"><span class="hljs-attr">language:</span> <span class="hljs-string">node_js</span>
<span class="hljs-attr">node_js:</span>
<span class="hljs-bullet">  -</span> <span class="hljs-string">"0.12"</span></code></pre>
<p>Travis-cli还会对项目颁发标签，</p>
<p><span class="img-wrap"><img data-src="https://camo.githubusercontent.com/f479d6cf4ac300093da5a90d70565cebf8c8ed40/68747470733a2f2f7365637572652e7472617669732d63692e6f72672f4a61636b736f6e5469616e2f626167706970652e706e67" src="https://static.alili.techhttps://camo.githubusercontent.com/f479d6cf4ac300093da5a90d70565cebf8c8ed40/68747470733a2f2f7365637572652e7472617669732d63692e6f72672f4a61636b736f6e5469616e2f626167706970652e706e67" alt="/" title="/" style="cursor: pointer;"></span>or&nbsp;<span class="img-wrap"><img data-src="https://camo.githubusercontent.com/08478cd5a732822aec47e6e60d5f823ef0898dec/68747470733a2f2f7365637572652e7472617669732d63692e6f72672f54424544502f64617461766a732e706e67" src="https://static.alili.techhttps://camo.githubusercontent.com/08478cd5a732822aec47e6e60d5f823ef0898dec/68747470733a2f2f7365637572652e7472617669732d63692e6f72672f54424544502f64617461766a732e706e67" alt="/" title="/" style="cursor: pointer;"></span></p>
<p>如果项目通过所有测试，就会build-passing，</p>
<p>如果项目没有通过所有测试，就会build-failing</p>
<h2 id="articleHeader11">一些观点</h2>
<p>实施单元测试的时候, 如果没有一份经过实践证明的详细规范, 很难掌握测试的 "度", 范围太小施展不开, 太大又侵犯 "别人的" 地盘. 上帝的归上帝, 凯撒的归凯撒, 给单元测试念念紧箍咒不见得是件坏事, 反而更有利于发挥单元测试的威力, 为代码重构和提高代码质量提供动力.</p>
<p>这份文档来自 Geotechnical, 是一份非常难得的经验准则. 你完全可以以这份准则作为模板, 结合所在团队的经验, 整理出一份内部单元测试准则.</p>
<p><a href="https://github.com/yangyubo/zh-unit-testing-guidelines" rel="nofollow noreferrer" target="_blank">单元测试准则</a></p>
<h2 id="articleHeader12">彩蛋</h2>
<p>最后，介绍一个库：<a href="https://github.com/Marak/Faker.js" rel="nofollow noreferrer" target="_blank"><code>faker</code></a></p>
<p>他是一个能伪造用户数据的库，包括用户常包含的属性：个人信息、头像、地址等等。</p>
<p>是一个开发初期，模拟用户数据的绝佳好库。</p>
<p>支持Node.js和浏览器端。</p>
<p><span class="img-wrap"><img data-src="http://xia-dev.b0.upaiyun.com/43075e5e-026f-4acb-a51f-a998cf1a6e11.jpg" src="https://static.alili.techhttp://xia-dev.b0.upaiyun.com/43075e5e-026f-4acb-a51f-a998cf1a6e11.jpg" alt="生成用户" title="生成用户" style="cursor: pointer;"></span></p>
<h2 id="articleHeader13">整理</h2>
<h4>Nodejs的单元测试工具</h4>
<ol>
<li><p>测试框架 mocha</p></li>
<li><p>断言库：should.js、expect.js、chai</p></li>
<li><p>覆盖率：istanbul、jscover、blanket</p></li>
<li><p>Mock库：muk</p></li>
<li><p>测试私有方法：rewire</p></li>
<li><p>Web测试：supertest</p></li>
<li><p>持续集成：Travis-cli</p></li>
</ol>
<h2 id="articleHeader14">参考</h2>
<ul>
<li><p><a href="https://github.com/JacksonTian/unittesting" rel="nofollow noreferrer" target="_blank">https://github.com/JacksonTian/unittesting</a></p></li>
<li><p><a href="http://html5ify.com/unittesting/slides/index.html" rel="nofollow noreferrer" target="_blank">]()[http://html5ify.com/unittesting/slides/index.html</a></p></li>
<li><p><a href="http://www.ruanyifeng.com/blog/2015/06/istanbul.html" rel="nofollow noreferrer" target="_blank">http://www.ruanyifeng.com/blog/2015/06/istanbul.html</a></p></li>
<li><p><a href="http://coolshell.cn/articles/8209.html" rel="nofollow noreferrer" target="_blank">http://coolshell.cn/articles/8209.html</a></p></li>
<li><p><a href="http://stackoverflow.com/questions/153234/how-deep-are-your-unit-tests" rel="nofollow noreferrer" target="_blank">http://stackoverflow.com/questions/153234/how-deep-are-your-unit-tests</a></p></li>
<li><p><a href="https://github.com/yangyubo/zh-unit-testing-guidelines" rel="nofollow noreferrer" target="_blank">https://github.com/yangyubo/zh-unit-testing-guidelines</a></p></li>
<li><p><a href="http://www.codedata.com.tw/java/unit-test-the-way-changes-my-programming" rel="nofollow noreferrer" target="_blank">http://www.codedata.com.tw/java/unit-test-the-way-changes-my-programming</a></p></li>
<li><p><a href="http://wiki.ubuntu.org.cn/%E8%B7%9F%E6%88%91%E4%B8%80%E8%B5%B7%E5%86%99Makefile:MakeFile%E4%BB%8B%E7%BB%8D" rel="nofollow noreferrer" target="_blank">http://wiki.ubuntu.org.cn/%E8%B7%9F%E6%88%91%E4%B8%80%E8%B5%B7%E5%86%99Makefile:MakeFile%E4%BB%8B%E7%BB%8D</a></p></li>
<li><p><a href="https://github.com/yangyubo/zh-unit-testing-guidelines" rel="nofollow noreferrer" target="_blank">https://github.com/yangyubo/zh-unit-testing-guidelines</a></p></li>
<li><p><a href="https://github.com/visionmedia/superagent/blob/master/Makefile" rel="nofollow noreferrer" target="_blank">https://github.com/visionmedia/superagent/blob/master/Makefile</a></p></li>
</ul>
<hr>
<p>如果本文对您有用<br>请不要吝啬你们的Follow与Start<br>这会大大支持我们继续创作</p>
<p><strong>「Github」</strong><br>MZMonster ：<a href="https://github.com/MZMonster/" rel="nofollow noreferrer" target="_blank">@MZMonster</a><br>JC_Huang ：<a href="https://github.com/JerryC8080" rel="nofollow noreferrer" target="_blank">@JerryC8080</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
在Nodejs中贯彻单元测试

## 原文链接
[https://segmentfault.com/a/1190000004627859](https://segmentfault.com/a/1190000004627859)

