---
title: 'ES6 系列之 Babel 将 Async 编译成了什么样子' 
date: 2019-03-02 2:30:07
hidden: true
slug: wedm7eypuhb
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>本文就是简单介绍下 Async 语法编译后的代码。</p>
<h2 id="articleHeader1">Async</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const fetchData = (data) => new Promise((resolve) => setTimeout(resolve, 1000, data + 1))

const fetchValue = async function () {
    var value1 = await fetchData(1);
    var value2 = await fetchData(value1);
    var value3 = await fetchData(value2);
    console.log(value3)
};

fetchValue();
// 大约 3s 后输出 4" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> fetchData = <span class="hljs-function">(<span class="hljs-params">data</span>) =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve</span>) =&gt;</span> setTimeout(resolve, <span class="hljs-number">1000</span>, data + <span class="hljs-number">1</span>))

<span class="hljs-keyword">const</span> fetchValue = <span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> value1 = <span class="hljs-keyword">await</span> fetchData(<span class="hljs-number">1</span>);
    <span class="hljs-keyword">var</span> value2 = <span class="hljs-keyword">await</span> fetchData(value1);
    <span class="hljs-keyword">var</span> value3 = <span class="hljs-keyword">await</span> fetchData(value2);
    <span class="hljs-built_in">console</span>.log(value3)
};

fetchValue();
<span class="hljs-comment">// 大约 3s 后输出 4</span></code></pre>
<h2 id="articleHeader2">Babel</h2>
<p>我们直接在 Babel 官网的 <a href="https://babeljs.io/repl" rel="nofollow noreferrer" target="_blank">Try it out</a> 粘贴上述代码，然后查看代码编译成什么样子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;use strict&quot;;

function _asyncToGenerator(fn) {
  return function() {
    var gen = fn.apply(this, arguments);
    return new Promise(function(resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }
        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(
            function(value) {
              step(&quot;next&quot;, value);
            },
            function(err) {
              step(&quot;throw&quot;, err);
            }
          );
        }
      }
      return step(&quot;next&quot;);
    });
  };
}

var fetchData = function fetchData(data) {
  return new Promise(function(resolve) {
    return setTimeout(resolve, 1000, data + 1);
  });
};

var fetchValue = (function() {
  var _ref = _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee() {
      var value1, value2, value3;
      return regeneratorRuntime.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                _context.next = 2;
                return fetchData(1);

              case 2:
                value1 = _context.sent;
                _context.next = 5;
                return fetchData(value1);

              case 5:
                value2 = _context.sent;
                _context.next = 8;
                return fetchData(value2);

              case 8:
                value3 = _context.sent;

                console.log(value3);

              case 10:
              case &quot;end&quot;:
                return _context.stop();
            }
          }
        },
        _callee,
        this
      );
    })
  );

  return function fetchValue() {
    return _ref.apply(this, arguments);
  };
})();

fetchValue();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-meta">"use strict"</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_asyncToGenerator</span>(<span class="hljs-params">fn</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> gen = fn.apply(<span class="hljs-keyword">this</span>, <span class="hljs-built_in">arguments</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">step</span>(<span class="hljs-params">key, arg</span>) </span>{
        <span class="hljs-keyword">try</span> {
          <span class="hljs-keyword">var</span> info = gen[key](arg);
          <span class="hljs-keyword">var</span> value = info.value;
        } <span class="hljs-keyword">catch</span> (error) {
          reject(error);
          <span class="hljs-keyword">return</span>;
        }
        <span class="hljs-keyword">if</span> (info.done) {
          resolve(value);
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve(value).then(
            <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
              step(<span class="hljs-string">"next"</span>, value);
            },
            <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>) </span>{
              step(<span class="hljs-string">"throw"</span>, err);
            }
          );
        }
      }
      <span class="hljs-keyword">return</span> step(<span class="hljs-string">"next"</span>);
    });
  };
}

<span class="hljs-keyword">var</span> fetchData = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fetchData</span>(<span class="hljs-params">data</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve</span>) </span>{
    <span class="hljs-keyword">return</span> setTimeout(resolve, <span class="hljs-number">1000</span>, data + <span class="hljs-number">1</span>);
  });
};

