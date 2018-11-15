---
title: 前端进阶（12） - css 的弱化与 js 的强化
hidden: true
categories: reprint
slug: 3a722d1c
date: 2018-11-09 02:30:05
---

{{< raw >}}
<h1 id="articleHeader0">css &#x7684;&#x5F31;&#x5316;&#x4E0E; js &#x7684;&#x5F3A;&#x5316;</h1><p><code>web</code> &#x7684;&#x4E09;&#x8981;&#x7D20; <code>html, css, js</code> &#x5728;&#x524D;&#x7AEF;&#x7EC4;&#x4EF6;&#x5316;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x6BD4;&#x5982; <a href="https://github.com/facebook/react" rel="nofollow noreferrer" target="_blank">react</a>&#x3001;<a href="https://github.com/vuejs/vue" rel="nofollow noreferrer" target="_blank">vue</a> &#x7B49;&#x7EC4;&#x4EF6;&#x5316;&#x6846;&#x67B6;&#x7684;&#x8FD0;&#x7528;&#xFF0C;&#x4F7F; <code>html &#x7684;&#x5F31;&#x5316;&#x4E0E; js &#x7684;&#x5F3A;&#x5316;</code> &#x6210;&#x4E3A;&#x4E86;&#x4E00;&#x79CD;&#x8D8B;&#x52BF;&#xFF0C;&#x800C;&#x5728;&#x8FD9;&#x4E2A;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x5176;&#x5B9E;&#x8FD8;&#x6709;&#x53E6;&#x4E00;&#x79CD;&#x8D8B;&#x52BF;&#x4E5F;&#x5728;&#x6162;&#x6162;&#x5F62;&#x6210;&#xFF1A;<code>css &#x7684;&#x5F31;&#x5316;&#x4E0E; js &#x7684;&#x5F3A;&#x5316;</code>&#x3002;</p><p>&#x4E4B;&#x524D;&#x6709;&#x5199;&#x8FC7;&#x4E00;&#x7BC7; <a href="https://github.com/senntyou/blogs/blob/master/advanced/1.md" rel="nofollow noreferrer" target="_blank">CSS &#x6A21;&#x5757;&#x5316;</a>&#xFF0C;&#x4F46;&#x5BF9; <code>css in js</code> &#x8FD9;&#x79CD;&#x7406;&#x5FF5;&#x6CA1;&#x6709;&#x8FC7;&#x591A;&#x8BB2;&#x89E3;&#xFF0C;&#x6240;&#x4EE5;&#x8FD9;&#x6B21;&#x6DF1;&#x5165;&#x4E00;&#x4E0B;&#x3002;</p><p><code>css in js</code> &#x7406;&#x5FF5;&#xFF0C;&#x5373;&#x662F;&#x6452;&#x5F03;&#x539F;&#x6709;&#x7684;&#x7528; <code>.css</code> &#x6587;&#x4EF6;&#x4E66;&#x5199;&#x6837;&#x5F0F;&#xFF0C;&#x800C;&#x628A;&#x6837;&#x5F0F;&#x5199;&#x8FDB; <code>js</code> &#x91CC;&#x9762;&#xFF0C;&#x8FD9;&#x6837;&#x5C31;&#x53EF;&#x4EE5;&#x505A;&#x5230;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x5BF9;&#x5E94;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#x3001;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#x4FBF;&#x662F;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x3002;</p><h2 id="articleHeader1">1. &#x652F;&#x6301;&#x7684;&#x7B2C;&#x4E09;&#x65B9;&#x5E93;</h2><ol><li><a href="https://github.com/styled-components/styled-components" rel="nofollow noreferrer" target="_blank">styled-components</a>: &#x4EC5;&#x652F;&#x6301; <code>react</code></li><li><a href="https://github.com/FormidableLabs/radium" rel="nofollow noreferrer" target="_blank">radium</a>: &#x4EC5;&#x652F;&#x6301; <code>react</code></li><li><a href="https://github.com/emotion-js/emotion" rel="nofollow noreferrer" target="_blank">emotion</a></li><li><a href="https://github.com/Khan/aphrodite" rel="nofollow noreferrer" target="_blank">aphrodite</a></li><li><a href="https://github.com/styled-components/polished" rel="nofollow noreferrer" target="_blank">polished</a></li><li><a href="https://github.com/cssinjs/jss" rel="nofollow noreferrer" target="_blank">jss</a></li><li><a href="https://github.com/paypal/glamorous" rel="nofollow noreferrer" target="_blank">glamorous</a>: &#x4EC5;&#x652F;&#x6301; <code>react</code></li><li><a href="https://github.com/zeit/styled-jsx" rel="nofollow noreferrer" target="_blank">styled-jsx</a>: &#x4EC5;&#x652F;&#x6301; <code>react</code></li><li><a href="https://github.com/threepointone/glamor" rel="nofollow noreferrer" target="_blank">glamor</a>: &#x4EC5;&#x652F;&#x6301; <code>react</code></li><li><a href="https://github.com/styletron/styletron" rel="nofollow noreferrer" target="_blank">styletron</a>: &#x4EC5;&#x652F;&#x6301; <code>react</code></li></ol><p>&#x66F4;&#x591A;&#x7B2C;&#x4E09;&#x65B9;&#x5E93;&#x53EF;&#x4EE5;&#x53C2;&#x8003; <a href="https://github.com/MicheleBertoli/css-in-js" rel="nofollow noreferrer" target="_blank">css-in-js</a>&#x3002;</p><h2 id="articleHeader2">2. &#x4E66;&#x5199;&#x65B9;&#x5F0F;</h2><p>&#x4E00;&#x822C; <code>css in js</code> &#x7684;&#x5199;&#x6CD5;&#x6709;&#x4E24;&#x79CD;&#xFF1A;</p><ol><li>&#x4F7F;&#x7528; <code>es6</code> &#x7684;&#x6A21;&#x677F;&#x5B57;&#x7B26;&#x4E32;</li><li>&#x4F7F;&#x7528; js &#x5BF9;&#x8C61; <code>{}</code></li></ol><h3 id="articleHeader3">2.1 &#x4F7F;&#x7528; <code>es6</code> &#x7684;&#x6A21;&#x677F;&#x5B57;&#x7B26;&#x4E32;</h3><p><a href="https://github.com/styled-components/styled-components" rel="nofollow noreferrer" target="_blank">styled-components</a>&#x3001;<a href="https://github.com/emotion-js/emotion" rel="nofollow noreferrer" target="_blank">emotion</a>&#x3001;<a href="https://github.com/zeit/styled-jsx" rel="nofollow noreferrer" target="_blank">styled-jsx</a> &#x90FD;&#x662F;&#x91C7;&#x7528;&#x7684;&#x8FD9;&#x79CD;&#x5199;&#x6CD5;&#x3002;</p><p>&#x6BD4;&#x5982; <code>styled-components</code>:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from &apos;react&apos;;
import styled from &apos;styled-components&apos;;

