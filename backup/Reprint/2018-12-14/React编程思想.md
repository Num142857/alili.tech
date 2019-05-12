---
title: 'React编程思想' 
date: 2018-12-14 2:30:11
hidden: true
slug: 2kk5uz2j8cs
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>本文是对React官网《Thinking in React》一文的翻译，通过这篇文章，React团队向开发者们介绍了应该如果去构思一个web应用，为今后使用React进行web app的构建，打下基础。 以下是正文。<p>在我们团队看来，React是使用JavaScript构建大型、快速的Web apps的首选方式。它已经在Facebook和Instagram项目中，表现出了非常好的可扩展性。</p>
</blockquote>
<p>能够按照构建的方式来思考web app的实现，是React众多优点之一。在这篇文章中，我们将引导你进行使用React构建可搜索产品数据表的思考过程。</p>
<h2 id="articleHeader0">从设计稿开始</h2>
<p>想象一下，我们已经有了一个JSON API和来自设计师的设计稿。如下图所示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013229992?w=228&amp;h=277" src="https://static.alili.tech/img/remote/1460000013229992?w=228&amp;h=277" alt="Mockup" title="Mockup" style="cursor: pointer; display: inline;"></span></p>
<p>JSON API返回的数据如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[
  {category: &quot;Sporting Goods&quot;, price: &quot;$49.99&quot;, stocked: true, name: &quot;Football&quot;},
  {category: &quot;Sporting Goods&quot;, price: &quot;$9.99&quot;, stocked: true, name: &quot;Baseball&quot;},
  {category: &quot;Sporting Goods&quot;, price: &quot;$29.99&quot;, stocked: false, name: &quot;Basketball&quot;},
  {category: &quot;Electronics&quot;, price: &quot;$99.99&quot;, stocked: true, name: &quot;iPod Touch&quot;},
  {category: &quot;Electronics&quot;, price: &quot;$399.99&quot;, stocked: false, name: &quot;iPhone 5&quot;},
  {category: &quot;Electronics&quot;, price: &quot;$199.99&quot;, stocked: true, name: &quot;Nexus 7&quot;}
];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">[
  {category: <span class="hljs-string">"Sporting Goods"</span>, price: <span class="hljs-string">"$49.99"</span>, stocked: <span class="hljs-literal">true</span>, name: <span class="hljs-string">"Football"</span>},
  {category: <span class="hljs-string">"Sporting Goods"</span>, price: <span class="hljs-string">"$9.99"</span>, stocked: <span class="hljs-literal">true</span>, name: <span class="hljs-string">"Baseball"</span>},
  {category: <span class="hljs-string">"Sporting Goods"</span>, price: <span class="hljs-string">"$29.99"</span>, stocked: <span class="hljs-literal">false</span>, name: <span class="hljs-string">"Basketball"</span>},
  {category: <span class="hljs-string">"Electronics"</span>, price: <span class="hljs-string">"$99.99"</span>, stocked: <span class="hljs-literal">true</span>, name: <span class="hljs-string">"iPod Touch"</span>},
  {category: <span class="hljs-string">"Electronics"</span>, price: <span class="hljs-string">"$399.99"</span>, stocked: <span class="hljs-literal">false</span>, name: <span class="hljs-string">"iPhone 5"</span>},
  {category: <span class="hljs-string">"Electronics"</span>, price: <span class="hljs-string">"$199.99"</span>, stocked: <span class="hljs-literal">true</span>, name: <span class="hljs-string">"Nexus 7"</span>}
];</code></pre>
<h2 id="articleHeader1">第一步：将UI分解为组件并分析层级结构</h2>
<p>我们要做的第一件事就是给设计稿中的每个组件（和子组件）画框，并给它们起名字。如果你正在和一个设计师合作，他可能已经帮你完成了这一步。他的Photoshop图层名称可能最终会成为你的React组件名称！</p>
<p>但我们怎么知道自己的组件应该是什么？只需要使用一些通用的技巧来决定是否应该创建一个新的函数或对象。其中一个技巧叫做：<strong>单一责任原则</strong>。就是说，在理想情况下，一个组件应该只用来完成一件事。若非如此，则应该考虑将其分解成更小的子组件。</p>
<p>我们经常会向用户展示JSON数据模型，那么你应该会发现，如果模型构建正确，那么你的UI（以及组件结构）应该能够很好地映射数据模型。这是因为UI和数据模型倾向于遵循相同的信息架构，这意味着将UI分解为组件的工作通常是微不足道的。现在我们把它分解成映射数据模型的组件如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013229993?w=275&amp;h=319" src="https://static.alili.tech/img/remote/1460000013229993?w=275&amp;h=319" alt="Component diagram" title="Component diagram" style="cursor: pointer; display: inline;"></span></p>
<p>现在我们的示例应用中有了五个组件，而且我们将每个组件代表的数据用斜体表示如下：</p>
<ol>
<li>
<strong>FilterableProductTable </strong>（橘黄色）：<em>包含整个示例的组件</em>
</li>
<li>
<strong>SearchBar </strong>（蓝色）：<em>接收所有的用户输入</em>
</li>
<li>
<strong>ProductTable </strong>（绿色）：<em>根据用户输入显示和过滤数据集</em>
</li>
<li>
<strong>ProductCategoryRow </strong>（绿宝石色）：<em>显示分类头</em>
</li>
<li>
<strong>ProductRow </strong>（红色）：<em>每行显示一条商品数据</em>
</li>
</ol>
<p>细心的你会发现，在<code>ProductTable</code>中，表头（包含<em>名称</em>和<em>价格</em>标签）不是一个组件。这是一个偏好的问题，有两个方面的论点。在这个例子中，我们将其作为<code>ProductTable</code>组件的一部分，因为它是<code>ProductTable</code>负责渲染的数据集的一部分。但是，如果这个头部变得很复杂（比如我们要支持排序），那么将其设置为<code>ProductTableHeader</code>这样的组件肯定会更好一些。</p>
<p>现在我们已经确定了设计稿中的组件，下一步我们要给这些组件安排层次结构。这其实很容易：出现在一个组件中的组件应该在层次结构中显示为一个子组件：</p>
<ul><li>
<p>FilterableProductTable</p>
<ul>
<li>SearchBar</li>
<li>
<p>ProductTable</p>
<ul>
<li>ProductCategoryRow</li>
<li>ProductRow</li>
</ul>
</li>
</ul>
</li></ul>
<h2 id="articleHeader2">第二步：用React构建一个静态版本</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class ProductCategoryRow extends React.Component {
  render() {
    const category = this.props.category;
    return (
      <tr>
        <th colSpan=&quot;2&quot;>
          {category}
        </th>
      </tr>
    );
  }
}

