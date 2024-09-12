import SingleItem from './singleItemModel.js';
import * as view from './singleItemView.js'

export default async function(state) {

    state.singleItem = new SingleItem(state.routeParams);
    
    await state.singleItem.getItem();

    // Рендерим отдельную карточку
    view.render(state.singleItem.result, state.favourites.isFav(state.singleItem.id));

    // Открытие модального окна
    document.querySelector(".button-order").addEventListener('click', function() {
        view.showModal();
    });

    // Закрытие модального окна - клик по кнопке
    document.querySelector(".modal__close").addEventListener('click', function() {
        view.hideModal();
    });

    // Закрытие модального окна - клик по оверлею
    document.querySelector(".modal-wrapper").addEventListener('click', function(e) {
        if (e.target.closest('.modal')) {
            return null
        }else {
            view.hideModal();
        }
        console.log('click');
    });

    // Отправка формы
    document.querySelector(".modal__form").addEventListener('submit', async function(e) {
        e.preventDefault();
        const formData = view.getInput();
        await state.singleItem.submitForm(formData);

        const response = state.singleItem.response;

        if (response.message === "Bid Created") {
          alert("Ваша заявка успешно отправлена!");
          view.hideModal();
          view.clearInput();
        } else if (response.message === "Bid Not Created") {
            response.errors.forEach((error) => {
                alert(error);
            });
        }
    });

    // Клик по кнопке "Добавить в Избранное"
    document.querySelector(".button-favourite").addEventListener('click', function() {
    state.favourites.toggleFav(state.singleItem.id);
    view.toggleFavouriteBtn(state.favourites.isFav(state.singleItem.id));
    });

}