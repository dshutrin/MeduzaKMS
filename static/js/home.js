
function createBackgroundElements() {
    // Удаляем старые элементы, если есть
    document.querySelectorAll('.background-element').forEach(el => el.remove());

    // Определяем количество элементов в зависимости от размера экрана
    const width = window.innerWidth;
    const height = window.innerHeight;
    const area = width * height;
    const elementCount = Math.floor(area / 30000); // Немного больше элементов

    // Список путей к изображениям из статики Django
    // Замените на актуальные пути к вашим изображениям
    const imagePaths = [
        '/static/imgs/duh1.png',
        '/static/imgs/duh2.png',
        '/static/imgs/duh3.png'
    ];

    // Если хотите использовать разные форматы, можно добавить:
    // '/static/images/background/icon1.png',
    // '/static/images/background/icon2.jpg',

    // Создаем элементы
    for (let i = 0; i < elementCount; i++) {
        // Случайный выбор картинки
        const randomImage = imagePaths[Math.floor(Math.random() * imagePaths.length)];

        // Случайный размер от 20 до 80px
        const size = 20 + Math.random() * 60;

        // Случайная позиция
        const posX = Math.random() * (width + 100) - 50;
        const posY = Math.random() * (height + 100) - 50;

        // Случайная прозрачность (очень прозрачные)
        //const opacity = 0.04 + Math.random() * 0.1;
        const opacity = 0.25;

        // Случайный угол поворота
        const rotation = Math.random() * 360;

        // Создаем элемент-изображение
        const element = document.createElement('div');
        element.className = `background-element`;

        // Создаем img элемент внутри div
        const img = document.createElement('img');
        img.src = randomImage;
        img.alt = 'Background decoration';
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'contain';
        img.style.filter = 'grayscale(100%) brightness(0.7)'; // Серый фильтр

        element.appendChild(img);

        // Стили для контейнера
        element.style.position = 'fixed';
        element.style.left = `${posX}px`;
        element.style.top = `${posY}px`;
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        element.style.opacity = opacity;
        element.style.zIndex = '50'; // Заданный z-index
        element.style.pointerEvents = 'auto';
        element.style.cursor = 'pointer';
        element.style.transition = 'opacity 0.4s ease, transform 0.4s ease, filter 0.4s ease';
        element.style.transform = `rotate(${rotation}deg) scale(0.9)`;
        element.style.display = 'flex';
        element.style.alignItems = 'center';
        element.style.justifyContent = 'center';

        // Добавляем анимацию появления
        element.style.animation = 'fadeInSoft 0.8s ease forwards';

        // Добавляем плавающую анимацию
        if (Math.random() > 0.7) {
            element.style.animation += ', floatSoft 8s ease-in-out infinite';
            element.style.animationDelay = `${Math.random() * 2}s`;
        }

        // Интерактивность
        element.addEventListener('mouseenter', function() {
            this.style.opacity = '0.2';
            this.style.transform = `rotate(${rotation}deg) scale(1.15)`;
            this.querySelector('img').style.filter = 'grayscale(0%) brightness(1)'; // Убираем серый при наведении
        });

        element.addEventListener('mouseleave', function() {
            this.style.opacity = opacity;
            this.style.transform = `rotate(${rotation}deg) scale(0.9)`;
            this.querySelector('img').style.filter = 'grayscale(100%) brightness(0.7)';
        });

        // Клик удаляет элемент
        element.addEventListener('click', function() {
            this.style.opacity = '0';
            this.style.transform = `rotate(${rotation}deg) scale(0)`;
            setTimeout(() => this.remove(), 400);
        });

        document.body.appendChild(element);
    }
}

createBackgroundElements()
