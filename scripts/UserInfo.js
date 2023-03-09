export default class UserInfo {
  constructor({userNameSelector, userJobSelector}) {
    this._userName = document.querySelector(userNameSelector);
    this._userJob = document.querySelector(userJobSelector);
  };

  // То, что на данный момент известно о юзере, помещается в инпуты попапа редактирования
  getUserInfo() {
    const userInfo = {
      name: this._userName.textContent,
      job: this._userJob.textContent
    }
    return userInfo;
  };

  // То, что заносится в инпуты формы пользователем, подставляется в профиль
  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userJob.textContent = data.job;
  };
};
