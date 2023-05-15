const SDK_URLS = {
  PROD: 'https://sdk.spaceinvoices.com',
  LOCAL: 'http://127.0.0.1:8080',
}

class SpaceSDK {
  /**
   * Initializes the SDK
   * @param {Object} options 
   * @param {string} options.accessToken - Access token for the Space API
   * @param {string} options.organizationId - Organization ID to use
   * @param {string} options.targetDivId - ID of the div to render the SDK in
   * @param {string} [options.environment] - Optiona, default is 'PROD'. Environment to use
   * @param {boolean} [options.hideHeadMenu] - Optional. Weather to hide the head menu
   * @param {boolean} [options.disableAutoHeight] - Optional. Weather to disable auto iframe height
   * @param {string} [options.whiteLabelDomain] - Optional. Domain in case of white label usage
   */
  static init(options) {
    if (window.SpaceSDKInstance) {
      throw new Error('SpaceSDK already initialized');
    }

    window.SpaceSDKQueue = window.SpaceSDKQueue || [];
    options.environment = options.environment || 'PROD';

    const sdkScript = document.createElement('script');
    sdkScript.src = SDK_URLS[options.environment] + '/sdk-internal.js';
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
   * Adds a listener for the create invoice page events
   * @param {function} listener - Listener function to add
   */
  static addCreateInvoiceListener(listener) {
    if (window.SpaceSDKInstance) {
      window.SpaceSDKInstance.addCreateInvoiceListener(listener);
    } else {
      window.SpaceSDKQueue.push(() => {
        window.SpaceSDK.addCreateInvoiceListener(listener);
      });
    }
  }

  /**
   * Revmoes a listener for the create invoice page events
   * @param {function} listener - Listener function to remove
   */
  static removeCreateInvoiceListener(listener) {
    if (window.SpaceSDKInstance) {
      window.SpaceSDKInstance.removeCreateInvoiceListener(listener);
    } else {
      window.SpaceSDKQueue.push(() => {
        window.SpaceSDK.removeCreateInvoiceListener(listener);
      });
    }
  }

  /**
   * Adds a listener for the create estimate page events
   * @param {function} listener - Listener function to add
   */
  static addCreateEstimateListener(listener) {
    if (window.SpaceSDKInstance) {
      window.SpaceSDKInstance.addCreateEstimateListener(listener);
    } else {
      window.SpaceSDKQueue.push(() => {
        window.SpaceSDK.addCreateEstimateListener(listener);
      });
    }
  }

  /**
   * Removes a listener for the create estimate page events
   * @param {function} listener - Listener function to remove
   */
  static removeCreateEstimateListener(listener) {
    if (window.SpaceSDKInstance) {
      window.SpaceSDKInstance.removeCreateEstimateListener(listener);
    } else {
      window.SpaceSDKQueue.push(() => {
        window.SpaceSDK.removeCreateEstimateListener(listener);
      });
    }
  }

  /**
   * Adds a listener for the create credit-note page events
   * @param {function} listener - Listener function to add
   */
  static addCreateCreditNoteListener(listener) {
    if (window.SpaceSDKInstance) {
      window.SpaceSDKInstance.addCreateCreditNoteListener(listener);
    } else {
      window.SpaceSDKQueue.push(() => {
        window.SpaceSDK.addCreateCreditNoteListener(listener);
      });
    }
  }

  /**
   * Removes a listener for the create credit-note page events
   * @param {function} listener - Listener function to remove
   */
  static removeCreateCreditNoteListener(listener) {
    if (window.SpaceSDKInstance) {
      window.SpaceSDKInstance.removeCreateCreditNoteListener(listener);
    } else {
      window.SpaceSDKQueue.push(() => {
        window.SpaceSDK.removeCreateCreditNoteListener(listener);
      });
    }
  }

  /**
   * Adds a listener for the create advance page events
   * @param {function} listener - Listener function to add
   */
  static addCreateAdvanceListener(listener) {
    if (window.SpaceSDKInstance) {
      window.SpaceSDKInstance.addCreateAdvanceListener(listener);
    } else {
      window.SpaceSDKQueue.push(() => {
        window.SpaceSDK.addCreateAdvanceListener(listener);
      });
    }
  }

  /**
   * Removes a listener for the create advance page events
   * @param {function} listener - Listener function to remove
   */
  static removeCreateAdvanceListener(listener) {
    if (window.SpaceSDKInstance) {
      window.SpaceSDKInstance.removeCreateAdvanceListener(listener);
    } else {
      window.SpaceSDKQueue.push(() => {
        window.SpaceSDK.removeCreateAdvanceListener(listener);
      });
    }
  }
}

window.SpaceSDK = SpaceSDK;
window.SpaceSDKQueue = [];
