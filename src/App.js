import React, {useState, useEffect} from 'react';
import axios from 'axios';

function App() {
	const [addr, setAddr] = useState("");
	const [addrBalance, setAddrBalance] = useState("");
	const [display, setDisplay] = useState(null);
	
	const [axiosRes, setAxiosRes] = useState(null);
	
	// i have to use this hook because if i just put it inside the function
	// it doesnt update.
	useEffect(() => {
		setDisplay(balanceResponse);
	}, [axiosRes])
	
	async function buttonPress() {
		console.log("hello");
		let res;
		try { 
			res = await axios.post('http://localhost:443/gettokenbalance',
			{'address': addr});
		} catch {
			setDisplay("invalid address / request failed")
			return;
		}
		console.log(res.data);
		//setAddrBalance(res.data);
		console.log(addr);
		setAxiosRes(res);
		//setDisplay(balanceResponse);
	}
	
	function balanceResponse() {
		return axiosRes == null ? null : `user ${addr} has ${axiosRes.data} tokens$`;
		//return axiosRes == null ? null : `user ${addr} has ${addrBalance} tokens$`;
	}
	
	return (
		<div className="App">
			Learning React
			<br/>
			<input type = "text" name = "inputtext" onChange = {(x) => {setAddr(x.target.value)}}/>
			<input type = "button" value = "hello" onClick = {buttonPress}/>
			<br/>
			{display}
		</div>
	);
}

export default App;
