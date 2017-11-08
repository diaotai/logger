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
const { createTextInput, getTextValue, Warning } = require("./utils");
const { basicPost } = require("./fetch");

module.exports = class DetailsPage extends Page {
  constructor(properties) {
    super(Object.assign({ autoDispose: true }, properties));
    this.createUI();
    this.applyLayout();
  }
  set data(data) {
    this._data = data;
  }
  get data() {
    return this._data;
  }
  getLatestData(){
    return window.data;
  }
  createUI() {
    let { title, head, score, clas, type, stime } = this.data;
    let that =this;
    ui.find("#addAction").dispose();
    if (!clas) {
      clas = 0;
    }
    let detailsView = new Composite({ id: "detailsView" }).appendTo(this);
    let Ititle= createTextInput("title", title, detailsView);
    let Iscore= createTextInput("score", score, detailsView);
    let Itimes= createTextInput("times", stime, detailsView);
    let Ipicker = new Picker({
      id: "classs",
      //left: 20,
      top: "prev()",
      right: 20,
      itemCount: CLASS.length,
      itemText: index => CLASS[index],
      selectionIndex: clas
    }).appendTo(detailsView);
    let Itype= createTextInput("type", type, detailsView);
    new Button({
      id: "submit",
      left: "5%",
      width: "150",
      top: "prev()",
      text: "完成"
    })
      .on("select", ({ target }) => {
        let data;
        if (Object.keys(this.data).length!=0) {
          data = Object.assign(this.data, {
            title: Ititle.text,
            score: Iscore.text,
            stime:Itimes.text,
            type: Itype.text,
            clas: Ipicker.selectionIndex
          });
          window.data.push(data)
        //  console.log(window.data.length,"window.data.length details")
        } else {
        //  console.log("存储task",this.find("#title").text)
          data = {
            title: Ititle.text,
            score: Iscore.text,
            stime: Itimes.text,
            ftime: 0,
            type: Itype.text,
            clas: Ipicker.selectionIndex,
            status: 1,
            account: localStorage.getItem("account"),
            initTime: new Date().valueOf()
          };
          // console.log(data)
          window.data.push(data);
        }
        // basicPost("task/save", data, data => {
        //   if(data.result=="fail"){
        //     Warning(data.message)
        //   } else {
        //     console.log("存储成功");
        //     Warning(data.message)
           
        //   }
        // });
        that.dispose()
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
