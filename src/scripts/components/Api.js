
// Токен: 545040d2-ca8d-4af4-bb28-cd05a11607d7
// Идентификатор группы: cohort-61
// Адрес сервера проекта Mesto: https://mesto.nomoreparties.co.

// Идентификатор группы должен быть в URL сразу после v1. Всегда обращайтесь к своей группе. Если обратиться к чужой, сервер вернёт ошибку.

// GET https://nomoreparties.co/v1/cohortId/users/me

export default class Api {

  // // Без конструктора
  // constructor(){

  // }

  // getInitialCards() {
  //   const p = fetch('https://mesto.nomoreparties.co/v1/cohort-61/cards', {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       authorization: '545040d2-ca8d-4af4-bb28-cd05a11607d7'
  //     }
  //   });

  //   return p.then((res) => {
  //     if (res.ok) {
  //       return res.json();
  //     }
  //     return Promise.reject(`Ошибка: ${res.status}`);
  //   })
  // }

  // С конструктором
  constructor(basePath, token) {
    this._basePath = basePath;
    this._token = token;
  }

  _getHeaders() {
    return {
      'Content-Type': 'application/json',
      authorization: this._token
    };
  }

  getInitialCards() {
    const p = fetch(`${this._basePath}/cards`, {
      headers: this._getHeaders()
    });

    return p.then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  createUploadedCard(item) {
    return fetch(`${this._basePath}/cards`, {
      method: 'POST',
      headers: {
        authorization: '545040d2-ca8d-4af4-bb28-cd05a11607d7'
      },
      body: JSON.stringify(item),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

}

