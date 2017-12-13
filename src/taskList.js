const {
  CollectionView,
  Composite,
  ImageView,
  TextView,
  CheckBox,
  AlertDialog,
  ui
} = require("tabris");
const DetailsPage = require("./taskDetailsPage");
const { STATUS, CLASS } = require("./const");
const { basicPost } = require("./fetch")

module.exports = class TasksList extends CollectionView {
  constructor(properties) {
    super(Object.assign({ id: "tasksList", cellHeight: 72 }, properties));
    this._tasks = window.data.filter(this.filter);
    this.on("select", ({ index }) => {
      console.log("index", index);
      let data = this.tasks[index];
      data = Object.assign(data, {});
      //  console.log(window.data.length,"length1");
      let details = new DetailsPage({ data }).appendTo(
        ui.find("NavigationView").first()
      );
      details.on("disappear", () => {
        console.log("disappearzzxn", this.tasks.length);
        this.reload();
      });
    });
    this.itemCount = this.tasks.length;
  }

  get tasks() {
    return this._tasks;
  }

  set tasks(tasks) {
    this._tasks = tasks;
  }

  get data() {
    return this._data;
  }

  set data(data) {
    this._data = data;
  }

  set clas(clas) {
    this._class = clas;
  }

  get clas() {
    return this._class;
  }

  set filter(filter) {
    this._filter = filter;
  }

  get filter() {
    if (this._filter) {
      return item => {
        return (
          (this._filter == "all" || STATUS[item.status] == this._filter) &&
          this._class == CLASS[item.clas]
        );
      };
    }
    return () => true;
  }

  reload() {
    this._tasks = window.data.filter(this.filter);
    // console.log(window.data.length,"window length")
    // console.log(this.tasks.length,"length!!!")
    super.load(this.tasks.length);
  }

  createCell() {
    super.createCell();
    return new TaskCell();
  }

  updateCell(view, index) {
    super.updateCell(view, index);
    //  console.log(index, "update");
    let { title, author, score, stime, ftime } = this.tasks[index];
    let time = `${ftime}/${stime}`;
    Object.assign(view, { title, author, score, time });
  }
};

class TaskCell extends Composite {
  constructor(properties) {
    super(Object.assign({ highlightOnTouch: true }, properties));
    this._createUI();
    this._applyLayout();
    this._applyStyles();
  }

  set title(title) {
    this.find("#titleLabel").first().text = title;
  }

  get title() {
    return this.find("#titleLabel").first().text;
  }

  set score(score) {
    this.find("#scoreLabel").first().text = `<big>+${score}</big>`;
  }

  get score() {
    return this.find("#scoreLabel")
      .first()
      .text.split('+')[1].split('<')[0];
  }

  set time(time) {
    this.find("#timeLabel").first().text = time;
  }

  get time() {
    return this.find("#timeLabel").first().text;
  }

  _createUI() {
    let time,
      check,
      that = this;
    this.append(
      (check = new CheckBox({ id: "checkTask" }).on("checkedChanged", event => {
        if (event.value) {
          addTime();
        }
      })),
      new TextView({ id: "titleLabel", markupEnabled: true }),
      (time = new TextView({ id: "timeLabel", text: "hello" })),
      new TextView({ id: "scoreLabel", markupEnabled: true })
    );
    function addTime() {
      console.log(time.text);
      let times = time.text.split("/");
      let ftime = times[0];
      if (ftime == times[1]) {
        return;
      }
      ftime = Number(ftime) + 1;
      for (let i in window.data) {
        if (window.data[i].title == that.title) {
          window.data[i].ftime++;
          window.score+=window.data[i].score;
          break;
        }
      }
      let data = {
        account:localStorage.getItem("account"),
        ftime,
        title:that.title,
        stime:times[1],
        score:window.score,
      }
      basicPost("/task/addFtime",data,data=>{
        setTimeout(() => {
          check.checked = false;
          time.text = `${ftime}/${times[1]}`;
          let theScore = ui.find("#theScore");
          for(let i=0;i<4;i++){
            console.log(theScore[i].text,"!!!!",that.score)
            theScore[i].text = Number(theScore[i].text)+Number(that.score);
          } 
        }, 1000);
        console.log(window.data);
      })

    }
  }

  _applyLayout() {
    this.apply({
      "#titleLabel": { left: 54, right: 16, top: 16 },
      //  "#authorLabel": { left: 56, right: 16, top:  "prev() 2" },
      "#scoreLabel": { right: 36, top: 20 },
      "#checkTask": { left: 16, centerY: 0 },
      "#timeLabel": { left: 56, right: 16, top: "prev() 2" }
    });
  }

  _applyStyles() {
    this.apply({
      "#checkTask": { tintColor: "#C7B3E5" },
      "#titleLabel": { textColor: "#4a4a4a" },
      "#timeLabel": { textColor: "#7b7b7b" },
      "#scoreLabel": { textColor: "#37C6C0" }
    });
  }
}
