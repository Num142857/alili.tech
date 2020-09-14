---
title: 'vue 开发中遇到的问题汇总（踩坑指南）' 
date: 2019-01-03 2:30:11
hidden: true
slug: fpwafqlbewq
categories: [reprint]
---

{{< raw >}}

                    
<p>公司年初开始从jquery转型到vue开发，思想上从jquery的操作DOM到vue的操作数据，刚开始还不太习惯，但用了一段时间发现确实比较方便。在刚开始用vue的时候，也踩了一些坑，现在分享出来，供刚入门上手开发vue的朋友参考，都是一些刚接触vue开发遇到的比较常见的问题，vue老手可越过。</p>
<h4>1. props单向绑定</h4>
<p>vue中的props是单向绑定的，父组件的属性变化时会传递给子组件，子组件内部不应改变props的值，否则控制台会给出警告。<br>   但如果props的类型为数组或者对象时，在子组件内部改变props的值控制台不会警告。因为数组或对象是地址引用，vue不会检测到props发生改变。所以有的情况需要在子组件内部改变父组件的值，可以将属性定义为数组或者对象类型传入。<br>   但官方不建议在子组件内改变父组件的值，因为这违反了vue中props单向绑定的思想。</p>
<h4>2. 给对象赋值</h4>
<p>由1可以引申出，地址引用类型的数据，例如对象obj ={a:1},如果想要修改obj中的a属性，通过obj.a = 2这样赋值，页面不会更新，需使用vue.set方法更改才会起作用，    <code>Vue.set(this,obj,a,2)</code>;<br>   同样，如果要给obj增加一个新属性，如果该属性未在data中声明，页面也不会刷新。也就是vue文档中声明的“Vue 不能检测到对象属性的添加或删除”，同样需要使用vue.set方法进行赋值才好使。</p>
<h4>3. <strong>深拷贝数组或对象</strong>
</h4>
<p>对象或数组的简单赋值，修改新值也会改变原值。这时我们需要获取原值的深拷贝对象。<br>   对于对象，可以通过<code>newObj = JSON.parse(JSON.stringfy(obj))</code>实现。<br>   对于数组，可以通过 <code>newArr = […arr]</code>或者<code>newArr = arr.slice(0)</code>来实现。</p>
<h4>4. <strong>给组件增加独有样式</strong>
</h4>
<p>vue中每一个组件都可以自定各自的css样式，如果希望组件内的样式只对当前组件起作用，可以在style标签中增加scoped即可。<br>   该写法会让vue在渲染组件的时候给每个元素都增加一个data-v-/版本号/的属性，可以保证只针对有同样data-v-data-v-/版本号/的元素应用该样式。</p>
<h4>5. <strong>v-for循环key属性</strong>
</h4>
<p>vue中的v-for循环最好加上key属性，否则在高版本(2.2.0+)的vue中控制台会报错。<br>   key属性需要唯一，理想的 key 值是每项都有唯一 id，全局不需唯一，但在一个循环中需要唯一。</p>
<h4>6. <strong>引用图片</strong>
</h4>
<p>图片引用问题。直接把本地图片地址放在src里没问题。但如果把地址提取出来写在data里或者通过method动态给src赋值则引用不到。<br>   因为放在template模板里会被webpack打包所以可以，而放在data或者动态赋值，图片路径只是一个字符串webpack不会处理所以引用不到。<br>   解决办法：通过import或者required引入。<code>import src from ‘../../img.png’</code>或者<code>data:{img:require(‘../../img.png’)}</code></p>
<h4>7. <strong>父组件传值</strong>
</h4>
<p>在子组件使用父组件传入的值时，最好复制出一份props的值，通过data或者computed进行赋值。<br>   data赋值与computed赋值的区别：<br>   data赋值：data:{return {aaa: this.aaa}如果是在data中进行赋值，当父组件的aaa值发生改变时，不会在重新赋给子组件中的aaa。<br>   computed赋值：如果想让子组件跟着父组件修改，需要将赋值操作写在computed中。computed:{aaa(){return this.aaa}</p>
<h4>8. <strong>对象数组深度监听</strong>
</h4>
<p>后端传过来的数组是一个数组对象，页面中绑定对象中某一具体的属性，当该值变化时调用某个函数，自然想到就是watch方法。但如何watch数组对象中某一个具体的属性，显然不可能一个个属性写watch。<br>   解决办法：<br>   1.watch整个对象，设置deep为true，当该对象发生改变时，调用处理函数。<br>   2.将页面中绑定的属性写在computed函数中，watch这个computed中的函数，当对象值改变时会进入computed函数中，进而进入watch函数中，再调用处理函数。</p>
<h4>9. <strong>动态增加class</strong>
</h4>
<p>给元素动态增加class时，可以在模板中通过<code>:class={‘hasClass’: ifHasClass}</code>来实现，当ifHasClass为true时，该元素会自动加上hasClass的样式。<br>   动态绑定的class可以与正常写的一起使用<a class="‘aaa’"></a>，但如果在一个元素中使用了两个class则会报错</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue 开发中遇到的问题汇总（踩坑指南）

## 原文链接
[https://segmentfault.com/a/1190000010794839](https://segmentfault.com/a/1190000010794839)

