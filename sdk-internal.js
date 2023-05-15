const UI_URLS = {
  PROD: "https://app.getapollo.io",
  LOCAL: "http://localhost:4200",
};

const LISTENERS = {
  DASHBOARD: "DASHBOARD",
  CREATE_INVOICE: "CREATE_INVOICE",
  CREATE_ESTIMATE: "CREATE_ESTIMATE",
  CREATE_CREDIT_NOTE: "CREATE_CREDIT_NOTE",
  CREATE_ADVANCE: "CREATE_ADVANCE",
  DOCUMENT_HEIGHT: 'DOCUMENT_HEIGHT',
};

const EVENTS = {
  DASHBOARD_AFTER_VIEW_INIT: LISTENERS.DASHBOARD,
  DOCUMENT_HEIGHT: LISTENERS.DOCUMENT_HEIGHT,
}

class SpaceSDKInternal {
  _registeredListeners = {};

  constructor(options) {
    this.accessToken = options.accessToken;
    this.environment = options.environment || "PROD";
    this.organizationId = options.organizationId;
    this.targetDivId = options.targetDivId;
    this.hideHeadMenu = options.hideHeadMenu || false;
    this.disableAutoHeight = options.disableAutoHeight || false;

    this._registeredListeners = {};
  
    Object.keys(LISTENERS).forEach((listener) => { 
      this._registeredListeners[LISTENERS[listener]] = [];
    });
  }

  loadDashboard() {
    this._loadPage(`/${this.organizationId}/dashboard`);
  }

  loadListInvoices() {
    this._loadPage(`/${this.organizationId}/documents/o/invoice`);
  }

  loadListEstimates() {
    this._loadPage(`/${this.organizationId}/documents/o/estimate`);
  }

  loadListCreditNote() {
    this._loadPage(`/${this.organizationId}/documents/o/credit-note`);
  }

  loadListAdvances() {
    this._loadPage(`/${this.organizationId}/documents/o/advance`);
  }

  loadCreateInvoice() {
    this._loadPage(`/${this.organizationId}/documents/o/add/invoice`);
  }

  loadCreateEstimate() {
    this._loadPage(`/${this.organizationId}/documents/o/add/estimate`);
  }

  loadCreateCreditNote() {
    this._loadPage(`/${this.organizationId}/documents/o/add/credit-note`);
  }

  loadCreateAdvance() {
    this._loadPage(`/${this.organizationId}/documents/o/add/advance`);
  }

  loadViewDocument(id) {
    if (!id) {
      console.error("Error: ID is required to load a document");
      return;
    }

    this._loadPage(`/${this.organizationId}/documents/o/view/${id}`);
  }

  addDashboardListener(listener) {
    this._addListener(LISTENERS.DASHBOARD, listener);
  }

  removeDashboardListener(listener) {
    this._removeListener(LISTENERS.DASHBOARD, listener);
  }

  addCreateInvoiceListener(listener) {
    this._addListener(LISTENERS.CREATE_INVOICE, listener);
  }

  removeCreateInvoiceListener(listener) {
    this._removeListener(LISTENERS.CREATE_INVOICE, listener);
  }

  addCreateEstimateListener(listener) {
    this._addListener(LISTENERS.CREATE_ESTIMATE, listener);
  }

  removeCreateEstimateListener(listener) {
    this._removeListener(LISTENERS.CREATE_ESTIMATE, listener);
  }

  addCreateCreditNoteListener(listener) {
    this._addListener(LISTENERS.CREATE_CREDIT_NOTE, listener);
  }

  removeCreateCreditNoteListener(listener) {
    this._removeListener(LISTENERS.CREATE_CREDIT_NOTE, listener);
  }

  addCreateAdvanceListener(listener) {
    this._addListener(LISTENERS.CREATE_ADVANCE, listener);
  }

  removeCreateAdvanceListener(listener) {
    this._removeListener(LISTENERS.CREATE_ADVANCE, listener);
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
      console.warn(`Warning: Unknown event type "${event.type}"`);
      return;
    }

    const listeners = this._registeredListeners[EVENTS[event.type]];

    if (!listeners || !listeners.length) return;

    listeners.forEach((listener) => {
      if (typeof listener !== "function") return;
      listener(event);
    });
  }

  _registerIframeHeightListener() {
    if (this.disableAutoHeight) return;

    this._addListener(LISTENERS.DOCUMENT_HEIGHT, (event) => {
      if (!event || !event.payload || !event.payload.height) return;
      this._setIframeHeight(event.payload.height);
    });
  }

  _loadPage(page) {
    const iframe = this._createIframe();
    const targetDiv = this._getContainerDiv();

    let url = `${UI_URLS[this.environment]}${page}?accessToken=${this.accessToken}&sdk=true`;
    if (this.hideHeadMenu) url += "&hideHeadMenu=true";

    iframe.setAttribute("src", url);
    targetDiv.appendChild(iframe);
    this._initListener();
    this._registerIframeHeightListener();
  }

  _initListener() {
    window.addEventListener("message", (event) => {
      if (event.origin !== UI_URLS[this.environment]) return;
      this._triggerListeners(event.data);
    });
  }

  _createIframe() {
    const iframe = document.createElement("iframe");
    iframe.setAttribute("title", "SpaceSDK");
    // iframe.setAttribute("scrolling", "no");
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

  _setIframeHeight(height) {
    const iframe = document.getElementById(this.targetDivId);
    iframe.style.height = `${height}px`;
  }
}
