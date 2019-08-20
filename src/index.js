let textInput = document.getElementById('input');
let timeout = null;
let keysToIgnore = [8, 9, 13, 16, 17, 18, 19, 20, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46];

window.onload = function() {
    checkES();
};

textInput.onkeydown = function (e) { // Function is called every time a key is pressed on the input box

    let key = e.which || e.keyCode;
    if (keysToIgnore.indexOf(key) > -1) // Ignore non-input keys (e.g. SHIFT, SPACE, TAB etc)
        return;
    else if (key === 27) // Clear result when ESC pressed
        return deleteNode();

    deleteNode();
    clearTimeout(timeout);

    timeout = setTimeout(function () { // Debounce
        let query = {query: textInput.value};
        console.log(query);
        const ul = document.getElementById('location');
        const url = 'data/fetch.php';
        fetch(url, {
            method: 'POST',
            headers: {
              "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: 'query=' +textInput.value
        })
        .then((resp) => resp.json())
        .then(function(data) {
            console.log(data);
            let location = data.hits.hits;
            return location.map(function(location) {
              let li = createNode('li'),
                  span = createNode('span');
              span.innerHTML = `${location._source.area} ${location._source.postcode} ${location._source.town}`;
              append(li, span);
              append(ul, li);
            })
        })
        .catch(function(error) {
            console.log(error);
        });
    }, 250);
}


function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}

function deleteNode() {
    let element = document.getElementById("location");
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
}

function checkES() {
    let esStatus = document.getElementById('es-status');
    fetch('data/checkES.php')
    .then((resp) => resp.json())
    .then(function(data) {
        if(data.cluster_uuid === 'SP8xKYENRveeKtGQSDgTKQ') {
            esStatus.classList.add("es-up");
            esStatus.innerHTML = "<p>Search Engine up :)</p>";

            setTimeout(function() {
                esStatus.classList.add("es-status-disappear");
            }, 3000);
        }
    })
    .catch(function(error) {
        esStatus.classList.add("es-down");
        esStatus.innerHTML = "<p>Search Engine down :(</p>";
    });
}