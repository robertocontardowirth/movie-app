const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    params: {
        'api_key': API_KEY
    }
})

const lazyLoader = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting){
            const url = entry.target.getAttribute('data-img')
            entry.target.setAttribute('src', url)
        }
    })
});

function createMovies(
    movies,
    container, 
    {
    lazyLoad = false,
    clean = true
    }
){
    if(clean){
        container.innerHTML = ""
    }
    movies.forEach(movie => {
        const movieContainer = document.createElement('div')
        movieContainer.classList.add('movie-container')
        movieContainer.addEventListener('click', () => {
            location.hash = '#movie=' + movie.id
        })

        const movieImg = document.createElement('img')
        movieImg.classList.add('movie-img')
        movieImg.setAttribute('alt', movie.title)
        movieImg.setAttribute(
            lazyLoad ? 'data-img' : 'src', 
            'https://image.tmdb.org/t/p/w300/' + movie.poster_path)
        movieImg.addEventListener('error', () => {
            movieImg.setAttribute('src', 'https://dummyimage.com/300x400/CCC/fff')
        })
        if (lazyLoad){
            lazyLoader.observe(movieImg)
        }

        movieContainer.appendChild(movieImg)
        container.appendChild(movieContainer)
    });
}

function createCategories(categories, container){
    container.innerHTML = ""
    categories.forEach(category => {
        const categoryContainer = document.createElement('div')
        categoryContainer.classList.add('category-container')

        const categoryTitle = document.createElement('h3')
        categoryTitle.classList.add('category-title')
        categoryTitle.setAttribute('id', 'id' + category.id)
        categoryTitle.addEventListener('click', () => {
            location.hash = `#category=${category.id}-${category.name}`
        })
        const categoryTitleText = document.createTextNode(decodeURI(category.name))
        
        categoryTitle.appendChild(categoryTitleText)
        categoryContainer.appendChild(categoryTitle)
        
        container.appendChild(categoryContainer)
    });
}

async function getTrendingMoviesPreview(){
    const {data} = await api('trending/movie/day')
    const movies = data.results

    createMovies(movies, trendingMoviesPreviewList, {lazyLoad: true, clean: true})
}

async function getMoviesByCategory(id){
    console.log(`getMoviesByCategory(${id})`)
    const {data} = await api('discover/movie', {
        params: {
            with_genres: id,
        }
    })
    const movies = data.results

    createMovies(movies, genericSection, {lazyLoad: true, clean: true})
}

async function getMoviesBySearch(query){
    const {data} = await api('search/movie', {
        params: {
            query,
        }
    })
    const movies = data.results

    createMovies(movies, genericSection, {lazyLoad: true, clean: true})
}

async function getCategoriesPreview(){
    const {data} = await api('genre/movie/list')
    const categories = data.genres
    
    createCategories(categories, categoriesPreviewList)
}

async function getTrendingMovies(){
    const {data} = await api('trending/movie/day')
    const movies = data.results

    createMovies(movies, genericSection, {lazyLoad: true, clean: true})

    /*const btnLoadMore = document.createElement('button')
    btnLoadMore.classList.add('loadMore-btn')
    btnLoadMore.innerText = 'Cargar más'
    btnLoadMore.addEventListener('click', getPaginatedTrendingMovies)
    genericSection.appendChild(btnLoadMore)*/
}

async function getPaginatedTrendingMovies(){
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement
    const scrolledBottom = (scrollTop + clientHeight) >= (scrollHeight - 15)

    if (scrolledBottom){
        //e.target.classList.add('inactive')
    
        page++;
        const {data} = await api('trending/movie/day', {
            params: {
                page: page,
            }
        })
        const movies = data.results
    
        createMovies(movies, genericSection, { lazyLoad : true, clean : false})        
    }
    /*const btnLoadMore = document.createElement('button')
    btnLoadMore.classList.add('loadMore-btn')
    btnLoadMore.innerText = 'Cargar más'
    btnLoadMore.addEventListener('click', getPaginatedTrendingMovies)
    genericSection.appendChild(btnLoadMore)*/
}

async function getMovieById(id){
    const {data:movie} = await api('movie/' + id)

    const movieImgUrl = 'https://image.tmdb.org/t/p/w500' + movie.poster_path
    headerSection.style.background = `
        linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.35) 19.27%,
            rgba(0, 0, 0, 0) 29.17%
        ),
        url(${movieImgUrl})`

    movieDetailTitle.textContent = movie.title
    movieDetailDescription.textContent = movie.overview
    movieDetailScore.textContent = movie.vote_average

    createCategories(movie.genres, movieDetailCategoriesList)

    getRelatedMoviesId(id)
}

async function getRelatedMoviesId(id){
    console.log(id)
    const {data} = await api(`movie/${id}/similar`)
    const relatedMovies = data.results

    createMovies(relatedMovies, relatedMoviesContainer, {lazyLoad: true, clean: true})
}