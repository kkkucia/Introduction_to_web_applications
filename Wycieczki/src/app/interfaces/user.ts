import { Roles } from "./roles";

export class User {
  uid: string;
  email: string;
  roles: Roles;

  constructor(userData: any) {
    this.uid = userData.uid;
    this.email = userData.email;
    if (userData.roles != null) {
      this.roles = userData.roles;
    } else
      this.roles = {
        client: true,
        guest: true,
        manager: false,
        admin: false,
        banned: false
      };
  }
}