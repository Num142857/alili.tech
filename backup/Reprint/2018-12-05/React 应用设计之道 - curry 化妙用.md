---
title: 'React 应用设计之道 - curry 化妙用' 
date: 2018-12-05 2:30:09
hidden: true
slug: u9cltb727ad
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000014458612?w=1240&amp;h=663" src="https://static.alili.tech/img/remote/1460000014458612?w=1240&amp;h=663" alt="Zedd on live" title="Zedd on live"></span></p>
<p>使用 React 开发应用，给予了前端工程师无限“组合拼装”快感。但在此基础上，组件如何划分，数据如何流转等应用设计都决定了代码层面的美感和强健性。</p>
<p>同时，在 React 世界里提到 curry 化，也许很多开发者会第一时间反应出 React-redux 库的 connect 方法。然而，如果仅仅机械化地停留于此，而没有更多灵活地应用，是非常可惜的。</p>
<p><strong>这篇文章以一个真实场景为基础，从细节出发，分析 curry 化如何化简为繁，更优雅地实现需求。</strong></p>
<h2>场景介绍</h2>
<p>需求场景为一个卖食品的电商网站，左侧部分为商品筛选栏目，用户可以根据：价格区间、商品年限、商品品牌进行过滤。右侧展现对应产品。如下图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014458613?w=772&amp;h=562" src="https://static.alili.tech/img/remote/1460000014458613?w=772&amp;h=562" alt="页面示意图" title="页面示意图"></span></p>
<p>作为 React 开发者，我们知道 React 是组件化的，第一步将考虑根据 UE 图，进行组件拆分。这个过程比较简单直观，我们对拆分结果用下图表示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014458614?w=923&amp;h=612" src="https://static.alili.tech/img/remote/1460000014458614?w=923&amp;h=612" alt="组件设计" title="组件设计"></span></p>
<p>对应代码为：</p>
<pre><code>&lt;Products&gt;
    &lt;Filters&gt;
        &lt;PriceFilter/&gt;
        &lt;AgeFilter/&gt;
        &lt;BrandFilter/&gt;
    &lt;/Filters&gt;
    &lt;ProductResults/&gt;
