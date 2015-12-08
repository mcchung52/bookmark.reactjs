import {get, post} from "jquery";

import ServerActions from "./actions/ServerActions";

let API = {
  saveBookmark(newBookmark) {
    post("/api/links", newBookmark)
      .done(data => {
        console.log('API add data',data);
        ServerActions.receiveOneLink(data)
      });
  },
  fetchAllBookmarks() {
    console.log("2. In the API.fetchAllBookmarks()")
    get("/api/links").done(data => ServerActions.receiveLinks(data.links));
  },
  removeBookmark(bookmark) {
    post("/api/links/remove", bookmark)
      .done(restLinks => {
        console.log('API remove data',restLinks);
        ServerActions.deleteOneLink(restLinks);
      });
  },
  likeBookmark(bookmark) {
    post("/api/links/like", bookmark)
      .done(link => {
        console.log('API like link',link);
        ServerActions.likeOneLink(link);
      });
  }
};

export default API;
