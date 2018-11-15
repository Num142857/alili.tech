---
title: 从0到1实现Promise
reprint: true
categories: reprint
abbrlink: b715e759
date: 2018-11-03 02:30:13
---

{{% raw %}}
<h1 id="articleHeader0">&#x524D;&#x8A00;</h1><p>Promise&#x5927;&#x5BB6;&#x4E00;&#x5B9A;&#x90FD;&#x4E0D;&#x964C;&#x751F;&#x4E86;&#xFF0C;JavaScript&#x5F02;&#x6B65;&#x6D41;&#x7A0B;&#x4ECE;&#x6700;&#x521D;&#x7684;Callback&#xFF0C;&#x5230;Promise&#xFF0C;&#x5230;Generator&#xFF0C;&#x518D;&#x5230;&#x76EE;&#x524D;&#x4F7F;&#x7528;&#x6700;&#x591A;&#x7684;Async/Await&#xFF08;&#x5982;&#x679C;&#x5BF9;&#x4E8E;&#x8FD9;&#x4E9B;&#x4E0D;&#x719F;&#x6089;&#x7684;&#x53EF;&#x4EE5;&#x53C2;&#x8003;&#x6211;&#x53E6;&#x4E00;&#x7BC7;&#x6587;&#x7AE0;<a href="https://segmentfault.com/a/1190000015711829">&#x300A;JavaScript&#x5F02;&#x6B65;&#x7F16;&#x7A0B;&#x300B;</a>&#xFF09;&#xFF0C;&#x8FD9;&#x4E0D;&#x4EC5;&#x4EC5;&#x662F;&#x6280;&#x672F;&#x5B9E;&#x73B0;&#x7684;&#x53D1;&#x5C55;&#xFF0C;&#x66F4;&#x662F;&#x601D;&#x60F3;&#x4E0A;&#x5BF9;&#x4E8E;&#x5982;&#x4F55;&#x63A7;&#x5236;&#x5F02;&#x6B65;&#x7684;&#x9012;&#x8FDB;&#x3002;Promise&#x4F5C;&#x4E3A;&#x540E;&#x7EED;&#x65B9;&#x6848;&#x7684;&#x57FA;&#x7840;&#xFF0C;&#x662F;&#x91CD;&#x4E2D;&#x4E4B;&#x91CD;&#xFF0C;&#x4E5F;&#x662F;&#x9762;&#x8BD5;&#x65F6;&#x5019;&#x6700;&#x5E38;&#x88AB;&#x95EE;&#x5230;&#x7684;&#x3002;</p><p>&#x4ECA;&#x5929;&#x6211;&#x4EEC;&#x5C31;&#x4E00;&#x8D77;&#x4ECE;0&#x5230;1&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x57FA;&#x4E8E;A+&#x89C4;&#x8303;&#x7684;Promise&#xFF0C;&#x8FC7;&#x7A0B;&#x4E2D;&#x4E5F;&#x4F1A;&#x5BF9;Promise&#x7684;&#x5F02;&#x5E38;&#x5904;&#x7406;&#xFF0C;&#x4EE5;&#x53CA;&#x662F;&#x5426;&#x53EF;&#x624B;&#x52A8;&#x7EC8;&#x6B62;&#x505A;&#x4E00;&#x4E9B;&#x8BA8;&#x8BBA;&#xFF0C;&#x6700;&#x540E;&#x4F1A;&#x5BF9;&#x6211;&#x4EEC;&#x5B9E;&#x73B0;&#x7684;Promise&#x505A;&#x5355;&#x5143;&#x6D4B;&#x8BD5;&#x3002;&#x5B8C;&#x6574;&#x7684;&#x4EE3;&#x7801;&#x5DF2;&#x7ECF;&#x4E0A;&#x4F20;&#x5230;github&#xFF0C;&#x60F3;&#x76F4;&#x63A5;&#x770B;&#x4EE3;&#x7801;&#x7684;&#x53EF;&#x4EE5;<a href="https://github.com/leocoder351/my-promise" rel="nofollow noreferrer" target="_blank">&#x70B9;&#x8FD9;&#x91CC;</a>&#x3002;</p><p>&#x867D;&#x7136;&#x5DF2;&#x7ECF;&#x6709;&#x5F88;&#x591A;&#x5E26;&#x4F60;&#x5B9E;&#x73B0;Promise&#x7C7B;&#x7684;&#x6587;&#x7AE0;&#x4E86;&#xFF0C;&#x4F46;&#x6BCF;&#x4E2A;&#x4EBA;&#x7406;&#x89E3;&#x7684;&#x7A0B;&#x5EA6;&#x4E0D;&#x4E00;&#x6837;&#xFF0C;&#x4E5F;&#x8BB8;&#x4E0D;&#x540C;&#x7684;&#x6587;&#x7AE0;&#x53EF;&#x4EE5;&#x5E26;&#x7ED9;&#x4F60;&#x4E0D;&#x540C;&#x7684;&#x601D;&#x8003;&#x5462;&#xFF0C;&#x90A3;&#x6211;&#x4EEC;&#x5C31;&#x5F00;&#x59CB;&#x5427;&#x3002;</p><h1 id="articleHeader1">&#x6B63;&#x6587;</h1><h3 id="articleHeader2">1. &#x57FA;&#x7840;&#x6846;&#x67B6;</h3><p>new Promise()&#x65F6;&#x63A5;&#x6536;&#x4E00;&#x4E2A;executor&#x51FD;&#x6570;&#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#xFF0C;&#x8BE5;&#x51FD;&#x6570;&#x4F1A;&#x7ACB;&#x5373;&#x6267;&#x884C;&#xFF0C;&#x51FD;&#x6570;&#x4E2D;&#x6709;&#x4E24;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x5B83;&#x4EEC;&#x4E5F;&#x662F;&#x51FD;&#x6570;&#xFF0C;&#x5206;&#x522B;&#x662F;resolve&#x548C;reject&#xFF0C;&#x51FD;&#x6570;&#x540C;&#x6B65;&#x6267;&#x884C;&#x4E00;&#x5B9A;&#x8981;&#x653E;&#x5728;try...catch&#x4E2D;&#xFF0C;&#x5426;&#x5219;&#x65E0;&#x6CD5;&#x8FDB;&#x884C;&#x9519;&#x8BEF;&#x6355;&#x83B7;&#x3002;</p><p><strong>MyPromise.js</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function MyPromise(executor) {

  function resolve(value) {

  }

  function reject(reason) {
    
  }

  try {
    executor(resolve, reject);
  } catch (reason) {
    reject(reason);
  }
}

module.exports = MyPromise;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">MyPromise</span>(<span class="hljs-params">executor</span>) </span>{

  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resolve</span>(<span class="hljs-params">value</span>) </span>{

  }

  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">reject</span>(<span class="hljs-params">reason</span>) </span>{
    
  }

  <span class="hljs-keyword">try</span> {
    executor(resolve, reject);
  } <span class="hljs-keyword">catch</span> (reason) {
    reject(reason);
  }
}

<span class="hljs-built_in">module</span>.exports = MyPromise;</code></pre><p>resolve()&#x63A5;&#x6536;Promise&#x6210;&#x529F;&#x503C;value&#xFF0C;reject&#x63A5;&#x6536;Promise&#x5931;&#x8D25;&#x539F;&#x56E0;reason&#x3002;</p><p><strong>test.js</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let MyPromise = require(&apos;./MyPromise.js&apos;);

let promise = new MyPromise(function(resolve, reject) {
  resolve(123);
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> MyPromise = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./MyPromise.js&apos;</span>);

<span class="hljs-keyword">let</span> promise = <span class="hljs-keyword">new</span> MyPromise(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
  resolve(<span class="hljs-number">123</span>);
})</code></pre><h3 id="articleHeader3">2. &#x6DFB;&#x52A0;&#x72B6;&#x6001;&#x673A;</h3><p>&#x76EE;&#x524D;&#x5B9E;&#x73B0;&#x5B58;&#x5728;&#x7684;&#x95EE;&#x9898;&#xFF1A;</p><ol><li>Promise&#x662F;&#x4E00;&#x4E2A;&#x72B6;&#x6001;&#x673A;&#x7684;&#x673A;&#x5236;&#xFF0C;&#x521D;&#x59CB;&#x72B6;&#x6001;&#x4E3A; <code>pending</code>&#xFF0C;&#x6210;&#x529F;&#x72B6;&#x6001;&#x4E3A; <code>fulfilled</code>&#xFF0C;&#x5931;&#x8D25;&#x72B6;&#x6001;&#x4E3A; <code>rejected</code>&#x3002;&#x53EA;&#x80FD;&#x4ECE; <code>pending</code> -&gt; <code>fulfilled</code>&#xFF0C;&#x6216;&#x8005;&#x4ECE; <code>pending</code> -&gt; <code>rejected</code>&#xFF0C;&#x5E76;&#x4E14;&#x72B6;&#x6001;&#x4E00;&#x65E6;&#x8F6C;&#x53D8;&#xFF0C;&#x5C31;&#x6C38;&#x8FDC;&#x4E0D;&#x4F1A;&#x518D;&#x53D8;&#x4E86;&#x3002;</li></ol><p>&#x6240;&#x4EE5;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x4E3A;Promise&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x72B6;&#x6001;&#x6D41;&#x8F6C;&#x7684;&#x673A;&#x5236;&#x3002;</p><p><strong>MyPromise.js</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const PENDING = &apos;pending&apos;;
const FULFILLED = &apos;fulfilled&apos;;
const REJECTED = &apos;rejected&apos;;

function MyPromise(executor) {
  let self = this;
  self.state = PENDING;


  function resolve(value) {
    if (self.state === PENDING) {
      self.state = FULFILLED;
    }
  }

  function reject(reason) {
    if (self.state === PENDING) {
      self.state = REJECTED;
    }
  }

  try {
    executor(resolve, reject);
  } catch (reason) {
    reject(reason);
  }
}

module.exports = MyPromise;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs pf"><code>const PENDING = &apos;pending&apos;;
const FULFILLED = &apos;fulfilled&apos;;
const REJECTED = &apos;rejected&apos;;

function MyPromise(executor) {
  let <span class="hljs-literal">self</span> = this;
  <span class="hljs-literal">self</span>.<span class="hljs-keyword">state</span> = PENDING;


  function resolve(value) {
    if (<span class="hljs-literal">self</span>.<span class="hljs-keyword">state</span> === PENDING) {
      <span class="hljs-literal">self</span>.<span class="hljs-keyword">state</span> = FULFILLED;
    }
  }

  function reject(reason) {
    if (<span class="hljs-literal">self</span>.<span class="hljs-keyword">state</span> === PENDING) {
      <span class="hljs-literal">self</span>.<span class="hljs-keyword">state</span> = REJECTED;
    }
  }

  try {
    executor(resolve, reject);
  } catch (reason) {
    reject(reason);
  }
}

module.exports = MyPromise;</code></pre><p><strong>test.js</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let MyPromise = require(&apos;./MyPromise.js&apos;);

let promise = new MyPromise(function(resolve, reject) {
  resolve(123);
});

promise.then(function(value) {
  console.log(&apos;value&apos;, value);
}, function(reason) {
  console.log(&apos;reason&apos;, reason);
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> MyPromise = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./MyPromise.js&apos;</span>);

<span class="hljs-keyword">let</span> promise = <span class="hljs-keyword">new</span> MyPromise(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
  resolve(<span class="hljs-number">123</span>);
});

promise.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;value&apos;</span>, value);
}, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">reason</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;reason&apos;</span>, reason);
})</code></pre><h3 id="articleHeader4">3. &#x6DFB;&#x52A0;<code>then</code>&#x65B9;&#x6CD5;</h3><p>Promise&#x62E5;&#x6709;&#x4E00;&#x4E2A;<code>then</code>&#x65B9;&#x6CD5;&#xFF0C;&#x63A5;&#x6536;&#x4E24;&#x4E2A;&#x51FD;&#x6570; <code>onFulfilled</code> &#x548C; <code>onRejected</code>&#xFF0C;&#x5206;&#x522B;&#x4F5C;&#x4E3A;Promise&#x6210;&#x529F;&#x548C;&#x5931;&#x8D25;&#x7684;&#x56DE;&#x8C03;&#x3002;&#x6240;&#x4EE5;&#xFF0C;&#x5728;<code>then</code>&#x65B9;&#x6CD5;&#x4E2D;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5BF9;&#x72B6;&#x6001;<code>state</code>&#x8FDB;&#x884C;&#x5224;&#x65AD;&#xFF0C;&#x5982;&#x679C;&#x662F;<code>fulfilled</code>&#xFF0C;&#x5219;&#x6267;&#x884C;<code>onFulfilled(value)</code>&#x65B9;&#x6CD5;&#xFF0C;&#x5982;&#x679C;&#x662F;<code>rejected</code>&#xFF0C;&#x5219;&#x6267;&#x884C;<code>onRejected(reason)</code>&#x65B9;&#x6CD5;&#x3002;</p><p>&#x7531;&#x4E8E;&#x6210;&#x529F;&#x503C;<code>value</code>&#x548C;&#x5931;&#x8D25;&#x539F;&#x56E0;<code>reason</code>&#x662F;&#x7531;&#x7528;&#x6237;&#x5728;<code>executor</code>&#x4E2D;&#x901A;&#x8FC7;<code>resolve(value)</code> &#x548C; <code>reject(reason)</code>&#x4F20;&#x5165;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x6709;&#x4E00;&#x4E2A;&#x5168;&#x5C40;&#x7684;<code>value</code>&#x548C;<code>reason</code>&#x4F9B;&#x540E;&#x7EED;&#x65B9;&#x6CD5;&#x83B7;&#x53D6;&#x3002;</p><p><strong>MyPromise.js</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const PENDING = &apos;pending&apos;;
const FULFILLED = &apos;fulfilled&apos;;
const REJECTED = &apos;rejected&apos;;

function MyPromise(executor) {
  let self = this;

  self.state = PENDING;
  self.value = null;
  self.reason = null;

  function resolve(value) {
    if (self.state === PENDING) {
      self.state = FULFILLED;
      self.value = value;
    }
  }

  function reject(reason) {
    if (self.state === PENDING) {
      self.state = REJECTED;
      self.reason = reason;
    }
  }

  try {
    executor(resolve, reject);
  } catch (reason) {
    reject(reason);
  }
}

MyPromise.prototype.then = function(onFuifilled, onRejected) {
  let self = this;

  if (self.state === FULFILLED) {
    onFuifilled(self.value);
  }

  if (self.state === REJECTED) {
    onRejected(self.reason);
  }
};

module.exports = MyPromise;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs pf"><code>const PENDING = &apos;pending&apos;;
const FULFILLED = &apos;fulfilled&apos;;
const REJECTED = &apos;rejected&apos;;