class ProductRow extends React.Component {
  render() {
    const product = this.props.product;
    const name = product.stocked ?
      product.name :
      <span style="{{"color: 'red'"}}">
        {product.name}
      </span>;

    return (
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    );
  }
}

class ProductTable extends React.Component {
  render() {
    const rows = [];
    let lastCategory = null;
    
    this.props.products.forEach((product) => {
      if (product.category !== lastCategory) {
        rows.push(
          <ProductCategoryRow
            category={product.category}
            key={product.category} />
        );
      }
      rows.push(
        <ProductRow
          product={product}
          key={product.name} />
      );
      lastCategory = product.category;
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SearchBar extends React.Component {
  render() {
    return (
      <form>
        <input type=&quot;text&quot; placeholder=&quot;Search...&quot; />
        <p>
          <input type=&quot;checkbox&quot; />
          {' '}
          Only show products in stock
        </p>
      </form>
    );
  }
}

class FilterableProductTable extends React.Component {
  render() {
    return (
      <div>
        <SearchBar />
        <ProductTable products={this.props.products} />
      </div>
    );
  }
}


const PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];
 
ReactDOM.render(
  <FilterableProductTable products={PRODUCTS} />,
  document.getElementById('container')
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code class="react"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ProductCategoryRow</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    const category = <span class="hljs-keyword">this</span>.props.category;
    <span class="hljs-keyword">return</span> (
      &lt;tr&gt;
        &lt;th colSpan=<span class="hljs-string">"2"</span>&gt;
          {category}
        &lt;/th&gt;
      &lt;/tr&gt;
    );
  }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ProductRow</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    const product = <span class="hljs-keyword">this</span>.props.product;
    const name = product.stocked ?
      product.name :
      &lt;span style="{{"color: <span class="hljs-symbol">'re</span>d'"}}"&gt;
        {product.name}
      &lt;/span&gt;;

    <span class="hljs-keyword">return</span> (
      &lt;tr&gt;
        &lt;td&gt;{name}&lt;/td&gt;
        &lt;td&gt;{product.price}&lt;/td&gt;
      &lt;/tr&gt;
    );
  }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ProductTable</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    const rows = [];
    let lastCategory = <span class="hljs-literal">null</span>;
    
    <span class="hljs-keyword">this</span>.props.products.forEach((product) =&gt; {
      <span class="hljs-keyword">if</span> (product.category !== lastCategory) {
        rows.push(
          &lt;<span class="hljs-type">ProductCategoryRow</span>
            category={product.category}
            key={product.category} /&gt;
        );
      }
      rows.push(
        &lt;<span class="hljs-type">ProductRow</span>
          product={product}
          key={product.name} /&gt;
      );
      lastCategory = product.category;
    });

    <span class="hljs-keyword">return</span> (
      &lt;table&gt;
        &lt;thead&gt;
          &lt;tr&gt;
            &lt;th&gt;<span class="hljs-type">Name</span>&lt;/th&gt;
            &lt;th&gt;<span class="hljs-type">Price</span>&lt;/th&gt;
          &lt;/tr&gt;
        &lt;/thead&gt;
        &lt;tbody&gt;{rows}&lt;/tbody&gt;
      &lt;/table&gt;
    );
  }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">SearchBar</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> (
      &lt;form&gt;
        &lt;input <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"text"</span> placeholder=<span class="hljs-string">"Search..."</span> /&gt;
        &lt;p&gt;
          &lt;input <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"checkbox"</span> /&gt;
          {' '}
          <span class="hljs-type">Only</span> show products in stock
        &lt;/p&gt;
      &lt;/form&gt;
    );
  }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">FilterableProductTable</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> (
      &lt;div&gt;
        &lt;<span class="hljs-type">SearchBar</span> /&gt;
        &lt;<span class="hljs-type">ProductTable</span> products={<span class="hljs-keyword">this</span>.props.products} /&gt;
      &lt;/div&gt;
    );
  }
}


