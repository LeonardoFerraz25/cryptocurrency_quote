const fetchcrypto = async () => {
  const url = 'https://api.coincap.io/v2/assets';

  const crypto = await fetch(url)
    .then(response => response.json())
    .then(data => data.data)
    .catch(erro => erro.toString());
  
  return crypto;
};

const fetchConversion = async () => {
  const url = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.min.json`; 

  const usdConversion = await fetch(url)
    .then(response => response.json())
    .then(data => data.usd)
    .catch(erro => erro.toString());

  return usdConversion;
}



const addCurrencyUsd = async () => {
  const currency = await fetchcrypto();
  const usd = document.querySelector('#dollar');

  currency.forEach((coin, index) => {
    if (index <= 10) {
      const newli = document.createElement('li');
      const usdPrice = Number(coin.priceUsd);

      let info = `${coin.name} (${coin.symbol}): <span>$:${usdPrice.toFixed(2)}</span>`;

      newli.innerHTML = info;
      usd.appendChild(newli);
    }
  });
}

const addCurrencyBrl = async () => {
  const currency = await fetchcrypto();
  const brl = document.querySelector('#real');
  const conversion = await fetchConversion();

  currency.forEach((coin, index) => {
    if (index <= 10) {
      const newli = document.createElement('li');
      const usdPrice = Number(coin.priceUsd);
      const brlPrice = usdPrice * conversion.brl;

      let info = `${coin.name}  (${coin.symbol}):   <span>R$:${brlPrice.toFixed(2)}</span>`;

      newli.innerHTML = info;
      brl.appendChild(newli);
    };
  })
}

window.onload = addCurrencyUsd(), addCurrencyBrl()