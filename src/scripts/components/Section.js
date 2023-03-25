// Берёт разметку и вставляет в DOM
export default class Section {
  constructor({renderer}, containerSelector) { // убрали items из аргументов и из конструктора
    // this._renderedItems = items;
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  };

  addItem(element) {
    this._container.prepend(element);
  };

  renderItems(items) { // items сюда будут приходить карточки с сервера
    items.reverse().forEach((item) => { // вместо начальных this._renderedItems поставили карточки с сервера - items
      this._renderer(item);
    });
  };
};
