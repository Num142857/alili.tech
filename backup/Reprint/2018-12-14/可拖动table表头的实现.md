---
title: '可拖动table表头的实现' 
date: 2018-12-14 2:30:11
hidden: true
slug: iihvp95cbbe
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>自己做的项目碰到这样一个需求，就是对所有的表格添加表头可以拖动的效果。我一想，这不简单，分分钟钟给你做出来。拿起我的电脑，啪啪啪就敲起来了。<br><span class="img-wrap"><img data-src="/img/bV3IQT?w=720&amp;h=720" src="https://static.alili.tech/img/bV3IQT?w=720&amp;h=720" alt="emm" title="emm" style="cursor: pointer; display: inline;"></span><br>一定是哪里不对，以我的聪明才智，结果应该不是这样的，然后净下心来，好好理了下思路后，总算是做出来了。<br>至于结果嘛，我肯定是做出来的，像下面这种：<br><span class="img-wrap"><img data-src="/img/bV3Iqz?w=320&amp;h=75" src="https://static.alili.tech/img/bV3Iqz?w=320&amp;h=75" alt="难受" title="难受" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">准备</h2>
<p>首先要说明的是，我们的项目使用的表格大概只分为两类，一类是表头不固定，就是普通的表格，另一类是表头固定，<code>tbody</code>部分是可以滚动的。需要说明的是，表头固定的那种是需要用两个<code>table</code>去实现，做过的人应该也都明白。前者看起来比较简单，因为宽度是受<code>thead</code>里的<code>th</code>影响的，后者看起来就不好处理，因为你用两个table就会出现下面的情况：<br><span class="img-wrap"><img data-src="/img/bV3I2m?w=1926&amp;h=288" src="https://static.alili.tech/img/bV3I2m?w=1926&amp;h=288" alt="意外" title="意外" style="cursor: pointer; display: inline;"></span><br>emmm，这和我们想象的应该不一样，这可咋整，感觉处理起来很麻烦啊。想起看过<code>element-ui</code>中的表格，似乎有拖动表头的实现，先打开控制台看下结构吧：<br><span class="img-wrap"><img data-src="/img/bV3I5G?w=1482&amp;h=894" src="https://static.alili.tech/img/bV3I5G?w=1482&amp;h=894" alt="结构" title="结构" style="cursor: pointer; display: inline;"></span><br>呃，话说长这么大我都没用过<code>&lt;colgroup&gt;</code>和<code>&lt;col&gt;</code>这两个标签，但仔细观察上面有个<code>width</code>，看到这大概也知道是怎么回事了，打开<a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/col" rel="nofollow noreferrer" target="_blank">MDN</a>看下相关属性的描述，和想的一样，<code>width</code>能控制当前列的宽度。<br>宽度的控制我们是解决了，还有一个问题，就是拖动后，其他列的宽度改怎么改变，如下:</p>
<table><thead><tr>
<th>a</th>
<th align="center">b</th>
<th align="center">c</th>
<th align="center">d</th>
</tr></thead></table>
<p>如果我拖动a列，改变的宽度应该怎样分配到b，c，d上，我这里是这样处理的，b、c、d有个属性去表示该列是否已经被拖动过了，如果b、c、d都没拖动过，那么把a改变的宽度平分到b、c、d三列的宽度上，如果b、c、d都改变了话，那么只改变最后一列d的宽度。好了，思路已经有了，我们可以去实现了。<br>事实证明，如果按照上面的设计就太蠢了，已经改成只改变拖动列后面的列且这些列没有改变过宽度。</p>
<h2 id="articleHeader2">实现</h2>
<p>首先html结构大概是这样的:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<table>
  <thead>
    <tr>
      <th>a<th>
      <th>b<th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1<th>
      <th>2<th>
    </tr>
  </tbody>
