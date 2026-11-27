export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  membershipStatus: "Member" | "Non-member";
}
