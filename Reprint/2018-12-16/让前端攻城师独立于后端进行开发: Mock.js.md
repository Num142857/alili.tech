---
title: '让前端攻城师独立于后端进行开发: Mock.js' 
date: 2018-12-16 2:30:10
hidden: true
slug: cko5mexkrm
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000013022563" src="https://static.alili.tech/img/remote/1460000013022563" alt="Mock.js" title="Mock.js" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">一.Mock.js是什么?</h2>
<p>目前的大部分公司的项目都是采用的前后端分离, 后端接口的开发和前端人员是同时进行的.  那么这个时候就会存在一个问题, 在页面需要使用大量数据进行渲染生成前, 后端开发人员的接口也许并没有写完, 作为前端的我们也就没有办法获取数据. 所以 前端工程师就需要自己按照接口文档模拟后端人员提供的数据, 以此进行页面的开发. </p>
<p>这个时候, Mock.js的作用就体现出来了, 在数据量较大的情况下, 我们不用一个一个的编写数据, 只需要根据接口文档将数据的格式填入, Mock.js就能够自动的按需生成大量的模拟数据. 且Mock.js提供了大量的数据类型, 包括文本, 数字, 布尔值, 日期, 邮箱, 链接, 图片, 颜色等.</p>
<p>本文就简单的介绍一下Mock.js提供的语法, 并介绍一下我平时在项目中是如何使用Mock.js去更方便的进行开发的.</p>
<h2 id="articleHeader1">二. 下载和引入Mock.js</h2>
<h3 id="articleHeader2">1. 下载Mock.js</h3>
<p>Mock.js提供多种下载方式, 本文以目前国内最常用的npm举例, 只需要在命令行输入<code>npm install mockjs</code><br>即可完成Mock.js的下载.</p>
<h3 id="articleHeader3">2. 引入Mock.js</h3>
<p>Mock.js暴露了一个全局的<code>Mock</code>对象, 我们只需要将<code>Mock</code>对象引入到文件中, 调用Mock对象的方法即可</p>
<ul><li>CommonJS的引入方式</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//CommonJS引入
let Mock = require('mockjs)

//调用Mock.mock()方法模拟数据
let data = Mock.mock({
'list|1-10': [{
  'id|+1': 1
}]
});
console.log(data);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//CommonJS引入</span>
<span class="hljs-keyword">let</span> Mock = <span class="hljs-built_in">require</span>(<span class="hljs-string">'mockjs)

//调用Mock.mock()方法模拟数据
let data = Mock.mock({
'</span>list|<span class="hljs-number">1</span><span class="hljs-number">-10</span><span class="hljs-string">': [{
  '</span>id|+<span class="hljs-number">1</span><span class="hljs-string">': 1
}]
});
console.log(data);</span></code></pre>
<ul><li>ES6的引入方式</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//ES6的引入方式
import Mock from 'mockjs'

let data = Mock.mock({
'list|1-10': [{
  'id|+1': 1
}]
});
console.log(data);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//ES6的引入方式</span>
<span class="hljs-keyword">import</span> Mock <span class="hljs-keyword">from</span> <span class="hljs-string">'mockjs'</span>

<span class="hljs-keyword">let</span> data = Mock.mock({
<span class="hljs-string">'list|1-10'</span>: [{
  <span class="hljs-string">'id|+1'</span>: <span class="hljs-number">1</span>
}]
});
<span class="hljs-built_in">console</span>.log(data);</code></pre>
<h2 id="articleHeader4">三.Mock.js的简单语法</h2>
<p><code>Mock</code>对象提供了4个方法, 分别是<code>Mock.mock()</code>, <code>Mock.setup()</code>, <code>Mock.valid</code>, <code>Mock.toJSONSchema()</code>,  一个工具库<code>Mock.Random</code>. 其中我们经常使用到的就是<code>Mock.mock()</code>和<code>Mock.Random</code>.</p>
<h3 id="articleHeader5">1. Mock.js的规范</h3>
<p>第二部分引入Mock.js的代码中的以下部分就可以体现Mock.js的语法规范</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'list|1-10': [{
  'id|+1': 1
}]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-string">'list|1-10'</span>: [{
  <span class="hljs-string">'id|+1'</span>: <span class="hljs-number">1</span>
}]</code></pre>
<p>上面的代码被称为数据模板, 用于告诉Mock.js生成什么样的数据, 其中数据模板中的每个属性由三部分构成: <strong>属性名</strong>, <strong>生成规则</strong>, <strong>属性值</strong>:</p>
<ul>
<li>
<code>list</code>为数据模板中的属性名;</li>
<li>
<code>1-10</code>为生成规则(表示生成最少1个, 最多10个重复数据)</li>
<li>
<code>[{'id|+1': 1}]</code>是属性值, 属性值中可以嵌套使用属性名和生成规则.</li>
</ul>
<blockquote>具体的生成规则参见:  <a href="https://github.com/nuysoft/Mock/wiki/Syntax-Specification" rel="nofollow noreferrer" target="_blank">https://github.com/nuysoft/Mo...</a>
</blockquote>
<h3 id="articleHeader6">2. Mock.mock()</h3>
<p><code>Mock.mock()</code>方法是用来根据数据模板生成模拟数据, 我常用到的是以下两种传参方式:</p>
<ul><li>
<code>Mock.mock(template)</code>: 根据数据模板<code>template</code>生成模拟数据</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let data = Mock.mock({
data: {
  'products|10-20': [{
    name: '手机',
    price: 1000
  }]
}
})
console.log(data);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xl"><code>let <span class="hljs-keyword">data</span> = Mock.mock({
<span class="hljs-keyword">data</span>: {
  <span class="hljs-string">'products|10-20'</span>: [{
    <span class="hljs-keyword">name</span>: <span class="hljs-string">'手机'</span>,
    price: <span class="hljs-number">1000</span>
  }]
}
})
console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">data</span>);</code></pre>
<ul><li>
<code>Mock.mock(url, template)</code>: 拦截请求地址为<code>url</code>的ajax请求, 并根据数据模板<code>template</code>生成模拟数据</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let data = Mock.mock('api/products' , {
data: {
  'products|10-20': [{
    name: '手机',
    price: 1000
  }]
}
})