// &#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x4F7F;&#x7528; &lt;h1&gt; &#x6807;&#x7B7E;&#x7684; &lt;Title&gt; React &#x7EC4;&#x4EF6;
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

// &#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x4F7F;&#x7528; &lt;section&gt; &#x6807;&#x7B7E;&#x7684; &lt;Wrapper&gt; React &#x7EC4;&#x4EF6;
const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

// &#x5C31;&#x50CF;&#x6B63;&#x5E38;&#x7684; React &#x7EC4;&#x4EF6;&#x4E00;&#x6837;&#xFF0C;&#x53EA;&#x4E0D;&#x8FC7;&#x4ED6;&#x4EEC;&#x90FD;&#x81EA;&#x5E26;&#x6837;&#x5F0F;
&lt;Wrapper&gt;
  &lt;Title&gt;Hello World, this is my first styled component!&lt;/Title&gt;
&lt;/Wrapper&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react&apos;</span>;
<span class="hljs-keyword">import</span> styled <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;styled-components&apos;</span>;

<span class="hljs-comment">// &#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x4F7F;&#x7528; &lt;h1&gt; &#x6807;&#x7B7E;&#x7684; &lt;Title&gt; React &#x7EC4;&#x4EF6;</span>
<span class="hljs-keyword">const</span> Title = styled.h1<span class="hljs-string">`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`</span>;

