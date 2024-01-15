import { UserData } from "./UserData";

export type Internship = {
  name: string;
  description: string;
  companyName: string;
  openPositions: number;
  listedAt: Date;
  activeUntil: Date;
  isActive: boolean;
  recruiterData: UserData | null;
  id: number;
  userID?: number | null;
};
