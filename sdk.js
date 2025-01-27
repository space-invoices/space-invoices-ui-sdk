const SDK_URLS = {
  PROD: "https://sdk.spaceinvoices.com",
  LOCAL: "http://127.0.0.1:8080",
};

class SpaceSDK {
  /**
   * Initializes the SDK
   * @param {Object} options
   * @param {string} options.accessToken - Access token for the Space API
   * @param {string} options.organizationId - Organization ID to use
   * @param {string} options.targetDivId - ID of the div to render the SDK in
   * @param {string} [options.environment] - Optional, default is 'PROD'. Environment to use
   * @param {boolean} [options.hideHeadMenu] - Optional. Whether to hide the head menu
   * @param {boolean} [options.disableAutoHeight] - Optional. Whether to disable auto iframe height
   * @param {string} [options.whiteLabelDomain] - Optional. Domain in case of white label usage
   * @param {string} [options.locale] - Optional. Two-character locale code (e.g., 'en', 'fr', 'de', 'sl', 'it', 'hr')
   */
  static init(options) {
    if (window.SpaceSDKInstance) {
      throw new Error("SpaceSDK already initialized");
    }

    window.SpaceSDKQueue = window.SpaceSDKQueue || [];
    options.environment = options.environment || "PROD";

    const sdkScript = document.createElement("script");
    sdkScript.src = SDK_URLS[options.environment] + "/sdk-internal.js";
    sdkScript.onload = () => {
      window.SpaceSDKInstance = new SpaceSDKInternal(options);
      window.SpaceSDKQueue.forEach((fn) => fn());
      window.SpaceSDKQueue = [];
    };
    document.head.appendChild(sdkScript);
  }

  // PAGE LOADERS

  /**
   * Loads the dashboard page
   */
  static loadDashboard() {
    if (window.SpaceSDKInstance) {
      window.SpaceSDKInstance.loadDashboard();
    } else {
      window.SpaceSDKQueue.push(() => {
        window.SpaceSDK.loadDashboard();
      });
    }
  }

  /**
   * Loads the list of documents page
   */
  static loadListInvoices() {
    if (window.SpaceSDKInstance) {
      window.SpaceSDKInstance.loadListInvoices();
    } else {
      window.SpaceSDKQueue.push(() => {
        window.SpaceSDK.loadListInvoices();
      });
    }
  }

  /**
   * Loads the list of estimates page
   */
  static loadListEstimates() {
    if (window.SpaceSDKInstance) {
      window.SpaceSDKInstance.loadListEstimates();
    } else {
      window.SpaceSDKQueue.push(() => {
        window.SpaceSDK.loadListEstimates();
      });
    }
  }

  /**
   * Loads the list of advances page
   */
  static loadListAdvances() {
    if (window.SpaceSDKInstance) {
      window.SpaceSDKInstance.loadListAdvances();
    } else {
      window.SpaceSDKQueue.push(() => {
        window.SpaceSDK.loadListAdvances();
      });
    }
  }

  /**
   * Loads the list of credit notes page
   */
  static loadListCreditNotes() {
    if (window.SpaceSDKInstance) {
      window.SpaceSDKInstance.loadListCreditNotes();
    } else {
      window.SpaceSDKQueue.push(() => {
        window.SpaceSDK.loadListCreditNotes();
      });
    }
  }

  /**
   * Loads the list of delivery notes page
   */
  static loadListDeliveryNotes() {
    if (window.SpaceSDKInstance) {
      window.SpaceSDKInstance.loadListDeliveryNotes();
    } else {
      window.SpaceSDKQueue.push(() => {
        window.SpaceSDK.loadListDeliveryNotes();
      });
    }
  }

  /**
   * Loads the create invoice page
   */
  static loadCreateInvoice() {
    if (window.SpaceSDKInstance) {
      window.SpaceSDKInstance.loadCreateInvoice();
    } else {
      window.SpaceSDKQueue.push(() => {
        window.SpaceSDK.loadCreateInvoice();
      });
    }
  }

  /**
   * Loads the create estimate page
   */
  static loadCreateEstimate() {
    if (window.SpaceSDKInstance) {
      window.SpaceSDKInstance.loadCreateEstimate();
    } else {
      window.SpaceSDKQueue.push(() => {
        window.SpaceSDK.loadCreateEstimate();
      });
    }
  }

  /**
   * Loads the create credit-note page
   */
  static loadCreateCreditNote() {
    if (window.SpaceSDKInstance) {
      window.SpaceSDKInstance.loadCreateCreditNote();
    } else {
      window.SpaceSDKQueue.push(() => {
        window.SpaceSDK.loadCreateCreditNote();
      });
    }
  }

  /**
   * Loads the create advance page
   */
  static loadCreateAdvance() {
    if (window.SpaceSDKInstance) {
      window.SpaceSDKInstance.loadCreateAdvance();
    } else {
      window.SpaceSDKQueue.push(() => {
        window.SpaceSDK.loadCreateAdvance();
      });
    }
  }

  /**
   * Loads the create delivery note page
   */
  static loadCreateDeliveryNote() {
    if (window.SpaceSDKInstance) {
      window.SpaceSDKInstance.loadCreateDeliveryNote();
    } else {
      window.SpaceSDKQueue.push(() => {
        window.SpaceSDK.loadCreateDeliveryNote();
      });
    }
  }

