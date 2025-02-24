

function sekiller(){
    
    class ButtonExdent extends Container {
          
      constructor(options={}) {
          
      super();

      this.genişlik=options.width||200;
      this.yükseklik=options.height||50
      this.metinText=options.metinText||""



      this.buton=new Rectangle(180,70,white,black,1,5)


      this.yazı=new Label(this.metinText, 35, "Arial", "black");
      this.yaziyiOrtala=function(){
          
          this.yazı.x=this.buton.width/2-this.yazı.width/2
          this.yazı.y=this.buton.height/2-this.yazı.height/2
      }

      this.yaziyiOrtala()

      this.addChild(this.buton,this.yazı)

      }
  }
  



    function rgbaToHex(rgba) {
        var matches = rgba.replace(/\s/g, "").match(/^rgba?\(([\d,\.]+)\)/i);
        if (!matches || matches.length < 2) {
          return 0;
        }
        var splits = matches[1].split(",");
        if (splits.length < 4) {
          return 0;
        }
        var colors = [];
        for (var i = 0, l = 4; i < l; i++) {
          var c;
          if (i !== 3) {
            c = parseInt(splits[i]);
            if (isNaN(c)) {
              return 0;
            }
          } else {
            c = parseFloat(splits[i]);
            if (isNaN(c)) {
              return 0;
            }
            c = Math.round(c * 255);
          }
          colors[i] = Math.min(c, 255);
        }
        return ((colors[3] << 24) | (colors[0] << 16) | (colors[1] << 8) | colors[2]) >>> 0;
      }
      
      console.log(rgbaToHex("rgba(244, 79, 66, 1)").toString(16)); // ffff0000


      const loader = new Loader({
        frame:frame,
        label:"Resim Yükle",
        width:200,
        height:70,
        corner:10
     }).pos(10,250);
     loader.on("loaded", e=>{
        loop(e.bitmaps, bitmap=>{

           //bitmap.centerReg().drag();
           resmiBitmapaDonustur(bitmap,true)
        });
        //loader.removeFrom();
        S.update();
     });
     
     // and to later save for instance in a button event:


    const stepperResimSirasi = new Stepper({width:90,min:1,max:eklenecekResimlerListesi.length}).pos(10,350).change(()=>{
      zog(stepperResimSirasi.selectedIndex);
      zog(stepperResimSirasi.currentValue);

      resmiBitmapaDonustur(new asset(eklenecekResimlerListesi[stepperResimSirasi.selectedIndex]),false)
      

   });

   stepperResimSirasi.sca(.7)

    var resimBoyanan
    var resimCont;
    var resimBitmapData;
    var bitmapResimOgesi;
    var renkRGB="255, 35, 35"
    var bitmapDataCont=new Container()
    stage.addChild(bitmapDataCont)

    var tempDegerler={

      tempResimDeger:"",
      tempYuklemeBooleanDeger:false

    }

    function resmiBitmapaDonustur(resimDeger,yuklemeyleBooleanDeger){

        while(bitmapDataCont.numChildren>0){

            bitmapDataCont.removeChildAt(0)
        }

        if(yuklemeyleBooleanDeger==false){

            resimBoyanan=resimDeger
        }else{

            resimBoyanan=resimDeger
        }
        
        tempDegerler.tempResimDeger=resimDeger
        tempDegerler.tempYuklemeBooleanDeger=yuklemeyleBooleanDeger

        //resimBoyanan=new asset("testResim.png")
        //resimBoyanan=new asset("boyama.png")
        resimCont = new Container();
        bitmapDataCont.addChild(resimCont);
        //resimBoyanan.sca(.7)



        resimBoyanan.width=820
        resimBoyanan.height=580

        if(resimBoyanan.width>820){

            resimBoyanan.width=820

            //resimBoyanan.height=580

        }

        



        // if(resimBoyanan.width>=820){

        //     resimBoyanan.width=820
        // }else{

        //     resimBoyanan.width=resimBoyanan.width
        // }
        

        var resimKenarlik=new Rectangle(resimBoyanan.width,resimBoyanan.height,"rgba(0,0,0,.01)","#000000",1)

        resimCont.addChild(resimBoyanan,resimKenarlik)
        resimCont.cache(0, 0, 1440, 800);
        resimCont.x=250
        resimCont.y=250
    
        resimBitmapData = new createjs.BitmapData(resimCont.cacheCanvas);
        bitmapResimOgesi = new createjs.Bitmap(resimBitmapData.canvas);

        bitmapDataCont.removeChild(resimCont);
        bitmapDataCont.addChild(bitmapResimOgesi);
    
        bitmapResimOgesi.x=1440/2-resimBoyanan.width/2-50
        bitmapResimOgesi.y=800/2-resimBoyanan.height/2
        stage.update();

        bitmapResimOgesi.addEventListener("mousedown", resimParcalarinaDokunuldu);

    }

   
    resmiBitmapaDonustur(new asset("boyama.png"),false)

    var temizleButon=new ButtonExdent({width:180,height:60,metinText:"Temizle"})
    new createjs.ButtonHelper(temizleButon)
    temizleButon.pos(10,130)
    stage.addChild(temizleButon)

    temizleButon.on("click",resmiTemizleFun)

    function resmiTemizleFun(){

      resmiBitmapaDonustur(tempDegerler.tempResimDeger,tempDegerler.tempYuklemeBooleanDeger)

    }



    function resimParcalarinaDokunuldu(e) {


        var pt = e.target.globalToLocal(stage.mouseX, stage.mouseY);
        resimBitmapData.floodFill(pt.x, pt.y, rgbaToHex("rgba("+renkRGB+", 1)"));
        
        stage.update();
    }
    
    

    var saveButton=new asset("indirPNG.png")
    new createjs.ButtonHelper(saveButton)
    saveButton.pos(10,450)
    stage.addChild(saveButton)

     saveButton.on("click",function(){

        loader.save({content:bitmapDataCont,filename :"resim",quality:1,x:bitmapResimOgesi.x,y:bitmapResimOgesi.y,width:resimBoyanan.width,height:resimBoyanan.height}); 
     })
    ////////////////////////// Renkler //////////////////////////////

    const colorPicker = new ColorPicker({
        width:350,
        cols:50,
        alphaPicker:false,
        //buttonBar:false
    
    }).pos(10, 10, RIGHT, BOTTOM)


   // .show() // use show() and hide() with ColorPicker. As of ZIM ZIM 01 can also use pos(), loc(), center(), etc.
    .change(()=>{
       zog(colorPicker.selectedColor); // #ffcc99, etc. after pressing OK
       zog(colorPicker.selectedAlpha); // 0-1

       if(colorPicker.selectedColor=="#000000"){

            colorPicker.selectedColor="#0e0e0e"
       }
       
       renkRGB=""+hexToRgb(colorPicker.selectedColor).r+","+hexToRgb(colorPicker.selectedColor).g+","+hexToRgb(colorPicker.selectedColor).b+""
       

       function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        } : null;
      }

      rectGenel.color=colorPicker.selectedColor
      

    });

    var renklerCont=new Container()
    stage.addChild(renklerCont)
    var defaultRenkListesi=["#FF2323","#FFC300","#E9FF30","#E9F86C","#49E144","#6FFF30","#2980B9","#7ccfff","#FA3BE9","#3BFAE9","#D35400","#E59866","#0e0e0e","#FFFFFF"]
    var renkKutulariListesi=[]

    var rectGenel;
    function defaultRenkKutulariniEkle(){

        for(var i=0; i<defaultRenkListesi.length; i++){

            rect=new Rectangle(60,60,defaultRenkListesi[i],black)
            rect.x=(i%2)*rect.width+1440-rect.width*2-50
            rect.y=Math.floor(i/2)*rect.height+120
            renklerCont.addChild(rect)
            new createjs.ButtonHelper(rect)
            renkKutulariListesi.push(rect)
            renkKutulariListesi[i].addEventListener("mousedown",renkKutularinaDokunuldu)
        }


        rectGenel=new Rectangle(120,60,"#FF2323",black)
        rectGenel.x=1270
        rectGenel.y=540
        renklerCont.addChild(rectGenel)
        rectGenel.on("click",function(){

            colorPicker.show().pos(10, 10, RIGHT, BOTTOM)
        })
    }

    defaultRenkKutulariniEkle()

    function renkKutularinaDokunuldu(e){

        var currentKutu=e.currentTarget

        if(currentKutu.color=="#000000"){

            currentKutu.color="#0e0e0e"
       }
       
       renkRGB=""+hexToRgb(currentKutu.color).r+","+hexToRgb(currentKutu.color).g+","+hexToRgb(currentKutu.color).b+""
       
       rectGenel.color=currentKutu.color

       function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        } : null;
      }

    }
}


