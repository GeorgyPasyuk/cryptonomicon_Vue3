# [Cryptonomicon](https://cryptonomicon-vue3.netlify.app/)
[![Netlify Status](https://api.netlify.com/api/v1/badges/a9a56066-96b2-45ad-87c2-d93c498e9ea6/deploy-status)](https://app.netlify.com/sites/cryptonomicon-vue3/deploys)

Проект веб-приложение арбитража криптовалют
### Возможности
Поиск любой криптовалюты
![Screenshot](./docs/search.png)
Отображение ее стоимости в реальном времени 
![Screenshot](./docs/currency.png)
Построение графика изменения ценности
(в зависимости от торгов)
![Screenshot](./docs/graph.png)
Закрепление нескольких валют
![Screenshot](./docs/many.png)


### Технологии
VUE3 \
TailWindCSS \
[CryptoCompare API](https://min-api.cryptocompare.com/)

### Для запуска проекта:

Важно иметь Node Packet Manager последней стабильной версии

```
npm install
```

### dev

```
npm run serve
```

### build

```
npm run build
```

### lint

```
npm run lint
```
Приложение будет запущено на порту 8080

### Что можно улучшить:
В ситуациях когда невозможно просчитать стоимость относительно
USD, можно делать дополнительный запрос на расчет стоимости к 
BTC, и еще один для расчета BTC к USD

