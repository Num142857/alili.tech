---
title: 'React-Redux技术栈——之redux-form详解' 
date: 2019-01-09 2:30:12
hidden: true
slug: splxyfl3yyn
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>React中没有类似Angular那样的双向数据绑定，在做一些表单复杂的后台类页面时，监听、赋值、传递、校验时编码相对复杂，满屏的样板代码伤痛欲绝，故引入可以解决这些问题的 <code>redux-form</code> (v6) 模块。本文大致翻译了官方文档一些比较重要的地方，结合官方Demo加入了一些特性，有些官方跑不起来的地方也进行了优化。</p></blockquote>
<ul>
<li><p>项目地址: <a href="https://github.com/tedyuen/react-redux-form-v6-example" rel="nofollow noreferrer" target="_blank">https://github.com/tedyuen/react-redux-form-v6-example</a></p></li>
<li><p><a href="https://tedyuen.github.io/redux-form-demo" rel="nofollow noreferrer" target="_blank">在线演示地址</a></p></li>
<li><p>本地演示方法: <code>npm install &amp;&amp; npm run start</code></p></li>
<li><p>如对翻译有困惑，请移步<a href="http://redux-form.com/6.8.0/" rel="nofollow noreferrer" target="_blank">官方文档</a>，对Demo的理解有异议欢迎留言或私信。转载请注明出处<a href="https://github.com/tedyuen/react-redux-form-v6-example/blob/master/README.md" rel="nofollow noreferrer" target="_blank">Ted Yuen</a></p></li>
</ul>
<h2 id="articleHeader0">起步</h2>
<h4>在使用 <code>redux-form</code> 之前，需要具备以下基础:</h4>
<ul>
<li><p><a href="http://redux.js.org/" rel="nofollow noreferrer" target="_blank">Redux</a> （<a href="http://cn.redux.js.org/" rel="nofollow noreferrer" target="_blank">中文</a>）</p></li>
<li><p><a href="https://facebook.github.io/react/" rel="nofollow noreferrer" target="_blank">React</a> 和 <a href="https://facebook.github.io/react/docs/higher-order-components.html" rel="nofollow noreferrer" target="_blank">高阶组件</a></p></li>
</ul>
<h4>关于 <code>redux-form</code> 的三个主要模块:</h4>
<ul>
<li><p><strong><code>formReducer reducer</code></strong> : 表单的各种操作以 Redux action 的方式，通过此 reducer 来促使 Redux store 数据的变化。</p></li>
<li><p><strong><code>reduxForm() HOC</code></strong> : 此高阶组件用以整合 Redux action 绑定的用户交互与您的组件，并返回一个新的组件供以使用。</p></li>
<li><p><strong><code>&lt;Field/&gt;</code></strong> : 用此代替您原本的 <code>&lt;input/&gt;</code> 组件，可以与redux-form的逻辑相连接。</p></li>
</ul>
<h4>数据流:</h4>
<p>在大部分情况下您不需要关心如何创建action，一切都是自动的。下图展示了一个简易的数据流:</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010088551" src="https://static.alili.tech/img/remote/1460000010088551" alt="Data flow" title="Data flow" style="cursor: pointer; display: inline;"></span></p>
<p>举个简单的例子，我们有一个被 <code>reduxForm()</code> 创建的表单组件，里面有一个用 <code>&lt;Field/&gt;</code> 创建的 <code>&lt;input/&gt;</code> 组件，数据流大概是这个样子的:</p>
<ol>
<li><p>用户点击这个 <code>&lt;input/&gt;</code> 组件,</p></li>
<li><p>"Focus action" 被触发,</p></li>
<li><p>formReducer 更新了对应的状态,</p></li>
<li><p>这个状态被传回 <code>&lt;input/&gt;</code> 组件中。</p></li>
</ol>
<p>与此类似的在这个 <code>&lt;input/&gt;</code> 中输入文字、更改状态、提交表单，也是遵循以上这个流程。</p>
<p><code>redux-form</code> 还能基于此流程处理许多事情，诸如:表单验证与格式化，多参数与action的创建。基于以下的向导，请自助挖掘更深层次的功能。</p>
<h4>基本使用向导</h4>
<h5>步骤 1/4: Form reducer</h5>
<p>store需要知道组件如何发送action,因此我们需要在您的store中注册 <code>formReducer</code>，他可以服务于整个app中你定义的所有表单组件，因此只需要注册一次。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
  // ...your other reducers here
  // you have to pass formReducer under 'form' key,
  // for custom keys look up the docs for 'getFormState'
  form: formReducer
})

const store = createStore(rootReducer)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { createStore, combineReducers } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux'</span>
<span class="hljs-keyword">import</span> { reducer <span class="hljs-keyword">as</span> formReducer } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux-form'</span>

<span class="hljs-keyword">const</span> rootReducer = combineReducers({
  <span class="hljs-comment">// ...your other reducers here</span>
  <span class="hljs-comment">// you have to pass formReducer under 'form' key,</span>
  <span class="hljs-comment">// for custom keys look up the docs for 'getFormState'</span>
  form: formReducer
})

<span class="hljs-keyword">const</span> store = createStore(rootReducer)</code></pre>
<p>注: 在reducer中合并的formReducer的key必须命名为"form"。如果您因某些原因需要自定义key，请移步 <a>getFormState config</a>查看详情。</p>
<h5>步骤 2/4: Form component</h5>
<p>为了使您的表单组件可以与store进行交互，我们需要使用高价函数 <code>reduxForm()</code> 来包裹您的组件。他可以在您执行提交表单等操作的时候，以props的方式提供表单内的state。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react'
import { Field, reduxForm } from 'redux-form'

let ContactForm = props => {
  const { handleSubmit } = props
  return (
    <form onSubmit={ handleSubmit }>
      { /* form body*/ }
    </form>
  )
}

ContactForm = reduxForm({
  // a unique name for the form
  form: 'contact'
})(ContactForm)

export default ContactForm;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-keyword">import</span> { Field, reduxForm } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux-form'</span>

<span class="hljs-keyword">let</span> ContactForm = <span class="hljs-function"><span class="hljs-params">props</span> =&gt;</span> {
  <span class="hljs-keyword">const</span> { handleSubmit } = props
  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">onSubmit</span>=<span class="hljs-string">{</span> <span class="hljs-attr">handleSubmit</span> }&gt;</span>
      { /* form body*/ }
    <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span></span>
  )
}

ContactForm = reduxForm({
  <span class="hljs-comment">// a unique name for the form</span>
  form: <span class="hljs-string">'contact'</span>
})(ContactForm)

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> ContactForm;</code></pre>
<p>现在我们已经有一个表单组件了，让我们添加一些input组件。</p>
<p>注: 如果您觉得 ()() 这类的语法很迷惑，您可以把它分两步来看:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ...

// create new, &quot;configured&quot; function
createReduxForm = reduxForm({ form: 'contact' })

// evaluate it for ContactForm component
ContactForm = createReduxForm( ContactForm )

export default ContactForm;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// ...</span>

<span class="hljs-comment">// create new, "configured" function</span>
createReduxForm = reduxForm({ <span class="hljs-attr">form</span>: <span class="hljs-string">'contact'</span> })

<span class="hljs-comment">// evaluate it for ContactForm component</span>
ContactForm = createReduxForm( ContactForm )

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> ContactForm;</code></pre>
<h5>步骤 3/4: Form <code>&lt;Field/&gt;</code> Components</h5>
<p><code>&lt;Field/&gt;</code> 组件可以连接所有input类型组件的数据到store中，基本用法如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Field name=&quot;inputName&quot; component=&quot;input&quot; type=&quot;text&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fsharp"><code class="jsx" style="word-break: break-word; white-space: initial;">&lt;Field name=<span class="hljs-string">"inputName"</span> component=<span class="hljs-string">"input"</span> <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"text"</span> /&gt;</code></pre>
<p>它创建了一个text类型的<code>&lt;input/&gt;</code>组件，还提供了诸如 <code>value</code> <code>onChange</code> <code>onBlur</code>等属性，用于跟踪和维护此组件的各种状态。</p>
<p>注: <code>&lt;Field/&gt;</code> 组件很强大，除了基本的类型，还可以配置类或者无状态组件，欲了解更多，请移步<a>Field usage</a>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react'
import { Field, reduxForm } from 'redux-form'

const ContactForm = props => {
  const { handleSubmit } = props
  return (
    <form onSubmit={ handleSubmit }>
      <div>
        <label htmlFor=&quot;firstName&quot;>First Name</label>
        <Field name=&quot;firstName&quot; component=&quot;input&quot; type=&quot;text&quot; />
      </div>
      <div>
        <label htmlFor=&quot;lastName&quot;>Last Name</label>
        <Field name=&quot;lastName&quot; component=&quot;input&quot; type=&quot;text&quot; />
      </div>
      <div>
        <label htmlFor=&quot;email&quot;>Email</label>
        <Field name=&quot;email&quot; component=&quot;input&quot; type=&quot;email&quot; />
      </div>
      <button type=&quot;submit&quot;>Submit</button>
    </form>
  )
}

ContactForm = reduxForm({
  // a unique name for the form
  form: 'contact'
})(ContactForm)

export default ContactForm;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code class="jsx"><span class="xml">import React from 'react'
import </span><span class="hljs-template-variable">{ Field, reduxForm }</span><span class="xml"> from 'redux-form'

const ContactForm = props =&gt; </span><span class="hljs-template-variable">{
  const { handleSubmit }</span><span class="xml"> = props
  return (
    <span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">onSubmit</span>=</span></span><span class="hljs-template-variable">{ handleSubmit }</span><span class="xml"><span class="hljs-tag">&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">htmlFor</span>=<span class="hljs-string">"firstName"</span>&gt;</span>First Name<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Field</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"firstName"</span> <span class="hljs-attr">component</span>=<span class="hljs-string">"input"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">htmlFor</span>=<span class="hljs-string">"lastName"</span>&gt;</span>Last Name<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Field</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"lastName"</span> <span class="hljs-attr">component</span>=<span class="hljs-string">"input"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">htmlFor</span>=<span class="hljs-string">"email"</span>&gt;</span>Email<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Field</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"email"</span> <span class="hljs-attr">component</span>=<span class="hljs-string">"input"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"email"</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"submit"</span>&gt;</span>Submit<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>
  )
}

ContactForm = reduxForm(</span><span class="hljs-template-variable">{
  // a unique name for the form
  form: 'contact'
}</span><span class="xml">)(ContactForm)

export default ContactForm;</span></code></pre>
<p>从现在开始，表单上的操作数据已经可以填充至store，并可以执行提交表单操作了。</p>
<h5>步骤 4/4: Reacting to submit</h5>
<p>提交的数据以JSON对象的形式注入了此表单组件的 <code>onSubmit</code> 方法里了，可以打印出来看:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react'
import ContactForm from './ContactForm'

