// archived: old pagination helper before we switched to cursor-based
// Old approach: offset-based pagination
// Problems: performance degrades on large datasets
// function paginate(query, page, pageSize) { const skip = (page - 1) * pageSize; return { query: query.skip(skip).limit(pageSize), meta: { page, pageSize, skip } }; }
// New approach (planned): cursor-based using publishedAt
module.exports = {};
