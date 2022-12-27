import { UserData } from "./UserData";

export type Product = {
  name: string;
  description: string;
  productCondition: string;
  startingPrice: number;
  highestBid: number;
  listedAt: Date;
  biddingClosesOn: Date;
  isActive: boolean;
  seller: UserData | null;
  id: number;
};
