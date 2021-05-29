


let engine =Matter.Engine.create();
let render =Matter.Render.create({
element:document.body,
engine:engine,
 options : {
 width:1400,
 height:700,
 wireframe:false
   
 }
}); 
let ground = Matter.Bodies.rectangle(1200,400,300,20,{isStatic:true});


let mouse=Matter.Mouse.create(render.canvas);
let mouseControl = Matter.MouseConstraint.create(engine,{
 mouse: mouse,constraint:{
    render:{visible:false}
}
});
let ball = Matter.Bodies.circle(300,550,20);

let sling = Matter.Constraint.create({
    pointA:{x:300,y:550},
    bodyB: ball,
    stiffness:0.05
    
});

let firing = false;
Matter.Events.on(mouseControl,'enddrag',function(e){
    if(e.body === ball)firing=true;
});

Matter.Events.on(engine,'afterUpdate',function(){
    if(firing && Math.abs(ball.position.x-300)<20 && Math.abs(ball.position.y-550)<20){
        ball = Matter.Bodies.circle(300,550,20);
        Matter.World.add(engine.world,ball);
        sling.bodyB= ball;
        firing = false;
    }
})
let newStack = Matter.Composites.stack(1100,200,4,4,0,0,function(x,y){

    return Matter.Bodies.polygon(x,y,8,30);
})
render.mouse = mouse;

Matter.World.add(engine.world,[ground,ball,sling,newStack,mouseControl]);
Matter.Runner.run(engine);
Matter.Render.run(render);