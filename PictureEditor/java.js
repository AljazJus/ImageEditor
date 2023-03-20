///tp pa je res 100000% moja koda 

let imgData;
let back=[];
let naprej=[];

let image =  new Image();
image.src= 'LOOP.png';

let canvas = document.createElement("canvas");
let ctx= canvas.getContext('2d');
document.body.appendChild(canvas);
let slp=0;

let maxH=900;
let maxW=1100;

function select (izbran)
{   
    if(izbran!="Sobel2")
    {
        let a= new Uint8ClampedArray(imgData.data);
        //a.data.set(imgData.data);
        back.push(a);
    }
    
    
    let red=document.getElementById("SliderRed");
    red.value=50;
    let blue=document.getElementById("SliderBlue");
    blue.value=50;
    let green=document.getElementById("SliderGreen");
    green.value=50;
    let gama=document.getElementById("SliderGama");
    gama.value=50;


    let x=izbran;

    naprej=[];
    slp=0;

    if(izbran=='N')
    x=document.getElementById("SelectBarva").value;

    console.log(x);
    grey(x);

}

function grey(x)
{ 

    let boxB=[1,1,1,1,1,1,1,1,1,1/9];
    let boxEDGL=[0,-1,0,-1,4,-1,0,-1,0,1];
    let boxEDGL2=[-1,-1,0-1,-1,8,-1,-1,-1,-1,1];
    let boxEDGS1=[-1,0,1,-2,0,2,-1,0,1,1];
    let boxEDGS2=[1,2,1,0,0,0,-1,-2,-1,1];
    let boxG=[1,2,1,2,4,2,2,1,2,1/16];
    
    let imgWidth = image.width;
    let imgPixels = imgData.data;

    if(x=="blurbox")
    blur(imgData,boxB);
    else
    if(x=="blurgus")
    blur(imgData,boxG);
    else
    if(x=="Sobel")
    {
    blur(imgData,boxEDGS1);
        select("Sobel2")
    }
    else
    if(x=="Sobel2")
    {
    blur(imgData,boxEDGS2);
    }
    else
    if(x=="lap")
    blur(imgData,boxEDGL);
    else
    if(x=="lap2")
    blur(imgData,boxEDGL2);
    else
    if(x=="pix")
    pixelated(imgData);
    else
    if(x=="Default")
    {       
        defC(imgPixels);
    }
    else
    if(x=="inv")
    {       
        invC(imgPixels);
    }
    else
    if(x=="gray")
    {       
        greyC(imgPixels);
    }
    else
    if(x=="green")
    {
        greenC(imgPixels);
    }
    else
    if(x=="red")
    {
        redC(imgPixels);
    }
    else
    if(x=="blue")
    {
        blueC(imgPixels);
    }
    else
    if(x=="ch")
    {
        checkC(imgPixels,imgWidth);
    }
    else
    defC(imgPixels);

    ctx.putImageData(imgData, 0,0);
}

function change()
{
    const [h, w]=resize();
        
    image.width = w;
    image.height= h;
    canvas.width = image.width;
    canvas.height= image.height;    


ctx.drawImage(image, 0 , 0,image.width,image.height);
imgData = ctx.getImageData(0, 0, image.width, image.height);
}

image.onload = function() 
{   
    change();
        
}

function resize()
{
    
    let newImg= new Image();
    newImg.src=image.src;

    let wrh = newImg.width / newImg.height;

    let newWidth = maxW;
    let newHeight = newWidth / wrh;
    if (newHeight > maxH) {
        newHeight = maxH;
        newWidth = newHeight * wrh;
    }
    return [newHeight,newWidth];
}

function selectImg(kl)
{
    
    if(kl!=1)
    {
    image.src= kl+'.png';
    }
    
    back=[];
    naprej=[];
    slp=0;

    
    
    //start();


    let red=document.getElementById("SliderRed");
    red.value=50;
    let blue=document.getElementById("SliderBlue");
    blue.value=50;
    let green=document.getElementById("SliderGreen");
    green.value=50;
    let gama=document.getElementById("SliderGama");
    gama.value=50;

}


function slide()
{   
    naprej=[];
    if(slp==0)
    {
        let a= new Uint8ClampedArray(imgData.data);
        //a.data.set(imgData.data);
        back.push(a);
        slp=1;
    }
    else
    {
        let a= new Uint8ClampedArray(imgData.data);
        //a.data.set(imgData.data);
        imgData.data.set(back[back.length-1]);
        back.push(a);

    }
    
    let imgPixels=imgData.data

    red(document.getElementById("SliderRed").value,imgPixels);
    green(document.getElementById("SliderGreen").value,imgPixels);
    blue(document.getElementById("SliderBlue").value,imgPixels);
    gama(document.getElementById("SliderGama").value,imgPixels);

    ctx.putImageData(imgData, 0,0);
}

function Dowload()
{
    let link = document.createElement('a');
    link.download = 'download.png';
    link.href = canvas.toDataURL()
    link.click();
    link.delete;
}

