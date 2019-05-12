---
title: 'Redux状态管理之痛点、分析与改良' 
date: 2019-01-14 2:30:07
hidden: true
slug: 34uimyuvjtx
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>如何设计Redux的store？</p></blockquote>
<p>这几乎是Redux在实践中被问到最多的问题，或许你有自己的方式，却总觉得哪里不太对劲。这篇文章希望从状态是什么，到Elm中的状态管理，最后与Redux分析和对比，试图找到问题，并推导可行的改良方式。</p>
<h2 id="articleHeader0">哪些状态需要被管理？</h2>
<h3 id="articleHeader1">Domain data</h3>
<p>Domain data非常好理解，他们直接来源于服务端对领域模型的抽象，比如user、product。它们可能被应用的多个地方用到，比如当前user包含的权限信息所有涉及鉴权的地方都需要。</p>
<p>通常，前端对Domain data最大的管理需求是和服务端保持同步，不会有频繁和复杂的变更——如果有的话请考虑合并批处理和转移复杂度到服务端。</p>
<p>甚至有不少页面仅在初始化时获取一次Domain data，从此就再无瓜葛，直到跳转到下一个页面。</p>
<h3 id="articleHeader2">UI state</h3>
<p>决定当前UI如何展示的状态，比如一个弹窗的开闭，下拉菜单是否打开。</p>
<p>在我看来，UI state是前端真正开始复杂的部分——如果仅仅依靠服务端拿下来的Domain data就能做好前端，backbone的<a href="http://backbonejs.org/#Model" rel="nofollow noreferrer" target="_blank">Model</a>早就一统江湖了，没后来者们什么事情。</p>
<p>和Domain data的简单、稳定不同，UI state是多变，不稳定的——不同的页面有不同、甚至相似但又细微不同的展现和交互。</p>
<p>同时，UI state之间也是互相影响的，比如选择列表中的元素(选中状态是ui state)，当选中数量低于N时禁用提交按钮(按钮是否禁用也是ui state)。这是前端工作中非常常见的需求，整个场景中没有Domain data出现。</p>
<p>UI state多变、不稳定，但它仍然是需要被复用的。小到弹窗的开闭，大到表单的管理，他们的逻辑都是明显可被抽象的。</p>
<h3 id="articleHeader3">App state *</h3>
<p>App级的状态，例如当前是否有请求正在加载。<strong>个人倾向将它们视为另一种抽象角度下的UI state</strong>。因为本质上它们仍然是服务于UI的：一个异步下拉框会发请求，加载页面主要信息也会发请求，而我们通常希望前者加载时只disable下拉框，而后者可能要用Loading mask遮罩整个页面——场景不同，对状态的需求就不同，单纯关注<code>当前是否有请求正在加载</code>没有意义，只有与UI场景结合才会产生价值，因此我倾向认为App state的本质是对UI state的再抽象。</p>
<h2 id="articleHeader4">Redux社区的主流实践</h2>
<p>由Redux库贡献者之一维护的<a href="https://github.com/markerikson/redux/blob/structuring-reducers-page/docs/recipes/reducers/01-BasicReducerStructure.md" rel="nofollow noreferrer" target="_blank">recipes</a>提到了</p>
<blockquote><p>Because the store represents the core of your application, you should <strong> define your state shape in terms of your domain data and app state, not your UI component tree.</strong></p></blockquote>
<p>这基本代表了如今社区的主流实践，它包含了两个主要观点：</p>
<ol>
<li><p>Store代表了<strong>应用</strong>的状态(store represents the core of your application)</p></li>
<li><p>使用domain data和app state作为store的主要抽象依据</p></li>
</ol>
<p>很少有人质疑过这两点的正确性，因为第一点和Flux社区一脉相承，第二点无论看起来还是写起代码来都显得顺理成章。</p>
<p>有没有可能这两点才是Redux实践的问题所在？</p>
<p>在往下讨论之前，不妨看看Redux最重要的借鉴对象——Elm是如何管理状态的。</p>
<h2 id="articleHeader5">Elm 中的状态树</h2>
<h3 id="articleHeader6">Elm简介</h3>
<p>先用一张图表达Elm的架构：<br><span class="img-wrap"><img data-src="/img/remote/1460000009540498" src="https://static.alili.tech/img/remote/1460000009540498" alt="elm" title="elm" style="cursor: pointer;"></span></p>
<blockquote><p>图：<a href="https://staltz.com/unidirectional-user-interface-architectures.html" rel="nofollow noreferrer" target="_blank">https://staltz.com/unidirecti...</a></p></blockquote>
<p>结合代码往下看，首先在Elm中定义一个组件Counter，没有Elm相关基础也没关系，可以结合注释理解大概即可：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
-- 定义数据模型
type alias Model = Int

