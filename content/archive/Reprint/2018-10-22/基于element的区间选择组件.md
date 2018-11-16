---
title: 基于element的区间选择组件
hidden: true
categories: [reprint]
slug: 92007a9e
date: 2018-10-22 00:00:00
---

{{< raw >}}

                    
<p>公司的系统中，产品经理在设计时经常要求对某个字段进行区间阈值设置或者作为筛选条件。但是苦于element中没有非常契合的组件（slider组件并不支持两端均能设定），于是自己动手造了一个。</p>
<h2 id="articleHeader0">成果</h2>
<p>最终的展示效果如下：</p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/bVbgxrb?w=480&amp;h=216" src="https://static.alili.tech/img/bVbgxrb?w=480&amp;h=216" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">需求</h2>
<p>这里以项目的需求为例，基本的需求如下：</p>
<ol>
<li>分为左右值，包含左右值，正整数</li>
<li>左侧必须大于等于1，右侧不得大于100000，右侧值必须不小于左侧</li>
<li>默认：左侧20，右侧100000，均必填</li>
<li>失焦校验</li>
</ol>
<p>页面和表单校验结构一样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<el-form ref=&quot;form&quot; :model=&quot;form&quot; :rules=&quot;rules&quot;>
    <el-form-item prop=&quot;min&quot;>
        <el-input v-model=&quot;form.min&quot; />
    </el-form-item>
    ~
    <el-form-item prop=&quot;max&quot;>
        <el-input v-model=&quot;form.max&quot; />
    </el-form-item>
</el-form>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">el-form</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"form"</span> <span class="hljs-attr">:model</span>=<span class="hljs-string">"form"</span> <span class="hljs-attr">:rules</span>=<span class="hljs-string">"rules"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">el-form-item</span> <span class="hljs-attr">prop</span>=<span class="hljs-string">"min"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">el-input</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"form.min"</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">el-form-item</span>&gt;</span>
    ~
    <span class="hljs-tag">&lt;<span class="hljs-name">el-form-item</span> <span class="hljs-attr">prop</span>=<span class="hljs-string">"max"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">el-input</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"form.max"</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">el-form-item</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">el-form</span>&gt;</span></code></pre>
