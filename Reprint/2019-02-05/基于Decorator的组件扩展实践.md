---
title: '基于Decorator的组件扩展实践' 
date: 2019-02-05 2:30:09
hidden: true
slug: k0mjtzzz3oe
categories: [reprint]
---

{{< raw >}}

                    
<p>在前端业务开发中，组件化已经成为我们的共识。沉淀和复用组件，是提高开发效率的利器。但在组件复用的过程中，我们往往会遇到这样的问题，组件相似，却在结构或交互上有些许差别，需要对组件进行改造方可满足需求。这个问题之前在 <a href="https://zhuanlan.zhihu.com/p/21386862" rel="nofollow noreferrer" target="_blank">React实践 - Component Generator</a> 就有所提及。</p>
<p>之初，我们提出了组件<strong>配置式</strong>。在业务统一的情况下，仅仅修改组件用于配置的props就可以满足业务需求。但随着业务发生变化导致组件形态发生变化时，我们就必须不断增加配置去应对变化，便会出现配置泛滥，而在扩展过程中又必须保证组件向下兼容，只增不减，使组件可维护性的降低。</p>
<p>最近的项目开发中，<a href="/u/jasonhuang">@JasonHuang</a> 提出了组件<strong>组合式</strong>开发思想，有效地解决了配置式所存在的一些问题。下面我将详细阐述其思想与具体实现。</p>
<h2 id="articleHeader0">组件再分离</h2>
<p>对于组件的 view 层，我们期望组件是没有冗余的，组件与组件间 view 重叠的部分应当被抽离出来，形成颗粒度更细的组件，使组件组合产生更多的可能。</p>
<p>这种 view 细化的组合式思想早已在我们团队可视化库 <a href="http://recharts.org/" rel="nofollow noreferrer" target="_blank">Recharts</a> 中有所体现。Recharts 避免了复杂的图表配置，而将图表进行有效拆分，通过声明式的标签进行组合，从而使图表更具扩展性。</p>
<p>同样，我们在组件上也希望秉承这种思想，先来看一下在现有业务比较典型的三个公共组件:</p>
<p><span class="img-wrap"><img data-src="/img/bVBVCA" src="https://static.alili.tech/img/bVBVCA" alt="组件图" title="组件图" style="cursor: pointer; display: inline;"></span></p>
<p>这三个组件无论在 UI 还是逻辑上均存在一定共性。在配置式中，我们会将这三个组件通过一个组件的配置变换来实现，但无疑会提高单个组件内部逻辑的复杂性。</p>
<p>再做一次分离！它们可由 SelectInput、SearchInput 与 List 三个颗粒度更细的组件来组合。而对于颗粒度最细的组件，我们希望它是纯粹的，木偶式的组件。</p>
<p>例如 SelectInput 组件，组件状态完全依赖传入的 props，包括 selectedItem (显示用户所选项)、isActive (当前下拉状态)、onClickHeader (反馈下拉状态)以及placeholder (下拉框提示)。我们来看一下它的简要实现:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class SelectInput extends Component {
  static displayName = 'SelectInput';
  
  render() {
    const { selectedItem, isActive, onClickHeader, placeholder } = this.props;
    const { text } = selectedItem || {};
    return (
      <div onClick={onClickHeader}>
        <Input 
          type=&quot;text&quot;
          disabled
          value={text}
          placeholder={placeholder}
        />
        <Icon className={isActive} name=&quot;angle-down&quot; />
      </div>
    );
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">SelectInput</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">static</span> displayName = <span class="hljs-string">'SelectInput'</span>;
  
  render() {
    <span class="hljs-keyword">const</span> { selectedItem, isActive, onClickHeader, placeholder } = <span class="hljs-keyword">this</span>.props;
    <span class="hljs-keyword">const</span> { text } = selectedItem || {};
    <span class="hljs-keyword">return</span> (
      &lt;div onClick={onClickHeader}&gt;
        &lt;Input 
          type="text"
          disabled
          value={text}
          placeholder={placeholder}
        /&gt;
        &lt;Icon className={isActive} name="angle-down" /&gt;
      &lt;/div&gt;
    );
  }
}</code></pre>
<p>当组件被再次分离后，我们可以根据业务中的组件形态对其进行任意组合，形成统一层，摆脱在原有组件上扩展的模式，有效提高组件的灵活性。</p>
<h2 id="articleHeader1">逻辑再抽象</h2>
<p>那么有了 view 细化再重组的公共组件后，是不是就可以愉快地开发了?</p>
<p>是的，但组件层面的抽象不应该只停留在 view 层面，组件中的相同交互逻辑和业务逻辑也应该进行抽象。</p>
<p><a href="https://zhuanlan.zhihu.com/p/21379350" rel="nofollow noreferrer" target="_blank">ReactEurope 2016 小记 - 上</a> 中提到复用高阶函数的思想，编写 Higher-Order Components (高阶组件)来为基础组件增加新的功能。</p>
<p>Higher-Order Components = Decorators + Components。在我们的组件中，也正是贯穿着这样函数式的思想，来完成组件逻辑上的抽象，例如:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 完成SearchInput与List的交互
const SearchDecorator = Wrapper => {
  class WrapperComponent extends Component {
    handleSearch(keyword) {
      this.setState({
        data: this.props.data,
        keyword,
      });
      this.props.onSearch(keyword);
    }

    render() {
      const { data, keyword } = this.state;
      return (
        <Wrapper
          {...this.props}
          data={data}
          keyword={keyword}
          onSearch={this.handleSearch.bind(this)}
        />
      );
    }
  }
  
  return WrapperComponent;
};

// 完成List数据请求
const AsyncSelectDecorator = Wrapper => {
  class WrapperComponent extends Component {
    componentDidMount() {
      const { url } = this.props;
      
      fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({
          data,
        });
      });
    }

    render() {
      const { data } = this.state;
      return (
        <Wrapper
          {...this.props}
          data={data}
        />
      );
    }
  }

  return WrapperComponent;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 完成SearchInput与List的交互</span>
