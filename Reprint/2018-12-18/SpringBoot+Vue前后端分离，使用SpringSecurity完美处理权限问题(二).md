---
title: 'SpringBoot+Vue前后端分离，使用SpringSecurity完美处理权限问题(二)' 
date: 2018-12-18 2:30:11
hidden: true
slug: cthvetxyf4c
categories: [reprint]
---

{{< raw >}}

                    
<p>当前后端分离时，权限问题的处理也和我们传统的处理方式有一点差异。笔者前几天刚好在负责一个项目的权限管理模块，现在权限管理模块已经做完了，我想通过5-6篇文章，来介绍一下项目中遇到的问题以及我的解决方案，希望这个系列能够给小伙伴一些帮助。本系列文章并不是手把手的教程，主要介绍了核心思路并讲解了核心代码，完整的代码小伙伴们可以在GitHub上star并clone下来研究。另外，原本计划把项目跑起来放到网上供小伙伴们查看，但是之前买服务器为了省钱，内存只有512M，两个应用跑不起来(已经有一个<a href="https://github.com/lenve/VBlog" rel="nofollow noreferrer" target="_blank">V部落开源项目</a>在运行)，因此小伙伴们只能将就看一下下面的截图了，GitHub上有部署教程，部署到本地也可以查看完整效果。</p>
<hr>
<p>项目地址：<a href="https://github.com/lenve/vhr" rel="nofollow noreferrer" target="_blank">https://github.com/lenve/vhr</a>  </p>
<p>上篇文章我们对项目做了一个整体的介绍，从本文开始，我们就来实现我们的权限管理模块。由于前后端分离，因此我们先来完成后台接口，完成之后，可以先用POSTMAN或者RESTClient等工具进行测试，测试成功之后，我们再来着手开发前端。  </p>
<p>本文是本系列的第二篇，建议先阅读前面的文章有助于更好的理解本文：  </p>
<p>1.<a href="http://mp.weixin.qq.com/s/lpznrVx6Bh9X7ZnunrWQSA" rel="nofollow noreferrer" target="_blank">SpringBoot+Vue前后端分离，使用SpringSecurity完美处理权限问题(一)</a></p>
<h2 id="articleHeader0">创建SpringBoot项目</h2>
<p>在IDEA中创建SpringBoot项目，创建完成之后，添加如下依赖：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<dependencies>
    <dependency>
        <groupId>org.mybatis.spring.boot</groupId>
        <artifactId>mybatis-spring-boot-starter</artifactId>
        <version>1.3.1</version>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>com.alibaba</groupId>
        <artifactId>druid</artifactId>
        <version>1.0.29</version>
    </dependency>
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
    </dependency>
</dependencies>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">dependencies</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>org.mybatis.spring.boot<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>mybatis-spring-boot-starter<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">version</span>&gt;</span>1.3.1<span class="hljs-tag">&lt;/<span class="hljs-name">version</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>org.springframework.boot<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>spring-boot-starter-security<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>org.springframework.boot<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>spring-boot-starter-web<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>com.alibaba<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>druid<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">version</span>&gt;</span>1.0.29<span class="hljs-tag">&lt;/<span class="hljs-name">version</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>mysql<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>mysql-connector-java<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">dependencies</span>&gt;</span></code></pre>
<p>这些都是常规的依赖，有SpringBoot、SpringSecurity、Druid数据库连接池，还有数据库驱动。  </p>
<p>然后在application.properties中配置数据库，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="spring.datasource.type=com.alibaba.druid.pool.DruidDataSource
spring.datasource.url=jdbc:mysql://127.0.0.1:3306/vhr?useUnicode=true&amp;characterEncoding=UTF-8
spring.datasource.username=root
spring.datasource.password=123

