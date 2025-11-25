---
title: '深入理解 form 系列（一）-- HTML 表单' 
date: 2019-01-28 2:30:09
hidden: true
slug: acxrwf794nb
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">表单元素</h2>
<p>从 HTML 到 HTML5, 表单相关的元素已经得到了很大的扩充, 基本能够满足我们常见的需求。但在实际工作中, 因为交互或者浏览器兼容的需要, 有时候不得不对原生的表单元素进行扩展或者模拟。但在此之前, 清楚的了解并掌握各种表单元素还是很重要的。在本文中, 我们将对表单元素 (默认是指 HTML5 表单元素)进行详细的阐述。</p>
<h3 id="articleHeader1">form <sup id="fnref-1"><a href="#fn-1" class="footnote-ref">1</a></sup>
</h3>
<ul>
<li>form 会自动处理 <code>submit</code> 事件 (submit 事件通常由 <code>type=submit</code> 的 <code>input</code> 或者 <code>button</code> 的元素触发)</li>
<li>form 会自动做一层校验，使用 <code>form.novalidate</code> 可以关闭原生的 validate</li>
<li>form 会根据每一个表单元素的 <code>name</code> 取得对应的用户输入,  然后将 <code>form data</code> 以 <code>query string</code> 的形式添加到 <code>action</code> 属性对应的 url 后面。默认的请求方法是 GET, 默认的action 是当前的 url。</li>
<li>
<code>event.target.elements</code> 将会返回所有表单元素</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<form novalidate>
  <input name='username' required/>
  <input name='passworkd' type='password' required/>
  <input name='email' type='email'/>
  <input type='submit' value='submit'/>
</form>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;<span class="hljs-selector-tag">form</span> novalidate&gt;
  &lt;<span class="hljs-selector-tag">input</span> name=<span class="hljs-string">'username'</span> required/&gt;
  &lt;<span class="hljs-selector-tag">input</span> name=<span class="hljs-string">'passworkd'</span> type=<span class="hljs-string">'password'</span> required/&gt;
  &lt;<span class="hljs-selector-tag">input</span> name=<span class="hljs-string">'email'</span> type=<span class="hljs-string">'email'</span>/&gt;
  &lt;<span class="hljs-selector-tag">input</span> type=<span class="hljs-string">'submit'</span> value=<span class="hljs-string">'submit'</span>/&gt;
&lt;/form&gt;</code></pre>
<blockquote>运行上面的代码可以看到, 提交表单之后，浏览器的地址会增加类似这样的 query string <code>?username=tom&amp;passworkd=123&amp;email=test%40gmail.com</code>
</blockquote>
<h3 id="articleHeader2">可交互型 elements</h3>
<p>需要跟用户进行交互，并获得用户输入的这一类表单元素，我们把它们归类为 <code>可交互型表单元素</code>。</p>
<p>下面列举出来了一些：</p>
<ul>
<li>
<code>input</code>: 常用的 type 有 <code>checkbox</code>, <code>tel</code>, <code>number</code>, <code>email</code> 等</li>
<li><code>textarea</code></li>
<li><code>select</code></li>
<li><code>option</code></li>
</ul>
<h3 id="articleHeader3">反馈型 elements</h3>
<p>只是单纯地反馈信息, 不需要跟用户进行交互的表单元素，我们把它们归类为 <code>反馈型表单元素</code>。</p>
<p>下面列举出来了一些:</p>
<ul>
<li><code>meter</code></li>
<li><code>output</code></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<form oninput=&quot;result.value=parseInt(a.value)+parseInt(b.value)&quot;>
    <input type='number' value='50' name='a' />
    <input type='number' value='10' name='b' />
    <output name='result'>60</output>
