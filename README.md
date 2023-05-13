# Space Invoices UI SDK

Allows loading UI pages into website using iframe.

### Load SDK script in your website

```html
<script src="https://spaceinovices.com/sdk.js">
```

### Init the SDK

```js
SpaceSDK.init({  accessToken: 'TOKEN',
  organizationId: 'ORGANIZATION_ID',
  targetDivId: 'sdk',
});
```

### Trigger rendering a page

```js
SpaceSDK.loadDashboard();
```

### Optionally add an event listener for dashboard page events

```js
SpaceSDK.addDashboardListener((event) => {
  console.log('Dashboard event:', event);
});
```