function MyPromise(executor) {
  let <span class="hljs-literal">self</span> = this;

  <span class="hljs-literal">self</span>.<span class="hljs-keyword">state</span> = PENDING;
  <span class="hljs-literal">self</span>.value = null;
  <span class="hljs-literal">self</span>.reason = null;

  function resolve(value) {
    if (<span class="hljs-literal">self</span>.<span class="hljs-keyword">state</span> === PENDING) {
      <span class="hljs-literal">self</span>.<span class="hljs-keyword">state</span> = FULFILLED;
      <span class="hljs-literal">self</span>.value = value;
    }
  }

  function reject(reason) {
    if (<span class="hljs-literal">self</span>.<span class="hljs-keyword">state</span> === PENDING) {
      <span class="hljs-literal">self</span>.<span class="hljs-keyword">state</span> = REJECTED;
      <span class="hljs-literal">self</span>.reason = reason;
    }
  }

  try {
    executor(resolve, reject);
  } catch (reason) {
    reject(reason);
  }
}

MyPromise.prototype.then = function(<span class="hljs-keyword">on</span>Fuifilled, <span class="hljs-keyword">on</span>Rejected) {
  let <span class="hljs-literal">self</span> = this;

  if (<span class="hljs-literal">self</span>.<span class="hljs-keyword">state</span> === FULFILLED) {
    <span class="hljs-keyword">on</span>Fuifilled(<span class="hljs-literal">self</span>.value);
  }

  if (<span class="hljs-literal">self</span>.<span class="hljs-keyword">state</span> === REJECTED) {
    <span class="hljs-keyword">on</span>Rejected(<span class="hljs-literal">self</span>.reason);
  }
};

module.exports = MyPromise;</code></pre><h3 id="articleHeader5">4. &#x5B9E;&#x73B0;&#x5F02;&#x6B65;&#x8C03;&#x7528;resolve</h3><p>&#x76EE;&#x524D;&#x5B9E;&#x73B0;&#x5B58;&#x5728;&#x7684;&#x95EE;&#x9898;&#xFF1A;</p><ol><li>&#x540C;&#x6B65;&#x8C03;&#x7528;<code>resolve()</code>&#x6CA1;&#x6709;&#x95EE;&#x9898;&#xFF0C;&#x4F46;&#x5982;&#x679C;&#x662F;&#x5F02;&#x6B65;&#x8C03;&#x7528;&#xFF0C;&#x6BD4;&#x5982;&#x653E;&#x5230;<code>setTimeout</code>&#x4E2D;&#xFF0C;&#x56E0;&#x4E3A;&#x76EE;&#x524D;&#x7684;&#x4EE3;&#x7801;&#x5728;&#x8C03;&#x7528;<code>then()</code>&#x65B9;&#x6CD5;&#x65F6;&#xFF0C;<code>state</code>&#x4ECD;&#x662F;<code>pending</code>&#x72B6;&#x6001;&#xFF0C;&#x5F53;timer&#x5230;&#x65F6;&#x5019;&#x8C03;&#x7528;<code>resolve()</code>&#x628A;<code>state</code>&#x4FEE;&#x6539;&#x4E3A;<code>fulfilled</code>&#x72B6;&#x6001;&#xFF0C;&#x4F46;&#x662F;<code>onFulfilled()</code>&#x51FD;&#x6570;&#x5DF2;&#x7ECF;&#x6CA1;&#x6709;&#x65F6;&#x673A;&#x8C03;&#x7528;&#x4E86;&#x3002;</li></ol><p>&#x9488;&#x5BF9;&#x4E0A;&#x8FF0;&#x95EE;&#x9898;&#xFF0C;&#x8FDB;&#x884C;&#x5982;&#x4E0B;&#x4FEE;&#x6539;&#xFF1A;</p><p><strong>MyPromise.js</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const PENDING = &apos;pending&apos;;
const FULFILLED = &apos;fulfilled&apos;;
const REJECTED = &apos;rejected&apos;;

function MyPromise(executor) {
  let self = this;

  self.state = PENDING;
  self.value = null;
  self.reason = null;
  self.onFulfilledCallbacks = [];
  self.onRejectedCallbacks = [];

  function resolve(value) {
    if (self.state === PENDING) {
      self.state = FULFILLED;
      self.value = value;

      self.onFulfilledCallbacks.forEach(function(fulfilledCallback) {
        fulfilledCallback();
      });
    }
  }

  function reject(reason) {
    if (self.state === PENDING) {
      self.state = REJECTED;
      self.reason = reason;

      self.onRejectedCallbacks.forEach(function(rejectedCallback) {
        rejectedCallback();
      });
    }
  }

  try {
    executor(resolve, reject);
  } catch (reason) {
    reject(reason);
  }
}

MyPromise.prototype.then = function(onFuifilled, onRejected) {
  let self = this;

  if (self.state === PENDING) {
    self.onFulfilledCallbacks.push(() =&gt; {
        onFuifilled(self.value);
    });
    self.onRejectedCallbacks.push(() =&gt; {
        onRejected(self.reason);
    });
  }

  if (self.state === FULFILLED) {
    onFuifilled(self.value);
  }

  if (self.state === REJECTED) {
    onRejected(self.reason);
  }
};

module.exports = MyPromise;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs pf"><code>const PENDING = &apos;pending&apos;;
const FULFILLED = &apos;fulfilled&apos;;
const REJECTED = &apos;rejected&apos;;

function MyPromise(executor) {
  let <span class="hljs-literal">self</span> = this;

  <span class="hljs-literal">self</span>.<span class="hljs-keyword">state</span> = PENDING;
  <span class="hljs-literal">self</span>.value = null;
  <span class="hljs-literal">self</span>.reason = null;
  <span class="hljs-literal">self</span>.<span class="hljs-keyword">on</span>FulfilledCallbacks = [];
  <span class="hljs-literal">self</span>.<span class="hljs-keyword">on</span>RejectedCallbacks = [];

  function resolve(value) {
    if (<span class="hljs-literal">self</span>.<span class="hljs-keyword">state</span> === PENDING) {
      <span class="hljs-literal">self</span>.<span class="hljs-keyword">state</span> = FULFILLED;
      <span class="hljs-literal">self</span>.value = value;

      <span class="hljs-literal">self</span>.<span class="hljs-keyword">on</span>FulfilledCallbacks.<span class="hljs-keyword">for</span>Each(function(fulfilledCallback) {
        fulfilledCallback();
      });
    }
  }

  function reject(reason) {
    if (<span class="hljs-literal">self</span>.<span class="hljs-keyword">state</span> === PENDING) {
      <span class="hljs-literal">self</span>.<span class="hljs-keyword">state</span> = REJECTED;
      <span class="hljs-literal">self</span>.reason = reason;

      <span class="hljs-literal">self</span>.<span class="hljs-keyword">on</span>RejectedCallbacks.<span class="hljs-keyword">for</span>Each(function(rejectedCallback) {
        rejectedCallback();
      });
    }
  }

  try {
    executor(resolve, reject);
  } catch (reason) {
    reject(reason);
  }
}

MyPromise.prototype.then = function(<span class="hljs-keyword">on</span>Fuifilled, <span class="hljs-keyword">on</span>Rejected) {
  let <span class="hljs-literal">self</span> = this;

  if (<span class="hljs-literal">self</span>.<span class="hljs-keyword">state</span> === PENDING) {
    <span class="hljs-literal">self</span>.<span class="hljs-keyword">on</span>FulfilledCallbacks.push(() =&gt; {
        <span class="hljs-keyword">on</span>Fuifilled(<span class="hljs-literal">self</span>.value);
    });
    <span class="hljs-literal">self</span>.<span class="hljs-keyword">on</span>RejectedCallbacks.push(() =&gt; {
        <span class="hljs-keyword">on</span>Rejected(<span class="hljs-literal">self</span>.reason);
    });
  }

  if (<span class="hljs-literal">self</span>.<span class="hljs-keyword">state</span> === FULFILLED) {
    <span class="hljs-keyword">on</span>Fuifilled(<span class="hljs-literal">self</span>.value);
  }

  if (<span class="hljs-literal">self</span>.<span class="hljs-keyword">state</span> === REJECTED) {
    <span class="hljs-keyword">on</span>Rejected(<span class="hljs-literal">self</span>.reason);
  }
};

module.exports = MyPromise;</code></pre><p>&#x6211;&#x4EEC;&#x6DFB;&#x52A0;&#x4E86;&#x4E24;&#x4E2A;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x6570;&#x7EC4;<code>onFulfilledCallbacks</code>&#x548C;<code>onRejectedCallbacks</code>&#xFF0C;&#x7528;&#x6765;&#x5B58;&#x50A8;<code>then()</code>&#x65B9;&#x6CD5;&#x4E2D;&#x4F20;&#x5165;&#x7684;&#x6210;&#x529F;&#x548C;&#x5931;&#x8D25;&#x56DE;&#x8C03;&#x3002;&#x7136;&#x540E;&#xFF0C;&#x5F53;&#x7528;&#x6237;&#x8C03;&#x7528;<code>resolve()</code>&#x6216;<code>reject()</code>&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4FEE;&#x6539;<code>state</code>&#x72B6;&#x6001;&#xFF0C;&#x5E76;&#x4ECE;&#x76F8;&#x5E94;&#x7684;&#x56DE;&#x8C03;&#x6570;&#x7EC4;&#x4E2D;&#x4F9D;&#x6B21;&#x53D6;&#x51FA;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x6267;&#x884C;&#x3002;</p><p>&#x540C;&#x65F6;&#xFF0C;&#x901A;&#x8FC7;&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#x6211;&#x4EEC;&#x4E5F;&#x5B9E;&#x73B0;&#x4E86;&#x53EF;&#x4EE5;&#x6CE8;&#x518C;&#x591A;&#x4E2A;<code>then()</code>&#x51FD;&#x6570;&#xFF0C;&#x5E76;&#x4E14;&#x5728;&#x6210;&#x529F;&#x6216;&#x8005;&#x5931;&#x8D25;&#x65F6;&#x6309;&#x7167;&#x6CE8;&#x518C;&#x987A;&#x5E8F;&#x4F9D;&#x6B21;&#x6267;&#x884C;&#x3002;</p><p><strong>test.js</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let MyPromise = require(&apos;./MyPromise.js&apos;);

let promise = new MyPromise(function(resolve, reject) {
  setTimeout(function() {
    resolve(123);
  }, 1000);
});

promise.then(function(value) {
  console.log(&apos;value1&apos;, value);
}, function(reason) {
  console.log(&apos;reason1&apos;, reason);
});

promise.then(function(value) {
  console.log(&apos;value2&apos;, value);
}, function(reason) {
  console.log(&apos;reason2&apos;, reason);
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> MyPromise = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./MyPromise.js&apos;</span>);

<span class="hljs-keyword">let</span> promise = <span class="hljs-keyword">new</span> MyPromise(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
  setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    resolve(<span class="hljs-number">123</span>);
  }, <span class="hljs-number">1000</span>);
});

promise.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;value1&apos;</span>, value);
}, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">reason</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;reason1&apos;</span>, reason);
});

promise.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;value2&apos;</span>, value);
}, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">reason</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;reason2&apos;</span>, reason);
});</code></pre><h3 id="articleHeader6">5. then&#x8FD4;&#x56DE;&#x7684;&#x4ECD;&#x662F;Promise</h3><p>&#x8BFB;&#x8FC7;PromiseA+&#x89C4;&#x8303;&#x7684;&#x540C;&#x5B66;&#x80AF;&#x5B9A;&#x77E5;&#x9053;&#xFF0C;<code>then()</code>&#x65B9;&#x6CD5;&#x8FD4;&#x56DE;&#x7684;&#x4ECD;&#x662F;&#x4E00;&#x4E2A;Promise&#xFF0C;&#x5E76;&#x4E14;&#x8FD4;&#x56DE;Promise&#x7684;<code>resolve</code>&#x7684;&#x503C;&#x662F;&#x4E0A;&#x4E00;&#x4E2A;Promise&#x7684;<code>onFulfilled()</code>&#x51FD;&#x6570;&#x6216;<code>onRejected()</code>&#x51FD;&#x6570;&#x7684;&#x8FD4;&#x56DE;&#x503C;&#x3002;&#x5982;&#x679C;&#x5728;&#x4E0A;&#x4E00;&#x4E2A;Promise&#x7684;<code>then()</code>&#x65B9;&#x6CD5;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x7684;&#x6267;&#x884C;&#x8FC7;&#x7A0B;&#x4E2D;&#x53D1;&#x751F;&#x4E86;&#x9519;&#x8BEF;&#xFF0C;&#x90A3;&#x4E48;&#x4F1A;&#x5C06;&#x5176;&#x6355;&#x83B7;&#x5230;&#xFF0C;&#x5E76;&#x4F5C;&#x4E3A;&#x8FD4;&#x56DE;&#x7684;Promise&#x7684;<code>onRejected</code>&#x51FD;&#x6570;&#x7684;&#x53C2;&#x6570;&#x4F20;&#x5165;&#x3002;&#x6BD4;&#x5982;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let promise = new Promise((resolve, reject) =&gt; {
  resolve(123);
});

promise.then((value) =&gt; {
  console.log(&apos;value1&apos;, value);
  return 456;
}).then((value) =&gt; {
  console.log(&apos;value2&apos;, value);
});

let promise = new Promise((resolve, reject) =&gt; {
  resolve(123);
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code>let promise = <span class="hljs-keyword">new</span> Promise(<span class="hljs-function"><span class="hljs-params">(resolve, reject)</span> =&gt;</span> {
  resolve(<span class="hljs-number">123</span>);
});

promise.<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(value)</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;value1&apos;</span>, value);
  <span class="hljs-keyword">return</span> <span class="hljs-number">456</span>;
}).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(value)</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;value2&apos;</span>, value);
});

let promise = <span class="hljs-keyword">new</span> Promise(<span class="hljs-function"><span class="hljs-params">(resolve, reject)</span> =&gt;</span> {
  resolve(<span class="hljs-number">123</span>);
});</code></pre><p>&#x6253;&#x5370;&#x7ED3;&#x679C;&#x4E3A;&#xFF1A;</p><blockquote>value1 123<br>value2 456</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let promise = new Promise((resolve, reject) =&gt; {
  resolve(123);
});

promise.then((value) =&gt; {
  console.log(&apos;value1&apos;, value);
  a.b = 2;    // &#x8FD9;&#x91CC;&#x5B58;&#x5728;&#x8BED;&#x6CD5;&#x9519;&#x8BEF;
  return 456;
}).then((value) =&gt; {
  console.log(&apos;value2&apos;, value);
}, (reason) =&gt; {
  console.log(&apos;reason2&apos;, reason);
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code>let promise = <span class="hljs-keyword">new</span> Promise(<span class="hljs-function"><span class="hljs-params">(resolve, reject)</span> =&gt;</span> {
  resolve(<span class="hljs-number">123</span>);
});

promise.<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(value)</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;value1&apos;</span>, value);
  a.b = <span class="hljs-number">2</span>;    <span class="hljs-regexp">//</span> &#x8FD9;&#x91CC;&#x5B58;&#x5728;&#x8BED;&#x6CD5;&#x9519;&#x8BEF;
  <span class="hljs-keyword">return</span> <span class="hljs-number">456</span>;
}).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(value)</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;value2&apos;</span>, value);
}, <span class="hljs-function"><span class="hljs-params">(reason)</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;reason2&apos;</span>, reason);
});</code></pre><p>&#x6253;&#x5370;&#x7ED3;&#x679C;&#x4E3A;&#xFF1A;</p><blockquote>value1 123<br>reason2 ReferenceError: a is not defined</blockquote><p>&#x53EF;&#x4EE5;&#x770B;&#x5230;&#xFF0C;<code>then()</code>&#x65B9;&#x6CD5;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x5982;&#x679C;&#x53D1;&#x751F;&#x9519;&#x8BEF;&#xFF0C;&#x4F1A;&#x88AB;&#x6355;&#x83B7;&#x5230;&#xFF0C;&#x90A3;&#x4E48;<code>then()</code>&#x8FD4;&#x56DE;&#x7684;Promise&#x4F1A;&#x81EA;&#x52A8;&#x53D8;&#x4E3A;<code>onRejected</code>&#xFF0C;&#x6267;&#x884C;<code>onRejected()</code>&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let promise = new Promise((resolve, reject) =&gt; {
  reject(123);
});

