//const {  TextView, Picker, Composite } = require("tabris");
const {
  Tab,
  TabFolder,
  Button,
  Canvas,
  CheckBox,
  Composite,
  Page,
  device,
  ui
} = require("tabris");
const TasksList = require("./taskList");
// Create a swipe enabled tab folder with 3 tabs
const Chart = require("chart.js");
const { createTab } = require("./utils");
const data = require("./data.json");

let tabFolder = new TabFolder({
  left: 0,
  top: 0,
  right: 0,
  bottom: 5,
  paging: true // enables swiping. To still be able to open the developer console in iOS, swipe from the bottom right.
});

let day = createTab("日统计", tabFolder);
let week = createTab("周统计", tabFolder);
let month = createTab("月统计", tabFolder);
let year = createTab("年统计", tabFolder);
// .on("resize", ({target: canvas, width, height}) => {
//     let ctx = canvas.getContext("2d", width, height);
//     ctx.fillRect(10, 10, 100, 100);
//     new Chart(ctx)["Line"](data, {
//         animation: true,
//         showScale: true,
//         showTooltips: false,
//         scaleShowLabels: true
//       });
// }).appendTo(day);

tabFolder.on("selectionChanged", ({ value: tab }) => console.log(tab.title));
createCanvas(data, day);
createCanvas(data, week);
createCanvas(data, month);
createCanvas(data, year);
function createCanvas(data, tab) {
  // console.log("12313213", data, tab);
  let canvas = new Canvas({
    left: 10,
    top: 10,
    right: 10,
    bottom: 10
  })
    .on("resize", ({ target, width, height }) => {
      let ctx = _createCanvasContext();
      ctx.scale(1 / window.devicePixelRatio, 1 / window.devicePixelRatio);
      //ctx.scale(scaleFactor, scaleFactor);
      ctx.fillRect(10, 10, 100, 100);
      new Chart(ctx)["Line"](data, {
        animation: true,
        showScale: true,
        showTooltips: false,
        scaleShowLabels: true
      });
    })
    .appendTo(tab);

  function _layoutCanvas({ width, height }) {
    tab.find(Canvas).set({ width, height: Math.min(width, height) });
  }
  function _createCanvasContext() {
    let scaleFactor = device.scaleFactor;
    let bounds = canvas.bounds;
    let width = bounds.width * scaleFactor;
    let height = bounds.height * scaleFactor;
    height = Math.min(width, height);
    return canvas.getContext("2d", width, height);
  }

  return canvas;
}

module.exports = tabFolder;
