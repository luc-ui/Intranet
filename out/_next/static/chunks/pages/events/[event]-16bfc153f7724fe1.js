(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[869],{6813:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/events/[event]",function(){return n(8554)}])},3576:function(e,t,n){"use strict";n.d(t,{Z:function(){return j}});var s=n(5893),i=n(4949),r=n.n(i),a=n(9004),u=n.n(a),l=n(765),c=n(7294),o=n(1163),d=n.n(o),f=n(5152),h=(n(2462),(0,f.default)((function(){return Promise.all([n.e(714),n.e(876),n.e(829)]).then(n.t.bind(n,1288,23))}),{loadableGenerated:{webpack:function(){return[1288]}},ssr:!1})),p=(0,f.default)((function(){return n.e(127).then(n.t.bind(n,2138,23))}),{loadableGenerated:{webpack:function(){return[2138]}},ssr:!1});function m(e){var t=e.id,n=e.type,i=e.name,r=e.strass,a=(0,c.useState)(),o=a[0],f=a[1],m=(0,c.useState)(),_=m[0],b=m[1],j=(0,c.useState)(),x=j[0],v=(j[1],(0,c.useState)(!1)),N=v[0],y=v[1],S=(0,c.useState)(!1),E=S[0],P=S[1];(0,c.useEffect)((function(){d().query.id?(0,l.Z)("/publis/id/"+t).then((function(e){f(e[0].title),b(e[0].content),y(!0)})):y(!0)}),[]),(0,c.useEffect)((function(){E&&setTimeout((function(){alert("Nouveau contenu ajout\xe9 !"),P(!1)}),100)}),[E]);return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("h3",{children:"Ajouter un nouveau contenu - "+i}),(0,s.jsxs)("form",{onSubmit:function(e){e.preventDefault();var s="POST";d().query.id&&(s="PUT"),(0,l.W)("/publis",s,{title:o,content:_,date:x,strass:r,type:n,id:t}).then((function(e){200==e&&(d().push(d().asPath.split("?")[0]),P(!0))}))},className:u().formulaire,children:[(0,s.jsxs)("label",{children:[(0,s.jsx)("p",{className:"texte",children:"Ajouter un titre"}),(0,s.jsx)("input",{type:"text",onChange:function(e){return f(e.target.value)},className:"field",placeholder:"Je suis un titre !",value:o,required:!0})]}),(0,s.jsxs)("div",{className:u().editor,children:[(0,s.jsx)("p",{className:"texte",children:"Contenu"}),N?(0,s.jsx)(h,{setContents:_,onChange:function(e){b(e)},height:"200px",setOptions:{buttonList:[["undo","redo"],["font","fontSize","formatBlock"],["paragraphStyle","blockquote"],["bold","underline","italic","strike","subscript","superscript"],["fontColor","hiliteColor","textStyle"],["removeFormat"],["outdent","indent"],["align","horizontalRule","list","lineHeight"],["fullScreen"]]}}):void 0,(0,s.jsx)(p,{onEmojiClick:function(e,t){b(_+t.emoji)},pickerStyle:{width:"100%"}})]}),(0,s.jsx)("div",{children:(0,s.jsx)("button",{type:"submit",className:"submit",children:"Publier"})})]})]})}var _=n(1664),b=n.n(_);function j(e){var t=e.type,n=e.name,i=e.authStrass,a=e.selectStrass,u=(0,c.useState)(!1),o=u[0],f=u[1],h=(0,c.useState)([]),p=h[0],_=h[1];switch((0,c.useEffect)((function(){o&&setTimeout((function(){alert("Contenu supprim\xe9"),f(!1)}),100)}),[o]),(0,c.useEffect)((function(){(0,l.Z)("/publis/type/"+t).then((function(e){return _(e)}))}),[d().query.id,d().query.action]),d().query.action){case"add":if(i.includes(a.cn))return(0,s.jsx)("div",{className:r().global,children:(0,s.jsx)(m,{strass:a,type:t,name:n})});case"modify":if(d().query.id&&i.includes(a.cn))return(0,s.jsx)("div",{className:r().global,children:(0,s.jsx)(m,{id:d().query.id,type:t,name:n})});case"delete":if(d().query.id&&i.includes(a.cn)){var j=d().query.id;(0,l.W)("/publis","DELETE",{id:j}).then((function(e){200==e&&(d().push(d().asPath.split("?")[0]),f(!0))}))}default:return(0,s.jsxs)("div",{className:r().global,children:[(0,s.jsx)("h1",{children:n}),i.includes(a.cn)?(0,s.jsx)(b(),{href:d().asPath.split("?")[0]+"?action=add",passHref:!0,children:(0,s.jsx)("h4",{className:"boutonAjout",children:"Ajouter une publication"})}):void 0,null===p||void 0===p?void 0:p.map((function(e){return(0,s.jsxs)("section",{className:r().section,children:[(0,s.jsxs)("div",{className:r().header,children:[(0,s.jsx)("h4",{className:r().title,children:e.title}),(0,s.jsx)("p",{className:r().strass,children:e.strassName})]}),(0,s.jsx)("div",{dangerouslySetInnerHTML:{__html:e.content},className:r().content}),e.strass==a.cn||"AE"==a.cn?(0,s.jsxs)("div",{className:r().sectionEdit,children:[(0,s.jsx)(b(),{href:d().asPath.split("?")[0]+"?action=modify&id="+e.id,passHref:!0,children:(0,s.jsx)("h4",{className:"boutonEdit",children:"Modifier"})}),(0,s.jsx)(b(),{href:d().asPath.split("?")[0]+"?action=delete&id="+e.id,passHref:!0,children:(0,s.jsx)("h4",{className:"boutonEdit",children:"Supprimer"})})]}):void 0]},e.id)}))]})}}},8554:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return c}});var s=n(5893),i=n(1163),r=n.n(i),a=n(7294),u=n(3576),l=n(765);function c(e){var t=e.selectStrass,n=r().asPath.substring(8).split("?")[0],i=(0,a.useState)([]),c=i[0],o=i[1],d=(0,a.useState)([]),f=d[0],h=d[1];return(0,a.useEffect)((function(){"[event]"!=n&&(0,l.Z)("/events/"+n).then((function(e){h(e),o(["AE",e.strass])}))}),[n]),(0,s.jsx)(u.Z,{type:n,name:f.title,authStrass:c,selectStrass:t})}},9004:function(e){e.exports={formulaire:"Formulaire_formulaire__030Vg",editor:"Formulaire_editor__Of4ic"}},4949:function(e){e.exports={global:"Publis_global__BDV6t",section:"Publis_section__DLiC1",header:"Publis_header__RuBFX",title:"Publis_title__5Nodf",strass:"Publis_strass__NnDzQ",content:"Publis_content__SYQ5d",sectionEdit:"Publis_sectionEdit__9cTXL"}}},function(e){e.O(0,[719,774,888,179],(function(){return t=6813,e(e.s=t);var t}));var t=e.O();_N_E=t}]);