server.port=8082" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>spring<span class="hljs-selector-class">.datasource</span><span class="hljs-selector-class">.type</span>=com<span class="hljs-selector-class">.alibaba</span><span class="hljs-selector-class">.druid</span><span class="hljs-selector-class">.pool</span><span class="hljs-selector-class">.DruidDataSource</span>
spring<span class="hljs-selector-class">.datasource</span><span class="hljs-selector-class">.url</span>=jdbc:mysql:<span class="hljs-comment">//127.0.0.1:3306/vhr?useUnicode=true&amp;characterEncoding=UTF-8</span>
spring<span class="hljs-selector-class">.datasource</span><span class="hljs-selector-class">.username</span>=root
spring<span class="hljs-selector-class">.datasource</span><span class="hljs-selector-class">.password</span>=<span class="hljs-number">123</span>

server.port=<span class="hljs-number">8082</span></code></pre>
<p>OK，至此，我们的工程就创建好了。</p>
<h2 id="articleHeader1">创建Hr和HrService</h2>
<p>首先我们需要创建Hr类，即我们的用户类，该类实现了UserDetails接口，该类的属性如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="public class Hr implements UserDetails {
    private Long id;
    private String name;
    private String phone;
    private String telephone;
    private String address;
    private boolean enabled;
    private String username;
    private String password;
    private String remark;
    private List<Role> roles;
    private String userface;
    //getter/setter省略
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-keyword">public</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Hr</span> <span class="hljs-keyword"><span class="hljs-keyword">implements</span> <span class="hljs-type">UserDetails</span></span> </span>{
    <span class="hljs-keyword">private</span> Long id;
    <span class="hljs-keyword">private</span> <span class="hljs-keyword">String</span> name;
    <span class="hljs-keyword">private</span> <span class="hljs-keyword">String</span> phone;
    <span class="hljs-keyword">private</span> <span class="hljs-keyword">String</span> telephone;
    <span class="hljs-keyword">private</span> <span class="hljs-keyword">String</span> address;
    <span class="hljs-keyword">private</span> boolean enabled;
    <span class="hljs-keyword">private</span> <span class="hljs-keyword">String</span> username;
    <span class="hljs-keyword">private</span> <span class="hljs-keyword">String</span> password;
    <span class="hljs-keyword">private</span> <span class="hljs-keyword">String</span> remark;
    <span class="hljs-keyword">private</span> List&lt;Role&gt; roles;
    <span class="hljs-keyword">private</span> <span class="hljs-keyword">String</span> userface;
    <span class="hljs-comment">//getter/setter省略</span>
}</code></pre>
<blockquote>如果小伙伴对属性的含义有疑问，可以参考<a href="https://github.com/lenve/vhr/wiki/1.%E6%9D%83%E9%99%90%E6%95%B0%E6%8D%AE%E5%BA%93%E8%AE%BE%E8%AE%A1" rel="nofollow noreferrer" target="_blank">1.权限数据库设计</a>.</blockquote>
<p>UserDetails接口默认有几个方法需要实现，这几个方法中，除了isEnabled返回了正常的enabled之外，其他的方法我都统一返回true，因为我这里的业务逻辑并不涉及到账户的锁定、密码的过期等等，只有账户是否被禁用，因此只处理了isEnabled方法，这一块小伙伴可以根据自己的实际情况来调整。另外，UserDetails中还有一个方法叫做getAuthorities，该方法用来获取当前用户所具有的角色，但是小伙伴也看到了，我的Hr中有一个roles属性用来描述当前用户的角色，因此我的getAuthorities方法的实现如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="public Collection<? extends GrantedAuthority> getAuthorities() {
    List<GrantedAuthority> authorities = new ArrayList<>();
    for (Role role : roles) {
        authorities.add(new SimpleGrantedAuthority(role.getName()));
    }
    return authorities;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-keyword">public</span> Collection&lt;? extends GrantedAuthority&gt; getAuthorities() {
    List&lt;GrantedAuthority&gt; authorities = <span class="hljs-keyword">new</span> <span class="hljs-type">ArrayList</span>&lt;&gt;();
    <span class="hljs-keyword">for</span> (Role role : <span class="hljs-type">roles</span>) {
        authorities.add(<span class="hljs-keyword">new</span> <span class="hljs-type">SimpleGrantedAuthority</span>(role.getName()));
    }
    <span class="hljs-keyword">return</span> authorities;
}</code></pre>
<p>即直接从roles中获取当前用户所具有的角色，构造SimpleGrantedAuthority然后返回即可。  </p>
<p>创建好Hr之后，接下来我们需要创建HrService，用来执行登录等操作，HrService需要实现UserDetailsService接口，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Service
@Transactional
public class HrService implements UserDetailsService {

