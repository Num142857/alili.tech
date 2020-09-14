---
title: 'form表单那点事儿(上) 基础篇' 
date: 2019-02-08 2:30:41
hidden: true
slug: fyczf4bw7x8
categories: [reprint]
---

{{< raw >}}

                    
<p>做为html中最为常见，应用最广泛的标签之一，form常伴随前端左右。了解更深，用的更顺。</p>
<h2 id="articleHeader0">表单属性</h2>
<p>这个表单展示了form表单常用的属性</p>
<table width="100%">
<thead>
<tr><th width="100">属性名</th>
        <th width="230">属性值</th>
        <th>描述</th>
    </tr></thead>
<tbody><tr>
<td>action</td>
        <td> 一个url地址</td>
        <td> 指定表单提交到的地址 </td>
    </tr>
<tr>
<td>method</td>
        <td>
<code>GET</code> , <code>POST</code>
</td>
        <td>表单将以此种方法提交到服务器</td>
    </tr>
<tr>
<td>target</td>
        <td>
         * <code>_self</code> 当前页面
         
         * <code>_blank</code> 每次在新窗口打开
         
         *  <code>blank</code>  每次在同一个新窗口打开
         
         *  <code>_parent</code> 父级frame
         
         * <code>_top</code> 顶级frame
         
         * iframename 指定的iframe
         
        </td>
        <td>表单提交后，收到回复的页面</td>
    </tr>
<tr>
<td>name</td>
        <td>-</td>
        <td>一个html文档中，每个form的name应该是唯一的</td>
    </tr>
<tr>
<td>enctype</td>
        <td>
        * <code>application/x-www-form-urlencoded</code> 默认值
        
        * <code>multipart/form-data</code> 上传file用
        
        * <code>text/plain</code> html5默认
        </td>
        <td>
            以 <code>POST</code> 方式提交form时的MIME类型。文件上传必须使用 <code>multipart/form-data</code>
        </td>
    </tr>
<tr>
<td>autocomplete</td>
        <td>
<code>on</code> , <code>off</code>
</td>
        <td>是否自动完成表单字段</td>
    </tr>
<tr>
<td>autocapitalize</td>
        <td>
        * <code>none</code> 完全禁用自动首字母大写
        
        * <code>sentences</code> 自动对每句话首字母大写
        
        * <code>words</code> 自动对每个单词首字母大写
        
        * <code>characters</code> 自动大写所有的字母
        </td>
        <td>
             iOS 专用属性，表单中文本域英文大小写
        </td>
    </tr>
<tr>
<td>accept-charset</td>
        <td>字符编码格式( <code>utf-8</code> , <code>gb-2312</code> 等)</td>
        <td>
            将会以此种编码格式提交表单到服务器，默认值是UNKONWN，即html文档所采用的编码格式。
        </td>
    </tr>
<tr>
<td>novalidate</td>
        <td>
<code>true</code> , <code>false</code>
</td>
        <td>
            是否启用表单校验
        </td>
    </tr>
<tr>
<td colspan="3"></td>
    </tr>
</tbody></table>
<p>下面举例的表单将会以 <code>post</code> 方式将input的值以 <code>utf-8</code> 编码格式提交到 <code>/login</code> 接口，并会打开一个新页面显示返回结果，由于 <code>target="blank"</code> ，所以就算提交多次该表单，都只会继续刷新之前打开的窗口。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
  <meta charset=&quot;UTF-8&quot;>
</head>
<body>
  <form action=&quot;/login&quot; method=&quot;post&quot; target=&quot;blank&quot; >
    <input type=&quot;text&quot; name='username'>
    <button>提交</button>
  </form>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">action</span>=<span class="hljs-string">"/login"</span> <span class="hljs-attr">method</span>=<span class="hljs-string">"post"</span> <span class="hljs-attr">target</span>=<span class="hljs-string">"blank"</span> &gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">'username'</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>提交<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<h2 id="articleHeader1">表单元素</h2>
<p>常见的表单元素包括 <code>input</code> , <code>select</code> , <code>textarea</code> , <code>button</code> , <code>progress</code> 等，这些元素都有一些自己的属性</p>
<table width="100%">
<thead>
<tr><th width="100">属性名</th>
        <th width="230">属性值</th>
        <th>描述</th>
    </tr></thead>
