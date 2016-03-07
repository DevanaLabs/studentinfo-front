'use strict';

angular.module('siApp.dashboard')
  .service('Months', ['GlobalEventsD', 'DateTimeConverter', 'CLASS_COLOR_MAP', function (GlobalEventsD, DateTimeConverter, CLASS_COLOR_MAP) {
    var MonthsService = {};

    var today = moment().hour(0).minute(0);

    // currentSchoolYear is the year in which the school year started 
    if (today.month() >= 8) { // second year of the school year
      MonthsService.currentSchoolYear = today.year();
    }
    else { // first year of school year
      MonthsService.currentSchoolYear = today.year() -1;
    }

    var year = MonthsService.currentSchoolYear;
    var month = 9;
    var inPast = true; // remains true until date generation gets to today's date
    var events = GlobalEventsD.getAll();

    function makeFinalClass(day) {
      day.finalClass = day.type + ' ' + day.background + ' ' + day.past;
      if(DateTimeConverter.compareDates(today, moment().year(day.year).month(day.month-1).date(day.date)) && day.type == 'current-month') {
        day.finalClass += " today";
      }
      day.id = 'y'+day.year+'m'+day.month+'d'+day.date;
      return day;
    }

    function eventTypeToClass (type) { // converts event type to css class
      var classMap = CLASS_COLOR_MAP;

      if (classMap[type] === -1) {
        return "yellow";
      }
      else {
        return classMap[type];
      }
    }

    function addEventToMonth(event, eventDate, monthIndex) {
      var dateindex = _.findIndex(MonthsService.months[monthIndex].days, function (day) {
        return (DateTimeConverter.compareDates(moment().year(day.year).month(day.month-1).date(day.date), eventDate));
      });

      if (dateindex >= 0) {
        //console.log(MonthsService.months[monthIndex].days[dateindex]);
        MonthsService.months[monthIndex].days[dateindex].events.push(event);
        if (MonthsService.months[monthIndex].days[dateindex].events.length > 1) {
          MonthsService.months[monthIndex].days[dateindex].background = 'multi';
        }
        else {
          MonthsService.months[monthIndex].days[dateindex].background = eventTypeToClass(event.type);
        }
        MonthsService.months[monthIndex].days[dateindex] = makeFinalClass(MonthsService.months[monthIndex].days[dateindex]);
      }
    }

    MonthsService.months = [];

    // generate array of months, containing weeks, containing day objects
    for(var monthCounter = 0; monthCounter < 13; monthCounter++) { // for each month
      var currentMonthSet = [];

      var d = moment().year(year).month(month-1).date(1); // displayed month

      var prevMonthDate = moment(d.format()).subtract(1, 'months');
      var nextMonthDate = moment(d.format()).add(1, 'months');

      var lastDayPrev = prevMonthDate.daysInMonth(); // last day of previous month
      var firstWeekDay = d.isoWeekday(); // weekday od first day of displayed month


      // write days of previous month
      for (var i = lastDayPrev - firstWeekDay + 2; i <= lastDayPrev; i++) {
        currentMonthSet.push({
          date: i,
          month: prevMonthDate.month() + 1,
          year: prevMonthDate.year(),
          type: 'prev-month',
          events: [],
          background: 'white',
          past: ""
        });
      }

      var lastDayCur = d.daysInMonth(); // last day of displayed month

      // write days of displayed month
      for (i = 1; i <= lastDayCur; i++) {
        if (DateTimeConverter.compareDates(today, moment(d).add(i-1, 'days'))) {
          inPast = false;
        }
        currentMonthSet.push({
          date: i,
          month: d.month() + 1,
          year: d.year(),
          type: 'current-month',
          events: [],
          background: 'white',
          past: (inPast ? "past":"") 
        });
      }

      var lastWeekDay = moment(lastDayCur + " " + month + " " + year, "DD MM YYYY").isoWeekday(); 
      // weekday of last day of displayed month

      // write days of next month
      for (i = 1; i <= 7 - lastWeekDay; i++) {
        currentMonthSet.push({
          date: i,
          month: nextMonthDate.month() + 1,
          year: nextMonthDate.year(),
          type: 'next-month',
          events: [],
          background: 'white',
          past: ""
        });
      }

      // 

      currentMonthSet =_.forEach(currentMonthSet, function (day) {
        day = makeFinalClass(day);
      });

      MonthsService.months.push({
        number: month,
        name: d.format("MMMM"),
        days: currentMonthSet
      });

      if (month == 12) {
        month = 1;
        year++;
      }
      else {
        month++;
      }
    } // for each month ends here


    // add events to days
    for (i = 0; i < events.length; i++) {
      var currentDate = moment(events[i].datetime.startsAt);
      var stopDate = moment(events[i].datetime.endsAt);
      while (currentDate <= stopDate) {
        var dd = currentDate.date();
        var mm = currentDate.month() + 1;
        var yy = currentDate.year();
        if(yy == MonthsService.currentSchoolYear) { var monthIndex = mm - 9; }
        else { var monthIndex = mm + 3; }

        addEventToMonth(events[i], currentDate, monthIndex);
        if(dd < 7 && monthIndex > 0) {
          addEventToMonth(events[i], currentDate, monthIndex-1);
        }
        else if(dd > 21 && monthIndex < 12) {
          addEventToMonth(events[i], currentDate, monthIndex+1);
        }
        currentDate.add(1, 'days');
      }
    }
    
    _.forEach(MonthsService.months, function (month) {
      month.days = _.compact(month.days.map(function (el, i) {
        if (i % 7 === 0) {
          return month.days.slice(i, i + 7);
        }
      }));
    });


    return {
      getAll: function () { return MonthsService.months; },
      getSchoolYear: function () { return MonthsService.currentSchoolYear; },
      getMonth: function (month, year) { 
        if (year == MonthsService.currentSchoolYear) {
          return MonthsService.months[month - 9];
        }
        else {
          return MonthsService.months[month*1 + 3];
        }
      },
      getSchoolYearRange: function () {
        return {
          start: moment().date(1).month(8).year(MonthsService.currentSchoolYear*1).subtract(1, 'days'),
          end: moment().date(1).month(9).year(MonthsService.currentSchoolYear*1 + 1).subtract(1, 'days'),
        };
      }, 
      getDay: function (year, month, date) {
        if (year == MonthsService.currentSchoolYear) {
          var tmpMonth = MonthsService.months[month - 9];
        } else {
          var tmpMonth = MonthsService.months[month*1 + 3];
        }
        return _.find(_.find(tmpMonth.days, function(week){
          return _.find(week, function(day){
            return day.date == date && day.month == month;
          });
        }), function(day){
          return day.date == date && day.month == month;
        });
      }
    };
  }]);