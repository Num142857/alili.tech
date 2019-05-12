---
title: '记一次基于mpvue的小程序开发及上线实战' 
date: 2018-12-04 2:30:05
hidden: true
slug: fhn0cp4hzsq
categories: [reprint]
---

{{< raw >}}

                    
<ul>
<li>小程序名称：一起打车吧</li>
<li>项目地址：<p>客户端：<a href="https://github.com/jrainlau/taxi-together-client" rel="nofollow noreferrer">https://github.com/jrainlau/t...</a></p>
<p>服务端：<a href="https://github.com/jrainlau/taxi-together-server" rel="nofollow noreferrer">https://github.com/jrainlau/t...</a></p>
</li>
<li>小程序二维码：<p><span class="img-wrap"><img data-src="/img/bV80yH?w=258&amp;h=258" src="https://static.alili.tech/img/bV80yH?w=258&amp;h=258" alt="clipboard.png" title="clipboard.png"></span></p>
</li>
</ul>
<p>经过为期两个晚上下班时间的努力，终于把我第一个小程序开发完成并发布上线了。整个过程还算顺利，由于使用了<code>mpvue</code>方案进行开发，故可以享受和<code>vue</code>一致的流畅开发体验；后台系统使用了<code>python3</code>+<code>flask</code>框架进行，使用最少的代码完成了小程序的后台逻辑。除了开发之外，还实实在在地体验了一把微信小程序的开发流程，包括开发者工具的使用、体验版的发布、上线的申请等等。这些开发体验都非常值得被记录下来，于是便趁热打铁，写下这篇文章。</p>
<h1>一、需求&amp;功能</h1>
<p>由于公司里有相当多的同事都住在同一个小区，所以上下班的时候经常会在公司群里组织拼车。但是由于完全依赖聊天记录，且上下班拼车的同事也很多，依赖群聊很容易把消息刷走，而且容易造成信息错乱。既然如此，那么完全可以开发一个小工具把这些问题解决。</p>
<p>发起拼车的人把出发地点、目的地点、打车信息以卡片的形式分享出来，参与拼车的人点击卡片就能选择参加拼车，并且能看到同车拼友是谁，拼单的信息等等内容。</p>
<p>交互流程如下：</p>
<p><span class="img-wrap"><img data-src="/img/bV80SJ?w=576&amp;h=984" src="https://static.alili.tech/img/bV80SJ?w=576&amp;h=984" alt="clipboard.png" title="clipboard.png"></span></p>
<p>可以看到，逻辑是非常简单的，我们只需要保证生成拼单、分享拼单、进入拼单和退出拼单这四个功能就好。</p>
<p>需求和功能已经确定好，首先按照<a href="https://developers.weixin.qq.com/miniprogram/dev/" rel="nofollow noreferrer">小程序官网</a>的介绍，注册好小程序并拿到<code>appId</code>，接下来可以开始进行后台逻辑的开发。</p>
<h1>二、后台逻辑开发</h1>
<p>由于时间仓促，功能又简单，所以并没有考虑任何高并发等复杂场景，仅仅考虑功能的实现。从需求的逻辑可以知道，其实后台只需要维护两个列表，分别存储<strong>当前所有拼车单</strong>以及<strong>当前所有参与了拼车的用户</strong>即可，其数据结构如下：</p>
<ul>
<li>当前所有拼单列表<code>billsList</code><p><span class="img-wrap"><img data-src="/img/bV801c?w=1436&amp;h=492" src="https://static.alili.tech/img/bV801c?w=1436&amp;h=492" alt="clipboard.png" title="clipboard.png"></span></p>
</li>
<li>当前所有参与了拼车的用户列表<code>inBillUsers</code><p><span class="img-wrap"><img data-src="/img/bV802B?w=1562&amp;h=448" src="https://static.alili.tech/img/bV802B?w=1562&amp;h=448" alt="clipboard.png" title="clipboard.png"></span></p>
</li>
</ul>
<p>当用户确定并分享了一个拼单之后，会直接新建一个拼单，同时把该用户添加到<strong>当前所有参与了拼车的用户列表</strong>列表里面，并且添加到该拼单的成员列表当中：</p>
<p><span class="img-wrap"><img data-src="/img/bV809B?w=1654&amp;h=464" src="https://static.alili.tech/img/bV809B?w=1654&amp;h=464" alt="clipboard.png" title="clipboard.png"></span></p>
<p>只要维护好这两个列表，接下来就是具体的业务逻辑了。</p>
<p>为了快速开发，这里我使用了<code>python3</code>+<code>flask</code>框架的方案。不懂<code>python</code>的读者看到这里也不用紧张，代码非常简单且直白，看看也无妨。</p>
<p>首先新建一个<code>BillController</code>类：</p>
<pre><code class="python">class BillController:
    billsList = []
    inBillUsers = []</code></pre>
