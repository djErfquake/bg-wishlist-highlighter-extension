<!-- <script>
	import browser from "webextension-polyfill";
  
	let image = "https://images.unsplash.com/photo-1586074299757-dc655f18518c?fit=crop&w=1268&q=80";
  
	function change() {
		alert('changed!');
	  	browser.storage.local.set({ background: image });
	}
  </script>
  
  <main>
	Image URL: <input type="text" bind:value={image} />
	<button on:click={change}>Change</button>
  </main> -->

  <script>
	import browser from "webextension-polyfill";
	let username = "";
	let bgColor = "#FAB81B";
	let fgColor = "#000000";
  
	function change() {
		if (username != "") {
			browser.storage.local.set({ bggWishlistHighlightSettings: {
				username: username, 
				bgColor: bgColor, 
				fgColor: fgColor, 
				wishlist: [],
				update: true 
			}});
		}
	}
  </script>
  
  <main>
	BGG Username: <input type="text" bind:value={username} />
	Background Color: <input type="text" bind:value={bgColor} />
	Foreground Color: <input type="text" bind:value={fgColor} />
	<button on:click={change}>Update</button>
  </main>