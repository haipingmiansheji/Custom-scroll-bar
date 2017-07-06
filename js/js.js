/**
 * Created by li on 2017/3/31.
 */
function setScroll(){
    var scrollBar,scroll,clientHeight,arr=[],setStyle,getStyle,addEvent,goTop,weixin,erweima;

    setStyle=function(json){
        for(var key in json){
            this.style[key]=json[key];
        }
    }

    getStyle=function(attr){
        if(this.currentStyle){
            return this.currentStyle[attr];
        }else{
            return getComputedStyle(this,false)[attr];
        }
    }
    addEvent=function(evName,fn){
        var _this=this;
        function callBack(ev){
            var e=ev||event;
            var target= e.target|| e.srcElement;
            fn.call(_this,e,target)
        }
        if(this.attachEvent){
            this.attachEvent('on'+evName,callBack);
        }else{
            this.addEventListener(evName,callBack,false)
        }
    }

    setStyle.call(document.documentElement,{'overflow-y': 'hidden','overflow-x': 'hidden'});
    setStyle.call(document.body,{position:'relative', top:0,left:0, margin:0});

    clientHeight=document.documentElement.clientHeight;
    scrollBar=document.createElement('div');
    scrollBar.id='scrollBar';
    setStyle.call(scrollBar,{width:'10px', height:clientHeight+'px', position: 'fixed', top:0, right:0, 'font-family':'微软雅黑',fontSize:'14px'});
    scroll=document.createElement('div');
    scroll.id='scroll';
    setStyle.call(scroll,{width:'6px', height:'50px', opacity:0.8,filter:'Alpha(opacity=80)', background:'#424242',border:'1px solid #fff ', position: 'absolute', top:0, right:'2px', '-webkit-border-radius':'6px', '-moz-border-radius':'6px', borderRadius:'6px',zIndex:2});
    goTop=document.createElement('div');
    goTop.id='goTop';
    goTop.innerHTML='top';
    setStyle.call(goTop,{width:'50px',height:'50px',background:'#ff6600',position:'fixed',right:0,bottom:'52px','text-align':'center','line-height':'50px',color:'#fff',cursor:'pointer',zIndex:1, opacity:0, display:'none', filter:'Alpha(opacity=0)',borderRadius:'5px'});

    weixin=document.createElement('div');
    weixin.id='weixin';
    weixin.innerHTML='微信';
    setStyle.call(weixin,{width:'50px',height:'50px',background:'#ff6600',position:'fixed',right:0,bottom:0,'text-align':'center','line-height':'50px',color:'#fff',cursor:'pointer',zIndex:1, opacity:0, display:'none', filter:'Alpha(opacity=0)',borderRadius:'5px'});

    erweima=document.createElement('div');
    erweima.id='erweima';
    setStyle.call(erweima,{width:'150px',height:'150px',background:'#ff6600',position:'fixed',right:0,bottom:0,'text-align':'center','line-height':'50px',color:'#fff',cursor:'pointer',zIndex:1, opacity:0, display:'none', filter:'Alpha(opacity=0)',borderRadius:'5px', background:'url(img/erweima.jpg) no-repeat center center','background-size':'cover',border:'1px solid #000'});


    scrollBar.appendChild(scroll);
    scrollBar.appendChild(goTop)
    scrollBar.appendChild(weixin)
    scrollBar.appendChild(erweima)
    document.body.insertBefore(scrollBar,document.body.lastChild);

    if(window.navigator.userAgent.indexOf('Firefox') !=-1){
        addEvent.call(document.body,'DOMMouseScroll',fn)
    }else{
        addEvent.call(document.body,'mousewheel',fn)
    }

    window.onresize=function(){
        clientHeight=document.documentElement.clientHeight;
        scrollBar.style.height=clientHeight+'px';
        drop()
        var surplusHeight=document.body.clientHeight+parseFloat(getStyle.call(document.body,'top'))-document.documentElement.clientHeight;
        if(surplusHeight<0){
            document.body.style.top=parseFloat(getStyle.call(document.body,'top'))-surplusHeight+'px';
        }
    }

    scrollBar.style.height=clientHeight+'px';
    //滚动条拖拽执行
    var scroll=document.getElementById('scroll');
    function drop(){
        var dropTop=0;
        scroll.onmousedown=function(ev){
            var e=ev||event;
            dropTop= e.clientY-this.offsetTop;
            document.onmousemove=function(ev){
                var e=ev||event;
                scroll.style.top= e.clientY-dropTop+'px';
                if(scroll.offsetTop<0){
                    scroll.style.top='0px';
                }else if(scroll.offsetTop>scrollBar.clientHeight-scroll.clientHeight){
                    scroll.style.top=scrollBar.clientHeight-scroll.clientHeight+'px';
                }
                pageUpDown.call(scroll,-parseFloat(getStyle.call(scroll,'top')),e)

            }
            document.onmouseup=function(){
                document.onmousemove=null;
                document.onmouseup=null;
            }
            return false;
        }
    }
    drop()


//滚动页面滚动条运行
    function scrollRun(position){
        var scroll=document.getElementById('scroll');//此处有问题
        //计算滚动条top值

        run.call(scroll,{top:Math.floor(-position*(clientHeight-scroll.offsetHeight)/(document.body.clientHeight-clientHeight))})

    }
//滑动滚动条页面运行

//页面滚动执行

    function pageUpDown(top,e){
        arr.push(e.clientY)
        if(arr.length>2){
            arr.shift()
        }
        for(var i=0;i<arr.length;i++){
            if(arr[i+1]>arr[i]){
                //计算页面向下top值
                run.call(document.body,{top:Math.floor(top*(document.body.clientHeight-clientHeight)/(clientHeight-scroll.offsetHeight))})

            }else if(arr[i+1]<arr[i]){
                //计算页面向上top值
                run.call(document.body,{top:Math.floor(top*(document.body.clientHeight-clientHeight)/(clientHeight-scroll.offsetHeight))})

            }
        }
    }


    function fn(e,target){
        var detail= 0;
        var top=parseFloat(getStyle.call(document.body,'top'))+(e.wheelDelta*2||-detail);
        if(-top>=clientHeight){
            goTop.style.display='block';
            weixin.style.display='block';
            run.call(goTop,{opacity:100});
            run.call(weixin,{opacity:100})
        }else{
            run.call(goTop,{opacity:0});
            run.call(weixin,{opacity:0});
            goTop.style.display='none';
            weixin.style.display='none';
        }

        if(e.wheelDelta==120|| e.detail==-3){
            //向上
            if(parseFloat(getStyle.call(document.body,'top'))<0){

                if(top>0){
                    top=0;
                }
                scrollRun(top)
                run.call(document.body,{top:top})
            }
        }else if(e.wheelDelta==-120 || e.detail==3){
            //向下
            if(-parseFloat(getStyle.call(document.body,'top'))<=document.body.clientHeight-clientHeight){
                if(top<-(document.body.clientHeight-clientHeight)){
                    top=-(document.body.clientHeight-clientHeight);
                }
                scrollRun(top)
                run.call(document.body,{top:top})
            }
        }
    }

    addEvent.call(goTop,'click',function(){
        //alert('a')
        run.call(document.body,{top:0});
        run.call(scroll,{top:0});
        run.call(weixin,{opacity:0})
        run.call(this,{opacity:0},function(){
            setStyle.call(this,{display:'none'})
            setStyle.call(weixin,{display:'none'})
        })
    })
    addEvent.call(weixin,'mouseover',function(){
        erweima.style.display='block';
        erweima.style.right='52px';
        run.call(erweima,{opacity:100})
    })
    addEvent.call(weixin,'mouseout',function(){
        erweima.style.right=0;
        run.call(erweima,{opacity:0})
        erweima.style.display='none';
    })
//滚动动画
    function run(json,fn){
        clearInterval(this.timer);
        var _this=this;
        this.timer=setInterval(function(){
            var bStop=true;
            for(var attr in json){
                var oCur=0;
                if(attr=="opacity"){
                    oCur=parseInt(parseFloat(getStyle.call(_this,attr))*100)
                }else{
                    oCur=parseInt(getStyle.call(_this,attr))
                }
                var iSpeed=(json[attr]-oCur)/8;
                iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
                if(oCur!=json[attr]){
                    bStop=false;
                }
                if(attr=="opacity"){
                    _this.style.filter="alpha(opacity="+(iSpeed+oCur)+")";
                    _this.style.opacity=(iSpeed+oCur)/100;
                }else{
                    _this.style[attr]=(iSpeed+oCur)+"px";
                }
            }

            if(bStop){
                clearInterval(_this.timer);
                if(fn){
                    fn.call(_this);
                }
            }
        },30)
    }


}
setScroll()