</form>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">oninput</span>=<span class="hljs-string">"result.value=parseInt(a.value)+parseInt(b.value)"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">'number'</span> <span class="hljs-attr">value</span>=<span class="hljs-string">'50'</span> <span class="hljs-attr">name</span>=<span class="hljs-string">'a'</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">'number'</span> <span class="hljs-attr">value</span>=<span class="hljs-string">'10'</span> <span class="hljs-attr">name</span>=<span class="hljs-string">'b'</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">output</span> <span class="hljs-attr">name</span>=<span class="hljs-string">'result'</span>&gt;</span>60<span class="hljs-tag">&lt;/<span class="hljs-name">output</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span></code></pre>
<blockquote>对于 <code>output</code>, 可以在 <code>form.oninput</code> 设置计算出来的 value</blockquote>
<h3 id="articleHeader4">分组型 elements</h3>
<p>用来对多个表单元素进行分组的这一类表单元素, 我们把他们归类为 <code>分组型表单元素</code>。</p>
<p>下面列举出来了一些:</p>
<ul>
<li><code>fieldset</code></li>
<li><code>optgroup</code></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<form>
  <select>
    <optgroup label='group1'>
      <option>1</option>
      <option>2</option>
      <option>3</option>
    </optgroup>
    <optgroup label='group2'>
      <option>4</option>
      <option>5</option>
      <option>6</option>
    </optgroup>
    <optgroup label='group3'>
      <option>7</option>
      <option>8</option>
      <option>9</optioin>
    </optgroup>
  </select>
</form>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">form</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">select</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">optgroup</span> <span class="hljs-attr">label</span>=<span class="hljs-string">'group1'</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">option</span>&gt;</span>1<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">option</span>&gt;</span>2<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">option</span>&gt;</span>3<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">optgroup</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">optgroup</span> <span class="hljs-attr">label</span>=<span class="hljs-string">'group2'</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">option</span>&gt;</span>4<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">option</span>&gt;</span>5<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">option</span>&gt;</span>6<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">optgroup</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">optgroup</span> <span class="hljs-attr">label</span>=<span class="hljs-string">'group3'</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">option</span>&gt;</span>7<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">option</span>&gt;</span>8<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">option</span>&gt;</span>9<span class="hljs-tag">&lt;/<span class="hljs-name">optioin</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">optgroup</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">select</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span></code></pre>
<h4>label</h4>
<ul>
<li>用 <code>for</code> 可与对应关联了 <code>id</code> 的交互 element 相连</li>
<li>可以用来包裹<code>可交互 elment</code>, 包括多个, 控制第一个</li>
<li>不建议嵌套 <code>label</code>
</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<form>
  <fieldset>
    <legend>Title</legend>
    <label for='radio'>Click me</label>
    <input type='radio' id='radio'/>
  </fieldset>
</form>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">form</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">fieldset</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">legend</span>&gt;</span>Title<span class="hljs-tag">&lt;/<span class="hljs-name">legend</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">'radio'</span>&gt;</span>Click me<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">'radio'</span> <span class="hljs-attr">id</span>=<span class="hljs-string">'radio'</span>/&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">fieldset</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<form>
  <fieldset>
    <legend>用户信息</legend>
    <label>
      男 <input type='radio' name='gender' id='male' />
    </label>
    <label>
      女 <input type='radio' name='gender' id='female'/>
    </label>
  </fieldset>
</form>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">form</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">fieldset</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">legend</span>&gt;</span>用户信息<span class="hljs-tag">&lt;/<span class="hljs-name">legend</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>
      男 <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">'radio'</span> <span class="hljs-attr">name</span>=<span class="hljs-string">'gender'</span> <span class="hljs-attr">id</span>=<span class="hljs-string">'male'</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>
      女 <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">'radio'</span> <span class="hljs-attr">name</span>=<span class="hljs-string">'gender'</span> <span class="hljs-attr">id</span>=<span class="hljs-string">'female'</span>/&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">fieldset</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span></code></pre>