function fileValidation() 
{ 
    let fileInput =  document.getElementById('file'); 
      
    let filePath = fileInput.value; 
  
    // Allowing file type 
    let allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i; 
      
    if (!allowedExtensions.exec(filePath))
     { 
        alert('Invalid file type'); 
        fileInput.value = ''; 
        return false; 
    }  
    else  
    { 
      
        // Image preview 
        if (fileInput.files && fileInput.files[0]) 
        { 
            let reader = new FileReader(); 
            reader.onload = function(e) { 
               image.src= e.target.result; 
               selectImg(1);
               /*
               let con=image.height/image.width;
               image.height=900;
               image.width=900*con;
               */
            }; 
              
            reader.readAsDataURL(fileInput.files[0]); 
        } 
    } 
} 

function defC(imgPixels)
{   
    if(back.length==0)
    return;
    imgData.data.set(back[0]);
}

function greenC(imgPixels)
{
    for(let y = 0; y < imgPixels.length; y+=4)
    { 
        imgPixels[y + 1] = 255;
    }
}

function invC(imgPixels)
{
    for(let y = 0; y < imgPixels.length; y+=4)
    { 
        imgPixels[y] = 255-imgPixels[y];
        imgPixels[y + 1] = 255-imgPixels[y+1];
        imgPixels[y + 2] = 255-imgPixels[y+2];
    }
}

function redC(imgPixels)
{
    for(let y = 0; y < imgPixels.length; y+=4)
    { 
        imgPixels[y] = 255;
    }
}

function blueC(imgPixels)
{
    for(let y = 0; y < imgPixels.length; y+=4)
    { 
        imgPixels[y +2] = 255;
    }
}

function checkC(imgPixels,imgWidth)
{
    for(let y = 0; y < imgPixels.length; y+=4)
    { 
        if(y>imgPixels.length/2)
            {
                if((y/4)%imgWidth<imgWidth/3)
                 {
                     let lightness = parseInt((imgPixels[y] + imgPixels[y + 1] + imgPixels[y + 2]) / 3);
                     imgPixels[y] = lightness;
                     imgPixels[y + 1] = lightness;
                     imgPixels[y + 2] = lightness;
                 }
                 else
                 if((y/4)%imgWidth<2*(imgWidth/3))
                 {
                    imgPixels[y] = 255-imgPixels[y];
                    imgPixels[y + 1] = 255-imgPixels[y+1];
                    imgPixels[y + 2] = 255-imgPixels[y+2];
                 }
            }
            else
            {
                if((y/4)%imgWidth<imgWidth/3)
                 {
                     imgPixels[y] = 255;
                 }
                 else
                 if((y/4)%imgWidth<2*(imgWidth/3))
                 {
                    imgPixels[y + 1] = 255;
                 }
                 else
                 {
                    imgPixels[y + 2] = 255;
                 }
            }
    }
}

function greyC(imgPixels)
{
    for(let y = 0; y < imgPixels.length; y+=4)
    { 
                   
        let lightness = parseInt(imgPixels[y] *0.299+imgPixels[y+1] *0.587+imgPixels[y+2] *0.114);
        imgPixels[y] = lightness;
        imgPixels[y + 1] = lightness;
        imgPixels[y + 2] = lightness;
    }
}

function pixelated(imgData)
{
    let imgPixels = imgData.data;
    let wid= imgData.width;
    let hei= imgData.height;

    let orData = ctx.getImageData(0, 0, wid, hei);
    let orPixels=orData.data;

    for(let i=0 ; i < wid; i++)
    {

        for(let j=0 ; j<hei ; j++)
        {
        // +0 =red 
        // +1 =green
        // +2 = blue
        // +3= prosojnost 
            if((j%10==0|| j==0)&&(i%10==0|| i==0))
            {
                let u=i*4+j*wid*4;
                for(k=0;k<10;k++)
                {
                    for(let l=0; l<10;l++)
                    {
                        let h=(i+l)*4+ (j+k) * wid*4-40;
                        imgPixels[h]=orPixels[u];
                        imgPixels[h+1]=orPixels[u+1];
                        imgPixels[h+2]=orPixels[u+2];
                        imgPixels[h+3]=orPixels[u+3];
                    }
                }
               
            }
            
        }
    }
}

function blur(imgData,box)
{
    let imagePixels= imgData.data;
    let imgPrevPixels = back[back.length-1];
    console.log(imagePixels);
    console.log(imgPrevPixels);

    let wid= imgData.width;
    let hei= imgData.height;
    
    for(let i=1;i<wid-1;i++)
    {
        for(let j=1; j<hei-1;j++)
        {

            for(let x=0; x<3;x++)
            {
                let avg=0;
                let h=0;

                for(k=0;k<3;k++)
                {
                    for(let l=0; l<3;l++)
                    {
                        let f=(i-1+l)*4+ (j-1+k) * wid*4;
                        avg+=box[h]*imgPrevPixels[f+x];

                        h++;
                    }
                }

                avg*=box[9];
                imagePixels[i*4+j*wid*4+x]=avg;

            }
        }
        
    }
}

