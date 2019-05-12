---
title: 'React Native 的 ListView 性能问题已解决' 
date: 2019-01-19 2:30:10
hidden: true
slug: mw9p5lb9qfb
categories: [reprint]
---

{{< raw >}}

                    
<p>长列表或者无限下拉列表是最常见的应用场景之一。RN 提供的 ListView 组件，在长列表这种数据量大的场景下，性能堪忧。而在最新的 0.43 版本中，提供了 FlatList 组件，或许就是你需要的高性能长列表解决方案。它足以应对大多数的长列表场景。</p>
<h2 id="articleHeader0">测试数据</h2>
<p>FlatList 到底行不行，光说不行，先动手测试一下吧。</p>
<p>性能瓶颈主要体现在 Android 这边，所以就用魅族 MX5 测试机，测试无限下拉列表，列表为常见的左文右图的形式。</p>
<p>测试数据如下：</p>
<table>
<thead><tr>
<th>对比</th>
<th>ListView</th>
<th>FlatList</th>
</tr></thead>
<tbody>
<tr>
<td>1000条时内存</td>
<td>350M</td>
<td>180M</td>
</tr>
<tr>
<td>2000条时内存</td>
<td>/</td>
<td>230M</td>
</tr>
<tr>
<td>js-fps</td>
<td>4~6 fps</td>
<td>8~20 fps</td>
</tr>
</tbody>
</table>
<p><code>js-pfs</code> 类似于游戏的画面渲染的帧率，60 为最高。它用于判断 js 线程的繁忙程度，数值越大说明 js 线程运行状态越好，数值越小说明 js 线程运行状态越差。在快速滑动测试 ListView 的时候， <code>js-pfs</code> 的值一直在  4~6 范围波动，即使停止滑动，<code>js-pfs</code> 的值也不能很快恢复正常。而 FlatList 在快速滚动后停止，<code>js-pfs</code> 能够很快的恢复到正常。</p>
<p>内存方面，ListView 滑动到 1000 条时，已经涨到 350M。这时机器已经卡的不行了，所以没法滑到 2000 条并给出相关数据。而 FlatList 滑到 2000 条时的内存，也比 ListView 1000 条时的内存少不少。说明，FlatList 对内存的控制是很优秀的。</p>
<p>主观体验方面：FlatList 快速滑动至 2000 条的过程中全程体验流畅，没有出现卡顿或肉眼可见的掉帧现象。而ListView 滑动到 200 条开始卡顿，页面滑动变得不顺畅，到 500 条渲染极其缓慢，到 1000 条时已经滑不动了。</p>
<p>通过以上的简单的测试，可以看出，FlatList 已经能够应对简单的无限列表的场景。</p>
<h2 id="articleHeader1">使用方法</h2>
<p>FlatList 有三个核心属性 <code>data</code> <code>renderItem</code> <code>getItemLayout</code>。它继承自 ScrollView 组件，所以拥有 ScrollView 的属性和方法。</p>
<p><strong> data </strong></p>
<p>和 ListView 不同，它没有特殊的 <code>DataSource</code> 数据类型作为传入参数。它接收的仅仅只是一个 <code>Array&lt;object&gt;</code> 作为参数。<br>参数数组中的每一项，需要包含 <code>key</code> 值作为唯一标示。数据结构如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[{title: 'Title Text', key: 'item1'}]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">[{<span class="hljs-attr">title</span>: <span class="hljs-string">'Title Text'</span>, <span class="hljs-attr">key</span>: <span class="hljs-string">'item1'</span>}]</code></pre>
<p><strong> renderItem </strong></p>
<p>和 ListView 的 <code>renderRow</code> 类似，它接收一个函数作为参数，该函数返回一个 ReactElement。函数的第一个参数的 <code>item</code> 是 <code>data</code>属性中的每个列表的数据（ <code>Array&lt;object&gt;</code> 中的 <code>object</code>) 。这样就将列表元素和数据结合在一起，生成了列表。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" _renderItem = ({item}) => (
   <TouchableOpacity onPress={() => this._onPress(item)}>
     <Text>{item.title"}}"</Text>
   <TouchableOpacity/>
 );
 ...
 <FlatList data={[{title: 'Title Text', key: 'item1'}]} renderItem={this._renderItem} />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"> _renderItem = <span class="hljs-function">(<span class="hljs-params">{item}</span>) =&gt;</span> (
   &lt;TouchableOpacity onPress={() =&gt; this._onPress(item)}&gt;
     &lt;Text&gt;{item.title"}}"&lt;/Text&gt;
   &lt;TouchableOpacity/&gt;
 );
 ...
 &lt;FlatList data={[{title: 'Title Text', key: 'item1'}]} renderItem={this._renderItem} /&gt;</code></pre>
