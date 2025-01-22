import { el } from 'redom';
import createElementList from '../generalElements/createElementList';

export default function skeletonYourCurrencyList() {
  const list = createElementList('ul', {
      className: 'currency__wrap-list',
      children: Array(5).fill(null).map(() => createElementList('li', {
          className: 'currency__item',
            children: [
               createElementList('div', {
                  className: 'currency__item-code skeleton-currency skeleton-currency-code',
              }),
              createElementList('div', {
                  className: 'currency__item-dashed skeleton-currency skeleton-currency-dashed',
              }),
              createElementList('div', {
                 className: 'currency__item-amount skeleton-currency skeleton-currency-amount',
              }),
            ],
      })),
  });

return list;
}
