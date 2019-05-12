---
title: 'Nuxt.js的踩坑指南（常见问题汇总）' 
date: 2018-12-04 2:30:05
hidden: true
slug: 0q7rtlrfe1k
categories: [reprint]
---

{{< raw >}}

                    
<h5>本文会不定期更新在nuxt.js中遇到的问题进行汇总。转发请注明出处，尊重作者，谢谢！</h5>
<hr>
<h3>强烈推荐作者文档版踩坑指南，点击跳转👉<a href="http://docs.brianlee.cn" rel="nofollow noreferrer">踩坑指南</a>
</h3>
<p>在Nuxt的官方文档中，<strong>中文文档和英文文档</strong>都存在着不小的差异。</p>
<h2>1.路径匹配问题：</h2>
<p>In Nuxt.js, the path match is as follows:</p>
<pre><code>@import url('~assets/css/style.css') //Error
</code></pre>
<p>This path matching is an error, and writing it like this is possible:</p>
<pre><code>@import url('~/assets/css/style.css') //success
</code></pre>
<p>也就是说，在最新版本更新中，官方修复了路径匹配问题：</p>
<p>而官方推荐使用<code>~/assets</code>匹配路径，而不是使用在<strong>中文文档</strong>中的~assets去匹配路径。</p>
<p>而在<strong>中文文档</strong>中，也并未见修复及更改此问题。</p>
<h2>2.按需引入(UI框架等等)</h2>
<p>例如使用UI框架：<code>element-ui</code></p>
<p>我找了很多相关文章，并没有详细说明该如何引入。所以我要拿出来将他说明：</p>
<p>先来看下，如果不按需引入<code>vendor.js</code>的体积大小为：</p>
<p><span class="img-wrap"><img data-src="/img/bV87oP?w=2058&amp;h=483" src="https://static.alili.tech/img/bV87oP?w=2058&amp;h=483" alt="nuxt.js打包shi'li" title="nuxt.js打包shi'li"></span></p>
<blockquote>第一步，下载依赖：</blockquote>
<pre><code class="json">
# 先下载element-ui

npm install element-ui --save

# 如果使用按需引入，必须安装babel-plugin-component(官网有需要下载说明，此插件根据官网规则不同，安装插件不同)

npm install babel-plugin-component --save-dev
</code></pre>
<p>安装好以后，按照<code>nuxt.js</code>中的规则，你需要在 <code>plugins/</code> 目录下创建相应的插件文件</p>
<p>在<strong>文件根目录</strong>创建(或已经存在)<code>plugins/</code>目录，创建名为：<code>element-ui.js</code>的文件，内容如下：</p>
<pre><code class="javascript">
import Vue from 'vue'

import { Button } from 'element-ui'    //引入Button按钮

export default ()=&gt;{
    Vue.use(Button)
}
</code></pre>
<blockquote>第二步，引入插件</blockquote>
<p>在<code>nuxt.config.js</code>中，添加配置为：<code>plugins</code></p>
<pre><code class="javascript">
css:[
'element-ui/lib/theme-chalk/index.css'
],
plugins:[
'~/plugins/element-ui'
]
</code></pre>
<p>默认为：开启SSR,采用服务端渲染，也可以<strong>手动配置关闭SSR</strong>，配置为：</p>
<pre><code class="javascript">
css:[
'element-ui/lib/theme-chalk/index.css'
],
plugins:[
    {
        src:'~/plugins/element-ui',
        ssr:false    //关闭ssr
    }
]
</code></pre>
<blockquote>第三步，配置<code>babel</code>选项</blockquote>
<p>在<code>nuxt.config.js</code>中，配置在<code>build</code>选项中，规则为官网规则：</p>
<pre><code class="javascript">
build: {
      babel:{        //配置按需引入规则
          "plugins":[
              [
                  "component",
                  {
                      "libraryName":"element-ui",
                      "styleLibraryName":"theme-chalk"
                  }
              ]
          ]
      },
    /*
     ** Run ESLINT on save
     */
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
           enforce: 'pre',
           test: /\.(js|vue)$/,
           loader: 'eslint-loader',
           exclude: /(node_modules)/
        })
      }
    }
 }
</code></pre>
<p>此时，我们在观察<strong>打包以后文件体积大小</strong>，如图：</p>
<p><span class="img-wrap"><img data-src="/img/bV87pq?w=1601&amp;h=387" src="https://static.alili.tech/img/bV87pq?w=1601&amp;h=387" alt="nuxt.js打包示例" title="nuxt.js打包示例"></span></p>
<h4>此时，我们成功完成了按需引入配置。</h4>
<hr>
<h2>3.初始化脚手架的选择：</h2>
<p>官网提供的初始化脚手架为：</p>
<pre><code class="json">
# 基本的Nuxt.js项目模板

