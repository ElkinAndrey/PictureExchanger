import roles from "../constants/roles";

const getRoleName = (role) => {
  if (role === roles.manager) return "Менеджер";
  if (role === roles.superManager) return "Суперменеджер";
  if (role === roles.admin) return "Администратор";
  if (role === roles.superAdmin) return "Суперадминистратор";
  return "Пользователь";
};

export default getRoleName;
