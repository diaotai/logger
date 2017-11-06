const {
  Tab,
  TabFolder,
  TextView,
  Button,
  Picker,
  Composite,
  ui
} = require("tabris");
const TasksList = require("./taskList");
const { createButton } = require("./utils");
// Create a swipe enabled tab folder with 3 tabs

let composite = new Composite({
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  background: "#f3f3f3"
});
new TextView({
  left: 50,
  top: 25,
  text: "账号"
}).appendTo(composite);
createButton("save", composite);
createButton("signOut", composite);
createButton("changePassword", composite, () => {
  const ChangePasswordPage = require("./changePassPage");
  //const MainPage = require("./main");
  let navigationView = ui.find("NavigationView").first();
  navigationView.append(new ChangePasswordPage());
 // new MainPage().appendTo(navigationView);
});
applyLayout = () => {
  composite.find("#save").set({
    top: 10,
    right: 50,
    width: 150
  });
  composite.find("#signOut").set({
    left: 50,
    right: 50,
    width: 150
  });
  composite.find("#changePassword").set({
    left: 50,
    right: 50,
    width: 150
  });
};
applyLayout();
module.exports = composite;