promise.then((value) =&gt; {
  console.log(&apos;value1&apos;, value);
  return 456;
}, (reason) =&gt; {
  console.log(&apos;reason1&apos;, reason);
  return 456;
}).then((value) =&gt; {
  console.log(&apos;value2&apos;, value);
}, (reason) =&gt; {
  console.log(&apos;reason2&apos;, reason);
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code>let promise = <span class="hljs-keyword">new</span> Promise(<span class="hljs-function"><span class="hljs-params">(resolve, reject)</span> =&gt;</span> {
  reject(<span class="hljs-number">123</span>);
});

promise.<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(value)</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;value1&apos;</span>, value);
  <span class="hljs-keyword">return</span> <span class="hljs-number">456</span>;
}, <span class="hljs-function"><span class="hljs-params">(reason)</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;reason1&apos;</span>, reason);
  <span class="hljs-keyword">return</span> <span class="hljs-number">456</span>;
}).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(value)</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;value2&apos;</span>, value);
}, <span class="hljs-function"><span class="hljs-params">(reason)</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;reason2&apos;</span>, reason);
});</code></pre><p>&#x6253;&#x5370;&#x7ED3;&#x679C;&#x4E3A;&#xFF1A;</p><blockquote>reason1 123<br>value2 456</blockquote><p><strong>&#x597D;&#x5566;&#xFF0C;&#x63A5;&#x4E0B;&#x6765;&#x6211;&#x4EEC;&#x5C31;&#x53BB;&#x5B9E;&#x73B0;<code>then()</code>&#x65B9;&#x6CD5;&#x4F9D;&#x7136;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;Promise&#x3002;</strong></p><p><strong>MyPromise.js</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="MyPromise.prototype.then = function(onFuifilled, onRejected) {
  let self = this;
  let promise2 = null;

  promise2 = new MyPromise((resolve, reject) =&gt; {
    if (self.state === PENDING) {
      self.onFulfilledCallbacks.push(() =&gt; {
        try {
          let x = onFuifilled(self.value);
          self.resolvePromise(promise2, x, resolve, reject);
        } catch(reason) {
          reject(reason);
        }
      });
      self.onRejectedCallbacks.push(() =&gt; {
        try {
          let x = onRejected(self.reason);
          self.resolvePromise(promise2, x, resolve, reject);
        } catch(reason) {
          reject(reason);
        }
      });
    }
  
    if (self.state === FULFILLED) {
      try {
        let x = onFuifilled(self.value);
        self.resolvePromise(promise2, x, resolve, reject);
      } catch (reason) {
        reject(reason);
      }
    }
  
    if (self.state === REJECTED) {
      try {
        let x = onRejected(self.reason);
        self.resolvePromise(promise2, x, resolve, reject);
      } catch (reason) {
        reject(reason);
      }
    }
  });

  return promise2;
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs zephir"><code>MyPromise.prototype.then = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(onFuifilled, onRejected)</span> </span>{
  <span class="hljs-keyword">let</span> <span class="hljs-keyword">self</span> = this;
  <span class="hljs-keyword">let</span> promise2 = <span class="hljs-keyword">null</span>;

  promise2 = <span class="hljs-keyword">new</span> MyPromise((resolve, reject) =&gt; {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">self</span>.state === PENDING) {
      <span class="hljs-keyword">self</span>.onFulfilledCallbacks.push(() =&gt; {
        <span class="hljs-keyword">try</span> {
          <span class="hljs-keyword">let</span> x = onFuifilled(<span class="hljs-keyword">self</span>.value);
          <span class="hljs-keyword">self</span>.resolvePromise(promise2, x, resolve, reject);
        } <span class="hljs-keyword">catch</span>(reason) {
          reject(reason);
        }
      });
      <span class="hljs-keyword">self</span>.onRejectedCallbacks.push(() =&gt; {
        <span class="hljs-keyword">try</span> {
          <span class="hljs-keyword">let</span> x = onRejected(<span class="hljs-keyword">self</span>.reason);
          <span class="hljs-keyword">self</span>.resolvePromise(promise2, x, resolve, reject);
        } <span class="hljs-keyword">catch</span>(reason) {
          reject(reason);
        }
      });
    }
  
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">self</span>.state === FULFILLED) {
      <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">let</span> x = onFuifilled(<span class="hljs-keyword">self</span>.value);
        <span class="hljs-keyword">self</span>.resolvePromise(promise2, x, resolve, reject);
      } <span class="hljs-keyword">catch</span> (reason) {
        reject(reason);
      }
    }
  
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">self</span>.state === REJECTED) {
      <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">let</span> x = onRejected(<span class="hljs-keyword">self</span>.reason);
        <span class="hljs-keyword">self</span>.resolvePromise(promise2, x, resolve, reject);
      } <span class="hljs-keyword">catch</span> (reason) {
        reject(reason);
      }
    }
  });

  <span class="hljs-keyword">return</span> promise2;
};</code></pre><p>&#x53EF;&#x4EE5;&#x770B;&#x5230;&#xFF0C;&#x6211;&#x4EEC;&#x65B0;&#x589E;&#x4E86;&#x4E00;&#x4E2A;<code>promise2</code>&#x4F5C;&#x4E3A;<code>then()</code>&#x65B9;&#x6CD5;&#x7684;&#x8FD4;&#x56DE;&#x503C;&#x3002;&#x901A;&#x8FC7;<code>let x = onFuifilled(self.value)</code> &#x6216;&#x8005; <code>let x = onRejected(self.reason)</code>&#x62FF;&#x5230;<code>then()</code>&#x65B9;&#x6CD5;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x7684;&#x8FD4;&#x56DE;&#x503C;&#xFF0C;&#x7136;&#x540E;&#x8C03;&#x7528;<code>self.resolvePromise(promise2, x, resolve, reject)</code>&#xFF0C;&#x5C06;&#x65B0;&#x589E;&#x7684;<code>promise2</code>&#x3001;<code>x</code>&#x3001;<code>promise2</code>&#x7684;<code>resolve</code>&#x548C;<code>reject</code>&#x4F20;&#x5165;&#x5230;<code>resolvePromise()</code>&#x4E2D;&#x3002;</p><p><strong>&#x6240;&#x4EE5;&#xFF0C;&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x91CD;&#x70B9;&#x770B;&#x4E00;&#x4E0B;<code>resolvePromise()</code>&#x65B9;&#x6CD5;&#x3002;</strong></p><p><strong>MyPromise.js</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="MyPromise.prototype.resolvePromise = function(promise2, x, resolve, reject) {
  let self = this;
  let called = false;   // called &#x9632;&#x6B62;&#x591A;&#x6B21;&#x8C03;&#x7528;

  if (promise2 === x) {
    return reject(new TypeError(&apos;&#x5FAA;&#x73AF;&#x5F15;&#x7528;&apos;));
  }

  if (x !== null &amp;&amp; (Object.prototype.toString.call(x) === &apos;[object Object]&apos; || Object.prototype.toString.call(x) === &apos;[object Function]&apos;)) {
    // x&#x662F;&#x5BF9;&#x8C61;&#x6216;&#x8005;&#x51FD;&#x6570;
    try {
      let then = x.then;

      if (typeof then === &apos;function&apos;) {
        then.call(x, (y) =&gt; {
          // &#x522B;&#x4EBA;&#x7684;Promise&#x7684;then&#x65B9;&#x6CD5;&#x53EF;&#x80FD;&#x8BBE;&#x7F6E;&#x4E86;getter&#x7B49;&#xFF0C;&#x4F7F;&#x7528;called&#x9632;&#x6B62;&#x591A;&#x6B21;&#x8C03;&#x7528;then&#x65B9;&#x6CD5;
          if (called) return ;
          called = true;
          // &#x6210;&#x529F;&#x503C;y&#x6709;&#x53EF;&#x80FD;&#x8FD8;&#x662F;promise&#x6216;&#x8005;&#x662F;&#x5177;&#x6709;then&#x65B9;&#x6CD5;&#x7B49;&#xFF0C;&#x518D;&#x6B21;resolvePromise&#xFF0C;&#x76F4;&#x5230;&#x6210;&#x529F;&#x503C;&#x4E3A;&#x57FA;&#x672C;&#x7C7B;&#x578B;&#x6216;&#x8005;&#x975E;thenable
          self.resolvePromise(promise2, y, resolve, reject);
        }, (reason) =&gt; {
          if (called) return ;
          called = true;
          reject(reason);
        });
      } else {
        if (called) return ;
        called = true;
        resolve(x);
      }
    } catch (reason) {
      if (called) return ;
      called = true;
      reject(reason);
    }
  } else {
    // x&#x662F;&#x666E;&#x901A;&#x503C;&#xFF0C;&#x76F4;&#x63A5;resolve
    resolve(x);
  }
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code>MyPromise.prototype.resolvePromise = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">promise2, x, resolve, reject</span>) </span>{
  <span class="hljs-keyword">let</span> self = <span class="hljs-keyword">this</span>;
  <span class="hljs-keyword">let</span> called = <span class="hljs-literal">false</span>;   <span class="hljs-comment">// called &#x9632;&#x6B62;&#x591A;&#x6B21;&#x8C03;&#x7528;</span>

  <span class="hljs-keyword">if</span> (promise2 === x) {
    <span class="hljs-keyword">return</span> reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">TypeError</span>(<span class="hljs-string">&apos;&#x5FAA;&#x73AF;&#x5F15;&#x7528;&apos;</span>));
  }

  <span class="hljs-keyword">if</span> (x !== <span class="hljs-literal">null</span> &amp;&amp; (<span class="hljs-built_in">Object</span>.prototype.toString.call(x) === <span class="hljs-string">&apos;[object Object]&apos;</span> || <span class="hljs-built_in">Object</span>.prototype.toString.call(x) === <span class="hljs-string">&apos;[object Function]&apos;</span>)) {
    <span class="hljs-comment">// x&#x662F;&#x5BF9;&#x8C61;&#x6216;&#x8005;&#x51FD;&#x6570;</span>
    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">let</span> then = x.then;

      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> then === <span class="hljs-string">&apos;function&apos;</span>) {
        then.call(x, <span class="hljs-function">(<span class="hljs-params">y</span>) =&gt;</span> {
          <span class="hljs-comment">// &#x522B;&#x4EBA;&#x7684;Promise&#x7684;then&#x65B9;&#x6CD5;&#x53EF;&#x80FD;&#x8BBE;&#x7F6E;&#x4E86;getter&#x7B49;&#xFF0C;&#x4F7F;&#x7528;called&#x9632;&#x6B62;&#x591A;&#x6B21;&#x8C03;&#x7528;then&#x65B9;&#x6CD5;</span>
          <span class="hljs-keyword">if</span> (called) <span class="hljs-keyword">return</span> ;
          called = <span class="hljs-literal">true</span>;
          <span class="hljs-comment">// &#x6210;&#x529F;&#x503C;y&#x6709;&#x53EF;&#x80FD;&#x8FD8;&#x662F;promise&#x6216;&#x8005;&#x662F;&#x5177;&#x6709;then&#x65B9;&#x6CD5;&#x7B49;&#xFF0C;&#x518D;&#x6B21;resolvePromise&#xFF0C;&#x76F4;&#x5230;&#x6210;&#x529F;&#x503C;&#x4E3A;&#x57FA;&#x672C;&#x7C7B;&#x578B;&#x6216;&#x8005;&#x975E;thenable</span>
          self.resolvePromise(promise2, y, resolve, reject);
        }, <span class="hljs-function">(<span class="hljs-params">reason</span>) =&gt;</span> {
          <span class="hljs-keyword">if</span> (called) <span class="hljs-keyword">return</span> ;
          called = <span class="hljs-literal">true</span>;
          reject(reason);
        });
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">if</span> (called) <span class="hljs-keyword">return</span> ;
        called = <span class="hljs-literal">true</span>;
        resolve(x);
      }
    } <span class="hljs-keyword">catch</span> (reason) {
      <span class="hljs-keyword">if</span> (called) <span class="hljs-keyword">return</span> ;
      called = <span class="hljs-literal">true</span>;
      reject(reason);
    }
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-comment">// x&#x662F;&#x666E;&#x901A;&#x503C;&#xFF0C;&#x76F4;&#x63A5;resolve</span>
    resolve(x);
  }
};</code></pre><p><code>resolvePromise()</code>&#x662F;&#x7528;&#x6765;&#x89E3;&#x6790;<code>then()</code>&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x4E2D;&#x8FD4;&#x56DE;&#x7684;&#x4ECD;&#x662F;&#x4E00;&#x4E2A;<code>Promise</code>&#xFF0C;&#x8FD9;&#x4E2A;<code>Promise</code>&#x6709;&#x53EF;&#x80FD;&#x662F;&#x6211;&#x4EEC;&#x81EA;&#x5DF1;&#x7684;&#xFF0C;&#x6709;&#x53EF;&#x80FD;&#x662F;&#x522B;&#x7684;&#x5E93;&#x5B9E;&#x73B0;&#x7684;&#xFF0C;&#x4E5F;&#x6709;&#x53EF;&#x80FD;&#x662F;&#x4E00;&#x4E2A;&#x5177;&#x6709;<code>then()</code>&#x65B9;&#x6CD5;&#x7684;&#x5BF9;&#x8C61;&#xFF0C;&#x6240;&#x4EE5;&#x8FD9;&#x91CC;&#x9760;<code>resolvePromise()</code>&#x6765;&#x5B9E;&#x73B0;&#x7EDF;&#x4E00;&#x5904;&#x7406;&#x3002;</p><p>&#x4E0B;&#x9762;&#x662F;&#x7FFB;&#x8BD1;&#x81EA;<a href="https://promisesaplus.com/" rel="nofollow noreferrer" target="_blank">PromiseA+&#x89C4;&#x8303;</a>&#x5173;&#x4E8E;<code>resolvePromise()</code>&#x7684;&#x8981;&#x6C42;&#xFF1A;</p><hr><p><strong>Promise &#x89E3;&#x51B3;&#x8FC7;&#x7A0B;</strong></p><blockquote>Promise &#x89E3;&#x51B3;&#x8FC7;&#x7A0B;&#x662F;&#x4E00;&#x4E2A;&#x62BD;&#x8C61;&#x7684;&#x64CD;&#x4F5C;&#xFF0C;&#x5176;&#x9700;&#x8F93;&#x5165;&#x4E00;&#x4E2A; promise &#x548C;&#x4E00;&#x4E2A;&#x503C;&#xFF0C;&#x6211;&#x4EEC;&#x8868;&#x793A;&#x4E3A; [[Resolve]](promise, x)&#xFF0C;&#x5982;&#x679C; x &#x6709; then &#x65B9;&#x6CD5;&#x4E14;&#x770B;&#x4E0A;&#x53BB;&#x50CF;&#x4E00;&#x4E2A; Promise &#xFF0C;&#x89E3;&#x51B3;&#x7A0B;&#x5E8F;&#x5373;&#x5C1D;&#x8BD5;&#x4F7F; promise &#x63A5;&#x53D7; x &#x7684;&#x72B6;&#x6001;&#xFF1B;&#x5426;&#x5219;&#x5176;&#x7528; x &#x7684;&#x503C;&#x6765;&#x6267;&#x884C; promise &#x3002;</blockquote><p>&#x8FD9;&#x79CD; thenable &#x7684;&#x7279;&#x6027;&#x4F7F;&#x5F97; Promise &#x7684;&#x5B9E;&#x73B0;&#x66F4;&#x5177;&#x6709;&#x901A;&#x7528;&#x6027;&#xFF1A;&#x53EA;&#x8981;&#x5176;&#x66B4;&#x9732;&#x51FA;&#x4E00;&#x4E2A;&#x9075;&#x5FAA; Promise/A+ &#x534F;&#x8BAE;&#x7684; then &#x65B9;&#x6CD5;&#x5373;&#x53EF;&#xFF1B;&#x8FD9;&#x540C;&#x65F6;&#x4E5F;&#x4F7F;&#x9075;&#x5FAA; Promise/A+ &#x89C4;&#x8303;&#x7684;&#x5B9E;&#x73B0;&#x53EF;&#x4EE5;&#x4E0E;&#x90A3;&#x4E9B;&#x4E0D;&#x592A;&#x89C4;&#x8303;&#x4F46;&#x53EF;&#x7528;&#x7684;&#x5B9E;&#x73B0;&#x80FD;&#x826F;&#x597D;&#x5171;&#x5B58;&#x3002;</p><p>&#x8FD0;&#x884C; [[Resolve]](promise, x) &#x9700;&#x9075;&#x5FAA;&#x4EE5;&#x4E0B;&#x6B65;&#x9AA4;&#xFF1A;</p><ul><li>x &#x4E0E; promise &#x76F8;&#x7B49;</li></ul><p>&#x5982;&#x679C; promise &#x548C; x &#x6307;&#x5411;&#x540C;&#x4E00;&#x5BF9;&#x8C61;&#xFF0C;&#x4EE5; TypeError &#x4E3A;&#x636E;&#x56E0;&#x62D2;&#x7EDD;&#x6267;&#x884C; promise</p><ul><li>x &#x4E3A; Promise</li></ul><p>&#x5982;&#x679C; x &#x4E3A; Promise &#xFF0C;&#x5219;&#x4F7F; promise &#x63A5;&#x53D7; x &#x7684;&#x72B6;&#x6001;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="- &#x5982;&#x679C; x &#x5904;&#x4E8E;&#x7B49;&#x5F85;&#x6001;&#xFF0C; promise &#x9700;&#x4FDD;&#x6301;&#x4E3A;&#x7B49;&#x5F85;&#x6001;&#x76F4;&#x81F3; x &#x88AB;&#x6267;&#x884C;&#x6216;&#x62D2;&#x7EDD;
- &#x5982;&#x679C; x &#x5904;&#x4E8E;&#x6267;&#x884C;&#x6001;&#xFF0C;&#x7528;&#x76F8;&#x540C;&#x7684;&#x503C;&#x6267;&#x884C; promise
- &#x5982;&#x679C; x &#x5904;&#x4E8E;&#x62D2;&#x7EDD;&#x6001;&#xFF0C;&#x7528;&#x76F8;&#x540C;&#x7684;&#x636E;&#x56E0;&#x62D2;&#x7EDD; promise

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haml"><code>-<span class="ruby"> &#x5982;&#x679C; x &#x5904;&#x4E8E;&#x7B49;&#x5F85;&#x6001;&#xFF0C; promise &#x9700;&#x4FDD;&#x6301;&#x4E3A;&#x7B49;&#x5F85;&#x6001;&#x76F4;&#x81F3; x &#x88AB;&#x6267;&#x884C;&#x6216;&#x62D2;&#x7EDD;
</span>-<span class="ruby"> &#x5982;&#x679C; x &#x5904;&#x4E8E;&#x6267;&#x884C;&#x6001;&#xFF0C;&#x7528;&#x76F8;&#x540C;&#x7684;&#x503C;&#x6267;&#x884C; promise
</span>-<span class="ruby"> &#x5982;&#x679C; x &#x5904;&#x4E8E;&#x62D2;&#x7EDD;&#x6001;&#xFF0C;&#x7528;&#x76F8;&#x540C;&#x7684;&#x636E;&#x56E0;&#x62D2;&#x7EDD; promise
</span>
</code></pre><ul><li>x &#x4E3A;&#x5BF9;&#x8C61;&#x6216;&#x51FD;&#x6570;</li></ul><p>&#x5982;&#x679C; x &#x4E3A;&#x5BF9;&#x8C61;&#x6216;&#x8005;&#x51FD;&#x6570;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="- &#x628A; x.then &#x8D4B;&#x503C;&#x7ED9; then
- &#x5982;&#x679C;&#x53D6; x.then &#x7684;&#x503C;&#x65F6;&#x629B;&#x51FA;&#x9519;&#x8BEF; e &#xFF0C;&#x5219;&#x4EE5; e &#x4E3A;&#x636E;&#x56E0;&#x62D2;&#x7EDD; promise
- &#x5982;&#x679C; then &#x662F;&#x51FD;&#x6570;&#xFF0C;&#x5C06; x &#x4F5C;&#x4E3A;&#x51FD;&#x6570;&#x7684;&#x4F5C;&#x7528;&#x57DF; this &#x8C03;&#x7528;&#x4E4B;&#x3002;&#x4F20;&#x9012;&#x4E24;&#x4E2A;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#xFF0C;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x53EB;&#x505A; resolvePromise &#xFF0C;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x53EB;&#x505A; rejectPromise:
    - &#x5982;&#x679C; resolvePromise &#x4EE5;&#x503C; y &#x4E3A;&#x53C2;&#x6570;&#x88AB;&#x8C03;&#x7528;&#xFF0C;&#x5219;&#x8FD0;&#x884C; [[Resolve]](promise, y)
    - &#x5982;&#x679C; rejectPromise &#x4EE5;&#x636E;&#x56E0; r &#x4E3A;&#x53C2;&#x6570;&#x88AB;&#x8C03;&#x7528;&#xFF0C;&#x5219;&#x4EE5;&#x636E;&#x56E0; r &#x62D2;&#x7EDD; promise
    - &#x5982;&#x679C; resolvePromise &#x548C; rejectPromise &#x5747;&#x88AB;&#x8C03;&#x7528;&#xFF0C;&#x6216;&#x8005;&#x88AB;&#x540C;&#x4E00;&#x53C2;&#x6570;&#x8C03;&#x7528;&#x4E86;&#x591A;&#x6B21;&#xFF0C;&#x5219;&#x4F18;&#x5148;&#x91C7;&#x7528;&#x9996;&#x6B21;&#x8C03;&#x7528;&#x5E76;&#x5FFD;&#x7565;&#x5269;&#x4E0B;&#x7684;&#x8C03;&#x7528;
    - &#x5982;&#x679C;&#x8C03;&#x7528; then &#x65B9;&#x6CD5;&#x629B;&#x51FA;&#x4E86;&#x5F02;&#x5E38; e&#xFF1A;
        - &#x5982;&#x679C; resolvePromise &#x6216; rejectPromise &#x5DF2;&#x7ECF;&#x88AB;&#x8C03;&#x7528;&#xFF0C;&#x5219;&#x5FFD;&#x7565;&#x4E4B;
        - &#x5426;&#x5219;&#x4EE5; e &#x4E3A;&#x636E;&#x56E0;&#x62D2;&#x7EDD; promise
    - &#x5982;&#x679C; then &#x4E0D;&#x662F;&#x51FD;&#x6570;&#xFF0C;&#x4EE5; x &#x4E3A;&#x53C2;&#x6570;&#x6267;&#x884C; promise
