const {
  CollectionView,
  Composite,
  ImageView,
  TextView,
  Page,
  ui
} = require("tabris");
const bill = require("./tasks");

class BillList extends CollectionView {
  constructor(properties) {
    super(Object.assign({ id: "billList", cellHeight: 72 }, properties));
    // this._tasks = tasks.filter(this.filter);
    this._bill = bill;
    this.on("select", ({ index }) => {
      let data = bill[index];
      data = Object.assign(data, {});
      new DetailsPage({ data }).appendTo(ui.find("NavigationView").first());
    });
    this.itemCount = this.bill.length;
  }

  get bill() {
    return this._bill;
  }

  createCell() {
    super.createCell();
    return new BillCell();
  }

  updateCell(view, index) {
    super.updateCell(view, index);
    let { title, author, score } = bill[index];
    Object.assign(view, { title, time: new Date(), score });
  }
}

class BillCell extends Composite {
  constructor(properties) {
    super(Object.assign({ highlightOnTouch: true }, properties));
    this._createUI();
    this._applyLayout();
    this._applyStyles();
  }

  set title(title) {
    this.find("#billtitleLabel").first().text = title;
  }

  get title() {
    return this.find("#billtitleLabel").first().text;
  }

  set time(time) {
    this.find("#billtimeLabel").first().text = time;
  }

  get time() {
    return this.find("#billtimeLabel").first().text;
  }

  set score(score) {
    this.find("#billscoreLabel").first().text = `<big>${score}</big>`;
  }

  get score() {
    return this.find("#billscoreLabel").first().text;
  }

  _createUI() {
    this.append(
      new TextView({ id: "billtitleLabel", markupEnabled: true }),
      new TextView({ id: "billtimeLabel" }),
      new TextView({ id: "billscoreLabel", markupEnabled: true })
    );
  }

  _applyLayout() {
    this.apply({
      "#billtitleLabel": { left: 54, right: 16, top: 16 },
      "#billtimeLabel": { left: 54, right: 16, top: "prev() 4" },
      "#billscoreLabel": { right: 36, top: 20 }
    });
  }

  _applyStyles() {
    this.apply({
      "#billtitleLabel": { textColor: "#4a4a4a" },
      "#billtimeLabel": { textColor: "#7b7b7b" },
      "#billscoreLabel": { textColor: "#37C6C0" }
    });
  }
}

module.exports = class BillPage extends Page {
  constructor(properties) {
    super(Object.assign({ autoDispose: true }, properties));
    this.createUI();
    this.applyLayout();
  }

  createUI() {
      //console.log(this,"adg")
    let composite2 = new Composite({
      left: 0,
      right: 0,
      top: 0,
      bottom:0,
     // background: "#333"
    }).appendTo(this);
    new BillList().appendTo(composite2);
  }

  applyLayout() {
     this.find("#billList").set({ left: 0, top: 0, right: 0, bottom: 0 });
  }
};