//使用jquery Ajax发送请求
$.ajax({
  url: 'api/products',
  type: 'GET',
  success: function(res) {
    console.log(res);
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> data = Mock.mock(<span class="hljs-string">'api/products'</span> , {
<span class="hljs-attr">data</span>: {
  <span class="hljs-string">'products|10-20'</span>: [{
    <span class="hljs-attr">name</span>: <span class="hljs-string">'手机'</span>,
    <span class="hljs-attr">price</span>: <span class="hljs-number">1000</span>
  }]
}
})

<span class="hljs-comment">//使用jquery Ajax发送请求</span>
$.ajax({
  <span class="hljs-attr">url</span>: <span class="hljs-string">'api/products'</span>,
  <span class="hljs-attr">type</span>: <span class="hljs-string">'GET'</span>,
  <span class="hljs-attr">success</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res</span>) </span>{
    <span class="hljs-built_in">console</span>.log(res);
  }
})</code></pre>
<h3 id="articleHeader7">3. Mock.Random</h3>
<p>Mock.Random是Mock.js提供一个工具类, 用于生成常用的几种数据.</p>
<ul><li>生成布尔值</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//使用@占位符的方式
 let data = Mock.mock({
    data: {
      boolean: '@boolean'
    }
  })
  console.log(data);
  
//使用Mock.Random调用函数的方式
  let data = Mock.mock({
    data: {
      boolean: Mock.Random.boolean()
    }
  })
  console.log(data);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//使用@占位符的方式</span>
 <span class="hljs-keyword">let</span> data = Mock.mock({
    <span class="hljs-attr">data</span>: {
      <span class="hljs-attr">boolean</span>: <span class="hljs-string">'@boolean'</span>
    }
  })
  <span class="hljs-built_in">console</span>.log(data);
  
<span class="hljs-comment">//使用Mock.Random调用函数的方式</span>
  <span class="hljs-keyword">let</span> data = Mock.mock({
    <span class="hljs-attr">data</span>: {
      <span class="hljs-attr">boolean</span>: Mock.Random.boolean()
    }
  })
  <span class="hljs-built_in">console</span>.log(data);</code></pre>
<ul><li>生成日期</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  let data = Mock.mock({
    data: {
      date: Mock.Random.date('yyyy-MM-dd')
    }
  })
  console.log(data);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  <span class="hljs-keyword">let</span> data = Mock.mock({
    <span class="hljs-attr">data</span>: {
      <span class="hljs-attr">date</span>: Mock.Random.date(<span class="hljs-string">'yyyy-MM-dd'</span>)
    }
  })
  <span class="hljs-built_in">console</span>.log(data);</code></pre>
<blockquote>Mock.js支持丰富的日期格式的自定义: <a href="https://github.com/nuysoft/Mock/wiki/Date" rel="nofollow noreferrer" target="_blank">https://github.com/nuysoft/Mo...</a>
</blockquote>
<ul><li>生成图片</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  let data = Mock.mock({
    data: {
    //用于生成高度自定义的图片地址
      imgURL: Mock.Random.image()
    }
  })
  console.log(data);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  <span class="hljs-keyword">let</span> data = Mock.mock({
    <span class="hljs-attr">data</span>: {
    <span class="hljs-comment">//用于生成高度自定义的图片地址</span>
      imgURL: Mock.Random.image()
    }
  })
  <span class="hljs-built_in">console</span>.log(data);</code></pre>
<ul><li>生成名字</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" let data = Mock.mock({
    data: {
      //生成一个英文名字
      name: Mock.Random.name(),
      //生成一个中文名字
      chineseName: Mock.Random.cname()
    }
  })
  console.log(data);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"> <span class="hljs-keyword">let</span> data = Mock.mock({
    <span class="hljs-attr">data</span>: {
      <span class="hljs-comment">//生成一个英文名字</span>
      name: Mock.Random.name(),
      <span class="hljs-comment">//生成一个中文名字</span>
      chineseName: Mock.Random.cname()
    }
  })
  <span class="hljs-built_in">console</span>.log(data);</code></pre>
