export const filteredCards = (cards) => {
    return cards.filter(e => e.author._id === '622bd81b06c7d323b8ae4614' || e.author._id === '6249a24d392d360b78ab233a')
  }


  export const findLiked = (product, id) => {
    return product.likes.some(e => e === id)
  }


 export  const getEndings = (numb, field = 'товар') => {
    const tmp = numb % 10;
    if (!tmp || !numb) {
        return ` ${field}ов`
    }
    if (tmp >= 10 && tmp <= 14) {
        return ` ${field}ов`
    }

    if (tmp === 1) {
        return ` ${field}`
    }
    if (tmp > 1 && tmp < 5) {
        return ` ${field}а`
    }
    if (tmp > 5 && tmp < 9) {
        return ` ${field}ов`
    }
    return ` ${field}ов`


}