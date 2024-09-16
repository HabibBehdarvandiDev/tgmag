type User = {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  email: string;
  phone_number: string;
  is_verified: boolean;
  is_active: boolean;
  role_id: number;
  created_at: string;
  updated_at: string;
};

type PartialUser = Partial<User>;

export type { User, PartialUser };