class ContactPage extends React.Component {
  submit = (values) => {
    // print the form values to the console
    console.log(values)
  }
  render() {
    return (
      <ContactForm onSubmit={this.submit} />
    )
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code class="jsx"><span class="hljs-keyword">import</span> <span class="hljs-type">React</span> from <span class="hljs-symbol">'reac</span>t'
<span class="hljs-keyword">import</span> <span class="hljs-type">ContactForm</span> from './<span class="hljs-type">ContactForm</span>'

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ContactPage</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  submit = (values) =&gt; {
    <span class="hljs-comment">// print the form values to the console</span>
    console.log(values)
  }
  render() {
    <span class="hljs-keyword">return</span> (
      &lt;<span class="hljs-type">ContactForm</span> onSubmit={<span class="hljs-keyword">this</span>.submit} /&gt;
    )
  }
}</code></pre>
<h2 id="articleHeader1">表单value的生命周期</h2>
<p>本节对理解您的组件value通过 <code>redux-form</code> 的流向很重要</p>
<h4>Value 生命周期钩子函数</h4>
<p><code>redux-form</code> 提供了3个 value 生命周期钩子函数，通过props传递给Field组件，并且都是可选的。</p>
<h5><strong><em><code>format(value:Any) =&gt; String</code></em></strong></h5>
<p>格式化从store里拿出来的数据渲染到组件里，通常会在store保留原来的数据类型，只是在组件中使用的时候进行格式化。</p>
<h5><strong><em><code>parse(value:String) =&gt; Any</code></em></strong></h5>
<p>把用户输入的string类型的数据进行格式转化，放入store供你使用，也会在store保留转化后类型的数据。</p>
<h5><strong><em><code>normalize(value:Any, previousValue:Any, allValues:Object, previousAllValues:Object) =&gt; Any</code></em></strong></h5>
<p>允许您对当前字段数据添加某些约束的逻辑，比如可以约束 <code>midDate</code> 的日期在 <code>maxDate</code> 之前等。如果你添加了这些逻辑，通过 <code>normalize()</code>的value将会被解析。</p>
<h4>Value 生命周期</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010088552" src="https://static.alili.tech/img/remote/1460000010088552" alt="value lifecycle" title="value lifecycle" style="cursor: pointer;"></span></p>
<h2 id="articleHeader2">API</h2>
<p>限于篇幅问题，在此只列举每一种api常用的使用方法，具体请移步<a href="http://redux-form.com/6.8.0/docs/api/" rel="nofollow noreferrer" target="_blank">官方API文档</a></p>
<h3 id="articleHeader3">reduxForm(config:Object)</h3>
<p>通过配置一些参数创建一个可以让你配置你的表单的修饰器。诸如配置如何做表单验证、提交成功或失败的回调、获取或失去焦点的action发送、prop命名空间等，具体例子会在之后的demo中介绍。</p>
<h5>Importing</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var reduxForm = require('redux-form').reduxForm;  // ES5

import { reduxForm } from 'redux-form';  // ES6" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> reduxForm = <span class="hljs-built_in">require</span>(<span class="hljs-string">'redux-form'</span>).reduxForm;  <span class="hljs-comment">// ES5</span>

<span class="hljs-keyword">import</span> { reduxForm } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux-form'</span>;  <span class="hljs-comment">// ES6</span></code></pre>
<h5>常用参数介绍</h5>
<p>必要参数</p>
<ul><li><p><code>form : String[required]</code> : 用于命名您的表单，在store生成此命名的数据节点。</p></li></ul>
<p>可选参数</p>
<ul>
<li><p><code>onChange : Function [optional]</code> : 表单触发 onChange 事件后的回调。</p></li>
<li><p><code>onSubmit : Function [optional[</code> : 表单提交配置，可以配置需要提交哪些参数，还有提交时触发的 <code>dispatch</code>等。</p></li>
<li><p><code>onSubmitSuccess : Function [optional]</code> &amp; <code>onSubmitFail : Function [optional]</code> : 提交表单成功和失败的回调。</p></li>
<li><p><code>shouldValidate(params) : boolean [optional]</code> : 同步验证。</p></li>
<li><p><code>shouldAsyncValidate(params) : boolean [optional]</code> : 异步验证。</p></li>
<li><p><code>touchOnBlur : boolean [optional]</code> &amp; <code>touchOnChange : boolean [optional]</code> : 标识 <code>onBlur</code> 或 <code>onChange</code> 的触发。</p></li>
</ul>
<h3 id="articleHeader4">props</h3>
<p>列出全部当前页面由 <code>redux-form</code> 生成用于修饰此表单组件的props。</p>
<p>如果你希望用严格模式来编写 PropTypes， <code>redux-form</code> 会导出此处所有的 propTypes，你需要引用他们并可以添加自己的propTypes，像这样:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {reduxForm, propTypes} from 'redux-form';

class SimpleForm extends Component {
  static propTypes = {
    ...propTypes,
    // other props you might be using
  }
  // ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> {reduxForm, propTypes} <span class="hljs-keyword">from</span> <span class="hljs-string">'redux-form'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">SimpleForm</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">static</span> propTypes = {
    ...propTypes,
    <span class="hljs-comment">// other props you might be using</span>
  }
  <span class="hljs-comment">// ...</span>
}</code></pre>
<h5>常用属性</h5>
<ul>
<li><p><code>pristine</code> : <code>true</code> 表示表单数据为原始数据没被修改过，反之为 <code>dirty</code>。</p></li>
<li><p><code>submitting</code> : 用于表示您的表单提交状态，他只会在您的表单提交后返回一个 <code>promise</code> 对象时起作用。 <code>false</code> 表示 <code>promise</code> 对象为 <code>resolved</code> 或 <code>rejected</code> 状态。</p></li>
<li>
<p><code>handleSubmit(eventOrSubmit) : Function</code> : 提交表单的函数，如果表单需要验证，验证方法会被执行(包括同步和异步)。调用方法有两种:</p>
<ul>
<li><p>组件内部直接调用 <code>&lt;form onSubmit={handleSubmit}&gt;</code></p></li>
<li><p>赋值给prop外部调用 <code>&lt;MyDecoratedForm onSubmit={data =&gt; {//do something with data."}}"/&gt;</code></p></li>
</ul>
</li>
</ul>
<h3 id="articleHeader5">Field</h3>
<p>所有您需要与 <code>store</code> 数据连接的表单组件，都可以用 <code>&lt;Field/&gt;</code>。在正确使用它之前，有三条基本概念您需要了解清楚:</p>
<ol>
<li><p>必须包含 <code>name</code> 属性。可以是简单的字符串，如 <code>userName</code>、<code>password</code>，也可以是复杂的结构，如 <code>contact.billing.address[2].phones[1].areaCode</code>。</p></li>
<li><p>必须包含 <code>component</code> 属性。可以是一个组件、无状态组件或者DOM所支持的默认的标签(input、textarea、select)。</p></li>
<li><p>其他所有属性会通过prop传递到元素生成器中。如 <code>className</code></p></li>
</ol>
<h5>Importing</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Field = require('redux-form').Field;  // ES5

import { Field } from 'redux-form';  // ES6" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> Field = <span class="hljs-built_in">require</span>(<span class="hljs-string">'redux-form'</span>).Field;  <span class="hljs-comment">// ES5</span>

<span class="hljs-keyword">import</span> { Field } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux-form'</span>;  <span class="hljs-comment">// ES6</span></code></pre>
<h5>使用方法</h5>
<p>1.组件</p>
<p>可以是任何自定义的 <code>class</code> 组件活着其他第三方库。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// MyCustomInput.js
import React, { Component } from 'react'

class MyCustomInput extends Component {
  render() {
    const { input: { value, onChange } } = this.props
    return (
      <div>
        <span>The current value is {value}.</span>
        <button type=&quot;button&quot; onClick={() => onChange(value + 1)}>Inc</button>
        <button type=&quot;button&quot; onClick={() => onChange(value - 1)}>Dec</button>
      </div>
    )
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// MyCustomInput.js</span>
<span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyCustomInput</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">const</span> { <span class="hljs-attr">input</span>: { value, onChange } } = <span class="hljs-keyword">this</span>.props
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>The current value is {value}.<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> onChange(value + 1)}&gt;Inc<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> onChange(value - 1)}&gt;Dec<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    )
  }
}</code></pre>
<p>然后这样使用:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import MyCustomInput from './MyCustomInput'

...

<Field name=&quot;myField&quot; component={MyCustomInput}/>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> MyCustomInput <span class="hljs-keyword">from</span> <span class="hljs-string">'./MyCustomInput'</span>

...

&lt;Field name=<span class="hljs-string">"myField"</span> component={MyCustomInput}/&gt;</code></pre>
<p>2.无状态组件</p>
<p>这是一个非常灵活的使用 <code>&lt;Field/&gt;</code> 的方法，使用方法和 <code>redux-form</code> 的前一个版本很相似。但必须在你的 <code>render()</code> 方法外定义它，否则它每次渲染都会被重建，并且由于组件的 <code>prop</code> 会变，就会强制 <code>&lt;Field/&gt;</code> 进行渲染。如果你在 <code>render()</code> 内部定义无状态组件，不但会拖慢你的app，而且组件的input每次都会在组件重新渲染的时候失去焦点。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// outside your render() method
const renderField = (field) => (
    <div className=&quot;input-row&quot;>
      <input {...field.input} type=&quot;text&quot;/>
      {field.meta.touched &amp;&amp; field.meta.error &amp;&amp;
       <span className=&quot;error&quot;>{field.meta.error}</span>}
    </div>
  )

// inside your render() method
<Field name=&quot;myField&quot; component={renderField}/>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// outside your render() method</span>
<span class="hljs-keyword">const</span> renderField = <span class="hljs-function">(<span class="hljs-params">field</span>) =&gt;</span> (
    &lt;div className="input-row"&gt;
      &lt;input {...field.input} type="text"/&gt;
      {field.meta.touched &amp;&amp; field.meta.error &amp;&amp;
       &lt;span className="error"&gt;{field.meta.error}&lt;/span&gt;}
    &lt;/div&gt;
  )

// inside your render() method
&lt;Field name="myField" component={renderField}/&gt;</code></pre>
<p>3.string: input, select, or textarea</p>
<p>比如创建一个文字输入框组件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Field component=&quot;input&quot; type=&quot;text&quot;/>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">&lt;Field component=<span class="hljs-string">"input"</span> type=<span class="hljs-string">"text"</span>/&gt;</code></pre>
<h3 id="articleHeader6">Fields</h3>
<p>与 <code>Field</code> 相似，但是它同时使用多个fields。<code>&lt;Fields/&gt;</code> 在 <code>name</code> 属性中使用一组表单name的数组，而不是用单一一个 <code>name</code> 属性来表示。</p>
<p><strong>重要: 请节制使用 <code>&lt;Fields/&gt;</code>，其内部任何表单组件数据变化时，都会重新渲染整个 <code>&lt;Fields/&gt;</code>。因此会成为您app的性能瓶颈。除非你真的需要这么做，最好还是用 <code>&lt;Field/&gt;</code> 来一个个自定义您的表单组件</strong></p>
<h5>Importing</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Fields = require('redux-form').Fields;  // ES5

import { Fields } from 'redux-form';  // ES6" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> Fields = <span class="hljs-built_in">require</span>(<span class="hljs-string">'redux-form'</span>).Fields;  <span class="hljs-comment">// ES5</span>

<span class="hljs-keyword">import</span> { Fields } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux-form'</span>;  <span class="hljs-comment">// ES6</span></code></pre>
<h5>使用方法</h5>
<p>与 <code>&lt;Field/&gt;</code> 差不多，有2种使用方式，组件与无状态组件，这里不详细介绍。</p>
<h3 id="articleHeader7">FieldArray</h3>
<p>这个组件可以让你定义一系列的表单，它的工作原理和 <code>&lt;Field/&gt;</code> 一样。通过 <code>&lt;Field/&gt;</code>，给它一个 <code>name</code>，就可以映射到 <code>Redux state</code>中的指定位置。组件也可以通过连接到 <code>Redux state</code> 的 <code>props</code> 进行渲染。</p>
<p>通过 <code>&lt;FieldArray/&gt;</code> ，你也需要和 <code>&lt;Field/&gt;</code> 一样给它一个 <code>name</code>。而你注入 <code>&lt;FieldArray/&gt;</code> 的组件会通过字段数组收到一系列的 <code>props</code>,用以查询、更新和迭代。</p>
<h5>Importing</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var FieldArray = require('redux-form').FieldArray;  // ES5

import { FieldArray } from 'redux-form';  // ES6" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> FieldArray = <span class="hljs-built_in">require</span>(<span class="hljs-string">'redux-form'</span>).FieldArray;  <span class="hljs-comment">// ES5</span>

<span class="hljs-keyword">import</span> { FieldArray } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux-form'</span>;  <span class="hljs-comment">// ES6</span></code></pre>
<h5>使用方法</h5>
<p>后面Demo里会具体介绍</p>
<h3 id="articleHeader8">Form</h3>
<p><code>Form</code> 组件对React的form组件进行了简单的封装，用以触发用 <code>redux-form</code> 修饰的组件的 <code>onSubmit</code> 函数。</p>
<p>您可以在以下场景中使用它:</p>
<ul>
<li><p>在您表单组件内部，可以通过 <code>onSubmit={this.props.handleSubmit(this.mySubmitFunction)}</code> 执行您的提交。</p></li>
<li>
<p>或者</p>
<ul>
<li><p>通过 <a href="http://redux-form.com/6.8.0/docs/api/ReduxForm.md/#-submit-promise-" rel="nofollow noreferrer" target="_blank">submit() Instance API</a>来启动您的提交内容。(即，在引用您的表单组件的地方直接调用)</p></li>
<li><p>通过 <code>dispatch</code> 一个 <code>action</code> 的方式启动调用。请参考 <a href="http://redux-form.com/6.8.0/examples/remoteSubmit/" rel="nofollow noreferrer" target="_blank">Remote Submit Example</a></p></li>
</ul>
</li>
</ul>
<p>如果您只是将 <code>onSubmit</code> 函数作为你的配置或属性，那么你不需要用到这个组件。</p>
<h5>Importing</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Form = require('redux-form').Form;  // ES5

import { Form } from 'redux-form';  // ES6" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> Form = <span class="hljs-built_in">require</span>(<span class="hljs-string">'redux-form'</span>).Form;  <span class="hljs-comment">// ES5</span>

<span class="hljs-keyword">import</span> { Form } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux-form'</span>;  <span class="hljs-comment">// ES6</span></code></pre>
<h5>使用方法</h5>
<p>只需要将您组件中所有 <code>&lt;form&gt;</code> 替换成 <code>&lt;Form&gt;</code> 即可。</p>
<h3 id="articleHeader9">FormSection</h3>
<p><code>FormSection</code> 可以很简单地将现有的表单组件分割成更小的组件，用以在复杂的表单中进行复用。它是通过明确规定好的 <code>Field</code>、<code>Fields</code>和<code>FieldArray</code>字组件 <code>name</code>的前缀来完成此功能的。</p>
<h5>使用方法</h5>
<p>这个例子所描述的业务是一个购买人与收件人视角的订单用户信息表单结构。购买人与收件人拥有相同的字段结构，因此把这个部分拆分成一个名为 <code>Party</code> 的组件是有意义的。假设现在 <code>Party</code> 包含 <code>givenName</code> <code>middleName</code> <code>surname</code> <code>address</code> 这几个字段，然后将 <code>address</code> 部分再度拆分成可重用的组件 <code>Address</code>。代码如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//Address.js
class Address extends Component {
    render() {
        return <div>
            <Field name=&quot;streetName&quot; component=&quot;input&quot; type=&quot;text&quot;/>
            <Field name=&quot;number&quot; component=&quot;input&quot; type=&quot;text&quot;/>
            <Field name=&quot;zipCode&quot; component=&quot;input&quot; type=&quot;text&quot;/>
        </div>
    }
}

//Party.js
class Party extends Component {
    render() {
        return <div>
            <Field name=&quot;givenName&quot; component=&quot;input&quot; type=&quot;text&quot;/>
            <Field name=&quot;middleName&quot; component=&quot;input&quot; type=&quot;text&quot;/>
            <Field name=&quot;surname&quot; component=&quot;input&quot; type=&quot;text&quot;/>
            <FormSection name=&quot;address&quot;>
                <Address/>
            </FormSection>
        </div>
    }
}

//OrderForm.js
class OrderForm extends Component {
    render() {
        return <form onsubmit={...}>
            <FormSection name=&quot;buyer&quot;>
                <Party/>
            </FormSection>
            <FormSection name=&quot;recipient&quot;>
                <Party/>
            </FormSection>
        </form>
    }
}
//don't forget to connect OrderForm with reduxForm()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code class="jsx"><span class="hljs-comment">//Address.js</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Address</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    render() {
        <span class="hljs-keyword">return</span> &lt;div&gt;
            &lt;<span class="hljs-type">Field</span> name=<span class="hljs-string">"streetName"</span> component=<span class="hljs-string">"input"</span> <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"text"</span>/&gt;
            &lt;<span class="hljs-type">Field</span> name=<span class="hljs-string">"number"</span> component=<span class="hljs-string">"input"</span> <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"text"</span>/&gt;
            &lt;<span class="hljs-type">Field</span> name=<span class="hljs-string">"zipCode"</span> component=<span class="hljs-string">"input"</span> <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"text"</span>/&gt;
        &lt;/div&gt;
    }
}

