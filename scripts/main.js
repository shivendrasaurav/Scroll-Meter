var final_hex;

function randomNumber(min, max) {  
    return Math.random() * (max - min) + min; 
}

function countDigits(a){ // FUNCTION TO COUNT DIGITS (TO HANDLE SINGLE DIGITS)
    return a.toString().length;
}

function randombg(){
    var a = randomNumber(0, 255);       //Red
    var b = randomNumber(0, 255);       //Green
    var c = randomNumber(0, 255);       //Blue

    /* CODE FOR CONVERTING RGB TO HEX */
    var hex_arr=[parseInt(a).toString(16), parseInt(b).toString(16), parseInt(c).toString(16)];

    var hex="#";

    for(var i = 1;i<=3;i++){
        var len = countDigits(hex_arr[i-1]);
        if(len!=2){
            hex = hex + "0" + hex_arr[i-1].toString();
        }
        else
            hex = hex + hex_arr[i-1].toString();
    }

    var sum= a+b+c;
    var background="rgb("+ a + ", " + b + ", " + c + ")";

//    console.log(hex);
//    console.log(background);

    final_hex=hex;
//    console.log(final_hex);

    //document.getElementById("hex").innerHTML=hex + "<span>Click to copy Hex Code</span>";

    if(sum>=455){
        var bglist = document.querySelectorAll(".rand_back");
        var i;
        for (i = 0; i < bglist.length; i++) {
            bglist[i].style.color = ("#1e1e1e");
        }
    }
    else{
        var bglist = document.querySelectorAll(".rand_back");
        var i;
        for (i = 0; i < bglist.length; i++) {
            bglist[i].style.color = ("#fcfcfc");
        }    
    }

    var bglist = document.querySelectorAll(".rand_back");
    var i;
    for (i = 0; i < bglist.length; i++) {
        bglist[i].style.backgroundColor = background;
    }
}

function closemodal(){
    var modlist = document.querySelectorAll(".modal");
    var i;
    for (i = 0; i < modlist.length; i++) {
        modlist[i].removeAttribute("open");
    }
}

function copy(){
    document.getElementById("snackbar").style.display=("block");
    const el = document.createElement('textarea');
    el.val = final_hex;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
//    console.log("copied to clipboard");
    setTimeout(hidesnack, 2000);
}

function hidesnack(){
    document.getElementById("snackbar").style.display=("none");
}
var ctr=1;
var distance=0;
var kmdistance=0;

function calc_scroll(){
    window.scrollBy({
        bottom: 755,
        left: 0,
        behavior: 'smooth'
    });
    distance = distance + 0.2;
    if(distance>1000){
        kmdistance=kmdistance+1;
        distance=0;
    }
    est_distance = distance.toFixed(2);
    c_est_distance = est_distance;
    if(kmdistance>0)
        document.getElementById("meter").innerHTML=kmdistance + " KM " + est_distance + " M";
    else
        document.getElementById("meter").innerHTML=est_distance + " M";
    var flag1=0;
   
    est_copy = c_est_distance;
    if(est_copy/(20*ctr) > 1 && flag1==0){
        ctr=ctr+1;
        flag1 = 1;
        //console.log(ctr);
        //console.log("In Controlling IF");
        //console.log(flag1);
    }
    if(flag1==1){
        randombg();
        flag1 = 0;
        //console.log(flag1);
    }
    setCookie("mdistance", est_distance, 365);
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue.toString() + ";" + expires + ";path=/";
    var xyzabc = document.cookie;
    console.log(xyzabc);
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}  

function checkCookie() {
    var val = getCookie("mdistance");
    if (navigator.cookieEnabled == true && val != "") {
     alert("Value stored is " + val);
    }
  }