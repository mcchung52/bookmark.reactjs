import API from "../API";

let LinkActions = {
  saveBookmark(newBookmark) {
    API.saveBookmark(newBookmark);
  },
  getAllBookmarks() {
    API.fetchAllBookmarks();
  },
  deleteBookmark(bookmark) {
    API.removeBookmark(bookmark);
  },
  likeBookmark(bookmark) {
    API.likeBookmark(bookmark);
  }
};

export default LinkActions;