<span class="hljs-comment">//Party.js</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Party</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    render() {
        <span class="hljs-keyword">return</span> &lt;div&gt;
            &lt;<span class="hljs-type">Field</span> name=<span class="hljs-string">"givenName"</span> component=<span class="hljs-string">"input"</span> <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"text"</span>/&gt;
            &lt;<span class="hljs-type">Field</span> name=<span class="hljs-string">"middleName"</span> component=<span class="hljs-string">"input"</span> <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"text"</span>/&gt;
            &lt;<span class="hljs-type">Field</span> name=<span class="hljs-string">"surname"</span> component=<span class="hljs-string">"input"</span> <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"text"</span>/&gt;
            &lt;<span class="hljs-type">FormSection</span> name=<span class="hljs-string">"address"</span>&gt;
                &lt;<span class="hljs-type">Address</span>/&gt;
            &lt;/<span class="hljs-type">FormSection</span>&gt;
        &lt;/div&gt;
    }
}

<span class="hljs-comment">//OrderForm.js</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">OrderForm</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    render() {
        <span class="hljs-keyword">return</span> &lt;form onsubmit={...}&gt;
            &lt;<span class="hljs-type">FormSection</span> name=<span class="hljs-string">"buyer"</span>&gt;
                &lt;<span class="hljs-type">Party</span>/&gt;
            &lt;/<span class="hljs-type">FormSection</span>&gt;
            &lt;<span class="hljs-type">FormSection</span> name=<span class="hljs-string">"recipient"</span>&gt;
                &lt;<span class="hljs-type">Party</span>/&gt;
            &lt;/<span class="hljs-type">FormSection</span>&gt;
        &lt;/form&gt;
    }
}
<span class="hljs-comment">//don't forget to connect OrderForm with reduxForm()</span></code></pre>
<p>字段完整的名字最后将变成如 <code>buyer.address.streetName</code> 的形式，结果结构如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;buyer&quot;: {
        &quot;givenName&quot;: &quot;xxx&quot;,
        &quot;middleName&quot;: &quot;yyy&quot;,
        &quot;surname&quot;: &quot;zzz&quot;,
        &quot;address&quot;: {
            &quot;streetName&quot;: undefined,
            &quot;number&quot;: &quot;123&quot;,
            &quot;zipCode&quot;: &quot;9090&quot;
        }
    },
    &quot;recipient&quot;: {
        &quot;givenName&quot;: &quot;aaa&quot;,
        &quot;middleName&quot;: &quot;bbb&quot;,
        &quot;surname&quot;: &quot;ccc&quot;,
        &quot;address&quot;: {
            &quot;streetName&quot;: &quot;foo&quot;,
            &quot;number&quot;: &quot;4123&quot;,
            &quot;zipCode&quot;: &quot;78320&quot;
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
    <span class="hljs-attr">"buyer"</span>: {
        <span class="hljs-attr">"givenName"</span>: <span class="hljs-string">"xxx"</span>,
        <span class="hljs-attr">"middleName"</span>: <span class="hljs-string">"yyy"</span>,
        <span class="hljs-attr">"surname"</span>: <span class="hljs-string">"zzz"</span>,
        <span class="hljs-attr">"address"</span>: {
            <span class="hljs-attr">"streetName"</span>: undefined,
            <span class="hljs-attr">"number"</span>: <span class="hljs-string">"123"</span>,
            <span class="hljs-attr">"zipCode"</span>: <span class="hljs-string">"9090"</span>
        }
    },
    <span class="hljs-attr">"recipient"</span>: {
        <span class="hljs-attr">"givenName"</span>: <span class="hljs-string">"aaa"</span>,
        <span class="hljs-attr">"middleName"</span>: <span class="hljs-string">"bbb"</span>,
        <span class="hljs-attr">"surname"</span>: <span class="hljs-string">"ccc"</span>,
        <span class="hljs-attr">"address"</span>: {
            <span class="hljs-attr">"streetName"</span>: <span class="hljs-string">"foo"</span>,
            <span class="hljs-attr">"number"</span>: <span class="hljs-string">"4123"</span>,
            <span class="hljs-attr">"zipCode"</span>: <span class="hljs-string">"78320"</span>
        }
    }
}</code></pre>
<p>类似 <code>Address</code> 的组件很少更改它的 <code>name</code>，为了使组件继承 <code>FormSection</code> 而不是 <code>Component</code>，需要设置一个默认的 <code>name</code> 如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Address extends FormSection {
    //ES2015 syntax with babel transform-class-properties
    static defaultProps = {
        name: &quot;address&quot;
    }
    render() {
        return <div>
            <Field name=&quot;streetName&quot; component=&quot;input&quot; type=&quot;text&quot;/>
            <Field name=&quot;number&quot; component=&quot;input&quot; type=&quot;text&quot;/>
            <Field name=&quot;zipCode&quot; component=&quot;input&quot; type=&quot;text&quot;/>
        </div>
    }
}
//Regular syntax:
/*
Address.defaultProps = {
    name: &quot;address&quot;
}
*/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code class="jsx"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Address</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">FormSection</span> </span>{
    <span class="hljs-comment">//ES2015 syntax with babel transform-class-properties</span>
    static defaultProps = {
        name: <span class="hljs-string">"address"</span>
    }
    render() {
        <span class="hljs-keyword">return</span> &lt;div&gt;
            &lt;<span class="hljs-type">Field</span> name=<span class="hljs-string">"streetName"</span> component=<span class="hljs-string">"input"</span> <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"text"</span>/&gt;
            &lt;<span class="hljs-type">Field</span> name=<span class="hljs-string">"number"</span> component=<span class="hljs-string">"input"</span> <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"text"</span>/&gt;
            &lt;<span class="hljs-type">Field</span> name=<span class="hljs-string">"zipCode"</span> component=<span class="hljs-string">"input"</span> <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"text"</span>/&gt;
        &lt;/div&gt;
    }
}
<span class="hljs-comment">//Regular syntax:</span>
<span class="hljs-comment">/*
Address.defaultProps = {
    name: "address"
}
*/</span></code></pre>
<h3 id="articleHeader10">formValues()</h3>
<p>作为一个修饰，可以读取当前表单的 <code>value</code>。当表单子组件的 <code>onChange</code> 依赖于当前表单里的值，很有用。</p>
<h5>Importing</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var formValues = require('redux-form').formValues;  // ES5

