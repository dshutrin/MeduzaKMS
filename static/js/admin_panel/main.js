function update_config() {
	const params = JSON.stringify({
		address: document.getElementById('address').value,
		email: document.getElementById('email').value,
		phone: document.getElementById('phone').value,
		reviews_link: document.getElementById('reviews-link').value,
		social_link: document.getElementById('social-link').value,
		work_hours: document.getElementById('work-hours').value,
		description: document.getElementById('description').value,
		roles: document.getElementById('roles').value,
		reserv_roles: document.getElementById('reserv_roles').value,
		arenda: document.getElementById('arenda').value
	})

	fetch(`/update_config`, {
		method: 'POST',
		body: params
	})
	.then(response => response.json())
	.then(data => {

		if (data.success) {
			console.log('success update')
		} else {
			alert('Не удалось сохранить данные!')
		}

	})
}
