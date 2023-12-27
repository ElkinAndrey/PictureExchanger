const logout = (params, paramsChange, fetchLogout) => {
  window.localStorage.removeItem("jwt");
  params.id = null;
  params.name = null;
  params.email = null;
  params.role = null;
  paramsChange({ ...params });
  fetchLogout();
};

export default logout;
