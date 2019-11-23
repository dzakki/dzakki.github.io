window.addEventListener('DOMContentLoaded', (event) => {
    if (!isLogin()) {
        window.location.href = 'index.html'
    }
    showNextUp()
    showOnProgress()
    showDone()
});
function isLogin() {
    let item = localStorage.getItem('gmail')
    if (item) {
        return true
    }
    return false
}
function removeElements(el) {
    if (el.firstChild) {
        while(el.firstChild){
            el.removeChild(el.firstChild);
        }   
    }
    return true
}
function showNextUp() {
    const items = getItems('nextUp')
    const elParent = document.getElementById('next-up')
    const rm = removeElements(elParent)
    if (rm) {
        let string = ''
        for (let i = items.items.length - 1; i >= 0 ; i--) {
            string += ` <div class="list-card">
                            <span class="list-card-title">
                                ${items.items[i].task}
                            </span>
                            <span class="list-card-title">
                                <button class="btn btn-info"><img src="assets/img/icon/icons8-update-100.png" alt="update" width="20px" onclick="updateToDo(${i}, 'nextUp')"></button> 
                                <button class="btn btn-red"><img src="assets/img/icon/icons8-delete-100.png" alt="update" width="20px" onclick="deleteItem('nextUp', ${i})"></button> 
                            </span>
                        </div>
                        `
        }
        elParent.innerHTML = string
    }
}
function showOnProgress() {
    const items = getItems('onProgress')
    const elParent = document.getElementById('on-progress')
    const rm = removeElements(elParent)
    if (rm) {
        let string = ''
        for (let i = items.items.length - 1; i >= 0 ; i--) {
            string += ` <div class="list-card">
                            <span class="list-card-title">
                                ${items.items[i].task}
                            </span>
                            <span class="list-card-title">
                                <button class="btn btn-info"><img src="assets/img/icon/icons8-update-100.png" alt="update" width="20px" onclick="updateToDo(${i}, 'onProgress')"></button> 
                                <button class="btn btn-red"><img src="assets/img/icon/icons8-delete-100.png" alt="update" width="20px" onclick="deleteItem('onProgress', ${i})"></button> 
                            </span>
                        </div>`
        }
        elParent.innerHTML = string
    }
}
function showDone() {
    const items = getItems('done')
    const elParent = document.getElementById('done')
    const rm = removeElements(elParent)
    if (rm) {
        let string = ''
        for (let i = items.items.length - 1; i >= 0 ; i--) {
            string += ` <div class="list-card">
                            <span class="list-card-title">
                                ${items.items[i].task}
                            </span>
                            <span class="list-card-title">
                                <button class="btn btn-info"><img src="assets/img/icon/icons8-update-100.png" alt="update" width="20px" onclick="updateToDo(${i}, 'done')"></button> 
                                <button class="btn btn-red"><img src="assets/img/icon/icons8-delete-100.png" alt="update" width="20px" onclick="deleteItem('done', ${i})"></button> 
                            </span>
                        </div>`
        }
        elParent.innerHTML = string
    }
}
function showByItem(key) {
    switch (key) {
        case 'nextUp':
            showNextUp()
            break;
        case 'onProgress':
            showOnProgress()
            break;
        case 'done':
            showDone()
            break;
    }
}
function getItem(key, id) {
    let items = JSON.parse(localStorage.getItem(key))
    return items.items[id]
}
function getItems(key) {
    let items = JSON.parse(localStorage.getItem(key))
    return items
}
function setItem(key, value) {
    let items = JSON.parse(localStorage.getItem(key))
    if (items) {
        let item = {
            task: value
        }
        items.items.push(item)
        items.total = items.items.length
        localStorage.setItem(key, JSON.stringify(items))
        return true
    }
    return false
}
function updateItem() {
    let idTodo = document.getElementById('idTodo')
    let listByTemp = document.getElementById('listByTemp')

    let listBy = document.getElementById('listBy')
    listBy = listBy.options[listBy.selectedIndex].value

    let task = document.getElementById('task')
    let btnUpdate = document.getElementById('updateItem')
    let btnAdd = document.getElementById('addTodo')

    if (!task.value) {
        alert('task required')
        return false
    }

    btnUpdate.style.cssText = "display: none"
    btnAdd.style.cssText = "display: block"

    if (listByTemp.value === listBy) {
        let items = getItems(listBy)
        items.items[idTodo.value].task = task.value
        localStorage.setItem(listBy, JSON.stringify(items))
        showByItem(listBy)
    }else{
        setItem(listBy, task.value)
        showByItem(listBy)
        deleteItem(listByTemp.value, idTodo.value)
    }
    task.value = ''
    return true

}
function deleteItem(key, id) {
    let items = getItems(key)
    items.items.splice(id, 1)
    localStorage.setItem(key, JSON.stringify(items))
    showByItem(key)
}
function addToDo() {
    let task = document.getElementById('task')
    let listBy = document.getElementById('listBy')
    listBy = listBy.options[listBy.selectedIndex].value
    if (!task.value) {
        alert('task required')
        return false
    }
    let updateItem =  setItem(listBy, task.value)
    if (updateItem) {
        task.value = ''
        showByItem(listBy)
        return true
    }
    console.log('gagal')
}
function updateToDo(id, key) {
    let idTodo = document.getElementById('idTodo')
    let listByTemp = document.getElementById('listByTemp')
    let task = document.getElementById('task')
    let btnUpdate = document.getElementById('updateItem')
    let btnAdd = document.getElementById('addTodo')
    let item = getItem(key, id)

    idTodo.value = id
    listByTemp.value = key
    task.value = item.task

    let e = document.getElementById("listBy");
    for (let i = 0; i < e.options.length; i++) {
        if (e.options[i].value === key) {
            e.options[i].setAttribute('selected', true);
        }
    }
    btnUpdate.style.cssText = "display: block"
    btnAdd.style.cssText = "display: none"
}
function logout() {
    localStorage.clear();
    window.location.href = 'index.html'
}