/**************
 * SDK SolomoBooking
 * version : 0.5
 * date : 27/08/2021
 */

function solomo_xhr(type, url, data, options) {
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
        options.success && options.success(solomo_parse(this.responseText));
      } else {
        options.error && options.error(this.status);
      }
    }
  };
  request.send(data);
}

function solomo_parse(text) {
  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
}

function call_solomo(data, options) {
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
  document.body.appendChild(div);
}

function agenda_solomo(agence_id, ref_interne, user_options = false) {
  let options;
  if(user_options ===  false) options = default_options;
  else {
    options = default_options;
    Object.keys(user_options).forEach(key => {
      options[key] = user_options[key];      
    });
  }

  wwwroot = "https://agendasolomo.com";
  window.addEventListener("load", () => {
    let endpoint = wwwroot + "/biens/check/" + agence_id;
    call_solomo({ bien_id: 842 }, options);
    solomo_xhr("POST", endpoint, "u=" + ref_interne, {
      success: (r) => call_solomo(r, options),
    });
  });
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
};
