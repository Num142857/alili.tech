---
title: '一个商品SKU是怎么生成的' 
date: 2019-01-25 2:30:23
hidden: true
slug: vacy9l7mhq8
categories: [reprint]
---

{{< raw >}}

                    
<p>首先说一说什么是SKU。。。。。。。自己百度去。。。</p>
<p>类似京东上面，未来人类S5这个台笔记本（没错，我刚入手了）</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008569739" src="https://static.alili.tech/img/remote/1460000008569739" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>都是S5这个型号，但是因为CPU,显卡，内存，硬盘等不同，价格也不一样。CPU,显卡，内存，硬盘等属性组合成的一个唯一的商品，就可以用一个SKU来表示,像图上就有10个SKU。一系列的SKU可以归到一个SPU下进行管理。</p>
<p>那么一个SKU是怎么生成的呢？下面结合自己的一些经验，说说一些电商平台的大致产品结构以及SKU的生成方式。</p>
<p>1.阿里速卖通平台,阿里国际站</p>
<p>这两个平台同一个爸爸，基本差不多。要创建一个商品需要先选一个类目，类目下面挂了一堆的属性，属性上又挂了一堆的属性值。属性分为销售属性和非销售属性（销售属性就是类似颜色，尺寸这些单个SKU独有的，非销售属性就是多个SKU共有的，比如同一个品牌型号“未来人类S5”）。非销售属性有必填和非必填，可以是单选，多选，文本等。销售属性就是构成SKU的关键。比如说有销售属性颜色和尺寸，颜色属性下有很多属性值（红，黄，蓝等等），尺寸（1,2,3,4等等）也是。当颜色选了红，黄，尺寸选了1,2，那么就应该生成2x2=4个SKU，每个SKU有各自的价格，库存等。保存SKU的时候会与对应的销售属性相关联。<br>大致的数据模型如下</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008569740" src="https://static.alili.tech/img/remote/1460000008569740" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>当然，实际比这更加复杂（比如产品的图片，单个SKU的图片，多个SKU共同的图片,非销售属性可以自定义添加分类不具有的。。。）</p>
<p>2.eBay<br>跟上面两个平台类似，创建一个产品也要先选一个分类，分类下面也是有很多属性，属性有很多属性值。。。，不同的地方是eBay没有区分销售属性和非销售属性（或者说全部是非销售属性），也允许添加自定义属性和属性值。eBay上SKU是手动添加的，SKU上的属性(SKU上的属性暂且都叫做销售属性)也是自定义的。比如说添加了一个SKU A,价格和数量这两个是必须的，还可以手动加个颜色属性，然后填上属性值红色。当然，若果增加一个SKU B，那么这个SKU也会有颜色这个属性，属性值可以自定义。最后校验这些SKU的属性值组合起来是否唯一。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008569741" src="https://static.alili.tech/img/remote/1460000008569741" alt="" title="" style="cursor: pointer;"></span></p>
<p>这样的优势就是可以随意控制SKU的数量，如果按照上面两个平台的规则，这里应该有4x4x1=16个SKU。这样自由度更高会不会使结构更加复杂呢？当然是NO，用上面的数据模型就可以搞定</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008569742" src="https://static.alili.tech/img/remote/1460000008569742" alt="" title="" style="cursor: pointer;"></span></p>
<p>3.Lazada,Linio平台<br>国际惯例，先选一个类目，类目下面一堆属性，有必填和非必填，属性下一堆属性值。最大的区别就是，一个产品只有一个SKU，属性不支持自定义。比如说要添加一个商品，有两种颜色，那么只能创建两个产品，这两个产品可能只有图片不一样（颜色不一样，可能没有颜色这个属性来选）</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008569743" src="https://static.alili.tech/img/remote/1460000008569743" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>4.Wish平台<br>比较奇特，没有分类，产品有固定的属性，比如标题，描述，运费等。一个产品下可以有多个SKU，SKU的生成取决于固定的两大类属性，两个大类为：颜色和尺寸。比如颜色这个属性就是归类于颜色这个类，其他的属性（品牌，型号，容量等等归为尺寸这个大类）。尺寸类的属性值支持自定义，但只能选一个尺寸类属性（比如选了品牌就不能选容量，选了品牌后可以添加任意值）。两类属性不是必须同时存在，比如颜色选了红，可以不选尺寸类的属性，反之也一样。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008569744" src="https://static.alili.tech/img/remote/1460000008569744" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>忘记说了，一个SKU是靠一串唯一编码来标识的，比如1234A，1234B。一般来说一个平台下不会存在两个相同的SKU，或这一个店铺下不会存在两个相同的SKU。</p>
<p>大致的逻辑和数据模型就这些，接下来说说开发实现方面。</p>
<p>数据库大致就依靠上面的数据模型进行设计，编辑的时候，后端按照这些关联关系取出数据给到前端（我这边前后端未分离，页面还是后端渲染，但我还是把数据格式化为JSON再渲染到前端），保存的时候再进行相关的逻辑校验。因为后端的一些逻辑操作涉及后公司内部的业务，这里就不细说了。说说前端的具体细节，以速卖通的为例，用的是vue，前端拿到的数据如下</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008569745" src="https://static.alili.tech/img/remote/1460000008569745" alt="属性数据，(变量properties)" title="属性数据，(变量properties)" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008569746" src="https://static.alili.tech/img/remote/1460000008569746" alt="sku数据（变量skus）" title="sku数据（变量skus）" style="cursor: pointer;"></span></p>
<p>实现后的粗糙界面</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008569747?w=1335&amp;h=707" src="https://static.alili.tech/img/remote/1460000008569747?w=1335&amp;h=707" alt="" title="" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="data: {
            properties: properties,
            skus: skus
        }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">data</span>: {
            <span class="hljs-attribute">properties</span>: properties,
            skus: skus
        }</code></pre>