<h2 id="articleHeader5">用 JavaScript 处理表单</h2>
<h3 id="articleHeader6">field 的抽象</h3>
<p>最基本的结构:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  field: {
    name: String,
    value: String || String[]
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>  <span class="hljs-selector-tag">field</span>: {
    <span class="hljs-attribute">name</span>: String,
    value: String || String[]
  }</code></pre>
<ul>
<li>
<code>value</code> 的 <code>String[]</code> 通常是用 <code>,</code> 分割后合成为一个 String</li>
<li>对于复杂结构的 <code>name</code> 可以使用 <code>keyPath</code>
</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  const fromKeyValues = {
    'user.name': 'Tom',
    'user.phone[0].number': '123456',
    'user.phone[0].type': 'mobile'
  };

  const fromValues = {
    user: {
      name: 'Tom',
      phone: [
        {
          number: '123456',
          type: 'mobile'
        }
      ]
    }
  };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code><span class="hljs-attribute">  const fromKeyValues</span> = {
    <span class="hljs-string">'user.name'</span>: <span class="hljs-string">'Tom'</span>,
    <span class="hljs-string">'user.phone[0].number'</span>: <span class="hljs-string">'123456'</span>,
    <span class="hljs-string">'user.phone[0].type'</span>: <span class="hljs-string">'mobile'</span>
  };

<span class="hljs-attribute">  const fromValues</span> = {
    user: {
      name: <span class="hljs-string">'Tom'</span>,
      phone: [
        {
          number: <span class="hljs-string">'123456'</span>,
          type: <span class="hljs-string">'mobile'</span>
        }
      ]
    }
  };</code></pre>
<p>如果对上面的代码不是很清楚的, 请参考 <a href="https://www.npmjs.com/package/qs" rel="nofollow noreferrer" target="_blank">qs</a></p>
<h3 id="articleHeader7">一个完整的实现</h3>
<ul>
<li>阻止 form 默认的 submit 事件</li>
<li>checkbox 需要拿 checked 而不是 value</li>
<li>select-multiple 需要存多个值</li>
<li>除了以上几个特殊的交互元素之外, 其他的都默认从 value 中去取值</li>
</ul>
<p><strong>form.html</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<form>
    <fieldset>
        <legend>Login</legend>
        <input name='username' placeholder='username' minlength='2'/>
        <input name='password' type='password' placeholder='password'/>
        <label>
            remember password
            <input name='checkbox' type='checkbox'/>
        </label>
    </fieldset>
    <fieldset>
        <div class=&quot;gender&quot;>
            <legend>More Info</legend>
            <label>
                男
                <input name='gender' type='radio' value='male' />
            </label>
            <label>
                女
                <input name='gender' type='radio' value='female' />
            </label>
        </div>
        <select name='select' multiple>
            <option>1</option>
            <optgroup label='2'>
                <option>2.1</option>
                <option>2.2</option>
            </optgroup>
        </select>
    </fieldset>
    <button type='submit'>Submit</button>
</form>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">form</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">fieldset</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">legend</span>&gt;</span>Login<span class="hljs-tag">&lt;/<span class="hljs-name">legend</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">name</span>=<span class="hljs-string">'username'</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">'username'</span> <span class="hljs-attr">minlength</span>=<span class="hljs-string">'2'</span>/&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">name</span>=<span class="hljs-string">'password'</span> <span class="hljs-attr">type</span>=<span class="hljs-string">'password'</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">'password'</span>/&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>
            remember password
            <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">name</span>=<span class="hljs-string">'checkbox'</span> <span class="hljs-attr">type</span>=<span class="hljs-string">'checkbox'</span>/&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">fieldset</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">fieldset</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"gender"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">legend</span>&gt;</span>More Info<span class="hljs-tag">&lt;/<span class="hljs-name">legend</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>
                男
                <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">name</span>=<span class="hljs-string">'gender'</span> <span class="hljs-attr">type</span>=<span class="hljs-string">'radio'</span> <span class="hljs-attr">value</span>=<span class="hljs-string">'male'</span> /&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>
                女
                <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">name</span>=<span class="hljs-string">'gender'</span> <span class="hljs-attr">type</span>=<span class="hljs-string">'radio'</span> <span class="hljs-attr">value</span>=<span class="hljs-string">'female'</span> /&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">select</span> <span class="hljs-attr">name</span>=<span class="hljs-string">'select'</span> <span class="hljs-attr">multiple</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">option</span>&gt;</span>1<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">optgroup</span> <span class="hljs-attr">label</span>=<span class="hljs-string">'2'</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">option</span>&gt;</span>2.1<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">option</span>&gt;</span>2.2<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">optgroup</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">select</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">fieldset</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">'submit'</span>&gt;</span>Submit<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span></code></pre>
<p><strong>form.js</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var $form = document.querySelector('form');

function getFormValues(form) {
  var values = {};
  var elements = form.elements; // elemtns is an array-like object

  for (var i = 0; i < elements.length; i++) {
    var input = elements[i];
    if (input.name) {
      switch (input.type.toLowerCase()) {
        case 'checkbox':
          if (input.checked) {
            values[input.name] = input.checked;
          }
          break;
        case 'select-multiple':
          values[input.name] = values[input.name] || [];
          for (var j = 0; j < input.length; j++) {
            if (input[j].selected) {
              values[input.name].push(input[j].value);
            }
          }
          break;
        default:
          values[input.name] = input.value;
          break;
      }
    }

  }

  return values;
}

$form.addEventListener('submit', function(event) {
  event.preventDefault();
  getFormValues(event.target);
  console.log(event.target.elements);
  console.log(getFormValues(event.target));
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs verilog"><code><span class="hljs-keyword">var</span> $form = document<span class="hljs-variable">.querySelector</span>('form');

<span class="hljs-keyword">function</span> getFormValues(form) {
  <span class="hljs-keyword">var</span> values = {};
  <span class="hljs-keyword">var</span> elements = form<span class="hljs-variable">.elements</span>; <span class="hljs-comment">// elemtns is an array-like object</span>

  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; elements<span class="hljs-variable">.length</span>; i++) {
    <span class="hljs-keyword">var</span> <span class="hljs-keyword">input</span> = elements[i];
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">input</span><span class="hljs-variable">.name</span>) {
      switch (<span class="hljs-keyword">input</span><span class="hljs-variable">.type</span><span class="hljs-variable">.toLowerCase</span>()) {
        <span class="hljs-keyword">case</span> 'checkbox':
          <span class="hljs-keyword">if</span> (<span class="hljs-keyword">input</span><span class="hljs-variable">.checked</span>) {
            values[<span class="hljs-keyword">input</span><span class="hljs-variable">.name</span>] = <span class="hljs-keyword">input</span><span class="hljs-variable">.checked</span>;
          }
          <span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">case</span> 'select-multiple':
          values[<span class="hljs-keyword">input</span><span class="hljs-variable">.name</span>] = values[<span class="hljs-keyword">input</span><span class="hljs-variable">.name</span>] || [];
          <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> j = <span class="hljs-number">0</span>; j &lt; <span class="hljs-keyword">input</span><span class="hljs-variable">.length</span>; j++) {
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">input</span>[j]<span class="hljs-variable">.selected</span>) {
              values[<span class="hljs-keyword">input</span><span class="hljs-variable">.name</span>]<span class="hljs-variable">.push</span>(<span class="hljs-keyword">input</span>[j]<span class="hljs-variable">.value</span>);
            }
          }
          <span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">default</span>:
          values[<span class="hljs-keyword">input</span><span class="hljs-variable">.name</span>] = <span class="hljs-keyword">input</span><span class="hljs-variable">.value</span>;
          <span class="hljs-keyword">break</span>;
      }
    }

  }

  <span class="hljs-keyword">return</span> values;
}

