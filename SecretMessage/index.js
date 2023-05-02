(function(i,l,o,M,a,A,p){"use strict";const{FormText:D,FormRow:f,FormInput:S,FormSwitch:g}=M.Forms,{ScrollView:m}=o.ReactNative;function C(){return A.useProxy(a.storage),o.React.createElement(m,null,o.React.createElement(S,{title:"Key",value:a.storage.key??"default",onSubmitEditing:function(e){return a.storage.key=e.nativeEvent.text},placeholder:"Secret key to encrypt messages",returnKeyType:"done",secureTextEntry:!0}),o.React.createElement(f,{label:"Auto shorten text",subLabel:"Shorten encrypted text by replacing specific char. Can be detected by AutoMod.",trailing:o.React.createElement(g,{value:a.storage.shorten_text??!0,onValueChange:function(e){return a.storage.shorten_text=e}})}),o.React.createElement(f,{label:"Enable encryption",subLabel:"Messages that you send will be encrypted.",trailing:o.React.createElement(g,{value:a.storage.enable_encryption??!1,onValueChange:function(e){return a.storage.enable_encryption=e}})}),o.React.createElement(f,{label:"Debug Mode",subLabel:"Log debug messages to console.",trailing:o.React.createElement(g,{value:a.storage.debug??!1,onValueChange:function(e){return a.storage.debug=e}})}))}let E="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";function h(e,t){let n="";for(let r=0;r<e.length;r++)n+=String.fromCharCode(e.charCodeAt(r)^t.charCodeAt(r%t.length));return n}function y(e){return`${h("secret",e).slice(0,3).padStart(3,"?")}`}function R(e){return`\`<${e.slice(0,2)}${"*".repeat(Math.max(e.length-2,0))}>\``}function v(e,t,n){const r=e.slice(0,t),c=e.slice(t);return`${r}${n}${c}`}function k(e,t){const n=e.slice(0,t),r=e.slice(t+1);return`${n}${r}`}function x(e,t){return e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e+1))+e}function u(){return E[x(0,E.length-1)]}function $(e){let t=a.storage.key,n=L(h(e,t)),r=Math.floor(n.length/3),c=y(t);return r==0?n=`${c}${n}`:[3,2,1].forEach(function(s){n=v(n,r*s-1,c[s-1])}),`${u()}${u()}${n}${u()}${u()}`}function F(e,t){let n=2;if(e.length<=9){if(e.slice(2,5)==t)return e.slice(5,-2)}else{let r=Math.floor((e.length-n*2-3)/3),c=`${e[r-1+(1-1)+n]}${e[r*2-1+(2-1)+n]}${e[r*3-1+(3-1)+n]}`;if(e=e.slice(2,-2),t==c)return[3,2,1].forEach(function(s){e=k(e,r*s-1+(s-1))}),e}return!1}function b(e){let t=a.storage.key,n=y(t),r=R(t),c=F(e,n);return c?`${h(w(c),t)} ${r}`:e}function w(e){return e.replaceAll("\u2004","\r").replaceAll("\u2001",`
`).replaceAll("\u2002","\v").replaceAll("\u2003","\f")}function L(e){return a.storage.shorten_text?e.replaceAll("\v","\u2002").replaceAll("\f","\u2003").replaceAll("\r","\u2004").replaceAll(`
`,"\u2001"):e}const d=p.findByProps("sendMessage","receiveMessage"),T=[l.patcher.before("dispatch",l.metro.common.FluxDispatcher,function(e){let[t]=e;switch(t.type){case"MESSAGE_CREATE":t.message.content=b(t.message.content);break;case"MESSAGE_UPDATE":t.message.content=b(t.message.content);break;case"LOAD_MESSAGES_SUCCESS":t.messages.forEach(function(n){n.content=b(n.content)});break}a.storage.debug&&l.logger.info(t)}),l.patcher.before("sendMessage",d,function(e){let[,t]=e;a.storage.enable_encryption&&(t.content=$(t.content))}),l.patcher.before("editMessage",d,function(e){let[,t]=e;a.storage.enable_encryption&&(t.content=$(t.content))}),l.patcher.before("startEditMessage",d,function(e){a.storage.enable_encryption&&console.log(e)})];function U(){a.storage.debug&&l.logger.info("Unloading SecretMessage"),T.forEach(function(e){return e()})}const _=C;return i.onUnload=U,i.settings=_,i})({},vendetta,vendetta.metro.common,vendetta.ui.components,vendetta.plugin,vendetta.storage,vendetta.metro);
