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





function show_rm_question(q_id) {
	document.getElementById('rm_question_modal_title').innerText = `Подтвердите удаление вопроса #${q_id}`

	document.getElementById('confirm_rm_question_button').setAttribute('onclick', `confirm_rm_question(${q_id})`)
	document.getElementById('rm_question_modal').classList.add('active')
}

function hide_rm_question() {
	document.getElementById('rm_question_modal').classList.remove('active')
}

function confirm_rm_question(q_id) {
	console.log('Удаляем вопрос')
}


function show_edit_question(q_id) {
	document.getElementById('edit_question_modal_title').innerText = `Подтвердите изменение вопроса #${q_id}`

	document.getElementById('confirm_edit_question_button').setAttribute('onclick', `confirm_edit_question(${q_id})`)
	document.getElementById('edit_question_modal').classList.add('active')
}

function hide_edit_question() {
	document.getElementById('edit_question_modal').classList.remove('active')
}

function confirm_edit_question(q_id) {
	console.log(`Сохраняем изменения вопроса #${q_id}`)
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
	console.log(`Создали новый вопрос`)
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
	console.log(`rm quest ${q_id}`)
}


function show_edit_quest(q_id, q_name) {
	document.getElementById('edit_quest_modal_title').innerText = `Редактирование квеста ${q_name}?`

	document.getElementById('confirm_edit_quest_button').setAttribute('onclick', `confirm_edit_quest(${q_id})`)
	document.getElementById('edit_quest_modal').classList.add('active')
}

function hide_edit_quest() {
	document.getElementById('edit_quest_modal').classList.remove('active')
}

function confirm_edit_quest(q_id) {
	console.log(`edit quest ${q_id}`)
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
	console.log(`add quest`)
}




















