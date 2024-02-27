const phoneLoading = async()=>{
    const phoneload = await fetch("https://openapi.programming-hero.com/api/phones?search=iphone");
    const data = await phoneload.json();
    showDisplay(data.data)
}

const showDisplay = (data)=>{
    const containerPhone = document.getElementById("product-content");
    data.forEach(ele => {
        console.log(ele)
        let div = document.createElement("div");
        div.innerHTML = `
        <div class="card p-[25px] text-center border border-gray-300 space-y-4">
        <div class="flex justify-center">
            <img src="${ele.image}" alt="">
        </div>
        <h3 class="font-bold">${ele.phone_name}</h3>
        <p class="text-[#706F6F]">${ele.slug}</p>
        <p class="font-bold">$999</p>
        <button class="py-[10px] px-[25px] bg-[#0D6EFD] text-white rounded-lg w-[70%] mx-auto">Show Details</button>
        </div>
        `
        containerPhone.appendChild(div)
    });
}
phoneLoading()