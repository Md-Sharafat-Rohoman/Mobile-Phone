const loadPhone = async (searchText,isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones,isShowAll);
   
}

const displayPhones = (phones,isShowAll) => {
    // console.log(phones);
    /* step : 1 */
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = ''

    const showAllContainer = document.getElementById('show-all-continer')
    if (phones.length > 12) {
        showAllContainer.classList.remove('hidden')
    }
    else {
        showAllContainer.classList.add('hidden')
    }
    // console.log('is show all',isShowAll)


    /* display only first 10 phone */
    phones = phones.slice(0, 10);


    /* step : 2 */
    phones.forEach(phone => {
        // console.log(phone);

        const phoneCard = document.createElement('div')
        phoneCard.classList = `card p-4  bg-base-100  shadow-xl`
        /* step : 3 */
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
                    <div class="card-body">
                      <h2 class="card-title">${phone.phone_name}</h2>
                      <p>If a dog chews shoes whose shoes does he choose?</p>
                      <div class="card-actions justify-center">
                        <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
                      </div>
                    </div>

        `
        phoneContainer.appendChild(phoneCard)
    });
    toggleLoadingSpeanir(false);

}
// handle click
const handleSearch = (isShowAll) => {
    toggleLoadingSpeanir(true);
    const searchFiled = document.getElementById('search-field');
    const searchText = searchFiled.value;
    console.log(searchText);
    loadPhone(searchText,isShowAll);
}
// const handleSearch2 = () => {
//     toggleLoadingSpeanir(true);
//     const searchFiled = document.getElementById('search-field2');
//     const searchText = searchFiled.value;
//     console.log(searchText);
//     loadPhone(searchText);
// }

const toggleLoadingSpeanir = (isLoading) => {
    const loadingSpeanir = document.getElementById('loading-spinner')
    if (isLoading) {
        loadingSpeanir.classList.remove('hidden')
    }
    else {
        loadingSpeanir.classList.add('hidden')
    }
}

const handleShowAll = () => {
    handleSearch(true);
}

const handleShowDetails= async(id)=>{
    // console.log('handleShowDetails',id);
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json();
    // console.log(data)
    const phone = data.data
    showPhoneDetails(data)
}
const showPhoneDetails = (phone) => {
    console.log(phone);
    const phoneName = document.getElementById('phone-name');
    phoneName.innerText = phone.data.name;

    const showDetailContainer = document.getElementById('show-detail-container')
    showDetailContainer.innerHTML =`
    <img src="${phone.data.image}" alt="">
    <p><span>storage:</span>${phone.data.mainFeatures.storage                                                   
    }</p>
    `
    

    show_details_mordal.showModal();
}

loadPhone();