const <span class="hljs-type">PRODUCTS</span> = [
  {category: <span class="hljs-symbol">'Sporting</span> <span class="hljs-type">Goods</span>', price: '$<span class="hljs-number">49.99</span>', stocked: <span class="hljs-literal">true</span>, name: <span class="hljs-symbol">'Footbal</span>l'},
  {category: <span class="hljs-symbol">'Sporting</span> <span class="hljs-type">Goods</span>', price: '$<span class="hljs-number">9.99</span>', stocked: <span class="hljs-literal">true</span>, name: <span class="hljs-symbol">'Basebal</span>l'},
  {category: <span class="hljs-symbol">'Sporting</span> <span class="hljs-type">Goods</span>', price: '$<span class="hljs-number">29.99</span>', stocked: <span class="hljs-literal">false</span>, name: <span class="hljs-symbol">'Basketbal</span>l'},
  {category: <span class="hljs-symbol">'Electronic</span>s', price: '$<span class="hljs-number">99.99</span>', stocked: <span class="hljs-literal">true</span>, name: <span class="hljs-symbol">'iPod</span> <span class="hljs-type">Touch</span>'},
  {category: <span class="hljs-symbol">'Electronic</span>s', price: '$<span class="hljs-number">399.99</span>', stocked: <span class="hljs-literal">false</span>, name: <span class="hljs-symbol">'iPhone</span> <span class="hljs-number">5</span>'},
  {category: <span class="hljs-symbol">'Electronic</span>s', price: '$<span class="hljs-number">199.99</span>', stocked: <span class="hljs-literal">true</span>, name: <span class="hljs-symbol">'Nexus</span> <span class="hljs-number">7</span>'}
];
 
