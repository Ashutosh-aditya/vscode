const contacts=[];
// id,name,email,phone,address
var counter=0;
const modal = document.getElementById("modal");
const addTab = document.getElementById("addContactTab");  
const viewTab = document.getElementById("viewAllContacts");
const searchTab=document.getElementById("searchContact")
const editOrdeleteTab=document.getElementById("editContactTab");

const closeAllTabs=()=>{
    searchTab.style.display="none";
    addTab.style.display="none";
    viewTab.style.display="none";
    editOrdeleteTab.style.display="none";
}

const closeModal=()=>{
    closeAllTabs();
    modal.style.display="none";
    console.log("close");
}


const addContact=()=>{
    closeAllTabs();
    modal.style.display="block";
    addTab.style.display="block";
    console.log("Hi");
}

const searchContactTab=()=>{
    closeAllTabs();
    modal.style.display="block";
    searchTab.style.display="flex";
}

const SubmitData=()=>{
    const Clientname = document.getElementById("name")?.value;
    const phone = document.getElementById("phone")?.value;
    const email = document.getElementById("email")?.value;
    const address = document.getElementById("address")?.value;
    var entry = {
        "id":++counter,
        "client_name":Clientname,
        "phone":phone,
        "email":email,
        "address":address,
    }
    contacts.push(entry);
}

const viewList=()=>{
    closeAllTabs();
    console.log(contacts);
    modal.style.display="block";
    viewTab.style.display="block";
    viewTab.innerHTML=`
    <table border=1>
    <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Address</th>
    </tr>
    ${contacts.map((item,index)=>`
        <tr>
            <td>${item.id}</td>
            <td>${item.client_name}</td>
            <td>${item.email}</td>
            <td>${item.phone}</td>
            <td>${item.address}</td>
        </tr>
    `
)}
    </table>
    `;
}

const searchContacts=()=>{
    console.log("search called ");
    closeAllTabs();
    modal.style.display="block";
    searchTab.style.display="flex";
    const searchKey = document.getElementById("SearchKey")?.value;
    const resultDisplay=document.getElementById("searchResult");
    const result = contacts.find(item=>item.client_name===searchKey);
    console.log("search called ",searchKey+" "+resultDisplay+" "+result);
    resultDisplay.innerHTML=  result===undefined?
    `<h2>No Match Found</h2>`:
    `
        <h3>${result.client_name}</h3>
        <h3>${result.email}</h3>
        <h3>${result.phone}</h3>
        <h3>${result.address}</h3>
    `;
}

const editAndModifyContacts=()=>{
    closeAllTabs();
    console.log(contacts);
    modal.style.display="block";
    editOrdeleteTab.style.display="block";    
    const res=document.getElementById("editContactTabResult");
    res.innerHTML=`
    <table border=1>
    <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Address</th>
    </tr>
    ${contacts.map((item,index)=>`
        <tr>
            <td>${item.id}</td>
            <td>${item.client_name}</td>
            <td>${item.email}</td>
            <td>${item.phone}</td>
            <td>${item.address}</td>
            <td><button onclick="editContact(${item.id})">Edit</button></td>
            <td><button onclick="deleteContact(${item.id})">Delete</button></td>
        </tr>
    `
)}
    </table>
    `;
}

const deleteContact=(id)=>{
    id=contacts.findIndex(contact=>contact.id===id);
    contacts.splice(id,1);
    console.log(id);
    editAndModifyContacts();
}

const editContact = (id) => {
    closeAllTabs();
    modal.style.display = "block";
    editOrdeleteTab.style.display = "block";

    const contact = contacts.find(item => item.id === id);
    const res = document.getElementById("editContactTabResult");

    if (!contact) {
        res.innerHTML = `<h3>Contact not found</h3>`;
        return;
    }

    res.innerHTML = `
        <h3>Edit Contact (ID: ${contact.id})</h3>
        <label>Name <input type="text" id="editName" value="${contact.client_name}"></label><br>
        <label>Email <input type="email" id="editEmail" value="${contact.email}"></label><br>
        <label>Phone <input type="number" id="editPhone" value="${contact.phone}"></label><br>
        <label>Address <textarea id="editAddress">${contact.address}</textarea></label><br>
        <button onclick="updateContact(${id})">Update</button>
        <hr>
    `;
};

const updateContact = (id) => {
    const index = contacts.findIndex(item => item.id === id);
    if (index === -1) return;

    contacts[index].client_name = document.getElementById("editName").value;
    contacts[index].email = document.getElementById("editEmail").value;
    contacts[index].phone = document.getElementById("editPhone").value;
    contacts[index].address = document.getElementById("editAddress").value;

    alert("Contact updated successfully!");
    editAndModifyContacts();
};

