window.onload = function() {
	var canvas = document.getElementById("canvas"),
	context = canvas.getContext("2d"),
	width = canvas.width = window.innerWidth,
	height = canvas.height = window.innerHeight;

    var mouse = {
        x: 0,
        y: 0
    }

    var armLength = 10;
    var numberOfSegments = Math.round(height/30);
	var iks = IKSystem.create(width / 2, height / 2);
	for(var i = 0; i < numberOfSegments; i++) {
		iks.addArm(armLength, numberOfSegments-i);
	}
    
    var iks2 = IKSystem.create(width / 2, height / 2);
	for(var i = 0; i < numberOfSegments; i++) {
		iks2.addArm(armLength, numberOfSegments-i);
	}
    
    var iks3 = IKSystem.create(width / 2, height / 2);
	for(var i = 0; i < numberOfSegments; i++) {
		iks3.addArm(armLength, numberOfSegments-i);
	}
    
    var iks4 = IKSystem.create(width / 2, height / 2);
	for(var i = 0; i < numberOfSegments; i++) {
		iks4.addArm(armLength, numberOfSegments-i);
	}

    var iksMouse = IKSystem.create(width / 2, height / 2);
	for(var i = 0; i < numberOfSegments; i++) {
		iksMouse.addArm(armLength, numberOfSegments-i);
	}
    
    var ball = {
        x: 100,
        y: height/1.6,
        vx: 1,
        vy: 0,
        radius: 30,
        gravity: 0,
        bounce: -1,
        update: function(){
            this.x += this.vx;
            this.y += this.vy;
            this.vy += this.gravity;
            if(this.x + this.radius > width){
                this.x = width - this.radius;
                this.vx *= this.bounce;
            }
            else if(this.x < this.radius){
                this.x = this.radius;
                this.vx *= this.bounce;
            }
            if(this.y + this.radius > height){
                this.y = height - this.radius;
                this.vy *= this.bounce;
            }
            else if(this.y < this.radius){
                this.y = this.radius;
                this.vy *= this.bounce;
            }
        },
        render: function(context, mouseX, mouseY){
            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, Math.PI*2);
            context.fillStyle = "#000";
            context.fill();
            
            this.antecipate();
            
            var angle = Math.atan2(mouseY-this.y, mouseX-this.x);
            var length = 15;
            var x = this.x + Math.cos(angle) * length;
            var y = this.y + Math.sin(angle) * length;
            
            context.beginPath();
            context.arc(x, y, this.radius/3, 0, Math.PI*2);
            context.fillStyle = "#fff";
            context.fill();
            
        },
        antcpX: 0,
        antcpY: 0,
        antecipate: function(){
            var angle = Math.atan2(this.vy, this.vx);
            var length = width/10;
            this.antcpX = this.x + Math.cos(angle) * length;
            this.antcpY = this.y + Math.sin(angle) * length;
        }
    };

    var holders = [];
    var ball1 = {
        x: 100,
        y: 100,
        radius: 20,
        create: function(x, y) {
            var obj = Object.create(this);
            obj.init(x, y);
            return obj;
        },
        init: function(x, y) {
            this.x = x;
            this.y = y;
        },
        render: function(context){
            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, Math.PI*2);
            context.fillStyle = "#6e8281";
            context.fill();
            //context.fillText(this.x+","+this.y, this.x, this.y+30);
        }
    };
    
    var floor = {
        x: 100,
        y: 100,
        radius: 20,
        create: function(x, y, r) {
            var obj = Object.create(this);
            obj.init(x, y, r);
            return obj;
        },
        init: function(x, y, r) {
            this.x = x;
            this.y = y;
            this.radius = r;
        },
        render: function(context){
            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, Math.PI*2);
            context.fillStyle = "#6e8281";
            context.fill();
        }
    };
    
    var numberOfHolders = width/100;
    // half screen
    for(var i = 0; i < numberOfHolders; i++){
        var x = Math.floor(Math.random() * width/2);
        var min = height/1.1;
        var max = height - (height/6);  
        var random = Math.floor(Math.random() * (+max - +min)) + +min;
        var y = random; //height - Math.floor(Math.random() * height/4);
        
        holders.push(ball1.create(x, y))
    }
    // half screen
    for(var i = 0; i < numberOfHolders; i++){
        var x = width - Math.floor(Math.random() * width/2);
        var min = height/1.1;
        var max = height - (height/6);  
        var random = Math.floor(Math.random() * (+max - +min)) + +min;
        var y = random; //height - Math.floor(Math.random() * height/4);
        
        holders.push(ball1.create(x, y))
    }
    
    var floors = [];
    var numberOffloors = 100;
    for(var i = 0; i < numberOfHolders; i++){
        var x = Math.floor(Math.random() * width/2);
        var y = height - Math.floor(Math.random() * height/5);
        var min = 15;
        var max = 70;  
        var random = Math.floor(Math.random() * (+max - +min)) + +min;
        var r = random;
        
        floors.push(floor.create(x, y, r));
    }
    for(var i = 0; i < numberOfHolders; i++){
        var x = width - Math.floor(Math.random() * width/2);
        var y = height - Math.floor(Math.random() * height/5);
        var min = 15;
        var max = 70;  
        var random = Math.floor(Math.random() * (+max - +min)) + +min;
        var r = random;
        
        floors.push(floor.create(x, y, r));
    }
    
	document.body.addEventListener("mousemove", function(event) {
		mouse.x = event.clientX;
        mouse.y = event.clientY;
	});
    
    document.body.addEventListener("mousedown", function(event) {
		 mouse.x = event.clientX;
        mouse.y = event.clientY;
	});

    var takenHolders = [];
    var target = {
        x: 0,
        y: 0,
        v: 7,
        closestHolder: null,
        closestHolderID: 0,
        distance: 0,
        lastDistance: 99999,
        status: 'fiding',
        create: function() {
            var obj = Object.create(this);
            return obj;
        },
        update: function(px, py){
            if(this.x > px){
                this.x -= this.v;
            }
            if(this.x < px){
                this.x += this.v;
            }
            if(this.y > py){
                this.y -= this.v;
            }
            if(this.y < py){
                this.y += this.v;
            }
        },
        render: function(context){
            context.beginPath();
            context.arc(this.x, this.y, this.v, 0, Math.PI*2);
            context.fill();
        },
        findClosestHolder: function (){
            if(this.status == 'fiding'){
                this.lastDistance = 99999;
                for(var i = 0; i < holders.length; i++){
                    if(!takenHolders.includes(i)){
                        this.distance = Math.sqrt(Math.pow(holders[i].x-ball.antcpX,2) + Math.pow(holders[i].y-ball.antcpY,2));
                        if(this.distance < this.lastDistance){
                            this.closestHolder = holders[i];
                            this.closestHolderID = i;
                            this.lastDistance = this.distance;
                        }
                    }
                }
                if(!takenHolders.includes(this.closestHolderID)){
                    takenHolders.push(this.closestHolderID);
                }
                this.status = 'moving'
            }
            else if(this.status == 'moving'){
                this.distance = Math.sqrt(Math.pow(this.closestHolder.x-ball.antcpX,2) + Math.pow(this.closestHolder.y-ball.antcpY,2));
                var antecipationConstant = 0;
                if(height > width){
                    antecipationConstant = 1.2;
                }
                else{
                    antecipationConstant = 0.7;
                }
                if(this.distance > (armLength*numberOfSegments)/antecipationConstant){
                    this.status = 'fiding';
                    takenHolders = arrayRemove(takenHolders, this.closestHolderID);
                }
                else{
                    this.update(this.closestHolder.x, this.closestHolder.y);
                }
            }
        }
    }
    
    function arrayRemove(arr, value) {
        return arr.filter(function(element){
            return element != value;
        });
    }
    
    var targets = [];
    for(var i = 0; i < 5; i++){
        targets.push(target.create());
    }
    
    update();
    
	function update() {
		context.clearRect(0, 0, width, height);
		
        for(var i = 0; i < holders.length; i++){
            holders[i].render(context);
        }
        
        for(var i = 0; i < floors.length; i++){
            floors[i].render(context);
        }
        
        targets[0].findClosestHolder();
        
        if(targets[0].closestHolder){
            iks.reach(targets[0].x, targets[0].y, ball.x+15, ball.y+15);
            iks.render(context);
        }
        
        targets[1].findClosestHolder();
        
        if(targets[1].closestHolder){
            iks2.reach(targets[1].x, targets[1].y, ball.x+15, ball.y-5);
            iks2.render(context);
        }
        
        targets[2].findClosestHolder();
        
        if(targets[2].closestHolder){
            iks3.reach(targets[2].x, targets[2].y, ball.x-15, ball.y-5);
            iks3.render(context);
        }
        
        targets[3].findClosestHolder();
        
        if(targets[3].closestHolder){
            iks4.reach(targets[3].x, targets[3].y, ball.x-15, ball.y+15);
            iks4.render(context);
        }
        
        var mouseDist = Math.sqrt(Math.pow(mouse.x-ball.x,2) + Math.pow(mouse.y-ball.y,2));
        if(mouseDist < (armLength*numberOfSegments)){
            targets[4].update(mouse.x, mouse.y);
            iksMouse.reach(targets[4].x, targets[4].y, ball.x, ball.y);
            iksMouse.render(context);
        }
        else{
            targets[4].findClosestHolder();
            iksMouse.reach(targets[4].x, targets[4].y, ball.x, ball.y);
            iksMouse.render(context);
        }
        
        ball.render(context, mouse.x, mouse.y);
        ball.update();
        
		requestAnimationFrame(update);
	}
}