<p>接下来会在这个类的内部添加<strong>创建拼单</strong>、<strong>获取拼单</strong>、<strong>参与拼单</strong>、<strong>退出拼单</strong>、<strong>判断用户是否在某一拼单中</strong>、<strong>图片上传</strong>的功能。</p>
<h3>1、获取拼单<code>getBill()</code>
</h3>
<p>该方法接收客户端传来的拼单ID，然后拿这个ID去检索是否存在对应的拼单。若存在则返回对应的拼单，否则报错给客户端。</p>
<pre><code class="python">    def getBill(self, ctx):
        ctxBody = ctx.form
        billId = ctxBody['billId']
        try: 
            return response([item for item in self.billsList if item['billId'] == billId][0])
        except IndexError:
            return response({
                'errMsg': '拼单不存在！',
                'billsList': self.billsList,
            }, 1)</code></pre>
<h3>2、创建拼单<code>createBill()</code>
</h3>
<p>该方法会接收来自客户端的<strong>用户信息</strong>和<strong>拼单信息</strong>，分别添加到<code>billsList</code>和<code>inBillUsers</code>当中。</p>
<pre><code class="python">    def createBill(self, ctx):
        ctxBody = ctx.form
        user = {
            'userId': ctxBody['userId'],
            'billId': ctxBody['billId'],
            'name': ctxBody['name'],
            'avatar': ctxBody['avatar']
        }
        bill = {
            'billId': ctxBody['billId'],
            'from': ctxBody['from'],
            'to': ctxBody['to'],
            'time': ctxBody['time'],
            'members': [user]
        }

        if ctxBody['userId'] in [item['userId'] for item in self.inBillUsers]:
            return response({
                'errMsg': '用户已经在拼单中！'
            }, 1)

        self.billsList.append(bill)
        self.inBillUsers.append(user)
        return response({
            'billsList': self.billsList,
            'inBillUsers': self.inBillUsers
        })</code></pre>
<p>创建完成后，会返回当前的<code>billsList</code>和<code>inBillUsers</code>到客户端。</p>
<h3>3、参与拼单<code>joinBill()</code>
</h3>
<p>接收客户端传来的<strong>用户信息</strong>和<strong>拼单ID</strong>，把用户添加到拼单和<code>inBillUsers</code>列表中。</p>
<pre><code class="python">    def joinBill(self, ctx):
        ctxBody = ctx.form
        billId = ctxBody['billId']
        user = {
            'userId': ctxBody['userId'],
            'name': ctxBody['name'],
            'avatar': ctxBody['avatar'],
            'billId': ctxBody['billId']
        }
        if ctxBody['userId'] in [item['userId'] for item in self.inBillUsers]:
            return response({
                'errMsg': '用户已经在拼单中！'
            }, 1)
        theBill = [item for item in self.billsList if item['billId'] == billId]
        if not theBill:
            return response({
                'errMsg': '拼单不存在'
            }, 1)
        theBill[0]['members'].append(user)
        self.inBillUsers.append(user)
        return response({
            'billsList': self.billsList,
            'inBillUsers': self.inBillUsers
        })</code></pre>
