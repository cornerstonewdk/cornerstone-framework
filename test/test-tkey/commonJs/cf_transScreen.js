TransScreen = function() {
    var m_screenStock = new Array();
    
    var m_doingTransScreen=false; //중복실행방지
    
    var __showHeaderButton = function(reverse, back){

    	switch(back){
    	case '#divQuickResult':
    		__showCommonButton("#liQuickSearch", reverse);
    		break;
    	}
        
    }

    this.cf_transScreen = function (reverse, back, front, cbFunc){        
        var cntStack = m_screenStock.length;        
        
        if(m_doingTransScreen == true) return;
        
        m_doingTransScreen = true;

        var back; 
        var front;
        var title;
        
        if(reverse == false){
            
            if(cntStack > 1){
                var arrBackFront = m_screenStock[cntStack - 1]
                var preBack  = arrBackFront.back;
                
                if(preBack == back){
                    m_doingTransScreen = false;
                    return;
                }
            }
            
            var arrBackFront = new Array();
            title = __getTitle();
            
            arrBackFront["back"]  = back;
            arrBackFront["front"] = front;
            arrBackFront["title"] = title;
           
            m_screenStock.push(arrBackFront);
        }else{
            if(cntStack == 0){
                m_doingTransScreen = false;
                return;
            }
            
            var arrBackFront = m_screenStock.pop();                
            back  = arrBackFront.back;
            front = arrBackFront.front;
            title = arrBackFront.title;
            
            __setTitle(title);
           
        }
        console.log("reverse:%s, back:%s, front:%s", reverse, back, front);
        console.trace();
        
        __showHeaderButton(reverse, back, front);
        __execTransScreen(reverse, back, front, cbFunc);
        
    }
    
    var __execTransScreen = function (reverse, back, front, cbFunc){
        
        var transitionType = "slide";
        var inTargetID;
        var outTargetID;
        
        if(reverse == false){
            //if($(back).attr("class") == "current") return false;        
            inTargetID  = back;
            outTargetID = front;        
        }
        else
        {
            inTargetID  = front;
            outTargetID = back;  
        }
        
        
        Transition.launcher({
            transitionType:transitionType,
            inTarget:{
                el:inTargetID
            },
            outTarget:{
                el:outTargetID
            },
            isReverse:reverse,
            done:function () {
                if(reverse==false)
                {
                    $(front).removeClass("current");
                    $(back).addClass("current");                    
                }else{
                    $(back).removeClass("current");
                    $(front).addClass("current");                        
                    $(back).html("");                    
                }
                
                if(cbFunc != undefined){
                    __doFunction(cbFunc);
                }
//                if(reverse==false){
//                    if(cbFunc == undefined){
//                        console.error("cf_transScreen함수에 콜백인자값이 입력되지 않았음. 확인 바람..");
//                    }
//                }
                m_doingTransScreen = false;
            }
        });
    }
    
};
