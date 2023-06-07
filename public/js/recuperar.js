const recuperarForm = document.querySelector("#recuperarForm")

recuperarForm.addEventListener('submit', event => {
    event.preventDefault()
    const data = new FormData(recuperarForm)
    const obj = {}
    data.forEach((value, key) => obj[key] = value)
    fetch('/api/users', {
        method: 'PUT',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result => {
        console.log(result.status)
        if (result.status === 201) {
            window.location.replace('/login')
        }
    })
})