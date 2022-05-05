fetch('http://localhost:3000/pups')
.then(res => res.json())
.then(doggos => filterStatus(doggos));

const dogBar = document.querySelector('#dog-bar')
const dogSummary = document.querySelector('#dog-summary-container')
const dogInfo = document.querySelector('#dog-info')
const filterBtn = document.querySelector('#good-dog-filter')
filterBtn.value = 'off';
console.log(filterBtn.value)
function filterStatus(doggos) {
    addPups(doggos);
    filterBtn.addEventListener('click', () => {
        if (filterBtn.value === 'off') {
            filterBtn.value = 'on';
            filterBtn.textContent = 'Filter good dogs: ON'
        }
        else {filterBtn.value = 'off';
        filterBtn.textContent = 'Filter good dogs: OFF'
    }
        dogBar.innerHTML = '';
        addPups(doggos)
})
}
function addPups(doggos) {

  if (filterBtn.value === 'on') {
    doggos.forEach(doggo => {
        if (doggo.isGoodDog) {
        const dogNameSpan = document.createElement('span')
        dogNameSpan.textContent = doggo.name
        dogBar.append(dogNameSpan);
        dogNameSpan.addEventListener('click', () => fetchDog(doggo))
    }});
  }
  else {
    doggos.forEach(doggo => {
        const dogNameSpan = document.createElement('span')
        dogNameSpan.textContent = doggo.name
        dogBar.append(dogNameSpan);
        dogNameSpan.addEventListener('click', () => fetchDog(doggo))
    });
  }
}

function fetchDog(doggo) {
    dogInfo.innerHTML = '';
    const img = document.createElement('img')
    const name = document.createElement('h2')
    const btn = document.createElement('button')
    img.src = doggo.image
    name.textContent = doggo.name
    btn.textContent = doggo.isGoodDog ? 'Good Dog!' : 'Bad Dog!';
    btn.addEventListener('click', () => {
        if (doggo.isGoodDog) {doggo.isGoodDog = false}
        else if (!doggo.isGoodDog) {doggo.isGoodDog = true}
        btn.textContent = doggo.isGoodDog ? 'Good Dog!' : 'Bad Dog!';
    })
    
    dogInfo.append(img, name, btn)
    
}