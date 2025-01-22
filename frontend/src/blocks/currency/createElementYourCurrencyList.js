/* eslint-disable import/order */
/* eslint-disable import/no-duplicates */
import { el, mount, setChildren } from 'redom';
import { getCurrencyAccounts } from '../api/api';
import 'simplebar';
import 'simplebar/dist/simplebar.css';
import SimpleBar from 'simplebar';
import skeletonYourCurrencyList from './skeletonYourCurrencyList';
import createElementList from '../generalElements/createElementList';

export default function createElementYourCurrencyList(token) {
  const skeleton = skeletonYourCurrencyList();

  const wrapper = createElementList('div', {
       className: 'currency__wrap-list',
      id: 'simple',
      dataset: {
          simplebar: true,
          simplebarAutoHide: false,
      },
    });

    setChildren(wrapper, skeleton)

 getCurrencyAccounts(token).then((data) => {
       const list = createElementList('ul', {
         className: 'currency__list',
       });

   data.forEach((element) => {
     const item = createElementList('li', {
       className: 'currency__item',
       children: [
         createElementList('span', {
           text: element.code,
           className: 'currency__item-code',
         }),
         createElementList('span', {
            className: 'currency__item-dashed ',
        }),
        createElementList('span', {
          text: element.amount.toFixed(2),
            className: 'currency__item-amount',
        }),
       ],
     });
    mount(list, item);
   });

   setChildren(wrapper, list);

   const simpleBar = new SimpleBar(document.getElementById('simple'), { autoHide: false });
   simpleBar.recalculate();
 });


 return wrapper;
}