-- 定义消息
type Msg = Increment | Decrement

-- 定义更新函数
update : Msg -> Model -> Model
update msg model =
  case msg of
    Increment ->
      model + 1
    Decrement ->
      model - 1

-- 定义渲染函数
view : Model -> Html Msg
view model =
  div []
    [ button [onClick Decrement] [text &quot;-&quot;]
    , text (toString model)
    , button [onClick Increment] [text &quot;+&quot;]
  ]

-- 定义初始数据
initModel : Model
initModel = 3
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="elm hljs"><code class="elm">
<span class="hljs-comment">-- 定义数据模型</span>
<span class="hljs-keyword">type</span> <span class="hljs-keyword">alias</span> <span class="hljs-type">Model</span> = <span class="hljs-type">Int</span>

<span class="hljs-comment">-- 定义消息</span>
<span class="hljs-keyword">type</span> <span class="hljs-type">Msg</span> = <span class="hljs-type">Increment</span> | <span class="hljs-type">Decrement</span>

<span class="hljs-comment">-- 定义更新函数</span>
<span class="hljs-title">update</span> : <span class="hljs-type">Msg</span> -&gt; <span class="hljs-type">Model</span> -&gt; <span class="hljs-type">Model</span>
<span class="hljs-title">update</span> msg model =
  <span class="hljs-keyword">case</span> msg <span class="hljs-keyword">of</span>
    <span class="hljs-type">Increment</span> -&gt;
      model + <span class="hljs-number">1</span>
    <span class="hljs-type">Decrement</span> -&gt;
      model - <span class="hljs-number">1</span>

<span class="hljs-comment">-- 定义渲染函数</span>
<span class="hljs-title">view</span> : <span class="hljs-type">Model</span> -&gt; <span class="hljs-type">Html</span> <span class="hljs-type">Msg</span>
<span class="hljs-title">view</span> model =
  div []
    [ button [onClick <span class="hljs-type">Decrement</span>] [text <span class="hljs-string">"-"</span>]
    , text (toString model)
    , button [onClick <span class="hljs-type">Increment</span>] [text <span class="hljs-string">"+"</span>]
  ]

<span class="hljs-comment">-- 定义初始数据</span>
<span class="hljs-title">initModel</span> : <span class="hljs-type">Model</span>
<span class="hljs-title">initModel</span> = <span class="hljs-number">3</span>
</code></pre>
<p>有人可能要问了，"组件呢？在哪？这几个变量哪个是组件？"。答案是：加在一起就是。</p>
<p>这是Elm架构的标志：<strong>每个组件都被分成了Model/View/Update/Msg四个部分。</strong></p>
<p>当它需要作为应用单独运行时，就将这几个部分"绑"在一起：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="main = App.beginnerProgram {model = initModel, view = view, update = update}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="elm hljs"><code class="elm"><span class="hljs-title">main</span> = <span class="hljs-type">App</span>.beginnerProgram {model = initModel, view = view, update = update}
</code></pre>
<p>而当它需要被上层组件使用时，则由上层组件使用这些分立的元件构建自己的对应部分，下面是使用Counter构建一个CounterList：</p>
<blockquote><p>以下主要关注对Counter.XXX的使用</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Counter

-- 使用Counter.Model组合新的Model
type alias IndexedCounter = {id: Int, counter: Counter.Model}
type alias Model = {uid: Int, counters: List IndexedCounter}


-- 使用Counter.Msg 组合新的Msg
type Msg = Insert | Remove | Modify Int Counter.Msg

update : Msg -> Model -> Model
update msg model =
  case msg of
    Modify id counterMsg ->
      let
        counterMapper = updateCounter id counterMsg -- 调用updateCounter函数
      in
        {model | counters = List.map counterMapper model.counters}

-- 调用Counter.update
updateCounter : Int -> Counter.Msg -> IndexedCounter -> IndexedCounter
updateCounter id counterMsg indexedCounter =
  if id == indexedCounter.id
  then {indexedCounter | counter = Counter.update counterMsg indexedCounter.counter}
  else indexedCounter

