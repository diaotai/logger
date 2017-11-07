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

module.exports = class TasksList extends CollectionView {
  constructor(properties) {
    super(Object.assign({ id: "tasksList", cellHeight: 72 }, properties));
    this._tasks = this.data.filter(this.filter);
    this.on("select", ({ index }) => {
      let data = this.data[index];
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
        console.log(item.status, "!!!!", this._filter);
        return (
          (this._filter == "all" || STATUS[item.status] == this._filter) &&
          this._class == CLASS[item.clas]
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
    let { title, author, score, stime, ftime } = this.tasks[index];
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