<blockquote>更多Mock.Random工具库提供的数据: <a href="https://github.com/nuysoft/Mock/wiki/Mock.Random" rel="nofollow noreferrer" target="_blank">https://github.com/nuysoft/Mo...</a>
</blockquote>
<h2 id="articleHeader8">四.在Vue项目中使用Mock.js</h2>
<p>以模拟一个登陆接口的数据为例:</p>
<h4>1. 单独写一个<code>mockData.js</code>文件作为虚拟数据的生成文件.</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//mockData.js

import Mock from 'mockjs'

let Random = Mock.Random;


//用户登陆信息
let userInfo = Mock.mock({
  data: {
    responseCode: 200,
    responseMessage: 'success',
    userMessage: {
      email: Random.email(),
      'id|1-10': 1,
      realName: Random.cname(),
      roleCodes: 'admin',
      username: Random.first()
    }
  }
})



let mockData = {
  userInfo: userInfo
}

export default mockData;

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//mockData.js</span>

<span class="hljs-keyword">import</span> Mock <span class="hljs-keyword">from</span> <span class="hljs-string">'mockjs'</span>

<span class="hljs-keyword">let</span> Random = Mock.Random;


<span class="hljs-comment">//用户登陆信息</span>
<span class="hljs-keyword">let</span> userInfo = Mock.mock({
  <span class="hljs-attr">data</span>: {
    <span class="hljs-attr">responseCode</span>: <span class="hljs-number">200</span>,
    <span class="hljs-attr">responseMessage</span>: <span class="hljs-string">'success'</span>,
    <span class="hljs-attr">userMessage</span>: {
      <span class="hljs-attr">email</span>: Random.email(),
      <span class="hljs-string">'id|1-10'</span>: <span class="hljs-number">1</span>,
      <span class="hljs-attr">realName</span>: Random.cname(),
      <span class="hljs-attr">roleCodes</span>: <span class="hljs-string">'admin'</span>,
      <span class="hljs-attr">username</span>: Random.first()
    }
  }
})



