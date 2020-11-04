window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth-20,
        height = canvas.height = 200;

    var mouse = {
        x: 0,
        y: 0
    }

    var armLength = 2.4;
    var numberOfSegments = Math.round(height/5);
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
        vx: 0.6,
        vy: 0,
        radius: 16,
        gravity: 1,
        bounce: -1,
        update: function(vyVar, mouseX){

            var idealDistFromGround = (numberOfSegments*armLength)*0.7;
            var actualDistFromGround = vyVar-this.y;

            if(idealDistFromGround > actualDistFromGround){
                this.vy = -0.2;
            }
            else{
                this.vy = +0.2;
            }

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
            var length = 12;
            var x = this.x + Math.cos(angle) * length;
            var y = this.y + Math.sin(angle) * length;

            context.beginPath();
            context.arc(x, y, this.radius/4, 0, Math.PI*2);
            context.fillStyle = "#fff";
            context.fill();
        },
        antcpX: 0,
        antcpY: 0,
        antecipate: function(){
            var angle = Math.atan2(this.vy, this.vx);
            var length = width/25;
            this.antcpX = this.x + Math.cos(angle) * length;
            this.antcpY = this.y + Math.sin(angle) * length;
        }
    };

    var holders = [];
    var holder = {
        x: 100,
        y: 100,
        constantX: 0,
        constantY: 0,
        radius: 10,
        back: false,
        timer: false,
        update: function(mouseX, mouseY){

            var distanceFromMouse = Math.sqrt(Math.pow(this.x-mouseX,2) + Math.pow(this.y-mouseY,2));
            var t;
            if(distanceFromMouse < 45){
                var angle = Math.atan2(mouseY-this.y, mouseX-this.x);
                var length = 2;
                var x = -Math.cos(angle) * length;
                var y = -Math.sin(angle) * length;

                var distanceFromBegin = Math.sqrt(Math.pow(this.x-this.constantX,2) + Math.pow(this.y-this.constantY,2));
                if(distanceFromMouse < 40 && distanceFromBegin < 40){
                    this.x += x;
                    this.y += y;
                }

                this.timer = true;
                this.back = false;
                clearTimeout(t);
            }
            else{

                var holder = this;
                if(this.timer == true){
                    t = setTimeout(function(){
                        holder.back = true;
                        holder.timer = false;
                    }, 10000);
                }

                if(this.back == true){
                    var returnVel = 0.3;
                    if(this.x < this.constantX){
                        this.x += returnVel;
                    }
                    if(this.x > this.constantX){
                        this.x -= returnVel;
                    }
                    if(this.y < this.constantY){
                        this.y += returnVel;
                    }
                    if(this.y > this.constantY){
                        this.y -= returnVel;
                    }
                }

            }
        },
        create: function(x, y, r) {
            var obj = Object.create(this);
            obj.init(x, y, r);
            return obj;
        },
        init: function(x, y, r) {
            this.x = x;
            this.y = y;
            this.constantX = x;
            this.constantY = y;
            this.radius = r;
        },
        render: function(context){
            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, Math.PI*2);
            context.fillStyle = "#6e8281";
            context.fill();
        }
    };

    var numberOfHolders = width/30;
    for(var i = 0; i < numberOfHolders; i++){
        var x = i*(width/numberOfHolders);
        var min = height/1.05;
        var max = height - (height/4);
        var random = Math.floor(Math.random() * (+max - +min)) + +min;
        var y = random;
        var min = 10;
        var max = 30;
        var random = Math.floor(Math.random() * (+max - +min)) + +min;
        var r = random;

        holders.push(holder.create(x, y, r))
    }

    document.body.addEventListener("mousemove", function(event) {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
    });

    var takenHolders = [];
    var target = {
        x: 0,
        y: 0,
        v: 5,
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
                    this.status = 'moving'
                }
            }
            else if(this.status == 'moving'){
                this.distance = Math.sqrt(Math.pow(this.closestHolder.x-ball.antcpX,2) + Math.pow(this.closestHolder.y-ball.antcpY,2));
                var antecipationConstant = 0;
                if(height > width){
                    antecipationConstant = 1;
                }
                else{
                    antecipationConstant = 0.9;
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

        var mouseYpos = mouse.y-(window.innerHeight-height);

        context.clearRect(0, 0, width, height);

        for(var i = 0; i < holders.length; i++){
            holders[i].render(context);
            holders[i].update(mouse.x, mouseYpos);
        }

        targets[0].findClosestHolder();
        if(targets[0].closestHolder){
            iks.reach(targets[0].x, targets[0].y, ball.x+5, ball.y+5);
            iks.render(context);
        }

        targets[1].findClosestHolder();
        if(targets[1].closestHolder){
            iks2.reach(targets[1].x, targets[1].y, ball.x+5, ball.y-5);
            iks2.render(context);
        }

        targets[2].findClosestHolder();
        if(targets[2].closestHolder){
            iks3.reach(targets[2].x, targets[2].y, ball.x-5, ball.y-5);
            iks3.render(context);
        }

        targets[3].findClosestHolder();
        if(targets[3].closestHolder){
            iks4.reach(targets[3].x, targets[3].y, ball.x-5, ball.y+5);
            iks4.render(context);
        }



        var mouseDist = Math.sqrt(Math.pow(mouse.x-ball.x,2) + Math.pow(mouseYpos-ball.y,2));
        if(mouseDist < (armLength*numberOfSegments)){
            targets[4].update(mouse.x, mouseYpos);
            iksMouse.reach(targets[4].x, targets[4].y, ball.x, ball.y);
            iksMouse.render(context);
        }
        else{
            targets[4].findClosestHolder();
            iksMouse.reach(targets[4].x, targets[4].y, ball.x, ball.y);
            iksMouse.render(context);
        }

        ball.render(context, mouse.x, mouseYpos);

        var vy = 0;
        var meanSumOfY = 0;

        for(var i = 0; i < holders.length; i++){
            if(takenHolders.includes(i)){
                meanSumOfY += holders[i].y;
            }
        }
        meanSumOfY = meanSumOfY/takenHolders.length;
        var groundDist = meanSumOfY;
        ball.update(groundDist, mouse.x);

        requestAnimationFrame(update);
    }
}
