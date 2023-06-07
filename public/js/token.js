const tokenForm = document.querySelector("#tokenForm")

tokenForm.addEventListener('submit', event => {
    event.preventDefault()
    const data = new FormData(tokenForm)
    const obj = {}
    data.forEach((value, key) => obj[key] = value)
    fetch('/api/sessions/resetToken', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result => {
        console.log(result.status)
        if (result.status === 201) {
            window.location.replace(`/recuperar/`)
        }
    })
})