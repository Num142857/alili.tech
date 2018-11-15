---
title: 在React中跨组件分发状态的三种方法
reprint: true
categories: reprint
abbrlink: 4cec9d39
date: 2018-10-18 00:00:00
---

{{% raw %}}

            <p>当我问自己第一百次时，我正在研究一个典型的CRUD屏幕：“我应该将状态保留在这个组件中还是将其移动到父组件？”。</p>
<p>如果需要对子组件的状态进行轻微控制。您可能也遇到了同样的问题。</p>
<p>让我们通过一个简单的例子和​​三种修复方法来回顾它。前两种方法是常见的做法，第三种方法不太常规。</p>
<h4>问题；</h4>
<p>为了向您展示我的意思，我将使用一个简单的书籍CRUD（译者注：增加(Create)、读取查询(Retrieve)、更新(Update)和删除(Delete)）屏幕（如此简单，它没有创建和删除操作）。</p>
<p><img src="https://p0.ssl.qhimg.com/t01eecbae26e9983a87.png" alt=""></p>
<p>我们有三个组成部分。<code>&lt;BookList /&gt;</code>是一个组件，显示了用于编辑它们的书籍和按钮列表。<code>&lt;BookForm /&gt;</code>有两个输入和一个按钮，用于保存对书籍的更改。以及包含其他两个组件的<code>&lt;BookApp /&gt;</code>。</p>
<p>那么，我们的状态是什么？好吧，&lt;BookApp /&gt;应该跟踪书籍清单以及识别当前正在编辑的书籍的内容。 &lt;BookList /&gt;没有任何状态。并且&lt;BookForm /&gt;应该保持输入的当前状态，直到单击“保存”按钮。</p>
<pre><code class="hljs pf">import React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">"react"</span>;
import { render } <span class="hljs-keyword">from</span> <span class="hljs-string">"react-dom"</span>;

const books = [
  {
    title: <span class="hljs-string">"The End of Eternity"</span>,
    author: <span class="hljs-string">"Isaac Asimov"</span>
  },
  //...
];

const BookList = ({ books, <span class="hljs-keyword">on</span>Edit }) =&gt; (
  <span class="hljs-variable">&lt;table&gt;</span>
    <span class="hljs-variable">&lt;tr&gt;</span>
      <span class="hljs-variable">&lt;th&gt;</span>Book Title&lt;/th&gt;
      <span class="hljs-variable">&lt;th&gt;</span>Actions&lt;/th&gt;
    &lt;/tr&gt;
    {books.map((book, index) =&gt; (
      <span class="hljs-variable">&lt;tr key={index}&gt;</span>
        <span class="hljs-variable">&lt;td&gt;</span>{book.title}&lt;/td&gt;
        <span class="hljs-variable">&lt;td&gt;</span>
          <span class="hljs-variable">&lt;button onClick={() =&gt;</span> <span class="hljs-keyword">on</span>Edit(index)}&gt;Edit&lt;/button&gt;
        &lt;/td&gt;
      &lt;/tr&gt;
    ))}
  &lt;/table&gt;
);

class BookForm extends Component {
  <span class="hljs-keyword">state</span> = { ...this.props.book };
  render() {
    if (!this.props.book) return null;
    return (
      <span class="hljs-variable">&lt;form&gt;</span>
        <span class="hljs-variable">&lt;h3&gt;</span>Book&lt;/h3&gt;
        <span class="hljs-variable">&lt;label&gt;</span>
          Title:
          <span class="hljs-variable">&lt;input
            value={this.state.title}
            onChange={e =&gt;</span> this.<span class="hljs-built_in">set</span>State({ title: e.target.value })}
          /&gt;
        &lt;/label&gt;
        <span class="hljs-variable">&lt;label&gt;</span>
          Author:
          <span class="hljs-variable">&lt;input
            value={this.state.author}
            onChange={e =&gt;</span> this.<span class="hljs-built_in">set</span>State({ author: e.target.value })}
          /&gt;
        &lt;/label&gt;
        <span class="hljs-variable">&lt;button onClick={() =&gt;</span> this.props.<span class="hljs-keyword">on</span>Save({ ...this.<span class="hljs-keyword">state</span> })}&gt;
          Save
        &lt;/button&gt;
      &lt;/form&gt;
    );
  }
}

