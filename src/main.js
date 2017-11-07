const {
  Page,
  Tab,
  Button,
  TextInput,
  TabFolder,
  TextView,
  Composite,
  Action,
  ui
} = require("tabris");
const TaskList = require("./taskList");
const Task = require("./task");
const Statistics = require("./statistics");
const Account = require("./account");
const BillPage = require("./billPage");

const { createAction } = require("./utils");

module.exports = class MainPage extends Page {
  constructor(properties) {
    super(Object.assign({ autoDispose: false }, properties));
    this.createUI();
    this.applyLayout();
    this.pos = "任务"
    this.on("appear", () => {
      if(this.pos=="任务"){
        createAction(null, () => {
          let data = {};
          const DetailsPage = require("./taskDetailsPage");
          new DetailsPage({ data }).appendTo(ui.find("NavigationView").first());
          console.log("Action");
        });
      } else if(this.pos=="统计"){
        createAction(null, () => {
          let data = {};
       
          new BillPage().appendTo(ui.find("NavigationView").first());
          console.log("Action");
          ui.find("#addAction").dispose();
        });
      }
    });
  }
 
  createUI() {
    let tabFolder = new TabFolder({
      id:"position",
      left: 0,
      right: 0,
      bottom: 5,
      tabBarLocation: "bottom",
      top: 0,
      paging: true // enables swiping. To still be able to open the developer console in iOS, swipe from the bottom right.
    }).appendTo(this);
    //  createAction();
    let taskTab = createTab("任务");
    Task.appendTo(taskTab);
    let statisticsTab = createTab("统计");
    Statistics.appendTo(statisticsTab);
    let about = createTab("我");
    Account.appendTo(about);
    tabFolder.on("selectionChanged", ({ value: tab }) => {
      console.log(tabFolder.selection.title,localStorage.getItem("account"))
      if (tab.title == "任务") {
        this.pos="任务"
        createAction(null, () => {
          let data = {};
          const DetailsPage = require("./taskDetailsPage");
          new DetailsPage({ data }).appendTo(ui.find("NavigationView").first());
          console.log("Action");
        });
      } else if (tab.title == "统计") {
        this.pos="统计"        
        createAction(null, () => {
          let data = {};
     //     const BillPage = require("./billPage");
          new BillPage().appendTo(ui.find("NavigationView").first());
          console.log("Action");
          ui.find("#addAction").dispose();
        });
      }
    });

    function createTab(title) {
      let tab = new Tab({
        title: title // converted to upper-case on Android
        // height:20
      }).appendTo(tabFolder);
      return tab;
    }
  }

  applyLayout() {
    this.find("#tasksList").set({
      left: 0,
      top: "prev() 5",
      right: 0,
      bottom: 40
    });
  }
};
