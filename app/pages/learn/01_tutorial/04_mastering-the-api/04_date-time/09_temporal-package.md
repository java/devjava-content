---
id: api.datetime.temporal
title: The Temporal Package
type: tutorial-group
slug: learn/date-time/temporal
group: datetime
category: beginner
layout: learn/tutorial-group.html
main_css_id: learn
subheader_select: tutorials
last_update: 2022-01-27
toc:
- Temporal and TemporalAccessor {temporal}
- ChronoField and IsoFields {chrono-field}
- ChronoUnit {chrono-unit}
- Temporal Adjusters {temporal-adjusters}
- Temporal Query {temporal-query}
description: "Using temporal adjusters to retrieve an adjusted time value, and performing a temporal query."
---

The [`java.time.temporal`](javadoc:java.time.temporal) package provides a collection of interfaces, classes, and enums that support date and time code and, in particular, date and time calculations.

These interfaces are intended to be used at the lowest level. Typical application code should declare variables and parameters in terms of the concrete type, such as [`LocalDate`](javadoc:LocalDate) or [`ZonedDateTime`](javadoc:ZonedDateTime), and not in terms of the [`Temporal`](javadoc:Temporal) interface. This is exactly the same as declaring a variable of type [`String`](javadoc:String), and not of type [`CharSequence`](javadoc:CharSequence).


<a id="temporal">&nbsp;</a>
## Temporal and TemporalAccessor

The [`Temporal`](javadoc:Temporal) interface provides a framework for accessing temporal-based objects, and is implemented by the temporal-based classes, such as [`Instant`](javadoc:Instant), [`LocalDateTime`](javadoc:LocalDateTime), and [`ZonedDateTime`](javadoc:ZonedDateTime). This interface provides methods to add or subtract units of time, making time-based arithmetic easy and consistent across the various date and time classes. The [`TemporalAccessor`](javadoc:TemporalAccessor) interface provides a read-only version of the [`Temporal`](javadoc:Temporal) interface.

Both [`Temporal`](javadoc:Temporal) and [`TemporalAccessor`](javadoc:TemporalAccessor) objects are defined in terms of fields, as specified in the [`TemporalField`](javadoc:TemporalField) interface. The [`ChronoField`](javadoc:ChronoField) enum is a concrete implementation of the [`TemporalField`](javadoc:TemporalField) interface and provides a rich set of defined constants, such as [`DAY_OF_WEEK`](javadoc:ChronoField.DAY_OF_WEEK), [`MINUTE_OF_HOUR`](javadoc:ChronoField.MINUTE_OF_HOUR), and [`MONTH_OF_YEAR`](javadoc:ChronoField.MONTH_OF_YEAR).

The units for these fields are specified by the [`TemporalUnit`](javadoc:TemporalUnit) interface. The [`ChronoUnit`](javadoc:ChronoUnit) enum implements the [`TemporalUnit`](javadoc:TemporalUnit) interface. The field [`ChronoField.DAY_OF_WEEK`](javadoc:ChronoField.DAY_OF_WEEK) is a combination of [`ChronoUnit.DAYS`](javadoc:ChronoUnit.DAYS) and [`ChronoUnit.WEEKS`](javadoc:ChronoUnit.WEEKS). The [`ChronoField`](javadoc:ChronoField) and [`ChronoUnit`](javadoc:ChronoUnit) enums are discussed in the following sections.

The arithmetic-based methods in the [`Temporal`](javadoc:Temporal) interface require parameters defined in terms of [`TemporalAmount`](javadoc:TemporalAmount) values. The [`Period`](javadoc:Period) and [`Duration`](javadoc:Duration) classes (discussed in [Period and Duration](id:api.datetime.period_duration)) implement the [`TemporalAmount`](javadoc:TemporalAmount) interface.


<a id="chrono-field">&nbsp;</a>
## ChronoField and IsoFields

