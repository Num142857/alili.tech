---
title: 'React从入门到精通系列之(9)表单处理' 
date: 2019-01-30 2:30:22
hidden: true
slug: yk4x0xsnigi
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">九、表单处理</h2>
<p>HTML表单元素与React中的其他DOM元素有点不同，因为表单元素自然地保留一些内部状态。 例如，这种采用纯HTML格式的表单接受单个name：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<form>
    <label>
        Name:
        <input type=&quot;text&quot; name=&quot;name&quot; />
    </label>
    <input type=&quot;submit&quot; value=&quot;Submit&quot; />
</form>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">form</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>
        Name:
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"name"</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"submit"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"Submit"</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span></code></pre>
<p>此表单具有在用户提交表单时浏览到新页面的默认HTML表单行为。<br> 如果你想在React中这个行为，它是可以工作的。 但在大多数情况下，使用JavaScript函数处理表单的提交并访问用户在表单中输入的数据很方便。 实现这一点的标准方法是使用称为<code>“可控组件”</code>的技术。</p>
<h3 id="articleHeader1">可控组件</h3>
<p>在HTML中，诸如<code>&lt;input&gt;</code>，<code>&lt;textarea&gt;</code>和<code>&lt;select&gt;</code>的表单元素通常保持它们自己的状态并且是基于用户输入来更新它的。 在React中，可变state通常保存在组件的state属性中，并且仅使用<code>setState()</code>更新。</p>
<p>我们可以通过使React state是<code>“真理的唯一来源”</code>来结合这两者。 后续用户在该表单进行输入时依然受React组件控制。 其值由React以这种方式控制的可输入表单元素被称为<code>“可控组件”</code>。</p>
<p>例如，如果我们想让前面的示例日志在提交时记录下名称，我们可以将表单作为<code>可控组件</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import ReactDOM from 'react-dom';

class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.change = this.change.bind(this);
        this.submit = this.submit.bind(this);
    }

    change(e) {
        this.setState({value: e.target.value});
    }

    submit(e) {
        e.preventDefault();
        console.log('A name was submitted: ', this.state.value);
    }

    render() {
        return (
            <form onSubmit={this.submit} >
                <label>
                    Name:
                    <input type=&quot;text&quot;
                           value={this.state.value}
                           onChange={this.change}
                    />
                </label>
                <input type=&quot;submit&quot; value=&quot;Submit&quot; />
            </form>
        )
    };
}
ReactDOM.render(
    <NameForm/>,
    document.getElementById('root')
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> ReactDOM <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">NameForm</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>(props) {
        <span class="hljs-keyword">super</span>(props);
        <span class="hljs-keyword">this</span>.state = {<span class="hljs-attr">value</span>: <span class="hljs-string">''</span>};
        <span class="hljs-keyword">this</span>.change = <span class="hljs-keyword">this</span>.change.bind(<span class="hljs-keyword">this</span>);
        <span class="hljs-keyword">this</span>.submit = <span class="hljs-keyword">this</span>.submit.bind(<span class="hljs-keyword">this</span>);
    }

    change(e) {
        <span class="hljs-keyword">this</span>.setState({<span class="hljs-attr">value</span>: e.target.value});
    }

    submit(e) {
        e.preventDefault();
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'A name was submitted: '</span>, <span class="hljs-keyword">this</span>.state.value);
    }

    render() {
        <span class="hljs-keyword">return</span> (
            &lt;form onSubmit={this.submit} &gt;
                &lt;label&gt;
                    Name:
                    &lt;input type="text"
                           value={this.state.value}
                           onChange={this.change}
                    /&gt;
                &lt;/label&gt;
                &lt;input type="submit" value="Submit" /&gt;
            &lt;/form&gt;
        )
    };
}
ReactDOM.render(
    &lt;NameForm/&gt;,
    document.getElementById('root')
);</code></pre>
<p>因为<code>value</code>属性是在<code>form</code>元素上设置的，所以显示的值将总是为<code>this.state.value</code>，让React <code>state</code>成其<code>value</code>的为真正来源。 由于<code>change</code>在每次击键时运行并更新React <code>state</code>，因此显示的值将随用户键入而更新。</p>
<p>使用<code>受控组件</code>，使得直接修改或验证用户输入的时候，每个<code>state</code>变量都将具有关联的处理函数。例如，如果我们想强制执行<code>name全部用大写字母写</code>，我们可以写change为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="change(e) {
    this.setState({value: e.target.value.toUpperCase()});
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">change(e) {
    <span class="hljs-keyword">this</span>.setState({<span class="hljs-attr">value</span>: e.target.value.toUpperCase()});
}</code></pre>
<h3 id="articleHeader2">textarea标签</h3>
<p>在HTML中，<code>&lt;textarea&gt;</code>元素的子元素就是它的文本内容：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<textarea>
    Hello there, my name is zhangyatao!
