# Space Invoices UI SDK

Allows loading UI pages into website using iframe.

> For more details please check our official documentation at https://spaceinvoices.com/docs/UI-SDK

<br>

### Load SDK script in your website

```html
<script src="https://sdk.spaceinvoices.com/sdk.js">
```

<br>

### Init the SDK

```js
SpaceSDK.init({
  accessToken: 'TOKEN',
  organizationId: 'ORGANIZATION_ID',
  targetDivId: 'sdk',
});
```

**Availabe options**
|Option|Description|
|--|--|
|accessToken|Account Access Token|
|organizationId|Id of Organization to load|
|targetDivId|Html div element id to load the iframe in|
|whiteLabelDomain|Optional, use custom white label domain for the UI provided by Space Invoices. Contact us at support@spaceinvoices.com for further information.|
|hideHeadMenu|Optional, defaults is false. Option to hide the head menu on loaded page.|
|showSideMenu|Optional, default is false. Option to show side menu navigation.|
|disableAutoHeight|Optional, default is false. Disable auto iframe height adjustment.|

<br>

### Trigger rendering a page

```js
SpaceSDK.loadDashboard();
```

**Availabel pages**
|Function|Description|
|--|--|
|SpaceSDK.loadDashboard()|Load dashboard page|
|SpaceSDK.loadListInvoices()|Load page with list of invoices|
|SpaceSDK.loadListEstimates()|Load page with list of estimates|
|SpaceSDK.loadListCreditNotes()|Load page with list of credit notes|
|SpaceSDK.loadListAdvances()|Load page with list of advances|
|SpaceSDK.loadCreateInvoice()|Load the create invoice page|
|SpaceSDK.loadCreateEstimate()|Load the create estimate page|
|SpaceSDK.loadCreateCreditNote()|Load the create credit note page|
|SpaceSDK.loadCreateAdvance()|Load the create advance page|
|SpaceSDK.loadViewDocument(id: string)|Load the view document by id page|

<br>

### Optionally add an event listener for dashboard page events

```js
SpaceSDK.addDocumentCreateListener((event) => {
  console.log('Document create event:', event);
});
```

**Available listeners**

|Function|Description|
|--|--|
|SpaceSDK.addCreateDocumentListener()|Add listener for the create document page. Returned event contains created document data including type.|