import { formValues } from 'redux-form';  // ES6" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> formValues = <span class="hljs-built_in">require</span>(<span class="hljs-string">'redux-form'</span>).formValues;  <span class="hljs-comment">// ES5</span>

<span class="hljs-keyword">import</span> { formValues } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux-form'</span>;  <span class="hljs-comment">// ES6</span></code></pre>
<h5>使用方法</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const ItemList = formValues('withVat')(MyItemizedList)

const ItemList = formValues({showVat: 'withVat'})(MyItemizedList)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> ItemList = formValues(<span class="hljs-string">'withVat'</span>)(MyItemizedList)

<span class="hljs-keyword">const</span> ItemList = formValues({<span class="hljs-attr">showVat</span>: <span class="hljs-string">'withVat'</span>})(MyItemizedList)</code></pre>
<p>这些装饰组件现在分别拥有了 <code>withVat</code>与<code>showVat</code>的 <code>props</code>。</p>
<h3 id="articleHeader11">formValueSelector()</h3>
<p><code>formValueSelector</code> 的API可以很方便的 <code>connect()</code> <code>state</code>的值到表单的 <code>value</code> 里。它可以通过表单的 <code>name</code> 为你的表单创建一个 <code>value</code> 拾取器。</p>
<h5>Importing</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var formValueSelector = require('redux-form').formValueSelector;  // ES5

import { formValueSelector } from 'redux-form';  // ES6" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> formValueSelector = <span class="hljs-built_in">require</span>(<span class="hljs-string">'redux-form'</span>).formValueSelector;  <span class="hljs-comment">// ES5</span>

<span class="hljs-keyword">import</span> { formValueSelector } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux-form'</span>;  <span class="hljs-comment">// ES6</span></code></pre>
<h5>使用方法</h5>
<p>首先需要按照你表单的 <code>name</code> 创建一个 <code>selector</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const selector = formValueSelector('myFormName')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> selector = formValueSelector(<span class="hljs-string">'myFormName'</span>)</code></pre>
<p>然后有几种方法使用 <code>selector</code>:</p>
<p>1.拾取个别的字段</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="connect(
  state => ({
    firstValue: selector(state, 'first'),
    secondValue: selector(state, 'second')
  })
)(MyFormComponent)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">connect(
  <span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> ({
    <span class="hljs-attr">firstValue</span>: selector(state, <span class="hljs-string">'first'</span>),
    <span class="hljs-attr">secondValue</span>: selector(state, <span class="hljs-string">'second'</span>)
  })
)(MyFormComponent)</code></pre>
<p>2.在分好组的 <code>prop</code> 中按组的方式拾取多个字段</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="connect(
  state => ({
    myValues: selector(state, 'first', 'second')
  })
)(MyFormComponent)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">connect(
  <span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> ({
    <span class="hljs-attr">myValues</span>: selector(state, <span class="hljs-string">'first'</span>, <span class="hljs-string">'second'</span>)
  })
)(MyFormComponent)</code></pre>
<p>3.把 <code>selector</code> 当作 <code>mapStateToProps</code> 来使用</p>
<p>如果你不需要 <code>state</code> 中其他的属性值，<code>selector</code>作为<code>mapStateToProps</code>可以自动完成这个工作。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="connect(
  state => selector(state, 'first', 'second')
)(MyFormComponent)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">connect(
  <span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> selector(state, <span class="hljs-string">'first'</span>, <span class="hljs-string">'second'</span>)
)(MyFormComponent)</code></pre>
<h3 id="articleHeader12">reducer</h3>
<p>表单的<code>reducer</code>用来安装您的 <code>Redux state</code> 到您的表单中。</p>
<p>如果您使用 <code>Immutablejs</code> 来管理您的 <code>Redux state</code>，你必须这么从 <code>redux-form/immutable</code> 中导入 <code>reducer</code> 模块。</p>
<h5>ES5例子</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var redux = require('redux');
var formReducer = require('redux-form').reducer;
// Or with Immutablejs:
// var formReducer = require('redux-form/immutable').reducer;

var reducers = {
  // ... your other reducers here ...
  form: formReducer
};
var reducer = redux.combineReducers(reducers);
var store = redux.createStore(reducer);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> redux = <span class="hljs-built_in">require</span>(<span class="hljs-string">'redux'</span>);
<span class="hljs-keyword">var</span> formReducer = <span class="hljs-built_in">require</span>(<span class="hljs-string">'redux-form'</span>).reducer;
<span class="hljs-comment">// Or with Immutablejs:</span>
<span class="hljs-comment">// var formReducer = require('redux-form/immutable').reducer;</span>

<span class="hljs-keyword">var</span> reducers = {
  <span class="hljs-comment">// ... your other reducers here ...</span>
  form: formReducer
};
<span class="hljs-keyword">var</span> reducer = redux.combineReducers(reducers);
<span class="hljs-keyword">var</span> store = redux.createStore(reducer);</code></pre>
<h5>ES6例子</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
// Or with Immutablejs:
// import { reducer as formReducer } from 'redux-form/immutable';

const reducers = {
  // ... your other reducers here ...
  form: formReducer
};
const reducer = combineReducers(reducers);
const store = createStore(reducer);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { createStore, combineReducers } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux'</span>;
<span class="hljs-keyword">import</span> { reducer <span class="hljs-keyword">as</span> formReducer } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux-form'</span>;
<span class="hljs-comment">// Or with Immutablejs:</span>
<span class="hljs-comment">// import { reducer as formReducer } from 'redux-form/immutable';</span>

<span class="hljs-keyword">const</span> reducers = {
  <span class="hljs-comment">// ... your other reducers here ...</span>
  form: formReducer
};
<span class="hljs-keyword">const</span> reducer = combineReducers(reducers);
<span class="hljs-keyword">const</span> store = createStore(reducer);</code></pre>
<h3 id="articleHeader13">reducer.plugin</h3>
<p>表单中返回一个通过附加指定功能 <code>reducers</code> 用以接受 <code>action</code> 的<code>reducer</code>。 它的参数应该是一个能映射 <code>formName</code>和一个<code>(state, action) =&gt; nextState</code> <code>reducer</code> 关系的一个对象。通过每一个 <code>reducer</code>的state只能是属于那个表单的一个片段。</p>
<h5>说明</h5>
<p><code>flux</code> 体系中最美的一部分应该是所有 <code>reducers</code>(或者 <code>Flux</code>中的标准术语 <code>stores</code>)可以接受所有 <code>actions</code>，他们可以修改基于这些 <code>action</code>来修改数据。举个例子，你有一个登录的表单，当你提交失败的时候，你想清楚密码输入框内的数据，哪怕你的登录的提交信息是属于另一个 <code>reducer/actions</code>体系，你的表单依然可以做出自己的响应。</p>
<p>而不是使用 <code>redux-form</code> 中一个普通的 <code>reducer</code>，你可以通过调用 <code>plugin()</code> 函数来加强你的 <code>reducer</code>。</p>
<p><strong><em>注:这是一个加强功能的操作用来修改你内部的 <code>redux-form</code> <code>state</code>的片段，如果你不小心使用，会把事情搞砸。</em></strong></p>
<h5>例子</h5>
<p>下面这个例子的作用是，当 <code>AUTH_LOGIN_FAIL</code> 的 <code>action</code> 被分发时，可以清除登录表单里的密码输入框:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { AUTH_LOGIN_FAIL } from '../actions/actionTypes'

const reducers = {
  // ... your other reducers here ...
  form: formReducer.plugin({
    login: (state, action) => {   // <----- 'login' is name of form given to reduxForm()
      switch(action.type) {
        case AUTH_LOGIN_FAIL:
          return {
            ...state,
            values: {
              ...state.values,
              password: undefined // <----- clear password value
            },
            fields: {
              ...state.fields,
              password: undefined // <----- clear field state, too (touched, etc.)
            }
          }
        default:
          return state
      }
    }
  })
}
const reducer = combineReducers(reducers)
const store = createStore(reducer)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { createStore, combineReducers } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux'</span>
<span class="hljs-keyword">import</span> { reducer <span class="hljs-keyword">as</span> formReducer } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux-form'</span>
<span class="hljs-keyword">import</span> { AUTH_LOGIN_FAIL } <span class="hljs-keyword">from</span> <span class="hljs-string">'../actions/actionTypes'</span>