<span class="hljs-keyword">let</span> mockData = {
  <span class="hljs-attr">userInfo</span>: userInfo
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> mockData;

</code></pre>
<h4>2. 使用vuex去控制是否使用mock.js的数据</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/store/index.js

import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex);

const state = {
  //使用模拟数据, 只是开发时使用, 如果不是开发时, 请务必设置为false
  useMock: true
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// src/store/index.js</span>

<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Vuex <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>
<span class="hljs-keyword">import</span> mutations <span class="hljs-keyword">from</span> <span class="hljs-string">'./mutations'</span>
<span class="hljs-keyword">import</span> actions <span class="hljs-keyword">from</span> <span class="hljs-string">'./actions'</span>

Vue.use(Vuex);

<span class="hljs-keyword">const</span> state = {
  <span class="hljs-comment">//使用模拟数据, 只是开发时使用, 如果不是开发时, 请务必设置为false</span>
  useMock: <span class="hljs-literal">true</span>
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Vuex.Store({
  state,
  mutations,
  actions
})</code></pre>
<h4>3. 在Login.vue中去实现请求登陆方法</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//Login.vue

import mockData from '../utils/mockData.js'

exwport default {
  ...
  
  methods: {
    fetchUserInfo() {
      //如果vuex中userMock为true
      if (this.$store.state.useMock) {
        //使用延时器模拟异步
        window.setTimeout(() => {
          let res = mockData.userInfo;
          //业务逻辑
        }, 1000);
        return;
      }
      
      //如果vuex中userMock为false
      this.$axios.post('api/login', params).then(res => {
        //业务逻辑
      });
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//Login.vue</span>

<span class="hljs-keyword">import</span> mockData <span class="hljs-keyword">from</span> <span class="hljs-string">'../utils/mockData.js'</span>

exwport <span class="hljs-keyword">default</span> {
  ...
  
  methods: {
    fetchUserInfo() {
      <span class="hljs-comment">//如果vuex中userMock为true</span>
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.$store.state.useMock) {
        <span class="hljs-comment">//使用延时器模拟异步</span>
        <span class="hljs-built_in">window</span>.setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
          <span class="hljs-keyword">let</span> res = mockData.userInfo;
          <span class="hljs-comment">//业务逻辑</span>
        }, <span class="hljs-number">1000</span>);
        <span class="hljs-keyword">return</span>;
      }
      
      <span class="hljs-comment">//如果vuex中userMock为false</span>
      <span class="hljs-keyword">this</span>.$axios.post(<span class="hljs-string">'api/login'</span>, params).then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
        <span class="hljs-comment">//业务逻辑</span>
      });
    }
  }
}</code></pre>
<p>可以看出在Login.vue的<code>fetchUserInfo()</code>方法中, 如果<code>userMock</code>为<code>true</code>, 将使用的是<code>mock.js</code>中的模拟数据; 如果<code>useMock</code>为<code>false</code>, 使用的是通过Ajax请求的数据. 这么写的好处是, 你只需要在vuex中修改一下, 就可以控制所有请求接口函数中是使用Ajax请求数据, 还是使用模拟数据. 这样在进行和后台联调的时候, 就可以自由的切换数据了!</p>
<h2 id="articleHeader9">参考链接</h2>
<ol><li>Mock.js官网: <a href="http://mockjs.com/" rel="nofollow noreferrer" target="_blank">http://mockjs.com/</a>
</li></ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
让前端攻城师独立于后端进行开发: Mock.js

## 原文链接
[https://segmentfault.com/a/1190000013022560](https://segmentfault.com/a/1190000013022560)