</table>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">table</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">thead</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>a<span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>b<span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">thead</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">tbody</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>1<span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>2<span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">tbody</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span></code></pre>
<p>js方面</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  constructor (id, options) {
    this._el = document.querySelector(`#${id}`);
    // 实际使用中需要对dom结构进行判断，这里就不做了
    this._tables = Array.from(this._el.querySelectorAll('table'));
    setTimeout(() => this._resolveDom());

    this.store = {
      dragging: false,                 //是否拖动
      draggingColumn: null,            //拖动的对象
      miniWidth: 30,                   //拖动的最小宽度
      startMouseLeft: undefined,       //鼠标点击时的clientX
      startLeft: undefined,            //th右离table的距离
      startColumnLeft: undefined,      //th左离table的距离
      tableLeft: undefined,            //table离页面左边的距离,
      HColumns: [],
      BColumns: [],
    };
  };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">  <span class="hljs-keyword">constructor</span> (id, options) {
    <span class="hljs-keyword">this</span>._el = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">`#<span class="hljs-subst">${id}</span>`</span>);
    <span class="hljs-comment">// 实际使用中需要对dom结构进行判断，这里就不做了</span>
    <span class="hljs-keyword">this</span>._tables = <span class="hljs-built_in">Array</span>.from(<span class="hljs-keyword">this</span>._el.querySelectorAll(<span class="hljs-string">'table'</span>));
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">this</span>._resolveDom());

    <span class="hljs-keyword">this</span>.store = {
      <span class="hljs-attr">dragging</span>: <span class="hljs-literal">false</span>,                 <span class="hljs-comment">//是否拖动</span>
      draggingColumn: <span class="hljs-literal">null</span>,            <span class="hljs-comment">//拖动的对象</span>
      miniWidth: <span class="hljs-number">30</span>,                   <span class="hljs-comment">//拖动的最小宽度</span>
      startMouseLeft: <span class="hljs-literal">undefined</span>,       <span class="hljs-comment">//鼠标点击时的clientX</span>
      startLeft: <span class="hljs-literal">undefined</span>,            <span class="hljs-comment">//th右离table的距离</span>
      startColumnLeft: <span class="hljs-literal">undefined</span>,      <span class="hljs-comment">//th左离table的距离</span>
      tableLeft: <span class="hljs-literal">undefined</span>,            <span class="hljs-comment">//table离页面左边的距离,</span>
      HColumns: [],
      <span class="hljs-attr">BColumns</span>: [],
    };
  };</code></pre>
<p>添加dom:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const [ THeader ] = this._tables;
let TBody;
const Tr = THeader.tHead.rows[0];
const columns = Array.from(Tr.cells);
const Bcolgroup = document.createElement('colgroup');
const cols = columns.map((item, index) => {
  const col = document.createElement('col');
  item.dataset.index = index;
  col.width = +item.offsetWidth;
  return col;
});
cols.reduce((newDom, item) => {
  newDom.appendChild(item);
  return newDom;
}, Bcolgroup);
const HColgroup = Bcolgroup.cloneNode(true);
THeader.appendChild(HColgroup);

//不管是一个table还是两个，都把header和body提出来
if (this._tables.length === 1) {
  const [ , tbody ] = Array.from(THeader.children);
  tbody.remove();
  TBody = THeader.cloneNode();
  TBody.appendChild(Bcolgroup);
  TBody.appendChild(tbody);
  this._el.appendChild(TBody);
} else {
  [ , TBody ] = this._tables;
  TBody.appendChild(Bcolgroup);
}

//拖动时的占位线
const hold = document.createElement('div');
hold.classList.add('resizable-hold');
this._el.appendChild(hold);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> [ THeader ] = <span class="hljs-keyword">this</span>._tables;
<span class="hljs-keyword">let</span> TBody;
<span class="hljs-keyword">const</span> Tr = THeader.tHead.rows[<span class="hljs-number">0</span>];
<span class="hljs-keyword">const</span> columns = <span class="hljs-built_in">Array</span>.from(Tr.cells);
<span class="hljs-keyword">const</span> Bcolgroup = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'colgroup'</span>);
<span class="hljs-keyword">const</span> cols = columns.map(<span class="hljs-function">(<span class="hljs-params">item, index</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> col = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'col'</span>);
  item.dataset.index = index;
  col.width = +item.offsetWidth;
  <span class="hljs-keyword">return</span> col;
});
cols.reduce(<span class="hljs-function">(<span class="hljs-params">newDom, item</span>) =&gt;</span> {
  newDom.appendChild(item);
  <span class="hljs-keyword">return</span> newDom;
}, Bcolgroup);
<span class="hljs-keyword">const</span> HColgroup = Bcolgroup.cloneNode(<span class="hljs-literal">true</span>);
THeader.appendChild(HColgroup);

