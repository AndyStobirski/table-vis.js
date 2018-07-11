"use strict";function _interopDefault(e){return e&&"object"==typeof e&&"default"in e?e.default:e}var fontawesome=_interopDefault(require("@fortawesome/fontawesome")),faChartBar=_interopDefault(require("@fortawesome/fontawesome-free-solid/faChartBar")),faChartPie=_interopDefault(require("@fortawesome/fontawesome-free-solid/faChartPie")),faChartLine=_interopDefault(require("@fortawesome/fontawesome-free-solid/faChartLine")),d3a=require("d3-array"),d3s=require("d3-selection"),d3sc=require("d3-scale");function styleInject(e,t){void 0===t&&(t={});var a=t.insertAt;if(e&&"undefined"!=typeof document){var l=document.head||document.getElementsByTagName("head")[0],n=document.createElement("style");n.type="text/css","top"===a&&l.firstChild?l.insertBefore(n,l.firstChild):l.appendChild(n),n.styleSheet?n.styleSheet.cssText=e:n.appendChild(document.createTextNode(e))}}var css="/*tbody*/\n.tab_vis_tbody{\n  cursor: pointer;\n}\n.tab_vis_btn_container{\n  cursor: pointer;\n  position: fixed;\n  width:60px;\n  height: 40px;\n  display: none;\n  box-shadow: 2px 2px 2px grey;\n}\n.tab_vis_btn{\n  position: relative;\n  width: 100%;\n  height: 100%;\n  background-color: #fff;\n  border: 1px solid #c1c1c1;\n  border-radius: 3px;\n}\n.tab_vis_btn:before,.tab_vis_btn:after{\n  content: ' ';\n  width: 0;\n  height: 0;\n  position: absolute;\n  top:4px;\n  left:-12px;\n  border: 6px solid transparent;\n  border-right-color:#fff;\n}\n.tab_vis_btn:before{\n  left:-13px;\n  border-right-color: #c1c1c1;\n}\n.tab_vis_btn div{\n  text-align: center;\n  height: 20px;\n  color:#777;\n  border-bottom:1px solid #d3d3d3;\n}\n.tab_vis_btn div:hover{\n  text-align: center;\n  height: 20px;\n  background: #d3d3d3;\n}\n";styleInject(css);const className={addClass:function(e,t){let a=e.className,l=a+(""==a?"":" ")+t;e.className=l},removeClass:function(e,t){let a=" "+e.className+" ",l=(a=a.replace(/(\s+)/gi," ")).replace(" "+t+" "," ");removedSpace=l.replace(/(^\s+)|(\s+$)/g,""),e.className=removedSpace}};var css$1="/*@keyframes tabular{ from{ width:0px} to { width:35%} }*/\n/*@-webkit-keyframes tabular{ from{ width:0} to { width:35%} }*/\n\n@keyframes canvaKey{\n  0% { opacity:0; }\n  25% { opacity:0.3; }\n  50% { opacity:0.5;}\n  100% {opacity:1; }}\n@-webkit-keyframes canvasKey{\n  0% { opacity:0; }\n  25% { opacity:0.3; }\n  50% { opacity:0.5;}\n  100% {opacity:1; }}\n\n.tabular_container_fluid{\n  display:inline-block;\n  position:fixed;\n  margin:auto;\n  top:0;\n  left:0;\n  bottom:0;\n  right:0;\n  width:0;\n  height:0;\n  background:rgba(255,255,255,0.9);\n}\n.tabular_container_fluid .tabular_container{\n  margin:0px auto;\n  text-align: center;\n}\n.tabular_container_fluid .tabular_container canvas{\n    zoom:0.5;\n}\n.tabular_container_fluid #tabular_vis_btn{\n  margin:0px auto;\n  text-align: center;\n  height: 10%;\n  width: 100%;\n  margin-bottom:10px;\n  overflow: hidden;\n}\n\n.tabular_container_fluid h3\n{\n  text-align: center;\n}\n";styleInject(css$1);const insertCss=()=>{fontawesome.library.add(faChartBar),fontawesome.library.add(faChartPie),fontawesome.library.add(faChartLine),console.log("Insert Tabluar-vis Css done!")},canvasBase={setCanvas:function(e,t,a){let l=d3s.select(".tabular_container").append("canvas").attr("width",e).attr("height",t).style("animation","canvasKey 1s").style("WebkitAnimation","canvasKey 1s");return"col"==a&&d3s.select(".tabular_container").select("canvas").style("transform","rotate(90deg)"),l},setScale:function(e,t){return d3sc.scaleLinear().range([0,e-20]).domain([0,d3a.max(t)])},setPieScale:function(e){return d3sc.scaleLinear().range([0,2*Math.PI]).domain([0,e])},maxData:function(e){return d3a.max(e)}},barStyle=e=>{let t=e.createLinearGradient(0,200,0,0);t.addColorStop(0,"rgba(110,200,245,1)"),t.addColorStop(1,"rgba(40,125,250,1)");let a=e.createLinearGradient(0,200,0,0);return a.addColorStop(0,"rgba(135,135,135,1)"),a.addColorStop(1,"rgba(0,60,60,1)"),[t,a]},drawBarLine=(e,t,a,l,n)=>{e.beginPath(),e.moveTo(t,a),e.lineTo(l,n),e.closePath(),e.stroke()},drawBarMark=(e,t,a,l,n,r,i)=>{let o=e.getContext("2d");o.strokeStyle="black";let d=2*parseInt(t/a);0==d&&(d=.5),o.textAlign="right";let s=0,c=n;for(o.fillText(0,0,c);s<t;){let e=s+d,t=n-r(e);o.moveTo(5,t),o.lineTo(l,t),o.strokeStyle="rgba(135,135,135,0.5)",o.stroke(),o.fillText(e,0,t,15),s+=d}},drawBarRect=(e,t,a,l,n,r,i,o,d)=>{let s=a/t.length*.8,c=a/t.length*.98;e.font="14px Arial",t.forEach(function(t,a){e.beginPath(),e.rect(c*a+10,l-20,s,-n(t)),a==i&&void 0==d||void 0!=d&&d[a].includes(i)?(e.fillStyle=r[0],e.strokeStyle=r[0]):(e.fillStyle=r[1],e.strokeStyle=r[1]),e.fill(),e.closePath(),e.beginPath(),e.fillStyle="rgba(0,0,0,1)",e.textAlign="center",e.fillText(o[a],c*a+10+s/2,l,s),e.fillStyle="rgba(255,255,255,1)",e.fillText(t,c*a+10+s/2,l-n(t),s)})},drawBar=(e,t,a,l,n)=>{e=e.map(e=>parseFloat(e,10));let r=.6*document.body.clientWidth,i=r,o=document.querySelector(".tabular_container");o.firstElementChild&&o.removeChild(o.firstElementChild);let d=canvasBase.setCanvas(r,i,a),s=d.node().getContext("2d"),c=canvasBase.setScale(i-30,e),u=canvasBase.maxData(e);s.translate(15,0),drawBarLine(s,5,i-20,r,i-20),drawBarLine(s,5,i-20,5,0),drawBarMark(d.node(),u,e.length,r,i-20,c);let h=barStyle(s);drawBarRect(s,e,r,i,c,h,t,l,n),s.scale(2,2)},bar=function(e,t,a,l,n){drawBar(e,t,a,l,n)},drawPieText=(e,t,a,l,n,r,i,o)=>{e.fillStyle="rgba(0,0,0,1)",e.font="20px Arial";let d=parseFloat(i/o),s=(d=Number(100*d).toFixed(2))+"%",c=(100-d).toFixed(2)+"%";e.fillText(s,t,a),e.fillText(c,l,n)},drawPieCircle=(e,t,a,l,n,r,i,o)=>{let d={x:.5*a,y:.5*l,radius:a<l?.3*a:.3*l,focusCircle:n(t[o])};e.beginPath(),e.moveTo(d.x,d.y),e.arc(d.x,d.y,d.radius,0,d.focusCircle);let s=d.focusCircle/2,c={x:d.x+d.radius*Math.cos(s),y:d.y+d.radius*Math.sin(s)};c.x=c.x<d.x?c.x-30:c.x+30,c.y=c.y<d.y?c.y-30:c.y+30,e.fillStyle=i[0],e.strokeStyle=i[0],e.closePath(),e.fill(),e.moveTo(d.x,d.y),e.lineTo(c.x,c.y),e.stroke(),e.beginPath(),e.moveTo(d.x,d.y),e.arc(d.x,d.y,d.radius,d.focusCircle,2*Math.PI);let u=(d.focusCircle+2*Math.PI)/2,h={x:d.x+d.radius*Math.cos(u),y:d.y+d.radius*Math.sin(u)};h.x=h.x<d.x?h.x-60:h.x+30,h.y=h.y<d.y?h.y-60:h.y+30,e.strokeStyle=i[1],e.fillStyle=i[1],e.closePath(),e.fill(),e.moveTo(d.x,d.y),e.lineTo(h.x,h.y),e.stroke(),drawPieText(e,c.x,c.y,h.x,h.y,0,t[o],r)},drawPieRect=(e,t,a)=>{let l=.1*a,n="except ".concat(t);e.beginPath(),e.fillStyle="rgba(110,200,245,1)",e.rect(l,l,.5*l,.3*l),e.fillText(t,1.6*l,l+16),e.fill(),e.beginPath(),e.fillStyle="rgba(135,135,135,1)",e.rect(l,1.5*l,.5*l,.3*l),e.fillText(n,1.6*l,1.5*l+16),e.fill()},pieStyle=e=>{let t=e.createLinearGradient(0,200,0,0);t.addColorStop(0,"rgba(110,200,245,1)"),t.addColorStop(1,"rgba(40,125,250,1)");let a=e.createLinearGradient(0,200,0,0);return a.addColorStop(0,"rgba(135,135,135,1)"),a.addColorStop(1,"rgba(0,60,60,1)"),[t,a]},drawPie=(e,t,a,l)=>{let n=0;e=e.map(e=>{if(!isNaN(parseFloat(e,10)))return console.log(parseFloat(e,10)),n+=parseFloat(e,10),parseFloat(e,10)});let r=.6*document.body.clientWidth,i=r,o=document.querySelector(".tabular_container");o.firstElementChild&&o.removeChild(o.firstElementChild);let d=canvasBase.setCanvas(r,i).node().getContext("2d"),s=canvasBase.setPieScale(n);d.translate(15,0);let c=pieStyle(d);if(void 0!=l){let o;for(let e=0;e<l.length;e++)l[e].includes(t)&&(o=e);drawPieCircle(d,e,r,i,s,n,c,o),drawPieRect(d,a[o],r)}else drawPieCircle(d,e,r,i,s,n,c,t),drawPieRect(d,a[t],r);d.scale(2,2)},pie=function(e,t,a,l){drawPie(e,t,a,l)},drawLinePath=(e,t,a,l,n,r,i,o,d)=>{let s=a/t.length*.98;e.font="14px Arial",e.lineWidth="4",t.forEach(function(a,c){e.beginPath(),c!=t.length-1&&(e.moveTo(s*c+20,l-15-n(a)),e.lineTo(s*(c+1)+20,l-15-n(t[c+1])),e.strokeStyle=r[1]),e.closePath(),e.stroke(),e.beginPath(),c==i&&void 0==d||void 0!=d&&d[c].includes(i)?(e.font="22px Arial",e.fillStyle=r[0],e.fillText(a,s*c+s/2,l-n(a)-20)):(e.fillStyle=r[1],e.fillText(a,s*c+s/2,l-n(a)-20)),e.closePath(),e.fill(),e.fillStyle=r[1],e.textAlign="center",e.font="14px Arial",e.fillText(o[c],s*c+s/2,l,s)})},lineStyle=()=>{return["rgba(40,125,250,1)","rgba(135,135,135,1)"]},drawLine=(e,t,a,l,n)=>{e=e.map(e=>parseFloat(e,10));let r=.6*document.body.clientWidth,i=r,o=document.querySelector(".tabular_container");o.firstElementChild&&o.removeChild(o.firstElementChild);let d=canvasBase.setCanvas(r,i,a),s=d.node().getContext("2d"),c=canvasBase.setScale(i-30,e),u=canvasBase.maxData(e);return s.translate(15,0),drawBarLine(s,5,i-20,r,i-20),drawBarLine(s,5,i-20,5,0),drawBarMark(d.node(),u,e.length,r,i-20,c),drawLinePath(s,e,r,i,c,["rgba(40,125,250,1)","rgba(135,135,135,1)"],t,l,n),s.scale(2,2),s},line=function(e,t,a,l,n){drawLine(e,t,a,l,n)},drawBox=(e,t,a,l,n,r,i,o)=>{e.beginPath(),e.strokeStyle="#000000",e.fillStyle="#000000",e.font="20px Arial";let d=l-n(i.max)-10,s=l-n(i.min)-10,c=l-n(i.middle)-10,u=l-n(i.q3)-10,h=n(i.q3-i.q1);e.moveTo(.4*a,d),e.lineTo(.5*a,d),e.fillText("Max",.7*a,d),e.moveTo(.4*a,s),e.lineTo(.5*a,s),e.fillText("Min",.7*a,s),e.moveTo(.45*a,d),e.lineTo(.45*a,s),e.stroke(),e.beginPath(),e.strokeStyle="#000",e.fillStyle="#FFF",e.fillRect(.3*a,u,.3*a,h),e.strokeRect(.3*a,u,.3*a,h),e.stroke(),e.beginPath(),e.fillStyle="#000",e.moveTo(.3*a,c),e.lineTo(.6*a,c),e.fillText("Middle",.8*a,c),e.stroke(),e.beginPath(),e.strokeStyle="#108AEC",e.fillStyle="#108AEC";let f=l-n(t[r])-10;e.arc(.5*a,f,10,0,2*Math.PI),e.font="20px Arial",e.fillText(t[r],.2*a,f),e.fill()},drawBoxPlot=(e,t,a,l,n)=>{e=e.map(e=>parseFloat(e,10));let r=.6*document.body.clientWidth,i=r,o=document.querySelector(".tabular_container");o.firstElementChild&&o.removeChild(o.firstElementChild);let d=canvasBase.setCanvas(r,i,l),s=d.node().getContext("2d"),c=canvasBase.setScale(i-30,e),u=canvasBase.maxData(e);s.translate(15,0),drawBarLine(s,5,i-20,5,0),drawBarMark(d.node(),u,e.length,r,i-20,c),drawBox(s,e,r,i,c,t,a),s.scale(2,2)},quickSort=e=>{if((e=e.map(e=>parseFloat(e,10))).length<=1)return e;{let t=Math.floor(e.length/2)-1,a=e.splice(t,1)[0],l=[],n=[];for(let t=0;t<e.length;t++)e[t]<a?l.push(e[t]):n.push(e[t]);return quickSort(l).concat([a],quickSort(n))}},calcPlot=function(e){let t=e;t=quickSort(t),console.log(t);let a,l,n,r=e.length,i=Math.floor(t.length/2);a=t.length%2!=0?t[i]:(t[i-1]+t[i])/2,n=(1+r)/4;let o=parseInt(n),d=o+1-n,s=d*t[o-1]+(1-d)*t[o];l=3*n;let c=parseInt(l),u=parseInt(l)+1-l,h=u*t[c-1]+(1-u)*t[c],f={min:t[0],max:t[t.length-1],middle:a,q3:h,q1:s};return console.log(f),f},boxPlot=function(e,t,a,l){let n=calcPlot(e);drawBoxPlot(e,t,n,a)},pointStyle=e=>{let t=e.createLinearGradient(0,200,0,0);t.addColorStop(0,"rgba(110,200,245,1)"),t.addColorStop(1,"rgba(40,125,250,1)");let a=e.createLinearGradient(0,200,0,0);return a.addColorStop(0,"rgba(135,135,135,1)"),a.addColorStop(1,"rgba(0,60,60,1)"),[t,a]},drawPointCol=(e,t,a,l,n,r,i,o,d)=>{let s=a/t.length*.05,c=a/t.length*.9;t.forEach(function(t,a){e.beginPath(),e.arc(c*(a+1)+s/2,l-n(t),4*s,0,2*Math.PI),e.rect(c*(a+1),l,s,-n(t)+4*s),console.log(d),a==i&&void 0==d||void 0!=d&&d[a].includes(i)?(e.fillStyle=r[0],e.strokeStyle=r[0]):(e.fillStyle=r[1],e.strokeStyle=r[1]),e.fill(),e.closePath(),e.beginPath(),e.fillStyle="rgba(0,0,0,1)",e.textAlign="center",e.fillText(o[a],c*(a+1)+s/2,l+20,25),e.fillStyle="rgba(255,255,255,1)",e.fillText(t,c*(a+1)+s/2,l-n(t)+s,25)})},drawPoint=(e,t,a,l,n)=>{e=e.map(e=>parseFloat(e,10));let r=.6*document.body.clientWidth,i=r,o=document.querySelector(".tabular_container");o.firstElementChild&&o.removeChild(o.firstElementChild);let d=canvasBase.setCanvas(r,i,a),s=d.node().getContext("2d"),c=canvasBase.setScale(i-30,e),u=canvasBase.maxData(e);s.translate(15,0),drawBarLine(s,5,i-20,r,i-20),drawBarLine(s,5,i-20,5,0),drawBarMark(d.node(),u,e.length,r,i-20,c);let h=pointStyle(s);drawPointCol(s,e,r,i-20,c,h,t,l,n),s.scale(2,2)},point=function(e,t,a,l,n){drawPoint(e,t,a,l,n)},createIcon=()=>{let e=[],t=document.createElement("i");className.addClass(t,"fa fa-chart-bar"),e.push(t);let a=document.createElement("i");className.addClass(a,"fa fa-chart-pie"),e.push(a);let l=document.createElement("i");return className.addClass(l,"fa fa-chart-line"),e.push(l),e},createDrawButton=e=>{let t=e.data,a=document.createElement("div");a.setAttribute("id","tabular_vis_btn");let l=createIcon(),n=document.createElement("button");n.appendChild(l[0]),n.addEventListener("click",()=>{let e=[t.data,t.index,t.status,t.title,t.titleIdx];bar(...e)}),a.appendChild(n);let r=document.createElement("button");r.appendChild(l[1]),r.addEventListener("click",()=>{let e=[t.data,t.index,t.title,t.titleIdx];pie(...e)}),a.appendChild(r);let i=document.createElement("button");i.appendChild(l[2]),i.addEventListener("click",function(){let e=[t.data,t.index,t.status,t.title,t.titleIdx];line(...e)}),a.appendChild(i);let o=document.createElement("button");o.innerHTML="boxPlot",o.addEventListener("click",()=>{let e=[t.data,t.index,t.status,t.title];boxPlot(...e)}),a.appendChild(o);let d=document.createElement("button");return d.innerHTML="point",d.addEventListener("click",()=>{let e=[t.data,t.index,t.status,t.title,t.titleIdx];point(...e)}),a.appendChild(d),a},createTabular=e=>{let t=document.createElement("div");className.addClass(t,"tabular_container_fluid");let a=document.createElement("div");return a.setAttribute("id","tabular_vis"),className.addClass(a,"tabular_container"),a.addEventListener("click",()=>{t.removeAttribute("style"),t.style.width="0",t.removeChild(t.querySelector("h3")),a.removeChild(a.firstElementChild)}),t.appendChild(createDrawButton(e)),t.appendChild(a),document.body.appendChild(t),console.log("Create Tabular div done"),t},swapTabularVis=(e,t)=>{let a=t.querySelector(".tabular_container");return e?"0px"!=t.style.width?(t.removeAttribute("style"),t.style.width="0",t.removeChild(t.firstElementChild),!1):(t.style.width=.35*document.body.clientWidth+"px",t.style.height=.4*document.body.clientWidth+"px",t.style.animation="tabular 1s",t.style.WebkitAnimation="tabular 1s",t.style.cursor="pointer",!0):(a.firstElementChild&&a.removeChild(a.firstElementChild),t.style.width=.35*document.body.clientWidth+"px",t.style.height=.4*document.body.clientWidth+"px",t.style.animation="tabular 1s",t.style.WebkitAnimation="tabular 1s",t.style.cursor="pointer",!0)},numericalData=(e,t,a,l)=>{for(let t=0;t<e[0].length;){let n=e[0][t].innerHTML.replace(/\,/g,"");a.push(n),l.push(e[1][t].innerHTML),t++}return{data:a,title:l}},cateData=(e,t,a)=>{let l=[];for(let n=0;n<e.length;n++){let r=e[n].innerHTML;if(a.includes(r)){let e=a.indexOf(r);l[e].push(n),t[e]++}else t.push(1),a.push(r),l.push([n])}return{data:t,title:a,titleIdx:l}},regData=e=>{let t=[],a=[],l=new RegExp(/^\d+\.?\d*$/),n=e[0][0].innerHTML.replace(/\,/g,"");return l.test(n)?numericalData(e,0,t,a):cateData(e[0],t,a)},colData=function(e,t){let a=e.parentNode,l=a.parentNode.children,n=[],r=Array.prototype.indexOf.call(a.children,e);for(let e=0;e<l.length;e++)n.push(l[e].children[r]);let i=regData([n,t]),o={data:i.data,title:i.title,index:Array.prototype.indexOf.call(n,e)};return"titleIdx"in i&&Object.assign(o,{titleIdx:i.titleIdx}),o},rowData=function(e,t){let a=e.parentNode,l=Array.from(a.children);l.shift();let n=regData([l,t]),r={data:n.data,title:n.title,index:Array.prototype.indexOf.call(l,e)};return"titleIdx"in n&&Object.assign(r,{titleIdx:n.titleIdx}),r},initHead=(e,t)=>{if(!e.querySelector("h3")){let e=document.createElement("h3");return e.innerHTML=t,e}e.querySelector("h3").innerHTML=t},initBtn=(e,t,a)=>{let l=document.createElement("div"),n=document.createElement("div");className.addClass(l,"tab_vis_btn_container"),className.addClass(n,"tab_vis_btn");let r=document.createElement("div"),i=document.createElement("div");r.innerHTML="ROW",i.innerHTML="COL";return n.appendChild(r),n.appendChild(i),l.appendChild(n),document.body.appendChild(l),r.addEventListener("click",()=>{l.style.display="none";let n=rowData(e.ele,e.rowTitle),r=colData(e.ele,e.colTitle).index;Object.assign(a.data,{data:n.data,title:n.title,index:n.index,head:e.colTitle[r].innerHTML,status:"row"}),"titleIdx"in n&&Object.assign(a.data,{titleIdx:n.titleIdx}),t.insertBefore(initHead(t,a.data.head),t.querySelector(".tabular_container")),swapTabularVis(!1,t),bar(n.data,n.index,"row",n.title,n.titleIdx)}),i.addEventListener("click",()=>{l.style.display="none";let n=colData(e.ele,e.colTitle),r=rowData(e.ele,e.rowTitle).index;Object.assign(a.data,{data:n.data,title:n.title,index:n.index,head:e.rowTitle[r].innerHTML,status:"col"}),"titleIdx"in n&&Object.assign(a.data,{titleIdx:n.titleIdx}),t.insertBefore(initHead(t,a.data.head),t.querySelector(".tabular_container")),swapTabularVis(!1,t),bar(n.data,n.index,"col",n.title,n.titleIdx)}),l},colTitle=e=>{if("object"==typeof e){let t=e.querySelector("tbody").children,a=[];for(let e=0;e<t.length;e++)a.push(t[e].children[0]);return a}console.error("the cell bind doesn't come from DOM ")},rowTitle=e=>{if("object"==typeof e){let t=e.querySelector("thead").querySelector("tr");return t=Array.from(t.children),Array.prototype.shift.call(t),t}console.error("the table bind doesn't come from DOM ")},initTable=function(e){let t=e.querySelector("tbody");className.addClass(t,"tab_vis_tbody");let a,l={ele:"",rowTitle:"",colTitle:""};this.initial?a=document.querySelector(".tabular_container_fluid"):(l.rowTitle=rowTitle(e),l.colTitle=colTitle(e),fontawesome.library.add(faChartBar),fontawesome.library.add(faChartPie),fontawesome.library.add(faChartLine),console.log("Insert Tabluar-vis Css done!"),a=createTabular(this),this.initial=!0);let n=initBtn(l,a,this);t.addEventListener("click",()=>{let e=event||window.event,t=e.clientX,a=e.clientY;n.style.left=t+"px",n.style.top=a+"px",n.style.display="block",l.ele=e.target})},table_vis={initial:!1,data:{},vis:initTable};module.exports=table_vis;
