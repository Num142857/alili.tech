---
title: '从ES6重新认识JavaScript设计模式(五): 代理模式和Proxy' 
date: 2018-11-20 2:30:10
hidden: true
slug: vo4qgeuef
categories: [reprint]
---

{{< raw >}}
<h3><strong>1 &#x4EC0;&#x4E48;&#x662F;&#x4EE3;&#x7406;&#x6A21;&#x5F0F;</strong></h3><p><span class="img-wrap"><img data-src="/img/remote/1460000015800706?w=1262&amp;h=464" src="https://static.alili.tech/img/remote/1460000015800706?w=1262&amp;h=464" alt="an object" title="an object"></span></p><blockquote>&#x4E3A;&#x5176;&#x4ED6;&#x5BF9;&#x8C61;&#x63D0;&#x4F9B;&#x4E00;&#x79CD;&#x4EE3;&#x7406;&#x4EE5;&#x63A7;&#x5236;&#x5BF9;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#x7684;&#x8BBF;&#x95EE;&#x3002;&#x5728;&#x67D0;&#x4E9B;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x4E0D;&#x9002;&#x5408;&#x6216;&#x8005;&#x4E0D;&#x80FD;&#x76F4;&#x63A5;&#x5F15;&#x7528;&#x53E6;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x800C;&#x4EE3;&#x7406;&#x5BF9;&#x8C61;&#x53EF;&#x4EE5;&#x5728;&#x5BA2;&#x6237;&#x7AEF;&#x548C;&#x76EE;&#x6807;&#x5BF9;&#x8C61;&#x4E4B;&#x95F4;&#x8D77;&#x5230;&#x4E2D;&#x4ECB;&#x7684;&#x4F5C;&#x7528;&#x3002;</blockquote><p>&#x5728;&#x751F;&#x6D3B;&#x4E2D;&#xFF0C;&#x4EE3;&#x7406;&#x6A21;&#x5F0F;&#x7684;&#x573A;&#x666F;&#x662F;&#x5341;&#x5206;&#x5E38;&#x89C1;&#x7684;&#xFF0C;&#x4F8B;&#x5982;&#x6211;&#x4EEC;&#x73B0;&#x5728;&#x5982;&#x679C;&#x6709;&#x79DF;&#x623F;&#x3001;&#x4E70;&#x623F;&#x7684;&#x9700;&#x6C42;&#xFF0C;&#x66F4;&#x591A;&#x7684;&#x662F;&#x53BB;&#x627E;&#x94FE;&#x5BB6;&#x7B49;&#x623F;&#x5C4B;&#x4E2D;&#x4ECB;&#x673A;&#x6784;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x76F4;&#x63A5;&#x5BFB;&#x627E;&#x60F3;&#x5356;&#x623F;&#x6216;&#x51FA;&#x79DF;&#x623F;&#x7684;&#x4EBA;&#x8C08;&#x3002;&#x6B64;&#x65F6;&#xFF0C;&#x94FE;&#x5BB6;&#x8D77;&#x5230;&#x7684;&#x4F5C;&#x7528;&#x5C31;&#x662F;&#x4EE3;&#x7406;&#x7684;&#x4F5C;&#x7528;&#x3002;&#x94FE;&#x5BB6;&#x548C;&#x4ED6;&#x6240;&#x4EE3;&#x7406;&#x7684;&#x5BA2;&#x6237;&#x5728;&#x79DF;&#x623F;&#x3001;&#x552E;&#x623F;&#x4E0A;&#x63D0;&#x4F9B;&#x7684;&#x65B9;&#x6CD5;&#x53EF;&#x80FD;&#x90FD;&#x662F;&#x4E00;&#x81F4;&#x7684;&#xFF08;&#x6536;&#x94B1;&#xFF0C;&#x7B7E;&#x5408;&#x540C;&#xFF09;&#xFF0C;&#x53EF;&#x662F;&#x94FE;&#x5BB6;&#x4F5C;&#x4E3A;&#x4EE3;&#x7406;&#x5374;&#x63D0;&#x4F9B;&#x4E86;&#x8BBF;&#x95EE;&#x9650;&#x5236;&#xFF0C;&#x8BA9;&#x6211;&#x4EEC;&#x4E0D;&#x80FD;&#x76F4;&#x63A5;&#x8BBF;&#x95EE;&#x88AB;&#x4EE3;&#x7406;&#x7684;&#x5BA2;&#x6237;&#x3002;</p><p>&#x5728;&#x9762;&#x5411;&#x5BF9;&#x8C61;&#x7684;&#x7F16;&#x7A0B;&#x4E2D;&#xFF0C;&#x4EE3;&#x7406;&#x6A21;&#x5F0F;&#x7684;&#x5408;&#x7406;&#x4F7F;&#x7528;&#x80FD;&#x591F;&#x5F88;&#x597D;&#x7684;&#x4F53;&#x73B0;&#x4E0B;&#x9762;&#x4E24;&#x6761;&#x539F;&#x5219;:</p><ul><li><strong>&#x5355;&#x4E00;&#x804C;&#x8D23;&#x539F;&#x5219;</strong>: &#x9762;&#x5411;&#x5BF9;&#x8C61;&#x8BBE;&#x8BA1;&#x4E2D;&#x9F13;&#x52B1;&#x5C06;&#x4E0D;&#x540C;&#x7684;&#x804C;&#x8D23;&#x5206;&#x5E03;&#x5230;&#x7EC6;&#x7C92;&#x5EA6;&#x7684;&#x5BF9;&#x8C61;&#x4E2D;&#xFF0C;Proxy &#x5728;&#x539F;&#x5BF9;&#x8C61;&#x7684;&#x57FA;&#x7840;&#x4E0A;&#x8FDB;&#x884C;&#x4E86;&#x529F;&#x80FD;&#x7684;&#x884D;&#x751F;&#x800C;&#x53C8;&#x4E0D;&#x5F71;&#x54CD;&#x539F;&#x5BF9;&#x8C61;&#xFF0C;&#x7B26;&#x5408;&#x677E;&#x8026;&#x5408;&#x9AD8;&#x5185;&#x805A;&#x7684;&#x8BBE;&#x8BA1;&#x7406;&#x5FF5;&#x3002;</li><li><strong>&#x5F00;&#x653E;-&#x5C01;&#x95ED;&#x539F;&#x5219;</strong>&#xFF1A;&#x4EE3;&#x7406;&#x53EF;&#x4EE5;&#x968F;&#x65F6;&#x4ECE;&#x7A0B;&#x5E8F;&#x4E2D;&#x53BB;&#x6389;&#xFF0C;&#x800C;&#x4E0D;&#x7528;&#x5BF9;&#x5176;&#x4ED6;&#x90E8;&#x5206;&#x7684;&#x4EE3;&#x7801;&#x8FDB;&#x884C;&#x4FEE;&#x6539;&#xFF0C;&#x5728;&#x5B9E;&#x9645;&#x573A;&#x666F;&#x4E2D;&#xFF0C;&#x968F;&#x7740;&#x7248;&#x672C;&#x7684;&#x8FED;&#x4EE3;&#x53EF;&#x80FD;&#x4F1A;&#x6709;&#x591A;&#x79CD;&#x539F;&#x56E0;&#x4E0D;&#x518D;&#x9700;&#x8981;&#x4EE3;&#x7406;&#xFF0C;&#x90A3;&#x4E48;&#x5C31;&#x53EF;&#x4EE5;&#x5BB9;&#x6613;&#x7684;&#x5C06;&#x4EE3;&#x7406;&#x5BF9;&#x8C61;&#x6362;&#x6210;&#x539F;&#x5BF9;&#x8C61;&#x7684;&#x8C03;&#x7528;</li></ul><h3><strong>2 ES6&#x4E2D;&#x7684;&#x4EE3;&#x7406;&#x6A21;&#x5F0F;</strong></h3><p>ES6&#x6240;&#x63D0;&#x4F9B;<code>Proxy</code>&#x6784;&#x9020;&#x51FD;&#x6570;&#x80FD;&#x591F;&#x8BA9;&#x6211;&#x4EEC;&#x8F7B;&#x677E;&#x7684;&#x4F7F;&#x7528;&#x4EE3;&#x7406;&#x6A21;&#x5F0F;:</p><pre><code class="JavaScript">var proxy = new Proxy(target, handler);</code></pre><p><code>Proxy</code>&#x6784;&#x9020;&#x51FD;&#x6570;&#x4F20;&#x5165;&#x4E24;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;<code>target</code>&#x8868;&#x793A;&#x6240;&#x8981;&#x4EE3;&#x7406;&#x7684;&#x5BF9;&#x8C61;&#xFF0C;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;<code>handler</code>&#x4E5F;&#x662F;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x7528;&#x6765;&#x8BBE;&#x7F6E;&#x5BF9;&#x6240;&#x4EE3;&#x7406;&#x7684;&#x5BF9;&#x8C61;&#x7684;&#x884C;&#x4E3A;&#x3002;&#x5982;&#x679C;&#x60F3;&#x77E5;&#x9053;<code>Proxy</code>&#x7684;&#x5177;&#x4F53;&#x4F7F;&#x7528;&#x65B9;&#x6CD5;&#xFF0C;&#x53EF;&#x53C2;&#x8003;&#x962E;&#x4E00;&#x5CF0;&#x7684;<a href="http://es6.ruanyifeng.com/#docs/proxy" rel="nofollow noreferrer">&#x300A; ECMAScript&#x5165;&#x95E8; - Proxy &#x300B;</a>&#x3002;</p><p>&#x672C;&#x6587;&#x5C06;&#x5229;&#x7528;<code>Proxy</code>&#x5B9E;&#x73B0;&#x524D;&#x7AEF;&#x4E2D;3&#x79CD;&#x4EE3;&#x7406;&#x6A21;&#x5F0F;&#x7684;&#x4F7F;&#x7528;&#x573A;&#x666F;&#xFF0C;&#x5206;&#x522B;&#x662F;&#xFF1A;<strong>&#x7F13;&#x5B58;&#x4EE3;&#x7406;</strong>&#x3001;<strong>&#x9A8C;&#x8BC1;&#x4EE3;&#x7406;</strong>&#x3001;<strong>&#x5B9E;&#x73B0;&#x79C1;&#x6709;&#x5C5E;&#x6027;</strong>&#x3002;</p><h4><strong>2.1 &#x7F13;&#x5B58;&#x4EE3;&#x7406;</strong></h4><p>&#x7F13;&#x5B58;&#x4EE3;&#x7406;&#x53EF;&#x4EE5;&#x5C06;&#x4E00;&#x4E9B;&#x5F00;&#x9500;&#x5F88;&#x5927;&#x7684;&#x65B9;&#x6CD5;&#x7684;&#x8FD0;&#x7B97;&#x7ED3;&#x679C;&#x8FDB;&#x884C;&#x7F13;&#x5B58;&#xFF0C;&#x518D;&#x6B21;&#x8C03;&#x7528;&#x8BE5;&#x51FD;&#x6570;&#x65F6;&#xFF0C;&#x82E5;&#x53C2;&#x6570;&#x4E00;&#x81F4;&#xFF0C;&#x5219;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x8FD4;&#x56DE;&#x7F13;&#x5B58;&#x4E2D;&#x7684;&#x7ED3;&#x679C;&#xFF0C;&#x800C;&#x4E0D;&#x7528;&#x518D;&#x91CD;&#x65B0;&#x8FDB;&#x884C;&#x8FD0;&#x7B97;&#x3002;&#x4F8B;&#x5982;&#x5728;&#x91C7;&#x7528;&#x540E;&#x7AEF;&#x5206;&#x9875;&#x7684;&#x8868;&#x683C;&#x65F6;&#xFF0C;&#x6BCF;&#x6B21;&#x9875;&#x7801;&#x6539;&#x53D8;&#x65F6;&#x9700;&#x8981;&#x91CD;&#x65B0;&#x8BF7;&#x6C42;&#x540E;&#x7AEF;&#x6570;&#x636E;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5C06;&#x9875;&#x7801;&#x548C;&#x5BF9;&#x5E94;&#x7ED3;&#x679C;&#x8FDB;&#x884C;&#x7F13;&#x5B58;&#xFF0C;&#x5F53;&#x8BF7;&#x6C42;&#x540C;&#x4E00;&#x9875;&#x65F6;&#x5C31;&#x4E0D;&#x7528;&#x5728;&#x8FDB;&#x884C;ajax&#x8BF7;&#x6C42;&#x800C;&#x662F;&#x76F4;&#x63A5;&#x8FD4;&#x56DE;&#x7F13;&#x5B58;&#x4E2D;&#x7684;&#x6570;&#x636E;&#x3002;</p><p>&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x4EE5;&#x6CA1;&#x6709;&#x7ECF;&#x8FC7;&#x4EFB;&#x4F55;&#x4F18;&#x5316;&#x7684;&#x8BA1;&#x7B97;&#x6590;&#x6CE2;&#x90A3;&#x5951;&#x6570;&#x5217;&#x7684;&#x51FD;&#x6570;&#x6765;&#x5047;&#x8BBE;&#x4E3A;&#x5F00;&#x9500;&#x5F88;&#x5927;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x8FD9;&#x79CD;&#x9012;&#x5F52;&#x8C03;&#x7528;&#x5728;&#x8BA1;&#x7B97;40&#x4EE5;&#x4E0A;&#x7684;&#x6590;&#x6CE2;&#x90A3;&#x5951;&#x9879;&#x65F6;&#x5C31;&#x80FD;&#x660E;&#x663E;&#x7684;&#x611F;&#x5230;&#x5EF6;&#x8FDF;&#x611F;&#x3002;</p><pre><code class="JavaScript">const getFib = (number) =&gt; {
  if (number &lt;= 2) {
    return 1;
  } else {
    return getFib(number - 1) + getFib(number - 2);
  }
}</code></pre><p>&#x73B0;&#x5728;&#x6211;&#x4EEC;&#x6765;&#x5199;&#x4E00;&#x4E2A;&#x521B;&#x5EFA;&#x7F13;&#x5B58;&#x4EE3;&#x7406;&#x7684;&#x5DE5;&#x5382;&#x51FD;&#x6570;:</p><pre><code class="JavaScript">const getCacheProxy = (fn, cache = new Map()) =&gt; {
  return new Proxy(fn, {
    apply(target, context, args) {
      const argsString = args.join(&apos; &apos;);
      if (cache.has(argsString)) {
        // &#x5982;&#x679C;&#x6709;&#x7F13;&#x5B58;,&#x76F4;&#x63A5;&#x8FD4;&#x56DE;&#x7F13;&#x5B58;&#x6570;&#x636E;
        console.log(`&#x8F93;&#x51FA;${args}&#x7684;&#x7F13;&#x5B58;&#x7ED3;&#x679C;: ${cache.get(argsString)}`);
        
        return cache.get(argsString);
      }
      const result = fn(...args);
      cache.set(argsString, result);

      return result;
    }
  })
}</code></pre><p>&#x8C03;&#x7528;&#x65B9;&#x6CD5;&#x5982;&#x4E0B;&#xFF1A;</p><pre><code class="JavaScript">const getFibProxy = getCacheProxy(getFib);
getFibProxy(40); // 102334155
getFibProxy(40); // &#x8F93;&#x51FA;40&#x7684;&#x7F13;&#x5B58;&#x7ED3;&#x679C;: 102334155</code></pre><p>&#x5F53;&#x6211;&#x4EEC;&#x7B2C;&#x4E8C;&#x6B21;&#x8C03;&#x7528;<code>getFibProxy(40)</code>&#x65F6;&#xFF0C;<code>getFib</code>&#x51FD;&#x6570;&#x5E76;&#x6CA1;&#x6709;&#x88AB;&#x8C03;&#x7528;&#xFF0C;&#x800C;&#x662F;&#x76F4;&#x63A5;&#x4ECE;<code>cache</code>&#x4E2D;&#x8FD4;&#x56DE;&#x4E86;&#x4E4B;&#x524D;&#x88AB;&#x7F13;&#x5B58;&#x597D;&#x7684;&#x8BA1;&#x7B97;&#x7ED3;&#x679C;&#x3002;&#x901A;&#x8FC7;&#x52A0;&#x5165;&#x7F13;&#x5B58;&#x4EE3;&#x7406;&#x7684;&#x65B9;&#x5F0F;&#xFF0C;<code>getFib</code>&#x53EA;&#x9700;&#x8981;&#x4E13;&#x6CE8;&#x4E8E;&#x81EA;&#x5DF1;&#x8BA1;&#x7B97;&#x6590;&#x6CE2;&#x90A3;&#x5951;&#x6570;&#x5217;&#x7684;&#x804C;&#x8D23;&#xFF0C;&#x7F13;&#x5B58;&#x7684;&#x529F;&#x80FD;&#x4F7F;&#x7531;<code>Proxy</code>&#x5BF9;&#x8C61;&#x5B9E;&#x73B0;&#x7684;&#x3002;&#x8FD9;&#x5B9E;&#x73B0;&#x4E86;&#x6211;&#x4EEC;&#x4E4B;&#x524D;&#x63D0;&#x5230;&#x7684;<strong>&#x5355;&#x4E00;&#x804C;&#x8D23;&#x539F;&#x5219;</strong>&#x3002;</p><h4><strong>2.2 &#x9A8C;&#x8BC1;&#x4EE3;&#x7406;</strong></h4><p><code>Proxy</code>&#x6784;&#x9020;&#x51FD;&#x6570;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x4E2D;&#x7684;<code>set</code>&#x65B9;&#x6CD5;&#xFF0C;&#x53EF;&#x4EE5;&#x5F88;&#x65B9;&#x4FBF;&#x7684;&#x9A8C;&#x8BC1;&#x5411;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x7684;&#x4F20;&#x503C;&#x3002;&#x6211;&#x4EEC;&#x4EE5;&#x4E00;&#x4E2A;&#x4F20;&#x7EDF;&#x7684;&#x767B;&#x9646;&#x8868;&#x5355;&#x4E3E;&#x4F8B;&#xFF0C;&#x8BE5;&#x8868;&#x5355;&#x5BF9;&#x8C61;&#x6709;&#x4E24;&#x4E2A;&#x5C5E;&#x6027;,&#x5206;&#x522B;&#x662F;<code>account</code>&#x548C;<code>password</code>&#xFF0C;&#x6BCF;&#x4E2A;&#x5C5E;&#x6027;&#x503C;&#x90FD;&#x6709;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x548C;&#x5176;&#x5C5E;&#x6027;&#x540D;&#x5BF9;&#x5E94;&#x7684;&#x9A8C;&#x8BC1;&#x65B9;&#x6CD5;&#xFF0C;&#x9A8C;&#x8BC1;&#x89C4;&#x5219;&#x5982;&#x4E0B;&#xFF1A;</p><pre><code class="JavaScript">// &#x8868;&#x5355;&#x5BF9;&#x8C61;
const userForm = {
  account: &apos;&apos;,
  password: &apos;&apos;,
}

