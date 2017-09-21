pragma solidity ^0.4.6;

import "./Stoppable.sol";
import "./Shopfront.sol";

contract ShopfrontHub is Stoppable {
	address [] public shopfronts;

	mapping (address => bool) public shopfrontExists;

	modifier onlyIfShopfront (address _shopfront) {
		require (shopfrontExists[_shopfront] == true);
		_;
	}

	event LogNewShopfront(address shopfrontAddress, address shopfrontCreator);

	function createNewShopfront ()
		public
		returns (address _newShopfront)
	{
		Shopfront newShopfront = new Shopfront ();
		shopfronts.push(newShopfront);
		shopfrontExists[newShopfront] = true;
		LogNewShopfront(newShopfront, msg.sender);

		return newShopfront;
	}

	function stopStore (address shopfrontAddress) 
		isOwner
		onlyIfShopfront(shopfrontAddress)
		returns (bool success)
	{
		Shopfront targetShopfront = Shopfront(shopfrontAddress);
		return (targetShopfront.runSwitch(false));
	}

	function startStore (address shopfrontAddress) 
		isOwner
		onlyIfShopfront(shopfrontAddress)
		returns (bool success)
	{
		Shopfront targetShopfront = Shopfront(shopfrontAddress);
		return (targetShopfront.runSwitch(true));
	}

	function changeShopfrontOwner (address shopfrontAddress, address newOwner) 
		isOwner
		onlyIfShopfront(shopfrontAddress)
		returns (bool success)
	{
		Shopfront targetShopfront = Shopfront(shopfrontAddress);
		return (targetShopfront.changeOwner(newOwner));
	}
}