view : Model -> Html Msg
view model =
  div []
    [ button [onClick Insert] [text &quot;Insert&quot;]
    , button [onClick Remove] [text &quot;Remove&quot;]
    , div [] (List.map showCounter model.counters) -- 调用showCounter
    ]

-- 调用Counter.view
showCounter : IndexedCounter -> Html Msg
showCounter ({id, counter} as indexedCounter) =
  App.map (\counterMsg -> Modify id counterMsg) (Counter.view counter)

-- 调用Counter.initModel
initModel = {uid= 0, counters = [{id= 0, counter= Counter.initModel}]}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="elm hljs"><code class="elm"><span class="hljs-keyword">import</span> Counter

<span class="hljs-comment">-- 使用Counter.Model组合新的Model</span>
<span class="hljs-keyword">type</span> <span class="hljs-keyword">alias</span> <span class="hljs-type">IndexedCounter</span> = {id: <span class="hljs-type">Int</span>, counter: <span class="hljs-type">Counter</span>.<span class="hljs-type">Model</span>}
<span class="hljs-keyword">type</span> <span class="hljs-keyword">alias</span> <span class="hljs-type">Model</span> = {uid: <span class="hljs-type">Int</span>, counters: <span class="hljs-type">List</span> <span class="hljs-type">IndexedCounter</span>}


<span class="hljs-comment">-- 使用Counter.Msg 组合新的Msg</span>
<span class="hljs-keyword">type</span> <span class="hljs-type">Msg</span> = <span class="hljs-type">Insert</span> | <span class="hljs-type">Remove</span> | <span class="hljs-type">Modify</span> <span class="hljs-type">Int</span> <span class="hljs-type">Counter</span>.<span class="hljs-type">Msg</span>

<span class="hljs-title">update</span> : <span class="hljs-type">Msg</span> -&gt; <span class="hljs-type">Model</span> -&gt; <span class="hljs-type">Model</span>
<span class="hljs-title">update</span> msg model =
  <span class="hljs-keyword">case</span> msg <span class="hljs-keyword">of</span>
    <span class="hljs-type">Modify</span> id counterMsg -&gt;
      <span class="hljs-keyword">let</span>
        counterMapper = updateCounter id counterMsg <span class="hljs-comment">-- 调用updateCounter函数</span>
      <span class="hljs-keyword">in</span>
        {model | counters = <span class="hljs-type">List</span>.map counterMapper model.counters}

<span class="hljs-comment">-- 调用Counter.update</span>
<span class="hljs-title">updateCounter</span> : <span class="hljs-type">Int</span> -&gt; <span class="hljs-type">Counter</span>.<span class="hljs-type">Msg</span> -&gt; <span class="hljs-type">IndexedCounter</span> -&gt; <span class="hljs-type">IndexedCounter</span>
<span class="hljs-title">updateCounter</span> id counterMsg indexedCounter =
  <span class="hljs-keyword">if</span> id == indexedCounter.id
  <span class="hljs-keyword">then</span> {indexedCounter | counter = <span class="hljs-type">Counter</span>.update counterMsg indexedCounter.counter}
  <span class="hljs-keyword">else</span> indexedCounter

<span class="hljs-title">view</span> : <span class="hljs-type">Model</span> -&gt; <span class="hljs-type">Html</span> <span class="hljs-type">Msg</span>
<span class="hljs-title">view</span> model =
  div []
    [ button [onClick <span class="hljs-type">Insert</span>] [text <span class="hljs-string">"Insert"</span>]
    , button [onClick <span class="hljs-type">Remove</span>] [text <span class="hljs-string">"Remove"</span>]
    , div [] (<span class="hljs-type">List</span>.map showCounter model.counters) <span class="hljs-comment">-- 调用showCounter</span>
    ]

<span class="hljs-comment">-- 调用Counter.view</span>
<span class="hljs-title">showCounter</span> : <span class="hljs-type">IndexedCounter</span> -&gt; <span class="hljs-type">Html</span> <span class="hljs-type">Msg</span>
<span class="hljs-title">showCounter</span> ({id, counter} <span class="hljs-keyword">as</span> indexedCounter) =
  <span class="hljs-type">App</span>.map (\counterMsg -&gt; <span class="hljs-type">Modify</span> id counterMsg) (<span class="hljs-type">Counter</span>.view counter)

