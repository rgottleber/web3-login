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
	let expectedAddr;
	const notYourAddr = '0x859E2e8D8CF1C50291943a493b7CdAe8ae8EEaa';
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

<div class="grid place-content-center pt-11">
	{#if step === 0}
		<div
			class="card  bg-base-100 shadow-xl max-w-xl"
			in:fly={{ duration: 200, x: 100 }}
			out:fly={{ duration: 100, x: -100 }}
		>
			<figure><img src="https://placeimg.com/400/225/arch" alt="Random" /></figure>
			<div class="card-body">
				<h2 class="card-title">Your Public Address:</h2>
				<p>{web3Props.account}</p>
				<p />
				<p>
					When you sign in, I can see your public address. Choosing your address will take you
					through a successful sign in process. Choosing Not Your Address will show you what happens
					when sign in fails
				</p>
				<h2 class="card-title">The Address I'm expecting:</h2>
				<p>{expectedAddr != 'Select Address' ? expectedAddr : ''}</p>
				<select class="select select-primary w-full max-w-xs" bind:value={expectedAddr}>
					<option disabled selected>Select Address</option>
					<option value={web3Props.account}>Your Address</option>
					<option value={notYourAddr}>Not Your Address</option>
				</select>

				<div class="card-actions justify-end">
					<button
						class="btn btn-primary"
						on:click={nextStep}
						disabled={expectedAddr === 'Select Address'}>Next</button
					>
				</div>
			</div>
		</div>
	{:else if step === 1}
		<div
			class="card bg-base-100 shadow-xl max-w-xl"
			in:fly={{ delay: 100, duration: 200, x: 100 }}
			out:fly={{ duration: 100, x: -100 }}
		>
			<figure><img src="https://placeimg.com/400/225/arch" alt="Random" /></figure>
			<div class="card-body">
				<h2 class="card-title">Random Message with Nonce</h2>
				<p>Signing one-time nonce: {nonce}</p>
				<p>
					Using your private key, you can sign this random nonce, a one time use number. It will
					allow you to create a single use signature which can only be created by you! The signature
					is unique based on your private key and the data passed in. In this case the message
					above.
				</p>
				<div class="card-actions justify-end">
					<button class="btn btn-secondary" on:click={sign}>Sign</button>
				</div>
			</div>
		</div>
	{:else if step === 2}
		<div
			class="card bg-base-100 shadow-xl max-w-xl"
			in:fly={{ delay: 100, duration: 200, x: 100 }}
			out:fly={{ duration: 100, x: -100 }}
		>
			<figure><img src="https://placeimg.com/400/225/arch" alt="Random" /></figure>
			<div class="card-body">
				<p>
					When you signed, you generated this signature. It's a unique combination of your private
					key and the message you signed.
				</p>
				<h2 class="card-title">Your Signature:</h2>
				<p class="break-words">{signature}</p>
				<div class="card-actions justify-end">
					<button class="btn btn-primary" on:click={nextStep}>Next</button>
				</div>
			</div>
		</div>
	{:else if step >= 3}
		<div
			class="card bg-base-100 shadow-xl max-w-xl"
			in:fly={{ delay: 100, duration: 200, x: 100 }}
			out:fly={{ duration: 100, x: -100 }}
		>
			<figure><img src="https://placeimg.com/400/225/arch" alt="Random" /></figure>
			<div class="card-body">
				<p>
					Using the message and signature, I can derive the address that signed it. If it matches
					expected you are good to go!
				</p>
				<h2 class="card-title">Message Signed:</h2>
				<p>Signing one-time nonce: {nonce}</p>
				<h2 class="card-title">Your Signature:</h2>
				<p class="break-words">{signature}</p>
				<h2 class="card-title">Expected Address:</h2>
				<p>{expectedAddr}</p>
				<h2 class="card-title">Derived Address:</h2>
				<p>{address ? address : 'Verify Signature 👇'}</p>
				<div class="card-actions">
					<div class="stat">
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
