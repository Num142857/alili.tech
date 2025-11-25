---
title: 'vue vue-router vuex element-ui axios 的学习笔记（七）完善登录注册' 
date: 2018-12-25 2:30:11
hidden: true
slug: ws9tivyi31j
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>现在我们已经能够在服务器环境下完成注册操作了</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012085944?w=1240&amp;h=289" src="https://static.alili.tech/img/remote/1460000012085944?w=1240&amp;h=289" alt="Image 070.png" title="Image 070.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">登录功能</h2>
<blockquote><p>login.vue</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <el-main>
    <el-form 
      :model=&quot;LoginForm&quot; 
      ref=&quot;LoginForm&quot; 
      :rules=&quot;rule&quot;
      label-width=&quot;0&quot;
      class=&quot;login-form&quot;>
      <h3>用户登录系统</h3>

      <el-form-item prop=&quot;username&quot;>
        <el-input 
          type=&quot;text&quot; 
          v-model=&quot;LoginForm.username&quot; 
          placeholder=&quot;username&quot; >
        </el-input>
      </el-form-item>

      <el-form-item prop=&quot;password&quot;>
        <el-input 
          type=&quot;password&quot; 
          v-model=&quot;LoginForm.password&quot; 
          placeholder=&quot;password&quot; >
        </el-input>
      </el-form-item>

      <el-form-item >
        <el-button 
          type=&quot;danger&quot; 
          class=&quot;submitBtn&quot;
          round
          @click.native.prevent=&quot;submit&quot;
          :loading=&quot;logining&quot;>
          登录
        </el-button>
        <el-button 
          type=&quot;primary&quot;
          class=&quot;resetBtn&quot; 
          round
          @click.native.prevent=&quot;reset&quot;>
          重置
        </el-button>
        <hr>
        <p>还没有账号，马上去<span class=&quot;to&quot; @click=&quot;toregin&quot;>注册</span></p>
      </el-form-item>
    </el-form>
  </el-main>
</template>

