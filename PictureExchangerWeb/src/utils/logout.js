const logout = (paramsChange, fetchLogout) => {
  window.localStorage.removeItem("jwt");
  paramsChange({ id: null, name: null, email: null, role: null });
  fetchLogout();
};

export default logout;