<span class="hljs-comment">-- 调用Counter.initModel</span>
<span class="hljs-title">initModel</span> = {uid= <span class="hljs-number">0</span>, counters = [{id= <span class="hljs-number">0</span>, counter= <span class="hljs-type">Counter</span>.initModel}]}
</code></pre>
<p>可以看到，上层组件同样是分成了四个部分，而每个部分都分别调用了子组件的对应元素。</p>
<p>整个Elm的组件树，就是这样一层层组合起来，直到最顶层，仍然是分立的四部分，需要运行时，才被粘合到一起。</p>
<p>最终被运行的根节点组件，无论是Model、View还是Update，都是由整个组件树上无数个小组件组合出来的，在组合的过程中，只有<code>使用A组件的Model</code>，而不会有<code>使用User Model</code>——<strong>整个架构从抽象、到组合，都是完全面向组件，而非面向领域模型的。</strong></p>
<h3 id="articleHeader7">Redux与Elm的差异</h3>
<p>在谈论Elm的<code>Model</code>/<code>Update</code>/<code>Msg</code>时，熟悉Redux的读者应该很快就联想到了<code>Store</code>/<code>Reducer</code>/<code>Action</code>，然而它们间的差异也是显而易见的：Elm中<code>Model</code>/<code>Update</code>/<code>Msg</code>/<code>View</code>是<strong>创造组件时</strong>定义的，而Redux中的Reducer/Action则是在<strong>组件树之外</strong>定义的。</p>
<p>脱离具体的组件与交互场景，面向组件抽象就变得非常困难，此时领域模型成了几乎唯一可靠的抽象依据。</p>
<p>领域模型与组件树无关，加上之前flux社区的惯性，社区很自然就把store做成了App级的全局单例。</p>
<p>然而，管理UI state的需求仍然存在，一个Web应用可以有无数个页面，相应地有无数的UI state需要管理，如果状态管理框架不能有效地解决它们，也就失去了存在的意义。</p>
<p>在Elm中，应用的状态树随着组件树而变化，假设组件树的根结点是页面，那么页面A和B的状态树必然是不同的，而<strong>Redux却需要用唯一一个状态树，去满足整个应用——N个组件树(页面)的需求</strong>，这显然是有问题的。</p>
<p>因此在Redux中有reselect, 有normalize，有mapStateToProps，这些Elm中通通不存在的东西，它们面向的其实是同一个问题：状态树到组件树如何映射。然而它们都只能起缓冲作用，因为状态树与组件树一对N的关系并没有改变。</p>
<p>举个例子：A页面有个复杂的Counter组件，我们希望它被状态管理框架管理起来——这显然比setState更清晰更易维护。于是我们设计了counterReducer，并把它放到了store中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
  //添加counterReducer
  counter: counterReducer,
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> rootReducer = combineReducers({
  <span class="hljs-attr">user</span>: userReducer,
  <span class="hljs-attr">product</span>: productReducer,
  <span class="hljs-comment">//添加counterReducer</span>
  counter: counterReducer,
})
</code></pre>
<p>假设B页面用到了同样的组件——但是需要两个counter，现有的状态树就无法满足需要了，只能改成：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
  //添加counterReducer
  pageA: combineReducers({
      counter: counterReducer,
  }),
  pageB: combineReducers({
      counter1: counterReducer,
      counter2: counterReducer,
  })
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> rootReducer = combineReducers({
  <span class="hljs-attr">user</span>: userReducer,
  <span class="hljs-attr">product</span>: productReducer,
  <span class="hljs-comment">//添加counterReducer</span>
  pageA: combineReducers({
      <span class="hljs-attr">counter</span>: counterReducer,
  }),
  <span class="hljs-attr">pageB</span>: combineReducers({
      <span class="hljs-attr">counter1</span>: counterReducer,
      <span class="hljs-attr">counter2</span>: counterReducer,
  })
})
</code></pre>
<p>这个例子既体现了Redux相对于Flux的进步(在Flux/Reflux中，要复用counter的逻辑非常困难)，也体现了Redux在store设计上的尴尬：</p>
<ol>
<li><p>Domain data与UI state混搭</p></li>
<li><p>理论上页面有无穷多个，未来rootReducer里还需要装下page(CDEFG)</p></li>
<li><p>rootReducer具有全局性，而页面、组件通常是局部的，修改全局去服务局部是bad smell</p></li>
</ol>
<p>"如何设计Redux的store？"这个问题的背后，便是如上所述的，Redux在设计上相对于Elm的偏离导致的。这种偏离导致Redux仍然不能非常好地驾驭UI state，最终不得不表示"You might not need Redux"和"setState is OK"。</p>
<h4>Reducer的优势</h4>
<p>客观地讲，脱离组件树定义的Reducer并非一无是处。它确实很难处理细碎、嵌套的UI状态。但在处理某一"类"UI状态时却显得得心应手——<strong>有些UI状态是可以被脱离组件树抽象的</strong>(类似前面提到的App state)。</p>
<p>一个著名的例子是<a>redux-form</a>，它把表单这一"类"行为进行了抽象，并且挂载在根reducer下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

