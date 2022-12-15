import {useState} from 'react';
import {ethers, BigNumber} from 'ethers';
import RoboPunkNFT from "./RoboPunkNFT";

const roboPunkNFTAddress = "0x416Def2B2752558b672f2266929936CBB8Ad454f";

const MainMint = ({accounts, setAccounts}) =>{

    const isConnected = Boolean(accounts[0])
    const [mintAmount, setMintAmount] = useState(1);

    async function handleMint(){
        if(window.ethereum){
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            
            const signer = provider.getSigner();
            const contract = new ethers.Contract(roboPunkNFTAddress, RoboPunkNFT.abi, signer);
            try{
                const response = await contract.mint(
                    BigNumber.from(mintAmount),
                    {value : ethers.utils.parseEther((0.02 * mintAmount).toString()),
                });
                console.log("response : ", response);
            }catch(err){
                console.log("erreur : "+ err);
            }
           
            const myAddress = await signer.getAddress()
            alert(myAddress)
        }

       
    }

    const handleDecrement = () => {
        if(mintAmount <= 1)
            return;
        setMintAmount(mintAmount - 1);
    };

    const handleIncrement = () => {
        if(mintAmount >= 3)
            return;
        setMintAmount(mintAmount +1);
    }

    return (
        <div>
            <h1>RoboPunks</h1>
            <p>Description of project</p>
            {isConnected ? (
                <div>
                    <div>
                        <button onClick={handleDecrement}>-</button>
                        <input type="number" value={mintAmount}/>
                        <button onClick={handleIncrement}>+</button>
                    </div>
                    <button onClick={handleMint()}>Mint Now</button>
                </div>
            ) : (
                <p>you're not connected yet.</p>
            )}
        </div>
    )
}

export default MainMint;