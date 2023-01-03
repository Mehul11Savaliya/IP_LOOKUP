window.onload=()=>{
    //http://ipwho.is/1.38.180.32
    let inp = document.getElementById("inp");
    let srch = document.getElementById("srch");
    let data = document.querySelectorAll(".data")[0];
    let data2 = document.querySelectorAll(".data")[1];
    srch.addEventListener(
        "click",(evt)=>{
          pars().then((val)=>{
            if(val.success==false) alert("Ip Not Found");
            else
            updateui(val);
          });
        }
    );

    let pars = () =>{ 
        return new Promise((res,rej)=>{
        var xhr = new XMLHttpRequest(),
        method = "GET",
        url =`http://ipwho.is/`+inp.value;
    
      xhr.open(method, url, true);
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          res(JSON.parse(xhr.responseText));
        }
      };
      xhr.send();
    })}

    let updateui =(json)=>{
      data.innerHTML="";
      for(let id in json){
        if(typeof(json[id])!="object"){
          if(id==`success` || id==`is_eu`){continue;}
        let dta =document.createElement("div");
        dta.setAttribute("class","content");
        dta.innerHTML=` <span id=`+id+`>`+id+` :: `+json[id]+`</span>`;
         data.appendChild(dta);
        }
      }
      document.getElementById("map").setAttribute("src",`https://maps.google.com/maps?q=`+json.latitude+`,`+json.longitude+`&t=&z=15&ie=UTF8&iwloc=&output=embed`);
      document.getElementById("im").setAttribute("src",json.flag.img);
      document.getElementById("cisp").innerText=json.connection.org+` || `+json.connection.isp;
      document.getElementById("time").innerText=json.timezone.id+` | `+json.timezone.abbr+` | `+json.timezone.utc+` | `+json.timezone.current_time;
    }
}