<span class="hljs-keyword">var</span> fetchValue = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> _ref = _asyncToGenerator(
    <span class="hljs-comment">/*#__PURE__*/</span> regeneratorRuntime.mark(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_callee</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">var</span> value1, value2, value3;
      <span class="hljs-keyword">return</span> regeneratorRuntime.wrap(
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_callee$</span>(<span class="hljs-params">_context</span>) </span>{
          <span class="hljs-keyword">while</span> (<span class="hljs-number">1</span>) {
            <span class="hljs-keyword">switch</span> ((_context.prev = _context.next)) {
              <span class="hljs-keyword">case</span> <span class="hljs-number">0</span>:
                _context.next = <span class="hljs-number">2</span>;
                <span class="hljs-keyword">return</span> fetchData(<span class="hljs-number">1</span>);

              <span class="hljs-keyword">case</span> <span class="hljs-number">2</span>:
                value1 = _context.sent;
                _context.next = <span class="hljs-number">5</span>;
                <span class="hljs-keyword">return</span> fetchData(value1);

              <span class="hljs-keyword">case</span> <span class="hljs-number">5</span>:
                value2 = _context.sent;
                _context.next = <span class="hljs-number">8</span>;
                <span class="hljs-keyword">return</span> fetchData(value2);

              <span class="hljs-keyword">case</span> <span class="hljs-number">8</span>:
                value3 = _context.sent;

                <span class="hljs-built_in">console</span>.log(value3);

              <span class="hljs-keyword">case</span> <span class="hljs-number">10</span>:
              <span class="hljs-keyword">case</span> <span class="hljs-string">"end"</span>:
                <span class="hljs-keyword">return</span> _context.stop();
            }
          }
        },
        _callee,
        <span class="hljs-keyword">this</span>
      );
    })
  );

  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fetchValue</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> _ref.apply(<span class="hljs-keyword">this</span>, <span class="hljs-built_in">arguments</span>);
  };
})();

fetchValue();</code></pre>
<h2 id="articleHeader3">_asyncToGenerator</h2>
<p>regeneratorRuntime 相关的代码我们在 <a href="https://github.com/mqyqingfeng/Blog/issues/102" rel="nofollow noreferrer" target="_blank">《ES6 系列之 Babel 将 Generator 编译成了什么样子》</a> 中已经介绍过了，这次我们重点来看看 _asyncToGenerator 函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function _asyncToGenerator(fn) {
  return function() {
    var gen = fn.apply(this, arguments);
    return new Promise(function(resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }
        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(
            function(value) {
              step(&quot;next&quot;, value);
            },
            function(err) {
              step(&quot;throw&quot;, err);
            }
          );
        }
      }
      return step(&quot;next&quot;);
    });
  };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_asyncToGenerator</span>(<span class="hljs-params">fn</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> gen = fn.apply(<span class="hljs-keyword">this</span>, <span class="hljs-built_in">arguments</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">step</span>(<span class="hljs-params">key, arg</span>) </span>{
        <span class="hljs-keyword">try</span> {
          <span class="hljs-keyword">var</span> info = gen[key](arg);
          <span class="hljs-keyword">var</span> value = info.value;
        } <span class="hljs-keyword">catch</span> (error) {
          reject(error);
          <span class="hljs-keyword">return</span>;
        }
        <span class="hljs-keyword">if</span> (info.done) {
          resolve(value);
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve(value).then(
            <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
              step(<span class="hljs-string">"next"</span>, value);
            },
            <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>) </span>{
              step(<span class="hljs-string">"throw"</span>, err);
            }
          );
        }
      }
      <span class="hljs-keyword">return</span> step(<span class="hljs-string">"next"</span>);
    });
  };
}</code></pre>
<p>以上这段代码主要是用来实现 generator 的自动执行以及返回 Promise。</p>
<p>当我们执行 <code>fetchValue()</code> 的时候，执行的其实就是 <code>_asyncToGenerator</code> 返回的这个匿名函数，在匿名函数中，我们执行了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var gen = fn.apply(this, arguments);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> gen = fn.apply(<span class="hljs-keyword">this</span>, <span class="hljs-built_in">arguments</span>);</code></pre>
<p>这一步就相当于执行 Generator 函数，举个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}

var hw = helloWorldGenerator();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">helloWorldGenerator</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">yield</span> <span class="hljs-string">'hello'</span>;
  <span class="hljs-keyword">yield</span> <span class="hljs-string">'world'</span>;
  <span class="hljs-keyword">return</span> <span class="hljs-string">'ending'</span>;
}