<span class="hljs-type">ReactDOM</span>.render(
  &lt;<span class="hljs-type">FilterableProductTable</span> products={<span class="hljs-type">PRODUCTS</span>} /&gt;,
  document.getElementById(<span class="hljs-symbol">'containe</span>r')
);</code></pre>
<p>现在我们已经有了组件层次结构，接下来可以实现应用程序了。最初的方案是构建一个使用数据模型渲染UI但不具有交互性的版本。最好将静态版本和添加交互性进行解耦，因为构建一个静态的版本需要大量的输入却不需要思考，而增加交互性需要大量的思考而不需要很多输入。我们一会儿会知道为什么。</p>
<p>要构建渲染数据模型的静态版本，需要构建可复用其他组件并使用props传递数据的组件。props是一种将数据从父组件传递给子组件的方式。如果你熟悉state的概念，请不要使用state来构建这个静态版本。state只为实现交互性而保留，即随时间变化的数据。由于这是应用程序的静态版本，所以暂时不需要它。</p>
<p>你的构建过程可以自上而下或自下而上。也就是说，你可以从构建层次较高的组件（即FilterableProductTable）开始或较低的组件（ProductRow开始）。<strong>在简单的例子中，自上而下通常比较容易，而在大型项目中，自下而上更容易而且更易于编写测试用例</strong>。</p>
<p>在这一步的最后，你会有一个可重用组件的库来渲染你的数据模型。这些组件只会有<code>render（）</code>方法，因为这是你的应用程序的静态版本。层次结构顶部的组件（FilterableProductTable）将把你的数据模型作为一个prop。如果你对基础数据模型进行更改并再次调用<code>ReactDOM.render（）</code>，则UI将会更新。这就很容易看到用户界面是如何更新以及在哪里进行更改了，因为没有任何复杂的事情发生。 React的单向数据流（也称为单向绑定）使所有的事务更加模块化也更加快速。</p>
<h2 id="articleHeader3">第三步：确定UI状态的最小（但完整）表示形式</h2>
<p>为了使你的UI具有交互性，需要能够触发对基础数据模型的更改。 React使用state让这一切变得简单。要正确构建应用程序，首先需要考虑应用程序需要的最小可变状态集。这里的关键是：<strong>不要重复自己</strong>。找出应用程序需要的状态的绝对最小表示，并计算需要的其他所有内容。例如，如果你正在创建一个TODO列表，只需要保存一个TODO项目的数组;不要为计数保留一个单独的状态变量。相反，当你要渲染TODO数量时，只需取TODO项目数组的长度即可。</p>
<p>考虑我们示例应用程序中的所有数据。我们有：</p>
<ul>
<li>产品的原始列表</li>
<li>用户输入的搜索文本</li>
<li>复选框的值</li>
<li>过滤的产品列表</li>
</ul>
<p>我们来看看每一个是哪一个state。这里有关于每条数据的三个问题：</p>
<ol>
<li>是通过props从父组件传入的吗？如果是，那可能不是state。</li>
<li>它是否保持不变？如果是，那可能不是state。</li>
<li>你能基于组件中的任何其他state或props来计算它吗？如果是，那不是state。</li>
</ol>
<p>原来的产品清单是作为props传入的，所以这不是state。搜索文本和复选框似乎是state，因为它们随着时间而改变，不能从任何东西计算。最后，产品的过滤列表不是state，因为它可以通过将产品的原始列表与复选框的搜索文本和值组合来计算得到。</p>
<p>所以最后，我们的states是：</p>
<ul>
<li>用户输入的搜索文本</li>
<li>复选框的值</li>
</ul>
<h2 id="articleHeader4">第四步： 确定你的state需要放置在什么地方</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class ProductCategoryRow extends React.Component {
  render() {
    const category = this.props.category;
    return (
      <tr>
        <th colSpan=&quot;2&quot;>
          {category}
        </th>
      </tr>
    );
  }
}

class ProductRow extends React.Component {
  render() {
    const product = this.props.product;
    const name = product.stocked ?
      product.name :
      <span style="{{"color: 'red'"}}">
        {product.name}
      </span>;

    return (
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    );
  }
}

class ProductTable extends React.Component {
  render() {
    const filterText = this.props.filterText;
    const inStockOnly = this.props.inStockOnly;

    const rows = [];
    let lastCategory = null;

    this.props.products.forEach((product) => {
      if (product.name.indexOf(filterText) === -1) {
        return;
      }
      if (inStockOnly &amp;&amp; !product.stocked) {
        return;
      }
      if (product.category !== lastCategory) {
        rows.push(
          <ProductCategoryRow
            category={product.category}
            key={product.category} />
        );
      }
      rows.push(
        <ProductRow
          product={product}
          key={product.name}
        />
      );
      lastCategory = product.category;
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SearchBar extends React.Component {
  render() {
    const filterText = this.props.filterText;
    const inStockOnly = this.props.inStockOnly;

    return (
      <form>
        <input
          type=&quot;text&quot;
          placeholder=&quot;Search...&quot;
          value={filterText} />
        <p>
          <input
            type=&quot;checkbox&quot;
            checked={inStockOnly} />
          {' '}
          Only show products in stock
        </p>
      </form>
    );
  }
}

class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      inStockOnly: false
    };
  }

  render() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
        />
        <ProductTable
          products={this.props.products}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
        />
      </div>
    );
  }
}


const PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

