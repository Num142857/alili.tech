---
title: '在 VueJS应用中管理用户权限' 
date: 2019-01-24 2:30:11
hidden: true
slug: 9x1g82x8t1
categories: [reprint]
---

{{< raw >}}

            <h1>在 VueJS应用中管理用户权限</h1>
<p>Anthony Gore 2018 年 1 月 8 日</p>
<p><a href="https://twitter.com/intent/tweet?text=Managing%20User%20Permissions%20in%20a%20VueJS%20App&amp;url=https://vuejsdevelopers.com/2018/01/08/vue-js-roles-permissions-casl/&amp;hashtags=vuejs&amp;via=vuejsdevelopers">Twitter</a> <a href="https://www.facebook.com/sharer/sharer.php?u=https://vuejsdevelopers.com/2018/01/08/vue-js-roles-permissions-casl/&amp;t=Managing%20User%20Permissions%20in%20a%20VueJS%20App">Facebook</a> <a href="http://plus.google.com/share?url=https://vuejsdevelopers.com/2018/01/08/vue-js-roles-permissions-casl/">Google+</a></p>
<p>在需要身份验证的前端应用里，我们经常想通过用户角色来决定哪些内容可见。比如，游客身份可以阅读文章，但注册用户或管理员才能看到编辑按钮。</p>
<p>在前端中管理权限可能会有点麻烦。你之前可能写过这样的代码：</p>
<pre><code class="hljs jboss-cli"><span class="hljs-keyword">if</span> <span class="hljs-params">(user.<span class="hljs-attr">type</span> === ADMIN || user.auth &amp;&amp; post.<span class="hljs-attr">owner</span> === user.id )</span> {
  <span class="hljs-string">...</span>
}
</code></pre><p>作为代替方案，一个简洁轻量的库——CASL——可以让管理用户权限变得非常简单。只要你用CASL定义了权限，并设置了当前用户，就可以把上面的代码改为这样：</p>
<pre><code class="hljs clean"><span class="hljs-keyword">if</span> (abilities.can(<span class="hljs-string">'update'</span>, <span class="hljs-string">'Post'</span>)) {
  ...
}
</code></pre><p>在这篇文章里，我会展示如何在前端应用里使用Vue.js和CASL来管理权限。</p>
<p> <img src="https://d33wubrfki0l68.cloudfront.net/fbdd8e6b18ca7b5fba3a5256184728269ea4ca18/964c7/images/posts/vue_casl.gif" alt="demo"></p>
<p><em>注：你没有使用过CASL也可以继续阅读</em></p>
<h2>CASL 速成课程</h2>
<p>CASL可以让你定义一系列规则来限制哪些资源对用户可见。</p>
<p>比如，CASL规则能够<strong>标明</strong>用户可以对给定的资源和实例（帖子、文章、评论等）进行哪些CRUD（Create, Read, Update和Delete）操作。</p>
<p>假设我们有分类广告网站。最显而易见的规则就是：</p>
<ul>
<li>游客可以浏览所有帖子</li>
<li>管理员可以浏览所有帖子，并且可以更新或删除</li>
</ul>
<p>使用CASL，我们用<code>AbilityBuilder</code>来定义规则。调用<code>can</code>来定义一条新规则。例如：</p>
<pre><code class="hljs typescript"><span class="hljs-keyword">const</span> { AbilityBuilder } = <span class="hljs-built_in">require</span>(<span class="hljs-string">'casl'</span>);

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"><span class="hljs-keyword">type</span></span>) </span>{
  AbilityBuilder.define(<span class="hljs-function"><span class="hljs-params">can</span> =&gt;</span> {
    <span class="hljs-keyword">switch</span>(<span class="hljs-keyword">type</span>) {
      <span class="hljs-keyword">case</span> <span class="hljs-string">'guest'</span>:
        can(<span class="hljs-string">'read'</span>, <span class="hljs-string">'Post'</span>);
        <span class="hljs-keyword">break</span>;
      <span class="hljs-keyword">case</span> <span class="hljs-string">'admin'</span>:
        can(<span class="hljs-string">'read'</span>, <span class="hljs-string">'Post'</span>);
        can([<span class="hljs-string">'update'</span>, <span class="hljs-string">'delete'</span>], <span class="hljs-string">'Post'</span>);
        <span class="hljs-keyword">break</span>;
      <span class="hljs-comment">// Add more roles here</span>
    }
  }
};
</code></pre><p>现在，就可以用定义的规则来检查应用权限了。</p>
<pre><code class="hljs nimrod"><span class="hljs-keyword">import</span> defineAbilitiesFor <span class="hljs-keyword">from</span> './abilities';