<span class="hljs-keyword">var</span> hw = helloWorldGenerator();</code></pre>
<p><code>var gen = fn.apply(this, arguments)</code> 就相当于 <code>var hw = helloWorldGenerator();</code>，返回的 gen 是一个具有 next()、throw()、return() 方法的对象。</p>
<p>然后我们返回了一个 Promise 对象，在 Promise 中，我们执行了 step("next")，step 函数中会执行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="try {
  var info = gen[key](arg);
  var value = info.value;
} catch (error) {
  reject(error);
  return;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">try</span> {
  <span class="hljs-keyword">var</span> info = gen[key](arg);
  <span class="hljs-keyword">var</span> value = info.value;
} <span class="hljs-keyword">catch</span> (error) {
  reject(error);
  <span class="hljs-keyword">return</span>;
}</code></pre>
<p>step("next") 就相当于 <code>var info = gen.next()</code>，返回的 info 对象是一个具有 value 和 done 属性的对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{value: Promise, done: false}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code class="jsx" style="word-break: break-word; white-space: initial;">{<span class="hljs-attribute">value</span>: Promise, done: false}</code></pre>
<p>接下来又会执行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (info.done) {
  resolve(value);
} else {
  return Promise.resolve(value).then(
    function(value) {
      step(&quot;next&quot;, value);
    },
    function(err) {
      step(&quot;throw&quot;, err);
    }
  );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">if</span> (info.done) {
  resolve(value);
} <span class="hljs-keyword">else</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve(value).then(
    <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
      step(<span class="hljs-string">"next"</span>, value);
    },
    <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>) </span>{
      step(<span class="hljs-string">"throw"</span>, err);
    }
  );
}</code></pre>
<p>value 此时是一个 Promise，Promise.resolve(value) 依然会返回这个 Promise，我们给这个 Promise 添加了一个 then 函数，用于在 Promise 有结果时执行，有结果时又会执行 <code>step("next", value)</code>，从而使得 Generator 继续执行，直到 <code>info.done</code> 为 true，才会 <code>resolve(value)</code>。</p>
<h2 id="articleHeader4">不完整但可用的代码</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function() {
    var ContinueSentinel = {};

    var mark = function(genFun) {
        var generator = Object.create({
            next: function(arg) {
                return this._invoke(&quot;next&quot;, arg);
            }
        });
        genFun.prototype = generator;
        return genFun;
    };

    function wrap(innerFn, outerFn, self) {
        var generator = Object.create(outerFn.prototype);

        var context = {
            done: false,
            method: &quot;next&quot;,
            next: 0,
            prev: 0,
            sent: undefined,
            abrupt: function(type, arg) {
                var record = {};
                record.type = type;
                record.arg = arg;

                return this.complete(record);
            },
            complete: function(record, afterLoc) {
                if (record.type === &quot;return&quot;) {
                    this.rval = this.arg = record.arg;
                    this.method = &quot;return&quot;;
                    this.next = &quot;end&quot;;
                }

                return ContinueSentinel;
            },
            stop: function() {
                this.done = true;
                return this.rval;
            }
        };

        generator._invoke = makeInvokeMethod(innerFn, context);

        return generator;
    }

    function makeInvokeMethod(innerFn, context) {
        var state = &quot;start&quot;;

        return function invoke(method, arg) {
            if (state === &quot;completed&quot;) {
                return { value: undefined, done: true };
            }

            context.method = method;
            context.arg = arg;

            while (true) {
                state = &quot;executing&quot;;

                if (context.method === &quot;next&quot;) {
                    context.sent = context._sent = context.arg;
                }

                var record = {
                    type: &quot;normal&quot;,
                    arg: innerFn.call(self, context)
                };

                if (record.type === &quot;normal&quot;) {
                    state = context.done ? &quot;completed&quot; : &quot;yield&quot;;

                    if (record.arg === ContinueSentinel) {
                        continue;
                    }

                    return {
                        value: record.arg,
                        done: context.done
                    };
                }
            }
        };
    }

    window.regeneratorRuntime = {};

    regeneratorRuntime.wrap = wrap;
    regeneratorRuntime.mark = mark;
})();

&quot;use strict&quot;;

function _asyncToGenerator(fn) {
    return function() {
        var gen = fn.apply(this, arguments);
        return new Promise(function(resolve, reject) {
            function step(key, arg) {
                try {
                    var info = gen[key](arg);
                    var value = info.value;
                } catch (error) {
                    reject(error);
                    return;
                }
                if (info.done) {
                    resolve(value);
                } else {
                    return Promise.resolve(value).then(
                        function(value) {
                            step(&quot;next&quot;, value);
                        },
                        function(err) {
                            step(&quot;throw&quot;, err);
                        }
                    );
                }
            }
            return step(&quot;next&quot;);
        });
    };
}

var fetchData = function fetchData(data) {
    return new Promise(function(resolve) {
        return setTimeout(resolve, 1000, data + 1);
    });
};

