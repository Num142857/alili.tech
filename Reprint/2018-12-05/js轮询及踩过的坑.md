---
title: 'js轮询及踩过的坑' 
date: 2018-12-05 2:30:09
hidden: true
slug: ciktg3r2shv
categories: [reprint]
---

{{< raw >}}

                    
<h4>背景</h4>
<p>下午四点，天气晴朗，阳光明媚，等着下班<br>产品：我希望页面上的这个数据实时变化<br>开发：···，可以，用那个叫着WebSocket的东西，再找一个封装好框架，如：mqtt（感觉自己好机智）<br>产品：要开发好久<br>开发：嗯，三天，五天，还是···<br>产品：我希望今天上线<br>开发：···，···，···（不能描述的语言，话说segmentfault为什么不支持表情）<br>开发：果断选择轮询</p>
<h4>开发中</h4>
<pre><code>&lt;!DOCTYPE HTML&gt;
&lt;html&gt;
&lt;head&gt;
  &lt;title&gt;轮询的坑&lt;/title&gt;
  &lt;meta http-equiv="Content-Type" content="text/html; charset=utf-8"/&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;/body&gt;
&lt;script type="text/javascript"&gt;
  function getData() {
      return new Promise((resolve,reject) =&gt; {
          setTimeout(() =&gt; {
              resolve({data:666})
          },500)
      })
  }
  // 轮询
  async function start () {
    const { data } = await getData() // 模拟请求
    console.log(data)
    timerId = setTimeout(start, 1000)
  }
  start ()
&lt;/script&gt;
&lt;/html&gt;</code></pre>
<p>开发：今晚的月亮真圆啊，下班了···</p>
<h4>第二天</h4>
<p>产品：我希望这个实时加载，能随心所欲，我喊它加载就加载，喊它停就停<br>研发：(石化中···)</p>
<h4>继续开发中</h4>
<pre><code>&lt;!DOCTYPE HTML&gt;
&lt;html&gt;
&lt;head&gt;
  &lt;title&gt;轮询的坑&lt;/title&gt;
  &lt;meta http-equiv="Content-Type" content="text/html; charset=utf-8"/&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;button id="button"&gt;暂停&lt;/button&gt;
&lt;/body&gt;
&lt;script type="text/javascript"&gt;
  let timerId = null
  function getData() {
      return new Promise((resolve,reject) =&gt; {
          setTimeout(() =&gt; {
              resolve({data:666})
          },500)
      })
  }
  // 轮询
  async function start () {
    const { data } = await getData() // 模拟请求
    console.log(data)
    timerId = setTimeout(start, 1000)
  }
  // 暂停
  function stop () {
    clearTimeout(timerId)
  }

  start ()

  const botton = document.querySelector("#button")
  let isPlay = true
  botton.addEventListener("click", function(){
    isPlay = !isPlay
    botton.innerHTML = isPlay ? '暂停' : '播放'
    isPlay ? start() : stop()
  }, false)
&lt;/script&gt;
&lt;/html&gt;
</code></pre>
<p>开发：（这么难得需求我都实现了，我是不是已经是专家了，我是不是应该升职加薪，接着赢娶白富美，走向人生巅峰，哈哈哈）<br>正沉醉于自己的成果中<br>产品：你的有bug<br>开发：（绝对不信中，肯定是你握鼠标的姿势不对，手感不好），怎么可能有bug，你是不是环境有问题，还在用ie6，多刷新几次<br>产品：···，你按钮多点几次，点快点，试试，数据会多次请求<br>开发：半信半疑的去尝试，还真是（好奇怪，检查了一圈没有发现任何问题）</p>
<h4>分析过程</h4>
<ol>
<li>一进去页面执行start()，start是一个async函数,使得里面的异步也会像同步一样执行，函数的末尾timerId = setTimeout(start, 1000)，1000毫秒后再次执行start()，形成了一个轮询（这里的每一个请求之间的间隔肯定是大于1000+500的，至于为什么，可以去了解一下浏览器异步执行原理）</li>
<li>将setTimeout的id赋值给timerId，点击按钮后，清除当前定时器</li>
</ol>
<p>看似没有任何问题，找不到问题的时候就只有一点点试错，最终发现去掉const { data } = await getData()之后，问题消失，请求的时间越长，出现的概率越高<br>画个图分析一下<br><span class="img-wrap"><img data-src="/img/bV8PG5?w=966&amp;h=996" src="https://static.alili.tech/img/bV8PG5?w=966&amp;h=996" alt="图片描述" title="图片描述"></span><br>先看一下js执行过程，按钮的click事件也相当于异步，然后我们再来文字分析一下，问题出现的原因</p>
<h4>bug出现原因</h4>
<ol>
<li>假如没有const { data } = await getData()这步，点击的时候，click的回调函数能够执行，说明当前js肯定处于空闲状态（永远记住，js的单线程的），这时的setTimeout(start, 1000)一定处于异步状态或消息队列中(js一次只有执行一个任务)，</li>
<li>clearTimeout(timerId)可以很轻松的清除这次任务，不会让它进入js执行线程中执行</li>
<li>加上const { data } = await getData()之后，如果js现在处于setTimeout的回调函数已经执行并且等待await getData()中，js是空闲的，click可以执行，click清除了setTimeout的回调函数的执行（回调函数已经执行了），没有清除await getData()回调函数的执行，代码会继续执行console.log(data)；timerId = setTimeout(start, 1000)，从而不能停止循环，这就是bug产生的原因</li>
</ol>
<p>bug产生的时机<br><span class="img-wrap"><img data-src="/img/bV8SrM?w=1878&amp;h=1900" src="https://static.alili.tech/img/bV8SrM?w=1878&amp;h=1900" alt="图片描述" title="图片描述"></span></p>
<p>这就是为什么，请求的时间越长，出现的概率越高</p>
<h4>解决方案</h4>
<pre><code>&lt;!DOCTYPE HTML&gt;
&lt;html&gt;
&lt;head&gt;
  &lt;title&gt;轮询的坑&lt;/title&gt;
  &lt;meta http-equiv="Content-Type" content="text/html; charset=utf-8"/&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;button id="button"&gt;暂停&lt;/button&gt;
&lt;/body&gt;
&lt;script type="text/javascript"&gt;
  let timerId = 1 // 模拟计时器id，唯一性
  let timerObj = {} // 计时器存储器
  function getData() {
      return new Promise((resolve,reject) =&gt; {
          setTimeout(() =&gt; {
              resolve({data:666})
          },500)
      })
  }
  // 轮询
  function start () {
    const id = timerId++
    timerObj[id] = true
    async function timerFn () {
      if (!timerObj[id]) return
      const { data } = await getData() // 模拟请求
      console.log(data)
      setTimeout(timerFn, 1000)
    }
    timerFn()
  }
  // 暂停
  function stop () {
    timerObj = {}
  }

  start ()

  const botton = document.querySelector("#button")
  let isPlay = true
  botton.addEventListener("click", function(){
    isPlay = !isPlay
    botton.innerHTML = isPlay ? '暂停' : '播放'
    isPlay ? start() : stop()
  }, false)
&lt;/script&gt;
&lt;/html&gt;
</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
js轮询及踩过的坑

## 原文链接
[https://segmentfault.com/a/1190000014460305](https://segmentfault.com/a/1190000014460305)