<p>遍历properties，得到材质，颜色，发货地，套餐这些属性对象，接着遍历这些对象里的values属性,得到属性值对象,根据属性对象的selectedValues判断属性值是否选上（因为我是后端渲染的js变量，所以初始化的时候selectedValues里的数据直接引用的属性值对象，如果是非后端渲染的话，要根据skus里的属性和属性值去初始化selectedValues的数据，并且存的是属性值对象的引用）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<tr v-for=&quot;(index,item) in properties&quot;>
        <td><strong>"{{"item.Name"}}"：</strong></td>
        <td>

            <label v-for=&quot;value in item.values&quot;><input type=&quot;checkbox&quot; :value=&quot;value&quot; v-model=&quot;item.selectedValues&quot;/>"{{"value.Name"}}"</label>

            <table class=&quot;list_table&quot; v-if=&quot;item.Name!='发货地'&amp;&amp;item.selectedValues.length>0&quot;>
                <tbody>
                <tr>
                    <th>"{{"item.Name"}}"</th>
                    <th>自定义名称</th>
                    <th v-if=&quot;item.Name=='颜色'&quot;>图片（无图片可以不填）</th>
                </tr>

                <tr v-for=&quot;selectedValue in item.selectedValues&quot;>
                    <td>"{{"selectedValue.Name"}}"</td>
                    <td>
                        <input type=&quot;text&quot; v-model=&quot;selectedValue.DefinitionName&quot; maxlength=&quot;20&quot;/>
                    </td>
                    <td v-if=&quot;item.Name=='颜色'&quot;>
                        <div style=&quot;float: left&quot;>
                            <input type=&quot;file&quot;  style=&quot;width: 63px;&quot;/>
                        </div>
                        <div style=&quot;float: right&quot;>
                            <a href=&quot;&quot; rel=&quot;link&quot; target=&quot;_blank&quot;>
                                <img :src=&quot;selectedValue.ImageUrl&quot; width=&quot;30&quot; height=&quot;35&quot;/>
                            </a>
                        </div>
                    </td>
                </tr>

                </tbody>
            </table>
        </td>
    </tr>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">tr</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(index,item) in properties"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">strong</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.Name"}}"</span><span class="xml">：<span class="hljs-tag">&lt;/<span class="hljs-name">strong</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>

            <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"value in item.values"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span> <span class="hljs-attr">:value</span>=<span class="hljs-string">"value"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"item.selectedValues"</span>/&gt;</span></span><span class="hljs-template-variable">"{{"value.Name"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>

            <span class="hljs-tag">&lt;<span class="hljs-name">table</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"list_table"</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"item.Name!='发货地'&amp;&amp;item.selectedValues.length&gt;0"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">tbody</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.Name"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>自定义名称<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">th</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"item.Name=='颜色'"</span>&gt;</span>图片（无图片可以不填）<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>

                <span class="hljs-tag">&lt;<span class="hljs-name">tr</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"selectedValue in item.selectedValues"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span></span><span class="hljs-template-variable">"{{"selectedValue.Name"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"selectedValue.DefinitionName"</span> <span class="hljs-attr">maxlength</span>=<span class="hljs-string">"20"</span>/&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">td</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"item.Name=='颜色'"</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"float: left"</span>&gt;</span>
                            <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"file"</span>  <span class="hljs-attr">style</span>=<span class="hljs-string">"width: 63px;"</span>/&gt;</span>
                        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"float: right"</span>&gt;</span>
                            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">""</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"link"</span> <span class="hljs-attr">target</span>=<span class="hljs-string">"_blank"</span>&gt;</span>
                                <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">"selectedValue.ImageUrl"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"30"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"35"</span>/&gt;</span>
                            <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
                        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>

                <span class="hljs-tag">&lt;/<span class="hljs-name">tbody</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span></span></code></pre>
