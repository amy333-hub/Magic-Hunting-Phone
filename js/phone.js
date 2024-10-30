const loadPhone = async (text, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${text}`)
    const mobile = await res.json();

    displayPhones(mobile.data, isShowAll)
}
const displayPhones = (phones, isShowAll) => {
    //console.log(phone)


    const phoneContainer = document.getElementById('phone-container')
    phoneContainer.textContent = '';

  

    const showAllContainer =document.getElementById('show-allContainer')
    if(phones.length > 12 && !isShowAll){
      showAllContainer.classList.remove('hidden')
    }
    else{
      showAllContainer.classList.add('hidden')
    }
    if(!isShowAll){
      phones = phones.slice(0,12)
    }
  
    phones.forEach(phone =>{
        //console.log(phone)
        const phoneCard = document. createElement('div')
        phoneCard.classList = 'card bg-gray-100 p-4 shadow-xl'

        phoneCard.innerHTML = `
        <figure>
                  <img
                    src="${phone.image}"
                    alt="Shoes" />
                </figure>
                <div class="card-body">
                  <h2 class="card-title">${phone.phone_name}</h2>
                  <p>If a dog chews shoes whose shoes does he choose?</p>
                  <div class="card-actions justify-end">
                    <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Detail</button>
                  </div>
                </div>
                `;
                phoneContainer.appendChild(phoneCard);

    })
    toggleLoadingSpinner(false);
}

//search field

const handleSearch = () => {
  toggleLoadingSpinner(true)
    const searchField = document.getElementById('search-feild');
    const text = searchField.value;
    console.log(text);
      loadPhone(text)
}
// show all card button
const handleShowAll = ()=> {
  handleSearch(true)
}
//show mobile detalis

const handleShowDetail = async(id) =>{
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
  const data = await res.json();
  const phone = data.data
  showPhoneDetails(phone)
}

const showPhoneDetails = (phone) =>{
  const phoneName = document.getElementById('show-detail-phone-name');
  phoneName.innerText = phone.name

  const showPhoneDetailContainer = document.getElementById('show-detail-container');
  showPhoneDetailContainer.innerHTML =`
  <img src="${phone.image}" alt="">
  <p><span>Storage:</span>${phone?.mainFeatures?.storage}</p>
  <p><span>Display size: </span>${phone?.mainFeatures?.displaySize}</p>
  <p><span>ChipSet: </span>${phone?.mainFeatures?.chipSet}</p>
  <p><span>Memory: </span>${phone?.mainFeatures?.memory}</p>
  <p><span>Sensor: </span>${phone?.mainFeatures?.sensors}</p>
  <p><span>Slug: </span>${phone?.slug}</p>
  <p><span>Name: </span>${phone?.name}</p>


  
`
  my_modal_1.showModal();

}
//spinner
const toggleLoadingSpinner = (isLoding) => {
  const isLoadingSpinner = document . getElementById('loading-spinner')
  if(isLoding){
    isLoadingSpinner.classList.remove('hidden')
  }
  else{
       isLoadingSpinner.classList.add('hidden')
  }
}

loadPhone();