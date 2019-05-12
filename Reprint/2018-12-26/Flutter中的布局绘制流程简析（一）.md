---
title: 'Flutter中的布局绘制流程简析（一）' 
date: 2018-12-26 2:30:14
hidden: true
slug: bdr5zu2oax4
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">开始</h1>
<p>Flutter对比前端流行的框架，除了构建控件树和控件状态管理等，还多了布局和绘制的流程，布局和绘制以往都是前端开发可望而不可及的都被封锁在浏览器渲染引擎的实现里面，而我们只能通过文档或者做一些demo去深入，就像盲人摸象，很多时候都是只知其一不知其二。相对而言，Flutter把这个黑盒打开了，意味着我们可以做更加深入的优化，开发效率也能成倍提高。<br>接下来就去深入去了解，尽可能把这个过程完整展现给大家。</p>
<h1 id="articleHeader1">入口</h1>
<p>界面的布局和绘制在每一帧都在发生着，甚至界面没有变化，它也会存在；可以想象每一帧里面，引擎都像流水线的一样重复着几个过程：build（构建控件树），layout（布局）, paint（绘制）和 composite（合成），周而复始。那么驱动整个流水线的入口在哪里呢？<br>直接来到WidgetBinding.drawFrame方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" void drawFrame() {
    ...
    try {
      if (renderViewElement != null)
        buildOwner.buildScope(renderViewElement);
      super.drawFrame();
      buildOwner.finalizeTree();
    } finally {
     ...
    }
    ...
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs aspectj"><code> <span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">drawFrame</span><span class="hljs-params">()</span> </span>{
    ...
    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">if</span> (renderViewElement != <span class="hljs-keyword">null</span>)
        buildOwner.buildScope(renderViewElement);
      <span class="hljs-keyword">super</span>.drawFrame();
      buildOwner.finalizeTree();
    } <span class="hljs-keyword">finally</span> {
     ...
    }
    ...
  }</code></pre>
<p>这里renderViewElement就是Root了，在第一帧的时候，控件树还没有构建，当然也不存在renderViewElement了；而接下来buildOwner这个对象是干嘛的呢？</p>
<h2 id="articleHeader2">BuilderOwner</h2>
<p>先看一下从哪里开始会用到builderOwner的方法：<br><span class="img-wrap"><img data-src="/img/bVXQ5e?w=674&amp;h=295" src="https://static.alili.tech/img/bVXQ5e?w=674&amp;h=295" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>可以看到我们经常使用setState方法就与BuilderOwner紧密关联了，接着再看BuilderOwner.scheduleBuildFor方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="void scheduleBuildFor(Element element) {
    ...
    if (element._inDirtyList) {
      ...
      _dirtyElementsNeedsResorting = true;
      return;
    }
    if (!_scheduledFlushDirtyElements &amp;&amp; onBuildScheduled != null) {
      _scheduledFlushDirtyElements = true;
      onBuildScheduled();
    }
    _dirtyElements.add(element);
    element._inDirtyList = true;
   ...
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-literal">void</span> scheduleBuildFor(Element element) {
    <span class="hljs-params">...</span>
    <span class="hljs-keyword">if</span> (element._inDirtyList) {
      <span class="hljs-params">...</span>
      _dirtyElementsNeedsResorting = <span class="hljs-literal">true</span>;
      <span class="hljs-keyword">return</span>;
    }
    <span class="hljs-keyword">if</span> (!_scheduledFlushDirtyElements &amp;&amp; onBuildScheduled != <span class="hljs-built_in">null</span>) {
      _scheduledFlushDirtyElements = <span class="hljs-literal">true</span>;
      onBuildScheduled();
    }
    _dirtyElements.add(element);
    element._inDirtyList = <span class="hljs-literal">true</span>;
   <span class="hljs-params">...</span>
  }</code></pre>
<p>这里的处理过程：如果_scheduledFlushDirtyElements不为true，就调起onBuildScheduled方法，并把Elment都加入到_dirtyElements中，那么onBuildScheduled又会干些啥尼？<br>回到WidgetBinding.initInstances方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" void initInstances() {
    super.initInstances();
    ...
    buildOwner.onBuildScheduled = _handleBuildScheduled;
    ...
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs aspectj"><code> <span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">initInstances</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">super</span>.initInstances();
    ...
    buildOwner.onBuildScheduled = _handleBuildScheduled;
    ...
  }</code></pre>
