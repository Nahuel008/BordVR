/* ===============
   MENU RESPONSIVE
=============== */
let menu = document.querySelector('.mobile ul');
let hambBtn = document.querySelector('.mobile .menu-hamb');
let iconBtn= hambBtn.querySelector('i');
let isOpen=false;
hambBtn.addEventListener('click',function(){
  if(isOpen === false){
    menu.classList.add('open');
    iconBtn.classList.remove('fa-bars');
    iconBtn.classList.add('fa-times');
    isOpen=true;
  }else{
    menu.classList.remove('open');
    iconBtn.classList.remove('fa-times'); 
    iconBtn.classList.add('fa-bars');
    isOpen=false; 
  }
});
/*======================
  GET COLOR FROM IMAGE
========================*/
let getImgColor= (img)=> {
    let blockSize = 5,
        canvas = document.createElement('canvas'),
        context = canvas.getContext && canvas.getContext('2d'),
        data, width, height,
        i = -4,
        length,
        rgb = {r:0,g:0,b:0},
        count = 0;
    height = canvas.height = img.naturalHeight || img.offsetHeight || img.height;
    width = canvas.width = img.naturalWidth || img.offsetWidth || img.width;

    context.drawImage(img, 0, 0);
    data = context.getImageData(0, 0, width, height);
    length = data.data.length;
    while ( (i += blockSize * 4) < length ) {
        ++count;
        rgb.r += data.data[i];
        rgb.g += data.data[i+1];
        rgb.b += data.data[i+2];
    }
    rgb.r = ~~(rgb.r/count);
    rgb.g = ~~(rgb.g/count);
    rgb.b = ~~(rgb.b/count);

    return rgb;
}

let menuColor = (color) =>{
    let linkDesktop = document.querySelectorAll('header nav.desktop ul li a');
    document.querySelector('header').style.borderBottom='1px solid '+color+'';
    linkDesktop.forEach(link=>{
        link.style.color=color;
    });
    let linkMobile = document.querySelectorAll('header nav.mobile ul li a');
    linkMobile.forEach(link=>{
        link.style.color=color;
    });
    let logo = document.querySelector('header nav.mobile img');
    if(color === "#FFF"){
        logo.src='./src/assets/img/logo.png';
        
    }else{
        logo.src='./src/assets/img/logoBlack.png';
        
    }
    iconBtn.style.color=color;
    let styleElem = document.head.appendChild(document.createElement("style"));
    styleElem.innerHTML = "header nav.desktop ul li a:before {background-color: "+color+" !important;} header nav.mobile ul li a:before {background-color: "+color+" !important;}";

}
let sidebarColor = (color) =>{
    let sidebarLeft = document.querySelectorAll('.left-sidebar ul li a');
    let sidebarRight = document.querySelectorAll('.right-sidebar ul li a');
    let logo = document.querySelector('.left-sidebar .logo img');
    if(color === "#FFF"){
        logo.src='./src/assets/img/logo.png';
    }else{
        logo.src='./src/assets/img/logoBlack.png';    
    }
    document.querySelector('.right-sidebar').style.color=color;
    sidebarLeft.forEach(link=>{
        link.style.color=color; 
    });
    document.querySelector('.left-sidebar').style.borderRight='1px solid '+color+'';
    document.querySelector('.right-sidebar').style.borderLeft='1px solid '+color+'';
    sidebarRight.forEach(link=>{
        link.style.color=color; 
    });
}
let contColor = (color)=>{
    let container = document.querySelector('.full-hero .container');
    let containerLink = document.querySelector('.full-hero .container a');
    let indicator = document.querySelector('.indicator-number');
    indicator.style.color=color;
    container.style.color=color;
    containerLink.style.color=color;
}