class BookApp extends Component {
  <span class="hljs-keyword">state</span> = {
    books: books,
    activeIndex: -<span class="hljs-number">1</span>
  };
  render() {
    const { books, activeIndex } = this.<span class="hljs-keyword">state</span>;
    const activeBook = books[activeIndex];
    return (
      <span class="hljs-variable">&lt;div&gt;</span>
        <span class="hljs-variable">&lt;BookList
          books={books}
          onEdit={index =&gt;</span>
            this.<span class="hljs-built_in">set</span>State({
              activeIndex: index
            })}
        /&gt;
        <span class="hljs-variable">&lt;BookForm
          book={activeBook}
          onSave={book =&gt;</span>
            this.<span class="hljs-built_in">set</span>State({
              books: Object.assign([...books], { [activeIndex]: book }),
              activeIndex: -<span class="hljs-number">1</span>
            })}
        /&gt;
      &lt;/div&gt;
    );
  }
}

render(<span class="hljs-variable">&lt;BookApp /&gt;</span>, document.getElementById(<span class="hljs-string">"root"</span>));

</code></pre><p>在<a href="https://codesandbox.io/s/1oo33rkk3j">codesandbox</a>尝试一下</p>
<p>看起来不错，但是他不起作用。</p>
<p>我们正在创建组件实例时初始化&lt;BookForm /&gt;状态，因此，当从列表中选择另一本书时，父级无法让它知道它需要更改它。</p>
<p>我们正在创建组件实例时初始化&lt;BookForm /&gt;状态，因此，当从列表中选择另一本书时，父级无法让它知道它需要更改它。</p>
<h4>方法1：受控组件</h4>
<p>一种常见的方法是将状态提升，将&lt;BookForm /&gt;转换为受控组件。我们删除&lt;BookForm /&gt;状态，将activeBook添加到&lt;BookApp /&gt;状态，并向&lt;BookForm /&gt;添加一个onChange道具，我们在每次输入时都会调用它。</p>
<pre><code class="hljs scala"><span class="hljs-comment">//...</span>

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">BookForm</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.props.book) <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
    <span class="hljs-keyword">return</span> (
      &lt;form&gt;
        &lt;h3&gt;<span class="hljs-type">Book</span>&lt;/h3&gt;
        &lt;label&gt;
          <span class="hljs-type">Title</span>:
          &lt;input
            value={<span class="hljs-keyword">this</span>.props.book.title}
            onChange={e =&gt;
              <span class="hljs-keyword">this</span>.props.onChange({
                ...<span class="hljs-keyword">this</span>.props.book,
                title: e.target.value
              })}
          /&gt;
        &lt;/label&gt;
        &lt;label&gt;
          <span class="hljs-type">Author</span>:
          &lt;input
            value={<span class="hljs-keyword">this</span>.props.book.author}
            onChange={e =&gt;
              <span class="hljs-keyword">this</span>.props.onChange({
                ...<span class="hljs-keyword">this</span>.props.book,
                author: e.target.value
              })}
          /&gt;
        &lt;/label&gt;
        &lt;button onClick={() =&gt; <span class="hljs-keyword">this</span>.props.onSave()}&gt;<span class="hljs-type">Save</span>&lt;/button&gt;
      &lt;/form&gt;
    );
  }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">BookApp</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  state = {
    books: books,
    activeBook: <span class="hljs-literal">null</span>,
    activeIndex: <span class="hljs-number">-1</span>
  };
  render() {
    const { books, activeBook, activeIndex } = <span class="hljs-keyword">this</span>.state;
    <span class="hljs-keyword">return</span> (
      &lt;div&gt;
        &lt;<span class="hljs-type">BookList</span>
          books={books}
          onEdit={index =&gt;
            <span class="hljs-keyword">this</span>.setState({
              activeBook: { ...books[index] },
              activeIndex: index
            })}
        /&gt;
        &lt;<span class="hljs-type">BookForm</span>
          book={activeBook}
          onChange={book =&gt; <span class="hljs-keyword">this</span>.setState({ activeBook: book })}
          onSave={() =&gt;
            <span class="hljs-keyword">this</span>.setState({
              books: <span class="hljs-type">Object</span>.assign([...books], { [activeIndex]: activeBook }),
              activeBook: <span class="hljs-literal">null</span>,
              activeIndex: <span class="hljs-number">-1</span>
            })}
        /&gt;
      &lt;/div&gt;
    );
  }
}

<span class="hljs-comment">//...</span>

