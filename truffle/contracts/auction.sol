pragma solidity >= 0.5.0;

contract Auction {
  //  Represents a set of people entering the auction to bid on a product.
  address[] public bidders;
  
  // Represents the bids received by the seller.
  uint256[] bids;
  
  // Represents an address auctioning a product.
  address public seller;
  
  address highestBidder;

  function auction() public {
      seller = msg.sender;
  }

  function submitBid() public payable {
        require(msg.value > 0.01 ether);
        bidders.push(msg.sender);
        bids.push(msg.value);
  }
    

  function determineWinner() public {
    uint highestBid = 0;
    uint i;

    for (i = 0; i < bids.length; i++) {
        if (bids[i] > highestBid) {
            highestBid = bids[i];
    }
  }
   highestBidder = bidders[i];
   bidders = new address[](0);
 }

  function getHighestBidder() view public returns (address) {
    return highestBidder;
  }
}