<p>看到真实调用的是WidgetBinding._handleBuildScheduled方法，我们继续完善刚才的调用过程：<br><span class="img-wrap"><img data-src="/img/bVXQ7w?w=921&amp;h=562" src="https://static.alili.tech/img/bVXQ7w?w=921&amp;h=562" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>所以这里就可以看到我们调用setState方法最终会触发界面新的一帧绘制。</p>
<p>当触发新的一帧时，我们又回到最初的WidgetBinding.drawFrame方法中，那么builderOwner.buildScope方法究竟会干些工作：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="void buildScope(Element context, [VoidCallback callback]) {
    if (callback == null &amp;&amp; _dirtyElements.isEmpty)
      return;
    ..l
    Timeline.startSync('Build', arguments: timelineWhitelistArguments);
    try {
      _scheduledFlushDirtyElements = true;
      if (callback != null) {
        
        _dirtyElementsNeedsResorting = false;
        try {
          callback();
        } finally {
         ...
        }
      }
      _dirtyElements.sort(Element._sort);
      _dirtyElementsNeedsResorting = false;
      int dirtyCount = _dirtyElements.length;
      int index = 0;
      while (index < dirtyCount) {
        ...
        try {
          _dirtyElements[index].rebuild();
        } catch (e, stack) {
          ...
        }
        index += 1;
        if (dirtyCount < _dirtyElements.length || _dirtyElementsNeedsResorting) {
          _dirtyElements.sort(Element._sort);
          _dirtyElementsNeedsResorting = false;
          dirtyCount = _dirtyElements.length;
          while (index > 0 &amp;&amp; _dirtyElements[index - 1].dirty) {
            index -= 1;
          }
        }
      }
        ...
        return true;
      }());
    } finally {
      for (Element element in _dirtyElements) {
        assert(element._inDirtyList);
        element._inDirtyList = false;
      }
      _dirtyElements.clear();
      _scheduledFlushDirtyElements = false;
      _dirtyElementsNeedsResorting = null;
      Timeline.finishSync();
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code>void buildScope(Element context, [VoidCallback callback]) {
    <span class="hljs-keyword">if</span> (callback == null &amp;&amp; <span class="hljs-variable">_dirtyElements</span>.isEmpty)
      return;
    ..l
    Timeline.startSync(<span class="hljs-string">'Build'</span>, arguments: timelineWhitelistArguments);
    <span class="hljs-keyword">try</span> {
      <span class="hljs-variable">_scheduledFlushDirtyElements</span> = <span class="hljs-literal">true</span>;
      <span class="hljs-keyword">if</span> (callback != null) {
        
        <span class="hljs-variable">_dirtyElementsNeedsResorting</span> = <span class="hljs-literal">false</span>;
        <span class="hljs-keyword">try</span> {
          callback();
        } finally {
         ...
        }
      }
      <span class="hljs-variable">_dirtyElements</span>.<span class="hljs-built_in">sort</span>(Element.<span class="hljs-variable">_sort</span>);
      <span class="hljs-variable">_dirtyElementsNeedsResorting</span> = <span class="hljs-literal">false</span>;
      int dirtyCount = <span class="hljs-variable">_dirtyElements</span>.length;
      int index = <span class="hljs-number">0</span>;
      <span class="hljs-keyword">while</span> (index &lt; dirtyCount) {
        ...
        <span class="hljs-keyword">try</span> {
          <span class="hljs-variable">_dirtyElements</span>[index].rebuild();
        } <span class="hljs-keyword">catch</span> (e, stack) {
          ...
        }
        index += <span class="hljs-number">1</span>;
        <span class="hljs-keyword">if</span> (dirtyCount &lt; <span class="hljs-variable">_dirtyElements</span>.length || <span class="hljs-variable">_dirtyElementsNeedsResorting</span>) {
          <span class="hljs-variable">_dirtyElements</span>.<span class="hljs-built_in">sort</span>(Element.<span class="hljs-variable">_sort</span>);
          <span class="hljs-variable">_dirtyElementsNeedsResorting</span> = <span class="hljs-literal">false</span>;
          dirtyCount = <span class="hljs-variable">_dirtyElements</span>.length;
          <span class="hljs-keyword">while</span> (index &gt; <span class="hljs-number">0</span> &amp;&amp; <span class="hljs-variable">_dirtyElements</span>[index - <span class="hljs-number">1</span>].dirty) {
            index -= <span class="hljs-number">1</span>;
          }
        }
      }
        ...
        return <span class="hljs-literal">true</span>;
      }());
    } finally {
      <span class="hljs-keyword">for</span> (Element element <span class="hljs-built_in">in</span> <span class="hljs-variable">_dirtyElements</span>) {
        <span class="hljs-built_in">assert</span>(element.<span class="hljs-variable">_inDirtyList</span>);
        element.<span class="hljs-variable">_inDirtyList</span> = <span class="hljs-literal">false</span>;
      }
      <span class="hljs-variable">_dirtyElements</span>.clear();
      <span class="hljs-variable">_scheduledFlushDirtyElements</span> = <span class="hljs-literal">false</span>;
      <span class="hljs-variable">_dirtyElementsNeedsResorting</span> = null;
      Timeline.finishSync();
    }
  }</code></pre>
