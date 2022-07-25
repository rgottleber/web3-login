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
	let valid = null;
	$: address = '';
	$: step = 0;
	const expectedAddr = '0x007E2e8D8CF1C50291943a805b7CdAe8ae8EfaaE';
	function nextStep() {
		step++;
	}
	async function sign() {
		signature = await web3Props.signer.signMessage(`Signing one-time nonce: ${nonce}`);
		truncSignature = signature.slice(0, 38) + '...';

		nextStep();
	}
	function verify() {
		console.log('verifying...');
		address = ethers.utils.verifyMessage(`Signing one-time nonce: ${nonce}`, signature);
		valid = address === expectedAddr;
		nextStep();
	}
	async function reset() {
		nonce = Math.floor(Math.random() * 1000000);
		signature = '';
		truncSignature = '';
		valid = null;
		address = '';
		web3Props.account = await web3Props.signer.getAddress();
		step = 0;
	}
	nonce = Math.floor(Math.random() * 1000000);
</script>

{step}
<div class="grid place-content-center pt-11">
	{#if step === 0}
		<div
			class="card  bg-base-100 shadow-xl"
			in:fly={{ duration: 200, x: 100 }}
			out:fly={{ duration: 100, x: -100 }}
		>
			<figure><img src="https://placeimg.com/400/225/arch" alt="Random" /></figure>
			<div class="card-body">
				<h2 class="card-title">Your Public Address:</h2>
				<p>{web3Props.account}</p>
				<p>When you sign in, I can see your public address!</p>
				<h2 class="card-title">The Address I'm expecting</h2>
				<p>{expectedAddr}</p>

				<div class="card-actions justify-end">
					<button class="btn btn-primary" on:click={nextStep}>Next</button>
				</div>
			</div>
		</div>
	{:else if step === 1}
		<div
			class="card bg-base-100 shadow-xl"
			in:fly={{ delay: 100, duration: 200, x: 100 }}
			out:fly={{ duration: 100, x: -100 }}
		>
			<figure><img src="https://placeimg.com/400/225/arch" alt="Random" /></figure>
			<div class="card-body">
				<h2 class="card-title">Your Address:</h2>
				<p>{web3Props.account}</p>
				<h2 class="card-title">Random Nonce</h2>
				<p>{nonce}</p>
				<p>By signing this one time number you are verifying your identity</p>
				<div class="card-actions justify-end">
					<button class="btn btn-secondary" on:click={sign}>Sign</button>
				</div>
			</div>
		</div>
	{:else if step === 2}
		<div
			class="card bg-base-100 shadow-xl"
			in:fly={{ delay: 100, duration: 200, x: 100 }}
			out:fly={{ duration: 100, x: -100 }}
		>
			<figure><img src="https://placeimg.com/400/225/arch" alt="Random" /></figure>
			<div class="card-body">
				<h2 class="card-title">Your Signature:</h2>
				<p>{truncSignature}</p>
				<p>
					Using this signature and the message you signed I can verify if you are the right person
				</p>
				<div class="card-actions justify-end">
					<button class="btn btn-primary" on:click={nextStep}>Next</button>
				</div>
			</div>
		</div>
	{:else if step >= 3}
		<div
			class="card bg-base-100 shadow-xl"
			in:fly={{ delay: 100, duration: 200, x: 100 }}
			out:fly={{ duration: 100, x: -100 }}
		>
			<figure><img src="https://placeimg.com/400/225/arch" alt="Random" /></figure>
			<div class="card-body">
				<h2 class="card-title">Your Signature:</h2>
				<p>{truncSignature}</p>
				<h2 class="card-title">Expected Address:</h2>
				<p>{expectedAddr}</p>
				<h2 class="card-title">Random Nonce</h2>
				<p>{nonce}</p>
				<p>
					Using the message and signature, I can derive the address that signed it. If it matches
					expected you are good to go!
				</p>
				<div class="card-actions">
					<div class="stat">
						<div class="stat-title">Account Verrified</div>
						{#if valid}
							<div class="stat-value text-primary">Valid Address</div>
						{:else if valid !== null}
							<div class="stat-value text-secondary">Invalid Address</div>
						{/if}
						{#if step === 3}
							<div class="stat-actions">
								<button class="btn btn-sm btn-success" on:click={verify}>Verify Signature</button>
							</div>
						{/if}
						{#if step === 4}
							<div class="stat-value text-primary">
								<button class="btn btn-primary" on:click={reset}>Start Over</button>
							</div>
						{/if}
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>