<tbody><tr><td colspan="3"><strong>必须</strong></td></tr>
<tr>
<td>type</td>
        <td>
        * <code>text</code> 单行文本框
        
        * <code>raido</code> 单选框
        
        * <code>checkbox</code> 多选框
        
        * <code>tel</code> 电话号码输入框
        
        * <code>range</code> 滑块取值框
        ... ... 更多
        </td>
        <td>指定input标签展示的样式，忽略type属性将默认使用 <code>text</code>
</td>
    </tr>
<tr>
<td>name</td>
        <td>字符串</td>
        <td>form提交时，该字段的key，忽略value属性的元素将不会被提交</td>
    </tr>
<tr><td colspan="3"><strong>状态</strong></td></tr>
<tr>
<td>checked</td>
        <td>任意值 或 忽略该属性</td>
        <td>有此属性的radio和checkbox元素将被选中，同一name多个元素具有此属性的，提交时取最后一个值</td>
    </tr>
<tr>
<td>selected</td>
        <td>任意值 或 忽略该属性</td>
        <td>有此属性的option元素将被选中，同一name多个元素具有此属性的，提交时取最后一个值</td>
    </tr>
<tr>
<td>readonly</td>
        <td>任意值 或 忽略该属性</td>
        <td>具有该属性的表单元素将不可输入或改变状态，除非用JavaScript操作</td>
    </tr>
<tr>
<td>disabled</td>
        <td>任意值 或 忽略该属性</td>
        <td>除拥有readonly的特征外，表单提交时，将忽略此字段</td>
    </tr>
<tr><td colspan="3"><strong>限制</strong></td></tr>
<tr>
<td>form</td>
        <td>表单id</td>
        <td>该元素将作为指定id表单字段被提交。用于 <code>button</code> 或 <code>input type='submit'</code> 元素时，将提交指定id的表单 <a>示例代码</a>
</td>
    </tr>
