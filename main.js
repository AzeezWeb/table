
let tbody = document.querySelector('tbody');
let minusBtn = document.querySelector('.minus');
let checkBtn = document.querySelector('.check');
let filterBtn = document.querySelector('.filter-btn');
let deletBtn = document.querySelector('.delete-btn');
let title = document.querySelector('.title');
let checkBtnAll = document.querySelector('.minus-all');
let all = document.querySelector('.check-all')

let cols = document.querySelector('.cols');
let row5 = document.querySelector('.row-5');
let row10 = document.querySelector('.row-10');
let row20 = document.querySelector('.row-20');

cols.addEventListener('click', () => {
  cols.nextElementSibling.style.display = 'flex'
})

row5.addEventListener('click', () => {
  tbody.innerHTML = '';
  row = 5;
  addItem()
  cols.nextElementSibling.style.display = 'none'
  cols.innerHTML = `5 <img src="icon/down.png" alt="icon">`;
})
row10.addEventListener('click', () => {
  row = 10;
  addItem()
  cols.nextElementSibling.style.display = 'none'
  cols.innerHTML = `10 <img src="icon/down.png" alt="icon">`;
})
row20.addEventListener('click', () => {
  row = 20;
  addItem()
  cols.nextElementSibling.style.display = 'none'
  cols.innerHTML = `20 <img src="icon/down.png" alt="icon">`;
})


let row = 5;

function addItem() {
  for (let i = 0; i < row; i++) {
    let trItem = document.createElement(`tr`);
    trItem.classList = ('tr-body');
    trItem.id = products[i].id
    trItem.innerHTML = `
  <td>
  <button class="checked" data-action="check"><img src="icon/check.png" alt="icon"></button>
  </td>
  <td>
    ${products[i].desert}
  </td>
  <td>
  ${products[i].colories}
  </td>
  <td>
  ${products[i].fat}
  </td>
  <td>
  ${products[i].carbs}
  </td>
  <td>
  ${products[i].protein}
  </td>`;
    tbody.appendChild(trItem)
  }
}

addItem()


tbody.addEventListener('click', (e) => {
  let parenNode = e.target.closest('tr')
  if (e.target.dataset.action === 'check') {
    e.target.classList.toggle('checked-active')
    parenNode.classList.toggle('tr-active')
    let id = Number(parenNode.id)
    let index = products.findIndex((index) => index.id === id)
    if (products[index].check === false) {
      products[index].check = true
    } else {
      products[index].check = false
    }

    let minus = products.some(index => index.check == true);
    let count = products.filter(index => index.check == true);
    if (minus == true) {
      all.style.display = 'block'
      all.style.backgroundColor = 'blue'
      checkBtn.style.display = 'block'
      checkBtnAll.style.display = 'none'
      selectedItem()
      filterBtn.style.display = 'none'
      deletBtn.style.display = 'block'
    } else {
      all.style.display = 'none'
      title.classList.remove('tr-active')
      title.childNodes[1].textContent = 'Nutrition'
      filterBtn.style.display = 'block'
      deletBtn.style.display = 'none'
      checkBtnAll.style.display = 'block'
      selectedItem()
    }
  }

})


checkBtnAll.addEventListener('click', () => {
  let checkItem = document.querySelectorAll('.checked')
  checkItem.forEach((index) => {
    checkBtn.style.display = 'none';
    index.classList.add('checked-active')
    index.parentNode.parentNode.classList.add('tr-active')
    checkBtnAll.style.backgroundColor = 'blue';

    products.forEach((item) => {
      item.check = true
    })
    let checkItem = products.every((check) => check.check == true);

    if (checkItem == true) {
      index.classList.remove('checked-active')
      index.parentNode.parentNode.classList.remove('tr-active')
      title.classList.remove('tr-active');
      title.childNodes[1].textContent = ` Nutrition`;
      deletBtn.style.display = 'none';
      filterBtn.style.display = 'block'
      checkBtnAll.style.backgroundColor = 'transparent';
      all.style.display = 'block'
      all.style.backgroundColor = 'transparent'
      checkBtnAll.style.display = 'none'

      products.forEach((item) => {
        item.check = false
      })
      selectedItem()
    }


  })

})

all.addEventListener('click', () => {
  let checkItem = document.querySelectorAll('.checked')
  checkItem.forEach((index) => {

    minusBtn.style.display = 'block';
    deletBtn.style.display = 'block'
    filterBtn.style.display = 'none'
    index.classList.add('checked-active')
    index.parentNode.parentNode.classList.add('tr-active')
    checkBtnAll.style.backgroundColor = 'blue';
    all.style.display = 'none'
    checkBtnAll.style.display = 'block'
    for (let i = 0; i < row; i++) {
      products[i].check = true
    }
    selectedItem()
  }
  )
})

deletBtn.addEventListener('click', () => {
  let truthy = products.filter((index) => index.check == false)
  tbody.innerHTML = '';
  title.classList.remove('tr-active');
  title.childNodes[1].textContent = ` Nutrition`;
  all.style.display = 'block';
  filterBtn.style.display = 'block';
  deletBtn.style.display = 'none';
  checkBtnAll.style.display = 'none';
  all.style.backgroundColor = 'transparent'
  let s = row + truthy.length;
  let ss = s - products.length;
  console.log(ss);
  for (let i = 0; i < ss; i++) {
    let trItem = document.createElement(`tr`);
    trItem.classList = ('tr-body');
    trItem.id = truthy[i].id
    trItem.innerHTML = `
    <td>
    <button class="checked" data-action="check"><img src="icon/check.png" alt="icon"></button>
    </td>
    <td>
      ${truthy[i].desert}
    </td>
    <td>
    ${truthy[i].colories}
    </td>
    <td>
    ${truthy[i].fat}
    </td>
    <td>
    ${truthy[i].carbs}
    </td>
    <td>
    ${truthy[i].protein}
    </td>`;
    tbody.appendChild(trItem)
  }
 
  // selectedItem(zero())
})


function selectedItem() {
  let count = 0;
  
  products.forEach((item) => {
    if (item.check == true) {
      count += 1;
      title.classList.add('tr-active');
      title.childNodes[1].textContent = ` ${count} Selected`;
    }


  })

}