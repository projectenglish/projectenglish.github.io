'use strict';
 
// создаем объект запроса для получения списка товаров
let xhrLoad = new XMLHttpRequest();
// настраиваем на отправку методом GET на url, возвращающий json-массив товаров
xhrLoad.open('GET', 'https://studyprograms.informatics.ru/api/jsonstorage/?id=1571978274d3a374c72a549129898608', true);
xhrLoad.send();

xhrLoad.addEventListener('readystatechange', function () {
    if (xhrLoad.readyState == 4 && xhrLoad.status == 200) {
        // преобразуем JSON-ответ в массив
        let cardsArr = JSON.parse(xhrLoad.responseText);

        // задаем шаблон для habdlebars.js
        let templateCode = `
        <div>
            <div id="wordCard" class="uk-card uk-card-body">
                
                <h3 class="uk-card-title">
                    {{theWord}}
                </h3>
                <div class="card">
                    <p class="pcard">
                        {{definition}}
                    </p>
                </div>
            </div>
        </div>
        `

        // компилируем шаблон
        let template = Handlebars.compile(templateCode)

        // получаем div, в который будем производить добавление товаров
        let cardContainer = document.querySelector('#cardContainer');

        // обходим массив товаров, полученный с сервера
        for (let card of cardsArr) {
            // рендерим шаблон для текущегоо товара
            cardContainer.innerHTML += template(card);
        }
    }
});


(function() {
    document.querySelector('input').addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', ` https://api.dictionaryapi.dev/api/v2/entries/en/${pocname.value.toLowerCase()}`, false);
        xhr.send();
        if (xhr.status == 200) {
            //pokeimg.src = JSON.parse(xhr.responseText).sprites.front_default;
            word.innerHTML  =  JSON.parse(xhr.responseText)[0].word;
            def.innerHTML =   JSON.parse(xhr.responseText)[0].meanings[0].definitions[0].definition
             // pokeimg.style.width = '300px';
            // pokeimg.style.marginBottom = '-60px';
            // pokeimg.style.marginTop = '-40px';
        }
        else{
            // pokeimg.src = "img/14fd9cfb-ab4e-4c7a-b47d-a90433aabb67.jpg";
            word2.innerHTML = "Убедитесь, что слово введено правильно и на английском языке!";
             def.innerHTML = " ";
             def2.innerHTML = " ";

        }
    pocname.value = " ";
      }
    });
  })();

    


document.querySelector('#addBtn').addEventListener('click', function () {
    if (word2.innerHTML == "Убедитесь, что имя написано правильно и на английском языке!" ||  word.innerHTML == "??" || def.innerHTML == "??"){
        alert('Ошибка отправки. Попробуйте еще раз.');
    }
    else{
        // создаем объект запроса для получения текущего списка товаров
        let xhrLoadProd = new XMLHttpRequest();
        // настраиваем на отправку методом GET на url, возвращающий json-массив товаров
        xhrLoadProd.open('GET', 'https://studyprograms.informatics.ru/api/jsonstorage/?id=1571978274d3a374c72a549129898608',
            true);
        xhrLoadProd.send();

        xhrLoadProd.addEventListener('readystatechange', function () {
            if(xhrLoadProd.readyState == 4 && xhrLoadProd.status == 200){
                // преобразуем JSON - ответ
                let cardsArr = JSON.parse(xhrLoadProd.responseText);
                let flag = true
                console.log(cardsArr)
                for(let i of cardsArr){
                    if (word.innerHTML==i.theWord) flag = false
                }
                if(flag==false) {
                    alert("Ошибка. Такое слово уже добавлено на страницу")
                }
                else{
                let newPoc = {
                    theWord: word.innerHTML,
                    definition: def.innerHTML,
                };

                cardsArr.push(newPoc);
                alert('Слово успешно добавлено!');
                
                }
                

                // формируем новый запрос. Здесь мы будем обновлять содержимое JSON на сервере
                let xhrSender = new XMLHttpRequest();
                // для обновления требуется метод PUT
                xhrSender.open('PUT', 'https://studyprograms.informatics.ru/api/jsonstorage/?id=1571978274d3a374c72a549129898608', true);

                // добавляем заголовок к запросу. Данный заголовок обязателен для отправки JSON PUT-запросом
                xhrSender.setRequestHeader('Content-type', 'application/json; charset=utf-8');
                // отправляем запрос с обновленным массивом товаров на сервер, чтобы он его сохранил
                xhrSender.send(JSON.stringify(cardsArr));

                // ответ можно не проверять, но при успешном завершении запроса выведем сообщение пользователю
                xhrSender.addEventListener('readystatechange', function () {
                    // если запрос завершен ... 
                    if (xhrSender.readyState == 4) {
                        // и завершен без ошибок
                        if (xhrSender.status != 200) {
                            //а если запрос завершился с ошибкой, выведем сообщение об ошибке
                            alert('Ошибка отправки. Попробуйте еще раз.');
                        }
                    }
                })
            }
        });
        
    }
});
