/**************
 * SDK SolomoBooking
 * version : 0.91
 * date :22/02/2022
 */

 function agendaimmo_xhr(type, url, data, options) {
  options = options || {};
  var request = new XMLHttpRequest();
  request.open(type, url, true);
  if (type === "POST") {
    request.setRequestHeader(
      "Content-type",
      "application/x-www-form-urlencoded"
    );
  }
  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status >= 200 && this.status < 400) {
        options.success && options.success(agendaimmo_parse(this.responseText));
      } else {
        options.error && options.error(this.status);
      }
    }
  };
  request.send(data);
}

function agendaimmo_parse(text) {
  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
}

function agendaimmo_generate_button(data, options) {
  if (data.bien_id === false) return; // no corresponding URL
  let img_src;
  switch (options.theme_logo) {
    case "dark":
      img_src = "logo-solomoB.png";
      break;
    case "light":
      img_src = "logo-solomoW.png";
      break;
  }
  const CDN_URL = "https://cdn.jsdelivr.net/gh/agenda-immo/minisdk@main/";
  img_src = CDN_URL + img_src;
  let button_code =
    "<div style='" +
    options.styles_container +
    "'><a target='_blank' href='" +
    wwwroot +
    "/rdvs/rdv/" +
    data.bien_id +
    "' style='background-color: " +
    options.bgcolor +
    ";color:" +
    options.color +
    ";" +
    options.styles_button +
    "'>" +
    "<img src='" +
    img_src +
    "' style='" +
    options.styles_icon +
    "'> " +
    options.text +
    "</a></div>";
  let div = document.createElement("div");
  div.innerHTML = button_code;
  if(options.id){    
    const target = document.getElementById(options.id)
    target.appendChild(div)
  } else document.body.appendChild(div);
}

function agendaimmo(agence_id, ref_interne, user_options = false) {
  let options;
  if(user_options ===  false) options = JSON.parse(JSON.stringify(default_options));
  else {
    options = JSON.parse(JSON.stringify(default_options));
    Object.keys(user_options).forEach(key => {
      options[key] = user_options[key];      
    });
  }

  wwwroot = "https://pro.agendaimmo.com";
  window.addEventListener("load", () => {
    let endpoint = wwwroot + "/biens/check/" + agence_id;    
    agendaimmo_xhr("POST", endpoint, "u=" + ref_interne, {
      success: (r) => agendaimmo_generate_button(r, options),
    });
  });
}

function agendaimmo_negociateur(agence_id, negoEmailOrPhone, user_options = false) {
  let options;
  if(user_options ===  false) options = JSON.parse(JSON.stringify(default_options));
  else {
    options = JSON.parse(JSON.stringify(default_options));
    Object.keys(user_options).forEach(key => {
      options[key] = user_options[key];      
    });
  }

  wwwroot = "https://pro.agendaimmo.com";

  window.addEventListener("load", () => {
    let endpoint = wwwroot + "/agents/check/" + agence_id +"/"+encodeURI(negoEmailOrPhone);    
    agendaimmo_xhr("GET", endpoint,null,  {
      success: (r) => agendaimmo_generate_button_negociateur(r, options.negociateur),
    });
  });
}

function agendaimmo_generate_button_negociateur(data, options) {
  if (data.url === false) return; // no corresponding URL
  let img_src;
  switch (options.theme_logo) {
    case "dark":
      img_src = "logo-solomoB.png";
      break;
    case "light":
      img_src = "logo-solomoW.png";
      break;
  }
  const CDN_URL = "https://cdn.jsdelivr.net/gh/agenda-immo/minisdk@main/";
  img_src = CDN_URL + img_src;
  let button_code =
    "<div style='" +
    options.styles_container +
    "'><a target='_blank' href='" +
    data.url +    
    "' style='background-color: " +
    options.bgcolor +
    ";color:" +
    options.color +
    ";" +
    options.styles_button +
    "'>" +
    "<img src='" +
    img_src +
    "' style='" +
    options.styles_icon +
    "'> " +
    options.text +
    "</a></div>";
  let div = document.createElement("div");
  div.innerHTML = button_code;
  if(options.id){
    const target = document.getElementById(options.id)
    target.appendChild(div)
  } else document.body.appendChild(div);
}

const default_options = {
  styles_container:
      "position:absolute;width: 380px;height:100px;top:75px;right:0px;z-index:999",
  styles_button:
      "border-radius:60px 0px 0px 60px;text-decoration:none;padding: 0 15px;text-align: center;display: flex;align-items: center;justify-content: space-around;font-size: 25px;font-family: Arial;font-weight: bolder;",
  styles_icon: "width: 28%; height: auto;",  
  text: "RENDEZ-VOUS VISITE",
  theme_logo: "light",
  bgcolor: "#ff2127",
  color: "#fff",

  negociateur : {
    id : '', //div id
    styles_container:
    "position:absolute;width: 380px;height:100px;top:75px;right:0px;z-index:999",
styles_button:
    "text-decoration:none;text-align: center;display: flex;align-items: center;justify-content: center;font-size: 16px;font-family: Arial;",
styles_icon: "width: 10%; height: auto;margin-right:10px",  
text: "Prendre rendez-vous",
theme_logo: "light",
bgcolor: "#ffffff",
color: "#000000"
  }
};
