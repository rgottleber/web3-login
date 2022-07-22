<script>
	import WalletConnect from '$lib/WalletConnect.svelte';
	import LocalSign from '$lib/LocalSign.svelte';
	export let web3Props = {
		provider: null,
		signer: null,
		account: null,
		chainId: null,
		contract: null
	};
</script>

{#if !web3Props.account}
	<WalletConnect bind:web3Props />
{:else}
	<LocalSign bind:web3Props />
{/if}