const reducers = {
  // ... your other reducers here ...
  form: formReducer     // <---- Mounted at 'form'
}
const reducer = combineReducers(reducers)
const store = createStore(reducer)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> { createStore, combineReducers } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux'</span>
<span class="hljs-keyword">import</span> { reducer <span class="hljs-keyword">as</span> formReducer } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux-form'</span>

<span class="hljs-keyword">const</span> reducers = {
  <span class="hljs-comment">// ... your other reducers here ...</span>
  form: formReducer     <span class="hljs-comment">// &lt;---- Mounted at 'form'</span>
}
<span class="hljs-keyword">const</span> reducer = combineReducers(reducers)
<span class="hljs-keyword">const</span> store = createStore(reducer)</code></pre>
<p>类似的例子还有全局的错误处理、loading状态管理以及模态窗的开闭管理。他们都是脱离组件树定义Reducer带来正面价值的案例——对于行为高度固定的、没有复杂嵌套关系的UI状态，脱离组件树几乎不会带来抽象上的缺失，用全局的方式进行抽象是可行的。</p>
<h3 id="articleHeader8">题外话：WebApp场景下的隐患</h3>
<p>Store对象存在于内存中，在用户没有刷新的情况下是一直存在并且可访问的，而一旦用户刷新、分享链接，Store就会重新创建。由于Store是"应用"级的，开发者使用Store中的数据时，很难知道数据在刷新、分享后是否可用。</p>
<p>举个我曾经在<a href="https://segmentfault.com/a/1190000005864691">另一篇博客</a>中提到过的例子，一个业务流程有三个页面A/B/C，用户通常按顺序访问它们，每步都会提交一些信息，如果把信息存在Store中，在不刷新的情况下C页面可以直接访问A/B页面存进Store的数据，而一旦用户刷新C页面，这些数据便不复存在，使用这些数据很可能导致程序异常。</p>
<p>如果在设计Store时，是像上面提到的store.pageA这样的形式，情况会稍有缓解，因为至少开发者知道这个数据属于pageA，对数据的来源有认知，如果Store是按领域模型划分的，情况会变得非常糟：开发者在使用store.user这样的数据时不可能知道这个数据是否可靠，最终要么花费额外的精力去确认，要么给应用留下隐患——显然后者会是更常见的情况。</p>
<p>Store这个名字给人以"Storage"的错觉，面向领域模型的设计使得这种错觉被进一步巩固。</p>
<p>从辩护的角度，这个问题不是Redux独有，它是App级Store在Web场景下的通病，从Flux/Reflux开始就已经存在。另外也可以把问题推给开发者：你不确认数据的可靠性，出了问题怪谁？</p>
<p>然而，好的框架、范式应该具备足够的"防御性"，当前Redux的主流实践在这个问题上并没有给出让人满意的答案。</p>
<blockquote><p>例：React-Redux的<a href="https://github.com/gothinkster/react-redux-realworld-example-app" rel="nofollow noreferrer" target="_blank">Real-World example</a>就把分页信息存进了store导致刷新后页码丢失</p></blockquote>
<h3 id="articleHeader9">改良版的实践</h3>
<p>尽管Redux有上面提到的问题，但它在单向数据流、提倡纯函数、解耦输入与响应等方面仍然有非常大的价值。对上面提到的问题，我试图通过改良实践去缓解：<strong>Page独立声明reducers并创建store</strong>。</p>
<p>这个过程可以使用高阶组件封装起来，代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const defaultConfig = {
  pageReducers: {},
  reducers: commonReducers, // import from other files
  middlewares: commonMiddlewares, // import from other files
};

