import AppDispatcher from "../AppDispatcher";
import {ActionTypes} from "../Constants";

let ServerActions = {
  receiveLinks(links) {
    console.log("3. In ServerActions.receiveLinks()", links);
    // Tell everyone about it.
    AppDispatcher.dispatch({
      actionType: ActionTypes.RECEIVE_LINKS,
      links
    });
  },
  receiveOneLink(link) {
    // Tell everyone about it.
    AppDispatcher.dispatch({
      actionType: ActionTypes.RECEIVE_ONE_LINK,
      link
    });
  },
  deleteOneLink(links) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.DELETE_ONE_LINK,
      links
    });
  },
  likeOneLink(links) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.LIKE_ONE_LINK,
      links
    });
  }
};

export default ServerActions;
