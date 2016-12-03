$("[data-toggle='tab']").css("border-top","4px solid #fff");
	 $("[data-toggle='tab']").click(function(){
	   $(".tabs li").css("border","0").css("border-top","4px solid #fff");
	   $(this).css("border-top","4px solid #92C201");
	   /****if($(this).prop("checked")){$(".tabs b").attr("border","3px solid #3A9BD9")
	                                           .attr("background","#3A9BD9");
	   }else{
	     $(".tabs b").attr("border","3px solid #AAD5F1").attr("background","#AAD5F1");
	   }****/
});
var ctx = dengji.getContext('2d');
	 ctx.fillStyle="#045F95";
	 ctx.fillRect(0,0,250,28);
$("#other>ul>li>a").click(function(e){
	   e.preventDefault();//阻止跳转
	   var $target=$(e.target);
	   $($target).addClass("click").parent("li").siblings().children(".click").removeClass("click");
	   var i=$target.parent().index("#other>ul>li");console.log(i);
	   var $right_side=$("#main>.right_side:eq("+i+")");
	   if(i>=0){$($right_side).css("display","block").siblings(".right_side").css("display","none");}
});
     //手风琴
var c=0;
$(".accordion a").click(function(e){
	     e.preventDefault();
		  
		 var $target=$(e.target);
		 if(c%2==0){$($target).siblings(".title").css("display","none");
		          c++;console.log(c);
		 }else if(c%2==1){
			 $($target).siblings(".title").css("display","block");c=0;
			    console.log(c);
			 }
		 
});
$(function(){
  loadProductByPage(1);
});
$('.pager').on('click','a',function(e){
   e.preventDefault();
   var pageNum=$(this).attr('href');
   console.log(pageNum);
   loadProductByPage(pageNum);
});
function loadProductByPage(pageNum){
   console.log(pageNum);
   $.ajax({
		url:'data/collect.php?pageNum='+pageNum,
        success:function(pager){
	      console.log(pager);
		  var html='';
		  $.each(pager.data,function(i,p){

			html +=`
			  <li class="each_collect">
			      <dl >
			     	<dt><a href=""><img src="${p.pic}" alt=""></a><img src="${p.pics}" alt=""></dt>
					<dd><b><a href="">${p.types}</a></b><a href="">${p.cname}</a></dd>
					<dd><span><a href="">${p.upname}</a></span>发布于昨天13时39分/播放:${p.play}&nbsp;评论:${p.comment}收藏:${p.collects}</dd>
					<dd>${p.detail}</dd>
					<ul >
						<li><a href="">宇宙少女</a></li>
						<li><a href="">程潇</a></li>
						<li><a href="">中国妹子</a></li>
						<li><a href="">偶像运动会</a></li>
					</ul>
				  </dl>
			  
			  </li>  
			
			` ;
		  });
		  $('.collect ul').html(html);
		  var html = '';
		  if(pager.pageNum-2>0){
			html += `<li><a href="${pager.pageNum-2}">${pager.pageNum-2}</a></li> `;
		  }
		  if(pager.pageNum-1>0){
			html += `<li><a href="${pager.pageNum-1}">${pager.pageNum-1}</a></li> `;
		  }
		  html += `<li class="active"><a href="#">${pager.pageNum}</a></li> `;
		  if(pager.pageNum+1<=pager.pageCount){
			html += `<li><a href="${pager.pageNum+1}">${pager.pageNum+1}</a></li> `;
		  }
		  if(pager.pageNum+2<=pager.pageCount){
			html += `<li><a href="${pager.pageNum+2}">${pager.pageNum+2}</a></li> `;
		  }
		  html+=``;
		  $('.pager').html(html);
		  console.log($('.pager').html(html));
		}
   });
}







