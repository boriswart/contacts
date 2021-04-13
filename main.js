let contacts = []
let contact = {}

/**
 * Called when submitting the new Contact Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the contacts list.
 * Then reset the form
 * *** hints:
 * *** push: resources/push.jpg
 */
function addContact(event) {
  event.preventDefault()
  let form = event.target
  let cb = document.getElementsByTagName("emergencyContact")
  console.log(form.name.value)
  console.log(form.phone.value)
  contact = {
    id: generateId(),
    name: form.name.value.toString(),
    phone: form.phone.value,
    emergencyContact: form.emergencyContact.checked
  }
  console.log(contact)
  contacts.push(contact)
  saveContacts()
  form.reset()
}

/**
 * Converts the contacts array to a JSON string then
 * Saves the string to localstorage at the key contacts 
 */
function saveContacts() {
  window.localStorage.setItem("contacts", JSON.stringify(contacts))
  drawContacts()
}

/**
 * Attempts to retrieve the contacts string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the contacts array to the retrieved array
 */
function loadContacts() {
  let storedContacts = JSON.parse(window.localStorage.getItem("contacts"))
  if (storedContacts) {
    contacts = storedContacts
  }
}

/**
 * This function targets the contacts-list on the 
 * DOM and adds a new div element for each of the
 * contacts in the contacts array
 */
function drawContacts() {
  let contactListElem = document.getElementById("contact-list")
  let contactsTemplate = ""

  // < button type = "button" onclick = "removeContact('${x.id}')" > remove</button>
  contacts.forEach(x => {
    //console.log(x.id)
    contactsTemplate += `
    <div class= "contact-card ${x.emergencyContact ? ' emergency-contact ' : ' '}" >
        <h3 class="mt-1 mb-1 ml-3">${x.name}</h3>
        <div class="d-flex  space-between ">
          <div>
             <span><i class="fa fa-fw fa-phone ml-2 ${x.emergencyContact ? 'text-light' : ''}"></i></span>
             <span>${x.phone}</span>
          </div>
          <i class="action fa fa-trash text-danger right-1em" onclick="removeContact('${x.id}')"></i>
        </div>
      </div>
    `
  })
  contactListElem.innerHTML = contactsTemplate
}

/**
 * This function is called with a contact id
 * and will use the id to find and remove the 
 * contact by their id from the list of contacts
 * *** hints: 
 * *** findIndex: resources/findIndex.jpg
 * *** splice: resources/splice.jpg
 * @param {string} contactId 
 */
function removeContact(contactId) {
  let indx = contacts.findIndex(x => x.id == contactId)
  if (indx == -1) {
    throw new Error("Invalid ContactID")
  }
  console.log(indx)
  contacts.splice(indx, 1)
  saveContacts()
}

/**
 * Toggles the visibility of the AddContact Form
 */
function toggleAddContactForm() {
  document.getElementById('new-contact-form').classList.toggle("hidden")
}


/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}


loadContacts()
drawContacts()