const withRedux = config => (Comp) => {
  const finalConfig = {
    ...defaultConfig,
    ...config,
  };

  const { middlewares, reducers } = finalConfig;

  return class WithRedux extends Component {
    constructor(props) {
      super(props);

      const reducerFn = combineReducers({
        ...finalConfig.pageReducers,
        ...reducers,
      });

      this.store = applyMiddleware(
        ...middlewares,
      )(createStore)(reducerFn);
    }
    render() {
      return (
        <Provider store={this.store}>
          <Comp {...this.props} />
        </Provider>
      );
    }
  };
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> defaultConfig = {
  <span class="hljs-attr">pageReducers</span>: {},
  <span class="hljs-attr">reducers</span>: commonReducers, <span class="hljs-comment">// import from other files</span>
  middlewares: commonMiddlewares, <span class="hljs-comment">// import from other files</span>
};

<span class="hljs-keyword">const</span> withRedux = <span class="hljs-function"><span class="hljs-params">config</span> =&gt;</span> (Comp) =&gt; {
  <span class="hljs-keyword">const</span> finalConfig = {
    ...defaultConfig,
    ...config,
  };

  <span class="hljs-keyword">const</span> { middlewares, reducers } = finalConfig;

  <span class="hljs-keyword">return</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">WithRedux</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>(props) {
      <span class="hljs-keyword">super</span>(props);

      <span class="hljs-keyword">const</span> reducerFn = combineReducers({
        ...finalConfig.pageReducers,
        ...reducers,
      });

      <span class="hljs-keyword">this</span>.store = applyMiddleware(
        ...middlewares,
      )(createStore)(reducerFn);
    }
    render() {
      <span class="hljs-keyword">return</span> (
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Provider</span> <span class="hljs-attr">store</span>=<span class="hljs-string">{this.store}</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">Comp</span> {<span class="hljs-attr">...this.props</span>} /&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">Provider</span>&gt;</span>
      );
    }
  };
};</span></code></pre>
<p>接下来，只需要在<strong>依赖Redux的页面</strong>使用withRedux即可：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const PageA = ()=> <div>A</div>;

export default withRedux({
  pageReducers: {
    foo, // 和commonReducers合并成最终页面的reducer
  },
//  reducers: {}, // 直接替换commonReducers
})(PageA)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> PageA = <span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span> &lt;div&gt;A&lt;<span class="hljs-regexp">/div&gt;;

