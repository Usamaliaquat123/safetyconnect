interface userDTO {
  users: Array<any>;
  user: any;
  error: Boolean;
  loading: boolean;
}

type user = {
  tour?: any;
  img_url?: any;
  pending_organizations: any;
  organization?: Array<any>;
  name?: string;
  email?: string;
  role?: string;
  department?: string;
  industry?: string;
};

export default userDTO;