ReactDOM.render(
  <FilterableProductTable products={PRODUCTS} />,
  document.getElementById('container')
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code class="react"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ProductCategoryRow</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    const category = <span class="hljs-keyword">this</span>.props.category;
    <span class="hljs-keyword">return</span> (
      &lt;tr&gt;
        &lt;th colSpan=<span class="hljs-string">"2"</span>&gt;
          {category}
        &lt;/th&gt;
      &lt;/tr&gt;
    );
  }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ProductRow</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    const product = <span class="hljs-keyword">this</span>.props.product;
    const name = product.stocked ?
      product.name :
      &lt;span style="{{"color: <span class="hljs-symbol">'re</span>d'"}}"&gt;
        {product.name}
      &lt;/span&gt;;

    <span class="hljs-keyword">return</span> (
      &lt;tr&gt;
        &lt;td&gt;{name}&lt;/td&gt;
        &lt;td&gt;{product.price}&lt;/td&gt;
      &lt;/tr&gt;
    );
  }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ProductTable</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    const filterText = <span class="hljs-keyword">this</span>.props.filterText;
    const inStockOnly = <span class="hljs-keyword">this</span>.props.inStockOnly;

    const rows = [];
    let lastCategory = <span class="hljs-literal">null</span>;

    <span class="hljs-keyword">this</span>.props.products.forEach((product) =&gt; {
      <span class="hljs-keyword">if</span> (product.name.indexOf(filterText) === <span class="hljs-number">-1</span>) {
        <span class="hljs-keyword">return</span>;
      }
      <span class="hljs-keyword">if</span> (inStockOnly &amp;&amp; !product.stocked) {
        <span class="hljs-keyword">return</span>;
      }
      <span class="hljs-keyword">if</span> (product.category !== lastCategory) {
        rows.push(
          &lt;<span class="hljs-type">ProductCategoryRow</span>
            category={product.category}
            key={product.category} /&gt;
        );
      }
      rows.push(
        &lt;<span class="hljs-type">ProductRow</span>
          product={product}
          key={product.name}
        /&gt;
      );
      lastCategory = product.category;
    });

    <span class="hljs-keyword">return</span> (
      &lt;table&gt;
        &lt;thead&gt;
          &lt;tr&gt;
            &lt;th&gt;<span class="hljs-type">Name</span>&lt;/th&gt;
            &lt;th&gt;<span class="hljs-type">Price</span>&lt;/th&gt;
          &lt;/tr&gt;
        &lt;/thead&gt;
        &lt;tbody&gt;{rows}&lt;/tbody&gt;
      &lt;/table&gt;
    );
  }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">SearchBar</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    const filterText = <span class="hljs-keyword">this</span>.props.filterText;
    const inStockOnly = <span class="hljs-keyword">this</span>.props.inStockOnly;

    <span class="hljs-keyword">return</span> (
      &lt;form&gt;
        &lt;input
          <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"text"</span>
          placeholder=<span class="hljs-string">"Search..."</span>
          value={filterText} /&gt;
        &lt;p&gt;
          &lt;input
            <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"checkbox"</span>
            checked={inStockOnly} /&gt;
          {' '}
          <span class="hljs-type">Only</span> show products in stock
        &lt;/p&gt;
      &lt;/form&gt;
    );
  }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">FilterableProductTable</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  constructor(props) {
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>.state = {
      filterText: '',
      inStockOnly: <span class="hljs-literal">false</span>
    };
  }

  render() {
    <span class="hljs-keyword">return</span> (
      &lt;div&gt;
        &lt;<span class="hljs-type">SearchBar</span>
          filterText={<span class="hljs-keyword">this</span>.state.filterText}
          inStockOnly={<span class="hljs-keyword">this</span>.state.inStockOnly}
        /&gt;
        &lt;<span class="hljs-type">ProductTable</span>
          products={<span class="hljs-keyword">this</span>.props.products}
          filterText={<span class="hljs-keyword">this</span>.state.filterText}
          inStockOnly={<span class="hljs-keyword">this</span>.state.inStockOnly}
        /&gt;
      &lt;/div&gt;
    );
  }
}


const <span class="hljs-type">PRODUCTS</span> = [
  {category: <span class="hljs-symbol">'Sporting</span> <span class="hljs-type">Goods</span>', price: '$<span class="hljs-number">49.99</span>', stocked: <span class="hljs-literal">true</span>, name: <span class="hljs-symbol">'Footbal</span>l'},
  {category: <span class="hljs-symbol">'Sporting</span> <span class="hljs-type">Goods</span>', price: '$<span class="hljs-number">9.99</span>', stocked: <span class="hljs-literal">true</span>, name: <span class="hljs-symbol">'Basebal</span>l'},
  {category: <span class="hljs-symbol">'Sporting</span> <span class="hljs-type">Goods</span>', price: '$<span class="hljs-number">29.99</span>', stocked: <span class="hljs-literal">false</span>, name: <span class="hljs-symbol">'Basketbal</span>l'},
  {category: <span class="hljs-symbol">'Electronic</span>s', price: '$<span class="hljs-number">99.99</span>', stocked: <span class="hljs-literal">true</span>, name: <span class="hljs-symbol">'iPod</span> <span class="hljs-type">Touch</span>'},
  {category: <span class="hljs-symbol">'Electronic</span>s', price: '$<span class="hljs-number">399.99</span>', stocked: <span class="hljs-literal">false</span>, name: <span class="hljs-symbol">'iPhone</span> <span class="hljs-number">5</span>'},
  {category: <span class="hljs-symbol">'Electronic</span>s', price: '$<span class="hljs-number">199.99</span>', stocked: <span class="hljs-literal">true</span>, name: <span class="hljs-symbol">'Nexus</span> <span class="hljs-number">7</span>'}
];

