import {JwtPayload} from "jwt-decode";

export default interface JwtState extends JwtPayload {
  username?: string;
  roles: string[];
}

export interface SessionDeviceInfo {
  ipHash: string;
  platform?: string;
  userAgent?: string;
  appVersion?: string;
  vendor?: string;
}
