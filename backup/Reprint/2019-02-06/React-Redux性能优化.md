---
title: 'React-Redux性能优化' 
date: 2019-02-06 2:30:09
hidden: true
slug: s3pl2eesosl
categories: [reprint]
---

{{< raw >}}

                    
<p>前面写了两篇文章<a href="https://segmentfault.com/a/1190000006100489">《React组件性能优化》</a><a href="https://segmentfault.com/a/1190000006110864" target="_blank">《Redux性能优化》</a>，分别针对React和Redux在使用上的性能优化给了一些建议。但是React和Redux一起使用还需要一个工具<a href="https://github.com/reactjs/react-redux" rel="nofollow noreferrer" target="_blank">React-Redux</a>，这一篇就说一下React-Redux在使用上的一些性能优化建议。</p>
<blockquote><p>React-Redux是官方的React和Redux链接工具</p></blockquote>
<h2 id="articleHeader0">Provider</h2>
<p>一个很简单的React组件，它主要的作用是把store放到context中，connect就可以获取store，使用store的方法，比如dispatch。其实没有被connect的组件通过声明contextTypes属性也是可以获取store，使用store的方法的，但是这个时候，如果使用dispatch修改了store的state，React-Redux并不能把修改后的state作为props给React组件，可能会导致UI和数据不同步，所以这个时候一定要清楚自己在做什么。</p>
<h2 id="articleHeader1">connect</h2>
<p>一个柯里化函数，函数将被调用两次。第一次是设置参数，第二次是组件与 Redux store 连接。connect 函数不会修改传入的 React 组件，返回的是一个新的已与 Redux store 连接的组件，而且你应该使用这个新组件。connect的使用方式是<code>connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])(Component)</code>，第一次调用的时候4个参数都是可选。</p>
<ol>
<li><p>mapStateToProps在store发生改变的时候才会调用，然后把返回的结果作为组件的props。</p></li>
<li><p>mapDispatchToProps主要作用是弱化Redux在React组件中存在感，让在组件内部改变store的操作感觉就像是调用一个通过props传递进来的函数一样。一般会配合Redux的bindActionCreators使用。如果不指定这个函数，dispatch会注入到你的组件props中。</p></li>
<li><p>mergeProps用来指定mapStateToProps、mapDispatchToProps、ownProps(组件自身属性)的合并规则，合并的结果作为组件的props。如果要指定这个函数，建议不要太复杂。</p></li>
<li><p>options里面主要关注pure，如果你的组件仅依赖props和Redux的state，pure一定要为true，这样能够避免不必要的更新。</p></li>
<li><p>Component就是要被连接的React组件，组件可以是任意的，不一定是AppRoot。一般会是需要更新store、或者是依赖store中state的最小组件。因为被连接的组件在Redux的state改变后会更新，大范围的更新对性能不友好，而且其中有些组件可能是没必要更新也会更新，所以要尽量拆分、细化，connect仅仅要更新store或依赖store的state的最小组件。</p></li>
</ol>
<h2 id="articleHeader2">Reselect</h2>
<p>mapStateToProps也被叫做selector，在store发生变化的时候就会被调用，而不管是不是selector关心的数据发生改变它都会被调用，所以如果selector计算量非常大，每次更新都重新计算可能会带来性能问题。<a href="https://github.com/reactjs/reselect" rel="nofollow noreferrer" target="_blank">Reselect</a>能帮你省去这些没必要的重新计算。<br>Reselect 提供 createSelector 函数来创建可记忆的 selector。createSelector 接收一个 input-selectors 数组和一个转换函数作为参数。如果 state tree 的改变会引起 input-selector 值变化，那么 selector 会调用转换函数，传入 input-selectors 作为参数，并返回结果。如果 input-selectors 的值和前一次的一样，它将会直接返回前一次计算的数据，而不会再调用一次转换函数。这样就可以避免不必要的计算，为性能带来提升。</p>
<h2 id="articleHeader3">总结</h2>
<p><strong><em>谨慎使用context中的store</em></strong></p>
<p><strong><em>被connect组件更新的时候影响范围尽量小，避免不必要更新</em></strong></p>
<p><strong><em>使用Resselect避免不必要的selector计算</em></strong></p>
<h2 id="articleHeader4">参考</h2>
<p><a href="https://github.com/reactjs/react-redux" rel="nofollow noreferrer" target="_blank">React-Redux</a></p>
<p><a href="https://github.com/reactjs/reselect" rel="nofollow noreferrer" target="_blank">Reselect</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React-Redux性能优化

## 原文链接
[https://segmentfault.com/a/1190000006120707](https://segmentfault.com/a/1190000006120707)

