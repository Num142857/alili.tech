---
title: '了解HTML5中的MutationObserver' 
date: 2018-12-18 2:30:11
hidden: true
slug: laidwm0vxzr
categories: [reprint]
---

{{< raw >}}

                    
<p>MutationObserver翻译过来就是变动观察器，字面上就可以理解这是用来观察Node（节点）变化的。MutationObserver是在DOM4规范中定义的，它的前身是MutationEvent事件，该事件最初在DOM2事件规范中介绍，到来了DOM3事件规范中正式定义，但是由于该事件存在兼容性以及性能上的问题被弃用。</p>
<h3 id="articleHeader0">MutationEvent</h3>
<p>虽然MutationEvent已经被弃用，但是我们还是需要了解它，可能你会为了浏览器兼容性的问题而遇到它（万恶的浏览器兼容性）。</p>
<p>MutationEvent总共有7种事件：<strong>DOMNodeInserted</strong>、<strong>DOMNodeRemoved</strong>、<strong>DOMSubtreeModified</strong>、<strong>DOMAttrModified</strong>、<br><strong>DOMCharacterDataModified</strong>、<strong>DOMNodeInsertedIntoDocument</strong>和<strong>DOMNodeRemovedFromDocument</strong>。</p>
<p>MutationEvent的兼容性：</p>
<ol>
<li>MutationEvent在IE浏览器中最低支持到IE9</li>
<li>在webkit内核的浏览器中，不支持<strong>DOMAttrModified</strong>事件</li>
<li>IE，Edge以及Firefox浏览器下不支持<strong>DOMNodeInsertedIntoDocument</strong>和<strong>DOMNodeRemovedFromDocument</strong>事件</li>
</ol>
<p>MutationEvent中的所有事件都被设计成无法取消，如果可以取消MutationEvent事件则会导致现有的DOM接口无法对文档进行改变，比如appendChild，remove等添加和删除节点的DOM操作。<br>MutationEvent中最令人诟病的就是性能以及安全性的问题，比如下面这个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.addEventListener('DOMNodeInserted', function() {
    var newEl = document.createElement('div');
    document.body.appendChild(newEl);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code>document.addEventListener(<span class="hljs-string">'DOMNodeInserted'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span></span>() {
    <span class="hljs-keyword">var</span> <span class="hljs-keyword">new</span><span class="hljs-type">El</span> = document.createElement(<span class="hljs-string">'div'</span>);
    document.body.appendChild(<span class="hljs-keyword">new</span><span class="hljs-type">El</span>);
});</code></pre>
<p>document下的所有DOM添加操作都会触发DOMNodeInserted方法，这时就会出现循环调用DOMNodeInserted方法，导致浏览器崩溃。还有就是MutationEvent是事件机制，因此会有一般事件都存在的捕获和冒泡阶段，此时如果在捕获和冒泡阶段又对DOM进行了操作会拖慢浏览器的运行。</p>
<p>另一点就是MutationEvent事件机制是同步的，也就是说每次DOM修改就会触发，修改几次就触发几次,严重降低浏览器的运行，严重时甚至导致线程崩溃</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id='block'></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">id</span>='block'&gt;&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var i=0;
block.addEventListener('DOMNodeInserted', function(e) {
     i++                                  
});
block.appendChild(docuemnt.createTextNode('1'));
console.log(i)                  //1
block.appendChild(docuemnt.createTextNode('2'));
console.log(i)                  //2
block.appendChild(docuemnt.createTextNode('3'));
console.log(i)                  //3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs oxygene"><code><span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>;
<span class="hljs-keyword">block</span>.addEventListener(<span class="hljs-string">'DOMNodeInserted'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(e)</span> <span class="hljs-comment">{
     i++                                  
}</span>);</span>
<span class="hljs-keyword">block</span>.appendChild(docuemnt.createTextNode(<span class="hljs-string">'1'</span>));
console.log(i)                  <span class="hljs-comment">//1</span>
<span class="hljs-keyword">block</span>.appendChild(docuemnt.createTextNode(<span class="hljs-string">'2'</span>));
console.log(i)                  <span class="hljs-comment">//2</span>
<span class="hljs-keyword">block</span>.appendChild(docuemnt.createTextNode(<span class="hljs-string">'3'</span>));
console.log(i)                  <span class="hljs-comment">//3</span></code></pre>
<p>再看个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id='block'>
  <span id='span'>Text</span>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">'block'</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">id</span>=<span class="hljs-string">'span'</span>&gt;</span>Text<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="block.addEventListener('DOMNodeInserted', function(e) {
     console.log('1');                                  //1
});
span.appendChild(docuemnt.createTextNode('other Text'));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>block.addEventListener(<span class="hljs-string">'DOMNodeInserted'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
     <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'1'</span>);                                  <span class="hljs-comment">//1</span>
});
span.appendChild(docuemnt.createTextNode(<span class="hljs-string">'other Text'</span>));</code></pre>
<p>span元素中添加节点会触发block中的DOMNodeInserted事件，可是你只想观察block的变化，不想观察block中子节点的变化，这时你不得不在DOMNodeInserted事件中进行过滤，把对span的操作忽略掉，这无疑增加了操作的复杂性。</p>
<h3 id="articleHeader1">MutationObserver</h3>
<p>MutationObserver的出现就是为了解决MutationEvent带来的问题。<br>先看一下MutationObserver的浏览器兼容性：</p>
<p><span class="img-wrap"><img data-src="/img/bV1NUJ?w=1257&amp;h=325" src="https://static.alili.tech/img/bV1NUJ?w=1257&amp;h=325" alt="MutationObserver浏览器兼容性" title="MutationObserver浏览器兼容性" style="cursor: pointer; display: inline;"></span></p>
<p>我们可以看到MutationObserver在IE中最低要就是IE11，如果你的网站不需要支持IE或者只支持到IE11，那么你可以放心的使用MutationObserver，否则你可能需要用到上面提到的MutationEvent事件，当然如果你的网站还要支持IE8及以下版本，那么你只能和Mutation说拜拜了。</p>
<p>MutationObserver是一个构造器，接受一个callback参数，用来处理节点变化的回调函数，返回两个参数，mutations：节点变化记录列表（sequence&lt;MutationRecord&gt;），observer：构造MutationObserver对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var observe = new MutationObserver(function(mutations,observer){
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> observe = <span class="hljs-keyword">new</span> MutationObserver(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(mutations,observer)</span></span>{
})</code></pre>
<p>MutationObserver对象有三个方法，分别如下：</p>
<ol>
<li>
<strong>observe</strong>：设置观察目标，接受两个参数，target：观察目标，options：通过对象成员来设置观察选项</li>
<li>
<strong>disconnect</strong>：阻止观察者观察任何改变</li>
<li>
<strong>takeRecords</strong>：清空记录队列并返回里面的内容</li>
</ol>
<p>关于observe方法中options参数有已下几个选项：</p>
<ol>
<li>
<strong>childList</strong>：设置true，表示观察目标子节点的变化，比如添加或者删除目标子节点，不包括修改子节点以及子节点后代的变化</li>
<li>
<strong>attributes</strong>：设置true，表示观察目标属性的改变</li>
<li>
<strong>characterData</strong>：设置true，表示观察目标数据的改变</li>
<li>
<strong>subtree</strong>：设置为true，目标以及目标的后代改变都会观察</li>
<li>
<strong>attributeOldValue</strong>：如果属性为true或者省略，则相当于设置为true，表示需要记录改变前的目标属性值，设置了attributeOldValue可以省略attributes设置</li>
<li>
<strong>characterDataOldValue</strong>：如果characterData为true或省略，则相当于设置为true,表示需要记录改变之前的目标数据，设置了characterDataOldValue可以省略characterData设置</li>
<li>
<strong>attributeFilter</strong>：如果不是所有的属性改变都需要被观察，并且attributes设置为true或者被忽略，那么设置一个需要观察的属性本地名称（不需要命名空间）的列表</li>
</ol>
<p>下表描述了MutationObserver选项与MutationEvent名称之间的对应关系：</p>
<table>
<thead><tr>
<th>MutationEvent</th>
<th>MutationObserver options</th>
</tr></thead>
<tbody>
<tr>
<td>DOMNodeInserted</td>
<td>{ childList: true, subtree: true }</td>
</tr>
<tr>
<td>DOMNodeRemoved</td>
<td>{ childList: true, subtree: true }</td>
</tr>
<tr>
<td>DOMSubtreeModified</td>
<td>{ childList: true, subtree: true }</td>
</tr>
<tr>
<td>DOMAttrModified</td>
<td>{ attributes: true, subtree: true }</td>
</tr>
<tr>
<td>DOMCharacterDataModified</td>
<td>{ characterData: true, subtree: true }</td>
</tr>
</tbody>
</table>
<p>从上表我们也可以看出相比与MutationEvent而言MutationObserver极大地增加了灵活性，可以设置各种各样的选项来满足程序员对目标的观察。</p>
<p>我们简单看几个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id='target' class='block' name='target'>
    target的第一个子节点
    <p>
       <span>target的后代</span>
    </p>
</div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">'target'</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'block'</span> <span class="hljs-attr">name</span>=<span class="hljs-string">'target'</span>&gt;</span>
    target的第一个子节点
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>target的后代<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>1.callback的回调次数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var target=document.getElementById('target');
var i=0
var observe=new MutationObserver(function (mutations,observe) {
    i++   
});
observe.observe(target,{ childList: true});
target.appendChild(docuemnt.createTextNode('1'));
target.appendChild(docuemnt.createTextNode('2'));
target.appendChild(docuemnt.createTextNode('3'));
console.log(i)                //1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> target=<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'target'</span>);
<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>
<span class="hljs-keyword">var</span> observe=<span class="hljs-keyword">new</span> MutationObserver(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">mutations,observe</span>) </span>{
    i++   
});
observe.observe(target,{ <span class="hljs-attr">childList</span>: <span class="hljs-literal">true</span>});
target.appendChild(docuemnt.createTextNode(<span class="hljs-string">'1'</span>));
target.appendChild(docuemnt.createTextNode(<span class="hljs-string">'2'</span>));
target.appendChild(docuemnt.createTextNode(<span class="hljs-string">'3'</span>));
<span class="hljs-built_in">console</span>.log(i)                <span class="hljs-comment">//1</span></code></pre>
<p>MutationObserver的callback回调函数是异步的，只有在全部DOM操作完成之后才会调用callback。</p>
<p>2.当只设置{ childList: true}时,表示观察目标子节点的变化</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var observe=new MutationObserver(function (mutations,observe) {
    debugger;
    console.log(mutations);
    //observe.discount();     
});

observe.observe(target,{ childList: true});
target.appendChild(document.createTextNode('新增Text节点'));   //增加节点，观察到变化
target.childNodes[0].remove();                                //删除节点，可以观察到
target.childNodes[0].textContent='改变子节点的后代';             //不会观察到" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> observe=<span class="hljs-keyword">new</span> MutationObserver(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">mutations,observe</span>) </span>{
    <span class="hljs-keyword">debugger</span>;
    <span class="hljs-built_in">console</span>.log(mutations);
    <span class="hljs-comment">//observe.discount();     </span>
});

