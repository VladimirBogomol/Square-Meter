import * as view from './listingView.js';

export default function(state) {
  // Рендерим контейнер для карточек
  view.render();

  // Рендерим карточки
  state.results.forEach((item) => {
    view.renderCard(item, state.favourites.isFav(item.id));
  });

  // Добавляем прослушку событий для иконок "Добавить в избранное"
  addToFavsListener();

  state.emitter.subscribe("event:render-listing", () => {
    // Очищаем контейнер со старыми карточками
    view.clearListingContainer();
    // Рендерим новые карточки
    state.results.forEach((item) => {
      view.renderCard(item, state.favourites.isFav(item.id));
    });

    // Добавляем прослушку событий для иконок "Добавить в избранное"
    addToFavsListener();
  });

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
};