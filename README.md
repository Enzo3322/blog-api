# Getting Started with BLOG-API

## Create post
```code 
curl --request POST \
  --url http://localhost:3000/posts \
  --header 'Content-Type: application/json' \
  --data '{"title":"Novo Post","content":"Conteúdo do novo post"}'
```
## Delete post by id
```code 
curl --request DELETE \
  --url http://localhost:3000/posts/42c5f7d3-03d0-47dc-ad3e-62505c70597a
```

## Update post by id
```code 
curl --request PUT \
  --url http://localhost:3000/posts/1 \
  --header 'Content-Type: application/json' \
  --data '{"title":"Título Atualizado","content":"Conteúdo atualizado","ref":"nova-ref","labels":["label1","label2"],"related":["related1","related2"]}'
```

## Get post by id
```code 
curl --request GET \
  --url http://localhost:3000/posts/42c5f7d3-03d0-47dc-ad3e-62505c70597a
```
## Get posts
```code
curl --request GET \
  --url http://localhost:3000/posts
```