var svg=document.querySelector(".svg");
var s1=document.querySelector("#s1");
var s2=document.querySelector("#s2")
svg.onclick = function(){
        if(video.paused){
            video.play();
            s1.style.display="none";
			s2.style.display="block";
			console.log(svg);
        }else {
            video.pause();
            s2.style.display="none";
			s1.style.display="block";
        }
    }
video.onclick=function(){
        if(video.paused){
            video.play();
            
        }else{
            video.pause();
            
        };
}
	
/***function mouse(){
        var video = document.querySelector("#video");
        video.onmouseenter = function () {
            svg.style.display = "block";
        }
        video.onmouseleave = function () {
           if(video.play){svg.style.display = "none";}
            else {svg.style.display = "block";}
        }
}***/