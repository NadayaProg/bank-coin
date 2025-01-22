/* eslint-disable no-console */
import { el, mount, setChildren } from 'redom';
import { getChangedCurrency } from '../api/api';
import createElementList from '../generalElements/createElementList';

export default async function createElementRateList() {
  const socket = await getChangedCurrency();
  const arrayCurrency = [];

  socket.onmessage = (element) => {
    const message = JSON.parse(element.data);
    if (window.location.pathname !== '/currency') {
      socket.close();
      return;
    }

    if (arrayCurrency.length < 12) {
      arrayCurrency.push({
        name: `${message.from}/${message.to}`,
        rate: message.rate,
        change: message.change,
      });
    } else {
      arrayCurrency.push({
        name: `${message.from}/${message.to}`,
        rate: message.rate,
        change: message.change,
      });
      arrayCurrency.shift();
    }

    const list = createElementList('ul', {
      className: 'currency__rate-list list-reset',
    });

    arrayCurrency.forEach((elem) => {
      let classNameDashed = null;
      let classNameValue = null;

      if (elem.change === 1) {
        classNameDashed = 'currency__rate-item-dashed_green';
        classNameValue = 'advance';
      } else {
        classNameDashed = 'currency__rate-item-dashed_red';
        classNameValue = 'drop';
      }

      const item = createElementList('li', {
        className: 'currency__rate-item',
        children: [
          createElementList('span', {
            text: elem.name,
            className: 'currency__rate-item-code',
          }),
          createElementList('span', {
            className: `currency__rate-item-dashed ${classNameDashed}`,
          }),
          createElementList('span', {
            text: elem.rate,
            className: `currency__rate-item-value ${classNameValue}`,
          }),
        ],
      });
      mount(list, item);
        setChildren(document.querySelector('.currency__rate-wrapper'), list);
    });
  };
}
