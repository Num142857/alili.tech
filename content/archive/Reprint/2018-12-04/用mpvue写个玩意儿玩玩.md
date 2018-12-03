---
title: '用mpvue写个玩意儿玩玩' 
date: 2018-12-04 2:30:05
hidden: true
slug: kgfn8t0t6d
categories: [reprint]
---

{{< raw >}}

                    
<p>下周公司要搞黑客马拉松了，组里可能会做个小程序。然后看到了mpvue感觉还不错，于是就打算试试水。用vue写小程序听上去美滋滋。<br>那么先开始吧！</p>
<h5>全局安装 vue-cli</h5>
<p>$ npm install --global vue-cli</p>
<h5>创建一个基于 mpvue-quickstart 模板的新项目</h5>
<p>$ vue init mpvue/mpvue-quickstart my-project</p>
<h5>安装依赖</h5>
<p>$ cd my-project<br>$ npm install</p>
<h5>启动构建</h5>
<p>$ npm run dev</p>
<p>这样子就Okay了。跑起来之后，在微信开发工具里新建项目，选择my-project下的dist目录<br><span class="img-wrap"><img data-src="/img/bV8Xgt?w=277&amp;h=320" src="https://static.alili.tech/img/bV8Xgt?w=277&amp;h=320" alt="图片描述" title="图片描述"></span></p>
<p>然后确定，你就能看到你的小程序已经可以运行了。项目请用别的编辑去编辑，vscode和atom都可以。微信开发工具仅用于调试。<br><span class="img-wrap"><img data-src="/img/bV8Xht?w=138&amp;h=320" src="https://static.alili.tech/img/bV8Xht?w=138&amp;h=320" alt="图片描述" title="图片描述"></span></p>
<p>我在pages下面新建了一个todolist和weather页面。每个目录下都有一个.vue文件和一个main.js文件。main.js下面可以配置一个微信小程序的参数，vue文件就是我们要编辑的页面了。<br><span class="img-wrap"><img data-src="/img/bV8Z3K?w=902&amp;h=527" src="https://static.alili.tech/img/bV8Z3K?w=902&amp;h=527" alt="图片描述" title="图片描述"></span></p>
<p>在打开src/main.js文件，在pages字段上加上我们刚刚创建的两个页面的路径。</p>
<p>接下来在src/components下创建一个组件我叫他todo-list.vue<br>代码如下，自己瞎几把写写的，各种div和css请不要在意，名字也取得不好。</p>
<pre><code>src/components/todo-list.vue
&lt;template&gt;
  &lt;div class='container'&gt;
    &lt;h3&gt;"{{"say"}}"&lt;/h3&gt;
    &lt;div&gt;
        &lt;div class='userinfo'&gt;
            &lt;input type="text" v-model='value' placeholder="请输入" class='input'&gt;
            &lt;div @click='handleClick' class='button'&gt;Add&lt;/div&gt;
        &lt;/div&gt;
      &lt;ul&gt;
          &lt;li v-for='(item, index) in items' v-bind:key='index'&gt;
              &lt;span @click='handleToggle(index)' v-bind:class='{done: item.completed}' class='item'&gt;"{{"index + 1"}}"、"{{"item.name"}}"&lt;/span&gt;
              &lt;div @click.prevent='handleRemove(index)' class='button'&gt;remove&lt;/div&gt;
          &lt;/li&gt;
      &lt;/ul&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
  data () {
    return {
      value: '',
    }
  },
  props: ['say', 'items'],
  methods: {
    handleClick() {
        if (this.value) {
            this.$emit('addTodo', this.value)
            this.value = ''
        }
    },
    handleToggle(index) {
        this.$emit('toggleItem', index)
    },
    handleRemove(index) {
        this.$emit('removeItem', index)
    }
  }
}
&lt;/script&gt;

&lt;style scoped&gt;
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.done {
    color: red;
    text-decoration: line-through;
}
.item {
    font-size: 40rpx;
    line-height: 100rpx;
    display: inline-block;
    height: 100rpx;
    width: 550rpx;
}
.button {
    width: 160rpx;
    display: inline-block;
    height: 70rpx;
    font-size: 40rpx;
    background: #ccc;
    border-radius: 20rpx;
    text-align: center;
}
.input {
    display: inline-block;
    padding: 0 12px;
    margin-bottom: 5px;
    border: 1px solid #ccc;
}
&lt;/style&gt;
</code></pre>
<p>写完了组件，再写src/pages/todolist/index.vue</p>
<pre><code>src/pages/todolist/index.vue
&lt;template&gt;
  &lt;div&gt;
    &lt;todolist v-on:addTodo='saveValue' v-on:toggleItem='toggleItem' v-on:removeItem='removeItem' v-bind='motto'&gt;&lt;/todolist&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
import todolist from '@/components/todo-list.vue'

export default {
  data () {
    return {
      motto: {
        say: 'Hello',
        items: wx.getStorageSync('items') || [],
      },
    }
  },
  components: {
    todolist,
  },
  methods: {
    saveValue(val) {
      this.motto.items.push({
        name: val,
        completed: false,
      })
      wx.setStorageSync('items', this.motto.items)
    },
    toggleItem(index) {
      this.motto.items[index].completed = !this.motto.items[index].completed
      wx.setStorageSync('items', this.motto.items)
    },
    removeItem(index) {
      this.motto.items.splice(index, 1)
      wx.setStorageSync('items', this.motto.items)
    }
  }
}
&lt;/script&gt;

