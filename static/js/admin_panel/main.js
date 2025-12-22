function update_config() {
	const params = JSON.stringify({
		address: document.getElementById('address').value,
		phone: document.getElementById('phone').value,
		max_link: document.getElementById('max-link').value,
        wa_link: document.getElementById('wa-link').value,
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





function show_rm_question(q_id) {
	document.getElementById('rm_question_modal_title').innerText = `Подтвердите удаление вопроса #${q_id}`

	document.getElementById('confirm_rm_question_button').setAttribute('onclick', `confirm_rm_question(${q_id})`)
	document.getElementById('rm_question_modal').classList.add('active')
}

function hide_rm_question() {
	document.getElementById('rm_question_modal').classList.remove('active')
}

function confirm_rm_question(q_id) {
	const params = JSON.stringify({
		q_id: q_id
	})

	fetch(`/api/rm_question`, {
		method: 'POST',
		body: params
	})
	.then(response => response.json())
	.then(data => {

		document.getElementById(`question_${q_id}`).remove()
        hide_rm_question()

	})
}


function show_edit_question(q_id) {
	document.getElementById('edit_question_modal_title').innerText = `Подтвердите изменение вопроса #${q_id}`

	// Заполнение данных (которые есть на данный момент)
	fetch(`/api/get_question/${q_id}`)
	.then(response => response.json())
	.then(data => {

		document.getElementById('edited_question').value = data.question
		document.getElementById('edited_answer').value = data.answer

	})

	document.getElementById('confirm_edit_question_button').setAttribute('onclick', `confirm_edit_question(${q_id})`)
	document.getElementById('edit_question_modal').classList.add('active')
}

function hide_edit_question() {
	document.getElementById('edit_question_modal').classList.remove('active')
}

function confirm_edit_question(q_id) {
	const params = JSON.stringify({
		q_id: q_id,
		question: document.getElementById('edited_question').value,
		answer: document.getElementById('edited_answer').value
	})

	fetch(`/api/edit_question`, {
		method: 'POST',
		body: params
	})
	.then(response => response.json())
	.then(data => {

        window.location.reload()

	})
}


function show_add_question() {
	document.getElementById('add_question_modal_title').innerText = `Добавление частого вопроса`

	document.getElementById('confirm_add_question_button').setAttribute('onclick', `confirm_add_question()`)
	document.getElementById('add_question_modal').classList.add('active')
}

function hide_add_question() {
	document.getElementById('add_question_modal').classList.remove('active')
}

function confirm_add_question() {
	const params = JSON.stringify({
		question: document.getElementById('adding_question').value,
		answer: document.getElementById('adding_answer').value
	})

	fetch(`/api/add_question`, {
		method: 'POST',
		body: params
	})
	.then(response => response.json())
	.then(data => {

        window.location.reload()

	})
}





function show_rm_quest(q_id, q_name) {
	document.getElementById('rm_quest_modal_title').innerText = `Вы действительно хотите удалить квест ${q_name}?`

	document.getElementById('confirm_rm_quest_button').setAttribute('onclick', `confirm_rm_quest(${q_id})`)
	document.getElementById('rm_quest_modal').classList.add('active')
}

function hide_rm_quest() {
	document.getElementById('rm_quest_modal').classList.remove('active')
}

function confirm_rm_quest(q_id) {
	const params = JSON.stringify({
		q_id: q_id
	})

	fetch(`/api/rm_quest`, {
		method: 'POST',
		body: params
	})
	.then(response => response.json())
	.then(data => {

		document.getElementById(`quest_${q_id}`).remove()
        hide_rm_quest()

	})
}


function show_edit_quest(q_id, q_name) {

	fetch(`/api/get_quest/${q_id}`)
	.then(response => response.json())
	.then(data => {

		document.getElementById(`edited_title`).value = data.title
		document.getElementById(`edited_desc`).value = data.desc
		document.getElementById(`edited_desc2`).value = data.subdesc

		if (data.is_active) {
			document.getElementById(`edited_activity`).checked = true
		}
	})


	document.getElementById('edit_quest_modal_title').innerText = `Редактирование квеста ${q_name}?`

	document.getElementById('confirm_edit_quest_button').setAttribute('onclick', `confirm_edit_quest(${q_id})`)
	document.getElementById('edit_quest_modal').classList.add('active')
}

function hide_edit_quest() {
	document.getElementById('edit_quest_modal').classList.remove('active')
}

function confirm_edit_quest(q_id) {
	const formData = new FormData();

    // Добавляем текстовые данные
    formData.append('quest_id', q_id);
	formData.append('title', document.getElementById('edited_title').value);
    formData.append('description', document.getElementById('edited_desc').value);
    formData.append('additional_description', document.getElementById('edited_desc2').value);
    formData.append('is_active', document.getElementById('edited_activity').checked ? 'true' : 'false');

    // Добавляем файл, если выбран
    const fileInput = document.getElementById('custom-file-input-1');
    if (fileInput.files.length > 0) {
        formData.append('image', fileInput.files[0]);
    }

    // Отправка данных на сервер
    fetch('/api/edit_quest', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {

		if (data.success) {
			window.location.reload()
		}

    })
}


function show_add_quest() {
	document.getElementById('add_quest_modal_title').innerText = `Добавление нового квеста`

	document.getElementById('confirm_add_quest_button').setAttribute('onclick', `confirm_add_quest()`)
	document.getElementById('add_quest_modal').classList.add('active')
}

function hide_add_quest() {
	document.getElementById('add_quest_modal').classList.remove('active')
}

function confirm_add_quest() {
	const formData = new FormData();

    // Добавляем текстовые данные
	formData.append('title', document.getElementById('edited_title').value);
    formData.append('description', document.getElementById('edited_desc').value);
    formData.append('additional_description', document.getElementById('edited_desc2').value);
    formData.append('is_active', document.getElementById('edited_activity').checked ? 'true' : 'false');

    // Добавляем файл, если выбран
    const fileInput = document.getElementById('custom-file-input-1');
    if (fileInput.files.length > 0) {
        formData.append('image', fileInput.files[0]);
    }

    // Отправка данных на сервер
    fetch('/api/edit_quest', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {

		if (data.success) {
			window.location.reload()
		}

    })
}








document.getElementById('custom-file-input-1').addEventListener('change', function(e) {
  const fileName = e.target.files[0]?.name || 'Файл не выбран';
  document.getElementById('custom-file-label-1').textContent = 'Выбран: ' + fileName;
});

document.getElementById('custom-file-input-2').addEventListener('change', function(e) {
  const fileName = e.target.files[0]?.name || 'Файл не выбран';
  document.getElementById('custom-file-label-2').textContent = 'Выбран: ' + fileName;
});