<h3>4、退出拼单<code>leaveBill()</code>
</h3>
<p>接收客户端传来的<strong>用户ID</strong>和<strong>拼单ID</strong>，然后删除掉两个列表里面的该用户。</p>
<p>这个函数还有一个功能，如果判断到这个拼单ID所对应的拼单成员为空，会认为该拼单已经作废，会直接删除掉这个拼单以及所对应的车辆信息图片。</p>
<pre><code class="python">    def leaveBill(self, ctx):
        ctxBody = ctx.form
        billId = ctxBody['billId']
        userId = ctxBody['userId']
        indexOfUser = [i for i, member in enumerate(self.inBillUsers) if member['userId'] == userId][0]
        indexOfTheBill = [i for i, bill in enumerate(self.billsList) if bill['billId'] == billId][0]
        indexOfUserInBill = [i for i, member in enumerate(self.billsList[indexOfTheBill]['members']) if member['userId'] == userId][0]
        # 删除拼单里面的该用户
        self.billsList[indexOfTheBill]['members'].pop(indexOfUserInBill)
        # 删除用户列表里面的该用户
        self.inBillUsers.pop(indexOfUser)
        # 如果拼单里面用户为空，则直接删除这笔拼单
        if len(self.billsList[indexOfTheBill]['members']) == 0:
            imgPath = './imgs/' + self.billsList[indexOfTheBill]['img'].split('/getImg')[1]
            if os.path.exists(imgPath):
                os.remove(imgPath)
            self.billsList.pop(indexOfTheBill)
        return response({
            'billsList': self.billsList,
            'inBillUsers': self.inBillUsers
        })</code></pre>
<h3>5、判断用户是否在某一拼单中<code>inBill()</code>
</h3>
<p>接收客户端传来的<strong>用户ID</strong>，接下来会根据这个用户ID去<code>inBillUsers</code>里面去检索该用户所对应的拼单，如果能检索到，会返回其所在的拼单。</p>
<pre><code class="python">    def inBill(self, ctx):
        ctxBody = ctx.form
        userId = ctxBody['userId']
        if ctxBody['userId'] in [item['userId'] for item in self.inBillUsers]:
            return response({
                'inBill': [item for item in self.inBillUsers if ctxBody['userId'] == item['userId']][0],
                'billsList': self.billsList,
                'inBillUsers': self.inBillUsers
            })
        return response({
            'inBill': False,
            'billsList': self.billsList,
            'inBillUsers': self.inBillUsers
        })</code></pre>
<h3>6、图片上传<code>uploadImg()</code>
</h3>
<p>接收客户端传来的<strong>拼单ID</strong>和<strong>图片资源</strong>，先存储图片，然后把该图片的路径写入对应拼单ID的拼单当中。</p>
<pre><code class="python">    def uploadImg(self, ctx):
        billId = ctx.form['billId']
        file = ctx.files['file']
        filename = file.filename
        file.save(os.path.join('./imgs', filename))
        # 把图片信息挂载到对应的拼单
        indexOfTheBill = [i for i, bill in enumerate(self.billsList) if bill['billId'] == billId][0]
        self.billsList[indexOfTheBill]['img'] = url_for('getImg', filename=filename)
        return response({
            'billsList': self.billsList
        })</code></pre>
<p>完成了业务逻辑的功能，接下来就是把它们分发给不同的路由了：</p>
<pre><code class="python">@app.route('/create', methods = ['POST'])
def create():
    return controller.createBill(request)

@app.route('/join', methods = ['POST'])
def join():
    return controller.joinBill(request)

@app.route('/leave', methods = ['POST'])
def leave():
    return controller.leaveBill(request)

@app.route('/getBill', methods = ['POST'])
def getBill():
    return controller.getBill(request)

@app.route('/inBill', methods = ['POST'])
def inBill():
    return controller.inBill(request)

