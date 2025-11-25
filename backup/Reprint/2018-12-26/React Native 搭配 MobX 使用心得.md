---
title: 'React Native 搭配 MobX 使用心得' 
date: 2018-12-26 2:30:14
hidden: true
slug: a2b0km7tv1
categories: [reprint]
---

{{< raw >}}

                    
<p>MobX 是一款十分优秀的状态管理库，不但书写简洁还非常高效。当然这是我在使用之后才体会到的，当初试水上车的主要原因是响应式，考虑到可能会更符合 Vue 过来的思考方式。然而其实两者除了响应式以外并没有什么相似之处<img src="https://static.alili.techundefined" class="emoji" alt="joy" title="joy">。</p>
<p>在使用过程中走了不少弯路，一部分是因为当时扫两眼文档就动手，对 MobX 机制理解得不够；其它原因是 MobX 终究只是一个库，会受限于 React 机制，以及与其它非 MobX 管理组件的兼容问题。当中很多情况在文档已经给出了说明（<a href="https://mobx.js.org/best/react.html" rel="nofollow noreferrer" target="_blank">这里</a>和<a href="https://mobx.js.org/best/react-performance.html" rel="nofollow noreferrer" target="_blank">这里</a>），我根据自己遇到的再做一番总结。</p>
<h2 id="articleHeader0">与非响应式组件兼容问题</h2>
<p>与非响应式的组件一起工作时，MobX 有时需要为它们提供一份非响应式的数据副本，以免 observable 被其它组件修改。</p>
<h3 id="articleHeader1">observable.ref</h3>
<p>使用 React Navigation 导航时，如果要交由 MobX 管理，则需要手动配置导航状态栈，此时用 <code>@observable.ref</code> “浅观察”可避免状态被 React Navigation 修改时触发 MobX 警告。</p>
<p>当 Navigator 接受 <code>navigation</code> props 时代表导航状态为手动管理。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { addNavigationHelpers, StackNavigator } from 'react-navigation'
import { observable, action } from 'mobx'
import { Provider, observer } from 'mobx-react'
import AppComp from './AppComp'

const AppNavigator = StackNavigator({
  App: { screen: AppComp },
  // ...
}, {
  initialRouteName: 'App',
  headerMode: 'none'
})

@observer
export default class AppNavigation extends Component {
  @observable.ref navigationState = {
    index: 0,
    routes: [
      { key: 'App', routeName: 'App' }
    ],
  }

  @action.bound dispatchNavigation = (action, stackNavState = true) => {
    const previousNavState = stackNavState ? this.navigationState : null
    this.navigationState = this.AppNavigator.router.getStateForAction(action, previousNavState)
    return this.navigationState
  }

  render () {
    return (
      <Provider
        dispatchNavigation={this.dispatchNavigation}
        navigationState={this.navigationState}
      >
        <AppNavigator navigation={addNavigationHelpers({
          dispatch: this.dispatchNavigation,
          state: this.navigationState,
        })} />
      </Provider>
    )
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { addNavigationHelpers, StackNavigator } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-navigation'</span>
<span class="hljs-keyword">import</span> { observable, action } <span class="hljs-keyword">from</span> <span class="hljs-string">'mobx'</span>
<span class="hljs-keyword">import</span> { Provider, observer } <span class="hljs-keyword">from</span> <span class="hljs-string">'mobx-react'</span>
<span class="hljs-keyword">import</span> AppComp <span class="hljs-keyword">from</span> <span class="hljs-string">'./AppComp'</span>

<span class="hljs-keyword">const</span> AppNavigator = StackNavigator({
  <span class="hljs-attr">App</span>: { <span class="hljs-attr">screen</span>: AppComp },
  <span class="hljs-comment">// ...</span>
}, {
  <span class="hljs-attr">initialRouteName</span>: <span class="hljs-string">'App'</span>,
  <span class="hljs-attr">headerMode</span>: <span class="hljs-string">'none'</span>
})

@observer
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AppNavigation</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  @observable.ref navigationState = {
    <span class="hljs-attr">index</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">routes</span>: [
      { <span class="hljs-attr">key</span>: <span class="hljs-string">'App'</span>, <span class="hljs-attr">routeName</span>: <span class="hljs-string">'App'</span> }
    ],
  }

