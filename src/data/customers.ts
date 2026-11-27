import type { Customer } from "../types/customer";

export const initialCustomers: Customer[] = [
  {
    id: 1,
    name: "Anna Korhonen",
    email: "anna@example.com",
    phone: "0401234567",
    membershipStatus: "Member",
  },
  {
    id: 2,
    name: "Mikko Virtanen",
    email: "mikko@example.com",
    phone: "0402345678",
    membershipStatus: "Non-member",
  },
  {
    id: 3,
    name: "Laura Nieminen",
    email: "laura@example.com",
    phone: "0403456789",
    membershipStatus: "Member",
  },
  {
    id: 4,
    name: "Janne Laine",
    email: "janne@example.com",
    phone: "0404567890",
    membershipStatus: "Non-member",
  },
  {
    id: 5,
    name: "Emma Heikkinen",
    email: "emma@example.com",
    phone: "0405678901",
    membershipStatus: "Member",
  },
];
