import './index.html';
import './scss/main.scss';

import { setChildren } from 'redom';
import Navigo from 'navigo';
import ResizeObserver from 'resize-observer-polyfill';
import { createHeader } from './blocks/header/createHeader.js';
import menuClassTogler from './blocks/header/menuClassTogler.js';
import createElementMain from './blocks/generalElements/createElementMain.js';
import  createLoginForm from './blocks/login/createLoginForm.js';
import  validationLoginFrom  from './blocks/login/validationLoginForm.js';
import { getChangedCurrency } from './blocks/api/api.js';
import  createElementContainer  from './blocks/generalElements/createElementContainer.js';
import createCurrency from './blocks/currency/createCurrency.js';
import choicesSelect from './blocks/currency/choices.js';
import exchangeCurrencies from './blocks/currency/exchangeCurrencies.js';
import validationCurrencyExchange from './blocks/currency/validationCurrencyExchange.js';
import createMap from './blocks/atms/createMap.js';
import createElementAccaunts from './blocks/account/createElementAccounts.js';
import addAccount from './blocks/account/addAccount.js';
import userAuthorization from './blocks/login/userAuthorization.js';
import routerApp from './blocks/generalElements/routerApp.js';
import createCardAccount from './blocks/cardAccount/createCardAccount.js';
import accountSortSelectChoices from './blocks/account/accountSortSelectChoices.js';
import createAccountHistory from './blocks/cardAccountHistory/createAccountHistory.js';

const main = createElementMain();
const container = createElementContainer();
setChildren(document.body, [createHeader(true), main]);

const router = new Navigo('/');

router.on('/', () => { //  Определяет обработчик для маршрута /
  localStorage.removeItem('token'); // Удаляет token из localStorage (вероятно, для выхода пользователя)
  setChildren(document.body, [createHeader(), main]); // Обновляет заголовок на обычный, без авторизации, и главный элемент
  setChildren(main, container); // Добавляет контейнер внутрь main-элемента
  setChildren(container, createLoginForm()); // Добавляет форму авторизации внутрь контейнера.
  validationLoginFrom(); // Вызывает функцию, которая выполняет валидацию формы авторизации.
  userAuthorization(router); // Вызывает функцию, которая отвечает за обработку авторизации пользователя, и принимает router для переадресации
});

router.on('/atms', () => { // Определяет обработчик для маршрута /atms (для просмотра банкоматов)
  menuClassTogler('/atms'); // Вызывает функцию, которая выделяет пункт меню /atms.
  setChildren(main, createMap()); // Добавляет карту (<map>), созданную функцией createMap(), внутрь main-элемента
});

router.on('/currency', () => { // Определяет обработчик для маршрута /currency (для просмотра курсов валют)
  window.ResizeObserver = ResizeObserver; // Присваивание window.ResizeObserver переменной ResizeObserver, что бы она была доступна
  menuClassTogler('/currency'); // Вызывает функцию, которая выделяет пункт меню /currency
  setChildren(main, createCurrency()); // Добавляет интерфейс для просмотра валют внутрь main-элемента
  getChangedCurrency(); // Функция, которая получает текущие данные по валюте
  exchangeCurrencies(); // Функция, которая реализует логику обмена валют
  choicesSelect(); // Функция, которая настраивает выбор валют в select
  validationCurrencyExchange(); // Функция, которая проверяет форму обмена валют
});

router.on('/account', () => { // Определяет обработчик для маршрута /account (для просмотра счетов пользователя)
  setChildren(document.body, [createHeader(true), main]); // Обновляет заголовок на обычный, с авторизацией, и главный элемент.
  menuClassTogler('/account'); // Вызывает функцию, которая выделяет пункт меню /account
  routerApp(router); // Вызывает функцию, которая настраивает маршрутизацию, которая настраивает дочернии маршруты
  setChildren(main, createElementAccaunts(router)); // Добавляет интерфейс для просмотра аккаунта, который будет создан функцией createElementAccaunts(router), внутри main
  addAccount(); // Вызывает функцию, которая позволяет добавлять новый аккаунт
  accountSortSelectChoices(); // Вызывает функцию, которая отвечает за сортировку счетов пользователя
});

router.on('/card-account', () => { // Определяет обработчик для маршрута /card-account, который предназначен для просмотра информации о банковских картах
  setChildren(main, createCardAccount(router)); // Заменяет содержимое main элементом, который создается функцией createCardAccount(router). Эта функция создает интерфейс для просмотра данных о картах, и принимает роутер для навигации.
  menuClassTogler(''); // Вызывает функцию menuClassTogler, которая убирает выделение с текущего пункта меню. В данном случае передается пустая строка, что говорит о том, что ни один пункт меню не должен быть подсвечен
});

router.on('/card-account-history', () => { // Определяет обработчик для маршрута /card-account-history, который предназначен для просмотра истории операций по банковским картам
  setChildren(main, createAccountHistory(router)); // Заменяет содержимое main элементом, который создается функцией createAccountHistory(router). Эта функция создает интерфейс для просмотра истории операций, и принимает роутер для навигации
  menuClassTogler('');// // Вызывает функцию menuClassTogler, которая убирает выделение с текущего пункта меню. В данном случае передается пустая строка, что говорит о том, что ни один пункт меню не должен быть подсвечен
});

router.resolve(); // Эта команда является ключевой для работы Navigo. Она запускает процесс разрешения маршрута
