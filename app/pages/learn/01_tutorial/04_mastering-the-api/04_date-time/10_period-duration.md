---
id: api.datetime.period_duration
title: Period and Duration
slug: learn/date-time/period-duration
type: tutorial-group
group: datetime
category: beginner
layout: learn/tutorial-group.html
main_css_id: learn
subheader_select: tutorials
last_update: 2022-01-27
toc:
- Duration {duration}
- ChronoUnit {chronounit}
- Period {period}
description: "The Period and Duration classes, as well as the ChronoUnit.between method() are used to calculate an amount of time."
---


When you write code to specify an amount of time, use the class or method that best meets your needs: the [`Duration`](javadoc:Duration) class, [`Period`](javadoc:Period) class, or the [`ChronoUnit.between()`](javadoc:ChronoUnit.between()) method. A [`Duration`](javadoc:Duration) measures an amount of time using time-based values (seconds, nanoseconds). A [`Period`](javadoc:Period) uses date-based values (years, months, days).

> Note: A [`Duration`](javadoc:Duration) of one day is exactly 24 hours long. A [`Period`](javadoc:Period) of one day, when added to a [`ZonedDateTime`](javadoc:ZonedDateTime), may vary according to the time zone. For example, if it occurs on the first or last day of daylight saving time.


<a id="duration">&nbsp;</a>
## Duration

A [`Duration`](javadoc:Duration) is most suitable in situations that measure machine-based time, such as code that uses an [`Instant`](javadoc:Instant) object. A [`Duration`](javadoc:Duration) object is measured in seconds or nanoseconds and does not use date-based constructs such as years, months, and days, though the class provides methods that convert to days, hours, and minutes. A [`Duration`](javadoc:Duration) can have a negative value, if it is created with an end point that occurs before the start point.

The following code calculates, in nanoseconds, the duration between two instants:

```java
Instant t1 = ...;
Instant t2 = ...;

long ns = Duration.between(t1, t2).toNanos();
```

The following code adds 10 seconds to an [`Instant`](javadoc:Instant):

```java
Instant start= ...;

Duration gap = Duration.ofSeconds(10);
Instant later = start.plus(gap);
```

A [`Duration`](javadoc:Duration) is not connected to the timeline, in that it does not track time zones or daylight saving time. Adding a [`Duration`](javadoc:Duration) equivalent to 1 day to a [`ZonedDateTime`](javadoc:ZonedDateTime) results in exactly 24 hours being added, regardless of daylight saving time or other time differences that might result.


<a id="chronounit">&nbsp;</a>
## ChronoUnit

The [`ChronoUnit`](javadoc:ChronoUnit) enum, discussed in the The [`Temporal`](javadoc:Temporal) Package, defines the units used to measure time. The [`ChronoUnit.between()`](javadoc:ChronoUnit.between()) method is useful when you want to measure an amount of time in a single unit of time only, such as days or seconds. The [`between()`](javadoc:ChronoUnit.between()) method works with all temporal-based objects, but it returns the amount in a single unit only. The following code calculates the gap, in milliseconds, between two time-stamps:

```java
Instant previous = ...;
Instant current = ...;

long gap = 0L;

current = Instant.now();
if (previous != null) {
    gap = ChronoUnit.MILLIS.between(previous,current);
}
```


<a id="period">&nbsp;</a>
## Period

To define an amount of time with date-based values (years, months, days), use the [`Period`](javadoc:Period) class. The [`Period`](javadoc:Period) class provides various get methods, such as [`getMonths()`](javadoc:Period.getMonths()), [`getDays()`](javadoc:Period.getDays()), and [`getYears()`](javadoc:Period.getYears()), so that you can extract the amount of time from the period.

The total period of time is represented by all three units together: months, days, and years. To present the amount of time measured in a single unit of time, such as days, you can use the [`ChronoUnit.between()`](javadoc:ChronoUnit.between()) method.

The following code reports how old you are, assuming that you were born on January 1, 1960. The [`Period`](javadoc:Period) class is used to determine the time in years, months, and days. The same period, in total days, is determined by using the [`ChronoUnit.between()`](javadoc:ChronoUnit.between()) method and is displayed in parentheses:

```java
LocalDate today = LocalDate.now();
LocalDate birthday = LocalDate.of(1960, Month.JANUARY, 1);

Period p = Period.between(birthday, today);
long p2 = ChronoUnit.DAYS.between(birthday, today);
System.out.println("You are " + p.getYears() + " years, " + p.getMonths() +
                   " months, and " + p.getDays() +
                   " days old. (" + p2 + " days total)");
```

The code produces output similar to the following:

```shell
You are 53 years, 4 months, and 29 days old. (19508 days total)
```

To calculate how long it is until your next birthday, you could use the following code. The [`Period`](javadoc:Period) class is used to determine the value in months and days. The [`ChronoUnit.between()`](javadoc:ChronoUnit.between()) method returns the value in total days and is displayed in parentheses.

```java
LocalDate birthday = LocalDate.of(1960, Month.JANUARY, 1);

LocalDate nextBDay = birthday.withYear(today.getYear());

// If your birthday has occurred this year already, add 1 to the year.
if (nextBDay.isBefore(today) || nextBDay.isEqual(today)) {
    nextBDay = nextBDay.plusYears(1);
}

Period p = Period.between(today, nextBDay);
long p2 = ChronoUnit.DAYS.between(today, nextBDay);
System.out.println("There are " + p.getMonths() + " months, and " +
                   p.getDays() + " days until your next birthday. (" +
                   p2 + " total)");
```

The code produces output similar to the following:

```java
There are 7 months, and 2 days until your next birthday. (216 total)
```

These calculations do not account for time zone differences. If you were, for example, born in Australia, but currently live in Bangalore, this slightly affects the calculation of your exact age. In this situation, use a [`Period`](javadoc:Period) in conjunction with the [`ZonedDateTime`](javadoc:ZonedDateTime) class. When you add a [`Period`](javadoc:Period) to a [`ZonedDateTime`](javadoc:ZonedDateTime), the time differences are observed.
