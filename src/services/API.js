const ECONOMY_API = 'https://economia.awesomeapi.com.br/json/all';

const economyAPI = async () => {
  const response = await fetch(ECONOMY_API);
  const value = await response.json();
  return value;
};

export default economyAPI;
