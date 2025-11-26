#!/bin/bash

# Отправка запросов в пределах лимита
for i in {1..20}
do
  echo "Request $i"
  curl -i http://localhost:3000/products/66601a7857ecac94459696d0
done

# Отправка запроса, чтобы проверить превышение лимита
echo "Sending request to exceed rate limit"
curl -i http://localhost:3000/products/66601a7857ecac94459696d0