&lt;style scoped&gt;

&lt;/style&gt;</code></pre>
<p>这里我用wx.getStorageSync存储了todolist的数据。</p>
<p>接下来我们再写一个weather组件和weather页面吧，名字被我取的一样，罪过。</p>
<pre><code>src/components/weather.vue
&lt;template&gt;
  &lt;div&gt;
    My Weather~
    &lt;div&gt;"{{"weather.location.path"}}"&lt;/div&gt;
    &lt;div&gt;"{{"weather.now.text"}}"-"{{"weather.now.temperature"}}"摄氏度&lt;/div&gt;
    &lt;div&gt;穿衣："{{"suggestion.dressing.brief"}}"&lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
    data () {
        return {
            weather: {
                location: {
                },
                now: {},
                last_update: '',
            },
            suggestion: {
                dressing: {}
            },
        }
    },
    methods: {
        setWeather(data) {
            this.weather = data
        },
        setSuggestion(data) {
            this.suggestion = data
        }
    },
    mounted() {
        var self = this
        wx.getLocation({
            success(data) {
            console.log('location', data)
            let {latitude, longitude} = data;
            let location = `${latitude}:${longitude}`
            wx.request({
                url: `https://api.seniverse.com/v3/weather/now.json?key=123456789&amp;location=${location}&amp;language=zh-Hans&amp;unit=c`,
                success(res) {
                    console.log('weather', res)
                    let {location, now, last_update} = res.data.results[0]
                    self.setWeather({location, now, last_update})
                }
            })
            wx.request({
                url: `https://api.seniverse.com/v3/life/suggestion.json?key=123456789&amp;location=${location}&amp;language=zh-Hans`,
                success(res) {
                    console.log('生活指数', res)
                    let {suggestion} = res.data.results[0]
                    self.setSuggestion(suggestion)
                }
            })
            } 
        })
    }
}
&lt;/script&gt;

&lt;style scoped&gt;

&lt;/style&gt;
</code></pre>
<pre><code>src/pages/weather/index.vue
&lt;template&gt;
  &lt;div&gt;
    &lt;weather&gt;&lt;/weather&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
import weather from '../../components/weather'

export default {
  data () {
    return {
      
    }
  },
  components: {
      weather,
  },
  methods: {

  }
}
&lt;/script&gt;

&lt;style scoped&gt;

&lt;/style&gt;
</code></pre>
<p>这里用到的接口</p>
<blockquote>
<a href="https://api.seniverse.com/v3/weather/now.json?key=123456789&amp;location=" rel="nofollow noreferrer">https://api.seniverse.com/v3/...</a>${location}&amp;language=zh-Hans&amp;unit=c</blockquote>
<p>大家去www.seniverse.com自己注册一个就可以了。<br>这里我们现在用wx.getLocation获取地理位置，我们会用到经纬度。然后再wx.request()去调接口获取天气数据。<br>你以为这样就完了，事情不是这样的。我们还要在小程序官网上填写服务器域名。如下图<br><span class="img-wrap"><img data-src="/img/bV8Z2R?w=1299&amp;h=390" src="https://static.alili.tech/img/bV8Z2R?w=1299&amp;h=390" alt="图片描述" title="图片描述"></span></p>
<p>最后我们可以把这两个page用起来了</p>
<p>我们在src/pages/index/index.vue下加上两个按钮</p>
<pre><code>&lt;template&gt;
    &lt;button @click='onTodo'&gt;Todo&lt;/button&gt;
    &lt;button @click='onWeather'&gt;Weather&lt;/button&gt;
&lt;/template&gt;</code></pre>
<p>methods里写上页面跳转的方法。</p>
<pre><code>&lt;scirpt&gt;
export default {
    methods: {
        onTodo() {
          const url = '../todolist/main'
          wx.navigateTo({url})
        },
        onWeather() {
          const url = '../weather/main'
          wx.navigateTo({url})
        },
    }
}
&lt;/script&gt;</code></pre>
<p>到此结束。原谅我不会写flex布局，不会写小程序，样子惨不忍睹?。<br>补充一下，调用wx.getLocation()之后获取了经纬度之后，还可以玩玩微信的map组件。试着用微信map写一个vue组件。</p>
<pre><code>&lt;map name="location" v-bind:latitude='location.latitude' v-bind:longitude='location.longitude'&gt;&lt;/map&gt;</code></pre>
<p>另外还可以玩玩微信的camera和canvas组件。<br>以下是一些小细节<br>新增的页面不会添加进webpack的 entry，需要重新&nbsp;npm run dev。<br>总体上来说用mpvue写小程序，可玩性还是挺高的。vue我也是这两天刚刚现学现卖的，还不大会写。<br>学完vue之后，在不了解小程序的情况下，你看就可以写出点玩意儿来了。还是挺不错的吧。大大降低了学小程序那一套东西的成本。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用mpvue写个玩意儿玩玩

## 原文链接
[https://segmentfault.com/a/1190000014489072](https://segmentfault.com/a/1190000014489072)