// &#x9A8C;&#x8BC1;&#x65B9;&#x6CD5;
const validators = {
  account(value) {
    // account &#x53EA;&#x5141;&#x8BB8;&#x4E3A;&#x4E2D;&#x6587;
    const re = /^[\u4e00-\u9fa5]+$/;
    return {
      valid: re.test(value),
      error: &apos;&quot;account&quot; is only allowed to be Chinese&apos;
    }
  },
  password(value) {
    // password &#x7684;&#x957F;&#x5EA6;&#x5E94;&#x8BE5;&#x5927;&#x4E8E;6&#x4E2A;&#x5B57;&#x7B26;
    return {
      valid: value.length &gt;= 6,
      error: &apos;&quot;password &quot;should more than 6 character&apos;
    }
  }
}</code></pre><p>&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x6765;&#x4F7F;&#x7528;<code>Proxy</code>&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x901A;&#x7528;&#x7684;&#x8868;&#x5355;&#x9A8C;&#x8BC1;&#x5668;</p><pre><code class="JavaScript">const getValidateProxy = (target, validators) =&gt; {
  return new Proxy(target, {
    _validators: validators,
    set(target, prop, value) {
      if (value === &apos;&apos;) {
        console.error(`&quot;${prop}&quot; is not allowed to be empty`);
        return target[prop] = false;
      }
      const validResult = this._validators[prop](value);
      if(validResult.valid) {
        return Reflect.set(target, prop, value);
      } else {
        console.error(`${validResult.error}`);
        return target[prop] = false;
      }
    }
  })
}</code></pre><p>&#x8C03;&#x7528;&#x65B9;&#x5F0F;&#x5982;&#x4E0B;</p><pre><code class="JavaScript">const userFormProxy = getValidateProxy(userForm, validators);
userFormProxy.account = &apos;123&apos;; // &quot;account&quot; is only allowed to be Chinese
userFormProxy.password = &apos;he&apos;; // &quot;password &quot;should more than 6 character</code></pre><p>&#x6211;&#x4EEC;&#x8C03;&#x7528;<code>getValidateProxy</code>&#x65B9;&#x6CD5;&#x53BB;&#x751F;&#x6210;&#x4E86;&#x4E00;&#x4E2A;&#x4EE3;&#x7406;&#x5BF9;&#x8C61;<code>userFormProxy</code>&#xFF0C;&#x8BE5;&#x5BF9;&#x8C61;&#x5728;&#x8BBE;&#x7F6E;&#x5C5E;&#x6027;&#x7684;&#x65F6;&#x5019;&#x4F1A;&#x6839;&#x636E;<code>validators</code>&#x7684;&#x9A8C;&#x8BC1;&#x89C4;&#x5219;&#x5BF9;&#x503C;&#x8FDB;&#x884C;&#x6821;&#x9A8C;&#x3002;&#x8FD9;&#x6211;&#x4EEC;&#x4F7F;&#x7528;&#x7684;&#x662F;<code>console.error</code>&#x629B;&#x51FA;&#x9519;&#x8BEF;&#x4FE1;&#x606F;&#xFF0C;&#x5F53;&#x7136;&#x6211;&#x4EEC;&#x4E5F;&#x53EF;&#x4EE5;&#x52A0;&#x5165;&#x5BF9;DOM&#x7684;&#x4E8B;&#x4EF6;&#x6765;&#x5B9E;&#x73B0;&#x9875;&#x9762;&#x4E2D;&#x7684;&#x6821;&#x9A8C;&#x63D0;&#x793A;&#x3002;</p><h4><strong>2.3 &#x5B9E;&#x73B0;&#x79C1;&#x6709;&#x5C5E;&#x6027;</strong></h4><p>&#x4EE3;&#x7406;&#x6A21;&#x5F0F;&#x8FD8;&#x6709;&#x4E00;&#x4E2A;&#x5F88;&#x91CD;&#x8981;&#x7684;&#x5E94;&#x7528;&#x662F;&#x5B9E;&#x73B0;&#x8BBF;&#x95EE;&#x9650;&#x5236;&#x3002;&#x603B;&#x6240;&#x5468;&#x77E5;&#xFF0C;JavaScript&#x662F;&#x6CA1;&#x6709;&#x79C1;&#x6709;&#x5C5E;&#x6027;&#x8FD9;&#x4E00;&#x4E2A;&#x6982;&#x5FF5;&#x7684;&#xFF0C;&#x901A;&#x5E38;&#x79C1;&#x6709;&#x5C5E;&#x6027;&#x7684;&#x5B9E;&#x73B0;&#x662F;&#x901A;&#x8FC7;&#x51FD;&#x6570;&#x4F5C;&#x7528;&#x57DF;&#x4E2D;&#x53D8;&#x91CF;&#x5B9E;&#x73B0;&#x7684;&#xFF0C;&#x867D;&#x7136;&#x5B9E;&#x73B0;&#x4E86;&#x79C1;&#x6709;&#x5C5E;&#x6027;&#xFF0C;&#x4F46;&#x5BF9;&#x4E8E;&#x53EF;&#x8BFB;&#x6027;&#x6765;&#x8BF4;&#x5E76;&#x4E0D;&#x597D;&#x3002;</p><p>&#x79C1;&#x6709;&#x5C5E;&#x6027;&#x4E00;&#x822C;&#x662F;&#x4EE5;<code>_</code>&#x4E0B;&#x5212;&#x7EBF;&#x5F00;&#x5934;&#xFF0C;&#x901A;&#x8FC7;<code>Proxy</code>&#x6784;&#x9020;&#x51FD;&#x6570;&#x4E2D;&#x7684;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x6240;&#x63D0;&#x4F9B;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5F88;&#x597D;&#x7684;&#x53BB;&#x9650;&#x5236;&#x4EE5;<code>_</code>&#x5F00;&#x5934;&#x7684;&#x5C5E;&#x6027;&#x7684;&#x8BBF;&#x95EE;&#x3002;</p><p>&#x4E0B;&#x9762;&#x6211;&#x6765;&#x5B9E;&#x73B0;<code>getPrivateProps</code>&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x8BE5;&#x51FD;&#x6570;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;<code>obj</code>&#x662F;&#x6240;&#x88AB;&#x4EE3;&#x7406;&#x7684;&#x5BF9;&#x8C61;&#xFF0C;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;<code>filterFunc</code>&#x662F;&#x8FC7;&#x6EE4;&#x8BBF;&#x95EE;&#x5C5E;&#x6027;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x76EE;&#x524D;&#x8BE5;&#x51FD;&#x6570;&#x7684;&#x4F5C;&#x7528;&#x662F;&#x7528;&#x6765;&#x9650;&#x5236;&#x4EE5;<code>_</code>&#x5F00;&#x5934;&#x7684;&#x5C5E;&#x6027;&#x8BBF;&#x95EE;&#x3002;</p><pre><code>function getPrivateProps(obj, filterFunc) {
  return new Proxy(obj, {
    get(obj, prop) {
      if (!filterFunc(prop)) {
        let value = Reflect.get(obj, prop);
        // &#x5982;&#x679C;&#x662F;&#x65B9;&#x6CD5;, &#x5C06;this&#x6307;&#x5411;&#x4FEE;&#x6539;&#x539F;&#x5BF9;&#x8C61;
        if (typeof value === &apos;function&apos;) {
          value = value.bind(obj);
        }
        return value;
      }
    },
    set(obj, prop, value) {
      if (filterFunc(prop)) {
        throw new TypeError(`Can&apos;t set property &quot;${prop}&quot;`);
      }
      return Reflect.set(obj, prop, value);
    },
    has(obj, prop) {
      return filterFunc(prop) ? false : Reflect.has(obj, prop);
    },
    ownKeys(obj) {
      return Reflect.ownKeys(obj).filter(prop =&gt; !filterFunc(prop));
    },
    getOwnPropertyDescriptor(obj, prop) {
      return filterFunc(prop) ? undefined : Reflect.getOwnPropertyDescriptor(obj, prop);
    }
  });
}

