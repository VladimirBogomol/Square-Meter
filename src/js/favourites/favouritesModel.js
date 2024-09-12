export default class Favourites {
  constructor() {
    this.favs = [];

    // Работа с localStorage. Получаем элементы из localStorage
    this.readStorage();
  }

  addFav(id) {
    this.favs.push(id);
    // Добавляем элемент в localStorage
    this.saveData();
  };

  removeFav(id) {
    const index = this.favs.indexOf(id);
    this.favs.splice(index, 1);
    // Удаляем элемент из localStorage
     this.saveData();
  };

  isFav(id) {
    return this.favs.indexOf(id) !== -1 ? true : false;
  }

  toggleFav(id) {
    this.isFav(id) ? this.removeFav(id) : this.addFav(id); 
  }

  saveData() {
    localStorage.setItem('favs', JSON.stringify(this.favs));
  }

  readStorage() {
    const storage = JSON.parse(localStorage.getItem('favs'));
    if (storage) this.favs = storage;
  }
};