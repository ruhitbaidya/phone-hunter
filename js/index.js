
const spinners = (spinnersLoad=true)=>{
    const spinnerLoading = document.getElementById("spinnerLoading");
    if(spinnersLoad === true){
        spinnerLoading.classList.remove("hidden")
    }else{
        spinnerLoading.classList.add("hidden")
    }
}
const phoneLoading = async(product)=>{
    spinners(true)
        const phoneload = await fetch(`https://openapi.programming-hero.com/api/phones?search=${product}`);
    const data = await phoneload.json();
    showDisplay(data.data)

}

const showDisplay = (data)=>{
    const showButton = document.getElementById("showButton");
    if(data.length >= 12){
        showButton.classList.remove("hidden")
        data = data.slice(0, 5)
    }else{
        showButton.classList.add("hidden")
    }
    const containerPhone = document.getElementById("product-content");
    containerPhone.innerHTML = '';
    data.forEach(ele => {
        let div = document.createElement("div");
        div.innerHTML = `
        <div class="card p-[25px] text-center border border-gray-300 space-y-4">
        <div class="flex justify-center">
            <img src="${ele.image}" alt="">
        </div>
        <h3 class="font-bold">${ele.phone_name}</h3>
        <p class="text-[#706F6F]">${ele.slug}</p>
        <button class="py-[10px] px-[25px] bg-[#0D6EFD] text-white rounded-lg w-[70%] mx-auto" onclick="showDetails('${ele.slug}')">Show Details</button>
        </div>
        `
        containerPhone.appendChild(div)
        spinners(false)
    });
}

const showDetails = async (find)=>{
    const findPhone = await fetch(`https://openapi.programming-hero.com/api/phone/${find}`);
    const details = await findPhone.json();

    phoneDetailsDisplay(details)
    console.log(details)
}

const phoneDetailsDisplay = (details)=>{
    const detailsContainer = document.getElementById("detailsContainer");
    detailsContainer.innerHTML = "";
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="flex justify-center mb-[20px]"> 
    <img src="${details.data.image ? details.data.image : "Blank Image"}" alt="">
    </div>
    <div class="space-y-4">
        <p><span class="font-bold">Storage : </span> ${details?.data?.mainFeatures?.storage || "Not Avavil"}</p>
        <p><span class="font-bold">Display Size : </span> ${details?.data?.mainFeatures?.displaySize || "Not Avavil"}</p>
        <p><span class="font-bold">ChipSet : </span> ${details?.data?.mainFeatures?.chipSet || "Not Avavil"}</p>
        <p><span class="font-bold">Memory : </span> ${details?.data?.mainFeatures?.memory || "Not Avavil"}</p>
        <p><span class="font-bold">Slug : </span> ${details?.data?.slug || "Not Aviavil"}</p>
        <p><span class="font-bold">Release Date : </span> ${details?.data?.releaseDate || "Not Avavil"}</p>
        <p><span class="font-bold">Brand : </span> ${details?.data?.brand || "Not Avavil"}</p>
        <p><span class="font-bold">GPS : </span> ${details?.data?.others?.GPS || "Not Avavil"}</p>
    </div>
    `
    detailsContainer.appendChild(div);
    my_show_modal.showModal();
}

const searchProduct = ()=>{
    const valueSearch = document.getElementById("searchText");
    const valueInputs = valueSearch.value;
    phoneLoading(valueInputs);
    valueInputs.value = "";
}
phoneLoading("iphone");