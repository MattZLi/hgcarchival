var storage = firebase.storage();
var url_string = window.location.href;
var url = new URL(url_string);
var concert_id = url.searchParams.get("concert_id");
var pathReference = storage.ref('/json');
var jsonURL = "";
console.log(concert_id);
pathReference.child(concert_id + '.json').getDownloadURL().then(
function(url) {
	jsonURL = url;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var myObj = JSON.parse(this.responseText);
			console.log(myObj);
			jsonObject = myObj;
			document.getElementById("title").innerHTML = jsonObject["name"];
			document.getElementById("date").innerHTML = new Date(jsonObject["date"]).toString("dddd, MMMM ds, yyyy");
			document.getElementById("venue").innerHTML = jsonObject["venue"];
			document.getElementById("conductor").innerHTML = jsonObject["conductor"];
			document.getElementById("performers").innerHTML = jsonObject["performers"].join(", ");
			document.getElementById("concert-blurb").innerHTML = jsonObject["concert-blurb"];
			document.getElementById("piece-blurb").innerHTML = jsonObject["piece-blurb"];
			var programPathReference = storage.ref("/" + jsonObject["program-location"].split('/').slice(0,2).join('/'));
			programPathReference.child(jsonObject["program-location"].split('/')[2]).getDownloadURL().then(
			function(u) {
				document.getElementById("pdf-viewer").data = u;
                document.getElementById("pdf-viewer-ii").src = u;
                document.getElementById("pdf-viewer-iii").href = u;
			});
            var audioPathReference = storage.ref("/" + jsonObject["mp3-locations"].split('/').slice(0,2).join('/'));
            audioPathReference.child(jsonObject["mp3-locations"].split('/')[2]).getDownloadURL().then(
            function(v) {
                document.getElementById("audio-source").src = v;
                document.getElementById("audio-controls").load();
                document.getElementById("audio-source").load();
                document.getElementById("audio-controls").load();
            });
        };
	}
	xmlhttp.open("GET", jsonURL, true);
	xmlhttp.send();
});