@app.route('/uploadImg', methods = ['POST'])
def uploadImg():
    return controller.uploadImg(request)

@app.route('/getImg/&lt;filename&gt;')
def getImg(filename):
  return send_from_directory('./imgs', filename)</code></pre>
<p>完整的代码可以直接到<a href="https://github.com/jrainlau/taxi-together-server" rel="nofollow noreferrer">仓库</a>查看，这里仅展示关键的内容。</p>
<h1>三、前端业务开发</h1>
<p>前端借助<code>vue-cli</code>直接使用了mpvue的<a href="https://github.com/mpvue/mpvue-quickstart" rel="nofollow noreferrer">mpvue-quickstart</a>来初始化项目，具体过程不再细述，直接进入业务开发部分。</p>
<p>首先，微信小程序的API都是callback风格，为了使用方便，我把用到的小程序API都包装成了<code>Promise</code>，统一放在<code>src/utils/wx.js</code>内部，类似下面这样：</p>
<pre><code class="javascript">export const request = obj =&gt; new Promise((resolve, reject) =&gt; {
  wx.request({
    url: obj.url,
    data: obj.data,
    header: { 'content-type': 'application/x-www-form-urlencoded', ...obj.header },
    method: obj.method,
    success (res) {
      resolve(res.data.data)
    },
    fail (e) {
      console.log(e)
      reject(e)
    }
  })
})
</code></pre>
<h3>1、注册全局Store</h3>
<p>由于开发习惯，我喜欢把所有接口请求都放在store里面的<code>actions</code>当中，所以这个小程序也是需要用到<code>Vuex</code>。但由于小程序每一个Page都是一个新的Vue实例，所以按照Vue的方式，用全局<code>Vue.use(Vuex)</code>是不会把<code>$store</code>注册到实例当中的，这一步要手动来。</p>
<p>在<code>src/</code>目录下新建一个<code>store.js</code>文件，然后在里面进行使用注册：</p>
<pre><code>import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({})</code></pre>
<p>接下来在<code>src/main.js</code>当中，手动在Vue的原型里注册一个<code>$store</code>：</p>
<pre><code class="javascript">import Vue from 'vue'
import App from './App'
import Store from './store'