var fetchValue = (function() {
    var _ref = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee() {
            var value1, value2, value3;
            return regeneratorRuntime.wrap(
                function _callee$(_context) {
                    while (1) {
                        switch ((_context.prev = _context.next)) {
                            case 0:
                                _context.next = 2;
                                return fetchData(1);

                            case 2:
                                value1 = _context.sent;
                                _context.next = 5;
                                return fetchData(value1);

                            case 5:
                                value2 = _context.sent;
                                _context.next = 8;
                                return fetchData(value2);

                            case 8:
                                value3 = _context.sent;

                                console.log(value3);

                            case 10:
                            case &quot;end&quot;:
                                return _context.stop();
                        }
                    }
                },
                _callee,
                this
            );
        })
    );

    return function fetchValue() {
        return _ref.apply(this, arguments);
    };
})();

fetchValue();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> ContinueSentinel = {};

    <span class="hljs-keyword">var</span> mark = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">genFun</span>) </span>{
        <span class="hljs-keyword">var</span> generator = <span class="hljs-built_in">Object</span>.create({
            <span class="hljs-attr">next</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">arg</span>) </span>{
                <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._invoke(<span class="hljs-string">"next"</span>, arg);
            }
        });
        genFun.prototype = generator;
        <span class="hljs-keyword">return</span> genFun;
    };

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">wrap</span>(<span class="hljs-params">innerFn, outerFn, self</span>) </span>{
        <span class="hljs-keyword">var</span> generator = <span class="hljs-built_in">Object</span>.create(outerFn.prototype);

        <span class="hljs-keyword">var</span> context = {
            <span class="hljs-attr">done</span>: <span class="hljs-literal">false</span>,
            <span class="hljs-attr">method</span>: <span class="hljs-string">"next"</span>,
            <span class="hljs-attr">next</span>: <span class="hljs-number">0</span>,
            <span class="hljs-attr">prev</span>: <span class="hljs-number">0</span>,
            <span class="hljs-attr">sent</span>: <span class="hljs-literal">undefined</span>,
            <span class="hljs-attr">abrupt</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">type, arg</span>) </span>{
                <span class="hljs-keyword">var</span> record = {};
                record.type = type;
                record.arg = arg;

                <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.complete(record);
            },
            <span class="hljs-attr">complete</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">record, afterLoc</span>) </span>{
                <span class="hljs-keyword">if</span> (record.type === <span class="hljs-string">"return"</span>) {
                    <span class="hljs-keyword">this</span>.rval = <span class="hljs-keyword">this</span>.arg = record.arg;
                    <span class="hljs-keyword">this</span>.method = <span class="hljs-string">"return"</span>;
                    <span class="hljs-keyword">this</span>.next = <span class="hljs-string">"end"</span>;
                }

                <span class="hljs-keyword">return</span> ContinueSentinel;
            },
            <span class="hljs-attr">stop</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                <span class="hljs-keyword">this</span>.done = <span class="hljs-literal">true</span>;
                <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.rval;
            }
        };

        generator._invoke = makeInvokeMethod(innerFn, context);

        <span class="hljs-keyword">return</span> generator;
    }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">makeInvokeMethod</span>(<span class="hljs-params">innerFn, context</span>) </span>{
        <span class="hljs-keyword">var</span> state = <span class="hljs-string">"start"</span>;

        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">invoke</span>(<span class="hljs-params">method, arg</span>) </span>{
            <span class="hljs-keyword">if</span> (state === <span class="hljs-string">"completed"</span>) {
                <span class="hljs-keyword">return</span> { <span class="hljs-attr">value</span>: <span class="hljs-literal">undefined</span>, <span class="hljs-attr">done</span>: <span class="hljs-literal">true</span> };
            }

            context.method = method;
            context.arg = arg;

            <span class="hljs-keyword">while</span> (<span class="hljs-literal">true</span>) {
                state = <span class="hljs-string">"executing"</span>;

                <span class="hljs-keyword">if</span> (context.method === <span class="hljs-string">"next"</span>) {
                    context.sent = context._sent = context.arg;
                }

                <span class="hljs-keyword">var</span> record = {
                    <span class="hljs-attr">type</span>: <span class="hljs-string">"normal"</span>,
                    <span class="hljs-attr">arg</span>: innerFn.call(self, context)
                };

                <span class="hljs-keyword">if</span> (record.type === <span class="hljs-string">"normal"</span>) {
                    state = context.done ? <span class="hljs-string">"completed"</span> : <span class="hljs-string">"yield"</span>;

                    <span class="hljs-keyword">if</span> (record.arg === ContinueSentinel) {
                        <span class="hljs-keyword">continue</span>;
                    }

                    <span class="hljs-keyword">return</span> {
                        <span class="hljs-attr">value</span>: record.arg,
                        <span class="hljs-attr">done</span>: context.done
                    };
                }
            }
        };
    }

    <span class="hljs-built_in">window</span>.regeneratorRuntime = {};

    regeneratorRuntime.wrap = wrap;
    regeneratorRuntime.mark = mark;
})();