<span class="hljs-keyword">const</span> reducers = {
  <span class="hljs-comment">// ... your other reducers here ...</span>
  form: formReducer.plugin({
    <span class="hljs-attr">login</span>: <span class="hljs-function">(<span class="hljs-params">state, action</span>) =&gt;</span> {   <span class="hljs-comment">// &lt;----- 'login' is name of form given to reduxForm()</span>
      <span class="hljs-keyword">switch</span>(action.type) {
        <span class="hljs-keyword">case</span> AUTH_LOGIN_FAIL:
          <span class="hljs-keyword">return</span> {
            ...state,
            <span class="hljs-attr">values</span>: {
              ...state.values,
              <span class="hljs-attr">password</span>: <span class="hljs-literal">undefined</span> <span class="hljs-comment">// &lt;----- clear password value</span>
            },
            <span class="hljs-attr">fields</span>: {
              ...state.fields,
              <span class="hljs-attr">password</span>: <span class="hljs-literal">undefined</span> <span class="hljs-comment">// &lt;----- clear field state, too (touched, etc.)</span>
            }
          }
        <span class="hljs-keyword">default</span>:
          <span class="hljs-keyword">return</span> state
      }
    }
  })
}
<span class="hljs-keyword">const</span> reducer = combineReducers(reducers)
<span class="hljs-keyword">const</span> store = createStore(reducer)</code></pre>
<h3 id="articleHeader14">SubmissionError</h3>
<p>这个 <code>throwable error</code> 用于从 <code>onSubmit</code> 返回一个表单验证错误信息。目的是用来区分 <code>promise</code> 失败的原因究竟是验证错误、AJAX I/O错误还是其他服务器错误。如果它是由于表单里 <code>{ field1: 'error', field2: 'error' }</code>产生的错误，那这个错误将会被添加到每一个标记过错误属性的字段里，就像异步表单验证错误一样。如果有一个错误没有指定的字段，但是应用到了整个表单，你需要继续传递它，就好像是某个字段调用的 <code>_error</code>一样，然后他会给出一个错误的属性。(就是不管他往外抛)</p>
<h5>Importing</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var SubmissionError = require('redux-form').SubmissionError;  // ES5

import { SubmissionError } from 'redux-form';  // ES6" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> SubmissionError = <span class="hljs-built_in">require</span>(<span class="hljs-string">'redux-form'</span>).SubmissionError;  <span class="hljs-comment">// ES5</span>

<span class="hljs-keyword">import</span> { SubmissionError } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux-form'</span>;  <span class="hljs-comment">// ES6</span></code></pre>
<h5>使用方法</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<MyForm onSubmit={values =>
  ajax.send(values) // however you send data to your server...
    .catch(error => {
      // how you pass server-side validation errors back is up to you
      if(error.validationErrors) {
        throw new SubmissionError(error.validationErrors)
      } else {
        // what you do about other communication errors is up to you
      }
    })
}/>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs aspectj"><code class="jsx">&lt;MyForm onSubmit={values =&gt;
  ajax.send(values) <span class="hljs-comment">// however you send data to your server...</span>
    .<span class="hljs-keyword">catch</span>(<span class="hljs-keyword">error</span> =&gt; {
      <span class="hljs-comment">// how you pass server-side validation errors back is up to you</span>
      <span class="hljs-keyword">if</span>(<span class="hljs-keyword">error</span>.validationErrors) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> SubmissionError(<span class="hljs-keyword">error</span>.validationErrors)
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-comment">// what you do about other communication errors is up to you</span>
      }
    })
}/&gt;</code></pre>
<h3 id="articleHeader15">Action Creators</h3>
<p><code>redux-form</code> 对外开放了所有的内部 <code>action creators</code>，允许你按找你的意愿来完成对分发 <code>action </code> 的控制。进而，官方推荐您在完成您大部分需求的时候，对于那些表单里指定需求的字段的 <code>action</code>来说，当作这些 <code>action</code> 已经绑定到 <code>dispatch</code>一样，直接将这些 <code>action</code> 通过 <code>props</code> 传递。</p>
<p>具体 <code>action</code> 请参考官方文档。</p>
<h3 id="articleHeader16">Selectors</h3>
<p><code>redux-form</code> 提供了一系列有用的 <code>Redux state</code> 拾取器，可以在app的任何地方任何表单内拾取 <code>state</code> 上的数据。</p>
<p>下列所有拾取器拥有统一的使用方法: 他们都(除了<code>getFormNames</code>)使用表单的名字，来创建一个拾取器，无论表单的 <code>state</code>是什么。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {
  getFormValues,
  getFormInitialValues,
  getFormSyncErrors,
  getFormMeta,
  getFormAsyncErrors,
  getFormSyncWarnings,
  getFormSubmitErrors,
  getFormNames,
  isDirty,
  isPristine,
  isValid,
  isInvalid,
  isSubmitting,
  hasSubmitSucceeded,
  hasSubmitFailed
} from 'redux-form'

MyComponent = connect(
  state => ({
    values: getFormValues('myForm')(state),
    initialValues: getFormInitialValues('myForm')(state),
    syncErrors: getFormSyncErrors('myForm')(state),
    fields: getFormMeta('myForm')(state),
    asyncErrors: getFormAsyncErrors('myForm')(state),
    syncWarnings: getFormSyncWarnings('myForm')(state),
    submitErrors: getFormSubmitErrors('myForm')(state),
    names: getFormNames('myForm')(state),
    dirty: isDirty('myForm')(state),
    pristine: isPristine('myForm')(state),
    valid: isValid('myForm')(state),
    invalid: isInvalid('myForm')(state),
    submitting: isSubmitting('myForm')(state),
    submitSucceeded: hasSubmitSucceeded('myForm')(state),
    submitFailed: hasSubmitFailed('myForm')(state)
  })
)(MyComponent)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> {
  getFormValues,
  getFormInitialValues,
  getFormSyncErrors,
  getFormMeta,
  getFormAsyncErrors,
  getFormSyncWarnings,
  getFormSubmitErrors,
  getFormNames,
  isDirty,
  isPristine,
  isValid,
  isInvalid,
  isSubmitting,
  hasSubmitSucceeded,
  hasSubmitFailed
} <span class="hljs-keyword">from</span> <span class="hljs-string">'redux-form'</span>

MyComponent = connect(
  <span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> ({
    <span class="hljs-attr">values</span>: getFormValues(<span class="hljs-string">'myForm'</span>)(state),
    <span class="hljs-attr">initialValues</span>: getFormInitialValues(<span class="hljs-string">'myForm'</span>)(state),
    <span class="hljs-attr">syncErrors</span>: getFormSyncErrors(<span class="hljs-string">'myForm'</span>)(state),
    <span class="hljs-attr">fields</span>: getFormMeta(<span class="hljs-string">'myForm'</span>)(state),
    <span class="hljs-attr">asyncErrors</span>: getFormAsyncErrors(<span class="hljs-string">'myForm'</span>)(state),
    <span class="hljs-attr">syncWarnings</span>: getFormSyncWarnings(<span class="hljs-string">'myForm'</span>)(state),
    <span class="hljs-attr">submitErrors</span>: getFormSubmitErrors(<span class="hljs-string">'myForm'</span>)(state),
    <span class="hljs-attr">names</span>: getFormNames(<span class="hljs-string">'myForm'</span>)(state),
    <span class="hljs-attr">dirty</span>: isDirty(<span class="hljs-string">'myForm'</span>)(state),
    <span class="hljs-attr">pristine</span>: isPristine(<span class="hljs-string">'myForm'</span>)(state),
    <span class="hljs-attr">valid</span>: isValid(<span class="hljs-string">'myForm'</span>)(state),
    <span class="hljs-attr">invalid</span>: isInvalid(<span class="hljs-string">'myForm'</span>)(state),
    <span class="hljs-attr">submitting</span>: isSubmitting(<span class="hljs-string">'myForm'</span>)(state),
    <span class="hljs-attr">submitSucceeded</span>: hasSubmitSucceeded(<span class="hljs-string">'myForm'</span>)(state),
    <span class="hljs-attr">submitFailed</span>: hasSubmitFailed(<span class="hljs-string">'myForm'</span>)(state)
  })
)(MyComponent)</code></pre>
<h2 id="articleHeader17">Examples</h2>
<h3 id="articleHeader18">Simple Form</h3>
<p>这个例子把表单所有基本的元素都列了出来，和官方Demo有所区别的是，增加了2个 <code>type</code> 为 <code>file</code> 的 <code>Field</code> (直接在 <code>Field</code> 中使用 <code>file</code> 的类型会有点问题)，一个是使用了jQuery的 <a href="https://github.com/JeremyFagis/dropify" rel="nofollow noreferrer" target="_blank">dropify</a> 编写的上传单个文件的组件 <code>MyDropify</code>，一个是使用了 <code>dropzone</code> 编写的上传多个文件的组件 <code>MyDropzone</code> (在这里使用了 <a href="https://github.com/okonet/react-dropzone" rel="nofollow noreferrer" target="_blank">react-dropzone</a> 和 <code>redux-form</code> 的组合)。官方的例子不单独介绍了，主要贴一下两个自定义 <code>Field</code>。</p>
<p><strong><em>注：由于reducer设计之初是纯函数，而提交文件的表单最后取得的值是一个 <code>file</code> 对象，当您使用了 <a href="https://github.com/leoasis/redux-immutable-state-invariant" rel="nofollow noreferrer" target="_blank">redux-immutable-state-invariant</a> 之类的检测工具，对其中诸如 <code>lastModifiedDate</code> 的值会报错，<a href="http://redux.js.org/docs/Troubleshooting.html#never-mutate-reducer-arguments" rel="nofollow noreferrer" target="_blank">具体请看</a>。在此，我们暂时先不考虑immutable的问题。</em></strong></p>
<h5>Simple路径</h5>
<p><code>src/components/demo/simple/</code></p>
<h5>MyDropify</h5>
<p><code>src/components/utils/MyDropify.js</code></p>
<p>代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react';
const $ = window.$;
require('dropify');

class MyDropify extends Component {
  componentDidMount(){
    $('.dropify').dropify();
  }
  render() {
    const { input,dataAllowedFileExtensions } = this.props
    const onAttachmentChange = (e) => {
        e.preventDefault();
        const files = [...e.target.files];
        input.onChange(files);
    };
    return (
      <div>
        <input type=&quot;file&quot;
               onChange={onAttachmentChange}
               className=&quot;dropify&quot;
               data-allowed-file-extensions={dataAllowedFileExtensions} />
      </div>
    )
  }
}

