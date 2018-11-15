---
title: Using React components in your Ember app
hidden: true
categories: reprint
slug: 414ae069
date: 2018-10-20 00:00:00
---

{{< raw >}}

            <blockquote>
<p><em>声明:</em> 我是学习Ember.js团队的一员，本篇文章不是要比较react和ember.这两个框架都非常棒！</p>
</blockquote>
<p>如果一个使用Ember的团队想要重用React团队的组件该怎么做呢？或者您可能知道并喜欢多个前端工具集。本篇文章正适合这些人，当然还有思想开放的开发者!</p>
<p>这些都是基于我在企业工作时做的改变，截止目前为止在生产环境上已经使用了6个月的经验之谈。要注意的唯一因素是通过确保应用程序不包含React库的重复项来压缩大小。</p>
<p>接下来首先要让Ember项目能够识别JSX的语法，给予它编译JSX代码的能力。在Ember项目中运行下面的命令：</p>
<pre><code class="hljs maxima">npm install --<span class="hljs-built_in">save</span>-dev babel-plugin-<span class="hljs-built_in">transform</span>-class-<span class="hljs-built_in">properties</span> babel-plugin-<span class="hljs-built_in">transform</span>-react-jsx
</code></pre><p>在ember-cli-build.js文件中中， 做如下的修改：</p>
<p>ember-cli-build.js.diff </p>
<pre><code class="hljs javascript"><span class="hljs-meta">'use strict'</span>;

 <span class="hljs-keyword">const</span> EmberApp = <span class="hljs-built_in">require</span>(<span class="hljs-string">'ember-cli/lib/broccoli/ember-app'</span>);

 <span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">defaults</span>) </span>{
   <span class="hljs-keyword">let</span> app = <span class="hljs-keyword">new</span> EmberApp(defaults, {
-    <span class="hljs-comment">// Add options here</span>
+    babel: {
+      plugins: [
+        <span class="hljs-string">'transform-class-properties'</span>,
+        <span class="hljs-string">'transform-react-jsx'</span>,
+      ]
+    }
   });
