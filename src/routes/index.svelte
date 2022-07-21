<script>
	import WalletConnect from '$lib/WalletConnect.svelte';
	export let web3Props = {
		provider: null,
		signer: null,
		account: null,
		chainId: null,
		contract: null
	};
</script>

<WalletConnect bind:web3Props />

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
