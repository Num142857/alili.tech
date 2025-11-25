---
title: React中的函数子组件(FaCC)和高阶组件(HOC)
hidden: true
categories: [reprint]
slug: 8a7902d6
date: 2018-11-12 02:30:05
---

{{< raw >}}
<p>&#x5728;&#x63A5;&#x89E6;&#x8FC7;React&#x9879;&#x76EE;&#x540E;&#xFF0C;&#x5927;&#x591A;&#x6570;&#x4EBA;&#x90FD;&#x5E94;&#x8BE5;&#x5DF2;&#x7ECF;&#x4E86;&#x89E3;&#x8FC7;&#x6216;&#x5219;&#x7528;&#x8FC7;&#x4E86;HOC(High-Order-Components)&#x548C;FaCC(Functions as Child Components)&#xFF0C;&#x56E0;&#x4E3A;&#x8FD9;&#x4E24;&#x4E2A;&#x6A21;&#x5F0F;&#x5728;&#x5927;&#x591A;&#x6570;react&#x7684;&#x5F00;&#x6E90;&#x5E93;&#x91CC;&#x90FD;&#x5B58;&#x5728;&#x3002;&#x6BD4;&#x5982;react-router&#x91CC;&#x9762;&#x7684;<a href="https://github.com/ReactTraining/react-router/blob/master/packages/react-router/modules/withRouter.js#L9" rel="nofollow noreferrer">withRouter</a> &#x5C31;&#x662F;&#x5178;&#x578B;&#x7684;&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;&#xFF0C;&#x63A5;&#x53D7;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x8FD4;&#x56DE;&#x53E6;&#x5916;&#x4E00;&#x4E2A;&#x7ECF;&#x8FC7;&#x589E;&#x5F3A;&#x540E;&#x7684;&#x7EC4;&#x4EF6;&#x3002;&#x800C;react-motion&#x4E2D;&#x7684;<a href="https://github.com/chenglou/react-motion/blob/master/src/Motion.js#L28" rel="nofollow noreferrer">Motion</a>&#x5C31;&#x662F;&#x5178;&#x578B;&#x7684;FaCC&#x7684;&#x5E94;&#x7528;&#x3002;</p><p>HOC&#x548C;FaCC&#x4E24;&#x8005;&#x505A;&#x7684;&#x4E8B;&#x4E5F;&#x662F;&#x975E;&#x5E38;&#x76F8;&#x4F3C;&#x7684;&#xFF0C;&#x90FD;&#x662F;&#x7C7B;&#x4F3C;&#x8BBE;&#x8BA1;&#x6A21;&#x5F0F;&#x91CC;&#x9762;&#x7684;&#x88C5;&#x9970;&#x8005;&#x6A21;&#x5F0F;&#x3002;&#x90FD;&#x662F;&#x5728;&#x539F;&#x6709;&#x7684;&#x5B9E;&#x4F8B;&#x6216;&#x5219;&#x5355;&#x5143;&#x4E0A;&#x8FDB;&#x884C;&#x529F;&#x80FD;&#x7684;&#x589E;&#x5F3A;&#x3002;</p><p>&#x5F53;&#x7136;&#x4E0D;&#x53EA;&#x662F;&#x4E00;&#x4E9B;&#x5F00;&#x6E90;&#x5E93;&#x4E2D;&#x4F1A;&#x4F7F;&#x7528;&#xFF0C;&#x5728;&#x5E73;&#x5E38;&#x7684;&#x4EE3;&#x7801;&#x7F16;&#x5199;&#x4E2D;&#xFF0C;&#x4E5F;&#x6709;&#x5F88;&#x591A;&#x5730;&#x65B9;&#x662F;&#x9002;&#x7528;&#x4E8E;&#x4F7F;&#x7528;HOC&#x548C;FaCC&#x53BB;&#x5C01;&#x88C5;&#x4E00;&#x4E9B;&#x903B;&#x8F91;&#x3002;&#x6BD4;&#x5982;&#x6570;&#x636E;&#x57CB;&#x70B9;&#xFF0C;&#x65B0;&#x7279;&#x6027;&#x7684;toggle&#xFF0C;&#x83B7;&#x53D6;&#x8F6C;&#x6362;&#x6570;&#x636E;&#x7B49;&#x3002;&#x5BF9;&#x4E8E;&#x589E;&#x5F3A;&#x4EE3;&#x7801;&#x53EF;&#x8BFB;&#x6027;&#x548C;&#x903B;&#x8F91;&#x590D;&#x7528;&#x6765;&#x8BF4;&#xFF0C;&#x975E;&#x5E38;&#x6709;&#x7528;&#x7684;&#x3002;</p><h2>HOC</h2><p>&#x9AD8;&#x9636;&#x51FD;&#x6570;&#x6211;&#x4EEC;&#x90FD;&#x7528;&#x8FC7;&#xFF0C;&#x5C31;&#x662F;&#x63A5;&#x53D7;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x7136;&#x540E;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x7ECF;&#x8FC7;&#x5C01;&#x88C5;&#x7684;&#x51FD;&#x6570;&#xFF1A;</p><pre><code class="js">const plus = first =&gt; second =&gt; (first + second)
plus(1)(2) // 3</code></pre><p>&#x800C;&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;&#x5C31;&#x662F;&#x9AD8;&#x9636;&#x51FD;&#x6570;&#x7684;&#x6982;&#x5FF5;&#x5E94;&#x7528;&#x5230;&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;&#x4E0A;:</p><pre><code class="js">
const withClassName = ComposedComponent =&gt; props =&gt; (
   &lt;ComposedComponent {...props} className=&apos;demo-class&apos; /&gt;
)