</code></pre><p>接着，我们要确保有 <a href="https://eslint.org/">eslint</a> 来识别JSX代码. 在Ember项目中运行下面的代码：</p>
<pre><code class="hljs mipsasm">npm <span class="hljs-keyword">install </span>--save-dev eslint-plugin-<span class="hljs-keyword">babel </span>eslint-plugin-react   <span class="hljs-keyword">babel-eslint;
</span></code></pre><p>将如下修改添加到.eslintrc.js文件中：</p>
<pre><code class="hljs stylus">diff --git a/<span class="hljs-selector-class">.eslintrc</span><span class="hljs-selector-class">.js</span> b/<span class="hljs-selector-class">.eslintrc</span><span class="hljs-selector-class">.js</span>
index <span class="hljs-number">99</span>f9d25.<span class="hljs-selector-class">.b2970eb</span> <span class="hljs-number">100644</span>
--- a/<span class="hljs-selector-class">.eslintrc</span><span class="hljs-selector-class">.js</span>
+++ b/<span class="hljs-selector-class">.eslintrc</span><span class="hljs-selector-class">.js</span>
@@ -<span class="hljs-number">1</span>,<span class="hljs-number">11</span> +<span class="hljs-number">1</span>,<span class="hljs-number">17</span> @@
 module<span class="hljs-selector-class">.exports</span> = {
   root: true,
+  parser: <span class="hljs-string">'babel-eslint'</span>,
   parserOptions: {
     ecmaVersion: <span class="hljs-number">2017</span>,
-    sourceType: <span class="hljs-string">'module'</span>
+    sourceType: <span class="hljs-string">'module'</span>,
+    ecmaFeatures: {
+      jsx: true
+    }
   },
   plugins: [
-    <span class="hljs-string">'ember'</span>
+    <span class="hljs-string">'babel'</span>,
+    <span class="hljs-string">'ember'</span>,
+    <span class="hljs-string">'react'</span>,
   ],
   extends: [
     <span class="hljs-string">'eslint:recommended'</span>,
@@ -<span class="hljs-number">15</span>,<span class="hljs-number">6</span> +<span class="hljs-number">21</span>,<span class="hljs-number">8</span> @@ module<span class="hljs-selector-class">.exports</span> = {
     browser: true
   },
   rules: {
+    <span class="hljs-string">'react/jsx-uses-react'</span>: <span class="hljs-string">'error'</span>,
+    <span class="hljs-string">'react/jsx-uses-vars'</span>: <span class="hljs-string">'error'</span>,
   },
   overrides: [
     <span class="hljs-comment">// node files</span>
</code></pre><p>运行如下命令在项目中添加React和React DOM</p>
<pre><code class="hljs sql">npm <span class="hljs-keyword">install</span> <span class="hljs-comment">--save react react-dom</span>
</code></pre><p>接着在ember-cli-build.js文件中做如下修改：</p>
<p>ember-cli-build.js.diff</p>
<pre><code class="hljs javascript"><span class="hljs-meta">'use strict'</span>;

<span class="hljs-keyword">const</span> EmberApp = <span class="hljs-built_in">require</span>(<span class="hljs-string">'ember-cli/lib/broccoli/ember-app'</span>);
<span class="hljs-keyword">const</span> glob = <span class="hljs-built_in">require</span>(<span class="hljs-string">'glob'</span>);

<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">defaults</span>) </span>{
  <span class="hljs-keyword">let</span> app = <span class="hljs-keyword">new</span> EmberApp(defaults, {
    <span class="hljs-comment">// Add options here</span>
    babel: {
      <span class="hljs-attr">plugins</span>: [
        <span class="hljs-string">'transform-class-properties'</span>,
        <span class="hljs-string">'transform-react-jsx'</span>,
      ]
    }
  });

  <span class="hljs-comment">// Use `app.import` to add additional libraries to the generated</span>
  <span class="hljs-comment">// output files.</span>
  <span class="hljs-comment">//</span>
  <span class="hljs-comment">// If you need to use different assets in different</span>
  <span class="hljs-comment">// environments, specify an object as the first parameter. That</span>
  <span class="hljs-comment">// object's keys should be the environment name and the values</span>
  <span class="hljs-comment">// should be the asset to use in that environment.</span>
  <span class="hljs-comment">//</span>
  <span class="hljs-comment">// If the library that you are including contains AMD or ES6</span>
  <span class="hljs-comment">// modules that you would like to import into your application</span>
  <span class="hljs-comment">// please specify an object with the list of modules as keys</span>
  <span class="hljs-comment">// along with the exports of each module as its value.</span>

+  app.import({
+    development: <span class="hljs-string">'node_modules/react/umd/react.development.js'</span>,
+    production: <span class="hljs-string">'node_modules/react/umd/react.production.min.js'</span>
+  });
+
+  app.import({
+    development: <span class="hljs-string">'node_modules/react-dom/umd/react-dom.development.js'</span>,
+    production: <span class="hljs-string">'node_modules/react-dom/umd/react-dom.production.min.js'</span>
+  });

   <span class="hljs-keyword">return</span> app.toTree();
 };
</code></pre><p>添加这些imports会在app中引入全局React和ReactDOM对象。这非常重要， 因为任何我们要引入的React库要正常工作都需要全局调用这些对象。</p>
<p>让我们创建vendor shims，以便我们可以让这些库使用es6导入语法。我们不在这些imports上使用amd transformation的原因是在使用transformation时不会创建全局对象。</p>
<p>运行以下命令，并使用下面所示的要点替换生成的文件的内容。接着在ember-cli-build.js文件中引入它们。</p>
<pre><code class="hljs verilog">ember <span class="hljs-keyword">generate</span> vendor-shim react
ember <span class="hljs-keyword">generate</span> vendor-shim react-dom
</code></pre><p>ember-cli-build.js.diff</p>
<pre><code class="hljs aspectj">   <span class="hljs-comment">// please specify an object with the list of modules as keys</span>
   <span class="hljs-comment">// along with the exports of each module as its value.</span>

   app.<span class="hljs-keyword">import</span>(<span class="hljs-string">'node_modules/react/umd/react.production.min.js'</span>);
   app.<span class="hljs-keyword">import</span>(<span class="hljs-string">'node_modules/react-dom/umd/react-dom.production.min.js'</span>);

+  app.<span class="hljs-keyword">import</span>(<span class="hljs-string">'vendor/shims/react.js'</span>);
+  app.<span class="hljs-keyword">import</span>(<span class="hljs-string">'vendor/shims/react-dom.js'</span>);

   <span class="hljs-function"><span class="hljs-keyword">return</span> app.<span class="hljs-title">toTree</span><span class="hljs-params">()</span></span>;
 };
</code></pre><p> react-dom.js</p>
<pre><code class="hljs javascript">(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">vendorModule</span>(<span class="hljs-params"></span>) </span>{
<span class="hljs-meta">    'use strict'</span>;

    <span class="hljs-keyword">return</span> {
      <span class="hljs-string">'default'</span>: self[<span class="hljs-string">'ReactDOM'</span>],
      <span class="hljs-attr">__esModule</span>: <span class="hljs-literal">true</span>,
    };
  }

  define(<span class="hljs-string">'react-dom'</span>, [], vendorModule);
})();
</code></pre><p>react.js</p>
<pre><code class="hljs javascript">(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">vendorModule</span>(<span class="hljs-params"></span>) </span>{
<span class="hljs-meta">    'use strict'</span>;
    <span class="hljs-keyword">return</span> {
      <span class="hljs-string">'default'</span>: self[<span class="hljs-string">'React'</span>],
      <span class="hljs-attr">__esModule</span>: <span class="hljs-literal">true</span>,
    };
  }

  define(<span class="hljs-string">'react'</span>, [], vendorModule);
})();
</code></pre><p>创建一个可以创建React组件容器的基类. 这个想法的背后原理是将React的组件包含在Ember的组件内。这样做有助于简化 <a href="https://www.infoq.com/presentations/Simple-Made-Easy">simple</a>这些组件。接下来创建一个包含以下内容的app/react-component.js文件。</p>
<p>react-component.js </p>
<pre><code class="hljs javascript"><span class="hljs-keyword">import</span> Component <span class="hljs-keyword">from</span> <span class="hljs-string">'@ember/component'</span>;
<span class="hljs-keyword">import</span> ReactDOM <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;