<span class="hljs-keyword">let</span> currentUser = {
  id: <span class="hljs-number">999</span>,
  name: <span class="hljs-string">"Julie"</span>
  <span class="hljs-keyword">type</span>: <span class="hljs-string">"registered"</span>,
};

<span class="hljs-keyword">let</span> abilities = defineAbilitiesFor(currentUser.<span class="hljs-keyword">type</span>);

<span class="hljs-type">Vue</span>.component({
  <span class="hljs-keyword">template</span>: `&lt;<span class="hljs-keyword">div</span>&gt;&lt;<span class="hljs-keyword">div</span>&gt;
             &lt;<span class="hljs-keyword">div</span>&gt;<span class="hljs-type">Please</span> log <span class="hljs-keyword">in</span>&lt;/<span class="hljs-keyword">div</span>&gt;
            `,
  props: [ 'post' ],
  computed: {
    showPost() {
      <span class="hljs-keyword">return</span> abilities.can('read', '<span class="hljs-type">Post</span>');
    }
  }
});
</code></pre><p>查阅<a href="https://stalniy.github.io/casl/">官方文档</a>，了解更多CASL详情。</p>
<h2>Demo 课程</h2>
<p>作为演示，我做了一个用来展示分类广告帖子的服务器/客户端应用。这个应用的规则是：用户能够阅读帖子或发帖，但是只能更新或删除自己的帖子。</p>
<p>我用Vue.js和CASL来方便地运行和扩展这些规则，即使以后添加新的操作或实例也将很方便。</p>
<p>现在我就带你一步步搭建这个应用。如果你想一睹为快，请戳<a href="https://github.com/anthonygore/vue-casl-demo">这个Github repo</a>。</p>
<h2>定义用户权限</h2>
<p>我们在 <em>resources/ability.js</em>中定义用户权限。CASL的一个优点是与环境无关，也就是说它既能在Node中运行，也能在浏览器中运行。</p>
<p>我们会把权限定义写到一个CommonJS模块里来保证Node的兼容性（Webpack能让这个模块用在客户端）。</p>
<p><em>resources/ability.js</em></p>
<pre><code class="hljs typescript"><span class="hljs-keyword">const</span> casl = <span class="hljs-built_in">require</span>(<span class="hljs-string">'casl'</span>);

<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">defineAbilitiesFor</span>(<span class="hljs-params">user</span>) </span>{
  <span class="hljs-keyword">return</span> casl.AbilityBuilder.define(
    { subjectName: <span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> item.type }, 
    <span class="hljs-function"><span class="hljs-params">can</span> =&gt;</span> {
      can([<span class="hljs-string">'read'</span>, <span class="hljs-string">'create'</span>], <span class="hljs-string">'Post'</span>);
      can([<span class="hljs-string">'update'</span>, <span class="hljs-string">'delete'</span>], <span class="hljs-string">'Post'</span>, { user: user });
    }
  );
};
</code></pre><p>下面我们来剖析这段代码。</p>
<p><code>define</code>方法的第二个参数，我们通过调用<code>can</code>来定义了权限规则。这个方法的第一个参数是你要允许的CRUD操作，第二个是资源或实例，在这个例子中是<code>Post</code>。</p>
<p>注意第二个<code>can</code>的调用，我们传了一个对象作为第三个参数。这个对象是用来测试<code>user</code>属性是否匹配我们提供的<code>user</code>对象。如果我们不这么做，那不光创建者可以删帖，谁都可以随便删了。</p>
<p><em>resources/ability.js</em></p>
<pre><code class="hljs less">...
<span class="hljs-selector-tag">casl</span><span class="hljs-selector-class">.AbilityBuilder</span><span class="hljs-selector-class">.define</span>(
  ...
  can =&gt; {
    <span class="hljs-selector-tag">can</span>([<span class="hljs-string">'read'</span>, <span class="hljs-string">'create'</span>], <span class="hljs-string">'Post'</span>);
    <span class="hljs-selector-tag">can</span>([<span class="hljs-string">'update'</span>, <span class="hljs-string">'delete'</span>], <span class="hljs-string">'Post'</span>, { <span class="hljs-attribute">user</span>: user });
  }
);
</code></pre><p>CASL检查实例来分配权限时，需要知道实例的<code>type</code>。一种解决方式是把具有<code>subjectName</code>方法的对象，作为<code>define</code>方法的第一个参数，<code>subjectName</code>方法会返回实例的类型。</p>
<p>我们通过在实例中返回<code>type</code>来达成目的。我们需要保证，在定义<code>Post</code>对象时，这个属性是存在的。</p>
<p><em>resources/ability.js</em></p>
<pre><code class="hljs css">...
<span class="hljs-selector-tag">casl</span><span class="hljs-selector-class">.AbilityBuilder</span><span class="hljs-selector-class">.define</span>(
  { <span class="hljs-attribute">subjectName</span>: item =&gt; item.type }, 
  ...
);
</code></pre><p>最后，我们把我们的权限定义封装到一个函数里，这样我们就可以在需要测试权限的时候直接传进一个user对象。在下面的函数中会更易理解。</p>
<p><em>resources/ability.js</em></p>
<pre><code class="hljs javascript"><span class="hljs-keyword">const</span> casl = <span class="hljs-built_in">require</span>(<span class="hljs-string">'casl'</span>);