    @Autowired
    HrMapper hrMapper;

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        Hr hr = hrMapper.loadUserByUsername(s);
        if (hr == null) {
            throw new UsernameNotFoundException(&quot;用户名不对&quot;);
        }
        return hr;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-meta">@Service</span>
<span class="hljs-meta">@Transactional</span>
<span class="hljs-keyword">public</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HrService</span> <span class="hljs-keyword">implements</span> <span class="hljs-title">UserDetailsService</span> </span>{

    <span class="hljs-meta">@Autowired</span>
    HrMapper hrMapper;

    <span class="hljs-meta">@Override</span>
    <span class="hljs-function"><span class="hljs-keyword">public</span> UserDetails <span class="hljs-title">loadUserByUsername</span><span class="hljs-params">(String s)</span> <span class="hljs-keyword">throws</span> UsernameNotFoundException </span>{
        Hr hr = hrMapper.loadUserByUsername(s);
        <span class="hljs-keyword">if</span> (hr == <span class="hljs-keyword">null</span>) {
            <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> UsernameNotFoundException(<span class="hljs-string">"用户名不对"</span>);
        }
        <span class="hljs-keyword">return</span> hr;
    }
}</code></pre>
<p>这里最主要是实现了UserDetailsService接口中的loadUserByUsername方法，在执行登录的过程中，这个方法将根据用户名去查找用户，如果用户不存在，则抛出UsernameNotFoundException异常，否则直接将查到的Hr返回。HrMapper用来执行数据库的查询操作，这个不在本系列的介绍范围内，所有涉及到数据库的操作都将只介绍方法的作用。</p>
<h2 id="articleHeader2">自定义FilterInvocationSecurityMetadataSource</h2>
<p>FilterInvocationSecurityMetadataSource有一个默认的实现类DefaultFilterInvocationSecurityMetadataSource，该类的主要功能就是通过当前的请求地址，获取该地址需要的用户角色，我们照猫画虎，自己也定义一个FilterInvocationSecurityMetadataSource，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Component
public class UrlFilterInvocationSecurityMetadataSource implements FilterInvocationSecurityMetadataSource {
    @Autowired
    MenuService menuService;
    AntPathMatcher antPathMatcher = new AntPathMatcher();

    @Override
    public Collection<ConfigAttribute> getAttributes(Object o) throws IllegalArgumentException {
        //获取请求地址
        String requestUrl = ((FilterInvocation) o).getRequestUrl();
        if (&quot;/login_p&quot;.equals(requestUrl)) {
            return null;
        }
        List<Menu> allMenu = menuService.getAllMenu();
        for (Menu menu : allMenu) {
            if (antPathMatcher.match(menu.getUrl(), requestUrl)&amp;&amp;menu.getRoles().size()>0) {
                List<Role> roles = menu.getRoles();
                int size = roles.size();
                String[] values = new String[size];
                for (int i = 0; i < size; i++) {
                    values[i] = roles.get(i).getName();
                }
                return SecurityConfig.createList(values);
            }
        }
        //没有匹配上的资源，都是登录访问
        return SecurityConfig.createList(&quot;ROLE_LOGIN&quot;);
    }

    @Override
    public Collection<ConfigAttribute> getAllConfigAttributes() {
        return null;
    }

