const loadData = async (searchText) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const value = await res.json();
  const phones = value.data;
  displayPhone(phones);
};


const displayPhone = (phones) => {
  //step1: get div
  const phoneContainer = document.getElementById("phone-container");
  // clear phone container
  phoneContainer.textContent = '';
  phones.forEach((phone) => {
    console.log(phone)
    // step 2: create
    const phoneCard = document.createElement("div");
    phoneCard.classList = "card text-black bg-gray-200 p-4 shadow-xl";
    // step 3: innerHTML
    phoneCard.innerHTML = `
          <figure>
              <img
                src="${phone.image}"
                alt="Shoes" />
            </figure>
            <div class="card-body">
              <h2 class="card-title">${phone.phone_name}</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div class="card-actions">
                <button class="btn btn-primary w-full">Buy Now</button>
              </div>
        `;
    // step 4: append child
    phoneContainer.appendChild(phoneCard)
  });
};

// search result
const handleSearch = () =>{
  const input = document.getElementById('input-field')
  const inputText = input.value
  loadData(inputText);
  // console.log(inputText)
}

// loadData();