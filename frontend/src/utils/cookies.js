function getCookie(name) {
    //return coockie with *name*. else return undefind
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }


function setCookie(name, value) {
    document.cookie=`${name}=${value}`;
  }