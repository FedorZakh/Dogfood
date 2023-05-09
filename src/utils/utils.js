export const filteredCards = (cards) => {
    return cards.filter(e => e.author._id === '622bd81b06c7d323b8ae4614' || e.author._id === '6249a24d392d360b78ab233a')
  }


  export const findLiked = (product, id) => {
    return product.likes.some(e => e === id)
  }