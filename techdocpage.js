var navbar = document.getElementById("navbar");
var body = document.getElementById("body");

function openNav() {
			navbar.style.width = "125px";
			document.getElementById("sections-div").style.marginLeft = "125px";
			document.getElementById("fixed-bar").style.marginLeft = "125px";
			navbar.style.backgroundColor = "#555";
			body.style.backgroundColor = "rgba(0,0,0,0.3)"
			navbar.style.overflowY = "auto";
		}

		function closeNav() {
			navbar.style.width = "0px";
			document.getElementById("sections-div").style.marginLeft = "0px";
			document.getElementById("fixed-bar").style.marginLeft = "0px";
			body.style.backgroundColor = "#F7E3E3";
			navbar.style.overflowY = "hidden";
			
		}