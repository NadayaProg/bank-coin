import { el, mount, setChildren } from 'redom';
import SimpleBar from 'simplebar';

function createList(
  listClassName,
  itemClassName,
  items,
  elementCreate,
  wrapperClassName,
  wrapperId = '',
  simpleBar = false,
) {
  const arrayHelp = [];
    const wrapper = el('div', {
    className: wrapperClassName,
    id: wrapperId,
    'data-simplebar': simpleBar,
    'data-simplebar-auto-hide': false,
  });

  const list = el('ul', {
    className: listClassName,
  });


  items.forEach((itemData) => {
        const item = el('li', {
          className: itemClassName,
        }, elementCreate(itemData));

        arrayHelp.push(item);
  });

  arrayHelp.forEach((elem) => {
    mount(list, elem);
  });


  setChildren(wrapper, list);



  return wrapper
}

export default createList;
