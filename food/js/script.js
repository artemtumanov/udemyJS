window.addEventListener("DOMContentLoaded", () => {

    //Tabs
    const tabs = document.querySelectorAll('.tabheader__item'), 
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent () { //Скрывает весь контент
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active')
        })
    }

    function showTabContent (i = 0) { //Функция будет отслеживать на какой так кликнут и показывать его
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent(); //Показываем первый таб по умолчанию

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if(target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            })
        }
    })


    //Timer
    const deadline = '2022-08-11';  //устанавливаем дедлайн

    function getTimeRemaining(endtime) {  //Напишем функцию, которая возвращает объект с разницей даты дедлайна и текущего времени
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor( (t/(1000*60*60*24)) ),
              hours = Math.floor( ((t/(1000*60*60))%24) ),
              minutes = Math.floor( ((t/(1000*60))%60) ),
              seconds = Math.floor( ((t/1000)%60) );
        
        return {total, days, hours, minutes, seconds}
    }

    function getZero(num) {  //Напишем функцию, которая добавляют 0 перед одиночными цифрами
        if (num >= 0 && num < 10) {
            return `0${num}`
        } else {
            return num
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = document.querySelector('#days'),
              hours = document.querySelector('#hours'),
              minutes = document.querySelector('#minutes'),
              seconds = document.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock(); //Функция вызывается, чтобы при обновлении счетчик не показывал старые данные на секунду

        function updateClock() { //Функция принимает объект и записывает из него значения в верстку
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if(t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);
});