const QuoteCard = ({ quote, person, image }) => {
    return (
        <div class="max-w-sm border border-gray-200 rounded-lg shadow bg-transparent dark:border-gray-200 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-50">
            <a href="#">
                <img class="w-44 h-52 m-auto my-4" src={image} alt={person} />
            </a>
            <div class="p-5 text-center">

                <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{quote}</h5>
                <p class="mb-3 font-normal text-gray-100">~ {person}</p>
                <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Read more
                    <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </a>
            </div>
        </div>

    )
}

export default QuoteCard