<p>因为selectedValues通过v-model绑定，当选中或取消一个属性值的时候后，selectedValues也会随着改变，selectedValues里的数据是直接引用属性值而不是拷贝一份数据，所以修改selectedValues中的数据也会直接反映到属性值上，实现了属性值的自定义。</p>
<p>那么怎么根据选中的属性值生成SKU呢？<br>SKU表格处的表头是要根据选中的属性动态更新的，可以这样做</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<tr>
      <th v-for=&quot;item in properties&quot; v-if=&quot;item.selectedValues.length>0&quot;>"{{"item.Name"}}"</th>
      <th><span class=&quot;c_red&quot;>*</span>零售价</th>
      <th><span class=&quot;c_red&quot;>*</span>库存</th>
      <th>商品编码</th>
 </tr>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">th</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in properties"</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"item.selectedValues.length&gt;0"</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.Name"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"c_red"</span>&gt;</span>*<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>零售价<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"c_red"</span>&gt;</span>*<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>库存<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>商品编码<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
 <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span></span></code></pre>
<p>如果属性里的属性值都没有被选中（selectedValues.length==0），就不在表头显示这个属性。</p>
<p>SKU的初始显示</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<tr v-for=&quot;sku in skus&quot;>
        <td v-for=&quot;item in properties&quot; v-if=&quot;item.selectedValues.length>0&quot;>"{{"getValueName(sku,item)"}}"</td>
        <td>US $<input type=&quot;text&quot; v-model=&quot;sku.SkuPrice&quot; class=&quot;w50&quot; maxlength=&quot;9&quot;/><span name=&quot;productUnitTips&quot;></span></td>
        <td><input type=&quot;text&quot; v-model=&quot;sku.StockQuantity&quot; class=&quot;w50&quot; maxlength=&quot;9&quot;/></td>
        <td><input type=&quot;text&quot; v-model=&quot;sku.SkuCode&quot; class=&quot;w180&quot; maxlength=&quot;20&quot;/></td>
</tr>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;tr v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"sku in skus"</span>&gt;
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">td</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in properties"</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"item.selectedValues.length&gt;0"</span>&gt;</span>"{{"getValueName(sku,item)"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span></span>
        &lt;td&gt;US $&lt;input type=<span class="hljs-string">"text"</span> v-model=<span class="hljs-string">"sku.SkuPrice"</span> <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"w50"</span> maxlength=<span class="hljs-string">"9"</span>/&gt;<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"productUnitTips"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span></span>
        &lt;td&gt;<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"sku.StockQuantity"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"w50"</span> <span class="hljs-attr">maxlength</span>=<span class="hljs-string">"9"</span>/&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span></span>
        &lt;td&gt;<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"sku.SkuCode"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"w180"</span> <span class="hljs-attr">maxlength</span>=<span class="hljs-string">"20"</span>/&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/tr&gt;</span></code></pre>