The [`ChronoField`](javadoc:ChronoField) enum, which implements the [`TemporalField`](javadoc:TemporalField) interface, provides a rich set of constants for accessing date and time values. A few examples are [`CLOCK_HOUR_OF_DAY`](javadoc:ChronoField.CLOCK_HOUR_OF_DAY), [`NANO_OF_DAY`](javadoc:ChronoField.NANO_OF_DAY), and [`DAY_OF_YEAR`](javadoc:ChronoField.DAY_OF_YEAR). This enum can be used to express conceptual aspects of time, such as the third week of the year, the 11th hour of the day, or the first Monday of the month. When you encounter a `Temporal` of unknown type, you can use the [`TemporalAccessor.isSupported(TemporalField)`](javadoc:TemporalAccessor.isSupported(TemporalField)) method to determine if the `Temporal` supports a particular field. The following line of code returns false, indicating that [`LocalDate`](javadoc:LocalDate) does not support [`ChronoField.CLOCK_HOUR_OF_DAY`](javadoc:ChronoField.CLOCK_HOUR_OF_DAY):

```java
boolean isSupported = LocalDate.now().isSupported(ChronoField.CLOCK_HOUR_OF_DAY);
```

Additional fields, specific to the ISO-8601 calendar system, are defined in the [`IsoFields`](javadoc:IsoFields) class. The following examples show how to obtain the value of a field using both [`ChronoField`](javadoc:ChronoField) and [`IsoFields`](javadoc:IsoFields):

```java
time.get(ChronoField.MILLI_OF_SECOND)
int qoy = date.get(IsoFields.QUARTER_OF_YEAR);
```

Two other classes define additional fields that may be useful, [`WeekFields`](javadoc:WeekFields) and [`JulianFields`](javadoc:JulianFields).



<a id="chrono-unit">&nbsp;</a>
## ChronoUnit

The [`ChronoUnit`](javadoc:ChronoUnit) enum implements the [`TemporalUnit`](javadoc:TemporalUnit) interface, and provides a set of standard units based on date and time, from milliseconds to millennia. Note that not all [`ChronoUnit`](javadoc:ChronoUnit) objects are supported by all classes. For example, the [`Instant`](javadoc:Instant) class does not support [`ChronoUnit.MONTHS`](javadoc:ChronoUnit.MONTHS) or [`ChronoUnit.YEARS`](javadoc:ChronoUnit.YEARS). Classes in the Date-Time API contain the `isSupported(TemporalUnit)` method that can be used to verify whether a class supports a particular time unit. The following call to `isSupported()` returns false, confirming that the [`Instant`](javadoc:Instant) class does not support [`ChronoUnit.DAYS`](javadoc:ChronoUnit.DAYS).

```java
Instant instant = Instant.now();
boolean isSupported = instant.isSupported(ChronoUnit.DAYS);
```


<a id="temporal-adjusters">&nbsp;</a>
## Temporal Adjuster

The [`TemporalAdjuster`](javadoc:TemporalAdjuster) interface, in the [`java.time.temporal`](javadoc:java.time.temporal) package, provides methods that take a [`Temporal`](javadoc:Temporal) value and return an adjusted value. The adjusters can be used with any of the temporal-based types.

If an adjuster is used with a [`ZonedDateTime`](javadoc:ZonedDateTime), then a new date is computed that preserves the original time and time zone values.

### Predefined Adjusters

The [`TemporalAdjusters`](javadoc:TemporalAdjusters) class (note the plural) provides a set of predefined adjusters for finding the first or last day of the month, the first or last day of the year, the last Wednesday of the month, or the first Tuesday after a specific date, to name a few examples. The predefined adjusters are defined as static methods and are designed to be used with the static import statement.

The following example uses several [`TemporalAdjusters`](javadoc:TemporalAdjusters) methods, in conjunction with the with method defined in the temporal-based classes, to compute new dates based on the original date of 15 October 2000:

