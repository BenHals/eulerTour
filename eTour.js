window.onload = function(){	
	var controls = document.getElementById("controls");
	controls.style.opacity = 0;

	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	canvas.addEventListener("mousedown",function(event){

		mouseX = event.pageX;
		mouseY=event.pageY;
		

	},false);	
	//Make the canvas occupy the full page
	var W = window.innerWidth, H = window.innerHeight;
	canvas.width = W;
	canvas.height = H;
	
	//Painting the canvas black
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, W, H);

	var padding = 7;
	var numAcross = 50;
	var numDown = 30;

	var marginX = (W-padding*2)/(numAcross-1);
	var marginY = (H-padding*2)/(numDown-1);

	var vertArray = Array();
	var selectedVerts = Array();
	var edges = Array();
	alert(edges);
	var check1 = new Vertex(1,3);
	var check2 = new Vertex(2,5);
	edges.push([check1,check2]);


	for(var y = 0;y<numDown;y++){
		for(var x = 0; x<numAcross;x++){

			vertArray.push(new Vertex(x,y));
		}
	}
	pickVerts(10);
	pickEdges();
	alert(edges);
	drawLife();

	function Vertex(x,y){
		this.x =x;
		this.y =y;
		this.edges = Array();
		this.degree = 0;
		this.unusedEdges = Array();
		this.usedEdges = Array();
		this.active = false;
		this.place = 0;

	}
	function drawLife(){
		for(var i = 0; i < vertArray.length;i++){
			var p = vertArray[i];
			ctx.beginPath();
			if(!p.active){
				ctx.fillStyle = "#596380";
			}else{
				ctx.fillStyle = "#f7464a"
			}
			ctx.arc(p.x*marginX + padding, p.y*marginY + padding, 5, Math.PI*2, false);
			ctx.fill();
		}
		for(var n =0; n <edges.length;n++){
			var e = edges[n];
			ctx.beginPath();
			ctx.strokeStyle = "#00ff00";
			ctx.moveTo(e[0].x*marginX+padding,e[0].y*marginY+padding);
			ctx.lineTo(e[1].x*marginX+padding,e[1].y*marginY+padding);
			ctx.stroke();

		}

	}

	function pickVerts(amount){

		for(var i = 0; i < amount;i++){
			unique = false;
			while(unique == false){
				unique = true;
				randIndex = Math.floor(Math.random() * (vertArray.length + 1));
				pickedVert = vertArray[randIndex];
				for(var n = 0; n < selectedVerts.length; n++){
					if(selectedVerts[n] == pickedVert){
						unique = false;
					}
				}
			}
			selectedVerts.push(pickedVert);
			pickedVert.active = true;

		}
	}
	function pickEdges(){
		full = Array();
		nonFull = Array();
		for(var i = 0; i < selectedVerts.length;i++){
			if(selectedVerts[i].degree%2 == 0 && selectedVerts[i].degree != 0){
				full.push(selectedVerts[i])
			}else{
				nonFull.push(selectedVerts[i])
			}
		}
		while(full.length < selectedVerts.length){
				var returned = makeEdge(full,nonFull);
				full = returned[0];
				nonFull = returned[1];
			

		}
	}
	function makeEdge(full, nonFull){
			var randIndex = Math.floor(Math.random() * (nonFull.length));
			var x = nonFull.splice(randIndex,1)[0];
			randIndex = Math.floor(Math.random() * (nonFull.length));
			var y = nonFull.splice(randIndex,1)[0];
			for(var i = 0; i < edges.length;i++){
				if(edges[i] == [x,y]){
					nonFull.push(x);
					nonFull.push(y);
					return [full, nonFull];
				}
			}
			edges.push([x,y]);
			edges.push([y,x]);
			x.edges.push([x,y]);
			y.edges.push([y,x]);
			x.degree += 1;
			y.degree += 1;
			if(x.degree%2 == 0){
				full.push(x);
			}else{
				nonFull.push(x);
			}
			if(y.degree%2 == 0){
				full.push(y);
			}else{
				nonFull.push(y);
			}
		return [full, nonFull];
	}

	function checkForcomplete(full){
		var checked = Array();
		x = full[0];
	}	
}