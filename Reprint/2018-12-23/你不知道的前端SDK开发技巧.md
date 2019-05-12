---
title: '你不知道的前端SDK开发技巧' 
date: 2018-12-23 2:30:07
hidden: true
slug: jgjbrnc29c
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>
<p>作者：陈达孚</p>
<blockquote><p>香港中文大学研究生,《移动Web前端高效开发实战》作者之一，《前端开发者指南2017》译者之一，在中国前端开发者大会,中生代技术大会等技术会议发表过主题演讲, 专注于新技术的调研和使用.</p></blockquote>
<p>本文为原创文章，转载请注明作者及出处</p>
</blockquote>
<p>最近在做公司内部的一个的一个SDK的重构，这里总结一些经验分享给大家。</p>
<h3 id="articleHeader0">类型检查和智能提示</h3>
<p>作为一个SDK，我们的目标是让使用者能够减少查看文档的时间，所以我们需要提供一些类型的检查和智能提示，一般我们的做法是提供JsDoc，大部分编辑器可以提供快捷生成JsDoc的方式，我们比较常用的vscode可以使用<a href="https://marketplace.visualstudio.com/items?itemName=joelday.docthis" rel="nofollow noreferrer" target="_blank">Document This</a>。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012307849?w=1422&amp;h=1078" src="https://static.alili.tech/img/remote/1460000012307849?w=1422&amp;h=1078" alt="" title="" style="cursor: pointer;"></span></p>
<p>另一种做法是使用Flow或者TypeScript，选择TypeScript的主要原因是自动生成的JsDoc比较原始，我们仍然需要在上面进行编辑，所以JsDoc维护和代码开发是脱离的，往往会出现代码更新了，JsDoc忘记更新的情况。</p>
<p>除此之外开发过程中我们无法享受到类型检查等对SDK开发比较重要的特性，TypeScript可以让我们减少犯错，减少调试的时间，另一方面这次开发的SDK在提供出去的时候就会进行一次相对简单的压缩，保证引入后的体积，所以会希望压缩掉JsDoc,而TypeScript可以通过在tsconfig.json中将declaration设置为true单独的d.ts文件。</p>
<p>一个带提示的SDK：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012307850" src="https://static.alili.tech/img/remote/1460000012307850" alt="" title="" style="cursor: pointer;"></span></p>
<p>最后,对于开发同学来说，就算不使用TypeScript，也强烈建议使用vscode提供<code>//@ts-check</code> 注解，它会通过一些类型推导来检查你的代码的正确性，可以减少很多开发过程中的bug。</p>
<p>还有一个小技巧，如果你使用的库没有提供智能提示，你可以通过<code>NPM/yarn</code>的<code>-D</code>安装<code>@types/{pkgname}</code>，这样你开发过程中就能够享受到vscode提供的智能提示，而<code>-D</code>安装到<code>devDependencies</code>中，也不会增加你在构建时的代码体积。</p>
<h3 id="articleHeader1">接口</h3>
<p>既然提到了TypeScript，就提一下TypeScript的语法，基础类型没有必要赘述，而一些曾经的高级语法现在ES6也都能支持，这里提几点常用但是JavaScript开发者不太习惯使用的语法。</p>
<p>很多人在开始使用TypeScript的时候，会很迷恋使用any或者默认的any，推荐在开发中打开tsconfig中的strict和noImplicitAny来保证尽量少的any使用，要知道，滥用any就等于你的类型检查并没有实质效果。</p>
<p>对一些暂时不能确定内容的对象的类型,可以使用<code>{[key: string]: any}</code>，而不要直接使用any，后期可以慢慢扩展这个接口直到完全消除any，同时TypeScript的类型支持继承，在开发过程中，可以拆解接口，利用组合继承的方式减少重复定义。</p>
<p>但是接口也会带来一个小痛点，目前vscode的智能提醒不能很好的对应到接口，当你输入到对应变量的时候，虽然会高亮，但是高亮的也只是一个定义了名字的接口。没有办法直接看到接口里定义了什么。但是当你输入了接口里面定义的key的部分时，vscode会给你完整key的提示。虽然这对开发过程中有一点不够友好，但是vscode开发团队表示这是他们故意设计的，所以在API参数上可以选择将一些必要（重要）参数用基础类型直接使用，而将一些配置放入一个定义为接口的对象中。</p>
<h3 id="articleHeader2">枚举</h3>
<p>你有在代码中使用过:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Platform = {
    ios: 0,
      android: 1
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> Platform = {
    <span class="hljs-attr">ios</span>: <span class="hljs-number">0</span>,
      <span class="hljs-attr">android</span>: <span class="hljs-number">1</span>
}</code></pre>
<p>那你在TypeScript中就应该使用枚举：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="enum Platform {
  ios,
  android
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">enum</span> Platform {
  ios,
  android
}</code></pre>
<p>这样在函数中你就可以为某个参数设置类型为number，然后传入<code>Platform.ios</code>这样，枚举可以增加代码的维护性，它可以利用智能提示保证你输入的正确，不再会出现魔数（magic number）。相对于对象，它保证了输入的类型（你定义的对象可能某一天不再只有number类型的value），不再需要额外的类型判断。</p>
<h3 id="articleHeader3">装饰器</h3>
<p>对于装饰器其实很多开发者既熟悉又陌生,在redux,mobx比较流行的现在,在代码中出现装饰器的调用已经很普遍,但是大多数开发者并没有将自己代码逻辑抽成装饰器的习惯。</p>
<p>比如在这个SDK的开发中,我们需要提供一些facade来兼容不同的平台(iOS, Android或者Web)，而这个facade会通过插件的形式让开发者自己注册，SDK会维护一个注入后的对象，常规的使用方法是到了使用函数后判断环境再判断对象中有没有想有的插件，有就使用插件。</p>
<p>实际来看，插件就是一个拦截器，我们只要阻止真正的函数运行就可以，大概的逻辑是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export function facade(env: number) {
  return function(
    target: object,
    name: string,
    descriptor: TypedPropertyDescriptor<any>
  ) {
    let originalMethod = descriptor.value;
    let method;

    return {
      ...descriptor,
      value(...args: any[]): any {
        let [arg] = args;
        let { param, success, failure, polyfill } = arg;   // 这部分可以自定义
        if ((method = polyfill[env])) {
          method.use(param, success, failure);
          return;
        }
        originalMethod.apply(this, args);
      }
    };
  };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">facade</span>(<span class="hljs-params">env: <span class="hljs-built_in">number</span></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">
    target: object,
    name: <span class="hljs-built_in">string</span>,
    descriptor: TypedPropertyDescriptor&lt;<span class="hljs-built_in">any</span>&gt;
  </span>) </span>{
    <span class="hljs-keyword">let</span> originalMethod = descriptor.value;
    <span class="hljs-keyword">let</span> method;

    <span class="hljs-keyword">return</span> {
      ...descriptor,
      value(...args: <span class="hljs-built_in">any</span>[]): <span class="hljs-built_in">any</span> {
        <span class="hljs-keyword">let</span> [arg] = args;
        <span class="hljs-keyword">let</span> { param, success, failure, polyfill } = arg;   <span class="hljs-comment">// 这部分可以自定义</span>
        <span class="hljs-keyword">if</span> ((method = polyfill[env])) {
          method.use(param, success, failure);
          <span class="hljs-keyword">return</span>;
        }
        originalMethod.apply(<span class="hljs-keyword">this</span>, args);
      }
    };
  };
}</code></pre>
<p>在SDK的开发过程中另一个常会遇到的就是很多参数的校验和再封装，我们也可以使用装饰器去完成：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export function snakeParam(
  target: object,
  name: string,
  descriptor: TypedPropertyDescriptor<any>
) {
  let callback = descriptor.value!;

  return {
    ...descriptor,
    value(...args: any[]): any {
      let [arg, ...other] = args;
      arg = convertObjectName(arg, ConvertNameMode.toSnake);
      callback.apply(this, [arg, ...other]);
    }
  };
}÷" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">snakeParam</span>(<span class="hljs-params">
  target: object,
  name: <span class="hljs-built_in">string</span>,
  descriptor: TypedPropertyDescriptor&lt;<span class="hljs-built_in">any</span>&gt;
</span>) </span>{
  <span class="hljs-keyword">let</span> callback = descriptor.value!;

  <span class="hljs-keyword">return</span> {
    ...descriptor,
    value(...args: <span class="hljs-built_in">any</span>[]): <span class="hljs-built_in">any</span> {
      <span class="hljs-keyword">let</span> [arg, ...other] = args;
      arg = convertObjectName(arg, ConvertNameMode.toSnake);
      callback.apply(<span class="hljs-keyword">this</span>, [arg, ...other]);
    }
  };
}÷</code></pre>
<h3 id="articleHeader4">泛形</h3>
<p>泛形可以根据用户的输入决定输出，最简单的例子是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function identity<T>(arg: T): T {
    return arg;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">identity</span>&lt;<span class="hljs-title">T</span>&gt;(<span class="hljs-params">arg: T</span>): <span class="hljs-title">T</span> </span>{
    <span class="hljs-keyword">return</span> arg;
}</code></pre>
<p>当然它没有什么特别的意义，但是它表明了返回是根据arg的类型，在一般开发过程中，你逃不开范型的是Promise或者前面的TypedPropertyDescriptor这种内建的需要类型输入的地方，不要草率的使用any，如果你的后端返回是一个标准结构体类似：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export interface IRes {
  status: number;
  message: string;
  data?: object;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> IRes {
  status: <span class="hljs-built_in">number</span>;
  message: <span class="hljs-built_in">string</span>;
  data?: object;
}</code></pre>
<p>那么你可以这样使用Promise：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function example(): Promise<IRes> {
    return new Promise ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">example</span>(<span class="hljs-params"></span>): <span class="hljs-title">Promise</span>&lt;<span class="hljs-title">IRes</span>&gt; </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span> ...
}</code></pre>
<p>当然泛形有很多高级应用，例如泛形约束，泛型创建工厂函数，已经超出了本文的范围，可以去官方文档了解。</p>
<h3 id="articleHeader5">构建</h3>
<p>如果你的构建工具是Webpack，在SDK的开发中，尽量使用node方式调用（即webpack.run执行），因为SDK的构建往往会应对很多不同的参数变化，node方式相比纯配置方式可以更加灵活的调整输入输出的参数，也可以考虑使用rollup，rollup的构建代码更加面向编程方式。</p>
<p>需要注意的是，在Webpack3和rollup中构建中可以使用ES6模块化的方式构建，这样业务代码引入你的SDK后，可以通过解构引入的方式减少最终业务代码的体积，如果你只是提供了commonjs的包，那么构建工具的tree sharking是无法生效的，如果使用babel的话注意关闭module的编译。</p>
<p>另外一种减少单个包体积的方式，可以使用<a href="https://github.com/lerna/lerna" rel="nofollow noreferrer" target="_blank">lerna</a>在一个git仓库里构建多个NPM包，比起拆仓库可以更方便的使用公共部分的代码，但是也需要注意对公共部分代码的修改不要影响到别的包。</p>
<p>其实对于大多数的SDK的来说，Webpack3和rollup使用感受是差不多的，比较常用的插件都有几乎同名的对应。不过rollup有两个优势，一个是rollup的构建更细化，rollup.rollup接受inputOptions生成bundle，还可以generate生成sourcemap，write生成output，在这个过程中我们可以做一些细致的工作。</p>
<p>第二点是rollup.rollup会返回一个promise，也就意味着我们可以使用async的方式来写构建代码，而webpack.run还是使用的回调函数，虽然开发者可以封装成promise，但是个人觉得还是rollup的写法还是更爽一点。</p>
<h3 id="articleHeader6">单元测试</h3>
<p>上周我同事做了一个在线的分享，我发现很多同学都对单测很感兴趣也很疑惑，在前端开发中，对涉及UI的业务代码开发单测试比较困难的，但是对于SDK，单元测试肯定是准出的一个充要条件。当然其实我也很不喜欢写单测，因为单测往往比较枯燥，但是不写单测肯定会被老司机们“教育”的~_~。</p>
<p>一般的单测使用<a href="https://github.com/mochajs/mocha" rel="nofollow noreferrer" target="_blank">mocha</a>作为测试框架，<a href="https://github.com/mjackson/expect" rel="nofollow noreferrer" target="_blank">expect</a>作为断言库，使用<a href="https://github.com/istanbuljs/nyc" rel="nofollow noreferrer" target="_blank">nyc</a>提供单测报告，一个大概的单测如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="describe('xxx api test', function() {            // 注意如果要用this调用mocha，不要用箭头函数
  this.timeout(6000);
  it('xxx', done => {
    SDK.file
      .chooseImage({
        count: 10,
        cancel: () => {
          console.log('选择图片取消----');
        }
      })
      .then(res => {
        console.dir(res);
        expect(res).to.be.an('object');
        expect(res).to.have.keys('ids');
        expect(res.ids).to.be.an('array');
        expect(res.ids).to.have.length.above(0);
        uploadImg(res.ids);
        done();
      });
  });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript">describe(<span class="hljs-string">'xxx api test'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{            <span class="hljs-comment">// 注意如果要用this调用mocha，不要用箭头函数</span>
  <span class="hljs-keyword">this</span>.timeout(<span class="hljs-number">6000</span>);
  it(<span class="hljs-string">'xxx'</span>, <span class="hljs-function"><span class="hljs-params">done</span> =&gt;</span> {
    SDK.file
      .chooseImage({
        count: <span class="hljs-number">10</span>,
        cancel: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
          <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'选择图片取消----'</span>);
        }
      })
      .then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
        <span class="hljs-built_in">console</span>.dir(res);
        expect(res).to.be.an(<span class="hljs-string">'object'</span>);
        expect(res).to.have.keys(<span class="hljs-string">'ids'</span>);
        expect(res.ids).to.be.an(<span class="hljs-string">'array'</span>);
        expect(res.ids).to.have.length.above(<span class="hljs-number">0</span>);
        uploadImg(res.ids);
        done();
      });
  });
});</code></pre>
<p>同样你可以用TypeScript写单测，当然在执行过程中，不需要再编译了，我们可以直接给mocha注册ts-node来直接执行，具体方式可以参考<a href="https://journal.artfuldev.com/write-tests-for-typescript-projects-with-mocha-and-chai-in-typescript-86e053bdb2b6" rel="nofollow noreferrer" target="_blank">Write tests for TypeScript projects with mocha and chai — in TypeScript!</a>。但是有一点需要提醒你，写单测的时候尽量依赖文档而不是智能提示，因为你的代码出错，可能会导致你的智能提示也是错误的，你根据错误的智能提示写的单测肯定也是。。。</p>
<p>对于网络请求的模拟可以使用<a href="https://github.com/node-nock/nock" rel="nofollow noreferrer" target="_blank">nock</a>这个库，需要在it之前增加一个<code>beforeEach</code>方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="describe('proxy', () => {
  beforeEach(() => {
    nock('http://test.com')
      .post('/test1')
      .delay(200)
      .reply(200, {            // body
        test1: 1,
        test2: 2
      }, {
        'server-id': 'test' // header
      });
  });
  it(...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">describe(<span class="hljs-string">'proxy'</span>, () =&gt; {
  beforeEach(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    nock(<span class="hljs-string">'http://test.com'</span>)
      .post(<span class="hljs-string">'/test1'</span>)
      .delay(<span class="hljs-number">200</span>)
      .reply(<span class="hljs-number">200</span>, {            <span class="hljs-comment">// body</span>
        test1: <span class="hljs-number">1</span>,
        <span class="hljs-attr">test2</span>: <span class="hljs-number">2</span>
      }, {
        <span class="hljs-string">'server-id'</span>: <span class="hljs-string">'test'</span> <span class="hljs-comment">// header</span>
      });
  });
  it(...
}</code></pre>
<p>最后我们用一个npm script加上nyc在mocha前面，就可以获得我们的单测报告了。</p>
<p>这里我还提了几个TypeScript使用中的小tips给大家参考。</p>
<h4>tips: 如何在非发包情况下给内部库添加声明</h4>
<p>这个SDK在开发过程会依赖一个内部NPM包,为了让这个NPM支持TypeScript调用,我们有几种做法:</p>
<ul>
<li>给原包添加d.ts文件,然后发布.</li>
<li>发布@types包,需要注意的是NPM不支持<code>@types/@scope/{pkgname}</code>这种写如果是私库包,可以使用<code>@types/scope_{pkgname}</code>这种写法.</li>
<li>
<p>这次使用的标注一个文件夹存放对应的d.ts文件,这种方式适合开发中进行,如果你觉得你写的d.ts还不够完美,或者这个d.ts文件目前只有这个SDK有需要,可以这么使用,在tsconfig.json中修改:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;baseUrl&quot;: &quot;./&quot;,
&quot;paths&quot;: {
    &quot;*&quot;: [&quot;/type/*&quot;]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json"><span class="hljs-string">"baseUrl"</span>: <span class="hljs-string">"./"</span>,
<span class="hljs-string">"paths"</span>: {
    <span class="hljs-attr">"*"</span>: [<span class="hljs-string">"/type/*"</span>]
}</code></pre>
</li>
</ul>
<h4>tips: 如何处理resolve和reject不同类型的promise回调</h4>
<p>默认的reject返回的参数类型是any，不一定能满足我们的需要，这里给一个解决方案，并非最佳，作为抛砖引玉：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface IPromise<T, U> {
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?:
      | ((value: T) => TResult1 | PromiseLike<TResult1>)
      | undefined
      | null,
    onrejected?:
      | ((reason: U) => TResult2 | PromiseLike<TResult2>)
      | undefined
      | null
  ): IPromise<TResult1 , TResult2>;
  catch<TResult = never>(
    onrejected?:
      | ((reason: U) => TResult | PromiseLike<TResult>)
      | undefined
      | null
  ): Promise<TResult>;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">interface</span> IPromise&lt;T, U&gt; {
  then&lt;TResult1 = T, TResult2 = never&gt;(
    onfulfilled?:
      | <span class="hljs-function">(<span class="hljs-params">(<span class="hljs-params">value: T</span>) =&gt; TResult1 | PromiseLike&lt;TResult1&gt;</span>)
      | <span class="hljs-params">undefined</span>
      | <span class="hljs-params">null</span>,
    <span class="hljs-params">onrejected</span>?:
      | (<span class="hljs-params">(<span class="hljs-params">reason: U</span>) =&gt; TResult2 | PromiseLike&lt;TResult2&gt;</span>)
      | <span class="hljs-params">undefined</span>
      | <span class="hljs-params">null</span>
  ): <span class="hljs-params">IPromise</span>&lt;<span class="hljs-params">TResult1</span> , <span class="hljs-params">TResult2</span>&gt;;
  <span class="hljs-params">catch</span>&lt;<span class="hljs-params">TResult</span> = <span class="hljs-params">never</span>&gt;(<span class="hljs-params">
    onrejected?:
      | (<span class="hljs-params">(<span class="hljs-params">reason: U</span>) =&gt; TResult | PromiseLike&lt;TResult&gt;</span>)
      | <span class="hljs-literal">undefined</span>
      | <span class="hljs-literal">null</span>
  </span>): <span class="hljs-params">Promise</span>&lt;<span class="hljs-params">TResult</span>&gt;;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010953661" src="https://static.alili.tech/img/remote/1460000010953661" alt="" title="" style="cursor: pointer;"></span></p>
<blockquote>
<p>iKcamp原创新书《移动Web前端高效开发实战》已在亚马逊、京东、当当开售。</p>
<p>iKcamp官网：<a href="https://www.ikcamp.com" rel="nofollow noreferrer" target="_blank">https://www.ikcamp.com</a></p>
</blockquote>
<p>包含：文章、视频、源代码<br><span class="img-wrap"><img data-src="/img/remote/1460000010887896" src="https://static.alili.tech/img/remote/1460000010887896" alt="" title="" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
你不知道的前端SDK开发技巧

## 原文链接
[https://segmentfault.com/a/1190000012307844](https://segmentfault.com/a/1190000012307844)

