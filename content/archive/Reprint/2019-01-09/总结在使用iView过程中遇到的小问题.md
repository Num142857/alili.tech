---
title: '总结在使用iView过程中遇到的小问题' 
date: 2019-01-09 2:30:12
hidden: true
slug: 6ysxh3o3due
categories: [reprint]
---

{{< raw >}}

                    
<p>最近使用iView作为vue的开发UI框架，使用了一些组件。这里需要总结一下：</p>
<ol>
<li>首先，放出iView的地址：<a href="https://www.iviewui.com" rel="nofollow noreferrer" target="_blank"></a><a href="https://www.iviewui.com" rel="nofollow noreferrer" target="_blank">https://www.iviewui.com</a>
</li>
<li>其次，iView的<a href="https://github.com/iview/iview" rel="nofollow noreferrer" target="_blank">Github</a>
</li>
<li>值得欣慰的是，segmentfault上也有<a href="https://segmentfault.com/t/iview">iView的标签</a>了，不过似乎不是很活跃呢[手动笑哭脸]。</li>
</ol>
<h2 id="articleHeader0">一：如何为带有返回值的默认函数传参</h2>
<p>在开发中遇到过一个问题，就是如果一个页面上使用了多次组件，每个组件有自己的事件，每个事件又有自己默认的返回值，那么就要在一个页面上连着写好多遍类似的方法？如下图：<br><span class="img-wrap"><img data-src="/img/bVQCYN?w=612&amp;h=271" src="https://static.alili.tech/img/bVQCYN?w=612&amp;h=271" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>这里使用的是Select 选择器。开发需求很简单，获取用户选择的值，然后同步到提前声明好的data中，如何获取值，这里的Select组件，已经帮我们搞定了，绑定一个方法，这个方法有默认值：<code>@on-change</code>返回值就是当前选中的值。<br>接上面的示例图这里有三个下拉选择，那么就有三个data，如下是相关实现的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//值
device:{
    type: 'all',
    snmpVersion: 'all',
    snmpPort: 'all'
}
//获取并分别赋值
selectDevice(v) {       //切换设备类型
    this.device.type = v.value
},
selectSMNP(v) {         //切换smnp
    this.device.snmpVersionView = v.value
},
selectPort(v) {         //切换端口
    this.device.snmpPort = v.value
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">//值</span>
device:{
    type: <span class="hljs-string">'all'</span>,
    snmpVersion: <span class="hljs-string">'all'</span>,
    snmpPort: <span class="hljs-string">'all'</span>
}
<span class="hljs-comment">//获取并分别赋值</span>
<span class="hljs-function"><span class="hljs-title">selectDevice</span><span class="hljs-params">(v)</span></span> {       <span class="hljs-comment">//切换设备类型</span>
    this<span class="hljs-selector-class">.device</span><span class="hljs-selector-class">.type</span> = v<span class="hljs-selector-class">.value</span>
},
<span class="hljs-function"><span class="hljs-title">selectSMNP</span><span class="hljs-params">(v)</span></span> {         <span class="hljs-comment">//切换smnp</span>
    this<span class="hljs-selector-class">.device</span><span class="hljs-selector-class">.snmpVersionView</span> = v<span class="hljs-selector-class">.value</span>
},
<span class="hljs-function"><span class="hljs-title">selectPort</span><span class="hljs-params">(v)</span></span> {         <span class="hljs-comment">//切换端口</span>
    this<span class="hljs-selector-class">.device</span><span class="hljs-selector-class">.snmpPort</span> = v<span class="hljs-selector-class">.value</span>
},</code></pre>
<p>好了，似乎实现了呢，简单却不简洁。好在这里只有三个下拉选择，并且没有什么特殊的情况，那么如果这里有十多个呢？并且每个下拉选都要处理？我们继续复制十多遍，再改十多遍的字段名？NONONO...</p>
<p>通过观察发现这些功能完全一样，就是赋值不同，还要写这么多方法？那么我们是不是可以加个<code>type</code>？通过这个<code>type</code>来判断下？<br>思路有了，开始尝试！在看了iView的文档后，没有找到类似这样的具有默认值的方法如何传第二个参数...似乎进了死胡同？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="但是，我们可以换种方式啊！
既然你的默认函数不能传参，那我是不是可以声明一个带有参数的函数啊！并且把你默认的函数当做参数传递啊！
好了，想到就做，尝试！   " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>但是，我们可以换种方式啊！
既然你的默认函数不能传参，那我是不是可以声明一个带有参数的函数啊！并且把你默认的函数当做参数传递啊！
好了，想到就做，尝试！   </code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Select v-model=&quot;device.type&quot; :label-in-value=&quot;true&quot; @on-change=&quot;v=>{ setOption(v,'type')}&quot;>
    <Option v-for=&quot;item in deviceTypeList&quot; :value=&quot;item.value&quot; :key=&quot;item&quot;>"{{" item.label "}}"</Option>
</Select>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vbscript"><code>&lt;<span class="hljs-keyword">Select</span> v-model=<span class="hljs-string">"device.type"</span> :label-<span class="hljs-keyword">in</span>-value=<span class="hljs-string">"true"</span> @<span class="hljs-keyword">on</span>-change=<span class="hljs-string">"v=&gt;{ setOption(v,'type')}"</span>&gt;
    &lt;<span class="hljs-keyword">Option</span> v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"item in deviceTypeList"</span> :value=<span class="hljs-string">"item.value"</span> :key=<span class="hljs-string">"item"</span>&gt;"{{" item.label "}}"&lt;/<span class="hljs-keyword">Option</span>&gt;
&lt;/<span class="hljs-keyword">Select</span>&gt;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="我们在默认的函数内放一个匿名函数，这个函数执行一个我们定义好的`methods`传2个参数，一个是默认函数的参数，也就是获取点击选择的那个值，另一个函数就是我们需要用来判断的参数。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autohotkey"><code style="word-break: break-word; white-space: initial;">我们在默认的函数内放一个匿名函数，这个函数执行一个我们定义好的`methods`传<span class="hljs-number">2</span>个参数，一个是默认函数的参数，也就是获取点击选择的那个值，另一个函数就是我们需要用来判断的参数。</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//setOption
setOption(value,type){
    console.log(value);
    console.log(type);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code>//setOption
setOption(<span class="hljs-keyword">value</span>,<span class="hljs-keyword">type</span>){
    console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">value</span>);
    console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">type</span>);
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVQC46?w=453&amp;h=115" src="https://static.alili.tech/img/bVQC46?w=453&amp;h=115" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="成功！这样我就写一个方法，然后通过判断就可以了，这样不管你以后来多少下拉选我也微微一笑，绝对不抽。
最近换了工作，更忙了，因此没时间来更新，看到评论区有的小伙伴在这个方法下遇到了问题，我自己特意试了一下，发现在collapse组件下也是可以用的，现在贴一下我自己的测试代码:
//这里是从官网复制的例子，请注意`@on-change=&quot;&quot;`中的事件，写法和select是一样的
<Collapse v-model=&quot;value1&quot; accordion @on-change=&quot;v=>{onCollapse(v,'test')}&quot;>
    <Panel name=&quot;1&quot;>
        史蒂夫·乔布斯
        <p slot=&quot;content&quot;>史蒂夫·乔布斯（Steve Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。</p>
    </Panel>
    <Panel name=&quot;2&quot;>
        斯蒂夫·盖瑞·沃兹尼亚克
        <p slot=&quot;content&quot;>斯蒂夫·盖瑞·沃兹尼亚克（Stephen Gary Wozniak），美国电脑工程师，曾与史蒂夫·乔布斯合伙创立苹果电脑（今之苹果公司）。斯蒂夫·盖瑞·沃兹尼亚克曾就读于美国科罗拉多大学，后转学入美国著名高等学府加州大学伯克利分校（UC Berkeley）并获得电机工程及计算机（EECS）本科学位（1987年）。</p>
    </Panel>
    <Panel name=&quot;3&quot;>
        乔纳森·伊夫
        <p slot=&quot;content&quot;>乔纳森·伊夫是一位工业设计师，现任Apple公司设计师兼资深副总裁，英国爵士。他曾参与设计了iPod，iMac，iPhone，iPad等众多苹果产品。除了乔布斯，他是对苹果那些著名的产品最有影响力的人。</p>
    </Panel>
</Collapse>
//这里是collapse默认的方法中传入的函数
methods:{
    onCollapse(data,type){
        console.log(data);
        console.log(type);
    }
}
![图片描述][6]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>成功！这样我就写一个方法，然后通过判断就可以了，这样不管你以后来多少下拉选我也微微一笑，绝对不抽。
最近换了工作，更忙了，因此没时间来更新，看到评论区有的小伙伴在这个方法下遇到了问题，我自己特意试了一下，发现在collapse组件下也是可以用的，现在贴一下我自己的测试代码:
//这里是从官网复制的例子，请注意`@on-change=""`中的事件，写法和select是一样的
<span class="hljs-tag">&lt;<span class="hljs-name">Collapse</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"value1"</span> <span class="hljs-attr">accordion</span> @<span class="hljs-attr">on-change</span>=<span class="hljs-string">"v=&gt;{onCollapse(v,'test')}"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Panel</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"1"</span>&gt;</span>
        史蒂夫·乔布斯
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"content"</span>&gt;</span>史蒂夫·乔布斯（Steve Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">Panel</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Panel</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"2"</span>&gt;</span>
        斯蒂夫·盖瑞·沃兹尼亚克
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"content"</span>&gt;</span>斯蒂夫·盖瑞·沃兹尼亚克（Stephen Gary Wozniak），美国电脑工程师，曾与史蒂夫·乔布斯合伙创立苹果电脑（今之苹果公司）。斯蒂夫·盖瑞·沃兹尼亚克曾就读于美国科罗拉多大学，后转学入美国著名高等学府加州大学伯克利分校（UC Berkeley）并获得电机工程及计算机（EECS）本科学位（1987年）。<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">Panel</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Panel</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"3"</span>&gt;</span>
        乔纳森·伊夫
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"content"</span>&gt;</span>乔纳森·伊夫是一位工业设计师，现任Apple公司设计师兼资深副总裁，英国爵士。他曾参与设计了iPod，iMac，iPhone，iPad等众多苹果产品。除了乔布斯，他是对苹果那些著名的产品最有影响力的人。<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">Panel</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">Collapse</span>&gt;</span>
//这里是collapse默认的方法中传入的函数
methods:{
    onCollapse(data,type){
        console.log(data);
        console.log(type);
    }
}
![图片描述][6]</code></pre>
<h2 id="articleHeader1">二：Tabel组件中的字段渲染</h2>
<p>时隔几天，勤劳的楼主又来了，这次记录下最近遇到的Tabel组件中某些字段渲染的坑吧。<br>iView的Tabel组件中经过了一次改版，改版的内容主要是体现在渲染<code>render</code>这个方法，下面复制一段关于新版该方法的描述：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="render 函数传入两个参数，第一个是 h，第二个是对象，包含 row、column 和 index，分别指当前单元格数据，当前列数据，当前是第几行。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs excel"><code>render 函数传入两个参数，第一个是 h，第二个是对象，包含 <span class="hljs-built_in">row</span>、<span class="hljs-built_in">column</span> 和 <span class="hljs-built_in">index</span>，分别指当前单元格数据，当前列数据，当前是第几行。
</code></pre>
<p>下面是楼主在开发中使用的一个小栗子：<br><span class="img-wrap"><img data-src="/img/bVRlWr?w=729&amp;h=143" src="https://static.alili.tech/img/bVRlWr?w=729&amp;h=143" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>如图：数据下载字段里的内容就是需要渲染的特殊样式，包含了<code>className</code>，<code>style</code>，<code>href</code>以及点击事件。当然了实际中是不会出现这么多内容的，这个栗子只是把这些需求堆在一起方便说明。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//以下是代码部分
{
    title: '数据下载',
    key: 'download',
    align: 'center',
    width:100,
    render:(fc,obj)=>{
    //新版本中render的参数改了，不再是之前的三个参数，变成了2个，其中fc是一个需要返回的渲染对象，obj就是旧版本的row字段，index字段也在其中。
    //其中第二个字段可以传入一个array达到在一个字段中渲染多个标签的需求。
        return fc('a',{
        //fs这个函数在本例中接收了三个参数 'a'是渲染内容外面包裹的标签名、比如'div','span'
        //第二个参数是一个对象，内容比较繁杂，主要的渲染需求就出自这里。
            attrs:{
            //这里的attrs字段是为标签附加属性，比如这里的href链接指向。接受一切标签可用属性如 data-这类
                'href': obj.row.dataDownload
            },
            //class是渲染的标签类名，支持array添加多个类
            class:'test',
            //style是内联样式，注意样式需要换成驼峰形式
            style:{
                marginLeft:'10px'
            },
            //on是为渲染元素绑定事件
            on:{
                click:()=>{
                    //需要注意这里的this指向，楼主被这里坑的不浅，在下面详细解释
                    this.con(obj.row.id)
                }
            }
            //最后的字符串就是渲染的元素文字
        },'立即下载')
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">//以下是代码部分</span>
{
    title: <span class="hljs-string">'数据下载'</span>,
    key: <span class="hljs-string">'download'</span>,
    align: <span class="hljs-string">'center'</span>,
    <span class="hljs-attribute">width</span>:<span class="hljs-number">100</span>,
    render:(fc,obj)=&gt;{
    <span class="hljs-comment">//新版本中render的参数改了，不再是之前的三个参数，变成了2个，其中fc是一个需要返回的渲染对象，obj就是旧版本的row字段，index字段也在其中。</span>
    <span class="hljs-comment">//其中第二个字段可以传入一个array达到在一个字段中渲染多个标签的需求。</span>
        return fc(<span class="hljs-string">'a'</span>,{
        <span class="hljs-comment">//fs这个函数在本例中接收了三个参数 'a'是渲染内容外面包裹的标签名、比如'div','span'</span>
        <span class="hljs-comment">//第二个参数是一个对象，内容比较繁杂，主要的渲染需求就出自这里。</span>
            attrs:{
            <span class="hljs-comment">//这里的attrs字段是为标签附加属性，比如这里的href链接指向。接受一切标签可用属性如 data-这类</span>
                <span class="hljs-string">'href'</span>: obj<span class="hljs-selector-class">.row</span><span class="hljs-selector-class">.dataDownload</span>
            },
            <span class="hljs-comment">//class是渲染的标签类名，支持array添加多个类</span>
            class:<span class="hljs-string">'test'</span>,
            <span class="hljs-comment">//style是内联样式，注意样式需要换成驼峰形式</span>
            style:{
                marginLeft:<span class="hljs-string">'10px'</span>
            },
            <span class="hljs-comment">//on是为渲染元素绑定事件</span>
            on:{
                click:()=&gt;{
                    <span class="hljs-comment">//需要注意这里的this指向，楼主被这里坑的不浅，在下面详细解释</span>
                    this.con(obj<span class="hljs-selector-class">.row</span><span class="hljs-selector-class">.id</span>)
                }
            }
            <span class="hljs-comment">//最后的字符串就是渲染的元素文字</span>
        },<span class="hljs-string">'立即下载'</span>)
    }
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVRl0F?w=507&amp;h=50" src="https://static.alili.tech/img/bVRl0F?w=507&amp;h=50" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>好了这就是经过渲染后页面呈现的标签，我们上面添加的内容正确体现了出来。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="吐槽一下：这个改版非常的...不爽！你问我为什么？一个简单的渲染为什么如此复杂呢...如果是之前版本的Tabel组件还是这些要求的话，那么就是一行代码可以搞定的:
`<a @click=&quot;detail(${obj.row.roleId})&quot; :href=&quot;${obj.row.download}&quot; class=&quot;text&quot; style=&quot;margin-left:10px&quot;>查看</a>`

下面是关于使用中的**不足**和**总结**：
楼主在开始使用中把所有`Tabel`的`columns`是放在了一个外部文件，通过`import`方式引入的。因此在`render`函数中的this指向了该文件的export对象，所以一些事件的方法会在控制台报错！楼主尝试了许多方式，都不能把这个`this`指向到Vue的实例中，无奈只好把这些头部的字段挪进了`data`中，如果有哪位大佬有好的解决方案请留言告知！感谢。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>吐槽一下：这个改版非常的...不爽！你问我为什么？一个简单的渲染为什么如此复杂呢...如果是之前版本的Tabel组件还是这些要求的话，那么就是一行代码可以搞定的:
`&lt;a @click=<span class="hljs-string">"detail(${obj.row.roleId})"</span> :href=<span class="hljs-string">"${obj.row.download}"</span> <span class="hljs-keyword">class</span>=<span class="hljs-string">"text"</span> style=<span class="hljs-string">"margin-left:10px"</span>&gt;查看&lt;/a&gt;`

下面是关于使用中的**不足**和**总结**：
楼主在开始使用中把所有`Tabel`的`columns`是放在了一个外部文件，通过`<span class="hljs-keyword">import</span>`方式引入的。因此在`render`函数中的this指向了该文件的<span class="hljs-keyword">export</span>对象，所以一些事件的方法会在控制台报错！楼主尝试了许多方式，都不能把这个`this`指向到Vue的实例中，无奈只好把这些头部的字段挪进了`data`中，如果有哪位大佬有好的解决方案请留言告知！感谢。
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="先写到这里，最近忙的够呛(LanDeYiB)所以先写到这里，今后如果再遇到什么问题，再记录到这里。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gcode"><code>先写到这里，最近忙的够呛<span class="hljs-comment">(LanDeYiB)</span>所以先写到这里，今后如果再遇到什么问题，再记录到这里。
</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
总结在使用iView过程中遇到的小问题

## 原文链接
[https://segmentfault.com/a/1190000010121051](https://segmentfault.com/a/1190000010121051)

