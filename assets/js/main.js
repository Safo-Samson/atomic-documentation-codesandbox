import {
  loadAdvancedSearchQueryActions,
  loadSearchActions,
  loadSearchAnalyticsActions,
  buildStaticFilter,
  buildStaticFilterValue,
  buildQueryExpression,
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
  const queryExpression = buildQueryExpression()
    .addStringField({
      field: "year",
      operator: "isExactly",
      values: ["2022"],
    })
    .toQuerySyntax();

  //building a query expression using advanced query
  const advancedQuery = "@year==2022";

  //building the static filter value for the static filter
  const staticFilterValue = buildStaticFilterValue({
    caption: "Content for 2022", //caption for the static filter value
    expression: queryExpression,
  });

  const staticFilter = buildStaticFilter(headlessEngine, {
    id: "year", // id for static filter props, eg fileType
    values: [staticFilterValue], //needs a static filter value  StaticFilterValue[]
  });

  staticFilter.toggleSelect("2022");

  // using the loadAdvancedSearchQueryActions to add the static filter to the search interface
  const advancedSearchQueryActionCreators =
    loadAdvancedSearchQueryActions(headlessEngine);
  const payloadDispatchableAction =
    advancedSearchQueryActionCreators.updateAdvancedSearchQueries(
      advancedQuery
    );
  headlessEngine.dispatch(payloadDispatchableAction);
}
