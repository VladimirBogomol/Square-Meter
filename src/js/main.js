import bidsPage from "./pages/bidsPage.js";
import errorPage from "./pages/errorPage.js";
import favoritesPage from "./pages/favoritesPage.js";
import homePage from "./pages/homePage.js";
import singleItemPage from "./pages/singleItemPage.js";
import eventEmitter from "./utils/eventEmitter.js";
import Favourites from './favourites/favouritesModel.js';

const state = {
  results: [],
  emitter: new eventEmitter(),
  favourites: new Favourites(),
};

// Добавляем state в глобальный объект window.
// После тестов удалить!!!
window.state = state;

// Маршруты
const routes = [
  { path: "/", component: homePage },
  { path: "item", component: singleItemPage },
  { path: "favourites", component: favoritesPage },
  { path: "bids", component: bidsPage },
];


function findComponentByPath(path, routes) {
  return routes.find(function (route) {
    return route.path === path;
  });
}

// Функция Роутер
function router() {
  // Split path to array
  const pathArray = location.hash.split("/");

  // Set current path
  let currentPath = pathArray[0] === "" ? "/" : pathArray[1];
  currentPath = currentPath === "" ? "/" : currentPath;

  // Set route params
 state.routeParams = pathArray[2] ? pathArray[2] : '';

  // Выбираем компонент для указанного адреса, либо компонент с ошибкой
  const { component = errorPage } =
    findComponentByPath(currentPath, routes) || {};

  component(state);
}

// Прослушка событий и запуск роутера
window.addEventListener("load", router);
window.addEventListener("hashchange", router);