<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Component.extend({

  <span class="hljs-comment">/**
   * We don't need a template since we're only creating a
   * wrapper for our React component
   **/</span>
  layout: <span class="hljs-string">''</span>,

  <span class="hljs-comment">/**
   * Renders a react component as the current ember element
   * @param {React.Component} reactComponent. e.g., &lt;HelloWorld /&gt;
   */</span>
  reactRender(reactComponent) {
    ReactDOM.render(reactComponent, <span class="hljs-keyword">this</span>.element);
  },

  <span class="hljs-comment">/**
   * Removes a mounted React component from the DOM and
   * cleans up its event handlers and state.
   */</span>
  unmountReactElement() {
    ReactDOM.unmountComponentAtNode(<span class="hljs-keyword">this</span>.element);
  },

  <span class="hljs-comment">/**
   * Cleans up the rendered react component as the ember
   * component gets destroyed
   */</span>
  willDestroyComponent() {
    <span class="hljs-keyword">this</span>._super();
    <span class="hljs-keyword">this</span>.unmountReactElement();
  }

})
</code></pre><p>首先我们运行ember g component hell-world 创建必修的‘<em>hello world’</em> 组件， 并将如下内容添加到hello-world.js文件：</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">import</span> ReactComponent <span class="hljs-keyword">from</span> <span class="hljs-string">'../../react-component'</span>;

