function createBackgroundElements() {
    // Удаляем старые элементы, если есть
    document.querySelectorAll('.background-element').forEach(el => el.remove());

    // Определяем количество элементов в зависимости от размера экрана
    const width = window.innerWidth;
    const height = window.innerHeight;
    const area = width * height;
    const elementCount = Math.floor(area / 30000); // Немного больше элементов

    // Серые оттенки
    const grayShades = [
        '#4a5568', // темно-серый
        '#718096', // серый
        '#a0aec0', // светло-серый
        '#cbd5e0', // очень светло-серый
        '#2d3748'  // очень темно-серый
    ];

    // Создаем элементы
    for (let i = 0; i < elementCount; i++) {
        const isCross = Math.random() > 0.5;
        const elementType = isCross ? 'cross' : 'circle';

        // Случайный размер от 15 до 70px
        const size = 15 + Math.random() * 55;

        // Случайная позиция
        const posX = Math.random() * (width + 100) - 50;
        const posY = Math.random() * (height + 100) - 50;

        // Случайный серый цвет
        const grayColor = grayShades[Math.floor(Math.random() * grayShades.length)];

        // Случайная прозрачность (очень прозрачные)
        const opacity = 0.05 + Math.random() * 0.08;

        // Случайный угол поворота для крестиков
        const rotation = isCross ? Math.random() * 360 : 0;

        // Создаем элемент
        const element = document.createElement('div');
        element.className = `background-element ${elementType}`;
        element.style.position = 'fixed';
        element.style.left = `${posX}px`;
        element.style.top = `${posY}px`;
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        element.style.opacity = opacity;
        element.style.zIndex = '150'; // Заданный z-index
        element.style.pointerEvents = 'auto';
        element.style.cursor = 'pointer';
        element.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        element.style.filter = 'grayscale(100%)'; // Гарантированно серый

        if (isCross) {
            // Создаем крестик
            element.style.background = `
                linear-gradient(45deg, transparent calc(50% - 1px), ${grayColor} calc(50% - 1px), ${grayColor} calc(50% + 1px), transparent calc(50% + 1px)),
                linear-gradient(135deg, transparent calc(50% - 1px), ${grayColor} calc(50% - 1px), ${grayColor} calc(50% + 1px), transparent calc(50% + 1px))
            `;
            element.style.transform = `rotate(${rotation}deg) scale(0.9)`;
            element.style.backgroundBlendMode = 'multiply';
        } else {
            // Создаем круг
            element.style.borderRadius = '50%';
            element.style.backgroundColor = grayColor;
            element.style.border = `1px solid ${grayColor}`;
            element.style.transform = 'scale(0.9)';
        }

        // Добавляем анимацию появления
        element.style.animation = 'fadeInSoft 0.8s ease forwards';

        // Добавляем плавающую анимацию
        if (Math.random() > 0.7) {
            element.style.animation += ', floatSoft 8s ease-in-out infinite';
            element.style.animationDelay = `${Math.random() * 2}s`;
        }

        // Интерактивность
        element.addEventListener('mouseenter', function() {
            this.style.opacity = '0.15';
            this.style.transform = isCross ?
                `rotate(${rotation}deg) scale(1.15)` :
                'scale(1.15)';
        });

        element.addEventListener('mouseleave', function() {
            this.style.opacity = opacity;
            this.style.transform = isCross ?
                `rotate(${rotation}deg) scale(0.9)` :
                'scale(0.9)';
        });

        // Клик удаляет элемент
        element.addEventListener('click', function() {
            this.style.opacity = '0';
            this.style.transform = 'scale(0)';
            setTimeout(() => this.remove(), 400);
        });

        document.body.appendChild(element);
    }
}

// Создаем элементы при загрузке
document.addEventListener('DOMContentLoaded', createBackgroundElements);

// Обновляем при изменении размера окна (с троттлингом)
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(createBackgroundElements, 250);
});

// Функция для добавления больше элементов по требованию
window.addMoreElements = function(count = 20) {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const grayShades = ['#4a5568', '#718096', '#a0aec0', '#cbd5e0', '#2d3748'];

    for (let i = 0; i < count; i++) {
        const isCross = Math.random() > 0.5;
        const size = 15 + Math.random() * 55;
        const posX = Math.random() * (width + 100) - 50;
        const posY = Math.random() * (height + 100) - 50;
        const grayColor = grayShades[Math.floor(Math.random() * grayShades.length)];
        const opacity = 0.05 + Math.random() * 0.08;
        const rotation = isCross ? Math.random() * 360 : 0;

        const element = document.createElement('div');
        element.className = `background-element ${isCross ? 'cross' : 'circle'}`;
        element.style.position = 'fixed';
        element.style.left = `${posX}px`;
        element.style.top = `${posY}px`;
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        element.style.opacity = '0';
        element.style.zIndex = '50';
        element.style.pointerEvents = 'auto';
        element.style.cursor = 'pointer';
        element.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        element.style.filter = 'grayscale(100%)';

        if (isCross) {
            element.style.background = `
                linear-gradient(45deg, transparent calc(50% - 1px), ${grayColor} calc(50% - 1px), ${grayColor} calc(50% + 1px), transparent calc(50% + 1px)),
                linear-gradient(135deg, transparent calc(50% - 1px), ${grayColor} calc(50% - 1px), ${grayColor} calc(50% + 1px), transparent calc(50% + 1px))
            `;
            element.style.transform = `rotate(${rotation}deg) scale(0)`;
        } else {
            element.style.borderRadius = '50%';
            element.style.backgroundColor = grayColor;
            element.style.border = `1px solid ${grayColor}`;
            element.style.transform = 'scale(0)';
        }

        document.body.appendChild(element);

        // Анимация появления
        setTimeout(() => {
            element.style.opacity = opacity;
            element.style.transform = isCross ?
                `rotate(${rotation}deg) scale(0.9)` :
                'scale(0.9)';
        }, i * 50);

        // Добавляем обработчики событий
        element.addEventListener('mouseenter', function() {
            this.style.opacity = '0.15';
            this.style.transform = isCross ?
                `rotate(${rotation}deg) scale(1.15)` :
                'scale(1.15)';
        });

        element.addEventListener('mouseleave', function() {
            this.style.opacity = opacity;
            this.style.transform = isCross ?
                `rotate(${rotation}deg) scale(0.9)` :
                'scale(0.9)';
        });

        element.addEventListener('click', function() {
            this.style.opacity = '0';
            this.style.transform = 'scale(0)';
            setTimeout(() => this.remove(), 400);
        });
    }

    console.log(`Добавлено ${count} новых элементов`);
};