<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">defineAbilitiesFor</span>(<span class="hljs-params">user</span>) </span>{
  ...
};
</code></pre><h2>Vue 中的访问权限规则</h2>
<p>现在我们想在前端应用中检查一个对象中，用户具有哪些CRUD权限。我们需要在Vue组件中访问CASL规则。这是方法：</p>
<ol>
<li>引入Vue和 <em>abilities plugin</em>。这个插件会把CASL加到Vue的原型上，这样我们就能在组件内调用了。</li>
<li>在Vue 应用内引入我们的规则（例： <em>resources/abilities.js</em>）。</li>
<li>定义当前用户。实战中，我们是通过服务器来获取用户数据的，在这个例子中，我们简单地硬编码到到项目里。</li>
<li>牢记，abilities模块export一个函数，我们把它称为<code>defineAbilitiesFor</code>。我们会向这个函数传入用户对象。现在，无论何时，我们可以通过检测一个对象来得出<em>当前用户</em>拥有何种权限。</li>
<li>添加abilities插件，这样我们就可以在组件中像这样来进行测试了：<code>this.$can(...)</code>。</li>
</ol>
<p><em>src/main.js</em></p>
<pre><code class="hljs javascript"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>;
<span class="hljs-keyword">import</span> abilitiesPlugin <span class="hljs-keyword">from</span> <span class="hljs-string">'./ability-plugin'</span>;

