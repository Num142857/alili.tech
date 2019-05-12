---
title: '造轮子系列(一): 一个速度九分快的JSON解析器' 
date: 2019-01-07 2:30:11
hidden: true
slug: 4qhdoesmclk
categories: [reprint]
---

{{< raw >}}

                    
<p>前一阵子看到了一个Golang的JSON库<code>go-simplejson</code>，用来封装与解析匿名的JSON，说白了就是用<code>map</code>或者<code>slice</code>等来解析JSON，觉得挺好玩，后来有个项目恰好要解析JSON，于是就试了试，不小心看了一眼源代码，发现竟然是用的Golang自带的<code>encoding/json</code>库去做的解析，而其本身只是把这个库封装了一层，看起来更好看罢了。于是心想能不能徒手写一个解析器，毕竟写了这么多年代码了，也<code>JSON.parse</code>，<code>JSON.stringify</code>了无数次。捣腾了两天，终于成了，测试了一下，性能比自带的库要高很多，速度基本上在<code>1.6</code>到<code>7</code>倍之间（视JSON串的大小和结构而定），所以决定写这篇文章分享一下思路。</p>
<p>先插一个段子，作为一个已经完完整整写了将近三年代码的<em>老码农</em>，前一段面试，不止一次有面试官问我：如何深拷贝一个对象（JS），我笑笑说写一个Walk函数递归一下就行了啊，如果要考虑到Stackoverflow，那就用栈+迭代就好了。然后他们老是问我，有没有更好的办法，然后自言自语的说你可以用JSON先序列化一遍再反序列化……</p>
<p>项目取名<code>cheapjson</code>，意思是便宜的，因为你不光不需要定义各个struct，性能还比原生的快，所以很便宜。地址在 <a href="https://github.com/acrazing/cheapjson" rel="nofollow noreferrer" target="_blank">https://github.com/acrazing/c...</a>，有兴趣的可以看看~</p>
<h2 id="articleHeader0">JSON value</h2>
<p>首先既然是便宜的，便和反射无关了，所以<code>void *</code>是必需的，当然在Golang里面是<code>interface{}</code>，然后需要一个结构来保存必需的信息，进行类型判断以及边界检查。如果是C的话，数组大小，字符串长度，对象Key/Value映射都是必需的工作。不过在Golang里面就不需要了，编译器已经搞定了所有的工作。</p>
<p>在JSON当中，一个完整的JSON应该包含<strong>一个</strong><code>value</code>，这个<code>value</code>的类型可能是<code>null</code>，<code>true</code>，<code>false</code>，<code>number</code>，<code>string</code>， <code>array</code>以及 <code>object</code>共6种。而<code>array</code>和<code>object</code>还有可能包含子<code>value</code>结构。这些类型的值映射到Golang当中，便是<code>nil</code>, <code>bool</code>, <code>bool</code>, <code>int64/float64</code>, <code>string</code>, <code>[]interface{}</code>, <code>map[string]interface{}</code>，用一个<code>union</code>结构便可以搞定。注意这里的<code>number</code>有可以转换成整数或者是浮点数，在JavaScript中，全部用<code>64</code>位双精度浮点数储存，所以最大的精确整数也就是非规约数是尾数部分<code>2^53 - 1</code>，已经远远大于<code>int32</code>了，所以这里将整数映射成了<code>int64</code>而不是<code>int</code>，因为在部分机器上可能溢出，严格的区分一个<code>IEEE-754</code>格式的整数和浮点数并不是一件轻松的事情，这里简化成了<strong>如果尾数中的小数部分以及指数部分均不存在，则认为是一个整数</strong>，此外，为了简化操作，<strong>对于任何不合法的<code>UTF-16</code>字符串，都认为结构有问题，而终止解析</strong>。为了方便，定义一个结构来保存一个JSON的<code>value</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="type struct Value {
  value interface{}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="go hljs"><code class="go"><span class="hljs-keyword">type</span> <span class="hljs-keyword">struct</span> Value {
  value <span class="hljs-keyword">interface</span>{}
}</code></pre>
<p>结构中的<code>value</code>字段保存这个JSON<code>Value</code>的实际值，通过类型判定来确定其类型。因此会有很多的判定，赋值，以及取值函数，比如针对一个<code>string</code>类型的<code>Value</code>需要有判定是否为<code>string</code>的操作<code>IsString()</code>，赋值<code>AsString()</code>，以及获取真实值的操作<code>String()</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 判定是否为string，如果是，则返回true，否则返回false
func (v *Value) IsString() bool {
  if _, ok := v.value.(string); ok {
    return true
  }
  return false
}

