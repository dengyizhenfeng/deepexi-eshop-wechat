(function () {
  function GetUrlParame(parameName) {
    var arr = location.href.match(new RegExp(parameName + "=(.{1,50})(&[a-zA-Z]{1,})?", 'i'));
    if (arr && arr.length > 1) {
      sessionStorage.setItem(parameName, arr[1].split('&')[0])
      return arr[1].split('&')[0];
    }
    return ''
  }
  if (GetUrlParame('share')) {
    sessionStorage.setItem('shopId', GetUrlParame('shopId'))
  }
})()
