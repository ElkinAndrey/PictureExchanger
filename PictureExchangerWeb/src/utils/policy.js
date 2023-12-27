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
}

export default Policy;