```java
LocalDate date = LocalDate.of(2000, Month.OCTOBER, 15);
DayOfWeek dotw = date.getDayOfWeek();
System.out.printf("%s is on a %s%n", date, dotw);

System.out.printf("first day of Month: %s%n",
                  date.with(TemporalAdjusters.firstDayOfMonth()));
System.out.printf("first Monday of Month: %s%n",
                  date.with(TemporalAdjusters.firstInMonth(DayOfWeek.MONDAY)));
System.out.printf("last day of Month: %s%n",
                  date.with(TemporalAdjusters.lastDayOfMonth()));
System.out.printf("first day of next Month: %s%n",
                  date.with(TemporalAdjusters.firstDayOfNextMonth()));
System.out.printf("first day of next Year: %s%n",
                  date.with(TemporalAdjusters.firstDayOfNextYear()));
System.out.printf("first day of Year: %s%n",
                  date.with(TemporalAdjusters.firstDayOfYear()));
```

This produces the following output:

```shell
2000-10-15 is on a SUNDAY
first day of Month: 2000-10-01
first Monday of Month: 2000-10-02
last day of Month: 2000-10-31
first day of next Month: 2000-11-01
first day of next Year: 2001-01-01
first day of Year: 2000-01-01
```

### Custom Adjusters

You can also create your own custom adjuster. To do this, you create a class that implements the [`TemporalAdjuster`](javadoc:TemporalAdjuster) interface with a [`adjustInto(Temporal)`](javadoc:TemporalAdjuster.adjustInto(Temporal)) method. The nest example is the `PaydayAdjuster` custom adjuster. It evaluates the passed-in date and returns the next payday, assuming that payday occurs twice a month: on the 15th, and again on the last day of the month. If the computed date occurs on a weekend, then the previous Friday is used. The current calendar year is assumed.

```java
public class PaydayAdjuster implements TemporalAdjuster {
    /**
     * The adjustInto method accepts a Temporal instance 
     * and returns an adjusted LocalDate. If the passed in
     * parameter is not a LocalDate, then a DateTimeException is thrown.
     */
    public Temporal adjustInto(Temporal input) {
        LocalDate date = LocalDate.from(input);
        int day;
        if (date.getDayOfMonth() < 15) {
            day = 15;
        } else {
            day = date.with(TemporalAdjusters.lastDayOfMonth()).getDayOfMonth();
        }
        date = date.withDayOfMonth(day);
        if (date.getDayOfWeek() == DayOfWeek.SATURDAY ||
                date.getDayOfWeek() == DayOfWeek.SUNDAY) {
            date = date.with(TemporalAdjusters.previous(DayOfWeek.FRIDAY));
        }

        return input.with(date);
    }
}
```

The adjuster is invoked in the same manner as a predefined adjuster, using the `with()` method. Let us consider the following example:

```java
LocalDate nextPayday = date.with(new PaydayAdjuster());
```

In 2013, both June 15 and June 30 occur on the weekend. Running the previous example with the respective dates of June 3 and June 18 (in 2013), gives the following results:

```shell
Given the date:  2013 Jun 3
the next payday: 2013 Jun 14

Given the date:  2013 Jun 18
the next payday: 2013 Jun 28
```


<a id="temporal-query">&nbsp;</a>
## Temporal Query

A [`TemporalQuery`](javadoc:TemporalQuery) can be used to retrieve information from a temporal-based object.

### Predefined Queries

The [`TemporalQueries`](javadoc:TemporalQueries) class (note the plural) provides several predefined queries, including methods that are useful when the application cannot identify the type of temporal-based object. As with the adjusters, the predefined queries are defined as static methods and are designed to be used with the static import statement.

The precision query, for example, returns the smallest [`ChronoUnit`](javadoc:ChronoUnit) that can be returned by a particular temporal-based object. The following example uses the precision query on several types of temporal-based objects:

