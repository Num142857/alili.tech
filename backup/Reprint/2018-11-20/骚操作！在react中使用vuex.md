---
title: '骚操作！在react中使用vuex' 
date: 2018-11-20 2:30:10
hidden: true
slug: of6uanctc9
categories: [reprint]
---

{{< raw >}}
<p><a href="https://github.com/zyl1314/blog/issues/12" rel="nofollow noreferrer">&#x539F;&#x6587;&#x5730;&#x5740;</a></p><h2>&#x524D;&#x8A00;</h2><p>&#x7B14;&#x8005;&#x6700;&#x8FD1;&#x5728;&#x5B66;&#x4E60;&#x4F7F;&#x7528;<code>react</code>&#xFF0C;&#x63D0;&#x5230;react&#x5C31;&#x7ED5;&#x4E0D;&#x8FC7;&#x53BB;<code>redux</code>&#x3002;redux&#x662F;&#x4E00;&#x4E2A;&#x72B6;&#x6001;&#x7BA1;&#x7406;&#x67B6;&#x6784;&#xFF0C;&#x88AB;&#x5E7F;&#x6CDB;&#x7528;&#x4E8E;react&#x9879;&#x76EE;&#x4E2D;&#xFF0C;&#x4F46;&#x662F;redux&#x5E76;&#x4E0D;&#x662F;&#x4E13;&#x4E3A;react&#x800C;&#x751F;&#xFF0C;&#x4E24;&#x8005;&#x8FD8;&#x9700;&#x8981;<code>react-redux</code>&#x5EFA;&#x7ACB;&#x4E00;&#x5EA7;&#x6865;&#x6881;&#x3002;&#x540C;&#x65F6;&#xFF0C;redux&#x67B6;&#x6784;&#x89C4;&#x5B9A;&#x53EA;&#x80FD;&#x53D1;&#x9001;<code>&#x540C;&#x6B65;action</code>&#xFF0C;&#x8981;&#x60F3;&#x53D1;&#x9001;<code>&#x5F02;&#x6B65;action</code>&#x5C31;&#x9700;&#x8981;&#x7ED3;&#x5408;&#x4E2D;&#x95F4;&#x4EF6;&#x5982;<code>redux-thunk</code>&#x3001;<code>redux-saga</code>&#x7B49;&#xFF0C;&#x6240;&#x4EE5;&#x8BF4;&#x8981;&#x60F3;&#x641E;&#x5B9A;redux&#x8FD8;&#x771F;&#x662F;&#x4E0D;&#x5BB9;&#x6613;&#x554A;&#xFF0C;&#x5149;&#x540D;&#x8BCD;&#x5C31;&#x8FD9;&#x4E48;&#x591A;&#x3002;&#x7B14;&#x8005;&#x4EE5;&#x524D;&#x4E5F;&#x63A5;&#x89E6;&#x8FC7;&#x4E00;&#x70B9;<code>vuex</code>&#xFF0C;vuex&#x5BF9;&#x7B14;&#x8005;&#x8FD9;&#x6837;&#x7684;&#x83DC;&#x9E21;&#x76F8;&#x5BF9;&#x53CB;&#x597D;&#xFF0C;&#x4F46;&#x662F;vuex&#x662F;&#x548C;<code>vue</code>&#x914D;&#x5957;&#x7684;&#xFF0C;&#x662F;&#x4E0D;&#x53EF;&#x80FD;&#x7528;&#x5728;react&#x4E2D;&#x7684;&#xFF0C;&#x8FD9;&#x8F88;&#x5B50;&#x90FD;&#x522B;&#x60F3;&#x7528;&#x5728;react&#x4E2D;&#x3002;&#x4F46;&#x662F;&#x6211;&#x4E0D;&#x670D;&#xFF0C;&#x90A3;&#x4E48;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#x5C31;&#x63A2;&#x7D22;&#x4E0B;&#x5982;&#x4F55;&#x5236;&#x4F5C;&#x4E00;&#x4E2A;&#x53EF;&#x4EE5;&#x5728;react&#x4E2D;&#x4F7F;&#x7528;&#x7684;<strong>&#x7C7B;&#x4F3C;</strong>vuex&#x7684;&#x72B6;&#x6001;&#x7BA1;&#x7406;&#x5DE5;&#x5177;&#xFF0C;&#x6211;&#x5C06;&#x5B83;&#x53D6;&#x540D;&#x4E3A;<a href="https://github.com/zyl1314/reux" rel="nofollow noreferrer">reux</a>&#x3002;</p><pre><code class="js">vuex &lt;=&gt; redux  + react-redux + redux-saga</code></pre><h2>&#x6B63;&#x6587;</h2><ul><li><h4>&#x54CD;&#x5E94;&#x5F0F;&#x6570;&#x636E;&#x89C2;&#x6D4B;&#x7CFB;&#x7EDF;</h4></li></ul><p>vue&#x7684;&#x4E00;&#x5927;&#x7279;&#x8272;&#x5C31;&#x662F;&#x54CD;&#x5E94;&#x5F0F;&#x6570;&#x636E;&#x89C2;&#x6D4B;&#x7CFB;&#x7EDF;&#xFF0C;&#x5B83;&#x53EF;&#x4EE5;&#x5728;<code>get</code>&#x6570;&#x636E;&#x65F6;&#x6536;&#x96C6;&#x4F9D;&#x8D56;&#xFF0C;&#x5728;<code>set</code>&#x6570;&#x636E;&#x65F6;&#x89E6;&#x53D1;&#x66F4;&#x65B0;&#x3002;vuex&#x501F;&#x52A9;&#x4E8E;vue&#x7684;&#x6570;&#x636E;&#x89C2;&#x6D4B;&#x7CFB;&#x7EDF;&#xFF0C;&#x53EF;&#x4EE5;&#x8F7B;&#x677E;&#x7684;&#x6536;&#x96C6;&#x6570;&#x636E;&#x4F9D;&#x8D56;&#xFF0C;&#x5E76;&#x4E14;&#x4F9D;&#x8D56;&#x53EF;&#x4EE5;&#x7CBE;&#x7EC6;&#x5230;&#x7EC4;&#x4EF6;&#x7684;&#x7C92;&#x5EA6;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#x67D0;&#x4E00;&#x72B6;&#x6001;&#x6539;&#x53D8;&#x65F6;&#xFF0C;&#x53EA;&#x6709;&#x4F9D;&#x8D56;&#x5230;&#x8FD9;&#x4E00;&#x72B6;&#x6001;&#x7684;&#x7EC4;&#x4EF6;&#x624D;&#x4F1A;&#x89E6;&#x53D1;<code>rerender</code>&#xFF0C;&#x8FD9;&#x6837;&#x770B;&#x6765;redux&#x4F53;&#x7CFB;&#x5C31;&#x6BD4;&#x8F83;&#x50BB;&#xFF0C;&#x53EA;&#x8981;&#x63D0;&#x4EA4;action&#xFF0C;&#x5C31;&#x4F1A;&#x4ECE;&#x6839;&#x7EC4;&#x4EF6;<code>rerender</code>&#xFF08;react-redux&#x5185;&#x90E8;&#x81EA;&#x52A8;&#x8FDB;&#x884C;shouldCompoentUpdate&#x5224;&#x65AD;&#xFF09;&#x3002;<br><span class="img-wrap"><img data-src="/img/remote/1460000010213896" src="https://static.alili.tech/img/remote/1460000010213896" alt="vuex" title="vuex"></span><br>&#x4E0A;&#x56FE;&#x6765;&#x81EA;&#x4E8E;vue&#x5B98;&#x7F51;&#x5BF9;vuex&#x67B6;&#x6784;&#x7684;&#x8BF4;&#x660E;&#xFF0C;<a href="https://cn.vuejs.org/v2/guide/state-management.html" rel="nofollow noreferrer">&#x94FE;&#x63A5;</a>&#x3002;<br>&#x4E0A;&#x56FE;&#x4E2D;&#x7684;<code>component</code>&#x662F;<code>vue component</code>&#xFF0C;&#x53EA;&#x8981;vue component&#x6267;&#x884C;render&#xFF0C;&#x90A3;&#x4E48;vuex&#x7684;&#x6570;&#x636E;&#x54CD;&#x5E94;&#x7CFB;&#x7EDF;&#x5C31;&#x53EF;&#x4EE5;&#x81EA;&#x52A8;&#x7684;&#x6536;&#x96C6;&#x4F9D;&#x8D56;&#xFF0C;&#x5F53;&#x72B6;&#x6001;&#x6539;&#x53D8;&#x65F6;&#xFF0C;&#x4F9D;&#x8D56;&#x4E8E;&#x6B64;&#x72B6;&#x6001;&#x7684;&#x7EC4;&#x4EF6;&#x5C31;&#x4F1A;&#x91CD;&#x65B0;&#x6E32;&#x67D3;&#x3002;&#x65E2;&#x7136;&#x6211;&#x4EEC;&#x8981;&#x5B9E;&#x73B0;&#x7684;&#x662F;&#x4E00;&#x4E2A;&#x7C7B;vuex&#x7684;&#x72B6;&#x6001;&#x7BA1;&#x7406;&#x5DE5;&#x5177;&#xFF0C;&#x5373;&#x652F;&#x6301;&#x4EE5;<code>get</code>&#x7684;&#x65B9;&#x5F0F;&#x6536;&#x96C6;&#x4F9D;&#x8D56;&#xFF0C;&#x4EE5;<code>set</code>&#x7684;&#x65B9;&#x5F0F;&#x89E6;&#x53D1;&#x66F4;&#x65B0;&#xFF0C;&#x6240;&#x4EE5;reux&#x5229;&#x7528;&#x4E86;vue&#x7684;&#x54CD;&#x5E94;&#x5F0F;&#x6570;&#x636E;&#x89C2;&#x6D4B;&#x7CFB;&#x7EDF;&#xFF0C;&#x6B63;&#x6240;&#x8C13;&#x524D;&#x4EBA;&#x79CD;&#x6811;&#xFF0C;&#x540E;&#x4EBA;&#x4E58;&#x51C9;&#x3002;</p><ul><li><h4>&#x5982;&#x4F55;&#x6536;&#x96C6;&#x4F9D;&#x8D56;</h4></li></ul><p>&#x6211;&#x4EEC;&#x5DF2;&#x7ECF;&#x6709;&#x4E86;&#x54CD;&#x5E94;&#x5F0F;&#x6570;&#x636E;&#x7CFB;&#x7EDF;&#xFF0C;&#x63A5;&#x4E0B;&#x6765;&#x8981;&#x89E3;&#x51B3;&#x7684;&#x95EE;&#x9898;&#x5C31;&#x662F;&#x5982;&#x4F55;&#x6536;&#x96C6;&#x4F9D;&#x8D56;&#xFF0C;&#x6536;&#x96C6;&#x4F9D;&#x8D56;&#x5FC5;&#x987B;&#x8981;&#x89E6;&#x53D1;<code>get</code>&#xFF0C;&#x800C;&#x89E6;&#x53D1;get&#x7684;&#x524D;&#x63D0;&#x662F;&#x7EC4;&#x4EF6;&#x53EF;&#x4EE5;&#x62FF;&#x5230;<code>store</code>&#xFF0C;&#x56E0;&#x6B64;&#x7B2C;&#x4E00;&#x6B65;&#x662F;&#x5411;&#x7EC4;&#x4EF6;&#x6CE8;&#x5165;store&#x3002;&#x7C7B;&#x4F3C;react-redux&#xFF0C;reux&#x63D0;&#x4F9B;&#x4E86;Provider&#x4F7F;&#x5B50;&#x7EC4;&#x4EF6;&#x53EF;&#x4EE5;&#x62FF;&#x5230;store&#x3002;</p><pre><code class="js">class Provider extends Component {
  getChildContext() {
    return {store: this.props.store};
  }

  render() {
    const { children } = this.props;
    return children;
  }
}
Provider.childContextTypes = {
  store: PropTypes.object
};</code></pre><p>&#x76F8;&#x5E94;&#x7684;&#x5B50;&#x7EC4;&#x4EF6;&#x53EF;&#x4EE5;context&#x62FF;&#x5230;store&#xFF0C;&#x5982;&#x4E0B;</p><pre><code class="js">class Child extends Component {
  render() {
    // store =&gt; this.context.store
  }
}
Child.contextTypes = {
  store: PropTypes.object
};</code></pre><p>&#x8FD9;&#x6837;&#x5199;&#x7684;&#x7F3A;&#x70B9;&#x663E;&#x800C;&#x6613;&#x89C1;&#xFF0C;&#x6BCF;&#x4E2A;&#x5B50;&#x7EC4;&#x4EF6;&#x90FD;&#x9700;&#x8981;&#x5B9A;&#x4E49;contextTypes&#xFF0C;&#x540C;&#x6837;&#x7684;&#x7C7B;&#x4F3C;&#x4E8E;react-redux&#xFF0C;reux&#x63D0;&#x4F9B;&#x4E86;<code>connect</code>&#x51FD;&#x6570;&#xFF0C;&#x7528;&#x4E8E;&#x6620;&#x5C04;state =&gt; props</p><pre><code class="js">const connect = (mapStateToProps = () =&gt; {}) =&gt; {
  return (WrappedComponent) =&gt; {
    const Wrapper = class extends Component {
      render() {
        const store = this.context.store;
        const props = Object.assign({}, this.props, mapStateToProps(store.state, this.props), {dispatch: store.dispatch, commit: store.commit});
        return &lt;WrappedComponent {...props} /&gt;
      }
    }
    Wrapper.contextTypes = {
      store: PropTypes.object
    };
    reaturn Wrapper;
  }
}</code></pre><p>&#x8FD9;&#x6837;&#x4E00;&#x6765;&#xFF0C;&#x53EA;&#x8981;&#x7EC4;&#x4EF6;&#x6267;&#x884C;render&#x65B9;&#x6CD5;&#xFF0C;&#x4FBF;&#x4F1A;&#x89E6;&#x53D1;<code>get</code>&#x94A9;&#x5B50;&#xFF0C;&#x4ECE;&#x800C;&#x4F7F;&#x5F97;store&#x81EA;&#x52A8;&#x6536;&#x96C6;&#x4F9D;&#x8D56;&#xFF0C;&#x6211;&#x4EEC;&#x518D;&#x60F3;&#x4E0B;&#x4F9D;&#x8D56;&#x662F;&#x4EC0;&#x4E48;&#xFF0C;&#x5176;&#x5B9E;&#x4F9D;&#x8D56;&#x5E94;&#x8BE5;&#x662F;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B;&#xFF0C;&#x90A3;&#x4E48;&#x5F53;<code>set</code>&#x94A9;&#x5B50;&#x89E6;&#x53D1;&#x65F6;&#xFF0C;&#x6BCF;&#x4E2A;&#x4F9D;&#x8D56;&#xFF08;&#x5373;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B;&#xFF09;&#x53EA;&#x8981;&#x6267;&#x884C;forceUpdate&#x65B9;&#x6CD5;&#x5C31;&#x53EF;&#x4EE5;&#x8FBE;&#x5230;rerender&#x7684;&#x6548;&#x679C;&#x3002;</p><p>&#x4F46;&#x662F;&#x95EE;&#x9898;&#x662F;&#xFF0C;<code>get</code>&#x94A9;&#x5B50;&#x89E6;&#x53D1;&#x65F6;&#xFF0C;&#x5982;&#x4F55;&#x786E;&#x5B9A;&#x4F9D;&#x8D56;&#x5230;&#x5E95;&#x662F;&#x8C01;&#x5462;&#xFF1F;&#x501F;&#x9274;vue&#xFF0C;&#x6211;&#x4EEC;&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;stack&#xFF0C;&#x5F53;<code>componentWillMount</code>&#x65F6;&#x8FDB;&#x6808;&#xFF0C;&#x5F53;<code>componentDidMount</code>&#x65F6;&#x51FA;&#x6808;</p><pre><code class="js">componentWillMount() {
  pushTarget(this);
}

