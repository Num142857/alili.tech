---
title: '翻译--Thinking in React' 
date: 2018-12-11 2:30:10
hidden: true
slug: irjek8iiwv
categories: [reprint]
---

{{< raw >}}

                    
<p>无聊翻译篇react入门文章，去年学习react时看了一遍，很不错的一篇文章。</p>
<p><a href="https://reactjs.org/docs/thinking-in-react.html" rel="nofollow noreferrer" target="_blank">https://reactjs.org/docs/thin...</a></p>
<p>部分为意译，旨在让newcomers 容易理解。</p>
<h3 id="articleHeader0">（）内均为译者注</h3>
<p><code>React</code>会是我快速构建大型<code>webapp</code>的首要<code>js框架</code>选择。<br>其在<code>Facebook</code>跟<code>Instagram</code>上的实践给予了我们充足的自信。</p>
<p>React众多闪光点中的一个就是让你开始思考如何设计、构建应用。（主要就是react是数据驱动设计，所以如何设计state成了很重要的一部分）</p>
<p>本文，将以一个商品下拉列表加搜索框的例子来展示<code>react</code>。</p>
<hr>
<p><code>Start With A Mock</code><br>本例子大概长这样，数据源来自构建的一个mock，以json api方式进行访问。<br><span class="img-wrap"><img data-src="/img/remote/1460000013612374?w=228&amp;h=277" src="https://static.alili.tech/img/remote/1460000013612374?w=228&amp;h=277" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>mock的json数据：</p>
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
<h2 id="articleHeader1">第一步：拆分组件，分析组件结构</h2>
<p>译者注：组件结构拆分没有一个标准，例子里是拆的很细，实际工作中一般是统一规范较重要，可读性至上。</p>
<p>首先拆分成多个组件跟子组件，并且命名。这里已经用虚线框标识了。工作中，如何有设计或者产品辅助你的话，这个工作可能不需要你来做，交给他们即可。他们会用ps以图层的方式拆分好组件。（大厂吗？！）</p>
<p>这里的组件是已经拆分好了，但是如果自己拆分，该如何做呢？答案是用一定的标准进行规范。比如你可以选择的一个标准就是：单一职责原则。即一个组件只负责一件事情。（这个事情范围就广了，比如一个动作，一个请求。原则就是方便管理与维护）如果还能细分，就再拆成更小层次的组件。（<code>react</code>就是一层层组件嵌套，各种组件与子组件）</p>
<p>我们一般经常用<code>json data model </code>返回给用户，在<code>react</code>中，只要<code>data model</code>格式正确，界面ui（组件）就渲染得很舒服了，一般相差不到哪儿去。这是因为<code>ui</code>跟<code>data model</code> 倾向于遵循相同的架构。跟这些带来的好处相比，拆分组件的基础工作就显得微不足道了。把界面打散拆分成多个组件，每个组件代表<code>data model</code>的某一部分。（这一大段啥意思呢？就是夸了一下react数据驱动的好处）</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013612375?w=275&amp;h=319" src="https://static.alili.tech/img/remote/1460000013612375?w=275&amp;h=319" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>看上图，我们把ui拆成了5个组件，下面是各个组件对应的职责，斜体突出表示下。<br>1.FilterableProductTable（orange）：contains the entirety of the example<br>（包裹所有子组件的外壳）<br>2.SearchBar（blue）：处理用户交互<br>3.ProductTable（green）：用户交互后过滤出的商品列表数据展示<br>4.ProductCategoryRow（turquiso 亮青色）：显示商品列表分类名称<br>5.ProductRow（red）：展示每个商品信息</p>
<p>这边注意观察下组件<code>ProductTable</code>下有两个<code>label</code>作为<code>header--“Name”</code>，<code>“Price”</code>。这两个label没有作为单独的组件如<code>ProductCategoryRow</code>跟<code>ProductRow</code>存在，这里仅仅是作为<code>ProductTable</code>的一部分存在。当然你可以将其作为单独一个子组件开辟出来，只是在这个例子里没必要，如果这个<code>header</code>再复杂一点，比如加上点击排序功能，那么可以再建一个子组件--<code>ProductTableHeader</code>。</p>
<p>现在ui已经拆分完成，来分一下组件层次。<br>（其实就是个树状图，很多情况下，你的json data model 长啥样，组件层次基本上就差不离了）</p>
<p>·FilterableProductTable</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" ·SearchBar
 ·ProductTable
         ·ProductCategoryRow
         ·ProductRow
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code> ·SearchBar
 ·ProductTable
         ·ProductCategoryRow
         ·ProductRow
