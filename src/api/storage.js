
export  function setConsultants(param) {
    sessionStorage.setItem('infoConsultant', JSON.stringify(param));
}

export function getConsultants() {
    return sessionStorage.getItem('infoConsultant')
}

export function removeConsultants(key) {
    sessionStorage.removeItem(key);
}

export  function setAvatar(param) {
    sessionStorage.setItem('avatar', JSON.stringify(param));
}

export function getAvatar() {
    return sessionStorage.getItem('avatar')
}

export function removeAvatar(key) {
   sessionStorage.removeItem(key);
}