<span class="hljs-comment">// &#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x4F7F;&#x7528; &lt;section&gt; &#x6807;&#x7B7E;&#x7684; &lt;Wrapper&gt; React &#x7EC4;&#x4EF6;</span>
<span class="hljs-keyword">const</span> Wrapper = styled.section<span class="hljs-string">`
  padding: 4em;
  background: papayawhip;
`</span>;

<span class="hljs-comment">// &#x5C31;&#x50CF;&#x6B63;&#x5E38;&#x7684; React &#x7EC4;&#x4EF6;&#x4E00;&#x6837;&#xFF0C;&#x53EA;&#x4E0D;&#x8FC7;&#x4ED6;&#x4EEC;&#x90FD;&#x81EA;&#x5E26;&#x6837;&#x5F0F;</span>
&lt;Wrapper&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Title</span>&gt;</span>Hello World, this is my first styled component!<span class="hljs-tag">&lt;/<span class="hljs-name">Title</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/Wrapper&gt;</span></code></pre><p>&#x6BD4;&#x5982; <code>emotion</code>:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { css } from &apos;emotion&apos;;

const app = document.getElementById(&apos;root&apos;);
const myStyle = css`
  color: rebeccapurple;
`;
app.classList.add(myStyle);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> { css } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;emotion&apos;</span>;

<span class="hljs-keyword">const</span> app = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;root&apos;</span>);
<span class="hljs-keyword">const</span> myStyle = css<span class="hljs-string">`
  color: rebeccapurple;
`</span>;
app.classList.add(myStyle);</code></pre><p>&#x8FD9;&#x79CD;&#x5199;&#x6CD5;&#x7684;&#x597D;&#x5904;&#x662F;&#xFF0C;&#x901A;&#x8FC7;&#x7F16;&#x8F91;&#x5668;&#x63D2;&#x4EF6;&#x548C; lint &#x63D2;&#x4EF6;&#xFF08;&#x5982; <a href="https://github.com/stylelint/stylelint" rel="nofollow noreferrer" target="_blank">stylelint</a>&#xFF09;&#xFF0C;&#x5C31;&#x50CF;&#x5199;&#x6B63;&#x5E38;&#x7684; css &#x4E00;&#x6837;&#xFF0C;&#x6709;&#x81EA;&#x52A8;&#x5B8C;&#x6210;&#x63D0;&#x793A;&#x3001;&#x9519;&#x8BEF;&#x63D0;&#x793A;&#x3001;lint &#x81EA;&#x52A8;&#x77EB;&#x6B63;&#x7B49;&#x529F;&#x80FD;&#x3002;</p><h3 id="articleHeader4">2.2 &#x4F7F;&#x7528; js &#x5BF9;&#x8C61; <code>{}</code></h3><p><a href="https://github.com/FormidableLabs/radium" rel="nofollow noreferrer" target="_blank">radium</a>&#x3001;<a href="https://github.com/Khan/aphrodite" rel="nofollow noreferrer" target="_blank">aphrodite</a>&#x3001;<a href="https://github.com/styled-components/polished" rel="nofollow noreferrer" target="_blank">polished</a>&#x3001;<a href="https://github.com/cssinjs/jss" rel="nofollow noreferrer" target="_blank">jss</a>&#x3001;<a href="https://github.com/paypal/glamorous" rel="nofollow noreferrer" target="_blank">glamorous</a>&#x3001;<a href="https://github.com/threepointone/glamor" rel="nofollow noreferrer" target="_blank">glamor</a>&#x3001;<a href="https://github.com/styletron/styletron" rel="nofollow noreferrer" target="_blank">styletron</a> &#x90FD;&#x662F;&#x91C7;&#x7528;&#x7684;&#x8FD9;&#x79CD;&#x5199;&#x6CD5;&#x3002;</p><p>&#x6BD4;&#x5982; <code>radium</code>:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Radium from &apos;radium&apos;;
import React from &apos;react&apos;;
import color from &apos;color&apos;;

