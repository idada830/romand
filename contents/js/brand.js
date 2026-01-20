//slideChange.js 

//alert('연결~~~');


//// 전역변수 설정 //////////////////////////////////////////////
var pageCount = 0; //현재 페이지 번호! (초깃값 = 첫 페이지 0)

//총 페이지수가 고정된 값이기 때문에 상수 선언! 상수는 값의 재할당(변경) 불가!
//const total = 6; //총 페이지 갯수

var total; //총 페이지 갯수가 유동적으로 변경되어야 하면 변수로 사용!

var stat = 0; //스크롤 상태 변경 (0-실행전/허용, 1-실행중/잠금)
////////////////////////////////////////////////////////////////////

$(document).ready(function(){

    //총 페이지 갯수 읽어오기!!!
    total = $('.page').length;
    console.log('총 페이지 갯수: ' + total);

    $(document).on('mousewheel DOMMouseScroll',function(e){
        //console.log('휠 움직이는 중~~~~');

        //1. 휠 이벤트 핸들러 제어하기 
        //이벤트 핸들러가 실행되는 동안 스크롤 잠금!! (다른 이벤트 핸들러가 실행되지 못하게 하겠다!!)

        //입장확인!!!
        if (stat === 1) return;
        stat = 1; //개표!!! 표를 사용했다!!!


        //2. 브라우저 구분하기 - 발생한 이벤트 정보 확인하기
        //var evt = window.event;

        //표준방식으로 변경**
        const evt = e.originalEvent;
        console.log(evt);


        //3. wheelDelta값 구하기 - 브라우저별로 구분해서 값 반환받기!

        var delta = evt.wheelDelta ? evt.wheelDelta : evt.detail;
        console.log('마우스휠 델타값: ' + delta);


        //5. 마우스휠 이벤트로 페이지 이동하기
        //마우스 휠 이동방향 -> 아래, 다음페이지 / -120 (음수)
        //마우스 휠 이동방향 -> 위, 이전페이지 / 120 (양수)

        if (delta < 0){
            //음수, 아랫방향, 다음 페이지
            pageCount++;
            if (pageCount === total) pageCount = total-1;
        } else {
            //양수, 윗방향, 이전페이지
            pageCount--;
            if (pageCount === -1) pageCount = 0;
        }

        console.log('현재 페이지 번호: ' + pageCount);

        //이동할 페이지 위치 확인 -> 문서로부터 얼마나 떨어졌나 
        //문서로부터 떨어진 거리만큼이 스크롤 이동값!
        var pageTop = $('.page').eq(pageCount).offset().top;
        console.log('페이지가 문서로부터 떨어진 거리: ' +pageTop);

        //페이지 이동!
        $('html, body').animate({
            scrollTop: pageTop + 'px'
        }, 800, function(){
            stat = 0; //이벤트 허용 상태로 변경!
        });

        //메뉴변경 - 함수 호출!
        //menuChg(pageCount);
        menuChg2();

    }); //wheel 이벤트 핸들러

    $('.gnb a, .side-pager a').on('click', function(e){

        //a의 기본기능 막기!
        e.preventDefault();

        //클릭된 메뉴와 현재 페이지 번호 일치시키기!
        //클릭 이후에 휠 이벤트가 발생할 경우, 현재 페이지를 기준으로 이동하므로 실제 보여지는 페이지와 현재 페이지 번호를 일치시켜주는 것이 필요!

        var idx = $(this).parent().index();
        console.log('클릭된 a의 부모(li) index값: ' + idx);

        pageCount = idx;
        console.log('변경된 page번호: ' + pageCount);

        //스크롤 이동거리 구하기1 - pageCount 사용
        //var pageTop = $('.page').eq(pageCount).offset().top;

        //스크롤 이동거리 구하기2 - 클릭된 a의 href값 활용하기!
        var pid = $(this).attr('href');
        console.log(pid); //ex) #brand3
        
        var pageTop = $(pid).offset().top;


        //이동!!!
        $('html, body').animate({
            scrollTop: pageTop
        }, 800);

        //메뉴변경 - 함수호출!
        menuChg(pageCount);
    });


});

/*//////////////////////////////////////////////
함수명 : menuChg
기능 : .gnb와 .side-pager 메뉴 동시 변경, 매개변수 사용!
//////////////////////////////////////////////*/
function menuChg (n){
    $('.gnb li').eq(n).addClass('on').siblings().removeClass('on');
    $('.side-pager li').eq(n).addClass('on').siblings().removeClass('on');
}

/*//////////////////////////////////////////////
함수명 : menuChg2
기능 : .gnb와 .side-pager 메뉴 동시 변경, 전역변수(pageCount) 사용!
//////////////////////////////////////////////*/
function menuChg2 (){
    $('.gnb li').eq(pageCount).addClass('on').siblings().removeClass('on');
    $('.side-pager li').eq(pageCount).addClass('on').siblings().removeClass('on');
}


