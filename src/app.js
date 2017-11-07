const {
  Action,
  NavigationView,
  ui,
  TabFolder,
  Tab,
  TextView
} = require("tabris");
const LoginPage = require("./login");

// Create a swipe enabled tab folder with 3 tabs

ui.drawer.enabled = true;
let navigationView = new NavigationView({
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  drawerActionVisible: true
}).appendTo(ui.contentView);
new LoginPage().appendTo(navigationView);

new TextView({
  centerX: 0,
  centerY: 0,
  text: "Hello world",
  id: "drawer"
}).appendTo(ui.drawer);