<tr>
<td>accept</td>
        <td>
        * <code>image/*</code> 只能上传图片
        
        * <code>video/*</code> 只能上传视频
        </td>
        <td>
          <code>input type='file'</code> 使用的属性，是一个MIME类型的值，或文件后缀名。 <a>示例代码</a>
        </td>
    </tr>
<tr>
<td>multiple</td>
        <td>
          任意值 或 忽略该属性
        </td>
        <td>
        <code>input type='file'</code> 或 <code>select</code> 或 应用了 <code>datalist</code> 的表单元素才能应用该属性<a>示例代码</a>
        </td>
    </tr>
<tr>
<td>maxlength</td>
        <td>
          正整数或0
        </td>
        <td>
          文本域可输入字符的长度，浮点数将会向下取整，负数将被忽略，JavaScript可以绕过这一限制
        </td>
    </tr>
<tr>
<td>required</td>
        <td>任意值 或 忽略该属性</td>
        <td>该表单字段是否需要被验证</td>
    </tr>
<tr>
<td>pattern</td>
        <td>一个正则表达式</td>
        <td> <code>\d{4,6}</code> 形式的正则表达式，作为required校验规则</td>
    </tr>
<tr>
<td>autocomplete</td>
        <td>
        <code>on</code> , <code>off</code>
        </td>
        <td>同form的autocomplete属性，在表单元素上应用，优先级将高于form上指定的</td>
    </tr>
<tr>
<td>autofocus</td>
        <td>
        任意值 或 忽略该属性
        </td>
        <td>页面加载时，该元素自动聚焦，应用于多个表单元素时，聚焦到第一个</td>
    </tr>
<tr><td colspan="3"><strong>展示</strong></td></tr>
<tr>
<td>placeholder</td>
        <td>
        字符串
        </td>
        <td>在元素没有value时，用于占位显示</td>
    </tr>
<tr>
<td>value</td>
        <td>
        字符串 或 数值
        </td>
        <td>
          input 或 progress 展示的值,其中：
          * checkbox和radio的默认值是 'on'
          
          * range和progress的默认值是 0
          
          * progress的是0的时候会播放循环动画
          
          <a>示例代码</a>
        </td>
    </tr>
</tbody></table>
<p><strong>注意：以下示例部分来自 <a href="https://www.w3.org/TR/html5/forms.html#attr-input-multiple" rel="nofollow noreferrer" target="_blank">w3.org</a></strong></p>
<p><a></a><br>form示例</p>
<p>点击预览按钮，将会把 username1 的值提交到 /preview，<br>点击发布按钮，将会把 username 的值提交给 /publish</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<form action=&quot;/preview&quot; name='preview' id='preview'></form>

<form action=&quot;/publish&quot; name='publish' id='publish'>
  <input type=&quot;text&quot; name='username' value='1'>
  <input type=&quot;text&quot; form='preview' name='username1' value='2'>
  <button form='preview'>预览</button>
  <button>发布</button>
</form>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">action</span>=<span class="hljs-string">"/preview"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">'preview'</span> <span class="hljs-attr">id</span>=<span class="hljs-string">'preview'</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">action</span>=<span class="hljs-string">"/publish"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">'publish'</span> <span class="hljs-attr">id</span>=<span class="hljs-string">'publish'</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">'username'</span> <span class="hljs-attr">value</span>=<span class="hljs-string">'1'</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">form</span>=<span class="hljs-string">'preview'</span> <span class="hljs-attr">name</span>=<span class="hljs-string">'username1'</span> <span class="hljs-attr">value</span>=<span class="hljs-string">'2'</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">form</span>=<span class="hljs-string">'preview'</span>&gt;</span>预览<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>发布<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>
</code></pre>
<p><a></a><br>accept示例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input type=&quot;file&quot; accept=&quot;.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"file"</span> <span class="hljs-attr">accept</span>=<span class="hljs-string">".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"</span>&gt;</span></code></pre>
<p><a></a><br>multiple示例</p>
<p><code>datalist </code> 需要键入 ',' 方可多选(需浏览器支持)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<label>Cc: <input type=email multiple name=cc list=contacts></label>
<datalist id=&quot;contacts&quot;>
 <option value=&quot;hedral@damowmow.com&quot;>
 <option value=&quot;pillar@example.com&quot;>
 <option value=&quot;astrophy@cute.example&quot;>
 <option value=&quot;astronomy@science.example.org&quot;>
</datalist>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>Cc: <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">email</span> <span class="hljs-attr">multiple</span> <span class="hljs-attr">name</span>=<span class="hljs-string">cc</span> <span class="hljs-attr">list</span>=<span class="hljs-string">contacts</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">datalist</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"contacts"</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"hedral@damowmow.com"</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"pillar@example.com"</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"astrophy@cute.example"</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"astronomy@science.example.org"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">datalist</span>&gt;</span></code></pre>
<p><code>select</code> 需要一直按下ctrl键才可多选</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<select name='number' multiple>
  <option value=&quot;CN&quot;>中国</option>
  <option value=&quot;US&quot;>美国</option>
  <option value=&quot;UK&quot;>英国</option>
</select>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">select</span> <span class="hljs-attr">name</span>=<span class="hljs-string">'number'</span> <span class="hljs-attr">multiple</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"CN"</span>&gt;</span>中国<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"US"</span>&gt;</span>美国<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"UK"</span>&gt;</span>英国<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">select</span>&gt;</span></code></pre>
<p><code>input</code> 直接框选多文件即可</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input type=&quot;file&quot; multiple>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"file"</span> <span class="hljs-attr">multiple</span>&gt;</span></code></pre>
<p><a></a><br>value示例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<progress value='70' max='100'></progress>
<input type=&quot;range&quot; value='40' max='100'>
<input type=&quot;text&quot; value='hello world'>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">progress</span> <span class="hljs-attr">value</span>=<span class="hljs-string">'70'</span> <span class="hljs-attr">max</span>=<span class="hljs-string">'100'</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">progress</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"range"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">'40'</span> <span class="hljs-attr">max</span>=<span class="hljs-string">'100'</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">'hello world'</span>&gt;</span></code></pre>
<p><a></a></p>
<h3 id="articleHeader2">常识</h3>
<p>下面是对于上面表格的一些总结，也加入了一些新的知识点</p>
<ul>
<li><p>没有 <code>name</code> 和有 <code>disable</code> 的字段不会被提交</p></li>
<li><p>同一个表单中，相同name的字段值会发生覆盖，<code>radio</code> 和 <code>checkbox</code> 除外</p></li>
<li><p>在低版本浏览器中，name可以作为id使用</p></li>
<li><p>忽略或使用浏览器不支持的 <code>type</code> 会转为 <code>type=text</code></p></li>
<li><p>低版本浏览器不支持动态改变 <code>type</code></p></li>
<li><p>点击 <code>button</code> 会默认提交表单</p></li>
<li><p>低版本浏览器需要指定 <code>button</code> 的 <code>type=submit</code> 才会提交表单</p></li>
<li><p>文本域的光标颜色由字体颜色决定</p></li>
<li><p><strong>form表单不能互相嵌套</strong></p></li>
<li><p><strong>表单元素可以不在表单的html结构内</strong> <a>示例代码</a></p></li>
<li><p><strong>在表单最后一个input元素中敲回车，会触发表单提交</strong></p></li>
</ul>
<p><a></a></p>
<h3 id="articleHeader3">模拟外观</h3>
<p>有一千种浏览器，就有一千种表单元素外观。在以前，要想改变表单元素外观，需要通过其他标签来模拟。<br>而在现代浏览器上，通过css3的<code>appearance</code>属性( <a href="http://caniuse.com/#search=-webkit-appearance" rel="nofollow noreferrer" target="_blank">兼容情况</a> )指定元素的渲染风格，再结合<code>:after</code>,<code>:before</code>伪元素，可以做出很酷炫的表单元素外观。</p>
<p>作为可替换元素，input标签无法使用伪元素。当然这只是W3标准。以下点到名的表单元素，还是可以照常使用<code>:after</code>,<code>:before</code>的: <code>input type='radio'</code> , <code>input type='checkbox'</code> , <code>input type='file'</code> , <code>input type='range'</code> , <code>button</code> , <code>progress</code>。</p>
<p><code>appearance</code>是css3的标准属性，面对现实，很多时候还是需要加上<code>-webkit-</code> ，<code>-moz-</code> 前缀，举一个把checkbox做成开关的例子：不出意外，长成这样 <span class="img-wrap"><img data-src="/img/remote/1460000006767658" src="https://static.alili.tech/img/remote/1460000006767658" alt="checkbox" title="checkbox" style="cursor: pointer;"></span> ,<span class="img-wrap"><img data-src="/img/remote/1460000005803707" src="https://static.alili.tech/img/remote/1460000005803707" alt="checkbox" title="checkbox" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style>
    input[type='checkbox'] {
        -webkit-appearance: none;
        padding: 9px;
        border-radius: 50px;
        display: inline-block;
        position: relative;
        outline: 0;
        -webkit-transition: all 0.1s ease-in;
        transition: all 0.1s ease-in;
        width: 70px;
        height: 33px;
    }
    
    input[type='checkbox']:before,
    input[type='checkbox']:after {
        position: absolute;
        content: '';
        border-radius: 100px;
        -webkit-transition: all 0.1s ease-in;
        transition: all 0.1s ease-in;
    }
    
    input[type='checkbox']:before {
        background: white;
        top: 1px;
        left: 1px;
        z-index: 2;
        width: 31px;
        height: 31px;
        box-shadow: 0 3px 1px rgba(0, 0, 0, 0.05), 0 0px 1px rgba(0, 0, 0, 0.3);
    }
    
    input[type='checkbox']:after {
        content: 'OFF';
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        box-shadow: inset 0 0 0 0 #eee, 0 0 1px rgba(0, 0, 0, 0.4);
        line-height: 34px;
        font-size: 14px;
        background: #eee;
        color: #ccc;
        text-indent: 35px;
        box-sizing: border-box;
        box-shadow: 0 0 1px #eee;
    }
    
    input[type='checkbox']:checked:before {
        left: 37px;
    }
    
    input[type='checkbox']:checked:after {
        content: 'ON';
        color: #fff;
        text-indent: 10px;
        background: #4cda60;
    }
</style>
<input type=&quot;checkbox&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">input</span><span class="hljs-selector-attr">[type='checkbox']</span> {
        <span class="hljs-attribute">-webkit-appearance</span>: none;
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">9px</span>;
        <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50px</span>;
        <span class="hljs-attribute">display</span>: inline-block;
        <span class="hljs-attribute">position</span>: relative;
        <span class="hljs-attribute">outline</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">-webkit-transition</span>: all <span class="hljs-number">0.1s</span> ease-in;
        <span class="hljs-attribute">transition</span>: all <span class="hljs-number">0.1s</span> ease-in;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">70px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">33px</span>;
    }
    
    <span class="hljs-selector-tag">input</span><span class="hljs-selector-attr">[type='checkbox']</span><span class="hljs-selector-pseudo">:before</span>,
    <span class="hljs-selector-tag">input</span><span class="hljs-selector-attr">[type='checkbox']</span><span class="hljs-selector-pseudo">:after</span> {
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">content</span>: <span class="hljs-string">''</span>;
        <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">-webkit-transition</span>: all <span class="hljs-number">0.1s</span> ease-in;
        <span class="hljs-attribute">transition</span>: all <span class="hljs-number">0.1s</span> ease-in;
    }
    
    <span class="hljs-selector-tag">input</span><span class="hljs-selector-attr">[type='checkbox']</span><span class="hljs-selector-pseudo">:before</span> {
        <span class="hljs-attribute">background</span>: white;
        <span class="hljs-attribute">top</span>: <span class="hljs-number">1px</span>;
        <span class="hljs-attribute">left</span>: <span class="hljs-number">1px</span>;
        <span class="hljs-attribute">z-index</span>: <span class="hljs-number">2</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">31px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">31px</span>;
        <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">3px</span> <span class="hljs-number">1px</span> <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.05), <span class="hljs-number">0</span> <span class="hljs-number">0px</span> <span class="hljs-number">1px</span> <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.3);
    }
    
    <span class="hljs-selector-tag">input</span><span class="hljs-selector-attr">[type='checkbox']</span><span class="hljs-selector-pseudo">:after</span> {
        <span class="hljs-attribute">content</span>: <span class="hljs-string">'OFF'</span>;
        <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
        <span class="hljs-attribute">box-shadow</span>: inset <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">#eee</span>, <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">1px</span> <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.4);
        <span class="hljs-attribute">line-height</span>: <span class="hljs-number">34px</span>;
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">14px</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#eee</span>;
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#ccc</span>;
        <span class="hljs-attribute">text-indent</span>: <span class="hljs-number">35px</span>;
        <span class="hljs-attribute">box-sizing</span>: border-box;
        <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">1px</span> <span class="hljs-number">#eee</span>;
    }
    
    <span class="hljs-selector-tag">input</span><span class="hljs-selector-attr">[type='checkbox']</span><span class="hljs-selector-pseudo">:checked</span><span class="hljs-selector-pseudo">:before</span> {
        <span class="hljs-attribute">left</span>: <span class="hljs-number">37px</span>;
    }
    
    <span class="hljs-selector-tag">input</span><span class="hljs-selector-attr">[type='checkbox']</span><span class="hljs-selector-pseudo">:checked</span><span class="hljs-selector-pseudo">:after</span> {
        <span class="hljs-attribute">content</span>: <span class="hljs-string">'ON'</span>;
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
        <span class="hljs-attribute">text-indent</span>: <span class="hljs-number">10px</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#4cda60</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span>&gt;</span></code></pre>
<p><strong>示例代码来自</strong><a href="http://www.html5tricks.com/10-pretty-checkbox-radiobox.html" rel="nofollow noreferrer" target="_blank">10个HTML5美化版复选框和单选框</a></p>
<p><a></a></p>
<h4>参考资料</h4>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/form" rel="nofollow noreferrer" target="_blank">MDN</a></p>
<p><a href="https://www.w3.org/TR/html5/forms.html" rel="nofollow noreferrer" target="_blank">w3.org</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
form表单那点事儿(上) 基础篇

## 原文链接
[https://segmentfault.com/a/1190000005803696](https://segmentfault.com/a/1190000005803696)

