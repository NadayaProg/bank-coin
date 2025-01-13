export default async function pause(ms) {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

// Функция pause реализует задержку (паузу) в выполнении асинхронного кода, используя Promise и setTimeout. Она полезна для создания искусственных задержек, например, для имитации загрузки данных или для создания анимаций.
