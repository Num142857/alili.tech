---
title: 'ElementUi rules表单验证' 
date: 2018-12-21 2:30:11
hidden: true
slug: fvy8sdh94e
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">ElementUi 表单验证</h2>
<blockquote><ol>
<li>可以在pattern中书写正则，并且配合elementUI进行表单验证。</li>
<li>pattern 属性规定用于验证输入字段的模式。模式指的是正则表达式。</li>
</ol></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="rules: {
    name:[{
        required: true,
        message: '请输入用户名',
        trigger: 'blur'
        },{
        min: 2,
        max: 5,
        message: '长度在 2 到 5 个字符'
        },{
        pattern: /^[\u4E00-\u9FA5]+$/,
        message: '用户名只能为中文'
    }
        //{ pattern:/^[a-zA-Z]w{1,4}$/, message: '以字母开头，长度在2-5之间， 只能包含字符、数字和下划线'}
    ],
    password: [{
        required: true,
        message: '请输入密码',
        trigger: 'blur'
    }, {
        min: 6,
        max: 30,
        message: '长度在 6 到 30 个字符'
    }, {
        pattern: /^(\w){6,20}$/,
        message: '只能输入6-20个字母、数字、下划线'
    }],
    mobile:[{ 
        required: true,
        message: '请输入手机号码',
        trigger: 'blur'
    },
    {validator:function(rule,value,callback){
            if(/^1[34578]\d{9}$/.test(value) == false){
                callback(new Error(&quot;请输入正确的手机号&quot;));
            }else{
                callback();
            }
        }, trigger: 'blur'}
    ],
    //   pattern: /^1[34578]\d{9}$/, message: '目前只支持中国大陆的手机号码' }
    peopleID:[{
        required: true,
        message: '请输入身份证ID',
        trigger: 'blur'
        },{
           pattern:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '你的身份证格式不正确' 
        }
    ],
    carId:[
        {required: true, message: '请输入车牌号', trigger: 'blur'}, 
        {pattern:/(^[\u4E00-\u9FA5]{1}[A-Z0-9]{6}$)|(^[A-Z]{2}[A-Z0-9]{2}[A-Z0-9\u4E00-\u9FA5]{1}[A-Z0-9]{4}$)|(^[\u4E00-\u9FA5]{1}[A-Z0-9]{5}[挂学警军港澳]{1}$)|(^[A-Z]{2}[0-9]{5}$)|(^(08|38){1}[A-Z0-9]{4}[A-Z0-9挂学警军港澳]{1}$)/,
         message: '常规格式：晋B12345'},
    ],
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>rules: {
    name:[{
        required: true,
        message: <span class="hljs-string">'请输入用户名'</span>,
        trigger: <span class="hljs-string">'blur'</span>
        },{
        min: <span class="hljs-number">2</span>,
        max: <span class="hljs-number">5</span>,
        message: <span class="hljs-string">'长度在 2 到 5 个字符'</span>
        },{
        pattern: /^[\u4E0<span class="hljs-number">0</span>-\u9FA5]+$/,
        message: <span class="hljs-string">'用户名只能为中文'</span>
    }
        //{ pattern:/^[a-zA-Z]w{<span class="hljs-number">1</span>,<span class="hljs-number">4</span>}$/, message: <span class="hljs-string">'以字母开头，长度在2-5之间， 只能包含字符、数字和下划线'</span>}
    ],
    password: [{
        required: true,
        message: <span class="hljs-string">'请输入密码'</span>,
        trigger: <span class="hljs-string">'blur'</span>
    }, {
        min: <span class="hljs-number">6</span>,
        max: <span class="hljs-number">30</span>,
        message: <span class="hljs-string">'长度在 6 到 30 个字符'</span>
    }, {
        pattern: /^(\w){<span class="hljs-number">6</span>,<span class="hljs-number">20</span>}$/,
        message: <span class="hljs-string">'只能输入6-20个字母、数字、下划线'</span>
    }],
    mobile:[{ 
        required: true,
        message: <span class="hljs-string">'请输入手机号码'</span>,
        trigger: <span class="hljs-string">'blur'</span>
    },
    {validator:function(rule,value,callback){
            if(/^<span class="hljs-number">1</span>[<span class="hljs-number">34578</span>]\d{<span class="hljs-number">9</span>}$/.test(value) == false){
                callback(new Error(<span class="hljs-string">"请输入正确的手机号"</span>));
            }else{
                callback();
            }
        }, trigger: <span class="hljs-string">'blur'</span>}
    ],
    //   pattern: /^<span class="hljs-number">1</span>[<span class="hljs-number">34578</span>]\d{<span class="hljs-number">9</span>}$/, message: <span class="hljs-string">'目前只支持中国大陆的手机号码'</span> }
    peopleID:[{
        required: true,
        message: <span class="hljs-string">'请输入身份证ID'</span>,
        trigger: <span class="hljs-string">'blur'</span>
        },{
           pattern:/(^\d{<span class="hljs-number">15</span>}$)|(^\d{<span class="hljs-number">18</span>}$)|(^\d{<span class="hljs-number">17</span>}(\d|X|x)$)/, message: <span class="hljs-string">'你的身份证格式不正确'</span> 
        }
    ],
    carId:[
        {required: true, message: <span class="hljs-string">'请输入车牌号'</span>, trigger: <span class="hljs-string">'blur'</span>}, 
        {pattern:/(^[\u4E0<span class="hljs-number">0</span>-\u9FA5]{<span class="hljs-number">1</span>}[A-Z<span class="hljs-number">0</span>-<span class="hljs-number">9</span>]{<span class="hljs-number">6</span>}$)|(^[A-Z]{<span class="hljs-number">2</span>}[A-Z<span class="hljs-number">0</span>-<span class="hljs-number">9</span>]{<span class="hljs-number">2</span>}[A-Z<span class="hljs-number">0</span>-<span class="hljs-number">9</span>\u4E0<span class="hljs-number">0</span>-\u9FA5]{<span class="hljs-number">1</span>}[A-Z<span class="hljs-number">0</span>-<span class="hljs-number">9</span>]{<span class="hljs-number">4</span>}$)|(^[\u4E0<span class="hljs-number">0</span>-\u9FA5]{<span class="hljs-number">1</span>}[A-Z<span class="hljs-number">0</span>-<span class="hljs-number">9</span>]{<span class="hljs-number">5</span>}[挂学警军港澳]{<span class="hljs-number">1</span>}$)|(^[A-Z]{<span class="hljs-number">2</span>}[<span class="hljs-number">0</span>-<span class="hljs-number">9</span>]{<span class="hljs-number">5</span>}$)|(^(08|<span class="hljs-number">38</span>){<span class="hljs-number">1</span>}[A-Z<span class="hljs-number">0</span>-<span class="hljs-number">9</span>]{<span class="hljs-number">4</span>}[A-Z<span class="hljs-number">0</span>-<span class="hljs-number">9</span>挂学警军港澳]{<span class="hljs-number">1</span>}$)/,
         message: <span class="hljs-string">'常规格式：晋B12345'</span>},
    ],
},</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ElementUi rules表单验证

## 原文链接
[https://segmentfault.com/a/1190000012551362](https://segmentfault.com/a/1190000012551362)

