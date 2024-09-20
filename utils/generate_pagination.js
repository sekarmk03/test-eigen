const paginate = (totalCount, thisCount, limit, page, startPage, endPage) => {
    let pagination = {};
    pagination.totalRows = totalCount;
    pagination.totalPages = Math.ceil(totalCount / limit);
    pagination.thisPageRows = thisCount;
    pagination.currentPage = page;
    pagination.prev = startPage > 0 ? page - 1 : null;
    pagination.next = endPage < totalCount ? page + 1 : null;

    return pagination;
}

module.exports = paginate;