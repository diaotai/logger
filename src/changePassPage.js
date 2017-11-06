const {
  Page,
  Tab,
  Button,
  TextInput,
  TabFolder,
  TextView,
  Composite,
  ui
} = require("tabris");
const { Warning } = require("./utils");
module.exports = class ChangePasswordPage extends Page {
  constructor(properties) {
    super(Object.assign({ autoDispose: false }, properties));
    this.createUI();
    this.applyLayout();
  }

  createUI() {
    let composite2 = new Composite({
      left: 50,
      right: 50,
      top: 130,
      background: "#f3f3f3"
    }).appendTo(this);
    let text12 = new TextInput({
      top: 10,
      left: "5%",
      right: "5%",
      message: "旧密码",
      focused: true
    }).appendTo(composite2);
    let text22 = new TextInput({
      top: "prev()",
      left: "5%",
      right: "5%",
      message: "新密码",
      type: "password"
    }).appendTo(composite2);
    let text23 = new TextInput({
      top: "prev()",
      left: "5%",
      right: "5%",
      message: "再次输入新密码",
      type: "password"
    }).appendTo(composite2);
    new Button({
      left: "5%",
      right: "5%",
      top: "prev()",
      text: "更改密码"
    })
      .on("select", ({ target }) => {
        Warning(text22.text !== text23.text, "两次输入不一致");
      })
      .appendTo(composite2);
  }

  applyLayout() {
    // this.find("#booksList").set({ left: 0, top: 0, right: 0, bottom: 0 });
  }
};
