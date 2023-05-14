const UI_URLS = {
  PROD: "https://app.getapollo.io",
  LOCAL: "http://localhost:4200",
};

const LISTENERS = {
  DASHBOARD: "DASHBOARD",
};

const EVENTS = {
  DASHBOARD_AFTER_VIEW_INIT: LISTENERS.DASHBOARD,
}

class SpaceSDKInternal {
  _registeredListeners = {};

  constructor(options) {
    this.accessToken = options.accessToken;
    this.environment = options.environment || "PROD";
    this.organizationId = options.organizationId;
    this.targetDivId = options.targetDivId;

    this._registeredListeners = {};
  
    Object.keys(LISTENERS).forEach((listener) => { 
      this._registeredListeners[LISTENERS[listener]] = [];
    });
  }

  loadDashboard() {
    this._loadPage(`/${this.organizationId}/dashboard`);
  }

  addDashboardListener(listener) {
    this._addListener(LISTENERS.DASHBOARD, listener);
  }

  removeDashboardListener(listener) {
    this._removeListener(LISTENERS.DASHBOARD, listener);
  }

  _addListener(type, listener) {
    if (!LISTENERS[type]) {
      console.error(`Error: Unknown listener type "${type}"`);
      return;
    }

    this._registeredListeners[type].push(listener);
  }

  _removeListener(type, listener) {
    if (!LISTENERS[type]) {
      console.error(`Error: Unknown listener type "${type}"`);
      return;
    }

    const index = this._registeredListeners[type].indexOf(listener);
    if (index !== -1) {
      this._registeredListeners[type].splice(index, 1);
    }
  }

  _triggerListeners(event) {
    if (!event || !event.type) return;

    if (!EVENTS[event.type]) {
      console.warn(`Warningn: Unknown event type "${event.data.type}"`);
      return;
    }

    const listeners = this._registeredListeners[EVENTS[event.type]];

    if (!listeners || !listeners.length) return;

    listeners.forEach((listener) => {
      if (typeof listener !== "function") return;
      listener(event);
    });
  }

  _loadPage(page) {
    const iframe = this._getIframe();
    const url = `${UI_URLS[this.environment]}${page}?accessToken=${this.accessToken}&sdk=true`;
    const targetDiv = this._getContainerDiv();

    iframe.setAttribute("src", url);
    targetDiv.appendChild(iframe);
    this._initListener();
  }

  _initListener() {
    window.addEventListener("message", (event) => {
      if (event.origin !== UI_URLS[this.environment]) return;
      this._triggerListeners(event.data);
    });
  }

  _getIframe() {
    const iframe = document.createElement("iframe");
    iframe.setAttribute("title", "SpaceSDK");
    iframe.setAttribute("scrolling", "no");
    iframe.style.height = "100%";
    iframe.style.width = "100%";
    iframe.style.border = "none";
    return iframe;
  }

  _getContainerDiv() {
    const targetDiv = document.getElementById(this.targetDivId);

    if (!targetDiv) {
      console.error(`Error: Element with id "${this.targetDivId}" not found.`);
      return;
    }

    return targetDiv;
  }
}
