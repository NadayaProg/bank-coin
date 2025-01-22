/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import { mount } from 'redom';
import { getAccounts } from '../api/api';
import clickCardAccount from './clickCardAccount';
import createElementList from '../generalElements/createElementList';

export function createElementAccountsList(router) {
  const token = localStorage.getItem('token');

  const list = createElementList('ul', {
    className: 'accounts__list',
  });

  getAccounts(token).then((res) => {
    console.log(res);
    const arrayAccounts = res.payload;

    arrayAccounts.forEach((data) => {
      let date = null;
      const arrayMonth = [
        'января',
        'февраля',
        'марта',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'октября',
        'ноября',
        'декабря',
      ];

      if (data.transactions[0]) {
        date = new Date(data.transactions[0].date);
        date = `${date.getDate()} ${
          arrayMonth[date.getMonth()]
        } ${date.getFullYear()}`;
      } else {
        date = '';
      }


     const item = createElementList('li', {
          className: 'accounts__item',
           children: [
            createElementList('p', {
                text: data.account,
                 className: 'accounts__item-number',
                 dataset: { number: data.account},
            }),
              createElementList('p', {
                  text: `${data.balance.toFixed(2)} ₽`,
                   className: 'accounts__item-balance',
                    dataset: { balance: data.balance.toFixed(2) }
              }),
              () => createElementList(
                  'div',
                  {
                    className: 'accounts__item-wrapper',
                    children: [
                    createElementList('p', {
                    text: 'Последняя транзакция:',
                       className: 'accounts__item-wrapper-transaction',
                }),
                    createElementList('p', {
                        text: date,
                         className: 'accounts__item-wrapper-date',
                           dataset: { lastTransaction: date }
                     })
                     ]

                }),
                  createElementList('button', { text: 'Открыть', className: 'accounts__item-open btn-reset' })
           ]
     })

      mount(list, item);
    });

    const skeletonList = document.querySelector('.skeleton-list');
    if (skeletonList !== null) {
      skeletonList.remove();
    }

    clickCardAccount(router);
  });

  return list;
}