componentDidMount() {
  popTarget(this);
}</code></pre><p>&#x8FD9;&#x6837;&#x5F53;<code>get</code>&#x94A9;&#x5B50;&#x89E6;&#x53D1;&#x65F6;&#xFF0C;&#x5F53;&#x524D;target&#x5C31;&#x662F;&#x76EE;&#x6807;&#x4F9D;&#x8D56;&#x3002;&#x540C;&#x65F6;&#x5E94;&#x5F53;&#x6CE8;&#x610F;&#xFF0C;&#x5F53;&#x7EC4;&#x4EF6;update&#x65F6;&#x5E94;&#x5F53;&#x91CD;&#x65B0;&#x6536;&#x96C6;&#x4F9D;&#x8D56;&#xFF0C;&#x56E0;&#x4E3A;update&#x4E4B;&#x540E;&#x4F9D;&#x8D56;&#x5173;&#x7CFB;&#x5F88;&#x53EF;&#x80FD;&#x5DF2;&#x7ECF;&#x53D8;&#x5316;&#x4E86;</p><pre><code class="js">update() {
  // &#x6E05;&#x7A7A;&#x4F9D;&#x8D56;
  this.clear();
  pushTarget(this);
  this.forceUpdate(() =&gt; {
    popTarget(this);
  })
}</code></pre><p>&#x81F3;&#x6B64;&#xFF0C;&#x6211;&#x4EEC;&#x7684;&#x5C0F;&#x76EE;&#x6807;&#x5DF2;&#x7ECF;&#x5B8C;&#x6210;&#x4E86;&#xFF0C;&#x5728;react&#x4E2D;&#x4F7F;&#x7528;vuex&#x4E0D;&#x518D;&#x662F;&#x68A6;&#xFF01;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
骚操作！在react中使用vuex

## 原文链接
[https://segmentfault.com/a/1190000015806735](https://segmentfault.com/a/1190000015806735)

