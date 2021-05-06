import React, { useState } from 'react';
import Greeter from '../artifacts/contracts/Greeter.sol/Greeter.json';
import { ethers } from 'ethers'

function Home() {

    const greeterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const [greeting, setNewGreeting] = useState('');
    const [outputText, setOutputText ] = useState('');

    async function requestAccount(){
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log("called requestAccount");
    }

    async function getGreeting(){
        if(typeof window.ethereum !== 'undefined'){
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            console.log({provider});
            const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider)
            try{
                const data = await contract.greet()
                console.log("data: ", data)
                setOutputText(data);
            } catch (err){
                console.log("err: ",err)
                setOutputText(err);
            }
        }
    }


    async function setGreeting(){
        
        if(!greeting) return
        if(typeof window.ethereum !== 'undefined') { 
            await requestAccount()
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            console.log({provider});
            const signer = provider.getSigner()
            const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer)
            const transaction = await contract.setGreeting(greeting)
            await transaction.wait()
            getGreeting();
        }
    }

    return (
        <div>
            <div>
                <div className="Headline">
                <h1>Hello React &amp; Hardhat</h1>
                </div>
                <div className="Greeter">
                <input onChange={e => setNewGreeting(e.target.value)} ></input>
                <button onClick={setGreeting}>Save Greeting</button>
                <button onClick={getGreeting}>Show Greeting</button>
                </div>
                <div>
                    {outputText}
                </div>
            </div>
        </div>
    )
}

export default Home