export default MyDropify;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="jsx"><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">const</span> $ = <span class="hljs-built_in">window</span>.$;
<span class="hljs-built_in">require</span>(<span class="hljs-string">'dropify'</span>);

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyDropify</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  componentDidMount(){
    $(<span class="hljs-string">'.dropify'</span>).dropify();
  }
  render() {
    <span class="hljs-keyword">const</span> { input,dataAllowedFileExtensions } = <span class="hljs-keyword">this</span>.props
    <span class="hljs-keyword">const</span> onAttachmentChange = <span class="hljs-function">(<span class="hljs-params">e</span>) =&gt;</span> {
        e.preventDefault();
        <span class="hljs-keyword">const</span> files = [...e.target.files];
        input.onChange(files);
    };
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"file"</span>
               <span class="hljs-attr">onChange</span>=<span class="hljs-string">{onAttachmentChange}</span>
               <span class="hljs-attr">className</span>=<span class="hljs-string">"dropify"</span>
               <span class="hljs-attr">data-allowed-file-extensions</span>=<span class="hljs-string">{dataAllowedFileExtensions}</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    )
  }
}

export default MyDropify;</span></code></pre>
<p>使用方法:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  <div className=&quot;form-group&quot;>
    <div className=&quot;input-group&quot;>
      <label>Dropify</label>
      <Field component={MyDropify}
             name=&quot;inputfile1&quot;
             dataAllowedFileExtensions=&quot;doc docx txt pdf xls xlsx jpg png bmp&quot;></Field>
    </div>
  </div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"form-group"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"input-group"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>Dropify<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Field</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{MyDropify}</span>
             <span class="hljs-attr">name</span>=<span class="hljs-string">"inputfile1"</span>
             <span class="hljs-attr">dataAllowedFileExtensions</span>=<span class="hljs-string">"doc docx txt pdf xls xlsx jpg png bmp"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Field</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p><a href="https://github.com/JeremyFagis/dropify" rel="nofollow noreferrer" target="_blank">dropify</a> 的具体用法请参考其官方文档。</p>
<h5>MyDropzone</h5>
<p><code>src/components/utils/MyDropify.js</code></p>
<p>代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
class MyDropzone extends Component {
  render() {
    const { input,desc,accept } = this.props
    const onDrop = (files) => {
        input.onChange(files);
    };
    return (
      <Dropzone onDrop={onDrop} accept={accept}>
        {({ isDragActive, isDragReject, acceptedFiles, rejectedFiles }) => {
           if (isDragActive) {
             return &quot;This file is authorized&quot;;
          }
           if (isDragReject) {
             return &quot;This file is not authorized&quot;;
          }
           return acceptedFiles.length || rejectedFiles.length
             ? `Accepted ${acceptedFiles.length}, rejected ${rejectedFiles.length} files`
            : desc;
        "}}"
      </Dropzone>
    )
  }
}

export default MyDropzone;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code class="jsx"><span class="hljs-keyword">import</span> <span class="hljs-type">React</span>, { <span class="hljs-type">Component</span> } from <span class="hljs-symbol">'reac</span>t';
<span class="hljs-keyword">import</span> <span class="hljs-type">Dropzone</span> from <span class="hljs-symbol">'react</span>-dropzone';
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyDropzone</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render() {
    const { input,desc,accept } = <span class="hljs-keyword">this</span>.props
    const onDrop = (files) =&gt; {
        input.onChange(files);
    };
    <span class="hljs-keyword">return</span> (
      &lt;<span class="hljs-type">Dropzone</span> onDrop={onDrop} accept={accept}&gt;
        {({ isDragActive, isDragReject, acceptedFiles, rejectedFiles }) =&gt; {
           <span class="hljs-keyword">if</span> (isDragActive) {
             <span class="hljs-keyword">return</span> <span class="hljs-string">"This file is authorized"</span>;
          }
           <span class="hljs-keyword">if</span> (isDragReject) {
             <span class="hljs-keyword">return</span> <span class="hljs-string">"This file is not authorized"</span>;
          }
           <span class="hljs-keyword">return</span> acceptedFiles.length || rejectedFiles.length
             ? `<span class="hljs-type">Accepted</span> ${acceptedFiles.length}, rejected ${rejectedFiles.length} files`
            : desc;
        "}}"
      &lt;/<span class="hljs-type">Dropzone</span>&gt;
    )
  }
}

export <span class="hljs-keyword">default</span> <span class="hljs-type">MyDropzone</span>;</code></pre>
<p>使用方法:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  <div className=&quot;form-group&quot;>
    <div className=&quot;input-group&quot;>
      <label>Dropzone</label>
      <Field component={MyDropzone}
             name=&quot;inputfile2&quot;
             desc=&quot;My Dropzone&quot;
             accept=&quot;image/png,image/jpeg&quot;></Field>
    </div>
  </div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"form-group"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"input-group"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>Dropzone<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Field</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{MyDropzone}</span>
             <span class="hljs-attr">name</span>=<span class="hljs-string">"inputfile2"</span>
             <span class="hljs-attr">desc</span>=<span class="hljs-string">"My Dropzone"</span>
             <span class="hljs-attr">accept</span>=<span class="hljs-string">"image/png,image/jpeg"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Field</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p><code>react-dropzone</code> 和jQuery版本的有所区别，使用过 <code>dropzone</code> 的应该都知道选择文件可以渲染到框体内，react版本的 <code>dropzone</code> 原声不带这个功能，但它提供了详尽的方法可以自己实现很多功能，比如选择完文件可以渲染到组件中，有时间我再完善此功能。</p>
<h3 id="articleHeader19">Sync Validation</h3>
<p>同步的表单验证，包括了错误和警告型配置。官方Demo中只演示了输入框的验证，而这里准备了包括 <code>radio</code> <code>select</code> <code>textarea</code> 的验证方式(<code>checkbox</code> 我会在单独的一章讲解)，调用方法可以参见本文的源代码。</p>
<h5>Sync Validation路径</h5>
<p><code>src/components/demo/syncValidation/</code></p>
<h5>radioField</h5>
<p><code>src/components/utils/validation/radioField.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';

const inputField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div className={touched &amp;&amp; error ? 'has-error form-group':'form-group'}>
    <div className=&quot;input-group&quot;>
      <span className=&quot;input-group-addon&quot;>{label}</span>
      <input {...input} placeholder={label} type={type} className=&quot;form-control&quot;/>
    </div>
    {touched &amp;&amp;
      ((error &amp;&amp; <div className=&quot;help-block with-errors&quot;>{error}</div>) ||
        (warning &amp;&amp; <div className=&quot;help-block with-errors&quot;>{warning}</div>))}
  </div>
)

export default inputField;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="jsx"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-keyword">const</span> inputField = ({
  input,
  label,
  type,
  <span class="hljs-attr">meta</span>: { touched, error, warning }
}) =&gt; (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{touched</span> &amp;&amp; <span class="hljs-attr">error</span> ? '<span class="hljs-attr">has-error</span> <span class="hljs-attr">form-group</span>'<span class="hljs-attr">:</span>'<span class="hljs-attr">form-group</span>'}&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"input-group"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"input-group-addon"</span>&gt;</span>{label}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> {<span class="hljs-attr">...input</span>} <span class="hljs-attr">placeholder</span>=<span class="hljs-string">{label}</span> <span class="hljs-attr">type</span>=<span class="hljs-string">{type}</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"form-control"</span>/&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    {touched &amp;&amp;
      ((error &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"help-block with-errors"</span>&gt;</span>{error}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>) ||
        (warning &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"help-block with-errors"</span>&gt;</span>{warning}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>))}
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
)

export default inputField;</span></code></pre>
<h5>selectField</h5>
<p><code>src/components/utils/validation/selectField.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
const selectField = ({
  input,
  label,
  selects,
  meta: { touched, error, warning }
}) => (
  <div className={touched &amp;&amp; error ? 'has-error form-group':'form-group'}>
    <div className=&quot;input-group&quot;>
      <span className=&quot;input-group-addon&quot;>{label}</span>
      <select {...input} className=&quot;form-control&quot;>
        {
          selects.map((item, i) => (
            <option key={i} value={item.value}>{item.text}</option>
          ))
        }
      </select>
    </div>
    {touched &amp;&amp;
      ((error &amp;&amp; <div className=&quot;help-block with-errors&quot;>{error}</div>) ||
        (warning &amp;&amp; <div className=&quot;help-block with-errors&quot;>{warning}</div>))}
  </div>
)

export default selectField;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="jsx"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">const</span> selectField = ({
  input,
  label,
  selects,
  <span class="hljs-attr">meta</span>: { touched, error, warning }
}) =&gt; (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{touched</span> &amp;&amp; <span class="hljs-attr">error</span> ? '<span class="hljs-attr">has-error</span> <span class="hljs-attr">form-group</span>'<span class="hljs-attr">:</span>'<span class="hljs-attr">form-group</span>'}&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"input-group"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"input-group-addon"</span>&gt;</span>{label}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">select</span> {<span class="hljs-attr">...input</span>} <span class="hljs-attr">className</span>=<span class="hljs-string">"form-control"</span>&gt;</span>
        {
          selects.map((item, i) =&gt; (
            <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{i}</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{item.value}</span>&gt;</span>{item.text}<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
          ))
        }
      <span class="hljs-tag">&lt;/<span class="hljs-name">select</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    {touched &amp;&amp;
      ((error &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"help-block with-errors"</span>&gt;</span>{error}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>) ||
        (warning &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"help-block with-errors"</span>&gt;</span>{warning}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>))}
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
)

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> selectField;</code></pre>
<h5>textareaField</h5>
<p><code>src/components/utils/validation/textareaField.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';

const textareaField = ({
  input,
  label,
  type,
  cols,
  rows,
  meta: { touched, error, warning }
}) => (
  <div className={touched &amp;&amp; error ? 'has-error form-group':'form-group'}>
    <label>{label}</label>
    <textarea {...input} cols={cols} rows={rows} className=&quot;form-control&quot;></textarea>
    {touched &amp;&amp;
      ((error &amp;&amp; <div className=&quot;help-block with-errors&quot;>{error}</div>) ||
        (warning &amp;&amp; <div className=&quot;help-block with-errors&quot;>{warning}</div>))}
  </div>
)

