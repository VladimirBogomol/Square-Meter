import FavouritesCards from './favouritesCardsModel.js';
import * as view from './favouritesCardsView.js';

export default async function(state) {
  // Получаем список элементов, находящихся в избранном
  const favsList = state.favourites.favs;

  // Получаем данные с сервера
  const favouritesCards = new FavouritesCards(favsList);
  await favouritesCards.getFavs();

  // Рендерим карточки на странице
  view.renderPage(favouritesCards.cards);

// Добавляем прослушку событий для иконок "Добавить в избранное"
addToFavsListener();

  // Функция для работы с иконками "Добавить в избранное"
  function addToFavsListener() {
    Array.from(document.getElementsByClassName("card__like")).forEach(
      (item) => {
        item.addEventListener("click", function (e) {
          e.preventDefault();

          // Находим ID объекта по которому совершен клик
          const currentId = e.target.closest(".card").dataset.id;

          // Добавляем/Убираем элемент из избранного
          state.favourites.toggleFav(currentId);

          // Включаем/Выключаем иконку избранного
          view.toggleFavouriteIcon(
            e.target.closest(".card__like"),
            state.favourites.isFav(currentId)
          );
        });
      }
    );
  }
}