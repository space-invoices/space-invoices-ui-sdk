class SpaceSDK {
  static init(options) {
    window.SpaceSDKQueue = window.SpaceSDKQueue || [];
    const sdkScript = document.createElement('script');
    sdkScript.src = './sdk-internal.js';
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
