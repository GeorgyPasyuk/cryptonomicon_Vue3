const API_KEY =
  "5346162556ac0889a345de2745e8c6e89e16bf29e30fd005c3ba68571430598b";

const tickersHandlers = new Map();
const socket = new WebSocket(
  `wss://streamer.cryptocompare.com/v2?api_key=${API_KEY}`
);

const AGGREGATE_INDEX = "5";

socket.addEventListener("message", (e) => {
  const {
    TYPE: type,
    FROMSYMBOL: currency,
    PRICE: newPrice,
    //MESSAGE: message,
  } = JSON.parse(e.data);
  console.log(currency);
  /*let allTickers = Array.from(tickersHandlers.keys());
  let currentTicker = allTickers[allTickers.length - 1];
  if (message === "INVALID_SUB") {
    subscribeToTickerOnWsUSD(currentTicker);
  }
  */

  if (type !== AGGREGATE_INDEX || newPrice === undefined) {
    return;
  }
  const handlers = tickersHandlers.get(currency) ?? [];
  handlers.forEach((fn) => fn(newPrice));
});

/*TODO: refactor to use URLSearchParams*/

function sendToWebSocket(message) {
  const stringifiedMessageBTC = JSON.stringify(message);
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(stringifiedMessageBTC);
    return;
  }
  socket.addEventListener(
    "open",
    () => {
      socket.send(stringifiedMessageBTC);
    },
    { once: true }
  );
}

function subscribeToTickerOnWs(ticker, toSyms = "USD") {
  sendToWebSocket({
    action: "SubAdd",
    subs: [`5~CCCAGG~${ticker}~${toSyms}`],
  });
}
/*function subscribeToTickerOnWsUSD(ticker, toSyms = "USD") {
  sendToWebSocket({
    action: "SubAdd",
    subs: [`5~CCCAGG~${ticker}~${toSyms}`],
  });
}*/

function unsubscribeFromTickerOnWs(ticker, toSyms = "USD") {
  sendToWebSocket({
    action: "SubRemove",
    subs: [`5~CCCAGG~${ticker}~${toSyms}`],
  });
}
function unsubscribeFromTickerOnWsUSD(ticker, toSyms = "USD") {
  sendToWebSocket({
    action: "SubRemove",
    subs: [`5~CCCAGG~${ticker}~${toSyms}`],
  });
}

export const subscribeToTicker = (ticker, cb) => {
  const subscribers = tickersHandlers.get(ticker) || [];
  tickersHandlers.set(ticker, [...subscribers, cb]);
  subscribeToTickerOnWs(ticker);
};

export const unsubscribeFromTicker = (ticker) => {
  tickersHandlers.delete(ticker);
  unsubscribeFromTickerOnWs(ticker);
  unsubscribeFromTickerOnWsUSD(ticker);
};