    @Override
    public boolean supports(Class<?> aClass) {
        return FilterInvocation.class.isAssignableFrom(aClass);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-meta">@Component</span>
<span class="hljs-keyword">public</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">UrlFilterInvocationSecurityMetadataSource</span> <span class="hljs-keyword">implements</span> <span class="hljs-title">FilterInvocationSecurityMetadataSource</span> </span>{
    <span class="hljs-meta">@Autowired</span>
    MenuService menuService;
    AntPathMatcher antPathMatcher = <span class="hljs-keyword">new</span> AntPathMatcher();

    <span class="hljs-meta">@Override</span>
    <span class="hljs-function"><span class="hljs-keyword">public</span> Collection&lt;ConfigAttribute&gt; <span class="hljs-title">getAttributes</span><span class="hljs-params">(Object o)</span> <span class="hljs-keyword">throws</span> IllegalArgumentException </span>{
        <span class="hljs-comment">//获取请求地址</span>
        String requestUrl = ((FilterInvocation) o).getRequestUrl();
        <span class="hljs-keyword">if</span> (<span class="hljs-string">"/login_p"</span>.equals(requestUrl)) {
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">null</span>;
        }
        List&lt;Menu&gt; allMenu = menuService.getAllMenu();
        <span class="hljs-keyword">for</span> (Menu menu : allMenu) {
            <span class="hljs-keyword">if</span> (antPathMatcher.match(menu.getUrl(), requestUrl)&amp;&amp;menu.getRoles().size()&gt;<span class="hljs-number">0</span>) {
                List&lt;Role&gt; roles = menu.getRoles();
                <span class="hljs-keyword">int</span> size = roles.size();
                String[] values = <span class="hljs-keyword">new</span> String[size];
                <span class="hljs-keyword">for</span> (<span class="hljs-keyword">int</span> i = <span class="hljs-number">0</span>; i &lt; size; i++) {
                    values[i] = roles.get(i).getName();
                }
                <span class="hljs-keyword">return</span> SecurityConfig.createList(values);
            }
        }
        <span class="hljs-comment">//没有匹配上的资源，都是登录访问</span>
        <span class="hljs-keyword">return</span> SecurityConfig.createList(<span class="hljs-string">"ROLE_LOGIN"</span>);
    }

    <span class="hljs-meta">@Override</span>
    <span class="hljs-function"><span class="hljs-keyword">public</span> Collection&lt;ConfigAttribute&gt; <span class="hljs-title">getAllConfigAttributes</span><span class="hljs-params">()</span> </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">null</span>;
    }

