const updateButton = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')

updateButton.addEventListener('click', _ => {
    fetch('/quotes', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            species: 'pin fish',
            tip: 'anything'
        })
    })
    .then(res => {
        if(res.ok) return res.json()
    })
    .then(res => {
        window.location.reload(true)
    })
    
})

deleteButton.addEventListener('click', _ => {
    fetch('/quotes', {
        method: 'delete',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            species: 'pin fish'
        })
    })
    .then(res => {
        if(res.ok) return res.json()
        })
    .then(response => {
        window.location.reload(true)
    })
})