vue init nuxt/starter template
</code></pre>
<p>而其实，官方也提供了更多的模板以便于我们使用，而我在<strong>中文文档</strong>并未发现有说明：</p>
<ul>
<li>
<code>nuxt/starter</code> 基本的Nuxt.js项目模板</li>
<li>
<code>nuxt/express</code> Nuxt.js + Express</li>
<li>
<code>nuxt/koa</code> Nuxt.js + Koa2</li>
<li>
<code>nuxt/adonuxt</code> Nuxt.js + AdonisJS</li>
<li>
<code>nuxt/micro</code> Nuxt.js + Micro</li>
<li>
<code>nuxt/nuxtent</code> 适用于内容较重网站的Nuxt.js + Nuxtent模块</li>
</ul>
<hr>
<p>而我们使用基础的模板进行初始化项目，部署方式为：</p>
<blockquote>第一步，打包：</blockquote>
<p>在执行<code>npm run build</code>的时候，<code>nuxt</code>会自动打包</p>
<blockquote>第二步，选择要部署的文件：</blockquote>
<ul>
<li>
<code>.nuxt</code>文件夹</li>
<li>
<code>package.json</code> 文件</li>
<li>
<code>nuxt.config.js</code> 文件(如果你部署一些proxy，则需要上传这个文件，个人建议把它传上去)</li>
</ul>
<blockquote>第三步，启动你的<code>nuxt</code><strong>（重要）</strong>
</blockquote>
<p>使用<code>pm2</code>启动你的<code>nuxt.js</code></p>
<pre><code class="shell">
pm2 start npm --name "demo" -- run start
</code></pre>
<p><strong>在这里，我发现个问题，如果你使用window server 服务器，在使用<code>pm2</code>启动时候，会出现错误，错误如下：</strong></p>
<p><span class="img-wrap"><img data-src="/img/bV87ss?w=669&amp;h=432" src="https://static.alili.tech/img/bV87ss?w=669&amp;h=432" alt="windows server" title="windows server"></span></p>
<h4>如果在<code>Linux服务器</code>下启动，同样的命令，同样的执行，则不会出现错误：</h4>
<h4>这里采用<code>Linux CentOS 7</code>
</h4>
<h2><span class="img-wrap"><img data-src="/img/bV87sK?w=1013&amp;h=327" src="https://static.alili.tech/img/bV87sK?w=1013&amp;h=327" alt="CentOS 7服务器" title="CentOS 7服务器"></span></h2>
<h4>所以，个人建议，在采用<strong>初始化模板的时候，请选用<code>express</code> 或者 <code>koa</code> 进行初始化，理由如下：</strong>
</h4>
<h5>1.采用基础模板初始化，观察<code>package.json</code>的启动方式如下：</h5>
<pre><code class="shell">
"scripts": {
    "dev": "nuxt",
    "build": "nuxt build",
    "start": "nuxt start",
    "generate": "nuxt generate",
    "lint": "eslint --ext .js,.vue --ignore-path .gitignore .",
    "precommit": "npm run lint"
  }
</code></pre>
<h5>2.采用<code>express</code>/<code>koa</code>初始化模板，观察<code>package.json</code>的启动方式如下：</h5>
<pre><code class="shell">
"scripts": {
    "dev": "backpack dev",
    "build": "nuxt build &amp;&amp; backpack build",
    "start": "cross-env NODE_ENV=production node build/main.js",
    "precommit": "npm run lint",
    "lint": "eslint --ext .js,.vue --ignore-path .gitignore ."
  }
</code></pre>
<h5>在<code>start</code>中，对比下，个人觉得<code>express</code>/<code>koa</code>更灵活一些，它直接启动了<code>build/main.js</code>文件，更能直观的启动方式，而关键在于，也可以在<code>windows server</code>下运行起来。</h5>
<blockquote>注意事项：如果采用<code>express</code>/<code>koa</code>的模板初始化，服务器部署的时候，同时要上传<code>build/</code>目录！！！</blockquote>
<hr>
<h2>4.插件中获取vue绑定</h2>
<p>我们需要在axios的插件中配置Loading加载效果，例如使用<code>element-ui</code>框架作为示例：</p>
<blockquote>1.创建插件</blockquote>
<p>在文件根目录创建(或已经存在)<code>plugins/</code>目录，创建名为：<code>axios.js</code>的文件，内容如下：</p>
<pre><code class="javascript">
import Vue from 'vue'

var vm = new Vue({})    //获取vue实例