<p>也是利用selectedValues.length让SKU的属性值列数与表头列数保持一致。因为SKU对象里的保存的是属性值Id和属性Id,需要一个方法去获取属性值的值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="getValueName: function (sku, property) {
                var valueName = &quot;&quot;;
                $.each(sku.values,
                        function () {
                            var _this = this;
                            if (this.propertyId == property.Id) {
                                $.each(property.selectedValues, function () {
                                    if (_this.valueId == this.Id) {
                                        valueName = this.Name;
                                        return false;
                                    }
                                });
                            }
                        });
                return valueName;

            }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-attribute">getValueName</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">sku, property</span>) </span>{
                <span class="hljs-built_in">var</span> valueName = <span class="hljs-string">""</span>;
                $.each(sku.values,
                        <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                            <span class="hljs-built_in">var</span> _this = <span class="hljs-keyword">this</span>;
                            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.propertyId == <span class="hljs-keyword">property</span><span class="hljs-string">.Id) {</span>
                                $.each(<span class="hljs-keyword">property</span><span class="hljs-string">.selectedValues</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                                    <span class="hljs-keyword">if</span> (_this.valueId == <span class="hljs-keyword">this</span>.Id) {
                                        valueName = <span class="hljs-keyword">this</span>.Name;
                                        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
                                    }
                                });
                            }
                        });
                <span class="hljs-keyword">return</span> valueName;

            }</code></pre>
<p>你没有看错，这是JQ。。。</p>
<p>接下来就是SKU表格的更新了，我的做法是变更整块区域，就是给skus重新赋值。赋的新值从哪来呢？</p>
<p>将选中的属性值放到一个数组中</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="               var ori = [];
                $.each(vm.properties,
                        function (index, item) {
                            var selectValues = this.selectedValues;
                            if (selectValues.length > 0) {
                                ori.push(selectValues);
                            }
                        });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>               <span class="hljs-keyword">var</span> ori = [];
                $.each(vm.properties,
                        <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">index, item</span>) </span>{
                            <span class="hljs-keyword">var</span> selectValues = <span class="hljs-keyword">this</span>.selectedValues;
                            <span class="hljs-keyword">if</span> (selectValues.length &gt; <span class="hljs-number">0</span>) {
                                ori.push(selectValues);
                            }
                        });</code></pre>
