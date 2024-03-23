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
  // Create a new query to filter for 2022
  // Execute the new query
  // Hint: Use the headless engine to create a new query
  // Hint: Use the headless engine to execute the new query
  // Hint: Use the headless engine to execute the new query
  const query = headlessEngine.state.query;
  const newQuery = query.setFilter("date", "2022");
  headlessEngine.dispatch(loadSearchActions.executeSearch(newQuery));

  // Create an advanced query to filter for content from the year 2022
  const advancedQuery = "@year==2022";

  // Get the current state of the search interface
  const state = headlessEngine.state;

  // Apply the advanced query to the search state
  const updatedState = loadAdvancedSearchQueryActions.applyAdvancedSearchQuery(
    state,
    advancedQuery
  );

  // Update the search state
  headlessEngine.setState(updatedState);

  // Log the appropriate analytics event (e.g., filter selection)
  loadSearchAnalyticsActions.logSearchEvent(
    headlessEngine,
    "FilterFor2022",
    "StaticFilterSelection"
  );

  // Execute the search with the updated state
  loadSearchActions.executeSearch(headlessEngine);
}