<span class="hljs-comment">//不管是一个table还是两个，都把header和body提出来</span>
<span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>._tables.length === <span class="hljs-number">1</span>) {
  <span class="hljs-keyword">const</span> [ , tbody ] = <span class="hljs-built_in">Array</span>.from(THeader.children);
  tbody.remove();
  TBody = THeader.cloneNode();
  TBody.appendChild(Bcolgroup);
  TBody.appendChild(tbody);
  <span class="hljs-keyword">this</span>._el.appendChild(TBody);
} <span class="hljs-keyword">else</span> {
  [ , TBody ] = <span class="hljs-keyword">this</span>._tables;
  TBody.appendChild(Bcolgroup);
}

<span class="hljs-comment">//拖动时的占位线</span>
<span class="hljs-keyword">const</span> hold = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'div'</span>);
hold.classList.add(<span class="hljs-string">'resizable-hold'</span>);
<span class="hljs-keyword">this</span>._el.appendChild(hold);</code></pre>
<p>上面这块就是添加节点的，对<code>dom</code>进行处理，为了复用，这里我们不管你是表头固定还是表头不固定，我们都拆分为两个<code>table</code>，这样处理起来也方便的多。<br>然后就是处理手指移到列右侧<code>cursor</code>的值设为<code>col-resize</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="handleMouseMove(evt) {
  //...
  if (!this.store.dragging) {
    const rect = target.getBoundingClientRect();
    const bodyStyle = document.body.style;
    if (rect.width > 12 &amp;&amp; rect.right - event.pageX < 8) {
      bodyStyle.cursor = 'col-resize';
      target.style.cursor = 'col-resize';
      this.store.draggingColumn = target;
    } else {
      bodyStyle.cursor = '';
      target.style.cursor = 'pointer';
      this.store.draggingColumn = null;
    }
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">handleMouseMove(evt) {
  <span class="hljs-comment">//...</span>
  <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.store.dragging) {
    <span class="hljs-keyword">const</span> rect = target.getBoundingClientRect();
    <span class="hljs-keyword">const</span> bodyStyle = <span class="hljs-built_in">document</span>.body.style;
    <span class="hljs-keyword">if</span> (rect.width &gt; <span class="hljs-number">12</span> &amp;&amp; rect.right - event.pageX &lt; <span class="hljs-number">8</span>) {
      bodyStyle.cursor = <span class="hljs-string">'col-resize'</span>;
      target.style.cursor = <span class="hljs-string">'col-resize'</span>;
      <span class="hljs-keyword">this</span>.store.draggingColumn = target;
    } <span class="hljs-keyword">else</span> {
      bodyStyle.cursor = <span class="hljs-string">''</span>;
      target.style.cursor = <span class="hljs-string">'pointer'</span>;
      <span class="hljs-keyword">this</span>.store.draggingColumn = <span class="hljs-literal">null</span>;
    }
  }
};</code></pre>
<p>需要注意的是，<code>getBoundingClientRect()</code>获取的<code>rigth</code>是元素右侧距离页面左边缘的距离，不是离页面右边缘的距离。这里就是给<code>thead</code>的<code>tr</code>添加<code>mousemove</code>事件，当鼠标指针距离右边缘小于8的时候，改变指针形状，然后改变<code>store</code>里的状态，表示此时点击是可以拖动的了。<br>然后就是<code>mousedown</code>+<code>mousemove</code>+<code>mouseup</code>来处理拖动了:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const handleMouseDown = (evt) => {
  if (this.store.draggingColumn) {
    this.store.dragging = true;

    let { target } = evt;
    if (!target) return;

    const tableEle = THeader;
    const tableLeft = tableEle.getBoundingClientRect().left;
    const columnRect = target.getBoundingClientRect();
    const minLeft = columnRect.left - tableLeft + 30;
    target.classList.add('noclick');

    this.store.startMouseLeft = evt.clientX;
    this.store.startLeft = columnRect.right - tableLeft;
    this.store.startColumnLeft = columnRect.left - tableLeft;
    this.store.tableLeft = tableLeft;

    document.onselectstart = () => false;
    document.ondragstart = () => false;

    hold.style.display = 'block';
    hold.style.left = this.store.startLeft + 'px';

    const handleOnMouseMove = (event) => {
      const deltaLeft = event.clientX - this.store.startMouseLeft;
      const proxyLeft = this.store.startLeft + deltaLeft;

      hold.style.left = Math.max(minLeft, proxyLeft) + 'px';
    };

    // 宽度是这样分配的，举个?，如果a,b,c,d，他们每个都有个changed状态，默认false，拖过a,a.changed改为true，改变的宽度就由剩下的b,c,d平摊，如果都改变了，就让最后一个元素d背锅
    const handleOnMouseUp = (event) => {
      if (this.store.dragging) {
        const { startColumnLeft } = this.store;
        const finalLeft = parseInt(hold.style.left, 10);
        const columnWidth = finalLeft - startColumnLeft;
        const index = +target.dataset.index;
        HColgroup.children[index].width = columnWidth;

        if (index !== this.store.HColumns.length - 1) {
          this.store.HColumns[index].isChange = true;
        }
        const deltaLeft = event.clientX - this.store.startMouseLeft;
        const changeColumns = this.store.HColumns.filter(v => !v.isChange &amp;&amp; +v.el.width > 30);
        changeColumns.forEach(item => {
          item.el.width = +item.el.width - deltaLeft / changeColumns.length;
        });

        this.store.BColumns.forEach((item, i) => {
          item.el.width = this.store.HColumns[i].el.width;
        });

        //...init store
      }

      document.removeEventListener('mousemove', handleOnMouseMove);
      document.removeEventListener('mouseup', handleOnMouseUp);
      document.onselectstart = null;
      document.ondragstart = null;

      // noclick主要是用来判断是点击还是拖动，防止拖动触发排序
      setTimeout(() => {
        target.classList.remove('noclick');
      }, 0);
    };

    document.addEventListener('mouseup', handleOnMouseUp);
    document.addEventListener('mousemove', handleOnMouseMove);
  }
};
Tr.addEventListener('mousedown', handleMouseDown);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> handleMouseDown = <span class="hljs-function">(<span class="hljs-params">evt</span>) =&gt;</span> {
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.store.draggingColumn) {
    <span class="hljs-keyword">this</span>.store.dragging = <span class="hljs-literal">true</span>;

    <span class="hljs-keyword">let</span> { target } = evt;
    <span class="hljs-keyword">if</span> (!target) <span class="hljs-keyword">return</span>;

    <span class="hljs-keyword">const</span> tableEle = THeader;
    <span class="hljs-keyword">const</span> tableLeft = tableEle.getBoundingClientRect().left;
    <span class="hljs-keyword">const</span> columnRect = target.getBoundingClientRect();
    <span class="hljs-keyword">const</span> minLeft = columnRect.left - tableLeft + <span class="hljs-number">30</span>;
    target.classList.add(<span class="hljs-string">'noclick'</span>);

    <span class="hljs-keyword">this</span>.store.startMouseLeft = evt.clientX;
    <span class="hljs-keyword">this</span>.store.startLeft = columnRect.right - tableLeft;
    <span class="hljs-keyword">this</span>.store.startColumnLeft = columnRect.left - tableLeft;
    <span class="hljs-keyword">this</span>.store.tableLeft = tableLeft;

    <span class="hljs-built_in">document</span>.onselectstart = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-literal">false</span>;
    <span class="hljs-built_in">document</span>.ondragstart = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-literal">false</span>;

    hold.style.display = <span class="hljs-string">'block'</span>;
    hold.style.left = <span class="hljs-keyword">this</span>.store.startLeft + <span class="hljs-string">'px'</span>;

    <span class="hljs-keyword">const</span> handleOnMouseMove = <span class="hljs-function">(<span class="hljs-params">event</span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> deltaLeft = event.clientX - <span class="hljs-keyword">this</span>.store.startMouseLeft;
      <span class="hljs-keyword">const</span> proxyLeft = <span class="hljs-keyword">this</span>.store.startLeft + deltaLeft;

      hold.style.left = <span class="hljs-built_in">Math</span>.max(minLeft, proxyLeft) + <span class="hljs-string">'px'</span>;
    };

    <span class="hljs-comment">// 宽度是这样分配的，举个?，如果a,b,c,d，他们每个都有个changed状态，默认false，拖过a,a.changed改为true，改变的宽度就由剩下的b,c,d平摊，如果都改变了，就让最后一个元素d背锅</span>
    <span class="hljs-keyword">const</span> handleOnMouseUp = <span class="hljs-function">(<span class="hljs-params">event</span>) =&gt;</span> {
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.store.dragging) {
        <span class="hljs-keyword">const</span> { startColumnLeft } = <span class="hljs-keyword">this</span>.store;
        <span class="hljs-keyword">const</span> finalLeft = <span class="hljs-built_in">parseInt</span>(hold.style.left, <span class="hljs-number">10</span>);
        <span class="hljs-keyword">const</span> columnWidth = finalLeft - startColumnLeft;
        <span class="hljs-keyword">const</span> index = +target.dataset.index;
        HColgroup.children[index].width = columnWidth;

        <span class="hljs-keyword">if</span> (index !== <span class="hljs-keyword">this</span>.store.HColumns.length - <span class="hljs-number">1</span>) {
          <span class="hljs-keyword">this</span>.store.HColumns[index].isChange = <span class="hljs-literal">true</span>;
        }
        <span class="hljs-keyword">const</span> deltaLeft = event.clientX - <span class="hljs-keyword">this</span>.store.startMouseLeft;
        <span class="hljs-keyword">const</span> changeColumns = <span class="hljs-keyword">this</span>.store.HColumns.filter(<span class="hljs-function"><span class="hljs-params">v</span> =&gt;</span> !v.isChange &amp;&amp; +v.el.width &gt; <span class="hljs-number">30</span>);
        changeColumns.forEach(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> {
          item.el.width = +item.el.width - deltaLeft / changeColumns.length;
        });

        <span class="hljs-keyword">this</span>.store.BColumns.forEach(<span class="hljs-function">(<span class="hljs-params">item, i</span>) =&gt;</span> {
          item.el.width = <span class="hljs-keyword">this</span>.store.HColumns[i].el.width;
        });

        <span class="hljs-comment">//...init store</span>
      }

      <span class="hljs-built_in">document</span>.removeEventListener(<span class="hljs-string">'mousemove'</span>, handleOnMouseMove);
      <span class="hljs-built_in">document</span>.removeEventListener(<span class="hljs-string">'mouseup'</span>, handleOnMouseUp);
      <span class="hljs-built_in">document</span>.onselectstart = <span class="hljs-literal">null</span>;
      <span class="hljs-built_in">document</span>.ondragstart = <span class="hljs-literal">null</span>;

      <span class="hljs-comment">// noclick主要是用来判断是点击还是拖动，防止拖动触发排序</span>
      setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        target.classList.remove(<span class="hljs-string">'noclick'</span>);
      }, <span class="hljs-number">0</span>);
    };

    <span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">'mouseup'</span>, handleOnMouseUp);
    <span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">'mousemove'</span>, handleOnMouseMove);
  }
};
Tr.addEventListener(<span class="hljs-string">'mousedown'</span>, handleMouseDown);</code></pre>
<p><a href="https://shiyangzhaoa.github.io/table-resizable/" rel="nofollow noreferrer" target="_blank">预览效果</a> (chrome + Safari + Firefox)</p>
<h2 id="articleHeader3">总结</h2>
<p>觉得很有意思也很有用的东西，也让自己涨了很多姿势，<a href="https://github.com/shiyangzhaoa/table-resizable" rel="nofollow noreferrer" target="_blank">源码</a>，已经做成类的形式，使用起来还算简单，因为是突然提出的需求，还未做过多测试，可能存在不知道的bug。</p>
<h2 id="articleHeader4">祝福</h2>
<p>写在最后，马上就要过年了，心情还是非常happy的。那么，我就在这里提前祝大家新年大吉、、吧，皮一下才开心，哎嘿嘿。拜拜～<br><span class="img-wrap"><img data-src="/img/bV3JjL?w=426&amp;h=240" src="https://static.alili.tech/img/bV3JjL?w=426&amp;h=240" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader5">后续补充</h2>
<p>更改了宽度改变的方式，应该是只改变拖动列后面的列的宽度。有BUG，<code>colgroup</code>放在了<code>thead</code>下面，导致在safari下面有BUG，已经修复了，看的不仔细，但上面的代码还没有改，看代码的化还是去看<a href="https://github.com/shiyangzhaoa/table-resizable" rel="nofollow noreferrer" target="_blank">源码</a>，我没发现这个问题，别人帮我找出来的。<br>emmmmm，又发现了一个问题，就是拖动最后一列时。。。我想想，先睡了==</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
可拖动table表头的实现

## 原文链接
[https://segmentfault.com/a/1190000013243185](https://segmentfault.com/a/1190000013243185)

