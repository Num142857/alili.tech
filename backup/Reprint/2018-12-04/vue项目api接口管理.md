---
title: 'vue项目api接口管理' 
date: 2018-12-04 2:30:05
hidden: true
slug: 2ikb32uizfg
categories: [reprint]
---

{{< raw >}}

                    
<p>默认vue项目中已经使用vue-cli生成，安装axios，基于element-ui开发，axiosconfig目录和api目录是同级，主要记录配置的相关。</p>
<blockquote><h3>1.  在axiosconfig目录下的axiosConfig.js</h3></blockquote>
<pre><code>import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import { Message, Loading } from 'element-ui'
// 响应时间
axios.defaults.timeout = 5 * 1000
// 配置cookie
// axios.defaults.withCredentials = true
// 配置请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// 静态资源
Vue.prototype.$static = ''

// 配置接口地址
axios.defaults.baseURL = ''
var loadingInstance
// POST传参序列化(添加请求拦截器)
axios.interceptors.request.use(
  config =&gt; {
    loadingInstance = Loading.service({
      lock: true,
      text: '数据加载中，请稍后...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    if (config.method === 'post') {
      config.data = qs.stringify(config.data)
    }
    return config
  },
  err =&gt; {
    loadingInstance.close()
    Message.error('请求错误')
    return Promise.reject(err)
  }
)
// 返回状态判断(添加响应拦截器)
axios.interceptors.response.use(
  res =&gt; {
    if (res.data.code === 200) {
      loadingInstance.close()
      return res
    } else {
      loadingInstance.close()
      Message.error(res.data.msg)
    }
  },
  err =&gt; {
    loadingInstance.close()
    Message.error('请求失败，请稍后再试')
    return Promise.reject(err)
  }
)
// 发送请求
export function post (url, params) {
  return new Promise((resolve, reject) =&gt; {
    axios
      .post(url, params)
      .then(
        res =&gt; {
          resolve(res.data)
        },
        err =&gt; {
          reject(err.data)
        }
      )
      .catch(err =&gt; {
        reject(err.data)
      })
  })
}
export function get (url, params) {
  return new Promise((resolve, reject) =&gt; {
    axios
      .get(url, {
        params: params
      })
      .then(res =&gt; {
        resolve(res.data)
      })
      .catch(err =&gt; {
        reject(err.data)
      })
  })
}</code></pre>
<blockquote><h3>2.  在api目录下的index.js,api1.js,api2.js</h3></blockquote>
<pre><code>api1.js
import { post } from '../axiosconfig/'
export default {
    login(params) {
        return post('/users/api/login', params)
    }
}
api2.js
import { post } from '../axiosconfig/'
export default {
    regist(params) {
        return post('/users/api/regist', params)
    }
}
index.js
import api1 from './api1.js'
import api1 from './api2.js'
export default {
  api1,
  api2
}</code></pre>
<blockquote><h3>3.  为了在组件里面调用，避免每个组件去引用，直接将它添加到Vue原型上,在main.js 配置</h3></blockquote>
<pre><code>import api from './api/'
Vue.prototype.$api = api</code></pre>
<blockquote><h3>4.   在组件中使用</h3></blockquote>
<pre><code>登录组件中
doLongin() {
  let params={}
  this.$api.api1.login(params).then(res =&gt; {
    console.log(res)
  })
}
注册组件中
doRegist() {
  let params={}
  this.$api.api2.regist(params).then(res =&gt; {
    console.log(res)
  })
}</code></pre>
<p>这样就可以很直观的看到是那个模块调用的那个方法，便于接口方法的管理和查找。<br>如果您有更好管理方法，欢迎分享和留言。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue项目api接口管理

## 原文链接
[https://segmentfault.com/a/1190000014489213](https://segmentfault.com/a/1190000014489213)

