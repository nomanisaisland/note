(function(){
	var canvas=document.getElementById("canvas"),
		context=canvas.getContext("2d");
		$(canvas).css("background-color","#222222");

	var centerBall=new Ball(100,"#666666"),
		balls=[],
		numBalls=10;
		spring=0.05,//弹性系数
		bounce=-1;
		
	centerBall.x=canvas.width/2;
	centerBall.y=canvas.height/2;
	
	function createBalls(){
		while(numBalls--){
			var ball=new Ball(Math.random()*40+5,Math.random()*0xffffff);
			ball.x=Math.random()*canvas.width;
			ball.y=Math.random()*canvas.height;
			ball.vx=Math.random()*6-3;
			ball.vy=Math.random()*6-3;
			balls.push(ball);
		}
	}
	createBalls();
	
	function move(ball){
		ball.x+=ball.vx;
		ball.y+=ball.vy;
		if(ball.x+ball.radius>canvas.width){
			ball.x=canvas.width-ball.radius;
			ball.vx*=bounce;
		}else if(ball.x-ball.radius<0){
			ball.x=ball.radius;
			ball.vx*=bounce;
		}
		if(ball.y+ball.radius>canvas.height){
			ball.y=canvas.height-ball.radius;
			ball.vy*=bounce;
		}else if(ball.y-ball.radius<0){
			ball.y=ball.radius;
			ball.vy*=bounce;
		}
	}
	
	function draw(ball){
		var dx=ball.x-centerBall.x,
			dy=ball.y-centerBall.y,
			dist=Math.sqrt(dx*dx+dy*dy),
			minDist=ball.radius+centerBall.radius;
		if(dist<minDist){
			var angle=Math.atan2(dy,dx);
			tx=centerBall.x+Math.cos(angle)*minDist;
			ty=centerBall.y+Math.sin(angle)*minDist;
			ball.vx+=(tx-ball.x)*spring;
			ball.vy+=(ty-ball.y)*spring;
		}
		ball.draw(context);
	}
	
	(function drawFrame(){
		if(animaClose){
			return;
		}
		window.requestAnimationFrame(drawFrame,canvas);
		context.clearRect(0,0,canvas.width,canvas.height);
		enterFrameHandler();
	})()
	
	function enterFrameHandler(){
		balls.forEach(move);
		balls.forEach(draw);
		centerBall.draw(context);
	}
	
})();
