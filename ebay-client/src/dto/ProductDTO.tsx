import { UserData } from "./UserData";

export type Product = {
  name: string;
  description: string;
  productCondition: string;
  startingPrice: number;
  highestBid: number;
  listedAt: string;
  biddingClosesOn: string;
  isActive: boolean;
  seller: UserData;
};