<p><strong> getItemLayout </strong></p>
<p>可选优化项。但是实际测试中，如果不做该项优化，性能会差很多。所以强烈建议做此项优化！<br>如果不做该项优化，每个列表都需要事先渲染一次，动态地取得其渲染尺寸，然后再真正地渲染到页面中。</p>
<p>如果预先知道列表中的每一项的高度(ITEM_HEIGHT)和其在父组件中的偏移量(offset)和位置(index)，就能减少一次渲染。这是很关键的性能优化点。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" getItemLayout={(data, index) => (
   {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
 )}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"> getItemLayout={(data, index) =&gt; (
   {<span class="hljs-attr">length</span>: ITEM_HEIGHT, <span class="hljs-attr">offset</span>: ITEM_HEIGHT * index, index}
 )}</code></pre>
<p>完整代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 这里使用 getData 获取假数据
// 数据结构类似于 [{title: 'Title Text', key: 'item1'}]
import getData from './getData';
import TopicRow from './TopicRow';
// 引入 FlatList
import FlatList from 'react-native/Libraries/CustomComponents/Lists/FlatList';

export default class Wuba extends Component {

  constructor(props) {
    super(props);
    this.state = {
      listData: getData(),
    };
  }

  renderItem({item,index}) {
    return <TopicRow  {...item} id={item.key} />;
  }