</code></pre>
<p>（小问题，上面提到的<code>ProductTableHeader</code>如果存在，应该放在树状图的哪个位置呢？）</p>
<h2 id="articleHeader2">第二步：构建静态页面</h2>
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
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ProductCategoryRow</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">const</span> category = <span class="hljs-keyword">this</span>.props.category;
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">th</span> <span class="hljs-attr">colSpan</span>=<span class="hljs-string">"2"</span>&gt;</span>
          {category}
        <span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span></span>
    );
  }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ProductRow</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">const</span> product = <span class="hljs-keyword">this</span>.props.product;
    <span class="hljs-keyword">const</span> name = product.stocked ?
      product.name :
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"{{"color:</span> '<span class="hljs-attr">red</span>'"}}"&gt;</span>
        {product.name}
      <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span>;

    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>{name}<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>{product.price}<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span></span>
    );
  }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ProductTable</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">const</span> rows = [];
    <span class="hljs-keyword">let</span> lastCategory = <span class="hljs-literal">null</span>;
    
    <span class="hljs-keyword">this</span>.props.products.forEach(<span class="hljs-function">(<span class="hljs-params">product</span>) =&gt;</span> {
      <span class="hljs-keyword">if</span> (product.category !== lastCategory) {
        rows.push(
          &lt;ProductCategoryRow
            category={product.category}
            key={product.category} /&gt;
        );
      }
      rows.push(
        &lt;ProductRow
          product={product}
          key={product.name} /&gt;
      );
      lastCategory = product.category;
    });

    return (
      &lt;table&gt;
        &lt;thead&gt;
          &lt;tr&gt;
            &lt;th&gt;Name&lt;/th&gt;
            &lt;th&gt;Price&lt;/th&gt;
          &lt;/tr&gt;
        &lt;/thead&gt;
        &lt;tbody&gt;{rows}&lt;/tbody&gt;
      &lt;/table&gt;
    );
  }
}

class SearchBar extends React.Component {
  render() {
    return (
      &lt;form&gt;
        &lt;input type="text" placeholder="Search..." /&gt;
        &lt;p&gt;
          &lt;input type="checkbox" /&gt;
          {' '}
          Only show products in stock
        &lt;/p&gt;
      &lt;/form&gt;
    );
  }
}