export default textareaField;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="jsx"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-keyword">const</span> textareaField = ({
  input,
  label,
  type,
  cols,
  rows,
  <span class="hljs-attr">meta</span>: { touched, error, warning }
}) =&gt; (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{touched</span> &amp;&amp; <span class="hljs-attr">error</span> ? '<span class="hljs-attr">has-error</span> <span class="hljs-attr">form-group</span>'<span class="hljs-attr">:</span>'<span class="hljs-attr">form-group</span>'}&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>{label}<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">textarea</span> {<span class="hljs-attr">...input</span>} <span class="hljs-attr">cols</span>=<span class="hljs-string">{cols}</span> <span class="hljs-attr">rows</span>=<span class="hljs-string">{rows}</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"form-control"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">textarea</span>&gt;</span>
    {touched &amp;&amp;
      ((error &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"help-block with-errors"</span>&gt;</span>{error}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>) ||
        (warning &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"help-block with-errors"</span>&gt;</span>{warning}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>))}
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
)

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> textareaField;</code></pre>
<h3 id="articleHeader20">Field-Level Validation</h3>
<p>除了提供一个验证方法一起验证表单里的值这种方法之外，还可以对每一个 <code>&lt;Field/&gt;</code> 或 <code>&lt;FieldArray/&gt;</code> 分别做验证。官方给的Demo已经足够说明问题了，在这里只针对上面的 <code>Sync Validation</code> 作简单的改写。具体请看代码。</p>
<h3 id="articleHeader21">Submit Validation</h3>
<p>一种服务器表单验证较好的方法是在调用 <code>onSubnit</code> 之后返回一个 <code>rejected</code> 的 <code>promise</code> 对象。当您的表单被提交时，有2种方法提供给 <code>redux-form</code> 这个函数。</p>
<ol>
<li><p>把他当作一个 <code>onSubmit</code> 的 <code>prop</code> 传递给您的装饰组件。那样的话，你可以在您的装饰组件中使用 <code>onSubmit={this.props.handleSubmit}</code> 确保当用户点击提交按钮的时候触发这个函数。</p></li>
<li><p>把他当作一个参数传递给您装饰组件内的 <code>this.props.handleSubmit</code> 函数。这种情况下，你需要使用 <code>onClick={this.props.handleSubmit(mySubmit)}</code> 来确保当用户点击提交按钮的时候触发这个函数。</p></li>
</ol>
<p>这个错误信息的显示方式和同步验证(Synchronous Validation)后的错误信息一样，但他是通过 <code>onSubmit</code> 函数返回一个封装过的 <code>SubmissionError</code> 对象。这个验证错误就像HTTP的400或500错误一样，和I/O错误是有区别的，并且他还会是这个提交的 <code>promise</code> 对象的状态置为 <code>rejected</code>。</p>
<p>DEMO中没什么花头，和官方一样，就是基于 <code>SyncValidation</code> 把表单验证的逻辑放在了提交后的逻辑中，并抛出了一个 <code>SubmissionError</code>。</p>
<h3 id="articleHeader22">Async Validation</h3>
<p>服务器表单验证的方式比较推荐使用<a>Submit Validation</a>，但是可能存在当您填写表单的时候，同时需要服务器端来验证。有一个经典的例子是当一个用户选取一个值，比如用户名，它必须是您系统中唯一的一个值。</p>
<p>为了写一个异步的表单验证，需要给 <code>redux-form</code> 提供一个异步验证的函数(asyncValidation)用来提供一个可以从表单获取数据的一个对象，然后 <code>Redux</code> 分发这个函数，返回一个状态为拥有一个错误对象的 <code>rejects</code>或状态为 <code>reslove</code> 的 <code>promise</code> 对象。</p>
<p>您需要同时指定某几个字段，通过 <code>asyncBlurFields</code> 的属性配置，来标记是否需要在他们失去焦点的时候触发这个异步验证。</p>
<h5>重要</h5>
<ol>
<li><p>异步验证会在 <code>onSubmit</code> 之前被调用，所以如果你关心的是 <code>onSubmit</code> 验证，你需要使用 <a>Submit Validation</a></p></li>
<li><p>当一个字段的同步验证错误时，那它的失去焦点的时候将不会触发异步验证。</p></li>
</ol>
<p>Demo中的自定义 <code>&lt;Field/&gt;</code> 的 <code>meta</code> 中有一个 <code>asyncValidating</code>，来标识异步验证的 <code>promise</code> 对象的 <code>Pending</code> 状态。</p>
<h3 id="articleHeader23">Initialize From State</h3>
<p>通过 <code>initialValues</code> 属性或 <code>reduxForm()</code> 配置的参数所提供的数据，被加载到表单 <code>state</code> 中，并且把这些初始化数据作为原始数据(pristine)。当 <code>reset()</code> 触发的时候，也会返回这些值。除了保存这些 <code>pristine</code> 值，初始化您表单的这个操作也会替换表单里已经存在的值。</p>
<p>在许多应用中，这些值可能是来自服务器并且储存在其他 <code>reducer</code> 中的。想要得到这些值，你需要使用 <code>connect()</code> 去自己链接 <code>state</code> 然后映射这些数据到您的 <code>initialValues</code> 属性里。</p>
<p>默认情况下，你只需要通过 <code>initialValues</code> 初始化您的表单组件一次即可。目前有2种方法可以通过新的 <code>pristine</code> 值重新初始化表单。</p>
<ol>
<li><p>传递一个 <code>enableReinitialize</code> 属性或配置 <code>reduxForm()</code> 中的参数为true就可以让表单在每次 <code>initialValues</code> 属性变化的时候重新初始化，生成一个新的 <code>pristine</code> 值。如果想要在重新初始化的时候保持已改变过的表单的值，可以设置 <code>keepDirtyOnReinitialize</code> 为true。默认情况下，重新初始化会将 <code>pristine</code> 值替换掉已改变过的表单的值。</p></li>
<li><p>发出一个 <code>INITIALIZE</code> action(用 <code>redux-form</code> action生成器生成)。</p></li>
</ol>
<p>此Demo较之官方Demo，增加了 <code>enableReinitialize</code> 和 <code>keepDirtyOnReinitialize</code> 的用法。以下是代码片段。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="InitializeFromStateForm = reduxForm({
  form: 'initializeFromState',// a unique identifier for this form
  enableReinitialize:true,
  keepDirtyOnReinitialize:true,// 这个值表示重新初始化表单后，不替换已更改的值，可以用clear来测试
})(InitializeFromStateForm)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code class="jsx"><span class="hljs-string">InitializeFromStateForm</span> <span class="hljs-string">=</span> <span class="hljs-string">reduxForm({</span>
<span class="hljs-attr">  form:</span> <span class="hljs-string">'initializeFromState'</span><span class="hljs-string">,//</span> <span class="hljs-string">a</span> <span class="hljs-string">unique</span> <span class="hljs-string">identifier</span> <span class="hljs-string">for</span> <span class="hljs-string">this</span> <span class="hljs-string">form</span>
<span class="hljs-attr">  enableReinitialize:</span><span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">  keepDirtyOnReinitialize:</span><span class="hljs-literal">true</span><span class="hljs-string">,//</span> <span class="hljs-string">这个值表示重新初始化表单后，不替换已更改的值，可以用clear来测试</span>
<span class="hljs-string">})(InitializeFromStateForm)</span></code></pre>
<h3 id="articleHeader24">Selecting Form Values</h3>
<p>有时候您希望访问表单组件中某些字段的值，你需要在 <code>store</code> 中直接 <code>connect()</code> 表单的值。在一般的使用情况下，<code>redux-form</code> 通过 <code>formValueSelector</code> 提供了一个方便的选择器。</p>
<p><strong>警告: 需要节制使用这个机制，因为这样的话，表单里的某一个值一旦发生改变，就会重新渲染您的组件。</strong></p>
<p>代码片段:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
SelectingFormValuesForm = reduxForm({
  form: 'selectingFormValues',// a unique identifier for this form
})(SelectingFormValuesForm)

// Decorate with connect to read form values
const selector = formValueSelector('selectingFormValues') // <-- same as form name
SelectingFormValuesForm = connect(state => {
  // can select values individually
  const hasEmailValue = selector(state, 'hasEmail')
  const favoriteColorValue = selector(state, 'favoriteColor')
  // or together as a group
  const { firstName, lastName } = selector(state, 'firstName', 'lastName')
  return {
    hasEmailValue,
    favoriteColorValue,
    fullName: `${firstName || ''} ${lastName || ''}`
  }
})(SelectingFormValuesForm)

export default SelectingFormValuesForm" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// Decorate with reduxForm(). It will read the initialValues prop provided by connect()</span>
SelectingFormValuesForm = reduxForm({
  <span class="hljs-attr">form</span>: <span class="hljs-string">'selectingFormValues'</span>,<span class="hljs-comment">// a unique identifier for this form</span>
})(SelectingFormValuesForm)

<span class="hljs-comment">// Decorate with connect to read form values</span>
<span class="hljs-keyword">const</span> selector = formValueSelector(<span class="hljs-string">'selectingFormValues'</span>) <span class="hljs-comment">// &lt;-- same as form name</span>
SelectingFormValuesForm = connect(<span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> {
  <span class="hljs-comment">// can select values individually</span>
  <span class="hljs-keyword">const</span> hasEmailValue = selector(state, <span class="hljs-string">'hasEmail'</span>)
  <span class="hljs-keyword">const</span> favoriteColorValue = selector(state, <span class="hljs-string">'favoriteColor'</span>)
  <span class="hljs-comment">// or together as a group</span>
  <span class="hljs-keyword">const</span> { firstName, lastName } = selector(state, <span class="hljs-string">'firstName'</span>, <span class="hljs-string">'lastName'</span>)
  <span class="hljs-keyword">return</span> {
    hasEmailValue,
    favoriteColorValue,
    <span class="hljs-attr">fullName</span>: <span class="hljs-string">`<span class="hljs-subst">${firstName || <span class="hljs-string">''</span>}</span> <span class="hljs-subst">${lastName || <span class="hljs-string">''</span>}</span>`</span>
  }
})(SelectingFormValuesForm)

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> SelectingFormValuesForm</code></pre>
<h3 id="articleHeader25">Field Array</h3>
<p>这个例子展示了怎样构建一个字段组，包括拥有一个字段的和拥有一组字段的字段组。在这个表单里，每一个俱乐部的成员都有姓和名，还有一个兴趣的列表。以下这些数组的操作 <code>insert, pop, push, remove, shift, swap, unshift</code> 行为是被允许的:(更多详细的内容可以参考<a>FieldArray Docs</a>)</p>
<ul>
<li><p>一个 <code>action</code> 的原始构造</p></li>
<li><p>通过您表单的 <code>this.props.array</code> 对象绑定的 <code>action</code></p></li>
<li><p>同时绑定表单和通过 <code>FieldArray</code> 组件获得的对象上的数组的 <code>action</code></p></li>
</ul>
<h3 id="articleHeader26">Remote Submit</h3>
<p>这个例子演示了一个表单如何从一个无关的组件或中间件中发送的一个 <code>SUBMIT</code> 的action来执行提交逻辑。</p>
<p>这个例子里你所看到的的提交按钮，不是直接与表单组件直接链接的，它的作用只是通过 <code>Redux</code> 发送的一个提交的 <code>action</code>。</p>
<p>要注意它的工作方式，这个提交函数必须通过 <code>reduxForm()</code> 配置参数的传递或通过 <code>prop</code> 提供给表单组件。以下是发送这个action的方式:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react'
import { connect } from 'react-redux'
import { submit } from 'redux-form'