- &#x5982;&#x679C; x &#x4E0D;&#x4E3A;&#x5BF9;&#x8C61;&#x6216;&#x8005;&#x51FD;&#x6570;&#xFF0C;&#x4EE5; x &#x4E3A;&#x53C2;&#x6570;&#x6267;&#x884C; promise

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haml"><code>-<span class="ruby"> &#x628A; x.<span class="hljs-keyword">then</span> &#x8D4B;&#x503C;&#x7ED9; <span class="hljs-keyword">then</span>
</span>-<span class="ruby"> &#x5982;&#x679C;&#x53D6; x.<span class="hljs-keyword">then</span> &#x7684;&#x503C;&#x65F6;&#x629B;&#x51FA;&#x9519;&#x8BEF; e &#xFF0C;&#x5219;&#x4EE5; e &#x4E3A;&#x636E;&#x56E0;&#x62D2;&#x7EDD; promise
</span>-<span class="ruby"> &#x5982;&#x679C; <span class="hljs-keyword">then</span> &#x662F;&#x51FD;&#x6570;&#xFF0C;&#x5C06; x &#x4F5C;&#x4E3A;&#x51FD;&#x6570;&#x7684;&#x4F5C;&#x7528;&#x57DF; this &#x8C03;&#x7528;&#x4E4B;&#x3002;&#x4F20;&#x9012;&#x4E24;&#x4E2A;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#xFF0C;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x53EB;&#x505A; resolvePromise &#xFF0C;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x53EB;&#x505A; <span class="hljs-symbol">rejectPromise:</span>
</span>    -<span class="ruby"> &#x5982;&#x679C; resolvePromise &#x4EE5;&#x503C; y &#x4E3A;&#x53C2;&#x6570;&#x88AB;&#x8C03;&#x7528;&#xFF0C;&#x5219;&#x8FD0;&#x884C; [[Resolve]](promise, y)
</span>    -<span class="ruby"> &#x5982;&#x679C; rejectPromise &#x4EE5;&#x636E;&#x56E0; r &#x4E3A;&#x53C2;&#x6570;&#x88AB;&#x8C03;&#x7528;&#xFF0C;&#x5219;&#x4EE5;&#x636E;&#x56E0; r &#x62D2;&#x7EDD; promise
</span>    -<span class="ruby"> &#x5982;&#x679C; resolvePromise &#x548C; rejectPromise &#x5747;&#x88AB;&#x8C03;&#x7528;&#xFF0C;&#x6216;&#x8005;&#x88AB;&#x540C;&#x4E00;&#x53C2;&#x6570;&#x8C03;&#x7528;&#x4E86;&#x591A;&#x6B21;&#xFF0C;&#x5219;&#x4F18;&#x5148;&#x91C7;&#x7528;&#x9996;&#x6B21;&#x8C03;&#x7528;&#x5E76;&#x5FFD;&#x7565;&#x5269;&#x4E0B;&#x7684;&#x8C03;&#x7528;
</span>    -<span class="ruby"> &#x5982;&#x679C;&#x8C03;&#x7528; <span class="hljs-keyword">then</span> &#x65B9;&#x6CD5;&#x629B;&#x51FA;&#x4E86;&#x5F02;&#x5E38; e&#xFF1A;
</span>        -<span class="ruby"> &#x5982;&#x679C; resolvePromise &#x6216; rejectPromise &#x5DF2;&#x7ECF;&#x88AB;&#x8C03;&#x7528;&#xFF0C;&#x5219;&#x5FFD;&#x7565;&#x4E4B;
</span>        -<span class="ruby"> &#x5426;&#x5219;&#x4EE5; e &#x4E3A;&#x636E;&#x56E0;&#x62D2;&#x7EDD; promise
</span>    -<span class="ruby"> &#x5982;&#x679C; <span class="hljs-keyword">then</span> &#x4E0D;&#x662F;&#x51FD;&#x6570;&#xFF0C;&#x4EE5; x &#x4E3A;&#x53C2;&#x6570;&#x6267;&#x884C; promise
</span>-<span class="ruby"> &#x5982;&#x679C; x &#x4E0D;&#x4E3A;&#x5BF9;&#x8C61;&#x6216;&#x8005;&#x51FD;&#x6570;&#xFF0C;&#x4EE5; x &#x4E3A;&#x53C2;&#x6570;&#x6267;&#x884C; promise
</span>
</code></pre><p>&#x5982;&#x679C;&#x4E00;&#x4E2A; promise &#x88AB;&#x4E00;&#x4E2A;&#x5FAA;&#x73AF;&#x7684; thenable &#x94FE;&#x4E2D;&#x7684;&#x5BF9;&#x8C61;&#x89E3;&#x51B3;&#xFF0C;&#x800C; [[Resolve]](promise, thenable) &#x7684;&#x9012;&#x5F52;&#x6027;&#x8D28;&#x53C8;&#x4F7F;&#x5F97;&#x5176;&#x88AB;&#x518D;&#x6B21;&#x8C03;&#x7528;&#xFF0C;&#x6839;&#x636E;&#x4E0A;&#x8FF0;&#x7684;&#x7B97;&#x6CD5;&#x5C06;&#x4F1A;&#x9677;&#x5165;&#x65E0;&#x9650;&#x9012;&#x5F52;&#x4E4B;&#x4E2D;&#x3002;&#x7B97;&#x6CD5;&#x867D;&#x4E0D;&#x5F3A;&#x5236;&#x8981;&#x6C42;&#xFF0C;&#x4F46;&#x4E5F;&#x9F13;&#x52B1;&#x65BD;&#x8005;&#x68C0;&#x6D4B;&#x8FD9;&#x6837;&#x7684;&#x9012;&#x5F52;&#x662F;&#x5426;&#x5B58;&#x5728;&#xFF0C;&#x82E5;&#x68C0;&#x6D4B;&#x5230;&#x5B58;&#x5728;&#x5219;&#x4EE5;&#x4E00;&#x4E2A;&#x53EF;&#x8BC6;&#x522B;&#x7684; TypeError &#x4E3A;&#x636E;&#x56E0;&#x6765;&#x62D2;&#x7EDD; promise&#x3002;</p><hr><p>&#x53C2;&#x8003;&#x4E0A;&#x8FF0;&#x89C4;&#x8303;&#xFF0C;&#x7ED3;&#x5408;&#x4EE3;&#x7801;&#x4E2D;&#x7684;&#x6CE8;&#x91CA;&#xFF0C;&#x76F8;&#x4FE1;&#x5927;&#x5BB6;&#x53EF;&#x4EE5;&#x7406;&#x89E3;<code>resolvePromise()</code>&#x7684;&#x4F5C;&#x7528;&#x4E86;&#x3002;</p><p>&#x6D4B;&#x8BD5;&#xFF1A;</p><p><strong>test.js</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let MyPromise = require(&apos;./MyPromise.js&apos;);