<span class="hljs-type">ReactDOM</span>.render(
  &lt;<span class="hljs-type">FilterableProductTable</span> products={<span class="hljs-type">PRODUCTS</span>} /&gt;,
  document.getElementById(<span class="hljs-symbol">'containe</span>r')
);</code></pre>
<p>现在我们已经确定了最小的一组应用程序state。接下来，我们需要确定哪个组件会改变或拥有这个state。</p>
<p>请记住：数据在React的组件层次结构中是单向流动的。它可能不清楚哪个组件应该拥有什么状态。<strong>这通常是新手理解的最具挑战性的部分</strong>，所以请按照以下步骤解决：</p>
<p>对于你的应用程序中的每一个state：</p>
<ul>
<li>确定基于该state渲染某些内容的每个组件。</li>
<li>找到一个共同的拥有者组件（一个在所有需要该state的层次结构组件之上的组件）。</li>
<li>无论是共同所有者，还是高层次的其他组成部分，都应该拥有这个state。</li>
<li>如果你无法找到一个有意义的组件，那么只好创建一个新的组件来保存state，并将其添加到公共所有者组件上方的层次结构中的某个位置。</li>
</ul>
<p>让我们来看看我们的应用程序的这个策略：</p>
<ul>
<li>
<code>ProductTable</code>需要根据状态过滤产品列表，而<code>SearchBar</code>需要显示搜索文本和检查状态。</li>
<li>通用所有者组件是<code>FilterableProductTable</code>。</li>
<li>从概念上讲，过滤器文本和选中的值存在于<code>FilterableProductTable</code>中是有意义的</li>
</ul>
<p>酷，所以我们已经决定，我们的state存活在<code>FilterableProductTable</code>中。首先，将一个实例属性<code>this.state = {filterText：''，inStockOnly：false}</code>添加到<code>FilterableProductTable</code>的构造函数中，以反映应用程序的初始状态。然后，将<code>filterText</code>和<code>inStockOnly</code>作为prop传递给<code>ProductTable</code>和<code>SearchBar</code>。最后，使用这些props来筛选<code>ProductTable</code>中的行，并在<code>SearchBar</code>中设置表单域的值。</p>
<p>你可以看到你的应用程序的行为了：设置<code>filterText</code>为“ball”，并刷新你的应用程序。你将看到数据表已正确更新。</p>
<h2 id="articleHeader5">第五步：添加反向数据流</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class ProductCategoryRow extends React.Component {
  render() {
    const category = this.props.category;
    return (
      <tr>
        <th colSpan=&quot;2&quot;>
          {category}
        </th>
      </tr>
    );
  }
}

class ProductRow extends React.Component {
  render() {
    const product = this.props.product;
    const name = product.stocked ?
      product.name :
      <span style="{{"color: 'red'"}}">
        {product.name}
      </span>;

    return (
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    );
  }
}

class ProductTable extends React.Component {
  render() {
    const filterText = this.props.filterText;
    const inStockOnly = this.props.inStockOnly;

    const rows = [];
    let lastCategory = null;

    this.props.products.forEach((product) => {
      if (product.name.indexOf(filterText) === -1) {
        return;
      }
      if (inStockOnly &amp;&amp; !product.stocked) {
        return;
      }
      if (product.category !== lastCategory) {
        rows.push(
          <ProductCategoryRow
            category={product.category}
            key={product.category} />
        );
      }
      rows.push(
        <ProductRow
          product={product}
          key={product.name}
        />
      );
      lastCategory = product.category;
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
  }
  
  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }
  
  handleInStockChange(e) {
    this.props.onInStockChange(e.target.checked);
  }
  
  render() {
    return (
      <form>
        <input
          type=&quot;text&quot;
          placeholder=&quot;Search...&quot;
          value={this.props.filterText}
          onChange={this.handleFilterTextChange}
        />
        <p>
          <input
            type=&quot;checkbox&quot;
            checked={this.props.inStockOnly}
            onChange={this.handleInStockChange}
          />
          {' '}
          Only show products in stock
        </p>
      </form>
    );
  }
}

class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      inStockOnly: false
    };
    
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }
  
  handleInStockChange(inStockOnly) {
    this.setState({
      inStockOnly: inStockOnly
    })
  }

  render() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onFilterTextChange={this.handleFilterTextChange}
          onInStockChange={this.handleInStockChange}
        />
        <ProductTable
          products={this.props.products}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
        />
      </div>
    );
  }
}


const PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