  /**
   * Loads the view document page
   * @param {string} id - ID of the document to load
   */
  static loadViewDocument(id) {
    if (window.SpaceSDKInstance) {
      window.SpaceSDKInstance.loadViewDocument(id);
    } else {
      window.SpaceSDKQueue.push(() => {
        window.SpaceSDK.loadViewDocument(id);
      });
    }
  }

  static loadListIncomingInvoices() {
    if (window.SpaceSDKInstance) {
      window.SpaceSDKInstance.loadListIncomingInvoices();
    } else {
      window.SpaceSDKQueue.push(() => {
        window.SpaceSDK.loadListIncomingInvoices();
      });
    }
  }

  static loadCreateIncomingInvoice() {
    if (window.SpaceSDKInstance) {
      window.SpaceSDKInstance.loadCreateIncomingInvoice();
    } else {
      window.SpaceSDKQueue.push(() => {
        window.SpaceSDK.loadCreateIncomingInvoice();
      });
    }
  }

  static loadClientListDocuments(id) {
    if (window.SpaceSDKInstance) {
      window.SpaceSDKInstance.loadClientListDocuments(id);
    } else {
      window.SpaceSDKQueue.push(() => {
        window.SpaceSDK.loadClientListDocuments(id);
      });
    }
  }

  static loadListPayments() {
    if (window.SpaceSDKInstance) {
      window.SpaceSDKInstance.loadListPayments();
    } else {
      window.SpaceSDKQueue.push(() => {
        window.SpaceSDK.loadListPayments();
      });
    }
  }

  static loadOrganizationSettings() {
    if (window.SpaceSDKInstance) {
      window.SpaceSDKInstance.loadOrganizationSettings();
    } else {
      window.SpaceSDKQueue.push(() => {
        window.SpaceSDK.loadOrganizationSettings();
      });
    }
  }

  static loadAccountSettings() {
    if (window.SpaceSDKInstance) {
      window.SpaceSDKInstance.loadAccountSettings();
    } else {
      window.SpaceSDKQueue.push(() => {
        window.SpaceSDK.loadAccountSettings();
      });
    }
  }

  static loadCustomizations() {
    if (window.SpaceSDKInstance) {
      window.SpaceSDKInstance.loadCustomizations();
    } else {
      window.SpaceSDKQueue.push(() => {
        window.SpaceSDK.loadCustomizations();
      });
    }
  }

  /**
   * Loads the price lists page
   */
  static loadPriceLists() {
    if (window.SpaceSDKInstance) {
      window.SpaceSDKInstance.loadPriceLists();
    } else {
      window.SpaceSDKQueue.push(() => {
        window.SpaceSDK.loadPriceLists();
      });
    }
  }

  /**
   * Loads a specific price list view page
   * @param {string} id - ID of the price list to load
   */
  static loadViewPriceList(id) {
    if (window.SpaceSDKInstance) {
      window.SpaceSDKInstance.loadViewPriceList(id);
    } else {
      window.SpaceSDKQueue.push(() => {
        window.SpaceSDK.loadViewPriceList(id);
      });
    }
  }

  /**
   * Loads the list of clients page
   */
  static loadListClients() {
    if (window.SpaceSDKInstance) {
      window.SpaceSDKInstance.loadListClients();
    } else {
      window.SpaceSDKQueue.push(() => {
        window.SpaceSDK.loadListClients();
      });
    }
  }

  // LISTENERS

  /**
   * Adds a listener for the dashboard page events
   * @param {function} listener - Listener function to add
   */
  static addDashboardListener(listener) {
    if (window.SpaceSDKInstance) {
      window.SpaceSDKInstance.addDashboardListener(listener);
    } else {
      window.SpaceSDKQueue.push(() => {
        window.SpaceSDK.addDashboardListener(listener);
      });
    }
  }

  /**
   * Removes a listener for the dashboard page events
   * @param {function} listener - Listener function to remove
   */
  static removeDashboardListener(listener) {
    if (window.SpaceSDKInstance) {
      window.SpaceSDKInstance.removeDashboardListener(listener);
    } else {
      window.SpaceSDKQueue.push(() => {
        window.SpaceSDK.removeDashboardListener(listener);
      });
    }
  }

  /**
   * Adds a listener for the create document events
   * @param {function} listener - Listener function to add
   */
  static addCreateDocumentListener(listener) {
    if (window.SpaceSDKInstance) {
      window.SpaceSDKInstance.addCreateDocumentListener(listener);
    } else {
      window.SpaceSDKQueue.push(() => {
        window.SpaceSDK.addCreateDocumentListener(listener);
      });
    }
  }

  /**
   * Removes a listener for the create document events
   * @param {function} listener - Listener function to remove
   */
  static removeCreateDocumentListener(listener) {
    if (window.SpaceSDKInstance) {
      window.SpaceSDKInstance.removeCreateDocumentListener(listener);
    } else {
      window.SpaceSDKQueue.push(() => {
        window.SpaceSDK.removeCreateDocumentListener(listener);
      });
    }
  }

  static loadExports() {
    if (window.SpaceSDKInstance) {
      window.SpaceSDKInstance.loadExports();
    } else {
      window.SpaceSDKQueue.push(() => {
        window.SpaceSDK.loadExports();
      });
    }
  }
}

window.SpaceSDK = SpaceSDK;
window.SpaceSDKQueue = [];