Vue.prototype.$store = Store</code></pre>
<p>这样，以后在任何的Page里都可以通过<code>this.$store</code>来操作这个全局Store了。</p>
<h3>2、构建好请求的API接口</h3>
<p>和后台系统的逻辑对应，前端也要构造好各个请求的API接口，这样的做法能够避免把API逻辑分散到页面四处，具有清晰、易维护的优势。</p>
<pre><code class="javascript">    /**
     * @param  {} {commit}
     * 获取用户公开信息
     */
    async getUserInfo ({ commit }) {
      const { userInfo } = await getUserInfo({
        withCredenitals: false
      })
      userInfo.avatar = userInfo.avatarUrl
      userInfo.name = userInfo.nickName
      userInfo.userId = encodeURIComponent(userInfo.nickName + userInfo.city + userInfo.gender + userInfo.country)
      commit('GET_USER_INFO', userInfo)
      return userInfo
    },
    /**
     * @param  {} {commit}
     * @param  { String } userId 用户ID
     * 检查用户是否已经存在于某一拼单中
     */
    async checkInBill ({ commit }, userId) {
      const res = await request({
        method: 'post',
        url: `${apiDomain}/inBill`,
        data: {
          userId
        }
      })
      return res
    },
    /**
     * @param  {} {commit}
     * @param  { String } userId 用户ID
     * @param  { String } name   用户昵称
     * @param  { String } avatar 用户头像
     * @param  { String } time   出发时间
     * @param  { String } from   出发地点
     * @param  { String } to     目的地点
     * @param  { String } billId 拼单ID
     * 创建拼单
     */
    async createBill ({ commit }, { userId, name, avatar, time, from, to, billId }) {
      const res = await request({
        method: 'post',
        url: `${apiDomain}/create`,
        data: {
          userId,
          name,
          avatar,
          time,
          from,
          to,
          billId
        }
      })
      commit('GET_BILL_INFO', res)
      return res
    },
    /**
     * @param  {} {commit}
     * @param  { String } billId 拼单ID
     * 获取拼单信息
     */
    async getBillInfo ({ commit }, billId) {
      const res = await request({
        method: 'post',
        url: `${apiDomain}/getBill`,
        data: {
          billId
        }
      })
      return res
    },
    /**
     * @param  {} {commit}
     * @param  { String } userId 用户ID
     * @param  { String } name   用户昵称
     * @param  { String } avatar 用户头像
     * @param  { String } billId 拼单ID
     * 参加拼单
     */
    async joinBill ({ commit }, { userId, name, avatar, billId }) {
      const res = await request({
        method: 'post',
        url: `${apiDomain}/join`,
        data: {
          userId,
          name,
          avatar,
          billId
        }
      })
      return res
    },
    /**
     * @param  {} {commit}
     * @param  { String } userId 用户ID
     * @param  { String } billId 拼单ID
     * 退出拼单
     */
    async leaveBill ({ commit }, { userId, billId }) {
      const res = await request({
        method: 'post',
        url: `${apiDomain}/leave`,
        data: {
          userId,
          billId
        }
      })
      return res
    },
    /**
     * @param  {} {commit}
     * @param  { String } filePath 图片路径
     * @param  { String } billId   拼单ID
     * 参加拼单
     */
    async uploadImg ({ commit }, { filePath, billId }) {
      const res = await uploadFile({
        url: `${apiDomain}/uploadImg`,
        header: {
          'content-type': 'multipart/form-data'
        },
        filePath,
        name: 'file',
        formData: {
          'billId': billId
        }
      })
      return res
    }</code></pre>
<h3>3、填写拼单并实现分享功能实现</h3>
<p>新建一个<code>src/pages/index</code>目录，作为小程序的首页。</p>
<p>该首页的业务逻辑如下：</p>
<ol>
<li>进入首页的时候先获取用户信息，得到userId</li>
<li>然后用userId去请求判断是否已经处于拼单</li>
<li>若是，则跳转到对应拼单Id的详情页</li>
<li>若否，才允许新建拼单</li>
</ol>
<p>在<code>onShow</code>的生命周期钩子中实现上述逻辑：</p>
<pre><code>  async onShow () {
    this.userInfo = await this.$store.dispatch('getUserInfo')
    const inBill = await this.$store.dispatch('checkInBill', this.userInfo.userId)

    if (inBill.inBill) {
      wx.redirectTo(`../join/main?billId=${inBill.inBill.billId}&amp;fromIndex=true`)
    }
  },</code></pre>
<p>当用户填写完拼单后，会点击一个带有<code>open-type="share"</code>属性的button，然后会触发<code>onShareAppMessage</code>生命周期钩子的逻辑把拼单构造成卡片分享出去。当分享成功后会跳转到对应拼单ID的参加拼单页。</p>
<pre><code>  onShareAppMessage (result) {
    let title = '一起拼车'
    let path = '/pages/index'
    if (result.from === 'button') {
      this.billId = 'billId-' + new Date().getTime()
      title = '我发起了一个拼车'
      path = `pages/join/main?billId=${this.billId}`
    }
    return {
      title,
      path,
      success: async (res) =&gt; {
        await this.$store.dispatch('createBill', { ...this.userInfo, ...this.billInfo })

        // 上传图片
        await this.$store.dispatch('uploadImg', {
          filePath: this.imgSrc,
          billId: this.billId
        })
        
        // 分享成功后，会带着billId跳转到参加拼单页
        wx.redirectTo(`../join/main?billId=${this.billId}`)
      },
      fail (e) {
        console.log(e)
      }
    }
  },</code></pre>