let colorMap = ()=>{
    const image = document.querySelector(".image.active img");
    const box= document.querySelector(".image.active .description");
    const boxLink= document.querySelector(".image.active .description a");
    const {r,g,b} = getImgColor(image);
    let color = ((r*299)+(g*587)+(b*114))/1000;
    if(color >= 128){
        box.style.color="#000";
        boxLink.style.color="#000";
        menuColor('#000');
        sidebarColor('#000');
        contColor('#000');
    } else{
        box.style.color="#FFF";
        boxLink.style.color="#FFF";
        menuColor('#FFF');
        sidebarColor('#FFF');
        contColor('#FFF');
    }
    if(r-30>0 && g-30>0 && b-30>0){
    menu.style.background = `rgba(${r-30}, ${g-30},${b-30})`;
    document.querySelector('.full-hero').style.background = `rgba(${r-30}, ${g-30},${b-30})`;
    }else{
        menu.style.background = `rgba(${r}, ${g},${b})`;
    document.querySelector('.full-hero').style.background = `rgba(${r}, ${g},${b})`; 
    }
    box.style.background = `rgba(${r}, ${g},${b},.6)`
    console.log( `rgba(${r}, ${g},${b},.6)`)
}
window.onload=colorMap;
document.addEventListener("DOMContentLoaded",colorMap);

