'use strict';

angular.module('siApp')
  .factory('Pagination', [function () {
    var pagination = {};

    pagination.getPaginationHelper = function () {
      return {
        perPage: 25,
        currentPage: 0,
        totalItems: 0,
        paginatedEntities: [],
        query: '',
        init: function (entities) {
          this.currentPage = 1;
          this.totalItems = entities.length;
        },
        paginateEntities: function (entities) {
          var begin = ((this.currentPage - 1) * this.perPage),
            end = begin + this.perPage;
          this.paginatedEntities = _.slice(entities, begin, end);
          this.totalItems = entities.length;
        }
      }
    };

    return pagination;
  }]);