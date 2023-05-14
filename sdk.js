const SDK_URLS = {
  PROD: 'https://sdk.spaceinvoices.com',
  LOCAL: 'http://127.0.0.1:8080',
}

class SpaceSDK {
  static init(options) {
    options.environment = options.environment || 'PROD';
    window.SpaceSDKQueue = window.SpaceSDKQueue || [];
    const sdkScript = document.createElement('script');
    sdkScript.src = SDK_URLS[options.environment] + '/sdk-internal.js';
    sdkScript.onload = () => {
      window.SpaceSDKInstance = new SpaceSDKInternal(options);
      window.SpaceSDKQueue.forEach((fn) => fn());
      window.SpaceSDKQueue = [];
    };
    document.head.appendChild(sdkScript);
  }

  static loadDashboard() {
    if (window.SpaceSDKInstance) {
      window.SpaceSDKInstance.loadDashboard();
    } else {
      window.SpaceSDKQueue.push(() => {
        window.SpaceSDK.loadDashboard();
      });
    }
  }

  static addDashboardListener(listener) {
    if (window.SpaceSDKInstance) {
      window.SpaceSDKInstance.addDashboardListener(listener);
    } else {
      window.SpaceSDKQueue.push(() => {
        window.SpaceSDK.addDashboardListener(listener);
      });
    }
  }

  static removeDashboardListener(listener) {
    if (window.SpaceSDKInstance) {
      window.SpaceSDKInstance.removeDashboardListener(listener);
    } else {
      window.SpaceSDKQueue.push(() => {
        window.SpaceSDK.removeDashboardListener(listener);
      });
    }
  }
}

window.SpaceSDK = SpaceSDK;
