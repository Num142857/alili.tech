---
title: 'React 实现 Table 的思考' 
date: 2019-02-10 2:30:42
hidden: true
slug: cff2sokdq1o
categories: [reprint]
---

{{< raw >}}

                    
<p>Table 是最常用展示数据的方式之一，可是一个产品中往往很多非常类似的 Table，但是我们碰到的情况往往是 Table A 要排序，Table B 不需要排序，等等这种看起来非常类似，但是又不完全相同的表格。这种情况下，到底要不要抽取一个公共的 Table 组件呢？对于这个问题，我们团队也纠结了很久，先后开发了多个版本的 Table 组件，在最近的一个项目中，产出了第三版 Table 组件，能够较好的解决灵活性和公共逻辑抽取的问题。本文将会详细的讲述这种 Table 组件解决方案产出的过程和一些思考。</p>
<h2 id="articleHeader0">Table 的常见实现</h2>
<p>首先我们看到的是不使用任何组件实现一个业务表格的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react';

const columnOpts = [
  { key: 'a', name: 'col-a' },
  { key: 'b', name: 'col-b' },
];

function SomeTable(props) {
  const { data } = props;

  return (
    <div className=&quot;some-table&quot;>
      <ul className=&quot;table-header&quot;>
        {
          columnOpts.map((opt, colIndex) => (
            <li key={`col-${colIndex}`}>{opt.name}</li>
          ))
        }
      </ul>
      <ul className=&quot;table-body&quot;>
        {
          data.map((entry, rowIndex) => (
            <li key={`row-${rowIndex}`}>
              {
                columnOpts.map((opt, colIndex) => (
                  <span key={`col-${colIndex}`}>{entry[opt.key]}</span>
                ))
              }
            </li>
          ))
        }
      </ul>
    </div>
  );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-keyword">const</span> columnOpts = [
  { <span class="hljs-attr">key</span>: <span class="hljs-string">'a'</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">'col-a'</span> },
  { <span class="hljs-attr">key</span>: <span class="hljs-string">'b'</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">'col-b'</span> },
];

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">SomeTable</span>(<span class="hljs-params">props</span>) </span>{
  <span class="hljs-keyword">const</span> { data } = props;

  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"some-table"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"table-header"</span>&gt;</span>
        {
          columnOpts.map((opt, colIndex) =&gt; (
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{</span>`<span class="hljs-attr">col-</span>${<span class="hljs-attr">colIndex</span>}`}&gt;</span>{opt.name}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
          ))
        }
      <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"table-body"</span>&gt;</span>
        {
          data.map((entry, rowIndex) =&gt; (
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{</span>`<span class="hljs-attr">row-</span>${<span class="hljs-attr">rowIndex</span>}`}&gt;</span>
              {
                columnOpts.map((opt, colIndex) =&gt; (
                  <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{</span>`<span class="hljs-attr">col-</span>${<span class="hljs-attr">colIndex</span>}`}&gt;</span>{entry[opt.key]}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                ))
              }
            <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
          ))
        }
      <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}</code></pre>
<p>这种实现方法带来的问题是：</p>
<ul>
<li><p>每次写表格需要写很多布局类的样式</p></li>
<li><p>重复代码很多，而且项目成员之间很难达到统一，A 可能喜欢用表格来布局，B 可能喜欢用 ul 来布局</p></li>
<li><p>相似但是不完全相同的表格很难复用</p></li>
</ul>
<h2 id="articleHeader1">抽象过程</h2>
<p>组件是对数据和方法的一种封装，在封装之前，我们总结了一下表格型的展示的特点：</p>
<ul>
<li><p>输入数据源较统一，一般为对象数组</p></li>
<li><p>thead 中的单元格大部分只是展示一些名称，也有一些个性化的内容，如带有排序 icon 的单元格</p></li>
<li><p>tbody 中的部分单元格只是简单的读取一些值，很多单元格的都有自己的逻辑，但是在一个产品中通常很多类似的单元格</p></li>
<li><p>列是有顺序的，更适合以列为单位来添加布局样式</p></li>
</ul>
<p>基于以上特点，我们希望 Table 组件能够满足以下条件：</p>
<ul>
<li><p>接收一个 <em>对象数组</em> 和 <em>所有列的配置</em> 为参数，自动创建基础的表格内容</p></li>
<li><p>thead 和 tbody 中的单元格都能够定制化，以满足不同的需求</p></li>
</ul>
<p>至此，我们首先想到 Table 组件应该长成这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const columnOpts =  [
  { key: 'a', name: 'col-a', onRenderTd: () => {} },
  { key: 'b', name: 'col-b', onRenderTh: () => {}, onRenderTd: () => {} },
];

<Table data={data} columnOpts={columnOpts} />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> columnOpts =  [
  { <span class="hljs-attr">key</span>: <span class="hljs-string">'a'</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">'col-a'</span>, <span class="hljs-attr">onRenderTd</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {} },
  { <span class="hljs-attr">key</span>: <span class="hljs-string">'b'</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">'col-b'</span>, <span class="hljs-attr">onRenderTh</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {}, <span class="hljs-attr">onRenderTd</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {} },
];

<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Table</span> <span class="hljs-attr">data</span>=<span class="hljs-string">{data}</span> <span class="hljs-attr">columnOpts</span>=<span class="hljs-string">{columnOpts}</span> /&gt;</span></span></code></pre>
<p>其中 <code>onRenderTd</code> 和 <code>onRenderTh</code> 分别是渲染 td 和 th 时的回调函数。</p>
<p>到这里我们发现对于稍微复杂一点的 table，<code>columnOpts</code> 将会是一个非常大的配置数组，我们有没有办法不使用数组来维护这些配置呢？这里我们想到的一个办法是创建一个 <code>Column</code> 的组件，让大家可以这么来写这个 table:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Table data={data}>
  <Column dataKey=&quot;a&quot; name=&quot;col-a&quot; td={onRenderTd} />
  <Column dataKey=&quot;b&quot; name=&quot;col-b&quot; td={onRenderTd} th={onRenderTh} />
</Table>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">Table</span> <span class="hljs-attr">data</span>=<span class="hljs-string">{data}</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">Column</span> <span class="hljs-attr">dataKey</span>=<span class="hljs-string">"a"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"col-a"</span> <span class="hljs-attr">td</span>=<span class="hljs-string">{onRenderTd}</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">Column</span> <span class="hljs-attr">dataKey</span>=<span class="hljs-string">"b"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"col-b"</span> <span class="hljs-attr">td</span>=<span class="hljs-string">{onRenderTd}</span> <span class="hljs-attr">th</span>=<span class="hljs-string">{onRenderTh}</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">Table</span>&gt;</span></code></pre>
<p>这样大家就可以像写HTML一样把一个简单的表格给搭建出来了。</p>
<h3 id="articleHeader2">优化</h3>
<p>有了 Table 的雏形，再联系下写表格的常见需求，我们给 Column 添加了 <code>width</code> 和 <code>align</code> 属性。加这两个属性的原因很容易想到，因为我们在写表格相关业务时，样式里面写的最多的就是单元格的宽度和对齐方式。我们来看一下 <code>Column</code> 的实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { PropTypes, Component } from 'react';

const propTypes = {
  name: PropTypes.string,
  dataKey: PropTypes.string.isRequired,
  align: PropTypes.oneOf(['left', 'center', 'right']),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  th: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  td: PropTypes.oneOfType([
    PropTypes.element, PropTypes.func, PropTypes.oneOf([
      'int', 'float', 'percent', 'changeRate'
    ])
  ]),
};

const defaultProps = {
  align: 'left',
};

function Column() {
  return null;
}

Column.propTypes = propTypes;
Column.defaultProps = defaultProps;

export default Column;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React, { PropTypes, Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-keyword">const</span> propTypes = {
  <span class="hljs-attr">name</span>: PropTypes.string,
  <span class="hljs-attr">dataKey</span>: PropTypes.string.isRequired,
  <span class="hljs-attr">align</span>: PropTypes.oneOf([<span class="hljs-string">'left'</span>, <span class="hljs-string">'center'</span>, <span class="hljs-string">'right'</span>]),
  <span class="hljs-attr">width</span>: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  <span class="hljs-attr">th</span>: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  <span class="hljs-attr">td</span>: PropTypes.oneOfType([
    PropTypes.element, PropTypes.func, PropTypes.oneOf([
      <span class="hljs-string">'int'</span>, <span class="hljs-string">'float'</span>, <span class="hljs-string">'percent'</span>, <span class="hljs-string">'changeRate'</span>
    ])
  ]),
};

<span class="hljs-keyword">const</span> defaultProps = {
  <span class="hljs-attr">align</span>: <span class="hljs-string">'left'</span>,
};

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Column</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
}

Column.propTypes = propTypes;
Column.defaultProps = defaultProps;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Column;</code></pre>
<p>代码中可以发现 <code>th</code> 可以接收两种格式，一种是 <code>function</code>，一种是 <code>ReactElement</code>。这里提供 <code>ReactElement</code> 类型的 <code>th</code> 主要让大家能够设置一些额外的 <code>props</code>，后面我们会给出一个例子。</p>
<p><code>td</code> 的类型就更复杂了，不仅能够接收 <code>function</code> 和 <code>ReactElement</code> 这两种类型，还有 <code>int</code>, <code>float</code>, <code>percent</code>, <code>changeRate</code> 这三种类型是最常用的数据类型，这样方便我们可以在 Table 里面根据类型对数据做格式化，省去了项目成员中很多重复的代码。</p>
<p>下面我们看一下 Table 的实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const getDisplayName = (el) => {
  return el &amp;&amp; el.type &amp;&amp; (el.type.displayName || el.type.name);
};

const renderChangeRate = (changeRate) => { ... };

const renderThs = (columns) => {
  return columns.map((col, index) => {
    const { name, dataKey, th } = col.props;
    const props = { name, dataKey, colIndex: index };
    let content;
    let className;

    if (React.isValidElement(th)) {
      content = React.cloneElement(th, props);
      className = getDisplayName(th);
    } else if (_.isFunction(th)) {
      content = th(props);
    } else {
      content = name || '';
    }

    return (
      <th
        key={`th-${index}`}
        style={getStyle(col.props)}
        className={`table-th col-${index} col-${dataKey} ${className || ''}`}
      >
        {content}
      </th>
    );
  });
};

const renderTds = (data, entry, columns, rowIndex) => {
  return columns.map((col, index) => {
    const { dataKey, td } = col.props;
    const value = getValueOfTd(entry, dataKey);
    const props = { data, rowData: entry, tdValue: value, dataKey, rowIndex, colIndex: index };

    let content;
    let className;
    if (React.isValidElement(td)) {
      content = React.cloneElement(td, props);
      className = getDisplayName(td);
    } else if (td === 'changeRate') {
      content = renderChangeRate(value || '');
    } else if (_.isFunction(td)) {
      content = td(props);
    } else {
      content = formatIndex(parseValueOfTd(value), dataKey, td);
    }

    return (
      <td
        key={`td-${index}`}
        style={getStyle(col.props)}
        className={`table-td col-${index} col-${dataKey} ${className || ''}`}
      >
        {content}
      </td>
    );
  });
};

const renderRows = (data, columns) => {
  if (!data || !data.length) {return null;}

  return data.map((entry, index) => {
    return (
      <tr className=&quot;table-tbody-tr&quot; key={`tr-${index}`}>
        {renderTds(data, entry, columns, index)}
      </tr>
    );
  });
};

function Table(props) {
  const { children, data, className } = props;
  const columns = findChildrenByType(children, Column);

  return (
    <div className={`table-container ${className || ''}`}>
      <table className=&quot;base-table&quot;>
        {hasNames(columns) &amp;&amp; (
          <thead>
            <tr className=&quot;table-thead-tr&quot;>
              {renderThs(columns)}
            </tr>
          </thead>
        )}
        <tbody>{renderRows(data, columns)}</tbody>
      </table>
    </div>
  );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> getDisplayName = <span class="hljs-function">(<span class="hljs-params">el</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> el &amp;&amp; el.type &amp;&amp; (el.type.displayName || el.type.name);
};

<span class="hljs-keyword">const</span> renderChangeRate = <span class="hljs-function">(<span class="hljs-params">changeRate</span>) =&gt;</span> { ... };

<span class="hljs-keyword">const</span> renderThs = <span class="hljs-function">(<span class="hljs-params">columns</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> columns.map(<span class="hljs-function">(<span class="hljs-params">col, index</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> { name, dataKey, th } = col.props;
    <span class="hljs-keyword">const</span> props = { name, dataKey, <span class="hljs-attr">colIndex</span>: index };
    <span class="hljs-keyword">let</span> content;
    <span class="hljs-keyword">let</span> className;

    <span class="hljs-keyword">if</span> (React.isValidElement(th)) {
      content = React.cloneElement(th, props);
      className = getDisplayName(th);
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (_.isFunction(th)) {
      content = th(props);
    } <span class="hljs-keyword">else</span> {
      content = name || <span class="hljs-string">''</span>;
    }

    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">th</span>
        <span class="hljs-attr">key</span>=<span class="hljs-string">{</span>`<span class="hljs-attr">th-</span>${<span class="hljs-attr">index</span>}`}
        <span class="hljs-attr">style</span>=<span class="hljs-string">{getStyle(col.props)}</span>
        <span class="hljs-attr">className</span>=<span class="hljs-string">{</span>`<span class="hljs-attr">table-th</span> <span class="hljs-attr">col-</span>${<span class="hljs-attr">index</span>} <span class="hljs-attr">col-</span>${<span class="hljs-attr">dataKey</span>} ${<span class="hljs-attr">className</span> || ''}`}
      &gt;</span>
        {content}
      <span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span></span>
    );
  });
};

<span class="hljs-keyword">const</span> renderTds = <span class="hljs-function">(<span class="hljs-params">data, entry, columns, rowIndex</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> columns.map(<span class="hljs-function">(<span class="hljs-params">col, index</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> { dataKey, td } = col.props;
    <span class="hljs-keyword">const</span> value = getValueOfTd(entry, dataKey);
    <span class="hljs-keyword">const</span> props = { data, <span class="hljs-attr">rowData</span>: entry, <span class="hljs-attr">tdValue</span>: value, dataKey, rowIndex, <span class="hljs-attr">colIndex</span>: index };

    <span class="hljs-keyword">let</span> content;
    <span class="hljs-keyword">let</span> className;
    <span class="hljs-keyword">if</span> (React.isValidElement(td)) {
      content = React.cloneElement(td, props);
      className = getDisplayName(td);
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (td === <span class="hljs-string">'changeRate'</span>) {
      content = renderChangeRate(value || <span class="hljs-string">''</span>);
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (_.isFunction(td)) {
      content = td(props);
    } <span class="hljs-keyword">else</span> {
      content = formatIndex(parseValueOfTd(value), dataKey, td);
    }

    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">td</span>
        <span class="hljs-attr">key</span>=<span class="hljs-string">{</span>`<span class="hljs-attr">td-</span>${<span class="hljs-attr">index</span>}`}
        <span class="hljs-attr">style</span>=<span class="hljs-string">{getStyle(col.props)}</span>
        <span class="hljs-attr">className</span>=<span class="hljs-string">{</span>`<span class="hljs-attr">table-td</span> <span class="hljs-attr">col-</span>${<span class="hljs-attr">index</span>} <span class="hljs-attr">col-</span>${<span class="hljs-attr">dataKey</span>} ${<span class="hljs-attr">className</span> || ''}`}
      &gt;</span>
        {content}
      <span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span></span>
    );
  });
};

<span class="hljs-keyword">const</span> renderRows = <span class="hljs-function">(<span class="hljs-params">data, columns</span>) =&gt;</span> {
  <span class="hljs-keyword">if</span> (!data || !data.length) {<span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;}

  <span class="hljs-keyword">return</span> data.map(<span class="hljs-function">(<span class="hljs-params">entry, index</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">tr</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"table-tbody-tr"</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{</span>`<span class="hljs-attr">tr-</span>${<span class="hljs-attr">index</span>}`}&gt;</span>
        {renderTds(data, entry, columns, index)}
      <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span></span>
    );
  });
};

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Table</span>(<span class="hljs-params">props</span>) </span>{
  <span class="hljs-keyword">const</span> { children, data, className } = props;
  <span class="hljs-keyword">const</span> columns = findChildrenByType(children, Column);

  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{</span>`<span class="hljs-attr">table-container</span> ${<span class="hljs-attr">className</span> || ''}`}&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">table</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"base-table"</span>&gt;</span>
        {hasNames(columns) &amp;&amp; (
          <span class="hljs-tag">&lt;<span class="hljs-name">thead</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">tr</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"table-thead-tr"</span>&gt;</span>
              {renderThs(columns)}
            <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">thead</span>&gt;</span>
        )}
        <span class="hljs-tag">&lt;<span class="hljs-name">tbody</span>&gt;</span>{renderRows(data, columns)}<span class="hljs-tag">&lt;/<span class="hljs-name">tbody</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}</code></pre>
<p>代码说明了一切，就不再详细说了。当然，在业务组件里，还可以加上公共的错误处理逻辑。</p>
<h2 id="articleHeader3">单元格示例</h2>
<p>前面提到我们的 <code>td</code> 和 <code>th</code> 还可以接收 <code>ReactElement</code> 格式的 <code>props</code>，大家可能还有会有点疑惑，下面我们看一个 <code>SortableTh</code> 的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class SortableTh extends Component {
 static displayName = 'SortableTh';

 static propTypes = {
    ...,
    initialOrder: PropTypes.oneOf(['asc', 'desc']),
    order: PropTypes.oneOf(['asc', 'desc', 'none']).isRequired,
    onChange: PropTypes.func.isRequired,
 };

 static defaultProps = {
   order: 'none',
   initialOrder: 'desc',
 };

 onClick = () => {
   const { onChange, initialOrder, order, dataKey } = this.props;

   if (dataKey) {
     let nextOrder = 'none';

     if (order === 'none') {
       nextOrder = initialOrder;
     } else if (order === 'desc') {
       nextOrder = 'asc';
     } else if (order === 'asc') {
       nextOrder = 'desc';
     }

     onChange({ orderBy: dataKey, order: nextOrder });
   }
 };

 render() {
   const { name, order, hasRate, rateType } = this.props;

   return (
     <div className=&quot;sortable-th&quot; onClick={this.onClick}>
       <span>{name}</span>
       <SortIcon order={order} />
     </div>
   );
 }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">SortableTh</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
 <span class="hljs-keyword">static</span> displayName = <span class="hljs-string">'SortableTh'</span>;

 <span class="hljs-keyword">static</span> propTypes = {
    ...,
    <span class="hljs-attr">initialOrder</span>: PropTypes.oneOf([<span class="hljs-string">'asc'</span>, <span class="hljs-string">'desc'</span>]),
    <span class="hljs-attr">order</span>: PropTypes.oneOf([<span class="hljs-string">'asc'</span>, <span class="hljs-string">'desc'</span>, <span class="hljs-string">'none'</span>]).isRequired,
    <span class="hljs-attr">onChange</span>: PropTypes.func.isRequired,
 };

 <span class="hljs-keyword">static</span> defaultProps = {
   <span class="hljs-attr">order</span>: <span class="hljs-string">'none'</span>,
   <span class="hljs-attr">initialOrder</span>: <span class="hljs-string">'desc'</span>,
 };

 onClick = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
   <span class="hljs-keyword">const</span> { onChange, initialOrder, order, dataKey } = <span class="hljs-keyword">this</span>.props;

   <span class="hljs-keyword">if</span> (dataKey) {
     <span class="hljs-keyword">let</span> nextOrder = <span class="hljs-string">'none'</span>;

     <span class="hljs-keyword">if</span> (order === <span class="hljs-string">'none'</span>) {
       nextOrder = initialOrder;
     } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (order === <span class="hljs-string">'desc'</span>) {
       nextOrder = <span class="hljs-string">'asc'</span>;
     } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (order === <span class="hljs-string">'asc'</span>) {
       nextOrder = <span class="hljs-string">'desc'</span>;
     }

     onChange({ <span class="hljs-attr">orderBy</span>: dataKey, <span class="hljs-attr">order</span>: nextOrder });
   }
 };

 render() {
   <span class="hljs-keyword">const</span> { name, order, hasRate, rateType } = <span class="hljs-keyword">this</span>.props;

   <span class="hljs-keyword">return</span> (
     <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"sortable-th"</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.onClick}</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>{name}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">SortIcon</span> <span class="hljs-attr">order</span>=<span class="hljs-string">{order}</span> /&gt;</span>
     <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
   );
 }
}</span></code></pre>
<p>通过这个例子可以看到，<code>th</code> 和 <code>td</code> 接收 <code>ReactElement</code> 类型的 <code>props</code> 能够让外部很好的控制单元格的内容，每个单元格不只是接收 <code>data</code> 数据的封闭单元。</p>
<h2 id="articleHeader4">总结</h2>
<p>总结一些自己的感想：</p>
<ul>
<li><p>前端工程师也需要往前走一步，了解用户习惯。在写这个组件之前，我一直是用 ul 来写表格的，用 ul 写的表格调整样式比较便利，后来发现用户很多时候喜欢把整个表格里面的内容 copy 下来用于存档。然而，ul 写的表格 copy 后粘贴在 excel 中，整行的内容都在一个单元格里面，用 table 写的表格则能够几乎保持原本的格式，所以我们这次用了原生的 table 来写表格。</p></li>
<li><p>业务代码中组件抽取的粒度一直是一个比较纠结的问题。粒度太粗，项目成员之间需要写很多重复的代码。粒度太细，后续可扩展性又很低，所以只能是大家根据业务特点来评估了。像 Table 这样的组件非常通用，而且后续肯定有新的类型冒出来，所以粒度不宜太细。当然，我们这样写 Table 组件后，大家可以抽取常用的一些 <code>XXXTh</code> 和 <code>XXXTd</code>。</p></li>
</ul>
<p>最终，我把这次 Table 组件的经验抽离出来，开源到 <a href="https://github.com/recharts/react-smart-table" rel="nofollow noreferrer" target="_blank">https://github.com/recharts/react-smart-table</a>，希望开发者们可以参考。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React 实现 Table 的思考

## 原文链接
[https://segmentfault.com/a/1190000005064474](https://segmentfault.com/a/1190000005064474)