<script>
import {LoginUser} from '../api/api'
export default {
  // ....
  data () {
    return {
      LoginForm: {
        username: '',
        password: ''
      },
      logining: false,
      rule: {
        username: [
          {
            required: true,
            max: 14,
            min: 7,
            message: '用户名是必须的，长度为7-14位',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '密码是必须的！',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // ...
    submit () {
      this.$refs.LoginForm.validate(valid => {
        if (valid) {
          this.logining = true
          // console.log('开始请求后台数据，验证返回之类的操作！')
          // 登录作为参数的用户信息
          let LoginParams = {
            username: this.LoginForm.username,
            password: this.LoginForm.password
          }
          // 调用axios登录接口
          LoginUser(LoginParams).then(res => {
            this.logining = false
            // 根据返回的code判断是否成功
            let {code, msg, user} = res.data
            if (code !== 200) {
              this.$message({
                type: 'error',
                message: msg
              })
            } else {
              this.$message({
                type: 'success',
                message: msg
              })
              // 将返回的数据注入sessionStorage
              sessionStorage.setItem('user', JSON.stringify(user))
              // 跳转到我的信息的页面
              this.$router.push('/manger/my')
            }
          })
        } else {
          console.log('submit err')
        }
      })
    },
    reset () {
      this.$refs.LoginForm.resetFields()
    },
    toregin () {
      this.$router.push('/regin')
    }
  }
}
</script>

<style scoped>
.login-form {
  margin: 20px auto;
  width: 310px;
  background: #fff;
  box-shadow: 0 0 35px #B4BCCC;
  padding: 30px 30px 0 30px;
  border-radius: 25px; 
}
.submitBtn {
  width: 65%;
}
.to {
  color: #67C23A;
  cursor: pointer;
}
</style>

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">el-main</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">el-form</span> 
      <span class="hljs-attr">:model</span>=<span class="hljs-string">"LoginForm"</span> 
      <span class="hljs-attr">ref</span>=<span class="hljs-string">"LoginForm"</span> 
      <span class="hljs-attr">:rules</span>=<span class="hljs-string">"rule"</span>
      <span class="hljs-attr">label-width</span>=<span class="hljs-string">"0"</span>
      <span class="hljs-attr">class</span>=<span class="hljs-string">"login-form"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>用户登录系统<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">el-form-item</span> <span class="hljs-attr">prop</span>=<span class="hljs-string">"username"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">el-input</span> 
          <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> 
          <span class="hljs-attr">v-model</span>=<span class="hljs-string">"LoginForm.username"</span> 
          <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"username"</span> &gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">el-input</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">el-form-item</span>&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">el-form-item</span> <span class="hljs-attr">prop</span>=<span class="hljs-string">"password"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">el-input</span> 
          <span class="hljs-attr">type</span>=<span class="hljs-string">"password"</span> 
          <span class="hljs-attr">v-model</span>=<span class="hljs-string">"LoginForm.password"</span> 
          <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"password"</span> &gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">el-input</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">el-form-item</span>&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">el-form-item</span> &gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> 
          <span class="hljs-attr">type</span>=<span class="hljs-string">"danger"</span> 
          <span class="hljs-attr">class</span>=<span class="hljs-string">"submitBtn"</span>
          <span class="hljs-attr">round</span>
          @<span class="hljs-attr">click.native.prevent</span>=<span class="hljs-string">"submit"</span>
          <span class="hljs-attr">:loading</span>=<span class="hljs-string">"logining"</span>&gt;</span>
          登录
        <span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> 
          <span class="hljs-attr">type</span>=<span class="hljs-string">"primary"</span>
          <span class="hljs-attr">class</span>=<span class="hljs-string">"resetBtn"</span> 
          <span class="hljs-attr">round</span>
          @<span class="hljs-attr">click.native.prevent</span>=<span class="hljs-string">"reset"</span>&gt;</span>
          重置
        <span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">hr</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>还没有账号，马上去<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"to"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"toregin"</span>&gt;</span>注册<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">el-form-item</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">el-form</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">el-main</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> {LoginUser} <span class="hljs-keyword">from</span> <span class="hljs-string">'../api/api'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-comment">// ....</span>
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">LoginForm</span>: {
        <span class="hljs-attr">username</span>: <span class="hljs-string">''</span>,
        <span class="hljs-attr">password</span>: <span class="hljs-string">''</span>
      },
      <span class="hljs-attr">logining</span>: <span class="hljs-literal">false</span>,
      <span class="hljs-attr">rule</span>: {
        <span class="hljs-attr">username</span>: [
          {
            <span class="hljs-attr">required</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-attr">max</span>: <span class="hljs-number">14</span>,
            <span class="hljs-attr">min</span>: <span class="hljs-number">7</span>,
            <span class="hljs-attr">message</span>: <span class="hljs-string">'用户名是必须的，长度为7-14位'</span>,
            <span class="hljs-attr">trigger</span>: <span class="hljs-string">'blur'</span>
          }
        ],
        <span class="hljs-attr">password</span>: [
          {
            <span class="hljs-attr">required</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-attr">message</span>: <span class="hljs-string">'密码是必须的！'</span>,
            <span class="hljs-attr">trigger</span>: <span class="hljs-string">'blur'</span>
          }
        ]
      }
    }
  },
  <span class="hljs-attr">methods</span>: {
    <span class="hljs-comment">// ...</span>
    submit () {
      <span class="hljs-keyword">this</span>.$refs.LoginForm.validate(<span class="hljs-function"><span class="hljs-params">valid</span> =&gt;</span> {
        <span class="hljs-keyword">if</span> (valid) {
          <span class="hljs-keyword">this</span>.logining = <span class="hljs-literal">true</span>
          <span class="hljs-comment">// console.log('开始请求后台数据，验证返回之类的操作！')</span>
          <span class="hljs-comment">// 登录作为参数的用户信息</span>
          <span class="hljs-keyword">let</span> LoginParams = {
            <span class="hljs-attr">username</span>: <span class="hljs-keyword">this</span>.LoginForm.username,
            <span class="hljs-attr">password</span>: <span class="hljs-keyword">this</span>.LoginForm.password
          }
          <span class="hljs-comment">// 调用axios登录接口</span>
          LoginUser(LoginParams).then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
            <span class="hljs-keyword">this</span>.logining = <span class="hljs-literal">false</span>
            <span class="hljs-comment">// 根据返回的code判断是否成功</span>
            <span class="hljs-keyword">let</span> {code, msg, user} = res.data
            <span class="hljs-keyword">if</span> (code !== <span class="hljs-number">200</span>) {
              <span class="hljs-keyword">this</span>.$message({
                <span class="hljs-attr">type</span>: <span class="hljs-string">'error'</span>,
                <span class="hljs-attr">message</span>: msg
              })
            } <span class="hljs-keyword">else</span> {
              <span class="hljs-keyword">this</span>.$message({
                <span class="hljs-attr">type</span>: <span class="hljs-string">'success'</span>,
                <span class="hljs-attr">message</span>: msg
              })
              <span class="hljs-comment">// 将返回的数据注入sessionStorage</span>
              sessionStorage.setItem(<span class="hljs-string">'user'</span>, <span class="hljs-built_in">JSON</span>.stringify(user))
              <span class="hljs-comment">// 跳转到我的信息的页面</span>
              <span class="hljs-keyword">this</span>.$router.push(<span class="hljs-string">'/manger/my'</span>)
            }
          })
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'submit err'</span>)
        }
      })
    },
    reset () {
      <span class="hljs-keyword">this</span>.$refs.LoginForm.resetFields()
    },
    toregin () {
      <span class="hljs-keyword">this</span>.$router.push(<span class="hljs-string">'/regin'</span>)
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.login-form</span> {
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">20px</span> auto;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">310px</span>;
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#fff</span>;
  <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">35px</span> <span class="hljs-number">#B4BCCC</span>;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">30px</span> <span class="hljs-number">30px</span> <span class="hljs-number">0</span> <span class="hljs-number">30px</span>;
  <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">25px</span>; 
}
<span class="hljs-selector-class">.submitBtn</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">65%</span>;
}
<span class="hljs-selector-class">.to</span> {
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#67C23A</span>;
  <span class="hljs-attribute">cursor</span>: pointer;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

</code></pre>
<blockquote><p>登录页面和注册页面差不多的，但测试的话又得打一包，很麻烦，所以暂时可以用axios-mock-adapter 来模拟测试一下，等功能都完善之后再打包丢到服务器测试</p></blockquote>
<h3 id="articleHeader1">1、安装axio-mock-adapter</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012085945?w=796&amp;h=128" src="https://static.alili.tech/img/remote/1460000012085945?w=796&amp;h=128" alt="Image 072.png" title="Image 072.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader2">2、写个假数据</h3>
<ul><li><p>1、在data.js 里面添加2个用户</p></li></ul>
<blockquote><p>data.js</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import avatarLee from '../assets/avatar.jpg'
import avatarZhang from '../assets/avatar2.jpg'
const users = [
  {
    username: 'lytton',
    password: '123456',
    email: '123@163.com',
    tel: '15181589155',
    name: '李小白',
    time: '2017-11-11',
    avatar: avatarLee
  },
  {
    username: 'zhangsan',
    password: '123456',
    email: '321@163.com',
    tel: '13789546327',
    name: '张三',
    time: '2017-08-17',
    avatar: avatarZhang
  }
]
export default {users}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> avatarLee <span class="hljs-keyword">from</span> <span class="hljs-string">'../assets/avatar.jpg'</span>
<span class="hljs-keyword">import</span> avatarZhang <span class="hljs-keyword">from</span> <span class="hljs-string">'../assets/avatar2.jpg'</span>
<span class="hljs-keyword">const</span> users = [
  {
    <span class="hljs-attr">username</span>: <span class="hljs-string">'lytton'</span>,
    <span class="hljs-attr">password</span>: <span class="hljs-string">'123456'</span>,
    <span class="hljs-attr">email</span>: <span class="hljs-string">'123@163.com'</span>,
    <span class="hljs-attr">tel</span>: <span class="hljs-string">'15181589155'</span>,
    <span class="hljs-attr">name</span>: <span class="hljs-string">'李小白'</span>,
    <span class="hljs-attr">time</span>: <span class="hljs-string">'2017-11-11'</span>,
    <span class="hljs-attr">avatar</span>: avatarLee
  },
  {
    <span class="hljs-attr">username</span>: <span class="hljs-string">'zhangsan'</span>,
    <span class="hljs-attr">password</span>: <span class="hljs-string">'123456'</span>,
    <span class="hljs-attr">email</span>: <span class="hljs-string">'321@163.com'</span>,
    <span class="hljs-attr">tel</span>: <span class="hljs-string">'13789546327'</span>,
    <span class="hljs-attr">name</span>: <span class="hljs-string">'张三'</span>,
    <span class="hljs-attr">time</span>: <span class="hljs-string">'2017-08-17'</span>,
    <span class="hljs-attr">avatar</span>: avatarZhang
  }
]
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {users}</code></pre>

<hr>
<h3 id="articleHeader3">3、写mock-adapter 接口</h3>
<p>在data文件夹下写一个index.js</p>
<blockquote><p>mock.js</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import axios from 'axios'
import Adapter from 'axios-mock-adapter'
import {users} from './data'
import avatarDefault from '../assets/logo.png'
export default {
  init () {
    // 创建Adapter 实例
    const mock = new Adapter(axios)

    // 模拟登录接口
    mock.onPost('/login').reply(config => {
      // 解析axios传过来的数据
      let {username, password} = JSON.parse(config.data)
      return new Promise((resolve, reject) => {
        // 先创建一个用户为空对象
        let user = {}
        // 判断模拟的假数据中是否有和传过来的数据匹配的
        let hasUser = users.some(person => {
          // 如果存在这样的数据
          if (person.username === username &amp;&amp; person.password === password) {
            let user = JSON.parse(JSON.stringify(person))
            user.password = ''
            return true
          } else {
            // 如果没有这个person
            return false
          }
        })
        // 如果有这么一个人
        if (hasUser) {
          resolve([200, { code: 200, msg: '登录成功', user }])
          // 如果没有这个人
        } else {
          resolve([200, { code: 500, msg: '账号或密码错误' }])
        }
      })
    })

    // 模拟注册接口
    mock.onPost('/regin').reply(config => {
      let {username, password, email, tel, name} = config.params
      users.push({
        username: username,
        password: password,
        email: email,
        name: name,
        tel: tel,
        avatar: avatarDefault
      })
      return new Promise((resolve, reject) => {
        resolve(config.data)
      })
    })
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">'axios'</span>
<span class="hljs-keyword">import</span> Adapter <span class="hljs-keyword">from</span> <span class="hljs-string">'axios-mock-adapter'</span>
<span class="hljs-keyword">import</span> {users} <span class="hljs-keyword">from</span> <span class="hljs-string">'./data'</span>
<span class="hljs-keyword">import</span> avatarDefault <span class="hljs-keyword">from</span> <span class="hljs-string">'../assets/logo.png'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  init () {
    <span class="hljs-comment">// 创建Adapter 实例</span>
    <span class="hljs-keyword">const</span> mock = <span class="hljs-keyword">new</span> Adapter(axios)

    <span class="hljs-comment">// 模拟登录接口</span>
    mock.onPost(<span class="hljs-string">'/login'</span>).reply(<span class="hljs-function"><span class="hljs-params">config</span> =&gt;</span> {
      <span class="hljs-comment">// 解析axios传过来的数据</span>
      <span class="hljs-keyword">let</span> {username, password} = <span class="hljs-built_in">JSON</span>.parse(config.data)
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
        <span class="hljs-comment">// 先创建一个用户为空对象</span>
        <span class="hljs-keyword">let</span> user = {}
        <span class="hljs-comment">// 判断模拟的假数据中是否有和传过来的数据匹配的</span>
        <span class="hljs-keyword">let</span> hasUser = users.some(<span class="hljs-function"><span class="hljs-params">person</span> =&gt;</span> {
          <span class="hljs-comment">// 如果存在这样的数据</span>
          <span class="hljs-keyword">if</span> (person.username === username &amp;&amp; person.password === password) {
            <span class="hljs-keyword">let</span> user = <span class="hljs-built_in">JSON</span>.parse(<span class="hljs-built_in">JSON</span>.stringify(person))
            user.password = <span class="hljs-string">''</span>
            <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>
          } <span class="hljs-keyword">else</span> {
            <span class="hljs-comment">// 如果没有这个person</span>
            <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
          }
        })
        <span class="hljs-comment">// 如果有这么一个人</span>
        <span class="hljs-keyword">if</span> (hasUser) {
          resolve([<span class="hljs-number">200</span>, { <span class="hljs-attr">code</span>: <span class="hljs-number">200</span>, <span class="hljs-attr">msg</span>: <span class="hljs-string">'登录成功'</span>, user }])
          <span class="hljs-comment">// 如果没有这个人</span>
        } <span class="hljs-keyword">else</span> {
          resolve([<span class="hljs-number">200</span>, { <span class="hljs-attr">code</span>: <span class="hljs-number">500</span>, <span class="hljs-attr">msg</span>: <span class="hljs-string">'账号或密码错误'</span> }])
        }
      })
    })

    <span class="hljs-comment">// 模拟注册接口</span>
    mock.onPost(<span class="hljs-string">'/regin'</span>).reply(<span class="hljs-function"><span class="hljs-params">config</span> =&gt;</span> {
      <span class="hljs-keyword">let</span> {username, password, email, tel, name} = config.params
      users.push({
        <span class="hljs-attr">username</span>: username,
        <span class="hljs-attr">password</span>: password,
        <span class="hljs-attr">email</span>: email,
        <span class="hljs-attr">name</span>: name,
        <span class="hljs-attr">tel</span>: tel,
        <span class="hljs-attr">avatar</span>: avatarDefault
      })
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
        resolve(config.data)
      })
    })
  }
}</code></pre>
<h3 id="articleHeader4">4、配置一下adapter</h3>
<p>main.js</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012085946?w=648&amp;h=172" src="https://static.alili.tech/img/remote/1460000012085946?w=648&amp;h=172" alt="Image 073.png" title="Image 073.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader5">5、测试</h3>
<p>cnpm run dev</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012085947?w=932&amp;h=584" src="https://static.alili.tech/img/remote/1460000012085947?w=932&amp;h=584" alt="Image 074.png" title="Image 074.png" style="cursor: pointer;"></span></p>
<p>这好尴尬，我添加的假数据用户名没7位，其实用户名没必要这么长啊，改成3位好了</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012085948" src="https://static.alili.tech/img/remote/1460000012085948" alt="Image 075.png" title="Image 075.png" style="cursor: pointer;"></span></p>
<p>还有问题，来了三个警告，有没有大神指教一下</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012085949?w=836&amp;h=666" src="https://static.alili.tech/img/remote/1460000012085949?w=836&amp;h=666" alt="Image 076.png" title="Image 076.png" style="cursor: pointer;"></span></p>
<p>不过应该不影响逻辑的，继续测试</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012085950?w=639&amp;h=487" src="https://static.alili.tech/img/remote/1460000012085950?w=639&amp;h=487" alt="Image 077.png" title="Image 077.png" style="cursor: pointer; display: inline;"></span><br>额<br><span class="img-wrap"><img data-src="/img/remote/1460000012085951?w=1240&amp;h=217" src="https://static.alili.tech/img/remote/1460000012085951?w=1240&amp;h=217" alt="Image 078.png" title="Image 078.png" style="cursor: pointer; display: inline;"></span></p>
<p>跳转顺利，但数据了？？？？找找问题</p>