  @action.bound dispatchNavigation = <span class="hljs-function">(<span class="hljs-params">action, stackNavState = <span class="hljs-literal">true</span></span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> previousNavState = stackNavState ? <span class="hljs-keyword">this</span>.navigationState : <span class="hljs-literal">null</span>
    <span class="hljs-keyword">this</span>.navigationState = <span class="hljs-keyword">this</span>.AppNavigator.router.getStateForAction(action, previousNavState)
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.navigationState
  }

  render () {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Provider</span>
        <span class="hljs-attr">dispatchNavigation</span>=<span class="hljs-string">{this.dispatchNavigation}</span>
        <span class="hljs-attr">navigationState</span>=<span class="hljs-string">{this.navigationState}</span>
      &gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">AppNavigator</span> <span class="hljs-attr">navigation</span>=<span class="hljs-string">{addNavigationHelpers({</span>
          <span class="hljs-attr">dispatch:</span> <span class="hljs-attr">this.dispatchNavigation</span>,
          <span class="hljs-attr">state:</span> <span class="hljs-attr">this.navigationState</span>,
        })} /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">Provider</span>&gt;</span>
    )
  }
}</span></code></pre>
<h3 id="articleHeader2">
<code>observable.shallowArray()</code> 与 <code>observable.shallowMap()</code>
</h3>
<p>MobX 还提供其它方便的数据结构来存放非响应式数据。</p>
<p>比如使用 <code>SectionList</code> 的时候，我们要为其提供数据用于生成列表，由于 Native 官方的实现跟 MobX 不兼容，这个数据不能是响应式的，不然 MobX 会报一堆警告。</p>
<p>MobX 有个 <code>mobx.toJS()</code> 方法可以导出非响应式副本；如果结构不相同还可以使用 <code>@computed</code> 自动生成符合的数据。但这两个方法每次添加项目都要全部遍历一遍，可能会存在性能问题。</p>
<p>这时其实可以维护一个 <code>observable.shallowArray</code>，里面只放 <code>key</code> 数据，只用于生成列表（像骨架一样）。传给 <code>SectionList</code> 的 <code>sections</code> props 时 <code>slice</code> 数组复制副本（shallowArray 里的数据非响应式，所以只需浅复制，复杂度远小于上面两种方式）。</p>
<p>然后 store 维护一个 <code>observable.map</code> 来存放每个项的数据，在项（item）组件中 <code>inject</code> store 进去，再利用 <code>key</code> 从 map 中获取数据来填充。</p>
<p>通过 shallowArray 可以让 MobX 识别列表长度变化自动更新列表，利用 map 维护项数据可以使每个项保持响应式却互不影响，对长列表优化效果很明显。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// store comp
class MyStore {
  @observable sections = observable.shallowArray()
  @observable itemData = observable.map()

