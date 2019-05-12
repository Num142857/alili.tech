---
title: '同学，GraphQL了解一下：实践篇' 
date: 2018-11-24 2:30:10
hidden: true
slug: gf5af3m4djr
categories: [reprint]
---

{{< raw >}}
<p>&#x4E0A;&#x4E00;&#x7BC7;&#xFF1A;<a href="http://closertb.site/2018/07/%E5%90%8C%E5%AD%A6%EF%BC%8CGraphQL%E4%BA%86%E8%A7%A3%E4%B8%80%E4%B8%8B%EF%BC%9A%E5%9F%BA%E7%A1%80%E7%AF%87/" rel="nofollow noreferrer" target="_blank">GraphQL&#x4E86;&#x89E3;&#x4E00;&#x4E0B;&#xFF1A;&#x57FA;&#x7840;&#x7BC7;</a><br>&#x4E0B;&#x4E00;&#x7BC7;&#xFF1A;<a href="http://closertb.site/2018/08/GraphQL%E8%BF%9B%E9%98%B6%E7%AF%87-%E6%8C%A5%E6%89%8BRedux%E4%B8%8D%E6%98%AF%E6%A2%A6/" rel="nofollow noreferrer" target="_blank">GraphQL&#x8FDB;&#x9636;&#x7BC7;: &#x6325;&#x624B;Redux&#x4E0D;&#x662F;&#x68A6;</a><br>&#x5728;&#x57FA;&#x7840;&#x7BC7;&#x4E3B;&#x8981;&#x8BB2;&#x4E86;GraphQL&#x51FA;&#x73B0;&#x7684;&#x610F;&#x4E49;&#x4E0E;&#x4E00;&#x4E9B;&#x57FA;&#x7840;&#x8BED;&#x6CD5;&#x3002;&#x5982;&#x679C;&#x5BF9;GraphQL&#x8FD8;&#x4E0D;&#x662F;&#x5F88;&#x4E86;&#x89E3;&#x7684;&#x540C;&#x5B66;&#x53EF;&#x4EE5;&#x70B9;&#x51FB;&#x4E0A;&#x65B9;&#x94FE;&#x63A5;&#x4E86;&#x89E3;&#x4E00;&#x4E0B;&#xFF0C;&#x518D;&#x6765;&#x8DDF;&#x8FDB;&#x8FD9;&#x4E00;&#x7BC7;&#x7684;&#x5B9E;&#x8DF5;&#x3002;&#x672C;&#x7BC7;&#x4E3B;&#x8981;&#x8BB2;&#x8FF0;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;GraphQL Server&#x4E0E;&#x5728;React&#x5E94;&#x7528;&#x4E2D;&#x5F15;&#x5165;GraphQL&#xFF0C;&#x4EE3;&#x7801;&#x4E0D;&#x96BE;&#xFF0C;&#x63A8;&#x8350;&#x8DDF;&#x7740;&#x624B;&#x6572;&#x4E00;&#x904D;&#x3002;<br>&#x4E0B;&#x9762;&#x6587;&#x7AE0;&#x7684;&#x4EE3;&#x7801;&#x90FD;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;github&#x4E0B;&#x8F7D;&#xFF1A;<a href="https://github.com/closertb/graphDemo" rel="nofollow noreferrer" target="_blank">&#x5730;&#x5740;&#x4F20;&#x9001;</a>&#xFF0C;&#x91CC;&#x9762;&#x5305;&#x542B;&#x4E24;&#x4E2A;&#x6587;&#x4EF6;&#x5939;&#xFF1A;graphqlServer(&#x670D;&#x52A1;&#x7AEF;)&#x4E0E;graphqlApp(&#x5BA2;&#x6237;&#x7AEF;)&#x3002;</p><h3 id="articleHeader0">&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;GraphQL Server</h3><h4>&#x6280;&#x672F;&#x6808;&#x51C6;&#x5907;</h4><p>&#x6838;&#x5FC3;&#x4F9D;&#x8D56;&#xFF08;npm&#x5305;&#xFF09;&#xFF1A;<br>express&#xFF1A;Node&#x670D;&#x52A1;&#x7AEF;&#x6846;&#x67B6;&#xFF1B;<br>apollo-server-express&#xFF1A;express graphql&#x4E2D;&#x95F4;&#x4EF6;&#xFF0C;&#x63D0;&#x4F9B;graphiqlExpress&#x4E0E;graphqlExpress&#x4E24;&#x4E2A;&#x65B9;&#x6CD5;&#xFF1B;<br>graphql&#xFF1A;graphql js&#x5B9E;&#x73B0;&#x57FA;&#x7840;&#x5E93;&#xFF1B;<br>axios&#xFF1A;ajax&#x901A;&#x4FE1;&#xFF0C;&#x8FD9;&#x91CC;&#x7528;&#x4E8E;&#x548C;&#x5DF2;&#x6709;&#x7684;Restful API&#x901A;&#x4FE1;&#xFF1B;<br>&#x9664;&#x4E86;&#x5B89;&#x88C5;&#x4EE5;&#x4E0A;&#x7684;&#x6838;&#x5FC3;&#x4F9D;&#x8D56;&#xFF0C;&#x4F60;&#x8FD8;&#x9700;&#x8981;&#x5B89;&#x88C5;babel&#x76F8;&#x5173;&#x7684;&#x4F9D;&#x8D56;&#xFF0C;&#x5E76;&#x914D;&#x7F6E;babel&#x7F16;&#x8BD1;&#x6587;&#x4EF6;&#xFF0C;&#x5177;&#x4F53;&#x53EF;&#x67E5;&#x770B;&#x4E0A;&#x9762;git&#x4E0B;&#x6765;&#x7684;&#x6587;&#x4EF6;&#x914D;&#x7F6E;&#x3002;</p><h4>&#x642D;&#x5EFA;&#x670D;&#x52A1;</h4><p>&#x600E;&#x4E48;&#x5F15;&#x5165;&#x5305;&#x8FD9;&#x91CC;&#x4E0D;&#x518D;&#x8D58;&#x8FF0;&#xFF0C;&#x6211;&#x4EEC;&#x5148;&#x4E0D;&#x5E26;&#x5165;graphql&#xFF0C;&#x542F;&#x52A8;&#x4E00;&#x4E2A;express&#x670D;&#x52A1;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    const PORT = 8080;
    const app = express();  // &#x521B;&#x5EFA;&#x4E00;&#x4E2A;express&#x670D;&#x52A1;&#xFF1B;
    app.use(&apos;/graphql&apos;,  (req, res) =&gt; {
      res.send(&apos;Hello GraphQL!&apos;);
    });
    app.listen(PORT, () =&gt; console.log(`&gt; Listening at port ${PORT}`));" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code>    <span class="hljs-keyword">const</span> PORT = <span class="hljs-number">8080</span>;
    <span class="hljs-keyword">const</span> app = express();  <span class="hljs-comment">// &#x521B;&#x5EFA;&#x4E00;&#x4E2A;express&#x670D;&#x52A1;&#xFF1B;</span>
    app.use(<span class="hljs-string">&apos;/graphql&apos;</span>,  <span class="hljs-function">(<span class="hljs-params">req, res</span>) =&gt;</span> {
      res.send(<span class="hljs-string">&apos;Hello GraphQL!&apos;</span>);
    });
    app.listen(PORT, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`&gt; Listening at port <span class="hljs-subst">${PORT}</span>`</span>));</code></pre><p>&#x542F;&#x52A8;&#x8FD9;&#x4E2A;&#x670D;&#x52A1;&#xFF0C;&#x5E76;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x8F93;&#x5165;<a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost</a>:8080/graphql&#xFF0C;&#x53EF;&#x4EE5;&#x770B;&#x5230;Hello GraphQL&#x8FD9;&#x6BB5;&#x6B22;&#x8FCE;&#x8BCD;&#xFF0C;&#x5230;&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x7684;&#x540E;&#x7AEF;&#x670D;&#x52A1;&#x5DF2;&#x7ECF;&#x642D;&#x5EFA;&#x6210;&#x529F;&#xFF0C;&#x63A5;&#x7740;&#x6211;&#x4EEC;&#x521B;&#x5EFA;&#x6211;&#x4EEC;&#x7684;GraphQL&#x670D;&#x52A1;&#xFF0C;&#x5220;&#x9664;&#x76D1;&#x542C;&apos;/graphql&apos;&#x8FD9;&#x4E2A;&#x8DEF;&#x7531;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x6DFB;&#x52A0;&#x4E00;&#x4E0B;&#x4E00;&#x6BB5;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    import schema from &apos;./schema&apos;;
    const PORT = 8080;
    const app = express();  // &#x521B;&#x5EFA;&#x4E00;&#x4E2A;express&#x670D;&#x52A1;&#xFF1B;
    app.use(cors()); //&#x8FD9;&#x91CC;&#x6DFB;&#x52A0;cors&#xFF0C;&#x662F;&#x56E0;&#x4E3A;&#x6211;&#x4EEC;&#x540E;&#x9762;&#x524D;&#x7AEF;&#x4F1A;&#x5355;&#x72EC;&#x8DD1;&#x4E00;&#x4E2A;&#x670D;&#x52A1;&#xFF0C;&#x6240;&#x4EE5;&#x6D89;&#x53CA;&#x5230;&#x524D;&#x540E;&#x7AEF;&#x8DE8;&#x57DF;
    app.use(&apos;/graphql&apos;, graphqlExpress({ schema }));
    app.use(&apos;/graphiql&apos;, graphiqlExpress({
        endpointURL: &apos;/graphql&apos;
    }));
    app.listen(PORT, () =&gt; console.log(`&gt; Listening at port ${PORT}`));" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code>    <span class="hljs-keyword">import</span> schema <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./schema&apos;</span>;
    <span class="hljs-keyword">const</span> PORT = <span class="hljs-number">8080</span>;
    <span class="hljs-keyword">const</span> app = express();  <span class="hljs-comment">// &#x521B;&#x5EFA;&#x4E00;&#x4E2A;express&#x670D;&#x52A1;&#xFF1B;</span>
    app.use(cors()); <span class="hljs-comment">//&#x8FD9;&#x91CC;&#x6DFB;&#x52A0;cors&#xFF0C;&#x662F;&#x56E0;&#x4E3A;&#x6211;&#x4EEC;&#x540E;&#x9762;&#x524D;&#x7AEF;&#x4F1A;&#x5355;&#x72EC;&#x8DD1;&#x4E00;&#x4E2A;&#x670D;&#x52A1;&#xFF0C;&#x6240;&#x4EE5;&#x6D89;&#x53CA;&#x5230;&#x524D;&#x540E;&#x7AEF;&#x8DE8;&#x57DF;</span>
    app.use(<span class="hljs-string">&apos;/graphql&apos;</span>, graphqlExpress({ schema }));
    app.use(<span class="hljs-string">&apos;/graphiql&apos;</span>, graphiqlExpress({
        endpointURL: <span class="hljs-string">&apos;/graphql&apos;</span>
    }));
    app.listen(PORT, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`&gt; Listening at port <span class="hljs-subst">${PORT}</span>`</span>));</code></pre><p>&#x81F3;&#x6B64;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x6DFB;&#x52A0;&#x4E86;GraphQL&#x670D;&#x52A1;&#xFF0C;graphql&#x662F;&#x7528;&#x4E8E;&#x63A5;&#x6536;url&#x8BF7;&#x6C42;&#x7684;&#xFF0C;&#x800C;graphiql&#x4F1A;&#x5448;&#x73B0;&#x4E00;&#x4E2A;graphql&#x67E5;&#x8BE2;&#x754C;&#x9762;&#xFF0C;&#x8FD9;&#x4E2A;&#x754C;&#x9762;&#x53EF;&#x4EE5;&#x7528;&#x4E8E;&#x67E5;&#x8BE2;&#x4F53;&#x9A8C;&#xFF0C;&#x67E5;&#x770B;&#x6587;&#x6863;&#x5B9A;&#x4E49;&#xFF0C;&#x8FD9;&#x662F;graphql&#x5B98;&#x65B9;&#x6BD4;&#x8F83;&#x63A8;&#x8350;&#x7684;&#x4E00;&#x4E2A;&#x6280;&#x672F;&#xFF0C;&#x5C31;&#x50CF;&#x4E0B;&#x9762;&#x8FD9;&#x6837;&#xFF1A;</p><p><span class="img-wrap"><img data-src="https://sfault-image.b0.upaiyun.com/292/125/2921257029-5b416f8d19145_articlex" src="https://static.alili.techhttps://sfault-image.b0.upaiyun.com/292/125/2921257029-5b416f8d19145_articlex" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span><br>&#x4E0A;&#x9762;&#x6211;&#x4EEC;&#x7565;&#x8FC7;&#x4E86;schema&#xFF0C;&#x5176;&#x5B9E;&#x8FD9;&#x4E2A;&#x5728;&#x4E0A;&#x4E00;&#x7BC7;&#x5C31;&#x82B1;&#x4E86;&#x4E00;&#x5B9A;&#x7BC7;&#x5E45;&#x6765;&#x8BB2;&#x89E3;&#xFF0C;&#x5176;&#x5B9A;&#x4E49;&#x4E86;&#x6574;&#x4E2A;graphql&#x670D;&#x52A1;&#x6240;&#x652F;&#x6301;&#x7684;&#x63A5;&#x53E3;&#x5B9A;&#x4E49;&#xFF0C;&#x7167;&#x6837;&#x8D34;&#x4E0A;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    import {
      GraphQLObjectType,
      GraphQLSchema,
      GraphQLInt,
      GraphQLID,
      GraphQLString,
      GraphQLList,
      GraphQLNonNull,
    } from &apos;graphql/type&apos;;
    import { getUser, getUsers, getUserMixNick } from &apos;../service/index&apos;;
    
    // &#x67E5;&#x8BE2;&#x67D0;&#x4E00;&#x4E2A;user&#x7684;&#x8BE6;&#x7EC6;&#x8D44;&#x6599;&#x6A21;&#x578B;
    const UserType = new GraphQLObjectType({
      name: &apos;User&apos;,
      fields: {
        id: { type: GraphQLInt },
        userName: { type: GraphQLString },
        userMixNick: { 
          type: GraphQLString,
          args: {
            id: {
                type: new GraphQLNonNull(GraphQLID)
            }
          },
          resolve: (root, args, context, info) =&gt; {
            const { id } = root;
            console.log(info)
            return getUserMixNick(id);
          }
         },
        military: { type: GraphQLString },
        age: { type: GraphQLInt },
        height: { type: GraphQLInt },
        education: { type: GraphQLString },
        enlistTime: { type: GraphQLString },
        enlistYear: { type: GraphQLInt },
      }
    });
    
    // &#x67E5;&#x8BE2;&#x6240;&#x6709;&#x7684;users
    const PaginationType = new GraphQLObjectType({
      name: &apos;Pagination&apos;,
      fields: {
        pageSize: { type: GraphQLInt },
        pageNum: { type: GraphQLInt },
        total: { type: GraphQLInt },
        data: {
          type: new GraphQLList(UserType)
        }
      }
    });
    // &#x5B9A;&#x4E49;schema
    const schema = new GraphQLSchema({
      query: new GraphQLObjectType({
        name: &apos;militaryQuery&apos;,
        fields: {
          user: {
            type: UserType,
            args: {
              id: {
                  type: new GraphQLNonNull(GraphQLID)
              }
            },
            resolve: (root, args, context, info) =&gt; {
              const { id } = args;
              return getUser(id);
            }
          },
          users: {
            type: PaginationType,
            args: {
              pageNum: { type: GraphQLInt },
              pageSize: { type: GraphQLInt }
            },
            resolve: (root, { filters, pageNum, pageSize }) =&gt; {
              return getUsers(filters, pageNum, pageSize);
            }
          }
        }
      })
    });
    
    export default schema;  
    " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scala"><code>    <span class="hljs-keyword">import</span> {
      <span class="hljs-type">GraphQLObjectType</span>,
      <span class="hljs-type">GraphQLSchema</span>,
      <span class="hljs-type">GraphQLInt</span>,
      <span class="hljs-type">GraphQLID</span>,
      <span class="hljs-type">GraphQLString</span>,
      <span class="hljs-type">GraphQLList</span>,
      <span class="hljs-type">GraphQLNonNull</span>,
    } from <span class="hljs-symbol">&apos;graphql</span>/<span class="hljs-class"><span class="hljs-keyword">type</span>&apos;</span>;
    <span class="hljs-keyword">import</span> { getUser, getUsers, getUserMixNick } from &apos;../service/index&apos;;
    
    <span class="hljs-comment">// &#x67E5;&#x8BE2;&#x67D0;&#x4E00;&#x4E2A;user&#x7684;&#x8BE6;&#x7EC6;&#x8D44;&#x6599;&#x6A21;&#x578B;</span>
    const <span class="hljs-type">UserType</span> = <span class="hljs-keyword">new</span> <span class="hljs-type">GraphQLObjectType</span>({
      name: <span class="hljs-symbol">&apos;Use</span>r&apos;,
      fields: {
        id: { <span class="hljs-class"><span class="hljs-keyword">type</span></span>: <span class="hljs-type">GraphQLInt</span> },
        userName: { <span class="hljs-class"><span class="hljs-keyword">type</span></span>: <span class="hljs-type">GraphQLString</span> },
        userMixNick: { 
          <span class="hljs-class"><span class="hljs-keyword">type</span></span>: <span class="hljs-type">GraphQLString</span>,
          args: {
            id: {
                <span class="hljs-class"><span class="hljs-keyword">type</span></span>: <span class="hljs-keyword">new</span> <span class="hljs-type">GraphQLNonNull</span>(<span class="hljs-type">GraphQLID</span>)
            }
          },
          resolve: (root, args, context, info) =&gt; {
            const { id } = root;
            console.log(info)
            <span class="hljs-keyword">return</span> getUserMixNick(id);
          }
         },
        military: { <span class="hljs-class"><span class="hljs-keyword">type</span></span>: <span class="hljs-type">GraphQLString</span> },
        age: { <span class="hljs-class"><span class="hljs-keyword">type</span></span>: <span class="hljs-type">GraphQLInt</span> },
        height: { <span class="hljs-class"><span class="hljs-keyword">type</span></span>: <span class="hljs-type">GraphQLInt</span> },
        education: { <span class="hljs-class"><span class="hljs-keyword">type</span></span>: <span class="hljs-type">GraphQLString</span> },
        enlistTime: { <span class="hljs-class"><span class="hljs-keyword">type</span></span>: <span class="hljs-type">GraphQLString</span> },
        enlistYear: { <span class="hljs-class"><span class="hljs-keyword">type</span></span>: <span class="hljs-type">GraphQLInt</span> },
      }
    });
    
    <span class="hljs-comment">// &#x67E5;&#x8BE2;&#x6240;&#x6709;&#x7684;users</span>
    const <span class="hljs-type">PaginationType</span> = <span class="hljs-keyword">new</span> <span class="hljs-type">GraphQLObjectType</span>({
      name: <span class="hljs-symbol">&apos;Paginatio</span>n&apos;,
      fields: {
        pageSize: { <span class="hljs-class"><span class="hljs-keyword">type</span></span>: <span class="hljs-type">GraphQLInt</span> },
        pageNum: { <span class="hljs-class"><span class="hljs-keyword">type</span></span>: <span class="hljs-type">GraphQLInt</span> },
        total: { <span class="hljs-class"><span class="hljs-keyword">type</span></span>: <span class="hljs-type">GraphQLInt</span> },
        data: {
          <span class="hljs-class"><span class="hljs-keyword">type</span></span>: <span class="hljs-keyword">new</span> <span class="hljs-type">GraphQLList</span>(<span class="hljs-type">UserType</span>)
        }
      }
    });
    <span class="hljs-comment">// &#x5B9A;&#x4E49;schema</span>
    const schema = <span class="hljs-keyword">new</span> <span class="hljs-type">GraphQLSchema</span>({
      query: <span class="hljs-keyword">new</span> <span class="hljs-type">GraphQLObjectType</span>({
        name: <span class="hljs-symbol">&apos;militaryQuer</span>y&apos;,
        fields: {
          user: {
            <span class="hljs-class"><span class="hljs-keyword">type</span></span>: <span class="hljs-type">UserType</span>,
            args: {
              id: {
                  <span class="hljs-class"><span class="hljs-keyword">type</span></span>: <span class="hljs-keyword">new</span> <span class="hljs-type">GraphQLNonNull</span>(<span class="hljs-type">GraphQLID</span>)
              }
            },
            resolve: (root, args, context, info) =&gt; {
              const { id } = args;
              <span class="hljs-keyword">return</span> getUser(id);
            }
          },
          users: {
            <span class="hljs-class"><span class="hljs-keyword">type</span></span>: <span class="hljs-type">PaginationType</span>,
            args: {
              pageNum: { <span class="hljs-class"><span class="hljs-keyword">type</span></span>: <span class="hljs-type">GraphQLInt</span> },
              pageSize: { <span class="hljs-class"><span class="hljs-keyword">type</span></span>: <span class="hljs-type">GraphQLInt</span> }
            },
            resolve: (root, { filters, pageNum, pageSize }) =&gt; {
              <span class="hljs-keyword">return</span> getUsers(filters, pageNum, pageSize);
            }
          }
        }
      })
    });
    
    export <span class="hljs-keyword">default</span> schema;  
    </code></pre><p>&#x8FD9;&#x91CC;&#x4E0D;&#x60F3;&#x82B1;&#x592A;&#x5927;&#x7684;&#x7BC7;&#x5E45;&#x53BB;&#x8BB2;&#x89E3;&#xFF0C;&#x53EF;&#x4EE5;git clone&#x4E0B;&#x6765;&#x81EA;&#x5DF1;&#x5C1D;&#x8BD5;&#x4E00;&#x4E0B;&#xFF0C;&#x81F3;&#x6B64;&#x6211;&#x4EEC;&#x5C31;&#x6210;&#x529F;&#x7684;&#x521B;&#x5EFA;&#x4E86;&#x4E00;&#x4E2A;GraphQL&#x670D;&#x52A1;&#xFF0C;&#x53EF;&#x4EE5;&#x5728;graphiql&#x754C;&#x9762;&#x67E5;&#x8BE2;&#x4F53;&#x4F1A;&#x4E00;&#x4E0B;&#x3002;</p><h3 id="articleHeader1">&#x5728;React&#x5E94;&#x7528;&#x4E2D;&#x5F15;&#x5165;GraphQL</h3><p>&#x6838;&#x5FC3;&#x4F9D;&#x8D56;&#xFF08;npm&#x5305;&#xFF09;&#xFF1A;<br>react&#x76F8;&#x5173;&#xFF1A; &#x4EC0;&#x4E48;react,webpack&#xFF0C;react-router-dom&#x8FD9;&#x4E9B;;<br>react-apollo&#x4E0E;apollo-boost: &#x7528;&#x4E8E;&#x5728;app&#x7AEF;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;GraphQL&#x670D;&#x52A1;&#x8FDE;&#x63A5;&#x5B9E;&#x4F8B;;<br>graphql&#x4E0E;graphql-tag: &#x7528;&#x4E8E;&#x5728;app&#x7AEF;&#x53D1;&#x51FA;&#x4E00;&#x4E2A;GraphQL&#x8BF7;&#x6C42;;</p><h4>&#x9875;&#x9762;&#x7ED3;&#x6784;</h4><p><span class="img-wrap"><img data-src="https://sfault-image.b0.upaiyun.com/407/588/4075889205-5b4183b3532ea_articlex" src="https://static.alili.techhttps://sfault-image.b0.upaiyun.com/407/588/4075889205-5b4183b3532ea_articlex" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x9875;&#x9762;&#x5927;&#x81F4;&#x662F;&#x8FD9;&#x6837;&#x7684;&#x4E00;&#x4E2A;&#x7ED3;&#x6784;&#xFF0C;&#x8FDB;&#x5165;App&#x7684;&#x4E3B;&#x9875;&#x65F6;&#xFF0C;&#x4F1A;&#x52A0;&#x8F7D;&#x5144;&#x5F1F;&#x8FDE;&#x4E2D;&#x4E3B;&#x8981;&#x7684;&#x6218;&#x58EB;&#x5217;&#x8868;&#xFF0C;&#x70B9;&#x51FB;&#x67E5;&#x770B;&#x8BE6;&#x60C5;&#xFF0C;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x8FD9;&#x540D;&#x5C55;&#x793A;&#x7684;&#x4E00;&#x4E9B;&#x8BE6;&#x7EC6;&#x4FE1;&#x606F;&#xFF0C;&#x9875;&#x9762;&#x7ED3;&#x6784;&#x4EE3;&#x7801;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &lt;ApolloProvider client={client}&gt;
    &lt;Router&gt;
      &lt;div&gt;
        &lt;Route exact path=&quot;/&quot; component={List} /&gt;
        &lt;Switch&gt;
          &lt;Route exact path=&quot;/:id/detail&quot; component={Detail} /&gt;
        &lt;/Switch&gt;
      &lt;/div&gt;
    &lt;/Router&gt;
  &lt;/ApolloProvider&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code>  <span class="hljs-tag">&lt;<span class="hljs-name">ApolloProvider</span> <span class="hljs-attr">client</span>=<span class="hljs-string">{client}</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Router</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">exact</span> <span class="hljs-attr">path</span>=<span class="hljs-string">&quot;/&quot;</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{List}</span> /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Switch</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">exact</span> <span class="hljs-attr">path</span>=<span class="hljs-string">&quot;/:id/detail&quot;</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{Detail}</span> /&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">Switch</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">Router</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">ApolloProvider</span>&gt;</span></code></pre><p>&#x8FD9;&#x91CC;&#x9700;&#x8981;&#x5F3A;&#x8C03;&#x4E00;&#x4E0B;client&#x4EE3;&#x7801;&#x7684;&#x5B9E;&#x73B0;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    const client = new ApolloClient({
      uri: &apos;http://localhost:8080/graphql&apos;,  // &#x670D;&#x52A1;&#x7AEF;&#x63A5;&#x53E3;
      batchInterval: 10,
      opts: {
        credentials: &apos;cross-origin&apos;, // App&#x7AEF;&#x5355;&#x72EC;&#x8DD1;&#x4E86;&#x4E00;&#x4E2A;&#x670D;&#x52A1;&#xFF0C;&#x6240;&#x4EE5;&#x6D89;&#x53CA;&#x5230;&#x8DE8;&#x57DF;&#xFF1B;
      },
    });      " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code>    <span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> ApolloClient({
      uri: <span class="hljs-string">&apos;http://localhost:8080/graphql&apos;</span>,  <span class="hljs-comment">// &#x670D;&#x52A1;&#x7AEF;&#x63A5;&#x53E3;</span>
      batchInterval: <span class="hljs-number">10</span>,
      opts: {
        credentials: <span class="hljs-string">&apos;cross-origin&apos;</span>, <span class="hljs-comment">// App&#x7AEF;&#x5355;&#x72EC;&#x8DD1;&#x4E86;&#x4E00;&#x4E2A;&#x670D;&#x52A1;&#xFF0C;&#x6240;&#x4EE5;&#x6D89;&#x53CA;&#x5230;&#x8DE8;&#x57DF;&#xFF1B;</span>
      },
    });      </code></pre><h4>&#x5217;&#x8868;&#x9875;&#x7684;&#x5B9E;&#x73B0;</h4><p>react-apollo&#x5728;&#x5B9E;&#x73B0;graphql&#x7ED3;&#x5408;react&#x7F16;&#x7A0B;&#x7684;&#x65B9;&#x5F0F;&#x4E0A;&#xFF0C;&#x501F;&#x9274;&#x4E86;&#x7C7B;&#x4F3C;react-redux&#x7684;connect&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;&#x7684;&#x601D;&#x60F3;&#xFF0C;react-apollo&#x63D0;&#x4F9B;&#x4E00;&#x4E2A;&#x65B9;&#x6CD5;graphql&#x7528;&#x4E8E;&#x751F;&#x6210;&#x4E00;&#x4E2A;&#x5BB9;&#x5668;&#xFF0C;&#x8FD9;&#x4E2A;&#x5BB9;&#x5668;&#x4F1A;&#x4ECE;&#x8FDC;&#x7AEF;&#x62C9;&#x53BB;&#x6570;&#x636E;&#xFF0C;&#x7136;&#x540E;&#x4F5C;&#x4E3A;props&#x4F20;&#x9012;&#x7ED9;&#x5C55;&#x793A;&#x7EC4;&#x4EF6;,&#x76F4;&#x63A5;&#x770B;&#x4EE3;&#x7801;&#x7684;&#x5B9E;&#x73B0;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      // &#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x67E5;&#x8BE2;  
      const USERS_QUERY = gql`
          query UserQuery($pageNum: Int,$pageSize:Int){
            users(pageNum:$pageNum,pageSize:$pageSize ) {
              pageNum
              pageSize
              total
              data {
                id
                userName
              }
            }
          }
    `;
    // &#x751F;&#x6210;&#x4E00;&#x4E2A;graphql&#x5BB9;&#x5668;&#xFF0C;&#x4F1A;&#x6267;&#x884C;USERS_QUERY&#x8FD9;&#x4E2A;&#x67E5;&#x8BE2;&#xFF1B;
    const withQuery = graphql(USERS_QUERY, {
      options: () =&gt; ({
        variables: {
          pageNum: 3,
          pageSize: 8
        },
      }),
    });
    // &#x5217;&#x8868;&#x5C55;&#x793A;&#x7EC4;&#x4EF6;
    class List extends Component {
      constructor(props) {
        super(props);
        this.state = {};
      }
      render() {
        const { data: { loading, users } } = this.props;
        if (loading) {
          return &lt;div className=&quot;loading&quot;&gt;Loading...&lt;/div&gt;;
        }
        const { data: lists, total } = users;
        return (
          &lt;div&gt;
            &lt;p className=&quot;total&quot;&gt;&#x603B;&#x5171;&#x6709;&lt;span&gt;{total}&lt;/span&gt;&#x540D;&#x519B;&#x58EB;&lt;/p&gt;
            &lt;ul className=&quot;list&quot;&gt;
              {
                lists.map(({ userName, id }, key) =&gt;
                  &lt;li key={key}&gt;
                    &lt;span&gt;&#x59D3;&#x540D;&#xFF1A;{userName}&lt;/span&gt;
                    &lt;Link to={`/${id}/detail`} &gt;&#x8BE6;&#x60C5;&lt;/Link&gt;
                  &lt;/li&gt;
                )
              }
            &lt;/ul&gt;
          &lt;/div&gt;
        );
      }
    }
    // &#x5C06;&#x6570;&#x636E;&#x6CE8;&#x5165;&#x5230;&#x5C55;&#x793A;&#x7EC4;&#x4EF6;&#x4E2D;
    const Character = withCharacter(List);
    export default Character;  
    " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>      <span class="hljs-comment">// &#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x67E5;&#x8BE2;  </span>
      <span class="hljs-keyword">const</span> USERS_QUERY = gql<span class="hljs-string">`
          query UserQuery($pageNum: Int,$pageSize:Int){
            users(pageNum:$pageNum,pageSize:$pageSize ) {
              pageNum
              pageSize
              total
              data {
                id
                userName
              }
            }
          }
    `</span>;
    <span class="hljs-comment">// &#x751F;&#x6210;&#x4E00;&#x4E2A;graphql&#x5BB9;&#x5668;&#xFF0C;&#x4F1A;&#x6267;&#x884C;USERS_QUERY&#x8FD9;&#x4E2A;&#x67E5;&#x8BE2;&#xFF1B;</span>
    <span class="hljs-keyword">const</span> withQuery = graphql(USERS_QUERY, {
      <span class="hljs-attr">options</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> ({
        <span class="hljs-attr">variables</span>: {
          <span class="hljs-attr">pageNum</span>: <span class="hljs-number">3</span>,
          <span class="hljs-attr">pageSize</span>: <span class="hljs-number">8</span>
        },
      }),
    });
    <span class="hljs-comment">// &#x5217;&#x8868;&#x5C55;&#x793A;&#x7EC4;&#x4EF6;</span>
    <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">List</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
      <span class="hljs-keyword">constructor</span>(props) {
        <span class="hljs-keyword">super</span>(props);
        <span class="hljs-keyword">this</span>.state = {};
      }
      render() {
        <span class="hljs-keyword">const</span> { <span class="hljs-attr">data</span>: { loading, users } } = <span class="hljs-keyword">this</span>.props;
        <span class="hljs-keyword">if</span> (loading) {
          <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;loading&quot;</span>&gt;</span>Loading...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
        }
        <span class="hljs-keyword">const</span> { <span class="hljs-attr">data</span>: lists, total } = users;
        <span class="hljs-keyword">return</span> (
          <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;total&quot;</span>&gt;</span>&#x603B;&#x5171;&#x6709;<span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>{total}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>&#x540D;&#x519B;&#x58EB;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;list&quot;</span>&gt;</span>
              {
                lists.map(({ userName, id }, key) =&gt;
                  <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{key}</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>&#x59D3;&#x540D;&#xFF1A;{userName}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">{</span>`/${<span class="hljs-attr">id</span>}/<span class="hljs-attr">detail</span>`} &gt;</span>&#x8BE6;&#x60C5;<span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span>
                  <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                )
              }
            <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        );
      }
    }
    <span class="hljs-comment">// &#x5C06;&#x6570;&#x636E;&#x6CE8;&#x5165;&#x5230;&#x5C55;&#x793A;&#x7EC4;&#x4EF6;&#x4E2D;</span>
    <span class="hljs-keyword">const</span> Character = withCharacter(List);
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Character;  
    </code></pre><p>&#x4EE5;&#x4E0A;&#x5C31;&#x662F;&#x5BF9;&#x5217;&#x8868;&#x5C55;&#x793A;&#x7EC4;&#x4EF6;&#x7684;&#x5B9E;&#x73B0;&#xFF0C;&#x601D;&#x60F3;&#x8FD8;&#x662F;&#x6BD4;&#x8F83;&#x7B80;&#x5355;&#xFF0C;&#x548C;&#x6211;&#x4EEC;&#x57FA;&#x4E8E;react + redux&#x7F16;&#x7A0B;&#x6BD4;&#x8F83;&#x50CF;&#x3002;</p><h4>&#x8BE6;&#x60C5;&#x9875;&#x7684;&#x5B9E;&#x73B0;</h4><p>&#x5176;&#x5B9E;&#x73B0;&#x601D;&#x8DEF;&#x548C;&#x5217;&#x8868;&#x9875;&#x5176;&#x5B9E;&#x662F;&#x4E00;&#x6837;&#x7684;&#xFF0C;&#x53EA;&#x662F;&#x6D89;&#x53CA;&#x5230;&#x52A8;&#x6001;&#x4F20;&#x53C2;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x4E0A;&#x67E5;&#x8BE2;&#x90A3;&#x4E00;&#x6BB5;&#x4EE3;&#x7801;&#x8BF4;&#x4E00;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    const USER_QUERY = gql`
        query UserQuery($id: ID!){
          user(id:$id) {
            id,
            userName,
            age,
            military,
            height,
            education,
            enlistTime,
            enlistYear,
          }
        }
    `;
    const withQuery = graphql(USER_QUERY, {
      options: (props) =&gt; {
        const { match: { params } } = props; // &#x91CD;&#x70B9;&#x5C31;&#x662F;&#x4ECE;props&#x4E2D;&#x83B7;&#x53D6;&#x8DEF;&#x7531;&#x4F20;&#x9012;&#x7684;&#x53C2;&#x6570;
        return {
          variables: {
            id: params.id
          },
        };
      },
    });  
    " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs objectivec"><code>    <span class="hljs-keyword">const</span> USER_QUERY = gql`
        query UserQuery($<span class="hljs-keyword">id</span>: ID!){
          user(<span class="hljs-keyword">id</span>:$<span class="hljs-keyword">id</span>) {
            <span class="hljs-keyword">id</span>,
            userName,
            age,
            military,
            height,
            education,
            enlistTime,
            enlistYear,
          }
        }
    `;
    <span class="hljs-keyword">const</span> withQuery = graphql(USER_QUERY, {
      options: (props) =&gt; {
        <span class="hljs-keyword">const</span> { match: { params } } = props; <span class="hljs-comment">// &#x91CD;&#x70B9;&#x5C31;&#x662F;&#x4ECE;props&#x4E2D;&#x83B7;&#x53D6;&#x8DEF;&#x7531;&#x4F20;&#x9012;&#x7684;&#x53C2;&#x6570;</span>
        <span class="hljs-keyword">return</span> {
          variables: {
            <span class="hljs-keyword">id</span>: params.id
          },
        };
      },
    });  
    </code></pre><p>withQuery&#x8FD9;&#x4E2A;&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;&#x540C;&#x6837;&#x53EF;&#x4EE5;&#x4ECE;&#x7236;&#x7EC4;&#x4EF6;&#x4E2D;&#x83B7;&#x53D6;props&#xFF0C;&#x7136;&#x540E;&#x901A;&#x8FC7;&#x5176;option&#x65B9;&#x6CD5;&#x52A8;&#x6001;&#x7684;&#x751F;&#x6210;&#x67E5;&#x8BE2;&#x53C2;&#x6570;&#xFF0C;&#x81F3;&#x4E8E;&#x8BE6;&#x7EC6;&#x9875;&#x5C55;&#x793A;&#x7EC4;&#x4EF6;&#x7684;&#x5B9E;&#x73B0;&#xFF0C;&#x53EF;&#x4EE5;&#x5177;&#x4F53;&#x53C2;&#x8003;git&#x4E0A;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x3002;<br>&#x5230;&#x6700;&#x540E;&#x8F93;&#x5165;url&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x5982;&#x4E0B;&#x7684;&#x7ED3;&#x679C;&#xFF1A;</p><p><span class="img-wrap"><img data-src="https://sfault-image.b0.upaiyun.com/128/390/1283900726-5b418f5480610_articlex" src="https://static.alili.techhttps://sfault-image.b0.upaiyun.com/128/390/1283900726-5b418f5480610_articlex" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><h3 id="articleHeader2">&#x601D;&#x8003;</h3><p>&#x4ECE;&#x5199;&#x4E00;&#x4E2A;demo&#x7684;&#x89D2;&#x5EA6;&#x6765;&#x8BB2;&#xFF0C;&#x5728;react&#x4E2D;&#x5D4C;&#x5165;graphql&#x597D;&#x50CF;&#x6BD4;&#x5728;&#x5728;react&#x4E2D;&#x5D4C;&#x5165;redux&#x8FD8;&#x7B80;&#x5355;&#xFF0C;&#x4F46;&#x5982;&#x4F55;&#x5728;&#x6211;&#x4EEC;&#x73B0;&#x6709;&#x7684;&#x6846;&#x67B6;&#x4E2D;&#x53BB;&#x5D4C;&#x5165;graphql&#x5462;&#xFF1F;&#x6BD4;&#x5982;Dva + graphql&#xFF0C;&#x6BD4;&#x5982;react + redux + redux-thunk + graphql&#xFF0C;&#x5728;&#x6211;&#x7684;&#x8BA4;&#x77E5;&#x8303;&#x56F4;&#x91CC;&#xFF0C;&#x597D;&#x50CF;&#x8FD8;&#x9700;&#x8981;&#x65F6;&#x95F4;&#x53BB;&#x8BC4;&#x4F30;&#x8FD9;&#x4E00;&#x5207;&#x503C;&#x4E0D;&#x503C;&#x5F97;&#xFF0C;&#x53CD;&#x6B63;&#x6280;&#x672F;&#x4E0A;&#x80AF;&#x5B9A;&#x662F;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x7684;&#x3002;&#x5F15;&#x5165;graphql&#x6709;&#x591A;&#x5927;&#x4EF7;&#x503C;&#xFF0C;&#x8FD9;&#x4E5F;&#x9700;&#x8981;&#x7ED3;&#x5408;&#x5177;&#x4F53;&#x9879;&#x76EE;&#xFF0C;&#x5177;&#x4F53;&#x4E1A;&#x52A1;&#xFF0C;&#x5177;&#x4F53;&#x56E2;&#x961F;&#x6765;&#x8BF4;&#x3002;&#x613F;&#x4F60;&#x8FD9;&#x4E24;&#x7BC7;&#x6587;&#x7AE0;&#x8BFB;&#x5B8C;&#x5BF9;GraphQL&#x5DF2;&#x7ECF;&#x6709;&#x4E86;&#x4E00;&#x4E2A;&#x6BD4;&#x8F83;&#x5B8C;&#x6574;&#x7684;&#x8BA4;&#x8BC6;&#xFF0C;happy Ending!!!</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
同学，GraphQL了解一下：实践篇

## 原文链接
[https://segmentfault.com/a/1190000015564754](https://segmentfault.com/a/1190000015564754)