<hr>
<blockquote><p>找到原因了</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012085952?w=1240&amp;h=392" src="https://static.alili.tech/img/remote/1460000012085952?w=1240&amp;h=392" alt="Image 079.png" title="Image 079.png" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>测试了几次，找到问题了，<br>mock.js写出问题了<br>这是原来的代码</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012085953?w=798&amp;h=348" src="https://static.alili.tech/img/remote/1460000012085953?w=798&amp;h=348" alt="Image 080.png" title="Image 080.png" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>首先定义了let user = {}，<br>在下面的if（）里面，我又 let user = ‘我们要返回的数据’<br>然后在if ()以及hasUser()的外面我resolve user回去的时候，因为作用域的问题，自然就是把这个空的user 返回回去了<br>正确的写法就是把if()里面let user = xxxxx,的let去掉</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012085954?w=841&amp;h=506" src="https://static.alili.tech/img/remote/1460000012085954?w=841&amp;h=506" alt="Image 081.png" title="Image 081.png" style="cursor: pointer;"></span></p>
<blockquote><p>因为测试了几次，所以可以看见在console 里面居然看见了2个user的信息，这个user可是写进sessionStorage的啊，按道理sessionStorage里面只该有一个user的信息，这个太危险了，不过我们还是把header上的按钮先变成用户信息吧</p></blockquote>
<p>打开header.vue<br>首先添加这些代码：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012085955?w=514&amp;h=326" src="https://static.alili.tech/img/remote/1460000012085955?w=514&amp;h=326" alt="Image 082.png" title="Image 082.png" style="cursor: pointer;"></span></p>
<p>然后把其它功能完善一下</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012085956?w=878&amp;h=265" src="https://static.alili.tech/img/remote/1460000012085956?w=878&amp;h=265" alt="Image 083.png" title="Image 083.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012085957?w=475&amp;h=277" src="https://static.alili.tech/img/remote/1460000012085957?w=475&amp;h=277" alt="Image 084.png" title="Image 084.png" style="cursor: pointer;"></span></p>
<p>测试一下</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012085958?w=985&amp;h=337" src="https://static.alili.tech/img/remote/1460000012085958?w=985&amp;h=337" alt="Image 085.png" title="Image 085.png" style="cursor: pointer;"></span></p>
<p>看起来效果还是不错的</p>
<p>但点击我的工作太，退出登录居然没效果，然后我改为这样</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012085959?w=817&amp;h=152" src="https://static.alili.tech/img/remote/1460000012085959?w=817&amp;h=152" alt="Image 086.png" title="Image 086.png" style="cursor: pointer;"></span></p>
<p>就有效果了</p>
<blockquote><p>这是为什么？？？有时候用@click.native没有效果，要用@click，有时候正好相反@click没效果，要用@click.native，有没有大佬来解惑一番？</p></blockquote>