```java
TemporalQuery<TemporalUnit> query = TemporalQueries.precision();
System.out.printf("LocalDate precision is %s%n",
                  LocalDate.now().query(query));
System.out.printf("LocalDateTime precision is %s%n",
                  LocalDateTime.now().query(query));
System.out.printf("Year precision is %s%n",
                  Year.now().query(query));
System.out.printf("YearMonth precision is %s%n",
                  YearMonth.now().query(query));
System.out.printf("Instant precision is %s%n",
                  Instant.now().query(query));
```

The output looks like the following:

```shell
LocalDate precision is Days
LocalDateTime precision is Nanos
Year precision is Years
YearMonth precision is Months
Instant precision is Nanos
```

### Custom Queries

You can also create your own custom queries. One way to do this is to create a class that implements the [`TemporalQuery`](javadoc:TemporalQuery) interface with the [`queryFrom(TemporalAccessor)`](javadoc:TemporalQuery.queryFrom(TemporalAccessor)) method. Here is a first custom query implemented in the `FamilyVacations` class, which implements the [`TemporalQuery`](javadoc:TemporalQuery) interface. The `queryFrom()` method compares the passed-in date against scheduled vacation dates and returns `true` if it falls within those date ranges.

```java
public class FamilyVacations implements TemporalQuery<Boolean> {
    // Returns true if the passed-in date occurs during one of the
    // family vacations. Because the query compares the month and day only,
    // the check succeeds even if the Temporal types are not the same.
    public Boolean queryFrom(TemporalAccessor date) {
        int month = date.get(ChronoField.MONTH_OF_YEAR);
        int day = date.get(ChronoField.DAY_OF_MONTH);

        // Disneyland over Spring Break
        if ((month == Month.APRIL.getValue()) && ((day >= 3) && (day <= 8)))
            return Boolean.TRUE;

        // Smith family reunion on Lake Saugatuck
        if ((month == Month.AUGUST.getValue()) && ((day >= 8) && (day <= 14)))
            return Boolean.TRUE;

        return Boolean.FALSE;
    }
}
```

You can use this [`TemporalQuery`](javadoc:TemporalQuery) with the following pattern:

```java
// define a year, a month and a day
LocalDate = date = LocalDate.of(year, month, day);
boolean isFamilyVacation = date.query(new FamilyVacations());
```

The second custom query is implemented in the `FamilyBirthdays` class. This class provides an `isFamilyBirthday()` method that compares the passed-in date against several birthdays and returns TRUE if there is a match.

```java
public class FamilyBirthdays {
    // Returns true if the passed-in date is the same as one of the
    // family birthdays. Because the query compares the month and day only,
    // the check succeeds even if the Temporal types are not the same.
    public static Boolean isFamilyBirthday(TemporalAccessor date) {
        int month = date.get(ChronoField.MONTH_OF_YEAR);
        int day = date.get(ChronoField.DAY_OF_MONTH);

        // Angie's birthday is on April 3.
        if ((month == Month.APRIL.getValue()) && (day == 3))
            return Boolean.TRUE;

        // Sue's birthday is on June 18.
        if ((month == Month.JUNE.getValue()) && (day == 18))
            return Boolean.TRUE;

        // Joe's birthday is on May 29.
        if ((month == Month.MAY.getValue()) && (day == 29))
            return Boolean.TRUE;

        return Boolean.FALSE;
    }
}
```

The `FamilyBirthday` class does not implement the [`TemporalQuery`](javadoc:TemporalQuery) interface and can be used as part of a lambda expression. The following code shows how to invoke both custom queries.

```java
// Invoking the query without using a lambda expression.
Boolean isFamilyVacation = date.query(new FamilyVacations());

// Invoking the query using a lambda expression.
Boolean isFamilyBirthday = date.query(FamilyBirthdays::isFamilyBirthday);

if (isFamilyVacation.booleanValue() || isFamilyBirthday.booleanValue())
    System.out.printf("%s is an important date!%n", date);
else
    System.out.printf("%s is not an important date.%n", date);
```