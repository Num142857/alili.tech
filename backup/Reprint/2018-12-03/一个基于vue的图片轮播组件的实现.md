---
title: '一个基于vue的图片轮播组件的实现' 
date: 2018-12-03 2:30:08
hidden: true
slug: 5jmpht9tq7m
categories: [reprint]
---

{{< raw >}}

                    
<h3>1. 在线DEMO</h3>
<p><a href="http://va-carousel.xiaoshang.online" rel="nofollow noreferrer">http://va-carousel.xiaoshang.online</a></p>
<p><a href="https://github.com/zhangxiaoshang/va-carousel" rel="nofollow noreferrer">Github</a></p>
<h3>2. 首先是一张思维导图</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014660831?w=1629&amp;h=377" src="https://static.alili.tech/img/remote/1460000014660831?w=1629&amp;h=377" alt="导图" title="导图"></span></p>
<h3>3. 然后是以上属性的标注说明</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014660832?w=1858&amp;h=432" src="https://static.alili.tech/img/remote/1460000014660832?w=1858&amp;h=432" alt="标注" title="标注"></span></p>
<h3>4. 代码层</h3>
<p>4.1 除去可从父组件接收的属性，组件自身有以下属性：</p>
<pre><code class="js">data() {
    return {
      list: [],     // 当前显示的图片列表
      hover: false, // 鼠标是否悬浮在组件上
      timer: null,  // 自动切换的 setInterval
      itemWidth: '',// 每项元素的宽度
      isReverse: false // 是否是反向切换，触发prev时，该属性为true
    }
  }</code></pre>
<p>4.2 组件挂载之前</p>
<ol>
<li>计算每项元素的宽度，即itemWidth的值</li>
<li>初始化显示的图片列表，即list。这里存储的数据才是真正会被在页面上渲染的。每次切换，实际上就是修改该list中的数据，对应的视图会自动更新，数据驱动视图嘛。</li>
</ol>
<pre><code class="js">beforeMount() {
    this.itemWidth = 100 / this.total + '%'
    this.list = this.items.slice(0, this.total)
  },
</code></pre>
<p>4.3 组件挂在后，检查autoplay属性，若该属性为true，则产生一个计时器</p>
<pre><code class="js">mounted() {
    if (this.autoplay) {
      this.startTimer()
    }
  },</code></pre>
<p>4.4 startTimer函数很简单,就是间隔一定时间触发一次next(向后)切换</p>
<pre><code class="js">// 开始计时器
startTimer() {
    if (!this.interval || this.interval &lt;= 0) {
        return
    }
    this.timer = setInterval(this.next, this.interval)
}</code></pre>
<p>4.5 next函数</p>
<pre><code class="js">    // 下一张
    next() {
      // 如果图片列表小于需要显示的数量，则不进行滚动
      if (this.items.length &lt; this.total) {
        return
      }

      // 向后追加一个元素，该元素为：
      // 显示列表中最后一个元素在原数组中的后一个元素
      // 如果已经是最后一个元素，则使用第一个元素

      let indexOfItems = this.items.findIndex(
        item =&gt; item.id === this.list[this.list.length - 1].id
      )

      if (indexOfItems === this.items.length - 1) {
        // 使用第一个元素
        this.list.push(this.items[0])
      } else {
        // 使用后一个元素
        this.list.push(this.items[indexOfItems + 1])
      }
      // 移除当前显示图片中的第一个
      this.list.shift()
      this.isReverse = false
    },</code></pre>
<p>4.6 对应的还有一个prev函数，与next函数逻辑相反，这里就不展示代码了</p>
<p>4.7 点击图片时，向父组件释放事件selectedItem，传递两个参数 item 和 index 分别为当前点击的对象，和该对象在list中的位置</p>
<pre><code class="js">    // 点击图片
    selectedItem(item, index) {
      this.$emit('selectedItem', item, index)
    },</code></pre>
<p>4.8 鼠标悬浮在组件上时，停止自动切换（若autoplay为ture）, 鼠标离开时，继续切换</p>
<pre><code class="js">    handleMouseEnter() {
      this.hover = true
      this.pauseTimer()
    },

    handleMouseLeave() {
      this.hover = false
      if (this.autoplay) {
        this.startTimer()
      }
    },</code></pre>
<p>4.9 然后是过渡效果的实现</p>
<p>因为arrow元素也在transition-group中，所以当arrow=‘hover’时，arrow的显示、隐藏也会触发钩子函数，但是我们的钩子函数是针对image-item写的，所以需要在函数中检测是哪个元素触发的，这里通过检查className进行判断。<br>然后针对向前、向后两种情况设置不同的样式</p>
<pre><code class="js"> beforeEnter(el) {
      // 只对image-item使用过渡
      let isImageItem = el.className.indexOf('image-item') &gt; -1
      if (isImageItem) {
        el.style.opacity = 0
        if (this.isReverse) {
          el.style.transform = 'translateX(-100%)'
        } else {
          el.style.transform = 'translateX(100%)'
        }
      }
    }</code></pre>
<p>4.10 这里使用了Velocity，这是一个实现动画效果的js库，之所以使用这个库是因为试了n种方案都没能实现预期效果emm</p>
<pre><code class="js">enter(el, done) {
      // 只对image-item使用过渡
      let isImageItem = el.className.indexOf('image-item') &gt; -1
      if (isImageItem) {
        Velocity(el, { opacity: 1, translateX: '0px' }, { complate: done })
      } else {
        done()
      }
    }</code></pre>
<p>4.11 然后是对应的beforeLeave、leave函数，这里就不展示了</p>
<p>以上基本就是所有js部分，整体感受就是，一旦实现逻辑搞清楚，代码实现起来还是挺容易的，然后就是框架的熟悉程度。</p>
<h3>5. npm包发布</h3>
<p>这本是公司业务中的一个功能需求，因为没能在网上找到现成的轮子，找个差不多的效果领导不满意，所以只能自己写了，做都做了不发出来岂不是白写了. . .</p>
<p>npm发布流程简单概括就是</p>
<p>1.注册</p>
<p>去npm官网注册个账号</p>
<p>2.生成npm包 文件夹中有package.json文件就是一个npm包</p>
<p>3.在终端使用npm publish发布包，成功之后，该项目文件夹下所有文件都会上传至npm官网，当用户使用npm install安装后，就会将整个文件夹下载至node_modules文件夹中，对于这个项目，就是一个使用vue-cli生成的vue项目，组件路径<code>src/components/VaCarousel.vue</code>，所以使用npm install va-carousel安装之后，只需要在项目中像这样导入即可使用(前提是你的项目也是使用vue-cli生成的，对于其他方式建立的项目可能会出现一些错误)：<code>import VaCarousel from 'va-carousel/src/components/VaCarousel.vue'</code></p>
<p>以上</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
一个基于vue的图片轮播组件的实现

## 原文链接
[https://segmentfault.com/a/1190000014660828](https://segmentfault.com/a/1190000014660828)

