/* eslint-disable for-direction */
import { el } from 'redom';
import createElementList from '../generalElements/createElementList';

export default function skeletonElementRateList() {
  const list = createElementList('ul', {
       className: 'currency__rate-list',
       children: Array(12).fill(null).map(() => createElementList('li', {
          className: 'currency__rate-item',
              children: [
              createElementList('div', {
                  className: 'currency__rate-item-code skeleton-currency skeleton-currency-code',
              }),
                 createElementList('div', {
                   className: 'currency__rate-item-dashed skeleton-currency skeleton-currency-dashed',
              }),
              createElementList('div', {
                   className: 'currency__rate-item-value skeleton-currency skeleton-currency-amount',
               }),
           ],
        })),
    });
   return list;
}
