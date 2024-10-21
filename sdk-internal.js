const UI_URLS = {
  PROD: "https://app.getapollo.io",
  LOCAL: "http://localhost:4200",
};

const LISTENERS = {
  DASHBOARD: "DASHBOARD",
  DOCUMENT_CREATE: "DOCUMENT_CREATE",
  DOCUMENT_HEIGHT: "DOCUMENT_HEIGHT", // iframe height adjust event
};

const EVENTS = {
  DASHBOARD_AFTER_VIEW_INIT: LISTENERS.DASHBOARD,
  DOCUMENT_HEIGHT: LISTENERS.DOCUMENT_HEIGHT,
  DOCUMENT_CREATE: LISTENERS.DOCUMENT_CREATE,
};

class SpaceSDKInternal {
  _registeredListeners = {};

  constructor(options) {
    this.accessToken = options.accessToken;
    this.environment = options.environment || "PROD";
    this.organizationId = options.organizationId;
    this.targetDivId = options.targetDivId;
    this.hideHeadMenu = options.hideHeadMenu || false;
    this.disableAutoHeight = options.disableAutoHeight || false;
    this.whiteLabelDomain = options.whiteLabelDomain;
    this.locale = options.locale;

    this._registeredListeners = {};

    Object.keys(LISTENERS).forEach((listener) => {
      this._registeredListeners[LISTENERS[listener]] = [];
    });
  }

  /**
   * PAGE LOADERS
   */

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

  loadListDeliveryNotes() {
    this._loadPage(`/${this.organizationId}/documents/o/delivery-note`);
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

  loadCreateDeliveryNote() {
    this._loadPage(`/${this.organizationId}/documents/o/add/delivery-note`);
  }

  loadViewDocument(id) {
    if (!id) {
      console.error("Error: ID is required to load a document");
      return;
    }

    this._loadPage(`/${this.organizationId}/documents/o/view/${id}`);
  }

  loadListIncomingInvoices() {
    this._loadPage(`/${this.organizationId}/documents/i/invoice`);
  }

  loadCreateIncomingInvoice() {
    this._loadPage(`/${this.organizationId}/documents/i/add/invoice`);
  }

  loadClientListDocuments(id, type) {
    if (!id) {
      console.error("Error: ID is required to load client documents");
    }

    type = type || "invoice";

    this._loadPage(`/${this.organizationId}/clients/${id}/${type}`);
  }

  loadListPayments() {
    this._loadPage(`/${this.organizationId}/payments`);
  }

  loadOrganizationSettings() {
    this._loadPage(`/${this.organizationId}/settings/organization`);
  }

  loadAccountSettings() {
    this._loadPage(`/${this.organizationId}/settings/account`);
  }

  loadCustomizations() {
    this._loadPage(`/${this.organizationId}/settings/customizations`);
  }

  loadExports() {
    this._loadPage(`/${this.organizationId}/exports`);
  }

  /**
   * LISTENERS
   */

  addDashboardListener(listener) {
    this._addListener(LISTENERS.DASHBOARD, listener);
  }

  removeDashboardListener(listener) {
    this._removeListener(LISTENERS.DASHBOARD, listener);
  }

  addCreateDocumentListener(listener) {
    this._addListener(LISTENERS.DOCUMENT_CREATE, listener);
  }

  removeCreateDocumentListener(listener) {
    this._removeListener(LISTENERS.DOCUMENT_CREATE, listener);
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

  /**
   * UTILS
   */

  _loadPage(page) {
    const iframe = this._createIframe();
    const targetDiv = this._getContainerDiv();
    let hostname = UI_URLS[this.environment];

    if (this.whiteLabelDomain) {
      hostname = this.whiteLabelDomain.replace(/\/$/, "");
    }

    let url = `${hostname}${page}?access_token=${this.accessToken}&sdk=true`;
    if (this.hideHeadMenu) url += "&hideHeadMenu=true";
    if (this.locale) url += `&l=${this.locale}`;

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