export default function ({ $axios, redirect }) {

  $axios.onRequest(config =&gt; {
    if (process.browser) {    //判断是否为客户端（必须）
        vm.$loading();
    }
  })

  $axios.onResponse(response=&gt;{
      if (process.browser) {    //判断是否为客户端（必须）
          let load = vm.$loading();
          load.close();
      }
  })

  $axios.onError(error =&gt; {
    const code = parseInt(error.response &amp;&amp; error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
}

</code></pre>
<p>如官方所说，并不需要像<strong>原生<code>axios</code></strong>一样，去<code>return</code>一个<code>config</code>出来。</p>
<blockquote>2.配置<code>nuxt.config.js</code>文件</blockquote>
<p>在<code>plugins</code>选项添加：</p>
<pre><code class="javascript">
 plugins:['~/plugins/axios']
</code></pre>
<p>添加<code>modules</code>选项并添加如下示例：</p>
<pre><code class="javascript">
modules:['@nuxtjs/axios']
</code></pre>
<p>配置防止多次打包：</p>
<p>在build选项中(<code>nuxt.config.js</code>会默认配置)添加<code>vendor</code>配置项：</p>
<pre><code class="javascript">
build:{
    vendor:['axios']
}
</code></pre>
<p>这样就可以调用loading加载方法,并且愉快的使用了。</p>
<p>（当然还有其他的方法去调用vue实例，每个人习惯不同，使用方式不同。）</p>
<hr>
<h2>5.Nuxt.js中配置代理解决跨域</h2>
<p>我们知道在vue-cli中配置代理很方便，只需要在<code>config/</code>目录下的<code>index.js</code>中找到<code>proxyTable</code>添加即可，而在nuxt中同样需要修改<code>nuxt.config.js</code>配置文件。</p>
<blockquote>1.原始配置代理方式</blockquote>
<p>使用<code>@nuxtjs/axios</code>和<code>@nuxtjs/proxy</code>进行代理解决跨域</p>
<h5>1）.下载插件</h5>
<pre><code class="shell">
# 下载插件

npm install @nuxtjs/axios @nuxtjs/proxy --save

</code></pre>
<h5>2）.配置插件</h5>
<p>在<code>nuxt.config.js</code>添加配置项：<code>modules</code>和<code>proxy</code>。</p>
<pre><code class="javascript">
export default = {

    modules:[
        '@nuxtjs/axios',
        '@nuxtjs/proxy'
    ],
    proxy:[
        ['/json.html',{target:'http://www.xxxx.com'}]    //注意这也是一个数组
    ]
    
}

</code></pre>
<p>按照上面的方式已经完成了代理，可以进行跨域请求了。</p>
<blockquote>2.第二种方式的代理配置</blockquote>
<h5>1）.下载插件</h5>
<p>这次只需要下载<code>@nuxtjs/axios</code>插件就可以。</p>
<pre><code class="shell">
# 下载插件

npm install @nuxtjs/axios --save
</code></pre>
<h5>2）.配置插件</h5>
<pre><code class="javascript">
module.exports = {

  modules: [
    '@nuxtjs/axios',
  ],
  axios: {
    proxy:true
  },
  proxy:{
    '/api': 'http://api.example.com',
    '/api2': 'http://api.another-website.com'
  }

}
</code></pre>
<h4>特别注意：此时，<code>axios</code>选项为对象(<code>object</code>)，<code>proxy</code>选项为对象(<code>object</code>)。</h4>
<hr>
<h3>
<code>@nuxtjs/axios</code>的配置项</h3>
<hr>
<h4>
<code>pathRewrite</code>选项(重写地址)</h4>
<p>如果配置<code>pathRewrite</code>选项，可以采用第二种写法如下：</p>
<pre><code class="javascript">


proxy: {

  '/api/': { target: 'http://api.example.com', pathRewrite: {'^/api/': ''} }

 }

</code></pre>
<p><code>/api/</code>将被添加到API端点的所有请求中。可以使用<code>pathRewrite</code>选项删除。</p>
<p>因为在 ajax 的 url 中加了前缀 <code>/api</code>，而原本的接口是没有这个前缀的。</p>
<p>所以需要通过 pathRewrite 来重写地址，将前缀 <code>/api</code> 转为 <code>/</code>或者是<code>''</code>。</p>
<p>如果本身的接口地址就有 <code>/api</code> 这种通用前缀，就可以把 <code>pathRewrite</code> 删掉。</p>
<hr>
<h4>
<code>retry</code>选项(自动拦截失败请求)</h4>
<p>可以在<code>axios</code>选项中，配置<code>retry</code>配置项，自动拦截失败请求，<strong>默认为3次。</strong></p>
<pre><code class="javascript">
axios: {
  retry: { retries: 3 }
}
</code></pre>
<hr>
<h4>
<code>progress</code>选项(发出请求时显示加载栏)</h4>
<p>与<code>Nuxt.js</code>进度条集成，在发出请求时显示加载栏。<strong>（仅在浏览器上，当加载栏可用时。）</strong></p>
<p>您还可以使用<code>progress</code>配置为每个请求禁用进度条。</p>
<pre><code class="javascript">
this.$axios.$get('URL', { progress: false })
</code></pre>
<hr>
<h4>
<code>baseURL</code>选项（服务器端默认请求地址）</h4>
<p>在服务器端使用和预先创建请求的基本URL。</p>
<hr>
<h4>
<code>browserBaseURL</code>选项（客户端默认请求地址）</h4>
<p>在客户端使用和预先创建请求的基本URL。</p>
<hr>
<p><a href="http://brianlee.cn/archives/132" rel="nofollow noreferrer">本文同步更新在个人博客中，?点击跳转</a><br><em>本文如果有错误之处，请在下方留言以便于及时更正，谢谢！</em></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Nuxt.js的踩坑指南（常见问题汇总）

## 原文链接
[https://segmentfault.com/a/1190000014526984](https://segmentfault.com/a/1190000014526984)