&lt;/Products&gt;
</code></pre>
<h2>初级实现</h2>
<p>React 是基于数据状态的，紧接着第二步就要考虑应用状态。商品展现结果数据我们暂时不需要关心。这里主要考虑应用最重要的状态，即<strong>过滤条件信息</strong>。</p>
<p>我们使用命名为 filterSelections 的 JavaScript 对象表示过滤条件信息，如下：</p>
<pre><code>filterSelections = {
  price: ...,
  ages: ...,
  brands: ...,
}
</code></pre>
<p>此数据需要在 Products 组件中进行维护。因为 Products 组件的子组件 Filters 和 ProductResults 都将依赖这项数据状态。</p>
<p>Filters 组件通过 prop 接收 filterSelections 状态，并拆解传递给它的三项筛选子组件：</p>
<pre><code>class Filters extends React.Component {
  render() {
    return (
      &lt;div&gt;
        &lt;PriceFilter price={this.props.filterSelections.price} /&gt;
        &lt;AgeFilter ages={this.props.filterSelections.ages} /&gt;
        &lt;BrandFilter brands={this.props.filterSelections.brands} /&gt;
      &lt;/div&gt;
    );
  };
}
</code></pre>
<p>同样地，ProductResults 组件也通过 prop 接收 filterSelections 状态，进行相应产品的展示。</p>
<p>对于 Filters 组件，它一定不仅仅是接收 filterSelections 数据而已，同样也需要对此项数据进行更新。为此，我们在 Products 组件中设计相应的 handler 函数，对过滤信息进行更新，命名为 updateFilters，并将此处理函数作为 prop 下发给 Filters 组件：</p>
<pre><code>class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterSelections: {
        price: someInitialValue,
        ages: someInitialValue,
        brands: someInitialValue,
      }
    }
  }

  updateFilters = (newSelections) =&gt; {
    this.setState({
      filterSelections: newSelections
    })
  };

  render() {
    return(
      &lt;div&gt;
        &lt;Filters 
          filterSelections={this.state.filterSelections}
          selectionsChanged={this.updateFilters}
        /&gt;
        &lt;Products filterSelections={this.state.filterSelections} /&gt;
      &lt;/div&gt;
    );
  }
}
</code></pre>
<p>注意这里我们对 this 绑定方式。有兴趣的读者可以参考我的另一篇文章：<a href="https://zhuanlan.zhihu.com/p/27713910" rel="nofollow noreferrer">从 React 绑定 this，看 JS 语言发展和框架设计</a>。</p>
<p>作为 Filters 组件，同样也要对处理函数进行进一步拆分和分发：</p>
<pre><code>class Filters extends React.Component {
  updatePriceFilter = (newValue) =&gt; {
    this.props.selectionsChanged({
      ...this.props.filterSelections,
      price: newValue
    })
  };

  updateAgeFilter = (newValue) =&gt; {
    this.props.selectionsChanged({
      ...this.props.filterSelections,
      ages: newValue
    })
  };

  updateBrandFilter = (newValue) =&gt; {
    this.props.selectionsChanged({
      ...this.props.filterSelections,
      brands: newValue
    })
  };
  
  render() {
    return (
      &lt;div&gt;
        &lt;PriceFilter 
          price={this.props.filterSelections.price} 
          priceChanged={this.updatePriceFilter} 
        /&gt;
        &lt;AgeFilter 
          ages={this.props.filterSelections.ages} 
          agesChanged={this.updateAgeFilter} 
        /&gt;
        &lt;BrandFilter 
          brands={this.props.filterSelections.brands} 
          brandsChanged={this.updateBrandFilter} 
        /&gt;
      &lt;/div&gt;
    );
  };
}
</code></pre>
<p>我们根据 selectionsChanged 函数，通过传递不同类型参数，设计出 updatePriceFilter、updateAgeFilter、updateBrandFilter 三个方法，分别传递给 PriceFilter、AgeFilter、BrandFilter 三个组件。</p>
<p>这样的做法非常直接，然而运行良好。但是在 Filters 组件中，多了很多函数，且这些函数看上去做着相同的逻辑。如果将来又多出了一个或多个过滤条件，那么同样也要多出同等数量的“双胞胎”函数。这显然不够优雅。</p>
<h2>currying 是什么</h2>
<p>在分析更加优雅的解决方案之前，我们先简要了解一下 curry 化是什么。curry 化事实上是一种变形，它将一个函数 f 变形为 f'，f' 的参数接收原本函数 f 的参数，同时返回一个新的函数 f''，f'' 接收剩余的参数并返回函数 f 的计算结果。</p>
<p>这么描述无疑是抽象的，我们还是通过代码来理解。这是一个简单的求和函数：</p>
<pre><code>add = (x, y) =&gt; x + y;
</code></pre>
<p>curried 之后：</p>
<pre><code>curriedAdd = (x) =&gt; {
  return (y) =&gt; {
    return x + y;
  }
}
    </code></pre>
<p>所以，当执行 curriedAdd(1)(2) 之后，得到结果 3，curriedAdd(x) 函数有一个名字叫 partial application，curriedAdd 函数只需要原本 add(X, y) 函数的一部分参数。</p>
<blockquote>Currying a regular function let’s us perform partial application on it.</blockquote>
<h2>curry 化应用</h2>
<p>再回到之前的场景，我们设计 curry 化函数：updateSelections，</p>
<pre><code>updateSelections = (selectionType) =&gt; {
  return (newValue) =&gt; {
    this.props.selectionsChanged({
      ...this.props.filterSelections,
      [selectionType]: newValue,
    });
  }
};
</code></pre>
<p>进一步可以简化为：</p>
<pre><code>updateSelections = (selectionType) =&gt; (newValue) =&gt; {
   this.props.selectionsChanged({
      ...this.props.filterSelections,
      [selectionType]: newValue,
   })
};
</code></pre>
<p>对于 updateSelections 的偏应用（即上面提到的 partial application）：</p>
<pre><code>updateSelections('ages');
updateSelections('brands');
updateSelections('price');
</code></pre>
<p>相信大家已经理解了这么做的好处。这样一来，我们的 Filters 组件完整为：</p>
<pre><code>
class Filters extends React.Component {
  
  updateSelections = (selectionType) =&gt; {
    return (newValue) =&gt; {
      this.props.selectionsChanged({
        ...this.props.selections,
        [selectionType]: newValue,  // new ES6 Syntax!! :)
      });
    }
  };

