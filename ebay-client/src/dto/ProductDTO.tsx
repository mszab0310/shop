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

/**    private String name;
    private String description;
    private String productCondition;
    private BigDecimal startingPrice;
    private BigDecimal highestBid;
    private Date listedAt;
    private Date biddingClosesOn;
    private Boolean isActive;
    private UserDataDto sellerData; */