<p>首先把_scheduledFlushDirtyElements标记设为true，表示正在从新构建新的控件树，然后_dirtyElements会做一轮排序，看一下Element._sort的方法如何实现的:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="static int _sort(Element a, Element b) {
    if (a.depth < b.depth)
      return -1;
    if (b.depth < a.depth)
      return 1;
    if (b.dirty &amp;&amp; !a.dirty)
      return -1;
    if (a.dirty &amp;&amp; !b.dirty)
      return 1;
    return 0;
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>static int _sort(Element a, Element b) {
    <span class="hljs-keyword">if</span> (a.depth &lt; b.depth)
      <span class="hljs-keyword">return</span> <span class="hljs-number">-1</span>;
    <span class="hljs-keyword">if</span> (b.depth &lt; a.depth)
      <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
    <span class="hljs-keyword">if</span> (b.dirty &amp;&amp; !a.dirty)
      <span class="hljs-keyword">return</span> <span class="hljs-number">-1</span>;
    <span class="hljs-keyword">if</span> (a.dirty &amp;&amp; !b.dirty)
      <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>;
  }</code></pre>
<p>嗯，因为在这里最初排序都是标记为dirty的Element，所以最后的结果是，depth小的Element会排最前，depth大的排最后；也就是说父Element会比子Element更早被rebuild，这样可以防止子Element会重复rebuild。<br>当在rebuild过程中有可能会加入新的Dirty Element，所以每次rebuild的时候都会重新检查_dirtyElements是否有增加或者检查_dirtyElementsNeedsResorting标记位，接着从新排序一遍，这个时候我们的_dirtyElements列表中就有可能存在之前已经rebuild完，dirty为false的Element了，重新排序后，depth小的和dirty不为true的会排最前，重新把index定位到第一个Dirty Element继续rebuild。<br>如果在这个过程我们想把已经rebuild过一次的Element想重复加入到_dirtyElements中，形成死循环，会怎样的尼，这个时候Element._inDirtyList还是为true，表明Element已经在_dirtyElements列表中，在开发模式下引擎会报错，给出相应提示；一般情况下是不应该出现的，万一出现就需要思考一下代码是否合理了。</p>
<p>接着先跳过super.drawFrame方法，来到builderOwner.finalizeTree方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="void finalizeTree() {
    Timeline.startSync('Finalize tree', arguments: timelineWhitelistArguments);
    try {
      lockState(() {
        _inactiveElements._unmountAll(); // this unregisters the GlobalKeys
      });
     ...
    } catch (e, stack) {
      _debugReportException('while finalizing the widget tree', e, stack);
    } finally {
      Timeline.finishSync();
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">void</span> <span class="hljs-selector-tag">finalizeTree</span>() {
    <span class="hljs-selector-tag">Timeline</span><span class="hljs-selector-class">.startSync</span>(<span class="hljs-string">'Finalize tree'</span>, <span class="hljs-attribute">arguments</span>: timelineWhitelistArguments);
    <span class="hljs-selector-tag">try</span> {
      <span class="hljs-selector-tag">lockState</span>(() {
        <span class="hljs-selector-tag">_inactiveElements</span><span class="hljs-selector-class">._unmountAll</span>(); <span class="hljs-comment">// this unregisters the GlobalKeys</span>
      });
     ...
    } <span class="hljs-selector-tag">catch</span> (e, stack) {
      <span class="hljs-selector-tag">_debugReportException</span>(<span class="hljs-string">'while finalizing the widget tree'</span>, e, stack);
    } <span class="hljs-selector-tag">finally</span> {
      <span class="hljs-selector-tag">Timeline</span><span class="hljs-selector-class">.finishSync</span>();
    }
  }</code></pre>
