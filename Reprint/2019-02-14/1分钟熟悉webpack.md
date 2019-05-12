---
title: '1分钟熟悉webpack' 
date: 2019-02-14 2:30:37
hidden: true
slug: rh2vn7cba9
categories: [reprint]
---

{{< raw >}}

                    
<p>　　随着业务发展和前端人员的增加，搭建一个通用框架以及制定统一规范就成了必然。对于选型这方面，一开始好像就没考虑其他框架，直接选了webpack。webpack的优点就不多说了，可扩展性，强大的npm插件库，说干就干。</p>
<p>　　基于公司基础以及业务限制，一口吃不成个胖子，没办法做成最理想的状态，也就是一份配置文件，npm build可以直接打包所有项目。也许未来会是这个状态，但目前来看，这种一劳永逸的方案并不是我们公司最合适的方案。一方面公司项目机制并不成熟，老项目也不少，直接打包所有项目很有可能影响老项目;另一方面打包所有项目权限太大，一个人犯错，可能导致公司所有项目都出问题，所以还是自己负责自己的项目就好。现在实现的效果也还不错，简简单单3句命令，就实现了本地、测试和线上环境的区分和打包。命令实例如下(项目名称是testDemo)：</p>
<p>　　现在就说下具体的规划吧，想法其实也很简单：</p>
<p>　　1、新建2个同级目录，一个是webpack(项目源目录)，一个是 build(打包之后的项目的目录);</p>
<p>　　2、通过运行不同的命令(主要是命令最后面的项目名称不一样)，将项目从webpack打包到 build 里，并且webpack和build的目录结构一模一样，比如上面实例中的项目testDemo，它的源目录结构是webpack/app/testDemo，那打包之后的路径就是build/app/testDemo，这样的结构更易于操作和后期维护。</p>
<p>　　先来看看webpack的目录结构吧：</p>
<p>　　说明：</p>
<p>　　·node_modules：安装好的包。</p>
<p>　　·common：公共目录，比如里面可以放公共css、公共插件等。</p>
<p>　　·app、store：项目目录，和 build 内的目录保持一致。</p>
<p>　　·.gitignore：需要忽略的东西，比如 node_modules 等。</p>
<p>　　·package.json：配置文件，如果下载了新的 loader，package.json 文件会有变动。</p>
<p>　　·webpack.common.js：webpack 的公共配置文件。</p>
<p>　　·webpack.dev.js：本地开发配置文件。</p>
<p>　　·webpack.prod.js：线上环境配置文件。</p>
<p>　　·webpack.test.js：测试环境配置文件。</p>
<p>　　·package-lock.json：npm init 过程中生成的 json 文件，无需关心。</p>
<p>　　那么现在面临的就有以下几个问题了：</p>
<p>　　1、我想要打包哪个文件就可以打包哪个文件，并且打包到指定目录，这个是在哪配置的，应该如何配置?</p>
<p>　　2、配置文件里都有入口配置和出口配置，并且如果给对应的 html 对应的加上他想要的主 js 文件，我知道这个肯定是动态获取和配置，但具体应该怎么实现?</p>
<p>　　3、css、js、html、img 是怎么处理的，用到了哪些 loader?</p>
<p>　　4、我知道的配置文件只有一个，为什么我的会有4个：webpack.common.js、webpack.dev.js、webpack.test.js、webpack.prod.js，为什么要写这么多配置文件，以及是怎么实现的?</p>
<p>　　5、打包一次就会生成一个目录和一批文件，而且后缀名还不一样，久而久之文件夹岂不是越来越大，怎么解决这个问题，原理又是什么?</p>
<p>　　6、无论你有没有修改文件，只要打包一次，webpack 就会重新运行一遍，并且生成不同的文件名，有没有什么办法避免这种情况，至少未修改的文件就不会再被打包一遍?</p>
<p>　　7、如何提取公共模块?比如 index1.js 和 index2.js 都引用了 jQuery，有没有什么办法，可以让打包后的 jQuery 只有一份?</p>
<p>　　8、本地环境我并不想压缩代码，因为压缩会很慢，测试和线上环境才会去压缩，这个该怎么实现，需要用什么 loader?</p>
<p>　　9、打包之后的 css 我并不像被压缩在 js 一块，想单独放一个 css 文件夹里，这个可以实现吗，怎么去实现?</p>
<p>　　10、css 是怎么实现的压缩，和 js 压缩一样吗，需要注意什么?</p>
<p>　　11、如何给静态资源配置域名地址，而本地不需要，这个怎么实现?</p>
<p>　　12、package.json 里的 devDependencies 和dependencies 有什么区别，需要注意什么?</p>
<p>　　13、.gitignore 的作用，以及如何配置?</p>
<p>　　下面一一来解答：</p>
<p>　　1、想要打包哪个文件就可以打包哪个文件，也就是上面提到的 npm start app/testDemo，运行这个命令，就会打包 webpack 下 app/testDemo 这个目录，想要实现这个，只需配置package.json和 webpack.common.js 即可：</p>
<p>　　package.json(不懂的可以去了解下scripts)</p>
<p>　　webpack.common.js</p>
<p>　　这样就实现了想要打包哪个文件就可以打包哪个文件，至于打包到哪个文件，就需要自己手动写一些配置了。</p>
<p>　　主要配置好 output 即可：</p>
<p>　　2、单页面文件比较简单，比如 index.html ,需要引入 index.js 打包后生成的 js 文件，直接 script 标签引入即可，但手动的方法不方便且易出错，怎么实现 index.html 自动引入 index.js 打包后的文件呢?这时候需要用到一个 loader，即：html-webpack-plugin，具体实现方法也很简单：</p>
<p>　　但是如果出现多页面，并且有很多很多项目，不可能每个项目都这样一步一步去配置，这时候就需要动态获取 entry、动态加载HtmlWebpackPlugin。</p>
<p>　　不过动态加载是有要求和前提的，对文件目录结构以及命名有一定的要求的规范，不是你想怎么写都可以打包成功。</p>
<p>　　我这里的规范以 testDemo 为例：</p>
<p>　　</p>
<p>　　·项目的目录结构和 testDemo保持一致：html文件在最外层，js、css、json、img单独文件夹。</p>
<p>　　·js 目录纯粹化：由于webpack.common.js 里是动态获取 entry和动态加载 HtmlWebpackPlugin，所以 js 文件夹下的文件都会加进去并且被相应的 html 引用，所以不需要加进去的 js 文件一定不要放在 js 文件夹下面，可以新建一个文件夹去放，比如 common/meta.js。</p>
<p>　　·html 和 js 的文件名保持一致：html 文件需要引入的入口js 文件名必须和html 的文件名必须保持一致，比如 index.html 对应的 js 就是 index.js，edit.html 对应的 js 就是 edit.js，这样配置文件才会知道哪个 html 文件需要加载什么 js 文件。</p>
<p>　　3、css、js、html、img 要用到哪些 loader，用过webpack 的其实都应该比较熟练了，我就直接贴代码吧。</p>
<p>　　需要稍微注意一点的是处理图片的 loader 以及图片的引用方式。</p>
<p>　　url-loader中的 limit = 1，代表大小小于 1kb的图片地址会被转化成 base64 的 url;html-loader 是为了处理 html 中的图片地址;js 中的图片需要通过 require 方式进行引用，直接引用无效。</p>
<p>　　(1)HTML</p>
<p>　　(2)CSS</p>
<p>　　(3)JS</p>
<p>　　4、配置文件文件分为这4个，其实是为了更好的区分环境(本地、测试、线上)以及维护配置代码。</p>
<p>　　·webpack.common.js 是公共配置文件，里面是本地、测试和线上都需要的配置，包括动态入口和出口、处理html、css、js、图片等需要的 loader、提取公共文件、配置别名等;</p>
<p>　　·webpack.dev.js 是本地环境配置文件，里面只需要配置 publicPath、监听代码变化自动提交并刷新网页即可;</p>
<p>　　·webpack.test.js 是测试环境配置文件，里面也需要配置publicPath，但测试环境的publicPath 和本地的publicPath 不一样，我们约定的是测试环境的域名和路径，测试环境也需要加上清除文件夹的操作，防止每次 webpack 导致文件过大，还有压缩文件的操作，包括 js 和 css 的压缩，同时也会配置 test 的环境变量;</p>
<p>　　·webpack.prod.js 就是线上环境配置文件，它和测试环境的配置文件几乎一模一样，唯独publicPath 是线上环境的域名和路径。</p>
<p>　　而 npm start app/testDemo、npm test app/testDemo、npm run build app/testDemo 就是根据环境不同，执行不同的配置文件来达到不同的效果。</p>
<p>　　具体的实现到时候直接贴代码，不同环境的配置文件如何引用公共配置文件可以稍微说一下，主要通过 webpack-merge 。</p>
<p>　　比如如下是 webpack.dev.js：</p>
<p>　　5、为了解决文件越来越大的问题，只需要每次在打包之前，将原来目录里的文件清除掉即可。</p>
<p>　　6、为了避免未修改的文件被打包，webpack 本身自带一个插件去处理：</p>
<p>　　7、提取公共模块，webpack 也自带了一个插件去处理：</p>
<p>　　8、本地不需要压缩，测试和线上环境才去压缩，之前的环境划分就派上了很好的用场了，只需要在 webpack.test.js 和 webpack.prod.js 中配置压缩即可。至于用到什么 loader，js 一般用的是uglifyjs-webpack-plugin，css 用的是optimize-css-assets-webpack-plugin。配置如下：</p>
<p>　　uglify里面的配置可不写，我这里主要写的是ie8 的兼容，sourceMap 也可设置为 true，这样利于调试。</p>
<p>　　optimize-css-assets-webpack-plugin能使 css 最小化，如果不做处理的话，压缩后会导致一些兼容的前缀丢失，所以里面添加了一些配置，方式压缩过狠。</p>
<p>　　9、如果不做任何处理的话，打包后的 css 会被压缩在 js 之中，第一不太美观，第二会导致 js 文件过大，所以有必要将 css 分离出来，这时候要用到一个extract-text-webpack-plugin 的插件。配置如下：</p>
<p>　　10、前面已经说过了，css 压缩采用optimize-css-assets-webpack-plugin插件，js 压缩采用的是 uglify，要注意的就是如果不做任何配置，css 里有些做兼容的前缀，比如 -webkit- 等就会被当作没用的东西被压缩掉，再加一些配置就可以了。</p>
<p>　　11、给静态资源配置不同的地址，无论是本地还是测试还是线上，都是通过 publicPath 进行实现的。</p>
<p>　　本地：</p>
<p>　　测试(前半部分代码和本地保持一致)：</p>
<p>　　线上(前半部分代码和本地保持一致)：</p>
<p>　　12、以前一直在纠结一个npm安装的包依赖管理的问题。是这样的：我们在使用 npm install 安装模块或插件的时候，有两种命令把他们写入到 package.json 文件里面去，他们是：--save-dev 或 --save。</p>
<p>　　首先需要说明的是Dependencies一词的中文意思是依赖和附属的意思，而dev则是 develop(开发)的简写。</p>
<p>　　所以它们的区别在 package.json 文件里面体现出来的就是，使用 --save-dev 安装的 插件，被写入到 devDependencies 域里面去，而使用--save 安装的插件，则是被写入到 dependencies 区块里面去。</p>
<p>　　那 package.json 文件里面的devDependencies 和dependencies 对象有什么区别呢?</p>
<p>　　devDependencies 里面的插件只用于开发环境，不用于生产环境，而dependencies 是需要发布到生产环境的。</p>
<p>　　比如我们写一个项目要依赖于jQuery，没有这个包的依赖运行就会报错，这时候就把这个依赖写入dependencies;</p>
<p>　　而我们使用的一些构建工具比如glup、webpack这些只是在开发中使用的包，上线以后就和他们没关系了，所以将它写入devDependencies。</p>
<p>　　13、.gitignore 就是将不想上传的文件或文件夹上传到仓库里，比如 npm install 生成的巨大无比的 node_modules。使用方法参考：<a href="https://git-scm.com/docs/gitignore" rel="nofollow noreferrer" target="_blank">https://git-scm.com/docs/giti...</a></p>
<p>　　差不多就介绍到这吧，下面直接把代码贴出来，可以直接把 package.json 引到自己的文件中，然后 npm install直接安装相关依赖。当然也可以自己 npm init 后一个一个下载安装，自己喜欢就好。</p>
<p>　　补充一些相关命令：</p>
<p>　　·安装淘宝镜像：</p>
<p>　　·删除 node_modules ：</p>
<p>　　·安装loader(比如安装html-loader 和 vue)：</p>
<p>　　package.json</p>
<p>　　webpack.common.js</p>
<p>　　webpack.dev.js</p>
<p>　　webpack.test.js</p>
<p>　　webpack.prod.js</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
1分钟熟悉webpack

## 原文链接
[https://segmentfault.com/a/1190000016798389](https://segmentfault.com/a/1190000016798389)