ReactDOM.render(
  <FilterableProductTable products={PRODUCTS} />,
  document.getElementById('container')
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code class="react"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ProductCategoryRow</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    const category = <span class="hljs-keyword">this</span>.props.category;
    <span class="hljs-keyword">return</span> (
      &lt;tr&gt;
        &lt;th colSpan=<span class="hljs-string">"2"</span>&gt;
          {category}
        &lt;/th&gt;
      &lt;/tr&gt;
    );
  }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ProductRow</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    const product = <span class="hljs-keyword">this</span>.props.product;
    const name = product.stocked ?
      product.name :
      &lt;span style="{{"color: <span class="hljs-symbol">'re</span>d'"}}"&gt;
        {product.name}
      &lt;/span&gt;;

    <span class="hljs-keyword">return</span> (
      &lt;tr&gt;
        &lt;td&gt;{name}&lt;/td&gt;
        &lt;td&gt;{product.price}&lt;/td&gt;
      &lt;/tr&gt;
    );
  }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ProductTable</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    const filterText = <span class="hljs-keyword">this</span>.props.filterText;
    const inStockOnly = <span class="hljs-keyword">this</span>.props.inStockOnly;

    const rows = [];
    let lastCategory = <span class="hljs-literal">null</span>;

    <span class="hljs-keyword">this</span>.props.products.forEach((product) =&gt; {
      <span class="hljs-keyword">if</span> (product.name.indexOf(filterText) === <span class="hljs-number">-1</span>) {
        <span class="hljs-keyword">return</span>;
      }
      <span class="hljs-keyword">if</span> (inStockOnly &amp;&amp; !product.stocked) {
        <span class="hljs-keyword">return</span>;
      }
      <span class="hljs-keyword">if</span> (product.category !== lastCategory) {
        rows.push(
          &lt;<span class="hljs-type">ProductCategoryRow</span>
            category={product.category}
            key={product.category} /&gt;
        );
      }
      rows.push(
        &lt;<span class="hljs-type">ProductRow</span>
          product={product}
          key={product.name}
        /&gt;
      );
      lastCategory = product.category;
    });

    <span class="hljs-keyword">return</span> (
      &lt;table&gt;
        &lt;thead&gt;
          &lt;tr&gt;
            &lt;th&gt;<span class="hljs-type">Name</span>&lt;/th&gt;
            &lt;th&gt;<span class="hljs-type">Price</span>&lt;/th&gt;
          &lt;/tr&gt;
        &lt;/thead&gt;
        &lt;tbody&gt;{rows}&lt;/tbody&gt;
      &lt;/table&gt;
    );
  }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">SearchBar</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  constructor(props) {
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>.handleFilterTextChange = <span class="hljs-keyword">this</span>.handleFilterTextChange.bind(<span class="hljs-keyword">this</span>);
    <span class="hljs-keyword">this</span>.handleInStockChange = <span class="hljs-keyword">this</span>.handleInStockChange.bind(<span class="hljs-keyword">this</span>);
  }
  
  handleFilterTextChange(e) {
    <span class="hljs-keyword">this</span>.props.onFilterTextChange(e.target.value);
  }
  
  handleInStockChange(e) {
    <span class="hljs-keyword">this</span>.props.onInStockChange(e.target.checked);
  }
  
  render() {
    <span class="hljs-keyword">return</span> (
      &lt;form&gt;
        &lt;input
          <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"text"</span>
          placeholder=<span class="hljs-string">"Search..."</span>
          value={<span class="hljs-keyword">this</span>.props.filterText}
          onChange={<span class="hljs-keyword">this</span>.handleFilterTextChange}
        /&gt;
        &lt;p&gt;
          &lt;input
            <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"checkbox"</span>
            checked={<span class="hljs-keyword">this</span>.props.inStockOnly}
            onChange={<span class="hljs-keyword">this</span>.handleInStockChange}
          /&gt;
          {' '}
          <span class="hljs-type">Only</span> show products in stock
        &lt;/p&gt;
      &lt;/form&gt;
    );
  }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">FilterableProductTable</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  constructor(props) {
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>.state = {
      filterText: '',
      inStockOnly: <span class="hljs-literal">false</span>
    };
    
    <span class="hljs-keyword">this</span>.handleFilterTextChange = <span class="hljs-keyword">this</span>.handleFilterTextChange.bind(<span class="hljs-keyword">this</span>);
    <span class="hljs-keyword">this</span>.handleInStockChange = <span class="hljs-keyword">this</span>.handleInStockChange.bind(<span class="hljs-keyword">this</span>);
  }

  handleFilterTextChange(filterText) {
    <span class="hljs-keyword">this</span>.setState({
      filterText: filterText
    });
  }
  
  handleInStockChange(inStockOnly) {
    <span class="hljs-keyword">this</span>.setState({
      inStockOnly: inStockOnly
    })
  }

  render() {
    <span class="hljs-keyword">return</span> (
      &lt;div&gt;
        &lt;<span class="hljs-type">SearchBar</span>
          filterText={<span class="hljs-keyword">this</span>.state.filterText}
          inStockOnly={<span class="hljs-keyword">this</span>.state.inStockOnly}
          onFilterTextChange={<span class="hljs-keyword">this</span>.handleFilterTextChange}
          onInStockChange={<span class="hljs-keyword">this</span>.handleInStockChange}
        /&gt;
        &lt;<span class="hljs-type">ProductTable</span>
          products={<span class="hljs-keyword">this</span>.props.products}
          filterText={<span class="hljs-keyword">this</span>.state.filterText}
          inStockOnly={<span class="hljs-keyword">this</span>.state.inStockOnly}
        /&gt;
      &lt;/div&gt;
    );
  }
}


