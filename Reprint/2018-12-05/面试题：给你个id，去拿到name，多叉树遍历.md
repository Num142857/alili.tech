---
title: '面试题：给你个id，去拿到name，多叉树遍历' 
date: 2018-12-05 2:30:09
hidden: true
slug: co6y5uv3b7i
categories: [reprint]
---

{{< raw >}}

                    
<p>前天面试遇到一个多叉树面试的题目，在这里分享记录一下。</p>
<blockquote>题目：一个树形的数据(如下数据)，面试官给你一个<code>id</code>，然后拿到对应的<code>name</code>?</blockquote>
<p>数据结构大概是这个样子</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var cityData = [
      {
        id: 1,
        name: '广东省',
        children: [
          {
            id: 11,
            name: '深圳',
            children: [
              {
                id: 111,
                name: '宝安',
                children: [
                  {
                    id: 1111,
                    name: '西乡',
                    children:[
                      {
                        id: 11111,
                        name: '坪洲',
                        children:[]
                      },
                      {
                        id: 11112,
                        name: '灵芝',
                        children:[]
                      }
                    ]
                  },
                  {
                    id: 1112,
                    name: '南山',
                    children:[
                      {
                        id: 11121,
                        name: '科技园',
                        children:[]
                      }
                    ]
                  }
                ]
              },
              {
                id: 112,
                name: '福田',
                children: []
              }
            ]
          },
          {
            id: 12,
            name: '广州',
            children: [
              {
                id: 122,
                name: '白云区',
                children: [
                  {
                    id: 1222,
                    name: '白云区',
                    children: []
                  }
                ]
              },
              {
                id: 122,
                name: '珠海区',
                children: []
              }
            ]
          }
        ]
      },
      {
        id: 2,
        name: '湖南省',
        children: []
      }
    ];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-built_in">var</span> cityData = [
      {
        <span class="hljs-attribute">id:</span><span class="hljs-string"> 1,
        name</span>: <span class="hljs-string">'广东省'</span>,
        <span class="hljs-attribute">children</span>: [
          {
            <span class="hljs-attribute">id:</span><span class="hljs-string"> 11,
            name</span>: <span class="hljs-string">'深圳'</span>,
            <span class="hljs-attribute">children</span>: [
              {
                <span class="hljs-attribute">id:</span><span class="hljs-string"> 111,
                name</span>: <span class="hljs-string">'宝安'</span>,
                <span class="hljs-attribute">children</span>: [
                  {
                    <span class="hljs-attribute">id:</span><span class="hljs-string"> 1111,
                    name</span>: <span class="hljs-string">'西乡'</span>,
                    <span class="hljs-attribute">children</span>:[
                      {
                        <span class="hljs-attribute">id:</span><span class="hljs-string"> 11111,
                        name</span>: <span class="hljs-string">'坪洲'</span>,
                        <span class="hljs-attribute">children</span>:[]
                      },
                      {
                        <span class="hljs-attribute">id:</span><span class="hljs-string"> 11112,
                        name</span>: <span class="hljs-string">'灵芝'</span>,
                        <span class="hljs-attribute">children</span>:[]
                      }
                    ]
                  },
                  {
                    <span class="hljs-attribute">id:</span><span class="hljs-string"> 1112,
                    name</span>: <span class="hljs-string">'南山'</span>,
                    <span class="hljs-attribute">children</span>:[
                      {
                        <span class="hljs-attribute">id:</span><span class="hljs-string"> 11121,
                        name</span>: <span class="hljs-string">'科技园'</span>,
                        <span class="hljs-attribute">children</span>:[]
                      }
                    ]
                  }
                ]
              },
              {
                <span class="hljs-attribute">id:</span><span class="hljs-string"> 112,
                name</span>: <span class="hljs-string">'福田'</span>,
                <span class="hljs-attribute">children</span>: []
              }
            ]
          },
          {
            <span class="hljs-attribute">id:</span><span class="hljs-string"> 12,
            name</span>: <span class="hljs-string">'广州'</span>,
            <span class="hljs-attribute">children</span>: [
              {
                <span class="hljs-attribute">id:</span><span class="hljs-string"> 122,
                name</span>: <span class="hljs-string">'白云区'</span>,
                <span class="hljs-attribute">children</span>: [
                  {
                    <span class="hljs-attribute">id:</span><span class="hljs-string"> 1222,
                    name</span>: <span class="hljs-string">'白云区'</span>,
                    <span class="hljs-attribute">children</span>: []
                  }
                ]
              },
              {
                <span class="hljs-attribute">id:</span><span class="hljs-string"> 122,
                name</span>: <span class="hljs-string">'珠海区'</span>,
                <span class="hljs-attribute">children</span>: []
              }
            ]
          }
        ]
      },
      {
        <span class="hljs-attribute">id:</span><span class="hljs-string"> 2,
        name</span>: <span class="hljs-string">'湖南省'</span>,
        <span class="hljs-attribute">children</span>: []
      }
    ];</code></pre>
