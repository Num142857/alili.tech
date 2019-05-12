---
title: '关于Promise' 
date: 2019-01-06 2:30:10
hidden: true
slug: 9chukt8reg
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>Promise是一种异步编程的解决方案,相比传统回调函数更合理.</strong></p>
<p><strong>1.Promise立即执行性</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let p = new Promise((resolve, reject) => {
    console.log('立即执行!');
    resolve('返回成功!')
});

console.log('promise后执行!');

p.then(value => {
    console.log(value)
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> p = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'立即执行!'</span>);
    resolve(<span class="hljs-string">'返回成功!'</span>)
});

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'promise后执行!'</span>);

p.then(<span class="hljs-function"><span class="hljs-params">value</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(value)
});</code></pre>
<p>控制台输出:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;立即执行!&quot;
&quot;promise后执行!&quot;
&quot;返回成功!&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code><span class="hljs-string">"立即执行!"</span>
<span class="hljs-string">"promise后执行!"</span>
<span class="hljs-string">"返回成功!"</span></code></pre>
<p>Promise对象表示未来发生的事件,在创建promise时,作为promise参数传入的函数是会被立即执行的,只是其中执行的代码可以是异步代码.有些人会认为,当promise对象调用then方法时,promise接受的函数才会执行,这是错误的.所以,代码中<code>立即执行!</code>先于<code>promise后执行!</code>输出.</p>
<p><strong>2.Promise的三种状态.</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let p1 = new Promise((reslove, reject) => {
    reslove(1);
});
let p2 = new Promise((reslove, reject) => {
    setTimeout(() => {
        reslove(2);
    }, 500);
});
let p3 = new Promise((reslove, reject) => {
    setTimeout(() => {
        reject(3);
    }, 500);
});

console.log(p1);
console.log(p2);
console.log(p3);
setTimeout(() => {
    console.log(p2);
}, 1000);
setTimeout(() => {
    console.log(p3);
}, 1000);

p1.then(value => {
    console.log(value);
});
p2.then(value => {
    console.log(value);
});
p3.catch(err => {
    console.log(err);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> p1 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">reslove, reject</span>) =&gt;</span> {
    reslove(<span class="hljs-number">1</span>);
});
<span class="hljs-keyword">let</span> p2 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">reslove, reject</span>) =&gt;</span> {
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        reslove(<span class="hljs-number">2</span>);
    }, <span class="hljs-number">500</span>);
});
<span class="hljs-keyword">let</span> p3 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">reslove, reject</span>) =&gt;</span> {
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        reject(<span class="hljs-number">3</span>);
    }, <span class="hljs-number">500</span>);
});

<span class="hljs-built_in">console</span>.log(p1);
<span class="hljs-built_in">console</span>.log(p2);
<span class="hljs-built_in">console</span>.log(p3);
setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(p2);
}, <span class="hljs-number">1000</span>);
setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(p3);
}, <span class="hljs-number">1000</span>);