// &#x4F7F;&#x7528;
const Header = text =&gt; (&lt;header&gt;{text}&lt;/header&gt;)
const headerWitheClass = withClassName(Header)</code></pre><p>&#x63A5;&#x53D7;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x7ECF;&#x8FC7;&#x5305;&#x88C5;&#x7684;&#x65B0;&#x7EC4;&#x4EF6;&#x3002;&#x5728;&#x6211;&#x4EEC;&#x7ECF;&#x5E38;&#x4F7F;&#x7528;&#x7684;<code>withRouter</code>&#x5C31;&#x662F;&#x5728;&#x539F;&#x6709;&#x7EC4;&#x4EF6;<code>props</code>&#x4E0A;&#x9762;&#x5728;&#x52A0;&#x4E0A;<code>localtion</code>&#x7B49;&#x5C5E;&#x6027;&#x3002;&#x9664;&#x4E86;&#x6DFB;&#x52A0;props&#x4EE5;&#x5916;&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;&#x8FD8;&#x80FD;&#x505A;&#x5230;&#xFF1A;</p><ul><li>&#x5728;&#x771F;&#x6B63;&#x8C03;&#x7528;&#x7EC4;&#x4EF6;&#x524D;&#x540E;&#x505A;&#x4E00;&#x4E9B;&#x4E8B;&#xFF0C;&#x6BD4;&#x5982;&#x57CB;&#x70B9;&#x6570;&#x636E;&#x7B49;</li><li>&#x5224;&#x65AD;&#x7EC4;&#x4EF6;&#x662F;&#x5426;&#x8BE5;render&#xFF0C;&#x6216;&#x5219;&#x5E94;&#x8BE5;render&#x5176;&#x4ED6;&#x7684;&#x4E1C;&#x897F;&#xFF0C;&#x6BD4;&#x5982;&#x51FA;&#x9519;&#x4E4B;&#x540E;render&#x9519;&#x8BEF;&#x9875;&#x9762;</li><li>&#x4F20;&#x9012;props&#x5E76;&#x589E;&#x52A0;&#x65B0;&#x7684;props</li><li>&#x4E0D;render&#x7EC4;&#x4EF6;&#xFF0C;&#x8F6C;&#x800C;&#x505A;&#x4E00;&#x4E9B;&#x5176;&#x4ED6;&#x7684;&#x4E8B;&#x60C5;&#xFF0C;&#x6BD4;&#x5982;&#x6E32;&#x67D3;&#x4E00;&#x4E2A;&#x5916;&#x90E8;&#x7684;dom</li></ul><p>&#x5BF9;&#x4E8E;&#x4E0A;&#x9762;&#x7684;&#x524D;&#x4E09;&#x70B9;&#x90FD;&#x6BD4;&#x8F83;&#x597D;&#x7406;&#x89E3;&#xFF0C;&#x89E3;&#x91CA;&#x4E00;&#x4E0B;&#x7B2C;4&#x70B9;&#x3002;&#x6BD4;&#x5982;&#x4F60;&#x5728;render&#x4E86;&#x4E00;&#x4E2A;&#x9875;&#x9762;&#x4E4B;&#x540E;&#xFF0C;&#x9700;&#x8981;&#x6539;&#x53D8;&#x4E00;&#x4E0B;&#x9875;&#x9762;&#x7684;title.&#x8FD9;&#x662F;&#x5355;&#x9875;&#x5E94;&#x7528;&#x666E;&#x904D;&#x5B58;&#x5728;&#x7684;&#x4E00;&#x4E2A;&#x9700;&#x6C42;&#xFF0C;&#x901A;&#x5E38;&#x4F60;&#x53EF;&#x4EE5;&#x5728;&#x5177;&#x4F53;router&#x5E93;&#x4E2D;&#x4F7F;&#x7528;hook&#x53BB;&#x5B9E;&#x73B0;&#x3002;&#x5F53;&#x7136;&#x4E5F;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;HOC&#x6765;&#x5B9E;&#x73B0;&#xFF1A;</p><pre><code class="js">
const withTitleChange = ComposedComponent =&gt; {
  return class extends React.Component {
    componentDidMount () {
      const { title } = this.props
      document.title = title
    }
    render () {
      const props = this.props
      return &lt;ComposedComponent {...props} /&gt;
    }
  }
}
</code></pre><h2>FaCC</h2><p>&#x540C;&#x6837;FaCC&#x4E5F;&#x662F;&#x7528;&#x4E8E;&#x589E;&#x5F3A;&#x539F;&#x6709;&#x7EC4;&#x4EF6;&#x80FD;&#x529B;&#x7684;&#x4E00;&#x79CD;&#x6A21;&#x5F0F;&#xFF0C;&#x5176;&#x4E3B;&#x8981;&#x529F;&#x80FD;&#x7684;&#x5B9E;&#x73B0;&#x5728;&#x4E8E;react&#x7684;<a href="https://reactjs.org/docs/jsx-in-depth.html#functions-as-children" rel="nofollow noreferrer">props.children</a>&#x53EF;&#x4EE5;&#x662F;&#x4EFB;&#x4F55;&#x4E1C;&#x897F;&#xFF0C;&#x5305;&#x62EC;&#x51FD;&#x6570;&#x3002;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x62FF;&#x4E0A;&#x9762;class&#x7684;&#x4F8B;&#x5B50;&#x7528;FaCC&#x518D;&#x5B9E;&#x73B0;&#x4E00;&#x904D;&#xFF1A;</p><pre><code class="jsx">const ClassNameWrapper = ({ children }) =&gt; children(&apos;demo-class&apos;)