</textarea>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">&lt;textarea&gt;
    Hello there, my name is zhangyatao!
<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">textarea</span>&gt;</span></span></code></pre>
<p>在React中，<code>&lt;textarea&gt;</code>改为使用<code>value</code>属性。 这样，使用<code>&lt;textarea&gt;</code>的表单可以非常类似于使用单行输入的表单：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class EssayForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: '请填写一个你喜欢的dom元素'};
        this.change = this.change.bind(this);
        this.submit = this.submit.bind(this);
    }
    change(e) {
        this.setState({value: e.target.value});
    }
    submit(e) {
        e.preventDefault();
        console.log('有东西被提交了：', this.state.value);
    }
    render() {
        return (
            <form onSubmit={this.submit}>
                <label>
                    Name:
                    <textarea value={this.state.value} onChange={this.change} />
                </label>
                <input type=&quot;submit&quot; value=&quot;Submit&quot; />
            </form>
        );
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">EssayForm</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>(props) {
        <span class="hljs-keyword">super</span>(props);
        <span class="hljs-keyword">this</span>.state = {<span class="hljs-attr">value</span>: <span class="hljs-string">'请填写一个你喜欢的dom元素'</span>};
        <span class="hljs-keyword">this</span>.change = <span class="hljs-keyword">this</span>.change.bind(<span class="hljs-keyword">this</span>);
        <span class="hljs-keyword">this</span>.submit = <span class="hljs-keyword">this</span>.submit.bind(<span class="hljs-keyword">this</span>);
    }
    change(e) {
        <span class="hljs-keyword">this</span>.setState({<span class="hljs-attr">value</span>: e.target.value});
    }
    submit(e) {
        e.preventDefault();
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'有东西被提交了：'</span>, <span class="hljs-keyword">this</span>.state.value);
    }
    render() {
        <span class="hljs-keyword">return</span> (
            &lt;form onSubmit={this.submit}&gt;
                &lt;label&gt;
                    Name:
                    &lt;textarea value={this.state.value} onChange={this.change} /&gt;
                &lt;/label&gt;
                &lt;input type="submit" value="Submit" /&gt;
            &lt;/form&gt;
        );
    }
}</code></pre>
<p>请注意，<code>this.state.value</code>在构造函数中初始化，因此<code>textarea</code>默认显示其中的文本。</p>
<h3 id="articleHeader3">select标签</h3>
<p>在HTML中，<code>&lt;select&gt;</code>创建一个下拉列表。 例如，此HTML创建一个下拉列表：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<select>
    <option value=&quot;fruit&quot;>fruit</option>
    <option value=&quot;lime&quot;>lime</option>
    <option selected value=&quot;coconut&quot;>coconut</option>
    <option value=&quot;mango&quot;>mango</option>
