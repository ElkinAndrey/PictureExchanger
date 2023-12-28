import roles from "../constants/roles";

class Policy {
  static isNotAuth() {
    return !localStorage.getItem("jwt");
  }

  static isAuth() {
    return !!localStorage.getItem("jwt");
  }

  static isManagerOrOwner(role, userId, contentId) {
    return this.isManager(role) || (!!userId && userId === contentId);
  }

  static isManager(role) {
    return (
      role === roles.manager ||
      role === roles.superManager ||
      role === roles.admin ||
      role === roles.superAdmin
    );
  }

  static isSuperManager(role) {
    return (
      role === roles.superManager ||
      role === roles.admin ||
      role === roles.superAdmin
    );
  }

  static isAdmin(role) {
    return role === roles.admin || role === roles.superAdmin;
  }

  static isSuperAdmin(role) {
    return role === roles.superAdmin;
  }

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
