function loadProducts(){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.myjson.com/bins/ut9mc', true);
    xhr.send();

    xhr.addEventListener('readystatechange', function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            // преобразуем JSON - ответ
            let productsArr = JSON.parse(xhr.responseText);
            // задаем шаблон habdlebars.js
            let templateCode = `
                <div>
                    <div class="uk-card uk-card-default uk-card-body">
                        <h3 class="uk-card-title">
                            {{title}}
                        </h3>
                        <img src="{{img}}">
                        <p>
                            {{description}}
                        </p>
                        <footer class="uk-flex uk-flex-between">
                            <span class="uk-text-large uk-text-bold">{{price}} руб</span>
                            <button class="uk-button uk-button-danger"><span uk-icon="cart"></span></button>
                        </footer>
                    </div>
                </div>
            `;
            // компилируем шаблон
            let template = Handlebars.compile(templateCode);

            // получаем контейнер, в который будем производить добавление
            productsContainer = document.querySelector('#productsContainer');
            // очищаем содержимое контейнера (чтобы удалить примеры товаров, заданные в HTML)
            productsContainer.innerHTML = '';

            // обходим массив товаров
            for(let product of productsArr){
                // рендерим шаблон
                productsContainer.innerHTML += template(product);
            }


        }
    });
}

function sendCallbackOrder(){
    // получаем текущий список заявок
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.myjson.com/bins/oukas', true);
    xhr.send();

    xhr.addEventListener('readystatechange', function(){
        // если запрос завершен и завершен без ошибок, то...
        if(xhr.readyState == 4 && xhr.status == 200){
            // преобразуем JSON-ответ в массив
            let ordersArr = JSON.parse(xhr.responseText);

            // сформируем объект новой заявки
            let newOrder = {
                // значения получаем из соответствующих полей ввода
                name: document.querySelector('#orderName').value,
                phone: document.querySelector('#orderField').value
            }
            // добавляем полученный объект заявки в массив заявок, полученный с сервера
            ordersArr.push(newOrder);
    
            // формируем новый запрос. Здесь мы будем обновлять содержимое JSON на сервере
            let xhrSender = new XMLHttpRequest();
            // для обновления требуется метод PUT
            xhrSender.open('PUT', 'https://api.myjson.com/bins/oukas', true);

            // добавляем заголовок к запросу. Данный заголовок обязателен для отправки JSON PUT-запросом
            xhrSender.setRequestHeader('Content-type','application/json; charset=utf-8');
            // отправляем запрос с обновленным массивом заявок на сервер, чтобы он его сохранил
            xhrSender.send(JSON.stringify(ordersArr));
            
            // ответ можно не проверять, но при успешном завершении запроса выведем сообщение пользователю
            xhrSender.addEventListener('readystatechange', function(){
                // если запрос завершен ... 
                if(xhrSender.readyState == 4){
                    // и завершен без ошибок
                    if(xhrSender.status == 200){
                        // выведем сообщение о том, что заявка принята
                        alert('Ваша заявка принята. Оператор скоро свяжется с Вами!');
                    } else {
                        //а если запрос завершился с ошибкой, выведем сообщение об ошибке
                        alert('Ошибка отправки. Попробуйте еще раз.');
                    }
                }
            })
            
        }

    });
}

function addProduct(){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.myjson.com/bins/ut9mc', true);
    xhr.send();

    xhr.addEventListener('readystatechange', function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            // преобразуем JSON - ответ
            let productsArr = JSON.parse(xhr.responseText);

            let newProduct = {
                title: document.querySelector('#productTitle').value,
                img: document.querySelector('#productImg').value,
                description: document.querySelector('#productDescription').value,
                price: document.querySelector('#productPrice').value
            };

            productsArr.push(newProduct);

            // формируем новый запрос. Здесь мы будем обновлять содержимое JSON на сервере
            let xhrSender = new XMLHttpRequest();
            // для обновления требуется метод PUT
            xhrSender.open('PUT', 'https://api.myjson.com/bins/ut9mc', true);

            // добавляем заголовок к запросу. Данный заголовок обязателен для отправки JSON PUT-запросом
            xhrSender.setRequestHeader('Content-type','application/json; charset=utf-8');
            // отправляем запрос с обновленным массивом товаров на сервер, чтобы он его сохранил
            xhrSender.send(JSON.stringify(productsArr));
            
            // ответ можно не проверять, но при успешном завершении запроса выведем сообщение пользователю
            xhrSender.addEventListener('readystatechange', function(){
                // если запрос завершен ... 
                if(xhrSender.readyState == 4){
                    // и завершен без ошибок
                    if(xhrSender.status == 200){
                        // выведем сообщение о том, что заявка принята
                        alert('Товар успешно добавлен!');
                    } else {
                        //а если запрос завершился с ошибкой, выведем сообщение об ошибке
                        alert('Ошибка отправки. Попробуйте еще раз.');
                    }
                }
            })
        }
    });
}