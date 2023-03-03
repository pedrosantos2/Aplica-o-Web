const search = () =>{
    const searchbox = document.getElementById("search-item").value.toUpperCase();
    const itensloja = document.getElementById("product-list")
    const product = document.querySelectorAll('.produtos')
    const pname = document.getElementsByTagName('h5')

    for(var i = 0; i < pname.length; i++){
        let match = product[i].getElementsByTagName('h5')[0];

        if(match){
            let textvalue = match.textContent || match.innerHTML

            if(textvalue.toUpperCase().indexOf(searchbox) > -1){
                product[i].style.display = "";
            }else{
                product[i].style.display = "none";
            }
        }
    }
}



