pragma solidity ^0.4.6;

import './Admin.sol';

contract Stoppable is Admin {
	bool public running;

	event LogIsRunning (bool isRunning);

	function Stoppable () {
		running = true;
	}

	function runSwitch (bool onOff)
		isOwner
		returns (bool success)
	{
		running = onOff;
		LogIsRunning(onOff);
		return true;
	}
	
}