export default withRedux({
  pageReducers: {
    foo, /</span><span class="hljs-regexp">/ 和commonReducers合并成最终页面的reducer
  },
/</span><span class="hljs-regexp">/  reducers: {}, /</span><span class="hljs-regexp">/ 直接替换commonReducers
})(PageA)
</span></code></pre>
<p>它可以从两方面缓解上述问题：</p>
<ol>
<li><p>抽象问题：每个Page独立创建store，解决状态树的一对多问题，一个状态树(store)对应一个组件树(page)，page在设计store时<strong>不用考虑其它页面，仅服务当前页</strong>。当然，由于Reducer仍然需要独立于组件树声明，抽象问题并没有根治，面向领域数据和App state的抽象仍然比UI state更自然。它仅仅带给你更大的自由度：不再担心有限的状态树如何设计才能满足近乎无限的UI state。</p></li>
<li><p>刷新、分享隐患：每个Page创建的Store都是完全不同的对象，且只存在于当前Page生命周期内，其它Page不可能访问到，从根本上杜绝跨页面的store访问。这意味着<em>能够从store中访问到的数据，一定是可靠的</em>。</p></li>
</ol>
<p>通过commonReducers/commonMiddleware可以方便复用一些全局性的解决方案，比如redux-thunk/redux-form。页面默认使用commonReducers/commonMiddlewares，也可以完全不用，<strong>甚至页面可以不使用redux</strong>。<code>复用行为，而不是共用状态</code>，这是Redux相对于Flux最大的进步，现在我们将这个理念继续推进。</p>
<h3 id="articleHeader10">问题</h3>
<p><strong>Q：是否违反了Redux三大核心原则之一——single source of truth？</strong></p>
<p><strong>A:</strong> 没有，它只是明确了组件树和状态树一一对应的关系，一个应用会有N个页面，但不会同时显示两个页面，因此，任何时刻当前页面对应的状态树都是single source of truth。</p>
<p><strong>Q：和社区主流库集成是否会有问题</strong></p>
<p><strong>A:</strong> 是的，由于和社区主流实践有差异，遇到问题是难以避免的。</p>
<p>假设你正在使用ReactRouter，采用上述方案后组件树的结构将会变成 <code>Router &gt; Route &gt; Provider &gt; PageA</code>，而<code>react-router-redux</code>则需要 <code>Provider &gt; ConnectedRouter &gt; Route &gt; PageA</code> 这样的组件结构：ConnectedRouter是<code>react-router-redux</code>引入的，依赖Provider向context中注入store，这意味着Redux的Provider必须是路由的父元素，和我们将Redux下放到页面的思路相冲突。</p>
<p>对此，我们的选择是：放弃<code>react-router-redux</code>。</p>
<p>我强烈建议你回顾当初引入 <code>react-router-redux</code>的原因：如果是希望通过action操作history，那么一个独立的中间件可以轻易做到；如果是希望通过store访问location/history，在页面初始化时把location/history放进store也非常简单；如果不知道为什么，仅仅因为它是全家桶的一部分——何不干掉他试试？</p>
<p>在移除<code>react-router-redux</code>后，我们不仅没有受到任何功能性的影响，反而使得架构层面的耦合更低了：路由与状态管理方案不再有耦合关系。</p>
<p>这种从耦合中解放的感觉就像水里穿着衣服游泳的人终于脱掉了外套，之前是视图(react)-路由(router)-状态管理(redux)相互耦合，却并没有带来明显的收益，而现在我们已经开始考虑换掉react-router了。</p>
<p>甚至，既然是由页面决定是否引入Redux、使用哪些reducers/middlewares，那么一个项目中不同的页面采用不同技术栈是完全可行的，这允许你在某些页面上大胆尝试新的方案而不用担心影响全局：架构上的低耦合使我们拥有更多的选择余地。</p>
<p><strong>Q: 谈到UI state，社区有以<a href="https://github.com/tonyhb/redux-ui" rel="nofollow noreferrer" target="_blank">redux-ui</a>为代表的方案，怎么看？</strong></p>
<p><strong>A:</strong> 它们恰恰呼应了本文提到的另一个侧面：Reducer的抽象问题。redux-ui让组件状态、行为与组件定义重新回到了一起，从而使"让redux管理UI state"变得更自然。当然它也带来了一些代码结构上的限制，是否采用取决于具体场景下的考量。它和本文最后提倡的改良实践并不冲突，甚至，改良版实践能更容易地在部分页面先行尝试这些新方案。</p>
<h2 id="articleHeader11">小结</h2>
<p>本文从Elm的角度剖析了Redux存在的问题，也分享了我目前采用的实践方式，这个实践方式不是神奇药水，仅仅是权衡问题和现状后的小步改良。</p>
<p>回顾和对比主流实践的两个重点：</p>
<table>
<thead><tr>
<th>改良前</th>
<th>改良后</th>
</tr></thead>
<tbody>
<tr>
<td>Store代表了<strong>应用</strong>的状态</td>
<td>Store代表了页面(根组件)状态</td>
</tr>
<tr>
<td>Domain data和App state作为store的主要抽象依据</td>
<td>没有本质改变，但加入UI state的影响更低</td>
</tr>
</tbody>
</table>
<p>从程序设计的角度，我相信改良后的实践又进步了一点点：更低的耦合、更准确的对应关系、更可靠的数据依赖，与Elm也更加接近。</p>
<p>同时我也深知这还远远不够，期待能有更好的实践方式和更好的轮子出现。</p>
<h2 id="articleHeader12">更新</h2>
<p>======================= 2017.08.27 更新 =======================</p>
<p>这个方案在实践中，仍然遇到了一些问题，其中最最重要的，则是<strong>替换store后，跨页面action的问题</strong></p>
<p>举个例子，通过thunk在a页面触发一个异步action：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const asyncAction = ()=> (dispatch)=> {
  setTimeout(()=> {
    dispatch({type: 'SYNC_ACT'}); // dispatch 为a页面的store.dispatch
  }, 5000)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> asyncAction = <span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span> (dispatch)=&gt; {
  setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span> {
    dispatch({<span class="hljs-attr">type</span>: <span class="hljs-string">'SYNC_ACT'</span>}); <span class="hljs-comment">// dispatch 为a页面的store.dispatch</span>
  }, <span class="hljs-number">5000</span>)
}</code></pre>
<p>如果在这5秒内，用户跳转到了另一个页面，则会重新create一个store，而回调函数中的dispatch函数仍然指向上一个页面的store。</p>
<p>如果我们把页面看成完全独立的"小应用"，这样的行为是说得通的，但作为一个网站有时候我们也希望有"连续"的用户体验和交互。在实际项目中我们遇到的情况是我们使用了redux管理模态窗的开闭状态，而需求方希望在上一个页面离开时打开一个模态窗，同时保持打开状态并跳到下一个页面，两秒后模态窗消失。</p>
<p>同理，如果有类似websocket的需求，相关的thunk action也会不定时地触发dispatch，无论当前在哪个页面。</p>
<p>我反思了一下Elm中的情况，得到的答案是Elm中随着组件树变化的"状态"是<em>纯数据</em>，而store并非如此，它既包含了"状态"数据，也持有了reducer/action之间的监听关系。这一点确实是我最初没有考虑到的。</p>
<p>为了应对这个问题，我考虑了几种方案：</p>
<ol>
<li><p>回到应用单一store：pageReducer的特性通过store.replaceReducer完成。当初为每个页面创建store是想让状态彻底隔离，而在replaceReducer后页面之间如果有相同的reducer则状态不会被重置，这是一个担心点。同时一个副作用是牺牲掉每个page定制化middleware的能力</p></li>
<li><p>为这类跨页面的action建立一个队列，在上个页面将action推进队列，下个页面取出再执行。此方案属于头痛医头，只能解决当前的case，对于websocket等类似问题比较无力。</p></li>
<li><p>定制thunk middleware，通过闭包获取最新的store</p></li>
</ol>
<p>在权衡方案的通用性、理解难度等方面后，目前选择了第一种。</p>
<p>其实改变没有想象中的大，只是把withRedux函数改了一下，并且有一部分功能也不再支持，比如页面覆盖commonReducers和定制middleware：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import commonMiddlewares from './commonMiddlewares';
import commonReducers from './commonReducers';