<p>主要把_inactiveElements都进行一次清理，所以使用GlobalKey的控件，如果想起到重用控件的效果，必须在同一帧里面完成“借用”，否则就会被清理了。</p>
<p>简单总结一下BuilderOwner的功能就是：管理控件rebuild过程，让控件有序的进行rebuild。</p>
<h2 id="articleHeader3">PipelineOwner</h2>
<p>终于来到super.drawFrame方法，这个方法实际上调起的是RenderBinding.drawFrame方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="void drawFrame() {
    pipelineOwner.flushLayout();
    pipelineOwner.flushCompositingBits();
    pipelineOwner.flushPaint();
    renderView.compositeFrame(); // this sends the bits to the GPU
    pipelineOwner.flushSemantics(); // this also sends the semantics to the OS.
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">void</span> <span class="hljs-selector-tag">drawFrame</span>() {
    <span class="hljs-selector-tag">pipelineOwner</span><span class="hljs-selector-class">.flushLayout</span>();
    <span class="hljs-selector-tag">pipelineOwner</span><span class="hljs-selector-class">.flushCompositingBits</span>();
    <span class="hljs-selector-tag">pipelineOwner</span><span class="hljs-selector-class">.flushPaint</span>();
    <span class="hljs-selector-tag">renderView</span><span class="hljs-selector-class">.compositeFrame</span>(); <span class="hljs-comment">// this sends the bits to the GPU</span>
    <span class="hljs-selector-tag">pipelineOwner</span><span class="hljs-selector-class">.flushSemantics</span>(); <span class="hljs-comment">// this also sends the semantics to the OS.</span>
  }</code></pre>
<p>我们又见到一个跟BuilderOwner名称很相似的PipelineOwner，那PipelineOwner又起到什么样的功能尼？直接深入<br>pipelineOwner.flushLayout方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="void flushLayout() {
    Timeline.startSync('Layout', arguments: timelineWhitelistArguments);
    _debugDoingLayout = true;
    try {
      while (_nodesNeedingLayout.isNotEmpty) {
        final List<RenderObject> dirtyNodes = _nodesNeedingLayout;
        _nodesNeedingLayout = <RenderObject>[];
        for (RenderObject node in dirtyNodes..sort((RenderObject a, RenderObject b) => a.depth - b.depth)) {
          if (node._needsLayout &amp;&amp; node.owner == this)
            node._layoutWithoutResize();
        }
      }
    } finally {
      _debugDoingLayout = false;
      Timeline.finishSync();
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>void flushLayout() {
    Timeline.startSync('Layout', arguments: timelineWhitelistArguments);
    _debugDoingLayout = <span class="hljs-literal">true</span>;
    try {
      while (_nodesNeedingLayout.isNotEmpty) {
        final List<span class="hljs-tag">&lt;RenderObject&gt;</span> dirtyNodes = _nodesNeedingLayout;
        _nodesNeedingLayout = <span class="hljs-tag">&lt;RenderObject&gt;</span>[];
        for (RenderObject <span class="hljs-keyword">node</span> <span class="hljs-title">in</span> dirtyNodes..sort((RenderObject a, RenderObject b) =&gt; a.depth - b.depth)) {
          if (<span class="hljs-keyword">node</span>.<span class="hljs-title">_needsLayout</span> &amp;&amp; <span class="hljs-keyword">node</span>.<span class="hljs-title">owner</span> == this)
            <span class="hljs-keyword">node</span>.<span class="hljs-title">_layoutWithoutResize</span>();
        }
      }
    } finally {
      _debugDoingLayout = <span class="hljs-literal">false</span>;
      Timeline.finishSync();
    }
  }</code></pre>
<p>跟builderOwner处理相似，先进行一次排序，depth小的排最前优先处理，然后调起RenderObject._layoutWithoutResize方法。</p>
<p>暂时先整理一下，这个时候我们出现三个名词：Widget，Element，RenderObject；它们的关系究竟是咋样的尼，假设你熟悉前端的Vue或者React框架，它们的关系等同于下面这张图:</p>
<p><span class="img-wrap"><img data-src="/img/bVXR9T?w=790&amp;h=329" src="https://static.alili.tech/img/bVXR9T?w=790&amp;h=329" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>也就是说RenderObject负责着界面的布局绘制和事件处理等；而Element则是进行virtual dom diff，并且负责创建RenderObject；Widget则是我们控件业务逻辑组织的地方， 负责创建Element。</p>
<p>大概可以想到PipelineOwner的主要功能：负责管理那些dirty render object，让它们进行布局和绘制。</p>
<p>接着RenderObject._layoutWithoutResize方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="void _layoutWithoutResize() {
    ...
    try {
      performLayout();
      markNeedsSemanticsUpdate();
    } catch (e, stack) {
      _debugReportException('performLayout', e, stack);
    }
    ...
    _needsLayout = false;
    markNeedsPaint();
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-literal">void</span> _layoutWithoutResize() {
    <span class="hljs-params">...</span>
    try {
      performLayout();
      markNeedsSemanticsUpdate();
    } catch (e, <span class="hljs-built_in">stack</span>) {
      _debugReportException(<span class="hljs-string">'performLayout'</span>, e, <span class="hljs-built_in">stack</span>);
    }
    <span class="hljs-params">...</span>
    _needsLayout = <span class="hljs-literal">false</span>;
    markNeedsPaint();
  }</code></pre>
