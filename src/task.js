const { Tab, TabFolder, TextView, Picker, Composite } = require("tabris");

// Create a swipe enabled tab folder with 3 tabs

const { STATUS, ADDRESS } = require("./const");
const TasksList = require("./taskList");

let tabFolder = new TabFolder({
  left: 0,
  top: 0,
  right: 0,
  bottom: 5,
  paging: true // enables swiping. To still be able to open the developer console in iOS, swipe from the bottom right.
});

let day = createTab("每日任务");
let week = createTab("每周任务");
let normal = createTab("普通任务");
let stage = createTab("阶段任务");

// window.tasks = tasks;
// console.log(tasks);

let dayContent = createTask({ title: "每日任务" }, day);

let weekContent = createTask({ title: "每周任务" }, week);

let normalContent = createTask({ title: "普通任务" }, normal);

let stageContent = createTask({ title: "阶段任务" }, stage);

tabFolder.on("selectionChanged", ({ value: tab }) => console.log(tab.title));



function createTab(title) {
  let tab = new Tab({
    title: title // converted to upper-case on Android
  }).appendTo(tabFolder);
  new TextView({
    centerX: 0,
    centerY: 0,
    text: "Content of Tab " + title
  }).appendTo(tab);
  return tab;
}

function createTask(data, tab) {
  let composite = new Composite({
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: "#f3f3f3"
  });
  new TextView({
    centerX: 0,
    top: 10,
    text: "当前标签 :" + data.title,
    background: "#C7B3E5"
  }).appendTo(composite);
  new TasksList({
    id: "tasksList",
  //  data: window.data,
    filter:  data.filter||"all",
    classs: data.title
  }).appendTo(composite);
  composite
    .find("#tasksList")
    .set({ left: 0, top: "prev() 5", right: 0, bottom: 40 });
  new TextView({
    id: "score",
    left: 20,
    right: 300,
    //  top: "prev() 15",
    bottom: 10,
    text: "9324"
    //background: "#C7B3E5"
  }).appendTo(composite);
  let statusPicker = new Picker({
    right: 20,
    width: 100,
    bottom: 10,
    itemCount: STATUS.length,
    itemText: index => STATUS[index].status,
    selectionIndex: data.selected || 0
  }).appendTo(composite);
  statusPicker.on("select", ({ index }) => {
    console.log("我被执行");
    let selectionIndex = statusPicker.selectionIndex;
    // composite.dispose();
    data = Object.assign({}, data, {
      selected: index,
      filter: STATUS[selectionIndex].status
    });
    console.log(data);
    createTask(data, tab);
  });
  composite.appendTo(tab);
  return composite;
}
module.exports = tabFolder;