observe.observe(target,{ <span class="hljs-attr">childList</span>: <span class="hljs-literal">true</span>});
target.appendChild(<span class="hljs-built_in">document</span>.createTextNode(<span class="hljs-string">'新增Text节点'</span>));   <span class="hljs-comment">//增加节点，观察到变化</span>
target.childNodes[<span class="hljs-number">0</span>].remove();                                <span class="hljs-comment">//删除节点，可以观察到</span>
target.childNodes[<span class="hljs-number">0</span>].textContent=<span class="hljs-string">'改变子节点的后代'</span>;             <span class="hljs-comment">//不会观察到</span></code></pre>
<p>如果想要观察到子节点以及后代的变化需设置{childList: true, subtree: true}</p>
<p>attributes选项用来观察目标属性的变化，用法类似与childList,目标属性的删除添加以及修改都会被观察到。</p>
<p>3.我们需要注意的是characterData这个选项，它是用来观察CharacterData类型的节点的，只有在改变节点数据时才会观察到，如果你删除或者增加节点都不会进行观察，还有如果对不是CharacterData类型的节点的改变不会观察到，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="observe.observe(target,{ characterData: true, subtree: true});
target.childNodes[0].textContent='改变Text节点';              //观察到
target.childNodes[1].textContent='改变p元素内容';              //不会观察到
target.appendChild(document.createTextNode('新增Text节点'));  //不会观察到
target.childNodes[0].remove();                               //删除TEXT节点也不会观察到" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs aspectj"><code>observe.observe(<span class="hljs-keyword">target</span>,{ characterData: <span class="hljs-keyword">true</span>, subtree: <span class="hljs-keyword">true</span>});
<span class="hljs-keyword">target</span>.childNodes[<span class="hljs-number">0</span>].textContent=<span class="hljs-string">'改变Text节点'</span>;              <span class="hljs-comment">//观察到</span>
<span class="hljs-keyword">target</span>.childNodes[<span class="hljs-number">1</span>].textContent=<span class="hljs-string">'改变p元素内容'</span>;              <span class="hljs-comment">//不会观察到</span>
<span class="hljs-keyword">target</span>.appendChild(document.createTextNode(<span class="hljs-string">'新增Text节点'</span>));  <span class="hljs-comment">//不会观察到</span>
<span class="hljs-keyword">target</span>.childNodes[<span class="hljs-number">0</span>].remove();                               <span class="hljs-comment">//删除TEXT节点也不会观察到</span></code></pre>
<p>我们只需要记住只有对CharacterData类型的节点的数据改变才会被characterData为true的选项所观察到。</p>
<p>4.最后关注一个特别有用的选项attributeFilter，这个选项主要是用来筛选要观察的属性，比如你只想观察目标style属性的变化，这时可以如下设置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="observe.observe(target,{ attributeFilter: ['style'], subtree: true});
target.style='color:red';                      //可以观察到
target.removeAttribute('name');                //删除name属性，无法观察到 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>observe.observe(target,{ <span class="hljs-string">attributeFilter:</span> [<span class="hljs-string">'style'</span>], <span class="hljs-string">subtree:</span> <span class="hljs-literal">true</span>});
target.style=<span class="hljs-string">'color:red'</span>;                      <span class="hljs-comment">//可以观察到</span>
target.removeAttribute(<span class="hljs-string">'name'</span>);                <span class="hljs-comment">//删除name属性，无法观察到 </span></code></pre>
<p>disconnect方法是用来阻止观察的，当你不再想观察目标节点的变化时可以调用observe.disconnect()方法来取消观察。</p>
<p>takeRecords方法是用来取出记录队列中的记录。它的一个作用是，比如你对一个节点的操作你不想马上就做出反应，过段时间在显示改变了节点的内容。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var observe=new MutationObserver(function(){});
observe.observe(target,{ childList: true});
target.appendChild(document.createTextNode('新增Text节点'));
var record = observe.takeRecords();              //此时record保存了改变记录列表  
//当调用takeRecords方法时，记录队列被清空因此不会触发MutationObserver中的callback回调方法。
target.appendChild(document.createElement('span'));
observe.disconnect();                            //停止对target的观察。
//MutationObserver中的回调函数只有一个记录，只记录了新增span元素

