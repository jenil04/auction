pragma solidity >= 0.5.0;

contract Auction {
  mapping(address => uint256) bids;
  address public latestBidder;
  uint256 latestBid;
  address public seller;

  address highestBidder;
  bool firstBid = true;
  
  function auction(uint256 bid) public {
      seller = msg.sender;
      latestBid = bid * 1 ether;
  }

  function submitBid(address name, uint256 bid) public {
    require(bids[name] < bid);

    if (firstBid || bid > bids[highestBidder]) {
      highestBidder = name;
      firstBid = false;
    }
    bids[name] = bid;
  }

  function getHighestBidder() view public returns (address) {
    return highestBidder;
  }

  function getTopBid() view public returns (uint256) {
    return bids[highestBidder];
  }
}