<span class="hljs-keyword">let</span> Greeter = <span class="hljs-function">(<span class="hljs-params">{name}</span>) =&gt;</span> &lt;h2&gt;Hello <span class="hljs-keyword">from</span> {name}!!!<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span></span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> ReactComponent.extend({
  didInsertElement() {
    <span class="hljs-keyword">this</span>._super(...arguments);
    <span class="hljs-keyword">this</span>.reactRender(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Greeter</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"React"</span>/&gt;</span>);
  }
});
</span></code></pre><p>这太简单了 🙂。 注意在第8行我们将值'React'传入到React组件中，这个属性可以是Ember组件的属性。现在来做一个更加复杂的示例。</p>
<p>在app中添加<a href="https://github.com/davidtheclark/react-aria-modal">react-aria-modal</a> 。并运行<code>npm install --save @sivakumar-kailasam/react-aria-modal</code>接着在ember-cli-build.js中做如下修改：</p>
<p>ember-cli-build.js.diff </p>
<pre><code class="hljs less">+  <span class="hljs-selector-tag">app</span><span class="hljs-selector-class">.import</span>(<span class="hljs-string">'node_modules/@sivakumar-kailasam/react-aria-modal/dist/react-aria-modal.js'</span>, {
+    <span class="hljs-attribute">using</span>: [{
+      <span class="hljs-attribute">transformation</span>: <span class="hljs-string">'amd'</span>,
+      <span class="hljs-attribute">as</span>: <span class="hljs-string">'react-aria-modal'</span>
+    }]
+  });
</code></pre><p>现在可以在app中使用它了，先创建一个component的容器。</p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">ember g component aria-modal</span>
</code></pre><p>dialog-modal.js </p>
<pre><code class="hljs javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> AriaModal <span class="hljs-keyword">from</span> <span class="hljs-string">'react-aria-modal'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">DemoModal</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{

  state = {
    <span class="hljs-attr">modalActive</span>: <span class="hljs-literal">false</span>
  };

  activateModal = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">this</span>.setState({ <span class="hljs-attr">modalActive</span>: <span class="hljs-literal">true</span> });
  };

  deactivateModal = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">this</span>.setState({ <span class="hljs-attr">modalActive</span>: <span class="hljs-literal">false</span> });
  };

  getApplicationNode = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'ember-application'</span>);
  };

  render() {
    <span class="hljs-keyword">const</span> modal = <span class="hljs-keyword">this</span>.state.modalActive
      ? <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">AriaModal</span>
          <span class="hljs-attr">titleText</span>=<span class="hljs-string">{this.props.title}</span>
          <span class="hljs-attr">onExit</span>=<span class="hljs-string">{this.deactivateModal}</span>
          <span class="hljs-attr">initialFocus</span>=<span class="hljs-string">"#demo-one-deactivate"</span>
          <span class="hljs-attr">getApplicationNode</span>=<span class="hljs-string">{this.getApplicationNode}</span>
          <span class="hljs-attr">underlayStyle</span>=<span class="hljs-string">"{{"</span> <span class="hljs-attr">paddingTop:</span> '<span class="hljs-attr">2em</span>' }}
        &gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"demo-two-modal"</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"modal"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">header</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"modal-header"</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"demo-two-title"</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"modal-title"</span>&gt;</span>
                {this.props.title}
              <span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"modal-body"</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
                Here is a modal
                {' '}
                <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span>with<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
                {' '}
                <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span>some<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
                {' '}
                <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span>focusable<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
                {' '}
                parts.
              <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> this.props.onTextChange(e.target.value)} value={this.props.title}/&gt;
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">footer</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"modal-footer"</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"demo-one-deactivate"</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.deactivateModal}</span>&gt;</span>
                deactivate modal
              <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">footer</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">AriaModal</span>&gt;</span>
      : false;

    return (
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.activateModal}</span>&gt;</span>
          activate modal
        <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        {modal}
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    );
  }
}
</span></code></pre><p>modal.js</p>
<pre><code class="hljs kotlin"><span class="hljs-keyword">import</span> ReactComponent from <span class="hljs-string">'../../react-component'</span>;
<span class="hljs-keyword">import</span> DemoModal from <span class="hljs-string">'./demo-modal'</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-keyword">get</span>, <span class="hljs-keyword">set</span> } from <span class="hljs-string">'@ember/object'</span>;

