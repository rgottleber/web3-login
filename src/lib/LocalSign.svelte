<script>
	import { ethers } from 'ethers';
	import { fly } from 'svelte/transition';

	export let web3Props = {
		provider: null,
		signer: null,
		account: null,
		chainId: null,
		contract: null
	};
	$: nonce = Math.floor(Math.random() * 1000000);
	$: signature = '';
	$: truncSignature = '';
	$: valid = false;
	$: address = '';
	$: flipped = false;
	$: final = false;

	async function signAndVerify() {
		signature = await web3Props.signer.signMessage(`Signing one-time nonce: ${nonce}`);
		truncSignature = signature.slice(0, 38) + '...';
		address = ethers.utils.verifyMessage(`Signing one-time nonce: ${nonce}`, await signature);
		valid = address === web3Props.account;
		nonce = Math.floor(Math.random() * 1000000);
	}
</script>

<div class="grid place-content-center pt-11">
	{#if !flipped}
		<div
			class="card  bg-base-100 shadow-xl"
			in:fly={{ duration: 200, x: 100 }}
			out:fly={{ duration: 100, x: -100 }}
		>
			<figure><img src="https://placeimg.com/400/225/arch" alt="Shoes" /></figure>
			<div class="card-body">
				<h2 class="card-title">Your Public Address:</h2>
				<p>{web3Props.account}</p>
				<p>When you sign in, I can see your public address!</p>
				<div class="card-actions justify-end">
					<button class="btn btn-primary" on:click={() => (flipped = !flipped)}>Next</button>
				</div>
			</div>
		</div>
	{:else if !signature}
		<div
			class="card bg-base-100 shadow-xl"
			in:fly={{ delay: 100, duration: 200, x: 100 }}
			out:fly={{ duration: 100, x: -100 }}
		>
			<figure><img src="https://placeimg.com/400/225/arch" alt="Shoes" /></figure>
			<div class="card-body">
				<h2 class="card-title">Your Address:</h2>
				<p>{web3Props.account}</p>
				<h2 class="card-title">Random Nonce</h2>
				<p>{nonce}</p>
				<p>By signing this one time number you are verifying your identity</p>
				<div class="card-actions justify-end">
					<button class="btn btn-primary" on:click={signAndVerify}>Sign</button>
				</div>
			</div>
		</div>
	{/if}
	{#if signature && !final}
		<div
			class="card bg-base-100 shadow-xl"
			in:fly={{ delay: 100, duration: 200, x: 100 }}
			out:fly={{ duration: 100, x: -100 }}
		>
			<figure><img src="https://placeimg.com/400/225/arch" alt="Shoes" /></figure>
			<div class="card-body">
				<h2 class="card-title">Your Signature:</h2>
				<p>{truncSignature}</p>
				<h2 class="card-title">Random Nonce</h2>
				<p>{nonce}</p>
				<p>By signing this one time number you are verifying your identity</p>
				<div class="card-actions justify-end">
					<button class="btn btn-primary" on:click={(final = !final)}>Next</button>
				</div>
			</div>
		</div>
	{/if}
</div>