<span class="hljs-keyword">const</span> SearchDecorator = <span class="hljs-function"><span class="hljs-params">Wrapper</span> =&gt;</span> {
  <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">WrapperComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    handleSearch(keyword) {
      <span class="hljs-keyword">this</span>.setState({
        <span class="hljs-attr">data</span>: <span class="hljs-keyword">this</span>.props.data,
        keyword,
      });
      <span class="hljs-keyword">this</span>.props.onSearch(keyword);
    }

    render() {
      <span class="hljs-keyword">const</span> { data, keyword } = <span class="hljs-keyword">this</span>.state;
      <span class="hljs-keyword">return</span> (
        &lt;Wrapper
          {...this.props}
          data={data}
          keyword={keyword}
          onSearch={this.handleSearch.bind(this)}
        /&gt;
      );
    }
  }
  
  return WrapperComponent;
};

// 完成List数据请求
const AsyncSelectDecorator = Wrapper =&gt; {
  class WrapperComponent extends Component {
    componentDidMount() {
      const { url } = this.props;
      
      fetch(url)
      .then(response =&gt; response.json())
      .then(data =&gt; {
        this.setState({
          data,
        });
      });
    }

    render() {
      const { data } = this.state;
      return (
        &lt;Wrapper
          {...this.props}
          data={data}
        /&gt;
      );
    }
  }

  return WrapperComponent;
}
</code></pre>
<p>拥有 Decorator 之后，我们就能赋予组件能力了，例如合成 Search 组件:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@SearchDecorator
class Search extends Component {
  render() {
    return (
      <Selector
        {...this.props}
      >
        <SearchInput />
        <List />
      </Selector>
    );
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">@SearchDecorator
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Search</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Selector</span>
        {<span class="hljs-attr">...this.props</span>}
      &gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">SearchInput</span> /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">List</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">Selector</span>&gt;</span></span>
    );
  }
}</code></pre>
<p>那么当我们将逻辑抽象成为多个 Decorator 时，又该如何去组合呢？你是否还记得 <a href="https://zhuanlan.zhihu.com/p/20361937" rel="nofollow noreferrer" target="_blank">React Mixin 的前世今生</a> 中提到的方法？没错，就是compose！这里建议读者 review 这篇文章，顺便回顾一下Mixin与高阶组件的不同点。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// SelectedItemDecorator为List与SelectInput的交互，读者可以自行尝试实现
const FinalSelector = compose(AsyncSelectDecorator, SearchDecorator, SelectedItemDecorator)(Selector);

class SearchSelect extends Component {
  render() {
    return (
      <FinalSelector
        {...this.props}
      >
        <SelectInput />
        <SearchInput />
        <List />
      </FinalSelector>
    );
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// SelectedItemDecorator为List与SelectInput的交互，读者可以自行尝试实现</span>
<span class="hljs-keyword">const</span> FinalSelector = compose(AsyncSelectDecorator, SearchDecorator, SelectedItemDecorator)(Selector);

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">SearchSelect</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">FinalSelector</span>
        {<span class="hljs-attr">...this.props</span>}
      &gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">SelectInput</span> /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">SearchInput</span> /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">List</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">FinalSelector</span>&gt;</span></span>
    );
  }
}</code></pre>
<h2 id="articleHeader2">小结</h2>
<p><span class="img-wrap"><img data-src="/img/bVBVC5" src="https://static.alili.tech/img/bVBVC5" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>在配置式组件内部，组件与组件间以及组件与业务间是紧密关联的，而对于开发人员而言需要完成的仅仅是配置的工作。而组合式意图打破这种关联，寻求单元化，通过颗粒度更细的基础组件与抽象组件共有交互与业务逻辑的 Decorator，使组件更灵活，更易扩展，也使开发者能够完成对于基础组件的自由支配。</p>
<p>虽然组合式确实能解决配置式所存在的一些问题，但多层 Decorator 带来的多层包裹，会对组件理解和调试造成一定困难，也"不能"使用外部公有的方法。同时组合式所基于的函数式编程的思想能否被整个团队所接受，也是我们需要考量的问题。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于Decorator的组件扩展实践

## 原文链接
[https://segmentfault.com/a/1190000006617381](https://segmentfault.com/a/1190000006617381)

