import {
  loadAdvancedSearchQueryActions,
  loadSearchActions,
  loadSearchAnalyticsActions,
} from "https://static.cloud.coveo.com/atomic/v2/headless/headless.esm.js";

let headlessEngine;
(async () => {
  await customElements.whenDefined("atomic-search-interface");
  const searchInterface = document.querySelector("atomic-search-interface");

  searchInterface
    .querySelector(".this-year-button")
    .addEventListener("click", filterFor2022);

  // Initialization
  await searchInterface.initialize({
    accessToken: "xx564559b1-0045-48e1-953c-3addd1ee4457",
    organizationId: "searchuisamples",
  });

  headlessEngine = searchInterface.engine;
  // Trigger a first search
  searchInterface.executeFirstSearch();
})();

function filterFor2022(e) {
  // TODO: Task #2
}
