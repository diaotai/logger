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
const MainPage = require("./main");
const { Warning } = require("./utils");
const { ADDRESS } = require("./const");
const { basicPost } = require("./fetch")
module.exports = class LoginPage extends Page {
  constructor(properties) {
    super(Object.assign({ autoDispose: false }, properties));
    this.createUI();
    this.applyLayout();
  }

  createUI() {
    let tabFolder = new TabFolder({
      left: 80,
      right: 80,
      bottom: 5,
      top: 100,
      paging: true // enables swiping. To still be able to open the developer console in iOS, swipe from the bottom right.
    }).appendTo(this);
    let navigationView = ui.find("NavigationView").first();

    tabFolder.on("selectionChanged", ({ value: tab }) =>
      console.log(tab.title)
    );
    let tab = new Tab({
      title: "登陆" // converted to upper-case on Android
    }).appendTo(tabFolder);
    let composite = new Composite({
      left: 0,
      right: 0,
      top: 30,
      background: "#f3f3f3"
    }).appendTo(tab);
    let account = new TextInput({
      top: 10,
      left: "5%",
      right: "5%",
      message: "账号",
      focused: true
    }).appendTo(composite);
    let password = new TextInput({
      top: "prev()",
      left: "5%",
      right: "5%",
      message: "密码",
      type: "password"
    }).appendTo(composite);
    new Button({
      left: "5%",
      right: "5%",
      top: "prev()",
      text: "登录"
    })
      .on("select", ({ target }) => {
        localStorage.setItem("account",account.text);
        console.log("SELECT",account.text,localStorage.getItem("account"));
        let data = { account: account.text, password: password.text };
        // data = JSON.stringify(data);
        // console.log(data);
        basicPost("login",data,(data)=>{
          if (data.result == "fail") {
            Warning(data.message);
          } else {
            window.tasks = data.data;
            navigationView.pages().dispose();
            window.data = data.data;
            new MainPage({data:window.data,score:data.score}).appendTo(navigationView);
          }
        })
      })
      .appendTo(composite);

    let tab2 = new Tab({
      title: "注册" // converted to upper-case on Android
    }).appendTo(tabFolder);
    let composite2 = new Composite({
      left: 0,
      right: 0,
      top: 30,
      background: "#f3f3f3"
    }).appendTo(tab2);
    let text12 = new TextInput({
      top: 10,
      left: "5%",
      right: "5%",
      message: "账号",
      focused: true
    }).appendTo(composite2);
    let text22 = new TextInput({
      top: "prev()",
      left: "5%",
      right: "5%",
      message: "密码",
      type: "password"
    }).appendTo(composite2);
    let text23 = new TextInput({
      top: "prev()",
      left: "5%",
      right: "5%",
      message: "再次输入密码",
      type: "password"
    }).appendTo(composite2);
    new Button({
      left: "5%",
      right: "5%",
      top: "prev()",
      text: "注册"
    })
      .on("select", ({ target }) => {
        let data = { account: text12.text, password: text22.text };
       // data = JSON.stringify(data);
        if (text22.text !== text23.text) {
          Warning("两次输入不一致");
        } else {
          basicPost("registered",data,(data)=>{
            if (data.result == "fail") {
              Warning(data.message);
            } else {
              Warning("已注册成功,请登陆");
            }
          })
        }
      })
      .appendTo(composite2);
  }

  applyLayout() {
    // this.find("#booksList").set({ left: 0, top: 0, right: 0, bottom: 0 });
  }
};
