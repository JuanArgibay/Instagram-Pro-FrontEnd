# InstagramPro - PortfolioProject // FrontEnd

App inspirada en Instagram.

Consumir la API creada en este mismo proyecto y dar vision a las publicaciones de los usuarios.

## Dependencias

- axios
- React Router
- React Swipeable
- React Transition Group

## Rutas

Estas se encuentran alojadas en el fichero 'Main.jsx' dentro de la carpeta 'layout'.

- Home de la pagina, llevaría al Timeline donde se visualizarian todos los post de todos los usuarios.

```jsx
<Route path="/" element={<TimeLine toogleAddPost={toogleAddPost} />} />
```

- Busqueda de una palabra o cadena de texto entre los post.

```jsx
<Route
  path="/search/:keyword"
  element={<TimeLine toogleAddPost={toogleAddPost} />}
  replace
/>
```

- Visualizacion de un post en particular

```jsx
<Route path="/post/:entryId" element={<SinglePost />} />
```

- Login de usuario

```jsx
<Route path="/login" element={<LoginPage />} />
```

- Registro de usuario

```jsx
<Route path="/register" element={<RegisterPage />} />
```

- Edición de usuario

```jsx
<Route path="/edit" element={<EditUserPage />} />
```

- Visualización de perfil propio de usuario que ha realizado login

```jsx
<Route path="/users" element={<ProfilePage />} />
```

- Visualizacion de perfil ajeno

```jsx
<Route path="/users/:id" element={<ProfileUserPage />} />
```

## Iniciar la aplicación

1. Lanzar la parte del backend del proyecto. => <https://github.com/JuanArgibay/Instagram-Pro-backend>
2. Establecer la ruta del backend creando el fichero '.env' siguiendo de ejemplo el fichero '.env.example'
