import { el } from 'redom';

export default function createElement(tag, options = {}) {
  const element = el(tag);


  if (options.text) {
     element.textContent = options.text
  }


  if (options.className) {
    element.className = options.className;
  }

  if (options.id) {
    element.id = options.id;
  }

  if (options.onclick) {
    element.onclick = options.onclick;
  }

  if (options.style) {
    Object.assign(element.style, options.style);
  }


    if (options.dataset) { // для добавления data атрибутов
      for (const key in options.dataset) {
        element.dataset[key] = options.dataset[key];
      }
    }


  if (options.children) {
      if (Array.isArray(options.children)) {
        options.children.forEach(child => {
            if(typeof child === 'function'){
              element.appendChild(child())
            } else {
               element.appendChild(child)
            }
          } );
       } else if (typeof options.children === 'function') {
          element.appendChild(options.children())
       }
       else {
         element.appendChild(options.children)
       }

    }

  return element;
}