const style = {
  padding: '10px 20px',
  width: 140,
  display: 'block',
  margin: '20px auto',
  fontSize: '16px'
}

const RemoteSubmitButton = ({ dispatch }) => (
  <button
    type=&quot;button&quot;
    style={style}
    onClick={() => dispatch(submit('remoteSubmit'))}
  >
    Submit
  </button>
)
//   remoteSubmit 为表单的名字
export default connect()(RemoteSubmitButton)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="jsx"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-keyword">import</span> { connect } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-redux'</span>
<span class="hljs-keyword">import</span> { submit } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux-form'</span>

<span class="hljs-keyword">const</span> style = {
  <span class="hljs-attr">padding</span>: <span class="hljs-string">'10px 20px'</span>,
  <span class="hljs-attr">width</span>: <span class="hljs-number">140</span>,
  <span class="hljs-attr">display</span>: <span class="hljs-string">'block'</span>,
  <span class="hljs-attr">margin</span>: <span class="hljs-string">'20px auto'</span>,
  <span class="hljs-attr">fontSize</span>: <span class="hljs-string">'16px'</span>
}

<span class="hljs-keyword">const</span> RemoteSubmitButton = <span class="hljs-function">(<span class="hljs-params">{ dispatch }</span>) =&gt;</span> (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span>
    <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span>
    <span class="hljs-attr">style</span>=<span class="hljs-string">{style}</span>
    <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> dispatch(submit('remoteSubmit'))}
  &gt;
    Submit
  <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
)
<span class="hljs-comment">//   remoteSubmit 为表单的名字</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> connect()(RemoteSubmitButton)</code></pre>
<h3 id="articleHeader27">Field Normalizing</h3>
<p>当您需要在用户输入和 <code>store</code> 中的数据之间施加某些控制，你可以使用 <code>normalizer</code>。<code>normalizer</code> 就是一个每当值改变是，可以在保存到 <code>store</code> 之前进行某些转换的一个函数。</p>
<p>一个常用的例子：你需要一个某些经过格式化的值，比如电话号码或信用卡号。</p>
<p><code>Normalizers</code> 传递了4个参数:</p>
<ul>
<li><p><code>value</code> - 你设置了 <code>normalizer</code> 字段的值</p></li>
<li><p><code>previousValue</code> - 这个值最近一次变化之前的一个值</p></li>
<li><p><code>allValues</code> - 表单中，所有字段当前的值</p></li>
<li><p><code>previousAllValues</code> - 表单中，所有字段在最近一次变化前的值</p></li>
</ul>
<p>这些可以使你基于表单中另外一个字段而限制某个特定的字段。比如例子中的字段最小最大值：这里你不能设置 <code>min</code> 中的值比 <code>max</code> 中的值大，不能设置 <code>max</code> 中的值比 <code>min</code> 的值更小(下面有代码)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const upper = value => value &amp;&amp; value.toUpperCase()
const lower = value => value &amp;&amp; value.toLowerCase()
const lessThan = otherField => (value, previousValue, allValues) =>
  parseFloat(value) < parseFloat(allValues[otherField]) ? value : previousValue
const greaterThan = otherField => (value, previousValue, allValues) =>
  parseFloat(value) > parseFloat(allValues[otherField]) ? value : previousValue" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> upper = <span class="hljs-function"><span class="hljs-params">value</span> =&gt;</span> value &amp;&amp; value.toUpperCase()
<span class="hljs-keyword">const</span> lower = <span class="hljs-function"><span class="hljs-params">value</span> =&gt;</span> value &amp;&amp; value.toLowerCase()
<span class="hljs-keyword">const</span> lessThan = <span class="hljs-function"><span class="hljs-params">otherField</span> =&gt;</span> (value, previousValue, allValues) =&gt;
  <span class="hljs-built_in">parseFloat</span>(value) &lt; <span class="hljs-built_in">parseFloat</span>(allValues[otherField]) ? value : previousValue
<span class="hljs-keyword">const</span> greaterThan = <span class="hljs-function"><span class="hljs-params">otherField</span> =&gt;</span> (value, previousValue, allValues) =&gt;
  <span class="hljs-built_in">parseFloat</span>(value) &gt; <span class="hljs-built_in">parseFloat</span>(allValues[otherField]) ? value : previousValue</code></pre>
<p>下面是对电话号码处理的逻辑</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const normalizePhone = value => {
  if (!value) {
    return value
  }

  const onlyNums = value.replace(/[^\d]/g, '')
  if (onlyNums.length <= 3) {
    return onlyNums
  }
  if (onlyNums.length <= 7) {
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`
  }
  return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 6)}-${onlyNums.slice(6, 10)}`
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> normalizePhone = <span class="hljs-function"><span class="hljs-params">value</span> =&gt;</span> {
  <span class="hljs-keyword">if</span> (!value) {
    <span class="hljs-keyword">return</span> value
  }

  <span class="hljs-keyword">const</span> onlyNums = value.replace(<span class="hljs-regexp">/[^\d]/g</span>, <span class="hljs-string">''</span>)
  <span class="hljs-keyword">if</span> (onlyNums.length &lt;= <span class="hljs-number">3</span>) {
    <span class="hljs-keyword">return</span> onlyNums
  }
  <span class="hljs-keyword">if</span> (onlyNums.length &lt;= <span class="hljs-number">7</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-string">`<span class="hljs-subst">${onlyNums.slice(<span class="hljs-number">0</span>, <span class="hljs-number">3</span>)}</span>-<span class="hljs-subst">${onlyNums.slice(<span class="hljs-number">3</span>)}</span>`</span>
  }
  <span class="hljs-keyword">return</span> <span class="hljs-string">`<span class="hljs-subst">${onlyNums.slice(<span class="hljs-number">0</span>, <span class="hljs-number">3</span>)}</span>-<span class="hljs-subst">${onlyNums.slice(<span class="hljs-number">3</span>, <span class="hljs-number">6</span>)}</span>-<span class="hljs-subst">${onlyNums.slice(<span class="hljs-number">6</span>, <span class="hljs-number">10</span>)}</span>`</span>
}</code></pre>
<h3 id="articleHeader28">Wizard</h3>
<p>一种常见的UI设计模式是把一个单一的表单分割成几组分开的表单形式，最为熟知的就是 <code>Wizard</code>。使用 <code>redux-form</code> 的话有好多方式可以来做这种设计，但最简单和最推荐的方式是遵循一下几种指示:</p>
<ul>
<li><p>把每一个页面都用同一个表单名字连接到 <code>reduxForm()</code></p></li>
<li><p>指定 <code>destroyOnUnmount</code>为 <code>false</code> 就可以在表单组件卸载的时候保存表单数据</p></li>
<li><p>你可以为整个表单指定一个同步验证函数</p></li>
<li><p>使用 <code>onSubmit</code> 来触发进入下一步，因为它强制运行验证函数</p></li>
</ul>
<p>需要由你自己来实现的:</p>
<ul><li><p>在提交成功之后手动调用 <code>props.destory()</code></p></li></ul>
<p>例子里的代码主要列出控制 <code>Wizard</code> 的组件，其他组件的用法已被我们熟知。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react'
import PropTypes from 'prop-types'
import WizardFormFirstPage from './WizardFormFirstPage'
import WizardFormSecondPage from './WizardFormSecondPage'
import WizardFormThirdPage from './WizardFormThirdPage'

class WizardForm extends Component {
  constructor(props) {
    super(props)
    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)
    this.state = {
      page: 1
    }
  }
  nextPage() {
    this.setState({ page: this.state.page + 1 })
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 })
  }

  render() {
    const { onSubmit } = this.props
    const { page } = this.state
    return (
      <div>
        {page === 1 &amp;&amp; <WizardFormFirstPage onSubmit={this.nextPage} />}
        {page === 2 &amp;&amp;
          <WizardFormSecondPage
            previousPage={this.previousPage}
            onSubmit={this.nextPage}
          />}
        {page === 3 &amp;&amp;
          <WizardFormThirdPage
            previousPage={this.previousPage}
            onSubmit={onSubmit}
          />}
      </div>
    )
  }
}

WizardForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default WizardForm" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code class="jsx"><span class="hljs-keyword">import</span> React, { Component } from <span class="hljs-string">'react'</span>
<span class="hljs-keyword">import</span> PropTypes from <span class="hljs-string">'prop-types'</span>
<span class="hljs-keyword">import</span> WizardFormFirstPage from <span class="hljs-string">'./WizardFormFirstPage'</span>
<span class="hljs-keyword">import</span> WizardFormSecondPage from <span class="hljs-string">'./WizardFormSecondPage'</span>
<span class="hljs-keyword">import</span> WizardFormThirdPage from <span class="hljs-string">'./WizardFormThirdPage'</span>

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">WizardForm</span> <span class="hljs-title">extends</span> <span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-keyword">super</span>(props)
    <span class="hljs-keyword">this</span>.nextPage = <span class="hljs-keyword">this</span>.nextPage.bind(<span class="hljs-keyword">this</span>)
    <span class="hljs-keyword">this</span>.previousPage = <span class="hljs-keyword">this</span>.previousPage.bind(<span class="hljs-keyword">this</span>)
    <span class="hljs-keyword">this</span>.state = {
      page: <span class="hljs-number">1</span>
    }
  }
  nextPage() {
    <span class="hljs-keyword">this</span>.setState({ page: <span class="hljs-keyword">this</span>.state.page + <span class="hljs-number">1</span> })
  }

  previousPage() {
    <span class="hljs-keyword">this</span>.setState({ page: <span class="hljs-keyword">this</span>.state.page - <span class="hljs-number">1</span> })
  }

  render() {
    const { onSubmit } = <span class="hljs-keyword">this</span>.props
    const { page } = <span class="hljs-keyword">this</span>.state
    <span class="hljs-keyword">return</span> (
      &lt;div&gt;
        {page === <span class="hljs-number">1</span> &amp;&amp; &lt;WizardFormFirstPage onSubmit={<span class="hljs-keyword">this</span>.nextPage} /&gt;}
        {page === <span class="hljs-number">2</span> &amp;&amp;
          &lt;WizardFormSecondPage
            previousPage={<span class="hljs-keyword">this</span>.previousPage}
            onSubmit={<span class="hljs-keyword">this</span>.nextPage}
          /&gt;}
        {page === <span class="hljs-number">3</span> &amp;&amp;
          &lt;WizardFormThirdPage
            previousPage={<span class="hljs-keyword">this</span>.previousPage}
            onSubmit={onSubmit}
          /&gt;}
      &lt;/div&gt;
    )
  }
}

WizardForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export <span class="hljs-keyword">default</span> WizardForm</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React-Redux技术栈——之redux-form详解

## 原文链接
[https://segmentfault.com/a/1190000010088546](https://segmentfault.com/a/1190000010088546)

