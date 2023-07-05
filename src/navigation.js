searchFormBtn.addEventListener('click', () => {
    searchFormInput.value
    location.hash = '#search=' + searchFormInput.value
})

trendingBtn.addEventListener('click', () => {
    location.hash = '#trends'
})

arrowBtn.addEventListener('click', () => {
    history.back()
    // location.hash = '#home'
})

window.addEventListener('DOMContentLoaded', navigation, false)
window.addEventListener('hashchange', navigation, false)

function navigation(){
    if(location.hash.startsWith('#trends')){
        trendsPage()
    } else if(location.hash.startsWith('#search=')){
        searchPage()
    } else if(location.hash.startsWith('#movie=')){
        moviePage()
    } else if(location.hash.startsWith('#category=')){
        categoryPage()
    } else {
        homePage()
    }

    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
}

function homePage(){
    console.log('HomePage')
    headerSection.classList.remove('header-container--long')
    headerSection.style.background = ''

    arrowBtn.classList.add('inactive')
    arrowBtn.classList.remove('header-arrow--white')
    headerTitle.classList.remove('inactive')
    headerCategoryTitle.classList.add('inactive')
    searchForm.classList.remove('inactive')
    
    trendingPreviewSection.classList.remove('inactive')
    categoriesPreviewSection.classList.remove('inactive')

    genericSection.classList.add('inactive')
    movieDetailSection.classList.add('inactive')
    
    getCategoriesPreview()
    getTrendingMoviesPreview()
}
function categoryPage(){
    console.log('CategoryPage')

    headerSection.classList.remove('header-container--long')
    headerSection.style.background = ''

    arrowBtn.classList.remove('inactive')
    arrowBtn.classList.remove('header-arrow--white')
    headerTitle.classList.add('inactive')
    headerCategoryTitle.classList.remove('inactive')
    searchForm.classList.add('inactive')
    
    trendingPreviewSection.classList.add('inactive')
    categoriesPreviewSection.classList.add('inactive')

    genericSection.classList.remove('inactive')
    movieDetailSection.classList.add('inactive')

    const [_, categoryData] = location.hash.split('=')
    const [categoryId, categoryName] = categoryData.split('-')

    headerCategoryTitle.innerHTML = categoryName

    getMoviesByCategory(categoryId);
}
function moviePage(){
    console.log('MoviePage')

    headerSection.classList.add('header-container--long')
    // headerSection.style.background = ''

    arrowBtn.classList.remove('inactive')
    arrowBtn.classList.add('header-arrow--white')
    headerTitle.classList.add('inactive')
    headerCategoryTitle.classList.add('inactive')
    searchForm.classList.add('inactive')
    
    trendingPreviewSection.classList.add('inactive')
    categoriesPreviewSection.classList.add('inactive')

    genericSection.classList.add('inactive')
    movieDetailSection.classList.remove('inactive')

    const [_, movieId] = location.hash.split('=')

    getMovieById(movieId)
}

function searchPage(){
    console.log('SearchPage')

    headerSection.classList.remove('header-container--long')
    headerSection.style.background = ''

    arrowBtn.classList.remove('inactive')
    arrowBtn.classList.remove('header-arrow--white')
    headerTitle.classList.add('inactive')
    headerCategoryTitle.classList.remove('inactive')
    searchForm.classList.remove('inactive')
    
    trendingPreviewSection.classList.add('inactive')
    categoriesPreviewSection.classList.add('inactive')

    genericSection.classList.remove('inactive')
    movieDetailSection.classList.add('inactive')

    const [_, searchValue] = location.hash.split('=')

    getMoviesBySearch(searchValue)
}
function trendsPage(){
    console.log('TrendsPage')

    headerSection.classList.remove('header-container--long')
    headerSection.style.background = ''

    arrowBtn.classList.remove('inactive')
    arrowBtn.classList.remove('header-arrow--white')
    headerTitle.classList.add('inactive')
    headerCategoryTitle.classList.remove('inactive')
    searchForm.classList.add('inactive')
    
    trendingPreviewSection.classList.add('inactive')
    categoriesPreviewSection.classList.add('inactive')

    genericSection.classList.remove('inactive')
    movieDetailSection.classList.add('inactive')

    headerCategoryTitle.innerHTML = 'Tendencias'

    getTrendingMovies()
}