<p>可以看到其实直接调用了RenderObject.performLayout方法，而这个方法则是应由开发者自己实现的布局逻辑，接着会调起RenderObject.markNeedsPaint方法，也就是说每次重新layout都会触发一次paint。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="void markNeedsPaint() {
    if (_needsPaint)
      return;
    _needsPaint = true;
    if (isRepaintBoundary) {
      if (owner != null) {
        owner._nodesNeedingPaint.add(this);
        owner.requestVisualUpdate();
      }
    } else if (parent is RenderObject) {
      final RenderObject parent = this.parent;
      parent.markNeedsPaint();
    } else {
      if (owner != null)
        owner.requestVisualUpdate();
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>void markNeedsPaint() {
    <span class="hljs-keyword">if</span> (_needsPaint)
      <span class="hljs-keyword">return</span>;
    _needsPaint = <span class="hljs-literal">true</span>;
    <span class="hljs-keyword">if</span> (isRepaintBoundary) {
      <span class="hljs-keyword">if</span> (owner != <span class="hljs-literal">null</span>) {
        owner._nodesNeedingPaint.add(<span class="hljs-keyword">this</span>);
        owner.requestVisualUpdate();
      }
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (parent <span class="hljs-keyword">is</span> RenderObject) {
      <span class="hljs-keyword">final</span> RenderObject parent = <span class="hljs-keyword">this</span>.parent;
      parent.markNeedsPaint();
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">if</span> (owner != <span class="hljs-literal">null</span>)
        owner.requestVisualUpdate();
    }
  }</code></pre>
<p>这里的逻辑，主要判断当前的RenderObject.isRepaintBoundary是否为true，如果是则把当前RenderObject加入到PipelineOwner对应的列表中等待接下来的flushPaint处理，并触发下一帧的绘制；当isRepaintBoundary不为true的时候，则会一直往上查找直到找到isRepaintBoundary为true的RenderObject，也就是有可能会找到根节点RenderView，然后加入到_nodesNeedingPaint列表中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class RenderView extends RenderObject with RenderObjectWithChildMixin<RenderBox> {
    ...
    bool get isRepaintBoundary => true;
    ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">RenderView</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">RenderObject</span> <span class="hljs-keyword">with</span> <span class="hljs-title">RenderObjectWithChildMixin&lt;RenderBox&gt;</span> </span>{
    ...
    bool get isRepaintBoundary =&gt; <span class="hljs-literal">true</span>;
    ...
}</code></pre>
<p>这样的话我们就得注意了，如果经常需要重绘区域，最好把isRepaintBoundary标记true，这样就尽量避免触发全局重绘，提高性能，对应的flutter就已经提供了一个RepaintBoundary控件，自动把isRepaintBoundary标记为true，非常方便我们去做优化。</p>
<p>既然有markNeedsPaint方法，当然也有markNeedsLayout方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="void markNeedsLayout() {
    if (_needsLayout) {
      return;
    }
    if (_relayoutBoundary != this) {
      markParentNeedsLayout();
    } else {
      _needsLayout = true;
      if (owner != null) {
        ...
        owner._nodesNeedingLayout.add(this);
        owner.requestVisualUpdate();
      }
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">markNeedsLayout</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">if</span> (_needsLayout) {
      <span class="hljs-keyword">return</span>;
    }
    <span class="hljs-keyword">if</span> (_relayoutBoundary != <span class="hljs-keyword">this</span>) {
      markParentNeedsLayout();
    } <span class="hljs-keyword">else</span> {
      _needsLayout = <span class="hljs-literal">true</span>;
      <span class="hljs-keyword">if</span> (owner != <span class="hljs-literal">null</span>) {
        ...
        owner._nodesNeedingLayout.<span class="hljs-keyword">add</span>(<span class="hljs-keyword">this</span>);
        owner.requestVisualUpdate();
      }
    }
  }</code></pre>
<p>处理逻辑基本上跟markNeedsPaint差不多，_relayoutBoundary也可以减少全局重新布局，可以把布局范围缩小，提高性能，但是_relayoutBoundary的设置是有点不一样的，等会再去讨论。</p>
<h2 id="articleHeader4">简单整理一下</h2>
<p>当我们用调起setState改变某些状态，例如：控件的高度；先回到BuilderOwner.buildScope，继续dirty element的rebuild方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="void rebuild() {
    if (!_active || !_dirty)
      return;
    performRebuild();
  }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code><span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">rebuild</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">if</span> (!_active || !_dirty)
      <span class="hljs-keyword">return</span>;
    performRebuild();
  }
</code></pre>
<p>接着执行performRebuild方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  void performRebuild() {
    Widget built;
    try {
      built = build();
      debugWidgetBuilderValue(widget, built);
    } catch (e, stack) {
      _debugReportException('building $this', e, stack);
      built = new ErrorWidget(e);
    } finally {
      // We delay marking the element as clean until after calling build() so
      // that attempts to markNeedsBuild() during build() will be ignored.
      _dirty = false;
      assert(_debugSetAllowIgnoredCallsToMarkNeedsBuild(false));
    }
    try {
      _child = updateChild(_child, built, slot);
      assert(_child != null);
    } catch (e, stack) {
      _debugReportException('building $this', e, stack);
      built = new ErrorWidget(e);
      _child = updateChild(null, built, slot);
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code>  void performRebuild() {
    Widget built;
    <span class="hljs-keyword">try</span> {
      built = build();
      debugWidgetBuilderValue(widget, built);
    } <span class="hljs-keyword">catch</span> (e, stack) {
      <span class="hljs-variable">_debugReportException</span>(<span class="hljs-string">'building $this'</span>, e, stack);
      built = new ErrorWidget(e);
    } finally {
      <span class="hljs-comment">// We delay marking the element as clean until after calling build() so</span>
      <span class="hljs-comment">// that attempts to markNeedsBuild() during build() will be ignored.</span>
      <span class="hljs-variable">_dirty</span> = <span class="hljs-literal">false</span>;
      <span class="hljs-built_in">assert</span>(<span class="hljs-variable">_debugSetAllowIgnoredCallsToMarkNeedsBuild</span>(<span class="hljs-literal">false</span>));
    }
    <span class="hljs-keyword">try</span> {
      <span class="hljs-variable">_child</span> = updateChild(<span class="hljs-variable">_child</span>, built, slot);
      <span class="hljs-built_in">assert</span>(<span class="hljs-variable">_child</span> != null);
    } <span class="hljs-keyword">catch</span> (e, stack) {
      <span class="hljs-variable">_debugReportException</span>(<span class="hljs-string">'building $this'</span>, e, stack);
      built = new ErrorWidget(e);
      <span class="hljs-variable">_child</span> = updateChild(null, built, slot);
    }
  }</code></pre>
<p>控件会重新build出子控件树，然后调起updateChild方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" Element updateChild(Element child, Widget newWidget, dynamic newSlot) {
    if (newWidget == null) {
      if (child != null)
        deactivateChild(child);
      return null;
    }
    if (child != null) {
      if (child.widget == newWidget) {
        if (child.slot != newSlot)
          updateSlotForChild(child, newSlot);
        return child;
      }
      if (Widget.canUpdate(child.widget, newWidget)) {
        if (child.slot != newSlot)
          updateSlotForChild(child, newSlot);
        child.update(newWidget);
        return child;
      }
      deactivateChild(child);
    }
    return inflateWidget(newWidget, newSlot);
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code> Element updateChild(Element child, Widget <span class="hljs-keyword">new</span><span class="hljs-type">Widget</span>, <span class="hljs-keyword">dynamic</span> <span class="hljs-keyword">new</span><span class="hljs-type">Slot</span>) {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">new</span><span class="hljs-type">Widget</span> == <span class="hljs-literal">null</span>) {
      <span class="hljs-keyword">if</span> (child != <span class="hljs-literal">null</span>)
        deactivateChild(child);
      <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
    }
    <span class="hljs-keyword">if</span> (child != <span class="hljs-literal">null</span>) {
      <span class="hljs-keyword">if</span> (child.widget == <span class="hljs-keyword">new</span><span class="hljs-type">Widget</span>) {
        <span class="hljs-keyword">if</span> (child.slot != <span class="hljs-keyword">new</span><span class="hljs-type">Slot</span>)
          updateSlotForChild(child, <span class="hljs-keyword">new</span><span class="hljs-type">Slot</span>);
        <span class="hljs-keyword">return</span> child;
      }
      <span class="hljs-keyword">if</span> (Widget.canUpdate(child.widget, <span class="hljs-keyword">new</span><span class="hljs-type">Widget</span>)) {
        <span class="hljs-keyword">if</span> (child.slot != <span class="hljs-keyword">new</span><span class="hljs-type">Slot</span>)
          updateSlotForChild(child, <span class="hljs-keyword">new</span><span class="hljs-type">Slot</span>);
        child.update(<span class="hljs-keyword">new</span><span class="hljs-type">Widget</span>);
        <span class="hljs-keyword">return</span> child;
      }
      deactivateChild(child);
    }
    <span class="hljs-keyword">return</span> inflateWidget(<span class="hljs-keyword">new</span><span class="hljs-type">Widget</span>, <span class="hljs-keyword">new</span><span class="hljs-type">Slot</span>);
  }</code></pre>
<ol>
<li><p>如果newWidget为null但是child不为null，也就是删除原来的控件，就会调起deactivateChild方法，会把当前的Element加入到BuilderOwner._inactiveElements列表中（最后可能会被清除也可能会被重用）。</p></li>
<li><p>如果newWidget和child都不为null，也就是更新原来的控件，先调起Widget.canUpdate方法判断是否能够更新（一般都是根据Widget运行时类型是否相同来判断），如果相同调起update方法，继续更新的逻辑，如果不一样，就要deactivate原来的控件，并且创建新的控件。</p></li>
<li><p>如果child为null而Widegt不为null，也就是要创建新的控件。</p></li>
</ol>
<p>接下来会分别分析更新的逻辑和创建的逻辑：</p>
<ul><li><p>更新</p></li></ul>
<p>直接来到StatefulElement.update方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="void update(StatefulWidget newWidget) {
    super.update(newWidget);
    final StatefulWidget oldWidget = _state._widget;
    _dirty = true;
    _state._widget = widget;
    try {
      _state.didUpdateWidget(oldWidget);
    } finally {
    }
    rebuild();
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code>void update(StatefulWidget newWidget) {
    super.update(newWidget);
    final StatefulWidget oldWidget = <span class="hljs-variable">_state</span>.<span class="hljs-variable">_widget</span>;
    <span class="hljs-variable">_dirty</span> = <span class="hljs-literal">true</span>;
    <span class="hljs-variable">_state</span>.<span class="hljs-variable">_widget</span> = widget;
    <span class="hljs-keyword">try</span> {
      <span class="hljs-variable">_state</span>.didUpdateWidget(oldWidget);
    } finally {
    }
    rebuild();
  }</code></pre>
<p>这里首先会调起一个控件很重要的生命回调didUpdateWidget，综合上述可以知道，这里是当新的子控件和旧的子控件类型一致时才会调起；接着就是子控件的rebuild过程，然后不停重复下去。</p>
<ul><li><p>创建</p></li></ul>
<p>直接来到Element.inflateWidget方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Element inflateWidget(Widget newWidget, dynamic newSlot) {
    final Key key = newWidget.key;
    if (key is GlobalKey) {
      final Element newChild = _retakeInactiveElement(key, newWidget);
      if (newChild != null) {
        newChild._activateWithParent(this, newSlot);
        final Element updatedChild = updateChild(newChild, newWidget, newSlot)
        return updatedChild;
      }
    }
    final Element newChild = newWidget.createElement();
    newChild.mount(this, newSlot);
    return newChild;
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code>Element inflateWidget(Widget <span class="hljs-keyword">new</span><span class="hljs-type">Widget</span>, <span class="hljs-keyword">dynamic</span> <span class="hljs-keyword">new</span><span class="hljs-type">Slot</span>) {
    final Key key = <span class="hljs-keyword">new</span><span class="hljs-type">Widget</span>.key;
    <span class="hljs-keyword">if</span> (key is GlobalKey) {
      final Element <span class="hljs-keyword">new</span><span class="hljs-type">Child</span> = _retakeInactiveElement(key, <span class="hljs-keyword">new</span><span class="hljs-type">Widget</span>);
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">new</span><span class="hljs-type">Child</span> != <span class="hljs-literal">null</span>) {
        <span class="hljs-keyword">new</span><span class="hljs-type">Child</span>._activateWithParent(<span class="hljs-built_in">this</span>, <span class="hljs-keyword">new</span><span class="hljs-type">Slot</span>);
        final Element updatedChild = updateChild(<span class="hljs-keyword">new</span><span class="hljs-type">Child</span>, <span class="hljs-keyword">new</span><span class="hljs-type">Widget</span>, <span class="hljs-keyword">new</span><span class="hljs-type">Slot</span>)
        <span class="hljs-keyword">return</span> updatedChild;
      }
    }
    final Element <span class="hljs-keyword">new</span><span class="hljs-type">Child</span> = <span class="hljs-keyword">new</span><span class="hljs-type">Widget</span>.createElement();
    <span class="hljs-keyword">new</span><span class="hljs-type">Child</span>.mount(<span class="hljs-built_in">this</span>, <span class="hljs-keyword">new</span><span class="hljs-type">Slot</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span><span class="hljs-type">Child</span>;
  }</code></pre>
<p>这里判断key是否为GlobalKey，如果是会调起_retakeInactiveElement方法，目的是从Globalkey上重用控件，并把控件从BuilderOwner._inactiveElements列表上移除，防止它被unmount，接着就是从新跑一次updateChild流程；如果不是就在新的子控件上创建新的Element,并且mount上去。</p>
<p>但是如果多个child的时候是怎么更新的尼？<br>来到MultiChildRenderObjectElement.update方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="void update(MultiChildRenderObjectWidget newWidget) {
    super.update(newWidget);
    _children = updateChildren(_children, widget.children, forgottenChildren: _forgottenChildren);
    _forgottenChildren.clear();
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code>void update(MultiChildRenderObjectWidget <span class="hljs-keyword">new</span><span class="hljs-type">Widget</span>) {
    <span class="hljs-keyword">super</span>.update(<span class="hljs-keyword">new</span><span class="hljs-type">Widget</span>);
    _children = updateChildren(_children, widget.children, forgottenChildren: <span class="hljs-type">_forgottenChildren</span>);
    _forgottenChildren.clear();
  }</code></pre>
<p>框架里面好像只规定跟RenderObject相关的控件才可以支持多个child，而updateChildren就是一个flutter版本的virtual dom diff算法的实现。</p>
<p>刚才假设我们需要修改控件的高度，既然跟显示有关，必然跟RenderObejct相关，直接来到RenderObjectElement.update方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="void update(covariant RenderObjectWidget newWidget) {
    super.update(newWidget);
    widget.updateRenderObject(this, renderObject);
    _dirty = false;
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code>void update(covariant RenderObjectWidget <span class="hljs-keyword">new</span><span class="hljs-type">Widget</span>) {
    <span class="hljs-keyword">super</span>.update(<span class="hljs-keyword">new</span><span class="hljs-type">Widget</span>);
    widget.updateRenderObject(<span class="hljs-built_in">this</span>, renderObject);
    _dirty = <span class="hljs-literal">false</span>;
  }</code></pre>
<p>最后调起的是RenderObjectWidget.updateRenderObject方法，在这里我们可以得到新创建的RenderObject，我们在这里把新的RenderObject的属性赋值给旧的RenderObject，而在RenderObject相关属性的setter方法中会调起markNeedsLayout方法，这样在下一帧布局绘制的时候就会生效。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Flutter中的布局绘制流程简析（一）

## 原文链接
[https://segmentfault.com/a/1190000011912538](https://segmentfault.com/a/1190000011912538)