//之后可以对record进行操作
//..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> observe=<span class="hljs-keyword">new</span> MutationObserver(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{});
observe.observe(target,{ <span class="hljs-attr">childList</span>: <span class="hljs-literal">true</span>});
target.appendChild(<span class="hljs-built_in">document</span>.createTextNode(<span class="hljs-string">'新增Text节点'</span>));
<span class="hljs-keyword">var</span> record = observe.takeRecords();              <span class="hljs-comment">//此时record保存了改变记录列表  </span>
<span class="hljs-comment">//当调用takeRecords方法时，记录队列被清空因此不会触发MutationObserver中的callback回调方法。</span>
target.appendChild(<span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'span'</span>));
observe.disconnect();                            <span class="hljs-comment">//停止对target的观察。</span>
<span class="hljs-comment">//MutationObserver中的回调函数只有一个记录，只记录了新增span元素</span>

<span class="hljs-comment">//之后可以对record进行操作</span>
<span class="hljs-comment">//...</span></code></pre>
<p><strong>MutationRecord</strong><br>变动记录中的属性如下：</p>
<ol>
<li>
<strong>type</strong>：如果是属性变化，返回"attributes"，如果是一个CharacterData节点（Text节点、Comment节点）变化，返回"characterData"，节点树变化返回"childList"</li>
<li>
<strong>target</strong>：返回影响改变的节点</li>
<li>
<strong>addedNodes</strong>：返回添加的节点列表</li>
<li>
<strong>removedNodes</strong>：返回删除的节点列表</li>
<li>
<strong>previousSibling</strong>：返回分别添加或删除的节点的上一个兄弟节点，否则返回null</li>
<li>
<strong>nextSibling</strong>：返回分别添加或删除的节点的下一个兄弟节点，否则返回null</li>
<li>
<strong>attributeName</strong>：返回已更改属性的本地名称，否则返回null</li>
<li>
<strong>attributeNamespace</strong>：返回已更改属性的名称空间，否则返回null</li>
<li>
<strong>oldValue</strong>：返回值取决于type。对于"attributes"，它是更改之前的属性的值。对于"characterData"，它是改变之前节点的数据。对于"childList"，它是null</li>
</ol>
<p>其中 <strong>type</strong>、<strong>target</strong>这两个属性不管是哪种观察方式都会有返回值，其他属性返回值与观察方式有关，比如只有当attributeOldValue或者characterDataOldValue为true时oldValue才有返回值，只有改变属性时，attributeName才有返回值等。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
了解HTML5中的MutationObserver

## 原文链接
[https://segmentfault.com/a/1190000012787829](https://segmentfault.com/a/1190000012787829)

