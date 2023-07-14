import api from "../../../../api";

export async function getUser() {
  const response = await fetch(`/api/user`);
  if (response.status === 200) {
    const user = await response.json();
    return user;
  } else {
    return;
  }
}

export async function verifyAccessToken(
  access: string | boolean,
  resolvedUrl?: string
) {
  if (!access) {
    return access;
  }
  if (access) {
    const response = await api.post("/token/verify/", {
      token: access,
    });
    if (response.status === 200) {
      return access;
    } else {
      return null;
    }
  }
}