/*================
    CHANGE CONTENT
=================*/
let slider = () => {
    let navigation = document.querySelector('.indicators ul');
    let navigationMobile =document.querySelector('.indicators-mobile ul');
    let images= document.querySelectorAll('.container .image');
    let indicatorNumber= document.querySelector('.indicator-number span');
    navigation.innerHTML= "";
    navigationMobile.innerHTML= "";
    let i = 0;
    images.forEach(el=>{
        if(el.classList[1]){
            console.log(el + i);
            navigation.innerHTML+='<li class="active" data-index="'+i+'"><a href="#" >0'+(i+1)+'</a></li>';
            navigationMobile.innerHTML+='<li class="active" data-index="'+i+'"><a href="#" >0'+(i+1)+'</a></li>';
        }else{
        navigation.innerHTML+='<li data-index="'+i+'"><a href="#" >0'+(i+1)+'</a></li>';
        navigationMobile.innerHTML+='<li data-index="'+i+'"><a href="#" >0'+(i+1)+'</a></li>';
    }
        i++;
    });




    let links= navigation.querySelectorAll('li');
    links.forEach(link=>{
        link.addEventListener('click',()=>{ 
            navigation.querySelector('li.active').classList.remove('active');
            link.classList.add('active');
            let active = document.querySelector('.container .image.active');
            active.classList.remove('active');
            images[link.getAttribute('data-index')].classList.add('active'); 
            let i= parseInt(link.getAttribute('data-index'))+1
            indicatorNumber.innerHTML='0'+ String(i);
            colorMap(); 
        })
    });


    let linksMob= navigationMobile.querySelectorAll('li');
    linksMob.forEach(link=>{
        link.addEventListener('click',()=>{ 
            console.log('click');
            navigationMobile.querySelector('li.active').classList.remove('active');
            link.classList.add('active');
            let active = document.querySelector('.container .image.active');
            active.classList.remove('active');
            images[link.getAttribute('data-index')].classList.add('active'); 
            let i= parseInt(link.getAttribute('data-index'))+1
            indicatorNumber.innerHTML='0'+ String(i);
            colorMap(); 
        })
    });
    console.log(links)
}
/*============
SLIDER SCROLL
============*/
document.addEventListener("wheel",(e)=>{
   let actualPage = document.querySelector('.indicators ul li.active');
   let links = document.querySelectorAll('.indicators ul li');
   let next = parseInt(actualPage.getAttribute('data-index'))+1;
   let prev = parseInt(actualPage.getAttribute('data-index'))-1;
    let imageActive = document.querySelector('.container .image.active');
    let images= document.querySelectorAll('.container .image');
    let indicatorNumber= document.querySelector('.indicator-number span');
    if(e.deltaY>0){
       if(next +1 > links.length){
        actualPage.classList.remove('active');
        document.querySelector('[data-index="0"]').classList.add('active');
        imageActive.classList.remove('active');
        images[0].classList.add('active'); 
        indicatorNumber.innerHTML='01';
        } else{
            actualPage.classList.remove('active');
        document.querySelector('[data-index="'+next+'"]').classList.add('active'); 
        imageActive.classList.remove('active');
        images[next].classList.add('active'); 
        indicatorNumber.innerHTML='0'+ String(next+1);
        }
       
        
    }else{
        if(prev  < 0){
            actualPage.classList.remove('active');
            document.querySelector('[data-index="'+(links.length-1)+'"]').classList.add('active');
            imageActive.classList.remove('active');
            images[links.length-1].classList.add('active'); 
            indicatorNumber.innerHTML='0'+ String(links.length);
            } else{
                actualPage.classList.remove('active');
            document.querySelector('[data-index="'+prev+'"]').classList.add('active'); 
            imageActive.classList.remove('active');
            images[prev].classList.add('active'); 
            indicatorNumber.innerHTML='0'+ String(prev+1);
            }
       

    }
    colorMap();
});
document.addEventListener('touchstart',(e)=>{
					y0 = e.touches[0].clientY;
})
document.addEventListener('touchmove',(e)=>{
    yStart= e.touches[0].clientY;
    yDiff = e.touches[0].clientY - y0;
    ySum =  e.touches[0].clientY + y0;
})
document.addEventListener('touchend',(e)=>{
    let indicatorNumber= document.querySelector('.indicator-number span');
    let actualPage = document.querySelector('.indicators ul li.active');
    let actualPageMob = document.querySelector('.indicators-mobile ul li.active');
    let links = document.querySelectorAll('.indicators ul li');
    let next = parseInt(actualPage.getAttribute('data-index'))+1;
    let prev = parseInt(actualPage.getAttribute('data-index'))-1;
     let imageActive = document.querySelector('.container .image.active');
     let images= document.querySelectorAll('.container .image');
     if(yStart == e.changedTouches[0].clientY){
     if(yStart + yDiff < yStart){ 
         if(next +1 > links.length){
           
           
         actualPage.classList.remove('active');
         actualPageMob.classList.remove('active');
         document.querySelectorAll('[data-index="0"]').forEach(el=>{
            el.classList.add('active');
            el;
         }); 
         imageActive.classList.remove('active');
         images[0].classList.add('active'); 
         indicatorNumber.innerHTML='01';
         } else{
            actualPageMob.classList.remove('active');
             actualPage.classList.remove('active');
             document.querySelectorAll('[data-index="'+next+'"]').forEach(el=>{
                el.classList.add('active');
                el;
             }); 
         imageActive.classList.remove('active');
         images[next].classList.add('active'); 
         indicatorNumber.innerHTML='0'+ String(next+1);
         }    
     }else{
         if(prev < 0){
            actualPageMob.classList.remove('active');
             actualPage.classList.remove('active');
             document.querySelectorAll('[data-index="'+(links.length-1)+'"]').forEach(el=>{
                el.classList.add('active');
                el;
             }); 
            
             imageActive.classList.remove('active');
             images[links.length-1].classList.add('active'); 
             
             indicatorNumber.innerHTML='0'+ String(links.length);
             } else{
                actualPageMob.classList.remove('active');
                 actualPage.classList.remove('active'); 
             document.querySelectorAll('[data-index="'+prev+'"]').forEach(el=>{
                el.classList.add('active');
                el;
             }); 
             imageActive.classList.remove('active');
             images[prev].classList.add('active'); 
             indicatorNumber.innerHTML='0'+ String(prev+1);
             }
     }}
     colorMap();
})
slider();
const appHeight = () => {
    const doc = document.documentElement
    doc.style.setProperty('--app-height', `${window.innerHeight}px`)
}
window.addEventListener('resize', appHeight)
appHeight()