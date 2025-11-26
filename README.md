# Очень плохой сервер )))

В стартере для студентов код с багами, примерный, но не полный перечень с возможными проверками ниже:

## Backend

`src/controllers/customers.ts`

- нормализовать лимит (можно запросить любое количество строк из базы `limit=10....`)
- экранировать регулярку (проверка `{{baseUrl}}/customers/?search=%2B1`)

---
`src/controllers/order.ts`
- нормализовать лимит
- избыточная аггрегация, уязвимая к инъекции (
```
{{baseUrl}}/order/all?status[$expr][$function][body]='function%20(status)%20%7B%20return%20status%20%3D%3D%3D%20%22completed%22%20%7D'&status[$expr][$function][lang]=js&status[$expr][$function][args][0]=%24status
```

- не санитизирован комментарий (сюда `{{baseUrl}}/order` можно отправить вот это 

```
{
   "payment": "online",
   "email": "test@test.ru",
   "phone": "+71234567890",
   "address": "Spb Vosstania 1",
   "total": 750,
   "items": [
   "66edb93e9b289d24854b30de"
   ],
   "comment": "Catch you <img src=\"https://placehold.co/1\" onload=\"javascript:(function () {window.alert('hello!')})();\">"
   } 
```

и если на выходе коммент не почищен, значит не санитизируем)

---
`src/middlewares/file.ts`

- нельзя использовать оригинальное имя файл при формировании пути (не воспроизвести через github-actions, требуется кастомное формирование http-пакета)
- размер файлов должен быть лимитирован по минимуму и максимуму (проверяем загрузкой файлов меньше 2kb и больше 10mb)

---
`src/middlewares/serverStatic.ts`
- уязвимость path-traversal, нельзя использовать путь без проверки (требует специальных условий на сервере, не проверяем пока что)

---
`src/middlewares/validations.ts`
- уязвимая регулярка телефона 
```
curl -X POST http://localhost:3000/order --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Njg1YTAzMjg4OGUwMjM4NDJlY2JlMjAiLCJlbWFpbCI6InRlc3QxQGN1c3RvbWVyLnJ1IiwiaWF0IjoxNzIwMDc3MjA0LCJleHAiOjE3MjAwODA4MDR9.P3VbZWV7RTonMbGHhJJDdJ7epOl4s4yk-5N1e54E-AM' --header 'Content-Type: application/json' --data '{"address":"Васильевская 86","payment":"online","phone":"111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111a","total":2200,"email":"maxim_91@inbox.ru","items":["66601a7857ecac94459696d0","66601a8657ecac94459696d4"]}' -silent --write-out '%{time_total}\n' --output /dev/null)
```
---
`src/models/user.ts`
- md5 не рекомендован, тем более без соли.

---
`src/routes/auth.ts`
- отсутствует валидация на авторизации и регистрации

---
`src/routes/order.ts`
- не хватает проверки на роль

---
`src/routes/customers.ts`
- не проверяется роль (авторизуемся под пользователем, отправляем запрос на /api/customers/ и получаем базу пользователей)

---
`src/routes/upload.ts`
- не проверяются мета-данные загружаемого изображения

---
`src/app.ts`
- CORS разрешает все запросы (проверить что cors() содержит параметры и не пустой, проверить эмулированными запросами с разных хостов)
- отсутствует рейт-лимитер
- не установлен лимит на размер body (json() не должен быть пустым в коде, проверить запросом с большим json телом)

---
`package.json`
- не проведен аудит пакетов, найдено 7 уязвимостей

## Frontend
`src/components/admin/admin-order-detail.tsx`
- напрямую устанавливается html из пользовательского ввода (dangerouslySetInnerHTML), уязвимость XSS. Либо убрать dangerouslySetInnerHTML, либо добавить любой санитайзер (скорее всего студенты установят sanitize-html)

---
`package.json`
- не проведен аудит, 3 уязвимости