p1.then(<span class="hljs-function"><span class="hljs-params">value</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(value);
});
p2.then(<span class="hljs-function"><span class="hljs-params">value</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(value);
});
p3.catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(err);
});</code></pre>
<p>控制台输出:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise {[[PromiseStatus]]: &quot;resolved&quot;, [[PromiseValue]]: 1}
Promise {[[PromiseStatus]]: &quot;pending&quot;, [[PromiseValue]]: undefined}
Promise {[[PromiseStatus]]: &quot;pending&quot;, [[PromiseValue]]: undefined}
1
2
3
Promise {[[PromiseStatus]]: &quot;resolved&quot;, [[PromiseValue]]: 2}
Promise {[[PromiseStatus]]: &quot;rejected&quot;, [[PromiseValue]]: 3}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lua"><code>Promise {<span class="hljs-string">[[PromiseStatus]]</span>: <span class="hljs-string">"resolved"</span>, <span class="hljs-string">[[PromiseValue]]</span>: <span class="hljs-number">1</span>}
Promise {<span class="hljs-string">[[PromiseStatus]]</span>: <span class="hljs-string">"pending"</span>, <span class="hljs-string">[[PromiseValue]]</span>: undefined}
Promise {<span class="hljs-string">[[PromiseStatus]]</span>: <span class="hljs-string">"pending"</span>, <span class="hljs-string">[[PromiseValue]]</span>: undefined}
<span class="hljs-number">1</span>
<span class="hljs-number">2</span>
<span class="hljs-number">3</span>
Promise {<span class="hljs-string">[[PromiseStatus]]</span>: <span class="hljs-string">"resolved"</span>, <span class="hljs-string">[[PromiseValue]]</span>: <span class="hljs-number">2</span>}
Promise {<span class="hljs-string">[[PromiseStatus]]</span>: <span class="hljs-string">"rejected"</span>, <span class="hljs-string">[[PromiseValue]]</span>: <span class="hljs-number">3</span>}</code></pre>
<p>Promise内部实现是一个状态机.Promise有三种状态: pending，resolved，rejected.当Promise刚创建完成时,处于pending状态;当Promise中的函数参数执行了resolve后,Promise由pending状态变成resloved状态;如果Promise的函数参数中执行的是reject方法,那么Promise会有pending状态变成rejected状态.</p>
<p><strong>3.Promise状态不可逆性.</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let p1 = new Promise((reslove, reject) => {
    reslove('成功1!');
    reslove('成功2!');
});
let p2 = new Promise((reslove, reject) => {
    reslove('成功!');
    reject('失败!');
});

p1.then(value => {
    console.log(value);
});
p2.then(value => {
    console.log(value);
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> p1 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">reslove, reject</span>) =&gt;</span> {
    reslove(<span class="hljs-string">'成功1!'</span>);
    reslove(<span class="hljs-string">'成功2!'</span>);
});
<span class="hljs-keyword">let</span> p2 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">reslove, reject</span>) =&gt;</span> {
    reslove(<span class="hljs-string">'成功!'</span>);
    reject(<span class="hljs-string">'失败!'</span>);
});

p1.then(<span class="hljs-function"><span class="hljs-params">value</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(value);
});
p2.then(<span class="hljs-function"><span class="hljs-params">value</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(value);
});
</code></pre>
<p>控制台输出:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;成功1!&quot;
&quot;成功!&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code><span class="hljs-string">"成功1!"</span>
<span class="hljs-string">"成功!"</span></code></pre>
<p>Promise的状态一旦变成resolved或rejected时,Promise的状态和值就固定下来了,无论后续再怎么调用reslove或是reject方法,都不能改变它的状态和值.所以,p1中reslove('成功2!')并不能将p1的值更改为<code>成功2!</code>,p2中reject('失败!')也不能将p2的状态由resolved改变为rejected.</p>
<p><strong>4.链式调用.</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let p = new Promise((resolve, reject) => {
    resolve(1);
});

p.then(value => {
    console.log(value);
    return value * 2;
}).then(value => {
    console.log(value);
}).then(value => {
    console.log(value);
    return Promise.resolve('resolve');
}).then(value => {
    console.log(value);
    return Promise.reject('reject');
}).then(value => {
    console.log(`resolve: ${value}`);
}, err => {
    console.log(`reject: ${err}`);
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">let</span> p = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    resolve(<span class="hljs-number">1</span>);
});

