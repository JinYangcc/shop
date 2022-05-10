import { v4 as uuidv4 } from "uuid";
export const getUUID = () => {
  //!先获取，如果没有就设置
  let uuid_token = localStorage.getItem("UUIDTOKEN");
  if (!uuid_token) {
    uuid_token = uuidv4();
    localStorage.setItem("UUIDTOKEN", uuid_token);
  }
  //!切记返回值
  return uuid_token;
};
