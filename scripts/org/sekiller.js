function sekiller() {
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

  var paintImage; // A reference to the loaded png asset
  var paintContainer;
  var myBitmapData;
  var bitmapImageObject;
  var CurrentColorRGB = "255, 35, 35";
  var bitmapDataContainer = new Container();
  stage.addChild(bitmapDataContainer);

  function changeImageToBitmap(usedAsset) {
    while (bitmapDataContainer.numChildren > 0) {
      bitmapDataContainer.removeChildAt(0);
    }

    paintImage = usedAsset;

    paintContainer = new Container();
    bitmapDataContainer.addChild(paintContainer);

    paintImage.width = 820;
    paintImage.height = 580;

    if (paintImage.width > 820) {
      paintImage.width = 820;
    }

    paintContainer.addChild(paintImage);
    paintContainer.cache(0, 0, 1440, 800);
    paintContainer.x = 250;
    paintContainer.y = 250;

    myBitmapData = new createjs.BitmapData(paintContainer.cacheCanvas);
    bitmapImageObject = new createjs.Bitmap(myBitmapData.canvas);

    bitmapDataContainer.removeChild(paintContainer);
    bitmapDataContainer.addChild(bitmapImageObject);

    bitmapImageObject.x = 1440 / 2 - paintImage.width / 2 - 50;
    bitmapImageObject.y = 800 / 2 - paintImage.height / 2;
    stage.update();

    bitmapImageObject.addEventListener("mousedown", fillAtPoint);
  }

  changeImageToBitmap(new asset("boyama.png"));

  function fillAtPoint(e) {
    var pt = e.target.globalToLocal(stage.mouseX, stage.mouseY);
    myBitmapData.floodFill(pt.x, pt.y, rgbaToHex("rgba(" + CurrentColorRGB + ", 1)"));
    myBitmapData.floodFill(2, 2, rgbaToHex("rgba(255,255,0, 1)"));
    zog("kleuren op (" + pt.x + "," + pt.y + ")");
    stage.update();
  }

  var colorContainer = new Container();
  stage.addChild(colorContainer);
  var defaultColors = ["#FF2323", "#FFC300", "#E9FF30", "#E9F86C", "#49E144", "#6FFF30", "#2980B9", "#7ccfff", "#FA3BE9", "#3BFAE9", "#D35400", "#E59866", "#0e0e0e", "#FFFFFF"];
  var colorSelectRectangles = [];

  var selectedColorRectangle;
  function showColorSelections() {
    for (var i = 0; i < defaultColors.length; i++) {
      rect = new Rectangle(60, 60, defaultColors[i], black);
      rect.x = (i % 2) * rect.width + 1440 - rect.width * 2 - 50;
      rect.y = Math.floor(i / 2) * rect.height + 120;
      colorContainer.addChild(rect);
      new createjs.ButtonHelper(rect);
      colorSelectRectangles.push(rect);
      colorSelectRectangles[i].addEventListener("mousedown", selectColor);
    }

    selectedColorRectangle = new Rectangle(120, 60, "#FF2323", black);
    selectedColorRectangle.x = 1270;
    selectedColorRectangle.y = 540;
    colorContainer.addChild(selectedColorRectangle);
  }

  showColorSelections();

  function selectColor(e) {
    var currentColorbox = e.currentTarget;
    zog("Color selected " + currentColorbox.color);
    if (currentColorbox.color == "#000000") {
      currentColorbox.color = "#0e0e0e";
    }
    CurrentColorRGB = "" + hexToRgb(currentColorbox.color).r + "," + hexToRgb(currentColorbox.color).g + "," + hexToRgb(currentColorbox.color).b + "";
    selectedColorRectangle.color = currentColorbox.color;

    function hexToRgb(hex) {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : null;
    }
  }
}