function propFilter(prop) {
  return prop.indexOf(&apos;_&apos;) === 0;
}</code></pre><p>&#x5728;&#x4E0A;&#x9762;&#x7684;<code>getPrivateProps</code>&#x65B9;&#x6CD5;&#x7684;&#x5185;&#x90E8;&#x5B9E;&#x73B0;&#x4E2D;, <code>Proxy</code>&#x7684;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x4E2D;&#x6211;&#x4EEC;&#x4F7F;&#x7528;&#x4E86;&#x63D0;&#x4F9B;&#x7684;<code>get</code>,<code>set</code>,<code>has</code>,<code>ownKeys</code>, <code>getOwnPropertyDescriptor</code>&#x8FD9;&#x4E9B;&#x65B9;&#x6CD5;&#xFF0C;&#x8FD9;&#x4E9B;&#x65B9;&#x6CD5;&#x7684;&#x4F5C;&#x7528;&#x5176;&#x5B9E;&#x672C;&#x8D28;&#x90FD;&#x662F;&#x53BB;&#x6700;&#x5927;&#x9650;&#x5EA6;&#x7684;&#x9650;&#x5236;&#x79C1;&#x6709;&#x5C5E;&#x6027;&#x7684;&#x8BBF;&#x95EE;&#x3002;&#x5176;&#x4E2D;&#x5728;<code>get</code>&#x65B9;&#x6CD5;&#x7684;&#x5185;&#x90E8;&#xFF0C;&#x6211;&#x4EEC;&#x6709;&#x4E2A;&#x5224;&#x65AD;&#xFF0C;&#x5982;&#x679C;&#x8BBF;&#x95EE;&#x7684;&#x662F;&#x5BF9;&#x8C61;&#x65B9;&#x6CD5;&#x4F7F;&#x5C06;<code>this</code>&#x6307;&#x5411;&#x88AB;&#x4EE3;&#x7406;&#x5BF9;&#x8C61;&#xFF0C;&#x8FD9;&#x662F;&#x5728;&#x4F7F;&#x7528;<code>Proxy</code>&#x9700;&#x8981;&#x5341;&#x5206;&#x6CE8;&#x610F;&#x7684;&#xFF0C;&#x5982;&#x679C;&#x4E0D;&#x8FD9;&#x4E48;&#x505A;&#x65B9;&#x6CD5;&#x5185;&#x90E8;&#x7684;<code>this</code>&#x4F1A;&#x6307;&#x5411;<code>Proxy</code>&#x4EE3;&#x7406;&#x3002;</p><p>&#x4E0B;&#x9762;&#x6765;&#x770B;&#x4E00;&#x4E0B;<code>getPrivateProps</code>&#x7684;&#x8C03;&#x7528;&#x65B9;&#x6CD5;&#xFF0C;&#x5E76;&#x9A8C;&#x8BC1;&#x5176;&#x4EE3;&#x7406;&#x63D0;&#x4F9B;&#x7684;&#x8BBF;&#x95EE;&#x63A7;&#x5236;&#x7684;&#x80FD;&#x529B;&#x3002;</p><pre><code class="JavaScript">const myObj = {
  public: &apos;hello&apos;,
  _private: &apos;secret&apos;,
  method: function () {
    console.log(this._private);
  }
},

