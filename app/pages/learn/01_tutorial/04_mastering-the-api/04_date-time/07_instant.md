---
id: api.datetime.instant
title: Instant
slug: learn/date-time/instant
type: tutorial-group
group: datetime
category: beginner
layout: learn/tutorial-group.html
main_css_id: learn
subheader_select: tutorials
last_update: 2022-01-27
toc:
- The Instant Class {instant}
description: "The Instant class represent an instantaneous moment on the timeline."
---


<a id="instant">&nbsp;</a>
## The Instant Class

One of the core classes of the Date-Time API is the [`Instant`](javadoc:Instant) class, which represents the start of a nanosecond on the timeline. This class is useful for generating a time stamp to represent machine time.

```java
Instant timestamp = Instant.now();
```

A value returned from the [`Instant`](javadoc:Instant) class counts time beginning from the first second of January 1, 1970 (1970-01-01T00:00:00Z) also called the [`EPOCH`](javadoc:Instant.EPOCH). An instant that occurs before the epoch has a negative value, and an instant that occurs after the epoch has a positive value.

The other constants provided by the Instant class are [`MIN`](javadoc:Instant.MIN), representing the smallest possible (far past) instant, and [`MAX`](javadoc:Instant.MAX), representing the largest (far future) instant.

Invoking `toString()` on an [`Instant`](javadoc:Instant) produces output like the following:

```shell
2013-05-30T23:38:23.085Z
```

This format follows the ISO-8601 standard for representing date and time.

The [`Instant`](javadoc:Instant) class provides a variety of methods for manipulating an [`Instant`](javadoc:Instant). There are [`plus()`](javadoc:Instant.plus()) and [`minus()`](javadoc:Instant.minus()) methods for adding or subtracting time. The following code adds 1 hour to the current time:

```java
Instant oneHourLater = Instant.now().plus(1, ChronoUnit.HOURS);
```

There are methods for comparing instants, such as [`isAfter()`](javadoc:Instant.isAfter()) and [`isBefore()`](javadoc:Instant.isBefore()). The [`until()`](javadoc:Instant.until()) method returns how much time exists between two [`Instant`](javadoc:Instant) objects. The following line of code reports how many seconds have occurred since the beginning of the Java epoch.

```java
long secondsFromEpoch = Instant.ofEpochSecond(0L).until(Instant.now(),
                        ChronoUnit.SECONDS);
```

The [`Instant`](javadoc:Instant) class does not work with human units of time, such as years, months, or days. If you want to perform calculations in those units, you can convert an [`Instant`](javadoc:Instant) to another class, such as [`LocalDateTime`](javadoc:LocalDateTime) or [`ZonedDateTime`](javadoc:ZonedDateTime), by binding the [`Instant`](javadoc:Instant) with a time zone. You can then access the value in the desired units. The following code converts an [`Instant`](javadoc:Instant) to a [`LocalDateTime`](javadoc:LocalDateTime) object using the [`ofInstant()`](javadoc:LocalDateTime.ofInstant()) method and the default time zone, and then prints out the date and time in a more readable form:

```java
Instant timestamp;

LocalDateTime ldt = LocalDateTime.ofInstant(timestamp, ZoneId.systemDefault());
System.out.printf("%s %d %d at %d:%d%n", ldt.getMonth(), ldt.getDayOfMonth(),
                  ldt.getYear(), ldt.getHour(), ldt.getMinute());
```

The output will be similar to the following:

```shell
MAY 30 2021 at 18:21
```

Either a [`ZonedDateTime`](javadoc:ZonedDateTime) or an [`OffsetDateTime`](javadoc:OffsetDateTime) object can be converted to an [`Instant`](javadoc:Instant) object, as each maps to an exact moment on the timeline. However, the reverse is not true. To convert an [`Instant`](javadoc:Instant) object to a [`ZonedDateTime`](javadoc:ZonedDateTime) or an [`OffsetDateTime`](javadoc:OffsetDateTime) object requires supplying time zone, or time zone offset, information.