p.then(<span class="hljs-function"><span class="hljs-params">value</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(value);
    <span class="hljs-keyword">return</span> value * <span class="hljs-number">2</span>;
}).then(<span class="hljs-function"><span class="hljs-params">value</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(value);
}).then(<span class="hljs-function"><span class="hljs-params">value</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(value);
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-string">'resolve'</span>);
}).then(<span class="hljs-function"><span class="hljs-params">value</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(value);
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(<span class="hljs-string">'reject'</span>);
}).then(<span class="hljs-function"><span class="hljs-params">value</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`resolve: <span class="hljs-subst">${value}</span>`</span>);
}, <span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`reject: <span class="hljs-subst">${err}</span>`</span>);
})</code></pre>
<p>控制台输出:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1
2
undefined
&quot;resolve&quot;
&quot;reject: reject&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">1</span>
<span class="hljs-number">2</span>
undefined
<span class="hljs-string">"resolve"</span>
<span class="hljs-string">"reject: reject"</span></code></pre>
<p>Promise对象的then方法返回一个新的Promise对象,所以可以通过链式调用then方法.then方法接受两个函数作为参数,第一个参数是Promise执行成功时的回调,第二个参数是Promise执行失败时的回调.两个函数只会有一个被调用,函数返回值将用作创建then返回的Promise对象.这两个参数的返回值可以是下面三种情况的一种:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="①:return一个同步的值,或者undefined(当没有返回一个有效值时,默认返回undefined),then方法将返回一个resloved状态的Promise对象,Promise对象的值就是这个返回值.
②:return另一个Promise,then方法将根据这个Promise的状态和值创建一个新的Promise对象返回.
③:throw一个同步异常,then方法将返回一个rejected状态的Promise,值是该异常." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>①:<span class="hljs-keyword">return</span>一个同步的值,或者<span class="hljs-literal">undefined</span>(当没有返回一个有效值时,默认返回<span class="hljs-literal">undefined</span>),then方法将返回一个resloved状态的<span class="hljs-built_in">Promise</span>对象,<span class="hljs-built_in">Promise</span>对象的值就是这个返回值.
②:<span class="hljs-keyword">return</span>另一个<span class="hljs-built_in">Promise</span>,then方法将根据这个<span class="hljs-built_in">Promise</span>的状态和值创建一个新的<span class="hljs-built_in">Promise</span>对象返回.
③:<span class="hljs-keyword">throw</span>一个同步异常,then方法将返回一个rejected状态的<span class="hljs-built_in">Promise</span>,值是该异常.</code></pre>
<p>根据以上分析,代码中的第一个then会返回一个值为2(1 * 2),状态为resolved的Promise对象,于第二个then输出的值为2.第二个then中没有返回值,因此将返回默认的undefined,于是在第三个then中输出的undefined.第三个then和第四个then中分别返回一个状态是resloved的Promise和一个状态是rejected的Promise,依次由第四个then中的成功回调函数和第五个then中的失败回调函数处理.<br><strong>5.Promise then()回调异步性.</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let p = new Promise((resolve, reject) => {
    resolve('成功!');
});

p.then(value => {
    console.log(value);
});

console.log(&quot;谁先执行?&quot;)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> p = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    resolve(<span class="hljs-string">'成功!'</span>);
});

p.then(<span class="hljs-function"><span class="hljs-params">value</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(value);
});

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"谁先执行?"</span>)</code></pre>
<p>控制台输出:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;谁先执行?&quot;
&quot;成功!&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code><span class="hljs-string">"谁先执行?"</span>
<span class="hljs-string">"成功!"</span></code></pre>
<p>Promise接受的函数参数是同步执行的,但是then方法中的回调函数则是异步的,因此,<code>成功!</code>会在后面输出.<br><strong>6.Promise中的异常.</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let p1 = new Promise((resolve, reject) => {
    foo.bar();
    resolve(1);
});

p1.then(value => {
    console.log(`p1 then value: ${value}`);
}, err => {
    console.log(`p1 then err: ${err}`);
}).then(value => {
    console.log(`p1 then then value: ${value}`);
}, err => {
    console.log(`p1 then then err: ${err}`);
});

let p2 = new Promise((resolve, reject) => {
    resolve(2);
});

p2.then(value => {
    console.log(`p2 then value: ${value}`);
    foo.bar();
}, err => {
    console.log(`p2 then err: ${err}`);
}).then(value => {
    console.log(`p2 then then value: ${value}`);
}, err => {
    console.log(`p2 then then err: ${err}`);
    return 1;
}).then(value => {
    console.log(`p2 then then then value: ${value}`);
}, err => {
    console.log(`p2 then then then err: ${err}`);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">let</span> p1 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    foo.bar();
    resolve(<span class="hljs-number">1</span>);
});

