---
title: 'js监听input输入框值的实时变化' 
date: 2019-01-29 2:30:10
hidden: true
slug: udt573c7g6
categories: [reprint]
---

{{< raw >}}

                    
<p>*注：（1）&amp;（2）为其他文章的说明~</p>
<p>1、在元素上同时绑定 oninput 和onporpertychanger事件<br>例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/JavaScript&quot;>
function aa(e){alert(&quot;inputting!!&quot;);}
</script>

<input type=&quot;text&quot; id=&quot;a&quot; oninput=&quot;aa(event)&quot; onporpertychange=&quot;aa(event)&quot; />
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/JavaScript"</span>&gt;</span><span class="actionscript">
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">aa</span><span class="hljs-params">(e)</span></span>{alert(<span class="hljs-string">"inputting!!"</span>);}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"a"</span> <span class="hljs-attr">oninput</span>=<span class="hljs-string">"aa(event)"</span> <span class="hljs-attr">onporpertychange</span>=<span class="hljs-string">"aa(event)"</span> /&gt;</span>
</code></pre>
<p>2、使用原生js添加监听事件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/javascript&quot;>
 $(function(){
if(&quot;\v&quot;==&quot;v&quot;){//true为IE浏览器，感兴趣的同学可以去搜下，据说是现有最流行的判断浏览器的方法
document.getElementById(&quot;a&quot;).attachEvent(&quot;onporpertychange&quot;,function(e){
console.log(&quot;inputting!!&quot;);
}
}else{
document.getElementById(&quot;a&quot;).addEventListener(&quot;onporpertychange&quot;,function(e){
console.log(&quot;inputting!!&quot;);
}
}
});
</script>
<input type=&quot;text&quot; id=&quot;a&quot;/>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
 $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
<span class="hljs-keyword">if</span>(<span class="hljs-string">"\v"</span>==<span class="hljs-string">"v"</span>){<span class="hljs-comment">//true为IE浏览器，感兴趣的同学可以去搜下，据说是现有最流行的判断浏览器的方法</span>
<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"a"</span>).attachEvent(<span class="hljs-string">"onporpertychange"</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"inputting!!"</span>);
}
}<span class="hljs-keyword">else</span>{
<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"a"</span>).addEventListener(<span class="hljs-string">"onporpertychange"</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"inputting!!"</span>);
}
}
});
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"a"</span>/&gt;</span>
</code></pre>
<p>3、使用jQuery方法绑定事件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/javascript&quot;>
 $(function(){
$(&quot;#a&quot;).bind('input porpertychange',function(){
console.log(&quot;e&quot;);
});
});
</script>
<input type=&quot;text&quot; id=&quot;a&quot;/>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
 $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
$(<span class="hljs-string">"#a"</span>).bind(<span class="hljs-string">'input porpertychange'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"e"</span>);
});
});
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"a"</span>/&gt;</span>
</code></pre>
<p>在监听到 onpropertychange 事件后，可以使用 event 的 propertyName 属性来获取发生变化的属性名称，event.propertyName</p>
<p>实例1：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <input type=&quot;text&quot; oninput=&quot; &quot; onpropertychange=&quot;&quot;  value=&quot;Text field&quot; />
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs excel"><code> &lt;input <span class="hljs-built_in">type</span>=<span class="hljs-string">"text"</span> oninput=<span class="hljs-string">" "</span> onpropertychange=<span class="hljs-string">""</span>  <span class="hljs-built_in">value</span>=<span class="hljs-string">"Text field"</span> /&gt;
</code></pre>
<p>实例2：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="

$(&quot;#name&quot;).bind('input porpertychange',function(){
        var thisTxt=$(&quot;#name&quot;).val();
        $(this).siblings(&quot;p&quot;).html(thisTxt)
    })
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs http"><code>

