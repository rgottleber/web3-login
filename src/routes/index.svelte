<script>
	import { WalletConnect } from '@rgottleber/wallet-connect';
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
	<div class="grid h-screen place-items-center">
		<WalletConnect bind:web3Props />
	</div>
{:else}
	<LocalSign bind:web3Props />
{/if}