  render() {
    return (
      &lt;div&gt;
        &lt;PriceFilter 
          price={this.props.selections.price} 
          priceChanged={this.updateSelections('price')} 
        /&gt;
        &lt;AgeFilter 
          ages={this.props.selections.ages} 
          agesChanged={this.updateSelections('ages')} 
        /&gt;
        &lt;BrandFilter 
          brands={this.props.selections.brands} 
          brandsChanged={this.updateSelections('brands')} 
        /&gt;
      &lt;/div&gt;
    );
  };
}
</code></pre>
<p>当然，currying 并不是解决上述问题的唯一方案。我们再来了解一种方法，进行对比消化，updateSelections 函数 uncurried 版本：</p>
<pre><code>
updateSelections = (selectionType, newValue) =&gt; {
  this.props.updateFilters({
    ...this.props.filterSelections,
    [selectionType]: newValue,
  });
}
</code></pre>
<p>这样的设计使得每一个 Filter 组件：PriceFilter、AgeFilter、BrandFilter 都要调用 updateSelections 函数本身，并且要求组件本身感知 filterSelections 的属性名，以进行相应属性的更新。这就是一种耦合，完整实现：</p>
<pre><code>class Filters extends React.Component {

      updateSelections = (selectionType, newValue) =&gt; {
        this.props.selectionsChanged({
          ...this.props.filterSelections,
          [selectionType]: newValue, 
        });
      };
    
      render() {
        return (
          &lt;&gt;
            &lt;PriceFilter 
              price={this.props.selections.price} 
              priceChanged={(value) =&gt; this.updateSelections('price', value)} 
            /&gt;
            &lt;AgeFilter 
              ages={this.props.selections.ages} 
              agesChanged={(value) =&gt; this.updateSelections('ages', value)} 
            /&gt;
            &lt;BrandFilter 
              brands={this.props.selections.brands} 
              brandsChanged={(value) =&gt; this.updateSelections('brands', value)} 
            /&gt;
          &lt;/&gt;
        );
      };
    }
</code></pre>
<p>其实我认为，在这种场景下，关于两种方案的选择，可以根据开发者的偏好来决定。</p>
<h2>总结</h2>
<p>这篇文章内容较为基础，但从细节入手，展现了 React 开发编写和函数式理念相结合的魅力。文章<a href="https://hackernoon.com/curry-away-in-react-7c4ed110c65a" rel="nofollow noreferrer">译自这里</a>，部分内容有所改动。</p>
<p><strong>广告时间：</strong><br>如果你对前端发展，尤其对 React 技术栈感兴趣：我的新书中，也许有你想看到的内容。关注作者 <a href="https://www.zhihu.com/people/lucas-hc/activities" rel="nofollow noreferrer">Lucas HC</a>，新书出版将会有送书活动。</p>
<p>Happy Coding!</p>
<p>PS: 作者&nbsp;<a href="http://link.zhihu.com/?target=https%3A//github.com/HOUCe" rel="nofollow noreferrer">Github仓库</a>&nbsp;和&nbsp;<a href="https://www.zhihu.com/people/lucas-hc/answers" rel="nofollow noreferrer">知乎问答链接</a>&nbsp;欢迎各种形式交流！</p>
<p>我的其他几篇关于React技术栈的文章：</p>
<p><a href="https://zhuanlan.zhihu.com/p/28905707" rel="nofollow noreferrer">从setState promise化的探讨 体会React团队设计思想</a></p>
<p><a href="https://zhuanlan.zhihu.com/p/28905707" rel="nofollow noreferrer">从setState promise化的探讨 体会React团队设计思想</a></p>
<p><a href="https://zhuanlan.zhihu.com/p/27825741" rel="nofollow noreferrer">通过实例，学习编写 React 组件的“最佳实践”</a></p>
<p><a href="https://zhuanlan.zhihu.com/p/27727292" rel="nofollow noreferrer">React 组件设计和分解思考</a></p>
<p><a href="https://zhuanlan.zhihu.com/p/28905707/edit" rel="nofollow noreferrer">从 React 绑定 this，看 JS 语言发展和框架设计</a></p>
<p><a href="http://link.zhihu.com/?target=http%3A//www.jianshu.com/p/49029b49f2b4" rel="nofollow noreferrer">做出Uber移动网页版还不够 极致性能打造才见真章**</a></p>
<p><a href="http://link.zhihu.com/?target=http%3A//www.jianshu.com/p/cde3cf7e2760" rel="nofollow noreferrer">React+Redux打造“NEWS EARLY”单页应用 一个项目理解最前沿技术栈真谛**</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React 应用设计之道 - curry 化妙用

## 原文链接
[https://segmentfault.com/a/1190000014458607](https://segmentfault.com/a/1190000014458607)