let promise = new MyPromise(function(resolve, reject) {
  setTimeout(function() {
    resolve(123);
  }, 1000);
});

promise.then((value) =&gt; {
  console.log(&apos;value1&apos;, value);
  return new MyPromise((resolve, reject) =&gt; {
    resolve(456);
  }).then((value) =&gt; {
    return new MyPromise((resolve, reject) =&gt; {
      resolve(789);
    })
  });
}, (reason) =&gt; {
  console.log(&apos;reason1&apos;, reason);
}).then((value) =&gt; {
  console.log(&apos;value2&apos;, value);
}, (reason) =&gt; {
  console.log(&apos;reason2&apos;, reason);
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code>let MyPromise = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./MyPromise.js&apos;</span>);

let promise = <span class="hljs-keyword">new</span> MyPromise(function(resolve, reject) {
  setTimeout(function() {
    resolve(<span class="hljs-number">123</span>);
  }, <span class="hljs-number">1000</span>);
});

promise.<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(value)</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;value1&apos;</span>, value);
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> MyPromise(<span class="hljs-function"><span class="hljs-params">(resolve, reject)</span> =&gt;</span> {
    resolve(<span class="hljs-number">456</span>);
  }).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(value)</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> MyPromise(<span class="hljs-function"><span class="hljs-params">(resolve, reject)</span> =&gt;</span> {
      resolve(<span class="hljs-number">789</span>);
    })
  });
}, <span class="hljs-function"><span class="hljs-params">(reason)</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;reason1&apos;</span>, reason);
}).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(value)</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;value2&apos;</span>, value);
}, <span class="hljs-function"><span class="hljs-params">(reason)</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;reason2&apos;</span>, reason);
});</code></pre><p>&#x6253;&#x5370;&#x7ED3;&#x679C;&#xFF1A;</p><blockquote>value1 123<br>value2 789</blockquote><h3 id="articleHeader7">6. &#x8BA9;<code>then()</code>&#x65B9;&#x6CD5;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x603B;&#x662F;&#x5F02;&#x6B65;&#x8C03;&#x7528;</h3><p>&#x5B98;&#x65B9;<code>Promise</code>&#x5B9E;&#x73B0;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x603B;&#x662F;&#x5F02;&#x6B65;&#x8C03;&#x7528;&#x7684;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(&apos;start&apos;);

let promise = new Promise((resolve, reject) =&gt; {
  console.log(&apos;step-&apos;);
  resolve(123);
});

promise.then((value) =&gt; {
  console.log(&apos;step--&apos;);
  console.log(&apos;value&apos;, value);
});

console.log(&apos;end&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code><span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;start&apos;</span>);

let promise = <span class="hljs-keyword">new</span> Promise(<span class="hljs-function"><span class="hljs-params">(resolve, reject)</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;step-&apos;</span>);
  resolve(<span class="hljs-number">123</span>);
});

promise.<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(value)</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;step--&apos;</span>);
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;value&apos;</span>, value);
});

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;end&apos;</span>);</code></pre><p>&#x6253;&#x5370;&#x7ED3;&#x679C;&#xFF1A;</p><blockquote>start<br>step-<br>end<br>step--<br>value1 123</blockquote><p>Promise&#x5C5E;&#x4E8E;&#x5FAE;&#x4EFB;&#x52A1;&#xFF0C;&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x4E3A;&#x4E86;&#x65B9;&#x4FBF;&#x7528;&#x5B8F;&#x4EFB;&#x52A1;<code>setTiemout</code>&#x6765;&#x4EE3;&#x66FF;&#x5B9E;&#x73B0;&#x5F02;&#x6B65;&#xFF0C;&#x5177;&#x4F53;&#x5173;&#x4E8E;&#x5B8F;&#x4EFB;&#x52A1;&#x3001;&#x5FAE;&#x4EFB;&#x52A1;&#x4EE5;&#x53CA;Event Loop&#x53EF;&#x4EE5;&#x53C2;&#x8003;&#x6211;&#x7684;&#x53E6;&#x4E00;&#x7BC7;&#x6587;&#x7AE0;<a href="https://segmentfault.com/a/1190000016278115">&#x5E26;&#x4F60;&#x5F7B;&#x5E95;&#x5F04;&#x61C2;Event Loop</a>&#x3002;</p><p><strong>MyPromise.js</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="MyPromise.prototype.then = function(onFuifilled, onRejected) {
  let self = this;
  let promise2 = null;

  promise2 = new MyPromise((resolve, reject) =&gt; {
    if (self.state === PENDING) {
      self.onFulfilledCallbacks.push(() =&gt; {
        setTimeout(() =&gt; {
          try {
            let x = onFuifilled(self.value);
            self.resolvePromise(promise2, x, resolve, reject);
          } catch (reason) {
            reject(reason);
          }
        }, 0);
      });
      self.onRejectedCallbacks.push(() =&gt; {
        setTimeout(() =&gt; {
          try {
            let x = onRejected(self.reason);
            self.resolvePromise(promise2, x, resolve, reject);
          } catch (reason) {
            reject(reason);
          }
        }, 0);
      });
    }
  
    if (self.state === FULFILLED) {
      setTimeout(() =&gt; {
        try {
          let x = onFuifilled(self.value);
          self.resolvePromise(promise2, x, resolve, reject);
        } catch (reason) {
          reject(reason);
        }
      }, 0);
    }
  
    if (self.state === REJECTED) {
      setTimeout(() =&gt; {
        try {
          let x = onRejected(self.reason);
          self.resolvePromise(promise2, x, resolve, reject);
        } catch (reason) {
          reject(reason);
        }
      }, 0);
    }
  });

  return promise2;
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs zephir"><code>MyPromise.prototype.then = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(onFuifilled, onRejected)</span> </span>{
  <span class="hljs-keyword">let</span> <span class="hljs-keyword">self</span> = this;
  <span class="hljs-keyword">let</span> promise2 = <span class="hljs-keyword">null</span>;

  promise2 = <span class="hljs-keyword">new</span> MyPromise((resolve, reject) =&gt; {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">self</span>.state === PENDING) {
      <span class="hljs-keyword">self</span>.onFulfilledCallbacks.push(() =&gt; {
        setTimeout(() =&gt; {
          <span class="hljs-keyword">try</span> {
            <span class="hljs-keyword">let</span> x = onFuifilled(<span class="hljs-keyword">self</span>.value);
            <span class="hljs-keyword">self</span>.resolvePromise(promise2, x, resolve, reject);
          } <span class="hljs-keyword">catch</span> (reason) {
            reject(reason);
          }
        }, <span class="hljs-number">0</span>);
      });
      <span class="hljs-keyword">self</span>.onRejectedCallbacks.push(() =&gt; {
        setTimeout(() =&gt; {
          <span class="hljs-keyword">try</span> {
            <span class="hljs-keyword">let</span> x = onRejected(<span class="hljs-keyword">self</span>.reason);
            <span class="hljs-keyword">self</span>.resolvePromise(promise2, x, resolve, reject);
          } <span class="hljs-keyword">catch</span> (reason) {
            reject(reason);
          }
        }, <span class="hljs-number">0</span>);
      });
    }
  
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">self</span>.state === FULFILLED) {
      setTimeout(() =&gt; {
        <span class="hljs-keyword">try</span> {
          <span class="hljs-keyword">let</span> x = onFuifilled(<span class="hljs-keyword">self</span>.value);
          <span class="hljs-keyword">self</span>.resolvePromise(promise2, x, resolve, reject);
        } <span class="hljs-keyword">catch</span> (reason) {
          reject(reason);
        }
      }, <span class="hljs-number">0</span>);
    }
  
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">self</span>.state === REJECTED) {
      setTimeout(() =&gt; {
        <span class="hljs-keyword">try</span> {
          <span class="hljs-keyword">let</span> x = onRejected(<span class="hljs-keyword">self</span>.reason);
          <span class="hljs-keyword">self</span>.resolvePromise(promise2, x, resolve, reject);
        } <span class="hljs-keyword">catch</span> (reason) {
          reject(reason);
        }
      }, <span class="hljs-number">0</span>);
    }
  });

  <span class="hljs-keyword">return</span> promise2;
};</code></pre><p>&#x6D4B;&#x8BD5;&#xFF1A;</p><p><strong>test.js</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let MyPromise = require(&apos;./MyPromise.js&apos;);

console.log(&apos;start&apos;);

let promise = new MyPromise((resolve, reject) =&gt; {
  console.log(&apos;step-&apos;);
  setTimeout(() =&gt; {
    resolve(123);
  }, 1000);
});

promise.then((value) =&gt; {
  console.log(&apos;step--&apos;);
  console.log(&apos;value&apos;, value);
});

console.log(&apos;end&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code>let MyPromise = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./MyPromise.js&apos;</span>);

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;start&apos;</span>);

let promise = <span class="hljs-keyword">new</span> MyPromise(<span class="hljs-function"><span class="hljs-params">(resolve, reject)</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;step-&apos;</span>);
  setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    resolve(<span class="hljs-number">123</span>);
  }, <span class="hljs-number">1000</span>);
});

promise.<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(value)</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;step--&apos;</span>);
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;value&apos;</span>, value);
});

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;end&apos;</span>);</code></pre><p>&#x6253;&#x5370;&#x7ED3;&#x679C;&#xFF1A;</p><blockquote>start<br>step-<br>end<br>step--<br>value1 123</blockquote><p><strong>&#x7ECF;&#x8FC7;&#x4EE5;&#x4E0A;&#x6B65;&#x9AA4;&#xFF0C;&#x4E00;&#x4E2A;&#x6700;&#x57FA;&#x672C;&#x7684;Promise&#x5C31;&#x5DF2;&#x7ECF;&#x5B9E;&#x73B0;&#x5B8C;&#x4E86;&#xFF0C;&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x4F1A;&#x5B9E;&#x73B0;&#x4E00;&#x4E9B;&#x4E0D;&#x5728;PromiseA+&#x89C4;&#x8303;&#x7684;&#x6269;&#x5C55;&#x65B9;&#x6CD5;&#x3002;</strong></p><h3 id="articleHeader8">7. &#x5B9E;&#x73B0;<code>catch()</code>&#x65B9;&#x6CD5;</h3><p><code>then()</code>&#x65B9;&#x6CD5;&#x7684;<code>onFulfilled</code>&#x548C;<code>onRejected</code>&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x90FD;&#x4E0D;&#x662F;&#x5FC5;&#x4F20;&#x9879;&#xFF0C;&#x5982;&#x679C;&#x4E0D;&#x4F20;&#xFF0C;&#x90A3;&#x4E48;&#x6211;&#x4EEC;&#x5C31;&#x65E0;&#x6CD5;&#x63A5;&#x6536;<code>reject(reason)</code>&#x4E2D;&#x7684;&#x9519;&#x8BEF;&#xFF0C;&#x8FD9;&#x65F6;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x94FE;&#x5F0F;&#x8C03;&#x7528;<code>catch()</code>&#x65B9;&#x6CD5;&#x7528;&#x6765;&#x63A5;&#x6536;&#x9519;&#x8BEF;&#x3002;&#x4E3E;&#x4F8B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let promise = new Promise((resolve, reject) =&gt; {
  reject(&apos;has error&apos;);
});

promise.then((value) =&gt; {
  console.log(&apos;value&apos;, value);
}).catch((reason) =&gt; {
  console.log(&apos;reason&apos;, reason);
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code>let promise = <span class="hljs-keyword">new</span> Promise(<span class="hljs-function"><span class="hljs-params">(resolve, reject)</span> =&gt;</span> {
  reject(<span class="hljs-string">&apos;has error&apos;</span>);
});

promise.<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(value)</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;value&apos;</span>, value);
}).<span class="hljs-keyword">catch</span>(<span class="hljs-function"><span class="hljs-params">(reason)</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;reason&apos;</span>, reason);
});</code></pre><p>&#x6253;&#x5370;&#x7ED3;&#x679C;&#xFF1A;</p><blockquote>reason has error</blockquote><p>&#x4E0D;&#x4EC5;&#x5982;&#x6B64;&#xFF0C;<code>catch()</code>&#x53EF;&#x4EE5;&#x4F5C;&#x4E3A;Promise&#x94FE;&#x5F0F;&#x8C03;&#x7528;&#x7684;&#x6700;&#x540E;&#x4E00;&#x6B65;&#xFF0C;&#x524D;&#x9762;Promise&#x53D1;&#x751F;&#x7684;&#x9519;&#x8BEF;&#x4F1A;&#x5192;&#x6CE1;&#x5230;&#x6700;&#x540E;&#x4E00;&#x4E2A;<code>catch()</code>&#x4E2D;&#xFF0C;&#x4ECE;&#x800C;&#x6355;&#x83B7;&#x5F02;&#x5E38;&#x3002;&#x4E3E;&#x4F8B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let promise = new Promise((resolve, reject) =&gt; {
  resolve(123);
});

promise.then((value) =&gt; {
  console.log(&apos;value&apos;, value);
  return new Promise((resolve, reject) =&gt; {
    reject(&apos;has error1&apos;);
  });
}).then((value) =&gt; {
  console.log(&apos;value&apos;, value);
  return new Promise((resolve, reject) =&gt; {
    reject(&apos;has error2&apos;);
  });
}).catch((reason) =&gt; {
  console.log(&apos;reason&apos;, reason);
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code>let promise = <span class="hljs-keyword">new</span> Promise(<span class="hljs-function"><span class="hljs-params">(resolve, reject)</span> =&gt;</span> {
  resolve(<span class="hljs-number">123</span>);
});

promise.<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(value)</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;value&apos;</span>, value);
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Promise(<span class="hljs-function"><span class="hljs-params">(resolve, reject)</span> =&gt;</span> {
    reject(<span class="hljs-string">&apos;has error1&apos;</span>);
  });
}).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(value)</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;value&apos;</span>, value);
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Promise(<span class="hljs-function"><span class="hljs-params">(resolve, reject)</span> =&gt;</span> {
    reject(<span class="hljs-string">&apos;has error2&apos;</span>);
  });
}).<span class="hljs-keyword">catch</span>(<span class="hljs-function"><span class="hljs-params">(reason)</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;reason&apos;</span>, reason);
});</code></pre><p>&#x6253;&#x5370;&#x7ED3;&#x679C;&#xFF1A;</p><blockquote>value 123<br>reason has error1</blockquote><p>&#x90A3;&#x4E48;<code>catch()</code>&#x65B9;&#x6CD5;&#x5230;&#x5E95;&#x662F;&#x5982;&#x4F55;&#x5B9E;&#x73B0;&#x7684;&#x5462;&#xFF1F;</p><p>&#x7B54;&#x6848;&#x5C31;&#x662F;&#x5728;Promise&#x7684;&#x5B9E;&#x73B0;&#x4E2D;&#xFF0C;<code>onFulfilled</code>&#x548C;<code>onRejected</code>&#x51FD;&#x6570;&#x662F;&#x6709;&#x9ED8;&#x8BA4;&#x503C;&#x7684;&#xFF1A;</p><p><strong>MyPromise.js</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="MyPromise.prototype.then = function(onFuifilled, onRejected) {
  onFuifilled = typeof onFuifilled === &apos;function&apos; ? onFuifilled : value =&gt; {return value;};
  onRejected = typeof onRejected === &apos;function&apos; ? onRejected : reason =&gt; {throw reason};
};

