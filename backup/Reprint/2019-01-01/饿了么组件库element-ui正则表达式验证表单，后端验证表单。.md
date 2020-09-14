---
title: '饿了么组件库element-ui正则表达式验证表单，后端验证表单。' 
date: 2019-01-01 2:30:07
hidden: true
slug: n26k4p02k7
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>前言</strong></p>
<p>老是遇到一些朋友问一些element-ui组件使用相关的基础问题，因为官方文档上并没有提供所有琐碎的功能代码demo。从这里开始我会根据我实际遇到的问题记录一些常见的官方文档没有详述的功能代码，供给大家拓展思路。</p>
<p><strong>1. 以中国大陆手机号验证为例</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 这是组价的代码
<el-form-item prop=&quot;mobile&quot;>
    <el-input type=&quot;text&quot; v-model=&quot;ruleForm.mobile&quot; auto-complete=&quot;off&quot; placeholder=&quot;请输入手机号&quot;></el-input>
</el-form-item>

// 这是rules的代码
mobile: [
    { validator: validateMobile, trigger: 'blur' },
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[34578]\d{9}$/, message: '目前只支持中国大陆的手机号码' }
]," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>// 这是组价的代码
&lt;<span class="hljs-keyword">el</span>-form-item prop=<span class="hljs-string">"mobile"</span>&gt;
    &lt;<span class="hljs-keyword">el</span>-<span class="hljs-built_in">input</span> <span class="hljs-built_in">type</span>=<span class="hljs-string">"text"</span> v-model=<span class="hljs-string">"ruleForm.mobile"</span> auto-<span class="hljs-built_in">complete</span>=<span class="hljs-string">"off"</span> placeholder=<span class="hljs-string">"请输入手机号"</span>&gt;&lt;/<span class="hljs-keyword">el</span>-<span class="hljs-built_in">input</span>&gt;
&lt;/<span class="hljs-keyword">el</span>-form-item&gt;

// 这是rules的代码
mobile: [
    { validator: validateMobile, trigger: <span class="hljs-string">'blur'</span> },
    { required: true, message: <span class="hljs-string">'请输入手机号'</span>, trigger: <span class="hljs-string">'blur'</span> },
    { pattern: /^<span class="hljs-number">1</span>[<span class="hljs-number">34578</span>]\d{<span class="hljs-number">9</span>}$/, message: <span class="hljs-string">'目前只支持中国大陆的手机号码'</span> }
],</code></pre>
<p>在element-ui的源码中搜索blur，你会很容易看到除了blur 还有focus、input，非常贴心基本满足了表单验证的入门需求。 </p>
<p><strong>2. 表单局部提交后端验证</strong></p>
<p>在一些输入项目较多的表单提交中，比如说注册时填写的用户名，通常我们会对用户名是否重复进行验证，这是就需要调用服务来验证，这种略显复杂的验证，就需要自定义验证规则来实现。看下面的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 注意validatePass是属于data的，但不在return中。
data () {
let validatePass = (rule, value, callback) => {
    if (value.length >= 8) {
                let params = {
                    'account': value
                }
                axios.post('localhost:8080/verifyUserAccount', params)
                .then(function (response) {
                    if (response.data.err) {
                        callback(response.data.msg)
                    } else {
                        callback()
                    }
                })
                .catch(function () {
                    callback(new Error('服务异常'))
                })
            } else {
                callback()
            }
}

//这是验证规则，当然了你也可以同时使用基本的验证规则
account: [
    { validator: validatePass , trigger: 'blur' }
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 注意validatePass是属于data的，但不在return中。</span>
data () {
<span class="hljs-keyword">let</span> validatePass = <span class="hljs-function">(<span class="hljs-params">rule, value, callback</span>) =&gt;</span> {
    <span class="hljs-keyword">if</span> (value.length &gt;= <span class="hljs-number">8</span>) {
                <span class="hljs-keyword">let</span> params = {
                    <span class="hljs-string">'account'</span>: value
                }
                axios.post(<span class="hljs-string">'localhost:8080/verifyUserAccount'</span>, params)
                .then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">response</span>) </span>{
                    <span class="hljs-keyword">if</span> (response.data.err) {
                        callback(response.data.msg)
                    } <span class="hljs-keyword">else</span> {
                        callback()
                    }
                })
                .catch(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                    callback(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'服务异常'</span>))
                })
            } <span class="hljs-keyword">else</span> {
                callback()
            }
}

<span class="hljs-comment">//这是验证规则，当然了你也可以同时使用基本的验证规则</span>
account: [
    { <span class="hljs-attr">validator</span>: validatePass , <span class="hljs-attr">trigger</span>: <span class="hljs-string">'blur'</span> }
]</code></pre>
<p>注意：validatePass 自定义规则中每个执行流程中都必须附带callback()，这样才能明确通过验证的情况下去掉输入框上的loading。要显示的错误提示则可以new Error（“xxxx”）即可。 </p>
<p><strong>3. 综合来看</strong></p>
<p>通常可以把所有规则都写在自定义的规则中，即可实现较为复杂的验证，实际上我们可以再validatePass里面调用根实例下所有data methods...，一个很简单的例子是实现两次输入的密码是否相同的验证，看下面的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'))
            } else if (value !== this.ruleForm.password) {
                callback(new Error('两次输入密码不一致!'))
            } else {
                callback()
            }
        }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code>let validatePass = (rule, value, <span class="hljs-keyword">callback</span>) =&gt; {
            <span class="hljs-keyword">if</span> (value === <span class="hljs-string">''</span>) {
                <span class="hljs-keyword">callback</span>(<span class="hljs-keyword">new</span> <span class="hljs-type">Error</span>(<span class="hljs-string">'请再次输入密码'</span>))
            } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (value !== <span class="hljs-built_in">this</span>.ruleForm.password) {
                <span class="hljs-keyword">callback</span>(<span class="hljs-keyword">new</span> <span class="hljs-type">Error</span>(<span class="hljs-string">'两次输入密码不一致!'</span>))
            } <span class="hljs-keyword">else</span> {
                <span class="hljs-keyword">callback</span>()
            }
        }</code></pre>
<p>就这么简单就可以实现非vuejs情况下是非啰嗦的验证。而且样式也不会很丑，当然了任然可以选择自定义样式。这个以后再记录。</p>
<p><strong>4. 写在最后的</strong></p>
<p>以上三点已经完全覆盖了所有表单验证的情况，可以实现非常复杂的验证。正式基于这些原因，我坚信element-ui是正确的选择。我将会继续写一些剪短的文章补充文档的遗漏。同时如果你也跟我一样喜欢element-ui欢迎跟我探讨，我们新建了一个qq群<a href="//shang.qq.com/wpa/qunwpa?idkey=70163ae1afd989cedc04a008a72c68ad5560c7843ce3f52914eb37e707f1eea1" rel="nofollow noreferrer">478694438![图片描述][1]</a>，方便大家交流。最后喊一下口号：不拘泥于原理，完全立足于实现！</p>
<p><strong>5. 另</strong><br>文中涉及到的源码我将会上传到讨论群中，不足之处持续更进，共同探讨。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
饿了么组件库element-ui正则表达式验证表单，后端验证表单。

## 原文链接
[https://segmentfault.com/a/1190000011076169](https://segmentfault.com/a/1190000011076169)

