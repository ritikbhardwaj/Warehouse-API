$('document').ready(() => {
	//click event listener
	$('.product').click((e) => {
		let sku = e.currentTarget.children
			.item(0)
			.children.item(0)
			.innerText.slice(1);
		fetchhandler(sku);
	});
	//fetch handlers
	function fetchhandler(sku) {
		$('.content-2').html(`<h1 class="loading">loading...</h1>`);
		fetch('http://minor-project-api.herokuapp.com/api/products/' + sku)
			.then((response) => response.json())
			.then((data) => {
				let html = `
                <h3 class="title">${data[0].title}<span class="sku">#${data[0].SKU}</span></h3>
                <p class="description">${data[0].description}</p>
                <div class="info">
                    <p class="qty info-item"><span class="key">Quantity</span> - ${data[0].quantity}</p>
                    <p class="da info-item"><span class="key">Date Added</span> - ${data[0].dateAdded}</p>
                </div>
                <div class="img-container"></div>
                <div class="buttons">
                    <button class="update">Update</button>
                    <button class="delete">Delete</button>
                </div> 
                `;
				$('.content-2').html(html);
			})
			.catch((err) => {
				$('.content-2').html(
					`<h1 style='font-size: 20px;font-weight: 300;position:relative; left: 50%; top: 50%;'>${err} - Session Expired!</h1>`
				);
				alert('Session Expired! Click done to go to login.');
				window.location.replace(
					'http://minor-project-api.herokuapp.com/auth/login'
				);
			});
	}
});
