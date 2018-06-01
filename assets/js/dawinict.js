	var com_info = {
			kor_nm:	"(주)다윈아이씨티",
			eng_nm:	"DAWINICT. Co., LTD.",
			addr:		"서울시 송파구 송파대로 201 B동 920호(문정동,테라타워2)",
			corp_no:"101-86-52969",
			tel		:	"+82 2 881 5771",
			fax		:	"+82 2 881 5772",
			email	:	"dawinict@dawinit.com" 
		}
const vue_app = new Vue({
  el: '#vue-app',
  data: function() {
    return {
      com_rem: com_info 
    }
  }
});

document.getElementById("fouc").style.display="block";

function includeHTML() { 
	var z, i, elmnt, file, xhttp; 
	z = document.getElementsByTagName("*");
	for (i = 0; i < z.length; i++) { 
		elmnt = z[i]; file = elmnt.getAttribute("include-html"); 
		if (file) { 
			xhttp = new XMLHttpRequest(); 
			xhttp.onreadystatechange = function() { 
				if (this.readyState == 4 && this.status == 200) { 
					elmnt.innerHTML = this.responseText; 
					elmnt.removeAttribute("include-html"); 
					includeHTML();
				} 
			} 
			xhttp.open("GET", file, true); 
			xhttp.send(); 
			return; 
		} 
	} 
}