class FilterableProductTable extends React.Component {
  render() {
    return (
      &lt;div&gt;
        &lt;SearchBar /&gt;
        &lt;ProductTable products={this.props.products} /&gt;
      &lt;/div&gt;
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
  &lt;FilterableProductTable products={PRODUCTS} /&gt;,
  document.getElementById('container')
);</code></pre>
<p>现在组件拆分好了，<code>json data model</code>有了，开始实现界面代码吧。先做一个最简单的版本，只有界面，没有交互。交互留到后面做，这样分开做的好处是先做静态界面只用堆代码而不需要考虑逻辑交互，交互逻辑到后面做。（事情一件件做，也正符合组件拆分的标准之一，<code>single responsibility principle</code>，单一职责）</p>
<p>实现静态版本从构建组件开始，实现构建复用的基础之一就是通过使用props。何谓props？props就是将数据从树状图由上到下传递的快递员。（或者说从parent到child，这个parent或child是相对的，针对不同的两个组件，随时变化的，所以用树状图来理解舒服点）如果你有一定的react基础，熟悉state的话，（state也能传递数据）在这里先不要考虑用state，只有在交互的时候，随时间变化的数据需要用到state。</p>
<p>你可以从上到下或者由下至上构建组件，意思就是你可以先构建最上面的<code>FilterableProductTable</code>或者最下面的<code>ProductRow</code>。在简单的项目中，一般从上到下构建组件更简单。大点稍微复杂点的项目中可以由下至上构建组件，这样也方便编写测试实例。（简单例子怎样都行，复杂的项目，都是一个个组件嵌套的，缺什么补什么，一般不存在思考这个，除非整个项目是由你来从零架构的）</p>
<p>现在我们已经构建了一组可用于渲染<code>data mod</code>的复用组件构成的组件库。每个组件内只有一个方法：<code>render（）</code>，因为现在还只是静态页面。树状图最上端的组件<code>FilterableProductTable</code>会把<code>data model </code>打包成一个<code>props</code>。如果你对<code>data model</code>进行更改并再次调用<code>ReactDom.render（）</code>，ui界面就会更新。代码很简单，很容易观察ui如何更新以及在哪里进行更改。React另一个特性：单向数据流（也叫单项绑定 <code>one way binding</code>）使代码模块化且运行快速。</p>
<h3 id="articleHeader3">小注：Props vs State</h3>
<p>react中有两类存储data model的对象，props跟state。了解两者的区别还是很重要的。<br>详细：【?】<a href="https://reactjs.org/docs/interactivity-and-dynamic-uis.html" rel="nofollow noreferrer" target="_blank">https://reactjs.org/docs/inte...</a></p>
<h2 id="articleHeader4">第三步：定义完整而简洁的<code>state</code>
</h2>
<p>交互就是ui界面能对data model 的变化作出相应。React通过state使其实现变得简单。</p>
<p>继续构建app前，需要确定好完整且简洁的state。遵循的规则就是：<code>DRY（don't repeat yourself）</code>。举个例子，在做<code>TODO List</code>例子时，我们一般会用到<code>List Count</code>这个属性，但没必要将<code>Count</code>作为<code>state</code>的一个字段存在，因为通过计算List的length也能获取到Count。（只保留必要的属性字段在state中）</p>
<p>针对我们的应用，现有的数据如下：<br>a·原始商品列表数据<br>b·用户输入搜索文本<br>c·复选框选中与否<br>d·过滤后的商品列表数据</p>
<p>那么如何确定以上哪些是应该作为state的部分而存在的呢？可以简单的问问自己下面这三个问题：</p>
<p>1.该数据是通过props传递的吗？如果是，那就应该不属于state<br>2·该数据不是实时变化（即不随交互而变化）的，那就应该不属于state<br>3·可以通过其他state跟props计算而出（如上面说的List Count），那就应该不属于state</p>
<p>然后带着这三个问题，我们来看看上面四个数据。静态页面版本中已经看出，a是通过props传递的，所以a不属于state，b跟c是根据用户输入来确定的，随交互而变化，所以bc应该属于state的一部分，d可以通过abc结合计算而得，所以虽然会变化但也不属于state。</p>
<p>总结，state：<br>·用户输入文本<br>·复选框选中与否</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="state = ｛
      filterText：''，
      isStockOnly：false
｝" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">state = ｛
      filterText：<span class="hljs-string">''</span>，
      isStockOnly：<span class="hljs-literal">false</span>
｝</code></pre>
<h2 id="articleHeader5">第四步：构建state</h2>
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
);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ProductCategoryRow</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">const</span> category = <span class="hljs-keyword">this</span>.props.category;
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">th</span> <span class="hljs-attr">colSpan</span>=<span class="hljs-string">"2"</span>&gt;</span>
          {category}
        <span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span></span>
    );
  }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ProductRow</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">const</span> product = <span class="hljs-keyword">this</span>.props.product;
    <span class="hljs-keyword">const</span> name = product.stocked ?
      product.name :
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"{{"color:</span> '<span class="hljs-attr">red</span>'"}}"&gt;</span>
        {product.name}
      <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span>;

    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>{name}<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>{product.price}<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span></span>
    );
  }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ProductTable</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">const</span> filterText = <span class="hljs-keyword">this</span>.props.filterText;
    <span class="hljs-keyword">const</span> inStockOnly = <span class="hljs-keyword">this</span>.props.inStockOnly;

    <span class="hljs-keyword">const</span> rows = [];
    <span class="hljs-keyword">let</span> lastCategory = <span class="hljs-literal">null</span>;

    <span class="hljs-keyword">this</span>.props.products.forEach(<span class="hljs-function">(<span class="hljs-params">product</span>) =&gt;</span> {
      <span class="hljs-keyword">if</span> (product.name.indexOf(filterText) === <span class="hljs-number">-1</span>) {
        <span class="hljs-keyword">return</span>;
      }
      <span class="hljs-keyword">if</span> (inStockOnly &amp;&amp; !product.stocked) {
        <span class="hljs-keyword">return</span>;
      }
      <span class="hljs-keyword">if</span> (product.category !== lastCategory) {
        rows.push(
          &lt;ProductCategoryRow
            category={product.category}
            key={product.category} /&gt;
        );
      }
      rows.push(
        &lt;ProductRow
          product={product}
          key={product.name}
        /&gt;
      );
      lastCategory = product.category;
    });

    return (
      &lt;table&gt;
        &lt;thead&gt;
          &lt;tr&gt;
            &lt;th&gt;Name&lt;/th&gt;
            &lt;th&gt;Price&lt;/th&gt;
          &lt;/tr&gt;
        &lt;/thead&gt;
        &lt;tbody&gt;{rows}&lt;/tbody&gt;
      &lt;/table&gt;
    );
  }
}