const <span class="hljs-type">PRODUCTS</span> = [
  {category: <span class="hljs-symbol">'Sporting</span> <span class="hljs-type">Goods</span>', price: '$<span class="hljs-number">49.99</span>', stocked: <span class="hljs-literal">true</span>, name: <span class="hljs-symbol">'Footbal</span>l'},
  {category: <span class="hljs-symbol">'Sporting</span> <span class="hljs-type">Goods</span>', price: '$<span class="hljs-number">9.99</span>', stocked: <span class="hljs-literal">true</span>, name: <span class="hljs-symbol">'Basebal</span>l'},
  {category: <span class="hljs-symbol">'Sporting</span> <span class="hljs-type">Goods</span>', price: '$<span class="hljs-number">29.99</span>', stocked: <span class="hljs-literal">false</span>, name: <span class="hljs-symbol">'Basketbal</span>l'},
  {category: <span class="hljs-symbol">'Electronic</span>s', price: '$<span class="hljs-number">99.99</span>', stocked: <span class="hljs-literal">true</span>, name: <span class="hljs-symbol">'iPod</span> <span class="hljs-type">Touch</span>'},
  {category: <span class="hljs-symbol">'Electronic</span>s', price: '$<span class="hljs-number">399.99</span>', stocked: <span class="hljs-literal">false</span>, name: <span class="hljs-symbol">'iPhone</span> <span class="hljs-number">5</span>'},
  {category: <span class="hljs-symbol">'Electronic</span>s', price: '$<span class="hljs-number">199.99</span>', stocked: <span class="hljs-literal">true</span>, name: <span class="hljs-symbol">'Nexus</span> <span class="hljs-number">7</span>'}
];

<span class="hljs-type">ReactDOM</span>.render(
  &lt;<span class="hljs-type">FilterableProductTable</span> products={<span class="hljs-type">PRODUCTS</span>} /&gt;,
  document.getElementById(<span class="hljs-symbol">'containe</span>r')
);</code></pre>
<p>到目前为止，我们已经构建了一个应用程序，可以根据props和state正确地呈现在层次结构中。现在是时候以另一种方式支持数据流：深层次的表单组件需要更新<code>FilterableProductTable</code>中的状态。</p>
<p>React使这个数据流清晰易懂，以便理解你的程序是如何工作的，但是它需要比传统的双向数据绑定更多的输入。</p>
<p>如果你尝试在当前版本的示例中键入或选中该框，则会看到React忽略了你的输入。这是故意的，因为我们已经将输入的值prop设置为始终等于从<code>FilterableProductTable</code>传入的state。</p>
<p>让我们想想我们想要发生的事情。我们希望确保每当用户更改表单时，我们都会更新状态以反映用户的输入。由于组件应该只更新自己的state，只要state需要更新时，<code>FilterableProductTable</code>就会传递回调到<code>SearchBar</code>。我们可以使用输入上的<code>onChange</code>事件来通知它。 <code>FilterableProductTable</code>传递的回调将调用<code>setState（）</code>，并且应用程序将被更新。</p>
<p>虽然这听起来很复杂，但实际上只是几行代码。你的数据如何在整个应用程序中流动变得非常明确。</p>
<h2 id="articleHeader6">就是这样</h2>
<p>希望这篇文章可以让你了解如何用React来构建组件和应用程序。虽然它可能比以前多一些代码，但请记住，代码的读远远超过它的写，并且读取这个模块化的显式代码非常容易。当你开始构建大型组件库时，你将会体会到这种明确性和模块性，并且通过代码重用，你的代码行将开始缩小。</p>
<h3 id="articleHeader7">备注</h3>
<p>文中所有示例的HTML和CSS内容如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;container&quot;>
    <!-- This element's contents will be replaced with your component. -->
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"container"</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- This element's contents will be replaced with your component. --&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
  padding: 5px
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">5px</span>
}</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React编程思想

## 原文链接
[https://segmentfault.com/a/1190000013222687](https://segmentfault.com/a/1190000013222687)

