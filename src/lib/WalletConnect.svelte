<script>
	import { ethers } from 'ethers';
	export let web3Props = {
		provider: null,
		signer: null,
		account: null,
		chainId: null,
		contract: null
	};
	export let contractAbi;
	export let contractAddr;

	async function connectWallet() {
		let provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
		await provider.send('eth_requestAccounts', []);
		const signer = provider.getSigner();
		const account = await signer.getAddress();
		const chainId = await signer.getChainId();
		const contract = '';
		// const contract = new ethers.Contract(contractAddr, contractAbi.abi, signer);
		web3Props = { signer, provider, chainId, account };
		console.log(web3Props);
	}
	async function signAndVerify() {
		let nonce = Math.floor(Math.random() * 1000000);
		let signed = web3Props.signer.signMessage(`Signing one-time nonce: ${nonce}`);
		console.log('MSG: ', await signed);
		let valid =
			ethers.utils.verifyMessage(`Signing one-time nonce: ${nonce}`, await signed) ===
			web3Props.account;
		console.log('VALID: ', valid);
	}
</script>

{#if !web3Props.account}
	<div class="grid h-screen place-items-center">
		<button class="btn" on:click={connectWallet}>Attach Wallet</button>
	</div>
{/if}
<button on:click={signAndVerify}>Sign</button>