MyPromise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected);
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>MyPromise.prototype.then = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">onFuifilled, onRejected</span>) </span>{
  onFuifilled = <span class="hljs-keyword">typeof</span> onFuifilled === <span class="hljs-string">&apos;function&apos;</span> ? onFuifilled : <span class="hljs-function"><span class="hljs-params">value</span> =&gt;</span> {<span class="hljs-keyword">return</span> value;};
  onRejected = <span class="hljs-keyword">typeof</span> onRejected === <span class="hljs-string">&apos;function&apos;</span> ? onRejected : <span class="hljs-function"><span class="hljs-params">reason</span> =&gt;</span> {<span class="hljs-keyword">throw</span> reason};
};

MyPromise.prototype.catch = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">onRejected</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.then(<span class="hljs-literal">null</span>, onRejected);
};</code></pre><p>&#x53EF;&#x4EE5;&#x770B;&#x5230;&#xFF0C;<code>onRejected</code>&#x7684;&#x9ED8;&#x8BA4;&#x503C;&#x662F;&#x628A;&#x9519;&#x8BEF;<code>reason</code>&#x901A;&#x8FC7;<code>throw</code>&#x629B;&#x51FA;&#x53BB;&#x3002;&#x7531;&#x4E8E;&#x6211;&#x4EEC;&#x5BF9;&#x4E8E;&#x540C;&#x6B65;&#x4EE3;&#x7801;&#x7684;&#x6267;&#x884C;&#x90FD;&#x662F;&#x5728;<code>try...catch</code>&#x4E2D;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x5982;&#x679C;Promise&#x53D1;&#x751F;&#x4E86;&#x9519;&#x8BEF;&#xFF0C;&#x5982;&#x679C;&#x6CA1;&#x4F20;<code>onRejected</code>&#xFF0C;&#x9ED8;&#x8BA4;&#x7684;&#x51FD;&#x6570;&#x4F1A;&#x628A;&#x9519;&#x8BEF;<code>reason</code>&#x629B;&#x51FA;&#xFF0C;&#x7136;&#x540E;&#x4F1A;&#x88AB;promise2&#x6355;&#x6349;&#x5230;&#xFF0C;&#x4F5C;&#x4E3A;<code>reject(reason)</code>&#x51B3;&#x8BAE;&#x3002;</p><p><code>catch()</code>&#x5B9E;&#x73B0;&#x5C31;&#x662F;&#x8C03;&#x7528;<code>this.then(null, onRejected)</code>&#xFF0C;&#x7531;&#x4E8E;<code>promise2</code>&#x88AB;<code>reject</code>&#xFF0C;&#x6240;&#x4EE5;&#x4F1A;&#x6267;&#x884C;<code>onRejected</code>&#x56DE;&#x8C03;&#xFF0C;&#x4E8E;&#x662F;&#x5C31;&#x6355;&#x6349;&#x5230;&#x4E86;&#x7B2C;&#x4E00;&#x4E2A;promise&#x7684;&#x9519;&#x8BEF;&#x3002;</p><p>&#x603B;&#x7ED3;&#x6765;&#x8BF4;&#xFF0C;<code>then()</code>&#x65B9;&#x6CD5;&#x4E2D;&#x4E0D;&#x4F20;<code>onRejected</code>&#x56DE;&#x8C03;&#xFF0C;<code>Promise</code>&#x5185;&#x90E8;&#x4F1A;&#x9ED8;&#x8BA4;&#x5E2E;&#x4F60;&#x5199;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x4F5C;&#x4E3A;&#x56DE;&#x8C03;&#xFF0C;&#x4F5C;&#x7528;&#x5C31;&#x662F;<code>throw</code>&#x629B;&#x51FA;<code>reject</code>&#x6216;&#x8005;<code>try...catch</code>&#x5230;&#x7684;&#x9519;&#x8BEF;&#xFF0C;&#x7136;&#x540E;&#x9519;&#x8BEF;<code>reason</code>&#x4F1A;&#x88AB;<code>promise2</code>&#x4F5C;&#x4E3A;<code>reject(reason)</code>&#x8FDB;&#x884C;&#x51B3;&#x8BAE;&#xFF0C;&#x4E8E;&#x662F;&#x4F1A;&#x88AB;&#x4E0B;&#x4E00;&#x4E2A;<code>then()</code>&#x65B9;&#x6CD5;&#x7684;<code>onRejected</code>&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x8C03;&#x7528;&#xFF0C;&#x800C;<code>catch</code>&#x53EA;&#x662F;&#x5199;&#x4E86;&#x4E00;&#x4E2A;&#x7279;&#x6B8A;&#x7684;<code>then(null, onRejected)</code>&#x800C;&#x5DF2;&#x3002;</p><p>&#x6240;&#x4EE5;&#xFF0C;&#x6211;&#x4EEC;&#x5728;&#x5199;<code>Promise</code>&#x7684;&#x94FE;&#x5F0F;&#x8C03;&#x7528;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5728;<code>then()</code>&#x4E2D;&#x53EF;&#x4EE5;&#x4E0D;&#x4F20;<code>onRejected</code>&#x56DE;&#x8C03;&#xFF0C;&#x53EA;&#x9700;&#x8981;&#x5728;&#x94FE;&#x5F0F;&#x8C03;&#x7528;&#x7684;&#x6700;&#x672B;&#x5C3E;&#x52A0;&#x4E00;&#x4E2A;<code>catch()</code>&#x5C31;&#x53EF;&#x4EE5;&#x4E86;&#xFF0C;&#x8FD9;&#x6837;&#x5728;&#x8BE5;&#x94FE;&#x6761;&#x4E2D;&#x7684;<code>Promise</code>&#x53D1;&#x751F;&#x7684;&#x9519;&#x8BEF;&#x90FD;&#x4F1A;&#x88AB;&#x6700;&#x540E;&#x7684;<code>catch</code>&#x6355;&#x83B7;&#x5230;&#x3002;</p><p>&#x4E3E;&#x4F8B;1&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let promise = new Promise((resolve, reject) =&gt; {
  reject(123);
});

promise.then((value) =&gt; {
  // &#x6CE8;&#x610F;&#xFF0C;&#x4E0D;&#x4F1A;&#x8D70;&#x8FD9;&#x91CC;&#xFF0C;&#x56E0;&#x4E3A;&#x7B2C;&#x4E00;&#x4E2A;promise&#x662F;&#x88AB;reject&#x7684;
  console.log(&apos;value1&apos;, value);
  return new Promise((resolve, reject) =&gt; {
    reject(&apos;has error1&apos;);
  });
}).then((value) =&gt; {
  console.log(&apos;value2&apos;, value);
  return new Promise((resolve, reject) =&gt; {
    reject(&apos;has error2&apos;);
  });
}, (reason) =&gt; {
  // &#x6CE8;&#x610F;&#xFF0C;&#x8FD9;&#x4E2A;then&#x6709;onRejected&#x56DE;&#x8C03;
  console.log(&apos;reason2&apos;, reason);
}).catch((reason) =&gt; {
  // &#x9519;&#x8BEF;&#x5728;&#x4E0A;&#x4E00;&#x4E2A;then&#x5C31;&#x88AB;&#x6355;&#x83B7;&#x4E86;&#xFF0C;&#x6240;&#x4EE5;&#x4E0D;&#x4F1A;&#x8D70;&#x5230;&#x8FD9;&#x91CC;
  console.log(&apos;reason3&apos;, reason);
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code>let promise = <span class="hljs-keyword">new</span> Promise(<span class="hljs-function"><span class="hljs-params">(resolve, reject)</span> =&gt;</span> {
  reject(<span class="hljs-number">123</span>);
});

promise.<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(value)</span> =&gt;</span> {
  <span class="hljs-regexp">//</span> &#x6CE8;&#x610F;&#xFF0C;&#x4E0D;&#x4F1A;&#x8D70;&#x8FD9;&#x91CC;&#xFF0C;&#x56E0;&#x4E3A;&#x7B2C;&#x4E00;&#x4E2A;promise&#x662F;&#x88AB;reject&#x7684;
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;value1&apos;</span>, value);
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Promise(<span class="hljs-function"><span class="hljs-params">(resolve, reject)</span> =&gt;</span> {
    reject(<span class="hljs-string">&apos;has error1&apos;</span>);
  });
}).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(value)</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;value2&apos;</span>, value);
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Promise(<span class="hljs-function"><span class="hljs-params">(resolve, reject)</span> =&gt;</span> {
    reject(<span class="hljs-string">&apos;has error2&apos;</span>);
  });
}, <span class="hljs-function"><span class="hljs-params">(reason)</span> =&gt;</span> {
  <span class="hljs-regexp">//</span> &#x6CE8;&#x610F;&#xFF0C;&#x8FD9;&#x4E2A;<span class="hljs-keyword">then</span>&#x6709;onRejected&#x56DE;&#x8C03;
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;reason2&apos;</span>, reason);
}).<span class="hljs-keyword">catch</span>(<span class="hljs-function"><span class="hljs-params">(reason)</span> =&gt;</span> {
  <span class="hljs-regexp">//</span> &#x9519;&#x8BEF;&#x5728;&#x4E0A;&#x4E00;&#x4E2A;<span class="hljs-keyword">then</span>&#x5C31;&#x88AB;&#x6355;&#x83B7;&#x4E86;&#xFF0C;&#x6240;&#x4EE5;&#x4E0D;&#x4F1A;&#x8D70;&#x5230;&#x8FD9;&#x91CC;
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;reason3&apos;</span>, reason);
});</code></pre><p>&#x6253;&#x5370;&#x7ED3;&#x679C;&#xFF1A;</p><blockquote>reason2 123</blockquote><p>&#x4E3E;&#x4F8B;2&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let promise = new Promise((resolve, reject) =&gt; {
  reject(123);
});

promise.then((value) =&gt; {
  console.log(&apos;value1&apos;, value);
  return new Promise((resolve, reject) =&gt; {
    reject(&apos;has error1&apos;);
  });
}).then((value) =&gt; {
  console.log(&apos;value2&apos;, value);
  return new Promise((resolve, reject) =&gt; {
    reject(&apos;has error2&apos;);
  });
}).catch((reason) =&gt; {
  // &#x7531;&#x4E8E;&#x94FE;&#x6761;&#x4E2D;&#x7684;then&#x90FD;&#x6CA1;&#x6709;onRejected&#x56DE;&#x8C03;&#xFF0C;&#x6240;&#x4EE5;&#x4F1A;&#x4E00;&#x76F4;&#x88AB;&#x5192;&#x6CE1;&#x5230;&#x6700;&#x540E;&#x7684;catch&#x8FD9;&#x91CC;
  console.log(&apos;reason3&apos;, reason);
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code>let promise = <span class="hljs-keyword">new</span> Promise(<span class="hljs-function"><span class="hljs-params">(resolve, reject)</span> =&gt;</span> {
  reject(<span class="hljs-number">123</span>);
});

promise.<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(value)</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;value1&apos;</span>, value);
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Promise(<span class="hljs-function"><span class="hljs-params">(resolve, reject)</span> =&gt;</span> {
    reject(<span class="hljs-string">&apos;has error1&apos;</span>);
  });
}).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(value)</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;value2&apos;</span>, value);
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Promise(<span class="hljs-function"><span class="hljs-params">(resolve, reject)</span> =&gt;</span> {
    reject(<span class="hljs-string">&apos;has error2&apos;</span>);
  });
}).<span class="hljs-keyword">catch</span>(<span class="hljs-function"><span class="hljs-params">(reason)</span> =&gt;</span> {
  <span class="hljs-regexp">//</span> &#x7531;&#x4E8E;&#x94FE;&#x6761;&#x4E2D;&#x7684;<span class="hljs-keyword">then</span>&#x90FD;&#x6CA1;&#x6709;onRejected&#x56DE;&#x8C03;&#xFF0C;&#x6240;&#x4EE5;&#x4F1A;&#x4E00;&#x76F4;&#x88AB;&#x5192;&#x6CE1;&#x5230;&#x6700;&#x540E;&#x7684;<span class="hljs-keyword">catch</span>&#x8FD9;&#x91CC;
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;reason3&apos;</span>, reason);
});</code></pre><p><code>catch</code>&#x548C;<code>then</code>&#x4E00;&#x6837;&#x90FD;&#x662F;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x65B0;&#x7684;<code>Promise</code>&#x3002;&#x6709;&#x7684;&#x540C;&#x5B66;&#x53EF;&#x80FD;&#x4F1A;&#x6709;&#x7591;&#x95EE;&#xFF0C;&#x5982;&#x679C;<code>catch</code>&#x4E2D;&#x7684;&#x56DE;&#x8C03;&#x6267;&#x884C;&#x4E5F;&#x53D1;&#x751F;&#x9519;&#x8BEF;&#x8BE5;&#x600E;&#x4E48;&#x529E;&#x5462;&#xFF0C;&#x8FD9;&#x4E2A;&#x6211;&#x4EEC;&#x540E;&#x7EED;&#x5728;Promise&#x5F02;&#x5E38;&#x5904;&#x7406;&#x4E2D;&#x518D;&#x505A;&#x8BA8;&#x8BBA;&#x3002;</p><p>&#x6253;&#x5370;&#x7ED3;&#x679C;&#xFF1A;</p><blockquote>reason3 123</blockquote><h3 id="articleHeader9">8. &#x5B9E;&#x73B0;<code>finally</code>&#x65B9;&#x6CD5;</h3><p><code>finally</code>&#x662F;&#x67D0;&#x4E9B;&#x5E93;&#x5BF9;<code>Promise</code>&#x5B9E;&#x73B0;&#x7684;&#x4E00;&#x4E2A;&#x6269;&#x5C55;&#x65B9;&#x6CD5;&#xFF0C;&#x65E0;&#x8BBA;&#x662F;<code>resolve</code>&#x8FD8;&#x662F;<code>reject</code>&#xFF0C;&#x90FD;&#x4F1A;&#x8D70;<code>finally</code>&#x65B9;&#x6CD5;&#x3002;</p><p><strong>MyPromise.js</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="MyPromise.prototype.finally = function(fn) {
    return this.then(value =&gt; {
       fn();
       return value;
    }, reason =&gt; {
        fn();
        throw reason;
    });
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code>MyPromise.prototype.finally = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">fn</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.then(<span class="hljs-function"><span class="hljs-params">value</span> =&gt;</span> {
       fn();
       <span class="hljs-keyword">return</span> value;
    }, <span class="hljs-function"><span class="hljs-params">reason</span> =&gt;</span> {
        fn();
        <span class="hljs-keyword">throw</span> reason;
    });
};</code></pre><h3 id="articleHeader10">9. &#x5B9E;&#x73B0;<code>done</code>&#x65B9;&#x6CD5;</h3><p><code>done</code>&#x65B9;&#x6CD5;&#x4F5C;&#x4E3A;<code>Promise</code>&#x94FE;&#x5F0F;&#x8C03;&#x7528;&#x7684;&#x6700;&#x540E;&#x4E00;&#x6B65;&#xFF0C;&#x7528;&#x6765;&#x5411;&#x5168;&#x5C40;&#x629B;&#x51FA;&#x6CA1;&#x6709;&#x88AB;<code>Promise</code>&#x5185;&#x90E8;&#x6355;&#x83B7;&#x7684;&#x9519;&#x8BEF;&#xFF0C;&#x5E76;&#x4E14;&#x4E0D;&#x518D;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;<code>Promise</code>&#x3002;&#x4E00;&#x822C;&#x7528;&#x6765;&#x7ED3;&#x675F;&#x4E00;&#x4E2A;<code>Promise</code>&#x94FE;&#x3002;</p><p><strong>MyPromise.js</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="MyPromise.prototype.done = function() {
    this.catch(reason =&gt; {
        console.log(&apos;done&apos;, reason);
        throw reason;
    });
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>MyPromise.prototype.done = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.catch(<span class="hljs-function"><span class="hljs-params">reason</span> =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;done&apos;</span>, reason);
        <span class="hljs-keyword">throw</span> reason;
    });
};</code></pre><h3 id="articleHeader11">10. &#x5B9E;&#x73B0;<code>Promise.all</code>&#x65B9;&#x6CD5;</h3><p><code>Promise.all()</code>&#x63A5;&#x6536;&#x4E00;&#x4E2A;&#x5305;&#x542B;&#x591A;&#x4E2A;<code>Promise</code>&#x7684;&#x6570;&#x7EC4;&#xFF0C;&#x5F53;&#x6240;&#x6709;<code>Promise</code>&#x5747;&#x4E3A;<code>fulfilled</code>&#x72B6;&#x6001;&#x65F6;&#xFF0C;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x7ED3;&#x679C;&#x6570;&#x7EC4;&#xFF0C;&#x6570;&#x7EC4;&#x4E2D;&#x7ED3;&#x679C;&#x7684;&#x987A;&#x5E8F;&#x548C;&#x4F20;&#x5165;&#x7684;<code>Promise</code>&#x987A;&#x5E8F;&#x4E00;&#x4E00;&#x5BF9;&#x5E94;&#x3002;&#x5982;&#x679C;&#x6709;&#x4E00;&#x4E2A;<code>Promise</code>&#x4E3A;<code>rejected</code>&#x72B6;&#x6001;&#xFF0C;&#x5219;&#x6574;&#x4E2A;<code>Promise.all</code>&#x4E3A;<code>rejected</code>&#x3002;</p><p><strong>MyPromise.js</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="MyPromise.all = function(promiseArr) {
  return new MyPromise((resolve, reject) =&gt; {
    let result = [];

    promiseArr.forEach((promise, index) =&gt; {
      promise.then((value) =&gt; {
        result[index] = value;

        if (result.length === promiseArr.length) {
          resolve(result);
        }
      }, reject);
    });
  });
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code>MyPromise.all = function(promiseArr) {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> MyPromise(<span class="hljs-function"><span class="hljs-params">(resolve, reject)</span> =&gt;</span> {
    let result = [];

    promiseArr.forEach(<span class="hljs-function"><span class="hljs-params">(promise, index)</span> =&gt;</span> {
      promise.<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(value)</span> =&gt;</span> {
        result[index] = value;

        <span class="hljs-keyword">if</span> (result.length === promiseArr.length) {
          resolve(result);
        }
      }, reject);
    });
  });
};</code></pre><p><strong>test.js</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let MyPromise = require(&apos;./MyPromise.js&apos;);

