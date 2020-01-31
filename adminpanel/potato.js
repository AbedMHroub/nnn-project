let viewElement=document.querySelector("[view]"),controllerObj=null;class routeObj{constructor(e,n,l,a){this.title=e,this.controller=c,this.route=r,this.template=t,this.routeParams={}}}
class Mvc{constructor(){this._routeMap=[],this.controller={},this.template={},this.defaultRoute=""}
addRoute(e,t,r,n){this._routeMap=this._routeMap.push(new routeObj(e,r,n,t))}
addRouteList(e){this._routeMap=this._routeMap.concat(e)}
init(){(viewElement=document.querySelector("[view]"))&&(this.defaultRoute={$currentRoute:this._routeMap[Object.getOwnPropertyNames(this._routeMap)[0]]},window.onhashchange=this.update.bind(this),this.update())}
update(){(routeObj=analyzeUrl(window.location.href,this._routeMap))||(routeObj=this.defaultRoute),this.routeParams=routeObj.$routeParams,document.title=routeObj.$currentRoute.title,loadMvc(routeObj.$currentRoute.template,routeObj.$currentRoute.controller).then(e=>{viewElement.innerHTML=e.template,(controllerObj=new(e.controller[Object.keys(e.controller)[0]])).routeParams=this.routeParams,render(viewElement,controllerObj)})}
apply(){render(viewElement,controllerObj,!0)}
clear(){this.controller={},this.template={}}}
function analyzeUrl(e,t){let r,n=!1,l="",a={},s={},o=(e=e.substr(e.search("#")+2).split("/"))[0];return e.splice(0,1),t.forEach(t=>{r=t.url.substr(t.url.search("/")+1).split("/:"),o==r[0]&&e.length==r.length-1&&(n=!0,l=r[0],r.splice(0,1),a={},r.forEach((t,r)=>{a[t]=e[r]}),s=t)}),0==n?null:{$path:l,$routeParams:a,$currentRoute:s}}
async function dynamicImport(e){const t=e;try{return await
import(t)}catch(t){return console.log(e+" doesnt exist"),null}}
async function loadDoc(e){let t=new Promise((t,r)=>{let n;(n=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP")).onload=function(){t(n.responseText)},n.onerror=(()=>{console.log(e+" doesnt exist"),r()}),n.open("GET",e),n.send()});return await t}
async function loadMvc(e,t){let r,n;return r=await loadDoc(e),n=await dynamicImport(t),Promise.resolve({template:r,controller:n})}
function DImport(e){return new Promise((t,r)=>{const n=e;try{t(import(n))}catch(t){console.log(e+" doesnt exist"),r(null)}})}
let $scope={},$testedSpecials=[],$bindedVars,cm=new Map;class AttrData{constructor(e,t){this.type=e.replace("\\","").replace("$",""),this.query=e,this.render=t}}
class SpecialAttr{constructor(e,t,r){this.attr=e,this.element=t,this.exp=t.getAttribute("$"+e),this.render=r}}
function renderIf(expression,element){ try{let exp=expression.replace(/\$/g,"$scope.");createClass("hide","display: none !important");let result=eval(exp);result?element.classList.contains("hide")&&element.classList.remove("hide"):element.classList.contains("hide")||element.classList.add("hide")}catch(e){console.log(e)}}
let forid=0,formap=new Map;function renderFor(exp,element){try{let content=element.innerHTML;element.hasAttribute("data-forid")?content=formap.get(element.getAttribute("data-forid")):(element.setAttribute("data-forid",forid),formap.set(forid+"",content),forid++);let def=exp.split(":"),iterSymbol="i";def.length>1&&(iterSymbol=def[1].trim());let subArr=def[0].split("of")[0].trim(),arrName=def[0].split("of")[1].trim(),array=eval("$scope."+arrName);if(!array)return;let iterregx=new RegExp("\\$"+iterSymbol+"(?![a-z])","g"),newElement="";for(let e=0;e<array.length;e++){let t=content.replace(new RegExp("[$]"+subArr,"g"),"$"+arrName+`[${e}]`).replace(iterregx,e),r=$scope[subArr];$scope[subArr]=array[e],$scope[subArr]=r,newElement+=t}
element.innerHTML=newElement,renderTemplate(element),$apply(element)}catch(e){console.log(e)}}
function renderDisabled(exp,element){try{exp=exp.replace(/\$/g,"$scope.");let result=eval(exp);element.disabled=result}catch(e){console.log(e)}}
function renderStyle(e,t){e.split(",").forEach(e=>{let r=e.lastIndexOf(":"),n=[];n.push(e.substring(0,r).replace(/'/g,"").trim(),e.substring(r+1).trim());let l="mvc"+function(e){var t=0;if(0==e.length)return t;for(var r=0;r<e.length;r++)t=(t<<5)-t+e.charCodeAt(r),t&=t;return t}(n[0]);createClass(l,n[0]),renderClass(`${l} : ${n[1]}`,t)})}
function renderClass(exp,element){exp=exp.replace(/\$/g,"$scope.");let expGroup=exp.split(",");expGroup.forEach(ele=>{try{let splitStr=ele.split(":"),className=splitStr[0].replace(/'/g,"").trim();eval(splitStr[1])?element.classList.add(className):element.classList.remove(className)}catch(e){console.log(e)}})}
function renderClick(exp,element){try{exp=exp.replace(/\$/g,"$scope."),eventListener(element,"click",()=>{eval("$scope."+exp)})}catch(e){console.log(e)}}
function renderSubmit(exp,element){console.log(exp);try{exp=exp.replace(/\$/g,"$scope.");element.addEventListener("submit",(e)=>{e.preventDefault();eval("$scope."+exp)})}catch(e){console.log(e)}}
function renderModel(e,t){try{t.setAttribute("id",e),t.setAttribute("value",$scope[e]),eventListener(t,"change",()=>{$scope[e]=document.getElementById(e).value})}catch(e){console.log(e)}}
function renderChange(exp,element){try{exp=exp.replace(/\$/g,"$scope."),eventListener(element,"change",()=>{eval("$scope."+exp)})}catch(e){console.log(e)}}
const specails=[new AttrData("\\$for",renderFor),new AttrData("\\$if",renderIf),new AttrData("\\$disabled",renderDisabled),new AttrData("\\$style",renderStyle),new AttrData("\\$class",renderClass),new AttrData("\\$click",renderClick),new AttrData("\\$submit",renderSubmit),new AttrData("\\$model",renderModel),new AttrData("\\$change",renderChange)];function specialTags(e){let t=[];for(let r=0;r<specails.length;r++){let n=e.querySelectorAll(`[${specails[r].query}]`);n=[...n].map(e=>e=new SpecialAttr(specails[r].type,e,specails[r].render)),t=t.concat(n)}
return t}
function replaceElement(attrString){let value=attrString.replace("$","$scope.");return value=eval(value),null==value?"":value}
function $apply(e){let t;return e?t=e.innerHTML:(t=$bindedVars,e=viewElement),t=t.replace(/(\{\{.*?\}\})/g,replaceElement),e.innerHTML=t,e}
function createClass(e,t){if(!cm.has(e)){var r=document.createElement("style");r.type="text/css",r.innerHTML=`.${e} { ${t} }`,document.getElementsByTagName("head")[0].appendChild(r),cm.set(e,!0)}}
function renderTemplate(e){specialTags(e).forEach(e=>{0==$testedSpecials.filter(t=>t.element.isEqualNode(e.element)&&t.attr==e.attr).length&&($testedSpecials.push(e),e.render(e.exp,e.element))}),$testedSpecials=[]}
function render(e,t,r=!1){return $scope=t,r&&$apply(),renderTemplate(e),$bindedVars=e.innerHTML,r||$apply(e),e}
function uniqueId(){return"_"+Math.random().toString(36).substr(2,9)}
function eventListener(e,t,r){let n,l=e.getAttribute("id");l?n=l:(n=uniqueId(),e.setAttribute("id",n)),document.addEventListener(t,e=>{e.target.getAttribute("id")==n&&(e.preventDefault(),r())})}