var styles = {
  base: {
    color: &apos;#fff&apos;,
    &apos;:hover&apos;: {
      background: color(&apos;#0074d9&apos;).lighten(0.2).hexString()
    }
  },
  primary: {
    background: &apos;#0074D9&apos;
  },
  warning: {
    background: &apos;#FF4136&apos;
  }
};

class Button extends React.Component {
  render() {
    return (
      &lt;button
        style={[styles.base, styles[this.props.kind]]}&gt;
        {this.props.children}
      &lt;/button&gt;
    );
  }
}

Button = Radium(Button);

&lt;Button kind=&quot;primary&quot;&gt;Primary&lt;/Button&gt;
&lt;Button kind=&quot;warning&quot;&gt;Warning&lt;/Button&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> Radium <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;radium&apos;</span>;
<span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react&apos;</span>;
<span class="hljs-keyword">import</span> color <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;color&apos;</span>;

<span class="hljs-keyword">var</span> styles = {
  <span class="hljs-attr">base</span>: {
    <span class="hljs-attr">color</span>: <span class="hljs-string">&apos;#fff&apos;</span>,
    <span class="hljs-string">&apos;:hover&apos;</span>: {
      <span class="hljs-attr">background</span>: color(<span class="hljs-string">&apos;#0074d9&apos;</span>).lighten(<span class="hljs-number">0.2</span>).hexString()
    }
  },
  <span class="hljs-attr">primary</span>: {
    <span class="hljs-attr">background</span>: <span class="hljs-string">&apos;#0074D9&apos;</span>
  },
  <span class="hljs-attr">warning</span>: {
    <span class="hljs-attr">background</span>: <span class="hljs-string">&apos;#FF4136&apos;</span>
  }
};

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Button</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span>
        <span class="hljs-attr">style</span>=<span class="hljs-string">{[styles.base,</span> <span class="hljs-attr">styles</span>[<span class="hljs-attr">this.props.kind</span>]]}&gt;</span>
        {this.props.children}
      <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
    );
  }
}

Button = Radium(Button);

<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">kind</span>=<span class="hljs-string">&quot;primary&quot;</span>&gt;</span>Primary<span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span></span>
&lt;Button kind=<span class="hljs-string">&quot;warning&quot;</span>&gt;Warning&lt;<span class="hljs-regexp">/Button&gt;</span></code></pre><p>&#x6BD4;&#x5982; <code>aphrodite</code>:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from &apos;react&apos;;
import { StyleSheet, css } from &apos;aphrodite&apos;;

const styles = StyleSheet.create({
  red: {
    backgroundColor: &apos;red&apos;
  },
  blue: {
    backgroundColor: &apos;blue&apos;
  },
  hover: {
    &apos;:hover&apos;: {
      backgroundColor: &apos;red&apos;
    }
  },
  small: {
    &apos;@media (max-width: 600px)&apos;: {
      backgroundColor: &apos;red&apos;,
    }
  }
});

