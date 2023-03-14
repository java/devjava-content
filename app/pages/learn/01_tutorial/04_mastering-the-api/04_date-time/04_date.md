---
id: api.datetime.date
title: Date
slug: learn/date-time/date
type: tutorial-group
group: datetime
category: beginner
layout: learn/tutorial-group.html
main_css_id: learn
subheader_select: tutorials
last_update: 2022-01-27
toc:
- The LocalDate Class {dayofweek}
- The YearMonth Class {yearmonth}
- The MonthDay Class {monthday}
- The Year Class {year}
description: "The LocalDate, YearMonth, MonthDay and Year classes are dealing only with dates, without time or time zones." 
---

The Date-Time API provides four classes that deal exclusively with date information, without respect to time or time zone. The use of these classes are suggested by the class names: [`LocalDate`](javadoc:LocalDate), [`YearMonth`](javadoc:YearMonth), [`MonthDay`](javadoc:MonthDay), and [`Year`](javadoc:Year).


<a id="localdate">&nbsp;</a>
## The LocalDate Class

A [`LocalDate`](javadoc:LocalDate) represents a year-month-day in the ISO calendar and is useful for representing a date without a time. You might use a [`LocalDate`](javadoc:LocalDate) to track a significant event, such as a birth date or wedding date. The following examples use the of and with methods to create instances of [`LocalDate`](javadoc:LocalDate):

```java
LocalDate date = LocalDate.of(2000, Month.NOVEMBER, 20);
LocalDate nextWed = date.with(TemporalAdjusters.next(DayOfWeek.WEDNESDAY));
```

For more information about the [`TemporalAdjuster`](javadoc:TemporalAdjuster) interface, see the section on [Temporal Adjuster](id:api.datetime.temporal#temporal-adjusters).

In addition to the usual methods, the [`LocalDate`](javadoc:LocalDate) class offers getter methods for obtaining information about a given date. The [`getDayOfWeek()`](javadoc:LocalDate.getDayOfWeek()) method returns the day of the week that a particular date falls on. For example, the following line of code returns "MONDAY":

```java
DayOfWeek dotw = LocalDate.of(2012, Month.JULY, 9).getDayOfWeek();
```

The following example uses a [`TemporalAdjuster`](javadoc:TemporalAdjuster) to retrieve the first Wednesday after a specific date.

```java
LocalDate date = LocalDate.of(2000, Month.NOVEMBER, 20);
TemporalAdjuster adj = TemporalAdjusters.next(DayOfWeek.WEDNESDAY);
LocalDate nextWed = date.with(adj);
System.out.printf("For the date of %s, the next Wednesday is %s.%n",
                  date, nextWed);
```

Running the code produces the following:

```shell
For the date of 2000-11-20, the next Wednesday is 2000-11-22.
```

The [Period and Duration](id:api.datetime.period_duration) section also has examples using the [`LocalDate`](javadoc:LocalDate) class.


<a id="yearmonth">&nbsp;</a>
## The YearMonth Class

The [`YearMonth`](javadoc:YearMonth) class represents the month of a specific year. The following example uses the [`lengthOfMonth()`](javadoc:YearMonth.lengthOfMonth()) method to determine the number of days for several year and month combinations.

```java
YearMonth date = YearMonth.now();
System.out.printf("%s: %d%n", date, date.lengthOfMonth());

YearMonth date2 = YearMonth.of(2010, Month.FEBRUARY);
System.out.printf("%s: %d%n", date2, date2.lengthOfMonth());

YearMonth date3 = YearMonth.of(2012, Month.FEBRUARY);
System.out.printf("%s: %d%n", date3, date3.lengthOfMonth());
```

The output from this code looks like the following:

```shell
2013-06: 30
2010-02: 28
2012-02: 29
```


<a id="monthday">&nbsp;</a>
## The MonthDay Class

The [`MonthDay`](javadoc:MonthDay) class represents the day of a particular month, such as New Year's Day on January 1.

The following example uses the [`isValidYear()`](javadoc:MonthDay.isValidYear()) method to determine if February 29 is valid for the year 2010. The call returns false, confirming that 2010 is not a leap year.

```java
MonthDay date = MonthDay.of(Month.FEBRUARY, 29);
boolean validLeapYear = date.isValidYear(2010);
```


<a id="year">&nbsp;</a>
## The Year Class

The [`Year`](javadoc:Year) class represents a year. The following example uses the [`isLeap()`](javadoc:Year.isLeap()) method to determine if the given year is a leap year. The call returns `true`, confirming that 2012 is a leap year.

```java
boolean validLeapYear = Year.of(2012).isLeap();
```
