window.addEventListener("load", () => {
    const btn1 = document.querySelector("#searchForm");
    const input = document.querySelector('#search');


    btn1.addEventListener("submit",function(event){
        event.preventDefault();

        console.log(input.value);

        const search = input.value;

        const url = 'https://api.vam.ac.uk/v2/objects/search?images=true&q=' + encodeURIComponent(search);

        console.log(url);

        var xhr = new XMLHttpRequest();
        xhr.addEventListener("load",function(){

            if(xhr.status == 200){

                const results = document.querySelector("#results");

                const data = JSON.parse(xhr.responseText);

                while(results.firstChild) {
                    results.removeChild(results.lastChild);
                }

                for(record of data.records) {

                    console.log(record);

                    const title = document.createElement('h2');
                    const date = document.createElement('h3');
                    const img = document.createElement('img');

                    title.results = record._primaryTitle;
                    date.results = record.primaryDate;
                    img.setAttribute('src',record._images._primary_thumbnail);

                    results.appendChild(title);
                    results.appendChild(date);
                    results.appendChild(img);
                }

            }else{
                console.log('Status code: ' + xhr.status);
            }
        })

        xhr.open("GET",url,true);
        xhr.send();

    })
})
