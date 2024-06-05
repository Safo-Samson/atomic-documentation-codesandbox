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

  //building a query expression using advanced query
  const advancedQuery = "@year==2022";

  // loading all the actions needed to execute the search and log the events using the headless engine
  const advancedSearchQueryActionCreators =
    loadAdvancedSearchQueryActions(headlessEngine);
  const searchActionCreators = loadSearchActions(headlessEngine);
  const searchAnalyticsActionCreators =
    loadSearchAnalyticsActions(headlessEngine);

  // using the loadAdvancedSearchQueryActions send the advanced query `aq` and `groupBy` parameters to the headless engine
  const payloadDispatchableAction =
    advancedSearchQueryActionCreators.updateAdvancedSearchQueries({
      aq: advancedQuery,
      groupBy: [ //not really necessary as it adds no value to the query
        {
          field: "@year",
          sortCriteria: "occurrences", 
        },
      ],
    });

  // The static filter selection user clicks on the filter button to filter for 2022 content
  const dispatchableLogFilterSelectAction =
    searchAnalyticsActionCreators.logStaticFilterSelect({
      staticFilterId: "year",
      staticFilterValue: {
        caption: "Filter content for 2022",
        expression: advancedQuery,
      },
    });

  // Creating actions that executes a search query from the static filter.
  const dispatchableSearchAction = searchActionCreators.executeSearch(
    dispatchableLogFilterSelectAction
  );

  //The event to log when a search interface loads for the first time.
  const dispatchableLogInterfaceLoad =
    searchAnalyticsActionCreators.logInterfaceLoad();
  //The event to log when the results sort criterion is changed
  const dispatchableLogSortChange =
    searchAnalyticsActionCreators.logResultsSort();
  //The event to log when a user provides negative feedback for a given smart snippet answer
  const dispatchableLogDislikeSmartSnippet =
    searchAnalyticsActionCreators.logDislikeSmartSnippet();
  //The event to log when a static filter value is selected.
  const dispatchableLogStaticFilterSelect =
    searchAnalyticsActionCreators.logStaticFilterSelect({
      staticFilterId: "year",
      staticFilterValue: {
        caption: "Filter content for 2022",
        expression: advancedQuery,
      },
    });

  // dispatching the actions
  headlessEngine.dispatch(payloadDispatchableAction);
  headlessEngine.dispatch(dispatchableSearchAction);
  headlessEngine.dispatch(dispatchableLogSortChange);
  headlessEngine.dispatch(dispatchableLogDislikeSmartSnippet);
  headlessEngine.dispatch(dispatchableLogStaticFilterSelect);
  headlessEngine.dispatch(dispatchableLogInterfaceLoad);
}
