window.addEventListener("load", () => {
    const btn1 = document.querySelector("#searchForm");
    const input = document.querySelector('#submit');


    btn1.addEventListener("submit",function(event){
        event.preventDefault();

        console.log(input.value);

        const search = input.value;

        const url = 'https://api.vam.ac.uk/v2/objects/search?q=' + encodeURIComponent(search);

        console.log(url);

        var xhr = new XMLHttpRequest;
        xhr.addEventListener("load",function(){

            if(xhr.status == 200){

                const results = document.querySelector("#results");

                const data = JSON.parse(xhr.responseText);

                for(record of data.records) {

                    console.log(record);

                    const img = document.createElement('img');
                    img.setAttribute('src',record._images._primaryimageID);

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
