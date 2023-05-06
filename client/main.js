document.addEventListener('DOMContentLoaded', async () => {
    const body = document.body;
    const getMovies = document.createElement('button');
    getMovies.type="button";
    getMovies.textContent="Get all movies";
    const deleteMovies = document.createElement('button');
    deleteMovies.type="button";
    deleteMovies.textContent="Delete movie";
    const deleteText = document.createElement('textarea');
    const form = document.getElementById('form');
    const container = document.getElementById('container');
    const newerDiv = document.createElement('div');
    const updateDiv = document.createElement('div');
    const currMovieText = document.createElement('textarea');
    const updateMovieText = document.createElement('textarea');
    currMovieText.setAttribute('placeholder', 'Enter new name of movie...');
    updateMovieText.setAttribute('placeholder', 'Enter name of movie to update...');
    const updateButton = document.createElement('button');
    const deleteDiv = document.createElement('div');
    deleteDiv.append(deleteText, deleteMovies);
    updateButton.type="button";
    updateButton.textContent="Update Movie"
    updateDiv.append(currMovieText, updateMovieText, updateButton);
    newerDiv.append(updateDiv);
    newerDiv.append(deleteDiv);
    container.append(newerDiv);
    container.append(getMovies);
    body.appendChild(container);
    form.addEventListener("submit", (e) => {
        e.preventDefault();
         fetch('/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: form.elements.title.value, releaseYear: form.elements.releaseYear.value})
        })
        .then(res => res.json())
        .then(data => {
            const newDiv = document.createElement('div');
            const newP = document.createElement('p');
            newP.textContent = `Name: ${data.title}, Year: ${data.releaseYear}`;
            container.appendChild(newDiv);
            newDiv.append(newP);
            container.appendChild(newDiv);
        })
    });
    getMovies.addEventListener("click", (e) => {
        e.preventDefault();
        fetch('/getAll')
        .then(res => res.json())
        .then(data => {
            data.forEach((ele) => {
                const newP = document.createElement('p');
                newP.textContent = `Name: ${ele.title}, Year: ${ele.releaseYear}`;
                container.appendChild(newP);
            })
        })
    })
    deleteMovies.addEventListener("click", (e) => {
        e.preventDefault();
        const value = deleteText.value.toString();
        fetch(`/${value}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: value })
        })
    })
    updateButton.addEventListener("click", (e) => {
        e.preventDefault();
        const value1 = currMovieText.value;
        const value2 = updateMovieText.value;
        fetch(`/${value2}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: value1 })
        })
        .then(res => res.json())
        .then(data => console.log(data));
    })
})
