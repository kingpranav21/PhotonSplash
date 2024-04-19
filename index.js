const accessKey = "QfATqerwXUHut53EOCDV-f6w8kNtGI-f5flNM653_BY";
const SearchForm = document.getElementById("SearchForm");
const SearchBox = document.getElementById("SearchBox");
const SearchResult = document.getElementById("searchResult");
const ShowMore = document.getElementById("show-more-btn");

let keyword = "";
let prevKeyword = "";
let page = 1;
async function SearchImages() {
  keyword = SearchBox.value; // taking value from searchBox
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=15`;
    try {
        const response = await fetch(url); //fetching the url
        if (!response.ok) {
            throw new Error(`Network Response isn't responding , URL not working`);
        }
        const data = await response.json(); //await is used to wait until the promise is returned
        //it is parsing data in json format
        //console.log(data);
        const results = data.results; //array name is results

        // Clear search results only if the search input has changed
        if (keyword !== prevKeyword) {
            SearchResult.innerHTML = ""; // Clear previous search results
            prevKeyword = keyword; // Update previous keyword
        }
        if (results.length == 0) {
            SearchResult.innerHTML=`<p>Sorry, No matching images found ;(</p>`
        }
        results.map((result) => {
            const image = document.createElement("img"); //created one image tag
            image.src = result.urls.small; //adding image
            const imageLink = document.createElement("a"); //to display image
            imageLink.href = result.links.html;
            imageLink.target = "_blank"; //move to next tab
            imageLink.appendChild(image); //placing the image in anchor tag
            SearchResult.appendChild(imageLink); //placing the imagelink in searchresult div
        });

        //showmore
        ShowMore.style.display = "block";
    } catch (error) {
        console.error(`Error in fetching Images , ERROR:`, error);
        SearchResult.innerHTML=`<p>Error in fetching Images. Please try again later!</p>`
    }
}
SearchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  SearchImages();
});
ShowMore.addEventListener("click", () => {
  page++;
  SearchImages();
});
