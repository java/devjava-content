---
id: api.datetime.legacy
title: Legacy Date-Time Code
type: tutorial-group
slug: learn/date-time/legacy-code
group: datetime
category: beginner
layout: learn/tutorial-group.html
main_css_id: learn
subheader_select: tutorials
last_update: 2022-01-27
toc:
- Interoperability with Legacy Code {interop-legacy}
- Mapping Legacy Date and Time Functionality to the Date Time API {mapping-to-date-time}
- Date and Time Formatting {formatting}
description: "tips on how to convert older java.util.Date and java.util.Calendar code to the Date-Time API."
---


Prior to the Java SE 8 release, the Java date and time mechanism was provided by the [`java.util.Date`](javadoc:Date), [`java.util.Calendar`](javadoc:Calendar), and [`java.util.TimeZone`](javadoc:TimeZone) classes, as well as their subclasses, such as [`java.util.GregorianCalendar`](javadoc:GregorianCalendar). These classes had several drawbacks, including:

- The [`Calendar`](javadoc:Calendar) class was not type safe.
- Because the classes were mutable, they could not be used in multithreaded applications.
- Bugs in application code were common due to the unusual numbering of months and the lack of type safety.



<a id="interop-legacy">&nbsp;</a>
## Interoperability with Legacy Code

Perhaps you have legacy code that uses the [`java.util`](javadoc:java.util) date and time classes and you would like to take advantage of the [`java.time`](javadoc:java.time) functionality with minimal changes to your code.

Added to the JDK 8 release are several methods that allow conversion between [`java.util`](javadoc:java.util) and [`java.time`](javadoc:java.time) objects:

- [`Calendar.toInstant()`](javadoc:Calendar.toInstant()) converts the [`Calendar`](javadoc:Calendar) object to an [`Instant`](javadoc:Instant).
- [`GregorianCalendar.toZonedDateTime()`](javadoc:GregorianCalendar.toZonedDateTime()) converts a [`GregorianCalendar`](javadoc:GregorianCalendar) instance to a [`ZonedDateTime`](javadoc:ZonedDateTime).
- [`GregorianCalendar.from(ZonedDateTime)`](javadoc:GregorianCalendar.from(ZonedDateTime)) creates a [`GregorianCalendar`](javadoc:GregorianCalendar) object using the default locale from a [`ZonedDateTime`](javadoc:ZonedDateTime) instance.
- [`Date.from(Instant)`](javadoc:Date.from(Instant)) creates a [`Date`](javadoc:Date) object from an [`Instant`](javadoc:Instant).
- [`Date.toInstant()`](javadoc:Date.toInstant()) converts a [`Date`](javadoc:Date) object to an [`Instant`](javadoc:Instant).
- [`TimeZone.toZoneId()`](javadoc:TimeZone.toZoneId()) converts a [`TimeZone`](javadoc:TimeZone) object to a [`ZoneId`](javadoc:ZoneId). 

The following example converts a [`Calendar`](javadoc:Calendar) instance to a [`ZonedDateTime`](javadoc:ZonedDateTime) instance. Note that a time zone must be supplied to convert from an [`Instant`](javadoc:Instant) to a [`ZonedDateTime`](javadoc:ZonedDateTime):

```java
Calendar now = Calendar.getInstance();
ZonedDateTime zdt = ZonedDateTime.ofInstant(now.toInstant(), ZoneId.systemDefault()));
```

The following example shows conversion between a Date and an Instant:

```java
Instant inst = date.toInstant();

Date newDate = Date.from(inst);
```

The following example converts from a GregorianCalendar to a ZonedDateTime, and then from a ZonedDateTime to a GregorianCalendar. Other temporal-based classes are created using the ZonedDateTime instance:

```java
GregorianCalendar cal = ...;

TimeZone tz = cal.getTimeZone();
int tzoffset = cal.get(Calendar.ZONE_OFFSET);

ZonedDateTime zdt = cal.toZonedDateTime();

GregorianCalendar newCal = GregorianCalendar.from(zdt);

LocalDateTime ldt = zdt.toLocalDateTime();
LocalDate date = zdt.toLocalDate();
LocalTime time = zdt.toLocalTime();
```