class SearchBar extends React.Component {
  render() {
    const filterText = this.props.filterText;
    const inStockOnly = this.props.inStockOnly;

    return (
      &lt;form&gt;
        &lt;input
          type="text"
          placeholder="Search..."
          value={filterText} /&gt;
        &lt;p&gt;
          &lt;input
            type="checkbox"
            checked={inStockOnly} /&gt;
          {' '}
          Only show products in stock
        &lt;/p&gt;
      &lt;/form&gt;
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
      &lt;div&gt;
        &lt;SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
        /&gt;
        &lt;ProductTable
          products={this.props.products}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
        /&gt;
      &lt;/div&gt;
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
  &lt;FilterableProductTable products={PRODUCTS} /&gt;,
  document.getElementById('container')
);
</code></pre>
<p>现在state已经确定好了，开始要与组件交互关联了，知道state的那部分应该放在哪个组件中。</p>
<p>再提醒一句：React是单向数据流导向的，从树状图的上端往下。</p>
<p>哪个组件应该有怎样的state对于react新手来讲可能是很困惑的一点，下面几点可能对你会有帮助：</p>
<p>·确定哪些组件在渲染过程中要用到state<br>·可能多个组件同时需要用到state的一部分，那边找到一个它们共同的parent component，把state放在这个组件里<br>·如果已有的组件中找不到这样的parent component，那就创建一个。<br>（意译）</p>
<p>依照以上标准分析下我们的应用：<br>·ProductTable 显示过滤后的商品数据，这需要通过state跟原始数据（在props中），SearchBar需要显示过滤文本跟复选框勾选情况。<br>·上面两者的common parent component就可以是FilterableProductTable。<br>·所以讲state中的filterText跟checkvalue放在FilterableProductTable，没毛病。</p>
<p>我们state中也就这两，所以放在哪个组件也确定了，开始码代码了。<br>首先，在FilterableProductTable中的构造函数里初始化state对象，然后将state里的内容作为props传递到对应的child component中去（交互=》触发预先定义的事件=》state变化=》作为state内容载体的props传递到对应组件=》具体组件render=》用户看到交互结果）</p>
<h2 id="articleHeader6">第五步：实现交互事件（add inverse data flow ，难以描述）</h2>
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
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ProductCategoryRow</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">const</span> category = <span class="hljs-keyword">this</span>.props.category;
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">th</span> <span class="hljs-attr">colSpan</span>=<span class="hljs-string">"2"</span>&gt;</span>
          {category}
        <span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span></span>
    );
  }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ProductRow</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">const</span> product = <span class="hljs-keyword">this</span>.props.product;
    <span class="hljs-keyword">const</span> name = product.stocked ?
      product.name :
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"{{"color:</span> '<span class="hljs-attr">red</span>'"}}"&gt;</span>
        {product.name}
      <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span>;

    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>{name}<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>{product.price}<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span></span>
    );
  }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ProductTable</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">const</span> filterText = <span class="hljs-keyword">this</span>.props.filterText;
    <span class="hljs-keyword">const</span> inStockOnly = <span class="hljs-keyword">this</span>.props.inStockOnly;

    <span class="hljs-keyword">const</span> rows = [];
    <span class="hljs-keyword">let</span> lastCategory = <span class="hljs-literal">null</span>;

    <span class="hljs-keyword">this</span>.props.products.forEach(<span class="hljs-function">(<span class="hljs-params">product</span>) =&gt;</span> {
      <span class="hljs-keyword">if</span> (product.name.indexOf(filterText) === <span class="hljs-number">-1</span>) {
        <span class="hljs-keyword">return</span>;
      }
      <span class="hljs-keyword">if</span> (inStockOnly &amp;&amp; !product.stocked) {
        <span class="hljs-keyword">return</span>;
      }
      <span class="hljs-keyword">if</span> (product.category !== lastCategory) {
        rows.push(
          &lt;ProductCategoryRow
            category={product.category}
            key={product.category} /&gt;
        );
      }
      rows.push(
        &lt;ProductRow
          product={product}
          key={product.name}
        /&gt;
      );
      lastCategory = product.category;
    });

    return (
      &lt;table&gt;
        &lt;thead&gt;
          &lt;tr&gt;
            &lt;th&gt;Name&lt;/th&gt;
            &lt;th&gt;Price&lt;/th&gt;
          &lt;/tr&gt;
        &lt;/thead&gt;
        &lt;tbody&gt;{rows}&lt;/tbody&gt;
      &lt;/table&gt;
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
      &lt;form&gt;
        &lt;input
          type="text"
          placeholder="Search..."
          value={this.props.filterText}
          onChange={this.handleFilterTextChange}
        /&gt;
        &lt;p&gt;
          &lt;input
            type="checkbox"
            checked={this.props.inStockOnly}
            onChange={this.handleInStockChange}
          /&gt;
          {' '}
          Only show products in stock
        &lt;/p&gt;
      &lt;/form&gt;
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
      &lt;div&gt;
        &lt;SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onFilterTextChange={this.handleFilterTextChange}
          onInStockChange={this.handleInStockChange}
        /&gt;
        &lt;ProductTable
          products={this.props.products}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
        /&gt;
      &lt;/div&gt;
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
  &lt;FilterableProductTable products={PRODUCTS} /&gt;,
  document.getElementById('container')
);</code></pre>
<p>目前为止，通过state，props已经构建好了我们的页面，现在实现交互事件。</p>
<p>React使用的单向数据流跟单向数据绑定使react的工作易于理解，虽然这相比双向绑定的确需要写多点代码。（使黑魔法不再神秘，react不需要黑魔法）</p>
<p>下面这段过程总结，我觉得还是我上面注解的那段拿过来：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    交互=》触发预先定义的事件=》state变化=》作为state内容载体的props传递到对应组件=》具体组件render=》用户看到交互结果
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>    交互=》触发预先定义的事件=》<span class="hljs-keyword">state</span>变化=》作为<span class="hljs-keyword">state</span>内容载体的props传递到对应组件=》具体组件render=》用户看到交互结果
</code></pre>
<p>（数据绑定体现在，state一旦发生变化，跟state关联的数据都将重现计算，而通过数据驱动的页面也将重新渲染。）</p>
<p>that's all</p>
<p>欢迎讨论~<br>感谢阅读~</p>
<p>个人公众号：<br><span class="img-wrap"><img data-src="/img/remote/1460000013612376?w=258&amp;h=258" src="https://static.alili.tech/img/remote/1460000013612376?w=258&amp;h=258" alt="" title="" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
翻译--Thinking in React

## 原文链接
[https://segmentfault.com/a/1190000013612369](https://segmentfault.com/a/1190000013612369)

