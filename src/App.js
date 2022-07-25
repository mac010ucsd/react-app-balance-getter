import React, {useState, useEffect} from 'react';
import axios from 'axios';

function App() {
	const [addr, setAddr] = useState("");
	const [addrBalance, setAddrBalance] = useState("");
	const [displayOne, setDisplayOne] = useState(null);
	const [displayTwo, setDisplayTwo] = useState(null);
	
	const [axiosRes, setAxiosRes] = useState(null);
	const [axiosResGetWallet, setAxiosResGetWallet] = useState(null);
	
	// i have to use this hook because if i just put it inside the function
	// it doesnt update.

	useEffect(() => {
		setDisplayOne(balanceResponse);
	}, [axiosRes])

	useEffect(() => {
		setDisplayTwo(() => {return (axiosResGetWallet == null ? null : JSON.stringify(axiosResGetWallet.data))});
	}, [axiosResGetWallet])
	
	async function buttonPress() {
		let res;
		try { 
			res = await axios.post('http://localhost:443/gettokenbalance',
			{'address': addr});
		} catch {
			setDisplayOne("invalid address / request failed")
			return;
		}
		console.log(res.data);
		//setAddrBalance(res.data);
		console.log(addr);
		setAxiosRes(res);
		//setDisplay(balanceResponse);
	}
	
	async function generateWallet() {
		let res;
		try { 
			res = await axios.get('http://localhost:443/generatewallet');
		} catch {
			setDisplayTwo("invalid address / request failed")
			return;
		}
		console.log(res.data);
		setAxiosResGetWallet(res);
	}
	
	function balanceResponse() {
		return axiosRes == null ? null : `user ${addr} has ${axiosRes.data} tokens$`;
		//return axiosRes == null ? null : `user ${addr} has ${addrBalance} tokens$`;
		//return `user ${addr} has ${addrBalance} tokens$`;
	}
	
	return (
		<div className="App">
			Learning React
			<br/>
			It will say CORS request did not succeed if you do not open the 
			api at localhost:443
			<br/>
			<table><tbody>
				<tr>
					<td>
						<input type = "text" name = "inputtext" onChange = {(x) => {setAddr(x.target.value)}}/>
						<input type = "button" value = "query token balance" onClick = {buttonPress}/>
						<br/>
						{displayOne}
					</td>
					<td>
						<a href = "https://testnet.binance.org/faucet-smart">binance testnet faucet</a>
						<input type = "button" value = "generate my wallet" onClick = {generateWallet}/>
						{displayTwo}
					</td>
				</tr>
			</tbody></table>
		</div>
	);
}

export default App;
