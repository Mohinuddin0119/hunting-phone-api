const loadData = async (searchText,isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const value = await res.json();
  const phones = value.data;
  displayPhone(phones,isShowAll);
};


const displayPhone = (phones,isShowAll) => {
  //step1: get div
  const phoneContainer = document.getElementById("phone-container");
  // clear phone container
  phoneContainer.textContent = '';
  // when phone length is 12 above those added hidden class of classlist
  const showAllContainer = document.getElementById('showAllContainer')
  if(phones.length > 12 && !isShowAll){
    showAllContainer.classList.remove('hidden')
  }
  else{
    showAllContainer.classList.add('hidden')
  }
  // display only first 12 phone if not show all button
  // console.log('is show all',isShowAll)
  if(!isShowAll){
    phones = phones.slice(0,12)
  }
  // 
  phones.forEach((phone) => {
    // console.log(phone)
    // step 2: create
    const phoneCard = document.createElement("div");
    phoneCard.classList = "card text-black bg-gray-200 p-4 shadow-xl";
    // step 3: innerHTML
    phoneCard.innerHTML = `
          <figure class=''>
              <img
                src="${phone.image}"
                alt="Shoes"
                 />
            </figure>
            <div class="card-body">
              <h2 class="card-title">${phone.phone_name}</h2>
              <p>There are many variations of passages of available, but the majority have suffered</p>
              <h5 class="font-bold text-xl text-center">$999</h5>
              <div class="card-actions">
                <button onclick="handleShowDetails('${phone.slug}'); show_details.showModal()" class="btn btn-primary w-full">Show details</button>
              </div>
        `;
    // step 4: append child
    phoneContainer.appendChild(phoneCard)
  });
  // end of loading  
  toggleSpinnerLoading(false)
};

// handle show details btn
const handleShowDetails = async(id) =>{
  // load single phone data
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
  const value =await res.json();
  const phone = value.data
  console.log(phone)
  showPhoneDetails(phone)
}
// show phone details
const showPhoneDetails = (phone) =>{
  const showPhoneDetailsContainer = document.getElementById('show_details_container')
  showPhoneDetailsContainer.innerHTML = `
  <div class='p-5 flex justify-center items-center'> 
  <img src="${phone.image}" alt="">
  </div>
  <h3 class="text-2xl text-black font-bold">${phone.name}</h3>
  <p >It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
  
  <div class='flex gap-3'>
  <h5 class="font-bold text-black">Storage: </h5>
  <p>${phone.mainFeatures.storage}</p>
  </div>
  
  <div class='flex gap-3'>
  <h5 class="font-bold text-black">Display Size: </h5>
  <p>${phone.mainFeatures.displaySize}</p>
  </div>
  
  <div class='flex gap-3'>
  <h5 class="font-bold text-black">Chipset: </h5>
  <p>${phone.mainFeatures.chipSet}</p>
  </div>
  
  <div class='flex gap-3'>
  <h5 class="font-bold text-black">Memory: </h5>
  <p>${phone.mainFeatures.memory}</p>
  </div>
  <div class='flex gap-3'>
  <h5 class="font-bold text-black">Slug:</h5> 
  <p>${phone.slug}<p>
  </div>
  <div class='flex gap-3'>
  <h5 class="font-bold text-black">Relase data: </h5>
  <p>${phone.releaseDate}</p>
  </div>
  <div class='flex gap-3'>
  <h5 class="font-bold text-black">Brand: </h5>
  <p>${phone.brand}</p>
  </div>
  <div class='flex gap-3'>
  <h5 class="font-bold text-black">GPS: 
  </h5>
  <p> AYes, with A-GPS, GLONASS, GALILEO, BDS, QZSS</p>
  </div>
  
  
  <form method="dialog" class="flex justify-end">
  <button class="btn text-white bg-red-500 border-none">Close</button>
  </form>
  `
}

// search result
const handleSearch = (isShowAll) =>{
  // start loading
  toggleSpinnerLoading(true)
  const input = document.getElementById('input-field')
  const inputText = input.value
  loadData(inputText,isShowAll);
  // console.log(inputText)
}

// spinner or loader handle
const toggleSpinnerLoading = (isLoading) =>{
  const spinnerLoading = document.getElementById('spinnerLoading')
  if(isLoading){
    spinnerLoading.classList.remove('hidden')
  }
  else{
    spinnerLoading.classList.add('hidden')
  }
}

// handle show all button
const handleShowAll = () =>{
  handleSearch(true);
}
// loadData();