<p>得到这种结构的数组</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[
  [
    {
      'PropertyId': 10,
      'Id': 477,
      'Name': '铝',
      'DefinitionName': '',
      'ImageUrl': ''
    },
    {
      'PropertyId': 10,
      'Id': 529,
      'Name': '帆布',
      'DefinitionName': '',
      'ImageUrl': ''
    }
  ],
  [
    {
      'PropertyId': 200000828,
      'Id': 201655809,
      'Name': '壳＋贴膜',
      'DefinitionName': '',
      'ImageUrl': ''
    },
    {
      'PropertyId': 200000828,
      'Id': 201655810,
      'Name': '壳＋挂绳',
      'DefinitionName': '',
      'ImageUrl': ''
    }
  ]
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scheme"><code>[
  [
    {
      <span class="hljs-symbol">'PropertyId</span><span class="hljs-symbol">':</span> <span class="hljs-number">10</span>,
      <span class="hljs-symbol">'Id</span><span class="hljs-symbol">':</span> <span class="hljs-number">477</span>,
      <span class="hljs-symbol">'Name</span><span class="hljs-symbol">':</span> <span class="hljs-symbol">'铝</span>',
      <span class="hljs-symbol">'DefinitionName</span><span class="hljs-symbol">':</span> '',
      <span class="hljs-symbol">'ImageUrl</span><span class="hljs-symbol">':</span> ''
    },
    {
      <span class="hljs-symbol">'PropertyId</span><span class="hljs-symbol">':</span> <span class="hljs-number">10</span>,
      <span class="hljs-symbol">'Id</span><span class="hljs-symbol">':</span> <span class="hljs-number">529</span>,
      <span class="hljs-symbol">'Name</span><span class="hljs-symbol">':</span> <span class="hljs-symbol">'帆布</span>',
      <span class="hljs-symbol">'DefinitionName</span><span class="hljs-symbol">':</span> '',
      <span class="hljs-symbol">'ImageUrl</span><span class="hljs-symbol">':</span> ''
    }
  ],
  [
    {
      <span class="hljs-symbol">'PropertyId</span><span class="hljs-symbol">':</span> <span class="hljs-number">200000828</span>,
      <span class="hljs-symbol">'Id</span><span class="hljs-symbol">':</span> <span class="hljs-number">201655809</span>,
      <span class="hljs-symbol">'Name</span><span class="hljs-symbol">':</span> <span class="hljs-symbol">'壳＋贴膜</span>',
      <span class="hljs-symbol">'DefinitionName</span><span class="hljs-symbol">':</span> '',
      <span class="hljs-symbol">'ImageUrl</span><span class="hljs-symbol">':</span> ''
    },
    {
      <span class="hljs-symbol">'PropertyId</span><span class="hljs-symbol">':</span> <span class="hljs-number">200000828</span>,
      <span class="hljs-symbol">'Id</span><span class="hljs-symbol">':</span> <span class="hljs-number">201655810</span>,
      <span class="hljs-symbol">'Name</span><span class="hljs-symbol">':</span> <span class="hljs-symbol">'壳＋挂绳</span>',
      <span class="hljs-symbol">'DefinitionName</span><span class="hljs-symbol">':</span> '',
      <span class="hljs-symbol">'ImageUrl</span><span class="hljs-symbol">':</span> ''
    }
  ]
]</code></pre>
<p>求笛卡尔积后（后面有求笛卡尔积参考链接）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ret = descartes(ori);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code style="word-break: break-word; white-space: initial;">var <span class="hljs-keyword">ret</span> = descartes(<span class="hljs-keyword">ori</span>)<span class="hljs-comment">;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[
  [
    {
      'PropertyId': 10,
      'Id': 477,
      'Name': '铝',
      'DefinitionName': '',
      'ImageUrl': ''
    },
    {
      'PropertyId': 200000828,
      'Id': 201655809,
      'Name': '壳＋贴膜',
      'DefinitionName': '',
      'ImageUrl': ''
    }
  ],
  [
    {
      'PropertyId': 10,
      'Id': 477,
      'Name': '铝',
      'DefinitionName': '',
      'ImageUrl': ''
    },
    {
      'PropertyId': 200000828,
      'Id': 201655810,
      'Name': '壳＋挂绳',
      'DefinitionName': '',
      'ImageUrl': ''
    }
  ],
  [
    {
      'PropertyId': 10,
      'Id': 529,
      'Name': '帆布',
      'DefinitionName': '',
      'ImageUrl': ''
    },
    {
      'PropertyId': 200000828,
      'Id': 201655809,
      'Name': '壳＋贴膜',
      'DefinitionName': '',
      'ImageUrl': ''
    }
  ],
  [
    {
      'PropertyId': 10,
      'Id': 529,
      'Name': '帆布',
      'DefinitionName': '',
      'ImageUrl': ''
    },
    {
      'PropertyId': 200000828,
      'Id': 201655810,
      'Name': '壳＋挂绳',
      'DefinitionName': '',
      'ImageUrl': ''
    }
  ]
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scheme"><code>[
  [
    {
      <span class="hljs-symbol">'PropertyId</span><span class="hljs-symbol">':</span> <span class="hljs-number">10</span>,
      <span class="hljs-symbol">'Id</span><span class="hljs-symbol">':</span> <span class="hljs-number">477</span>,
      <span class="hljs-symbol">'Name</span><span class="hljs-symbol">':</span> <span class="hljs-symbol">'铝</span>',
      <span class="hljs-symbol">'DefinitionName</span><span class="hljs-symbol">':</span> '',
      <span class="hljs-symbol">'ImageUrl</span><span class="hljs-symbol">':</span> ''
    },
    {
      <span class="hljs-symbol">'PropertyId</span><span class="hljs-symbol">':</span> <span class="hljs-number">200000828</span>,
      <span class="hljs-symbol">'Id</span><span class="hljs-symbol">':</span> <span class="hljs-number">201655809</span>,
      <span class="hljs-symbol">'Name</span><span class="hljs-symbol">':</span> <span class="hljs-symbol">'壳＋贴膜</span>',
      <span class="hljs-symbol">'DefinitionName</span><span class="hljs-symbol">':</span> '',
      <span class="hljs-symbol">'ImageUrl</span><span class="hljs-symbol">':</span> ''
    }
  ],
  [
    {
      <span class="hljs-symbol">'PropertyId</span><span class="hljs-symbol">':</span> <span class="hljs-number">10</span>,
      <span class="hljs-symbol">'Id</span><span class="hljs-symbol">':</span> <span class="hljs-number">477</span>,
      <span class="hljs-symbol">'Name</span><span class="hljs-symbol">':</span> <span class="hljs-symbol">'铝</span>',
      <span class="hljs-symbol">'DefinitionName</span><span class="hljs-symbol">':</span> '',
      <span class="hljs-symbol">'ImageUrl</span><span class="hljs-symbol">':</span> ''
    },
    {
      <span class="hljs-symbol">'PropertyId</span><span class="hljs-symbol">':</span> <span class="hljs-number">200000828</span>,
      <span class="hljs-symbol">'Id</span><span class="hljs-symbol">':</span> <span class="hljs-number">201655810</span>,
      <span class="hljs-symbol">'Name</span><span class="hljs-symbol">':</span> <span class="hljs-symbol">'壳＋挂绳</span>',
      <span class="hljs-symbol">'DefinitionName</span><span class="hljs-symbol">':</span> '',
      <span class="hljs-symbol">'ImageUrl</span><span class="hljs-symbol">':</span> ''
    }
  ],
  [
    {
      <span class="hljs-symbol">'PropertyId</span><span class="hljs-symbol">':</span> <span class="hljs-number">10</span>,
      <span class="hljs-symbol">'Id</span><span class="hljs-symbol">':</span> <span class="hljs-number">529</span>,
      <span class="hljs-symbol">'Name</span><span class="hljs-symbol">':</span> <span class="hljs-symbol">'帆布</span>',
      <span class="hljs-symbol">'DefinitionName</span><span class="hljs-symbol">':</span> '',
      <span class="hljs-symbol">'ImageUrl</span><span class="hljs-symbol">':</span> ''
    },
    {
      <span class="hljs-symbol">'PropertyId</span><span class="hljs-symbol">':</span> <span class="hljs-number">200000828</span>,
      <span class="hljs-symbol">'Id</span><span class="hljs-symbol">':</span> <span class="hljs-number">201655809</span>,
      <span class="hljs-symbol">'Name</span><span class="hljs-symbol">':</span> <span class="hljs-symbol">'壳＋贴膜</span>',
      <span class="hljs-symbol">'DefinitionName</span><span class="hljs-symbol">':</span> '',
      <span class="hljs-symbol">'ImageUrl</span><span class="hljs-symbol">':</span> ''
    }
  ],
  [
    {
      <span class="hljs-symbol">'PropertyId</span><span class="hljs-symbol">':</span> <span class="hljs-number">10</span>,
      <span class="hljs-symbol">'Id</span><span class="hljs-symbol">':</span> <span class="hljs-number">529</span>,
      <span class="hljs-symbol">'Name</span><span class="hljs-symbol">':</span> <span class="hljs-symbol">'帆布</span>',
      <span class="hljs-symbol">'DefinitionName</span><span class="hljs-symbol">':</span> '',
      <span class="hljs-symbol">'ImageUrl</span><span class="hljs-symbol">':</span> ''
    },
    {
      <span class="hljs-symbol">'PropertyId</span><span class="hljs-symbol">':</span> <span class="hljs-number">200000828</span>,
      <span class="hljs-symbol">'Id</span><span class="hljs-symbol">':</span> <span class="hljs-number">201655810</span>,
      <span class="hljs-symbol">'Name</span><span class="hljs-symbol">':</span> <span class="hljs-symbol">'壳＋挂绳</span>',
      <span class="hljs-symbol">'DefinitionName</span><span class="hljs-symbol">':</span> '',
      <span class="hljs-symbol">'ImageUrl</span><span class="hljs-symbol">':</span> ''
    }
  ]
]</code></pre>
<p>大前端也用上了算法有木有，这里需要弄明白拿到的是什么数据，需要的是什么数据，然后就去想实现就OK了。<br>想要的数据已经拿到，重新构建skus</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="         for (var i = 0; i < ret.length; i++) {
                    var sku = {SkuCode: &quot;&quot;, SkuPrice: &quot;&quot;, StockQuantity: &quot;&quot;};
                    sku.values = [];
                    $.each(ret[i],
                            function () {
                                sku.values.push({propertyId: this.PropertyId, valueId: this.Id});
                            });
                    vmSkus.push(sku);
            }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>         <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; ret.length; i++) {
                    <span class="hljs-keyword">var</span> sku = {<span class="hljs-attr">SkuCode</span>: <span class="hljs-string">""</span>, <span class="hljs-attr">SkuPrice</span>: <span class="hljs-string">""</span>, <span class="hljs-attr">StockQuantity</span>: <span class="hljs-string">""</span>};
                    sku.values = [];
                    $.each(ret[i],
                            <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                                sku.values.push({<span class="hljs-attr">propertyId</span>: <span class="hljs-keyword">this</span>.PropertyId, <span class="hljs-attr">valueId</span>: <span class="hljs-keyword">this</span>.Id});
                            });
                    vmSkus.push(sku);
            }</code></pre>
