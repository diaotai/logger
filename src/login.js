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
        console.log("SELECT")
        let data = {account:account.text,password:password.text};
        data = JSON.stringify(data);
        console.log(data)
        fetch('http://192.168.43.55:7080/hello/mark').then(res => {
          console.log(res)
         // return res.body;
          return res.json();
        }).then(data=>{
          console.log(data)
        }).catch(e=>{
          console.log("@@@@@",e)
        })
       
        // navigationView.pages().dispose();
        // new MainPage().appendTo(navigationView);
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
        Warning(text22.text !== text23.text, "两次输入不一致");
      })
      .appendTo(composite2);
  }
  // Warning(message) {
  //   let warning = new TextView({
  //     top: 50,
  //     centerX: 0,
  //     markupEnabled: "strong",
  //     textColor: "red",
  //     text: message
  //   }).appendTo(this);
  //   setTimeout(() => {
  //     warning.dispose();
  //   }, 3000);
  // }
  applyLayout() {
    // this.find("#booksList").set({ left: 0, top: 0, right: 0, bottom: 0 });
  }
};