  render() {
    return (
      <FlatList
        data = {this.state.listData}
        renderItem={this.renderItem}
        onEndReached={()=>{
          // 到达底部，加载更多列表项
          this.setState({
            listData: this.state.listData.concat(getData())
          });
        "}}"
        getItemLayout={(data, index) => (
          // 120 是被渲染 item 的高度 ITEM_HEIGHT。
          {length: 120, offset: 120 * index, index}
        )}
      />
    )
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 这里使用 getData 获取假数据</span>
<span class="hljs-comment">// 数据结构类似于 [{title: 'Title Text', key: 'item1'}]</span>
<span class="hljs-keyword">import</span> getData <span class="hljs-keyword">from</span> <span class="hljs-string">'./getData'</span>;
<span class="hljs-keyword">import</span> TopicRow <span class="hljs-keyword">from</span> <span class="hljs-string">'./TopicRow'</span>;
<span class="hljs-comment">// 引入 FlatList</span>
<span class="hljs-keyword">import</span> FlatList <span class="hljs-keyword">from</span> <span class="hljs-string">'react-native/Libraries/CustomComponents/Lists/FlatList'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Wuba</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{

  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>.state = {
      <span class="hljs-attr">listData</span>: getData(),
    };
  }

  renderItem({item,index}) {
    <span class="hljs-keyword">return</span> &lt;TopicRow  {...item} id={item.key} /&gt;;
  }

  render() {
    return (
      &lt;FlatList
        data = {this.state.listData}
        renderItem={this.renderItem}
        onEndReached={()=&gt;{
          // 到达底部，加载更多列表项
          this.setState({
            listData: this.state.listData.concat(getData())
          });
        "}}"
        getItemLayout={(data, index) =&gt; (
          // 120 是被渲染 item 的高度 ITEM_HEIGHT。
          {length: 120, offset: 120 * index, index}
        )}
      /&gt;
    )
  }
}</code></pre>
<h2 id="articleHeader2">源码分析</h2>
<p>FlatList 之所以节约内存、渲染快，是因为它只将用户看到的(和即将看到的)部分真正渲染出来了。而用户看不到的地方，渲染的只是空白元素。渲染空白元素相比渲染真正的列表元素需要内存和计算量会大大减少，这就是性能好的原因。</p>
<p>FlatList 将页面分为 4 部分。初始化部分/上方空白部分/展现部分/下方空白部分。初始化部分，在每次都会渲染；当用户滚动时，根据需求动态的调整(上下)空白部分的高度，并将视窗中的列表元素正确渲染出来。</p>
<p><span class="img-wrap"><img data-src="/img/bVK9ux?w=628&amp;h=862" src="https://static.alili.tech/img/bVK9ux?w=628&amp;h=862" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="_usedIndexForKey = false;
const lastInitialIndex = this.props.initialNumToRender - 1;
const {first, last} = this.state;
// 初始化时的 items (10个) ，被正确渲染出来
this._pushCells(cells, 0, lastInitialIndex);
//  first 就是 在视图中(包括要即将在视图)的第一个 item
if (!disableVirtualization &amp;&amp; first > lastInitialIndex) {
  const initBlock = this._getFrameMetricsApprox(lastInitialIndex);
  const firstSpace = this._getFrameMetricsApprox(first).offset -
    (initBlock.offset + initBlock.length);
  // 从第 11 个 items (除去初始化的 10个 items) 到 first 渲染空白元素
  cells.push(
    <View key=&quot;$lead_spacer&quot; style="{{"[!horizontal ? 'height' : 'width']: firstSpace"}}" />
  );
}
// last 是最后一个在视图(包括要即将在视图)中的元素。
// 从 first 到 last ，即用户看到的界面渲染真正的 item
this._pushCells(cells, Math.max(lastInitialIndex + 1, first), last);
if (!this._hasWarned.keys &amp;&amp; _usedIndexForKey) {
  console.warn(
    'VirtualizedList: missing keys for items, make sure to specify a key property on each ' +
    'item or provide a custom keyExtractor.'
  );
  this._hasWarned.keys = true;
}
if (!disableVirtualization &amp;&amp; last < itemCount - 1) {
  const lastFrame = this._getFrameMetricsApprox(last);
  const end = this.props.getItemLayout ?
    itemCount - 1 :
    Math.min(itemCount - 1, this._highestMeasuredFrameIndex);
  const endFrame = this._getFrameMetricsApprox(end);
  const tailSpacerLength =
    (endFrame.offset + endFrame.length) -
    (lastFrame.offset + lastFrame.length);
   // last 之后的元素，渲染空白
  cells.push(
    <View key=&quot;$tail_spacer&quot; style="{{"[!horizontal ? 'height' : 'width']: tailSpacerLength"}}" />
  );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">_usedIndexForKey = <span class="hljs-literal">false</span>;
<span class="hljs-keyword">const</span> lastInitialIndex = <span class="hljs-keyword">this</span>.props.initialNumToRender - <span class="hljs-number">1</span>;
<span class="hljs-keyword">const</span> {first, last} = <span class="hljs-keyword">this</span>.state;
<span class="hljs-comment">// 初始化时的 items (10个) ，被正确渲染出来</span>
<span class="hljs-keyword">this</span>._pushCells(cells, <span class="hljs-number">0</span>, lastInitialIndex);
<span class="hljs-comment">//  first 就是 在视图中(包括要即将在视图)的第一个 item</span>
<span class="hljs-keyword">if</span> (!disableVirtualization &amp;&amp; first &gt; lastInitialIndex) {
  <span class="hljs-keyword">const</span> initBlock = <span class="hljs-keyword">this</span>._getFrameMetricsApprox(lastInitialIndex);
  <span class="hljs-keyword">const</span> firstSpace = <span class="hljs-keyword">this</span>._getFrameMetricsApprox(first).offset -
    (initBlock.offset + initBlock.length);
  <span class="hljs-comment">// 从第 11 个 items (除去初始化的 10个 items) 到 first 渲染空白元素</span>
  cells.push(
    &lt;View key="$lead_spacer" style="{{"[!horizontal ? 'height' : 'width']: firstSpace"}}" /&gt;
  );
}
// last 是最后一个在视图(包括要即将在视图)中的元素。
// 从 first 到 last ，即用户看到的界面渲染真正的 item
this._pushCells(cells, Math.max(lastInitialIndex + 1, first), last);
if (!this._hasWarned.keys &amp;&amp; _usedIndexForKey) {
  console.warn(
    'VirtualizedList: missing keys for items, make sure to specify a key property on each ' +
    'item or provide a custom keyExtractor.'
  );
  this._hasWarned.keys = true;
}
if (!disableVirtualization &amp;&amp; last &lt; itemCount - 1) {
  const lastFrame = this._getFrameMetricsApprox(last);
  const end = this.props.getItemLayout ?
    itemCount - 1 :
    Math.min(itemCount - 1, this._highestMeasuredFrameIndex);
  const endFrame = this._getFrameMetricsApprox(end);
  const tailSpacerLength =
    (endFrame.offset + endFrame.length) -
    (lastFrame.offset + lastFrame.length);
   // last 之后的元素，渲染空白
  cells.push(
    &lt;View key="$tail_spacer" style="{{"[!horizontal ? 'height' : 'width']: tailSpacerLength"}}" /&gt;
  );
}</code></pre>
<p>既然要使用空白元素去代替实际的列表元素，就需要预先知道实际展现元素的高度(或宽度)和相对位置。如果不知道，就需要先渲染出实际展现元素，在获取完展现元素的高度和相对位置后，再用相同（累计）高度空白元素去代替实际的列表元素。<code>_onCellLayout</code> 就是用于动态计算元素高度的方法，如果事先知道元素的高度和位置，就可以使用上面提到的 <code>getItemLayout</code> 方法，就能跳过 <code>_onCellLayout</code> 这一步，获得更好的性能。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="return (
    // _onCellLayout 就是这里的 _onLayout
    // 先渲染一次展现元素，通过 onLayout 获取其尺寸等信息
  <View onLayout={this._onLayout}>
    {element}
  </View>
);
...
  _onCellLayout = (e, cellKey, index) => {
    // 展现元素尺寸等相关计算
    const layout = e.nativeEvent.layout;
    const next = {
      offset: this._selectOffset(layout),
      length: this._selectLength(layout),
      index,
      inLayout: true,
    };
    const curr = this._frames[cellKey];
    if (!curr ||
      next.offset !== curr.offset ||
      next.length !== curr.length ||
      index !== curr.index
    ) {
      this._totalCellLength += next.length - (curr ? curr.length : 0);
      this._totalCellsMeasured += (curr ? 0 : 1);
      this._averageCellLength = this._totalCellLength / this._totalCellsMeasured;
      this._frames[cellKey] = next;
      this._highestMeasuredFrameIndex = Math.max(this._highestMeasuredFrameIndex, index);
      // 重新渲染一次。最终会调用一次上面分析的源码
      this._updateCellsToRenderBatcher.schedule();
    }
  };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">return</span> (
    <span class="hljs-comment">// _onCellLayout 就是这里的 _onLayout</span>
    <span class="hljs-comment">// 先渲染一次展现元素，通过 onLayout 获取其尺寸等信息</span>
  &lt;View onLayout={<span class="hljs-keyword">this</span>._onLayout}&gt;
    {element}
  &lt;<span class="hljs-regexp">/View&gt;
);
...
  _onCellLayout = (e, cellKey, index) =&gt; {
    /</span><span class="hljs-regexp">/ 展现元素尺寸等相关计算
    const layout = e.nativeEvent.layout;
    const next = {
      offset: this._selectOffset(layout),
      length: this._selectLength(layout),
      index,
      inLayout: true,
    };
    const curr = this._frames[cellKey];
    if (!curr ||
      next.offset !== curr.offset ||
      next.length !== curr.length ||
      index !== curr.index
    ) {
      this._totalCellLength += next.length - (curr ? curr.length : 0);
      this._totalCellsMeasured += (curr ? 0 : 1);
      this._averageCellLength = this._totalCellLength /</span> <span class="hljs-keyword">this</span>._totalCellsMeasured;
      <span class="hljs-keyword">this</span>._frames[cellKey] = next;
      <span class="hljs-keyword">this</span>._highestMeasuredFrameIndex = <span class="hljs-built_in">Math</span>.max(<span class="hljs-keyword">this</span>._highestMeasuredFrameIndex, index);
      <span class="hljs-comment">// 重新渲染一次。最终会调用一次上面分析的源码</span>
      <span class="hljs-keyword">this</span>._updateCellsToRenderBatcher.schedule();
    }
  };</code></pre>
<p>简单分析 FlatList 的源码后，后发现它并没有和 native 端复用逻辑。而且如果有些机器性能极差，渲染过慢，那些假的列表——空白元素就会被用户看到！</p>
<p>那么为什么要基于 RN 的 ScrollView 组件进行性能优化，而不直接使用 Android 或 iOS 提供的列表组件呢？</p>
<p>最简单回答就是：太难了！</p>
<p>由于本人对 RN 底层原理实现只有简单理解。只能引用 Facebook 大神的解释，起一个抛砖引玉的作用。</p>
<p>以 iOS 的 <code>UITableView</code> 为例，所有即将在视窗中呈现的元素都必须同步渲染。这意味着如果渲染过程超过 16ms，就会掉帧。</p>
<blockquote><p>In UITableView, when an element comes on screen, you have to synchronously render it. This means that you've got less than 16ms to do it. If you don't, then you drop one or multiple frames.</p></blockquote>
<p>但是问题是，从 RN render 到真正调用 native 代码这个过程本身是<strong>异步</strong>的，过程中消耗的时间也并不能保证在 16ms 以内。</p>
<blockquote><p>The problem is in the RN render -&gt; shadow -&gt; yoga -&gt; native loop. You have at least three runloop jumps (dispatch_async(dispatch_get_main_queue(), ...) as well as background thread work, which all work against the required goal.</p></blockquote>
<p>那么解决方案就是，在一些需要高性能的场景下，让 RN 能够<strong>同步</strong>的调用 native 代码。这个答案或许就是 ListView 性能问题的终极解决方案。</p>
<blockquote><p>We are actually starting to experiment more and more with synchronous method calls for other modules, which would allow us to build a native list component that could call <code>renderItem</code> on demand and choose whether to make the call synchronously on the UI thread if it's hi-pri (including the JS, react, and yoga/layout calcs), or on a background thread if it's a low-pri pre-render further off-screen. This native list component might also be able to do proper recycling and other optimizations.</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React Native 的 ListView 性能问题已解决

## 原文链接
[https://segmentfault.com/a/1190000008589705](https://segmentfault.com/a/1190000008589705)

