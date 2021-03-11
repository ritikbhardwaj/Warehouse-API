let URI = 'http://localhost:3000';
//fetch handlers
function fetchSingleProduct(sku) {
	$('.content-2').html(`<h1 class="loading">loading...</h1>`);
	fetch(URI + '/api/products/' + sku)
		.then((response) => response.json())
		.then((data) => {
			if (data.err) {
				let html = `<p
					style="
						color: black;
						margin: 0 auto;
						font-weight: 500;
						font-size: 15px;
						position: relative;
						left: 50%;
						top: 20%;
					"
				>
					Click on a product to see details
				</p>`;
				$('.content-2').html(html);
			} else {
				let html = `
						<h3 class="title">${data[0].title}<span class="sku">#${data[0].SKU}</span></h3>
						<p class="description">${data[0].description}</p>
						<div class="info">
							<p class="qty info-item"><span class="key">Quantity</span> - ${data[0].quantity}</p>
							<p class="price info-item"><span class="key">Price</span> - ${data[0].price}</p>
							<p class="da info-item"><span class="key">Date Added</span> - ${data[0].dateAdded}</p>
						</div>
						<div class="img-container"></div>
						<div class="buttons">
							<button class="update" onClick=onClickUpdate(this) >Update</button>
							<button class="delete" onClick=onClickDelete(this)>Delete</button>
						</div> 
                `;
				$('.content-2').html(html);
			}
		})
		.catch((err) => {
			$('.content-2').html(
				`<h1 style='font-size: 20px;font-weight: 300;position:relative; left: 50%; top: 50%;'>${err} - Session Expired!</h1>`
			);
			alert('Session Expired! Click done to go to login.');
			window.location.replace(URI + '/auth/login');
		});
}

function onClickRefresh() {
	$('.content-1').html(
		'<h3 style="color: black; font-weight: 200; margin: 0 auto;">loading</h3>'
	);
	fetch(URI + '/api/products')
		.then((response) => response.json())
		.then((data) => {
			let html = '';
			data.forEach((product) => {
				html += `
					<div class="product" onClick="onClickProduct(this)">
						<p class="title">
							${product.title}<span class="sku">#${product.SKU}</span>
						</p>
						<p class="quantity">
							${product.quantity}<span class="pcs">/pcs</span>
						</p>
						<p class="price">₹${product.price}</p>
					</div>
					`;
			});
			$('.content-1').html(html);
		})
		.catch((err) => console.err(err));
}

function onClickLogout() {
	fetch(URI + '/api/auth/logout')
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			console.log(data);
			window.location.replace(URI + '/');
		})
		.catch((err) => {
			console.err(err);
		});
}

function updateHandler(sku, updateObj) {
	let data = { SKU: sku, updateObj };
	fetch(URI + '/api/products', {
		method: 'PUT', // or 'PUT'
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
		.then((response) => response.json())
		.then((data) => {
			$('.new').hide();
			$('.cover').hide();
			onClickRefresh();
			fetchSingleProduct(sku);
			// window.location.replace(URI + '/console');
		})
		.catch((error) => {
			console.error(error);
		});
}

function onClickDelete() {
	let sku = $('.content-2 span.sku').html().slice(1);

	fetch(URI + '/api/products/' + sku, {
		method: 'DELETE', // or 'PUT'
	})
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			onClickRefresh();
			fetchSingleProduct('34534'); //fetch some random product that does not exist
		})
		.catch((error) => {
			console.error(error);
		});
}

function onClickUpdate() {
	$('.new').fadeIn();
	$('.cover').fadeIn();
	let sku = $('.content-2 span.sku').html().slice(1);
	fetch(URI + '/api/products/' + sku)
		.then((response) => response.json())
		.then((data) => {
			$('.new input#name').attr('placeholder', data[0].title);
			$('.new input#quantity').attr('placeholder', data[0].quantity);
			$('.new input#price').attr('placeholder', data[0].price);
			$('.new textarea#description').attr(
				'placeholder',
				data[0].description
			);
		});
	$('.new button.update').click((e) => {
		(title = $('.new input#name').val()),
			(quantity = $('.new input#quantity').val()),
			(price = $('.new input#price').val()),
			(description = $('.new textarea#description').val());
		let updateObj = {
			title,
			quantity,
			price,
			description,
		};
		updateHandler(sku, updateObj);
	});
}

function onClickProduct(e) {
	let sku = e.children.item(0).children.item(0).innerText.slice(1);
	fetchSingleProduct(sku);
}

$('document').ready(() => {
	//intial setup
	$('.new').hide();
	$('.cover').hide();

	// //click event listener
	// $('.product').click((e) => {
	// 	let sku = e.currentTarget.children
	// 		.item(0)
	// 		.children.item(0)
	// 		.innerText.slice(1);
	// 	console.log(sku);
	// 	fetchSingleProduct(sku);
	// });

	$('.cover').click(() => {
		$('.new').fadeOut();
		$('.cover').fadeOut();
	});
});
