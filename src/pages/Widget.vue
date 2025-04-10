<template>
    <div class="popup" v-if="visible">
        <h2>YouTube AutoLike</h2>
        <div class="icon-close" @click="toggle"></div>
        <p>Привет, я помогу пролайкать все коменты под видео в 1 клик!</p>
        <div class="counter">
            <p>Выбери количество коментов, которые хочешь пролайкать</p>
            <input type="number" class="like-input" v-model="commentCount" />
        </div>
        <div class="buttons">
            <button @click="autoScrollAndLike(true)" class="btn-like">Like</button>
            <button @click="autoScrollAndLike(false)" class="btn-dislike">DisLike</button>
        </div>
        <div class="blocker-view"></div>
    </div>
    <img src="../icon-with-shadow.svg" class="icon" @click="toggle" alt="Open" />
</template>

<script setup>
import { ref } from 'vue';
const visible = ref(false);
const commentCount = ref(5);
const toggle = () => (visible.value = !visible.value);
function clickLikeButtons(key, likeButtons) {
    if (likeButtons.length === 0) {
        console.log("Лайк-кнопки не найдены. Возможно, комментарии не загружены.");
        return false;
    }
    console.log(`Найдено кнопок лайка: ${likeButtons.length}`);
    const commentsHeader = document.querySelector('#sections');
    if (commentsHeader) {
        document.querySelector('#sections').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
    setTimeout(() => {
        likeButtons.forEach((button, index) => {
            setTimeout(() => {
                if (document.contains(button) && button.getAttribute("aria-pressed") === 'false') {
                    button.click(); console.log(`Лайк на комментарий ${index + 1}`);
                    window.scrollBy(0, button.offsetHeight + 60);
                }
            }, index * 1000);
        });
    }, 2000);

    return true;
}
function autoScrollAndLike(key) {
    let attempts = 0;
    let commentPool1 = 0;
    let commentPool2 = 0;
    const maxAttempts = 5;
    window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth'
    });
    setTimeout(() => {
        const scrollInterval = setInterval(() => {
            window.scrollBy(0, 500);
            const likeButtons = Array.from(document.querySelectorAll(`button[aria-label*="${key ? 'Нравится' : 'Не нравится'}"]`));
            console.log(`Найдено кнопок лайка: ${likeButtons && likeButtons.length}`);

            // Проверять массив кнопко если лайкаем фильтровать на фхоже уже лайкнутое и дизлайкнутое, 
            // если дизлайкаем фильтровать 2 первых кнопки
            // блочить состояние во время работы + кнопка остановки

            commentPool1 = likeButtons.length;
            if (commentPool1 === commentPool2) {
                attempts++;
                console.log(`Коменты не добавились раз`, attempts);
            } else {
                attempts = 0;
            }
            commentPool2 = likeButtons.length
            if (attempts === maxAttempts || (likeButtons && likeButtons.length >= commentCount.value)) {
                console.log(`Наскролили нужное количество коментов`, likeButtons.slice(0, commentCount.value).length);
                clearInterval(scrollInterval);
                clickLikeButtons(key, likeButtons.slice(0, commentCount.value));
            }
        }, 2000);
    }, 2000);

}
</script>

<style scoped>
h2 {
    margin: 12px 4px;
    font-size: 24px;
    color: white;
}

p {
    margin: 4px;
    font-size: 14px;
    color: white;
    text-align: justify;
}

.counter {
    display: flex;
    align-items: center;

    input {
        max-width: 15%;
        border-radius: 10px;
        outline: none;
        border: none;
        max-height: 28px;
        min-height: 28px;
        margin-left: 12px;
        padding: 2px 4px;
    }
}

.buttons {
    display: flex;
    margin-top: 20px;
}

.popup {
    position: fixed;
    bottom: 40px;
    left: 20px;
    background: rgb(42, 70, 175);
    border: 1px solid #f26b6b;
    border-radius: 8px;
    padding: 12px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
    z-index: 999999;
    width: 300px;
    display: flex;
    flex-direction: column;
}

.icon {
    width: 32px;
    height: 32px;
    cursor: pointer;
    position: fixed;
    bottom: 80px;
    left: 20px;
    z-index: 999998;
}

.icon-close {
    cursor: pointer;
    position: absolute;
    top: 16px;
    right: 16px;
    width: 12px;
    height: 12px;
}

.icon-close:before,
.icon-close:after {
    content: "";
    position: absolute;
    width: 16px;
    height: 4px;
    background: white;
}

.icon-close:before {
    transform: rotate(45deg);
}

.icon-close:after {
    transform: rotate(-45deg);
}

.btn-like,
.btn-dislike {
    margin-right: 12px;
    border-radius: 10px;
    color: white;
    background: #0B63F6;
    box-shadow: none;
    padding: 8px 12px;
    outline: none;
    border: none;
    cursor: pointer;
}

.btn-dislike {
    background: white;
    border: 1px solid #0B63F6;
    color: #0B63F6;
}

.blocker-view {
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(45deg,
            black 0px,
            black 10px,
            yellow 10px,
            yellow 20px);
    position: absolute;
    top: -250px;
    /* старт за пределами экрана */
    left: 50%;
    transform: translateX(-50%);
    animation: slide-down 0.8s ease-out forwards;
    border: 2px solid #000;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    z-index: 9999;
}

@keyframes slide-down {
    from {
        top: -250px;
        opacity: 0;
    }

    to {
        top: 50px;
        opacity: 1;
    }
}
</style>