<h2 id="articleHeader2">主要思路</h2>
<ol>
<li>单个表单校验：必填项校验、正整数校验、区间校验</li>
<li>关联校验：右侧阈值不得小于左侧阈值</li>
</ol>
<p>根据上面的思路，单个表单的校验属于公共校验方法，关联校验需要分别校验（因为对比对象不同，且提示语不同），由此在自定义校验中有了如下定义：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="rules: {
    min: [
        { required: true, message: '必填项，请维护', trigger: 'blur' },
        { validator: this.validateCom, trigger: 'blur' },
        { validator: this.validateMin, trigger: 'blur' },
    ],
    max: [
        { required: true, message: '必填项，请维护', trigger: 'blur' },
        { validator: this.validateCom, trigger: 'blur' },
        { validator: this.validateMax, trigger: 'blur' },
    ],
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">rules: {
    <span class="hljs-attr">min</span>: [
        { <span class="hljs-attr">required</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">message</span>: <span class="hljs-string">'必填项，请维护'</span>, <span class="hljs-attr">trigger</span>: <span class="hljs-string">'blur'</span> },
        { <span class="hljs-attr">validator</span>: <span class="hljs-keyword">this</span>.validateCom, <span class="hljs-attr">trigger</span>: <span class="hljs-string">'blur'</span> },
        { <span class="hljs-attr">validator</span>: <span class="hljs-keyword">this</span>.validateMin, <span class="hljs-attr">trigger</span>: <span class="hljs-string">'blur'</span> },
    ],
    <span class="hljs-attr">max</span>: [
        { <span class="hljs-attr">required</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">message</span>: <span class="hljs-string">'必填项，请维护'</span>, <span class="hljs-attr">trigger</span>: <span class="hljs-string">'blur'</span> },
        { <span class="hljs-attr">validator</span>: <span class="hljs-keyword">this</span>.validateCom, <span class="hljs-attr">trigger</span>: <span class="hljs-string">'blur'</span> },
        { <span class="hljs-attr">validator</span>: <span class="hljs-keyword">this</span>.validateMax, <span class="hljs-attr">trigger</span>: <span class="hljs-string">'blur'</span> },
    ],
},</code></pre>
<p>公共校验方法：正整数校验、区间校验</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="validateCom(rule, value, callback) {
    const one = Number(value);
    if (Number.isInteger(one)) {
        if (one < MIN_NUMBER) {
            return callback(new Error(`输入值必须大于${MIN_NUMBER}`));
        } else if (one > MAX_NUMBER) {
            return callback(new Error(`输入值必须小于${MAX_NUMBER}`));
        }
        return callback();
    }
    return callback(new Error('输入值必须为正整数'));
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">validateCom(rule, value, callback) {
    <span class="hljs-keyword">const</span> one = <span class="hljs-built_in">Number</span>(value);
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Number</span>.isInteger(one)) {
        <span class="hljs-keyword">if</span> (one &lt; MIN_NUMBER) {
            <span class="hljs-keyword">return</span> callback(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">`输入值必须大于<span class="hljs-subst">${MIN_NUMBER}</span>`</span>));
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (one &gt; MAX_NUMBER) {
            <span class="hljs-keyword">return</span> callback(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">`输入值必须小于<span class="hljs-subst">${MAX_NUMBER}</span>`</span>));
        }
        <span class="hljs-keyword">return</span> callback();
    }
    <span class="hljs-keyword">return</span> callback(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'输入值必须为正整数'</span>));
},</code></pre>
<p><strong>注意：</strong>input输出的始终是字符串类型，需要转换成数字后进行比对</p>
<p>关联校验：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="validateMin(rule, value, callback) {
    const one = Number(value);
    const max = Number(this.form.max);
    if (!max || one < max) {
        return callback();
    }
    return callback(new Error('输入值不得大于最大阈值'));
},
validateMax(rule, value, callback) {
    const one = Number(value);
    const min = Number(this.form.min);
    if (!min || one > min) {
        return callback();
    }
    return callback(new Error('输入值不得小于最小阈值'));
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">validateMin(rule, value, callback) {
    <span class="hljs-keyword">const</span> one = <span class="hljs-built_in">Number</span>(value);
    <span class="hljs-keyword">const</span> max = <span class="hljs-built_in">Number</span>(<span class="hljs-keyword">this</span>.form.max);
    <span class="hljs-keyword">if</span> (!max || one &lt; max) {
        <span class="hljs-keyword">return</span> callback();
    }
    <span class="hljs-keyword">return</span> callback(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'输入值不得大于最大阈值'</span>));
},
validateMax(rule, value, callback) {
    <span class="hljs-keyword">const</span> one = <span class="hljs-built_in">Number</span>(value);
    <span class="hljs-keyword">const</span> min = <span class="hljs-built_in">Number</span>(<span class="hljs-keyword">this</span>.form.min);
    <span class="hljs-keyword">if</span> (!min || one &gt; min) {
        <span class="hljs-keyword">return</span> callback();
    }
    <span class="hljs-keyword">return</span> callback(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'输入值不得小于最小阈值'</span>));
},</code></pre>
<p>大概，你会想，这不就完了吗！so easy！<strong>现在真正的坑才开始</strong></p>
<h2 id="articleHeader3">填坑（重点）</h2>
<p>根据上面的写法，组件的基本功能实现了，但是有一个坑！如下：<br><span class="img-wrap"><img src="https://static.alili.tech/img/bVbgxry?w=480&amp;h=216" del-src="https://static.alili.tech/v-5bbf1b3b/global/img/squares.svg" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>很显然，左侧值是小于右侧值的，但是校验提示仍然报错。究其原因，还是关联校验的问题。既然是关联交验，改变其中一个时应该会重新校验两个。很简单，在input改变时，重新校验表单不就OK了吗</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="handleChange() {
    this.$refs.form.validate();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">handleChange() {
    <span class="hljs-keyword">this</span>.$refs.form.validate();
}</code></pre>
<p>真实表现正如我们所料，但是当我们打开console的时候，会看到<code>Uncaught (in promise) false</code>，这又是什么鬼，身为优秀的前端工程师，你定不会允许自己的代码里报错，即使不影响正常流程。</p>
<p>经查证：Promise报错，Uncaught的意思是代表有reject状态没有被catch。究其原因，改变一个值时，校验整个表单时，改变的那个input会执行两次校验，导致异常。</p>
<p>最后做如下修改：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="handleMinChange() {
    this.$refs.form.validateField('max');
},
handleMaxChange() {
    this.$refs.form.validateField('min');
},

// 并对外暴露操作方法
getFormData() {
    const ret = {};
    this.$refs.form.validate((valid) => {
        ret.valid = valid;
        ret.form = this.form;
    });
    return ret;
},
resetForm() {
    this.$refs.form.resetFields();
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">handleMinChange() {
    <span class="hljs-keyword">this</span>.$refs.form.validateField(<span class="hljs-string">'max'</span>);
},
handleMaxChange() {
    <span class="hljs-keyword">this</span>.$refs.form.validateField(<span class="hljs-string">'min'</span>);
},

<span class="hljs-comment">// 并对外暴露操作方法</span>
getFormData() {
    <span class="hljs-keyword">const</span> ret = {};
    <span class="hljs-keyword">this</span>.$refs.form.validate(<span class="hljs-function">(<span class="hljs-params">valid</span>) =&gt;</span> {
        ret.valid = valid;
        ret.form = <span class="hljs-keyword">this</span>.form;
    });
    <span class="hljs-keyword">return</span> ret;
},
resetForm() {
    <span class="hljs-keyword">this</span>.$refs.form.resetFields();
},</code></pre>
<h2 id="articleHeader4">总结</h2>
<ol>
<li>input表单输出值为String类型，即使设置了<code>type=number</code>
</li>
<li>关联交验时需要验证其关联项，且不能重复校验</li>
</ol>
<p><a href="https://segmentfault.com/n/1330000016295830">源码链接</a></p>

                
{{< /raw >}}

# 版权声明
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文链接
[https://segmentfault.com/a/1190000016295863](https://segmentfault.com/a/1190000016295863)

## 原文标题
基于element的区间选择组件