</select>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">select</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"fruit"</span>&gt;</span>fruit<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"lime"</span>&gt;</span>lime<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">selected</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"coconut"</span>&gt;</span>coconut<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"mango"</span>&gt;</span>mango<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">select</span>&gt;</span></code></pre>
<p>请注意，由于<code>selected</code>属性<code>coconut</code>选项默认被选中的。<br> 在React中在一般是在根<code>select</code>标签上使用<code>value</code>属性而不是使用<code>selected</code>属性。 这在受控组件中很方便，因为您只需要在一个地方更新它。 例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import ReactDOM from 'react-dom';

class FlavorForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: 'coconut'};
        this.change = this.change.bind(this);
        this.submit = this.submit.bind(this);
    }

    change(e) {
        this.setState({value: e.target.value});
    }

    submit(e) {
        e.preventDefault();
        console.log('你喜欢的是：', this.state.value);
    }

    render() {
        return (
            <form onSubmit={this.submit}>
                <label>
                    请选择一个你喜欢的水果
                    <select value={this.state.value} onChange={this.change}>
                        <option value=&quot;fruit&quot;>fruit</option>
                        <option value=&quot;lime&quot;>lime</option>
                        <option value=&quot;coconut&quot;>coconut</option>
                        <option value=&quot;mango&quot;>mango</option>
                    </select>
                </label>
                <input type=&quot;submit&quot; value=&quot;submit&quot;/>
            </form>
        );
    }
}
ReactDOM.render(
    <FlavorForm/>,
    document.getElementById('root')
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> ReactDOM <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">FlavorForm</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>(props) {
        <span class="hljs-keyword">super</span>(props);
        <span class="hljs-keyword">this</span>.state = {<span class="hljs-attr">value</span>: <span class="hljs-string">'coconut'</span>};
        <span class="hljs-keyword">this</span>.change = <span class="hljs-keyword">this</span>.change.bind(<span class="hljs-keyword">this</span>);
        <span class="hljs-keyword">this</span>.submit = <span class="hljs-keyword">this</span>.submit.bind(<span class="hljs-keyword">this</span>);
    }

    change(e) {
        <span class="hljs-keyword">this</span>.setState({<span class="hljs-attr">value</span>: e.target.value});
    }

    submit(e) {
        e.preventDefault();
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'你喜欢的是：'</span>, <span class="hljs-keyword">this</span>.state.value);
    }

    render() {
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">onSubmit</span>=<span class="hljs-string">{this.submit}</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>
                    请选择一个你喜欢的水果
                    <span class="hljs-tag">&lt;<span class="hljs-name">select</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{this.state.value}</span> <span class="hljs-attr">onChange</span>=<span class="hljs-string">{this.change}</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"fruit"</span>&gt;</span>fruit<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"lime"</span>&gt;</span>lime<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"coconut"</span>&gt;</span>coconut<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"mango"</span>&gt;</span>mango<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">select</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"submit"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"submit"</span>/&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>
        );
    }
}
ReactDOM.render(
    <span class="hljs-tag">&lt;<span class="hljs-name">FlavorForm</span>/&gt;</span>,
    document.getElementById('root')
);</span></code></pre>
<p>总的来说，这使得<code>&lt;input type =“text”&gt;</code>，<code>&lt;textarea&gt;</code>和<code>&lt;select&gt;</code>都非常类似 - 它们都接受一个<code>value</code>属性，您可以使用它来实现<code>可控组件</code>。</p>
<h3 id="articleHeader4">可控组件的备选方案</h3>
<p>使用受控组件有时可能很乏味，因为您每次都需要为数据更改去编写事件处理程序，并通过React组件管理所有输入状态。 <br>当您将已经存在的项目转换为React或将React应用程序与非React库集成时，这可能会变得特别烦人。<br>在这些情况下，您可能想要选择那些<code>不可控组件</code>(后续会有详细讲解)，一种用于实现输入表单的替代技术。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React从入门到精通系列之(9)表单处理

## 原文链接
[https://segmentfault.com/a/1190000007799626](https://segmentfault.com/a/1190000007799626)

