const {
  Page,
  Button,
  TextInput,
  TextView,
  Composite,
  Action,
  Picker,
  AlertDialog,
  ui
} = require("tabris");

const { CLASS } = require("./const");
const { createTextInput } = require("./utils");

module.exports = class DetailsPage extends Page {
  constructor(properties) {
    super(Object.assign({ autoDispose: true }, properties));
    // this.data = properties;
    this.createUI();
    this.applyLayout();
    // this.on("dispose", () => {
    //   createAction();
    //   console.log("dispose");
    // });
  }
  set data(data) {
    this._data = data;
  }
  get data() {
    return this._data;
  }
  createUI() {
    let { title, head, score, classs, type, stime, handleClick } = this.data;
    ui.find("#addAction").dispose();
    if (!classs) {
      classs = "";
    }
    let detailsView = new Composite({ id: "detailsView" }).appendTo(this);
    createTextInput("title", title, detailsView);
    createTextInput("score", score, detailsView);
    createTextInput("times", stime, detailsView);
    let picker = new Picker({
      id: "classs",
      //left: 20,
      top: "prev()",
      right: 20,
      itemCount: CLASS.length,
      itemText: index => CLASS[index],
      selectionIndex: classs.indexOf(CLASS)
    }).appendTo(detailsView);
    createTextInput("type", type, detailsView);
    new Button({
      id: "submit",
      left: "5%",
      width: "150",
      top: "prev()",
      text: "完成"
    })
      .on("select", ({ target }) => {
        handleClick();
      })
      .appendTo(detailsView);
    new Button({
      id: "delete",
      right: "5%",
      width: "150",
      top: "prev()",
      text: "删除",
      background: "red"
    })
      .on("select", ({ target }) => {
        new AlertDialog({
          title: "Conflict while saving",
          message: "How do you want to resolve the conflict?",
          buttons: {
            ok: "Replace",
            cancel: "Discard",
            neutral: "Keep editing"
          }
        })
          .on({
            closeOk: () => this.dispose(),
            closeNeutral: () => console.log("Keep editing"),
            closeCancel: () => console.log("Discard"),
            close: ({ button }) => console.log("Dialog closed: " + button)
          })
          .open();
      })
      .appendTo(detailsView);
  }

  applyLayout() {
    this.find("#detailsView").set({
      top: 10,
      left: 10,
      right: 10,
      bottom: 0
    });
    this.find("#times").set({
      right: 160
    });
    this.find("#classs").set({
      width: 100,
      top: ["#score", "10"]
    });
    this.find("#delete").set({
      top: ["#type", "0"]
    });
  }
};
