<script lang="ts">
    let input = "";
    let searchError = "";
    let searching = false;
     type ResultType = 
        | "token"
        | "account"
        | "transaction"
        | null;

    interface Result { 
        url: string;
        address: string;
        type: ResultType;

    }
    const loadSearch = ({url}: Result) => 
    (window.location.href = url || "/");

    const selectSearch = (data: Result) => {
        loadSearch(data)
    }

    const search = async () => {
        searchError = "";
        searching = true;
        try  { 
        const response = await fetch(`/api/search/${input}`);
        console.log(response)
        const data = await response.json()
        console.log(data)

        if(!data || data.error) {
            alert("Search failed")
            return
        }
        selectSearch(data);
        } catch (error) {
            alert("Search failed.")
        }
       
    }

</script>

<div class="w-full mt-20">
    <input
	type="text"
	placeholder="Search accounts, tokens, and transactions."
	class="input m-auto rounded-lg flex my-2 input-bordered w-full max-w-md"
    bind:value={input}
/>
<button class="btn btn-bordered m-auto flex" on:click|preventDefault={search}> Search </button>
</div>