// =========== ФОРМА 1 ===========
document.addEventListener('DOMContentLoaded', function() {
    // Элементы формы 1
    const fileUpload1 = document.querySelector('.file-upload--1');
    const input1 = document.getElementById('edited_photo_1');
    const fileInfo1 = document.querySelector('.file-info--1');
    const fileName1 = fileInfo1.querySelector('.file-info__name');
    const fileSize1 = fileInfo1.querySelector('.file-info__size');
    const removeBtn1 = fileInfo1.querySelector('.file-info__remove');
    const errorDiv1 = document.querySelector('.file-upload__error--1');
    const uploadArea1 = fileUpload1.querySelector('.file-upload__area');

    // Настройки
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

    // События для формы 1
    input1.addEventListener('change', (e) => handleFileSelect(e, 1));
    removeBtn1.addEventListener('click', () => removeFile(1));

    // Drag and drop для формы 1
    uploadArea1.addEventListener('dragover', (e) => handleDragOver(e, 1));
    uploadArea1.addEventListener('dragleave', (e) => handleDragLeave(e, 1));
    uploadArea1.addEventListener('drop', (e) => handleDrop(e, 1));

    // Функции для формы 1
    function handleFileSelect(e, formNumber) {
        const file = e.target.files[0];
        if (file) {
            processFile(file, formNumber);
        }
    }

    function handleDrop(e, formNumber) {
        e.preventDefault();
        e.stopPropagation();
        const uploadArea = document.querySelector(`.file-upload--${formNumber} .file-upload__area`);
        uploadArea.classList.remove('drag-over');

        const file = e.dataTransfer.files[0];
        if (file) {
            processFile(file, formNumber);
        }
    }

    function handleDragOver(e, formNumber) {
        e.preventDefault();
        e.stopPropagation();
        const uploadArea = document.querySelector(`.file-upload--${formNumber} .file-upload__area`);
        uploadArea.classList.add('drag-over');
    }

    function handleDragLeave(e, formNumber) {
        e.preventDefault();
        e.stopPropagation();
        const uploadArea = document.querySelector(`.file-upload--${formNumber} .file-upload__area`);
        uploadArea.classList.remove('drag-over');
    }

    function processFile(file, formNumber) {
        // Проверка размера
        if (file.size > MAX_FILE_SIZE) {
            showError('Файл слишком большой. Максимальный размер: 5MB', formNumber);
            return;
        }

        // Проверка типа файла
        if (!ALLOWED_TYPES.includes(file.type)) {
            showError('Неподдерживаемый формат файла. Используйте JPG, PNG, GIF или WebP', formNumber);
            return;
        }

        hideError(formNumber);

        const fileUpload = document.querySelector(`.file-upload--${formNumber}`);
        const fileInfo = document.querySelector(`.file-info--${formNumber}`);
        const fileName = fileInfo.querySelector('.file-info__name');
        const fileSize = fileInfo.querySelector('.file-info__size');

        // Обновляем информацию о файле
        fileName.textContent = truncateFilename(file.name, 30);
        fileSize.textContent = formatFileSize(file.size);

        // Показываем информацию о файле, скрываем область загрузки
        fileUpload.classList.add('has-file');

        // Сохраняем в localStorage (опционально)
        saveFileInfoToStorage(file.name, file.size, formNumber);
    }

    function removeFile(formNumber) {
        const fileUpload = document.querySelector(`.file-upload--${formNumber}`);
        const input = document.getElementById(`edited_photo_${formNumber}`);
        const fileInfo = document.querySelector(`.file-info--${formNumber}`);
        const fileName = fileInfo.querySelector('.file-info__name');
        const fileSize = fileInfo.querySelector('.file-info__size');

        input.value = '';
        fileUpload.classList.remove('has-file');
        fileName.textContent = '';
        fileSize.textContent = '';
        hideError(formNumber);
        removeFileInfoFromStorage(formNumber);
    }

    function showError(message, formNumber) {
        const errorDiv = document.querySelector(`.file-upload__error--${formNumber}`);
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        setTimeout(() => hideError(formNumber), 5000);
    }

    function hideError(formNumber) {
        const errorDiv = document.querySelector(`.file-upload__error--${formNumber}`);
        errorDiv.style.display = 'none';
    }

    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    function truncateFilename(filename, maxLength = 30) {
        if (filename.length <= maxLength) return filename;
        const extension = filename.split('.').pop();
        const name = filename.substring(0, filename.lastIndexOf('.'));
        const truncatedName = name.substring(0, maxLength - extension.length - 3);
        return truncatedName + '...' + extension;
    }

    function saveFileInfoToStorage(name, size, formNumber) {
        try {
            const fileInfo = {
                name: name,
                size: size,
                date: new Date().toISOString()
            };
            localStorage.setItem(`fileInfo_${formNumber}`, JSON.stringify(fileInfo));
        } catch (e) {
            console.warn('Не удалось сохранить информацию о файле:', e);
        }
    }

    function removeFileInfoFromStorage(formNumber) {
        try {
            localStorage.removeItem(`fileInfo_${formNumber}`);
        } catch (e) {
            console.warn('Не удалось удалить информацию о файле:', e);
        }
    }

    function loadFileInfoFromStorage(formNumber) {
        try {
            const savedInfo = localStorage.getItem(`fileInfo_${formNumber}`);
            if (savedInfo) {
                const fileInfo = JSON.parse(savedInfo);
                const fileUpload = document.querySelector(`.file-upload--${formNumber}`);
                const fileInfoDiv = document.querySelector(`.file-info--${formNumber}`);
                const fileName = fileInfoDiv.querySelector('.file-info__name');
                const fileSize = fileInfoDiv.querySelector('.file-info__size');

                fileName.textContent = truncateFilename(fileInfo.name, 30);
                fileSize.textContent = formatFileSize(fileInfo.size);
                fileUpload.classList.add('has-file');
            }
        } catch (e) {
            console.warn('Не удалось загрузить информацию о файле:', e);
        }
    }

    // Загружаем сохраненную информацию при старте (раскомментировать если нужно)
    // loadFileInfoFromStorage(1);
});






