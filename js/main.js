let title = document.getElementById('title');
let cost = document.querySelectorAll("#cost input");
let total = document.getElementById('total');
let count = document.getElementById('count');
let department = document.getElementById('department');
let btncreate = document.getElementById('btncreate');
let tablebody = document.getElementById("tablebody");
let DeleteallBTN = document.getElementById('DeleteallBTN');
let spandeletBtn = document.getElementById('spandeletBtn');
let mood = "انشاء";
let globalid;
// let result = document.getElementById('result');
let data = document.querySelector("tbody");


let allData;

if (localStorage.product != null) {
    allData = JSON.parse(localStorage.product);
} else {
    allData = [];
}
/////////////
let gettotal = () => {
    let price = cost[0].value,
        tax = cost[1].value,
        tcost = cost[2].value,
        discound = cost[3].value;
    let GetTotalValue = (+price + +tax + +tcost) - discound;
    cost[4].value = Math.ceil(GetTotalValue);

}
for (let i = 0; i < cost.length; i++) {
    cost[i].addEventListener('keyup', gettotal)
}
let Creatobject = () => {
    let newdata = {
        title: title.value,
        price: cost[0].value,
        tax: cost[1].value,
        Tcost: cost[2].value,
        discound: cost[3].value,
        total: total.value,
        count: count.value,
        department: department.value,


    }
    if (!title.value || !cost[0].value || !cost[1].value || !cost[2].value || !cost[3].value || !total.value || !department.value) {
        alert("Fill the input");
    } else {
        if (mood == "انشاء") {
            if (newdata.count > 1)

            {
                for (let i = 0; i < newdata.count; i++) {
                    allData.push(newdata);
                }
            } else {
                allData.push(newdata);

            }
        } else {
            allData[globalid] = newdata;
            mood = "انشاء";
            btncreate.innerHTML = "انشاء";
            btncreate.classList.replace("btn-warning", "btn-info");
            count.classList.remove("none");
        }
    }


    localStorage.setItem("product", JSON.stringify(allData));
    showdata();
    clearinput();
}
let showdata = () => {
    let table = '';
    for (let i = 0; i < allData.length; i++) {


        table += `
    <tr class="tr-table">
    <td>${i+1}</td>
    <td>${allData[i].title}</td>
    <td>${allData[i].price}</td>
    <td>${allData[i].tax}</td>
    <td>${allData[i].Tcost} </td>
    <td> ${allData[i].discound}</td>
    <td> ${allData[i].total}</td>
    <td> ${allData[i].department}</td> 

    <td id="result" > ${Date(TimeRanges)} </td> 
    <td> 
    <button id="btn" class="btn btn-danger" onclick="deletitems(${i})">حذف</button>
    </td>
    <td> 
    <button id="btn" class="btn btn-primary"onclick="updatedata(${i})" > تعديل</button>
    </td>
    </tr>
    `
    }
    if (allData.length > 0) {
        DeleteallBTN.classList.remove("none");
        spandeletBtn.innerHTML = allData.length;
    } else {
        DeleteallBTN.classList.add("none");

    }

    tablebody.innerHTML = table;
}
showdata();
btncreate.addEventListener("click", Creatobject);



// clear inputs

let clearinput = () => {
    title.value = '';
    cost[0].value = '';
    cost[1].value = '';
    cost[2].value = '';
    cost[3].value = '';
    total.value = '';
    count.value = '';
    department.value = '';
}

let deletitems = (i) => {
    allData.splice(i, 1);
    localStorage.product = JSON.stringify(allData);
    showdata();
}
let Deleteallitems = () => {
    localStorage.clear();
    allData.splice(0);
    showdata();
}
DeleteallBTN.addEventListener('click', Deleteallitems);

let updatedata = (i) => {
    mood = "تحديث"
    title.value = allData[i].title
    cost[0].value = allData[i].price
    cost[1].value = allData[i].tax
    cost[2].value = allData[i].Tcost
    cost[3].value = allData[i].discound
    cost[4].value = allData[i].total
    department.value = allData[i].department
    globalid = i;
    count.classList.add("none");
    btncreate.innerHTML = "تحديث";
    btncreate.classList.replace("btn-info", "btn-warning")
}