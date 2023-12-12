const socket = io()

socket.io('productos', productos_socket=>{
    const tbody = document.getElementById('productos_body')
    tbody.innerHTML = ''
    productos_socket.forEach(prod => {
        const row = tbody.insertRow()

        row.innerHTML = `
        <td>{{this.id}}</td>
        <td>{{this.title}}</td>
        <td>{{this.description}}</td>
        <td>{{this.stock}}</td>
        <td>{{this.price}}</td>
        <td>{{this.category}}</td>
        <td>{{this.code}}</td>
        <td>{{this.status}}</td>
        <td>{{this.thumbnail}}</td>
        `
    });
})

const formulario = document.getElementById('product_form')
formulario.addEventListener('submit', function(event){
    event.preventDefault()
    const title = document.getElementById('title').value
    const description = document.getElementById('description').value
    const category = document.getElementById('category').value
    const price = document.getElementById('price').value
    const stock = document.getElementById('stock').value
    const code = document.getElementById('code').value
    const thumbnail_link = document.getElementById('thumbnail').value

    const prod_nuevo = {
        title: title,
        description: description,
        category: category,
        price: price,
        stock: stock,
        code: code,
        thumbnail: [thumbnail_link]
    }

    socket.emit('agregar_producto', prod_nuevo)
    formulario.reset()
})