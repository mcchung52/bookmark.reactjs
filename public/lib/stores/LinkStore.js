import {EventEmitter} from "events";
import AppDispatcher from "../AppDispatcher";
import {ActionTypes} from "../Constants";

let _links = [];

class LinkStore extends EventEmitter {
  // Register with the Dispatcher
  constructor(props) {
    super(props);

    AppDispatcher.register(action => {
      switch (action.actionType) {
        case ActionTypes.RECEIVE_LINKS:
          console.log("4. We received news about the new data", action);
          // account for the new data;
          _links = action.links;
          console.log("inside LinkStore", _links);
          this.emit("CHANGE");
          break;
        case ActionTypes.RECEIVE_ONE_LINK:
          console.log("We received news about the new link", action);
          // account for the new data;
          _links.push(action.link);
          this.emit("CHANGE");
          break;
        case ActionTypes.DELETE_ONE_LINK:
          console.log("We received news about delete link", action);
          // account for the new data;
          //_links.splice(_links.indexOf(action.link.id), 1);
          _links = action.links;
          console.log('inside LinkStore', _links);
          this.emit("CHANGE");
          break;
        case ActionTypes.LIKE_ONE_LINK:
          console.log("We received news about like link", action);
          // account for the new data;
          //_links.splice(_links.indexOf(action.link.id), 1);
          _links = action.links;
          console.log('inside LinkStore like', _links);
          this.emit("CHANGE");
          break;
        default:
          // do nothing
      }
    })
  }
  // Expose some data
  getAll() {
    console.log('_links:',_links);
    return _links.map(link => {
      console.log('link', link);
      link.url = link.url.startsWith("http") ? link.url :
                  `http://${link.url}`;
      link.safe = link.url.startsWith("https");
      return link;
    }); // For Now
  }

  // Listen stuff
  startListening(callback) {
    this.on("CHANGE", callback);
  }
  stopListening(callback) {
    this.removeListener("CHANGE", callback);
  }
}

export default new LinkStore();
