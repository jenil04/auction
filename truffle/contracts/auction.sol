pragma solidity  ^0.4.19;

contract Auction {
  //  Represents a set of people entering the auction to bid on a product.
  address[] public bidders;
  
  // Represents the bids received by the seller.
  uint256[] public bids;
  
  // Represents an address auctioning a product.
  address public seller;
  
  // The highest bidder for the auction.
  address highestBidder;
  
  function auction() public {
      seller = msg.sender;
  }

  function submitBid() public payable {        
        // initializing bidders & bids.
        bidders.push(msg.sender);
        bids.push(msg.value);
        
        //initializing highestBidder
        highestBidder = msg.sender;
  }
  
  function determineWinner() public {
        
        bidders[bidders.length-1].transfer(
            bids[bids.length -1]);
        
        // Reset to a new round of auction.
        bidders = new address[](0);
    }
  
  function getHighestBidder() view public returns (address) {
    return highestBidder;
  }
  
  function getBidders() view public returns (address[]){
      return bidders;
  }
  
  function getBids() view public returns (uint256[]) {
      return bids;
  }
}
