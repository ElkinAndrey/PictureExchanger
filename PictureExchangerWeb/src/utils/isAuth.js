const isAuth = () => !!localStorage.getItem("jwt");

export default isAuth;
