let textInput = document.getElementById('input');

let timeout = null;

textInput.onkeydown = function (e) {
    clearTimeout(timeout);

    timeout = setTimeout(function () {
        const ul = document.getElementById('location');
        const url = encodeURI('http://35.247.157.195:9200/postcode/_search?size=1&q=area:' + textInput.value);
        console.log(url);
        fetch(url)
        .then((resp) => resp.json())
        .then(function(data) {
        let location = data.hits.hits;
        return location.map(function(location) {
          let li = createNode('li'),
              span = createNode('span');
          span.innerHTML = `${location._source.area} ${location._source.postcode}`;
          append(li, span);
          append(ul, li);
        })
        })
        .catch(function(error) {
            console.log(error);
        });
    }, 300);
}


function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
return parent.appendChild(el);
}