<p>比如说 我要<code>id</code>是<code>11112</code>的<code>name</code>返回是<code>灵芝</code>，请问你有几种解法？？</p>
<h3 id="articleHeader0">递归方法</h3>
<p>这题目让人看到这不就是考用递归的方法嘛，代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
let result = ''

// 递归实现
const recursion = (cityData, id) => {
  // cityData数据为空的时候直接返回
  if (!cityData || !cityData.length) return;
  // 常规循环cityData
  for (let i = 0, len = cityData.length; i < len; i++) {
    const childs = cityData[i].children;
    
    // 如果匹配到id的话，就是我们要的结果
    if (cityData[i].id === id) {
      result = cityData[i].name
    }
    // 如果还有子节点，执行递归
    if(childs &amp;&amp; childs.length > 0){
      recursion(childs, id);
    }
  }
  return result
};

const r = recursion(cityData, 11112);
console.log(r) // 灵芝
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>
<span class="hljs-keyword">let</span> result = <span class="hljs-string">''</span>

<span class="hljs-comment">// 递归实现</span>
<span class="hljs-keyword">const</span> recursion = <span class="hljs-function">(<span class="hljs-params">cityData, id</span>) =&gt;</span> {
  <span class="hljs-comment">// cityData数据为空的时候直接返回</span>
  <span class="hljs-keyword">if</span> (!cityData || !cityData.length) <span class="hljs-keyword">return</span>;
  <span class="hljs-comment">// 常规循环cityData</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>, len = cityData.length; i &lt; len; i++) {
    <span class="hljs-keyword">const</span> childs = cityData[i].children;
    
    <span class="hljs-comment">// 如果匹配到id的话，就是我们要的结果</span>
    <span class="hljs-keyword">if</span> (cityData[i].id === id) {
      result = cityData[i].name
    }
    <span class="hljs-comment">// 如果还有子节点，执行递归</span>
    <span class="hljs-keyword">if</span>(childs &amp;&amp; childs.length &gt; <span class="hljs-number">0</span>){
      recursion(childs, id);
    }
  }
  <span class="hljs-keyword">return</span> result
};

<span class="hljs-keyword">const</span> r = recursion(cityData, <span class="hljs-number">11112</span>);
<span class="hljs-built_in">console</span>.log(r) <span class="hljs-comment">// 灵芝</span>
</code></pre>
<p>oyes~~~完成了么？？面试官可能不满意哦，下面还有几种解法</p>
<h3 id="articleHeader1">广度优先实现</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let result = ''

const range = (cityData, id) => {
  if (!cityData || !cityData.length) return;
  // 定义一个数据栈
  let stack = [];

  let item = null;

  //先将第一层节点放入栈
  for (var i = 0, len = cityData.length; i < len; i++) {
    stack.push(cityData[i]);
  }

  while (stack.length) {
    // 将数据栈的第一个取出来
    item = stack.shift();
    // 如果符合就赋值给result
    if (item.id === id) {
      result = item.name
    }
    //如果该节点有子节点，继续添加进入栈底
    if (item.children &amp;&amp; item.children.length) {
      stack = stack.concat(item.children);
    }
  }
  return result
};

let r1 = range(cityData, 11112);

console.log(r1) // 灵芝
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> result = <span class="hljs-string">''</span>

<span class="hljs-keyword">const</span> range = <span class="hljs-function">(<span class="hljs-params">cityData, id</span>) =&gt;</span> {
  <span class="hljs-keyword">if</span> (!cityData || !cityData.length) <span class="hljs-keyword">return</span>;
  <span class="hljs-comment">// 定义一个数据栈</span>
  <span class="hljs-keyword">let</span> stack = [];

  <span class="hljs-keyword">let</span> item = <span class="hljs-literal">null</span>;

  <span class="hljs-comment">//先将第一层节点放入栈</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, len = cityData.length; i &lt; len; i++) {
    stack.push(cityData[i]);
  }

  <span class="hljs-keyword">while</span> (stack.length) {
    <span class="hljs-comment">// 将数据栈的第一个取出来</span>
    item = stack.shift();
    <span class="hljs-comment">// 如果符合就赋值给result</span>
    <span class="hljs-keyword">if</span> (item.id === id) {
      result = item.name
    }
    <span class="hljs-comment">//如果该节点有子节点，继续添加进入栈底</span>
    <span class="hljs-keyword">if</span> (item.children &amp;&amp; item.children.length) {
      stack = stack.concat(item.children);
    }
  }
  <span class="hljs-keyword">return</span> result
};

<span class="hljs-keyword">let</span> r1 = range(cityData, <span class="hljs-number">11112</span>);

