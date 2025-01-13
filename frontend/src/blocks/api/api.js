/* eslint-disable no-return-await */
/* eslint-disable guard-for-in */
/* eslint-disable no-console */
/* eslint-disable consistent-return */
import pause from '../generalElements/pause';

const URL = 'http://localhost:3000';
const PAUSE_MS_300 = 300;

export async function autorization(login, password) { // Экспортирует асинхронную функцию autorization, принимающую логин и пароль
  try {
    const response = await fetch(`${URL}/login`, { // Выполняет POST-запрос на сервер по адресу http://localhost:3000/login с данными пользователя
      method: 'POST',
      body: JSON.stringify({ // Отправляет данные логина и пароля в формате JSON
        login,
        password,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    return await response.json(); // Если запрос успешен, ожидает ответа в формате JSON и возвращает его
  } catch (error) {
    console.log(
      'Ошибка загрузки, сервер недоступен, попробуйте повторить попытку позже.',
    );
  }
}

export async function getAccounts(token) {
  try {
    await pause(PAUSE_MS_300); // Добавлен задержка PAUSE_MS_300 (300 миллисекунд).
    return await fetch(`${URL}/accounts`, { // осуществляет переход на страницу со списком счетов
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Basic ${token}`, // Использует Basic авторизацию. Это значит, что токен отправляется в виде Basic <encoded_token>. Важно: Используйте Bearer авторизацию для безопасности.
      },
    }).then((res) => res.json()); // Корректно обрабатывает ответ, преобразуя его из ответа Response в JSON
  } catch (error) {
    console.log(error);
  }
}

export async function createAccount(token) { // создания аккаунта
  try {
    let result = await fetch(`${URL}/create-account`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${token}`,
      },
    });
    result = await result.json();
    return result;
  } catch (err) {
    console.log(
      'Ошибка загрузки, сервер недоступен, попробуйте повторить попытку позже.',
    );
  }
}

export async function getCurrencyAccounts(token) { // получение списка валютных счетов
  try {
    await pause(PAUSE_MS_300);
    let result = await fetch(`${URL}/currencies`, {
      headers: {
        Authorization: `Basic ${token}`,
      },
    });

    result = await result.json();
    const resultArray = [];

    for (const key in result.payload) {
      resultArray.push(result.payload[key]);
    }

    return resultArray;
  } catch (err) {
    console.log(
      'Ошибка загрузки, сервер недоступен, попробуйте повторить попытку позже.',
    );
  }
}

export async function getAtmsBank(token) { // получение списка банкоматов
  try {
    await pause(PAUSE_MS_300);
    return await fetch(`${URL}/banks`, {
      headers: {
        Authorization: `Basic ${token}`,
      },
    }).then((data) => data.json());
  } catch (error) {
    console.log(error);
    console.log(
      'Ошибка загрузки, сервер недоступен, попробуйте повторить попытку позже.',
    );
  }
}

export async function getChangedCurrency() { // Установка веб-сокет соединения для получения обновлений курса
  try {
    return new WebSocket('ws://localhost:3000/currency-feed');
  } catch (error) {
    console.log(error);
  }
}

export async function getKnownCurrwncies() { // получение списка всех валют
  try {
    return await fetch(`${URL}/all-currencies`).then((data) => data.json());
  } catch (error) {
    console.log(error);
  }
}

export async function exchangeCurrency(from, to, amount, token) { // обмен валют
  try {
    await pause(PAUSE_MS_300);
    return await fetch(`${URL}/currency-buy`, {
      method: 'POST',
      body: JSON.stringify({
        from,
        to,
        amount,
      }),
      headers: {
        'Content-Type': 'application/json',
        authorization: `Basic ${token}`,
      },
    }).then((res) => res.json());
  } catch (error) {
    console.log(error);
  }
}

export async function getAccount(id, token) { // получение конкретного счёта по ID
  try {
    await pause(PAUSE_MS_300);
    return await fetch(`${URL}/account/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Basic ${token}`,
      },
    }).then((res) => res.json());
  } catch (error) {
    console.log(error);
  }
}

export async function transferFunds(from, to, amount, token) { // перевод денежных средств между счетами
  try {
    return await fetch(`${URL}/transfer-funds`, {
      method: 'POST',
      body: JSON.stringify({
        from,
        to,
        amount,
      }),
      headers: {
        'Content-Type': 'application/json',
        authorization: `Basic ${token}`,
      },
    }).then((res) => res.json());
  } catch (error) {
    console.log(error);
  }
}
