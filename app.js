// alert('hello');
const modalWrapper = document.querySelector('.modal-wrapper');
//addModal
const addModal = document.querySelector('.add-modal');
const tableUser = document.querySelector('.user-table');
const addModalForm = document.querySelector('.add-modal .form');
//addUser 
const btnAdd = document.querySelector('.btn-addUser');

//create element and render the user 
const renderUser = doc => {
    const tr = `
    <tr data-id = '${doc.id}'>
    <td>${doc.data().id}</td>
    <td>${doc.data().category}</td>
    <td>${doc.data().title}</td>
    <td>
        <button class="btn btn-edit">Edit</button>
        <button class="btn btn-delete">Delete</button>
    </td>
    </tr>
    `;
    tableUser.insertAdjacentHTML('beforeend', tr);

    //click delete user 
    const btnDelete = document.querySelector(`[data-id='${doc.id}'] .btn-delete`);
    btnDelete.addEventListener('click', () => {
        db.collection('news').doc(`${doc.id}`).delete().then(() => {
            console.log('document successfully deleted');
            window.location.reload();
        }).catch(err => {
            console.log('error in the document');
        })
    });

    const btnEdit = document.querySelector(`[data-id='${doc.id}'] .btn-edit`);
    btnEdit.addEventListener('click', () => {
        db.collection('news').doc(`${doc.id}`).get().then(() => {
            display();
            document.querySelector('.id').value += doc.data().id;
            document.querySelector('.cat').value += doc.data().category;
            document.querySelector('.title').value += doc.data().title;

        })
    });
}



btnAdd.addEventListener("click", display);

function display() {
    addModal.classList.add('modal-show');

}

//user click outsde the model 
window.addEventListener('click', e => {
    if (e.target === addModal) {
        addModal.classList.remove('modal-show');
    }
});

//get all users
db.collection('news').orderBy("id").get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
        console.log(doc.data().email);
        renderUser(doc);
    });
})

//click submit in add modal
addModalForm.addEventListener('submit', e => {
    e.preventDefault();

    db.collection('news').add({
        id: addModalForm.id.value,
        category: addModalForm.category.value,
        title: addModalForm.title.value,
        news_desc: addModalForm.desc.value,
        img_url: addModalForm.img_url.value
        // email: addModalForm.email.value,
    });
    modalWrapper.classList.remove('modal-show');
});