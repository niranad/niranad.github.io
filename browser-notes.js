const list = document.querySelector('ul')
const titleInput = document.querySelector('#title')
const bodyInput = document.querySelector('#body')
const form = document.querySelector('form')
const submitBtn = document.querySelector('#submit')

let indexedDB =
  window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB
let db = null

window.onload = function () {
  let request = indexedDB.open('notes_db', 1)

  // setup database tables if this has not already been done
  request.onupgradeneeded = function (e) {
    // grab a reference to the opened database
    let db = e.target.result

    // create an objectStore to store tables in (basically like a single table)
    // including an auto-incrementing key
    let objectStore = db.createObjectStore('notes_os', {
      keyPath: 'id',
      autoIncrement: true,
    })

    // define what data items the objectStore will contain
    objectStore.createIndex('title', 'title', { unique: false })
    objectStore.createIndex('body', 'body', { unique: false })

    // objectStore.transaction.oncomplete = function () {

    // }

    alert('You are all set.')
  }

  request.onerror = function () {
    alert('Oh sorry! Your browser device storage is not available.')
  }

  request.onsuccess = function (e) {
    alert('Your device storage is now open for writing.')

    // store the opened database object
    db = e.target.result

    displayData()
  }

  form.onsubmit = addData

  function addData(e) {
    e.preventDefault()

    // grab the values entered into the form fields and store them in an object ready
    // to be inserted into DB
    let newItem = { title: titleInput.value, body: bodyInput.value }

    // open a read/write db transaction, ready for adding data
    let transaction = db.transaction(['notes_os'], 'readwrite')

    // call an objectStore that is already been added to the database
    let objectStore = transaction.objectStore('notes_os')

    // make a request to add newItem object to the objectStore
    let request = objectStore.add(newItem)
    request.onsuccess = function () {
      // clear the form, ready for adding next entry
      titleInput.value = ''
      bodyInput.value = ''
    }

    // report on the success of the transaction completing, when everything is done
    transaction.oncomplete = function () {
      alert('Note created successfully!')

      // update the display of data to show the newly added item
      displayData()
    }

    transaction.onerror = function () {
      alert('Failed to create note.')
    }
  }

  function displayData() {
    // empty the list contents to prevent duplicates from being listed
    while (list.firstChild) {
      list.removeChild(list.firstChild)
    }

    // open object store and then get a cursor which iterates through all the
    // different data items in the store
    let objectStore = db
      .transaction('notes_os', 'readwrite')
      .objectStore('notes_os')
    objectStore.openCursor().onsuccess = function (e) {
      // get a reference to the cursor
      let cursor = e.target.result

      // while there is still another data item to iterate through
      if (cursor) {
        const listItem = document.createElement('li')
        const h3 = document.createElement('h3')
        const p = document.createElement('p')

        // create a button inside each listItem
        const deleteBtn = document.createElement('button')
        deleteBtn.setAttribute('class', 'delete-btn')
        deleteBtn.innerHTML = '<i class="fa fa-trash-o"></i>'
        deleteBtn.onclick = deleteItem

        listItem.appendChild(h3)
        listItem.appendChild(p)
        listItem.appendChild(deleteBtn)
        list.appendChild(listItem)

        // put the data from the cursor inside the h3 and p
        h3.textContent = cursor.value.title
        p.textContent = cursor.value.body

        // store the id of the data item inside an attribute on the listItem
        // to know which item it corresponds to, and for deleting items
        listItem.setAttribute('data-note-id', cursor.value.id)

        // iterate to the next item in cursor
        cursor.continue()
      } else {
        // if list is empty, display a 'No notes stored' message
        if (!list.firstChild) {
          const listItem = document.createElement('li')
          listItem.textContent = 'No notes stored'
          list.appendChild(listItem)
        }
      }
    }
  }

  function deleteItem(e) {
    // retrieve the name of the item we want to delete: we need to convert it
    // to a number before trying to use it with IDB; IDB key values are type-sensitive
    let noteId = Number(e.target.parentNode.parentNode.getAttribute('data-note-id'))
  
    // open a database transaction and delete the item, finding it using the id
    // we retrieved above
    let transaction = db.transaction(['notes_os'], 'readwrite')
    let objectStore = transaction.objectStore('notes_os')
    let request = objectStore.delete(noteId)

    // report that the data item has been deleted
    transaction.oncomplete = function () {
      // delete the parent of the button which is the list item
      e.target.parentNode.parentNode.parentNode.removeChild(
        e.target.parentNode.parentNode,
      )
      alert(`Note with id: ${noteId} deleted.`)

      if (!list.firstChild) {
        const listItem = document.createElement('li')
        listItem.textContent = 'No notes stored'
        list.appendChild(listItem)
      }
    }
  }
}
