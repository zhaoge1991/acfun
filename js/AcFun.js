$(document).scroll(function(){
        //查找id为toTop的div
       $("#toTop").css("display",$("body").scrollTop()>=400?
                              "block":"none");
        //设置div的display为:
       }
);
$("#btn1").click(function(){//右侧固定按钮
	   $("#rt_side").css("display","none");
	 }
);
$("#phone").mouseover(function(){
   $("#phone>b>a>img").css('display','block');
});
//app-code.png的显示与隐藏
$("#phone").mouseout(function(){
   $("#phone>b>a>img").css('display','none');
});

$(document).scroll(function(){
       $("#nav").css("top",$("body").scrollTop()>=226?0:0);
	   
	   
});

/*****************轮播********************/
var imgs=[
	{"i":0,"img":"images/121302271et5925t.jpg","txt":"你不充钱还想玩游戏！"},
    {"i":1,"img":"images/1470972998213.jpg","txt":"喜闻乐见，顶上去报复社会"},
    {"i":2,"img":"images/1470993899952.jpg","txt":"一旦接受了这种设定，还是蛮带感的"},
    {"i":3,"img":"images/1470981447120.jpg","txt":"只有会员才知道的世界"},
    {"i":4,"img":"images/1473914378927.jpg","txt":"现在走，还来得及"}
];
var slider={
  LIWIDTH:0,//保存每个li的宽度，就算#slider的宽度
  DURATION:1000,//动画总时间
  WAIT:1000,//自动轮播之间等待时间
  timer:null,//保存一次性定时器序号
  canAuto:true,//保存是否可以轮播
  init:function(){
    this.LIWIDTH=parseFloat($("#slider").css("width"));
	this.updateView();
	//为id为index的ul添加鼠标进入事件代理，不是hover的li才能响应事件
	$("#indexs").on("mouseover","li:not(.hover)",function(e){
	  //获得目标元素$target
	  var $target=$(e.target);
	  //调用move方法，传入要移动的个数：
	    //目标元素内容
		this.move($target.html()-$target.siblings(".hover").html());
	}.bind(this));
	//当鼠标进入#slider时,将canAuto改为false
	//当。。。移出时，将canAuto改为true
	$("#slider").hover(
	  function(){this.canAuto=false;}.bind(this),
	  function(){this.canAuto=true;}.bind(this)
	)
	this.autoMove();
  },
  autoMove:function(){//自动轮播
    //启动一次性定时器：
	this.timer=setTimeout(function(){
		if(this.canAuto){this.move(1);
		}else{
		  this.autoMove();
		}
	}.bind(this),this.WAIT);
  },
  move:function(n){
    clearTimeout(this.timer);//
	this.timer=null;
	$("#imgs").stop(true);
	//获得imgs当前left,转为浮点数
	var left=parseFloat($("#imgs").css("left"));
	//如果n<0
	if(n<0){ 
	  n*=-1;
	  //先修改数组
	  imgs=imgs.splice(imgs.length-n,n).concat(imgs);
	  //更新界面
	  this.updateView();
	  //修改#imgs的left为left-n*LIWIDTH
	  $("#imgs").css("left",left-n*this.LIWIDTH);
	  //启动动画，在DURATION时间内，left移动到0
	  $("#imgs").animate({left:"0"},this.DURATION,this.autoMove());
	}else{
	  //让#imgs的ul在DURATION时间内，left变为-n*LIWIDTH
	  $("#imgs").animate({left:-n*this.LIWIDTH+"px"},
		this.DURATION,
		//动画结束后调用endMove，替换this，传入参数n
		this.endMove.bind(this,n));
	}
  },
  endMove:function(n){
    //删除数组开头的n个元素,再拼到结尾
	imgs=imgs.concat(imgs.splice(0,n));
	this.updateView();//更新界面
	//设置#imgs的left为0
	$("#imgs").css("left",0);
	this.autoMove();
  },
  updateView:function(){//将数组元素更新到页面
    for(var i=0,html="",idxs="";i<imgs.length;i++){
	  html+="<li><img src='"+imgs[i].img+"'><b>"+imgs[i].txt+"</b></li>";
	  idxs+="<li>"+(i+1)+"</li>"
	}
	//设置id为imgs的内容为html，并设置宽为
	$("#imgs").html(html).css("width",this.LIWIDTH*imgs.length);
	$("#indexs").html(idxs);
	$("#indexs>li:eq("+imgs[0].i+")")
		.addClass("hover")
		.siblings(".hover").removeClass("hover");
  }
}
slider.init();
/**********************************************/
/***********************番剧+按钮*******************/
$(".main_tabs button").click(function(e){
   var $target=$(e.target);
   var i=$target.index("#fan button");
   console.log(i);
   var $fan_detail=$("#fan .fan_detail:eq("+i+")");
   $($fan_detail).css("display","block")
	   .siblings(".fan_detail").css("display","none");
   $($target).addClass("checked").siblings("button").removeClass("checked");
});


/********新番**********/
$(".fan_detail dl dt ").mouseenter(function(e){
	e.preventDefault();
   var $target=$(e.target);
   $($target).css("opacity","0.5");
   $($target).parent("a").children("p").css("display","block")
})
$(".fan_detail dl dt ").mouseleave(function(e){
//用mouseout时，鼠标进入p元素上方时p隐藏，且移到dt的其他地方p也不会再次出现
	e.preventDefault();
   var $target=$(e.target);
   $($target).css("opacity","1");
   $($target).parent("a").children("p").css("display","none")
})




