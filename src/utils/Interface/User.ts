export interface activeUser {
  username: string;
  email: string;
  phoneNo: string;
  address: string;
  status: boolean;
  createdAt: string;
}

export interface inActiveUser {
  username: string;
  email: string;
  phoneNo: string;
  address: string;
  status: boolean;
  createdAt: string;
}

export interface Roles {
  name: string;
  tag: string;
  status: boolean;
  createdAt: string;
}

export interface Actions {
  name: string;
  title: string;
  tag: string
  status: boolean;
  createdAt: string;
}