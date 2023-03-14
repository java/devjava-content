---
id: api.datetime.date_time
title: Date and Time
slug: learn/date-time/local-time
slug_history:
- learn/date-time/date-time
type: tutorial-group
group: datetime
category: beginner
layout: learn/tutorial-group.html
main_css_id: learn
subheader_select: tutorials
last_update: 2022-01-27
toc:
- The LocalTime Class {localtime}
- The LocalDateTime Class {localdatetime}
description: "The classes LocalTime and LocalDateTime classes deal with time, and date and time, respectively, but without time zones."
---


<a id="localtime">&nbsp;</a>
## The LocalTime Class

The [`LocalTime`](javadoc:LocalTime) class is similar to the other classes whose names are prefixed with `Local`, but deals in time only. This class is useful for representing human-based time of day, such as movie times, or the opening and closing times of the local library. It could also be used to create a digital clock, as shown in the following example:

```java
LocalTime thisSec;

for (;;) {
    thisSec = LocalTime.now();

    // implementation of display code is left to the reader
    display(thisSec.getHour(), thisSec.getMinute(), thisSec.getSecond());
}
```

The [`LocalTime`](javadoc:LocalTime) class does not store time zone or daylight saving time information.


<a id="localdatetime">&nbsp;</a>
## The LocalDateTime Class

The class that handles both date and time, without a time zone, is [`LocalDateTime`](javadoc:LocalDateTime), one of the core classes of the Date-Time API. This class is used to represent date (month-day-year) together with time (hour-minute-second-nanosecond) and is, in effect, a combination of [`LocalDate`](javadoc:LocalDate) with [`LocalTime`](javadoc:LocalTime). This class can be used to represent a specific event, such as the first race for the Louis Vuitton Cup Finals in the America's Cup Challenger Series, which began at 1:10 p.m. on August 17, 2013. Note that this means 1:10 p.m. in local time. To include a time zone, you must use a [`ZonedDateTime`](javadoc:ZonedDateTime) or an [`OffsetDateTime`](javadoc:OffsetDateTime), as discussed in [Time Zone and Offset Classes](id:api.datetime.zoneid_zone_offset).

In addition to the [`now()`](javadoc:LocalDateTime.now()) method that every temporal-based class provides, the [`LocalDateTime`](javadoc:LocalDateTime) class has various `of()` methods (or methods prefixed with `of`) that create an instance of [`LocalDateTime`](javadoc:LocalDateTime). There is a `from()` method that converts an instance from another temporal format to a [`LocalDateTime`](javadoc:LocalDateTime) instance. There are also methods for adding or subtracting hours, minutes, days, weeks, and months. The following example shows a few of these methods:

```java
System.out.printf("now: %s%n", LocalDateTime.now());

System.out.printf("Apr 15, 1994 @ 11:30am: %s%n",
                  LocalDateTime.of(1994, Month.APRIL, 15, 11, 30));

System.out.printf("now (from Instant): %s%n",
                  LocalDateTime.ofInstant(Instant.now(), ZoneId.systemDefault()));

System.out.printf("6 months from now: %s%n",
                  LocalDateTime.now().plusMonths(6));

System.out.printf("6 months ago: %s%n",
                  LocalDateTime.now().minusMonths(6));
```

This code produces output that will look similar to the following:

```shell
now: 2013-07-24T17:13:59.985
Apr 15, 1994 @ 11:30am: 1994-04-15T11:30
now (from Instant): 2013-07-24T17:14:00.479
6 months from now: 2014-01-24T17:14:00.480
6 months ago: 2013-01-24T17:14:00.481
```