<span class="hljs-meta">"use strict"</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_asyncToGenerator</span>(<span class="hljs-params">fn</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> gen = fn.apply(<span class="hljs-keyword">this</span>, <span class="hljs-built_in">arguments</span>);
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
            <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">step</span>(<span class="hljs-params">key, arg</span>) </span>{
                <span class="hljs-keyword">try</span> {
                    <span class="hljs-keyword">var</span> info = gen[key](arg);
                    <span class="hljs-keyword">var</span> value = info.value;
                } <span class="hljs-keyword">catch</span> (error) {
                    reject(error);
                    <span class="hljs-keyword">return</span>;
                }
                <span class="hljs-keyword">if</span> (info.done) {
                    resolve(value);
                } <span class="hljs-keyword">else</span> {
                    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve(value).then(
                        <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
                            step(<span class="hljs-string">"next"</span>, value);
                        },
                        <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>) </span>{
                            step(<span class="hljs-string">"throw"</span>, err);
                        }
                    );
                }
            }
            <span class="hljs-keyword">return</span> step(<span class="hljs-string">"next"</span>);
        });
    };
}

<span class="hljs-keyword">var</span> fetchData = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fetchData</span>(<span class="hljs-params">data</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve</span>) </span>{
        <span class="hljs-keyword">return</span> setTimeout(resolve, <span class="hljs-number">1000</span>, data + <span class="hljs-number">1</span>);
    });
};

<span class="hljs-keyword">var</span> fetchValue = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> _ref = _asyncToGenerator(
        <span class="hljs-comment">/*#__PURE__*/</span>
        regeneratorRuntime.mark(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_callee</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">var</span> value1, value2, value3;
            <span class="hljs-keyword">return</span> regeneratorRuntime.wrap(
                <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_callee$</span>(<span class="hljs-params">_context</span>) </span>{
                    <span class="hljs-keyword">while</span> (<span class="hljs-number">1</span>) {
                        <span class="hljs-keyword">switch</span> ((_context.prev = _context.next)) {
                            <span class="hljs-keyword">case</span> <span class="hljs-number">0</span>:
                                _context.next = <span class="hljs-number">2</span>;
                                <span class="hljs-keyword">return</span> fetchData(<span class="hljs-number">1</span>);

                            <span class="hljs-keyword">case</span> <span class="hljs-number">2</span>:
                                value1 = _context.sent;
                                _context.next = <span class="hljs-number">5</span>;
                                <span class="hljs-keyword">return</span> fetchData(value1);

                            <span class="hljs-keyword">case</span> <span class="hljs-number">5</span>:
                                value2 = _context.sent;
                                _context.next = <span class="hljs-number">8</span>;
                                <span class="hljs-keyword">return</span> fetchData(value2);

                            <span class="hljs-keyword">case</span> <span class="hljs-number">8</span>:
                                value3 = _context.sent;

                                <span class="hljs-built_in">console</span>.log(value3);

                            <span class="hljs-keyword">case</span> <span class="hljs-number">10</span>:
                            <span class="hljs-keyword">case</span> <span class="hljs-string">"end"</span>:
                                <span class="hljs-keyword">return</span> _context.stop();
                        }
                    }
                },
                _callee,
                <span class="hljs-keyword">this</span>
            );
        })
    );

    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fetchValue</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> _ref.apply(<span class="hljs-keyword">this</span>, <span class="hljs-built_in">arguments</span>);
    };
})();

fetchValue();</code></pre>
<p>请原谅我水了一篇文章……</p>
<h2 id="articleHeader5">ES6 系列</h2>
<p>ES6 系列目录地址：<a href="https://github.com/mqyqingfeng/Blog" rel="nofollow noreferrer" target="_blank">https://github.com/mqyqingfeng/Blog</a></p>
<p>ES6 系列预计写二十篇左右，旨在加深 ES6 部分知识点的理解，重点讲解块级作用域、标签模板、箭头函数、Symbol、Set、Map 以及 Promise 的模拟实现、模块加载方案、异步处理等内容。</p>
<p>如果有错误或者不严谨的地方，请务必给予指正，十分感谢。如果喜欢或者有所启发，欢迎 star，对作者也是一种鼓励。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES6 系列之 Babel 将 Async 编译成了什么样子

## 原文链接
[https://segmentfault.com/a/1190000016867881](https://segmentfault.com/a/1190000016867881)

