import { el, mount } from 'redom';
import createElementList from '../generalElements/createElementList';

export default function skeletonElementAccountsList() {
  const list = createElementList('ul', {
    className: 'accounts__list list-reset skeleton-list',
  });

  for (let i = 0; i < 9; i++) {
    const item = createElementList('li', {
      className: 'accounts__item',
      children: [
        createElementList('div', {
          className: 'accounts__item-number skeleton-accounts skeleton-accounts-number',
        }),
        createElementList('div', {
          className: 'accounts__item-balance skeleton-accounts skeleton-accounts-balance',
        }),
        () => createElementList(
          'div',
          {
            className: 'accounts__item-wrapper',
            children: [
            createElementList('div', {
                className: 'accounts__item-wrapper-transaction skeleton-accounts skeleton-accounts-transaction',
              }),
              createElementList('div', {
                 className: 'accounts__item-wrapper-date skeleton-accounts skeleton-accounts-date',
              }),
            ],
          },
        ),
        createElementList('div', {
          className: 'accounts__item-open btn-reset skeleton-accounts skeleton-accounts-open',
        }),
      ],
    });

    mount(list, item);
  }

  return list;
}
// Функция skeletonElementAccountsList создает HTML структуру, которую можно использовать в качестве заглушки (скелетона) при загрузке данных списка аккаунтов. Это улучшает восприятие приложения пользователем, делая его более отзывчивым, пока данные загружаются.