  @action.bound appendSection (section) {
    const data = []
    section.items.forEach(action(item => {
      this.itemData.set(item.id, item)
      data.push({key: item.id})
    }))
    this.sections.push({
      key: section.id,
      data
    })
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// store comp</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyStore</span> </span>{
  @observable sections = observable.shallowArray()
  @observable itemData = observable.map()

  @action.bound appendSection (section) {
    <span class="hljs-keyword">const</span> data = []
    section.items.forEach(action(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> {
      <span class="hljs-keyword">this</span>.itemData.set(item.id, item)
      data.push({<span class="hljs-attr">key</span>: item.id})
    }))
    <span class="hljs-keyword">this</span>.sections.push({
      <span class="hljs-attr">key</span>: section.id,
      data
    })
  }
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// MyList comp
import { SectionList } from 'react-native'
@inject('myStore')
@observer
class MyList extends React.Component {
  _renderItem = ({item}) => <SectionItem id={item.key} />

  render () {
    return (
      <SectionList
        getItemLayout={this._getItemLayout}
        sections={this.props.myStore.sections.slice()}
        renderSectionHeader={this._renderSectionHeader}
        renderItem={this._renderItem}
      />
    )
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// MyList comp</span>
<span class="hljs-keyword">import</span> { SectionList } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-native'</span>
@inject(<span class="hljs-string">'myStore'</span>)
@observer
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyList</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  _renderItem = <span class="hljs-function">(<span class="hljs-params">{item}</span>) =&gt;</span> &lt;SectionItem id={item.key} /&gt;

  render () {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">SectionList</span>
        <span class="hljs-attr">getItemLayout</span>=<span class="hljs-string">{this._getItemLayout}</span>
        <span class="hljs-attr">sections</span>=<span class="hljs-string">{this.props.myStore.sections.slice()}</span>
        <span class="hljs-attr">renderSectionHeader</span>=<span class="hljs-string">{this._renderSectionHeader}</span>
        <span class="hljs-attr">renderItem</span>=<span class="hljs-string">{this._renderItem}</span>
      /&gt;</span>
    )
  }
}</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// SectionItem comp
@inject('myStore')
@observer
class SectionItem extends React.Component {
  render () {
    const {myStore, id} = this.props
    const itemData = myStore.itemData.get(id)
    return (
      <Text>{itemData.title}</Text>
    )
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// SectionItem comp</span>
@inject(<span class="hljs-string">'myStore'</span>)
@observer
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">SectionItem</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render () {
    <span class="hljs-keyword">const</span> {myStore, id} = <span class="hljs-keyword">this</span>.props
    <span class="hljs-keyword">const</span> itemData = myStore.itemData.get(id)
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Text</span>&gt;</span>{itemData.title}<span class="hljs-tag">&lt;/<span class="hljs-name">Text</span>&gt;</span></span>
    )
  }
}</code></pre>
<h2 id="articleHeader3">computed</h2>
<p>利用 <code>@computed</code> 缓存数据可以做一些优化。</p>
<p>比如有一个响应式的数组 <code>arr</code>，一个组件要根据 <code>arr</code> 是否为空更新。如果直接访问 <code>arr.length</code>，那么只要数组长度发生变化，这个组件都要 render 一遍。</p>
<p>此时利用 computed 生成，组件只需要判断 <code>isArrEmpty</code> 就可以减少不必要的更新：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@computed get isArrEmpty () {
  return this.arr.length <= 0
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">@computed get isArrEmpty () {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.arr.length &lt;= <span class="hljs-number">0</span>
}</code></pre>
<h2 id="articleHeader4">observable.map</h2>
<p>因 JS 机制 MobX 不能检测属性的增删，所以最好用 <code>observable.map</code> 取代简单 <code>{}</code> 对象。另外 MobX 没有提供 Set 支持，可以用 key 和 value 一样的 Map 代替。</p>
<h2 id="articleHeader5">避免在父组件中访问子组件的属性</h2>
<p>这条规则在文档也提到，原因很简单，MobX 对于一个 <code>observer</code> 组件，是通过访问属性来记录依赖的。所以哪怕父组件里没有用到这个属性，只是为了作为 props 传给子组件，MobX 还是算它依赖了这个属性，于是会产生不必要的更新。最好的方式是将数据统一放在 store 中，子组件通过 <code>inject</code> store 方式获取数据。</p>
<h2 id="articleHeader6">小组件</h2>
<p>由于 React 的机制，MobX 只能在组件层面发光发热，对于组件内部就无能为力了。所以大组件用 MobX 很容易卡死（用其它也会<img src="https://static.alili.techundefined" class="emoji" alt="sweat_smile" title="sweat_smile">），小组件才能真正发挥 MobX 自动管理更新的优势。</p>
<p>博客链接：<a href="https://blog.crimx.com/2017/11/13/react-native-with-mobx/" rel="nofollow noreferrer" target="_blank">https://blog.crimx.com/2017/1...</a></p>
<p>【完】</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React Native 搭配 MobX 使用心得

## 原文链接
[https://segmentfault.com/a/1190000011990391](https://segmentfault.com/a/1190000011990391)