myProxy = getPrivateProps(myObj, propFilter);

console.log(JSON.stringify(myProxy)); // {&quot;public&quot;:&quot;hello&quot;}
console.log(myProxy._private); // undefined
console.log(&apos;_private&apos; in myProxy); // false
console.log(Object.keys(myProxy)); // [&quot;public&quot;, &quot;method&quot;]
for (let prop in myProxy) { console.log(prop); }    // public  method
myProxy._private = 1; // Uncaught TypeError: Can&apos;t set property &quot;_private&quot;</code></pre><h3><strong>3 &#x603B;&#x7ED3;</strong></h3><p>ES6&#x63D0;&#x4F9B;&#x7684;<code>Proxy</code>&#x53EF;&#x4EE5;&#x8BA9;JS&#x5F00;&#x53D1;&#x8005;&#x5F88;&#x65B9;&#x4FBF;&#x7684;&#x4F7F;&#x7528;&#x4EE3;&#x7406;&#x6A21;&#x5F0F;&#xFF0C;&#x542C;&#x8BF4;Vue 3.0&#x7684;&#x4E5F;&#x4F1A;&#x4F7F;&#x7528;<code>Proxy</code>&#x53BB;&#x5927;&#x91CF;&#x6539;&#x5199;&#x6838;&#x5FC3;&#x4EE3;&#x7801;&#x3002;&#x867D;&#x7136;&#x4EE3;&#x7406;&#x6A21;&#x5F0F;&#x5F88;&#x65B9;&#x4FBF;&#xFF0C;&#x4F46;&#x662F;&#x5728;&#x4E1A;&#x52A1;&#x5F00;&#x53D1;&#x65F6;&#x5E94;&#x8BE5;&#x6CE8;&#x610F;&#x4F7F;&#x7528;&#x573A;&#x666F;&#xFF0C;&#x4E0D;&#x9700;&#x8981;&#x5728;&#x7F16;&#x5199;&#x5BF9;&#x8C61;&#x65F6;&#x5C31;&#x53BB;&#x9884;&#x5148;&#x731C;&#x6D4B;&#x662F;&#x5426;&#x9700;&#x8981;&#x4F7F;&#x7528;&#x4EE3;&#x7406;&#x6A21;&#x5F0F;&#xFF0C;&#x53EA;&#x6709;&#x5F53;&#x5BF9;&#x8C61;&#x7684;&#x529F;&#x80FD;&#x53D8;&#x5F97;&#x590D;&#x6742;&#x6216;&#x8005;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x8FDB;&#x884C;&#x4E00;&#x5B9A;&#x7684;&#x8BBF;&#x95EE;&#x9650;&#x5236;&#x65F6;&#xFF0C;&#x518D;&#x8003;&#x8651;&#x4F7F;&#x7528;&#x4EE3;&#x7406;&#x3002;</p><hr><h3><strong>&#x53C2;&#x8003;&#x6587;&#x732E;</strong></h3><ul><li>[1] <a href="https://juejin.im/post/5a3cb0846fb9a044fb07f36c" rel="nofollow noreferrer">&#x6398;&#x91D1;: &#x4F7F;&#x7528; Javascript &#x539F;&#x751F;&#x7684; Proxy &#x4F18;&#x5316;&#x5E94;&#x7528;</a></li><li>[2] <a href="http://dealwithjs.io/es6-features-10-use-cases-for-proxy/" rel="nofollow noreferrer">Deal With JS: ES6 Features - 10 Use Cases for Proxy</a></li><li>[3] &#x66FE;&#x63A2; JavaScript&#x8BBE;&#x8BA1;&#x6A21;&#x5F0F;&#x4E0E;&#x5F00;&#x53D1;&#x5B9E;&#x8DF5; [M].r&#x4EBA;&#x6C11;&#x90AE;&#x7535;&#x51FA;&#x7248;&#x793E;</li></ul>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从ES6重新认识JavaScript设计模式(五): 代理模式和Proxy

## 原文链接
[https://segmentfault.com/a/1190000015800703](https://segmentfault.com/a/1190000015800703)

