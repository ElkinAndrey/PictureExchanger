import parseJwt from "./parseJwt";

const login = (jwt, params, paramsChange) => {
  localStorage.setItem("jwt", jwt);
  const newParams = parseJwt(jwt);
  params.id = newParams.id;
  params.name = newParams.name;
  params.email = newParams.email;
  params.role = newParams.role;
  paramsChange({ ...params });
};

export default login;
