const checkID = (response) => {
  return response.body.every((blog) => 'id' in blog)
}

module.exports = {
  checkID
}