const defaultConfig = {
  pageReducers: {},
  reducers: commonReducers,
  middlewares: commonMiddlewares,
};

export const createReduxStore = (config) => {
  const finalConfig = {
    ...defaultConfig,
    ...config,
  };

  const { middlewares, reducers } = finalConfig;

  const reducerFn = combineReducers({
    ...reducers,
  });

  return applyMiddleware(
    ...middlewares,
  )(createStore)(reducerFn);
};

const store = createReduxStore();

const withRedux = config => Comp => class WithRedux extends Component {
  constructor(props) {
    super(props);

    if (config &amp;&amp; config.pageReducers) {
      store.replaceReducer(combineReducers({
        ...commonReducers,
        ...config.pageReducers,
      }));
    }
  }
  render() {
    return (
      <Provider store={store}>
        <Comp {...this.props} />
      </Provider>
    );
  }
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> commonMiddlewares <span class="hljs-keyword">from</span> <span class="hljs-string">'./commonMiddlewares'</span>;
<span class="hljs-keyword">import</span> commonReducers <span class="hljs-keyword">from</span> <span class="hljs-string">'./commonReducers'</span>;

<span class="hljs-keyword">const</span> defaultConfig = {
  <span class="hljs-attr">pageReducers</span>: {},
  <span class="hljs-attr">reducers</span>: commonReducers,
  <span class="hljs-attr">middlewares</span>: commonMiddlewares,
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> createReduxStore = <span class="hljs-function">(<span class="hljs-params">config</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> finalConfig = {
    ...defaultConfig,
    ...config,
  };

  <span class="hljs-keyword">const</span> { middlewares, reducers } = finalConfig;

  <span class="hljs-keyword">const</span> reducerFn = combineReducers({
    ...reducers,
  });

  <span class="hljs-keyword">return</span> applyMiddleware(
    ...middlewares,
  )(createStore)(reducerFn);
};

<span class="hljs-keyword">const</span> store = createReduxStore();

<span class="hljs-keyword">const</span> withRedux = <span class="hljs-function"><span class="hljs-params">config</span> =&gt;</span> Comp =&gt; <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">WithRedux</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-keyword">super</span>(props);

    <span class="hljs-keyword">if</span> (config &amp;&amp; config.pageReducers) {
      store.replaceReducer(combineReducers({
        ...commonReducers,
        ...config.pageReducers,
      }));
    }
  }
  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Provider</span> <span class="hljs-attr">store</span>=<span class="hljs-string">{store}</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Comp</span> {<span class="hljs-attr">...this.props</span>} /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">Provider</span>&gt;</span>
    );
  }
};
</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Redux状态管理之痛点、分析与改良

## 原文链接
[https://segmentfault.com/a/1190000009540007](https://segmentfault.com/a/1190000009540007)

