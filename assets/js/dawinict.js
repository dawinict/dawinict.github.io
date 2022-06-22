	var com_info = {
			kor_nm:	"(주)다윈아이씨티",
			eng_nm:	"DAWINICT. Co., LTD.",
			addr:		"서울시 영등포구 여의나루로 53-1 대오빌딩 906호",
			corp_no:"101-86-52969",
			tel		:	"+82 2 3775 4363 ~ 4365",
			fax		:	"+82 2 3775 4366",
			email	:	"dawinict@dawinit.com" 
		}
		
	const { createApp } = Vue
      createApp({
  el: '#vue-app',
  data: function() {
    return {
      com_rem: com_info 
    }
  }
}).mount('#vue-app')

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
