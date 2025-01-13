export default function menuClassTogler(route) {
  document.querySelectorAll('.header__item-link').forEach((element) => {
    element.classList.remove('header__item-link--is-active');

    if (element.getAttribute('href') === route) {
      element.classList.add('header__item-link--is-active');
    }
  });
}

// Находит все ссылки меню (элементы с классом header__item-link).
// Для каждого элемента убирает класс активного элемента (header__item-link--is-active).
// Сравнивает href атрибут элемента с переданным маршрутом.
// Если href совпадает с маршрутом, добавляет класс активного элемента к нему, выделяя его.
