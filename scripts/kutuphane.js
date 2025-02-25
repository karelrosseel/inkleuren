var image = new Image();
image.src = "assets/test.png";
image.crossOrigin = "Anonymous";

class resimExdent extends Container {
  constructor() {
    super();

    var resimHit = new Shape();
    resimHit.graphics.beginFill("red").rect(0, 0, 100, 100);

    this.genelCont = new Container();
    this.genelCont.addTo(this);
    //this.genelCont.pos(0,0)

    //this.resim=new Bitmap(image)
    this.resim = new frame.asset("test.png").clone(); /////

    this.resim.x = 0;
    this.resim.y = 0;

    this.text = new Label({
      text: "Yeni Ekle",
      size: 30,
      font: "Arial",
      color: "black",
      rollColor: "grey",
      bold: false,
      italic: false,
    });

    this.text.x = this.resim.width / 2 - this.text.width / 2;
    this.text.y = this.resim.height / 2 - this.text.height / 2;

    this.resim.addTo(this.genelCont);
    this.text.addTo(this.genelCont);
    this.drag({ currentTarget: true });
    this.genelCont.transform({
      visible: false,
    });

    this.genelCont.on("click", function () {
      denemeFun();
    });
  }
}