// =========== ФОРМА 2 ===========
document.addEventListener('DOMContentLoaded', function() {
    // Элементы формы 2
    const fileUpload2 = document.querySelector('.file-upload--2');
    const input2 = document.getElementById('edited_photo_2');
    const fileInfo2 = document.querySelector('.file-info--2');
    const fileName2 = fileInfo2.querySelector('.file-info__name');
    const fileSize2 = fileInfo2.querySelector('.file-info__size');
    const removeBtn2 = fileInfo2.querySelector('.file-info__remove');
    const errorDiv2 = document.querySelector('.file-upload__error--2');
    const uploadArea2 = fileUpload2.querySelector('.file-upload__area');

    // Настройки
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

    // События для формы 2
    input2.addEventListener('change', function(e) {
        handleFileSelect2(e);
    });

    removeBtn2.addEventListener('click', function() {
        removeFile2();
    });

    // Drag and drop для формы 2
    uploadArea2.addEventListener('dragover', function(e) {
        handleDragOver2(e);
    });

    uploadArea2.addEventListener('dragleave', function(e) {
        handleDragLeave2(e);
    });

    uploadArea2.addEventListener('drop', function(e) {
        handleDrop2(e);
    });

    // Функции для формы 2
    function handleFileSelect2(e) {
        const file = e.target.files[0];
        if (file) {
            processFile2(file);
        }
    }

    function handleDrop2(e) {
        e.preventDefault();
        e.stopPropagation();
        uploadArea2.classList.remove('drag-over');

        const file = e.dataTransfer.files[0];
        if (file) {
            processFile2(file);
        }
    }

    function handleDragOver2(e) {
        e.preventDefault();
        e.stopPropagation();
        uploadArea2.classList.add('drag-over');
    }

    function handleDragLeave2(e) {
        e.preventDefault();
        e.stopPropagation();
        uploadArea2.classList.remove('drag-over');
    }

    function processFile2(file) {
        // Проверка размера
        if (file.size > MAX_FILE_SIZE) {
            showError2('Файл слишком большой. Максимальный размер: 5MB');
            return;
        }

        // Проверка типа файла
        if (!ALLOWED_TYPES.includes(file.type)) {
            showError2('Неподдерживаемый формат файла. Используйте JPG, PNG, GIF или WebP');
            return;
        }

        hideError2();

        // Обновляем информацию о файле
        fileName2.textContent = truncateFilename2(file.name, 30);
        fileSize2.textContent = formatFileSize2(file.size);

        // Показываем информацию о файле, скрываем область загрузки
        fileUpload2.classList.add('has-file');

        // Сохраняем в localStorage (опционально)
        saveFileInfoToStorage2(file.name, file.size);
    }

    function removeFile2() {
        input2.value = '';
        fileUpload2.classList.remove('has-file');
        fileName2.textContent = '';
        fileSize2.textContent = '';
        hideError2();
        removeFileInfoFromStorage2();
    }

    function showError2(message) {
        errorDiv2.textContent = message;
        errorDiv2.style.display = 'block';
        setTimeout(hideError2, 5000);
    }

    function hideError2() {
        errorDiv2.style.display = 'none';
    }

    function formatFileSize2(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    function truncateFilename2(filename, maxLength = 30) {
        if (filename.length <= maxLength) return filename;
        const extension = filename.split('.').pop();
        const name = filename.substring(0, filename.lastIndexOf('.'));
        const truncatedName = name.substring(0, maxLength - extension.length - 3);
        return truncatedName + '...' + extension;
    }

    function saveFileInfoToStorage2(name, size) {
        try {
            const fileInfo = {
                name: name,
                size: size,
                date: new Date().toISOString()
            };
            localStorage.setItem('fileInfo_2', JSON.stringify(fileInfo));
        } catch (e) {
            console.warn('Не удалось сохранить информацию о файле:', e);
        }
    }

    function removeFileInfoFromStorage2() {
        try {
            localStorage.removeItem('fileInfo_2');
        } catch (e) {
            console.warn('Не удалось удалить информацию о файле:', e);
        }
    }

    function loadFileInfoFromStorage2() {
        try {
            const savedInfo = localStorage.getItem('fileInfo_2');
            if (savedInfo) {
                const fileInfo = JSON.parse(savedInfo);
                fileName2.textContent = truncateFilename2(fileInfo.name, 30);
                fileSize2.textContent = formatFileSize2(fileInfo.size);
                fileUpload2.classList.add('has-file');
            }
        } catch (e) {
            console.warn('Не удалось загрузить информацию о файле:', e);
        }
    }

    // Загружаем сохраненную информацию при старте (раскомментировать если нужно)
    // loadFileInfoFromStorage2();
});

