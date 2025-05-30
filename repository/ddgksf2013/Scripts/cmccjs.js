/*
* ==UserScript==
* @ScriptName        江苏移动（广州移动可能也适用）
* @Author            Cuttlefish
* @TgChannel         https://t.me/ddgksf2021
* @WechatID          墨鱼手记
* @UpdateTime        20210312
* @ScriptFunction    自动化签到获取流量、签到后的抽奖
* @DataAmount        每天签到可获取20~200M流量，其中满签最后一天可获取1~2G流量，可下个月领取使用
* @Attention         脚本公开后，官方做了处理，Cookie有效期2天，太短，本脚本弃用
* @ScriptURL         https://github.com/ddgksf2013/Scripts/raw/main/cmccjs.js
* ==/UserScript==

【QuantumultX】 :
*************************
[rewrite_local]
http://wap.js.10086.cn/nact/action.do url script-request-body https://raw.githubusercontent.com/axtyet/OmniAura/main/repository/ddgksf2013/Scripts/cmccjs.js
[task_local]
15 7,15 * * * https://raw.githubusercontent.com/axtyet/OmniAura/main/repository/ddgksf2013/Scripts/cmccjs.js, tag=江苏移动, img-url=https://github.com/ddgksf2013/Icon/raw/master/cmcc.png
*************************
【Loon】 :
*************************
[Script]
http-request http://wap.js.10086.cn/nact/action.do tag=江苏移动Cookie, script-path=https://raw.githubusercontent.com/axtyet/OmniAura/main/repository/ddgksf2013/Scripts/cmccjs.js
cron "15 7,15 * * *" script-path=https://raw.githubusercontent.com/axtyet/OmniAura/main/repository/ddgksf2013/Scripts/cmccjs.js,tag=江苏移动
*************************
【Surge】 :
*************************
[Script]
江苏移动 = type=cron,cronexp="15 7,15 * * *",wake-system=1,timeout=120,script-path=https://raw.githubusercontent.com/axtyet/OmniAura/main/repository/ddgksf2013/Scripts/cmccjs.js
江苏移动Cookie = type=http-request,pattern=http://wap.js.10086.cn/nact/action.do,script-path=https://raw.githubusercontent.com/axtyet/OmniAura/main/repository/ddgksf2013/Scripts/cmccjs.js
*************************
【小火箭】 :
*************************
[Script]
江苏移动 = type=cron,script-path=https://raw.githubusercontent.com/axtyet/OmniAura/main/repository/ddgksf2013/Scripts/cmccjs.js, cronexpr="15 7,15 * * *", timeout=500, enable=true
江苏移动Cookie = type=http-request,pattern=http://wap.js.10086.cn/nact/action.do,script-path=https://raw.githubusercontent.com/axtyet/OmniAura/main/repository/ddgksf2013/Scripts/cmccjs.js
*************************
[mitm]
hostname = wap.js.10086.cn
*/
const $ = new Env("江苏移动")
$.signKey = 'cmcc_userSignKey'

let isGetCookie = typeof $request !== 'undefined'

if (isGetCookie) {
  !(async () => {
    const session = {}
    session.url = $request.url;
    session.headers = $request.headers;
    if ($.setdata(JSON.stringify(session), $.signKey)) {
      $.subt = `获取会话: 成功!`
    } else {
      $.subt = `获取会话: 失败!`
    }
    $.msg($.name, $.subt, '')
  })()
  .catch((e) => $.logErr(e))
  .finally(() => $.done())
} else {
 !(async () => {
    await signin();
    await showmsg();
    
  })()
  .catch((e) => $.logErr(e))
  .finally(() => $.done())
}

async function signin() {
  return new Promise((resolve) => {
    signheaders = JSON.parse($.getdata($.signKey)).headers;
    
    const url = { 
       url: 'http://wap.js.10086.cn/nact/action.do',
       headers: {
            'Cookie': signheaders.Cookie,
            'X-Requested-With': 'XMLHttpRequest',
            'Accept-Encoding': 'gzip, deflate',
            'Connection': 'close',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Origin': 'http://wap.js.10086.cn',
            'hgvhv': 'null',
            'Referer': signheaders.Referer,
            'Host': 'wap.js.10086.cn',
            'User-Agent': signheaders['User-Agent'],
            'Accept-Language' : 'en-us',
            'Accept' : 'application/json, text/javascript, */*; q=0.01',
    	},
       body: 'reqUrl=act2204&method=sign&operType=2&actCode=2204&deskey=&extendParams=&mywaytoopen='
	}
	//console.log(JSON.stringify(url));
    $.post(url,(err, resp, data)=> {
       
      try {
        console.log(data);
        $.signBody = data
        signStatus = resp.statusCode
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve()
      }
    })
  })
}
async function signinRed() {
  return new Promise((resolve) => {
    signheaders = JSON.parse($.getdata($.signKey)).headers;
    const url = { 
       url: 'http://wap.js.10086.cn/nact/action.do',
       headers: {
            'Cookie': signheaders.Cookie,
            'X-Requested-With': 'XMLHttpRequest',
            'Accept-Encoding': 'gzip, deflate',
            'Connection': 'close',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Origin': 'http://wap.js.10086.cn',
            'hgvhv': 'null',
            'Referer': signheaders.Referer,
            'Host': 'wap.js.10086.cn',
            'User-Agent': signheaders['User-Agent'],
            'Accept-Language' : 'en-us',
            'Accept' : 'application/json, text/javascript, */*; q=0.01',
    	},
       body: 'reqUrl=act2204&method=drawForSign&operType=3&actCode=2204&deskey=&extendParams=&mywaytoopen='
	}
    $.post(url,(err, resp, data)=> {
    	$.subt = '红包领取成功';
     const body = JSON.parse(data);
          $.msr = body.resultObj.awardName+'🎉';
       
      try {

        $.signBody = data
        $.signStatus = resp.statusCode
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve()
      }
    })
  })
}

async function showmsg() {
//console.log($.signBody);
	obj=$.signBody;
    if (obj.indexOf("-2204005") !=-1) {
     console.log(obj);
     const body = JSON.parse($.signBody);
     
    	$.subt = body.resultObj.errorMsg+'!';
    }
    else if (signStatus == '200'){
    	//console.log(obj);
		if(obj.indexOf("抽奖") !=-1){
		    await signinRed();
		    console.log('task');
		}
    	else{
          const body = JSON.parse($.signBody);
    		$.subt = '签到成功';
          $.msr= body.resultObj.awardName+'🎉';
    	}
    }
    else {
     	$.subt = '签到失败';
    }

    $.msg($.name, $.subt,$.msr);
}



// prettier-ignore
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
