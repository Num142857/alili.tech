---
title: 'React-联合组件' 
date: 2018-11-30 2:30:12
hidden: true
slug: cqrmavmmv6n
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>本文讲的如何利用context，将多个组件串联起来，实现一个更大的联合组件。最具有这个特性的就是表单组件，所以本文例子就是一个表单组件。本文例子参考 <a href="http://ant.design/components/form-cn/" rel="nofollow noreferrer" target="_blank">Ant Design</a> 。本次不讲 context 知识，需要的话等到下一次分享。</p>
<h2 id="articleHeader1">准备</h2>
<ul>
<li>es6 基本知识。<a href="http://es6.ruanyifeng.com/" rel="nofollow noreferrer" target="_blank">参考地址</a>
</li>
<li>react 基本知识。<a href="https://doc.react-china.org/" rel="nofollow noreferrer" target="_blank">参考地址</a>
</li>
<li>create-react-app 脚手架。 <a href="https://www.npmjs.com/package/create-react-app" rel="nofollow noreferrer" target="_blank">参考地址</a>
</li>
<li>react context 知识。 <a href="https://doc.react-china.org/docs/legacy-context.html" rel="nofollow noreferrer" target="_blank">参考地址</a>
</li>
<li>react prop-types 相关知识。 <a href="https://doc.react-china.org/docs/typechecking-with-proptypes.html#proptypes" rel="nofollow noreferrer" target="_blank">参考地址</a>
</li>
</ul>
<p>或者直接使用本文 demo  <a href="https://gitee.com/qunyou/react-advance-components" rel="nofollow noreferrer" target="_blank">Gitee地址</a></p>
<h2 id="articleHeader2">基本代码</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Form onSubmit={(e, v) => {
  console.log(e, 'error');
  console.log(v, 'value');
"}}">
  <Form.Item label={'手机号'}>
    <Form.Input name={'phone'} rules={[{validator: (e) => /^1[3-9]\d+$/.test(e), message: '手机号格式错误'}]}/>
  </Form.Item>
  <Form.Item label={'年龄'}>
    <Form.Input name={'age'} rules={[{validator: (e) => /^\d+$/.test(e), message: '只允许输入数字'}]}/>
  </Form.Item>
    <Form.Button>提交</Form.Button>
  <Form.Button type={'reset'}>重置</Form.Button>
</Form>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>&lt;<span class="hljs-keyword">Form</span> onSubmit={(<span class="hljs-keyword">e</span>, v) =&gt; {
  console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">e</span>, '<span class="hljs-keyword">error</span>');
  console.<span class="hljs-built_in">log</span>(v, 'value');
"}}"&gt;
  &lt;<span class="hljs-keyword">Form</span>.Item <span class="hljs-keyword">label</span>={'手机号'}&gt;
    &lt;<span class="hljs-keyword">Form</span>.<span class="hljs-keyword">Input</span> name={'phone'} rules={[{validator: (<span class="hljs-keyword">e</span>) =&gt; /^1[3-9]\<span class="hljs-keyword">d</span>+$/.<span class="hljs-keyword">test</span>(<span class="hljs-keyword">e</span>), message: '手机号格式错误'}]}/&gt;
  &lt;/<span class="hljs-keyword">Form</span>.Item&gt;
  &lt;<span class="hljs-keyword">Form</span>.Item <span class="hljs-keyword">label</span>={'年龄'}&gt;
    &lt;<span class="hljs-keyword">Form</span>.<span class="hljs-keyword">Input</span> name={'age'} rules={[{validator: (<span class="hljs-keyword">e</span>) =&gt; /^\<span class="hljs-keyword">d</span>+$/.<span class="hljs-keyword">test</span>(<span class="hljs-keyword">e</span>), message: '只允许输入数字'}]}/&gt;
  &lt;/<span class="hljs-keyword">Form</span>.Item&gt;
    &lt;<span class="hljs-keyword">Form</span>.Button&gt;提交&lt;/<span class="hljs-keyword">Form</span>.Button&gt;
  &lt;<span class="hljs-keyword">Form</span>.Button <span class="hljs-keyword">type</span>={'reset'}&gt;重置&lt;/<span class="hljs-keyword">Form</span>.Button&gt;
&lt;/<span class="hljs-keyword">Form</span>&gt;</code></pre>
<h2 id="articleHeader3">需求</h2>
<ul>
<li>自定义校验规则</li>
<li>表单内容组件不限组合方式</li>
<li>点击提交按钮就可以提交</li>
<li>提交时候可以校验值并且可以自动拦截，然后将错误信息下发给 FormItem 组件并且显示出来</li>
<li>通过传入 Form 组件的 onSubmit 参数就可以获取到内容</li>
</ul>
<h2 id="articleHeader4">实现</h2>
<p>明白自己所需要的内容后，我们创建基本代码中的几个组件，Form ， FormItem ，Input , 以及 Button。<br>具体内容看代码中的注释</p>
<h4>Form</h4>
<p>首先我们要知道 Form 组件在联合组件中的负责的内容</p>
<ul>
<li>数据收集</li>
<li>数据校验</li>
<li>提交、重置动作处理</li>
</ul>
<p>代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, {Component} from 'React';
import PropTypes from 'prop-types';
import {Item} from './Item';
import {Button} from './Button';
import {Input} from './Input';

export class Form extends Component{
  static propTypes = {
    onSubmit: PropTypes.func.isRequired, // 需要该参数因为，如果没有该参数，整个组件就没有意义
    defaultValues: PropTypes.object, // 如果有些需要默认参数的，就需要该参数
    children: PropTypes.any,
  };
  
  static defaultProps = {
    defaultValues: {},
  };

  static childContextTypes = {
    form: PropTypes.any, // 定义上下文参数名称和格式，格式太麻烦，直接any了或者 object也可以。
  };

  state = {
    validates: {},
    change: 0,
  };
  
  // 为什么不将数据全部放在 state 里面，在本文最后会讲到
  registerState = {
    form: {},
    rules: {},
    label: {},
  };

  getChildContext() {
    // 定义上下文返回内容
    const {validates} = this.state;
    const {form} = this.registerState;
    return {
      form: {
        submit: this.submit.bind(this),
        reset: this.reset.bind(this),
        register: this.register.bind(this),
        registerLabel: this.registerLabel.bind(this),
        setFieldValue: this.setFieldValue.bind(this),
        data: form,
        validates,
      },
    };
  }

  submit() {
    // 提交动作
    const {onSubmit} = this.props;
    if (onSubmit) {
      const validates = [];
      const {form, rules, label} = this.registerState;
      Object.keys(form).forEach(key => {
        const item = form[key];
        const itemRules = rules[key];

        itemRules.forEach(rule => {
          //To do something validator 简单列出几种基本校验方法，可自行添加
          let res = true;
          // 如果校验规则里面有基本规则时候，使用基本规则
          if (rule.hasOwnProperty('type')) {
            switch (rule) {
              case 'phone':
                /^1[3-9]\d+$/.test(item);
                res = false;
                break;
              default:
                break;
            }
          }
          // 如果校验规则里面有 校验函数时候，使用它
          if (rule.hasOwnProperty('validator')) {
            res = rule.validator(item);
          }
          // 校验不通过，向校验结果数组里面增加，并且结束本次校验
          if (!res) {
            validates.push({key, message: rule.message, label: label.hasOwnProperty(key) ? label[key] : ''});
            return false;
          }
        });
      });
        
      if (validates.length > 0) {
        // 在控制台打印出来
        validates.forEach(item => {
          console.warn(`item: ${item.label ? item.label : item.key}; message: ${item.message}`);
        });
        // 将错误信息返回到 state 并且由 context 向下文传递内容，例如 FormItem 收集到该信息，就可以显示出错误内容和样式
        this.setState({
          validates,
        });
      }
      // 最后触发 onSubmit 参数，将错误信息和数据返回
      onSubmit(validates, this.registerState.form);
    }
  }

  reset() {
    // 重置表单内容
    const {form} = this.registerState;
    const {defaultValues} = this.props;
    this.registerState.form = Object.keys(form).reduce((t, c) => {
      t[c] = defaultValues.hasOwnProperty(c) ? defaultValues[c] : '';
      return t;
    }, {});
    // 因为值不在 state 中，需要刷新一下state，完成值在 context 中的更新
    this.change();
  }
  
  //更新某一个值
  setFieldValue(name, value) {
    this.registerState.form[name] = value;
    this.change();
  }

  // 值和规则都不在state中，需要借助次方法更新内容
  change() {
    this.setState({
      change: this.state.change + 1,
    });
  }
  
  // 注册参数，最后数据收集和规则校验都是通过该方法向里面添加的内容完成
  register(name, itemRules) {
    if (this.registerFields.indexOf(name) === -1) {
      this.registerFields.push(name);
      const {defaultValues} = this.props;
      this.registerState.form[name] = defaultValues.hasOwnProperty(name) ? defaultValues[name] : '';
      this.registerState.rules[name] = itemRules;
    } else {
      // 重复的话提示错误
      console.warn(`\`${name}\` has repeat`);
    }
  }
  
  // 添加 字段名称，优化体验
  registerLabel(name, label) {
    this.registerState.label[name] = label;
  }

  render() {
    return (
      <div className=&quot;form&quot;>
        {this.props.children}
      </div>
    ); // 这里使用括号因为在 webStrom 下格式化代码后的格式看起来更舒服。
  }
}

// 将子组件加入到 Form 中 表示关联关系
Form.Item = Item;
Form.Button = Button;
Form.Input = Input;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React, {Component} <span class="hljs-keyword">from</span> <span class="hljs-string">'React'</span>;
<span class="hljs-keyword">import</span> PropTypes <span class="hljs-keyword">from</span> <span class="hljs-string">'prop-types'</span>;
<span class="hljs-keyword">import</span> {Item} <span class="hljs-keyword">from</span> <span class="hljs-string">'./Item'</span>;
<span class="hljs-keyword">import</span> {Button} <span class="hljs-keyword">from</span> <span class="hljs-string">'./Button'</span>;
<span class="hljs-keyword">import</span> {Input} <span class="hljs-keyword">from</span> <span class="hljs-string">'./Input'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Form</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span></span>{
  <span class="hljs-keyword">static</span> propTypes = {
    <span class="hljs-attr">onSubmit</span>: PropTypes.func.isRequired, <span class="hljs-comment">// 需要该参数因为，如果没有该参数，整个组件就没有意义</span>
    defaultValues: PropTypes.object, <span class="hljs-comment">// 如果有些需要默认参数的，就需要该参数</span>
    children: PropTypes.any,
  };
  
  <span class="hljs-keyword">static</span> defaultProps = {
    <span class="hljs-attr">defaultValues</span>: {},
  };

  <span class="hljs-keyword">static</span> childContextTypes = {
    <span class="hljs-attr">form</span>: PropTypes.any, <span class="hljs-comment">// 定义上下文参数名称和格式，格式太麻烦，直接any了或者 object也可以。</span>
  };

  state = {
    <span class="hljs-attr">validates</span>: {},
    <span class="hljs-attr">change</span>: <span class="hljs-number">0</span>,
  };
  
  <span class="hljs-comment">// 为什么不将数据全部放在 state 里面，在本文最后会讲到</span>
  registerState = {
    <span class="hljs-attr">form</span>: {},
    <span class="hljs-attr">rules</span>: {},
    <span class="hljs-attr">label</span>: {},
  };

  getChildContext() {
    <span class="hljs-comment">// 定义上下文返回内容</span>
    <span class="hljs-keyword">const</span> {validates} = <span class="hljs-keyword">this</span>.state;
    <span class="hljs-keyword">const</span> {form} = <span class="hljs-keyword">this</span>.registerState;
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">form</span>: {
        <span class="hljs-attr">submit</span>: <span class="hljs-keyword">this</span>.submit.bind(<span class="hljs-keyword">this</span>),
        <span class="hljs-attr">reset</span>: <span class="hljs-keyword">this</span>.reset.bind(<span class="hljs-keyword">this</span>),
        <span class="hljs-attr">register</span>: <span class="hljs-keyword">this</span>.register.bind(<span class="hljs-keyword">this</span>),
        <span class="hljs-attr">registerLabel</span>: <span class="hljs-keyword">this</span>.registerLabel.bind(<span class="hljs-keyword">this</span>),
        <span class="hljs-attr">setFieldValue</span>: <span class="hljs-keyword">this</span>.setFieldValue.bind(<span class="hljs-keyword">this</span>),
        <span class="hljs-attr">data</span>: form,
        validates,
      },
    };
  }

  submit() {
    <span class="hljs-comment">// 提交动作</span>
    <span class="hljs-keyword">const</span> {onSubmit} = <span class="hljs-keyword">this</span>.props;
    <span class="hljs-keyword">if</span> (onSubmit) {
      <span class="hljs-keyword">const</span> validates = [];
      <span class="hljs-keyword">const</span> {form, rules, label} = <span class="hljs-keyword">this</span>.registerState;
      <span class="hljs-built_in">Object</span>.keys(form).forEach(<span class="hljs-function"><span class="hljs-params">key</span> =&gt;</span> {
        <span class="hljs-keyword">const</span> item = form[key];
        <span class="hljs-keyword">const</span> itemRules = rules[key];

        itemRules.forEach(<span class="hljs-function"><span class="hljs-params">rule</span> =&gt;</span> {
          <span class="hljs-comment">//To do something validator 简单列出几种基本校验方法，可自行添加</span>
          <span class="hljs-keyword">let</span> res = <span class="hljs-literal">true</span>;
          <span class="hljs-comment">// 如果校验规则里面有基本规则时候，使用基本规则</span>
          <span class="hljs-keyword">if</span> (rule.hasOwnProperty(<span class="hljs-string">'type'</span>)) {
            <span class="hljs-keyword">switch</span> (rule) {
              <span class="hljs-keyword">case</span> <span class="hljs-string">'phone'</span>:
                <span class="hljs-regexp">/^1[3-9]\d+$/</span>.test(item);
                res = <span class="hljs-literal">false</span>;
                <span class="hljs-keyword">break</span>;
              <span class="hljs-keyword">default</span>:
                <span class="hljs-keyword">break</span>;
            }
          }
          <span class="hljs-comment">// 如果校验规则里面有 校验函数时候，使用它</span>
          <span class="hljs-keyword">if</span> (rule.hasOwnProperty(<span class="hljs-string">'validator'</span>)) {
            res = rule.validator(item);
          }
          <span class="hljs-comment">// 校验不通过，向校验结果数组里面增加，并且结束本次校验</span>
          <span class="hljs-keyword">if</span> (!res) {
            validates.push({key, <span class="hljs-attr">message</span>: rule.message, <span class="hljs-attr">label</span>: label.hasOwnProperty(key) ? label[key] : <span class="hljs-string">''</span>});
            <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
          }
        });
      });
        
      <span class="hljs-keyword">if</span> (validates.length &gt; <span class="hljs-number">0</span>) {
        <span class="hljs-comment">// 在控制台打印出来</span>
        validates.forEach(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> {
          <span class="hljs-built_in">console</span>.warn(<span class="hljs-string">`item: <span class="hljs-subst">${item.label ? item.label : item.key}</span>; message: <span class="hljs-subst">${item.message}</span>`</span>);
        });
        <span class="hljs-comment">// 将错误信息返回到 state 并且由 context 向下文传递内容，例如 FormItem 收集到该信息，就可以显示出错误内容和样式</span>
        <span class="hljs-keyword">this</span>.setState({
          validates,
        });
      }
      <span class="hljs-comment">// 最后触发 onSubmit 参数，将错误信息和数据返回</span>
      onSubmit(validates, <span class="hljs-keyword">this</span>.registerState.form);
    }
  }

  reset() {
    <span class="hljs-comment">// 重置表单内容</span>
    <span class="hljs-keyword">const</span> {form} = <span class="hljs-keyword">this</span>.registerState;
    <span class="hljs-keyword">const</span> {defaultValues} = <span class="hljs-keyword">this</span>.props;
    <span class="hljs-keyword">this</span>.registerState.form = <span class="hljs-built_in">Object</span>.keys(form).reduce(<span class="hljs-function">(<span class="hljs-params">t, c</span>) =&gt;</span> {
      t[c] = defaultValues.hasOwnProperty(c) ? defaultValues[c] : <span class="hljs-string">''</span>;
      <span class="hljs-keyword">return</span> t;
    }, {});
    <span class="hljs-comment">// 因为值不在 state 中，需要刷新一下state，完成值在 context 中的更新</span>
    <span class="hljs-keyword">this</span>.change();
  }
  
  <span class="hljs-comment">//更新某一个值</span>
  setFieldValue(name, value) {
    <span class="hljs-keyword">this</span>.registerState.form[name] = value;
    <span class="hljs-keyword">this</span>.change();
  }

  <span class="hljs-comment">// 值和规则都不在state中，需要借助次方法更新内容</span>
  change() {
    <span class="hljs-keyword">this</span>.setState({
      <span class="hljs-attr">change</span>: <span class="hljs-keyword">this</span>.state.change + <span class="hljs-number">1</span>,
    });
  }
  
  <span class="hljs-comment">// 注册参数，最后数据收集和规则校验都是通过该方法向里面添加的内容完成</span>
  register(name, itemRules) {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.registerFields.indexOf(name) === <span class="hljs-number">-1</span>) {
      <span class="hljs-keyword">this</span>.registerFields.push(name);
      <span class="hljs-keyword">const</span> {defaultValues} = <span class="hljs-keyword">this</span>.props;
      <span class="hljs-keyword">this</span>.registerState.form[name] = defaultValues.hasOwnProperty(name) ? defaultValues[name] : <span class="hljs-string">''</span>;
      <span class="hljs-keyword">this</span>.registerState.rules[name] = itemRules;
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-comment">// 重复的话提示错误</span>
      <span class="hljs-built_in">console</span>.warn(<span class="hljs-string">`\`<span class="hljs-subst">${name}</span>\` has repeat`</span>);
    }
  }
  
  <span class="hljs-comment">// 添加 字段名称，优化体验</span>
  registerLabel(name, label) {
    <span class="hljs-keyword">this</span>.registerState.label[name] = label;
  }

  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"form"</span>&gt;</span>
        {this.props.children}
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    ); <span class="hljs-comment">// 这里使用括号因为在 webStrom 下格式化代码后的格式看起来更舒服。</span>
  }
}