</code></pre><p>在<a href="https://codesandbox.io/s/93y9oprw">codesandbox</a>尝试一下</p>
<p>现在它可以工作，但对我来说，提升<code>&amp;lt;BookForm /&amp;gt;</code>的状态感觉不对。在用户单击“保存”之前，<code>&amp;lt;BookApp /&amp;gt;</code>不关心对书的任何更改，那么为什么需要将其保持在自己的状态？</p>
<h4>方法2：同步state</h4>
<p>现在它可以工作，但对我来说，提升&lt;BookForm /&gt;的状态感觉不对。在用户单击“保存”之前，&lt;BookApp /&gt;不关心对书的任何更改，那么为什么需要将其保持在自己的状态？</p>
<pre><code class="hljs kotlin"><span class="hljs-comment">//...</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">BookForm</span> <span class="hljs-title">extends</span> <span class="hljs-title">Component</span> </span>{
  state = { ...<span class="hljs-keyword">this</span>.props.book };
  componentWillReceiveProps(nextProps) {
    const nextBook = nextProps.book;
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.props.book !== nextBook) {
      <span class="hljs-keyword">this</span>.setState({ ...nextBook });
    }
  }
  render() {
    <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.props.book) <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
    <span class="hljs-keyword">return</span> (
      &lt;form&gt;
        &lt;h3&gt;Book&lt;/h3&gt;
        &lt;label&gt;
          Title:
          &lt;input
            value={<span class="hljs-keyword">this</span>.state.title}
            onChange={e =&gt; <span class="hljs-keyword">this</span>.setState({ title: e.target.value })}
          /&gt;
        &lt;/label&gt;
        &lt;label&gt;
          Author:
          &lt;input
            value={<span class="hljs-keyword">this</span>.state.author}
            onChange={e =&gt; <span class="hljs-keyword">this</span>.setState({ author: e.target.value })}
          /&gt;
        &lt;/label&gt;
        &lt;button onClick={() =&gt; <span class="hljs-keyword">this</span>.props.onSave({ ...<span class="hljs-keyword">this</span>.state })}&gt;
          Save
        &lt;/button&gt;
      &lt;/form&gt;
    );
  }
}
<span class="hljs-comment">//...</span>

</code></pre><p>在<a href="https://codesandbox.io/s/23k60on01p">codesandbox</a>尝试一下</p>
<p>这种方法通常被认为是一种不好的做法，因为它违背了React关于拥有单一事实来源的想法。我不确定是这种情况，然而，同步状态并不总是那么容易。此外，我尽量避免使用生命周期方法。</p>
<h4>方法3：由Key控制的组件</h4>
<p>但为什么我们要回收旧的状态呢？每次用户选择一本书时，拥有一个全新状态的新实例是不是有意义？</p>
<p>为此，我们需要告诉React停止使用旧实例并创建一个新实例。这就是key prop的用途。</p>
<pre><code class="hljs scala"><span class="hljs-comment">//...</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">BookApp</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  state = {
    books: books,
    activeIndex: <span class="hljs-number">-1</span>
  };
  render() {
    const { books, activeIndex } = <span class="hljs-keyword">this</span>.state;
    const activeBook = books[activeIndex];
    <span class="hljs-keyword">return</span> (
      &lt;div&gt;
        &lt;<span class="hljs-type">BookList</span>
          books={books}
          onEdit={index =&gt;
            <span class="hljs-keyword">this</span>.setState({
              activeIndex: index
            })}
        /&gt;
        &lt;<span class="hljs-type">BookForm</span>
          key={activeIndex}
          book={activeBook}
          onSave={book =&gt;
            <span class="hljs-keyword">this</span>.setState({
              books: <span class="hljs-type">Object</span>.assign([...books], { [activeIndex]: book }),
              activeIndex: <span class="hljs-number">-1</span>
            })}
        /&gt;
      &lt;/div&gt;
    );
  }
}
<span class="hljs-comment">//...</span>

</code></pre><p>在 <a href="https://codesandbox.io/s/kxn89qp965">codesandbox</a>尝试一下。</p>
<p>如果元素具有与上一个渲染不同的键，则React会为其创建一个新实例。因此，当用户选择新书时，&lt;BookForm /&gt;的键更改，将创建组件的新实例，并从props初始化状态。</p>
<p>有什么收获？重用组件实例意味着更少的DOM突变，这意味着更好的性能。因此，当我们强制React创建组件的新实例时，我们会为额外的DOM突变获得一些开销。但是对于这样的情况，这种开销是最小的，其中密钥没有变化太快而且组件不大。</p>
<p>感谢你的阅读。</p>

          
{{% /raw %}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/three-approaches-to-distribute-the-state-across-components-in-react](https://www.zcfy.cc/article/three-approaches-to-distribute-the-state-across-components-in-react)
原文标题: 在React中跨组件分发状态的三种方法
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
