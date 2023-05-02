(function(i,l,o,M,a,p,A){"use strict";const{FormText:_,FormRow:f,FormInput:m,FormSwitch:g}=M.Forms,{ScrollView:S}=o.ReactNative;function R(){return p.useProxy(a.storage),o.React.createElement(S,null,o.React.createElement(m,{title:"Key",value:a.storage.key??"default",onSubmitEditing:function(e){return a.storage.key=e.nativeEvent.text},placeholder:"Secret key to encrypt messages",returnKeyType:"done",secureTextEntry:!0}),o.React.createElement(f,{label:"Auto shorten text",subLabel:"Shorten encrypted text by replacing specific char. Can be detected by AutoMod.",trailing:o.React.createElement(g,{value:a.storage.shorten_text??!0,onValueChange:function(e){return a.storage.shorten_text=e}})}),o.React.createElement(f,{label:"Enable encryption",subLabel:"Messages that you send will be encrypted.",trailing:o.React.createElement(g,{value:a.storage.enable_encryption??!1,onValueChange:function(e){return a.storage.enable_encryption=e}})}),o.React.createElement(f,{label:"Debug Mode",subLabel:"Log debug messages to console.",trailing:o.React.createElement(g,{value:a.storage.debug??!1,onValueChange:function(e){return a.storage.debug=e}})}))}let E="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";function h(e,t){let n="";for(let r=0;r<e.length;r++)n+=String.fromCharCode(e.charCodeAt(r)^t.charCodeAt(r%t.length));return n}function $(e){return`${h("secret",e).slice(0,3).padStart(3,"?")}`}function x(e){return`\`<${e.slice(0,2)}${"*".repeat(Math.max(e.length-2,0))}>\``}function C(e){return new RegExp(` \`<${e.slice(0,2)}${"\\*".repeat(Math.max(e.length-2,0))}>\`$`)}function k(e,t,n){const r=e.slice(0,t),c=e.slice(t);return`${r}${n}${c}`}function v(e,t){const n=e.slice(0,t),r=e.slice(t+1);return`${n}${r}`}function w(e,t){return e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e+1))+e}function u(){return E[w(0,E.length-1)]}function y(e){let t=a.storage.key,n=T(h(e,t)),r=Math.floor(n.length/3),c=$(t);return r==0?n=`${c}${n}`:[3,2,1].forEach(function(s){n=k(n,r*s-1,c[s-1])}),`${u()}${u()}${n}${u()}${u()}`}function F(e,t){let n=2;if(e.length<=9){if(e.slice(2,5)==t)return e.slice(5,-2)}else{let r=Math.floor((e.length-n*2-3)/3),c=`${e[r-1+(1-1)+n]}${e[r*2-1+(2-1)+n]}${e[r*3-1+(3-1)+n]}`;if(e=e.slice(2,-2),t==c)return[3,2,1].forEach(function(s){e=v(e,r*s-1+(s-1))}),e}return!1}function b(e){let t=a.storage.key,n=$(t),r=x(t),c=F(e,n);return c?`${h(L(c),t)} ${r}`:e}function L(e){return e.replaceAll("\u2004","\r").replaceAll("\u2001",`
`).replaceAll("\u2002","\v").replaceAll("\u2003","\f")}function T(e){return a.storage.shorten_text?e.replaceAll("\v","\u2002").replaceAll("\f","\u2003").replaceAll("\r","\u2004").replaceAll(`
`,"\u2001"):e}const d=A.findByProps("sendMessage","receiveMessage"),U=[l.patcher.before("dispatch",l.metro.common.FluxDispatcher,function(e){let[t]=e;switch(t.type){case"MESSAGE_CREATE":t.message.content=b(t.message.content);break;case"MESSAGE_UPDATE":t.message.content=b(t.message.content);break;case"LOAD_MESSAGES_SUCCESS":t.messages.forEach(function(n){n.content=b(n.content)});break}a.storage.debug&&l.logger.info(t)}),l.patcher.before("sendMessage",d,function(e){let[,t]=e;a.storage.enable_encryption&&(t.content=y(t.content))}),l.patcher.before("editMessage",d,function(e){let[,t]=e;a.storage.enable_encryption&&(t.content=y(t.content))}),l.patcher.before("startEditMessage",d,function(e){let[,,t]=e;t=t.replace(C(a.storage.key),"")})];function D(){a.storage.debug&&l.logger.info("Unloading SecretMessage"),U.forEach(function(e){return e()})}const V=R;return i.onUnload=D,i.settings=V,i})({},vendetta,vendetta.metro.common,vendetta.ui.components,vendetta.plugin,vendetta.storage,vendetta.metro);