function green(value,imgPixels)
{

    let pro=((50-value)*2)/100;
    if(pro!=0)
    {

    }

    for(let y = 0; y < imgPixels.length; y+=4){
        if(pro>0)
        imgPixels[y+1]=imgPixels[y+1]-(imgPixels[y+1]*pro);
        else
        imgPixels[y+1]=imgPixels[y+1]+((255-imgPixels[y+1])*(-1*pro));
        
    }
}

function red(value,imgPixels)
{
    let pro=((50-value)*2)/100;
    for(let y = 0; y < imgPixels.length; y+=4)
    {
        if(pro>0)
        imgPixels[y]=imgPixels[y]-(imgPixels[y]*pro);
        else
        imgPixels[y]=imgPixels[y]+((255-imgPixels[y])*(-1*pro));
        
        
    }
}

function blue(value,imgPixels)
{
    let pro=((50-value)*2)/100;

    for(let y = 0; y < imgPixels.length; y+=4){
        if(pro>0)
        imgPixels[y+2]=imgPixels[y+2]-(imgPixels[y+2]*pro);
        else
        imgPixels[y+2]=imgPixels[y+2]+((255-imgPixels[y+2])*(-1*pro));
    }
}

function gama(value,imgPixels)
{
    let pro=((50-value)*2)/100;
    if(pro<0)
    {
        pro=-1*pro;
        pro=9*pro+1;
    }
    else
    {
        pro=1-pro;
        pro=1*pro;
    }
    

    for(let y = 0; y < imgPixels.length; y+=4){
        
        imgPixels[y] = 255*Math.pow((imgPixels[y] / 255), pro);
        imgPixels[y+1] = 255*Math.pow((imgPixels[y+1] / 255), pro);
        imgPixels[y+2] = 255*Math.pow((imgPixels[y+2] / 255),pro);

    }
    
}

function Naprej()
{   
    if(naprej.length==0)
    return;
    let a= new Uint8ClampedArray(imgData.data);
    //a.data.set(imgData.data);
    back.push(a);

    console.log(naprej[naprej.length-1]);
    imgData.data.set(naprej[naprej.length-1]);
    ctx.putImageData(imgData, 0,0);

    naprej.pop();

}

function Back()
{

    if(back.length==0)
    return;
    slp=0;
    let red=document.getElementById("SliderRed");
    red.value=50;
    let blue=document.getElementById("SliderBlue");
    blue.value=50;
    let green=document.getElementById("SliderGreen");
    green.value=50;
    let gama=document.getElementById("SliderGama");
    gama.value=50;

    let a= new Uint8ClampedArray(imgData.data);
    //a.data.set(imgData.data);
    naprej.push(a);

    imgData.data.set(back[back.length-1]);
    ctx.putImageData(imgData, 0,0);
    
    back.pop();

}

function thresh()
{
    slp=0;

    let tresh= document.getElementById("SelectTresh").value;

    ctx.drawImage(image, 0 , 0,canvas.width,canvas.height);
    let imgWidth = canvas.width;
    let imgHeight = canvas.height;
    let imgData = ctx.getImageData(0, 0, imgWidth, imgHeight);
    let imgPixels = imgData.data;
    let person = prompt("vnesi vrednost 1-255", 10);
    
    for(let y = 0; y < imgPixels.length; y+=4)
    {
    
        if(tresh=="green")
        {
            if(person>imgPixels[y+1])
            {
                imgPixels[y] = 0;
                imgPixels[y + 1] = 0;
                imgPixels[y + 2] = 0;
            }
            else
            {
                imgPixels[y] = 255;
                imgPixels[y + 1] = 255;
                imgPixels[y + 2] = 255;
            }
        }
        else
        if(tresh=="red")
        {
            if(person>imgPixels[y])
            {
                imgPixels[y] = 0;
                imgPixels[y + 1] = 0;
                imgPixels[y + 2] = 0;
            }
            else
            {
                imgPixels[y] = 255;
                imgPixels[y + 1] = 255;
                imgPixels[y + 2] = 255;
            }
        }
        else
        if(tresh=="blue")
        {
            if(person>imgPixels[y+2])
            {
                imgPixels[y] = 0;
                imgPixels[y + 1] = 0;
                imgPixels[y + 2] = 0;
            }
            else
            {
                imgPixels[y] = 255;
                imgPixels[y + 1] = 255;
                imgPixels[y + 2] = 255;
            }
        }
        else
        if(tresh=="gray")
        {
            let lightness = parseInt(imgPixels[y] *0.299+imgPixels[y+1] *0.587+imgPixels[y+2] *0.114);
            if(person>lightness)
            {
                imgPixels[y] = 0;
                imgPixels[y + 1] = 0;
                imgPixels[y + 2] = 0;
            }
            else
            {
                imgPixels[y] = 255;
                imgPixels[y + 1] = 255;
                imgPixels[y + 2] = 255;
            }
        }
    }
    ctx.putImageData(imgData, 0,0);

}

function sprememba()
{
    //let bo=document.getElementsByTagName("body");
    maxW=window.innerWidth;
    maxH=window.innerHeight
    maxW=maxW-maxW*0.30;
    maxH=maxH-maxH*0.2;
    console.log(maxW);
    console.log(maxH);
    change();
}