$form<span class="hljs-variable">.addEventListener</span>('submit', <span class="hljs-keyword">function</span>(<span class="hljs-keyword">event</span>) {
  <span class="hljs-keyword">event</span><span class="hljs-variable">.preventDefault</span>();
  getFormValues(<span class="hljs-keyword">event</span><span class="hljs-variable">.target</span>);
  console<span class="hljs-variable">.log</span>(<span class="hljs-keyword">event</span><span class="hljs-variable">.target</span><span class="hljs-variable">.elements</span>);
  console<span class="hljs-variable">.log</span>(getFormValues(<span class="hljs-keyword">event</span><span class="hljs-variable">.target</span>));
});</code></pre>
<h3 id="articleHeader8">结尾</h3>
<p>如果你还想继续了解在 react 中如何使用 form, 请移步我的另一篇博客 <a href="https://segmentfault.com/a/1190000007109130">React.js -- 优化你的表单</a></p>
<hr>
<ol><li id="fn-1"> <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form" rel="nofollow noreferrer" target="_blank">MDN 上关于 form 的介绍</a> <a href="#fnref-1" class="footnote-backref">↩</a>
</li></ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
深入理解 form 系列（一）-- HTML 表单

## 原文链接
[https://segmentfault.com/a/1190000008171330](https://segmentfault.com/a/1190000008171330)

