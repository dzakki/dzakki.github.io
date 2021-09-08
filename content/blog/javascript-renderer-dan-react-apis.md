+++
title = "Javascript Renderer Dan React API's"
date = "2021-09-08T19:09:15+08:00"
description = "Belajar fundamental React `React.createElement` dan `ReactDOM.render` dan Javascript renderer `document.createElement` dan `document.append`"
tags = ["react",  "javascript"]
+++

`React.createElement`, `ReactDOM.render` adalah sebagian dari React API's. 

`React.createElement` itu seperti `document.createElement` yang dimana fungsinya untuk membuat element baru. sedangkan `ReactDOM.render` fungsi nya untuk merender element, kurang lebih sama seperti `document.append`

Kita akan belajar cara merender element dengan final output seperti ini:

```html
<body>
  <div id="root"> 
     <div>Hello world</div>
  </div>
</body>
```

Skeleton:
```html
<body>
  <div id="root"> 
    <!-- tambahkan element baru  <div>Hello world</div> disini menggunakan javascript -->
  </div>
</body>
```

Cara menyelesaikan kasus diatas, kita bisa menggunakan `document.createElement` untuk membuat element baru, dan `document.append` untuk merender element yang kita buat:

```html
<body>
  <div id="root"> 
  </div>

  <script>
    const rootElement = document.getElementById('root')

    // Membuat element baru dengan tag div
    const elementDiv = document.createElement('div') // <div></div>

    // memberikan text kedalam element div. 
    elementDiv.textContent = 'Hello world' // <div>Hello world</div>


    // merender element div kedalam scope tag yang memiliki id root. (<div id="root">)
    rootElement.append(elementDiv) // <div id="root"> <div>Hello world</div> </div>
  </script>
</body>
```

Lalu bagaimana jika kita menyelesaikannya menggunakan React API's?

```html
<body>
  <div id="root">
  </div>

  <script src="https://unpkg.com/react@17.0.0/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@17.0.0/umd/react-dom.development.js"></script>
  <script type="module">
    // mengambil element div dengan id root untuk dijadikan sebagai root element / sebagai scope element baru.
    const rootElement = document.getElementById('root')


    const elementType = 'div'
    const elemenentProps = { className: 'container' } 
    const elementChildren = "hello world"

    // membuat element div, menambahkan class container dan text hello world.
    const reactElement = React.createElement(elementType, elemenentProps, elementChildren) // <div class="container">hello world</div>

    // merender reactElement (<div class="container">hello world</div>)
    ReactDOM.render(reactElement, rootElement)
  </script>
</body>
```

## Penjelasan tambahan

`React.createElement(type, [props], [...children])` menerima 3 parameter, yaitu:
1. Type (`String`) : tipe tag html seperti `div, span, dll`. 
2. Props (`Object`):  untuk menambahkan attribute pada element yang dibuat. seperti `className, style, id, dll`. 
3. Children (`Array[element] | Object[element] | String`): untuk menambahkan element children atau hanya sekedar text. 

`ReactDOM.render(reactElement, rootElement)` menerima 2 parameter, yaitu:
1. React element yang akan dirender.
2. Root element yang akan diguanakan sebagai scope merender element.

## Extra

Cara membuat element baru ditambah element baru (element children) didalam nya menggunakan React API's

Final output:

```html
<body>
  <div id="root">
    <div class="container">
      <span>ini adalah span</span>
    </div>
  </div>
</body>
```

Cara menyelesaikan:
```html
  <!-- .../ -->
  <script type="module">
    const rootElement = document.getElementById('root')


    const elementType = 'div'
    const elemenentProps = { className: 'container' } 

    // membuat element sebagai children
    const elementChildren = React.createElement('span', null, 'ini adalah span') // <span>ini adalah span</span>
 

    // membuat element div, menambahkan class container dan menambahkan children dalam bentuk element.
    const reactElement = React.createElement(elementType, elemenentProps, elementChildren) // <div class="container"><span>ini adalah span</span></div>

    ReactDOM.render(reactElement, rootElement)
  </script>
  <!-- .../ -->
```


## Kesimpulan
Dengan basic javascript renderer kita jadi mudah memahami alur dalam membuat element dan merender element yang kita buat menggunakan React API's. Jika kita ingin membuat aplikasi, sangat tidak cocok menggunakan `React.createElement` karena kode nya akan sangat kompleks sehingga akan sulit ketika dibaca. Solusinya adalah [menggunakan JSX](https://reactjs.org/docs/introducing-jsx.html).