    <span class="hljs-meta">@Override</span>
    <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">boolean</span> <span class="hljs-title">supports</span><span class="hljs-params">(Class&lt;?&gt; aClass)</span> </span>{
        <span class="hljs-keyword">return</span> FilterInvocation.class.isAssignableFrom(aClass);
    }
}</code></pre>
<p>关于自定义这个类，我说如下几点：  </p>
<p>1.一开始注入了MenuService，MenuService的作用是用来查询数据库中url pattern和role的对应关系，查询结果是一个List集合，集合中是Menu类，Menu类有两个核心属性，一个是url pattern，即匹配规则(比如<code>/admin/**</code>)，还有一个是List&lt;Role&gt;,即这种规则的路径需要哪些角色才能访问。  </p>
<p>2.我们可以从getAttributes(Object o)方法的参数o中提取出当前的请求url，然后将这个请求url和数据库中查询出来的所有url pattern一一对照，看符合哪一个url pattern，然后就获取到该url pattern所对应的角色，当然这个角色可能有多个，所以遍历角色，最后利用SecurityConfig.createList方法来创建一个角色集合。  </p>
<p>3.第二步的操作中，涉及到一个优先级问题，比如我的地址是<code>/employee/basic/hello</code>,这个地址既能被<code>/employee/**</code>匹配，也能被<code>/employee/basic/**</code>匹配，这就要求我们从数据库查询的时候对数据进行排序，将<code>/employee/basic/**</code>类型的url pattern放在集合的前面去比较。  </p>
<p>4.如果getAttributes(Object o)方法返回null的话，意味着当前这个请求不需要任何角色就能访问，甚至不需要登录。但是在我的整个业务中，并不存在这样的请求，我这里的要求是，所有未匹配到的路径，都是认证(登录)后可访问，因此我在这里返回一个<code>ROLE_LOGIN</code>的角色，这种角色在我的角色数据库中并不存在，因此我将在下一步的角色比对过程中特殊处理这种角色。  </p>
<p>5.如果地址是/login_p，这个是登录页，不需要任何角色即可访问，直接返回null。  </p>
<p>6.getAttributes(Object o)方法返回的集合最终会来到AccessDecisionManager类中，接下来我们再来看AccessDecisionManager类。</p>
<h2 id="articleHeader3">自定义AccessDecisionManager</h2>
<p>自定义UrlAccessDecisionManager类实现AccessDecisionManager接口，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Component
public class UrlAccessDecisionManager implements AccessDecisionManager {
    @Override
    public void decide(Authentication authentication, Object o, Collection<ConfigAttribute> collection) throws AccessDeniedException, AuthenticationException {
        Iterator<ConfigAttribute> iterator = collection.iterator();
        while (iterator.hasNext()) {
            ConfigAttribute ca = iterator.next();
            //当前请求需要的权限
            String needRole = ca.getAttribute();
            if (&quot;ROLE_LOGIN&quot;.equals(needRole)) {
                if (authentication instanceof AnonymousAuthenticationToken) {
                    throw new BadCredentialsException(&quot;未登录&quot;);
                } else
                    return;
            }
            //当前用户所具有的权限
            Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
            for (GrantedAuthority authority : authorities) {
                if (authority.getAuthority().equals(needRole)) {
                    return;
                }
            }
        }
        throw new AccessDeniedException(&quot;权限不足!&quot;);
    }

    @Override
    public boolean supports(ConfigAttribute configAttribute) {
        return true;
    }

    @Override
    public boolean supports(Class<?> aClass) {
        return true;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs aspectj"><code><span class="hljs-meta">@Component</span>
<span class="hljs-keyword">public</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">UrlAccessDecisionManager</span> <span class="hljs-keyword">implements</span> <span class="hljs-title">AccessDecisionManager</span> </span>{
    <span class="hljs-meta">@Override</span>
    <span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">decide</span><span class="hljs-params">(Authentication authentication, Object o, Collection&lt;ConfigAttribute&gt; collection)</span> <span class="hljs-keyword">throws</span> AccessDeniedException, AuthenticationException </span>{
        Iterator&lt;ConfigAttribute&gt; iterator = collection.iterator();
        <span class="hljs-keyword">while</span> (iterator.hasNext()) {
            ConfigAttribute ca = iterator.next();
            <span class="hljs-comment">//当前请求需要的权限</span>
            String needRole = ca.getAttribute();
            <span class="hljs-keyword">if</span> (<span class="hljs-string">"ROLE_LOGIN"</span>.equals(needRole)) {
                <span class="hljs-keyword">if</span> (authentication <span class="hljs-keyword">instanceof</span> AnonymousAuthenticationToken) {
                    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> BadCredentialsException(<span class="hljs-string">"未登录"</span>);
                } <span class="hljs-keyword">else</span>
                    <span class="hljs-keyword">return</span>;
            }
            <span class="hljs-comment">//当前用户所具有的权限</span>
            Collection&lt;? <span class="hljs-keyword">extends</span> GrantedAuthority&gt; authorities = authentication.getAuthorities();
            <span class="hljs-keyword">for</span> (GrantedAuthority authority : authorities) {
                <span class="hljs-keyword">if</span> (authority.getAuthority().equals(needRole)) {
                    <span class="hljs-keyword">return</span>;
                }
            }
        }
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> AccessDeniedException(<span class="hljs-string">"权限不足!"</span>);
    }

    <span class="hljs-meta">@Override</span>
    <span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">boolean</span> <span class="hljs-title">supports</span><span class="hljs-params">(ConfigAttribute configAttribute)</span> </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">true</span>;
    }

    <span class="hljs-meta">@Override</span>
    <span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">boolean</span> <span class="hljs-title">supports</span><span class="hljs-params">(Class&lt;?&gt; aClass)</span> </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">true</span>;
    }
}</code></pre>
<p>关于这个类，我说如下几点：  </p>
<p>1.decide方法接收三个参数，其中第一个参数中保存了当前登录用户的角色信息，第三个参数则是UrlFilterInvocationSecurityMetadataSource中的getAttributes方法传来的，表示当前请求需要的角色（可能有多个）。  </p>
<p>2.如果当前请求需要的权限为<code>ROLE_LOGIN</code>则表示登录即可访问，和角色没有关系，此时我需要判断authentication是不是AnonymousAuthenticationToken的一个实例，如果是，则表示当前用户没有登录，没有登录就抛一个BadCredentialsException异常，登录了就直接返回，则这个请求将被成功执行。  </p>
<p>3.遍历collection，同时查看当前用户的角色列表中是否具备需要的权限，如果具备就直接返回，否则就抛异常。   </p>
<p>4.这里涉及到一个all和any的问题：假设当前用户具备角色A、角色B，当前请求需要角色B、角色C，那么是要当前用户要包含所有请求角色才算授权成功还是只要包含一个就算授权成功？我这里采用了第二种方案，即只要包含一个即可。小伙伴可根据自己的实际情况调整decide方法中的逻辑。</p>
<h2 id="articleHeader4">自定义AccessDeniedHandler</h2>
<p>通过自定义AccessDeniedHandler我们可以自定义403响应的内容，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Component
public class AuthenticationAccessDeniedHandler implements AccessDeniedHandler {
    @Override
    public void handle(HttpServletRequest httpServletRequest, HttpServletResponse resp, AccessDeniedException e) throws IOException, ServletException {
        resp.setStatus(HttpServletResponse.SC_FORBIDDEN);
        resp.setCharacterEncoding(&quot;UTF-8&quot;);
        PrintWriter out = resp.getWriter();
        out.write(&quot;{\&quot;status\&quot;:\&quot;error\&quot;,\&quot;msg\&quot;:\&quot;权限不足，请联系管理员!\&quot;}&quot;);
        out.flush();
        out.close();
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ceylon"><code>@Component
public <span class="hljs-keyword">class</span> AuthenticationAccessDeniedHandler implements AccessDeniedHandler {
    @Override
    public <span class="hljs-keyword">void</span> handle(HttpServletRequest httpServletRequest, HttpServletResponse resp, AccessDeniedException e) <span class="hljs-meta">throws</span> IOException, ServletException {
        resp.setStatus(HttpServletResponse.SC<span class="hljs-number">_</span>FORBIDDEN);
        resp.setCharacterEncoding(<span class="hljs-string">"UTF-8"</span>);
        PrintWriter <span class="hljs-keyword">out</span> = resp.getWriter();
        <span class="hljs-keyword">out</span>.write(<span class="hljs-string">"{\"</span>status\<span class="hljs-string">":\"</span>error\<span class="hljs-string">",\"</span>msg\<span class="hljs-string">":\"</span>权限不足，请联系管理员!\<span class="hljs-string">"}"</span>);
        <span class="hljs-keyword">out</span>.flush();
        <span class="hljs-keyword">out</span>.close();
    }
}</code></pre>
<h2 id="articleHeader5">配置WebSecurityConfig</h2>
<p>最后在webSecurityConfig中完成简单的配置即可，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Configuration
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    HrService hrService;
    @Autowired
    UrlFilterInvocationSecurityMetadataSource urlFilterInvocationSecurityMetadataSource;
    @Autowired
    UrlAccessDecisionManager urlAccessDecisionManager;
    @Autowired
    AuthenticationAccessDeniedHandler authenticationAccessDeniedHandler;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(hrService);
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers(&quot;/index.html&quot;, &quot;/static/**&quot;);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .withObjectPostProcessor(new ObjectPostProcessor<FilterSecurityInterceptor>() {
                    @Override
                    public <O extends FilterSecurityInterceptor> O postProcess(O o) {
                        o.setSecurityMetadataSource(urlFilterInvocationSecurityMetadataSource);
                        o.setAccessDecisionManager(urlAccessDecisionManager);
                        return o;
                    }
                }).and().formLogin().loginPage(&quot;/login_p&quot;).loginProcessingUrl(&quot;/login&quot;).usernameParameter(&quot;username&quot;).passwordParameter(&quot;password&quot;).permitAll().failureHandler(new AuthenticationFailureHandler() {
            @Override
            public void onAuthenticationFailure(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, AuthenticationException e) throws IOException, ServletException {
                httpServletResponse.setContentType(&quot;application/json;charset=utf-8&quot;);
                PrintWriter out = httpServletResponse.getWriter();
                StringBuffer sb = new StringBuffer();
                sb.append(&quot;{\&quot;status\&quot;:\&quot;error\&quot;,\&quot;msg\&quot;:\&quot;&quot;);
                if (e instanceof UsernameNotFoundException || e instanceof BadCredentialsException) {
                    sb.append(&quot;用户名或密码输入错误，登录失败!&quot;);
                } else if (e instanceof DisabledException) {
                    sb.append(&quot;账户被禁用，登录失败，请联系管理员!&quot;);
                } else {
                    sb.append(&quot;登录失败!&quot;);
                }
                sb.append(&quot;\&quot;}&quot;);
                out.write(sb.toString());
                out.flush();
                out.close();
            }
        }).successHandler(new AuthenticationSuccessHandler() {
            @Override
            public void onAuthenticationSuccess(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Authentication authentication) throws IOException, ServletException {
                httpServletResponse.setContentType(&quot;application/json;charset=utf-8&quot;);
                PrintWriter out = httpServletResponse.getWriter();
                ObjectMapper objectMapper = new ObjectMapper();
                String s = &quot;{\&quot;status\&quot;:\&quot;success\&quot;,\&quot;msg\&quot;:&quot; + objectMapper.writeValueAsString(HrUtils.getCurrentHr()) + &quot;}&quot;;
                out.write(s);
                out.flush();
                out.close();
            }
        }).and().logout().permitAll().and().csrf().disable().exceptionHandling().accessDeniedHandler(authenticationAccessDeniedHandler);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs aspectj"><code><span class="hljs-meta">@Configuration</span>
<span class="hljs-keyword">public</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">WebSecurityConfig</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">WebSecurityConfigurerAdapter</span> </span>{

    <span class="hljs-meta">@Autowired</span>
    HrService hrService;
    <span class="hljs-meta">@Autowired</span>
    UrlFilterInvocationSecurityMetadataSource urlFilterInvocationSecurityMetadataSource;
    <span class="hljs-meta">@Autowired</span>
    UrlAccessDecisionManager urlAccessDecisionManager;
    <span class="hljs-meta">@Autowired</span>
    AuthenticationAccessDeniedHandler authenticationAccessDeniedHandler;

    <span class="hljs-meta">@Override</span>
    <span class="hljs-keyword">protected</span> <span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">configure</span><span class="hljs-params">(AuthenticationManagerBuilder auth)</span> <span class="hljs-keyword">throws</span> Exception </span>{
        auth.userDetailsService(hrService);
    }

    <span class="hljs-meta">@Override</span>
    <span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">configure</span><span class="hljs-params">(WebSecurity web)</span> <span class="hljs-keyword">throws</span> Exception </span>{
        web.ignoring().antMatchers(<span class="hljs-string">"/index.html"</span>, <span class="hljs-string">"/static/**"</span>);
    }

    <span class="hljs-meta">@Override</span>
    <span class="hljs-keyword">protected</span> <span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">configure</span><span class="hljs-params">(HttpSecurity http)</span> <span class="hljs-keyword">throws</span> Exception </span>{
        http.authorizeRequests()
                .withObjectPostProcessor(<span class="hljs-keyword">new</span> ObjectPostProcessor&lt;FilterSecurityInterceptor&gt;() {
                    <span class="hljs-meta">@Override</span>
                    <span class="hljs-keyword">public</span> &lt;O <span class="hljs-keyword">extends</span> FilterSecurityInterceptor&gt; <span class="hljs-function">O <span class="hljs-title">postProcess</span><span class="hljs-params">(O o)</span> </span>{
                        o.setSecurityMetadataSource(urlFilterInvocationSecurityMetadataSource);
                        o.setAccessDecisionManager(urlAccessDecisionManager);
                        <span class="hljs-keyword">return</span> o;
                    }
                }).and().formLogin().loginPage(<span class="hljs-string">"/login_p"</span>).loginProcessingUrl(<span class="hljs-string">"/login"</span>).usernameParameter(<span class="hljs-string">"username"</span>).passwordParameter(<span class="hljs-string">"password"</span>).permitAll().failureHandler(<span class="hljs-keyword">new</span> AuthenticationFailureHandler() {
            <span class="hljs-meta">@Override</span>
            <span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">onAuthenticationFailure</span><span class="hljs-params">(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, AuthenticationException e)</span> <span class="hljs-keyword">throws</span> IOException, ServletException </span>{
                httpServletResponse.setContentType(<span class="hljs-string">"application/json;charset=utf-8"</span>);
                PrintWriter out = httpServletResponse.getWriter();
                StringBuffer sb = <span class="hljs-keyword">new</span> StringBuffer();
                sb.append(<span class="hljs-string">"{\"status\":\"error\",\"msg\":\""</span>);
                <span class="hljs-keyword">if</span> (e <span class="hljs-keyword">instanceof</span> UsernameNotFoundException || e <span class="hljs-keyword">instanceof</span> BadCredentialsException) {
                    sb.append(<span class="hljs-string">"用户名或密码输入错误，登录失败!"</span>);
                } <span class="hljs-function"><span class="hljs-keyword">else</span> <span class="hljs-title">if</span> <span class="hljs-params">(e <span class="hljs-keyword">instanceof</span> DisabledException)</span> </span>{
                    sb.append(<span class="hljs-string">"账户被禁用，登录失败，请联系管理员!"</span>);
                } <span class="hljs-keyword">else</span> {
                    sb.append(<span class="hljs-string">"登录失败!"</span>);
                }
                sb.append(<span class="hljs-string">"\"}"</span>);
                out.write(sb.toString());
                out.flush();
                out.close();
            }
        }).successHandler(<span class="hljs-keyword">new</span> AuthenticationSuccessHandler() {
            <span class="hljs-meta">@Override</span>
            <span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">onAuthenticationSuccess</span><span class="hljs-params">(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Authentication authentication)</span> <span class="hljs-keyword">throws</span> IOException, ServletException </span>{
                httpServletResponse.setContentType(<span class="hljs-string">"application/json;charset=utf-8"</span>);
                PrintWriter out = httpServletResponse.getWriter();
                ObjectMapper objectMapper = <span class="hljs-keyword">new</span> ObjectMapper();
                String s = <span class="hljs-string">"{\"status\":\"success\",\"msg\":"</span> + objectMapper.writeValueAsString(HrUtils.getCurrentHr()) + <span class="hljs-string">"}"</span>;
                out.write(s);
                out.flush();
                out.close();
            }
        }).and().logout().permitAll().and().csrf().disable().exceptionHandling().accessDeniedHandler(authenticationAccessDeniedHandler);
    }
}</code></pre>
<p>关于这个配置，我说如下几点：  </p>
<p>1.在configure(HttpSecurity http)方法中，通过withObjectPostProcessor将刚刚创建的UrlFilterInvocationSecurityMetadataSource和UrlAccessDecisionManager注入进来。到时候，请求都会经过刚才的过滤器（除了configure(WebSecurity web)方法忽略的请求）。  </p>
<p>2.successHandler中配置登录成功时返回的JSON，登录成功时返回当前用户的信息。  </p>
<p>3.failureHandler表示登录失败，登录失败的原因可能有多种，我们根据不同的异常输出不同的错误提示即可。  </p>
<p>OK，这些操作都完成之后，我们可以通过POSTMAN或者RESTClient来发起一个登录请求，看到如下结果则表示登录成功:  </p>
<p><span class="img-wrap"><img data-src="/img/bV1Iup?w=794&amp;h=342" src="https://static.alili.tech/img/bV1Iup?w=794&amp;h=342" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>关注公众号，可以及时接收到最新文章:  <br><span class="img-wrap"><img data-src="/img/bVUERD?w=258&amp;h=258" src="https://static.alili.tech/img/bVUERD?w=258&amp;h=258" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
SpringBoot+Vue前后端分离，使用SpringSecurity完美处理权限问题(二)

## 原文链接
[https://segmentfault.com/a/1190000012763317](https://segmentfault.com/a/1190000012763317)

