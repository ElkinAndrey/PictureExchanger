const claimTypes = {
  actor: "http://schemas.xmlsoap.org/ws/2009/09/identity/claims/actor",
  postalCode:
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/postalcode",
  primaryGroupSid:
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/primarygroupsid",
  primarySid:
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/primarysid",
  role: "http://schemas.microsoft.com/ws/2008/06/identity/claims/role",
  rsa: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/rsa",
  serialNumber:
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/serialnumber",
  sid: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid",
  spn: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/spn",
  stateOrProvince:
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/stateorprovince",
  streetAddress:
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/streetaddress",
  surname: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname",
  system: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/system",
  thumbprint:
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/thumbprint",
  upn: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/upn",
  uri: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/uri",
  userData: "http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata",
  version: "http://schemas.microsoft.com/ws/2008/06/identity/claims/version",
  webpage: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/webpage",
  windowsAccountName:
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/windowsaccountname",
  windowsDeviceClaim:
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/windowsdeviceclaim",
  windowsDeviceGroup:
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/windowsdevicegroup",
  windowsFqbnVersion:
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/windowsfqbnversion",
  windowsSubAuthority:
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/windowssubauthority",
  otherPhone:
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/otherphone",
  nameIdentifier:
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier",
  name: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name",
  mobilePhone:
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/mobilephone",
  anonymous: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/anonymous",
  authentication:
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/authentication",
  authenticationInstant:
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/authenticationinstant",
  authenticationMethod:
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/authenticationmethod",
  authorizationDecision:
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/authorizationdecision",
  cookiePath:
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/cookiepath",
  country: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/country",
  dateOfBirth:
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/dateofbirth",
  denyOnlyPrimaryGroupSid:
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/denyonlyprimarygroupsid",
  denyOnlyPrimarySid:
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/denyonlyprimarysid",
  denyOnlySid:
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/denyonlysid",
  windowsUserClaim:
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/windowsuserclaim",
  denyOnlyWindowsDeviceGroup:
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/denyonlywindowsdevicegroup",
  dsa: "http://schemas.microsoft.com/ws/2008/06/identity/claims/dsa",
  email: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress",
  expiration:
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/expiration",
  expired: "http://schemas.microsoft.com/ws/2008/06/identity/claims/expired",
  gender: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/gender",
  givenName: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname",
  groupSid: "http://schemas.microsoft.com/ws/2008/06/identity/claims/groupsid",
  hash: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/hash",
  homePhone: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/homephone",
  isPersistent:
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/ispersistent",
  locality: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/locality",
  dns: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/dns",
  x500DistinguishedName:
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/x500distinguishedname",
};

const parseJwt = (token) => {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  let claims = JSON.parse(jsonPayload);
  let result = {
    id: claims[claimTypes.nameIdentifier],
    name: claims[claimTypes.name],
    email: claims[claimTypes.email],
    role: claims[claimTypes.role],
  };
  return result;
};

export default parseJwt;