// &#x4F7F;&#x7528;

const HeadWithClass = (props) =&gt; (
  &lt;ClassNameWrapper&gt;
    {(class) =&gt; &lt;header classNmae={class} &gt;&lt;/header&gt;}
  &lt;/ClassNameWrapper&gt;
)</code></pre><p>&#x5728;FaCC&#x4E2D;&#x4F60;&#x4E5F;&#x53EF;&#x4EE5;&#x50CF;HOC&#x4E00;&#x6837;&#x5728;&#x751F;&#x547D;&#x5468;&#x671F;&#x4E2D;&#x505A;&#x5F88;&#x591A;&#x4E8B;&#x5BF9;&#x539F;&#x6709;&#x7684;&#x7EC4;&#x4EF6;&#x8FDB;&#x884C;&#x5C01;&#x88C5;&#xFF0C;&#x57FA;&#x672C;&#x4E0A;HOC&#x80FD;&#x505A;&#x7684;FaCC&#x4E5F;&#x90FD;&#x80FD;&#x505A;&#x3002;&#x6211;&#x6240;&#x5728;&#x7684;&#x9879;&#x76EE;&#x4E4B;&#x524D;&#x90FD;&#x662F;&#x5927;&#x8303;&#x56F4;&#x7684;&#x4F7F;&#x7528;HOC&#xFF0C;&#x518D;&#x7ECF;&#x8FC7;&#x4E00;&#x756A;&#x8BA8;&#x8BBA;&#x540E;&#xFF0C;&#x5F00;&#x59CB;&#x5927;&#x8303;&#x56F4;&#x7684;&#x8F6C;&#x53D8;&#x6210;FaCC&#x3002;</p><h2>&#x533A;&#x522B;</h2><p>&#x4E24;&#x8005;&#x90FD;&#x662F;&#x7528;&#x6765;&#x589E;&#x5F3A;&#x539F;&#x6709;&#x7EC4;&#x4EF6;&#x7684;&#xFF0C;&#x5177;&#x4F53;&#x8BE5;&#x4F7F;&#x7528;&#x90A3;&#x79CD;&#xFF1F;&#x90A3;&#x79CD;&#x662F;&#x6B63;&#x786E;&#x7684;&#x6A21;&#x5F0F;&#xFF1F;&#x793E;&#x533A;&#x5173;&#x4E8E;&#x8FD9;&#x4E00;&#x70B9;&#x4E5F;&#x6709;&#x5F88;&#x591A;&#x8BA8;&#x8BBA;&#xFF0C;&#x6BD4;&#x5982;&#x5C31;&#x6709;&#x4EBA;&#x8BF4;FaCC&#x662F;&#x53CD;&#x6A21;&#x5F0F;&#xFF1A;<a href="https://americanexpress.io/faccs-are-an-antipattern/" rel="nofollow noreferrer">Function as Child Components Are an Anti-Pattern</a>&#x3002;&#x4ED6;&#x7ED9;&#x51FA;&#x7684;&#x7406;&#x7531;&#x662F;children&#x5E76;&#x4E0D;&#x8BED;&#x4E49;&#x5316;&#xFF0C;&#x4F1A;&#x9020;&#x6210;&#x56F0;&#x60D1;&#xFF0C;&#x7136;&#x540E;&#x4ED6;&#x63D0;&#x51FA;&#x4E86;<code>Component Injection</code>&#x7684;&#x6A21;&#x5F0F;&#xFF0C;&#x6709;&#x5174;&#x8DA3;&#x7684;&#x540C;&#x5B66;&#x53EF;&#x4EE5;&#x8BFB;&#x4E00;&#x8BFB;&#x3002;</p><p>&#x5177;&#x4F53;&#x4ECE;&#x51E0;&#x4E2A;&#x65B9;&#x9762;&#x505A;&#x4E00;&#x4E0B;&#x5BF9;&#x6BD4;&#xFF1A;</p><ol><li>&#x7EC4;&#x5408;&#x9636;&#x6BB5;</li></ol><p>&#x7EC4;&#x5408;&#x9636;&#x6BB5;&#x610F;&#x601D;&#x5C31;&#x662F;HOC&#xFF0C;FaCC&#x548C;&#x8981;&#x88AB;&#x589E;&#x5F3A;&#x7684;&#x7EC4;&#x4EF6;&#x7684;&#x7EC4;&#x5408;&#x65F6;&#x5019;&#x3002;&#x53EF;&#x4EE5;&#x5F88;&#x660E;&#x663E;&#x53D1;&#x73B0;&#xFF0C;FaCC&#x5BF9;&#x4E8E;&#x524D;&#x540E;&#x7EC4;&#x4EF6;&#x5BF9;&#x63A5;&#x4F9D;&#x8D56;&#x4FE1;&#x606F;&#x663E;&#x793A;&#x7684;&#x66F4;&#x591A;&#xFF0C;&#x76F8;&#x5BF9;&#x800C;&#x8A00;&#x66F4;&#x5BB9;&#x6613;&#x7406;&#x89E3;&#x3002;&#x800C;HOC&#xFF0C;&#x76F8;&#x4E92;&#x4E4B;&#x95F4;&#x5982;&#x4F55;&#x6865;&#x63A5;&#xFF0C;&#x4F60;&#x5FC5;&#x987B;&#x5F97;&#x6DF1;&#x5165;&#x5230;HOC&#x5185;&#x90E8;&#x8BFB;&#x4EE3;&#x7801;&#x624D;&#x53EF;&#x4EE5;&#x77E5;&#x9053;&#x8FD9;&#x4E2A;HOC&#x5177;&#x4F53;&#x5E72;&#x4E86;&#x5565;&#x3002;</p><pre><code class="js">// HOC example
import View from &apos;./View&apos;

