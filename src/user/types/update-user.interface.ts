export interface UpdateUser {
  id: number;
  firstName: string;
  lastName: string;
  birthday: number;
  height: number;
  weight: number;
  gender: string;
  address: string;
  phone: number;
  adminId?: string;
  useYn: string;
}
