# helloHardhatReact
Getting started with hardhat and react

1. start react app: 
cd client 
npm start

2. start local test bc from hardhat (use another terminal)
cd blockchain
(maybe you need to install hardhat ethers and waffle beforehand)
npx hardhat node

3. deploy greeter to your local bc (use another terminal)
npx hardhat run scripts/deploy.js --network localhost

4. install MetaMask (please use a chromium browser) and import an Account from your local bc
-> use a copy of one of the private keys from your local test blockchain to

---------
#when you run into following errors:

1. Nonce too high. Expected nonce to be 0 but got 19. Note that transactions can't be queued when automining.
-> Maybe you restarted your Blockchain? Know your Blockchain expect that the nonce is 0
-> go to metamask settings and change manuell the nonce 


2. Calling an Account which is not a contract
-> redeploy the contract
-> npx hardhat run scripts/deploy.js --network localhost 
