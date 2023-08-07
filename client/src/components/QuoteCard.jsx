const QuoteCard = ({ quote, person, image }) => {
    return (
        <div class="max-w-sm border border-gray-200 rounded-lg shadow bg-transparent dark:border-gray-200 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-50">
            <a href="#">
                <img class="w-44 h-52 m-auto my-4" src={image} alt={person} />
            </a>
            <div class="p-5 text-center">
                <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{quote}</h5>
                <p class="mb-3 font-normal text-gray-100">~ {person}</p>
            </div>
        </div>

    )
}

export default QuoteCard