let promise1 = new MyPromise((resolve, reject) =&gt; {
  console.log(&apos;aaaa&apos;);
  setTimeout(() =&gt; {
    resolve(1111);
    console.log(1111);
  }, 1000);
});

let promise2 = new MyPromise((resolve, reject) =&gt; {
  console.log(&apos;bbbb&apos;);
  setTimeout(() =&gt; {
    reject(2222);
    console.log(2222);
  }, 2000);
});

let promise3 = new MyPromise((resolve, reject) =&gt; {
  console.log(&apos;cccc&apos;);
  setTimeout(() =&gt; {
    resolve(3333);
    console.log(3333);
  }, 3000);
});

Promise.all([promise1, promise2, promise3]).then((value) =&gt; {
  console.log(&apos;all value&apos;, value);
}, (reason) =&gt; {
  console.log(&apos;all reason&apos;, reason);
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code>let MyPromise = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./MyPromise.js&apos;</span>);

let promise1 = <span class="hljs-keyword">new</span> MyPromise(<span class="hljs-function"><span class="hljs-params">(resolve, reject)</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;aaaa&apos;</span>);
  setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    resolve(<span class="hljs-number">1111</span>);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1111</span>);
  }, <span class="hljs-number">1000</span>);
});

let promise2 = <span class="hljs-keyword">new</span> MyPromise(<span class="hljs-function"><span class="hljs-params">(resolve, reject)</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;bbbb&apos;</span>);
  setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    reject(<span class="hljs-number">2222</span>);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">2222</span>);
  }, <span class="hljs-number">2000</span>);
});

let promise3 = <span class="hljs-keyword">new</span> MyPromise(<span class="hljs-function"><span class="hljs-params">(resolve, reject)</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;cccc&apos;</span>);
  setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    resolve(<span class="hljs-number">3333</span>);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">3333</span>);
  }, <span class="hljs-number">3000</span>);
});

Promise.all([promise1, promise2, promise3]).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(value)</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;all value&apos;</span>, value);
}, <span class="hljs-function"><span class="hljs-params">(reason)</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;all reason&apos;</span>, reason);
})</code></pre><p>&#x6253;&#x5370;&#x7ED3;&#x679C;&#xFF1A;</p><blockquote>aaaa<br>bbbb<br>cccc<br>1111<br>2222<br>all reason 2222<br>3333</blockquote><h3 id="articleHeader12">11. &#x5B9E;&#x73B0;<code>Promise.race</code>&#x65B9;&#x6CD5;</h3><p><code>Promise.race()</code>&#x63A5;&#x6536;&#x4E00;&#x4E2A;&#x5305;&#x542B;&#x591A;&#x4E2A;<code>Promise</code>&#x7684;&#x6570;&#x7EC4;&#xFF0C;&#x5F53;&#x6709;&#x4E00;&#x4E2A;<code>Promise</code>&#x4E3A;<code>fulfilled</code>&#x72B6;&#x6001;&#x65F6;&#xFF0C;&#x6574;&#x4E2A;&#x5927;&#x7684;<code>Promise</code>&#x4E3A;<code>onfulfilled</code>&#xFF0C;&#x5E76;&#x6267;&#x884C;<code>onFulfilled</code>&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x3002;&#x5982;&#x679C;&#x6709;&#x4E00;&#x4E2A;<code>Promise</code>&#x4E3A;<code>rejected</code>&#x72B6;&#x6001;&#xFF0C;&#x5219;&#x6574;&#x4E2A;<code>Promise.race</code>&#x4E3A;<code>rejected</code>&#x3002;</p><p><strong>MyPromise.js</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="MyPromise.race = function(promiseArr) {
  return new MyPromise((resolve, reject) =&gt; {
    promiseArr.forEach(promise =&gt; {
      promise.then((value) =&gt; {
        resolve(value);   
      }, reject);
    });
  });
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>MyPromise.race = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">promiseArr</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> MyPromise(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    promiseArr.forEach(<span class="hljs-function"><span class="hljs-params">promise</span> =&gt;</span> {
      promise.then(<span class="hljs-function">(<span class="hljs-params">value</span>) =&gt;</span> {
        resolve(value);   
      }, reject);
    });
  });
};</code></pre><p><strong>test.js</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let MyPromise = require(&apos;./MyPromise.js&apos;);

let promise1 = new MyPromise((resolve, reject) =&gt; {
  console.log(&apos;aaaa&apos;);
  setTimeout(() =&gt; {
    resolve(1111);
    console.log(1111);
  }, 1000);
});

let promise2 = new MyPromise((resolve, reject) =&gt; {
  console.log(&apos;bbbb&apos;);
  setTimeout(() =&gt; {
    reject(2222);
    console.log(2222);
  }, 2000);
});

let promise3 = new MyPromise((resolve, reject) =&gt; {
  console.log(&apos;cccc&apos;);
  setTimeout(() =&gt; {
    resolve(3333);
    console.log(3333);
  }, 3000);
});

Promise.race([promise1, promise2, promise3]).then((value) =&gt; {
  console.log(&apos;all value&apos;, value);
}, (reason) =&gt; {
  console.log(&apos;all reason&apos;, reason);
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code>let MyPromise = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./MyPromise.js&apos;</span>);

let promise1 = <span class="hljs-keyword">new</span> MyPromise(<span class="hljs-function"><span class="hljs-params">(resolve, reject)</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;aaaa&apos;</span>);
  setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    resolve(<span class="hljs-number">1111</span>);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1111</span>);
  }, <span class="hljs-number">1000</span>);
});

let promise2 = <span class="hljs-keyword">new</span> MyPromise(<span class="hljs-function"><span class="hljs-params">(resolve, reject)</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;bbbb&apos;</span>);
  setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    reject(<span class="hljs-number">2222</span>);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">2222</span>);
  }, <span class="hljs-number">2000</span>);
});

let promise3 = <span class="hljs-keyword">new</span> MyPromise(<span class="hljs-function"><span class="hljs-params">(resolve, reject)</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;cccc&apos;</span>);
  setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    resolve(<span class="hljs-number">3333</span>);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">3333</span>);
  }, <span class="hljs-number">3000</span>);
});

Promise.race([promise1, promise2, promise3]).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(value)</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;all value&apos;</span>, value);
}, <span class="hljs-function"><span class="hljs-params">(reason)</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;all reason&apos;</span>, reason);
})</code></pre><p>&#x6253;&#x5370;&#x7ED3;&#x679C;&#xFF1A;</p><blockquote>aaaa<br>bbbb<br>cccc<br>1111<br>all reason 1111<br>2222<br>3333</blockquote><h3 id="articleHeader13">12. &#x5B9E;&#x73B0;<code>Promise.resolve</code>&#x65B9;&#x6CD5;</h3><p><code>Promise.resolve</code>&#x7528;&#x6765;&#x751F;&#x6210;&#x4E00;&#x4E2A;<code>fulfilled</code>&#x5B8C;&#x6210;&#x6001;&#x7684;<code>Promise</code>&#xFF0C;&#x4E00;&#x822C;&#x653E;&#x5728;&#x6574;&#x4E2A;<code>Promise</code>&#x94FE;&#x7684;&#x5F00;&#x5934;&#xFF0C;&#x7528;&#x6765;&#x5F00;&#x59CB;&#x4E00;&#x4E2A;<code>Promise</code>&#x94FE;&#x3002;</p><p><strong>MyPromise.js</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="MyPromise.resolve = function(value) {
  let promise;

  promise = new MyPromise((resolve, reject) =&gt; {
    this.prototype.resolvePromise(promise, value, resolve, reject);
  });

  return promise;
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>MyPromise.resolve = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
  <span class="hljs-keyword">let</span> promise;

  promise = <span class="hljs-keyword">new</span> MyPromise(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    <span class="hljs-keyword">this</span>.prototype.resolvePromise(promise, value, resolve, reject);
  });

  <span class="hljs-keyword">return</span> promise;
};</code></pre><p><strong>test.js</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let MyPromise = require(&apos;./MyPromise.js&apos;);

MyPromise.resolve(1111).then((value) =&gt; {
  console.log(&apos;value1&apos;, value);
  return new MyPromise((resolve, reject) =&gt; {
    resolve(2222);
  })
}).then((value) =&gt; {
  console.log(&apos;value2&apos;, value);
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code>let MyPromise = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./MyPromise.js&apos;</span>);

MyPromise.resolve(<span class="hljs-number">1111</span>).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(value)</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;value1&apos;</span>, value);
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> MyPromise(<span class="hljs-function"><span class="hljs-params">(resolve, reject)</span> =&gt;</span> {
    resolve(<span class="hljs-number">2222</span>);
  })
}).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(value)</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;value2&apos;</span>, value);
})</code></pre><p>&#x6253;&#x5370;&#x7ED3;&#x679C;&#xFF1A;</p><blockquote>value1 1111<br>value2 2222</blockquote><p>&#x7531;&#x4E8E;&#x4F20;&#x5165;&#x7684;<code>value</code>&#x6709;&#x53EF;&#x80FD;&#x662F;&#x666E;&#x901A;&#x503C;&#xFF0C;&#x6709;&#x53EF;&#x80FD;&#x662F;<code>thenable</code>&#xFF0C;&#x4E5F;&#x6709;&#x53EF;&#x80FD;&#x662F;&#x53E6;&#x4E00;&#x4E2A;<code>Promise</code>&#xFF0C;&#x6240;&#x4EE5;&#x8C03;&#x7528;<code>resolvePromise</code>&#x8FDB;&#x884C;&#x89E3;&#x6790;&#x3002;</p><h3 id="articleHeader14">12. &#x5B9E;&#x73B0;<code>Promise.reject</code>&#x65B9;&#x6CD5;</h3><p><code>Promise.reject</code>&#x7528;&#x6765;&#x751F;&#x6210;&#x4E00;&#x4E2A;<code>rejected</code>&#x5931;&#x8D25;&#x6001;&#x7684;<code>Promise</code>&#x3002;</p><p><strong>MyPromise.js</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="MyPromise.reject = function(reason) {
  return new MyPromise((resolve, reject) =&gt; {
    reject(reason);
  });
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>MyPromise.reject = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">reason</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> MyPromise(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    reject(reason);
  });
};</code></pre><p><strong>test.js</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let MyPromise = require(&apos;./MyPromise.js&apos;);