p1.then(<span class="hljs-function"><span class="hljs-params">value</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`p1 then value: <span class="hljs-subst">${value}</span>`</span>);
}, <span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`p1 then err: <span class="hljs-subst">${err}</span>`</span>);
}).then(<span class="hljs-function"><span class="hljs-params">value</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`p1 then then value: <span class="hljs-subst">${value}</span>`</span>);
}, <span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`p1 then then err: <span class="hljs-subst">${err}</span>`</span>);
});

<span class="hljs-keyword">let</span> p2 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    resolve(<span class="hljs-number">2</span>);
});

p2.then(<span class="hljs-function"><span class="hljs-params">value</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`p2 then value: <span class="hljs-subst">${value}</span>`</span>);
    foo.bar();
}, <span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`p2 then err: <span class="hljs-subst">${err}</span>`</span>);
}).then(<span class="hljs-function"><span class="hljs-params">value</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`p2 then then value: <span class="hljs-subst">${value}</span>`</span>);
}, <span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`p2 then then err: <span class="hljs-subst">${err}</span>`</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
}).then(<span class="hljs-function"><span class="hljs-params">value</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`p2 then then then value: <span class="hljs-subst">${value}</span>`</span>);
}, <span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`p2 then then then err: <span class="hljs-subst">${err}</span>`</span>);
});</code></pre>
<p>控制台输出:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="p1 then err: ReferenceError: foo is not defined
p2 then value: 2
p1 then then value: undefined
p2 then then err: ReferenceError: foo is not defined
p2 then then then value: 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vbscript"><code>p1 <span class="hljs-keyword">then</span> <span class="hljs-built_in">err</span>: ReferenceError: foo <span class="hljs-keyword">is</span> <span class="hljs-keyword">not</span> defined
p2 <span class="hljs-keyword">then</span> value: <span class="hljs-number">2</span>
p1 <span class="hljs-keyword">then</span> <span class="hljs-keyword">then</span> value: undefined
p2 <span class="hljs-keyword">then</span> <span class="hljs-keyword">then</span> <span class="hljs-built_in">err</span>: ReferenceError: foo <span class="hljs-keyword">is</span> <span class="hljs-keyword">not</span> defined
p2 <span class="hljs-keyword">then</span> <span class="hljs-keyword">then</span> <span class="hljs-keyword">then</span> value: <span class="hljs-number">1</span></code></pre>
<p>Promise中的异常由then参数中的第二个回调函数(Promise执行失败的回调)处理,异常信息将作为Promise的值.异常一旦得到处理,then返回后续的Promise对象将恢复正常,并会被Promise执行成功的回调函数处理.另外,需要注意p1,p2多级then的回调函数是交替执行的,这正是由Promise then回调的异步性决定的.</p>
<p><strong>7.Promise.reslove().</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let p1 = Promise.resolve(1);
let p2 = Promise.resolve(p1);
let p3 = new Promise((resolve, reject) => {
    resolve(1);
});
let p4 = new Promise((resolve, reject) => {
    resolve(p1);
});

console.log(p1 === p2);
console.log(p1 === p3);
console.log(p1 === p4);
console.log(p3 === p4);

p4.then(value => {
    console.log(`p4=${value}`)
});
p2.then(value => {
    console.log(`p2=${value}`)
});
p1.then(value => {
    console.log(`p1=${value}`)
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> p1 = <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">1</span>);
<span class="hljs-keyword">let</span> p2 = <span class="hljs-built_in">Promise</span>.resolve(p1);
<span class="hljs-keyword">let</span> p3 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    resolve(<span class="hljs-number">1</span>);
});
<span class="hljs-keyword">let</span> p4 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    resolve(p1);
});

<span class="hljs-built_in">console</span>.log(p1 === p2);
<span class="hljs-built_in">console</span>.log(p1 === p3);
<span class="hljs-built_in">console</span>.log(p1 === p4);
<span class="hljs-built_in">console</span>.log(p3 === p4);