const DetailPage = withServerData(withNavigator(View))
</code></pre><pre><code class="js">// FaCC example

import View from &apos;./View&apos;

const DetailPage = props =&gt; (
  &lt;FetchServerData&gt;
    {
      data =&gt; (
        &lt;Navigator&gt;
          &lt;View data={data} {...props} /&gt;
        &lt;/Navigator&gt;
      )
    }
  &lt;/FetchServerData&gt;
)
</code></pre><p>&#x5982;&#x679C;&#x5728;&#x4E0A;&#x9762;&#x518D;&#x589E;&#x52A0;2&#x4E2A;HOC&#xFF0C;&#x4E0A;&#x9762;&#x7EC4;&#x5408;&#x7684;&#x8FC7;&#x7A0B;&#x5C31;&#x53D8;&#x5F97;&#x5341;&#x5206;&#x96BE;&#x770B;&#x3002;&#x800C;FaCC&#x76F8;&#x5BF9;&#x800C;&#x8A00;&#xFF0C;&#x5982;&#x4F55;&#x5C01;&#x88C5;&#xFF0C;&#x6570;&#x636E;&#x6E90;&#x6765;&#x81EA;&#x90A3;&#x91CC;&#xFF0C;&#x7EC4;&#x4EF6;&#x63A5;&#x53D7;&#x4E86;&#x90A3;&#x4E9B;&#x6570;&#x636E;&#x90FD;&#x6BD4;&#x8F83;&#x663E;&#x773C;&#x3002;</p><ol><li>&#x6027;&#x80FD;&#x4F18;&#x5316;</li></ol><p>&#x5728;HOC&#x4E2D;&#x6211;&#x4EEC;&#x80FD;&#x63A5;&#x53D7;&#x5230;&#x5BBF;&#x4E3B;&#x7684;prop&#xFF0C;&#x56E0;&#x4E3A;props&#x662F;&#x4ECE;HOC&#x5F80;&#x4E0B;&#x4F20;&#x9012;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x4E5F;&#x6709;&#x5B8C;&#x6574;&#x7684;&#x751F;&#x547D;&#x5468;&#x671F;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;shouldComponentUpdate&#x4F18;&#x5316;&#x3002;&#x800C;FaCC&#x5219;&#x4E0D;&#x7136;&#xFF0C;&#x65E0;&#x6CD5;&#x5728;&#x5176;&#x5185;&#x90E8;&#x505A;&#x6BD4;&#x8F83;props&#xFF0C;&#x9664;&#x975E;&#x5728;&#x7EC4;&#x5408;&#x7684;&#x65F6;&#x5019;&#x5916;&#x90E8;&#x5728;&#x5305;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x624D;&#x80FD;&#x8FDB;&#x884C;&#x6BD4;&#x8F83;props&#x3002;</p><ol><li>&#x7075;&#x6D3B;&#x6027;</li></ol><p>FaCC &#x5728;&#x7EC4;&#x5408;&#x9636;&#x6BB5;&#x76F8;&#x5BF9;HOC&#x66F4;&#x4E3A;&#x7075;&#x6D3B;&#xFF0C;&#x4ED6;&#x5E76;&#x4E0D;&#x89C4;&#x5B9A;&#x88AB;&#x589E;&#x5F3A;&#x7EC4;&#x4EF6;&#x5982;&#x4F55;&#x4F7F;&#x7528;&#x5B83;&#x4F20;&#x9012;&#x4E0B;&#x53BB;&#x7684;&#x5C5E;&#x6027;&#x3002;&#x800C;HOC&#x57FA;&#x672C;&#x4E0A;&#x5728;&#x7F16;&#x5199;&#x5B8C;&#x540E;&#x5C31;&#x5B9A;&#x6B7B;&#x4E86;&#x3002;</p><p>&#x53E6;&#x5916;&#xFF0C;FaCC&#x4E0D;&#x4F1A;&#x518D;&#x53BB;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x65B0;&#x7684;Component&#xFF0C;&#x800C;HOC&#x4F1A;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x65B0;&#x7684;Component&#x7136;&#x540E;&#x4F20;&#x9012;props&#x4E0B;&#x53BB;&#x3002;</p><h2>&#x603B;&#x7ED3;</h2><p>&#x793E;&#x533A;&#x4E2D;&#x5F88;&#x591A;&#x5F00;&#x6E90;&#x5E93;&#x5DF2;&#x7ECF;&#x4F7F;&#x7528;&#x4E86;&#x4E24;&#x79CD;&#x6A21;&#x5F0F;&#xFF0C;&#x4E5F;&#x6709;&#x5F88;&#x591A;&#x7684;&#x6587;&#x7AE0;&#x8FDB;&#x884C;&#x6BD4;&#x8F83;&#x3002;&#x4E5F;&#x6709;&#x5F88;&#x591A;&#x6FC0;&#x70C8;&#x8BA8;&#x8BBA;&#xFF0C;&#x5F53;&#x7136;&#x5BF9;&#x4E8E;&#x6700;&#x540E;&#x89E3;&#x51B3;&#x95EE;&#x9898;&#x800C;&#x8A00;&#xFF0C;&#x4E24;&#x79CD;&#x6A21;&#x5F0F;&#x90FD;&#x6709;&#x597D;&#x5904;&#x3002;&#x51FA;&#x4E8E;&#x4E0D;&#x540C;&#x7684;&#x8003;&#x8651;&#xFF0C;&#x53EF;&#x80FD;&#x9009;&#x62E9;&#x4E0D;&#x4E00;&#x6837;&#x3002;</p><p>&#x53C2;&#x8003;&#x6587;&#x7AE0;&#xFF1A;</p><ol><li><a href="http://rea.tech/functions-as-child-components-and-higher-order-components/" rel="nofollow noreferrer">http://rea.tech/functions-as-...</a></li><li><a href="http://rea.tech/reactjs-real-world-examples-of-higher-order-components/#the-relationship-between-hocs-and-decorator-design-pattern" rel="nofollow noreferrer">http://rea.tech/reactjs-real-...</a></li><li><a href="https://medium.com/merrickchristensen/function-as-child-components-5f3920a9ace9" rel="nofollow noreferrer">https://medium.com/merrickchr...</a></li><li><a href="http://www.ituring.com.cn/book/2007" rel="nofollow noreferrer">http://www.ituring.com.cn/boo...</a> &#x7B2C;&#x56DB;&#x7AE0;</li></ol>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React中的函数子组件(FaCC)和高阶组件(HOC)

## 原文链接
[https://segmentfault.com/a/1190000016269347](https://segmentfault.com/a/1190000016269347)

