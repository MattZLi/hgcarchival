var config = {
	apiKey: "AIzaSyDdCWD8VaS_ZzBBtJ7E8zbiy287mkbdteU",
	authDomain: "hgc-archival-demo.firebaseapp.com",
	databaseURL: "https://hgc-archival-demo.firebaseio.com",
	projectId: "hgc-archival-demo",
	storageBucket: "hgc-archival-demo.appspot.com",
	messagingSenderId: "161538429182"
};
firebase.initializeApp(config);
var storage = firebase.storage();
var url_string = window.location.href;
var url = new URL(url_string);
var concert_id = url.searchParams.get("concert_id");
var pathReference = storage.ref('json/' + concert_id + '.json');
var jsonURL = "";
pathReference.child('json/' + concert_id + '.json').getDownloadURL().then(
function(url) {
	jsonURL = url;
});
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		var myObj = JSON.parse(this.responseText);
		jsonObject = myObj;
		xmlhttp.open("GET", jsonURL, true);
		xmlhttp.send();
		document.getElementById("title").innerHTML = jsonObject["name"];
		var dateFormat = require('dateformat');
		//document.getElementById("date").innerHTML = dateFormat(new Date(jsonObject["date"]), "dddd, mmmm dS, yyyy);
		document.getElementById("venue").innerHTML = jsonObject["venue"];
		document.getElementById("conductor").innerHTML = jsonObject["conductor"];
		document.getElementById("performers").innerHTML = ", ".join(jsonObject["performers"]);
		document.getElementById("concert-blurb").innerHTML = jsonObject["concert-blurb"];
		document.getElementById("piece-blurb").innerHTML = jsonObject["piece-blurb"];
		var programPathReference = storage.ref(jsonObject["program-location"]);
		programPathReference.child(jsonObject["program-location"]).getDownloadURL().then(
		function(url) {
			document.getElementById("pdf-viewer").src = "http://docs.google.com/gview?url=" + url + "&embedded=true";
		});
	}
};

