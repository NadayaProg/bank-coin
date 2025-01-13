/* eslint-disable import/no-extraneous-dependencies */
import Choices from 'choices.js';
import '../../../node_modules/choices.js/src/styles/choices.scss';
import { getKnownCurrwncies } from '../api/api';

export default async function choicesSelect() { // создания настраиваемых select-компонентов, а также загружает данные о валютах с сервера
  const elementFrom = document.querySelector('.currency__exchange-form-selectors-from');
  const choicesFrom = new Choices((elementFrom), {
    allowHTML: false, // Запрещает HTML в опциях select
    searchEnabled: false, // Отключает поиск в select
    shouldSort: false, // Отключает сортировку
    itemSelectText: '', // Убирает текст который появляется в select при выборе опции
  });

  await getKnownCurrwncies().then((data) => {
    data.payload.forEach((elem) => {
      choicesFrom.setValue([
        { value: elem },
      ]);
    });
  });

  const elementTo = document.querySelector('.currency__exchange-form-selectors-to');
  const choicesTo = new Choices((elementTo), {
    allowHTML: false,
    searchEnabled: false,
    shouldSort: false,
    itemSelectText: '',
  });

  await getKnownCurrwncies().then((data) => {
    data.payload.forEach((elem) => {
      choicesTo.setValue([
        { value: elem },
      ]);
    });
  });
}