MyPromise.reject(1111).then((value) =&gt; {
  console.log(&apos;value1&apos;, value);
  return new MyPromise((resolve, reject) =&gt; {
    resolve(2222);
  })
}).then((value) =&gt; {
  console.log(&apos;value2&apos;, value);
}).catch(reason =&gt; {
  console.log(&apos;reason&apos;, reason);
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code>let MyPromise = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./MyPromise.js&apos;</span>);

MyPromise.reject(<span class="hljs-number">1111</span>).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(value)</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;value1&apos;</span>, value);
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> MyPromise(<span class="hljs-function"><span class="hljs-params">(resolve, reject)</span> =&gt;</span> {
    resolve(<span class="hljs-number">2222</span>);
  })
}).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(value)</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;value2&apos;</span>, value);
}).<span class="hljs-keyword">catch</span>(reason =&gt; {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;reason&apos;</span>, reason);
});</code></pre><p>&#x6253;&#x5370;&#x7ED3;&#x679C;&#xFF1A;</p><blockquote>reason 1111</blockquote><h3 id="articleHeader15">13. &#x5B9E;&#x73B0;<code>Promise.deferred</code>&#x65B9;&#x6CD5;</h3><p><code>Promise.deferred</code>&#x53EF;&#x4EE5;&#x7528;&#x6765;&#x5EF6;&#x8FDF;&#x6267;&#x884C;<code>resolve</code>&#x548C;<code>reject</code>&#x3002;</p><p><strong>MyPromise.js</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="MyPromise.deferred = function() {
    let dfd = {};
    dfd.promies = new MyPromise((resolve, reject) =&gt; {
      dfd.resolve = resolve;
      dfd.rfeject = reject;
    });
    return dfd;
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>MyPromise.deferred = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">let</span> dfd = {};
    dfd.promies = <span class="hljs-keyword">new</span> MyPromise(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
      dfd.resolve = resolve;
      dfd.rfeject = reject;
    });
    <span class="hljs-keyword">return</span> dfd;
};</code></pre><p>&#x8FD9;&#x6837;&#xFF0C;&#x4F60;&#x5C31;&#x53EF;&#x4EE5;&#x5728;&#x5916;&#x90E8;&#x901A;&#x8FC7;&#x8C03;&#x7528;<code>dfd.resolve()</code>&#x548C;<code>dfd.reject()</code>&#x6765;&#x51B3;&#x8BAE;&#x8BE5;<code>Promise</code>&#x3002;</p><h3 id="articleHeader16">13. &#x5982;&#x4F55;&#x505C;&#x6B62;&#x4E00;&#x4E2A;<code>Promise</code>&#x94FE;</h3><p>&#x5047;&#x8BBE;&#x8FD9;&#x6837;&#x4E00;&#x4E2A;&#x573A;&#x666F;&#xFF0C;&#x6211;&#x4EEC;&#x6709;&#x4E00;&#x4E2A;&#x5F88;&#x957F;&#x7684;<code>Promise</code>&#x94FE;&#x5F0F;&#x8C03;&#x7528;&#xFF0C;&#x8FD9;&#x4E9B;<code>Promise</code>&#x662F;&#x4F9D;&#x6B21;&#x4F9D;&#x8D56;&#x7684;&#x5173;&#x7CFB;&#xFF0C;&#x5982;&#x679C;&#x94FE;&#x6761;&#x4E2D;&#x7684;&#x67D0;&#x4E2A;<code>Promise</code>&#x51FA;&#x9519;&#x4E86;&#xFF0C;&#x5C31;&#x4E0D;&#x9700;&#x8981;&#x518D;&#x5411;&#x4E0B;&#x6267;&#x884C;&#x4E86;&#xFF0C;&#x9ED8;&#x8BA4;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x6211;&#x4EEC;&#x662F;&#x65E0;&#x6CD5;&#x5B9E;&#x73B0;&#x8FD9;&#x4E2A;&#x9700;&#x6C42;&#x7684;&#xFF0C;&#x56E0;&#x4E3A;<code>Promise</code>&#x65E0;&#x8BBA;&#x662F;<code>then</code>&#x8FD8;&#x662F;<code>catch</code>&#x90FD;&#x4F1A;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;<code>Promise</code>&#xFF0C;&#x90FD;&#x4F1A;&#x7EE7;&#x7EED;&#x5411;&#x4E0B;&#x6267;&#x884C;<code>then</code>&#x6216;<code>catch</code>&#x3002;&#x4E3E;&#x4F8B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Promise(function(resolve, reject) {
  resolve(1111)
}).then(function(value) {
  // &quot;ERROR!!!&quot;
}).catch()
  .then()
  .then()
  .catch()
  .then()" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs livecodeserver"><code><span class="hljs-built_in">new</span> Promise(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-title">resolve</span>, <span class="hljs-title">reject</span>) {</span>
  <span class="hljs-built_in">resolve</span>(<span class="hljs-number">1111</span>)
}).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-title">value</span>) {</span>
 <span class="hljs-comment"> // &quot;ERROR!!!&quot;</span>
}).<span class="hljs-keyword">catch</span>()
  .<span class="hljs-keyword">then</span>()
  .<span class="hljs-keyword">then</span>()
  .<span class="hljs-keyword">catch</span>()
  .<span class="hljs-keyword">then</span>()</code></pre><p>&#x6709;&#x6CA1;&#x6709;&#x529E;&#x6CD5;&#x8BA9;&#x8FD9;&#x4E2A;&#x94FE;&#x5F0F;&#x8C03;&#x7528;&#x5728;ERROR!!!&#x7684;&#x540E;&#x9762;&#x5C31;&#x505C;&#x6389;&#xFF0C;&#x5B8C;&#x5168;&#x4E0D;&#x53BB;&#x6267;&#x884C;&#x94FE;&#x5F0F;&#x8C03;&#x7528;&#x540E;&#x9762;&#x6240;&#x6709;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x5462;&#xFF1F;</p><p>&#x6211;&#x4EEC;&#x81EA;&#x5DF1;&#x5C01;&#x88C5;&#x4E00;&#x4E2A;<code>Promise.stop</code>&#x65B9;&#x6CD5;&#x3002;</p><p><strong>MyPromise.js</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="MyPromise.stop = function() {
  return new Promise(function() {});
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>MyPromise.stop = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{});
};</code></pre><p><code>stop</code>&#x4E2D;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x6C38;&#x8FDC;&#x4E0D;&#x6267;&#x884C;<code>resolve</code>&#x6216;&#x8005;<code>reject</code>&#x7684;<code>Promise</code>&#xFF0C;&#x90A3;&#x4E48;&#x8FD9;&#x4E2A;<code>Promise</code>&#x6C38;&#x8FDC;&#x5904;&#x4E8E;<code>pending</code>&#x72B6;&#x6001;&#xFF0C;&#x6240;&#x4EE5;&#x6C38;&#x8FDC;&#x4E5F;&#x4E0D;&#x4F1A;&#x5411;&#x4E0B;&#x6267;&#x884C;<code>then</code>&#x6216;<code>catch</code>&#x4E86;&#x3002;&#x8FD9;&#x6837;&#x6211;&#x4EEC;&#x5C31;&#x505C;&#x6B62;&#x4E86;&#x4E00;&#x4E2A;<code>Promise</code>&#x94FE;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new MyPromise(function(resolve, reject) {
  resolve(1111)
}).then(function(value) {
  // &quot;ERROR!!!&quot;
  MyPromise.stop();
}).catch()
  .then()
  .then()
  .catch()
  .then()" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scilab"><code>new MyPromise(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(resolve, reject)</span> {</span>
  resolve(<span class="hljs-number">1111</span>)
}).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(value)</span> {</span>
  <span class="hljs-comment">// &quot;ERROR!!!&quot;</span>
  MyPromise.stop();
}).<span class="hljs-keyword">catch</span>()
  .<span class="hljs-keyword">then</span>()
  .<span class="hljs-keyword">then</span>()
  .<span class="hljs-keyword">catch</span>()
  .<span class="hljs-keyword">then</span>()</code></pre><p>&#x4F46;&#x662F;&#x8FD9;&#x6837;&#x4F1A;&#x6709;&#x4E00;&#x4E2A;&#x7F3A;&#x70B9;&#xFF0C;&#x5C31;&#x662F;&#x94FE;&#x5F0F;&#x8C03;&#x7528;&#x540E;&#x9762;&#x7684;&#x6240;&#x6709;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x90FD;&#x65E0;&#x6CD5;&#x88AB;&#x5783;&#x573E;&#x56DE;&#x6536;&#x5668;&#x56DE;&#x6536;&#x3002;</p><h3 id="articleHeader17">14. &#x5982;&#x4F55;&#x89E3;&#x51B3;<code>Promise</code>&#x94FE;&#x4E0A;&#x8FD4;&#x56DE;&#x7684;&#x6700;&#x540E;&#x4E00;&#x4E2A;<code>Promise</code>&#x51FA;&#x73B0;&#x9519;&#x8BEF;</h3><p>&#x770B;&#x5982;&#x4E0B;&#x4F8B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Promise(function(resolve) {
  resolve(42)
}).then(function(value) {
  a.b = 2;
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve</span>) </span>{
  resolve(<span class="hljs-number">42</span>)
}).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
  a.b = <span class="hljs-number">2</span>;
});</code></pre><p>&#x8FD9;&#x91CC;a&#x4E0D;&#x5B58;&#x5728;&#xFF0C;&#x6240;&#x4EE5;&#x7ED9;a.b&#x8D4B;&#x503C;&#x662F;&#x4E00;&#x4E2A;&#x8BED;&#x6CD5;&#x9519;&#x8BEF;&#xFF0C;<code>onFulfilled</code>&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x662F;&#x5305;&#x5728;<code>try...catch</code>&#x4E2D;&#x6267;&#x884C;&#x7684;&#xFF0C;&#x9519;&#x8BEF;&#x4F1A;&#x88AB;<code>catch</code>&#x5230;&#xFF0C;&#x4F46;&#x662F;&#x7531;&#x4E8E;&#x540E;&#x9762;&#x6CA1;&#x6709;<code>then</code>&#x6216;<code>catch</code>&#x4E86;&#xFF0C;&#x8FD9;&#x4E2A;&#x9519;&#x8BEF;&#x65E0;&#x6CD5;&#x88AB;&#x5904;&#x7406;&#xFF0C;&#x5C31;&#x4F1A;&#x88AB;<code>Promise</code>&#x5403;&#x6389;&#xFF0C;&#x6CA1;&#x6709;&#x4EFB;&#x4F55;&#x5F02;&#x5E38;&#xFF0C;&#x8FD9;&#x5C31;&#x662F;&#x5E38;&#x8BF4;&#x7684;<strong>Promise&#x6709;&#x53EF;&#x80FD;&#x4F1A;&#x5403;&#x6389;&#x9519;&#x8BEF;</strong>&#x3002;</p><p>&#x90A3;&#x4E48;&#x6211;&#x4EEC;&#x600E;&#x4E48;&#x5904;&#x7406;&#x8FD9;&#x79CD;&#x60C5;&#x51B5;&#x5462;&#xFF1F;</p><p><strong>&#x65B9;&#x6CD5;&#x4E00;</strong></p><p>&#x5C31;&#x662F;&#x6211;&#x4EEC;&#x524D;&#x9762;&#x5DF2;&#x7ECF;&#x5B9E;&#x73B0;&#x8FC7;&#x7684;<code>done()</code>&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Promise(function(resolve) {
  resolve(42)
}).then(function(value) {
  a.b = 2;
}).done();" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve</span>) </span>{
  resolve(<span class="hljs-number">42</span>)
}).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
  a.b = <span class="hljs-number">2</span>;
}).done();</code></pre><p><code>done()</code>&#x65B9;&#x6CD5;&#x76F8;&#x5F53;&#x4E8E;&#x4E00;&#x4E2A;<code>catch</code>&#xFF0C;&#x4F46;&#x662F;&#x5374;&#x4E0D;&#x518D;&#x8FD4;&#x56DE;<code>Promise</code>&#x4E86;&#xFF0C;&#x6CE8;&#x610F;<code>done()</code>&#x65B9;&#x6CD5;&#x4E2D;&#x4E0D;&#x80FD;&#x51FA;&#x73B0;&#x8BED;&#x6CD5;&#x9519;&#x8BEF;&#xFF0C;&#x5426;&#x5219;&#x53C8;&#x65E0;&#x6CD5;&#x6355;&#x83B7;&#x4E86;&#x3002;</p><p><strong>&#x65B9;&#x6CD5;&#x4E8C;</strong></p><p>&#x666E;&#x901A;&#x9519;&#x8BEF;&#x76D1;&#x542C;<code>window</code>&#x7684;<code>error</code>&#x4E8B;&#x4EF6;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x6355;&#x83B7;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.addEventListener(&apos;error&apos;, error =&gt; {
  console.log(error); // &#x4E0D;&#x4F1A;&#x89E6;&#x53D1;
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs gauss"><code><span class="hljs-built_in">window</span>.addEventListener(&apos;<span class="hljs-built_in">error</span>&apos;, <span class="hljs-built_in">error</span> =&gt; {
  console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">error</span>); <span class="hljs-comment">// &#x4E0D;&#x4F1A;&#x89E6;&#x53D1;</span>
});</code></pre><p>Promise&#x6CA1;&#x6709;&#x88AB;<code>onRejected()</code>&#x5904;&#x7406;&#x7684;&#x9519;&#x8BEF;&#x9700;&#x8981;&#x76D1;&#x542C;<code>unhandledrejection</code>&#x4E8B;&#x4EF6;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.addEventListener(&apos;unhandledrejection&apos;, error =&gt; {
  console.log(&apos;unhandledrejection&apos;, error); // &#x53EF;&#x4EE5;&#x89E6;&#x53D1;&#xFF0C;&#x800C;&#x4E14;&#x8FD8;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x62FF;&#x5230; promise &#x5BF9;&#x8C61;
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs mel"><code><span class="hljs-keyword">window</span>.addEventListener(<span class="hljs-string">&apos;unhandledrejection&apos;</span>, <span class="hljs-keyword">error</span> =&gt; {
  console.<span class="hljs-keyword">log</span>(<span class="hljs-string">&apos;unhandledrejection&apos;</span>, <span class="hljs-keyword">error</span>); <span class="hljs-comment">// &#x53EF;&#x4EE5;&#x89E6;&#x53D1;&#xFF0C;&#x800C;&#x4E14;&#x8FD8;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x62FF;&#x5230; promise &#x5BF9;&#x8C61;</span>
});</code></pre><h3 id="articleHeader18">14. &#x5355;&#x5143;&#x6D4B;&#x8BD5;</h3><h1 id="articleHeader19">&#x7ED3;&#x675F;</h1><p>&#x76F8;&#x5173;&#x5355;&#x5143;&#x6D4B;&#x8BD5;&#x4EE5;&#x53CA;&#x5B8C;&#x6574;&#x4EE3;&#x7801;&#x53EF;&#x4EE5;&#x5230;&#x6211;&#x7684;<a href="https://github.com/leocoder351/my-promise" rel="nofollow noreferrer" target="_blank">github</a>&#x67E5;&#x770B;&#xFF0C;&#x5982;&#x679C;&#x5BF9;&#x4F60;&#x6709;&#x5E2E;&#x52A9;&#x7684;&#x8BDD;&#xFF0C;&#x5C31;&#x6765;&#x4E2A;star&#x5427;~</p><p><span class="img-wrap"><img data-src="http://p54fus2hp.bkt.clouddn.com/blog/20180928/unittest.png" src="https://static.alili.techhttp://p54fus2hp.bkt.clouddn.com/blog/20180928/unittest.png" alt="&#x5355;&#x5143;&#x6D4B;&#x8BD5;" title="&#x5355;&#x5143;&#x6D4B;&#x8BD5;" style="cursor:pointer"></span></p><p><span class="img-wrap"><img data-src="http://p54fus2hp.bkt.clouddn.com/promise-github.png" src="https://static.alili.techhttp://p54fus2hp.bkt.clouddn.com/promise-github.png" alt="github" title="github" style="cursor:pointer"></span></p><h2 id="articleHeader20">&#x53C2;&#x8003;&#x6587;&#x6863;</h2><p><a href="https://promisesaplus.com/" rel="nofollow noreferrer" target="_blank">PromiseA+&#x89C4;&#x8303;</a></p>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从0到1实现Promise

## 原文链接
[https://segmentfault.com/a/1190000016550260](https://segmentfault.com/a/1190000016550260)

