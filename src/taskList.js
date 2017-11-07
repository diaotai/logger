const {
  CollectionView,
  Composite,
  ImageView,
  TextView,
  CheckBox,
  AlertDialog,
  ui
} = require("tabris");
// let tasks=require("./tasks") ;
const { CLASS, STATUS, ADDRESS } = require("./const");
let tasks=[];
if (window.tasks) {
  tasks = window.tasks;
  console.log("我被执行");
} else {
  let account = localStorage.getItem("account");
  // fetch(`${ADDRESS}tasks/${account}`)
  //   .then(res => {
  //     return res.json();
  //   })
  //   .then(data => {
  //     if (data.result == "fail") {
  //       Warning(data.message);
  //     } else {
  //       // console.log(data,"))))))")
  //       window.data = data.data;
  //       tasks = window.tasks;
  //       console.log(window.data,"windows!!!");
  //     }
  //   })
  //   .catch(e => {
  //     console.log("@@@@@", e);
  //   });
  tasks = require("./tasks")
  console.log("被执行")
}


const DetailsPage = require("./taskDetailsPage");


module.exports = class TasksList extends CollectionView {
  constructor(properties) {
    super(Object.assign({ id: "tasksList", cellHeight: 72 }, properties));
    this._tasks = tasks.filter(this.filter);
    this.on("select", ({ index }) => {
      let data = tasks[index];
      data = Object.assign(data, {});
      new DetailsPage({ data }).appendTo(ui.find("NavigationView").first());
    });
    this.itemCount = this.tasks.length;
  }

  get tasks() {
    return this._tasks;
  }

  set tasks(tasks) {
    this._tasks = tasks;
  }

  set classs(classs) {
    this._class = classs;
  }

  get classs() {
    return this._class;
  }

  set filter(filter) {
    this._filter = filter;
  }

  get filter() {
    if (this._filter) {
      return item => {
        // console.log(this._class == item.classs, "!!!!", this._class);
        return (
          (this._filter == "all" || item.status == this._filter) &&
          this._class == item.classs
        );
      };
    }
    return () => true;
  }

  createCell() {
    super.createCell();
    return new TaskCell();
  }

  updateCell(view, index) {
    super.updateCell(view, index);
    let { title, author, score } = tasks[index];
    Object.assign(view, { title, author, score });
  }
};

class TaskCell extends Composite {
  constructor(properties) {
    super(Object.assign({ highlightOnTouch: true }, properties));
    this._createUI();
    this._applyLayout();
    this._applyStyles();
    this.on("longpress ", ({ index }) => console.log("adfadg"));
  }

  set title(title) {
    this.find("#titleLabel").first().text = title;
  }

  get title() {
    return this.find("#titleLabel").first().text;
  }

  set author(author) {
    this.find("#authorLabel").first().text = author;
  }

  get author() {
    return this.find("#authorLabel").first().text;
  }

  set score(score) {
    this.find("#scoreLabel").first().text = `<big>${score}</big>`;
  }

  get score() {
    return this.find("#scoreLabel").first().text;
  }

  _createUI() {
    this.append(
      new CheckBox({ id: "checkTask" }).on("checkedChanged", event =>
        console.log(event.value)
      ),
      new TextView({ id: "titleLabel", markupEnabled: true }),
      new TextView({ id: "authorLabel" }),
      new TextView({ id: "scoreLabel", markupEnabled: true })
    );
  }

  _applyLayout() {
    this.apply({
      "#titleLabel": { left: 54, right: 16, top: 16 },
      "#authorLabel": { left: 54, right: 16, top: "prev() 4" },
      "#scoreLabel": { right: 36, top: 20 },
      "#checkTask": { left: 16, centerY: 0 }
    });
  }

  _applyStyles() {
    this.apply({
      "#checkTask": { tintColor: "#C7B3E5" },
      "#titleLabel": { textColor: "#4a4a4a" },
      "#authorLabel": { textColor: "#7b7b7b" },
      "#scoreLabel": { textColor: "#37C6C0" }
    });
  }
}