<span class="hljs-built_in">console</span>.log(r1) <span class="hljs-comment">// 灵芝</span>
</code></pre>
<h3 id="articleHeader2">深度优先实现</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let result = ''

const deep = (cityData, id) => {
  // 没有数据直接返回
  if (!cityData || !cityData.length) return;
  // 先定义一个数据栈
  let stack = []
  let item = null

  //先将第一层节点放入数据栈
  for (var i = 0, len = cityData.length; i < len; i++) {
    stack.push(cityData[i])
  }
  // 循环
  while (stack.length) {
    item = stack.shift()
    if (item.id === id) {
      result = item.name
    }
    //如果该节点有子节点，继续添加进入栈顶
    if (item.children &amp;&amp; item.children.length) {
      // 注意这里调换了顺序
      stack = item.children.concat(stack);
    }
  }
  return result
};

let r3 = deep(cityData, 11112)
console.log(r3) // 灵芝
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> result = <span class="hljs-string">''</span>

<span class="hljs-keyword">const</span> deep = <span class="hljs-function">(<span class="hljs-params">cityData, id</span>) =&gt;</span> {
  <span class="hljs-comment">// 没有数据直接返回</span>
  <span class="hljs-keyword">if</span> (!cityData || !cityData.length) <span class="hljs-keyword">return</span>;
  <span class="hljs-comment">// 先定义一个数据栈</span>
  <span class="hljs-keyword">let</span> stack = []
  <span class="hljs-keyword">let</span> item = <span class="hljs-literal">null</span>

  <span class="hljs-comment">//先将第一层节点放入数据栈</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, len = cityData.length; i &lt; len; i++) {
    stack.push(cityData[i])
  }
  <span class="hljs-comment">// 循环</span>
  <span class="hljs-keyword">while</span> (stack.length) {
    item = stack.shift()
    <span class="hljs-keyword">if</span> (item.id === id) {
      result = item.name
    }
    <span class="hljs-comment">//如果该节点有子节点，继续添加进入栈顶</span>
    <span class="hljs-keyword">if</span> (item.children &amp;&amp; item.children.length) {
      <span class="hljs-comment">// 注意这里调换了顺序</span>
      stack = item.children.concat(stack);
    }
  }
  <span class="hljs-keyword">return</span> result
};

<span class="hljs-keyword">let</span> r3 = deep(cityData, <span class="hljs-number">11112</span>)
<span class="hljs-built_in">console</span>.log(r3) <span class="hljs-comment">// 灵芝</span>
</code></pre>
<h3 id="articleHeader3">正则方式实现</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
const regular = (cityData, id) => {
  // 没有数据直接返回
  if (!cityData || !cityData.length) return;
  // 数据转成字符串
  let cityStr = JSON.stringify(cityData)
  // 定义正则
  let reg = new RegExp(`&quot;id&quot;:${id},&quot;name&quot;:&quot;([^\\x00-\\xff]+)&quot;,`)
  // 取到正则的子字符串并返回
  return (cityStr.match(reg))[1]
}

let r4 = regular(cityData, 11112);

console.log(r4) // 灵芝
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>
<span class="hljs-keyword">const</span> regular = <span class="hljs-function">(<span class="hljs-params">cityData, id</span>) =&gt;</span> {
  <span class="hljs-comment">// 没有数据直接返回</span>
  <span class="hljs-keyword">if</span> (!cityData || !cityData.length) <span class="hljs-keyword">return</span>;
  <span class="hljs-comment">// 数据转成字符串</span>
  <span class="hljs-keyword">let</span> cityStr = <span class="hljs-built_in">JSON</span>.stringify(cityData)
  <span class="hljs-comment">// 定义正则</span>
  <span class="hljs-keyword">let</span> reg = <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(<span class="hljs-string">`"id":<span class="hljs-subst">${id}</span>,"name":"([^\\x00-\\xff]+)",`</span>)
  <span class="hljs-comment">// 取到正则的子字符串并返回</span>
  <span class="hljs-keyword">return</span> (cityStr.match(reg))[<span class="hljs-number">1</span>]
}

<span class="hljs-keyword">let</span> r4 = regular(cityData, <span class="hljs-number">11112</span>);

<span class="hljs-built_in">console</span>.log(r4) <span class="hljs-comment">// 灵芝</span>
</code></pre>
<p>这里列举了4种方法，应该还有很多种方法，大佬们有的话可以留言给我，先谢谢啦~~</p>
<p>安利一波博客~~~<a href="https://github.com/naihe138/naice-blog" rel="nofollow noreferrer" target="_blank">https://github.com/naihe138/naice-blog</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
面试题：给你个id，去拿到name，多叉树遍历

## 原文链接
[https://segmentfault.com/a/1190000014381365](https://segmentfault.com/a/1190000014381365)