<span class="hljs-comment">// 将子组件加入到 Form 中 表示关联关系</span>
Form.Item = Item;
Form.Button = Button;
Form.Input = Input;</code></pre>
<h4>FormItem</h4>
<p>它的功能不多</p>
<ul>
<li>向 Form 中注册 输入框的关联名称</li>
<li>从 Form 中获取 校验结果并且展示出来</li>
</ul>
<p>代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class Item extends Component {
  // 这个值在 FormItem 组件 被包裹在 Form 组件中时，必须有
  name;

  static propTypes = {
    label: PropTypes.string,
  };

  static childContextTypes = {
    formItem: PropTypes.any,
    children: PropTypes.any,
  };

  static contextTypes = {
    form: PropTypes.object,
  };

  // 防止重复覆盖 name 的值
  lock = false;

  // 获取到 包裹的输入组件的 name值，如果在存在 Form 中，则向 Form 注册name值相对的label值
  setName(name) {
    if (!this.lock) {
      this.lock = true;
      this.name = name;

      const {form} = this.context;
      if (form) {
        form.registerLabel(name, this.props.label);
      }
    } else {
      // 同样，一个 FormItem 只允许操作一个值
      console.warn('Allows only once `setName`');
    }

  }

  getChildContext() {
    return {
      formItem: {
        setName: this.setName.bind(this),
      },
    };
  }

  render() {
    const {label} = this.props;
    const {form} = this.context;

    let className = 'form-item';
    let help = false;
    if (form) {
      const error = form.validates.find(err => err.key === this.name);
      // 如果有找到属于自己错误，就修改状态
      if (error) {
        className += ' form-item-warning';
        help = error.message;
        return false;
      }
    }

    return (
        <div className={className}>
          <div className=&quot;label&quot;>
            {label}
          </div>
          <div className=&quot;input&quot;>
            {this.props.children}
          </div>
          {help ? (
              <div className=&quot;help&quot;>
                {help}
              </div>
          ) : ''}
        </div>
    );
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React, {Component} <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> PropTypes <span class="hljs-keyword">from</span> <span class="hljs-string">'prop-types'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Item</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  <span class="hljs-comment">// 这个值在 FormItem 组件 被包裹在 Form 组件中时，必须有</span>
  name;

  <span class="hljs-keyword">static</span> propTypes = {
    <span class="hljs-attr">label</span>: PropTypes.string,
  };

  <span class="hljs-keyword">static</span> childContextTypes = {
    <span class="hljs-attr">formItem</span>: PropTypes.any,
    <span class="hljs-attr">children</span>: PropTypes.any,
  };

  <span class="hljs-keyword">static</span> contextTypes = {
    <span class="hljs-attr">form</span>: PropTypes.object,
  };

  <span class="hljs-comment">// 防止重复覆盖 name 的值</span>
  lock = <span class="hljs-literal">false</span>;

  <span class="hljs-comment">// 获取到 包裹的输入组件的 name值，如果在存在 Form 中，则向 Form 注册name值相对的label值</span>
  setName(name) {
    <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.lock) {
      <span class="hljs-keyword">this</span>.lock = <span class="hljs-literal">true</span>;
      <span class="hljs-keyword">this</span>.name = name;

      <span class="hljs-keyword">const</span> {form} = <span class="hljs-keyword">this</span>.context;
      <span class="hljs-keyword">if</span> (form) {
        form.registerLabel(name, <span class="hljs-keyword">this</span>.props.label);
      }
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-comment">// 同样，一个 FormItem 只允许操作一个值</span>
      <span class="hljs-built_in">console</span>.warn(<span class="hljs-string">'Allows only once `setName`'</span>);
    }

  }

  getChildContext() {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">formItem</span>: {
        <span class="hljs-attr">setName</span>: <span class="hljs-keyword">this</span>.setName.bind(<span class="hljs-keyword">this</span>),
      },
    };
  }

  render() {
    <span class="hljs-keyword">const</span> {label} = <span class="hljs-keyword">this</span>.props;
    <span class="hljs-keyword">const</span> {form} = <span class="hljs-keyword">this</span>.context;

    <span class="hljs-keyword">let</span> className = <span class="hljs-string">'form-item'</span>;
    <span class="hljs-keyword">let</span> help = <span class="hljs-literal">false</span>;
    <span class="hljs-keyword">if</span> (form) {
      <span class="hljs-keyword">const</span> error = form.validates.find(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> err.key === <span class="hljs-keyword">this</span>.name);
      <span class="hljs-comment">// 如果有找到属于自己错误，就修改状态</span>
      <span class="hljs-keyword">if</span> (error) {
        className += <span class="hljs-string">' form-item-warning'</span>;
        help = error.message;
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
      }
    }

    <span class="hljs-keyword">return</span> (
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{className}</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"label"</span>&gt;</span>
            {label}
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"input"</span>&gt;</span>
            {this.props.children}
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          {help ? (
              <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"help"</span>&gt;</span>
                {help}
              <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          ) : ''}
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
  }
}</code></pre>
<h4>Input</h4>
<p>暂时演示输入组件为 Input ，后面可以按照该组件内容，继续增加其他操作组件<br>该类型组件负责的东西很多</p>
<ul>
<li>唯一name，通知 FormItem 它所包裹的是谁</li>
<li>Form 组件里面，收集的数据</li>
<li>校验规则</li>
</ul>
<p>代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class Input extends Component {
  constructor(props, context) {
    super(props);
    // 如果在 Form 中，或者在 FormItem 中，name值为必填
    if ((context.form || context.formItem) &amp;&amp; !props.name) {
      throw new Error('You should set the `name` props');
    }
    // 如果在 Form 中，不在 FormItem 中，提示一下，不在 FormItem 中不影响最后的值
    if (context.form &amp;&amp; !context.formItem) {
      console.warn('Maybe used `Input` in `FormItem` can be better');
    }

    // 在 FormItem 中，就要通知它自己是谁
    if (context.formItem) {
      context.formItem.setName(props.name);
    }
    // 在 Form 中，就向 Form 注册自己的 name 和 校验规则
    if (context.form) {
      context.form.register(props.name, props.rules);
    }
  }

  shouldComponentUpdate(nextProps) {
    const {form} = this.context;
    const {name} = this.props;
    // 当 有 onChange 事件 或者外部使用组件，强行更改了 Input 值，就需要通知 Form 更新值
    if (form &amp;&amp; this.changeLock &amp;&amp; form.data[name] !== nextProps.value) {
      form.setFieldValue(name, nextProps.value);
      return false;
    }
    return true;
  }

  static propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    rules: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.oneOf(['phone']),
      validator: PropTypes.func,
      message: PropTypes.string.isRequired,
    })),
    type: PropTypes.oneOf(['text', 'tel', 'number', 'color', 'date']),
  };

  static defaultProps = {
    value: '',
    rules: [],
  };

  static contextTypes = {
    form: PropTypes.object,
    formItem: PropTypes.object,
  };

  onChange(e) {
    const val = e.currentTarget.value;
    const {onChange, name} = this.props;
    const {form} = this.context;
    if (onChange) {
      this.changeLock = true;
      onChange(val);
    } else {
      if (form) {
        form.setFieldValue(name, val);
      }
    }
  }

  render() {
    let {value, name, type} = this.props;
    const {form} = this.context;
    if (form) {
      value = form.data[name] || '';
    }
    return (
        <input onChange={this.onChange.bind(this)} type={type} value={value}/>
    );
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-type">React</span>, {<span class="hljs-type">Component</span>} from <span class="hljs-symbol">'reac</span>t';
<span class="hljs-keyword">import</span> <span class="hljs-type">PropTypes</span> from <span class="hljs-symbol">'prop</span>-types';

export <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Input</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  constructor(props, context) {
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-comment">// 如果在 Form 中，或者在 FormItem 中，name值为必填</span>
    <span class="hljs-keyword">if</span> ((context.form || context.formItem) &amp;&amp; !props.name) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-type">Error</span>(<span class="hljs-symbol">'You</span> should set the `name` props');
    }
    <span class="hljs-comment">// 如果在 Form 中，不在 FormItem 中，提示一下，不在 FormItem 中不影响最后的值</span>
    <span class="hljs-keyword">if</span> (context.form &amp;&amp; !context.formItem) {
      console.warn(<span class="hljs-symbol">'Maybe</span> used `<span class="hljs-type">Input</span>` in `<span class="hljs-type">FormItem</span>` can be better');
    }

    <span class="hljs-comment">// 在 FormItem 中，就要通知它自己是谁</span>
    <span class="hljs-keyword">if</span> (context.formItem) {
      context.formItem.setName(props.name);
    }
    <span class="hljs-comment">// 在 Form 中，就向 Form 注册自己的 name 和 校验规则</span>
    <span class="hljs-keyword">if</span> (context.form) {
      context.form.register(props.name, props.rules);
    }
  }

  shouldComponentUpdate(nextProps) {
    const {form} = <span class="hljs-keyword">this</span>.context;
    const {name} = <span class="hljs-keyword">this</span>.props;
    <span class="hljs-comment">// 当 有 onChange 事件 或者外部使用组件，强行更改了 Input 值，就需要通知 Form 更新值</span>
    <span class="hljs-keyword">if</span> (form &amp;&amp; <span class="hljs-keyword">this</span>.changeLock &amp;&amp; form.data[name] !== nextProps.value) {
      form.setFieldValue(name, nextProps.value);
      <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    }
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
  }

  static propTypes = {
    name: <span class="hljs-type">PropTypes</span>.string,
    value: <span class="hljs-type">PropTypes</span>.string,
    onChange: <span class="hljs-type">PropTypes</span>.func,
    rules: <span class="hljs-type">PropTypes</span>.arrayOf(<span class="hljs-type">PropTypes</span>.shape({
      <span class="hljs-class"><span class="hljs-keyword">type</span></span>: <span class="hljs-type">PropTypes</span>.oneOf([<span class="hljs-symbol">'phon</span>e']),
      validator: <span class="hljs-type">PropTypes</span>.func,
      message: <span class="hljs-type">PropTypes</span>.string.isRequired,
    })),
    <span class="hljs-class"><span class="hljs-keyword">type</span></span>: <span class="hljs-type">PropTypes</span>.oneOf([<span class="hljs-symbol">'tex</span>t', <span class="hljs-symbol">'te</span>l', <span class="hljs-symbol">'numbe</span>r', <span class="hljs-symbol">'colo</span>r', <span class="hljs-symbol">'dat</span>e']),
  };

  static defaultProps = {
    value: '',
    rules: [],
  };

  static contextTypes = {
    form: <span class="hljs-type">PropTypes</span>.<span class="hljs-keyword">object</span>,
    formItem: <span class="hljs-type">PropTypes</span>.<span class="hljs-keyword">object</span>,
  };

  onChange(e) {
    const <span class="hljs-keyword">val</span> = e.currentTarget.value;
    const {onChange, name} = <span class="hljs-keyword">this</span>.props;
    const {form} = <span class="hljs-keyword">this</span>.context;
    <span class="hljs-keyword">if</span> (onChange) {
      <span class="hljs-keyword">this</span>.changeLock = <span class="hljs-literal">true</span>;
      onChange(<span class="hljs-keyword">val</span>);
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">if</span> (form) {
        form.setFieldValue(name, <span class="hljs-keyword">val</span>);
      }
    }
  }

  render() {
    let {value, name, <span class="hljs-class"><span class="hljs-keyword">type</span>} </span>= <span class="hljs-keyword">this</span>.props;
    const {form} = <span class="hljs-keyword">this</span>.context;
    <span class="hljs-keyword">if</span> (form) {
      value = form.data[name] || '';
    }
    <span class="hljs-keyword">return</span> (
        &lt;input onChange={<span class="hljs-keyword">this</span>.onChange.bind(<span class="hljs-keyword">this</span>)} <span class="hljs-class"><span class="hljs-keyword">type</span></span>={<span class="hljs-class"><span class="hljs-keyword">type</span>} <span class="hljs-title">value=</span></span>{value}/&gt;
    );
  }
}</code></pre>
<h4>Button</h4>
<p>负责内容很简单</p>
<ul>
<li>提交，触发 submit</li>
<li>重置，触发 reset</li>
</ul>
<p>代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class Button extends Component {

  componentWillMount() {
    const {form} = this.context;
    // 该组件只能用于 Form
    if (!form) {
      throw new Error('You should used `FormButton` in the `Form`');
    }
  }

  static propTypes = {
    children: PropTypes.any,
    type: PropTypes.oneOf(['submit', 'reset']),
  };

  static defaultProps = {
    type: 'submit',
  };

  static contextTypes = {
    form: PropTypes.any,
  };

  onClick() {
    const {form} = this.context;
    const {type} = this.props;
    if (type === 'reset') {
      form.reset();
    } else {
      form.submit();
    }
  }

  render() {
    return (
        <button onClick={this.onClick.bind(this)} className={'form-button'}>
          {this.props.children}
        </button>
    );
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-type">React</span>, {<span class="hljs-type">Component</span>} from <span class="hljs-symbol">'reac</span>t';
<span class="hljs-keyword">import</span> <span class="hljs-type">PropTypes</span> from <span class="hljs-symbol">'prop</span>-types';

export <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Button</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{

  componentWillMount() {
    const {form} = <span class="hljs-keyword">this</span>.context;
    <span class="hljs-comment">// 该组件只能用于 Form</span>
    <span class="hljs-keyword">if</span> (!form) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-type">Error</span>(<span class="hljs-symbol">'You</span> should used `<span class="hljs-type">FormButton</span>` in the `<span class="hljs-type">Form</span>`');
    }
  }

  static propTypes = {
    children: <span class="hljs-type">PropTypes</span>.any,
    <span class="hljs-class"><span class="hljs-keyword">type</span></span>: <span class="hljs-type">PropTypes</span>.oneOf([<span class="hljs-symbol">'submi</span>t', <span class="hljs-symbol">'rese</span>t']),
  };

  static defaultProps = {
    <span class="hljs-class"><span class="hljs-keyword">type</span></span>: <span class="hljs-symbol">'submi</span>t',
  };

  static contextTypes = {
    form: <span class="hljs-type">PropTypes</span>.any,
  };

  onClick() {
    const {form} = <span class="hljs-keyword">this</span>.context;
    const {<span class="hljs-class"><span class="hljs-keyword">type</span>} </span>= <span class="hljs-keyword">this</span>.props;
    <span class="hljs-keyword">if</span> (<span class="hljs-class"><span class="hljs-keyword">type</span> <span class="hljs-title">===</span> '<span class="hljs-title">reset</span>') </span>{
      form.reset();
    } <span class="hljs-keyword">else</span> {
      form.submit();
    }
  }

  render() {
    <span class="hljs-keyword">return</span> (
        &lt;button onClick={<span class="hljs-keyword">this</span>.onClick.bind(<span class="hljs-keyword">this</span>)} className={<span class="hljs-symbol">'form</span>-button'}&gt;
          {<span class="hljs-keyword">this</span>.props.children}
        &lt;/button&gt;
    );
  }
}</code></pre>
<h2 id="articleHeader5">后言</h2>
<p>首先先讲明为何 不将label 和数据不放在state 里面因为多个组件同时注册时候，state更新来不及，会导致部分值初始化不成功，所以最后将值收集在 另外的 object 里面，并且是直接赋值<br>看了上面几个组件的代码，应该有所明确，这些组件组合起来使用就是一个大的组件。同时又可以单独使用，知道该如何使用后，又可以按照规则，更新整个各个组件，而不会说，一个巨大无比的单独组件，无法拆分，累赘又复杂。通过联合组件，可以达成很多奇妙的组合方式。上文的例子中，如果没有 Form 组件， 单独的 FormInput 加 Input，这两个组合起来，也可以是一个单独的验证器。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React-联合组件

## 原文链接
[https://segmentfault.com/a/1190000014851189](https://segmentfault.com/a/1190000014851189)

