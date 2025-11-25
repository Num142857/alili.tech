---
title: '解析HTTPS' 
date: 2018-12-24 2:30:07
hidden: true
slug: w3liipoeh1f
categories: [reprint]
---

{{< raw >}}

                    
<p>本文主要是对HTTPS做一个总结，主要讲解<strong>HTTPS的实质</strong>、<strong>HTTPS加密原理</strong>、<strong>HTTPS的通信过程</strong>等。</p>
<h2 id="articleHeader0">HTTPS是什么</h2>
<h3 id="articleHeader1">HTTP存在问题</h3>
<p>由于HTTP协议过于简单：</p>
<ul>
<li>通信使用明文（不加密），内容可能会被窃听。</li>
<li>不验证通信方的身份，因此可能遭遇伪装</li>
<li>无法验证报文的完整性，所以有可能已遭篡改。</li>
</ul>
<p>为了解决诸多问题，HTTPS应运而生。</p>
<h3 id="articleHeader2">HTTPS的实质</h3>
<p>HTTP加上<strong>加密处理</strong>、<strong>认证机制</strong>、以及<strong>完整性保护</strong>后的就是HTTPS。</p>
<p>需要知道的是，HTTPS并非是应用层的一种新的协议。只是HTTP通信接口部分用SSL或TLS协议代替而已。也就是说，所谓的HTTPS，<strong>其实就是身披SSL协议外壳的HTTP。</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012196647?w=520&amp;h=227" src="https://static.alili.tech/img/remote/1460000012196647?w=520&amp;h=227" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>值得一提的是，SSL是独立于HTTP协议的，也就是说其他运行在应用层的协议均可配合SSL协议使用。现今SSL是最为广泛的网络安全技术。</p>
<h3 id="articleHeader3">SSL和TLS</h3>
<p>HTTPS中使用了SSL和TLS这两个协议。</p>
<p>TLS以SSL3.0为基准，后又制定了TLS1.0、TLS1.1和TLS1.2。当前主流的版本是SSL3.0和TLS1.0。</p>
<p><strong>TLS是以SSL为原型开发的协议，有时候会统称该协议为SSL。</strong></p>
<h2 id="articleHeader4">HTTPS的加密原理</h2>
<p>近代的加密算法中加密算法是公开的，而密钥是保密的。通过这种方式来保持加密方法的安全性。</p>
<p>加密和解密要用到密钥，如果没有密钥就没有办法对密码解密。换句话来说，任何人只要持有密钥就能够对密文进行解密。</p>
<p>HTTPS在加密过程中使用了<strong>非对称加密技术</strong>和<strong>对称加密技术</strong>。</p>
<h3 id="articleHeader5">对称加密算法</h3>
<blockquote>采用单钥密码系统的加密方式，同一个密钥可以同时做信息的加密和解密，这种加密的方法称为对称加密，也称为单密钥加密。</blockquote>
<p>下面会把对称加密算法称为共享密钥加密算法。</p>
<p>假如现在，SSL在通信过程中，使用了对称加密算法，也就是说客户端和服务器同时共享一个密钥。</p>
<p>于是，以共享密钥的方式加密，必须将密钥发给对方。这个时候，假如通信过程被监听，密钥被攻击者获取了，那么这个时候也就失去了加密的意义了。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012196648?w=552&amp;h=356" src="https://static.alili.tech/img/remote/1460000012196648?w=552&amp;h=356" alt="" title="" style="cursor: pointer;"></span></p>
<p>那么，有没有办法解决这个问题呢？答案是肯定的，也就是使用两把密钥。</p>
<p>下面先看使用两把密钥的非对称加密算法。</p>
<h3 id="articleHeader6">非对称加密算法</h3>
<blockquote>与对称加密算法相反，非对称加密算法需要两个密钥来进行加密和解密，这两个密钥是配对的，分别是公开密钥（公钥）和私有密钥（私钥）。</blockquote>
<p>一般情况下，公钥是可以被<strong>公开</strong>的，它主要用来加密明文。而相应的，私钥<strong>不能被公开</strong>，用来解密公钥加密的密文。</p>
<p>值得注意的是：<strong>公钥加密后的密文只能通过对应的私钥来解密，而私钥加密的密文却可以通过对应的公钥来解密。</strong></p>
<p>以上，公钥加密私钥解密用来加密，私钥加密公钥解密用来签名。相关用途后面会讲到。</p>
<p>下面会把非对称加密算法称为公开密钥加密算法。</p>
<p>于是现在，假设现在由服务器来生成一对公钥和私钥。</p>
<p>当客户端第一次发请求和服务器协商的时候，<strong>服务器就生成了一对公钥和私钥</strong>。</p>
<p>紧接着，服务器把公钥发给客户端（明文，不需要做任何加密），客户端接收后，随机生成一个密钥，<strong>使用服务器发过来的公钥进行加密</strong>。</p>
<p>再接着，客户端把使用公钥加密的密钥发给服务器，服务器接收到了以后，<strong>用配对的私钥进行解密</strong>，就得到了客户端随机生成的那个密钥。</p>
<p>这个时候，客户端和服务端所持的密钥都是相同的。此时，交换密钥环节就完成了。</p>
<p>于是<strong>通信</strong>开始时就可进行上面所述的<strong>共享密钥加密方式</strong>来进行加密。</p>
<h3 id="articleHeader7">同时使用</h3>
<p>可能，有小伙伴就会问，为什么要大费周章使用非对称加密的方式，然后再得到相同的密钥，进行共享密钥加密的通信呢？</p>
<p>由于公开密钥加密处理起来比共享密钥加密方式更为复杂，因此在通信的时候使用公开密钥加密的方式，效率很低。</p>
<p>于是，我们需要使用非对称加密的方式来保证密钥共享的过程中密钥的安全性，而后在通信的过程中使用对称加密算法，这是最合理的设计方式，在保证安全性的同时又保证了性能。</p>
<p>所以，HTTPS采用共享密钥加密和公开密钥加密两者并用的混合加密机制。<strong>在交换密钥使用环节使用公开密钥加密方式，之后建立的通信交换报文阶段则使用共享密钥加密方式。</strong></p>
<p>以上，大概就是使用对称加密和非对称加密的过程。看似过程很完美，其实还存在着一个问题，就是：<strong>如何保证服务器传过来的公开密钥的正确性。换句话说，就是保证它不被拦截篡改。</strong></p>
<h2 id="articleHeader8">使用证书保证公钥的正确性</h2>
<p>假如现在正准备和某台服务器建立公开密钥加密方式下的通信，如何证明客户端收到的公开密钥就是原本预想的那台服务器发行的公开密钥呢？或许，在公开密钥传输的过程中，真正的公开密钥可能已经被攻击者替换掉了。</p>
<p>为了解决这个问题，可以使用由数字证书机构和其相关颁发的公开密钥证书。</p>
<p>下面阐述一下数字证书认证机构（简称CA）的业务流程：</p>
<p>首先，服务器的运营人员向数字证书机构提出公开密钥的申请。数字证书认证机构在判明提出申请者的身份之后，会对已申请的公开密钥做数字签名，然后分配这个已签名的公开密钥，并将该公开密钥放入公钥证书后绑定在一起。  <br>我们用<strong>白话文</strong>来翻译一下上面这段话：</p>
<ul>
<li>首先，CA会向申请者颁发一个证书，这个证书里面的内容有：签发者、证书用途、使用的HASH算法、签名所使用的算法、证书到期的时间等等。</li>
<li>紧接着，把上面所提到的内容，做一次HASH求值，得到一个HASH值。</li>
<li>再接着，用CA的<strong>私钥</strong>对这个HASH值和所使用的HASH算法加密，这样就完成了数字签名。而用CA的私钥加密后，就生成了类似人体指纹的签名，任何篡改证书的尝试，都会被数字签名发现。</li>
<li>最后，把数字签名，附在数字证书的末尾，传输给服务器。</li>
</ul>
<p>接下来，服务器会把这份由数字证书认证机构颁发的公钥证书发给客户端。这个时候，客户端可以使用数字证书机构的公开密钥对其进行验证。一旦验证成功，客户端便能够确定这个公开密钥是可信的。<br>我们再用<strong>白话文</strong>来翻译一下：</p>
<ul>
<li>客户端拿到这个数字证书以后，用CA私钥对应的公钥，可以解密数字证书末尾的数字签名，得到HASH值和所采用的HASH算法。</li>
<li>紧接着，客户端按照解密到的这个HASH算法，对证书的内容求HASH值。如果通过CA公钥解密的HASH和通过计算求得的HASH值相同，那么认证通过，否则失败。</li>
<li>如果认证通过，就可以取得服务器的公开密钥。</li>
</ul>
<p>那客户端上面的CA公钥是从哪里来的呢？</p>
<p>其实，CA除了给申请者发布证书，它自己本身也有自己的证书。CA自身的数字证书（一般由它自己生成）在我们操作系统刚安装好的时候，这些CA自身的数字证书就已经被微软（或者其它操作系统的开发机构）安装在操作系统中了。而CA的公钥就包含在其中。这样，CA就可以通过自身的私钥对发布的数字证书进行签名，而在客户端就能够用对应的公钥来对其进行解密。</p>
<p>其具体过程是这样子的（图中简化了数字签名的过程）：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012196649?w=698&amp;h=542" src="https://static.alili.tech/img/remote/1460000012196649?w=698&amp;h=542" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>这里其实就用到了<strong>非对称加密算法</strong>，只不过现在这个加密算法用来<strong>签名</strong>而不是<strong>加密</strong>。</p>
<p>使用私钥加密，公钥解密，用于公钥的持有者验证通过私钥加密的内容是否被篡改，但是不用来保证内容是否被他人获得。</p>
<p>而使用公钥加密，私钥解密，则是相反的，它不保证信息被他人截获篡改，但是保证信息无法被中间人获得。</p>
<h3 id="articleHeader9">客户端证书</h3>
<p>HTTPS中不仅可以使用服务器证书，还可以使用客户端证书。以客户端证书进行客户端认证，它的作用与服务器证书是相同的。</p>
<p>由于客户端获取证书需要用户自行安装客户端证书，同时也面临着费用的问题。</p>
<p>因此，现状是，安全性极高的认证机构可办法客户端证书但是仅用于特殊用途的业务。比如那些可支撑客户端证书支出费用的业务。</p>
<p>例如，银行的网上银行就采用了客户端证书。在登录网银时不仅要求用户确认输入ID和密码，还会要求用户的客户端证书，以确认用户是否从特定的终端访问网银。</p>
<h2 id="articleHeader10">HTTPS通信的过程</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012196650?w=651&amp;h=771" src="https://static.alili.tech/img/remote/1460000012196650?w=651&amp;h=771" alt="" title="" style="cursor: pointer;"></span></p>
<p>现在我们来理清一下SSL建立的过程：</p>
<ol>
<li>客户端通过发送Client Hello报文开始SSL通信。报文中包含客户端支持的SSL的指定版本、加密组件（Cipher Suite）列表（所使用的加密算法及密钥长度等）。  <br>注意：客户端还会附加一个<strong>随机数</strong>，这里记为A。<br><br>
</li>
<li>服务器可进行SSL通信时，会以Server Hello报文作为应答。和客户端一样，在报文中包含SSL版本以及加密组件。服务器的加密组件内容是从接收到的客户端加密组件内筛选出来的。  <br>注意：这里服务器同样会附加一个<strong>随机数</strong>，发给客户端，这里记为B。<br><br>
</li>
<li>之后服务器发送Certificate报文。报文中包含公开密钥证书。（具体的数字签名请看证书一节）<br><br>
</li>
<li>最后服务器发送Server Hello Done报文通知客户端，最初阶段的SSL握手协商部分结束。<br><br>
</li>
<li>SSL第一次握手结束后，客户端会对服务器发过来的证书进行验证，如果验证成功，解密取出证书中的公钥。（具体查看证书一节）  <br>接着，客户端以Client Key Exchange报文作为回应。报文中包含通信加密中使用的一种被称为<code>Pre-master secret</code>的随机密码串。该报文使用从证书中解密获得的公钥进行加密（其实就是服务器的公钥）。  <br><br>
</li>
<li>客户端继续发送Change Cipher Spec报文。用于告知服务端，客户端已经切换到之前协商好的加密套件（Cipher Suite）的状态，准备使用之前协商好的加密套件加密数据并传输了。<br><br>
</li>
<li>客户端发送Finished报文。该报文包含连接至今全部报文的整体校验值（也就是HASH值），用来供服务器校验。<br><br>
</li>
<li>服务器接收到客户端的请求之后，使用私钥解密报文，把<code>Pre-master secret</code>取出来。接着，服务器同样发送Change Cipher Spec报文。<br><br>
</li>
<li>服务器同样发送Finished报文，用来供客户端校验。<br><br>
</li>
<li>服务器和客户端的Finished报文交换完毕之后，SSL连接就算建立完成。当然，通信会受到SSL的保护。从此处开始进行应用层协议的通信，即发送HTTP请求。<br><br>
</li>
<li>应用层协议通信，即发送HTTP响应。<br><br>
</li>
<li>最后由客户端断开连接。断开连接时，发送close_notify报文。上图做了一些省略，这步之后再发送TCP FIN报文来关闭与TCP的通信。</li>
</ol>
<p>读到这里，你可能会对上面的一些细节产生很多疑惑，现在我们一个个来理清楚？</p>
<h4>问题一</h4>
<p>为什么最后客户端和服务端都要发送一个Finish报文？</p>
<p>上面已经提及，Finish报文是对至今全部报文的整体校验值（也就是HASH值）。当客户端把这个值通过得到的公钥进行加密的时候，服务器得到之后对其进行解密，然后再对全部报文进行一个HASH求值。如果这个值跟解密得到的值相等的话，那么说明客户端是可信赖的。<br>同样的，服务器发送这样的一个整体校验值，用来客户端验证服务器是否是真正要进行通信的那一个。<br>综上，这个Finish报文就是用来校验双方的身份的。</p>
<h4>问题二</h4>
<p>整个过程中产生的三个<strong>随机数</strong>有什么用呢？还有，后面进行HTTP通信的时候，是用哪一个密钥进行加密，还有怎么保证报文的完整性。</p>
<p>看下面这张图。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012196651?w=639&amp;h=393" src="https://static.alili.tech/img/remote/1460000012196651?w=639&amp;h=393" alt="" title="" style="cursor: pointer;"></span></p>
<p>对于<strong>客户端</strong>：  <br>当其生成了<code>Pre-master secret</code>之后，会结合原来的A、B随机数，用DH算法计算出一个<code>master secret</code>，紧接着根据这个<code>master secret</code>推导出<code>hash secret</code>和<code>session secret</code>。</p>
<p>对于<strong>服务端</strong>：  <br>当其解密获得了<code>Pre-master secret</code>之后，会结合原来的A、B随机数，用DH算法计算出一个<code>master secret</code>，紧接着根据这个<code>master secret</code>推导出<code>hash secret</code>和<code>session secret</code>。</p>
<blockquote>在客户端和服务端的<code>master secret</code>是依据三个随机数推导出来的，它是不会在网络上传输的，只有双方知道，不会有第三者知道。同时，客户端推导出来的<code>session secret</code>和<code>hash secret</code>与服务端也是完全一样的。</blockquote>
<p>那么现在双方如果开始使用对称算法加密来进行通讯，使用哪个作为共享的密钥呢？过程是这样子的：</p>
<p>双方使用对称加密算法进行加密，用<code>hash secret</code>对HTTP报文做一次运算生成一个<code>MAC</code>，附在HTTP报文的后面，然后用<code>session-secret</code>加密所有数据（<code>HTTP+MAC</code>），然后发送。</p>
<p>接收方则先用<code>session-secret</code>解密数据，然后得到<code>HTTP+MAC</code>，再用相同的算法计算出自己的<code>MAC</code>，如果两个<code>MAC</code>相等，证明数据没有被篡改。</p>
<blockquote>MAC(Message Authentication Code)称为报文摘要，能够查知报文是否遭到篡改，从而保护报文的完整性。</blockquote>
<h4>问题三</h4>
<p>为什么要使用三个随机数呢？</p>
<p>网友dog250是这么解释的：</p>
<blockquote>"不管是客户端还是服务器，都需要随机数，这样生成的密钥才不会每次都一样。由于SSL协议中证书是静态的，因此十分有必要引入一种随机因素来保证协商出来的密钥的随机性。  <br>对于RSA密钥交换算法来说，<code>pre-master secret</code>本身就是一个随机数，再加上hello消息中的随机，三个随机数通过一个密钥导出器最终导出一个对称密钥。  <br><code>pre-master secret</code>的存在在于SSL协议不信任每个主机都能产生完全随机的随机数，如果随机数不随机，那么<code>pre-master secret</code>就有可能被猜出来，那么仅适用<code>pre-master secret</code>作为密钥就不合适了，因此必须引入新的随机因素，那么客户端和服务器加上<code>pre-master secret</code>三个随机数一同生成的密钥就不容易被猜出了，一个伪随机可能完全不随机，可是是三个伪随机就十分接近随机了，每增加一个自由度，随机性增加的可不是一。"</blockquote>
<p>注：我们在计算机所使用的随机数都是伪随机，而不是物理上所说的真正随机。</p>
<p>另外，黑客可能拦截了这样的一个加密的报文，他不对报文进行修改，而是不停的向报文的接受者发送重复的报文，以扰乱通信的建立。于是，就可以加这么一个随机数。只要任何一个通信方，接收到的报文中的随机数出现重复的情况，就可以知道有中间者对通信的过程进行了扰乱，可以立即中断通信。</p>
<h4>问题四</h4>
<p>如果黑客拦截了服务器把证书发送给客户端，并对证书进行恶意修改，会出现什么情况？</p>
<p>第一种情况，假如黑客只是单纯的修改数字证书中的内容，那么由于数字签名的存在，客户端会很容易的判断出报文是否被篡改。</p>
<p>第二种情况，黑客不仅修改了数字证书的内容，并且把数字签名替换掉了，由于黑客不可能知道CA的私钥，于是在客户端用CA的公钥进行解密的时候，解密之后得不到正确的信息，也很容易判断出报文是否被修改。</p>
<p>第三种情况，黑客恶意的从相同的第三方CA申请了一个数字证书。由于这个CA是真实存在的，所以客户端是可以用CA的公钥进行解密，得到了黑客提供的数字证书中的公钥。但是，由于数字证书在申请的时候，会绑定一个<strong>域名</strong>，当客户端比如说浏览器，检测到这个数字证书中的域名和我们现在网页访问的域名不一致，便会发出警告，此时我们也能得知数字证书被替换了。发出的警告如下：</p>
<p><span class="img-wrap"><img data-src="/img/bV0FNg?w=526&amp;h=288" src="https://static.alili.tech/img/bV0FNg?w=526&amp;h=288" alt="89294765.jpg" title="89294765.jpg" style="cursor: pointer;"></span></p>
<h2 id="articleHeader11">一定要用HTTPS吗</h2>
<p>当HTTP披上SSL外壳之后，由于加入了诸多验证的机制，虽然安全性大大提高了，但是它的处理速度会变慢。慢的原因分以下两种：</p>
<ul>
<li>服务器在与客户端协商次数增多，也就是说整体上处理<strong>通信量</strong>会不可避免的增加。</li>
<li>SSL进行加密处理，在服务端和客户端都需要进行加密和解密的<strong>运算处理</strong>。结果会消耗更多的硬件资源，导致负载增加。</li>
</ul>
<p>可见，使用HTTPS会消耗更多的资源。如果每次通信都加密，那么平摊到一台计算机上，能够处理的请求数量也必定会减少。</p>
<p>同时，使用HTTPS需要向CA购买证书，于是<strong>开销</strong>也成为考虑是否使用HTTPS的原因之一。</p>
<p>所以，大部分的Web网站都采取了一个折中的方法。对于一些需要隐藏、私密的信息进行加密，而普通的信息不进行加密处理，以节省资源。</p>
<h2 id="articleHeader12">fiddler拦截HTTPS请求的原理</h2>
<p>很多时候我们可以通过fiddler来进行抓HTTP包，但是当遇到连接采用的是HTTPS的时候，过程可能就不那么愉快了。但实际上实现拦截也十分简单。</p>
<p>fiddler拦截HTTPS请求最核心的地方在于真正的<strong>客户端</strong>需要<strong>安装fiddler的证书</strong>。这样子的话，fiddler能够伪造出CA证书，达到欺骗客户端，拿到需要的信息并推算出之后双方正常通信的对称加密密钥。</p>
<h2 id="articleHeader13">最后</h2>
<p>这学期刚好有《信息安全》这门课程，那就简明的介绍一下公钥密码密码体系RSA算法原理是什么。</p>
<p>它是这样子工作的：</p>
<ol>
<li>选取两个大素数<code>p</code>和<code>q</code>，相乘得到<code>n</code>。</li>
<li>
<code>p-1</code>和<code>q-1</code>相乘，得到<code>f(n)</code>。</li>
<li>随机选取一个<code>e</code>与<code>f(n)</code>互质，然后得到公钥<code>(e, n)</code>。</li>
<li>私钥的求法为<code>ed = 1 mod f(n)</code>。 [这是一个等价关系而不是一个表达式！也就是<code>ed</code>模<code>fn(n)</code>的结果是1，这是求模运算的逆运算，可以用欧几里德辗转相除法求得]</li>
<li>最后得到的私钥为<code>(d, n)</code>。</li>
</ol>
<blockquote>整个RSA公钥密码算法的难度其实在于分解这一个大数<code>n</code>，<code>pq=n</code>正向运算很容易，逆向运算很困难，随着这个数越来越大，想要逆向分解需要很多年的时间。</blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012630692?w=540&amp;h=151" src="https://static.alili.tech/img/remote/1460000012630692?w=540&amp;h=151" alt="" title="" style="cursor: pointer;"></span></p>
<hr>
<p>参考书籍：《图解HTTP》<br>参考链接：<br><a href="https://www.zhihu.com/question/52493697" rel="nofollow noreferrer" target="_blank">https://www.zhihu.com/questio...</a>  <br><a href="http://www.cnblogs.com/JeffreySun/archive/2010/06/24/1627247.html" rel="nofollow noreferrer" target="_blank">http://www.cnblogs.com/Jeffre...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
解析HTTPS

## 原文链接
[https://segmentfault.com/a/1190000012196642](https://segmentfault.com/a/1190000012196642)