class App extends Component {
  render() {
    return &lt;div&gt;
      &lt;span className={css(styles.red)}&gt;
        This is red.
      &lt;/span&gt;
      &lt;span className={css(styles.hover)}&gt;
        This turns red on hover.
      &lt;/span&gt;
      &lt;span className={css(styles.small)}&gt;
        This turns red when the browser is less than 600px width.
      &lt;/span&gt;
      &lt;span className={css(styles.red, styles.blue)}&gt;
        This is blue.
      &lt;/span&gt;
      &lt;span className={css(styles.blue, styles.small)}&gt;
        This is blue and turns red when the browser is less than 600px width.
      &lt;/span&gt;
    &lt;/div&gt;;
    }
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react&apos;</span>;
<span class="hljs-keyword">import</span> { StyleSheet, css } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;aphrodite&apos;</span>;

<span class="hljs-keyword">const</span> styles = StyleSheet.create({
  <span class="hljs-attr">red</span>: {
    <span class="hljs-attr">backgroundColor</span>: <span class="hljs-string">&apos;red&apos;</span>
  },
  <span class="hljs-attr">blue</span>: {
    <span class="hljs-attr">backgroundColor</span>: <span class="hljs-string">&apos;blue&apos;</span>
  },
  <span class="hljs-attr">hover</span>: {
    <span class="hljs-string">&apos;:hover&apos;</span>: {
      <span class="hljs-attr">backgroundColor</span>: <span class="hljs-string">&apos;red&apos;</span>
    }
  },
  <span class="hljs-attr">small</span>: {
    <span class="hljs-string">&apos;@media (max-width: 600px)&apos;</span>: {
      <span class="hljs-attr">backgroundColor</span>: <span class="hljs-string">&apos;red&apos;</span>,
    }
  }
});

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{css(styles.red)}</span>&gt;</span>
        This is red.
      <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{css(styles.hover)}</span>&gt;</span>
        This turns red on hover.
      <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{css(styles.small)}</span>&gt;</span>
        This turns red when the browser is less than 600px width.
      <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{css(styles.red,</span> <span class="hljs-attr">styles.blue</span>)}&gt;</span>
        This is blue.
      <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{css(styles.blue,</span> <span class="hljs-attr">styles.small</span>)}&gt;</span>
        This is blue and turns red when the browser is less than 600px width.
      <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
    }
}
</code></pre><p>&#x8FD9;&#x79CD;&#x5199;&#x6CD5;&#x7684;&#x597D;&#x5904;&#x662F;&#xFF0C;&#x4E0D;&#x9700;&#x8981; <code>es6</code> &#x7684;&#x8BED;&#x6CD5;&#xFF0C;&#x5BF9;&#x5C5E;&#x6027;&#x53EF;&#x4EE5;&#x66F4;&#x65B9;&#x4FBF;&#x7684;&#x64CD;&#x4F5C;&#x3002;</p><h2 id="articleHeader5">3. &#x51B3;&#x5B9A;&#x662F;&#x5426;&#x4F7F;&#x7528;</h2><p>&#x5982;&#x679C;&#x4F60;&#x662F;&#x559C;&#x6B22;&#x628A;&#x6837;&#x5F0F;&#x548C;&#x7EC4;&#x4EF6;&#x5206;&#x5F00;&#x4E66;&#x5199;&#xFF0C;&#x90A3;&#x4E48;&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#x5C31;&#x53EF;&#x80FD;&#x4E0D;&#x592A;&#x9002;&#x5408;&#x4F60;&#xFF1B;&#x5982;&#x679C;&#x4F60;&#x8FFD;&#x6C42;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x5BF9;&#x5E94;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#x3001;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#x4FBF;&#x662F;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#xFF0C;&#x90A3;&#x5C31;&#x7ACB;&#x9A6C;&#x7528;&#x4E0A;&#x5427;&#x3002;</p><h2 id="articleHeader6">4. &#x540E;&#x7EED;</h2><p>&#x66F4;&#x591A;&#x535A;&#x5BA2;&#xFF0C;&#x67E5;&#x770B; <a href="https://github.com/senntyou/blogs" rel="nofollow noreferrer" target="_blank">https://github.com/senntyou/blogs</a></p><p>&#x4F5C;&#x8005;&#xFF1A;<a href="https://github.com/senntyou" rel="nofollow noreferrer" target="_blank">&#x6DF1;&#x4E88;&#x4E4B; (@senntyou)</a></p><p>&#x7248;&#x6743;&#x58F0;&#x660E;&#xFF1A;&#x81EA;&#x7531;&#x8F6C;&#x8F7D;-&#x975E;&#x5546;&#x7528;-&#x975E;&#x884D;&#x751F;-&#x4FDD;&#x6301;&#x7F72;&#x540D;&#xFF08;<a href="https://creativecommons.org/licenses/by-nc-nd/3.0/deed.zh" rel="nofollow noreferrer" target="_blank">&#x521B;&#x610F;&#x5171;&#x4EAB;3.0&#x8BB8;&#x53EF;&#x8BC1;</a>&#xFF09;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端进阶（12） - css 的弱化与 js 的强化

## 原文链接
[https://segmentfault.com/a/1190000016422897](https://segmentfault.com/a/1190000016422897)

