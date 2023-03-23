export default class UserInfo {
  constructor({userNameSelector, userJobSelector, userAvatarSelector}) {
    this._userName = document.querySelector(userNameSelector);
    this._userJob = document.querySelector(userJobSelector);
    this._avatar = document.querySelector(userAvatarSelector);
  };

  // То, что на данный момент известно о юзере, помещается в инпуты попапа редактирования
  getUserInfo() {
    const userInfo = {
      name: this._userName.textContent,
      job: this._userJob.textContent,
      avatar: this._avatar.src
    };
    return userInfo;
  };

  getUserId() {
    return this._id;
  }

  // Данные с сервера подставляем в профиль
  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userJob.textContent = data.about;
    this._avatar.src = data.avatar;
    this._id = data._id;
  };
};
