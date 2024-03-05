import roles from "../constants/roles";

/** Политики */
class Policy {
  /** true если пользователь не вошел в аккаунт */
  static isNotAuth() {
    return !localStorage.getItem("jwt");
  }

  /** true если пользователь вошел в аккаунт */
  static isAuth() {
    return !!localStorage.getItem("jwt");
  }

  /** true если пользователь обладатель контента */
  static isOwner(userId, contentId) {
    return !!userId && userId === contentId;
  }

  /** true если пользователь менеджер, выше менеджера или обладатель контента */
  static isManagerOrOwner(role, userId, contentId) {
    return this.isManager(role) || (!!userId && userId === contentId);
  }

  /** true если пользователь менеджер или выше */
  static isManager(role) {
    return (
      role === roles.manager ||
      role === roles.superManager ||
      role === roles.admin ||
      role === roles.superAdmin
    );
  }

  /** true если пользователь суперменеджер или выше */
  static isSuperManager(role) {
    return (
      role === roles.superManager ||
      role === roles.admin ||
      role === roles.superAdmin
    );
  }

  /** true если пользователь администратор или выше */
  static isAdmin(role) {
    return role === roles.admin || role === roles.superAdmin;
  }

  /** true если пользователь суперадминистратор или выше */
  static isSuperAdmin(role) {
    return role === roles.superAdmin;
  }

  /** true если первая роль выше второй */
  static firstRoleBigger(roleFirst, roleSecond) {
    const r = [
      roles.user,
      roles.manager,
      roles.superManager,
      roles.admin,
      roles.superAdmin,
    ];
    let roleFirstIndex = 0;
    let roleSecondIndex = 0;
    for (let i = 0; i < r.length; i++) {
      if (r[i] === roleFirst) roleFirstIndex = i;
      if (r[i] === roleSecond) roleSecondIndex = i;
    }
    return roleFirstIndex > roleSecondIndex;
  }
}

export default Policy;
