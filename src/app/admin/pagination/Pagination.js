'use strict';

angular.module('siApp')
  .factory('Pagination', ['$filter', function ($filter) {
    var pagination = {};

    pagination.getPaginationHelper = function () {
      return {
        perPage: 25,
        currentPage: 0,
        totalItems: 0,
        entities: [],
        paginatedEntities: [],
        query: '',
        selectedCount: 0,
        loadEntities: function (entities) {
          this.currentPage = 1;
          this.entities = entities;
          this.totalItems = entities.length;
          _.forEach(this.entities, function (e) {
            e.selected = false;
          });
          this.paginateEntities();
        },
        paginateEntities: function (ens) {
          if (ens === undefined) {
            if (this.query === '') {
              ens = this.entities;
            } else {
              this.applySearchFilter(this.query);
              return;
            }
          }
          var begin = ((this.currentPage - 1) * this.perPage),
            end = begin + this.perPage;
          this.paginatedEntities = _.slice(ens, begin, end);
          this.totalItems = ens.length;
        },
        applySearchFilter: function (newValue) {
          if (newValue === '') {
            this.paginateEntities();
          } else {
            var filtered = $filter('filter')(this.entities, newValue);
            this.paginateEntities(filtered);
          }
        },
        entitySelectChanged: function (entity) {
          if (entity.selected) {
            this.selectedCount++;
          } else if (this.selectedCount > 0) {
            this.selectedCount--;
          }
        },
        removeEntity: function (entity) {
          _.remove(this.entities, entity);
          entity.selected = false;
          this.entitySelectChanged(entity);
          this.paginateEntities();
        }
      };
    };

    return pagination;
  }]);