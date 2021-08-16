/**************
 * SDK SolomoBooking 
 * version : 0.3
 * date : 15/07/2021
 */
 
function solomo_xhr (type, url, data, options) {
    options = options || {};
    var request = new XMLHttpRequest();
    request.open(type, url, true);
    if(type === "POST"){
        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    }
    request.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status >= 200 && this.status < 400) {
          options.success && options.success(solomo_parse(this.responseText));
        } else {
          options.error && options.error(this.status);
        }
      }
    };
    request.send(data);
  }
  
function solomo_parse(text){
    try {
       return JSON.parse(text);
    } catch(e){
       return text;
    }
  }


function call_solomo(data,options={theme:"dark",bgcolor:"green",color:"#fff"}){
    if(data.bien_id===false) return; // no corresponding URL
    let img_src;
    switch(theme){
      case "dark":
        img_src= "logo-solomoW.svg" ;
      break;
      case "light":
        img_src="logo-solomoB.svg";
        break;
    }
    const CDN_URL = "https://cdn.jsdelivr.net/gh/agenda-immo/minisdk@main/"
    img_src = CDN_URL + img_src
   let button_code = "<div style='position:absolute;width: 158px;height:100px;bottom:75px;right:35px;'><a target='_blank' href='"+wwwroot+"/rdvs/rdv/"+data.bien_id+"' style='text-decoration:none;background-color: "+bgcolor+";color:"+color+";padding: 10px;text-align: center;border-radius: 10px;'><img src='"+img_src+"' style='width: 19%; height: auto;'> Prendre RDV</a></div>";
   let div = document.createElement("div");  
    div.innerHTML = button_code;
   document.body.appendChild(div);
}

function agenda_solomo(agence_id,ref_interne){
wwwroot = 'https://agendasolomo.com';
wwwroot = 'http://localhost';
window.addEventListener("load", ()=>{     
     let endpoint = wwwroot+'/biens/check/'+agence_id;
     solomo_xhr ("POST", endpoint, "u="+ref_interne, {success:call_solomo}) 
 })
}