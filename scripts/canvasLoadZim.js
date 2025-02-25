var scaling = "fit";
var width = 1440;
var height = 800;
var color = "red";
var outerColor = black;

var path = "assets/";

var assets = [];

var eklenecekResimlerListesi = ["boyama.png"];

for (var i = 0; i < eklenecekResimlerListesi.length; i++) {
  assets.push("" + eklenecekResimlerListesi[i] + "");
}

// these pages get loaded without preloading
var later = [];

//var ilerleme = new ProgressBar({ barType: "rectangle" });

//var stage;
//var stageW;
//var stageH;

//var stage;
//var frame = new Frame(scaling, width, height, color, outerColor, assets, path,new Waiter());
var frame = new Frame({
  scaling: scaling,
  width: width,
  height: height,
  color: color,
  outerColor: outerColor,
  ready: ready,
  assets: assets,
  path: path,
  progress: new Waiter(),
});

function ready() {
  zog("ready from ZIM Frame");

  stage = frame.stage;
  //stageW = frame.width;
  //stageH = frame.height;

  //createjs.Ticker.timingMode = createjs.Ticker.RAF;
  //createjs.Ticker.addEventListener("tick", stage);

  sekiller();

  stage.update(); // this is needed to show any changes
} // end of ready