<span class="javascript">$(<span class="hljs-string">"#name"</span>).bind(<span class="hljs-string">'input porpertychange'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">var</span> thisTxt=$(<span class="hljs-string">"#name"</span>).val();
        $(<span class="hljs-keyword">this</span>).siblings(<span class="hljs-string">"p"</span>).html(thisTxt)
    })
</span></code></pre>
<p>实例3：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//手机号码分段显示
register.phonePropertychange = function() {
    _this = register;
    _input = $(this);
    var v = $(this).val();
    v = v.replace(new RegExp(/ /g),'');
    var v1 = v.slice(0,3);
    var v2 = v.slice(3,7);
    var v3 = v.slice(7,11);
    if(v2==''){
        _input.focus().val(v1);
    }else if(v3==''){
        _input.focus().val(v1+' '+v2);
    }else{
        _input.focus().val(v1+' '+v2+ ' '+v3);
    };
 
    //手机号输入完成字体颜色改变
    if (v.length === 11) {
        if(_this.regexpPhone(v)){
            _input.css('color','#000');
            $('#btnSendCode').addClass('c-26a949');
            _input.blur();;
        }else{
            layer.open({content: '手机号码不正确，请重新输入',time: 2, end:function(){
                _input.val('');
            "}}");
        }
    }else{
        _input.css('color','#26a949');
    }
}

//验证手机号
register.regexpPhone = function(phone){
    return /^1[3|4|5|7|8]\d{9}$/.test(phone);
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//手机号码分段显示</span>
register.phonePropertychange = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    _this = register;
    _input = $(<span class="hljs-keyword">this</span>);
    <span class="hljs-keyword">var</span> v = $(<span class="hljs-keyword">this</span>).val();
    v = v.replace(<span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(<span class="hljs-regexp">/ /g</span>),<span class="hljs-string">''</span>);
    <span class="hljs-keyword">var</span> v1 = v.slice(<span class="hljs-number">0</span>,<span class="hljs-number">3</span>);
    <span class="hljs-keyword">var</span> v2 = v.slice(<span class="hljs-number">3</span>,<span class="hljs-number">7</span>);
    <span class="hljs-keyword">var</span> v3 = v.slice(<span class="hljs-number">7</span>,<span class="hljs-number">11</span>);
    <span class="hljs-keyword">if</span>(v2==<span class="hljs-string">''</span>){
        _input.focus().val(v1);
    }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(v3==<span class="hljs-string">''</span>){
        _input.focus().val(v1+<span class="hljs-string">' '</span>+v2);
    }<span class="hljs-keyword">else</span>{
        _input.focus().val(v1+<span class="hljs-string">' '</span>+v2+ <span class="hljs-string">' '</span>+v3);
    };
 
    <span class="hljs-comment">//手机号输入完成字体颜色改变</span>
    <span class="hljs-keyword">if</span> (v.length === <span class="hljs-number">11</span>) {
        <span class="hljs-keyword">if</span>(_this.regexpPhone(v)){
            _input.css(<span class="hljs-string">'color'</span>,<span class="hljs-string">'#000'</span>);
            $(<span class="hljs-string">'#btnSendCode'</span>).addClass(<span class="hljs-string">'c-26a949'</span>);
            _input.blur();;
        }<span class="hljs-keyword">else</span>{
            layer.open({<span class="hljs-attr">content</span>: <span class="hljs-string">'手机号码不正确，请重新输入'</span>,<span class="hljs-attr">time</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">end</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                _input.val(<span class="hljs-string">''</span>);
            "}}");
        }
    }<span class="hljs-keyword">else</span>{
        _input.css(<span class="hljs-string">'color'</span>,<span class="hljs-string">'#26a949'</span>);
    }
}

<span class="hljs-comment">//验证手机号</span>
register.regexpPhone = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">phone</span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-regexp">/^1[3|4|5|7|8]\d{9}$/</span>.test(phone);
}
</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
js监听input输入框值的实时变化

## 原文链接
[https://segmentfault.com/a/1190000007888424](https://segmentfault.com/a/1190000007888424)

