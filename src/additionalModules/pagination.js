export const getPageCount = (totalCount, limit) => {
    return Math.ceil(totalCount / limit)
}

export const getFirstLastPages = (totalPages) => {
    let firstSecond = [];
    let result = [];
    // заполнить result числами от 1 до totalPages
    for (let i = 0; i < totalPages; i++) {
        result.push(i + 1)
    }
    // добавить в массив firstSecond первый и последний элемент массива result
    firstSecond.push(result[0])
    firstSecond.push(result[result.length - 1])
    return firstSecond;
}

export const getPagesArray = (pages, pagesCount, currentPage) => {
    if (pagesCount > 10) {
        if (currentPage > 5) {
            for (let i = currentPage - 4; i <= currentPage + 5; i++) {
                pages.push(i)
                if (i === pagesCount) break                
            }
        }
        else {
            for (let i = 1; i <= 10; i++) {
                pages.push(i)
                if (i === pagesCount) break   
            }
        }
    }
    else {
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }
    }
}