<a id="mapping-to-date-time">&nbsp;</a>
## Mapping Legacy Date and Time Functionality to the Date Time API

Because the Java implementation of date and time has been completely redesigned in the Java SE 8 release, you cannot swap one method for another method. If you want to use the rich functionality offered by the [`java.time`](javadoc:java.time) package, your easiest solution is to use the `toInstant()` or `toZonedDateTime()` methods listed in the previous section. However, if you do not want to use that approach or it is not sufficient for your needs, then you must rewrite your date-time code.

The [table](id:api.datetime.intro#methods) introduced on the [Overview](id:api.datetime.intro) page is a good place to begin evaluating which [`java.time`](javadoc:java.time) classes meet your needs.

There is no one-to-one mapping correspondence between the two APIs, but the following table gives you a general idea of which functionality in the [`java.util`](javadoc:java.util) date and time classes maps to the [`java.time`](javadoc:java.time) APIs.

### Correspondence between legacy Date and Instant

The [`Instant`](javadoc:Instant) and [`Date`](javadoc:Date) classes are similar. Each class:

- Represents an instantaneous point of time on the timeline (UTC)
- Holds a time independent of a time zone
- Is represented as epoch-seconds (since 1970-01-01T00:00:00Z) plus nanoseconds

The [`Date.from(Instant)`](javadoc:Date.from(Instant)) and [`Date.toInstant()`](javadoc:Date.toInstant()) methods allow conversion between these classes.

### Correspondence between GregorianCalendar and ZonedDateTime

The [`ZonedDateTime`](javadoc:ZonedDateTime) class is the replacement for [`GregorianCalendar`](javadoc:GregorianCalendar). It provides the following similar functionality. Human time representation is as follows:

- [`LocalDate`](javadoc:LocalDate): year, month, day
- [`LocalTime`](javadoc:LocalTime): hours, minutes, seconds, nanoseconds
- [`ZoneId`](javadoc:ZoneId): time zone
- [`ZoneOffset`](javadoc:ZoneOffset): current offset from GMT

The [`GregorianCalendar.from(ZonedDateTime)`](javadoc:GregorianCalendar.from(ZonedDateTime)) and [`GregorianCalendar.toZonedDateTime()`](javadoc:GregorianCalendar.toZonedDateTime()) methods facilitate conversions between these classes.

### Correspondence between legacy TimeZone and ZoneId or ZoneOffset

The [`ZoneId`](javadoc:ZoneId) class specifies a time zone identifier and has access to the rules used each time zone. The [`ZoneOffset`](javadoc:ZoneOffset) class specifies only an offset from Greenwich/UTC. For more information, see [Time Zone and Offset Classes](id:api.datetime.zoneid_zone_offset).

### Correspondence between GregorianCalendar with the date set to 1970-01-01 and LocalTime

Code that sets the date to 1970-01-01 in a [`GregorianCalendar`](javadoc:GregorianCalendar) instance in order to use the time components can be replaced with an instance of [`LocalTime`](javadoc:LocalTime).

### Correspondence between GregorianCalendar with time set to 00:00 and LocalDate

Code that sets the time to 00:00 in a [`GregorianCalendar`](javadoc:GregorianCalendar) instance in order to use the date components can be replaced with an instance of [`LocalDate`](javadoc:LocalDate). (This [`GregorianCalendar`](javadoc:GregorianCalendar) approach was flawed, as midnight does not occur in some countries once a year due to the transition to daylight saving time.)


<a id="formatting">&nbsp;</a>
## Date and Time Formatting

Although the [`java.time.format.DateTimeFormatter`](javadoc:DateTimeFormatter) provides a powerful mechanism for formatting date and time values, you can also use the [`java.time`](javadoc:java.time) temporal-based classes directly with [`java.util.Formatter`](javadoc:Formatter) and [`String.format()`](javadoc:String.format()), using the same pattern-based formatting that you use with the [`java.util`](javadoc:java.util) date and time classes.