// 将一个Value赋值为一个string
func (v *Value) AsString(value string) {
  v.value = value
}

// 从一个string类型的Value中取出String值
func (v *Value) String() string {
  if value, ok := v.value.(string); ok {
    return value
  }
  // 如果不是一个string类型，则报错，所以需要先判定是否为string类型
  panic(&quot;not a string value&quot;)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="go hljs"><code class="go"><span class="hljs-comment">// 判定是否为string，如果是，则返回true，否则返回false</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-params">(v *Value)</span> <span class="hljs-title">IsString</span><span class="hljs-params">()</span> <span class="hljs-title">bool</span></span> {
  <span class="hljs-keyword">if</span> _, ok := v.value.(<span class="hljs-keyword">string</span>); ok {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>
  }
  <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
}

<span class="hljs-comment">// 将一个Value赋值为一个string</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-params">(v *Value)</span> <span class="hljs-title">AsString</span><span class="hljs-params">(value <span class="hljs-keyword">string</span>)</span></span> {
  v.value = value
}

<span class="hljs-comment">// 从一个string类型的Value中取出String值</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-params">(v *Value)</span> <span class="hljs-title">String</span><span class="hljs-params">()</span> <span class="hljs-title">string</span></span> {
  <span class="hljs-keyword">if</span> value, ok := v.value.(<span class="hljs-keyword">string</span>); ok {
    <span class="hljs-keyword">return</span> value
  }
  <span class="hljs-comment">// 如果不是一个string类型，则报错，所以需要先判定是否为string类型</span>
  <span class="hljs-built_in">panic</span>(<span class="hljs-string">"not a string value"</span>)
}</code></pre>
<p>针对这样的操作还有很多，可以参考 <a href="https://github.com/acrazing/cheapjson/blob/master/value.go" rel="nofollow noreferrer" target="_blank">cheapjson/value.go</a>.</p>
<h2 id="articleHeader1">JSON parser</h2>
<p>对于<code>string</code>, <code>true</code>, <code>false</code>, <code>null</code>, <code>number</code>这样的值，都属于字面量，即没有深层结构，可取直接读取，并且中间不可能被空白字符切断，所以可以直接读取。而对于一个<code>array</code>或者<code>object</code>，则是一个多层的树状结构。最直接的想法肯定是用递归，但是大家都知道这是不可行的，因为在解析大JSON的时候很可能栈溢出了，所以只能用栈+迭代的办法。</p>
<p>学过编译原理的人都知道，做AST分析的时候首先要分析Token，然后再分析AST，在解析JSON的时候也应该这样，虽然Token比较少：只有几个字面量以及<code>{</code>, <code>[</code>, <code>:</code>, <code>]</code>, <code>}</code>几个界定符。可惜我并没有学过编译原理，上来就拿状态机来迭代了。因为JSON是一棵树，其解析过程是从树根一直遍历到各个叶节点再返回树根的过程。自然就会涉及到栈的压入及弹出操作。具体来讲，就是在遇到<code>array</code>和<code>object</code>的子节点的时候要压入栈，遇到一个<code>value</code>的结束符的时候要弹出栈。同时还要保存栈结点对应的<code>Value</code>以及其状态信息。所以我定义了一个栈结点结构：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="type struct state {
  state int
  value *Value
  parent *state
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="go hljs"><code class="go"><span class="hljs-keyword">type</span> <span class="hljs-keyword">struct</span> state {
  state <span class="hljs-keyword">int</span>
  value *Value
  parent *state
}</code></pre>
<p>其中<code>state</code>表示当前栈节点的状态，<code>value</code>表示其所代表的值<code>parent</code>表示其父节点，根节点的父节点为<code>nil</code>。当要压入栈时，只需要新建一个节点，将其<code>parent</code>设置为当前节点即可，要弹出时，将当前结点设置为当前结点的<code>parent</code>。如果当前节点为<code>nil</code>，则表示遍历结束，JSON自身也应该结束，除了空白字符外，不应该还包含任何字符。</p>
<p>一个节点可能的状态有：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const (
    // start of a value
    stateNone = iota
    stateString
    // after [ must be a value or ]
    stateArrayValueOrEnd
    // after a value, must be a , or ]
    stateArrayEndOrComma
    // after a {, must be a key string or }
    stateObjectKeyOrEnd
    // after a key string must be a :
    stateObjectColon
    // after a : must be a value
    // after a value, must be , or }
    stateObjectEndOrComma
    // after a , must be key string
    stateObjectKey
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="go hljs"><code class="go"><span class="hljs-keyword">const</span> (
    <span class="hljs-comment">// start of a value</span>
    stateNone = <span class="hljs-literal">iota</span>
    stateString
    <span class="hljs-comment">// after [ must be a value or ]</span>
    stateArrayValueOrEnd
    <span class="hljs-comment">// after a value, must be a , or ]</span>
    stateArrayEndOrComma
    <span class="hljs-comment">// after a {, must be a key string or }</span>
    stateObjectKeyOrEnd
    <span class="hljs-comment">// after a key string must be a :</span>
    stateObjectColon
    <span class="hljs-comment">// after a : must be a value</span>
    <span class="hljs-comment">// after a value, must be , or }</span>
    stateObjectEndOrComma
    <span class="hljs-comment">// after a , must be key string</span>
    stateObjectKey
)</code></pre>
<p>状态的含义和字面意思一样，比如对于状态<code>stateArrayValueOrEnd</code>表示当前栈节点遇到了一个array的起始标志<code>[</code>，在等待一个子<code>Value</code>或者一个array的结束符<code>]</code>，而状态<code>stateArrayEndOrComma</code>表示一个array已经遇到了子<code>Value</code>，在等待结束符<code>]</code>或者<code>Value</code>的分隔符<code>,</code>。因此，在解析一个数组的时候，完整的栈操作过程是：遇到<code>[</code>，将当前结点的状态设置为<code>stateArrayValueOrEnd</code>，然后过滤空白字符，判定第一个字符是<code>]</code>还是其它字符，如果是<code>]</code>，则array结束，弹出栈，如果不是，则将自身状态修改为<code>stateArrayEndOrComma</code>，并压入一个新栈结点，将其状态设置为<code>stateNone</code>，重新开始解析，此结点解析完成之后，弹出此结点，判定是<code>,</code>还是<code>]</code>，如果是<code>]</code>，则结束弹出，如果是<code>,</code>则不改变自身状态，并重新一个新栈结点，开始新的循环。完事的状态机如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010331726" src="https://static.alili.tech/img/remote/1460000010331726" alt="state.png" title="state.png" style="cursor: pointer; display: inline;"></span></p>
<p>其含义如下：</p>
<p>首先初始化一个空节点，状态设置为<code>stateNone</code>，然后判断第一个非空字符，如果是<code>t/f/n/[-0-9]</code>，则直接解析字面量，然后弹出，如果是<code>[</code>，则将状态设置为<code>stateArrayValueOrEnd</code>，然后判定第一个字符，如果是<code>]</code>，则结束弹出，否则压入新栈，并将自身状态设置为<code>stateArrayEndOrComma</code>，开始新的循环，如果是<code>{</code>，则将状态设置为<code>stateObjectKeyOrEnd</code>，如果下一个非空字符为<code>}</code>，则结束弹出，否则解析<code>key</code>，完成之后，压入新栈，并将自身状态设置为<code>stateObjectEndOrComma</code>。</p>
<p>比较特殊的是<code>stateString</code>，按道理其也是一个字面量，不需要到一个新的循环里面去解析。但是因为一个<code>object</code>的<code>key</code>也是一个<code>string</code>，为了复用代码，并避免调用函数产生的性能开销，将<code>string</code>类型和object的<code>key</code>当作同一类型来处理，具体如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="root := &amp;state{&amp;Value{nil}, stateNone, nil}
curr := root
for {
  // ignore whitespace
  // check curr is nil or not
  switch curr.state {
    case stateNone:
      switch data[offset] {
        case '&quot;':
          // go to new loop
          curr.state = stateString
          continue
      }
    case stateObjectKey, stateString:
      // parse string
      if curr.state == stateObjectKey {
        // create new stack node
      } else {
        // pop stack
      }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs go"><code>root := &amp;state{&amp;Value{<span class="hljs-literal">nil</span>}, stateNone, <span class="hljs-literal">nil</span>}
curr := root
<span class="hljs-keyword">for</span> {
  <span class="hljs-comment">// ignore whitespace</span>
  <span class="hljs-comment">// check curr is nil or not</span>
  <span class="hljs-keyword">switch</span> curr.state {
    <span class="hljs-keyword">case</span> stateNone:
      <span class="hljs-keyword">switch</span> data[offset] {
        <span class="hljs-keyword">case</span> <span class="hljs-string">'"'</span>:
          <span class="hljs-comment">// go to new loop</span>
          curr.state = stateString
          <span class="hljs-keyword">continue</span>
      }
    <span class="hljs-keyword">case</span> stateObjectKey, stateString:
      <span class="hljs-comment">// parse string</span>
      <span class="hljs-keyword">if</span> curr.state == stateObjectKey {
        <span class="hljs-comment">// create new stack node</span>
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-comment">// pop stack</span>
      }
  }
}</code></pre>
<p>此外比较特殊的是在解析完一个object的key之后，立即压入了一个新栈结点，并将其状态设置为<code>stateObjectColon</code>，同时将自身的状态设置为<code>stateObjectEndOrComma</code>，在解析完colon之后再这个节点的状态设置为<code>stateNone</code>，开始新的循环，具体来说：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if curr.state == stateObjectKey {
  curr.state = stateObjectEndOrComma
  curr = &amp;state{&amp;Value{nil}, stateObjectColon, nil}
  continue
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="go hljs"><code class="go"><span class="hljs-keyword">if</span> curr.state == stateObjectKey {
  curr.state = stateObjectEndOrComma
  curr = &amp;state{&amp;Value{<span class="hljs-literal">nil</span>}, stateObjectColon, <span class="hljs-literal">nil</span>}
  <span class="hljs-keyword">continue</span>
}</code></pre>
<p>这是因为在<code>:</code>之前和之后都可能有空白字符，这里是为了复用代码逻辑：即在每一次迭代开始之时都把所有的空白过滤掉。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for {
  LOOP_WS:
  for ; offset < len(data); offset++ {
    switch data[offset] {
    case '\t', '\r', '\n', ' ':
      continue
    default:
      break LOOP_WS
  }
  // do staff
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="go hljs"><code class="go"><span class="hljs-keyword">for</span> {
  LOOP_WS:
  <span class="hljs-keyword">for</span> ; offset &lt; <span class="hljs-built_in">len</span>(data); offset++ {
    <span class="hljs-keyword">switch</span> data[offset] {
    <span class="hljs-keyword">case</span> <span class="hljs-string">'\t'</span>, <span class="hljs-string">'\r'</span>, <span class="hljs-string">'\n'</span>, <span class="hljs-string">' '</span>:
      <span class="hljs-keyword">continue</span>
    <span class="hljs-keyword">default</span>:
      <span class="hljs-keyword">break</span> LOOP_WS
  }
  <span class="hljs-comment">// do staff</span>
}</code></pre>
<p>在过滤掉空白后，如果当前栈为<code>nil</code>，则不应该有字符存在，整个解析结束，否则一定有字符，并且需要进行解析：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for {
  // ignore whitespace
  if curr == nil {
    if offset == len(data) {
      return
    } else {
      // unexpected char data[offset] at offset
    }
  } else if offset == len(data) {
    // unexpected EOF at offset
  }
  // do staff
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="go hljs"><code class="go"><span class="hljs-keyword">for</span> {
  <span class="hljs-comment">// ignore whitespace</span>
  <span class="hljs-keyword">if</span> curr == <span class="hljs-literal">nil</span> {
    <span class="hljs-keyword">if</span> offset == <span class="hljs-built_in">len</span>(data) {
      <span class="hljs-keyword">return</span>
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-comment">// unexpected char data[offset] at offset</span>
    }
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> offset == <span class="hljs-built_in">len</span>(data) {
    <span class="hljs-comment">// unexpected EOF at offset</span>
  }
  <span class="hljs-comment">// do staff</span>
}</code></pre>
<p>随后便是根据当前状态来进行相应的解析了。</p>
<h2 id="articleHeader2">后记</h2>
<p>从目前的开源项目上来看，性能上应该还有优化的空间，毕竟有人已经做到号称<code>2-4x</code>的速度，而且现在已经有很多项目在搞将Golang的Struct先编译一遍，再调用生成的函数针对特定的结构进行解析，速度更快，不过既然就预先编译了，干嘛还要用JSON啊，直接PB/MsgPack得了。特别是<code>djson</code>这个库，解析小JSON的时候速度是原生的3-4倍，但是大的时候只有2倍，而<code>cheapjson</code>则在解析大JSON的时候性能几乎是原生的7倍，相当搞笑。而从测试结果上来看，整体上性能和内存都还可以，但是在解析数组的时候比原生的还要差。所以值得改进，尤其是频繁的创建和销毁<code>state</code>节点这一点，还有数组的动态扩容等。</p>
<p>以后有空再慢慢搞吧，我不想白头发越来越多了。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
造轮子系列(一): 一个速度九分快的JSON解析器

## 原文链接
[https://segmentfault.com/a/1190000010331737](https://segmentfault.com/a/1190000010331737)