<h3>4、参与拼单&amp;退出拼单功能实现</h3>
<p>新建一个<code>src/pages/join</code>目录，作为小程序的“参加拼单页”。</p>
<p>该页面的运行逻辑如下：</p>
<ol>
<li>首先会获取从url里面带来的billId</li>
<li>其次会请求一次userInfo，获取userId</li>
<li>然后拿这个userId去检查该用户是否已经处于拼单</li>
<li>如果已经处于拼单，那么就会获取一个新的billId代替从url获取的</li>
<li>拿当前的billId去查询对应的拼单信息</li>
<li>如果billId都无效，则redirect到首页</li>
</ol>
<p>由于要获取url携带的内容，亲测<code>onShow()</code>是不行的，只能在<code>onLoad()</code>里面获取：</p>
<pre><code>  async onLoad (options) {
    // 1. 首先会获取从url里面带来的billId
    this.billId = options.billId
    // 2. 其次会请求一次userInfo，获取userId
    this.userInfo = await this.$store.dispatch('getUserInfo')
    // 3. 然后拿这个userId去检查该用户是否已经处于拼单
    const inBill = await this.$store.dispatch('checkInBill', this.userInfo.userId)
    // 4. 如果已经处于拼单，那么就会有一个billId
    if (inBill.inBill) {
      this.billId = inBill.inBill.billId
    }
    // 5. 如果没有处于拼单，那么将请求当前billId的拼单
    // 6. 如果billId都无效，则redirect到首页，否则检查当前用户是否处于该拼单当中
    await this.getBillInfo()
  }</code></pre>
<p>此外，当用户点击“参与拼车”后，需要重新请求拼单信息，以刷新视图拼车人员列表；当用户点击“退出拼车”后，要重定向到首页。</p>
<p>经过上面几个步骤，客户端的逻辑已经完成，可以进行预发布了。</p>
<h1>四、预发布&amp;申请上线</h1>
<p>如果要发布预发布版本，需要运行<code>npm run build</code>命令，打包出一个生产版本的包，然后通过小程序开发者工具的<strong>上传</strong>按钮上传代码，并填写测试版本号：</p>
<p><span class="img-wrap"><img data-src="/img/bV81YU?w=1428&amp;h=486" src="https://static.alili.tech/img/bV81YU?w=1428&amp;h=486" alt="clipboard.png" title="clipboard.png"></span></p>
<p>接下来可以在小程序管理后台→开发管理→开发版本当中看到体验版小程序的信息，然后选择发布体验版即可：</p>
<p><span class="img-wrap"><img data-src="/img/bV81Y8?w=1304&amp;h=228" src="https://static.alili.tech/img/bV81Y8?w=1304&amp;h=228" alt="clipboard.png" title="clipboard.png"></span></p>
<p>当确定预发布测试无误之后，就可以点击“提交审核”，正式把小程序提交给微信团队进行审核。审核的时间非常快，在3小时内基本都能够有答复。</p>
<p>值得注意的是，小程序所有请求的API，都必须经过<strong>域名备案</strong>和<strong>使用https</strong>证书，同时要在设置→开发设置→服务器域名里面把API添加到白名单才可以正常使用。</p>
<h1>五、后记</h1>
<p>这个小程序现在已经发布上线了，算是完整体验了一把小程序的开发乐趣。小程序得到了微信团队的大力支持，以后的生态只会越来越繁荣。当初小程序上线的时候我也对它有一些抵触，但后来想了想，这只不过是前端工程师所需面对的又一个“端“而已，没有必要为它戴上有色眼镜，多掌握一些总是好的。</p>
<p>“一起打车吧”微信小程序依然是一个玩具般的存在，仅供自己学习和探索，当然也欢迎各位读者能够贡献代码，参与开发~</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
记一次基于mpvue的小程序开发及上线实战

## 原文链接
[https://segmentfault.com/a/1190000014506757](https://segmentfault.com/a/1190000014506757)