<span class="hljs-keyword">const</span> defineAbilitiesFor = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../resources/ability'</span>);
<span class="hljs-keyword">let</span> user = { <span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">'George'</span> };
<span class="hljs-keyword">let</span> ability = defineAbilitiesFor(user.id);
Vue.use(abilitiesPlugin, ability);
</code></pre><h2>Post 实例</h2>
<p>我们的应用会使用分类广告的帖子。这些表述帖子的对象会从数据库中检索，然后被服务器传给前端。比如：</p>
<p>我们的<code>Post</code>实例中有两个属性是必须的：</p>
<ol>
<li><code>type</code>属性。CASL会使用 <em>abilities.js</em>中的<code>subjectName</code>回调来检查正在测试的是哪种实例。</li>
<li><code>user</code>属性。这是发帖者。记住，用户只能更新和删除他们_发布_的帖子。在 <em>main.js</em>中我们通过<code>defineAbilitiesFor(user.id)</code>已经告诉了CASL当前用户是谁。CASL要做的就是检查用户的ID和<code>user</code>属性是否匹配。</li>
</ol>
<pre><code class="hljs scala">let posts = [
  {
    <span class="hljs-class"><span class="hljs-keyword">type</span></span>: <span class="hljs-symbol">'Pos</span>t',
    user: <span class="hljs-number">1</span>,
    content: <span class="hljs-symbol">'1</span> used cat, good condition'
  },
  {
    <span class="hljs-class"><span class="hljs-keyword">type</span></span>: <span class="hljs-symbol">'Pos</span>t',
    user: <span class="hljs-number">2</span>,
    content: <span class="hljs-symbol">'Second</span>-hand bathroom wallpaper'
  }
];
</code></pre><p>这两个post对象中，ID为1的George，拥有第一个帖子的更新删除权限，但没有第二个的。</p>
<h2>在对象中测试用户权限</h2>
<p>帖子通过<em>Post</em>组件在应用中展示。先看一下代码，下面我会讲解：</p>
<p><em>src/components/Post.vue</em></p>
<pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">br</span> /&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">small</span>&gt;</span>posted by <span class="hljs-tag">&lt;/<span class="hljs-name">small</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"del"</span>&gt;</span>Delete<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">'axios'</span>;

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">props</span>: [<span class="hljs-string">'post'</span>, <span class="hljs-string">'username'</span>],
    <span class="hljs-attr">methods</span>: {
      del() {
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.$can(<span class="hljs-string">'delete'</span>, <span class="hljs-keyword">this</span>.post)) {
          ...
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'err'</span>, <span class="hljs-string">'Only the owner of a post can delete it!'</span>);
        }
      }
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"scss"</span>&gt;</span><span class="undefined">...</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</code></pre><p>点击<em>Delete</em>按钮，捕获到点击事件，会调用<code>del</code>处理函数。</p>
<p>我们通过<code>this.$can('delete', post)</code>来使用CASL检查当前用户是否具有操作权限。如果有权限，就进一步操作，如果没有，就给出错误提示“只有发布者可以删除！”</p>
<h2>服务器端测试</h2>
<p>在真实项目里，用户在前端删除后，我们会通过 Ajax发送删除指令到接口，比如：</p>
<p><em>src/components/Post.vue</em></p>
<pre><code class="hljs javascript"><span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.$can(<span class="hljs-string">'delete'</span>, post)) {
  axios.get(<span class="hljs-string">`/delete/<span class="hljs-subst">${post.id}</span>`</span>, ).then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
    ...  
  });
}
</code></pre><p>服务器不应信任客户端的CRUD操作，那我们把CASL测试逻辑放到服务器：</p>
<p><em>server.js</em></p>
<pre><code class="hljs typescript">app.get(<span class="hljs-string">"/delete/:id"</span>, <span class="hljs-function">(<span class="hljs-params">req, res</span>) =&gt;</span> {
  <span class="hljs-keyword">let</span> postId = <span class="hljs-built_in">parseInt</span>(req.params.id);
  <span class="hljs-keyword">let</span> post = posts.find(<span class="hljs-function"><span class="hljs-params">post</span> =&gt;</span> post.id === postId);
  <span class="hljs-keyword">if</span> (ability.can(<span class="hljs-string">'delete'</span>, post)) {
    posts = posts.filter(<span class="hljs-function"><span class="hljs-params">cur</span> =&gt;</span> cur !== post);
    res.json({ success: <span class="hljs-literal">true</span> });
  } <span class="hljs-keyword">else</span> {
    res.json({ success: <span class="hljs-literal">false</span> });
  }
});
</code></pre><p>CASL是同构（isomorphic）的，服务器上的<code>ability</code>对象就可以从<em>abilities.js</em>中引入，这样我们就不必复制任何代码了！</p>
<h2>封装</h2>
<p>此时，在简单的Vue应用里，我们就有非常好的方式管理用户权限了。</p>
<p>我认为<code>this.$can('delete', post)</code> 比下面这样优雅得多：</p>
<pre><code class="hljs stata"><span class="hljs-keyword">if</span> (user.id === <span class="hljs-keyword">post</span>.user &amp;&amp; <span class="hljs-keyword">post</span>.<span class="hljs-keyword">type</span> === '<span class="hljs-keyword">Post</span>') {
  ...
}
</code></pre><p>This is not only more difficult to read, but also, there’s an implicit rule here i.e. that a post can be deleted by a user. This rule will undoubtedly be used elsewhere in our app, and should really be abstracted. This is what CASL can do for us.</p>
<p>这不光可读性差，还暗含规则，即用户可以删除帖子。这条规则无疑可以在应用的其它地方使用，应该被抽离出来。这就是CASL为我们所做的。</p>
<p><em>感谢<a href="https://github.com/stalniy/casl">CASL</a>的作者<a href="https://github.com/stalniy">Sergii Stotskyi</a>对本文的帮助。</em></p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
在 VueJS应用中管理用户权限

## 原文链接
[https://www.zcfy.cc/article/managing-user-permissions-in-a-vuejs-app](https://www.zcfy.cc/article/managing-user-permissions-in-a-vuejs-app)