<p>到此，更新SKU表格的代码已经实现，数据驱动视图更新，很清晰。但是什么时候去触发这个更新呢（何时去重新构建skus）? 很简单嘛，就是勾选或取消勾选属性值的时候去触发更新操作。勾选或取消勾选我们能直接从selectedValues.length上得到反馈，然后使用vue 的watch就可以实现了。但是selectedValues是properties数组中元素的一个属性，vue的watch是无法用在数组元素的某一个字段上的（至少目前我发现是这样的），那么暴力一点，直接watch整个properties数组并且加上deep:true。这样是可以实现，但是当修改自定义属性的时候也会触发变更（业务会提刀来见的）。</p>
<p>最终解决方案</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="computed:{
            allCheckedLength:function(){
               var length=0;
                $.each(this.properties,function(){
                    length+=this.selectedValues.length;
                });
               return length;
            }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>computed:{
            <span class="hljs-attr">allCheckedLength</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
               <span class="hljs-keyword">var</span> length=<span class="hljs-number">0</span>;
                $.each(<span class="hljs-keyword">this</span>.properties,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                    length+=<span class="hljs-keyword">this</span>.selectedValues.length;
                });
               <span class="hljs-keyword">return</span> length;
            }
  }</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="watch: {
            'allCheckedLength': {
                handler: 'reBuild'
            }
        }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-attribute">watch</span>: {
            <span class="hljs-string">'allCheckedLength'</span>: {
                <span class="hljs-attribute">handler</span>: <span class="hljs-string">'reBuild'</span>
            }
        }</code></pre>
<p>reBuild就是重新构建的方法。</p>
<p><a href="http://codepen.io/JayceWu/pen/dOxLex" rel="nofollow noreferrer" target="_blank">demo</a><button class="btn btn-xs btn-default ml10 preview" data-url="JayceWu/pen/dOxLex" data-typeid="3">点击预览</button></p>
<p><a href="http://coconut-zhang.iteye.com/blog/1709547" rel="nofollow noreferrer" target="_blank">Java 笛卡尔积算法的简单实现</a><br><a href="http://stackoverflow.com/questions/12303989/cartesian-product-of-multiple-arrays-in-javascript/" rel="nofollow noreferrer" target="_blank">Cartesian product of multiple arrays in JavaScript</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
一个商品SKU是怎么生成的

## 原文链接
[https://segmentfault.com/a/1190000008569736](https://segmentfault.com/a/1190000008569736)

