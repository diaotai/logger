const { Action, Button, TextView, TextInput, ui, Tab } = require("tabris");
const DetailsPage = require("./taskDetailsPage");

module.exports = {
  createAction: (data, click) => {
    ui.find("#addAction").dispose();
    new Action({
      id: "addAction",
      title: "add",
      placementPriority: "normal",
      image: {
        src: "./images/book_1984.jpg",
        scale: 2
      }
    })
      .on("select", () => {
        click();
      })
      .appendTo(ui.find("NavigationView").first());
  },
  createTab: (title, to) => {
    let tab = new Tab({
      title: title // converted to upper-case on Android
      // height:20
    }).appendTo(to);
    return tab;
  },
  createButton: (title, to, select) => {
    let button = new Button({
      id: title,
      text: title,
      top: "prev() 10"
    })
      .on("select", () => {
        if (select) {
          select();
        }
      })
      .appendTo(to);
    return button;
  },
  Warning: message => {
    let warning = new TextView({
      top: 100,
      centerX: 0,
      markupEnabled: "strong",
      textColor: "red",
      text: `<big>${message}</big>`
    }).appendTo(ui.contentView);
    setTimeout(() => {
      warning.dispose();
    }, 1500);
  },
  createTextInput: (message, text, to) => {
    if (!text) {
      text = "";
    }
    let textInput = new TextInput({
      id: message,
      top: "prev() 10",
      left: "5%",
      right: "5%",
      message,
      text
    }).appendTo(to);
    return textInput;
  },
  getTextValue: id => {
    return ui.find(`#{id}`).text;
  }
};