p4.then(<span class="hljs-function"><span class="hljs-params">value</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`p4=<span class="hljs-subst">${value}</span>`</span>)
});
p2.then(<span class="hljs-function"><span class="hljs-params">value</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`p2=<span class="hljs-subst">${value}</span>`</span>)
});
p1.then(<span class="hljs-function"><span class="hljs-params">value</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`p1=<span class="hljs-subst">${value}</span>`</span>)
});</code></pre>
<p>控制台输出:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="true
false
false
false
p2=1
p1=1
p4=1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-literal">true</span>
<span class="hljs-literal">false</span>
<span class="hljs-literal">false</span>
<span class="hljs-literal">false</span>
<span class="hljs-string">p2=1</span>
<span class="hljs-string">p1=1</span>
<span class="hljs-string">p4=1</span></code></pre>
<p>Promise.resolve(...) 可以接受一个值或者是一个Promise对象作为参数.当参数是普通值时,它返回一个resolved状态的Promise对象,对象的值就是这个参数;当参数是一个Promise对象时,它直接返回这个Promise参数.所以p1===p2.但通过new创建的Promise对象都是一个新的对象,所以后面三个比较结果都是false.另外,为什么p4的then最先调用,但是在控制台上是最后输出结果的呢?因为p4中resolve接受的参数是一个Promise对象p1,reslove会对p1进行解析,获取p1的状态和值,但是这个过程是异步的.</p>
<p><strong>8.resolve v reject.</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let p1 = new Promise((resolve, reject) => {
    resolve(Promise.resolve('resolve'));
});
let p2 = new Promise((resolve, reject) => {
    resolve(Promise.reject('reject'));
});
let p3 = new Promise((resolve, reject) => {
    reject(Promise.resolve('resolve'));
});

p1.then(value => {
    console.log(`p1 fulfilled: ${value}`);
}, err => {
    console.log(`p1 rejected: ${err}`);
});
p2.then(value => {
    console.log(`p2 fulfilled: ${value}`);
}, err => {
    console.log(`p2 rejected: ${err}`);
});
p3.then(value => {
    console.log(`p3 fulfilled: ${value}`);
}, err => {
    console.log(`p3 rejected: ${err}`);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">let</span> p1 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    resolve(<span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-string">'resolve'</span>));
});
<span class="hljs-keyword">let</span> p2 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    resolve(<span class="hljs-built_in">Promise</span>.reject(<span class="hljs-string">'reject'</span>));
});
<span class="hljs-keyword">let</span> p3 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    reject(<span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-string">'resolve'</span>));
});

p1.then(<span class="hljs-function"><span class="hljs-params">value</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`p1 fulfilled: <span class="hljs-subst">${value}</span>`</span>);
}, <span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`p1 rejected: <span class="hljs-subst">${err}</span>`</span>);
});
p2.then(<span class="hljs-function"><span class="hljs-params">value</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`p2 fulfilled: <span class="hljs-subst">${value}</span>`</span>);
}, <span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`p2 rejected: <span class="hljs-subst">${err}</span>`</span>);
});
p3.then(<span class="hljs-function"><span class="hljs-params">value</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`p3 fulfilled: <span class="hljs-subst">${value}</span>`</span>);
}, <span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`p3 rejected: <span class="hljs-subst">${err}</span>`</span>);
});</code></pre>
<p>控制台输出:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="p3 rejected: [object Promise]
p1 fulfilled: resolve
p2 rejected: reject" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>p3 <span class="hljs-string">rejected:</span> [object Promise]
p1 <span class="hljs-string">fulfilled:</span> resolve
p2 <span class="hljs-string">rejected:</span> reject</code></pre>
<p>Promise回调函数中的第一个参数resolve,会对Promise执行解析,即resolve的参数是Promise对象时,resolve会解析获取这个Promise对象的状态和值,但这个过程是异步的.p1解析后,获取到Promise对象的状态是resolved,因此第一个回调被执行也就是获取value的回调;p2解析后,获取到Promise对象的状态rejected,因此rejected回调执行.但Promise回调函数中的第二个参数reject不具备解析能力,reject的参数会直接传递给then方法中的rejected回调,因此,即使p3 reject接受了一个resolved状态的Promise,then方法中调用的依然是rejected,并且参数就是reject接受到的Promise对象.</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
关于Promise

## 原文链接
[https://segmentfault.com/a/1190000010399626](https://segmentfault.com/a/1190000010399626)

