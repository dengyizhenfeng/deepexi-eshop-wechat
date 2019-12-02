export default function handleMoney (str) {
  if (str.length <= 3) return str
  else {
    return parseFloat(str).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
  }
}