export <span class="hljs-keyword">default</span> ReactComponent.extend({

  title: <span class="hljs-string">'An awesome demo'</span>,

  onTextChange(text) {
    <span class="hljs-keyword">set</span>(<span class="hljs-keyword">this</span>, <span class="hljs-string">'title'</span>, text);
    <span class="hljs-keyword">this</span>.renderModal();
  },

  didInsertElement() {
    <span class="hljs-keyword">this</span>._super(...arguments);
    <span class="hljs-keyword">this</span>.renderModal();
  },

  renderModal() {
    <span class="hljs-keyword">this</span>.reactRender(
      &lt;DemoModal
        title={<span class="hljs-keyword">get</span>(<span class="hljs-keyword">this</span>, <span class="hljs-string">'title'</span>)}
        onTextChange={(text) =&gt; <span class="hljs-keyword">this</span>.onTextChange(text)}
        /&gt;
    );
  }

});
</code></pre><p>这个例子演示了在React和Ember组件间绑定方法的一种方式。通过绑有Ember组件的方法的React组件传值来更新标题，并重新渲染react组件。</p>
<p>注意以下的动图记录了如何立即重新渲染更新的内容。这是因为增加的更新应用到了已经渲染的React组件中。可以在文章末点击demo网站链接体验。</p>
<p><img src="https://p0.ssl.qhimg.com/t0192a74e4b6f3edd9e.gif" alt=""></p>
<p>上面这些，你可能自己很轻松的做出来了。但是直到现在我还有个重要的因素没提到😅。</p>
<p>你要引入的React组件需要接受UMD模块加载规范。可以阅读学习 <a href="https://medium.freecodecamp.org/javascript-modules-a-beginner-s-guide-783f7d7a5fcc">https://medium.freecodecamp.org/javascript-modules-a-beginner-s-guide-783f7d7a5fcc</a> 了解UMD和其他模块化加载格式，</p>
<p>必须在react-aria-modal的fork上设置[rollup.js]（<a href="https://rollupjs.org/guide/en">https://rollupjs.org/guide/en</a>) 才能运行这个演示应用程序。在这里 <a href="https://github.com/davidtheclark/react-aria-modal/compare/master...sivakumar-kailasam:master">https://github.com/davidtheclark/react-aria-modal/compare/master...sivakumar-kailasam:master</a> 查阅rollup的功能。</p>
<p>如果你的React组件项目是用了<a href="https://webpack.js.org/">webpack</a>,你可以查阅 <a href="https://github.com/bvaughn/react-virtualized">https://github.com/bvaughn/react-virtualized</a> 找到需要生成多种模块格式输出的webpack的设置。</p>
<p>在<a href="https://sivakumar-kailasam.github.io/react-integration-sample/">https://sivakumar-kailasam.github.io/react-integration-sample/</a> 可以看到开发好的app，在<a href="https://github.com/sivakumar-kailasam/react-integration-sample">repo</a>查看出现在这篇博文的代码。试试用Ember和React的开发者工具查看这个app玩玩！😎</p>
<p><em>编辑:</em> <a href="https://medium.com/@alexlafroscia"><em>Alex LaFroscia</em></a> <em>在这篇文章的基础上发布了一个实验性的addon(插件)</em> <a href="https://github.com/alexlafroscia/ember-cli-react">https://github.com/alexlafroscia/ember-cli-react</a> .这是我为什么热爱emer社区！</p>
<p>如果你喜欢这篇文章, 在twitter <a href="https://twitter.com/sivakumar_k/">@sivakumar_k</a>上关注我。</p>

          
{{< /raw >}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/using-react-components-in-your-ember-app](https://www.zcfy.cc/article/using-react-components-in-your-ember-app)
原文标题: Using React components in your Ember app
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