<hr>
<p>然后我又发现一个问题了，是这样的，我先退出登录</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012085960?w=1240&amp;h=413" src="https://static.alili.tech/img/remote/1460000012085960?w=1240&amp;h=413" alt="Image 087.png" title="Image 087.png" style="cursor: pointer; display: inline;"></span></p>
<p>然后登录</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012085961?w=1240&amp;h=299" src="https://static.alili.tech/img/remote/1460000012085961?w=1240&amp;h=299" alt="Image 088.png" title="Image 088.png" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>很明显sessionStorage里面用户数据是存在的，但右上角还是登录按钮，并没有变为用户信息？</p></blockquote>
<blockquote><p>我本来以为是mounted 写错了，但发现并不是，因为我刷新一下就这样了</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012085962" src="https://static.alili.tech/img/remote/1460000012085962" alt="Image 089.png" title="Image 089.png" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>变正常了？并不是，我仔细思考了一下，mounted是在页面创建的时候执行，我刷新一下，右边是先有了上面的user数据，才出现下面的warning和console，所以事实是这样的</p></blockquote>

<hr>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012085963?w=1240&amp;h=299" src="https://static.alili.tech/img/remote/1460000012085963?w=1240&amp;h=299" alt="Image 088.png" title="Image 088.png" style="cursor: pointer;"></span></p>
<blockquote><p>我登录之后，user数据写入sessionStorage，然后跳转到manger/my页面，而中间那个main部分的页面是才创建的，会显示name,而header.vue这个页面是我打开浏览器，输入这个地址的时候创建的，不管我登录、注册还是登出，切换到那个页面，header.vue并没有被销毁后重建，自然不会执行mounted()这个行为。只有我刷新页面它才会执行。</p></blockquote>
<blockquote><p>当然既然知道问题出在哪里，那自然就能找出解决的办法</p></blockquote>
<ul><li><p>1：换一个写法，app.vue里面不要写header,footer</p></li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012085964" src="https://static.alili.tech/img/remote/1460000012085964" alt="Image 090.png" title="Image 090.png" style="cursor: pointer;"></span></p>
<p>把header,footer，写在home里面，这样跳转的时候就可以整个页面重建了，但这样的话要修改很多地方，路由要重写，很麻烦。</p>
<ul><li><p>2、用$emit 和$on的方法，就是组件之间通讯，但我看到一个专门干这事的vuex之后，本着多学习的思想，决定用vuex来解决，虽然看起来用vuex更麻烦一些。</p></li></ul>
<blockquote><p>突然看见上面的图片写着&lt;el-footer class="el-footer."&gt;，这个.让我很是羞愧啊，辣眼睛，赶紧去改掉。</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue vue-router vuex element-ui axios 的学习笔记（七）完善登录注册

## 原文链接
[https://segmentfault.com/a/1190000012085941](https://segmentfault.com/a/1190000012085941)

