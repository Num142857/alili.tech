---
title: 'React 开发实战（一）- Repeat 组件' 
date: 2018-12-30 2:30:10
hidden: true
slug: rfb0m52hhq
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>最近在写一个面向 React 初学者的系列教程<a href="https://segmentfault.com/a/1190000011336838">玩转 React</a>，内容对有 React 开发经验的同学来说可能太过于基础和啰嗦，不太感兴趣。所以我打算同时开始另外一个系列文章《React 开发实战》。该系列主要面向有 React 开发经验的同学，更侧重 React 实战，每一篇文章会跟大家一起开发一个 React 组件或者一个简单有趣的 React 应用，这些组件或者应用往往满足如下特点：</p>
<ul>
<li>在我的实际项目中用到过的。</li>
<li>在常见的开源组件库中没有的。</li>
<li>有点小众，但是在特定的业务场景下能很大地提高项目的开发效率。</li>
<li>可能还比较有趣。</li>
</ul>
<p>如果这些组件能直接应用到大家的实际开发中去，那再好不过了；如果不能，能给大家一点启发，我觉得这件事情也是很有价值的。</p>
<p><strong>另外，每一篇文章后面都会附有本篇文章的完整示例和代码。</strong></p>
<h2 id="articleHeader1">问题描述</h2>
<p>大家应该都见过这种应用场景，页面上的某一部分，需要能够让用户添加任意多项。</p>
<p><strong>可能是表单中的一个字段，如下所示。</strong></p>
<p><span class="img-wrap"><img data-src="/img/bVV3WK?w=299&amp;h=185" src="https://static.alili.tech/img/bVV3WK?w=299&amp;h=185" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><strong>也可能是表单的一部分，如下所示，用户可以在一个表单内增加多个用户信息，然后将用户信息批量进行保存。</strong></p>
<p><span class="img-wrap"><img data-src="/img/bVV3WR?w=290&amp;h=279" src="https://static.alili.tech/img/bVV3WR?w=290&amp;h=279" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><strong>还有更变态的，如下所示，一个表单内用户信息部分可以添加多份，每一个用户信息中地址也可以添加多份。（Oh, My God. PM，你杀了我吧。）</strong></p>
<p><span class="img-wrap"><img data-src="/img/bVV3WY?w=290&amp;h=422" src="https://static.alili.tech/img/bVV3WY?w=290&amp;h=422" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>还好，React 应付这种需求，还是小菜一碟。但是在一个 web 应用中有这么多的相似场景的话，如果我们挨个实现一遍，那真是太枯燥了，与搬砖无异。遇到这种情况，就需要我们把相同的功能抽象出来，做成组件，这将极大地提升你的开发效率。</p>
<p>基于这个场景，我们今天就开发一个能让其 children 重复任意多份的组件，我们就称之为 Repeat 吧。</p>
<h2 id="articleHeader2">你期望 Repeat 组件该怎么用</h2>
<p>在开发一个组件的时候，不要着急写代码，先想想你要把这个组件做成什么样子，例如这个 Repeat 组件，我希望有如下特性：</p>
<ul>
<li>Repeat 组件提供默认的，添加、移除按钮。</li>
<li>点击添加，将 React 的 children 复制一份，点击移除将某一项移除。</li>
<li>当只有一项时不能移除。</li>
<li>Repeat 支持 onChange 回调函数，当 Repeat 内的表单输入发生变化时可以即时通知其父组件。</li>
</ul>
<p>然后在代码中我期望可以这样来用 Repeat 这个组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class App extends React.Component {
    handleChange(items) {
        console.info(items);
    }
    render() {
        <Repeat onChange={items => this.handleChange(items)}>
            <input  type=&quot;text&quot; />
        </Repeat>
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    handleChange(items) {
        <span class="hljs-built_in">console</span>.info(items);
    }
    render() {
        &lt;Repeat onChange={items =&gt; <span class="hljs-keyword">this</span>.handleChange(items)}&gt;
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">input</span>  <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> /&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">Repeat</span>&gt;</span></span>
    }
}</code></pre>
<p>OK，就是这么简单，这样 Input 组件就可以重复加添多份了。基于这个构想，我们来实现 Repeat 这个组件。</p>
<h2 id="articleHeader3">开始实现 Repeat 组件</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Repeat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [''],
        };
    }
    handleChange(e, index) {
        const items = [...this.state.items];
        items[index] = e.target.value;
        this.setState({ items });
        this.props.onChange(items);
    }
    handleAddItem(e, index) {
        e.preventDefault();
        const items = [...this.state.items];
        items.splice(index, 0, '');
        this.setState({ items });
    }
    handleRemoveItem(e, index) {
        e.preventDefault();
        if (this.state.items.length === 1) return;
        const items = [...this.state.items];
        items.splice(index, 1);
        this.setState({ items });
    }
    render() {
        const children = React.Children.only(this.props.children);
        const elementItems = this.state.items.map((item, index) => (
            <div key={index}>
                {
                    React.cloneElement(children, {
                        onChange: e => this.handleChange(e, index),
                        value: item,
                    })
                }
                <div>
                    <a href=&quot;#&quot; onClick={e => this.handleAddItem(e, index)}>添加</a>
                    <a href=&quot;#&quot; onClick={e => this.handleRemoveItem(e, index)}>移除</a>
                </div>
            </div>
        ));
        return <div>{elementItems}</div>;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Repeat</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>(props) {
        <span class="hljs-keyword">super</span>(props);
        <span class="hljs-keyword">this</span>.state = {
            <span class="hljs-attr">items</span>: [<span class="hljs-string">''</span>],
        };
    }
    handleChange(e, index) {
        <span class="hljs-keyword">const</span> items = [...this.state.items];
        items[index] = e.target.value;
        <span class="hljs-keyword">this</span>.setState({ items });
        <span class="hljs-keyword">this</span>.props.onChange(items);
    }
    handleAddItem(e, index) {
        e.preventDefault();
        <span class="hljs-keyword">const</span> items = [...this.state.items];
        items.splice(index, <span class="hljs-number">0</span>, <span class="hljs-string">''</span>);
        <span class="hljs-keyword">this</span>.setState({ items });
    }
    handleRemoveItem(e, index) {
        e.preventDefault();
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.state.items.length === <span class="hljs-number">1</span>) <span class="hljs-keyword">return</span>;
        <span class="hljs-keyword">const</span> items = [...this.state.items];
        items.splice(index, <span class="hljs-number">1</span>);
        <span class="hljs-keyword">this</span>.setState({ items });
    }
    render() {
        <span class="hljs-keyword">const</span> children = React.Children.only(<span class="hljs-keyword">this</span>.props.children);
        <span class="hljs-keyword">const</span> elementItems = <span class="hljs-keyword">this</span>.state.items.map(<span class="hljs-function">(<span class="hljs-params">item, index</span>) =&gt;</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{index}</span>&gt;</span>
                {
                    React.cloneElement(children, {
                        onChange: e =&gt; this.handleChange(e, index),
                        value: item,
                    })
                }
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{e</span> =&gt;</span> this.handleAddItem(e, index)}&gt;添加<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{e</span> =&gt;</span> this.handleRemoveItem(e, index)}&gt;移除<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        ));
        <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{elementItems}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
    }
}</code></pre>
<p>代码很简单，简单解释一下：</p>
<ul>
<li>组件的 <code>state</code> 中持有 <code>items</code> 字段来保存每一个项的数据。</li>
<li>render 时先获取到唯一的 <code>children</code>，然后 map 组件 <code>state</code> 中的 <code>items</code>，将每一项映射为 <code>children</code> 的一个副本。并为这个副本传入两个属性，<code>onChange</code> 接收每一项的数据变化，<code>value</code> 传递每一项当前应展示的值。</li>
<li>另外 <code>Repeat</code> 为每一项准备了一个“添加”按钮和一个“移除”按钮，用来在当前项位置新增一项或者移除当前项。原理就是将 <code>this.state.items</code> 中对应下标处的数组元素删掉就好了。</li>
</ul>
<p>到此，<code>Repeat</code> 是不是大致有模有样了呢。需要提醒大家的是，<code>React.cloneElement</code> 和 <code>React.Children.xxx</code> 这些 api 通常只会在这种公共组件中使用，在大部分场景，尽量少用。</p>
<h2 id="articleHeader4">跟 children 有个约定</h2>
<p>有些同学可能已经发现了，上面例子中， <code>Repeat</code> 的 <code>children</code> 是个 <code>input</code>，那如果是一个其他的组件不就完蛋了嘛。</p>
<p>这是第一个问题，为了解决这个问题呢，Repeat 需要对它的 <code>children</code> 提两个条件：</p>
<ol>
<li>
<p>属性上必须要接收一个 <code>onChange</code> 回调函数，函数接收一个对象参数，参数结构如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    target: {
        value: 'xxxx'
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
    <span class="hljs-attr">target</span>: {
        <span class="hljs-attr">value</span>: <span class="hljs-string">'xxxx'</span>
    }
}</code></pre>
<p><code>value</code> 的值为当前项产出的数据，可能是个对象也可能是字符串或者数值。没错，我就是为了兼容 input event 的数据结构。你当然可以用任何你喜欢的且方便处理的数据结构。</p>
</li>
<li>
<code>children</code> 组件需要接收一个 value 属性，以展示其拥有的值。也就是说 <code>children</code> 组件应当是一个受控的（controlled）组件。</li>
</ol>
<p>这就是一个协议，你希望某个组件内通过 <code>Repeat</code> 组件方便地添加多份并能获取到一组数据，那就必须要遵守这个协议。有同学可能会说为什么不搞的智能一点呢？嗯，这里我想分享一点个人经验：有些时候，尤其是在业务开发过程中，把公共部分抽取出来复用即可，点到为止，没有必要搞得那么“强大”，剩下的事情让一个很容易遵守的协议来完成，其实效率会更高，更容易让人理解。</p>
<p>其实在计算机的世界中处处充满了协议，例如你想让 HTTP Server 返回正确的响应，你必须要遵循 http 协议来和它通信；你生产的显卡能买的出去，必须要遵守相应的协议，要能插到别人家生产的主板上。</p>
<p>扯远了！收！</p>
<p>对，有了上面这个约定以后，<code>Repeat</code> 一行代码未加，是不是感觉功能完善了许多？嗯，就是这个目的。现在我们来实现一下文章开始时候说的第二个场景。</p>
<p>聪明的你一定已经知道该怎么做了，没错，只要我们实现一个 <code>UserForm</code> 组件，并让他满足上面的约定即可。请看代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class UserForm extends React.Component {
    handleFieldChange(e) {
        const { name, value } = e.target;
        const formData = {
            ...this.props.value, 
            [name]: value,
        }
        this.props.onChange({
            target: {
                value: formData,
            }
        });
    }
    render() {
        const formData = this.props.value || {};
        return (
            <div>
                <div>
                    <label for=&quot;&quot;>姓名</label>
                    <input
                        type=&quot;text&quot;
                        name=&quot;name&quot;
                        value={formData.name}
                        onChange={e => this.handleFieldChange(e)}
                    />
                </div>
                <div>
                    <label for=&quot;&quot;>地址</label>
                    <input
                        type=&quot;text&quot;
                        name=&quot;addr&quot;
                        value={formData.addr}
                        onChange={e => this.handleFieldChange(e)}
                    />
                </div>
            </div>
        )
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">UserForm</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    handleFieldChange(e) {
        <span class="hljs-keyword">const</span> { name, value } = e.target;
        <span class="hljs-keyword">const</span> formData = {
            ...this.props.value, 
            [name]: value,
        }
        <span class="hljs-keyword">this</span>.props.onChange({
            <span class="hljs-attr">target</span>: {
                <span class="hljs-attr">value</span>: formData,
            }
        });
    }
    render() {
        <span class="hljs-keyword">const</span> formData = <span class="hljs-keyword">this</span>.props.value || {};
        <span class="hljs-keyword">return</span> (
            &lt;div&gt;
                &lt;div&gt;
                    &lt;label for=""&gt;姓名&lt;/label&gt;
                    &lt;input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={e =&gt; this.handleFieldChange(e)}
                    /&gt;
                &lt;/div&gt;
                &lt;div&gt;
                    &lt;label for=""&gt;地址&lt;/label&gt;
                    &lt;input
                        type="text"
                        name="addr"
                        value={formData.addr}
                        onChange={e =&gt; this.handleFieldChange(e)}
                    /&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        )
    }
}</code></pre>
<p>为了让代码更简洁，我把 <code>UserForm</code> 这个组件实现为了一个支持受控的组件，但是在目前的业务场景下已经足够了，在实际情况下，你可以按需调整。</p>
<p>通过这个例子，还希望大家能体会到组件拆分的一个好处。就是，<code>UserForm</code> 和 <code>Repeat</code> 拆分成两个组件以后，<code>UserForm</code> 的复用性会更强。可以想象一下，当用户被批量添加以后，是不是有可能在编辑单个用户的时候，可以继续使用这个组件。</p>
<p>好啦，关于第三个场景我想就没有必要再实现一遍了，Repeat 嵌套多少层其实都是可以的。</p>
<h2 id="articleHeader5">更进一步</h2>
<p>实际上在实际应用中，Repeat 这个组件还需要做进一步完善，其中一个就是样式，还有可能在不同的场景下，虽然交互都是这样，但样式会有所差异。另外默认是“添加”、“移除”两个文字按钮，说不定实际业务场景中是两个 +,- 的图标按钮；还有可能“添加”、“移除”的位置为有所变化。</p>
<p>这些问题怎么处理呢？下面给大家描述下思路，具体代码就不写了，如果有什么疑问可以给我留言。</p>
<ol>
<li>关于样式，你可以给 <code>Repeat</code> 添加 <code>itemClassName</code> 和 <code>buttonsClassName</code> 两个属性分别为每一项和按钮区域的 css class。这样你就可以在不同的场景下指定不同的样式了。</li>
<li>关于如何将文字按钮改为图标按钮，你可以给 <code>Repeat</code> 添加 <code>renderButtons</code> 这样一个函数属性，如果未指定则用默认的方式渲染按钮，如果有则勇气返回值渲染属性。</li>
</ol>
<h2 id="articleHeader6">最后</h2>
<p>这是本篇文章的代码：<a href="https://codepen.io/Sarike/pen/gGRamP" rel="nofollow noreferrer" target="_blank">https://codepen.io/Sarike/pen...</a><button class="btn btn-xs btn-default ml10 preview" data-url="Sarike/pen/gGRamP" data-typeid="3">点击预览</button></p>
<p>好啦，文章就到这吧，如果有什么疑问可以给我留言。谢谢大家，祝大家国庆、中秋节快乐。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React 开发实战（一）- Repeat 组件

## 原文链接
[https://segmentfault.com/a/1190000011415955](https://segmentfault.com/a/1190000011415955)

